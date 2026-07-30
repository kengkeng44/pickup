# Content QA — 2026-07-30 18:06 UTC

**Today's angle:** R2 — Distractor Doctrine (4-Option Blind Test)  
Checking: length parity, duplicate/near-duplicate distractors, structural word-count tell, and distractor keyword clustering — all of which allow learners to select the correct answer without processing the audio.

**Focus:** Ch17–24 (Crane Wife / Heungbu-Nolbu / Mouse Deer / Giant Turnip / Anansi / Mencius's Mother / Sima Guang / Kong Rong Pears)

**Rotation context:** Previous 8 cycles: #12, A7, A1, A4, #11, A5, A6, A3 — R2 not covered in past 8 cycles.

**Scope:** 308 MC-type Qs filtered to `listen-mc` / `comprehension` / `picture-mc` (excluded `emoji-pick` and `grammar-mc` where option length is structurally constrained). Total in Ch17–24: 536 Qs across 7 chapters × 7 lessons.

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 13 lint issue(s)
  kt-ch17-l7-x7: X2_OPTION_LIST_BIAS (all start with "because")
  kt-ch17-l7-x7: X48_NGRAM_VERBATIM_CORRECT
  kt-ch17-l3: X49B_STIMULUS_REUSE_COMP ×2
  kt-ch17-l4: X49B_STIMULUS_REUSE_COMP ×2
  kt-ch17-l5: X49_STIMULUS_REUSE + X49B_STIMULUS_REUSE_COMP
  kt-ch17-l6: X49_STIMULUS_REUSE ×2
  kt-ch17-l7: X49B_STIMULUS_REUSE_COMP
  kt-ch17-l3-x3: X57_ANTONYM_PAIR_MIRROR
  kt-ch17-l4-q7: X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch18.json: 13 lint issue(s) — X2, X49×7, X57×2
WARN lessons-ch19.json: 18 lint issue(s)
...
Total mirror-lint issues: 440 (warn-only)
No X8_R2_LENGTH_SEVERE/WARN flags in Ch17–24
→ All existing R2 violations fall in 1.25–1.50 range — below validate-lessons threshold (>1.5)
```

No schema parse failures. Build gate green.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence snippet | Violation | Severity | 修法 | Audio regen? |
|----|------|------|-----------------|-----------|----------|------|--------------|
| 17 | kt-ch17-l1-pm1 | picture-mc | A kind old man helped a hurt bird. | PICTURE_MC_CORRECT_OVER_SPECIFIC: correct "an elderly man releasing an injured crane"(41c) vs distractor max 31c — 32% longer, over-specific tells | P0 | Trim correct to ≤33c: "an old man freeing a hurt crane" | No |
| 19 | kt-ch19-l7-x5 | comprehension | The crocodiles slowly went back into the dark water. | WORD_COUNT_STRUCTURAL_TELL: correct "step by step, one at a time"(7w) vs ALL distractors 4w each | P0 | Expand one distractor to 6-7w: e.g. "one after another, very slowly" | No |
| 17 | kt-ch17-l3-x7 | comprehension | She gave the old man one rule: never look inside the room… | LENGTH_PARITY ratio=1.44 — correct "keep her weaving secret"(23c) IS longest; 3 distractors 16-20c | P1 | Expand distractors to 22-24c: "stop him from going inside" / "send him to do work outside" | No |
| 17 | kt-ch17-l4-q3 | listen-mc | She held a soft white cloth. It shone like fresh snow. | LENGTH_PARITY ratio=1.43 — correct "bright and beautiful"(20c) IS longest; distractors 14-15c | P1 | "bright and beautiful" → "shining and soft" (16c); or expand distractors to 18c | No |
| 17 | kt-ch17-l6-q9 | listen-mc | The old man's heart broke. He could not move. | LENGTH_PARITY ratio=1.43 — correct "shocked and very sad"(20c) IS longest; distractors 14-17c | P1 | Add filler word to shorter distractors: "angry and quite loud" / "sleepy and so bored" | No |
| 18 | kt-ch18-l3-q9 | listen-mc | He picked up the small bird with very soft hands. | LENGTH_PARITY ratio=1.50 — correct "soft and gentle"(15c) IS longest; "with a net"(10c) drags min | P1 | Expand "with a net" → "with a long net" (15c) | No |
| 18 | kt-ch18-l4-x1 | comprehension | Heungbu wrapped the bird's leg in soft cloth. | LENGTH_PARITY ratio=1.47 — correct "cloth tied around its leg"(25c) IS longest | P1 | Trim to "a cloth wrap on its leg"(22c) | No |
| 18 | kt-ch18-l5-x8 | comprehension | Three magic gourds gave Heungbu rice, gold, a new house… | LENGTH_PARITY ratio=1.50 — correct "poor and hungry to rich and happy"(33c) IS longest | P1 | Trim: "hungry and poor to full and rich"(30c) | No |
| 19 | kt-ch19-l4-x8 | comprehension | The crocodiles came up from the water. They believed… | DISTRACTOR_CLUSTER_WORD: all 3 distractors contain "deer"/"mouse" — correct doesn't → isolation tell | P1 | Rephrase correct to echo protagonist: "mouse deer fooled them with a count" | No |
| 19 | kt-ch19-l6-q5 | listen-mc | The little mouse deer turned around and called back… | LENGTH_PARITY ratio=1.42 — correct "there was no king's message"(27c) IS longest | P1 | Trim: "the king sent no message"(22c) | No |
| 19 | kt-ch19-l7-q9 | listen-mc | His low voice came up from the dark water in a slow sad sound. | LENGTH_PARITY ratio=1.46 — correct "quiet and sorrowful"(19c) IS longest | P1 | "quiet and sorrowful" → "slow and quiet" (14c), OR expand distractors | No |
| 20 | kt-ch20-l4-x1 | comprehension | The little girl runs out of the door without putting shoes on. | DISTRACTOR_CLUSTER_WORD: all 3 distractors contain "shoes" — correct "too excited to wait" doesn't | P1 | Add shoes mention to correct: "too excited to put on shoes" | No |
| 20 | kt-ch20-l5-x4 | comprehension | Four of them pull. They count together. One, two, three, pull! | LENGTH_PARITY ratio=1.46 — correct lists 4 named characters "Grandpa, Grandma, the girl, the dog"(35c) IS longest | P1 | Balance: "Grandpa, Grandma, girl, dog"(26c) vs distractors 24-31c | No |
| 21 | kt-ch21-l4-x5 | comprehension | The python lay down by the stick to show his full length. | DISTRACTOR_CLUSTER_WORD: all 3 distractors contain "stick" — correct "lie down fully beside it" doesn't | P1 | Correct uses "it" (pronoun); add stick reference: "stretch out next to the stick" | No |
| 23 | kt-ch23-l6-x2 | comprehension | He saw a big stone in the grass. | DISTRACTOR_CLUSTER_WORD: distractors all start "one flat…/one long…/one small…" — correct "a large heavy stone" breaks pattern | P1 | Regularise: drop "one" from distractors — "a flat wooden board" / "a long strong rope" | No |
| 24 | kt-ch24-l7-q6 | listen-mc | The small boy gave the big pears to his older brothers. | DISTRACTOR_CLUSTER_WORD: all 3 distractors contain "pears" — correct "he gave the best to his brothers" doesn't | P1 | Add pears to correct: "he gave the big pears to his brothers" | No |
| 24 | kt-ch24-l7-x2 | comprehension | Kong Rong said, 'My brothers are older. They should have the big pears.' | DISTRACTOR_CLUSTER_WORD: all 3 distractors contain "brothers" — correct "his elders deserve more" doesn't | P1 | Correct already the best choice; add "brothers" or rephrase distractors to avoid cluster | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total MC Qs audited (listen-mc/comprehension/picture-mc) | 308 |
| P0 violations | 2 |
| P1 violations — LENGTH_PARITY (correct is longest, ratio 1.4–1.5) | 28 |
| P1 violations — DISTRACTOR_CLUSTER_WORD | 6 |
| P1 violations — other (word-count tell, near-dup) | 1 |
| Chapters affected | Ch17, 18, 19, 20, 21, 23, 24 |
| Validate-lessons X8_R2 violations in Ch17–24 | 0 (threshold gap: 1.25–1.50 range not caught) |

**Root cause pattern:** LLM-generated distractors are consistently shorter (4-word phrases) while correct answers carry more specific content (clause-length). Research (2025 ACL, Wang & Meng 2026) confirms correct-is-longest bias occurs in 55%+ of LLM-generated MC items vs the expected 25%. Pickup's validate-lessons enforces R2 at >1.5 threshold, missing the 1.25–1.5 band.

---

## D. Top 5 P0

⚠️ **P0 #1 — kt-ch17-l1-pm1** (picture-mc, Ch17 Crane Wife)  
`correct: "an elderly man releasing an injured crane"` (41c) vs distractor max 31c  
Learner sees only one option with "releasing" + "injured" (specific action + state) → selects without listening.  
Fix: "an old man freeing a hurt crane" (27c) — ratio drops from 1.32 to 0.87 (safe).

⚠️ **P0 #2 — kt-ch19-l7-x5** (comprehension, Ch19 Mouse Deer)  
`correct: "step by step, one at a time"` (7w) vs ALL distractors exactly 4w.  
7-word correct stands out visually in printed/rendered option list → structural tell. Fix: expand distractor to "one by one, very slowly" (5w minimum).

⚠️ **P1 → near-P0 — kt-ch20-l4-x1** (comprehension, Ch20 Giant Turnip)  
All 3 distractors: "she lost her shoes long ago" / "shoes hurt her feet badly" / "Grandma hid the shoes".  
Correct: "too excited to wait". A learner notices all wrong answers are about shoes → infers correct doesn't mention shoes → selects without listening. This "all-distractors-share-topical-word" pattern is a known EFL test-wiseness cue per Buck 2001 §3.4.

⚠️ **P1 — kt-ch18-l5-x8** (comprehension, Ch18 Heungbu)  
`correct: "poor and hungry to rich and happy"` (33c) vs distractors 22-32c.  
Paired with an already-flagged X49B_STIMULUS_REUSE — double vulnerability: same sentence used twice AND correct is longest.

⚠️ **P1 — kt-ch19-l4-x8** (comprehension, Ch19 Mouse Deer)  
All 3 distractors name "mouse deer" explicitly; correct says "he fooled them with a clever count".  
Learner eliminates options with protagonist name → narrows to 1 choice without listening. Fix: add "the mouse deer" to correct phrasing.

---

## 📝 Narrative Voice / Pacing Improvements (3 proposals even at 0 violations)

1. **Ch17 outro tone**: `kt-ch17-l7-x7` comprehension question uses "because the old man…" for ALL 4 options (X2_OPTION_LIST_BIAS). Even after fixing the bias, the story beat (crane's farewell) deserves a "what happened" framing, not a "why" framing — shift to "What did the crane do before flying away?" for better closure pacing.

2. **Ch21 Anansi chapter pacing**: `kt-ch21-l4-x5` — "What does the python do next to Anansi's stick?" asks about the python's action but correct answer "lie down fully beside it" uses a pronoun "it" without antecedent audible from that lesson's sentence. At A2 level, explicit nouns are safer: "stretch out beside the stick" → clearer referential anchor.

3. **Ch23 Sima Guang register**: `kt-ch23-l6-x2` — comprehension question "What did Sima Guang find in the garden?" has distractors using count quantifiers "one flat wooden board / one long strong rope / one small water bucket" — this sounds like Mandarin-L1 transfer ("一塊板" → "one flat board"). Children's English would say "a flat board" not "one flat board". Fix: replace "one" with "a" across all three distractors.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research Sources
- Wang & Meng (2026) — *Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods* DOI: 10.1177/02655322251400375: GenAI distractors maintain structural alignment but struggle to capture listening miscomprehension patterns.  
- ACL 2025 — *Generating Plausible Distractors for Multiple-Choice Questions via Student Choice Prediction* (https://aclanthology.org/2025.acl-long.1154.pdf): correct answer uniquely longest in 55%+ of LLM-generated items; expected 25%.  
- 2025 Item Writing Guide (ASC, https://assess.com/docs/ASC_Item-Writing-Guide_2025.pdf): non-homogeneous option length is a named item-writing flaw in distractor efficiency analysis.

### Gap Analysis

| Check | Spec rule | Current validate-lessons threshold | Gap |
|-------|-----------|-----------------------------------|-----|
| Correct-is-longest parity | R2: ratio ≤ 1.25 | X8_R2_LENGTH_WARN at >1.50 | **28 violations in 1.25–1.50 range go undetected** |
| Distractor keyword clustering | R4: 4 distinct failure modes | Not checked | **6 CLUSTER_WORD violations undetected** |
| Word-count structural tell | R2 extension | Not checked | **1 P0 undetected** |

### ARCH-REC #222: `X222_R2_MILD_BAND + X63_DISTRACTOR_CLUSTER_WORD`

**Pattern**: Tighten R2 band and add distractor-cluster lint to validate-lessons.js.

**Pickup 適配 (✅)**:
- Pure JS in `tools/validate-lessons.js` — no new dependencies, no React/schema changes.
- Only adds `WARN` (not fail) for mild band, keeping build green while surfacing real issues.
- CLUSTER_WORD lint works on existing `options[]` + `correctIndex` fields — no schema change.

**Implementation**:
```js
// In lintR2LengthParity(): add mild band (warn-only, never fail)
if (ratio > 1.25 && ratio <= 1.5 && lens[q.correctIndex] === maxL) {
  issues.push(`${file} ${q.id}: X8b_R2_LENGTH_MILD (ratio=${ratio.toFixed(2)}, correct=longest — trim correct or expand short distractor)`);
}

// New function: lintDistractorCluster(lessons, file)
// For each Q: find all content words shared by ALL 3 distractors but absent from correct
// If shared_exclusive_words.size > 0 → flag X63_DISTRACTOR_CLUSTER_WORD
function lintDistractorCluster(lessons, file) {
  const STOP = new Set(['a','an','the','is','are','was','were','be','to','of','and','or',
    'in','on','at','it','he','she','they','his','her','their','for','with','by','not']);
  const issues = [];
  for (const lesson of lessons) {
    for (const q of lesson.questions || []) {
      if (!Array.isArray(q.options) || q.options.length < 4) continue;
      if (typeof q.correctIndex !== 'number') continue;
      const cw = w => new Set(w.toLowerCase().match(/\b[a-z]{3,}\b/g) || []).difference(STOP);
      const distWords = q.options
        .filter((_,i) => i !== q.correctIndex)
        .map(o => cw(o));
      if (distWords.length < 3) continue;
      const sharedInDist = [...distWords[0]].filter(w => distWords.every(s => s.has(w)));
      const correctWords = cw(q.options[q.correctIndex]);
      const exclusive = sharedInDist.filter(w => !correctWords.has(w));
      if (exclusive.length > 0) {
        issues.push(`${file} ${q.id}: X63_DISTRACTOR_CLUSTER_WORD (distractors share "${exclusive.slice(0,2).join('/')}" absent from correct — isolation tell)`);
      }
    }
  }
  return issues;
}
```

**Effort**: ~2 hr (add lint function + integrate into main loop + update help text).  
**ROI**: High — catches 55%+ of LLM-generated length-tell pattern that Buck 2001 + 2025 ACL both cite as the #1 test-wiseness exploit in automated item generation.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| R2 mild-band lint (1.25–1.5) for correct-is-longest | [ACL 2025 distractor paper](https://aclanthology.org/2025.acl-long.1154.pdf) | ✅ Pure JS validate-lessons.js addition; warn-only | ~1 hr | High — 28 Ch17-24 gaps currently pass R2 | **Recommend** |
| Distractor keyword cluster lint (X63) | [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375); Buck 2001 §3.4 | ✅ Works on existing schema fields | ~1 hr | High — 6 cluster violations + isolation tell undetected | **Recommend** |
| Per-distractor `failureMode` tagging in JSON | [ACL 2025 §3.2](https://aclanthology.org/2025.acl-long.1154.pdf) | 🟡 Additive optional field, high authoring cost | 4-6 hr schema + content | Medium — diagnostic value but significant per-lesson authoring | Defer |
| GenAI distractor expansion loop (IRT-calibrated) | [Wang & Meng 2026](https://doi.org/10.1177/02655322251400375) | 🟡 Needs IRT data we don't yet have | 2+ days | Low in MVP phase | Phase 3 |
