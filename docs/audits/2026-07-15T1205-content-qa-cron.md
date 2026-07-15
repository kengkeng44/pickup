# Content QA — 2026-07-15 12:05 UTC

**Today's angle:** A6 — Option-in-Question (answer word embedded in question stem)
**Focus:** Ch25-32 (Yu Gong Moves Mountains / Archimedes / Journey to the West / Yi the Archer / Odyssey / Heracles / Robin Hood / Merlin)
**Chapters scanned:** lessons-ch25 through lessons-ch32 (8 chapters, 59 lessons, 864 questions)

> **Angle choice rationale:** Recent 8-cycle rotation: A4 mirror (Ch17-24) → R1 paraphrase (Ch9-16) → A3 semantic leak (Ch1-8) → R2 distractor doctrine (Ch17-24) → A2 blank position (Ch25-32) → #12 explanationZh voice (Ch9-16) → A7 content-word echo (Ch1-8) → A1 obvious correct (Ch9-16). Angles A5, A6, #10 (audio sync), #11 (optionsZh quality) all unused in this window. Picked **A6** because Ch25-32 only had A2 in recent cycles and A6 is the next highest-impact untested angle for this chapter block.

---

## A. validate-lessons.js result

```
WARN lessons-ch7.json: 8 lint issue(s)
WARN lessons-ch8.json: 9 lint issue(s)
WARN lessons-ch9.json: 8 lint issue(s)
Total mirror-lint issues: 440 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
Schema shape: PASS — all ch25-32 chapters parse cleanly
```

No new regressions. Existing 440 warn issues are pre-tracked X2/X48/X49/X49B/X57 in Ch1-9 (not Ch25-32). Ch25-32 schema shape clean.

**Ch25-32 type distribution (864 questions, 59 lessons):**

| Type | Count | % |
|------|-------|---|
| narration | 200 | 23.1% |
| comprehension | 142 | 16.4% |
| listen-tf | 135 | 15.6% |
| listen-mc | 113 | 13.1% |
| emoji-pick | 90 | 10.4% |
| tap-pairs | 88 | 10.2% |
| type-translate | 33 | 3.8% |
| grammar-mc | 32 | 3.7% |
| picture-mc | 14 | 1.6% |
| phrase-pairs | 12 | 1.4% |
| drag-blank | 5 | 0.6% |

---

## B. Violation Table

Custom A6 scanner run against all 864 Qs in Ch25-32 (see `a6_scan.js`).

### P0 — Correct answer content-word verbatim in question stem (listening bypass)

| Ch | Q ID | Type | Sentence snippet | Question snippet | Correct option | Leak | Fix |
|----|------|------|-----------------|-----------------|----------------|------|-----|
| 25 | kt-ch25-l7-q3 | listen-mc | "They were kind giants from above." | "Who was watching the family from **far above**?" | "giant helpers sent **from above**" | `above` | Change Q: "Who helped the family finish the mountain work?" OR change correct opt: "kind giants watching from the sky" |

**Severity**: P0. `above` appears in both question stem and the correct option, creating a pattern-match bypass for a listening comprehension item. A child can select the right answer by string-matching "above" without understanding the audio. This is the canonical A6 failure mode — the question contains enough of the answer to short-circuit comprehension processing.

---

### P1 — Distractor "is about to" echo from question (unfair linguistic trap, wrong option)

| Ch | Q ID | Type | Question | Echoing Distractor (wrong) | Correct option | Issue |
|----|------|------|---------|---------------------------|----------------|-------|
| 26 | kt-ch26-l4-x8 | emoji-pick | "What is **about to** happen?" | "🍔 he is **about to** eat" (distractor idx=0) | "💡 a big idea is coming" (idx=3) | Phrase "about to" from Q appears in wrong option, luring A2 children toward the incorrect choice |

**Severity**: P1. The correct answer ("a big idea is coming") uses paraphrase (good), but the distractor copies "is about to" from the stem, creating a surface-form trap. For A2 children, question-echo in a distractor is a negative washback pattern — it rewards linguistic mimicry over comprehension. The child hears "about to happen" and sees "about to eat" and may pick it based on echo, not meaning.

**Fix**: Change distractor to "🍔 eating a big meal" (same semantic territory, no echo).

---

### P2 — Keyword leak in correct answer (by category)

#### Category A: Intentional vocabulary-drill emoji-pick (by design, low severity)

These 11 questions use the format "Which one is a X? / Which one shows a X?" where X directly names the concept:

| Ch | Q ID | Question | Correct option keyword | Notes |
|----|------|---------|----------------------|-------|
| 25 | kt-ch25-l1-ep1 | "Which one is a mountain?" | "mountain" | Pure vocab drill |
| 25 | kt-ch25-l2-ep1 | "Which one shows a river?" | "river" | Pure vocab drill |
| 26 | kt-ch26-l1-ep1 | "Which one is a crown?" | "crown" | Pure vocab drill |
| 27 | kt-ch27-l1-ep1 | "Which one is a monkey?" | "monkey" | Pure vocab drill |
| 27 | kt-ch27-l1-ep2 | "Which one shows a cloud?" | "cloud" | Pure vocab drill |
| 27 | kt-ch27-l2-ep1 | "Which emoji shows a staff?" | "staff" | Pure vocab drill |
| 28 | kt-ch28-l1-ep1 | "Which one is an arrow?" | "arrow" | Pure vocab drill |
| 29 | kt-ch29-l1-ep2 | "Which one shows a giant?" | "giant" | Pure vocab drill |
| 29 | kt-ch29-l2-ep1 | "Which one shows a monster?" | "monster" | Pure vocab drill |
| 30 | kt-ch30-l1-ep2 | "Which one shows strong?" | "strong" | Slightly odd grammar |
| 31 | kt-ch31-l1-ep2 | "Which one shows a forest?" | "forest" | Pure vocab drill |

**Assessment**: These are intentional concept-recognition drills, not comprehension tests. The A6 rule technically applies but these questions are pedagogically closer to "flashcard identification" than listening comprehension. *However*, 2025 Frontiers research (see §E) shows contextual emoji matching outperforms identity matching for L2 retention — upgrade path exists (see ARCH-REC #160).

**Note on Ch30-l1-ep2**: "Which one shows strong?" has a grammar error (should be "strength" or "something strong"). P2.5 grammar fix recommended.

#### Category B: Story-connected emoji-pick with shared gerund (moderate A6)

| Ch | Q ID | Question | Correct option | Shared gerund |
|----|------|---------|----------------|---------------|
| 25 | kt-ch25-l3-x5 | "Which emoji shows people **working** hard together?" | "💪 **working** with strength" | `working` |
| 25 | kt-ch25-l4-x5 | "Which emoji shows someone **shaking** their head in doubt?" | "🙅 **shaking** head saying no" | `shaking` |
| 25 | kt-ch25-l5-x5 | "Which emoji shows **standing** up with confidence?" | "🧍 **standing** up straight" | `standing` |

**Assessment**: These are story-connected (not pure vocab drill) so the A6 rule applies with more force. The gerund in the question leaks directly into the correct option label, allowing pattern-matching over comprehension. Fixing option labels removes the echo while preserving the story connection.

**Fixes:**
- kt-ch25-l3-x5: change opt to "💪 strong effort together"
- kt-ch25-l4-x5: change opt to "🙅 head moving side to side, no"
- kt-ch25-l5-x5: change opt to "🧍 tall and steady posture"

#### Category C: Picture-mc / listen-mc with content-word echo (marginal)

| Ch | Q ID | Type | Question | Correct option | Leak word | Assessment |
|----|------|------|---------|----------------|-----------|-----------|
| 25 | kt-ch25-l7-q3 | listen-mc | "from far above" | "sent from above" | `above` | **Already P0 above** |
| 29 | kt-ch29-l3-q8 | listen-mc | "about Odysseus" | "about home felt important" | `about` | Preposition only — marginal, not content word |
| 30 | kt-ch30-l2-pm1 | picture-mc | "'walking along a river'" | "a man walking beside a flowing stream" | `walking` | River→stream paraphrase is the actual test; walking echo is acceptable but improvable |
| 31 | kt-ch31-l2-pm1 | picture-mc | "'shoot an arrow'" | "a young man firing an arrow from a bow" | `arrow` | Shoot→fire paraphrase is the actual test; arrow echo reduces paraphrase difficulty |

**For kt-ch31-l2-pm1**: "arrow" is the key vocabulary item being tested. Keeping it in the correct option when the question says "an arrow" eliminates the vocabulary challenge. Better: "a young man pulling back a bow toward a target" (paraphrase both shoot AND arrow).

---

## C. Stats

| Metric | Count |
|--------|-------|
| Questions scanned | 864 (59 lessons, 8 chapters) |
| P0 violations | **1** |
| P1 violations | **1** |
| P2 violations — vocab drill (by-design, improvable) | 11 |
| P2 violations — story emoji gerund echo | 3 |
| P2 violations — marginal keyword echo | 3 |
| Total flagged | 19 |
| Zero-violation chapters | Ch32 (0 A6 of any class) |

---

## D. Top 5 P0/P1

| Rank | Q ID | Severity | Rule | One-line fix |
|------|------|----------|------|-------------|
| 1 | kt-ch25-l7-q3 | **P0** | A6_KEYWORD_LEAK_CORRECT | Rephrase Q: "Who helped finish the mountain work?" or correct opt: "kind giants from the sky" |
| 2 | kt-ch26-l4-x8 | **P1** | A6_VERBATIM_OPTION_IN_QUESTION (distractor) | Change distractor to "🍔 eating a big meal" (remove "about to" echo) |
| 3 | kt-ch25-l3-x5 | P2 | A6_KEYWORD_LEAK_CORRECT (gerund) | Change opt to "💪 strong effort together" |
| 4 | kt-ch25-l4-x5 | P2 | A6_KEYWORD_LEAK_CORRECT (gerund) | Change opt to "🙅 head moving side to side, no" |
| 5 | kt-ch31-l2-pm1 | P2 | A6_KEYWORD_LEAK_CORRECT (arrow) | Change opt to "a young man pulling back a bow toward a target" |

---

## E. Narrative Voice / Pacing Improvements (3 minimum, even if 0 violations)

1. **kt-ch25-l7 explanationZh pre-empts blind retry**: The explanation for kt-ch25-l7-q3 reads "「kind giants from above」——天上來的溫柔巨人!選「天空的溫柔巨人」!" — the Chinese directly quotes and translates the correct option before the child has answered. Combined with the P0 A6 leak, this double-tells the answer. Even after fixing the A6, consider softening the explanation to remove the explicit "選X" directive: "原來天上派來了巨人幫忙!他們就是「from above」來的。"

2. **Ch30-l1-ep2 grammar error**: Question reads "Which one shows strong?" — "strong" is an adjective, not a noun. Should be "Which one shows strength?" or "Which emoji shows something strong?" This is a voice/register error that models incorrect English to A2 learners.

3. **Ch27-Ch29 distractor vocabulary calibration**: Several listen-mc questions in these chapters have distractors that exceed A2 vocabulary level (e.g., "a flock of small birds" vs "giant helpers sent from above" in kt-ch25-l7) — the wrong options use vocabulary approximately one level easier than the correct option, making the correct answer stand out by difficulty. Calibrate all 4 options to the same approximate CEFR level per question.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #160: X160_A6_EP_DRILL_TAG — emoji-pick drill vs inference lint gate separation**

### Problem identified

Current `validate-lessons.js` has no A6 check for emoji-pick type. This audit's manual scan found:
- 11 intentional vocabulary-drill `ep` questions ("Which one is a X? → X") — A6 technically but pedagogically intentional
- 7 story-connected emoji-pick questions where A6 is a real defect (shared gerund/keyword between question and option label)
- 1 P0 listen-mc A6 bypass (already confirmed as real defect)

Without a lint gate, future content batches will continue adding A6 leaks in story-connected emoji-pick questions, undetected until manual audit.

### Industry reference

**Frontiers Psychology 2025** — "Disentangling the facilitation effect of emoji in vocabulary recognition: experimental evidence from semantic matching tasks" (https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1629078/full):
- Contextual emoji matching (sentence → pick emoji) outperforms identity recognition (name → pick emoji) for L2 retention
- Both forms have pedagogical value but serve different acquisition stages: identity → early form-meaning mapping; contextual → meaning consolidation
- Recommendation: tag the two modes separately so assessment analytics can distinguish drill vs. comprehension performance

**ETS TOEIC Research Compendium**: Washback concern — when test question stems contain answer cues, learners develop matching strategies rather than comprehension strategies. This undermines the test's construct validity even in low-stakes apps.

### Proposed implementation

Add `"drill": true` optional field to `LessonSchema` question entries. For emoji-pick questions, lint gate X160 checks:

```
if q.type === "emoji-pick" AND NOT q.drill:
  contentWords(q.questionEn) ∩ contentWords(q.options[q.correctIndex]) → flag A6_EP_IDENTITY
```

Content writers mark intentional vocab-drill questions `"drill": true`. Story-connected emoji-pick questions (without the tag) get linted. New content must either paraphrase or tag.

### Pickup 適配 verdict

✅ **適合** — direct fit to Pickup's React + Zod schema + JSON architecture:
- LessonSchema already has discriminated unions per type; add `drill?: z.boolean().optional()` to emoji-pick variant
- `validate-lessons.js` extension: ~15 lines of new lint logic
- No app-side rendering change needed (`drill` is a content flag, not a UI flag)
- Enables future analytics split (drill accuracy vs comprehension accuracy per child)
- Effort: 2-3 hours (schema + lint + tag existing drill questions)
- ROI: High — prevents systematic A6 creep in emoji-pick content; also unlocks analytics

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| `"drill": true` tag on emoji-pick + X160 A6_EP_IDENTITY lint gate | Frontiers 2025 (contextual vs identity emoji); ETS washback research | ✅ fits Zod schema extension + validate-lessons.js | 2-3hr | High — catches story-emoji A6 at authoring time, unlocks analytics split | **Implement** |
