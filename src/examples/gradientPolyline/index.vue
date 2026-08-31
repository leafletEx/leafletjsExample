<script setup>
import { defineAsyncComponent } from 'vue';
import { FeatureGroup, Polyline } from 'leaflet';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

/** 返回用于折线分段的随机强度值。 */
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 从 public 目录读取轨迹数据，并创建 Leaflet 2 渐变折线。 */
const createGradientPolyline = async (map) => {
  const response = await fetch('/geojson/gulou.json');
  if (!response.ok) {
    throw new Error(`轨迹数据加载失败：${response.status}`);
  }
  const geoJson = await response.json();
  const list = geoJson.features[0].geometry.coordinates[0][0];

  // 处理数据
  const listData = list.map((item) => [
    item[1],
    item[0],
    generateRandomNumber(100, 160)
  ]);

  // 配置项
  const options = {
    min: 100,
    max: 160,
    palette: {
      0.0: '#008800',
      0.5: '#ffff00',
      1.0: '#ff0000'
    },
    weight: 5,
    outlineColor: '#000000',
    outlineWidth: 1,
    smoothFactor: 1
  };

  // Leaflet 2 不再使用旧插件工厂；按强度将轨迹拆分为渐变线段。
  const lines = listData.slice(1).map((point, index) => {
    const previous = listData[index];
    const ratio = (point[2] - options.min) / (options.max - options.min);
    const color = `hsl(${Math.round((1 - ratio) * 120)} 100% 45%)`;
    return new Polyline([previous.slice(0, 2), point.slice(0, 2)], {
      color,
      weight: options.weight,
      opacity: 0.9,
      smoothFactor: options.smoothFactor
    });
  });
  new FeatureGroup(lines).addTo(map);
};

const mapLoad = (map) => {
  createGradientPolyline(map);
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
