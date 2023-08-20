<script setup lang="ts">
import { computed } from 'vue';
import componentContributor from '../../../scripts/componentContributor.json';

const props = defineProps({
  fn: {
    type: String,
    default: ''
  }
});

const contributors = computed(() => componentContributor[props.fn] || []);
</script>

<template>
  <div class="component-contributor-avatar-list">
    <div
      v-for="item of contributors"
      :key="item.login"
      class="component-contributor-avatar-list__item"
    >
      <a :href="`https://github.com/${item.login}`" target="_blank">
        <img :src="item.avatar" alt="component-contributor-avatar" />
        {{ item.name }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-contributor-avatar-list {
  display: flex;
  flex-wrap: wrap;

  &__item {
    padding: 10px;
    width: 25%;

    a {
      display: flex;
      align-items: center;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 6px;
    }
  }
}
</style>
