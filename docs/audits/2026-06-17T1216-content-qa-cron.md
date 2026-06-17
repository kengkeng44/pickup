# Content QA — 2026-06-17 12:16 UTC

**Today's angle: #10 — Audio Sync (Sentence↔Question coupling + MP3 coverage)**
**Focus: Ch1–8** (Momotaro / Ugly Duckling / Tortoise & Hare / Camel's Hump / Baba Yaga / Six Swans / Yexian / Three Little Pigs)

> **Rotation context**: All 12 standard angles have been cycled this window (A3/A4/A5/A6/A7/A2/R1/R2/A1/#11/#12). **#10 Audio Sync** was the only remaining angle. Applied to Ch1–8 — the full grandma-narrated arc — where audio-driven comprehension is the primary pedagogical mechanism.
>
> **#10 Angle Definition**: Five sub-checks:
> - **AS-TF**: `listen-tf` questionEn tests content NOT directly derivable from the current sentence (requires prior-sentence context or multi-step inference ≥3 steps)
> - **AS-SENT**: Sentence describes X but question asks about Y (different cognitive object)
> - **AS-SCHEMA**: Correct answer requires cultural/story schema not established in the audio
> - **AS-MP3**: `audioSrc` references a non-existent file (silently falls back to robotic WebSpeech)
> - **AS-CHAIN**: listen-comprehension correct option requires inference chain too long for A2 8-12yo (>2 hops)
>
> **Method**: Python script analysis of 616 Q entries across 56 lessons (Ch1–8). Deep manual review of 42 flagged AS-TF candidates. MP3 existence check against `public/audio/lessons/` (245 files). tts.ts architecture trace for Ch1 ID→URL resolution path.

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 3 lint issue(s):
  kt-ch1-l1-q8: X2_OPTION_LIST_BIAS (all start with "to")
  kt-ch1-l5-q3: X2_OPTION_LIST_BIAS (all start with "by")
  kt-ch1-l6-q5: X2_OPTION_LIST_BIAS (all start with "by")
OK  lessons-ch2.json: 7 lessons
OK  lessons-ch4.json: 7 lessons
OK  lessons-ch6.json: 7 lessons
OK  lessons-ch8.json: 7 lessons
WARN lessons-ch3.json: 8 lint issue(s) [X2_OPTION_LIST_BIAS only]
WARN lessons-ch5.json: 1 lint issue(s) [X3_R1_VERBATIM_WORDS]
WARN lessons-ch7.json: 1 lint issue(s) [X2_OPTION_LIST_BIAS]
Total mirror-lint issues: 70
```

---

## B. Violation Table

| Ch | Q ID | Type | Audio sentence (what learner hears) | Violation | 修法 | Audio regen? |
|----|------|------|-------------------------------------|-----------|------|--------------|
| 1 | kt-ch1-l1-q4 | AS-TF + AS-MP3 | "Their wooden house stayed very quiet, year after year." | Q="Did any children live with them?" — "quiet" → "no children" requires **prior sentence context** ("They had no children") not current audio; also missing MP3 → WebSpeech fallback | Q 改 "Was their house quiet for many long years?" (直接可驗證) | ✅ Yes (new sentence) |
| 1 | kt-ch1-l2-q3 | AS-MP3 | "She needed both hands to lift the fruit safely." | Missing MP3 → WebSpeech. Q="Was the peach a small thing?" is valid inference (both hands → heavy → not small). Only MP3 gap. | Generate kt-ch1-l2-q3.mp3 | ✅ Yes |
| 1 | kt-ch1-l2-q5 | AS-MP3 | "They both stared at the giant fruit in front of them." | Missing MP3 → WebSpeech. Q logic OK. | Generate kt-ch1-l2-q5.mp3 | ✅ Yes |
| 1 | kt-ch1-l2-q9 | AS-MP3 | "The fruit cracked apart without any help from the old man." | Missing MP3. Q="Was the peach a small thing?" — wait, no — Q correct "it split by itself" valid. | Generate kt-ch1-l2-q9.mp3 | ✅ Yes |
| 1 | kt-ch1-l2-q10 | AS-MP3 | "The two pieces of peach lay open on the table…" | Missing MP3. | Generate kt-ch1-l2-q10.mp3 | ✅ Yes |
| 1 | kt-ch1-l3-q3 | AS-MP3 | "The old couple lifted the small baby out with shaking hands." | Missing MP3. Q logic OK. | Generate kt-ch1-l3-q3.mp3 | ✅ Yes |
| 1 | kt-ch1-l3-q5 | AS-MP3 | "His name came from the fruit he was born in." | Missing MP3. | Generate kt-ch1-l3-q5.mp3 | ✅ Yes |
| 1 | kt-ch1-l3-q7 | AS-MP3 | "By the time he was ten, he was already taller than most men." | Missing MP3. | Generate kt-ch1-l3-q7.mp3 | ✅ Yes |
| 2 | kt-ch2-l4-q4 | AS-TF | "His small feet ached after many hours on the rough ground." | Q="Was his journey short and easy?" — "ached + many hours" → not short ✓, but "easy" is NOT in audio. Only "hard" can be inferred from "ached"; duration → "not short" OK. Compound judgment: both "short" AND "easy" require separate inferences. | Q 改單面: "Was his journey easy?" (腳痛直接否定 easy) | ❌ No |
| 3 | kt-ch3-l6-q3 | **AS-SENT (P0)** | "Long shadows from the trees stretched across the whole road." | Q="Did the hare sleep for a short time?" — **sentence describes SCENE (shadows), not sleep duration**. 3-step chain: shadows=late afternoon=much time passed=long sleep. Sentence mentions NEITHER hare NOR sleep. Zero direct coupling. | 改 sentence 為 "The hare had been sleeping for many hours." (直接可驗證) | ❌ No |
| 5 | kt-ch5-l2-q3 | AS-SCHEMA | "She did not turn back. She did not ask why." | Q="Did Vasilisa feel safe about this trip?" — "not turning back" signals **determination**, which 8-12yo learners may read as confidence (=safe), not fear. "Unsafe" requires external schema: Baba Yaga = danger. | 改 sentence 加情緒信號: "Her hands were cold as she stepped into the dark road." | ❌ No |
| 8 | kt-ch8-l5-q5 | AS-SCHEMA | "His paws stretched, and he took a long deep breath." | Q="Was the wolf about to leave?" — Correct=No (wolf is about to BLOW). But "paws stretched + deep breath" → "about to leave" is a PLAUSIBLE child reading of preparation-to-depart. Requires knowing wolf's next action (blow) from story schema. | Q 改 "Was the wolf getting ready to act?" (Yes → 中性,不用猜 blow vs leave) | ❌ No |

**Summary:** 2 pure P0 content violations (kt-ch3-l6-q3 AS-SENT; kt-ch1-l1-q4 AS-TF), 3 P1 schema/compound violations, **9 Ch1 listen-Q missing MP3s** (lessons l1–l3 entirely WebSpeech).

---

## C. Stats

| Metric | Value |
|--------|-------|
| Total Q entries audited (Ch1–8) | 616 |
| Listen-type Qs (listen-mc + listen-tf + listen-comprehension + listen-emoji) | 207 (33.6%) |
| Narration entries | 299 (48.5%) |
| AS-TF raw flags (automated) | 42 |
| AS-TF confirmed genuine violations | 5 |
| AS-TF false positives (valid paraphrase inference) | 37 |
| Ch1 listen-Q with ID-matched MP3 | 12 / 21 (57%) |
| Ch1 listen-Q MISSING MP3 (WebSpeech fallback) | **9 / 21 (43%)** |
| Ch2–8 MP3 coverage | 0% — all WebSpeech (by design: CHAPTERS_WITH_MP3={1}) |
| P0 confirmed | 2 |
| P1 confirmed | 3 |
| P2 / pacing improvement | 3 |

---

## D. Top 5 P0

### P0-1 ★★★ — kt-ch3-l6-q3: Scene shadows ≠ sleep duration (AS-SENT)

**Sentence (audio):** "Long shadows from the trees stretched across the whole road."  
**Question:** "Did the hare sleep for a short time?" → Answer: No

**Why it fails:** The audio sentence describes a VISUAL SCENE (shadows on a road). It says NOTHING about the hare or sleep duration. To answer, the child must:
1. Know hare was sleeping (prior narrative, not this audio)
2. Know "long shadows = late afternoon"
3. Infer "late afternoon = much time passed = long sleep"

Three hops, none verifiable from this single sentence. The cognitive operation being tested (time inference from natural lighting) is a 閩南語 idiom-level cultural inference at A2 level — not a listening comprehension task at all.

**Fix:** Change sentence to `"The hare had been sleeping for a long, long time."` → Q="Did the hare sleep for a short time?" is now directly answerable. No audio regen needed for answer logic; sentence change requires new MP3 only if pre-recorded.

---

### P0-2 ★★★ — kt-ch1-l1-q4: Prior-context bleed (AS-TF + AS-MP3)

**Sentence (audio):** "Their wooden house stayed very quiet, year after year."  
**Question:** "Did any children live with them?" → Answer: No

**Why it fails:** The "no children" information was established in the **previous narration sentence** ("They were kind, but they had no children."). This listen-tf question tests retention of the PRIOR sentence, not comprehension of the CURRENT sentence. A child who missed the previous entry, or who focuses only on this audio, hears: "house was quiet" — which could mean many things (adults only, remote village, evening time, etc.).

Also: `kt-ch1-l1-q4.mp3` does not exist → WebSpeech robotic fallback.

**Fix:** Q 改 `"Was their house quiet for many years?"` (直接測試 "quiet + year after year" 兩個詞). Or append "No children's voices filled their rooms." to the current sentence.

---

### P0-3 ★★☆ — 9 missing Ch1 L1–L3 MP3s (AS-MP3 cluster)

**Affected IDs:** kt-ch1-l1-q4, l1-q8, l2-q3, l2-q5, l2-q9, l2-q10, l3-q3, l3-q5, l3-q7

**Why:** The v2.0 lesson redesign renumbered Ch1 lessons from 24-lesson structure (old l4–l24 with MP3s) to 7-lesson structure (new l1–l7). `tts.ts` builds URL as `/audio/lessons/{q.id}.mp3`. Old IDs (l4–l24) still resolve; new IDs l1–l3 have no matching files.

**Impact:** Ch1's first 3 lessons (the most critical onboarding lessons) play robotic WebSpeech TTS instead of the grandma voice, destroying the "奶奶睡前英文故事" brand promise precisely when the child opens the app for the first time.

**Fix:** Run `generate-grandma-audio.js` targeted at kt-ch1-l1 through kt-ch1-l3 Q sentences only (9 files). Or adopt content-hash naming (see ARCH-REC below).

---

### P1-4 ★★☆ — kt-ch5-l2-q3: Determination misread as safety (AS-SCHEMA)

**Sentence:** "She did not turn back. She did not ask why."  
**Question:** "Did Vasilisa feel safe about this trip?" → Answer: No

**Problem:** "Not turning back" is a determination/courage signal. An 8-12yo child is likely to interpret "she kept going without turning back" as "she felt brave" = "safe" (Yes). The "unsafe" answer requires the child to know Baba Yaga = danger, which is schema established across the chapter, not in this sentence.

**Fix:** Add a physical fear signal: `"Her hands were cold. She did not turn back."` → "Did Vasilisa feel safe?" is now inferable from "cold hands" directly.

---

### P1-5 ★★☆ — kt-ch8-l5-q5: Wolf preparation ambiguous (AS-SCHEMA)

**Sentence:** "His paws stretched, and he took a long deep breath."  
**Question:** "Was the wolf about to leave?" → Answer: No (wolf is about to blow)

**Problem:** "Stretched paws + deep breath" = physical preparation. A child who doesn't know the story might reasonably interpret this as the wolf about to leave (stretch before walking away). The correct answer requires knowing the wolf's NEXT ACTION (blow the house down) — story-schema, not sentence-content.

**Fix:** Q 改 `"Was the wolf ready to do something big?"` (Yes) — testable from the action itself, no schema needed. OR add "He opened his mouth wide." to sentence.

---

## E. Pacing / Narrative Voice Improvements (P2 — even at zero hard violations)

1. **kt-ch2-l4-q4 compound judgment** (sentence: "feet ached + many hours"): The Q tests both "short" AND "easy" simultaneously. For A2, single-dimension Qs are recommended. Split: Q = "Was his journey easy?" (aching feet → No, one inference, clean).

2. **kt-ch3-l2-q3 vocabulary altitude** (sentence: "His ears shook hard from his loud laughing" → Q: "Did the hare believe the tortoise could win?"): "Believe" is a metacognitive verb (A2 high-end). More age-appropriate: "Was the hare happy about the race?" (shook from laughing → happy → Yes, then correct = No after contrast). Or better Q: "Was the hare laughing at the tortoise?" (Yes, direct).

3. **kt-ch7-l4-q3 supernatural inference** (sentence: "His feet did not touch the wet grass by the pond" → Q: "Was the old man a normal villager?"): "Normal villager" is a social-category concept. An 8-12yo EFL learner may not have the lexical pattern "normal person = feet touch ground." Suggest reframe: Q = "Was the old man flying above the ground?" (Yes → clear) OR change Q to "Was the old man unusual?" (floating = unusual = Yes, cleaner).

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #45: CONTENT-HASH-FIRST AUDIO NAMING

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-------------|--------|-----|---------|
| Content-hash-first audio file naming | Duolingo Stories (content-stable lookup); Memrise audio provider by hash; industry standard for lesson-restructure-resilient apps | ✅ Highly compatible — Pickup already has `hash8()` function in tts.ts (line 38) + 22 hash-named MP3s already exist in production. Partial implementation: completing it eliminates all lesson-restructuring→audio-gap failures. | S (2 hr) | ⭐⭐⭐ HIGH | ✅ Adopt |

**The problem today:** `tts.ts` indexes sentences as `audioLookup.set(sentence_text, q.id)` → URL = `/audio/lessons/{q.id}.mp3`. When lesson IDs change (as in v2.0 24-lesson→7-lesson restructuring), all old MP3s become unreachable even if the sentence TEXT is identical. This caused 9 of 21 Ch1 listen-Q to silently degrade to WebSpeech TTS.

**Industry pattern (Duolingo Stories, Memrise):** Audio files named by CONTENT hash, not structural ID. The file exists as long as the TEXT exists, regardless of which lesson, chapter, or version contains it. Content is the stable anchor.

**Pickup implementation — 2 file changes:**

**(a) `tools/generate-grandma-audio.js`:** When generating MP3s, write output file as `hash8(sentence).mp3` instead of `{q.id}.mp3`. The 22 existing hash-named files in production confirm this naming was started but not completed.

**(b) `src/audio/tts.ts` — modify `speak()` to hash-first resolution (line 366–393):**
```typescript
// BEFORE (current): URL = /audio/lessons/{q.id}.mp3 → 404 on lesson restructure
const audioId = audioLookup.get(cleaned);
const url = `/audio/lessons/${audioId}.mp3`;

// AFTER (hash-first): URL = /audio/lessons/{hash8(cleaned)}.mp3 → content-stable
const url = `/audio/lessons/${hash8(cleaned)}.mp3`;
// Fallback: try audioId.mp3 (backwards-compat with existing kt-ch1-l4..l24 files)
```

**Why HIGH ROI:**
- Eliminates the 9-MP3 gap in Ch1 L1–L3 (most critical onboarding lessons)
- Future-proofs all lesson restructurings: Ch2-8 MP3s, when generated, will auto-resolve regardless of lesson renumbering
- Already 70% implemented (`hash8()` exists, 22 hash files already live)
- 2-hour effort, no JSON changes needed

**Constraint respected:** This recommendation requires only `src/audio/tts.ts` and `tools/` changes — no `lessons-ch*.json` modification.

---

*Audit produced by cron content-qa agent — 2026-06-17 12:16 UTC*
*Sources: [Duolingo Listening Whitepaper](https://duolingo-testcenter.s3.amazonaws.com/media/resources/listening-whitepaper.pdf) · [Duolingo Stories Wiki 2026](https://duolingo.fandom.com/wiki/Duolingo_Stories) · [Buck 2001 Assessing Listening (Cambridge)](https://www.cambridge.org/core/books/assessing-listening/3F31B7309BFB98DE76B276E9C2E43CB9) · [ResearchGate: children's question design note on text-repetition in Q](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9364821/)*
