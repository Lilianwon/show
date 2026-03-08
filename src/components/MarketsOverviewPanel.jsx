import { useData } from '../context/DataContext'
import './Panel.css'
import './MarketsOverviewPanel.css'

function MarketsOverviewPanel({ collapsed = false }) {
  const { data } = useData()
  const predictionMarkets = data?.predictionMarkets ?? []

  if (!data) return <section className="panel markets-panel loading">加载中...</section>

  return (
    <section className={`panel markets-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="panel-header">
        <h2>
          <span className="panel-icon">📊</span>
          各预测市场数据对比
        </h2>
        <span className="panel-badge">每日交易量 · {predictionMarkets.length} 个平台</span>
      </div>
      <div className="embed-grid">
        {predictionMarkets.map((market) => (
          <div key={market.id} className="embed-card">
            <div className="embed-header">
              <span className="embed-name">{market.name}</span>
            </div>
            <div className="volume-content">
              <div className="volume-row">
                <span className="volume-label">24h 交易量</span>
                <span className="volume-value">{market.volume24h}</span>
              </div>
              <div className="volume-row">
                <span className="volume-label">环比</span>
                <span className={`volume-change ${(market.change || '').startsWith('+') ? 'up' : 'down'}`}>
                  {market.change}
                </span>
              </div>
              {market.topMarket && market.topMarket !== '-' && (
                <div className="volume-row">
                  <span className="volume-label">热门市场</span>
                  <span className="volume-top">{market.topMarket}</span>
                </div>
              )}
              <a href={market.embedUrl} target="_blank" rel="noopener noreferrer" className="dune-link">
                {market.embedUrl?.includes('defirate') ? '在 DeFiRate 查看完整数据 →' : '在 Dune 查看完整图表 →'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MarketsOverviewPanel
