# Cambridge YLE 題型統整規則 — Pickup 自製仿題 spec

> 2026-06-29 · per user「加入考試題目, 參考統整規則然後改題目」。
> **法律**:本 spec 只整理**公開的題型格式/考點**,Pickup 一律**自製原創仿題**,**不收錄 ETS/Cambridge 真題**。
> Cambridge English Qualifications「Pre A1 Starters / A1 Movers / A2 Flyers」官方 sample paper 公開可參考格式,但題目文字全自製。
> **客群契合度**:⭐⭐⭐⭐ — YLE 正是 7-12 兒童國際英檢標準, A1-A2, 跟 Pickup 核心客群完全對齊。

---

## 0. 三級 = 三個難度層(對應 Pickup difficulty / ability tier)

| YLE 級 | CEFR | Pickup 對應 | 大致內容 |
|--------|------|-------------|---------|
| **Starters** | Pre-A1 | easy / A0-A1 | 名詞圖卡、單句、看圖 |
| **Movers** | A1 | medium / A1-A2 | 短對話、句填空、短故事 |
| **Flyers** | A2 | hard / A2 | 段落、定義配對、多選填空 |

> 落地建議:做成獨立「英檢挑戰」入口(或新章節組),每級一組 lesson,沿用現有循序解鎖。

---

## 1. Listening 部分 → Pickup renderer 對應

| YLE 題型 | 格式 (考點) | Pickup renderer | 對得上? |
|---------|------------|-----------------|---------|
| Listen & match / tick the box | 聽敘述選對的圖/選項 | `listen-mc` / `picture-mc` | ✅ 直接 |
| Listen & match names↔people | 聽對話把名字配到人 | `listen-pairs` / `tap-pairs` | ✅ 直接 |
| Listen & write a name/number | 聽寫人名/數字 | `type-what-you-hear` | ✅ 直接 |
| Listen, T/F about what you hear | 聽句判斷對錯 | `listen-tf` | ✅ 直接 |
| Listen & draw lines (position) | 聽指示把人物連到位置 | `listen-pairs`(用位置詞當右欄) | 🟡 改造(用配對代替畫線) |
| Listen & colour | 聽指示著色 | — | ❌ 需新 renderer(著色)= B 類, 先不做 |

**結論**:Listening 6 題型有 4 直接對上, 1 改造, 1(著色)跳過。

---

## 2. Reading & Writing 部分 → Pickup renderer 對應

| YLE 題型 (Starters R&W Part) | 格式 (考點) | Pickup renderer | 對得上? |
|---------|------------|-----------------|---------|
| P1 字↔圖 tick/cross | 看圖判斷單字正誤 | `picture-mc` | ✅ |
| P2 句子 T/F about picture | 看圖讀句判對錯 | `comprehension`(讀)/ `listen-tf` 讀版 | ✅ |
| P3 jumbled letters 拼字 | 字母重排成單字 | `tap-tiles`(字母磚)/ `type-translate` | ✅ |
| P4 gap-fill 選詞 | 看圖選詞填空 | `drag-blank` / `grammar-mc` / `scroll-pick` | ✅ |
| P5 回答故事問題(單字答) | 讀短文回答 | `comprehension` / `read-comprehension` | ✅ |
| Movers/Flyers 句填多選 | 短文挖空從選項填 | `drag-blank`(多空)| ✅ |
| Movers/Flyers 定義配對 | 定義↔單字配對 | `tap-pairs` | ✅ |
| Flyers 故事完句/重組 | 重組句子 | `read-and-tap` / `listen-build` | ✅ |

**結論**:Reading & Writing 幾乎 100% 對得上現有 renderer, 零新 renderer。

---

## 3. 自製仿題模板(欄位已對齊真 schema, 照填即原創題)

> **每題必填(QuestionBaseFields)**:`id` / `level`(A0/A1/A2…)/ `sentence`(string, 必填)/ `explanationZh`。
> FourOption 類(picture-mc / listen-mc / comprehension / grammar-mc)`options` 必須**剛好 4 個**, `correctIndex` 0-3。

### 3.1 看圖辨字 (P1 / picture-mc)
```jsonc
{ "type": "picture-mc", "id": "yle-st-l1-q1", "level": "A1",
  "imageEmoji": "🐱",                       // imageEmoji 或 imageUrl 至少一個
  "sentence": "Look at the picture.",
  "question": "Which word matches the picture?",
  "options": ["cat", "dog", "bus", "sun"], "correctIndex": 0,
  "explanationZh": "圖是一隻貓 → cat。" }
```
考點:具體名詞辨識。distractor 取**同類別/同長度**避免 length-tell(R2/X8)。

### 3.2 聽選 (Listening / listen-mc)
```jsonc
{ "type": "listen-mc", "id": "yle-st-l2-q3", "level": "A1",
  "sentence": "The ball is under the table.",
  "question": "Where is the ball?",
  "options": ["under the table","on the table","in the box","behind the door"],
  "correctIndex": 0, "explanationZh": "聽到 under the table。" }
```
考點:介系詞/位置、顏色、數字。**X48 注意**:正解別跟句子逐字撞 3-gram → 問句換句法。

### 3.3 句子判對錯 (P2 / listen-tf)
```jsonc
{ "type": "listen-tf", "id": "yle-mv-l3-q5", "level": "A1",
  "sentence": "The girl is riding a red bike.",
  "questionEn": "Is the bike blue?",
  "options": ["Yes","No"], "correctIndex": 1,
  "explanationZh": "車是紅色 → No。" }
```
考點:細節核對。`options` 固定 `["Yes","No"]`, `correctIndex` 只 0/1。**X46 注意**:一節 Yes/No ~50/50, 別全 No。

### 3.4 拼字 (P3 / tap-tiles — 字母磚, `correctOrder` 是 tiles 的 index)
```jsonc
{ "type": "tap-tiles", "id": "yle-st-l4-q2", "level": "A1",
  "sentence": "tiger",
  "tiles": ["g","i","t","e","r"],          // 打散顯示
  "correctOrder": [2,1,0,3,4],             // 指回 tiles index → t,i,g,e,r
  "explanationZh": "老虎 = tiger。" }
```
考點:常見字拼寫。`correctOrder` 是**指向 tiles 的索引序列**(不是字串)。避開含重複字母的字(tiles 不重複才好排)。

### 3.5 段落填空 (P4 / drag-blank — `sentenceTemplate` 用 `__`)
```jsonc
{ "type": "drag-blank", "id": "yle-fl-l5-q1", "level": "A2",
  "sentence": "Yesterday we went to the zoo and saw many animals.",
  "sentenceTemplate": "Yesterday we __ to the zoo and __ many animals.",
  "sentenceZh": "昨天我們去動物園,看到很多動物。",
  "tiles": ["went","go","saw","see","eat"],
  "correctTiles": ["went","saw"],          // 依序填空, 長度 == __ 數, 全在 tiles 內
  "explanationZh": "過去式: went / saw。" }
```
考點:時態、字彙。`correctTiles` 數量必須等於 `__` 數;每個都要出現在 `tiles` bank。

### 3.6 字彙配對 (Flyers 定義配對 → 改 中↔英 vocab, tap-pairs)
> Pickup `tap-pairs` 約定 **left=中文 / right=英文**, 故 YLE 的「英文字↔英文定義」改成「中文意思↔英文字」(剛好 4 對)。
```jsonc
{ "type": "tap-pairs", "id": "yle-fl-l6-q1", "level": "A2",
  "sentence": "Match the words.",
  "pairs": [
    { "left": "醫生",   "right": "doctor" },
    { "left": "老師",   "right": "teacher" },
    { "left": "農夫",   "right": "farmer" },
    { "left": "飛行員", "right": "pilot" }
  ],
  "explanationZh": "職業字彙配對。" }
```

---

## 4. 待辦相依

- 🖼️ picture-mc / 看圖題需**圖庫** → 進「待生圖片」隊列(照 isometric/Ghibli 標準)。圖未到前先做純文字/聽力題型。
- 🔤 著色題 / 畫線題若要原汁原味 → 需新 renderer = **B 類待批**(先用配對代替, 不擋上線)。
- ✅ 其餘題型零新 renderer, 可直接量產。

## 5. 上線前 checklist

- [ ] 對照官方 sample paper 確認各 Part 題型格式無誤(本 spec 為格式整理, 細節以官方為準)
- [ ] 自製題過 `validate-lessons.js`(X2/X8/X46/X48…)+ `check-answer-index`
- [ ] 全原創、零真題文字(版權)
- [ ] difficulty 對齊 Starters=easy / Movers=medium / Flyers=hard

---
*v2.0.B.506+ · Claude · 配合 GEPT spec 同批*
