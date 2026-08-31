<script setup>
import { defineAsyncComponent, onUnmounted, shallowRef } from 'vue';
import { Icon, Marker, Polyline } from 'leaflet';
import { list } from './trajectoryData.js';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

const mapObj = shallowRef();
const trackMarker = shallowRef();
let playbackTimer;
let currentIndex = 0;

/** 从当前位置继续按固定间隔播放轨迹。 */
function start() {
  if (!trackMarker.value || playbackTimer) return;
  playbackTimer = window.setInterval(() => {
    currentIndex = (currentIndex + 1) % list.length;
    trackMarker.value.setLatLng(list[currentIndex]);
  }, 120);
}

/** 暂停轨迹播放并释放计时器。 */
function stop() {
  if (!playbackTimer) return;
  window.clearInterval(playbackTimer);
  playbackTimer = undefined;
}

/** 创建轨迹线和沿轨迹移动的 Marker。 */
function mapLoad(map) {
  mapObj.value = map;
  map.setZoom(16, { animate: false });

  const markerIcon = new Icon({
    iconSize: [27, 54],
    iconUrl: new URL('/img/car.png', import.meta.url).href,
    iconAnchor: [13.5, 27]
  });

  new Polyline(list, { color: '#2563eb', weight: 4 }).addTo(map);
  trackMarker.value = new Marker(list[0], { icon: markerIcon }).addTo(map);
  start();
}

onUnmounted(stop);
</script>

<template>
  <init-map
    :center="[34.27519341726532, 108.911884710754]"
    @map-load="mapLoad"
  ></init-map>

  <div class="mt-10">
    <CButton @click="start">开始</CButton>
    <CButton @click="stop">暂停</CButton>
  </div>
</template>

<style scoped></style>
