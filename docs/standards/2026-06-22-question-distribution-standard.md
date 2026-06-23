# 題型分佈標準 (Question Distribution Standard) — v1

> 2026-06-22 · 作者要求「上網查 + 分析怎麼排題目不無聊且貼近原文,給一個標準」。
> 本文是 **content authoring 的 source of truth**:cron 出題 / 人工改題 / 新章節都依此排。

---

## 0. 為什麼要這份標準 (問題現況)

全 32 章實測題型分佈(2026-06-22):

| type | 數量 | 佔比(不含 narration) |
|------|-----:|------:|
| narration(旁白,非題) | 1188 | — |
| **listen-mc** | **524** | **~42%** ← 太集中 |
| listen-tf | 224 | ~18% |
| tap-pairs | 219 | ~17% |
| emoji-pick | 211 | ~17% |
| comprehension | 63 | ~5% |
| listen-emoji / picture-mc / phrase-pairs / listen-pairs | <15 | <2% |
| **grammar / 文法** | **0** | **0%** ← 缺 |

**診斷**:`listen-mc` 一型獨大(42%),理解題(comprehension)只有 5%,文法題 0。玩起來「聽 → 選」重複度高 = 無聊;也缺「看著原文想文法」的深度。

---

## 1. 研究根據 (ELT / Duolingo / CEFR / TBLT)

**TBLT 三段式(Jane Willis)**:Pre-task(暖身、導入詞彙)→ Task cycle(先抓大意 gist → 再抓細節 detail)→ Language focus(形式 / 文法分析)。→ 對應我們一節課的弧線。

**Duolingo 方法**:單元由易到難(先「認得」recognition → 後「產出」production);**interleaving 交錯**不同技能;單元結尾用 review skill 把錯題與各題型混合複習;同一個字放進**不同句構 / 情境**反覆出現。

**CEFR A1/A2 閱讀題型**:MCQ(細節)、Yes/No・True/False(判斷 / 推論)、Cloze 填空(在語境中同時測**詞彙 + 文法**)、短答。**文法在語境中教,不孤立**(grammar in context)。

**變化性**:同類型連續出現會降低投入度;交錯能提升日後回憶(retrieval)。

→ 結論:(a) 砍 listen-mc 比例、補理解題與文法題;(b) 一節課內**交錯**多種題型;(c) 文法**貼原文**、在語境中考;(d) recognition 先於 production。

---

## 2. 題型功能分類 (我們的 roster → TBLT 角色)

| 角色 | 題型 | 用途 |
|------|------|------|
| **暖身 / 詞彙 (Pre)** | tap-pairs · phrase-pairs · listen-pairs · emoji-pick · picture-mc · listen-emoji | 導入本課關鍵字,recognition 先行 |
| **故事流 (narration)** | narration | 旁白,推進劇情,**不算題** |
| **理解 (While — gist/detail)** | listen-mc · comprehension · listen-tf | 抓大意 / 細節 / 判斷推論 |
| **文法 (Language focus)** | **grammar-mc** · read-and-tap · drag-blank | 在原文語境看形式 |
| **產出 (Production)** | type-what-you-hear · tap-tiles · listen-build · speak-back | 自己拼 / 打 / 唸出來 |
| **複習 (Review)** | tap-pairs(章末) | 混合錯題 + 本章字 |

---

## 3. 一節課 (一個按鈕 / lesson) 的標準排法

一個 lesson 通常 6–12 個 entry(含旁白)。鐵律:

1. **開場**:1 個暖身 / 詞彙題(tap-pairs 或 emoji/picture)— 先讓玩家「認得」。
2. **故事流**:2–4 段 narration 穿插推進。
3. **理解題**:2–4 題,**混用** listen-mc + comprehension + listen-tf — 不要連 3 題都 listen-mc。
4. **多樣性鐵律**:
   - 同一題型**最多連 2 題**,不可連 3。
   - 每個 lesson(不含 narration)**至少 3 種不同題型**。
   - recognition(選 / 配對)先於 production(打字 / 排序)。
5. **subSkill 平衡**:每課盡量 ≥1 gist、≥1 detail、有空間就放 1 inference;vocab 當暖身。

---

## 4. 文法題 (grammar-mc) 標準 ← 作者本次重點

- **密度**:每章**只 2–3 個 lessons** 各放 **1 題** grammar-mc(約佔全章題數 3–5%)。**不是每課都有**,不喧賓奪主。
- **位置**:放在**有完整原文句子的故事課**。一般 24-課章節 = **main-story** 段(章節中段);薄段落(只有一兩句旁白的 prologue / outro)不放。例外:ch0 入門章故事就寫在 prologue 課裡,故 ch0 的 grammar-mc 放在故事推進的 lessons(如 L5/L6)。
- **貼近原文鐵律**:grammar-mc 的 `sentence` **必須是該課故事真的出現過的句子**(或 ≤1 字的極小改寫)。不可另編一句無關的句子。
- **distractor 規則**:干擾選項是**同一個字的文法變體**(go / goes / went / going;a / an / the / —;in / on / at / to),**不是語意干擾**。目的是練文法形式,不是猜意思。
- **文法點輪替**:每章挑 2–3 個**不同**文法點,不重複同一點:
  `be 動詞` · `時態(過去 / 現在)` · `冠詞 a/an/the` · `介系詞 in/on/at` · `單複數` · `詞序` · `代名詞 he/she/it`。
- **難度**:A1/A2,`subSkill: 'function'`,tag 加 `grammar`。

**範例 (取自 ch0 原文「Mochi jumps up on the low wall.」)**：
> 句子:`Mochi ___ up on the low wall every night.`
> 問:Which word is correct?
> 選項:`jumps`(正解,第三人稱單數) / `jump` / `jumping` / `jumped`
> distractor 全是 jump 的文法變體 → 考第三人稱 -s,貼原文。

---

## 5. 章節層級分佈目標 (the 標準,每章抓比例)

不含 narration,單章題型佔比建議:

| type | 目標佔比 | 備註 |
|------|------:|------|
| listen-mc | **≤ 35%** | 從 42% 降下來,別獨大 |
| comprehension | **≥ 15%** | 補上來(現只 5%) |
| listen-tf | 10–15% | 判斷 / 推論 |
| 配對類 (tap/phrase/listen-pairs) | 10–15% | 含章末複習 |
| 視覺類 (emoji-pick/picture-mc/listen-emoji) | ~10% | 低齡友善 |
| **grammar-mc** | **3–5%** | = 每章 2–3 lessons |
| 產出類 (type/tap-tiles/listen-build) | 5–10% | A2 才上 production |

**驗收**:qa-static 索引最上方的「題型分佈總覽」可一眼看每章是否偏食(見 `_render-qa-static.cjs`)。

---

## Sources

- [Duolingo Wiki — Exercise types](https://duolingo.fandom.com/wiki/Exercise)
- [The Duolingo Method: 5 key principles](https://blog.duolingo.com/duolingo-teaching-method/)
- [Duolingo 101 — How to learn a language](https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/)
- [British Council LearnEnglish Teens — A1 reading](https://learnenglishteens.britishcouncil.org/skills/reading/a1-reading) · [A2 reading](https://learnenglishteens.britishcouncil.org/skills/reading/a2-reading)
- [CoE — CEFR Reading comprehension](https://www.coe.int/en/web/common-european-framework-reference-languages/reading-comprehension)
- [Willis TBLT lesson framework (Wikipedia)](https://en.wikipedia.org/wiki/Task-based_language_teaching)
- [Application of TBT in reading class (ERIC)](https://files.eric.ed.gov/fulltext/ED502894.pdf)

---

## 6. 單節時長標準 — 一節 ≈ 5 分鐘 (2026-06-23 per user)

- 目標:每個 lesson `estimateLessonSeconds()` ≈ **280–320 秒**(約 5 分,仍輕快)。
- 估時權重(src/data/lessons.ts):旁白 7s / 配對·拼字·產出題 26s / 其他四選一 16s。
- 現況每節 ~127s(~2 分)→ 需**每節約 +8 題**才到 5 分。
- **加題用分佈標準的「補強型」**:優先 comprehension(補到 ≥15%)+ grammar-mc(每章 2–3)+ 視覺/配對變化;**不要再加 listen-mc**(它已 42% 過量)。
- 加的題必須:貼該章故事原文、A1/A2、schema 合法、過 validate-lessons(無 option-bias / 無答案外洩)、附溫度中文(explanationZh/optionsZh/sentenceZh)。
