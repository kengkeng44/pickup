# QA Report — Ch1 L1-L10 Expansion to 12 Qs

**Scope:** `public/lessons-ch1.json`, lessons L1-L10 only. L11-L24 untouched. Ch2-Ch8 untouched.

## Per-lesson Q count (was -> now)

| Lesson | storyBeat | Was | Now | Added | Type split (final) |
|--------|-----------|-----|-----|-------|---------------------|
| L1 | Mochi 跳上矮牆 | 5 | 12 | 7 | mc=6, emoji=3, comp=3 |
| L2 | Hana 搖尾巴迎接 | 5 | 12 | 7 | mc=6, emoji=3, comp=3 |
| L3 | 奶奶打開故事書 | 5 | 12 | 7 | mc=6, emoji=3, comp=2, tap-tiles=1 (preserved) |
| L4 | 故事開始 — 從前一個雨夜 | 5 | 12 | 7 | mc=6, emoji=3, comp=2, tap-tiles=1 (preserved) |
| L5 | 小貓濕透又冷又怕 | 5 | 12 | 7 | mc=5, emoji=4, comp=3 |
| L6 | 她蜷縮在巷子角落 | 5 | 12 | 7 | mc=6, emoji=3, comp=3 |
| L7 | 大影子靠近 — 是奶奶 | 5 | 12 | 7 | mc=6, emoji=3, comp=3 |
| L8 | 奶奶撐傘為她遮雨 | 5 | 12 | 7 | mc=6, emoji=3, comp=3 |
| L9 | 奶奶溫柔說「不怕」 | 5 | 12 | 7 | mc=6, emoji=3, comp=3 |
| L10 | 奶奶蹲下,輕柔問問 | 5 | 12 | 7 | mc=6, emoji=3, comp=3 |

**Total new Qs added: 70**

## New-question type distribution (across L1-L10 only)

- `listen-mc`: 25
- `listen-comprehension`: 23
- `listen-emoji`: 22
- (No new `tap-tiles`, `tap-pairs`, or `type-what-you-hear` were added per spec.)

## 3 representative new questions

### kt-ch1-l1-q7 (listen-comprehension, L1 — Mochi 跳上矮牆)
- sentence: "I have no home of my own."
- question: "Why is {catName} a stray?"
- correct option: "she has no home"
- correct optionZh: "她沒有家"

### kt-ch1-l5-q9 (listen-comprehension, L5 — 小貓濕透又冷又怕)
- sentence: "She lost her mother last week."
- question: "Why is she alone?"
- correct option: "she lost her mother"
- correct optionZh: "她失去了媽媽"

### kt-ch1-l8-q11 (listen-comprehension, L8 — 奶奶撐傘為她遮雨)
- sentence: "Her own arm is in the rain."
- question: "Whose arm is in the rain?"
- correct option: "the woman's arm"
- correct optionZh: "女人的手臂"

## Validation

- `node tools/validate-lessons.js`: **PASS** — all 8 chapter files parse (`OK lessons-ch1.json: 24 lessons`)
- `npx vitest run tests/data/`: **PASS** — 8 test files, 28/28 tests pass
- File encoding: UTF-8 no BOM, 2-space indent, trailing newline preserved

## Constraint compliance

- Every new Q is `listen-mc`/`listen-emoji`/`listen-comprehension` only
- Every new Q has 4 options + 4 optionsZh, correctIndex 0-3
- `level: "A2"`, `difficulty: "easy"` on every new Q
- `tags` follow each lesson's existing pattern (`["story","ch1","prologue","smoke"]` for L1-L3, `["story","ch1","main","rainy-night-cat"]` for L4-L10)
- No emoji in any new text field
- No generic "Which word did you hear?" prompts — every prompt is story-anchored WH-question
- L1-L3 use `{catName}` / `{dogName}` placeholders (Mochi + Hana on stage in outer-prologue); L4-L10 use "the cat" / "she" / "the kitten" (in-story kitten ≠ narrator Mochi, matching existing pattern)
- Distractor doctrine 1+1+1+1 honored: correct + same-category (e.g. body parts, weather) + partial-truth + obvious-miss / phonological-confusable
