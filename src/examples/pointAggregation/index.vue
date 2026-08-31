<script setup>
import { defineAsyncComponent, shallowRef } from 'vue';
import { SuperclusterLayer } from '../../integrations/leaflet/SuperclusterLayer.js';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

const mapObj = shallowRef();

const markerLayerGroup = shallowRef();

// 清除图层组图层
const clearMarkerLayerGroup = () => {
  if (markerLayerGroup.value) {
    mapObj.value.removeLayer(markerLayerGroup.value);
    markerLayerGroup.value = null;
  }
};

// 创建多个 marker
const createMarkers = () => {
  // 加载前先清除
  clearMarkerLayerGroup();

  const points = [
    [32.0148855, 118.8276675],
    [32.0138855, 118.8477675],
    [32.0138855, 118.8678675],
    [32.0138855, 118.8979675],
    [32.0148855, 118.8989675],
    [32.0148855, 118.8969675],
    [32.0148855, 118.8979675],
    [32.0148855, 118.8989675]
  ];

  markerLayerGroup.value = new SuperclusterLayer(points).addTo(mapObj.value);
};

const mapLoad = (map) => {
  mapObj.value = map;
  createMarkers();
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style>
.supercluster-marker {
  display: grid;
  place-items: center;
  border: 3px solid rgb(255 255 255 / 80%);
  border-radius: 50%;
  color: #fff;
  background: #2563eb;
  box-shadow: 0 2px 8px rgb(0 0 0 / 25%);
}
</style>
