# VIZO - 预测市场行情监测

预测市场行情与实时动态监控 Dashboard。

## 打开即用（推荐）

### 方式一：双击启动（macOS）

1. 双击 **`启动VIZO.command`**
2. 首次运行会自动安装依赖（约 1 分钟）
3. 浏览器将自动打开 http://localhost:5173

> 若提示「无法打开」：右键 → 打开 → 打开，即可正常使用

### 方式二：命令行启动

```bash
cd "VIZO - 检测面板"
npm install   # 首次需要
npm start     # 或 npm run dev
```

浏览器打开 http://localhost:5173

### 方式三：部署到线上（随时随地打开）

详见 **[部署到Vercel指南.md](./部署到Vercel指南.md)**，两种方式任选：

- **GitHub + Vercel**：推代码到 GitHub，在 Vercel 导入，自动部署
- **Vercel 命令行**：`vercel` 一键部署，无需 GitHub

---

## 功能模块

- **社媒抓取**：全网热搜、官方账号、实时内容流、热点事件
- **市场数据**：Polymarket / Kalshi / Opinion 等 7 个平台入口
- **自动分析**：热度词条 × 交易量智能分析 + VIZO 专业建议

---

## 实时更新

- **每 30 秒**自动刷新数据
- 点击右上角 **🔄** 可手动立即刷新
- 接入真实 API 后，修改 `src/data/dataService.js` 中的 `fetchRealtimeData` 即可

## 技术栈

- React 18 + Vite 5
- 数据来自 `src/data/dataService.js`（当前为 mock + 模拟实时变化）
