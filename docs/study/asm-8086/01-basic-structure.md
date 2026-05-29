---
sidebar_position: 1
title: 8086 汇编程序基本结构
description: 记录 8086 汇编程序中段、入口、结束和实验程序常见写法。
---

# 8086 汇编程序基本结构

## 背景

8086 汇编程序通常由段结构组成。实验程序中常见代码段、数据段、堆栈段，以及一个入口标号 `START`。程序运行完成后，经常用死循环停住，方便观察寄存器结果。

## 正文

### SEGMENT / ENDS

定义：声明一个段的开始和结束。

例子：

```asm
CODE SEGMENT
CODE ENDS
```

C 对照：

```c
// 可以理解为划分一块代码区域
```

说明：

- `SEGMENT` 和 `ENDS` 是伪指令，不是 CPU 真正执行的机器指令。
- 常见段有代码段、数据段、堆栈段。

---

### ASSUME

定义：告诉汇编器，某个段寄存器默认对应哪个段。

例子：

```asm
ASSUME CS:CODE, DS:DATA, SS:SSTACK
```

含义：

```text
CS 默认对应 CODE
DS 默认对应 DATA
SS 默认对应 SSTACK
```

注意：

- `ASSUME` 只是告诉汇编器，不会真的修改寄存器。
- 真正修改 DS 的写法通常是：

```asm
MOV AX, DATA
MOV DS, AX
```

---

### START

定义：程序入口标号。

例子：

```asm
START:
    MOV AX, DATA
    MOV DS, AX
```

C 对照：

```c
int main()
{
}
```

说明：

- `START` 不是指令，只是一个标号。
- `END START` 表示程序从 `START` 处开始执行。

---

### HERE: JMP HERE

定义：死循环，常用于实验程序结束后停住。

例子：

```asm
HERE: JMP HERE
```

C 对照：

```c
while (1);
```

说明：

- 程序运行完后停在这里。
- 方便点击停止，然后查看寄存器，比如 AX 中的结果。

---

### END START

定义：告诉汇编器源程序结束，并指定入口为 `START`。

例子：

```asm
END START
```

说明：

- `END` 是伪指令。
- `START` 是程序入口标号。
