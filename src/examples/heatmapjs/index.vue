<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { testData } from './testData.js';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const cfg = {
  // 只有当scaleRadius为true时半径才应该很小（或者想要小半径）
  // 如果scaleRadius为假，它将是以像素为单位使用的恒定半径
  radius: 2,
  maxOpacity: 0.8,
  // 根据地图缩放比例缩放半径
  scaleRadius: true,
  // 如果设置为 false，热图将使用全局最大值进行着色
  // 如果激活：使用当前地图边界内的数据最大值
  // (useLocalExtremas 为 true 时总会出现红点）
  useLocalExtrema: true,
  // 数据中的哪个字段名称代表纬度 - 默认“lat”
  latField: 'lat',
  // 数据中的哪个字段名称代表经度 - 默认“lng”
  lngField: 'lng',
  // 数据中的哪个字段名称代表数据值 - 默认“值”
  valueField: 'count'
};

const mapObj = ref();

const initHeatmap = () => {
  mapObj.value.setView(new L.LatLng(25.6586, -80.3768), 4);

  const heatmapLayer = new HeatmapOverlay(cfg);

  mapObj.value.addLayer(heatmapLayer);
  heatmapLayer.setData(testData);
};

/**
 * todo 这样写只是因为是在 vitePress 中
 * todo 项目中可直接在 script 中引入，需要注意的是 leaflet 要先于插件引入
 */
const setHeatmapjsToHead = () => {
  const heatmapJs = document.createElement('script');
  heatmapJs.src = '/heatmapjs/heatmap.js';
  document.head.appendChild(heatmapJs);

  const leafletHeatmapJs = document.createElement('script');
  leafletHeatmapJs.src = '/heatmapjs/leaflet-heatmap.js';
  document.head.appendChild(leafletHeatmapJs);

  setTimeout(() => {
    initHeatmap();
  }, 1000);
};

const mapLoad = (map) => {
  mapObj.value = map;

  setHeatmapjsToHead();
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
