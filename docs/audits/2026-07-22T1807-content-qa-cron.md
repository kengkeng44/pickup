# Content QA — 2026-07-22 18:07 UTC

**Today's angle:** A2 — cloze blank 位置 (start/mid/end) → mapped to listen-mc key-concept position + WH-word distribution
**Focus:** Ch9–16 (88 listen-mc questions, 40 listen-tf questions)

> Angle rationale: "A2 cloze blank 位置" in Pickup's v2.0 maps to *where in the stimulus sentence the key tested concept appears* (start / mid / end of sentence) and *what WH-word is used in the question stem*. Both determine processing demand and learner prediction strategies.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
Notable per-file: Ch7 ×7 X49/X49B_STIMULUS_REUSE + ×1 X57
                  Ch8 ×9 X2/X48/X49/X49B/X57
                  Ch9 ×8 X2/X49/X57
Build status: PASS (warn-only)
```

---

## B. Violation Table

### B1. Key-concept position within sentence (listen-mc)

**Position distribution — 88 questions across Ch9–16:**

| Position | Count | % | Assessment |
|----------|-------|---|------------|
| paraphrase (full, no verbatim key) | 66 | 75.0% | ✅ Excellent — strong R1 compliance |
| mid (33–67% into sentence) | 11 | 12.5% | ✅ Good |
| start (first 33%) | 7 | 8.0% | ⚠️ Monitor |
| end (last 33%) | 4 | 4.5% | 🔵 Under-represented |

**75% full paraphrase rate is a signal of strong R1 health.** No "recency lock" (all end) or "primacy lock" (all start) lessons detected at P0.

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 10 | kt-ch10-l4 (LESSON) | listen-mc | both Qs test mid position | P1 A2_MONO_POSITION — 2 of 2 MC test mid; zero position diversity | Add 1 start or end/paraphrase variant | No |
| 15 | kt-ch15-l3 (LESSON) | listen-mc | both effective Qs test mid | P1 A2_MONO_POSITION — 2 of 2 effective MC test mid | Swap 1 Q to test sentence-initial or sentence-final concept | No |

### B2. WH-word distribution (listen-mc question stems, Ch9–16)

**Design standard R7:** `What > When ≈ Where > Who ≈ How > Why > Which`

**Actual distribution:**

| WH-word | Count | % | R7 target | Gap |
|---------|-------|---|-----------|-----|
| What | 37 | 42% | highest | Over (target ~30%) |
| How | 35 | 40% | ≈ Who | Over (target ~15%) |
| Why | 12 | 14% | below When | OK |
| Where | 3 | 3% | ≈ When | Under |
| Who | 1 | 1% | ≈ Where | Under |
| **When** | **0** | **0%** | **≈ Where** | ⚠️ **COMPLETELY ABSENT** |
| Which | 0 | 0% | lowest | Under |

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 9–16 | CHAPTER-LEVEL | listen-mc | When=0%, Which=0% across 88 Qs | **P1 A2_WH_TEMPORAL_ABSENT** — zero temporal "When" questions in 8 chapters; children get no training listening for time markers | Add 1 "When" Q per chapter using story time markers (e.g. "at midnight", "before dawn", "that evening") | Yes (new sentence needed) |
| 9, 13, 15 | ch9-l6, ch9-l7, ch15-l6, ch15-l6 | listen-mc | all Qs use same WH-word | **P2 A2_WH_WORD_LOCK** — lessons where ALL listen-mc use same WH (ch9-l6: how/how, ch9-l7: how/how, ch15-l6: how/how/how) | Replace 1 Q with different WH | No |

### B3. Over-length question stems (R7: ≤8 words)

| Ch | Q ID | stem | word count | 修法 |
|----|------|------|-----------|------|
| 10 | kt-ch10-l4-q7 | "Why could Chang'e not just give him the pill?" | 9 | → "Why couldn't Chang'e give him the pill?" (7w) |
| 10 | kt-ch10-l6-q9 | "How did Hou Yi feel when he saw her?" | 9 | → "How did Hou Yi feel then?" (6w) |
| 10 | kt-ch10-l7-q7 | "Why did Hou Yi put food in the yard?" | 9 | → "Why did Hou Yi leave food out?" (7w) |
| 12 | kt-ch12-l3-q3 | "How did the Queen feel about Zhinu staying below?" | 9 | → "How did the Queen feel about Zhinu?" (7w) |
| 15 | kt-ch15-l7-q6 | "What was one choice the emperor could have made?" | 9 | → "What could the emperor have done?" (6w) |

All are at 9 words (limit 8) — trim articles/relative clauses.

---

## C. Stats

| Metric | Value | Pass/Warn |
|--------|-------|-----------|
| listen-mc count (Ch9–16) | 88 | — |
| Paraphrase rate (no verbatim key in sentence) | 75.0% | ✅ Excellent |
| Over-length stems (>8 words) | 5/88 (5.7%) | ⚠️ Warn |
| Temporal "When" questions | 0/88 (0%) | ⚠️ P1 |
| Lessons with WH-word mono-lock | 5 lessons | ⚠️ P2 |
| Lessons with position mono-lock (P1) | 2 lessons | P1 |
| P0 violations | 0 | ✅ |

---

## D. Top 5 P0/P1

1. **⚠️ P1 — WH-TEMPORAL ABSENT (Ch9–16 chapter-level)**: Zero "When" questions in 88 listen-mc across 8 chapters. Children learn nothing about listening for time markers — "at midnight", "before dawn", "that morning". All Cinderella / Cowherd / LRRH / Emperor stories have rich temporal structure that goes entirely untested.

2. **⚠️ P1 — WH-WORD LOCK Ch15-l6 (how/how/how)**: All 3 listen-mc in lesson use "How" — learner can predict question type before audio starts.

3. **P1 — A2_MONO_POSITION kt-ch10-l4**: Both listen-mc test mid-sentence concept. Adding one start or fully-paraphrased question would increase cognitive variety.

4. **P1 — A2_MONO_POSITION kt-ch15-l3**: Same — both effective MC test mid.

5. **P2 — WH-WORD LOCK Ch9-l6, Ch9-l7 (how/how each)**: Two consecutive lessons in Ch9 each use How+How — the chapter produces 4 "How" questions in a row, dulling learner alertness.

---

## E. Narrative Voice / Pacing — 3 Improvement Proposals

*(Required regardless of violation count)*

### NV-1: Ch15 narration lacks grandma's ironic warmth at the parade scene

Current narration:
> "A small child stood at the front of the street."
> "He did not understand why people were clapping so loud."

The narration voice is factual but misses the grandma register of bemused tenderness. In the design framework, grandma narrates with gentle irony ("Mochi, you know what grown-ups are like…"). Suggested revision:
> "One small child stood at the very front, Mochi."
> "He had no idea why everyone was clapping."

The direct address `Mochi` and the informal `no idea` restore the Arabian-Nights frame and grandmother warmth.

### NV-2: Ch11 lesson-6 transition from expulsion to earth life feels abrupt

After "He became a normal man on the green earth" + "His wife Chang'e became a normal woman too", the next narration immediately jumps to "They went to live on the earth together." There is no emotional landing moment — the loss of immortality (a profound mythic tragedy) gets only two sentences. A single bridging narration could add pacing weight:

Suggested addition between the two current narrations:
> "The sky was very quiet after that. Neither of them looked up."

This one sentence gives the TTS a pause point, lets children absorb the emotional register, and mirrors grandma's storytelling pacing ("奶奶停頓一下").

### NV-3: Ch9 lesson-3 closing narration ellipsis under-signals emotional moment

Current close: `"The door shut. The house went quiet. She sat down and cried..."`

The `...` ellipsis is a text device that doesn't translate to TTS audio — the grandma voice reads it at the same pace as a period. To signal the TTS pause (and learner reflection moment), the narration should use a complete sentence that conveys the pause semantically:

> "The door shut. The house went quiet. Cinderella sat down by the cold fire and cried."

The phrase "by the cold fire" gives TTS a natural lengthening point, adds Ghibli atmospheric detail, and replaces the typographic ellipsis with story content.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #191: X191_WH_DISTRIBUTION_CHAPTER_LINT**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| **Chapter-level WH-word distribution lint rule** — flag when any WH-word is 0% across a chapter's listen-mc pool | Cambridge A2 Key item specification; ETS TOEIC Part 3 item writer guide; R7 of pickup-q-design-standard-v1.md | ✅ 完全適合 — Pickup already has `validate-lessons.js`; add chapter-aggregation pass | 1hr (extend validate-lessons.js) | High — prevents silent temporal/referential blindspot across chapters | **✅ IMPLEMENT** |

### 實作方法

**In `tools/validate-lessons.js`** — after the existing per-lesson lint, add a chapter-aggregate pass:

```js
// Chapter WH distribution check (X191)
const WH_TARGET_MIN = { what: 0.20, how: 0.10, why: 0.05, where: 0.02, who: 0.02, when: 0.03 };
// Per-chapter: count WH-words across all listen-mc .question fields
// Flag any chapter where a WH-word in WH_TARGET_MIN falls below its threshold
// Example flag: "ch9: when=0% (min 3%) — add temporal question"
```

Field: `q.question.split(' ')[0].toLowerCase().replace('?','')` for listen-mc.

This lint is purely additive to the existing validator — no src/ changes, no JSON changes — just a new lint pass that runs in CI on every `git push`.

**Why now**: Ch9–16 audit found `when=0%` across 88 questions. Without a lint gate, this gap will persist silently across new chapters. The lint provides an automatic early-warning system aligned with the R7 specification already in the design standard.

### Industry context

Cambridge Young Learners English (YLE) Movers (A2-equivalent) explicitly requires temporal comprehension questions in its listening marking criteria. Duolingo's internal item spec (per public research papers on DET item design) uses a similar WH-balance requirement. The current Pickup spec (R7) already mandates "What > When ≈ Where" but has no enforcement mechanism — this lint provides it.
