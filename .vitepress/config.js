import { defineConfig } from 'vitepress';
import { i18n } from './config/i18n';
import { nav } from './config/nav';
import { sidebar } from './config/sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig(({ mode }) => {
  const basePath =
    mode === 'development' ? '/' : '/';

  return {
    base: basePath,
    lang: 'zh-CN',
    title: 'leafletjs-example',
    description: 'leafletjs 与 vue3 结合使用的一些示例',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav,
      sidebar,
      i18n,
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
