# 拾光 Pickup — 小節 (Lesson) 設計標準

> 2026-06-16 · Opus 4.8 · per user
> 一個小節要有哪些題型、各佔幾趴、時間預算、難度模型、獎勵。內容撰寫 (人 / Fable) 照此表產出。

---

## 1. 鐵則 (違反 = revert)

1. **整個小節 ≤ ~5 分鐘** (B.315)。新增題型不可超時 → **可刪減 / 取代原本題型**, 不是純疊加 (B.319)。
2. **完全符合手機高度, 不外溢** (B.315)。
3. 每題 ~22-26 秒 → **一節 ~11 題** (含旁白) 最穩。
4. 正確答案 = 綠, **禁 ✓ 打勾** (B.264)。答錯 2-strike: 1st 黃 blindRetry / 2nd 紅 reveal。
5. **音訊優先序 (B.330 per user)**: **題目語音 (TTS) 絕對不可被壓低 / 抑制** — 永遠全音量。BGM **可以**被壓 (語音播放時 duck 到 ~10%, `duckBgm` 只動 bgmGain)。外部音樂混音 (Capacitor .ambient) 時也一樣: 題目語音優先, BGM/外部音樂可降, 題目不降。

---

## 2. 題型配比標準表 (一節 ~10 題)

> v2.0.B.cron (2026-06-19 per user) 兩項決策落地:
> 1. **理解題合併**: `read-comprehension` + `listen-comprehension` → 單一「**理解選擇** (comprehension)」題型。「聽 or 讀」**不再綁題型**, 由**全域開關**決定 (設定頁 · `src/data/comprehensionMode.ts`, 預設「聽」)。
> 2. **配比重新平衡**: narration 36→30, 理解類拉到 30, 其餘 (是非 / 單字 / 片語 / 看圖) 各升到 10。

| 題型 | 佔比 | 題數 | 作用 | 難度敏感 |
|------|------|------|------|---------|
| **narration** 旁白 | 30% | 3 | 故事推進 (聽+讀, 無作答) | ✅ 文章三版 |
| **comprehension** 理解選擇 (merged) | 30% | 3 | 段落 (聽/讀由全域開關決定) → 提問 4選1 | ✅ 文章三版 |
| **listen-tf** 是非 | 10% | 1 | 快速理解確認 | ◐ |
| **tap-pairs** 單字配對 | 10% | 1 | 詞彙 (新單字來源) | — |
| **phrase-pairs** 片語配對 (B.321) | 10% | 1 | 片語 (新片語來源) | — |
| **emoji-pick** 看圖選 | 10% | 1 | 圖像詞彙 | — |
| 合計 | 100% | 10 | ~4.5-5 min | |

**理解選擇 (comprehension)** 資料 shape = 段落 `sentence` + `question` + 4 `options` + `correctIndex` (同舊 read/listen-comprehension)。呈現方式由全域開關:
- **聽模式** (預設): 段落以 blanks 隱藏 + 自動 TTS, 答完才 reveal (舊 listen-comprehension 流程)。
- **讀模式**: 段落一直可見, 答完開放點詞看中文 (舊 read-comprehension 流程)。
- 舊 `listen-comprehension` / `read-comprehension` type **仍合法** (向後相容, 既有 30+ 章 JSON 不需遷移) — renderer 把三者全導向同一 `ComprehensionRenderer`, 行為被開關統一。新內容請直接用 `comprehension`。

> 註: `listen-mc` (純聽力選 1, 非段落理解) **不在此合併內**, 維持獨立題型。

**章末最後一節** 加重 review (tap-pairs + phrase-pairs ↑) + 觸發 §5 獎勵畫面。
**Ch0 / 入門節** 可降 narration, 升 emoji-pick / tap-pairs。

> 配比是「目標」非「逐節死守」: 同章跨節平均達標即可。**單字 (tap-pairs) 與片語 (phrase-pairs) 每章都要有**, 否則 §5 獎勵統計會是 0。

---

## 3. 新單字 vs 新片語 (內容模型, 餵 §5 獎勵)

- **新單字** = 該章 `tap-pairs` 的英文項 (去重)。
- **新片語** = 該章 `phrase-pairs` 的英文項 (去重)。
- 所以「想讓某章顯示 N 單字 / M 片語」= 在該章 tap-pairs / phrase-pairs 放對應內容。

### phrase-pairs 題型 (B.321 已實作)
- 復用 tap-pairs 配對 UI (左中右英, 3-4 對)。內容是**多字片語** ↔ 中文意思。
- 例: `once upon a time ↔ 很久很久以前` / `look after ↔ 照顧` / `run away ↔ 逃跑`。
- 每章建議 3-6 個片語 (跨 1-2 個 phrase-pairs 題)。

### listen-pairs 聽力配對「聽力選中文」題型 (B.cron 已實作, per user screenshot 標準)
- **聽力版的配對題**: 左欄 = **聲音波形按鈕** (點下去播英文, **不顯示英文字**), 右欄 = **中文**。玩家**用聽的**把音檔配到中文意思 → 訓練「聽音辨義」。
- 資料 shape **沿用 tap-pairs**: `pairs: [{ left: 中文, right: 英文 }]` (3-4 對)。renderer 播 `right`(英文) + 顯示波形, 右側文字格顯示 `left`(中文)。
- **標準設計** (照 Duolingo「選擇配對」screenshot): 角色圖置中於頂部圖片槽 + 下方分隔線 → 「選擇配對」標題 → 左聲波 / 右中文 兩欄圓角框。選中 = 聲音格藍底藍框 / 中文格暖琥珀; 配對成功 = 綠; 答錯 = shake。聲音以**藍色波形長條**呈現 (`Waveform` component, 靜態尊重 reduce-motion)。
- 與 tap-pairs 差別: tap-pairs 看得到英文字 (閱讀 / 拼字), listen-pairs **盲聽** (聽力)。同一批單字可一題 tap-pairs (讀) + 一題 listen-pairs (聽) 雙軌複習。

---

## 4. 三難度模型 (per user:文章用原文 + 簡單版 + 困難版)

每題有 `difficulty: easy | medium | hard` 欄位 (已存在)。**文章類題型 (narration / read-comprehension) 文本分三版**:

| 難度 | 文本 | A2 對象 | 特徵 |
|------|------|---------|------|
| **easy** 簡單 | 簡化版 | 初學 / 低年級 | 短句、高頻字、多中文 hint、片語拆開 |
| **medium** (預設) | **接近原文改寫** | 主客群 8-12 | 完整句、A2 詞彙、適度片語 |
| **hard** 困難 | **原文 / 近原文** | 進階 / 親子 | 長句、原典用詞、少 hint、保留原文片語 |

> user 的「題目文章都要用原文」= **hard = 原典文本**; medium = A2 改寫; easy = 再簡化。三版**同一情節**, 只換難度, 不換故事。

### 落地 schema (建議, 待內容 pass 實作)
narration / read-comprehension 的 `sentence` 旁加可選三版:
```jsonc
{
  "type": "read-comprehension",
  "sentence": "<medium 預設>",
  "sentenceEasy": "<簡化版>",
  "sentenceHard": "<原文版>",
  "question": "...", "options": [...], "correctIndex": 0
}
```
renderer 依 `localStorage pickup.difficulty` 選 `sentenceHard ?? sentence` (hard) / `sentenceEasy ?? sentence` (easy) / `sentence` (medium)。缺版 fallback 到 medium。
> **本版只定義模型**; schema 欄位 + renderer 選版 + 三版內容 = 內容 pass (Fable 寫文本, Sonnet 接 schema/renderer)。

---

## 5. 大單元 (章節) 完成獎勵畫面 (B.322 已實作)

- 觸發: 完成該章**最後一節** (`isLastLessonOfChapter`)。
- 內容: `🏆 這個單元你學會了` + **新單字數** (本章 tap-pairs 去重) + **新片語數** (本章 phrase-pairs 去重)。
- 統計 source = fetch 該章 lessons JSON 即時算 (不需額外 tracking)。
- 視覺: CompletePanel 內金框卡, 接在 XP/Accuracy/Time 三欄下。

---

## 6. 進度條 (B.320 已實作)

- **前快後慢**: `width = pow((idx+1)/total, 0.6) × 100%`。前幾題跳得多 (momentum), 後面增量小, 最後一題精確 100%。

## 6b. 地圖寶箱分配標準 (B.326 per user)

- **每 5 關一個寶箱** (`CHEST_EVERY = 5`, 距上個寶箱 ≥5 關才放)。
- **不貼章節開頭/結尾**: 只在章節中段放 (當前關 `lessonInChapter ≥ 2` 且下一關不是新章第一關) → 寶箱不會撞到章節分隔線、不會緊鄰章首。
- 書封 (頂部) 跟著滑動換章, 但用**直接 DOM 更新** (非 React setState) 避開 iOS 跳頂 (B.326)。
- 地圖含 **ch0 入門** (ABC/數字/顏色) 在最前。

---

## 7. 落地狀態

| 項目 | 狀態 |
|------|------|
| 進度條前快後慢 (§6) | ✅ B.320 |
| phrase-pairs 片語題型 (§3) | ✅ B.321 (renderer/schema) |
| 章節獎勵畫面 (§5) | ✅ B.322 |
| read-comprehension (§2) | ✅ B.319 |
| **理解選擇合併 (comprehension) + 全域聽/讀開關 (§2)** | ✅ B.cron (schema + ComprehensionRenderer + 設定頁 toggle + validate-lessons) |
| **listen-pairs 聽力選中文配對 (§3)** | ✅ B.cron (schema + ListenPairsRenderer + Waveform + Ch1 範例) |
| 三難度文本 schema + renderer (§4) | ⬜ 待內容 pass |
| 各章依配比表鋪題 + 片語 + 三版文章 (§2/§4) | ⬜ 內容 pass (Fable 寫 / Sonnet 接) |
| 各章舊 listen/read-comprehension → 新 comprehension type 遷移 (§2) | ⬜ 非必要 (向後相容, 行為已統一); 內容 pass 順手換 |
