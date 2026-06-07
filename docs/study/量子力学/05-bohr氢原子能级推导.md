---
sidebar_position: 5
title: "Bohr 氢原子能级推导"
description: "从库仑力提供向心力和角动量量子化推导 Bohr 半径与氢原子能级。"
---

# Bohr 氢原子能级推导

## 基本假设

Bohr 模型保留了经典圆轨道图像，但加入量子化条件：

1. 电子在某些定态轨道上运动时不辐射能量。
2. 电子跃迁时吸收或发射光子：

```math
h\nu=E_m-E_n
```

3. 角动量满足量子化：

```math
m_ev_nr_n=n\hbar
```

## 圆周运动方程

电子绕核作圆周运动，库仑力提供向心力：

```math
\frac{m_ev_n^2}{r_n}
=
\frac{1}{4\pi\varepsilon_0}
\frac{e^2}{r_n^2}
```

由角动量量子化：

```math
v_n=\frac{n\hbar}{m_er_n}
```

代入向心力方程：

```math
\frac{m_e}{r_n}
\left(\frac{n\hbar}{m_er_n}\right)^2
=
\frac{1}{4\pi\varepsilon_0}
\frac{e^2}{r_n^2}
```

化简：

```math
\frac{n^2\hbar^2}{m_er_n^3}
=
\frac{e^2}{4\pi\varepsilon_0r_n^2}
```

所以：

```math
r_n
=
\frac{4\pi\varepsilon_0\hbar^2}{m_ee^2}n^2
```

定义 Bohr 半径：

```math
a_0=\frac{4\pi\varepsilon_0\hbar^2}{m_ee^2}
```

则：

```math
r_n=a_0n^2
```

## 能量推导

电子动能：

```math
K=\frac12m_ev_n^2
```

由向心力方程：

```math
m_ev_n^2=\frac{e^2}{4\pi\varepsilon_0r_n}
```

所以：

```math
K=\frac{1}{2}\frac{e^2}{4\pi\varepsilon_0r_n}
```

库仑势能：

```math
U=-\frac{e^2}{4\pi\varepsilon_0r_n}
```

总能量：

```math
E_n=K+U
=
-\frac{1}{2}\frac{e^2}{4\pi\varepsilon_0r_n}
```

代入 $r_n=a_0n^2$：

```math
E_n
=
-
\frac{m_ee^4}{2(4\pi\varepsilon_0)^2\hbar^2}
\frac{1}{n^2}
```

氢原子通常写成：

```math
E_n=-\frac{13.6\text{ eV}}{n^2}
```

## 难点注释

- 库仑势能是负的，电子被束缚时总能量也为负。
- 由圆周运动关系可得 $K=-U/2$，所以 $E=K+U=U/2$。
- Bohr 模型能解释氢原子能级，但电子“轨道”图像不是现代量子力学的最终图像。

## 易错点

- 角动量量子化是 $mvr=n\hbar$，不是 $n h$。
- $n=1$ 是基态，不是 $n=0$。
- 能级随 $n$ 增大而接近 0，但仍为负。
