<script setup>
import { ref, defineAsyncComponent, reactive } from 'vue';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMap.vue')
);

const mapObj = ref();

// todo 这里的函数看起来多此一举，这样的做原因在于打包是node环境 L 依赖 window。
const layerObj = reactive({});
const setLayerObj = () => {
  const layers = {
    '01': {
      layer: L.tileLayer(
        'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        {
          subdomains: '1234',
          attribution: '&copy; 高德'
        }
      ),
      name: '高德电子地图'
    },
    '02': {
      layer: L.tileLayer(
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

const curLayer = ref();
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
  <ul>
    <li
      class="c-button"
      v-for="item in Object.keys(layerObj)"
      :key="item"
      @click="setLayer(item)"
    >
      {{ layerObj[item].name }}
    </li>
  </ul>
</template>

<style scoped></style>
