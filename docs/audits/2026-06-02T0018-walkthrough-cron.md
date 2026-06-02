# Walkthrough — 2026-06-02 00:18 UTC

Today's persona: **Senior 60+ 阿嬤，退休小學教師，iPad Pro landscape，iOS Safari 18**

情境: 女兒推薦這個 App 希望媽媽練英文。iPad Pro 12.9" 橫放，Safari 18，第一次打開。
有老花眼、手指靈敏度不如年輕人。A2 以下英文，拼字靠記憶。

---

## A. 時間軸

| t (s) | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|-------|--------|--------|--------|-------------|
| 0 | iPad 橫放開 Safari，URL pickupwords.pages.dev。App 出現在螢幕正中央，寬只有 480px，兩側各空了 ~440px 的暖米色。感覺像在大螢幕看手機網頁 | 無 | 滑動 | **P2**: iPad landscape 大量側邊空白，對退休教師來說很奇怪——「我 iPad 的畫面沒用到？」感覺 App 不專業 |
| 3 | HUD 頂列：4 個小圖示（旗子 / 皇冠 / 金幣 / 火焰），圖示本體 24px，間距 6px，padding 8/6px。章節 banner 珊瑚色大字。24 個爪印節點沿曲線排列 | 無 | 點任何地方 | **P1**: HUD icon tap area ≈ 40×38px，低於 Apple HIG 44×44pt 最低線。老人拇指直徑 ~10mm，容易點不到 |
| 6 | 嘗試 pinch-zoom 放大（Safari 允許）→ 節點位置視覺偏移，手指對準卻沒反應（實際 touch point 跑到別的 element） | 無 | 嘗試點第 1 個 node | **P1**: 縮放後 fixed-position 元素錯位；老人習慣 iPad 上先 zoom 再點，這裡反而更難點 |
| 8 | 點到第 1 個爪印節點 → `/lesson/1/kt-ch1-l1`。頂部「✕」(22px, 棕色 #8b6f4a) + 「q1/14」(11px, 棕色) 右上角 | 完全無聲（iOS Safari first-interaction 未觸發 TTS） | 等 | **P0**: iOS Safari 不允許在頁面互動前播放音訊。第一次進 lesson 靜音，老人以為耳機壞了或 App 出問題 |
| 10 | Q1 NarrationRenderer：三花貓圓形頭像 44px + 右側「It is dark and cold tonight.」16px 文字 + 左上角 22×22px 喇叭圖示 | 靜音（TTS 未觸發） | 嘗試點喇叭 | **P1**: 喇叭按鈕實際可點面積只有 22×22px（img 20×20）。老師手指每次點偏右，誤觸文字 span 而非 button |
| 12 | 老師剛開始讀 "It is dark and cold tonight." ——句子突然消失！Q2「Mochi is a stray cat.」出現 | TTS fallback timer 5-6s 後 auto-advance，老師還在看 | 無法阻止 | **P0**: NarrationRenderer 沒有「確認我讀完了」的手勢。TTS 結束後立即 advance（無 dwell）。老師讀速慢，還沒看懂就換題 |
| 14 | Q2 narration 又出現一秒就消失（"Mochi is a stray cat." 6 字，TTS ≈ 3s，立即推進）。Q3 listen-tf 冒出來：大喇叭 48px + 空格橫線「\_\_\_ \_\_\_ \_\_ \_\_\_\_\_...」+ 🎧 說明 + Yes/No 兩鈕 | TTS 播句子（若 iOS 解鎖了） | 點喇叭或 Yes/No | **P2**: blank 空格顯示「\_\_\_ \_\_\_ \_\_\_」讓老師困惑——「我要填？還是聽？」指示文字「🎧 點喇叭聽完聲音再選答案」用 font 13px muted brown，老花眼看不清 |
| 18 | 老師點 Yes（正確）→ 題目 flash 綠色 → 2.5s 後自動推進 | sfxCorrect | 看 feedback | **P2**: 2.5s 後就換題。老師還在讀 explanationZh（如果有），又被打斷 |
| 22 | 繼續推進。L1 共 14 題，歷史文字累積：NarrativeLine × 5 ≈ 5 × 34px = 170px。加上 listen-mc 問題 + 4 個 OptionBtn 各 48px ≈ 200px。加上 top HUD 60px + history 170px = 430px。iPad landscape 可視高度 768px，還可以。但題目 8 時歷史 × 7 行 ≈ 7 × 34 = 238px + HUD 60 + Q renderer 350px = 648px。已接近邊緣 | TTS | 需要開始滑動 | **P0**: 到 Q8-Q10 左右，answer buttons 滑出 iPad landscape 768px 可視窗口外。老師看不到選項，以為 App 壞掉 |
| 28 | 老師沒意識到要 scroll。頁面停在那裡，TTS 聲音出現但沒有選項可以點。等了 10 秒後 auto-advance（listen-mc 在 revealed 後 3s advance） | TTS 還在播 | 無操作，只能等 | **P0**: 看不到 buttons → 什麼都沒點 → 系統判定「沒回答」但自動推進（revealed 後 3s timer）。老師以為 App 自己跑，不知道自己回答了什麼 |
| 33 | 終於遇到 type-what-you-hear 題。iPad 鍵盤從下方彈出（佔 300px）。剩下可視窗口壓縮到 ~468px。Textarea placeholder "Type what you hear…" | TTS 播英文句子 | 要打英文 | **P0**: 老師 A2 程度要精確拼出「Tonight she jumps up the low wall.」幾乎不可能。normalize() 允許標點差異但不允許拼字錯。打成「tonight she jump the wall」→ 完全 wrong。5s 後跳過，沒有 retry 機會 |
| 38 | 錯誤後5s跳題，看到正確答案，老師感到沮喪 | sfxWrong | 等待 | **P1**: type-what-you-hear 沒有 blindRetry。其他題型「答錯保留讓你重試」但這題型直接跳走，老人覺得不公平 |
| 42 | Lesson 1 完成頁：🎉 confetti + "Lesson complete!" 22px + XP/Accuracy/Time 三格卡片 + "完成 · Continue →" 按鈕 | 無 | 按 Continue | P2: 按鈕 `padding: '14px 36px'` 在 480px 寬 container 裡置中，不是全寬。老師沒有 instinct 往中間點（習慣全寬 CTA） |
| 46 | navigate('/') → MapPage。Map 從頂部開始顯示，L1 在第一個節點（綠色 ✓）。但 L2 應該在第二個節點已解鎖。Map 沒有自動 scroll 到 L2 或 highlight 新解鎖節點 | 無 | 自己在 24 個 node 中找下一個 | **P1**: 老師不知道「我現在應該點哪個？」Map 沒有 scroll-to-current 也沒有 pulse 動畫標示「下一步在這裡」 |

---

## B. Give-away check（answer leak / mirror / identity）

前次審計已標出 L1 listen-mc/listen-tf 的 P0 history-mirror leak（同一個 persona 不同角度確認）。

本 persona 角度有額外 twist：

- **Senior 讀速慢 → history 對她幾乎沒幫助**：narration 消失太快，她沒讀完就換題；即使 history 有答案，她也沒能力在 2.5s auto-advance 前掃描並利用。
- **這讓 listen-mc 的 give-away 從「太簡單」變成「語意焦慮」**：老師其實想好好學，但因為音訊不穩 + 時間壓力，她感受到的不是「偷看作弊感」而是「我是不是太笨才要靠螢幕文字？」
- **Negation mirror 題（"shout loudly" vs "waits quietly"）**：老人邏輯推理沒問題，但速度慢。在自動推進壓力下，她可能瞎猜 No 而非真正理解。

---

## C. 這 persona 特有痛點

1. **iPad landscape 空白 + 窄欄佈局 (P2)**：480px max-width 在 1366px 寬 iPad 上。老師第一反應是「螢幕破版」，可信度下降，可能直接關掉。

2. **NarrationRenderer 零 dwell 時間 (P0)**：TTS 結束 → 立即推進。老師讀速慢 + 老花眼需要對焦時間。每題都在追著 App 跑，完全無法保持學習節奏。

3. **Scroll-off-screen answer buttons (P0, iPad landscape 768px 高)**：累積約 8-10 題歷史後，OptionBtn 全部滑出可視區。老師不知道要 scroll。等 TTS 結束後系統自動計分，她以為自己沒作答。

4. **type-what-you-hear strict exact match + no retry (P1)**：鍵盤輸入英文全句對 60+ A2 老師是最高難度任務。一次失敗 5s 跳走，無學習價值。

5. **SpeakerBtn 22px tap target (P1)**：在 NarrationRenderer 歷史 + 全 lesson 中，所有 replay speaker 只有 22px。老師每次需要重聽都 miss-tap 2-3 次。

---

## D. Bug/UX Issues

### P0 (30s 內可能關 App)

| # | 問題 | 位置 | 影響 |
|---|------|------|------|
| P0-A | iOS Safari first-interaction TTS 靜音 + 老人不察覺有音訊 | NarrationRenderer `speak()` | 老人以為 App 無聲，沒有學習 |
| P0-B | NarrationRenderer auto-advance 無 dwell：TTS 結束立即推進 | `speak(..., { onEnd: advanceOnce })` | 老人讀速 < TTS，永遠追不上 |
| P0-C | history 累積後 answer buttons scroll off iPad landscape viewport (768px 高) | LessonPage layout 無 sticky bottom | 老人卡住，無法回答，浪費一題 |
| P0-D | type-what-you-hear strict exact match，無 retry，60+ A2 幾乎必錯必跳 | `TypeWhatYouHearRenderer` norm() compare | 最挫折時刻，可能導致放棄 |

### P1 (體驗重大受損)

| # | 問題 | 位置 |
|---|------|------|
| P1-A | SpeakerBtn 22px tap area（NarrationRenderer 歷史行）< 44pt HIG | `NarrativeLine` 22px button |
| P1-B | Map 回來後沒 scroll-to-next 或 highlight 解鎖 node | MapPage navigate('/') 後 no state scroll |
| P1-C | type-what-you-hear 沒有 blindRetry，其他題型有；不一致 | `TypeWhatYouHearRenderer` |
| P1-D | HUD icon tap area ≈ 38-40px < 44pt | `HudIcon` padding 8/6px |

### P2 (體驗下降)

| # | 問題 | 位置 |
|---|------|------|
| P2-A | iPad landscape 480px 欄位兩側大量空白，視覺不專業 | `#app max-width: 480px` 無 landscape 適配 |
| P2-B | listen-tf 指示文字 13px muted brown，老花眼難閱 | `font: 13` `color: #8b6f4a` |
| P2-C | q1/14 counter 11px，老人讀不到 | `fontSize: 11` in LessonPage header |
| P2-D | completePanel Continue 按鈕非全寬，老人 instinct 不對 | `padding: '14px 36px'` centered |

---

## E. Top 3 Actionable（S effort）

### #1 — NarrationRenderer: 加 2s post-TTS dwell 再推進（30 min）
**位置**: `renderers.tsx` NarrationRenderer，`speak()` 的 `onEnd` callback  
**改法**:
```ts
// 現在: onEnd 立即 advance
const advanceOnce = () => { ... onAdvance(text); };
speak(text, 'en-US', { onEnd: advanceOnce });

// 改後: TTS 結束後多等 2000ms
speak(text, 'en-US', { onEnd: () => window.setTimeout(advanceOnce, 2000) });
// fallback timer 也相應加 2000ms
const fallbackMs = Math.max(7000, text.split(/\s+/).length * 600 + 4000);
```
**效果**: 老人有 2s 視覺確認窗口；B1/A2 用戶讀速 ≈ 200wpm，7 字 ≈ 2.1s，加上 2s dwell ≈ 合理。

### #2 — LessonPage: answer area sticky bottom（2h）
**位置**: `LessonPage.tsx` + 各 Renderer  
**改法**: 把 Renderer 的 options 部分（Yes/No 鈕、OptionBtn 列、Submit）抽出到 sticky footer `position: fixed; bottom: 0; width: 100%`；narration / question text scroll 在上方。  
**效果**: 無論 history 多長，老人永遠看得到答題區。Duolingo 原版也是這個 pattern。

### #3 — type-what-you-hear: Levenshtein distance tolerance = 2（1h）
**位置**: `TypeWhatYouHearRenderer` `submit()` 比對邏輯  
**改法**:
```ts
// 加 fuzzy match fallback
import { distance } from 'fastest-levenshtein'; // or 自己實作
const norm = ...;
const exact = norm(text) === norm(en);
// allow 1-2 char edit distance as partial credit / still-correct
const editDist = distance(norm(text), norm(en));
const correct = exact || editDist <= 2;
```
**效果**: "Moochi" → "Mochi" (1 char) = still correct。老人拼字差一點不被判全錯。

---

*Auditor note: 本 session 第 2 次 cron-walk。Persona rotation: prev = A2 台灣成人通勤，today = Senior 60+ iPad landscape。P0 count 4 (vs 5 last session)，但 P0-B/C 是新類別（timing/layout），未被前次捕捉。*
