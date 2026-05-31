# Pickup UX Canonical Spec (consolidated)

> Single source of truth. Every commit's 3-agent audit checks against THIS doc. Updated 2026-05-31 to consolidate B.118 → B.140 accumulated rules.

## North Star

A2 Taiwanese learner enters Pickup, taps a paw on the chapter map → lesson opens → 12 TOEIC-style listen-mc questions → completes in ~2-4 min → progress saved → next lesson unlocks.

**Audio path** = grandma OpenAI TTS MP3 (pre-recorded). **WebSpeech** = fallback when MP3 missing.
**Visual paradigm** = Duolingo hybrid (listen audio + read options).

## R1 — Question card pre-reveal state

When a Q mounts (before user answers):

| Surface | Visible? | Content |
|---------|----------|---------|
| **Sentence card** | Shape only | Word-blank tokens (dashed underline per word, no readable text) + speaker icon |
| **Question prompt text** | ✅ **VISIBLE** | English WH-question ≤8 words, rendered above buttons |
| **Option buttons (A/B/C/D)** | ✅ **VISIBLE** | English option text on each button (lowercase, 1-3 words) |
| **Chinese (optionsZh)** | ❌ HIDDEN | Only show post-reveal |
| **explanationZh** | ❌ HIDDEN | Only show post-reveal |
| **Lesson title / chip** | ✅ English only | "Lesson N" + chapter titleEn |

**Audio (on speaker tap OR auto-play after Next):**
- Pre-recorded grandma MP3 plays sentence
- BGM ducks to 10% during voice, restores after
- (Future B.141+) Chain WebSpeech for "Question. <prompt>" + ABCD readout

## R2 — Post-reveal state (after user taps an option)

| Surface | Visible? | Content |
|---------|----------|---------|
| **Sentence card** | ✅ VISIBLE | Full English sentence text |
| **Question prompt** | ✅ VISIBLE | Same as pre-reveal |
| **Option buttons** | ✅ Bilingual | English (left) + 中文 (right, muted color) on each |
| **Correct highlight** | ✅ Green pill | Green background + ✓ on correct option |
| **User's wrong pick** | Red pill | Red background + ✕ on user's wrong (blindRetry first strike) |
| **Reveal panel** | ✅ Slide-up | Q + A + explanationZh (Chinese OK here) |
| **Continue → button** | ✅ Visible | Manual advance (auto-advance fires after 3s) |

## R3 — Lesson intro overlay (前情提要)

When lesson loads (before Q1):

- Top: amber "Lesson N" chip(English only)
- Big title: chapter `titleEn`(English only, e.g. "A Story in the Yard")— NOT storyBeat(那個是中文)
- Centered mascot 160×160(/mascots/calico-anchor.webp)
- 4 sentence-preview rows(mini-mascot + dashed underline per Q,word-count-scaled)
- Preview row tap → speak() that Q's sentence MP3 + reveal text on the row
- Green "下一步 · Next →" button at bottom
- Next click → auto-play Q1 sentence(gesture chain valid)

NO "STORY SO FAR" header. NO long EN/ZH paragraph.

## R4 — Vertical scroll lesson history

After Q1 is answered + advance fires:
- Q1 snapshots into a "frozen card" in `#pickup-lesson-history` container above current Q area
- Card shows: Q# + ✓/✕ / sentence (full) / question / 4 options with bilingual labels + user pick + correct highlight / explanationZh
- User scrolls up to see Q1 after they're on Q2
- New Q (Q2) renders in original sentEl + buttons slot below history

## R5 — Audio architecture

- All speak calls route through `tts.ts speak()` → MP3 lookup → Web Audio playback
- `AudioManager.duckBgm() / unduckBgm()` ramps BGM gain 100% ↔ 10% on speak start/end
- `stopSpeaking()` cancels Web Audio + WebSpeech atomically — called in `cleanupOverlay` + `renderQuestion`
- BGM auto-starts on LessonScene mount (idempotent, race-safe per bgm.ts contract)

## R6 — TOEIC question quality (lint rules — must pass)

Per `pickup-q-design-standard-v1.md`:

- **R1-paraphrase**: correct option MUST NOT be substring of sentence (Buck 1991/2001 verbatim ban)
- **A6**: option MUST NOT be substring of question
- **A7**: repeated content-word from sentence should be a distractor, not correct
- **R3**: correctIndex distribution ~3 each per 12-Q lesson
- **R6**: sub-skill variety ≥3 gist + ≥5 detail + ≥2 inference + ≥2 vocab per lesson
- **R7**: WH-question 5-8 words single sentence
- **R8**: A2 vocab (GSL-2000)
- **No emoji** in question/options/optionsZh
- **No Chinese in question/options/sentence** (English only pre-reveal)
- **`{catName}`/`{dogName}`** placeholders OK in JSON, loader substitutes at runtime

## R7 — Speech rate

- All TTS at 0.7 rate (~108 wpm A2 sustainable)
- Pre-recorded MP3 plays at native speed (~120 wpm grandma OpenAI TTS)
- Consistent across sentence / question / options

## R8 — Speaker icon

- /mascots/icon-speaker.webp(cute-eyes flat icon),no orange disc background
- 44×44 transparent button(Apple HIG touch target)+ 40×40 inner img

## R9 — Post-iteration audit (3-agent rule)

Every commit dispatches:
1. **QA agent** — content vs this doc + pickup-q-design-standard-v1.md R1-R8 + A1-A7
2. **Bug-check agent** — code health: dead code / iOS / leak / race / schema sync
3. **Audio-Text Consistency agent** — speakerText vs DOM vs explanationZh tri-cross
4. (Optional) **UX compliance agent** — verify every surface listed in this doc is in the spec'd state

If any blocks ship → must fix before next commit. Per `feedback-pickup-post-iteration-audit` memory rule.

## R10 — Capacitor / mobile target

- Final target = iOS + Android native via Capacitor + Codemagic CI
- MP3 only (Ogg/Opus iOS support only landed Safari 18.4)
- Audio session: use `capacitor-media-session` plugin for Android lock-screen
- Lesson packs: `@capacitor/filesystem` (NOT IndexedDB — iOS evicts)

## R11 — Memory rules referenced (all must hold)

- `feedback-pickup-listening-format` — listening UI shape
- `feedback-pickup-no-emoji-qa` — no emoji in Q/A content
- `feedback-pickup-bilingual-options` — bilingual on reveal
- `feedback-pickup-no-chinese-pre-reveal` — Chinese hidden pre-reveal
- `feedback-pickup-q-prompt-quality` — TOEIC standard
- `feedback-pickup-speech-rate` — 0.7 unified
- `feedback-pickup-placeholder-substitution` — `{catName}`/`{dogName}` loader cover
- `feedback-pickup-post-iteration-audit` — 3-agent rule
- `feedback-pickup-retry-reveal` — 2-strike blindRetry → reveal
- `feedback-perf-budget` — ≤3s first load / ≤1s repeat

## Change log

- 2026-05-31 — initial consolidation from B.118-B.140 user feedback iterations
- R1 clarified: **English question + English options ARE visible pre-reveal**(was ambiguous between B.131 hideOptionText vs Duolingo hybrid)
