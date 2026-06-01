---
sidebar_position: 5
title: 算术比较与条件跳转实战
description: 详细整理 ADD/SUB/CMP/乘除法/条件跳转的具体写法、命名注释规范、易错点和注意事项。
---

# 算术比较与条件跳转实战

## 背景

8086 分支逻辑依赖标志位，不是高级语言那种直接 `if` 表达式。实际出错最多的是“比较类型选错跳转指令”和“忘了谁改了标志位”。

## ADD / ADC / INC

### 怎么用

```asm
ADD AX, BX
ADC DX, CX
INC SI
```

32 位加法模板：

```asm
; dst_hi:dst_lo += src_hi:src_lo
ADD dst_lo, src_lo
ADC dst_hi, src_hi
```

### 注释与命名建议

- 高低字命名固定：`sum_lo/sum_hi`、`acc_lo/acc_hi`。
- `ADC` 注释必须说明“携带低位进位”。

```asm
ADD acc_lo, val_lo      ; 先加低 16 位
ADC acc_hi, val_hi      ; 再加高 16 位 + CF
```

### 易错点

- 用两个 `ADD` 做多字加法，丢失进位。
- 误以为 `INC` 会修改 `CF`（不会）。

### 注意点

- `ADD/ADC` 都会改 `CF/OF/ZF/SF/PF/AF`，后续跳转依赖前要确认没有被覆盖。

## SUB / SBB / DEC / NEG

### 怎么用

```asm
SUB AX, BX
SBB DX, CX
DEC CX
NEG AX
```

32 位减法模板：

```asm
SUB dst_lo, src_lo
SBB dst_hi, src_hi
```

### 注释与命名建议

- `SBB` 注释写明“减借位”。
- 对 `NEG` 标注“求相反数”，并注明输入范围。

### 易错点

- 多字减法高位没用 `SBB`。
- 误以为 `DEC` 会影响 `CF`（不会）。
- `NEG` 对最小负数会溢出：`0x80` 或 `0x8000`。

### 注意点

- `SBB` 使用前 `CF` 必须来自同一减法链。

## CMP 与条件跳转

### 怎么用

```asm
CMP AX, BX
JA  greater_u      ; 无符号 >
JG  greater_s      ; 有符号 >
JE  equal
```

### 注释与命名建议

- 标签名体现语义和类型：
  `gt_unsigned`、`lt_signed`、`is_equal`。
- `CMP` 注释写“比较关系”，不是“做减法”。

```asm
CMP AX, limit_u16      ; 比较采样值与无符号上限
JA  overflow_u
```

### 易错点

- 无符号比较用了 `JG/JL`。
- 有符号比较用了 `JA/JB`。
- `CMP` 后插入其它改标志位指令，导致跳转条件失效。

### 注意点

- `CMP` 紧跟跳转是最安全写法，避免中间插入会改标志位的指令。

## 跳转指令选型速查

无符号：

```text
JA  >     JAE >=
JB  <     JBE <=
```

有符号：

```text
JG  >     JGE >=
JL  <     JLE <=
```

通用：

```text
JE/JZ   ==0
JNE/JNZ !=0
```

## MUL / IMUL / DIV / IDIV

### 怎么用

8 位乘法：

```asm
; AX = AL * r/m8
MUL BL
```

16 位乘法：

```asm
; DX:AX = AX * r/m16
MUL BX
```

8 位除法：

```asm
; AX / r/m8 -> AL 商, AH 余数
DIV BL
```

16 位除法：

```asm
; DX:AX / r/m16 -> AX 商, DX 余数
DIV BX
```

带符号除法前：

```asm
CBW      ; AL -> AX
IDIV BL

CWD      ; AX -> DX:AX
IDIV BX
```

### 注释与命名建议

- 乘除法前注释隐含寄存器输入输出。

```asm
; in : AX=dividend, BL=divisor
; out: AL=quot, AH=rem
DIV BL
```

### 易错点

- 忘记 `CBW/CWD`，导致 `IDIV` 结果错。
- 商超范围触发除法异常。
- 误判 `DIV` 输出位置（8 位除法商在 `AL`）。

### 注意点

- 除法后条件标志位无意义，别拿来做跳转判断。

## 结构化分支模板

```asm
; if (v > max) max = v;
CMP AL, max_val
JBE no_update
MOV max_val, AL
no_update:
```

```asm
; while (cx != 0) {...}
loop_begin:
    ; body
    DEC CX
    JNZ loop_begin
```

## 章末检查清单

- 比较场景是否明确“有符号/无符号”。
- `CMP` 到 `Jcc` 之间是否有改标志位指令。
- 多字加减是否用 `ADC/SBB`。
- 除法前是否完成被除数准备和符号扩展。
