# Pickup React Migration Plan — 2026-06-01

> Migration from vanilla TS + Phaser scenes → React 18 + Router + Zustand.
>
> **Goal:** lesson render 80-120ms → 5-16ms (5-10x faster) + first load 1.5MB → 510KB (-66%).

## Architecture target

```
Current: main.ts → bootGame → Phaser → 8 god-scenes → innerHTML mutation
Target:  main.tsx → React Router → Page components → JSX + state hooks
```

## Phase plan (each phase = 1 ship-ready commit)

### Phase 0 — Setup (B.162) ✅ this commit
- Install `react@18 react-dom@18 react-router-dom@6 @vitejs/plugin-react@5 @types/react @types/react-dom`
- `vite.config.ts` add `react()` plugin + chunks (`react` / `react-router` separate)
- `tsconfig.json` add `"jsx": "react-jsx"`
- Both `main.ts` (vanilla) + `main.tsx` (React entry) coexist
- `index.html` STILL points to `main.ts` (no cutover yet)
- Plan doc (this file)

### Phase 1 — React shell + POC scene (B.163)
- `src/main.tsx` — ReactDOM.createRoot + `<App />`
- `src/App.tsx` — BrowserRouter + Routes skeleton
- `src/pages/StoryMapPage.tsx` — POC port of `StoryModeScene` (1049 lines → ~200 lines)
- Cutover `index.html` → `main.tsx`
- Phaser still loaded for Lesson/Play scenes (gradual cutover)
- Smoke test: open `/` → see chapter map, tap paw → falls through to Phaser LessonScene (interop bridge)

### Phase 2 — Auxiliary pages (B.164)
- `src/pages/BootPage.tsx` (splash, ~30 lines)
- `src/pages/ProfilePage.tsx` (cat/dog name, streak)
- `src/pages/TasksPage.tsx`
- `src/pages/AlertsPage.tsx`
- `src/pages/ChapterIntroPage.tsx`
- `src/pages/ChapterEndPage.tsx`
- All non-Lesson scenes migrated
- Phaser only for `LessonScene` + `PlayScene` legacy

### Phase 3 — Lesson core (B.165) ← biggest batch
- `src/pages/LessonPage.tsx` (~150 lines dispatcher)
- `src/renderers/` registry pattern:
  - `NarrationRenderer.tsx`
  - `ListenTfRenderer.tsx`
  - `ListenMcRenderer.tsx`
  - `ListenComprehensionRenderer.tsx`
  - `ListenEmojiRenderer.tsx`
  - `TypeWhatYouHearRenderer.tsx`
  - `TapTilesRenderer.tsx`
  - `TapPairsRenderer.tsx`
- `EXERCISE_RENDERERS: Record<QuestionType, FC<ExerciseProps>>` lookup
- LessonScene retired
- Audio service still tts.ts singleton (Phase 4 refactor)

### Phase 4 — Audio service refactor (B.166)
- `src/audio/AudioPlayer.ts` class state machine (idle / loading / playing / stopping)
- 11 module singletons (audioLookup / audioBufferCache / mochiTexts / etc) → 1 class instance
- `useAudio()` hook + `<AudioProvider>` Context
- speak() per-play token (避開 stale callback)

### Phase 5 — Phaser removal (B.167)
- Final scenes (PlayScene legacy) port or delete
- Remove Phaser from package.json (-1.2MB)
- Remove bootGame.ts / all `src/scenes/*.ts`
- `main.ts` (vanilla) deleted
- Bundle target: < 600KB raw / < 200KB gzip

### Phase 6 — Polish + smoke (B.168)
- WordHint as React portal hook
- Mascot as `<Mascot anim="happy" />` props-driven
- BGM as `<BgmProvider>`
- Full Ch1 walkthrough smoke
- 5-agent audit

## Risk + mitigation

| Risk | Mitigation |
|---|---|
| Audio race condition (React render + audio onEnd) | Phase 4 AudioPlayer class with per-play token |
| Capacitor + React Router deep-link | Phase 5 verify `HashRouter` vs `BrowserRouter` |
| iOS Safari React 18 concurrent mode cleanup race | StrictMode off in prod, careful useEffect deps |
| PostHog double-fire on StrictMode | once guard via `useRef(false)` |
| SW cache stale hashed chunks | SW version bump every phase |
| Lesson regression | Phase 3 keep Phaser LessonScene parallel + URL flag `?react=1` toggle |

## Estimated timeline

| Phase | AI parallel cost | Human verify | Total wall |
|---|---|---|---|
| 0 (setup) | 30 min | 5 min | this commit |
| 1 (shell + POC) | 1 hr | 30 min play | 1.5 hr |
| 2 (5 aux pages) | 2 hr | 30 min play | 2.5 hr |
| 3 (lesson + 8 renderers) | 3 hr | 1 hr play | 4 hr |
| 4 (audio refactor) | 1 hr | 30 min | 1.5 hr |
| 5 (Phaser removal) | 1 hr | 30 min | 1.5 hr |
| 6 (polish + audit) | 2 hr | 30 min | 2.5 hr |
| **Total** | **~10.5 hr AI** | **~3.5 hr human** | **~14 hr / 2 工作天** |

(原估 11-13 工作天是 human-only; AI 並行降到 2 工作天)

## Success criteria

- Lesson Ch1 L1 全程跑通 (narration / listen-tf / listen-mc / tap-tiles / tap-pairs / completion stats / review)
- LCP < 3s (mobile 4G)
- Lesson render < 16ms (no innerHTML reparse)
- Bundle raw < 600KB
- 8-event PostHog 全 wire OK
- 5-agent audit verdict PASS
