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

const polygonData = [
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

const polygon = ref();
const createPolygon = (map) => {
  polygon.value = L.polygon(polygonData, { color: 'red' }).addTo(map);
};

const circle = ref();
const circlePolygonCoords = ref([]);
const createCircle = (map) => {
  circlePolygonCoords.value = [];

  const point = {
    lat: 32.04959129198556,
    lng: 118.68255615234376
  };
  const radius = 3740;

  circle.value = L.circle([point.lat, point.lng], {
    radius
  }).addTo(map);

  // 创建圆形逼近的正多边形的顶点坐标数组
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const x = point.lng + (radius / 100000) * Math.cos(angle);
    const y = point.lat + (radius / 100000) * Math.sin(angle);
    circlePolygonCoords.value.push([x, y]);
  }

  // todo 关闭多边形，多边形头尾节点需一样。
  circlePolygonCoords.value.push(circlePolygonCoords.value[0]);
};

const info = ref('');
const handleClick = (e) => {
  console.log(e);
  const point = e.latlng;

  const isPointInsidePolygon = booleanPointInPolygon(
    turfPoint([point.lng, point.lat]),
    polygon.value.toGeoJSON()
  );

  if (isPointInsidePolygon) {
    info.value = '在多边形内';
    return;
  }

  const isPointInsideCircle = booleanPointInPolygon(
    turfPoint([point.lng, point.lat]),
    turfPolygon([circlePolygonCoords.value])
  );

  if (isPointInsideCircle) {
    info.value = '在圆内';
    return;
  }

  info.value = '不再任何图形范围内';
};

const mapLoad = (map) => {
  createPolygon(map);
  createCircle(map);
  map.on('click', handleClick);
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
  <p>{{ info }}</p>
</template>

<style scoped></style>
