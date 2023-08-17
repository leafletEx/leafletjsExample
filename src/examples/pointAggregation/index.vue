<script setup>
import { ref, defineAsyncComponent } from 'vue';
// todo 项目使用请放开注释
// import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const mapObj = ref();

const markerLayerGroup = ref();

// 清除图层组图层
const clearMarkerLayerGroup = () => {
  if (markerLayerGroup.value) {
    mapObj.value.removeLayer(markerLayerGroup.value);
    markerLayerGroup.value = null;
  }
};

// 创建多个 marker
const createMarkers = () => {
  // 加载前先清除
  clearMarkerLayerGroup();

  // 创建点聚合图层
  markerLayerGroup.value = L.markerClusterGroup();

  const points = [
    [32.0148855, 118.8276675],
    [32.0138855, 118.8477675],
    [32.0138855, 118.8678675],
    [32.0138855, 118.8979675],
    [32.0148855, 118.8989675],
    [32.0148855, 118.8969675],
    [32.0148855, 118.8979675],
    [32.0148855, 118.8989675]
  ];

  points.forEach((item) => {
    // 创建自定义图标
    const icon = L.icon({
      iconUrl: 'https://leafletjs-example.vercel.app/logo.png',
      iconSize: [30, 30]
    });

    const marker = L.marker(item, { icon });

    // 添加
    markerLayerGroup.value.addLayers(marker);
  });

  // 为每个 marker 绑定 popup
  markerLayerGroup.value.bindPopup('<b>Hello world!</b><br />marker');

  // 绑定 marker 点击事件
  markerLayerGroup.value.on('click', (e) => {
    console.log('marker 触发点击事件', e);
  });

  // 绑定聚合点点击事件
  markerLayerGroup.value.on('clusterclick', (e) => {
    console.log('点击聚合点触发点击事件', e);
  });

  // 将图层组加载到地图
  markerLayerGroup.value.addTo(mapObj.value);
};

const mapLoad = (map) => {
  mapObj.value = map;
  createMarkers();
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style scoped></style>
