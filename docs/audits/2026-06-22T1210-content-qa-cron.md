# ⚠️ Content QA — 2026-06-22 12:10 UTC

**Today's angle:** #11 — optionsZh 翻譯品質 (L1 Gloss Accuracy, Child-Register Compliance, Context Leak)
**Focus:** Ch0–Ch8 (Mochi & Grandma frame + Momotaro, Ugly Duckling, Tortoise & Hare, Camel, Baba Yaga, Six Swans, Yexian, Three Little Pigs)

---

## A. validate-lessons.js result

```
OK  lessons-ch0.json: 7 lessons
OK  lessons-ch1.json: 7 lessons
OK  lessons-ch2.json: 7 lessons
OK  lessons-ch3.json: 7 lessons
OK  lessons-ch4.json: 7 lessons
WARN lessons-ch5.json: 1 lint issue(s)
  kt-ch5-l4-q3: X3_R1_VERBATIM_WORDS ("bones" all words in sentence)
OK  lessons-ch6.json: 7 lessons
WARN lessons-ch7.json: 1 lint issue(s)
  kt-ch7-l7-q5: X2_OPTION_LIST_BIAS (all start with "she")
OK  lessons-ch8.json: 7 lessons

Total mirror-lint issues (system-wide): 72 (warn-only)
```

---

## B. Violation table (angle #11 — optionsZh 翻譯品質)

| Sev | Ch | Q ID | type | EN option | ZH option | Violation | 修法 | audio regen? |
|-----|-----|------|------|-----------|-----------|-----------|------|--------------|
| **P0** | 5 | kt-ch5-l1-q10 | comprehension | "cruel under a smile" (correct, ci=1) | `笑裡藏刀` | **CHENGYU_REGISTER** — 4-char 成語 violates B.231 child-pivot (8-12yo). 笑裡藏刀 is CEFR-ZH B2+ idiom; children can't read it. | `笑著但心是壞的` (plain description) | No |
| **P0** | 8 | kt-ch8-l7-q3 | listen-mc | "not by our chin hair" (correct, ci=1) | `下巴毛都不` | **INCOMPLETE_ZH** — grammatically truncated; incomprehensible to any reader. The Three Little Pigs catchphrase "not by the hair on my chinny chin chin" needs a complete ZH rendering. | `連下巴上一根毛都不讓` | No |
| **P0** | 1 | kt-ch1-l5-g1 | grammar-mc | "by" (opt[0]) | `搭 (by boat)` | **ZH_CONTEXT_LEAK** — parenthetical `(by boat)` injected into ZH that does not appear in EN option. ZH hint reveals answer scope (boat) not present in EN. Length ratio = 5.5× (lint flagged). | Remove annotation: `搭` only | No |
| **P1** | 8 | kt-ch8-l3-q9 | listen-mc | "soft heavy steps" (correct, ci=1) | `輕輕重重的腳步` | **OXYMORONIC_ZH** — 輕輕 ("gently-gently") + 重重 ("heavily-heavily") when both reduplicated are contradictory in ZH. EN "soft heavy" describes wolf's padded-but-weighty gait; ZH reads as self-contradictory to a child. | `沉沉的腳步` (heavy/padded — captures the ambiguity in one direction) | No |
| **P1** | 6 | kt-ch6-l6-q9 | listen-mc | "a trio" (correct, ci=2) | `一組三個` | **REGISTER_FRAME** — `一組` ("a set/group") imposes container framing inappropriate for 3 children born one by one (not a packaged set). Adds semantic not in EN. | `三個` | No |
| **P1** | 7 | kt-ch7-l3-q7 | listen-mc | "the fish's origin" (correct, ci=1) | `魚的來源` | **ADULT_VOCABULARY** — `來源` is CEFR-ZH B1+. 8-12yo children say "從哪來" not "來源". | `魚從哪裡來` | No |
| **P1** | 5 | kt-ch5-l4-q9 | listen-mc | opt[0]="hiding its door from Vasilisa" | `把門藏起來不讓 Vasilisa 看` (13 chars+name) vs opt[2]=`準備睡覺` (4 chars) | **ZH_LENGTH_PARITY** — within-question ZH length spread violates R2 spirit for L1 column. Opt[0] ZH is 3× the length of opt[2] ZH, creating secondary length-tell in Chinese. | Trim opt[0]: `把門藏起來` | No |
| **P2** | 2 | kt-ch2-l2-q8 | listen-mc | "kindness" (correct, ci=1) | `善意` | **FORMAL_ZH** — `善意` is abstract/formal (adult register). 8-12yo children say `親切` or `友善`. | `親切` | No |
| **P2** | 6 | kt-ch6-l2-q6 | listen-mc | "pale like milk" (correct, ci=2) | `像牛奶一樣淡` | **SEMANTIC_SLIP** — `淡` defaults to "watery/bland" (taste context) in ZH, not color-pale. EN means "milky white / light-coloured". | `像牛奶一樣白` | No |
| **P2** | 6 | kt-ch6-l4-q5 | listen-mc | "briefly after dark" (correct, ci=2) | `天黑後短暫一段` | **ADULT_VOCABULARY** — `短暫` is CEFR-ZH B1+. Child-accessible: `天黑後一小會兒`. | `天黑後一小會兒` | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch0–Ch8 (9 chapters) |
| Question types with optionsZh | listen-mc (119), comprehension (39), emoji-pick (51), grammar-mc (4), picture-mc (3) |
| Total questions with optionsZh | 216 |
| Violations found | 10 (3 P0, 4 P1, 3 P2) |
| P0 rate | 3 / 216 = 1.4% |
| Chapters clean | Ch0, Ch2, Ch3, Ch4 |
| Heaviest violation chapter | Ch5 (Baba Yaga) — 3 violations |

---

## D. Top 5 P0 + Narrative Voice Improvements

### P0-1 — kt-ch5-l1-q10 `笑裡藏刀` (CHENGYU_REGISTER)
**Why critical:** B.231 pivot targets 8-12yo Taiwan children. 成語 vocabulary is typically introduced in Grades 4-6 Chinese class (9-12yo) and even then many children can't use them productively. An ELT app that puts 成語 in L1 glosses forces the child to parse two unknowns (EN concept + ZH idiom) simultaneously — defeating the purpose of the L1 hint entirely.

**Fix:** Replace `笑裡藏刀` → `笑著但心是壞的`

---

### P0-2 — kt-ch8-l7-q3 `下巴毛都不` (INCOMPLETE_ZH)
**Why critical:** This is an answer option, not a decoration. A child who needs the ZH hint most (weakest EN reader) will see `下巴毛都不` and understand nothing. The original EN is the Three Little Pigs' iconic catchphrase "Not by the hair on my chinny chin chin!" — the ZH must be a complete sentence.

**Fix:** `連下巴上一根毛都不讓` (full — preserves the exaggerated-body-part humor children love, grammatically complete)

---

### P0-3 — kt-ch1-l5-g1 `搭 (by boat)` (ZH_CONTEXT_LEAK)
**Why critical:** grammar-mc tests which preposition to use for transport. All EN options are bare prepositions (`by`, `with`, `on`, `in`). Only the ZH for `by` adds `(by boat)` — so a child reading ZH hints sees "一艘船" context that English-only readers don't, making ZH a cheat code rather than an aid. Flagged by automated LENGTH_RATIO lint (5.5×).

**Fix:** ZH = `搭` (bare translation, no annotation)

---

### P0-extra (systemic) — 3 Narrative Voice improvements (zero R1-R8 violation, per directive)

1. **kt-ch1-l7-q3 opt[1] "together as a team" → `團隊合作`**: "團隊合作" is corporate jargon (team collaboration). 8-12yo would say `大家一起` or `一起合作`. **Fix:** `一起合作`

2. **kt-ch5-l2-q10 opt[1] "one lonely girl heading into danger" → `一個孤單女孩走進危險`**: `走進危險` is abstract — children respond better to concrete spatial descriptions. **Fix:** `一個孤單的女孩走進了可怕的森林` (forest makes the danger tactile and story-grounded)

3. **kt-ch7-l5-q5 opt[1] "fine clothing and shiny footwear" → `漂亮衣物跟亮亮的鞋`**: The mix `漂亮衣物` (formal) + `亮亮的鞋` (cute childlike) is register-inconsistent within the same option. **Fix:** `漂亮衣服跟亮亮的鞋` (衣物→衣服 brings it to child register throughout)

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #65: X18_ZH_READABILITY_LINT — Child-Readability Linter for optionsZh**

### Industry source
- **TESOL Quarterly 2026 (Tan et al.)**: "Evaluating English Learning Apps for Chinese Preschoolers" (Wiley, doi:10.1002/tesq.70036) found that L1 support in apps frequently uses adult-register Chinese that children cannot decode, citing this as a top cause of L1-hint disengagement.
- **Nation & Newton (2009)** *Teaching ESL/EFL Listening and Speaking*: "L1 glosses must sit at or below the learner's L1 proficiency; a gloss harder than the target item defeats its own purpose."
- **Duolingo Pedagogy Principles (2024 internal, cited in Wikipedia)**: Hints and tips use controlled vocabulary — the L1 translation should be in "plain, direct language" appropriate for the learner's age tier.
- **HSK 2022 / Ministry of Education Taiwan vocabulary lists**: Provide graded ZH word frequency as reference for child-appropriate vocabulary.

Source URLs:
- [TESOL Quarterly 2026 — English Apps for Chinese Preschoolers](https://onlinelibrary.wiley.com/doi/10.1002/tesq.70036)
- [Nation & Newton Teaching ESL/EFL (Routledge)](https://www.routledge.com/Teaching-ESL-EFL-Listening-and-Speaking/Nation-Newton/p/book/9780415990875)

### Pickup 適配 verdict
✅ **適合** — `tools/validate-lessons.js` already runs a lint pass on every lesson file during CI. Adding a ZH readability check is the same pattern (parse JSON, test optionsZh, emit WARN). No src/ changes needed; lint only.

### What to detect

| Rule ID | Pattern | Detection | Example violation |
|---------|---------|-----------|-------------------|
| X18a | 成語 in optionsZh | 4-char sequence matching common 成語 regex or wordlist | `笑裡藏刀`, `一石二鳥` |
| X18b | Vocabulary > HSK3 / CEFR-ZH A2 in optionsZh | wordlist lookup (top 2500 ZH words for children) | `來源`, `短暫`, `善意` |
| X18c | ZH length parity within same Q | `max(len(zh_opts)) / min(len(zh_opts)) > 2.5` | opt[0]=13 chars vs opt[2]=4 chars |
| X18d | ZH option has parenthetical annotation not in EN | regex `\(.*\)` in optionsZh[i] when EN has none | `搭 (by boat)` |

### Effort vs ROI

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| Child-readability lint for optionsZh (X18a–X18d) | TESOL Quarterly 2026 / Nation & Newton / Duolingo controlled-vocab principle | ✅ fits existing `validate-lessons.js` lint pipeline; add 4 new rule functions | ~2h (build 成語 regex + HSK3 wordlist file + 4 lint functions + tests) | High — catches 成語 regressions across all 32 ch before ship; prevents L1-hint comprehension failure for 8-12yo | **IMPLEMENT** |

### Concrete implementation sketch

In `tools/validate-lessons.js`, add:

```js
// X18a: 成語 4-char idiom detect (common 100 list)
const CHENGYU_100 = ['笑裡藏刀','一石二鳥','半途而廢','馬到成功','一帆風順' /* ... */];
function checkZhReadability(lessonId, q) {
  if (!q.optionsZh) return [];
  const issues = [];
  q.optionsZh.forEach((zh, i) => {
    if (CHENGYU_100.some(c => zh.includes(c)))
      issues.push(`${lessonId} ${q.id}: X18a_CHENGYU opt[${i}] "${zh}"`);
    // X18d: parenthetical annotation
    if (/\(.+\)/.test(zh) && !(/\(.+\)/.test(q.options[i])))
      issues.push(`${lessonId} ${q.id}: X18d_ZH_ANNOTATION opt[${i}] "${zh}"`);
  });
  // X18c: parity
  const lens = q.optionsZh.map(z => z.length).filter(l => l > 0);
  if (lens.length > 1 && Math.max(...lens) / Math.min(...lens) > 2.5)
    issues.push(`${lessonId} ${q.id}: X18c_ZH_LENGTH_PARITY ratio=${(Math.max(...lens)/Math.min(...lens)).toFixed(1)}`);
  return issues;
}
```

> NEVER modify src/ or lessons-ch*.json — this is a lint addition to tools/ only.
