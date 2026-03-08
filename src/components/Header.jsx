import { useData } from '../context/DataContext'
import './Header.css'

function Header() {
  const { lastUpdated, isRefreshing, refresh } = useData()

  const formatTime = (date) => {
    if (!date) return ''
    const sec = Math.floor((Date.now() - date.getTime()) / 1000)
    if (sec < 10) return '刚刚'
    if (sec < 60) return `${sec}秒前`
    if (sec < 3600) return `${Math.floor(sec / 60)}分钟前`
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <header className="header">
      <div className="header-brand">
        <span className="logo">VIZO</span>
        <span className="tagline">预测市场行情监测</span>
        <span className="china-time">中国时间 3月6日 19:39</span>
      </div>
      <div className="header-status">
        <span className={`status-dot ${isRefreshing ? 'refreshing' : ''}`}></span>
        <span className="status-text">
          {isRefreshing ? '更新中...' : '实时追踪中'}
        </span>
        {lastUpdated && (
          <span className="last-updated">· 上次更新 {formatTime(lastUpdated)}</span>
        )}
        <button
          className="refresh-btn"
          onClick={refresh}
          disabled={isRefreshing}
          title="手动刷新"
        >
          {isRefreshing ? '⏳' : '🔄'}
        </button>
      </div>
    </header>
  )
}

export default Header
