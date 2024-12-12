<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 加载高德地图

使用 leaflet 与 vue 加载高德地图、实现图层切换。

## 示例

<ClientDemo></ClientDemo>

## 安装依赖

```shell
# gcoord 是一个处理地理坐标系的JS库
# 用来修正百度地图、高德地图及其它互联网地图坐标系不统一的问题。
pnpm i gcoord
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/composables/useGaoDeMap.js

:::
