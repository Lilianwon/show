import { useNavigate } from 'react-router-dom'
import './PMHeader.css'

export default function PMHeader({ onGoHome }) {
  const navigate = useNavigate()
  const handleLogoClick = () => {
    onGoHome?.()
    navigate('/', { replace: false })
  }
  return (
    <header className="pm-header">
      <button type="button" className="pm-logo pm-logo-btn" onClick={handleLogoClick} aria-label="返回首页">
        <img src="/logo.png" alt="VIZO" className="pm-logo-img" />
        <span className="pm-logo-text">VIZO</span>
      </button>
      <div className="pm-search-wrap">
        <span className="pm-search-icon">⌕</span>
        <input
          type="text"
          className="pm-search-input"
          placeholder="Q Search..."
        />
      </div>
      <button className="pm-connect-btn">Connect Wallet</button>
    </header>
  )
}
