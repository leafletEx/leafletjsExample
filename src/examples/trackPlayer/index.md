<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 轨迹回放

原 `leaflet-trackplayer` 依赖 Leaflet 1.x。本示例使用 Leaflet 2 的 `Polyline`、`Marker` 与计时器实现基础轨迹播放，并提供开始和暂停控制。

## 示例

<ClientDemo />

## 代码实现

::: code-group
<<< ./index.vue
<<< ./trajectoryData.js
:::
