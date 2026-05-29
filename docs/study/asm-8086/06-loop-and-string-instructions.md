---
sidebar_position: 6
title: 循环与字符串指令
description: 记录 LOOP、CLD、LODSB 等循环和字符串处理指令。
---

# 循环与字符串指令

## 背景

8086 中常用 `CX` 保存循环次数，配合 `LOOP` 实现循环。处理连续内存数据时，常用 `SI` 指向数据地址，配合 `LODSB` 逐字节读取。

## 正文

### LOOP

定义：循环指令，默认使用 `CX` 作为计数器。

例子：

```asm
LOOP A1
```

等价理解：

```asm
DEC CX
JNZ A1
```

C 对照：

```c
CX--;
if (CX != 0)
{
    goto A1;
}
```

说明：

- 每执行一次 `LOOP`，`CX` 自动减 1。
- 如果减完后 `CX != 0`，就跳转。
- 如果 `CX = 0`，就继续执行下一条指令。

---

### CLD

定义：Clear Direction Flag，清除方向标志 DF。

例子：

```asm
CLD
LODSB
```

含义：

```text
DF = 0
LODSB 后 SI 自动加 1
```

C 对照：

```c
p++;
```

说明：

- `CLD` 让字符串指令从低地址向高地址处理。
- 如果执行 `STD`，则方向相反，`SI` 或 `DI` 自动减小。

---

### LODSB

定义：Load String Byte，从 `DS:SI` 读取一个字节到 `AL`。

例子：

```asm
LODSB
```

在 `DF = 0` 时等价于：

```asm
MOV AL, [SI]
INC SI
```

C 对照：

```c
AL = *p;
p++;
```

具体案例：

```asm
MOV SI, 3000H
CLD
LODSB
```

如果：

```text
DS:[3000H] = 09H
```

执行后：

```text
AL = 09H
SI = 3001H
```

---

### 循环读取数组案例

汇编：

```asm
MOV SI, 3000H
MOV CX, 0008H
CLD

A1:
    LODSB
    LOOP A1
```

C 对照：

```c
p = 0x3000;
count = 8;

while (count != 0)
{
    AL = *p;
    p++;
    count--;
}
```

说明：

- `SI` 指向当前数据。
- `LODSB` 读取当前数据，并让 `SI++`。
- `LOOP` 控制循环次数。
