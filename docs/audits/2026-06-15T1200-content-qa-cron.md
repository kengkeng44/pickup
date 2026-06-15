# Content QA — 2026-06-15 12:00 UTC

Today's angle: **A1 — Obvious Correct (gap / option too easy, keyword-pull give-away)**
Focus: **Ch9–18 (Cinderella → Heungbu & Nolbu — highest mid-range traffic)**

> **A1 rotation context**: Last 9 runs covered R1 / A6 / R2 / A2 / A5 / A7 / A4 / #10-audio / A3. A1 not hit in this window.
> **Core A1 mechanism**: test-taker identifies the correct option via keyword matching against the sentence stimulus WITHOUT needing to comprehend meaning — making the audio redundant.
> **Research basis**: Iimura (2019) — word overlap is the #1 factor governing distractor attractiveness in listening MCQ. The inverse holds for the CORRECT option: when the correct option shares content words with the sentence and distractors do NOT, keyword-pull telegraphs the answer.

---

## A. validate-lessons.js result

```
WARN lessons-ch30.json: 5 lint issue(s) (R1_SUBSTRING + X2/X3)
WARN lessons-ch31.json: 8 lint issue(s) (R1_SUBSTRING + X2/X3)
WARN lessons-ch3.json:  4 lint issue(s) (X2_OPTION_LIST_BIAS)
WARN lessons-ch5.json:  1 lint issue(s) (X3_R1_VERBATIM_WORDS)
WARN lessons-ch7.json:  1 lint issue(s) (X2_OPTION_LIST_BIAS)
Total mirror-lint issues: 70
(warn-only; Ch9–18 = 0 validator WARNs — all pass shape guard)
```

Ch9–18 are structurally clean. All A1 violations detected via manual-heuristic keyword-overlap scan (see Section D for proposed lint rule).

---

## B. Violation table

| Ch | Q ID | Type | Sentence (stimulus) | Correct option | Violation | Overlap words | Severity | 修法 | audio regen? |
|----|------|------|---------------------|---------------|-----------|--------------|----------|------|-------------|
| 18 | kt-ch18-l5-q9 | listen-mc | "Warm clothes came out. Toys for the children came out." | "warm clothes and toys" | A1-keyword-pull: 3 content words verbatim (warm/clothes/toys) — correct IS the sentence concatenated | warm, clothes, toys | **P0** | → "everything they needed" (distractors unchanged) | No |
| 16 | kt-ch16-l7-q3 | listen-mc | "This is a lucky mallet. It can grant a wish." | "a magic wish mallet" | A1-keyword-pull: "wish" + "mallet" both from stimulus — student keyword-scans not comprehends | wish, mallet | **P0** | → "a tool that makes dreams come true" | No |
| 14 | kt-ch14-l7-q9 | listen-mc | "When the wind cleared, he was a very old man with a long beard." | "aged into a very old man" | A1-keyword-pull: "very old man" phrase nearly verbatim; 3-word phrase echo | very, old, man | **P0** | → "transformed into an ancient elder" | No |
| 11 | kt-ch11-l6-q3 | listen-mc | "The nine fallen suns were his own children." | "the suns were his family" | A1-keyword-pull: "suns were his" structural echo; "children→family" one-step synonym | suns, were | **P0** | → "he had harmed his own kin" | No |
| 13 | kt-ch13-l7-q3 | listen-mc | "He opened up the wolf with great care." | "opened him up carefully" | A1-keyword-pull: "opened…up" verbatim; "great care→carefully" minimal paraphrase | opened | **P0** | → "cut into the wolf's belly" | No |
| 15 | kt-ch15-l3-q3 | listen-mc | "The two strangers pointed at empty looms with proud hands." | "looms with no cloth on them" | A1-keyword-pull: "looms with" verbatim phrase; "empty→no cloth" minimal | looms | **P1** | → "bare frames holding nothing" | No |
| 17 | kt-ch17-l7-q3 | listen-mc | "Tears shone quietly in her soft, dark eyes." | "sad with tears" | A1-keyword-pull: "tears" in both; correct option names the stimulus word | tears | **P1** | → "quietly heartbroken" | No |
| 11 | kt-ch11-l3-q9 | listen-mc | "One sun fell down. The air felt a little cooler." | "a sun came down" | A1-keyword-pull: "sun" + "down" echo; "fell→came" synonym swap is transparent | sun | **P1** | → "one of the blazing orbs vanished" | No |
| 16 | kt-ch16-l6-q3 | listen-mc | "Inside the demon, it was very dark." | "dark all around" | A1-keyword-pull: "dark" verbatim; sentence gives state, correct option restates | dark | **P1** | → "no light at all" | No |
| 16 | kt-ch16-l1-q8 | listen-mc | "One spring morning, the old woman heard a small cry." | "a small voice crying" | A1-keyword-pull: "small" verbatim + "cry/crying" near-verbatim | small | **P1** | → "a soft sound, like a newborn baby" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch9–18 (10 chapters) |
| Total questions examined | 290 (cloze + listen-mc + listen-comprehension) |
| A1a — verbatim substring in sentence | 0 (none; linter already catches this) |
| A1e — longest-is-correct (ratio > 2.0) | 0 |
| A1-keyword-pull P0 | **5** |
| A1-keyword-pull P1 | **5** |
| Chapters clean (0 A1 violations) | Ch9 (Cinderella), Ch10 (Chang'e), Ch12 (Cowherd), Ch13 (Red Riding Hood — except q3/q7), Ch14 (Urashima) partial |
| Chapters most affected | Ch11 (Hou Yi — 2 P0+P1), Ch16 (Issun-Bōshi — 3 across P0/P1), Ch18 (Heungbu — 1 P0) |

---

## D. Top 5 P0

### P0-1 · kt-ch18-l5-q9 — Stimulus concatenation (most severe)

```
sentence:  "Warm clothes came out. Toys for the children came out."
correct:   "warm clothes and toys"       ← 3 content words: WARM / CLOTHES / TOYS
distractors: ["only one small coin", "old broken pots", "just dust and mud"]
```

The correct option is literally the sentence collapsed into a noun phrase. No inference required — student copies keywords. The `explanationZh` even reads "warm clothes + toys → 暖衣服和玩具" confirming it is a label, not a paraphrase.

**Fix:**
```
correct: "everything they needed"
explanationZh: 推理: 暖衣和玩具從葫蘆飛出 → 家人需要的全出來了 (gist inference, not label)
```
No audio regeneration needed (the narration sentence itself is unchanged).

---

### P0-2 · kt-ch16-l7-q3 — Wish mallet echo

```
sentence:  "This is a lucky mallet. It can grant a wish."
correct:   "a magic wish mallet"          ← WISH + MALLET both from sentence
distractors: ["just a normal toy", "a heavy work tool", "a sweet candy stick"]
```

Both key content words from the sentence appear in the correct option. Distractor "just a normal toy" vs "a magic wish mallet" also creates an antonym-pair tell (normal vs magic).

**Fix:**
```
correct: "a tool that makes dreams come true"
distractor swap: replace "just a normal toy" → "a stick to beat bad people" (story-plausible in Issun context)
explanationZh: 推理: grant a wish → 能實現夢想 (synonym chain, not echo)
```

---

### P0-3 · kt-ch14-l7-q9 — "Very old man" phrase echo

```
sentence:  "When the wind cleared, he was a very old man with a long beard."
correct:   "aged into a very old man"     ← "very old man" 3-word phrase verbatim
distractors: ["turned into a young boy", "turned back into a child", "changed into a fish"]
```

Three distractors all describe physical transformation → the "aged" correct option is additionally the only plausible one thematically. Double give-away: keyword match + semantic elimination.

**Fix:**
```
correct: "transformed by three hundred years"
explanationZh: 推理: very old man + long beard → 時間飛逝三百年
```

---

### P0-4 · kt-ch11-l6-q3 — "Suns were his family" near-echo

```
sentence:  "The nine fallen suns were his own children."
correct:   "the suns were his family"      ← SUNS + WERE + structure echo
distractors: ["Hou Yi was too slow", "people did not thank him", "the bow belonged to him"]
```

"His own children" → "his family" is a single-hop synonym so transparent it requires zero listening skill. The sentence structure "suns were his [kin-word]" is preserved exactly.

**Fix:**
```
correct: "he had destroyed his own kin"
explanationZh: 推理: suns = 自己的孩子 → 他親手射下了骨肉 (inference + emotional weight)
```

---

### P0-5 · kt-ch13-l7-q3 — Opened up echo

```
sentence:  "He opened up the wolf with great care."
correct:   "opened him up carefully"       ← OPENED + UP verbatim; "great care→carefully" = 1-step
distractors: ["gave him some food", "sang to him gently", "told a long story"]
```

"Opened up" is preserved verbatim. The paraphrase distance is exactly one adverb swap (great care → carefully). Distractors are wildly implausible for a huntsman-wolf scene.

**Fix:**
```
correct: "cut the wolf apart with his blade"
distractors: expand plausibility — e.g. "called out to the wolf" (verbal action plausible)
explanationZh: 推理: opened up = 剖開狼的肚子 (functional action, not echo)
```

---

## E. Narrative / Pacing improvements (3 proposals — no R1-R8 violation required)

Even where no A1 violation was detected, three pacing patterns stand out across Ch9–18:

### E1 — Ch12 (Cowherd & Weaver): No "separation" emotional beat before review lesson

Lessons kt-ch12-l5 to l7 cover the annual meeting across the Milky Way but the pre-review (l7) ends with reunion logistics rather than the emotional distance. A short narration entry in l7 anchoring the ache of once-a-year contact would raise the inference question quality in l7-q6 to l7-q9.

### E2 — Ch14 (Urashima Tarō): Time-passage not foreshadowed

The box-opening reveal (l7-q9, P0 above) is robbed of emotional impact because Ch14 has no earlier hint that the box holds time. Lesson l5 or l6 could add a single narration beat: "The box felt heavy, like something she did not want him to take." This distributes inference across the chapter rather than concentrating it in the final reveal — currently all inference load is at l7-q9, making it structurally obligatory to echo the sentence.

### E3 — Ch18 (Heungbu): Nolbu's greed escalation needs a mid-chapter vocabulary anchor

Lessons l3–l4 cover Nolbu injuring the swallow deliberately but the A2-appropriate vocabulary for "deliberate" vs "accidental" is not anchored in a vocab lesson. Adding 1 tap-pairs entry for "on purpose / 故意" in l3 would make the inference questions in l5–l6 test actual reading comprehension rather than binary "nice/mean" recall.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #36: A1_CORRECT_KEYWORD_OVERLAP_LINT

**Source**: Iimura (2019) — *Distractor Plausibility in a Multiple-Choice Listening Test*, JLTA Journal 21, pp. 65–82. ([jstage.jst.go.jp](https://www.jstage.jst.go.jp/article/jltajournal/21/0/21_65/_article)) / Ludewig et al. (2023) vocabulary distractor study ([SAGE journals](https://journals.sagepub.com/doi/10.1177/07342829231167892))

**Finding**: Word overlap between stimulus text and an option is empirically the #1 factor determining option attractiveness. When this overlap concentrates in the CORRECT option while distractors are overlap-free, the test measures keyword-spotting speed, not comprehension.

**Current gap in Pickup's lint**: `validate-lessons.js` already catches R1 (correct option substring of sentence) and X3 (verbatim words). It does NOT catch the softer pattern: correct option shares ≥1 non-stopword content word with sentence, while ≤0 distractors do.

**Proposed lint rule — `A1_KEYWORD_PULL`**:
```js
// In validate-lessons.js, add to lintQuestion():
const STOPWORDS = new Set(['the','and','but','was','were','had','her','his','him','she',
  'they','them','with','that','this','from','have','been','into','out','for','not']);
function contentWords(str) {
  return str.toLowerCase().split(/\W+/).filter(w => w.length > 3 && !STOPWORDS.has(w));
}
const sentWords = new Set(contentWords(q.sentence || ''));
const correctWords = contentWords(q.options[q.correctIndex] || '');
const correctOverlap = correctWords.filter(w => sentWords.has(w));
const distractorOverlapCount = q.options
  .filter((_, i) => i !== q.correctIndex)
  .filter(opt => contentWords(opt).some(w => sentWords.has(w))).length;
if (correctOverlap.length >= 1 && distractorOverlapCount === 0) {
  issues.push(`${qId}: A1_KEYWORD_PULL (correct shares [${correctOverlap.join(',')}] with sentence; 0 distractors do)`);
}
```

**Pickup 適配**: ✅ Fully compatible with existing JSON schema + validate-lessons.js architecture. Additive — no lesson file changes required. Estimated implementation: **S (30 min)**.

**ROI**: The 5 P0 violations found in this audit would ALL have been caught by this rule (overlap count ≥ 1, distractor overlap = 0). Prevents regression across Ch9–31 (current 31-chapter corpus).

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| A1_KEYWORD_PULL lint in validate-lessons.js | Iimura (2019) JLTA / Ludewig (2023) | ✅ fully compatible, additive only | S · 30 min | ⭐⭐⭐ high | **SHIP** — catches P0 class that current R1/X3 misses |

**Implementation path**:
1. Add `contentWords()` + `A1_KEYWORD_PULL` check to `tools/validate-lessons.js` (after existing X3 block)
2. Run against all 31 chapters — triage existing hits
3. Add to CI (already runs on PR / master push via `validate-lessons.js`)

No `src/` changes. No lesson JSON changes needed for the lint itself (P0 fixes are separate content edits).
