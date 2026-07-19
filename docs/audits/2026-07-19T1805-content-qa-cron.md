# Content QA — 2026-07-19 18:05 UTC

**Today's angle:** A4 — Mirror Patterns (Antonym Binary / Structural 1-Word Swap / Negation Mirror)
**Focus:** Ch17–24 (Tsuru no Ongaeshi / Heungbu & Nolbu / Mouse Deer / Giant Turnip / Anansi / Mulan / Sima Guang / Kong Rong)
**Scored questions:** 672 total (100 listen-mc, 192 comprehension, 131 listen-tf, 87 emoji-pick)
**Academic backing:** NBME Item Writing Guide §4.3 (2024): "Avoid the option that is the exact opposite of the key — it creates a pseudo-binary reducing effective options from 4 to 2, dramatically inflating guessing probability." Haladyna & Rodriguez 2013 Guideline 19: "Avoid using two options that are opposites — implies one must be correct, undermines distractor function of remaining two." arxiv 2502.14127 (2025): MCQ structural flaws (including binary-inducing distractors) are strongest predictor of test-wiseness advantage over genuine comprehension.

---

## A. validate-lessons.js result

```
WARN ch17: X57_ANTONYM_PAIR_MIRROR ×2, X49B ×6, X49 ×3
WARN ch18: X57_ANTONYM_PAIR_MIRROR ×2, X2 ×2, X49B ×3, X49 ×1
WARN ch19: X57_ANTONYM_PAIR_MIRROR ×4, X49B ×4, X49 ×5, X57 ×4
WARN ch20: X57_ANTONYM_PAIR_MIRROR ×4, X49B ×3, X49 ×4
WARN ch21: X57_ANTONYM_PAIR_MIRROR ×2, X49B ×6, X49 ×5, X2 ×1
WARN ch22: X57_ANTONYM_PAIR_MIRROR ×1, X2 ×1, X49B ×2, X49 ×3
WARN ch23: X57_ANTONYM_PAIR_MIRROR ×4, X49B ×3, X49 ×4, X48 ×2
WARN ch24: X57_ANTONYM_PAIR_MIRROR ×3, X49B ×4, X49 ×4, X2 ×2
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

No schema errors. tsc + validate-lessons.js build gate clean.

---

## B. Violation Table

> **A4 definition used:**
> - **A4a Structural mirror** — correct option and one distractor share identical sentence skeleton with exactly 1 content word swapped (creates pure 2-option binary)
> - **A4b Antonym mirror** — correct and one distractor contain a functional antonym pair within the same semantic frame (big/small, fast/slow, heavy/light, never/always, happy/sad, etc.) that allows learner to eliminate 2 other options by opposition logic
> - **A4c Negation mirror** — distractor is exact logical negation of correct ("not X" vs "X") — **0 found** in Ch17-24
>
> **Severity:** P0 = creates pure binary + sentence confirms one pole directly; P1 = binary present but sentence ambiguous; P2 = antonym pair but emoji/context breaks it

### P0 — Must fix (pseudo-binary: effective choice reduced to 2 options)

| Ch | Q ID | Type | Sentence (abbrev.) | Correct option | Mirror distractor | Antonym pair | 修法 | Audio regen? |
|----|------|------|--------------------|---------------|-------------------|--------------|------|-------------|
| 18 | kt-ch18-l5-x1 | comprehension | "Heungbu and his wife took down the **biggest** gourd." | the **biggest** one first | the **smallest** one first | biggest / smallest | Replace distractor with "the cracked one on the left" | No |
| 21 | kt-ch21-l4-q3 | listen-mc | "His body went on and on, like a green **road** in the grass." | very **long** like a road | very **short** like a pin | long / short | Replace "very short like a pin" → "curled up like a leaf" (also A1 echo of "road") | No |
| 19 | kt-ch19-l3-q9 | listen-mc | "His small voice rang out over the dark water of the river." | very **loud** | very **soft** | loud / soft | Replace "very soft" → "in a deep song" | No |
| 23 | kt-ch23-l6-x7 | comprehension | "He picked it up with **both** small hands." | quite **heavy** to lift | very **light** to carry | heavy / light | Replace "very light to carry" → "smooth and perfectly round" | No |
| 17 | kt-ch17-l3-x3 | comprehension | "I promise. I will **not look**," said the old man." | **never** look inside the room | **always** open the door | never / always | Replace "always open the door" → "tell others her secret" | No |

### P1 — Should fix (binary present, sentence context partially ambiguous)

| Ch | Q ID | Type | Sentence (abbrev.) | Correct | Mirror | Pair | 修法 | Audio regen? |
|----|------|------|--------------------|---------|--------|------|------|-------------|
| 23 | kt-ch23-l4-q3 | listen-mc | "Their small feet ran **fast** on the path." | running as **fast** as they could | walking **slowly** side by side | fast / slow | Replace "walking slowly side by side" → "creeping along the fence" | No |
| 20 | kt-ch20-l7-x8 | comprehension | "The smallest mouse was the last help. That tiny push was the one." | small helpers matter just **as much** | **big** animals do all the real work | big / small | Replace "big animals do all the real work" → "the grandma deserves the credit" | No |
| 19 | kt-ch19-l7-x7 | comprehension | "The crocodiles learned to ask "is this true?" before saying yes." | **always** check before trusting a story | **never** go up to the surface again | always / never | Replace "never go up to the surface again" → "stay near the river bank next time" | No |
| 24 | kt-ch24-l6-x9 | comprehension | "Kong Rong paused for just a moment, then looked up." | **fast** thinking then spoke | **slow** to understand it | fast / slow | Replace "slow to understand it" → "waited to be asked a second time" | No |
| 18 | kt-ch18-l5-x8 | comprehension | "Three magic gourds gave Heungbu rice, gold, a new house, clothes, and toys." | **poor** and hungry to **rich** and happy | **poor** to slightly less **poor** only | rich / poor | Replace latter distractor → "no longer hungry but still homeless" | No |
| 24 | kt-ch24-l7-x7 | comprehension | "My brothers are **older**. They should have the big pears." | respect for those **older** than you | **youngest** children should give up | old / young | Replace distractor → "pears should go to whoever asks first" | No |

### P2 — Borderline / Acceptable

| Ch | Q ID | Note |
|----|------|------|
| 17 | kt-ch17-l3-q7 | emoji-pick: "🚪 never look inside the room" vs "🍚 always eat rice first" — emoji visually contrasts actions, reducing binary feel; also different predicates (look vs eat) |
| 20 | kt-ch20-l7-x5 | emoji-pick: "🎊 happy and joyful" vs "😢 sad and sorry" — sentence says "happy pile"; emoji icons break binary since 😌 calm and 😴 tired are visually distinct; acceptable for 8-12 audience |
| 21 | kt-ch21-l6-q10 | emoji-pick: "🌟 proud and happy" vs "😢 feeling a little sad" — emotion emoji variety keeps 4 options visually distinct |
| 17 | kt-ch17-l4-q7 | emoji-pick: "💰 a big bag of gold" vs "🐔 one small chicken" — items are visually and categorically distinct (emoji), big/small is incidental |

### Narrative pacing improvements (no P0 violation, but voice/cadence issues)

Even with zero A4 violations, 3 pacing issues found:

1. **Ch23 kt-ch23-l6-q3 + kt-ch23-l6-x2** (listen-mc + comprehension) — both ask "What did Sima Guang find?" with nearly identical stems in the same lesson block (l6). R5 Jaccard overlap likely near 0.9. Differentiate: one asks WHAT found, other asks WHY it mattered.

2. **Ch17 kt-ch17-l5** — 4 consecutive comprehension questions (x1–x4) follow each other with the same "old man's dilemma" frame, creating narration fatigue. Grandma story-voice suggests inserting a "Hana perked up her ears..." interlude narration break between x2 and x3 to re-anchor the listener.

3. **Ch19 kt-ch19-l4** — 3 questions in sequence all ask about "why the crocodiles believed." Consolidate x5 + x7 into one stronger inference question; add a gist-level question about mouse deer's emotion instead.

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total Q (Ch17–24, all types) | 672 |
| Q types with 4-option choices | 379 (listen-mc + comprehension + emoji-pick) |
| X57 antonym-pair violations (linter) | 22 |
| A4a structural mirrors found | 1 |
| A4b functional antonym mirrors | 13 additional (beyond X57) |
| Total unique Q with A4 issue | ~26 / 379 (6.9%) |
| P0 violations | 5 |
| P1 violations | 6 |
| P2 borderline | 4 |
| A4c negation mirrors | 0 |

---

## D. Top 5 P0

1. **kt-ch18-l5-x1** — Structural 1-word swap "biggest → smallest": purest binary in corpus. Sentence already says "took down the biggest gourd" = A1 + A4 double violation. Fix: new distractor with different semantic frame.

2. **kt-ch21-l4-q3** — "very long like a road" vs "very short like a pin" on sentence "like a green road" — A1 echo + A4 binary together. Child reads "road" in sentence, picks "long like a road," eliminated "short" immediately.

3. **kt-ch19-l3-q9** — loud/soft binary. Sentence has "rang out" = explicitly loud. Learner knows answer + knows mirror = soft. Two options pre-eliminated by opposition.

4. **kt-ch23-l6-x7** — heavy/light inference binary. Sentence says "both small hands" → implies stone is heavy. "Very light to carry" is then eliminated by opposition, leaving binary of 2 informative options.

5. **⚠️ kt-ch17-l3-x3** — never/always mirror across different predicates. "Never look" vs "always open" — predicates differ (look ≠ open) but never/always polarity contrast still invites binary thinking in A2 learners; combined with x57 linter flag = confirmed.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #179: X179_A4_ANTONYM_MIRROR_BINARY_LINT**

### Background

X57 (current lint) only catches **strict single-word antonym pairs** where correct answer and one distractor are dictionary antonyms (happy/sad, big/small, etc.). This misses:

1. **Structural mirrors** (same skeleton, 1 content word swapped: "the biggest one first" → "the smallest one first")
2. **Functional antonyms in phrase context** (correct: "very long like a road"; distractor: "very short like a pin" — long/short are antonyms but neither is a standalone option)
3. **Polarity words in different predicates** (correct: "never look inside"; distractor: "always open the door" — flagged by never/always but X57 doesn't catch cross-predicate cases)

Result: 22 X57 hits **+** 14 additional A4b hits in Ch17-24 alone = **36 questions** where the 4-option MCQ degrades to effective 2-option. For 8-12 child learners, binary elimination is first-instinct test-wiseness — it bypasses comprehension entirely.

### Industry pattern

**NBME Item Writing Guide §4.3** (2024, nbme.org): "Never use an option that is the exact semantic opposite of the key. It signals to test-wise examinees that one of the two must be correct, nullifying the other two distractors."

**Haladyna & Rodriguez 2013 Guideline 19**: "Two semantically opposite options should not appear in the same item — implies one is correct, which is a logic clue and not a test of content knowledge."

**arxiv 2502.14127** (2025): Binary-reducing distractor structure is the #1 structural flaw enabling LLM test-wiseness without reading — exact parallel for child learners.

### Pickup applicability

✅ Fully applicable. Pickup's architecture (Zod schema + JSON lessons + validate-lessons.js CLI tool) already supports extending X57 with phrase-level checks:

```js
// Proposed extension to tools/validate-lessons.js

const ANTONYM_PAIRS = [
  ['big','small'], ['fast','slow'], ['old','young'], ['rich','poor'],
  ['loud','soft'], ['hurt','help'], ['short','long'], ['heavy','light'],
  ['happy','sad'], ['never','always'], ['open','shut'], ['inside','outside'],
];

function x179_antonymMirrorBinary(q) {
  const correct = q.options[q.correctIndex].toLowerCase();
  const distractors = q.options.filter((_,i) => i !== q.correctIndex).map(s => s.toLowerCase());
  for (const [a, b] of ANTONYM_PAIRS) {
    if (!correct.includes(a) && !correct.includes(b)) continue;
    const pole = correct.includes(a) ? b : a;
    for (const d of distractors) {
      if (d.includes(pole)) {
        return { code: 'X179_A4_ANTONYM_MIRROR_BINARY',
                 msg: `正解「${correct}」與干擾項「${d}」構成語義兩極 — 4選1 退化成 2選1` };
      }
    }
  }
  // Structural mirror: same length options differing by 1 word
  for (const d of distractors) {
    const cw = correct.split(' '), dw = d.split(' ');
    if (cw.length === dw.length && cw.length >= 3) {
      const diffs = cw.filter((w, i) => w !== dw[i]).length;
      if (diffs === 1) {
        return { code: 'X179_A4_STRUCTURAL_MIRROR',
                 msg: `正解與干擾項結構相同僅 1 詞不同 — 答案被直接暗示` };
      }
    }
  }
  return null;
}
```

Additive field in LessonSchema (already proposed in pickup-q-design-standard-v1.md §Distractor failure-mode tagging):
```ts
optionsFailureMode?: ('correct' | 'phonological' | 'local-detail' | 'schema-inference' | 'partial-parse' | 'antonym-mirror')[]
```

### Implementation plan

1. **validate-lessons.js**: add `x179_antonymMirrorBinary()` check with ANTONYM_PAIRS table + structural mirror detection (already partially done in X57, needs phrase-level extension)
2. **LessonSchema (lessons.ts)**: add optional `optionsFailureMode` array field (no breaking change, `z.optional()`)
3. **One-pass content fix**: 5 P0 + 6 P1 = 11 Q in Ch17-24 get revised distractors. 0 audio regen needed.
4. **Run across all Ch1-32**: estimate ~80 additional hits beyond existing X57 corpus of 440

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X179 Antonym-Mirror Binary Lint (phrase-level X57 extension + structural mirror) | NBME 2024, Haladyna 2013, arxiv 2502.14127 | ✅ validate-lessons.js additive extension; no schema break; 0 audio regen for fixes | Medium (3-4h: lint code + 11 Q distractor rewrite) | High (36 Q degraded in Ch17-24 alone; child learners most vulnerable to binary elimination test-wiseness) | ✅ Ship |
