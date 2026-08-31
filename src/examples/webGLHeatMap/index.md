<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# WebGL 热力图

旧 `leaflet-webgl-heatmap` 通过全局 `L` 注册插件，无法直接适配 Leaflet 2。本示例使用继承自 Leaflet 2 `Layer` 的原生 WebGL 点精灵图层。

## 示例

<ClientDemo />

## 代码实现

::: code-group
<<< ./index.vue
<<< ./useWebGLHeatMap.js
<<< @/integrations/leaflet/WebGLHeatLayer.js
:::
