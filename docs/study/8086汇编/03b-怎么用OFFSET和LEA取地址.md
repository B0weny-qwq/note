---
sidebar_position: 3.2
title: 怎么用 OFFSET 和 LEA 取地址
description: 面向考试入门，讲清取变量内容和取变量地址的区别。
---

# 怎么用 OFFSET 和 LEA 取地址

## 这类题在考什么

这类题通常考：

```text
到底是在取内容，还是在取地址
OFFSET 和 LEA 有什么关系
```

这是汇编初学者最容易混的点。

## 先记公式

先记三句：

```text
MOV AX, VAR        -> 取 VAR 的内容
MOV AX, OFFSET VAR -> 取 VAR 的偏移地址
LEA AX, VAR        -> 取 VAR 的有效地址
```

## 做题步骤

### 第一步：先问题目要的是“值”还是“地址”

如果题目要访问变量本身内容，  
就不是取地址题。

### 第二步：看到 `OFFSET` 就先想“偏移地址”

这在考试里非常稳定。

### 第三步：看到 `LEA` 就先想“装入有效地址”

`LEA` 也不是读内存内容。

### 第四步：把 `LEA` 和普通 `MOV` 分开

```asm
MOV AX, VAR
```

和

```asm
LEA AX, VAR
```

意义完全不同。

## 最简单例子

如果：

```asm
NUM DW 1234H
```

那么：

```asm
MOV AX, NUM
```

表示：

```text
AX <- NUM 的内容
```

而：

```asm
MOV AX, OFFSET NUM
```

表示：

```text
AX <- NUM 的偏移地址
```

## 易错点

- 把 `LEA` 当成“取内容”。
- 看到变量名就默认是取地址。
- 不区分“变量本身的值”和“变量所在位置”。

## 注意点

- 取地址题本质上是在做“指针初始化”。
- 小白先把“`MOV VAR` 取内容，`OFFSET/LEA` 取地址”背牢。
