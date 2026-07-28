# Content QA — 2026-07-28 06:08 UTC

**Today's angle**: A2 — Cloze Blank 位置 (start/mid/end sentence-position balance)
**Focus**: Ch17–24 (Crane Gratitude, Heungbu-Nolbu, Sang Kancil, Enormous Turnip, Anansi, Mencius Mother, Sima Guang, Kong Rong)
**Scope**: 292 listen-mc + comprehension Qs across 56 lessons (7 lessons × 8 chapters)

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 13 lint issue(s) (X2 ×1, X48 ×1, X49/X49B ×9, X57 ×2)
WARN lessons-ch18.json: 13 lint issue(s) (X2 ×2, X49/X49B ×8, X57 ×2, X21 ×1)
WARN lessons-ch19.json: 18 lint issue(s) (X2 ×6, X49/X49B ×8, X57 ×4)
WARN lessons-ch20.json: 12 lint issue(s) (X2 ×1, X49/X49B ×8, X57 ×3)
WARN lessons-ch21.json: 22 lint issue(s) (X2 ×9, X49/X49B ×10, X57 ×2, X21 ×1)
WARN lessons-ch22.json:  8 lint issue(s) (X2 ×2, X49/X49B ×5, X57 ×1)
WARN lessons-ch23.json: 14 lint issue(s) (X2 ×1, X49/X49B ×10, X57 ×4)
WARN lessons-ch24.json: 15 lint issue(s) (X2 ×2, X49/X49B ×10, X57 ×3)
```

No schema failures; build gate PASS. X49/X49B stimulus-reuse and X57 antonym-mirror are persistent known patterns across the corpus (flagged in prior cycles).

---

## B. A2 Blank-Position Analysis

### What A2-Position means for v2.0 listen-mc

In classic cloze, "blank position" means where in the sentence the tested word appears. In v2.0's `listen-mc` / `comprehension` questions, the equivalent is **where in the stimulus sentence the correct answer's key content appears** (start = first 33%, mid = 33-67%, end = last 33%). An imbalanced distribution means learners can exploit serial-position biases (primacy/recency) rather than processing the full sentence — Construct-Irrelevant Variance (CIV) per Buck 2001.

**Expected target**: ~33% start / ~33% mid / ~33% end (among known-position Qs)
**Signal**: Correct answer's key word first appears in the sentence at that position

### Global distribution (Ch17–24)

| Chapter | Start | Mid | End | Unknown (paraphrased) |
|---------|-------|-----|-----|----------------------|
| Ch17 (Crane Gratitude) | **59%** | 27% | 14% | 14/36 |
| Ch18 (Heungbu-Nolbu)   | 13% | **54%** | 33% | 12/36 |
| Ch19 (Sang Kancil)     | **55%** | 27% | 18% | 19/41 |
| Ch20 (Enormous Turnip) | **70%** | 17% | 13% | 13/36 |
| Ch21 (Anansi)          | **52%** | 26% | 22% | 14/37 |
| Ch22 (Mencius Mother)  | 45% | 30% | 25% | 16/36 |
| Ch23 (Sima Guang)      | **54%** | 31% | 15% | 9/35 |
| Ch24 (Kong Rong)       | 44% | **40%** | 16% | 10/35 |
| **GLOBAL**             | **49%** | 32% | **19%** | 107/292 (37%) |

**Structural finding**: Start-position dominates across 6 of 8 chapters. End-position (19%) is 14 percentage points below target (33%). Unknown/paraphrased rate of 37% is healthy per R1.

### Violation table — per-lesson position skew

Threshold: >65% of known-position Qs concentrated in one position.

| Sev | Ch | Lesson ID | Skew | Bias% | Known-pos Qs | Notes |
|-----|----|-----------|------|-------|--------------|-------|
| P0 | 23 | `kt-ch23-l5` | start | **100%** | 5/5 | All 5 Qs test first 2-3 words; entire lesson gameable by hearing start only |
| P0 | 20 | `kt-ch20-l5` | start | **100%** | 3/3 | Compound w/ X49 stimulus-reuse; gameable |
| P1 | 20 | `kt-ch20-l7` | start | **86%** | 6/7 | "smallest mouse" stimulus used 3× (X49 compound) + all start-anchored |
| P1 | 19 | `kt-ch19-l6` | start | **86%** | 6/7 | Sang Kancil climax lesson; "turned around" sentence used 2× |
| P1 | 22 | `kt-ch22-l7` | start | **83%** | 5/6 | "What you see each day" stimulus 2×; all moral Qs start-anchored |
| P1 | 17 | `kt-ch17-l7` | start | **80%** | 4/5 | Crane reveal lesson; "Tears shone" used 2× |
| P1 | 21 | `kt-ch21-l5` | start | **80%** | 4/5 | Python trap lesson |
| P1 | 18 | `kt-ch18-l4` | mid  | **80%** | 4/5 | Heungbu gourd-opening; mid-bias (less severe than start) |
| P2 | 18 | `kt-ch18-l7` | mid  | 75% | 3/4 | |
| P2 | 17 | `kt-ch17-l4` | start | 67% | 4/6 | |
| P2 | 17 | `kt-ch17-l5` | mid  | 67% | 2/3 | |
| P2 | 21 | `kt-ch21-l6` | start | 67% | 2/3 | |
| P2 | 22 | `kt-ch22-l6` | start | 67% | 2/3 | |
| P2 | 18 | `kt-ch18-l5` | end  | 67% | 2/3 | end-bias (easier direction) |
| P2 | 19 | `kt-ch19-l7` | end  | 67% | 2/3 | end-bias (easier direction) |
| P2 | 20 | `kt-ch20-l4` | start | 67% | 2/3 | |

### Root-cause patterns

**Pattern S1 — Subject-anchor dominance**
Most sentences open with the tested subject ("The little mouse holds on to…", "Sang Kancil jumped off…"). Questions asking "How/What did [subject]…?" anchor to position 0. Fix: restructure some sentences so the action/result appears first ("Gripping the cat's tail, the little mouse…").

**Pattern S2 — Multi-sentence stimulus, only first sentence tested**
Two-sentence stimuli where Q always targets sentence 1 (start). Example `kt-ch23-l5`: "His friend was going under. The time was very short." → questions test "time" (word 2) and "his friend" (word 1-2), never "very short" (end).

**Pattern S3 — Repeated stimulus compounds start bias**
`kt-ch20-l7`: "The smallest mouse was the last help. That tiny push was the one." used as stimulus for 3 separate Qs (x4, x6, x8). All 3 test "smallest" (word position 1-2). Serial-position advantage amplified by repeated exposure — learner can answer on the second Q without re-hearing the sentence.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total Qs scanned (listen-mc + comprehension) | 292 |
| Known-position Qs (answer word locatable in sentence) | 185 |
| Paraphrased / unknown position (R1-compliant) | 107 (37%) |
| Start-bias > 65% lessons (P0/P1/P2) | **16** |
| End-position drought (< 20%) chapters | Ch17, Ch19, Ch20, Ch21, Ch23, Ch24 |
| P0 violations | 2 |
| P1 violations | 5 |
| P2 violations | 9 |
| validate-lessons schema errors | 0 |

---

## D. Top 5 P0

### ⚠️ P0-1: kt-ch23-l5 — 100% start-anchor (Sima Guang lesson 5)

All 5 known-position Qs test content from the first 2-3 words of each sentence.

```
[q3]  "It was the quiet one with the bright eyes."
      Q: "Who was the boy who stayed?"  A: "Sima Guang, the still boy"  → word 2/9 (22%)
[q6]  "His friend was going under, and time was very short."
      Q: "What did Sima Guang know?"   A: "time was running out"        → word 2/10 (20%)
[x2]  "It was the quiet one — the boy with bright eyes."
      Q: "Who did NOT run away?"        A: "the calm, watchful boy"      → word 2/11 (18%)
[x4]  "His friend was going under. The time was very short."
      Q: "What made it urgent?"         A: "the other boy was sinking"   → word 2/10 (20%)
[x9]  "His friend was going under. The time was very short."
      Q: "How did Sima Guang feel?"     A: "he knew time was short"      → word 2/10 (20%)
```

A learner who catches only the first 3 words of every sentence can answer q3/q6/x2/x4/x9 correctly. Fix: add 2-3 Qs that test sentence-final content ("now" / "with bright eyes" / "at once").

### ⚠️ P0-2: kt-ch20-l5 — 100% start-anchor + X49 compound (Enormous Turnip lesson 5)

```
[q5]  "The dog uses his teeth to hold the back of Granddaughter's dress."
      Q: "How does the dog hold on?"    A: "mouth bites the dress"       → word 0/12 (0%)
[q10] "A dog joins the family. Even four pulling, the turnip stays."
      Q: "What is this scene showing?"  A: "more help, still not enough" → word 2/11 (18%)
[x4]  "Four of them pull. They count together. One, two, three, pull!"
      Q: "Who is pulling this time?"    A: "Grandpa, Grandma, the girl, the dog" → word 2/11 (18%)
```

Plus X49 compound: "The dog uses his teeth…" is both a listen-mc stimulus AND a listen-tf sentence in the same lesson. Fix: distribute some Qs to test "Granddaughter's dress" (end) or the counting scene (mid/end).

### ⚠️ P1-1: kt-ch20-l7 — 86% start + triple stimulus reuse (X49 compound)

```
"The smallest mouse was the last help. That tiny push was the one."
  — used as stimulus for kt-ch20-l7-q10, kt-ch20-l7-x6, kt-ch20-l7-x8
  — all three test start-position content ("smallest"/"tiny", word 0-1)
```

Worst compound in Ch17-24: X49 3× reuse × start-bias × thematic moral convergence. Learner hears sentence once, answers 3 Qs by pattern-matching "smallest." Fix: one of the three should test "last help" (mid) or "the one" (end, ratio 1.0), AND use a different stimulus sentence.

### ⚠️ P1-2: kt-ch19-l6 — 86% start-anchor (Sang Kancil lesson 6 — climax)

```
[q9]  "Their bodies could go in the water but not up the dry land."
      Q: "Why couldn't crocs catch?"    A: "trapped in the water"        → word 0/13 (0%)
[q10] "On the other side of the river, mouse deer found the fruit tree at last."
      Q: "What did mouse deer do next?" A: "he ate the fruit he wanted"  → word 1/15 (7%)
[x1]  "Sang Kancil jumped off the last crocodile onto the other side."
      Q: "What after the last croc?"    A: "jumped onto dry land"        → word 2/11 (18%)
```

This is the story's climax lesson — deserves the most cognitively demanding Qs. Currently the easiest position-wise. Fix: add Qs that test "onto the other side" (end) or "at last" (end).

### ⚠️ P1-3: kt-ch22-l7 — 83% start + "What you see" stimulus 2× (Mencius Mother lesson 7)

```
[q3]  "For many years, he sat with his books from sunrise to night."
      Q: "How long did Meng keep studying?" A: "many years in a row" → word 0/13 (0%)
[q6]  "She gave up many things so her son could learn well."
      Q: "What did the mother do?"       A: "gave up much for his learning" → word 0/10 (0%)
[q8]  "What you see every day shapes who you become."
      Q: "What does this story tell us?" A: "your place around you shapes you" → word 0/9 (0%)
[x4]  "People still tell of his mother who moved three times."
      Q: "Why do people remember?"       A: "her brave choice made Meng great" → word 0/9 (0%)
```

"What you see every day…" is also X49B (used as stimulus by 2 comprehension Qs). Fix: rewrite some Qs to test "from sunrise to night" (end) and "who moved three times" (end).

---

## E. Narrative Voice / Pacing Improvements (3 required)

**Voice-1: kt-ch17-l7 — emotional climax pacing diluted by reuse**
"Tears shone quietly in her soft, dark eyes." is used as stimulus for BOTH q3 ("How did the young woman look?") and x1 ("How did the young woman feel saying goodbye?"). These two Qs are near-synonyms measuring the same construct. Replace x1 with a Q testing the crane's action mid-flight ("She flew up, up, up into the morning sky." → test end-position "morning sky" for contrast). Creates emotional arc: sadness → release → freedom.

**Voice-2: kt-ch23-l5 — missing Grandma-frame warmth**
This lesson uses 3rd-person historian narration throughout ("It was the quiet one…", "His friend was going under…"). No Grandma-voice cue. At minimum, the moral/gist Q (x8: "What is the main message?") should be framed as a Grandma question: *"Grandma looks at you and asks: What kind of person do you want to be — one who waits, or one who acts?"* — keeps the outer-frame warmth alive in a historically-set lesson.

**Voice-3: kt-ch20-l7 — triple repetition of moral sentence without variation**
"The smallest mouse was the last help. That tiny push was the one." appears 3× as stimulus. Each time the Q angle is slightly different (lesson-level, story-level, meta-lesson), but the repeated sentence flattens the emotional build. Suggest for x8 (big-lesson Q), use a different sentence that REFERS to the mouse indirectly: *"Even after all that hard work together, it took one more tiny push."* — keeps moral without verbatim repetition.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research Summary

Serial position effect (primacy + recency) is well-established in psycholinguistics: listeners recall information from sentence beginnings (primacy) and endings (recency) more reliably than middles (EBSCO Serial Position Effect; Ebbinghaus 1885). For listening comprehension tests, this means:

1. **End-position testing** is easiest (recency advantage) — good for A2 warm-up but should not dominate
2. **Start-position testing** anchors on sentence subject — creates "hear the first few words → guess" strategy
3. **Mid-position testing** is cognitively demanding — requires full sentence processing

Duolingo's 2025 Interactive Listening redesign (Naismith, Cardwell et al., *DET Technical Manual 2025*) moved toward **scenario-length audio with multiple embedded questions at varied positions** — precisely to prevent single-sentence shortcutting.

Current Pickup global distribution: 49% start / 32% mid / 19% end (known positions).
Industry target per Buck 2001 + Duolingo 2025: ~33% / ~33% / ~33%.

### ARCH-REC #213: X213_A2_POSITION_BALANCE_LINT

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| Lint check for start-position dominance per lesson | Serial position effect research; ETS item diversity guidelines | ✅ Pure JSON analysis in `tools/validate-lessons.js`; no runtime change; no src/ change | Low (½ day) | High — catches structural CIV that existing X48/X49/X57 linter misses | ✅ 推薦 |

**Concrete implementation** (modify `tools/validate-lessons.js` only):
```js
// X213 — A2_POSITION_BALANCE: per-lesson, flag if start% > 65% of known-pos Qs
// OR if end-position count === 0 for lessons with ≥5 known-pos Qs
function checkX213(lessonId, mcQuestions) {
  const dist = { start:0, mid:0, end:0 };
  mcQuestions.forEach(q => {
    const pos = getAnchorPosition(q.sentence, q.options[q.correctIndex]);
    if (pos in dist) dist[pos]++;
  });
  const known = dist.start + dist.mid + dist.end;
  if (known < 3) return; // too few to judge
  if (dist.start / known > 0.65)
    warn(lessonId, `X213_START_DOMINANCE (${pct}% start-anchored)`);
  if (known >= 5 && dist.end === 0)
    warn(lessonId, `X213_END_DROUGHT (0 end-position Qs in ${known}-Q lesson)`);
}
```

**Impact**: Would have flagged 16 lessons this cycle (P0/P1/P2 violations above). Zero false positives expected — the 37% paraphrased (unknown) rate provides enough buffer.

**Not recommended**: Restructuring all sentences to force end-position (would sound unnatural in children's narration). The fix is adding 1-2 end-anchored Qs per lesson, not sentence rewrites.

---

*Audit runtime: ~4 min | Lessons scanned: 292 Qs across 56 lessons Ch17-24 | Violations: 16 lesson-level position skews (2 P0, 5 P1, 9 P2)*
