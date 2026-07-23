# Content QA — 2026-07-23 12:06 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (Chinese option label quality & consistency)
**Focus chapters:** Ch9-16 (Cinderella / Hou Yi / Zhinu Weaver / Red Riding Hood / Mulan / Trojan Horse / Rapunzel)
**Previous angles (last 8):** A5 (Ch17-24), A7 (Ch1-8), A2 (Ch9-16), A3 (Ch25-32), #12 (Ch1-8), A4 (Ch9-16), A1 (Ch17-24), R2 (Ch25-32)

> **Angle rationale:** `optionsZh` is the Chinese label shown beside each multiple-choice option for zh-TW players. Quality means: (a) accurate translation of the English option meaning, (b) appropriate grammatical scaffolding labels for grammar-mc, (c) child-appropriate vocabulary (8-12 age band), (d) no code-switching artifacts (English words embedded in zh labels), (e) consistency of Pattern A / B / C across chapters. This angle has not been run in the last 8 cron cycles.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440
(warn-only; MIRROR_LINT_STRICT=1 to fail build)
Build status: PASS

Notable existing issues in Ch9-16:
  Ch9 ×4  X2/X49/X57
  Ch10 ×4  X2/X49/X57 (similar pattern)
New optionsZh issues surface below; none are schema-breaking.
```

---

## B. optionsZh Pattern Classification

Three patterns found across grammar-mc questions in Ch9-16:

| Pattern | Format example | Count | Quality |
|---------|----------------|-------|---------|
| A — Chinese meaning + label | `"射了（過去式）"` | 11 Qs | ✅ Best — meaning + grammar |
| B — English word + label | `"danced（過去式）"` | 17 Qs | 🟡 Acceptable but inferior |
| C — Label only, no meaning | `"過去式"` | 6 Qs | ❌ Highest cognitive load for children |

Pattern A examples (good): Ch11 `kt-ch11-l2-gm1` (`"射（原形）"/"射了（過去式）"`), Ch14 `kt-ch14-l2-gm1` (`"帶（原形）"/"帶了（過去式）"`), Ch15 `kt-ch15-l2-gm1` (`"穿（原形）"/"穿了（過去式）"`)

Pattern B cluster (inferior): Ch9 `kt-ch9-l2-gm1`, `kt-ch9-l4-x5`; Ch11 `kt-ch11-l3-x5`, `kt-ch11-l5-x5`; Ch12 `kt-ch12-l3-x8` through `kt-ch12-l7-gm2`; Ch13 `kt-ch13-l2-gm1` through `kt-ch13-l7-x8` (11 Qs in Ch12-13 alone)

Pattern C cluster (worst): Ch14 `kt-ch14-l3-x4`, `kt-ch14-l7-x4`; Ch15 `kt-ch15-l5-x3`; Ch16 `kt-ch16-l2-gm1`, `kt-ch16-l5-x4`

---

## C. Violation Table

### C1. P0 — Critical (factual error in optionsZh)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 13 | kt-ch13-l5-x8 | grammar-mc | sentence: `The wolf ___ on grandma's sleeping cap.` opts_en: `["to put","puts","putting","put"]` opts_zh slot[0]: `"puted（不存在）"` | **X210_OPTSZH_FACTUAL_ERROR**: The zh label `puted（不存在）` does NOT correspond to the English option `"to put"` (infinitive). Learner sees `"to put"` but zh says `"puted"` — a non-existent form never shown in the options. Confuses instead of scaffolds. ExplanationZh correctly teaches that `put` stays unchanged in past tense, but the optionsZh contradiction undermines it. | Replace slot[0] zh: `"to put（用 'to' 的句型）"` or simpler: `"不定詞 to put（不是時態選項）"`. Cleaner: make option[0] `"putted"` (a plausible wrong guess) with zh `"putted（不存在）"` matching the intent of the explanationZh. | No |
| 14 | kt-ch14-l3-x4 | grammar-mc | sentence: `The star ___ Rapunzel down to the ground.` opts_en: `["lead","led","leads","leading"]` opts_zh slot[2]: `"leads" → "錯誤形"` | **X211_OPTSZH_FALSE_LABEL**: `"leads"` IS a valid English verb form (3rd-person singular present). Labeling it `"錯誤形"` (incorrect form) is factually wrong — it's only wrong for this specific blank. Child may internalize that `"leads"` is an invalid English word. | Replace: `"leads（現在第三人稱，但不合故事時態）"` — makes clear it's a real form, just wrong tense choice here. | No |

### C2. P1 — High (Pattern inconsistency / child-register mismatch)

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| 9 | kt-ch9-l2-gm1 | grammar-mc | opts_zh: `["dances（第三人稱現在）","dance（現在原形）","dancing（現在分詞）","danced（過去式）"]` | **X212_PATTERN_B**: English word first, zh label appended. For 8-12 child who doesn't know "dance" (unlikely here, but pattern is inconsistent), meaning is absent. 15 more Ch9-13 Qs same pattern. | Upgrade to Pattern A: `["現在式/別人做（dances）","原形（dance）","進行中（dancing）","過去做了（danced）"]`. Simplest at A2: `"跳（原形）"/"跳了（過去式）"` etc. | No |
| 14 | kt-ch14-l3-x4 | grammar-mc | opts_zh: `["原形","過去式","錯誤形","進行式"]` | **X213_PATTERN_C**: Grammar label only, no English word, no Chinese meaning. `"原形"/"過去式"` are adult grammatical terms — research (Frontiers 2026) shows they increase cognitive load for 8-12 learners versus meaning-first labels. | Upgrade: `"帶（原形）"/"帶了（過去式）"/"帶（現在第三人稱）"/"正在帶（進行式）"` | No |
| 16 | kt-ch16-l2-gm1 | grammar-mc | opts_en: `["was","is","am","be"]` opts_zh: `["第三人稱過去式","第三人稱現在式","第一人稱現在式","原形"]` | **X213_PATTERN_C** + **X214_REGISTER_MISMATCH**: `"第三人稱"` is adult register metalanguage. For common copula `be`, 8-12 children in zh-TW EFL context may not know `"第三人稱"`. Also: `"was"` for `"第三人稱過去式"` ignores that `"was"` also covers 1st-person singular. | Pattern A: `"was（以前是）"/"is（現在是）"/"am（我是）"/"be（原形）"` | No |
| 9, 10, 11, 12, 13 | all listen-tf | listen-tf | opts_en: `["Yes","No"]` opts_zh: none | **X215_LISTEN_TF_NO_ZH**: All 120 listen-tf questions across Ch9-16 have no `optionsZh`. "Yes/No" are likely intentionally left as-is given universal recognizability. However not documented as intentional, and zh-TW interface players see `["Yes","No"]` with no zh scaffold when language=zh set. | Low-priority: add `optionsZh: ["是","否"]` to all listen-tf questions systematically (1 global pass). Or document as intentional exception in schema comment. | No |

### C3. P2 — Medium (narrative voice improvements, no zero-violation bypass)

| Ch | Q ID | type | issue | 改善 |
|----|------|------|-------|------|
| 13 | kt-ch13-l2-gm1 | grammar-mc | opts_zh: `["run（原形）","runs（現在第三人稱）","running（進行式）","ran（過去式）"]` — Pattern B with `"第三人稱"` register | Simplify: `"跑（原形）"/"跑（別人做）"/"跑（現在進行）"/"跑了（過去）"` — "別人做" is child-friendlier than "第三人稱" |
| 12 | kt-ch12-l2-gm1 | grammar-mc | opts_zh Pattern A with `"織（過去式）"` for "weaved" — but "weaved" is irregular (past is "wove"), explanationZh correctly says "weaves" is answer. Zh option labels don't hint at whether a form is irregular. | For irregular verbs add note: `"織了（過去式，用 wove）"` in explanationZh |
| All | — | — | Grammar label "現在分詞" vs "進行式" are used interchangeably in different chapters. | Pick one and standardize: `"進行式"` is more child-friendly than `"現在分詞"` |

---

## D. Stats

| Metric | Value |
|--------|-------|
| Ch9-16 listen-mc questions with opts_en | 323 |
| Ch9-16 listen-mc with optionsZh | 206 (64%) |
| Ch9-16 listen-mc missing optionsZh | 117 (36%) — mostly listen-tf Yes/No |
| Grammar-mc Qs with opts_zh, Ch9-16 | 34 |
| Pattern A (ideal) | 11 (32%) |
| Pattern B (code-switch) | 17 (50%) |
| Pattern C (label-only) | 6 (18%) |
| P0 factual errors | 2 |
| P1 pattern/register violations | 5 clusters |
| listen-tf no optionsZh (systemic) | ~120 Qs |

---

## E. Top 5 P0

| Priority | ID | Issue |
|----------|----|-------|
| ⚠️ P0 | kt-ch13-l5-x8 | `"puted（不存在）"` zh label does not correspond to `"to put"` en option — factual mismatch |
| ⚠️ P0 | kt-ch14-l3-x4 slot[2] | `"leads" → "錯誤形"` — leads IS a valid English form, falsely labeled as nonexistent |
| ⚠️ P1 | Ch12-13 grammar-mc (11 Qs) | Pattern B cluster: English-first in optionsZh, inconsistent with Pattern A in Ch11/14/15 |
| ⚠️ P1 | kt-ch16-l2-gm1 | Pattern C + adult register metalanguage for common `be` copula verb question |
| ⚠️ P2 | All listen-tf (120 Qs) | Systemic missing optionsZh for `["Yes","No"]` — undocumented exception |

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Research synthesis

**Frontiers in Education 2026** (translanguaging as metacognitive scaffold, May 2026):
Pedagogical translanguaging functions as a *safety net* — L1 labels in grammar options reduce cognitive load and help 8-12 learners integrate new English structures into existing linguistic schemas. The consensus: for young EFL learners, showing meaning in L1 first (Pattern A) before the grammatical label has highest pedagogical return.

**TESL-EJ 2026** (scaffolding strategies in EFL classrooms):
Research confirms translanguaging scaffolding guides students to "compare English structures with their equivalents in their L1, integrating new grammatical forms into existing schemas." Options that show L1 meaning (Pattern A) outperform pure-grammar-label options (Pattern C) for comprehension and retention.

**Cambridge Language Teaching 2026** (translanguaging in secondary EFL, systematic review 2023-2025):
Pattern A (`meaning (label)`) reduces extraneous cognitive load; Pattern C (label-only) forces learners to first recall the meaning of unfamiliar technical terms before they can process the grammatical choice — double cognitive load for 8-12 children.

**Babbel 2026**: Uses native-language framing in all grammar explanations — courses are "designed using your native language in mind." Their grammar exercises use L1 meaning before grammatical labels in option scaffolds.

**Pickup 適配 verdict:**

| Pattern | Pickup ch status | Research verdict | Action |
|---------|-----------------|-----------------|--------|
| A: `"射了（過去式）"` | 11 Qs (Ch11/14/15) | ✅ Industry best practice | Keep & extend |
| B: `"danced（過去式）"` | 17 Qs (Ch9/11-13) | 🟡 Acceptable for known vocab; inferior for new words | Upgrade to A |
| C: `"過去式"` (label only) | 6 Qs (Ch14-16) | ❌ Highest cognitive load, not recommended for 8-12 | Upgrade to A |

### ARCH-REC #194: X194_GRAMMAR_MC_OPTSZH_STANDARDIZE

**Pattern:** Standardize all grammar-mc `optionsZh` to Pattern A format — `"[Chinese meaning of verb]（[child-friendly tense label]）"`

**Pickup implementation:**
- Scan `lessons-ch{N}.json` grammar-mc questions for Pattern B/C
- Rewrite optionsZh slot: `"走了（過去式）"` / `"走（原形）"` / `"走（別人做）"` / `"正在走（進行式）"`
- For irregular verbs where L2 form and zh meaning differ: `"離開了（過去式，用 left 不用 leaved）"`
- Replace `"第三人稱現在式"` with `"別人做"` throughout (child register)
- Fix 2 P0 factual errors (kt-ch13-l5-x8, kt-ch14-l3-x4) as first pass
- Full standardization: 23 Qs across Ch9-16 need upgrading

**Effort:** Medium (23 JSON edits, no code change, no audio regen)
**ROI:** High — improves grammar-mc effectiveness for 8-12 children; aligns all 8 chapters to same standard; removes 2 factual errors that could cause learner confusion

**Sources:**
- [Frontiers in Education 2026 — Translanguaging as metacognitive scaffold](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1712765/full)
- [TESL-EJ 2026 — Scaffolding Strategies in EFL Classrooms](https://tesl-ej.org/wordpress/issues/volume29/ej115/ej115a3/)
- [Cambridge Language Teaching 2026 — Pedagogical translanguaging systematic review](https://www.cambridge.org/core/journals/language-teaching/article/pedagogical-translanguaging-in-secondary-efl-a-systematic-review-of-practice-and-teacher-development-20232025/8B818850DD72146F3E04161F8CC2ED48)
- [Babbel 2026 native-language grammar design](https://www.babbel.com/babbel-review)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Pattern A: L1-meaning-first grammar labels | Frontiers 2026 / Cambridge LT 2026 / Babbel | ✅ Full — 11 Qs already use it; 23 need upgrade. No schema change, JSON-only fix. | Medium (23 JSON edits) | High — removes cognitive load for 8-12 children, removes 2 P0 factual errors | ✅ Implement |
| Simplify grammatical metalanguage (`"別人做"` > `"第三人稱"`) | TESL-EJ 2026 child-register scaffolding | ✅ Full — trivial string replace inside same optionsZh fields | Low (find+replace in JSON) | Medium — improves child accessibility of grammar labels | ✅ Implement with A |
