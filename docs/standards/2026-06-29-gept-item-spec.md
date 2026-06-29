# GEPT 全民英檢 題型統整規則 — Pickup 自製仿題 spec

> 2026-06-29 · per user「加入考試題目, 參考統整規則然後改題目」。
> **法律**:本 spec 只整理 LTTC 公開的**題型格式/考點**,Pickup 一律**自製原創仿題**,**不收錄 LTTC 真題**。
> **客群契合度**:⭐⭐⭐⭐ — 台灣家長最認的英檢, 付費誘因最強;GEPT Kids + 初級對齊 8-12 兒童。

---

## 0. 兩條線(對應 Pickup difficulty / 客群)

| GEPT | CEFR | Pickup 對應 | 客群定位 |
|------|------|-------------|---------|
| **GEPT Kids**(兒童版)| Pre-A1~A1 | easy / A0-A1 | 國小中低年級, 圖像為主 |
| **GEPT 初級**(Elementary)| A2 | medium-hard / A2 | 國小高年級~國中、家長「銜接」賣點 |

> 落地建議:跟 YLE 共用「英檢挑戰」入口, GEPT 線標台灣在地。中級(B1)= 未來 secondary(超出兒童核心, 先不做)。

---

## 1. GEPT 初級 — Listening(聽力)→ Pickup renderer

| GEPT Part | 格式 (考點) | Pickup renderer | 對得上? |
|-----------|------------|-----------------|---------|
| P1 看圖辨義 | 看圖 + 聽 4 句選最符合圖的 | `picture-mc`(聽版)/ `listen-mc` + image | ✅ 直接(需圖)|
| P2 問答 | 聽一句問句, 選最適當回應 | `listen-mc` | ✅ 直接 |
| P3 簡短對話 | 聽 2-4 句對話, 答理解題 | `listen-mc` / `listen-comprehension` | ✅ 直接 |

## 2. GEPT 初級 — Reading（閱讀）→ Pickup renderer

| GEPT Part | 格式 (考點) | Pickup renderer | 對得上? |
|-----------|------------|-----------------|---------|
| P1 詞彙與結構 | 單句挖空, 4 選 1(字彙 or 文法) | `grammar-mc` / `scroll-pick` | ✅ 直接 |
| P2 段落填空 (克漏字) | 短文多空, 每空 4 選 1 | `drag-blank`(多空)| ✅ 直接 |
| P3 閱讀理解 | 短文 + 數題理解 MCQ | `read-comprehension` / `comprehension` | ✅ 直接 |

**結論**:GEPT 初級 6 個 Part **全對得上現有 renderer, 零新 renderer**(P1 看圖需圖庫)。

---

## 3. GEPT Kids → Pickup renderer

| 題型 | 格式 | Pickup renderer | 對得上? |
|------|------|-----------------|---------|
| 聽音辨圖 | 聽單字/句選圖 | `picture-mc`(聽版)| ✅(需圖)|
| 圖字配對 | 圖↔單字配對 | `tap-pairs` / `listen-pairs` | ✅ |
| 看圖選句 | 看圖選正確句 | `picture-mc` | ✅(需圖)|
| 單字認讀 | 讀單字選圖/選義 | `picture-mc` / `comprehension` | ✅ |

---

## 4. 自製仿題模板(欄位已對齊真 schema)

> **每題必填**:`id` / `level` / `sentence` / `explanationZh`。FourOption 類 `options` 剛好 4 個。
> 閱讀理解用 **`comprehension`**(現行 canonical, 聽/讀由全域開關決定;`read-comprehension` 為 deprecated alias)。**段落放 `sentence` 欄**, 沒有 `passage` 欄。

### 4.1 P1 看圖辨義 (picture-mc, 聽版)
```jsonc
{ "type": "picture-mc", "id": "gept-el-l1-q1", "level": "A2",
  "imageEmoji": "📖",                       // imageEmoji 或 imageUrl 至少一個
  "sentence": "The boy is reading a book.",
  "question": "Which sentence matches the picture?",
  "options": ["The boy is reading a book.","The boy is eating.",
              "The girl is reading.","The boy is sleeping."],
  "correctIndex": 0, "explanationZh": "圖中男孩在看書。" }
```
考點:現在進行式 + 動作辨識。distractor 同句型不同動詞/主詞(避免 length-tell)。

### 4.2 P2 問答 (listen-mc, 選最適回應)
```jsonc
{ "type": "listen-mc", "id": "gept-el-l2-q4", "level": "A2",
  "sentence": "How do you go to school?",
  "question": "Choose the best answer.",
  "options": ["By bus.","It's a school.","Yes, I do.","She is fine."],
  "correctIndex": 0, "explanationZh": "How → 交通方式, 答 By bus。" }
```
考點:wh- 問句對應、慣用回應。foil 放「答非所問」型(Yes/No 對 wh-、答錯主題)。

### 4.3 P1 詞彙與結構 (grammar-mc)
```jsonc
{ "type": "grammar-mc", "id": "gept-el-l3-q2", "level": "A2",
  "sentence": "She ___ to the market every Sunday.",
  "question": "Choose the correct word.",
  "options": ["goes","go","going","gone"], "correctIndex": 0,
  "explanationZh": "第三人稱單數現在式 → goes。" }
```
考點:文法(時態/詞性/介系詞)or 字彙。文法題刻意同字根變體(grammar drill 教條, 見 question-distribution-standard, 不適用 X45)。

### 4.4 P2 段落填空 / 克漏字 (drag-blank — `sentenceTemplate` 用 `__`)
```jsonc
{ "type": "drag-blank", "id": "gept-el-l4-q1", "level": "A2",
  "sentence": "My family has a small house. We are happy there.",
  "sentenceTemplate": "My family __ a small house. We __ happy there.",
  "sentenceZh": "我家有一間小房子。我們在那裡很快樂。",
  "tiles": ["has","have","are","is","was"],
  "correctTiles": ["has","are"],
  "explanationZh": "family 當單數 → has;We → are。" }
```
`correctTiles` 數量 == `__` 數;每個都在 `tiles` bank。

### 4.5 P3 閱讀理解 (comprehension — 段落放 `sentence`)
```jsonc
{ "type": "comprehension", "id": "gept-el-l5-q3", "level": "A2",
  "sentence": "Tom likes animals. He has a dog and two cats. Every day he feeds them after school.",
  "question": "How many pets does Tom have?",
  "options": ["Three","Two","One","Four"], "correctIndex": 0,
  "explanationZh": "一隻狗 + 兩隻貓 = 三隻。" }
```
考點:細節/推論。**X48 注意**:正解別逐字抄段落 3-gram → 換句(Three vs a dog and two cats)。

---

## 5. 待辦相依

- 🖼️ 看圖題(P1 / Kids)需**圖庫** → 進「待生圖片」隊列。圖未到前先做問答/克漏字/閱讀理解(純文字)。
- ✅ 其餘零新 renderer, 可直接量產。
- 🔗 與 YLE spec 共用「英檢挑戰」入口 + 同 difficulty 對應。

## 6. 上線前 checklist

- [ ] 對照 LTTC 官方說明確認 Part 結構(本 spec 為格式整理)
- [ ] 自製題過 `validate-lessons.js` + `check-answer-index`
- [ ] 全原創、零真題文字(版權)
- [ ] difficulty:Kids=easy / 初級=medium-hard

---
*v2.0.B.506+ · Claude · 配合 Cambridge YLE spec 同批*
