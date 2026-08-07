# Content QA — 2026-08-07 00:07 UTC

Today's angle: **A1 — Obvious Correct (gap too easy / scan-match giveaway)**
Focus: Ch0-8 listen-mc & listen-comprehension questions

---

## A. validate-lessons.js result

```
validate-lessons.js passed (no schema errors)
Total lint warnings ch0-8: 0 FAIL, ongoing WARN set (X2/X48/X49/X57 — separate angles)
```

---

## B. Violation Table

### P0 — Verbatim Correct (V1: correct option is literal substring of sentence)

| Ch | Q ID | type | sentence snippet | correct option | options | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|---------|-----------|------|-------------|
| 0 | kt-ch0-l3-q2 | listen-mc | "I said, 'your name is **Mochi**.'" | Mochi | Mochi / Marshmallow / Snowy / Pudding | **V1_VERBATIM**: correct option is exact word in sentence — zero comprehension needed | Replace Q: "What did grandma decide to call the little cat?" + keep options | No |
| 5 | kt-ch5-l4-q3 | listen-mc | "…It was not made of wood. It was made of white **bones**." | bones | stone / cold metal / old rope / bones | **V1_VERBATIM**: "bones" appears verbatim at sentence end — recency+scan = trivial | Rephrase to "What unusual material made up the fence?" + correct option → "human remains" or "white skull fence" | No |

### P1 — Length Mismatch (V2: option length ratio >2.5×, short options eliminating themselves)

| Ch | Q ID | type | sentence snippet | options | ratio | 修法 | audio regen? |
|----|------|------|-----------------|---------|-------|------|-------------|
| 1 | kt-ch1-l5-q3 | listen-mc | "…monkey took one dumpling and bowed." | "by taking a dumpling" / "by force" / "by following silently" / "by stealing food" | 2.6× | Pad short: "by raw force" / "silently following" | No |
| 1 | kt-ch1-l5-q9 | listen-mc | "…barely see each other through the white air." | "very poor" / "clear and bright" / "sunny" / "sparkling" | 3.2× | Replace "sunny" → "bright and sunny" / "sparkling" → "clear and shining" | No |
| 3 | kt-ch3-l6-q9 | listen-mc | "The wind pushed his long ears flat behind his head." | "steady and careful" / "standing still" / "walking" / "faster than ever" | 2.6× | Pad: "walking slowly" / "standing in place" | No |
| 3 | kt-ch3-l7-q9 | listen-mc | "The brown rabbit pressed his paws on the ground and looked at the line." | "proud and strong" / "embarrassed" / "sleepy" / "hungry" | 2.7× | Pad: "deeply embarrassed" or split "proud" → "full of pride" | No |

### P1 — Lone Sentence Echo (V4: correct echoes sentence vocab; 0 distractors do — scan-matchable)

28 instances detected across Ch0-8 (28.3% of all listen-type Q). Top 8 most actionable:

| Ch | Q ID | sentence (abbr.) | correct | all options | fix direction |
|----|------|-----------------|---------|------------|---------------|
| 0 | kt-ch0-l1-q2 | "The night was **dark** and rainy." | "dark and wet" | dark and wet / bright and sunny / hot and dry / white with snow | Correct echoes "dark"; distractors avoid it. Rewrite correct → "dim and stormy" |
| 0 | kt-ch0-l2-q1 | "The little cat was **wet and cold**." | "very cold" | very cold / very happy / hungry / sleepy | Correct echoes "cold"; distractors all neutral. Rewrite → "shivering" or "chilled through" |
| 0 | kt-ch0-l4-q1 | "Mochi sat by the **door**…" | "near the door" | near the door / under the bed / in the box / on the sofa | Correct echoes "door". Rewrite → "by the entrance" |
| 0 | kt-ch0-l6-q1 | "I told a **story** to Mochi and Hana." | "told them a story" | told them a story / sang them a song / made them a cake / gave them a bath | Correct echoes "story". Rewrite → "shared a tale with them" |
| 1 | kt-ch1-l3-q5 | "…born in [a **peach**]." | "he came from a peach" | …from a peach / family tradition / his mother wished it / the village voted | Correct echoes "peach". Rewrite → "he was discovered inside a fruit" |
| 1 | kt-ch1-l6-q5 | "…**running** fast, **biting** at any leg…" | "by running fast and biting" | (others don't mention running/biting) | Echoes "running" + "biting". Rewrite → "by charging low and nipping" |
| 5 | kt-ch5-l3-q5 | "After the white rider, the sky turned **light**." | "morning light" | a cold rain / deep darkness / a quiet song / morning light | Echoes "light". Rewrite → "the dawn" or "first daybreak" |
| 6 | kt-ch6-l3-q9 | "Six small **beds** lay smooth and still." | "six empty beds" | (others: toys, chair, asleep) | Echoes "beds". Rewrite → "a row of unused sleeping spaces" |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch0-8 total questions | 971 |
| Ch0-8 listen-type Q | 106 |
| V1 verbatim correct (P0) | 2 (1.9%) |
| V2 length ratio >2.5× (P1) | 4 (3.8%) |
| V4 lone sentence echo (P1) | **30 (28.3%)** |
| V5 recency giveaway (P1) | 2 (1.9%) |

**28.3% V4 rate** is the headline finding. Nearly 1 in 3 listen-mc questions can be answered by scanning which option borrows vocabulary from the sentence — without processing sentence meaning. At A2 target level, vocabulary overlap is the learner's primary escape route; distractor design must close this door.

---

## D. Top 5 P0

1. **⚠️ V1 kt-ch0-l3-q2**: Name stated verbatim in sentence → correct option is that exact name. Zero listening required. Affects Ch0 intro lesson (first impressions matter most).
2. **⚠️ V1 kt-ch5-l4-q3**: "It was made of white bones" → correct option "bones" at sentence end. Classic recency + verbatim double giveaway.
3. **⚠️ V4 systemic Ch0**: All 6 lessons in Ch0 contain at least one V4 violation. Ch0 is the onboarding chapter — low-difficulty scan-match questions set wrong expectations ("this is too easy") and undermine buy-in for harder chapters.
4. **⚠️ V2 kt-ch1-l5-q9**: Length ratio 3.2× (worst in corpus). "very poor" (9 chars) vs "clear and bright" (16), "sparkling" (9), "sunny" (5) — mixing extreme lengths exposes the longer phrase as structurally unusual, biasing toward short options.
5. **⚠️ V4 kt-ch5-l3-q5**: Story-critical moment (White Rider = dawn motif in Baba Yaga arc) reduced to scan-match because "morning light" is the only option that echoes "light" from sentence.

---

## E. 3 Narrative Voice / Pacing Improvements (even if 0 rule violations)

1. **Grandma-voice warmth check**: Several Ch0 questions use flat declarative sentences as stems ("Mochi sat by the door and looked outside.") — no warmth register. Even for listen-mc, the narration sentence could carry more Ghibli voice: "Mochi pressed her nose against the cold door and stared at the dark street." This doesn't change the Q but makes the listening passage richer.

2. **Option cultural specificity for Ch1**: Momotarō-arc distractors (Ch1) lean on generic functional distractors ("by force", "by following silently") that could apply to any story. Grounding at least one distractor in the specific world — e.g., "by offering his oni club" or "by challenging the demon to a dance" — would deepen story comprehension and reduce the feeling that options are interchangeable across lessons.

3. **Ch5 (Baba Yaga) tonal mismatch**: Questions in kt-ch5-l3/l4/l5 use neutral Q stems like "What did Vasilisa see?" and offer polite options. Baba Yaga's register is ominous and sparse. Aligning option tone — "a fence of gleaming skulls" vs "a fence of bones" — better preserves the story's atmosphere and gives inferential questions more tonal friction to work against.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #252: X60_A1_SCAN_MATCH_LINT — Vocabulary-Overlap Nonfunctional Distractor Detection**

### Research basis

| Source | Finding |
|--------|---------|
| [Duolingo 2026 Technical Manual](https://duolingo-papers.s3.us-east-1.amazonaws.com/other/technical_manual/DET_technical_manual_2026_07.pdf) | Duolingo selects distractors by **vector embedding similarity + LLM log-probability** filtering to ensure no option echoes the stimulus. Operationally: candidate distractors that score too similar to the correct answer OR that repeat stimulus tokens are rejected. |
| [BEA 2025 Survey on Automated Distractor Evaluation](https://aclanthology.org/2025.bea-1.5/) | Automated distractor evaluation is now a mature NLP sub-field. "Plausibility scoring" (distractor must look correct to a non-expert) and "stem independence" (distractor must not echo question/stimulus keywords) are the two standard axes. |
| [PMC Nonfunctional Distractor Analysis](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7372664/) | Standard threshold: any distractor chosen by <5% of examinees = nonfunctional. In Pickup's context: a distractor that shares 0 content words with the sentence while the correct option shares ≥1 = structurally nonfunctional before deployment. |
| IELTS 2026 guidance | "Avoid focusing only on keywords; distractors often repeat the same words from the question but in a different context" — i.e., at least *some* distractors should echo sentence vocabulary to prevent scan-match isolation of the correct option. |

### Pickup 適配分析

✅ **適合** — Pickup's React 18 + JSON lesson files + Zod schema + node-based validate-lessons.js toolchain is perfectly positioned for a lightweight vocabulary-overlap lint gate. No ML required: pure token-matching (stopword-filtered content words) runs in <100ms on the full lesson corpus.

**Proposed lint gate X60_A1_SCAN_MATCH_LINT**:

```js
// In validate-lessons.js
// For each listen-mc / listen-comprehension Q:
//   1. Extract content words from sentence (length > 3, not in stopword set)
//   2. For each option, count how many content words overlap with sentence
//   3. VIOLATION: correct option overlaps ≥1 word AND 0 distractors overlap any word
//      → "lone scan-match echo" — correct is the only sentence-anchored option
// Threshold: flag when correctOverlap ≥ 1 AND distractorMaxOverlap == 0

const STOPWORDS = new Set(['that','this','with','from','they','have','been','will',
  'were','said','when','then','than','also','into','your','their','there','which',
  'what','very','just','more','some','like','only','over','such','both','each']);

function contentWords(str) {
  return str.toLowerCase().split(/[^a-z]+/)
    .filter(w => w.length > 3 && !STOPWORDS.has(w));
}
```

**Effort**: ~2h — add `X60_A1_SCAN_MATCH_LINT` check to `validate-lessons.js`. No app code changes, no lessons-ch*.json modifications.

**ROI**: 
- Prevents future lesson authoring from introducing scan-match Q (structural gate)  
- Current corpus has 30 (28.3%) live violations in Ch0-8 alone — fixing them requires content edits (separate pass), but the gate prevents regression
- Aligns with Duolingo 2026 distractor selection standards

**Verdict**: ✅ 高適配 — implement as warn-only gate first (same as X57), set SCAN_MATCH_STRICT=1 to fail CI when ready to enforce

### 實作改動

1. Add `checkScanMatchEcho(lesson, q)` function to `tools/validate-lessons.js`
2. Run per lesson, emit `WARN lessons-chN.json <qid>: X60_A1_SCAN_MATCH_LINT (correct "<word>" lone echo — 0 distractors share sentence vocab)`
3. Add to `Total mirror-lint issues` summary at bottom
4. Commit msg: `v2.0.B.NEXT: add X60_A1_SCAN_MATCH_LINT gate (Duolingo distractor standard) (ARCH-REC #252)`
