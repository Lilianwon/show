import { useState, useEffect } from 'react'
import { votingCards, categoryFilters, CARDS_PER_PAGE } from '../../data/predictionMarketData'
import './VotingCards.css'

export default function VotingCards({ onCardSelect }) {
  const [activeCategory, setActiveCategory] = useState('trending')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCards = activeCategory === 'trending'
    ? votingCards
    : votingCards.filter(card => card.category === activeCategory)

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / CARDS_PER_PAGE))
  const startIdx = (currentPage - 1) * CARDS_PER_PAGE
  const pageCards = filteredCards.slice(startIdx, startIdx + CARDS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const renderPageNumbers = () => {
    const maxVisible = 7
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
    const pages = []
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <section className="voting-cards-section">
      <div className="category-filters">
        {categoryFilters.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>
      <div className="voting-cards-scroll">
        <div className="voting-cards-grid">
          {pageCards.map((card) => (
            <button
              key={card.id}
              className="voting-card"
              onClick={() => onCardSelect?.(card)}
            >
              <div className="card-header">
                <div className="card-icon-wrap">
                  <span className="card-icon">{card.icon}</span>
                </div>
                <h3 className="card-title">{card.title}</h3>
              </div>
              <div className="card-options">
                <span className="opt-yes"><span className="opt-dot yes"></span> Yes {card.yesOdds}%</span>
                <span className="opt-no"><span className="opt-dot no"></span> No {card.noOdds}%</span>
              </div>
              <div className="card-actions">
                <span className="card-btn yes">Yes</span>
                <span className="card-btn no">No</span>
              </div>
              <div className="card-volume">{card.volume}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="voting-pagination">
        <button
          className="page-btn prev"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="上一页"
        >
          ‹
        </button>
        <div className="page-numbers">
          {renderPageNumbers().map((p) => (
            <button
              key={p}
              className={`page-num ${currentPage === p ? 'active' : ''}`}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          className="page-btn next"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="下一页"
        >
          ›
        </button>
      </div>
    </section>
  )
}
