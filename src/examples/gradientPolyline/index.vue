<script setup>
import { defineAsyncComponent, onMounted } from 'vue';
import 'leaflet'
import leafletHotline from 'leaflet-hotline';
import geoJson from '../../public/geojson/gulou.json';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

leafletHotline(L);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 创建渐变折线
const createGradientPolyline = async (map) => {
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

  // 加载到地图
  L.hotline([listData], options).addTo(map);
};

const mapLoad = (map) => {
  createGradientPolyline(map);
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
