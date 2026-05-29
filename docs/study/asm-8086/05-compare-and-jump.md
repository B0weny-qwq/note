---
sidebar_position: 5
title: 比较与条件跳转
description: 记录 CMP、JMP、JBE、JAE、JCXZ 等跳转指令的用法。
---

# 比较与条件跳转

## 背景

汇编中没有 C 语言那种直接的 `if`，通常通过 `CMP` 设置标志位，再通过条件跳转实现分支。

## 正文

### 标号

定义：给代码中的某个位置起名字，方便跳转。

例子：

```asm
A1: LODSB
```

含义：

```text
A1 表示 LODSB 这一行的位置
```

C 对照：

```c
A1:
```

说明：

- `A1`、`A2`、`A3`、`A4` 都只是标号，不是指令。

---

### CMP

定义：比较两个操作数，本质是做减法，但不保存结果，只影响标志位。

例子：

```asm
CMP AL, BH
```

含义：

```text
比较 AL 和 BH
本质上临时计算 AL - BH
```

C 对照：

```c
// 用于后续 if 判断
AL - BH;
```

说明：

- `CMP` 本身不跳转。
- 后面通常接 `JBE`、`JAE`、`JE`、`JNE` 等条件跳转。

---

### JMP

定义：无条件跳转。

例子：

```asm
JMP A3
```

C 对照：

```c
goto A3;
```

说明：

- `JMP` 不保存返回地址。
- `JMP` 不能和 `RET` 配套。
- `CALL` 才能和 `RET` 配套。

---

### JCXZ

定义：如果 `CX = 0`，就跳转。

例子：

```asm
JCXZ A4
```

C 对照：

```c
if (CX == 0) goto A4;
```

用途：

```text
循环开始前判断数据个数是否为 0
```

---

### JBE

定义：无符号数小于等于时跳转。

例子：

```asm
CMP AL, BH
JBE A2
```

C 对照：

```c
if (AL <= BH) goto A2;
```

本题案例：

```asm
CMP AL, BH
JBE A2
MOV BH, AL
```

C 对照：

```c
if (AL > max)
{
    max = AL;
}
```

说明：

- `JBE` 用于无符号数。
- 有符号数小于等于用 `JLE`。

---

### JAE

定义：无符号数大于等于时跳转。

例子：

```asm
CMP AL, BL
JAE A3
```

C 对照：

```c
if (AL >= BL) goto A3;
```

本题案例：

```asm
CMP AL, BL
JAE A3
MOV BL, AL
```

C 对照：

```c
if (AL < min)
{
    min = AL;
}
```

说明：

- `JAE` 用于无符号数。
- 有符号数大于等于用 `JGE`。

---

### 无符号比较跳转

| 指令 | 含义 | C 对照 |
| --- | --- | --- |
| `JA` | 大于跳转 | `if (A > B)` |
| `JAE` | 大于等于跳转 | `if (A >= B)` |
| `JB` | 小于跳转 | `if (A < B)` |
| `JBE` | 小于等于跳转 | `if (A <= B)` |

---

### 有符号比较跳转

| 指令 | 含义 | C 对照 |
| --- | --- | --- |
| `JG` | 大于跳转 | `if (A > B)` |
| `JGE` | 大于等于跳转 | `if (A >= B)` |
| `JL` | 小于跳转 | `if (A < B)` |
| `JLE` | 小于等于跳转 | `if (A <= B)` |

说明：

```text
题目说无符号数，用 JA/JAE/JB/JBE
题目说有符号数，用 JG/JGE/JL/JLE
```
