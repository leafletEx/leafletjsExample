<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 图形绘制与编辑

原 Geoman 版本依赖 Leaflet 1.x。本示例使用 Leaflet 2 核心的 `Marker`、`Polyline`、`Polygon` 和地图事件实现轻量绘制：点击添加顶点，拖动顶点编辑图形，双击或点击按钮结束绘制。

## 示例

<ClientDemo />

## 代码实现

::: code-group
<<< ./index.vue
<<< @/components/InitMapTianditu.vue
:::
