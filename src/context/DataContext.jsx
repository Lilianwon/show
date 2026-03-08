import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { fetchRealtimeData } from '../data/dataService'

const DataContext = createContext(null)

const REFRESH_INTERVAL = 30000 // 30 秒自动刷新

export function DataProvider({ children }) {
  const [data, setData] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      const result = await fetchRealtimeData()
      setData(result)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // 首次加载
  useEffect(() => {
    refresh()
  }, [refresh])

  // 定时自动刷新
  useEffect(() => {
    const timer = setInterval(refresh, REFRESH_INTERVAL)
    return () => clearInterval(timer)
  }, [refresh])

  return (
    <DataContext.Provider value={{ data, lastUpdated, isRefreshing, error, refresh }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
