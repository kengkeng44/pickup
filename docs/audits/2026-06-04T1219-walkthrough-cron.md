# Walkthrough — 2026-06-04 12:19 UTC

Today's persona: **阿文 (Ah-Wen), 26歲平面設計師, Mild Dyslexic Learner, Android Chrome 128 (Xiaomi Redmi Note 13 / MIUI 14)**

**Dyslexic profile:**
- Confuses similar letterforms (b/d, p/q, m/n) under time pressure
- Reads slower than average — 50-60% of typical reading speed
- Compensates via word-shape recognition (letter height, length, ascenders/descenders)
- Processes audio better than dense text
- School trauma: underlines = "teacher correction" = anxiety
- Situation: couch, 3pm lunch break, 15 min free, first-ever session

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| 0s | MapPage: HUD 4 icons, coral banner "院子裡的第一個故事 · A Story in the Yard", 奶奶 mascot, paw nodes | 無 | 點節點 | 「好可愛！」不過 banner 上方 "Section 1 · 第 1 章" 是 11px uppercase letter-spacing 1.5 — **字母擠在一起根本看不清** |
| 5s | 找到第一個珊瑚色爪節點，上方微文案「從第一顆節點開始 · Tap to begin」| 無 | 點爪 | 微文案 11px — 難讀，但爪夠大，直接點 |
| 6s | LessonPage: ✕ 左上，"q1/11" 右上，「載入中…」 | 無 | 等 | **P2: ✕ 符號 = 學校作業上的「叉叉」→ 看到就有點緊張，不確定要不要點** |
| 7s | Q1 tap-pairs 出現。看到句子 "Here are 4 words you will meet in tonight's story." 下方只有空白 + 文字 "(本題型沒有 pairsEn data)" | 無 | 嘗試點四處 | **⚠️ P0: 配對題完全空白。沒有任何互動元素，也沒有自動推進機制，用戶永遠卡在這裡** |
| 30s | 嘗試點擊螢幕各處。畫面靜止不動 | 無 | 無 | 「我是不是點到什麼弄壞了？是我的問題嗎？」— 阿文平常就對"自己做錯了"有焦慮 |
| 60s | 放棄。點 ✕ 離開課程，回到地圖 | 無 | 點 ✕ 離開 | **第一堂課終結。阿文不會再試。** |

---

### 假設 P0 被修復後的後續路徑

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|-------------|
| 7s(fixed) | Q1 tap-pairs: "Here are 4 words" + 左欄中文「河/看/漂/東西」↔ 右欄英文「river/look/float/something」亂序 | 無 | 點左右配對 | 視覺簡單，一目了然。比看長文句好多了 |
| 15s | Q2 NarrationRenderer: calico 貓頭像 + "Long ago, an old man and woman lived in a small village." 文字下每個英文字都有 1.5px amber dashed 底線 | TTS 讀句 | 等或點喇叭重播 | **P1: 每個字都有底線 = 整段文字像被紅筆劃過。老師批改的創傷記憶。「我哪裡打錯了？」** |
| 17s | narration 進 history，Q3 出現：同樣大量帶底線文字 | TTS 播下一句 | 等 | **P1(延伸): 底線累積。history 3 句以上時，整個畫面變成一片 amber 底線，視覺密度對閱讀障礙者是 sensory overload** |
| 22s | Q4 listen-tf：sentence display area = `____ _______ _____ ______ ____ _____, ____ ____ _____.` + 大喇叭 + [Yes] [No] | TTS 播 "Their wooden house stayed very quiet, year after year." | 點 Yes/No | **P1: 全空格 = 零字形線索。閱讀障礙者靠字形 (高矮/長短) 輔助理解，全底線完全拿走這個補償機制。聽到聲音但無法對應任何視覺錨點** |
| 28s | 選 No（答對），reveal：句子出現 + explanationZh 「推理：安靜的家 → 沒小孩聲 → 答 No」| sfx 答對 | 等 2.5s | 解釋文字小(14px) + 帶底線，閱讀慢，2.5s 已 auto-advance 來不及讀完 |
| 35s | Q6 listen-mc：options 「fishing / cutting wood / cooking rice / feeding goats」 | TTS | 點選項 | "fishing" vs "feeding" — 字頭 f，字尾 ing，形狀相近，需要多看兩秒 |
| 45s | Q8 type-what-you-hear：出現 textarea + 送出按鈕 | TTS 播 sentence | 打字 | **P1(typing): Android 鍵盤彈起後，送出按鈕是否還在視窗內？無法確認。閱讀障礙者打字誤字率高 ("Their"→"Thier", "quiet"→"quite"), 需要多次嘗試** |
| 55s | 打出 "Thier wuoden house staid very quite, year after year." — 約 5 個 edit distance | 無 | 按送出 | **P2: Levenshtein tolerance = 3，但此句錯誤 ≥5 → 判錯。阿文看到錯誤很難受，不知道對應到哪個字** |
| 65s | history 累積 8 條 NarrativeLine，每行都有 speaker icon + 完整 amber-underlined 句子 | 無 | 捲動 | **P1(延伸): 視覺密度高峰。8 句 × 每字底線 = 極度擁擠。閱讀障礙者光掃視 history 就需要多花兩倍時間** |

---

## B. Give-away check

| 題型 | Jaccard / mirror / identity leak |
|------|----------------------------------|
| listen-tf | 全空格不洩漏答案，Y/N 二選一 leakage 50% by chance — acceptable |
| listen-mc | options 不包含 sentence 原文 — clean |
| type-what-you-hear | 無 hint，純 audio → 最難 |
| tap-pairs Q1 | **P0: 不渲染內容，無法評估** |

---

## C. 這 persona 特有痛點

1. **tap-pairs 永久卡住 (P0)** — 所有課程 Q1 都是 tap-pairs vocab hook，renderer 讀 `q.pairsEn`（undefined）而 JSON 字段是 `pairs`，渲染空白且無推進機制。這對所有用戶都是 P0，但對阿文來說是「我一定又做錯了」的確認，不會再回來。

2. **每字 dashed underline = 校正創傷觸發** — `.pickup-lesson-words .word` 對所有字設 `border-bottom-color: #c8a878` 永遠可見。對有閱讀障礙的用戶，密集底線 = 「老師說我全錯了」的視覺記憶。現有設計是為了提示「可點擊」，但 signal/noise 比太差。

3. **listen-tf 全空格 = 無字形補償** — `blanks(en)` 把每個字換成等長底線串，完全移除字形線索。閱讀障礙者仰賴的補償策略 (word shape) 被設計抹除。解法：保留第一個字母 (`h___e`) 或用固定長度底線（不按字長）讓用戶聚焦於 audio 而非字形猜測。

4. **✕ 跟答錯的 ✕ 視覺一致** — LessonPage 頂左的 close ✕ 和直覺中「錯誤標記」相同。閱讀障礙者對符號意義更敏感，容易混淆。

5. **history 底線累積 overload** — 每進一題新 narration 就 push 一行帶全字底線的文字進 history。10 題課程結束時，畫面上可能有 6-8 條 amber-underlined 句子。閱讀障礙者的視覺處理負擔是一般用戶的 2-3 倍，這個累積效果讓畫面難以導航。

---

## D. P0 / P1 / P2

### P0 — 30秒關 app 等級

| # | 位置 | 問題 |
|---|------|------|
| P0-A | `renderers.tsx:TapPairsRenderer` L~490 | `q.pairsEn ?? []` 永遠 `[]`，因 JSON 字段是 `pairs`（物件陣列）not `pairsEn`（tuple 陣列）。顯示 "(本題型沒有 pairsEn data)"，無任何推進機制，**用戶永遠卡在 Q1**。影響所有章節所有 lesson。 |

### P1 — 影響完課率

| # | 位置 | 問題 |
|---|------|------|
| P1-A | `src/style.css:1113` `.pickup-lesson-words .word` | 所有 word span 永遠顯示 amber dashed bottom-border。對閱讀障礙者，密集底線=校正創傷。建議：降低 opacity to 0.4 / 用 dotted 代替 dashed / 或改為 on-hover-only |
| P1-B | `renderers.tsx:blanks()` | listen-tf 全空格拿走所有字形線索。閱讀障礙者特有弱點。建議：顯示首字母 (`h___`, `w_____`) |
| P1-C | `renderers.tsx:TypeWhatYouHearRenderer` | Android 鍵盤彈起後 submit button 可能滾出視窗。需確認有 `scrollIntoView` 或 sticky CTA |

### P2 — 次要摩擦

| # | 位置 | 問題 |
|---|------|------|
| P2-A | `LessonPage.tsx` close button | ✕ 符號與答錯指示符號視覺一致，閱讀障礙者對符號意義敏感 |
| P2-B | `LessonPage.tsx:NarrativeLine` | History 隨題數增加，6-8 句 × 全字底線 → sensory overload。建議：history 超過 5 句折疊 |

---

## E. Top 3 Actionable (小工作量，高影響)

### 🔴 Fix 1: tap-pairs pairsEn → pairs (P0, ~15 min)

`renderers.tsx` `TapPairsRenderer` 改一行：
```ts
// before
const pairs = q.pairsEn ?? [];
// after — read 'pairs' field (objects), fall back to pairsEn tuples for backwards compat
const rawPairs = (q as unknown as { pairs?: Array<{ left: string; right: string }> }).pairs;
const pairs: Array<[string, string]> = rawPairs
  ? rawPairs.map(p => [p.left, p.right])
  : (q.pairsEn ?? []);
```
同時在 `if (pairs.length === 0)` fallback 加 auto-advance (1500ms) 避免 hang。

### 🟡 Fix 2: pickup-lesson-words word underline — 降低 always-on 強度 (P1-A, ~10 min)

`src/style.css` `.pickup-lesson-words .word` 改：
```css
border-bottom: 1px dotted rgba(200, 168, 120, 0.35); /* was: 1.5px dashed #c8a878 */
```
Dotted 比 dashed 視覺噪音低；opacity 0.35 vs 1.0 降低「全部需要修正」感。
Active/hinted state 保持原樣（還是需要明顯反饋）。

### 🟡 Fix 3: TypeWhatYouHear submit button sticky on Android (P1-C, ~20 min)

在 `TypeWhatYouHearRenderer` textarea `onFocus` 時 `submitRef.current?.scrollIntoView({ block: 'end' })` 確保鍵盤彈起後 CTA 仍可見。

---

*Auditor: Player Walkthrough Agent, run 2026-06-04 12:19 UTC*
*Persona rotation: #6 Dyslexic learner (first use) × Android Chrome 128*
*Next unvisited: Persona 2 (A2 下班接孩 10pm), Persona 3 (B1 進階), Persona 8 (學習創傷)*
