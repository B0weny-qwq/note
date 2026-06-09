---
sidebar_position: 9
title: "Maxwell 方程与电磁波"
description: "整理位移电流、Maxwell 方程组、无源区域波动方程、平面波关系和坡印廷矢量。"
---

# Maxwell 方程与电磁波

## 这篇在解决什么问题

前面的静电场、恒定电流场、恒定磁场都是电磁场的特殊情况。

Maxwell 方程组把它们统一起来，并给出电磁波存在的原因：

```text
变化的磁场产生电场，变化的电场产生磁场。
```

## 位移电流

恒定磁场中有：

```math
\nabla\times\vec H=\vec J
```

但如果电荷密度随时间变化，只写传导电流 $\vec J$ 会和电荷守恒不一致。

Maxwell 加入位移电流密度：

```math
\frac{\partial\vec D}{\partial t}
```

于是安培环路定律推广为：

```math
\nabla\times\vec H
=
\vec J+\frac{\partial\vec D}{\partial t}
```

位移电流不是普通导体里电荷穿过截面的运动，而是时变电场对磁场的贡献。

## Maxwell 方程组

微分形式：

```math
\nabla\cdot\vec D=\rho
```

```math
\nabla\times\vec E=-\frac{\partial\vec B}{\partial t}
```

```math
\nabla\cdot\vec B=0
```

```math
\nabla\times\vec H
=
\vec J+\frac{\partial\vec D}{\partial t}
```

积分形式：

```math
\oiint_S \vec D\cdot d\vec S=q
```

```math
\oint_L \vec E\cdot d\vec l
=
-
\frac{d}{dt}
\iint_S \vec B\cdot d\vec S
```

```math
\oiint_S \vec B\cdot d\vec S=0
```

```math
\oint_L \vec H\cdot d\vec l
=
I+
\frac{d}{dt}
\iint_S \vec D\cdot d\vec S
```

## 四个方程分别说什么

第一式：

```text
电荷产生电场通量。
```

第二式：

```text
变化的磁场产生旋涡电场。
```

第三式：

```text
不存在孤立磁荷，磁感线闭合。
```

第四式：

```text
电流和变化的电场都会产生旋涡磁场。
```

## 无源区域中的电磁波

无源、均匀、线性介质中：

```math
\rho=0,\quad \vec J=0
```

且：

```math
\vec D=\varepsilon\vec E,\quad \vec B=\mu\vec H
```

可以推出电场满足波动方程：

```math
\nabla^2\vec E
-
\mu\varepsilon
\frac{\partial^2\vec E}{\partial t^2}
=0
```

磁场也满足：

```math
\nabla^2\vec H
-
\mu\varepsilon
\frac{\partial^2\vec H}{\partial t^2}
=0
```

波速为：

```math
v=\frac{1}{\sqrt{\mu\varepsilon}}
```

真空中：

```math
c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}
```

## 平面电磁波

沿 $\vec k$ 方向传播的均匀平面波中：

```math
\vec E\perp\vec H,\quad
\vec E\perp\vec k,\quad
\vec H\perp\vec k
```

三者满足右手关系：

```text
\vec E 叉乘 \vec H 的方向就是波传播和能量流动方向。
```

介质中的波阻抗为：

```math
\eta=\sqrt{\frac{\mu}{\varepsilon}}
```

场强大小关系为：

```math
\frac{E}{H}=\eta
```

真空中：

```math
\eta_0\approx 377\ \Omega
```

## 坡印廷矢量

电磁波携带能量。

能流密度用坡印廷矢量表示：

```math
\vec S=\vec E\times\vec H
```

它的方向表示能量传播方向，大小表示单位面积单位时间通过的电磁能量。

## 从静态场到电磁波的变化

可以这样串起来：

| 情况 | 主要方程 | 物理图像 |
| --- | --- | --- |
| 静电场 | $\nabla\times\vec E=0$ | 电荷产生保守电场 |
| 恒定磁场 | $\nabla\times\vec H=\vec J$ | 电流周围有环绕磁场 |
| 时变电磁场 | Maxwell 方程组 | 电场和磁场互相激发 |
| 电磁波 | 波动方程 | 场的扰动向外传播 |

## 易错点

- 位移电流项不能理解成导线里真实电荷穿过截面的电流。
- 电磁波不是电场波和磁场波简单叠加，而是二者耦合传播。
- 平面波中 $\vec E$ 和 $\vec H$ 通常同相，但方向互相垂直。
- 电磁波的传播方向不是 $\vec E$ 或 $\vec H$ 的方向，而是 $\vec E\times\vec H$ 的方向。
