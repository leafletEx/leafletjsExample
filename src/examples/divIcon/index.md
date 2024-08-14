<script setup>
import demo from './index.vue'
</script>

# 使用 div 自定义 icon 的样式

使用 DivIcon 可以更加灵活的自定义 icon 样式。

但大批量使用 DivIcon 可能会导致性能问题，所以需要在使用时注意。

## 示例

<demo></demo>

## 代码实现

::: code-group

<<< ./index.vue

<<< @/components/InitMapTianditu.vue
:::

## 配置参考

+ [官网 marker 文档](https://leafletjs.cn/reference.html#marker)
+ [官网 DivIcon 文档](https://leafletjs.cn/reference.html#divicon)
+ [官网 popup 文档](https://leafletjs.cn/reference.html#popup)