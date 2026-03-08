import { useEffect } from 'react'
import './MarketPopup.css'

export default function MarketPopup({ news, markets, onClose, onCardClick }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleCardClick = (card) => {
    onCardClick?.(card)
    onClose()
  }

  return (
    <div className="market-popup-overlay" onClick={onClose}>
      <div className="market-popup" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="关闭">×</button>
        <h3 className="popup-title">
          <span className="popup-news-label">关联新闻</span>
          {news.title}
        </h3>
        <p className="popup-subtitle">关联盘口投票</p>
        <div className="popup-markets">
          {markets.length > 0 ? (
            markets.map((card) => (
              <button
                key={card.id}
                className="popup-market-card"
                onClick={() => handleCardClick(card)}
              >
                <span className="popup-card-odds">{card.yesOdds}% Yes</span>
                <span className="popup-card-title">{card.title}</span>
                <span className="popup-card-volume">{card.volume}</span>
              </button>
            ))
          ) : (
            <p className="popup-empty">暂无关联盘口</p>
          )}
        </div>
      </div>
    </div>
  )
}
