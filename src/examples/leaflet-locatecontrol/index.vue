<script setup>
import { defineAsyncComponent, shallowRef } from 'vue';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import { LocateControl } from 'leaflet.locatecontrol';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

const mapObj = shallowRef();

const mapLoad = (map) => {
  mapObj.value = map;
  new LocateControl().addTo(map);
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
