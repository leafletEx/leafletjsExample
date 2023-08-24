<script setup>
import GeoQMap from './Geoq.vue';
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

## GeoQ 底图

<geo-q-map></geo-q-map>

```js
  const layers = {
    '01': {
        layer: L.tileLayer(
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity_Mobile/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; 北京捷泰天域信息技术有限公司'
            }
        ),
        name: '高清中国基础地图'
    },
    '02': {
        layer: L.tileLayer(
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunityENG/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; 北京捷泰天域信息技术有限公司'
            }
        ),
        name: '英文地图'
    },
    '03': {
        layer: L.tileLayer(
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; 北京捷泰天域信息技术有限公司'
            }
        ),
        name: '彩色中文地图'
    },
    '04': {
        layer: L.tileLayer(
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; 北京捷泰天域信息技术有限公司'
            }
        ),
        name: '灰色地图'
    },
    '05': {
        layer: L.tileLayer(
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; 北京捷泰天域信息技术有限公司'
            }
        ),
        name: '蓝黑色地图'
    },
    '06': {
        layer: L.tileLayer(
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; 北京捷泰天域信息技术有限公司'
            }
        ),
        name: '暖色地图'
    }
};
```

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
