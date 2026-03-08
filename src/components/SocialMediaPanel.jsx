import { useData } from '../context/DataContext'
import './Panel.css'
import './SocialMediaPanel.css'

function SocialMediaPanel({ collapsed = false }) {
  const { data } = useData()
  const socialPosts = data?.socialPosts ?? []
  const officialAccounts = data?.officialAccounts ?? []
  const hotEvents = data?.hotEvents ?? []
  const trendingSearches = data?.trendingSearches ?? []

  const getKeywordUrl = (item) => {
    if (item.url) return item.url
    const q = `${item.keyword} 预测市场`
    return `https://www.google.com/search?q=${encodeURIComponent(q)}`
  }

  const getPostUrl = (post) => {
    if (post.url) return post.url  // 抓取数据带真实链接
    const text = post.content ?? ''
    const author = (post.author ?? '').replace(/^@/, '')

    if (post.platform === 'Twitter') {
      const q = author ? `from:${author} ${text}` : text
      return `https://twitter.com/search?q=${encodeURIComponent(q)}&src=typed_query&f=live`
    }

    if (post.platform === 'Reddit') {
      return `https://www.reddit.com/search/?q=${encodeURIComponent(text)}&type=link`
    }

    const q = `${post.author ?? ''} ${text}`.trim()
    return `https://www.google.com/search?q=${encodeURIComponent(q)}`
  }

  const getSentimentClass = (s) => {
    if (s === 'positive') return 'sentiment-positive'
    if (s === 'negative') return 'sentiment-negative'
    return 'sentiment-neutral'
  }

  const getPlatformIcon = (p) => {
    const icons = { Twitter: '𝕏', Reddit: 'R', Discord: 'D' }
    return icons[p] || '?'
  }

  if (!data) return <section className="panel social-panel loading">加载中...</section>

  return (
    <section className={`panel social-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="panel-header">
        <h2>
          <span className="panel-icon">📡</span>
          全网社媒内容抓取
        </h2>
        <span className={`panel-badge track-badge ${data?._liveTrends ? 'live' : ''}`}>
          {data?._liveTrends ? '📡 实时抓取' : 'TRACK'}
        </span>
      </div>

      {/* 全网热搜 · 需立马知晓 - 置顶最显眼 */}
      <div className="trending-searches">
        <h3 className="trending-title">
          <span className="alert-icon">⚡</span>
          全网热搜 / 热点词 · 需立马知晓
        </h3>
        <div className="trending-grid">
          {trendingSearches.map((item) => (
            <div key={item.id} className={`trending-item level-${item.level}`}>
              <a
                href={getKeywordUrl(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="trending-keyword-link"
              >
                <span className="trending-keyword">{item.keyword}</span>
              </a>
              <span className="trending-meta">
                <span className="trending-volume">搜索 {item.volume.toLocaleString()}</span>
                <span className="trending-change">{item.change}</span>
              </span>
              <span className={`trending-level level-${item.level}`}>{item.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 热点事件监测 - 平台争议、KOL情绪、竞品回应 */}
      <div className="hot-events">
        <h3>
          <span className="section-icon">⚠️</span>
          热点事件与平台争议监测
        </h3>
        {hotEvents.map((ev) => (
          <div key={ev.id} className="hot-event-card">
            <div className="hot-event-header">
              <span className="hot-event-title">{ev.title}</span>
              <span className={`heat-badge heat-${ev.sentiment}`}>🔥 {ev.heatLevel} 热度</span>
            </div>
            <div className="hot-event-platforms">
              {ev.platforms.map((p) => (
                <span key={p} className="platform-tag">{p}</span>
              ))}
            </div>
            <p className="hot-event-summary">{ev.summary}</p>
            <div className="hot-event-footer">
              <span className={`sentiment-badge ${ev.sentiment === 'negative' ? 'negative' : 'neutral'}`}>
                {ev.sentiment === 'negative' ? '舆情偏负' : '舆情中性'}
              </span>
              <span className="post-count">相关讨论 {ev.postCount?.toLocaleString?.() ?? ev.postCount}+</span>
            </div>
          </div>
        ))}
      </div>

      {/* 预测市场官方账号 */}
      <div className="official-accounts">
        <h3>官方账号追踪</h3>
        <div className="accounts-grid">
          {officialAccounts.map((acc) => (
            <div key={acc.platform} className="account-card">
              <span className="account-platform">{acc.platform}</span>
              <div className="account-links">
                <a href={`https://twitter.com/${acc.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">推 {acc.twitter}</a>
                <a href={`https://${acc.website}`} target="_blank" rel="noopener noreferrer">官网</a>
                {acc.ceo !== '-' && (
                  <a href={`https://twitter.com/${acc.ceo.replace('@', '')}`} target="_blank" rel="noopener noreferrer">负责人</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 社媒内容流 - 含 KOL、竞品回应、平台争议等 */}
      <div className="social-feed-section">
        <h3>
          实时内容流
          <span className="filter-hint">（KOL / 竞品回应 / 平台争议）</span>
        </h3>
        <div className="social-feed">
          {socialPosts.map((post) => (
          <a
            key={post.id}
            href={getPostUrl(post)}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card-link"
          >
            <article className={`social-card ${post.trending ? 'trending' : ''} ${post.isKOL ? 'kol' : ''} ${post.isOfficial ? 'official' : ''}`}>
              <div className="social-meta">
                <span className={`platform platform-${post.platform.toLowerCase()}`}>
                  {getPlatformIcon(post.platform)}
                </span>
                <span className="author">
                  {post.author}
                  {post.isKOL && <span className="meta-tag">KOL</span>}
                  {post.isOfficial && <span className="meta-tag official">官方</span>}
                </span>
                <span className="time">{post.time}</span>
                {post.trending && (
                  <span className="trending-badge-inline">🔥 {post.trendChange}</span>
                )}
              </div>
              <p className="social-content">{post.content}</p>
              {(post.relatedPlatforms?.length || post.tags?.length) && (
                <div className="social-tags">
                  {post.relatedPlatforms?.map((p) => (
                    <span key={p} className="related-platform">{p}</span>
                  ))}
                  {post.tags?.map((t) => (
                    <span key={t} className="content-tag">{t}</span>
                  ))}
                </div>
              )}
              <div className="social-footer">
                <span className={`sentiment ${getSentimentClass(post.sentiment)}`}>
                  {post.sentiment === 'positive' ? '积极' : post.sentiment === 'negative' ? '消极' : '中性'}
                </span>
                <span className="engagement">互动 {post.engagement}</span>
              </div>
            </article>
          </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialMediaPanel
