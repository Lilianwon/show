import { useState, useEffect } from 'react'
import { getEventDetail } from '../../data/predictionMarketData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import './EventDetailModal.css'

const TIME_RANGES = ['ALL', '1H', '6H', '1D', '1W', '1M']

export default function EventDetailModal({ card, onClose }) {
  const [activeTab, setActiveTab] = useState('buy')
  const [timeRange, setTimeRange] = useState('1D')
  const [limitPrice, setLimitPrice] = useState(56)
  const [shares, setShares] = useState('')
  const detail = getEventDetail(card?.id)

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (detail) {
      setLimitPrice(detail.winRate.yes)
    }
  }, [detail])

  if (!detail) return null

  const chartData = detail.chartData || [
    { time: '3/1', yes: 58 }, { time: '3/2', yes: 61 }, { time: '3/3', yes: 59 },
    { time: '3/4', yes: 62 }, { time: '3/5', yes: 64 }, { time: '3/6', yes: detail.winRate.yes },
  ]

  const adjustShares = (delta) => {
    const n = parseInt(shares || '0', 10) + delta
    setShares(Math.max(0, n).toString())
  }

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal event-modal-fig5" onClick={e => e.stopPropagation()}>
        <button className="event-modal-close" onClick={onClose} aria-label="关闭">×</button>

        <div className="event-modal-layout">
          <div className="event-main">
            {/* 事件信息卡片 */}
            <div className="event-info-card">
              <span className="event-category">Crypto</span>
              <div className="event-info-header">
                <span className="event-asset-icon">◇</span>
                <h2 className="event-title">{detail.title}</h2>
                <span className="event-countdown">Market Closes in: 298d:11h:6m:42s</span>
              </div>
            </div>

            {/* 交易量与图表 */}
            <div className="event-chart-card">
              <div className="event-vol-row">
                <span className="event-vol-value">{detail.tradingVolume} Vol.</span>
                <span className="event-yes-trend">
                  • Yes {detail.winRate.yes}%
                  <span className="trend-up">↑</span>
                </span>
              </div>
              <div className="event-chart-wrap">
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={10} />
                    <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={10} />
                    <Line type="monotone" dataKey="yes" stroke="var(--okx-green)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="chart-mid-line" />
              </div>
              <div className="event-chart-footer">
                <span className="market-details-label">Market Details</span>
                <div className="time-range-btns">
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
            </div>

            {/* AI 总结与分析 */}
            <div className="event-ai-section">
              <h4 className="section-title">
                <span className="section-icon">◇</span> AI 总结
              </h4>
              <p className="ai-summary">{detail.aiSummary}</p>
              <h4 className="section-title">
                <span className="section-icon">◇</span> AI 分析
              </h4>
              <p className="ai-analysis">{detail.aiAnalysis}</p>
              <h4 className="section-title">
                <span className="section-icon">◇</span> 胜率分析
              </h4>
              <div className="win-rate-bars">
                <div className="win-rate-item">
                  <span className="win-label">Yes</span>
                  <div className="win-bar-wrap">
                    <div className="win-bar yes" style={{ width: `${detail.winRate.yes}%` }} />
                  </div>
                  <span className="win-pct">{detail.winRate.yes}%</span>
                </div>
                <div className="win-rate-item">
                  <span className="win-label">No</span>
                  <div className="win-bar-wrap">
                    <div className="win-bar no" style={{ width: `${detail.winRate.no}%` }} />
                  </div>
                  <span className="win-pct">{detail.winRate.no}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧交易面板 - 图五样式 */}
          <aside className="event-sidebar event-trade-panel">
            <div className="trade-current">• Yes</div>
            <div className="trade-tabs">
              {['Buy', 'Sell', 'Convert', 'Limit'].map((t) => (
                <button
                  key={t}
                  className={`trade-tab ${activeTab === t.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.toLowerCase())}
                >
                  {t}
                  {t === 'Limit' && <span className="tab-arrow">▾</span>}
                </button>
              ))}
            </div>
            <div className="trade-options">
              <button className="trade-opt-btn yes">Yes {detail.winRate.yes}¢</button>
              <button className="trade-opt-btn no">No {detail.winRate.no}¢</button>
            </div>
            <div className="trade-field">
              <label>Limit Price</label>
              <span className="trade-owncash">OwnCash: $0.00</span>
              <div className="trade-input-row">
                <button className="trade-adj" onClick={() => setLimitPrice((p) => Math.max(0, p - 1))}>–</button>
                <input
                  type="text"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(parseInt(e.target.value, 10) || 0)}
                  className="trade-input"
                />
                <span className="trade-unit">¢</span>
                <button className="trade-adj" onClick={() => setLimitPrice((p) => Math.min(100, p + 1))}>+</button>
              </div>
            </div>
            <div className="trade-field">
              <label>Shares</label>
              <span className="trade-max">Max</span>
              <input
                type="text"
                placeholder="Enter shares"
                value={shares}
                onChange={(e) => setShares(e.target.value.replace(/\D/g, ''))}
                className="trade-input full"
              />
              <div className="trade-shortcuts">
                <button onClick={() => adjustShares(-100)}>-100</button>
                <button onClick={() => adjustShares(-10)}>-10</button>
                <button onClick={() => adjustShares(10)}>+10</button>
                <button onClick={() => adjustShares(100)}>+100</button>
              </div>
            </div>
            <div className="trade-summary">
              <span>Total $0</span>
              <span>To Win: $0</span>
            </div>
            <button className="trade-buy-btn">BUY</button>
          </aside>
        </div>
      </div>
    </div>
  )
}
