---
sidebar_position: 1
title: "黑体辐射与 Planck 公式"
description: "从腔体模式数、能量量子化和 Boltzmann 权重推导 Planck 黑体辐射公式。"
---

# 黑体辐射与 Planck 公式

## 这篇在解决什么问题

黑体辐射实验说明：热平衡黑体的辐射谱只和温度有关，和材料、形状无关。

经典理论的问题是：Rayleigh-Jeans 公式在高频区发散，也就是紫外灾难。Planck 的关键修正不是改模式数，而是改每个电磁模式的平均能量。

## 推导前提

腔体中的电磁场可以分解成很多驻波模式。频率在 $\nu$ 到 $\nu+d\nu$ 之间的模式数密度为：

```math
g(\nu)d\nu=\frac{8\pi\nu^2}{c^3}d\nu
```

如果仍按经典能量均分，每个模式平均能量是 $k_BT$，得到：

```math
\rho(\nu,T)d\nu
=g(\nu)k_BT\,d\nu
=\frac{8\pi\nu^2}{c^3}k_BT\,d\nu
```

这就是 Rayleigh-Jeans 公式。问题在于它随 $\nu^2$ 增大，高频区积分会发散。

## Planck 的量子化假设

Planck 假设每个频率为 $\nu$ 的模式，能量只能一份一份取值：

```math
\varepsilon_n=n h\nu,\quad n=0,1,2,\cdots
```

热平衡中，能量为 $\varepsilon_n$ 的概率权重服从 Boltzmann 因子：

```math
P_n\propto e^{-\varepsilon_n/k_BT}
=e^{-nh\nu/k_BT}
```

于是单个模式平均能量为：

```math
\bar{\varepsilon}
=
\frac{\sum_{n=0}^{\infty}n h\nu e^{-nh\nu/k_BT}}
{\sum_{n=0}^{\infty}e^{-nh\nu/k_BT}}
```

令：

```math
q=e^{-h\nu/k_BT}
```

则：

```math
\sum_{n=0}^{\infty}q^n=\frac{1}{1-q}
```

对 $q$ 求导并乘以 $q$：

```math
\sum_{n=0}^{\infty}nq^n
=q\frac{d}{dq}\left(\frac{1}{1-q}\right)
=\frac{q}{(1-q)^2}
```

所以：

```math
\bar{\varepsilon}
=h\nu\frac{q/(1-q)^2}{1/(1-q)}
=h\nu\frac{q}{1-q}
=\frac{h\nu}{e^{h\nu/k_BT}-1}
```

## 最终公式

用模式数密度乘以单个模式平均能量：

```math
\rho(\nu,T)d\nu
=
\frac{8\pi\nu^2}{c^3}
\frac{h\nu}{e^{h\nu/k_BT}-1}d\nu
```

即：

```math
\rho(\nu,T)d\nu
=
\frac{8\pi h\nu^3}{c^3}
\frac{1}{e^{h\nu/k_BT}-1}d\nu
```

## 难点注释

- 模式数密度 $g(\nu)$ 仍然是经典电磁场驻波计数，不是 Planck 新假设。
- 真正改变的是每个模式的平均能量：从 $k_BT$ 变成 $\frac{h\nu}{e^{h\nu/k_BT}-1}$。
- 高频时 $h\nu$ 很大，激发一个量子需要很高能量，Boltzmann 权重会压低高频模式占有。

## 易错点

- 不要把 $h\nu$ 当成平均能量。平均能量是加权平均后的 $\bar{\varepsilon}$。
- 不要忘记分母中的 $-1$，它决定了低频极限能回到经典结果。
- 公式中 $\rho(\nu,T)$ 是频率形式；若换成波长形式，表达式会变。
