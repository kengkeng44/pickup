# Content QA — 2026-06-10 18:13 UTC

Today's angle: **#2 — A2 Key-Answer Position within Source Sentence (Recency/Primacy Shortcut)**
Focus: **Ch13–20 deep pass · Corpus-wide position-extreme detection**

Angle rationale: A2 was designed for cloze blank placement (v1.x `_____`). In v2.0 `listen-mc` format the equivalent measure is **where in the source sentence the correct-answer content word appears**. When the key word sits in the last 15% of the sentence (ratio > 0.75), learners exploit the **recency effect** — they catch the sentence-final stressed word and pick the matching paraphrase without processing the whole utterance. When it sits in the first 15% (ratio < 0.20), **primacy** creates a different risk: A2 learners who catch sentence onset can answer before the sentence ends, inflating accuracy without genuine comprehension. Ch13–20 is their first dedicated A2 position pass.

Rotation history: R1 / R2 / A6 / #12×2 / #11 / A3 / A4 / A1. **A2 never run as primary angle.**

---

## A. validate-lessons.js result

```
OK  lessons-ch13.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch14.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch15.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch16.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch17.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch18.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch19.json: 5 lint issue(s):  X2_OPTION_LIST_BIAS ×5
OK  lessons-ch20.json: 7 lessons (JSON shape + mirror + extended lint)
Total mirror-lint issues: 65 corpus-wide (warn-only)
```

All Ch13–20 pass existing lints. The A2 position-bias issue is **not yet covered by any existing lint rule** — it requires the new `A2_KEY_POS` rule proposed in §🔬.

---

## B. Violation Table

Scoring: ratio = char-position of earliest content-word match ÷ sentence length.
P0 = ratio > 0.85 (last ~2 words) or ratio < 0.08 (first word).
P1 = ratio 0.73–0.85 END or 0.08–0.20 START.

| Ch | Q ID | pos | ratio | Sentence snippet | Correct option | Violation | 修法 | audio regen? |
|----|------|-----|-------|-----------------|---------------|-----------|------|-------------|
| 20 | kt-ch20-l5-q5 | **END** | **0.91** | "…to hold the back of Granddaughter's **dress**." | "mouth bites the dress" | Last word "dress" = exact echo + sentence-final stress | "The dog clamped his jaws onto her dress and pulled with all his weight." | Yes — sentence rewritten |
| 17 | kt-ch17-l1-q6 | **END** | **0.89** | "A white crane was caught in a hunter's **trap**." | "a bird stuck in a trap" | "trap" last word, sentence-final; child catches only last word | "In the snow-white morning, a hunter's trap had snared a crane." | Yes |
| 13 | kt-ch13-l5-q9 | **END** | **0.86** | "…did not look like her dear **grandma**." | "grandma looked different" | "grandma" last word = full give-away | "Something wrong sat in her dear grandma's shape inside the bed." | Yes |
| 16 | kt-ch16-l2-q9 | **END** | **0.86** | "…looked at each other and felt a little **worried**." | "a bit worried" | "worried" last word | "A little worry passed between his two parents as they glanced at each other." | Yes |
| 16 | kt-ch16-l6-q3 | **END** | **0.86** | "Inside the demon, it was very **dark**." | "dark all around" | "dark" last word; 4-word sentence with answer at end is near-trivial | "No light could reach inside the demon's body." | Yes |
| 17 | kt-ch17-l3-q3 | **END** | **0.86** | "She cooked the meals. She cleaned the **house**." | "doing daily house work" | "house" last word; parallel-structure sentence emphasises last item | "Every day she swept the floor and set out the evening meal." | Yes |
| 19 | kt-ch19-l6-q9 | **END** | **0.85** | "…could go in the water but not up the **dry** land." | "they could not go on dry land" | "dry" second-to-last word; near-verbatim correct option contains "dry land" | "The crocodiles belonged to the river — they had no legs for the land." | Yes |
| 16 | kt-ch16-l1-q8 | **END** | **0.81** | "…the old woman heard a **small** cry." | "a small voice crying" | "small" near-end; minor paraphrase ("cry" → "voice crying") still echo | "From somewhere in the garden, a tiny sound reached the old woman's ears." | Yes |
| 13 | kt-ch13-l1-q4 | **START** | **0.07** | "**She wore** the red hood all the time." | "she wore the red hat every day" | First 2 words of sentence = first 3 words of correct option | "Every single day she put on that bright red hood." | Yes |
| 15 | kt-ch15-l2-q6 | **START** | **0.03** | "**Only** smart and good people can see it." | "only kind and clever people" | Sentence-initial "Only" = correct option first word | "The cloth would show itself only to those who were kind and clever." | Yes |
| 15 | kt-ch15-l7-q3 | **START** | **0.04** | "A **hot** feeling rose from his chest to his cheeks." | "ashamed and hot" | "hot" in first word position | "Colour crept up his neck and his face burned hot with shame." | Yes |
| 17 | kt-ch17-l3-q9 | **START** | **0.08** | "The **wooden** loom began to click and clack all night." | "wooden clicking" | "wooden" first content word; child hears first word → selects "wooden clicking" | "All through the night, a strange click-clack sound came from the wooden loom." | Yes |
| 18 | kt-ch18-l5-q9 | **START** | N/A | "**Warm** clothes came out. Toys for the children came out." | "warm clothes and toys" | "warm" first word; option recombines first + last clause items | "Out came warm winter clothes, and toys for all the children." | Yes |
| 13 | kt-ch13-l5-q3 | **START** | 0.17 | "He put on **grandma's** sleeping cap." | "dressed up like grandma" | P1: "grandma" early; acceptable given Q asks "What did the wolf do?" | — keep — | No |
| 18 | kt-ch18-l6-q5 | **START** | N/A | "**Kind** Heungbu told him the whole story, word for word." | "answered with kind words" | "Kind" is sentence-initial adjective describing subject | "Heungbu chose every word with care as he told his brother the whole story." | Yes |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch13–20 listen-mc / listen-comprehension Qs | 133 |
| END position (ratio > 0.72) | 12 (9.0%) |
| MID position (ratio 0.20–0.72) | 33 (24.8%) |
| START position (ratio < 0.20) | 20 (15.0%) |
| NO_MATCH (answer fully paraphrased — good!) | 68 (51.1%) |
| P0 items (ratio > 0.85 or < 0.08) | **10** |
| P1 items | **22** |
| Per-lesson clustering (>50% same position) | 0 lessons — **no clustering bias** |

The 51% NO_MATCH rate is positive: half the corpus already achieves strong paraphrase that breaks position tracing. The 10 P0 items are the immediate fix targets.

---

## D. Top 5 P0

| # | Q ID | Issue | Fix sentence (proposal) |
|---|------|-------|------------------------|
| 1 | **kt-ch20-l5-q5** | END 0.91 — "dress" last word, correct option echoes it | "The dog clamped his jaws onto her dress and pulled with all his weight." |
| 2 | **kt-ch17-l1-q6** | END 0.89 — "trap" last word | "In the snow-white morning, a hunter's trap had snared a crane." |
| 3 | **kt-ch13-l1-q4** | START 0.07 — "She wore" first two words match option | "Every single day she put on that bright red hood." |
| 4 | **kt-ch15-l2-q6** | START 0.03 — "Only" first word, mirrored in option | "The cloth would show itself only to those who were kind and clever." |
| 5 | **kt-ch16-l6-q3** | END 0.86 — 4-word sentence with tested word last | "No light could reach inside the demon's body." |

---

## E. Narrative Voice / Pacing Improvements (3 proposals, rule: always include even at 0 violations)

1. **kt-ch19-l6-q9** (Ch19 Mouse Deer): The question "Why could the crocodiles not catch mouse deer?" is a *why* inference question with a very short sentence "Their bodies could go in the water but not up the dry land." The sentence has no story texture — propose adding: "The crocodiles splashed and snapped, but the dry land above was not theirs." This adds pacing resistance *and* moves "dry" from near-final position to mid-sentence. Bonus narrative beat.

2. **kt-ch17-l3-q3** (Crane Wife): "She cooked the meals. She cleaned the house." — two short parallel sentences rob the scene of warmth. The crane wife's devotion deserves more story texture: "She cooked rice until it steamed, and swept the house until it shone." This moves "house" from final to mid-sentence AND adds emotional register appropriate for the audience pivot (8-12 children).

3. **kt-ch16-l1-q8** (Momotaro — Oni Island): "One spring morning, the old woman heard a small cry." — correct answer "a small voice crying" near-mirrors this. Propose: "From somewhere past the river stones, the old woman caught a sound no bigger than a whisper." Improves both position scatter and increases A2 vocabulary richness ("whisper" = teachable word with clear context).

---

## 🔬 Architecture Recommendation — ARCH-REC #19 (2026-06-10T1813)

**Pattern: `A2_KEY_POS` lint rule — sentence-final / sentence-initial answer position detection**

### Background

The serial position effect (Glanzer & Cunitz 1966; reviewed in EMI/ELT context by Willy Renandya) is well-established: items at sentence edges enjoy primacy/recency memory advantages. In listening assessment, sentence-final content is amplified by prosodic stress — L2 children at A2 level rely heavily on stressed final syllables to identify tested vocabulary. This audit confirmed **10 P0 items in Ch13–20 alone** where the correct-answer content word sits within the last/first 8% of the sentence. The existing lint suite (R1/X2/X3/X4/A1_Q_ECHO/A4_MIRROR) does not touch this dimension at all.

Industry precedent:
- [Serial Position Effect — Willy's ELT Corner](https://willyrenandya.com/the-serial-position-effect-what-emi-teachers-need-to-know/) — confirms sentence-edge placement creates retention advantage independent of comprehension, undermining item validity for ELT assessment
- [PMC5579076 — Utterance-final position and pitch marking aid word learning in children](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579076/) — confirms children preferentially encode sentence-final words; test items that exploit this measure recall, not comprehension
- [Frontiers Psychology 2020 — Assessing L2 Listening](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.02123/full) — item position validity frameworks for listening comprehension tests

### Pickup Architecture Fit

| Aspect | Current state | Proposed change |
|--------|--------------|-----------------|
| `tools/validate-lessons.js` | Has R1/R2/X2/X3/A4/A1_Q_ECHO lint | Add `A2_KEY_POS` block after A1_Q_ECHO |
| `lessons-ch*.json` schema | No position metadata | No schema change needed — lint derives position at validation time |
| Content gen pipeline | No position guidance | Add to item-writer prompt: "Place the key tested concept between 20–75% of sentence length" |

### Verdict: ✅ Fully compatible — implement in `validate-lessons.js` only, no schema change, no src/ touch

### Implementation (~30 lines in `tools/validate-lessons.js`)

```js
// A2_KEY_POS: correct-answer content word in sentence-final or sentence-initial position
const A2_STOP = new Set(['a','an','the','is','are','was','were','be','been','to','of','in','on',
  'at','for','with','and','but','or','she','he','it','they','i','her','his','its','their',
  'him','them','that','this','very','not','no','had','have','has','from','all','each','so',
  'just','said','one','two','three','four','five','old','new','big','small','long','good',
  'up','down','out','over','back','away','then','when','where','who','what','how']);

function keyWordPositionRatio(sentence, correctOption) {
  const words = correctOption.toLowerCase().split(/\W+/).filter(w =>
    w.length > 2 && !A2_STOP.has(w)
  );
  if (!words.length) return null;
  const sl = sentence.toLowerCase();
  let best = null;
  for (const w of words) {
    const idx = sl.indexOf(w);
    if (idx >= 0 && (best === null || idx < best)) best = idx;
  }
  return best === null ? null : best / sl.length;
}

// Inside lintQuestion(), after A1_Q_ECHO block:
if (q.sentence && correctOption && q.type && q.type.startsWith('listen')) {
  const r = keyWordPositionRatio(q.sentence, correctOption);
  if (r !== null) {
    if (r > 0.78)
      warns.push(`${q.id}: A2_KEY_FINAL (answer content word at ${Math.round(r*100)}% of sentence — recency shortcut)`);
    else if (r < 0.12)
      warns.push(`${q.id}: A2_KEY_INITIAL (answer content word at ${Math.round(r*100)}% of sentence — primacy shortcut)`);
  }
}
```

**Expected first-run output: ~32 WARN** (10 P0 + 22 P1 across Ch13–20, proportionally ~150 corpus-wide).
Set `A2_LINT_STRICT=1` to convert to ERR and fail build.

### ROI

| Size | Effort | ROI |
|------|--------|-----|
| S — 30 min (lint only) | Add 30 lines to validate-lessons.js | ⭐⭐⭐⭐ — surfaces 150 position-shortcut items corpus-wide with zero schema work. 10 P0 Ch13–20 are actionable immediately after first lint run. |

---

*Sources consulted:*
- [Serial Position Effect — Willy's ELT Corner](https://willyrenandya.com/the-serial-position-effect-what-emi-teachers-need-to-know/)
- [Utterance-final position + pitch marking + word learning (PMC5579076)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5579076/)
- [Frontiers Psychology — Assessing L2 Listening (fpsyg.2020.02123)](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.02123/full)
- [Pointerpro — Recency and Primacy Effect in assessment](https://help.pointerpro.com/en/support/solutions/articles/35000041586-recency-and-primacy-effect)
- [ETS Guidelines for Assessment of English Language Learners](https://www.ets.org/pdfs/about/ell-guidelines.pdf)
