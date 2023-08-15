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

const mapObj = ref();

// 创建多边形
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

const polygonOverlay = ref();
const createPolygon = () => {
  polygonOverlay.value = L.polygon(polygonData, { color: 'red' }).addTo(
    mapObj.value
  );
};

// 创建与圆形逼近的正多边形的顶点坐标数组
const getCirclePolygonCoords = (point, radius) => {
  let coords = [];

  // 正多边形的边数，数值越大逼近越精确（使用多少个点围成一个圆）
  const numVertices = 64;

  for (let i = 0; i < numVertices; i++) {
    const angle = (i / numVertices) * Math.PI * 2;
    const x = point.lng + (radius / 100000) * Math.cos(angle);
    const y = point.lat + (radius / 100000) * Math.sin(angle);
    coords.push([x, y]);
  }

  // 关闭多边形，多边形头尾节点需一样。
  coords.push(coords[0]);

  return coords;
};

// 获取圆形多边形坐标
const circlePolygonCoords = ref([]);
const createCircle = () => {
  const point = {
    lat: 32.04959129198556,
    lng: 118.68255615234376
  };

  const radius = 3740;

  L.circle([point.lat, point.lng], {
    radius
  }).addTo(mapObj.value);

  circlePolygonCoords.value = getCirclePolygonCoords(point, radius);
};

// 创建信息 marker
const infoMarker = ref();
const createMarker = (point, text) => {
  if (infoMarker.value) {
    mapObj.value.removeLayer(infoMarker.value);
    infoMarker.value = null;
  }

  infoMarker.value = L.marker([point.lat, point.lng], {}).addTo(mapObj.value);

  infoMarker.value.bindPopup(`<p>${text}<p>`).openPopup();
};

// 地图点击事件
const handleClick = (e) => {
  const point = e.latlng;

  const isPointInsidePolygon = booleanPointInPolygon(
    turfPoint([point.lng, point.lat]),
    polygonOverlay.value.toGeoJSON()
  );

  if (isPointInsidePolygon) {
    createMarker(point, '在多边形内');
    return;
  }

  const isPointInsideCircle = booleanPointInPolygon(
    turfPoint([point.lng, point.lat]),
    turfPolygon([circlePolygonCoords.value])
  );

  if (isPointInsideCircle) {
    createMarker(point, '在圆内');
    return;
  }

  createMarker(point, '不再任何图形内');
};

const mapLoad = (map) => {
  mapObj.value = map;
  createPolygon();
  createCircle();
  map.on('click', handleClick);
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
