import { shallowRef } from 'vue';
import { WebGLHeatLayer } from '../../integrations/leaflet/WebGLHeatLayer.js';

export const useWebGLHeatMap = (mapObj) => {
  const heatmapLayer = shallowRef();
  const clearHeatmapLayer = () => {
    if (heatmapLayer.value) {
      mapObj.value.removeLayer(heatmapLayer.value);
      heatmapLayer.value = null;
    }
  };

  const initWebGLHeatmap = () => {
    clearHeatmapLayer();
    const points = [
      [32.020274, 118.803319, 2],
      [32.020274, 118.803319, 1],
      [32.015762, 118.800572],
      [32.015762, 118.800572],
      [32.015762, 118.800572],
      [32.013869, 118.803834],
      [32.013869, 118.803834],
      [32.013869, 118.803834]
    ];

    // 原生 WebGL 适配层直接消费经纬度和强度数据。
    heatmapLayer.value = new WebGLHeatLayer(points, { size: 100 });
    mapObj.value.addLayer(heatmapLayer.value);
  };

  return {
    initWebGLHeatmap
  };
};
