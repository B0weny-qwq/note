---
sidebar_position: 7
title: 子程序调用
description: 记录 PROC、CALL、RET、参数传递、返回值和子程序保存现场。
---

# 子程序调用

## 背景

今天学到的重点是子程序结构。子程序可以把一段功能独立出来，主程序通过 `CALL` 调用，子程序通过 `RET` 返回。8086 中返回值通常放在寄存器中。

## 正文

### PROC NEAR

定义：定义一个近过程，也就是同一代码段内的子程序。

例子：

```asm
BRANCH PROC NEAR
```

C 对照：

```c
void branch()
{
}
```

说明：

- `PROC` 是伪指令。
- `NEAR` 表示近调用，只保存和恢复 `IP`，不改变 `CS`。

---

### ENDP

定义：表示过程定义结束。

例子：

```asm
BRANCH ENDP
```

C 对照：

```c
}
```

说明：

- `ENDP` 是伪指令。
- 它用于和 `PROC` 配套。

---

### CALL

定义：调用子程序，并自动保存返回地址。

例子：

```asm
CALL BRANCH
```

C 对照：

```c
branch();
```

执行逻辑：

```text
1. 把 CALL 下一条指令的地址压入栈
2. 跳转到 BRANCH 子程序执行
```

说明：

- `CALL` 会保存返回地址。
- 所以后面遇到 `RET` 才能回来。

---

### RET

定义：从子程序返回到 `CALL` 的下一条指令。

例子：

```asm
RET
```

C 对照：

```c
return;
```

执行逻辑：

```text
1. 从栈中弹出返回地址
2. 跳回 CALL 后面的那条指令
```

具体案例：

```asm
CALL BRANCH
HERE: JMP HERE

BRANCH PROC NEAR
    RET
BRANCH ENDP
```

执行结果：

```text
RET 后回到 HERE: JMP HERE
```

---

### CALL 和 RET 的关系

例子：

```asm
CALL BRANCH

BRANCH PROC NEAR
    RET
BRANCH ENDP
```

C 对照：

```c
branch();

void branch()
{
    return;
}
```

重点：

```text
CALL 负责进去
RET 负责回来
```

注意：

```text
CALL 和 RET 是一对
JMP 和 RET 不是一对
```

---

### 子程序入口参数

定义：主程序调用子程序前，先把参数放到约定的寄存器或内存中。

例子：

```asm
MOV SI, 3000H
MOV CX, 0008H
CALL BRANCH
```

含义：

```text
DS:SI 指向数据首地址
CX 表示数据个数
```

C 对照：

```c
branch(p, count);
```

---

### 子程序返回值

定义：子程序计算完成后，通常把结果放到某个寄存器中返回。

例子：

```asm
MOV AX, BX
RET
```

C 对照：

```c
return BX;
```

说明：

- `RET` 本身不负责返回值。
- 返回值要提前放入寄存器。
- 本实验中结果放在 `AX`。

---

### 保存现场

定义：子程序中如果要修改某些寄存器，可以先 `PUSH` 保存，结束前用 `POP` 恢复。

例子：

```asm
PUSH SI
PUSH CX
PUSH BX

POP BX
POP CX
POP SI
```

C 对照：

```c
old_SI = SI;
old_CX = CX;
old_BX = BX;

// 子程序修改寄存器

BX = old_BX;
CX = old_CX;
SI = old_SI;
```

说明：

- `PUSH` 和 `POP` 顺序必须相反。
- 因为栈是后进先出。

---

### 最大最小值子程序案例

原程序核心：

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

---

### A1、A2、A3、A4 跳转关系

```text
A1 是循环开始，负责读取当前数据
A2 是检查最小值
A3 是本轮循环结束点
A4 是子程序出口
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

C 对照：

```c
if (CX == 0)
    goto A4;

BH = *SI;
BL = BH;

A1:
    AL = *SI;
    SI++;

    if (AL <= BH)
        goto A2;

    BH = AL;
    goto A3;

A2:
    if (AL >= BL)
        goto A3;

    BL = AL;

A3:
    CX--;
    if (CX != 0)
        goto A1;

    AX = BX;

A4:
    return;
```

---

### 求和子程序案例

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

汇编结构示例：

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

C 对照：

```c
result = S;
```

---

## 参考

- 课堂实验代码
- 8086 汇编基础指令表
