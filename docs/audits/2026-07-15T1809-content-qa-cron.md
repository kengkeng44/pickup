# Content QA — 2026-07-15 18:09 UTC

**Today's angle:** #10 — Audio Sync (listen-mc R1 verbatim, listen-tf concept-load, duplicate stimuli, TF-Q stem length)
**Focus:** Ch25-32 (Yu Gong Moves Mountains / Archimedes / Journey to the West / Yi the Archer / Odyssey / Heracles / Robin Hood / Merlin)

**Why this angle now:** Last #10 Audio Sync run was 2026-07-11T1207 on Ch17-24. Ch25-32 had not yet been scanned under this lens.

---

## A. validate-lessons.js result

```
WARN lessons-ch25.json: 16 lint issue(s)
  kt-ch25-l2-pm1: X2_OPTION_LIST_BIAS (all start with "a")
  kt-ch25-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch25-l3/4/5/6/7: X49_STIMULUS_REUSE / X49B (12 instances — sentence reused across listen-mc + listen-tf in same lesson)
  kt-ch25-l4-q3: X57_ANTONYM_PAIR_MIRROR (正解 vs 干擾「fast」)
  kt-ch25-l7-q8: X57_ANTONYM_PAIR_MIRROR (正解 vs 干擾「gave」)
  kt-ch25-l7-x9: X57_ANTONYM_PAIR_MIRROR (正解 vs 干擾「always」)

WARN lessons-ch26.json: 17 lint issue(s)
  kt-ch26-l3/4/5/6/7: X49B_STIMULUS_REUSE_COMP (9 instances)
  + X2_OPTION_LIST_BIAS × 2, X57 × 0 (clean on antonym)

WARN lessons-ch27.json: 17 lint issue(s)
  kt-ch27-l6-q3: R1_SUBSTRING (correct option ⊆ sentence: "only his head and one arm") ← THIS CYCLE P1
  kt-ch27-l5-q3: X3_R1_VERBATIM_WORDS ("a giant hand of stone" all words in sentence) ← THIS CYCLE P1
  kt-ch27-l6-q3: X48_NGRAM_VERBATIM_CORRECT (3-gram「only his head」)
  + X2_OPTION_LIST_BIAS × 5, X49 / X49B × 5

WARN lessons-ch28.json: 22 lint issue(s)
  kt-ch28-l5-q6: X48_NGRAM_VERBATIM_CORRECT (3-gram「was not worth」) ← THIS CYCLE P1
  + X2_OPTION_LIST_BIAS × 7, X49B × 8, X49 × 1, X57 × 3
  [NEW] DUPLICATE ITEM: kt-ch28-l3-x2 = kt-ch28-l3-q6 (same sentence + questionEn + correctIndex)

WARN lessons-ch29.json: 14 lint issue(s)
  kt-ch29-l5-q8: R1_SUBSTRING + X3_R1_VERBATIM_WORDS + X48 ("easy and good") ← THIS CYCLE P1
  + X2 × 1, X49B × 3, X49 × 4, X57 × 2

WARN lessons-ch30.json: 14 lint issue(s)
  kt-ch30-l4-q6: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("right in the chest") ← THIS CYCLE P1
  kt-ch30-l7-q3: X3_R1_VERBATIM_WORDS ("around the neck") ← THIS CYCLE P1
  + X2 × 1, X49 / X49B × 6, X57 × 2

WARN lessons-ch31.json: 16 lint issue(s)
  kt-ch31-l4-q3: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("on Robin's front door") ← THIS CYCLE P1
  kt-ch31-l5-q3: X48_NGRAM_VERBATIM_CORRECT (3-gram「taller than any」) ← THIS CYCLE P1
  kt-ch31-l5-x5: X48_NGRAM_VERBATIM_CORRECT (3-gram「for the first」) — common phrase, borderline
  + X2 × 2, X49 / X49B × 5, X57 × 2

WARN lessons-ch32.json: 8 lint issue(s)
  + X2 × 2, X49 × 3, X57 × 1 (all carry-forward)

Total mirror-lint issues: 440 (warn-only)
```

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 27 | kt-ch27-l6-q3 | listen-mc | sent: "Only his head and one arm could move from the heavy stone." → correct: "only his head and one arm" | **P1 R1_VERBATIM** — correct phrase lifted verbatim from sentence; player needs only recall, not comprehension | Replace correct with "just part of his body" or "his head and one limb" + update optionsZh | No |
| 27 | kt-ch27-l5-q3 | listen-mc | sent: "A giant hand of stone held him." → correct: "a giant hand of stone" | **P1 X3_R1_VERBATIM_WORDS** — all words of correct option in sentence | Replace with "an enormous stone grip" or "stone crushing him from above" | No |
| 29 | kt-ch29-l5-q8 | listen-mc | sent: "Day after day the trip felt easy and good." → correct: "easy and good" | **P1 R1_VERBATIM + X48** — exact phrase in sentence; X48 3-gram also fires | Replace with "smooth and pleasant" or "calm and fine"; update optionsZh | No |
| 30 | kt-ch30-l4-q6 | listen-mc | sent: "It hit the lion right in the chest." → correct: "right in the chest" | **P1 R1_VERBATIM** — 4-word phrase verbatim | Replace with "at the heart" or "in its center"; update optionsZh | No |
| 30 | kt-ch30-l7-q3 | listen-mc | correct: "around the neck" (all words in sentence) | **P1 X3_R1_VERBATIM_WORDS** | Replace with "on the lion's throat" or "across its neck" | No |
| 31 | kt-ch31-l4-q3 | listen-mc | sent: "nailed a yellow paper on Robin's front door" → correct: "on Robin's front door" | **P1 R1_VERBATIM** — exact phrase | Replace with "at his home entrance" or "where Robin would see it first"; update optionsZh | No |
| 31 | kt-ch31-l5-q3 | listen-mc | correct: "taller than any" (X48 3-gram verbatim) | **P1 X48** — 3-gram overlap | Replace with "the tallest among them" or "higher than all the rest" | No |
| 28 | kt-ch28-l5-q6 | listen-mc | correct phrase "was not worth" (X48 3-gram in sentence) | **P1 X48** | Replace with "had little value" or "wasn't good enough"; update optionsZh | No |
| 28 | kt-ch28-l3-x2 | listen-tf | sent: "A young boy opened the door…" questionEn: "Was Zhuge Liang the one who opened the door?" — identical to kt-ch28-l3-q6 | **P1 DUPLICATE_ITEM** — same stimulus + question at two different IDs in same lesson; player hears identical audio twice | Replace x2 with a different story beat from the same scene (e.g. "Was Liu Bei's heart light when the boy appeared?") | No |
| 26 | kt-ch26-l4-x2 | listen-tf | questionEn: "Was there room for more water in the tub before Archimedes got in?" (13 words) | **P1 TF_Q_TOO_LONG** — R7 cap ≤8 words; 13-word stem creates reading load before audio completes | Shorten to "Was the tub full before Archimedes got in?" (8 words) | No — question text only |

### Systemic P2 Pattern: listen-tf "No" concept-load

55 listen-tf questions in Ch25-32 have correctIndex=1 ("No") where questionEn introduces key content words not present in the stimulus sentence, requiring schema inference rather than sentence-level implication. Examples:

| Ch | qid | Sentence (truncated) | Question | Pattern |
|----|-----|---------------------|----------|---------|
| 25 | kt-ch25-l3-x9 | "They carried stones down to the sea." | "Was this work something that could be finished in one hour?" | No time info in sentence — pure world-knowledge |
| 26 | kt-ch26-l3-x2 | "He did not eat much. He slept very little." | "Did Archimedes take good care of himself?" | Requires re-interpretation of physical neglect = poor self-care |
| 27 | kt-ch27-l4-q4 | "He drank from his bottle in small careful sips." | "Did Sanzang have a lot of water to spare?" | Inference: careful sips → scarcity (borderline A2) |
| 29 | kt-ch29-l6-q4 | "Cold rain hit their faces and the wood under their feet shook." | "Was the storm a small one?" | Inference: rain + shaking deck → big storm (valid but schema-driven) |

Most are valid B1-level inference questions. Acquiescence-bias risk: children prefer "Yes" → inference-"No" questions systematically harder than recall-"Yes". Not individually wrong, but the 55-out-of-75 TF ratio with "No"-inference (73%) warrants lint gate tracking. (See ARCH-REC #161.)

---

## C. Stats

| Chapter | Total Qs | listen-mc | listen-tf | R1/X48 violations | TF_NO_inference | Duplicate |
|---------|----------|-----------|-----------|-------------------|-----------------|-----------|
| Ch25 (Yu Gong) | 116 | 15 | 20 | 0 | 8 | 0 |
| Ch26 (Archimedes) | 111 | 15 | 15 | 0 | 7 | 0 |
| Ch27 (Sanzang) | 111 | 15 | 15 | 2 | 7 | 0 |
| Ch28 (Zhuge Liang) | 116 | 15 | 15 | 1 | 8 | 1 |
| Ch29 (Odyssey) | 116 | 15 | 20 | 1 | 9 | 0 |
| Ch30 (Heracles) | 116 | 15 | 20 | 2 | 9 | 0 |
| Ch31 (Robin Hood) | 116 | 14 | 20 | 3 | 8 | 0 |
| Ch32 (Merlin) | 62 | 9 | 10 | 0 | 4 | 0 |
| **Total** | **864** | **113** | **135** | **9** | **55** | **1** |

- R1/X48 violations are all warn-only in linter; none are build-blockers
- 9 R1/X48 violations span Ch27-31 (Ch25-26 and Ch32 clean on this dimension)
- 55 TF_NO_inference P2s are systemic, not isolated — see ARCH-REC
- Ch28 duplicate item: kt-ch28-l3-x2 = kt-ch28-l3-q6 (first duplicate found in any chapter of this angle)

---

## D. Top 5 P0 / P1

1. **⚠️ P1 Ch28 DUPLICATE AUDIO ITEM** — `kt-ch28-l3-x2` is an exact duplicate of `kt-ch28-l3-q6` (same sentence, same questionEn, same correctIndex=1, different only in id + tags + minor sentenceZh wording). Player hears the same question twice in a row. Fix: replace x2's sentence/questionEn with a different story beat from lesson l3 scene (Liu Bei's first visit — scene has ample alternate moments).

2. **⚠️ P1 Ch27 R1_VERBATIM** — `kt-ch27-l6-q3` correct "only his head and one arm" is a substring of the stimulus sentence — word-for-word memory task masquerading as listening comprehension. The explanationZh also says "「只有頭和一隻手」就是答案" (circular — restates the verbatim answer without explaining why). Double fix needed: paraphrase correct option + enrich explanationZh with WHY (stone was too heavy → crushed his body → only head and one arm free).

3. **⚠️ P1 Ch31 THREE R1/X48 violations in one chapter** — Ch31 (Robin Hood) accumulates `kt-ch31-l4-q3` (R1 verbatim), `kt-ch31-l5-q3` (X48 3-gram), `kt-ch31-l5-x5` (X48 borderline). Highest per-chapter R1 density in this range. Robin Hood lesson 4-5 needs a targeted rewrite pass.

4. **⚠️ P1 Ch26 TF stem too long** — `kt-ch26-l4-x2` questionEn is 13 words. At A2, children parse audio first, then read the question. A 13-word question creates cognitive overload before the child can tap Yes/No. R7 cap is 8 words; this item is 62% over cap.

5. **⚠️ P1 Ch29 + Ch30 R1 chained** — `kt-ch29-l5-q8` ("easy and good") and `kt-ch30-l4-q6` ("right in the chest") both have correct options that are exact substrings of their sentences. These are in the Odyssey and Heracles chapters — heroic action scenes where the narrative naturally repeats key phrases. Fix: introduce synonyms at the question layer even when narration is vivid and precise.

---

## E. Narrative Voice / Pacing Improvements (3)

1. **Ch27 kt-ch27-l6-q3 explanationZh circular** — current: `只有頭和一隻手能動——「只有頭和一隻手」就是答案。被大石頭壓著，動也動不了。` The highlighted answer echoes the verbatim option — this is the same problem as R1 but in the feedback layer. Proposed: `"大石頭壓住了他的整個身體，只剩頭和一隻手還能動彈——其他部分全被困住了。"` (Explains causation; no verbatim echo of correct option.)

2. **Ch25 systemic inference framing** — 8 of 20 TF questions in Ch25 ask "did the family do X?" where X is an implied negation (empty hands / one hour / give up). These are good inference tasks, but 40% inference-No in a single chapter creates a local acquiescence-bias gauntlet. Adding 2-3 "Yes" inference questions (e.g., "Did the family keep coming back day after day?" → Yes, from "day after day the family dug") would balance the chapter's Yes/No distribution and reduce pattern-guessing.

3. **Ch32 audio density lighter than other chapters** — 62 total Qs vs average 113 for Ch25-31. listen-mc count is 9 (vs ~15 per chapter elsewhere). If Ch32 is intentionally a conversational cool-down chapter (Merlin / dialogue-heavy), this is fine. If it's intended to be a full lesson chapter, consider adding 2-3 listen-mc items across the weaker lessons to maintain A2 practising exposure.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #161: X161_TF_INFERENCE_NO_CONCEPT_LOAD — listen-tf acquiescence-bias concept-load lint gate**

**Source research:** "Supporting comprehension: The advantages of multiple–choice over true—false practice tests" — Memory & Cognition, PMC 2025 (https://pmc.ncbi.nlm.nih.gov/articles/PMC12696125/); Acquiescence Bias in LLMs/children's assessment (https://arxiv.org/pdf/2509.08480)

**Finding:** Academic research confirms TF tests have acquiescence bias — children and models preferentially respond "Yes/True," meaning "No" answers carry disproportionate cognitive load. In Pickup Ch25-32 audit: 55 of 75 listen-tf questions with correctIndex=1 ("No") introduce ≥3 content words not present in the stimulus sentence — the child must infer "No" from schema/world-knowledge, not from sentence-level implication.

This is not individually wrong (inference questions are valid ELT design), but the density creates a **systemic difficulty spike**: 73% of all TF-No answers in Ch25-32 require concept-load inference. For A2 children, inference-No is the hardest TF variant. An unchecked systemic ratio amplifies the acquiescence-bias risk and may push observed accuracy below the A2 floor.

**Industry pattern (IELTS 2026):** IELTS confirmed new listening question types focused on inference for 2026 — but these are B2 level tasks (https://ielts9.io/blog/ielts-2026-changes-everything-you-need-to-know). At A2, the standard is recall + light inference (60-70% explicit per R8).

**Pickup fit:**
- ✅ Pure JSON analysis — no src/ changes required
- ✅ Adds to existing `lintListenTfPolarity()` (X46) in `tools/validate-lessons.js`
- ✅ WARN-only (preserve inference design; alert human reviewer)
- ✅ Aligns with R8 calibration already in pickup-q-design-standard-v1.md

**Implementation (~20 lines in validate-lessons.js):**
```js
// X161: listen-tf correct=No where questionEn introduces >2 content words not in sentence
// (pure schema inference — acquiescence-bias risk for A2)
const STOP_WORDS = new Set(['was','were','did','is','are','the','a','an','of','to','in',
  'on','at','by','he','she','it','they','his','her','their','this','that','there',
  'have','had','been','does','do','be','for','with','after','before','when','who',
  'what','where','how','why','which','and','or','but','one','any','more','very']);

function lintTfConceptLoad(data, file) {
  const issues = [];
  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (q.type !== 'listen-tf' || q.correctIndex !== 1) continue;
      const sent = (q.sentence || '').toLowerCase().split(/\W+/).filter(Boolean);
      const qWords = (q.questionEn || '').toLowerCase().replace(/\?/,'').split(/\W+/)
        .filter(w => w.length > 3 && !STOP_WORDS.has(w));
      const newConcepts = qWords.filter(w => !sent.includes(w));
      if (newConcepts.length > 2) {
        issues.push(`${file} ${q.id}: X161_TF_NO_CONCEPT_LOAD (TF correct=No introduces ${newConcepts.length} out-of-sentence concepts [${newConcepts.join(', ')}] — acquiescence-bias risk for A2)`);
      }
    }
  }
  return issues;
}
```

**Impact:** Would flag ~55 items in Ch25-32 as WARN. Not a build blocker. Gives content authors a "concept-load ledger" to balance inference-No with explicit-Yes TF items per chapter.

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| X161 TF concept-load gate | https://pmc.ncbi.nlm.nih.gov/articles/PMC12696125/ | ✅ lint-only, no src change | ~1hr (20 lines validate-lessons.js) | High — surfaces systemic acquiescence-bias risk in 55 items | ✅ Recommend |
| Reduce TF density (TF→MC conversion) | Memory & Cognition 2025 — MC superior for comprehension learning | 🟡 Partial — MC needs 4 distractors (content effort), not just schema flip | High content effort | Medium — MC is stronger pedagogically but requires distractor creation | 🟡 Phase 2 consideration only |
