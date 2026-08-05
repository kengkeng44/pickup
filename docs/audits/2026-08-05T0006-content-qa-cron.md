# Content QA — 2026-08-05 00:06 UTC

**Today's angle: A6 — option-in-question (答案字面出現在題目裡)**
**Focus: Ch17–24 (406 questions across 8 chapters)**

> A6 definition (from pickup-q-design-standard-v1): the correct option is a literal substring of the question stem, or shares ≥2 content-words with it. Trivializes 4-option MC — learner can match without audio comprehension.
> Rotation status: first use of angle A6. Previous 8 cycles: audio-sync, R2-distractor, A5-cultural, A1-obvious, A4-mirror, optionsZh, A3-semantic, R1-paraphrase.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; set MIRROR_LINT_STRICT=1 to fail build)
Notable: ch8 X48_NGRAM_VERBATIM_CORRECT (2 hits), X49_STIMULUS_REUSE (3), X57_ANTONYM_PAIR_MIRROR (1)
         ch9 X2_OPTION_LIST_BIAS (2), X49_STIMULUS_REUSE (3), X57_ANTONYM_PAIR_MIRROR (3)
Build: PASS (tsc + vite build green)
```

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | severity | 修法 | audio regen? |
|----|------|------|---------|-----------|----------|------|--------------|
| 21 | kt-ch21-l6-q8 | listen-mc | Q: "What did Nyame mean by 'your head is big'?" A: "Anansi was very clever" S: "He meant Anansi had used his clever ideas…" | **A7-SENT-REPEAT**: "anansi", "clever" verbatim in both answer and sentence | P1 | Paraphrase A to "Anansi used his mind, not his muscles" | No |
| 22 | kt-ch22-l3-q8 | listen-mc | Q: "What was Meng copying from the market?" A: "the way sellers called out prices" S: "He held up sticks and called out, just like the sellers." | **A7-SENT-REPEAT**: "sellers", "called" shared between answer and sentence | P1 | Rephrase A to "how the vendors announced their goods" | No |
| 23 | kt-ch23-l7-x7 | comprehension | Q: "What two things did Sima Guang do to save his friend?" A: "thought then quickly acted" S: "One small boy did not wait. He thought, he acted, and he was just in time." | **A7-SENT-REPEAT**: "thought", "acted" verbatim in both answer and sentence | P1 | Rephrase A to "stayed calm, then found a fast solution" | No |
| 23 | kt-ch23-l4-x5 | emoji-pick | Q: "Which emoji shows running in a hurry?" A: "🏃 running in a hurry" | **A6-PARTIAL** (false positive) — emoji-pick answer IS the label for the emoji; cannot be paraphrased differently | — | No change needed; emoji-pick type exempt from A6 by design | No |
| 23 | kt-ch23-l1-pm1 | picture-mc | Q: "Which picture matches the sentence?" A: "children running in an open garden" S: "The children played in the garden." | **A7-SENT-REPEAT** (false positive) — picture-mc answer must describe the picture in literal terms matching the sentence | — | No change needed; picture-mc exempt from A7 content-word rule | No |

### Confirmed violations: 3 (all P1, 0 P0)
### False positives: 2 (emoji-pick + picture-mc type exempt by design)

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total questions scanned (Ch17–24) | 406 |
| Questions with options | 406 |
| A6-STRICT violations (correct option ⊆ question, ≥4 chars) | 0 |
| A6-PARTIAL violations (≥2 content-words shared Q↔answer) | 1 (false positive) |
| A7-SENT-REPEAT genuine violations | 3 |
| A7-SENT-REPEAT false positives (exempt types) | 1 |
| Chapters clean (0 violations) | 17, 18, 19, 20, 24 |
| Chapters with violations | 21 (1), 22 (1), 23 (1 genuine + 2 FP) |

**Overall A6 health: good.** Ch17–24 has no A6-STRICT issues. Three mild A7-SENT-REPEAT violations (content-words from correct answer appear verbatim in sentence rather than paraphrased). No audio regeneration required for any fix.

---

## D. Top 5 P0

> No P0 violations found this cycle.

P1 prioritized by impact:

1. **P1-1** `kt-ch21-l6-q8` (Ch21 Anansi): answer "Anansi was very clever" mirrors sentence almost verbatim. Correct answer gives itself away to learners who parse the sentence — inference value lost.
2. **P1-2** `kt-ch22-l3-q8` (Ch22 Meng): "sellers called out" echoes sentence "called out, just like the sellers." Learner identifies answer via surface matching, not comprehension.
3. **P1-3** `kt-ch23-l7-x7` (Ch23 Sima Guang): "thought, acted" lifted verbatim from sentence. Buck (2001) CIV #1 rule: verbatim = comprehension bypass.

---

## E. Narrative Voice / Pacing Improvements (3 proposals, required even with 0 P0)

### NV-1: R7 Stem Length — 89 comprehension stems exceed ≤8-word spec

Ch17–24 has **89 listen-comprehension question stems exceeding 8 words** (R7: Pickup tighter spec ≤8w vs TOEIC's ≤10w). Examples:

- `kt-ch17-l4-lg2`: "Why did the young woman look pale and thin after weaving?" (11 words)
- `kt-ch17-l6-x1`: "Why did the old man go to the room at midnight?" (11 words)
- `kt-ch23-l7-x7`: "What two things did Sima Guang do to save his friend?" (11 words)

**Proposed fix**: Tighten to ≤10 words for `comprehension` type (keep ≤8 only for `listen-mc`). The spec was written for listen-mc; comprehension inference questions inherently need more stem context. Or batch-trim Ch17 specifically (worst offender).

### NV-2: R6 Sub-skill Variety — Ch21 kt-ch21-l7 has no inference items

`kt-ch21-l7` (Anansi finale lesson, 19 questions) contains **zero listen-comprehension or inference-tagged questions** — all detail/vocab sub-skill. Per R6 minimum: ≥2 inference items per lesson ≥6 Qs.

**Proposed fix**: Convert 2 existing listen-mc questions to listen-comprehension type, requiring inference ("Why did Anansi deserve to win?" vs "What did Nyame say?").

### NV-3: Ch24 explanationZh "選..." openers — dry, not grandma-voice

Three `kt-ch24-l3/l4` explanations open with "選之前先停下來想——" and "選最小的——". These read as metalinguistic test-prep instructions, not as the grandma story-voice style.

Examples:
- `kt-ch24-l3-x4`: "選之前先停下來想——這說明他「很細心、會思考」!" → Better: "奶奶說：仔細看看故事，他做事之前先想清楚喔！"
- `kt-ch24-l4-x5`: "選最小的——就像選了 🫐 這個小小的東西一樣!" → Better: "在故事裡，選了最小的那個，反而得到最大的祝福！"
- `kt-ch24-l4-x7`: "選最小的留大的給哥哥——這說明他「先想到別人」!" → Better: "奶奶輕聲說：把好的留給哥哥，這孩子心裡裝著別人呢。"

**Proposed fix**: Audit Ch24 explanationZh for 4 more metalinguistic openers and convert to grandma-voice narration framing.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #243: X244_A6_A7_CONTENT_WORD_LINT — validate-lessons.js content-word overlap lint gate

**Problem identified this cycle**: 3 A7-SENT-REPEAT violations (correct answer shares content-words with sentence) and the broader A6 class (correct answer shares content-words with question) are not caught by existing lint. validate-lessons.js currently detects R1 ngram verbatim overlap (`X48_NGRAM_VERBATIM_CORRECT`) but not softer content-word shared-vocabulary patterns.

**Industry basis**:
- 2025 Frontiers paper on MCQ distractor development confirms: "distractors designed around student misconceptions outperform surface-matching options" — implying correct answers should NOT be surface-matchable from stem
- iiardjournals 2025 ELT distractor efficacy paper: "plausible distractors require learner to process meaning, not surface word form" — A7 pattern (verbatim word in sentence = answer) violates this
- Duolingo's July 2025 Interactive Listening update adds fill-in-blank + response-selection combos specifically because verbatim detection is insufficient for measuring comprehension
- ETS item-writing doc (eric.ed.gov 2025): "no element of the correct answer should appear in the question prompt" — maps exactly to A6/A7

**Pickup 適配**: React 18 + Zod + JSON lessons + validate-lessons.js. Fully compatible — lint lives in Node.js script, no app-code change.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X244_A6_A7_CONTENT_WORD_LINT: flag when ≥2 content-words of correct answer appear in question stem or sentence | Frontiers 2025 + ETS item-writing + Buck 2001 | ✅ 完全適合 — validate-lessons.js 加 50 行 JS | 1h | High — catches subtle verbatim patterns X48 misses | ✅ 推薦實作 |
| Duolingo Interactive Listening combo (fill-blank + select + summarize) | Duolingo 2025 update | 🟡 部分適合 — fill-blank is already `type:cloze`, combo format needs new UX | 3–5d | Medium-long | 🟡 Phase 3 候選 |
| Automated distractor generation via topic modeling | Frontiers 2025 (LDA-based) | 🟡 有趣但 overkill for 1100 Qs — manual review still needed | 2w | Low now, High post-5000Q | 🟡 Phase 3+ |

**Implement X244**: in `tools/validate-lessons.js`, add after the existing `X48` check:

```js
// X244_A6_CONTENT_WORD: correct option shares ≥2 content-words with question stem
// X244_A7_CONTENT_WORD: correct option shares ≥2 content-words with sentence
const STOPWORDS = new Set([...]);
function cw(s) { return s.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/).filter(w=>w.length>3&&!STOPWORDS.has(w)); }
const aWords = cw(correct);
const qShared = aWords.filter(w => new Set(cw(q.question || '')).has(w));
const sShared = aWords.filter(w => new Set(cw(q.sentence || '')).has(w));
if (qShared.length >= 2) warn(id, 'X244_A6_CONTENT_WORD', `correct shares [${qShared}] with question`);
if (sShared.length >= 2 && aWords.length <= 6) warn(id, 'X244_A7_CONTENT_WORD', `correct shares [${sShared}] with sentence`);
```

Exempt types: `picture-mc`, `emoji-pick`, `listen-tf` (True/False options are always the same).

**Cockpit prompt**:
> 請拉最新 master. 實作 ARCH-REC #243:
> 在 `tools/validate-lessons.js` 加 X244_A6_CONTENT_WORD + X244_A7_CONTENT_WORD lint (見 audit 末段 code snippet). 同時在 stopwords set 裡排除 True/False, 並 exempt picture-mc + emoji-pick + listen-tf. npm run build + node tools/validate-lessons.js 驗收 — 應抓到 kt-ch21-l6-q8, kt-ch22-l3-q8, kt-ch23-l7-x7 三個 violations.
> Commit: v2.0.B.NEXT: validate-lessons X244_A6_A7_CONTENT_WORD lint gates (ARCH-REC #243)

---

*Audit generated: 2026-08-05 00:06 UTC | Angle: A6-option-in-question | Focus: Ch17–24 | Violations: 3 P1 (0 P0) | ARCH-REC #243*
