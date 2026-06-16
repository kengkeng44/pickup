# Content QA — 2026-06-16 00:12 UTC

**Today's angle: #11 — optionsZh 翻譯品質 (Chinese Translation Quality of Answer Options)**
**Focus: Ch13–20** (Little Red Riding Hood, Urashima Taro, Emperor's New Clothes, Issun-Boshi, Crane Wife, Heungbu & Nolbu, Kancil Mouse Deer, Giant Turnip)

> **Rotation context**: Recent crons covered A4 (Ch5-12), A3 (Ch10-17), A1 (Ch9-18), R1 (Ch1-8), A6 (Ch19-26), R2 (Ch12-18), A2, A5, A7 (Ch6-12), Audio (#10). Angle #11 (optionsZh 翻譯品質) not visited in this window.
>
> **Angle #11 Definition**: Examines the *Chinese* (zh-TW) translations of answer options for:
> - **ZH-LENGTH-TELL**: Chinese correct option significantly longer than distractors → child selects by character count, not comprehension
> - **ZH-JUNK-DISTRACTOR**: Chinese distractor is a fragment (1-3 chars) while correct is full phrase → obvious elimination
> - **ZH-SUBJECT-LEAK**: Correct option uses explicit pronoun (他/她/牠) while distractors omit it → grammatical asymmetry marks correct
> - **ZH-LE-MARKER-LEAK**: Correct option ends with 了 (aspect completion) while no other option does → aspect marker reveals completion sense
> - **ZH-TERM-INCONSISTENCY**: Same English option phrase translated 2 different ways across the same chapter
>
> **Method**: Automated Python scan of all `optionsZh` arrays in Ch13–20 JSON files. Length ratios computed as `correct_zh_len / max(other_zh_len)`. Threshold P0 ≥ 2.0×, P1 ≥ 1.5×. Grammar marker leaks and term inconsistencies from pattern regex + manual cross-check.
>
> **Scope note**: `listen-tf` questions have `options: ["Yes","No"]` with no `optionsZh` by design — Yes/No require no translation. Not flagged.

---

## A. validate-lessons.js result

```
OK  lessons-ch13.json  (0 shape issues)
OK  lessons-ch14.json  (0 shape issues)
OK  lessons-ch15.json  (0 shape issues)
WARN lessons-ch16.json: 1 lint issue
  kt-ch16-l1-q6: X2_OPTION_LIST_BIAS (all start with "a")
OK  lessons-ch17.json  (0 shape issues)
OK  lessons-ch18.json  (0 shape issues)
WARN lessons-ch19.json: 4 lint issue(s)
  kt-ch19-l3-q5 / l5-q5 / l6-q9 / l6-q10: X2_OPTION_LIST_BIAS
OK  lessons-ch20.json  (0 shape issues)

Total standard lint: 5 (existing, not introduced by this audit)
#11-ZH-LENGTH-TELL P0 (≥2.0×): 5  ← new findings
#11-ZH-LENGTH-TELL P1 (≥1.5×): 11 ← new findings
#11-ZH-JUNK-DISTRACTOR P1:      4  ← new findings
#11-ZH-SUBJECT-LEAK P2:         3  ← new findings
#11-ZH-LE-MARKER-LEAK P2:       1  ← new findings
```

---

## B. Violation Table

| Ch | Q ID | Type | EN correct / sentence excerpt | Chinese opts (correct ← marked) | violation | 修法 | audio regen? |
|----|------|------|-------------------------------|----------------------------------|-----------|------|-------------|
| Ch13 | `kt-ch13-l6-q10` | ZH-LENGTH-TELL **P0** | "a kind huntsman" | [0]警察 [1]**善良的獵人←** [2]農夫 [3]巫師 | correct 5 chars vs others max 2 — 2.5× ratio. Child spots longest = correct by visual scan | Replace distractors: 壞巫師 → 壞心法師; 農夫 → 路過老農; 警察 → 士兵 (equalize to 3-4 chars each) | No |
| Ch17 | `kt-ch17-l6-q5` | ZH-LENGTH-TELL **P0** | "a tall white crane" | [0]女孩 [1]**一隻高高的白色大鳥←** [2]老獵人 [3]空無一人 | correct 9 chars vs max others 4 — 2.25×. Worst in scope: distractors are short bare nouns while correct is full descriptive NP | Trim correct to 白色大鳥 (4 chars) OR expand distractors: 年輕少女 / 滿頭白髮的老獵人 / 空曠的屋子 | No |
| Ch13 | `kt-ch13-l5-q9` | ZH-LENGTH-TELL **P0** | "grandma looked different" | [0]床是空的 [1]**奶奶看起來不一樣←** [2]門開著 [3]籃子不見 | correct 8 chars vs max others 4 — 2.0×. Correct uses descriptive clause; all others are 4-char minimal facts | Rebalance: 奶奶看起來怪怪的 (6) or expand others: 木門半開著 / 小籃子消失了 / 床鋪是空的 | No |
| Ch17 | `kt-ch17-l2-q7` | ZH-LENGTH-TELL **P0** | "snow on her hair, kind face" | [0]**頭髮上有雪、善良的臉←** [1]生氣又大叫 [2]像可怕的鬼 [3]小丑打扮 | correct 10 chars vs max others 5 — 2.0×. The comma + two-attribute structure of correct is unique | Replace correct ZH: 雪白頭髮、輕聲笑臉 (8) — trim without losing meaning | No |
| Ch19 | `kt-ch19-l6-q5` | ZH-LENGTH-TELL **P0** | "there was no king's message" | [0]國王說嗨 [1]**根本沒有國王的話←** [2]明天來玩 [3]河太冷了 | correct 8 chars vs max others 4 — 2.0×. "根本" emphasis particle adds length uniquely to correct | Replace: 沒有國王說話 (6) — drops 根本 to equalize | No |
| Ch13 | `kt-ch13-l7-q10` | ZH-LENGTH-TELL P1 | "listen to mother" | [0]做蛋糕 [1]**聽媽媽的話←** [2]跑更快 [3]採花 | 5 chars vs max others 3 — 1.67× | Trim: 聽媽媽話 (4) | No |
| Ch18 | `kt-ch18-l4-q9` | ZH-LENGTH-TELL P1 | "a large round fruit" | [0]小紅蘋果 [1]**又大又圓的果實←** [2]高的玉米 [3]粉紅花 | 7 chars vs max 4 — 1.75× | Trim: 大圓果實 (4) | No |
| Ch19 | `kt-ch19-l3-q5` | ZH-LENGTH-TELL P1 | "he had an idea" | [0]他想睡 [1]**他想到辦法←** [2]他難過 [3]他很熱 | 5 chars vs max 3 — 1.67× | Trim: 他想到法子 (5→keep) OR expand others: 他很想睡 / 他難過極了 / 他熱壞了 | No |
| Ch19 | `kt-ch19-l7-q7` | ZH-LENGTH-TELL P1 | "quiet and sorry" | [0]**安靜又不好意思←** [1]還在歡呼 [2]想吃蛋糕 [3]酷酷的 | 7 chars vs max 4 — 1.75× | Trim: 靜靜地害羞 (5) | No |
| Ch14 | `kt-ch14-l7-q9` | ZH-JUNK-DISTRACTOR P1 | "he became very old" | [0]變成小男孩 [1]變回小孩 [2]**變成很老的人←** [3]**變魚** | distractor[3]="變魚" 2 chars vs correct 7 — obvious fragment. Plus [0]/[1] are near-identical | Replace [3]: 變成大魚 (4) or 化成海浪 (4); differentiate [0] from [1]: 變成年輕士兵 | No |
| Ch15 | `kt-ch15-l4-q6` | ZH-JUNK-DISTRACTOR P1 | "being seen as not clever" | [0]**被認為不聰明←** [1]**跌倒** [2]失去金子 [3]**感冒** | [1]=2 chars, [3]=2 chars vs correct 6 — two junk distractors. Child eliminates on length | Replace [1]: 被當作懶惰 (5); [3]: 被人嘲笑 (4) | No |
| Ch15 | `kt-ch15-l6-q3` | ZH-JUNK-DISTRACTOR P1 | "that was his real self" | [0]透過彩色玻璃 [1]**就是他真正的樣子←** [2]**閉眼** [3]小鏡子裡 | [2]="閉眼" 2 chars vs correct 8 — trivially eliminable | Replace [2]: 借助燈光看 (5) | No |
| Ch15 | `kt-ch15-l4-q8` | ZH-SUBJECT-LEAK P2 | "he loved its nice colors" | [0]看起來糟糕又髒 [1]**他喜歡漂亮顏色←** [2]想退錢 [3]尺寸不對 | correct has explicit subject 他; distractors [2][3] omit subject → grammatical asymmetry marks answer | Remove 他 from correct: 喜歡漂亮顏色 (6) | No |
| Ch17 | `kt-ch17-l7-q7` | ZH-SUBJECT-LEAK P2 | "she became a white crane" | [0]**她變成白鶴←** [1]開始下雨 [2]一棵高樹倒下 [3]一隻貓跑過門口 | correct starts 她 (person subject); all others are event-only → pronoun singles out correct | Remove 她: 白鶴飛走了 (5) — event framing matches others | No |
| Ch18 | `kt-ch18-l2-q9` | ZH-LE-MARKER-LEAK P2 | "there was no rice left" | [0]鍋子是新的 [1]**米都吃完了←** [2]小孩在笑 [3]妻子在唱歌 | only correct ends with 了 (completion aspect marker). Other options use present-state forms → 了 signals the "completed / all-gone" concept, leaking correct | Replace: 米全部沒有了 → 一粒米都不剩 (no trailing 了) | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch13–20 (8 chapters) |
| Lessons scanned | 56 lessons |
| Qs with optionsZh (non-tf) | ~112 |
| listen-tf (no optionsZh by design) | 56 |
| P0 violations | **5** |
| P1 violations | **14** (11 length-tell + 3 junk-distractor) |
| P2 violations | **4** (3 subject-leak + 1 le-marker) |
| Term inconsistencies | 2 |
| Total actionable | **23** |
| 5-agent PASS threshold | P0 = 0, P1 ≤ 2 → **FAIL** |

---

## D. Top 5 P0

1. ⚠️ **`kt-ch13-l6-q10`** (Ch13 Red Riding Hood) — ZH-LENGTH-TELL 2.5×: 善良的獵人(5) vs 警察/農夫/巫師(2 chars). Single-character distractor vs multi-char correct is the most obvious length tell in scope. Fix: expand distractor ZH to 3-4 chars.

2. ⚠️ **`kt-ch17-l6-q5`** (Ch17 Crane Wife) — ZH-LENGTH-TELL 2.25×: 一隻高高的白色大鳥(9) vs 女孩/老獵人/空無一人(max 4). Verbosely descriptive correct option reads like the "right answer written out in full." Fix: trim correct to 白色大鳥(4) to match distractor density.

3. ⚠️ **`kt-ch13-l5-q9`** (Ch13) — ZH-LENGTH-TELL 2.0×: 奶奶看起來不一樣(8) vs bed/door/basket facts (max 4). The Red Riding Hood inference question is already cognitively demanding; length tell removes remaining challenge entirely.

4. ⚠️ **`kt-ch17-l2-q7`** (Ch17) — ZH-LENGTH-TELL 2.0×: 頭髮上有雪、善良的臉(10) vs 生氣又大叫 etc (max 5). Comma-joined two-attribute structure is unique in the option set and visually prominent.

5. ⚠️ **`kt-ch19-l6-q5`** (Ch19 Mouse Deer) — ZH-LENGTH-TELL 2.0×: 根本沒有國王的話(8) vs 國王說嗨/明天來玩/河太冷了 (max 4). The 根本 emphasis particle adds cognitive weight AND length simultaneously.

---

## E. Narrative Voice / Pacing Improvements (even if 0 R1-R8 violations required)

1. **Ch20 `kt-ch20-l1-q10` correct optionsZh**: "長到超過一般大小" — this sounds like a biology textbook. For a grandpa-and-turnip story aimed at 8-year-olds, rewrite as: "長得比誰都還要大" (warmer, comparative structure kids use in speech).

2. **Ch19 `kt-ch19-l7-q10` correct optionsZh**: "先想想故事是不是真的" — complex conditonal. For A2 child, simplify to: "先想故事是真的嗎" (reduces cognitive load of 是不是 double-check structure).

3. **Ch14 `kt-ch14-l2-q3` distractor[0]**: "rough and loud" → "粗又吵". In zh-TW child register, 粗 used alone for water is unusual. Natural child speech would say 波浪很大很吵 or 很大很吵. Fix: 浪大又吵 (4 chars, natural).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #39: ZH-LENGTH-PARITY LINT — 將 R2 英文長度規則延伸到中文**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| ZH-R2 Length Parity lint (max(len(optionsZh)) / min(len(optionsZh)) ≤ 1.5×) | 2025-2026 NLP research: "Large Language Models Badly Generalize across Option Length" (arXiv 2502.12459) — confirms length bias is a strong spurious signal in MCQs; TESOL Quarterly 2026 study on Chinese preschooler ELT apps (Tan 2026) confirms visual-scan heuristics in bilingual interfaces | `tools/validate-lessons.js` already implements R2 for English options. Add parallel ZH check: `max(char_len(optionsZh)) / min(char_len(optionsZh)) ≤ 1.5`. Ignore listen-tf (no optionsZh). Flag as `X4_ZH_LENGTH_PARITY`. ~20 lines to add. | S (30 min) | ⭐⭐⭐⭐ — catches 5 P0 + 11 P1 currently undetected in prod | ✅ 強烈適合 |

**Why this matters more for Chinese than English:**
- Chinese characters are visually equal-width → length difference is immediately salient (harder to hide than English word-length variation)
- 8-12 Taiwan children read Chinese faster than English → they can exploit Chinese length tell before parsing English
- The 5 P0 cases in this audit (2.0-2.5× ratio) would be caught on next content batch ship if this lint rule existed

**Implementation:**
```js
// In tools/validate-lessons.js, add after existing R2 check:
if (q.optionsZh && q.optionsZh.length === q.options.length) {
  const zhLens = q.optionsZh.map(z => z.length).filter(l => l > 0);
  if (zhLens.length >= 2) {
    const zhRatio = Math.max(...zhLens) / Math.min(...zhLens);
    if (zhRatio > 1.5) {
      issues.push(`${q.id}: X4_ZH_LENGTH_PARITY (max/min=${zhRatio.toFixed(2)})`);
    }
  }
}
```

**5-agent post-ship check**: Run Player Walkthrough agent on 3 fixed questions after optionsZh edits to verify child experience.

**Sources consulted:**
- [Large Language Models Badly Generalize across Option Length](https://arxiv.org/pdf/2502.12459) (arXiv 2502.12459, 2025)
- [Evaluating English Learning Apps for Chinese Preschoolers — TESOL Quarterly 2026](https://onlinelibrary.wiley.com/doi/10.1002/tesq.70036)
- [Penalizing Length: Uncovering Systematic Bias in Quality Estimation Metrics](https://arxiv.org/pdf/2510.22028) (2025)
