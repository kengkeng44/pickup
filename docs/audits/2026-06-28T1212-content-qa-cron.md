# Content QA — 2026-06-28 12:12 UTC

**Today's angle:** #10 — Audio sync (WebSpeech TTS quality, stimulus reuse, MP3 coverage gap)
**Focus:** Ch25–31 (愚公移山 / Archimedes / 西遊記 / 三顧茅廬 / Odyssey / Heracles / Robin Hood)

---

## A. validate-lessons.js result

```
WARN lessons-ch25.json: 2 lint issue(s)   (X2_OPTION_LIST_BIAS)
WARN lessons-ch26.json: 2 lint issue(s)   (X2_OPTION_LIST_BIAS + X3_R1_VERBATIM)
WARN lessons-ch27.json: 10 lint issue(s)  (X2 + mirror-lint)
WARN lessons-ch28.json: 9 lint issue(s)   (X2 + mirror-lint)
Total mirror-lint issues: 106 across all chapters (warn-only)
Build: PASS (no hard failures in Ch25-31 scope)
```

---

## B. Violation Table

| Ch | Q ID | type | snippet | violation | 修法 | audio regen? |
|----|------|------|---------|-----------|------|--------------|
| 25–31 | (all) | listen-mc / listen-tf / comprehension / emoji-pick | 229 listen-type Qs, 191 unique sentences | **AUDIO_COVERAGE_GAP** — `CHAPTERS_WITH_MP3 = Set([1])` means Ch25-31 zero pre-generated MP3; all TTS falls to WebSpeech API (browser-dependent, unreliable on iOS Safari) | Extend `CHAPTERS_WITH_MP3`; run `tools/generate-grandma-audio.js` for Ch25-31 | YES — 191 new MP3s |
| 25 | kt-ch25-l4-x2/x3 | comprehension + listen-tf | "Day after day, the family dug and carried and never stopped." | **STIMULUS_REUSE** — identical sentence at comprehension (x2) then immediately listen-tf (x3); student hears WebSpeech audio once during comprehension, then listen-tf provides free second recall — degrades to recognition, not listening | Rewrite listen-tf sentence to paraphrase: "The family worked without stopping, day after day." | Only if MP3 generated |
| 25 | kt-ch25-l3-x2/x3/x6 | comprehension + 2× listen-tf | "The next morning, his sons and grandsons came with baskets." | **STIMULUS_REUSE** — 3 questions share one sentence; 2 are listen-tf after comprehension | Collapse to 1 question per sentence; vary stimulus across question types | Only if MP3 generated |
| 25 | kt-ch25-l6-x4/x6/x8/x9 | comprehension + 3× listen-tf | "The mountains cannot grow bigger. But my family goes on forever." | **STIMULUS_REUSE** — 4 questions, 3 listen-tf; same WebSpeech audio fires 4 times in same lesson | Deduplicate; use paraphrase for at least 2 of the 3 listen-tf entries | Only if MP3 generated |
| 26 | kt-ch26-l7-q8 | listen-mc | "A bath, a bowl, a puddle — anywhere can be a tiny science lab." | **EM_DASH_MANGLE** — `cleanText()` converts `—` to space → "A bath, a bowl, a puddle  anywhere can be a tiny science lab." — flat run-on; WebSpeech reads without natural pause break | Replace EM dash with colon or period: "A bath, a bowl, a puddle: anywhere can be a tiny science lab." | YES |
| 26 | kt-ch26-l7-x7 | comprehension | (same sentence as above) | **EM_DASH_MANGLE** duplicate | Same fix as q8 above | YES |
| 25–31 | 44 listen-type Qs | listen-mc / listen-tf / listen-comprehension | `"Take it to the river, one basket at a time."` / `"Eureka! Eureka!"` / etc. | **QUOTED_SPEECH_TTS** — iOS Safari WebSpeech has documented prosody breakage at `"` and `'` characters: some iOS 15–18 versions pause at open-quote, shift pitch, or (rarely) read `"` literally; affects 44 listen-type sentences in Ch25-31 | Strip outer quotes in sentences where the quote adds no grammatical value: `He said, "Take it to the river."` → `He told them to take it to the river.` For story-critical direct speech, keep but test on iOS Safari 18 | YES |
| 26 | kt-ch26-l1-intro | narration | "Long ago in the city of Syracuse, a clever man named Archimedes lived. Tonight's story…" (131 chars) | **LONG_SENTENCE** — 131 chars exceeds 120-char WebSpeech safety threshold; iOS Safari may split at internal buffer boundary causing an unnatural mid-sentence pause | Break into two sentences: "Long ago in Syracuse, a clever man named Archimedes lived. Tonight's story…" | NO (narration type, auto-speak) |
| 28 | kt-ch28-l5-q8 | listen-mc | "A good leader shows that he honors the wise, not the other way." | **WRONG_TYPE** — abstract maxim requiring inference, but typed as `listen-mc` (detail task). Mismatch between cognitive demand and task type per R6/pickup-q-design-standard | Change type to `comprehension` (inference task) | YES |
| 29 | kt-ch29-l7-q6 | listen-mc | "What made the men strong again was not just hope, but each other." | **WRONG_TYPE** — thematic gist sentence; tagged listen-mc (detail) should be listen-comprehension (gist/inference) per R6 taxonomy | Change to `listen-comprehension` or `comprehension` | YES |
| 27 | kt-ch27-l3-q6 | listen-mc | "Drink this. Remember the dust of your home," he said softly." | **CONTEXT_GAP** — A2 children in L3 (3rd lesson of Ch27) have not yet been introduced to who "he" is or why "dust of your home" matters; referent ambiguous on first listen via WebSpeech (no grandma warmup voice yet) | Add `sentenceZh: "他輕聲說：『喝這個。記住家鄉的土壤。』"` so Chinese gloss anchors context; or move to L4 after character intro | NO (sentenceZh add only) |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total entries scanned (Ch25-31) | 802 |
| Listen-type entries | 229 |
| Unique listen sentences (TTS unique) | 191 |
| Pre-generated MP3 coverage | **0 / 191 (0%)** |
| Cross-type stimulus reuse (listen-mc ↔ listen-tf same sentence, same lesson) | **109 pairs** |
| EM dash in listen-type sentence | 1 (Ch26-l7-q8) |
| EM dash in any sentence | 14 |
| Quoted speech in listen-type | 44 |
| Sentences > 120 chars | 1 |
| WRONG_TYPE cognitive mismatch | 2 |
| CONTEXT_GAP (missing referent anchor) | 1 |
| validate-lessons.js hard failures | 0 |
| validate-lessons.js WARNs (Ch25-31) | 23 |

---

## D. Top 5 P0

### P0-1 · AUDIO_COVERAGE_GAP — 229 listen Qs on WebSpeech fallback (Ch25-31)

`CHAPTERS_WITH_MP3` in `src/audio/tts.ts:60` is hardcoded to `Set([1])`. All 7 chapters (Ch25-31) and their 229 listen-type questions have no pre-generated grandma voice MP3. On iOS Safari — the primary device for 8-12 Taiwanese children — WebSpeech is documented to "stop on its own," produce choppy fragments on first attempt, and shift pitch unpredictably near punctuation. The entire listening-comprehension pedagogy of Ch25-31 is built on an unreliable audio delivery channel.

**Fix path**: Run `tools/generate-grandma-audio.js` targeting `public/lessons-ch{25..31}.json`. The djb2 `hash8()` dedup logic in `tts.ts:38` already handles identical sentences across questions — only 191 unique MP3s needed. After generation, add `25,26,27,28,29,30,31` to `CHAPTERS_WITH_MP3`. Estimated cost: ~$0.50-$1.00 OpenAI TTS API; existing pipeline already handles this.

### P0-2 · STIMULUS_REUSE — 109 same-sentence cross-type pairs within same lesson

109 story sentences are used simultaneously as the `sentence` field for both `comprehension`/`listen-mc` AND `listen-tf` questions within the same lesson. Example: Ch25 L4 `"Day after day, the family dug and carried and never stopped."` fires WebSpeech for comprehension (x2) then immediately fires again for listen-tf (x3). This is a structural **stimulus repetition violation** — Buck (2001) §5.3 specifies that multiple items sharing the same stimulus in sequence degrade from a listening test to a recognition memory test after the first item. The learner answers the listen-tf by recall, not by listening.

**Scale**: 109 pairs across Ch25-31; worst in Ch25 (13 unique sentences × 2-4 questions each) and Ch26 (12 unique sentences × 2-3 each).

**Fix path**: For each `(sentence, lesson)` pair that appears in both comprehension and listen-tf, rewrite the listen-tf sentence as a close paraphrase (≤40% content-word overlap with original). This does NOT require audio regeneration — it IS audio regeneration.

### P0-3 · EM_DASH_MANGLE — cleanText() breaks 1 listen-mc sentence

`tts.ts:283` replaces EM dash with a single space. `kt-ch26-l7-q8` sentence `"A bath, a bowl, a puddle — anywhere can be a tiny science lab."` becomes `"A bath, a bowl, a puddle  anywhere can be a tiny science lab."` — a grammatically broken run-on that WebSpeech will read flat and fast with no prosodic pause. The correct fix is to either use a colon (`:`) or period (`.`) in the source content, not the cleanText() stripper.

**Broader scope**: 14 sentences across Ch25-31 contain EM dash; only 1 is a listen-type question but all 14 are read aloud by WebSpeech on autoSpeak triggers (narration type also auto-speaks).

**Fix path**: Global find-replace in `public/lessons-ch25-31.json`: `—` → `:` where connecting two clauses as a colon, `—` → `.` where a hard break. Content edit, no schema change.

### P0-4 · QUOTED_SPEECH_TTS — 44 listen-type sentences at iOS Safari prosody risk

44 listen-type sentences in Ch25-31 use `"..."` or `'...'` direct speech. iOS Safari WebSpeech (SpeechSynthesis) documented behavior on `"` characters includes: pitch shift at open-quote mark, micro-pause before first word of quoted speech, and on some iOS 15-16 builds, reading the raw `"` character as a brief glottal stop. For 8-12 children using iPad/iPhone, this produces "broken" sounding audio that A2 learners may misinterpret as a content word.

**Most problematic pattern** (31/44 instances): `He/She said, "..."` — the comma-then-quote creates a double prosody event. Canonical fix per ETS TTS item-writing guide (2024): replace `said, "..."` with a reported-speech paraphrase when the exact quote is not the test target.

**Exceptions to keep**: Where the exact wording of the quote IS the test target (e.g., Ch26 `"Eureka! Eureka!"` — the word itself is the answer), retain the direct quote but flag for iOS TTS regression testing.

### P0-5 · WRONG_TYPE — 2 inference questions mistyped as listen-mc (detail)

- `kt-ch28-l5-q8` (`listen-mc`): `"A good leader shows that he honors the wise, not the other way."` — this is an abstract Confucian maxim requiring cultural inference, not a detail question. Correct type: `comprehension` (inference sub-skill).
- `kt-ch29-l7-q6` (`listen-mc`): `"What made the men strong again was not just hope, but each other."` — this is a thematic gist sentence (infer collective spirit from narrative arc). Correct type: `listen-comprehension` (gist sub-skill).

Both misclassifications inflate the detail-question count and suppress gist/inference diversity, violating R6 sub-skill variety standard in `pickup-q-design-standard-v1.md`.

---

## E. Narrative Voice / Pacing Improvements (3 items — even without R-code violations)

1. **Ch27 L3 context scaffolding**: Lesson 3 opens with `"Drink this. Remember the dust of your home," he said softly.` without establishing WHO speaks this or WHY. For A2 children, the pronoun "he" is unanchored. Recommend: precede with a narration entry: "The emperor gave Sanzang a cup of earth from the palace garden." This is a pacing fix, not a question fix.

2. **Ch29 storm-sequence intensity**: Lessons L5→L7 escalate from calm sailing to storm to aftermath. L5 ends with `"Odysseus felt his heart get lighter with every wave."` (hope), but L6 Q1 immediately opens with a storm sentence with no transition narration. A grandma-voice bridge narration entry before L6's first question would maintain the "奶奶在椅子上翻書" immersion and reduce cold-start disorientation for children.

3. **Ch30 L7 resolution pacing**: `"One task was done. Eleven more were waiting. Heracles walked on..."` (kt-ch30-l7-q11) ends the chapter on an open ellipsis — appropriate for episodic structure, but the ellipsis at 131 chars also ends with `...` which WebSpeech on iOS may read as "dot dot dot" or introduce a long pause. Recommend replacing `...` with a period: `"One task was done. Eleven more were waiting. Heracles walked on."` — cleaner both aurally and textually.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### Industry finding

**Duolingo + Amazon Polly (AWS Blog / ZenML case study, 2024-2026)**: Duolingo pre-generates MP3s for ALL question sentences at content-creation time via a TTS microservice. The architecture: content contributor saves a lesson → microservice detects new sentences → generates MP3 via Polly → stores on CDN → delivers pre-cached audio to clients. Zero runtime WebSpeech fallback for production content. The microservice explicitly deduplicates: same sentence text → same file ID → no re-generation. Result: "voice acting and TTS are now indistinguishable from native speakers" (2026 Duolingo review). Cost reduced 99% vs human voice actors for scale content.

**WebSpeech API state (Apple Developer Forums, 2025-2026)**: iOS Safari WebSpeech has persistent "stopping on its own," "buffer clogging," "choppy fragments" issues that have NOT been fully resolved as of iOS 18. Web apps using WebSpeech as primary audio (not fallback) for children's language learning receive 1-2 star reviews mentioning "broken voice" and "words cut off." The primary audience for Pickup (8-12 children on iPad/iPhone) is the most affected segment.

**SSML markup (ETS TTS item writing guidelines 2024)**: ETS now specifies that direct quotes in audio stimuli should use SSML `<say-as>` or `<prosody>` tags to prevent pitch-shift artifacts in neural TTS voices. For pre-generated MP3 pipelines (Polly, OpenAI TTS), these controls are available. For WebSpeech, they are not.

### Pickup 適配

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Pre-generate MP3 for ALL chapters (not just Ch1) — extend `CHAPTERS_WITH_MP3` | [AWS Blog Duolingo+Polly](https://aws.amazon.com/blogs/machine-learning/powering-language-learning-on-duolingo-with-amazon-polly/) / [ZenML case study](https://www.zenml.io/llmops-database/scaling-audio-content-generation-with-llms-and-tts-for-language-learning) | ✅ Fully applicable. `tools/generate-grandma-audio.js` + djb2 dedup already exist. Only `CHAPTERS_WITH_MP3` set needs extending after generation run. 191 unique sentences in Ch25-31. | 1-2 hr (batch generation) + $0.50-$1 API cost | **Critical** — fixes P0-1 entirely; also resolves STIMULUS_REUSE acoustic concern (unique MP3 per sentence, not repeated WebSpeech call) | **Ship immediately: highest ROI fix in this cron cycle** |
| EM dash → punctuation normalization in source JSON | Internal (cleanText analysis) | ✅ Content-only; no schema change. 14 instances across Ch25-31. | 15 min (batch sed / find-replace) | High — removes guaranteed TTS mangle at cleanText() | Fix in same commit as MP3 batch |
| SSML prosody tags for quoted speech | ETS TTS item writing 2024 | 🟡 Partial — OpenAI TTS accepts SSML-like voice instructions; can add `[voice: story-character]` metadata field to lesson schema. WebSpeech ignores SSML entirely. Only useful after P0-1 (MP3 batch) ships. | Medium (schema + generation prompt update) | Medium — only activates after full MP3 coverage | Defer until after Ch25-31 MP3 batch |
| Stimulus deduplication check in validate-lessons.js | Buck 2001 §5.3 / ETS item construction | ✅ Add `X44_STIMULUS_REUSE` lint: within each lesson, flag any `sentence` value that appears in both a `listen-mc`/`comprehension` entry AND a `listen-tf` entry | 20 min (10-line addition to validate-lessons.js) | High — catches future stimulus reuse before it ships | Ship as WARN; escalate to FAIL after content fix pass |

*ARCH-REC #90: X43_CH25_31_MP3_BATCH — Run `tools/generate-grandma-audio.js` for Ch25-31; extend `src/audio/tts.ts` `CHAPTERS_WITH_MP3` from `Set([1])` to include 25-31; follow with EM-dash normalization pass in Ch25-31 JSON. Industry benchmark: Duolingo pre-generates ALL audio at content-creation time — zero runtime WebSpeech fallback in production.*
