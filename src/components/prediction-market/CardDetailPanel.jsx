import { useState, useEffect } from 'react'
import { getEventDetail } from '../../data/predictionMarketData'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import './CardDetailPanel.css'

const TIME_RANGES = ['ALL', '1H', '6H', '1D', '1W', '1M']

// 模拟订单簿数据
const MOCK_ASKS = [
  { price: 57, shares: 120, total: 6840 },
  { price: 58, shares: 85, total: 4930 },
  { price: 59, shares: 200, total: 11800 },
]
const MOCK_BIDS = [
  { price: 56, shares: 150, total: 8400 },
  { price: 55, shares: 90, total: 4950 },
  { price: 54, shares: 180, total: 9720 },
]

export default function CardDetailPanel({ card, onClose }) {
  const [activeTab, setActiveTab] = useState('buy')
  const [timeRange, setTimeRange] = useState('1D')
  const [limitPrice, setLimitPrice] = useState(56)
  const [shares, setShares] = useState('')
  const [marketTab, setMarketTab] = useState('orderbook')
  const [orderSide, setOrderSide] = useState('yes')
  const [comment, setComment] = useState('')
  const detail = getEventDetail(card?.id)

  useEffect(() => {
    if (detail) setLimitPrice(detail.winRate.yes)
  }, [detail])

  const adjustShares = (delta) => {
    const n = parseInt(shares || '0', 10) + delta
    setShares(Math.max(0, n).toString())
  }

  if (!detail) return null

  const categoryLabel = (card?.category || 'crypto').replace(/^\w/, (c) => c.toUpperCase())
  const chartData = detail.chartData || [
    { time: '3/1', yes: 58 }, { time: '3/2', yes: 61 }, { time: '3/3', yes: 59 },
    { time: '3/4', yes: 62 }, { time: '3/5', yes: 64 }, { time: '3/6', yes: detail.winRate.yes },
  ]

  return (
    <section className="card-detail-panel" data-animate="in">
      <button
        className="card-detail-close"
        onClick={onClose}
        aria-label="返回所有盘口"
      >
        ×
      </button>

      {/* 固定：标题 */}
      <div className="card-detail-header-bar">
        <div className="card-detail-header">
          <span className="card-category">{categoryLabel}</span>
          <div className="card-header-main">
            <span className="card-asset-icon">{card?.icon || '◇'}</span>
            <h1 className="card-header-title">{detail.title}</h1>
            <span className="card-countdown">Market Closes In: 297d:16h:54m:26s</span>
          </div>
        </div>
      </div>

      {/* 左右分栏：图表+下方内容 | BUY 面板 */}
      <div className="card-detail-layout">
        <div className="card-detail-left">
          <div className="card-detail-scroll">
            {/* 三卡片：AI 总结 | AI 分析 | 概率分析 */}
            <div className="card-ai-three-row">
              <div className="card-ai-card">
                <h4 className="card-ai-card-title"><span className="card-ai-icon">◇</span> 市场观点</h4>
                <p className="card-ai-card-text">{detail.aiSummary}</p>
              </div>
              <div className="card-ai-card">
                <h4 className="card-ai-card-title"><span className="card-ai-icon">◇</span> 多维分析</h4>
                <p className="card-ai-card-text">{detail.aiAnalysis}</p>
              </div>
              <div className="card-ai-card card-ai-card-prob">
                <h4 className="card-ai-card-title"><span className="card-ai-icon">◇</span> 概率分析</h4>
                <div className="card-ai-prob-bars">
                  <div className="card-prob-item">
                    <span>Yes</span>
                    <div className="card-prob-bar-wrap">
                      <div className="card-prob-bar yes" style={{ width: `${detail.winRate.yes}%` }} />
                    </div>
                    <span className="card-prob-pct">{detail.winRate.yes}%</span>
                  </div>
                  <div className="card-prob-item">
                    <span>No</span>
                    <div className="card-prob-bar-wrap">
                      <div className="card-prob-bar no" style={{ width: `${detail.winRate.no}%` }} />
                    </div>
                    <span className="card-prob-pct">{detail.winRate.no}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-chart-section">
              <div className="card-vol-row">
                <span className="card-vol-value">{detail.tradingVolume} Vol.</span>
                <span className="card-yes-trend">Yes {detail.winRate.yes}% <span className="trend-up">↑</span> <span className="trend-down">↓</span></span>
              </div>
              <div className="card-chart-wrap">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--okx-green)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--okx-green)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                    <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                    <Area type="monotone" dataKey="yes" stroke="var(--okx-green)" strokeWidth={2.5} fill="url(#chartFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="card-time-btns">
                {TIME_RANGES.map((t) => (
                  <button key={t} className={`card-time-btn ${timeRange === t ? 'active' : ''}`} onClick={() => setTimeRange(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="card-market-details">
              <h3 className="card-section-title">Market Details</h3>
              <div className="card-market-tabs">
                <button className={`card-market-tab ${marketTab === 'orderbook' ? 'active' : ''}`} onClick={() => setMarketTab('orderbook')}>Order Book</button>
                <button className={`card-market-tab ${marketTab === 'positions' ? 'active' : ''}`} onClick={() => setMarketTab('positions')}>Positions</button>
              </div>
              {marketTab === 'orderbook' && (
                <>
                  <div className="card-order-side-tabs">
                    <button className={`card-order-side-tab ${orderSide === 'yes' ? 'active' : ''}`} onClick={() => setOrderSide('yes')}>Trade Yes</button>
                    <button className={`card-order-side-tab ${orderSide === 'no' ? 'active' : ''}`} onClick={() => setOrderSide('no')}>Trade No</button>
                  </div>
                  <div className="card-order-table">
                    <div className="card-order-head"><span>Price</span><span>Shares</span><span>Total</span></div>
                    <div className="card-order-asks">
                      {MOCK_ASKS.map((row, i) => (
                        <div key={i} className="card-order-row ask"><span>{row.price}</span><span>{row.shares}</span><span>{row.total}</span></div>
                      ))}
                    </div>
                    <div className="card-order-mid"><span>Last: {detail.winRate.yes}</span><span>Spread: 1</span></div>
                    <div className="card-order-bids">
                      {MOCK_BIDS.map((row, i) => (
                        <div key={i} className="card-order-row bid"><span>{row.price}</span><span>{row.shares}</span><span>{row.total}</span></div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {marketTab === 'positions' && <div className="card-positions-placeholder">暂无持仓</div>}
            </div>

            <div className="card-ai-prediction">
              <h3 className="card-section-title">AI Market Prediction</h3>
              <div className="card-ai-pred-tabs">
                <button className="card-ai-pred-tab active">AI Market Prediction</button>
                <button className="card-ai-pred-tab locked">Expected Move</button>
                <button className="card-ai-pred-tab locked">Probability Distribution</button>
                <button className="card-ai-pred-tab">Rules</button>
              </div>
              <div className="card-ai-pred-cards">
                <div className="card-ai-pred-card"><h4>Recommended</h4><p className="card-ai-building">We&apos;re building this content</p></div>
                <div className="card-ai-pred-card"><h4>Market Signal</h4><p className="card-ai-building">We&apos;re building this content</p></div>
                <div className="card-ai-pred-card"><h4>Expected Return</h4><p className="card-ai-building">We&apos;re building this content</p></div>
              </div>
            </div>

            <div className="card-discussion">
              <h3 className="card-section-title">Discussion</h3>
              <div className="card-comment-input-wrap">
                <textarea placeholder="Share your thoughts or predictions..." value={comment} onChange={(e) => setComment(e.target.value.slice(0, 500))} rows={3} />
                <div className="card-comment-actions">
                  <span className="card-char-count">{comment.length}/500</span>
                  <button className="card-post-btn">Post</button>
                </div>
              </div>
              <div className="card-comments-empty">
                <span className="card-empty-icon">☆</span>
                <p>No comments yet</p>
                <span>Share your analysis or expectations for this market.</span>
              </div>
            </div>
          </div>
        </div>
        <aside className="card-trade-panel">
          <div className="card-trade-current">• Yes</div>
          <div className="card-trade-tabs">
            {['Buy', 'Sell', 'Convert', 'Limit'].map((t) => (
              <button
                key={t}
                className={`card-trade-tab ${activeTab === t.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveTab(t.toLowerCase())}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="card-trade-options">
            <button className="card-trade-opt yes">Yes {detail.winRate.yes}¢</button>
            <button className="card-trade-opt no">No {detail.winRate.no}¢</button>
          </div>
          <div className="card-trade-field">
            <label>Limit Price</label>
            <span className="card-trade-own">OwnCash: $0.00</span>
            <div className="card-trade-input-row">
              <button onClick={() => setLimitPrice((p) => Math.max(0, p - 1))}>–</button>
              <input
                type="text"
                value={limitPrice}
                onChange={(e) => setLimitPrice(parseInt(e.target.value, 10) || 0)}
              />
              <span className="card-trade-unit">¢</span>
              <button onClick={() => setLimitPrice((p) => Math.min(100, p + 1))}>+</button>
            </div>
          </div>
          <div className="card-trade-field">
            <label>Shares</label>
            <input
              type="text"
              placeholder="Enter shares"
              value={shares}
              onChange={(e) => setShares(e.target.value.replace(/\D/g, ''))}
            />
            <div className="card-trade-shortcuts">
              <button onClick={() => adjustShares(-100)}>-100</button>
              <button onClick={() => adjustShares(-10)}>-10</button>
              <button onClick={() => adjustShares(10)}>+10</button>
              <button onClick={() => adjustShares(100)}>+100</button>
            </div>
          </div>
          <div className="card-trade-summary">
            <span>Total $0</span>
            <span>To Win: $0</span>
          </div>
          <button className="card-trade-buy">BUY</button>
        </aside>
      </div>
    </section>
  )
}
