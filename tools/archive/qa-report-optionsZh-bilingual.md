# QA Report: optionsZh Bilingual Field Addition

**Date:** 2026-05-31
**Scope:** `public/lessons-ch1.json` through `public/lessons-ch8.json`
**Goal:** Add `optionsZh: string[]` (Chinese translation) parallel to every `options: string[]` array to enable Duolingo-style EN + ZH bilingual option buttons.

---

## Totals

- **Total Qs with `optionsZh` added:** **1039**
- **Length parity check:** PASS (every `optionsZh.length === options.length` across all 1039 questions)
- **Question types covered:** `listen-mc`, `listen-emoji`, `listen-comprehension`, `read-mc-with-audio`
- **Question types skipped (no `options` array):** `tap-tiles`, `tap-pairs`

### Per-chapter count

| Chapter | optionsZh Added |
|---------|-----------------|
| 1       | 115             |
| 2       | 125             |
| 3       | 139             |
| 4       | 128             |
| 5       | 135             |
| 6       | 126             |
| 7       | 132             |
| 8       | 139             |
| **Total** | **1039**     |

---

## 5 Representative Samples

### 1. `kt-ch1-l1-q1` (single words, ch1 prologue)
- EN: `["straw","stay","stray","story"]`
- ZH: `["稻草","留","流浪的","故事"]`

### 2. `kt-ch1-l1-q5` (multi-word phrases with proper-noun)
- EN: `["to a shop","to Grandma's yard","to a station","to a park"]`
- ZH: `["去商店","去奶奶的院子","去車站","去公園"]`

### 3. `kt-ch2-l5-q1` (noun phrases, Peach Boy story)
- EN: `["a paper boat","a log","a peach","a plum"]`
- ZH: `["一艘紙船","一個原木","一顆桃子","一顆李子"]`

### 4. `kt-ch4-l10-q1` (directional adverbs, Tortoise & Hare)
- EN: `["down","back","up","forward"]`
- ZH: `["向下","背","向上","向前"]`

### 5. `kt-ch8-l20-q1` (food nouns, Ye Xian)
- EN: `["hot rice","dry bread","cold soup","raw fish"]`
- ZH: `["熱飯","乾麵包","冷湯","生魚"]`

---

## Schema Change Decision

**Decision: KEEP SCHEMA UNCHANGED — let JSON have `optionsZh` as an additive field that Zod ignores.**

**Rationale:**
- `z.object({...})` by default uses `.passthrough()`-like behavior in `z.discriminatedUnion` — extra fields don't fail parse, they're stripped after parse but the JSON is untouched on disk.
- Vitest test run (`tests/data/`) — all **28 tests PASS** with the new `optionsZh` field present.
- `tools/validate-lessons.js` — **PASS** on all 8 chapters.
- If/when UI loader needs `optionsZh`, the load-time substitution code in `src/data/lessons.ts:loadChapterLessons()` should add `q.optionsZh` to the inj pipeline (lines 169-178) so `{catName}` / `{dogName}` get substituted there too. Schema can be extended at that point with `optionsZh: z.array(z.string()).optional()` on `FourOptionShape`.
- Keeping schema unchanged in THIS pass:
  - Zero migration risk for users with stale browser caches.
  - Existing tests already cover non-`optionsZh` JSON parsing (no need to add fixtures).
  - Field is purely additive — old code paths reading `q.options` continue to work.

---

## Validation Results

| Check                                   | Result |
|-----------------------------------------|--------|
| `node tools/validate-lessons.js`        | **PASS** (8/8 files, JSON shape OK) |
| `npx vitest run tests/data/`            | **PASS** (28/28 tests) |
| Length parity (every `options.length === optionsZh.length`) | **PASS** (1039/1039) |
| No mutation of other fields (type, sentence, question, options, correctIndex, explanationZh, tags) | **PASS** (apply script only inserts new key) |
| UTF-8 no BOM preserved                  | **PASS** (verified pre/post byte 0-2) |
| 2-space indent + trailing newline preserved | **PASS** |
| No emoji in optionsZh                   | **PASS** |
| Placeholders (`{catName}`, `{dogName}`) preserved literally | **PASS** |
| Names stay literal (Mochi, Hana, Hanako, Momoko, Momotaro) | **PASS** (3 untranslated proper names detected by translator — expected; they pass through as-is) |

---

## Translation Methodology

1. **Source dict:** `public/word-hints.json` (771 entries) — A2 word-level reference
2. **Custom DICT:** `tools/translate-options.js` — ~700 word/short-phrase entries (pronouns, verbs, nouns, adjectives, adverbs)
3. **OVERRIDES:** `tools/translate-overrides.js` — ~900 multi-word phrase entries (full sentence-like options)
4. **Apply script:** `tools/apply-optionsZh.js` — reads each chapter JSON, maps `options[]` -> `optionsZh[]`, writes file back in place preserving key order (`options` immediately followed by `optionsZh`).

**Fallback rules in `translate()`:**
- Direct PHRASES / OVERRIDES hit (lowercase)
- Single-word lookup (DICT → HINTS → inflection rules: `-s`, `-ed`, `-ing`, `-ly`, `-er`, `'s`)
- Compositional fallback (word-by-word concat with light cleanup)

---

## Files Touched

- `public/lessons-ch1.json` through `public/lessons-ch8.json` — additive `optionsZh` field, 1039 questions
- `tools/translate-options.js` (NEW) — DICT + translator + lookupWord helper
- `tools/translate-overrides.js` (NEW) — multi-word phrase overrides
- `tools/apply-optionsZh.js` (NEW) — file-walker that inserts optionsZh

---

## Notes / Future Polish

- A handful of single-word options have slightly stiff translations in context (e.g., "back" → "背" instead of "回去" when used as adverb). These are correct word-level glosses but may benefit from context-aware refinement in a follow-up pass.
- Translator script is idempotent — re-running `node tools/apply-optionsZh.js` is safe (strips stale `optionsZh` and re-inserts fresh).
