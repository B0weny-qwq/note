---
sidebar_position: 30
title: "动量本征函数与 delta 归一化"
description: "求解动量算符本征方程，并说明连续谱本征函数为什么归一化到 Dirac delta 函数。"
---

# 动量本征函数与 delta 归一化

## 动量本征方程

一维动量算符：

```math
\hat p=-i\hbar\frac{d}{dx}
```

动量本征方程：

```math
\hat p\psi_p(x)=p\psi_p(x)
```

代入：

```math
-i\hbar\frac{d\psi_p}{dx}=p\psi_p
```

整理：

```math
\frac{d\psi_p}{dx}
=
\frac{ip}{\hbar}\psi_p
```

解得：

```math
\psi_p(x)=Ce^{ipx/\hbar}
```

## 归一化问题

若在无限空间中：

```math
|\psi_p(x)|^2=|C|^2
```

积分：

```math
\int_{-\infty}^{\infty}|\psi_p(x)|^2dx
```

发散，因此平面波不能归一化为 1。

## delta 归一化

连续谱本征函数通常选择：

```math
\psi_p(x)
=
\frac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar}
```

满足：

```math
\int_{-\infty}^{\infty}
\psi_p^*(x)\psi_{p'}(x)dx
=
\delta(p-p')
```

这叫 delta 归一化。

## 盒归一化理解

也可以先把粒子限制在长度 $L$ 的盒子里，取周期边界条件：

```math
\psi(x+L)=\psi(x)
```

则：

```math
e^{ipL/\hbar}=1
```

所以：

```math
p_n=\frac{2\pi\hbar n}{L}
```

动量先变成离散谱。最后令：

```math
L\to\infty
```

离散谱变成连续谱。

## 难点注释

- Dirac delta 不是普通函数，而是处理连续谱归一化的工具。
- 确定动量态完全不局域，所以无法在无限空间归一化为 1。
- 真实粒子通常是动量本征态的波包叠加。

## 易错点

- 不要把平面波强行归一化为普通概率 1。
- 连续谱正交关系是 $\delta(p-p')$，不是 $\delta_{pp'}$。
- 归一化常数和傅里叶变换约定有关。
