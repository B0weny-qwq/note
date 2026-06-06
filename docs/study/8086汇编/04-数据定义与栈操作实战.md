---
sidebar_position: 4
title: 数据定义与栈操作实战
description: 详细整理 DB/DW/DUP、端序、PUSH/POP、栈帧与寄存器保护的规范写法和常见问题。
---

# 数据定义与栈操作实战

## 背景

8086 程序稳定性很大程度取决于两件事：数据布局是否清晰、栈是否平衡。很多“偶发 bug”都是因为 `PUSH/POP` 失配或数据宽度定义错误。

## DB / DW / DUP

### 怎么用

```asm
byte_val   DB 12H
word_val   DW 1234H
buf_16     DB 16 DUP(0)
stack_area DW 64 DUP(?)
```

### 注释与命名建议

- 变量名带宽度语义：`u8_`、`u16_`、`buf_`。
- 注释写容量单位，避免“16 是字节还是元素”歧义。

```asm
rx_buf DB 64 DUP(0)      ; 64 bytes RX buffer
```

### 易错点

- 把 `DW` 当字节数组用，索引步长错。
- `DUP(?)` 当已清零内存用。

### 注意点

- 需要零初始化时用 `DUP(0)`，不是 `DUP(?)`。

## 小端存储

### 怎么用

```asm
num DW 3100H
```

内存布局：

```text
低地址: 00H
高地址: 31H
```

### 易错点

- 调试内存窗口时按大端理解，误判程序错误。

### 注意点

- 看 16 位值时总是“低字节在前、高字节在后”。

## PUSH / POP

### 怎么用

```asm
PUSH AX
PUSH BX
; ...
POP BX
POP AX
```

语义：

```text
PUSH: SP = SP - 2, [SS:SP] = src
POP : dst = [SS:SP], SP = SP + 2
```

### 注释与命名建议

- 过程头部统一写“保护寄存器列表”。

```asm
; save: AX BX SI
PUSH AX
PUSH BX
PUSH SI
```

### 易错点

- `PUSH AL` / `POP DL`：8086 下字节寄存器不允许入栈出栈。
- `POP` 顺序与 `PUSH` 同序，导致值错位。
- 跳转分支里提前 `RET`，没把栈恢复完整。

### 注意点

- `PUSH` 与 `POP` 必须严格成对出现。
- 每新增一个 `PUSH`，必须在所有返回路径补对应 `POP`。

## 常见过程保护模板

```asm
proc_xxx PROC NEAR
    PUSH AX
    PUSH BX
    PUSH SI
    ; body
    POP SI
    POP BX
    POP AX
    RET
proc_xxx ENDP
```

## 栈相关调试技巧

- 入口保存初始 `SP`，退出前比对，快速发现栈泄漏。
- 对复杂过程临时加断点检查 `SS:SP` 变化是否符合预期。

## 数据段组织建议

- 常量区与可写区分开定义。
- 缓冲区和状态变量按模块分组，避免散放。
- 同一类数据统一后缀：`_cnt`、`_idx`、`_flag`。

## 章末检查清单

- 所有变量定义是否位宽明确。
- `DUP(?)` 是否仅用于无需初值区域。
- 每条返回路径是否都恢复了栈。
- 是否存在字节寄存器 `PUSH/POP` 误用。
