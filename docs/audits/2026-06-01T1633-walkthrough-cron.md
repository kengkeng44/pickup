# Pickup Player Walkthrough Cron — 2026-06-01 16:33 UTC

> Auditor persona: A2 程度台灣成人，下班後手機使用，拇指操作，看長英文句要停 2-3 秒。

---

## A. 時間軸 table (L1 = kt-ch1-l1, 14 Q)

| t (s) | 我看到 | 我聽到 | 我可做 | 痛點 |
|-------|--------|--------|--------|------|
| 0 | MapPage：4 HUD icon (Flag EN / Crown 1 / Coin 0 / Flame 0) + 大珊瑚色 banner「院子裡的第一個故事 · A Story in the Yard ≡」+ 奶奶柴犬 mascot + 鋪鋪爪爪節點 | 無 | 點任何東西 | Banner 最大最顯眼，看起來像 CTA |
| 2 | 我點了 banner → 跳到 /chapters 章節列表 | 無 | 選章節或按返回 | **P1**: banner tap → 章節切換器，不是「開始」，新用戶迷路 5-10s |
| 7 | 返回 Map，找到第 1 個珊瑚色爪印節點，上方有「🐾 點任何節點開始 · Tap to begin」微文案 | 無 | 點爪節點 | 微文案很小、絕對定位在頂部，容易被 mascot 遮住 |
| 8 | 點爪 → `/lesson/1/kt-ch1-l1` 載入；看到「✕」(左) + 「q1/14」(右) | 無 | 等 JSON fetch | 0.5-1s 空白 loading 無 spinner indicator |
| 9 | Q1 NarrationRenderer：貓咪頭像圓圈 + 說話框「It is dark and cold tonight.」+ 小喇叭 | TTS 自動播「It is dark and cold tonight.」| 按小喇叭重播 | 句子一出現聲音就開始，來不及看清楚 |
| 11 | Q1 自動消失，Q2 出現：「Mochi is a stray cat.」/ history 出現 Q1 文字 | TTS 播「Mochi is a stray cat.」| 等 | 歷史文字出現速度快，A2 來不及細讀就換題 |
| 13 | **Q3 listen-tf**：history 頂端顯示「It is dark and cold tonight.」「Mochi is a stray cat.」/ 大喇叭 48px / 一整排底線「\_\_\_ \_\_\_\_ \_\_\_\_ \_\_\_ \_\_\_ \_\_\_\_」/ 指示「🎧 點喇叭聽完聲音再選答案」/ [Yes] [No] 兩鈕 | TTS 播 sentence + 400ms 後播 questionEn「Does Mochi sleep outside?」| 點 Yes / No | **P1-a**: 問題文字完全不顯示——只能聽；若 iOS TTS 失敗，user 完全不知道問什麼。**P1-b**: 全句空格給零上下文，audio-only 挑戰超過 A2 難度定位 |
| 16 | 點 Yes → 正確 (綠色) → 句子 reveal + auto-advance 2500ms | sfx 答對音 | 等 | 2.5s 有點快；沒有 explanationZh |
| 18 | Q4 narration n3：「Cold rain falls on her thin fur.」自動播放 push 到 history | TTS | 等 | — |
| 20 | **Q5 listen-tf q2**：history 3 句 / 全空格 / 播 + 問「Does Mochi always sleep in the same place?」| TTS | 點 Yes/No | 問題文字仍不顯示，但 A2 理解「always same place」 ≈ ok |
| 23 | **Q6 listen-mc q3**：history 含「**Mochi is a stray cat.**」/ 全空格 / 問「What kind of cat is Mochi?」/ 選項 [straw][stay][**stray**][story] | TTS 播 sentence | 點選項 | ⚠️ **P0 LEAK**: 我看到 history 上面寫 "stray cat"，直接點 "stray"，不需要聽。 |
| 25 | 點 stray → 正確 → reveal | sfx 答對 | 等 | 感覺太容易，我沒真正「聽」 |
| 27 | Q7 narration n4：「Every night she visits Grandma's small yard.」push history | TTS | 等 | — |
| 29 | **Q8 listen-mc q4**：history 含「**Every night she visits Grandma's small yard.**」/ 問「Where does Mochi go every night?」/ 選項 [road][park][house][**yard**] | TTS | 點選項 | ⚠️ **P0 LEAK**: history 上清楚寫 "yard"，直接點，不用聽 |
| 31 | Q9 narration n5：「Tonight she jumps up the low wall.」push history | TTS | 等 | — |
| 33 | **Q10 listen-mc q5**：history 含「**Tonight she jumps up the low wall.**」/ 問「What does Mochi do to get onto the wall?」/ 選項 [run][walk][**jump**][sit] | TTS | 點選項 | ⚠️ **P0 LEAK**: history 有「jumps」→ 答案「jump」顯而易見 |
| 35 | **Q11 listen-tf q6**：sentence="Tonight Mochi jumps up the low wall." / n5 已在 history（幾乎同句）/ 問「Does Mochi climb onto the wall to wait for Grandma?」| TTS | 點 Yes/No | ⚠️ **P0 LEAK**: n5 = q6 sentence 除「she」→「Mochi」外完全相同 |
| 37 | Q12 narration n6：「She waits quietly for Grandma's story.」push history | TTS | 等 | — |
| 39 | **Q13 listen-tf q7**：n6 在 history「She waits quietly...」/ 問「Does Mochi **shout loudly** to wake Grandma up?」[Yes][No] | TTS | 點 Yes/No | ⚠️ **P0 LEAK** + **Negation mirror**: n6 說 "waits quietly" → 問 "shout loudly" → answer=No 無腦推 |
| 41 | **Q14 listen-mc q8**：n6「She waits quietly for Grandma's story.」在 history / 問「What does Mochi do after jumping up?」/ 選項包含「waits for the story」| TTS | 點選項 | ⚠️ **P0 LEAK**: n6 的「waits... story」→「waits for the story」語義直連 |
| 44 | CompletePanel：🎉 + XP/ACCURACY/TIME 三格 + 「完成 · Continue →」綠鈕 | confetti CSS | 點 Continue | 完成感 OK；但我從未真正「聽」過半道題目 |

---

## B. Give-away violations

### 系統性根因
`LessonPage.tsx:66-68`：每個 narration 的 `onAdvance(text)` 把完整句子 push 進 `history` → 畫面上方可見 → 緊接著的 listen-mc/listen-tf 直接考 history 裡的詞。

### 逐題清單

| Q id | type | history 中的洩漏句 | 洩漏詞/結構 | 嚴重度 |
|------|------|--------------------|------------|--------|
| kt-ch1-l1-q3 | listen-mc | n2: "Mochi is a **stray** cat." | answer "stray" 直接出現 | P0 Jaccard-word |
| kt-ch1-l1-q4 | listen-mc | n4: "...Grandma's small **yard**." | answer "yard" 直接出現 | P0 Jaccard-word |
| kt-ch1-l1-q5 | listen-mc | n5: "Tonight she **jumps** up..." | answer "jump" 字串包含 | P0 Jaccard-word |
| kt-ch1-l1-q6 | listen-tf | n5: "Tonight she jumps up the low wall." vs sentence "Tonight **Mochi** jumps up the low wall." | Jaccard=0.75 > 0.7；僅 she→Mochi pronoun swap | P0 Grammar-mirror |
| kt-ch1-l1-q7 | listen-tf | n6: "She waits **quietly**..." vs Q negation "shout **loudly**" | Negation mirror + Jaccard=0.71 | P0 Negation-mirror |
| kt-ch1-l1-q8 | listen-mc | n6: "She **waits**... for Grandma's **story**." | answer "waits for the story" 語義直連 | P0 Semantic-mirror |

**6/8 互動題 (75%) 可不聽直接從 history 作答。**

### 修法建議
`LessonPage.tsx:66-68`：將 narration snapshot 延遲加入 history，等「下一個互動題答對後」再顯示。

```diff
// LessonPage.tsx
-const onAdvance = (snapshot?: string) => {
-  if (snapshot) setHistory(h => [...h, snapshot]);
-  setIdx(i => i + 1);
-};
+const pendingNarration = useRef<string | null>(null);
+
+const onAdvance = (snapshot?: string) => {
+  const q = lesson.questions[idx];
+  if (snapshot && q.type === 'narration') {
+    pendingNarration.current = snapshot; // hold, show only after next interactive Q
+  } else if (snapshot) {
+    // interactive Q advance: flush pending narration first
+    setHistory(h => pendingNarration.current
+      ? [...h, pendingNarration.current, snapshot]
+      : [...h, snapshot]);
+    pendingNarration.current = null;
+  }
+  setIdx(i => i + 1);
+};
```

---

## C. 第一印象 (0-10s)

- 我看到的第一個「大元素」是珊瑚色 chapter banner，上面有 ≡ 符號。**我以為那是「開始」按鈕，點了進去章節切換器。** 真正的入口（第一個爪爪節點）在 mascot 圖片下方，視覺層次比 banner 低。
- HUD 4 個 icon（Flag/Crown/Coin/Flame）對新用戶沒有即時意義；Coin 固定顯示「0」，讓人以為 app 殘破或未完成。
- Grandma + Shiba mascot 可愛，但 absolute-positioned 貼左側 (left:14, top:30 / left:115, top:80)，有機率遮到第 1-2 個爪爪節點（節點 i=0 的 `marginLeft:50` 在 zigzag 佈局中可能落在 Shiba 圖層後面）。
- 「🐾 點任何節點開始 · Tap to begin」dashed amber hint 是 `position:absolute, top:4`——容易被 mascots 遮住，且字體 11px 太小，拇指操作不易察覺。
- 進 lesson 後前 4 秒連續 3 個 narration 自動輪流（n1→n2→Q3），A2 用戶沒有停下來思考的機會。

---

## D. P0/P1/P2 issues

### P0 (30s 內關 app)：3 條

**P0-1: 75% listen Q 被 narration history 洩底**
- root cause: `LessonPage.tsx:67` `setHistory(h => [...h, snapshot])` on narration advance — narrations visible on-screen before their test questions
- 修法: 如 §B 所示，延遲 narration 顯示至下一個互動 Q 作答後 (`pendingNarration` pattern)
- 影響: 整個 L1 listening 練習無意義；用戶停止聽 audio，直接看文字 → 無法真正學習

**P0-2: Listen-tf 問題文字不顯示（audio-only）**
- root cause: `renderers.tsx:169-179` — ListenTfRenderer pre-reveal 區塊無 `qEn` 文字顯示，問題只靠 TTS audio
- 修法: 在指示文字下加 `<div style={{...}}>{qEn}</div>`（先灰色顯示，reveal 後正常色）
- 影響: iOS TTS 失敗（私密瀏覽 / 靜音）時 user 完全不知道問什麼 → 隨機亂點 → 挫折離開

**P0-3: Listen-tf/mc 全句空格給零視覺上下文**
- root cause: `renderers.tsx:59,174,232` `blanks(en)` 替換整句每詞為 `____`
- 修法: 只遮蓋 key word（correctIndex 對應詞），其餘詞可見；或顯示 topic clue（例如貓咪圖）
- 影響: A2 learner 需要上下文才能處理 audio；全空格 = zero anchor = 理解失敗感

### P1 (1 lesson 後不回)：3 條

**P1-1: Chapter banner 主視覺點下去是章節切換器，不是 lesson**
- root cause: `MapPage.tsx:55` `onClick={() => navigate('/chapters')}`
- 修法: 新用戶（completed.size === 0）時 banner 改 navigate 到第 1 個 lesson；或加 ↓ 箭頭指向節點並降低 banner 視覺 CTA 感
- 影響: 新用戶第一次 tap 迷路 5-10s → 降低第一印象

**P1-2: Narration 自動推進後無 grace period，A2 來不及讀**
- root cause: `renderers.tsx:108-118` `advanceOnce` 在 `onEnd` 立即觸發
- 修法: `onEnd` 後加 1500ms setTimeout 再 advance，或在 audio 結束後顯示「繼續 →」tap 鈕
- 影響: "It is dark and cold tonight." / "Mochi is a stray cat." 各約 2s；A2 閱讀速度 3-5s → 沒看完就消失 → 故事脈絡無法建立

**P1-3: Coin HUD 固定顯示「0」，無任何增加機制**
- root cause: `MapPage.tsx:51` `value="0"` hardcoded；L1 無 coin 獎勵流程
- 修法: 暫時隱藏 coin HUD（如同 streak 0 時的 logic），或補上 coin 贏取機制
- 影響: 見到「0」的 dead metric 降低遊戲感期待

### P2 (polish)：4 條

**P2-1: App.tsx main paddingBottom:64 在 lesson 頁多餘空白**
- `App.tsx:38` `paddingBottom: 64`；BottomNav 在 lesson 隱藏，64px 白白佔用 lesson 底部空間
- 修法: LessonPage wrapper 覆蓋 `paddingBottom:0`，或 App.tsx 讀 route 動態調整

**P2-2: History narrations 累積到 Q14 時約 160px 高，小螢幕需滾動才看到選項**
- root cause: 6 條 narration × ~28px 行高 = ~168px history block
- 修法: history 只顯示最近 2-3 句（或 P0-1 修好後自然解決，因 narration 延遲顯示讓歷史量變少）

**P2-3: NarrationRenderer 小喇叭 (22px) 放在語泡內，不夠 thumb-friendly**
- `renderers.tsx:124` SpeakerBtn size 預設 22px（最小可接受觸控 44px per Apple HIG）
- 修法: 在 narration card 內喇叭改 size={36} 或 size={44}

**P2-4: 完成後 XP 計算只計互動題 (log.length)，narration 不計入，總 XP 偏低**
- `LessonPage.tsx:128` `correct * 10`；8 互動 Q 全對 = 80 XP；感覺比 Duolingo 低
- 修法: 完成 narration 也給少量 XP（e.g. +2），或把基礎 lesson-complete bonus 加進去

---

## E. Top 3 actionable (S effort)

| 優先 | 修法 | 檔案:行 | 預估 effort |
|------|------|---------|------------|
| ⭐ 1 | **narration 延遲入 history**（pendingNarration pattern）→ 消滅 6/8 give-away | `LessonPage.tsx:66-68` | 20 min |
| ⭐ 2 | **listen-tf 顯示 qEn 文字**（pre-reveal 加一行 `<div>{qEn}</div>`）→ 消滅 P0-2 audio-only 問題 | `renderers.tsx:177` | 5 min |
| ⭐ 3 | **blanks → key-word-only blank**（只遮 correctIndex 對應詞，其餘可見）→ 降 P0-3 | `renderers.tsx:57-59` + listen-mc sentence display | 30 min |
