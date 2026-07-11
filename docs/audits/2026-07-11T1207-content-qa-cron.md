# Content QA — 2026-07-11 12:07 UTC

**Today's angle**: #10 — Audio Sync (Ch17–24 listen-mc / listen-tf quality)
**Focus**: Ch17–24 (231 answerable audio questions across 8 chapters)

**Angle definition:**
Audio Sync audits the full pipeline from stimulus sentence → TTS delivery → learner comprehension. Sub-checks:
- **AS-1**: MP3 coverage gap (grandma voice vs. Web Speech fallback)
- **AS-4**: TTS-hostile Unicode punctuation in sentence field (em-dash, curly speech quotes)
- **AS-9**: Same sentence reused ≥ 3× within one lesson (overuse)
- **AS-10**: listen-tf questionEn content-word mismatch with sentence (inference without audio grounding)
- **AS-11**: Correct option contains verbatim phrase echo from sentence (partial R1 violation)
- **AS-12**: Same sentence shared by listen-mc + listen-tf in same lesson (audio memory contamination)
- Plus: validate-lessons.js lint results (X2/X48/X49/X57) through audio lens

---

## A. validate-lessons.js result

```
WARN lessons-ch17.json: 13 lint issue(s)
WARN lessons-ch18.json: 13 lint issue(s)
WARN lessons-ch19.json: 18 lint issue(s)
WARN lessons-ch20.json: 12 lint issue(s)
WARN lessons-ch21.json: 22 lint issue(s)   ← highest in range
WARN lessons-ch22.json:  8 lint issue(s)
WARN lessons-ch23.json: 14 lint issue(s)
WARN lessons-ch24.json: 15 lint issue(s)
Total mirror-lint issues (all chapters): 441 (warn-only)
```

---

## B. Violation Table

### B1. Audio Architecture Gap (AS-1) — SYSTEMIC

`CHAPTERS_WITH_MP3 = new Set([1])` (src/audio/tts.ts:64) means all 231 audio questions in Ch17–24 use Web Speech API fallback — no grandma (OpenAI shimmer) voice. Learner hears a robotic browser voice instead of the warm grandmother persona. This breaks the "奶奶睡前英文" brand promise for every chapter beyond Ch1.

| Scope | Audio Q count | Grandma MP3 | Fallback |
|-------|--------------|-------------|---------|
| Ch1 | ~90 | ✅ shipped | — |
| Ch17–24 | 231 | ❌ none | Web Speech API |
| Ch2–16, Ch25–32 | ~600 | ❌ none | Web Speech API |

**Severity**: P0-systemic (architecture constraint, not a content bug per se — but directly affects audio construct validity for all chapters outside Ch1)

---

### B2. X49 Stimulus Reuse (audio memory contamination) — per chapter

| Ch | Qid(s) | Type | Snippet | Violation | 修法 | audio regen? |
|----|--------|------|---------|-----------|------|-------------|
| ch17 | kt-ch17-l5 | X49 | "He had many bags of gold. But his heart felt heavy." | listen-tf AND comprehension on same sentence → 2nd Q answered from memory | Assign TF question to adjacent sentence | No |
| ch17 | kt-ch17-l6 | X49 | "There was no young woman. There was a white crane." | listen-mc + listen-tf share sentence | Move TF to reveal-sentence ("The old man stepped back in shock.") | No |
| ch17 | kt-ch17-l6 | X49 | "The old man's heart broke. He could not move." | listen-mc + listen-tf share sentence | Split: MC on this, TF on next story beat | No |
| ch18 | kt-ch18-l4 | X49 | "When spring came again, the swallow came back." | listen-mc + listen-tf share sentence | Assign TF to "Big green gourds grew on the long vine." (only if that sentence doesn't also have MC) | No |
| ch18 | kt-ch18-l6 | X49×2 | "Kind Heungbu told him the whole story, word for word." + "Then he wrapped it in cloth and pretended to help." | 2 separate sentences each shared by MC+TF pairs | Stagger: one sentence → MC only, next sentence → TF only | No |
| ch19 | kt-ch19-l4 | X49 | "But the big one did not want to say he did not know." | MC+TF share sentence | Assign TF to surrounding context sentence | No |
| ch19 | kt-ch19-l6 | X49 | "On the other side of the river, mouse deer found…" | MC+TF share sentence | Split as above | No |
| ch20 | kt-ch20-l4 | X49 | "The little girl grabs the back of Grandma's apron…" | MC+TF share sentence | Reassign TF to next chain-pull sentence | No |
| ch20 | kt-ch20-l5 | X49 | "The dog uses his teeth to hold the back of…" | MC+TF share sentence | Split | No |
| ch21 | kt-ch21-l6 | X49 | "He could not see any rope on his back or any cut…" | MC+TF share sentence | Split | No |
| ch21 | kt-ch21-l7 | X49 | "Now every home, even small ones, had a story…" | MC+TF share sentence | Reassign TF to outro narration | No |
| ch23 | kt-ch23-l5 | X49 | "He could not wait. He had to do something now." | MC+TF share sentence | Split as above | No |

**Total X49 (all sub-types) in Ch17–24**: 68 instances across 8 chapters (Ch17:9, Ch18:9, Ch19:8, Ch20:7, Ch21:11, Ch22:5, Ch23:9, Ch24:10)

---

### B3. X57 Antonym Mirror (audio reduces to 2-choice) — selected

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| ch17 | kt-ch17-l3-x3 | listen-tf | — | 正解 vs 干擾項成反義 "always/never" — 4選1退化成2選1 | Replace antonym distractor with partial-parse alternative | No |
| ch17 | kt-ch17-l4-q7 | listen-mc | — | 正解 "small" vs distractor "big" — binary tell | Replace "big" with schema-driven distractor | No |
| ch18 | kt-ch18-l6-x5 | listen-tf | — | "hurt/helped" antonym pair | Replace with local-detail sub (wrong action, same object) | No |
| ch18 | kt-ch18-l7-q7 | listen-mc | — | "rich/poor" antonym pair | Replace with "comfortable" (partial parse) | No |
| ch19 | kt-ch19-l3-q9 | listen-mc | — | "soft/hard" antonym pair | Replace with "slow" (phonological neighbor) | No |
| ch19 | kt-ch19-l7-q5 | listen-mc | — | "big/small" antonym pair | Canonical fix: schema-driven alternative | No |

**Total X57 in Ch17–24**: 22 instances

---

### B4. AS-4 TTS-hostile Unicode punctuation

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| ch23 | kt-ch23-l5-x8 | listen-tf | "It was the quiet one — the boy with bright eyes." | em-dash (U+2012) causes Web Speech API unexpected pause mid-sentence | Replace `—` with comma or semicolon: "It was the quiet one, the boy with bright eyes." | No |

**Total AS-4**: 1 instance

---

### B5. AS-11 Partial echo verbatim correct

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| ch22 | kt-ch22-l7-q3 | listen-mc | S:"For many years, he sat with his books…" Correct:"many years in a row" | 2-gram "many years" echoed verbatim from sentence — word-matching shortcut | Paraphrase: "throughout his whole childhood" or "for a very long time" | No |

---

### B6. X48 Verbatim 3-gram correct option

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|-------------|
| ch17 | kt-ch17-l7-x7 | listen-mc | "the old man" 3-gram verbatim in sentence and correct option | R1 substring echo | Paraphrase: "the elderly person" or "the man who lived alone" | No |

---

### B7. X2 Option List Bias (first-letter uniformity) — Ch17–24

**Total X2**: 24 instances across Ch17–24 (notably ch19 has 6 of them)
All options start with same first token ("a", "he", "she", "by", "they") — positional and phonological tell.
*Spot check fixes*: randomise sentence subjects, use mix of noun-leading / verb-leading options.

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | Ch17–24 (8 chapters) |
| Total audio questions (listen-mc + listen-tf) | 231 |
| Chapters with grandma MP3 | 0 of 8 (Web Speech API only) |
| X49 stimulus reuse violations | 68 |
| X57 antonym mirror violations | 22 |
| X2 option list bias | 24 |
| AS-12 MC+TF same sentence pairs | 11 |
| AS-4 TTS-hostile punct | 1 |
| AS-11 partial echo | 1 |
| X48 verbatim 3-gram | 1 |
| validate-lessons.js total Ch17–24 issues | 115 |

---

## D. Top 5 P0

1. **⚠️ AS-1 SYSTEMIC**: `CHAPTERS_WITH_MP3 = Set([1])` — entire Ch17–24 (231 audio Q) delivers Web Speech API robot voice instead of grandma shimmer. 95% of shipped content has no grandma audio. Breaks core brand promise "奶奶睡前英文". Fix: extend batch TTS pipeline to Ch2+ (tool already exists: `tools/generate-grandma-audio.js`).

2. **⚠️ X49 Ch21 × 11**: Highest X49 count in range — ch21 has 11 stimulus-reuse violations including X49B comp cases. Memory-test contamination most severe in this chapter. Priority fix chapter.

3. **⚠️ X49 Ch17/Ch18 × 9 each**: Same-sentence listen-mc + listen-tf pairs (AS-12 pattern) in key story chapters (Japanese Crane Wife / Korean Heungbu) — children answer listen-tf from memory of just-heard MC sentence rather than listening again. Construct invalid.

4. **⚠️ X57 × 22 across Ch17–24**: Antonym distractors reduce 4-option audio items to effective 2-choice binary (Buck 2001: antonym distractors are the most discriminating but least valid distractor type at A2). Ch19 alone has 4 X57 violations.

5. **⚠️ ch17-l7-x7 X48 + ch22-l7-q3 AS-11**: Two verbatim-echo P0 audio gives — question explicitly quotable from sentence without listening comprehension. X48: "the old man" 3-gram, AS-11: "many years in a row" 2-gram partial echo.

---

## E. Narrative Voice / Pacing — 3 Improvement Proposals (even if 0 rule violations)

These are voice/pacing improvements independent of rule violations:

### E1. Kill metalinguistic "選「X」" tail in explanationZh

**Pattern seen**: "她煮飯、打掃——這些都是家事,**選「做家事」**。" (ch17-l3-q3)  
**Problem**: "選「X」" is test-prep register, not grandma storybook voice. An 8-year-old doesn't need to be told which option to pick — the explanation should *show* the reasoning warmly.  
**Fix template**: "她每天煮飯和打掃,把家裡照顧得好好的——這不就是家事嗎?奶奶輕輕點頭。"

### E2. Replace "A = B" equation style with story-embedded sentence

**Pattern seen**: "on the roof = 在屋頂上——鳥巢就在屋子上面。" (ch18-l3-q3)  
**Problem**: Dictionary-entry "=" notation breaks narrative immersion for child readers.  
**Fix template**: "燕子把小窩搭在屋頂上——就是我們家的頭頂正上方喔!"

### E3. Shorten explanationZh over 40 characters for mobile readability

**Pattern seen**: "她織的每一匹布,光澤都比上一匹更好看——奶奶說,那可是一根根羽毛換來的喔。" (ch17-l5-q3, 41 chars)  
**Problem**: Long explanations compete with the Continue button on small screens. CEFR A2 learners process short explanations faster.  
**Fix template**: Split into one key-concept sentence ("每一匹都比上一匹更美——越織越亮喔!") + optional detail only if needed.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**Research basis**:  
- Duolingo English Test 2025-2026 "Interactive Listening" update: one audio conversation → multiple question types (fill-in-blank → respond → summarize). The key design insight is **explicit multi-task audio** — same audio used intentionally for multiple question types in a *planned comprehension arc*, not accidental stimulus reuse. (Source: [Duolingo Test Center zendesk 2026](https://testcenter.zendesk.com/hc/en-us/articles/36094888038029))
- 2022 medical school item-reuse study: reused/disclosed items become significantly easier (PMC9662023) — memory contamination directly confirmed.
- Web Speech API docs (MDN): no SSML support; em-dash, non-ASCII smart quotes may produce inconsistent browser behavior depending on voice engine (Chrome TTS vs. Safari WebKit TTS behave differently with U+2013/U+2019 in possessives vs. speech markers).

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| **Staged batch TTS — extend grandma MP3 to Ch2–24 in priority order** | OpenAI TTS pipeline already in `tools/generate-grandma-audio.js` | ✅ Perfect fit — tool exists, just extend `CHAPTERS_WITH_MP3` set after generating files | Medium (batch job + CF Pages deploy) | ⭐⭐⭐⭐⭐ HIGH — fixes systemic AS-1 gap across 95% of content | **ARCH-REC #142** |
| **Duolingo-style intentional multi-task audio arc (replace accidental X49 with structured listen-comprehension flow)** | Duolingo Interactive Listening 2025 | 🟡 Partial — restructure each lesson so same-sentence pairs become planned (narration → MC → TF progression), not accidental | High (redesign lesson template) | Medium — reduces X49 by design, improves construct validity | Consider post-audio-expansion |
| **Text normalization pass before Web Speech utterance** | MDN Web Speech API / browser TTS notes | ✅ Easy win — in `tts.ts` speak() function, normalize em-dash → comma, curly quotes → straight before passing to `SpeechSynthesisUtterance` | Low (3 lines in tts.ts) | Low-Medium (1 instance now, prevents future regression) | Do it |

**ARCH-REC #142: X89_GRANDMA_AUDIO_EXPANSION**

**Research source:**
- Duolingo Interactive Listening 2025-2026 update: structured multi-task audio comprehension arc — one conversation → fill-in-blank → respond → summarize. Core insight: *intentional* multi-task audio vs. accidental stimulus reuse (X49). (Source: Duolingo Test Center 2026)
- PMC9662023 (medical school item reuse study): reused stimuli become significantly easier — memory contamination confirmed. Pickup's X49 pattern (same sentence for MC + TF) replicates this failure.
- MDN Web Speech API: no SSML support, inconsistent handling of em-dash / non-ASCII smart quotes across Chrome vs. Safari WebKit TTS. Pre-normalize text before passing to `SpeechSynthesisUtterance`.

**Pickup 現狀:** `CHAPTERS_WITH_MP3 = new Set([1])` (src/audio/tts.ts:64) — only Ch1 (~90 Q) has grandma shimmer MP3. Ch2–32 (estimated 800+ audio Q) all fall to Web Speech API robot voice. 95% of shipped content has no grandma audio. This breaks "奶奶睡前英文" brand for every chapter beyond Ch1. Tool to generate more already exists: `tools/generate-grandma-audio.js`.

**Recommendation:**
Run `tools/generate-grandma-audio.js` for Ch2–8 first (core story arc), then expand to Ch9–32. After MP3 files are generated and deployed to CF Pages `/audio/lessons/`, extend `CHAPTERS_WITH_MP3` set in `src/audio/tts.ts`.

Estimated cost: Ch2–8 ≈ 200 unique sentences × ~$0.015/1K chars ≈ **$1–2 USD**. Full Ch2–32 ≈ **$10–15 USD**. Zero bundle impact (files served from CF CDN, not bundled).

Bonus quick-win: in `speak()` function (`src/audio/tts.ts`), add 3-line text normalization before passing to `SpeechSynthesisUtterance`:
```js
text = text.replace(/—/g, ', ').replace(/[""]/g, '"').replace(/['']/g, "'");
```
This prevents em-dash pause artifacts (1 current instance: ch23-l5-x8) and future regressions.
