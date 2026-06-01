---
sidebar_position: 3
title: 数据传送指令
description: 整理 MOV、XCHG、XLAT、IN、OUT、LEA、LDS、LES 和标志传送指令。
---

# 数据传送指令

## 背景

数据传送指令负责把数据从一个位置送到另一个位置。常见来源和目的地包括寄存器、存储器、立即数、段寄存器、I/O 端口、堆栈和标志寄存器。

多数数据传送指令不影响标志位，`SAHF`、`POPF` 等标志传送指令除外。

## 指令总览

常见数据传送类指令：

```asm
MOV
PUSH
POP
XCHG
XLAT
IN
OUT
LEA
LDS
LES
LAHF
SAHF
PUSHF
POPF
```

`PUSH` 和 `POP` 单独放在“数据定义与栈操作”中整理。

## MOV

格式：

```asm
MOV dest, src
```

功能：

```asm
dest = src
```

例子：

```asm
MOV AL, 'B'
MOV AX, BX
MOV AL, [BX]
MOV [BX], AL
```

含义：

```text
把源操作数送入目的操作数。
```

## MOV 的合法形式

立即数送寄存器：

```asm
MOV CL, 4
MOV DX, 0FFH
MOV SI, 200H
```

立即数送内存：

```asm
MOV bvar, 0AH
MOV wvar, 0BH
```

如果内存大小不明确，要写：

```asm
MOV BYTE PTR [BX], 255
MOV WORD PTR [BX], 255
```

寄存器之间传送：

```asm
MOV AH, AL
MOV AX, BX
MOV DS, AX
MOV ES, AX
```

寄存器和内存之间传送：

```asm
MOV AL, [BX]
MOV [BX], AL
MOV DX, [BP]
MOV DX, [BP+4]
```

## MOV 的常见错误

两个操作数位数不一致：

```asm
MOV AL, 050AH     ; 错，AL 是 8 位，050AH 是 16 位
MOV SI, DL        ; 错，SI 是 16 位，DL 是 8 位
```

两个操作数都是内存：

```asm
MOV buf2, buf1    ; 错
```

正确写法：

```asm
MOV AX, buf1
MOV buf2, AX
```

无法判断内存大小：

```asm
MOV [BX+SI], 255  ; 错
```

正确写法：

```asm
MOV BYTE PTR [BX+SI], 255
MOV WORD PTR [BX+SI], 255
```

段寄存器操作错误：

```asm
MOV DS, ES        ; 错
MOV DS, 100H      ; 错
MOV CS, [SI]      ; 错
```

正确写法：

```asm
MOV AX, ES
MOV DS, AX
```

或者：

```asm
MOV AX, 100H
MOV DS, AX
```

注意：

```text
CS 不能作为 MOV 的目的操作数。
```

## XCHG

格式：

```asm
XCHG dest, src
```

功能：

```text
交换 dest 和 src 的内容。
```

例子：

```asm
XCHG AX, BX
XCHG AH, AL
XCHG AX, WVAR
XCHG AL, BYTE PTR WVAR+1
```

允许：

```text
寄存器 <-> 寄存器
寄存器 <-> 内存
```

不允许：

```asm
XCHG buf1, buf2   ; 错，两个都是内存
XCHG AX, DS       ; 错，段寄存器不能参与
```

## XLAT

格式：

```asm
XLAT
```

功能：

```asm
AL = DS:[BX + AL]
```

使用前要准备：

```text
BX = 表格首地址
AL = 表内偏移量
```

例子：

```asm
TABLE DB 40H, 79H, 24H, 30H, 19H
      DB 12H, 02H, 78H, 00H, 18H

MOV AL, 5
MOV BX, OFFSET TABLE
XLAT
```

执行后：

```text
AL = 12H
```

## IN

`IN` 从 I/O 端口读数据，数据寄存器只能是 `AL` 或 `AX`。

直接端口地址：

```asm
IN AL, port8
IN AX, port8
```

例子：

```asm
IN AL, 0F1H
IN AX, 80H
```

端口地址放在 `DX`：

```asm
MOV DX, 310H
IN AL, DX
```

注意：

```text
直接端口地址只能是 8 位，也就是 00H 到 FFH。
端口号大于 FFH 时，必须用 DX。
```

## OUT

`OUT` 向 I/O 端口写数据，数据寄存器只能是 `AL` 或 `AX`。

直接端口地址：

```asm
OUT port8, AL
OUT port8, AX
```

例子：

```asm
OUT 85H, AL
OUT 44H, AX
```

端口地址放在 `DX`：

```asm
MOV DX, 0FF4H
OUT DX, AL
```

常见错误：

```asm
IN BX, DX       ; 错，数据寄存器只能是 AL 或 AX
OUT 0FFEH, AL   ; 错，直接端口号超过 FFH
```

正确写法：

```asm
MOV DX, 0FFEH
OUT DX, AL
```

## LEA

格式：

```asm
LEA reg16, mem
```

功能：

```text
把内存操作数的有效地址送入 16 位通用寄存器。
```

例子：

```asm
LEA BX, [SI]
```

如果：

```text
DS:[1000H] = 1234H
SI = 1000H
```

执行后：

```text
BX = 1000H
```

对比：

```asm
MOV BX, [SI]
```

执行后：

```text
BX = 1234H
```

结论：

```text
LEA 取地址，MOV 取内容。
```

## LDS 和 LES

`LDS` 从内存中装入 4 字节远指针。

格式：

```asm
LDS reg16, mem
```

功能：

```text
reg16 = mem 中前 2 字节
DS    = mem 中后 2 字节
```

例子：

```asm
LDS SI, [450H]
```

如果：

```text
DS:[450H] = F346H
DS:[452H] = 0A90H
```

执行后：

```text
SI = F346H
DS = 0A90H
```

`LES` 类似，只是把段地址装入 `ES`：

```asm
LES DI, [BX]
```

如果：

```text
DS:[BX]   = 0300H
DS:[BX+2] = 0500H
```

执行后：

```text
DI = 0300H
ES = 0500H
```

## 标志传送指令

`LAHF` 把 `FLAGS` 低字节送入 `AH`：

```asm
LAHF
```

`SAHF` 把 `AH` 中的相关位送回 `FLAGS`：

```asm
SAHF
```

`PUSHF` 把整个标志寄存器压栈：

```asm
PUSHF
```

`POPF` 从栈中恢复标志寄存器：

```asm
POPF
```

注意：

```text
SAHF 和 POPF 会改变标志位。
```

## 标志位操作指令

进位标志 `CF`：

```asm
CLC     ; CF = 0
STC     ; CF = 1
CMC     ; CF = ~CF
```

方向标志 `DF`：

```asm
CLD     ; DF = 0，串操作地址自动增加
STD     ; DF = 1，串操作地址自动减少
```

中断标志 `IF`：

```asm
CLI     ; IF = 0，关中断
STI     ; IF = 1，开中断
```
