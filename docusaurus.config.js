// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Note',
  tagline: '个人笔记与知识整理',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  url: 'https://b0weny-qwq.github.io',
  baseUrl: '/note/',

  organizationName: 'B0weny-qwq',
  projectName: 'note',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/B0weny-qwq/note/tree/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-n8MVd4RsNIU0lKQqK4s6vJ0sP3pXBJgp7wa9u0JPFpKnz03WxZmf0RduCMsZ/HXX',
      crossorigin: 'anonymous',
    },
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/category/8086-汇编',
            to: '/docs/study/8086汇编',
          },
          {
            from: '/docs/category/学习笔记',
            to: '/docs/study',
          },
          {
            from: '/docs/study/asm-8086',
            to: '/docs/study/8086汇编',
          },
          {
            from: '/docs/study/info-theory-coding',
            to: '/docs/study/信息论与编码',
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Note',
        logo: {
          alt: 'Note Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'notesSidebar',
            position: 'left',
            label: '笔记',
          },
          {
            href: 'https://github.com/B0weny-qwq/note',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: '开始阅读', to: '/docs/intro'},
              {label: '维护说明', to: '/docs/maintenance'},
            ],
          },
          {
            title: 'Repository',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/B0weny-qwq/note',
              },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} B0weny-qwq. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
