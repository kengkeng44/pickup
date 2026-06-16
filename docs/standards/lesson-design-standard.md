# 拾光 Pickup — 小節 (Lesson) 設計標準

> 2026-06-16 · Opus 4.8 · per user
> 一個小節要有哪些題型、各佔幾趴、時間預算、難度模型、獎勵。內容撰寫 (人 / Fable) 照此表產出。

---

## 1. 鐵則 (違反 = revert)

1. **整個小節 ≤ ~5 分鐘** (B.315)。新增題型不可超時 → **可刪減 / 取代原本題型**, 不是純疊加 (B.319)。
2. **完全符合手機高度, 不外溢** (B.315)。
3. 每題 ~22-26 秒 → **一節 ~11 題** (含旁白) 最穩。
4. 正確答案 = 綠, **禁 ✓ 打勾** (B.264)。答錯 2-strike: 1st 黃 blindRetry / 2nd 紅 reveal。

---

## 2. 題型配比標準表 (一節 ~11 題)

| 題型 | 佔比 | 題數 | 作用 | 難度敏感 |
|------|------|------|------|---------|
| **narration** 旁白 | 36% | 4 | 故事推進 (聽+讀, 無作答) | ✅ 文章三版 |
| **read-comprehension** 閱讀理解 (B.319) | 9% | 1 | 讀段落→選1; 答完開放點中文 | ✅ 文章三版 |
| **listen-comprehension / listen-mc** 聽理解 | 18% | 2 | 聽力選1 | ◐ |
| **listen-tf** 是非 | 9% | 1 | 快速理解確認 | ◐ |
| **tap-pairs** 單字配對 | 9% | 1 | 詞彙 (新單字來源) | — |
| **phrase-pairs** 片語配對 (B.321) | 9% | 1 | 片語 (新片語來源) | — |
| **emoji-pick** 看圖選 | 9% | 1 | 圖像詞彙 | — |
| 合計 | 100% | 11 | ~4.5-5 min | |

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

---

## 7. 落地狀態

| 項目 | 狀態 |
|------|------|
| 進度條前快後慢 (§6) | ✅ B.320 |
| phrase-pairs 片語題型 (§3) | ✅ B.321 (renderer/schema) |
| 章節獎勵畫面 (§5) | ✅ B.322 |
| read-comprehension (§2) | ✅ B.319 |
| 三難度文本 schema + renderer (§4) | ⬜ 待內容 pass |
| 各章依配比表鋪題 + 片語 + 三版文章 (§2/§4) | ⬜ 內容 pass (Fable 寫 / Sonnet 接) |
