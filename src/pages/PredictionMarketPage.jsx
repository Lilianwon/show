import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import PMHeader from '../components/prediction-market/PMHeader'
import ActivityBanner from '../components/prediction-market/ActivityBanner'
import VerticalNav from '../components/prediction-market/VerticalNav'
import NewsBar from '../components/prediction-market/NewsBar'
import VotingCards from '../components/prediction-market/VotingCards'
import NewsDetailPanel from '../components/prediction-market/NewsDetailPanel'
import CardDetailPanel from '../components/prediction-market/CardDetailPanel'
import MarketsPage from './MarketsPage'
import LeaderboardPage from './LeaderboardPage'
import LPRewardPage from './LPRewardPage'
import AirdropPage from './AirdropPage'
import './PredictionMarketPage.css'

function NewsContent({ newsExpanded, onNewsClose }) {
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)
  const isExpanded = newsExpanded

  const handleNewsClick = (news) => {
    setSelectedNews(news)
  }

  return (
    <>
      <ActivityBanner onCardClick={setSelectedCard} />
      <div className={`pm-three-columns ${isExpanded && !selectedNews ? 'news-expanded' : ''} ${selectedNews ? 'has-detail' : ''} ${selectedCard ? 'card-detail' : ''}`}>
        <aside className={`pm-col-news ${isExpanded ? 'expanded' : ''} ${selectedCard ? 'hidden' : ''}`}>
          {isExpanded && (
            <button
              className="news-close-btn"
              onClick={onNewsClose}
              aria-label="关闭"
            >
              ×
            </button>
          )}
          <NewsBar
            isExpanded={isExpanded}
            onNewsSelect={handleNewsClick}
            activeNewsId={selectedNews?.id}
          />
        </aside>
        <section className={`pm-col-cards ${isExpanded && !selectedNews ? 'hidden' : ''}`}>
          {selectedCard ? (
            <CardDetailPanel
              card={selectedCard}
              onClose={() => setSelectedCard(null)}
            />
          ) : selectedNews ? (
            <NewsDetailPanel
              news={selectedNews}
              onClose={() => setSelectedNews(null)}
              onCardSelect={setSelectedCard}
            />
          ) : (
            <VotingCards onCardSelect={setSelectedCard} />
          )}
        </section>
      </div>
    </>
  )
}

export default function PredictionMarketPage() {
  const [newsExpanded, setNewsExpanded] = useState(false)

  const handleNewsExpand = () => {
    setNewsExpanded(true)
  }

  const handleNewsClose = () => setNewsExpanded(false)

  return (
    <div className="prediction-market-page">
      <VerticalNav onNewsClick={handleNewsExpand} onGoHome={handleNewsClose} />
      <div className={`pm-content-wrap ${newsExpanded ? 'news-full-width' : ''}`}>
        <PMHeader onGoHome={handleNewsClose} />
        <main className="pm-main">
          <Routes>
            <Route path="/" element={<NewsContent newsExpanded={newsExpanded} onNewsClose={handleNewsClose} />} />
            <Route path="/news" element={<NewsContent newsExpanded={newsExpanded} onNewsClose={handleNewsClose} />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/lp-reward" element={<LPRewardPage />} />
            <Route path="/airdrop" element={<AirdropPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}