<script setup>
import { defineAsyncComponent, shallowReactive, shallowRef } from 'vue';
import { TileLayer } from 'leaflet';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMap.vue')
);

// Leaflet 地图和图层保留原始实例，避免 Vue 深层代理干扰内部状态。
const mapObj = shallowRef();

const layerObj = shallowReactive({});
/** 使用 Leaflet 2 构造器创建高德图层配置。 */
const setLayerObj = () => {
  const layers = {
    '01': {
      layer: new TileLayer(
        'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        {
          subdomains: '1234',
          attribution: '&copy; 高德'
        }
      ),
      name: '高德电子地图'
    },
    '02': {
      layer: new TileLayer(
        'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        {
          subdomains: '1234',
          attribution: '&copy; 高德'
        }
      ),
      name: '高德影像'
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
