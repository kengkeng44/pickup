# Walkthrough — 2026-06-07 00:17 UTC

Today's persona: **阿凱 (Ah-Kai), 15歲台灣中學生, attention span 短, Android Chrome 128**

情境: 下課後回家，沙發躺著，Google Pixel 7a，WiFi 穩定，右手拇指單手操作，一邊用左手滑 YouTube。同學傳來 Pickup 連結說「跟 Duolingo 很像，可以試試」。**期望感**：像 Duolingo 一樣爽，點一點就有進度感，3-5 分鐘可以結束一輪。不喜歡等，不喜歡讀大段文字。

---

## A. 時間軸

| t (s) | 我看到 | 我聽到 | 我可做 | 我覺得 · 痛 |
|-------|--------|--------|--------|------------|
| 0 | Chrome 打開 URL，白屏 1s | YouTube 從左耳傳來 | 等 | 還好，WiFi 快 |
| 1 | MapPage 渲染：暖米色背景，HUD 4 個 icon，章節 banner「院子裡的第一個故事 · A Story in the Yard」，奶奶 + 柴犬 + Mochi mascot，24 顆 paw node 蛇形排列 | 無聲音 | 滑動頁面 | 「哇，蠻可愛的」—— 但往下滑，大部分節點都是灰色（locked）。我只能點第 1 顆。感覺「這 app 大部分都是上鎖的」，有點洩氣 |
| 4 | 我點第 1 顆棕色爪節點 | 點擊 sfx ✓ | 等 LessonPage 載入 | 「q1/11」counter 出現。11 題？Duolingo 感覺只有 5 題... 嗯，繼續看看 |
| 5 | LessonPage 載入完成。顯示：`📖 背景` badge，接著是一整個灰色方塊，文字「(本題型沒有 pairsEn data)」 | 無聲音 | ??? | **完全不知道發生什麼事。螢幕只有一行小字，沒有按鈕，沒有動畫，沒有提示。頁面像是壞掉了。** |
| 8 | 我等了 3 秒，沒有任何進展。q counter 還是「q1/11」 | 無 | 等，滑屏幕，沒有按鈕 | **我以為是我的手機問題。搖了搖手機。還是一樣。** |
| 12 | 我上下滑動 LessonPage，確認沒有隱藏按鈕。確認只有上方的 ✕ close 和 q1/11 | 無 | 按 ✕ 退出 | **「App 壞掉了。同學說很棒，但一打開第一題就壞」。App 在我腦中就死了。** |
| 15 | 回到 MapPage。我**再點一次第 1 顆節點**，想確認是不是網路問題 | 點擊 sfx | 點第 1 節點 | 一樣的「(本題型沒有 pairsEn data)」。確認 app 壞了 |
| 18 | 我按 Android back 鍵，關掉 Chrome tab | — | 關 app | **「不用了，換回 Duolingo」。去 Google Play 下載 Duolingo。** |

> **App 在 18 秒關閉，連一道題都沒回答到。**

---

## B. Give-away Check (Jaccard / Mirror / Identity)

沒有做到答題，所以 give-away 檢查無從執行（無法觸及 listen-mc / listen-tf）。

但從 Q4 `listen-tf` (`"Their wooden house stayed very quiet, year after year." → "Did any children live with them?"`) 觀察：
- 推理題設計合理，不是直接映射，這道 **pass**。

從 Q6 `listen-mc` (`"He carried home heavy wood for the fire." → "What was his daily task?"` options: fishing / cutting wood / cooking rice / feeding goats):
- 句子中 `carried home heavy wood` → 選項 `cutting wood`：語意推論，不是字面抄寫。**Pass**。

然而 — 以上分析均為理論，15歲用戶根本到達不了 Q4/Q6，因為 Q1 就永久卡住了。

---

## C. 這 persona 特有痛點 (3-5 bullet)

1. **P0 心理帳戶**：青少年 first impression 窗口極短（Duolingo 研究：30s 內不給勝利感 = 解除安裝）。Q1 壞掉 = 直接進黑名單。成人 (60+, 上班族) 可能還會重試，15歲不會。

2. **11 題長課 vs 短注意力**：q1/11 counter 在 lesson 開頭就顯示全長。Duolingo 隱藏總題數（只顯示 progress bar）。15 歲看到「11」會預期 7-10 分鐘，比預期長 → **前期動力耗損**。即使 Q1 正常，這個也是 P1。

3. **連續 narration 被動等待**：L1 的 Q2、Q3、Q5 都是 narration（自動朗讀 + 2000ms dwell）。假設 Q1 正常，接下來是：match pairs (互動) → 朗讀 (等 ~7s) → 朗讀 (等 ~7s) → listen-tf (互動) → 朗讀 (等 ~7s)。三個被動等待連著，**沒有「tap to skip/advance」**。15歲：「為什麼要等 21 秒才能繼續？」中途切去 YouTube，忘了回來。

4. **Map 初始感知**：24 顆節點，1 顆可點，23 顆灰色鎖起。**視覺上 95% 是「你進不去」**。Duolingo 第一次開 app 只顯示 3-5 個 visible nodes，其餘在 scroll 外。Pickup 一開 app 就看到全部 locked → 感覺「這是個需要很長時間才能解鎖的長跑 app」，不是「輕鬆 5 分鐘的 session app」。

5. **無分享 / 社群鉤子在 MapPage**：同學傳 link 來，我沒辦法在 map 上看到「同學也在用」或「比同學多學了 X 課」。Duolingo 有 friends leaderboard。青少年的學習動機很大一部分來自同儕比較。

---

## D. P0 / P1 / P2

### ⚠️ P0：app 30 秒內就讓用戶關閉
**tap-pairs 永久卡死 — pairsEn vs pairs 欄位名不符**

- **現象**：`TapPairsRenderer` 讀 `q.pairsEn ?? []`，但所有 7 個 `kt-ch1-l*-q1` 的 JSON 欄位是 `pairs: [{left, right}]`。`q.pairsEn` 永遠 `undefined`，`pairs` array 長度 = 0，renderer 直接渲染靜態錯誤訊息 `"(本題型沒有 pairsEn data)"`，**沒有 `onAdvance` 呼叫，沒有自動推進 timer**。用戶永久卡在 Q1，唯一出口是按 ✕。
- **影響**：Ch1 所有 7 課 (以及任何其他 chapter 若有 tap-pairs Q) 第一題全部廢掉。
- **修法**：
  ```typescript
  // src/react-app/renderers.tsx TapPairsRenderer
  // 改為相容兩種格式：
  const pairs: Array<[string, string]> = q.pairsEn ?? 
    (q as any).pairs?.map((p: {left: string; right: string}) => [p.left, p.right] as [string, string]) ?? [];
  ```
- **次要修法**：即使 `pairs.length === 0`，加 fallback auto-advance（1.5s，同 FallbackRenderer），避免永久卡死。

### P1-A：Narration 無法手動跳過
- **現象**：NarrationRenderer 沒有「點任意處繼續」手勢或 Continue 按鈕。只能等 TTS + 2000ms dwell（最短 7s）。
- **影響**：L1 有 3 個連續 narration，累計 21s 被動等待。短注意力 (青少年、通勤族) 中途離開。
- **修法**：整個 NarrationRenderer 容器加 `onClick={() => { if (!advancedRef.current) { advancedRef.current=true; onAdvance(text); } }}` — tap 任意處立即跳過（audio 仍繼續播，只是不卡流程）。

### P1-B：q counter 洩露全長，應改進度條
- **現象**：`q{idx + 1}/{lesson.questions.length}` 顯示 「q1/11」。11 題視覺上感覺長。
- **影響**：第一題就知道「還有 10 題」，降低開始動力。
- **修法**：拿掉數字總量，改 Duolingo 風 linear progress bar（filled fraction = idx / total，無數字）。

### P1-C：MapPage 初始 23/24 locked = 視覺荒蕪
- **現象**：24 node 全部 visible，23 個灰色 opacity 0.7。
- **影響**：初次用戶看到 95% 鎖住，感覺 app 大部分是「未來才能解鎖的」長期承諾，不是今天 5 分鐘的輕量 session。
- **修法**：考慮只渲染 `currentNodeIdx + 3` 個節點（其餘 DOM 節點不渲染），或把 locked style 改成更輕的消隱（opacity 0.3, grayscale(1)，不顯示爪 icon），視覺上降低 locked 節點的存在感。

### P2-A：Lesson Complete 多 banner 堆疊
- **現象**：CompletePanel 可能同時出現：streak banner + 新卡片 banner + 新裝扮 banner + hook inquiry + 分享 button + Continue。
- **影響**：15 歲看到一堆東西不知道點哪個，第一印象「好煩」。
- **建議**：優先層級：streak > hook inquiry > continue。卡片 / 裝扮收進 「查看詳情」摺疊。

### P2-B：社群 / 朋友動線完全缺失
- **現象**：MapPage 無 leaderboard、無 friends，無比較機制。
- **影響**：青少年同儕驅動的學習動力完全觸及不到。
- **建議**：Phase 3 低優先，但可在 Profile tab 加「邀請朋友 + 比較進度」入口作為 seed。

---

## E. Top 3 Actionable (S effort)

1. **[S = 30min] Fix tap-pairs pairsEn ↔ pairs adapter** (P0):
   - `src/react-app/renderers.tsx` TapPairsRenderer 第一行加 `pairs` format fallback（見 D 修法）。同時加 FallbackRenderer-style 1.5s auto-advance 保底。

2. **[S = 20min] Narration tap-to-advance** (P1-A):
   - NarrationRenderer wrapper div 加 `role="button"` + `onClick` tap handler，點任意處立即 advance。

3. **[S = 15min] q counter → progress bar** (P1-B):
   - LessonPage header 把 `q{idx+1}/{total}` span 改為 `<div style={{width:`${(idx/total)*100}%`, height:4, background:'#7d9a4f', borderRadius:2}}/>` Duolingo 風 slim bar（總 width = 100%，fill = idx/total）。
