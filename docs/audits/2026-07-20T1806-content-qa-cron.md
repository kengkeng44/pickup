# Content QA — 2026-07-20 18:06 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (option translation accuracy, register, metalanguage exposure)
**Focus:** Ch17–24 (Tsuru no Ongaeshi / Heungbu & Nolbu / Tortoise & Hare ext. / Giant Turnip / Anansi / Mulan / Sima Guang / Kong Rong)
**Scored questions analysed:** 405 optionsZh entries across Ch17–24 (all question types)
**Academic backing:**
- Krashen (1985) *The Input Hypothesis*: Metalinguistic labels (第三人稱、過去分詞) spike cognitive load and switch the learner from L2 processing to L1 procedural reasoning — incompatible with comprehensible-input acquisition.
- Ellis (2009) "Implicit/explicit knowledge and SLA": Grammar metalanguage in answer options rewards metalinguistic test-wisdom, not genuine grammatical competence — inflates construct-irrelevant variance.
- Nation & Newton (2009) *Teaching ESL/EFL Listening and Speaking*: Answer options in L1 should reflect the learner's natural L1 equivalents, not grammatical terminology; jargon labels are inappropriate below CEFR B1 (Taiwan ages 12+).
- Duolingo Content Design 2025 (blog.duolingo.com): Grammar tips are presented in *separate* "Tip" screens; the answer options themselves show only natural target-language forms — metalanguage is *never* exposed inside MCQ options.
- PMC 2025 (ncbi.nlm.nih.gov/pmc/articles/PMC11911725/): Automated lint detects option-metalanguage as a category-1 answer-tell flaw — selecting "過去式" for a past-tense story context is solvable without L2 knowledge.

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
WARN ch17–ch24: X2/X49/X49B/X57 known patterns (see prior audits)
Build gate: PASS (tsc + vite)
No schema errors.
```

No new schema breakage. Known lint issues unchanged from baseline 440.

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 20 | `kt-ch20-l2-gm1` | grammar-mc | optionsZh: `["pull","pulls","pulling","pulled"]` | **P0 X183 — Raw English, zero Chinese annotation** in all 4 optionsZh; child sees same text twice (en = zh) with no zh support | Change to `["拉（原形）","他拉（第三人稱）","正在拉","拉了"]` → or better, use natural narrative: `["拉","他拉","正在拉","拉了"]` | No |
| 23 | `kt-ch23-l4-x6` | grammar-mc | optionsZh: `["run","ran (過去式)","runs","running"]` | **P0 X183B — 3 of 4 raw English**; only "ran (過去式)" has any zh; inconsistent partial annotation reveals answer by contrast | Apply uniform natural narrative style: `["跑","跑了","他跑","正在跑"]` | No |
| 24 | `kt-ch24-l4-x8` | grammar-mc | optionsZh: `["take","took (過去式)","takes","taking"]` | **P0 X183C — 3 of 4 raw English**; same partial-annotation answer-tell as X183B | Apply uniform: `["拿","拿了","他拿","正在拿"]` | No |
| 17 | `kt-ch17-l2-gm1` | grammar-mc | optionsZh: `["是（現在式）","是們（複數現在）","是（過去式單數）","是們（複數過去）"]` | **P1 X184 — Grammar jargon (現在式/複數/過去式/單數) in options visible to 8-year-olds**; "是們" is not a Chinese word (invented); jargon creates answer-tell for test-wise child | Remove jargon. Use natural equivalents: `["是","都是","是（過去）","都是（過去）"]`; explanationZh already explains was/were | No |
| 18 | `kt-ch18-l2-gm1` | grammar-mc | optionsZh: `["來（原形）","來了（過去式）","正在來（進行式）","來（第三人稱現在）"]` | **P1 X184 — Jargon (原形/過去式/進行式/第三人稱現在)** visible to children | Natural: `["來","來了","正在來","他來"]`; jargon stays in explanationZh only | No |
| 19 | `kt-ch19-l2-gm1` | grammar-mc | optionsZh: `["看到了（過去式）","看（原形）","看（第三人稱現在式）","看過（過去分詞）"]` | **P1 X184 — 過去分詞 is junior-high-level metalanguage** (age 12+ Taiwan curriculum); inappropriate for 8-year-old primary ELT | Natural: `["看到了","看","他看","看過了"]` | No |
| 21 | `kt-ch21-l2-gm1` | grammar-mc | optionsZh: `["織（原形）","正在織","織了（過去式）","織（第三人稱）"]` | **P1 X184 — partial jargon** (原形/過去式/第三人稱) mixed with natural 正在織; inconsistent style within same set | Normalise: `["織","正在織","織了","她織"]`; remove parenthetical jargon tags | No |
| 22 | `kt-ch22-l2-gm1` | grammar-mc | optionsZh: `["搬（原形）","搬了（過去式）","搬（第三人稱現在式）","搬（進行式）"]` | **P1 X184 — full jargon set**; same issue as Ch18 | Natural: `["搬","搬了","他搬","正在搬"]` | No |
| 23 | `kt-ch23-l2-gm1` | grammar-mc | optionsZh: `["throw（原形）","throws（第三人稱現在式）","threw（過去式）","throwing（進行式）"]` | **P1 X184+X183 hybrid — mixed raw English stems + zh jargon labels**; worst case of style C | Natural: `["丟","他丟","丟了","正在丟"]` | No |
| 24 | `kt-ch24-l2-gm1` | grammar-mc | optionsZh: `["拿(現在,第三人稱)","拿(原形)","拿(過去)","拿(進行)"]` | **P1 X184 — lighter jargon but still 現在/原形/過去/進行 in options**; partially natural (good: 拿) | Natural: `["他拿","拿","拿了","正在拿"]`; drop parenthetical tags | No |
| 21 | `kt-ch21-l1-pm1` | picture-mc | optionsZh[0]: `"一隻蜘蛛從絲線上垂向上方"` | **P2 X186 — Contradictory zh**: 垂 = hang downward; 向上方 = upward — semantically impossible image | Rewrite: `"一隻蜘蛛沿著蜘蛛絲往上爬"` (matches EN "dangling from a thread") | No |
| 17 | `kt-ch17-l2-gm1` | grammar-mc | optionsZh: `"是們（複數現在）"` for `are` | **P2 X187 — 是們 is not a Chinese word** (invented morphemic compound); will confuse any child literate in Chinese | Correct: "都是" or simply "是" (plural in Chinese = same verb, no inflection) | No |

---

## C. Stats

| Category | Count | Severity |
|----------|-------|----------|
| P0 Raw English in optionsZh (zero zh) | 3 questions (10 option slots) | Critical |
| P1 Grammar jargon exposed to children | 9 grammar-mc questions | Major |
| P2 Incorrect/contradictory zh translation | 2 items | Moderate |
| P3 CALQUE_NEAR (picture-mc ending awkwardly in 旁) | 2 items | Minor |
| P3 ADULT_REGISTER (年長者 → 比他年長的人) | 1 item | Minor |
| Style inconsistency (3 incompatible grammar-mc styles) | Systemic | Moderate |

**Total grammar-mc questions with optionsZh issues:** 10 of 10 across Ch17–24 (100% hit rate)

Breakdown of 3 styles found in grammar-mc optionsZh:
- **Style A** (Ch17–19, 21–22): `動詞（語法術語）` — jargon labels in parentheses (e.g. 看（原形）)
- **Style B** (Ch23–24 partial): raw English stems + minimal partial zh annotation (e.g. `run` / `ran (過去式)`)
- **Style C** (Ch20): fully raw English — no zh at all

Recommended canonical style: **Natural narrative Chinese** — `動詞/他動詞/動詞了/正在動詞` — no parenthetical metalanguage. Metalanguage stays in `explanationZh` only (where it already exists for most questions).

---

## D. Top 5 P0

1. ⚠️ **Ch20 `kt-ch20-l2-gm1` — all optionsZh = raw English** — child who cannot read English sees no help whatsoever; zh support completely absent
2. ⚠️ **Ch23 `kt-ch23-l2-gm1` — raw English stems + zh jargon hybrid** — worst-of-both-worlds: child reads `throw（原形）` with neither a meaningful zh word nor a learnable zh explanation
3. ⚠️ **Ch23 `kt-ch23-l4-x6` / Ch24 `kt-ch24-l4-x8` — partial annotation creates answer-tell** — only the past-tense option has `（過去式）` annotation; story context is past → child can solve without reading English
4. ⚠️ **Ch17 `kt-ch17-l2-gm1` "是們"** — invented word. A literate child will be confused by seeing a non-existent Chinese compound; trust damage to the app's zh-TW accuracy
5. ⚠️ **Ch19 `kt-ch19-l2-gm1` "看過（過去分詞）"** — 過去分詞 is taught in Taiwan grade 7 (age 12–13); exposing it to 8-year-olds is curriculum-misaligned and an answer-tell for any child with older siblings

---

## E. Narrative Voice / Pacing Improvements (3 always required)

1. **Ch18 `kt-ch18-l3-x5` ZH option [3]**: `"輕輕的用手"` for EN `"gently with great care"` — drops "great care" nuance; natural child zh: `"小心翼翼地用手撿起"` or `"輕輕地、小心地拿起"`. Current zh collapses three other options similarly — set lacks tactile/emotional contrast.

2. **Ch19 `kt-ch19-l3-x3` ZH option [2]**: `"無緣無故感到開心"` for EN `"felt happy about nothing"` — 無緣無故 is an adult four-character idiom (成語) inappropriate for 8-year-olds. Child-register: `"莫名其妙就開心起來"` or `"高興個沒來由"`.

3. **Ch21 `kt-ch21-l2-pm1` ZH option [1]**: `"一個強大的人物高坐在雲端之上"` for EN `"a powerful figure sitting high above the clouds"` — 強大的人物 is bureaucratic/neutral. Anansi story warrants more vivid child zh: `"一個威嚴的天神高坐在雲端"` — matches story register and is memorable.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #183: X183_OPTIONSZH_GRAMMAR_MC_NATURALNESS**

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Grammar-mc optionsZh should use **natural narrative Chinese** (拉了 / 正在拉) never metalanguage jargon (過去式/第三人稱) or raw English | Duolingo 2025 (blog.duolingo.com/how-duolingo-teaches-english/): grammar tips are separate Tip screens; option texts are always natural forms. Nation & Newton 2009: L1 option translations must be natural L1 equivalents, not meta-labels. PMC 2025 (ncbi.nlm.nih.gov/pmc/articles/PMC11911725/): metalanguage-in-option is category-1 answer-tell flaw. | ✅ 完全適合 — Pickup grammar-mc的 optionsZh 目前有三種不一致風格 (Style A/B/C), 10/10 grammar-mc 問題受影響。修法: 將 `explanationZh` 中已有的語法解說保留, 把 optionsZh 改為自然敘事中文 (拉/拉了/正在拉/他拉)。只動 `public/lessons-ch17..24.json` 中 grammar-mc 的 optionsZh 欄位。完全不動 src/. | Low (JSON-only edit, ~10 grammar-mc across Ch17–24, ~40 option strings) | High — eliminates answer-tell for all 10 grammar-mc in Ch17–24 + ages-appropriate for 8-year-old primary ELT target audience | ✅ 建議實作 |

**實作指引:**

Canonical natural-narrative style for grammar-mc optionsZh:
```json
// Before (Style A jargon — Ch19):
"optionsZh": ["看到了（過去式）","看（原形）","看（第三人稱現在式）","看過（過去分詞）"]

// After (natural narrative):
"optionsZh": ["看到了","看","他看","看過了"]

// Before (Style C raw English — Ch20):
"optionsZh": ["pull","pulls","pulling","pulled"]

// After (natural narrative):
"optionsZh": ["拉","他拉","正在拉","拉了"]
```

Rule: `explanationZh` may keep all grammar metalanguage (過去式、第三人稱 etc.) since it appears *after* the child has committed to an answer. `optionsZh` must be natural child-register Chinese only — no parenthetical jargon, no raw English.

Secondary fix (same JSON pass): `kt-ch17-l2-gm1` — replace invented "是們" with "都是" (for "are"). `kt-ch21-l1-pm1` — fix contradictory "垂向上方" → "往上爬".
