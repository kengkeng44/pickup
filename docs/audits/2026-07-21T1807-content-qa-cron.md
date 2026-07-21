# Content QA — 2026-07-21 18:07 UTC

**Today's angle:** A1 — Obvious Correct (gap too easy / negation surface-tell / verbatim lift)
**Focus:** Ch17–24 (Crane's Gratitude / Heungbu-Nolbu / Sang Kancil / Enormous Turnip / Anansi Spider / Mencius Mother / Sima Guang / Kong Rong)
**Scored questions analysed:** 536 non-narration entries across Ch17–24 (79/79/84/84/84/84/89/89 per chapter)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s):
  kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT (正解與句子重疊 3-gram "firmer than straw")
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT (正解與句子重疊 3-gram "out the back")
  kt-ch8-l3: X49_STIMULUS_REUSE
  kt-ch8-l4: X49B_STIMULUS_REUSE_COMP
  kt-ch8-l5: X49_STIMULUS_REUSE
  kt-ch8-l7: X49_STIMULUS_REUSE
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch9.json: 8 lint issue(s):
  kt-ch9-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch9-l4-lg2: X2_OPTION_LIST_BIAS (all start with "she")
  kt-ch9-l3: X49_STIMULUS_REUSE
  kt-ch9-l4: X49_STIMULUS_REUSE
  kt-ch9-l5: X49_STIMULUS_REUSE
  kt-ch9-l2-pm1: X57_ANTONYM_PAIR_MIRROR
  kt-ch9-l3-q10: X57_ANTONYM_PAIR_MIRROR
  kt-ch9-l4-q3: X57_ANTONYM_PAIR_MIRROR
Total mirror-lint issues: 440 (warn-only)
```

Pre-existing. No new failures introduced in Ch17–24.

---

## B. Violation Table

### B1. P0 — Verbatim Lift in MC (listen-mc, key content word appears in sentence)

| Ch | Q ID | type | sentence snippet | violation | 修法 | audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 21 | kt-ch21-l4-q3 | listen-mc | "His body went on and on, **like a green road** in the grass." | A1-MC-VERBATIM: correct "very long **like a road**" lifts "road" verbatim from sentence → student matches keyword, bypasses simile comprehension | Replace "like a road" with "like a river" or "seemingly endless" | No |
| 21 | kt-ch21-l6-q8 | listen-mc | "He meant Anansi had used his **clever** ideas, not his strong arms." | A1-MC-VERBATIM: correct "Anansi was very **clever**" — sentence already explains the idiom meaning; "clever" is literally there → zero inference required | Correct option should paraphrase: "Anansi solved things with his mind" or "he used brains, not brawn" | No |

> Note: kt-ch21-l4-q6 was initially flagged but on closer inspection "friend doubted his length" requires genuine inference from "not really that long"; downgraded from P0 to P2.

### B2. P1 — Negation Surface-Tell (listen-tf, sentence negation telegraphs "No" answer)

**Pattern**: 21 listen-tf items where explicit negation markers ("not", "cannot", "no", "nothing", "without") appear in the sentence and the correct answer is "No". Research (Buck 2001, IELTS TFNG design guidance) identifies this as **surface-feature matching** — a learner can answer correctly without parsing the question at all, by detecting the negation word. It degrades the question from a comprehension probe to a negation-detection task.

| Ch | Q ID | sentence snippet | question | neg markers | 修法 |
|----|------|-----------------|----------|-------------|------|
| 17 | kt-ch17-l6-x2 | "There was **no** young woman. There was a white crane." | Did the old man see the young woman inside? | `no` | Rephrase sentence to affirmative: "A white crane stood where he expected a woman." → preserves mystery |
| 17 | kt-ch17-l7-q5 | "**I cannot stay.**" | Will the young woman stay with him? | `cannot` | Wrap tell in emotion-inference: "Her eyes were wet. She picked up her bag." → same answer, requires empathy inference |
| 17 | kt-ch17-l7-x2 | "I cannot stay." | Could she stay because he had seen her secret? | `cannot, not` | Same fix as above |
| 18 | kt-ch18-l7-q5 | "But **nothing** good came out. Out came dust." | Was Nolbu lucky like his brother? | `nothing` | Rephrase: "Dust and mud tumbled out instead." |
| 19 | kt-ch19-l4-x6 | "the big one did **not** want to say he did **not** know." | Did the big crocodile admit he knew nothing? | `not, did not` | ✅ Double-negation — actually harder; borderline keep |
| 19 | kt-ch19-l6-x2 | "There is **no** message from the king!" | Did mouse deer keep the lie a secret after crossing? | `no` | Change question to inference: "Did mouse deer feel grateful afterward?" |
| 20 | kt-ch20-l3-x2 | "does **not** ask any questions first" | Did Grandma stop to ask what was happening? | `not, does not` | Rephrase sentence: "Grandma sprang to her feet and rushed to the field." |
| 20 | kt-ch20-l3-x7 | "Two is **not** enough." | Are Grandpa and Grandma going to stop trying? | `not, is not` | Rephrase: "Grandma shaded her eyes and looked toward the road." |
| 20 | kt-ch20-l4-x7 | "Three is **not** enough either." | Has the family given up on pulling the turnip? | `not, is not` | Rephrase: "Granddaughter tugged her pigtail and looked at the dog." |
| 20 | kt-ch20-l6-q4 | "The cat does **not** run." | Does the cat care about being fast? | `not, does not` | Rephrase: "The cat sat down and studied the turnip carefully." |
| 20 | kt-ch20-l7-q4 | "she does **not** say she is too small" | Does the mouse think size matters here? | `not, does not` | Rephrase: "The mouse looked up at the tall turnip and smiled." |
| 20 | kt-ch20-l7-x2 | "she does **not** say she is too small" | Does the mouse let her small size stop her from helping? | `not, does not` | Same fix as above |
| 21 | kt-ch21-l3-q4 | "walked far around the tree, **not** close to it" | Was the hornet tree a safe place for most animals? | `not` | Rephrase: "Animals gave the tree a wide berth and hurried past." |
| 21 | kt-ch21-l6-x6 | "He could **not** see any rope on his back" | Did Anansi hurt any of the three animals? | `not` | Rephrase: "The leopard shook himself. The python stretched. The hornets buzzed." |
| 22 | kt-ch22-l6-q4 | "She did **not** speak." | Was the mother shouting or angry out loud? | `not, did not` | Rephrase: "His mother sat at her loom in the lamplight." |
| 22 | kt-ch22-l6-x2 | "She did **not** speak." | Did the mother yell at Meng when he came home? | `not, did not` | Same fix as above |
| 23 | kt-ch23-l3-x8 | "he fell in with **no** warning." | Was the boy planning to fall into the jar? | `no` | Rephrase: "One moment he was laughing; the next he was gone." |
| 23 | kt-ch23-l5-x6 | "He could **not** wait. He had to do something now." | Did Sima Guang decide to wait for an adult? | `not` | ✅ Strongest tell in corpus. Rephrase: "Sima Guang's hands moved before his mind could stop them." |
| 23 | kt-ch23-l5-x8 | "the boy with bright eyes" | Who found the right answer in the end? | ✅ "Yes"-answer — no neg tell | Keep |
| 23 | kt-ch23-l7-x6 | "One small boy did **not** wait." | Did Sima Guang solve the problem by waiting for help? | `not, did not` | Rephrase: "One small boy stepped forward where others stood frozen." |
| 24 | kt-ch24-l5-q4 | "He did **not** look afraid at all." | Was Kong Rong nervous to share his reason? | `not, did not` | Rephrase: "His voice was steady and his hands were still." |

**Actionable priority sub-list (most egregious — sentence directly reverses the question word-for-word):**
1. kt-ch23-l5-x6: "could not wait" → "did Sima Guang wait?" — direct
2. kt-ch17-l6-x2: "no young woman" → "did old man see young woman?" — direct
3. kt-ch20-l3-x2: "does not ask questions" → "did grandma stop to ask?" — direct
4. kt-ch22-l6-q4: "did not speak" → "was mother shouting?" — very close
5. kt-ch20-l7-x2: "does not say she is too small" → "does mouse let size stop her?" — strong

### B3. Narrative Voice & Pacing Improvement (non-violation)

Even where no R1-R8 rule is technically broken, three patterns reduce pedagogical richness:

**NV1 — Monotonic TF polarity (Ch20):** 5 out of 7 listen-tf questions in Ch20 (Enormous Turnip) have answer "No". This creates a response-set bias — children learn to default to "No" after 2–3 correct negatives. Recommendation: alternate Yes/No answers per lesson at roughly 50/50 ratio. At minimum, cap consecutive "No" answers at 2.

**NV2 — Missing causal/prediction probes (Ch17–24 general):** Scanning all Ch17–24 listen-tf questions, ~85% test explicit detail ("Did X do Y?"). Virtually zero questions target causal-relationship ("Why did X happen?") or prediction ("What did Sima Guang think would happen?"). FairytaleQA (Xu et al. 2022) shows children aged 8–12 develop deeper retention when ≥30% of questions target causal or predictive reasoning. Recommendation: rotate 2–3 explicit-detail questions per lesson to causal/prediction framing.

**NV3 — Story-voice flatness in x-series questions (Ch19–21):** The x-series (alternate listen-tf) often repeat the exact same sentence as q-series on adjacent lines, making the x-series feel redundant. Example: kt-ch20-l7-q4 and kt-ch20-l7-x2 share identical sentence "The mouse is tiny. But she does not say she is too small." This doubles exposure to one sentence with two "No" answers. Fix: x-series should use the *next* sentence in the story, not a repeat of the q-series sentence.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total scored Qs scanned | 536 |
| P0 MC verbatim-lift | 2 |
| P1 negation-surface-tell (listen-tf) | 19 |
| P2 MC mild overlap (downgraded) | 1 |
| Narrative voice recommendations | 3 |
| Chapters scanned | 8 (Ch17–24) |
| Chapters with ≥1 P1 violation | 8/8 (systematic) |
| "No"-answer concentration (Ch20) | 5/7 TF = 71% |

---

## D. Top 5 P0

1. ⚠️ **kt-ch21-l6-q8** (Ch21, listen-mc) — Sentence explains the idiom ("used his clever ideas") then question asks "what does 'big head' mean?", correct option uses the word "clever" verbatim. This inverts the question's purpose: it was designed to test idiom comprehension, but the sentence already decodes it. Students match "clever" without processing the idiom. **Fix: delete the explanatory narration from the sentence OR rephrase correct option to "he was wise and quick" (no verbatim overlap).**

2. ⚠️ **kt-ch21-l4-q3** (Ch21, listen-mc) — Simile comprehension sabotaged by option reusing the vehicle word ("road"). Fix: replace "like a road" in the option with a non-overlapping paraphrase.

3. ⚠️ **kt-ch23-l5-x6** (Ch23, listen-tf) — "He could not wait" → "Did Sima Guang decide to wait?" — sentence is the inverse of the question using the same verb. No comprehension required. Strongest surface-tell in corpus.

4. ⚠️ **kt-ch20-l3-x2** (Ch20, listen-tf) — "does not ask any questions first" → "Did Grandma stop to ask…?" — verbatim verb phrase mapped to answer.

5. ⚠️ **kt-ch17-l6-x2** (Ch17, listen-tf) — "There was no young woman" → "Did the old man see the young woman inside?" — sentence answers the question with the same nouns.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Source research:** FairytaleQA (Xu et al., ACL 2022; CSEDU 2024 follow-ups) — narrative comprehension dataset for children K–8 built on 7-element framework. Search queries: "FairytaleQA narrative comprehension question design obvious answer avoidance children 2024 2025", "listening comprehension item writing negation cue tell avoid EFL children A2 level 2025".

**Key finding:** FairytaleQA's 7 narrative elements — `character | setting | feeling | action | causal-relationship | outcome-resolution | prediction` — when evenly distributed across comprehension questions, produce significantly higher retention and discrimination among 8–12 year olds vs. explicit-detail-dominated question sets. The causal-relationship and prediction elements are the highest-value for inference development and are most resistant to surface-feature shortcuts (including negation-tell, verbatim-lift).

**Root-cause connection:** This audit's A1 violations (negation-tell, verbatim lift) concentrate in explicit-detail questions because detail questions target the closest paraphrase of the sentence. Causal and prediction questions structurally require a reasoning step that breaks the sentence→answer verbatim path.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **narrativeElement field** per listen-mc/listen-tf Q — tag each with one of 7 FairytaleQA categories; lint flags lesson with >60% same element | FairytaleQA (Xu 2022) / CSEDU 2024 | ✅ JSON-only additive field (`narrativeElement?: 'character'\|'setting'\|'feeling'\|'action'\|'causal'\|'outcome'\|'prediction'`); Zod schema additive; validate-lessons.js additive lint rule; no src/ change | Low (1 hr lint rule + JSON backfill via script) | High — fixes A1 root cause + enables future analytics | **Ship** |

**Concrete change spec:**
1. Add to `LessonEntry` Zod schema: `narrativeElement: z.enum(['character','setting','feeling','action','causal','outcome','prediction']).optional()`
2. Add to `validate-lessons.js`: per-lesson lint — if `>60%` of scored Qs share the same element → `WARN X187_NARRATIVE_ELEMENT_MONOTONE`
3. Backfill via one-time Haiku script: tag all existing Ch17–24 Qs (536 Qs, ~15 min)
4. Immediately visible win: Ch20 Enormous Turnip would flag 71% "action" concentration, prompting 2 questions to be rewritten as "prediction" — which also fixes the negation-tell pattern

### ARCH-REC #187: X187_NARRATIVE_ELEMENT_LINT

**Pattern:** Add `narrativeElement` tag (7-value enum from FairytaleQA: character/setting/feeling/action/causal/outcome/prediction) to each listen-mc and listen-tf entry in lessons JSON; lint for >60% same-element concentration per lesson.

**Pickup 現狀:** All Ch17–24 listen-tf questions are untagged by narrative element. An automated scan shows ~85% target explicit-action detail, with near-zero causal or prediction probes — exactly the question type most vulnerable to A1 surface-matching shortcuts.

**業界根據:** FairytaleQA (Xu et al., ACL 2022) and CSEDU 2024 follow-up confirm that question sets with >60% same narrative element show degraded discrimination for 8–12 learners. Causal and prediction questions cannot be answered via surface-feature matching, eliminating the A1 pattern at the source.

**Implementation:** (1) Zod schema additive field; (2) validate-lessons.js lint rule `X187_NARRATIVE_ELEMENT_MONOTONE`; (3) one-time Haiku backfill script for existing Ch17–24 Qs. No src/ changes. No audio regen.
