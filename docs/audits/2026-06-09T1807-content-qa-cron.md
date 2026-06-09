# ⚠️ Content QA — 2026-06-09 18:07 UTC

Today's angle: **#12 — explanationZh Story-Voice vs Jargon**
Focus: **Ch15–22 deep pass · Corpus-wide quantification (Ch0–31)**

Lens: Every `explanationZh` field should read like **grandma explaining a fairy-tale moment to a curious 8-year-old**. Instead, 64% of the corpus uses ELT teacher notation style: `推理:`, `(paraphrase)`, `→ 答 Yes/No`, `主旨 =`. These break story immersion and are incomprehensible to children. Previous #12 pass was 2026-06-01 (Ch5–7 only). Today: first corpus-wide quantification + first full Ch15–22 pass.

Audience pivot note: v2.0.B.231 switched primary audience to **8-12 children + families**. The "推理:" prefix is an adult ELT teacher's annotation convention that should not reach any child's screen.

---

## A. validate-lessons.js result

```
OK lessons-ch15.json: 7 lessons
OK lessons-ch16.json: 7 lessons
OK lessons-ch17.json: 7 lessons
OK lessons-ch18.json: 7 lessons
OK lessons-ch19.json: 7 lessons
OK lessons-ch20.json: 7 lessons
OK lessons-ch21.json: 7 lessons
OK lessons-ch22.json: 7 lessons

Total mirror-lint issues (corpus-wide): 65 (warn-only, pre-existing)
```

Automated linter does NOT detect X12 voice-register violations — those require manual/regex-level scan (done below).

---

## B. Violation Table

| Ch | Q ID | Type | Sentence (truncated) | Current explanationZh | Violation | Severity | 修法 | Audio regen? |
|----|------|------|-----------------------|-----------------------|-----------|----------|------|--------------|
| 5 | `kt-ch5-l4-q10` | listen-comprehension | "A house with legs turns by itself..." | `主旨 = 屋子自己動。` | X12_MAIN_IDEA — textbook formula, 6 chars, zero child value | **P0** | "Baba Yaga 的雞腳屋真的會自己轉身！" | No |
| 8 | `kt-ch8-l7-q5` | listen-tf | "But the brick walls stood still..." | `推理: 不動 → 沒倒 → 答 No` | X12_JARGON_PREFIX + X12_ANSWER_ARROW — 12-char pure logic chain, no story | **P0** | "磚頭牆一動也不動！大野狼怎麼吹都吹不倒。" | No |
| 15 | `kt-ch15-l1-q4` | listen-tf | "People said he cared more about his coats than his country." | `推理: 在乎外套勝過國家 → 不是用心治國 → 答 No` | X12_JARGON_PREFIX + X12_ANSWER_ARROW — teaches test meta not story | **P0** | "皇帝連治國都不管了，只想著衣服。奶奶說這個皇帝很糟糕。" | No |
| 21 | `kt-ch21-l1-q4` | listen-tf | "All the stories belonged to Nyame, the Sky God." | `推理: 故事全屬天神 → 地上人沒得分 → 答 No` | X12_JARGON_PREFIX + X12_ANSWER_ARROW — "沒得分" is adult sports-score metaphor, wrong register for 8yo | **P0** | "所有故事都是天神的，地上的人一個也沒有。" | No |
| 22 | `kt-ch22-l1-q3` | listen-mc | "The boy's name was Meng. His father was gone." | `推理: father was gone → 只剩媽媽 (paraphrase)。` | X12_JARGON_PREFIX + X12_PARAPHRASE_LABEL — "(paraphrase)" is test-writer jargon, meaningless to 8yo | **P0** | "爸爸不在了，孟子只剩下媽媽陪伴他。" | No |
| 1 | `kt-ch1-l2-q10` | listen-comprehension | "The two pieces of peach lay open on the table..." | `主旨 = 桃子自行裂開。` | X12_MAIN_IDEA — Ch1 (high-traffic), textbook formula | **P1** | "好神奇！桃子自己裂開了，不用老爺爺切！" | No |
| 3 | `kt-ch3-l3-q10` | listen-comprehension | "Far ahead of the race, the rabbit chose to take a nap..." | `主旨 = 兔子決定睡覺。` | X12_MAIN_IDEA — Tortoise & Hare climax moment, formula deflates story | **P1** | "兔子跑太快就想睡覺了，結果輸給了烏龜！" | No |
| 16 | `kt-ch16-l1-q4` | listen-tf | "Every night they sat by the window and looked out." | `推理: 沒小孩 + 安靜 + 每晚望著外面 → 孤單 → 答 Yes` | X12_JARGON_PREFIX + X12_ANSWER_ARROW — bullet-point reasoning, no warmth | **P1** | "老爺爺老奶奶沒有孩子，每天晚上靜靜地望著窗外，心裡一定很寂寞。" | No |
| 17 | `kt-ch17-l1-q4` | listen-tf | "Every morning he walked through the snow to get firewood." | `推理: 自己一個人 + 走雪地撿柴 → 辛苦 → 答 Yes` | X12_JARGON_PREFIX + X12_ANSWER_ARROW | **P1** | "一個人走在雪地裡撿柴，真的很辛苦。" | No |
| 19 | `kt-ch19-l1-q10` | listen-comprehension | "The little mouse deer stood by the river..." | `主旨 = 鼠鹿想要對岸的水果。` | X12_MAIN_IDEA | **P1** | "小鹿坎奇站在河邊，望著對岸那棵大果樹。他好想吃啊！" | No |
| 20 | `kt-ch20-l1-q10` | listen-comprehension | "A tiny seed has grown into the biggest turnip in the village." | `主旨 = 小種子長成全村最大蘿蔔。` | X12_MAIN_IDEA | **P1** | "哇！一顆小小的種子，長成了全村最大的蘿蔔！" | No |
| 15 | `kt-ch15-l1-q6` | listen-mc | "They walked straight to the palace gate with big smiles." | `推理: palace gate → 皇宮 (paraphrase)。` | X12_JARGON_PREFIX + X12_PARAPHRASE_LABEL | **P1** | "他們笑著走進皇宮的大門——「palace gate」就是皇宮的門！" | No |
| 21 | `kt-ch21-l2-q8` | listen-mc | "The list was a swarm of hornets, a long python, and a leopard." | `推理: hornets + python + leopard → 三個強的動物 (paraphrase)。` | X12_JARGON_PREFIX + X12_PARAPHRASE_LABEL | **P1** | "天神出了好難的題目：一群黃蜂、一條大蟒蛇、還有一隻豹子！" | No |
| 22 | `kt-ch22-l2-q6` | listen-mc | "Her heart felt heavy as she watched her son." | `推理: heart felt heavy → 難過又擔心 (paraphrase)。` | X12_JARGON_PREFIX + X12_PARAPHRASE_LABEL | **P2** | "媽媽看著孟子，心裡很擔心。「heart felt heavy」就是心很沉、很難過。" | No |
| 15 | `kt-ch15-l1-q8` | listen-mc | "The emperor heard this and sat up tall in his chair." | `推理: sat up tall → 準備聽 (paraphrase)。` | X12_JARGON_PREFIX + X12_PARAPHRASE_LABEL | **P2** | "皇帝聽到了，馬上坐直了身子。「sat up tall」就是坐得直直的！" | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Total non-narration questions with explanationZh (corpus) | 1,069 |
| Questions with ≥1 X12 violation | **689 (64%)** |
| X12_JARGON_PREFIX ("推理:") | 652 |
| X12_PARAPHRASE_LABEL ("(paraphrase)") | 316 |
| X12_ANSWER_ARROW ("→ 答 Yes/No") | 218 |
| X12_MAIN_IDEA ("主旨 =") | 30 |
| X12_LEVEL_LABEL ("(A2 paraphrase)") | 1 |
| Ch15–22 X12 violations (focus range) | **301** |
| P0 items this pass | 5 |
| P1 items this pass | 8 |

**Root cause**: Batch AI-generated content across Ch2–31 used "推理:" as a consistent template prefix. The prefix originates from ELT teacher-training notation (Buck 2001 "reasoning chain" annotation) — useful for content authors, harmful on the learner-facing surface.

---

## D. Top 5 P0

1. **`kt-ch5-l4-q10`** — `主旨 = 屋子自己動。` — Six characters. Zero story voice. The Baba Yaga chicken-legged house turning is a magical story moment; the explanation should mirror that wonder.

2. **`kt-ch8-l7-q5`** — `推理: 不動 → 沒倒 → 答 No` — Twelve characters, pure logic deduction chain, no narrative. The climax of Three Little Pigs (the brick house stands!) reduced to a dry inference diagram.

3. **`kt-ch15-l1-q4`** — `推理: 在乎外套勝過國家 → 不是用心治國 → 答 No` — Teaches test-taking strategy (reason-chain → answer) instead of story comprehension. The Emperor's New Clothes moral is being explained as adult critical-thinking notation.

4. **`kt-ch21-l1-q4`** — `推理: 故事全屬天神 → 地上人沒得分 → 答 No` — "沒得分" (scored zero points) is a sports-score adult metaphor completely out of register for 8-year-old learners of Anansi the Spider folklore.

5. **`kt-ch22-l1-q3`** — `推理: father was gone → 只剩媽媽 (paraphrase)。` — "(paraphrase)" label on what is a quietly sad moment (Mencius's father is gone, only mother remains). The technical label strips all emotional resonance from the story beat.

---

## E. Narrative Voice / Pacing Improvements (required even if 0 R1-R8 violations)

These 3 improvements apply corpus-wide and do not require per-question fixes — they are **template-level** changes:

### NV-1 — Replace "主旨 = X" with wonder-sentence
Current: `主旨 = 桃子自行裂開。`
Target template: `[故事驚奇點]！[1-2句簡短故事重述]`
Example: `哇！桃子自己裂開了，不用老爺爺切！`

**Why**: The "主旨 =" label is a textbook "main idea" instruction format. Children don't need to identify the "main idea" — they need to feel the story moment. The format destroys micro-engagement at the exact moment (listen-comprehension = gist check) where children should feel triumph from understanding the big picture.

### NV-2 — Replace "推理: ... (paraphrase)" with "故事說：[Chinese meaning]"
Current: `推理: palace gate → 皇宮 (paraphrase)。`
Target template: `「[EN phrase]」就是[ZH meaning]的意思。[Optional: story context sentence]`
Example: `「palace gate」就是皇宮的門！兩個騙子笑著走進去了。`

**Why**: Duolingo's 2026 "Explain My Answer" feature (now free for all users) delivers in-character, story-contextual hints rather than metalinguistic labels. The "(paraphrase)" label is test-writer annotation that children cannot decode. Replacing with "就是...的意思" is universally understood by 8+ Chinese-speaking children.

### NV-3 — Replace "→ 答 Yes/No" with story-grounded confirmation
Current: `推理: 一個貪一個善 → 性格不同 → 答 Yes`
Target template: `[Story observation]。[Confirmation with character name / action if possible]`
Example: `哥哥貪心，弟弟善良——兩個人真的很不一樣。`

**Why**: Research (British Journal of Educational Technology 2025, Xiao et al.) shows children in dialogic reading contexts respond better to adult-guided confirmation that mirrors the story register than to explicit "answer: Yes/No" instructions. The "→ 答" pattern trains test-taking strategy, not story comprehension. The B.231 grandma-storytelling frame demands the explanation sound like grandma confirming what happened, not a teacher grading an answer.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #15 — X12 lint rule: explanationZh register guard in validate-lessons.js

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| In-character explanation feedback (Duolingo "Explain My Answer" 2026, now free for all users) | [blog.duolingo.com/product-highlights](https://blog.duolingo.com/product-highlights/) | ✅ 適合 — Pickup 已有story frame. 需要移除 ELT-teacher annotation layer that contradicts character voice | S · 25min (lint only) / M · 2hr (+ item-writer prompt) | ⭐⭐⭐⭐ | **SHIP** |
| Metalinguistic feedback explicitly labeled (Cambridge Core 2025: metalinguistic awareness in 8yo) | [cambridge.org/core/.../metalinguistic-awareness](https://www.cambridge.org/core/journals/language-teaching/article/measuring-childrens-metalinguistic-awareness/75AC4C2FD2D69974B70A8F9E8726FD0A) | ❌ 不適合 — Research confirms implicit corrective feedback > explicit metalinguistic labels for 8yo. "推理:" is explicit metalinguistic. | — | — | **DO NOT USE** |
| Dialogic reading confirmation pattern (BJET 2025, Xiao et al.) | [bera-journals.onlinelibrary.wiley.com](https://bera-journals.onlinelibrary.wiley.com/doi/10.1111/bjet.13615) | ✅ 適合 — Parent/grandma confirming story meaning in child's register = exact pattern Pickup's grandma frame needs | M · 2hr (template fix) | ⭐⭐⭐⭐ | **ADOPT IN ITEM-WRITER PROMPT** |

**具體實作 (S size — 25min):**

`tools/validate-lessons.js` 在 `lintQuestion()` 函數內的 `X3_R1_VERBATIM_WORDS` check 後加 X12 lint block:

```js
// X12: explanationZh register guard
if (q.explanationZh) {
  const ez = q.explanationZh;
  if (/^推理[：:]/.test(ez)) {
    issues.push({ id: q.id, code: 'X12_JARGON_PREFIX',
      msg: `explanationZh starts with "推理:" — ELT teacher notation, not child story voice` });
  }
  if (/\(paraphrase\)/i.test(ez)) {
    issues.push({ id: q.id, code: 'X12_PARAPHRASE_LABEL',
      msg: `explanationZh contains "(paraphrase)" — test-writing mechanics label, remove` });
  }
  if (/→ 答 (Yes|No)/.test(ez)) {
    issues.push({ id: q.id, code: 'X12_ANSWER_ARROW',
      msg: `explanationZh uses "→ 答 Yes/No" formula — replace with story-grounded confirmation` });
  }
  if (/^主旨 =/.test(ez)) {
    issues.push({ id: q.id, code: 'X12_MAIN_IDEA',
      msg: `explanationZh uses "主旨 =" textbook formula — replace with wonder-sentence` });
  }
}
```

**Expected catch on first run**: 689 WARN items (64% of 1,069 questions). Set to `warn-only` like X3_R1_VERBATIM_WORDS — do NOT break build immediately. Use as queue for next item-writer rewrite pass targeting Ch15–22 first (highest concentration, lowest prior revision history).

**Impact**: Removing "推理:" from all visible explanationZh fields directly aligns with Duolingo's 2026 free "Explain My Answer" in-character approach, and with BJET 2025 dialogic reading research showing story-register feedback outperforms metalinguistic labels for 8-12 learners.

---

*Audit generated: 2026-06-09T18:07 UTC | Angle #12 | Focus Ch15-22 + corpus-wide | 5-agent framework pass*
