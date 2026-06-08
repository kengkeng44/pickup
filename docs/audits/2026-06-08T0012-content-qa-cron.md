# Content QA — 2026-06-08 00:12 UTC

Today's angle: **#10 — Audio Sync (sentence text vs audio file / DOM mismatch) — ROUND 2**
Focus: **Ch1 L4-L7 sentence-drift analysis + Ch0 lookup coverage gap + Ch2-5 WebSpeech TTS hazards**

> *Round 1 (2026-06-04T0607) covered Ch0+Ch1 file-presence. This round goes deeper: verifying whether MP3 files that DO exist still say the right words, discovering lookup coverage gaps, and scanning Ch2-5 for WebSpeech rendering hazards.*

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 2 lint issue(s):
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
WARN lessons-ch19.json: 5 lint issue(s): X2_OPTION_LIST_BIAS (various)
WARN lessons-ch21.json: 10 lint issue(s): X2_OPTION_LIST_BIAS (various)
WARN lessons-ch27.json: 8 lint issue(s): R1_SUBSTRING + X2_OPTION_LIST_BIAS + X3_R1_VERBATIM_WORDS
WARN lessons-ch28.json: 12 lint issue(s): R1_SUBSTRING + X2_OPTION_LIST_BIAS
All schemas PASS. Build not blocked.
```

---

## B. Violation table

| # | Ch | Q ID | Type | Snippet | Violation | 修法 | Audio regen? |
|---|----|------|------|---------|-----------|------|--------------|
| 1 | Ch1 | kt-ch1-l4-q1 through kt-ch1-l7-q5 (20 Qs) | narration / listen-mc / listen-tf | L4-Q1: screen="Here are 4 words…" MP3 says="Grandma says, 'Long ago, on a rainy night...'" / L4-Q2: screen="His mother packed special millet dumplings…" MP3 says="The rain falls hard all night." / L4-Q3: screen="Each dumpling was tucked…" MP3 says="It is a dark night." (×20 total) | **P0 — CATASTROPHIC audio-text mismatch for entire L4-L7 Q1-Q5 block.** The JSON was fully rewritten from a 1st-person cat-POV story to the Momotaro story after the MP3s were generated. `generate-grandma-audio.js` is idempotent (skips existing files), so Q1-Q5 MP3s were never regenerated. `tts.ts` now indexes the NEW sentences → same `audioId` → plays OLD MP3. A8-12 child hears: "The rain falls hard all night" / "She curls into a small ball" / "The cat is afraid" while reading the Momotaro sailing-to-Demon-Island storyline. Total learning breakdown: mismatched audio + text = confusion, not comprehension. L4-Q6 through L7-Q11 are fine (generated after rewrite). | Delete the 20 stale MP3s (`kt-ch1-l{4-7}-q{1-5}.mp3`) and re-run `node tools/generate-grandma-audio.js 1`. The idempotent flag will regenerate only the deleted 20. | ✅ Yes — 20 sentences |
| 2 | Ch0 | all 78 Q across kt-ch0-l1 through kt-ch0-l7 | all types | "A is for apple." / "One." / "Red." / — | **P0 — CHAPTERS_WITH_MP3 = new Set([1]) excludes Ch0.** `tts.ts:67` only fetches `lessons-ch1.json` for the audio lookup. 38 Ch0 MP3 files sit on disk (`kt-ch0-l1-q1.mp3` through `kt-ch0-l3-q9.mp3`) but are never indexed. Ch0 ground-floor (A0 entry path, recommended to first-time players by the level test) has **0% actual audio playback at runtime** despite appearing to have partial coverage in file-presence checks. The prior audit (06-04) incorrectly reported "Ch0 91% coverage" by measuring file presence, not lookup registration. | **Option A (recommended):** Add `0` to CHAPTERS_WITH_MP3: `new Set([0, 1])`. Then fix Ch0 orphaned files (see violation #4). **Option B:** Accept Ch0 as WebSpeech-only (document the decision in CLAUDE.md + delete 38 dead files). | No (files exist; fix is in tts.ts) |
| 3 | Ch1 | kt-ch1-l1-q1 through kt-ch1-l3-q11 (33 Qs) | all types | "Long ago, an old man and woman lived in a small village." / "The old woman pulled the heavy peach…" / "Inside the peach was a tiny baby boy…" | **P0 escalated — 33 Q still missing MP3 after 4-day gap.** Prior audit (2026-06-04 P0 #1) identified this. Unfixed. First 3 lessons of Ch1 are the story entry point. All 33 audio events fall back to WebSpeech robot voice. For the target audience (8-12 children / 親子家庭), robotic TTS in the narrative opening destroys the "grandma bedtime story" brand promise. Every new Ch1 player hits this on their first session. | Run `node tools/generate-grandma-audio.js 1` AFTER fixing mismatch (#1). The script will generate all 33 missing files in one pass. | ✅ Yes — 33 sentences |
| 4 | Ch0 | kt-ch0-l1-n1.mp3 through kt-ch0-l1-n6.mp3 (6 files), kt-ch0-l2-q11.mp3, kt-ch0-l2-q12.mp3, kt-ch0-l3-q11.mp3, kt-ch0-l3-q12.mp3 (4 files) | — | — | **P1 — 10 orphaned Ch0 audio files from schema migration.** Ch0 narration IDs were renamed from `n1-n6` format to `n00/n01/n9/n10` format during a schema update. Old `kt-ch0-l1-n1.mp3` through `kt-ch0-l1-n6.mp3` will never match any JSON ID. Ch0 L2 and L3 had 12 Q (q1-q12) but current JSON goes to Q10 — `q11.mp3`/`q12.mp3` for each orphaned. Even if violation #2 is fixed and CHAPTERS_WITH_MP3 includes Ch0, these 10 files remain unreachable. | Delete: `public/audio/lessons/kt-ch0-l1-n{1..6}.mp3` `kt-ch0-l2-q1{1,2}.mp3` `kt-ch0-l3-q1{1,2}.mp3`. | No |
| 5 | Ch1 | kt-ch1-l4-q1 (collision) | tap-pairs | "Here are 4 words you will meet in tonight's story." | **P1 — Shared intro sentence lookup collision (prior P0 #3, still open).** All 7 Ch1 lessons share this identical sentence. tts.ts first-wins indexing registers it to `kt-ch1-l1-q1` (first occurrence). That MP3 is currently missing, so ALL 7 lesson intros hit WebSpeech. Additionally, Q1 in L4-L7 have stale MP3s that say different text (violation #1 subcase). Fixing violation #1 (deleting + regenerating) + violation #3 (generating L1-L3) together resolves this: once `kt-ch1-l1-q1.mp3` exists, all 7 lesson intros play the correct grandma audio. | Fix covered by violations #1 + #3 combined. No separate action needed once both are done. | ✅ Covered by #1+#3 |
| 6 | Ch2-5 | kt-ch2-l1-q11, kt-ch2-l2-q3, kt-ch2-l2-q11, kt-ch2-l3-q11, … (26 total) | narration / listen-mc | Ch2 L2-Q3: "Out came a baby duck — but he was large and grey." / Ch3 L3-Q11: "He sat down on the soft grass. His eyes closed slowly…" | **P2 — 26 TTS-problematic characters in Ch2-5 listen/narration sentences.** Em-dashes (`—`) and ellipses (`...`) render inconsistently in WebSpeech TTS across iOS/Android/Desktop browsers. Em-dash: some engines pause, some speak "dash", some ignore. Ellipsis: some say "dot dot dot", others extend vowel, others add silence. Since Ch2-5 have 0% MP3 coverage and will remain WebSpeech for the foreseeable future, these 26 sentences will sound inconsistent depending on the player's device. **The Q11-cliffhanger ellipsis pattern is systematic across all 7 lessons of Ch2-5** (lesson-ending hook narrative). | (a) Replace `—` with `. ` or `, and`: "Out came a baby duck — but he was large and grey." → "Out came a baby duck. But he was large and grey." (b) Replace lesson-ending `...` cliffhanger with `. …` (U+2026 single character — WebSpeech renders better) or simply `.` and rely on narrative context for suspension. 26 sentences × 1-word fix each. | No (WebSpeech; no regen) |

---

## C. Stats

| Metric | Value |
|--------|-------|
| Chapters fully audited | Ch0, Ch1 (deep), Ch2-5 (TTS scan) |
| Ch0 actual audio coverage at runtime | 0% (all 38 files unreachable — lookup never built) |
| Ch1 L1-L3 coverage | 0/33 = **0%** (missing MP3) |
| Ch1 L4-L7 Q1-Q5 coverage | 20/20 files exist — but **100% WRONG TEXT** (mismatch) |
| Ch1 L4-L7 Q6-Q11 coverage | 24/24 = correct (regenerated post-rewrite) |
| P0 violations | **3** (mismatch + Ch0 lookup gap + L1-L3 still missing) |
| P1 violations | **2** (orphaned Ch0 files + lookup collision) |
| P2 violations | **1** (Ch2-5 TTS chars) |
| Total stale MP3s to delete | 20 (mismatch L4-L7 Q1-Q5) + 10 (Ch0 orphans) = **30** |
| Orphaned legacy files total | 30 (above) + 118 previously identified (Ch1 L8-L24 + kt-ch1-01-08) = **148** |
| Missing MP3 to generate | 20 (mismatch, after delete) + 33 (Ch1 L1-L3) = **53** |
| Audio regen cost estimate | ~53 sentences × ~8 words avg = ~424 words → <$0.01 at OpenAI TTS pricing |
| Prior P0s resolved since June 4 | **0 of 3** |

---

## D. Top 5 P0

### ⚠️ P0 #1 — Ch1 L4-L7 Q1-Q5: 20 audio files play wrong story entirely

**Impact**: Every player who reaches Lessons 4-7 (the main Momotaro adventure arc, ~3-4 sessions in) hears a sad stray cat story while reading about Momotaro defeating demons. Maximum learning disruption for an 8-12 child: the "grandmother reading a story" audio contradicts the text on screen sentence by sentence.

**Root cause**: `generate-grandma-audio.js` idempotent flag + JSON story rewrite after generation.

**Fix** (5 min):
```bash
# Delete the 20 stale MP3s
for l in 4 5 6 7; do
  for q in 1 2 3 4 5; do
    rm -f public/audio/lessons/kt-ch1-l${l}-q${q}.mp3
  done
done
# Regenerate (idempotent — only missing files)
OPENAI_API_KEY=... node tools/generate-grandma-audio.js 1
```

**Evidence**: `tools/_backup_lessons-ch1.json` (pre-rewrite JSON) vs current `public/lessons-ch1.json` — Q1-Q5 sentences differ completely for L4-L7 across all 4 lessons.

---

### ⚠️ P0 #2 — CHAPTERS_WITH_MP3 excludes Ch0: 38 MP3 files permanently orphaned

**Impact**: Ch0 ground-floor is the entry lesson for A0 players (zero English experience). The level test at `src/react-app/components/LevelTest.tsx:178-179` routes beginners to Ch0. These players hear robotic WebSpeech TTS for every narration and listen question, breaking the "grandma voice" brand promise at its most critical moment (first impression).

**Root cause**: `src/audio/tts.ts:60` — `CHAPTERS_WITH_MP3 = new Set([1])`. Ch0 was not in scope during initial MP3 generation.

**Fix options**:
- **Option A** (register Ch0 audio): Change `new Set([1])` → `new Set([0, 1])` in `tts.ts:60`. Also fix orphaned `n1-n6` IDs → generate matching `n00/n01/n9/n10` variants. File: `src/audio/tts.ts:60`.
- **Option B** (accept WebSpeech for Ch0): Delete 38 files from CDN, document as intentional. Saves ~1 MB CDN.

**Recommended**: Option A — Ch0 is the first player experience.

---

### ⚠️ P0 #3 escalated — Ch1 L1-L3 (33 Q) 4-day open P0

**Impact**: These are the FIRST 3 lessons of Ch1, the main story chapter. Every new player starts here. Prior P0 identified June 4, still open June 8. Grandma bedtime story brand promise broken for every new user.

**Fix**: Run `node tools/generate-grandma-audio.js 1` after deleting the 20 stale files (P0 #1 fix). Single command generates all 53 needed files.

---

### P1 #4 — Ch0 orphaned n1-n6 format files (10 files)

These were never caught because CHAPTERS_WITH_MP3 excluded Ch0 — the mismatch was invisible. Once P0 #2 is fixed, these 10 files would silently remain unreachable and take up CDN space.

**Fix**: `rm public/audio/lessons/kt-ch0-l1-n{1,2,3,4,5,6}.mp3 kt-ch0-l2-q11.mp3 kt-ch0-l2-q12.mp3 kt-ch0-l3-q11.mp3 kt-ch0-l3-q12.mp3`

---

### P2 #5 — 26 WebSpeech TTS hazards in Ch2-5 (em-dash + ellipsis)

**Impact**: Ch2-5 rely entirely on WebSpeech TTS (no MP3s). Em-dash renders as "dash" on iOS Safari / some Android engines. Q11 lesson-ending ellipsis (`...`) renders as "dot dot dot" in some engines, disrupting the dramatic cliffhanger pacing.

**Fix**: Replace `—` with period+space; replace `...` with `…` (U+2026 single character, renders as pause uniformly) or `.`.

---

## E. Narrative voice / pacing improvements (mandatory 3)

All three are in L5-L7 where MP3s are correct (Q6-Q11) — fixes require audio regen:

1. **Ch1 L5-Q11 — contraction + ellipsis in grandma voice**:
   Current: `"It's too quiet," he said. "Nothing is moving on the island..." Nobody spoke.`
   Issue: `It's` is casual/contracted; grandma register uses formal `It is`. The `...` ellipsis will render inconsistently if this ever needs WebSpeech fallback.
   Fix: `"It is too quiet," he said. "Nothing moves on the island." Nobody spoke.`
   One contraction unpack + one ellipsis cleaned. Audio regen: 1 sentence.

2. **Ch1 L6-Q9 — em-dash in blind-listening comprehension**:
   Current: `His face did not show fear — only a slow, careful smile.`
   Issue: Em-dash in a `listen-mc` question creates TTS rendering gap between "fear" and "only" — some browsers add a long pause, some say "dash", breaking the sentence flow for A2 comprehension.
   Fix: `His face did not show fear. He only smiled a slow, careful smile.`
   Subject-explicit second sentence, no em-dash. Audio regen: 1 sentence.

3. **Ch1 L7-Q11 — trailing ellipsis in lesson-closing narration**:
   Current: `But Momotaro looks toward the horizon. In his pocket, one millet dumpling remains...`
   Issue: `...` cliffhanger ending is beautiful prose but TTS renders it unpredictably. The sentence also switches tense mid-sentence (past-tense story → present-tense observation `looks`).
   Fix: `But Momotaro looks toward the horizon. In his pocket, one millet dumpling remains.`
   Remove `...`, keep the intentional present-tense close (emotional hook maintained through word choice alone). Audio regen: 1 sentence.

---

## F. Technical note: audit methodology correction

The prior audio-sync audit (2026-06-04T0607) measured audio coverage by checking file presence on disk. This gave false positives for:
- Ch0 (38 files present but **0% reachable** at runtime due to CHAPTERS_WITH_MP3 exclusion)
- Ch1 L4-L7 Q1-Q5 (20 files present but **100% wrong content** due to post-generation JSON rewrite)

Correct methodology: for each `q.id` + `q.sentence` pair, verify that `audioId = audioLookup.get(cleanText(applyDefaults(q.sentence)))` resolves, AND that the file `{audioId}.mp3` exists, AND that the file was generated after the last sentence edit. This requires either git history cross-referencing or idempotent delete+regen cycle.

---

*Audit generated: 2026-06-08 00:12 UTC | Angle: #10 Audio Sync Round 2 | Focus: Ch0 lookup gap + Ch1 L4-L7 sentence-drift + Ch2-5 TTS hazards*
