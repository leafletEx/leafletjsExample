# 简介

本项目提供 Leaflet 2 与 Vue 3 的集成示例，覆盖底图、矢量图形、热力图、点聚合、绘制、测距、轨迹播放和图片导出等常见场景。

## 当前版本

- Vue 3
- Leaflet 2.0.0-alpha.1

Leaflet 2 已改为 ESM，并移除了全局 `L` 命名空间。示例统一使用具名导入和构造器：

```js
import { LeafletMap, Marker, TileLayer } from 'leaflet';

const map = new LeafletMap('map', { center: [32, 118], zoom: 10 });
new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
new Marker([32, 118]).addTo(map);
```

## 安装

```shell
pnpm add leaflet@2.0.0-alpha.1
```

在应用入口引入 Leaflet 样式，否则地图控件和瓦片布局会异常：

```js
import 'leaflet/dist/leaflet.css';
```

::: warning 预览版说明
Leaflet 2 仍处于 alpha 阶段。1.x 插件如果依赖 `window.L`、修改 `L.*` 命名空间或只声明支持 Leaflet 1.x，不能直接用于本项目。
:::
