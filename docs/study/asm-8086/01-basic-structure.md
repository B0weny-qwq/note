---
sidebar_position: 1
title: 8086 程序结构与语句格式
description: 整理 8086 汇编程序的段结构、入口、伪指令和语句书写格式。
---

# 8086 程序结构与语句格式

## 背景

8086 汇编程序通常由代码段、数据段、堆栈段组成。学习指令前，先要分清 CPU 真正执行的机器指令和只给汇编器看的伪指令。

## 程序基本框架

典型实验程序：

```asm
DATA SEGMENT
NUM DB 09H, 03H, 08H
DATA ENDS

STACK SEGMENT
DW 64 DUP(?)
STACK ENDS

CODE SEGMENT
    ASSUME CS:CODE, DS:DATA, SS:STACK

START:
    MOV AX, DATA
    MOV DS, AX

HERE:
    JMP HERE

CODE ENDS
    END START
```

要点：

- `DATA SEGMENT` 和 `DATA ENDS` 定义数据段。
- `STACK SEGMENT` 和 `STACK ENDS` 定义堆栈段。
- `CODE SEGMENT` 和 `CODE ENDS` 定义代码段。
- `START` 是程序入口标号。
- `END START` 告诉汇编器源程序结束，并指定入口为 `START`。

## 执行性语句

执行性语句会被汇编成 CPU 可以执行的机器指令。

格式：

```asm
标号: 指令助记符  目的操作数, 源操作数  ; 注释
```

例子：

```asm
START: MOV AX, DATA
       ADD AL, BL
```

说明：

- `MOV`、`ADD`、`CMP`、`JMP`、`CALL` 都是执行性指令。
- 标号可以省略，操作数个数由具体指令决定。

## 说明性语句

说明性语句也叫伪指令，不由 CPU 执行，主要用于组织程序、定义数据和设置段关系。

格式：

```asm
名字  伪指令助记符  参数, 参数, ...  ; 注释
```

例子：

```asm
DATA SEGMENT
NUM  DB 12H
DATA ENDS
```

常见伪指令：

| 伪指令 | 作用 |
| --- | --- |
| `SEGMENT` | 定义段开始 |
| `ENDS` | 定义段结束 |
| `ASSUME` | 告诉汇编器段寄存器和段名的对应关系 |
| `DB` | 定义字节数据 |
| `DW` | 定义字数据 |
| `DUP` | 重复定义数据 |
| `ORG` | 设置后续内容的偏移地址 |
| `PROC` | 定义过程开始 |
| `ENDP` | 定义过程结束 |
| `END` | 源程序结束 |

## ASSUME 和 DS 初始化

`ASSUME` 只告诉汇编器段寄存器与段名的关系，不会真正修改段寄存器。

```asm
ASSUME CS:CODE, DS:DATA
```

真正初始化 `DS` 要写：

```asm
MOV AX, DATA
MOV DS, AX
```

不能直接写：

```asm
MOV DS, DATA      ; 错
```

原因：

```text
段寄存器不能直接接收立即数或段地址。
需要先送入普通寄存器，再送入段寄存器。
```

## 程序结束停机写法

实验环境中常用死循环停住程序，方便查看寄存器和内存。

```asm
HERE:
    JMP HERE
```

C 对照：

```c
while (1)
{
}
```

## 操作数符号速记

课件中常用缩写表示操作数类型：

```text
i8      8 位立即数
i16     16 位立即数
imm     立即数，可以是 i8 或 i16

r8      8 位通用寄存器：AH AL BH BL CH CL DH DL
r16     16 位通用寄存器：AX BX CX DX SI DI BP SP
reg     通用寄存器，可以是 r8 或 r16

seg     段寄存器：CS DS ES SS

m8      8 位存储器操作数
m16     16 位存储器操作数
mem     存储器操作数，可以是 m8 或 m16

dest    目的操作数
src     源操作数
```

## 操作数基本规则

常见格式：

```asm
指令  dest, src
指令  reg/mem
```

合法例子：

```asm
ADD AX, BX
ADD AX, 1234H
ADD AX, [BX]
ADD [BX], AX
```

常见错误：

```asm
ADD [BX], [SI]   ; 错，两个操作数不能同时是内存
MOV 1234H, AX    ; 错，立即数不能作目的操作数
```

如果内存操作数大小不明确，要写明：

```asm
INC BYTE PTR [BX]
INC WORD PTR [BX]
NEG BYTE PTR [SI]
```
