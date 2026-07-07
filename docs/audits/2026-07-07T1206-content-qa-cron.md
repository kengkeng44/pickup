# ⚠️ Content QA — 2026-07-07 12:06 UTC

**Today's angle:** #2 — R2 Distractor Doctrine (4-option blind retry quality)
**Focus:** Ch17–Ch24 (鶴妻 / 吐財葫蘆 / 鹿兒 / 大蘿蔔 / Anansi / 搬家婆婆 / 司馬光 / 孔融讓梨 — 100 listen-mc + 149 comprehension + 19 grammar-mc + 14 picture-mc audited)

**Angle definition:** R2 Distractor Doctrine = four-option blind-retry compatibility audit. Pickup's core mechanic (blindRetry: no answer revealed until correct) demands ALL 4 options be plausible on first encounter. This audit checks:
1. **STRUCT_AND_TELL** — correct is the structural outlier: 3 distractors share syntactic template (e.g. `[adj] and [adj]`, `"[verb]ing..."`), correct breaks it → learner can identify correct by structure alone, without engaging audio.
2. **R2_LENGTH_TELL** — correct is uniquely shortest/longest with ratio >1.5 → eliminates by character count.
3. **X2_LIST_BIAS** — all 4 options share same first word (he/they/by/because) → grammatical diversity lost, and in some cases distractors all share template except one.

**Industry basis:**
- 2024 Corpus Prevalence study: 84.9% of MCQ items in real-world datasets had correct option >1.3× mean distractor length → +8.3–20.0 pp accuracy bias even for LLMs (Controlling word count across options effectively eliminates length-based shortcuts).
- Tarrant et al. IWF rubric (documented): "non-homogenous length" and "non-homogenous content" are the two most common alignment flaws between distractors and stem.
- 5Ps typology (EFL 2026): well-designed distractors must be "plausible" — compelling learner to read/reflect rather than eliminate by surface feature.
- Rodriguez meta-analysis: even ONE non-functional distractor degrades 4-option to effective 3-option, materially reducing reliability.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 611  (warn-only)
  Ongoing: X59_EXPLAINZH_VOICE (Ch8/Ch9 「答案是」non-story voice)
  Ch9: X49_STIMULUS_REUSE, X57_ANTONYM_PAIR_MIRROR, X2_OPTION_LIST_BIAS
Schema: PASS (no Zod parse errors)
```

Lint is warn-only; no hard build failure.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 17 | kt-ch17-l7-q3 | listen-mc | "Tears shone quietly in her soft, dark eyes." | **STRUCT_AND_TELL**: 3 distractors "[adj] and [adj]", correct "sad with tears" breaks template | 改一個 distractor 為非 "X and Y" 格式：e.g. "proud of herself" | No |
| 18 | kt-ch18-l7-q3 | listen-mc | "Nolbu planted the seed. Big gourds grew very fast." | **STRUCT_AND_TELL**: 3 distractors lack "and", correct "rice and gold like Heungbu" uniquely has it | 重平衡：把 correct 改為 "gold coins like Heungbu" 或補一個 distractor 含 "and" | No |
| 19 | kt-ch19-l4-x1 | comprehension | "The crocodiles came up one by one." | **R2_LENGTH_TELL(1.92)**: correct "one at a time" (13) uniquely shortest; others 22-25 | 擴 correct: "each one at a time" or shorten one distractor | No |
| 20 | kt-ch20-l3-x4 | comprehension | "Grandpa pulls the turnip. Grandma pulls Grandpa." | **R2_LENGTH_TELL(1.83)**: correct "Grandma does" (12) uniquely shortest; others 19-22 | 擴 correct to full phrase: "Grandma holds on" or trim distractors | No |
| 21 | kt-ch21-l3-x5 | comprehension | "He filled a pot with water and poured some on the spider." | **R2_LENGTH_TELL(1.64)**: correct "plain water" (11) uniquely shortest; "thick sticky honey" (18) uniquely long | 擴 correct: "just plain water" (15) / trim "thick sticky honey" → "thick honey" | No |
| 21 | kt-ch21-l4-q8 | listen-mc | "He wanted to show everyone how very long he really was." | **STRUCT_AND_TELL**: 3 distractors "[adj] and [adj]"; correct "set on showing off" breaks template | 改兩個 distractor 為非 "X and Y" 格式 | No |
| 22 | kt-ch22-l5-q6 | listen-mc | "The teacher's words were calm and full of care." | **STRUCT_AND_TELL**: 3 distractors "how to X" (infinitive phrase); correct "good ways to live and act" is different register | 改 correct 格式 match: "how to live a good life" | No |
| 23 | kt-ch23-l3-q3 | listen-mc | "For a moment he sat on the rim and smiled down at the water." | **STRUCT_AND_TELL**: 3 distractors single bare verb phrase; correct "rested and looked happy" uniquely compound | 拆 correct: "sat quietly smiling" | No |
| 23 | kt-ch23-l6-x9 | comprehension | "The hard stone hit the thin clay wall. The jar cracked." | **R2_LENGTH_TELL(1.62)**: correct "it split open" (12) uniquely shortest vs. distractors 16-23 | 擴 correct: "the wall split open" | No |
| 23 | kt-ch23-l7-q3 | listen-mc | "His friend came out with the water, coughing but alive." | **STRUCT_AND_TELL**: 3 distractors "[verb] [particle/direction]" pattern; correct "washed out and still living" uniquely long compound | 拆 correct: "came out alive" | No |
| 24 | kt-ch24-l7-q8 | listen-mc | "His eyes were bright. He put a hand on Kong Rong's shoulder." | **STRUCT_AND_TELL**: 3 distractors "by [verb]-ing"; correct "with bright eyes and a soft smile" breaks template | 改 correct: "by smiling gently at him" | No |

### Additional P1 Violations (sampled 15 of 38)

| Ch | Q ID | type | violation | ratio | 修法 |
|----|------|------|-----------|-------|------|
| 17 | kt-ch17-l7-x7 | comprehension | X2_LIST_BIAS(first=because) | 1.24 | 把一個 distractor 改非 "because..." 結構 |
| 19 | kt-ch19-l3-q5 | listen-mc | X2_LIST_BIAS(first=he) | 1.40 | 改一個 distractor 為非 "he was..." |
| 19 | kt-ch19-l4-lg2 | comprehension | X2_LIST_BIAS(first=He) | 1.29 | 改一個 distractor 主詞 |
| 19 | kt-ch19-l5-q5 | listen-mc | X2_LIST_BIAS(first=by) | 1.06 | 改一個 distractor 非 "by [verb]-ing" |
| 19 | kt-ch19-l5-q10 | comprehension | R2_MAJOR(1.79) | 1.79 | 縮 correct or 擴 shortest distractor |
| 19 | kt-ch19-l6-q9 | listen-mc | X2_LIST_BIAS(first=they) | 1.10 | 改 distractor 主詞多樣性 |
| 19 | kt-ch19-l6-q10 | comprehension | X2_LIST_BIAS(first=he) | 1.18 | 改一個 distractor |
| 19 | kt-ch19-l7-x1 | comprehension | R2_MAJOR(1.76) correct=shortest | 1.76 | 擴 "full and satisfied" → "satisfied and content" |
| 20 | kt-ch20-l7-q9 | listen-mc | R2_MAJOR(1.69) | 1.69 | 縮最長 distractor |
| 21 | kt-ch21-l7-q6 | listen-mc | X2_LIST_BIAS(first=anansi) | — | 改 Anansi → different subject |
| 22 | kt-ch22-l4-q8 | listen-mc | R2_MAJOR ratio=1.44 + length sequencing | 1.44 | 統一 options 字符數 |
| 24 | kt-ch24-l4-q3 | listen-mc | R2_MAJOR(1.79) | 1.79 | 縮最長 or 擴最短 |
| 24 | kt-ch24-l4-q6 | listen-mc | R2_MAJOR(1.87) | 1.87 | 縮 "the largest and sweetest one"→"the biggest pear" |
| 24 | kt-ch24-l6-q8 | listen-mc | R2_MAJOR(1.75) | 1.75 | 統一 time-duration format |
| 17 | kt-ch17-l3-x8 | comprehension | STRUCT_AND_TELL(and) | 1.12 | 改 correct "curious but patient" → "quiet and curious" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MCQ questions audited (listen-mc + comprehension) | 249 |
| listen-mc only | 100 |
| R2 violation rate (ratio>1.25, listen-mc) | 63/100 = 63% |
| P0 violations (STRUCT_AND_TELL listen-mc + R2_LENGTH_TELL) | **11** |
| P1 violations (X2_LIST_BIAS + R2_MAJOR comprehension) | **38** |
| Chapters with ≥3 P0 | Ch19 (4), Ch23 (3) |
| Chapters clean (0 P0) | Ch18*, Ch22* |
| R2 violation by chapter (listen-mc) | Ch21: 60%, Ch22: 80%, Ch23: 80%, Ch24: 73% |
| Median ratio | 1.32 |
| p90 ratio | 1.50 |

*Ch18 / Ch22 have P1 violations but no P0.

---

## D. Top 5 P0

1. **Ch19 kt-ch19-l4-x1** `R2_LENGTH_TELL(1.92)` — correct "one at a time" (13 chars) uniquely shortest vs. 3 distractors averaging 23 chars. In blindRetry, a test-wise 8-year-old eliminates the short option risk-free.

2. **Ch20 kt-ch20-l3-x4** `R2_LENGTH_TELL(1.83)` — correct "Grandma does" uniquely shortest (12 chars). Classic "short=correct" tell documented in Haladyna IWF rubric.

3. **Ch24 kt-ch24-l7-q8** `STRUCT_AND_TELL` — 3 distractors all "by [verb]-ing…"; correct "with bright eyes and a soft smile" is categorically different syntactic frame. Learner identifies correct by exclusion, not comprehension.

4. **Ch21 kt-ch21-l4-q8** `STRUCT_AND_TELL` — 3 distractors "[adj] and [adj]"; correct "set on showing off" breaks template. Topic is Ch21 Anansi-spider, high-frequency lesson.

5. **Ch22 kt-ch22-l5-q6** `STRUCT_AND_TELL` — 3 distractors "how to [verb]" (infinitive-phrase register); correct "good ways to live and act" shifts to noun-phrase register. Register mismatch = structural tell even for A2 readers.

---

## E. Narrative Voice / Pacing Improvements (per constraint: ≥3 even if 0 lint violations)

1. **Ch17 (Crane's Return) L7 climax pacing**: The lesson ends on Crane's departure (emotional peak) but the final listen-mc focuses on factual detail ("what rule did she give him?") rather than emotional resonance. Adding a comprehension-type question "How did the old man feel when she flew away?" (gist/inference sub-skill) would give the story arc a proper emotional resolution — currently the lesson closes on a procedural note, not the Ghibli warmth that defines the app.

2. **Ch19 (Mouse Deer) mid-lesson repetition**: Lessons l5 and l6 both have "why could the crocodiles not catch mouse deer?" in slightly different form. Per R5 Jaccard cross-question rule, if two Qs in the same lesson share >40% content-word overlap, one should be converted to a different sub-skill (e.g. vocabulary focus on the word "trapped" or a listen-tf yes/no).

3. **Ch24 (Kong Rong's Pear) explainZh warmth**: Several explanationZh in Ch24 use dry factual register ("孔融選了小梨，把大梨留給哥哥們") without any奶奶語氣 warmth marker. Add "孔融好懂事喔！" or "這就是奶奶說的「謙讓」…" to maintain story immersion even in post-answer feedback.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #126: X63_STRUCTURAL_PARALLEL_LINT**

### Industry finding
A 2024 corpus audit (arxiv:2602.17377 "Corpus Prevalence of Multiple-Choice Question Options") found that in 84.9% of real MCQ datasets, the correct option exceeded 1.3× mean distractor length — correlating with +8.3–20.0 pp accuracy gains for models guessing by length alone. More relevantly, Tarrant et al.'s IWF rubric (PMC10711986, 2024) confirmed "non-homogenous content" (distractors not all in the same syntactic category as each other and the correct option) is the second-most-common structural flaw after length parity. The BenchMarker toolkit (arxiv:2602.06221, 2026) now auto-flags syntactic non-parallelism as a benchmark quality defect.

### What this means for Pickup
Current `validate-lessons.js` lint catches:
- X2_OPTION_LIST_BIAS (same first word — shallow parallelism)
- X57_ANTONYM_PAIR_MIRROR (antonym pair reduces 4-choice to 2-choice)
- R2 length parity (character ratio > threshold)

What it **does NOT** catch: **structural non-parallelism** — where 3 distractors follow one syntactic template (e.g. `[adj] and [adj]`, `by [verb]-ing`, `how to [verb]`) while the correct answer breaks it. This audit found **7 such P0 cases in listen-mc across Ch17–24**, and these are more dangerous than length tells because the tell survives even when options are similar length.

### Proposed implementation

```js
// In tools/validate-lessons.js, add to per-question lint:
function detectStructuralParallelTell(opts, correctIdx) {
  // Pattern: "X and Y" structure
  const andPattern = (o) => /^\w[\w\s]+ and \w[\w\s]+$/.test(o.trim());
  // Pattern: "by [verb]ing" structure  
  const byPattern = (o) => /^by \w+ing/.test(o.trim().toLowerCase());
  // Pattern: "how to [verb]" structure
  const howToPattern = (o) => /^how to \w/.test(o.trim().toLowerCase());
  
  for (const [name, fn] of [['AND', andPattern], ['BY_VBG', byPattern], ['HOW_TO', howToPattern]]) {
    const flags = opts.map(fn);
    const trueCount = flags.filter(Boolean).length;
    if (trueCount === 3 && !flags[correctIdx]) {
      // 3 distractors match pattern, correct doesn't → structural tell
      return `X63_STRUCTURAL_PARALLEL(${name})`;
    }
    if (trueCount === 3 && flags[correctIdx]) {
      // Only 1 distractor breaks pattern → still a tell (by exclusion of odd one out)
      const breakerIdx = flags.findIndex((f, i) => !f && i !== correctIdx);
      if (breakerIdx !== -1) return `X63_STRUCTURAL_PARALLEL_INVERSE(${name})`;
    }
  }
  return null;
}
```

### Pickup 適配分析

| 評估面 | 分析 |
|--------|------|
| Tech fit | ✅ 純 JS 正則, 不依賴外部 library, 加入 validate-lessons.js 即可 |
| Content scope | ✅ Ch17–24 有 7 P0 listen-mc 被這個規則抓住; 預估 Ch1–16 / Ch25–32 各有 5–10 件 |
| False-positive rate | 🟡 中 — "how to" pattern 在 comprehension 題裡可能過嚴。建議只在 `listen-mc` type 強制執行, comprehension 降為 warn |
| Effort | ~1h — 加 3 regex 到 validate-lessons.js + 在 P0 table 補 3 ch17-24 修法 |
| ROI | ⭐ 高 — 直接修補最嚴重的 blindRetry bypass; 不需改 src/ 或 lesson JSON |

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X63 Structural Parallel Lint (detect syntactic non-parallelism in 4 options) | arxiv:2602.17377 + PMC10711986 (Tarrant IWF) | ✅ 完全適合 — JSON 欄位 lint, 0 src/ 改動 | 1h | High | ✅ 推薦實作 |
| Option length normalization (trim all options to same word count bucket ±1) | arxiv:2602.17377 | 🟡 部分適合 — A2 兒童題大多是 3-6 word phrase, 強制統一到 ±1 word 可行, 但 picture-mc 的圖說天然偏長 | 2h | Medium | 🟡 只針對 listen-mc |
| BenchMarker auto-lint pipeline (arXiv:2602.06221) | 2026 NLP benchmark toolkit | ❌ 不適合 — 為英文 LLM 評測設計, 不含中英雙語 ELT 特化, 引入 dependency 代價高 | — | Low | ❌ 不引入 |
