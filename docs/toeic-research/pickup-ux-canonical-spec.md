# Pickup UX Canonical Spec v2 (Duolingo Stories direction)

> Single source of truth. Every commit's 4-agent audit checks against THIS doc. Updated 2026-06-01 to consolidate B.118 → B.153 + Duolingo Stories pivot (B.145+).
>
> **v1 archived. Active spec is v2.**

## North Star

A2 Taiwanese learner enters Pickup, taps a paw on the chapter map → lesson opens **directly to first narration chunk** → completes ~14-entry Duolingo Stories flow in ~2-4 min → sees completion article (story paragraph) → next lesson unlocks.

**Audio path** = grandma OpenAI TTS MP3 (pre-recorded). **WebSpeech** = fallback when MP3 missing.
**Visual paradigm** = Duolingo Stories (audio-driven narration + interspersed comprehension Qs).

## R1 — Lesson entry state

When a lesson loads:

| Surface | Visible? | Content |
|---------|----------|---------|
| **Intro overlay** | ❌ removed (B.142) | No Lesson N chip, no mascot card, no Next CTA. Lesson opens straight to first entry. |
| **Cream sentence-card frame** | ❌ removed (B.142) | GameHUD card background transparent + no border. |
| **HUD mascot pink halo** | ✅ Kept | Mochi mascot at top center. |
| **Progress chip** | ✅ "qN/total" | Shows entry index against lesson length (e.g. "q3/14"). |

## R2 — Per-entry rendering (dispatched by `q.type` in `renderQuestion`)

### narration entries (~6 per lesson)
- **Speaker icon** 44×44 transparent button + `/mascots/icon-speaker.webp` 40×40
- **Sentence text** visible immediately (B.146 — auto-reveal, NOT tap-gated)
- **Dashed underline under each word** (Duolingo Stories decoration)
- **Audio auto-plays** on mount via `speak(sentence)` synchronously
- **"繼續 ↓ Continue" green button** (`.pickup-narration-continue` class) advances to next entry
- **No answer required** (not a question)

### listen-tf entries (~4 per lesson) — English true/false
- Speaker icon 40×40 + English sentence visible immediately + auto-play audio
- `questionEn` rendered as bold centered prompt
- **2 white buttons** ("Yes" / "No") with amber border-bottom
- Tap commits → ~2s auto-advance to next entry
- No reveal panel — just visual button color change (green/red) inline

### listen-mc entries (~4 per lesson) — English blind ABCD
- Speaker icon + sentence as word-blank shapes (B.118 blind-listening style)
- 4 ABCD pill buttons (NO text pre-reveal — blind)
- Speaker queue: sentence MP3 only (B.139 — no extended A-D readout per B.146 single-call rule)
- Post-reveal: pills show English option + ZH (B.131 bilingual reveal)
- Auto-advance after 3s (`ADVANCE_CORRECT_MS = 3000`)

### Chinese in pre-reveal (R3 — strict)
- All pre-reveal English-only (per memory `feedback-pickup-no-chinese-pre-reveal`)
- Chinese appears only on:
  - listen-mc post-reveal pill labels (bilingual EN+ZH)
  - listen-mc reveal panel `explanationZh`
  - listen-tf post-reveal explanation (if shown)
  - History snapshots `explanationZh` inline note
- ❌ NO Chinese in narration text, listen-tf questionEn, sentence audio captions

## R4 — Scroll history (vertical Duolingo radio)

After each answer commit + Continue advance:
- Past entries SNAPSHOTTED to `#pickup-lesson-history` container above current chunk
- Snapshot format (B.150 + B.153 — strict plain text, no frames, no green/red):
  - narration: `<div>sentence text</div>` plain
  - listen-tf: `<div>questionEn text</div>` plain
  - listen-tf-zh (legacy): `<div>questionZh text</div>` plain
  - listen-mc: `<div>sentence + question + — explanationZh</div>` plain
- ❌ NO `background: green/red`, NO ✓/✕ icons, NO bordered cards
- ✅ Plain reading flow — past entries available for user scroll-up

## R5 — Completion article view (`_showCompletionArticle`)

When `advance()` reaches end of `questions[]`:
- `_showCompletionArticle` fires (B.147)
- HUD mascot slot hidden
- History container cleared (no Q/A clutter on completion)
- Concatenates all `type === 'narration'` entries' `sentence` into clean paragraph
- "THE STORY" amber header label + paragraph + center speaker icon (replay) + "完成 · Done" green CTA
- Auto-plays full article on mount
- Done CTA → `cleanupOverlay()` + `scene.start('StoryModeScene')`

## R6 — Audio architecture

- All speak calls route through `tts.ts speak()` → MP3 lookup → Web Audio fallback to WebSpeech
- `AudioManager.duckBgm() / unduckBgm()` ramps BGM gain 100% ↔ 10% during voice (B.140)
- `stopSpeaking()` cancels Web Audio + WebSpeech atomically (B.139.1)
- Called in `cleanupOverlay` + at start of `renderQuestion`
- BGM auto-starts on LessonScene mount (idempotent per `bgm.ts`)
- `_renderNarration` + `_renderListenTf` auto-play synchronously (gesture chain from prior click)

## R7 — TOEIC question quality (R1 paraphrase)

Per `pickup-q-design-standard-v1.md` — applies to listen-comprehension + listen-emoji + listen-mc with `subSkill !== 'vocab'`:

- **R1 paraphrase**: correct option MUST NOT be substring of sentence (Buck 1991/2001 ban)
- **Exception** — `subSkill: 'vocab'` listen-mc Qs are minimal-pair phonetic identification (e.g. straw/stay/stray) and are R1 EXEMPT by design
- Other rules R2-R8 + anti-patterns A1-A7 apply universally

## R8 — Speech rate

- All TTS at 0.7 rate (~108 wpm A2 sustainable)
- MP3 plays at native speed (~120 wpm grandma OpenAI TTS)
- Consistent across narration / listen-tf / listen-mc

## R9 — Speaker icon

- `/mascots/icon-speaker.webp`
- 44×44 transparent button + 40×40 inner img(narration + listen-mc)
- 40×40 transparent button + 36×36 inner img(listen-tf — smaller for inline TF row)

## R10 — Cat / dog names

- `Mochi` / `Hana` hardcoded literal in all 8 JSON files (B.148)
- `{catName}` / `{dogName}` placeholder system retired
- `applyCatName` / `applyDogName` functions kept but loader is passthrough
- Profile customization removed

## R11 — 4-agent post-iteration audit

Every commit dispatches:
1. **QA agent** — content vs `pickup-q-design-standard-v1.md` R1-R8 + A1-A7
2. **Bug-check agent** — code health: dead code / iOS / leak / race / schema sync
3. **Audio-Text Consistency agent** — speakerText vs DOM vs explanationZh cross-check
4. **UX Compliance agent** — verify every surface listed in this doc is in spec'd state

Per `feedback-pickup-post-iteration-audit` memory rule.

## R12 — Performance budget

- First visit LCP ≤ 3000ms (per memory `feedback-perf-budget`)
- Repeat visit ≤ 1000ms (cached)
- Phaser 1.2 MB lazy-loaded via dynamic `import('./bootGame')` after 'load' event (B.152)
- `vite.config.modulePreload: false` to prevent Vite auto-preload hint regression (B.151)

## R13 — Capacitor / mobile target (deferred)

- iOS + Android native via Capacitor + Codemagic CI (per memory `project-pickup-ios-distribution`)
- MP3 only (Ogg/Opus iOS support only landed Safari 18.4)
- Audio session: `capacitor-media-session` plugin
- Lesson packs: `@capacitor/filesystem` (NOT IndexedDB)

## R14 — Memory rules referenced

- `feedback-pickup-listening-format`
- `feedback-pickup-no-emoji-qa`
- `feedback-pickup-bilingual-options`
- `feedback-pickup-no-chinese-pre-reveal` (with listen-tf-zh legacy carve-out)
- `feedback-pickup-q-prompt-quality`
- `feedback-pickup-speech-rate`
- `feedback-pickup-placeholder-substitution` (semi-retired after B.148)
- `feedback-pickup-post-iteration-audit`
- `feedback-pickup-retry-reveal`
- `feedback-perf-budget`

## Change log

- 2026-05-31 — initial v1 consolidation from B.118-B.140
- 2026-06-01 — **v2 rewrite** post-Duolingo-Stories pivot (B.142-B.153):
  - R3 intro overlay deprecated (B.142)
  - R1/R2 split into entry types (narration + listen-tf + listen-mc)
  - R4 history strip frames + ✓/✕ (B.150 + B.153)
  - R5 completion article view (B.147)
  - R6 audio path + BGM ducking (B.140)
  - R7 R1 vocab exemption clarified
  - R10 placeholder retirement (B.148)
  - R12 perf budget + lazy-load gates (B.149-B.152)
