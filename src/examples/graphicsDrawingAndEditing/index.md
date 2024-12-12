<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# leaflet-geoman 图形绘制与编辑

leaflet-geoman 是一个商业化的插件，文档很详细，同时提供免费版本。

免费版本的功能同样强大，支持图形的绘制、编辑、拖动、剪切、分割、固定、跟踪、测量、缩放、旋转等操作。

## 示例

<ClientDemo></ClientDemo>

## 安装依赖

```shell
pnpm i @geoman-io/leaflet-geoman-free
```

## 在项目中引入

```js
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
```

or

```html

<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js"></script>
<link rel="stylesheet"
      href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css"
/>
```

## 国际化

```js
// 文档地址 https://geoman.io/docs/customize/language
mapObj.value.pm.setLang("zh");
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::
