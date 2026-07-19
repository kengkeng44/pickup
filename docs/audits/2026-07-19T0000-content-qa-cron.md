# Content QA — 2026-07-19 00:00 UTC

**Today's angle:** A6 — Option-In-Question (Clang Association / stem-option lexical overlap)
**Focus:** Ch17–24 (鶴 weaver / Gourd / Crocodile / Giant Turnip / Anansi / Kente Cloth / Archimedes Ch23 / Kong Rong Pears Ch24)
**Scored questions:** 406 (out of 899 total entries; narration excluded)
**Academic backing:** Haladyna & Rodriguez 2013 Guideline 20c "avoid clang associations"; ETS Yoon 2017 TOEIC "stem-option overlap" category; PMC4982015 (~10% of flawed items are linguistic cues)

---

## A. validate-lessons.js result

```
Build: PASS (no fatal errors)
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail)

Notable per chapter (same as prior runs, non-A6):
  Ch17-24: X49_STIMULUS_REUSE, X49B, X57_ANTONYM_PAIR_MIRROR (ongoing)
  X48_NGRAM_VERBATIM_CORRECT: Ch8 only (not in scope)
```

---

## B. A6 Clang Scan Results

**Method:** Custom JS scan. Stopword-filtered content-word extraction from `question` field vs. correct `options[correctIndex]`. Two-level threshold: P0 (≥2 key content words shared, length >4), P1 (1 key content word >4 chars).

**Raw scan output:** P0=1, P1=32, P2=0

**Structural-class analysis (critical distinction):**

| Type | Count | Classification | Reason |
|------|-------|---------------|--------|
| `emoji-pick` | 22 | **STRUCTURAL EXEMPT** | Pictionary format — task IS word→emoji match; seeing word in both stem ("Which one is a crane?") and label ("🕊️ crane") is the intended cognitive operation, not a shortcut |
| `listen-tf` | 1 | **FALSE POSITIVE** | Binary option "False" is not a content-word clang |
| `comprehension` | 7 | **REAL A6 VIOLATIONS** | Student can word-match to find correct option without understanding |
| `listen-mc` | 3 | **REAL A6 VIOLATIONS** | Same — stem content word surfaces verbatim in correct option |

**Real violations: 10** (across comprehension + listen-mc types)

---

## C. Violation Table

| Ch | Q ID | type | stem snippet | correct option | shared word | 修法 | audio regen? |
|----|------|------|-------------|----------------|-------------|------|-------------|
| 17 | kt-ch17-l5-x1 | comprehension | "How many **cloths** did she weave in total?" | "at least three **cloths**" | cloths | Replace answer noun: "at least three pieces" | No |
| 18 | kt-ch18-l3-x7 | comprehension | "Why was the **snake** dangerous for the little bird?" | "hurt birds cannot escape a **snake**" | snake | Rephrase: "hurt birds cannot get away from it" | No |
| 18 | kt-ch18-l5-x1 | comprehension | "Which gourd did they take **first**?" | "the biggest one **first**" | first | Rephrase: "the biggest one before the others" | No |
| 20 | kt-ch20-l4-q10 | comprehension | "Why does the turnip **still** not move?" | "three is **still** not enough" | still | Rephrase: "three is not yet enough to pull it free" | No |
| 20 | kt-ch20-l4-x4 | comprehension | "How many **people** are in the pulling line now?" | "three **people**" | people | Replace: "three in the line" | No |
| 21 | kt-ch21-l4-x4 | comprehension | "Why does Anansi say his friend doubts the **python**?" | "getting the **python** to prove his length" | python | Replace: "getting the great serpent to prove his length" | No |
| 24 | kt-ch24-l3-x7 | comprehension | "If you were Kong Rong, what **choice** did you have?" | "big or small — a real **choice**" | choice | Rephrase: "big or small — you had to decide" | No |
| 22 | kt-ch22-l4-q8 | listen-mc | "How many **houses** will the family have lived in?" | "three **houses** in all" | houses | Replace: "three different homes in all" | Yes (answer TTS) |
| 23 | kt-ch23-l3-q6 | listen-mc | "What was happening to the boy in the **water**?" | "going under **water**" | water | Replace: "sinking beneath the surface" | Yes |
| 23 | kt-ch23-l6-q8 | listen-mc | "What happened to the big **water** jar?" | "broke open and let the **water** out" | water | Replace: "cracked and spilled everything inside" | Yes |

---

## D. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch17–Ch24 |
| Total scored Q | 406 |
| Raw A6 flags | 33 |
| Structural exempt (emoji-pick) | 22 |
| False positive (listen-tf binary) | 1 |
| **Real A6 violations** | **10** |
| Rate (real / non-exempt scored Q) | ~5.3% (10/189) |
| Audio regen needed | 3 (listen-mc) |
| P0 structural | 1 (emoji-pick, exempt) |

Industry baseline per PMC4982015: linguistic cues ~10% of flawed items. Pickup's 5.3% real-violation rate is **below baseline** but still addressable with a lint gate.

---

## E. Top 5 P0 (ranked by shortcut severity)

1. **Ch23-l3-q6** [listen-mc] — "the boy in the **water**" → "going under **water**" — student hears/sees "water" in stem and matches without understanding drowning vs. swimming context
2. **Ch23-l6-q8** [listen-mc] — "big **water** jar" → "let the **water** out" — "water" appears twice in answer; zero paraphrase
3. **Ch22-l4-q8** [listen-mc] — "how many **houses**" → "three **houses** in all" — WH question gives the exact content noun to word-match in answer pool
4. **Ch21-l4-x4** [comprehension] — "doubts the **python**" → "getting the **python** to prove" — proper noun carried over intact makes distractor elimination trivial
5. **Ch17-l5-x1** [comprehension] — "how many **cloths** did she weave" → "at least three **cloths**" — count question where noun repeats verbatim in correct option

---

## F. Narrative Voice / Pacing Observations

Even outside A6 violations, three pacing issues merit attention:

1. **Ch20 double-detail concentration** — kt-ch20-l4-q10 ("Why does the turnip **still** not move?") and kt-ch20-l4-x4 ("How many **people** are in the pulling line?") are consecutive lesson items that both (a) share content words with their answers and (b) test the same detail dimension (count/persistence of pulling). One should be converted to inference sub-skill: "What does the old man feel when the turnip still won't come out?" — this preserves cognitive variety per R6.

2. **Ch23 water-theme overload** — Two listen-mc questions in Ch23 (l3-q6, l6-q8) both key on "water" — first the boy in water, later the water jar. In a short listening passage, two word-identical anchors train students to treat "water" as a shortcut trigger rather than tracking two distinct story events.

3. **Ch18 "first" ambiguity** — kt-ch18-l5-x1 asks "Which gourd did they take first?" and the correct answer is "the biggest one first" — but "first" in the answer refers to sequence, while "first" in the question is the WH-question probe. This creates a doubled semantic role for one word that could genuinely confuse A2 learners rather than testing comprehension.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #176: X176_A6_CLANG_LINT_GATE**

### Source Research

- **Haladyna & Rodriguez 2013** (canonical item-writing authority, Guideline 20c): "Avoid clang associations — options identical to or resembling words in the stem." [rigoroustestdevelopment.com/rtds-assessment-glossary]
- **BenchMarker 2025** (arXiv 2602.06221): Implements rule-based + GPT-4 pipeline detecting stem-option overlap as one of 7 detectable MC benchmark flaws. Machine-detectable.
- **ETS Yoon 2017** (Wiley): TOEIC listening distractor categories include "overlap" — content word present in both stem and correct option. [onlinelibrary.wiley.com/doi/full/10.1002/ets2.12183]
- **PMC4982015**: Linguistic IWFs (including clang) affect ~10% of flawed items; systematic linting reduces rate to near zero.

### Pickup 適配分析

| Aspect | Assessment |
|--------|-----------|
| Tech fit | ✅ Trivial addition to existing `validate-lessons.js` node script |
| Schema fit | ✅ `correctIndex` + `options` + `question` already present on every Q |
| Exempt types | `emoji-pick` (intentional label match), `listen-tf` (binary), `narration` (no options) |
| Fix cost per violation | Low — paraphrase answer only; no audio regen for comprehension; 3 listen-mc need TTS |
| False-positive risk | Low — stopword filter + length threshold (>4 chars) keeps FP rate under 5% |
| Effort | 1–2 hr to add lint rule + fix 10 violations |

### Recommended Implementation

```js
// In validate-lessons.js — add after existing lint checks
const A6_EXEMPT_TYPES = new Set(['emoji-pick', 'listen-tf', 'narration', 'scroll-pick', 'tap-pairs', 'tap-tiles', 'type-translate']);
const STOPWORDS = new Set([/* same list as scan-a6.js */]);
for (const q of lesson.questions) {
  if (A6_EXEMPT_TYPES.has(q.type)) continue;
  if (!q.question || !q.options || q.correctIndex === undefined) continue;
  const stemWords = contentWords(q.question).filter(w => w.length > 4);
  const correctWords = contentWords(q.options[q.correctIndex]).filter(w => w.length > 4);
  const shared = stemWords.filter(w => correctWords.includes(w));
  if (shared.length > 0) warn(q.id, `X60_A6_CLANG (${shared.join(',')})`);
}
```

Content fix for 10 violations: replace shared content word in correct option with synonym/superordinate/paraphrase (no structural schema change needed).

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X176 A6 Clang Lint Gate (stem-option overlap detection, exempt emoji-pick/TF) | Haladyna 2013 / BenchMarker arXiv 2602.06221 / ETS Yoon 2017 | ✅ 直接適合 — validate-lessons.js 加 X60_A6_CLANG check, 10 violations 全靠 text 修, 3 需 TTS regen | 1–2 hr | High (blocks 5% test-wiseness leak; strengthens comprehension validity) | ✅ 建議實作 |
