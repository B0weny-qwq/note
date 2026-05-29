---
sidebar_position: 3
title: 数据传送与寻址
description: 记录 MOV、立即数、寄存器、内存寻址和 OFFSET 的基本用法。
---

# 数据传送与寻址

## 背景

汇编中最常见的操作就是数据传送。`MOV` 本身很简单，但要重点区分立即数、寄存器、内存地址和变量名。

## 正文

### MOV

定义：数据传送指令，把源操作数送到目标操作数。

格式：

```asm
MOV 目标, 源
```

例子：

```asm
MOV AX, 0000H
```

C 对照：

```c
AX = 0x0000;
```

---

### 寄存器到寄存器

例子：

```asm
MOV BL, BH
```

含义：

```text
BL = BH
```

C 对照：

```c
BL = BH;
```

---

### 立即数到寄存器

例子：

```asm
MOV CX, 0008H
```

含义：

```text
CX = 8
```

C 对照：

```c
CX = 8;
```

---

### 内存到寄存器

例子：

```asm
MOV BH, [SI]
```

含义：

```text
BH = DS:[SI]
```

C 对照：

```c
BH = *p;
```

---

### 寄存器到内存

例子：

```asm
MOV result, AX
```

含义：

```text
把 AX 中的值保存到 result 变量
```

C 对照：

```c
result = AX;
```

---

### OFFSET

定义：取得变量在段内的偏移地址。

例子：

```asm
MOV SI, OFFSET NUM
```

含义：

```text
SI = NUM 的偏移地址
```

C 对照：

```c
p = &NUM;
```

---

### ORG

定义：设置后续数据或代码的偏移地址。

例子：

```asm
ORG 3000H
NUM DB 09H,03H,08H
```

含义：

```text
NUM 的偏移地址从 3000H 开始
```

说明：

- `ORG` 是伪指令，不是 CPU 指令。
- 它不会修改 DS，只是告诉汇编器后面的内容从某个偏移地址开始安排。
