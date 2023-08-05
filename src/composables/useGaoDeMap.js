import gcoord from 'gcoord';
import L from 'leaflet';
import { ref } from 'vue';

export const useGaoDeMap = () => {
  // 初始化高德图层设置
  const initGaoDeTileLayer = () => {
    L.TileLayer.GaoDeTileLayer = L.TileLayer.extend({
      initialize: function (param, options) {
        const templateUrl =
          '//wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&{p}';
        // var templateUrl = "//webst{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&{p}"
        options = L.extend(
          {
            p: param,
            subdomains: '1234',
            minZoom: 0,
            maxZoom: 20,
            minNativeZoom: 1,
            maxNativeZoom: 18,
            attribution: '&copy; <a href="https://ditu.amap.com/">高德地图</a>'
          },
          options
        );
        L.TileLayer.prototype.initialize.call(this, templateUrl, options);
      },
      _setZoomTransform: function (level, center, zoom) {
        center = L.latLng(
          gcoord.transform([center.lat, center.lng], gcoord.WGS84, gcoord.GCJ02)
        );
        L.TileLayer.prototype._setZoomTransform.call(this, level, center, zoom);
      },
      _getTiledPixelBounds: function (center) {
        center = L.latLng(
          gcoord.transform([center.lat, center.lng], gcoord.WGS84, gcoord.GCJ02)
        );
        return L.TileLayer.prototype._getTiledPixelBounds.call(this, center);
      }
    });
  };

  // 初始化地图
  const mapObj = ref();
  const initMap = (mapDomId = 'map') => {
    initGaoDeTileLayer();
    // leaflet 默认投影是 L.CRS.EPSG3857	与高德相同，所以无需设置
    const map = L.map(mapDomId, {
      center: [32.0237855, 118.8075675],
      zoom: 11,
      minZoom: 7,
      maxZoom: 20
    });

    // todo 直接导出 mapObj.value 访问方法会有问题
    mapObj.value = map;
    return map;
  };

  // 根据类型获取不同底图参数
  const getGaoDeLayerByType = (type) => {
    const layerObj = {
      '01': {
        opts: 'lang=zh_cn&style=6&ltype=0&scl=0&size=0',
        info: '影像底图'
      },
      '02': {
        opts: 'lang=zh_cn&style=7&ltype=0&scl=0&size=0',
        info: '电子地图底图'
      }
    };

    return new L.TileLayer.GaoDeTileLayer(layerObj[type].opts, {});
  };

  // 设置图层
  const curMapLayer = ref();
  const setGaoDeLayer = (type = '02') => {
    if (curMapLayer.value) {
      curMapLayer.value.remove(mapObj.value);
      curMapLayer.value = null;
    }

    curMapLayer.value = getGaoDeLayerByType(type);
    curMapLayer.value.addTo(mapObj.value);
  };

  return {
    initMap,
    setGaoDeLayer
  };
};
