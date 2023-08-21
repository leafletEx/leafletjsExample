// 点
export const geoJsonPoint = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [118.76741, 32.04154]
      },
      properties: {
        name: '南京',
        category: 'Transportation',
        color: ''
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [118.75741, 32.09154]
      },
      properties: {
        name: '南京',
        category: 'Transportation',
        color: ''
      }
    }
  ]
};

// 线
export const geoJsonLine = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [118.80029, 32.05521],
          [118.82268, 32.06092],
          [118.82268, 32.09092]
        ]
      },
      properties: {
        name: '南京',
        category: 'Recreation',
        color: 'blue'
      }
    }
  ]
};

// 面 即多边形
export const geoJsonPolygon = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [118.83009, 32.08463],
            [118.84277, 32.06542],
            [118.85924, 32.07705],
            [118.84895, 32.09283],
            [118.83009, 32.08463]
          ]
        ]
      },
      properties: {
        name: '面数据',
        category: 'Park',
        color: 'red'
      }
    }
  ]
};
