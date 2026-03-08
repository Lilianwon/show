# VIZO 数据 API 接入指南

各模块需要对接的 API 及数据源一览。

---

## 一、全网热搜 / 热点词

| 数据源 | API / 获取方式 | 用途 |
|--------|----------------|------|
| **Twitter / X** | [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)（需付费） | 话题热度、推文量、搜索趋势 |
| **Google Trends** | [SerpApi Google Trends](https://serpapi.com/google-trends-api) / [Pytrends](https://github.com/GeneralMills/pytrends)（非官方） | 搜索关键词热度 |
| **微博** | [微博开放平台](https://open.weibo.com/) | 微博热搜、话题榜 |
| **Reddit** | [Reddit API](https://www.reddit.com/dev/api/)（免费） | 子版块热帖、提及量 |
| **Telegram** | [Telegram Bot API](https://core.telegram.org/bots/api) | 频道/群组消息量 |

**可选方案**：
- 付费聚合：**Brandwatch**、**Meltwater** 等舆情平台
- 自建爬虫：抓取公开热搜页（有合规与反爬限制）

---

## 二、社媒内容抓取（实时内容流）

| 数据源 | API | 说明 |
|--------|-----|------|
| **Twitter** | [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api) | 按关键词/话题搜索推文，需 Basic 以上套餐 |
| **Reddit** | [Reddit API](https://www.reddit.com/dev/api/) | `GET /r/subreddit/new` 等，免费 |
| **Discord** | 无官方公开 API | 需自建 Bot 或第三方数据服务 |
| **知乎** | [知乎 API](https://www.zhihu.com/api)（非官方） | 需自行抓取或第三方 |

**关键词示例**：`预测市场`、`Polymarket`、`Kalshi`、`prediction market` 等。

---

## 三、各预测市场交易量与市场数据

| 平台 | API / 数据源 | 说明 |
|------|--------------|------|
| **Polymarket** | [Polymarket API](https://docs.polymarket.com/)（公开） | 市场列表、价格、交易量 |
| **Kalshi** | [Kalshi API](https://trading-api.readme.io/reference/getting-started) | 需注册，市场与交易数据 |
| **Manifold** | [Manifold API](https://docs.manifold.markets/) | 市场、概率、交易量 |
| **PredictIt** | 无官方 API | 需爬虫或第三方 |
| **Overtime** | 需查官方文档 | - |
| **Opinion** | 需查官方文档 | - |
| **IBKR ForecastEx** | [Interactive Brokers API](https://www.interactivebrokers.com/api) | 需 IB 账户 |

**聚合数据**：
- [Polymarket Analytics](https://www.polymarketanalytics.com/)
- [Prediction Markets Aggregator](https://predmarkets.online/) 等第三方站点

---

## 四、平台 24h 交易量（分析用）

来源与「三」相同，从各预测市场 API 中聚合：

- Polymarket、Kalshi、Manifold 等均提供市场级交易量
- 按平台汇总 24h 成交量
- 可配合 [The Graph](https://thegraph.com/) 等链上数据（若为链上市场）

---

## 五、自动分析（热度词条 × 交易量）

**数据依赖**：
- 热搜 / 热度词条 → 来自「一」
- 平台交易量 → 来自「三」「四」

**分析逻辑**：
- 可完全在**前端或后端**用规则实现（如涨幅对比、相关性判断）
- 若要「智能分析」文案，可接入：
  - [OpenAI API](https://platform.openai.com/docs)
  - [Claude API](https://docs.anthropic.com/)
  - [通义千问](https://help.aliyun.com/zh/dashscope/) 等大模型

---

## 六、接入优先级建议

| 优先级 | 模块 | 推荐 API | 难度 |
|--------|------|----------|------|
| 1 | 预测市场数据 | Polymarket API、Manifold API | ⭐ 较低 |
| 2 | 热搜 / 趋势 | Google Trends (SerpApi)、Reddit API | ⭐⭐ |
| 3 | 社媒内容 | Reddit API、Twitter API（若有预算） | ⭐⭐ |
| 4 | 自动分析 | 规则 + 大模型（可选） | ⭐⭐⭐ |

---

## 七、快速验证示例（Polymarket）

```javascript
// 示例：获取 Polymarket 市场数据
const res = await fetch('https://gamma-api.polymarket.com/markets')
const markets = await res.json()
// markets 含：title, volume, outcomes, endDate 等
```

更多接口见 [Polymarket API 文档](https://docs.polymarket.com/)。
