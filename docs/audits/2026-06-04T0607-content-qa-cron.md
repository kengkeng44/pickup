# Content QA — 2026-06-04 06:07 UTC

Today's angle: **#10 — Audio Sync (sentence text vs audio file / DOM mismatch)**
Focus: **Ch0 + Ch1** — first-time player path; Ch1 L1-L7 deep coverage check

---

## A. validate-lessons.js result

```
WARN lessons-ch0.json: 4 lint issue(s)
  kt-ch0-l2-q6: X2_OPTION_LIST_BIAS (all start with "he")
  kt-ch0-l3-q9: X2_OPTION_LIST_BIAS (all start with "her")
  kt-ch0-l3-q11: X2_OPTION_LIST_BIAS (all start with "the")
  kt-ch0-l2-q12: X2_OPTION_LIST_BIAS (all start with "he") [pre-existing]
WARN lessons-ch1.json: 11 lint issue(s) [pre-existing X2_OPTION_LIST_BIAS]
WARN lessons-ch2–ch7.json: various lint issues [pre-existing]
All schemas PASS. Build not blocked.
```

---

## B. Violation table

| # | Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|---|----|------|------|---------|-----------|------|--------------|
| 1 | Ch1 | kt-ch1-l1 ~ l3 (30 Qs) | narration / listen-mc / listen-tf / etc. | L1-L3 entire first 3 lessons | **P0 — ZERO MP3 coverage for Ch1 L1-L3.** All 30 audio-eligible questions fall back to WebSpeech. These are the entry-point lessons players hit first. No `kt-ch1-l1-q*.mp3` through `kt-ch1-l3-q*.mp3` exist. Spec R6: "Audio path = grandma OpenAI TTS MP3 (pre-recorded). WebSpeech = fallback when MP3 missing." Current state fails R6 for 43% of Ch1 (3/7 lessons). | Generate 30 MP3s for Ch1 L1-L3 sentences via OpenAI TTS. Priority: narration type first (6 narrations across L1-L3 = first storytelling impressions). | ✅ Yes — 30 sentences |
| 2 | Ch0 | kt-ch0-l1-n00, n01 | narration | "This is Mochi. A small cat with no home." / "Hi! I am Mochi. Every night, I visit Grandma for a story." | **P0 — App's very first onboarding narrations have no MP3.** Two new narration entries (`n00`, `n01`) were inserted into Ch0 L1 after audio generation. Expected files `kt-ch0-l1-n00.mp3` / `kt-ch0-l1-n01.mp3` are missing. First-launch players hear robotic WebSpeech for Mochi's self-introduction. Also: `kt-ch0-l1-q0.mp3` missing (emoji-pick "Mochi is hungry."). | Generate 3 MP3s: n00, n01, q0 sentences. n00+n01 use Mochi voice (1st-person POV per mochiTexts set), q0 grandma voice. | ✅ Yes — 3 sentences |
| 3 | Ch1 | kt-ch1-l1-q1 → l7-q1 (7 Qs) | tap-pairs | "Here are 4 words you will meet in tonight's story." | **P0 — Shared sentence locks out available MP3s via lookup collision.** tts.ts indexes the FIRST occurrence of this sentence as `kt-ch1-l1-q1`. Since `kt-ch1-l1-q1.mp3` is missing, ALL 7 lessons (L1-L7) get WebSpeech for their vocabulary intro — even L4-L7 where `kt-ch1-l4-q1.mp3` through `kt-ch1-l7-q1.mp3` DO exist. The valid MP3s are permanently shadowed by the missing L1 entry. | Fix: either (a) generate `kt-ch1-l1-q1.mp3` so the registered audioId resolves, or (b) give each lesson its own unique intro sentence text so lookups don't collide. Option (a) is 1 MP3. Option (b) preserves audio accuracy per lesson. | ✅ Yes — 1 MP3 (option a) |
| 4 | Ch1 | kt-ch1-l4-q8 | listen-comprehension | "Smoke, broken doors, and crying villagers — the demons left ruin behind." | **P1 — Em-dash in sentence.** OpenAI TTS renders `—` as a pause; WebSpeech engines vary — some say "dash" aloud, some add inconsistent pauses. This is a blind-listening question: learners should focus on content, not unexpected punctuation sounds. | Replace `—` with `. ` or `, and`: "Smoke, broken doors, and crying villagers — the demons left ruin behind." → "Smoke, broken doors, crying villagers: the demons left ruin behind." Or split into two sentences for A2 pacing. | ✅ Yes (re-gen L4-q8) |
| 5 | Ch1 | kt-ch1-l6-q8 | listen-comprehension | "A bird flew, a monkey climbed, and a dog bit — each gave its all." | **P1 — Em-dash in sentence.** Same issue as L4-q8. Affects blind-listening clarity for A2 learners. "dog bit" + dash pause sounds abrupt and incomplete. | Replace: "A bird flew, a monkey climbed, and a dog bit. Each one gave their all." Two clean sentences, natural pause, no TTS rendering ambiguity. | ✅ Yes (re-gen L6-q8) |
| 6 | Ch0 | kt-ch0-l1-n2 (orphan file) | — | — | **P1 — Orphan narration file.** `kt-ch0-l1-n2.mp3` exists in `/audio/lessons/` but JSON was updated to skip `n2` (no `kt-ch0-l1-n2` question ID). File is unreachable; wastes CDN space. | Delete `public/audio/lessons/kt-ch0-l1-n2.mp3`. | No |
| 7 | Ch1 | kt-ch1-l8 to l24 (99 files), 23 hash files | — | — | **P1 — 122 dead audio files.** 99 orphan `kt-ch1-l{8-24}-q*.mp3` files (lessons removed in JSON restructure from 24→7 lessons) + 23 unidentifiable hash-named files (old narration block chunks, now unreachable). ~3-4 MB CDN dead weight. | Delete `public/audio/lessons/kt-ch1-l{8..24}-*.mp3` and the 23 hash files. Recommend a CI check: `ls public/audio/lessons/*.mp3 | xargs -I{} basename {} .mp3 | diff - <(all_q_ids)`. | No |
| 8 | Ch1 | kt-ch1-l4-q3 | narration | "One day, bad news came from a far island in the east." | **P2 — Unnatural English phrase.** "a far island in the east" is non-standard; native phrasing is "a distant island" or "an island far to the east." Grandma's storytelling register should be idiomatic. When TTS reads it, prosody will stress "far" oddly within the noun phrase. | Rewrite: "One day, bad news came from a distant island." (simpler, A2-safe, idiomatic). | ✅ Yes (re-gen L4-q3) |
| 9 | Ch1 | kt-ch1-l4-q5 | listen-mc | "He grew fast and became known as a brave young man." | **P2 — Register mismatch.** "grew fast" is casual/informal; grandma's storytelling voice is warm-formal ("grew quickly"). Blind listeners learning English pick up register cues from TTS intonation. | "He grew quickly and became known as a brave young man." One word change, no structural change. | ✅ Yes (re-gen L4-q5) |
| 10 | Ch1 | kt-ch1-l7-q4 | listen-tf | "Empty hands had left home, but full boxes returned with them." | **P2 — Blind-listening clarity for A2.** Beautiful literary inversion (poetic prose), but in audio-only mode A2 learners lose the subject ("Momotaro" not named). "with them" has an ambiguous referent. Question: "Did Momotaro come home with nothing?" → Answer No. Learner hears inverted syntax and no subject → inference overload for A2. | "He had left home empty-handed, but he came back carrying boxes of treasure." Subject explicit, chronological order restored, A2-safe. No information lost. | ✅ Yes (re-gen L7-q4) |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total audio-eligible Qs audited (Ch0+Ch1) | 103 |
| MP3 hits (Ch0) | 30/33 = **91%** |
| MP3 hits (Ch1) | 40/70 = **57%** |
| Ch1 L1-L3 coverage | 0/30 = **0%** |
| Ch1 L4-L7 coverage | 40/40 = **100%** |
| P0 violations | **3** |
| P1 violations | **4** |
| P2 violations (narrative voice) | **3** |
| Orphan MP3 files total | **122** (99 kt-ch1-l8-l24 + 1 kt-ch0-l1-n2 + 22 hash) |
| Missing MP3 (Ch0+Ch1 scope) | **33** (30 Ch1 L1-L3 + 2 Ch0 n00/n01 + 1 Ch0 q0) |
| Audio regen recommended | **36 sentences** (priority order: Ch0 n00/n01/q0 → Ch1 L1-L3 → em-dash fixes → phrasing fixes) |

---

## D. Top 5 P0

1. **⚠️ Ch1 L1-L3 — 30 sentences, 0 MP3** (kt-ch1-l1 through l3): First 3 lessons of Ch1 always hit WebSpeech. Breaks Duolingo Stories spec R6 ("grandma TTS = primary path"). Fix: generate 30 MP3s via OpenAI TTS (grandma shimmer voice). Estimated cost: ~$0.05 at $1.50/1M chars.

2. **⚠️ Ch0 L1 n00+n01 — app first impression broken** (kt-ch0-l1-n00, n01, q0): The very first 3 audio events a new player hears are WebSpeech robot voice. Mochi's self-introduction ("This is Mochi. A small cat with no home.") is the emotional hook. Robotic voice kills brand promise. Fix: 3 MP3s via OpenAI TTS, Mochi (echo) voice for n00+n01.

3. **⚠️ Shared intro sentence lookup collision — L4-L7 MP3s shadowed** (7 lessons): `kt-ch1-l4-q1.mp3` through `kt-ch1-l7-q1.mp3` are valid, paid MP3s that will never play because tts.ts's first-wins lookup maps the shared sentence text to the missing `kt-ch1-l1-q1` audioId. Fix: generate 1 MP3 for `kt-ch1-l1-q1` (same sentence text) — 0-cost single file.

4. **⚠️ Em-dash in blind-listening sentences** (L4-q8, L6-q8): Two `listen-comprehension` questions (blind TTS) contain `—`. WebSpeech fallback will render this differently across devices/browsers — some say "dash", some insert a pause of inconsistent length. A2 learners lose comprehension. Fix: replace `—` with period+space (creates natural sentence break, TTS-safe).

5. **⚠️ 122 dead audio files on CDN** (kt-ch1-l8-l24, hash files): JSON restructure from 24→7 lessons left 99 lesson files + 23 hash-chunk files permanently unreachable. These represent wasted generation cost + CDN bandwidth. Fix: delete files, add CI orphan-detection step.

---

## E. Narrative voice / pacing improvements (mandatory 3 even if no R1-R8 violations)

All three are in the fully-covered L4-L7 zone (MP3 exists → these require audio regen if accepted):

1. **L4-q3 phrasing**: "a far island in the east" → "a distant island" — removes non-standard directional noun phrase, improves TTS stress pattern, A2-safe.

2. **L4-q5 register**: "grew fast" → "grew quickly" — aligns with grandma's warm-formal storytelling register. Casual "fast" signals modern/spoken English; "quickly" signals written/narrative register appropriate to the story context.

3. **L7-q4 blind-listening syntax**: "Empty hands had left home, but full boxes returned with them." → "He had left home empty-handed, but he came back carrying boxes of treasure." — Inversion is elegant prose but fails A2 blind-listening: no subject, ambiguous "them". Rewrite preserves emotional arc with subject-explicit, chronological structure.

---

*Audit generated: 2026-06-04 06:07 UTC | Angle: #10 Audio Sync | Focus: Ch0+Ch1*
