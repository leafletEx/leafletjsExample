<script setup>
import { ref, defineAsyncComponent } from 'vue';
import leafletImage from 'leaflet-image';
import { saveAs } from 'file-saver';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

/**
 * base64转图片
 * @param url
 * @param filename
 * @param mimeType
 * @return File
 */
const base64ToFile = (url, filename, mimeType) => {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
};

const mapObj = ref();

// 地图导出图片
const exportPicture = () => {
  leafletImage(mapObj.value, async (err, canvas) => {
    console.log(err);
    const fileBase64 = canvas.toDataURL();
    const file = await base64ToFile(fileBase64, '地图图片导出', 'png');

    saveAs(file, `地图图片导出.png`);
  });
};

const mapLoad = (map) => {
  mapObj.value = map;
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
  <p class="c-button" @click="exportPicture">导出图片</p>
</template>

<style scoped></style>
