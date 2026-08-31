import { LeafletMap, TileLayer } from 'leaflet';

export const useMap = () => {
  /**
   * 创建天地图示例。
   * @param {string|HTMLElement} mapDomId 地图容器 ID 或元素。
   * @returns {LeafletMap} 已初始化的 Leaflet 2.x 地图实例。
   */
  const initMap = (mapDomId = 'map') => {
    const map = new LeafletMap(mapDomId, {
      center: [32.0237855, 118.8075675],
      zoom: 11,
      minZoom: 6,
      maxZoom: 20
    });

    const mapType = 'vec';
    new TileLayer(
      'https://t{s}.tianditu.gov.cn/' +
        mapType +
        '_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' +
        mapType +
        '&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=b72aa81ac2b3cae941d1eb213499e15e',
      {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        crossOrigin: 'anonymous',
        attribution:
          '&copy; <a href="http://lbs.tianditu.gov.cn/home.html">天地图 GS(2022)3124号 - 甲测资字1100471</a>'
      }
    ).addTo(map);

    const mapLabelType = 'cva';
    new TileLayer(
      'https://t{s}.tianditu.gov.cn/' +
        mapLabelType +
        '_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' +
        mapLabelType +
        '&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=b72aa81ac2b3cae941d1eb213499e15e',
      {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        crossOrigin: 'anonymous'
      }
    ).addTo(map);

    return map;
  };

  return {
    initMap
  };
};
