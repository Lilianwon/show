import { useState } from 'react'
import Header from './components/Header'
import TrendingAlert from './components/TrendingAlert'
import SocialMediaPanel from './components/SocialMediaPanel'
import MarketsOverviewPanel from './components/MarketsOverviewPanel'
import AnalysisPanel from './components/AnalysisPanel'

export default function LegacyDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const focusSocial = () => setActiveTab('social')

  return (
    <div className="app">
      <Header />
      <TrendingAlert onFocusSocial={focusSocial} />
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          总览
        </button>
        <button
          className={`tab ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          社媒抓取
        </button>
        <button
          className={`tab ${activeTab === 'markets' ? 'active' : ''}`}
          onClick={() => setActiveTab('markets')}
        >
          市场数据
        </button>
        <button
          className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          自动分析
        </button>
      </nav>

      <main className="main-content">
        {(activeTab === 'overview' || activeTab === 'social') && (
          <SocialMediaPanel collapsed={activeTab !== 'social'} />
        )}
        {(activeTab === 'overview' || activeTab === 'markets') && (
          <MarketsOverviewPanel collapsed={activeTab !== 'markets'} />
        )}
        {(activeTab === 'overview' || activeTab === 'analysis') && (
          <AnalysisPanel collapsed={activeTab !== 'analysis'} />
        )}
      </main>
    </div>
  )
}
