<script setup>
import demo from './index.vue'
</script>

# webGL 热力图

使用 leaflet 、leaflet-webgl-heatmap、vue 加载热力图。

## 示例

<demo></demo>

## 安装依赖

```shell
pnpm install leaflet-webgl-heatmap -D
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/composables/useMap.js

<<< ./useWebGLHeatMap.js
:::

## 配置参考

```js
const opts = {
    size: 1000,
    units: 'm', // size 单位 m、km
    opacity: 1, // 透明度 默认1
    gradientTexture: "", // 图片网址或图片
    alphaRange: 1 // 热力图透明度 0-1， 默认1
}

const heatmap = new L.webGLHeatmap(opts);

// 3 表示数据强度
const points = [32.020274, 118.803319, 3]

// 强制更改元素的强度
heatmap.multiply(2) 
```

