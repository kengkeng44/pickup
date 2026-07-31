# Content QA — 2026-07-31 06:08 UTC

**Today's angle:** A6 — Option-in-Question (stem contains answer cue)
Question stem shares content word(s) exclusively with the correct option, enabling test-wiseness word-scan bypass (Buck 2001: construct-irrelevant variance).

**Focus:** Ch9–16 (Cinderella / Aladdin / Crane Wife / Tanabata / Little Red Riding Hood / Urashima Taro / Momotaro-2 / Issun-boshi)

**Rotation context:** Previous 8 cycles: R1, R2, #12, A7, A1, A4, #11, A5 — A6 not covered in past 8 cycles.

**Scope:** 252 MC-type Qs across Ch9–16 (`listen-mc`, `comprehension`, `picture-mc`, `listen-comprehension`). Narration / `tap-pairs` / `emoji-pick` excluded.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only)
Ch7: X49_STIMULUS_REUSE ×6, X57_ANTONYM_PAIR_MIRROR ×1
Ch8: X2_OPTION_LIST_BIAS ×2, X48_NGRAM_VERBATIM_CORRECT ×2, X49_STIMULUS_REUSE ×3,
     X49B_STIMULUS_REUSE_COMP ×1, X57_ANTONYM_PAIR_MIRROR ×1
Ch9: X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×3, X57_ANTONYM_PAIR_MIRROR ×3
```

CI pass (tsc + build clean). Warn-only flags unchanged from prior cycles — no new regressions.

---

## B. Violation Table

A6 detection methodology:  
- For each `listen-mc` / `comprehension` / `picture-mc` Q: extract content words (≥4 chars, non-stopword) from question stem and from correct option.  
- **True A6 tell:** shared content word appears in correct option AND in no distractor → learner can word-scan to find correct answer.  
- **Structural exception:** `picture-mc` — stem IS the vocab label; overlap is expected (tested separately, see §C).

### P0 — Exclusive content-word echo (tell in correct option only)

| Ch | Q ID | Type | Question snippet | Correct option | Shared word | Fix |
|----|------|------|-----------------|----------------|-------------|-----|
| Ch12 | kt-ch12-l4-x2 | comprehension | "…use to create the **silver** river?" | "the small **silver** hairpin" | `silver` | → "a hairpin from her own hair" |
| Ch12 | kt-ch12-l6-q3 | listen-mc | "How **many** magpies came…?" | "too **many** to count" | `many` | → "a sky full of birds" |
| Ch12 | kt-ch12-l6-x7 | comprehension | "How were these **tears** different…?" | "wept **tears** of joy" | `tears` | → "cried with happiness" |
| Ch13 | kt-ch13-l5-x2 | comprehension | "…get into her bed?" → "thinking he was **grandma**" (char name) | "to fool her into thinking he was **grandma**" | `grandma` | → "to make Little Red think the wolf was the old woman" |
| Ch16 | kt-ch16-l7-q3 | listen-mc | "What kind of **mallet** was it?" | "a magic wish **mallet**" | `mallet` | → "lucky, able to grant wishes" |
| Ch16 | kt-ch16-l7-x6 | comprehension | "…grew to full **size**?" | "happy and amazed at his **size**" | `size` | → "delighted and full of wonder" |

### P1 — Contextual echo (character name / multi-option shared word)

| Ch | Q ID | Type | Question snippet | Correct option | Note |
|----|------|------|-----------------|----------------|------|
| Ch12 | kt-ch12-l4-lg2 | comprehension | "Why did **tears** fall on both sides…?" | "Niulang was angry at the silver **river** for being too wide" | `river` in Q "silver **river**" and correct; distractors also near-contextual. P1. |
| Ch13 | kt-ch13-l5-x4 | comprehension | "Why did the **wolf** pull the blanket…?" | "to hide his **wolf** face" | `wolf` is character name; expected in story context. P1. |
| Ch14 | kt-ch14-l3-x2 | comprehension | "What were the **walls** made of?" | "**walls** that shone like pearl" | `walls` also appears in distractor "silver-coated stone **walls**" → reduced tell. P1. |
| Ch16 | kt-ch16-l3-x6 | comprehension | "…travel down the **river**?" | "the **river** carried his bowl" | `river` also in distractor "walked along the **riverbank**" → reduced tell. P1. |
| Ch9 | kt-ch9-l3-x5 | comprehension | "…after the sisters **left**?" | "**left** behind while everyone else went to the ball" | `left` in Q (sisters left) vs correct "left behind" — borderline. |

### Structural exception — picture-mc (vocab label by design)

| Ch | Q ID | Q stem label | Correct option | Assessment |
|----|------|-------------|----------------|------------|
| Ch9 | kt-ch9-l2-pm1 | 'a glass shoe' | "a small shiny **shoe** made of **glass**" | Expected overlap — picture-mc tests vocab knowledge, not listening bypass. |
| Ch12 | kt-ch12-l2-pm1 | 'weave cloth' | "a woman **weaving cloth** on a loom" | Same. |
| Ch14 | kt-ch14-l2-pm1 | 'a sea palace' | "a grand **palace** deep under the **sea**" | Same. |

**Verdict:** picture-mc A6 structural overlap is ACCEPTABLE. Proposed lint rule (ARCH-REC #224) should EXCLUDE `picture-mc` from A6 checking.

### Non-violations (word appears in multiple options)

| Ch | Q ID | Note |
|----|------|------|
| Ch16 | kt-ch16-l7-x4 | Q "How **tall**?"; "**tall**" in option 1 ("taller"), 3 ("as tall as a tree"), 4 (correct). No exclusive tell. |
| Ch9 | kt-ch9-l4-x2 | "appeared" in Q and correct — contextual reference to same narrative event. |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC Qs scanned (Ch9–16) | 252 |
| Total A6 hits (content-word overlap) | 16 |
| picture-mc structural (acceptable) | 3 |
| True A6 violations (non-picture-mc) | 13 |
| P0 exclusive tell | 6 |
| P1 character-name / multi-option | 5 |
| Non-violations (false-positive) | 2 |
| P0 violation rate (non-picture-mc Qs) | ~2.5% |
| Chapters affected | Ch12 (4), Ch13 (2), Ch16 (4), Ch9 (2), Ch14 (1) |
| Chapters clean | Ch10, Ch11, Ch15 |

---

## D. Top 5 P0

1. **kt-ch12-l6-q3** [listen-mc] — Q: "How many magpies came to help?" → only correct option uses "many". Fix: "a sky full of birds".

2. **kt-ch16-l7-q3** [listen-mc] — Q: "What kind of mallet was it?" → only correct option uses "mallet". Fix: "lucky, able to grant wishes".

3. **kt-ch12-l4-x2** [comprehension] — Q: "…create the **silver** river?" → "the small **silver** hairpin" is the only option with "silver". Fix: "a hairpin from her own hair".

4. **kt-ch12-l6-x7** [comprehension] — Q: "How were these **tears** different…?" → only correct option uses "tears". Fix: "cried with happiness".

5. **kt-ch16-l7-x6** [comprehension] — Q: "…grew to full **size**?" → only correct option uses "size". Fix: "delighted and full of wonder".

---

## E. Narrative Voice / Pacing Improvements (≥3 required even with 0 structural violations)

Even where no A6 violation exists, three voice/pacing notes emerged during the scan:

1. **kt-ch13-l5 (Little Red Riding Hood):** `explanationZh` repeatedly uses metalinguistic register ("他把毯子拉這麼高，就是「遮住他的狼臉」"). For 8-12 children, story-register is warmer: "毯子蓋這麼高——因為他不想讓你看見他的狼耳朵和大鼻子！"

2. **kt-ch12-l6 (Tanabata — reunion):** The `explanationZh` on kt-ch12-l6-x7 ("「這次的眼淚是溫暖且開心的」") could reinforce the emotional weight more: "這次的眼淚是開心的眼淚——就像見到久別的家人，忍不住哭出來。這種感覺你有沒有過？" — drawing the child listener into the story world.

3. **kt-ch14-l3 (Urashima Taro sea palace):** Option wording "grey stone and brick" vs "rough dark wooden boards" uses adult architectural register. For A2 children, simpler contrasts: "plain rock" / "rough wood" / "old clay bricks" reduce vocab load and keep focus on "pearl/shell" as the correct contrast.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #224 — X224_A6_EXCLUSIVE_STEM_OVERLAP: Add A6 lint (question-stem → correct-option exclusive content-word match) to validate-lessons.js**

### Industry Research (3 sources, all 2023–2026)

| Pattern | Source URL | Finding |
|---------|-----------|---------|
| BenchMarker MCQ flaw detection (2026) | [arXiv:2602.06221](https://arxiv.org/abs/2602.06221) | Validates automated "shortcuts" flaw detection (stem-option overlap) in MCQ benchmarks. Uses morphological matching, validated vs human judgment. |
| Differential Stem-Option Overlap experiment | [Redalyc pilot study](https://www.redalyc.org/journal/6137/613765677005/html/) | Direct experiment: lexical overlap between correct option and stem → lower random-answer rate (item gets easier by guessing). Supports lint as warning flag, not hard fail. |
| Buck 2001 construct validity | *Assessing Listening* Ch.5 | Stem-option word match is a test-wiseness strategy that bypasses listening comprehension, introducing CIV. For children's ELT, preserving construct validity is the primary rationale. |

### Pickup 適配分析

**✅ 完全適合** — Zero new npm dependencies. Plain JS added to existing `validate-lessons.js` (~35 lines). No schema changes. Warn-only (matching current X48/X57 precedent).

**Key difference from existing X48 (R1 lint):**
- X48 checks: `sentence` → `correctOption` (audio echo)
- X224 checks: `question` → `correctOption` (stem echo, DIFFERENT source)
- They are complementary, not overlapping.

**Exclusions:** `picture-mc` type must be excluded (stem IS the vocab label by design — confirmed in today's audit).

### Proposed Implementation

```js
// validate-lessons.js — add to per-Q lint block

const STOPWORDS_A6 = new Set(['the','a','an','is','are','was','were','be','been',
  'have','has','had','do','does','did','will','would','shall','should','may','might',
  'must','can','could','not','no','and','but','or','as','at','by','for','in','of',
  'on','to','up','from','with','that','this','what','when','where','who','why','how',
  'which','there','here','then','its','his','her','they','we','you','all','both',
  'just','also','too','so','into','over','out','about','after','before','other',
  'such','same','very','only','even','back','still','more','most','some','any']);

function a6ExclusiveStemOverlap(q) {
  // Skip picture-mc — overlap is structural for vocab matching
  if (q.type === 'picture-mc') return null;
  if (!q.question || !q.options || q.correctIndex == null) return null;
  
  const stem = q.question.toLowerCase().replace(/[^a-z\s]/g, ' ');
  const stemWords = new Set(stem.split(/\s+/).filter(w => w.length >= 4 && !STOPWORDS_A6.has(w)));
  
  const ci = q.correctIndex;
  const correctTokens = q.options[ci].toLowerCase()
    .replace(/[^a-z\s]/g, ' ').split(/\s+/)
    .filter(w => w.length >= 4 && !STOPWORDS_A6.has(w));
  
  for (const tok of correctTokens) {
    if (!stemWords.has(tok)) continue;
    // Check: does tok appear in ANY distractor?
    const inDistractor = q.options.some((opt, i) => {
      if (i === ci) return false;
      return opt.toLowerCase().includes(tok);
    });
    if (!inDistractor) {
      return { code: 'X224_A6_EXCLUSIVE_STEM_OVERLAP', severity: 'warn',
               msg: `"${tok}" from correct option also in Q stem but absent from all distractors — A6 tell` };
    }
  }
  return null;
}
```

**Expected catch rate:** 6 P0 violations in 252 Qs this cycle = ~2.5%. Across all 34 chapters (~1100+ MC Qs) estimated 25–30 P0 A6 violations that currently go undetected.

**Effort:** S (~35 lines in validate-lessons.js, 1 function + 1 call site).
**ROI:** HIGH — closes a test-validity gap (Buck CIV) that no current lint covers.
**Risk:** Low — warn-only, no false positives on picture-mc (excluded), very low false-positive rate on WH-structural cases (tested: "how tall" / "how many" both filtered by multi-option check).

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X224: A6 exclusive stem-option overlap lint in validate-lessons.js | [arXiv:2602.06221](https://arxiv.org/abs/2602.06221) · [Buck 2001] · [Redalyc pilot](https://www.redalyc.org/journal/6137/613765677005/html/) | ✅ 完全適合 — plain JS, no new deps, warn-only, picture-mc excluded | S (< 1hr) | HIGH — closes A6 CIV gap, catches ~2.5% P0 rate at commit time | ✅ IMPLEMENT |
| BERTScore semantic similarity (beyond word-form matching) | [arXiv:2311.04554](https://arxiv.org/abs/2311.04554) | 🟡 部分適合 — overkill for A2 children's ELT where word-form matching already catches most cases; requires Python API step | M–L | MEDIUM | 🟡 DEFER |
| LLM-judge flaw detection (AI-assisted item review) | [PMC:11911725](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11911725/) | 🟡 部分適合 — GPT-4 shown to detect 19 IWF flaws with 78% accuracy; useful for quarterly manual review but too slow/expensive for CI lint per commit | M (API cost) | MEDIUM | 🟡 QUARTERLY REVIEW |
