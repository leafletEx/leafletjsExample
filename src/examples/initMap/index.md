<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('../../components/InitMapTianditu.vue'))
</script>

# 初始化地图

使用 leaflet 与 vue 初始化一个地图。

## 示例

<ClientDemo></ClientDemo>

## 代码实现

<<< @/components/InitMapTianditu.vue

