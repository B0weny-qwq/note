---
sidebar_position: 5
title: 算术、比较与条件跳转
description: 整理 ADD、ADC、SUB、SBB、INC、DEC、NEG、CMP、乘除法和条件跳转。
---

# 算术、比较与条件跳转

## 背景

算术指令负责加减乘除，比较指令通过修改标志位为条件跳转服务。8086 中没有 C 语言那种直接的 `if`，通常通过 `CMP` 设置标志位，再用跳转指令实现分支。

## 加法类指令

`ADD` 普通加法：

```asm
ADD dest, src
```

功能：

```asm
dest = dest + src
```

例子：

```asm
ADD AL, 18H
ADD AX, BX
ADD AL, [BX]
```

影响标志位：

```text
CF OF AF ZF SF PF
```

`ADC` 带进位加法：

```asm
ADC dest, src
```

功能：

```asm
dest = dest + src + CF
```

32 位加法例子：

```asm
; DX:AX = DX:AX + BX:CX
ADD AX, CX
ADC DX, BX
```

`INC` 自增 1：

```asm
INC reg/mem
```

注意：

```text
INC 影响 OF、AF、ZF、SF、PF，但不影响 CF。
```

## 减法类指令

`SUB` 普通减法：

```asm
SUB dest, src
```

功能：

```asm
dest = dest - src
```

`SBB` 带借位减法：

```asm
SBB dest, src
```

功能：

```asm
dest = dest - src - CF
```

32 位减法例子：

```asm
; DX:AX = DX:AX - BX:CX
SUB AX, CX
SBB DX, BX
```

`DEC` 自减 1：

```asm
DEC reg/mem
```

注意：

```text
DEC 影响 OF、AF、ZF、SF、PF，但不影响 CF。
```

`NEG` 取负：

```asm
NEG reg/mem
```

功能：

```asm
reg/mem = 0 - reg/mem
```

也可以理解为：

```text
按位取反 + 1
```

标志特点：

```text
操作数原来是 0，则 CF = 0。
操作数原来不是 0，则 CF = 1。
```

特殊溢出：

```text
8 位数：对 -128 取负会溢出。
16 位数：对 -32768 取负会溢出。
```

## CMP

格式：

```asm
CMP dest, src
```

功能：

```asm
dest - src
```

结果不保存，只影响标志位。`CMP` 本质上类似 `SUB`，但不改变原操作数。

例子：

```asm
CMP AL, 80H
CMP BX, DATA1
```

无符号比较：

```text
ZF = 1：两数相等
CF = 1：dest < src
CF = 0 且 ZF = 0：dest > src
```

带符号比较：

```text
SF XOR OF = 1：dest < src
SF XOR OF = 0：dest >= src
```

简单记法：

```text
CMP 后：
无符号看 CF
有符号看 SF 和 OF
是否相等看 ZF
```

## 无符号条件跳转

| 指令 | 含义 | C 对照 |
| --- | --- | --- |
| `JA` | 大于跳转 | `if (A > B)` |
| `JAE` | 大于等于跳转 | `if (A >= B)` |
| `JB` | 小于跳转 | `if (A < B)` |
| `JBE` | 小于等于跳转 | `if (A <= B)` |

例子：

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

## 有符号条件跳转

| 指令 | 含义 | C 对照 |
| --- | --- | --- |
| `JG` | 大于跳转 | `if (A > B)` |
| `JGE` | 大于等于跳转 | `if (A >= B)` |
| `JL` | 小于跳转 | `if (A < B)` |
| `JLE` | 小于等于跳转 | `if (A <= B)` |

说明：

```text
题目说无符号数，用 JA、JAE、JB、JBE。
题目说有符号数，用 JG、JGE、JL、JLE。
```

## 常见跳转指令

`JMP` 无条件跳转：

```asm
JMP A3
```

C 对照：

```c
goto A3;
```

`JCXZ` 判断 `CX` 是否为 0：

```asm
JCXZ A4
```

C 对照：

```c
if (CX == 0)
{
    goto A4;
}
```

注意：

```text
JMP 不保存返回地址，不能和 RET 配套。
CALL 才能和 RET 配套。
```

## MUL 和 IMUL

`MUL` 无符号乘法，只有一个显式操作数。

8 位乘法：

```asm
MUL r/m8
```

功能：

```asm
AX = AL * r/m8
```

16 位乘法：

```asm
MUL r/m16
```

功能：

```asm
DX:AX = AX * r/m16
```

`IMUL` 是带符号乘法，把操作数看成补码数。

标志位：

```text
MUL：高半部分为 0，则 CF = OF = 0；否则 CF = OF = 1。
IMUL：高半部分是低半部分的符号扩展，则 CF = OF = 0；否则 CF = OF = 1。
```

## DIV 和 IDIV

`DIV` 无符号除法。

除数是 8 位：

```asm
DIV r/m8
```

要求和结果：

```text
被除数在 AX
AL = 商
AH = 余数
```

除数是 16 位：

```asm
DIV r/m16
```

要求和结果：

```text
被除数在 DX:AX
AX = 商
DX = 余数
```

`IDIV` 是带符号除法，余数符号和被除数相同。

注意：

```text
如果商放不进 AL 或 AX，会产生除法错误中断。
除法后所有条件标志位无意义。
```

## CBW 和 CWD

`CBW` 把字节扩展成字：

```asm
CBW
```

功能：

```text
把 AL 的符号位扩展到 AH。
```

`CWD` 把字扩展成双字：

```asm
CWD
```

功能：

```text
把 AX 的符号位扩展到 DX。
```

使用场景：

```asm
CBW
IDIV r/m8

CWD
IDIV r/m16
```

## 最容易错的点

- `ADD` 和 `ADC` 搭配做多字节加法。
- `SUB` 和 `SBB` 搭配做多字节减法。
- `INC` 和 `DEC` 不影响 `CF`。
- `CMP` 不保存结果，只改标志位。
- `MUL`、`DIV` 有隐含寄存器。
- `IDIV` 前通常要做符号扩展。
