<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 测距

原 `leaflet-ruler` 只声明支持 Leaflet 1.x。本示例基于 Leaflet 2 的 `Control`、`Polyline`、`Tooltip` 和地图事件实现测距，距离由地图实例的 `distance` 方法计算。

## 示例

<ClientDemo />

## 代码实现

::: code-group
<<< ./index.vue
<<< @/integrations/leaflet/MeasureControl.js
<<< @/components/InitMapTianditu.vue
:::
