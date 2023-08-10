<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { useMap } from '../../composables/useMap';
import { useWebGLHeatMap } from './useWebGLHeatMap';

const mapObj = ref();

const { initMap } = useMap();
const { initWebGLHeatmap } = useWebGLHeatMap(mapObj);

// 在 onMounted 中初始化地图
onMounted(() => {
  mapObj.value = initMap();
  mapObj.value.setZoom(14);
  initWebGLHeatmap();
});

const removeMap = () => {
  if (mapObj.value) {
    mapObj.value.remove();
  }
};

// 在组件卸载时删除地图
onUnmounted(() => {
  removeMap();
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 40vh;
}
</style>
