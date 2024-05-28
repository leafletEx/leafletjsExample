<script setup>
import demo from './index.vue';
</script>

# leaflet-trackplayer 轨迹回放

使用 leaflet 、leaflet-trackplayer、vue 实现轨迹回放。

支持轨迹颜色、轨迹线宽度、运动速度、已行驶轨迹部分的颜色、未行驶轨迹部分的颜色、地图视图是否跟随移动标记等配置

同时也支持通过方法设置相关属性及事件的监听,更多请查看[GitHub 仓库地址](https://github.com/weijun-lab/Leaflet.TrackPlayer/blob/master/README.zh-CN.md)

## 示例

<demo></demo>

## 安装依赖

```shell
pnpm install leaflet-trackplayer
```

## 项目引入

```js
import 'leaflet-trackplayer';
```

## 代码实现

::: code-group

<<< ./index.vue

<<< ./trajectoryData.js
:::

