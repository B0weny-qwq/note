---
sidebar_position: 8
title: 汇编程序设计、伪指令与系统调用
description: 整理完整程序框架、常用伪指令、DOS/BIOS 调用和基本设计方法。
---

# 汇编程序设计、伪指令与系统调用

## 背景

第 4 章把前面分散的指令知识收拢到“怎么写成完整程序”上。重点不再是单条指令，而是程序框架、伪指令、系统调用和顺序/分支/循环/子程序四种设计方式。

## 完整程序框架

常见结构：

```asm
DATA SEGMENT
    BUF DB 100 DUP(?)
DATA ENDS

STACK SEGMENT
    DW 64 DUP(?)
STACK ENDS

CODE SEGMENT
    ASSUME CS:CODE, DS:DATA, SS:STACK
START:
    MOV AX, DATA
    MOV DS, AX
    ; ...
    MOV AH, 4CH
    INT 21H
CODE ENDS
END START
```

要点：

- `ASSUME` 只告诉汇编器段关系，不会真的改寄存器。
- `END START` 表示汇编结束并指定入口点。
- 字符串程序一般还要准备附加段 `ES`。

## 常用伪指令和操作符

常见伪指令：

- `DB`、`DW`、`DD`：定义字节、字、双字。
- `DUP`：重复定义存储空间。
- `SEGMENT`、`ENDS`：定义段。
- `PROC`、`ENDP`：定义过程。
- `EQU`：定义符号常量。
- `ORG`：指定后续偏移地址。

常见操作符：

- `OFFSET`：取偏移地址。
- `SEG`：取段地址。
- `PTR`：强制类型。
- `TYPE`、`LENGTH`、`SIZE`：用于数据长度计算。

## DOS / BIOS 中断调用

第 4 章把 `INT` 用作系统服务入口：

- `INT 21H`：DOS 功能调用，常用于键盘输入、字符串输出、程序返回。
- `INT 10H`：BIOS 显示服务。
- `INT 16H`：BIOS 键盘服务。

典型退出程序：

```asm
MOV AH, 4CH
INT 21H
```

典型字符串输出：

```asm
MOV AH, 09H
MOV DX, OFFSET MSG
INT 21H
```

## 程序设计方法

课程把汇编程序分成四种基本结构：

- 顺序程序：按步骤直接执行，常用于公式计算和代码转换。
- 分支程序：`CMP + 条件转移` 实现条件判断。
- 循环程序：`LOOP` 或 `CMP/Jcc` 控制重复执行。
- 子程序设计：`CALL/RET` 封装重复逻辑。

## 常见题型

第 4 章反复出现的应用题有：

- 字符分类、大小写转换。
- 十进制、二进制、BCD、ASCII 之间的转换。
- 查表程序。
- 多精度运算。
- 子程序参数传递和返回值设计。

## 写题时的固定检查项

- 入口是否初始化 `DS`、`SS`、`ES`。
- 内存操作数是否标明字节/字。
- 是否保存被子程序改动的寄存器。
- `CALL`、`RET`、`INT` 的返回路径是否匹配。
- DOS 字符串输出是否以 `$` 结束。
