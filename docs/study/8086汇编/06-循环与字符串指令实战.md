---
sidebar_position: 6
title: 循环与字符串指令实战
description: 详细整理 LOOP、REP、MOVS/CMPS/SCAS/LODS/STOS 的具体写法、命名注释规范、易错点和注意事项。
---

# 循环与字符串指令实战

## 背景

字符串指令能显著简化批量内存处理，但前提是 `SI/DI/CX/DF` 四个状态必须正确初始化。多数 bug 都不是指令本身错，而是上下文没准备好。

## LOOP / JCXZ

### 怎么用

```asm
MOV CX, count
loop_begin:
    ; body
    LOOP loop_begin
```

`JCXZ` 用于零次处理快速退出：

```asm
JCXZ done
```

### 注释与命名建议

- 循环标签统一：`loop_xxx_begin/loop_xxx_end`。
- 注释写循环不变量，例如“`CX` 为剩余元素数”。

### 易错点

- `LOOP` 自动 `DEC CX`，又手动 `DEC CX`，导致少处理一轮。
- `CX` 未初始化就进入 `LOOP`。

### 注意点

- 大批量处理时先 `JCXZ` 防御空输入。

## 方向标志 DF

### 怎么用

```asm
CLD   ; 正向，SI/DI 自增
STD   ; 反向，SI/DI 自减
```

### 注释与命名建议

- 每次进入字符串流程前显式写 `CLD` 或 `STD`，并注释方向。

### 易错点

- 上一个流程改了 `DF`，新流程没重置，导致指针反向跑。

### 注意点

- 除非明确反向扫描，默认使用 `CLD`。

## MOVS / REP MOVS

### 怎么用

逐字节复制：

```asm
CLD
MOV SI, OFFSET src_buf
MOV DI, OFFSET dst_buf
MOV CX, len
REP MOVSB
```

逐字复制：

```asm
REP MOVSW
```

### 注释与命名建议

- 源/目的缓冲区命名：`src_xxx`、`dst_xxx`。
- 明确 `CX` 单位：字节还是字。

```asm
MOV CX, payload_bytes      ; 字节数
REP MOVSB
```

### 易错点

- `MOVSW` 仍按字节长度装 `CX`，结果复制减半或越界。
- 忘记设置 `ES:DI`。

### 注意点

- 复制重叠区时别直接用 `REP MOVSB`，应根据方向选择前向/后向策略。

## CMPS / REPE / REPNE

### 怎么用

比较两个缓冲区是否相等：

```asm
CLD
MOV SI, OFFSET a_buf
MOV DI, OFFSET b_buf
MOV CX, len
REPE CMPSB
JNE not_equal
```

### 注释与命名建议

- `equal`、`not_equal` 标签名比 `L1/L2` 更安全。

### 易错点

- `REPE` 与 `REPNE` 用反。
- 比较前忘记统一长度。

### 注意点

- 结束后可通过 `ZF` 判断最后一次比较结果，通过 `CX` 判断提前停止还是比较完。

## SCAS / REPNE SCAS

### 怎么用

在字符串中查字符：

```asm
CLD
MOV AL, target_char
MOV DI, OFFSET buf
MOV CX, len
REPNE SCASB
JZ found
```

### 注释与命名建议

- 标签命名：`found`、`not_found`。
- 注释写“查找目标值”和“扫描长度”。

### 易错点

- 把目标值放错寄存器（`SCASB` 比较的是 `AL` 与 `ES:[DI]`）。

### 注意点

- `SCAS` 默认访问 `ES:DI`，不是 `DS:SI`。

## LODS / STOS

### 怎么用

```asm
LODSB     ; AL <- DS:[SI]
STOSB     ; ES:[DI] <- AL
```

例：过滤并重写字符流

```asm
CLD
MOV SI, OFFSET src
MOV DI, OFFSET dst
MOV CX, src_len
filter_loop:
    LODSB
    ; modify AL
    STOSB
    LOOP filter_loop
```

### 注释与命名建议

- `src_len`、`dst_len` 分开命名，不复用一个计数变量。

### 易错点

- `STOSB` 写的是 `ES:DI`，忘了初始化 `ES`。

### 注意点

- 用 `REP STOSB` 清零内存时，先准备 `AL=0`。

## 常用模板

### 模板 1：缓冲区清零

```asm
CLD
MOV DI, OFFSET buf
MOV CX, buf_len
XOR AL, AL
REP STOSB
```

### 模板 2：字符串比较（固定长度）

```asm
CLD
MOV SI, OFFSET lhs
MOV DI, OFFSET rhs
MOV CX, n
REPE CMPSB
JNE diff
; equal
```

## 章末检查清单

- 方向位 `DF` 是否显式设置。
- `SI/DI/CX` 是否按指令语义初始化。
- `DS` 与 `ES` 是否正确。
- `MOVSB/MOVSW` 的长度单位是否正确。
