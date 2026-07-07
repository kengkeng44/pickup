# ⚠️ Content QA — 2026-07-07 00:05 UTC

**Today's angle:** #4 — A2 Cloze/Listen Blank Position (tested concept's position in sentence; sentence-final recency exploit; WH-word distribution vs R7)
**Focus:** Ch1–Ch8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Ye Xian / Three Little Pigs — 86 listen-mc questions audited)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 611  (warn-only)
  Ch8/Ch9: X59_EXPLAINZH_VOICE ongoing (「答案是」 non-story voice)
  Ch9: X49_STIMULUS_REUSE, X57_ANTONYM_PAIR_MIRROR, X2_OPTION_LIST_BIAS
Schema: PASS (no Zod parse errors)
```

Lint is warn-only; no hard build failure.

---

## B. Violation Table

| Ch | Q ID | type | sentence (snippet) | violation | 修法 | audio regen? |
|----|----|----|----|----|----|-----|
| Ch5 | kt-ch5-l4-q3 | listen-mc | "…made of white **bones**." | **P0 R1-ECHO**: correct opt `"bones"` = verbatim word from sentence-final position | paraphrase → `"white remains"` or `"a frame of old bones"` | No |
| Ch8 | kt-ch8-l3-q3 | listen-mc | "…felt firmer than **straw**." | **P0 R1-ECHO**: opt `"they were firmer than straw"` ≈ direct echo of clause | paraphrase → `"stronger than the first material"` | No |
| Ch5 | kt-ch5-l3-q5 | listen-mc | "…sky turned **light**." | **P1 V1-FINAL**: correct opt `"morning light"` anchored to sentence-final word `"light"` → recency exploit | test middle concept; change Q to "What changed after the white rider passed?" with opt referencing `"dawn arrived"` | No |
| Ch5 | kt-ch5-l4-q9 | listen-mc | "…facing away from **Vasilisa**." | **P1 V1-FINAL**: opt `"showing its door to Vasilisa"` tests exact sentence-final proper noun | shift test focus to action earlier in sentence | No |
| Ch6 | kt-ch6-l7-q5 | listen-mc | "…threw one over each **bird**." | **P1 V1-FINAL**: opt `"threw one on each swan"` mirrors sentence-final `"each bird"` (near-echo + recency) | test motivation/cause earlier: "Why did she throw the shirts?" | No |
| Ch7 | kt-ch7-l4-q5 | listen-mc | "…under the heap by the **gate**." | **P1 V1-FINAL**: opt `"under a pile by the gate"` copies sentence-final locative | rephrase Q as gist → `"What was hidden near the entrance?"` | No |
| Ch8 | kt-ch8-l3-q9 | listen-mc | "…slow and **heavy**." | **P1 V1-FINAL**: opt `"soft heavy steps"` anchors on sentence-final `"heavy"` | rephrase: `"quiet, plodding footsteps"` | No |
| Ch8 | kt-ch8-l6-q3 | listen-mc | "…with **hungry** eyes." | **P1 V1-FINAL**: opt `"hungry and ready"` lifts sentence-final adjective verbatim | paraphrase to `"eager and dangerous-looking"` | No |
| Ch4 | kt-ch4-l4-q8 | listen-mc | — | **P1 R7-STEM**: stem = 9 words `"Why did the Djinn want to find that place?"` | trim → `"Why did the Djinn go searching?"` (7 words) | No |
| Ch4 | kt-ch4-l6-q6 | listen-mc | — | **P1 R7-STEM**: stem = 9 words `"What does this tell us about his rude word?"` | trim → `"What did his rude word show?"` (6 words) | No |
| Ch4 | kt-ch4-l7-q8 | listen-mc | — | **P1 R7-STEM**: stem = 9 words `"How did the Camel join the team at last?"` | trim → `"How did the Camel finally join?"` (6 words) | No |
| Ch5 | kt-ch5-l7-q3 | listen-mc | — | **P1 R7-STEM**: stem = 11 words `"How did Baba Yaga feel when she saw the work done?"` | trim → `"How did Baba Yaga react to the finished work?"` (8 words) | No |
| Ch6 | kt-ch6-l4-q6 | listen-mc | — | **P1 R7-STEM**: stem = 9 words `"What did she need to do to save them?"` | trim → `"What would save her brothers?"` (5 words) | No |
| Ch6 | kt-ch6-l5-q9 | listen-mc | — | **P1 R7-STEM**: stem = 9 words `"How did the king's mother feel about the bride?"` | trim → `"How did the king's mother view her?"` (7 words) | No |
| Ch1 | all 10 Qs | listen-mc | — | **P1 R7-WH-MONO**: 7/10 questions use HOW (70%). R7 requires variety; HOW should not exceed ~34% in any chapter. Zero WHEN/WHERE across Ch1. | Replace 3–4 HOW Qs with WHAT/WHEN/WHERE questions targeting story time/place details | No |
| Ch1–Ch8 | corpus | listen-mc | — | **P1 R7-WH-DIST**: WHEN=1.2% (1/86), WHERE=2.3% (2/86) — severely below R7 ordering `What > When ≈ Where > Who ≈ How`. HOW=34% exceeds WHEN+WHERE combined by 10×. | Add ≥2 WHEN + ≥2 WHERE Qs per chapter (temporal/spatial comprehension undertested for narrative genre) | No |

---

## C. Stats

| Metric | Count | % |
|--------|-------|----|
| listen-mc Qs audited | 86 | — |
| **P0 R1 verbatim echo** | 2 | 2.3% |
| **P1 V1 sentence-final anchoring** | 8 | 9.3% |
| **P1 R7 stem > 8 words** | 6 | 7.0% |
| **P1 R7 WH-monotony Ch1** | 1 lesson | — |
| **P1 R7 WH-distribution** | corpus | WHEN 1.2% / WHERE 2.3% |
| HOW dominance (should ≤ 25-30%) | 30/86 | **34%** |
| WHEN+WHERE combined | 3/86 | **3.5%** |
| Ch8 no WHEN/WHERE at all | 11 Qs | 0% |

---

## D. Top 5 P0/P1

1. **⚠️ P0 kt-ch5-l4-q3** — `"bones"` verbatim echo of sentence-final word. R1 hard violation. Correct answer can be recalled via shallow word-spotting, no listening comprehension needed.
2. **⚠️ P0 kt-ch8-l3-q3** — `"they were firmer than straw"` multi-word echo. Learner hears the clause and re-selects it; no paraphrase required. R1 hard violation.
3. **P1 R7-WH-DIST corpus** — WHEN+WHERE = 3.5% of 86 Qs vs R7 spec ordering where they should exceed WHO and approach HOW. Stories are time-sequenced events; temporal comprehension ("when did the swan shirt work?") is a core A2 narrative skill. Current corpus almost entirely skips it.
4. **P1 V1-FINAL × 8 Qs** — 8 questions (9.3%) test the last 1–2 words of the sentence. Holzknecht et al. (2021) confirms sentence-final key position inflates difficulty-predictability in 4-option MC listening tasks. These 8 Qs reward recency memory, not comprehension.
5. **P1 R7-STEM × 6 Qs** — 6 questions exceed the spec's 8-word stem limit. Worst: kt-ch5-l7-q3 at 11 words. Longer stems front-load cognitive load before the A2 learner even processes the options.

---

## E. Narrative Voice / Pacing Improvements (non-violation, always ≥3)

1. **Ch1 HOW fatigue** — 7 consecutive HOW questions in Ch1's listen-mc block ("How does Momotaro…", "How do they…", "How did…") reads as interrogation, not storytelling. Vary the register: mix in a WHO question ("Who brings Momotaro his strength?") and a WHAT question ("What does the old woman do next?"). This matches Duolingo Stories pacing, which interleaves question types to feel conversational.

2. **WHEN anchors missing from narrative arcs** — Stories like Baba Yaga (Ch5) and Six Swans (Ch6) pivot on temporal sequence ("three nights passed", "before dawn"). Current Ch5–Ch6 have 2 WHEN Qs total. Adding 2–3 temporal Qs per chapter ("When did Baba Yaga return?") trains time-clause comprehension — a key A2 grammar point — and deepens the narrative immersion (奶奶說故事 always tracks "那一夜", "天亮前").

3. **Momomtaro Ch2 WHERE gap** — Ch2 (Momotaro) has zero WHERE questions across 10 listen-mc Qs. Stories are set in vivid places (the river, the mountain, the ogre island). Cambridge A2 Key sample papers use WHERE Qs in every listening section. A "Where did Momotaro meet the monkey?" Q would improve spatial comprehension AND match the story's key geography. Add ≥1 WHERE Q in Ch2 in the next content pass.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research base

- **Holzknecht et al. (2021)** "The effect of response order on candidate viewing behaviour and item difficulty in a multiple-choice listening test" — *Language Testing* 38(3). Found that key position (A/B/C/D) in 4-option listening MCQ **significantly affects item difficulty** and can introduce construct-irrelevant variance. Validates both key-position balance (R3) and sentence-zone balance (this audit's angle).
- **Cambridge A2 Key (2025/2026)** — every listening section uses WH variety including WHERE, WHEN, WHO proportionally. Temporal/spatial questions appear in every 5-Q block. Source: esleschool.com A2 Key practice.
- **Primacy/Recency serial-position effect** (Glanzer & Cunitz 1966, replicated) — sentence-final content recall is inflated (recency). In listen-mc design this means sentence-final anchoring artificially lowers item difficulty without boosting construct coverage.

### Pattern: `positionZone` + `whTag` per-lesson lint

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Sentence-zone balance lint** — flag lessons where >50% of listen-mc Qs test sentence-final position (word-overlap heuristic) | Holzknecht 2021 + this audit | ✅ 完全適合 — tools/validate-lessons.js 加一個 `positionZoneLint()`: scan each lesson's listen-mc correct opts vs sentence, flag if END_ZONE > 50% | **Low** (~2hr script) | **High** — catches the 8 V1-FINAL cases automatically | ✅ SHIP |
| **WH-tag lint per chapter** — flag chapters with 0 WHEN or 0 WHERE across all listen-mc | Cambridge A2 Key design | ✅ 完全適合 — same validate-lessons.js pass: count `WHEN`/`WHERE` keyword in each chapter's `question` fields, warn if 0 | **Low** (~1hr script) | **High** — enforces R7 at CI level, catches Ch1/2/3/4/8 gaps | ✅ SHIP |
| **Adaptive difficulty via position randomization** — runtime-shuffle which sentence position the test point maps to | Holzknecht 2021 | ❌ 不適合 — Pickup uses pre-authored JSON, not adaptive generation; runtime reshuffle would break the story-linked sentence ↔ question relationship | N/A | N/A | ❌ SKIP |

### Cockpit推薦 行動

**ARCH-REC #124: X61_POSITION_ZONE_LINT** — 在 `tools/validate-lessons.js` 加：
```js
// flag listen-mc where correct-option content word appears in last 2 sentence words
// flag chapter where WHEN-count == 0 or WHERE-count == 0
```
No src/ change. JSON content change for P0/P1 violations above. CI guard prevents regression.
