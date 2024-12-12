<script setup>
import ArcGISMap from './ArcGIS.vue';
import OpenStreetMap from './OpenStreetMap.vue';
import GaoDeMap from './GaoDe.vue';
import InitMapTianditu from '../../components/InitMapTianditu.vue'
</script>

# 图层

## 天地图底图

<InitMapTianditu></InitMapTianditu>

```js
// 底图
const mapType = 'vec';
L.tileLayer(
    'https://t{s}.tianditu.gov.cn/' +
    mapType +
    '_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' +
    mapType +
    '&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=b72aa81ac2b3cae941d1eb213499e15e',
    {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        attribution:
            '&copy; <a href="http://lbs.tianditu.gov.cn/home.html">天地图 GS(2022)3124号 - 甲测资字1100471</a>'
    }
).addTo(mapObj.value);

// 标注图层
const mapLabelType = 'cva';
L.tileLayer(
    'https://t{s}.tianditu.gov.cn/' +
    mapLabelType +
    '_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' +
    mapLabelType +
    '&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=b72aa81ac2b3cae941d1eb213499e15e',
    {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }
).addTo(mapObj.value);
```

## 高德地图底图

<GaoDeMap></GaoDeMap>

```js
// 高德地图
L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: "1234"
})

// 高德影像
L.tileLayer(
    'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    {
        subdomains: '1234',
        attribution: '&copy; 高德'
    }
)
```

## ArcGIS 底图

<ArcGISMap></ArcGISMap>

```js
{
    layer: L.tileLayer(
    'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ),
    name: '世界影像地图'
}
```

原 `Geoq` 地址已经失效，暂未找到新的地址，后续有新的地址会补充进来。

:::tip
下边两个是 `ArcGIS` 底图服务的地址可以在里边找到其他的底图

`https://services.arcgisonline.com/arcgis/rest/services`

`https://server.arcgisonline.com/arcgis/rest/services`
:::

## openstreetmap 底图

<open-street-map></open-street-map>

```js
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 18,
        attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
);
```
