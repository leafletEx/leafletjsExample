<script setup>
import { ref, defineAsyncComponent } from 'vue';
import 'leaflet-trackplayer';
import { list } from './trajectoryData.js';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const mapObj = ref();

// 定义沿着轨迹移动的marker
const markerIcon = L.icon({
  iconSize: [27, 54],
  iconUrl: new URL('/img/car.png', import.meta.url).href,
  iconAnchor: [13.5, 27]
});

const track = ref(null);

function start() {
  track.value.start();
}

function stop() {
  track.value.pause();
}

function mapLoad(map) {
  mapObj.value = map;
  // 地图设置到合适的缩放级别
  map.setZoom(16, { animate: false });

  // 创建播放器对象并添加至地图
  track.value = new L.TrackPlayer(list, { markerIcon }).addTo(map);

  start();
}
</script>

<template>
  <init-map
    @map-load="mapLoad"
    :center="[34.27519341726532, 108.911884710754]"
  ></init-map>

  <ul>
    <li class="c-button" @click="start">开始</li>
    <li class="c-button" @click="stop">暂停</li>
  </ul>
</template>

<style scoped></style>
