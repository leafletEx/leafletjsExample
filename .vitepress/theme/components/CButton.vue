<script setup lang="ts">
</script>

<template>
  <div class="c-button">
    <slot></slot>
  </div>
</template>

<style lang='scss' scoped>
.c-button {
  display: inline-block;
  padding: 4px;
  border-radius: 4px;
  color: #ffffff;
  background: #9499ff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

.c-button+.c-button {
  margin-left: 10px;
}
</style>