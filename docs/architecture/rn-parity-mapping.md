# Wordwar Web ↔ Pickup-RN Architecture Parity Map

User directive (2026-06-09): 「先用 rn 的架構去做 方便後面換到 rn」

當 wordwar web (PWA) 跟 pickup-rn (Expo RN) 兩邊架構對齊, 未來 migrate 直接搬 code,
不用重寫. 此 doc 列每個 layer 的對應, 並標 gap 跟 TODO.

## 目錄結構

| Layer | wordwar (web) | pickup-rn (RN) | Parity |
|---|---|---|---|
| Pages/Screens | `src/react-app/pages/*.tsx` | `src/screens/*.tsx` | 命名差異, 內容 70% 重疊 |
| Components | `src/react-app/components/*.tsx` | `src/components/*.tsx` | 命名一致 |
| Store | `src/store/runStore.ts` | `src/store/runStore.ts` | ✅ Zustand 一致 |
| Data | `src/data/*.ts` + `public/lessons-ch{N}.json` | `src/data/*.ts` + `lessons-ch{N}.json` (bundle inline) | 內容 100% 同, load 機制不同 |
| Audio | `src/audio/{bgm,tts,sfx}.ts` (Web API) | `src/audio/bgm.ts` (expo-av) + `expo-speech` | API 差但邏輯同 |
| Animation | `src/style.css` keyframes | `Animated.spring useNativeDriver:true` | web CSS / RN imperative |

## Component Mapping

| 概念 | web 實作 | RN 實作 | gap |
|---|---|---|---|
| Map (蜿蜒 paw 地圖) | `pages/MapPage.tsx` (~750 lines) | `screens/MapScreen.tsx` (~180 lines) | RN 簡 4x, 沒虛擬化 scroll bug 不存在 |
| Lesson 答題 | `pages/LessonPage.tsx` + `renderers.tsx` (1500 lines / 13 renderer) | `screens/LessonScreen.tsx` (~370 lines / 6 type) | web 多 7 type 但 lesson JSON 沒用到 |
| Map node 按鈕 | `components/MapNode.tsx` (React.memo + inline style) | inline `<SquishButton>` in MapScreen | RN 沒抽出 component (節點 simpler) |
| 3D 按鈕 (Duolingo style) | CSS box-shadow + transform translateY on press | `components/SquishButton.tsx` outer/inner layered | RN 結構更乾淨 |
| Confetti | CSS `pickup-confetti-burst` keyframe | `<EmojiConfetti trigger>` Animated.parallel | 不同方案, 同效果 |
| Press animation | `:active` CSS + `attachPressFeedback()` helper | `<Pressable>` + `Animated.spring scale + translateY` | RN 更 declarative |
| Book cover | `pages/MapPage.tsx` inline JSX | `screens/MapScreen.tsx` `<SquishButton>` 包 | RN 把 book cover 變 pressable, web 還沒 |
| Chest 🎁 | `pages/MapPage.tsx` stream interleave | `screens/MapScreen.tsx` 同邏輯 | ✅ 一致 |
| BottomNav | `components/BottomNav.tsx` 5 icon | `App.tsx` `<Tab.Navigator>` 5 tab | RN 用 native tab, web 用 router |
| Stats / XP / Coins | runStore + read* helpers | runStore (persist 過 AsyncStorage) | 加了 persist |
| Lesson types | 13 renderer (含未用) | 6 renderer (Ch1-31 實際) + 1 新 (sentence-builder) | RN 多 sentence-builder, web 沒 |
| TTS | `audio/tts.ts` Web Speech + OpenAI MP3 chain | `expo-speech` (native AVSpeechSynthesizer / Android TTS) | web 多 OpenAI MP3 fallback |
| BGM | `audio/bgm.ts` mp3 streaming | `audio/bgm.ts` expo-av Audio.Sound loop | 同 mp3 file (peace.mp3), 不同 API |
| Haptic | 沒 | `expo-haptics` Medium impact 配 press | RN 多 (web 沒 haptic API) |
| Splash screen | index.html style (cream bg) | `expo-splash-screen` + `app.json` | RN 規範化 |
| App icon | `manifest.webmanifest` icon | `app.json` icon + Android adaptive | RN 規範化 |

## Data Flow Parity

```
Both:
  lessons-ch{1..31}.json (32 files, ~45KB each)
    ↓
  loader function → Lesson[] (interface 一致: id, chapter, lessonInChapter, questions[])
    ↓
  MapPage/Screen reads → renders paw nodes
    ↓
  user tap → LessonPage/Screen → renders Q → answer → completion
    ↓
  runStore.markLessonComplete(chapter, lessonId)
    ↓
  HUD / map paw 變 ⭐
```

## Architecture Principles (兩邊都遵守)

1. **Scroll source of truth = window (web) / native ScrollView (RN)**
   - web 不要用 `<main overflowY:auto>` (B.276 教訓)
   - RN 用內建 ScrollView 不要 wrap 自定 container
2. **Container height 預固定**, 不要 progressive grow (B.290 教訓)
3. **Chapter detection = IntersectionObserver (web) / onScroll (RN)**, 不要 scrollY useState (B.296)
4. **1-shot lesson load** (B.297 對齊 pickup-rn inline import)
5. **3D button = outer shadow color + inner translateY** (CONVENTIONS.md, 一律 SquishButton)
6. **2-strike reveal pattern**: 1st wrong = 紅 retry, 2nd wrong = 知道了 reveal CTA
7. **Auto-speak on Q mount** (250ms 延遲 + cleanup)
8. **Zustand persist (localStorage on web / AsyncStorage on RN)**, 不靠 in-memory state

## Migration Path (when ready)

1. **Phase 1**: 用 pickup-rn 已 ported 的 6 個 screen + 6 renderer 直接 EAS build → TestFlight
2. **Phase 2**: 把 wordwar 還沒 port 的搬到 RN (按優先序):
   - KeySentencesSheet
   - NextStoryPicker
   - OnboardingPicker
   - ShareModal
   - ChapterIntroPage
   - WardrobeView (Mochi outfit)
   - 100+ Grandma MP3 預錄 (替代 expo-speech)
   - OpenAI MP3 chain fallback
3. **Phase 3**: 砍 wordwar web 維護, 全力 RN

## Current Gap (Web 比 RN 多的)

- 7 個 unused renderer (TypeWhatYouHear / TapTiles / PictureMc / ReadAndTap / DragBlank / ListenBuild / SpeakBack) — 之後若內容用到再 port
- OpenAI MP3 TTS fallback chain — RN 階段先 expo-speech, 之後付費 OpenAI 預錄音檔上 R2/Cloudflare
- 100+ Grandma 預錄 mp3 (Ch1) — 同上
- Notification scheduler — RN 走 expo-notifications, 等 backlog

## Current Gap (RN 比 Web 多的, 該回 Web)

- ⚠️ **sentence-builder renderer** (新題型) — 已在 pickup-rn 實作, web 還沒
- ⚠️ **Haptic feedback** — RN 有 expo-haptics, web 沒對等. iOS Safari 18+ 支援 navigator.vibrate, 可實驗
- ✅ B.297 已對齊 1-shot lessons load

## Update Cadence

每次 web 有架構級改動, 來這 doc 加 1 行對應的 RN 等效. 反之亦然.
未來 migration session 看這 doc 就知道做什麼.
