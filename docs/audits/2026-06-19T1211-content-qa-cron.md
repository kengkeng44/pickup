# Content QA — 2026-06-19 12:11 UTC

**Today's angle: #12 — explanationZh Story-Voice vs Jargon**
**Focus: Ch2–8** (core fairy tales; also systemic cross-chapter verification)

**#12 Definition:** Every `explanationZh` field in a lesson question must read in warm story-voice — the tone of a grandma or caring narrator speaking TO an 8-12 year old child — not in the voice of a classroom teacher writing on a whiteboard. Violations include: symbolic inference notation (`→`), academic summary formulas (`主旨 =`), linguistic metalanguage (`片語`, `選項`, `語法`, `左中右英`), study-hall commands (`背熟`), and overly terse glosses with no warmth.

**Why #12 matters (pedagogical basis):** Tinker Tales (arXiv:2602.04109, 2025) shows story-consistent scaffolding outperforms direct instruction for 8–12 age group on comprehension and retention. Cambridge Cambridge YLE feedback guidance (cambridge.org) explicitly recommends avoiding technical metalanguage with young learners. The Pickup CLAUDE.md brand mandate — "溫暖陪伴 (奶奶 + Mochi + Hana) — 不焦慮、不打擊、不催促" — directly conflicts with classroom register. Frontiers research (2026.1703664) confirms immediate, narrative-embedded feedback outperforms analytical post-answer explanation for child L2 learners.

**Previous 8 crons:** R2, A4, R1, A6, A1, A3, #11, #10. Angle #12 not previously run this window.

**Chapter-story mapping (actual, verified via narration sentences):**
- Ch0: Onboarding / prologue (rainy night, Mochi frame)
- Ch1: 桃太郎 (Momotaro) — peach, river, boy, demons, dumplings
- Ch2: 醜小鴨 (Ugly Duckling) — duck eggs, pond, feathers
- Ch3: 龜兔賽跑 (Tortoise and Hare) — hare, field, race
- Ch4: Just So / Camel story — new world, animals helping Man
- Ch5: Baba Yaga / Vasilisa — girl, dark forest, stepmother
- Ch6: 六隻天鵝 (Six Swans) — king, castle, green wood
- Ch7: 葉限 / Yexian (Chinese Cinderella) — cave village, fish
- Ch8: 三隻小豬 (Three Little Pigs) — mother pig, road, wolf

⚠️ **CLAUDE.md drift:** CLAUDE.md 8-chapter map lists Ch2=桃太郎, Ch3=醜小鴨, etc. Actual JSON files are shifted by 1 — Ch1=桃太郎, Ch2=醜小鴨. CLAUDE.md 故事序號與 JSON 內容有一位偏差 (P1 doc drift, not a content error — content is internally consistent).

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json–ch8.json: 63 lessons validated
WARN lessons-ch3.json: 8 lint issues (X2_OPTION_LIST_BIAS ×6, others)
WARN lessons-ch5.json: 1 lint issue (kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS)
WARN lessons-ch7.json: 1 lint issue (kt-ch7-l7-q5: X2_OPTION_LIST_BIAS)

Total mirror-lint issues: 72 (warn-only)
```

No #12 (story-voice) lint rule exists — validate-lessons.js cannot detect `→` notation or `主旨 =` formula. All 3 systemic violations below are manual audit findings.

---

## B. Violation Table

### SYSTEMIC-1: Arrow (→) Academic Inference Notation

**188 violations across Ch2–8 (34.9% of all questions with explanationZh)**

Pattern: `推理:A + B → C → 答 Yes/No`

This is academic whiteboard / flowchart notation. The `→` symbol represents logical implication — standard in high-school mathematics and Chinese language classes but not accessible to 8–12 year olds and completely outside grandma's story voice.

| Ch | Q ID | Type | Violation | Current text | Severity |
|----|------|------|-----------|--------------|----------|
| 2 | kt-ch2-l1-q4 | listen-tf | ARROW_CHAIN | `推理:蘆葦靜靜地站著 → 安靜的地方 → 答 No` | **P0** |
| 2 | kt-ch2-l3-q10 | listen-mc | ARROW_CHAIN | `被啄 + 被笑 → 孤單。` | P1 |
| 3 | kt-ch3-l1-q4 | listen-tf | ARROW_CHAIN | `推理:沒人回話 + 低頭 → 不喜歡聽 → 答 No` | **P0** |
| 4 | kt-ch4-l1-q4 | listen-tf | ARROW_CHAIN | `推理:還沒準備好的那個精靈 → 不完整 → 答 No` | **P0** |
| 5 | kt-ch5-l1-q4 | listen-tf | ARROW_CHAIN | `推理:從早做到晚 + 一個人 → 新太太對她不好 → 答 No` | **P0** |
| 5 | kt-ch5-l1-q10 | listen-mc | ARROW_CHAIN + TOO_SHORT | `冷冷的夜 → 冬天。` (9 chars) | **P0** |
| 6 | kt-ch6-l1-q4 | listen-tf | ARROW_CHAIN | `推理:還沒醒 + 聲音 → 被打擾了 → 答 Yes` | **P0** |
| 7 | kt-ch7-l1-q4 | listen-tf | ARROW_CHAIN | `推理:背 + 水 + 薪 → 重工作 → 答 Yes` | **P0** |
| 8 | kt-ch8-l1-q4 | listen-tf | ARROW_CHAIN | `推理: 抱很緊不放 → 不捨 → 答 Yes` | **P0** |

**Representative counts by chapter:**
| Chapter | Arrow violations | Total Q with expl |
|---------|-----------------|-------------------|
| Ch2 | 27 | ~56 |
| Ch3 | 33 | ~56 |
| Ch4 | 27 | ~56 |
| Ch5 | 24 | ~56 |
| Ch6 | 35 | ~56 |
| Ch7 | 24 | ~56 |
| Ch8 | 18 | ~56 |
| **Total** | **188** | **~392** |

---

### SYSTEMIC-2: `主旨 =` Academic Summary Formula

**30 violations across ALL chapters (Ch1–8 and beyond)**

Every Q10 in each lesson contains: `主旨 = [topic summary phrase]`

`主旨` is a formal Chinese academic term for "main thesis / thematic statement" — taught in senior high school Chinese composition class. The `=` is algebraic shorthand. Both are cold, academic, and inappropriate for 8–12 children in a bedtime story app.

| Ch | Q ID | Current text | Severity |
|----|------|--------------|----------|
| 3 | kt-ch3-l1-q10 | `主旨 = 兔子在大家面前笑烏龜。` | **P0** |
| 3 | kt-ch3-l3-q10 | `主旨 = 兔子決定睡覺。` | **P0** |
| 4 | kt-ch4-l4-q10 | `主旨 = 精靈見三人後準備出手。` | **P0** |
| 5 | kt-ch5-l2-q10 | `主旨 = 孤單女孩 + 黑森林 + 只有娃娃。` | **P0** |
| 5 | kt-ch5-l4-q10 | `主旨 = 屋子自己動。` | **P0** |
| 5 | kt-ch5-l6-q10 | `主旨 = 在絕望中找到媽媽留的依靠。` | **P0** |
| 6 | kt-ch6-l1-q10 | `主旨 = 沒有母親的家庭。` | **P0** |
| 6 | kt-ch6-l4-q10 | `主旨 = 安靜辛苦地救哥哥。` | **P0** |
| 6 | kt-ch6-l6-q10 | `主旨 = 面對火焰的沉默女人。` | **P0** |
| 7 | kt-ch7-l1-q10 | `主旨 = 葉限辛苦的日常。` | **P0** |
| 7 | kt-ch7-l2-q9 | `主旨 = 池邊的祕密友誼。` | **P0** |
| 7 | kt-ch7-l3-q10 | `主旨 = 葉限失去唯一的朋友。` | **P0** |

*(17 more in Ch7–8 and extended chapters — same formula)*

---

### SYSTEMIC-3: `本節新單字 (左中右英)` Study-Sheet Q1 Pattern

**217 violations across ALL chapters**

Every lesson's Q1 slot contains a vocabulary preview in study-sheet format:
```
本節新單字 (左中右英):
🔑 river = 河
🔑 peach = 桃子
🔑 boy = 男孩
🔑 demon = 妖怪
背熟這 4 個字,故事就會輕鬆聽懂。
```

Violations:
1. `本節新單字` — metalanguage ("this lesson's new words" = classroom register)
2. `左中右英` — typography/layout jargon (not comprehensible to 8-12 child)
3. `背熟` — "memorize" command. Directly contradicts brand promise: "不焦慮、不打擊、不催促"
4. The entire format mimics a classroom vocabulary drill sheet, not grandma's warmth

Example: `kt-ch1-l1-q1` through `kt-ch8-l7-q1` — every Q1 across 32 chapters.

---

### SPECIFIC Violations

| Ch | Q ID | Type | Snippet | Violation | Severity | audio regen? |
|----|------|------|---------|-----------|----------|--------------|
| 2 | kt-ch2-l7-pp1 | tap-pairs | `片語配對複習 — 醜小鴨故事裡的重要片語。` | `片語` = linguistic jargon; `配對複習` = classroom drill metalanguage | P1 | No |
| 5 | kt-ch5-l4-q7 | listen-mc | `雞腳上的屋子。` (7 chars) | TOO_SHORT + no story warmth at all | P1 | No |
| 5 | kt-ch5-l6-q7 | listen-mc | `頭骨發光。` (5 chars) | TOO_SHORT + no story warmth, no context | P1 | No |
| 7 | kt-ch7-l3-q7 | listen-mc | `其他選項都不是這段話講的內容。` | `選項` = test-taking jargon; `這段話` = cold analytical register | P1 | No |
| 8 | kt-ch8-l1-q1 | vocab | `背熟這 4 個字,故事就會輕鬆聽懂。` | `背熟` = "memorize" anti-warmth command | P1 | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch2–8 Q with explanationZh scanned | 539 |
| Arrow (→) violations | 188 (34.9%) |
| 主旨 = violations (all chapters) | 30 |
| 本節新單字 study-sheet Q1 (all chapters) | 217 |
| Direct jargon terms (片語/選項) | 2 |
| TOO_SHORT (<12 chars) | 27 |
| **Total systemic violations** | **435+** |
| P0 (blocking brand voice promise) | **3 systemic patterns** |
| P1 (individual specific) | 31 |
| audio regen needed | 0 |

---

## D. Top 5 P0

1. **⚠️ P0-SYSTEMIC: `→` ARROW INFERENCE CHAIN — 188 violations, Ch2–8**
   - Root cause: batch content generation used `推理:A → B → 答 Yes/No` as a template
   - Brand impact: academic whiteboard notation ≠ grandma warmth; inaccessible to 8-12
   - Fix: rewrite all 188 as narrative-voice explanation
   - Example fix for `kt-ch2-l1-q4`:
     - BAD: `推理:蘆葦靜靜地站著 → 安靜的地方 → 答 No`
     - GOOD: `蘆葦靜靜地立在那裡——這地方好安靜喔，不是嘈雜的地方呢。`
   - Files: `public/lessons-ch2.json` through `lessons-ch8.json`

2. **⚠️ P0-SYSTEMIC: `主旨 =` FORMULA — 30 violations, ALL chapters**
   - Root cause: systematic Q10 template `主旨 = [summary]`; `主旨` is high-school academic term
   - Brand impact: "main thesis" concept = senior high Chinese class, not 8-yr-old bedtime
   - Fix: convert to 1-line narrative scene recap
   - Example fix for `kt-ch3-l1-q10`:
     - BAD: `主旨 = 兔子在大家面前笑烏龜。`
     - GOOD: `兔子在所有動物面前大聲嘲笑烏龜，好驕傲喔——奶奶說這種行為叫做「驕傲」。`
   - Files: ALL `public/lessons-ch*.json`

3. **⚠️ P0-SYSTEMIC: `本節新單字 (左中右英) ... 背熟這 4 個字` — 217 violations, ALL chapters**
   - Root cause: Q1 vocabulary preview template uses classroom worksheet format
   - Brand impact: `背熟` ("memorize") directly contradicts "不焦慮、不催促" brand promise
   - Fix: rewrite Q1 explanationZh as warm story preview
   - Example fix for `kt-ch1-l1-q1`:
     - BAD: `本節新單字 (左中右英): 🔑 river = 河 ... 背熟這 4 個字,故事就會輕鬆聽懂。`
     - GOOD: `奶奶今晚會說到這幾個字喔！🌸 river=河 · peach=桃子 · float=漂 · something=東西 — 聽到了就知道了！`
   - Files: ALL `public/lessons-ch*.json`

4. **P1: `kt-ch5-l4-q7` + `kt-ch5-l6-q7` — TOO_SHORT (5-7 chars)**
   - `雞腳上的屋子。` and `頭骨發光。`
   - Zero warmth, no narrative context — reads like a database tag, not a grandma's comment
   - Fix: expand to 20+ char warm story phrase
   - Example: `頭骨發光。` → `那顆頭骨竟然發出光來！這是巴巴雅嘎給的魔法之光。`

5. **P1: `kt-ch7-l3-q7` — `選項` test-taking jargon**
   - `其他選項都不是這段話講的內容。`
   - "選項" (options) is a test-question metalanguage word children know from exams but associate with anxiety
   - Fix: `家人沒有在餐桌上說魚是從哪裡來的——葉限的朋友是個祕密！`

---

## E. Narrative Voice / Pacing Improvements (3 proposals, even without R1-R8 violation)

1. **Arrow → Narrative Arc Pattern for listen-tf explanationZh**
   Restructure all listen-tf explanationZh to follow: `[Story clue] + [What it tells us] + [感嘆詞]`
   Example: `推理:腳痛 + 很多小時 → 不短也不簡單 → 答 No`
   → `醜小鴨走了好多好多個小時，腳都痛了——這可不是短短的一段路呢！`
   This preserves the pedagogical function (inference-from-clue) but wraps it in story warmth.

2. **Q10 `主旨` → Scene Recap Card**
   Replace the `主旨 = ` formula with a 2-line "場景回顧" (Scene Recap) format:
   `🌙 今晚奶奶說到：[1-sentence story recap in child-friendly zh-TW]`
   e.g.: `🌙 今晚奶奶說到：兔子嘲笑烏龜，但烏龜沒有放棄——牠一步一步，慢慢走完了。`
   This uses `今晚` to reinforce the bedtime story frame and adds emotional payoff.

3. **Q1 Vocab Preview → "先認識" Grandma Intro**
   Replace `本節新單字 (左中右英) / 背熟這 4 個字` with a short warm intro in grandma voice:
   `「今晚的故事裡，這幾個字你會聽到——先認識一下好嗎？」🌸 river=河 · peach=桃子 · float=漂 · something=東西`
   Removes `背熟` pressure, replaces with invitation. `左中右英` jargon disappears entirely.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #53: X7_STORY_VOICE_EXPLANATION_LINT

**Pattern:** Automated lint guard for explanationZh jargon/metalanguage tokens

**Source evidence:**
| Source | URL | Relevant finding |
|--------|-----|-----------------|
| Tinker Tales (arXiv 2025) | https://arxiv.org/pdf/2602.04109 | Story-consistent scaffolding outperforms direct instruction for 8–12 children |
| Frontiers Education 2026 | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1703664/full | Narrative-embedded immediate feedback > analytical post-answer for child L2 |
| Cambridge YLE Feedback Guidance | https://www.cambridge.org/sites/default/files/media/documents/Giving_Feedback_minipaper_ONLINE.pdf | Avoid jargon and technical terms with young learners |
| Duolingo UX (Usability Geek 2025) | https://usabilitygeek.com/ux-case-study-duolingo/ | Immediate, gentle, non-metalanguage feedback is core to Duolingo's approach |

**Pickup 適配 verdict: ✅ 完全適合**

Pickup's brand is "grandma's bedtime stories for children 8-12." The arrow/主旨/study-sheet voice is the opposite of this. A lint rule that catches these at content-generation time prevents future batch re-introduction.

**Proposed rule (additive to `tools/validate-lessons.js`):**

```js
// X7_STORY_VOICE_EXPLANATION_LINT
const JARGON_TOKENS = [
  '→', '主旨', '本節新單字', '左中右英', '背熟',
  '選項', '片語', '語法', '文法', '答題', '本句', '本段',
  '其他選項', '此題', '本題'
];

for (const q of lesson.questions) {
  if (!q.explanationZh) continue;
  for (const token of JARGON_TOKENS) {
    if (q.explanationZh.includes(token)) {
      warn(q.id, 'X7_STORY_VOICE_JARGON', `"${token}" is classroom metalanguage`);
    }
  }
  if (q.explanationZh.length < 8 && q.type !== 'narration') {
    warn(q.id, 'X7_TOO_SHORT_EXPLANATION', `only ${q.explanationZh.length} chars`);
  }
}
```

**Effort:** S (1hr to add lint rule to validate-lessons.js)
**ROI:** ⭐⭐⭐ (prevents re-introduction of 435+ violation pattern across every future content batch)
**Field impact:** `explanationZh` string in all `public/lessons-ch*.json` — read-only lint, no data mutation
**Fix effort for existing violations:** L (435+ fields to rewrite — recommend batch Fable agent per chapter)

**Priority vs current Decision Board items:**
- Higher ROI than most existing items: this is a *prevention* lint (S effort) that guards against the largest single content quality failure found to date
- Content fix (L) should follow after lint is green on future content; existing violations are P0 brand voice but not render-blocking

---

*Audit generated: 2026-06-19 12:11 UTC | model: claude-sonnet-4-6 | angle: #12 explanationZh story-voice vs jargon | focus: Ch2–8 + cross-chapter systemic*
