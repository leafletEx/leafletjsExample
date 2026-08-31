<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# leaflet-locatecontrol 定位

使用支持 Leaflet 2 的 `leaflet.locatecontrol` ESM 导出展示浏览器定位结果。浏览器会在用户点击定位按钮后请求位置权限。

## 示例

<ClientDemo />

## 安装依赖

```shell
pnpm add leaflet.locatecontrol@0.90.1
```

```js
import { LocateControl } from 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

map.addControl(new LocateControl({ position: 'topleft' }));
```

## 代码实现

::: code-group
<<< ./index.vue
<<< @/components/InitMapTianditu.vue
:::
