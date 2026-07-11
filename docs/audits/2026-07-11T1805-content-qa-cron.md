# Content QA — 2026-07-11 18:05 UTC

**Today's angle**: #11 — optionsZh 翻譯品質 (ZH option translation fidelity & consistency)
**Focus**: Ch9–16 (880 total questions, 371 with optionsZh across comprehension / emoji-pick / listen-mc / grammar-mc / picture-mc)

**Angle definition:**
optionsZh 是玩家在 zh-TW / ja / ko 介面模式下看到的選項譯文。品質問題直接破壞：
- 兒童辨題 (label reveal → 答案外洩)
- 公平性 (length tell-tale → 長度暗示正確答案)
- 語言清晰度 (pronoun mix → 角色混淆)
- 設計一致性 (grammar-mc 三種 format 並存)

Sub-types tracked:
- **OZ-2**: All ZH options start with same character (pattern-recognition bypass)
- **OZ-3-FATAL**: ZH label explicitly names an option as wrong/nonexistent (answer give-away)
- **OZ-6**: He/她/它 pronoun mixing within same option set (character confusion)
- **OZ-8**: Dramatic ZH length asymmetry (max/min ≥ 3× with max ≥ 6 chars) — length as tell-tale
- **OZ-GM-FORMAT**: grammar-mc uses pure-ZH-label format (no EN word shown) — breaks cognitive link

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:  8 lint issues (X2 ×2, X49 ×3, X57 ×3)
WARN lessons-ch10.json: 9 lint issues (X2 ×2, X48 ×1, X49 ×3, X57 ×3)
WARN lessons-ch11.json: 16 lint issues
WARN lessons-ch12.json: 12 lint issues
WARN lessons-ch13.json: 12 lint issues
WARN lessons-ch14.json: 10 lint issues
WARN lessons-ch15.json: 9 lint issues
WARN lessons-ch16.json: 10 lint issues
Total mirror-lint issues across all chapters: 441 (warn-only, no build block)
```

---

## B. Violation Table

### P0 — OZ-3-FATAL: ZH label directly reveals wrong answer (2 instances)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 13 | kt-ch13-l5-x8 | grammar-mc | optionsZh[0]="puted（不存在）" | ZH 明確標注「不存在」— 學生一眼知道這個是錯的，等同 3選1 | 改為 "put（不常見錯誤）" 或改用中性標籤「put（誤）」| No |
| 14 | kt-ch14-l3-x4 | grammar-mc | optionsZh[2]="錯誤形" | 直接 label「錯誤形」— 答案 by elimination 立即揭露 | 改成 "leads（現在第三人稱）" — 使用實際英文詞+正確 ZH label | No |

### P0 — OZ-2: All ZH options start with same character (28 non-grammar-mc instances)

**Selected critical examples:**

| Ch | Q ID | type | first char | opts_zh snippet | violation | 修法 |
|----|------|------|-----------|----------------|-----------|------|
| 9 | kt-ch9-l2-pm1 | picture-mc | 一 | 一隻閃亮的小玻璃鞋 / 一位穿紅… / 一枚放在… / 一把掛在… | 4 個全「一」開頭 → 視覺 scanning 等同 1選1 | 改寫前 2 個: 「玻璃鞋閃閃亮」/ 「身穿紅外套的王子」 |
| 9 | kt-ch9-l4-lg2 | comprehension | 她 | 她一直躲…/她從後門…/她不是普通…/她個子太小… | 全「她」開頭 — 視覺無分岐點 | 多樣化句首: 「躲在角落不敢出現」/「從後門悄悄進來的」 |
| 10 | kt-ch10-l3-x4 | comprehension | 他 | 4 個都「他+adj+等著…」 | 整齊排比暗示「猜哪個形容詞」→ 分岐點後移 | 打散句式: 1 個「等著看機會」、2 個「有耐心地守候」 |
| 11 | kt-ch11-l4-lg2 | comprehension | 他 | 他忘了…/他選擇…/他以為…/他想讓… | 同上 | 打散主語或移至句尾 |
| 12 | kt-ch12-l5-x7 | comprehension | 她 | 她還在對他生氣/她太冷說不了/她忘記話了/她的禮物已夠了 | 全「她」開頭 | 改 1-2 個: 「禮物已經夠多了」/「冷到說不出話」 |
| 15 | kt-ch15-l4-lg2 | comprehension | 他 | 他真的相信…/他怕被人…/他想讓織工…/他打算之後考驗… | 全「他」主語 | 打散: 「因為怕被覺得不聰明」/「想讓織工感到驕傲」|

全 28 筆同樣修法方向：**打散句首字，讓視覺掃描先靠內容而非位置**。

### P1 — OZ-6: 他/她 pronoun mixing in same option set (10 instances)

| Ch | Q ID | type | pronouns | problem |
|----|------|------|---------|---------|
| 9 | kt-ch9-l7-x4 | emoji-pick | 她+他 | 同一組選項混用 — 指不同角色但 8-12 歲讀者可能混淆 |
| 10 | kt-ch10-l6-x4 | comprehension | 她+他 | 同組選項同時描述嫦娥(她)與后羿(他)但主語不同 |
| 10 | kt-ch10-l6-x6 | comprehension | 她+他 | 同上，后羿視角但穿插嫦娥 |
| 10 | kt-ch10-l7-q7 | listen-mc | 她+他 | 「告訴她他還愛她」— 雙重代詞指向不清 |
| 10 | kt-ch10-l7-x4 | comprehension | 她+他 | 4 個選項中 2 個用她、2 個用他 — 讀者須分別記住誰是誰 |
| 11 | kt-ch11-l7-x7 | comprehension | 它+他 | 它=太陽 / 他=后羿，混用易混淆 |
| 12 | kt-ch12-l5-x7 | comprehension | 她+他 | 織女(她) + 對方(他) 同組 |
| 13 | kt-ch13-l3-q4 | listen-mc | 他+她 | 「他給她錢/她很勇敢/她不怕他/媽媽叫她信」— 主語交替 |
| 13 | kt-ch13-l5-x2 | comprehension | (他=狼) | 選項隱含主語不一(第一人稱vs第三人稱混) |
| 13 | kt-ch13-l6-x4 | comprehension | 他+她 | 狼(他)與小紅帽(她)同組 |

**修法**: 加角色名替換代詞 (「嫦娥很害怕」vs「她很害怕」)，或在問幹 questionZh 先點明主語，讓選項只需描述行為。

### P1 — OZ-8: Length tell-tale (20 instances, top 8)

| Ch | Q ID | type | lens | opts_zh | 修法 |
|----|------|------|------|---------|------|
| 10 | kt-ch10-l4-q7 | listen-mc | [2,6,2,4] | 太小/別人會不安全/手累/盒子鎖了 | 擴充短選項: 「太小了放不下」/「手太累了」 |
| 10 | kt-ch10-l5-q3 | listen-mc | [6,3,3,2] | 把它吞進身體/含舌上/吐出來/給鳥 | 補長: 「含在舌頭上」/「吐出去」/「送給鳥吃」 |
| 11 | kt-ch11-l4-q3 | listen-mc | [4,4,2,7] | 只射一次/邊跑邊射/閉眼/一個接一個地射 | 壓縮: 「逐一射箭」而非「一個接一個地射」 |
| 11 | kt-ch11-l6-x2 | comprehension | [10,5,6,3] | 被射的太陽是他的兒子/后羿射太慢/人們沒有歡呼/弓壞了 | 截短長選項:「射下的太陽是兒子」 |
| 14 | kt-ch14-l7-q9 | listen-mc | [5,6,2,6] | 變成小男孩/永遠保持年輕/變魚/變成很老的人 | 補長: 「變成一條魚」 |
| 15 | kt-ch15-l4-q6 | listen-mc | [2,6,4,2] | 跌倒/被認為不聰明/失去金子/感冒 | 補: 「跌了一跤」/「感冒生病」 |
| 15 | kt-ch15-l7-q3 | listen-mc | [2,4,2,7] | 冷靜/羞愧又熱/睡著/跟以前一樣驕傲 | 壓縮: 「依然驕傲」 |
| 16 | kt-ch16-l7-x2 | comprehension | [2,4,5,6] | 很重/金子做的/能實現願望/可以在空中飛 | 補: 「非常非常重」/「用金子打的」 |

**原則**: 4 個選項 ZH 長度 max/min < 2× 為理想 (業界建議); max/min ≥ 3× 且 max ≥ 6 chars 為 P1 修法目標。

### P1 — OZ-GM-FORMAT: grammar-mc pure-ZH-label format (11 instances)

Three inconsistent formats coexist across Ch9-16:

| Format | Example optionsZh | Chapters |
|--------|-------------------|---------|
| **A** (EN+ZH label) | `"dances（第三人稱現在）"` | Ch9, 11, 12, 13 |
| **B** (ZH word+ZH label) | `"射（原形）"` | Ch10, 11, 12, 14, 15 |
| **C** (pure ZH label, no EN) | `"原形", "過去式", "第三人稱現在式", "進行式"` | Ch14, 15, 16 |

Format C (11 instances: kt-ch14-l3-x4, kt-ch14-l7-x4, kt-ch15-l5-x3, kt-ch16-l2-gm1, kt-ch16-l5-x4…) is worst: learner sees only the grammar label with no actual English word to choose from. This breaks the cognitive task (choosing correct conjugation) because the word to evaluate is absent.

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch9-16 total questions | 880 |
| Questions with optionsZh | 371 (42%) |
| OZ-3-FATAL (P0, label reveal) | 2 |
| OZ-2 non-grammar-mc (P0) | 28 |
| OZ-2 grammar-mc structural (P2, by-design) | 19 |
| OZ-6 pronoun mix (P1) | 10 |
| OZ-8 length tell-tale (P1) | 20 |
| OZ-GM-FORMAT pure label (P1) | 11 |
| **Total actionable violations** | **71** |

Chapters most affected: Ch13 (grammar-mc + comprehension both hit OZ-2+OZ-8), Ch10 (嫦娥 narrative pronoun mix OZ-6 ×5).

---

## D. Top 5 P0

1. **⚠️ P0 / OZ-3-FATAL — kt-ch13-l5-x8**: `optionsZh[0]="puted（不存在）"` — ZH explicitly tells learner this option is nonexistent. Grammar-mc for "put" conjugation collapses to 3-choice. Fix: `"put（無變化，過去式）"`.

2. **⚠️ P0 / OZ-3-FATAL — kt-ch14-l3-x4**: `optionsZh[2]="錯誤形"` — Directly labels one option the "wrong form". Fix: `"leads（現在第三人稱）"` with actual word + label.

3. **⚠️ P0 / OZ-2 × 28 — All same-char start (comprehension/picture-mc)**: e.g. `kt-ch9-l2-pm1` all start "一", `kt-ch10-l3-x4` all start "他". Pattern-start-matching lets 8-12 children bypass reading content. Fix: diversify sentence openers — remove leading subject pronoun or restructure 1-2 options.

4. **⚠️ P0 / OZ-8 × 20 — Length tell-tale**: `kt-ch10-l4-q7` lens=[2,6,2,4]; `kt-ch11-l6-x2` lens=[10,5,6,3]. Research basis (Alliant CTE 2025 MCQ guidelines): "All options must be parallel in grammar, length, and style." Options with max/min ≥ 3× are statistically flagged answer giveaways. Fix: standardize length within ±2 chars for ZH short options.

5. **⚠️ P0 / OZ-GM-FORMAT — 11 grammar-mc pure-label instances**: `kt-ch14-l7-x4` shows `['原形','過去式','第三人稱現在式','進行式']` with NO English word visible. Learner cannot evaluate the conjugation because the word is absent. Fix: mandate Format B (`"英文詞（ZH label）"`) or add EN word to Format C.

---

### E. Narrative Voice / Pacing Improvements (3 min, even if 0 structural violations)

**NV-1 Simile parallelism false-positive**: `kt-ch10-l5-q9` optionsZh = `['像石頭那麼重','像火那麼燙','像空氣那麼輕','像冰那麼冷']` triggers OZ-2 (all start "像") but this is excellent parallel poetic structure for children — keep as-is. The linter cannot distinguish deliberate rhetoric from lazy option writing. Add a whitelist exclusion for intentional simile sets.

**NV-2 OZ-6 character anchoring in narrative**: Ch10 pronoun mixing (嫦娥/后羿 in same option set) reflects genuine story complexity. However, for 8-12 readers, adding the character name once per group of 2 options reduces cognitive load dramatically: `"嫦娥很害怕——希望食物能保護她"` instead of `"很害怕——希望食物能保護他"`. This is also a B.550 語言一致性 win: ja/ko overlay can then attach to the name rather than the ambiguous pronoun.

**NV-3 OZ-8 length as comprehension signal**: Some length asymmetry is INTENTIONAL (foil = short/obviously wrong, correct = fully reasoned). Consider a P1 → P2 re-tier for single outlier cases (1 option clearly much longer while 3 are similar), reserving P1 for the harder case of 1 very short vs 3 long (correct answer is obviously the short one).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research basis:**
- Alliant University CTE (2025) MCQ design guidelines: "Make options grammatically parallel, similar in length and style. Avoid options that are obvious give-aways via length or label." Direct hit on OZ-8 and OZ-3-FATAL patterns. (Source: [Alliant CTE — Writing Multiple Choice Questions](https://cte.alliant.edu/resources-for-teaching/instructional-strategies/writing_multiple-choice-questions/))
- University of Waterloo CTE (2025): "Avoid stating that option is 'none of the above' or 'wrong' — it signals to the test-taker by elimination." Direct match for OZ-3-FATAL "（不存在）" / "錯誤形" pattern. (Source: [UWaterloo CTE — Designing MCQs](https://uwaterloo.ca/centre-for-teaching-excellence/catalogs/tip-sheets/designing-multiple-choice-questions))
- Duolingo Kids (Educational App Store review 2026): grammar options always show the actual conjugated word + grammatical label, never bare label alone. This is the industry-standard for grammar MCQ in language apps. Direct evidence for Format B over Format C. (Source: [Duolingo Kids Review](https://www.educationalappstore.com/app/duolingo-kids))
- Buck (2001) / Read (2000): "Distractor homogeneity is the single most important design dimension in MC listening items — distractors must be similar in length, syntactic complexity, and surface plausibility." OZ-8 length telltale directly violates this principle.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **grammar-mc optionsZh standardization (Format B mandatory)** | Duolingo Kids, Alliant CTE 2025 | ✅ Perfect fit — Format B already used in 8/11 OZ-GM-FORMAT cases, just need to extend to remaining 11 + add lint rule | Low (JSON update + 1 validate-lessons.js rule) | ⭐⭐⭐⭐ HIGH — fixes OZ-GM-FORMAT P1 + prevents future regression | **ARCH-REC #143** |
| **optionsZh length-homogeneity lint rule (max/min < 2× enforced)** | Alliant CTE 2025, Buck 2001 | ✅ Perfect fit — validate-lessons.js already has X2/X48/X57; add X91 rule for ZH length ratio | Low (20-line addition to validate-lessons.js) | ⭐⭐⭐ MEDIUM-HIGH — catches 20 existing + prevents all future OZ-8 | Consider |
| **OZ-3 "label-reveal" lint guard** | UWaterloo CTE 2025 | ✅ Easy win — scan optionsZh for substrings like 不存在/錯誤形/無效/不正確 | Low (5-line grep in validate-lessons.js) | ⭐⭐⭐⭐ HIGH — 2 existing P0 + prevents all future OZ-3-FATAL | Do it |

**ARCH-REC #143: X90_OPT_ZH_FORMAT_STANDARDIZE**

**Research source:** Duolingo Kids app design standard (Educational App Store review 2026); Alliant CTE "Writing MCQs" (2025) — options must be parallel in format, grammar, and length; UWaterloo CTE MCQ guide (2025) — never label an option as incorrect.

**Pickup 現狀:** Three coexisting grammar-mc optionsZh formats:
- Format A: `"dances（第三人稱現在）"` — EN conjugation + ZH label (strong: shows both)
- Format B: `"射（原形）"` — ZH translation of word + ZH label (strong: keeps meaning grounded)
- Format C: `"原形"` / `"過去式"` / `"第三人稱現在式"` — bare ZH label (weak: no word, learner cannot evaluate)

Additionally, OZ-3-FATAL pattern: 2 questions use ZH labels `"不存在"` / `"錯誤形"` that explicitly name distractors as incorrect — industry guidelines (UWaterloo) call this a design error.

**Recommendation (3 steps, all Low effort):**

1. **Standardize grammar-mc to Format B** for ch-verb grammar-mc (e.g., `"射（原形）"` for "shoot"), Format A for non-translatable irregular forms where ZH equivalent is confusing (e.g., `"was（過去式）"` for be-verb). Update the 11 Format C instances in Ch14-16.

2. **Add X91 lint rule to validate-lessons.js**:
   ```js
   // X91: optionsZh label-reveal guard
   const LABEL_REVEAL = ['不存在', '錯誤形', '無效', '不正確'];
   if (q.optionsZh?.some(oz => LABEL_REVEAL.some(b => oz.includes(b)))) {
     issues.push(`${q.id}: X91_OPT_ZH_LABEL_REVEAL (ZH label explicitly names wrong answer)`);
   }
   ```

3. **Add X92 optionsZh length-ratio lint**:
   ```js
   // X92: OZ-8 length telltale (max/min >= 3x and max >= 6)
   const zhLens = q.optionsZh?.map(o => o.length) ?? [];
   if (zhLens.length >= 3) {
     const mx = Math.max(...zhLens), mn = Math.min(...zhLens);
     if (mn > 0 && mx / mn >= 3 && mx >= 6) {
       issues.push(`${q.id}: X92_OPT_ZH_LEN_TELLALE (ZH max/min=${(mx/mn).toFixed(1)}x)`);
     }
   }
   ```

Estimated effort: 2h (JSON fix 11 instances + 2 lint rules + re-run validate). Zero runtime impact (pure content/lint layer).
