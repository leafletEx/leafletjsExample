<script setup>
import { defineAsyncComponent, shallowReactive, shallowRef } from 'vue';
import { TileLayer } from 'leaflet';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMap.vue')
);

// Leaflet 地图和图层保留原始实例，避免 Vue 深层代理干扰内部状态。
const mapObj = shallowRef();

const layerObj = shallowReactive({});

/** 使用 Leaflet 2 构造器创建 ArcGIS 图层配置。 */
const setLayerObj = () => {
  const layers = {
    '01': {
      layer: new TileLayer(
        'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ),
      name: '世界影像地图'
    }
  };

  Object.assign(layerObj, layers);
};

const curLayer = shallowRef();
const setLayer = (type) => {
  if (curLayer.value) {
    mapObj.value.removeLayer(curLayer.value);
    curLayer.value = null;
  }

  curLayer.value = layerObj[type].layer;
  curLayer.value.addTo(mapObj.value);
};

const mapLoad = (map) => {
  mapObj.value = map;
  setLayerObj();
  setLayer('01');
};
</script>

<template>
  <p>底图服务好像无法访问了，不知后续是否会恢复！</p>

  <init-map @mapLoad="mapLoad"></init-map>

  <div class="mt-10">
    <CButton
      v-for="item in Object.keys(layerObj)"
      :key="item"
      @click="setLayer(item)"
    >
      {{ layerObj[item].name }}
    </CButton>
  </div>
</template>

<style scoped></style>
