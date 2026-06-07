---
sidebar_position: 36
title: "Ehrenfest 公式与守恒量"
description: "推导力学量期望值随时间变化的公式，并得到量子守恒量判据。"
---

# Ehrenfest 公式与守恒量

## 期望值

力学量 $F$ 的期望值：

```math
\langle F\rangle
=
\langle\psi|\hat F|\psi\rangle
```

如果 $\hat F$ 也可能显含时间，则求导：

```math
\frac{d}{dt}\langle F\rangle
=
\frac{d}{dt}\langle\psi|\hat F|\psi\rangle
```

## 使用 Schrödinger 方程

态矢满足：

```math
i\hbar\frac{\partial}{\partial t}|\psi\rangle
=
\hat H|\psi\rangle
```

所以：

```math
\frac{\partial}{\partial t}|\psi\rangle
=
-\frac{i}{\hbar}\hat H|\psi\rangle
```

bra 的时间导数为：

```math
\frac{\partial}{\partial t}\langle\psi|
=
\frac{i}{\hbar}\langle\psi|\hat H
```

## 推导

```math
\frac{d}{dt}\langle F\rangle
=
\left\langle\frac{\partial\psi}{\partial t}\middle|\hat F\middle|\psi\right\rangle
+
\left\langle\psi\middle|\frac{\partial \hat F}{\partial t}\middle|\psi\right\rangle
+
\left\langle\psi\middle|\hat F\middle|\frac{\partial\psi}{\partial t}\right\rangle
```

代入态的时间导数：

```math
\frac{d}{dt}\langle F\rangle
=
\frac{i}{\hbar}\langle\psi|\hat H\hat F|\psi\rangle
+
\left\langle\frac{\partial\hat F}{\partial t}\right\rangle
-
\frac{i}{\hbar}\langle\psi|\hat F\hat H|\psi\rangle
```

整理：

```math
\frac{d}{dt}\langle F\rangle
=
\left\langle\frac{\partial\hat F}{\partial t}\right\rangle
+
\frac{i}{\hbar}\langle[\hat H,\hat F]\rangle
```

## 守恒量判据

如果：

```math
\frac{\partial\hat F}{\partial t}=0
```

且：

```math
[\hat H,\hat F]=0
```

则：

```math
\frac{d}{dt}\langle F\rangle=0
```

称 $F$ 为守恒量。

## 常见例子

能量守恒：

```math
\frac{\partial\hat H}{\partial t}=0
\Rightarrow
\frac{d}{dt}\langle H\rangle=0
```

中心势场中角动量守恒：

```math
U=U(r)
\Rightarrow
[\hat H,\hat L^2]=[\hat H,\hat L_z]=0
```

## 难点注释

- 守恒判据有两个条件：算符不显含时间，并且和 Hamilton 对易。
- 对易为 0 表示该力学量与时间演化相容。
- 对称性通常对应守恒量，例如旋转对称对应角动量守恒。

## 易错点

- 不要只检查 $[\hat H,\hat F]=0$，还要看 $\partial\hat F/\partial t$。
- 守恒的是期望值；若态本身不是本征态，单次测量仍可能有分布。
- 公式前因子是 $i/\hbar$。
