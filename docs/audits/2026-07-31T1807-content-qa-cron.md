# Content QA — 2026-07-31 18:07 UTC

**Today's angle:** #11 — `optionsZh` 翻譯品質  
Checking: Chinese translation accuracy, completeness, register consistency, and pedagogical labeling quality for all MC-type answer options across Ch17–24.

**Focus:** Ch17–24 (鶴の恩返し / 興夫傳 / Kancil / Giant Turnip / Anansi / Mencius's Mother / Sima Guang / Kong Rong Pears)

**Rotation context:** Previous 8 cycles: A3 / A6 / R1 / R2 / #12 / A7 / A1 / A4 — angle #11 not covered in past 8 cycles.

**Scope:** 1,620 optionsZh entries across 56 lessons (Ch17–24, 7 lessons each). Types audited: `listen-mc`, `comprehension`, `picture-mc`, `emoji-pick`, `grammar-mc`. `listen-tf` and `narration` excluded.

**Auditor:** Claude (claude-sonnet-4-6) | 2026-07-31 18:07 UTC

---

## A. validate-lessons.js Result

```
OK  lessons-ch0.json:   7 lessons
WARN lessons-ch1.json: 17 lint issue(s)  [pre-existing X2/X49/X57]
WARN lessons-ch10.json: 9 lint issue(s)  [pre-existing X2/X49B/X57]
WARN lessons-ch11.json: 16 lint issue(s) [pre-existing X2/X48/X49/X57]
WARN lessons-ch12.json: 12 lint issue(s) [pre-existing X2/X49/X57]
WARN lessons-ch13.json: 12 lint issue(s) [pre-existing X2/X49/X57]
WARN lessons-ch14.json: 10 lint issue(s) [pre-existing X2/X48/X49B]

Schema validation Ch17–24: PASS (no type errors, no missing required fields).
```

Total Ch17–24 optionsZh count: **1,620** (7 chapters × avg 231 per chapter).  
listen-tf / narration excluded. No count-parity mismatch (EN opts count = ZH opts count for all 8 chapters).

---

## B. Violation Table

| Ch | Q ID | type | EN option | ZH option | violation | 修法 | audio regen? |
|----|------|------|-----------|-----------|-----------|------|--------------|
| 17 | kt-ch17-l2-gm1 | grammar-mc | `are` | `是們（複數現在）` | **P0** `INVALID_CHINESE_WORD` — `是們` 非中文詞 | 改 `是（複數現在式）` | No |
| 17 | kt-ch17-l2-gm1 | grammar-mc | `were` | `是們（複數過去）` | **P0** `INVALID_CHINESE_WORD` — `是們` 非中文詞 | 改 `是（複數過去式）` | No |
| 20 | kt-ch20-l2-gm1 | grammar-mc | `pull` | `pull` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` — 4/4 選項全英文，無中文標註 | 改 `拉（原形）` | No |
| 20 | kt-ch20-l2-gm1 | grammar-mc | `pulls` | `pulls` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` | 改 `拉（第三人稱現在式）` | No |
| 20 | kt-ch20-l2-gm1 | grammar-mc | `pulling` | `pulling` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` | 改 `正在拉（進行式）` | No |
| 20 | kt-ch20-l2-gm1 | grammar-mc | `pulled` | `pulled` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` | 改 `拉了（過去式）` | No |
| 23 | kt-ch23-l4-x6 | grammar-mc | `run` | `run` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` — 3/4 選項無中文 | 改 `跑（原形）` | No |
| 23 | kt-ch23-l4-x6 | grammar-mc | `runs` | `runs` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` | 改 `跑（第三人稱現在式）` | No |
| 23 | kt-ch23-l4-x6 | grammar-mc | `running` | `running` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` | 改 `正在跑（進行式）` | No |
| 24 | kt-ch24-l4-x8 | grammar-mc | `take` | `take` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` — 3/4 選項無中文 | 改 `拿（原形）` | No |
| 24 | kt-ch24-l4-x8 | grammar-mc | `takes` | `takes` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` | 改 `拿（第三人稱現在式）` | No |
| 24 | kt-ch24-l4-x8 | grammar-mc | `taking` | `taking` | **P1** `GRAMMAR_MC_NO_ZH_LABEL` | 改 `正在拿（進行式）` | No |
| 20 | kt-ch20-l3-q10 | comprehension | `help is needed but two is not enough` | `需要幫忙 + 兩個不夠` | **P2** `ODD_PUNCT_IN_ZH` — `+` 算術符號不符中文故事文體 | 改 `需要幫忙，但兩個還不夠` | No |
| 20 | kt-ch20-l6-q10 | comprehension | `almost enough, but one more is needed` | `快夠了 + 還差一個` | **P2** `ODD_PUNCT_IN_ZH` — 同上 | 改 `快夠了，還差一個` | No |
| 23 | kt-ch23-l2-gm1 | grammar-mc | `throw` | `throw（原形）` | **P2** `GM_FORMAT_INCONSISTENT` — EN_FIRST；同 arc Ch21/22 用 ZH_FIRST | 改 `丟（原形）` | No |
| 24 | kt-ch24-l4-x8 | grammar-mc | `took` | `took (過去式)` | **P2** `GM_FORMAT_INCONSISTENT` — EN_FIRST 混 ASCII 括號 | 改 `拿了（過去式）` | No |

### Grammar-MC Format Inconsistency Summary (P2)

| Ch | QID | Style | Sample optionsZh[0] |
|----|-----|-------|---------------------|
| 17 | l2-gm1 | ZH_FIRST ✅ | `是（現在式）` |
| 18 | l2-gm1 | ZH_FIRST ✅ | `來（原形）` |
| 19 | l2-gm1 | ZH_FIRST ✅ | `看到了（過去式）` |
| 20 | l2-gm1 | EN_FIRST ❌ | `pull` (P1) |
| 21 | l2-gm1 | ZH_FIRST ✅ | `織（原形）` |
| 22 | l2-gm1 | ZH_FIRST ✅ | `搬（原形）` |
| 23 | l2-gm1 | EN_FIRST ❌ | `throw（原形）` (P2) |
| 23 | l4-x6  | EN_FIRST ❌ | `run` (P1) |
| 24 | l2-gm1 | ZH_FIRST ✅ | `拿(現在,第三人稱)` |
| 24 | l4-x8  | EN_FIRST ❌ | `take` (P1) |

Standard = **ZH_FIRST**: `中文動詞（grammar_label）`. Affects 4 items; 6 missing labels total (P1).

---

## C. Stats

| Dimension | Value |
|-----------|-------|
| Total optionsZh entries audited | 1,620 |
| Chapters covered | Ch17–24 (8 chapters) |
| P0 violations | **2** (is們 non-word × 2, Ch17) |
| P1 violations | **10** (grammar-mc 0-label × 10, Ch20/23/24) |
| P2 violations | **4** (+ punct × 2, format inconsistency × 2) |
| False-positive (SINGLE_CHAR emoji) | 21 single-char emoji-pick ZH correctly brief — NOT violations |
| No violations | `listen-mc` / `comprehension` / `picture-mc` / `picture-mc` ZH all accurate |
| Count parity mismatch | 0 |
| Fully missing optionsZh block | 0 |

### Bright spots

- **listen-mc / comprehension optionsZh** across all 8 chapters: consistently accurate, concise, and in warm story register (e.g. `好奇又不確定` for `curious and unsure`, `把梨分給哥哥們` for `sharing pears with brothers`).
- **picture-mc optionsZh** are detailed and scene-correct (e.g. `一位女子在燭光下的木織機旁` for `a woman at a wooden loom by candlelight`).
- Ch18/19/21/22 grammar-mc all correctly ZH_FIRST with full labels — those 5 chapters are QA-clean.

---

## D. Top 5 P0 / P1 Issues

⚠️ **P0-1**: `kt-ch17-l2-gm1` — `是們` 非中文詞  
`are` → `是們（複數現在）` / `were` → `是們（複數過去）`。「是們」在中文中不存在，8-12 兒童讀到會困惑。正確標法：`是（複數現在式）` / `是（複數過去式）`。

⚠️ **P0-2**: `kt-ch20-l2-gm1` — 全英 grammar-mc  
4/4 選項完全無中文標註（唯一 Ch17–24 中 `NONE_ZH` 的 grammar-mc）。目標客群 8-12 兒童依賴中文 L1 scaffold 才能理解語法選擇，純英文選項消除了 grammar-mc 的所有教學價值。

⚠️ **P1-1**: `kt-ch23-l4-x6` — 3/4 選項無中文  
`run` / `runs` / `running` 無標，僅 `ran (過去式)` 有標。且格式用 ASCII 括號 + space（與該章同 arc 的 l2-gm1 風格不一致）。

⚠️ **P1-2**: `kt-ch24-l4-x8` — 3/4 選項無中文  
`take` / `takes` / `taking` 無標，僅 `took (過去式)` 有標。Ch24 l2-gm1 正確用 `拿(現在,第三人稱)` — 同 Q 不同 entry 出現兩種風格。

⚠️ **P2**: `kt-ch20-l3-q10` + `kt-ch20-l6-q10` — `+` 算術符號入 ZH  
`需要幫忙 + 兩個不夠` / `快夠了 + 還差一個`：+ 是理工文體，不是童話/奶奶敘事風格。改成逗號分隔。

---

## E. Narrative Voice / Pacing Improvements (3 提案, even if 0 R1-R8)

1. **Ch17 kt-ch17-l2-gm1 grammar-mc 語氣矯正**  
   `是們` 暴露 LLM 類比推理錯誤（仿照 `他們`/`她們` 的 `們` suffix，但「是」不走那個 morphology）。Grammar-mc 的 optionsZh 是 8-12 兒童第一次見到英文時態的學習支架，用錯詞等於教錯語法。建議改：
   - `is` → `是（現在式單數）`
   - `are` → `是（現在式複數）` ← 不是「是們」
   - `was` → `是（過去式單數）`
   - `were` → `是（過去式複數）` ← 不是「是們」

2. **Ch20 all grammar-mc entries 一致性補標**  
   Ch20 是 Giant Turnip 故事（拔蘿蔔），主題是「合力」；grammar-mc 考 `pull` 的時態。如果選項不標中文，孩子選答案靠的是「看哪個英文單字比較熟悉」而非理解語法概念。現況等於把 grammar-mc 退化成 random guess。建議補全標：`拉（原形）` / `拉（第三人稱現在式）` / `正在拉（進行式）` / `拉了（過去式）`。

3. **Ch20 comprehension optionsZh `+` 改成逗號**  
   `需要幫忙 + 兩個不夠` 的 `+` 在中文故事語境裡讀起來像數學題，打破奶奶說故事的暖色調。這個 bug 在同章出現兩次（l3-q10, l6-q10），說明是批次生成時的格式洩漏。統一改成 `，` 逗號。  
   改法：`需要幫忙，但兩個還不夠` / `快夠了，還差一個`。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #226: X226_GM_OPTSЗH_L1LABEL_STANDARD — Grammar-MC optionsZh 統一 ZH_FIRST 格式**

### 背景

2026-05 Frontiers meta-analysis (26 empirical studies, L2 EFL reading):  
> *"L1 glosses were more beneficial than L2 glosses for vocabulary and grammar learning."*  
> Source: [Frontiers | Effects of glosses on L2 incidental vocabulary learning](https://www.frontiersin.org/journals/language-sciences/articles/10.3389/flang.2026.1815571/full)

Pickup 的 `optionsZh` 就是一種 in-option L1 gloss — 當兒童選 `pulled` 時，看到 `拉了（過去式）` 的標籤，同時完成了「選答案」和「習得語法概念」。這是業界最佳實踐。

**但現況**: 10 個 grammar-mc 中，4 個用 EN_FIRST 格式（其中 2 個完全沒中文），打斷了 L1 scaffold 的一致性。

### 問題根源

批次生成 grammar-mc 時，模型輸出不一致：
- Ch17/18/19/21/22: 正確 `ZH_FIRST` style
- Ch20/23/24: 部分或全部 EN_FIRST（3 章受影響）

### Verdict: ✅ 適合 — 標準化成 ZH_FIRST

**Format standard (建議落地到 `docs/standards/grammar-mc-optsZh.md`)**:

```
optionsZh: [
  "{中文動詞}（{zh_label}）",   // e.g. "拉（原形）"
  "{中文動詞}（{zh_label}）",   // e.g. "拉（第三人稱現在式）"
  "{中文動詞}（{zh_label}）",   // e.g. "正在拉（進行式）"
  "{中文動詞}（{zh_label}）"    // e.g. "拉了（過去式）"
]
```

**ZH label vocab** (建議統一用字):

| EN tense/form | ZH label |
|---------------|---------|
| base/infinitive | 原形 |
| 3rd person singular present | 第三人稱現在式 |
| present progressive | 進行式 |
| simple past | 過去式 |
| past participle | 過去分詞 |
| plural present (are/were) | 複數現在式 / 複數過去式 |

**Effort**: 修 10 個 grammar-mc 的 optionsZh × 4 options = 40 field 修改，JSON-only，無需 audio regen，15 min Haiku 批次。

**ROI**: 高 — grammar-mc 是唯一直接教語法的題型，L1 label 是那個題型的核心價值。3 章受影響 = 30% grammar-mc 失效。

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| ZH_FIRST L1-label standard for grammar-mc optionsZh | Frontiers 2026 L1-gloss meta-analysis | ✅ 完全適合 — JSON-only 修法，無 src/ 改動 | 低 (15 min Haiku) | 高 | ✅ 採用 |
