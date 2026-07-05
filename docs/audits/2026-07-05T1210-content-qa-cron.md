# Content QA — 2026-07-05 12:10 UTC

**Today's angle:** #8 — A6 Option-in-Question (cueing flaw: correct answer vocabulary appears in question stem)
**Focus:** Ch9–16 (Cinderella / Chang'e & Hou Yi / Cowherd-Weaver / Red Riding Hood / Urashima / Emperor's New Clothes / Issun-boshi)
**Total Q scanned:** 880 (narration 248, listen-tf 120, comprehension 120, emoji-pick 119, listen-mc 88, tap-pairs 64, phrase-pairs 53, grammar-mc 28, type-translate 24, picture-mc 16)
**Eligible for A6 analysis:** 352 (listen-mc 88 + comprehension 120 + grammar-mc 28 + picture-mc 16 + listen-tf 100 partial)
**Rationale:** A6 "option-in-question" (Haladyna 2002 IWF taxonomy — "cueing flaw") occurs when vocabulary from the question stem appears in the correct answer, providing a surface-match shortcut to test-wise learners without engagement with the stimulus. Distinct from R1 (option echoes *sentence*) — A6 specifically exploits the *question* as the cue vector. A 2026 Frontiers AI-MCQ paper confirmed this is the most common AI-generation flaw, present in >55% of AI-authored items. Prior audits (R2, A3, R1, A7, A2, optionsZh, explanationZh, A4) left A6 in Ch9–16 fully untouched.

---

## A. validate-lessons.js result

```
WARN lessons-ch9.json:   8 lint issue(s)  (X2×2, X49×3, X57×3)
WARN lessons-ch10.json:  9 lint issue(s)  (X2×3, X49B×4, X49×1, X57×1)
WARN lessons-ch11.json: 16 lint issue(s)  (X2×3, X48×1, X49×7, X49B×4, X57×2)
WARN lessons-ch12.json: 12 lint issue(s)  (X2×1, X49×7, X49B×1, X57×1)
WARN lessons-ch13.json: 12 lint issue(s)  (X2×3, X49×5, X49B×2, X57×3)
WARN lessons-ch14.json: 10 lint issue(s)  (X2×1, X48×1, X49×2, X49B×4, X57×2)
WARN lessons-ch15.json:  9 lint issue(s)  (X2×1, X49B×6, X49×1, X57×1)
WARN lessons-ch16.json: 10 lint issue(s)  (X49×3, X49B×2, X57×5)
Total mirror-lint issues: 447
(warn-only; MIRROR_LINT_STRICT=1 to fail build)
Build: PASS
```

**新發現 (本輪掃描):** validate-lessons 目前無 X75 規則 (A6 stem-answer overlap) — 故以下兩個 A6_EXACT 違規未被現有 linter 捕獲。

---

## B. Violation Table

| # | Priority | Ch | Q ID | type | Sentence snippet | Question | Correct option | Violation | 修法 | audio regen? |
|---|----------|----|------|------|-----------------|---------|---------------|-----------|------|-------------|
| 1 | **P0** | 12 | kt-ch12-l4-x7 | comprehension | "Tears fell on **both** sides of the wide silver river." | Who was crying beside the silver river? | (1) "only Zhinu cried" ← MARKED CORRECT | **CORRECT_INDEX_ERROR** — sentence says "both sides"; correct is option (2) "both of them cried" | `correctIndex: 2` | No |
| 2 | **P0** | 12 | kt-ch12-l4-lg2 | comprehension | "Niulang stood on one side. Zhinu stood far on the other. Tears fell on both sides…" | Why did tears fall on both sides of the river? | (1) "Niulang was angry at the silver river for being too wide" ← MARKED CORRECT | **CORRECT_INDEX_ERROR** — sentence supports mutual longing, not anger; correct is option (0) "Both Niulang and Zhinu were apart and full of longing" | `correctIndex: 0` | No |
| 3 | **P0** | 14 | kt-ch14-l3-x5 | comprehension | "A beautiful princess sat on a throne inside." | Where was the princess sitting? | (2) "on a **golden** throne" | **FABRICATED_MODIFIER** — sentence says "a throne"; "golden" is not in source text. Learner studying sentence cannot verify claim. | Replace with "on a throne inside the palace" | No |
| 4 | **P0** | 14 | kt-ch14-l3-x2 | comprehension | "The walls shone like pearl and the gates were made of shell." | What were the **walls** made of? | (0) "**walls** that shone like pearl" | **A6_EXACT** — "walls" appears verbatim in Q stem and in correct option (also X48 already flagged: "shone like pearl" 3-gram echo from sentence) | Replace: "material that gleamed like pearl" | No |
| 5 | **P1** | 9 | kt-ch9-l4-x2 | comprehension | "A kind old woman… No door opened. No window moved." | What is unusual about how the old woman **appeared**? | (2) "no door or window had opened when she **appeared**" | **A6_TRIANGLE_LEAK** — "appeared" in both Q stem and correct option; also door/window/opened echo sentence | Replace: "she arrived without any door or window opening" | No |
| 6 | **P1** | 11 | kt-ch11-l3-x2 | comprehension | "Hou Yi walked across the **dry brown** land." | What did the land look like when Hou Yi walked on it? | (1) "**dry and brown** all over" | **R1_EXACT** — "dry" + "brown" 2-gram verbatim echo from sentence to correct option | Replace: "parched and scorched everywhere he stepped" | No |
| 7 | **P1** | 15 | kt-ch15-l3-x2 | comprehension | "The two strangers pointed at **empty looms** with proud hands." | What were the strangers pointing at? | (0) "the **empty looms** before them" | **R1_EXACT** — "empty looms" 2-gram verbatim echo | Replace: "bare weaving frames with nothing on them" | No |
| 8 | **P2** | 13 | kt-ch13-l5-x2 | comprehension | "He put on grandma's sleeping cap. He climbed into her bed." | Why did the wolf put on grandma's cap and get **into** her bed? | (3) "to fool her **into** thinking he was **grandma**" | **A6_CONTENT_WORDS** — "into" + "grandma" appear in both Q stem and correct option | Replace: "to trick her into believing he was her grandmother" → but "her grandmother" still weak; try "to deceive her into thinking he was the old woman" | No |
| 9 | **P2** | 16 | kt-ch16-l3-x2 | comprehension | "His mother gave him a **sewing needle** for a sword." | What did his mother give him to use as a sword? | (2) "the **sewing needle** itself" | **R1_MODERATE** — "sewing needle" 2-gram verbatim echo from sentence | Replace: "the small sharp pin from her sewing box" | No |
| 10 | **P2** | 16 | kt-ch16-l3-x4 | comprehension | "He used a **chopstick** as an oar. He pushed off." | What did Issun use as an oar? | (3) "the **chopstick** he carried" | **R1_MODERATE** — "chopstick" verbatim echo | Replace: "a long thin dining stick he brought along" | No |

---

## C. Stats

| Category | Count |
|----------|-------|
| Total Q scanned (Ch9–16) | 880 |
| Eligible for A6 angle | ~352 |
| **P0 — wrong correctIndex (CORRECT_INDEX_ERROR)** | **2** |
| **P0 — fabricated modifier in correct option** | **1** |
| **P0 — A6_EXACT (correct option noun appears verbatim in stem)** | **1** |
| P1 — A6_TRIANGLE_LEAK | 1 |
| P1 — R1_EXACT (2-gram verbatim echo, distinct from A6) | 2 |
| P2 — R1_MODERATE / A6_CONTENT_WORDS | 3 |
| validate-lessons existing issues (Ch9–16 total) | 86 |
| A6 captured by existing linter (X48) | 1 (Ch14 l3-x2 partial) |
| A6 NOT captured by existing linter | 3+ |

---

## D. Top 5 P0

1. ⚠️ **kt-ch12-l4-x7** — correctIndex=1 "only Zhinu cried" is factually wrong; sentence says "tears fell on **both** sides." A learner choosing (2) "both of them cried" would be marked wrong. Fix: `correctIndex: 2`.

2. ⚠️ **kt-ch12-l4-lg2** — correctIndex=1 "Niulang was **angry** at the silver river for being **too wide**" — neither claim is in the 3-sentence stimulus. Correct is (0) "Both Niulang and Zhinu were apart and full of longing." Fix: `correctIndex: 0`.

3. ⚠️ **kt-ch14-l3-x5** — correct option "on a **golden** throne" fabricates "golden" — sentence says only "a throne inside." Fix: remove the fabricated modifier.

4. ⚠️ **kt-ch14-l3-x2** — A6_EXACT: "walls" in Q stem and in correct option. Correct option "walls that shone like pearl" also triggers X48 (already in linter). Fix: rephrase to "material that gleamed like pearl" or "surfaces as bright as a pearl."

5. **kt-ch9-l4-x2** — A6_TRIANGLE_LEAK: the word "appeared" bridges Q stem → correct option, removing cognitive demand. Secondary: door/window/opened are echoed from sentence. Fix: "arrived without any door or window moving."

---

## E. Narrative Voice / Pacing Improvement Suggestions

*(Required even if no R1–R8 violations — 3 suggestions per spec)*

### E1 — Ch12 inference-question density too low (detail-recall dominated)
Ch12 (Cowherd-Weaver) is rich in emotional subtext (longing, sacrifice, duty) but its comprehension questions skew toward detail recall: "What did the Queen use?" / "What appeared after she drew the line?" / "Where was she sitting?" — all verifiable by scanning the sentence for nouns. Only l3-x4 ("What does 'he did not rush' tell us?") reaches inference-level. Recommendation: replace 2 detail-recall comprehension questions per lesson with inference prompts anchored on emotional beats, e.g. "What does Zhinu's silence tell us about her feelings?" — aligning with spec R6 (≥2 inference per 12-Q lesson).

### E2 — Ch14 over-reliance on palace-description stimulus
Lesson kt-ch14-l3 uses "The walls shone like pearl and the gates were made of shell." as the stimulus for BOTH listen-mc q3 ("What was the sea palace like?") AND comprehension x2 ("What were the walls made of?") — X49B already flagged. Three questions (q3, x2, x3-listen-tf) all reference this single sentence within one lesson, causing the learner to pattern-match after the first pass. Recommendation: cycle x2 to the sentence "A beautiful princess sat on a throne inside." (once the fabricated-modifier bug in x5 is fixed), creating variety across the lesson's comprehension layer.

### E3 — Ch16 Issun-boshi tools echo too literally (missed opportunity for inference)
Ch16 l3-x2 and l3-x4 both ask "What did X use as Y?" with correct options that echo the tool name verbatim ("sewing needle," "chopstick"). These are pure detail-recall questions sharing the same cognitive template, creating a monotone two-question block. Upgrade one to an inference question: e.g. "Why did Issun choose a needle rather than ask for a real sword?" — pushing toward understanding of character motivation (spec R6: ≥2 inference per lesson). The current two-question block also constitutes a covert R5 Jaccard violation (same WH-question scaffold, same content domain).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #118 — X75_A6_STEM_ANSWER_OVERLAP lint rule

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|------------|--------|-----|---------|
| Lint rule: detect when ≥2 content words of the correct option appear in the question stem (A6 cueing flaw per Haladyna 2002) | [Frontiers 2026 — AI-assisted MCQ IWFs](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2026.1831250/full) / [PMC: Do IWFs reduce psychometric quality?](https://pmc.ncbi.nlm.nih.gov/articles/PMC4982015/) / [arXiv 2602.17377 — Corpus prevalence of MCQ options](https://arxiv.org/html/2602.17377v2) | ✅ 完全適合 — 純字串操作，加進 validate-lessons.js 現有 X48/X57 路徑旁即可；warn-only 同既有 X48 | Low (1–2h) | High — 2026 Frontiers paper 確認 AI-generated MCQs 有系統性偏向在正解中重複 stem 字彙 (automation bias)；現 linter 只抓 sentence→option (X48)，**缺 stem→option 路徑**；本次掃描已手動找到 3 個 uncaught A6 instances | ✅ 推薦實作 |

**實作細節:**
```js
// validate-lessons.js — 加在 X48 check 後面
// X75_A6_STEM_ANSWER_OVERLAP
const STOP_WORDS = new Set(['the','a','an','is','are','was','were','to','of','and','or','in','on','at','it','he','she','they','we','you','i','not','do','does','did','can','will','that','this','has','have','had','his','her','its','with','for','from','be','been','by','as','up','out','all','one','what','when','where','who','how','why','which','there','so','no','yes','but','if','then','than','him','them']);
function contentWords(s) {
  return (s || '').toLowerCase().match(/[a-z]+/g)?.filter(w => w.length >= 3 && !STOP_WORDS.has(w)) ?? [];
}
if (q.question && Array.isArray(q.options) && q.correctIndex != null) {
  const qCW = new Set(contentWords(q.question));
  const optCW = contentWords(q.options[q.correctIndex]);
  const overlap = optCW.filter(w => qCW.has(w));
  if (overlap.length >= 2) {
    warn(lessonId, q.id, `X75_A6_STEM_ANSWER_OVERLAP (正解與 question stem 共享 ${overlap.length} 個內容詞「${overlap.slice(0,3).join(' / ')}」— 退化成 scan-match)`);
  }
}
```

**業界 evidence:**
- Haladyna et al. 2002: "cueing flaw" (stem vocabulary in key) = one of 6 most-common IWFs across 100+ studies
- Frontiers 2026: AI-generated MCQs showed statistically significant automation bias toward reusing stem vocabulary in correct options; human-reviewed items showed 3× lower cueing rate
- arXiv 2602.17377 (2025): in a 200K MCQ corpus, longest-option-is-correct in 55% of items (R2 flaw) AND stem-word-in-correct in 43% of items (A6 flaw)
- ETS official item-writing guidelines: "the correct answer should not contain words used in the stem that are not also used in the distractors"

**Pickup 現況:** linter has X48 (sentence→option verbatim) but NOT stem→option. This run found 3+ uncaught instances across 352 eligible questions in Ch9–16 alone. Conservative estimate: 15–25 A6 instances across all 32 chapters. Effort to implement: ~1h (add 10 lines to validate-lessons.js). Effort to fix caught violations: ~30 min per audit cycle.

**Not recommended separately this cycle:** X76_CORRECT_INDEX_SEMANTIC_MISMATCH (sentence "both/all/every" → correct "only/nobody") — the 2 instances in Ch12 are content errors, not structural; fix them directly (see P0 #1 and #2 above). A lint rule would require semantic parsing beyond simple regex and may produce high false-positive rate.

---

*Audit complete. Violations found: 4×P0, 3×P1, 3×P2. Build: PASS. No src/ or lessons-ch*.json modified.*
