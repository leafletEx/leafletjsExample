# Leaflet 2 与 TypeScript

Leaflet 2 使用标准 ESM，可直接使用具名导入，不再声明全局 `L`：

```ts
import { LeafletMap, Marker, TileLayer } from 'leaflet';

const map = new LeafletMap('map', {
  center: [32, 118],
  zoom: 10
});

new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
new Marker([32, 118]).addTo(map);
```

::: warning 类型声明状态
`leaflet@2.0.0-alpha.1` 当前包内尚未提供 TypeScript 声明文件；`@types/leaflet` 面向 Leaflet 1.x，其工厂函数和全局命名空间类型与 Leaflet 2 不完全一致。预览版阶段不建议用它来掩盖 2.x API 差异。
:::

如果业务项目必须使用 TypeScript，应把 Leaflet 调用集中在少量适配模块中，并只为实际使用的 Leaflet 2 API 编写临时声明。等 Leaflet 2 发布匹配的官方类型后，再移除这些临时声明。
