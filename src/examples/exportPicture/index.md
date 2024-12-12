<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# leaflet-image 导出图片

使用 leaflet 、leaflet-image、vue 截图并导出。

## 示例

::: tip 提示
导出需要一些时间请稍后，正常会有一个 loading 来处理 :tea:。
:::

<ClientDemo></ClientDemo>

## 安装依赖

```shell
# 截图导出图片插件
pnpm install leaflet-image

# 文件下载插件
pnpm install file-saver 
```

## 项目引入

```html
import leafletImage from "leaflet-image";

import { saveAs } from 'file-saver';
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::

