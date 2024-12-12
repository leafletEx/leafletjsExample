<script setup>
import { ref, defineAsyncComponent } from 'vue';
import 'leaflet.heat';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

// 数组 第三个参数表示强度，对象 max 表示强度
const points = [
  [32.020274, 118.803319, 0.3],
  [32.037394, 118.803834, 0.8],
  [32.037394, 118.814834, 1],
  {
    lat: 32.037394,
    lng: 118.894834,
    max: 100
  }
];

const config = {
  minOpacity: 0.8,
  maxZoom: 20,
  max: 1,
  radius: 40,
  blur: 15,
  gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
};

const mapObj = ref();

const mapLoad = (map) => {
  mapObj.value = map;
  L.heatLayer(points, config).addTo(map);
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
