import { DomUtil, LatLng, Layer, Point } from 'leaflet';

const VERTEX_SHADER = `
  attribute vec3 a_point;
  uniform float u_size;
  varying float v_intensity;

  void main() {
    gl_Position = vec4(a_point.xy, 0.0, 1.0);
    gl_PointSize = u_size * (0.5 + a_point.z);
    v_intensity = a_point.z;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying float v_intensity;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    float strength = (1.0 - distanceToCenter * 2.0) * clamp(v_intensity, 0.0, 1.0);
    vec3 color = mix(vec3(0.0, 0.35, 1.0), vec3(1.0, 0.1, 0.0), strength);
    gl_FragColor = vec4(color, strength * 0.75);
  }
`;

/** 使用原生 WebGL point sprite 实现的 Leaflet 2 热力图层。 */
export class WebGLHeatLayer extends Layer {
  initialize(points = [], options = {}) {
    this._points = points;
    this.options = { size: 80, ...options };
  }

  onAdd(map) {
    this._map = map;
    this._canvas = DomUtil.create('canvas', 'leaflet-webgl-heat-layer');
    this._canvas.style.pointerEvents = 'none';
    map.getPanes().overlayPane.appendChild(this._canvas);
    this._gl = this._canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false
    });
    if (!this._gl) throw new Error('当前浏览器不支持 WebGL');
    this._initializeProgram();
    map.on('moveend zoomend resize', this._draw, this);
    this._draw();
  }

  onRemove(map) {
    map.off('moveend zoomend resize', this._draw, this);
    this._gl.deleteBuffer(this._buffer);
    this._gl.deleteProgram(this._program);
    this._canvas.remove();
    this._map = null;
  }

  /** 编译并链接热力点所需的 WebGL 着色器。 */
  _initializeProgram() {
    const gl = this._gl;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    this._program = gl.createProgram();
    gl.attachShader(this._program, compile(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(
      this._program,
      compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    );
    gl.linkProgram(this._program);
    if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(this._program));
    }
    this._buffer = gl.createBuffer();
  }

  /** 将经纬度投影为裁剪空间坐标并绘制 WebGL 点精灵。 */
  _draw() {
    if (!this._map) return;

    const gl = this._gl;
    const size = this._map.getSize();
    const pixelRatio = window.devicePixelRatio || 1;
    this._canvas.width = Math.round(size.x * pixelRatio);
    this._canvas.height = Math.round(size.y * pixelRatio);
    this._canvas.style.width = `${size.x}px`;
    this._canvas.style.height = `${size.y}px`;
    DomUtil.setPosition(
      this._canvas,
      this._map.containerPointToLayerPoint(new Point(0, 0))
    );

    const vertices = this._points.flatMap(([lat, lng, intensity = 1]) => {
      const point = this._map.latLngToContainerPoint(new LatLng(lat, lng));
      return [
        (point.x / size.x) * 2 - 1,
        1 - (point.y / size.y) * 2,
        intensity
      ];
    });

    gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.useProgram(this._program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    const pointLocation = gl.getAttribLocation(this._program, 'a_point');
    gl.enableVertexAttribArray(pointLocation);
    gl.vertexAttribPointer(pointLocation, 3, gl.FLOAT, false, 0, 0);
    gl.uniform1f(
      gl.getUniformLocation(this._program, 'u_size'),
      this.options.size * pixelRatio
    );
    gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
  }
}
