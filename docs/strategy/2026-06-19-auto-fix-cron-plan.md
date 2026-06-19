# 拾光 Pickup — Cron 自動修復(self-healing)實施方案

> 2026-06-19 · Opus 4.8 · per user「不影響原本標準前提下, cron 發現問題後自己修」
> ⚠️ 不是法律/正式架構文件;是給「下次實作的 session」的設計藍圖。

---

## 0. 目標 vs 現況

- **現況**:cron 每幾小時跑 5-agent 稽核 → **只寫 audit 報告**(`docs/audits/*.md`)→ 人(或下個 Claude session)手動「接」最優先那條。
- **想要**:cron 發現「優化 / 該改的」→ **在不破壞既有標準的前提下自己修 + 驗證 + 上線 + 通知**,人只看高風險的。

---

## 1. 業界框架(查到的)

| 概念 | 來源 | 怎麼用在 Pickup |
|------|------|----------------|
| **自主等級 4 階**:AUTONOMOUS(自動做+記錄)/ IN-FORM(自動做但留審)/ APPROVE_FIRST(先等人批)/ HARD_STOP(禁止) | arxiv 2508.11867 / Reco | 每類修正掛一個等級 |
| **同一條 CI 驗證**:agent 改的 code 走跟人一樣的 pipeline | Kilo | 自動修必過 `npm run build`(validate+test+tsc) |
| **信心門檻 + sandbox + human-on-the-loop @ PR** | Galileo / Semaphore | 低信心 → 開 PR 等人;高信心 → auto-merge |
| **漸進式:先從低風險高訊號開始** | Teamvoy | 先只自動修「機械式」那種,再擴 |

---

## 2. 核心安全設計:「把標準寫成 lint,自動修被 lint 把關」

**這是「不影響原本標準」的關鍵。** 不要讓 AI 憑感覺改;而是:

1. 每條標準 → 一條 **`validate-lessons.js` lint**(已在做:ANTONYM_MIRROR / SCALE_EXTREME / X3 anti-verbatim / mirror-lint / A5 cultural …)。
2. 自動修完 → 跑 `npm run build`。lint + 392 tests + tsc **全綠才算數**。
3. 任何修正**不可改 `correctIndex`**(加一條 lint/檢查:diff 前後答案位置一致)。
4. 不可碰:schema、renderer、`docs/standards/*`、`lessons` 以外的檔。違反 = 自動 revert + 降級成只報告。

→ 自動修的「天花板」就是這些 lint + build。**它無法做出 lint 抓得到的違規**,所以動不到標準。

---

## 3. 修正分級(決定誰能自動、誰要人)

| Tier | 類型 | 自主等級 | 動作 |
|------|------|---------|------|
| 🟢 **A 機械式** | 標點正規化 / emoji 輪替去重 / 格式 / 純 schema 欄位補 / 明確 1:1 替換 | AUTONOMOUS | 自動修 → build 綠 → **直接 commit+merge** → 通知 |
| 🟡 **B 內容改寫** | 干擾項反鏡像改寫 / paraphrase / 微文案 (本次 P0 那種) | IN-FORM | 自動修 → build 綠 + 答案 index 不變 → **開 PR + auto-merge on green** → 通知 |
| 🔴 **C 結構/判斷** | 跨 13 題的模板重設計 / schema 改 / ARCH-REC / 動到標準 / 大重構 | APPROVE_FIRST | **只報告 + 通知**,人決定 |
| ⛔ **HARD_STOP** | 改 correctIndex / 刪內容 / 動 schema·renderer·standards | 禁止 | 自動 revert |

> 每次 run 上限:Tier A/B 合計 **≤ 5 條**(scope cap,避免一次大改難審)。

---

## 4. 自動修 cron 的流程(取代「只寫 audit」)

```
1. 反重複: 讀 shipped.json + git log → 已接過的 audit/finding 跳過
2. 跑 5-agent 稽核 → 產 findings
3. 每個 finding 分 Tier (A/B/C)
4. Tier A/B (取 ≤5, 依 P0>P1>P2):
   a. 自動改 lessons JSON
   b. npm run build (validate lint + 392 test + tsc) — 不綠 → revert 該條, 降成 C 報告
   c. 檢查 correctIndex 前後一致 — 變了 → revert
   d. 通過 → 寫進 shipped.json
5. Tier A → commit + merge master; Tier B → 開 PR (CI 綠自動 merge)
6. Tier C → 寫 audit md (現況行為)
7. 通知 (Telegram): 自動修了 N 條 + 連結, 還剩 M 條要你看
```

---

## 5. 漸進式上線(降風險)

- **Phase 1（先做這個）**:把現有 audit 的「doctrine」全轉成 `validate-lessons.js` lint(ANTONYM_MIRROR / NEGATION_MIRROR / SCALE_EXTREME / YES_NO_POLARITY / EMOJI_ROTATION …)。**先不自動修**,只讓 lint 在 build 擋。→ 標準變可機器驗證。
- **Phase 2**:開 **Tier A** 自動修+merge(最安全:機械式)。觀察幾輪。
- **Phase 3**:開 **Tier B** 自動修+開 PR(人按 merge)。
- **Phase 4**:Tier B 在 build+lint 全綠時 **auto-merge**(信任建立後)。
- Tier C 永遠只報告。

每階段都可獨立停(改 cron prompt 一行)。

---

## 6. 要改什麼(落地清單)

1. **`tools/validate-lessons.js`**:補齊 audit doctrine 對應的 lint(Phase 1 主工)。
2. **`tools/check-answer-index.js`**(新,選):git diff 比對改動前後 correctIndex 不變。
3. **cron routine 的 prompt**:從「寫 audit」改成 §4 流程(user 在 claude.ai/code/routines 貼新 prompt)。
4. **`docs/standards/auto-fix-tiers.md`**:Tier 分類表當 single source(cron 讀它分級)。
5. **shipped.json**:已是反重複帳本,繼續用。
6. **通知**:接 §B.299 的 Telegram hook(自動修完推一條)。

---

## 7. 風險 & 取捨(老實說)

- **好處**:小的、明確的內容瑕疵(干擾項太好猜這種)不用你一條條接,cron 自己清。
- **風險**:AI 改寫內容仍可能「lint 過但語感怪」。緩解 = Tier B 先走 PR(你瞄一眼)+ scope cap ≤5 + 只動 lessons。
- **底線**:correctIndex / schema / 標準 / renderer 全在 HARD_STOP,自動修絕對碰不到 → **原本標準不會被影響**(這就是你的前提)。

---

## 8. 待你決定

- 要不要先做 **Phase 1**(把 doctrine 寫成 lint,純擋不自動修)?這步最安全、馬上讓標準可機器驗證,也是後面自動修的地基。
- Tier B 你想要「自動 merge」還是「一律開 PR 等你按」?(信任程度)

來源:[Teamvoy](https://teamvoy.com/blog/building-ai-agents-into-your-ci-cd-pipeline-a-playbook-for-tech-leads/) · [Galileo guardrails](https://galileo.ai/blog/ai-guardrails-framework) · [Kilo agentic workflow](https://kilo.ai/articles/beyond-autocomplete) · [Semaphore deploy guardrails](https://semaphore.io/what-guardrails-or-policies-should-be-in-place-when-ai-is-part-of-deployment-decisions-e.g.,-auto-rollback,-approvals) · [arxiv 2508.11867 AI-augmented CI/CD](https://arxiv.org/pdf/2508.11867)
