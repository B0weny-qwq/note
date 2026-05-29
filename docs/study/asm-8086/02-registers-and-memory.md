---
sidebar_position: 2
title: 8086 寄存器与内存访问
description: 记录 AX、BX、CX、DX、SI、DS 等寄存器在实验程序中的常见用法。
---

# 8086 寄存器与内存访问

## 背景

8086 程序大量依赖寄存器。理解寄存器分工之后，才能看懂数据从哪里来、放到哪里去、结果保存在哪里。

## 正文

### AX

定义：通用寄存器，常用于保存运算结果。

拆分：

```text
AX = AH + AL
AH 是 AX 的高 8 位
AL 是 AX 的低 8 位
```

例子：

```asm
MOV AX, BX
```

如果：

```text
BX = 0901H
```

执行后：

```text
AX = 0901H
AH = 09H
AL = 01H
```

C 对照：

```c
AX = BX;
```

---

### BX

定义：通用寄存器，也可以拆成 `BH` 和 `BL`。

拆分：

```text
BX = BH + BL
BH 是 BX 的高 8 位
BL 是 BX 的低 8 位
```

例子：

```asm
MOV BH, [SI]
MOV BL, BH
```

含义：

```text
BH 保存当前最大值
BL 保存当前最小值
```

C 对照：

```c
max = *p;
min = max;
```

---

### CX

定义：计数寄存器，常用于循环次数。

例子：

```asm
MOV CX, 0008H
LOOP A1
```

C 对照：

```c
count = 8;
while (count--)
{
}
```

说明：

- `LOOP` 默认使用 `CX`。
- 每执行一次 `LOOP`，`CX` 自动减 1。

---

### SI

定义：源变址寄存器，常用于指向内存数据。

例子：

```asm
MOV SI, 3000H
MOV AL, [SI]
```

含义：

```text
SI = 3000H
AL = DS:[3000H]
```

C 对照：

```c
p = 0x3000;
AL = *p;
```

---

### DS

定义：数据段寄存器。

例子：

```asm
MOV AX, 0000H
MOV DS, AX
MOV SI, 3000H
```

含义：

```text
DS:SI = 0000:3000
```

说明：

- `[SI]` 默认使用 `DS:SI`。
- 如果 `DS = 0000H`，`SI = 3000H`，访问的就是 `0000:3000`。

---

### DS:SI

定义：段地址加偏移地址形成一个内存访问位置。

例子：

```asm
MOV AL, [SI]
```

等价理解：

```text
AL = DS:[SI]
```

C 对照：

```c
AL = *p;
```
