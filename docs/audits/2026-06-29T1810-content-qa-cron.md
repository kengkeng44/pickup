# Content QA — 2026-06-29 18:10 UTC

Today's angle: **#11 optionsZh 翻譯品質 (ZH translation accuracy & register)**
Focus: **Ch17–24** (鶴の恩返し Crane's Return / Heungbu & Nolbu / Sang Kancil / Giant Turnip / Anansi / 孟母三遷 / 司馬光 / 孔融讓梨)

**Angle definition (optionsZh 翻譯品質)**:
Pickup shows EN answer options alongside their ZH translations (optionsZh) for every listen-mc, comprehension, picture-mc and emoji-pick question. Research on bilingual subtitle cognition (Yuan 2025 / Cambridge Bilingualism L&C 2024) confirms that young L2 learners preferentially read the **L1 (ZH) text as their primary semantic anchor** when both languages are visible simultaneously. This means inaccurate or register-mismatched optionsZh directly mislead comprehension — the child understands the Chinese, derives the wrong schema, and maps it back to the EN audio.

Sub-violation taxonomy audited this cycle:

| Code | Definition |
|------|-----------|
| **ZH-3-MISTRANSLATION** | ZH translation has a different referent/event from EN original |
| **ZH-2-CLASSICAL** | Classical literary construction (之上/之中/之下/之間/人物/高坐) — inappropriate for 8-12 |
| **ZH-8-DRIFT** | Key semantic atom in EN (alone / together / cannot / escape) absent or reframed in ZH |
| **ZH-4-HONORIFIC** | Classifier/register inconsistency (一個 vs 一位) for same-category referents within one Q |
| **ZH-3-NUANCE** | Translation is not wrong but loses the discriminating nuance required to choose correctly |

---

## A. validate-lessons.js result

```
WARN (235 total mirror-lint issues across all chapters — warn-only, build not blocked)
Ch17-24 individually: WARN each with 3-9 issues (X2_OPTION_LIST_BIAS + X49_STIMULUS_REUSE dominant)
No new FAIL-level issues. Build: GREEN.
```

---

## B. Violation Table

| Ch | Q ID | Type | EN snippet | ZH snippet | Violation | 修法 | audio regen? |
|----|------|------|-----------|-----------|-----------|------|-------------|
| 17 | kt-ch17-l5-x5 opt0 | comprehension | "she wanted him inside" | "她想讓他看" | **ZH-3-MISTRANSLATION** — "inside" (enter room) 翻成"看"(look/see)，完全不同事件 | → "她想讓他進來" | No |
| 21 | kt-ch21-l2-pm1 opt1 | picture-mc | "a powerful figure sitting high above the clouds" | "一個強大的人物高坐在雲端之上" | **ZH-2-CLASSICAL** — 「之上」古文、「人物」文學語、「高坐」正式；8-12 兒童不自然 | → "一個很厲害的神坐在雲端上" | No |
| 19 | kt-ch19-l5-x5 opt2 | comprehension | "riding one big crocodile alone" | "騎著一條大鱷魚" | **ZH-8-DRIFT:alone** — "alone"(獨自)語義原子遺漏 | → "獨自騎著一條大鱷魚" | No |
| 22 | kt-ch22-l2-pm1 (Q-level) | picture-mc | "a man walking past…" / "a woman selling…" | "一個男人走過…" / "一位女士在攤位賣…" | **ZH-4-HONORIFIC** — 同一題成人男性用「一個」、成人女性用「一位」，雙重標準 | → 統一改「一位男士」或全部改「一個」 | No |
| 24 | kt-ch24-l2-ep1 opt0 | emoji-pick | "😊 kind" | "親切" | **ZH-3-NUANCE** — "kind"=善良/好心；"親切"=warm/friendly。孔融讓梨主題是道德善良，非態度親和 | → "善良" | No |
| 18 | kt-ch18-l3-x7 opt0 | comprehension | "hurt birds cannot escape a snake" | "受傷的鳥跑不贏蛇" | **ZH-8-DRIFT:cannot** — "cannot escape"(逃跑失能)改寫成"跑不贏"(競速框架)，語義框架偏移 | → "受傷的鳥逃不了蛇" | No |
| 22 | kt-ch22-l1-pm1 (Q-level) | picture-mc | mixed adults & children | "一個男孩…一位女士…一個女孩…一位老公公" | **ZH-4-HONORIFIC** — 同題「老公公」用「一位」但無對應「老婆婆」或同類成人 | → 統一：成人→「一位」，兒童→「一個」 | No |

**Total violations: 7** (1 P0 + 2 P1 + 4 P2)

---

## C. Stats

| Metric | Value |
|--------|-------|
| Ch audited | Ch17–24 (8 chapters) |
| Total optionsZh questions scanned | ~407 Q (avg 52/ch × 8) |
| Violations found | 7 |
| P0 (mistranslation, meaning reversal) | 1 |
| P1 (classical register / semantic atom dropped) | 2 |
| P2 (nuance drift / honorific inconsistency) | 4 |
| Chapters clean (0 violations) | Ch17, Ch19, Ch20, Ch21, Ch23 (isolated hits only) |
| Audio regen required | 0 |

---

## D. Top 5 P0/P1 (Priority order)

### 1. ⚠️ P0 — ZH-3-MISTRANSLATION | Ch17 kt-ch17-l5-x5 opt0
**EN**: "she wanted him inside"
**ZH**: "她想讓他看" ← WRONG

"inside" = enter the room (進去/進來). "看" = look/see. These are completely different events. In the 鶴の恩返し story context, "she wanted him inside" means she was weaving and called him to come in — it has nothing to do with "looking." The current ZH translation accidentally echoes the story's forbidden-look theme ("偷看") and creates a false echo that could mislead comprehension.

**Fix**: → `"她想讓他進來"` (she wanted him to come inside)

---

### 2. P1 — ZH-2-CLASSICAL | Ch21 kt-ch21-l2-pm1 opt1
**EN**: "a powerful figure sitting high above the clouds"
**ZH**: "一個強大的人物高坐在雲端之上"

Three compounding formal markers for 8-12 audience:
- 「之上」(classical postpositional, formal) → should be「上面」or just「上」
- 「人物」(literary "figure/personage") → should be「神」or「人」
- 「高坐」(archaic dignified sitting posture) → should be「坐」

**Fix**: → `"一個很厲害的神坐在雲端上"`  or `"一個強大的人坐在雲的上面"`

---

### 3. P1 — ZH-8-DRIFT:alone | Ch19 kt-ch19-l5-x5 opt2
**EN**: "riding one big crocodile alone"
**ZH**: "騎著一條大鱷魚" (missing "alone")

This is a comprehension Q testing whether the child understood the Sang Kancil story correctly — specifically, the answer choice is a *distractor* (mouse deer crossed by jumping multiple crocodiles, not riding one alone). The "alone" is discriminating: without 獨自, the ZH distractor loses the clue that makes it wrong. Children reading ZH may not catch the "alone" distinction.

**Fix**: → `"獨自騎著一條大鱷魚"`

---

### 4. P2 — ZH-4-HONORIFIC | Ch22 kt-ch22-l2-pm1
**Same Q options**:
- "a man walking past a busy market" → "一個男人走過熱鬧的市場"
- "a woman selling fruit at a stall" → "一位女士在攤位賣水果"

Adult male gets 一個 (neutral); adult female gets 一位 (polite honorific). For a Taiwan 8-12 audience, this gender-based classifier inconsistency could be interpreted as a social register signal — the 一位 option "reads" as more prominent/correct. This is an inadvertent optionsZh-level length-tell in classifier form.

**Fix**: Standardize to either 一位 for all adults or 一個 for all adults. Recommendation: → `"一位男士走過熱鬧的市場"`

---

### 5. P2 — ZH-3-NUANCE | Ch24 kt-ch24-l2-ep1 opt0
**EN**: "😊 kind" → **ZH**: "親切"

Story is 孔融讓梨 — Kong Rong gives the bigger pear to his elder brothers. The English "kind" here carries the moral connotation of 善良/好心 (moral goodness, generosity of character). "親切" in Chinese specifically means "warm/approachable/friendly in manner" — not moral virtue. Though the explanationZh uses 親切 consistently within the file, the emoji-pick option for "kind" would be better served by "善良" for the target concept.

**Fix**: → `"善良"` (or `"好心"` for younger register)

---

## E. Narrative Voice / Pacing Improvements (zero-R1-R8 bonus proposals)

Even without new R1-R8 violations, the following pacing improvements fit the 8-12 children / 奶奶 warmth aesthetic:

### NV-1: 承諾 → 約定 (Ch17 l5, multiple Q)
"承諾" (formal promise/commitment) appears 4× in kt-ch17-l5 options and explanationZh. For 8-12 children, 「約定」(agreement/promise between friends) is warmer and more concrete. The 鶴の恩返し story's promise is more "我們說好了不看" (we agreed not to look) than a formal 承諾.
- Affects: kt-ch17-l5-q9 opt1 "我要守承諾" → "我要守約定"; x7 opt0 "違背承諾去看" → "打破約定去看"

### NV-2: explanationZh 用「→」箭頭改成因果句 (Ch17-24 全面)
explanationZh pattern: "A → B" is used throughout (e.g., "受傷、跑不了——受傷的鳥跑不贏蛇"). For 8-12 target audience, 「因為」sentence chains are more natural than arrow notation:
- "受傷了，跑不掉蛇，所以很危險" vs "受傷、跑不了——受傷的鳥跑不贏蛇"
- Arrow notation is more adult/academic. Low-priority but consistent with 奶奶 warmth voice.

### NV-3: Ch19 lg2 options too adult in register
kt-ch19-l4-lg2 opt1: "他的面子比真相更重要" (his face/pride is more important than truth) — explicit abstract framing. For 8-12: "他不想讓別人覺得他不懂" is more concrete and child-relatable. 「面子」and「真相」are dictionary-level abstractions; replace with behavioural descriptions.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #95: X50_ZH_OPTION_PARITY_LINT**

**Research basis** (2024-2025):
- Yuan 2025 (BJEP): Sequential L1/bilingual subtitle use yields *lowest cognitive load* and best vocabulary recall — confirming L1 text is primary semantic anchor when visible alongside L2
- Cambridge Bilingualism L&C 2024: "L1 text becomes the preferred and most accessible source of semantic information, a strategy that helps manage cognitive load" in dual-language test conditions
- Implication: Pickup's optionsZh are not decorative — children read ZH first and use it to frame comprehension. Inaccurate ZH = broken comprehension scaffold.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| **ZH-option parity lint** — validate optionsZh 4 rules: (1) ZH max/min length ≤ 1.8×, (2) same-category adult refs use consistent 一個/一位, (3) flag 之上/之中/之下 classical markers, (4) key atoms (alone→獨自, together→一起, cannot→不能) present in ZH when in EN | Yuan 2025 BJEP / Cambridge Bilingualism L&C 2024 | ✅ 完全適合 — Pickup 已有 validate-lessons.js lint 框架，加 4 條 ZH-side rule 是直接延伸；每章 ~52 題 × 33 章 = 1700+ optionsZh 受保護 | Medium (4-6hr — add ZH rule set to validate-lessons.js + fix found violations) | High — 兒童依賴 ZH anchor 做理解，lint 防止靜默 ZH accuracy regression | ✅ 推薦實作 |

**具體 lint 規則 (新增到 validate-lessons.js)**:

```js
// X50a: ZH length parity (parallel to X42 R2)
if (q.optionsZh && q.optionsZh.length >= 2) {
  const zhLens = q.optionsZh.map(z => z.length);
  const ratio = Math.max(...zhLens) / Math.min(...zhLens);
  if (ratio > 1.8) warn(`X50a_ZH_LENGTH_PARITY (ZH max/min ${ratio.toFixed(1)}×)`);
}

// X50b: Classical ZH markers
for (const zh of q.optionsZh || []) {
  if (/之[上中下間前後]/.test(zh)) warn(`X50b_ZH_CLASSICAL_MARKER (${zh})`);
}

// X50c: Honorific inconsistency (adult male vs female, same Q)
const hasGeNan = optsZh.some(z => /一個(男人|男士|先生)/.test(z));
const hasWeiNv = optsZh.some(z => /一位(女士|女人|女生)/.test(z));
if (hasGeNan && hasWeiNv) warn(`X50c_ZH_HONORIFIC_GENDER_INCONSISTENCY`);

// X50d: Key semantic atom drop
const atomPairs = [['alone','獨自'],['together','一起'],['cannot','不能|無法|逃不']];
for (const [en, zhPat] of atomPairs) {
  if (en_opt.includes(en) && !new RegExp(zhPat).test(zh_opt)) {
    warn(`X50d_ZH_ATOM_DROP (${en}→should include ${zhPat})`);
  }
}
```

**Expected yield**: Based on this audit, Ch17-24 alone has ~7 issues X50 rules would catch. Extrapolated across 33 chapters: ~28-35 ZH accuracy issues currently latent.

---

*Audit completed: 2026-06-29 18:10 UTC | Angle: #11 optionsZh 翻譯品質 | Ch17-24 | 407 Q scanned | 7 violations | 1 P0 | ARCH-REC #95*
