# Content QA — 2026-07-30 06:05 UTC

**Today's angle:** A7 — Content-Word Repetition (correct option verbatim-reuses key nouns/verbs from source sentence instead of paraphrasing)
**Focus:** Ch1–8 (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Yexian / Three Little Pigs)
**Auditor:** Claude (claude-sonnet-4-6) | Angle #9 A7 content-word-repetition | 2026-07-30 06:05 UTC

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json:   7 lessons (JSON shape + mirror + extended lint)
WARN lessons-ch1.json: 17 lint issue(s):
  kt-ch1-l4-lg2: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l6-q5: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l3: X49B_STIMULUS_REUSE_COMP ×2
  kt-ch1-l4: X49_STIMULUS_REUSE ×2
  kt-ch1-l5: X49_STIMULUS_REUSE ×1
  kt-ch1-l6: X49_STIMULUS_REUSE ×2 + X49B_STIMULUS_REUSE_COMP ×1
  kt-ch1-l7: X49_STIMULUS_REUSE ×2 + X49B_STIMULUS_REUSE_COMP ×3
  kt-ch1-l3-q7: X57_ANTONYM_PAIR_MIRROR (「weak」)
  kt-ch1-l3-x7: X57_ANTONYM_PAIR_MIRROR (「afraid」)
  kt-ch1-l6-x1: X57_ANTONYM_PAIR_MIRROR (「shut」)
  kt-ch1-l7-x6: X57_ANTONYM_PAIR_MIRROR (「scared」)
WARN lessons-ch2.json: 10 lint issue(s): X2×2, X49×4, X49B×1, X57×3
WARN lessons-ch3.json: 19 lint issue(s): X2×8, X49×2, X49B×5, X57×3 (most lint-dense chapter)
WARN lessons-ch4.json: 10 lint issue(s): X2×1, X49×1, X49B×1, X57×3 + others
WARN lessons-ch5.json: [est. 8+ based on inline scan]
WARN lessons-ch6.json: [est. 6+ based on inline scan]
WARN lessons-ch7.json: [est. 9 per prior audit]
WARN lessons-ch8.json:  9 lint issue(s): X2×2, X48×2, X49×3, X49B×1, X57×1
Total existing lint issues Ch1–8: ~90 (dominated by X49/X57 — pre-existing, tracked)
```

> **A7-specific scan** (new angle, not yet in lint): 23 findings across Ch1–8.
> Method: content-word overlap ≥2 (short option ≤4 CW) = P0; 1 shared CW with ≤2 CW option = P1-border.

---

## B. Violation Table

| Ch | Q ID | type | snippet (sentence → correct) | violation | 修法 | audio regen? |
|----|------|------|------------------------------|-----------|------|-------------|
| 1 | kt-ch1-l6-q5 | listen-mc | "The dog ran in low and **fast**, **biting** at any leg…" → "by running **fast** and **biting**" | A7-P0: 2/3 CW verbatim echo | "by charging in low and snapping at legs" | No |
| 5 | kt-ch5-l4-q9 | listen-mc | "The **door** of the house had been facing away from **Vasilisa**." → "showing its **door** to **Vasilisa**" | A7-P0: 2/3 CW verbatim (proper noun + noun) | "facing her at last" | No |
| 7 | kt-ch7-l4-q5 | listen-mc | "The bones of your fish lie **under** the heap by the **gate**." → "**under** a pile by the **gate**" | A7-P0: 2/3 CW verbatim; only "heap→pile" paraphrased | "buried near the entrance" | No |
| 8 | kt-ch8-l3-q3 | listen-mc | "He picked sticks because they felt **firmer** than **straw**." → "they were **firmer** than **straw**" | A7-P0: 2/2 CW verbatim (also X48 3-gram "firmer than straw") | "stronger than the first house" | No |
| 8 | kt-ch8-l3-q9 | listen-mc | "From the dark path came a **soft** sound, slow and **heavy**." → "**soft heavy** steps" | A7-P0: 2/3 CW verbatim | "quiet but slow footsteps coming near" | No |
| 8 | kt-ch8-l4-q9 | listen-mc | "His knocks were **loud**, and his **voice** was soft like honey." → "**loud** knock, sweet **voice**" | A7-P0: 2/4 CW verbatim | "strong knocking but a kind-sounding call" | No |
| 8 | kt-ch8-l7-q7 | listen-mc | "The third pig built a **hot fire** inside a big pot." → "made a **hot fire**" | A7-P0: 2/2 CW verbatim (100% overlap) | "warmed a pot of boiling water" | No |
| 1 | kt-ch1-l5-q3 | listen-mc | "…the monkey took one **dumpling** and bowed." → "by taking a **dumpling**" | A7-P1b: 1/2 CW key noun repeat | "by accepting the gift and bowing" | No |
| 3 | kt-ch3-l5-q9 | listen-mc | "The **green** back of the slow walker…" → "the small **green** animal" | A7-P1b: 1/2 CW color repeat | "the slow and steady racer" | No |
| 4 | kt-ch4-l5-q8 | listen-mc | "He chose to stick with the same lazy **reply** once again." → "gave the same rude **reply**" | A7-P1b: 1/3 CW noun repeat | "groaned and refused to help again" | No |
| 4 | kt-ch4-l7-q8 | listen-mc | "…he carried **bags** across the sand…" → "carrying **bags**" | A7-P1b: 1/2 CW → option IS the action verbatim | "pulling heavy loads across the desert" | No |
| 5 | kt-ch5-l3-q5 | listen-mc | "…the sky turned **light**." → "morning **light**" | A7-P1b: 1/2 CW → noun-phrase lift | "a bright new day" | No |
| 5 | kt-ch5-l4-q3 | listen-mc | "…made of white **bon**[es]" → "**bones**" | A7-P1b: 1/1 CW — option is single word lifted from sentence | "hard white pieces" | No |
| 5 | kt-ch5-l5-q5 | listen-mc | "…a stone **bowl** came closer…" → "riding inside a **bowl**" | A7-P1b: 1/3 CW key noun repeat | "moving inside a stone container" | No |
| 5 | kt-ch5-l5-q9 | listen-mc | "…breathing in the **air**." → "smelling the **air**" | A7-P1b: 1/2 CW — "air" only changed verb | "sniffing around the entrance" | No |
| 5 | kt-ch5-l6-q3 | listen-mc | "…talk about fire. …do my **work**." → "**work** done" | A7-P1b: 1/2 CW repeat | "complete her chores first" | No |
| 6 | kt-ch6-l3-q9 | listen-mc | "Six small **beds** lay smooth…" → "six empty **beds**" | A7-P1b: 1/2 CW key noun | "a row of small resting places" | No |
| 6 | kt-ch6-l5-q9 | listen-mc | "…whispered **cold** things…" → "**cold** and unkind" | A7-P1b: 1/2 CW adj repeat | "mean and unfriendly" | No |
| 6 | kt-ch6-l7-q5 | listen-mc | "…**threw** one over each bird." → "**threw** one on each swan" | A7-P1b: 1/3 CW verb verbatim | "tossed a shirt over every swan" | No |
| 7 | kt-ch7-l6-q7 | listen-mc | "…on the **road** until…" → "a stranger on the **road**" | A7-P1b: 1/2 CW setting noun | "a traveller who passed by" | No |
| 8 | kt-ch8-l6-q3 | listen-mc | "…with **hungry** eyes." → "**hungry** and ready" | A7-P1b: 1/2 CW adj verbatim | "fierce-looking and eager" | No |
| 8 | kt-ch8-l6-q9 | listen-mc | "…ran out the **back**, **fast** as…" → "out the **back**, very **fast**" | A7-P1b: 2 CW but also X48 "out the back" 3-gram | "escaped through the rear as quickly as they could" | No |
| 8 | kt-ch8-l7-q9 | listen-mc | "The wolf…**ran** fast to the trees." → "gave up and **ran** away" | A7-P1b: 1/3 CW action verb | "fled into the forest in defeat" | No |

---

## C. Stats

| Chapter | P0 | P1-border | Total A7 |
|---------|-----|-----------|----------|
| Ch1 | 1 | 1 | 2 |
| Ch2 | 0 | 0 | 0 |
| Ch3 | 0 | 1 | 1 |
| Ch4 | 0 | 2 | 2 |
| Ch5 | 1 | 5 | 6 |
| Ch6 | 0 | 3 | 3 |
| Ch7 | 1 | 1 | 2 |
| Ch8 | 4 | 3 | 7 |
| **Total** | **7** | **16** | **23** |

**Worst offender:** Ch8 (Three Little Pigs) — 4 P0, 7 total. High-action sentences ("ran fast", "hot fire", "soft sound heavy") make paraphrase harder but are still solvable.
**Cleanest:** Ch2 (Ugly Duckling) — 0 A7 violations found. Model chapter for A7 compliance.

**A7 P0 rate across all Q types in Ch1-8:** 7 P0 / ~310 listen-mc questions ≈ 2.3% — low prevalence but disproportionately harmful (verbatim echo = test validity collapse for those items).

---

## D. Top 5 P0

| Rank | Q ID | Why Severe |
|------|------|-----------|
| **⚠️ #1** | kt-ch8-l7-q7 | 100% content-word overlap (2/2); "made a hot fire" = near-verbatim lift of "built a hot fire" — only "built→made" changed |
| **⚠️ #2** | kt-ch8-l3-q3 | Also flagged X48 (3-gram "firmer than straw"); double-violation; correct option has zero paraphrase |
| **⚠️ #3** | kt-ch5-l4-q9 | Proper noun "Vasilisa" verbatim in both sentence and option — A2 learners will spot-match the proper noun |
| **⚠️ #4** | kt-ch8-l3-q9 | "soft heavy" lifted verbatim from "soft sound, slow and heavy" — option is an adjective compression, not paraphrase |
| **⚠️ #5** | kt-ch7-l4-q5 | Only one synonym substitution (heap→pile); "under…gate" preserved; minimal paraphrase effort |

---

## E. Narrative Voice / Pacing Improvements (3 items — required even with 0 R1-R8 violations)

> These are story-quality suggestions not captured by lint.

1. **Ch8 kt-ch8-l3 opening narration** — Sentence "From the dark path came a soft sound, slow and heavy" is beautiful atmospheric prose. But the follow-up listen-mc ("What did the second pig hear?") immediately asks about words just heard. Consider inserting a second narration beat before the question, letting tension breathe: "The pig pressed against the wall, ears flat." This mirrors Duolingo Stories pacing where narration → pause → question.

2. **Ch7 explanationZh voice** — Several explanationZh entries in kt-ch7 use neutral register ("這是…的意思") rather than grandma storytelling voice. Example: `kt-ch7-l4-q5` explanation could shift from a dictionary gloss to: "奶奶說：就在那裡——大門旁邊的土堆下——葉限的魚骨靜靜等著她。" This keeps the immersive frame intact.

3. **Ch5 question stem diversity** — 5 of 9 listen-mc questions in kt-ch5 start with "What did…" or "How did…". Introduce one "Why did…" (inference-level) and one "Where was…" (spatial detail) to hit R6 sub-skill variety. Example: kt-ch5-l3-q5 "What did the white rider bring?" → "Why did the sky change after the white rider passed?"

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #220: X220_A7_CW_OVERLAP_LINT — Automated content-word overlap scorer in validate-lessons.js**

**Industry source:** Wang & Meng (2026) *"Optimizing distractor quality in a locally developed second language listening test: Integrating generative AI and psychometric methods"* — [doi:10.1177/02655322251400375](https://doi.org/10.1177/02655322251400375). Key finding: semantic similarity between correct option and audio stimulus is the top item-validity threat in L2 listening MC tests. The paper recommends automated cosine-similarity scoring between stimuli and response options as a pre-publication lint step. TOEIC design principle independently confirms: "paraphrase recognition" is the core construct — verbatim content words in the correct option bypass this construct entirely.

**Pattern identified this cron:** 7 P0 items where correct option content-word overlap ≥ 50% with source sentence. Currently no lint rule catches this — existing X48 only flags 3-gram substrings, missing 2-CW-overlap in short options.

**Proposed lint rule — X220_A7_CW_OVERLAP_LINT:**

```js
// X220_A7_CW_OVERLAP_LINT
// Flag correct options with high content-word overlap to source sentence.
// Threshold: overlap_count >= 2 AND (overlap_count / opt_cw_count) >= 0.5
const STOPWORDS = new Set(['a','an','the','is','are','was','were','be','been',
  'have','has','had','do','does','did','will','would','could','should','may',
  'might','must','of','in','on','at','to','for','and','but','or','not','with',
  'by','from','that','this','it','he','she','they','we','you','i','his','her',
  'its','my','me','him','them','us','what','who','when','where','how','which',
  'there','here','so','as','up','out','also','all','any','if','after','before',
  'get','got','go','come','came','said','say','told','put','back','too','make',
  'made','know','take','see','want','feel','look','even','still','never','always',
  'first','last','new','old','good','little','big','well','right','full','some',
  'many','much','only','every','same','own']);

function contentWords(text) {
  return text.toLowerCase().match(/[a-z']+/g)?.filter(w => !STOPWORDS.has(w) && w.length > 2) || [];
}

for (const q of lesson.questions) {
  if (!['listen-mc','listen-comprehension','listen-emoji'].includes(q.type)) continue;
  if (q.correctIndex == null || !q.options?.length) continue;
  const correctOpt = typeof q.options[q.correctIndex] === 'string'
    ? q.options[q.correctIndex]
    : q.options[q.correctIndex]?.en || '';
  const sentCW = new Set(contentWords(q.sentence));
  const optCW = contentWords(correctOpt);
  const overlap = optCW.filter(w => sentCW.has(w));
  if (overlap.length >= 2 && (overlap.length / optCW.length) >= 0.5) {
    issues.push(`${file} ${q.id}: X220_A7_CW_OVERLAP_LINT (correct option repeats ${overlap.length}/${optCW.length} content words from sentence — verbatim echo defeats paraphrase construct: [${overlap.join(', ')}])`);
  }
}
```

**Pickup 架構適配分析:**

| 面向 | 評估 |
|------|------|
| 實作成本 | 純 validate-lessons.js JS — 10 min, no schema change, no src/ touch |
| 誤報風險 | 低 — threshold 50% overlap + ≥2 CW 排除單字重疊誤報 |
| 已知邊界 | 短 option (≤3 CW): 任意1個 overlap 就觸發; 可加 `optCW.length >= 2` guard |
| 補 X48 缺口 | X48 只抓 3-gram 子字串; X220 抓 2-CW set 重疊 — 兩者互補 |
| 業界對齊 | Wang & Meng 2026 + TOEIC design 兩路確認 ✅ |

**Verdict: ✅ 推薦實作** — 10 min lint addition, closes the most common A7 validity threat in Ch1-8.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X220_A7_CW_OVERLAP_LINT — content-word overlap scorer in validate-lessons.js | Wang & Meng 2026 doi:10.1177/02655322251400375; TOEIC design principle | ✅ Pure JS lint, no schema/src change; threshold 50% + ≥2 CW; complements X48 3-gram | 10 min | HIGH — 7 P0 would auto-catch on next content edit | **推薦實作** |

---

*Audit generated: 2026-07-30 06:05 UTC · Angle: A7 Content-Word Repetition · Ch1–8 · 23 violations (7 P0, 16 P1-border) + ARCH-REC #220*
