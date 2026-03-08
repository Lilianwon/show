# Dune API 配置说明

## 0. 已接入的 6 个平台（curl 测试）

```bash
# 先设置: export DUNE_API_KEY=你的key
# Polymarket
curl -H "x-dune-api-key: $DUNE_API_KEY" "https://api.dune.com/api/v1/query/5802915/results?limit=1000"

# Kalshi
curl -H "x-dune-api-key: $DUNE_API_KEY" "https://api.dune.com/api/v1/query/5802836/results?limit=1000"

# Opinion
curl -H "x-dune-api-key: $DUNE_API_KEY" "https://api.dune.com/api/v1/query/6047958/results?limit=1000"

# Myriad
curl -H "x-dune-api-key: $DUNE_API_KEY" "https://api.dune.com/api/v1/query/5756303/results?limit=1000"

# Predict
curl -H "x-dune-api-key: $DUNE_API_KEY" "https://api.dune.com/api/v1/query/6365667/results?limit=1000"

# IBKR ForecastEx
curl -H "x-dune-api-key: $DUNE_API_KEY" "https://api.dune.com/api/v1/query/6536996/results?limit=1000"
```

或运行 `./测试DuneAPI.sh` 一次性测试全部。

---

## 1. 获取 API Key

1. 登录 [Dune](https://dune.com)
2. 打开 [API Settings](https://dune.com/settings/api)
3. 创建或复制你的 API Key

## 2. 本地开发

**方式 A：使用 dev:full（推荐）**

```bash
# 先复制配置
cp .env.example .env
# 编辑 .env，填入 DUNE_API_KEY=你的key

# 安装依赖（含 concurrently）
npm install

# 同时启动 API 代理 + 前端
npm run dev:full
```

**方式 B：分开启动**

```bash
# 终端 1：启动 API 代理
DUNE_API_KEY=你的key npm run api

# 终端 2：启动前端
npm run dev
```

## 3. 部署到 Vercel

1. 在 Vercel 项目 **Settings** → **Environment Variables**
2. 添加变量：`DUNE_API_KEY` = 你的 Dune API Key
3. 重新部署

部署后 `/api/dune` 会自动使用该环境变量。

## 4. 已接入的 6 个平台

| 平台 | Query ID |
|------|----------|
| Polymarket | 5802915 |
| Kalshi | 5802836 |
| Opinion | 6047958 |
| Myriad | 5756303 |
| Predict | 6365667 |
| IBKR ForecastEx | 6536996 |
