<script setup>
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { LeafletMap } from 'leaflet';

const emit = defineEmits(['mapLoad']);

const mapRef = ref();

/**
 * 创建基础 Leaflet 地图实例，并在初始化完成后通知父组件。
 * @returns {LeafletMap} 已初始化的 Leaflet 2.x 地图实例。
 */
const initMap = () => {
  const map = new LeafletMap(mapRef.value, {
    center: [32.0237855, 118.8075675],
    zoom: 11,
    minZoom: 6,
    maxZoom: 20
  });

  // 地图初始化完成发送事件
  emit('mapLoad', map);

  return map;
};

// Leaflet 实例由库自身管理状态，避免 Vue 对其内部对象做深层代理。
const mapObj = shallowRef();

// 在 onMounted 中初始化地图
onMounted(() => {
  mapObj.value = initMap();
});

/** 删除当前地图实例，释放 Leaflet 注册的 DOM 事件。 */
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
  <div ref="mapRef" class="map"></div>
</template>

<style scoped>
.map {
  height: 40vh;
  z-index: 0;
}
</style>
