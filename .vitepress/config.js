import { defineConfig } from 'vitepress';
import { nav } from './config/nav';
import { sidebar } from './config/sidebar';
import { MarkdownTransform } from './plugins/markdownTransform.js';

export default defineConfig({
  base: '/',
  label: '简体中文',
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
    logo: '/logo.png',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outlineTitle: '快速前往',
    editLink: {
      pattern: 'https://github.com/leafletjsExample/leafletjsExample/blob/dev/src/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最近更新时间'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/leafletjsExample/leafletjsExample' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present vaebe'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },
  vite: {
    plugins: [MarkdownTransform()]
  }
});
