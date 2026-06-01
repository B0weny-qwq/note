---
sidebar_position: 7
title: 循环、字符串指令与子程序
description: 整理 LOOP、CLD、STD、LODSB、CALL、RET、PROC、参数传递和保存现场。
---

# 循环、字符串指令与子程序

## 背景

8086 中常用 `CX` 保存循环次数，用 `LOOP` 控制循环。处理连续内存数据时，常用 `SI`、`DI` 配合字符串指令。子程序则用 `CALL` 进入，用 `RET` 返回。

## LOOP

格式：

```asm
LOOP label
```

等价理解：

```asm
DEC CX
JNZ label
```

C 对照：

```c
CX--;
if (CX != 0)
{
    goto label;
}
```

说明：

- `LOOP` 默认使用 `CX` 作为计数器。
- 每执行一次 `LOOP`，`CX` 自动减 1。
- 如果减完后 `CX != 0`，就跳转。
- 如果减完后 `CX = 0`，就继续执行下一条指令。

## CLD 和 STD

`CLD` 清除方向标志 `DF`：

```asm
CLD
```

含义：

```text
DF = 0，字符串指令执行后 SI 或 DI 自动增加。
```

`STD` 设置方向标志 `DF`：

```asm
STD
```

含义：

```text
DF = 1，字符串指令执行后 SI 或 DI 自动减少。
```

## LODSB

格式：

```asm
LODSB
```

功能：

```text
从 DS:SI 读取一个字节到 AL。
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

例子：

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

## 循环读取数组

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

```text
SI 指向当前数据。
LODSB 读取当前数据，并让 SI 自动变化。
LOOP 控制循环次数。
```

## PROC 和 ENDP

`PROC` 定义过程开始：

```asm
BRANCH PROC NEAR
```

C 对照：

```c
void branch()
{
}
```

`ENDP` 定义过程结束：

```asm
BRANCH ENDP
```

说明：

```text
PROC 和 ENDP 是伪指令。
NEAR 表示近过程，只保存和恢复 IP，不改变 CS。
```

## CALL

格式：

```asm
CALL BRANCH
```

功能：

```text
调用子程序，并自动保存返回地址。
```

执行逻辑：

```text
1. 把 CALL 下一条指令的地址压入栈。
2. 跳转到 BRANCH 子程序执行。
```

C 对照：

```c
branch();
```

## RET

格式：

```asm
RET
```

功能：

```text
从子程序返回到 CALL 的下一条指令。
```

执行逻辑：

```text
1. 从栈中弹出返回地址。
2. 跳回 CALL 后面的那条指令。
```

例子：

```asm
CALL BRANCH
HERE: JMP HERE

BRANCH PROC NEAR
    RET
BRANCH ENDP
```

执行结果：

```text
RET 后回到 HERE: JMP HERE。
```

## CALL 和 RET 的关系

重点：

```text
CALL 负责进去。
RET 负责回来。
```

注意：

```text
CALL 和 RET 是一对。
JMP 和 RET 不是一对。
```

## 参数传递

主程序调用子程序前，先把参数放到约定的寄存器或内存中。

```asm
MOV SI, 3000H
MOV CX, 0008H
CALL BRANCH
```

含义：

```text
DS:SI 指向数据首地址。
CX 表示数据个数。
```

C 对照：

```c
branch(p, count);
```

## 返回值

子程序计算完成后，通常把返回值放到约定寄存器中。

```asm
MOV AX, BX
RET
```

C 对照：

```c
return BX;
```

说明：

```text
RET 本身不负责返回值。
返回值要提前放入寄存器。
```

## 保存现场

子程序中如果要修改某些寄存器，可以先 `PUSH` 保存，结束前用 `POP` 恢复。

```asm
PUSH SI
PUSH CX
PUSH BX

; 子程序主体

POP BX
POP CX
POP SI
```

说明：

```text
PUSH 和 POP 顺序必须相反，因为栈是后进先出。
```

## 最大最小值子程序案例

核心代码：

```asm
BRANCH PROC NEAR
    JCXZ A4
    PUSH SI
    PUSH CX
    PUSH BX
    MOV BH, [SI]
    MOV BL, BH
    CLD

A1:
    LODSB
    CMP AL, BH
    JBE A2
    MOV BH, AL
    JMP A3

A2:
    CMP AL, BL
    JAE A3
    MOV BL, AL

A3:
    LOOP A1
    MOV AX, BX
    POP BX
    POP CX
    POP SI

A4:
    RET
BRANCH ENDP
```

寄存器分工：

```text
DS:SI   指向数据地址
CX      数据个数 / 循环次数
AL      当前取出的数据
BH      当前最大值
BL      当前最小值
BX      最大值和最小值组合
AX      最终返回结果
```

结果关系：

```text
BH = 最大值
BL = 最小值
BX = BH:BL

MOV AX, BX 后：
AH = 最大值
AL = 最小值
```

流程：

```text
进入子程序
 |
 |-- JCXZ A4
 |   如果 CX = 0，直接返回
 |
 v
初始化 BH 和 BL
 |
 v
A1: LODSB
 |
 |-- 如果 AL <= BH，跳到 A2 检查最小值
 |
 |-- 如果 AL > BH，更新最大值 BH = AL，然后 JMP A3
 |
 v
A2: 比较 AL 和 BL
 |
 |-- 如果 AL >= BL，跳到 A3
 |
 |-- 如果 AL < BL，更新最小值 BL = AL
 |
 v
A3: LOOP A1
 |
 |-- CX-- 后 CX != 0，跳回 A1
 |
 |-- CX-- 后 CX == 0，继续向下执行
 |
 v
MOV AX, BX
恢复寄存器
 |
 v
A4: RET
```

## 求和子程序案例

题目：

```text
N 为偶数，计算：
S = 2×4 + 4×6 + 6×8 + ... + N×(N+2)
```

C 对照：

```c
S = 0;

for (i = 2; i <= N; i += 2)
{
    S += i * (i + 2);
}
```

汇编结构：

```asm
DATA7 SEGMENT
result DW 0
DATA7 ENDS

CODE SEGMENT
    ASSUME CS:CODE, DS:DATA7

START:
    MOV AX, DATA7
    MOV DS, AX

    MOV AX, 0014H
    CALL CAL_SUM

    MOV result, AX

HERE:
    JMP HERE

CAL_SUM PROC NEAR
    PUSH BX
    PUSH CX
    PUSH DX
    PUSH SI

    MOV CX, AX
    MOV BX, 0002H
    MOV SI, 0000H

A1:
    MOV AX, BX
    ADD AX, 0002H
    MUL BX
    ADD SI, AX

    ADD BX, 0002H
    CMP BX, CX
    JBE A1

    MOV AX, SI

    POP SI
    POP DX
    POP CX
    POP BX
    RET
CAL_SUM ENDP

CODE ENDS
    END START
```

寄存器分工：

```text
AX  传入 N，乘法中参与运算，最后保存返回值 S
BX  当前偶数 i
CX  保存 N
SI  累加和 S
DX  MUL 的高 16 位结果
```

结果保存：

```asm
MOV result, AX
```
