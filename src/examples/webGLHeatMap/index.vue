<script setup>
import { defineAsyncComponent, shallowRef } from 'vue';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

import { useWebGLHeatMap } from './useWebGLHeatMap';

const mapObj = shallowRef();

const { initWebGLHeatmap } = useWebGLHeatMap(mapObj);

const mapLoad = (map) => {
  mapObj.value = map;
  mapObj.value.setZoom(14);
  initWebGLHeatmap();
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
