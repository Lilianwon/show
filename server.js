/**
 * 本地开发 - Dune 代理 + 全网热点抓取
 * 热点抓取: /api/trends 从 Reddit、新闻 RSS 拉取实时数据
 */
import 'dotenv/config'
import { createServer } from 'http'
import { parse } from 'url'
import { fetchTrends } from './trendsFetcher.js'

const PORT = 3001

async function handle(req, res) {
  const { pathname, query } = parse(req.url, true)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  // 全网热点抓取 - 实时从 Reddit、新闻拉取
  if (req.method === 'GET' && pathname === '/api/trends') {
    try {
      const data = await fetchTrends()
      res.writeHead(200)
      res.end(JSON.stringify(data))
    } catch (e) {
      res.writeHead(500)
      res.end(JSON.stringify({ error: e.message }))
    }
    return
  }

  if (req.method !== 'GET' || pathname !== '/api/dune') {
    res.writeHead(404)
    res.end()
    return
  }
  const { queryId } = query
  if (!queryId) {
    res.writeHead(400)
    res.end(JSON.stringify({ error: '缺少 queryId' }))
    return
  }
  const key = process.env.DUNE_API_KEY
  if (!key) {
    res.writeHead(500)
    res.end(JSON.stringify({ error: '未配置 DUNE_API_KEY。运行: DUNE_API_KEY=你的key node server.js' }))
    return
  }
  try {
    const r = await fetch(`https://api.dune.com/api/v1/query/${queryId}/results?limit=1000`, {
      headers: { 'x-dune-api-key': key },
    })
    const data = await r.json()
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(r.ok ? 200 : r.status)
    res.end(JSON.stringify(data))
  } catch (e) {
    res.writeHead(500)
    res.end(JSON.stringify({ error: e.message }))
  }
}

createServer(handle).listen(PORT, () => {
  console.log(`API 运行在 http://localhost:${PORT} (Dune + /api/trends 热点抓取)`)
})
