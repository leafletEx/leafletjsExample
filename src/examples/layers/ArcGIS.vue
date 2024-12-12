<script setup>
import { ref, defineAsyncComponent, reactive } from 'vue';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMap.vue')
);

const mapObj = ref();

// todo 这里的函数看起来多此一举，这样的做原因在于打包是node环境 L 依赖 window。
const layerObj = reactive({});

// World_Imagery ,World_Shaded_Relief, World_Street_Map 世界街道地图

const setLayerObj = () => {
  const layers = {
    '01': {
      layer: L.tileLayer(
        'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ),
      name: '世界影像地图'
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
