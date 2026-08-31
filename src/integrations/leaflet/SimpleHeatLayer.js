import simpleheat from 'simpleheat';
import { DomUtil, LatLng, Layer, Point } from 'leaflet';

/**
 * 使用 simpleheat 渲染的 Leaflet 2 Canvas 图层。
 * 该适配层只依赖 Leaflet 2 的具名 ESM 导出，不修改任何全局命名空间。
 */
export class SimpleHeatLayer extends Layer {
  initialize(points = [], options = {}) {
    this._points = points;
    this.options = {
      minOpacity: 0.25,
      max: 1,
      radius: 40,
      blur: 15,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' },
      ...options
    };
  }

  onAdd(map) {
    this._map = map;
    this._canvas = DomUtil.create('canvas', 'leaflet-simpleheat-layer');
    this._canvas.style.pointerEvents = 'none';
    map.getPanes().overlayPane.appendChild(this._canvas);
    this._heat = simpleheat(this._canvas);
    map.on('moveend zoomend resize', this._redraw, this);
    this._redraw();
  }

  onRemove(map) {
    map.off('moveend zoomend resize', this._redraw, this);
    this._canvas.remove();
    this._map = null;
    this._heat = null;
  }

  /** 替换热力点数据并立即重绘。 */
  setData(points) {
    this._points = points;
    this._redraw();
    return this;
  }

  /** 将经纬度数据转换为当前视口中的 Canvas 像素。 */
  _redraw() {
    if (!this._map) return;

    const size = this._map.getSize();
    this._canvas.width = size.x;
    this._canvas.height = size.y;
    DomUtil.setPosition(
      this._canvas,
      this._map.containerPointToLayerPoint(new Point(0, 0))
    );

    const heatPoints = this._points.map((point) => {
      const latLng = Array.isArray(point)
        ? new LatLng(point[0], point[1])
        : new LatLng(point.lat, point.lng);
      const containerPoint = this._map.latLngToContainerPoint(latLng);
      const intensity = Array.isArray(point)
        ? (point[2] ?? 1)
        : (point.value ?? point.max ?? 1);
      return [containerPoint.x, containerPoint.y, intensity];
    });

    this._heat
      .data(heatPoints)
      .max(this.options.max)
      .radius(this.options.radius, this.options.blur)
      .gradient(this.options.gradient)
      .draw(this.options.minOpacity);
  }
}
