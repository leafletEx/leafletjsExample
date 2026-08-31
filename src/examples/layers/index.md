<script setup>
import { defineClientComponent } from 'vitepress'

const ClientTiandituMap = defineClientComponent(() => import('../../components/InitMapTianditu.vue'))
const ClientGaoDeMap = defineClientComponent(() => import('./GaoDe.vue'))
const ClientArcGISMap = defineClientComponent(() => import('./ArcGIS.vue'))
const ClientOpenStreetMap = defineClientComponent(() => import('./OpenStreetMap.vue'))
</script>

# 图层

Leaflet 2 使用 `TileLayer` 构造器创建瓦片图层：

```js
import { TileLayer } from 'leaflet';

new TileLayer(urlTemplate, options).addTo(map);
```

## 天地图底图

<ClientTiandituMap />

<<< @/components/InitMapTianditu.vue

## 高德地图底图

<ClientGaoDeMap />

<<< ./GaoDe.vue

## ArcGIS 底图

<ClientArcGISMap />

<<< ./ArcGIS.vue

## OpenStreetMap 底图

<ClientOpenStreetMap />

<<< ./OpenStreetMap.vue
