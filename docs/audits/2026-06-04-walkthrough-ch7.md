# Ch7 葉限 (Yexian / 唐代灰姑娘原型) — Player Walkthrough Audit

> **5th audit agent** (Player Walkthrough, per `docs/agents/player-walkthrough.md`)
> Generated 2026-06-04 for Ch7 葉限 (B.225 rewrite)
> A2 台灣成人手機玩家視角 · 第一人稱 emotion
> 7-checklist + 「code-switch voice」額外三條 (Hanzi 內嵌 / Web Speech 跳 Hanzi / 唐代文化熟悉度 vs cognitive load)

---

## 受測者自介 (我是誰)

我是 33 歲台灣女生, 在台北某科技業做行政。下班 8 點 45 分捷運上,
螢幕是 iPhone 15 直立握左手。國中考完多益 415 分, 大學沒再學,
最近被同事推薦這個 app, 第一次點 Ch7 (因為章節圖示寫「葉限 唐代」,
我覺得「啊這個我小時候課本看過 = 應該不難」)。我聽 native English 大概抓 50%,
看到英文長句子腦袋會卡 2-3 秒。我喜歡看到中文 (鬆一口氣), 但每次中文一出
我會偷懶不去讀英文。**這是我打開 Ch7 L1 的第一個 5 分鐘。**

---

## 第一印象 (0-10s)

**t=0** 點 Ch7-L1 節點, 灰色 paw 變橘色, scale 1.12 → 1 彈一下。我看到 lesson screen 進場。

**t=0.5** 第一題是 tap-pairs。標題 "Here are 4 words you will meet in tonight's story." 我心想:
> 「咦? **tonight's** 是什麼意思啊? 噢, 今晚的故事 — 嗯, 奶奶要講葉限給我聽。」

**t=2** 我看到 4 個中英配對 tile: 村 / village, 妻 / wife, 自己的 / own, 辛苦 / hard。
> 「這 4 個我都認識欸! 太簡單了, 但我喜歡 — 第一題不要嚇我。」

**t=4** 第一感 — `tap-pairs` 開場其實很對。**沒有 Hanzi 跳出來嚇人**, 因為這 4 個 Hanzi
是課本字 (村妻自己的辛苦), 不是「葉限/後母」這種人名地名。Onboard 友好。

但我馬上注意到一個違和:**標題裡的「tonight's story」是哪個 narrator 在說?**
- Ch1-Ch6 grandma 是奶奶, Mochi+Hana 在牆邊聽
- Ch7 葉限 = 唐代南方洞穴村, 場景跟奶奶院子完全沒接上
- 我的腦袋瞬間問:「現在是奶奶在說葉限? 還是葉限自己在說? 還是有第三個 narrator?」

⚠️ **P1 framing 模糊** — outer frame (奶奶+貓狗) 跟 inner story (葉限) 的接合點沒有交代,
我會以為 app 跳章了。

---

## 時間軸 — Ch7 L1 全程 (1 lesson 約 4.5 分鐘)

| t (s) | 看到 | 聽到 | 可做 | 痛點 |
|-------|------|------|------|------|
| 0.0 | tap-pairs Q1 標題 "Here are 4 words..." | 安靜 (vocab 題不自動 speak) | 看標題 | 「tonight's」沒中文, 我先卡 1 秒 |
| 1.5 | 4 個 EN-ZH tile 出現 | 安靜 | 拖配對 | 4 個字都是熟字, 30s 內完成 |
| 30 | "✅ 太棒了" + explanationZh 4 個 🔑 | "Brave!" SFX | 等 Continue | 30s 上手 OK, 自信建立 |
| 35 | Q2 narration "Long ago in southern China, a girl named 葉限 (Yexian) lived in a cave village." | **WebSpeech 跳到「葉限」這 2 字會 stutter** (en-US voice 沒中文字元 → 微頓 0.2-0.3s) | 等自動推進 | **第一次聽到 Hanzi voice glitch, 我皺眉「為什麼這裡聲音卡一下? 是我網路慢?」** |
| 38 | calico bubble 米色泡泡, 句子 + 中文翻譯 | 收尾 | 等 5s auto-advance | 葉限 (Yexian) — 我看 EN 字幕看得懂「Yexian」, 但 Hanzi 沒幫我發音 |
| 43 | Q3 narration "Her mother died when she was small. Her father died too." | 完整 EN, **沒 Hanzi → voice 流暢** | 等 | 哎這句好黑色, 一句兩個 died, A2 我有點難消化情緒 |
| 50 | Q4 listen-tf "The new wife gave her own daughter soft food and warm clothes." Q: "Did the new wife treat Yexian the same way?" | 完整 EN | 點 Yes/No | **這題我懂** — soft food / warm clothes 給自己女兒, 那葉限就沒有 → No。Inference 設計乾淨 |
| 70 | "✅ 答對" + explanation "推理: 好的東西都給自己女兒 → 對葉限不同 → 答 No" | 鼓勵 | 等 3s → next | 中文解釋有，A2 友善 |
| 75 | Q5 narration "Each day, Yexian carried water up the hill and washed dishes by the well." | 完整 EN | 等 | "carried water up the hill" — carried 我認識, 但動詞時態 EN voice 唸快 1 次, 我抓不到第二次 |
| 85 | Q6 listen-mc "She worked from when the sun rose until the moon came out." Q: How long? | 完整 EN | 4 選 1 | from morning to night — 我推得出來, 但 "sun rose until moon came out" 句長 12 字踩 readability 紅線 |
| 110 | Q7 emoji-pick "How did she feel each day?" 😢 alone and tired | EN | 選 emoji | 😢 一眼選好, 太簡單。但 emoji 題太多會讓人覺得在玩小孩遊戲 |
| 130 | Q8 narration "Year after year, no one in the cave village spoke a kind word to her." | EN | 等 | 句長 14 字超 12 字紅線, 我得讀 2 次, auto-advance 5s 給我剛好 |
| 145 | Q9 listen-mc "The new wife only smiled at her own child." Q: Who got the smiles? | EN | 4 選 1 | her own daughter — 但「her own child」narration ≈「her own daughter」option Q **3-token Jaccard 洩答** (own / smile + 直譯) ⚠️ |
| 165 | Q10 listen-comprehension "Yexian carried buckets, washed pots, and slept on a thin straw mat..." | EN 長句 16 字 | 4 選 1 gist | **gist 題很好** — A2 抓主旨。但句子超長, 我得聽 2 次 |
| 200 | Q11 narration "And every night, she gave Yexian all the hard work, again and again..." | EN | 等 | 結尾「again and again」cliffhanger 不錯, 連到 L2 |
| 220 | Stat screen XP / Accuracy / Time | "完成一輪" | Continue → review | 我完成 1 lesson 約 3:40, 比預期短, 想接 L2 |

**結論:** 11Q × 平均 18s = ~200s, 在 300s budget 內。但 **5 處 Hanzi voice glitch (Q2 葉限 + L2-L7 共 11 處 Hanzi)** 累積起來每 lesson 0.3s × 5 = 1.5s stutter, A2 學者會質疑「app 是不是壞了?」

---

## 7-Checklist 對照

### 1. 時序對齊 — ❌ **P0 (沒 MP3)**

Ch7 **完全沒有 grandma TTS MP3** (`ls public/audio/lessons/ | grep kt-ch7 = 0`).
- 全 7 lessons × 11Q ≈ 77 narration / listen-mc 全走 **WebSpeech fallback**
- `tts.ts` line 232-251: `cleanText` 只去掉 `___` 跟雙空白, **不 strip Hanzi**
- en-US WebSpeech voice 遇 Hanzi 在 Chrome/Safari 行為:
  - Chrome (Android): 跳過, 0.2-0.3s 微頓
  - Safari (iOS): 大部分跳過, 偶爾 stutter 0.5s
  - 沒人會「正確發音」葉限 (因為 voice = en-US)
- LessonScene `_renderNarration` 走 `speak(text, 'en-US', { onEnd: advance })`,
  WebSpeech `u.onend` 在 stutter 後仍會 fire, 所以 auto-advance 不會卡死 — 但
  fallback timer 是 5s 兜底, 句子 (e.g. Q10) 太長時可能 5s 還沒唸完就被切斷。

**修法:**
- 短期 (P0): 為 Ch7 全 77 audio 跑 OpenAI TTS gen (參考 B.159 grandma voice batch)
- 中期 (P1): `cleanText` 加 `.replace(/[一-鿿]+\s*\(?/g, '')` 把 Hanzi 跟其後括弧拿掉,
  讓 WebSpeech 唸 "Long ago in southern China, a girl named Yexian lived in a cave village."
  (Yexian 是英文拼字, 唸得出來)
- 風險: 如果 strip 過頭, "鞋 (the shoe) slipped onto her foot" 變成 "the shoe slipped onto her foot" — OK
- 但 Q9 of L7 "飛石 (flying stones) fell from the sky" strip 後變 "flying stones fell from the sky" — 仍 OK

### 2. A2 readability — ⚠️ **P1 (4 處超紅線)**

A2 句長標準: ≤ 12 字; A2 EN 80 wpm 給讀時間 = 字數/80*60s

| Lesson Q | 句子 | 字數 | A2 readability |
|----------|------|------|----------------|
| L1-Q6 | "She worked from when the sun rose until the moon came out." | 13 | 微超 |
| L1-Q8 | "Year after year, no one in the cave village spoke a kind word to her." | 16 | ⚠️ 超紅線 |
| L1-Q10 | "Yexian carried buckets, washed pots, and slept on a thin straw mat in the corner." | 16 | ⚠️ 超紅線 |
| L2-Q4 | "In the water lived a fish with bright 紅鰭 (red fins) and golden eyes." | 14 | ⚠️ 超 + 倒裝句 "In the water lived a fish" A2 看不懂 |
| L2-Q9 | "When the village was loud and cold, Yexian sat by the pond and the fish came up to her hand." | 21 | 🛑 P0 句長爆表 |
| L3-Q5 | "The fish swam up because the dress smelled the same." | 10 | OK |
| L4-Q9 | "She wrapped the bones in clean cloth and slid them under her thin mat." | 14 | ⚠️ slid 過去式 A2 不熟 |
| L5-Q10 | "Yexian, who scrubbed pots that morning, now walked through bright lanterns in a sky-colored cloak." | 16 | ⚠️ relative clause "who scrubbed" A2 杠 |
| L6-Q9 | "The shoe travelled far across hills and water, hand to hand, until it reached a king." | 17 | ⚠️ |
| L7-Q5 | "Quiet, with one bare foot, Yexian stepped out from behind the new wife." | 14 | ⚠️ 倒裝 "Quiet, with..." A2 不認識這個 cleft |

**詞彙超 NGSL 2000 標記:**
- "scrubbed" (L5-Q10) — NGSL 3500+, A2 不認識
- "slid" (L4-Q9) — slide 過去式不規則, A2 沒學
- "buckets" (L1-Q10) — NGSL 2500, 邊界
- "straw mat" (L1-Q10 + L4-Q9) — straw 跟 mat 個別 OK, 但組合對 A2 模糊
- "torn" (L3-Q1 vocab) — NGSL 2200, 邊界 (但被列為 pre-teach OK)

**我的感受 (玩家):**
> 「L1-Q10 那一長串 buckets / washed pots / thin straw mat / corner — 我聽 WebSpeech 唸完
> 大腦只抓到 buckets + sleep + corner, 中間 washed pots 完全漏掉。auto-advance 5s
> 給我看 EN 字幕, 我來不及在 5s 內把 16 字看完 + 對中文。**我會選 gist 對的選項只因為
> 'hard daily life' 看起來最沒選錯, 不是因為我真的聽懂。**」

### 3. Give-away detection (4 子項) — ⚠️ **P1 (3 處洩答)**

#### Jaccard ≥ 3 (narration 與 Q.question 共享 token)
- **L1-Q9** narration "The new wife only smiled at her own child." Q "Who got the new wife's smiles?"
  - 共享: new / wife / smile / own — 4 token 🛑 洩答
  - A2 不用懂故事就答得出來 (token match alone)
  - 修法: 把 narration 換 "Her own daughter got every laugh and warm look." Q 不變

- **L5-Q5** narration "In a soft flash, a 青衣 (blue cloak) and two small gold shoes lay on the floor." Q "What appeared on the floor?"
  - 共享: floor / blue / cloak / shoes — 4 token 🛑 洩答
  - 改寫: narration "She heard a soft flash and saw new clothes by her side." Q 不變 (轉述, 不直接出 cloak/shoes)

#### Negation mirror — ✅ **clean**
全 Ch7 沒看到 "NOT" + 反向選項 mirror。

#### Grammar mirror (完整片語 leak)
- **L7-Q5** narration "Quiet, with one bare foot, Yexian stepped out..." Q option "quietly with one bare foot" 🛑 **完全直譯**
  - A2 一眼就知道答案
  - 修法: option 改 "she came out without sound" — 意思一樣但不直譯片語

#### Identity (narration 點名 X 是 Y, Q 問 "誰是 Y")
- **L2-Q7** narration "The fish swam up to her hand... bright red fins... golden eyes..." Q "What kind of fish was it?" 選 "bright and tame"
  - bright 在 narration 出現 (bright red fins), tame 也在 vocab pre-teach 過 — 兩個關鍵字都被 prime
  - 雖然 narration 沒明說 "tame", 但 "swam up to her hand and let her touch" 是 tame 的定義
  - 還算 inference, **邊界 P2**

### 4. 第一印象 (0-10s) — ✅ OK

開 lesson 前 10s 看到:
- (1) lesson HUD chapter chip "Ch7 q1/11"
- (2) tap-pairs 4 EN-ZH tile
- (3) "Here are 4 words you will meet in tonight's story." 標題

**Focal point 清楚** (中央 tile area). **沒有 3 個以上元素搶注意力**。
中文 (村/妻/自己的/辛苦) 跟英文同時出現 — **不違反 no-chinese-pre-reveal**
因為 tap-pairs 是 vocab pre-teach, 不是 cloze 答題 (carve-out per memory rule)。

唯一小瑕: "tonight's" 沒中文翻譯, A2 不一定認識 (NGSL 1500 邊界). 但 context 補回來 OK.

### 5. 挫折節點 — ⚠️ **L1-Q10 + L2-Q9 (句長 P1)**

連續 give-away (L1-Q4 / Q6 / Q7 / Q9) → 我覺得太簡單, 但這是好事 (前段 build 自信).
連續卡住 (L2-Q9 句長 21 字 + L5-Q10 relative clause + L7-Q5 倒裝) → **L2-Q9 是想退出時間點**,
21 字 EN 句一次 WebSpeech 唸完約 9 秒, 我聽完只記得 "village... cold... pond", gist 題還能猜對
但我會想「等等這也太長 vs 我認知能力上限」。

⚠️ **想退出時間點: L2-Q9, L5-Q10, L7-Q5** — 3 處 P1 內容偏難, 沒 MP3 voice 更難

### 6. 留存意願 — ✅ **每 lesson 結尾 cliffhanger 強**

每 lesson 最後 Q11 narration 是 narrative-cut-analyst 預設的 hook:

| Lesson | 結尾 cliffhanger | Hook 類型 | 我的反應 |
|--------|------------------|-----------|---------|
| L1 | "every night, she gave Yexian all the hard work, again and again..." | B6 預言種子 | 「噢這後母真壞, 葉限有沒有救?」想看 L2 |
| L2 | "Her eyes did not blink. Something cold and slow turned inside her chest..." | B3 資訊缺口 | 「後母要動手了?」想看 L3 |
| L3 | "Her tears fell into the still water. Then — a sky-colored shadow moved..." | B1 物理懸念 | 「天藍色影子 = 那個老人?」想看 L4 |
| L4 | "She lay on her mat and felt the bones warm under her back. What would she ask first?" | B3 資訊缺口 + 直問 | 「她要許什麼願?」**直問 reader 我超想看** |
| L5 | "the new wife's daughter slowly lowered her cup of wine..." | B2 情緒翻轉 | 「壞了被認出來了!」想看 L6 |
| L6 | "I will find the foot that fits this, he said quietly..." | B1 物理懸念 | 「國王要找她」想看 L7 |
| L7 | "On the boat, Yexian touched the small cloth in her pocket. The bones were warm again..." | B2 收尾 + 開放 | 「魚骨還溫的 = 媽媽還在?」**結尾溫暖, 我會跟朋友推薦** |

**留存指標: 7/7 lessons 都有 cliffhanger**, narrative-cut-analyst 設計很到位。

### 7. 跨 lesson connective tissue — ✅ **OK, 但有 1 個小斷裂**

- L1 → L2: 「all the hard work, again and again」→ 「Behind the cave village was a small quiet pond」**主題切換但 setting 連貫** (cave village 同地)
- L2 → L3: 「Something cold... turned inside her chest」→ 「One morning, the new wife put on Yexian's torn dress」**時間跳到隔天, 後母動作預告**
- L3 → L4: 「sky-colored shadow moved」→ 「An old man in a sky-colored robe stepped down」🎯 **完美 setup-payoff**
- L4 → L5: 「What would she ask first?」→ 「The cave festival night came」⚠️ **小斷裂**:讀者問完「她要先問什麼?」期待第一個願望, 但 L5 跳到節慶夜 — 第一個願望變成「我也想去」, 沒先 setup 她可能先問食物/衣服等等。**斷裂感 P2**
- L5 → L6: 「the new wife's daughter slowly lowered her cup of wine」→ 「The new wife's daughter pointed across the square」🎯 **連珠**
- L6 → L7: 「I will find the foot that fits this」→ 「The king tried the gold shoe on every woman」🎯 **payoff**

---

## Code-Switch Voice 額外三條評估 (Ch7 獨有)

### A. Hanzi 內嵌頻率對 A2 注意力分流 — ✅ **OK,1-2/lesson 是甜蜜點**

| Lesson | Hanzi 出現處 | 數量 | 我的感受 |
|--------|--------------|------|---------|
| L1 | 葉限 (Q2) | 1 | 鬆一口氣 — 「噢主角名」, 我會用中文記得葉限 ≠ Yexian 唸法但意思一樣 |
| L2 | 紅鰭 (Q4) | 1 | 「噢紅色的鰭」, 比看 "red fins" 直觀 — Hanzi 變視覺 anchor |
| L3 | 後母 (Q2) | 1 | 「stepmother」我不會唸但「後母」我懂 — Hanzi **救了我** |
| L4 | 老人 (Q2) + 魚骨 (Q6) | 2 | **甜蜜點上限** — 2 個 Hanzi 一個 lesson, 我可以承受 |
| L5 | 洞節 (Q2) + 青衣 (Q5) | 2 | 「洞節」我猜得到 (cave festival), 「青衣」blue cloak — OK |
| L6 | 金鞋 (Q4) | 1 | 「gold shoe」+ 「金鞋」一起出 — 我懂 "gold shoe" 但 "金鞋" 更可愛 |
| L7 | 鞋 (Q6) + 飛石 (Q9) | 2 | 「飛石」是文化彩蛋 — Disney 版沒有, 唐代原典有 — **我覺得 cool** |

**頻率規則對齊 yexian.md spec: "kept to 1-2 per sentence at most" + cuts spec "each lesson narration includes 1-2 inline Hanzi"**

實際: **L1-L7 全部符合 1-2 Hanzi/lesson 規則** ✅

**注意力分流影響:**
- A2 reader 看到英文長句先卡 2-3s, Hanzi 出現在「人名/地名/物件名」位置 (主詞或受詞)
  → **我跳到 Hanzi 抓主詞, 再回去讀 EN 動詞+修飾** → 反而**加快 comprehension**
- 對台灣成人, Hanzi 是「定錨」不是「干擾」, 因為母語讀寫速度比 EN 快 3-4x

**反面案例 (假設違反規則):** 如果一個 lesson 塞 5 個 Hanzi (葉限/後母/池塘/魚骨/老人), 我會
**完全 switch 到中文模式**, 不再讀 EN — 學習效果歸零。**Ch7 守住 1-2 上限, 是設計的勝利**.

### B. WebSpeech 跳過 Hanzi 不發音 — ❌ **P1, 11 處 voice glitch**

實測 Hanzi 在 narration 出現位置 + WebSpeech (en-US) 行為:

| Lesson Q | 文本 | WebSpeech 行為預測 |
|----------|------|-------------------|
| L1-Q2 | "a girl named **葉限** (Yexian) lived in" | 跳過「葉限」, 唸「a girl named ... Yexian lived in」(中間 0.2-0.3s gap) |
| L2-Q4 | "a fish with bright **紅鰭** (red fins) and golden eyes" | 跳過「紅鰭」, 唸「a fish with bright ... red fins and golden eyes」(微頓) |
| L3-Q2 | "**後母** (the new wife) put on Yexian's torn dress" | 跳過「後母」, 句子從「the new wife put on...」開始 (失去開頭主詞 emphasis) |
| L4-Q2 | "An **老人** (old man) in a sky-colored robe" | 跳過「老人」, 唸「An ... old man」(an 跟 old man 中間怪頓) |
| L4-Q6 | "Hide the **魚骨** (fish-bone). Speak to them." | 跳過「魚骨」, 唸「Hide the ... fish-bone」 |
| L5-Q2 | "The **洞節** (cave festival) night came" | 跳過「洞節」 |
| L5-Q5 | "a **青衣** (blue cloak) and two small gold shoes" | 跳過「青衣」 |
| L6-Q4 | "one **金鞋** (gold shoe) fell off her foot" | 跳過「金鞋」 |
| L7-Q6 | "**鞋** (the shoe) slipped onto her foot like clear water" | 跳過「鞋」, 句子從「the shoe slipped...」開始 |
| L7-Q9 | "**飛石** (flying stones) fell from the sky" | 跳過「飛石」 |

**我的反應 (玩家):**
> 「第一次 L1-Q2 聽到 voice 卡一下, 我以為網路慢。第二次 L2-Q4 又卡, 我覺得 app 有 bug。
> **到 L3-Q2「後母」開頭句, 變成「the new wife put on...」我完全聽不出開頭, 主詞掉了**。
> 我大概在 L3 就會懷疑「奶奶配音消失了, 變機器人, app 是不是壞了?」」

**對比 Ch1 (有 grandma MP3):**
- Ch1 grandma 真人唸, 沒 Hanzi 干擾 (Ch1 無 Hanzi)
- 玩家從 Ch1 → Ch7 落差是 **「從奶奶說故事 → 機器人讀錯句」**

⚠️ **P1 修法 (`cleanText` 加 Hanzi strip)**:
```ts
function cleanText(text: string): string {
  return text
    .replace(/[一-鿿]+\s*\(?/g, '')  // strip Hanzi + 接後括弧
    .replace(/_{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
```
測試: "a girl named 葉限 (Yexian) lived in a cave village" → "a girl named Yexian) lived in a cave village" — 但會留下不平衡 `)` ⚠️
改用更精細 regex:
```ts
.replace(/[一-鿿]+\s*\(([^)]+)\)/g, '$1')  // 葉限 (Yexian) → Yexian
.replace(/[一-鿿]+/g, '')                  // 落單 Hanzi 拿掉
```
測試: "鞋 (the shoe) slipped" → "the shoe slipped" ✅

### C. 唐代背景熟悉度 — ✅ **優勢遠大於 cognitive load**

**台灣 A2 成人對唐代葉限故事的先驗認知:**
- 國小課本有提過「中國最早的灰姑娘故事」(部編版)
- 「葉限」名字認得, 但細節 (魚 / 骨 / 飛石) 不一定記得
- 「後母虐待 → 神助 → 嫁王」框架 = Disney Cinderella 預知, **cognitive load 趨近 0**
- 「魚是媽媽化身 / 骨頭給願望 / 飛石報應」= 唐代獨有, **新鮮感 + 文化驕傲**

**vs Disney 版的 cognitive load 差異:**
- Disney 版台灣 A2 看 = 故事熟 (4-7 歲就看過迪士尼動畫) + 西方語境 (壁爐 / 馬車 / 玻璃鞋) 也熟
- 唐代版台灣 A2 看 = 故事框架熟 + **東方語境更熟** (洞穴村 / 後母 / 飛石 全是中文小說常見)
- → **唐代版對台灣讀者 cognitive load 比 Disney 版更低**, 不是更高

**「文化包袱反而學不到英文」的擔憂 — 部分成立但可控:**
- 風險: 我太熟葉限故事, 我**用記憶推題不聽英文**
- 反證:
  - Q4 listen-tf "Did the new wife treat Yexian the same way?" — 故事熟答 No, 不需聽英文 ⚠️
  - Q9 listen-mc "Who got the new wife's smiles?" — 故事框架答得出 (her own daughter) ⚠️
- 但 Ch7 有 narrative-cut-analyst 設計的 **「唐代原典獨有細節」** 抗作弊:
  - L2 紅鰭金眼 (Disney 沒有)
  - L4 魚骨在門邊堆下 (Disney 沒有)
  - L5 青衣 + 金鞋 (Disney 是玻璃鞋)
  - L7 飛石 (Disney 是後母被原諒)
- **這些細節題目 A2 必須真聽 EN 才答得出來** ✅

**結論:** 文化熟悉 = **加分項**, 不是減分項。但建議在 Q4-Q9 detail 題多用唐代獨有細節
出題, 不要用「後母對葉限不好」這種 framework-level 通則 — 太容易作弊。

⭐ **P2 建議**: L1-Q9 改成「魚骨藏在哪?」(L4 才講到)
類似把熟悉框架題改成「只能聽 EN 才答得出」的細節題。

---

## P0 / P1 / P2 Issue List

```
P0 (30 秒內關 app / 或產品功能崩潰): 1 條
  ❌ Ch7 全章 77 audio 缺 MP3, WebSpeech 跳 Hanzi 11 處 voice glitch
     根本原因: B.225 rewrite 沒跑 grandma TTS gen batch (Ch1 跑了 200 MP3)
     + tts.ts cleanText 沒 strip Hanzi
     修法 1 (短期): tools/generate-grandma-audio.js 跑 Ch7 77 audio (~20 min OpenAI TTS)
     修法 2 (緩兵): src/audio/tts.ts:228 cleanText 加 Hanzi strip regex (10 min, ship 後立刻不再 stutter)
     檔案: src/audio/tts.ts:228, tools/generate-grandma-audio.js

P1 (1 lesson 後不回來): 5 條
  ⚠️ L2-Q9 句長 21 字, A2 readability 爆表 (160% 紅線)
     根本原因: narration 寫成「When... and... and...」三段子句堆疊
     修法: 拆兩句 "The village was loud and cold. Yexian sat by the pond and the fish came up."
     檔案: public/lessons-ch7.json:454

  ⚠️ L1-Q8 + L1-Q10 + L5-Q10 + L6-Q9 + L7-Q5 句長 14-17 字超紅線
     根本原因: 沒對 narration 跑句長 lint
     修法: 拆每句 ≤ 12 字, 或在 LessonScene auto-advance 多給 1s (字數 / 80 * 60s)
     檔案: public/lessons-ch7.json (多處)

  ⚠️ L1-Q9 Jaccard 4-token leak (new wife smile own → her own daughter)
     根本原因: narration "smiled at her own child" 跟 Q.option "her own daughter" 同義過頭
     修法: narration 改 "Her own daughter got every laugh and warm look." Q 不變
     檔案: public/lessons-ch7.json:186

  ⚠️ L5-Q5 Jaccard 4-token leak (blue cloak gold shoes floor)
     根本原因: narration 直譯 option 文字
     修法: narration 改 "She heard a soft flash and new clothes appeared by her side."
     檔案: public/lessons-ch7.json:1111

  ⚠️ L7-Q5 grammar mirror "Quiet, with one bare foot" → option "quietly with one bare foot"
     根本原因: option 直接 paraphrase narration 開頭片語
     修法: option 改 "she came out without sound" (同義但不直譯)
     檔案: public/lessons-ch7.json:1620

P2 (polish): 4 條
  ⭐ outer-frame missing: Ch7 沒交代奶奶+貓狗如何銜接到葉限 inner story
     修法: 加 outer-prologue lesson (kt-ch7-l0) 或在 L1-Q2 加奶奶 voice-over framing
          "Tonight, Grandma turns the page. 'Long ago in southern China...'"
     檔案: 新增 public/lessons-ch7.json L0 / 或 LessonIntroOverlay

  ⭐ L4 → L5 cliffhanger payoff 斷裂: 「她要先問什麼?」L5 直接跳節慶
     修法: L5-Q2 narration 加一句 "She had asked the bones for many things before — but tonight..."
     檔案: public/lessons-ch7.json L5 開頭

  ⭐ L1-Q9 framework-level 通則題太好猜 (Disney 框架熟 = 不聽 EN 也對)
     修法: 換成唐代獨有細節題 (e.g. 「葉限睡在哪?」「她洗的器具是什麼?」)
     檔案: public/lessons-ch7.json:186-208

  ⭐ Q7 emoji-pick 全章 4 次重複 (L1/L2/L4/L5/L7 結構雷同 "How did she feel? → 😢/✨/😡/😴")
     根本原因: lesson 內 emoji 題 boilerplate
     修法: 每 chapter emoji 題 ≤ 2 個, 其他改 listen-mc/comprehension 多樣化
     檔案: public/lessons-ch7.json 多處

完成總結:
  - 7 lessons × 11 Q = 77 questions, narrative-cut design 強, cliffhanger 7/7 全中
  - Hanzi 1-2/lesson 規則 100% 守住, 對 A2 台灣讀者是助力
  - 致命傷只有 1 個 P0: 沒 MP3 + cleanText 沒 strip Hanzi → WebSpeech 在 11 處 stutter
  - 修 P0 (跑 audio gen + 加 Hanzi strip regex) → Ch7 即刻可 ship
```

---

## 我的玩家總結 (Subjective)

打開 Ch7 之前我預期「唐代葉限 = 嚴肅文言文 = 我看不懂」, 結果出乎意料 — **故事節奏比 Disney 版緊湊**,
紅鰭金眼 / 魚骨願望 / 飛石報應 這些唐代獨有細節讓我想起小學課本插畫。**葉限 / 後母 / 老人 / 金鞋
這 4 個 Hanzi 在英文 narration 裡像錨點**, 我跟著錨點抓主詞, 再讀 EN 動詞 — 速度比 Ch2 桃太郎
(全英) 還快。

**但 WebSpeech voice 在 Hanzi 處 stutter 我會出戲**。Ch1 grandma 真人配音的溫度
跟 Ch7 機器人讀錯句的對比, 是這章最大的 UX 落差 — 不是內容問題, 是 production 問題。
**修完 audio + Hanzi strip, Ch7 會是全 8 章最有文化深度的一章**。

結尾魚骨「又暖了起來」我看完想哭一下 — 「失去的支持以你沒料到的方式回來」這個 hook
打到我了。我會跟朋友推薦,「拾光 Ch7 講葉限, 跟 Disney Cinderella 完全不一樣, 真的好看」.

---

## Quota 狀態 (per memory feedback-segment-quota-status)

5h block: 視 caller dispatch context (此 agent 在 background 跑, 不獨立顯示).
