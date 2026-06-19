# 拾光 Pickup — 自動修復分級 (auto-fix tiers) — single source

> 2026-06-19 · cron self-healing Phase 2 啟用。cron 依此表決定哪類自己修、哪類只報告。
> 母方案: `docs/strategy/2026-06-19-auto-fix-cron-plan.md`。

## 分級表

| Tier | 類型 (例) | 自主等級 | cron 動作 |
|------|----------|---------|-----------|
| 🟢 **A 機械式** | 標點正規化 / emoji 輪替去重 / 空白格式 / 明確 1:1 文字替換 / schema 補欄位 | AUTONOMOUS | 自動修 → 過 gate → **直接 commit + merge master** |
| 🟡 **B 內容改寫** | 干擾項反鏡像改寫 / paraphrase / 微文案 | IN-FORM | 自動修 → 過 gate → **開 PR**(CI 綠 auto-merge) |
| 🔴 **C 結構/判斷** | 跨多題模板重設計 / schema 改 / ARCH-REC / 動標準 / 大重構 | APPROVE_FIRST | **只寫 audit md + 通知**, 人決定 |
| ⛔ **HARD_STOP** | 改 `correctIndex` / 刪內容 / 動 schema·renderer·`docs/standards/*` | 禁止 | 自動 revert |

**每次 run 上限:Tier A + B 合計 ≤ 5 條**(scope cap)。只動 `public/lessons-ch*.json`。

## 安全 gate(每筆自動修都要全過,否則 revert 該筆 → 降成 C 報告)

```
npm run build            # validate-lessons (lint) + 392 tests + tsc + vite 全綠
node tools/check-answer-index.cjs   # correctIndex 前後不變 (HARD_STOP)
```

→ 自動修動不到標準, 因為標準寫成 lint + build + answer-index 把關。

## cron routine prompt(全部修 + 剩下分隔,貼到 claude.ai/code/routines 該 cron)

```
你是 Pickup 內容自動修復 cron。只動 public/lessons-ch*.json。

1. 拉最新 master。讀 docs/standards/auto-fix-tiers.md + docs/standards/lesson-design-standard.md。
2. 反重複: 讀 cockpit-deploy/shipped.json, 已登記的 audit 跳過。
3. 跑內容稽核 (干擾項太好猜 / 標點 / emoji 輪替 / 鏡像 / 級距極端 等), 每個 finding 分 Tier。
4. 全部修 (Tier A 機械式 + Tier B 內容改寫都修, 依 P0>P1>P2):
   每筆: 改 lessons → npm run build (不綠 → git checkout 還原該筆) → node tools/check-answer-index.cjs (紅 → 還原該筆) → 過才留。
5. 所有過關的: commit (v2.0.B.NEXT: <fix> (cron auto-fix)) + shipped.json 登記 + push + merge master。
6. 剩下分隔出來 (不自動改): Tier C 結構/判斷 + 任何『修了但沒過 gate 被還原』的 → 寫進 docs/audits/ audit md。
7. Telegram: ✅ 自動修了 N 條 (連結) | ⚠️ 還剩 M 條要人看 — 逐條列 (Tier C + 沒過 gate, 各附原因)。

絕不碰: correctIndex / schema / renderer / docs/standards / 非 lessons 檔。
```

> 預設 = **全部安全的都修 (A+B)**, 過 gate 才上, 剩下 (C + 沒過 gate) 分隔報告。
> 想保守回「只機械式」: 第 4 步改「只處理 Tier A」, Tier B 改成只寫 audit。

