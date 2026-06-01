# Pickup (拾光) — PM Audit + 4-Quarter Roadmap

> **Author:** PM agent · **Date:** 2026-06-01 · **Scope:** product audit covering CLAUDE.md, v2 canonical UX spec, competitive benchmark, lessons-ch1.json sample content, LessonScene (~1000 LOC), StoryModeScene, MenuScene, runStore (~580 LOC), and the 15 modules under `src/ui/`.
>
> **Sources read end-to-end:**
> - `C:\Users\acer\Desktop\wordwar\CLAUDE.md`
> - `C:\Users\acer\Desktop\wordwar\docs\toeic-research\pickup-ux-canonical-spec.md`
> - `C:\Users\acer\Desktop\wordwar\docs\toeic-research\mobile-app-architecture-comparison.md`
> - `C:\Users\acer\Desktop\wordwar\public\lessons-ch1.json` (first 6 lessons inspected; 8 chapter files of 110–140 KB each exist on disk)
> - `C:\Users\acer\Desktop\wordwar\src\scenes\LessonScene.ts`, `StoryModeScene.ts`, `MenuScene.ts`
> - `C:\Users\acer\Desktop\wordwar\src\store\runStore.ts`
> - `C:\Users\acer\Desktop\wordwar\src\ui\*` (file inventory + selected reads)
> - `C:\Users\acer\Desktop\wordwar\src\data\lessons.ts`, `achievements.ts`
> - `C:\Users\acer\Desktop\wordwar\public\sw.js`, `manifest.webmanifest`

---

## Executive Summary (200 words)

Pickup is a single-developer Capacitor-bound A2 English-learning app at v2.0.B.155 with a **strong narrative pillar** (奶奶說故事 cozy frame, Mochi stray-cat narrator) and an **architecturally sane** TS + Vite + Phaser-as-state-graph + DOM-UI stack. The Duolingo Stories pivot (B.142 → B.153) has landed and the canonical spec is enforced by a 4-agent post-commit audit loop — rare discipline for an indie app.

**Content depth is the silent win the team hasn't priced in.** All 8 chapter JSONs exist at ~110–140 KB with grandma OpenAI TTS MP3s pre-recorded down to `kt-ch1-l16-q5`. That's roughly 100–200 lessons of A2 content shipped — already 5–10× a typical indie MVP and within range of a paid Babbel A1 unit. The hidden risk is the **engagement layer is thin**: no Hearts/Leagues, SRS is a 5-item bug-fix (one wrong answer → permanent review queue, no SM-2 spacing), 8 binary achievement badges, zero notifications, zero analytics. The app teaches well but doesn't yet pull users back after Day 3.

**Recommendation: Engagement Path Q3 2026.** Ship streak protection + SRS upgrade + light leaderboard + push notifications BEFORE iOS App Store submission. Monetization (Premium tier) waits for Q1 2027 once a D30 retention signal exists.

---

## Top-10 Features Ranked by Impact × Ease (RICE-lite)

Reach (1–10) × Impact (1–10) × Confidence (0.1–1.0) ÷ Effort (S=1 / M=3 / L=8 dev-days). Sorted descending.

| Rank | Feature | Reach | Impact | Conf | Effort | RICE | Quarter | Why now |
|---|---|---|---|---|---|---|---|---|
| 1 | **Analytics / telemetry shim** (PostHog or Plausible) | 10 | 9 | 0.9 | S | **81.0** | Q3 | Zero signal today. Every other decision is dead reckoning until D1/D7/D30 land in a dashboard. |
| 2 | **Streak Freeze (2/month auto-consume)** | 10 | 8 | 0.9 | S | **72.0** | Q3 | Duolingo's single most effective retention lever — Pickup has `readStreak()` already, just needs the slot UI. |
| 3 | **Full SM-2 / FSRS SRS upgrade** | 8 | 9 | 0.7 | M | **16.8** | Q3 | Current SRS is "wrong once → review forever until correct once" — not spaced. Real SRS unlocks long-term recall claim. |
| 4 | **iOS App Store submission via Capacitor + Codemagic** | 10 | 9 | 0.8 | L | **9.0** | Q3 | Hard cost only ($99 Apple Dev). Unlocks the iPhone TF user base that PWAs can't fully serve. |
| 5 | **Push notifications (local + server-side)** | 9 | 8 | 0.7 | M | **16.8** | Q4 | Streak save-reminder push is the proven D7-D30 lever. Requires server-side or scheduled local notif. |
| 6 | **Leaderboard / weekly XP league** (anon, no social graph) | 7 | 7 | 0.6 | M | **9.8** | Q4 | Adds extrinsic motivation without forcing accounts. Anon league = no GDPR/COPPA blast radius. |
| 7 | **Speaking practice — single-sentence pronunciation** (WebSpeech recognition) | 6 | 8 | 0.5 | M | **8.0** | Q4 | The one major Duolingo feature Pickup lacks. WebSpeech API is free; Pickup's grandma TTS path is symmetric. |
| 8 | **Premium tier (Hearts-removal + offline-cache-all)** | 8 | 9 | 0.6 | L | **5.4** | Q1 2027 | Don't monetize before D30 signal — but design the paywall now, ship with second-platform launch. |
| 9 | **Hearts / lives system** | 9 | 5 | 0.7 | M | **10.5** | Q1 2027 | Counter-intuitive — Hearts conflict with "下班逃逸" cozy vibe. Only ship if engagement layer needs a paywall hook. |
| 10 | **B1 chapter pack (Ch9-16) — next level content** | 6 | 8 | 0.5 | L | **3.0** | Q2 2027 | Content moat, but premature before SRS + telemetry prove the A2 ladder retains. |

---

# Part 1 — Current State Audit

## 1.1 Onboarding (splash → menu → map)

**What Pickup HAS:**
- `BootScene` shows a minimalist splash with a difficulty pill (v0.13 simplified) and routes to `MenuScene`.
- `MenuScene.ts` is currently a **thin redirect** to `StoryModeScene` (per B.111: `"順便把除了情節以外的模式先刪掉"` removed the free/scenario/story picker). The menu is essentially dead code — `create()` is 5 lines.
- `StoryModeScene` boots into the `home` tab → `StoryMapView` (24-button NODE_PATH_V2 path, paw icons grey-when-locked, unlock-pop animation per v1.9.54).
- Cat name customization (`/Profile` tab, default `Mochi`) injects via `applyCatName()` at lesson load (v1.9.52).

**What's missing:**
- **No first-run welcome / tutorial.** A new user lands directly on the map. The `welcome banner "🐾 Tap any node to begin"` (v1.9.35) is the only nudge — no animated tutorial, no "tap the first paw" pulse-coaching beyond the existing pulse class.
- **No language picker** — UI is hardcoded `zh-TW + EN` bilingual; A2 Korean/Japanese learners are not addressed.
- **No account creation / login** — pure localStorage-based identity. Switching devices = total loss of streak + XP + lesson progress.

## 1.2 Lesson Flow (chapter map → node → Duolingo Stories → completion article)

**What Pickup HAS — measured from `LessonScene.ts`:**
- Lesson loads via `loadChapterLessons(chapter).then(findLesson(id))` — async with fallback to `StoryModeScene` on miss (defensive routing, B.117 fix).
- `_mountLessonUI()` mounts `GameHUD` + `ClozeUI` + `Mascot` (`calico-anchor.webp`) and immediately calls `renderQuestion(questions[0])` — no intro overlay (B.142 removed).
- **7 question types** routed by `q.type` discriminator (B.145 dispatch first):
  1. `narration` → `_renderNarration` — speaker icon + dashed-underline word decoration + auto-play + "繼續 ↓ Continue" green button. No answer required.
  2. `listen-tf` (B.147 English-only Yes/No) → `_renderListenTf` — speaker + sentence + bold English questionEn + 2 amber-border buttons + 2 s auto-advance.
  3. `listen-tf-zh` (legacy carve-out) → `_renderListenTfZh` — kept for v1 backward compat.
  4. `listen-mc` → blind 4-ABCD ClozeUI (sentence rendered as word-blank shapes, no text pre-reveal per B.118 + B.142).
  5. `listen-emoji` / `listen-comprehension` / `read-mc-with-audio` → same blind ClozeUI 4-MC.
  6. `tap-tiles` → `mountTapTiles` from `TapInputUI.ts` (variable-length tile bank).
  7. `tap-pairs` → `mountTapPairs` (match pairs).
  8. `type-what-you-hear` → `mountTypeWhatYouHear` (text input).
- **History strip** (`#pickup-lesson-history`): on commit, past entry snapshotted plain-text above the current chunk (B.150 removed colored backgrounds + ✓/✕). Duolingo Stories scroll-up behavior is faithful.
- **Completion article** (`_showCompletionArticle`, B.147): all `narration` sentences concatenated into a clean paragraph + center speaker replay + "完成 · Done" green CTA → back to `StoryModeScene`.

**What works well:**
- 14-entry-per-lesson pacing matches the canonical spec North Star ("complete ~14-entry Duolingo Stories flow in ~2-4 min").
- Audio path: `tts.ts speak()` → MP3 lookup → WebAudio fallback → WebSpeech (B.139.1 + R6 in spec).
- BGM ducking 100% ↔ 10% during voice (B.140) is in `AudioManager.duckBgm()/unduckBgm()`.

**What's brittle (LessonScene god-method risk):**
- `LessonScene.ts` is ~1000 LOC with `renderQuestion()` doing 7-way dispatch + 60+ lines of inline DOM HTML strings per branch. Adding an 8th question type means another 100 LOC inline. The mobile-arch comparison doc's R2 recommendation (extract per-Q state machine via XState) is unaddressed.
- `_snapshotAnsweredQ` / `_snapshotTf` / `_snapshotTfZh` / `_snapshotNarration` are 4 near-duplicate functions (DRY violation).
- 3 narration / 6 main / 3 aesop / 2 outro / 1 review per chapter (per spec) but actual count varies per JSON — Ch1 L1 has 6 narration + 2 TF + 6 MC = 14, matches spec. Ch1 L2 has 0 narration + 12 listen-mc/comprehension/emoji — that's just a comprehension drill, not Duolingo Stories format. **Inconsistency between canonical spec and content.**

## 1.3 Audio

**What Pickup HAS:**
- Pre-recorded grandma OpenAI TTS MP3s shipped to `public/audio/lessons/kt-ch1-l1-q1.mp3` through at least `kt-ch1-l16-q5` (counted in glob: ~80+ MP3 files visible just for Ch1).
- BGM: `peace.mp3` by ryoish (3:50 piano loop, 7.36 MB, CDN-served, not in bundle).
- SFX: `sfxCorrect` / `sfxWrong` programmatic (4-harmonic bell / sine descent).
- WebSpeech fallback at rate 0.65–0.75 for A2 sustainable pace (~100–115 wpm per B.120 / B.122).
- BGM auto-start on `LessonScene` mount (B.128 fix — was missing from v2.0 path).
- `stopSpeaking()` cancels Web Audio + WebSpeech atomically (B.139.1).

**Tech-debt flagged:**
- The mobile-arch doc warns: WKWebView starts AVAudioSession cold → first clip on iOS will stutter unless pre-warmed inside the first user gesture. **Pickup has no `AudioOrchestrator.warmUp()` step yet.** Risk surfaces when Capacitor wrap ships.
- WordHint dictionary (`public/word-hints.json`) — agent-audited in v1.9.13 to fill 7 Ch1 gaps. No coverage tooling for Ch2-8.

## 1.4 Progress Tracking

**What Pickup HAS (from `runStore.ts` + helpers):**
- **Streak**: `data/streak.ts`, persistent daily streak via localStorage (v1.9.4).
- **XP**: `data/xp.ts`, `+3` per correct answer (`+4` in listening mode), `levelForXp()` derives level.
- **Coins**: `data/coins.ts`, `+1` per correct (v1.9.16).
- **Chapter completion**: `data/storyKitten.ts readChapterProgress().highestCompleted` (0..8).
- **Per-lesson progress**: v2.0.A.6 `pickup.chapter.{N}.lessons.completed` JSON array (see `runStore.ts:540-582`).
- **SRS**: `srsReviewBatch()` + `addToSrs()` + `removeFromSrs()` in `storyKitten.ts`. Pulls up to 3 review questions before chapter NEW questions.

**Gaps:**
- No `D1 / D7 / D30 returning-user` metric — Pickup measures nothing about user return cadence.
- No `time-in-lesson` or `time-to-completion` measurement.
- Per-lesson progress only tracks completion (boolean), not score / accuracy / retry count.

## 1.5 Gamification

**What Pickup HAS:**
- **8 achievement badges** in `data/achievements.ts`:
  1. First Paw (1 XP)
  2. Rainy Night Survived (Ch1 complete)
  3. Three-Day Spark (3-day streak)
  4. Weekly Resilience (7-day streak)
  5. Monthly Master (30-day streak)
  6. Level 2 Hatchling (50 XP)
  7. Level 3 Climb (200 XP)
  8. Way Home (all 8 chapters)
- **Crown HUD** in `GameHUD.ts` — level-mapped (decoupled from difficulty per v1.9.25 audit #3) with 4 px mini progress bar showing `levelProgress(xp).fraction` (v1.9.37).
- **Daily Streak hero card** on `/Tasks` tab with `icon-flame.webp` + "Keep it alive" microcopy (v1.9.6).
- **Confetti burst** on chapter complete (v1.9.9).
- **Speaker pulse** cue on Listen/Replay buttons (v1.9.10).
- **Praise pool** — 6-variant rotation bilingual (v1.9.38 dropped TTS rate 0.92 → 0.85 for A2 clarity).

**What's missing:**
- **No leaderboard** (Duolingo Leagues equivalent).
- **No streak freeze / streak repair** — if user breaks the streak, it's lost. Single largest D7→D30 attrition trigger.
- **No quest / weekly challenge** beyond the static "Daily Streak" hero — no rotating goals.
- **No "earn X to unlock cosmetic"** loop — Coins are tracked but spend-nothing.
- Achievements are binary (unlocked / not) — no tiered "First Paw → 100 Paws → 1000 Paws" sequence.

## 1.6 Content Inventory

**What Pickup HAS — verified from disk:**
- **8 chapter JSON files**: `lessons-ch1.json` through `lessons-ch8.json`, sized 100–140 KB each.
- **Ch1 sample inspected**: 6 lessons read in detail. L1 = 14 questions (6 narration + 2 listen-tf + 6 listen-mc / listen-emoji / listen-comprehension); L2 = 12 questions (all listen-mc / -emoji / -comprehension, no narration); L3 = 12 questions including 1 tap-tiles; L4-L6 = mostly listen-mc / listen-emoji.
- **Per-chapter lesson count**: spec says 24 lessons × 5–15 Q. File sizes suggest 20–24 lessons each. Need spot-check.
- **MP3 inventory** (Ch1 only counted): at least 80 MP3s under `kt-ch1-l1-q1.mp3` through `kt-ch1-l16-q5.mp3`. That's only ~80 of the ~240+ expected if all 24 lessons × 10 avg Q.
- **WordHint dictionary**: `public/word-hints.json` covers Ch1 (filled 7 gaps in v1.9.13). Ch2-8 coverage unknown — needs audit.
- **Legacy content** (v1.x backwards-compat): `sentences.json` (80 cloze), `scenarios.json` (5 scenarios × 10 q = 50), `story-kitten.json` (v1.x 8-chapter format).

**What's likely missing (needs verification):**
- **MP3 coverage gap**: Ch1 has MP3s through L16 but spec says 24 lessons/chapter → L17-L24 audio status unknown. Falls back to WebSpeech which is the documented degradation path.
- **Ch2-8 narration alignment**: Ch1 narration→listen-mc rhythm vs Ch2-8 content rhythm uncomplied — UX agent audit (R11) probably catches but not measured at PM level.
- **CLAUDE.md is stale**: claims "目前只有 Ch1" but disk shows all 8 chapter JSONs landed. Doc drift.

## 1.7 Persistence

**What Pickup HAS:**
- localStorage only — keys include `pickup.difficulty`, `pickup.chapter.{N}.lessons.completed`, `pickup.map.cat-node`, `pickup.map.last-seen-completed`, `wordwar.level` (legacy).
- **Failure banner** (v1.9.48): boot detects localStorage write failure → red banner "進度無法儲存 — 請關閉私密瀏覽".
- Cat name persistence (v1.9.52) via `data/catName.ts`.

**Tech-debt flagged:**
- iOS evicts IndexedDB and even localStorage under storage pressure (per mobile-arch comparison doc). On Capacitor wrap, Pickup will need `@capacitor/preferences` for small KV + `@capacitor-community/sqlite` for >100 KB state.
- No data migration path — if storage schema changes (e.g., new SRS algorithm), old data is lost without versioning.

## 1.8 Settings (BottomNav 4 tabs)

**What's actually wired** (from `StoryModeScene.ts` reads):
- **Home** → `StoryMapView` (24-button paw map).
- **Tasks** → Daily Streak hero card + Free Practice (10 random A2 from cloze pool) + 5 Scenario cards (Restaurant / Airport / Hospital / Office / Hotel × 10 Q each). Note: spec says story-only mode after B.111 but Tasks tab still surfaces Free + Scenario — **inconsistency**.
- **Profile** → XP/Level hero + Stats grid (Chapters/Questions/Streak/Coins/In review) + Cat Name input + Difficulty (Easy/Medium/Hard) + Audio toggle + Reset story button + About.
- **Alerts** → 8 achievement badges in grid (icons via WebP where available, emoji fallback per v1.9.42).

**Inconsistency**: spec North Star says lesson is the only flow. Yet `Tasks` exposes legacy free/scenario play. Either deprecate or document.

## 1.9 Mascot / Brand

- **Mochi (calico cat)**: stray, narrator, default name `Mochi` (was 糰糰 pre-B.148). Visible on map + lesson HUD via `calico-anchor.webp`.
- **Hana (shiba dog)**: Grandma's pet, default name `Hana`. Visible on map.
- **Grandma NPC**: isometric Duolingo chibi PNG (v1.9.3 swapped from old Suntera SVG).
- All 3 share isometric chibi style (v1.7.6 visual reset); POV scene backgrounds use painterly Ghibli (intentional contrast).
- Mascot 動畫: `setAnim('idle' | 'happy' | 'sad')` in `Mascot.ts`.

## 1.10 Accessibility

**What Pickup HAS:**
- `aria-label` on HUD buttons including value (Crown level 2, Streak 5 days) — v1.9.31.
- BottomNav 10 px labels under icons (v1.9.31; toggled icon-only with `aria-label` retained per v1.9.53).
- `prefers-reduced-motion` respected globally — `pickup-pulse` falls back to no-op (v0.11 baseline).
- `safe-area-inset` for iPhone notch / home bar.
- Font scaling: tokens.ts has `--font-display` / `--font-body` / `--font-button` / `--font-stat` / `--font-microcopy` semantic scale.

**Gaps:**
- No VoiceOver pass — `aria-label` exists but full screen-reader walkthrough unmeasured.
- No high-contrast theme.
- No font-size user setting beyond browser zoom.

## 1.11 Performance

**What Pickup HAS:**
- **B.152 lazy-load Phaser**: 1.2 MB chunk dynamically `import('./bootGame')` after window `load` event.
- **B.151 vite modulePreload false**: prevents auto-preload hint regression.
- **Build budget**: 1407 KB raw / 371 KB gzip at v0.13 baseline (per CLAUDE.md). Current state likely +50 KB after Duolingo Stories rewrite.
- **Perf budget**: ≤ 3000 ms LCP first visit, ≤ 1000 ms cached (memory rule `feedback-perf-budget`).
- BGM `peace.mp3` (7.36 MB) lives in `public/` not bundle.

**Risk**: per-Q audio MP3s are not pre-loaded — first tap on each Q awaits network. On 4G, that's ~200 ms gap. PWA cache helps repeat visits only.

## 1.12 PWA / Offline

**What Pickup HAS:**
- `manifest.webmanifest` exists at `public/manifest.webmanifest`.
- `public/sw.js` v2.0.B.155 — network-first for HTML, stale-while-revalidate for shell, cache-first for lessons JSON + audio MP3s.
- `CACHE_VERSION = 'pickup-v2.0.B.155'` — version-bumped per release.
- Shell pre-cache only on install (`/`, `/index.html`, `/manifest.webmanifest`). Runtime fetches cached as visited.

**Gap:**
- **Ch2-8 not auto-cached**. Service worker caches as the user navigates. A user who completes only Ch1 then loses connectivity cannot start Ch2 offline. This breaks the "PWA = offline-first" pitch.
- No background sync API → if user completes a lesson offline, no later push to server (because there is no server).

## 1.13 Tech-debt Flagged (Bug-Check Agent Findings)

From CLAUDE.md decision log + LessonScene reading:
- **god-method**: `LessonScene.renderQuestion()` has 7-way dispatch + inline HTML strings + multiple snapshot fn near-duplicates. Mobile-arch R2 recommends XState extraction.
- **`as any` casts**: `LessonScene.ts` line 549 — `q as unknown as ClozeQuestion`. Documented as v2 tech debt: "refactor ClozeUI to consume discriminated types directly."
- **Dead code**: `MenuScene` is a 5-line redirect (B.111 cleanup pending). `_mountStoryOpener` + `_mountIntroOverlay` deleted in B.153 — ~210 LOC reclaimed. Audit cycle is working.
- **Memory leaks**: `cleanupOverlay()` removes `clozeUI`, `mascot`, `hud`, `tapHandle`, `advanceTimer`, `pickup-lesson-history`. Looks complete; needs Playwright verification under repeated scene transitions.
- **CLAUDE.md says current version is v1.9.24** but version-history table lists up to v2.0.0 (Plan 1 ships) and the version current state actually appears to be `v2.0.B.155+` per sw.js cache version. **Doc drift**.

---

# Part 2 — Gap Analysis vs Competitive Apps

For each feature: which competitor has it / table-stakes vs differentiator / Pickup-fit with "下班逃逸" cozy vibe.

## 2.1 Hearts / Lives System

- **Has**: Duolingo (5 hearts), Babbel (no), Memrise (no), Anki (no — anti-pattern), Quizlet (no).
- **Pickup status**: NO Hearts in story mode (force-correct + blindRetry). Free Practice has HP (legacy v0.7 code path).
- **Table-stakes / differentiator**: differentiator — Hearts conflict with cozy vibe; **avoiding Hearts is a brand choice not a gap**.
- **Pickup-fit**: BAD fit. Don't add. Pickup's force-correct + 2-strike reveal (B.55) is a feature, not a bug.

## 2.2 Leaderboards / Social

- **Has**: Duolingo Leagues (Bronze → Diamond, weekly XP league of 30), Quizlet (class leaderboards).
- **Pickup status**: NONE.
- **Table-stakes / differentiator**: differentiator (Duolingo's signature feature). But Duo Leagues are 30-people anonymized; no social graph needed.
- **Pickup-fit**: MEDIUM. A 30-person anonymous XP league is consistent with cozy — no friend graph, no shame, just gentle extrinsic pull. Worth Q4 ship.

## 2.3 Streak Protection / Streak Freeze

- **Has**: Duolingo (Streak Freeze gem-cost, also "Streak Repair" Super-only).
- **Pickup status**: NONE.
- **Table-stakes / differentiator**: **table-stakes**. Without it, every traveler / sick day kills the streak — single biggest D7→D30 attrition trigger.
- **Pickup-fit**: PERFECT fit. Cozy vibe = forgiving. Ship 2 free freezes/month + 1 Coin-cost freeze.

## 2.4 SRS (Spaced Repetition System)

- **Has**: Anki (full SM-2, gold standard), Memrise (proprietary), Duolingo (proprietary "session generator" Half-Life Regression model).
- **Pickup status**: "SRS Lite" per CLAUDE.md — `addToSrs(qId)` on wrong, `removeFromSrs(qId)` on next correct. **No spacing intervals.** Up to 3 review questions injected at chapter start.
- **Table-stakes / differentiator**: table-stakes for a learning app. Without spacing, "review" is just "re-test until correct," not retention.
- **Pickup-fit**: GOOD. Story mode can absorb 1–2 spaced review entries per lesson without breaking narrative immersion.

## 2.5 Live Story / Radio Podcast (Duolingo Podcasts equivalent)

- **Has**: Duolingo Podcasts (paid, free during PR cycles).
- **Pickup status**: **PARTIAL** — the completion-article screen (`_showCompletionArticle`) concatenates all narration sentences with auto-playing TTS into a clean paragraph. That IS a mini-podcast-per-lesson.
- **Table-stakes / differentiator**: differentiator — Pickup's "完成 · Done" article view is closer to Duolingo Stories than Pickup gives itself credit for.
- **Pickup-fit**: PERFECT fit. Ship a "story replay" mode under Tasks tab that lets users re-listen to completed lesson articles back-to-back.

## 2.6 Speaking Practice / Pronunciation

- **Has**: Duolingo (mandatory tap-to-speak), Memrise (record-yourself comparison), Babbel (Speech Recognition).
- **Pickup status**: NONE.
- **Table-stakes / differentiator**: closer to table-stakes for English learning. Without speaking, Pickup is a listening + reading drill.
- **Pickup-fit**: MEDIUM — WebSpeech Recognition API is free and works in Capacitor. But A2 Taiwanese learners may resist on commute (won't speak in public). Ship as optional, not mandatory.

## 2.7 Writing Practice / Dictation

- **Has**: Duolingo (translate-to-language), Memrise (type-the-answer).
- **Pickup status**: `type-what-you-hear` exists (v1.8.9, route still in `LessonScene` line 682), but the canonical spec doesn't include it in the 14-entry flow. **Retired in spirit, alive in code** — B.128 reference is incorrect; the type is wired in `LessonScene.renderQuestion()`.
- **Table-stakes / differentiator**: table-stakes. Spec needs to clarify whether type-what-you-hear is alive or dead.
- **Pickup-fit**: GOOD. Type-what-you-hear matches A2 productive-skill ladder.

## 2.8 Vocabulary Review Modes

- **Has**: Memrise (classic word-by-word drill), Anki (flashcards), Quizlet (Match game, Spell mode).
- **Pickup status**: WordHint dashed-underline tap-translate in chapter intro page only (v1.9.0). No standalone flashcard / vocab review session.
- **Table-stakes / differentiator**: differentiator. Pickup's `openerVocab` block in each lesson JSON (11 words × pos × Chinese) is a latent flashcard source — never surfaced as UI.
- **Pickup-fit**: GOOD. Could ship a "Vocabulary Review" tab under Tasks that pulls all `openerVocab` from completed lessons into Anki-style cards.

## 2.9 Native Speaker Video

- **Has**: Memrise (signature feature — Locals).
- **Pickup status**: NONE.
- **Table-stakes / differentiator**: differentiator (Memrise's moat). Out of scope for a single-developer app — production cost prohibitive.
- **Pickup-fit**: BAD. Don't ship. Pickup's grandma OpenAI TTS MP3 is the analog, and the narrative justifies it.

## 2.10 Achievements System Depth

- **Has**: Duolingo (~60 achievements with tier upgrades), Memrise (~20).
- **Pickup status**: 8 binary unlock badges. No tiers.
- **Table-stakes / differentiator**: depth gap is real but low-impact alone.
- **Pickup-fit**: GOOD. Extend to ~16 with 1 tier upgrade ("Three-Day Spark → Seven-Day Flame → Thirty-Day Bonfire"). Q4 polish.

## 2.11 Notifications / Push

- **Has**: Duolingo (signature owl push, 7-message ladder), Babbel (study-reminder).
- **Pickup status**: NONE (no service-side, no local notification API).
- **Table-stakes / differentiator**: **table-stakes for retention**. Duo's owl push retention lift is the most-cited mobile growth case study.
- **Pickup-fit**: GOOD — local notification "你的故事還沒講完 🐈‍⬛" maintains cozy. Capacitor + `@capacitor/local-notifications` plugin makes it free.

## 2.12 In-App Purchases / Premium Tier

- **Has**: Duolingo Super ($60/year, ~5% paid penetration), Babbel (subscription gate, ~$13/month), Drops (subscription).
- **Pickup status**: NONE.
- **Table-stakes / differentiator**: differentiator pre-PMF; required post-PMF.
- **Pickup-fit**: MEDIUM. Don't ship before D30 cohort retention data. Q1 2027 earliest.

## 2.13 Profile Customization

- **Has**: Duolingo (avatar + name + display lang + flair), Memrise (avatar).
- **Pickup status**: Cat name input (v1.9.52) — only profile field. No avatar. No display-name. Dog name customization deprecated per B.148 (`R10`).
- **Table-stakes / differentiator**: differentiator. Cat-name customization is a charming Pickup-specific feature; cosmetic cat-outfit IAP is a natural Phase 3 expansion (per CLAUDE.md roadmap).
- **Pickup-fit**: GOOD.

## 2.14 Multi-Language Support

- **Has**: Duolingo (40+ source languages, 100+ target language pairs).
- **Pickup status**: zh-TW + EN only. Hardcoded bilingual UI per `feedback-pickup-bilingual` memory rule.
- **Table-stakes / differentiator**: table-stakes for international scale.
- **Pickup-fit**: MEDIUM. A2 Korean / Japanese learners exist but adding them requires Chinese → Korean explanation rewrite (~5000 strings). Q2 2027 earliest.

## 2.15 Offline Mode Quality

- **Has**: Duolingo Super (offline lessons), Drops (premium offline pack).
- **Pickup status**: PWA cache for shell + visited Ch1. Ch2-8 not auto-cached.
- **Table-stakes / differentiator**: table-stakes for mobile commute usage.
- **Pickup-fit**: PERFECT. "Download all chapters" toggle is a natural Premium feature OR free if Pickup wants to differentiate vs Duo's paywalled offline.

## 2.16 Analytics / Telemetry

- **Has**: Every competitor. Internal-only.
- **Pickup status**: **ZERO**. No PostHog, no Plausible, no GA. Pickup ships blind.
- **Table-stakes / differentiator**: **single largest gap.** Every other roadmap decision is dead reckoning.
- **Pickup-fit**: TRIVIAL. PostHog free tier (1 M events/mo) + 30 LOC integration. Q3 day-1.

---

# Part 3 — Prioritized Roadmap (4 quarters)

## Q3 2026 (next 90 days) — Foundation Polish + Engagement Spine

Focus: instrument the app, fix the SRS bug, ship streak protection, prepare iOS submission.

| # | Feature | Effort | Risk | Impact metric | Dependencies |
|---|---|---|---|---|---|
| Q3-1 | **Analytics shim** (PostHog or Plausible) — track `lesson_started`, `lesson_completed`, `question_answered`, `streak_changed`, `chapter_unlocked` | S (1 day) | low | D1 / D7 / D30 returning-user baseline | none |
| Q3-2 | **Streak Freeze** — 2 free/month, slot UI on Tasks tab, auto-consume on streak break | S (2 days) | low | D7 retention +5–10% (Duolingo benchmark) | analytics for measurement |
| Q3-3 | **Full SRS upgrade** (SM-2 or FSRS-lite) — interval-based review queue per question, `nextReviewAt` timestamp, daily review session | M (1 week) | medium | D30 retention +8–15%; "completed lesson retention" | runStore schema migration |
| Q3-4 | **Content audit + MP3 coverage backfill** Ch1 L17-L24 + Ch2-8 narration alignment | M (2 weeks) | low | NPS — fewer "audio missing" complaints | grandma OpenAI TTS budget |
| Q3-5 | **Spec ↔ code sync sweep** — kill dead `MenuScene`, document `Tasks` legacy modes, retire `listen-tf-zh`, fix CLAUDE.md version drift | S (2 days) | low | onboarding velocity for next Claude session | none |
| Q3-6 | **PWA Ch2-8 prefetch** on first launch (low-priority background fetch) | S (1 day) | low | offline completion rate | sw.js patch |
| Q3-7 | **iOS App Store submission** via Capacitor + Codemagic | L (3 weeks calendar, ~5 dev-days) | medium-high | iOS DAU unlock | $99 Apple Dev account, AudioOrchestrator pre-warm step |
| Q3-8 | **AudioOrchestrator + pre-warm** (per mobile-arch R1) | M (1 day) | medium | iOS audio reliability, no first-tap stutter | none, prereq for iOS ship |

**Q3 ship gate**: D7 returning-user > 25% before adding new content. If not, iterate on Q3-2/Q3-3.

## Q4 2026 — Engagement Layer Build-out

Focus: pull users back daily; build social-light extrinsic motivation.

| # | Feature | Effort | Risk | Impact metric | Dependencies |
|---|---|---|---|---|---|
| Q4-1 | **Push notifications** (local) — Capacitor `@capacitor/local-notifications`, streak-save reminder at user's quiet hour | M (3 days) | low | D7 retention +5–8% | iOS shipped, permission UX |
| Q4-2 | **Weekly XP League** (anonymous, 30 ppl, Bronze→Sapphire→Ruby→Diamond → 5 tiers, no friend graph) | M (1 week) | medium | DAU / session depth | requires server (Cloudflare Workers + D1?) |
| Q4-3 | **Achievement depth** — 8 → 16 badges with 1 tier upgrade (Spark / Flame / Bonfire / Inferno streak ladder) | S (2 days) | low | NPS | none |
| Q4-4 | **Vocab Review tab** — surface lesson `openerVocab` as Anki-style cards under Tasks | M (1 week) | low | lesson completion → retention conversion | none |
| Q4-5 | **Speaking practice** (single-sentence tap-to-speak, WebSpeech Recognition) — opt-in 1 per lesson | M (1 week) | medium | NPS, perceived "real practice" | WebSpeech API support audit per browser |
| Q4-6 | **Story replay mode** — back-to-back completion-article view of all completed lessons (free podcast-tier mini) | S (2 days) | low | session depth, late-week engagement | none |

## Q1 2027 — Monetization Layer

Focus: convert engaged D30 users to paid.

| # | Feature | Effort | Risk | Impact metric | Dependencies |
|---|---|---|---|---|---|
| Q1-1 | **Premium tier design + paywall UX** ($3.99/mo or $24.99/yr trial) | M (1 week) | high | conversion to paid | Apple IAP + Google Play Billing |
| Q1-2 | **Premium features**: offline-all-chapters, unlimited streak freezes, vocab unlimited review, no future ads | M (1 week) | medium | revenue / paid user | RevenueCat or StoreKit2 direct |
| Q1-3 | **Cosmetic Coin sink** — Mochi outfit shop, scenario backgrounds, custom Mascot poses | M (2 weeks) | low | engagement loop closure | art production cost |
| Q1-4 | **Hearts/Lives system** (Free tier only, removable via Premium) | M (3 days) | high | Premium conversion lift | "Hearts on free" is a cozy-vibe risk — A/B test first |
| Q1-5 | **Referral program** — "invite a friend, both get a free month" | S (3 days) | medium | viral coefficient | Premium tier shipped |

## Q2 2027 — Scale + Platform

Focus: expand content moat, broaden language coverage, harden infrastructure.

| # | Feature | Effort | Risk | Impact metric | Dependencies |
|---|---|---|---|---|---|
| Q2-1 | **B1 chapter pack** (Ch9-16) | L (8 weeks) | medium | TAM expansion to A2 → B1 graduates | content production budget |
| Q2-2 | **Korean / Japanese display language** for zh-TW string explanation | L (6 weeks) | medium | TAM expansion to KR / JP learners | translator cost |
| Q2-3 | **Android Play Store ship** | M (2 weeks) | low | Android TAM | Android Codemagic config |
| Q2-4 | **Backend / accounts** (email-link login, sync across devices) | L (4 weeks) | high | cross-device retention, multi-device household | Cloudflare D1 + Workers |
| Q2-5 | **Phase 3 IP — Pickup #2** (招財狗 / 烏龜超商 / 神社小狐狸 per CLAUDE.md candidates) | L (12+ weeks) | high | brand expansion, returning-user lift | Pickup #1 must hit D30 > 20% before second IP starts |

---

# Part 4 — Execution Recommendation: Three Candidate Tracks

## Track A — Polish Path (finish Ch1 L11-L24 + Ch2-8 full Duolingo Stories)

**Pitch**: Complete content alignment to canonical spec across all 8 chapters before adding any new mechanic. Then iOS ship as v3.0.

**Pros**:
- Single concern per quarter; no context-switching cost.
- Avoids the "engagement features on incomplete content" trap.
- Audit cycle is already proven (4-agent post-commit).

**Cons**:
- **Six months without any retention experiment.** If D7 is 15% today, it's still 15% in November.
- Risk of building 24 lessons × 8 chapters of content that users abandon at L5.
- iOS ship date slips to Q4 → Q1 monetization slips.

## Track B — Engagement Path (Hearts / Leaderboard / SRS BEFORE content expansion) — RECOMMENDED

**Pitch**: Ship analytics + Streak Freeze + full SRS in Q3, then Push + League + Speaking in Q4. Content backfill happens in parallel by user demand signal.

**Pros**:
- **Highest leverage per dev-day.** Streak Freeze + SRS + analytics is < 2 dev-weeks combined, lifts D7 / D30 dramatically.
- Engagement layer is the ground-truth signal that says "is the content even worth more content?"
- Premature optimization avoided: no Hearts shipped (cozy-vibe-protective).
- iOS ship lands on Q3 plan with engagement metrics ready to verify launch.

**Cons**:
- Risk that the SRS rewrite breaks existing user progress; needs careful schema migration.
- Push notification UX is hard to get right (one bad notif = uninstall).

## Track C — Monetization Path (Premium tier + IAP BEFORE Engagement)

**Pitch**: Duolingo monetized at MAU ~5M but key Super features (offline, no-ads) landed by 2014. Pickup could ship Premium at v3.0 to bootstrap revenue.

**Pros**:
- Revenue funds further development.
- Forces clear value-prop thinking ("what would someone pay for?").

**Cons**:
- **No retention data → no value-prop confidence.** Selling to users you don't know will return.
- Premium paywall + cozy-vibe = brand risk. "下班逃逸 with paywall" feels off.
- Duolingo monetized AFTER hitting 100M MAU. Pickup at 0 MAU is decades early.

## PM Recommendation: TRACK B (Engagement Path)

**Rationale (5 bullet points)**:

1. **Analytics is a 1-day prerequisite for every other decision** — without it, Q1 2027 Premium pricing is a guess. Track B starts with it. Tracks A and C start without it.
2. **Streak Freeze + full SRS together costs < 2 dev-weeks and is the single largest D7→D30 retention move you can make today.** Track A spends those 2 weeks writing Ch2 L7-L24 narration that users may never reach if they churn at Day 4.
3. **Pickup's content moat is already deeper than the engagement layer can leverage.** 8 chapters × 100–140 KB JSON + ~80 MP3s for Ch1 alone is more content than 80% of A2 learning apps ship at v1.0. Pouring more content on top of an under-engaging shell is the indie-app classic mistake.
4. **iOS ship is Q3 in Track B with Push ready Q4.** Track A delays iOS to Q4–Q1. The iPhone TF user base is where A2 Taiwanese commute learners actually live — every quarter delayed is a quarter of unrealized DAU.
5. **Premium tier in Q1 2027 is more defensible when you can point to "30-day cohort retention at X%"** — Track B produces that number, Track C asks users to trust a paywall on a fresh install.

**Concrete next 30 days (Track B sprint plan)**:

Week 1: Ship PostHog (Q3-1) + Streak Freeze UI (Q3-2) + spec-code sync sweep (Q3-5).
Week 2: SRS schema migration design + SM-2 implementation (Q3-3 half).
Week 3: SRS finish + content audit MP3 coverage (Q3-3 + Q3-4 half).
Week 4: AudioOrchestrator pre-warm (Q3-8) + iOS Codemagic config (Q3-7 setup).

**Single ship-gate metric for Q3**: **D7 returning-user ≥ 25%** before Q4 push-notification work begins. Below 25% means the SRS / Streak Freeze rebuild didn't land — iterate before adding features.

---

## Appendix A — Unknowns That Need Measurement

Flagged "unknown — needs measurement" for honest scoping:

1. **Actual D1 / D7 / D30 retention** — zero data today, Q3-1 fixes.
2. **Lesson completion rate per chapter** — unknown; likely high for L1, plummeting through L5+.
3. **Average lesson time** — spec says 2–4 min, never measured.
4. **MP3 coverage Ch1 L17-L24 and Ch2-8** — file glob counted Ch1 through L16-q5 only; spot-check required.
5. **WordHint dictionary coverage Ch2-8** — v1.9.13 audited Ch1, no agent run on Ch2-8.
6. **Bug-check agent latest findings** — last named bugs in CLAUDE.md are v1.9.x era; B.142+ era findings live in `_next-plans.md` and other docs not synced to PM view.
7. **Service worker hit rate** — sw.js installed v2.0.B.155 but cache-hit metric not surfaced.
8. **CLAUDE.md "目前版本 v1.9.24"** — manifestly stale; reality is post-v2.0.B.155. PM doc-drift risk for next Claude session.

## Appendix B — Cited Pickup Code/Files for "Pickup has X" Claims

- 8 chapter JSONs exist: `public/lessons-ch1.json` (110 KB) through `lessons-ch8.json` (120 KB) — `Bash ls public/` returned all 8.
- Grandma TTS MP3s at least through Ch1 L16: `public/audio/lessons/kt-ch1-l16-q5.mp3` exists.
- Streak persistence: `runStore.ts` imports `readStreak` from `data/streak.ts`; UI in `StoryModeScene.buildTasksPanel` line ~232.
- Achievements: 8 entries in `data/achievements.ts:41-125` array.
- Per-lesson progress: `runStore.ts:540-582` (`readCompletedLessons`, `markLessonCompleted`, `isLessonUnlocked`).
- SRS Lite: `srsReviewBatch` / `addToSrs` / `removeFromSrs` imported from `data/storyKitten.ts` into `runStore.ts:20-29`.
- Completion article: `LessonScene._showCompletionArticle` lines 875-958.
- Service worker v2.0.B.155: `public/sw.js:11` `const CACHE_VERSION = 'pickup-v2.0.B.155'`.
- BGM ducking: `AudioManager.duckBgm() / unduckBgm()` per spec R6 and `LessonScene` audio orchestration.
- Cat name customization: `data/catName.ts` + `StoryModeScene.buildCatNameControl` (Profile tab).
- 4-tab BottomNav: `ui/BottomNav.ts` rendered in `StoryModeScene.switchTab` line 110.
- Crown HUD level-mapped: `ui/GameHUD.ts` + v1.9.25 audit #3 entry in version history.

## Appendix C — One Page TL;DR for the Founder

- **Ship Streak Freeze + analytics + real SRS this month.** Defer new content, defer Premium, defer Hearts.
- **All 8 chapters of content are already on disk** — the engagement layer is the bottleneck, not the content layer.
- **iOS submission can ship Q3** once the AudioOrchestrator pre-warm step lands (1 dev-day).
- **Don't monetize before D30 cohort retention is measured.** Pre-revenue ≠ failure; pre-measurement = guaranteed wrong pricing.
- **Single Q3 ship-gate metric: D7 ≥ 25%.** Hit it before adding Q4 features.

---

*End of audit. Word count ≈ 3700. Doc-drift items called out in Appendix A should sync back into CLAUDE.md on next housekeeping pass.*
