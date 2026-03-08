import { useState, useEffect, useCallback } from 'react'
import { votingCards } from '../../data/predictionMarketData'
import './ActivityBanner.css'

const ADDR_PREFIXES = ['0x3f2', '0x7a1', '0x9bc', '0x2e4', '0x5d8', '0x1f6', '0x8c3', '0x4b9']
const ADDR_SUFFIXES = ['1a9', '4c2', '7e5', '2b8', '9d1', '3f6', '5a4', '8c7']
const LARGE_AMOUNTS = ['$42K', '$85K', '$125K', '$210K', '$68K', '$156K', '$92K', '$380K']

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

function pickNotification() {
  const card = rand(votingCards)
  const type = Math.random() < 0.6 ? 'large' : 'surge'
  if (type === 'large') {
    const addr = `${rand(ADDR_PREFIXES)}...${rand(ADDR_SUFFIXES)}`
    const side = Math.random() < 0.5 ? 'Yes' : 'No'
    const amount = rand(LARGE_AMOUNTS)
    return {
      type: 'large',
      text: `${addr} 对「${card.title}」大额下注 ${amount} ${side}`,
      card,
    }
  }
  const count = randInt(120, 2850)
  return {
    type: 'surge',
    text: `「${card.title}」下注激增，今日 +${count.toLocaleString()} 人`,
    card,
  }
}

export default function ActivityBanner({ onCardClick }) {
  const [current, setCurrent] = useState(() => pickNotification())

  const refresh = useCallback(() => {
    setCurrent(pickNotification())
  }, [])

  useEffect(() => {
    const id = setInterval(refresh, 5000)
    return () => clearInterval(id)
  }, [refresh])

  const handleClick = () => {
    if (current?.card && onCardClick) onCardClick(current.card)
  }

  if (!current) return null

  return (
    <button
      type="button"
      className={`activity-banner ${current.type}`}
      onClick={handleClick}
      aria-label={`跳转到盘口：${current.card?.title || ''}`}
    >
      <span className="banner-icon">{current.type === 'large' ? '💰' : '📈'}</span>
      <span className="banner-text">{current.text}</span>
    </button>
  )
}
