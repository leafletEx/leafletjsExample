<script setup>
import { onMounted, onUnmounted, shallowRef } from 'vue';
import { useGaoDeMap } from '../../composables/useGaoDeMap';

// Leaflet 实例由库自身管理状态，避免 Vue 对其内部对象做深层代理。
const mapObj = shallowRef();

const { initMap, setGaoDeLayer } = useGaoDeMap();

// 在 onMounted 中初始化地图
onMounted(() => {
  mapObj.value = initMap();

  // 设置底图
  setGaoDeLayer();
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
  <div id="map" style="height: 40vh"></div>

  <div class="mt-10">
    <CButton @click="setGaoDeLayer('02')">电子地图</CButton>
    <CButton @click="setGaoDeLayer('01')">影像地图</CButton>
  </div>
</template>

<style lang="scss" scoped></style>
