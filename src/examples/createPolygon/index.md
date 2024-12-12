<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# Polygon 多边形

使用 leaflet、vue 创建多边形。

## 示例

<ClientDemo></ClientDemo>

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::

## 配置参考

[Polygon 多边形](https://leafletjs.cn/reference.html#polygon)
