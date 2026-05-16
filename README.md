# MasonPV
个人网站

## 开发策划

- [个人本地图片与视频网页开发策划](docs/local-media-web-plan.md)

## 本地开发

```bash
npm install
npm run dev
```

常用命令：

- `npm run dev`：启动本地开发服务器。
- `npm run build`：构建生产版本。
- `npm run lint`：运行 ESLint 检查。
- `npm run typecheck`：运行 TypeScript 类型检查。

配置本地媒体目录时，请复制 `config.example.json` 为 `config.local.json`，并填写本机真实路径。`config.local.json` 不应提交到 Git。
