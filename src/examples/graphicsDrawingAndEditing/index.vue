<script setup>
import { ref, defineAsyncComponent } from 'vue';
import "@geoman-io/leaflet-geoman-free";
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

// 绘制完成事件
const pmCreate = (event) => {
  const layer = event.layer;
  const shapeType = layer.pm.getShape(); // 获取绘制图形的类型

  let coordinates = [];

  // 根据绘制图形的类型获取坐标集合
  switch (shapeType) {
    case 'Polygon':
      coordinates = layer.getLatLngs()[0];
      break;
    case 'Rectangle':
      coordinates = layer.getLatLngs()[0];
      break;
    case 'Circle':
      const center = layer.getLatLng();
      const radius = layer.getRadius();
      console.log('圆形', center, radius);
      // 这里可以根据需要将圆形转换为多边形，以便获得更多点的坐标
      // coordinates = convertCircleToPolygon(center, radius, numPoints);
      break;
    default:
      break;
  }

  console.log('绘制图形点位', coordinates);
};

// 图形删除事件
const pmRemove = (e) => {
  // 关闭全局删除模式
  mapObj.value.pm.disableGlobalRemovalMode();
};

const mapLoad = (map) => {
  mapObj.value = map;

  // 设置语言为中文
  mapObj.value.pm.setLang('zh');

  addControls();
  customDrawingStyle();

  // 监听绘制完成事件
  mapObj.value.on('pm:create', pmCreate);

  // 监听图形删除事件
  mapObj.value?.on('pm:remove', pmRemove);
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
  
  <div class="mt-10">
    <CButton @click="drawGraphics">绘制图形</CButton>
    <CButton @click="clearDrawGraphics">清除图形</CButton>
    <CButton @click="clearAllDrawGraphics">清除所有</CButton>
  </div>
</template>

<style scoped></style>
