// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
import './style.css';
import './customStyle.scss';
import Contributors from './components/Contributors.vue';

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  async enhanceApp({ app }) {
    app.component('Contributors', Contributors);

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
    }
  }
};
