/**
 * 数据服务 - 实时数据获取
 * 当前：mock 数据 + 模拟实时变化
 * 接入真实 API 时：替换 fetchRealtimeData 内的逻辑即可
 */
import {
  trendingSearches as baseTrending,
  officialAccounts,
  hotEvents as baseHotEvents,
  socialPosts as baseSocialPosts,
  predictionMarkets,
  platformVolumes as basePlatformVolumes,
  analysisInsights,
  vizoRecommendations,
} from './mockData'

// 生成带随机波动的数值（模拟实时变化）
const vary = (base, range = 0.1) => {
  const delta = base * range * (Math.random() * 2 - 1)
  return Math.max(0, Math.round(base + delta))
}

/** 尝试从 /api/trends 拉取全网实时热点（Reddit + 新闻） */
async function fetchLiveTrends() {
  try {
    const r = await fetch('/api/trends', { signal: AbortSignal.timeout(8000) })
    if (!r.ok) return null
    const data = await r.json()
    if (data?.trendingSearches?.length > 0) return data
    return null
  } catch {
    return null
  }
}

export async function fetchRealtimeData() {
  const now = Date.now()

  let trendingSearches = baseTrending
  let hotEvents = baseHotEvents
  let socialPosts = baseSocialPosts

  const live = await fetchLiveTrends()
  let isLiveTrends = false
  if (live) {
    trendingSearches = live.trendingSearches || baseTrending
    hotEvents = live.hotEvents?.length ? live.hotEvents : baseHotEvents
    socialPosts = live.socialPosts?.length ? live.socialPosts : baseSocialPosts
    isLiveTrends = true
  } else {
    trendingSearches = baseTrending.map((t) => {
      const changeNum = parseInt(t.change.replace(/[^0-9-]/g, '')) || 0
      const newChange = vary(Math.abs(changeNum), 0.12)
      return { ...t, volume: vary(t.volume, 0.05), change: `${changeNum >= 0 ? '+' : '-'}${newChange}%` }
    })
    hotEvents = baseHotEvents.map((e) => ({ ...e, postCount: vary(e.postCount, 0.08) }))
    socialPosts = baseSocialPosts.map((p) => ({
      ...p,
      engagement: vary(p.engagement, 0.06),
      time: ['刚刚', '1分钟前', '5分钟前'][Math.floor(Math.random() * 3)],
    }))
  }

  // 平台交易量 - 微调
  const platformVolumes = basePlatformVolumes.map((p) => {
    const changeNum = parseInt(p.change.replace(/[^0-9-]/g, '')) || 0
    const newChange = vary(Math.abs(changeNum), 0.1)
    return { ...p, change: `${changeNum >= 0 ? '+' : '-'}${newChange}%` }
  })

  // 各预测市场 - 交易量微调（模拟实时）
  const predictionMarketsAdjusted = predictionMarkets.map((m) => {
    if (!m.change || m.change === '—') return m
    const changeNum = parseInt(m.change.replace(/[^0-9-]/g, '')) || 0
    const newChange = vary(Math.abs(changeNum), 0.08)
    return { ...m, change: `${changeNum >= 0 ? '+' : '-'}${newChange}%` }
  })

  return {
    trendingSearches,
    officialAccounts,
    hotEvents,
    socialPosts,
    predictionMarkets: predictionMarketsAdjusted,
    platformVolumes,
    analysisInsights,
    vizoRecommendations,
    _timestamp: now,
    _liveTrends: isLiveTrends,  // true = 来自 Reddit/新闻实时抓取
  }
}
