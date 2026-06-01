---
sidebar_position: 6
title: BCD、逻辑与移位指令
description: 整理 BCD 调整指令、逻辑运算指令、移位指令和循环移位指令。
---

# BCD、逻辑与移位指令

## 背景

算术运算之外，8086 还常用 BCD 调整指令处理十进制数，用逻辑指令处理位，用移位和循环移位指令完成乘除 2、取位、拼接和状态处理。

## BCD 类型

压缩 BCD：

```text
一个字节放两个十进制数字。
59 = 0101 1001B = 59H
```

非压缩 BCD：

```text
一个字节只放一个十进制数字，低 4 位有效，高 4 位通常为 0。
9 = 0000 1001B = 09H
```

ASCII 数字：

```text
数字字符需要加 30H。
'9' = 39H
'5' = 35H
```

## DAA 和 DAS

`DAA` 用于压缩 BCD 加法后调整。

```asm
MOV AL, 27H
ADD AL, 18H
DAA
```

结果：

```text
AL = 45H
```

`DAS` 用于压缩 BCD 减法后调整。

```asm
MOV AL, 27H
SUB AL, 18H
DAS
```

结果：

```text
AL = 09H
```

## AAA 和 AAS

`AAA` 用于非压缩 BCD 或 ASCII 加法后调整。

```asm
MOV AH, 0
MOV AL, 09H
MOV BL, 05H
ADD AL, BL
AAA
```

结果：

```text
AX = 0104H，表示 14。
```

如果原来是 ASCII 数字，最后可以转回 ASCII：

```asm
OR AX, 3030H
```

`AAS` 用于非压缩 BCD 或 ASCII 减法后调整。

```asm
SUB AL, BL
AAS
```

## AAM 和 AAD

`AAM` 用于非压缩 BCD 乘法后调整。

```asm
MOV AL, 09H
MOV BL, 06H
MUL BL
AAM
```

结果：

```text
AH = 05H
AL = 04H
```

表示十进制 `54`。

`AAD` 用于非压缩 BCD 除法前调整。

```asm
; AX = 0307H，表示十进制 37
; BL = 05H
AAD
DIV BL
```

调整前：

```text
AH = 03H
AL = 07H
```

`AAD` 后：

```text
AL = AH * 10 + AL
AH = 0
```

口诀：

```text
加减乘：调整在后。
除法：AAD 在前。
```

## NOT

格式：

```asm
NOT reg/mem
```

功能：

```text
按位取反，0 变 1，1 变 0。
```

例子：

```asm
NOT AX
NOT BL
NOT BYTE PTR [BX]
```

注意：

```text
NOT 不影响标志位。
```

## AND

格式：

```asm
AND dest, src
```

功能：

```text
dest = dest & src
```

常用作用：清零某些位，保留某些位。

规律：

```text
和 1 相与：保持不变。
和 0 相与：清 0。
```

例子：

```asm
AND AL, 0FH     ; 屏蔽高 4 位，只保留低 4 位
AND AL, 0FCH    ; 清除 AL 的第 0、1 位
```

## OR

格式：

```asm
OR dest, src
```

功能：

```text
dest = dest | src
```

常用作用：把某些位置 1。

规律：

```text
和 0 相或：保持不变。
和 1 相或：置 1。
```

例子：

```asm
OR AL, 20H
OR AX, 3030H
```

## XOR

格式：

```asm
XOR dest, src
```

功能：

```text
dest = dest XOR src
```

常用作用：翻转某些位，或者清零寄存器。

规律：

```text
和 0 异或：保持不变。
和 1 异或：取反。
```

例子：

```asm
XOR AL, 03H
XOR AX, AX
```

## TEST

格式：

```asm
TEST dest, src
```

功能：

```text
临时计算 dest & src，只影响标志位，不保存结果。
```

例子：

```asm
TEST AL, 80H
JNZ  T_ALARM
```

含义：

```text
测试 AL 的最高位是否为 1。
```

## 逻辑指令对标志位的影响

`AND`、`OR`、`XOR`、`TEST`：

```text
CF = 0
OF = 0
根据结果设置 SF、ZF、PF
AF 不确定
```

`NOT`：

```text
不影响标志位。
```

## 移位指令格式

格式：

```asm
移位指令  操作数, 计数值
```

计数值只能是：

```asm
1
CL
```

例子：

```asm
SHL AX, 1
MOV CL, 3
SHL AX, CL
```

## SHL 和 SAL

格式：

```asm
SHL dest, count
SAL dest, count
```

`SHL` 和 `SAL` 功能相同。

功能：

```text
所有位左移。
最低位补 0。
最高位移入 CF。
```

效果：

```text
左移 1 位，相当于无符号数乘以 2。
```

例子：

```asm
MOV AH, 00000110B
SHL AH, 1
```

结果：

```text
AH = 00001100B
```

## SHR

格式：

```asm
SHR dest, count
```

功能：

```text
所有位右移。
最高位补 0。
最低位移入 CF。
```

适合无符号数。

效果：

```text
右移 1 位，相当于无符号数除以 2。
```

## SAR

格式：

```asm
SAR dest, count
```

功能：

```text
所有位右移。
最高位保持原符号位。
最低位移入 CF。
```

适合带符号数。

例子：

```asm
MOV AL, 10000000B
MOV CL, 3
SAR AL, CL
```

结果：

```text
AL = 11110000B，即 -16。
```

## 循环移位指令

普通移位会丢掉移出去的位，循环移位会把移出去的位绕回另一端，或者让 `CF` 参与循环。

`ROL` 循环左移：

```asm
ROL dest, count
```

功能：

```text
最高位移到最低位，同时进入 CF。
```

`ROR` 循环右移：

```asm
ROR dest, count
```

功能：

```text
最低位移到最高位，同时进入 CF。
```

`RCL` 带进位循环左移：

```asm
RCL dest, count
```

功能：

```text
把 CF 也看成循环链条的一部分。
最高位进入 CF，原 CF 进入最低位。
```

`RCR` 带进位循环右移：

```asm
RCR dest, count
```

功能：

```text
把 CF 也看成循环链条的一部分。
最低位进入 CF，原 CF 进入最高位。
```

区别：

```text
ROL/ROR：小循环，不带 CF 参与循环。
RCL/RCR：大循环，把 CF 也算进循环。
```

## 常用模板

无符号数乘 10：

```asm
XOR AH, AH
SHL AX, 1      ; 2 * AL
MOV BX, AX
SHL AX, 1      ; 4 * AL
SHL AX, 1      ; 8 * AL
ADD AX, BX     ; 10 * AL
```

测试某一位是否为 1：

```asm
TEST AL, 80H
JNZ  LABEL
```

清某些位：

```asm
AND AL, mask
```

置某些位：

```asm
OR AL, mask
```

翻转某些位：

```asm
XOR AL, mask
```
