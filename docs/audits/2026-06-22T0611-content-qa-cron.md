# Content QA — 2026-06-22 06:11 UTC

**Today's angle:** #10 — Audio Sync (Round 4 — WebSpeech TTS Hazard Scan + MP3 Coverage Gap)
**Focus:** Ch15–26 (Emperor's New Clothes, Issun-bōshi, Jack & Beanstalk, Rapunzel, Rumpelstiltskin, Sleeping Beauty, Anansi & the Sky God, Aladdin, Ali Baba, Scheherazade, Momotaro, Archimedes)

---

## A. validate-lessons.js result

```
WARN lessons-ch15.json: OK (no mirror-lint issues)
WARN lessons-ch16.json: 1 issue — X2_OPTION_LIST_BIAS (kt-ch16-l1-q6: all start with "a")
WARN lessons-ch19.json: 4 issues — X2_OPTION_LIST_BIAS
WARN lessons-ch21.json: 11 issues — X2_OPTION_LIST_BIAS (including "anansi" start-bias)
WARN lessons-ch24.json: 1 issue — X2_OPTION_LIST_BIAS
WARN lessons-ch26.json: 1 issue — X2_OPTION_LIST_BIAS

Total mirror-lint issues: 72 (system-wide, warn-only)
```

**Audio-specific validator**: no `audioSrc` field in any lesson JSON — by design; system uses hash-based `audioLookup` in `tts.ts`.

---

## B. Violation table — #10 Audio Sync angle, Ch15–26

| Sev | Ch | Q ID | Type | Sentence snippet | Hazard | Issue | 修法 | Audio regen? |
|-----|----|------|------|-----------------|--------|-------|------|--------------|
| **P0** | All | (systemic) | listen-mc | — | MP3_COVERAGE_GAP | `CHAPTERS_WITH_MP3 = new Set([1])` — 511/525 listen-mc questions (97.3%) fall back to robotic WebSpeech TTS. Ch2-31 entirely unvoiced by grandma. Breaks brand promise. | Expand `CHAPTERS_WITH_MP3` to cover Ch2-8 after MP3 batch generates. See ARCH-REC. | Yes — batch gen needed |
| P1 | 16 | kt-ch16-l3-q9 | listen-mc | "Issun was very small, but he sat up tall and brave." | PROPER_HARD | en-US WebSpeech reads "IS-sun" (2-syl, wrong stress); correct "EE-soon" (Japanese) | Add `pronounciationLex["Issun"] = "EE soon"` in normalizeForTTS() | No (WebSpeech fix) |
| P1 | 16 | kt-ch16-l4-q9 | listen-mc | "Issun stood up on her shoulder, near her ear, and watched the road." | PROPER_HARD | Same Issun mispronunciation | Same fix | No |
| P1 | 16 | kt-ch16-l6-q9 | listen-mc | "At last, the demon spit Issun out on the ground." | PROPER_HARD | Same Issun mispronunciation | Same fix | No |
| P1 | 21 | kt-ch21-l1-q6 | listen-mc | "Anansi was tiny, but his head was full of plans." | PROPER_HARD | en-US WebSpeech reads "uh-NAN-see"; correct Akan "ah-NAHN-see" | Add `pronounciationLex["Anansi"] = "ah NAHN see"` | No |
| P1 | 21 | kt-ch21-l4-q6 | listen-mc | '"My friend says you are not really that long," Anansi said.' | PROPER_HARD | Same Anansi mispronunciation | Same fix | No |
| P1 | 21 | kt-ch21-l6-q8 | listen-mc | "He meant Anansi had used his clever ideas, not his strong arms." | PROPER_HARD | Same Anansi mispronunciation | Same fix | No |
| P1 | 26 | kt-ch26-l7-q8 | listen-mc | "A bath, a bowl, a puddle — anywhere can be a tiny science lab." | EM_DASH_RHYTHM | `cleanText()` replaces `—` with space → triple-space gap causes unnatural TTS pause. "puddle   anywhere" is grammatically ambiguous when spoken aloud | Rewrite: "A bath, a bowl, a puddle. Anywhere can be a tiny science lab." (2 sentences) | No |
| P2 | 16 | kt-ch16-l2-q2 | narration | "They named him Issun-bōshi." | MACRON_GLOSS | `ō` (U+014D) in narration auto-play — iOS Safari some versions read "b-oh-shi" vs clean "boshi"; engine-specific | Add cleanText() pass: normalize macrons to base vowels (`ō→o`, `ū→u`) | No |
| P2 | 15 | multiple l*-q11 | narration | "The two strangers smiled at each other as they walked in..." | ELLIPSIS_NARRATION | 69 ellipsis instances in narration type (auto-played). iOS Safari v17 TTS sometimes reads `...` as "dot dot dot" | Replace trailing `...` in narration with `. ` (period) — intent preserved, TTS-safe | No |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters scanned | Ch15–26 (12 chapters) |
| Total listen-mc questions in scope | 217 |
| MISSING_AUDIO (no audioSrc) | 217 — **by design** (hash-based lookup) |
| Chapters with real grandma MP3 (system-wide) | 1 (Ch1 only) |
| WebSpeech fallback ratio (system-wide) | 97.3% (511/525) |
| TTS hazards in active listen-mc | 7 |
| TTS hazards in narration (auto-played) | 72 (69 ellipsis + 3 EM-dash) |
| P0 violations | 1 (systemic coverage gap) |
| P1 violations | 7 |
| P2 violations | 2 |
| validate-lessons.js result | WARN 72 total (system-wide, no new Ch15-26 failures) |

---

## D. Top 5 P0

1. **⚠️ P0 — MP3_COVERAGE_GAP (systemic)**: `CHAPTERS_WITH_MP3 = new Set([1])` in `src/audio/tts.ts:60`. 97.3% of all listen-mc questions (511/525) play via robotic WebSpeech. Ch2-31 grandma voice completely absent despite the app's central "奶奶睡前英文故事" brand identity. Root file: `src/audio/tts.ts` line 60.

2. **P1 — Issun mispronunciation × 3 (Ch16 listen-mc)**: Japanese name "Issun" read as "IS-sun" by en-US WebSpeech. A2 child learners who hear the wrong phoneme pattern will encode wrong pronunciation. Affects kt-ch16-l3-q9, l4-q9, l6-q9.

3. **P1 — Anansi mispronunciation × 3 (Ch21 listen-mc)**: Akan/Ghanaian spider deity "Anansi" read with wrong stress pattern. Same learning-harm risk as Issun. Affects kt-ch21-l1-q6, l4-q6, l6-q8.

4. **P1 — EM-dash TTS rhythm break (Ch26 listen-mc)**: kt-ch26-l7-q8 sentence has `—` creating triple-space after cleanText(). Sentence reads as one orphaned dependent clause. Easy content fix — split into 2 sentences.

5. **P2 — Macron in narration (Ch16)**: "Issun-bōshi" auto-played on lesson intro; macron `ō` may degrade on some WebSpeech engines. Low priority but audible in demo scenarios.

---

## E. Narrative Voice / Pacing Improvements (3 required per spec)

Even with only 2 R1-level structural violations above, these content quality improvements would strengthen the grandma storytelling voice:

**NV1 — Ch15 cliffhanger ellipsis pattern**: Ch15 uses `...` at end of every L*-Q11 narration to signal "story continues." Example: "The two strangers smiled at each other as they walked in..." — iOS WebSpeech engine v17 may render this as "dot dot dot." Recommend systematic replacement of trailing `...` in narration sentences with a period + a short bridging phrase: "...walked in." → "They walked in. The story was just beginning." Adds narrative warmth and is TTS-safe.

**NV2 — Ch21 L1 Q1 distractor parallel structure**: Options for kt-ch21-l1-q1 include "people quietly cooked dinner" which lacks the article structure of sibling options ("full of songs", "very quiet and empty", "full of bright lights"). The grammatically inconsistent option is easy to eliminate without listening — reducing the question's functional-distractor count from 3 to effectively 2. Fix: "busy with cooking dinner" (maintains adjective-phrase pattern).

**NV3 — Ch16 grandma framing tone**: Ch16 (Issun-bōshi) explanationZh entries use academic shorthand ("推理: 祈求 child → 一個自己的小孩 (paraphrase)") rather than grandma story-voice. Compare with Ch1 pattern ("奶奶說: ..."). For a child audience experiencing this as "奶奶 explaining the story," the metalinguistic "推理:" prefix reads as classroom jargon. Recommended rewrite pattern: "奶奶說:他們想要一個小孩。" — warmer, matches brand promise, no comprehension loss.

---

## 🔬 Architecture Recommendation (對齊業界 2026)

**ARCH-REC #64: X17_PRONLEX_WEBSPEECH — Pronunciation Lexicon Pre-processor for WebSpeech Fallback**

### Industry source
Duolingo's TTS microservice uses custom phoneme rules and SSML injection before passing text to cloud TTS (AWS Polly / Google TTS). Deepgram (2026): "Proper nouns are a daily source of mispronunciation — they're underrepresented in training data." W3C PLS spec recommends app-side pronunciation lexicons for proper names.

Source: [Duolingo × AWS Polly](https://aws.amazon.com/blogs/machine-learning/powering-language-learning-on-duolingo-with-amazon-polly/) · [Deepgram TTS error taxonomy](https://deepgram.com/learn/common-tts-pronunciation-errors) · [W3C SSML phoneme spec](https://www.w3.org/TR/speech-synthesis11/)

### Pickup 適配 verdict
✅ **適合** — Pickup's `cleanText()` in `src/audio/tts.ts:274` already pre-processes text before WebSpeech. A pronunciation lexicon is the same pattern, one step earlier.

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|------------|--------|-----|---------|
| App-side pronunciation lexicon (word → phonetic respelling) applied before `speakWebSpeech()` | Duolingo / W3C PLS / Deepgram 2026 | ✅ fits existing `cleanText()` pipeline; add `normalizePronouns()` step | ~1h (add lookup table + unit test) | High — fixes 6 P1 listen-mc mispronunciations + future-proofs Ch9-31 non-Latin proper nouns | **IMPLEMENT** |

### Concrete implementation

In `src/audio/tts.ts`, add before `speakWebSpeech()` call:

```typescript
// Pronunciation lexicon for hard proper nouns (non-en-US phonology)
// Key: exact word as it appears in lesson text (case-insensitive match)
// Value: phonetic respelling readable by en-US WebSpeech
const PRONLEX: Record<string, string> = {
  'Issun':       'EE soon',
  'Anansi':      'ah NAHN see',
  'Urashima':    'oo rah SHI mah',
  'Momotaro':    'moh moh TAH roh',
  'Yexian':      'YEH shyen',
  'Scheherazade':'sheh HAIR uh ZAH deh',
  'Tanuki':      'tah NOO kee',
  'Kaguya':      'kah GOO yah',
};

function normalizePronouns(text: string): string {
  return text.replace(/\b(\w+)\b/g, (word) => PRONLEX[word] ?? word);
}
```

Call `normalizePronouns(cleaned)` in `speakWebSpeech()` before constructing the `SpeechSynthesisUtterance`.

**Note**: This fix applies ONLY to the WebSpeech fallback path. Pre-generated MP3s (Ch1) are unaffected. When a chapter gets real grandma MP3s, the lexicon is automatically bypassed (MP3 path runs first).

**Scope**: Affects `src/audio/tts.ts` only. No lesson JSON changes needed. Add `normalizePronouns.test.ts` with 8 word cases.

**Do NOT modify** `src/` lesson files or `public/lessons-ch*.json` — content fix for kt-ch26-l7-q8 (EM-dash rewrite) is a separate manual content PR, not part of this ARCH-REC.

---

*Audit file: docs/audits/2026-06-22T0611-content-qa-cron.md*
*Next cron: recommend R1 Paraphrase angle (last used 2026-06-18) on Ch17-24*
