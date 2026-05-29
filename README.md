# Note

这是一个基于 [Docusaurus](https://docusaurus.io/) 的个人笔记仓库。源码推送到 `main` 分支后，会通过 GitHub Actions 自动构建并发布到 GitHub Pages。

仓库地址：

```text
https://github.com/B0weny-qwq/note
```

站点地址：

```text
https://b0weny-qwq.github.io/note/
```

## 本地维护

首次安装依赖：

```bash
npm install
```

启动本地预览：

```bash
npm run start
```

构建检查：

```bash
npm run build
```

查看构建产物：

```bash
npm run serve
```

## 上传笔记

常规流程：

```bash
git status
git add docs README.md docusaurus.config.js sidebars.js src static .github package.json package-lock.json
git commit -m "docs: update notes"
git push origin main
```

推送到 `main` 分支后，GitHub Actions 会运行 `.github/workflows/deploy.yml`，自动执行安装依赖、构建站点、发布到 GitHub Pages。

第一次使用 GitHub Pages 时，到仓库 `Settings -> Pages`，把 `Build and deployment` 的 `Source` 设置为 `GitHub Actions`。

## 笔记放在哪里

所有正文笔记放在 `docs/` 目录：

```text
docs/
  intro.md
  maintenance.md
  study/
    _category_.json
    example-note.md
```

推荐分类：

- `docs/study/`：学习笔记、课程记录、读书笔记。
- `docs/project/`：项目记录、方案设计、问题排查。
- `docs/resource/`：资料链接、工具清单、常用命令。

Docusaurus 会根据 `docs/` 下的目录和文件自动生成侧边栏。

## 笔记格式要求

推荐每篇笔记使用 `.md` 文件，并在开头写 front matter：

````md
---
sidebar_position: 1
title: 笔记标题
description: 一句话说明这篇笔记的内容。
---

# 笔记标题

## 背景

这里写为什么记录这件事。

## 正文

- 用列表记录要点。
- 代码块要标注语言。

```bash
npm run build
```

## 参考

- [资料名称](https://example.com)
````

常用字段：

- `title`：页面标题。
- `sidebar_position`：侧边栏排序，数字越小越靠前。
- `description`：页面摘要。
- `slug`：自定义 URL，一般不用，只有需要固定链接时再写。

## 分类格式

分类目录可以放 `_category_.json`：

```json
{
  "label": "学习笔记",
  "position": 10,
  "link": {
    "type": "generated-index",
    "description": "课程、技术文档、读书和实验记录。"
  }
}
```

## 图片和附件

推荐把图片放在笔记同级或子目录中：

```text
docs/study/linux-command.md
docs/study/img/linux-shell.png
```

引用方式：

```md
![Shell 示例](./img/linux-shell.png)
```

不要把大体积视频、压缩包、安装包直接提交到仓库。大文件建议放到网盘、对象存储或 GitHub Release，再在笔记中贴链接。

## 写作规范

- 每篇笔记只保留一个一级标题 `#`。
- 标题层级按顺序使用，不要从 `##` 直接跳到 `####`。
- 代码块写语言名，例如 `js`、`bash`、`python`。
- 文件名建议使用英文小写和连字符，例如 `linux-command.md`。
- 链接优先使用相对路径，例如 `[维护说明](../maintenance)`。
- 普通笔记优先使用 `.md`；只有需要 React/JSX 组件时再用 `.mdx`。

## 关键配置

- `docusaurus.config.js`：站点标题、GitHub Pages 路径、导航栏、页脚。
- `sidebars.js`：侧边栏配置，目前使用自动生成。
- `.github/workflows/deploy.yml`：GitHub Pages 自动部署。
- `docs/maintenance.md`：站内维护说明。
