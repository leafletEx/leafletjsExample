import { shallowRef } from 'vue';
import gcoord from 'gcoord';
import { LatLng, LeafletMap, TileLayer } from 'leaflet';

/**
 * 对高德瓦片的坐标计算进行 GCJ-02 转换。
 * Leaflet 2 推荐直接使用 JavaScript class 继承，不再向全局命名空间挂载子类。
 */
class GaoDeTileLayer extends TileLayer {
  initialize(param, options) {
    const templateUrl =
      '//wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&{p}';

    super.initialize(templateUrl, {
      p: param,
      subdomains: '1234',
      minZoom: 0,
      maxZoom: 20,
      minNativeZoom: 1,
      maxNativeZoom: 18,
      attribution: '&copy; <a href="https://ditu.amap.com/">高德地图</a>',
      // Leaflet 2 移除了 Util.extend，使用对象展开合并调用方配置。
      ...options
    });
  }

  /** 将 Leaflet 计算得到的中心点转换到高德使用的 GCJ-02 坐标。 */
  _toGaoDeLatLng(center) {
    const [lat, lng] = gcoord.transform(
      [center.lat, center.lng],
      gcoord.WGS84,
      gcoord.GCJ02
    );
    return new LatLng(lat, lng);
  }

  _setZoomTransform(level, center, zoom) {
    super._setZoomTransform(level, this._toGaoDeLatLng(center), zoom);
  }

  _getTiledPixelBounds(center) {
    return super._getTiledPixelBounds(this._toGaoDeLatLng(center));
  }
}

/** 管理高德底图实例及图层切换。 */
export const useGaoDeMap = () => {
  const mapObj = shallowRef();

  /** 创建应用坐标转换的高德地图实例。 */
  const initMap = (mapDomId = 'map') => {
    // Leaflet 默认投影是 EPSG3857，与高德相同，无需替换 CRS。
    const map = new LeafletMap(mapDomId, {
      center: [32.0237855, 118.8075675],
      zoom: 11,
      minZoom: 7,
      maxZoom: 20
    });

    mapObj.value = map;
    return map;
  };

  /** 根据业务类型创建对应的高德瓦片图层。 */
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

    return new GaoDeTileLayer(layerObj[type].opts);
  };

  const curMapLayer = shallowRef();

  /** 移除旧底图并添加指定类型的新底图。 */
  const setGaoDeLayer = (type = '02') => {
    curMapLayer.value?.remove();
    curMapLayer.value = getGaoDeLayerByType(type);
    curMapLayer.value.addTo(mapObj.value);
  };

  return {
    initMap,
    setGaoDeLayer
  };
};
