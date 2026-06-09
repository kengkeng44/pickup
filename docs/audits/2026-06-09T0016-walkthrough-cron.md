# Walkthrough — 2026-06-09 00:16 UTC

Today's persona: **子安 (Zǐ-ān), 26歲台灣科技新創 PM, B1 英文程度, Android Chrome 128, 台北咖啡廳 WiFi**

情境: 週末下午 3pm。朋友推薦 Pickup「很適合睡前放鬆學英文」。子安平日讀英文 newsletter、英文 Slack 無障礙、偶爾開英文 meeting 但聽力仍需提升。正在備考 IELTS，想找一個輕鬆 app 在不焦慮下複習。
裝置: Samsung Galaxy S23 (412px viewport)，Android Chrome 128，咖啡廳穩定 WiFi，BGM 靜音耳機模式。

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|------------|
| 0s | 「拾光」logo + calico cat PNG + 奶奶的睡前英文小故事 + 開始 Begin → | 靜音 | 點 Begin | 「睡前小故事？感覺是給小孩的... 但先試試」 |
| 2s | MapPage 載入：書封 "A Story in the Yard"，24 個 paw 節點，crown L1，0 coins，0 streak | BGM 起 (靜音耳機中 = 無聲) | 點書封 / 點第一顆 paw | ⚠️ **沒有程度測驗，直接進地圖** — 不知道自己該從哪開始 |
| 5s | 找難度設定：點 Crown → Profile。看到 XP 0、Streak 0，「貓咪名字」input，找不到難度開關 | — | 滑 Profile 找設定 | 「難度在哪？我不是新手」→ 找不到任何 B1 / 進階路徑 |
| 15s | 放棄找，回地圖，點第一顆 paw 進 L1 | TTS 觸發 audio unlock | 等待 | 「好吧先試試，如果太簡單就換」 |
| 18s | **tap-pairs** 出現：配對 "porch / 屋簷" "rain / 雨" "fur / 毛皮" | TTS auto-speak 句子 | 點配對 | 「這三個字... 我五年前就會了。這真的是我的程度嗎？」|
| 30s | **narration**: 泡泡 + calico img + "The rain falls hard tonight." auto-playing TTS, rate 0.85 | TTS 緩慢念 "The... rain... falls... hard... tonight." | 等待 advance (7s fallback) | ⚠️ **等待感 P0**: B1 秒懂此句，卻要坐等 7 秒自動推進，感覺被困住 |
| 38s | narration 推進，句子進 history bar | 聲音 | 無法跳過 | 「好慢啊... 我想自己控制進度」 |
| 40s | **listen-tf**: 🎧 + blanks + "Yes / No" 兩個選項 | TTS 念 "Mochi felt the cold rain on her fur." | 選 Yes/No | 「哦是非題。我已經知道答案了... 這有點太容易了」|
| 44s | 選了答案，TTS 慢速念解釋, explanationZh 出現 | SFX 答對聲 | 等 2.5s auto-advance | 「解釋我都懂，不需要再聽了」 |
| 50s | **listen-mc**: blanks → 4 options | TTS chain: sentence + question | 聽完再選 | ⚠️ **audio-first gate P1**: 我已知道正確答案，但 TTS 還在念，要等它念完才有意義選。 rate=0.85 讓等待更長 |
| 60s | 看 options：A "under the rain" B "on the porch" C "in the sky" D "behind the wall" | — | 點 B | 「distractor 太弱了... C 和 D 完全是送分，B1 不需要思考」 |
| 65s | 答對，3s auto-advance，看到 explanationZh | SFX | 等 | 「解釋再次 trivial。我想更難的東西」 |
| 70s | 再一個 **narration**: "She listened to the sound of rain." | TTS 念 7s | — | 「第三個 narration 了。這個 lesson 有幾題？進度條顯示大概走了 3/11...」 |
| 80s | 點進度條上方想看題型 — 無法互動 | — | 無 | 「不知道接下來還有幾個 narration 要等」 |
| 90s | L1 完成！CompletePanel: Mochi bounce, 50XP, 100%, 1:30 | Confetti | 點 → 繼續 | ⚠️ **沒有「這太簡單了 / 試試更難的」出口**。Lesson complete 只有回地圖 |
| 95s | 回到地圖，L1 變 star node，L2 解鎖 | 動畫 | 點 L2 | 「L2 應該也一樣... 要做完 24 lesson 才能到 Ch6/7？我沒那個時間」|
| 120s | 子安點書封試著換章節：找 Ch6 "Baba Yaga" 或 Ch7 "Six Swans" | — | 點書封 → ‹ chevron | ⚠️ **沒有直接跳章方式** — 書封只是金句集錦，無法 tap 跳到 Ch6 |
| 130s | 看到 GrandmaRecommendCarousel 推薦，看看是否推進階章節 | — | 看 carousel | 「奶奶推薦... 還是桃太郎和醜小鴨。沒有 B1 選項」 |
| 140s | 子安打開 ChaptersPage (nav icon)：看到 30+ 章，全部灰色 locked | — | — | 「全部鎖著。要從 Ch1 L1 一個個解鎖才能到 Baba Yaga... 我沒時間」 |
| 150s | 子安放下手機，決定下載 Babbel | — | — | **Churn. B1 user lost.** |

---

## B. Give-away check

無明顯 blindRetry give-away 漏洞（blanks 正確 obscure）。
但 distractors 品質給了 B1 答案：listen-mc C "in the sky" / D "behind the wall" 是純 absurd，
A2 以上學生看 distractor 形狀就知道正確答案，不需要聽 TTS。→ 題目本身 give-away，非 blindRetry 漏。

---

## C. 子安這個 persona 特有痛點

1. **程度測驗缺席 (P0)**: LevelTest.tsx 已寫但 App.tsx 沒 wire。B1 用戶第一開 app 直接進地圖，沒有任何「我的程度是 B1，推我 Ch6-8」引導。Duolingo / Babbel 都在第一頁做 placement test。
2. **AbilityLevel 天花板是 A2+ (P1)**: userProfile.ts AbilityLevel type 最高是 A2+。B1/B2 用戶完成 LevelTest 5/5 也只被標為 A2+，推薦引擎永遠不知道「這個人比 A2+ 還強，應該直接推 Ch6-8 thematic challenge content」。
3. **narration auto-advance 7秒等待 (P1)**: B1 對 A2 句子是秒懂，7 秒 dwell 完全是 dead time。沒有 tap-to-skip (只有 speaker btn 重播)。Duolingo Stories 有「點任何地方跳過旁白」機制。
4. **distractor 品質太低 (P1)**: Ch1 listen-mc 選項 3/4 是 absurd options (in the sky, behind the wall, in the air)。B1 用 elimination 秒選，毫無挑戰感。(ARCH-REC #1 MCQ length bias 也有相關)
5. **無跳章路徑 (P2)**: 30+ 章全 locked，B1 用戶無法直接試 Ch6 Baba Yaga（對 B1 算較難）。Duolingo 有「jump to section」placement test。Pickup 完全沒有解鎖捷徑。

---

## D. P0/P1/P2

| 級別 | ID | 描述 | 位置 |
|------|----|------|------|
| **P0** | B1-P0 | **LevelTest 存在但未 wired**：`App.tsx` 直接 mount `MapPage`，`LevelTest.tsx` 是死碼。B1 用戶第一次開 app 無任何程度評估，直接從 Ch1 L1 A0 content 開始 → 秒 churn。`localStorage['pickup.ability.level']` 永遠不被設置，GrandmaRecommendCarousel 一直不知道用戶是 B1 | `src/react-app/App.tsx:106` / `src/react-app/components/LevelTest.tsx` (dead code) |
| **P1** | B1-P1 | **AbilityLevel 天花板 A2+**：`src/data/userProfile.ts:35` type 最高 A2+，無 B1/B2 tier。LevelTest Q5 是 "lonely" 語意題，B1 秒答，卻與 A2 混同一個 bucket，推薦引擎看不出差別 | `src/data/userProfile.ts:35`, `src/react-app/components/LevelTest.tsx:102-107` |
| **P1** | B1-P2 | **narration auto-advance 無法 skip**：`NarrationRenderer` (`renderers.tsx:166-187`) onEnd + 2000ms dwell = B1 對 A2 旁白等 7-10 秒。完全無 tap-to-skip。Dead time 在連續 3-5 narration 累積成分鐘 | `src/react-app/renderers.tsx:166-187` |
| **P2** | B1-P3 | **listen-mc distractor 3 absurd**：Ch1 題目 3/4 選項是 "in the sky / behind the wall / in the air"，B1 用 elimination 無需聽 TTS 就知道正確答案。Distractor 品質是 A0 設計標準 | `public/lessons-ch1.json` distractor content |
| **P2** | B1-P4 | **全章鎖，無 skip-to-intermediate 路徑**：30 章全鎖，新 B1 用戶只能從 Ch1 L1 開始線性解鎖，無任何「我程度夠，直接試 Ch6」CTA。相較 Duolingo 的 jump-to-section 落差明顯 | `src/store/runStore.ts:isLessonUnlocked()` |

---

## E. Top 3 actionable (S effort)

### 🅰️ ⭐ 推薦 — Wire LevelTest on first open (S · 45min)
**`src/react-app/App.tsx`** 加 first-open guard：
```ts
// In App(), before return:
const [levelDone, setLevelDone] = useState(
  () => localStorage.getItem('pickup.ability.level') != null
);
if (!levelDone) return <LevelTest onComplete={() => setLevelDone(true)} />;
```
`LevelTest.tsx` 已實作、已 export、已有 `persistAbilityLevel()`。只差這一行 mount。
`GrandmaRecommendCarousel` 已讀 `pickup.ability.level` — 接上後立刻 adaptive。

### 🅱️ — Narration tap-to-skip (S · 30min)
`renderers.tsx:190-200` NarrationRenderer 整個 `<div>` 加 `onClick`:
```tsx
<div onClick={() => { stopSpeaking(); onAdvance(text); }} style={{ cursor: 'pointer' }}>
```
配微文案：右下角 `點任何地方繼續 ·  tap to continue` (10px, opacity 0.4)。
B1 不再被困在 7 秒 dead time，A0 小孩仍可等 TTS 念完自動推進。

### 🅲️ — Lesson complete 加 "太簡單？試下一章" CTA (S · 20min)
`LessonPage.tsx:CompletePanel` 當 accuracy=100% + elapsedMs < 90000 (< 90s):
```tsx
{accuracy === 100 && elapsedMs < 90000 && (
  <button onClick={() => navigate(`/map?ch=${lesson.chapter + 1}`)}>
    太快了？試試 Ch{lesson.chapter + 1} →
  </button>
)}
```
給高速完成的 B1 一個出口而不是直接 churn。

---

## 🔬 Architecture Recommendation (對齊業界 2026)

### ARCH-REC #7 — LevelTest Wiring + B1 Tier (S + M · 1.5hr total)

**業界根據:**
- Duolingo 2025 blog "partial credit improvements to placement test": 加了 partial credit 讓中高程度用戶被正確分到更高章節，**intermediate learner retention +12%**
- Duolingo "intermediate mini-units" 2026: 針對 B1 卡關用戶推出 mini-units，解決「A2 太簡單但 B1 太難」的 cliff problem
- Babbel / Cake 標準流程：第一頁即 placement test，5-8 題，高分者跳到對應單元

**Pickup 現狀 gap:**
- `LevelTest.tsx` 建好但 `App.tsx` 沒 wire (dead code P0)
- `AbilityLevel` 最高 A2+，B1 用戶被歸同一 bucket
- `GrandmaRecommendCarousel` 讀 `pickup.ability.level` 但永遠空 → 推薦一直是 Ch1

**適不適合 Pickup 架構:** ✅ **完全適合**
- 純 localStorage read/write，Cloudflare Pages static CDN 不需 backend
- React 18 component 已存在，只缺 mount gate
- 客群 8-12 兒童：5 題 emoji-pick 完全 age-appropriate，大人 B1 跑完 < 20s

**兩步實作 (可同一 session):**

**Step 1 — App.tsx wire (S · 20min):**
```ts
// src/react-app/App.tsx (line ~106, before Routes return)
const [levelDone, setLevelDone] = useState(
  () => !!localStorage.getItem('pickup.ability.level')
);
// In JSX, before <main>:
if (!levelDone) {
  return <LevelTest onComplete={() => setLevelDone(true)} />;
}
```
Import `LevelTest` at top. Done.

**Step 2 — B1 tier in LevelTest + userProfile (M · 1hr):**
- `LevelTest.tsx:QUESTIONS` 加第 6 題 (條件式 — 只在 score 5/5 前 4 題後才出):
  "She hesitated before crossing the threshold." → 選 意思 (B1 vocabulary)
- `scoreToAbility()` 加: if correctCount === 6 → return 'B1'
- `userProfile.ts:35` type 加 'B1' tier
- `storyRecommend.ts` B1 tier → 直推 Ch6 Baba Yaga / Ch7 Six Swans

| Pattern | Source | Pickup 適配 | Effort | ROI | Verdict |
|---------|--------|-----------|--------|-----|---------|
| Placement test on first open | Duolingo blog 2025 | ✅ 完全適合，LevelTest 已存在，只缺 App.tsx mount gate | S · 20min | ⭐⭐⭐ | **接** |
| B1/B2 tier + adaptive routing | Duolingo intermediate mini-units 2026 | ✅ 適合，type 加一個 string 值 + 一題 | M · 1hr | ⭐⭐⭐ | **接** |
| Narration tap-to-skip | Babbel / Drops UX 標準 | ✅ 適合，onClick 一行，不破壞 A0 兒童自動流 | S · 30min | ⭐⭐⭐ | **接** |
| Multi-pass adaptive difficulty per question | Duolingo IRT model (IRT 3PL) | ❌ 需 server-side，Pickup static CDN 不適合 | L · 2w | ⭐ | **不接 (現階段)** |

---

*Persona: 子安 26yo PM, B1, Android Chrome 128, WiFi*
*Agent: Player Walkthrough (5th agent per docs/agents/player-walkthrough.md)*
*5-agent verdict target: B1 P0 LevelTest dead code → ARCH-REC #7 ship*
