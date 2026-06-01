---
sidebar_position: 3
title: 数据传送与寻址实战
description: 详细整理 MOV、XCHG、XLAT、IN/OUT、LEA/LDS/LES 的写法、命名注释规范、易错点和注意事项。
---

# 数据传送与寻址实战

## 背景

8086 中“数据传送”看起来简单，但最容易在工程里出错：位宽不匹配、段寄存器误用、寻址默认段搞错、端口地址写错。这个章节按“能直接写代码”的标准整理。

## 操作数速查

```text
r8:  AL AH BL BH CL CH DL DH
r16: AX BX CX DX SI DI BP SP
seg: CS DS ES SS
m8/m16: 内存字节/字
imm: 立即数
```

## MOV

### 怎么用

```asm
MOV dest, src
```

```asm
MOV AX, BX
MOV AL, [SI]
MOV [DI], AL
MOV AX, 1234H
MOV WORD PTR [BX], 1234H
```

常见初始化段寄存器：

```asm
MOV AX, DATA
MOV DS, AX
```

### 注释与命名建议

- 变量名：`snake_case`，并带单位或语义，例如 `sample_count`、`uart_status`。
- 地址指针名：用 `ptr_` 前缀，例如 `ptr_src`、`ptr_dst`。
- `MOV` 注释写“目标含义”，不要只写“move”。

```asm
MOV SI, OFFSET src_buf    ; SI -> 源缓冲区首地址
MOV DI, OFFSET dst_buf    ; DI -> 目标缓冲区首地址
MOV CX, buf_len           ; 待处理字节数
```

### 易错点

- 内存到内存非法：
  `MOV buf2, buf1` 错，必须借寄存器中转。
- 位宽不匹配：
  `MOV AL, 1234H` 错。
- 段寄存器限制：
  `MOV DS, 1000H` 错，需先到通用寄存器。
- `CS` 不能作为 `MOV` 的目的操作数。

### 注意点

- 内存位宽不明确时一定加 `BYTE PTR` 或 `WORD PTR`。
- `BP` 参与寻址时，默认段是 `SS`，不是 `DS`。

## XCHG

### 怎么用

```asm
XCHG AX, BX
XCHG AL, [SI]
```

### 注释与命名建议

- 交换操作建议在注释里写交换目的，避免后续误改。

```asm
XCHG AX, BX   ; AX/BX 交换，AX 暂存旧 BX
```

### 易错点

- 内存与内存不能直接交换。
- 段寄存器不参与 `XCHG`。

### 注意点

- 如果交换只为临时保存，优先考虑 `PUSH/POP`，可读性更高。

## XLAT

### 怎么用

```asm
; AL = 索引，BX = 表首地址
XLAT
; 执行后 AL = DS:[BX + AL]
```

示例：7 段码查表

```asm
digit_to_seg DB 3FH,06H,5BH,4FH,66H,6DH,7DH,07H,7FH,6FH

MOV AL, 5
MOV BX, OFFSET digit_to_seg
XLAT                 ; AL = 6DH
```

### 注释与命名建议

- 表名用“输入到输出”命名：`digit_to_seg`、`scan_to_ascii`。
- 注释写清索引范围：
  `; AL: 0..9`

### 易错点

- 忘记初始化 `BX`。
- `AL` 越界导致查表越界。

### 注意点

- 表在当前 `DS` 段中；跨段查表要先切换段寄存器或重构数据布局。

## IN / OUT

### 怎么用

8 位数据：

```asm
IN  AL, 60H
OUT 61H, AL
```

16 位数据：

```asm
IN  AX, 80H
OUT 70H, AX
```

16 位端口号：

```asm
MOV DX, 03F8H
IN  AL, DX
OUT DX, AL
```

### 注释与命名建议

- 端口号用常量名：

```asm
UART0_DATA  EQU 03F8H
UART0_STAT  EQU 03FDH
```

- 注释写“端口语义”，不是只写端口值。

```asm
IN AL, DX            ; 读取 UART 状态寄存器
```

### 易错点

- `IN BX, DX` 非法，数据寄存器只能是 `AL/AX`。
- 端口号大于 `FFH` 仍写成立即数形式是错的，必须走 `DX`。

### 注意点

- 对 I/O 设备写入前先读状态位，避免写入时机错误。

## LEA / LDS / LES

### 怎么用

`LEA` 取偏移地址：

```asm
LEA SI, [BX+DI+4]
```

`LDS` / `LES` 装入远指针：

```asm
LDS SI, far_ptr_mem
LES DI, far_ptr_mem
```

### 注释与命名建议

- 远指针变量命名：`far_ptr_xxx`。
- 注释明确“取地址还是取内容”。

```asm
LEA BX, table         ; BX <- table 偏移地址
MOV BX, table         ; BX <- table[0] 内容
```

### 易错点

- 把 `LEA` 当作“读内存内容”。
- `LDS/LES` 源不是合法的 4 字节远指针布局。

### 注意点

- 8086 中远指针内存布局是“偏移在前、段在后”。

## 寻址规则实用表

```text
[BX] [SI] [DI]      -> 默认 DS
[BP] [BP+SI] [BP+DI] -> 默认 SS
段超越前缀 ES:xxx   -> 以 ES 为准
```

## 一段可复用模板

```asm
; 复制 len 个字节: src -> dst
MOV SI, OFFSET src_buf      ; 源地址
MOV DI, OFFSET dst_buf      ; 目的地址
MOV CX, len                 ; 长度
CLD                         ; 正向
copy_loop:
    MOV AL, [SI]            ; 读源字节
    MOV [DI], AL            ; 写目标字节
    INC SI
    INC DI
    LOOP copy_loop
```

## 章末检查清单

- 是否出现内存到内存 `MOV`。
- 是否出现位宽不匹配。
- 是否在 `BP` 寻址场景误用 `DS`。
- `IN/OUT` 是否严格使用 `AL/AX`。
- 查表是否验证索引范围。
