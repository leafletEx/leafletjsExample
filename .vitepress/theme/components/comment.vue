<script setup>
import Giscus from '@giscus/vue';
import { useData, useRoute } from 'vitepress';
import { ref, watch, nextTick } from 'vue';

const { isDark } = useData();

const route = useRoute();
const showComment = ref(true);
watch(
  () => route.path,
  () => {
    showComment.value = false;
    nextTick(() => {
      showComment.value = true;
    });
  },
  {
    immediate: true
  }
);
</script>

<template>
  <Giscus
    v-if="showComment"
    src="https://giscus.app/client.js"
    repo="leafletEx/leafletjsExample"
    repo-id="R_kgDOKCJi9A"
    category="Q&A"
    category-id="DIC_kwDOKCJi9M4CYtW-"
    mapping="pathname"
    strict="1"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    :theme="isDark ? 'dark' : 'light'"
    lang="zh-CN"
    loading="lazy"
    crossorigin="anonymous"
    async
  ></Giscus>
</template>

<style scoped></style>
