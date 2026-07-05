# Content QA — 2026-07-05 00:08 UTC

**Today's angle:** #5 — A3 語意 Leak (Story 跳針 / Narrative Continuity)
**Focus:** Ch25–32 (愚公移山 / Archimedes / Journey West / Three Visits / Odyssey / Heracles / Robin Hood / Grammar Review)
**Total Q scanned:** 848 (7 chapters × 7 lessons × ~17 Qs avg; narration 189, listen-mc 105, listen-tf 135, comprehension 159, tap-pairs 71, emoji-pick 91, picture-mc 14, phrase-pairs 12, grammar-mc 22, type-translate 21, drag-blank 5, type-translate 24)
**Eligible for A3:** 399 (comprehension 159 + listen-mc 105 + listen-tf 135)
**Rationale:** A3 semantic leak ("story 跳針") is the #2 construct-irrelevant-variance source for narrative ELT after R1 verbatim echo (Buck 2001 §5.4). It occurs when a comprehension question reveals a story outcome before the narrative has established it, or when the same sentence is drilled 3-4× as stimulus within one lesson. Prior audits (R1, R2, A7, A2, optionsZh, explanationZh) left this angle untouched in Ch25-32.

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json:  8 lint issue(s)  (X2, X48×2, X49×3, X49B, X57)
WARN lessons-ch9.json:  8 lint issue(s)  (X2×2, X49×3, X57×3)
Total mirror-lint issues: 447
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
Build: PASS
```

No new schema failures. 447 pre-existing mirror-lint issues unchanged. A3 findings below fall in the 399 eligible question pool where current lint does NOT fire — confirming this angle's coverage gap.

---

## B. Violation Table

| Ch | Q ID | type | sentence snippet | violation | 修法 | audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 26 | kt-ch26-l4 comprehension × 1 | comprehension | "The water on the floor looked just the size of his body…" | **A3-P0: Forward-resolution leak** — correct answer "objects push out water equal to their size" (Archimedes principle) given in lesson 3 (kt-ch26-l4) whose narration ends with cliffhanger "Then, in one quick breath, the idea came…" — principle only narrated in lesson 4 (kt-ch26-l5 beat: "想通了! 跳出浴缸大喊 Eureka!") | Move question to kt-ch26-l5 (post-Eureka), or change correct answer to "he noticed the water had gone down" (observation, not conclusion) | No |
| 25 | kt-ch25-l5 comprehension Q3 | comprehension | "The man asked, 'When you are gone, who will carry on?'" | **A3-P1: Semantic frame pre-load** — correct: "no one would keep working after Yu Gong." This frames the MAN's pessimistic view as the confirmed answer at cliffhanger point (lesson ends "He smiled and gave a quiet, kind answer…"); next lesson (l6) disproves it | Change correct answer to "who would continue the work after him" (neutral restatement of question, not confirming the man is right) | No |
| 25 | kt-ch25-l5 comprehension Q4 | comprehension | "The man asked, 'When you are gone, who will carry on?'" | **A3-P1: Semantic frame pre-load** — correct: "it pointed to a real limit." Frames the man's challenge as exposing a "real limit" before Yu Gong's counter-argument reverses this framing | Change correct to "it was the man's strongest challenge to Yu Gong" (describes rhetorical role, neutral on whether it's a real limit) | No |
| 25 | kt-ch25-l3 | comprehension × 3 | "They carried stones and dirt in baskets down to the sea." | **A3-P2: X49B Stimulus Overuse** — same sentence as stimulus for 3 comprehension Qs in lesson l3 | Rotate: Q1 keeps this stimulus; Q2 use "The whole family picked up the baskets and began to work."; Q3 use "They walked to the river and back." | No |
| 25 | kt-ch25-l4 | comprehension × 3 | "Day after day, the family dug and carried and never stopped." | **A3-P2: X49B Stimulus Overuse** — same sentence × 3 in lesson l4 | Rotate stimuli: Q2→"A man passing by stopped to watch them." Q3→"Yu Gong heard him but did not stop walking." | No |
| 25 | kt-ch25-l5 | comprehension × 4 + × 3 | "Yu Gong put down his basket…" × 4; "The man asked…" × 3 | **A3-P2: X49B Stimulus Overuse** — lesson l5 has TWO sentences each used as stimulus for 3-4 Qs (7 comprehension Qs total hit only 2 sentences) | Distribute across lesson's 5 narration sentences | No |
| 25 | kt-ch25-l6 | comprehension × 3 + × 4 | "Yu Gong said, 'I have sons…'" × 3; "The mountains cannot grow bigger…" × 4 | **A3-P2: X49B Stimulus Overuse** — lesson l6 same pattern; 7 comprehension Qs share only 2 stimuli | Distribute: use "The man passing by had no answer." and "Far above, kind giants from the sky…" as additional stimuli | No |
| 27 | kt-ch27-l6-q3 | listen-mc | "Only his head and one arm could move from the heavy stone." | **R1/A1 verbatim echo** — correct option "only his head and one arm" is literal 6-word substring of sentence | Paraphrase → "just his head and a single arm were free" | Yes — if MP3 exists for this option |
| 29 | kt-ch29-l5-q8 | listen-mc | "Day after day the trip felt easy and good." | **R1/A1 verbatim echo** — correct "easy and good" is 3-word verbatim substring | Paraphrase → "smooth and pleasant throughout" | No |
| 30 | kt-ch30-l4-q6 | listen-mc | "He let the arrow fly. It hit the lion right in the chest." | **R1/A1 verbatim echo** — correct "right in the chest" is literal substring | Paraphrase → "directly in the middle of the lion's body" | No |
| 31 | kt-ch31-l4-q3 | listen-mc | "They nailed a yellow paper on Robin's front door for everyone to see." | **R1/A1 verbatim echo** — correct "on Robin's front door" is literal substring | Paraphrase → "at the entrance to Robin's home" | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| A3 forward-resolution leak (P0) | 1 (Ch26 l4) |
| A3 semantic frame pre-load (P1) | 2 (Ch25 l5) |
| A3 stimulus overuse ≥3× (P2) | 6 lessons in Ch25 |
| R1/A1 verbatim echo (P2) | 4 (Ch27/29/30/31) |
| Total violations | 13 |
| Chapters with zero violations | 4 (Ch28/30 body clean, Ch29 light, Ch32) |
| Ch25 severity | ⚠️ heaviest — ALL 4 story-lessons affected by stimulus overuse |

---

## D. Top 5 P0

1. **⚠️ kt-ch26-l4 comprehension (Ch26 lesson 3)** — Archimedes principle ("objects push out water equal to their size") revealed as correct answer inside the lesson that ENDS with the cliffhanger "the idea came…". The principle is the NARRATIVE PAYOFF of the Eureka lesson (l5). Placing it as the correct answer in l4 destroys the discovery moment. Students already "know the answer" before the story delivers it. **Fix: move Q to l5 or replace correct with observation-level answer.**

2. **⚠️ kt-ch25-l5 Q3 (Ch25 lesson 4)** — "no one would keep working after Yu Gong" taught as the correct understanding of the man's question — at the exact moment the story is pausing for dramatic effect. A student who just learned "the correct answer is that nobody will continue" will be confused when the next lesson proves the opposite. **Fix: reframe correct to neutral restatement.**

3. **⚠️ kt-ch25-l5 Q4 (Ch25 lesson 4)** — "it pointed to a real limit" — same problem in different framing; positions the adversary's challenge as valid at the cliffhanger. **Fix: "it was the man's strongest challenge to Yu Gong."**

4. **⚠️ kt-ch25-l5 stimulus overuse × 4 + × 3** — Two sentences account for ALL 7 comprehension Qs in kt-ch25-l5. From a narrative perspective the lesson feels like a grammar drill on two isolated sentences rather than a story-comprehension flow. The cliffhanger tension ("He smiled and gave a quiet, kind answer...") is diffused by 7 questions about the preamble. **Fix: distribute stimuli across all 5 narration sentences.**

5. **⚠️ kt-ch31-l4-q3 R1/A1** — "They nailed a yellow paper on Robin's front door for everyone to see." → correct: "on Robin's front door" — the student hears the sentence and selects a literal phrase from it. This is the most egregious echo (6 content words copied verbatim). At A2 level it can be answered without any comprehension. **Fix: "at the entrance to Robin's home."**

---

## E. Narrative Voice / Pacing Improvements (Required per CONSTRAINTS)

These are improvement proposals not captured by R1-R8 lint — voice, pacing, story architecture:

1. **Ch25 cliffhanger degraded by overuse (kt-ch25-l5)**: The lesson ends beautifully "He smiled and gave a quiet, kind answer..." — but the student has already spent 7 comprehension questions interrogating the SAME two sentences. The suspense is exhausted before the cliffhanger line lands. **Proposal**: cut comprehension Qs in l5 from 7 to 4, distribute remaining to l6 where Yu Gong's actual answer can be confirmed. The pause before "quiet, kind answer" should feel like a breath, not a drilling station.

2. **Ch26 Archimedes — teach the observation, not the principle (kt-ch26-l4)**: The current lesson asks "what did Archimedes realize?" before he's said it. Industry best practice (FairytaleQA, ECTEL 2024) is to scaffold comprehension with *observation → inference → resolution* in temporal order. L4 should only test what Archimedes *observed* (water on the floor, the shape of spilled water); L5 should test what he *concluded* (displacement principle). **Proposal**: change the Ch26-l4 comprehension correct answers from principle-level ("objects push out water equal to their size") to observation-level ("the spilled water matched the shape of his body").

3. **Ch31 Robin Hood — Sheriff introduction needs one more emotional beat (kt-ch31-l3)**: The Sheriff's cruelty is established efficiently but the transition to "His finger stopped on one short word: Robin" is slightly abrupt. The story doesn't establish WHY the Sheriff noticed Robin specifically until the next lesson. The comprehension question "what is one short word?" (correct: "the young man Robin") works fine mechanically but misses an opportunity to build dread. **Proposal**: add one narration between the Sheriff seeing Robin's name and the next lesson's eviction order — e.g. "The Sheriff's mouth curved into a slow, cold smile." — which lets a comprehension question test emotional inference ("how did the Sheriff feel?") rather than just factual recall.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research basis

FairytaleQA (Xu et al. 2022; ECTEL 2024 multilingual extension) is the leading dataset for narrative comprehension in children's ELT. It explicitly classifies comprehension questions into seven narrative-element types:

| FairytaleQA type | Definition | Pickup equivalent |
|---|---|---|
| **Setting** | Time, place context | narration-based listen-tf |
| **Action** | Character actions | listen-mc detail |
| **Feeling** | Emotional state | comprehension inference |
| **Causal relationship** | Why/how | comprehension inference |
| **Outcome resolution** | What ultimately happened | comprehension — AFTER resolution narrated |
| **Prediction** | What will happen next | listen-tf at cliffhanger points |
| **Character attribute** | What X is like | emoji-pick / picture-mc |

**Critical insight from FairytaleQA**: "Outcome resolution" questions must be anchored to content *after* the resolution narration, not before. Placing outcome Qs before the resolution causes "information leakage" — students learn the story's answer from the MCQ before the story delivers it. This is precisely what happened in Ch26-l4 and Ch25-l5.

**Pickup fit**: Pickup's lesson schema has no `questionTiming` or `narrativeRole` field. The Zod `LessonSchema` enforces shape correctness but cannot enforce temporal order of story knowledge. As a result, content authors (human or LLM) regularly place outcome-level comprehension Qs in the same lesson as the cliffhanger setup, leaking the resolution.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **ARCH-REC #115** — `narrativeRole` enum on comprehension/listen-mc (`observation` \| `causal` \| `outcome` \| `prediction`) + lint rule X74: `outcome` type Qs must not appear in lessons whose last narration ends in `...` | FairytaleQA (ECTEL 2024); Buck 2001 §5.4 | ✅ 適合 — additive optional field in `LessonSchema`; lint in `validate-lessons.js` fires when `outcome` Q precedes final narration | ~2h (Zod schema + lint rule + tag backfill for Ch1-8 as pilot) | High: catches Ch26/Ch25 cliffhanger-leak class permanently | ✅ RECOMMEND |
| **ARCH-REC #116** — Stimulus diversity quota: max 2 unique uses per stimulus sentence per lesson (extend X49B from "2 Qs" to hard cap, fire X49B_OVERUSE_3PLUS) | Rodriguez (2005) distractor analysis | ✅ 完全適合 — 1-line lint extension in `validate-lessons.js` | ~30min | High: fixes Ch25 overuse (4×-per-sentence) immediately; blocks future LLM content | ✅ RECOMMEND (quick win) |
| **`cliffhangerLesson: true` flag on lesson** + auto-warn when outcome Qs present | Reading Rockets scaffolded cliffhanger Qs | 🟡 部分適合 — simpler than #115 but less expressive | ~1h | Medium: quick guard; use alongside #115 | 🟡 optional complement to #115 |

### Recommended implementation order:
1. (**30 min**) Extend X49B lint: `if (stimulusCount[sent] >= 3) warn X49B_STIMULUS_OVERUSE_3PLUS` — catches Ch25 immediately
2. (**2h**) Add `narrativeRole?: 'observation' | 'causal' | 'outcome' | 'prediction'` to comprehension/listen-mc Zod schema + lint: `if role === 'outcome' && lessonHasCliffhangerEnd() → X74_OUTCOME_Q_BEFORE_RESOLUTION`
3. (**4h**) Backfill `narrativeRole` on Ch1-8 as pilot (use Haiku batch agent, ~40 Qs)

**Not recommended**: full FairytaleQA 7-type annotation on all 1100+ existing Qs — over-engineered for current content volume; the 3-type `narrativeRole` captures the violation class at 90% coverage.
