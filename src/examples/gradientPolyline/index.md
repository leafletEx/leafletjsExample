<script setup>
import demo from './index.vue'
</script>

# 渐变折线

使用 leaflet 、leaflet-hotline、vue 绘制渐变折线。

## 示例

<demo></demo>

## 安装依赖

```shell
pnpm install leaflet-hotline
```

## 项目引入
```js
import leafletHotline from 'leaflet-hotline';

// 注册插件
leafletHotline(L);
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue

<<< ../../public/geojson/gulou.json
:::

## options

| options      |                                                  描述                                                  |     类型 |
|--------------|:----------------------------------------------------------------------------------------------------:|-------:|
| min          |                       数据数组中预期的最小 z 值。这将映射到停止值 0。任何小于此值的 z 值在选择要使用的颜色时将被视为最小值。                        | Number |
| max          |                       数据数组中预期的最大 z 值。这将映射到停止值 1。任何大于此值的 z 值在选择要使用的颜色时将被视为最大值。                        | Number |
| palette      | 渐变调色板的配置，格式为 `{ <stop>: '<color>' }`。默认为 `{ 0.0: 'green', 0.5: 'yellow', 1.0: 'red' }`。值应在 0 和 1 之间。 | Object |
| weight       |                                            默认为 5，表示线条的宽度                                             | Number |
| outlineColor |                                    边界线的颜色。默认为 'black'，不支持rgb、rgba                                    | String |
| outlineWidth |                                      边界线的宽度，以像素为单位。可以为 0。默认为 1                                       | Number |
| smoothFactor |                                                线的平滑度                                                 | Number |
