<script setup>
import { defineAsyncComponent } from 'vue';
import 'leaflet'
import 'leaflet-ruler/src/leaflet-ruler.css';
import 'leaflet-ruler';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const initMeasureDistance = (map) => {
  const options = {
    position: 'topleft', // 控件的位置 topright、topleft、bottomright
    circleMarker: {
      // 这个插件中 Leaflet 圆形 marker 的配置
      color: '#8ab4f8',
      radius: 4
    },
    lineStyle: {
      // 这个插件中 Leaflet polyline 的配置，https://leafletjs.cn/reference.html#path
      color: '#8ab4f8',
      width: 2
    },
    lengthUnit: {
      // 自定义长度单位默认单位是公里
      display: 'km', // 展示的单位
      decimal: 2, // 保留几位小数
      factor: null, // 值的转换 如 km 转换为 m，这里填 1000。
      label: '距离:'
    },
    angleUnit: {
      display: '&deg;', // 展示的单位
      decimal: 2, // 保留几位小数
      factor: null, // 角度单位转换（超纲了！）
      label: '角度:'
    }
  };
  L.control.ruler(options).addTo(map);
};
</script>

<template>
  <init-map @map-load="initMeasureDistance"></init-map>
</template>

<style>
.leaflet-ruler {
  background-image: url('https://leafletjs-example.netlify.app/logo.png')!important;
  background-size: 100% 100%;
}
</style>
