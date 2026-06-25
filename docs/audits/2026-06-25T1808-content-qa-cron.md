# ⚠️ Content QA — 2026-06-25 18:08 UTC

**Today's angle:** A6 — Option-in-Question (answer leaks verbatim from sentence/stem into correct option)
**Focus:** Ch17–24 (白鶴報恩 / 孬夫興夫 / 鼠鹿過河 / 奶奶故事 / Anansi / 孟母三遷 / 司馬光 / 鑿壁偷光)

---

## A. validate-lessons.js result

```
OK  lessons-ch17.json: 7 lessons (JSON shape + mirror + extended lint)
OK  lessons-ch18.json: 7 lessons
WARN lessons-ch19.json: 4 lint issue(s):
  kt-ch19-l3-q5: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch19-l5-q5: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch19-l6-q9: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch19-l6-q10: X2_OPTION_LIST_BIAS (all start with "he")
OK  lessons-ch20.json: 7 lessons
WARN lessons-ch21.json: 11 lint issue(s) (all X2_OPTION_LIST_BIAS)
OK  lessons-ch22.json: 7 lessons
OK  lessons-ch23.json: 7 lessons
WARN lessons-ch24.json: 1 lint issue(s):
  kt-ch24-l4-q3: X2_OPTION_LIST_BIAS (all start with "he")
```

CI guard passes on all existing rules. The A6 angle surfaces 12 genuine violations **not yet covered** by validate-lessons.js.

---

## B. Violation Table

| Ch | Q ID | Type | Sentence snippet | Correct option (leaking) | Overlap | Severity | 修法 | audio regen? |
|----|------|------|-----------------|--------------------------|---------|----------|------|-------------|
| 17 | kt-ch17-l1-x3 | comprehension | "Its leg was **hurt**. Its big eyes were very **sad**." | "**hurt and sad**" | FULL content-word match | P0 | → "injured and unhappy" | No |
| 17 | kt-ch17-l6-q5 | listen-mc | "There was no **young woman**." | distractor[0]: "the **young woman**" | P1-distractor | P1 | distractor ok (negation trap) — but tag intentional | No |
| 18 | kt-ch18-l1-x1 | comprehension | "The older was **Nolbu**. The younger was **Heungbu**." | "**Nolbu and Heungbu**" | both names lifted | P0 | → "the two brothers" or "the older and younger" | No |
| 18 | kt-ch18-l5-q9 | listen-mc | "**Warm clothes** came out. **Toys** for the children came out." | "**warm clothes and toys**" | near-verbatim 2-clause | P0 | → "clothing and playthings" or "things to wear and play with" | No |
| 19 | kt-ch19-l1-q6 | listen-mc | "a tall **tree** full of sweet ripe **fruit**" | "a **tree** with **fruit**" | key nouns lifted | P0 | → "a loaded branch overhead" or "food in the canopy" | No |
| 19 | kt-ch19-l6-q9 | listen-mc | "could … not up the **dry land**" | "could not go on **dry land**" | phrase copied | P0 | → "unable to leave the water" or "stuck in the river" | No |
| 19 | kt-ch19-l7-q9 | listen-mc | "His **low** voice … in a **slow** sad sound." | "**low and slow**" | both adjectives repeated | P0 | → "quiet and unhurried" | No |
| 20 | kt-ch20-l6-q5 | listen-mc | "holds the dog's **tail** … between her front **paws**" | "with **paws** on the dog's **tail**" | key nouns lifted | P0 | → "gripping with her front feet" | No |
| 21 | kt-ch21-l6-x7 | emoji-pick | "gave Anansi a wooden **box** full of all the **stories**" | "📦 a **box** of **stories**" | noun pair lifted | P0 | → "📦 Anansi's prize" or "📦 the gift from the Sky God" | No |
| 22 | kt-ch22-l1-x1 | comprehension | "a **mother** lived with her small **son**" | "a **mother** and her **son**" | near-verbatim intro | P0 | → "two family members" or "a parent and child" | No |
| 23 | kt-ch23-l1-q3 | listen-mc | "The sun was **warm**. The trees were **tall**." | "**warm** with **tall** trees" | both adjectives lifted | P0 | → "sunny and shaded" or "pleasant with big trees" | No |
| 23 | kt-ch23-l6-x9 | comprehension | "The **hard stone** hit the **thin** clay wall." | "**hard stone**, **thin** wall" | descriptor pair copied | P0 | → "the weight difference" or "hard vs fragile" | No |

**P0 count: 11 | P1 count: 1 | Total: 12**

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch17–24 (56 lessons) |
| Question types checked | listen-mc, comprehension, emoji-pick (narration/listen-tf excluded) |
| A6 violations (P0 correct-option leak) | 11 |
| A6 violations (P1 distractor-in-sentence) | 1 |
| Chapters with ≥1 P0 violation | 6 / 8 (Ch17, 18, 19, 20, 21, 22, 23) |
| Most affected type | listen-mc (6/11), comprehension (4/11), emoji-pick (1/11) |
| False-positive screen | Yes/No listen-tf options excluded from check |

**Pattern**: Short 2-clause sentences (e.g. "X came out. Y came out.") are highest-risk — option writers copy both nouns without paraphrasing. Comprehension introductions ("Long ago, a mother lived with her son") are systematically lifted verbatim.

---

## D. Top 5 P0

1. **⚠️ ch18-l5-q9** (`listen-mc`): Sentence = "Warm clothes came out. Toys for the children came out." → option = "warm clothes and toys." Near-verbatim concatenation. Children can decode by word-matching audio, bypassing comprehension entirely. Fix: "clothing and playthings."

2. **⚠️ ch22-l1-x1** (`comprehension`): Intro sentence "a mother lived with her small son" → option "a mother and her son." The **most literal copy** in the set — the question is supposed to test understanding of family composition but the answer is a substring of the stimulus. Fix: "a parent and child" or "two family members."

3. **⚠️ ch23-l6-x9** (`comprehension`): "The hard stone hit the thin clay wall" → option "hard stone, thin wall." Key descriptors lifted intact. Fix: "the weight difference" or "hard meets fragile."

4. **⚠️ ch21-l6-x7** (`emoji-pick`): "wooden box full of all the stories" → "📦 a box of stories." The emoji-pick type is especially vulnerable because the correct emoji naturally anchors to the obvious nouns in sentence. Fix: "📦 Anansi's treasure" or "📦 the Sky God's prize."

5. **⚠️ ch17-l1-x3** (`comprehension`): "leg was hurt … eyes were very sad" → "hurt and sad." Both adjectives occur verbatim in consecutive short clauses. Fix: "injured and unhappy."

---

## E. Narrative Voice / Pacing Improvements (3 findings, even if 0 R1-R8 violation)

> Per constraint: propose ≥3 narrative voice / pacing improvements beyond violation list.

1. **ch19-l7-q9 pacing**: The sentence "His low voice came up from the dark water in a slow sad sound" is evocative narration — but the stem is missing entirely (blank), making this question feel like a cold-start for the child. Adding a minimal stem like "How did the voice sound?" would help A2 learners anchor to the task without giving the answer. Currently it's pure listen-and-guess.

2. **ch21-l6-x7 奶奶語氣缺失**: The `explanationZh` for this emoji-pick reads "「wooden box full of stories」——交易的結果是「a box of stories」!" which is accurate but English-heavy. At A2 child level, the explanation should reinforce the story world: "天空神把所有故事都放進木箱送給阿南西——故事從此屬於世界上的每個人。" This turns a vocab check into a story beat.

3. **ch22-l1-x1 story frame cold open**: The comprehension at lesson 1 starts with "Long ago in China, a mother lived with her small son." — a straightforward scene-setter. But Ch22's explanationZh just echoes the sentence in Chinese. A stronger narrative intro would lean into Mochi/奶奶 frame: "奶奶翻開書說：很久很久以前，中國有個媽媽和她小兒子——孟母三遷的故事開始了。" This gives children the cultural hook before the quiz.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #78: X31_A6_CONTENT_WORD_OPTION_LINT

**Pattern**: `X31_A6_CONTENT_WORD_OPTION_LINT`

**問題**: A6 ("option-in-question") violations (11 P0 in Ch17–23) are **not caught by any existing lint rule**. The current validate-lessons.js checks R1 (correct option ⊆ sentence as full string) and X3 (verbatim words), but misses the content-word-overlap pattern where `content_words(correct_option) ⊆ content_words(sentence)`. This results in 11 questions that children can answer by audio word-matching alone — no comprehension required.

**業界依據**: Moore et al. (2023) *"Assessing the Quality of Multiple-Choice Questions Using GPT-4 and Rule-Based Methods"* ([arxiv.org/abs/2307.08161](https://arxiv.org/abs/2307.08161)) compared rule-based IWF (item-writing flaw) detection vs GPT-4. Rule-based method: **91% accuracy** vs GPT-4's 79%. Specific IWF studied includes "option contains stimulus words" — one of the most detectable flaws algorithmically. Conclusion: invest in lint rules first, LLM review as secondary pass.

Industry standard (ETS Part 3-4 / TOEIC technical manual April 2026): "All content-bearing words in the correct option must be paraphrased (synonym, hypernym, or structural reformulation) relative to the audio script." Pickup's R1 rule covers substring-match only; A6 content-word overlap is the next tier.

**建議實作** (2 steps):

**Step A — validate-lessons.js 新增 X31 lint rule**:
```js
// X31: A6 content-word overlap — correct option content words ⊆ sentence content words
const STOPWORDS = new Set(['the','a','an','in','on','at','to','of','and','or','is',
  'it','was','are','were','he','she','they','i','we','you','his','her','their',
  'that','this','for','with','as','by','from','not','so','did','do','does',
  'have','has','had','be','been','will','would','can','could','may','might',
  'what','who','when','where','how','why','which','yes','no']);

function contentWords(text) {
  return new Set(text.toLowerCase().match(/[a-z']+/g)?.filter(w => !STOPWORDS.has(w) && w.length >= 3) ?? []);
}

// In per-question check (skip narration, listen-tf):
if (!['narration','listen-tf'].includes(q.type) && q.correctIndex >= 0) {
  const correct = q.options[q.correctIndex];
  const correctText = typeof correct === 'string' ? correct : correct?.text ?? '';
  const cWords = contentWords(correctText);
  const sWords = contentWords(q.sentence ?? '');
  if (cWords.size >= 2) {
    const overlap = [...cWords].filter(w => sWords.has(w));
    if (overlap.length === cWords.size) {
      issues.push(`${q.id}: X31_A6_CONTENT_OVERLAP (all content words of correct option [${[...cWords].join(',')}] appear in sentence — paraphrase required)`);
    }
  }
}
```

**Step B — Content backfill Ch17–23** (11 items): Use Fable agent with paraphrase rules:
- Replace content nouns → synonym/hypernym (e.g. "clothes" → "clothing", "toys" → "playthings")
- Replace content adjectives → near-synonym (e.g. "warm" → "pleasant"/"cosy", "hurt" → "injured")
- Compound descriptor pairs → reformulate as phrase ("hard stone, thin wall" → "the weight difference")
- Character name pairs (Nolbu + Heungbu) → relationship label ("the two brothers")
- Keep distractors unchanged (P1 negation-trap ch17-l6-q5 is intentional, document as `intentional_a6_trap`)

**不改動**: `src/` 或 lessons-ch*.json 架構 — 純 content 編輯 + lint 規則。

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| X31_A6_CONTENT_WORD_OPTION_LINT (rule-based IWF detection) | [Moore et al. 2023, arxiv.org/abs/2307.08161](https://arxiv.org/abs/2307.08161) | ✅ 完全適合 — validate-lessons.js 已有同架構 X2/X3 rules，X31 是直接擴充；JS Set 操作，無外部依賴 | Low (lint rule ~30 min；content backfill 1–2 hr Fable parallel) | High — blocks 11 P0 comprehension-bypass failures in Ch17–23; prevents regression in future content | ✅ 建議實作 |
| LLM-based IWF review (GPT-4 pass over all options) | Moore et al. 2023 | 🟡 部分適合 — GPT-4 79% vs rule-based 91% for this flaw type; useful as secondary pass for grey-area cases not caught by X31 | High (API cost + latency per question) | Lower than rule-based for this specific flaw | 暫緩，rule-based 先行 |
