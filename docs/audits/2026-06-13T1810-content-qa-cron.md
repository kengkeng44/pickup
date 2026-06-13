# Content QA — 2026-06-13 18:10 UTC

Today's angle: **A7 — Content-Word Repetition (Verbal Association Cluing)**
Focus: **Ch6–12 · listen-mc / listen-comprehension types**

> A7 rotation history: First dedicated A7 pass.
> Angle: When the correct answer contains ≥50% of its content words verbatim from the sentence AND ≥2 matching words, the question becomes solvable by surface pattern-matching rather than comprehension. Industry term: "word cluing" / "verbal association cluing" (Ibbett & Wheldon 2016; ETS item-writing doctrine).
> Scope: Ch6–12 (7 chapters × 7 lessons = 49 lessons). Ch9–12 scanned as extension; all violations found in Ch6–8.

---

## A. validate-lessons.js result

```
OK  lessons-ch6.json:  7 lessons  (0 lint issues)
WARN lessons-ch7.json:  7 lessons  (1 lint issue: X2_OPTION_LIST_BIAS kt-ch7-l7-q5 — pre-existing)
OK  lessons-ch8.json:  7 lessons  (0 lint issues)
OK  lessons-ch9.json:  7 lessons  (0 lint issues)
WARN lessons-ch10.json: 7 lessons  (1 lint issue: X2_OPTION_LIST_BIAS kt-ch10-l7-q7 — pre-existing)
OK  lessons-ch11.json: 7 lessons  (0 lint issues)
OK  lessons-ch12.json: 7 lessons  (0 lint issues)

Total new A7 violations detected by custom script: 7 (Ch6–8 only)
Ch9–12: 0 violations
CI does NOT currently lint A7_WORD_CLUING — 0 auto-flagged.
```

Custom detection script: content-word echo ≥50%, ≥2 matching non-stopwords between sentence and correct option.

---

## B. Violation table

| Ch | Q ID | Type | Sentence (excerpt) | Correct Option | Echoed Words | Violation | 修法 | audio regen? |
|----|------|------|--------------------|---------------|--------------|-----------|------|--------------|
| 8 | kt-ch8-l3-q3 | listen-mc | He picked sticks because they **felt firmer than straw**. | they were **firmer than straw** | firmer, straw (100%) | **P0★ A7** — "firmer than straw" almost verbatim; Q: "Why did he pick sticks?" solvable by copy-paste | → "the material was stronger" or "sticks held together better" | Yes (correct option) |
| 8 | kt-ch8-l3-q9 | listen-mc | From the dark path came a **soft** sound, **slow and heavy**. | **soft heavy** steps | soft, heavy (67%) | **P0 A7** — both adjectives lifted verbatim; Q: "What did the second pig hear?" | → "quiet plodding sounds" or "slow muffled footsteps" | Yes |
| 8 | kt-ch8-l7-q7 | listen-mc | The third pig built a **hot fire** inside a big pot. | made a **hot fire** | hot, fire (67%) | **P0 A7** — "hot fire" copied exactly; Q: "What did the third pig do?" | → "lit a flame in a pot" or "started a blaze inside" | Yes |
| 8 | kt-ch8-l4-q9 | listen-mc | His knocks were **loud**, and his **voice** was soft like honey. | **loud** knock, sweet **voice** | loud, voice (50%) | **P1 A7** — "loud" + "voice" both verbatim; "sweet" is good paraphrase of "soft like honey" | → "strong knock, gentle voice" (swap loud→strong, voice stays acceptable as structural need) | No |
| 7 | kt-ch7-l3-q10 | listen-comprehension | Yexian sat by the empty pond. Her **only friend** was gone. | Yexian loses her **only friend** | yexian, friend (67%) | **P1 A7** — "only friend" verbatim; "Yexian" is proper noun (unavoidable) but "only friend" echoes | → "Yexian grieves the loss of her companion" or "Yexian's beloved fish is gone" | No |
| 6 | kt-ch6-l7-q5 | listen-mc | She lifted the small white shirts and **threw** one over each bird. | **threw** one on each swan | threw, each (67%) | **P1 A7** — key action verb "threw" verbatim; "swan" paraphrases "bird" (good); Q: "What did she do?" | → "placed one shirt on each swan" or "draped a shirt over every bird" | No |
| 7 | kt-ch7-l4-q5 | listen-mc | The bones of your fish lie **under** the heap by the **gate**. | under a pile by the **gate** | under, gate (67%) | **P1 A7** — "under...gate" are the key location words, both verbatim; "pile" paraphrases "heap" (good) | → "under a pile near the entrance" (replace "gate" with synonym) | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | 7 (Ch6–12) |
| Lessons scanned | 49 |
| Total Q scanned | ~343 |
| A7 violations found | 7 |
| P0 (critical, audio regen needed) | 3 (all Ch8) |
| P1 (fix text only) | 4 (Ch6–8) |
| Ch9–12 extension | 0 violations |
| CI coverage for A7 | 0% (not linted) |
| Chapters most affected | **Ch8 (Three Little Pigs) — 4 of 7** |

**Pattern**: Ch8 (Three Little Pigs) is the highest-density A7 chapter. The repetitive story structure ("huff and puff", three pigs, same wolf approach) makes item writers reuse the same adjective/verb pairs across sentence→answer, creating word-cluing density.

---

## D. Top 5 P0

### P0★ #1 — kt-ch8-l3-q3 · "firmer than straw" near-verbatim

- **Sentence**: "He picked sticks because they felt firmer than straw."
- **Q**: Why did he pick sticks?
- **Current correct**: "they were firmer than straw" — "firmer than straw" is 4 of 4 content words echoed (100%). Only "felt" → "were" changes.
- **Fix**: Replace correct option with "the material was stronger" or "sticks held up better"
- **explanationZh**: Update: 比稻草硬 → 稻草軟，木棒硬 → firmer = stronger material
- **Audio regen**: Yes — correct MP3 changes

### P0 #2 — kt-ch8-l3-q9 · "soft heavy" adjective pair

- **Sentence**: "From the dark path came a soft sound, slow and heavy."
- **Q**: What did the second pig hear?
- **Current correct**: "soft heavy steps" — both adjectives "soft" + "heavy" verbatim from sentence
- **Fix**: "quiet plodding sounds" or "slow muffled footsteps"
- **explanationZh**: Update: 輕輕重重 → quiet + heavy = 沉穩腳步
- **Audio regen**: Yes

### P0 #3 — kt-ch8-l7-q7 · "hot fire" direct copy

- **Sentence**: "The third pig built a hot fire inside a big pot."
- **Q**: What did the third pig do?
- **Current correct**: "made a hot fire" — "hot fire" is the exact phrase from sentence, only "built" → "made"
- **Fix**: "lit a flame in a pot" or "prepared a fire trap" or "started a blaze"
- **explanationZh**: Update: 第三隻生火 → 鍋裡點火當陷阱
- **Audio regen**: Yes

### P1 #4 — kt-ch7-l4-q5 · "under...gate" location verbatim

- **Sentence**: "The bones of your fish lie under the heap by the gate."
- **Q**: Where were the fish bones?
- **Current correct**: "under a pile by the gate" — "heap"→"pile" is good; but "under" + "gate" both verbatim, which are the key discriminating location words
- **Fix**: "under a pile near the entrance"
- **Audio regen**: No

### P1 #5 — kt-ch8-l4-q9 · loud/voice partial echo

- **Sentence**: "His knocks were loud, and his voice was soft like honey."
- **Q**: How did the wolf knock and speak?
- **Current correct**: "loud knock, sweet voice" — "loud" verbatim, "voice" verbatim, "sweet" is good paraphrase
- **Fix**: "strong knock, gentle voice" (avoid repeating "loud" + "voice" together)
- **Audio regen**: No

---

## E. Narrative Voice / Pacing Improvements (3 proposals)

Even with zero R1–R8 violations, these Ch6–8 narrative moments would benefit:

1. **kt-ch6-l7 explanationZh** — "一件丟一隻天鵝 → 丟在每隻天鵝上" reads like a translation note, not a story moment. Better: "六件白衫,一件一件披在天鵝身上——哥哥們要回來了!"

2. **kt-ch7-l4 explanationZh** — "門邊的一堆下面 = 門邊那一堆下" is tautological. Better: "奶奶說的地方就在院子門邊——寶貝就藏在那裡。" (invoke grandma's voice)

3. **kt-ch8-l3** overall narration pacing — Ch8 L3 has two A7-P0 Qs back-to-back (q3 + q9). Even after fixes, the lesson needs at least one inference question to break the detail-recall monotony. Consider converting q6 or q7 to listen-comprehension "why" type.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #30: A7_WORD_CLUING lint rule

**Source**: Industry consensus on "word cluing" / "verbal association cluing" as a documented MCQ item flaw.
- Ibbett & Wheldon (2016) — identified as one of top reasons for unexpected difficulty patterns
- BEA 2025 Workshop (NLP for Educational Applications): automated MCQ quality evaluation now includes content-word overlap detection
- D-GEN ACL 2025: distractor generation pipelines include verbatim-overlap filters before final selection
- Web search synthesis: "the repetition of similar words or part of a phrase in an MCQ's stem and its key is one of the main reasons [for unexpected difficulty patterns], as this word repetition can give a hint to the learner"

**Gap in current CI**: `validate-lessons.js` catches:
- `R1_SUBSTRING`: correct option is a full substring of sentence ✅
- `X3_R1_VERBATIM_WORDS`: ALL words in correct option appear in sentence ✅

Missing:
- `A7_WORD_CLUING`: ≥50% of content words in correct option echo sentence, ≥2 matching — **NOT linted** ❌

**Pickup fit**: ✅ Fully compatible. `tools/validate-lessons.js` is Node.js; adding ~20 lines with the same stopword-filter logic catches this pattern as WARN.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| A7_WORD_CLUING lint (≥50% echo ≥2 content words) | BEA 2025 / Ibbett 2016 | ✅ validate-lessons.js 自然延伸 | S (30 min) | ⭐⭐⭐ — catches what R1/X3 miss; found 3 P0 in this audit | ✅ Recommend |

**Implementation sketch** (add to `tools/validate-lessons.js`):
```js
// A7_WORD_CLUING: ≥50% content words of correct option echo sentence
const STOPWORDS_A7 = new Set([/* same stopword list */]);
function contentWords(s) { return s.toLowerCase().replace(/[^a-z0-9\s]/g,'').split(/\s+/).filter(w=>w.length>2&&!STOPWORDS_A7.has(w)); }
const sentCW = contentWords(q.sentence);
const corrCW = contentWords(correct);
const echoed = corrCW.filter(w=>sentCW.includes(w));
if (corrCW.length>0 && echoed.length/corrCW.length>=0.5 && echoed.length>=2) {
  warn(qId, 'A7_WORD_CLUING', `correct option echoes sentence content words: ${echoed.join(', ')}`);
}
```

**Would have caught**: kt-ch8-l3-q3 (P0★), kt-ch8-l3-q9 (P0), kt-ch8-l7-q7 (P0) — all 3 P0 violations in this audit.

**Backlog note**: Ch8 (Three Little Pigs) is structurally prone to A7 due to its repetitive huff/puff/build pattern. After adding lint, a Ch8 full-pass rewrite of listen-mc correct options is recommended.
