import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig(({ mode }) => {
  const basePath =
    mode === 'development' ? '/' : '/leafletjs-example.vercel.app/';

  return {
    base: basePath,
    lang: 'en-ZH',
    title: 'leafletjs-example',
    description: 'leafletjs 与 vue3 结合使用的一些示例',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '首页', link: '/' },
        { text: '示例', activeMatch: `^/examples/`, link: '/examples/' },
        { text: '贡献者', link: '/team' }
      ],

      sidebar: {
        '/examples/': [
          {
            text: '快速开始',
            items: [
              {
                text: '简介',
                link: '/examples/'
              }
            ]
          },
          {
            text: '基础示例',
            items: [
              {
                text: '初始化地图',
                link: '/examples/initMap/'
              }
            ]
          }
        ]
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vaebe/leafletjsExample' }
      ],
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2023-present vaebe'
      }
    }
  };
});
