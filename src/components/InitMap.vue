<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
// todo 项目使用请放开 leaflet 引入
// import L from 'leaflet';

const emit = defineEmits(['mapLoad']);

const mapDomId = uuidv4();

const initMap = () => {
  const map = L.map(mapDomId, {
    center: [32.0237855, 118.8075675],
    zoom: 11,
    minZoom: 6,
    maxZoom: 20
  });

  // 地图初始化完成发送事件
  emit('mapLoad', map);

  return map;
};

const mapObj = ref();

// 在 onMounted 中初始化地图
onMounted(() => {
  mapObj.value = initMap();
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
  <div :id="mapDomId" class="map"></div>
</template>

<style scoped>
.map {
  height: 40vh;
}
</style>
