---
sidebar_position: 2
title: "Planck 公式的两个极限"
description: "用 Taylor 展开理解 Planck 公式如何同时给出 Rayleigh-Jeans 极限和 Wien 极限。"
---

# Planck 公式的两个极限

## 先写 Planck 公式

频率形式的 Planck 黑体辐射公式为：

```math
\rho(\nu,T)d\nu
=
\frac{8\pi h\nu^3}{c^3}
\frac{1}{e^{h\nu/k_BT}-1}d\nu
```

为了看极限，令：

```math
x=\frac{h\nu}{k_BT}
```

公式中的温度和频率关系主要藏在：

```math
\frac{1}{e^x-1}
```

## 低频极限：Rayleigh-Jeans 公式

低频或高温时：

```math
x=\frac{h\nu}{k_BT}\ll 1
```

对指数函数作展开：

```math
e^x=1+x+\frac{x^2}{2!}+\cdots
```

只保留最低阶：

```math
e^x-1\simeq x
```

代回 Planck 公式：

```math
\rho(\nu,T)d\nu
\simeq
\frac{8\pi h\nu^3}{c^3}
\frac{1}{h\nu/k_BT}d\nu
```

化简：

```math
\rho(\nu,T)d\nu
\simeq
\frac{8\pi\nu^2}{c^3}k_BT\,d\nu
```

这正是 Rayleigh-Jeans 公式。

## 高频极限：Wien 公式

高频或低温时：

```math
x=\frac{h\nu}{k_BT}\gg 1
```

这时：

```math
e^x-1\simeq e^x
```

于是：

```math
\frac{1}{e^x-1}\simeq e^{-x}
```

代回：

```math
\rho(\nu,T)d\nu
\simeq
\frac{8\pi h\nu^3}{c^3}
e^{-h\nu/k_BT}d\nu
```

这就是 Wien 高频近似。

## 物理理解

Planck 公式不是把两个经验公式硬拼起来，而是同一个表达式在两个极限下自然退化为不同近似。

- 低频时 $h\nu\ll k_BT$，能级间隔小，能量近似连续，经典能量均分可用。
- 高频时 $h\nu\gg k_BT$，激发一个量子太贵，高频模式被指数抑制。

## 难点注释

判断使用哪个近似时，不看 $\nu$ 本身大不大，而是看无量纲量：

```math
\frac{h\nu}{k_BT}
```

同一个频率，在不同温度下可能属于不同极限。

## 易错点

- $e^x-1\simeq x$ 只适用于 $x\ll 1$。
- $e^x-1\simeq e^x$ 只适用于 $x\gg 1$。
- 紫外灾难的本质是高频时还错误使用低频经典近似。
