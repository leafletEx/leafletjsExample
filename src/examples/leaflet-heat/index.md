<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# Canvas 热力图

原 `leaflet.heat` 依赖 Leaflet 1.x 的全局扩展方式。本示例改为 `simpleheat` 加本地 Leaflet 2 `Layer` 适配器，不再修改 Leaflet 命名空间。

## 示例

<ClientDemo />

## 安装依赖

```shell
pnpm add simpleheat
```

## 代码实现

::: code-group
<<< ./index.vue
<<< @/integrations/leaflet/SimpleHeatLayer.js
<<< @/components/InitMapTianditu.vue
:::
