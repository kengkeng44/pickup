# ⚠️ Content QA — 2026-06-23 00:11 UTC

**Today's angle:** #12 — explanationZh story-voice vs jargon (register mismatch: 推理/paraphrase/answer-code formula vs grandma narrative warmth)
**Focus:** Ch25–31 (Yu Gong, Robin Hood, Archimedes, Copernicus, Galileo, Newton, Pythagoras — history expansion chapters)

---

## A. validate-lessons.js result

```
WARN lessons-ch31.json: 8 lint issue(s):
  kt-ch31-l1-q8: R1_SUBSTRING (correct option ⊆ sentence: "in a tall stone castle")
  kt-ch31-l4-q3: R1_SUBSTRING (correct option ⊆ sentence: "on Robin's front door")
  kt-ch31-l1-q6: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch31-l1-q8: X3_R1_VERBATIM_WORDS ("in a tall stone castle" all words in sentence)
  kt-ch31-l2-q7: X2_OPTION_LIST_BIAS (all start with "with")
  kt-ch31-l4-q3: X3_R1_VERBATIM_WORDS ("on Robin's front door" all words in sentence)
  kt-ch31-l6-q6: X2_OPTION_LIST_BIAS (all start with "they")
  kt-ch31-l6-q8: X2_OPTION_LIST_BIAS (all start with "in")
WARN lessons-ch5.json: 1 lint issue(s):
  kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS ("bones" all words in sentence)
WARN lessons-ch7.json: 1 lint issue(s):
  kt-ch7-l7-q5: X2_OPTION_LIST_BIAS (all start with "she")
Total mirror-lint issues: 72 (warn-only)
```

---

## B. Violation Table (selected — see stats for totals)

> Angle focus: `explanationZh` register — detect test-taking formula (`推理: EN → ZH (paraphrase)` / `答 Yes/No`) bleeding into grandma storytelling voice.

| Ch | Q ID | type | sentence snippet | violation | 修法 | audio regen? |
|----|------|------|-----------------|-----------|------|-------------|
| 25 | kt-ch25-l1-q3 | listen-mc | His home stood right between two very big mountains | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG + JARGON_ARROW` — "推理: between two very big mountains → 兩邊都有高大岩壁 (paraphrase)。" | 改為「奶奶說：愚公的家夾在兩座大山中間，四面都是高高的石壁。」 | no |
| 25 | kt-ch25-l1-q4 | listen-tf | The mountains made every trip out of his house very long | `JARGON_INFERENCE_TAG + JARGON_ANSWER_CODE_TF` — "推理: every trip very long → 不容易 → 答 No" | 改為「每次出門都要繞山走好久，這樣很不容易，所以是 No 喔。」 | no |
| 25 | kt-ch25-l1-q6 | listen-mc | He could not go straight to town. He had to take the long path | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG + JARGON_ARROW` — "推理: could not go straight + had to take long path → 山擋住短路線 (paraphrase)。" | 改為「奶奶說：山擋住了捷徑，每次都得多走好遠的路。」 | no |
| 25 | kt-ch25-l1-q8 | listen-mc | Yu Gong thought about this problem for many, many days | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG` — "推理: thought about this for many days → 在想辦法 (paraphrase)。" | 改為「他一直在想，一直在想，心裡已經有個主意了。」 | no |
| 25 | kt-ch25-l2-q3 | listen-mc | His sons and grandsons all came close to hear him | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG` — "推理: sons and grandsons all came → 全家大大小小 (paraphrase)。" | 改為「奶奶說：兒子、孫子，大大小小全圍了過來，想聽爺爺說什麼。」 | no |
| 25 | kt-ch25-l2-q4 | listen-tf | The whole family kept very quiet and looked at him | `JARGON_INFERENCE_TAG + JARGON_ANSWER_CODE_TF` — "推理: 安靜 + 看著他 → 準備聽 → 答 Yes" | 改為「全家人都靜靜看著他，這樣是準備聽他說了，是 Yes 喔。」 | no |
| 25 | kt-ch25-l1-q1 | tap-pairs | vocab pre-lesson | `JARGON_VOCAB_HEADER + JARGON_MEMORIZE_DRILLCMD` — "本節新單字 (左中右英): ... 背熟這 4 個字" | 改為「奶奶故事裡會出現這幾個字，先認識它們！」 | no |
| 26 | kt-ch26-l1-q3 | listen-mc | (same triple-jargon formula) | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG + JARGON_ARROW` | 奶奶語氣重寫同上規則 | no |
| 27 | kt-ch27-l1-q3 | listen-mc | (same triple-jargon formula) | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG + JARGON_ARROW` | 奶奶語氣重寫同上規則 | no |
| 28 | kt-ch28-l1-q4 | listen-tf | (answer code TF) | `JARGON_INFERENCE_TAG + JARGON_ANSWER_CODE_TF` | 口語化 "所以是 Yes/No 喔" 替換 | no |
| 29 | kt-ch29-l1-q3 | listen-mc | (same triple-jargon formula) | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG + JARGON_ARROW` | 奶奶語氣重寫同上規則 | no |
| 30 | kt-ch30-l1-q3 | listen-mc | (same triple-jargon formula) | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG + JARGON_ARROW` | 奶奶語氣重寫同上規則 | no |
| 31 | kt-ch31-l1-q3 | listen-mc | (same triple-jargon formula) | `JARGON_INFERENCE_TAG + JARGON_PARAPHRASE_TAG + JARGON_ARROW` | 奶奶語氣重寫同上規則 | no |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch25–31 (7 chapters) |
| Total lessons | ~49 |
| Total explanationZh entries | 546 |
| **Unique questions with violations** | **290 / 546 (53%)** |
| P0 violations (critical) | **194** |
| P1 violations (warn) | 96 |
| JARGON_INFERENCE_TAG (`推理:`) | 193 occurrences |
| JARGON_PARAPHRASE_TAG (`(paraphrase)`) | 142 occurrences |
| JARGON_ARROW (`→`) | 241 occurrences |
| JARGON_ANSWER_CODE_TF (`答 Yes/No`) | 50 occurrences |
| JARGON_VOCAB_HEADER (`本節新單字`) | 49 occurrences |
| JARGON_MEMORIZE_DRILLCMD (`背熟這N個字`) | 49 occurrences |
| Triple-jargon combo (P0+P0+P1) | 141 listen-mc entries |
| Narration entries with correct register | 248 (✅ clean) |
| Chapters affected | 7/7 (uniform formula — systemic) |

**Root cause: systemic formula template.** All `listen-mc` explanationZh follow the pattern `推理: [EN evidence] → [ZH inference] (paraphrase)。` and all `listen-tf` follow `推理: [chain] → 答 Yes/No`. This is a test-coaching formula, not grandma story narrative. The narration entries (48% of all entries) correctly use warm Chinese story prose — the formula was applied only to comprehension Q explanations.

---

## D. Top 5 P0

### P0-1 — Triple-jargon combo saturates ALL listen-mc in Ch25–31

**Pattern:** `推理: [EN key words] → [ZH paraphrase] (paraphrase)。`  
**Example:** `kt-ch25-l1-q3` listen-mc  
`"推理: between two very big mountains → 兩邊都有高大岩壁 (paraphrase)。"`

**Why it fails:**
- `推理:` = test-taking strategy label (「做聽力題要先推理」). A 9-year-old will read this and learn test-gaming, not story meaning.
- `(paraphrase)` = English technical term (a content note for the item writer, not the learner).
- `→` = logical flow arrow borrowed from item-design notation — cold, clinical, zero warmth.
- Grandma would say: **「奶奶說：愚公的家夾在兩座大山中間，四面都是高高的石壁。」**

**Scope:** 141 listen-mc entries across Ch25–31 (identical pattern). All chapters affected equally.

**修法 template:**
```
Before: 推理: [EN evidence] → [ZH result] (paraphrase)。
After:  奶奶說：[story-context ZH explanation]。
```

---

### P0-2 — Answer-code TF suffix (`答 Yes/No`) disrupts story immersion

**Pattern:** `推理: [chain] → 答 Yes` / `→ 答 No`  
**Example:** `kt-ch25-l1-q4` listen-tf  
`"推理: every trip very long → 不容易 → 答 No"`

**Why it fails:** `答 No` is an exam notation. A grandma would not coach test answers — she'd explain in story terms. The correct register: **「每次出門都要繞山走好久，這樣真的很累，所以是 No 喔。」**

**Scope:** 50 listen-tf entries across Ch25–31.

---

### P0-3 — Vocab drill command breaks bedtime story register

**Pattern:** `本節新單字 (左中右英): ... 背熟這 N 個字,故事就會輕鬆聽懂。`  
**Example:** `kt-ch25-l1-q1` tap-pairs  

**Why it fails:** `本節新單字` (section vocab) and `背熟這4個字` (memorize these 4 words) are classroom drill commands. Pickup is a grandma-bedtime-story app for 8-12 year olds — not a vocabulary workbook. The contrast with narration entries immediately before/after is jarring: narration says "很久以前，有一位老人叫做愚公。" then tap-pairs says "本節新單字 (左中右英): ... 背熟這4個字". Two different apps in the same lesson.

**修法 template:**
```
Before: 本節新單字 (左中右英): 🔑 word = 字 ... 背熟這N個字,故事就會輕鬆聽懂。
After:  奶奶的故事裡會出現這幾個字，先認識它們：[word list remains OK]
```

**Scope:** 49 tap-pairs entries (1 per lesson, all chapters affected).

---

### P0-4 — Arrow-chain formula obscures rather than explains

**Example:** `kt-ch25-l3-q4` listen-tf  
`"推理: 三種大小 → 大人 + 大孩子 + 小孩子 → 三代一起 → 答 Yes"`

**Why it fails:** A 3-step arrow chain is a mnemonic for a test-taker who needs to decompose audio. It is NOT an explanation of story meaning for a child. It's also ambiguous: "三種大小" appears with no article reference. A child reading this gets confused about what "→" means. The grandma register: **「家裡老老小小，爸爸、孩子、小寶寶，三代全圍過來了，是 Yes 喔。」**

---

### P0-5 — Narrative pacing / voice improvement (non-jargon)

Even in clean narration entries, three pacing improvements apply across Ch25–31:

1. **Grandma address particle missing**: Clean narration (`很久以前，有一位老人叫做愚公`) is technically correct but never uses the signature Mochi/Hana address. Consider interspersing `「Mochi，你聽到嗎？」` or `「Hana 搖搖尾巴，好像聽懂了！」` after inference Qs to maintain character frame.

2. **No story-beat transition**: After correct answer reveal, the explanation jumps straight to the Chinese gloss with no story continuity cue. Add a soft bridge: `「就是這樣——` before the explanation, matching the `繼續 → Continue` UX flow.

3. **Missing encouragement beat on hard inference Qs**: Inference questions in history chapters (where the correct answer requires cultural knowledge, e.g. "Who was Archimedes?") have explanations that are purely factual ("推理: math genius → 數學家"). Add a warmth suffix: `「很聰明！奶奶也是這樣想的。」`

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #67: X20_EXPL_JARGON_GATE — explanationZh register lint guard**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **Contextual narrative explanation voice** (Duolingo "Explain My Answer" — GPT-4, contextual, audience-matched; 65% adoption, +15% completion) | [Duolingo Explain My Answer free](https://blog.duolingo.com/explain-my-answer-now-free/) | ✅ 適合 — Pickup explanationZh should mirror Duolingo's "same voice, matched to audience" principle: grandma-narrator for 8-12 children, not test-coaching register. Lint enforces the gate, content sprint fixes the formula. | Low (lint: ~30 min) + Medium (content rewrite: Fable batch) | High — 290 voice-mismatched Q explanations break the $grandma-bedtime immersion that is Pickup's core differentiator | **✅ 推薦實作 (lint gate first, content sprint second)** |
| **Register-aware explanation template** (Cambridge ELT storytelling: "emotion, images, action" scaffold; feedback that maintains narrative frame) | [Cambridge ELT storytelling](https://www.cambridge.org/elt/blog/2021/02/17/storytelling-to-extend-childrens-learning/) | ✅ 適合 — explanationZh for listen-mc/listen-tf should use story-frame reference (`奶奶說：` / character cue `Mochi 聽到了嗎？`) not logical-notation arrow chain | Low (template doc update) | Medium-High | **✅ 推薦加入 Content Style Guide** |

**具體實作 (2 steps):**

**Step A — Lint (validate-lessons.js, ~30 min):**
Add `X20_EXPL_JARGON_GATE` check:
```js
// In validate-lessons.js extended lint block:
const EXPL_JARGON = [
  { re: /推理[:：]/,          tag: 'X20_EXPL_JARGON_GATE', msg: 'explanationZh contains test-coaching prefix "推理:"' },
  { re: /\(paraphrase\)/i,   tag: 'X20_EXPL_JARGON_GATE', msg: 'explanationZh contains item-writer technical label "(paraphrase)"' },
  { re: /答\s*(Yes|No|True|False)/, tag: 'X20_EXPL_JARGON_GATE', msg: 'explanationZh uses answer-code suffix "答 Yes/No" — use story narrative instead' },
  { re: /本節新單字/,          tag: 'X20_EXPL_JARGON_GATE', msg: 'explanationZh uses textbook drill header "本節新單字" — use grandma intro instead' },
  { re: /背熟這\s*\d+\s*個字/, tag: 'X20_EXPL_JARGON_GATE', msg: 'explanationZh uses drill command "背熟這N個字" — use warm invitation instead' },
];
// Apply to each q.explanationZh where q.type ∈ ['listen-mc', 'listen-tf', 'tap-pairs']
```

**Step B — Content sprint (Fable batch, Ch25–31):**
Replace formula explanationZh using two voice templates:

*Template A (listen-mc):*
```
Before: 推理: [EN key phrase] → [ZH meaning] (paraphrase)。
After:  奶奶說：[ZH narrative explanation, 1-2 sentences, story-context]。
```

*Template B (listen-tf):*
```
Before: 推理: [chain] → 答 Yes/No
After:  [ZH story-context reason clause]，所以是 [Yes/No] 喔。
```

*Template C (tap-pairs vocab intro):*
```
Before: 本節新單字 (左中右英): ... 背熟這N個字
After:  奶奶的故事裡會出現這幾個字，先認識它們：
```

**Scope:** 290 questions × 7 chapters = bulk Fable dispatch. Recommend 1 chapter per subagent run (7 parallel agents) to avoid context overflow.
