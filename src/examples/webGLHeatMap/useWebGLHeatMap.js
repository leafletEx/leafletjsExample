// todo 项目使用请放开注释
// import 'leaflet-webgl-heatmap';
// import 'leaflet-webgl-heatmap/src/webgl-heatmap/webgl-heatmap';
import { ref } from 'vue';

export const useWebGLHeatMap = (mapObj) => {
  const heatmapLayer = ref();
  const clearHeatmapLayer = () => {
    if (heatmapLayer.value) {
      mapObj.value.removeLayer(heatmapLayer.value);
      heatmapLayer.value = null;
    }
  };

  const initWebGLHeatmap = () => {
    clearHeatmapLayer();
    const heatmap = new L.webGLHeatmap({
      size: 1000,
      units: 'm',
      alphaRange: 1 // 热力图透明度
    });
    const points = [
      [32.020274, 118.803319, 3],
      [32.020274, 118.803319],
      [32.015762, 118.800572],
      [32.015762, 118.800572],
      [32.015762, 118.800572],
      [32.013869, 118.803834],
      [32.013869, 118.803834],
      [32.013869, 118.803834]
    ];

    // 设置数据
    heatmap.setData(points);

    // 将图层加载到地图
    mapObj.value.addLayer(heatmap);
  };

  return {
    initWebGLHeatmap
  };
};
