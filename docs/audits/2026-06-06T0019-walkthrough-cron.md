# Walkthrough — 2026-06-06 00:19 UTC

Today's persona: **小玲 (Ling), 28歲台灣上班族, 台北捷運早上 8am 通勤, iPhone 14 iOS Safari 18**

情境: 站立, 右手拇指持機, 左耳一只 AirPod, 背景噪音 65dB. WiFi-off, 4G LTE. 通勤時間 25 min.

---

## A. 時間軸

| t | 我看到 | 我聽到 | 我可做 | 我覺得 / 痛 |
|---|--------|--------|--------|------------|
| 0s | Splash: 拾光 logo + calico 貓圖 + 「奶奶的睡前英文小故事」+ 開始 · Begin → | 無聲 (iOS 第一次開啟, TTS 未解鎖) | 點「開始 · Begin →」 | 「睡前小故事… 我是上班族不是小孩欸」輕微疑惑, 但 CTA 夠清楚 |
| 3s | Map 畫面: 7 個 paw node, 第 1 個橄欖綠脈衝, 章節 banner「院子裡的第一個故事」 | 無 | 點第 1 個節點 | 「OK 直接開始」, 拇指準確點到大顆 paw 按鈕, 無問題 |
| 5s | Lesson 進入, 頂部 q1/11 計數器 | 無 | 看題目 | 「11 題, 不知道幾分鐘可以完成? 我 8:32 要下車」微緊張 |
| 6s | Q1: 文字 "Here are 4 words you will meet in tonight's story." → 下方一行灰字 **(本題型沒有 pairsEn data)** | 無 | 我盯著這行字, 找 tap 目標 | **「這是什麼? 壞掉了?」** ← 第一道痛 |
| 10s | 我往下滑找按鈕, 畫面完全空白, 沒有任何互動元素 | 無 | 沒有任何可點擊的東西 | **「找不到繼續按鈕. 是我手機問題還是 app 問題?」** |
| 14s | 我點 ✕ 關掉課程, 回到 map | 無 | 只能離開 | 「連第一題都打不開, 還要繼續嗎?」 — **30s 關 app 危機** |
| 15s | 我重新點 L1 節點, 再次進入 | 無 | 再試一次 | 「也許重進可以?」 — 同樣出現 (本題型沒有 pairsEn data) |
| 20s | *(假設此刻我用意志力跳過 P0 缺陷, 硬留下來)* 等待是否能自動推進 | 無 | 等待 | 無限等待 — Q1 tap-pairs 沒有 fallback timer, 不會自動推進 |
| — | *(以下為 hypothetical: 假設 Q1 已修復, 我看到 4 對中英詞語)* | | | |
| 22s | Q1 修復後: 看到 4 對配對 「河/river, 看/look, 漂/float, 東西/something」 | 無 | 點配對配對 | 「啊好, vocab warmup, 這個我懂」拇指逐一配對 |
| 35s | Q1 完成 → Q2 narration 自動進入: amber 泡泡「Long ago, an old man and woman lived in a small village.」 + 小貓頭像 | **TTS 自動播**, 我耳朵裡聽到奶奶英文聲音 (A2 rate 0.85) | 讀句子, 隨時可點 SpeakerBtn | 「聽得懂, 挺清楚的」 |
| 40s | 我想重聽, 找喇叭按鈕. 看到喇叭 icon 在右上角 — 只有 22×22px 小點 | 捷運搖晃 | 嘗試點 22px 喇叭 | **「這個按鈕好小! 手抖點不準」** ← P1 痛 |
| 43s | Q2 自動推進 → Q3: "They were kind, but they had no children." | TTS 起音 | 還沒點到喇叭 | 「等等我還沒聽完 Q2, 就跳了?」|
| 50s | Q3 也自動推進 → Q4: listen-tf, 看到 blanks + 大喇叭 (48px) + 🎧 點喇叭聽完聲音再選答案 | TTS 播"Their wooden house stayed very quiet, year after year." | 點大喇叭 (48px 易點) | 「喇叭大一些了, 好點」 |
| 56s | Q4 問題出來: "Did any children live with them?" + Yes / No 按鈕 | TTS 念問題 | 選 No | 「我剛剛在 Q3 看到 'they had no children' — 很明顯 No」輕鬆答對, 但感覺有點在考記憶不在考聽力 |
| 58s | Q5 narration: "Each day, the old man went up the mountain to gather firewood." | TTS 自動播 | 讀/聽 | 「OK 還跟上」 |
| 65s | Q6 listen-mc: blanks + 大喇叭. TTS: "He carried home heavy **wood** for the fire." 問 "What was his daily task?" | TTS 播句子 | 看 4 個 opts: fishing / cutting **wood** / cooking rice / feeding goats | **「我不需要聽, 我直接看 'wood' 在 opts 裡」→ 點 cutting wood** — 自動答對. 不像學習. ← P1 Jaccard give-away |
| 70s | Q7 narration: "Each morning, the old woman went to the river to wash clothes." | TTS | 讀 | OK |
| 78s | Q8 listen-mc: "She dipped **clothes** in the cool water beside the rocks." → "Why did she sit by the river?" opts: to fish / to swim / to wash **clothes** / to rest | TTS | 看 opts | **「又是一樣的技巧: 'clothes' 在句子也在 opt 裡」→ 直接猜對, 根本沒練到聽力** ← P1 |
| 83s | Q9 narration: "But one spring day, something different happened." | TTS | 讀 | 「噢有轉折了, 感覺故事要開始了」 |
| 88s | Q10 emoji-pick: "What season was it?" + 2×2 grid 🌸/☀️/🍂/❄️ | 無 TTS | 看 emoji | 「🌸 spring, 因為 Q9 說 'one spring day'」秒答 ← P2 near-give-away (keyword in prev narration) |
| 92s | Q11 narration: "Far in the river, a big red shape was floating slowly toward her..." | TTS (長一點) | 讀/聽 | 「懸念來了 — 故事鉤子有效」 |
| 100s | Lesson complete screen 🎉 XP/Accuracy/Time triptych | 無 | 點「完成 · Continue →」 | 「哦好, 100s 一節. 通勤夠用」輕微成就感 |
| 102s | 回到 map, L1 node 變綠星星, L2 解鎖 | 無 | 可繼續 L2 | 「不錯, 進度有存」 |

---

## B. Give-away check (Jaccard / mirror / identity)

| Q | 類型 | 句子關鍵字 | 正解關鍵字 | 結論 |
|---|------|-----------|-----------|------|
| Q4 listen-tf | inference | "very quiet, year after year" | No (no children) | 可接受: 需要推理, 非 Jaccard. Q3 narration 先揭示 "had no children" 讓 Q4 變近似 confirmation. **P1 borderline** |
| Q6 listen-mc | **Jaccard** | "heavy **wood** for the fire" | "cutting **wood**" | ⚠️ **GIVE-AWAY**: "wood" 出現在句子且只在正解 option, distractors 無 wood |
| Q8 listen-mc | **Jaccard** | "dipped **clothes** in the cool water" | "to wash **clothes**" | ⚠️ **GIVE-AWAY**: "clothes" 出現在句子且只在正解 option |
| Q10 emoji-pick | near-mirror | Q9 narration 明說 "one spring day" | 🌸 spring | **soft give-away**: correct answer 就是前一 Q narration 的字面複述. 難度接近 0. |

---

## C. 這 persona 特有痛點

1. **通勤被中斷 = 重打**: 進站、換乘、有人打招呼. 我點 ✕ 離開課程 → L1 進度清零, 下次重從 Q1 tap-pairs (壞掉的那題) 重開. 每周這樣 3 次就放棄了.
2. **22×22px narration 喇叭** + 捷運搖晃: 我的拇指 miss rate 高, 點不到重播, 氣得點到旁邊其他東西. 其他題型的喇叭都是 44-48px, 只有 narration 是 22px.
3. **Q1 tap-pairs 死掉**: 每個 lesson 的第一題都是 vocabulary warm-up tap-pairs, 而且全部卡在 `pairsEn` 欄位缺失. 通勤族沒耐心 debug — 15 秒就走人.
4. **沒有時間估算**: q1/11 不代表時間. 我不知道「11 題 = 2 分鐘還是 8 分鐘」. 快到站時我怕做到一半要強制中斷 (進度就沒了).
5. **Jaccard 題型削弱聽力動機**: 連續兩題只要「掃一眼 options 找重複的詞」就能答對. 對 A2 學習者最珍貴的「逼自己聽清楚」動機被消耗掉.

---

## D. P0 / P1 / P2

### P0 — 30 秒關 app / 課程完全無法進行
- **P0-A**: `TapPairsRenderer` 讀 `q.pairsEn` 但 JSON 全用 `pairs: [{ left, right }]` 格式. 7 個 lesson × 全部 Q1 皆死. 學生完全無法推進任何一節課.

### P1 — 明顯降低學習品質
- **P1-A**: `NarrationRenderer` SpeakerBtn `size=22` (22×22px tap target). 其他所有 renderer 用 44-48px. 移動中手指點 miss 率高.
- **P1-B**: Q6 listen-mc Jaccard give-away (wood/wood). 無須聽 TTS 即可答對.
- **P1-C**: Q8 listen-mc Jaccard give-away (clothes/clothes). 同上.
- **P1-D**: 無 mid-lesson checkpoint. 通勤中斷後進度歸零. 對日常使用者是每周痛點.

### P2 — 小摩擦
- **P2-A**: Splash tagline「奶奶的睡前英文小故事」對 28 歲上班族造成一點 identity drift (v2.0.B.231 pivot 副作用; secondary audience 小感).
- **P2-B**: Q10 emoji-pick 前一 narration 剛說 "one spring day" → 秒猜正確; 難度等同 0.
- **P2-C**: Q4 listen-tf 正解 No 的根據已在 Q3 narration 明說, 實際上在考「短期記憶」而非「聽力推理」.

---

## E. Top 3 actionable (S effort ≤ 30 min each)

### 1. Fix `pairsEn` field mismatch — P0-A (5 min)
`renderers.tsx` TapPairsRenderer line 448:
```ts
// Before
const pairs = q.pairsEn ?? [];

// After
const rawPairs = q.pairsEn
  ?? ((q as Record<string, unknown>).pairs as Array<{ left: string; right: string }> | undefined)
      ?.map(p => [p.left, p.right] as [string, string]);
const pairs: [string, string][] = rawPairs ?? [];
```
Unblocks all 7 lessons immediately. Also add `pairs?: Array<{ left: string; right: string }>` to RawQuestion interface.

### 2. NarrationRenderer SpeakerBtn size 22 → 44 — P1-A (2 min)
`renderers.tsx` line ~177:
```tsx
// Before
<SpeakerBtn onClick={() => speak(text)} />

// After  
<SpeakerBtn onClick={() => speak(text)} size={44} />
```
Aligns with all other renderers. Thumb-safe on moving trains.

### 3. Break Q6/Q8 Jaccard give-away — P1-B + P1-C (15 min)
`public/lessons-ch1.json` L1:
- Q6 option[1]: `"cutting wood"` → `"chopping bamboo"` (removes "wood" overlap; still plausible distractor)
- Q8 option[2]: `"to wash clothes"` → `"to do laundry"` (removes "clothes" overlap; same meaning, different words)
```json
// Q6 options after
["fishing", "chopping bamboo", "cooking rice", "feeding goats"]

// Q8 options after  
["to fish", "to swim", "to do laundry", "to rest"]
```
Forces learner to actually process the audio, not keyword-scan.
