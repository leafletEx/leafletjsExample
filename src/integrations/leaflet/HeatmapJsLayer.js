import heatmap from '@mars3d/heatmap.js';
import { DomUtil, LatLng, Layer, Point } from 'leaflet';

/**
 * heatmap.js 与 Leaflet 2 的轻量适配层。
 * 数据在每次视口变化后重新投影，并可按当前视口计算局部最大值。
 */
export class HeatmapJsLayer extends Layer {
  initialize(config = {}) {
    this._config = config;
    this._data = [];
  }

  onAdd(map) {
    this._map = map;
    this._container = DomUtil.create('div', 'leaflet-heatmapjs-layer');
    Object.assign(this._container.style, {
      position: 'absolute',
      pointerEvents: 'none'
    });
    map.getPanes().overlayPane.appendChild(this._container);
    map.on('moveend zoomend resize', this._redraw, this);
    this._redraw();
  }

  onRemove(map) {
    map.off('moveend zoomend resize', this._redraw, this);
    this._container.remove();
    this._map = null;
    this._heatmap = null;
  }

  /** 保存 heatmap.js 数据并触发视口投影。 */
  setData(data) {
    this._data = data?.data ?? [];
    this._globalMax = data?.max;
    this._redraw();
    return this;
  }

  /** 把业务字段映射为 heatmap.js 需要的像素点。 */
  _redraw() {
    if (!this._map) return;

    const size = this._map.getSize();
    if (size.x === 0 || size.y === 0) return;

    this._container.style.width = `${size.x}px`;
    this._container.style.height = `${size.y}px`;
    if (this._width !== size.x || this._height !== size.y) {
      // heatmap.js 会在创建时读取容器尺寸；尺寸变化时重建内部画布。
      this._container.replaceChildren();
      this._heatmap = heatmap.create({
        container: this._container,
        radius: this._config.radius ?? 30,
        maxOpacity: this._config.maxOpacity ?? 0.8
      });
      this._width = size.x;
      this._height = size.y;
    }
    DomUtil.setPosition(
      this._container,
      this._map.containerPointToLayerPoint(new Point(0, 0))
    );

    const latField = this._config.latField ?? 'lat';
    const lngField = this._config.lngField ?? 'lng';
    const valueField = this._config.valueField ?? 'value';
    const projected = this._data
      .map((item) => {
        const point = this._map.latLngToContainerPoint(
          new LatLng(item[latField], item[lngField])
        );
        return {
          x: Math.round(point.x),
          y: Math.round(point.y),
          value: item[valueField]
        };
      })
      .filter(
        (item) =>
          item.x >= 0 && item.y >= 0 && item.x <= size.x && item.y <= size.y
      );

    const localMax = projected.reduce(
      (max, item) => Math.max(max, item.value),
      0
    );
    this._heatmap.setData({
      max: this._config.useLocalExtrema
        ? localMax || 1
        : (this._globalMax ?? localMax) || 1,
      data: projected
    });
  }
}
