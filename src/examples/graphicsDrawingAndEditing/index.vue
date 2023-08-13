<script setup>
import { ref, defineAsyncComponent } from 'vue';
// todo 项目中使用请放开注释
// import "@geoman-io/leaflet-geoman-free";
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

const mapObj = ref();

const addControls = () => {
  mapObj.value.pm.addControls({
    position: 'topright',
    drawCircleMarker: false,
    rotateMode: false
  });
};

// 自定义绘制样式
const customDrawingStyle = () => {
  mapObj.value.pm.setPathOptions(
    {
      color: 'orange', // 线的颜色
      fillColor: 'green', // 填充的颜色
      fillOpacity: 0.4 // 填充的透明度
    },
    {
      ignoreShapes: ['Circle'] // 忽略某些图形的更改
    }
  );
};

const mapLoad = (map) => {
  mapObj.value = map;

  // 设置语言为中文
  mapObj.value.pm.setLang('zh');

  addControls();
  customDrawingStyle();
};

/**
 * 手动调用 api 实现绘制、删除
 * https://geoman.io/docs/modes/draw-mode
 */

// 手动绘制多边形
const drawGraphics = () => {
  // 启用绘制模式
  mapObj.value.pm.enableDraw('Polygon', {
    snappable: true,
    snapDistance: 20
  });
};

// 监听图形删除事件
mapObj.value?.on('pm:remove', () => {
  // 关闭全局删除模式
  mapObj.value.pm.disableGlobalRemovalMode();
});

// 手动清除绘制图形
const clearDrawGraphics = () => {
  // 开启全局删除模式
  mapObj.value.pm.enableGlobalRemovalMode();
};

// 清除所有绘制图层
const clearAllDrawGraphics = () => {
  mapObj.value.pm.disableGlobalRemovalMode();
  const allLayers = mapObj.value.pm.getGeomanDrawLayers();
  allLayers.forEach((layer) => {
    mapObj.value.removeLayer(layer);
  });
};
</script>

<template>
  <init-map style="height: 50vh" @map-load="mapLoad"></init-map>
  <ul>
    <li class="c-button" @click="drawGraphics">绘制图形</li>
    <li class="c-button" @click="clearDrawGraphics">清除图形</li>
    <li class="c-button" @click="clearAllDrawGraphics">清除所有</li>
  </ul>
</template>

<style scoped></style>
