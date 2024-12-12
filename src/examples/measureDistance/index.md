<script setup>
import { defineClientComponent } from 'vitepress'
const ClientDemo = defineClientComponent(() => import('./index.vue'))
</script>

# leaflet-ruler  测距

使用 leaflet 、leaflet-ruler 、vue 实现测距功能。

## 示例

<ClientDemo></ClientDemo>

## 安装依赖

```shell
pnpm i leaflet-ruler
```

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::

