<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import L from 'leaflet';

const props = defineProps({
  center: {
    type: Array,
    default: [32.0237855, 118.8075675]
  }
})

const emit = defineEmits(['mapLoad']);

const mapRef = ref();

const initMap = () => {
  const map = L.map(mapRef.value, {
    center: props.center,
    zoom: 11,
    minZoom: 1,
    maxZoom: 18
  });

  const mapType = 'vec';
  L.tileLayer(
    'https://t{s}.tianditu.gov.cn/' +
      mapType +
      '_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' +
      mapType +
      '&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=b72aa81ac2b3cae941d1eb213499e15e',
    {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      attribution:
        '&copy; <a href="http://lbs.tianditu.gov.cn/home.html">天地图 GS(2022)3124号 - 甲测资字1100471</a>'
    }
  ).addTo(map);

  const mapLabelType = 'cva';
  L.tileLayer(
    'https://t{s}.tianditu.gov.cn/' +
      mapLabelType +
      '_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' +
      mapLabelType +
      '&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=b72aa81ac2b3cae941d1eb213499e15e',
    {
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }
  ).addTo(map);

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
  <div ref="mapRef" class="map"></div>
</template>

<style scoped>
.map {
  height: 40vh;
  z-index: 0;
}
</style>
