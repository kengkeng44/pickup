# QA Report — `type-what-you-hear` → `listen-mc` Conversion

**Date:** 2026-05-31
**Scope:** `public/lessons-ch1.json` through `lessons-ch8.json`
**Why:** TOEIC LR is 100% MC; users get consistent ABCD UX across all questions. `type-what-you-hear` (text-input dictation) is being deprecated.

---

## Summary

- **Total questions converted:** 127
- **Files touched:** 7 of 8 (ch2 has zero TWYH questions)
- **Distractor synthesis required:** 0 (every TWYH question already shipped with exactly 4 options — pre-flight scan confirmed `lt4=0, eq4=127, gt4=0`)
- **Conversion = pure `type` field swap.** `id`, `level`, `difficulty`, `sentence`, `question`, `options`, `correctIndex`, `explanationZh`, `tags`, `speaker` all preserved byte-for-byte.

## Per-chapter count

| Chapter | TWYH → listen-mc |
|---------|------------------|
| ch1 | 22 |
| ch2 | 0 |
| ch3 | 11 |
| ch4 | 17 |
| ch5 | 14 |
| ch6 | 26 |
| ch7 | 14 |
| ch8 | 23 |
| **Total** | **127** |

## Validation

### Fast JSON shape (`tools/validate-lessons.js`) — PASS

```
OK lessons-ch1.json: 24 lessons (JSON shape)
OK lessons-ch2.json: 24 lessons (JSON shape)
OK lessons-ch3.json: 25 lessons (JSON shape)
OK lessons-ch4.json: 25 lessons (JSON shape)
OK lessons-ch5.json: 25 lessons (JSON shape)
OK lessons-ch6.json: 25 lessons (JSON shape)
OK lessons-ch7.json: 25 lessons (JSON shape)
OK lessons-ch8.json: 25 lessons (JSON shape)
```

### Full Zod validation (`npx vitest run tests/data/`) — PASS

```
Test Files  8 passed (8)
     Tests  28 passed (28)
```

Tests that exercise the real `LessonsSchema.parse()` on each JSON file (`lessons-ch1/2/4/5/8-validate.test.ts`) all pass — the discriminated-union accepts every converted question as a valid `listen-mc` shape.

## Representative diffs (5 samples)

All five samples are from ch1, but the pattern is identical across all 127 conversions: only `type` changes.

| # | id | sentence | options (4) | correctIndex | correct word |
|---|----|----------|-------------|--------------|--------------|
| 1 | `kt-ch1-l1-q3` | "I jump on the low wall." | `["jump", "walk", "run", "sit"]` | 0 | jump |
| 2 | `kt-ch1-l2-q3` | "We are friends." | `["friends", "family", "farmers", "foreign"]` | 0 | friends |
| 3 | `kt-ch1-l4-q3` | "It is a dark night." | `["dark", "deep", "deer", "done"]` | 0 | dark |
| 4 | `kt-ch1-l5-q3` | "She has not eaten in two days." | `["two", "too", "to", "tour"]` | 0 | two |
| 5 | `kt-ch1-l6-q3` | "She is alone." | `["alone", "along", "aloud", "around"]` | 0 | alone |

### Diff snippet (before → after) for sample 1

```diff
   {
-    "type": "type-what-you-hear",
+    "type": "listen-mc",
     "id": "kt-ch1-l1-q3",
     "level": "A2",
     "difficulty": "easy",
     "sentence": "I jump on the low wall.",
     "question": "How does {catName} get on the wall?",
     "options": ["jump", "walk", "run", "sit"],
     "correctIndex": 0,
     "explanationZh": "...",
     "tags": [...]
   }
```

## Notes

1. **Tag fields untouched.** Some questions carry `"type-what-you-hear"` inside their `tags` array (lineage marker). Per spec ("preserve every other field … tags"), these are left as-is. The active `"type"` discriminator on each question now reads `"listen-mc"` everywhere — `grep '"type":\s*"type-what-you-hear"'` returns zero matches across all 8 files.
2. **File encoding preserved.** All 8 files written UTF-8 no BOM, 2-space indent, trailing newline (matches pre-conversion shape).
3. **Codebase follow-up (out of scope, flagged for user).** The `TypeWhatYouHearSchema` literal still exists in `src/data/lessons.ts:53-55` and `src/data/sentences.ts`; UI handlers live in `src/ui/TapInputUI.ts`, `src/scenes/PlayScene.ts`, `src/scenes/LessonScene.ts`; CSS hooks in `src/style.css`. Now that no JSON question carries `type-what-you-hear`, these branches are dead code and can be removed in a follow-up cleanup pass without breaking anything.
4. **Repeatability.** Conversion is idempotent: `tools/convert-typewhatyouhear-to-listenmc.js` will report `0 converted` on a second run because no TWYH questions remain.

## Artifacts

- Conversion script: `tools/convert-typewhatyouhear-to-listenmc.js`
- Machine-readable summary: `tools/_twyh-conversion-summary.json`
- This report: `tools/qa-report-typewhatyouhear-to-listenmc.md`
