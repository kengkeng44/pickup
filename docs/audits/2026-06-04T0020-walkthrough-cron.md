# Walkthrough — 2026-06-04 00:20 UTC

Today's persona: **Wei 偉恩, 28歲 UX 設計師, Deuteranopia (紅綠色盲), Android Chrome 128, 4G 慍網**

情境: MRT 車廂內站著操作，Samsung Galaxy S23，一側耳機在，4G (高延遲 ~120ms RTT)，下班後通勤 30 分鐘試玩陌生英文 app。

---

## A. 時間軸

| t (s) | 我看到 | 我聽到 | 我可做 | 我覺得 · 痛 |
|-------|--------|--------|--------|------------|
| 0 | Chrome 地址欄輸完，白屏 loading | MRT 噪音 | 等 | 4G 延遲，頁面 1.5-2s 才出現 |
| 2 | Splash / 貓臉動畫 | 無 TTS（模組剛開始預載 8 個 JSON） | 等 | 還好，畫面有東西 |
| 3 | 地圖 MapPage 出現：24 顆節點沿蛇形路徑排列，HUD 四個 icon | 無音訊 | 認識 UI | 哪顆是第一關？ |
| 4 | 第一顆節點：暖棕色 `#a47148` + paw icon；後面節點：米色 `#c4b89c` + 灰 paw icon，opacity 0.7 | — | 辨識鎖定 / 解鎖 | 棕 vs 米色亮度差夠用，我能看出「第一顆可按」 ✓ |
| 5 | 我點第一顆節點 → navigate `/lesson/1/kt-ch1-l1` | 點擊 sfx | 等 | LessonPage 自己重新 fetch，「載入中…」 出現 |
| 5.5 | 「載入中…」轉圈（4G fetch lessons-ch1.json，~400ms） | — | 等 | 又要等。比剛才地圖多一次 fetch |
| 6 | q1/5 顯示；SpeakerBadge 👵 Grandma；空白句 `___ ___ ___ ___ ___ ___`；問題 "When does Mochi jump on the wall?"；4 個選項按鈕 | 靜默（MP3 fetch 還在路上，~1-2s） | 看題目 | 我想聽，但沒聲音 |
| 7.5 | 空白句還是空白 | 奶奶聲音「I jump on the wall…」終於出現（MP3 fetch完）| 聽 | 在嘈雜 MRT 勉強聽清 |
| 8.5 | 聽到 "this evening" | 句子播完；問題 TTS chain 播「When does Mochi…」| 選答案 | 選項：midnight / tonight / the wall / tomorrow。"tonight" 對應 "this evening" → 我按它 |
| 9 | ✦ **按下 tonight 後**：按鈕背景變了一點色調，其他按鈕也略有變色 | SFX 正確音（耳機裡聲音小，MRT 噪音中半聽到） | 等待推進 | **我看不出哪個是綠哪個是紅。全部都是米褐色。我沒有 ✓ 也沒有「答對」文字。只靠一個半聽不清的音效判斷 — 不確定。** |
| 12 | auto-advance 到 q2 | — | 繼續 | 算了，往前走 |
| 13 | q2: "Grandma has a new book in deep sky color." SpeakerBtn + 空白句 + "What color is the book?" | 奶奶聲音播 q2 句（MP3 已 cache，這次即時） | 聽 + 選 | "deep sky" = blue → 按 "blue" |
| 13.5 | 答對按鈕 bg 變淺、sfxCorrect | SFX 正確音 | — | 同樣：顏色分不出對錯，只靠聲音 |
| 16 | q3: "Hana is waiting by her seat." opts: by her chair / near the gate / on the wall / inside the house | — | 選 | "seat = chair"，按 "by her chair" |
| 16.5 | 答對，4 顆按鈕全部變成類似米褐色 | sfxCorrect（小聲）| — | OK，勉強判斷是對的 |
| 18 | q4: listen-comprehension "The volume with the deep sky cover." | 奶奶聲音 + 問題 "What is new tonight?" | 選 | "volume = book，deep sky = blue" → "the blue book" |
| 19 | q5: "Grandma opens the book. She is ready to **say to a tale**." | 奶奶聲音（語調略頓，"say to a tale" 語感不順） | 選 "to tell a story" | **"say to a tale" 不是自然英文。我聽到奶奶讀這句停頓，以為我聽錯了。A2 學習者這裡會卡住。** |
| 22 | Lesson Complete 頁面：🎉 confetti，XP/ACCURACY/TIME 三欄 | — | 看統計 | ACCURACY 數字顏色是綠色 `#5d9a35`，bg `#eaf6d5` — 我看這個綠色和奶黃色背景差不多 |
| 23 | 「完成 · Continue →」按鈕，背景 `#7ac74a` (綠) | — | 按 | **按鈕是綠色但我看起來像橄欖棕。我知道這是 CTA 因為它最大最突出，但色覺正常的設計意圖「綠色代表完成/成功」對我無效。** |
| 24 | 回到地圖。第一顆節點變成 `#7d9a4f` (olive done) + node-star.webp | — | 看地圖 | **node-star vs node-paw 形狀不同 ✓ — 我看得出第一關完成了（靠 icon 形狀，不靠顏色）。但 done-olive (#7d9a4f) vs available-brown (#a47148) 顏色差異對我幾乎不可見。若沒有 star/paw 差異，我會完全無法分辨。** |
| 25 | 第二顆節點解鎖，ready to tap | — | 繼續 | 解鎖動畫 unlock-pop (scale 0.82→1.12→1) 我看得見 ✓ |

---

## B. Give-away 檢查

| 題目 | 觀察 | 判定 |
|------|------|------|
| L1-q1: "this evening" → opts [midnight, tonight, the wall, tomorrow] | "the wall" 出現在句子裡（mirror distractor），但問句是 "when" → 不影響作答。"tonight" ≠ 原文，需推論。 | ✓ OK |
| L1-q3: "by her seat" → "by her chair" | 正確答案與原句 phrase structure 完全相同 ("by her ___")，只換同義字。A2 必學，但有些學生直接 pattern-match "by her" 而非真正理解。 | ⚠ 輕微 mirror |
| L1-q5: "ready to say to a tale" → "to tell a story" | 原句英文不自然 ("say to a tale"應為 "tell a tale"/"say a tale")，會讓 A2 學習者以為自己沒聽清楚，並懷疑題目設計 | ⚠ P2 語法錯誤 |
| L3-q1: opts 包含 "Mochi" (貓的名字) 作為 Momotaro 問題干擾項 | 新學習者剛認識 Mochi 這角色，看到選項時可能誤選 | ⚠ 輕微 semantic trap |

---

## C. 這個 persona 特有痛點

1. **OptionBtn 答對/答錯狀態完全靠顏色區分**。正確 = `#eaf6d5` bg + `#7ac74a` border（淺綠）；答錯 = `#fde0d2` bg + `#c84a3a` border（淡紅/橘）。Deuteranopia 模擬後，兩者均呈現類似的 warm beige-brown 調，無法憑視覺判斷。唯一非色彩線索是 SFX，但 MRT 噪音環境中 sfxCorrect/sfxWrong 聲音容易被蓋過。**完全無 ✓/✗ icon，無文字 CORRECT / WRONG label，無形狀差異。** 我完成 5 題後幾乎不確定自己哪題答錯。

2. **4G 高延遲造成 LessonPage 二次 fetch spinner**。MapPage 有 module-level `lessonCache`，但 LessonPage 有獨立的 `fetch()` 呼叫（`src/react-app/pages/LessonPage.tsx` useEffect 內），不共享 cache。每次進入課程都重新取 `lessons-ch1.json`（幾百 KB），在 4G 下約 300-600ms 的「載入中…」。從地圖點節點 → 白屏 + spinner 的延遲打斷沉浸感，比 Duolingo 的即時 transition 差。

3. **tts.ts audio lookup race condition on 4G**。`loadAudioLookup()` 在 module load 時 sequential fetch 8 個 lesson JSON。`speak()` 是同步的，立即讀 `audioLookup.get(cleaned)`。若 lookup 尚未完成（在 4G 上首次 q1 render 約 5-6s 後才完成），audioId = undefined → 直接 WebSpeech fallback（機器人聲）而非奶奶 MP3。4G 用戶的第一個問題很可能不是奶奶聲音，打破品牌體驗。

4. **地圖節點完成狀態** done-node (`#7d9a4f` olive) vs available-node (`#a47148` warm brown) 顏色差異對 deuteranope 幾乎不可見（兩者在色盲模擬下均呈棕橄欖調）。我能辨別節點狀態，**完全靠 node-star.webp vs node-paw.webp 形狀差異**，而非顏色。這個設計碰巧有效，但屬「color blind lucky」而非刻意設計。

5. **CompletePanel「完成 · Continue →」按鈕及 ACCURACY stat 使用純綠色 `#7ac74a` / `#5d9a35`**。「成功 / 完成」的語意對 deuteranope 消失。我知道可以按 Continue 是因為它是唯一大按鈕，不是因為「綠色代表完成」 — 顏色語意傳達完全失效。

---

## D. P0 / P1 / P2

### P0 (影響核心答題回饋，有機率 30s 關 app)
- **P0-A: OptionBtn 無非色彩 correct/wrong 指示**。MC 答題後，所有選項按鈕在 deuteranope 視野中呈同色系。MRT 嘈雜環境 SFX 被環境音蓋過時，使用者完全無法判斷對錯。Duolingo 本身的 OptionBtn 同樣有色差，但 Duolingo 有「正確 ✓」/ 「錯誤 ✗」panel banner + 色塊 feedback strip 作補充。Pickup 只有顏色。

### P1 (影響體驗但不致離開)
- **P1-B: LessonPage 獨立 fetch，4G 每次入課程 300-600ms spinner**（不共 MapPage lessonCache）
- **P1-C: audio lookup race on 4G — 首課 q1 可能用 WebSpeech 機器人聲而非 grandma MP3**

### P2 (內容/語意問題)
- **P2-D: L1-q5 語法錯誤** `"She is ready to say to a tale."` → 應為 `"tell a tale"`
- **P2-E: L3-q1 使用 "Mochi" 作 Momotaro 干擾項**，新玩家可能誤選

---

## E. Top 3 Actionable (S effort)

**#1 OptionBtn 加 ✓ / ✗ 文字 prefix (P0-A fix, ~10 行)**

`src/react-app/renderers.tsx` OptionBtn：

```tsx
// 在 label <div> 前加 state badge
const badge = state === 'correct' ? '✓ ' : state === 'wrong' ? '✗ ' : '';
<div style={{ fontWeight: 900, color: badge ? fg : undefined }}>
  {badge}<span>{label}</span>
  {labelZh ? <span style={{ color: '#8b6f4a', fontWeight: 600, marginLeft: 8 }}>· {labelZh}</span> : ''}
</div>
```

影響：全部 listen-mc / listen-tf / listen-comprehension 題型自動修復。色盲、靜音環境均受益。

**#2 LessonPage 共享 lessonCache (P1-B fix, ~5 行)**

把 MapPage.tsx 的 `lessonCache` 和 `loadChapterLessons()` 抽出到 `src/data/lessonCache.ts`，MapPage + LessonPage 都 import 同一個 map。LessonPage 的 useEffect 改用 `loadChapterLessons(chapter)` 取代獨立 `fetch()`。

影響：4G 用戶回到地圖再進課程，第二次瞬間載入；LCP 改善。

**#3 修正 L1-q5 語法 (P2-D fix, 1 行)**

`public/lessons-ch1.json` lesson `kt-ch1-l1` q5 sentence：

```
"sentence": "Grandma opens the book. She is ready to say to a tale."
```
→
```
"sentence": "Grandma opens the book. She is ready to tell a tale."
```

影響：A2 學習者不再疑惑，TTS 語調也會更自然。
