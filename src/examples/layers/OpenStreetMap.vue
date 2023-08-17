<script setup>
import { ref, defineAsyncComponent } from 'vue';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMap.vue')
);

const mapObj = ref();

const setLayer = () => {
  const layer = L.tileLayer(
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
