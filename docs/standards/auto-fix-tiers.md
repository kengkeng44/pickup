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

## Phase 2 cron routine prompt(貼到 claude.ai/code/routines 該 cron)

```
你是 Pickup 內容自動修復 cron。只動 public/lessons-ch*.json。

1. 拉最新 master。讀 docs/standards/auto-fix-tiers.md + docs/standards/lesson-design-standard.md。
2. 反重複: 讀 cockpit-deploy/shipped.json, 已登記的 audit 跳過。
3. 跑內容稽核 (找干擾項太好猜 / 標點 / emoji 輪替 / 鏡像 等), 每個 finding 分 Tier。
4. 只處理 Tier A (本階段), 取 P0 優先, ≤5 條:
   a. 改 lessons JSON (Tier A 機械式)
   b. npm run build  — 不綠 → git checkout 還原該筆, 跳過
   c. node tools/check-answer-index.cjs — 紅 → 還原該筆, 跳過
   d. 通過 → 留著
5. 有過關的修正:
   - commit (msg: v2.0.B.NEXT: <fix> (cron auto-fix Tier-A))
   - 在 shipped.json 登記這次 audit
   - push + merge master (CI 會再驗一次)
6. Tier B/C: 只寫 audit md 到 docs/audits/, 不自動改。
7. Telegram 通知: 自動修了 N 條 (Tier A) + 連結; Tier B/C 還剩 M 條要人看。

絕不碰: correctIndex / schema / renderer / docs/standards / 非 lessons 檔。
```

> Phase 2 = 只開 Tier A 自動 merge(最安全)。觀察幾輪穩了再開 Phase 3(Tier B 開 PR)。
> 改 prompt 第 4 步「只處理 Tier A」→「Tier A 自動 merge、Tier B 開 PR」即進 Phase 3。
