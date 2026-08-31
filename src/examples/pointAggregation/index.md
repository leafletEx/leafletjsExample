<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 点聚合

原 `Leaflet.markercluster` 尚未声明支持 Leaflet 2。本示例使用与 Leaflet 无耦合的 `supercluster` 计算聚合结果，再通过 Leaflet 2 的 `Marker` 和 `LayerGroup` 渲染。

## 示例

<ClientDemo />

## 安装依赖

```shell
pnpm add supercluster
```

## 代码实现

::: code-group
<<< ./index.vue
<<< @/integrations/leaflet/SuperclusterLayer.js
<<< @/components/InitMapTianditu.vue
:::
