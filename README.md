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

## 本地媒体使用流程

1. 复制 `config.example.json` 为 `config.local.json`。
2. 在 `config.local.json` 中填写本机图片、视频目录。
3. 运行 `npm run dev` 启动网页。
4. 打开 `/settings` 点击“立即扫描媒体目录”，或调用 `POST /api/scan`。
5. 回到首页浏览、筛选并打开媒体详情。

真实媒体路径、数据库文件和运行缓存都保留在本机，不应提交到 Git。
