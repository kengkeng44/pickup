# Pickup UI/UX 標準 v1

> User directive (2026-06-10): 「每一個頁面從上到下分三個區塊 裡面分別放什麼 有什麼特效都要寫清楚」

任何 page / screen 設計都 lock 死 **3-section vertical structure**:
**TOP (chrome) → MIDDLE (content) → BOTTOM (action / nav)**

每個 section 內容跟特效都列死,改之前必須對齊此 spec.

---

## 🌐 共用設計 token

| Token | 值 |
|---|---|
| 主背景 cream | `#f1ebe1` (HUD / body / safe area) |
| 文字主色 | `#3c2a1c` warm sepia |
| 文字次色 | `#7a6850` warm taupe muted |
| 成功色 (paw done) | `#7d9a4f` olive, shadow `#5d7a30` |
| 警示色 (錯) | `#c84a3a` terracotta, shadow `#8a2e21` |
| 重點色 (current / amber) | `#e7a44a`, shadow `#b07a2a` |
| 章節色 | per-chapter `meta.accent` (見 CHAPTER_META) |
| Border radius | 14 (card) / 12 (button) / 999 (pill / progress) |
| Shadow primitive | `shadowOffset: { width:0, height: liftHeight }, shadowOpacity:1, shadowRadius:0` |
| Press 動畫 | Reanimated/Animated spring 30ms down / 80ms back |
| Haptic | Medium impact on press / Success on correct |
| Lift height | 6 (button) / 8 (paw node) / 5 (book cover) |

---

## 📄 MapPage / MapScreen (首頁地圖)

### TOP — Chrome (~140px + safe-area)
- **HUD row** (50px): 5 icons `🏳️ EN | 👑 L{level} progress | 🪙 {coins} | 🔥 {streak} | 🧊 {freezes}` 全螢幕橫排, bg cream
- **Book cover** (~80px): 章節 metadata 卡片
  - bg `meta.accent`, shadow darken(accent, 0.28)
  - 文字: `CH {N}` uppercase 10px + `meta.titleEn` 19px bold + `meta.titleZh` 12px italic
  - tap: 念 chapter title (Web Speech / expo-speech) + (web) 開 KeySentencesSheet
  - **3D 按壓**: 按下 inner translateY +5, 保留 1px shadow

### MIDDLE — Content (scrollable)
- **Grandma + Shiba mascot scene** (頂端 130px): grandma 100×110, shiba 80×90, 左右 anchor
- **Spiral paw nodes** (蛇形, 217 lesson + 43 chest = 260):
  - SLOT_DX 8-position cycle `[-60, -20, 20, 60, 20, -20, -60, -20]`
  - NODE_PITCH 96 (web), 84-96 (RN)
  - NODE_SIZE 82-88, NODE_HEIGHT 64-76
  - paw node: amber `#e7a44a` / done olive `#7d9a4f` / current bg 加亮 `#f5be6a`
  - chest 🎁: amber bg + emoji 56px, opened → ✨ + opacity 0.45
  - icon: `node-paw.webp` 預設, `node-star.webp` done
  - **3D 按壓**: SquishButton outer/inner layered, lift 8px

### BOTTOM — BottomNav (fixed 60-70px)
- 5 tabs icon-only (per B.282): `🐾 Map | ⭐ Tasks | 📒 Cards | 🔥 Trophy | 🐱 Me`
- bg `#fff7e8`, border-top 3px `#c8a878`
- active tab: bg `rgba(231,164,74,0.14)` + border `#d68a52` + label 變 amber
- aria-label 保中文

### 特效
- Container height 預固定 280 nodes (不隨 progressive load 變)
- IntersectionObserver chapter detection (不再 scrollY listener)
- 1-shot lessons load (B.297) — 31 章並行 fetch 一次 setLessons
- Current node `.pickup-map-node-current` pulse scale 1.05
- 寶箱 tap → +10 coins + ✨ opacity drop
- Confetti / 動畫禁忌: 不要對 fixed element 加 transition (iOS Safari jitter)

---

## 📄 LessonPage / LessonScreen (答題畫面)

### TOP — Chrome (~80px)
- **Header row** flex: `[✕ close 44×44] [ progress bar flex:1 14h olive ] [🔇 mute 44×44]`
- progress bar 軌 `#ead8c4` cream-tan, 填 `#7d9a4f` olive, 999 radius
- spring 動畫 500ms width transition
- 砍 q-counter pill (per B.284)

### MIDDLE — Q Content (scrollable, padding 16)
- **Speaker badge** (optional, top-left): `🎙 Narrator` / `🗣 {speaker}` 11px pill `#fff7e8`
- **Sentence card** (if `q.sentence`): white bg + 18px bold text + 🔊 SquishButton speaker (右側)
  - shadow `#c8a878` cream-tan
  - auto-speak on Q mount (250ms 延遲 + cleanup)
- **Question prompt** (if `q.question/questionEn`, ONLY for non-MC types per B.280): 16px bold
  - MC 砍 question prompt (per user: 「選擇題不用問題」)
- **Renderer 主區域** 依 `q.type`:
  - `narration`: 顯示 sentence + 提示 "Tap → to continue"
  - `listen-mc` / `listen-tf` / `emoji-pick` / `listen-comprehension`: 4 option SquishButton vertical stack
  - `tap-pairs`: 2-column 真左右 layout, 左中文/右英文, 配對成功 olive bg + ✓
  - `sentence-builder` (B.279 新): 翻譯這句話 + word tiles bank + slot row + 虛線 underline + 「查看 Check」
- **Reveal explanation** (if `revealed && q.explanationZh && wrongCount < 2`): `#fff7e8` bg card, 14px
- **Wrong banner** (if `revealed && wrongCount >= 2`): 紅 banner `#fde2e2` + ❌ 不正確 + 正確答案
- **Confetti** on correct: 60 顆 Skia (RN dev-client) 或 12 emoji Animated burst (Expo Go 降級)

### BOTTOM — CTA fixed footer (~80px)
- **→ green CTA** SquishButton, olive bg `#7d9a4f`, shadow `#5d7a30`, lift 6
- **知道了 red CTA** (2-strike reveal): bg `#c84a3a`, shadow `#8a2e21`
- Disabled state: opacity 0.55 (用 outer wrapper opacity)
- 18-22px bold text

### 特效
- Auto-speak Q sentence on mount (cleanup Speech.stop on unmount)
- Per-option tap: `Speech.speak(opt)` + Haptic Medium
- 答對: Haptic Success + Confetti + addXp + addCoins + setRevealed
- 答錯 1st: 紅卡 stay, setSelected null after 500ms, 不揭答案 (blindRetry)
- 答錯 2nd: setRevealed true, 紅 banner + 知道了 紅 CTA 替換 →
- tap-pairs 配對對: olive bg + small +1 coin + setMatched
- tap-pairs 配對錯: 兩卡同時 shake 420ms (web) / no-shake on RN PoC
- SquishButton press: scale 0.97 → 1 + translateY +4 (保留 minShadow 2px)

---

## 📄 ProfilePage / ProfileScreen (我的)

### TOP — Hero (~200px)
- **Mochi avatar** 120×120 round + 名字 (`catName`) 22px bold + Level XX 14px

### MIDDLE — Stats + Settings (scrollable)
- **5-stat grid** 3-col: XP / Coins / Streak / Visit / Freeze (white card 12 radius)
- **Cat Name input** card (white 14 radius border `#ead9bb`):
  - TextInput placeholder Mochi + Save SquishButton (olive)
- **Dog Name input** card (same pattern)
- **Audio settings** card: Mute toggle button (sand bg if muted)
- **Danger Zone** card: Reset all progress (terracotta red SquishButton)

### BOTTOM — BottomNav (跟 MapPage 同)

### 特效
- Cat avatar 不轉, 偶爾 blink (mascot-blink keyframe)
- Save button → AsyncStorage commit + 短 toast "Saved"

---

## 📄 TasksPage / TasksScreen (任務)

### TOP — Streak Hero (~200px)
- 大 🔥 56px emoji + N day streak + label "day streak" 14px bold + 副標"連續完成 lesson N 天"
- bg `#ff7a3a` 火橙, shadow `#b34f1f`

### MIDDLE — 3 cards (scrollable)
- **🧊 Streak Freeze** card: 數字 28px + 副說明
- **🐾 Visit Streak** card: 連續打開 app N 天
- **📊 Today's XP** card: progress bar (olive fill) + N/30 XP

### BOTTOM — BottomNav

### 特效
- Streak 升級時 hero card scale bounce 1.3 → 1
- XP progress bar 動態 fill width transition

---

## 📄 CardsPage (圖鑑) / CardsScreen

### TOP — Hero (~120px)
- N/31 stories collected, accent `#d68a52` toffee
- shadow `#8b5a32`

### MIDDLE — Pokedex grid 4-col
- 31 cards (chapter), 各帶 #N badge + 32px emoji + 中文標題 + 進度 %
- Collected = bg `#eaf6d5` olive + ✅ + olive border
- Locked / progress: ${N}%
- Tap → navigate to Map

### BOTTOM — BottomNav

### 特效
- Card complete unlock: scale 0.82→1.12→1 pop animation
- 圖鑑 hero N 變化 → 短 pulse

---

## 📄 AlertsPage (成就) / AlertsScreen

### TOP — Hero (~100px)
- N/M achievements unlocked, accent `#e7a44a`

### MIDDLE — Badge grid 2-col
- 8 default badges (First / Streak3 / Streak7 / Streak30 / XP200 / XP500 / Story1 / Eight Tales)
- 各 48px emoji + 13px title + 10px need text
- Locked = opacity 0.25 emoji + 灰 title
- Unlocked = olive border + olive bg

### BOTTOM — BottomNav

### 特效
- 解鎖瞬間: confetti burst + Haptic Success + scale 0.7→1.15→1
- Tap unlocked badge: 念 description (TTS)

---

## 📄 ChapterIntroPage (奶奶 narration intro)

### TOP — Mascot Scene (~250px)
- Grandma + Shiba scene illustration
- 章節背景色 floor band 50px inset

### MIDDLE — Narration (scrollable)
- 中文 narration paragraph (奶奶口吻) 16px lineHeight 1.7
- 🔊 SquishButton 中央 (replay narration)

### BOTTOM — CTA
- → Begin SquishButton (olive)
- 砍中文 "開始章節" 文字 (per B.282)

### 特效
- mascot-idle-bob keyframe (mascot 上下小幅 sway)
- Auto-speak narration on mount

---

## 🪟 Modals (overlay, 不算 page 但同 3-section)

### KeySentencesSheet (重點句 modal)

#### TOP — Title bar
- Mochi paw icon + "Key Sentences" 22px
- Section N + 章節 titleEn 12px subtitle

#### MIDDLE — Sentences (scrollable)
- 每句 narration sentence card:
  - 🔊 SquishButton 左側 (tap → speak)
  - 句子 15px + explanationZh 12px muted

#### BOTTOM — ✕ Close (top-right)
- 36×36 round button, cream bg `#fffbf2`, border `#ead9bb`

#### 特效
- Backdrop fade-in 240ms
- Modal slide-up 28px translate
- Tap 外圈關閉 / ✕ 關閉 / 再點書封關閉 (3 種 dismiss path)

### NextStoryPicker / OnboardingPicker

#### TOP — Mochi 引導語
- "Mochi 想知道你今晚想聽什麼故事" + Mochi avatar

#### MIDDLE — 選項 carousel / list
- 2-3 story card 並列, 各帶 accent bg + title + reason chip

#### BOTTOM — Skip / Continue CTA

#### 特效
- Mochi blink + bob
- Card hover/tap squish

---

## 📌 規則總結 (違反 = revert)

1. **3-section 強制**: 任何 page top/middle/bottom 必須清楚分離
2. **TOP = chrome**, sticky / fixed, 不 scroll. MIDDLE = scrollable content. BOTTOM = nav 或 CTA fixed
3. **所有按鈕一律 SquishButton** (見 [CONVENTIONS.md](../../pickup-rn/CONVENTIONS.md))
4. **不要對 fixed element 加 CSS transition** (iOS Safari jitter)
5. **chrome 顏色一律 cream `#f1ebe1`**, 跟 viewport bg 一致
6. **Haptic Medium** 配 press, Haptic Success 配 correct
7. **TTS auto-speak on Q mount**, cleanup on unmount
8. **MC 不要 question prompt**, 選項自說明 (per B.280 嚴格 EN-only rule)
9. **答錯 2-strike**: 1st 紅 retry, 2nd 知道了 reveal
10. **書封 dynamic chapter** = IntersectionObserver, 不用 scrollY listener

---

## 改動 cadence

任何 PR 動 layout / 按鈕 / 特效 → 來這 doc 加 1 行對應該 surface 的 spec.
新 surface (page / modal) → 加新 section 用同 3-section structure.

未來 RN 全面遷移 → 此 spec 加 RN-only 章節 (例: 觸感分級 / Animated worklet 細節).
