---
sidebar_position: 4
title: 数据定义与栈操作
description: 记录 DB、DW、DUP、PUSH、POP 等基础用法。
---

# 数据定义与栈操作

## 背景

实验程序中经常需要定义数据区和堆栈区。子程序中也常用 `PUSH` 和 `POP` 保存现场。

## 正文

### DB

定义：Define Byte，定义字节数据。

例子：

```asm
NUM DB 09H,03H,08H,01H
```

含义：

```text
定义 4 个字节数据
```

C 对照：

```c
unsigned char NUM[] = {0x09, 0x03, 0x08, 0x01};
```

---

### DW

定义：Define Word，定义字数据，一个字是 16 位。

例子：

```asm
result DW 0
```

含义：

```text
定义一个 16 位变量 result，初始值为 0
```

C 对照：

```c
unsigned short result = 0;
```

---

### DUP

定义：重复定义数据。

例子：

```asm
DW 64 DUP(?)
```

含义：

```text
定义 64 个未初始化的字
```

C 对照：

```c
unsigned short stack[64];
```

---

### PUSH

定义：把 16 位数据压入栈。

例子：

```asm
PUSH SI
```

含义：

```text
保存 SI 的当前值
```

C 对照：

```c
stack.push(SI);
```

说明：

- 8086 中一次 `PUSH` 压入 2 字节。
- 子程序中常用 `PUSH` 保存会被修改的寄存器。

---

### POP

定义：从栈顶弹出 16 位数据到寄存器。

例子：

```asm
POP SI
```

含义：

```text
恢复 SI 的值
```

C 对照：

```c
SI = stack.pop();
```

---

### PUSH / POP 顺序

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
栈是后进先出
所以先 PUSH 的要后 POP
后 PUSH 的要先 POP
```

C 对照：

```c
push(SI);
push(CX);
push(BX);

BX = pop();
CX = pop();
SI = pop();
```
