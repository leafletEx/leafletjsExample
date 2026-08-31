<script setup>
import { defineAsyncComponent, shallowRef } from 'vue';
import { TileLayer } from 'leaflet';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMap.vue')
);

const mapObj = shallowRef();

/** 创建并挂载 OpenStreetMap 图层。 */
const setLayer = () => {
  const layer = new TileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  );

  layer.addTo(mapObj.value);
};

const mapLoad = (map) => {
  mapObj.value = map;
  setLayer();
};
</script>

<template>
  <init-map @mapLoad="mapLoad"></init-map>
</template>

<style scoped></style>
