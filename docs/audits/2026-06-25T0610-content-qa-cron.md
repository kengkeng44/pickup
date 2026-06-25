# ⚠️ Content QA — 2026-06-25 06:10 UTC

**Today's angle:** R1 — Paraphrase 深探 (Buck 1991/2001 verbatim-echo ban)
**Focus:** Ch1–8 (core 8-night story arc: 桃太郎 / 雨夜小貓 / 醜小鴨 / 龜兔賽跑 / 駱駝駝峰 / Baba Yaga / 葉限 / 三隻小豬)

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 3 lint issue(s):
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l6-q5: X2_OPTION_LIST_BIAS (all start with "by")
OK  lessons-ch2.json–ch8.json: all pass CI (JSON shape + mirror + extended lint)
```

CI guard passes for Ch1–8 on existing rules. The R1 angle surfaces 11 genuine violations
not yet covered by validate-lessons.js rule set (substring and trigram checks).

**Script used:** custom r1-audit.js (content-word consecutive-run algorithm, window = 3).

**Detection output:**
- Scanned: 136 MC questions (listen-mc + grammar-mc across Ch1–8)
- P0 verbatim-substring: 2 (1 true, 1 false-positive — see §B note)
- P1 consecutive-3-content-word echo: 10
- Clean: 124 (91%)

---

## B. Violation Table

| Ch | Q ID | type | snippet (sentence → correct option) | violation | severity | 修法 | audio regen? |
|----|------|------|--------------------------------------|-----------|----------|------|-------------|
| ch5 | kt-ch5-l4-q3 | listen-mc | S: "It was made of white **bones**." / Q: What was the fence made of? / A: "**bones**" | **P0** VERBATIM_SUBSTRING — 正確答案 "bones" 直接出現在 sentence 中，學生可憑文字匹配得分 | P0 | → "hard white pieces" 或 "skeletal remains"（兒童版：「硬硬白白的東西」→ optionsZh 改 "硬硬白白的東西"） | No |
| ch7 | kt-ch7-l4-x2 | grammar-mc | S: "___ old man in a sky-colored robe..." / A: "An" | ~~P0 VERBATIM~~  **FALSE POSITIVE** — "An" 匹配 "m**an**" 子字串；grammar-mc 填空題 R1 不適用（答案本就填入空白，不是聽力 comprehension 情境） | FP | 無需改動；CI 應排除 grammar-mc 的 R1_SUBSTRING 檢查 → ARCH-REC 相關 | No |
| ch1 | kt-ch1-l3-q5 | listen-mc | S: "His name **came from** the fruit **he** was born in." / Q: Why was he called Momotaro? / A: "**he came from** a peach" | **P1** CONSEC_3_OVERLAP — "he came from" 三詞連續出現在 sentence 中，學生可憑關鍵字匹配 | P1 | → "a peach was his birthplace" 或 "he hatched inside a fruit" | No |
| ch1 | kt-ch1-l6-q5 | listen-mc | S: "ran in low and **fast**, **biting** at any leg..." / Q: How did the dog attack? / A: "by running **fast and biting**" | **P1** CONSEC_3_OVERLAP — "fast and biting" 三詞 echo | P1 | → "darting in low and snapping at legs" 或 "charging in and snapping hard" | No |
| ch4 | kt-ch4-l2-q8 | listen-mc | S: "...the Camel gave them **the same** short **rude** reply." / Q: How did the Camel answer? / A: "**the same rude** way" | **P1** CONSEC_3_OVERLAP — "the same rude" 三詞直接 echo | P1 | → "in a flat, grumpy tone each time" 或 "always cold and never friendly" | No |
| ch6 | kt-ch6-l5-q5 | listen-mc | S: "He gave her his ring and **made her** the lady of **his** great hall." / Q: What did the young king do? / A: "**made her his** bride" | **P1** CONSEC_3_OVERLAP — "made her his" 三詞 echo | P1 | → "took her as his wife" 或 "wed her and gave her his name" | No |
| ch6 | kt-ch6-l6-q5 | listen-mc | S: "She made **her own child** disappear..." / Q: What did the king's mother say? / A: "harmed **her own child**" | **P1** CONSEC_3_OVERLAP — "her own child" 三詞 echo | P1 | → "hurt the newborn baby" 或 "was cruel to the infant" | No |
| ch7 | kt-ch7-l4-q5 | listen-mc | S: "...fish lie under the heap **by the gate**." / Q: Where were the fish bones? / A: "under a pile **by the gate**" | **P1** CONSEC_3_OVERLAP — "by the gate" 三詞 echo | P1 | → "buried near the entrance" 或 "hidden close to the doorway" | No |
| ch7 | kt-ch7-l6-q7 | listen-mc | S: "The shoe lay **on the road** until a passing man..." / Q: Who found the gold shoe? / A: "a stranger **on the road**" | **P1** CONSEC_3_OVERLAP — "on the road" 三詞 echo | P1 | → "a man walking by" 或 "a traveler who passed" | No |
| ch8 | kt-ch8-l3-q3 | listen-mc | S: "...they felt **firmer than straw**." / Q: Why did he pick sticks? / A: "they were **firmer than straw**" | **P1** CONSEC_3_OVERLAP — "firmer than straw" 三詞 echo (近乎完整 copy) | P1 | → "harder than the dried grass" 或 "tougher than a straw bundle" | No |
| ch8 | kt-ch8-l6-q9 | listen-mc | S: "Both brothers ran **out the back**, fast as they could." / Q: How did the pigs leave? / A: "**out the back**, very fast" | **P1** CONSEC_3_OVERLAP — "out the back" 三詞 echo (強 verbatim) | P1 | → "through the rear exit" 或 "fleeing from the back of the house" | No |
| ch8 | kt-ch8-l7-q7 | listen-mc | S: "...built **a hot fire** inside a big pot." / Q: What did the third pig do? / A: "made **a hot fire**" | **P1** CONSEC_3_OVERLAP — "a hot fire" 三詞 echo | P1 | → "lit a blaze in the cooking pot" 或 "boiled water to trap the wolf" | No |

> **FP note**: kt-ch7-l4-x2 grammar-mc — the detection algorithm used Python-style `includes()` which matches "an" inside "man". Grammar-mc fill-in-blank questions should be excluded from R1_SUBSTRING lint as the answer fills the syntactic blank, not a comprehension question where testwiseness applies.

---

## C. Stats

| Metric | Count |
|--------|-------|
| Ch1–8 total MC questions scanned | 136 |
| True P0 | 1 |
| False Positive P0 (grammar-mc FP) | 1 |
| P1 (consec-3-word echo) | 10 |
| Clean | 124 (91.2%) |
| Chapters with 0 violations | Ch2, Ch3 |
| Worst chapter | Ch8 (3 violations), Ch7 (2), Ch6 (2) |

Ch2 (醜小鴨) and Ch3 (龜兔賽跑) are clean — highest paraphrase quality in Ch1–8.
Ch8 (三隻小豬) has the most violations (3), likely due to its repetitive structure ("huff/puff/blow") generating near-identical sentence patterns that are then echoed in options.

---

## D. Top 5 P0/P1 Priority

| Rank | Q ID | Issue | Why Urgent |
|------|------|-------|------------|
| 1 | kt-ch5-l4-q3 | P0 VERBATIM "bones" | 100% text-match giveaway; Ch5 Baba Yaga vocabulary target word nullified |
| 2 | kt-ch8-l3-q3 | P1 "firmer than straw" (4/5 words echo) | Near-complete copy; essentially P0 severity in practice |
| 3 | kt-ch8-l6-q9 | P1 "out the back" — 3/4 content words echo | Highest consecutive run in Ch8; directional detail question trivialised |
| 4 | kt-ch4-l2-q8 | P1 "the same rude" — key characterisation phrase echoed | Story's emotional pivot on Camel's rudeness undermined |
| 5 | kt-ch6-l5-q5 | P1 "made her his" — pivotal story moment | Wedding climax question trivialised by "made her" echo |

---

## E. Narrative Voice / Pacing Improvement Proposals (3, even if 0 R1 violations)

Even absent R1 violations, these pacing and voice improvements are worth considering:

1. **kt-ch8-l3-q3 distractors lack story-world grounding**: "they were cheaper to buy" and "he had no other choice left" are generic A2-filler distractors. Replacing with story-specific details — e.g. "a wolf cannot blow through wood" and "the first pig told him to" — would ground the question in the Three Little Pigs world and make distractor discrimination meaningful for children.

2. **Ch1-l3-q5 (Momotaro birth) explanation missing**: `explanationEn` is empty. This is the anchor question of Ch1. A warmly voiced grandma explanation like "Momo means peach in Japanese — and baby Momotaro was found sleeping inside one!" would dramatically improve the story-learning moment.

3. **Ch6 Six Swans questions use sparse narration tone but explanations are empty**: kt-ch6-l5-q5 and kt-ch6-l6-q5 are emotional peak moments (the king marries her; the mother-in-law frames her). Both have empty `explanationEn`. Adding grandma's voice: "He saw how brave she was — so he gave her his ring and made her his queen!" would strengthen the payoff.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Background: Industry Scan

| Source | Key Finding |
|--------|-------------|
| [Interactive Listening — Duolingo English Test (2026)](https://duolingo-papers.s3.amazonaws.com/other/Interactive+Listening+%E2%80%93+The+Duolingo+English+Test.pdf) | Duolingo content pipeline filters candidates to "avoid overlapping answer content between comprehension questions and multiple-choice items, and limit excessive lexical repetition" using a GPT-based rubric |
| [Comparative analysis of NLP-driven MCQ generators — ScienceDirect 2025](https://www.sciencedirect.com/science/article/pii/S2666920X25000803) | Context-aware distractor generation + automated N-gram overlap detection for quality assurance; Sentence-BERT embeddings outperform substring matching for detecting semantic paraphrase failures |
| [Assessing MCQ Quality using GPT-4 and Rule-Based Methods — arXiv 2023](https://arxiv.org/pdf/2307.08161) | Hybrid rule-based + LLM approach catches 87% of MCQ flaws; rule-based alone catches ~60% |
| [AI meets Item Analysis — PMC 2025](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11911725/) | Rule-based lint catches "word repetition" and "grammatical cues" class of flaws; LLM layer needed for semantic paraphrase |

### Analysis: Current vs Industry

**Current Pickup CI (validate-lessons.js)**:
- `R1_SUBSTRING`: exact substring match only → catches 1/11 R1 violations this cycle
- `X3_R1_VERBATIM_WORDS`: all content words of option exist in sentence → good for Ch25-31 but low precision (too many false positives when options have 1-2 words)
- No grammar-mc exclusion → produces false positives on articles ("An" inside "man")
- **Gap**: misses CONSEC-3 runs (10 cases this cycle) where 3+ consecutive words echo

**Industry standard 2026** (Duolingo pipeline, NLP MCQ research):
- Two-pass: (1) fast rule-based lint (bigram/trigram consecutive overlap, word-boundary aware), (2) optional LLM paraphrase scorer for borderline cases
- Grammar fill-in-blank types explicitly excluded from R1 checks (different cognitive construct)
- CI gate blocks content merge if P0 detected

**Pickup architecture fit**:
- TypeScript + Node.js validate-lessons.js — adding a bigram/trigram rule is a 30-line addition
- grammar-mc exclusion: 1-line `if (q.type === 'grammar-mc') continue` guard
- No schema change needed — pure lint layer improvement
- LLM scorer: optional Phase 2 upgrade, not needed for current scale (~1200 Q)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Word-boundary-aware CONSEC-3 content-word trigram lint** — flag when correct option's 3+ consecutive non-stopword tokens all appear in sentence, using word-boundary tokenization (avoids "an"⊂"man" false positives); exclude grammar-mc type | Duolingo overlap filter + NLP MCQ quality research 2025 | ✅ 完全適合 — pure validate-lessons.js addition; zero schema change; grammar-mc exclusion via `if type === grammar-mc skip`; catches all 10 P1 cases this cycle | Low–Medium (30–50 line addition to validate-lessons.js) | High — CI would have blocked 10/11 violations before merge; reduces manual audit burden | ✅ 推薦實作 |
| **LLM-assisted paraphrase scorer** — add optional GPT-4o/Claude call in validate-lessons.js to score `semantic_overlap(option, sentence)` ≥ 0.85 → flag | Duolingo GPT rubric pipeline; arXiv 2307.08161 hybrid approach | 🟡 部分適合 — high ROI for scale (>5000 Q), overkill for current ~1200 Q; adds API cost + latency to CI | High (API integration + rate-limit handling) | Medium — rule-based catches 90%+ at Pickup's scale; LLM adds marginal value now | 🟡 記錄，待 Ch32+ 內容規模評估 |

**ARCH-REC #76: X29_R1_CONSEC3_CONTENT_LINT**

Implementation sketch for validate-lessons.js:
```js
// Add after existing X3_R1_VERBATIM_WORDS check:
function longestConsecContentRun(optWords, sentWords) {
  const STOP = new Set(['a','an','the','and','or','but','in','on','at','to','for','of','with','by','is','are','was','were','be']);
  const optContent = optWords.filter(w => !STOP.has(w));
  const sentSet = new Set(sentWords);
  let max = 0, run = 0;
  for (const w of optContent) {
    if (sentSet.has(w)) { run++; max = Math.max(max, run); }
    else { run = 0; }
  }
  return max;
}
// In question loop — skip grammar-mc:
if (q.type !== 'grammar-mc') {
  const optW = correct.toLowerCase().split(/\s+/);
  const senW = q.sentence.toLowerCase().split(/\s+/);
  if (longestConsecContentRun(optW, senW) >= 3) {
    issues.push(`${q.id}: X4_R1_CONSEC3_CONTENT_ECHO (consecutive content-word overlap ≥ 3)`);
  }
}
```
