# 贡献者指南

很高兴你有兴趣为 leafletjsExample 做出贡献。在提交贡献前，请阅读以下说明。

## 参与开发

1. Fork 仓库并克隆到本地。
2. 在项目根目录运行 `pnpm install` 安装依赖。
3. 运行 `pnpm docs:dev` 启动文档站点。
4. 使用浏览器访问终端显示的本地地址。

```shell
git clone git@github.com:username/leafletjsExample.git
cd leafletjsExample
git remote add upstream git@github.com:leafletjsExample/leafletjsExample.git
pnpm install
pnpm docs:dev
```

## Leaflet 2 约定

- 使用 ESM 具名导入和类构造器，不使用全局 `L`。
- Leaflet 样式统一由 `.vitepress/theme/index.js` 引入。
- 插件必须明确支持 Leaflet 2；依赖 `window.L` 或修改 `L.*` 的 1.x 插件不能直接接入。
- 浏览器专用示例通过 VitePress 的 `defineClientComponent` 加载，避免在 SSR 阶段访问 DOM。
- Node.js 版本要求以仓库的 `package.json` 为准。
