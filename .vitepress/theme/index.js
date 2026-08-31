import { h } from 'vue';
import Theme from 'vitepress/theme';
// Leaflet 2.x 原生支持 ESM，样式随应用构建，不再依赖固定版本的 CDN 标签。
import 'leaflet/dist/leaflet.css';
import './style.css';
import './customStyle.scss';
import Contributors from './components/Contributors.vue';
import Comment from './components/Comment.vue';
import CButton from './components/CButton.vue';

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(Comment)
    });
  },
  async enhanceApp({ app }) {
    // 注册全局组件
    app.component('Contributors', Contributors);
    app.component('CButton', CButton);
  }
};
