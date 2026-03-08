import { useState, useMemo } from 'react'
import { votingCards } from '../data/predictionMarketData'
import CardDetailPanel from '../components/prediction-market/CardDetailPanel'
import ActivityBanner from '../components/prediction-market/ActivityBanner'
import './MarketsPage.css'

const CARDS_PER_PAGE = 12

const CATEGORIES = [
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'games', label: 'Games', icon: '🎮' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'politics', label: 'Politics', icon: '🏛' },
  { id: 'economy', label: 'Economy', icon: '📊' },
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'stock', label: 'Stock', icon: '📈' },
]

export default function MarketsPage() {
  const [activeCategory, setActiveCategory] = useState('trending')
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(votingCards.length / CARDS_PER_PAGE)
  const displayCards = useMemo(() => {
    const start = (currentPage - 1) * CARDS_PER_PAGE
    return votingCards.slice(start, start + CARDS_PER_PAGE)
  }, [currentPage])

  const featuredCard = votingCards[1] // Fed 3月
  const worldCupCountries = [
    { flag: '🇫🇷', name: 'France', label: 'France:2026 FIFA World Cup...' },
    { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England', label: 'England:2026 FIFA World Cup...' },
    { flag: '🇪🇸', name: 'Spain', label: 'Spain:2026 FIFA World Cup...' },
  ]

  return (
    <div className="markets-page">
      {selectedCard ? (
        <div className="markets-detail-wrap">
          <CardDetailPanel
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        </div>
      ) : (
        <>
      <ActivityBanner onCardClick={setSelectedCard} />
      <div className="markets-featured-row">
        <div className="featured-card btc-card" onClick={() => setSelectedCard(featuredCard)}>
          <div className="featured-header">
            <span className="featured-icon btc">₿</span>
            <span className="featured-title">
              Will the price of Bitcoin exceed $150,000 before...
            </span>
            <span className="market-closes">Market Closes In: 298d:10h:51m:23s</span>
          </div>
          <div className="featured-body">
            <div className="featured-options">
              <div className="opt-row">
                <span className="opt-dot yes">•</span>
                <span>Yes</span>
                <span className="opt-pct">{featuredCard.yesOdds}%</span>
                <button className="opt-buy">Buy</button>
              </div>
              <div className="opt-row">
                <span className="opt-dot no">•</span>
                <span>No</span>
                <span className="opt-pct">{100 - featuredCard.yesOdds}%</span>
                <button className="opt-buy">Buy</button>
              </div>
            </div>
            <div className="featured-chart">
              <div className="chart-placeholder">
                <div className="chart-line" />
                <div className="chart-mid" />
              </div>
            </div>
          </div>
          <div className="featured-footer">
            <span className="featured-value">$100161</span>
            <span className="featured-link">&lt; Will Supergroup hit $1008 market</span>
          </div>
        </div>

        <div className="featured-card worldcup-card">
          <div className="wc-image">
            <span className="wc-badge">NEYMAR 10</span>
            <span className="wc-title">World Cup 2026</span>
          </div>
          <div className="wc-list">
            {worldCupCountries.map((c) => (
              <div key={c.name} className="wc-item">
                <span className="wc-flag">{c.flag}</span>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
          <button className="wc-unlock">Unlock World Cup Predictions →</button>
        </div>
      </div>

      <div className="markets-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <div className="markets-grid-section">
        <div className="markets-grid">
          {displayCards.map((card) => (
            <button
              key={card.id}
              className="market-card"
              onClick={() => setSelectedCard(card)}
            >
              <div className="mc-header">
                <span className="mc-icon">{card.icon || '◇'}</span>
                <span className="mc-title">{card.title}</span>
              </div>
              <div className="mc-odds">
                <span className="mc-yes">• Yes {card.yesOdds}%</span>
                <span className="mc-no">• No {card.noOdds}%</span>
              </div>
              <div className="mc-actions">
                <button className="mc-btn yes">Yes</button>
                <button className="mc-btn no">No</button>
              </div>
              <span className="mc-value">{card.volume}</span>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="markets-pagination">
            <button
              className="markets-page-btn prev"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="上一页"
            >
              ‹
            </button>
            <div className="markets-page-nums">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`markets-page-num ${currentPage === p ? 'active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              className="markets-page-btn next"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="下一页"
            >
              ›
            </button>
          </div>
        )}
      </div>
        </>
      )}
    </div>
  )
}
