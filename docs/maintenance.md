---
sidebar_position: 2
title: 维护说明
description: 如何新增、格式化、预览和上传笔记。
---

# 维护说明

这个仓库使用 Docusaurus 构建静态笔记站。日常维护主要是编辑 `docs/` 目录里的 Markdown 或 MDX 文件。

## 新增笔记

1. 在 `docs/` 下选择或新建分类目录，例如 `docs/study/`。
2. 新建 `.md` 或 `.mdx` 文件，例如 `docs/study/linux-command.md`。
3. 在文件开头写 front matter。
4. 使用 Markdown 写正文。
5. 运行 `npm run start` 本地预览。
6. 运行 `npm run build` 检查链接和构建。
7. 用 Git 提交并推送。

## 文件格式

推荐每篇笔记使用以下格式：

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

常用 front matter 字段：

- `title`：页面标题，显示在浏览器标题、侧边栏和页面元信息里。
- `sidebar_position`：侧边栏排序，数字越小越靠前。
- `description`：页面摘要，利于搜索和分享。
- `slug`：自定义 URL，只有确实需要固定链接时再用。

## 分类目录

每个分类目录可以放一个 `_category_.json` 控制侧边栏名称和排序：

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

如果不写 `_category_.json`，Docusaurus 也会按目录名自动生成分类。

## 图片和附件

推荐把图片放在笔记同级或子目录中：

```text
docs/study/linux-command.md
docs/study/img/linux-shell.png
```

在 Markdown 中引用：

```md
![Shell 示例](./img/linux-shell.png)
```

不要把大体积视频、压缩包、安装包直接提交到仓库。大文件建议放到网盘、对象存储或 Release，再在笔记中贴链接。

## Markdown 规范

- 每篇笔记只保留一个一级标题 `#`。
- 标题层级按顺序使用，不要从 `##` 直接跳到 `####`。
- 代码块写语言名，例如 `js`、`bash`、`python`。
- 链接优先使用相对路径，例如 `[维护说明](../maintenance)`。
- 文件名建议使用英文小写和连字符，例如 `linux-command.md`。
- 中文和英文、数字之间建议留空格，阅读更清楚。

## MDX 说明

`.md` 适合普通笔记，`.mdx` 适合需要写 React/JSX 组件的页面。大多数情况下优先使用 `.md`。

MDX 中的 `{`、`}`、`<`、`>` 可能被当成 JSX 解析。普通笔记如果不需要组件，使用 `.md` 可以减少语法问题。

## 本地命令

安装依赖：

```bash
npm install
```

启动预览：

```bash
npm run start
```

生产构建：

```bash
npm run build
```

本地查看构建产物：

```bash
npm run serve
```

## 提交和上传

常规流程：

```bash
git status
git add docs README.md docusaurus.config.js sidebars.js src static .github package.json package-lock.json
git commit -m "docs: update notes"
git push origin main
```

推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建站点并发布到 GitHub Pages。

第一次使用 GitHub Pages 时，需要到仓库 `Settings -> Pages`，把 `Build and deployment` 的 `Source` 设置为 `GitHub Actions`。

## 发布地址

仓库地址：

```text
https://github.com/B0weny-qwq/note
```

站点地址：

```text
https://b0weny-qwq.github.io/note/
```
