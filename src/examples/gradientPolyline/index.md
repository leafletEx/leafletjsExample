<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 渐变折线

原 `leaflet-hotline` 依赖全局 `L`。本示例把轨迹拆成连续线段，根据每段强度计算颜色，再使用 Leaflet 2 `Polyline` 和 `FeatureGroup` 渲染。

## 示例

<ClientDemo />

## 代码实现

::: code-group
<<< ./index.vue
<<< @/components/InitMapTianditu.vue
<<< ../../public/geojson/gulou.json
:::
