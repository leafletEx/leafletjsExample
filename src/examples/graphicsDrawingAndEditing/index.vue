<script setup>
import { defineAsyncComponent, onUnmounted, shallowRef } from 'vue';
import { DivIcon, LayerGroup, Marker, Polygon, Polyline } from 'leaflet';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

const mapObj = shallowRef();
const drawingLayers = shallowRef();
const shapeLayer = shallowRef();
const vertexMarkers = [];

/** 根据当前顶点创建折线或多边形，拖动顶点时同步更新图形。 */
const updateShape = () => {
  const latLngs = vertexMarkers.map((marker) => marker.getLatLng());
  shapeLayer.value?.remove();
  shapeLayer.value = null;

  if (latLngs.length < 2) return;
  shapeLayer.value =
    latLngs.length >= 3
      ? new Polygon(latLngs, {
          color: 'orange',
          fillColor: 'green',
          fillOpacity: 0.4
        })
      : new Polyline(latLngs, { color: 'orange', weight: 3 });
  drawingLayers.value.addLayer(shapeLayer.value);
};

/** 在地图点击位置添加可拖动的编辑顶点。 */
const addVertex = (event) => {
  const marker = new Marker(event.latlng, {
    draggable: true,
    icon: new DivIcon({ className: 'draw-vertex', iconSize: [14, 14] })
  });
  marker.on('drag', updateShape);
  vertexMarkers.push(marker);
  drawingLayers.value.addLayer(marker);
  updateShape();
};

/** 完成当前绘制并恢复地图默认交互。 */
const finishDrawing = () => {
  if (!mapObj.value) return;
  mapObj.value.off('click', addVertex);
  mapObj.value.off('dblclick', finishDrawing);
  mapObj.value.doubleClickZoom.enable();
  mapObj.value.getContainer().style.cursor = '';
};

/** 清空旧图形并进入点击添加顶点的绘制模式。 */
const drawGraphics = () => {
  clearAllDrawGraphics();
  mapObj.value.doubleClickZoom.disable();
  mapObj.value.getContainer().style.cursor = 'crosshair';
  mapObj.value.on('click', addVertex);
  mapObj.value.on('dblclick', finishDrawing);
};

/** 清除图形和编辑顶点。 */
const clearAllDrawGraphics = () => {
  finishDrawing();
  drawingLayers.value?.clearLayers();
  vertexMarkers.splice(0);
  shapeLayer.value = null;
};

/** 保存地图实例并创建专用绘制图层组。 */
const mapLoad = (map) => {
  mapObj.value = map;
  drawingLayers.value = new LayerGroup().addTo(map);
};

onUnmounted(finishDrawing);
</script>

<template>
  <init-map style="height: 50vh" @map-load="mapLoad"></init-map>

  <div class="mt-10">
    <CButton @click="drawGraphics">绘制图形</CButton>
    <CButton @click="finishDrawing">完成绘制</CButton>
    <CButton @click="clearAllDrawGraphics">清除所有</CButton>
  </div>
</template>

<style>
.draw-vertex {
  box-sizing: border-box;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #f97316;
  box-shadow: 0 1px 4px rgb(0 0 0 / 35%);
}
</style>
