# Content QA — 2026-07-16 00:07 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (translation quality, register, morphological label consistency)
**Focus:** Ch17-24 (Tsuru no Ongaeshi / Swallow Returns / Mousedeer / Turnip / Anansi / Mencius' Mother / Sima Guang / Kong Rong)

**Why this angle now:** #11 last ran 2026-07-11T1805 on Ch9-16. Ch17-24 has not been scanned under this lens. Ch17-24 contains the first grammar-mc questions (gm1/gm2 pattern) introduced after Ch17, making optionsZh quality especially critical for morphological scaffolding accuracy.

---

## A. validate-lessons.js result

```
Total lint issues across ALL chapters: 440 (warn-only)
Ch17-24 relevant lint:
  WARN lessons-ch17.json: known X2/X49/X57 issues (pre-existing)
  WARN lessons-ch18-ch24.json: known X2/X49/X57 issues (pre-existing)
  OK lessons-ch32.json / ch33.json / ch34.json
  No new schema-break issues detected this cycle.
```

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 20 | kt-ch20-l2-gm1 | grammar-mc | opts=['pull','pulls','pulling','pulled'] optionsZh=['pull','pulls','pulling','pulled'] | **P0 GM_OPTS_ZH_RAW_EN** — optionsZh 完全 echo 英文原詞,切中文 UI 時完全看不到中文解釋 | optionsZh → ['拉(原形)','拉(現在,第三人稱)','拉(進行式)','拉(過去式)'] 對齊 Ch23/Ch24 格式 | No |
| 24 | kt-ch24-l2-gm1 | grammar-mc | correctIndex=0→"takes" 但 expZh 說「拿了要說 took」 | **P0 CORRECTINDEX_MISMATCH** — 遊戲把錯誤答案「takes」標為正確；explanationZh 正確說應選 took | correctIndex 0 → 2 (took 在 opts[2]) | No |
| 23 | kt-ch23-l4-x6 | grammar-mc | optionsZh=['run','ran (過去式)','runs','running'] — 3/4 項無中文 | **P1 GM_PARTIAL_ZH** — 只有正確項 ran 有中文標籤；其他三個干擾項仍是英文 | optionsZh → ['跑(原形)','跑(過去式)','跑(現在,第三人稱)','跑(進行式)'] | No |
| 24 | kt-ch24-l4-x8 | grammar-mc | optionsZh=['take','took (過去式)','takes','taking'] — 3/4 項無中文 | **P1 GM_PARTIAL_ZH** — 只有正確項 took 有中文標籤；干擾項缺中文 | optionsZh → ['拿(原形)','拿(過去式)','拿(現在,第三人稱)','拿(進行式)'] | No |
| 19 | kt-ch19-l2-gm1 | grammar-mc | optionsZh 含「看過（過去分詞）」 | **P1 GRAMMAR_JARGON** — 「過去分詞」是成人語法術語；8-12 客群看不懂 | 改「看過(過去)」或「已經看過」；避免「分詞」「主詞」等術語 | No |
| 17-24 | kt-ch17..ch24-l*-q*-tf | listen-tf | opts=['Yes','No'] optionsZh=[] (131 Qs) | **P1 LISTEN_TF_NO_ZH** — 全部 listen-tf 的 optionsZh 缺失；切韓/日 UI 仍顯示英文 Yes/No | 為 listen-tf 補 optionsZh=['是','否'] (zh) / ['はい','いいえ'] (ja) / ['예','아니요'] (ko)；或在 renderer 內 hardcode Yes/No 多語對應表 | No |
| 20 | kt-ch20-l6-x8 | comprehension | optionsZh=['奶奶(Grandma)','狗','貓咪','老鼠'] | **P2 ZH_CONTEXT_STRIP** — 干擾項「狗/老鼠」缺 article 脈絡；原 EN 為「the dog / the mouse」帶定指情境 | '狗' → '那隻狗'; '老鼠' → '那隻老鼠'; 保留故事語感 | No |
| 20 | kt-ch20-l3-x4 | comprehension | optionsZh=['奶奶','小狗','那隻小貓','孫女'] | **P2 ZH_TOO_TERSE** — 「奶奶/小狗/孫女」在多選情境缺角色指稱一致性 | 統一加「那個/那隻」: '那個奶奶','那隻小狗','那隻小貓','那個孫女' — 或保持故事名稱一致 | No |
| 17-24 (emoji-pick) | kt-ch17-l1-ep1 等 ~20 Qs | emoji-pick | optionsZh=['鶴','雨','雪','風','草','鳥','樹','河','船','水'…] | **P2 EMOJI_SINGLE_CHAR** — 單字中文對 8-12 兒童偏正式；可更生動 | '鶴'→'白鶴'; '草'→'小草'; '河'→'小河'; '船'→'小船' — 字形更親切。非強制但推薦 | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total Q in Ch17-24 with any optionsZh field | 405 |
| Q types with optionsZh: comprehension | 192 |
| Q types with optionsZh: emoji-pick | 87 |
| Q types with optionsZh: grammar-mc | 10 |
| Q types with optionsZh: listen-mc | 100 |
| Q types with optionsZh: picture-mc | 16 |
| listen-tf Qs WITHOUT optionsZh | **131** (systemic) |
| P0 violations | **2** |
| P1 violations | **4** |
| P2 violations | **3** |
| Grammar jargon in optionsZh | 1 (「過去分詞」 Ch19) |
| Grammar-mc with correct:null (design) | 10 (expected — renderer uses correctIndex) |
| Grammar-mc with correctIndex mismatch vs expZh | **1 (P0 — Ch24 gm1)** |

---

## D. Top 5 P0

1. **⚠️ P0 — kt-ch24-l2-gm1 correctIndex WRONG**: `correctIndex=0` → "takes" 但 explanationZh 說正解是 "took" (index 2)。遊戲把取到的「takes」標為正確，同時顯示解釋「要說 took」— 直接教錯。**必須修: correctIndex 0 → 2**。

2. **⚠️ P0 — kt-ch20-l2-gm1 optionsZh 全英文**: 所有 4 個 optionsZh 都是 ['pull','pulls','pulling','pulled']，跟 options 完全一樣，切中文 UI 完全無效。應改為 ['拉(原形)','拉(現在,第三人稱)','拉(進行式)','拉(過去式)']。

3. **P1 — kt-ch23-l4-x6 + kt-ch24-l4-x8 GM_PARTIAL_ZH**: 這兩題只有正確項有中文標籤，3 個干擾項仍顯示英文動詞原形——切中文 UI 時 UI 呈現不一致，降低閱讀效率。

4. **P1 — kt-ch19-l2-gm1 GRAMMAR_JARGON**: optionsZh 含「過去分詞」。8-12 台灣兒童在學校尚未接觸此術語（國小英文課程不包含此用語）。應改「已經看過」或「看了」。

5. **P1 — 131 listen-tf 缺 optionsZh**: Ch17-24 所有 listen-tf Qs 的 optionsZh=[] ——切日/韓介面時按鈕顯示英文「Yes/No」。建議在 renderers.tsx 中為 listen-tf Yes/No 按鈕加 i18n hardcode 對應，或為每個 ch 補 overlay。

---

## E. Narrative Voice / Pacing Improvements (3 items, required even with 0 violations)

1. **Grammar-mc morphological label format 不一致**: Ch19 用「看過（過去分詞）」、Ch22 用「搬了(已做)」、Ch23/24 用「拿(過去式)」—— 三種不同標籤風格。建議統一格式：`動詞中文(時態描述)`，例如 `走(原形)` / `走(過去式)` / `走(現在,第三人稱)` / `走(進行式)`。一致格式讓兒童建立模式識別。

2. **Grammar-mc explanationZh warmth 已對**: Ch17-24 explanationZh 整體語氣良好（「奶奶說故事，說的都是發生過的事呢！」）。但部分章節缺「記住囉！」/ 「OMG 好聰明！」之類的結尾獎勵語氣。建議在答對後 explanationZh 末尾一律加一句兒童獎勵語（同 Ch9-16 已有的模式）。

3. **emoji-pick optionsZh 親切感可提升**: 目前單字（鶴/草/河/船）雖準確但偏字典感。若改「白鶴」「小草」「小河」「小船」——加一個字讓語感更像奶奶在跟小朋友說話的詞彙，而非教科書詞表。不影響 audio，低成本修。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #162: X162_GM_OPTS_ZH_MORPHFORM_STANDARD — Grammar-MC 選項統一形態標籤格式**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **L1-labeled morphological form options** (在 GM 選項直接用母語標記詞形，如「走(過去式)」) | Springer 2025 RCT: explicit morphological instruction + L1 labeling for Chinese EFL learners ([link](https://link.springer.com/article/10.1007/s11145-025-10629-9)); Frontiers ELT 2026 ([link](https://public-pages-files-2025.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1715381/pdf)) | ✅ 完全適合 — Pickup 客群 8-12 台灣兒童，L1=中文，grammar-mc 的 optionsZh 正是為此設計的 L1 scaffold。目前 Ch17-24 的 10 個 grammar-mc 已有此意圖，但格式不統一（3 種不同標籤風格）且 Ch20 完全缺失。 | Low (只需統一 10 個 GM 題的 optionsZh 格式) | High (降低認知負荷，標準化讓兒童建立「看到這格式就知道是時態比較題」的 schema) | ✅ 實作 |
| **Renderer-level Yes/No i18n** (listen-tf 的 Yes/No 在 renderers.tsx 加多語對應表，不依賴 optionsZh JSON) | Best practice from all major ELT apps (Duolingo, Busuu, Babbel): binary options hardcoded per locale, not content-authored | ✅ 完全適合 — 131 個 listen-tf 都受益，無需修改 JSON，修一次 renderer 全覆蓋 | Low (5 行 renderer 改動) | High (一次解決 131 個 P1 缺失) | ✅ 實作 |

### 具體實作改動

**Fix 1 (P0 — 必做):** `public/lessons-ch24.json` → `kt-ch24-l2-gm1`: `correctIndex: 0` → `correctIndex: 2`

**Fix 2 (P0 — 必做):** `public/lessons-ch20.json` → `kt-ch20-l2-gm1`: `optionsZh` 從 `['pull','pulls','pulling','pulled']` 改為 `['拉(原形)','拉(現在,第三人稱)','拉(進行式)','拉(過去式)']`

**Fix 3 (P1):** `lessons-ch23.json` `kt-ch23-l4-x6` + `lessons-ch24.json` `kt-ch24-l4-x8`: 補齊非正確選項的中文標籤

**Fix 4 (P1):** `lessons-ch19.json` `kt-ch19-l2-gm1`: 「過去分詞」→「已經看過」

**Fix 5 (ARCH-REC #162):** `src/react-app/renderers.tsx` → ListenTfRenderer (或 MC renderer 中 listen-tf 分支): 加 `const YES_NO_ZH: Record<string, [string, string]> = { zh: ['是', '否'], ja: ['はい', 'いいえ'], ko: ['예', '아니요'] }` hardcode 對應，listen-tf 不從 optionsZh 取值，改從此 map 取。

### Current architecture 對業界的對位

Pickup 的 grammar-mc + optionsZh L1 scaffold 架構本身 **已對齊 2026 業界最佳實踐** (Springer 2025 morphological awareness RCT)。需修的是**一致性**，不是設計方向。
