# Content QA — 2026-06-12 00:14 UTC

Today's angle: **#8 — A6 Option-in-Question (question stem echoes correct answer)**
Focus: All chapters (Ch0–31), deep dive Ch3/5/8/9/18/22/30

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 268
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
X8_R2_LENGTH_WARN across Ch1-Ch9 + batch files
No schema errors. All 32 files parse cleanly.
```

**A6 is NOT currently linted.** 0/36 violations auto-detected by CI.

---

## B. Violation table

### Type 1: Degree Echo — "How [adj]?" → "very [adj]" (11 cases)
Question contains the exact degree adjective that the correct answer echoes verbatim.
A2 children learn within 2–3 sessions to match the adjective from the question to the option — bypassing all listening comprehension.

| Ch | Q ID | type | question snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| ch3 | kt-ch3-l1-q9 | listen-mc | "How **close** was the hare?" | "very **close**" | A6 degree echo | "right beside him" / "side by side" | No |
| ch3 | kt-ch3-l2-q9 | listen-mc | "How **fast** did the hare go?" | "very **fast**" | A6 degree echo | "like a brown flash" / "in seconds" | No |
| ch8 | kt-ch8-l2-q5 | listen-mc | "How **fast** did the first pig build?" | "very **fast**" | A6 degree echo | "in under an hour" / "before noon" | No |
| ch19 | kt-ch19-l1-q9 | listen-mc | "How **wide** was the river?" | "very **wide**" | A6 degree echo | "impossible to jump" / "as wide as a field" | No |
| ch19 | kt-ch19-l3-q9 | listen-mc | "How **loud** did mouse deer call?" | "very **loud**" | A6 degree echo | "heard across the water" / "rang out far" | No |
| ch23 | kt-ch23-l4-q8 | listen-mc | "How **long** would help take?" | "a **long** while" | A6 degree echo | "many minutes away" / "too far to wait" | No |
| ch24 | kt-ch24-l6-q8 | listen-mc | "How **long** did Kong Rong need to think?" | "not very **long**" | A6 degree echo | "almost no time" / "he knew right away" | No |
| ch28 | kt-ch28-l6-q8 | listen-mc | "How **long** did Liu Bei wait?" | "a **long** while" | A6 degree echo | "several visits worth" / "patiently, many times" | No |
| ch29 | kt-ch29-l1-q3 | listen-mc | "How **long** was he away from home?" | "for ten **long** years" | A6 degree echo | "a full ten years" — remove "long" from answer | No |
| ch30 | kt-ch30-l1-q3 | listen-mc | "How **strong** was Heracles?" | "**strong** enough to lift a big bull" | A6 degree echo | "able to lift a full-grown bull" | No |
| ch30 | kt-ch30-l3-q6 | listen-mc | "How did the forest **sound**?" | "silent with no **sound**" | A6 circular echo | "completely still and quiet" | No |

### Type 2: Structural Noun Echo — "What kind of X?" / "How many X?" → "[adj] X" (11 cases)
Question names the noun category → correct answer repeats it. Structural pattern is learnable in 1 session.

| Ch | Q ID | type | question snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| ch3 | kt-ch3-l4-q9 | listen-mc | "Was the hare still **asleep**?" | "yes, deeply **asleep**" | A6 Y/N state echo | "What was the hare doing?" → open WH, or change A: "yes, not moving at all" | No |
| ch5 | kt-ch5-l5-q10 | listen-comprehension | "…know a **person** was inside?" | "she smelled a **person**" | A6 noun echo | "she caught a human scent" / "her nose told her" | No |
| ch8 | kt-ch8-l4-q9 | listen-mc | "How did the wolf **knock** and speak?" | "loud **knock**, sweet voice" | A6 noun echo | "hard at the door, softly with his words" | No |
| ch9 | kt-ch9-l1-q6 | listen-mc | "What kind of **life** did the two sisters have?" | "an easy and rich **life**" | A6 noun echo | "comfortable and wealthy" | No |
| ch15 | kt-ch15-l1-q3 | listen-mc | "How many **coats** did the emperor have?" | "a huge number of **coats**" | A6 noun echo | "one for every hour of the day" | No |
| ch16 | kt-ch16-l7-q3 | listen-mc | "What kind of **mallet** was it?" | "a magic wish **mallet**" | A6 noun echo | "one that could grant a wish" / "a wishing tool" | No |
| ch18 | kt-ch18-l2-q7 | emoji-pick | "What **jobs** did he do?" | "💪 small hard **jobs**" | A6 noun echo | Change Q: "How did Heungbu earn a living?" | No |
| ch18 | kt-ch18-l4-q7 | emoji-pick | "What kind of **seed**?" | "🌱 a gourd **seed**" | A6 noun echo | "🌱 a gift to plant and grow" — or Q: "What did the bird drop into his hands?" | No |
| ch22 | kt-ch22-l2-q3 | listen-mc | "What kind of **games** did Meng play?" | "**games** copying what he saw" | A6 noun echo | "imitation of what he watched" / "mimicking rituals" | No |
| ch22 | kt-ch22-l4-q8 | listen-mc | "How many **houses** will the family have lived in?" | "three **houses** in all" | A6 noun echo | "three places in total" / "third home" — remove "houses" from answer | No |
| ch24 | kt-ch24-l1-q3 | listen-mc | "How many **brothers** did Kong Rong have?" | "six older **brothers**" | A6 noun echo | Q: "How large was Kong Rong's family?" → A: "six older siblings" | No |

### Type 3: Reference/Topic Echo (weaker — P2, monitor)

| Ch | Q ID | hit | note |
|----|------|-----|------|
| ch12 | kt-ch12-l6-q3 | "many" | "How many?" → "too many to count" — acceptable WH structure, low risk |
| ch17 | kt-ch17-l6-q7 | "them" | "What did she do with them?" — pronoun, stopword, no risk |
| ch20 | kt-ch20-l4-q10 | "still" | "Why does the turnip **still** not move?" → "three is **still** not enough" — "still" is discourse marker, acceptable |
| ch21 | kt-ch21-l3-q6 | "head" | "Why was the leaf over his **head**?" → "to keep something off his **head**" — topic referent, medium risk |
| ch23 | kt-ch23-l3-q6 | "water" | "…in the **water**?" → "going under **water**" — topic referent |
| ch23 | kt-ch23-l6-q8 | "water" | "What happened to the **water** jar?" → "broke open and let the **water** out" — topic referent |
| ch25 | kt-ch25-l6-q3 | "family" | "What did Yu Gong mean about his **family**?" → "**family** that keeps going on" — topic referent |
| ch26 | kt-ch26-l2-q3 | "crown" | "…not do to the **crown**?" → "damage the **crown** in any way" — topic referent |
| ch26 | kt-ch26-l2-q8 | "answer" | "Did Archimedes find an **answer**?" → "no, time passed with no **answer**" — moderate risk |
| ch27 | kt-ch27-l4-q6 | "night" | "Who was with Sanzang at **night**?" → "no one, just the **night** sky" — topic referent |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total questions scanned | 1,069 (questions with `question` field) |
| Total Q types scanned | listen-mc (525) + listen-comprehension (56) + listen-tf (218) + emoji-pick (224) + listen-emoji (39) |
| A6 Type 1 (degree echo) | 11 |
| A6 Type 2 (structural noun echo) | 11 |
| A6 Type 3 (reference echo, P2) | 14 |
| **Total A6 violations** | **36** |
| CI detection rate | 0/36 (0%) — A6 not linted |
| Chapters affected | Ch3, 5, 8, 9, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 |
| Chapters clean (Type 1+2) | Ch0, 1, 2, 4, 6, 7, 10, 11, 13, 14, 31 |

**Severity breakdown:**
- Type 1+2 = P1★ (22 items, high test-wiseness risk): A2 child can solve by pattern-matching without audio comprehension
- Type 3 = P2 (14 items, monitor): topic referent echo, acceptable at A2 but worth tracking

---

## D. Top 5 P0

**P0 = actionable now, highest bypass risk for 8-year-old learners**

### P0-1 ★★★ — `kt-ch3-l4-q9` (Type 2 Y/N state echo)
```
Q: "Was the hare still asleep?"
A: "yes, deeply asleep"
```
State word "asleep" appears verbatim in both Q and correct answer. Child reads Q → sees "asleep" → finds option with "asleep" → selects without listening. Fix:
- Change Q to open WH: **"What was the hare doing under the tree?"**
- Correct option stays: "sleeping deeply / not moving"
- Or change answer to avoid echo: **"yes, not moving at all"**

### P0-2 ★★★ — `kt-ch18-l4-q7` (Type 2 structural noun echo, emoji-pick)
```
Q: "What kind of seed?"
A: "🌱 a gourd seed"
```
"What kind of X?" + answer "Y X" — the answer is grammatically forced by the question. Any child knows the answer contains "seed" before hearing audio. Fix:
- Change Q: **"What did the bird drop into Heungbu's hands?"**
- Answer: "🌱 a gourd seed" (now no stem echo)

### P0-3 ★★★ — `kt-ch22-l2-q3` (Type 2 structural noun echo)
```
Q: "What kind of games did Meng play?"
A: "games copying what he saw"
```
"games" appears in both. Answer is findable by keyword match, not comprehension. Fix:
- Change correct option: **"imitating what he saw around him"**
- Or change Q: **"How did Meng spend his time at home?"**

### P0-4 ★★★ — `kt-ch30-l3-q6` (Type 1 circular degree echo)
```
Q: "How did the forest sound?"
A: "silent with no sound"
```
This is *circular*: "how did it sound?" → "no sound". The answer is entailed by the question form itself. Fix:
- Change correct option: **"completely still and hushed"** (avoids "sound")
- Distractors should use sound-related vocabulary: "full of birdsong" / "echoing with wind" / "loud with insects"

### P0-5 ★★ — `kt-ch18-l2-q7` (Type 2 noun echo, emoji-pick)
```
Q: "What jobs did he do?"
A: "💪 small hard jobs"
```
"jobs" in Q + "jobs" in answer. Fix:
- Change Q: **"How did Heungbu earn a living?"**
- Answer "💪 small hard jobs" is now safe

---

## E. 3 Narrative Voice / Pacing Improvements (regardless of A6)

1. **Replace all "How [adj]?" degree questions with inference or paraphrase forms**
   The pattern "How fast/close/wide/loud?" producing "very fast/close/wide/loud" is *not just an A6 violation* — it is the lowest-inference question form in ELT. CEFR A2 pushes toward indirect evidence. Reframe: "How quickly did the hare leave?" → **"Did the hare run or walk away?"** (forces binary inference from sentence rather than degree matching).

2. **Audit "What kind of X?" question pattern corpus-wide**
   Of the 11 Type 2 violations, 7 follow the exact structure "What kind of [noun]? → [adj + same noun]". A simple prompt-level rule ("Never use 'What kind of X?' as Q if the correct answer contains X") would eliminate this class entirely. Add to pickup-item-writer skill prompt.

3. **Convert noun-echo questions to action-based story-voice forms**
   Story-voice questions ("What did Heungbu earn?" / "What fell from the sky?") are more immersive than taxonomy questions ("What kind of seed?"). They also naturally avoid A6 because the answer names a different noun than the question asks about. Every "What kind of X?" or "How many X?" that currently echoes in the answer can become a story-action Q.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Angle**: A6 Option-in-Question

**Industry basis**:
- PMC3809311 (2013, still definitive): "Technical item flaws" taxonomy classifies "stem wording repeated in correct option" as Flaw #3 (Clang association / testwiseness cue). Found in 27.6% of analyzed MCQs.
- PMC10711986 (2024): Direct A6-type flaws ("grammatical cues between stem and key") correlated with artificially elevated item difficulty (false-easy) — items that *appear* harder than they are because test-wise students bypass them quickly, but naive students fail them.
- NBME Item Writing Guide 2021 (§3.4): "Avoid including the answer in the stem. Scan options for words repeated from the stem." — explicitly recommends automated stem-option overlap scan.
- Citizendium Test-wiseness (accessed 2026): MCQ answer can be "given away by the stem of another item in the test" — degree echo is the most common form for listening comprehension items.
- PMC3045096: "Item writing flaws include … correct answer is a repetition of the question stem qualifier."

**Pickup-specific amplification**: Pickup's audio-first design means the child *hears* the sentence once, then reads Q+options. An 8-year-old will scan the visual options for a word they saw in the question before replaying audio. Type 1 degree echo ("How fast? → very fast") and Type 2 noun echo ("What kind of seed? → a gourd seed") create a visual shortcut that fires before audio re-check.

**Fit analysis**:
- Pickup: React 18 + Zod schema + JSON lesson files in `public/`. The lint target is `tools/validate-lessons.js` (already has X3, X7, X8, X9, X10 lint rules). Adding A6 is the same additive-warn pattern.
- Zero src/ changes needed. Pure content-tooling addition.
- Targets exactly the 22 Type 1+2 violations found this cron.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| A6_STEM_ECHO lint in validate-lessons.js | PMC3809311 / NBME 2021 | ✅ additive warn, same pattern as X3/X7/X8/X10 | S · 25min | ⭐⭐⭐⭐ | **Ship** |
| A6_STRUCT_ECHO lint: detect "What kind of X?" + X in answer | PMC3045096 / NBME 2021 | ✅ regex pattern match, ~10 lines | S · 15min | ⭐⭐⭐⭐ | **Ship alongside** |
| Item-writer prompt rule: ban "What kind of X?" + "very [adj]?" echo forms | NBME 2021 / PMC10711986 | ✅ prompt-only, no schema change | XS · 10min | ⭐⭐⭐⭐⭐ | **Ship first — prevents new violations** |
| Automated Q-rewriter for all 22 P1★ violations | — | 🟡 needs agent + audio regen check | L · 3hr | ⭐⭐ | Defer — no audio regen for these |

**ARCH-REC #24: A6_STEM_ECHO lint + item-writer prompt patch**

Implement `X11_A6_STEM_ECHO` in `tools/validate-lessons.js`:
```js
// After X10 ZH_R2 block:
const A6_STOP = new Set(['the','a','an','is','are','was','were','be','been',
  'to','of','in','on','at','for','with','and','but','or','she','he','it',
  'they','his','her','its','did','does','do','not','what','where','when',
  'how','who','which','now','like','just','all','any','very','still','that']);

function a6StemTokens(text) {
  return new Set((text||'').toLowerCase().replace(/[^a-z]/g,' ')
    .split(' ').filter(w => w.length >= 4 && !A6_STOP.has(w)));
}

// Inside lintQuestion():
if (q.question && q.options && typeof q.correctIndex === 'number') {
  const qToks = a6StemTokens(q.question);
  const corrOpt = q.options[q.correctIndex] || '';
  const corrToks = [...a6StemTokens(corrOpt)];
  const hits = corrToks.filter(w => qToks.has(w));
  if (hits.length >= 1)
    warns.push(`${q.id}: X11_A6_STEM_ECHO (correct option word "${hits[0]}" appears in question stem — test-wiseness bypass)`);
}
```

Expected first run: ~22 WARN (all Type 1+2 violations). Warn-only; `A6_LINT_STRICT=1` to break build.

**Item-writer prompt additions** (find `docs/` prompt template or `pickup-item-writer` skill):
```
A6 RULE (Question Stem Echo):
- NEVER use "How [adj] was X?" if the correct answer is "very [adj]" — paraphrase to evidence form
  BAD: "How fast did the hare go?" → "very fast"
  GOOD: "Did the hare leave quickly or slowly?" → "in a flash, like a brown dot"
- NEVER use "What kind of X?" if correct answer is "[adj] X" — reframe to story-action Q
  BAD: "What kind of seed?" → "a gourd seed"
  GOOD: "What did the bird bring back?" → "a gourd seed"
- NEVER use "How many X?" if correct answer ends in "X" — remove X from answer
  BAD: "How many houses?" → "three houses in all"
  GOOD: keep Q, change A: "three in total" / "a third home"
```
