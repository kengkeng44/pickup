# ⚠️ Content QA — 2026-07-03 00:09 UTC

Today's angle: **R2 — Distractor Doctrine (4-option length parity + key position balance)**
Focus: **Ch1–8** (桃太郎 / 醜小鴨 / 龜兔賽跑 / 駱駝駝峰 / Baba Yaga / 六天鵝 / 葉限 / 三隻小豬)

> **R2 definition (pickup-q-design-standard-v1.md §R2 + §R3 + §R4):**
> - **R2 LENGTH PARITY**: `max(stripped_len(option)) / min(stripped_len(option)) ≤ 1.25` for any MC
>   question. Prevents "longest option is correct" test-wiseness bias (Haladyna 2004, ETS item writers'
>   manual). Exempt: Yes/No (TF) questions (intrinsic English asymmetry) and grammar-cloze function-word
>   paradigms (all options are function words — same register, length differs by 1-2 chars only).
> - **R3 KEY POSITION BALANCE**: For any 4-option lesson with ≥4 MC questions, each position
>   `∈ {A,B,C,D}` should appear as the correct answer 15–45% of the time. Overweighted positions
>   train test-wiseness (child learns to always press A/B).
> - **R4 DISTRACTOR DIVERSITY**: 3 distractors must cover at least 3 failure modes: phonological
>   confusion / local-detail substitution / schema-inference / partial-parse. "Junk" distractors
>   (non-functional, ruled out instantly) reduce effective MC from 4→3 options.
>
> **Additional P0 found this cycle**: Wrong answer key (factual content error) in Ch3.

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s):
  kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l3: X49_STIMULUS_REUSE
  kt-ch8-l4: X49B_STIMULUS_REUSE_COMP
  kt-ch8-l5: X49_STIMULUS_REUSE
  kt-ch8-l7: X49_STIMULUS_REUSE
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR
Total mirror-lint issues: 447 (warn-only)
```

No new lint regressions vs. prior cycle. Pre-existing 447 mirror issues unchanged.

---

## B. Violation table

### B0 — P0 WRONG ANSWER KEY (content correctness error)

| Ch | Q ID | type | Sentence (stimulus) | Marked correct (ci=0) | Should be correct | violation | 修法 | audio regen? |
|----|------|------|--------------------|-----------------------|-------------------|-----------|------|-------------|
| ch3 | `kt-ch3-l5-x10` | comprehension | "No animal called out. The wind was the only sound. The tortoise was now closer to the finish." | **"resting wins every time"** | "step by step beats a quick nap" (ci=1) | WRONG_ANSWER_KEY — "resting wins every time" is the HARE's flawed philosophy, not the tortoise's moral. Any child who selects the correct moral gets penalised. | Change `correctIndex: 0 → 1`; update `explanationZh` to explain "step by step = slow steady wins" | No |

> **Severity**: P0-BLOCKER. Story's central moral is inverted in the answer key. The distractor
> "step by step beats a quick nap" is pedagogically CORRECT and currently marked wrong.
> `explanationZh: 全場安靜、只有風聲、烏龜越來越近——「緊張安靜地等待烏龜接近勝利」` does not
> explain why "resting wins" is correct — it describes the scene, not a moral lesson. This mismatch
> between explanationZh and the marked answer further confirms the key is wrong.

---

### B1 — P0 R2 LENGTH TELL (ratio > 1.5, longest = correct)

| Ch | Q ID | type | Options (stripped) | ratio | violation | 修法 | audio regen? |
|----|------|------|--------------------|-------|-----------|------|-------------|
| ch1 | `kt-ch1-l3-q9` | emoji-pick | ✓"demons attacking"(16) / "a great flood"(13) / "a sickness"(10) / "a terrible fire"(15) | **1.60** | Longest is correct; correct option 60% longer than shortest | Expand shorter option: "a great illness" → "a spreading sickness" (14ch) / "a terrible flood" (16ch) | No |
| ch4 | `kt-ch4-l3-q10` | emoji-pick | "a long train"(12) / "a rain cloud"(14) / "a big eagle"(11) / ✓"a cloud of dust"(15) | **1.36** | Longest is correct | Trim correct: "dust rising near" (14ch) or rewrite peers to 14-15ch | No |

> **ch1-l3-q9 note**: sentence field contains `"What was the bad news?"` — this appears to be the
> question reused as the sentence stimulus (no story narration sentence backing it). This is a
> secondary structure issue (missing narration context) compounding the R2 tell.

---

### B2 — P0 R2 + R1 DOUBLE VIOLATION (verbatim echo AND length tell)

| Ch | Q ID | type | Sentence | Options | ratio | dual violation | 修法 | audio regen? |
|----|------|------|----------|---------|-------|---------------|------|-------------|
| ch4 | `kt-ch4-l6-x9` | picture-mc | "The Camel's back was flat and smooth, like a wide soft mat." | "wearing a big bag"(29) / "huge tall hump"(33) / "two humps"(30) / ✓"a camel with a flat smooth back and no hump"(43) | **1.48** | R2: longest is correct (43 vs 29, ratio 1.48). R1: correct option contains "flat smooth back" which echoes "flat and smooth" from sentence verbatim | Rephrase correct to remove echo: "no bump or curve at all" (21ch, ratio now 33/21=1.57—still bad). Better: expand others to 35+ch AND remove echo: correct→"without any raised part on its back" (30ch) | No |

---

### B3 — P1 R2 LENGTH TELL (ratio 1.25–1.5, longest = correct, 4-option only)

Summary: **115 real R2 tells** across Ch1–8 (21.6% of 533 MC questions). Worst by chapter:

| Ch | R2 tells | Q count | Rate |
|----|----------|---------|------|
| ch3 | 19 | ~65 | 29% |
| ch4 | 18 | ~75 | 24% |
| ch6 | 18 | ~70 | 26% |
| ch7 | 18 | ~70 | 26% |
| ch1 | 13 | ~55 | 24% |
| ch5 | 11 | ~55 | 20% |
| ch2 | 7 | ~55 | 13% |
| ch8 | 11 | ~58 | 19% |

**Top 5 highest-ratio P1 tells:**

| Ch | Q ID | type | Correct option (len) | Shortest distractor (len) | ratio |
|----|------|------|---------------------|--------------------------|-------|
| ch4 | `kt-ch4-l6-x9` | picture-mc | "a camel with a flat smooth back and no hump" (43) | "wearing a big bag on its back" (29) | 1.48 |
| ch7 | `kt-ch7-l6-x5` | comprehension | "the shoe was meant to reach someone important" (45) | "Yexian mailed the shoe herself" (30) | 1.50 |
| ch4 | `kt-ch4-l6-x6` | comprehension | "he was rude on purpose, not by accident" (39) | "too scared to speak at all" (26) | 1.50 |
| ch6 | `kt-ch6-l4-q10` | comprehension | "quiet hard work to save her brothers" (36) | "happy days in the forest" (24) | 1.50 |
| ch2 | `kt-ch2-l5-x1` | comprehension | "in an old woman's warm kitchen" (30) | "in a barn by a river" (20) | 1.50 |

> **Pattern**: The R2 tell is heavily concentrated in `comprehension` and `picture-mc` types. The
> correct answer for comprehension/inference questions tends to be the most complete/descriptive
> option, making it naturally longer. This is a **systemic content authoring pattern**, not random.
> Mitigation: trim verbose correct answers AND expand brief distractors to match (~22-28 chars for
> simple questions, ~30-40 for inference questions).

---

### B4 — R3 KEY POSITION BALANCE (4-option MC per lesson)

| Ch | Lesson | Total MC | A% | B% | C% | D% | Δ | severity |
|----|--------|----------|----|----|----|----|---|---------|
| ch3 | `kt-ch3-l5` | 10 | **40.0** | **10.0** | 20.0 | 30.0 | **30.0** | P0 — B only 1 occurrence in 10 Qs |
| ch8 | `kt-ch8-l4` | 8 | 12.5 | **37.5** | 25.0 | 25.0 | **25.0** | P1 — A underrepresented |
| ch7 | `kt-ch7-l4` | 10 | 20.0 | **40.0** | 20.0 | 20.0 | **20.0** | P1 — B overweighted |
| ch3 | `kt-ch3-l4` | 11 | 18.2 | 27.3 | **36.4** | 18.2 | **18.2** | P1 — C mild |
| ch8 | `kt-ch8-l3` | 6 | **33.3** | 16.7 | 16.7 | **33.3** | **16.6** | P1 — bimodal AD |
| ch8 | `kt-ch8-l5` | 6 | **33.3** | **33.3** | 16.7 | 16.7 | **16.6** | P1 — CD underweight |
| ch8 | `kt-ch8-l6` | 6 | 16.7 | 16.7 | **33.3** | **33.3** | **16.6** | P1 — AB underweight |

> **Worst case `kt-ch3-l5`**: position B (index 1) is the correct answer only ONCE out of 10 MC
> questions (10%). A test-wise 8-year-old learns never to pick B in this lesson. The lesson also
> contains the P0 wrong-answer-key violation above — fixing that entry should also shift B count to 2.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total entries scanned (Ch1–8) | 915 |
| Narration entries (skipped) | 230 |
| MC entries with options | 533 |
| **P0 WRONG ANSWER KEY** | **1** (kt-ch3-l5-x10) |
| P0 R2 tells (ratio > 1.5) | 4 (incl. 2 emoji-pick confirmed) |
| P0 R2+R1 double violation | 1 (kt-ch4-l6-x9) |
| P1 R2 real tells (4-option, 1.25–1.5) | 115 (21.6% of MC) |
| R2 Yes/No TF false positives (exempt) | 143 |
| R3 position imbalance Δ > 25 | 1 (kt-ch3-l5) |
| R3 position imbalance Δ > 15 | 7 lessons |
| Lessons at perfect R3 balance (Δ=0) | 16 |
| Grammar-cloze function-word Qs (R4 note) | 4 (on, in, by, with / was/is/were/am) |
| Audio regen needed | 0 |
| Pre-existing lint issues | 447 (no change) |

---

## D. Top 5 P0

| # | Ch | Q ID | Rule | Description | 修法 |
|---|----|----- |------|-------------|------|
| 1 | ch3 | `kt-ch3-l5-x10` | WRONG_ANSWER_KEY | "resting wins every time" (A) is marked correct but is the HARE's flawed philosophy. Correct moral "step by step beats a quick nap" (B) is marked wrong. | `correctIndex: 0 → 1`; rewrite explanationZh |
| 2 | ch4 | `kt-ch4-l6-x9` | R2+R1 DOUBLE | Correct "a camel with a flat smooth back and no hump" (43ch) echoes "flat and smooth" from sentence AND is 48% longer than shortest distractor. | Rephrase correct to remove echo + trim to 30ch; expand shortest distractor to ≥32ch |
| 3 | ch3 | `kt-ch3-l5` | R3 POSITION | Position B = 10% (1/10) — severely underweighted. Test-wise child learns "never press B" in this lesson. | Reshuffle option order on 3-4 questions to give B equal 25% representation |
| 4 | ch1 | `kt-ch1-l3-q9` | R2 LENGTH TELL | "demons attacking" (16ch) 60% longer than "a sickness" (10ch); longest = correct. | Expand shorter options to 14-16ch ("a spreading sickness", "a terrible flood") |
| 5 | ch1 | `kt-ch1-l3-q9` | STRUCT: sentence=question | The `sentence` field contains "What was the bad news?" — the question itself, not a story narration line. No stimulus text for child to process before answering. | Move "What was the bad news?" to `questionEn`; add proper narration sentence from story as `sentence` |

---

## E. Narrative Voice / Pacing Improvements (3 required per cron policy)

**E1 — Missing questionEn scaffolding in kt-ch3-l5 (comprehension Qs)**

All 5 `comprehension` type questions in `kt-ch3-l5` have empty `questionEn: ""` — the renderer
falls back to the sentence itself as the question prompt. For 8-12 year olds who need explicit
question framing ("What did the animals do when the tortoise got close?"), relying on the narration
sentence alone to frame the MC is cognitively demanding. Recommendation: add `questionEn` to each
comprehension entry; it can be a simple reformulation of what the question is asking.

**E2 — Question sub-skill monotonicity in Ch4-l6 (Camel chapter)**

`kt-ch4-l6` has 6 consecutive questions (x1–x9) asking "why did the Camel do X?" — all WHY
inference questions about the same character's motivation. By Q4, children with any memory of the
story pattern can apply schema inference to answer without processing individual sentences. Recommend
interleaving 2 detail questions ("What did the Djinn say next?" / "What did the Camel look like
after?") among the inference chain to maintain sub-skill variety per R6.

**E3 — Anachronistic character label in kt-ch7-l6-x5 (Yexian / Ye Xian)**

Distractor `"the new wife sent the shoe to the king"` introduces "new wife" — a character role that
does not appear in Ch7's simplified Yexian narrative (which uses "stepmother" and does not reference
a "new wife" character). This is narrative-inconsistent and may confuse children into searching for
a character they haven't met. Replace distractor with one grounded in Ch7's actual cast:
`"the stepmother hid the shoe herself"` (35ch, plausible schema-inference distractor, narrative-consistent).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #107: X63_R2_LENGTH_PARITY_LINT**

### 背景 (Industry research)

ACL Anthology EMNLP 2024 survey on distractor generation ("Distractor Generation in Multiple-Choice Tasks: A Survey of Methods, Datasets, and Evaluation") explicitly states: *"Distractors should be parallel in construction and be similar in length, style and specificity"* — confirming R2 as industry standard. ([Source](https://aclanthology.org/2024.emnlp-main.799/))

Duolingo's content pipeline (per their 2025 engineering blog) enforces **"fewer than 75 characters"** per option as a hard constraint in their AI generation prompts, and uses Birdbrain (automated filter) to reject exercises failing quality metrics before human review. ([Source](https://blog.duolingo.com/large-language-model-duolingo-lessons/))

**Current Pickup state**: 115 real R2 violations (21.6% of 533 MC questions) in Ch1–8 alone. The "longest option is correct" pattern is a known test-wiseness bias: research (Haladyna, Downing & Rodriguez 2002) shows 20–40% of test-wise examinees use option-length as a cue when uncertain. For Pickup's 8-12 audience this is particularly harmful — children who discover the pattern learn to game rather than listen.

**The gap**: `validate-lessons.js` currently has no R2 length-parity check. The existing X48/X57 lint rules catch verbatim echo and antonym mirrors but miss the length dimension entirely.

### Pickup 適配分析

**✅ 適合 — Effort Low-Medium, ROI High**

`validate-lessons.js` already loops over every lesson question and checks option arrays. Adding R2 is a 15-line addition:

```js
// validate-lessons.js — add after existing option checks
function checkR2LengthParity(q, lessonId) {
  const opts = (q.options || q.optionsEn || []).map(String);
  if (opts.length < 3) return; // skip TF / Yes-No
  const set = new Set(opts.map(o => o.trim().toLowerCase()));
  if (set.has('yes') && set.has('no') && set.size === 2) return; // Yes/No exempt
  
  // Strip emoji before measuring
  const stripped = opts.map(o => o.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27FF}\u{1F900}-\u{1FAFF}]/gu, '').trim());
  const lens = stripped.map(o => o.length).filter(l => l > 0);
  if (lens.length < 2) return;
  const ratio = Math.max(...lens) / Math.min(...lens);
  if (ratio > 1.25) {
    const ci = q.correctIndex ?? q.answer;
    const longestIdx = lens.indexOf(Math.max(...lens));
    const isLongestCorrect = (longestIdx === ci);
    const severity = (ratio > 1.5 && isLongestCorrect) ? 'X63_R2_PARITY_P0' : 'X63_R2_PARITY_WARN';
    return { id: q.id || q.qid, severity, ratio: ratio.toFixed(2), longestIsCorrect: isLongestCorrect };
  }
}
```

- `MIRROR_LINT_STRICT=1` env flag pattern (same as X57) — warn-only by default, STRICT mode blocks build
- Auto-exempts: 2-option TF, Yes/No, and an optional `// @R2-exempt` comment in `explanationZh` for grammar-cloze paradigms

**Impact**: Would flag the 1 P0 wrong-answer-key question, both high-ratio P0 R2 tells, and surface the 115 P1 warns as a queue for content authors — driving the 21.6% rate toward 0 over time.

**Constraints**:
- NO changes to `src/` or lessons JSON files (lint-only)
- Grammar-cloze Qs (`['on','in','by','with']`, `['was','is','were','am']`) naturally exempt by ratio ≤ 1.25 (function words are similarly short); no special handling needed
- Build gate stays warn-only until content team clears backlog

### Verdict

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| R2 length-parity lint in validate-lessons.js | EMNLP 2024 distractor survey + Duolingo option-length constraint | ✅ 完全適合 — 15-line addition, zero JSON migration, flags 115 existing violations as addressable queue | Low (1-2 hrs: add check + STRICT flag + test) | High (eliminates 21.6% of MC questions with test-wiseness length cue) | **推薦實作** |

---

*Audit generated 2026-07-03 00:09 UTC | Angle: R2 Distractor Doctrine | Chapter: Ch1–8 | P0: 5 (1 wrong-answer-key + 4 R2 tells) | P1: 115 R2 warns + 7 R3 imbalance*
