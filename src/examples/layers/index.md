<script setup>
import GeoQMap from './Geoq.vue';
import OpenStreetMap from './OpenStreetMap.vue';
</script>

# 图层

## 天地图底图

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

```js
// 高德地图
L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: "1234"
})

// 高德影像
L.layerGroup([L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
    subdomains: "1234"
}), L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', {
    subdomains: "1234"
})])
```

## GeoQ 底图

<geo-q-map></geo-q-map>

<<< ./Geoq.vue

## openstreetmap 底图

<open-street-map></open-street-map>

<<< ./OpenStreetMap.vue
