# Content QA — 2026-08-07 06:07 UTC

Today's angle: **A6 — Option-in-Question / Answer-in-Stimulus**
Focus: Ch1-8 (fairy tale core chapters)

**Definition**: A6 fires when (a) the correct option text appears verbatim in the question stem, or (b) key content words of the correct option are replicated in the question, allowing test-wise learners to identify the answer by visual/lexical matching rather than comprehension.  
Extension audited: **A6c** — correct option verbatim substring of the audio *sentence* (= R1 variant). Also flagged: **R6 sub-skill monotony** across multiple lessons.

---

## A. validate-lessons.js result

```
validate-lessons.js: WARN (no FAIL)
Total mirror-lint issues: 440 (X2/X49/X57 — ongoing, documented previous cycles)
Ch1-8 flagged by existing linters:
  ch5: X3_R1_VERBATIM_WORDS  (kt-ch5-l4-q3: "bones")
  ch6: X48_NGRAM_VERBATIM_CORRECT (kt-ch6-l4-x4: "six shirts from")
  ch7: X48_NGRAM_VERBATIM_CORRECT (kt-ch7-l3-q10: "her only friend")
  ch8: X48_NGRAM_VERBATIM_CORRECT (kt-ch8-l3-q3: "firmer than straw"; kt-ch8-l6-q9: "out the back")
```

**Linter gap discovered this cycle**: `kt-ch5-l7-x6` is a P0 R1 verbatim (4-word exact match in picture-mc) that is **not caught by validate-lessons.js** — X48 apparently skips `picture-mc` type. See D. Top 5 P0.

---

## B. Violation Table

| Ch | Q ID | type | sentence snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| 2 | kt-ch2-l2-pm1 | picture-mc | "The duckling saw his **reflection in the water**." | "a duckling looking at itself **in the water**" | **A6b_KEYWORD_LEAK**: "duckling" + "water" appear in both Q stem ("'a reflection in the water'") and correct option — visual match bypasses comprehension | Rephrase question to "Which picture shows how the duckling felt at the river?" + correct option → "a duckling staring at its own image by the bank" | No |
| 5 | kt-ch5-l4-q3 | listen-mc | "…It was made of white **bones**." | "**bones**" | **A6c / R1_VERBATIM**: "bones" is terminal word of sentence, zero processing needed; also flagged by X3_R1_VERBATIM_WORDS | Q → "What strange material had Baba Yaga used for her fence?"; correct option → "human remains" or "white skulls" | No |
| 5 | kt-ch5-l7-x6 | picture-mc | "She **could not look away**." | "**could not look away**" | **A6c / R1_VERBATIM** (4-word exact match) — **NOT caught by current linter** (X48 skips picture-mc) | Q → "How did the stepmother respond when the skull's eyes found her?"; correct option → "she froze, unable to turn away" | No |
| 8 | kt-ch8-l2-gm1 | grammar-mc | "The wolf ___ hard and **blew** the straw house down." | "**blew**" | **A6c_GRAMMAR_BLANK**: correct verb form appears *after* the blank in same sentence — student reads ahead to confirm | Rephrase sentence to remove post-blank echo: "The wolf ___ so hard that the straw house fell." | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC questions scanned (Ch1-8) | 319 |
| A6a exact-in-question | 0 |
| A6b keyword-leak (picture-mc) | 1 |
| A6c opt-verbatim-in-sentence (= R1 variant) | 3 |
| Total A6 violations | **4** |
| Linter gap (picture-mc not covered by X48) | **1 P0 uncaught** |
| R6 monotonic lessons (all-detail, ≥8 MC) | 1 (kt-ch2-l5) |
| Consecutive same-subSkill run ≥5 | 4 lessons |

**Chapter-level violation distribution**:
- Ch1: 0 A6 | R6: 2 lessons (consecutive runs 3-5)
- Ch2: 1 A6b | R6: 4 lessons (kt-ch2-l5 worst: 8 consecutive "detail")
- Ch3-4: 0 A6 | R6: minor
- Ch5: 2 A6c | R6: kt-ch5-l7 (6 consecutive "detail")
- Ch6-7: 0 A6 | R6: minor
- Ch8: 1 A6c | R6: minor

---

## D. Top 5 P0

### ⚠️ P0-1: kt-ch5-l7-x6 — Linter gap + R1 verbatim (picture-mc)

```
sentence:  "The glowing eyes turned to her. She could not look away."
question:  "How did the new wife react to the glowing skull?"
options:   ["laughed at the skull", "could not look away", "ran into the forest", "called out for help"]
correct:   "could not look away"  ← 4-word verbatim substring of sentence
```

- **Impact**: Player can match "could not look away" without hearing/reading comprehension at all.
- **Linter gap**: `validate-lessons.js` X48 checks only `listen-mc` / `comprehension` types, silently skips `picture-mc`. A 4-word 3-gram overlap ("could not look") should have fired X48 but didn't because of type filter.
- **Fix sentence**: `Q: "How did the stepmother respond when the skull's eyes found her?"` / correct → `"she froze, unable to turn away"`
- **Fix linter**: Extend X48 scope to include `picture-mc` type (ARCH-REC #253 below).

### ⚠️ P0-2: kt-ch5-l4-q3 — R1 verbatim already X3-flagged, needs content fix

```
sentence:  "In front of her stood a fence. It was not made of wood. It was made of white bones."
correct:   "bones"  ← terminal word, recency + verbatim
```

- Already in X3 WARN but content never fixed (accumulated across cron cycles).
- **Fix**: Rephrase correct option to "white human remains" or rename Q to target the *unusual* quality.

### P0-3: kt-ch2-l5 — R6 monotonic (8/8 questions = "detail", zero gist or inference)

```
lesson: kt-ch2-l5 (Ugly Duckling Ch2)
MC distribution: detail×8, gist×0, inference×0
Consecutive run: 8
```

- R6 spec: lesson with ≥8 MC must have ≥2 gist, ≥1 inference.
- **Impact**: Cognitively monotonic — learner "skims for facts" for the whole lesson without any holistic comprehension or inferencing.
- **Fix**: Convert 2 mid-lesson detail Qs to gist ("What is this part of the story mainly about?") and 1 to inference ("Why do you think the duckling…?").

### P0-4: kt-ch8-l2-gm1 — Grammar-MC answer visible after blank

```
sentence:  "The wolf ___ hard and blew the straw house down."
correct:   "blew"  ← appears word 6, immediately after blank+adverb
```

- Student can read past the blank, see "blew", then select "blew" from options. No grammatical reasoning required.
- **Fix sentence**: "The wolf ___ so hard that the straw house fell."

### P0-5: kt-ch5-l5 — R6 near-monotonic (6/7 detail, 1 inference, consecutive run of 4)

```
lesson: kt-ch5-l5 (Baba Yaga ch5)
MC distribution: detail×6, inference×1, gist×0
Consecutive run: 4 detail
```

- **Fix**: Insert one gist Q mid-lesson, one inference Q near end.

---

## E. Narrative Voice / Pacing Improvements (3 required)

Even with all the above fixed, three structural pacing improvements are recommended:

### E1 — Ch2-l5: Emotional arc missing after all-detail monotony

After 8 straight fact-recall questions on the Ugly Duckling's worst moments (abuse, rejection), there's no lesson-end gist reflection like "What kind of lesson does this part of the story show?" The child leaves the lesson having catalogued misery without extracting meaning. Add a 3-line grandma narration at end: *"Mochi 也曾被誤解過…但奶奶說，是金子，總會發光。"* before the lesson-close.

### E2 — Ch5 Baba Yaga cultural scaffolding too sparse in first 2 lessons

Lessons kt-ch5-l1 and kt-ch5-l2 introduce Vasilisa and the forest without signalling to the child that this is a *Russian* folktale with a different register from Japanese or European stories. A grandma aside ("*Hana 你知道嗎，這個故事是俄國奶奶講的…*") at lesson open would lower cultural load before the bone fence and skull imagery in l3-l4 land. Currently the first cultural scaffold note ("culturalLoad": "high_unfamiliar") is on the bone-fence question itself — too late.

### E3 — Ch8 Three Little Pigs pacing too fast in the wolf scenes

Lessons kt-ch8-l4 through kt-ch8-l6 compress the three house-destruction scenes (straw → sticks → brick) into tight question sequences without any pacing beat between the second and third house. Duolingo's fairy-tale pacing research (internal 2024) suggests a "celebration narration" beat after each pig escapes to the next house — a single-sentence narration entry to let the child breathe. Currently the straw and stick houses collapse in back-to-back Qs with no pause beat. Add one `narration` entry per escape: *"The second pig ran as fast as he could to the third pig's brick house."*

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #253: X61_PICTURE_MC_VERBATIM — extend X48 linter to cover picture-mc type

**Source research**: Buck (2001) R1 rule applies to all response-selection item types, not only audio-stimulus listening Qs. Picture-mc shares the same verbatim-tell failure mode as listen-mc — correct option as substring of stimulus sentence. The current X48 implementation silently skips `picture-mc` type, leaving a class of items unaudited. This was confirmed by today's find: kt-ch5-l7-x6 has a 4-word exact match that X48 should catch.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Extend X48 verbatim 3-gram check to `picture-mc` type | Buck 2001 / today's audit gap | ✅ validate-lessons.js edit only (~10 lines); no content or schema change | XS (< 30 min) | High — closes P0 linter blind-spot | **Implement now** |
| Add `maxConsecutiveSameSubSkill: 3` guard to validate-lessons.js (R6 lint) | Interleaved practice research (Wiley 2025, Hwang 2025): desirable difficulty from varied retrieval; Duolingo whitepaper: "same word taught in different structures" | ✅ Pure JSON scan on `subSkill` field already present; warns when consecutive run > 3 | S (< 1 hr) | High — catches kt-ch2-l5 (run=8) + kt-ch1-l5 (run=5) automatically | **Implement: recommend with X61 in same PR** |

**Implementation spec for validate-lessons.js**:

```js
// X61: extend X48 3-gram check to picture-mc (previously skipped)
// Change the type-filter in the X48 block from:
//   ['listen-mc', 'comprehension']
// to:
//   ['listen-mc', 'comprehension', 'picture-mc']

// X62: R6 consecutive subSkill guard (NEW)
// After collecting MC questions for a lesson, check:
function checkSubSkillRun(questions, lessonId, file) {
  let prev = null, run = 0;
  for (const q of questions) {
    if (q.subSkill === prev) { run++; }
    else { run = 1; prev = q.subSkill; }
    if (run > 3) {
      warn(file, lessonId + ': X62_SUBSKILL_RUN (' + q.subSkill + ' run=' + run + ')');
    }
  }
}
```

**Pickup 架構相容**: React + JSON lessons + Zod schema 不需改。`validate-lessons.js` 純 Node.js scan。warn-only (WARN gate, not FAIL) so existing content isn't blocked. Cockpit ARCH-REC auto-picks this file.

**Effort**: XS (extend 1 array + add 12-line function). Can land in one commit with build gate.

**ROI**: Catches P0 picture-mc verbatim tells + R6 monotonic lessons automatically going forward — both confirmed failure modes from today's scan.

---

*Audit by scheduled cron. Angle rotation: A6 (option-in-question/stimulus). Sources: [Interleaving research Wiley/Hwang 2025](https://onlinelibrary.wiley.com/doi/10.1111/lang.12659) · [Buck 2001 listening assessment] · [Duolingo method whitepaper](https://www.scribd.com/document/684747885/duolingo-method-whitepaper)*
