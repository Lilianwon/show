import { useData } from '../context/DataContext'
import './TrendingAlert.css'

function TrendingAlert({ onFocusSocial }) {
  const { data } = useData()
  const topHot = data?.trendingSearches?.slice(0, 8) ?? []

  if (topHot.length === 0) return null

  return (
    <div className="trending-alert-bar">
      <span className="alert-label">
        <span className="pulse-dot"></span>
        热搜飙升 · 需立马知晓
      </span>
      <div className="alert-items">
        {topHot.map((item) => (
          <span key={item.id} className={`alert-item level-${item.level}`}>
            {item.keyword}
            <span className="item-change">{item.change}</span>
          </span>
        ))}
      </div>
      <button className="view-detail-btn" onClick={onFocusSocial}>
        查看详情 →
      </button>
    </div>
  )
}

export default TrendingAlert
