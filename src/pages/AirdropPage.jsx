import './PlaceholderPage.css'

export default function AirdropPage() {
  return (
    <div className="placeholder-page full-height">
      <div className="airdrop-card">
        <h1 className="ph-title">VIZO Token Claim Coming Soon</h1>
        <ul className="airdrop-rules">
          <li>Claim eligibility resets monthly. Unused claims do not roll over.</li>
          <li>Participate in staking to unlock additional claim attempts.</li>
          <li>Every 1,000 Points can be redeemed for VIZO Tokens.</li>
        </ul>
        <div className="airdrop-attempts-row">
          <span className="airdrop-attempts-label">Claim Attempts:</span>
          <span className="airdrop-attempts-value">0</span>
        </div>
        <p className="airdrop-hint">
          Greyed-out cards indicate future months that are not yet available. The current month may display "Points Updating."
        </p>
        <p className="airdrop-hint">
          You may select any available month to claim tokens.
        </p>
        <button className="ph-explore-btn airdrop-stake-btn">Stake to Unlock More Claims</button>
      </div>
      <p className="airdrop-footer">My Points Card</p>
    </div>
  )
}
