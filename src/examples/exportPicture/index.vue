<script setup>
import { defineAsyncComponent, ref, shallowRef } from 'vue';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

const InitMap = defineAsyncComponent(
  () => import('../../components/InitMapTianditu.vue')
);

const mapObj = shallowRef();
const exportMessage = ref('');

/** 将当前 Leaflet 地图容器渲染为 PNG 并触发下载。 */
const exportPicture = async () => {
  exportMessage.value = '正在生成图片…';

  try {
    const imageUrl = await toPng(mapObj.value.getContainer(), {
      cacheBust: true,
      pixelRatio: 1,
      // VitePress 的远程字体样式表受跨域限制；地图截图无需重新内嵌字体。
      skipFonts: true
    });
    saveAs(imageUrl, '地图图片导出.png');
    exportMessage.value = '图片已生成并开始下载。';
  } catch (error) {
    exportMessage.value = `导出失败：${error.message}`;
    console.error('地图图片导出失败', error);
  }
};

/** 保存 Leaflet 地图实例供导出操作使用。 */
const mapLoad = (map) => {
  mapObj.value = map;
};
</script>

<template>
  <init-map @map-load="mapLoad"></init-map>

  <CButton class="mt-10" @click="exportPicture">导出图片</CButton>
  <p v-if="exportMessage" class="export-message" role="status">
    {{ exportMessage }}
  </p>
</template>

<style scoped>
.export-message {
  margin-top: 12px;
}
</style>
