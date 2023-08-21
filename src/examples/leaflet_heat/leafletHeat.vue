<script setup>
import { ref, defineAsyncComponent } from 'vue';
// todo 项目使用请放开注释
// import 'leaflet.heat';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const points = [
  [32.020274, 118.803319, 100],
  [32.037394, 118.803834, 511],
  [32.037394, 118.814834, 511],
  {
    lat: 32.037394,
    lng: 118.894834,
    max: 999
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
