# Walkthrough — 2026-06-08 12:17 UTC

Today's persona: **曉蓁 (Xiǎo-zhēn), 11歲台灣女孩，輕度閱讀障礙 (developmental dyslexia)，iPhone 13 mini (375pt) iOS Safari 18**

情境: 週六下午 2pm，媽媽看到 Pickup 廣告「奶奶的睡前英文小故事」，覺得適合，安裝後把手機直接給曉蓁試。曉蓁對英文不抗拒（在學校學），但閱讀速度慢約 60-70% 同齡，容易把 b/d、p/q 搞混，多音節單字需要多看幾次（carefully / wonderful）。視覺密度高的文字塊會讓字母感覺「在跳」。她對聲音 + 圖像的學習效果遠好於純文字。iPhone 13 mini 螢幕 5.4"，375pt wide，DPR 3，字體小的 UI 對她是生理障礙。

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| 0s | 暖米色背景，一串爪印節點蜿蜒往下；HUD 上方 4 個小 icon | 無聲 | 往下滑、點節點 | 「這是什麼？爪印好可愛。我要點第一個。」 |
| 3s | 第一顆節點是橄欖色（已解鎖），其他灰色 | 無 | 點第一顆 | 「只有這個能點嗎？好，點它。」|
| 4s | 載入中… | 無 | 等待 | 「在載入，沒關係。」 |
| 6s | **tap-pairs 畫面**：「Here are 4 words you will meet in tonight's story.」＋ 兩欄 2×4 格，左欄中文（河 / 看 / 老人 / 村莊），右欄英文打亂（river / look / old man / village） | **完全無聲** | 點任意格 | ⚠️ 「沒有聲音。這些英文字怎麼讀？"river"我知道，"village" 是什麼？兩欄要怎麼玩？」— **第一個問題就卡住** |
| 10s | 我點了「河」→ 黃色選中 | 無 | 點右欄 | 「點了一個，等等要點另一欄的。」 |
| 12s | 我猜「river」→ ✓ 配對對了（淡綠色，opacity 0.5）| sfx 正確聲 | 繼續配 | 「哦，有聲音！但下一個 "village" 我不知道怎麼讀也不確定是哪個中文。」 |
| 18s | 我配對錯「看」→「old man」| sfx 錯誤聲，兩格恢復空白 | 再試 | ⚠️ 「我選錯了。但 '看' 是 look 還是 see？我根本不知道 old man 是哪個中文。整個畫面靜止，沒有提示。」|
| 30s | 最終全配對完成 | 正確音效 | 看下一題 | 「過了，但我靠猜的，我不懂每個意思。沒有人告訴我這些字怎麼唸。」|
| 33s | 畫面切換：narration 泡泡「Long ago, an old man and woman lived in a small village.」| TTS 開始唸（rate 0.85） | 點擊喇叭按鈕重播 | 「有聲音了！我邊聽邊看字。rate 0.85 大概對，但我還沒看到 'village' 這個字在哪裡……」 |
| 36s | 畫面自動跳到下一題 (Q3 narration) | 唸 "They were kind, but they had no children." | 無法暫停 | ⚠️ 「等一下！上一句我還沒讀完！字太快消失了。我想多看 "Long ago" 那句，但它已經進 history 了，字變小了堆在上面。」|
| 42s | history 區域累積 2 句；Q3 過去進 Q4 | 繼續有聲音 | 看畫面 | 「history 區文字越來越多，看起來很擠。我不太想看它。」|
| 44s | **listen-tf 畫面**：句子顯示 "\_\_\_\_ \_\_\_\_ \_\_\_\_ ..." + 🎧 instruction + Yes/No 按鈕 | TTS 唸 "Their wooden house stayed very quiet, year after year." | 點 Yes 或 No | 「好，只有 Yes/No，這個簡單！聽聲音就好。」— ✅ dyslexic 最友善的題型 |
| 50s | Q5 narration 出現 | TTS 唸 "Each day, the old man went up the mountain to gather firewood." | 看 / 聽 | 「'gather firewood' 是什麼？聲音唸了但字好長，我跟不上唸的速度看字。」|
| 56s | **listen-mc 畫面** Q6：sentence 用 \_\_\_\_ 遮住，4 個選項英文：fishing / cutting wood / cooking rice / feeding goats | TTS 唸遮住的句子，再唸題目 | 從 4 選項選 | ⚠️ 「四個選項都是英文，沒有中文。'feeding goats' 是什麼？我知道 feeding，但 goats？我看到 'wood' 在 'cutting wood'，跟剛才聽到的句子好像有 'wood'，我點它。」— Jaccard 字詞重疊誘答 (wood appears in stem) |
| 60s | 我點對了 (cutting wood)，4 選項顯示對/錯顏色 + 中文 zh 標注 | sfx 正確 | 等待自動推進 | 「我點對了！但我不確定是對了還是亂猜到。3 秒後自動跳。」|
| 65s | Q7 narration | TTS 唸 | 被動聽 | 「history 區已經 6 句話了，一大塊文字壓著。我不想往上看。」|
| 70s | Q10 **emoji-pick**：「What season was it?」🌸 spring / ☀️ summer / 🍂 autumn / ❄️ winter | 無 TTS | 點 emoji | 「🌸 好可愛！春天！我知道！」— ✅ dyslexic 最友善，零文字負擔 |
| 76s | Q11 narration 自動推進 | TTS 唸 | 看 | 「L1 快結束了，q11/11，耶！」|
| 80s | CompletePanel — XP / Coins 計算，✕ 回去 | 無聲 | 點回去或繼續 | 「完成了！但我還是不知道 'village' 怎麼讀。下一個節點解鎖嗎？」|

---

## B. Give-away / 過度提示 check

**Jaccard 分析 Q6**:
- Stem 隱藏但唸了："He carried home heavy **wood** for the fire."
- Option B: "**cutting wood**" — 和 stem 共享 "wood"，帶領 dyslexic 選這個
- 結果: 此例恰好是正解，但設計上是 Jaccard 誘答而非刻意 give-away。A2 learner 真的理解了嗎？還是只是做到了字形比對？

**mirror / identity check**:
- 無明顯 identity option（選項都是不同動作）。

**tap-pairs 無 TTS — 事實上是 anti-give-away 過頭**:
- 沒有聲音 = 曉蓁無法確認英文發音，靠中英字義推理去配，但 dyslexic 字義解讀慢。
- 如果配對錯了，sfx 錯誤聲後恢復空白 — **沒有告訴她對的是哪對**。純猜 loop。

---

## C. 這 persona 特有痛點

1. **tap-pairs 無 TTS，是 dyslexic learner 的啟動牆** — 第一個題型完全靜音，英文單字無法聲音確認，視覺配對靠字形辨識，而 dyslexic 恰好在字形辨識有困難。"village" / "cutting wood" 這類多音節多字詞對曉蓁是陌生黑洞。App 開頭第一題就最難。

2. **narration 自動推進 2000ms 後跳走，dyslexic 閱讀速度 60-70% 同齡** — iOS TTS onEnd fires → 2000ms dwell → advance。"Long ago, an old man and woman lived in a small village." = 16 字，正常閱讀速度下 TTS 約 6-7 秒，但 dyslexic 同時看字跟聽需要更多時間。曉蓁沒有手動 Continue 按鈕可以暫停，只能被動跟隨。

3. **listen-mc 4 選項無中文（答前）** — "fishing / cutting wood / cooking rice / feeding goats" 全英文選項，11 歲 A2 程度 + dyslexic 要在 3-4 秒內解讀 4 個短語，壓力高。答對後才顯示中文翻譯。dyslexic 需要中文支架"前置"，不是事後獎勵。

4. **history 區文字密度隨題數線性增長** — 每題 narration 完成後 sentence 會 push 到 history，最多一堂課 11 題中 6-7 題 narration 全堆上去。iPhone 13 mini 375pt 螢幕，到 Q7-Q8 時 history 區可能有 6 句密集英文，形成曉蓁最害怕的「一大片文字牆」，她會避免看它。

5. **type-what-you-hear（後面 lesson 會遇到）是 dyslexic 的 nightmare** — 要用 iPhone 13 mini 小鍵盤拼出英文句子，spelling challenge 高。Levenshtein tolerance 3 對 "carefully" / "wooden" 這類單字可能不夠（5 字母以上拼寫錯誤常超過 3 個 edit）。

---

## D. P0 / P1 / P2

| 等級 | 項目 | 位置 | 說明 |
|------|------|------|------|
| **P1** | tap-pairs 無 TTS — 英文詞無法聆聽 | `renderers.tsx:596-670 TapPairsRenderer` | 點 left col 項目時沒有音頻，dyslexic 無法確認英文怎麼讀就要做配對。加一行：點 right col 英文格時 `speak(pairs[origIdx][1])` |
| **P1** | narration 無手動 pause / Continue 選項 | `renderers.tsx:160-201 NarrationRenderer` | 2000ms dwell after TTS onEnd — dyslexic 讀慢，沒有 Continue btn 就只能被動趕。建議同時顯示一個 "繼續" btn，讓閱讀障礙者自己決定跳 |
| **P1** | listen-mc 選項無前置中文翻譯 | `renderers.tsx:320-346` `OptionBtn` | `labelZh` 只在 `revealed` 後顯示。建議至少 option 字數 > 2 字 (非 Yes/No) 時，`revealed = false` 也顯示中文，特別是 A2 + dyslexic |
| **P2** | history 累積文字密度高 — dyslexic overwhelm | `LessonPage.tsx:126-130` history render | 建議 history 最多顯示最新 3 句，較老的 fade/collapse，減少視覺密度 |
| **P2** | type-what-you-hear Levenshtein 3 char tolerance 不足 dyslexic | `renderers.tsx:365-378` editDistance | 建議 `tolerance = len <= 5 ? 1 : len <= 15 ? 2 : len <= 30 ? 4 : 5`（dyslexic 友善 +1 tier）或加 optional phonetic matching |

---

## E. Top 3 Actionable (S effort)

**⭐ #1 tap-pairs: 點 right-col 格時播放英文 TTS** (XS, ~15 min)
```tsx
// renderers.tsx:659 — TapPairsRenderer right column button
onClick={() => {
  tap('right', sIdx);
  try { speak(pairs[origIdx][1], 'en-US', { force: true }); } catch {}
}}
```
- Impact: dyslexic learner 第一題就能確認英文發音，降低猜測比率，消除啟動牆
- 同樣 left-col 點中文也可加（`speak(p[0], 'zh-TW')`，雖非剛需）

**⭐ #2 NarrationRenderer: 加 Continue 按鈕（保留 auto-advance，但給人工 override）** (S, ~30 min)
```tsx
// renderers.tsx:189 NarrationRenderer JSX — 在 narration bubble 下方加按鈕
// 顯示一個 "繼續 →" btn；點了就 advanceOnce()；auto-timer 到期也 advanceOnce()
// advancedRef.current 確保只推進一次
<button onClick={advanceOnce} style={{...}}>繼續 →</button>
```
- Impact: dyslexic reader 自己控制節奏，不再被 TTS onEnd 逼跑
- 同時解決 senior 60+ 閱讀速度問題（B.185 audit 已提，但未實作手動 override）

**⭐ #3 listen-mc 前置 zh 翻譯（非 Yes/No 題）** (XS, ~20 min)
```tsx
// renderers.tsx:335 OptionBtn call in ListenMcRenderer
// 改為：labelZh={optsZh[i]} （移除 `revealed ? optsZh[i] : undefined` 條件）
// 即使 revealed = false，仍顯示中文
```
- Impact: A2 + dyslexic learner 在選答前理解選項，減少猜測，提高真實學習
- 但注意：此改動同時提示了語意，如果題目 correctIndex 語意很明顯的話，降低難度。建議只針對 label.length > 3（非 Yes/No）才顯示 zh。
