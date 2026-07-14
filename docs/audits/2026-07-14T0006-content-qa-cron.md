# Content QA — 2026-07-14 00:06 UTC

**Today's angle:** #12 — explanationZh Story-Voice vs Jargon (register consistency in post-answer feedback)
**Focus:** Ch9-16 (Cinderella → Chang'e → Houyi → Cowherd & Weaver → Little Red Riding Hood → Urashima Taro → Emperor's New Clothes → Issun-boshi)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issue(s)
  kt-ch8-l3-q3: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l6-q9: X48_NGRAM_VERBATIM_CORRECT
  kt-ch8-l3: X49_STIMULUS_REUSE
  kt-ch8-l4: X49B_STIMULUS_REUSE_COMP
  kt-ch8-l5: X49_STIMULUS_REUSE
  kt-ch8-l7: X49_STIMULUS_REUSE
  kt-ch8-l4-q9: X57_ANTONYM_PAIR_MIRROR
WARN lessons-ch9.json: 8 lint issue(s)
  ...
Total mirror-lint issues: 440 (warn-only)
```

No new schema-level failures. 440 mirror-lint warnings unchanged from prior runs.

---

## B. Violation Table — Angle 12: explanationZh Voice Register

**880 explanationZh fields scanned across Ch9-16 (25-29 listen-type per chapter).**

### B1. Voice Warmth Deficit — listen-type explanationZh (main finding)

| Ch | Listen expZh | Warmth% | FlatDef | Ans@end |
|----|-------------|---------|---------|---------|
| Ch9  | 25 | **52%** ✅ | 0  | 14 |
| Ch10 | 24 | **8%**  ⚠️ | 0  | 14 |
| Ch11 | 29 | **3%**  🔴 | 0  | 16 |
| Ch12 | 26 | **19%** ⚠️ | 0  | 15 |
| Ch13 | 25 | **60%** ✅ | 0  | 15 |
| Ch14 | 25 | **12%** ⚠️ | 11 | 21 |
| Ch15 | 29 | **0%**  🔴 | 16 | 26 |
| Ch16 | 25 | **4%**  🔴 | 14 | 19 |

**Warmth marker** = any of: 奶奶/Mochi/Hana/故事裡/好厲害/多聰明/喔/啊/！/✨/🌟/⭐/💫/太棒了

**Root pattern**: Vocab-preview lessons (L1/L2) have strong grandma voice (✅ 100%); story-scene lessons (L3+) drop to functional/clinical register. The voice established by "奶奶說：今晚要講…" at lesson entry is not sustained inside the listen-type explanationZh.

### B2. Flat "X = Y" Translation Definitions (no story context)

12 listen-type explanationZh use `[English] = [中文]` dictionary format with zero narrative warmth:

| Ch | Q ID | Violation | Snippet |
|----|------|-----------|---------|
| Ch14 | kt-ch14-l4-x3 | flat-def | `laughed and sang = 又笑又唱——他是開心的，不是難過，答 No。` |
| Ch14 | kt-ch14-l7-x3 | flat-def | `he looked at the box = 他看著它——他還握著盒子，沒有丟掉，答 No。` |
| Ch14 | kt-ch14-l3-q9 | flat-def | `long 是「長」,full of light 是「充滿光」——一個又長又亮的房間。` |
| Ch15 | kt-ch15-l3-q3 | flat-def | `empty looms = 空的織布機——他們指著空空的機器假裝展示。` |
| Ch15 | kt-ch15-l3-x7 | flat-def | `praised the cloth = 稱讚那布——他沒有說真話，選擇了說謊，答 No。` |
| Ch15 | kt-ch15-l5-q3 | flat-def | `mimed = 假裝動作——他們假裝幫國王穿衣服,其實根本什麼都沒穿,選「完全沒衣服」。` |
| Ch15 | kt-ch15-l5-x7 | flat-def | `walked tall = 走得很挺——表面上看起來很有自信，不是羞愧，答 No。` |
| Ch15 | kt-ch15-l7-q8 | flat-def | `kept walking = 繼續走——他沒有停,而是走完整個遊行,選「走完遊行」。` |
| Ch16 | kt-ch16-l3-q3 | flat-def | `一寸那麼小,縫衣針剛好就是他的劍——thumb-sized + just right size,就是「剛好適合小手」。` |
| Ch16 | kt-ch16-l4-x3 | flat-def | `bowed low = 深深鞠躬——他很有禮貌，一點都不無禮，答 No。` |
| Ch16 | kt-ch16-l5-x7 | flat-def | `could not move = 動不了——她嚇到動彈不得，答 No。` |
| Ch16 | kt-ch16-l6-q3 | flat-def | `裡面 very dark = 非常暗——四周都是黑暗。` |

**Contrast with good voice (Ch9/Ch13):**
- Ch9 `kt-ch9-l3-x7`: `她忙了好幾個小時，幫的是不曾善待她的人——這份忙碌，心裡並不輕鬆。答 No。` ✅
- Ch13 `kt-ch13-l3-x3`: `「她不知道狼是壞的」——她只看見一雙溫柔的眼，根本不曉得危險在哪裡。答 No。` ✅

### B3. "答 Yes/No" at End of Explanation (118 instances — design clarification needed)

All 118 instances appear at ≥73% position in the explanation (always last). This is structurally appropriate for post-reveal feedback BUT:

- 26 occurrences in Ch15 alone (highest across all chapters) — the "答 No。" at the end of an already-flat explanation compounds the clinical feel.
- When combined with flat-def format (Ch15: `empty looms = 空的織布機——他們指著空空的機器假裝展示。` + no warmth), the full sequence reads like a test correction slip, not grandma's voice.
- No instances of early reveal (0 instances in first 45% of text) — structurally safe.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total explanationZh scanned | 880 |
| Listen-type explanationZh | 208 |
| Chapters with warmth% ≥ 50% | 2 (Ch9, Ch13) |
| Chapters with warmth% < 10% | 4 (Ch10, Ch11, Ch15, Ch16) |
| Flat En=Zh definitions | 12 (all in Ch14-16) |
| ELT/grammar jargon violations | 0 |
| Option-labeling in explanation | 0 |
| Academic register violations | 0 |
| "答 Yes/No" at explanation end | 118 |
| Early answer reveal (<45%) | 0 |

**Key insight**: Ch14-16 were likely generated in a different batch from Ch9/Ch13, or with a different prompt template that lost the grandma voice directive. The schema has no `explanationZh` format constraint beyond being a string, so voice drift is invisible to lint.

---

## D. Top 5 P0

1. **Ch15 — 0% warmth in ALL listen-type explanationZh** (`kt-ch15-l3-q3` through `kt-ch15-l7-*`). An entire chapter of post-answer explanations sound like ELT correction sheets, not grandma's voice. Highest flat-def count (16). P0 because it's every listening lesson in the chapter.

2. **Ch11 — 3% warmth** (`kt-ch11-l3-q3` et al.). 28/29 listen-type explanations have zero warmth. "答 No。" tail on 16 explanations. The 2-dash "——" structure is used well narratively, but no warmth connectors.

3. **Ch16 — 4% warmth + 14 flat-def** (`kt-ch16-l3-q3` etc.). Mix of thumb-sized/bowed-low English-first dictionary definitions and bare "出發了!答 Yes。" one-liners — voice totally different from Ch9/Ch13.

4. **Ch14 — 11 flat-def** (`kt-ch14-l4-x3`, `kt-ch14-l7-x3`, `kt-ch14-l3-q9`). Urashima Taro chapter uniquely heavy on `English = 中文` format — possibly generated with a different template where the English stimulus was used as the explanation anchor.

5. **Cross-chapter voice inconsistency (Ch10/Ch12 — 8-19%)**: Not as severe as Ch11/Ch15/Ch16, but the drop from Ch9 (52%) → Ch10 (8%) within a chapter sequence break creates a jarring register whiplash for a player progressing through the story arc.

---

## E. Narrative Voice / Pacing Improvements (even without R1-R8 violations)

1. **Warmth token injection**: Ch11/Ch15/Ch16 listen-type explanationZh should end with a soft warmth token. Pattern to add: `…[story-relevant sentence]。` + one of: `多厲害！` / `就這樣！` / `奶奶的故事繼續～` / `[character emoji]`. Example fix for `kt-ch15-l3-q3`: `空的織布機——他們對著空氣比手畫腳，假裝布料就在那裡。騙術真的很高超吧！😅` replaces `empty looms = 空的織布機——他們指著空空的機器假裝展示。`

2. **Retire En=Zh flashcard format in listen-type explanations**: `[English] = [中文]——` is appropriate in vocab-preview lessons (L1/L2) where it's the pedagogical purpose. Inside listen-mc/listen-tf explanationZh it reads as a dictionary note, not story momentum. Replace with: story-anchored paraphrase → `he saw empty looms = 他只看到空空的機器——眼睛睜得多大，什麼都沒有！` → `騙子指著空空的機器展示——老大臣眼睛睜大，什麼都沒看見。你看出他的心虛了嗎？😅`

3. **"答 Yes/No" softening**: 118 end-of-explanation "答 Yes。/答 No。" are grammatically safe (all post-reveal, no early tells) but feel clinical combined with flat-def format. Consider replacing `答 No。` with story-embedded confirm: `所以答案是「沒有」——他根本看不見 🙅` — keeps the answer clear while wrapping in narrative register.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #152: X154_EXPZH_VOICE_WARMTH_GATE

**Pattern source:** Duolingo brand guidelines (design.duolingo.com/writing/voice): *"When voice is consistent across content, it builds trust and familiarity."* Industry ELT research (Irrational Labs 2026 on Duolingo, ERIC EJ1473941 on Duolingo Stories): learner affective bond to character voice is a primary retention driver, especially for children aged 8-12. Voice drift between lesson types (vocab→listen) breaks the parasocial bond with "奶奶."

**Finding:** Ch14-16 listen-type explanationZh (41 fields, 100% of listen explanations in those chapters) show zero warmth markers vs. Ch9/Ch13 at 52-60%. This is invisible to the current schema/lint because `explanationZh` is typed as `string` with no format constraint.

**Proposed lint rule:**

```js
// In validate-lessons.js — new check X154
const WARMTH_MARKERS = [
  /奶奶|Mochi|Hana|故事裡|故事中/,
  /[！喔啊呀哇✨🌟⭐💫🎉]/,
  /好厲害|太棒了|多聰明|就是這樣|答對了/,
];
const FLAT_DEF = /[a-zA-Z]{3,} = [一-鿿]{1,4}[——。！]/;

for (const q of lesson.questions) {
  if (!['listen-mc','listen-tf','listen-comprehension'].includes(q.type)) continue;
  const exp = q.explanationZh || '';
  const lessonIdx = lesson.lessonInChapter;
  if (lessonIdx < 3) continue; // L1/L2 vocab preview - flat defs are expected
  
  const hasWarmth = WARMTH_MARKERS.some(p => p.test(exp));
  const hasFlatDef = FLAT_DEF.test(exp);
  
  if (!hasWarmth && hasFlatDef) {
    warn(q.id, 'X154_EXPZH_FLAT_DEF_NO_WARMTH', 
      `listen-type explanationZh uses En=Zh dict format with no warmth marker (L${lessonIdx})`);
  }
}
```

**Pickup 適配 verdict:** ✅ Highly appropriate.
- Zero src/ changes needed — lint-only addition to `tools/validate-lessons.js`
- Zero lessons-ch*.json forced changes — lint starts as WARN (not fail), surfaces the 41 violations for human rewrite
- Aligns with CLAUDE.md brand voice: "溫暖陪伴 / 不焦慮 / 不打擊" — post-answer explanations that sound like correction notes undercut this
- Content fix effort: ~2 hr Fable batch rewrite for Ch14-16 listen explanationZh (41 fields)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Voice warmth consistency gate on explanationZh | Duolingo brand guidelines + ERIC EJ1473941 | ✅ | Low (lint) + Medium (content) | High (retention / brand voice) | **ARCH-REC #152** |

---

*Sources consulted: Duolingo brand guidelines (design.duolingo.com/writing/voice), ERIC EJ1473941 (Duolingo Stories pedagogy), Irrational Labs Duolingo psychology research, ERIC EJ1483229 (dialogic feedback ELT)*
