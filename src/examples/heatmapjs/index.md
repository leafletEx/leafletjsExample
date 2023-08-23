<script setup>
import demo from './index.vue';
</script>

# heatmapjs 热力图

使用 leaflet 、heatmapjs 、vue 、加载热力图。

## 示例

<demo></demo>

## 安装依赖

官方示例仓库包存在问题 `ImageData data assignment in Strict Mode`
使用修改过的版本[具体可查看仓库 issues](https://github.com/pa7/heatmap.js/issues/319)

### webpack 使用 npm 引入

```shell
pnpm install leaflet-heatmap @mars3d/heatmap.js 
```

### vite 使用 script 引入

将 `leaflet-heatmap.js 、heatmap.js` 下载后在index.html 中引入

```js
<script src="./heatmap.js"></script>
<script src="./leaflet-heatmap.js"></script>
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue

<<< ./testData.js
:::

# FAQ

## vite 使用 heatmap.js 报错 "Cannot assign to read only property 'data' of object"

这个问题存在 heatmap.js' 原仓库,有许多这个问题的请求但没有被合并 [猛击查看](https://github.com/pa7/heatmap.js/pulls)
,有人发布了修改后的三方版本[猛击查看](https://github.com/muyao1987/heatmap.js) `@mars3d/heatmap.js`

### webpack 正常引入使用无问题

```js
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@mars3d/heatmap.js';
import HeatmapOverlay from 'leaflet-heatmap';
```

### vite 中会抛出上述错误

原因在于在 vite 中使用会执行 `if (typeof module !== "undefined" && module.exports)`
判断中的逻辑[猛击查看](https://github.com/pa7/heatmap.js/blob/master/plugins/leaflet-heatmap/leaflet-heatmap.js)
，仍会去加载 `heatmap.js`
而不是 `@mars3d/heatmap.js`。
解决办法：1. 按照如下方式修改 `leaflet-heatmap.js`, 2. 按照上述 vite 使用将文件下载到本地在 index.html 中引入

```js {4, 5}
  // Supports UMD. AMD, CommonJS/Node.js and browser context
if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(
        require('@mars3d/heatmap.js'),
        require('leaflet')
    );
} else if (typeof define === "function" && define.amd) {
    define(['@mars3d/heatmap.js', 'leaflet'], factory);
} else {
    // browser globals
    if (typeof window.h337 === 'undefined') {
        throw new Error('heatmap.js must be loaded before the leaflet heatmap plugin');
    }
    if (typeof window.L === 'undefined') {
        throw new Error('Leaflet must be loaded before the leaflet heatmap plugin');
    }
    context[name] = factory(window.h337, window.L);
}
```
