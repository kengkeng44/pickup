# Content QA — 2026-07-12 00:05 UTC

**Today's angle**: R2 — Distractor Doctrine (4-option blind: length parity, verbatim giveaway, position balance, junk distractors)
**Focus**: Ch0–8 (571 MC questions across 9 chapters, ~987 total questions)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s):
  kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT ("firmer than straw")
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT ("out the back")
  kt-ch8-l3: X49_STIMULUS_REUSE
  kt-ch8-l4: X49B_STIMULUS_REUSE_COMP
  kt-ch8-l5: X49_STIMULUS_REUSE
  kt-ch8-l7: X49_STIMULUS_REUSE
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR (soft ↔ loud)
WARN lessons-ch9.json: 8 lint issue(s):
  kt-ch9-l2-pm1: X2_OPTION_LIST_BIAS
  kt-ch9-l4-lg2: X2_OPTION_LIST_BIAS
  kt-ch9-l3: X49_STIMULUS_REUSE
  kt-ch9-l4: X49_STIMULUS_REUSE
  kt-ch9-l5: X49_STIMULUS_REUSE
  kt-ch9-l2-pm1: X57_ANTONYM_PAIR_MIRROR (big)
  kt-ch9-l3-q10: X57_ANTONYM_PAIR_MIRROR (happy)
  kt-ch9-l4-q3: X57_ANTONYM_PAIR_MIRROR (loud)

Total mirror-lint issues: 441 (warn-only)
Build: PASS (no hard-fail)
```

---

## B. Violation Table

### P0 — A1 VERBATIM_GIVEAWAY (correct option text appears verbatim in sentence)

| Ch | Q ID | type | Sentence snippet | Correct option | 修法 | audio regen? |
|----|------|------|-----------------|---------------|------|-------------|
| 0 | kt-ch0-l5-lm1 | listen-mc | "Mochi looked at the **red** flower and then the **blue** sky." | "**blue**" | Replace with paraphrase: "the colour of the sky" or "a cool sky colour" | No |
| 0 | kt-ch0-l6-lm1 | listen-mc | "Grandma said hello to Mochi **every morning**." | "**every morning**" | Paraphrase: "each day at sunrise" or "daily at dawn" | No |
| 0 | kt-ch0-l7-lm2 | listen-mc | "Mochi counted **nine** stars in the night sky." | "**nine**" | Paraphrase: "one fewer than ten" or use numerals differently — distractors need comparable specificity | No |
| 3 | kt-ch3-l3-x5 | listen-tf | "The hare sat down on the **soft** grass and his eyes **closed** slowly." | "Yes" | Not fixable via paraphrase (TF type); restructure as inference question | No |
| 3 | kt-ch3-l3-x9 | listen-tf | "He sat down on the **soft** grass. His eyes **closed** slowly." | "Yes" | Duplicate stimulus of x5 — merge to single inference Q | No |
| 4 | kt-ch4-l4-x4 | listen-tf | "He looked at the three tired animals with **kind** eyes." | "Yes" | Convert to listen-mc inferring attitude; answer paraphrased | No |
| 5 | kt-ch5-l4-q3 | listen-mc | "In front of her stood a fence. It was not made of wood. It was made of **bones**." | "**bones**" | Paraphrase: "the remains of animals" or "something from skeletons" | No |
| 8 | kt-ch8-l2-gm1 | grammar-mc | "The wolf ___ hard and **blew** the straw house down." | "**blew**" | Restructure stem to not contain answer: "The wolf ___ so hard that the straw house fell." | No |
| 8 | kt-ch8-l5-x7 | listen-tf | "The wolf smiled and his eyes **grew bright**." | "Yes" | Convert to MC inference about wolf's intention | No |

**Total A1 P0: 9 violations**

### P0 — R2+A5 LENGTH_TELL (longest option = correct answer, ratio > 1.5)

| Ch | Q ID | type | Options (✓=correct) | ratio | 修法 | audio regen? |
|----|------|------|---------------------|-------|------|-------------|
| 0 | kt-ch0-l3-x5 | emoji-pick | ✓"😊 smile" \| "😴 sleep" \| "😢 cry" \| "😠 angry" | 1.67 | "angry" → "mad"; "sleep" stays; options now balanced | No |
| 1 | kt-ch1-l1-ep2 | emoji-pick | "🏞️ valley" \| ✓"⛰️ mountain" \| "🌳 forest" \| "🏜️ desert" | 1.67 | "mountain" → "hill"; or "valley" → "low ground" to pad | No |
| 1 | kt-ch1-l3-q9 | emoji-pick | ✓"👹 demons attacking" \| "🌊 a great flood" \| "🦠 a sickness" \| "🔥 a terrible fire" | 1.60 | Shorten correct: "👹 demons" or lengthen others to 2 words | No |
| 4 | kt-ch4-l3-q10 | emoji-pick | "🚂 a long train" \| "🌧️ a rain cloud" \| "🦅 a big eagle" \| ✓"☁️ a cloud of dust" | 1.55 | Shorten: "☁️ dust cloud" or lengthen others | No |

**Total R2+A5 P0: 4 violations**

### P1 — R2 LENGTH_PARITY (ratio > 2.0, non-length-tell)

| Ch | Q ID | type | Correct option | Shortest option | ratio | 修法 |
|----|------|------|---------------|----------------|-------|-----|
| 1 | kt-ch1-l5-q9 | listen-mc | "very poor" | "sunny" | 3.20 | Add qualifier to short options: "very clear" "very sunny" "sparkling clean" |
| 7 | kt-ch7-l4-x2 | grammar-mc | "An" | "A" | 3.00 | Pad options: "A word", "An word"... no — restructure with same-length alternates |
| 3 | kt-ch3-l7-q9 | listen-mc | "embarrassed" | "sleepy" | 2.67 | Use two-word options: "quite proud" "very sleepy" "very hungry" |
| 1 | kt-ch1-l5-q3 | listen-mc | "by taking a dumpling" | "by force" | 2.63 | Pad short options: "by sheer force" "by quiet following" |
| 7 | kt-ch7-l3-x7 | comprehension | "heartbroken" | "thankful" | 2.63 | "deeply grateful" for thankful; "lost and unsure" |
| 3 | kt-ch3-l6-q9 | listen-mc | "faster than ever" | "walking" | 2.57 | "walking slowly" "standing still" |
| 5 | kt-ch5-l3-x2 | comprehension | "dawn" | "noon" | 2.25 | "early dawn" "late noon" or reorder |
| 4 | kt-ch4-l6-q6 | listen-mc | "a force changing his body" | "no power at all" | 2.07 | Trim correct: "a body-changing force" |

**Total R2 P1 worst-18 (ratio>2.0): 18 violations | Total ratio>1.5: 90 violations**

### P1 — R3 KEY POSITION IMBALANCE (correctIndex distribution)

| Ch | pos0 | pos1 | pos2 | pos3 | total | status |
|----|------|------|------|------|-------|--------|
| Ch0 | 43.6% | 35.9% | 10.3% | 10.3% | 39 | ⚠️ **SEVERE** — pos0 is nearly 3× pos3 |
| Ch1 | 33.3% | 30.2% | 19.0% | 17.5% | 63 | borderline (pos0 heavy) |
| Ch3 | 32.5% | 28.6% | 19.5% | 19.5% | 77 | borderline |
| Ch4 | 32.8% | 34.3% | 16.4% | 16.4% | 67 | borderline |
| Ch5 | 27.3% | 33.3% | 21.2% | 18.2% | 66 | OK |
| Ch2/6/7/8 | — | — | — | — | — | OK (within 15-40%) |

**Ch0 is the worst offender**: first two positions capture 79.5% of correct answers. For an A2 beginner audience who default to position bias, this means ~43% of Ch0 Qs can be answered correctly by "always pick first." Fix: shuffle correctIndex for Ch0 and Ch1 lessons to approach 25% each.

### Narrative Voice / Pacing Improvement Proposals (even if 0 R1-R8 violation)

1. **Grammar-mc stems feel generic**: "Which word is correct?" (kt-ch1-l2-gm1, kt-ch7-l4-x2, etc.) strips the story context entirely. Better: retain story character: "Old Woman ___ to the river every morning — which form?" This keeps the Grandma's storytelling register.

2. **Listen-tf overuse in Ch3/4/5**: Listen-tf (Yes/No) questions often pair directly with the stimulus sentence (x5/x7/x9 within same lesson), making them recall not comprehension. Per Buck (2001), TF questions are valid only when the statement requires inference — not when it mirrors the exact sentence. Each TF in Ch3-5 should be reviewed against this standard.

3. **Distractor emotional range in Ch0**: Across Ch0 emotion questions, "angry/cry/sad" cluster appears 3×, dulling the distractor pool. Consider substituting one recurrence with "surprised" (驚訝) or "bored" (無聊) to expand emotional vocabulary coverage.

---

## C. Stats

| Metric | Count |
|--------|-------|
| MC questions scanned (Ch0-8) | 571 |
| A1 VERBATIM_GIVEAWAY (P0) | 9 |
| R2+A5 LENGTH_TELL (P0) | 4 |
| Total P0 | **13** |
| R2 LENGTH_PARITY ratio>2.0 (P1) | 18 |
| R2 LENGTH_PARITY ratio>1.5 (P1) | 90 |
| R3 position severely unbalanced (Ch0) | 1 chapter |
| Chapters with borderline pos bias | 3 (Ch1/3/4) |
| validate-lessons hard failures | 0 |
| validate-lessons warnings | 441 (carry-over from previous audits) |

---

## D. Top 5 P0

| # | Q ID | Rule | Impact | Fix |
|---|------|------|--------|-----|
| 1 | kt-ch0-l5-lm1 | A1 VERBATIM: "blue" in sentence → correct is "blue" | Player hears "blue" in audio, reads "blue" in option — zero comprehension tested | Replace with "a cool sky colour" / "the sky's colour" |
| 2 | kt-ch0-l6-lm1 | A1 VERBATIM: "every morning" in sentence → correct is "every morning" | Verbatim listen-mc is pure echo recall, not comprehension (Buck 2001 #1 CIV) | Replace with "at the start of each day" |
| 3 | kt-ch8-l2-gm1 | A1 VERBATIM: stem contains "blew" → correct is "blew" | Grammar stem accidentally reveals the conjugation being tested | Restructure: "The wolf ___ so hard that the house fell down" |
| 4 | kt-ch5-l4-q3 | A1 VERBATIM: "bones" in stimulus → correct is "bones" | Hardest story chapter (Baba Yaga) should build inference, not echo | Replace with "old white pieces" or "something sharp and dry" |
| 5 | kt-ch1-l5-q9 | R2 ratio=3.20 LENGTH DISPARITY | "very poor" (8 chars) vs "sunny" (5 chars) — savvy player narrows to "very poor/clear" | Pad all options to ~8 chars: "very sunny" "very clear" "very bright" |

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research basis:**
- **arXiv 2602.17377** "Corpus Prevalence of Multiple-Choice Question Options" (2026) confirms that option length variance is among the strongest non-content cues that leak correct answers.
- **ASC 2025 Item Writing Guide** (https://assess.com/docs/ASC_Item-Writing-Guide_2025.pdf): "The key should not stand out differently from other options in grammar, content, or **length**."
- **arXiv 2605.01846** "Do Large Language Models Plan Answer Positions?" (2026): LLM-generated MC has systematic position bias (pos0/1 overrepresented). Recommends deterministic post-hoc shuffle keyed to question ID for stable, uniform distribution.
- **Iimura (JLTA Journal 21)** on distractor plausibility in listening tests: functional distractors must resemble the correct answer in syntactic complexity and surface length to avoid length-cue guessing.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **Position-balanced shuffle** (shuffle correctIndex deterministically per qid hash so each chapter reaches ≈25% per slot) | arXiv 2605.01846 | ✅ 完全適合 — `loadChapterLessons()` 已有處理層, 加一個 `stableShuffleOptions()` helper 即可; Ch0 pos0=43.6% 是硬傷 | Low (2–3 hr) | High (fix pos bias all chapters, no JSON edit needed) | **推薦實作** |
| **Length-parity lint gate** (add R2 ratio>1.25 as hard-fail to validate-lessons.js) | ASC 2025 Item Writing Guide | ✅ 適合 — 現有 validate-lessons.js 已有 lint infra; 90 P1 violations表示需先修 JSON 再 gate | Medium (fix 90 Qs + add lint) | High (prevents regression) | **推薦實作** |
| **LLM-assisted distractor length normalizer** (auto-generate balanced alternatives via Claude Haiku in build step) | arXiv 2501.13125 (distractor gen via overgenerate-and-rank) | 🟡 部分適合 — 架構可行(Haiku batch), 但 Pickup 已有人工 content 審查; 半自動比全自動更安全 | High | Medium | 可選, 後期 |

**ARCH-REC #144: X91_R2_POSITION_BALANCED_SHUFFLE**

在 `src/data/lessons.ts` 的 `loadChapterLessons()` 或 `applyContentOverlay()` 後加 `stableShuffleOptions(lesson, seed=lesson.id)` post-processor:
1. 對每個 MC 題依 `qid` hash 做 deterministic options shuffle (Fisher-Yates with seeded PRNG)
2. 更新 `correctIndex` 指向 shuffle 後的正確位置
3. 不動 JSON 原始內容 — 純 runtime 修正
4. 結果: Ch0 pos bias 0→3 從 43/36/10/10 → 約 25/25/25/25
5. `validate-lessons.js` 新增 R3 check: `count(ci===i)/total ∈ [0.15, 0.40]` per chapter

Effort: ~2 hr Sonnet | ROI: 消除所有章節 pos0/1 heavy bias, 對 8-12 兒童特別重要(兒童傾向 position bias 更強 per cognitive load research)
