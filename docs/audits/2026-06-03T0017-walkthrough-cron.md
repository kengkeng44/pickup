# Walkthrough — 2026-06-03 00:17 UTC

Today's persona: **Kai 凱恩, 15 歲國中生, Android Chrome 128 (Samsung Galaxy A52s), 教室下課 10 分鐘**

情境: 從 LINE 群組拿到連結、無耳機、教室背景噪音、4G LTE、右手大拇指操控

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|------------|
| 0s | LINE 群組有人分享連結，點開 | Chrome 開啟聲 | 點連結 | 「啥 app?」 |
| 2s | 暖米色頁面、4 個 paw 節點在上方、底部 4 個 icon tab | 突然播音樂 | 滑動頁面 | ⚠️ **BGM 突然響，教室裡超尷尬**，手忙腳亂把手機翻面 |
| 4s | 頁面往下滑，看到 24 個圓形節點排成之字形，第一個在輕輕脈動 | — | 點節點 | 「這麼多?要點哪個?」沒有文字說「從這裡開始」 |
| 7s | 點第一個脈動節點，跳 LessonPage，載入中… | — | 等 | 「怎麼要等」 |
| 9s | 出現大貓咪圖 + prompt「Mochi is hungry. What can feed her?」4 個 emoji 格 | — | 點 emoji | 「哦，emoji 選選看，好玩」 |
| 11s | 點 🐟 fish → Mochi 圖跳起、afterText「Mochi 開心地吃了…」→ 「聽 Mochi 的故事 →」按鈕 | sfx 答對音 | 點 CTA | 「快點，剩 8 分鐘了」 |
| 14s | **Narration 卡片出現**「It is dark and cold tonight. I am hungry.」自動 TTS + 22px 喇叭按鈕 | TTS 開始讀（教室裡根本聽不到）| 想點跳過，但沒有 | ⚠️ **沒有跳過鈕**，卡 7 秒，我已在滑 IG |
| 21s | 螢幕自動跳「Mochi is a stray cat.」又一張 narration | 又 TTS | 等 | 「這 app 自己在動?搞什麼」 |
| 25s | Q4 listen-tf：出現喇叭 + blanks「_ _ _ _ _ _ _」+ Yes/No | TTS 播「Mochi sleeps under the old porch.」（聽不到）再播 question（聽不到）| 看 blanks 看不懂，沒聽到 | ⚠️ **question 只有 TTS 沒有文字**，教室裡完全猜測 |
| 27s | 隨手點 Yes | sfx 答對 → 句子 reveal | 等 3 秒自動跳 | 「猜中了，運氣好」不知道 questionEn 是什麼 |
| 30s | Q6 listen-tf：blanks + Yes/No | TTS（聽不到）| 再猜 | ⚠️ 再次 blind guess，根本不知道被問什麼 |
| 33s | 點 No（猜）→ 答對 | sfx | 等 | 「又猜中?」 |
| 36s | Q7 listen-mc 出現：喇叭 + blanks + 4 選項 straw/stay/stray/story | TTS（聽不到）| 看 4 個字選一個 | 「stray 是什麼意思?試試看」→ 點 stray |
| 38s | 答對！解釋「stray = 流浪的」reveal sentence | sfx 答對 | 等 3 秒 | 「哦，猜對了，字義沒看懂」|
| 40s | Q8 Narration 又自動跑：「Every night she visits Grandma's small yard.」 | TTS | 沒事做 | 「又自動跑…」放下手機看別處 |
| 44s | 畫面自動跳 Q9 listen-mc，沒注意 | — | — | 「哦?換題了?」 |
| 46s | 看到 blanks + 選項 road/park/house/yard，喇叭 size 44px 好按 | TTS（聽不到）| 點喇叭嘗試重播（教室沒用）→ 猜 yard | — |
| 48s | 答對，解釋出現 | sfx | 等 | — |
| 51s | Q10 Narration 自動跑 | 貓圖跳 | 沒事 | 「這段剩幾題?」右上角看到 q10/15，嗯還有 5 題 |
| 54s | Q11 listen-mc：blanks + 選項 run/walk/jump/sit | TTS（聽不到）| 看句子猜 | 「climbs to the top」→ 猜 jump，答對 |
| 57s | Q12 listen-tf：question「Does Mochi climb onto the wall to wait for Grandma?」— **只 TTS，不顯示** | TTS（聽不到）| Yes/No 任選 | ⚠️ 連續第 3 次盲猜 |
| 60s | Q13 Narration 自動 | 自動跑 | — | 「下課還剩 5 分鐘，快點」 |
| 63s | Q14 listen-tf：sentence blanks | TTS 播「waits quietly」 | Yes/No | **Giveaway：句子裡 quietly = 不吵，問題猜是問吵不吵，秒選 No** |
| 65s | Q15 listen-mc：sentence + 4 選 | TTS | 猜 waits for the story | 答對 |
| 68s | CompletePanel：🎉 + XP/Accuracy/Time triptych + 「完成 · Continue →」 | sfx confetti | 點按鈕回 map | 「完成了」|
| 70s | 回 map，auto-scroll 到 node 2 | — | 點下一節點 | 「繼續?下課完了，先關掉」|

---

## B. Give-away check

| Q | sentence | questionEn | 風險 | 結論 |
|---|----------|------------|------|------|
| Q14 (listen-tf) | "Mochi waits **quietly** for Grandma's story." | "Does Mochi **shout loudly** to wake Grandma up?" | sentence 有 quietly；question 有 shout loudly → 語意直接相反 → No 秒解 | ⚠️ **Identity giveaway — L1 spec R6 violates** |
| Q12 (listen-tf) | "Tonight Mochi **jumps up** the low wall." | "Does Mochi **climb onto** the wall to wait for Grandma?" | jump≈climb，同義詞轉述 → Yes 推導容易 | P2 semi-giveaway |
| Q6 (listen-tf) | "She finds shelter wherever she can." | "Does Mochi always sleep in the **same place**?" | sentence = no fixed shelter → No 有推導但需理解 | P2 (inference ok) |

---

## C. 這 persona 特有痛點

1. **無耳機 + 教室噪音 → listen-* 題型全瞎**：L1 共 15 Q，其中 10 題是 listen-tf/mc，全靠 TTS 傳遞關鍵資訊。教室環境下 TTS 零可及性 → 等於靠猜，accuracy 看起來 80% 但學習效果為 0。
2. **BGM 無通知無靜音開關**：第一個 tap 觸發 BGM，教室裡突然有音樂，中學生本能把手機翻面或調靜音，破壞 first impression。
3. **Narration 無手動跳過**：自動推進 7-10 秒，15 歲注意力 3-5 秒就飄移，強制等待產生「app 自己在跑」的失控感，反而更快離開。
4. **questionEn 純 TTS 不顯示文字**：listen-tf 題型的實際問題只透過語音傳達，視覺只顯示句子的 blanks。在無耳機環境下，學生完全不知道在問什麼。
5. **NarrationRenderer SpeakerBtn 22px tap target**：narration 卡片裡的喇叭按鈕無 padding，實際可點面積 22×22px，遠低於 Android HIG 48dp 建議值；15 歲大拇指誤觸文字 span 出現 WordHint tooltip 而非播音。

---

## D. P0 / P1 / P2

| 優先 | 編號 | 描述 | 影響 |
|------|------|------|------|
| **P0** | W15-1 | **listen-* 題型在無聲環境完全失效**：questionEn 只有 TTS，無文字顯示；sentence 顯示為 blanks 而非原文。沒有靜音/文字模式替代路徑。60% L1 題型受影響。 | 教室/通勤/公眾場所用戶 = 零學習 |
| **P0** | W15-2 | **NarrationRenderer SpeakerBtn tap target 22px**（renderers.tsx:148，`<SpeakerBtn onClick={…} />` 無 size prop）；button element `width:22, height:22` 無 padding，低於 HIG 44px。 | 手機用戶誤觸率高，尤其大手指/移動中操作 |
| **P1** | W15-3 | **BottomNav 使用 `/mascots/flame.webp`**（BottomNav.tsx:4）但 public/mascots/ 只有 `icon-flame.webp`；Alerts tab icon 在所有裝置顯示 broken image。 | 品牌外觀破損，new user first impression |
| **P1** | W15-4 | **Q14 listen-tf giveaway**（kt-ch1-l1-q7）：sentence「waits quietly」vs questionEn「shout loudly」語意直接相反，No 秒解，無推理 challenge。違反 spec R6 anti-identity rule。 | L1 難度感知歸零，15 歲覺得「太簡單沒意思」 |
| **P1** | W15-5 | **BGM 第一次 tap 無通知啟動**：無靜音選項、無音量 icon、無「即將播放音樂」提示。首次用戶在安靜環境（圖書館/教室）被突然聲音嚇到 → 本能關掉 app。 | Day 1 retention 風險 |
| **P2** | W15-6 | **Narration 無手動跳過鈕**：auto-advance fallback 7-10s（字數×600+4000ms），15 歲手機使用模式是「多工切換」，強制等待 → 回來看已跳題。 | 劇情 context loss → 答題猜測率上升 |
| **P2** | W15-7 | **MapPage 無 onboarding CTA/tooltip**：首次用戶看到 24 節點 + 4 tab，只有第一個節點脈動，無文字「點這裡開始」。低 discoverability，特別是 Z 世代習慣 TikTok 明確 UI 引導。 | First-session engagement drop |

---

## E. Top 3 Actionable（S effort）

**S1 — NarrationRenderer SpeakerBtn 加 padding/size（P0，10 分鐘）**
```tsx
// renderers.tsx:148，改成：
<SpeakerBtn onClick={() => speak(text)} size={44} />
```
`SpeakerBtn` component 本身已支援 `size` prop，只是 NarrationRenderer 的 callsite 沒傳。一行 fix。

**S2 — listen-tf questionEn 加可見文字（P0，30 分鐘）**
```tsx
// ListenTfRenderer revealed=false 區段，在 blanks 下方加：
{qEn && (
  <div style={{ fontSize: 14, color: '#3c2a1c', fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>
    {qEn}
  </div>
)}
```
目前 `qEn` 存在但只走 TTS，視覺完全沒有。加出來即補齊無聲環境可及性。

**S3 — BottomNav flame icon path 修正（P1，2 分鐘）**
```tsx
// BottomNav.tsx:4，改成：
{ path: '/alerts', label: '成就', icon: '/mascots/icon-flame.webp' },
```
`/mascots/flame.webp` 不存在，`/mascots/icon-flame.webp` 存在。路徑錯誤導致 broken icon。

---

*Auditor: Player Walkthrough Agent (5th audit agent) · v2.0.B.cron-walk 2026-06-03*
