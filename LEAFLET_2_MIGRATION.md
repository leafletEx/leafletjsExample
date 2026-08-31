# Leaflet 2.0 预览版迁移记录

## 1. 文档目的

本文档记录 `leafletjsExample` 尝试从 Leaflet 1.x 升级到 Leaflet 2.0 预览版的完整验证过程，包括升级背景、依赖调整、ESM 改造、第三方插件兼容性、各文档 Demo 的临时迁移方式、验证结果和最终项目决策。

本文档独立保存在仓库根目录，不加入 VitePress 导航和站点内容。

## 2. 迁移信息

| 项目     | 内容                                                                     |
| -------- | ------------------------------------------------------------------------ |
| 基线分支 | 本地 `dev` 分支                                                          |
| 开发分支 | `codex/leaflet-2-preview`                                                |
| 目标版本 | `leaflet@2.0.0-alpha.1`                                                  |
| 包管理器 | pnpm                                                                     |
| 迁移日期 | 2026-08-31                                                               |
| 迁移范围 | Leaflet 初始化、图层、控件、第三方集成、全部示例页面、示例文档和构建配置 |

本次尝试不是只替换 Leaflet 版本号，而是对仓库内所有 Leaflet 相关代码进行一次完整审查。验证改动涉及 47 个已跟踪文件，并新增 5 个 Leaflet 2 本地适配层原型文件；同时删除 2 个旧的 public 插件脚本。

## 最终结论与项目决策

> 本次工作是基于 `leaflet@2.0.0-alpha.1` 的可行性验证，不是可以直接投入正式使用的 Leaflet 2 升级结果。

经过对全部示例和依赖的审查，可以确认：Leaflet 2 已经转向 ESM，并改变了插件注册方式、部分 API 和内部实现；当前 Leaflet 生态中的大部分 1.x 插件不能在 2.x 中直接运行。仅升级 Leaflet 版本号或移除少量兼容代码，无法完成项目的正式升级。

本次为了验证文档 Demo 而编写的热力图、聚合、绘制、测距和轨迹等本地实现，只用于证明相关功能可以基于 Leaflet 2 核心 API 重新实现。它们是验证原型，不应被视为已经完成的新插件库，也不保证覆盖旧插件的全部功能、性能、配置项和边界场景。

项目最终决策如下：

1. 当前阶段不把本分支作为 Leaflet 2 的正式生产升级方案发布。
2. 等待 Leaflet 2.x 正式发布并稳定公共 API、类型定义和插件接口。
3. 正式版发布后，重新审查核心 API 和仍可使用的第三方依赖，不直接沿用 alpha 阶段的内部 API 假设。
4. 针对现有示例所依赖的热力图、聚合、绘制编辑、截图、渐变线、测距和轨迹播放能力，规划并重新开发面向 Leaflet 2.x 的新集成库。
5. 新库需要明确模块边界、公开 API、类型定义、功能覆盖、测试策略、性能要求和浏览器兼容范围，再逐步替换当前 Leaflet 1.x 插件体系。

因此，本次工作的最终产出是确认 Leaflet 2 的迁移方向、识别现有插件大面积不兼容的事实，并形成正式版发布后的重新开发范围；不是宣布现有库已经完成 Leaflet 2 兼容。

## 3. 迁移目标

本次技术验证需要达到以下结果：

1. 使用 Leaflet 2.0 预览版提供的 ESM 导出，不再依赖全局 `L` 对象。
2. 删除 VitePress 中为 Leaflet 1.9.4 添加的 CDN 样式和特殊加载逻辑。
3. 审查所有 Leaflet 插件，确认哪些插件可以运行，以及哪些插件依赖 Leaflet 1.x 内部实现或全局命名空间。
4. 为无法直接升级的功能编写最小验证原型，确认后续重新开发的技术可行性和工作范围。
5. 所有文档路由能够正常加载，浏览器控制台不产生 error。
6. 文档站点能够完成客户端、服务端和页面静态渲染构建。

## 4. 依赖调整

### 4.1 核心依赖升级

| 依赖                    | 迁移前    | 迁移后          | 说明                                                       |
| ----------------------- | --------- | --------------- | ---------------------------------------------------------- |
| `leaflet`               | `^1.9.4`  | `2.0.0-alpha.1` | 固定到本次验证过的预览版本，避免 alpha 版本自动漂移        |
| `leaflet.locatecontrol` | `^0.90.0` | `^0.90.1`       | 使用声明支持 Leaflet 2 alpha 的版本                        |
| `inquirer`              | `8`       | `^9.3.7`        | 满足 `@commitlint/cz-commitlint@21.2.0` 的 peer dependency |

`leaflet.fullscreen@^5.3.3` 保留。该版本提供具名 ESM 导出，并在当前 Leaflet 2 预览版下通过了页面加载和全屏交互验证。

### 4.2 新增依赖

| 依赖                       | 用途                                 |
| -------------------------- | ------------------------------------ |
| `@mars3d/heatmap.js@2.0.7` | 提供兼容严格模式的 heatmap.js 实现   |
| `simpleheat@^0.4.0`        | 作为 Canvas 热力图的底层绘制引擎     |
| `supercluster@^9.0.0`      | 为点聚合 Demo 提供空间索引和聚合计算 |
| `html-to-image@^1.11.13`   | 将 Leaflet 地图 DOM 渲染为 PNG       |

### 4.3 本次验证中删除的不兼容依赖

| 删除依赖                         | 删除原因                      | 本次验证使用的临时方案                                                                      |
| -------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| `@geoman-io/leaflet-geoman-free` | 依赖 Leaflet 1.x 插件注册方式 | 使用 Leaflet 2 `Marker`、`Polyline`、`Polygon` 和地图事件实现当前 Demo 所需的绘制与顶点编辑 |
| `leaflet-hotline`                | 通过全局 `L` 注册并依赖旧 API | 将轨迹拆分为连续 `Polyline`，按每段强度计算颜色                                             |
| `leaflet-image`                  | 依赖 Leaflet 1.x 内部图层结构 | 使用 `html-to-image` 和 `file-saver` 导出地图 DOM                                           |
| `leaflet-ruler`                  | 只声明支持 Leaflet 1.x        | 新增基于 Leaflet 2 `Control` 的本地测距控件                                                 |
| `leaflet-trackplayer`            | 依赖 Leaflet 1.x              | 使用 `Marker`、`Polyline` 和计时器实现基础轨迹播放                                          |
| `leaflet-webgl-heatmap`          | 通过全局 `L` 注册             | 新增原生 WebGL point sprite 图层                                                            |
| `leaflet.heat`                   | 修改 Leaflet 全局命名空间     | 使用 `simpleheat` 和本地 `Layer` 适配器                                                     |
| `leaflet.markercluster`          | 当前版本以 Leaflet 1.x 为目标 | 使用 `supercluster` 和 Leaflet 2 Marker 图层组                                              |
| `screenfull`                     | 当前全屏示例不再需要额外包装  | 统一使用 `leaflet.fullscreen` 的伪全屏能力                                                  |

### 4.4 锁文件和 peer dependency

所有依赖变更都通过 pnpm 执行并同步到 `pnpm-lock.yaml`。完成 `inquirer` 升级后，`pnpm peers check` 输出：

```text
No peer dependency issues found
```

## 5. Leaflet 2 ESM 改造

### 5.1 移除全局 Leaflet 入口

运行时代码不再使用以下模式：

```js
import L from 'leaflet';
L.map(...);
L.tileLayer(...);
window.L = L;
```

所有示例改为按需导入 Leaflet 2 的具名导出，并直接使用构造器：

```js
import { LeafletMap, Marker, Polygon, TileLayer } from 'leaflet';
```

对应的工厂调用分别改为 `new LeafletMap()`、`new Marker()`、`new Polygon()` 和 `new TileLayer()`。静态搜索只保留文档中对旧 `window.L` 和 `L.*` 模式的历史说明，不再存在依赖全局 `L` 的运行时代码。

### 5.2 样式加载

Leaflet 样式改为在 VitePress 主题入口中直接导入：

```js
import 'leaflet/dist/leaflet.css';
```

同时删除 `.vitepress/config/head.js` 中 Leaflet 1.9.4 的 CDN `<link>`，避免本地 Leaflet 2 JavaScript 与远程 Leaflet 1.x CSS 混用。

### 5.3 Vue 响应式边界

Leaflet 的 Map、Layer、Marker 和 Control 实例由 Leaflet 自己维护内部状态，不适合被 Vue 深层代理。共享组件和相关 Demo 中用于保存 Leaflet 实例的 `ref`、`reactive` 已改为 `shallowRef` 或 `shallowReactive`。

DOM 容器引用仍使用普通 `ref`。这一边界可以避免 Vue 递归代理 Leaflet 私有对象，同时保留实例替换时的响应式通知。

### 5.4 地图生命周期

`InitMap.vue` 和 `InitMapTianditu.vue` 改为使用 `LeafletMap` 构造器，并继续在组件卸载时调用 `map.remove()`，释放 Leaflet 注册的 DOM 和地图事件。

天地图瓦片图层增加 `crossOrigin: 'anonymous'`，用于截图导出场景读取瓦片画布；是否能够成功导出仍取决于实际瓦片服务返回的 CORS 响应头。

## 6. 高德地图适配

`useGaoDeMap.js` 不再通过 `L.TileLayer.extend` 或全局命名空间创建插件式子类，而是定义原生 ES class：

- `GaoDeTileLayer extends TileLayer`。
- 使用 `super.initialize()` 初始化 URL 模板和参数。
- 覆盖 `_setZoomTransform()` 和 `_getTiledPixelBounds()`，在瓦片计算前执行 WGS84 到 GCJ-02 的坐标转换。
- Leaflet 2 已移除旧的 `Util.extend` 用法，调用方配置改为对象展开合并。
- 当前地图和底图实例使用 `shallowRef` 保存。
- 切换底图时先移除旧图层，再添加目标图层。

高德图层列表、独立高德地图 Demo 和共享 composable 均完成了 Leaflet 2 构造器迁移。

## 7. 用于验证的本地 Leaflet 2 适配层原型

新增目录 `src/integrations/leaflet/`，只存放当前示例验证需要的轻量 Leaflet 2 原型，不创建通用插件框架。这些文件用于验证实现路径，不代表正式新库的 API 设计。

### 7.1 `SimpleHeatLayer`

- 继承 Leaflet 2 `Layer`。
- 在 `overlayPane` 中创建 Canvas。
- 使用 `simpleheat` 绘制热力点。
- 在 `moveend`、`zoomend` 和 `resize` 后重新投影经纬度和重绘。
- 支持强度、半径、模糊范围、透明度和渐变配置。
- 删除图层时解除地图事件并移除 Canvas。

### 7.2 `HeatmapJsLayer`

- 继承 Leaflet 2 `Layer`。
- 使用 `@mars3d/heatmap.js`，避免旧 heatmap.js 在严格模式下写入只读 `ImageData.data` 的问题。
- 根据地图容器实际尺寸创建热力图实例。
- 容器尺寸变化时重建内部 Canvas，避免首次初始化得到零尺寸画布。
- 将业务数据中的经纬度和权重字段投影为 heatmap.js 像素数据。
- 支持当前视口局部最大值和全局最大值两种计算方式。

### 7.3 `WebGLHeatLayer`

- 继承 Leaflet 2 `Layer`。
- 使用原生 WebGL 顶点着色器和片元着色器渲染 point sprite。
- 按设备像素比设置 Canvas 实际尺寸。
- 将经纬度投影为 WebGL 裁剪空间坐标。
- 使用加法混合叠加热力强度。
- 图层移除时释放 buffer、program、Canvas 和地图事件。

### 7.4 `SuperclusterLayer`

- 使用 `supercluster` 建立点数据空间索引。
- 根据当前地图 Bounds 和 Zoom 获取聚合结果。
- 聚合点使用 `DivIcon` 显示数量，普通点使用 Leaflet `Marker`。
- 点击聚合点后使用 `getClusterExpansionZoom()` 展开聚合。
- 地图移动和缩放结束后刷新当前视口的 Marker 图层组。

### 7.5 `MeasureControl`

- 继承 Leaflet 2 `Control`。
- 使用地图点击添加测量点，并使用 `Polyline` 连接。
- 使用 `map.distance()` 累加地理距离。
- 每个测量点通过永久 Tooltip 展示累计公里数。
- 鼠标移动时显示最后一个测量点到光标位置的临时虚线。
- 开始测量时禁用双击缩放，结束后恢复默认交互。
- 停止测量后保留已经绘制的结果。

## 8. 各示例迁移说明

### 8.1 基础示例

| 示例           | 主要变更                                                                              |
| -------------- | ------------------------------------------------------------------------------------- |
| 初始化地图     | 使用 `LeafletMap` 构造器；共享地图实例改为 `shallowRef`                               |
| Marker 标记    | 使用 `Marker`、`Icon` 和 `LayerGroup` 构造器；清理旧工厂调用                          |
| DivIcon        | 使用 `DivIcon` 构造器；public 图片改为 `/markerCustom/...` 根路径，消除 Vite 资源警告 |
| Polygon 多边形 | 使用 `Polygon` 构造器                                                                 |
| GeoJSON        | 使用 Leaflet 2 `GeoJSON` 构造器                                                       |
| 点是否在面内   | 使用 Leaflet 2 Marker、Polygon 和 Turf 判断；点击后正常显示点位与结果 Popup           |

### 8.2 图层示例

- OpenStreetMap、ArcGIS 和高德图层全部改为 `new TileLayer()`。
- 图层配置对象改为浅层响应式对象，避免深层代理 TileLayer。
- 当前地图和当前图层都使用 `shallowRef`。
- 高德影像和电子地图切换通过实际浏览器交互完成验证。
- ArcGIS 页面保留原有服务可用性提示，本次只迁移 Leaflet 调用方式。

### 8.3 控件示例

#### 全屏

- 直接导入 `leaflet.fullscreen` 的 `FullScreen` 构造器和 CSS。
- 保留控件按钮和页面外部按钮两种触发方式。
- 使用伪全屏模式，避免 E2E 依赖操作系统原生全屏权限。
- 监听 `enterFullscreen`、`exitFullscreen` 同步按钮状态。

#### 定位

- 直接导入 `LocateControl` 和插件 CSS。
- 使用 `new LocateControl().addTo(map)`。
- 已验证控件能够加载；没有在自动验证中替用户授予真实地理位置权限。

### 8.4 热力图示例

| 示例              | 迁移方案                                |
| ----------------- | --------------------------------------- |
| Canvas 热力图     | `simpleheat` + `SimpleHeatLayer`        |
| heatmap.js 热力图 | `@mars3d/heatmap.js` + `HeatmapJsLayer` |
| WebGL 热力图      | 原生 WebGL + `WebGLHeatLayer`           |

三个热力图示例都不再修改 Leaflet 命名空间，能够跟随地图移动、缩放和容器尺寸变化重绘。

### 8.5 点聚合

原 `leaflet.markercluster` 替换为 `SuperclusterLayer`。页面已验证能够显示数量为 2 和 5 的聚合点；点击聚合点后地图缩放级别和 Marker 数量按预期变化。

### 8.6 图形绘制与编辑

当前 Demo 所需能力使用 Leaflet 2 核心 API 重写：

- 点击地图添加顶点。
- 两个顶点显示折线，三个及以上顶点显示多边形。
- 顶点 Marker 可以拖动，拖动时同步更新图形。
- 支持完成绘制和清除所有结果。
- 进入绘制时使用十字光标并禁用双击缩放，结束后恢复。

该实现只覆盖当前示例展示的单图形绘制与顶点编辑，不等价于 Geoman 的完整工具集。

### 8.7 截图导出

- 使用 `html-to-image.toPng()` 渲染 Leaflet 地图容器。
- 使用 `file-saver` 触发 PNG 下载。
- 增加生成中、成功和失败状态文本。
- 设置 `skipFonts: true`，避免 VitePress 远程 Google Fonts 样式表因跨域无法读取而产生控制台 error。
- 天地图瓦片配置 `crossOrigin: 'anonymous'`。

浏览器交互验证结果为“图片已生成并开始下载”，并且控制台无 error。

### 8.8 渐变折线

- 删除 `leaflet-hotline`。
- 从 `/geojson/gulou.json` 读取 public 轨迹数据，避免从 JavaScript 直接 import public 文件产生 Vite 警告。
- 将相邻点拆分为独立 Polyline。
- 根据随机强度值计算 HSL 颜色。
- 使用 `FeatureGroup` 统一添加 155 段 SVG 折线。

### 8.9 测距

使用本地 `MeasureControl` 替代 `leaflet-ruler`。Chrome 交互验证中成功添加三个测量点、三条相关路径，并展示 `距离：0.00 km` 和 `距离：21.54 km` 等累计结果；停止后控件恢复“开始测距”状态。

### 8.10 轨迹回放

- 使用 `Polyline` 展示完整路线。
- 使用自定义 Icon Marker 表示车辆当前位置。
- 使用固定间隔计时器更新 Marker 坐标。
- 提供开始和暂停按钮。
- 组件卸载时停止计时器。

Chrome 交互验证确认 Marker 会移动，暂停后停止更新，继续后恢复移动。

## 9. 文档和 VitePress 配置

### 9.1 站点配置

- 删除 Leaflet 1.9.4 CDN CSS。
- 在主题入口加载本地 Leaflet 2 CSS。
- 侧边栏“插件”分组改为“集成示例”，反映其中部分能力已经由本地 Leaflet 2 适配层实现。
- `leaflet-heat` 页面名称调整为 Canvas 热力图，区分 heatmap.js 和 WebGL 实现。

### 9.2 示例文档

涉及第三方插件的页面同步更新了：

- 新依赖安装命令。
- Leaflet 2 ESM 代码实现。
- 旧插件不兼容原因。
- 本地适配方案和能力边界。
- 被引用的组件和源码文件。

`src/examples/index.md` 和 `src/CONTRIBUTING.md` 增加 Leaflet 2 插件接入约束：新插件必须明确支持 Leaflet 2，不能依赖 `window.L`、修改 `L.*` 命名空间或只面向 Leaflet 1.x。

### 9.3 TypeScript 说明

`useTs.md` 已根据当前 alpha 包的实际状态重写：

- Leaflet 2 alpha 包当前没有随包提供完整 `.d.ts`。
- `@types/leaflet` 主要面向 Leaflet 1.x，不应被描述为 Leaflet 2 的完整类型来源。
- 示例文档不再给出可能造成错误预期的 Leaflet 2 类型支持承诺。

## 10. 删除的历史文件

以下文件属于旧 heatmap.js 的 public 全局脚本加载方案，迁移到 ESM 依赖和本地适配层后已删除：

- `src/public/heatmapjs/heatmap.js`
- `src/public/heatmapjs/leaflet-heatmap.js`

删除后页面不再动态插入 script，也不再依赖 `HeatmapOverlay` 或其他全局变量。

## 11. 验证记录

### 11.1 文档构建

执行命令：

```shell
pnpm docs:build
```

最终结果：

```text
✓ building client + server bundles...
✓ rendering pages...
✓ generating sitemap...
build complete in 55.54s.
```

构建前置脚本会提示缺少 `GITHUB_API_TOKEN`。该提示来自贡献者数据生成逻辑，未阻止 VitePress 构建完成，与 Leaflet 2 迁移无关。

### 11.2 Chrome 全路由检查

使用 Chrome 对以下 21 个文档路由逐页加载，并检查一级标题、Leaflet 地图容器和浏览器 error 日志：

```text
/examples/
/examples/useTs
/examples/initMap/
/examples/marker/
/examples/divIcon/
/examples/createPolygon/
/examples/geoJson/
/examples/layers/
/examples/loadGaoDeMap/
/examples/fullscreen/
/examples/leaflet-locatecontrol/
/examples/webGLHeatMap/
/examples/leaflet-heat/
/examples/heatmapjs/
/examples/pointAggregation/
/examples/graphicsDrawingAndEditing/
/examples/exportPicture/
/examples/isPointInsidePolygon/
/examples/gradientPolyline/
/examples/measureDistance/
/examples/trackPlayer/
```

验证结果：

- 21/21 路由加载成功。
- 19 个包含 Demo 的页面均创建了 Leaflet 地图容器。
- `/examples/` 和 `/examples/useTs` 为说明页面，没有地图容器，符合预期。
- 所有路由的浏览器 error 日志数量均为 0。
- 图层列表页成功创建 4 个独立地图实例。

### 11.3 关键交互检查

| 场景           | 验证结果                                           |
| -------------- | -------------------------------------------------- |
| 初始化地图缩放 | 操作后瓦片缩放级别从 11 更新到 12                  |
| Marker 清除    | Marker 数量从 5 减少到仅保留基础图标               |
| 图层切换       | 高德影像和电子底图均成功加载对应瓦片               |
| 点聚合         | 点击聚合点后地图放大，聚合结果展开                 |
| 图形绘制       | 实际点击创建 3 个顶点和 1 个多边形，完成后结果保留 |
| 测距           | 实际点击创建测量路径和累计距离 Tooltip             |
| 点面判断       | 点击多边形后添加 Marker，并显示“在多边形内”        |
| 轨迹回放       | Marker 移动、暂停和继续行为正常                    |
| 全屏           | 能够进入伪全屏，并通过地图全屏控件退出             |
| 图片导出       | 页面报告生成并开始下载，控制台无 error             |
| 渐变折线       | 创建 155 段 SVG 路径，控制台无 error               |

定位控件没有执行真实定位操作，因为浏览器地理位置权限必须由用户在操作时明确授予。

### 11.4 静态检查

已执行并通过：

```shell
pnpm peers check
pnpm exec prettier --check <本次修改文件>
git diff --check
codegraph sync
codegraph status
```

CodeGraph 最终状态为：

```text
[OK] Index is up to date
```

## 12. 已知限制与维护注意事项

1. Leaflet `2.0.0-alpha.1` 仍是预览版本，后续 alpha、beta 或正式版可能继续调整导出名称、内部方法和插件接口。
2. `GaoDeTileLayer` 为了处理 GCJ-02 偏移覆盖了 `_setZoomTransform` 和 `_getTiledPixelBounds`。这两个方法带有内部实现性质，升级 Leaflet 版本时必须重点回归。
3. 本地热力图、聚合、绘制、测距和轨迹播放实现只覆盖现有 Demo 的目标能力，属于验证原型，不是原第三方插件的完整替代产品，也不应直接作为正式新库发布。
4. 截图结果依赖瓦片和图片资源允许跨域读取；第三方服务未提供正确 CORS 头时，浏览器仍可能阻止完整导出。
5. WebGL 热力图要求浏览器支持 WebGL；当前实现发现不支持时会抛出明确错误。
6. 定位功能依赖用户授权和运行环境的定位能力，本次自动验证没有覆盖权限允许、拒绝和定位失败分支。
7. Leaflet 2 alpha 的 TypeScript 类型仍不完整，后续版本发布后需要重新评估类型接入方案。
8. 当前大部分 Leaflet 1.x 插件不能在 Leaflet 2 中直接运行；不应通过重新设置 `window.L` 或继续依赖内部 API 强行恢复旧插件。
9. 在 Leaflet 2.x 正式发布前，不建议继续扩大 alpha 适配代码的功能范围，以免公共 API 变化造成重复开发。

## 13. 后续升级检查清单

Leaflet 2.x 正式发布并稳定 API 后，应启动新集成库的重新开发，而不是把当前原型直接转为正式实现。建议按以下顺序推进：

1. 重新阅读正式版发布说明、迁移指南、package exports 和类型定义。
2. 重新检查 `LeafletMap`、`TileLayer`、`Layer`、`Control` 等公共 API，不默认沿用 alpha 版本行为。
3. 重新评估 `leaflet.fullscreen`、`leaflet.locatecontrol` 及其他生态插件的正式版兼容状态。
4. 确定新集成库需要覆盖的热力图、聚合、绘制编辑、截图、渐变线、测距和轨迹播放模块。
5. 为新库定义稳定的公开 API、TypeScript 类型、错误处理、生命周期和资源释放约定。
6. 为每个模块补充单元测试、地图交互测试、性能基线和浏览器兼容验证。
7. 使用正式版重新实现或调整当前原型，避免依赖 Leaflet 私有方法；高德坐标适配需要单独评估。
8. 逐个迁移文档 Demo，并重新执行 `pnpm peers check` 和 `pnpm docs:build`。
9. 在 Chrome 中重新加载全部 21 个路由，验证热力图、聚合、绘制、截图、测距、全屏和轨迹播放交互。
10. 运行 `codegraph sync` 和 `codegraph status`，完成正式迁移审查后再决定发布。
