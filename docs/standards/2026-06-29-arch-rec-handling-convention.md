# ARCH-REC 處理規範 (architecture-recommendation handling convention)

> 2026-06-29 · per user「幫我同意一下規格，然後設個規範」。
> 目的:cron 每天掃出的 ARCH-REC（架構建議）不要一條一條問。**先分類、預先同意安全那一類**,
> 只有真正動結構/標準的才需要逐條批准。這份就是那條規範。

---

## 分兩類

### 🟢 A 類 — 內容品質 lint（**預先同意,cron 直接做**）

定義:在 `tools/validate-lessons.js` 加一條 **lint 規則**,純掃 `public/lessons-ch*.json` 的內容品質,
**不改 schema、不改 renderer、不改既有題目的 correctIndex**。例:

- X44 `NON_WORD_VERB_LINT` — 抓 grammar-mc 的非真實單字干擾項
- X45 `GRAMMAR_MC_ALL_MORPH_LINT` — grammar-mc 四選都同字根 → 缺語意 foil 多樣性
- X46 `LISTEN_TF_POLARITY_LINT` — 一節全 No 的 listen-tf → acquiescence bias
- X47 `CULTURAL_BRIDGE`(來自 A5 audit)— listen-mc/comprehension 引用文化專有名詞但缺 zh 橋接

**規範(已同意,免再問):**
1. 一律先以 **WARN 等級**落地(`MIRROR_LINT_STRICT` 之外,warn-only),**不擋 build**。先觀察幾輪命中量,確認沒誤報再考慮升 FAIL。
2. 由 **arch / code cron**(或主 session 接「程式碼/架構」複製鈕的 prompt)實作,走一般 build gate(tsc + tests + madge + vite 全綠才上)。
3. 落地後在 `cockpit-deploy/shipped.json` 登記該 audit → 儀表板自動移到「已完成」。
4. **不需要逐條找作者同意**。

### 🔴 B 類 — 結構 / schema / 標準變更（**仍需作者逐條批准**）

定義:會動到下列任一者:
- Zod **schema**(新增/改欄位,如 `culturalOrigin` metadata 欄位本身)
- **renderer / UI 元件**行為
- `docs/standards/*` 既有標準的「規則內容」
- 跨多題的**模板重設計**、資料結構遷移、大重構

**規範:** cron **只報告 + 通知**,寫進 audit md,**等作者決定**。不可自動做。

> 註:A5 audit 的 `culturalOrigin` 提案要分開看——
> **X47 lint(掃缺橋接)= A 類,預先同意**;但**新增 `culturalOrigin` schema 欄位 = B 類,要批准**。
> 可以先只做 X47 lint(掃現有 expZh 是否含文化橋接字樣),不動 schema。

---

## 與 auto-fix-tiers 的關係

- `docs/standards/auto-fix-tiers.md` 管的是 **content cron 改 lessons 內容**(Tier A/B/C)。
- 這份管的是 **arch/code cron 把 ARCH-REC 變成 lint/code**。
- 對應:A 類 ≈ 可自動(Tier A/B 精神,只是落在 validate-lessons.js 而非 lessons JSON);B 類 ≈ Tier C(APPROVE_FIRST)。

## 目前狀態(本次同意）

- ✅ **同意**:X44 / X45 / X46 / X47(內容品質 lint)→ 列為 A 類,授權 cron 以 WARN 落地。
- ⏸️ **待批**:`culturalOrigin` schema 欄位 + 「奶奶補充」UI chip → B 類,等作者另外決定(可晚點做,或永不做只留 X47 lint)。

*Last updated: 2026-06-29 by Claude*
