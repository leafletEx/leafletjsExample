import { defineConfigWithTheme } from 'vitepress';
import { i18n } from './config/i18n';
import { nav } from './config/nav';
import { sidebar } from './config/sidebar';

export default defineConfigWithTheme({
  base: '/',
  lang: 'zh-CN',
  title: 'leafletjs-example',
  description: 'leafletjs 与 vue3 结合使用的一些示例',
  srcDir: 'src',
  themeConfig: {
    nav,
    sidebar,
    i18n,
    editLink: {
      repo: 'https://github.com/vaebe/leafletjsExample/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vaebe/leafletjsExample' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present vaebe'
    }
  }
});
