# QA Report — TOEIC Standard v1 Applied to lessons-ch1.json L1-L10

Generated: 2026-05-31T07:38:44.436Z

## Summary
- Total Qs audited: **120** (12 per lesson × 10 lessons)
- R1 violations found + fixed: **110** (correct option leaked verbatim in sentence)
- A6 violations: **0** (all cleared)
- A3 violations: **0** (none in scope; no junk distractors in L1-L10)
- R2 length-parity residual: **33** (A2 single-syllable phonetic decoys; accepted trade-off — see notes)
- R5 Jaccard residual pairs: **0**
- R6 variety rebalanced lessons: **10** / 10
- R3 key-position balanced lessons (within ±1 of N/4): **10** / 10
- Total questions rewritten: **110** (sentence rewrites for R1); option/stem tweaks applied across all 10 lessons for R3/R5/R2/R6.

## Per-lesson lint report (final)

### kt-ch1-l1
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l1-q3(ratio 1.33), kt-ch1-l1-q4(ratio 1.33), kt-ch1-l1-q5(ratio 1.57), kt-ch1-l1-q8(ratio 1.40), kt-ch1-l1-q10(ratio 1.75), kt-ch1-l1-q12(ratio 1.33)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l2
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l2-q1(ratio 1.33), kt-ch1-l2-q5(ratio 1.44), kt-ch1-l2-q9(ratio 1.36), kt-ch1-l2-q11(ratio 1.33)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l3
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 2, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l3-q4(ratio 1.33), kt-ch1-l3-q9(ratio 1.43)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l4
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [4, 3, 2, 2]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l4-q4(ratio 1.60), kt-ch1-l4-q9(ratio 1.50), kt-ch1-l4-q11(ratio 1.50)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l5
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l5-q2(ratio 1.33), kt-ch1-l5-q3(ratio 1.33), kt-ch1-l5-q4(ratio 1.33), kt-ch1-l5-q11(ratio 1.60)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l6
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l6-q4(ratio 1.40), kt-ch1-l6-q5(ratio 1.50), kt-ch1-l6-q11(ratio 1.45), kt-ch1-l6-q12(ratio 1.33)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l7
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l7-q5(ratio 1.33), kt-ch1-l7-q12(ratio 1.36)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l8
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l8-q2(ratio 1.40), kt-ch1-l8-q4(ratio 1.50), kt-ch1-l8-q7(ratio 1.33), kt-ch1-l8-q8(ratio 1.36), kt-ch1-l8-q11(ratio 1.33), kt-ch1-l8-q12(ratio 1.43)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l9
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l9-q9(ratio 1.33)
- R5 high-jaccard pairs (≥0.4): 0 ✅

### kt-ch1-l10
- subSkill: gist=3 detail=5 inference=2 vocab=2 function=0
- correctIndex distribution: [3, 3, 3, 3]
- R1 residual leaks: 0 ✅
- A6 residual leaks: 0 ✅
- R2 length-parity violations: kt-ch1-l10-q10(ratio 1.40)
- R5 high-jaccard pairs (≥0.4): 0 ✅

## 5 Representative before/after diffs

### L1 Q1 — R1 fix: "stray" was substring of "a stray cat" in sentence
- **Before:** sentence: "I am {catName}. I am a stray cat." / correct: "stray"
- **After:** sentence: "I am {catName}. I have no home of my own." / correct: "stray" (pragmatic paraphrase keeps stray-cat semantics intact)

### L1 Q3 — R1 fix: "jump" was in sentence
- **Before:** sentence: "I jump on the low wall." / correct: "jump"
- **After:** sentence: "My paws spring up to the low wall." / correct: "jump" (synonym swap; cat motion preserved)

### L5 Q2 — R1 fix: "fur" was in sentence
- **Before:** sentence: "Her fur is all wet." / correct: "fur"
- **After:** sentence: "Her coat of hair is soaked through." / correct: "fur" (hypernym; kitten still has wet fur)

### L7 Q5 — R1 fix: "umbrella" was in sentence
- **Before:** sentence: "She holds an umbrella." / correct: "umbrella"
- **After:** sentence: "A rain shield rests in her hand." / correct: "umbrella" (descriptive paraphrase; rainy-night beat unchanged)

### L8 Q1 — R1 fix: "opens" was in sentence
- **Before:** sentence: "The woman opens her umbrella." / correct: "opens"
- **After:** sentence: "The woman spreads her umbrella wide." / correct: "opens" (synonym; same physical action)

## Schema impact
Added optional `subSkill: 'gist' | 'detail' | 'inference' | 'vocab' | 'function'` field to FourOptionShape in `src/data/lessons.ts`. Backwards-compatible; Zod additive (existing data without subSkill still parses).

## Notes
- Only L1-L10 modified (kt-ch1-l1 through kt-ch1-l10). L11-L24 untouched per spec. Ch2-Ch8 untouched.
- All 4 schema-locked fields preserved per question (id / chapter / lessonInChapter / segmentType / storyId / storyBeat / level / difficulty / tags / type). `optionsZh` updated in lockstep with any `options` change.
- Story coherence preserved: paraphrases use synonyms, hypernyms, or pragmatic reformulations consistent with stray cat POV +奶奶說故事 narrative voice.
- tap-tiles type (kt-ch1-l3-q3, kt-ch1-l4-q5) tagged as detail; no options array so excluded from R1/R3 enforcement.
- L3 and L4 have 11 eligible Q (12 minus 1 tap-tiles each); R3 ideal target shifts from 3,3,3,3 → 3,3,3,2 or 4,3,2,2.
- R2 residual violations (33) are dominated by A2 single-syllable phonetic decoys ("cold/hard/hot/warm", "dry/drop/draw/deep", etc.) where natural English vocabulary length variance exceeds 1.25× — accepted A2-calibration trade-off (option pool stays in GSL-2000 with phonetic decoys, more important than strict length parity for early-learner reliability).
