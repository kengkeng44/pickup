# Content QA — 2026-07-10 12:07 UTC

**Today's angle**: A4 — Mirror Patterns (negation/identity)
**Focus**: Ch17–24 (~520 MC questions scanned across 8 chapters)

**Angle definition:**
A4 = option pairs where one distractor is a structural "mirror" of the correct answer, effectively collapsing 4-choice into 2-choice.
Four sub-types audited:
- **A4a Negation mirror**: "He looked inside" / "He did not look inside" — identical modulo negation marker
- **A4b Identity swap**: "Anansi helped the python" / "The python helped Anansi" — same words, reversed agent/patient
- **A4c Antonym 1-word diff** (extends X57): correct and one distractor share the same syntactic template but swap a single antonym adjective/adverb — e.g., "very long like a road" / "very short like a pin"
- **A4d Compound antonym mirror**: two-adjective phrases where BOTH adjectives are flipped — e.g., "soft and gentle" / "fast and rough"

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 441 (warn-only)
Ch17–24 X57_ANTONYM_PAIR_MIRROR violations: 22 confirmed (excl. listen-tf True/False expected binary)
No hard-fail schema errors in Ch17–24
```

---

## B. Violation Table

### Sub-type summary

| Sub-type | Found | Note |
|----------|-------|------|
| A4a Negation mirror | **0** | ✅ No "he did X / he did not X" pairs |
| A4b Identity swap | **0** | ✅ No agent-patient reversal |
| A4c Antonym 1-word diff (X57 confirmed) | **22** | P1–P0 depending on structural closeness |
| A4d Compound antonym mirror (A4c severe subset) | **5** | P0 — effective 2-choice question |

### Confirmed violations (ranked P0 first)

| # | Ch | Q ID | Type | Correct option | Mirrored distractor | Antonym pair | Severity | 修法 | Audio regen? |
|---|----|----|------|---------------|---------------------|--------------|----------|------|-------------|
| 1 | 21 | kt-ch21-l4-q3 | listen-mc | "very long like a road" | "very short like a pin" | long/short | **P0** | Replace "very short like a pin" → "thick as a tree trunk" (plausible for python but targets width not length — partial parse trap) | No |
| 2 | 23 | kt-ch23-l6-x7 | comprehension | "quite heavy to lift" | "very light to carry" | heavy/light | **P0** | Replace "very light to carry" → "smooth and easy to roll" (schema-inference: round stones roll, plausible but wrong physics here) | No |
| 3 | 23 | kt-ch23-l6-x5 | emoji-pick | "cracked wide open" | "stayed shut tight" | open/shut | **P0** | Replace "stayed shut tight" → "floated away in the wind" (absurd but not antonym — kills binary feel) | No |
| 4 | 18 | kt-ch18-l3-q9 | listen-mc | "soft and gentle" | "fast and rough" | soft/fast + gentle/rough | **P0** | Replace "fast and rough" → "scared but careful" (partial-parse: "careful" true but reason wrong; "scared" schema-plausible for bird rescue) | No |
| 5 | 19 | kt-ch19-l7-q9 | listen-mc | "quiet and sorrowful" | "happy and loud" | quiet/loud + sad/happy | **P0** | Replace "happy and loud" → "deep and slow" (R1-safe: stimulus says "low voice / slow sad sound"; "deep and slow" is correct on one axis but not both — partial parse) | No |
| 6 | 17 | kt-ch17-l3-x3 | comprehension | "never look inside the room" | "always open the door" | never/always | P1 | Replace "always open the door" → "check on her work each day" (schema-plausible: curious husband might want to check; but no promise to do this) | No |
| 7 | 18 | kt-ch18-l5-x8 | comprehension | "poor and hungry to rich and happy" | "happy to sad and alone" | happy/sad | P1 | Replace "happy to sad and alone" → "warm but still small" (plausible for partial gourd magic) | No |
| 8 | 18 | kt-ch18-l6-x5 | comprehension | "Nolbu hurt the bird; Heungbu helped one" | "both brothers hurt a small bird" | hurt/helped | P1 | Replace "both brothers hurt" → "Nolbu waited for Heungbu to act first" | No |
| 9 | 18 | kt-ch18-l7-q7 | emoji-pick | "😭 poor and crying" | "👑 still rich and proud" | poor/rich | P1 | Replace "still rich and proud" → "👀 confused and unsure" | No |
| 10 | 19 | kt-ch19-l7-q5 | listen-mc | "thinking helps small ones win" | "a big body always wins" | small/big | P1 | Replace "a big body always wins" → "the cleverest river creature wins" (schema-inference: mouse deer is clever, but "river creature" is wrong framing) | No |
| 11 | 19 | kt-ch19-l7-x7 | comprehension | "always check before trusting a story" | "never go up to the surface again" | always/never | P1 | Replace "never go up to the surface again" → "stay underwater to stay safe" | No |
| 12 | 19 | kt-ch19-l3-q9 | listen-mc | (soft) | (loud distractor) | soft/loud | P1 | Apply schema-inference replacement | No |
| 13 | 20 | kt-ch20-l3-x5 | emoji-pick | "😮 surprised and sad" | "🎉 happy and done" | sad/happy | P1 | Replace "🎉 happy and done" → "😤 frustrated but trying again" | No |
| 14 | 20 | kt-ch20-l6-x1 | comprehension | "slow and relaxed" | "fast and barking" | slow/fast | P1 | Replace "fast and barking" → "quiet and watching from far" | No |
| 15 | 20 | kt-ch20-l7-x5 | emoji-pick | "🎊 happy and joyful" | "😢 sad and sorry" | happy/sad | P1 | Replace "😢 sad and sorry" → "😤 tired but relieved" | No |
| 16 | 20 | kt-ch20-l7-x8 | comprehension | "small helpers matter just as much" | "big animals do all the real work" | small/big | P1 | Replace "big animals do all the real work" → "the first person to pull deserves all credit" | No |
| 17 | 21 | kt-ch21-l6-q10 | emoji-pick | "🌟 proud and happy" | "😢 feeling a little sad" | happy/sad | P1 | Replace "😢 feeling a little sad" → "🤔 nervous and unsure" | No |
| 18 | 22 | kt-ch22-l3-x1 | comprehension | (tiny/correct) | (huge distractor) | tiny/huge | P1 | Apply schema-inference replacement | No |
| 19 | 23 | kt-ch23-l6-q3 | listen-mc | "a large rock on the ground" | "just a small flower" | large/small | P1 | Replace "just a small flower" → "a broken clay jar nearby" (schema-inference: jar appears later, plausible but wrong scene beat) | No |
| 20 | 23 | kt-ch23-l6-x2 | comprehension | "a large heavy stone" | "one small water bucket" | large/small | P1 | Replace "one small water bucket" → "a pile of wet river sand" | No |
| 21 | 24 | kt-ch24-l3-x7 | comprehension | "big or small — a real choice" | "only big pears to take" | small/big | P1 | Replace "only big pears to take" → "the smallest pears for everyone" | No |
| 22 | 24 | kt-ch24-l6-x9 | comprehension | "fast thinking then spoke" | "slow to understand it" | fast/slow | P1 | Replace "slow to understand it" → "confused by the question at first" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch17–24 (8 chapters) |
| Total MC questions scanned | ~520 |
| A4a negation mirror | 0 |
| A4b identity swap | 0 |
| A4c antonym-pair X57 violations | 22 |
| P0 severity | 5 |
| P1 severity | 17 |
| Worst single lesson | kt-ch23-l6 (4 X57 violations) |
| Worst chapter | Ch19 (4 violations) + Ch20 (4) + Ch23 (4) tied |
| Audio regen needed | 0 |

**Key positive finding**: Zero A4a (negation mirror) and zero A4b (identity swap) — these are the hardest sub-types to defend against and the content team has avoided them entirely.

**Core issue**: 22 A4c cases, 5 of which are "compound antonym" (A4d) where BOTH adjectives in a 2-word phrase flip simultaneously. These 5 degrade the question to effective binary choice and are the highest priority rewrite.

---

## D. Top 5 P0

1. **⚠️ ch21 kt-ch21-l4-q3** — "very long like a road" / "very short like a pin" — perfect structural template mirror, only `long`/`short` swapped. Any A2 learner who doesn't know the answer can eliminate this by picking the non-antonym option.

2. **⚠️ ch23 kt-ch23-l6-x7** — "quite heavy to lift" / "very light to carry" — dimension of interest is exactly `heavy/light`. The question becomes: was the stone heavy or light? That's true/false, not 4-choice.

3. **⚠️ ch23 kt-ch23-l6-x5** — "cracked wide open" / "stayed shut tight" — `open/shut` is the exact event being tested. Antonym collapses to binary.

4. **⚠️ ch18 kt-ch18-l3-q9** — "soft and gentle" / "fast and rough" — compound antonym (both adjectives inverted). Even without understanding the content word "gentle", a learner can reason: "one must be positive, one must be negative; Heungbu is good, pick positive."

5. **⚠️ ch19 kt-ch19-l7-q9** — "quiet and sorrowful" / "happy and loud" — compound antonym. Learner strategy: "I heard a sad voice so pick the negative-adjective pair." No language comprehension required.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research basis

| Source | Key finding |
|--------|-------------|
| Wang & Meng 2026, *Language Testing* ([DOI:10.1177/02655322251400375](https://doi.org/10.1177/02655322251400375)) | GenAI + human expert iteration best replaces "opposite-meaning distractors" with "schema-inference distractors" — plausible but unsupported by specific stimulus |
| Distractor efficiency meta-analysis 2024, *BMC Medical Education* ([PMC11040895](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11040895/)) | Distractors ≤5% selection rate = nonfunctional (= non-contributing to item discrimination). Antonym pairs either too obvious (0% selection → inflate apparent difficulty) or too dominant (50% selection → binary) |
| Ludewig et al. 2023, *Assessment* ([Sage](https://journals.sagepub.com/doi/10.1177/07342829231167892)) | Semantic relatedness between distractors and correct option increases difficulty AND discrimination — but antonym relatedness specifically creates "forced binary" perception rather than 4-way discrimination |

### Pattern name: ARCH-REC #138 — X75_COMPOUND_ANTONYM_MIRROR

**What**: Flag questions where the correct option and exactly one distractor both follow the pattern `[ADV] [ADJ1] [and/like] [ADV] [ADJ2]` (or similar 2-adjective phrase) AND `{ADJ1_correct, ADJ1_wrong}` ∈ antonym_pairs AND `{ADJ2_correct, ADJ2_wrong}` ∈ antonym_pairs. This catches the A4d sub-type that X57 currently misses (X57 only checks single-word antonym pairs; A4d requires both words to be antonymous simultaneously).

**Pickup 適配**:
- ✅ Applies directly — React + JSON schema: add `optionsCompoundAntonymMirror` lint rule to `validate-lessons.js`
- ✅ Fable agent can batch-rewrite P0 distractors following the schema-inference pattern (plausible-but-wrong)
- ✅ Effort: Low (lint addition ~30 lines; Fable rewrite batch ~2hr for 5 P0 items)
- ✅ ROI: High — P0 items actively teach wrong strategy (pick the non-antonym), undermining SRS effectiveness

**Verdict: ✅ 適合 Pickup — 建議 implement**

### Implementation steps (when user approves)

```
1. validate-lessons.js: add X75_COMPOUND_ANTONYM_MIRROR rule
   - For each Q with ≥2 adjective in options:
     - if correct and any distractor both match /\b(very|quite)\s+\w+\s+(and|like)\s+\w+/
     - and BOTH adjective words are in antonym_pairs → warn X75

2. Fable batch rewrite (5 P0 items only):
   - Input: qid + sentence + correct option
   - Instruction: "Generate 1 schema-inference distractor for this A2 listening Q:
     plausible given the story context, unsupported by this specific sentence,
     NOT a structural antonym of the correct option. GSL-2000 vocab."
   - Validate: R1 (no verbatim), R2 (length parity), no X57, no X75

3. Commit + push + validate
```

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-------------|--------|-----|---------|
| X75_COMPOUND_ANTONYM_MIRROR lint + Fable rewrite P0 | Wang & Meng 2026 ([DOI](https://doi.org/10.1177/02655322251400375)); PMC 2024 ([link](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11040895/)) | ✅ validate-lessons.js additive lint; Fable batch for 5 P0 items | Low (lint 30 lines + 2hr Fable batch) | High (fixes learner strategy bypass; improves SRS discrimination) | ✅ Recommend |

---

## E. Narrative Voice / Pacing Improvement (even with 0 R1-R8 violation)

Three observations from reading Ch17-24 questions this cycle:

1. **Ch23 Lesson 6 has 4 violations stacked** (qt-ch23-l6-q3, x2, x5, x7) — this lesson appears to have been batch-generated with `[large/small, open/shut, heavy/light]` as default distractor vocabulary. Recommend a full lesson-level rewrite pass (7 non-narration questions → Fable batch) to replace the distractor family.

2. **Ch17 Crane-gratitude story uses "always/never" in options twice** (l3-x3, l4-q7) even though the story's moral is about *keeping a promise* — a rich domain that offers many schema-inference distractors ("break the promise", "ask the crane directly", "tell the village") that would better serve the story.

3. **Ch21 Anansi lesson (l4-q3)** has the most severe structural mirror in the dataset. The python's defining characteristic in this chapter is its extraordinary LENGTH — "went on and on, like a green road". Making `short` the foil antonym gives away the answer by simple contrast strategy. A content word distractor like "thick as a strong vine" tests the same lesson (python size) without the antonym tell.
