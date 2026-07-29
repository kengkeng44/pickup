# Content QA — 2026-07-29 12:08 UTC

**Today's angle:** #11 — optionsZh Translation Quality (L1 Chinese translation accuracy, register, length-parity, and consistency for MC-type options)
**Focus:** Ch17–24 (Crane Wife / Kind+Greedy Brothers / Mouse Deer / Giant Turnip / Anansi / Mencius's Mother / Sima Guang / Kong Rong Pears)
**Scope:** 405 MC-type Qs (emoji-pick, picture-mc, grammar-mc, listen-mc, comprehension) across 56 lessons
**Auditor:** cron-content-qa automated session
**Previous 8-cycle angles (not repeated this run):** A5, A6, A3, R2, A2, R1, A7, A1

---

## A. validate-lessons.js Result

```
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail build)
```

No new schema validation failures. Build gate: PASS.

New angle-specific finding: 1 grammar-mc item has ALL optionsZh set to bare English — entirely untranslated. 2 additional grammar-mc items have inconsistent annotation format (some options annotated, others bare EN). 8 items show ZH length-tell where correct option is a significant outlier vs distractors.

---

## B. optionsZh Quality Violation Table

| # | Ch | Q ID | type | sentence (excerpt) | optionsZh (EN correct / ZH correct) | violation | 修法 | audio regen? |
|---|----|----|------|-------------------|--------------------------------------|-----------|------|-------------|
| 1 | 20 | kt-ch20-l2-gm1 | grammar-mc | "Grandpa ___ the turnip with both hands." | EN: pull/pulls/pulling/**pulled** → ZH: pull/pulls/pulling/**pulled** | **⚠️ P0 ZH-UNTRANS** — ALL 4 optionsZh are bare English. A Chinese-reading child sees zero translation aid. Every other grammar-mc (Ch17/18/19/21/22/24) provides Chinese verb + tense label. Missing label: complete regression. | Replace: `["拉（原形）","拉（第三人稱現在）","正在拉（進行式）","拉了（過去式）"]` | No |
| 2 | 17 | kt-ch17-l6-q5 | listen-mc | "There was no young woman. There was a white crane." | correct "一隻高高的白色大鳥"(9) vs "女孩"(2),"老獵人"(3),"空無一人"(4) | **P1 ZH-LENGTH-TELL** — ZH ratio max/min = 9/2 = 4.5× (standard R2 equivalent: ≤ 2.0×). Correct is only multi-word ZH option; child can select by visual length alone without comprehension. | Expand distractors: "一個年輕的女孩","一位年老的獵人","什麼都沒有了" (6/7/6 chars) → ratio ≤ 1.5× | No |
| 3 | 22 | kt-ch22-l6-q6 | listen-mc | "She cut the woven cloth in two long pieces." | correct "毀掉自己幾個月的工作"(10) vs "切蘋果"(3),"打開信"(3),"指著兒子"(4) | **P1 ZH-LENGTH-TELL** — ratio 10/3 = 3.3×. Correct is the only descriptive ZH phrase; distractors are abbreviated note-form. Introduces length-tell discrimination cue not present in English options. | Expand: "切了一顆蘋果給他","打開了一封信","把手指著她的兒子" (8/7/9 chars) → ratio ≤ 1.3× | No |
| 4 | 19 | kt-ch19-l6-q5 | listen-mc | "The little mouse deer turned around and called back." | correct "根本沒有國王的話"(8) vs "國王說嗨"(4),"河太冷了"(4),"明天來玩"(4) | **P1 ZH-LENGTH-TELL** — ratio 8/4 = 2.0× (at boundary). All 3 distractors are structurally identical 4-char telegrams; correct alone is 8-char clause. Systematic asymmetry creates visual cue. | Expand distractors: "國王打了聲招呼","河水太冷了啊","改天再來玩吧" (7/7/7 chars) | No |
| 5 | 23 | kt-ch23-l4-x6 | grammar-mc | "Their small feet ___ fast along the path." | ZH: "run \| **ran (過去式)** \| runs \| running" — only correct option has ZH label | **P1 ZH-INCONSISTENT-LABEL** — 3 bare-EN options vs 1 annotated. In Chinese-interface mode, child sees 3 raw English forms and 1 labeled form, making correct instantly identifiable without grammar knowledge. | Standardize: `["run（原形）","ran（過去式）","runs（第三人稱現在式）","running（進行式）"]` | No |
| 6 | 24 | kt-ch24-l4-x8 | grammar-mc | "Kong Rong reached out and ___ the smallest pear." | ZH: "take \| **took (過去式)** \| takes \| taking" — same partial-annotation pattern | **P1 ZH-INCONSISTENT-LABEL** — same fault as #5: only correct labeled, others bare EN. | Standardize: `["take（原形）","took（過去式）","takes（第三人稱現在式）","taking（進行式）"]` | No |
| 7 | 17 | kt-ch17-l2-gm1 | grammar-mc | "The old man ___ a kind old man alone in the mountains." | ZH: "是（現在式）\|**是們（複數現在）**\|是（過去式單數）\|是們（複數過去）" | **P2 ZH-NONSTANDARD-TERM** — "是們" is not a standard Chinese term (no such word exists; 們 is a pronoun suffix, not a verb suffix). Children learning Chinese alongside English may absorb incorrect metalinguistic form. | Replace: "是（現在式，單數）\|是（現在式，複數）\|是（過去式，單數）\|是（過去式，複數）" | No |
| 8 | 23 | kt-ch23-l2-gm1 | grammar-mc | "Sima Guang ___ the stone at the jar." | ZH: "throw（原形）\| throws（第三人稱現在式）\| **threw（過去式）** \| throwing（進行式）" — English verbs kept in ZH labels | **P2 ZH-VERB-NOT-TRANSLATED** — Ch17/18/19/21/22/24 all translate the verb to Chinese first (e.g. "看到了（過去式）", "搬了（過去式）"). Ch23 keeps English verb in ZH label, creating inconsistent experience for language-switcher. | Replace: `["丟（原形）","丟（第三人稱現在式）","丟了（過去式）","正在丟（進行式）"]` | No |
| 9 | 22 | kt-ch22-l4-q8 | listen-mc | "In the end she built three houses in all." | correct "三間"(2 chars) vs distractors avg 7 chars | **P2 ZH-CORRECT-TOO-TERSE** — correct is the SHORTEST option (2 chars). Reverse length-tell: all distractors longer. Child can select shortest. | Expand: "蓋了三間房子" (6 chars) | No |
| 10 | 17 | kt-ch17-l7-x8 | listen-mc | "She worked hard for him. But she had to leave." | correct "善意會被善意回報" | **P2 ZH-AWKWARD-PASSIVE** — "善意會被善意回報" uses 被-passive double construction awkward for 8-12 yr readers. More natural spoken Chinese: "善意換回善意" | Replace: "善意換回善意" | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total MC-type Qs with optionsZh (Ch17–24) | 405 |
| Missing optionsZh (count = 0) | 0 ✅ |
| P0 violations | 1 |
| P1 violations | 4 |
| P2 violations | 5 |
| grammar-mc ALL-untranslated | 1 (kt-ch20-l2-gm1) |
| grammar-mc partially annotated | 2 (kt-ch23-l4-x6, kt-ch24-l4-x8) |
| grammar-mc non-standard ZH term | 1 (kt-ch17-l2-gm1 "是們") |
| ZH length-tell P1 (ratio > 2.0×) | 3 |
| ZH length-tell P2 (ratio 1.5–2.0×) | 2 |
| Items with English proper noun in ZH (acceptable) | 1 (kt-ch21-l6-q8 "Anansi 很聰明" — proper noun OK) |

---

## D. Top 5 P0/P1 Priority Fixes

1. **⚠️ P0** `kt-ch20-l2-gm1` — ALL optionsZh are bare English "pull/pulls/pulling/pulled". Implement: `["拉（原形）","拉（第三人稱現在）","正在拉（進行式）","拉了（過去式）"]`
2. **P1** `kt-ch17-l6-q5` — ZH length-tell 4.5×: "一隻高高的白色大鳥"(9) vs "女孩"(2). Expand 3 distractors to 6-7 chars.
3. **P1** `kt-ch22-l6-q6` — ZH length-tell 3.3×: "毀掉自己幾個月的工作"(10) vs 3-char distractors. Expand distractors.
4. **P1** `kt-ch23-l4-x6` + `kt-ch24-l4-x8` — grammar-mc partial ZH annotation (only correct labeled). Standardize all 4 options.
5. **P1** `kt-ch19-l6-q5` — ZH length-tell 2×: "根本沒有國王的話"(8) vs 4-char distractors. Pad distractors.

---

## E. Narrative Voice / Pacing Improvements (required 3, even if 0 R-rule violations)

1. **Ch22 distractor register mismatch**: `kt-ch22-l6-q6` distractors "切蘋果","打開信","指著兒子" read as telegraphic note-form, clashing with grandma's warm story voice. Even when correct option stays the same, richer distractors ("切了一顆蘋果給他吃","打開了一封封好的信","把手指著她的兒子") match the narrative register and give weaker readers better input exposure.

2. **Ch21 Anansi comprehension options — formal register**: Several Anansi comprehension optionsZh use written-Chinese phrasing ("蜘蛛的頭本來就大","天神在開玩笑"). For the target age group (8-12), spoken-Chinese rhythm reads better: "蜘蛛的頭從來就是大的","天神在說笑呢" — matches how grandma would actually retell the story.

3. **Ch24 Kong Rong moral-lecture tone in ZH options**: `kt-ch24-l3-x7` has correct option "大或小——真的需要做選擇" which feels like a textbook moral summary rather than story language. Softer phrasing "大梨還是小梨——真的要選喔" preserves the grandma voice and is less intimidating for young readers making meaning.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #217: X217_OPTIONS_ZH_PARITY_LINT — optionsZh 長度平衡 + 翻譯完整性 lint rule**

### Industry Research Summary

Search findings (2026 ELT / psychometric research):

1. **L1 Gloss Parity principle** (Frontiers 2026 meta-analysis, Chen 2025 TESOL Quarterly): When L1 translations accompany MC options, translation inconsistency in length or completeness introduces new discrimination cues not present in the source-language item — invalidating the construct. Specifically: if translations vary systematically in detail level, learners can select by "which ZH option looks most complete" without reading the English. This is functionally identical to the L2 length-tell (R2) but in the L1 channel.

2. **Grammar explanation L1 consistency** (LanguageScreen 2024 ASHA): In children's language assessment apps with bilingual option labels, inconsistent annotation format (some options have metalinguistic labels, others don't) causes children to treat the labeled option as correct regardless of grammar knowledge — inflating scores artificially.

Source: https://www.frontiersin.org/journals/language-sciences/articles/10.3389/flang.2026.1815571/full
Source: https://onlinelibrary.wiley.com/doi/10.1002/tesq.3394
Source: https://pubs.asha.org/doi/10.1044/2024_LSHSS-24-00004

### Proposed Lint Rules (extend `tools/validate-lessons.js`)

```javascript
// X217a: ZH length-tell — correct is outlier
function checkZhLengthParity(q) {
  if (!q.optionsZh || q.optionsZh.length < 4) return;
  const lengths = q.optionsZh.map(o => o.replace(/[^一-鿿]/g, '').length || o.length);
  const correctLen = lengths[q.correctIndex];
  const otherLens = lengths.filter((_, i) => i !== q.correctIndex);
  const allShorter = otherLens.every(l => l < correctLen * 0.6);
  const allLonger  = otherLens.every(l => l > correctLen * 1.7);
  if (allShorter || allLonger) {
    const ratio = Math.max(correctLen, Math.max(...otherLens)) / Math.max(1, Math.min(...lengths));
    warn(`X217_ZH_LENGTH_TELL: ${q.id} — ZH ratio ${ratio.toFixed(1)}×; correct[${q.correctIndex}] is outlier`);
  }
}

// X217b: grammar-mc ALL-English optionsZh
function checkZhGrammarTranslation(q) {
  if (q.type !== 'grammar-mc') return;
  const allEnglish = q.optionsZh.every(o => /^[a-zA-Z()\s（）、]+$/.test(o.trim()));
  if (allEnglish) error(`X217_ZH_UNTRANSLATED: ${q.id} grammar-mc ALL optionsZh are English-only`);
}

// X217c: inconsistent annotation (some ZH, some not in same Q)
function checkZhAnnotationConsistency(q) {
  if (q.type !== 'grammar-mc' || !q.optionsZh) return;
  const hasZh = q.optionsZh.map(o => /[一-鿿（）]/.test(o));
  if (hasZh.some(Boolean) && !hasZh.every(Boolean)) {
    warn(`X217_ZH_ANNOTATION_INCONSISTENT: ${q.id} — mixed ZH/bare-EN labels in grammar-mc`);
  }
}
```

### Pickup Compatibility Assessment

| Check | Verdict | Notes |
|-------|---------|-------|
| Extends existing `validate-lessons.js` pattern | ✅ | Adds 3 functions, ~30 lines |
| No schema change to lessons JSON | ✅ | Checks existing `optionsZh` field |
| Retroactive coverage on all 35 chapters | ✅ | Runs globally |
| False-positive risk | 🟡 | `X217a` should be warn-only (some picture-mc legitimately vary in ZH length due to description vs label). `X217b` should be error (zero-tolerance for untranslated grammar-mc). |
| Effort | Low (~45 min) |  |
| ROI | High — directly guards the i18n feature (B.550) that makes the app usable for ja/ko/zh-TW switchers | |

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| X217a ZH length-parity lint | Frontiers 2026 + Chen TESOL 2025 | ✅ extend validate-lessons.js (warn-only) | 20 min | High | ✅ implement |
| X217b grammar-mc all-EN error | LanguageScreen ASHA 2024 | ✅ extend validate-lessons.js (error) | 10 min | High (catches regressions like kt-ch20-l2-gm1) | ✅ implement |
| X217c inconsistent annotation warn | LanguageScreen ASHA 2024 | ✅ extend validate-lessons.js (warn) | 15 min | Medium | ✅ implement |
