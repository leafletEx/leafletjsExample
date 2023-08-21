<script setup>
import leafletHeatDemo from './leafletHeat.vue';
</script>

# leaflet.heat 热力图

使用 leaflet 、leaflet.heat、vue 加载热力图。

## 示例

<leafletHeatDemo></leafletHeatDemo>

## 安装依赖

[leaflet.heat 仓库](https://github.com/Leaflet/Leaflet.heat)

```shell
pnpm install leaflet.heat
```

## 代码实现

::: code-group

<<< ./leafletHeat.vue

<<< @/components/InitMapTianditu.vue
:::

## options

| options    |                         描述                         |     类型 |
|------------|:--------------------------------------------------:|-------:|
| minOpacity |                       最小不透明度                       | Number |
| maxZoom    |   点达到最大强度的缩放级别（强度随着缩放而缩放），maxZoom 默认情况下等于地图 zoom   | Number |
| max        |                     点默认强度，默认为1                     | Number |
| radius     |                 热图每个“点”的半径， 默认 25                  | Number |
| blur       |                      模糊，默认 15                      | Number |
| gradient   | 渐变颜色渐变配置：`{ 0.4: 'blue', 0.65: 'lime', 1: 'red' }` | Object |

## Methods

| methods    |        描述         |                  参数 |
|------------|:-----------------:|--------------------:|
| setOptions |  设置新的热力图数据并重新绘制。  | [options](#options) |
| addLatLng  | 向热力图添加一个新点并重新绘制它。 |              latlng |
| setLatLngs |  重新设置热力图数据并重新绘制它  |             latlngs |
| redraw     |       重新绘制        |                   - |
