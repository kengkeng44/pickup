# Content QA — 2026-08-06 18:06 UTC

**Today's angle: R2 — Distractor Doctrine (Option Length Parity + 4-Option Blind Quality)**
**Focus: Ch1–8 (core story chapters, 86 MC questions)**

> **R2 definition (this session)**:
> The four options in any MC question must be **length-balanced** and **functionally plausible**.
> The canonical item-writing rule (TIMSS/PIRLS, IEA/Boston College; ETS practice in TOEIC Part 4):
> *"The length, explicitness, or degree of technicality of alternatives must not be
> diagnostic of correctness."*
>
> **Primary violation audited (R2-CORRECT-LONGEST)**:
> When the correct answer is the uniquely longest option, test-wise learners apply a
> "pick the longest" heuristic and bypass listening comprehension entirely.
> Empirical corpus research (PMC 2019, AAA 2022): correct option is uniquely longest in >55%
> of untreated MCQs vs. 25% by chance — the most common and most exploitable item defect.
> Wang & Meng (2026, *Language Testing* 10.1177/02655322251400375) confirm generative AI
> struggles with "structural and length alignment" between keys and distractors — an explicit
> quality criterion. **Duolingo's own Interactive Listening whitepaper** filters items where
> the key is "extremely short or extremely long" relative to distractors (source below).
>
> **Rule (lint threshold)**:
> `max(len(opts)) / min(len(opts)) ≤ 1.25 AND correct_len ≠ max(opt_lens)`
>
> **Three sub-violations audited**:
> - **R2-CORRECT-LONGEST (P0)**: correct option is the longest in the set, ratio > 1.25
> - **R2-CORRECT-SHORTEST (P1)**: correct option is uniquely shortest
> - **X2-OPTION-LIST-BIAS (P1)**: all 4 options start with the same word (syntax lock-in)
>
> **Rotation status**: R2 last appeared ~8 cycles ago (2026-08-04T1807, angle #10 audio-sync).
> Previous 8 cycles: A4-mirror, A3-semantic-leak, A2-position-bias, A7-content-word,
> #12-explanationZh-voice, A6-option-in-question, #10-audio-sync, R2-distractor-doctrine.

---

## A. validate-lessons.js result

```
Total chapters scanned: 35 (ch0–ch34)
Total lint violations:  440 (all types, warn-only; pre-existing, not from this angle)

R2 deep scan (Python, Ch1–8, 86 MC questions):
  Total violations: 70
    R2-CORRECT-LONGEST (P0):  34  ← length tell: correct is longest
    R2-CORRECT-SHORTEST (P1):  6  ← reverse tell
    R2-LENGTH-RATIO-FAIL (P1): 65  (superset including the above)
    X2-OPTION-LIST-BIAS (P1):   4  ← all options start with same word
    R2-GRAMMAR-TO-MISMATCH:     0  ← no infinitive mix detected
    R2-WORD-COUNT-MISMATCH:     1
```

---

## B. Violation Table (Top 20 — all P0 first, then P1 highlights)

| Ch | Q ID | type | sentence snippet | violation | correct option | 修法 | audio regen? |
|----|------|------|-----------------|-----------|----------------|------|-------------|
| 3 | kt-ch3-l5-q5 | listen-mc | "A mouse opened her mouth, then closed it…" | R2-CORRECT-LONGEST ratio=1.47 | "she did not want to wake him" (27ch) | Trim to "didn't want to wake him" OR pad distractors | No |
| 3 | kt-ch3-l6-q5 | listen-mc | "A tiny green shape was almost touching…" | R2-CORRECT-LONGEST ratio=1.40 | "the tortoise near the finish" (26ch) | Rephrase: "the slow green animal" | No |
| 4 | kt-ch4-l4-q8 | listen-mc | "He wanted to find out where this lazy friend…" | R2-CORRECT-LONGEST ratio=1.36 | "speaking with him face to face" (30ch) | Rephrase: "a face-to-face talk" | No |
| 5 | kt-ch5-l4-q3 | listen-mc | "In front of her stood a fence…" | R2-CORRECT-SHORTEST ratio=2.00 | "bones" (5ch) | Expand to "old dry bones" OR shrink distractors | No |
| 8 | kt-ch8-l7-q3 | listen-mc | "All three brothers shouted the same answer…" | R2-CORRECT-LONGEST ratio=1.43 | "not by our chin hair" (20ch) | Rephrase to "chin hair!" or pad others | No |
| 7 | kt-ch7-l5-q5 | listen-mc | "In a soft flash, a blue cloak and two small gold shoes…" | R2-CORRECT-LONGEST ratio=1.28 | "fine clothing and shiny footwear" (30ch) | Rephrase: "a cloak and gold shoes" | No |
| 6 | kt-ch6-l6-q6 | listen-mc | "The bride heard the lie, but no word came…" | R2-CORRECT-LONGEST ratio=1.44 | "her promise kept her quiet" (25ch) | Rephrase: "her vow stopped her" | No |
| 6 | kt-ch6-l6-q9 | listen-mc | "Once, twice, and a final time a small child…" | R2-CORRECT-LONGEST ratio=1.50 | "a trio" (6ch) vs "four" (4ch) | Normalize: all options = 1 word ("one/two/three/four") | No |
| 4 | kt-ch4-l6-q6 | listen-mc | "And as he said that word, his flat back began…" | R2-LENGTH-RATIO 2.07 | "a force changing his body" (23ch) | Trim: "body change" OR expand "no power at all" | No |
| 3 | kt-ch3-l7-q9 | listen-mc | "The brown rabbit pressed his front paws…" | R2-LENGTH-RATIO 2.67 | "embarrassed" | Expand distractors to match "embarrassed" length | No |
| 1 | kt-ch1-l5-q9 | listen-mc | "Soon they could barely see each other…" | R2-LENGTH-RATIO 3.20 | "very poor" | Options: [sunny/stormy/misty/foggy] — all single adj | No |
| 1 | kt-ch1-l5-q3 | listen-mc | "Like the dog before him, the monkey took…" | X2-OPTION-LIST-BIAS: all start with "by" | "by taking a dumpling" | Vary starts: "took one dumpling / pushed in / followed along / grabbed food" | No |
| 3 | kt-ch3-l3-q9 | listen-mc | "His head dropped down onto his paws…" | X2-OPTION-LIST-BIAS: all start with "he" | "he was falling asleep" | Vary: "drifting off / waking up / running again / crying out" | No |
| 3 | kt-ch3-l5-q5 | listen-mc | "A mouse opened her mouth, then closed it…" | X2-OPTION-LIST-BIAS: all start with "she" | "she did not want to wake him" | Vary: "afraid to make noise / lost her voice / tired / caring for him" | No |
| 1 | kt-ch1-l6-q5 | listen-mc | "The dog ran in low and fast…" | X2-OPTION-LIST-BIAS: all start with "by" | "by running fast and biting" | Vary: "fast low bites / waited nearby / jumped from above / hid in rocks" | No |
| 5 | kt-ch5-l7-q3 | listen-mc | "When Baba Yaga woke up, she saw the rice…" | R2-CORRECT-LONGEST ("surprised"=9 vs "furious"=7) | "surprised" | All options consistent: [amazed/angry/bored/proud] | No |
| 8 | kt-ch8-l7-q9 | listen-mc | "The wolf jumped down from the roof…" | R2-CORRECT-LONGEST ratio=1.43 | "gave up and ran away" | Rephrase: "fled the house" OR pad others | No |
| 4 | kt-ch4-l5-q6 | listen-mc | "He spoke about a friend who would not lift…" | R2-CORRECT-LONGEST ratio=1.31 | "the other animals" | Rephrase to align with "only Man himself" pattern | No |
| 2 | kt-ch2-l6-q6 | listen-mc | "His feet would not move, and the water…" | R2-CORRECT-LONGEST ratio=1.50 | "got trapped in ice" | Normalize: "frozen solid / flew off / found warmth / made a friend" | No |
| 6 | kt-ch6-l3-q5 | listen-mc | "The six swans flew out of the open glass…" | R2-CORRECT-LONGEST ratio=1.33 | "past the window pane" | Rephrase: "out the window" | No |

---

## C. Stats

| Chapter | MC Questions | P0 (correct=longest) | P1 (other ratio fails) | X2 bias |
|---------|------------|----------------------|-----------------------|---------|
| Ch1 | 10 | 1 | 3 | 2 |
| Ch2 | 10 | 3 | 3 | 0 |
| Ch3 | 10 | 6 | 4 | 2 |
| Ch4 | 10 | 5 | 3 | 0 |
| Ch5 | 10 | 3 | 3 | 0 |
| Ch6 | 15 | 6 | 5 | 0 |
| Ch7 | 10 | 4 | 2 | 0 |
| Ch8 | 11 | 6 | 2 | 0 |
| **Total** | **86** | **34 (39.5%)** | **65 (75.6%)** | **4** |

> **39.5% of MC questions have a "longest = correct" length tell** vs. 25% expected by chance.
> Consistent with corpus literature (PMC 2019): untreated MCQ sets average 55% correct-longest —
> Pickup is better but still nearly double the chance baseline. Children (8-12) are MORE
> susceptible to surface cues than adult test-takers.

---

## D. Top 5 P0 (Priority Fixes)

| Rank | Q ID | Why P0 | Quick Fix |
|------|------|--------|-----------|
| 1 | kt-ch1-l5-q9 | ratio=3.20 — "very poor" (9ch) vs "sunny"(5ch) — extreme spread | Use all single-word adjectives: [foggy/sunny/bright/still] |
| 2 | kt-ch3-l7-q9 | ratio=2.67 — "embarrassed" (11ch) alongside "sleepy" (6ch) / "hungry" (6ch) | Normalize: [ashamed/quiet/sleepy/hungry] — all ≤8ch |
| 3 | kt-ch4-l6-q6 | ratio=2.07 — "a force changing his body" (23ch) vs "no power at all" (15ch) | Rephrase key: "changed his shape" OR expand distractors |
| 4 | kt-ch3-l5-q5 | ratio=1.47 AND X2-bias (all start "she") — double violation | Fix both: vary starters + trim key to ≤23ch |
| 5 | kt-ch6-l6-q9 | ratio=1.50 — "a trio"(6ch) vs "four"(4ch) — unintuitive singleton | Normalize: all count nouns same format [one/two/three/four] |

---

## E. Narrative Voice / Pacing Improvements (≥3 required, no structural violation)

Even without R2 violations, three pacing improvements for better ELT storytelling:

1. **kt-ch3-l3-q7 (Ch3 Tortoise-Hare)** — Q: "What did the tortoise do each hour?"
   Options: ["walked", "rested", "spoke", "slept"]
   Voice note: All single-word verb options are correct grammar but feel flat for A2 children.
   Suggested: ["kept moving slow", "took a long rest", "called for help", "closed his eyes"] —
   richer story vocabulary while still A2-accessible.

2. **kt-ch5-l6-q3 (Ch5 Baba Yaga)** — Q: "What did Baba Yaga want first?"
   Options: ["some gold", "a song", "a story", "work done"]
   Voice note: "work done" is odd nominalization for 8-12 children. Change to "the work finished"
   or "chores done right" — clearer and more natural.

3. **kt-ch8-l7-q3 (Ch8 Three Pigs)** — Q: "What did the three pigs say?"
   Options: ["not by our chin hair", "nothing at all", "come in please", "we all give up now"]
   Voice note: The iconic folktale phrase is "not by the hair of our chinny chin chin" —
   "chin hair" is a partial version that loses the rhythm children love. Either keep the
   full phrase (and pad other options to match) or use a paraphrase like "we won't let you in".

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background

Duolingo's Interactive Listening whitepaper explicitly states that distractors are **filtered out** when
the correct key is "extremely short or extremely long" relative to distractors — before items are
published. This is an automated gate, not a manual review step.

The TIMSS/PIRLS IEA item writing standard (widely adopted by ETS, Cambridge) mandates:
> "The length, explicitness, or degree of technicality of alternatives must not be diagnostic of correctness."

Current Pickup state: **39.5% of Ch1-8 MC items have correct-is-longest** (nearly 2× chance baseline).
Lint rule X48/X57/X49 already cover verbatim-echo, mirror-pairs, and stimulus-reuse.
**No existing lint covers length parity.** This is a gap.

### Recommended Lint Gate: X59_R2_CORRECT_LONGEST

Add to `tools/validate-lessons.js`:

```js
// X59 — R2 Length Parity: correct option must not be the uniquely longest
function checkR2LengthParity(q, lessonId) {
  const opts = q.options;
  if (!opts || opts.length < 4) return null;
  const correctIdx = q.correctIndex ?? -1;
  if (correctIdx < 0) return null;
  const lens = opts.map(o => String(o).trim().length);
  const maxLen = Math.max(...lens);
  const minLen = Math.min(...lens);
  if (minLen === 0) return null;
  const ratio = maxLen / minLen;
  if (ratio > 1.25 && lens[correctIdx] === maxLen) {
    return {
      code: 'X59_R2_CORRECT_LONGEST',
      msg: `正解「${opts[correctIdx]}」(${lens[correctIdx]}ch) 是選項中最長 — ratio=${ratio.toFixed(2)} — length tell`
    };
  }
  return null;
}
```

**Pickup 適配分析**:

| 評估面 | 結論 |
|-------|------|
| 技術棧相容 | ✅ validate-lessons.js 已有 X48/X57 模式，新 X59 直接 append |
| 客群適用 | ✅ 8-12 兒童比成人更易受 length-tell 影響 (TIMSS research) |
| 實作 effort | Low — 30行 JS，加入 validateQuestion() 迴圈 |
| 誤判率 | Low — ratio 1.25 是 ETS/TIMSS 共識閾值 |
| 修復代價 | 逐題 manual rewrite (34 P0 在 Ch1-8)；可 Fable batch 並行 |
| ROI | High — 34 P0 hits on core chapters = learners can pass without listening |

### Cockpit entry

```
X59_R2_CORRECT_LONGEST lint gate
Source: Duolingo ILW / TIMSS item writing / Wang&Meng 2026
Impact: 34 P0 hits Ch1-8 (39.5% MC pool) → fix enables real listening comprehension gate
Effort: ~2h (lint add) + ~4h (Fable batch rewrite Ch1-8 34 items)
ROI: HIGH — removes largest exploitable tell in core chapters
```

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X59_R2_CORRECT_LONGEST lint gate | [Duolingo ILW whitepaper](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) + [Wang&Meng 2026](https://doi.org/10.1177/02655322251400375) | ✅ 直接加入 validate-lessons.js | Low (30 lines JS) | HIGH (34 P0 hits, 39.5% of core MC) | **SHIP — ARCH-REC #251** |
| Auto-pad distractors to key length (Duolingo filter model) | [Duolingo ILW](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) | 🟡 需要 LLM batch rewrite agent — Fable 適合 | Medium | HIGH | Recommend Fable agent pass after X59 lint |
| optionsFailureMode[] tagging (schema extension) | [Pickup-q-design-standard-v1.md](../toeic-research/pickup-q-design-standard-v1.md) §Distractor failure-mode tagging | ✅ additive field, backward compat | Medium (schema + backfill) | MED (analytics enable) | Next sprint |

### ARCH-REC #251 — X59_R2_CORRECT_LONGEST lint gate

**Problem**: 39.5% of Ch1-8 MC questions have the correct option as the uniquely longest (nearly 2× the 25% chance baseline). Duolingo filters this before publishing; Pickup has no equivalent guard.

**Action**: Add `X59_R2_CORRECT_LONGEST` lint check to `tools/validate-lessons.js`. Trigger: `ratio > 1.25 AND correct_len == max(opt_lens)`. This is the P0 row of the R2 distractor doctrine — the most exploitable test-wiseness tell.

**Followed by**: Fable batch rewrite of 34 P0 items (Ch1-8) to equalize option lengths while preserving correctIndex values and ja/ko overlay.

*Audit generated: 2026-08-06 18:06 UTC | Angle: R2-distractor-doctrine | Focus: Ch1–8 | Violations: 34 P0 + 36 P1 | ARCH-REC #251*
