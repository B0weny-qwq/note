---
sidebar_position: 6
title: "de Broglie 波与驻波条件"
description: "整理实物粒子的 de Broglie 关系、平面波表示和 Bohr 量子化的驻波解释。"
---

# de Broglie 波与驻波条件

## 从光子推广到实物粒子

光子满足：

```math
E=h\nu=\hbar\omega
```

```math
p=\frac{h}{\lambda}=\hbar k
```

de Broglie 的想法是：不只是光，所有实物粒子也具有波粒二象性。

因此对一般自由粒子也写：

```math
\lambda=\frac{h}{p}
```

以及：

```math
E=\hbar\omega,\quad \vec p=\hbar\vec k
```

## 平面波表示

自由粒子可用复平面波表示：

```math
\psi(\vec r,t)
=
A\exp\left[i(\vec k\cdot\vec r-\omega t)\right]
```

用 de Broglie 关系改写：

```math
\psi(\vec r,t)
=
A\exp\left[\frac{i}{\hbar}(\vec p\cdot\vec r-Et)\right]
```

这个形式后面会直接导出动量算符和能量算符。

## Bohr 量子化的驻波解释

如果电子绕核形成稳定驻波，圆周长度必须容纳整数个波长：

```math
2\pi r_n=n\lambda
```

代入：

```math
\lambda=\frac{h}{p}=\frac{h}{mv}
```

得到：

```math
2\pi r_n=n\frac{h}{mv}
```

整理：

```math
mvr_n=n\frac{h}{2\pi}=n\hbar
```

这正是 Bohr 的角动量量子化条件。

## 难点注释

- 平面波本身在无限空间不可归一化，它表示确定动量的理想态。
- 真实局域粒子通常应写成多个平面波叠加的波包。
- 驻波条件说明旧量子论和波动力学之间有自然联系。

## 易错点

- de Broglie 波不是经典物质波，不是说粒子真的像水波一样铺开。
- $\psi$ 是概率幅，概率密度是 $|\psi|^2$。
- $\lambda=h/p$ 中的 $p$ 是动量大小。
