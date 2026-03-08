import { useData } from '../context/DataContext'
import './Panel.css'
import './AnalysisPanel.css'

function AnalysisPanel({ collapsed = false }) {
  const { data } = useData()
  const analysisInsights = data?.analysisInsights ?? []
  const vizoRecommendations = data?.vizoRecommendations ?? []
  const platformVolumes = data?.platformVolumes ?? []
  const getTypeLabel = (type) => {
    const labels = {
      'keyword-volume': '热度词条+交易量',
      'platform-controversy': '平台争议',
      'sentiment-volume': '舆论→交易量',
      'event-impact': '事件冲击',
      'divergence': '背离预警',
      'correlation': '关联分析',
    }
    return labels[type] || type
  }

  const getImpactClass = (impact) => {
    const classes = { high: 'impact-high', medium: 'impact-medium', low: 'impact-low' }
    return classes[impact] || ''
  }

  if (!data) return <section className="panel analysis-panel loading">加载中...</section>

  return (
    <section className={`panel analysis-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="panel-header">
        <h2>
          <span className="panel-icon">🤖</span>
          自动分析
        </h2>
        <span className="panel-badge">舆论 + 事件 → 智能精准分析</span>
      </div>
      <p className="analysis-desc">
        根据全网热度词条、对应平台交易量及社媒舆论，进行智能精准分析并给出可执行建议
      </p>

      {/* 平台交易量速览 */}
      <div className="volume-overview">
        <h3 className="section-title">各平台 24h 交易量（分析数据源）</h3>
        <div className="volume-tags">
          {platformVolumes.map((p) => (
            <span key={p.platform} className="volume-tag">
              <span className="vt-platform">{p.platform}</span>
              <span className="vt-volume">{p.volume24h}</span>
              <span className={`vt-change ${p.change.startsWith('-') ? 'down' : ''}`}>{p.change}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 数据洞察 - 热度词条 + 交易量 */}
      <div className="analysis-section">
        <h3 className="section-title">热度词条 × 平台交易量 分析</h3>
        <div className="analysis-grid">
        {analysisInsights.map((insight) => (
          <div key={insight.id} className="analysis-card">
            <div className="analysis-header">
              <span className={`type-badge type-${insight.type}`}>
                {getTypeLabel(insight.type)}
              </span>
              <span className={`impact-badge ${getImpactClass(insight.impact)}`}>
                {insight.impact === 'high' ? '高影响' : insight.impact === 'medium' ? '中影响' : '低影响'}
              </span>
            </div>
            <h3>{insight.title}</h3>
            {(insight.hotKeyword || insight.platform) && (
              <div className="analysis-data-row">
                {insight.hotKeyword && (
                  <div className="data-item">
                    <span className="data-label">热度词条</span>
                    <span className="data-value keyword">{insight.hotKeyword}</span>
                    {insight.keywordChange && (
                      <span className="data-change">{insight.keywordChange}</span>
                    )}
                  </div>
                )}
                {insight.platform && (
                  <div className="data-item">
                    <span className="data-label">平台</span>
                    <span className="data-value">{insight.platform}</span>
                    {insight.platformVolume && insight.platformVolume !== '-' && (
                      <>
                        <span className="data-volume">24h {insight.platformVolume}</span>
                        {insight.volumeChange && (
                          <span className={`data-change ${insight.volumeChange.startsWith('-') ? 'down' : ''}`}>
                            {insight.volumeChange}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
            <p>{insight.content}</p>
            {insight.recommendation && (
              <div className="analysis-recommendation">
                <span className="rec-label">VIZO 建议</span>
                <span className="rec-text">{insight.recommendation}</span>
              </div>
            )}
            <div className="analysis-footer">
              <span className="data-source">{insight.dataSource}</span>
              <div className="confidence-bar">
                <span className="confidence-label">置信度</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
                <span className="confidence-value">{insight.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* VIZO 专业建议 */}
      <div className="recommendations-section">
        <h3 className="section-title vizo-title">
          <span className="vizo-icon">VIZO</span> 专业建议 · 市场管理可执行方案
        </h3>
        <div className="recommendations-grid">
          {vizoRecommendations.map((rec) => (
            <div key={rec.id} className="recommendation-card">
              <div className="rec-header">
                <span className="rec-category">{rec.category}</span>
                <span className={`rec-priority priority-${rec.priority}`}>{rec.priority}优先级</span>
              </div>
              <h4>{rec.title}</h4>
              <p className="rec-content">{rec.content}</p>
              <div className="rec-action">
                <span className="action-label">建议动作</span>
                <span className="action-text">{rec.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnalysisPanel
