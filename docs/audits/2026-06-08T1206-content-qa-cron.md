# Content QA — 2026-06-08 12:06 UTC

Today's angle: **#12 — explanationZh story-voice vs jargon**
Focus: **Ch8–12 deep scan · Ch8–31 corpus-wide quantification**

> Angle rationale: Ch2+ content was batch-generated in v2.0.B.118-148 autonomous loop. The v1.9.49 fix only cleaned Ch1. This audit checks whether internal QA annotations, UX layout instructions, and test-prep language leaked into the child-facing `explanationZh` field across all other chapters.

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json:   2 lint issue(s) — X2_OPTION_LIST_BIAS
WARN lessons-ch19.json:  5 lint issue(s) — X2_OPTION_LIST_BIAS
WARN lessons-ch21.json: 10 lint issue(s) — X2_OPTION_LIST_BIAS
WARN lessons-ch27.json:  8 lint issue(s) — R1_SUBSTRING + X2_OPTION_LIST_BIAS
WARN lessons-ch28.json: 12 lint issue(s) — R1_SUBSTRING + X2_OPTION_LIST_BIAS
WARN lessons-ch29.json:  7 lint issue(s)
WARN lessons-ch30.json:  9 lint issue(s) — R1_SUBSTRING + X2_OPTION_LIST_BIAS
WARN lessons-ch31.json:  8 lint issue(s) — R1_SUBSTRING + X2_OPTION_LIST_BIAS
OK   all other chapters (Ch0, Ch2-18, Ch20, Ch22-26)

Total mirror-lint issues: 65 (warn-only)
Build: PASS (no schema failures)
```

New findings vs prior audits: Ch27-31 WARN not previously flagged. R1_SUBSTRING (correct option is substring of sentence) across Ch27-31 — 6 confirmed violations.

---

## B. Violation table

| # | Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|---|----|----|------|---------|-----------|------|:------------:|
| 1 | Ch8–31 | `kt-ch*-l*-q[3–11]` × 316 | `(paraphrase)` label | `推理: own home → separate house (paraphrase)。` | Internal QA annotation — not child-facing. `(paraphrase)` is item-writing jargon. Ch1 gold standard does NOT have it. | Strip `(paraphrase)` suffix from all 316 `推理:` blocks. `推理: own home → separate house。` | No |
| 2 | Ch9 l4-q3 | `kt-ch9-l4-q3` | Compound policy tag | `推理: soft and slow → quiet and gentle (paraphrase, 不直接 verbatim)。` | `不直接 verbatim` = item-writing term. Exposes lint-rule rationale to 8-yr-old. P0 | Remove `(paraphrase, 不直接 verbatim)` → `推理: soft and slow → quiet and gentle。` | No |
| 3 | Ch10 l1-q6 | `kt-ch10-l1-q6` | Content policy label | `推理: shot the suns → made them go away (paraphrase, anti-violence)。` | `anti-violence` is content-review notation — not explanatory for child. | Remove compound tag → `推理: 射掉太陽 → 讓太陽消失。` | No |
| 4 | Ch15 l2-q8 | `kt-ch15-l2-q8` | Design-intent annotation | `推理: 沒人想被當笨蛋 → 沒人敢說空 (paraphrase, 智取設計)。` | `智取設計` = game-design note. | → `推理: 沒人想被當笨蛋 → 沒人敢說空。` | No |
| 5 | Ch21 l1-q8 | `kt-ch21-l1-q8` | Lint-rule annotation | `推理: long thin thread → 高高的絲繩 (paraphrase, X3-safe)。` | `X3-safe` = validator rule reference. Child sees this. P0 | → `推理: long thin thread → 高高的絲繩。` | No |
| 6 | Ch23 l5-q6 | `kt-ch23-l5-q6` | Urgency annotation | `推理: friend going under + time very short → 時間快沒了 (paraphrase, urgency)。` | `urgency` = item-design intent label. | → `推理: friend going under + time very short → 時間快沒了。` | No |
| 7 | Ch8–31 all q1 | `kt-ch*-l*-q1` × 217 | UX layout instruction | `本節新單字 (左中右英): …背熟這 4 個字,故事就會輕鬆聽懂。` | **Two sub-issues:** (a) `左中右英` = UI tile-layout descriptor — child doesn't know "left=ZH right=EN tile arrangement". (b) `背熟` = rote-memorize command — test-prep pressure language (contradicts brand warmth) | (a) Change `(左中右英)` → 移除或改 `(中英對照)` / drop entirely. (b) Change `背熟這 4 個字,故事就會輕鬆聽懂。` → `先認識這幾個字,奶奶的故事聽起來更順。` | No |
| 8 | Ch15 l3-q8, l4-q8 | `kt-ch15-l3-q8`, `l4-q8` | Spoiler annotation | `推理: lovely → 美麗 (paraphrase, lie 內容)。` / `推理: fine colors → 喜歡顏色 (paraphrase, lie 內容)。` | `lie 內容` = internal story-spoiler annotation. Child hasn't read ahead. | → strip `(paraphrase, lie 內容)` | No |
| 9 | Ch23 l3-q6 | `kt-ch23-l3-q6` | Child-safety annotation | `推理: water closed over head + could not breathe → 正在下沉 (paraphrase, 兒童 friendly framing)。` | `兒童 friendly framing` = internal content-safety note exposed to player. | → `推理: water closed over head + could not breathe → 正在下沉。` | No |
| 10 | Ch27-31 | `kt-ch27-l6-q3`, `kt-ch28-l3-q5`, `kt-ch30-l7-q3`, `kt-ch31-l1-q8` etc. | R1_SUBSTRING (validate.js) | `only his head and one arm` / `soft and slow` / `a paper with old writing` / `in a tall stone castle` | Correct option is literal substring of sentence — A7/A1 give-away. R1 violation in 6 Q (Ch27-31). | Paraphrase correct options for these 6 Q | Yes (if MP3 exists for correct option) |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total `explanationZh` fields in corpus | 2,472 |
| With `(paraphrase)` standalone suffix | **316** |
| With compound `(paraphrase, …)` tag | **29** |
| Total `推理:` blocks with jargon annotation | **345 / 2,472 (14%)** |
| With UX-layout instruction `(左中右英)` | **217** (1 per lesson, all chapters) |
| With test-prep `背熟` | **217** (co-located with above) |
| Chapters with zero `(paraphrase)` | Ch0, Ch1, Ch2, Ch3, Ch4, Ch5, Ch6, Ch7, Ch19, Ch20 |
| Chapters worst affected | Ch25-31 (15-21 per chapter) |
| validate-lessons WARN chapters | 8 (Ch1, 19, 21, 27-31) |
| New R1_SUBSTRING violations (Ch27-31) | 6 |

---

## D. Top 5 P0

### P0-1 ★★★ `(paraphrase)` suffix — 316 child-visible instances
**File/line:** `public/lessons-ch*.json` — every 推理: block in Ch8-Ch31 (Ch2-7 clean, Ch1 clean)
**Issue:** The string `(paraphrase)` appears at the end of every inference-style `explanationZh` across 22+ chapters. This is item-writing vocabulary from the QA pipeline (confirming the correct option is a paraphrase, not verbatim). A 9-year-old reads: *"推理: own home → separate house (paraphrase)。"* — the annotation is meaningless and jarring.
**Fix:** Strip ` (paraphrase)` suffix from all 316 instances. Ch1 gold standard (post-v1.9.49) never had this.
**Scope:** M (requires a json-transform script touching all Ch8-31 files, but zero logic change — pure text strip)
**Audio regen:** No

### P0-2 ★★★ Compound policy tags (29 instances) — worst 5 examples
**Worst cases:**
- `kt-ch10-l1-q6`: `(paraphrase, anti-violence)` — content review note
- `kt-ch9-l4-q3`: `(paraphrase, 不直接 verbatim)` — lint jargon
- `kt-ch21-l1-q8`: `(paraphrase, X3-safe)` — validator rule exposed
- `kt-ch15-l5-q3`: `(paraphrase, 沒實物)` — internal story annotation
- `kt-ch23-l3-q6`: `(paraphrase, 兒童 friendly framing)` — meta-label for child-safety decision, seen by child
**Fix:** Strip full `(paraphrase, …)` compound tags from 29 instances.
**Scope:** S (29 targeted edits, can be done with regex in same batch as P0-1)
**Audio regen:** No

### P0-3 ★★ `(左中右英)` UX tile-layout instruction — 217 instances
**File:** `public/lessons-ch*.json` — every lesson's q1 tap-pairs `explanationZh`
**Issue:** "左中右英" describes the internal UI arrangement of tiles (left column = Chinese, right = English). This is implementation detail. An 8-year-old or their parent reading this is confused — "左中右英" is not a Chinese word or story concept.
**Fix:** Remove `(左中右英)` from heading OR change to neutral `(中英對照)`. The heading becomes: `本節新單字 (中英對照):`
**Scope:** S-M (template string change — all q1 in Ch0-31)
**Audio regen:** No

### P0-4 ★★ `背熟這 4 個字` rote-memorize command — 217 instances
**File:** same as P0-3 — co-located in every lesson q1
**Issue:** `背熟` (commit to memory by rote) is classroom/test-prep Chinese. Contradicts brand voice: warmth, no pressure, grandma storytelling. Per CLAUDE.md: "不焦慮、不打擊、不催促". A gentler invitation fits better.
**Current:** `背熟這 4 個字,故事就會輕鬆聽懂。`
**Better:** `先認識這幾個字,奶奶的故事聽起來更順。`  (Grandma frame + no memorization pressure)
**Scope:** S (single template string replacement across all q1)
**Audio regen:** No

### P0-5 ★★ New R1_SUBSTRING violations in Ch27-31 — 6 Q
**Files:** `public/lessons-ch27-31.json`
**Confirmed:** `kt-ch27-l6-q3` ("only his head and one arm"), `kt-ch28-l3-q5` ("soft and slow"), `kt-ch30-l7-q3` ("a paper with old writing"), `kt-ch31-l1-q8` ("in a tall stone castle"), `kt-ch31-l4-q3` ("on Robin's front door"), `kt-ch27-l5-q3` ("a giant hand of stone")
**Issue:** Correct answer is verbatim substring of the sentence — learner can find answer by keyword matching without comprehension.
**Fix:** Paraphrase correct options (synonym / hypernym / nominalisation per R1 spec)
**Scope:** S (6 targeted Q rewrites)
**Audio regen:** Only if pre-recorded MP3 exists for these options — check `public/audio/lessons-ch27-31/` first

---

## E. Narrative voice improvements (3 regardless of violations)

Even without rule violations, these explanationZh blocks miss warmth:

1. **Tap-pairs q1 invitation text** — the entire `本節新單字:…背熟這 4 個字` block reads like a flashcard deck header, not a story entry. Better framing: lead with the story beat, not a vocabulary list command. Example: `奶奶今晚故事裡的關鍵字:` (grandma's keywords for tonight's story).

2. **推理: arrow notation readability for 8-yr-olds** — `推理: own home → separate house。` — the `→` shorthand is clear for adults but may read as an arrow symbol to younger learners. Minor: could soft-wrap as `推理: "own home" 換個說法 → "separate house"。` to make the paraphrase relationship explicit in a child-friendly way.

3. **Positive reinforcement missing from 推理: blocks** — inference questions are harder. Ch1 gold standard (q4, q6) ends inference blocks with "→ 答 No" / "→ 答 Yes" giving the verdict. Many Ch8+ blocks omit the verdict directive: `推理: 漂亮衣服 + 手很軟 → 輕鬆又富有的生活。` — child doesn't know if this means Yes or No. Consider adding `→ 答 Yes/No` suffix back for Yes/No inference questions.
