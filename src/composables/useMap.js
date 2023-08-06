/**
 * todo 项目使用请放开 leaflet 引入，这里注释是因为：
 * 直接引入 leaflet 打包会抛出 window is not undefined,因为 vitePress 打包是在node环境运行。
 * 所以在 vitePress 配置了自动加载。
 */
// import L from 'leaflet';

export const useMap = () => {
  const initMap = (mapDomId = 'map') => {
    const map = L.map(mapDomId, {
      center: [32.0237855, 118.8075675],
      zoom: 11,
      minZoom: 6,
      maxZoom: 20
    });

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
    ).addTo(map);

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
    ).addTo(map);

    return map;
  };

  return {
    initMap
  };
};
