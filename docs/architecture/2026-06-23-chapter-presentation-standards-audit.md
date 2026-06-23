# 全章呈現 + 標準對齊 稽核 (2026-06-23)

> per user:「分析每個章節到底怎麼呈現,各種標準有沒有對齊」。
> 資料來源:32 個 `public/lessons-ch*.json` 結構掃描 + renderer + 各 standards 文件。

## 1. 每章呈現快照

- **共通**:每章 **7 個 lesson**(小章節),每 lesson 5–15 entry。所有題透過 `RENDERERS[type]` 在 LessonPage 呈現(全 DOM,Phaser 隱藏)。
- **段落 segmentType**:ch0 = 7×`outer-prologue`;**ch1–31 = 7×`main-story`(全平,無分段)**。
- **題型**:旁白 `narration`(48%,不算題)+ 9 種實用題型,主力 `listen-mc`。
- **難度呈現**:句子預設「空白 → 點英文 → 點中文(sentenceZh)」;難度 pill 切 sentenceEasy/sentence/sentenceHard(目前幾乎只有 ch1 有三版)。

| 區 | 章 | 呈現重點 |
|---|---|---|
| 入門 | ch0 | 起源故事(奶奶撿到 Mochi),A1,含 2 grammar-mc + ABC→故事 |
| 童話 | ch1–9 | 桃太郎/醜小鴨/龜兔/駱駝/BabaYaga/六天鵝/葉限/三隻小豬/灰姑娘 |
| 神話 | ch10–13 | 嫦娥/后羿/牛郎織女/小紅帽 |
| 民間 | ch14–19 | 浦島/國王新衣/一寸法師/鶴/興夫孬夫/鼠鹿 |
| 歷史 | ch20–28 | 蘿蔔/Anansi/孟母/司馬光/孔融/愚公/阿基米德/西遊記/諸葛亮 |
| 西方 | ch29–31 | 奧德賽/海克力斯/羅賓漢 |

## 2. 標準對齊矩陣

| 標準 | 來源 | 狀態 | 說明 |
|---|---|---|---|
| 每章 lesson 數一致 | — | ✅ | 全 32 章 = 7 lessons |
| JSON schema / 正解完整性 | validate-lessons / check-answer-index | ✅ | 全綠,英文/correctIndex byte-identical |
| 翻譯溫度(去 AI 腔) | translation-tone.md | ✅ | ch0–31 全部重翻 + 邏輯掃過 |
| 題目合理性(同類/單一正解) | translation-tone.md §logic | ✅ | 全掃,修了 ch11/ch14/ch30 等 |
| no-fold 版面(選項不被折) | (本次新標準) | 🟡 部分 | picture-mc/emoji 已修;其他題型小螢幕未逐一驗 |
| 句子中譯 sentenceZh(點2下中文) | (reveal 標準) | 🟡 補齊中 | ch1–13/20–25 有;ch14–19/26–31 補齊中 |
| **題型分佈**(listen-mc ≤35% / comp ≥15% / grammar 3–5%) | 2026-06-22-question-distribution-standard.md | ❌ | 實際 listen-mc **42%**、comp **5%**、grammar **~0%** |
| **文法題每章 2–3 題** | 同上 | ❌ | 只有 ch0/ch1 共 4 題;ch2–31 = 0 |
| **三難度文本**(原文/適中/簡單句) | schema sentenceHard/Easy | ❌ | 只有 ch1 + 文法題;其餘 ~0% → 難度 pill 形同無效 |
| **答案三難度** | (user 要求) | ❌ | 未開始(需 schema optionsEasy/Hard) |
| **段落分段**(prologue/aesop/outro/review) | duolingo-nested spec | ❌ | 全章 7×main-story,無分段 |

## 3. 最該補的(建議優先序)

1. **題型分佈再平衡**(把 listen-mc 從 42%→≤35%,補 comprehension)— 直接影響「無聊感」,玩家最有感。各章把幾題 listen-mc 改 comprehension/其他。
2. **文法題鋪全章**(每章 2–3 題,A1/A2 roster 輪替)— 已有 grammar-mc 題型 + 標準,只缺內容。
3. **三難度文本鋪全章**(句子 + 答案)— 讓難度 pill 真的有用。最大工(答案三難度要動 schema)。
4. **no-fold 全題型小螢幕驗證**。
5. **段落分段**(把 7×main-story 補回 prologue/aesop/outro/review)— 結構工程,影響地圖呈現,需設計決策。

> 1–4 是內容/版面(可批次);5 是結構重構(需先拍板)。全部已登記 `docs/TODO.md`。
