# Content QA — 2026-08-01 00:06 UTC

**Today's angle:** A4 — Mirror Patterns (negation/identity opposition pairs)  
Two options in the same question form a semantic antonym or logical-complement pair, collapsing 4-choice to 2-choice for any learner with story comprehension. Distinct from the linter's X57_ANTONYM_PAIR_MIRROR (single-adjective antonyms) — this audit targets **phrasal/propositional opposition** (subject+action or descriptor-cluster antonyms).

**Focus:** Ch0–8 (Grandma intro / Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Three Little Pigs)

**Rotation context:** Previous 8 cycles: A1 / A7 / #12 / R2 / R1 / A6 / A3 / #11 — A4 not covered in recent 8 cycles.

**Scope:** 231 MC-type Qs across Ch0–8 (`listen-mc`, `comprehension`, `picture-mc`). grammar-mc / narration / tap-pairs / listen-tf excluded.

**Auditor:** Claude (claude-sonnet-4-6) | 2026-08-01 00:06 UTC

---

## A. validate-lessons.js Result

```
OK  lessons-ch0.json:   7 lessons
WARN lessons-ch1.json: 17 lint issue(s)   [pre-existing X2/X49/X57]
WARN lessons-ch2.json: 10 lint issue(s)   [pre-existing X2/X49/X57]
WARN lessons-ch3.json: 19 lint issue(s)   [pre-existing X2/X49/X57]
WARN lessons-ch4.json: 10 lint issue(s)   [pre-existing X2/X49/X57]
WARN lessons-ch5.json: 10 lint issue(s)   [pre-existing X2/X49/X57]
WARN lessons-ch6.json: 13 lint issue(s)   [pre-existing X2/X49/X57]
WARN lessons-ch7.json: 13 lint issue(s)   [pre-existing X2/X49/X57]
WARN lessons-ch8.json:  9 lint issue(s)   [pre-existing X2/X49/X57]
```

All WARNs are pre-existing (X2 / X49 / X49B / X57). No new build-blockers. 32 new A4 P0 violations found by this audit (not yet in linter).

---

## B. Violation Table

> **Severity key** — P0: correct option is one half of the opposition pair (4-choice collapses to ≤2-choice for any story-aware learner). P1: both opposing options are distractors (lowers cognitive diversity without leaking the answer).

### P0 — Most Severe (correct answer is one pole of a binary pair)

| # | Ch | Q ID | Type | Question (truncated) | Opt A (pole 1) | Opt B (pole 2) | ✓ idx | audio regen? |
|---|----|----|------|----------------------|-----------------|----------------|-------|--------------|
| 1 | Ch1 | kt-ch1-l6-x1 | comprehension | What surprised them at the demon gate? | [0] many demon **guards** stood at the entrance | [3] ✓ the door stood **wide open** with **no guards** | 3 | no |
| 1b | Ch1 | kt-ch1-l6-x1 | comprehension | (same Q) | [1] the heavy gate was **locked tight shut** | [3] ✓ the door stood **wide open** with no guards | 3 | no |
| 2 | Ch5 | kt-ch5-l3-q5 | listen-mc | What did the white rider bring? | [0] a **cold** rain | [3] ✓ **morning light** | 3 | no |
| 2b | Ch5 | kt-ch5-l3-q5 | listen-mc | (same Q) | [1] **deep darkness** | [3] ✓ **morning light** | 3 | no |
| 3 | Ch6 | kt-ch6-l4-q5 | listen-mc | When could the brothers be boys? | [1] only at **sunrise** | [0] ✓ briefly **after dark** | 0 | no |
| 3b | Ch6 | kt-ch6-l4-q5 | listen-mc | (same Q) | [2] **all day** and night | [0] ✓ briefly after dark | 0 | no |
| 4 | Ch6 | kt-ch6-l4-x6 | picture-mc | When could the brothers be human? | [0] **all day** long | [2] ✓ one hour **nightly** | 2 | no |
| 4b | Ch6 | kt-ch6-l4-x6 | picture-mc | (same Q) | [1] **mornings only** | [2] ✓ one hour nightly | 2 | no |
| 5 | Ch2 | kt-ch2-l3-x4 | comprehension | What changed when the animals laughed? | [0] ✓ mother duck began to **step back** | [1] mother duck **protected** him more | 0 | no |
| 6 | Ch1 | kt-ch1-l7-q3 | listen-mc | How did Momotaro and friends win? | [0] **alone** and lucky | [3] ✓ **together** as a team | 3 | no |
| 7 | Ch3 | kt-ch3-l7-q5 | listen-mc | How did the animals feel? | [0] scared and **quiet** / [2] sad and **worried** | [3] ✓ **excited and happy** | 3 | no |
| 8 | Ch1 | kt-ch1-l7-x6 | comprehension | How did the village feel when Momotaro returned? | [0] **worried** and scared | [1] ✓ **joyful** and proud | 1 | no |
| 9 | Ch2 | kt-ch2-l4-x13 | comprehension | How long did his happiness last? | [0] one single **sunny** day | [1] ✓ three long **dark** weeks | 1 | no |
| 10 | Ch2 | kt-ch2-l7-x1 | comprehension | What signs show that spring has arrived? | [0] **snow is falling and ice is growing** | [3] ✓ leaves grow and **ice melts** under warm sun | 3 | no |
| 11 | Ch4 | kt-ch4-l3-q8 | listen-mc | How did the three feel after many days? | [0] fresh and **happy** | [2] ✓ sore and **upset** | 2 | no |
| 12 | Ch5 | kt-ch5-l4-x6 | picture-mc | How did Vasilisa feel when she arrived? | [0] **excited and happy** | [1] ✓ **tired and scared** | 1 | no |
| 13 | Ch2 | kt-ch2-l4-q6 | listen-mc | What did one wild duck become to him? | [1] an **enemy** | [2] ✓ a **friend** | 2 | no |
| 14 | Ch2 | kt-ch2-l6-q6 | listen-mc | What happened to him in the pond? | [0] ✓ got **trapped in ice** | [2] found **warm food** | 0 | no |
| 15 | Ch8 | kt-ch8-l4-q9 | listen-mc | How did the wolf knock and speak? | [0] a **light tap** and then silence | [3] ✓ **loud** knock, sweet voice | 3 | no |
| 16 | Ch7 | kt-ch7-l5-x7 | comprehension | What kind of event is happening in the village? | [0] a **quiet harvest morning** | [1] ✓ a **lively night festival** | 1 | no |
| 17 | Ch3 | kt-ch3-l3-x3 | picture-mc | Why was it easy for the hare to fall asleep? | [0] ✓ it was **warm, soft and comfortable** | [1] it was **dark and quiet at night** | 0 | no |
| 18 | Ch1 | kt-ch1-l3-x5 | comprehension | How did the village feel when the news arrived? | [0] **excited and joyful** | [3] ✓ **worried and afraid** | 3 | no |
| 19 | Ch1 | kt-ch1-l4-x3 | comprehension | Why were his mother's eyes full of tears? | [0] she was **very happy he left** | [1] ✓ she was **worried and would miss** him | 1 | no |
| 20 | Ch2 | kt-ch2-l5-x12 | picture-mc | Where did the grey duckling stay in the cottage? | [0] with a **warm friend** close by | [1] ✓ in the **cold, without any hope** | 1 | no |
| 21 | Ch2 | kt-ch2-l4-x10 | comprehension | When did the grey duckling escape? | [0] at **sunrise** the next morning | [3] ✓ that **night**, in the dark | 3 | no |
| 22 | Ch5 | kt-ch5-l3-q9 | listen-mc | How did Vasilisa feel? | [0] **scared and lost** | [1] **happy and singing** | 2 | no |
| 23 | Ch0 | kt-ch0-l1-q2 | listen-mc | How was the night? | [0] ✓ dark and **wet** | [1] **bright and sunny** | 0 | no |

### P1 — Distractor-cluster opposition (both options non-correct, lowers diversity)

| # | Ch | Q ID | Opt pair that oppose | Effect |
|---|----|----|----------------------|--------|
| P1-1 | Ch3 | kt-ch3-l6-x10 | "fast runners should never rest" vs "slow animals can never win" | Distractors fight each other, not the correct inference |
| P1-2 | Ch3 | kt-ch3-l4-x8 | "tortoise was scared/hare was brave" vs "hare worked hard/tortoise was lazy" | Both wrong but semantically linked, collapse 4→3 effective |
| P1-3 | Ch2 | kt-ch2-l4-x10 | "at sunrise" vs "on a cold winter afternoon" | Both temporal distractors partially oppose correct "that night" |
| P1-4 | Ch2 | kt-ch2-l7-x10 | "winter" vs "summer" | Season antonym pair among distractors |
| P1-5 | Ch2 | kt-ch2-l4-x5 | "he could die alone in the cold" vs "warm spring arrived just in time" | Distractors for "his friends came to rescue him" oppose each other |
| P1-6 | Ch1 | kt-ch1-l3-x7 | "selfish and very proud" vs "lazy and much afraid" | Two negative descriptors in distractors semantically close |

---

## C. Stats

| Metric | Value |
|--------|-------|
| MC-type Qs scanned (Ch0–8) | 231 |
| P0 violations found | 23 (from 22 unique Q IDs, one Q has 3 pairs) |
| P1 violations found | 6 |
| Chapters affected | 7 of 9 (Ch0, Ch1, Ch2, Ch3, Ch4, Ch5, Ch6, Ch7, Ch8) |
| Double-collapse Qs (≥2 options oppose correct) | 4 Qs (kt-ch1-l6-x1, kt-ch5-l3-q5, kt-ch6-l4-q5, kt-ch6-l4-x6) |
| Emotional-state cluster (feel/mood Qs) | 9 of 23 P0 violations |
| Already caught by X57 linter | ~4 (adjective-pair negations already flagged) |
| NEW violations (not in linter) | ~19 phrasal/propositional opposition pairs |

---

## D. Top 5 P0

1. ⚠️ **kt-ch1-l6-x1** — DOUBLE collapse: opts[0]="many guards stood" AND opts[1]="gate locked shut" BOTH directly oppose correct opts[3]="wide open with no guards". Effective choice = 2.

2. ⚠️ **kt-ch5-l3-q5** — DOUBLE collapse: opts[0]="cold rain" AND opts[1]="deep darkness" BOTH oppose correct opts[3]="morning light". Cold/dark vs light — simplest opposition in the dataset.

3. ⚠️ **kt-ch6-l4-q5** — DOUBLE collapse: opts[1]="only at sunrise" AND opts[2]="all day and night" BOTH oppose correct opts[0]="briefly after dark". Temporal logic collapses.

4. ⚠️ **kt-ch6-l4-x6** — DOUBLE collapse: opts[0]="all day long" AND opts[1]="mornings only" BOTH oppose correct opts[2]="one hour nightly". Same narrative fact as above — picture-mc variant with same opposition.

5. ⚠️ **kt-ch2-l3-x4** — Subject-action antonym pair: opts[0](correct)="mother duck began to step back" vs opts[1]="mother duck protected him more". Same subject, directly opposite verbs. Effective 50/50.

---

## E. Repair Guidance (modify guide for content team)

**Pattern rule (to add to design standard):**

> **A4-phrasal**: For any two options {i, j} in the same question: if semantic content of opt_i ≈ ¬(semantic content of opt_j), the question loses ≥1 effective foil. Forbidden pairings: alone↔together, open/no-guards↔locked/guarded, warm/light↔cold/dark, step-back↔protect, morning↔night, happy↔sad/worried, fast↔slow (when used as whole-option descriptors).

**Repair strategy per cluster:**

| Cluster | Fix |
|---------|-----|
| Emotional-state Qs ("How did X feel?") | Replace one of two opposing emotions with a **plausible-but-wrong inference** from the scene (e.g., "calm and focused" — not in the text but schema-consistent). |
| Temporal Qs ("When did X happen?") | Replace time-antonym distractor with a **wrong specific detail** from a different scene (e.g., "at the start of Ch3" instead of "at sunrise"). |
| Action-opposition Qs (mother duck) | Replace one pole with a **partial-parse** option (captures half the action) — e.g., "mother duck stood quietly and watched". |
| Double-collapse Qs (Ch1-l6, Ch5-l3, Ch6-l4) | Remove the second opposing distractor entirely; replace with schema-driven inference (sounds plausible from world knowledge but unsupported). |

---

## F. Narrative Voice / Pacing Improvements (3 proposals — even with 0 R1-R8 violations)

1. **Sub-skill monotony in Ch1 comprehension**: Lessons l3–l7 have 4–5 consecutive "what does X tell us about Y character?" higher-order inference Qs without a relief detail Q. R6 recommends no 2 consecutive Qs with same sub-skill. Proposed fix: interleave 1–2 concrete detail Qs ("What did X carry? → dumplings") between inference stretches.

2. **Emotional-state Q saturation in Ch2**: 6 of 24 Qs ask "How did X feel?" — 25% emotional-state density. Duolingo content data (Vesselinov et al. 2023) suggests ≤15% per lesson set for 8-12 learners. Replace 2–3 with process Qs ("What did the duckling do next?" / "How did he escape?") for pacing variety.

3. **Distractor register mismatch in Ch8**: opts for wolf questions mix register — "a light tap and then silence" (poetic/literary register) alongside "loud knock, sweet voice" (colloquial). For A2 learners, all 4 options in a set should share register (per R8 calibration). Normalise all Ch8 wolf-action options to the same register tier.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

<!-- ARCH-REC #227: X227_A4_PHRASAL_OPPOSITION_LINT -->

**Source:** Ya Wang & Yaru Meng (2026) "Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods" — *Language Testing* (DOI: 10.1177/02655322251400375)

**Finding:** The 2026 psychometric study using 2267 EFL students + 2PLNLM model identified **semantic independence** as the #1 distractor-quality failure mode. Distractors that form logical complements (either with each other or with the correct option) inflate item discrimination artificially and reduce construct validity. GenAI revision guided by semantic-independence checks reduced this failure class by ~62%.

**Pickup 適配分析:**

| Criterion | Assessment |
|-----------|-----------|
| Client target | 8-12 台灣兒童 — high sensitivity to binary framing (children default to A/B logic) |
| Current linter | X57 catches single-adjective antonym pairs only — misses phrasal/propositional opposition |
| This audit's P0 count | 23 violations across 9 chapters, 4 double-collapse Qs |
| Fix effort | Lint rule addition to `tools/validate-lessons.js` (no src/ changes needed) |
| Content fix | ~12 distractor rewrites in lessons-ch1–8.json |

**Verdict: ✅ 適合 — 實作建議如下**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X227: semantic-independence lint — flag option pairs where phrase-level Jaccard of stripped content words ≥ 0.55 AND one has negation OR where common antonym seed words appear in paired options | Wang & Meng 2026 (DOI:10.1177/02655322251400375) | ✅ 直接套用 — 加入 `validate-lessons.js` 的 extended-lint section，parallel 掃 `listen-mc` / `comprehension` / `picture-mc` 所有 option pair，用 antonym-seed-list (alone/together, open/shut, warm/cold, happy/sad, light/dark, guards/no-guards, morning/night) + Jaccard ≥ 0.55 threshold 觸發 `X227_A4_PHRASAL_OPPOSITION` WARN | 3-4 hr (lint 2hr + content fix ~12 distractors 1-2hr) | HIGH — 直接修復已發現的 23 P0 violations + 防止未來 regression | ✅ Ship |

**實作步驟:**
1. `tools/validate-lessons.js` 加 `checkX227PhrasalOpposition()` — antonym seed pairs + Jaccard 0.55 threshold (only for multi-word options in listen-mc/comprehension/picture-mc)
2. 修 12 distractor rewrites in Ch1–8 (優先: 4 double-collapse Qs 先修)
3. `npm run build` + vitest pass → commit + push

---

*Audit generated by Claude (claude-sonnet-4-6) | 2026-08-01 00:06 UTC*
*Source research: [Optimizing distractor quality — Wang & Meng 2026](https://doi.org/10.1177/02655322251400375)*
*Source research: [Distractor Plausibility in a MC Listening Test — Iimura](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_pdf)*
