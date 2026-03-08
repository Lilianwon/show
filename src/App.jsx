import { Routes, Route } from 'react-router-dom'
import PredictionMarketPage from './pages/PredictionMarketPage'
import LegacyDashboard from './LegacyDashboard'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/legacy" element={<LegacyDashboard />} />
        <Route path="/*" element={<PredictionMarketPage />} />
      </Routes>
    </div>
  )
}

export default App
