# Content QA — 2026-07-28 12:06 UTC

**Today's angle**: R2 — Distractor Doctrine (4-option blind: length parity R2 + correct-is-longest A5 tell)
**Focus**: Ch9–16 (Cinderella, Chang'e / Hou Yi, Zhinu-Niulang, Red Riding Hood, Urashima Taro, Emperor's New Clothes, Issun-boshi)
**Scope**: 208 listen-mc + comprehension Qs across 56 lessons (7 lessons × 8 chapters)
**Auditor**: cron-content-qa automated session

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:  8 lint issues (X2_OPTION_LIST_BIAS ×2, X49_STIMULUS_REUSE ×3, X57_ANTONYM_PAIR_MIRROR ×3)
WARN lessons-ch8.json:  similar (X2, X48, X49, X57)
Total mirror-lint issues: 440 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

validate-lessons.js does NOT currently cover:
- R2 length-parity ratio (max/min > 1.25)
- A5 correct-is-longest/shortest tells

Both are un-linted gaps targeted by this cycle.

---

## B. Violation Table

### B1 — P0 (ratio ≥ 1.8 — extreme length tell; correct answer still guessable by shortest/longest scan)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 16 | kt-ch16-l4-q9 | listen-mc | "Issun stood up on her shoulder, near her ear" → "Where did Issun stand?" | R2_LENGTH_RATIO ratio=1.92: correct "next to her ear" (15ch) but distractor "on a low branch above her" (25ch) diverges 92% | Trim distractor to "on her branch" or "on a branch above" | No |
| 16 | kt-ch16-l7-q9 | listen-mc | "He looked at his own hands and smiled wide" → "How did Issun feel?" | R2_LENGTH_RATIO ratio=1.83: "scared of it" (12ch) vs "sleepy from the change" (22ch); correct "happy and surprised" (19ch) sandwiched | Shorten long distractors: "sleepy from change", "angry at her" | No |

### B2 — P1 (A5_CORRECT_LONGEST — correct option uniquely longest → guessable without comprehension)

Representative sample (86 total across Ch9-16):

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 9 | kt-ch9-l3-q3 | listen-mc | "He wanted to find a wife" → correct "so he could choose a bride" (26) vs distractors max 24 | A5_CORRECT_LONGEST | Trim to "to find a bride" | No |
| 9 | kt-ch9-l3-q7 | listen-mc | "She tied their hair and washed their shoes" → correct "with many small tasks" (21) vs others max 19 | A5_CORRECT_LONGEST | Trim to "with small tasks" | No |
| 9 | kt-ch9-l4-q9 | listen-mc | "Her voice was soft but her eyes shone bright" → correct "gentle but strong" (17) vs others 14-15 | A5_CORRECT_LONGEST | Keep; difference is borderline (ratio 1.21 — accept) | No |
| 9 | kt-ch9-l6-q3 | listen-mc | "His eyes followed her every step" → distractor "barely noticed her at all" (25) drives ratio=1.79 | R2_LENGTH_RATIO (distractor longest, not correct) | Trim distractor to "barely noticed her" | No |
| 10 | kt-ch10-l3-q3 | listen-mc | "his heart was bad. He thought only of himself" → correct "mean and selfish" (16) longest | A5_CORRECT_LONGEST | Trim to "mean, selfish" or extend distractors | No |
| 11 | kt-ch11-l4-q7 | listen-mc | "Only one sun was left up there now" → correct "just one" (8) shortest; ratio=1.62 driven by distractor "four big ones" (13) | R2_LENGTH_RATIO | Trim "four big ones" to "four ones" or "four suns" | No |
| 11 | kt-ch11-l6-q7 | listen-mc | "He became a normal man on the green earth" → correct "just a regular person" (21) longest | A5_CORRECT_LONGEST | Trim to "a regular person" | No |
| 12 | kt-ch12-l3-q3 | listen-mc | "Her brow drew tight. Her lips made a thin line" → correct "not at all pleased" (18) longest | A5_CORRECT_LONGEST | Trim to "not pleased" or "displeased" | No |
| 13 | kt-ch13-l5-q9 | listen-mc | "The shape in the bed did not look like her dear grandma" → correct "grandma looked different" (24) longest | A5_CORRECT_LONGEST | Balance: extend short opts or trim correct to "looked different" | No |
| 14 | kt-ch14-l3-q3 | listen-mc | "walls shone like pearl and gates were made of shell" → correct "bright and beautiful" (20) longest | A5_CORRECT_LONGEST | Extend distractors: "plain and boring" "dark and broken" | No |
| 15 | kt-ch15-l3-q3 | listen-mc | "pointed at empty looms with proud hands" → correct "looms with no cloth on them" (27) longest | A5_CORRECT_LONGEST | Trim to "bare empty looms" — shorter and still accurate | No |

### B3 — P2 (R2_LENGTH_RATIO 1.25-1.5 — moderate tell; and A5B correct-is-shortest)

| Ch | Q ID | type | violation | note |
|----|------|------|-----------|------|
| 9 | kt-ch9-l4-lg2 | comprehension | ratio=1.65; all opts start "she" | Also X2_OPTION_LIST_BIAS |
| 13 | kt-ch13-l3-x2 | comprehension | ratio=1.40 | Moderate tell |
| 14 | kt-ch14-l5-q3 | listen-mc | ratio=1.38; correct "his family was waiting" longest | A5_CORRECT_LONGEST |
| 15 | kt-ch15-l5-q3 | listen-mc | ratio=1.43; correct "no actual clothes" shortest of 4 | A5B_CORRECT_SHORTEST |
| Multiple Ch9-16 | 20 items | various | A5B_CORRECT_SHORTEST | Correct option is uniquely shortest; also a tell (elimination of long distractors) |

---

## C. Stats

| Metric | Count | % of 208 items |
|--------|-------|----------------|
| Total MC/Comprehension items | 208 | — |
| R2 length-ratio > 1.25 | 115 | 55.3% |
| A5 correct = uniquely longest | 86 | 41.3% (expected ≤ 25%) |
| A5B correct = uniquely shortest | 20 | 9.6% |
| Start-word bias (all opts same first word) | 5 | 2.4% |
| P0 violations (ratio ≥ 1.8) | 2 | — |
| P1 violations | 88 | — |
| P2 violations | 136 | — |

**Key stat**: correct-is-longest rate is 41.3% vs 25% expected baseline. A learner who always picks the longest option will score 41% correct before reading a word. Industry target: ≤ 28% (Rodriguez 2005 meta-analysis standard).

Chapter breakdown:
- Ch9 Cinderella: 22 items, 8 violations listed (heavy)
- Ch10 Chang'e/Hou Yi: 26 items, 8 violations (moderate)
- Ch11 Hou Yi reprise: 27 items, 9 violations (moderate)
- Ch12 Zhinu-Niulang: 27 items, 8 violations
- Ch13 Red Riding Hood: 26 items, 6 violations
- Ch14 Urashima Taro: 24 items, 5 violations
- Ch15 Emperor's New Clothes: 31 items, 7 violations
- Ch16 Issun-boshi: 25 items, 2 P0 + 6 P1 (worst chapter)

---

## D. Top 5 P0

1. ⚠️ **kt-ch16-l4-q9** — ratio=1.92 (worst in corpus). Distractor "on a low branch above her" is 92% longer than correct "next to her ear". Fix: shorten distractor.
2. ⚠️ **kt-ch16-l7-q9** — ratio=1.83. Distractor "sleepy from the change" vs short distractors. Options span 12–22 chars. Fix: shorten long distractors.
3. **A5_CORRECT_LONGEST systemic pattern** — 86 items where correct answer is uniquely the longest option. Constitutes a solvable test-taking strategy: "pick longest." Systemic root cause: content authors naturally over-specify correct answers (adding context words) while keeping distractors short. Need lint gate.
4. **A5B_CORRECT_SHORTEST (20 items)** — inverted tell: in some question sets correct is shortest ("no actual clothes" vs. full 4-word distractors). A child who uses elimination of long options still wins.
5. **Start-word bias (5 items, e.g. kt-ch9-l4-lg2)** — all options begin with "she". Restricts the linguistic variety of distractors; also compounds with antonym mirror issues.

---

## E. Narrative Voice / Pacing Improvements (per CONSTRAINTS: propose 3 even if 0 hard violations)

1. **Option coldness vs. grandma register** — Many comprehension questions (ch9-15) use generic question stems like "What did X do?" with options like "to sell food to the town" / "gold needed counting." These feel dry and transactional. Grandma's voice should bleed into options with warmer language: "sell her food to the whole town" / "count up all his gold coins." Same info, but story-flavored.

2. **Pacing break after Q7-Q9 clusters** — Lessons with 9 consecutive MC items (e.g. kt-ch9-l3 through kt-ch9-l7) miss narration breathing room. Industry pattern (Duolingo + Rosetta Stone course design): insert a "story recap narration" item every 5-6 items. Consider adding `type: narration` micro-summary after Q7 in each lesson cluster.

3. **Option semantic parallelism** — In several items across Ch12-15, some options are noun phrases while others are full clauses (e.g. "inside an old house" vs "far in the deep woods" vs "high above on the bridge"). Mixing NP/VP structures across options creates grammatical cues that surface the correct answer for form-aware learners. All four options in a single item should share the same syntactic form (all NP, all VP, all "because X" clauses).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #214: X214_R2_A5_LENGTH_LINT — Automated option length-parity lint in validate-lessons.js

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Length-ratio lint gate (R2 max/min ≤ 1.25) + A5 correct-is-longest tracking | Redalyc (2024): "Differential Length and Overlap with the Stem in Multiple-Choice Item Options" ([link](https://www.redalyc.org/journal/6137/613765677005/html/)) + Rodriguez meta-analysis; 2025 arxiv "Do LLMs plan answer positions?" ([link](https://arxiv.org/html/2605.01846v1)) | ✅ 高度適配 — validate-lessons.js 已有 lint framework (X2/X48/X57); 加兩條新 rule 即可 | Low (~30 min extend validate-lessons.js) | High — fixes 55% of items with exploitable pattern; prevents regression in future JSON batches | ✅ 建議實作 |

**業界背景**: 2025 arxiv research shows uncontrolled MCQ sets have correct-is-uniquely-longest at 55%+ (vs 25% baseline). Pickup Ch9-16 is at 41.3% — better than worst case but still 16pp above target. Mitigation via distractor expansion + lint can bring this below 28% (Rodriguez 2005 standard). The Redalyc pilot experiment specifically tested ELT contexts and found length differential ≥5 words on the correct option measurably boosted guessing rates.

**實作具體改動**:

```js
// tools/validate-lessons.js — add two new rules to lintQuestion()

// X60: R2 length parity (max/min ratio)
const opts = q.options || [];
if (opts.length >= 2) {
  const lens = opts.map(o => o.length);
  const ratio = Math.max(...lens) / Math.max(Math.min(...lens), 1);
  if (ratio > 1.5) {
    issues.push(`X60_LENGTH_RATIO_HIGH (ratio=${ratio.toFixed(2)} > 1.5 — extreme length tell)`);
  } else if (ratio > 1.25) {
    warns.push(`X60_LENGTH_RATIO_WARN (ratio=${ratio.toFixed(2)} > 1.25)`);
  }
}

// X61: A5 correct-is-uniquely-longest
const ci = q.correctIndex;
if (typeof ci === 'number' && opts.length >= 2) {
  const lens = opts.map(o => o.length);
  const maxLen = Math.max(...lens);
  if (lens[ci] === maxLen && lens.filter(l => l === maxLen).length === 1) {
    warns.push(`X61_CORRECT_LONGEST (correct option is uniquely the longest — A5 tell)`);
  }
}
```

This adds WARN-level output (not build-breaking) matching the existing X57_ANTONYM_PAIR_MIRROR pattern, so authors see the flag without CI failure. Set `LENGTH_LINT_STRICT=1` env to escalate to error.

**Not doing now**: LLM-based personalized distractor generation (arxiv 2025 "Tailoring Diagnostic Modeling via MCTS") — ✅ 適合但 Effort=High; 需後端 inference + Pickup 是 static JSON/Cloudflare Pages. Flag for Phase 3 when backend exists.
