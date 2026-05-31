# QA Report: Question Prompts v2 (TOEIC Part 2 tightening)

**Date:** 2026-05-31
**Source script:** `tools/tighten-question-prompts.js`

## Summary

- Total non-tap prompts checked: **1039**
- Total tightened (>8 words, multi-sentence, or wrong-end-punct → single WH ≤8 words ending in ?): **154**
- Tap-tiles / tap-pairs UI prompts: untouched (per spec)
- Unmapped flagged prompts: **0** (left alone — needed hand-written rewrite)
- Failed guard checks: **0**

## Per-chapter breakdown

| Chapter | Tightened |
|---|---|
| Ch1 | 30 |
| Ch2 | 3 |
| Ch3 | 14 |
| Ch4 | 23 |
| Ch5 | 14 |
| Ch6 | 27 |
| Ch7 | 17 |
| Ch8 | 26 |

## Representative before/after pairs (first 10)

| ID | Before (words) | After (words) | Δ |
|---|---|---|---|
| `kt-ch1-l1-q1` | "{catName} has no home. What kind of cat is he?" (10) | "What kind of cat is {catName}?" (6) | −4 |
| `kt-ch1-l1-q3` | "Type what {catName} does to get on the wall." (9) | "How does {catName} get on the wall?" (7) | −2 |
| `kt-ch1-l2-q1` | "Type what {dogName}'s tail does when {catName} arrives." (8) | "What does {dogName}'s tail do?" (5) | −3 |
| `kt-ch1-l2-q3` | "Type the word for what {catName} and {dogName} are to each other." (12) | "What are {catName} and {dogName}?" (5) | −7 |
| `kt-ch1-l4-q3` | "Type the word that describes the night in the story." (10) | "How does the night feel?" (5) | −5 |
| `kt-ch1-l5-q2` | "What part of the kitten's body is soaked by the rain?" (11) | "What part of the kitten is wet?" (7) | −4 |
| `kt-ch1-l5-q3` | "Type the number of days the kitten has not eaten." (10) | "How many days without food?" (5) | −5 |
| `kt-ch1-l5-q5` | "What does the kitten do because she is so cold?" (10) | "What does the cold kitten do?" (6) | −4 |
| `kt-ch1-l6-q1` | "What does the kitten do with her body to keep warm?" (11) | "How does the kitten stay warm?" (6) | −5 |
| `kt-ch1-l6-q3` | "Type the word that says she has no one with her." (11) | "How is the kitten by herself?" (6) | −5 |

## Constraints satisfied

- Single WH-question (What/Who/Where/When/Why/How/Which/If) — verified per rewrite
- ≤ 8 words (token count, ignoring trailing `?`)
- Single sentence ending in `?` (no `.` or `!` outside quotes)
- Story-anchored when natural (mentions Mochi/Hana/Grandma/main character)
- No generic phonetic-only prompts ("Which word did you hear?" banned)
- correctIndex, options, sentence, explanationZh, tags, difficulty, level, type, id all preserved
- No new questions added or deleted
- No emoji, no Chinese in prompts

## Validation

`node tools/validate-lessons.js` output:

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

**Validation: PASS** — all 8 files parse, no BOM, totals preserved (1039 non-tap questions across 198 lessons).

## Post-rewrite invariants verified

- 0 prompts > 8 words (excluding tap-tiles / tap-pairs)
- 0 prompts ending with `.` instead of `?`
- 0 multi-sentence prompts (3 remaining hits in scan are false-positives: `"Humph!"` quoted strings in ch5 — these are within spec)
- All UTF-8 no BOM
- Total questions per chapter unchanged: ch1=120, ch2=141, ch3-8=150 each
