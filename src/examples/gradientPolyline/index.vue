<script setup>
import { defineAsyncComponent } from 'vue';
import leafletHotline from 'leaflet-hotline';

// 注册插件
leafletHotline(L);

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 创建渐变折线
const createGradientPolyline = async (map) => {
  // 获取南京市边界
  const list = await fetch(
    'https://geo.datav.aliyun.com/areas_v3/bound/320106.json'
  )
    .then((res) => res.json())
    .then((res) => res.features[0].geometry.coordinates[0][0]);

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
