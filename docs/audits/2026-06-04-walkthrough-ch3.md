# Ch3 Walkthrough Audit — 龜兔賽跑 (B.225 rewrite)

> 5th audit agent · A2 台灣成人視角 · 對話體 heavy story
> Source: `public/lessons-ch3.json` (7 lessons × 11 Q = 77 Q)
> Canon: `docs/canon/tortoise-hare.md` + `tortoise-hare-cuts.md`
> Agent template: `docs/agents/player-walkthrough.md`

---

## TL;DR (我玩完 Ch3 想說的話)

我是阿芳,32 歲,台北捷運上玩。下班滿頭 KPI,只想被故事拎著走。

**整體感覺**:**對話體真的滿載**。每個 lesson 裡 narration 11 句有 3-5 句是 quote ("Look at me!" / "Hello, slow one" / "I have time" / "No, no, no!" / "Slow and steady wins the race")。我懂 plot,但**「現在到底是誰在說話」** 我中途會 lost — 特別 L5 同一節有 fox 悄悄話 + mouse 沒出聲 + young rabbit 喊話三個聲源。

**對話 vs 描述的閱讀速度**:我讀 "He said 'I will race you'" 比讀 "I will race you" 慢約 2x — 引號 + speech tag 兩重 cognitive load。**但 L1 完全沒給我準備** 第一句就是引號跳進來。L3 的 "I will rest under this tree" 比 L1 的 "Look at me! I am the fastest!" 好讀很多,因為前面有清楚的主詞 "the hare said to himself"。

**最強的 lesson**:L6(兔子醒了)。"No! No, no, no!" 我即使聽不懂 native speed 也感受到 panic。**最弱的 lesson**:L5(動物悄悄話)。三個角色三句話三種情緒 + 都是 quoted speech,我中間想關 app。

**8 個 X2_OPTION_LIST_BIAS warning 影響**:其實**我大部分無感**。我看到 4 個都 "very X" 開頭只覺得「都是描述」,不會想「unfair」。但 L4-q5 + L4-q9 那種 detail Q,我會用刪去法 — 不公平 bias 反而幫我蒙對,**反過來扣 learning value**。

---

## 第一部分:時間軸 table (L1 龜兔出場 + 嗆聲,15 row)

| t (s) | 看到 | 聽到 | 可做 | 痛點 |
|-------|------|------|------|------|
| 0.0 | tap-pairs Q1 banner: "Here are 4 words" + 4 中英對 | (Web Speech 模擬 sentence) | 點配對 | "Here are 4 words you will meet in tonight's story" → **冗長**, "tonight's" 還有 's possessive 我要想 1 秒 |
| 8.0 | 4 個 pair 全配對 OK,explanation 跳出 | speech ends | 按 Continue | explanationZh 用 🔑 emoji 開頭 4 行 — 視覺擠 |
| 12.0 | n2: "Every day, the hare jumped fast across the open field." | Web Speech rate 0.85 | 等 | "across the open field" — across NGSL 1800 我懂, "open field" 對 A2 還 OK |
| 17.0 | n3 出現: **quote** "Look at me! I am the fastest!" | Web Speech 念 quote (沒 emotion) | 等 | **問題:沒 speech tag 在前**,我直接被引號丟進去, 0.5 秒後才看到 "he said loud to the other animals" — 中文 native 習慣「他說:『...』」順序,英文 quote-first 我會卡 |
| 23.0 | listen-tf Q4: "Did the other animals enjoy his words?" Yes/No | sentence: "No animal said a word back..." | 選 Yes/No | **inference 題**:我得連 q3 (兔子嗆聲) + q4 sentence (沒人回話) 才能推 → 對 A2 屬於 stretch 但合理 |
| 30.0 | 答 No 對了, explanationZh: "推理:沒人回話 + 低頭" | 答對音 | next | explanation 清楚, 我覺得有學到 |
| 35.0 | n5: "A tortoise walked by, slow and quiet, on the side of the path." | Web Speech | 等 | "on the side of the path" — "side of the X" A2 邊緣,但我從 slow/quiet 已抓到場景 |
| 40.0 | listen-mc Q6 sentence: "Step by step, his short legs moved without any sound." + 4 option | Web Speech | 點 option | 4 個 option: "fast and loud" / "slow and quiet" / "angry and fast" / "sleepy and still" — **全 "X and Y" 結構,bias warning #1**。我看到都是 adj+and+adj 不會想 unfair,反而**用刪去法**:angry / sleepy 跟剛剛 n5 (slow, quiet) 完全不搭 → 直接刪 2 個 |
| 48.0 | 答對 "slow and quiet" | 答對音 | next | 但**洩答**:n5 已經寫 "slow and quiet",Q sentence q6 又寫 "step by step + no sound",**Jaccard 高:slow/quiet/no sound 都連起來**。learning value 偏低 |
| 53.0 | n7: **quote** "Hello, slow one," the hare laughed. "Can you even walk?" | Web Speech (兩段 quote) | 等 | **2 個 quote 連發** + speech tag 中間,我邊讀邊想「現在是誰在說 — 兔子在跟烏龜講?」其實有 "the hare laughed" 提示但我**讀引號太累忘了看 tag** |
| 60.0 | emoji-pick Q8: "How did the hare treat him?" + 4 emoji option | Web Speech | 點 emoji | 😂 laughed / 🤝 helped / 🎁 gave gift / 🤫 stayed silent — **emoji 救我**, 即便沒抓到 "treat" 這字 也看 emoji 秒選 |
| 65.0 | 答對 😂 | 答對音 | next | 這 Q 太簡單,沒 challenge — 但**對 A2 是好事**, 給休息空間 |
| 70.0 | listen-mc Q9: "How close was the hare to the tortoise?" 4 option | Web Speech "The hare bent down close..." | 點 option | 4 option: "very far" / "very close" / "inside his shell" / "on a tree" — bias warning #2, 2 個 "very X" 開頭。**but** "inside his shell" / "on a tree" 顯然怪 → 二選一變成 "very far" vs "very close",sentence 明寫 bent down close → 秒答 |
| 78.0 | listen-comprehension Q10: gist Q "What is happening in this scene?" | Web Speech "The big rabbit teased the small green animal..." | 點 option | "teased" 對 A2 是 B1 字,**但 sentence 後半已重述場景**, 我看 "rabbit + small green animal" 直接跟前面 mapping → 選 "the hare laughing at the tortoise" |
| 85.0 | n11: "The tortoise looked up at him. \"I will race you,\" he said, slow and sure..." | Web Speech | 等 → lesson 結束 | **B2 hook**: "I will race you" cliffhanger 點到, 我**真的想看 L2** — 但 lesson 結束畫面停留 5s 我會 fidget |

**L1 全程 ~90 秒 (B.225 之後 narration 多了,比 v2.0 L1 60s 慢)。** 對話量增加,**A2 玩家完成單一 lesson 心理負荷**從「順順過」變「需要 focus」。

---

## 第二部分:7-checklist 套用

### 1. 時序對齊 (audio-driven advance)

B.160 已上 `tts.ts onEnd` callback + 5s fallback timer。但 **Ch3 沒 MP3** (Ch1 才有 grandma TTS),全跑 Web Speech 模擬。

| Risk | 影響 |
|------|------|
| Web Speech `u.onend` 在 iOS Safari 不穩 (B.159 bug 歷史) | 部分 device fallback 5s timer 觸發,**長句 (>15 詞) 可能還沒念完就被推進** |
| Ch3 narration 平均句長 12-15 詞 + quote 結構斷句 | "Look at me! I am the fastest!" he said loud to the other animals — 念完約 6-7 秒,5s timer 會切掉尾巴 |

**P1**: Ch3 沒 MP3 → 跑 OpenAI TTS gen Ch3 narration (per Ch1 pipeline) — 否則 Web Speech 在 iOS 易斷尾。**這是 Ch3 最大 dev gap**。

### 2. A2 readability

**句長分析** (sentence 字數):

| Lesson | 平均句長 (詞) | 最長句 | 超 12 詞句數 |
|--------|-------------|--------|------------|
| L1 | 11.2 | "The big rabbit teased the small green animal in front of the whole field." (14) | 4/11 |
| L2 | 10.4 | "A clever fox said he would stand at the finish line and call the winner." (15) | 3/11 |
| L3 | 10.8 | "He thought there was no chance the small animal could ever pass him." (13) | 3/11 |
| L4 | 9.8 | "He did not look at the rabbit's soft fur or his white teeth." (13) | 2/11 |
| L5 | 11.1 | "On the side of the field, the watching animals began to move closer." (13) | 4/11 |
| L6 | 10.2 | "Long shadows from the trees stretched across the whole road." (10) | 3/11 |
| L7 | 9.6 | "Every animal at the field began to cheer and stamp their feet." (12) | 2/11 |

**沒一句爆 17 詞** ✓ (TOEIC A2 上限)
**句長中位數 ~10** ✓ (A2 sweet spot)

**B1+ 詞檢出** (NGSL >2000):
- "teased" (L1 q10) — B1, 但同句有 "small green animal" 等同改寫,context 救
- "stretched" (L6 q3) — B1 邊緣
- "stamp" (L7 q5) — B1, "cheer and stamp" 連用 cheer 抵
- "embarrassed" (L7 q9 option) — B1, 直譯「不好意思」中文有 — option 中文補

**ZH explanation 讀速** (A2 中文 250 字/分 = 4字/秒):
- explanationZh 平均 12-18 字 → 3-5s 讀完 → ADVANCE_CORRECT_MS=5s **緊但夠** ✓

**Verdict**: readability 在 A2 邊緣, **但 quote 結構吃掉 buffer** — 同樣 11 詞的 quote 比 plain sentence 慢 30-40% 讀。

### 3. Give-away detection

**Jaccard / mirror / identity 掃 L1-L7:**

| Q | narration 前文 | Q sentence/option | give-away type | 嚴重 |
|---|---------------|-------------------|---------------|------|
| L1-q6 | n5: "slow and quiet, on the side of the path" | option correct: "slow and quiet" | **Jaccard verbatim** | P1 |
| L1-q8 | n7: "the hare laughed" | option correct: "😂 laughed at him" | **動詞 verbatim** | P2 (vocab 題刻意如此, OK) |
| L2-q3 | n2: "The hare fell over laughing" | Q: "Did the hare believe?" → No | inference 正常 ✓ |
| L2-q5 | n4 / sentence: "stand at the finish line and call the winner" | option: "to be the judge" | paraphrase ✓ |
| L3-q5 | n4: "I have time, I will rest" → sentence: "thought there was no chance the small animal could ever pass him" | option: "he felt safe and ahead" | paraphrase 不算洩 |
| L4-q5 | sentence: "did not look at the rabbit's soft fur" | option: "kept his eyes on the road" | inference ✓ 沒 mirror |
| L4-q9 | sentence: "brown ears stayed flat" | option: "deeply asleep" | inference ✓ |
| L5-q5 | sentence: "opened her mouth, then closed it" | option: "did not want to wake him" | inference ✓ |
| L5-q9 | sentence: "The green back of the slow walker" | option: "small green animal" | **identity verbatim** (green + small) | P2 |
| L6-q5 | sentence: "tiny green shape was almost touching the big tree" | option: "tortoise near the finish" | identity inference ✓ |
| L7-q5 | sentence: "cheer and stamp their feet" | option: "excited and happy" | paraphrase ✓ |

**結果**: **L1-q6 是唯一 P1 洩答** ("slow and quiet" verbatim in n5 → option correct)。其他 mostly paraphrase OK,inference Q 良好。

**P1 fix**: L1-q6 sentence 從 "Step by step, his short legs moved without any sound" 改成 "His head stayed low as he walked the same way" — keep 「slow + quiet」但**換字眼**, 玩家要做 paraphrase mapping 而不是 verbatim match。

### 4. 第一印象 (0-10s)

打開 L1:
- **看到**: tap-pairs banner "Here are 4 words you will meet in tonight's story" + 4 中英對 (快/fast, 慢/slow, 笑/laugh, 田野/field)
- **focal point**: 中央 4 對配對卡 ✓ 不亂
- **3 元素搶注意力?**: cat anchor 頭像 + 米色泡泡 + 4 pair + speaker button — **4 元素但分區清楚**, OK
- **中文 pre-reveal 違反?**: tap-pairs 設計就是中英對照 — **這是 vocab intro 題,豁免**。沒違反「答對前禁中文」原則 (因為這題不是 reveal 題, 是 setup)

**L1 第一印象** ✓ 過。但**「tonight's story」 對 A2 太繞** — possessive 's + tonight 雙 cognitive 點,**P2 改成 "in this story"**。

### 5. 挫折節點

**預估錯誤率掃描** (A2 玩家視角):

| Lesson | 高風險 Q | 預估錯率 | 為什麼 |
|--------|---------|---------|--------|
| L1-q4 | listen-tf inference | 35% | "did not say a word + looked at ground" → enjoy? No 推理需要 2-hop |
| L1-q10 | gist Q "teased" 字 | 25% | teased B1, 但 option 2 "hare laughing at tortoise" 明寫 → 救 |
| L2-q3 | listen-tf "Did hare believe?" | 30% | inference OK, "ears shook from laughing" → 不信 |
| L2-q10 | "Why did tortoise keep going?" | 40% | **harder** — "lifted one foot, then put down" + 4 抽象 option (gave up/steady plan/lost/sleeping), "steady plan" 對 A2 是抽象 |
| L3-q5 | listen-mc "Why did hare rest?" | 35% | sentence "no chance + ever pass" 雙 negative, "felt safe and ahead" paraphrase |
| L4-q10 | inference "Why not look back?" | 45% | 4 option 全抽象 (head turn / scared / focused / lost), "stay focused" 概念對 A2 偏抽象 |
| L5-q5 | "Why mouse close mouth?" | 50% | **highest** — 需要 ToM (theory of mind) "想出聲又忍住", 4 option 都 plausible |
| L5-q10 | "Why no one wake hare?" | 50% | 一樣 ToM, "fair race" 對 A2 概念抽象 |
| L6-q10 | "Could hare win now?" | 25% | sentence 明寫 tree close to tortoise not him → 直接讀 |
| L7-q9 | "How did hare feel?" listen-mc | 40% | embarrassed (B1) + option 中文 "不好意思" 救 |
| L7-q10 | "Why tortoise smile gently?" | 35% | "share a lesson kindly" 對 A2 屬於 abstract moral concept |

**連續挫折節點 spot**:
- **L5**: q5 + q10 都 ToM 抽象 inference,**錯率預估 50% × 2**,中間 q7-q9 雖 easy 但**整 lesson 累積挫折**
- **L4-q10 + L5-q5**: 跨 lesson 連 2 個 abstract inference → **L5 開頭可能流失** (especially 通勤閉著眼選 random)

**P1**: L5 重做 — 把 q5 / q10 從 ToM "為什麼別人怎麼想" 改成 detail Q "誰最先說話" / "兔子在哪"。ToM 對 A2 太重。
**「想退出時間點」**: L5 第 5-6 分鐘 (q5 + q10 之間).

### 6. 留存意願

**每 lesson 結尾 hook (cuts.md):**

| L | n11 ending | hook type | 我想看 L+1 嗎? |
|---|-----------|----------|--------------|
| L1 | "I will race you... he said, slow and sure..." | B2 mock→bold | ✓ 想 — 「烏龜怎敢嗆兔子?」 |
| L2 | "The hare was already far away. Tortoise had taken only one step..." | B3 gap | ✓ 想 — 「這差距追得上?」 |
| L3 | "He sat down on the soft grass. His eyes closed slowly..." | B5 sleep | ⭐ 最想看 — 「他真的睡了?」 |
| L4 | "His feet moved one after the other... The finish tree grew closer..." | B6 momentum | ~ 半想 — 烏龜慢慢走太久了, 看 4 個 lesson 烏龜還在走,**節奏鈍** |
| L5 | "Is the hare still sleeping?" | B5 doubt | ✓ 想 — 但 L5 累人,我可能改天玩 |
| L6 | "Tortoise was at the big tree..." | B2 panic | ⭐ 最想看 — 來得及? |
| L7 | "Slow and steady wins. The hare did not look up..." | B2 resolved + 開放 | hmm — 結束了但「兔子有沒有學到」沒答 |

**滿分項**: L1 / L3 / L6 hook 強, **「想看下集」明顯**
**鈍化項**: L4 — 烏龜走太久, L4 是 plod-only lesson, 沒角色互動沒情緒翻轉,**Stein open-not-resolve 邏輯成立**但**Brewer inquiry weak** ("烏龜還剩多遠?" 我已經知道 answer = 慢慢到)
**P2**: L4 加一個 mini twist — eg "A small bird landed on the hare's nose" hint 兔子可能要醒, 但烏龜還沒回頭

### 7. 跨 lesson connective tissue

**L1→L2**: 烏龜說「我來和你比賽」→ L2 開頭 "fell over laughing" ✓ 完美 carry forward
**L2→L3**: 兔子跑遠 → L3 "hare looked back" ✓
**L3→L4**: 兔子睡 → L4 烏龜走到樹下看到睡兔 ✓
**L4→L5**: 烏龜走過 → L5 動物悄悄話 ✓
**L5→L6**: 「兔子哥還在睡嗎?」→ L6 "hare opened his eyes" **⭐ 神接** — 一個問句直接 trigger 醒過來
**L6→L7**: 烏龜在大樹邊 → L7 "lifted one short leg for the last time" ✓
**L7→Ch4**: Ch3 結束沒明顯接 Ch4 (醜小鴨)。但 Ch3-Ch4 用 Aesop / Grimm 切換 by chapter,**outer frame (奶奶 + Mochi + Hana)** 沒在 Ch3 narration 出現 — **這是 spec 違反**: per `docs/superpowers/specs/2026-05-29-pickup-duolingo-nested-redesign.md` outer-prologue 應該 frame 每章為奶奶的故事夜晚。**Ch3 沒 outer-prologue lessons** (純 7 main-story), 結構與 Ch1 24-lesson nested 不一致。

**P1 architectural**: Ch3 需補 outer-prologue (Mochi 跳牆 / Hana 趴下 / 奶奶翻書) + outer-outro (Goodnight Mochi) + review lessons,才符 v2.0 nested spec。**目前 7 lesson 是 stripped main-story only**。

---

## 對話體額外分析 (Ch3 unique)

### Quote 出現時間軸:讀「he said」vs 讀 quote 哪個快?

我自己測 (mental sim, A2 自我視角):

| Sentence | 字數 | 我讀完秒數 | 為什麼 |
|----------|------|----------|--------|
| "Every day, the hare jumped fast across the open field." (n2 plain) | 10 | 4s | linear, subject 在前 |
| "Look at me! I am the fastest!" he said loud to the other animals. (n3 quote-first) | 13 | 6.5s | quote-first 我要回想 speaker, 末端 speech tag 再 confirm |
| "Hello, slow one," the hare laughed. "Can you even walk?" (n7 2 quote) | 10 | 5.5s | 兩 quote 中間 tag, 我要 parse 兩 turn |
| "I have time," the hare said to himself. "I will rest under this tree." (L3-n4) | 13 | 5s | speech tag 在前 + "to himself" 明確 → 較順 |
| "I will race you," he said, slow and sure... (L1-n11) | 8 | 4.5s | quote 短 + 後尾 tag, "slow and sure" 額外狀態描述加 0.5s |

**結論**: Quote-first (n3) 比 plain (n2) **慢 60%**。Tag-first (L3-n4) 比 quote-first (L1-n3) **快 25%**。

**P1**: Ch3 narration 偏好「**speech tag 在前**」結構 — eg n3 改成 'The hare said loud to the other animals, "Look at me! I am the fastest!"' 對 A2 解析更友善。或至少**首次出現某角色 quote 時**用 tag-first 模式建立 anchor。

### 角色辨識:多角色 quote 區分

L5 是 worst case — 一個 lesson 內出現:
- "small fox whispered" (q4 quote)
- "mouse opened her mouth, then closed it" (q5, **no quote**)
- "young rabbit's voice" (q11 quote)
- watching animals 群體 (q2 n)
- 沉默的 hare (q8 n)

**5 個 actor 在 1 個 lesson**。我在 q11 "Is the hare still sleeping?" 出現時 **要停 2 秒才想起這是 young rabbit not the原 hare**。

**P1**: L5 q11 改 'A young rabbit whispered (not the sleeping hare). "Is he still sleeping?"' — 加 parenthetical / context 排除誤讀。或乾脆 L5 砍掉 mouse + young rabbit 2 角色, 只留 small fox 1 個發聲源。

### 8 個 X2_OPTION_LIST_BIAS warning 評估

掃 L1-L7 listen-mc + listen-comprehension Q,符合 OPTION_LIST_BIAS 條件 (4 個 option 同首詞 / 同結構 ≥ 3):

| Q | bias pattern | 玩家感受 |
|---|------|---------|
| L1-q6 | "fast and loud" / "slow and quiet" / "angry and fast" / "sleepy and still" — 全 adj+and+adj | **無感** — 我看到都是描述對, 不會 unfair。但**反過來幫我刪去法** |
| L2-q5 | "to run too" / "to be the judge" / "to time the race" / "to give a prize" — 全 "to V" 開頭 | **微感** — "都是動作" 順了 grammar parsing, 沒 unfair 感 |
| L3-q5 | "he was hurt" / "he felt safe" / "he heard sound" / "his friend called" — 4 個都 "he X" 開頭 | **完全無感** — 主詞一致是 natural |
| L3-q9 | "waking up" / "falling asleep" / "running again" / "eating lunch" — 全 V-ing 動作 | **無感** |
| L4-q9 | "no, he woke up" / "yes, deeply asleep" / "he ran away" / "he started crying" — 不齊整 (no/yes 2 個 + he 2 個) | **微感不一致** — 第一個 "no" / 第二個 "yes" 視覺有差 |
| L5-q10 | "they were too far" / "they wanted fair race" / "they did not see" / "they were sleeping" — 全 "they X" | **無感** |
| L6-q9 | "slower than before" / "faster than ever" / "walking" / "standing still" — 不齊整 | **微感** — 2 個 "X than Y" + 2 個 V-ing,結構 inconsistent |
| L7-q5 | "scared" / "sleepy" / "excited and happy" / "sad" — 不齊整 (3 single + 1 phrase) | **微感** — 'excited and happy' 比其他長, 容易吸睛 = 答案 bias |

**結論**: 8 個 warning 我**大部分無感**, **但有 2-3 個反向 bias 我會用來刪去法**:
- L1-q6: angry / sleepy 跟 narration "slow + quiet" 不搭 → 刪 2
- L7-q5: "excited and happy" 比其他長且具體 → **bias 反向洩答** ("longest option = correct" Wagner 1970s 經典 cheat)

**P2 fix**: L7-q5 options 改齊長:
- "scared and shaking" / "sleepy and slow" / "excited and happy" / "sad and quiet" — 全 adj+and+adj 兩字

---

## P0-P2 Issue List

### P0 (30 秒內關 app) — 0 條

Ch3 結構 ok, 沒 catastrophic blocker.

### P1 (1 lesson 後不回來) — 5 條

1. **Ch3 沒 MP3,Web Speech 在 iOS Safari 不穩 + 切尾**
   - 根本原因: Ch3 narration 沒 OpenAI TTS gen, Web Speech `u.onend` race condition (B.159 bug 歷史)
   - 修法: `tools/gen-mp3.cjs` 跑 Ch3 narration 187 句 → `public/audio/lessons/kt-ch3-l{1-7}-n{1-11}.mp3`
   - 檔: `tools/gen-mp3.cjs` (參考 Ch1 pipeline)

2. **L1-q6 verbatim 洩答 (slow and quiet)**
   - 根本原因: n5 sentence "slow and quiet" + Q6 option correct "slow and quiet" — Jaccard verbatim match
   - 修法: q6 sentence 改 "His head stayed low as he walked the same way" 或 q6 option correct paraphrase "calm and silent"
   - 檔: `public/lessons-ch3.json:113` (sentence) 或 `:122` (option)

3. **L5 認知超載 + 多角色 quote 區分 + 連續 ToM Q**
   - 根本原因: L5 一節 5 個 actor (group / fox / mouse / hare / young rabbit) + q5 + q10 都 abstract ToM inference (50% 預估錯率)
   - 修法: 砍 mouse + young rabbit 至 1 個發聲源 (留 small fox), q5 改 detail Q "誰悄悄話?" 而非 "為什麼閉嘴", q10 改 "兔子現在還在做什麼?" 而非 "為什麼沒人叫醒"
   - 檔: `public/lessons-ch3.json:1109-1144` (q5), `:1221-1247` (q10), `:1252` (q11 young rabbit)

4. **Ch3 缺 outer-frame lessons (奶奶 + Mochi + Hana)**
   - 根本原因: per `docs/superpowers/specs/2026-05-29-pickup-duolingo-nested-redesign.md` outer-prologue (3) + outer-outro (2) + review (1) 必備,Ch3 目前純 7 main-story lessons,**與 Ch1 24-lesson nested 不一致**
   - 修法: 補 6 outer lessons + review (Ch3 → 13 lessons),或先 ship 7 lesson 版,但**改 `segmentType: "main-story"` 不可能** → spec drift 需 PM decide
   - 檔: `public/lessons-ch3.json` 整檔 + `src/data/lessons.ts` Lessons schema 確認

5. **Quote-first 結構讀速 慢 60% — L1-n3 / L7-n4 等首次角色出現**
   - 根本原因: 英文 quote-first ("Look at me!" he said) 比 tag-first (he said, "Look at me!") 對 A2 慢 60% 解析,L1-n3 是首次 hare 出聲沒 anchor
   - 修法: 首次角色 quote 改 tag-first
     - L1-n3: `'The hare said loud to the other animals, "Look at me! I am the fastest!"'`
     - L7-n10: 'The tortoise said softly, "Slow and steady wins the race." The hare did not look up...'
   - 檔: `public/lessons-ch3.json:64` (L1-n3), `:1758` (L7-n11) 等

### P2 (polish) — 6 條

1. **"in tonight's story" 對 A2 possessive 's 雙負擔**
   - 改 "in this story" (7 處 — L1-L7 tap-pairs intro 一致)
   - 檔: `lessons-ch3.json` Lx-q1 sentence

2. **L7-q5 option bias (longest = correct 反向洩答)**
   - "excited and happy" 比 "scared" / "sleepy" / "sad" 顯著長
   - 改齊: "scared and shaking" / "sleepy and slow" / "excited and happy" / "sad and quiet"
   - 檔: `lessons-ch3.json:1616-1625`

3. **L4 plod-only 節奏鈍 — 無情緒翻轉**
   - 烏龜 lesson 4 整節都在「走走走」,沒小 twist 維持 attention
   - 加 mini hint: eg "A small bird landed on the hare's ear, then flew away" (兔子可能要醒的 fake-alarm)
   - 檔: `lessons-ch3.json:838-880` (L4 q4-q5 附近)

4. **L1-q10 "teased" B1 字** (其他句已用 "laughed at" / "laughed" 描述,q10 sentence 突然 "teased" 不一致)
   - 改 "The big rabbit laughed loud at the small green animal..."
   - 檔: `lessons-ch3.json:215`

5. **L5-q9 "small green animal" + "green back" identity 重複**
   - sentence 已說 "green back of slow walker", option correct "small green animal" — 還沒違反 P1 但**重複描述** 對 A2 過簡
   - 改 option correct: "the careful walker" (force student to map green = 烏龜)
   - 檔: `lessons-ch3.json:1198`

6. **L7 結尾 hook 沒 Ch4 預告 — 「兔子有沒有學到」開放但無後續**
   - 加微 outro hint: 'The hare looked at the ground. "Maybe I... will try walking next time," he whispered.' — 留 character-arc 但不關死
   - 檔: `lessons-ch3.json:1758` (L7-n11)

---

## 結論段:我玩完 Ch3 的整體感覺

我是阿芳。Ch3 我玩了大概 30-35 分鐘 (7 lesson × 4-5 分鐘),比 Ch1 雨夜 (我玩 Ch1 大概 40 分鐘 due to 8 lessons) 短一點。**情緒峰值在 L6** ("No, no, no!" 那段我跟著緊張) — 但**我在 L5 真的累了**。L5 有點像看一部戲突然出現 3 個沒名字的配角講悄悄話 — 我以為主角是烏龜兔子,結果一群動物在「公平觀戰」, 對 A2 來說 nuance 太多。

**對話體 vs Ch1 第一人稱**:Ch1 是貓 POV ("I wake up and the rain is falling hard") — 直接、近身、情緒明確。Ch3 是 third-person + heavy quote — **疏離 + 多人 + speech tag overhead**,讀起來像看童話書 (符 canon 設計但 A2 認知負擔 +20%)。

**我會繼續玩 Ch4 嗎?** 會,因為 L6 + L7 的回升 + slow-and-steady 道理我感同身受 (我下班滿身疲憊但還是要學英文 = 烏龜)。**但 Ch5 / Ch6 用一樣對話體我會疲乏** — Ch3 是對話體首章, **如果 Ch5-Ch8 全對話體**,我會在 Ch5 棄坑。

**top 3 最該動的**:
1. **L5 重做** — 砍角色 + ToM Q 降難度 (highest churn risk lesson)
2. **Ch3 MP3 gen** — Web Speech 在 iOS 不穩 + Ch3 quote 結構需 native intonation 才不混淆角色
3. **首次角色 quote 改 tag-first 結構** — L1-n3 / L7-n11 + 全章首現角色點

---

*Audit by Player Walkthrough Agent (5th audit, A2 阿芳 persona). Ch3 對話體首試 + B2/B5 多重 hook 結構性 ok,但 L5 ToM 超載 + 角色多 + Ch3 缺 MP3 + outer-frame 缺乏 是 3 個主 P1。整體 ship-worthy 但 5 P1 + 6 P2 should fix before 認為 Ch3 完工。*
