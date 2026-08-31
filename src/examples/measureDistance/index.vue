<script setup>
import { defineAsyncComponent } from 'vue';
import { MeasureControl } from '../../integrations/leaflet/MeasureControl.js';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

const initMeasureDistance = (map) => {
  new MeasureControl({ position: 'topleft' }).addTo(map);
};
</script>

<template>
  <init-map @map-load="initMeasureDistance"></init-map>
</template>

<style>
.leaflet-measure-button {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  font-size: 18px;
  background: #fff;
}

.leaflet-measure-button.is-active {
  color: #fff;
  background: #2563eb;
}
</style>
