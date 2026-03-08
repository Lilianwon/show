import './PlaceholderPage.css'

export default function LeaderboardPage() {
  return (
    <div className="placeholder-page full-height">
      <h1 className="ph-title">Leaderboard Club</h1>
      <p className="ph-subtitle">Top 100 Performers in the VIZO Prediction Market</p>

      <div className="ph-tabs-row">
        <div className="ph-tabs">
          <button className="ph-tab active">Overall Ranking</button>
          <button className="ph-tab">Category Rankings</button>
        </div>
        <div className="ph-time-filters">
          <button className="ph-time active">7D</button>
          <button className="ph-time">30D</button>
          <button className="ph-time">90D</button>
        </div>
      </div>

      <div className="ph-empty-card">
        <div className="ph-empty-stars">✦ ✦ ✦</div>
        <h3 className="ph-empty-title">No content available for now</h3>
        <p className="ph-empty-desc">
          Discover trending markets, follow top predictors, and check back later.
        </p>
        <button className="ph-explore-btn">Explore</button>
      </div>
    </div>
  )
}
