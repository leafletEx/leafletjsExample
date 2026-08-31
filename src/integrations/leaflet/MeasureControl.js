import {
  CircleMarker,
  Control,
  DomEvent,
  DomUtil,
  LayerGroup,
  Polyline
} from 'leaflet';

/** 使用 Leaflet 2 核心图层实现的交互式测距控件。 */
export class MeasureControl extends Control {
  onAdd(map) {
    this._map = map;
    this._points = [];
    this._layers = new LayerGroup().addTo(map);
    this._container = DomUtil.create(
      'div',
      'leaflet-bar leaflet-measure-control'
    );
    this._button = DomUtil.create(
      'a',
      'leaflet-measure-button',
      this._container
    );
    this._button.href = '#';
    this._button.title = '开始测距';
    this._button.setAttribute('role', 'button');
    this._button.textContent = '↔';
    DomEvent.disableClickPropagation(this._container);
    DomEvent.on(this._button, 'click', this._toggle, this);
    return this._container;
  }

  onRemove() {
    this._stop();
    this._layers.remove();
  }

  /** 在开始和完成测距之间切换。 */
  _toggle(event) {
    DomEvent.preventDefault(event);
    if (this._active) {
      this._stop();
      return;
    }
    this._start();
  }

  /** 清空旧结果并监听地图点击、移动和双击事件。 */
  _start() {
    this._layers.clearLayers();
    this._points = [];
    this._polyline = null;
    this._active = true;
    this._button.title = '完成测距';
    this._button.classList.add('is-active');
    this._map.getContainer().style.cursor = 'crosshair';
    this._map.doubleClickZoom.disable();
    this._map.on('click', this._handleClick, this);
    this._map.on('mousemove', this._handleMove, this);
    this._map.on('dblclick', this._stop, this);
  }

  /** 停止交互并保留已经绘制的测距结果。 */
  _stop() {
    if (!this._map || !this._active) return;
    this._active = false;
    this._button.title = '开始测距';
    this._button.classList.remove('is-active');
    this._map.getContainer().style.cursor = '';
    this._map.doubleClickZoom.enable();
    this._map.off('click', this._handleClick, this);
    this._map.off('mousemove', this._handleMove, this);
    this._map.off('dblclick', this._stop, this);
    this._temporaryLine?.remove();
    this._temporaryLine = null;
  }

  /** 添加测量点，并更新总距离提示。 */
  _handleClick(event) {
    this._points.push(event.latlng);
    new CircleMarker(event.latlng, {
      color: '#8ab4f8',
      fillColor: '#8ab4f8',
      fillOpacity: 1,
      radius: 4
    }).addTo(this._layers);

    if (!this._polyline) {
      this._polyline = new Polyline(this._points, {
        color: '#8ab4f8',
        weight: 2
      });
      this._layers.addLayer(this._polyline);
    } else {
      this._polyline.setLatLngs(this._points);
    }

    const distance = this._points.slice(1).reduce((total, point, index) => {
      return total + this._map.distance(this._points[index], point);
    }, 0);
    const latestPoint = this._layers.getLayers().at(-1);
    latestPoint.bindTooltip(`距离：${(distance / 1000).toFixed(2)} km`, {
      permanent: true,
      direction: 'top'
    });
  }

  /** 在最后一个测量点和鼠标位置之间绘制预览线。 */
  _handleMove(event) {
    if (this._points.length === 0) return;
    const latLngs = [this._points.at(-1), event.latlng];
    if (!this._temporaryLine) {
      this._temporaryLine = new Polyline(latLngs, {
        color: '#8ab4f8',
        dashArray: '4,4',
        weight: 2
      }).addTo(this._map);
      return;
    }
    this._temporaryLine.setLatLngs(latLngs);
  }
}
