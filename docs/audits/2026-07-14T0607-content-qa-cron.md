# Content QA — 2026-07-14 06:07 UTC

**Today's angle:** #4 — A2 Cloze Blank 位置 (START/MID/END) adapted for listen-mc: where in the stimulus sentence does the key tested information appear? Systemic END-position bias turns comprehension into phonological recency recall.
**Focus:** Ch25-32 (Yu Gong / Archimedes / Sanzang / Zhuge Liang / Odysseus / Heracles / Robin Hood / Conversational QA)

> **Angle rotation rationale:** 2026-07-13T1211 audit noted "A2 blank position is next in rotation for Ch25-32." Confirmed unused for this chapter range. Previous run (#12 explanationZh) covered Ch9-16.

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s)
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l3: X49_STIMULUS_REUSE
  kt-ch8-l4: X49B_STIMULUS_REUSE_COMP
  kt-ch8-l5: X49_STIMULUS_REUSE
  kt-ch8-l7: X49_STIMULUS_REUSE
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch9.json: 8 lint issue(s) [unchanged]
  ...
Total mirror-lint issues: 440 (warn-only)
```

No new schema failures. 440 mirror-lint warnings stable vs. prior runs.

---

## B. Violation Table — Angle A2: Blank Position Distribution

**Method:** For each listen-mc / listen-comprehension question in Ch25-32, locate the stem-matched key word of the correct answer within the stimulus sentence. Bucket: START (word index < 33% of sentence length), MID (33–66%), END (>66%). Flag lessons with ≥60% END or 0 START questions across ≥3 scoreable items.

### B1. Chapter-level Position Summary

| Ch | Story | Scored | START | MID | END | END% | Flag |
|----|-------|--------|-------|-----|-----|------|------|
| Ch25 | Yu Gong 愚公移山 | 4 | 1(25%) | 1(25%) | 2(50%) | 50% | ✅ |
| **Ch26** | Archimedes 阿基米德 | 12 | 1(8%) | 4(33%) | **7(58%)** | 58% | ⚠️ |
| Ch27 | Sanzang / Journey West | 12 | 3(25%) | **7(58%)** | 2(17%) | 17% | ⚠️ MID-heavy |
| Ch28 | Zhuge Liang 三顧茅廬 | 10 | 3(30%) | 3(30%) | 4(40%) | 40% | ✅ |
| **Ch29** | Odysseus / Storm at Sea | 13 | 1(8%) | 3(23%) | **9(69%)** | 69% | ⚠️ |
| **Ch30** | Heracles / Nemean Lion | 11 | 1(9%) | 1(9%) | **9(82%)** | 82% | 🔴 P0 |
| Ch31 | Robin Hood | 10 | 3(30%) | 2(20%) | 5(50%) | 50% | ✅ |
| Ch32 | Conversational QA | 4 | 0(0%) | 1(25%) | **3(75%)** | 75% | ⚠️ |
| **GLOBAL** | Ch25-32 | **76** | **13(17%)** | **22(29%)** | **41(54%)** | **54%** | ⚠️ |

**Target balance:** START 25–40%, MID 30–40%, END 25–35%. Global END=54% is ~20pp above ceiling.

---

### B2. Per-Lesson P0 Violations (Lesson with ≥3 questions, 0 START, END% ≥67%)

| Ch | Lesson | S | M | E | Description | Root cause |
|----|--------|---|---|---|-------------|-----------|
| Ch26 | kt-ch26-l6 | 0 | 0 | 3 | Archimedes crown experiment | All 3 questions target end-NP ("in clear, simple words", "of the same weight", "to a lower mark") |
| Ch29 | kt-ch29-l7 | 0 | 0 | 3 | Odysseus rallies his men | Questions on bravery/hope/distance all test final clause ("go home", "next to them", "many long days away") |
| Ch30 | kt-ch30-l4 | 0 | 0 | 3 | Heracles vs lion, round 1 | Spatial questions: lion on rocks / arrow in chest / arrows bounce off — all end-PP |
| Ch30 | kt-ch30-l7 | 0 | 0 | 3 | Heracles wins | Outcome questions: grab neck / lion weakens / lion skin → coat — all end-predicate |

**Plus partial violations (0S, END% ≥60%):**

| Ch | Lesson | S | M | E | Note |
|----|--------|---|---|---|------|
| Ch26 | kt-ch26-l5 | 0 | 1 | 2 | Secret of gold density — key word "sizes for the same weight" at pos=0.85 |
| Ch29 | kt-ch29-l4 | 0 | 0 | 2 | Ships sail: both "tied ropes/raised sail" and "out into open sea" are end-PP |
| Ch29 | kt-ch29-l5 | 1 | 0 | 2 | Stars/easy-days lessons: 2 of 3 at pos >0.89 |
| Ch30 | kt-ch30-l5 | 0 | 0 | 2 | Lion roar / lion leaps — both test final predicates |
| Ch32 | kt-ch32-l5 | 0 | 0 | 3 | "Have lunch" / chair / pen — all conversation-final phrases |

---

### B3. Specific Examples — P0 Evidence

**Ch30-l4 (all 3 END, relPos > 0.73)**

| qid | sentence (truncated) | Q | correct | pos |
|-----|---------------------|---|---------|-----|
| kt-ch30-l4-q3 | There, in front of a deep cave, the giant lion lay on warm **rocks**. | Where was the lion? | resting on rocks near a cave | 0.93 |
| kt-ch30-l4-q4 | He let the arrow fly. It hit the lion right in the **chest**. | Where did the arrow hit? | right in the chest | 0.92 |
| kt-ch30-l4-q7 | Heracles shot two more arrows. Both of them **bounced off**. | What happened to the arrows? | all of them bounced away | 0.73 |

**Ch26-l6 (all 3 END, relPos > 0.86)**

| qid | sentence (truncated) | Q | correct | pos |
|-----|---------------------|---|---------|-----|
| kt-ch26-l6-q3 | He told the king his plan in clear, **simple words**. | How did he explain? | in plain easy words | 0.90 |
| kt-ch26-l6-q6 | Beside the crown they placed a piece of pure gold of the **same weight**. | What was placed next to the crown? | pure gold of equal weight | 0.93 |
| kt-ch26-l6-q8 | Then they put in the pure gold. The water rose to a **lower mark**. | What did the water do? | stopped lower than before | 0.86 |

---

### B4. Structural Root Cause

English sentences naturally carry **new information at the end** (rheme / end-focus). Questions targeting "What did X do?" / "Where did Y go?" / "What happened to Z?" almost always land on the final VP or PP. When **all** questions in a lesson follow this WH-pattern aimed at end-of-sentence predicates, END bias is structurally inevitable.

**Rebalance levers:**
1. **Who/Whose** questions → test sentence-initial subject (START)
2. **Questions about initial adverbials** → "By day the sun was warm" → Q: "When was the sun warm?" → START
3. **Embedded clause questions** → test the matrix clause, not the complement
4. **Theme questions** → "Yu Gong said, 'Take it to the river…'" → Q: "Who gave the instruction?" → START

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch25-32 (8 chapters) |
| Lessons with listen-mc / comprehension | 28 lessons |
| Total scoreable questions | 76 |
| START (0–33%) | 13 (17%) |
| MID (33–66%) | 22 (29%) |
| END (66–100%) | 41 (54%) |
| noMatch (no stem overlap) | 32 |
| P0 lessons (0S, 3+E, 100% END) | **4** (Ch26-l6, Ch29-l7, Ch30-l4, Ch30-l7) |
| Chapters with END >60% | 3 (Ch26, Ch29, Ch30) |
| Worst chapter | **Ch30 @ 82% END** |

---

## D. Top 5 P0

1. **🔴 P0 — Ch30 lesson kt-ch30-l7** (0S 0M 3E, 100% END): Heracles outcome questions. All three test final predicates (neck-grab / lion-weakens / skin-coat). A 8-year-old learns to listen only to the last 2 words of each sentence to answer all 3.

2. **🔴 P0 — Ch30 lesson kt-ch30-l4** (0S 0M 3E, 100% END): Lion encounter spatial questions. "Rocks", "chest", "bounced off" all at sentence tail. No subject/agent question to balance.

3. **🔴 P0 — Ch29 lesson kt-ch29-l7** (0S 0M 3E, 100% END): "Be brave", "hope and each other", "still many days away" — all test closing phrases. Opening thematic "We will be brave" is never questioned from its subject position.

4. **⚠️ P1 — Ch26 lesson kt-ch26-l6** (0S 0M 3E, 100% END): Archimedes crown experiment three consecutive END-target questions. Fixable with one "Who asked Archimedes?" (START: "He told the **king**…") and one "What did Archimedes use?" (MID verb).

5. **⚠️ P1 — Ch29 overall** (1S 3M 9E, 69% END): Structural: Odyssey narratives favor ship-motion and ocean-spatial sentences that all terminate in prepositional direction phrases. Need 2–3 "Who" or "What kind of X" questions added at lesson level.

---

## E. Narrative Voice / Pacing Improvement Proposals (zero-violation minimum)

Even with no hard R-rule violation, these three improvements would raise the Ch25-32 comprehension experience:

1. **Ch29 lesson sequence pacing**: Lessons l4/l5/l7 are three consecutive END-heavy sets. Even reordering to place a MID-heavy lesson (e.g., l6 which is balanced) between l4 and l5 would reduce the learned-shortcut risk without content changes.

2. **Ch32 conversational format mislabeled**: kt-ch32 sentences are conversational question-response pairs (e.g., "Are you hungry? Yes, let's eat lunch"). These are structurally `listen-and-respond` items but are typed as `listen-mc`. The END bias here is a type-mismatch artifact: the "correct answer" is always the conversationally appropriate response to the final intent of the stimulus. Consider auditing whether `listen-mc` is the right type or whether a `response-match` discriminator would be more honest.

3. **Ch25 Yu Gong opening**: The three narration-type entries in l1–l2 set up a story about persistence, but the comprehension questions (l3) never probe the **theme** ("Who moved the mountain?", "Why did Yu Gong decide not to stop?") — they only probe **action details** at sentence end. Adding one inference/theme START question per lesson would make l3–l7 more pedagogically balanced.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #153: X155_BLANK_POSITION_BALANCE_GATE — Lint guard for END-position bias per lesson

**Industry source:**
- Recency and rarity effects in disambiguating utterance focus — PLOS One 2025 developmental study: children aged 7–10 are especially susceptible to recency effects; end-of-sentence items test phonological short-term memory rather than semantic comprehension. ([PLOS One 2025](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0317433))
- Listening assessment item focus research — TandfOnline (Kormos & Johnson 2022): item focus (where the key information falls in the stimulus) interacts with text authenticity and directly affects construct validity. ([TandfOnline 2022](https://www.tandfonline.com/doi/full/10.1080/17501229.2022.2109643))

**Pattern:** Add a lint rule `X155_BLANK_POSITION_END_BIAS` that fires when ≥60% of listen-type questions in a lesson have their key answer word in the final third of the stimulus sentence (relPos > 0.67), AND ≥3 questions are present.

**Pickup 適配 (✅ 適合):**
- React 18 static JSON — no runtime change, pure `validate-lessons.js` lint addition
- Applicable to `listen-mc` and `listen-comprehension` types (78% of Ch25-32 scored questions)
- Aligns with target audience: 8-12 children have heightened recency bias per the 2025 developmental study
- Implementation: stem-match heuristic already validated in this audit (76 questions classified); promote to `validate-lessons.js` as warn-only initially

**Effort:** Low (~1 hr in `tools/validate-lessons.js`)
**ROI:** High — catches the most common structural weakness in listen-type lessons before content ships

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X155_BLANK_POSITION_END_BIAS lint gate | PLOS One 2025 recency-effect research + TandfOnline 2022 item-focus study | ✅ Static JSON lint, pure validate-lessons.js, zero runtime cost | Low (1 hr) | High — catches END-bias before ship | **RECOMMEND** |

**Concrete implementation spec:**
```js
// In validate-lessons.js, per-lesson loop:
const endCount = scoredQs.filter(q => relPos(q) > 0.67).length;
const total = scoredQs.length;
if (total >= 3 && endCount / total >= 0.60) {
  warn(lessonId, `X155_BLANK_POSITION_END_BIAS (END=${endCount}/${total}=${(endCount/total*100).toFixed(0)}% — threshold 60%)`);
}
```
**Immediate affected lessons:** Ch26-l6 ✗, Ch29-l7 ✗, Ch30-l4 ✗, Ch30-l7 ✗ (4 P0 catches). Plus 5 partial P1 lessons flagged at warn level.
