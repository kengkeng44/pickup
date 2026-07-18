# Content QA — 2026-07-18 06:05 UTC

Today's angle: **#11 — optionsZh Translation Quality (Ch9-16)**
Focus: Ch9–16 (Cinderella / Snow White / Hansel & Gretel / Three Pigs / historic stories)

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail)
Notable Ch9 / Ch10 WARN: X57_ANTONYM_PAIR_MIRROR, X49_STIMULUS_REUSE (ongoing, previously documented)
Build: PASS (no fatal errors)
```

---

## B. Violation Table

| Ch | Q ID | type | EN snippet | violation | 修法 | severity |
|----|------|------|-----------|-----------|------|----------|
| 9–16 | (all listen-tf, 120 Q) | listen-tf | `options: ["Yes","No"]` | **MISSING_OPTIONS_ZH** — Chinese/JA/KO 玩家看到英文鈕 | `optionsZh:["是","否"]` 全局補入；或 renderer 自動 fallback | **P0** |
| 10 | kt-ch10-l3-q7 | listen-mc | `to paint it red` | **ZH_TRUNCATION** — `漆紅` (2字) vs EN 4-word phrase; 其他選項 6-8 字 | 改 `漆成紅色` (parallelism) | P2 |
| 10 | kt-ch10-l4-q7 | listen-mc | `too small` / `hand was tired` | **PARALLELISM_BREAK** — `太小`(2字) `手累`(2字) vs `別人會不安全`(7字)，組內長度差逾 3× | 改 `盒子太小` / `她的手很酸` (4字 vs 7字，縮差距) | P2 |
| 11 | kt-ch11-l1-ep1[2] | emoji-pick | `☁️ cloud` | **SINGLE_CHAR_ZH** — `雲`(1字) | 保留可(emoji-label context)；若 UI 空間夠→ `白雲` | P3 |
| 11 | kt-ch11-l2-ep1[0,2,3] | emoji-pick | `⚔️ sword`, `🏹 bow`, `🔫 gun` | **SINGLE_CHAR_ZH** — `劍`,`弓`,`槍` | P3 — weapons single-char is standard zh | P3 |
| 12 | kt-ch12-l1-ep1[0,1,2] | emoji-pick | cow/sheep/pig | **SINGLE_CHAR_ZH** — `牛`,`羊`,`豬` | P3 — animal single-char accepted | P3 |
| 12 | kt-ch12-l2-ep1[0,1,2] | emoji-pick | river/bridge/mountain | **SINGLE_CHAR_ZH** — `河`,`橋`,`山` | P3 — landscape single-char accepted | P3 |
| 12 | kt-ch12-l3-q9[0] | listen-mc | `showed she did not want to go` | **ADULT_REGISTER** — `表示不想走`; `表示` 偏正式成人詞 | 改 `不肯走` 或 `一直說不要走` | P2 |
| 13-16 | (多筆 emoji-pick) | emoji-pick | wolf/bear/dog/mountain/fish/bowl | **SINGLE_CHAR_ZH** (14 cases) | P3 — contextually acceptable for emoji-label | P3 |

**Summary**: 120 P0 (listen-tf MISSING_OPTIONS_ZH) + 3 P2 + 18 P3 (emoji-pick single-char)

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total non-narration Q analyzed (Ch9-16) | 491 |
| Q with optionsZh present | 371 (75.6%) |
| Q missing optionsZh | 120 (24.4%) — **all listen-tf** |
| optionsZh count mismatch | 0 |
| Empty ZH option slots | 0 |
| English-only ZH options | 0 |
| Single-char ZH (emoji-pick) | 18 — P3 advisory |
| Adult-register ZH options | 1 (P2) |
| Parallelism breaks | 2 sets (P2) |
| MT artifact flags | 1 (false-positive: `在地上睡` = valid zh) |

**Root cause of 120 MISSING_OPTIONS_ZH**: All listen-tf in Ch9-16 have `options: ["Yes","No"]` with no `optionsZh` key. This is a **systemic content-generation gap** — the batch script that wrote these chapters never added `optionsZh` for listen-tf type. Ch1-8 likely share same gap.

**Effect on players**: Chinese-mode (zh-TW) / Japanese / Korean users see English "Yes" / "No" buttons on listen-tf questions — violates B.550 language-consistency rule ("玩家設什麼語言，選項就用那個語言").

---

## D. Top 5 P0

1. ⚠️ **120× MISSING_OPTIONS_ZH on listen-tf (Ch9-16)** — All 120 listen-tf binary questions missing Chinese translation. Chinese/JA/KO players see English buttons. Systemic gap from content generation pipeline; likely affects Ch17-32 as well.  
2. ⚠️ **Parallelism break — kt-ch10-l4-q7** — `太小` (2字) vs `別人會不安全` (7字) in same option set; 3.5× length ratio violates R2 spirit for ZH options.  
3. ⚠️ **ZH truncation — kt-ch10-l3-q7** — `漆紅` is a grammatically incomplete phrase that loses the completive aspect of EN `to paint it red`; kids may parse it as just "red lacquer."  
4. ⚠️ **Adult register — kt-ch12-l3-q9** — `表示不想走` — `表示` is formal/academic register; 8-12 kids say `不肯走` / `說不要走`.  
5. ⚠️ **emoji-pick single-char x18 (P3 advisory)** — Single-char ZH labels (牛,羊,山…) are technically correct but optionally expandable to 2-char for readability (`白牛`,`小羊`,`高山`). Only worth addressing if UI space allows.

---

## E. Narrative Voice / Pacing Improvements (3 advisory — required even with 0 schema violations)

1. **Ch9 kt-ch9-l7-q7 ZH** — `剛剛好，完美合腳` — "完美" is adult; 8-12 kids = `剛好合腳！` shorter + punchy.
2. **Ch10 optionsZh register uniformity** — Ch10 mixes literary (`善良勇敢`) and colloquial (`打瞌睡講話慢`) within same lesson. Aim for consistent colloquial-warm tone: `善良又勇敢` / `哈欠連連，說話慢`.
3. **Ch12 kt-ch12-l3-q9 explanationZh pattern** — Binary listen-tf questions that lack `optionsZh` also tend to lack Chinese `explanationZh` follow-through; content parity (question + explanation both in L1) is the benchmark for immersive ELT (Krashen i+1 comprehensible input).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

<!-- ARCH-REC #172: X172_LISTEN_TF_OPTIONS_ZH_FALLBACK -->

**ARCH-REC #172: X172_LISTEN_TF_OPTIONS_ZH_FALLBACK**

### 問題 / Issue

120 listen-tf Q in Ch9-16 (and likely 100+ more in Ch17-32) have `options: ["Yes","No"]` but no `optionsZh`. When the player's language is `zh`, `ja`, or `ko`, they see English binary buttons — breaking the B.550 language-consistency contract.

### 業界根據 (2026)

- **UI localization best practice** (Localize.js / Crowdin 2026): *"All interactive labels, including binary-choice buttons, must be localized to the target language — English fallback is a localization bug."*
- **EFL young-learner L1 support** (kidsclubenglish.com): L1 scaffolding on response options reduces task-switching cognitive load; children should not need to mentally translate "Yes/No" while evaluating a listening question in Chinese.
- **UXMovement button-label research**: `Yes/No` labels are inherently less task-efficient than semantically grounded options; for A2 children, L1 labels (`是`/`否`) lower barrier further.
- **Duolingo scaffolding model** (ELT ABB Journal 2026): recognition tasks (binary T/F = lowest scaffold) must use the learner's strongest signal path — showing English `Yes/No` to a Chinese-mode A2 learner adds a second decoding step.

### Pickup 適配分析

✅ **適合 (both paths)**:

**Path A — Renderer-level fallback (lowest effort, zero data change)**:
In `renderers.tsx` `listen-tf` renderer, when `optionsZh` is absent AND `getLang() !== 'en'`, auto-substitute:
```ts
const BINARY_ZH: Record<string, [string, string]> = {
  zh: ["是", "否"], ja: ["はい", "いいえ"], ko: ["예", "아니요"]
};
const displayOptions = optionsZh?.length ? optionsZh
  : BINARY_ZH[getLang()] ?? options;
```
- Effort: ~15 min, 1 file edit, zero JSON changes
- Risk: nil (fallback only if optionsZh absent)
- Covers all chapters at once, including future chapters

**Path B — Data backfill (correct but expensive)**:
Add `"optionsZh": ["是","否"]` to every listen-tf Q in all ch*.json. ~250+ entries. Script-able but touches 26+ files.
- Effort: ~1hr scripted, but JSON diff is noisy + all chapters need re-validate
- Benefit: data is self-documenting, works for export/LMS scenarios

### Verdict

**✅ Implement Path A now** (renderer fallback) — immediate fix for all players, zero data churn. Path B can follow as a batch script when content team does next JSON revision. This is the industry-standard "code > data" fix for systemic localization gaps.

### Effort / ROI

| | Path A (renderer) | Path B (data backfill) |
|--|--|--|
| Effort | 15 min | 1 hr |
| Files touched | 1 (`renderers.tsx`) | 26+ JSON |
| Covers future chapters | ✅ yes | ❌ per-chapter |
| ROI | ⭐⭐⭐ High | ⭐⭐ Medium |

**Recommendation**: Path A — implement in `renderers.tsx` as 10-line fallback mapping.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| L1-localized binary-choice button labels | kidsclubenglish.com / Localize.js 2026 | ✅ add renderer fallback for listen-tf optionsZh absent | 15 min | ⭐⭐⭐ High | ✅ Implement Path A |
