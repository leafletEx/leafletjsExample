<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { geoJsonLine, geoJsonPoint, geoJsonPolygon } from './useGeoJsonData.js';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const mapObj = ref();

// 添加 geoJson 数据到地图
const addGeoJsonDataToMap = (data) => {
  L.geoJSON(data, {
    style: function (feature) {
      return { color: feature.properties.color ?? 'green' };
    }
  })
    .bindPopup(function (layer) {
      return layer.feature.properties.name;
    })
    .addTo(mapObj.value);
};

// 获取区域边界加载到地图
const getAreaBoundaryGeoJsonToMap = async () => {
  const geoJson = await fetch(
    'https://geo.datav.aliyun.com/areas_v3/bound/320106.json'
  ).then((res) => res.json());

  addGeoJsonDataToMap(geoJson);
};

const mapLoad = (map) => {
  mapObj.value = map;

  addGeoJsonDataToMap(geoJsonPoint);
  addGeoJsonDataToMap(geoJsonLine);
  addGeoJsonDataToMap(geoJsonPolygon);

  getAreaBoundaryGeoJsonToMap();
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
