<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# 导出地图图片

原 `leaflet-image` 依赖 Leaflet 1.x 内部实现。本示例使用 `html-to-image` 渲染地图 DOM，并通过 `file-saver` 下载 PNG。瓦片服务必须允许跨域读取，图层初始化时也需要启用 `crossOrigin`。

## 示例

<ClientDemo />

## 安装依赖

```shell
pnpm add html-to-image file-saver
```

## 代码实现

::: code-group
<<< ./index.vue
<<< @/components/InitMapTianditu.vue
:::
