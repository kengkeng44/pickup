# Walkthrough — 2026-06-06 12:19 UTC

Today's persona: **玉珍 (Yùzhēn), 66 歲退休阿嬤, iPad Pro 12.9" Safari 18 landscape, WiFi 穩定**

情境: 孫女剛安裝 App，橫放在阿嬤大腿上。老花眼 +1.5 度，食指點觸螢幕（非拇指）。頭一次用，不懂 swipe 手勢。

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| 0s | Safari 開著 pickupwords.pages.dev，一個 720px 奶油圓角卡片居中在深米色背景上 | 無聲 | 等待載入 | 「這是什麼 App？孫女說可以學英文」 |
| 3s | Splash：三花貓圖（140px）、「拾光」36px 字、副標 16px、「開始 · Begin →」按鈕（padding 14×36，約 145px 寬） | 無聲 | 點「開始」 | 按鈕有點小，在 720px 大卡片正中間，左右空白很多。找到了，點下去。 |
| 4s | Splash 下方灰字「React 18 + Vite · 60-70% 快 first load (vs Phaser 版)」 | — | — | **這是什麼？是壞掉了嗎？** 完全不懂，有點不安。(P1) |
| 6s | 地圖載入。HUD 4 icon：旗子、皇冠 L1、金幣、火焰。橘色章節橫幅「第 1 章 院子裡的第一個故事」。7 個爪印節點在 320px 中柱，中柱兩側各有 200px 空白。 | BGM 鋼琴輕聲開始 | 看地圖 | 地圖節點很小，空白處太多。奶奶和柴犬圖案很可愛。我想點那個有動畫的爪印節點。 |
| 12s | 辨識到第一個節點有 `pickup-map-node-current` 動畫（scale 脈動）。節點 82×64px。 | BGM | 點節點 | 用食指戳 → 第一次點到了（82×64 夠大）。頁面跳轉。 |
| 15s | Lesson 頁：`q1/11`、✕ 44px、tap-pairs 配對格 2 欄 | 無 TTS（tap-pairs 無自動音）| 看說明 | 「配對 · Match pairs」只有 14px 深米色字，老花眼看不清。我以為是「選兩個一樣的」，有點困惑。 **(P0 開始)** |
| 25s | 點左「河」→ 變黃。點右「river」→ 配對成功！漸漸懂了規則，但中途有誤點（按鈕 ~347px 寬 × 39px 高，間距 8px，高度偏小） | sfx 配對音 | 繼續配對 | 雖然慢慢懂，第一格完全是自己摸索。沒有引導文字說「點左再點右」。 |
| 80s | 4 對全配完。`q2` 自動推進：narration 卡片出現，貓圖 44px + 英文句子 | TTS 自動播「Long ago, an old man and woman lived in a small village.」聲音不錯 | 聆聽 | 好！有聲音讀出來，聽得蠻清楚。 |
| 90s | 句子卡片中我看到喇叭 icon，22×22px，貓圖旁邊。 | TTS 播完 → 2 秒後自動推進 | **想重聽** | 我沒聽清楚最後一個字。我想點喇叭重聽，但 22px 好小。 |
| 92s | 用食指戳 22×22px 喇叭 → 第一次 miss（落在旁邊貓圖上，沒反應）。再戳 → miss。第三次才點中。 | TTS 已推進到下一題 | 遲了 | **句子已消失，重聽無效。** 我沒有跟上。(P0) |
| 95s | `q3` narration。又自動 TTS 後 2 秒推進。我更快去找喇叭。還是 22×22px，2 次才點中。 | 第二句 TTS | 跌跌撞撞跟著 | 每次 narration 都是這個小喇叭 race，壓力開始累積。 |
| 115s | `q4` listen-tf。我看到 48px 大喇叭（SpeakerBtn size=48），底線佔位符，Yes/No 按鈕 | TTS 自動播句子，然後播問題 | 聽完，選 Yes | 這個喇叭大多了！我很輕鬆點到。Yes → 答對，綠色回饋清楚。 |
| 130s | `q5` narration 又來，22px 喇叭回來了。 | TTS 開始 | 快點喇叭 | 同上，22px miss 問題重現。3 次才點中。**(P0 再現)** |
| 150s | `q6` listen-mc。我看到說明文字「🎧 點喇叭聽完聲音再選答案」**14px**。老花眼要瞇眼才看得清楚。 | TTS 播句子然後播問題 | 選選項 | 4 個選項很寬（~692px），容易點到，沒問題。顏色 feedback 清楚。 |
| 170s | `q7` narration，同上 22px 喇叭。 | 自動 TTS | — | 已習慣三次才點中，有點煩躁。 |
| 190s | `q10` emoji-pick。我看到 2×2 大 emoji 按鈕（38px emoji，整體按鈕寬 ~340px），很漂亮！ | sfx | 點 emoji | 這個我最喜歡！emoji 大、顏色清楚、按鈕好按。一眼就懂要幹嘛。 |
| 210s | `q11` narration，最後一句，22px 喇叭。 | TTS | — | 已麻木，反正等它推進。 |
| 220s | 🎉 完成頁：XP / 準確率 / 時間，然後「完成 · Continue →」全寬大按鈕 (padding 16px) | sfx 歡呼音 | 點 Continue | 這個按鈕終於夠大！一指就按到。 |
| 225s | 回到地圖，第一節點變綠（done），第二節點出現 | BGM | 看地圖 | 「完成了！但我有幾個句子沒聽清楚，想回去重聽... 找不到」 |

---

## B. Give-away check (Jaccard / mirror / identity)

`listen-tf` q4: 問「Did any children live with them?」→ 選項 Yes / No，正解 No（他們沒有孩子）。  
句子「Their wooden house stayed very quiet, year after year.」 + 問題文字都已播出，推理空間足夠，無直接 give-away。

`listen-mc` q6-q8: 選項含中文 optionsZh（只在 revealed 後顯示），且 blindRetry 不適用 listen-mc（選一次就揭曉）。Jaccard 初步：正解選項和其他選項語意區隔足夠。

`emoji-pick`: 4 選 1，emoji 視覺 + 標籤，無 mirror 問題。

**結論**: Ch1 L1 題目無明顯 give-away。

---

## C. 玉珍 66 歲 iPad Pro Landscape 特有痛點

1. **22×22px 喇叭是老手指 graveyard** — NarrationRenderer 裡 SpeakerBtn 用預設 `size=22`（renderers.tsx:178 `<SpeakerBtn onClick={() => speak(text)} />`），雖然 L4 句子堆在 history 裡也是 22px。每次 narration（共 41/77 = 53% 題型）都是這個問題。對食指操作的 66 歲用戶：三次點擊 succeed rate ~60%，嚴重打斷流暢感。

2. **tap-pairs 機制完全靠摸索** — 說明只有 14px `配對 · Match pairs` 標題，無引導（「點左邊再點右邊」）。第一次做的 senior 要花 15-30 秒才理解機制。

3. **Splash dev-jargon 刺眼** — `React 18 + Vite · 60-70% 快 first load (vs Phaser 版)` 是開發者內部比較，用戶看到以為 App 壞了或在 debug 模式。

4. **沒有 Pause/Resume 機制** — 玉珍打到一半孫女叫她吃飯，無法暫停。X 退出則丟失 lesson 進度（markLessonCompleted 在 Complete 才觸發）。

5. **iPad 兩側空白** — 320px map 在 720px 卡片裡，兩側 200px 空白。視覺上 app 看起來沒用到螢幕。不影響功能，但 senior 對「浪費空間」的直覺反應是「這個 App 沒做完」。

---

## D. P0 / P1 / P2

### P0 — 30秒內有放棄 App 或功能卡死風險

| # | 位置 | 問題 |
|---|------|------|
| P0-A | `renderers.tsx:178` `NarrationRenderer` | SpeakerBtn 22×22px（預設 size=22）→ 老手指 miss 率高。53% 題型都是 narration，每題重聽都是賭博。 |
| P0-B | `renderers.tsx:491-493` `TapPairsRenderer` | 14px 說明「配對 · Match pairs」無動詞指示（第一題就是這型），senior 第一次完全茫然。 |

### P1 — 顯著摩擦，影響留存

| # | 位置 | 問題 |
|---|------|------|
| P1-A | `SplashView.tsx:30` | `React 18 + Vite · 60-70% 快 first load (vs Phaser 版)` dev-jargon 用戶可見，60+ 用戶困惑。 |
| P1-B | `MapPage.tsx:259-267` | Key Sentences paw 按鈕 38×38px，低於 HIG 44px 最低標準。 |
| P1-C | `LessonPage.tsx` 設計層面 | 無 Pause/Resume：退出就丟失 lesson 內 progress，無 auto-save checkpoint。 |

### P2 — 輕微打磨

| # | 位置 | 問題 |
|---|------|------|
| P2-A | `LessonPage.tsx:120` `NarrativeLine` | history 行回播按鈕同樣 22px（非 NarrationRenderer 中的，但 lesson 進行中 history 列有同款小喇叭）。 |
| P2-B | `renderers.tsx:230` listen-tf 說明 | `🎧 點喇叭聽完聲音再選答案` 14px，老花眼需瞇眼。 |

---

## E. Top 3 actionable (S effort ≤ 2hr)

**E1 (P0-A 修法) — NarrationRenderer SpeakerBtn 大到 44px**  
`renderers.tsx:178` 改 `<SpeakerBtn onClick={() => speak(text)} size={44} />`  
同時 `LessonPage.tsx:120` NarrativeLine 的 replay button 也從 22→44px。  
預期影響：narration 重聽 success rate 恢復正常，60+ / motor-impaired 全受益。

**E2 (P0-B 修法) — tap-pairs 加一行動詞提示**  
`renderers.tsx:493` 現在是 `配對 · Match pairs`，改為  
`先點左邊 ← 再點右邊 · Tap left, then right to match`  
或加 sub-text: `(先點左邊，再點右邊)` 在標題下 12px。

**E3 (P1-A 修法) — 砍 Splash dev-jargon**  
`SplashView.tsx:30` 刪除整行 `<p>React 18 + Vite...</p>`。  
若需要保留技術備忘，移入 `CLAUDE.md` 或 footer meta tag，不顯示給用戶。
