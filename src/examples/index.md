# 简介

一些 Leaflet 与 vue 结合使用的示例。

## Leaflet 简介

Leaflet.js 是一个开源的 JavaScript 库，用于创建交互式地图和地理信息应用程序。它提供了一个简单、轻量级且易于使用的
API，让开发者可以在网页上集成地图、标记点、图层、多边形、折线等地理信息要素，并实现与地图相关的交互和操作。

类似的还有 OpenLayers 它与 Leaflet.js 有些相似，都是用于地图展示和地理信息处理的前端库。

### 中文官网

[https://leafletjs.cn/index.html](https://leafletjs.cn/index.html)

## 版本

+ vue 3.3.4
+ leaflet 1.9.4

## 安装 leaflet

### 使用cdn

```js
// jsdelivr
<script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css">
```

### 使用 npm

```shell
npm install leaflet
```

+ 使用 npm 一般需要在 main.js 中引入 css 样式文件, **如果没有引入则会导致瓦片加载不完全等样式问题**。

```js
// main.js
import "leaflet/dist/leaflet.css";
```
