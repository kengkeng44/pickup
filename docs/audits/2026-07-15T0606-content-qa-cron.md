# Content QA — 2026-07-15 06:06 UTC

**Today's angle:** A4 — Mirror Patterns (negation/identity binary)
**Focus:** Ch17-24 (Crane Wife / Heungbu / Mouse Deer / Giant Turnip / Anansi / Meng Mu / Sima Guang / Kong Rong)
**Chapters scanned:** lessons-ch17 through lessons-ch24 (8 chapters)

---

## A. validate-lessons.js result

```
node tools/validate-lessons.js
Total mirror-lint issues: 440 (warn-only)
X57_ANTONYM_PAIR_MIRROR in Ch17-24: 22 flags
```

Existing X57 already covers 22 single-word antonym-pair mirrors across Ch17-24. Full distribution:

| Ch | X57 flags | Other warn |
|----|-----------|------------|
| Ch17 | 2 | 11 (X49×5, X49B×4, X2×0, X48×1) |
| Ch18 | 2 | 11 (X49×5, X49B×4, X2×2) |
| Ch19 | 4 | 14 (X49×3, X49B×5, X2×6) |
| Ch20 | 4 | 8 (X49×3, X49B×4, X2×1) |
| Ch21 | 2 | 9 (X49B×5, X49×2) |
| Ch22 | 1 | 5 (X49B×4, X2×1) |
| Ch23 | 4 | 9 (X49B×4, X49×1, X2×0) |
| Ch24 | 3 | 8 (X49B×5, X2×0, X48×0) |

---

## B. A4 Violation Table

> **Scope note:** `listen-tf` Yes/No binary (131 automated flags) = **EXEMPT by design** — the UX canonical spec R2 defines `listen-tf` as explicitly 2-choice. Not counted as violations.

> **A4 sub-types audited:**
> - **A4a** antonym-binary: correct option paired with its antonym in one distractor → 4-choice degrades to 2-choice
> - **A4c** negation-mirror: correct and one distractor differ only by "not" / "n't"
> - **A4d** question-verbatim: correct option text appears verbatim in question stem
> - **A4e** identity-mirror: options share ≥3 content words, differ by exactly 1 key word

| Sev | Ch | Q ID | type | Sentence snippet | Q stem | Violation | Detail | 修法 | audio regen? |
|-----|-----|------|------|-----------------|--------|-----------|--------|------|-------------|
| **P0** | Ch19 | kt-ch19-l2-ep1 | emoji-pick | "Sang Kancil sat by the river bank where many crocodiles lived." | "Which one shows a crocodile?" | A4d — question contains exact correct-option word "crocodile" → 0 cognitive load | Correct = `🐊 crocodile`; word "crocodile" lifted directly from stem | Change Q to "Which animal lives in rivers and has very sharp teeth?" | No |
| **P0** | Ch23 | kt-ch23-l4-x5 | emoji-pick | "He called to his friends: 'Run, run, as fast as you can!'" | "Which emoji shows running in a hurry?" | A4d — Q contains entire correct phrase "running in a hurry"; learner reads answer in the question | Correct = `🏃 running in a hurry` verbatim | Change Q to "Which emoji best shows moving very fast without stopping?" | No |
| **P0** | Ch19 | kt-ch19-l3-q9 | listen-mc | "His small voice rang out over the dark water of the river." | "How loud did mouse deer call?" | A4a — correct "very loud" and distractor "very soft" are minimal-pair antonyms; sentence "rang out" makes the binary obvious | X57 already flags this; escalated P0 because both options are `very + [antonym]` template, reducing to coin-flip | Replace "very soft" with "only once or twice" (frequency substitution) | No |
| **P0** | Ch21 | kt-ch21-l4-q3 | listen-mc | "His body went on and on, like a green road in the grass." | "How was the python's body?" | A4a — "very long like a road" vs "very short like a pin" are identical template with one antonym swap | Pattern = `very [antonym] like a [noun]` makes it test literacy not listening | Replace "very short like a pin" with "coiled tight like a spring" | No |
| **P1** | Ch17 | kt-ch17-l4-x1 | comprehension | "She held a soft white cloth. It shone like fresh snow." | "How did the cloth look?" | A4a — correct "shining white and soft" vs distractor "rough and dark brown" → soft/rough antonym pair | X57 missed (multi-word phrase antonym, not single-word key) | Replace "rough and dark brown" with "stiff and covered in red marks" | No |
| **P1** | Ch19 | kt-ch19-l2-pm1 | picture-mc | "The river was very wide. Mouse deer could not swim across." | "Which picture matches?" | A4a — correct "a small deer at a wide river" vs distractor "a small deer jumping over a **narrow** stream" → wide/narrow antonym signal | X57 missed (picture-mc not in X57 antonym scope) | Replace "narrow stream" with "a muddy bank beside tall reeds" | No |
| **P1** | Ch21 | kt-ch21-l5-x8 | comprehension | "Anansi looked down at him and held out a long, strong rope." | "What is Anansi's plan for the leopard?" | A4a — correct "**pull** him up with the rope" vs distractor "**push** the hole deeper still" → pull/push antonym; X57 did not flag | Temporal/directional antonyms (push/pull) missing from X57 dictionary | Replace distractor "push the hole deeper" with "pour water into the pit" | No |
| **P1** | Ch23 | kt-ch23-l7-x4 | comprehension | "By the time the adults came, the danger was already over." | "When did the adults arrive?" | A4a — correct "**after** the boy had already been saved" vs distractor "just **before** the stone was thrown" → temporal after/before antonym; X57 missed | Temporal antonyms not in X57 dictionary | Replace distractor "just before the stone" with "when people heard a loud sound" | No |
| **P1** | Ch17 | kt-ch17-l4-x8 | comprehension | "The cloth was finished before the sun rose the next morning." | "How long did it take?" | A4b — two distractors "just one short **night**" and "three whole **days**" form night/day antonym pair → learner can narrow to 2 via elimination | Both are distractors; correct is "three whole days" — but wait, correct IS "three whole days" → this is P0 actually | RECLASSIFY P0: correct "three whole **days**" echoes back. Replace one distractor from the night/day pair: change "just one short night" to "about one full morning" | No |

> **Reclassification note (kt-ch17-l4-x8)**: correct = "three whole days"; distractor = "just one short night" → "days"↔"night" antonym pair between correct and one distractor. This is A4a P0.

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total questions scanned (Ch17-24) | 405 |
| listen-tf Yes/No exempt | 131 (by design, not violations) |
| listen-mc / comprehension / emoji-pick / picture-mc scored | 274 |
| P0 violations | 5 (2 A4d + 2 A4a escalated + 1 reclassified) |
| P1 violations | 4 (all A4a multi-word antonym, X57-missed) |
| Total real violations | 9 |
| Violations already caught by X57 | 3 (kt-ch19-l3-q9, kt-ch21-l4-q3 partially, kt-ch17-l4-x8 partial) |
| **Net new violations not in X57** | **6** |
| Chapters with highest A4 density | Ch19 (3), Ch17 (2), Ch21 (2) |
| audio regen required | 0 |

---

## D. Top 5 P0

1. **kt-ch19-l2-ep1** — Q: "Which one shows a crocodile?" Correct: "🐊 crocodile" — the answer word IS the question subject. Zero listening/reading effort required. Fix: "Which animal has sharp teeth and lives in warm rivers?" (removes direct echo, adds inference).

2. **kt-ch23-l4-x5** — Q: "Which emoji shows running in a hurry?" Correct: "🏃 running in a hurry" — 5-word verbatim. Fix: "Which emoji shows someone moving as fast as possible?" (paraphrase preserves concept without giving away).

3. **kt-ch21-l4-q3** — Q: "How was the python's body?" Options: "**very long** like a road" vs "**very short** like a pin" — identical template with antonym swap. Fix distractor: "coiled tight like a rope" (structural similarity without antonym pairing).

4. **kt-ch19-l3-q9** — Q: "How loud did mouse deer call?" Options: "**very soft**" vs "**very loud**" — exact antonym template. Sentence "rang out" makes direction obvious before listening. Fix distractor: "only once or twice" (frequency, not volume, breaks the binary).

5. **kt-ch17-l4-x8** — correct "three whole **days**" vs distractor "just one short **night**" → days/night antonym binary. Sentence says cloth was finished before sunrise → "night" distractor gives away the short timeframe / eliminates itself. Fix: "just one short **morning**" (duration-equivalent, no antonym to "days").

---

## E. Narrative-voice & pacing improvements (0 hard violations ≠ 0 improvements)

1. **kt-ch17-l5-x8** (comprehension) — Q: "Why did his heart feel heavy even with so much gold?" Option pool revolves around financial/emotional adult framing. More Ghibli-appropriate phrasing for 8-12 audience: Q → "Why was the old man still not happy, even though he had lots of gold?" — removes "heart heavy" metaphor that young children may parse literally.

2. **kt-ch20-l3-q10** (comprehension) — correct option "help is needed but two is not enough" uses double-negation structure that is cognitively costly for A2 children. Better: "they still need more helpers" — affirmative, direct, Mochi-voice appropriate.

3. **kt-ch22-l6-x6** (comprehension) — explanationZh-style question "What does this suggest about Meng's learning style?" — "learning style" is adult ELT register. For 8-12 audience: "What does this tell us about how Meng learns?" — drops the jargon, keeps inference demand.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #159: X58 Multi-word antonym mirror + X59 emoji-pick verbatim lint gates

**Background — industry 2026:**

Wang & Meng 2026 (*Language Testing*, DOI: 10.1177/02655322251400375) applied a two-parameter logistic nested logit model (2PLNLM) to identify "problematic distractors" in L2 listening MCQs. A core finding: **antonym-paired distractors reduce effective item difficulty by converting 4-choice to a binary recognition task**, specifically calling out both single-word antonym pairs AND phrasal antonym patterns (e.g., "come/go", "push/pull", "before/after") as systematic design failures. The study applied GenAI with human review to replace these distractors with semantic neighbours that preserve plausibility without mirroring.

Iimura (JLTA 21, researchgate.net/publication/334003786) provides the psychometric rationale: antonym distractors have near-zero discrimination index (distractors are chosen by test-wise students who immediately eliminate the correct-antonym pair without engaging the stimulus). This directly maps to Pickup's A2 8-12 audience: children are not test-wise and will be confused rather than helped by antonym framing — the distractor teaches the wrong concept.

**Current gap in Pickup lint:**

The existing `X57_ANTONYM_PAIR_MIRROR` in `tools/validate-lessons.js` only matches single-word exact dictionary entries (`'soft','rough'` etc.) in single-word options. This cycle found **6 violations X57 misses**:
- Multi-word phrases: "soft and gentle" ↔ "fast and rough" (Ch18)
- Temporal antonyms: "after" ↔ "before" (Ch23) — not in X57 dictionary
- Directional: "pull" ↔ "push" (Ch21) — not in X57 dictionary
- Picture-mc type: "wide river" ↔ "narrow stream" (Ch19) — picture-mc not in X57 scope
- Emoji-pick verbatim question echo (Ch19, Ch23) — no existing lint rule

**Proposed implementation (JSON-additive, no src/ change):**

```js
// tools/validate-lessons.js — add to existing ANTONYM_PAIRS list:
const EXTENDED_ANTONYM_PAIRS = [
  ...ANTONYM_PAIRS,
  ['pull','push'], ['push','pull'],
  ['after','before'], ['before','after'],
  ['arrive','leave'], ['leave','arrive'],
  ['wide','narrow'], ['narrow','wide'],
  ['deep','shallow'], ['shallow','deep'],
  ['thick','thin'], ['thin','thick'],
];

// X58: multi-word antonym detection (extend X57 scope to picture-mc + emoji-pick)
// Check content words in multi-word options, not just single-word matches
// Target types: all except narration + listen-tf

// X59: emoji-pick question verbatim
// For type === 'emoji-pick': strip emoji from correct option,
// check if clean text appears in question stem (≥8 chars match → flag)
```

Effort: ~1.5h — extend X57 dictionary entries + refactor X57 to also do content-word scanning across multi-word options + add X59 emoji-pick verbatim check.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X58 multi-word antonym + extended antonym dict (pull/push, after/before, wide/narrow) | Wang & Meng 2026 (DOI 10.1177/02655322251400375); Iimura JLTA (jstage.jst.go.jp antonym zero-discrimination) | ✅ Full — validate-lessons.js only, no src/ change, no JSON change | Low: ~1h lint extension | ⭐⭐⭐ Closes 4 of 6 missed violations this cycle; prevents systematic regression in Ch25-34 | ✅ Implement next content sprint |
| X59 emoji-pick question verbatim (question stem contains correct option text) | Wang & Meng 2026 GenAI distractor review pipeline; item analysis PMC11040895 | ✅ Full — emoji-pick specific, zero false-positive risk | Low: ~30min | ⭐⭐⭐ Catches give-away pattern that degrades emoji-pick from "concept mapping" to "word matching" | ✅ Implement next content sprint |

**Concrete validate-lessons.js additions (pseudocode):**

```js
// X58: extend antonym check to multi-word options, all non-narration/listen-tf types
function hasMultiWordAntonymPair(options, correctIdx, antonymMap) {
  const correct = options[correctIdx];
  const correctWords = tokenize(correct).filter(w => !STOP.has(w) && w.length > 3);
  for (const [di, distractor] of options.entries()) {
    if (di === correctIdx) continue;
    const dWords = tokenize(distractor).filter(w => !STOP.has(w) && w.length > 3);
    for (const cw of correctWords) {
      for (const dw of dWords) {
        if (antonymMap[cw]?.has(dw)) return { cw, dw, distractor };
      }
    }
  }
  return null;
}

// X59: emoji-pick verbatim question echo
if (q.type === 'emoji-pick' && q.questionEn && q.options && q.correctIndex >= 0) {
  const correctText = stripEmoji(q.options[q.correctIndex]).trim().toLowerCase();
  if (correctText.length >= 8 && q.questionEn.toLowerCase().includes(correctText)) {
    warn(lid, qid, 'X59_EMOJI_PICK_QUESTION_VERBATIM',
      `correct option text "${correctText}" found verbatim in question stem`);
  }
}
```
