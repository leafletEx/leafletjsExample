// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import './style.css';
import './customStyle.scss';
import Contributors from './components/Contributors.vue';
import comment from './components/comment.vue';
import CButton from './components/CButton.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(comment)
    });
  },
  async enhanceApp({ app }) {
    // 注册全局组件
    app.component('Contributors', Contributors);
    app.component('CButton', CButton);

    if (typeof window !== 'undefined') {
      await import('leaflet');

      // webgl 热力图
      await import('leaflet-webgl-heatmap');
      await import('leaflet-webgl-heatmap/src/webgl-heatmap/webgl-heatmap');

      // leaflet.heat 热力图
      await import('leaflet.heat');

      // 点聚合
      import('leaflet.markercluster');

      // 图形的绘制与编辑
      import('@geoman-io/leaflet-geoman-free');

      // 测距
      import('leaflet-ruler');

      // 全屏
      import('leaflet.fullscreen/Control.FullScreen.js');

      // 轨迹回放插件
      import('leaflet-trackplayer');
    }
  }
};
