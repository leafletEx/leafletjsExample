# 贡献者指南

很高兴你有兴趣为 leafletjsExample 做出贡献。在提交你的贡献之前，请花点时间阅读以下指南：

## 参与开发

1. 点击 GitHub 右上角的 Fork 按钮，将仓库 Fork 仓库到个人空间
2. Clone 个人空间项目到本地：git clone git@github.com:vaebe/leafletjsExample.git
3. 在项目的根目录下运行pnpm i, 安装 node 依赖
4. 运行 pnpm dev，启动网站
5. 使用浏览器访问：http://localhost:5173/

```shell
# username 为用户名，执行前请替换
git clone git@github.com:username/leafletjsExample.git
cd leafletjsExample
git remote add upstream git@github.com:vaebe/leafletjsExample.git
pnpm i
pnpm dev
```

## 注意事项

+ leafletjs 中使用了 window，vite 打包时是 node 环境并没有 window 对象所以会报错，解决办法是在 `.vitepress/theme/index.js`
中动态引入leafletjs及其插件。
+ 项目启动需要 **node 18.x** 因为使用了相关语法







