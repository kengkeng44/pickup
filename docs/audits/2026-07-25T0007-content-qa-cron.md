# Content QA — 2026-07-25 00:07 UTC

**Today's angle:** #10 — Audio Sync (TTS coverage, WebSpeech fallback, dialogue voice, queue integrity)
**Focus:** Ch9-16 (Cinderella · Chang'e · Hou Yi · Weaver Girl · Little Red Riding Hood · Urashima Taro · The Emperor's New Clothes · Issun-boshi)

---

## A. validate-lessons.js result

```
WARN lessons-ch8.json: 8 lint issues (X2/X48/X49/X57 — pre-existing)
WARN lessons-ch9.json: 8 lint issues (X2/X49/X57 — pre-existing)
Total mirror-lint issues: 440 (warn-only; set MIRROR_LINT_STRICT=1 to fail build)
```

Build gate: PASS (no new errors).

---

## B. Violation Table

**Corpus scanned:** Ch9-16 all lessons · 876 total Qs · 504 audio-requiring (narration 248 + listen-mc 78 + listen-tf 108 + comprehension 118) · 8 lessons deep-scanned for queue integrity.

| # | Sev | Ch | Q ID | Type | Sentence / snippet | Violation | 修法 | audio regen? |
|---|-----|----|------|------|--------------------|-----------|------|-------------|
| 1 | **P0** | 9-16 | (all chapters) | all audio types | ALL 504 audio-requiring entries across Ch9-16 | **AUDIO_SYNC_GLOBAL_1**: `CHAPTERS_WITH_MP3 = Set([1])` — Ch9-16 has zero grandma TTS MP3. All 504 entries use WebSpeech (robotic). Brand promise "奶奶的睡前英文故事" broken for 88% of shipped content | Batch-generate grandma MP3 for Ch9-16 with `generate-grandma-audio.js` (extend chapterId guard from 1-8 → 1-16); add ch9-16 to `CHAPTERS_WITH_MP3` | Yes (new batch) |
| 2 | **P0** | 14 | kt-ch14-l4-lg2 | comprehension | "Fish servants danced. Music played all night long. Days passed like a dream. But" (130 chars) | **AUDIO_SYNC_E1**: sentence truncated mid-clause — ends with "But" (no terminal punctuation, no subject, next clause missing). WebSpeech reads rising intonation tail with no resolution | Complete sentence: "…Days passed like a dream. But Urashima Taro did not know how long he had been there." | No (fix JSON) |
| 3 | P1 | 9 | kt-ch9-l4-q6 | narration | "\"I am your fairy godmother. Do not cry, child.\"" | **AUDIO_SYNC_D1**: direct-speech dialogue in narration — WebSpeech reads fairy godmother's voice with same flat grandma intonation. Character voice distinction absent | Mark `"speaker": "character"` → route to second TTS voice (OpenAI `echo` or `alloy`). See ARCH-REC #200 | Yes (character voice) |
| 4 | P1 | 12 | kt-ch12-l3-q4 | narration | "Her face went hard. \"Zhinu must come home and weave.\"" | AUDIO_SYNC_D1: Heavenly Queen's authoritative command read flat | Speaker tag: `"speaker": "character"` with stern voice preset | Yes |
| 5 | P1 | 12 | kt-ch12-l3-q8 | narration | "\"Zhinu, go back to the sky. Your work is up there.\"" | AUDIO_SYNC_D1: same queen command, second occurrence | Speaker tag | Yes |
| 6 | P1 | 13 | kt-ch13-l4-q11 | narration | "\"Come in, dear,\" grandma called from her bed. The door opened..." | AUDIO_SYNC_D1: wolf impersonating grandma — emotionally critical moment read flat | Speaker tag: wolf-in-disguise voice (slower, trembling). See ARCH-REC #200 | Yes |
| 7 | P1 | 14 | kt-ch14-l3-q11 | narration | "\"Stay one day,\" she says. \"Or stay forever...\"" | AUDIO_SYNC_D1: princess dialogue with ellipsis — WebSpeech drops trailing ellipsis pause | Speaker tag + replace `...` with `. Stay forever.` (terminal period restores TTS prosody) | Yes |
| 8 | P1 | 9 | kt-ch9-l3-x3,x7; l4-x3 | comprehension | "Cinderella helped them dress…" / "She tied their hair…" / "Her voice was soft…" | **AUDIO_SYNC_C1**: X49 sentence reuse — 3 sentences each play twice in same lesson (narration then comprehension). Listener hears same audio → feel of repetition not comprehension | Replace comprehension stimulus with paraphrase or adjacent story sentence | Yes (new paraphrase) |
| 9 | P1 | 10 | kt-ch10-l3-x2,x3,x5,x7 | comprehension | "But his heart was bad…" / "One day, the student saw…" / "Day after day…" / "Chang'e was home alone…" | AUDIO_SYNC_C1: 4 X49 reuse violations in single lesson | Paraphrase each comprehension sentence | Yes |
| 10 | P1 | 11 | kt-ch11-l4-x2/x3/x4/x6/x7/x9 + ttx2 | comprehension + type-translate | 6 narration sentences reused in comprehension + 1 in type-translate | AUDIO_SYNC_C1: 7 X49 violations — worst lesson in scan | Paraphrase or use adjacent sentence as comprehension stimulus | Yes |
| 11 | P1 | 12 | kt-ch12-l3-x2/x3/x4/x5/x6/x7 | comprehension | 6 narration sentences reused | AUDIO_SYNC_C1: 6 violations + 2 D1 in same lesson (worst combined score in scan) | Paraphrase comprehension stimuli | Yes |
| 12 | P1 | 13 | kt-ch13-l4-x2/x3/x4/x5/x6/x7 | comprehension | 6 narration sentences (wolf/grandma/forest) reused | AUDIO_SYNC_C1: 6 violations | Paraphrase | Yes |
| 13 | P1 | 16 | kt-ch16-l3-x2/x3/x4/x6/x7 | comprehension | 5 Issun-boshi narration sentences reused | AUDIO_SYNC_C1: 5 violations | Paraphrase | Yes |
| 14 | P2 | 9,10,11,12,13,14,15,16 | l1-vp2, l2-intro (all chapters) | tap-pairs / narration | "Four more words — can you match them all?" / "A few more words to learn — then the story begins!" | **AUDIO_SYNC_EM**: em-dash `—` in TTS queue. WebSpeech behaviour varies: Chrome reads pause, Safari may say "dash", Firefox inconsistent. 16 occurrences across Ch9-16 | Replace `—` with `,` or `;` or restructure: "Four more words: can you match them all?" | No (WebSpeech auto-adjusts if sentence restructured) |
| 15 | P2 | 1 | 24 comprehension + 12 listen-tf + 8 narration + 31 others | mixed | Ch1 has only 43/118 qid-named MP3s. 75 sentences (24 comprehension, 12 listen-tf, 8 narration, 31 misc) fall back to WebSpeech even within Ch1 | **AUDIO_SYNC_F1**: Ch1 coverage gap — comprehension and listen-tf entries were added post-audio-generation; generator not re-run | Re-run `generate-grandma-audio.js --chapter 1` after verifying new qid entries are in scope | Yes |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters audited | 9, 10, 11, 12, 13, 14, 15, 16 |
| Total questions | 876 |
| Audio-requiring Qs | 504 |
| With grandma TTS MP3 | 0 (0%) |
| On WebSpeech fallback | 504 (100%) |
| X49 reuse violations (8 sampled lessons) | 35 |
| D1 direct-speech narration violations | 5 |
| Em-dash TTS risk (P2) | 16 |
| Ch1 coverage gap | 75 / 118 (64% missing by qid) |
| Existing MP3 files | 207 non-mochi + 22 mochi = 229 total |
| Chapters shipping grandma MP3 | 1 only (CHAPTERS_WITH_MP3 hardcoded) |

---

## D. Top 5 P0

⚠️ **P0-1 — AUDIO_SYNC_GLOBAL_1 (Ch9-16, 504 entries)**: Zero grandma voice for 88% of content. Players in Ch9-16 hear robotic WebSpeech instead of the warmth that defines the brand. Fix: batch-generate MP3 and update `CHAPTERS_WITH_MP3`.

⚠️ **P0-2 — AUDIO_SYNC_E1 (kt-ch14-l4-lg2, truncated)**: Sentence ends mid-clause with "But". TTS prosody rises and never resolves — sounds like a broken recording to a child listener. Fix: complete the sentence in JSON.

**P0-3 — AUDIO_SYNC_C1 cluster (Ch11-l4, 7 violations)**: Most reuse-dense lesson scanned. Same sentence audiated as narration then as comprehension stimulus — defeats listen-first model when audio is identical.

**P0-4 — AUDIO_SYNC_C1 cluster (Ch12-l3, 6 reuse + 2 D1)**: Worst combined score. Heavenly Queen's commands fall flat; six comprehension stimuli are literal narration echoes.

**P0-5 — AUDIO_SYNC_F1 (Ch1, 75 missing)**: Ch1 is the only "MP3 chapter" but comprehension/listen-tf additions since initial generation aren't covered. First-chapter player on slow device gets WebSpeech for ~64% of sentences.

---

## E. Narrative Voice / Pacing Improvements (0 R-violations, 3 craft suggestions)

1. **Ch13-l4 repetitive knock structure**: "He knocked on the wooden door. Knock, knock, knock." — `Knock, knock, knock` will be read by WebSpeech as three separate words with flat delivery. When grandma MP3 is generated, production note: pause between each "knock" (300ms), rising then falling intonation.

2. **Ch9-l4 fairy godmother intro pacing**: "I am your fairy godmother. Do not cry, child." — currently one narration entry. More Ghibli-paced if split into two beats: `I am your fairy godmother.` (pause) `Do not cry, child.` A child listener needs time to absorb the revelation before the comfort.

3. **Ch14-l3 palace description density**: Three comprehension sentences in l3 (`x2`, `x3`, `x5`) describe the sea palace in succession. For an 8-year-old, this compresses too much imagery into one listen pass. Consider adding a brief narration beat between x3 and x5 (e.g., "Urashima blinked. He had never seen anything like it.") to let the scene breathe before the next comprehension check.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #200 — `X200_MULTI_VOICE_DIALOGUE_TAG`

**Pattern:** Per-speaker TTS routing via `speaker` field in lesson entry schema

**Source:** [ElevenLabs Eleven v3 audio tags: multi-character dialogue](https://elevenlabs.io/blog/eleven-v3-audio-tags-bringing-multi-character-dialogue-to-life) · [Duolingo DuoRadio: audio hashing + per-speaker batch generation](https://www.zenml.io/llmops-database/scaling-audio-content-generation-with-llms-and-tts-for-language-learning)

**What the industry does:** Duolingo's DuoRadio generates audio with audio hashing per speaker/role — their LLM content pipeline assigns each line a speaker tag, then TTS runs per-tag with distinct voice presets. ElevenLabs v3 supports inline audio tags `[angry]`, `[whispers]` etc. within one utterance for dramatic narration.

**Pickup 適配 analysis:**

| Criterion | Assessment |
|-----------|-----------|
| Architecture fit | ✅ Already has `mochiTexts` Set + `mochi-${hash8}` filename convention for second voice. Extending to N speakers is the same pattern |
| Schema cost | ✅ Add optional `"speaker": "grandma" \| "character" \| "narrator"` to LessonEntry — Zod discriminated union, backwards-compatible (absent = "grandma") |
| Runtime cost | ✅ `indexLookup()` already routes Mochi voice via `mochiTexts.has(text)`. Add `characterTexts: Map<text, voicePreset>` same way |
| Content scope | ✅ 5 D1 violations already identified (Ch9/12/13/14) — these are the first batch |
| Generation cost | ✅ OpenAI `alloy` + `echo` voices available via same gpt-4o-mini-tts endpoint; minimal extra API cost |
| Client target fit | ✅ HIGH — 8-12 children are the most sensitive to vocal authenticity; flat fairy-godmother voice = broken immersion |

**Effort:** 3-4h (Zod field addition + tts.ts routing extension + generator update + 5 D1 JSON fixes + 2 tests)

**ROI:** HIGH — directly resolves D1 violations that make Ch9/12/13/14 fairy-tale dialogue land flat; aligns with Ghibli warmth design pillar

**Verdict:** ✅ 適合 — implement after AUDIO_SYNC_GLOBAL_1 (MP3 batch for Ch9-16) ships; do not block on this

| Pattern | Source URL | Pickup 適配 | Effort | ROI | Verdict |
|---------|-----------|-----------|--------|-----|---------|
| Per-speaker TTS voice routing via `speaker` field | [ElevenLabs v3](https://elevenlabs.io/blog/eleven-v3-audio-tags-bringing-multi-character-dialogue-to-life) | ✅ Extends existing `mochiTexts` pattern; Zod backwards-compatible | 3-4h | HIGH | ✅ Ship after Ch9-16 MP3 batch |
| Audio hashing for batch content generation | [Duolingo DuoRadio](https://www.zenml.io/llmops-database/scaling-audio-content-generation-with-llms-and-tts-for-language-learning) | ✅ Already implemented via `hash8()` in tts.ts | 0h (done) | — | ✅ Already aligned |
| Streaming TTS (real-time, no pre-generation) | [TTS in 2026 APIs](https://dev.to/pocket_linguist/text-to-speech-in-2026-comparing-5-tts-apis-for-language-apps-606) | ❌ Requires server + latency budget; Pickup is static Cloudflare Pages | N/A | — | ❌ Not compatible with static deploy model |

---

*Angle #10 — Audio Sync. Next rotation: A1 (obvious correct / gap too easy).*
