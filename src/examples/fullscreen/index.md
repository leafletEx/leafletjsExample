<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# fullscreen 全屏

使用支持 Leaflet 2 的 `leaflet.fullscreen` ESM 导出实现地图全屏。

## 示例

<ClientDemo />

## 安装依赖

```shell
pnpm add leaflet.fullscreen
```

插件不再依赖全局 `L`，直接导入控件类：

```js
import { FullScreen } from 'leaflet.fullscreen';
import 'leaflet.fullscreen/dist/Control.FullScreen.css';

map.addControl(new FullScreen({ position: 'topleft' }));
```

## 代码实现

::: code-group
<<< ./index.vue
<<< @/components/InitMapTianditu.vue
:::
