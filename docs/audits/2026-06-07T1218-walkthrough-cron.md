# Walkthrough — 2026-06-07 12:18 UTC

Today's persona: **佳蓉 (Jiā-Róng), 34歲台灣職場媽媽, A2 英文程度, 下班接孩剛哄睡, 晚上 10pm, Samsung Galaxy A54 Android 14 / Chrome 128, 家用 WiFi**

情境: 孩子終於哄睡。半臥在床，右手拇指持機，音量鍵沒調靜音（習慣用 LINE 通知聲辨別訊息）。聽說朋友在用這個 app 學英文，點了連結。每次學習最多 5-8 分鐘，因為可能隨時被叫起來。最在意「不要浪費我的時間」。

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| t=0s | pickupwords.pages.dev 載入，暖米色背景，Ghibli 風，grandma + shiba + Mochi 三角站位 | 無音 | 等頁面 | 看起來溫柔，不像要逼我背單字 |
| t=5s | MapPage 顯示，HUD 全空（firstTime=true，coin/streak 不顯示）；dashed amber `從第一顆節點開始 · Tap to begin` | 無音 | 往下看 24 個 paw 節點 | 節點好多，哪一個是 q1？ |
| t=12s | 第一節點有 `pickup-map-node-current` pulse，aria-label「春日河邊,什麼漂來?」 | 無音 | 點第一節點 | 脈動圖示提示明確，不錯 |
| t=14s | `/lesson/1/kt-ch1-l1` 載入，header: ✕ + `q1/5` 橘色 chip | 無音 | 看到 5 題 | 5 題，大概 5 分鐘？應該來得及 |
| t=17s | tap-pairs: 左欄 河/看/漂/東西，右欄 river/look/float/something 打亂 | 無音 | 點左邊「河」 | 我猜 float 是漂的意思…不確定 |
| t=35s | 全部配對完成，✓ 綠色提示，sfxCorrect | 🔔 sfxCorrect | 等自動推進 | 好耶，全配對成功，有點開心 |
| t=38s | narration q2 渲染：calico-anchor.webp 圓頭像 + 英文句子 | **🔊 TTS 自動播出「Long ago, an old man and woman…」Android 媒體音量約 50%** | 無法暫停 | **痛 P0⚠️: 寶寶剛哄睡！突然從手機喇叭播出聲音，我僵住沒動** |
| t=42s | narration q3 自動推進，頂部 history 積累 q2 文字 | TTS 自動播「They were kind, but they had no children.」| 嘗試點 🔊 重聽 | **痛 P1: 重聽喇叭只有 22px，拇指點了 3 次才中** |
| t=50s | listen-tf q4 載入，大 🔊 + 下劃線遮文字 + "Did any children live?" | TTS 播句子 → chain 播 question | 看 Yes/No 兩個選項 | 沒聽清楚，再點 🔊 補聽 |
| t=55s | **LINE 通知震動，訊息進來** | 通知震動聲 | 切到 LINE 確認 | 是老公問幾點回，回一個表情後切回 |
| t=58s | 回到 Chrome，lesson 仍在 q4（React state 在背景保留）| 無音（TTS 早已結束） | 找 Yes / No，要**往下捲**才看到——history 2 條文字把畫面推低了 | **痛 P1: 中斷回來選項不在視窗裡，需要先捲才能答** |
| t=62s | 選 No → sfxCorrect → auto-advance 2.5s | 🔔 sfxCorrect | 等推進 | 還好對了，但我現在不確定剛才的題是什麼 |
| t=65s | q5 渲染（listen-mc）— 自動 TTS 播 sentence | TTS 再次響起 | 看選項 | 深夜一直有聲音很煩，但又不知道怎麼關 |
| t=70s | **孩子哭聲從隔壁房傳來** | 孩子哭 | 緊急按 ✕ 退出 | 先去安撫！ |
| t=72s | MapPage：第一節點仍是棕色 paw（未完成），無 star，無任何部分完成記號 | 無音 | 看地圖，找不到「剛才做到哪了」的痕跡 | **痛 P0⚠️: q1-q4 全丟！回來還得從頭！ 浪費了我 5 分鐘！** |
| t+15min | 哄回去了，再回 app，點第一節點 | 無音 | lesson 從 q1 重載（idx 歸零）| 「好吧… tap-pairs 那個又要配一次…」 |
| t+22min | 終於完成全 5 題，CompletePanel：Mochi bounce + Confetti + XP/Accuracy/Time triptych + StreakBanner + NewCardsBanner + hook inquiry + 分享金句 + Continue 按鈕 | sfxCorrect + Confetti | 找 Continue 按鈕 | **痛 P1: 6 個資訊區塊疊在一起，Continue 被壓到最底，需要往下捲才看到** |

---

## B. Give-away check (Jaccard / mirror / identity)

| 題目 | 問題 | 正確答案線索檢查 | 判定 |
|------|------|-----------------|------|
| kt-ch1-l1-q1 tap-pairs | 河/look/漂/東西 ↔ river/float/看/something 配對 | 右欄打亂，語意需真正知道才能對應；float/漂 非 identity | ✅ 非 give-away |
| kt-ch1-l1-q4 listen-tf | "Their wooden house stayed very quiet, year after year." → "Did any children live with them?" | 需推論（quiet house ≠ 有孩子），非 mirror | ✅ 合理推論 |
| NarrationRenderer q2/q3 | 只是背景旁白，無答題 | N/A | N/A |
| listen-mc 系列（q5+） | Sentence TTS → blanks 遮文 → question → 4 選 1 | Blind reveal: 選前看不到 sentence，正確選項不能從題幹讀到 | ✅ 非 give-away |

---

## C. 這個 persona 特有痛點

1. **哄睡環境 + narration 無靜音 gate**: narration 每題 mount 就自動 `speak()`，Android Chrome 媒體音量未靜音時外放。深夜哄孩子場景下，突然的 TTS 女聲是最不該發生的事。App 沒有「靜音模式」toggle 或「已靜音，只看文字」的 fallback，也沒有任何提示。

2. **中斷後 lesson progress 全丟**: `idx` 是 component state，`markLessonCompleted()` 只在 `CompletePanel` 的 `useEffect` 裡呼叫。按 ✕ 離開 → idx 歸零 → 下次進來從 q1 重頭。一個可能被打斷 3-4 次的媽媽，等於每一輪都在重做前面的題。「這個 app 不記得我」是直接流失理由。

3. **history 累積 + 中斷回來選項不在視窗**: 每答對一題，NarrationRenderer snapshot 就往 history 塞一條 NarrativeLine。q4 的時候頂部已有 2 條歷史行，加上 ListenTfRenderer 的 speaker block + blank 行 + instruction text，選項 Yes/No 被推到可見區以下。中斷切換 app 再回來的用戶，第一眼沒看到選項，以為題目還沒來。

4. **CompletePanel 資訊過載 (6 區塊 + Continue 最底)**: Confetti + Avatar + Stat triptych + StreakBanner + NewCardsBanner + hook inquiry + 分享金句 + Continue。在疲勞狀態下，只想快速確認「完成了，繼續」。Continue 被壓到最底，需要往下捲，這對剛哄完孩子、手快要斷的媽媽是實體痛點。

5. **節點無預估時間或題數 (map level)**: aria-label 只顯示 storyBeat 文字（如「春日河邊,什麼漂來?」），沒有「約 X 分鐘 / N 題」。佳蓉在決定「現在有沒有時間點進去」時沒有任何資訊可判斷，只能點進去才看到 `q1/5`。

---

## D. P0 / P1 / P2

### P0 ⚠️ (30秒內可能關 app)

| ID | 問題 | 位置 | 理由 |
|----|------|------|------|
| P0-1 | Narration auto-TTS 無靜音 gate，深夜外放吵醒孩子 | `NarrationRenderer` `useEffect` → `speak()` on mount | 哄睡場景最核心恐懼；觸發後媽媽立刻關 app |
| P0-2 | Lesson 中途退出 → idx 歸零，q1-q4 進度全丟，下次從頭 | `LessonPage` `useState(0)` + `markLessonCompleted` 只在 CompletePanel 呼叫 | 被打斷是這個 persona 的常態；每次重做前幾題直接流失 |

### P1 (嚴重阻礙，但不立即流失)

| ID | 問題 | 位置 |
|----|------|------|
| P1-1 | NarrationRenderer 的 `<SpeakerBtn />` tap 區只有 22×22px (default size)，遠低於 HIG 44px | `renderers.tsx:189` `<SpeakerBtn onClick={() => speak(text)} />` — size 未傳，用 default 22 |
| P1-2 | history 累積後 q-options 被推出視窗，中斷回來需捲動才能看到選項 | `LessonPage` history 區塊無高度限制 + 無 scroll-to-renderer 邏輯 |
| P1-3 | CompletePanel 6 個 banner 疊列，Continue 按鈕在最底，疲勞用戶需往下捲 | `LessonPage.tsx:250-385` CompletePanel layout |

### P2 (降低體驗，非致命)

| ID | 問題 | 位置 |
|----|------|------|
| P2-1 | Map 節點無預估題數/時間，家長無法在點進去前做時間決策 | `MapPage.tsx` 節點 aria-label 只有 storyBeat |
| P2-2 | sfxCorrect + TTS 在各題間連發，深夜場景持續發聲 | 全 renderers，無批量靜音開關 |
| P2-3 | Lesson q counter `q1/5` 出現在 header，但 map 節點沒顯示同樣的「N 題」預告 | 資訊非對稱 |

---

## E. Top 3 Actionable (S effort)

### #1 NarrationRenderer — 加 `<SpeakerBtn size={44} />` (1 行 fix) + 考慮 play-on-tap fallback
**現況**: `<SpeakerBtn onClick={() => speak(text)} />` — default size=22，tap 區 22px。  
**修法**: 傳 `size={44}` 修正 HIG 合規（1 行改）。  
**額外考量**: 深夜 narration auto-play 的根本問題需要更大討論（play-on-tap vs. auto-play），但至少讓重聽按鈕可點是低風險 S 級修復。

```tsx
// renderers.tsx:189 — 改
<SpeakerBtn onClick={() => speak(text)} size={44} />
```

### #2 Lesson mid-lesson checkpoint — 至少存「已進入 lesson」狀態到 localStorage
**現況**: idx 在 component state，中途退出歸零。  
**最小 fix (S)**: 在 `LessonPage` useEffect `[chapter, lessonId]` 載入時，寫 `localStorage.setItem('pickup.lesson.lastEntered', lessonId)`；在地圖節點顯示「進行中」狀態 (vs. 未開始 vs. 完成)。  
**完整 fix (M)**: 每答一題後寫 `localStorage.setItem('pickup.lesson.progress.${lessonId}', idx)`；re-entry 時讀取後 setIdx(savedIdx) 繼續。  
→ S 版本給用戶「至少知道上次進到哪」，M 版本真正解決重做問題。

### #3 CompletePanel — Continue 按鈕移至頁面最頂（或固定 bottom）
**現況**: Continue 在 6 個 banner 之後最底。  
**修法**: 把 Continue / 章節完成按鈕移到 `pickup-fade-up` 動畫後第一個可見元素，或用 `position: sticky; bottom: 24px` 固定在畫面底部。其他 banner (streak / cards / outfits / inquiry / share) 在 Continue 之前以 overflow-y: auto 方式捲動瀏覽，不強迫全部讀完才能繼續。

---

*P0: 2 / P1: 3 / P2: 3*  
*這個 persona 最大痛: narration 突然發聲吵醒孩子 (P0-1) + 中斷後進度全丟 (P0-2)*
