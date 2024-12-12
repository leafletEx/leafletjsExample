<script setup>
import { ref, defineAsyncComponent } from 'vue';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const mapObj = ref();

// 单个 marker 创建
const marker = ref();
const createMarker = () => {
  if (marker.value) {
    mapObj.value.removeLayer(marker.value);
    marker.value = null;
  }

  // 创建一个 marker
  marker.value = L.marker([32.0237855, 118.8075675]).addTo(mapObj.value);

  // 为 marker 绑定 popup
  marker.value.bindPopup('<b>Hello world!</b><br />这是默认 marker 绑定的 Popup');

  // 打开绑定的 popup
  marker.value.openPopup();

  // 为 marker 绑定点击事件
  marker.value.on('click', (e) => {
    console.log('默认 marker 触发点击事件', e);
  });
};

/**
 * 批量创建多个 marker
 * 与创建单个 marker 不同的是批量创建多个 marker 时会创建一个图层组
 * 先将 marker 加载到图层组中在添加到地图这样做的原因在于更容易管理不同覆盖物。
 */
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
  const points = [
    [32.0148855, 118.8276675],
    [32.0128855, 118.8477675],
    [32.0118855, 118.8678675],
    [32.0138855, 118.8979675]
  ];

  const markers = points.map((item) => {
    // 创建自定义图标
    const icon = L.icon({
      iconUrl: 'https://leafletjs-example.netlify.app/logo.png',
      iconSize: [30, 30]
    });

    return L.marker(item, { icon });
  });

  // 将 marker 加载到图层组
  markerLayerGroup.value = L.featureGroup(markers);

  // 为每个 marker 绑定 popup
  markerLayerGroup.value.bindPopup(
    '<b>你好啊!</b><br />这是批量创建的 marker'
  );

  // 绑定事件
  markerLayerGroup.value.on('click', (e) => {
    console.log('批量创建的 marker 触发点击事件', e);
  });

  // 将图层组加载到地图
  markerLayerGroup.value.addTo(mapObj.value);
};

const mapLoad = (map) => {
  mapObj.value = map;

  createMarker();
  createMarkers();
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>

  <CButton class="mt-10" @click="clearMarkerLayerGroup">清除 marker</CButton>
</template>

<style scoped></style>
