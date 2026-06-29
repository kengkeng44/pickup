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

## 目前狀態(2026-06-29 更新)

- ✅ **已落地 (B.497, WARN)**:**X44_NON_WORD_VERB**(grammar-mc 非字 like goed/puted)+ **X46_LISTEN_TF_POLARITY**(一節 listen-tf 同答案 ≥75%)。在 `tools/validate-lessons.js`,warn-only 不擋 build。
  - 首掃命中:X44 = 3 筆真非字(ch0-l6 `readed` / ch13-l5 `puted` / ch14-l3 `leaded`)→ 是真 bug,待內容修(換成別的合法干擾項,不可直接換成正解避免撞答案)。X46 = 46 節同極性偏置(觀察用)。
- ✅ **已落地 (B.498, WARN)**:**X47_CULTURAL_BRIDGE**(keyword stopgap 版,不動 schema)。規則:一章出現文化專名
  (djinn/baba yaga/洞節…) 但整章無任一題 expZh 含文化橋接 marker → WARN。首掃命中 ch5(baba yaga / chicken leg),
  已補 2 句俄羅斯民間文化註 → 現 0 命中(乾淨 regression guard)。清單 `X47_ENTITIES`/`X47_MARKERS` 可擴。
  > 正式版(`culturalOrigin` schema 欄位 + keyObjects 精準判定 + 「奶奶補充」UI chip)仍是 B 類, 待作者決定;keyword 版先頂著。
- ✅ **已落地 (B.504, WARN)**:**X49_STIMULUS_REUSE**(ARCH-REC #94, 來源 2026-06-28T1212 content-qa-cron audit P0-2)。規則:同一節內同一句 `sentence`
  同時當 comprehension/listen-mc/listen-comprehension/read-comprehension 的 stimulus *又* 當 listen-tf 的 stimulus → 第二題退化成「回憶」而非「聽力」
  (Buck 2001 §5.3)。warn-only。首掃全 corpus 124 命中(audit 估 Ch25-31 就有 109)。content cron 漸修:改寫其中一題為 paraphrase, **不動 correctIndex**。
  > 同 audit 的 ARCH-REC #90(Ch25-31 MP3 批次生成 + 擴 `CHAPTERS_WITH_MP3`)需 `OPENAI_API_KEY` + 真檔產出, 屬基建/內容批次, **不能只改 set**
  > (指向不存在的 MP3 會 404 → 比 WebSpeech fallback 更糟)。EM-dash 正規化 / SSML = 內容 + schema, 留 content cron / B 類。
- ❌ **X45_GRAMMAR_MC_ALL_MORPH — 決定不做 (rejected)**:與 `docs/standards/2026-06-22-question-distribution-standard.md`
  的 grammar-mc 教條衝突——該標準**刻意**要求干擾項是同字根文法變體 (go/goes/going/went),因為 Pickup 的 grammar-mc
  是給 A1/A2 兒童的**文法 drill**(練「這個語境該用哪個變化形」),不是綜合理解 MCQ。ACL2025 的 mixed-foil 建議
  針對的是理解題,不適用刻意設計的文法 drill。故 X45 會誤報「按設計做對」的題 → 不實作。

*Last updated: 2026-06-29 by Claude*
