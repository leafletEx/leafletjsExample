<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# GeoJSON 地理JSON

> 是一种用于表示地理空间数据的开放标准格式。它使用 JSON 来描述地理要素的几何形状（点、线、面等）以及相应的属性信息。GeoJSON
> 在地理信息系统（GIS）中被广泛使用，用于存储、传输和共享地理数据。

使用 leaflet 、vue 、 GeoJSON 加载点、线、面、区域边界。

## 示例

<ClientDemo></ClientDemo>

## 代码实现

::: code-group

<<< ./index.vue

<<< ./useGeoJsonData.js

<<< @/components/InitMapTianditu.vue
:::

