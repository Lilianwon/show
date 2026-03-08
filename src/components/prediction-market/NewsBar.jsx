import { useState, useEffect, useRef } from 'react'
import { trendingNews } from '../../data/predictionMarketData'
import './NewsBar.css'

// 模拟实时更新：每 6 秒轮换一条新闻，模拟热搜实时刷新
function useLiveNews() {
  const [news, setNews] = useState(trendingNews)
  useEffect(() => {
    const timer = setInterval(() => {
      setNews(prev => {
        const arr = [...prev]
        const last = arr.pop()
        arr.unshift(last)
        return arr
      })
    }, 6000)
    return () => clearInterval(timer)
  }, [])
  return news
}

export default function NewsBar({ isExpanded, onNewsSelect, activeNewsId }) {
  const liveNews = useLiveNews()
  const [searchQuery, setSearchQuery] = useState('')
  const activeRef = useRef(null)

  useEffect(() => {
    if (activeNewsId && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeNewsId])

  const handleNewsClick = (item) => {
    onNewsSelect?.(item)
  }

  const filteredNews = liveNews.filter((item) =>
    !searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  // 首页只显示前 6 条，展开时显示全部
  const displayNews = isExpanded ? filteredNews : filteredNews.slice(0, 6)

  return (
    <section className={`news-bar ${isExpanded ? 'news-bar-expanded' : ''}`}>
      <div className="news-bar-header">
        {isExpanded && (
          <p className="news-archive-label">历史新闻积累 · 按时间倒序</p>
        )}
        <div className="news-search-row">
          <div className="news-search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="news-search-input"
              placeholder="检索新闻、热搜词条..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="news-label">
            <span className="pulse-dot"></span>
            热搜飙升 · 实时更新
          </span>
        </div>
      </div>
      <div className={isExpanded ? 'news-list-expanded' : 'news-list'}>
        {displayNews.map((item, idx) => (
          isExpanded ? (
            <div
              key={item.id}
              ref={activeNewsId === item.id ? activeRef : null}
              className={`news-row ${item.isHot ? 'hot' : ''} ${idx < 3 ? 'top3' : ''} ${activeNewsId === item.id ? 'active' : ''}`}
              onClick={() => handleNewsClick(item)}
            >
              <div className="news-row-main">
                {idx < 3 && <span className="fire">🔥</span>}
                <div className="news-row-content">
                  <h4 className="news-row-title">{item.title}</h4>
                  {item.summary && (
                    <p className="news-row-summary">{item.summary}</p>
                  )}
                  <div className="news-row-meta">
                    <span className="news-row-time">{item.time || ''}</span>
                    <span className={`news-row-change ${item.level === '爆' ? 'level-bao' : 'level-hot'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <span className="news-row-arrow">→ 去投票</span>
              </div>
            </div>
          ) : (
            <button
              key={item.id}
              ref={activeNewsId === item.id ? activeRef : null}
              className={`news-item ${item.isHot ? 'hot' : ''} ${idx < 3 ? 'top3' : ''} ${activeNewsId === item.id ? 'active' : ''}`}
              onClick={() => handleNewsClick(item)}
            >
              {idx < 3 && <span className="fire">🔥</span>}
              <span className="news-title">{item.title}</span>
              <span className={`news-change ${item.level === '爆' ? 'level-bao' : 'level-hot'}`}>
                {item.change}
              </span>
            </button>
          )
        ))}
      </div>

    </section>
  )
}
