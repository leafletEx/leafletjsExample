<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# heatmap.js 热力图

使用修复了严格模式兼容问题的 `@mars3d/heatmap.js`，并通过本地 Leaflet 2 图层适配器同步地图移动和缩放；无需动态插入脚本，也不依赖 `window.L` 或 `HeatmapOverlay` 全局变量。

## 示例

<ClientDemo />

## 安装依赖

```shell
pnpm add @mars3d/heatmap.js
```

## 代码实现

::: code-group
<<< ./index.vue
<<< @/integrations/leaflet/HeatmapJsLayer.js
<<< ./testData.js
:::
