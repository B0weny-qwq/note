---
sidebar_position: 8.1
title: 怎么写 INT 21H 字符串输出题
description: 面向考试入门，讲清 DOS 21H 号中断里 09H 功能怎么用。
---

# 怎么写 INT 21H 字符串输出题

## 这类题在考什么

这类题通常考：

```text
用 DOS 功能调用输出一个字符串
```

这是汇编程序设计里最常见的实验题之一。

## 先记公式

`INT 21H` 的 `09H` 功能常用格式：

```asm
MOV AH, 09H
MOV DX, OFFSET MSG
INT 21H
```

要求字符串以：

```text
$
```

结尾。

## 做题步骤

### 第一步：先定义字符串，并加 `$`

比如：

```asm
MSG DB 'HELLO$',0
```

考试里最关键的是 `$` 结束符。

### 第二步：保证 `DS` 已经正确初始化

否则 `DX` 即使对，也可能指向错段。

### 第三步：装功能号和偏移地址

- `AH = 09H`
- `DX = OFFSET MSG`

### 第四步：执行 `INT 21H`

## 最简单例子

```asm
DATA SEGMENT
MSG DB 'HELLO$'
DATA ENDS

CODE SEGMENT
    ASSUME CS:CODE, DS:DATA
START:
    MOV AX, DATA
    MOV DS, AX

    MOV AH, 09H
    MOV DX, OFFSET MSG
    INT 21H

    MOV AH, 4CH
    INT 21H
CODE ENDS
END START
```

## 易错点

- 忘了 `$` 结束。
- `DS` 没初始化。
- 把字符串地址错误地写进别的寄存器。

## 注意点

- 小白先把 `09H -> DS:DX -> $ 结尾字符串` 这组搭配记牢。
- 这是考试和实验里都会反复出现的固定模板。
