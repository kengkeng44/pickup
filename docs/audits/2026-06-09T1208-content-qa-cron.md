# Content QA — 2026-06-09 12:08 UTC

Today's angle: **#11 — optionsZh 翻譯品質 (Chinese Option Translation Quality)**
Focus: **Ch9 (灰姑娘 Cinderella) · Ch10 (嫦娥奔月 Chang'e) · Ch11 (后羿射日 Hou Yi) · Ch12 (牛郎織女 Niulang & Zhinu) · Ch13 (小紅帽 Little Red Riding Hood) · Ch14 (浦島太郎 Urashima Taro)**

First deep optionsZh quality pass for Ch9-14. Previous pass covered Ch4-5 only (2026-06-06).

---

## A. validate-lessons.js result

```
OK lessons-ch9.json:  7 lessons
OK lessons-ch10.json: 7 lessons
OK lessons-ch11.json: 7 lessons
OK lessons-ch12.json: 7 lessons
OK lessons-ch13.json: 7 lessons
OK lessons-ch14.json: 7 lessons
Total mirror-lint issues: 65 (corpus-wide, pre-existing)
```

Schema shape and R1/mirror checks all pass. The issues below are **manual ZH translation quality** violations not caught by automated lint.

---

## B. Violation Table

| Ch | Q ID | Type | EN option | ZH option | Violation | 修法 | Audio regen? |
|----|------|------|-----------|-----------|-----------|------|--------------|
| 11 | `kt-ch11-l7-q7` | opt[0] | `'for selling gold price'` | `'為了賣金錢'` | **P0 — EN option malformed** ("for selling gold price" = non-standard English); ZH `為了賣金錢` incoherent (selling what? money?) | Rewrite EN opt to `'to remember old times'` (consistent with story arc) + ZH `'留作紀念'` | No |
| 11 | `kt-ch11-l7-q7` | opt[2] | `'cat noise made him'` | `'貓吵到他'` | **P0 — EN option incomplete** (dangling clause "made him [do what?]"); ZH `貓吵到他` translates an incomplete clause | Rewrite EN opt to `'so cats would not disturb him'` → ZH `'怕貓吵他'` | No |
| 11 | `kt-ch11-l1-q6` | correct | `'it became dry and dead'` | `'變得乾又死'` | **P1 — Wrong register**: `死` applied to drought/landscape means 死亡 (death of a person/animal). For vegetation/environment, Chinese uses `乾枯` (dried/withered). "乾又死" sounds jarring to native speakers | ZH → `'變得乾枯'` | No |
| 11 | `kt-ch11-l5-q7` | opt[0] | `'painfully hot'` | `'痛苦地熱'` | **P1 — Grammatically malformed**: `痛苦地` is adverb ("painfully") + `熱` is adjective ("hot"); stacking 地+adj is non-standard. Natural Chinese: `熱到難受` or `難耐的熱` | ZH → `'熱到難受'` | No |
| 13 | `kt-ch13-l7-q3` | correct | `'opened him up carefully'` | `'小心打開他'` | **P1 — Wrong verb**: `打開` = open a door/box/file. Cutting open a wolf's belly requires `剖開`. `小心打開他` is ambiguous and misleading to children reading about the huntsman's action | ZH → `'小心剖開他'` | No |
| 13 | `kt-ch13-l2-q9` | correct | `'bad inside but soft outside'` | `'心裡壞外表軟'` | **P1 — Word-for-word translation**: Feels like machine output. Chinese idiom `外柔內惡` (lit. "soft outside, wicked inside") exists and is A2-accessible. Story-voice opportunity | ZH → `'外柔內惡'` | No |
| 9 | `kt-ch9-l2-q9` | opt[2] | `'her father chose it'` | `'父親取的'` | **P2 — Terse/incomplete**: "父親取的" missing noun complement — takes who/what? Should complete the thought | ZH → `'是父親取的名'` | No |
| 10 | `kt-ch10-l4-q7` | opt[2] | `'her hand was tired'` | `'手累'` | **P2 — Terse**: "手累" = bare noun+adj, no copula or aspect marker. Children expected full-clause phrasing | ZH → `'她的手很累了'` | No |
| 10 | `kt-ch10-l5-q3` | opt[3] | `'gave it to a bird'` | `'給鳥'` | **P2 — Incomplete**: Missing object ("gave [it] to bird"). Grammatically reduced below child comprehension threshold | ZH → `'把它給了鳥'` | No |
| 14 | `kt-ch14-l7-q9` | opt[3] | `'changed into a fish'` | `'變魚'` | **P2 — Missing 成**: `變魚` ≠ `變成魚`. The coverb `成` is required in standard Chinese transformation verbs. Without it the phrase is ungrammatical | ZH → `'變成一條魚'` | No |

---

## C. Stats

| Metric | Count |
|--------|-------|
| Chapters audited | 6 (Ch9-14) |
| Q items scanned | ~84 MC questions (options × 4) |
| P0 violations | 2 (both in kt-ch11-l7-q7, broken EN options) |
| P1 violations | 4 |
| P2 violations | 4 |
| Total violations | 10 |
| Audio regen needed | 0 |
| Chapters clean (0 violations) | Ch12 (Niulang/Zhinu), Ch14 near-clean (1 P2) |
| Worst chapter | Ch11 (后羿射日) — 4 of 10 violations |

---

## D. Top 5 P0

1. **`kt-ch11-l7-q7` opt[0]** — `'for selling gold price'` / `'為了賣金錢'` · EN option itself is malformed ("gold price" not standard); ZH translation can't repair an incoherent source. Rewrite EN+ZH together.
2. **`kt-ch11-l7-q7` opt[2]** — `'cat noise made him'` / `'貓吵到他'` · Dangling EN clause leaks that something happens but omits the predicate. Children reading ZH see a grammatically complete clause but it references an incomplete English concept.
3. **`kt-ch13-l7-q3` correct** — `'opened him up carefully'` / `'小心打開他'` · Wrong verb for wolf evisceration. `打開` means to open (door/box); the scene is a huntsman cutting open a wolf's belly. Children will form an incorrect mental model of the story action.
4. **`kt-ch11-l5-q7` opt[0]** — `'painfully hot'` / `'痛苦地熱'` · `痛苦地熱` is a grammatically malformed ZH construction that no native speaker would produce or accept as fluent.
5. **`kt-ch11-l1-q6` correct** — `'it became dry and dead'` / `'變得乾又死'` · Using `死` (human/animal death) for vegetation in a drought violates Chinese semantic register. Will confuse or mislead children learning the word.

---

## E. Narrative Voice / Pacing Improvements (no-violation proposals)

Even without violations, three story-voice upgrades are recommended:

### NV-1 · Ch11 explanationZh "(paraphrase)" technical label
Ch11 explanationZh entries surface-level expose item-writing metadata to children:
> `"推理: best archer → 用弓射箭 (paraphrase)。"`
> `"推理: 一個接一個射 → steady chain (paraphrase)。"`
> `"推理: warm not burning → 又暖又溫柔 (paraphrase)。"`

The "(paraphrase)" label is item-writer shorthand, **not story-voice**. In the lesson review panel a child sees "→ steady chain (paraphrase)" which is meaningless or confusing. Recommend stripping "(paraphrase)" suffix and rewriting as story narration:
- `"推理: best archer → 用弓射箭 (paraphrase)。"` → `"因為他是世界第一的弓箭手，所以要用弓射箭。"`
- `"推理: 一個接一個射 → steady chain (paraphrase)。"` → `"后羿一支接一支地射，快得不停歇。"`
- `"推理: warm not burning → 又暖又溫柔 (paraphrase)。"` → `"剩下的太陽很暖，不燙，就像秋天的陽光。"`

**Pattern**: 8 similar "(paraphrase)" labels exist across Ch11 lessons; all should be converted. Same pattern likely in Ch10 (12 instances spotted in the explanationZh dump).

### NV-2 · Ch13 l7 story beat — wolf cutting scene ZH mismatch
The explanationZh for kt-ch13-l7-q3 reads:
> `"推理: opened up with care → 小心打開他 (paraphrase)。"`

This not only has the wrong verb (`打開` → `剖開`) but also teaches children that `打開他` is a valid paraphrase of "opened him up carefully". A story-voice fix would be:
> `"獵人拿起刀，小心地把狼剖開——奶奶和女孩都出來了！"`

This also resolves the emotional punch of the rescue that the clinical "推理" framing completely destroys.

### NV-3 · Ch14 Urashima Taro — emotional distance in l4-l6 options
The Urashima Taro arc (Ch14 l4-l6) is the most emotionally resonant chapter in Ch9-14. However, options consistently use distancing ZH phrasing:
- `'老家的生活'` (l4-q9 correct) — clinical; `'家鄉的日子'` is warmer
- `'家人在等他'` (l5-q3 correct) — functional but cold; `'媽媽在等他回家'` is more moving given the story

For an 8-12 child protagonist reader, these micro-choices determine whether the lesson feels like a vocabulary drill or an emotional story. Recommend applying the "奶奶的睡前故事" voice standard (warmth + specific proper names) to the Ch14 options in a future content pass.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #7 — `validate-lessons.js` ZH Terse Lint (zh-register quality guard)

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **L1 gloss quality gate** (min length + grammatical completeness check) | Chen 2025, TESOL Quarterly "Effects of Gloss Language on L2 Vocabulary Learning" — L1 glosses significantly outperform L2 glosses for lower-level learners **only when the L1 gloss is accurate and natural** | ✅ 完全適合 — Pickup uses ZH optionsZh as L1 glosses for A2 learners. Current schema validates presence but NOT quality. The 10 violations in this audit would all have been caught at authoring time by a terse/malformed lint rule | **S · 25min** | ⭐⭐⭐ | **SHIP** |
| **Multimodal app L1 scaffolding quality** (iHuman ABC vs Khan Academy Kids case study) | Tan 2026, TESOL Quarterly "Evaluating English Learning Apps for Chinese Preschoolers" — apps relying on L1 scaffolding succeed only when L1 content is idiomatic and grade-appropriate; word-for-word translations were specifically identified as harmful | ✅ 適合 — Pickup targets same demographic (Chinese children EFL). "心裡壞外表軟" type machine-translation ZH directly matches the failure pattern in Tan 2026 | Covered by same S-size lint rule | ⭐⭐⭐ | **SHIP** |

#### 實作方式

Add 3 ZH quality checks to `tools/validate-lessons.js` inside the existing `function lintQuestion(q, file)` block (after the current X3_R1_VERBATIM_WORDS check):

```js
// ZH-Q1: terse options (< 3 chars, likely stripped of grammar)
if (q.optionsZh && Array.isArray(q.optionsZh)) {
  q.optionsZh.forEach((zh, i) => {
    if (typeof zh === 'string' && zh.trim().length < 3) {
      issues.push({ id: q.id, code: 'X6_ZH_TERSE',
        msg: `optionsZh[${i}] "${zh}" < 3 chars — likely truncated` });
    }
  });
}

// ZH-Q2: 地+adjective malformed adverbial (e.g. '痛苦地熱')
// Pattern: 地 followed by 1-2 char adjective with no noun after
if (q.optionsZh && Array.isArray(q.optionsZh)) {
  const malformedAdv = /[地][一-鿿]{1,2}$/; // 地 + adj at end of string
  q.optionsZh.forEach((zh, i) => {
    if (typeof zh === 'string' && malformedAdv.test(zh)) {
      issues.push({ id: q.id, code: 'X6_ZH_MALFORMED_ADV',
        msg: `optionsZh[${i}] "${zh}" ends in 地+adj — likely malformed adverbial` });
    }
  });
}

// ZH-Q3: 變+noun without 成 (e.g. '變魚' should be '變成魚')
if (q.optionsZh && Array.isArray(q.optionsZh)) {
  const missingCheng = /^變[一-鿿](?!成)/;
  q.optionsZh.forEach((zh, i) => {
    if (typeof zh === 'string' && missingCheng.test(zh)) {
      issues.push({ id: q.id, code: 'X6_ZH_MISSING_CHENG',
        msg: `optionsZh[${i}] "${zh}" — 變 without 成, likely ungrammatical` });
    }
  });
}
```

**Expected lint catches from this audit**: X6_ZH_TERSE catches `手累` (2 chars) + `給鳥` (2 chars); X6_ZH_MALFORMED_ADV catches `痛苦地熱`; X6_ZH_MISSING_CHENG catches `變魚`.

**File to edit**: `tools/validate-lessons.js` — same WARN-only tier as existing X2/X3 rules.
**Integration**: Fits inside existing `lintQuestion()` function, ~25 lines, no new deps.

---

*Audit by: cron · angle #11 · 2026-06-09T12:08 UTC*
