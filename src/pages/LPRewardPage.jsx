import './PlaceholderPage.css'

export default function LPRewardPage() {
  return (
    <div className="placeholder-page full-height lp-reward-layout">
      <div className="lp-main">
        <div className="lp-card">
          <h2 className="lp-card-title">Unlock Market Making Access</h2>
          <p className="lp-card-desc">
            Complete a cumulative trading volume of $100 to permanently unlock Market Maker access and start earning points. One-time requirement. No re-lock after activation.
          </p>
          <div className="lp-volume-row">
            <span className="lp-volume-label">Cumulative Trading Volume:</span>
            <span className="lp-volume-value">$0.00 / $0.00</span>
          </div>
          <div className="lp-progress-wrap">
            <div className="lp-progress-bar" style={{ width: '0%' }} />
          </div>
          <span className="lp-progress-pct">NaN%</span>

          <div className="lp-rules">
            <div className="lp-rules-header">
              <span className="lp-info-icon">ⓘ</span>
              <span>Scoring Rules</span>
            </div>
            <p className="lp-rules-desc">
              Includes eligible trades across all markets. Canceled or reverted orders are excluded. Data updates in real time.
            </p>
            <div className="lp-rule-tags">
              <span className="lp-tag">Visible Maker Points</span>
              <span className="lp-tag">Trade 10+ contracts</span>
              <span className="lp-tag">Monthly Volume ≥ $500 → 2x Points</span>
              <span className="lp-tag">Points Accrue After 120s</span>
              <span className="lp-tag">Daily Settlement - Monthly Token Redemption</span>
            </div>
          </div>
          <button className="lp-boost-btn">Boost Trading Volume</button>
        </div>

        <div className="lp-card lp-partner-card">
          <div className="lp-partner-icon">◇ ◇ ◇ ◇</div>
          <h2 className="lp-card-title">Recruiting Strategic Market Making Partners</h2>
          <p className="lp-card-desc">
            Partner with VIZO to build long-term liquidity. Enjoy tiered rebates with up to 18% optimized returns, audit-ready incentives, and priority compliance access. We welcome institutions and professional trading teams to join us as core market making partners.
          </p>
          <p className="lp-contact">
            Official Contact: <a href="mailto:BD@vizo.exchange">BD@vizo.exchange</a>
          </p>
        </div>
      </div>

      <aside className="lp-sidebar">
        <div className="lp-benefits-card">
          <h3 className="lp-benefits-title">Current Benefits Overview</h3>
          <div className="lp-benefit-item">
            <span className="lp-benefit-label">Today's Points Earned</span>
            <span className="lp-benefit-value">(Syncing)</span>
          </div>
          <div className="lp-benefit-item">
            <span className="lp-benefit-label">Market VIX</span>
            <span className="lp-benefit-value">lock</span>
          </div>
          <div className="lp-benefit-item">
            <span className="lp-benefit-label">Points Multiplier Boost</span>
            <span className="lp-benefit-value">Not Activated</span>
          </div>
          <div className="lp-benefit-item">
            <span className="lp-benefit-label">Order Cancellation Rate</span>
            <span className="lp-benefit-value">0%(Normal)</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
