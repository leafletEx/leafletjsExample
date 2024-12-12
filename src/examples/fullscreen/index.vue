<script setup>
import { ref, defineAsyncComponent, computed } from 'vue';
import 'leaflet.fullscreen/Control.FullScreen.css';
// todo 项目使用请放开
// import 'leaflet.fullscreen/Control.FullScreen.js';

const InitMap = defineAsyncComponent(() =>
  import('../../components/InitMapTianditu.vue')
);

// 全屏状态
const fullScreenState = ref(false);

const initFullscreenControl = (map) => {
  L.control
    .fullscreen({
      position: 'topleft', // 按钮的位置 topleft, topright, bottomright or bottomleft, 默认 topleft
      title: '全屏显示', // 更改按钮的标题
      titleCancel: '退出全屏', // 全屏打开时更改按钮的标题
      content: null, // 改变按钮的内容可以html 默认null
      forceSeparateButton: true, // 强制设置为单独按钮与缩放按钮分离，默认 false
      forcePseudoFullscreen: true, // 即使全屏 API 可用，也强制使用伪全屏，默认 false
      fullscreenElement: false // 进入全屏的 dom 元素，默认 false 使用 map._container
    })
    .addTo(map);

  // 进入全屏的事件
  map.on('enterFullscreen', function () {
    fullScreenState.value = true;
    console.log('entered fullscreen');
  });

  // 退出全屏的事件
  map.on('exitFullscreen', function () {
    fullScreenState.value = false;
    console.log('exited fullscreen');
  });
};

const mapObj = ref();

const toggleFullscreenButName = computed(() =>
  fullScreenState.value ? '退出全屏' : '进入全屏'
);

// 手动切换全屏状态
const toggleFullscreen = () => {
  mapObj.value.toggleFullscreen();
};

const mapLoad = (map) => {
  mapObj.value = map;
  initFullscreenControl(map);
};
</script>

<template>
  <!--  todo 这里设置层级只是特殊处理 vitePress 元素层级，项目使用无需设置  -->
  <init-map
    :style="{ 'z-index': fullScreenState ? 999 : 0 }"
    @map-load="mapLoad"
  ></init-map>

  <CButton class="mt-10" @click="toggleFullscreen">
    {{ toggleFullscreenButName }}
  </CButton>
</template>

<style scoped></style>
