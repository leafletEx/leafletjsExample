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
  const customIcon = L.divIcon({
    className: 'custom-marker-style',
    html: `<div class="name">自定义 Icon</div><div class="icon"></div>`,
    iconSize: [141, 102.6]
  });

  marker.value = L.marker([32.0237855, 118.8075675], {
    riseOnHover: true,
    icon: customIcon
  }).addTo(mapObj.value);

  // 为 marker 绑定 popup
  marker.value.bindPopup('<b>Hello world!</b><br />这是默认 marker 绑定的 Popup', {offset: [0, -40]});

  // 为 marker 绑定点击事件
  marker.value.on('click', (e) => {
    console.log('默认 marker 触发点击事件', e);
  });
};

const mapLoad = (map) => {
  mapObj.value = map;

  createMarker();
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>
</template>

<style lang="scss">
.custom-marker-style {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .name {
    width: 141px;
    height: 52.5px;
    line-height:40px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    background: url('../../public/markerCustom/top-bg.png') no-repeat center;
    background-size: 100% 100%;
  }

  .icon {
    width: 38px;
    height: 49.13px;
    background: url('../../public/markerCustom/icon.png') no-repeat center;
    background-size: 100% 100%;
  }
}
</style>
