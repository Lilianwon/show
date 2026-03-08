#!/bin/bash
cd "$(dirname "$0")"

echo "=========================================="
echo "       VIZO 预测市场行情监测"
echo "=========================================="
echo ""

# 首次运行自动安装依赖
if [ ! -d "node_modules" ]; then
  echo "首次运行，正在安装依赖（约 1 分钟）..."
  npm install
  echo ""
fi

# 后台：启动后弹出提示，引导在 Cursor 右侧打开
(sleep 5 && osascript -e 'display dialog "VIZO 已启动！\n\n在 Cursor 中按 Cmd+Shift+V 打开面板\n再按 Cmd+\\ 可放到右侧" with title "VIZO" buttons {"知道了"} default button 1') &

echo "正在启动（含热点抓取 API）..."
echo "在 Cursor 中按 Cmd+Shift+V 可在右侧打开面板"
echo "按 Ctrl+C 可停止服务"
echo ""

npm run dev:full
  