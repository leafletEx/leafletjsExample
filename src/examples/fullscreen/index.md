<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# fullscreen 全屏

使用 leaflet 、leaflet.fullscreen、vue 实现地图全屏。

实现 dom 元素全屏并不是很复杂的事情但既然已经有插件，那我们就来看下插件的使用方式。

## 示例

<ClientDemo></ClientDemo>

## 安装依赖

::: tip 提示
它依赖于 `screenfull` 虽然官方没有指出(一个跨浏览器使用 JavaScript Fullscreen API 的简单包装器)
:::

[leaflet.fullscreen 仓库](https://github.com/brunob/leaflet.fullscreen)

[screenfull 仓库](https://github.com/sindresorhus/screenfull)

```shell
pnpm i leaflet.fullscreen screenfull
```

## 有两种使用方式

一种是在地图初始化的时候直接添加全屏控件

```js

const map = new L.Map('map', {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});
```

第二种如下手动创建后添加到地图

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::

