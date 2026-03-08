import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import './VerticalNav.css'

const navItems = [
  { path: '/news', label: 'News', expandOnClick: true },
  { path: '/markets', label: 'Markets' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/lp-reward', label: 'LP Reward' },
  { path: '/airdrop', label: 'Airdrop' },
]

export default function VerticalNav({ onNewsClick, onGoHome }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogoClick = () => {
    onGoHome?.()
    navigate('/', { replace: false })
  }

  const isHome = location.pathname === '/' || location.pathname === '/news'

  return (
    <nav className="vertical-nav">
      <button type="button" className="nav-logo" onClick={handleLogoClick} aria-label="返回首页">
        <img src="/logo.png" alt="VIZO" className="nav-logo-img" />
      </button>
      <ul className="nav-list">
        {navItems.map(({ path, label, expandOnClick }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `nav-link ${isActive || (path === '/news' && isHome) ? 'active' : ''}`
              }
              onClick={expandOnClick ? () => onNewsClick?.() : undefined}
            >
              <span className="nav-dot"></span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-footer">
        <span className="live-dot"></span>
        <span>Live</span>
      </div>
    </nav>
  )
}
