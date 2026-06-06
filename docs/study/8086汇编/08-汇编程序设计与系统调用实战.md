---
sidebar_position: 8
title: 汇编程序设计与系统调用实战
description: 详细整理程序框架、伪指令、INT 21H/BIOS 调用、注释命名规范、易错点和注意事项。
---

# 汇编程序设计与系统调用实战

## 背景

第 4 章的关键不是再背指令，而是把前面指令组织成可维护程序。核心能力是：固定程序骨架、统一注释命名、明确系统调用约定。

## 完整程序骨架

### 怎么用

```asm
DATA SEGMENT
    msg DB 'HELLO$', 0
DATA ENDS

STACK SEGMENT
    DW 64 DUP(?)
STACK ENDS

CODE SEGMENT
    ASSUME CS:CODE, DS:DATA, SS:STACK
START:
    MOV AX, DATA
    MOV DS, AX

    ; body

    MOV AH, 4CH
    INT 21H
CODE ENDS
END START
```

### 注释与命名建议

- 入口标签统一 `START`，退出路径统一 `exit_ok`、`exit_err`。
- 段内变量用业务语义名：`input_buf`、`line_len`、`err_code`。
- 每段开头加用途注释。

### 易错点

- `ASSUME` 写了但没执行 `MOV DS, AX`，导致读错数据段。
- 过程退出用了 `RET` 而不是程序退出中断。

### 注意点

- `END START` 必须指向真实入口标签。

## 常用伪指令与操作符

### 怎么用

```asm
count      DW 0
rx_buf     DB 128 DUP(0)
tmp_ptr    DW OFFSET rx_buf
UART_DATA  EQU 03F8H
```

`OFFSET` 取地址，`PTR` 指定位宽：

```asm
MOV BYTE PTR [SI], 0
MOV AX, OFFSET rx_buf
```

### 注释与命名建议

- 常量全部 `ALL_CAPS`：`UART_DATA`、`MAX_LEN`。
- 缓冲区用 `_buf`，长度用 `_len`，索引用 `_idx`。

### 易错点

- 把 `MOV AX, var` 当成取地址（这是取内容）。
- 未指定位宽导致汇编器无法判断。

### 注意点

- `DUP(?)` 是未初始化，不等于清零。

## DOS/BIOS 调用

## INT 21H 常用功能

### 怎么用

打印 `$` 结尾字符串：

```asm
MOV AH, 09H
MOV DX, OFFSET msg
INT 21H
```

键盘输入单字符：

```asm
MOV AH, 01H
INT 21H           ; AL 返回字符
```

程序退出：

```asm
MOV AH, 4CH
MOV AL, 00H
INT 21H
```

### 注释与命名建议

- 中断调用前注明“输入寄存器/输出寄存器”。

```asm
; in: AH=09H, DS:DX=msg$
; out: none
INT 21H
```

### 易错点

- 09H 输出字符串忘了 `$` 结束符。
- 调用前 `DS:DX` 指针未准备好。

### 注意点

- 中断调用可能改动寄存器，关键寄存器要提前保存。

## BIOS 常见中断

- `INT 10H`：显示服务。
- `INT 16H`：键盘服务。

建议：课程实验优先 DOS，直接硬件交互才转 BIOS。

## 程序结构化模板

### 怎么用

```asm
CALL read_line
JC   exit_err
CALL parse_line
JC   exit_err
CALL process
JMP  exit_ok

exit_err:
    MOV AL, 1
    JMP exit_prog

exit_ok:
    XOR AL, AL

exit_prog:
    MOV AH, 4CH
    INT 21H
```

### 注释与命名建议

- 标签按功能命名：`parse_fail`、`calc_done`、`print_retry`。
- 不再使用 `L1/L2/L3`。

### 易错点

- 过程失败路径没有统一出口，导致资源/寄存器恢复不一致。

### 注意点

- 复杂流程尽量“单入口、少出口”，异常路径集中处理。

## 章末检查清单

- `DS/SS/ES` 是否在入口显式初始化。
- 系统调用前寄存器是否按约定装载。
- 字符串输出是否保证 `$` 终止。
- 标签命名是否具备语义，不使用无意义编号标签。
