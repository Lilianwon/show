// 预测市场展示页 - 模拟数据（基于 2025 年 3 月全网热点，开发展示用）

// 热搜新闻：当下事件（前3为爆款，带🔥/标红标黄）
export const trendingNews = [
  { id: 'n1', title: '参议院通过 GENIUS 稳定币法案，18-6 委员会批准', summary: '美国参议院银行委员会 3 月 13 日以 18 票赞成、6 票反对通过 GENIUS 法案，为支付型稳定币建立联邦监管框架。Lummis、Scott 等两党议员推动，被视为加密行业在华盛顿的最大胜利。法案明确稳定币定义、准备金要求，禁止算法稳定币。', time: '1分钟前', volume: 95400, change: '+586%', level: '爆', isHot: true },
  { id: 'n2', title: '特朗普战略比特币储备生效，政府 20 万枚永不出售', summary: '特朗普 3 月 6 日签署行政令设立美国战略比特币储备，联邦政府持有的约 20 万枚比特币纳入储备且承诺永不出售。3 月 2 日特朗普进一步宣布 XRP、SOL、ADA 等将纳入储备讨论。3 月初比特币一度重返 9 万美元关口，瑞波涨 14%、索拉纳涨 11%、艾达涨 44%。', time: '5分钟前', volume: 87200, change: '+498%', level: '爆', isHot: true },
  { id: 'n3', title: '白宫首次加密货币峰会：特朗普称加密战争已结束', summary: '白宫 3 月 7 日首次举办加密货币峰会，约 30 名政府高官和行业领袖参会。特朗普表示上届政府对加密的「战争」已结束，支持国会立法提供监管确定性。特朗普政府已放弃数十起拜登时代对加密公司的诉讼，监管重点转向促进创新发展。', time: '15分钟前', volume: 68400, change: '+412%', level: '爆', isHot: true },
  { id: 'n4', title: 'Warren 警告：加密法案或让马斯克控制金融系统', summary: '参议员 Elizabeth Warren 在参议院银行业委员会表决前警告，加密立法可能便利非法行为并削弱经济稳定，或让马斯克等科技巨头「控制」金融系统。法案由 Lummis、Hagerty、Gillibrand、Scott 两党联合推出，行业政治支出达数亿美元推动。', time: '35分钟前', volume: 42800, change: '+286%', level: '热', isHot: false },
  { id: 'n5', title: '美国新加密监管框架：SEC 与 CFTC 分歧已明确', summary: '美国新加密货币监管框架已明确分类标准，解决了 SEC 与 CFTC 的监管职权分歧。沈建光分析认为，稳定币和更广泛的加密货币监管法案有望 2025 年出台，欧盟、英国、日本也在制定支持加密发展的监管框架。', time: '1小时前', volume: 31200, change: '+218%', level: '热', isHot: false },
  { id: 'n6', title: '比特币 3 月初过山车，24h 爆仓超 10 亿美元', summary: '受政策消息影响，3 月初比特币先跌破 8 万美元，特朗普宣布储备后暴涨超 10% 至 9.5 万美元，随后回落至 8.3 万下方。市场流动性不足导致价格对消息反应极端，24 小时内全网合约爆仓超 10 亿美元。', time: '2小时前', volume: 28500, change: '+196%', level: '热', isHot: false },
  { id: 'n7', title: 'Fed 3 月维持利率不变概率 96%，6 月或首次降息', summary: 'CME FedWatch 显示 Fed 3 月维持利率不变概率升至 96%，与市场预期一致。鲍威尔国会证词偏鹰，强调需更多通胀回落证据。市场普遍预期 6 月或开启首次降息。', time: '3小时前', volume: 19800, change: '+172%', level: '热', isHot: false },
  { id: 'n8', title: 'Bybit 遭史上最大黑客攻击，损失超 14 亿 ETH', summary: '加密货币交易所 Bybit 2 月遭史上最大规模黑客攻击，被盗 40-50 万枚以太坊。FBI 确认为朝鲜 Lazarus 组织所为。Bybit 称已全额补足客户损失，所有提款未受影响。', time: '4小时前', volume: 16800, change: '+156%', level: '热', isHot: false },
  { id: 'n9', title: '英伟达 GTC 3 月 18 日开幕，Blackwell 架构将发布', summary: '英伟达年度 GTC 大会 3 月 18 日开幕，将发布新一代 GPU 架构 Blackwell 及 B200 芯片。AI 芯片需求持续旺盛，供应链关注度提升。', time: '5小时前', volume: 14200, change: '+138%', level: '热', isHot: false },
  { id: 'n10', title: '霍尔木兹海峡油轮受阻，Brent 油价冲 $85', summary: '伊朗冲突扩大，海峡通行受阻。Brent 收 $85.41 +4.93% 创年内新高。伊拉克减产 150 万桶/日，保险战争险翻倍。高盛 Q2 预测 +$10。', time: '6小时前', volume: 12800, change: '+124%', level: '热', isHot: false },
  { id: 'n11', title: '欧盟 AI 法案正式生效，高风险应用严格监管', summary: '欧盟《人工智能法案》正式生效，对高风险 AI 应用实施严格监管。科技巨头需调整合规策略，开源模型生态面临新挑战。', time: '7小时前', volume: 11200, change: '+112%', level: '热', isHot: false },
  { id: 'n12', title: '英超积分榜：曼城领先 2 分，争冠白热化', summary: '曼城多赛一场领先 2 分，阿森纳、利物浦紧随其后。剩余 10 轮，争冠进入白热化。曼城赛程相对有利，但需应对多线作战。', time: '8小时前', volume: 9800, change: '+98%', level: '热', isHot: false },
  { id: 'n13', title: '日本央行 3 月会议，结束负利率存分歧', summary: '日本央行 3 月会议在即，市场对是否结束负利率存在分歧。日元波动加剧，套息交易平仓压力上升。', time: '9小时前', volume: 9200, change: '+88%', level: '热', isHot: false },
  { id: 'n14', title: '印度大选 4 月启动，莫迪寻求第三任期', summary: '印度大选将于 4 月拉开帷幕，莫迪领导的印人党寻求第三个任期。反对党联盟整合选票成关键，民调显示印人党领先。', time: '10小时前', volume: 8600, change: '+82%', level: '热', isHot: false },
  { id: 'n15', title: '特斯拉 Q1 交付或不及预期，中国市场竞争加剧', summary: '分析师下调特斯拉 Q1 交付预期，中国市场竞争加剧。马斯克称 Cybertruck 产能爬坡中，FSD 订阅增长放缓。', time: '11小时前', volume: 8000, change: '+76%', level: '热', isHot: false },
  { id: 'n16', title: 'SEC 推迟以太坊 ETF 至 5 月，ETH 短期承压', summary: '美国 SEC 将多家机构的以太坊现货 ETF 申请决议推迟至 5 月。市场观望情绪加重，ETH 短期承压。', time: '12小时前', volume: 7600, change: '+72%', level: '热', isHot: false },
]

// 分类筛选
export const categoryFilters = [
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'politics', label: 'Politics', icon: '📰' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'economy', label: 'Economy', icon: '💼' },
  { id: 'tech', label: 'Tech', icon: '📱' },
]

// 投票词条卡片 - 多页盘口（每页 16 个，共 64 个）
const CARDS_PER_PAGE = 16

export const votingCards = [
  // 第 1 页 - Crypto & 政策（与 2025 年 3 月热点对齐）
  { id: 'v1', title: 'GENIUS 稳定币法案年内签署生效', yesOdds: 72, noOdds: 28, volume: '$8.4M', relatedNews: ['n1', 'n5'], category: 'crypto', icon: '₮' },
  { id: 'v2', title: '美国战略比特币储备 20 万枚永不出售', yesOdds: 94, noOdds: 6, volume: '$12.2M', relatedNews: ['n2', 'n3'], category: 'crypto', icon: '₿' },
  { id: 'v3', title: 'XRP/SOL/ADA 纳入政府储备讨论', yesOdds: 68, noOdds: 32, volume: '$5.8M', relatedNews: ['n2'], category: 'crypto', icon: '💧' },
  { id: 'v4', title: 'Bybit 3 月底前完成客户全额赔付', yesOdds: 92, noOdds: 8, volume: '$3.1M', relatedNews: ['n8'], category: 'crypto', icon: '🛡' },
  { id: 'v5', title: 'Fed 3 月维持利率不变', yesOdds: 96, noOdds: 4, volume: '$169M', relatedNews: ['n7'], category: 'finance', icon: '💵' },
  { id: 'v6', title: 'BTC 月内重回 $95K', yesOdds: 38, noOdds: 62, volume: '$4.2M', relatedNews: ['n2', 'n6'], category: 'crypto', icon: '₿' },
  { id: 'v7', title: '国会通过更广泛加密监管法案', yesOdds: 58, noOdds: 42, volume: '$3.2M', relatedNews: ['n1', 'n3', 'n5'], category: 'politics', icon: '📜' },
  { id: 'v8', title: '特朗普政府撤销更多加密公司诉讼', yesOdds: 82, noOdds: 18, volume: '$2.1M', relatedNews: ['n3'], category: 'crypto', icon: '⚖' },
  { id: 'v9', title: '美联储 6 月首次降息', yesOdds: 58, noOdds: 42, volume: '$21M', relatedNews: ['n7'], category: 'finance', icon: '📉' },
  { id: 'v10', title: 'SOL 本周突破 $250', yesOdds: 48, noOdds: 52, volume: '$1.4M', relatedNews: ['n2'], category: 'crypto', icon: '◎' },
  { id: 'v11', title: '英超冠军：曼城夺冠', yesOdds: 68, noOdds: 32, volume: '$39.2M', relatedNews: ['n12'], category: 'sports', icon: '⚽' },
  { id: 'v12', title: 'Brent 油价 3 月底突破 $90', yesOdds: 48, noOdds: 52, volume: '$2.1M', relatedNews: ['n10'], category: 'economy', icon: '🛢' },
  { id: 'v13', title: 'Warren 阻挠 GENIUS 法案失败', yesOdds: 72, noOdds: 28, volume: '$680K', relatedNews: ['n1', 'n4'], category: 'politics', icon: '📰' },
  { id: 'v14', title: '日本央行 3 月结束负利率', yesOdds: 35, noOdds: 65, volume: '$1.5M', relatedNews: ['n13'], category: 'finance', icon: '¥' },
  { id: 'v15', title: '英伟达 GTC 发布 B200 芯片', yesOdds: 85, noOdds: 15, volume: '$6.2M', relatedNews: ['n9'], category: 'tech', icon: '🖥' },
  { id: 'v16', title: '欧盟 AI 法案年内触发大额罚款', yesOdds: 55, noOdds: 45, volume: '$980K', relatedNews: ['n11'], category: 'tech', icon: '🤖' },
  // 第 2 页
  { id: 'v17', title: '印度大选莫迪阵营获胜', yesOdds: 62, noOdds: 38, volume: '$5.3M', relatedNews: ['n14'], category: 'politics', icon: '🗳' },
  { id: 'v18', title: '特斯拉 Q1 交付超 42 万辆', yesOdds: 32, noOdds: 68, volume: '$3.8M', relatedNews: ['n15'], category: 'economy', icon: '🚗' },
  { id: 'v19', title: 'ADA 本周涨超 20%', yesOdds: 42, noOdds: 58, volume: '$1.6M', relatedNews: ['n2'], category: 'crypto', icon: '₳' },
  { id: 'v20', title: '以太坊现货 ETF 5 月获批', yesOdds: 38, noOdds: 62, volume: '$4.1M', relatedNews: ['n16', 'n3'], category: 'crypto', icon: 'Ξ' },
  { id: 'v21', title: '霍尔木兹海峡日通关 <50 艘', yesOdds: 42, noOdds: 58, volume: '$1.8M', relatedNews: ['n10'], category: 'economy', icon: '🚢' },
  { id: 'v22', title: '法国赢得 2026 世界杯', yesOdds: 18, noOdds: 82, volume: '$8.2M', relatedNews: ['n12'], category: 'sports', icon: '🏆' },
  { id: 'v23', title: 'Bybit 黑客资金 50% 被追回', yesOdds: 22, noOdds: 78, volume: '$620K', relatedNews: ['n8'], category: 'crypto', icon: '🕵' },
  { id: 'v24', title: 'BTC 单日波动率降至 3% 以下', yesOdds: 35, noOdds: 65, volume: '$480K', relatedNews: ['n6'], category: 'crypto', icon: '📊' },
  { id: 'v25', title: 'OpenAI 发布 GPT-5', yesOdds: 45, noOdds: 55, volume: '$2.9M', relatedNews: ['n9'], category: 'tech', icon: '🧠' },
  { id: 'v26', title: '伊拉克 3 月底产量 <300 万桶', yesOdds: 58, noOdds: 42, volume: '$720K', relatedNews: ['n10'], category: 'economy', icon: '🛢' },
  { id: 'v27', title: '阿根廷比索月内贬值超 15%', yesOdds: 62, noOdds: 38, volume: '$420K', relatedNews: [], category: 'economy', icon: '🇦🇷' },
  { id: 'v28', title: '苹果 3 月发布会推出 AI 功能', yesOdds: 72, noOdds: 28, volume: '$5.1M', relatedNews: ['n11'], category: 'tech', icon: '🍎' },
  { id: 'v29', title: '纳斯达克 3 月收涨', yesOdds: 55, noOdds: 45, volume: '$12M', relatedNews: ['n7'], category: 'finance', icon: '📈' },
  { id: 'v30', title: '英格兰板球胜印度系列赛', yesOdds: 48, noOdds: 52, volume: '$5.1M', relatedNews: [], category: 'sports', icon: '🏏' },
  { id: 'v31', title: 'XRP 本周突破 $0.65', yesOdds: 58, noOdds: 42, volume: '$1.3M', relatedNews: ['n2'], category: 'crypto', icon: '💧' },
  { id: 'v32', title: '金价 3 月突破 $2300/盎司', yesOdds: 65, noOdds: 35, volume: '$3.2M', relatedNews: ['n7', 'n10'], category: 'economy', icon: '🥇' },
  // 第 3 页
  { id: 'v33', title: '亚马逊 Q1 云业务增速超 15%', yesOdds: 68, noOdds: 32, volume: '$2.4M', relatedNews: ['n9'], category: 'tech', icon: '☁' },
  { id: 'v34', title: 'Meta 元宇宙部门年内盈利', yesOdds: 18, noOdds: 82, volume: '$890K', relatedNews: [], category: 'tech', icon: '🥽' },
  { id: 'v35', title: 'SpaceX 星舰第四次试飞成功', yesOdds: 75, noOdds: 25, volume: '$1.6M', relatedNews: [], category: 'tech', icon: '🚀' },
  { id: 'v36', title: 'Coinbase 股价月内涨超 20%', yesOdds: 52, noOdds: 48, volume: '$4.2M', relatedNews: ['n1', 'n3'], category: 'crypto', icon: '🔵' },
  { id: 'v37', title: '美联储年内降息至少 2 次', yesOdds: 62, noOdds: 38, volume: '$8.5M', relatedNews: ['n7'], category: 'finance', icon: '🏛' },
  { id: 'v38', title: '油价与 BTC 本周分化扩大', yesOdds: 55, noOdds: 45, volume: '$380K', relatedNews: ['n2', 'n10'], category: 'crypto', icon: '📊' },
  { id: 'v39', title: '切尔西夺得足总杯', yesOdds: 28, noOdds: 72, volume: '$2.1M', relatedNews: ['n12'], category: 'sports', icon: '⚽' },
  { id: 'v40', title: '美国 3 月非农就业超 25 万', yesOdds: 42, noOdds: 58, volume: '$1.9M', relatedNews: ['n7'], category: 'economy', icon: '📋' },
  { id: 'v41', title: 'Tether USDT 市值突破 $120B', yesOdds: 78, noOdds: 22, volume: '$820K', relatedNews: ['n1'], category: 'crypto', icon: '₮' },
  { id: 'v42', title: 'SEC 对 Ripple 诉讼被特朗普政府撤销', yesOdds: 68, noOdds: 32, volume: '$480K', relatedNews: ['n3'], category: 'crypto', icon: '⚖' },
  { id: 'v43', title: '人民币对美元跌破 7.25', yesOdds: 38, noOdds: 62, volume: '$1.2M', relatedNews: ['n13'], category: 'finance', icon: '¥' },
  { id: 'v44', title: '欧冠决赛皇马 vs 曼城', yesOdds: 45, noOdds: 55, volume: '$6.8M', relatedNews: ['n12'], category: 'sports', icon: '🏟' },
  { id: 'v45', title: 'Uniswap 单日交易量超 $5B', yesOdds: 38, noOdds: 62, volume: '$520K', relatedNews: ['n2', 'n6'], category: 'crypto', icon: '🦄' },
  { id: 'v46', title: '德国 DAX 创新高', yesOdds: 58, noOdds: 42, volume: '$2.1M', relatedNews: ['n7'], category: 'finance', icon: '🇩🇪' },
  { id: 'v47', title: 'NBA MVP 约基奇连庄', yesOdds: 65, noOdds: 35, volume: '$3.5M', relatedNews: [], category: 'sports', icon: '🏀' },
  { id: 'v48', title: 'DOGE 受马斯克推文影响涨超 20%', yesOdds: 42, noOdds: 58, volume: '$1.8M', relatedNews: [], category: 'crypto', icon: '🐕' },
  // 第 4 页
  { id: 'v49', title: '特朗普 3 月 X 粉丝破 1 亿', yesOdds: 85, noOdds: 15, volume: '$320K', relatedNews: ['n2', 'n3'], category: 'politics', icon: '📱' },
  { id: 'v50', title: '谷歌 Gemini 超越 GPT-4 benchmark', yesOdds: 35, noOdds: 65, volume: '$1.1M', relatedNews: ['n11'], category: 'tech', icon: '🤖' },
  { id: 'v51', title: '比特币减半后算力下降超 10%', yesOdds: 28, noOdds: 72, volume: '$580K', relatedNews: [], category: 'crypto', icon: '⛏' },
  { id: 'v52', title: '欧盟对苹果开出 50 亿欧元罚单', yesOdds: 22, noOdds: 78, volume: '$2.2M', relatedNews: ['n11'], category: 'tech', icon: '🍎' },
  { id: 'v53', title: '美国 3 月 CPI 同比低于 3%', yesOdds: 48, noOdds: 52, volume: '$4.5M', relatedNews: ['n7'], category: 'economy', icon: '📊' },
  { id: 'v54', title: 'Netflix 订阅用户破 3 亿', yesOdds: 68, noOdds: 32, volume: '$1.3M', relatedNews: [], category: 'tech', icon: '🎬' },
  { id: 'v55', title: 'Lazarus 组织再发动重大攻击', yesOdds: 35, noOdds: 65, volume: '$290K', relatedNews: ['n8'], category: 'crypto', icon: '🕵' },
  { id: 'v56', title: '标普 500 月内创新高', yesOdds: 58, noOdds: 42, volume: '$18M', relatedNews: ['n7'], category: 'finance', icon: '📈' },
  { id: 'v57', title: '英超金靴哈兰德卫冕', yesOdds: 72, noOdds: 28, volume: '$4.2M', relatedNews: ['n12'], category: 'sports', icon: '⚽' },
  { id: 'v58', title: '链上稳定币供应量突破 $180B', yesOdds: 82, noOdds: 18, volume: '$480K', relatedNews: ['n1'], category: 'crypto', icon: '💵' },
  { id: 'v59', title: '澳大利亚央行 3 月降息', yesOdds: 25, noOdds: 75, volume: '$620K', relatedNews: [], category: 'finance', icon: '🇦🇺' },
  { id: 'v60', title: 'F1 澳大利亚站维斯塔潘夺冠', yesOdds: 82, noOdds: 18, volume: '$2.1M', relatedNews: [], category: 'sports', icon: '🏎' },
  { id: 'v61', title: '香港批准更多虚拟资产 ETF', yesOdds: 68, noOdds: 32, volume: '$1.5M', relatedNews: ['n1', 'n3'], category: 'crypto', icon: '🇭🇰' },
  { id: 'v62', title: '微软 Copilot 付费用户破 500 万', yesOdds: 55, noOdds: 45, volume: '$920K', relatedNews: ['n9'], category: 'tech', icon: '💻' },
  { id: 'v63', title: 'OPEC+ 4 月维持减产', yesOdds: 78, noOdds: 22, volume: '$1.8M', relatedNews: ['n10'], category: 'economy', icon: '🛢' },
  { id: 'v64', title: '美联储 2025 年不加息', yesOdds: 92, noOdds: 8, volume: '$12M', relatedNews: ['n7'], category: 'finance', icon: '🏛' },
]

export { CARDS_PER_PAGE }

// 根据新闻ID获取关联盘口
export function getMarketsByNewsId(newsId) {
  return votingCards.filter(card => card.relatedNews.includes(newsId))
}

// 根据卡片ID获取详情
export function getEventDetail(cardId) {
  const card = votingCards.find(c => c.id === cardId)
  if (!card) return null
  return {
    ...card,
    tradingVolume: card.volume,
    aiSummary: '基于当下新闻与市场情绪，当前投票倾向偏向「是」方。建议结合相关新闻事件（如 Fed 决议、地缘局势、民调数据、加密政策等）综合判断，关注关键时间节点与资金流向。',
    aiAnalysis: '技术面：关键价位附近形成支撑或阻力。基本面：需结合最新新闻动态评估。情绪面：市场情绪与新闻热度高度相关，可参考热搜趋势辅助投票决策。监管面：美国加密政策转向友好，长期利好行业。',
    winRate: { yes: card.yesOdds, no: 100 - card.yesOdds },
    chartData: [
      { time: '3/1', yes: Math.max(30, card.yesOdds - 8), no: 100 - Math.max(30, card.yesOdds - 8) },
      { time: '3/2', yes: Math.max(35, card.yesOdds - 5), no: 100 - Math.max(35, card.yesOdds - 5) },
      { time: '3/3', yes: Math.max(38, card.yesOdds - 3), no: 100 - Math.max(38, card.yesOdds - 3) },
      { time: '3/4', yes: card.yesOdds - 2, no: 100 - (card.yesOdds - 2) },
      { time: '3/5', yes: card.yesOdds - 1, no: 100 - (card.yesOdds - 1) },
      { time: '3/6', yes: card.yesOdds, no: 100 - card.yesOdds },
    ],
  }
}
