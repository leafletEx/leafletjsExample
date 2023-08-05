<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useGaoDeMap } from '../../composables/useGaoDeMap';

const mapObj = ref();

const { initMap, setGaoDeLayer } = useGaoDeMap();

// 在 onMounted 中初始化地图
onMounted(() => {
  mapObj.value = initMap();

  // 设置图层
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
  <div id="map"></div>

  <div class="buts">
    <button class="c-button" @click="setGaoDeLayer('02')">电子地图</button>
    <button class="c-button" @click="setGaoDeLayer('01')">影像地图</button>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: 40vh;
}

.buts {
  margin-top: 10px;
}
</style>
