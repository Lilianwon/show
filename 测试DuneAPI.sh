#!/bin/bash
# 测试 6 个平台的 Dune API 是否正常
# 用法：先 source .env 或 export DUNE_API_KEY=你的key，再运行 ./测试DuneAPI.sh

cd "$(dirname "$0")"
source .env 2>/dev/null || true

if [ -z "$DUNE_API_KEY" ] || [ "$DUNE_API_KEY" = "your_dune_api_key_here" ]; then
  echo "❌ 请先在 .env 中填入 DUNE_API_KEY"
  exit 1
fi

echo "测试 Dune API（6 个平台）..."
echo ""

for name in "Polymarket:5802915" "Kalshi:5802836" "Opinion:6047958" "Myriad:5756303" "Predict:6365667" "IBKR ForecastEx:6536996"; do
  platform="${name%%:*}"
  id="${name##*:}"
  code=$(curl -s -o /dev/null -w "%{http_code}" -H "x-dune-api-key: $DUNE_API_KEY" "https://api.dune.com/api/v1/query/${id}/results?limit=1000")
  if [ "$code" = "200" ]; then
    echo "✅ $platform (query $id): OK"
  else
    echo "❌ $platform (query $id): HTTP $code"
  fi
done

echo ""
echo "测试完成。若全部 OK，运行 npm run dev:full 后图表应能正常加载。"
