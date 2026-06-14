#!/usr/bin/env bash
# v2.0.B.299: Telegram 通知 — session 跑完 (Stop hook) 推一則到你的 Telegram。
# 完全靜默除非環境有設 TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID。
# token 放在「遠端環境的 env 設定」(不進 repo,不外洩)。
set -e
[ -z "${TELEGRAM_BOT_TOKEN:-}" ] && exit 0
[ -z "${TELEGRAM_CHAT_ID:-}" ] && exit 0

# 取最後一個 commit 標題當「做了什麼」摘要 (像 cron 帶重點)
repo_dir="$(cd "$(dirname "$0")/.." && pwd)"
last="$(git -C "$repo_dir" log -1 --pretty='%s' 2>/dev/null | head -c 200 || true)"

msg="✅ Pickup 這邊跑完了
${last:-(session 完成)}
→ 回 Claude session 看細節"

curl -s -m 10 -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=${msg}" >/dev/null 2>&1 || true
exit 0
