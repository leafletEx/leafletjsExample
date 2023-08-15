<script setup>
import demo from './index.vue'
</script>

# 判断点是否在面内

使用 leaflet、vue、turfjs 判断一个点是否在一个面内（多边形、圆）。

[Turf.js](http://turfjs.org/)用于处理地理空间数据和地理空间分析。它提供了一系列函数和工具，如空间分析、地图制图、坐标转换、地理编码等。它很不错哦！

## 示例

<demo></demo>

## 安装依赖

```shell
pnpm install @turf/turf
```

## 项目引入

```js
// 命名别名是为了不和其他冲突
import {
    booleanPointInPolygon,
    point as turfPoint,
    polygon as turfPolygon
} from '@turf/turf';
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::

