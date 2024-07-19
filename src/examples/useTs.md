# leaflet 与 ts 配合使用

## leaflet 增加 ts 类型

###  使用 `scrip`

在 `index.html` 中引入 `leaflet`

```html
<script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css">
```

安装 leaflet 的类型定义文件：

```shell
npm i @types/leaflet
```

在 `types/global.d.ts` (这个文件需要包含在 tsconfig.jso 的 include 中) 增加全局声明

```ts
declare var  L: typeof import('leaflet');
```

or

```ts
import * as L from 'leaflet';

declare global {
  namespace L {
  }
}
```

###  使用 npm

使用 pnpm 安装 Leaflet，则只需安装类型定义文件即可获得TypeScript的类型提示：

```shell
pnpm i leaflet

pnpm i @types/leaflet
```

## 为插件增加 ts 类型

我们以 `Leaflet.hotline` 这个插件为例

### 通过 `script` 的方式引入

在`<script>`标签中引入 `Leaflet.hotline` 插件

```html
<script src="https://cdn.jsdelivr.net/npm/leaflet-hotline@0.4.0/dist/leaflet.hotline.min.js"></script>
```

在 `types/global.d.ts` 文件中写入如下内容

```ts
// 引入 leaflet 的类型声明
import * as L from 'leaflet';

// 确保全局范围内 L 命名空间存在
declare global {
  namespace L {
    // 为 leaflet-hotline 插件定义 Hotline 命名空间
    namespace Hotline {
      // 定义 HotlineOptions 接口，扩展自 L.PathOptions
      interface HotlineOptions extends L.PathOptions {
        // 线条的宽度
        weight?: number;
        // 线条轮廓的宽度
        outlineWidth?: number;
        // 线条轮廓的颜色
        outlineColor?: string;
        // 颜色调色板，映射值到颜色
        palette?: Record<number, string>;
        // 最小值，定义颜色调色板的起点
        min?: number;
        // 最大值，定义颜色调色板的终点
        max?: number;
      }

      // 定义 Hotline 接口，扩展自 L.Layer
      interface Hotline extends L.Layer {
        // 设置经纬度数组的方法
        setLatLngs(latlngs: L.LatLngExpression[]): this;
        // 获取经纬度数组的方法
        getLatLngs(): L.LatLng[];
      }
    }

    // 定义创建 Hotline 实例的方法
    function hotline(
      latlngs: L.LatLngExpression[], // 经纬度数组
      options?: Hotline.HotlineOptions // 可选的 HotlineOptions 参数
    ): Hotline.Hotline; // 返回 Hotline 实例
  }
}
```

### 通过 npm 的方式引入

使用 pnpm 安装 Leaflet.hotline 插件：

```shell
pnpm install leaflet-hotline
```

可以参考已有具有TypeScript类型定义的插件如 [@types/leaflet.markercluster](https://www.npmjs.com/package/@types/leaflet.markercluster?activeTab=code)

在 `types/global.d.ts` 文件中写入如下内容

```ts
import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Hotline {
    interface HotlineOptions extends L.PathOptions {
      weight?: number;
      outlineWidth?: number;
      outlineColor?: string;
      palette?: Record<number, string>;
      min?: number;
      max?: number;
    }

    interface Hotline extends L.Layer {
      setLatLngs(latlngs: L.LatLngExpression[]): this;
      getLatLngs(): L.LatLng[];
    }
  }

  function hotline(latlngs: L.LatLngExpression[], options?: Hotline.HotlineOptions): Hotline.Hotline;
}
```



