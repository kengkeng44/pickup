# Content QA — 2026-07-18 12:06 UTC

Today's angle: **R1 — Paraphrase, Not Echo (Buck 1991/2001 ban)**
Focus: **Ch1–8** (Momotaro / Ugly Duckling / Tortoise & Hare / Camel / Baba Yaga / Six Swans / Yexian / Three Little Pigs)

---

## A. validate-lessons.js result

```
Total mirror-lint issues: 440 (warn-only; MIRROR_LINT_STRICT=1 to fail)
Notable: X48_NGRAM_VERBATIM_CORRECT on Ch8 l3-q3, l6-q9 (already flagged by linter)
Build: PASS (no fatal errors)
```

---

## B. R1 Deep Scan Summary

**Method**: Custom JS scan across 533 questions in Ch1–8.
- Checks: R1-A direct substring, R1-B 3-gram verbatim, R1-C quasi-paraphrase (100% CW echo), R1-D high-CW (≥80%), R1-E 2-gram verbatim
- **Exempt types** (by design, per Buck 2001 & Frontiers 2025 research): `emoji-pick`, `grammar-mc` — these test visual/form recognition, not inference; semantic congruency is valid

**Raw counts (all types):**

| Rule | Count |
|------|-------|
| R1-A: Substring | 22 |
| R1-B: 3-gram verbatim | 9 |
| R1-C: Quasi-100% CW | 4 |
| R1-D: High-CW ≥80% | 1 |
| R1-E: 2-gram verbatim | 47 |
| **Total** | **83** |

**After filtering exempt types (emoji-pick=19, grammar-mc=1):**

| Severity | Genuine violations |
|----------|--------------------|
| P0 (substring) | **2** |
| P1 (3gram / quasi) | **13** |
| P2 (2gram / high-CW) | **~46** |

---

## C. Violation Table

### P0 — Direct Substring (Non-Exempt Types)

| Ch | Q ID | type | sentence snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| 5 | kt-ch5-l4-q3 | listen-mc | `"...It was made of white bon[es]"` (sentence truncated mid-word; answer IS in sentence) | `"bones"` | **R1-A: verbatim substring** — answer lifted directly from audio, no inference required | `"pale white sticks"` or `"pieces of bone"` | ✅ yes (correct audio must match new option) |
| 5 | kt-ch5-l7-x6 | picture-mc | `"She could not look away."` | `"could not look away"` | **R1-A: verbatim substring** — 5-word verbatim phrase | `"her gaze was frozen"` or `"her eyes were fixed"` | No (picture-mc has no audio for this option) |

### P1 — 3-gram Verbatim / Quasi-100% CW (Non-Exempt)

| Ch | Q ID | type | sentence snippet | correct option | violation | 修法 | audio regen? |
|----|------|------|-----------------|----------------|-----------|------|-------------|
| 2 | kt-ch2-l2-pm1 | picture-mc | `"…saw his reflection in the water."` | `"a duckling looking at itself in the water"` | 3-gram `in the water` | `"a duckling watching its own mirror image"` | No |
| 2 | kt-ch2-l4-x12 | picture-mc | `"Two wild ducks let him rest beside them in the tall grass."` | `"in tall grass beside wild ducks"` | quasi: CW [tall, grass, beside, wild, ducks] all echo | `"sheltering with other birds in long reeds"` | No |
| 2 | kt-ch2-l5-x1 | comprehension | `"…An old woman kept him in[side]…"` | `"in an old woman's warm kitchen"` | 3-gram `an old woman` | `"inside a stranger's cozy house"` | No |
| 3 | kt-ch3-l6-q10 | comprehension | `"…the big tree was very close to the tortoise, not him."` | `"no, the tortoise is too close"` | quasi: CW [tortoise, close] echo | `"no, the finish line is within reach for him"` | No |
| 5 | kt-ch5-l7-x4 | comprehension | `"She gave Vasilisa a skull with glowing eyes on a stick."` | `"had glowing eyes"` | quasi: CW [glowing, eyes] echo | `"could see in the dark"` or `"lit up like lanterns"` | No |
| 5 | kt-ch5-l7-x6 | picture-mc | `"She could not look away."` | `"could not look away"` | 3-gram `could not look` (+ P0, see above) | (see P0 fix) | No |
| 6 | kt-ch6-l4-x4 | comprehension | `"…she had to sew six shirts from a sharp white flower."` | `"make six shirts from sharp flowers"` | 3-gram `six shirts from` | `"weave a garment from thorny plants six times"` | No |
| 7 | kt-ch7-l3-q10 | comprehension | `"Her only friend was gone…"` | `"Yexian loses her only friend"` | 3-gram `her only friend` | `"Yexian is left completely alone"` | No |
| 7 | kt-ch7-l4-q5 | listen-mc | `"…under the heap by the gate."` | `"under a pile by the gate"` | 3-gram `by the gate` | `"buried near the entrance"` | ✅ yes |
| 7 | kt-ch7-l6-q7 | listen-mc | `"The shoe lay on the road until a passing man picked it up."` | `"a stranger on the road"` | 3-gram `on the road` | `"someone walking past found it"` | ✅ yes |
| 8 | kt-ch8-l3-q3 | listen-mc | `"…they felt firmer than straw."` | `"they were firmer than straw"` | 3-gram `firmer than straw` (also X48 flagged) | `"stronger and harder to blow down"` | ✅ yes |
| 8 | kt-ch8-l6-q9 | listen-mc | `"Both brothers ran out the back, fast as they could."` | `"out the back, very fast"` | 3-gram `out the back` (also X48 flagged) | `"they escaped through the rear"` | ✅ yes |
| 8 | kt-ch8-l7-q7 | listen-mc | `"The third pig built a hot fire inside a big pot."` | `"made a hot fire"` | 3-gram `a hot fire` | `"lit a blaze to trap the wolf"` | ✅ yes |

### False Positives (Exempt — By Design)

| Type | Count | Reason |
|------|-------|--------|
| emoji-pick | 19 | Vocabulary-labeling; semantic congruency is the validity criterion (Frontiers 2025). Exempt per Buck 2001 form-recognition exception. |
| grammar-mc | 1 | Fill-in-blank by definition: answer IS the missing word from sentence. |

---

## D. Stats

| Metric | Value |
|--------|-------|
| Questions scanned | 533 |
| Genuine P0 violations | 2 (0.4%) |
| Genuine P1 violations | 13 (2.4%) |
| Genuine P2 violations | ~46 (8.6%) |
| Audio regen needed | 5 items (listen-mc P1 fixes) |
| Chapters clean (0 P0/P1) | Ch1, Ch4 |
| Chapters with ≥3 P1 | Ch8 (4×), Ch7 (3×) |

---

## E. Top 5 P0 (Action Priority)

| Rank | Q ID | Why critical | Fix |
|------|------|--------------|-----|
| ⚠️ 1 | **kt-ch5-l4-q3** | listen-mc with sentence ending mid-word "white bon[es]" — correct answer is the exact word completing the sentence. Child hears "...made of white bones" then picks "bones." Zero inference demand. | Replace `"bones"` → `"pale white sticks"` |
| ⚠️ 2 | **kt-ch5-l7-x6** | picture-mc with 5-word verbatim lift "could not look away" from a 2-sentence story beat. | Replace → `"her gaze was frozen"` |
| 3 | **kt-ch8-l3-q3** | listen-mc "firmer than straw" is exact 3-gram; also flagged by X48. Known issue, no fix shipped yet. | `"sticks are stronger and harder to blow"` |
| 4 | **kt-ch8-l6-q9** | listen-mc "out the back" exact 3-gram; X48 flagged. Ch8 has pattern of 3-gram verbatim in action sequences. | `"they escaped through the rear exit"` |
| 5 | **kt-ch7-l4-q5** | listen-mc "under a pile by the gate" — `by the gate` 3-gram verbatim; location leaks directly from audio. | `"buried near the entrance to the yard"` |

---

## F. Narrative Voice / Pacing Improvements (3 proposals, even with 0 R1-R8 violations)

> Per cron constraint: always propose ≥3 even if violation count is zero.

1. **Ch8 l7 action sequence pacing**: Three pigs' final trap (q7-q9) fires off three consecutive listen-mc questions about the wolf's fate, but each correct option is a near-verbatim echo of the stimulus. Fixing R1 here also fixes the pacing: replace with inference-level options ("the wolf was outsmarted," "the third pig's plan worked") to let the scene land emotionally rather than testing word-decoding.

2. **Ch7 l3 emotional beat (kt-ch7-l3-q10)**: "Yexian loses her only friend" is a 5-word literal caption of the sentence, used as the gist question answer. Rewrite as `"Yexian is left completely alone"` — more emotionally resonant, avoids verbatim, and tests genuine gist inference (the word "only" implies loneliness, not just loss).

3. **Ch2 l2 reflection question (kt-ch2-l2-pm1)**: "A duckling looking at itself in the water" reuses the exact scene phrase. Rewrite as `"a duckling watching its own mirror image"` — introduces "mirror image" as an incidental vocabulary enrichment appropriate for 8-12 learners, while removing the verbatim tell.

---

## 🔬 Architecture Recommendation (對齊業界 2026) — ARCH-REC #173

### Research basis

| Source | Finding |
|--------|---------|
| Iimura 2019 (J-STAGE) — 46 TOEIC listening items | Verbatim overlap is a **distractor** property, not a key property. Correct options that share exact n-grams with audio fail construct validity. |
| Buck 2001 *Assessing Listening* (Cambridge UP) | Verbatim correct options reduce validity by rewarding bottom-up decoding rather than meaning construction. Exception: form-fill tasks (exact transcription is the target construct). |
| Frontiers 2025 (PMC12605125) | Emoji-label matching tests semantic congruency, not inference — exempt from paraphrase requirement. |

### Current gap

`validate-lessons.js` X48 already catches 3-gram verbatim for `listen-mc` and `listen-tf`. But:
- `picture-mc` and `comprehension` types are **not checked** (2 P0 + 8 P1 above live in these types)
- 2-gram verbatim is not caught at all (47 P2 violations)
- `emoji-pick` and `grammar-mc` are **not exempt** in X48 (generates noise)

### Recommendation: X173_R1_PARAPHRASE_LINT_EXPAND

**Pattern**: Extend X48 lint gate in `validate-lessons.js` to:
1. Add `picture-mc` and `comprehension` to the type list checked for 3-gram verbatim
2. Add explicit **type exemption list** (`emoji-pick`, `grammar-mc`) so these never fire R1 lint
3. Add 2-gram lint (warn-only, new code X173B) for `listen-mc` and `listen-comprehension` with content-word gating (skip if both grams are stop-words)

**Pickup 適配**: ✅ Fully compatible. Change is pure lint-script expansion in `tools/validate-lessons.js`, zero src/ or JSON changes. No schema change needed.

**Effort**: Low (~30 min) — extend existing regex loop, add type filter set.

**ROI**: High — catches the 2 genuine P0 and 8 P1 picture-mc/comprehension violations before they accumulate further. Also eliminates ~19 emoji-pick false positives that currently pollute X48 output.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| X173_R1_PARAPHRASE_LINT_EXPAND — extend X48 to picture-mc/comprehension; exempt emoji-pick/grammar-mc; add 2gram warn | Iimura 2019 + Buck 2001 + current gap analysis | ✅ lint-only, no src changes | Low (30 min) | High | **IMPLEMENT** |
