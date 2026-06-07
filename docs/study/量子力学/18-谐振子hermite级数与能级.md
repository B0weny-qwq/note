---
sidebar_position: 18
title: "谐振子 Hermite 级数与能级"
description: "由 Hermite 方程的级数截断条件推导一维谐振子能级。"
---

# 谐振子 Hermite 级数与能级

## 从代换后的方程开始

谐振子无量纲方程为：

```math
\frac{d^2\psi}{d\xi^2}+(\lambda-\xi^2)\psi=0
```

令：

```math
\psi(\xi)=e^{-\xi^2/2}H(\xi)
```

代入后得到 Hermite 型方程：

```math
H''-2\xi H'+(\lambda-1)H=0
```

## 级数展开

设：

```math
H(\xi)=\sum_{j=0}^{\infty}a_j\xi^j
```

则：

```math
H'=\sum_{j=1}^{\infty}ja_j\xi^{j-1}
```

```math
H''=\sum_{j=2}^{\infty}j(j-1)a_j\xi^{j-2}
```

把指标统一成 $\xi^j$ 的系数，得到递推关系：

```math
a_{j+2}
=
\frac{2j+1-\lambda}{(j+2)(j+1)}a_j
```

## 为什么要截断

如果级数无限延伸，$H(\xi)$ 的高阶行为会使整体波函数不再可归一化。

要让级数在某一阶 $n$ 截断，需要：

```math
2n+1-\lambda=0
```

即：

```math
\lambda=2n+1
```

其中：

```math
n=0,1,2,\cdots
```

## 能级

由定义：

```math
\lambda=\frac{2E}{\hbar\omega}
```

所以：

```math
\frac{2E_n}{\hbar\omega}=2n+1
```

得到：

```math
E_n=\hbar\omega\left(n+\frac12\right)
```

## 难点注释

- 能级离散不是人为规定，而是由归一化要求筛选出来。
- $n$ 是 Hermite 多项式阶数，也对应第 $n$ 个能级。
- 基态能量 $E_0=\frac12\hbar\omega$ 不为 0，称为零点能。

## 易错点

- 不要把 $n$ 从 1 开始；谐振子从 $n=0$ 开始。
- 不要漏掉 $\frac12\hbar\omega$。
- 递推关系中是 $2j+1-\lambda$。
