<script setup>
import { ref, defineAsyncComponent } from 'vue';
import {
  booleanPointInPolygon,
  point as turfPoint,
  polygon as turfPolygon
} from '@turf/turf';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

// 矩形
const rectData = [
  {
    lat: 31.979921773775636,
    lng: 118.75190734863283
  },
  {
    lat: 32.042300782300785,
    lng: 118.75190734863283
  },
  {
    lat: 32.042300782300785,
    lng: 118.85696411132814
  },
  {
    lat: 31.979921773775636,
    lng: 118.85696411132814
  }
];

// 多边形
const polygonData = [
  {
    lat: 32.10347253417688,
    lng: 118.65921020507814
  },
  {
    lat: 32.0982308450108,
    lng: 118.71826171875001
  },
  {
    lat: 32.04404911449747,
    lng: 118.72169494628906
  },
  {
    lat: 32.02539851636276,
    lng: 118.67843627929688
  },
  {
    lat: 32.036472767156546,
    lng: 118.64135742187501
  },
  {
    lat: 32.06852225858854,
    lng: 118.64341735839845
  },
  {
    lat: 32.06968748310397,
    lng: 118.68530273437501
  },
  {
    lat: 32.08599906719349,
    lng: 118.66744995117189
  }
];

const mapLoad = (map) => {
  // 配置参考 https://leafletjs.cn/reference.html#polygon
  L.polygon(rectData, { color: 'red', fillColor: 'green' }).addTo(map);
  L.polygon(polygonData, { color: 'red' }).addTo(map);
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
