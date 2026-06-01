---
sidebar_position: 4
title: 数据定义与栈操作
description: 整理 DB、DW、DUP、小端存储、PUSH、POP 和栈的基本规则。
---

# 数据定义与栈操作

## 背景

8086 程序需要在数据段中定义变量，在堆栈段中保存临时数据、返回地址和现场。数据定义和栈操作虽然属于基础内容，但非常容易和字节、字、地址顺序混淆。

## 数据段格式

例子：

```asm
DATA SEGMENT
AREA1  DB 14H, 3BH
AREA2  DB 3 DUP(0)
ARRAY  DW 3100H, 01A6H
STRING DB 'GOOD'
DATA ENDS
```

含义：

```text
DB      Define Byte，定义字节
DW      Define Word，定义字
DUP     重复定义
```

## DB

`DB` 定义字节数据，一个数据占 8 位。

```asm
NUM DB 09H, 03H, 08H, 01H
```

C 对照：

```c
unsigned char NUM[] = {0x09, 0x03, 0x08, 0x01};
```

字符也可以用 `DB` 定义：

```asm
STRING DB 'GOOD'
```

## DW

`DW` 定义字数据，一个数据占 16 位。

```asm
result DW 0
```

C 对照：

```c
unsigned short result = 0;
```

数组例子：

```asm
ARRAY DW 3100H, 01A6H
```

## DUP

`DUP` 用于重复定义。

```asm
AREA2 DB 3 DUP(0)
```

含义：

```text
定义 3 个字节，初值都为 0。
```

堆栈区常见写法：

```asm
DW 64 DUP(?)
```

含义：

```text
定义 64 个未初始化的字。
```

## 小端存储

8086 使用小端方式保存字数据：

```asm
ARRAY DW 3100H
```

内存中低地址放低字节，高地址放高字节：

```text
低地址：00H
高地址：31H
```

结论：

```text
低字节在前，高字节在后。
```

## 栈的基本特点

8086 的栈在 `SS` 段中，栈顶由 `SP` 指向。

特点：

```text
先进后出 FILO
栈操作单位是字，也就是 16 位
PUSH 只压入字
POP 只弹出字
SP 指向当前栈顶
入栈时 SP 减小
出栈时 SP 增大
```

栈的增长方向：

```text
高地址 -> 低地址
```

## PUSH

格式：

```asm
PUSH src
```

功能：

```asm
SP = SP - 2
SS:[SP] = src
```

`src` 可以是：

```text
16 位通用寄存器
段寄存器
16 位存储器操作数
```

例子：

```asm
PUSH AX
PUSH BX
PUSH DS
PUSH WORD PTR [BX]
```

常见错误：

```asm
PUSH AL       ; 错，不能压入字节
PUSH 1234H    ; 8086 下通常不允许立即数直接入栈
```

## POP

格式：

```asm
POP dest
```

功能：

```asm
dest = SS:[SP]
SP = SP + 2
```

`dest` 可以是：

```text
16 位通用寄存器
段寄存器
16 位存储器操作数
```

例子：

```asm
POP AX
POP BX
POP DS
POP WORD PTR [SI]
```

常见错误：

```asm
POP DL       ; 错，DL 是 8 位
POP CS       ; 错，CS 不能作为 POP 目的操作数
```

## PUSH / POP 顺序

例子：

```asm
PUSH SI
PUSH CX
PUSH BX

POP BX
POP CX
POP SI
```

说明：

```text
栈是后进先出。
先 PUSH 的要后 POP，后 PUSH 的要先 POP。
```

## 栈操作例子

已知：

```text
AX = 1000H
BX = 2000H
CX = 4000H
SP = 1000H
```

执行：

```asm
PUSH AX
PUSH BX
PUSH CX
POP BX
POP AX
POP CX
```

最后结果：

```text
BX = 4000H
AX = 2000H
CX = 1000H
```

原因：

```text
最后压入的是 CX，所以第一次 POP 得到 4000H。
```
