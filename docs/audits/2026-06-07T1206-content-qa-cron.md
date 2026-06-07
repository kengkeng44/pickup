# Content QA — 2026-06-07 12:06 UTC

Today's angle: **#8 — A6 Option-in-Question (correct answer words appear verbatim in sentence/questionEn)**
Focus: **Ch6 (六隻天鵝 / Six Swans) + Ch7 (葉限 / Yexian)**

Definition: A6 fires when a learner can bypass comprehension by scanning for the option whose content words appear verbatim in the sentence — no listening or inference required, just keyword matching.

Severity scale:
- **P0**: correct option IS a verbatim substring of sentence (R1 + A6 combined)
- **P1**: ≥1 key content word(s) of correct option found in sentence; or ≥60% content-word overlap

---

## A. validate-lessons.js result

```
OK lessons-ch6.json: 7 lessons (JSON shape + mirror + extended lint)
OK lessons-ch7.json: 7 lessons (JSON shape + mirror + extended lint)

Total mirror-lint issues: 25 (across all chapters, warn-only)
```

Ch6 and Ch7 pass schema + mirror guards. All A6 issues below are **above lint threshold** — audit-only catch.

---

## B. Violation Table

### Automated scan (P1)

| Ch | Q ID | Severity | Sentence snippet | Correct option | Matching word(s) | Violation |
|----|------|----------|-----------------|----------------|-----------------|-----------|
| Ch6 | kt-ch6-l1-q6 | P1 | "...picked soft yellow **flowers**." | "gather **flowers**" | flowers | A6 keyword echo — "flowers" verbatim in sentence; student matches by scanning, not understanding "picked→gather" |
| Ch6 | kt-ch6-l2-q10 | P1 | "There were **six brothers**." | "for the **six brothers**" | six, brothers | A6 phrase echo — "six brothers" is the literal subject of the sentence; option is trivially detectable |
| Ch6 | kt-ch6-l5-q5 | P1 | "...and **made** her the lady..." | "**made** her his bride" | made | A6 verb echo — "made her" in both sentence and correct; weaker but directional |
| Ch6 | kt-ch6-l5-q9 | P1 | "...whispered **cold** things about the bride." | "**cold** and unkind" | cold | A6 adjective echo — "cold" appears in the sentence as a descriptor of the woman's behaviour |
| Ch7 | kt-ch7-l1-q9 | P1 | "The new wife only smiled at her **own** child." | "her **own** daughter" | own | A6 adjective echo — "own" is uncommon enough to be a tell; "her own child" vs "her own daughter" is near-verbatim |
| Ch7 | kt-ch7-l3-q7 | **P1★** | "No one said where the **fish** had come from." | "where the **fish** came from" | fish, where, from | **Strongest violation** — correct option reconstructs the sentence's embedded clause almost word-for-word; "where the fish had come from" → "where the fish came from" is a tense-only change, not a paraphrase |
| Ch7 | kt-ch7-l6-q7 | P1 | "The shoe lay on the **road**..." | "a stranger on the **road**" | road | A6 location echo — "road" is the sole location word; option reuses it verbatim |

### Manual deep-check (additional P1)

| Ch | Q ID | Severity | Sentence snippet | Correct option | Content-word overlap | Violation |
|----|------|----------|-----------------|----------------|---------------------|-----------|
| Ch6 | kt-ch6-l7-q5 | P1 | "She **threw** one over **each** bird." | "**threw** one on **each** swan" | threw, each (67%) | A6 + weak-R1 — same verb "threw" + "each" reused; "bird→swan" is specific-term substitution, not paraphrase |
| Ch7 | kt-ch7-l4-q5 | P1 | "...under the heap **by the gate**." | "under a pile **by the gate**" | under, gate (67%) | A6 phrase echo — "by the gate" copied verbatim; only "heap→pile" was paraphrased, rest is identical |
| Ch6 | kt-ch6-l1-q9 | P1-soft | "...could not find **sleep**." | "**sleepless** and sad" | sleep↔sleepless | Semi-R1 morphological — "sleepless" is a direct derivation of "sleep"; learner can word-form match without comprehension |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total listen-mc / listen-comprehension Qs audited | 43 (Ch6: 28, Ch7: 15) |
| P0 violations (verbatim substring) | 0 |
| P1 violations (automated) | 7 |
| P1 violations (manual deep-check) | 3 |
| **Total violations** | **10** |
| Severity breakdown | 0 P0 / 10 P1 |
| Audio regen needed | 0 (no sentence text changed — fixes are to options only) |

---

## D. Top 5 P0 (Most Critical)

> Ranked by how easily a test-wise student can bypass listening

### 1. ⚠️ kt-ch7-l3-q7 — Near-verbatim clause reproduction

```
Sentence:  "No one at the table said where the fish had come from."
Correct:   "where the fish came from"
Distractors: "the dress" | "the new wife's name" | "the village name"
```

The correct option is the embedded `wh`-clause of the sentence with only a tense change (`had come` → `came`). Any learner who hears "where the fish" in the sentence can select this option without understanding what was NOT said at the table. The 3 distractors are also thematically unrelated to fish (two are names), making elimination trivial.

**修法**: Change correct to `"the fish's origin"` or `"how the fish appeared on the table"`. Rework distractors to cover plausible story detail (e.g. "when the new wife arrived" / "where Yexian had been" / "how the fish had grown").

### 2. ⚠️ kt-ch6-l2-q10 — "six brothers" phrase echo

```
Sentence:  "There were six brothers. There were six shirts. She had made them in secret."
Correct:   "for the six brothers"
```

The sentence opens with "There were six brothers" and the correct option begins with "for the six brothers" — exact phrase echo. The comprehension target (inferring *why* she secretly made shirts) is valid, but the correct option recycles the most salient noun phrase from the sentence, nullifying the inference demand.

**修法**: Change correct to `"to free her siblings"` or `"to break the spell on them"`. This forces the learner to understand the story motivation (the shirts break the swan curse), not just echo the sentence.

### 3. ⚠️ kt-ch7-l4-q5 — "by the gate" verbatim phrase

```
Sentence:  "The bones of your fish lie under the heap by the gate."
Correct:   "under a pile by the gate"
```

"Heap→pile" is a good synonym substitution, but the phrase "by the gate" is copied verbatim. A learner who hears only "gate" can eliminate all other options (pond / roof / well — none contain "gate"). R1 compliance requires full paraphrase.

**修法**: Change correct to `"near the entrance pile"` or `"buried under the gate mound"`. Keep distractors spatially plausible: "inside the house" / "near the water" / "behind the barn".

### 4. ⚠️ kt-ch6-l7-q5 — Same verb + same quantifier (threw + each)

```
Sentence:  "She lifted the small white shirts and threw one over each bird."
Correct:   "threw one on each swan"
```

Two content words ("threw", "each") are shared between sentence and correct option. "Bird→swan" is merely a referent substitution, not a paraphrase. A learner who hears "threw" and "each" can identify the correct option immediately.

**修法**: Change correct to `"placed a shirt on every swan"` or `"covered each swan with white cloth"`. This replaces "threw" with "placed/covered" and "each" with "every" — sufficient lexical distance.

### 5. ⚠️ kt-ch6-l5-q9 — Descriptor echo: "cold"

```
Sentence:  "Each day the older woman whispered cold things about the bride."
Correct:   "cold and unkind"
```

"Cold" is the key descriptor in the sentence. All a student needs is to hear/read "cold" in the sentence and scan for the option containing "cold". The comprehension target (characterising the woman's behaviour) is lost because the adjective is already given.

**修法**: Change correct to `"cruel and jealous"` or `"bitter and spiteful"`. These require the learner to map "whispered cold things" to a character trait — genuine inference.

---

## E. Narrative Voice / Pacing Improvements

*(Required even with 0 R1-R8 violations — 3 minimum per directive)*

### E1 — "Open glass" is unnatural English (Ch6-l3 narration sentence)

```
Current:  "The six swans flew out of the open glass and away from the castle."
Problem:  "open glass" = incorrect collocation; glass is the material, not the aperture.
```

A2 learners reading/hearing this will be confused — "glass" means a drinking vessel or the material, not a window. Correct English: "open window" or "open window pane." The sentence is in a narration entry, so this is heard aloud by the TTS; misparsed collocations erode listening trust.

**Suggested fix**: `"The six swans flew out through the open window and away from the castle."`
**Audio regen**: Yes (narration sentence is TTS-voiced; new MP3 needed if changed).

### E2 — All listen-mc Qs have empty questionEn (both chapters)

Every `listen-mc` entry in Ch6 and Ch7 has `questionEn: ""`. The spec (R2) describes listen-mc as: sentence → question → A-D options. Without a question, the learner hears the sentence, then sees 4 options and must guess *what is being asked* from the distractor set alone.

This degrades the Duolingo Stories experience: in Duolingo, question prompts frame each comprehension challenge ("What does she do?", "Where does he go?"). Without `questionEn`, the comprehension load is replaced by meta-inferential load (guessing the question from the options).

**Suggested fix (batch)**: Add 1-sentence `questionEn` to all 43 listen-mc Qs across Ch6-Ch7. Example:
- kt-ch6-l1-q6: `"What does the girl do in the trees?"`
- kt-ch6-l2-q10: `"Why did she make the shirts in secret?"`
- kt-ch7-l3-q7: `"What did no one at the table mention?"`

This is the largest narrative UX gap in both chapters.

### E3 — Ch7 has only 3 MC/comp Qs per lesson vs Ch6's 4 (pacing inconsistency)

| Chapter | Lessons | Avg MC/comp Qs/lesson |
|---------|---------|----------------------|
| Ch6 (六隻天鵝) | 7 | 4.0 |
| Ch7 (葉限) | 7 | 3.0 (L1, L2, L3, L4, L5, L6, L7 all = 3) |

Ch7's lessons have one fewer comprehension challenge per lesson than Ch6. For a 7-lesson chapter, this is 7 fewer questions overall — equivalent to losing a full lesson of practice. The Yexian story has rich vocabulary (金鞋, 骨頭, 洞節) that would benefit from an additional MC question per lesson, particularly vocab-type (listen-emoji) or inference-type.

**Suggested fix**: Add one MC/comp Q per Ch7 lesson targeting inference or cultural-vocab. Priority lessons: L3 (fish/dress switch — rich inference moment) and L5 (gold shoes appearing — key transformation scene).

---

*Audit completed 2026-06-07 12:06 UTC | Angle: A6 option-in-question | Focus: Ch6 + Ch7*
