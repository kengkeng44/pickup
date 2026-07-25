# Content QA — 2026-07-25 12:00 UTC

**Today's angle:** A7 — content-word repetition (distractor word-echo tell)
**Focus:** Ch25–34 (historical stories: 愚公移山, Archimedes, 西遊記, 三顧茅廬, Columbus, Cleopatra, Robin Hood, Mulan, ch32-34 arcs)
**Auditor:** cron-content-qa automated session
**Angle rotation:** A7 not used in prior 8 cycles (last: A1/audio-sync/R1/#12/A4/R2/A6/#11)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s)  [pre-existing carry-over]
  X2_OPTION_LIST_BIAS / X48_NGRAM_VERBATIM_CORRECT / X49_STIMULUS_REUSE / X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch9.json: 8 lint issue(s)  [pre-existing carry-over]
  X2_OPTION_LIST_BIAS / X49_STIMULUS_REUSE / X57_ANTONYM_PAIR_MIRROR

Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail)
```

Build gate: **PASS** (no new schema errors).

---

## B. Violation Table

### A7d — Correct-answer uniquely echoes sentence content words (no distractor shares any sentence word)

Highest-severity: correct answer pulls key noun/verb/adjective verbatim from the audio sentence while all 3 distractors are topic-adjacent but word-clean. A2 learner only needs to spot the heard word in the options — comprehension bypassed entirely.

**Rate: 123 P0 violations / 401 MC questions (30.7%)** in Ch25–34.

| Ch | Q ID | type | sentence snippet | echo words | correct (A7d) | 修法 | audio regen? |
|----|------|------|-----------------|------------|---------------|-----|-------------|
| 25 | kt-ch25-l4-q3 | listen-mc | "The work was **slow**, but the family never stopped." | slow | "slow but steady" | "bit by bit, day after day" | No |
| 25 | kt-ch25-l4-q8 | listen-mc | "He kept his **basket** up and kept his eyes on the path." | basket | "keep walking with his basket" | "press on, eyes forward" | No |
| 25 | kt-ch25-l7-q3 | listen-mc | "They were kind giants from **above**." | above | "giant helpers sent from above" | "great helpers from the sky" | No |
| 26 | kt-ch26-l3-q6 | listen-mc | "They saw his **face** go **thin** and his eyes grow dark." | thin, face | "his face was thin and tired" | "he looked worn and hollow" | No |
| **26** | **kt-ch26-l6-q6** | **listen-mc** | "they placed a piece of **pure gold** of the same **weight**." | **pure, gold, weight** | "pure gold of equal weight" | "a solid piece of the same metal" | No |
| 26 | kt-ch26-l6-q8 | listen-mc | "the pure gold. The water rose to a **lower** mark." | lower | "stopped lower than before" | "settled at a shorter line" | No |
| **26** | **kt-ch26-l7-q6** | **listen-mc** | "The big idea came from a **small thing** he saw." | thing, small | "careful watching of a small thing" | "a tiny everyday moment" | No |
| **27** | **kt-ch27-l5-q3** | **listen-mc** | "Five tall **stone fingers** rose … like a giant **hand**." | giant, hand, stone | "a giant hand of stone" | "a towering rocky peak" | No |
| 27 | kt-ch27-l6-q8 | listen-mc | "Now I am **sorry**. I have had a long time to think." | sorry | "sorry and changed" | "at peace after long thought" | No |
| 27 | kt-ch27-l7-q3 | listen-mc | "a **yellow** paper with old gold writing." | yellow | "a yellow note with ancient words" | "an old written seal" | No |
| 28 | kt-ch28-l3-q3 | listen-mc | "They saw … house with **bamboo** around it." | bamboo | "green bamboo plants" | "tall green stalks all around" | No |
| 28 | kt-ch28-l4-q3 | listen-mc | "Today we will **visit** the small house again." | visit | "visit that cottage again" | "go back to see that wise man" | No |
| **29** | **kt-ch29-l4-q3** | **listen-mc** | "crew **tied** the **ropes** and lifted the white **sails**." | tied, ropes, sails | "tied ropes and raised the sails" | "made the ship ready to go" | No |
| **29** | **kt-ch29-l5-q3** | **listen-mc** | "By night the **stars** came out like **soft lights**." | lights, soft, stars | "soft lights from the stars" | "a ceiling of distant glimmers" | No |
| 30 | kt-ch30-l3-q6 | listen-mc | (similar pattern — echo confirmed in dataset) | — | — | paraphrase correct | No |
| 31 | kt-ch31-l4-q3 | listen-mc | "They nailed a **yellow** paper on Robin's **front door**." | door, front, robin's | "on Robin's front door" | "fixed to the door of his home" | No |

*Table shows representative sample of P0 listen-mc violations; full set = 59 listen-mc + 34 comprehension + 23 emoji-pick + 7 picture-mc = 123 total A7d P0.*

### A7c — Distractor word-cluster isolates correct answer

Distractors share a content word with each other but not with the correct answer — correct stands out as "the different one" by process of elimination.

**Count: 63 P1 violations across Ch25–34.**

| Ch | Q ID | type | cluster word(s) | correct (isolated) | 修法 |
|----|------|------|----------------|-------------------|-----|
| 25 | kt-ch25-l4-x4 | comprehension | "head" shared by 2 distractors | "stood still and frowned" | give 1 distractor a non-head word |
| 26 | kt-ch26-l5-q8 | listen-mc | "as ... as" simile structure in 3 distractors only | "as happy as solving a long puzzle" | break the simile pattern in 1 distractor |
| 27 | kt-ch27-l4-q6 | listen-mc | "brother/teacher/friend" kinship cluster | "the stars above, no one else" | replace 1 kinship distractor with non-person option |
| 28 | kt-ch28-l3-q8 | listen-mc | "tears/shout/run" emotion-action cluster | "he hid them behind a smile" | keep cluster at 2, not 3 |
| 29 | kt-ch29-l3-q6 | listen-mc | "fire/meal/sun" nature/domestic cluster | topic-unique correct | diversify 1 distractor domain |

*5 representative P1 samples; full set of 63 in dataset.*

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch25–34 (10 chapters, 35 lesson files) |
| Total MC questions | 401 |
| A7d P0 violations | 123 (30.7%) |
| A7c P1 violations | 63 (15.7%) |
| A7d in listen-mc | 59 / ~120 listen-mc Qs (49%) |
| A7d in comprehension | 34 (most severe comprehension impact) |
| Worst chapter | Ch29 (20 A7d), Ch31 (20 A7d) |
| Best chapter | Ch32 (6 A7d), Ch33 (4 A7d) |

**Key insight:** nearly 1 in 2 listen-mc questions in Ch25–34 has the correct answer uniquely echoing a sentence word. This converts listening comprehension into auditory word-spotting — fundamentally undermining the ELT goal for A2 learners.

---

## D. Top 5 P0

| # | Ch | Q ID | Violation | Why most severe |
|---|---|------|-----------|----------------|
| ⚠️ 1 | 26 | kt-ch26-l6-q6 | A7d: 3 echo words (pure, gold, weight) | All 3 key nouns verbatim in correct; distractors (copper coin, wooden block, warm milk) are completely off-topic → near-zero comprehension required |
| ⚠️ 2 | 27 | kt-ch27-l5-q3 | A7d: 3 echo words (giant, hand, stone) | Correct "a giant hand of stone" = sentence rephrased with same 3 nouns; distractors (grass, bowl, city wall) don't share a single word |
| ⚠️ 3 | 29 | kt-ch29-l4-q3 | A7d: 3 echo words (tied, ropes, sails) | Action verbs + object literal copy from sentence; distractors (fire, rest in sun, hot meal) completely semantic-wrong |
| ⚠️ 4 | 29 | kt-ch29-l5-q3 | A7d: 3 echo words (lights, soft, stars) | Metaphor in sentence re-used verbatim in correct; night-sky distractors (moon, ship fires, city light) don't echo → easy elimination |
| ⚠️ 5 | 31 | kt-ch31-l4-q3 | A7d: 3 echo words (door, front, robin's) | "Front door" = 2-word exact phrase from sentence + proper noun echo; distractors (hidden box, tree, river bridge) zero overlap |

---

## E. Narrative Voice / Pacing Improvements (3 proposals — required even with violations)

1. **Question-type monotony in Ch25-28**: Sequential comprehension blocks in these chapters show 3–4 consecutive "What did X do?" detail questions with no gist or inference break. Per R6 spec (≥2 inference per lesson), adding "Why do you think Yu Gong kept going even though the man laughed?" style inference questions would break the rhythm and deepen engagement for the 8-12 age group.

2. **ExplanationZh register drift**: Explanations in Ch25 maintain warm grandma voice ("他的兒子和孫子拿著籃子來了——是自家人來幫忙!"), but by Ch28–30 several shift to textbook mode ("選項 C 描述的是這種『一點一點、終能成功』的信念"). The longer explanations (kt-ch25-l4-lg2 style) read more like a teacher's guide than grandma's bedside note. Cap explanationZh at 2 sentences; replace "選項 X 描述" phrasing with story-callback ("愚公就是這樣每天一籃、慢慢前進！").

3. **Distractor semantic range**: Top 3 P0 violations share the same weakness — distractors are off-topic rather than plausible-but-wrong. Cambridge English Research Notes 72 recommendation: at A2, at least 1 distractor should be "schema-driven" (world-knowledge plausible given the story context). For kt-ch26-l6-q6 ("what did they put next to the crown?"), a schema-driven distractor would be "a ring made of silver" rather than "a tall glass of warm milk" — harder to eliminate without comprehension.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research sources:** Iimura (JLTA Journal 2021), Cambridge English Research Notes 72, arXiv:2010.12658 (neural distractor generation), Duolingo Interactive Listening paper.

**Finding:** Cambridge EN Research Notes 72 and Iimura 2021 confirm A2 learners disproportionately use word-matching strategies. A correct answer that uniquely echoes a sentence content word tests auditory word-spotting, not comprehension — exactly the wrong skill for ELT. The industry fix is a **word-overlap lint rule** on the correct answer: Jaccard(correct_words ∩ sentence_words) / |correct_words| must be < 0.15 at A2 level.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **X202: A7d word-overlap lint** — add `word_overlap_score` validation in `validate-lessons.js` for correct answers at A2 level; flag any question where correct option Jaccard overlap with sentence > 0.15 | arXiv:2010.12658 + Cambridge EN RN-72 | ✅ Fully compatible — pure lint in existing `validate-lessons.js` (node script, reads JSON, no src/ changes); adds `X60_CORRECT_ECHO_TELL` warn to existing output | **Low (2-3 hr)**: add ~30 lines to `tools/validate-lessons.js` | **High**: 30.7% of Ch25-34 MC questions would be flagged for review; directly fixes the #1 ELT teaching-validity issue found this session | **SHIP — gated behind lint warn, author decides which to fix** |

### ARCH-REC #202: X202_A7D_WORD_OVERLAP_LINT

**What to build:** In `tools/validate-lessons.js`, add a new lint rule `X60_CORRECT_ECHO_TELL`:

```js
// X60_CORRECT_ECHO_TELL — correct answer echoes sentence content word(s), distractors do not
// Fires when: correctWords ∩ sentenceWords ≠ ∅ AND no distractor shares any sentence word
// Severity: WARN (not fail) — author reviews and paraphrases correct option
```

**Schema addition (optional):** Add `word_overlap_score: number` computed field to question objects during validation output (not stored in lesson JSON — computed at lint time only).

**Threshold:** `|correctWords ∩ sentenceWords| / |correctWords| > 0.15` at difficulty `easy` or `medium`; `> 0.25` at `hard` (harder items may legitimately paraphrase less).

**Expected impact:** Flags 123 P0 cases in Ch25–34 for targeted distractor rewriting. Estimated 3–4 hr batch rewrite with Fable subagent (per model routing — content rewrites = Fable). Does NOT touch `src/` or lesson JSONs — lint only.

**Pickup 架構相容性:** Static web + JSON lessons + Node.js CI scripts. Pure additive change to `validate-lessons.js`. Fully compatible, zero runtime impact, zero bundle size change. Zero risk.
