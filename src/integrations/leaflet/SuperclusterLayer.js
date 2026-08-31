import Supercluster from 'supercluster';
import { DivIcon, Icon, Layer, LayerGroup, Marker } from 'leaflet';

/** 使用 Supercluster 为 Leaflet 2 提供无全局依赖的点聚合图层。 */
export class SuperclusterLayer extends Layer {
  initialize(points = [], options = {}) {
    this.options = { radius: 60, maxZoom: 18, ...options };
    this._index = new Supercluster(this.options).load(
      points.map(([lat, lng], index) => ({
        type: 'Feature',
        properties: { pointId: index },
        geometry: { type: 'Point', coordinates: [lng, lat] }
      }))
    );
  }

  onAdd(map) {
    this._map = map;
    this._markers = new LayerGroup().addTo(map);
    map.on('moveend zoomend', this._refresh, this);
    this._refresh();
  }

  onRemove(map) {
    map.off('moveend zoomend', this._refresh, this);
    this._markers.remove();
    this._map = null;
  }

  /** 根据当前地图范围查询聚合结果并创建 Leaflet 2 Marker。 */
  _refresh() {
    const bounds = this._map.getBounds();
    const zoom = Math.round(this._map.getZoom());
    const features = this._index.getClusters(
      [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth()
      ],
      zoom
    );

    this._markers.clearLayers();
    for (const feature of features) {
      const [lng, lat] = feature.geometry.coordinates;
      if (feature.properties.cluster) {
        const count = feature.properties.point_count;
        const icon = new DivIcon({
          className: 'supercluster-marker',
          html: `<span>${count}</span>`,
          iconSize: [42, 42]
        });
        const marker = new Marker([lat, lng], { icon });
        marker.on('click', () => {
          const nextZoom = this._index.getClusterExpansionZoom(
            feature.properties.cluster_id
          );
          this._map.setView(
            [lat, lng],
            Math.min(nextZoom, this._map.getMaxZoom())
          );
        });
        this._markers.addLayer(marker);
        continue;
      }

      const icon = new Icon({ iconUrl: '/logo.png', iconSize: [30, 30] });
      this._markers.addLayer(new Marker([lat, lng], { icon }));
    }
  }
}
