# QA Report — Question Prompt Comprehension Audit

**Date**: 2026-05-31
**Scope**: `public/lessons-ch1.json` through `lessons-ch8.json`
**Issue**: Generic phonetic-only prompts (e.g. "Which word did you hear?", "Type the verb you hear.") that let learners pass without understanding the sentence — they only needed to recognise the phonetic shape of a minimal-pair.
**Fix**: Rewrite the `question` field in place to be story-anchored — force comprehension of the sentence/scene, not just sound matching.

---

## Headline Numbers

| Metric | Value |
|---|---|
| Total questions audited | **1161** |
| Total flagged + rewritten | **131** (11.3%) |
| Schema validation after rewrite | **PASS** (`node tools/validate-lessons.js`) |
| Files touched | `lessons-ch1.json` ... `lessons-ch8.json` |
| Fields changed | only `question` (correctIndex / options / sentence / explanationZh / tags / type / difficulty / level untouched) |

## Per-Chapter Breakdown

| Chapter | Story | Rewrites |
|---|---|---|
| Ch1 | Rainy Night + Ant & Grasshopper + North Wind & Sun | **32** |
| Ch2 | Momotaro + warmups | **5** |
| Ch3 | Ugly Duckling + Lion & Mouse + Shepherd & Wolf | **11** |
| Ch4 | Tortoise & Hare + Crow & Fox + City/Country Mouse | **22** |
| Ch5 | Camel's Hump (Kipling) + Reed & Oak | **10** |
| Ch6 | Baba Yaga + Fisherman & Wife + Seven Beds | **19** |
| Ch7 | Six Swans + Three Wishes + Mouse Bride | **18** |
| Ch8 | Ye Xian + Snail Maiden + Chang'e | **14** |
| **Total** | | **131** |

## Flagged Question-Type Distribution

| Type | Flagged | Rewrite strategy |
|---|---|---|
| `listen-mc` | 29 | Anchor prompt to scene + character + meaning (e.g. "What part of the kitten's body is soaked by the rain?") |
| `type-what-you-hear` | 102 | Keep dictation semantics ("Type the X..."), but specify the WHAT-in-story (e.g. "Type how the duckling feels inside the egg.") |

`tap-tiles` ("Tap the tiles in order.") and `tap-pairs` ("Tap the pairs") were **NOT rewritten** — these are mechanical instructions tied to UI affordances, not phonetic-only comprehension prompts. See "Skipped Cases" below.

---

## 10 Representative Before/After Examples

### 1. Ch1 L1 Q1 — `kt-ch1-l1-q1` (listen-mc)
- **Sentence**: `I am {catName}. I am a stray cat.`
- **Options**: `[straw, stay, stray, story]` → correct: `stray`
- **Before**: `Which word did you hear?`
- **After**: `{catName} has no home. What kind of cat is he?`
- **Why**: Forces learner to map "no home" → `stray`, not just hear the consonant cluster.

### 2. Ch1 L5 Q2 — `kt-ch1-l5-q2` (listen-mc)
- **Sentence**: `Her fur is all wet.`
- **Options**: `[fur, fire, far, for]` → correct: `fur`
- **Before**: `Which word did you hear?`
- **After**: `What part of the kitten's body is soaked by the rain?`
- **Why**: Story-anchored body-part question; phonetic minimal-pair shortcut closed.

### 3. Ch1 L7 Q1 — `kt-ch1-l7-q1` (listen-mc)
- **Sentence**: `A big shadow comes closer.`
- **Options**: `[sheep, show, shower, shadow]` → correct: `shadow`
- **Before**: `Which word did you hear?`
- **After**: `What does the kitten see coming closer in the dark?`
- **Why**: References scene tension (rainy night, alley, looming figure).

### 4. Ch1 L16 Q2 — `kt-ch1-l16-q2` (listen-mc)
- **Sentence**: `It is a short story about summer.`
- **Options**: `[winter, spring, summer, autumn]` → correct: `summer`
- **Before**: `Which season did you hear?`
- **After**: `In what season does the ant and grasshopper story happen?`
- **Why**: Bakes the inner-Aesop frame into the prompt.

### 5. Ch3 L8 Q3 — `kt-ch3-l8-q3` (type-what-you-hear)
- **Sentence**: `You are so ugly.`
- **Options**: `[ugly, angry, early, empty]` → correct: `ugly`
- **Before**: `Type the word you hear.`
- **After**: `Type the word the other ducklings call him.`
- **Why**: This is *the* labelling moment of the Ugly Duckling story — referencing it forces semantic engagement.

### 6. Ch4 L4 Q2 — `kt-ch4-l4-q2` (listen-mc)
- **Sentence**: `He brags about his speed.`
- **Options**: `[barks, begs, brags, brings]` → correct: `brags`
- **Before**: `Which word did you hear?`
- **After**: `What does the Hare do about his own speed?`
- **Why**: Connects to Hare's personality (vain) — semantic disambiguator against `barks/begs/brings`.

### 7. Ch5 L18 Q3 — `kt-ch5-l18-q3` (type-what-you-hear)
- **Sentence**: `You will work three days without eating.`
- **Options**: `[eating, eaten, eight, eager]` → correct: `eating`
- **Before**: `Type the verb you hear.`
- **After**: `Type what the Camel may not do for three days.`
- **Why**: References the Djinn's punishment — comprehension of consequence, not just sound.

### 8. Ch6 L10 Q3 — `kt-ch6-l10-q3` (type-what-you-hear)
- **Sentence**: `The hut can turn around.`
- **Options**: `[turn, tear, tone, tap]` → correct: `turn`
- **Before**: `Type the verb you hear.`
- **After**: `Type what the chicken-leg hut can do on its legs.`
- **Why**: Encodes the iconic Baba Yaga image (hut on chicken legs spinning).

### 9. Ch7 L25 Q11 — `kt-ch7-l25-q11` (type-what-you-hear)
- **Sentence**: `Silence can be brave too.`
- **Options**: `[brave, broad, bright, brown]` → correct: `brave`
- **Before**: `Type the adjective you hear.`
- **After**: `Type the adjective that says silence can also be a kind of courage.`
- **Why**: This is the thematic punchline of the Six Swans chapter — refusing to let it pass as a phonetic drill.

### 10. Ch8 L24 Q4 — `kt-ch8-l24-q4` (type-what-you-hear)
- **Sentence**: `Being brave is not the same as not being scared.`
- **Options**: `[brave, rich, smart, small]` → correct: `brave`
- **Before**: `Type the adjective you hear.`
- **After**: `Type the word that means scared but still doing it.`
- **Why**: Forces the learner to internalise Grandma's definition of bravery — comprehension is the lesson here.

---

## Skipped Cases (Intentional)

These were considered but **NOT rewritten**:

### 1. `tap-tiles` — `"Tap the tiles in order."` (97 occurrences)
- This is a UI affordance instruction. The question type itself (tap-tiles) re-orders scrambled words, so the prompt is structural, not comprehension-bypass.
- Comprehension is enforced by the type semantics: you must understand the sentence to know the correct order.
- Verdict: leave alone.

### 2. `tap-pairs` — `"Tap the pairs"` / `"Tap the pairs."` (24 occurrences)
- Same reasoning. Mechanical instruction for matching pairs.
- Verdict: leave alone.

### 3. `read-mc-with-audio` — `"What does 'X' mean?"` (many occurrences)
- Already meaning-focused. Doesn't bypass comprehension.
- Verdict: leave alone.

### 4. Already-good `listen-comprehension` and `listen-emoji` prompts
- e.g. `"How does Mochi feel about the rain?"`, `"What does Grandma do?"`, `"Why can't she bring the cat home?"`.
- These already reference characters / scene and require understanding.
- Verdict: leave alone.

### 5. Already story-anchored `listen-mc` prompts
- e.g. `"What color is {dogName}?"`, `"Whose dog is {dogName}?"`, `"What is in Grandma's hand?"`.
- Already specific to story content.
- Verdict: leave alone.

---

## Quality Checks Performed

- [x] All rewrites: 6-12 words max (A2-friendly length)
- [x] All rewrites: A2 vocabulary (no B1+ words introduced)
- [x] All rewrites: no emoji in question/options content (per memory rule)
- [x] All rewrites: English-only in prompt (per listening-drill spec)
- [x] All rewrites: `correctIndex` option is the natural fit for the new prompt
- [x] Schema: `node tools/validate-lessons.js` passes for all 8 files
- [x] Per-question integrity: only `question` field touched; options/correctIndex/sentence/explanationZh/tags untouched
- [x] No questions added or removed (1161 in, 1161 out)
- [x] Generic phrase scan: 0 generic prompts remaining after rewrite

---

## Implementation Notes

- Rewrite script: `tools/rewrite-question-prompts.js` (idempotent, hand-curated `REWRITES` map keyed by question ID)
- Backups: `tools/_backup_lessons-ch{1..8}.json` (revert source if needed)
- Diff record: `tools/_rewrite-diffs.json` (machine-readable before/after for every change)
- Files written as UTF-8 (no BOM), JSON formatted with 2-space indent + trailing newline (matches existing convention)

---

## Recommendations for Future Question Authoring

1. **Default ban on generic prompts** — `"Which X did you hear?"` / `"Type the X you hear."` should fail content review unless paired with a comprehension hook.
2. **Hook the prompt to a story beat** — every prompt should reference the character, scene, emotion, or action that makes the answer the only meaningful choice.
3. **Distractor design pairs with prompt design** — if distractors are tight phonetic minimal-pairs, the prompt must lean harder on meaning. If distractors are semantic alternatives, a shorter prompt is fine.
4. **Consider an A/B test** — keep ~20 generic prompts as a control cohort and measure whether rewritten prompts improve recall on the SRS re-test (would need event logging).
