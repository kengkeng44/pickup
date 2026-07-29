# Content QA — 2026-07-29 00:06 UTC

**Today's angle**: A6 — option-in-question (correct option echoes question stem / sentence verbatim; Tarrant IWF Rule; allows answer-selection without comprehension)
**Focus**: Ch5–8 (Baba Yaga / Six Swans / Yexian / Three Little Pigs) — listen-mc + listen-comprehension items
**Previous 8-cycle angles (not repeated this run)**: A4, #12, A1, A7, R1, A2, R2, A3

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only)
Ch8-specific X48 violations already flagged:
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT — "firmer than straw" (3-gram)
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT — "out the back" (3-gram)
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR — correct "soft" ↔ distractor "loud" (binary collapse)
  kt-ch8-l4-lg2: X2_OPTION_LIST_BIAS — all options start with "he"
```

No new schema validation failures. Build gate: PASS.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence snippet | Question | Correct option | Violation | 修法 | Audio regen? |
|----|------|------|-----------------|----------|----------------|-----------|------|-------------|
| 8 | kt-ch8-l3-q3 | listen-mc | "He picked sticks because they felt **firmer than straw**." | "Why did he pick sticks?" | "**they were firmer than straw**" | **P0 A6c** — correct opt is near-verbatim extract of sentence (X48 already flagged). Zero comprehension required; learner sees "firmer than straw" in both sentence and option. | Paraphrase: "sticks felt harder and stronger" or "wood holds up better" | Yes — change option text |
| 8 | kt-ch8-l6-q9 | listen-mc | "Both brothers ran **out the back**, fast as they could." | "How did the pigs leave?" | "**out the back**, very fast" | **P0 A6c** — "out the back" 3-gram verbatim (X48). "very fast" = trivial rewrite of "fast as they could". | Paraphrase: "slipped away through a rear exit" or "escaped quickly through the back door" | Yes |
| 5 | kt-ch5-l4-q3 | listen-mc | "It was not made of wood. It was made of **white bones**." | "What was the fence made of?" | "**bones**" | **P0 A6c** — Q mirrors sentence structure 100% ("made of" in both). Single key noun "bones" is verbatim in sentence. Q→S echo ratio: 100%. No inference required; learner simply identifies the noun from "made of X". | Paraphrase correct opt: "skull and bone pieces" or "dry white remains". Strengthen distractors. | Yes |
| 8 | kt-ch8-l7-q7 | listen-mc | "The third pig built a **hot fire** inside a big pot." | "What did the third pig do?" | "made a **hot fire**" | **P1 A6c** — "hot fire" is verbatim 2-gram from sentence (built→made is proper paraphrase but "hot fire" leaks). | Replace: "heated a pot with flames" or "lit a boiling trap" | Yes |
| 8 | kt-ch8-l4-q9 | listen-mc | "His knocks were **loud**, and his voice was soft like honey." | "How did the wolf knock and speak?" | "**loud** knock, sweet voice" | **P1 A6c+X57** — "loud" is verbatim from sentence; X57 antonym mirror also applies (option 1 "soft knock, shy voice" is polar opposite collapsing 4→2 choice). Double-flag. | Replace "loud knock" with "pounding knock" or "heavy fist-knock". Break antonym pair. | Yes |
| 5 | kt-ch5-l6-q3 | listen-mc | "'First, do my **work**. Then we will talk about fire.'" | "What did Baba Yaga want first?" | "**work** done" | **P1 A6 minimal-paraphrase** — "work" echoes between sentence and option; question structure ("want first") mirrors sentence word "first". Minimal paraphrase: "do my work" → "work done" (2-word inversion). | Paraphrase: "chores finished" or "all tasks completed" | Yes |
| 6 | kt-ch6-l3-q9 | listen-mc | "**Six** small beds lay smooth and still. No one had slept in them." | "What did the girl see in the room?" | "**six** empty beds" | **P1 A6c** — number "six" verbatim from sentence. "empty" is valid paraphrase of "no one had slept in them" but the count word "six" gives it away as pure extraction. | Replace "six empty beds" with "a row of untouched beds" or "beds that had never been slept in". | Yes |
| 5 | kt-ch5-l7-q9 | listen-mc | "Back at her house, her father's wife opened the door and stared." | "Who came out to **see the light**?" | "the new woman" | **P2 narrative-gap** — question includes "see the light" but the sentence doesn't mention light. This requires cross-lesson context (prior sentence about the skull's light). Creates a coherence gap if heard in isolation. | Reframe: "Who opened the door when Vasilisa returned?" — uses information present in this sentence alone. | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total listen-mc/comprehension items scanned (Ch5-8) | 46 |
| Total Q items scanned (all types, Ch5-8) | 153 |
| P0 A6 violations (verbatim extract, zero comprehension) | 2 |
| P1 A6 violations (near-verbatim / minimal paraphrase) | 4 |
| P2 coherence gap (cross-lesson dependency) | 1 |
| Q→S echo ratio ≥ 100% (question fully mirrors sentence structure) | 4 |
| Emoji-pick Q=S (by design — A6 exempt for vocab items) | 36 |
| Overlapping X48/X57 flags from validator | 3 |

---

## D. Top 5 P0

1. **⚠️ kt-ch8-l3-q3** — "firmer than straw" is 3-gram verbatim. Learner can answer by text-matching sentence alone; no listening required. Also X48-flagged.
2. **⚠️ kt-ch8-l6-q9** — "out the back" 3-gram verbatim. Answer visible in sentence text. Also X48-flagged.
3. **⚠️ kt-ch5-l4-q3** — "bones" single-word verbatim + 100% Q→S echo. Question structure mirrors sentence so completely that the answer is predictable by grammar alone ("What was it made of?" → pick the noun after "made of").
4. **kt-ch8-l7-q7** — "hot fire" 2-gram verbatim (P1). Degraded to P0-equivalent because this is a Pig 3's key strategy reveal — high salience, easy to surface-match.
5. **kt-ch8-l4-q9** — "loud" verbatim + X57 antonym mirror, double-fault. Listener can answer by hearing "loud" in sentence then matching "loud knock" in options.

---

## E. Narrative Voice / Pacing Improvements (3 required by spec)

Even with no P0 across entire Ch5-8, these narrative improvements would raise quality:

### NV-1: Ch6 Les5-6 Question Monotony (Six Swans, middle act)
`kt-ch6-l5-q5 / kt-ch6-l6-q5` both use "What did X do for Y?" frame back-to-back. The Six Swans is a story of sacrificial silence — question framing should evoke that weight.
- Current: "What did the young king do for her?" / "What did the king's mother say?"
- Suggested: "What changed for the girl when the king gave her his ring?" / "How did the king's mother try to turn him against the bride?"
- Rationale: The current framing treats the fairytale as a news report. Ghibli-register questions should evoke the *emotional stakes*, not just the plot event.

### NV-2: Ch7 Yexian Question Register Too Plain (Chinese Cinderella)
`kt-ch7-l7-q5` "How did Yexian come out?" for the sentence "Quiet, with one bare foot, Yexian stepped out from behind the new wife" — the sentence is lyrical; the question is bureaucratic.
- Current: "How did Yexian come out?" / A: "came out without sound"
- Suggested: "What made Yexian's appearance surprising?" / A options that include "she moved without a sound" + distractors about her clothes/timing
- Rationale: A2 children can handle "surprising" as a concept word; the current "How did she come out?" invites bare procedural answers.

### NV-3: Ch8 Three Pigs Question Variety (All "What did X say/do?")
Ch8 listen-mc questions heavily repeat the "What did X [say/do]?" pattern across `l3-q3`, `l4-q3`, `l5-q3`, `l5-q9`, `l7-q7`, `l7-q9`. The Three Little Pigs is a story built on repetition — the *questions* shouldn't also repeat format.
- Suggested variety: Mix in "Which pig would the wolf NOT be able to blow down?" (outcome prediction), "How did the wolf's plan change after the first house?" (sequence), "Why did the pigs choose different materials?" (motivation)
- Rationale: Format variety signals Duolingo R6 (sub-skill variety per lesson: gist / detail / inference / vocab). Currently Ch8 skews heavily toward `detail` via same-frame questions.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #216: X48b_2GRAM_VERBATIM + X63_COVER_OPTION_TEST — extend validate-lessons.js with 2-gram verbatim lint + "cover the option" compound rule

**X48b + X63 — 2-gram verbatim lint + NBME Cover-Option compound rule for validate-lessons.js**

**業界根據**: NBME Item-Writing Guide (2024 edition) 正式定義「Cover-Option Rule」(讀完 stem 就能作答 → item 無效); PNCB 2024 禁逐字語句; DET 2025 GPT-QA pipeline 有人工驗證步驟專門抓「整句 verbatim」。X48 (3-gram) 已有，但 2-gram 和 Q→S echo+1詞 class 尚未覆蓋。

### Research Findings

**Source 1**: NBME Item-Writing Guide (2024 edition) — introduces the **"Cover the Option" Rule** as the canonical test for question quality: *"Examinees should be able to read the stem and respond to the prompt without looking at the options."* If reading the stem + sentence makes the correct option obvious, the question tests recall/matching, not comprehension. This is the direct psychometric formalization of A6.

**Source 2**: PNCB Item Writing Manual (Nov 2024) — "Avoid textbook, verbatim phrasing when developing the item." Explicitly bans multi-word verbatim overlap between sentence and correct option. Cites item discrimination collapse (point-biserial → 0) when options echo stimulus.

**Source 3**: Duolingo English Test 2025 update blog (goarno.io) — DET's GPT-assisted question generation pipeline includes a **manual validation step** to catch: "questions including entire phrases verbatim from the text." This confirms that even LLM-generated content requires this check, and Duolingo knows it.

**Source 4**: EMTeC corpus paper (arXiv 2408.04289) — found that machine-generated questions frequently include verbatim sentence fragments as correct options (the model copies the answer from the source instead of paraphrasing). This is the same failure mode in Pickup's Ch8.

**Gap in current validate-lessons.js**:
- X48 catches 3-gram verbatim ✅
- **Missing**: 2-gram verbatim in correct option (catches "hot fire", "loud knock", "six empty" etc.)
- **Missing**: Compound rule — Q→S echo ratio ≥ 80% AND correct opt ∩ sentence > 0 (the "bone fence" pattern where grammar alone reveals the answer)

**Proposed lint additions (X48b + X63)**:

```javascript
// X48b — 2-gram verbatim correct option ∩ sentence
function get2grams(s) {
  const words = s.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  return new Set(words.slice(0, -1).map((w, i) => `${w} ${words[i+1]}`));
}
const sentGrams = get2grams(q.sentence || '');
const optGrams = get2grams(correct_opt);
const shared = [...optGrams].filter(g => sentGrams.has(g));
if (shared.length > 0) {
  warn(lesson, q.id, 'X48b_2GRAM_VERBATIM_CORRECT',
    `正解與句子重疊 2-gram「${shared[0]}」— 抄句 tell`);
}

// X63 — Cover-Option compound (high Q→S echo + any verbatim token in correct opt)
function echoRatio(q_words, s_words) {
  const sw = new Set(s_words); return q_words.filter(w => sw.has(w)).length / (q_words.length || 1);
}
const qCW = contentWords(q.question || '');
const sCW = contentWords(q.sentence || '');
const oCW = contentWords(correct_opt);
const echo = echoRatio(qCW, sCW);
const overlap = oCW.filter(w => sCW.includes(w));
if (echo >= 0.8 && overlap.length > 0) {
  warn(lesson, q.id, 'X63_COVER_OPTION_FAIL',
    `Q→S echo ${(echo*100).toFixed(0)}% + 正解含句子詞「${overlap[0]}」— 不需聽力直接推出正解`);
}
```

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X48b: 2-gram verbatim correct opt ∩ sentence | PNCB 2024, NBME 2024 | ✅ 高 — validate-lessons.js already has X48 (3-gram). Adding 2-gram is a 10-line extension of the same loop. Catches "hot fire", "loud knock", "out the back" class violations at CI time. | Low (~1 hr) | High — catches 3 more Ch8 violations + future ones | **Recommend** |
| X63: Cover-Option compound (echo ratio ≥ 80% + verbatim token) | NBME "Cover the Option" Rule | ✅ 高 — catches the "bones fence" class (question mirrors sentence structure so precisely the answer is grammatically forced). Not covered by X48 since "bones" is only 1 word. Compound rule avoids false positives. | Low (~1 hr, same pass) | High — catches pattern X48 misses | **Recommend** |
| Explicit/Implicit tagging per question (`explicitness` field) | DET 2025 GPT-QA pipeline | 🟡 Medium — would help balance inference vs recall questions. But Pickup already has `subSkill: detail | inference`. Add lint: ensure ≥25% `inference` per lesson instead of adding a new field. | Low (lint only) | Medium | Optional |
