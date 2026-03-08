import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { getMarketsByNewsId } from '../../data/predictionMarketData'
import { getEventDetail } from '../../data/predictionMarketData'
import MarketPopup from './MarketPopup'
import './NewsDetailPanel.css'

const TIME_RANGES = ['ALL', '1H', '6H', '1D', '1W', '1M']

export default function NewsDetailPanel({ news, onClose, onCardSelect }) {
  const [timeRange, setTimeRange] = useState('1D')
  const [limitPrice, setLimitPrice] = useState(56)
  const [shares, setShares] = useState('')

  if (!news) return null

  const relatedMarkets = getMarketsByNewsId(news.id)
  const bestMarket = relatedMarkets[0] || null
  const detail = bestMarket ? getEventDetail(bestMarket.id) : null
  const yesPct = detail?.winRate?.yes ?? bestMarket?.yesOdds ?? 62

  const chartData = detail?.chartData || [
    { time: '3/1', yes: 58 }, { time: '3/2', yes: 61 }, { time: '3/3', yes: 59 },
    { time: '3/4', yes: 62 }, { time: '3/5', yes: 64 }, { time: '3/6', yes: yesPct },
  ]

  useEffect(() => {
    if (detail) setLimitPrice(detail.winRate.yes)
  }, [detail])

  const adjustShares = (delta) => {
    const n = parseInt(shares || '0', 10) + delta
    setShares(Math.max(0, n).toString())
  }

  const [showMarketPicker, setShowMarketPicker] = useState(false)
  const [showMoreMarkets, setShowMoreMarkets] = useState(false)
  const otherMarkets = relatedMarkets.filter(m => m.id !== bestMarket?.id)

  const handleBuyClick = () => {
    if (!bestMarket) return
    if (relatedMarkets.length > 1) {
      setShowMarketPicker(true)
    } else {
      onCardSelect?.(bestMarket)
    }
  }

  const handleMarketPick = (card) => {
    onCardSelect?.(card)
    setShowMarketPicker(false)
  }

  return (
    <section className="news-detail-panel" data-animate="in">
      <button
        className="news-detail-close"
        onClick={onClose}
        aria-label="返回所有盘口"
      >
        ×
      </button>

      <div className="news-detail-content">
        {/* 来自此新闻 - 点击入口标识 */}
        <div className="news-detail-from-badge">
          <span className="from-icon">←</span>
          来自此新闻
        </div>

        {/* 上方：具体新闻内容 */}
        <div className="news-detail-article">
          <h2 className="news-detail-title">{news.title}</h2>
          <div className="news-detail-meta">
            <span className="news-detail-time">{news.time || '刚刚'}</span>
            <span className={`news-detail-change ${news.level === '爆' ? 'level-bao' : 'level-hot'}`}>
              {news.change}
            </span>
          </div>
          {news.summary && (
            <p className="news-detail-summary">{news.summary}</p>
          )}
        </div>

        {/* 新闻下方：AI 分析横着展示 */}
        {detail && (
          <div className="news-detail-ai-row">
            <div className="ai-col ai-summary-col">
              <h4 className="ai-section-title"><span className="ai-icon">◇</span> AI 总结</h4>
              <p className="ai-text">{detail.aiSummary}</p>
            </div>
            <div className="ai-col ai-analysis-col">
              <h4 className="ai-section-title"><span className="ai-icon">◇</span> AI 分析</h4>
              <p className="ai-text">{detail.aiAnalysis}</p>
            </div>
            <div className="ai-col ai-winrate-col">
              <h4 className="ai-section-title"><span className="ai-icon">◇</span> AI 分析胜率</h4>
              <div className="ai-win-rate-bars">
                <div className="ai-win-item">
                  <span className="ai-win-label">Yes</span>
                  <div className="ai-win-bar-wrap">
                    <div className="ai-win-bar yes" style={{ width: `${detail.winRate.yes}%` }} />
                  </div>
                  <span className="ai-win-pct">{detail.winRate.yes}%</span>
                </div>
                <div className="ai-win-item">
                  <span className="ai-win-label">No</span>
                  <div className="ai-win-bar-wrap">
                    <div className="ai-win-bar no" style={{ width: `${detail.winRate.no}%` }} />
                  </div>
                  <span className="ai-win-pct">{detail.winRate.no}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 盘口信息：左侧图表 | 右侧交易面板 */}
        {bestMarket ? (
          <div className="news-detail-market">
            <div className="market-chart-area">
              <div className="market-header">
                <h3 className="market-title">{detail?.title || bestMarket.title}</h3>
                <span className="market-vol">{detail?.tradingVolume || bestMarket.volume} Vol.</span>
              </div>
              <div className="market-chart-wrap">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={10} />
                    <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={10} />
                    <Line
                      type="monotone"
                      dataKey="yes"
                      stroke="var(--okx-green)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="market-time-btns">
                {TIME_RANGES.map((t) => (
                  <button
                    key={t}
                    className={`time-btn ${timeRange === t ? 'active' : ''}`}
                    onClick={() => setTimeRange(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧：交易面板 */}
            <aside className="market-buy-area">
                <div className="buy-odds">
                  <span className="buy-opt yes">Yes {detail?.winRate?.yes ?? bestMarket.yesOdds}¢</span>
                  <span className="buy-opt no">No {detail?.winRate?.no ?? 100 - bestMarket.yesOdds}¢</span>
                </div>
                <div className="buy-field">
                  <label>Limit Price</label>
                  <div className="buy-input-row">
                    <input
                      type="text"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(parseInt(e.target.value, 10) || 0)}
                      className="buy-input"
                    />
                    <span className="buy-unit">¢</span>
                  </div>
                </div>
                <div className="buy-field">
                  <label>Shares</label>
                  <input
                    type="text"
                    placeholder="数量"
                    value={shares}
                    onChange={(e) => setShares(e.target.value.replace(/\D/g, ''))}
                    className="buy-input full"
                  />
                </div>
                <button className="buy-btn" onClick={handleBuyClick}>
                  购买
                </button>
                {relatedMarkets.length > 1 && (
                  <p className="buy-more-hint">
                    共 {relatedMarkets.length} 个关联盘口，点击购买可选择
                  </p>
                )}
            </aside>

            {/* 更多相关盘口推荐 - 单独的长横条推荐块 */}
            {otherMarkets.length > 0 && (
              <div className="more-markets-block">
                <button
                  className="more-markets-bar"
                  onClick={() => setShowMoreMarkets(!showMoreMarkets)}
                >
                  <span className="more-markets-label">更多相关盘口推荐</span>
                  <span className="more-markets-count">({otherMarkets.length})</span>
                  <span className={`more-markets-arrow ${showMoreMarkets ? 'open' : ''}`}>▾</span>
                </button>
                {showMoreMarkets && (
                  <div className="more-markets-list">
                    {otherMarkets.map((card) => (
                      <button
                        key={card.id}
                        className="more-market-item"
                        onClick={() => onCardSelect?.(card)}
                      >
                        <span className="more-market-odds">{card.yesOdds}% Yes</span>
                        <span className="more-market-title">{card.title}</span>
                        <span className="more-market-volume">{card.volume}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="news-detail-no-market">
            <p>暂无匹配盘口，请等待更多市场开启</p>
          </div>
        )}
      </div>

      {showMarketPicker && relatedMarkets.length > 1 && (
        <MarketPopup
          news={news}
          markets={relatedMarkets}
          onClose={() => setShowMarketPicker(false)}
          onCardClick={handleMarketPick}
        />
      )}
    </section>
  )
}
