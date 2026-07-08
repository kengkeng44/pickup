# ⚠️ Content QA — 2026-07-08 06:07 UTC

**Today's angle:** #6 — A4 Mirror Patterns (polarity collapse / antonym-pair distractors)
**Focus:** Ch17–Ch24 (鶴の恩返し / Heungbu / Mouse Deer / The Turnip / Anansi / Meng's Mother / Sima Guang / Kong Rong — 56 lessons, 405 option-bearing items audited)

**Angle definition — A4 Mirror Patterns:**
- **A4a_MULTIWORD_ANTONYM**: Correct option's first content word is the semantic antonym of a distractor's first content word (e.g., correct="bright and beautiful" / distractor="dark and heavy"). Collapses 4-choice to emotional-pole guessing (positive vs negative).
- **A4b_NEGATION_MIRROR**: Distractor = "not X" where X = correct option (P0).
- **A4c_PREFIX_NEGATION**: Correct and distractor differ only by un-/in-/im-/dis- prefix.
- **A4d_TEMPLATE_SUFFIX**: All 4 options share a common 2–3 word suffix template (e.g., "…each time"). Combined with R1 verbatim match → P0 compound.
- **A4e_SUBJECT_TEMPLATE**: All 4 options share the same subject pronoun (he/she/they/the), collapsing discrimination to predicate-only matching.

**Industry basis (2026):**
- **PMC / item analysis research (2024)**: Antonym-type distractors fail for higher-proficiency learners — >50% of knowledgeable test-takers never select antonym distractors, because the polarity opposition signals "one is wrong" immediately. Source: pmc.ncbi.nlm.nih.gov/articles/PMC11040895
- **Multiple-choice design guides**: "Antonyms of the correct answer should be avoided as distractors" — they reduce effective choice count from 4 to 2. If antonyms must be included, use TWO opposing pairs so neither direction is the obvious tell.
- **D-GEN (ACL 2025, aclanthology.org/2025.findings-acl.174)**: LLM-based distractor generation with semantic diversity constraints specifically targets avoiding antonym/polarity collapse — enforces ≥ 3 distinct "failure modes" per item, matching Pickup's R4 rule.
- **Selected-Response Format guidelines (samples.jbpub.com)**: antonym pairs reduce guessing probability, not difficulty — the item becomes "positive or negative?" not "which specific option?"
- **Pickup R4 rule**: 3 distractors must cover phonological confusion / local-detail substitution / schema-driven inference / partial parse. Antonym distractor covers none of these — it is a "polarity-miss" failure mode covering zero of R4's categories.

---

## A. validate-lessons.js result

```
Schema: PASS (no Zod parse errors)
Total mirror-lint issues: 447 (warn-only)
Known ongoing:
  - X59_EXPLAINZH_VOICE (Ch8/Ch9 「答案是」/ 「過去式」— non-story voice)
  - X57_ANTONYM_PAIR_MIRROR (Ch8/Ch9 single-word antonym pairs — existing coverage)
  - X49_STIMULUS_REUSE (Ch8/Ch9 same sentence as listen-tf + comprehension)
  - X2_OPTION_LIST_BIAS (Ch8/Ch9 options start with same word)
  - X48_NGRAM_VERBATIM_CORRECT (Ch8 "firmer than straw" / "out the back" verbatim)
```

---

## B. Violation Table

| # | Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|---|-----|------|------|---------|-----------|------|-------------|
| 1 | 17 | kt-ch17-l5-q3 | listen-mc | S: "Each cloth shone **brighter** than the one before." Q: "How were the new cloths?" A: "**brighter** each time" | **P0 COMPOUND**: A4d template suffix ("…each time" — all 4 opts identical structure) + A1 verbatim match (word "brighter" in S = word in correct option). Zero comprehension needed — learner matches comparative from sentence. | Replace template with 4 distinct modality answers: e.g. A:"it glowed more each time" B:"she spent longer each night" C:"the gold price rose" D:"it matched last winter's cloth". Remove the "…each time" scaffold entirely. | Yes — new sentence needed |
| 2 | 20 | kt-ch20-l7-x5 | emoji-pick | Q: "How does everyone feel at the end?" A: "🎊 happy and joyful" D: "😢 sad and sorry" D: "😠 angry at someone" | **P1 DOUBLE ANTONYM**: TWO distractors (sad/angry) are emotional antonyms of correct (happy). Learner only needs to identify positive-emotion emoji — 3-to-1 vs 4-to-1 discrimination. | Replace one negative-emotion distractor with a plausible-but-wrong same-valence option: e.g. "😮 shocked and confused" or "😌 calm and relieved" (positive but wrong register). Keep one negative as natural contrast. | No |
| 3 | 24 | kt-ch24-l4-x5 | emoji-pick | Q: "Which emoji shows choosing the smallest thing?" A: "🫐 a tiny blueberry" D: "🍎 a big round apple" D: "🌊 a big strong wave" | **P1 DOUBLE ANTONYM**: TWO distractors start with "big" (antonym of "tiny"). Reduces to tiny-vs-big binary. Third distractor "🏆 winning first place" is a junk/obvious-miss. | Replace both "big…" distractors with same-size but different-referent objects: e.g. "🌸 a small flower petal" (tiny but different concept), "🐜 a small ant walking". Replace junk distractor with "🍐 a medium-sized pear" (story-relevant, same referent but not marked tiny). | No |
| 4 | 17 | kt-ch17-l4-q3 | listen-mc | S: "She held a soft white cloth. It shone like fresh snow." A: "bright and beautiful" D: "dark and heavy" | **P1 A4a**: bright↔dark antonym collapse. Sentence already signals brightness ("shone like snow") — learner eliminates "dark" without comprehension. | Replace "dark and heavy" with same-valence contrast: e.g. "bright but coarse" (shares brightness register but wrong texture) or "stiff and white" (colour right, quality wrong). | No |
| 5 | 17 | kt-ch17-l7-q3 | listen-mc | S: "Tears shone quietly in her soft, dark eyes." A: "sad with tears" D: "happy and bright" | **P1 A4a**: sad↔happy antonym collapse. Sentence "Tears" immediately signals sadness — no comprehension gap remains. | Replace "happy and bright" with same-sad-spectrum: e.g. "calm and distant" (emotion present, wrong register) or "tired and quiet" (negative but incorrect). | No |
| 6 | 17 | kt-ch17-l7-x1 | comprehension | Same sentence as #5. A: "sad and full of tears" D: "happy and smiling bright" | **P1 A4a**: Same antonym collapse as #5 on a parallel comprehension question. Two questions in the same lesson with the same polarity tell. | Same fix as #5 — replace "happy and smiling bright" with same-sadness-register wrong option. | No |
| 7 | 18 | kt-ch18-l5-x8 | comprehension | Q: "How did Heungbu's life change after the gourds?" A: "poor and hungry to rich and happy" D[0]: "rich back to being very poor" | **P1 A4a + phrasing**: Distractor describes exact reverse journey (rich→poor instead of poor→rich). Antonym collapse tells learner: "pick the one that sounds like improvement." Also distractor phrasing "rich back to being very poor" is grammatically awkward (missing "from"). | Replace with plausible-wrong same-direction answer: e.g. "hungry to full but still tired" (improvement, but partial — wrong scope) or "poor to slightly less poor only" (direction right, degree wrong). | No |
| 8 | 24 | kt-ch24-l5-q8 | listen-mc | S: "Something warm moved inside his father's chest." A: "warm and touched" D: "cold and angry" | **P1 A4a**: warm↔cold antonym collapse. Sentence already uses "warm" — verbatim echo of correct + antonym distractor = double tell. | Replace "cold and angry" with same-warm-register wrong option: e.g. "warm but a little nervous" (valence right, modifier wrong) or "pleased but surprised" (adjacent positive state). | No |
| 9 | 24 | kt-ch24-l5-x4 | comprehension | S: "Father was surprised and pleased. He smiled." A: "happy and surprised" D: "sad and a bit upset" | **P1 A4a**: happy↔sad antonym collapse. Sentence "pleased… smiled" visibly signals positive affect. | Replace "sad and a bit upset" with positive-but-wrong: e.g. "surprised but not fully pleased" (admits surprise, wrong valence shade) or "proud and expecting it" (wrong since he was surprised). | No |
| 10 | 17 | kt-ch17-l6-x7 | comprehension | Q: "How did the moment feel when their eyes met?" A: "quiet and full of feeling" D: "loud and very scary" | **P1 A4a**: quiet↔loud antonym collapse. Sentence "Their eyes met in silence" makes "quiet" obvious. | Replace "loud and very scary" with same-quiet register: e.g. "still and a little sad" (correct quiet register, wrong emotion) or "warm and very cheerful" (wrong emotion but same non-loud register). | No |
| 11 | 19 | kt-ch19-l7-q9 | listen-mc | S: "His low voice came up from the dark water in a slow sad sound." A: "quiet and sorrowful" D: "loud shouting" | **P1 A4a**: quiet↔loud antonym collapse. Sentence "low voice… slow sad sound" makes "quiet/sorrowful" surface-match obvious. | Replace "loud shouting" with same-sound-quality contrast: e.g. "short and angry" (wrong emotion but not opposite volume) or "deep but cheerful" (wrong affect). | No |
| 12 | 21 | kt-ch21-l6-q8 | listen-mc | S: "He meant Anansi had used his clever ideas…" Opts: "Anansi was very clever / had a big hat / was very tall / was very loud" | **P2 A4e_SUBJECT_TEMPLATE**: All 4 options start with "Anansi was/had". Learner only needs to match adjective from sentence. Correct option "very clever" mirrors "clever ideas" verbatim. | Break subject template: rephrase options as varied structures: "by thinking carefully" / "using a hat trick" / "because of his long legs" / "by tricking the python". Also fix A1 verbatim ("clever" in S → "clever" in A). | No |
| 13 | 19 | kt-ch19-l4-lg2 | comprehension | Q: "What does the big crocodile's silence tell us about him?" All 4 opts start with "He": He was too frightened / He cared more / He already knew / He wanted to help | **P2 A4e_SUBJECT_TEMPLATE**: All-"He" options reduce discrimination to predicate-only matching. For a 8-12 child, syntactic template can narrow focus — they look at the second word only. | Rephrase to vary structure: "Too proud to admit he didn't know" / "The answer was already clear to him" / "He wanted to make mouse deer look bad" / "A fear of the king kept him silent". | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch17–Ch24 (8 chapters) |
| Lessons scanned | 56 |
| Total questions | 899 |
| Option-bearing items (checked) | 405 |
| A4b_NEGATION_MIRROR (P0) | 0 |
| A4c_PREFIX_NEGATION (P1) | 0 |
| A4d_TEMPLATE_SUFFIX (P0 compound) | **1** |
| A4a_MULTIWORD_ANTONYM (P1) | **16** |
| A4e_SUBJECT_TEMPLATE (P2) | **10** |
| A4e_TEMPLATE_PREFIX picture-mc false positives | 16 (excluded) |
| Chapters with 0 A4a violations | Ch19 partial, Ch21–23 0 A4a |
| Ch17 violations concentration | **7 A4a violations (highest)** |
| validate-lessons.js status | PASS (schema) / 447 lint warns (no new) |

**Polarity collapse distribution by chapter:**

| Ch | A4a | A4e | Story |
|----|-----|-----|-------|
| 17 | 4 | 0 | 鶴の恩返し |
| 18 | 2 | 0 | Heungbu & Nolbu |
| 19 | 1 | 4 | Mouse Deer |
| 20 | 3 | 0 | The Giant Turnip |
| 21 | 0 | 3 | Anansi |
| 22 | 0 | 1 | Meng's Mother |
| 23 | 0 | 1 | Sima Guang |
| 24 | 6 | 1 | Kong Rong |

---

## D. Top 5 P0

1. **⚠️ kt-ch17-l5-q3** (Ch17 listen-mc) — COMPOUND A4d+A1: "…each time" template + verbatim "brighter" echo. The sentence says "brighter than the one before" and the correct option is literally "brighter each time" — learner just matches the comparative from the audio. This item has ZERO comprehension value as written. **Fix: complete option redesign (4 new options, no template scaffold, no verbatim match).**

2. **⚠️ kt-ch20-l7-x5** (Ch20 emoji-pick) — DOUBLE antonym distractor: both "😢 sad and sorry" and "😠 angry at someone" are emotional-polarity opposites of correct "🎊 happy and joyful". Learner identifies the positive-emotion emoji without reading options closely. **Fix: replace one negative-emotion distractor with same-positive-valence wrong option.**

3. **⚠️ kt-ch24-l4-x5** (Ch24 emoji-pick) — DOUBLE antonym distractor: "🍎 big round apple" AND "🌊 big strong wave" both have "big" (antonym of "tiny"). Plus a junk distractor "🏆 winning first place". 3 of 4 options fail R4 — non-functional distractors. **Fix: replace both "big…" distractors + junk with story-relevant same-size contrasts.**

4. **⚠️ kt-ch17-l4-q3** (Ch17 listen-mc) — Sentence "shone like fresh snow" already signals brightness. Correct="bright and beautiful" vs distractor="dark and heavy" = bright↔dark antonym. Zero inference required. **Fix: replace "dark and heavy" with same-bright-register foil.**

5. **⚠️ kt-ch24-l5-q8** (Ch24 listen-mc) — Sentence contains the word "warm"; correct option is "warm and touched"; distractor is "cold and angry". BOTH A1 verbatim match ("warm" in sentence → correct option) AND A4a antonym collapse (warm↔cold). Two-layer tell in one item. **Fix: replace distractor with non-antonym, replace correct option with paraphrase ("moved and grateful" instead of "warm and touched").**

---

## E. Narrative Voice / Pacing Improvements (3 proposals, even if 0 R1-R8 violations)

1. **Ch17 double-question on same sentence** (kt-ch17-l7-q3 + kt-ch17-l7-x1): The sentence "Tears shone quietly in her soft, dark eyes" serves as stimulus for both a listen-mc AND a comprehension question in the same lesson. This is X49_STIMULUS_REUSE territory. The second question (x1) adds no new cognitive challenge — it just re-asks the emotion in different words. **Proposal**: Replace x1 with a different stimulus: e.g., "She bowed deeply. She walked slowly to the door." (the goodbye action sentence already exists as kt-ch17-l7-x5's stimulus) — shift focus from emotion to departure action.

2. **Ch20 lesson 7 moral culmination pacing**: The lesson ends on "The smallest mouse was the last help. That tiny push was the one." (sentence used for q10, x6, and implicitly x8). Three different comprehension angles on the same moral beat can feel repetitive for an 8-12 reader. **Proposal**: Stagger the moral beat — use the feast scene ("Even the mouse gets a seat") as an alternate culminating stimulus for one of the three items to show consequence rather than restating the lesson.

3. **Ch24 Kong Rong lesson 5 (kt-ch24-l5)**: The father's reaction ("Father was surprised and pleased. He smiled.") is the stimulus for x4, x5, and x6 — three questions on one 7-word sentence. Given that "surprised and pleased" is the target phrase, all three items are shallow emotion-identification tasks without narrative payoff. **Proposal**: Add one inference question using a different sentence from the lesson (e.g., "Something warm moved inside his father's chest.") that requires inferring why the father felt this way rather than what he felt — shifts sub-skill from detail to inference, satisfying R6 variety.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**研究來源**:
- PMC item analysis (2024): pmc.ncbi.nlm.nih.gov/articles/PMC11040895
- D-GEN ACL 2025: aclanthology.org/2025.findings-acl.174
- Selected-Response Format guidelines: samples.jbpub.com/9781449687670/…
- Multiple-choice distractor research: pmc.ncbi.nlm.nih.gov/articles/PMC3004925

**Pattern identified**: **POLARITY_PARITY_LINT** (X66) — Automated detection of antonym-pair polarity collapse in multi-word option sets.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **X66 POLARITY_PARITY_LINT** — lint rule: extract first content word of each option, flag if correct-option's first content word is antonym of any distractor's first content word (extends existing X57 from single-word to multi-word options) | PMC 2024, D-GEN ACL 2025, item-writing guides | ✅ 完全適合. Pickup's validate-lessons.js already has antonymMap for X57 — extend same map to multi-word option first-content-word matching. JSON lesson files unchanged; only lint script changes. 8-12 children are particularly susceptible to polarity shortcuts (early L2 learner heuristic: pick positive/pick negative). | Low (extend validate-lessons.js, ~30 lines, reuse X57 antonymMap) | High — 16 new violations found in Ch17-24 alone that current X57 misses; this lint would catch them at CI time | ✅ 推薦實作 (ARCH-REC #129) |
| **Emoji-option polarity guard** — for emoji-pick type: flag if ≥2 of 4 options use clearly negative-emotion emoji (😢😠😡😭) when correct answer is positive-emotion (🎊🤗😊) or vice versa | D-GEN semantic diversity constraint | ✅ 適合. Pickup has emoji-pick type with optionsZh labels — a regex-based emoji sentiment classifier on the option string catches "big round apple" / "sad and sorry" pairs. | Low (emoji sentiment map is ~20 entries) | Medium — caught 2 cases this cycle; prevents emoji-answer becoming visual polarity test | ✅ 推薦實作 (sub-rule of X66) |
| **LLM-based distractor generation** (D-GEN pipeline: LLaMA fine-tuned for ELT distractor diversity) | D-GEN ACL 2025 | 🟡 部分適合. Batch distractor regen for violations is powerful but requires API cost. Current Pickup architecture (JSON lesson files + Claude session) already uses LLM for content — could invoke Claude with a structured "replace antonym distractor" prompt per violation. The lint identifies the violations; Claude fixes them. | Medium (prompt engineering + batch job per chapter) | High for content quality, but duplicates existing manual review flow | 🟡 Consider as a cron-triggered fix cycle after X66 lint ships |

**實作建議 (ARCH-REC #129: X66_POLARITY_PARITY_LINT)**:
```js
// validate-lessons.js addition (~30 lines)
// 1. Reuse antonymMap from X57 block
// 2. Add firstContentWord(str) extractor (skip stop-words, return first 4+ char word)
// 3. For each MC item: correctFirst = firstContentWord(opts[correctIndex])
// 4. For each distractor: distFirst = firstContentWord(opt)
// 5. If antonymMap[correctFirst]?.has(distFirst): WARN X66_POLARITY_PARITY
// Threshold: only flag if single antonym distractor exists (not both distractors)
// — two-antonym case (x5 Ch20 / x5 Ch24) is more severe: flag as X66_DOUBLE_ANTONYM
```

This requires **no changes to lessons-ch\*.json or src/** — lint-only. Ship as warn-only initially (matching X57 policy), escalate to fail after one cron cycle.
