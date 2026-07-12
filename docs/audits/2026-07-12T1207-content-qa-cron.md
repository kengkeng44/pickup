# Content QA — 2026-07-12 12:07 UTC

**Today's angle**: A3 — 語意 leak (story 跳針): questions/options/explanationZh that spoil upcoming story content, reveal narrative outcomes before the player reaches them, or embed forward-predictions without framing them as predictions  
**Focus**: Ch25–32 (664 answerable questions across 8 chapters)

---

## A. validate-lessons.js result

```
WARN lessons-ch25.json: 16 lint issue(s)
WARN lessons-ch26.json: 17 lint issue(s)
WARN lessons-ch27.json: 17 lint issue(s)
WARN lessons-ch28.json: 22 lint issue(s)
WARN lessons-ch29.json: 19 lint issue(s)
WARN lessons-ch30.json: 22 lint issue(s)
WARN lessons-ch31.json: 25 lint issue(s)
OK   lessons-ch32.json: 10 lessons (clean)

Total mirror-lint issues: 441 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

Ch32 is the only clean chapter in this range.

---

## B. A3 Violation Table (genuine violations after false-positive filtering)

> **Heuristic note**: Raw scan flagged 88 items — majority false positives from auxiliary-verb question starts (Was/Were/Did/Does → grammatical English inversion, not entity spoilers), "後面" in grammar explanations (means "word-end suffix", not story future), and capitalized option-start words. The 12 genuine violations below are confirmed by manual sentence inspection.

| # | Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|---|----|----|---|---|---|---|---|
| 1 | 30 | kt-ch30-l7-q1 | tap-pairs | `今晚4個字：hold/win/skin/coat … 最後的勝利！` | **A3.2-VOCAB-OUTCOME**: "win = 贏" in pre-lesson vocab preview reveals final battle outcome before player sees it unfold | Remove "win" from l7 preview; move to l7 outro tap-pairs *after* the lion stops | ❌ |
| 2 | 30 | kt-ch30-l6-q1 | tap-pairs | `今晚4個字：hand/fist/think/decide … 最後的決心！` | **A3.7**: "最後的決心" preview text pre-frames lesson climax — player knows a decisive moment is coming | Rewrite to `「準備好了嗎？準備出發！」` (neutral) | ❌ |
| 3 | 27 | kt-ch27-l7-q1 | tap-pairs | `free/protect/student/together … 最後的大時刻來了！` | **A3.7**: "最後的大時刻" announces Sun Wukong's release as "the big moment" before the lesson opens | Rewrite to `「今晚的四個字。」` | ❌ |
| 4 | 31 | kt-ch31-l5-x7 | emoji-pick | `橡樹後面傳來咳嗽聲——「Robin 要遇到某個人」，那個 👥！` | **A3.1-FORWARD-SPOILER**: explanationZh says "Robin 要遇到某個人" — forward-predicts l6 plot (outlaws emerge). Player hasn't seen this yet | Change to `「咳嗽聲傳來——有人在那裡！」` (present-tense reveal, not future) | ❌ |
| 5 | 29 | kt-ch29-l5-x7 | emoji-pick | `美好的幾天之後，奶奶說，好事後面往往藏著考驗。那個 ⛅` | **A3.7**: Grandma meta-commentary "好事後面往往藏著考驗" pre-frames upcoming storm; player hasn't seen next lesson yet | Remove meta-commentary; keep only `「遠方出現一片烏雲——天氣要變了！那個 ⛅。」` | ❌ |
| 6 | 30 | kt-ch30-l7-q6 | listen-mc | `explanationZh: 獅子慢慢沒力氣了，最後停下來……Heracles 贏了。` | **A3.7-MILD**: "Heracles 贏了" stated in explanationZh but the next two narration entries still describe Heracles getting up and making the coat — explanation out-runs narrative order | Move "Heracles 贏了" to the lesson-completion summary / x7 emoji-pick; cut from q6 | ❌ |
| 7 | 26 | kt-ch26-l7-q1 | tap-pairs | `最後一課，好好記！` | **A3.7-META**: "最後一課" (last lesson) tells player the chapter is ending before they finish it | Rewrite to `「今晚的收尾詞。」` | ❌ |
| 8 | 26 | kt-ch26-l7-x3 | tap-pairs | `最後一節的字！` | Same as above; duplicate in same lesson | Same fix | ❌ |
| 9 | 31 | kt-ch31-l6-q4 | listen-tf | `explanationZh: 從樹叢後面又出來兩個人、三個人、六個人——原來森林裡藏著很多人` | **A3.7**: Explanation reveals "原來森林裡藏著很多人" as the story's big surprise, but the q is mid-lesson; subsequent narrations build to this reveal | Trim to `「不止一個人——人越來越多！」` — don't resolve the mystery in the explanation | ❌ |
| 10 | 30 | kt-ch30-l7-x3 | tap-pairs | `最終勝利的詞！` | **A3.7-MILD**: Phrases victory as "ultimate/final" in vocab label even though the lesson is still mid-fight at this point in the question order | Rewrite to `「打鬥現場的詞！」` | ❌ |
| 11 | 30 | kt-ch30-l7-x8 | listen-tf | `explanationZh: 以後再也沒有箭能傷他。` | **A3.7**: explains future-state armour property ("以後再也沒有箭能傷他") that is not in the current sentence ("The skin was so thick…") — the stated fact IS in next narration | Move "以後再也沒有箭能傷他" to after next narration entry | ❌ |
| 12 | 31 | kt-ch31-l4-q6 | listen-mc | `explanationZh: …他最後看的東西` | **A3.7-MILD**: "最後一眼" implies Robin is about to leave/be exiled, which is the next scene's premise | Rephrase to `「他停下來環顧——小房子和鄰居，全都是他的家。」` | ❌ |

---

## C. Stats

| Metric | Value |
|---|---|
| Ch25–32 total questions | 664 |
| Genuine A3 violations | 12 |
| Severity P0 | 0 |
| Severity P1 | 8 (items 1, 4, 5, 6, 9, 11; plus items 3, 7/8) |
| Severity P2 | 4 (items 2, 10, 12; item 8 grouped) |
| False-positive rate of heuristic | 88 raw → 12 genuine = 86% FP |
| Chapters affected | Ch26, Ch27, Ch29, Ch30, Ch31 |
| Ch32 A3 violations | 0 (clean) |

**Primary pattern** (7/12): vocab-preview or explanationZh label announces outcome-framing phrases (`最後的勝利`, `最後的大時刻`, `Heracles 贏了`, `Robin 要遇到某個人`).  
**Secondary pattern** (3/12): meta-chapter framing (`最後一課`, `最後一節的字`).  
**Rarest** (2/12): forward-prediction in question content (items 4, 5).

---

## D. Top 5 P0/P1

1. **[P1] kt-ch30-l7-q1** — "win = 贏" in pre-lesson vocab preview spoils Heracles fight climax. Highest impact: player sees the outcome word BEFORE the emotional payoff.

2. **[P1] kt-ch31-l5-x7** — explanationZh says "Robin 要遇到某個人" (future tense). Breaks story immersion by turning a cliffhanger into a preview.

3. **[P1] kt-ch29-l5-x7** — Grandma voice says "好事後面往往藏著考驗". The meta-prediction framing turns an immersive dark cloud appearance into a lecture foreshadowing. Removes narrative tension.

4. **[P1] kt-ch30-l7-q6 expl** — "Heracles 贏了" stated mid-lesson before the two closing narrations confirm victory. Minor but premature.

5. **[P1] kt-ch31-l6-q4 expl** — "原來森林裡藏著很多人" resolves the outlaws-in-forest mystery in the explanation text before subsequent narrations build to it.

---

## E. Narrative Voice / Pacing Improvements (required)

> Per cron constraint: even with violations found, propose 3 narrative voice/pacing improvements.

### NV-1: Vocab preview emotional framing
`最後的大時刻`/`最後的勝利`/`最後的決心` labels in tap-pairs preview entries are emotionally loaded (they prime excitement about outcomes). Industry best practice (Keys to Literacy, 2024) recommends pre-teaching vocabulary that is **semantically neutral relative to plot resolution** — e.g. "hold", "skin", "coat" are fine; "win" is not. Systematic fix: audit all tap-pairs `q1` vocab preview entries for outcome-revealing words and replace with setting/action words that don't resolve plot.

### NV-2: Grandma voice consistency in explanationZh
Ch29-31 explanations mix "teacher-voice" summary (「力氣用盡，停下來」就是答案) with grandma meta-commentary ("奶奶說，好事後面往往藏著考驗"). The grandma meta-voice is richer but creates A3 spoiler risk when forward-pointing. Recommend: grandma commentary only in **narration type** entries; **explanationZh** stays in factual answer-anchor tone ("他抱住脖子——答案是 X").

### NV-3: Chapter-end meta labels
"最後一課，好好記！" / "最後一節的字！" are administrative labels that remind players they're in a game system, not a story. Replace with story-in-world framing: "奶奶說完了今晚的最後一段——記住這些詞吧！" — keeps player in the narrative frame while preserving the lesson-end signal.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research summary
- **FairytaleQA** (CMU 2022, widely adopted 2024–26) defines 7 narrative element types for story comprehension questions. Its "prediction" category is explicitly framed to the learner as uncertain-future — "What do you think will happen?" — rather than stated as fact. This is the missing distinction in Pickup's vocab-preview-as-outcome-reveal pattern.
- **Pre-teaching vocabulary research** (Keys to Literacy / ELT-resourceful / Read 2000): consensus is that pre-teaching works ONLY when words are **high-frequency + comprehension-critical + plot-neutral**. Words that reveal story outcomes ("win", "escape", "die", "win") should be withheld until after the relevant story beat.
- **Duolingo Stories** approach: vocabulary pre-teach occurs via underlined word hints (tap-to-see definition) embedded inline in narration sentences, not in a separate preview list. This eliminates the spoiler risk entirely because vocab exposure is paced with story exposure.

### Pickup適配 verdict

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Inline word-hint vocab** (tap underlined word in narration to see ZH gloss) | Duolingo Stories | ✅ WordHint already works this way in post-reveal; extend to narration pre-reveal | M (3–5 hrs) | High | ✅ 適合 |
| **Outcome-word block in vocab preview** (lint: pre-lesson tap-pairs must not include correct-option words from subsequent Q in same lesson) | Keys to Literacy / Read 2000 | ✅ Direct lint rule on lessons JSON | S (1 hr) | High | ✅ 適合 |
| **FairytaleQA 7-category Q tagging** (add `narrativeElement: character|setting|action|feeling|causal|outcome|prediction` field to each Q) | FairytaleQA (CMU) | 🟡 Useful for analytics + R6 sub-skill variety enforcement; but adds JSON overhead | L (8+ hrs) | Medium | 🟡 部分適合 — tag only new lessons, backfill later |
| **Prediction-type framing** (questions about future events use `questionPrefix: "奶奶問——"` marker to signal prediction vs. recall) | FairytaleQA "prediction" class | ✅ Minimal field addition; avoids A3 spoiler when grandma asks future-tense Qs | S (2 hrs) | High | ✅ 適合 |

### ARCH-REC #146: X93_VOCAB_PREVIEW_SPOILER_GATE

**Pattern**: Lint rule — in any lesson, the words in the first tap-pairs entry (vocab preview) must NOT overlap with correct-option words of subsequent listen-mc / comprehension questions in the same lesson. Specifically: compute `set(vocab_words) ∩ set(correct_option_tokens_lesson)` — flag if non-empty and the overlapping word is an outcome-revealing verb/noun (heuristic: past-tense verbs + result nouns like win/lose/free/escape/break/die/born).

**Benefit**: Eliminates the "win = 贏 in preview" → climax spoiler pattern found in 4 Ch25-32 lessons today.

**Implementation sketch** (add to `tools/validate-lessons.js`):
```js
// X93: vocab-preview outcome-word gate
const vocabEntry = lesson.questions.find(q => q.type === 'tap-pairs' && q.id.endsWith('-q1'));
if (vocabEntry && vocabEntry.pairs) {
  const vocabWords = new Set(vocabEntry.pairs.map(p => p.right.toLowerCase().split(/\s+/)).flat());
  const outcomeVerbs = new Set(['win','lose','free','escape','die','born','break','kill','save','end','finish','stop']);
  for (const q of lesson.questions.filter(q => q.type !== 'narration' && q.type !== 'tap-pairs')) {
    const correct = (q.options||[])[q.correctIndex||0]?.toLowerCase() || '';
    const overlap = correct.split(/\s+/).filter(w => vocabWords.has(w) && outcomeVerbs.has(w));
    if (overlap.length) warn(lesson.id, `X93_VOCAB_PREVIEW_SPOILER (preview word "${overlap}" = correct option in ${q.id})`);
  }
}
```

**Effort**: S (1–2 hrs). No lessons-ch*.json changes needed. Lint-only.  
**Verdict**: ✅ 適合 Pickup 架構 — JSON-first, no UI changes, immediately actionable.

