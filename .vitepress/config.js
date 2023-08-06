import { defineConfig } from 'vitepress';
import { i18n } from './config/i18n';
import { nav } from './config/nav';
import { sidebar } from './config/sidebar';

export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'leafletjs-example',
  description: 'leafletjs 与 vue3 结合使用的一些示例',
  srcDir: 'src',
  ignoreDeadLinks: true,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
    ['meta', { name: 'author', content: 'vaebe' }],
    ['meta', { property: 'og:title', content: 'leafletjs-example' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'leafletjs 与 vue3 结合使用的一些示例'
      }
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
      }
    ],
    // 谷歌分析
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-C38FF8YHL3'
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-C38FF8YHL3');`
    ],
    // leaflet
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css'
      }
    ]
  ],
  themeConfig: {
    nav,
    sidebar,
    i18n,
    logo: '/logo.png',
    outlineTitle: '快速前往',
    editLink: {
      pattern: 'https://github.com/vaebe/leafletjsExample/blob/main/src/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最近更新时间'
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
