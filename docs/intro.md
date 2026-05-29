---
sidebar_position: 1
title: 笔记首页
description: 这个站点的笔记入口与维护方式。
---

# 笔记首页

这里用于沉淀个人笔记、学习记录、项目复盘和资料索引。

## 目录建议

- `docs/study/`：学习笔记、课程记录、读书笔记。
- `docs/project/`：项目记录、方案设计、问题排查。
- `docs/resource/`：资料链接、工具清单、常用命令。

可以按实际需要新增目录。Docusaurus 会根据 `docs/` 文件结构自动生成左侧目录。

## 快速开始

本地预览：

```bash
npm install
npm run start
```

构建检查：

```bash
npm run build
```

新增或修改笔记后，提交并推送到 `main` 分支即可触发 GitHub Pages 自动部署。
