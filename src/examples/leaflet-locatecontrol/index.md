<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# leaflet-locatecontrol 定位

使用 leaflet 、leaflet-locatecontrol、vue 展示用户当前的定位。
 
这个控件可以让用户点击后在地图上展示出自己当前所在的位置，它依赖 leaflet 的 `locate` 方法。

![示例图片](/img/leaflet-locatecontrol/iShot_2024-12-16_16.20.20.png)

[猛击查看 leaflet 官方文档](https://leafletjs.cn/reference.html#locate-options)

## 示例

<ClientDemo></ClientDemo>

## 安装依赖

[leaflet-locatecontrol Github 仓库](https://github.com/domoritz/leaflet-locatecontrol)

```shell
pnpm i leaflet.locatecontrol

# ts 项目需要安装类型文件
pnpm install @types/leaflet.locatecontrol
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::

## options

以下内容来自 AI 翻译可能存在错误，仅供参考 [访问 Github 仓库查看最新配置](https://github.com/domoritz/leaflet-locatecontrol)

| 选项 | 类型 | 描述 | 默认值 |
|------|------|------|---------|
| position | string | 控件的位置 | 'topleft' |
| layer | ILayer | 用户位置应该绘制的图层 | 新图层 |
| setView | boolean 或 string | 设置地图视图(缩放和平移)到用户位置的更新方式。选项有 'false'、'once'、'always'、'untilPan' 或 'untilPanOrZoom' | 'untilPanOrZoom' |
| flyTo | boolean | 平滑地平移和缩放到标记的位置。仅适用于 Leaflet 1.0+ | false |
| keepCurrentZoomLevel | boolean | 设置视图时仅进行平移 | false |
| initialZoomLevel | false 或 integer | 点击图标激活插件后，即使 keepCurrentZoomLevel 为 true，也会缩放到选定的缩放级别。设置为 false 可禁用此功能 | false |
| clickBehavior | object | 用户点击控件时的行为。包含三个选项：inView、inViewNotFollowing 和 outOfView。可能的值是 'stop' 和 'setView'，或要继承的行为名称 | `{inView: 'stop', outOfView: 'setView', inViewNotFollowing: 'inView'}` |
| returnToPrevBounds | boolean | 如果设置，在定位到用户位置前保存地图边界。当控件禁用时，将视图恢复到之前保存的边界 | false |
| cacheLocation | boolean | 用户停用控件后保持位置缓存。如果设为 false，用户需要等待定位 API 返回新位置才能再次看到他们的位置 | true |
| showCompass | boolean | 在位置标记上显示指南针方向 | true |
| drawCircle | boolean | 如果设置，将绘制显示位置精度的圆圈 | true |
| drawMarker | boolean | 如果设置，将在用户位置绘制标记 | true |
| markerClass | class | 用于创建标记的类 | LocationMarker |
| compassClass | class | 用于创建标记的类 | CompassMarker |
| circleStyle | Path options | 精度圆圈的样式属性 | 见代码 |
| markerStyle | Path options | 内部标记的样式属性。仅当标记类支持 setStyle 时有效 | 见代码 |
| compassStyle | Path options | 三角形指南针标记的样式属性。仅当标记类支持 setStyle 时有效 | 见代码 |
| followCircleStyle | Path options | 跟随时精度圆圈的样式变化。仅需提供更改部分 | {} |
| followMarkerStyle | Path options | 跟随时内部标记的样式变化。仅需提供更改部分 | {} |
| followCompassStyle | Path options | 跟随时指南针标记的样式变化。仅需提供更改部分 | {} |
| icon | string | 图标的 CSS 类 | 'leaflet-control-locate-location-arrow' |
| iconLoading | string | 加载时图标的 CSS 类 | 'leaflet-control-locate-spinner' |
| iconElementTag | string | 用于创建图标的元素 | 'span' |
| circlePadding | array | 精度圆圈周围的内边距 | [0, 0] |
| createButtonCallback | function | 可用于重写按钮创建行为的回调函数 | 见代码 |
| getLocationBounds | function | 可用于重写视口跟踪行为的回调函数 | 见代码 |
| onLocationError | function | 当用户位置在地图设定边界之外时调用的事件 | 见代码 |
| metric | boolean | 使用公制单位 | true |
| onLocationOutsideMapBounds | function | 当用户位置在地图设定边界之外时调用。用户位置改变时重复调用 | 见代码 |
| showPopup | boolean | 用户点击内部标记时显示弹出窗口 | true |
| strings | object | 控件中使用的字符串。选项包括 title、text、metersUnit、feetUnit、popup 和 outsideMapBoundsMsg | 见代码 |
| strings.popup | string 或 function | 显示为弹出窗口的字符串。可包含占位符 {distance} 和 {unit}。如果此选项指定为函数，将使用单个参数 {distance, unit} 执行并期望返回字符串 | 见代码 |
| locateOptions | [Locate options](https://leafletjs.cn/reference.html#locate-options) | 传递给 leaflet 定位方法的默认选项 | 见代码 |

