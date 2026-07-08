# Content QA — 2026-07-08 18:04 UTC

**Today's angle:** #12 — explanationZh story-voice vs jargon
**Focus:** Ch9–Ch16 (灰姑娘 / 嫦娥奔月 / 后羿射日 / 牛郎織女 / 小紅帽 / 浦島太郎 / 國王的新衣 / 一寸法師 — 8 chapters, 880 explanationZh items audited)

**Angle definition — #12 explanationZh story-voice vs jargon:**
Checks whether the Chinese post-answer explanations (`explanationZh` field) maintain warm grandma/story-immersion voice or slide into dry textbook / test-prep metalanguage incongruent with the 8-12 children ELT brand (故事燈 = 「奶奶的睡前英文小故事」).

Sub-type violations audited:
- **TESTPREP_RATIOCINATE** — explanationZh starts with `推理:` prefix (test-design authoring notation leaked into player-facing field)
- **TESTPREP_PARAPHRASE_LABEL** — `(paraphrase)` English ELT jargon appears inline in the Chinese explanation
- **TESTPREP_META_PROMPT** — explanation directly coaches the test-strategy ("這題要你推理動機，不只是記句子")
- **GRAMMAR_TEXTBOOK_RULE** — uses "動詞後面要加 -s" metalinguistic rule pattern (names the grammatical term 動詞 explicitly)
- **GRAMMAR_TEXTBOOK_PARSING** — uses "是分開的動詞片語" or equivalent parsing description (names syntactic structure explicitly)
- **TERM_IDIOM_LABEL** — calls a phrase a "慣用語" without story-context wrap

**Industry basis (2025–2026):**
- Cambridge ELT Feedback Research: explicit metalinguistic labels (verb, tense, phrase) increase cognitive load for young learners without improving retention; correct-in-context modeling beats rule-labeling. ([Cambridge minipaper](https://www.cambridge.org/us/files/4415/8594/0876/Giving_Feedback_minipaper_ONLINE.pdf))
- Duolingo for Kids (2026): Duolingo's "Explain My Answer" (Jan 2026) is explicitly adult-targeted and uses terminology like "conjugation"; the children's flow uses show-correct-answer without grammar labels. ([Duolingo blog](https://blog.duolingo.com/explain-my-answer-now-free/))
- Krashen acquisition hypothesis (dominant applied-linguistics framework): grammar rules are not needed for acquisition — comprehensible input in meaningful context is. Storytelling interventions show +25% vocabulary, +30% narrative skill vs. grammar-drill controls. ([GlobalSprouts](https://www.globalsprouts.com/blogs/explore-more/language-immersion-vs-traditional-learning-progress-tracking))
- FabuLingua children's ELT (2025): uses "playful repetition inside story context" — feedback is praise/retry + correct sentence modeled, never "that is the wrong verb tense." ([FabuLingua](https://www.fabulingua.com/blog/the-power-of-playful-repetition-in-learning-a-second-language/))
- PMC narrative-based language intervention study: significant gains in sentence complexity and vocabulary achieved without explicit grammar instruction, supporting story-voice design principle. ([PMC 9620707](https://pmc.ncbi.nlm.nih.gov/articles/PMC9620707/))

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 441 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

Breakdown of new-to-this-audit issue codes (explanationZh register — NOT yet detected by validate-lessons.js):
- `TESTPREP_RATIOCINATE` — 3 instances (Ch12, Ch13×2)
- `TESTPREP_PARAPHRASE_LABEL` — 3 instances (same Q IDs — double violation)
- `TESTPREP_META_PROMPT` — 1 instance (Ch16)
- `GRAMMAR_TEXTBOOK_RULE` — 2 instances (Ch12, Ch15)
- `GRAMMAR_TEXTBOOK_PARSING` — 1 instance (Ch10)
- `TERM_IDIOM_LABEL` — 1 instance (Ch15)

**Total unique P0-bearing questions: 7**
**None currently flagged by validate-lessons.js** — lint gap confirmed.

---

## B. Violation table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 12 | kt-ch12-l7-q9 | listen-mc | `推理: 對孩子講故事 → 說這個古老故事 (paraphrase)。` | P0 TESTPREP_RATIOCINATE + TESTPREP_PARAPHRASE_LABEL | `奶奶對孩子說了這個老故事——「tell」就是說、講的意思，故事裡她就是在「說」這個故事喔！` | No |
| 13 | kt-ch13-l7-q3 | listen-mc | `推理: opened up with care → 小心打開他 (paraphrase)。` | P0 TESTPREP_RATIOCINATE + TESTPREP_PARAPHRASE_LABEL | `小心翼翼地打開——opened up with care，就是輕輕、仔細地開，不急不躁喔！` | No |
| 13 | kt-ch13-l7-q7 | listen-mc | `推理: hot tea + huntsman home → 溫暖又安全 (paraphrase)。` | P0 TESTPREP_RATIOCINATE + TESTPREP_PARAPHRASE_LABEL | `獵人帶回溫熱的茶、奶奶也回到家——這一刻既溫暖又安全，peaceful 就是這樣的感覺！` | No |
| 16 | kt-ch16-l4-lg2 | comprehension | `這題要你「推理」他的動機，不只是記句子喔！` | P0 TESTPREP_META_PROMPT | 刪除「這題要你「推理」…」一整句；改為：`一寸那麼小，卻站在最高處盯著前方——他的工作就是保護公主，站在那裡才能看得最遠！` | No |
| 10 | kt-ch10-l4-ttx2 | type-translate | `是分開的動詞片語，pill 可以放中間或後面都對。` | P0 GRAMMAR_TEXTBOOK_PARSING | `pick up = 拿起來。嫦娥拿起那顆仙丹——She picked up the pill，也可以說 She picked the pill up，兩種都對喔！` | No |
| 12 | kt-ch12-l2-gm1 | grammar-mc | `動詞後面要加 -s → weaves 喔。` | P0 GRAMMAR_TEXTBOOK_RULE | `織女每天都織布呀——說天天都做的事，英文要用 weaves，尾巴多個 "s" 喔！` | No |
| 15 | kt-ch15-l2-gm1 | grammar-mc | `動詞後面要加 -s，wear → wears 喔。` | P0 GRAMMAR_TEXTBOOK_RULE | `國王每天都穿新衣服——說天天都做的事，英文 wear 要變成 wears，尾巴加個 "s" 喔！` | No |
| 15 | kt-ch15-l4-ttx2 | type-translate | `go cold 是常用慣用語，表示心裡突然很慌很不安。` | P1 TERM_IDIOM_LABEL | `went cold = 涼了——心裡突然涼涼的、很不安的感覺，英文就說 go cold 喔。` | No |

---

## C. Stats

| 指標 | 數值 |
|------|------|
| Ch9-16 總 explanationZh 條目 | 880 |
| 唯一 P0 違規題數 | 7 |
| P1 違規題數 | 1 |
| P2 systemic (片語 in phrase-pairs intros) | 11 instances across Ch9-16 |
| P2 systemic (關鍵詞 vs 關鍵字) | 3 instances (Ch9-l5/l6/l7) |
| grammar-mc 暖聲 ("要變成") ✅ | 23 |
| grammar-mc textbook ("動詞後面要加") ❌ | 2 (Ch12, Ch15) |
| validate-lessons.js 現有能偵測以上違規 | 0 (lint gap) |

**Pattern note:** All 3 `推理:` violations are in lesson-7 of their chapters (l7 = 最終章內節). This suggests the content generation template for lesson-7 listen-mc questions uses an authoring shorthand ("推理:" + arrow notation + "(paraphrase)") that was never stripped before commit. The pattern is systematic across at least 2 chapters (Ch12 + Ch13) and likely affects Ch14-Ch16 l7 nodes as well if similarly generated.

---

## D. Top 5 P0

1. **⚠️ kt-ch12-l7-q9** — DOUBLE violation: `推理:` prefix + `(paraphrase)` English label — both are raw authoring notation leaked into the player-facing field. A 9-year-old seeing `推理: 對孩子講故事 → 說這個古老故事 (paraphrase)` gets zero comprehension and zero warmth.

2. **⚠️ kt-ch13-l7-q3** — `推理: opened up with care → 小心打開他 (paraphrase)。` — same pattern; the arrow-notation shorthand is internal ELT item-writing shorthand, not a child explanation.

3. **⚠️ kt-ch13-l7-q7** — `推理: hot tea + huntsman home → 溫暖又安全 (paraphrase)。` — additionally switches to English keywords mid-sentence ("hot tea + huntsman home"), further breaking voice for a Chinese-reading child.

4. **⚠️ kt-ch16-l4-lg2** — `這題要你「推理」他的動機，不只是記句子喔！` — explicit test-coaching meta-comment; sounds like a cram school teacher, not a grandma. Directly opposes the brand's "溫柔陪伴" positioning.

5. **⚠️ kt-ch10-l4-ttx2** — `是分開的動詞片語` — "separable verb phrase" is university-level ELT metalanguage. An 8-year-old has no frame for "分開的動詞片語". The actual learning point (both word orders are valid) can be shown in example sentences without naming the structure.

---

## E. 3 Narrative Voice / Pacing Improvements (No Violations — Enhancement)

Even beyond the detected violations, three systemic pacing patterns could be improved:

**E1 — phrase-pairs intro "片語" → warmer label**
Current: `這四個片語都出現在灰姑娘的故事裡：`
Better: `這四個字組合起來，在故事裡都會出現喔！` — removes the ELT term 片語, still tells child they'll encounter these in the story.

**E2 — keyword-recap closers need story-hook**
Current: `tap=輕碰、gold=金色、horse=馬、end=結束——這節魔法的關鍵詞！`
Better: `tap=輕碰、gold=金色、horse=馬、end=結束——仙女手一揮，魔法快要出現了！` — ends with story tension rather than a study label.

**E3 — grammar-mc rule completeness: always end with the full story sentence**
9 of 25 grammar-mc explanationZh in Ch9-16 include a `完整句:` line (good). 16 do not. The complete-sentence anchor grounds the grammar in story context and models correct production — which is exactly what Cambridge ELT research recommends. Proposal: all grammar-mc explanationZh should end with `完整句: [sentence from story]`.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #131: X68_EXPZH_REGISTER_LINT

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Lint rule detecting test-metalanguage in `explanationZh` field (Cambridge ELT + Duolingo kids design 2026) | [Cambridge ELT minipaper](https://www.cambridge.org/us/files/4415/8594/0876/Giving_Feedback_minipaper_ONLINE.pdf) · [Duolingo blog](https://blog.duolingo.com/explain-my-answer-now-free/) | ✅ 完全適合 — Pickup 已有 validate-lessons.js lint 框架；新增 6 個 regex pattern 即可涵蓋本次全部 7 個 P0 違規 | Low (30 min) | High — 防止 content 生成時「authoring shorthand 外洩」成玩家可見的 UI 文案 | ✅ 實作 |

**具體實作說明:**

在 `tools/validate-lessons.js` 新增 `X68_EXPZH_REGISTER` lint 規則，掃描每個 question 的 `explanationZh` 欄位:

```js
// X68_EXPZH_REGISTER — detect test-metalanguage leaking into player-facing explanationZh
const EXPZH_JARGON = [
  { re: /推理[:：]/, code: 'TESTPREP_RATIOCINATE', msg: 'explanationZh 以「推理:」開頭 — authoring shorthand 外洩' },
  { re: /\(paraphrase\)/i, code: 'TESTPREP_PARAPHRASE', msg: 'explanationZh 含英文 ELT 術語 "(paraphrase)"' },
  { re: /這題要你.{0,10}推理/, code: 'TESTPREP_META_PROMPT', msg: 'explanationZh 含考試指導語「這題要你推理」' },
  { re: /動詞後面要加/, code: 'GRAMMAR_TEXTBOOK_RULE', msg: 'explanationZh 用「動詞後面要加」—應改為故事語氣示範' },
  { re: /分開的動詞片語/, code: 'GRAMMAR_TEXTBOOK_PARSING', msg: 'explanationZh 用「分開的動詞片語」—ELT jargon 超出 A2 兒童理解' },
];
```

**為什麼 High ROI:** 本次 7 個 P0 違規全部是同一個根因 — content 生成 prompt 的 authoring notation（`推理:` / `(paraphrase)` / `動詞後面要加`）在寫進 JSON 時沒有被過濾。lint rule 一旦上線，下次任何相同 notation 進入 JSON 都會在 CI 時被攔截，不需要人工審查。

**不適合改什麼:** X68 只加 lint 警告，**不修改 src/ 或 lessons-ch*.json** (per cron constraints)。content fix 需要 user 決定後手動或 batch fix 執行。
