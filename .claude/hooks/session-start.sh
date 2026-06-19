#!/bin/bash
# SessionStart hook — 預裝依賴,讓 Claude Code on the web 開場就能跑 tsc/vitest/build。
# 容器 state 在 hook 完成後會被快取,所以這只在「冷容器」真正裝一次。
set -euo pipefail

# 只在遠端環境(Claude Code on the web)跑;本機開發不干擾。
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# 已有 node_modules 就跳過(idempotent,resume/clear/compact 不重裝)。
if [ -d node_modules ] && [ -f node_modules/.package-lock.json ]; then
  echo "deps already present — skip install"
  exit 0
fi

# 用 npm install(非 ci):容器快取友善,且 lockfile 在時行為一致。
npm install --no-audit --no-fund
