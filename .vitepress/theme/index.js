// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import './style.css';
import './customStyle.scss';

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  async enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      await import('leaflet');
    }
  }
};
