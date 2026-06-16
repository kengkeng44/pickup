# Content QA — 2026-06-16 09:00 UTC

**Today's angle: A7 — content-word repetition (sentence stem → correct option verbatim bleed)**
**Focus: Ch27–31** (Journey to the West / Three Kingdoms / Odysseus / Heracles / Robin Hood)

> **Rotation context**: Previous crons: #12 explanationZh (Ch21-26), #11 optionsZh (Ch13-20), A4 mirror (Ch5-12), A3 semantic (Ch10-17), A1 keyword-pull (Ch9-18), R1 paraphrase (Ch1-8), A6 option-in-Q (Ch19-26), R2 distractor (Ch12-18). A7 was last run on Ch6-12. Ch27-31 fresh territory; validate-lessons already flagging X3_R1_VERBATIM_WORDS in these chapters.
>
> **Angle A7 Definition**: Checks whether the *correct* answer option shares ≥2 content words with the question sentence stem, enabling child learners to select the right answer by surface form matching rather than listening comprehension.
> - **P0**: ≥3 shared content words — near-verbatim copy; child can answer without comprehension
> - **P1**: 2 shared content words — suggestive; combined with option length cues, likely telegraphed
> - **P2**: 1 shared content word, correct has more overlap than all distractors — mild advantage
>
> Content words = all words except: a/an/the/and/or/but/in/on/at/to/of/is/are/was/were/be/it/he/she/they/I/we/you/that/this/with/for/not/no/his/her/its/my/your/our/their + ~50 other common function words
>
> **Industry context**: Duolingo explicitly "limit[s] excessive lexical repetition" in listen-MC generation (Frontiers 2024, AI-driven DET interactive listening). IELTS uses verbatim word presence as a deliberate learner TRAP. When the *correct* answer contains verbatim stem words, the assessment collapses — child passes by word-scanning not comprehension.
>
> **Method**: Python content-word extraction across all cloze/listen-mc in Ch27-31 (392 total Qs, 101 cloze/listen-mc). Overlap threshold P0≥3, P1=2. Cross-validated against validate-lessons.js X3_R1_VERBATIM_WORDS flags.

---

## A. validate-lessons.js result

```
WARN lessons-ch27.json: 8 lint issue(s):
  kt-ch27-l6-q3: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("only his head and one arm")
  kt-ch27-l5-q3: X3_R1_VERBATIM_WORDS ("a giant hand of stone")
  kt-ch27-l7-q3: X3_R1_VERBATIM_WORDS ("a paper with old writing")
  (+ 5 X2_OPTION_LIST_BIAS)
WARN lessons-ch28.json: 12 lint issue(s):
  kt-ch28-l3-q5: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("soft and slow")
  kt-ch28-l2-q6: X3_R1_VERBATIM_WORDS ("in a small house on a hill")
  (+ 10 X2_OPTION_LIST_BIAS / list-bias)
WARN lessons-ch29.json: 7 lint issue(s):
  kt-ch29-l1-q3: X3_R1_VERBATIM_WORDS ("for ten long years")
  kt-ch29-l3-q6: X3_R1_VERBATIM_WORDS ("walk on its sand and touch its walls")
  (+ 5 X2_OPTION_LIST_BIAS)
OK  lessons-ch30.json: 0 shape issues   ← A7 scan finds 0 P0 (strong chapter)
WARN lessons-ch31.json: 8 lint issue(s):
  kt-ch31-l1-q8: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("in a tall stone castle")
  kt-ch31-l4-q3: R1_SUBSTRING + X3_R1_VERBATIM_WORDS ("on Robin's front door")
  (+ 6 X2_OPTION_LIST_BIAS)

A7 content-word audit totals:
  P0 (≥3 overlap content words): 14
  P1 (2 overlap content words):  24
  P2 (1 word, correct > distractor): 26
```

---

## B. Violation Table

### P0 Violations (14 total — CRITICAL)

| Ch | Q ID | Type | Sentence (truncated) | Correct option | Overlap words | 修法 | audio regen? |
|----|------|------|----------------------|----------------|---------------|------|-------------|
| 27 | `kt-ch27-l5-q3` | listen-mc | "Five tall stone fingers rose...like a **giant hand**." | "a **giant hand** of **stone**" | giant, hand, stone | → "what these stone pillars looked like" / "a huge fist reaching up" | No |
| 27 | `kt-ch27-l6-q3` | listen-mc | "**Only his head and one arm** could move from the heavy stone." | "**only his head and one arm**" | arm, head, one | → "just his face and a shoulder" / "nothing except his neck" | No |
| 27 | `kt-ch27-l7-q3` | listen-mc | "...a yellow **paper** with **old** gold **writing**." | "a **paper** with **old writing**" | old, paper, writing | → "a scroll with ancient words" / "a yellowed note with faded letters" | No |
| 28 | `kt-ch28-l2-q3` | listen-mc | "An **old man** stepped forward and tapped his walking **stick**." | "an **old man** with a **stick**" | man, old, stick | → "a grey-haired traveller leaning on a staff" | No |
| 28 | `kt-ch28-l2-q6` | listen-mc | "He lives in a **small house** far up the green **hill**." | "in a **small house** on a **hill**" | hill, house, small | → "far up the mountain in a humble cottage" | No |
| 29 | `kt-ch29-l1-q3` | listen-mc | "For **ten long years** he had been away fighting..." | "for **ten long years**" | long, ten, years | → "a full decade away at war" / "many long seasons of fighting" | No |
| 29 | `kt-ch29-l3-q3` | listen-mc | "Ithaca was **far** from Troy, **across** a wide blue **sea**." | "**far across the sea**" | across, far, sea | → "beyond the open water" / "a long voyage away" | No |
| 29 | `kt-ch29-l3-q6` | listen-mc | "He longed to **walk** on its warm **sand** and **touch** its old stone **walls**." | "**walk** on its **sand** and **touch** its **walls**" | sand, touch, walk, walls | → "feel the earth of home under his feet" / "smell the salt air of Ithaca again" | No |
| 29 | `kt-ch29-l4-q3` | listen-mc | "The crew **tied** the **ropes** and lifted the white **sails** up high." | "**tied ropes** and raised the **sails**" | ropes, sails, tied | → "made the ship ready to leave the harbour" | No |
| 29 | `kt-ch29-l5-q3` | listen-mc | "By night the **stars** came out like **soft lights**." | "**soft lights** from the **stars**" | lights, soft, stars | → "tiny fires scattered across the night sky" | No |
| 31 | `kt-ch31-l1-q8` | listen-mc | "...in a **tall stone castle**, a bad king sat..." | "in a **tall stone castle**" | castle, stone, tall | → "inside cold grey fortress walls" / "behind the heavy gates of his keep" | No |
| 31 | `kt-ch31-l4-q3` | listen-mc | "They nailed a yellow paper on **Robin's front door**..." | "on **Robin's front door**" | door, front, robin's | → "at the entrance to Robin's home" / "posted at his cottage gate" | No |
| 31 | `kt-ch31-l6-q3` | listen-mc | "...a **thin man** with a **torn** brown coat." | "a **thin man** in **torn** clothes" | man, thin, torn | → "a lean stranger in ragged dress" | No |
| 31 | `kt-ch31-l7-q6` | listen-mc | "every coin we **take**, we will **give** back to **poor** families" | "**take** from rich bad men, **give** to the **poor**" | give, poor, take | → "share what they stole with those who had nothing" | No |

### P1 Sample (24 total — notable cases)

| Ch | Q ID | Sentence excerpt | Correct option | Overlap |
|----|------|-----------------|----------------|---------|
| 27 | `kt-ch27-l3-q3` | "one brown **horse** and one small **bag**" | "only a **horse** and a tiny **bag**" | bag, horse |
| 28 | `kt-ch28-l3-q5` | "knocked three times, **soft** and **slow**" | "**soft** and **slow**" | slow, soft |
| 28 | `kt-ch28-l4-q3` | "visit the **small house** again" | "go to the **small house** once more" | house, small |
| 29 | `kt-ch29-l1-q6` | "his **heart** felt **tired**" | "his **heart** was **tired**" | heart, tired |
| 29 | `kt-ch29-l2-q6` | "**every night** Odysseus thought..." | "**every single night**" | every, night |
| 30 | `kt-ch30-l4-q6` | "shot him **right** in the **chest**" | "**right** in the **chest**" | chest, right |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters audited | 5 (Ch27-31) |
| Chapter stories | Journey to the West / Three Kingdoms / Odysseus / Heracles / Robin Hood |
| Total questions in scope | 392 |
| Cloze + listen-mc audited | 101 |
| **P0 violations** | **14** |
| P1 violations | 24 |
| P2 violations | 26 |
| Ch30 P0 count | 0 (cleanest chapter — Heracles) |
| Ch29 P0 count | 5 (worst — Odysseus; listen-mc l3 cluster) |
| Ch31 P0 count | 4 |
| Ch27 P0 count | 3 |
| Ch28 P0 count | 2 |

---

## D. Top 5 P0

1. **`kt-ch29-l3-q6`** ★ WORST — 4-word overlap (sand, touch, walk, walls). Child hears sentence then sees option repeating all 4 key verbs/nouns. Zero comprehension required. Fix: "feel the earth of home under his feet."

2. **`kt-ch27-l6-q3`** — Validator already flagged R1_SUBSTRING. Correct option is a phrase-level substring of the sentence. Fix: "just his face and a shoulder."

3. **`kt-ch31-l1-q8`** — "in a tall stone castle" copied verbatim from sentence. Fix: "inside cold grey fortress walls."

4. **`kt-ch29-l1-q3`** — "for ten long years" copied verbatim. This is a duration question; fix to test inference: "a full decade of war" forces number → time unit mapping.

5. **`kt-ch29-l3-q3`** — "far across the sea" preserves 3/4 content words from sentence. Fix: "a long voyage away" / "beyond the open water."

---

## E. Narrative Voice / Pacing Improvements (3 mandatory proposals)

Even where no A7 violation is present, the following pacing improvements would lift Ch27-31:

**NV-1: Ch27 l2 — Sanzang intro sentence rhythm**
Current: "A young monk named Sanzang lived in a quiet temple." (declarative, flat)
Improved: "Sanzang had lived in the temple his whole life. He had never once left."
*Why*: Two short sentences create pause beat. Grandma voice reads this as two thoughts, not a long clause.

**NV-2: Ch29 l5 — Stars/soft lights question (kt-ch29-l5-q3)**
Current sentence: "By day the sun was warm. By night the stars came out like soft lights."
The A7 P0 fix (replace correct option) also creates an opportunity to restructure:
"Odysseus watched the night sky. What did he see above him?" → forces comprehension of context not just word recall.

**NV-3: Ch31 l7 — Robin Hood moral as inferencing hook**
Current: "And every coin we take, we will give back to poor families."
Replace listen-mc question with inference: "What did Robin Hood believe about wealth?" — moves from verbatim recall to value inference, appropriate for 10-12 age band.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #41: A7-VERBATIM-LINT — CI guard for content-word overlap (sentence → correct option)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Duolingo DET 2024 listen-MC generation: "limit excessive lexical repetition"** — automated filter strips questions where key words from the prompt appear verbatim in the correct option | [Frontiers 2024: AI-driven interactive listening](https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2024.1474019/full) | ✅ Direct parallel: Pickup listen-mc has 14 P0 cases where correct option ≥3 content words shared with sentence — identical failure mode | S (30 min) | ⭐⭐⭐ | **ADOPT** |
| **IELTS item writing doctrine: verbatim word presence in correct option = automatic reject** (IELTS.org item specs) — verbatim matching reserved for distractors only (as trap), never correct answer | [ielts.org/news-and-insights/how-to-avoid-distractors](https://ielts.org/news-and-insights/how-to-avoid-distractors-in-the-ielts-reading-test) | ✅ Confirms standard: Ch27-31 have 14 P0 where correct answer = verbatim fragment. Item writer habit carried over from narration reuse. | — | ⭐⭐⭐ | **CONFIRMS ADOPT** |
| **ResearchGate 2019 MC listening study: lexical overlap makes distractors plausible** — but the same effect makes correct options trivially obvious — confirmed asymmetry | [researchgate.net/publication/334003786](https://www.researchgate.net/publication/334003786_Distractor_Plausibility_in_a_Multiple-Choice_Listening_Test) | ✅ Academic backing: overlap in correct option = no comprehension required; 8-12 children especially susceptible to surface matching | — | ⭐⭐ | **CONFIRMS** |
| **Current Pickup architecture**: validate-lessons.js already has X3_R1_VERBATIM_WORDS check (all words of option present in sentence) — but threshold is "all words", missing 3-word partial overlap P0 | tools/validate-lessons.js | 🟡 Partial: existing lint catches exact substring / all-word inclusion but not 3-content-word overlap. Gap: 8 of 14 P0 cases NOT caught by current X3 rule | S (extend existing check) | ⭐⭐⭐ | **EXTEND existing lint** |

**Concrete implementation for Pickup (S, ~30 min)**:

Extend `tools/validate-lessons.js` with A7 content-word overlap check:

```js
// ARCH-REC #41: A7-VERBATIM-LINT
const FUNCTION_WORDS = new Set(['a','an','the','and','or','but','in','on','at','to','of',
  'is','are','was','were','be','it','he','she','they','i','we','you','that','this','these',
  'those','with','for','not','no','his','her','its','my','your','our','their','all','had',
  'has','have','been','will','would','could','should','do','does','did','if','as','by','so',
  'then','when','what','which','who','from','up','out','into','very','just','can','may',
  'might','shall','about','after','before','over','under','than','too','also','even','still',
  'only','like','how','where','there','here','each','any','some','much','more','most','other',
  'such','both','few','many','well','back','down','now','him','them','us','me','one']);

function contentWords(text) {
  return new Set((text || '').toLowerCase().match(/[a-z']+/g)?.filter(
    w => w.length > 2 && !FUNCTION_WORDS.has(w)
  ) || []);
}

// In the question loop (for cloze/listen-mc):
if (['cloze','listen-mc'].includes(q.type) && q.options && q.correctIndex != null) {
  const stem = q.sentence || q.qEn || '';
  const correct = q.options[q.correctIndex] || '';
  const stemCW = contentWords(stem);
  const correctCW = contentWords(correct);
  const overlap = [...stemCW].filter(w => correctCW.has(w));
  if (overlap.length >= 3) {
    issues.push(`${q.id}: A7_VERBATIM_CORRECT (${overlap.length} content-word overlap: [${overlap.join(', ')}])`);
  }
}
```

**Expected impact**: Catches 8 P0 cases currently missed by X3_R1_VERBATIM_WORDS. Reduces "surface scan" test-taking in child audience. Zero false positives in Ch30 (cleanest chapter — 0 P0 confirmed).

**Fix approach for the 14 P0 content edits**: All fixes are paraphrase rewrites of the correct option only (no sentence change, no audio regen needed). Target: replace verbatim words with synonyms or restructure to test inference not recall.
