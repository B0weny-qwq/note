---
sidebar_position: 7
title: 子程序调用与现场保护实战
description: 详细整理 CALL/RET、参数传递、返回值、寄存器保护、可复用过程模板及常见错误。
---

# 子程序调用与现场保护实战

## 背景

汇编程序一旦超过几十行，不做过程化会迅速失控。这个章节给出“可维护子程序”的统一写法，重点是调用约定、现场保护和注释规范。

## CALL / RET 基本行为

### 怎么用

```asm
CALL proc_xxx
; ...
proc_xxx PROC NEAR
    ; body
    RET
proc_xxx ENDP
```

执行语义：

- `CALL` 会把返回地址压栈。
- `RET` 会弹出返回地址并跳回。

### 注释与命名建议

- 过程名用动词短语：`calc_crc`、`find_max_min`、`print_hex8`。
- 入口注释固定四行：
  `in`、`out`、`clobber`、`desc`。

```asm
; in : DS:SI -> data, CX = len
; out: AX = checksum
; clobber: BX, DX, flags
; desc: 累加校验和
calc_checksum PROC NEAR
```

### 易错点

- 在子程序中 `JMP` 到外部标签，破坏调用返回链。
- `RET` 次数和 `CALL` 不匹配。

### 注意点

- 非必要不跨层跳转，只通过 `RET` 返回。

## 参数传递方式

## 方式 1：寄存器传参

```asm
MOV SI, OFFSET arr
MOV CX, arr_len
CALL calc_sum
```

优点：快。缺点：可用寄存器有限。

## 方式 2：内存传参

```asm
MOV input_ptr, OFFSET arr
MOV input_len, arr_len
CALL calc_sum_mem
```

优点：接口稳定。缺点：读写多一步。

### 注释与命名建议

- 传参寄存器名在过程注释里写死，不要“调用方自己猜”。
- 内存参数用前缀：`arg_`，例如 `arg_src_ptr`、`arg_count`。

### 易错点

- 调用方和被调方约定不一致，例如调用方给 `BX`，被调方按 `SI` 读。

### 注意点

- 项目里确定一种主约定后保持一致，别混用。

## 返回值约定

### 怎么用

- 单值返回：`AL` 或 `AX`。
- 复合返回：`DX:AX` 或通过内存结构体。

```asm
CALL calc_sum
MOV total, AX
```

### 注释与命名建议

- 返回值语义写在 `out` 注释中。

### 易错点

- 子程序末尾覆盖了返回寄存器，导致调用方读到脏值。

### 注意点

- 有多个返回路径时，确保每条路径都设置返回寄存器。

## 现场保护（寄存器保存）

### 怎么用

```asm
proc_xxx PROC NEAR
    PUSH BX
    PUSH CX
    PUSH SI
    ; body
    POP SI
    POP CX
    POP BX
    RET
proc_xxx ENDP
```

### 注释与命名建议

- 保护顺序和恢复顺序相反，保持块结构一致。
- 注释可加“callee-save registers”。

### 易错点

- `PUSH` / `POP` 数量不一致，栈失衡。
- 恢复顺序写反。

### 注意点

- 把“不保证保留”的寄存器明确写在 `clobber` 字段，避免隐式破坏调用方。

## 带循环的过程模板

```asm
; in : DS:SI -> u8 array, CX = len
; out: AL = max, AH = min
find_max_min PROC NEAR
    PUSH BX
    PUSH SI
    PUSH CX

    JCXZ done_empty
    MOV AL, [SI]
    MOV AH, AL
    INC SI
    DEC CX

scan_loop:
    JCXZ done
    MOV BL, [SI]
    CMP BL, AL
    JBE check_min
    MOV AL, BL
check_min:
    CMP BL, AH
    JAE next
    MOV AH, BL
next:
    INC SI
    DEC CX
    JMP scan_loop

done_empty:
    XOR AX, AX
done:
    POP CX
    POP SI
    POP BX
    RET
find_max_min ENDP
```

## 常见错误清单

- 过程里调用其他过程却没保存必要寄存器。
- `JCXZ` 检查放错位置导致越界读。
- 过程结束前忘了恢复 `SP` 对应的栈内容。

## 章末检查清单

- 每个过程是否有 `in/out/clobber` 注释。
- `PUSH/POP` 是否成对且顺序反向。
- 返回寄存器是否在所有路径都定义。
- 调用约定是否在全项目一致。
