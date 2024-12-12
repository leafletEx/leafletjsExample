<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 点聚合

使用 `Leaflet.markercluster` 插件实现，[仓库地址](https://github.com/Leaflet/Leaflet.markercluster)。

## 示例

<ClientDemo></ClientDemo>

## 安装依赖

```shell
pnpm install leaflet.markercluster

# ts 项目需要安装类型文件
pnpm install @types/leaflet.markercluster
```

## 在项目中引入

```js
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::
