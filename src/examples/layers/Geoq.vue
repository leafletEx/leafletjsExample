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
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity_Mobile/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; 北京捷泰天域信息技术有限公司'
        }
      ),
      name: '高清中国基础地图'
    },
    '02': {
      layer: L.tileLayer(
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunityENG/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; 北京捷泰天域信息技术有限公司'
        }
      ),
      name: '英文地图'
    },
    '03': {
      layer: L.tileLayer(
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; 北京捷泰天域信息技术有限公司'
        }
      ),
      name: '彩色中文地图'
    },
    '04': {
      layer: L.tileLayer(
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; 北京捷泰天域信息技术有限公司'
        }
      ),
      name: '灰色地图'
    },
    '05': {
      layer: L.tileLayer(
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; 北京捷泰天域信息技术有限公司'
        }
      ),
      name: '蓝黑色地图'
    },
    '06': {
      layer: L.tileLayer(
        'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; 北京捷泰天域信息技术有限公司'
        }
      ),
      name: '暖色地图'
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
