import { defineConfig } from 'vitepress';
import { nav } from './config/nav';
import { sidebar } from './config/sidebar';
import { head } from './config/head.js';
import { algoliaSearch } from './config/algoliaSearch.js';
import { MarkdownTransform } from './plugins/markdownTransform.js';

export default defineConfig({
  base: '/',
  label: '简体中文',
  lang: 'zh-CN',
  title: 'leafletjs-example',
  description: 'leafletjs 与 vue3 结合使用的一些示例',
  srcDir: 'src',
  ignoreDeadLinks: true,
  head,
  sitemap: {
    hostname: 'https://leafletjs-example.netlify.app/'
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    }
  },
  themeConfig: {
    nav,
    sidebar,
    logo: '/logo.png',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: "页面导航",
    },
    editLink: {
      pattern:
        'https://github.com/leafletjsExample/leafletjsExample/blob/dev/src/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最近更新时间'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/leafletjsExample/leafletjsExample'
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present vaebe'
    },
    search: algoliaSearch
  },
  vite: {
    plugins: [MarkdownTransform()]
  }
});
