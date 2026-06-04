# Ch6 六隻天鵝 — Player Walkthrough Audit

> 5th-agent player walkthrough (per `docs/agents/player-walkthrough.md`).
> Role: A2 台灣成人,下班後在捷運上玩 Pickup Ch6 (Grimm KHM 49 改寫,B.225 全新 rewrite,7 lessons,77 Q,**zero MP3**)。
> Date: 2026-06-04
> Build: v2.0.B.225 (Ch6 rewrite — Six Swans, dialogue-free poetic narration)
> **Voice: 第一人稱「我」。我看到 X、我聽到 Y、我覺得 Z。**

---

## TL;DR (給沒時間讀完的我)

- **L1 開場我懂** — 七個小孩 / 六男一女 / 安靜城堡。**但 narration 一句接一句沒 audio**, 我以為手機壞了, 點兩次喇叭 icon 沒聲音, 退一步發現「這章就是沒 MP3」, 心情卡了一下。
- **L4「六年不能說話」這個 hook 太強了**, 我一邊滑捷運一邊腦中 echo「六年欸」。**但**緊接的詩意句 "She sewed and sewed. The nights grew long." 我看著螢幕 3 秒, 沒看懂 "sewed" — A2 vocab pair 是教 sew=縫, 但動詞過去式 sewed 我頓了一下。
- **L6 q5 那句 "She ate her own child"** — 我盯著螢幕大概 4 秒。第一個反應是「啊?」, 第二個反應是「中文翻譯呢?」滑下去看 explanationZh 才確認沒看錯。**這句太重了 A2 看到會煞車**, 但煞得有戲劇感, 我沒退出, 繼續 tap。
- **詩意 imagery 是雙刃** — "White feathers fell softly" 我看得懂 (有 wing/white/feather 三個 NGSL 800 vocab pair 鋪過), 心裡是好聽的; 但 "her hands grew cold" 我懵了 0.5 秒 (grew = grow 過去式 = 變? 我以為是「種」), 然後從上下文 (empty beds + brothers were gone) 才回頭推 = 害怕的手變冷。
- **沒 MP3 = 我在捷運可以靜音玩**, 反而是 plus, 但前提是 UI 要明示「這章是純閱讀」, 不能讓我以為「我手機壞了」。
- **能不能 hook 睡前 5 分鐘** — **能**, L4 結尾「六年都不行」+ L6 結尾「火堆是為她搭的, 一件衣只縫好一隻袖子」這兩個 cliffhanger 我會想知道明天會怎樣。比 Ch1 雨夜小貓 (太溫和) 更黏。

---

## 第一部分:時間軸 table

> Lesson 6 (L6, 謊言三次 — 火堆已搭好) 是 Ch6 最重的一節, 我用它做 ~15 row 時間軸。
> 沒 MP3 → 沒有 audio duration, 我假設 ADVANCE_NARRATION_MS = 5000ms (B.160 改) 沒有 onEnd callback 走 fallback 5s timer。

| t (s) | 看到 | 聽到 | 可做 | 痛點 |
|-------|------|------|------|------|
| 0.0 | tap-pairs q1 4 對中英 (偷/steal, 嬰兒/baby, 謊言/lie, 火/fire) + cat bubble | 安靜 (zero MP3) | tap 配對 | 一打開就 4 個 emoji 🔑 + 4 對中英閃過, 我先看中文掃過去, 確認都認得就點。**第一印象就 4 重 cliché 字 (偷/嬰兒/謊言/火), 我心裡「噢, 這集很黑」** |
| 18.0 | 配對完, q1 explanation 浮現 "🔑 steal = 偷 / 🔑 baby = 嬰兒 / 🔑 lie = 謊言 / 🔑 fire = 火 / 背熟這 4 個字..." | 安靜 | 看 + Continue | A2 我 18 秒能配完, 然後看 explanation 大概 4 秒消化, 心裡有預期「這集會出現偷小孩+火」 |
| 24.0 | q2 narration "The bride had a small baby with soft pink cheeks." + 米色泡泡 + calico-anchor 頭像 | 應該有 MP3 (kt-ch6-l6-q2.mp3) **不存在 → silent + 5s timer fallback** | 等 5 秒 | **第一痛點:我點喇叭 icon 沒聲音, 我以為手機靜音, 拉下狀態列確認音量開著, 再點還是沒聲。**5 秒過 narration 自動推進, 我才意識到「噢這章沒語音, OK」, **但這 5 秒我是被困惑、不是被故事推著走** |
| 29.0 | q3 listen-tf "In the deep of the night, the king's mother came into the room with quiet feet." + Q "Did she come with good plans?" + Yes/No | 安靜 | tap Yes/No | sentence + question 同時看到, 我先看英文 "deep of the night" + "quiet feet" → 中文直覺答 No。**我有點不確定 "Did she come with good plans" 是不是中性問句**, 但 deep of night + quiet 兩個負面 cue 夠了 |
| 38.0 | 答對 ✅ + explanation "推理:深夜 + 腳步輕 → 偷偷做事 → 不是好事" | 安靜 + (應該答對 SFX 也有, 這個有) | Continue | explanation 中文「偷偷做事 → 不是好事」夠白話, 我 OK。**3 秒讀完, Continue 過** |
| 41.0 | q4 narration "She lifted the baby from the warm bed and carried it far away." + cat bubble | 安靜, 5s fallback | 等 | 句子 13 字 (warm bed / lifted / carried far away), A2 我懂全部單字。**「她從溫暖的床抱走嬰兒」中文我看完 explanationZh = 「她從溫暖的床抱走嬰兒, 帶到很遠的地方」。我預期接下來會發生不好的事** |
| 46.0 | q5 listen-mc — 螢幕上跳出 **"She ate her own child," the older woman told the king the next morning.** + question "What did the king's mother say?" + 4 options | 安靜 | tap 1/4 | **🚨 P0 情緒煞車點:我看到 "She ate her own child" 第一個反應是字面理解 "ate"+"her own child" = 吃她自己小孩??我盯著螢幕大概 4 秒, 心裡跑「等等」**, 然後看 4 個 options ("fell into sickness / loved every baby / harmed her own child / ran far from home"), "harmed her own child" 比較接近, 我選了。**但「harmed」這個字 NGSL 1500 我不太熟**, 我是因為前面三個明顯不對才用刪去法選 |
| 56.0 | 答對 ✅ + explanation "她告訴國王的話 → 傷害自己孩子" | 安靜 | Continue | 中文 explanationZh 救了我 — 「傷害自己孩子」夠清楚不會誤解。**但 Q 設計這裡稍微 give-away:narration 直接寫 "She ate her own child"** (一個謊言 quoted line), Q 問 "What did the king's mother say", correct option 是 paraphrase "harmed her own child" — 這個 paraphrase A2 要從 ate→harmed 跳, 不是 trivial |
| 60.0 | q6 listen-mc "The bride heard the lie, but no word came from her lips." + Q "Why did the bride not speak back?" + 4 options | 安靜 | tap | "no word came from her lips" 詩意 = 沒說話, 我從 Ch6-L4 q9 (No word would leave her lips) 看過類似句, 認得這個 pattern。Q 4 option 我選 "her promise kept her quiet" — 因為前面 L4 已經鋪過「不能說 6 年」 |
| 70.0 | q7 emoji-pick "How did the bride answer the lie?" + 4 emoji options (🗣️ words / 🤐 silence / 😡 shouts / ✍️ writing) | 安靜 | tap | 4 個 emoji 我一秒選 🤐 silence。**這題 give-away 高** — q6 已經答 "she could not speak", q7 就是同樣問題用 emoji 重問。但對 A2 來說這個 give-away 是好的, **我答對連兩題會有 momentum** |
| 78.0 | q8 narration "A second baby came. The same thing happened. Then a third." + cat bubble | 安靜, 5s fallback | 等 | **時間壓縮 narration** — 一句帶過第二、第三個嬰兒消失。我看 explanationZh「第二個嬰兒來了, 同樣的事發生了, 然後第三個」, 心裡「靠... 連續三次」, 情緒被推進但 narration 本身沒有情感 hook (no "she cried" / no "she screamed") — 詩意 narration 在這裡剛好平衡掉慘度, 不會 melodramatic |
| 83.0 | q9 listen-mc "Once, twice, and a final time a small child was born. Each one was gone by morning." + Q "How many babies did the bride lose?" + (one / two / a trio / four) | 安靜 | tap | **a trio?** — 這字 NGSL 3000+ 我不認得。中文選項是「一組三個」我才秒懂。**A2 word 換成 "three" 更安全, 但出題者可能想避免「Once+twice+final time = three」太明顯**。我用刪去法 (one / two 跟剛聽到 third 不符, four 也不對) 選 trio |
| 95.0 | q10 listen-comprehension "Three lost children, one quiet bride, six unfinished shirts, and a fire in the yard." + Q "What is this scene mainly about?" + 4 options | 安靜 | tap | **詩意 list 句** — 4 個 noun phrase 串成 image (3 失蹤小孩+1 沉默新娘+6 未縫衣+院子火). 我快速 scan, 選 "silent woman facing flames"。**這題對我來說是「呼吸」的題** — narration 不推進, 給我整段消化空間, 我喜歡 |
| 105.0 | q11 outro narration "Wood was piled high in the castle yard. The fire was built for her. Six shirts lay in her lap, but one had only one sleeve..." | 安靜, 5s fallback | 等 | **這個 cliffhanger 我給 9/10** — 「火堆已搭好給她+衣服還差一隻袖子」這兩個資訊一起出現, 我心裡是「靠, 明天會發生什麼」。**這就是 L6 的記憶點**, 我會把 app 關掉但記得回來看 L7 |
| 110.0 | "Lesson complete!" stat screen — XP/Accuracy/Time triptych + 📖 單元回顧 button | 安靜 | tap Continue | 我看 XP 飆高開心, 但 **stat screen 沒有 cliffhanger 維持** — 從 narration 高潮直接跳「你拿到 X XP」破壞情緒。**B.161 lesson review screen 是不是可以加 1 行「明天:正午,火堆,六年到期...」?** |

---

## 第二部分:7-checklist 詳細跑過

### 1. 時序對齊 ⚠️ P1

**沒 MP3 → ADVANCE_NARRATION_MS 5000ms fallback 全章 dominant**。
- B.160 改 ADVANCE_CORRECT_MS 3→5s + 加 onEnd callback — 但 onEnd 沒檔可觸發, 走 5s timer
- 我 (A2) 讀 narration 速度:中文 explanationZh 2-3 字/秒 ≈ 12-15 字句 = 5-7s; 英文 narration 1-1.5 字/秒 ≈ 13-15 字句 = 9-15s
- **5s 太短了**。L4 q4 "She found a small wooden hut, half hidden by tall green leaves" + zh "她找到一間小木屋, 半藏在高高綠葉後面" = 17 EN words + 16 ZH chars。我 5s 看完英文一半, 中文還沒掃完 → narration 自動推走, 我退一步點 back button 找不到, 只能 swipe 看上一條 (如果有的話)。
- **修法**:Ch6 (zero MP3) 場景應該把 ADVANCE_NARRATION_MS 5000 → **8000 或 10000ms** 對 narration 類 Q (非 listen-tf/mc 那種 Q 自己有 tap action 不依賴 timer)。或加 user setting「自動推進速度: 慢/中/快」。
- **檔案**:`src/scenes/LessonScene.ts` ADVANCE_NARRATION_MS const

### 2. A2 readability 整體 ✅ 但有 spike

- **L4 q11**: "She sewed and sewed. The nights grew long. She did not speak. She did not cry out loud..." → 16 字, 但 "sewed" 是 sew 過去式 (vocab 教 sew = 縫, 沒教 sewed), "grew long" 慣用語 A2 卡 (我以為 "種長"); **estimated stumble: 6-8s**
- **L3 q10**: "Her hands grew cold." → 4 字看似簡單但 "grew cold" 比喻意 (害怕 / 震驚的身體反應) A2 直譯看不出來, 需要從前句 "empty beds + brothers were gone" 推
- **L6 q9**: "a trio" NGSL 3000+, A2 不會, 靠中文 options 救
- **L6 q5**: "harmed" NGSL 1500, 邊緣 A2, 靠刪去法
- **L7 q9**: "Where his left arm should have been, soft feathers still grew" — should have been 過去完成式 + grew 第二意 (生長) A2 雙重卡, **estimated stumble: 8-10s**
- 整體 NGSL coverage 估計 85-90% 在 A2 範圍, 但**詩意慣用語 ("grew cold" / "no word would leave her lips" / "sewed and sewed") 是隱藏難點**
- **修法**:explanationZh 加註慣用語意。"grew cold" → 中文不要直譯「變冷」, 寫「(因為害怕) 手變得冰冷」。

### 3. Give-away detection ⚠️ 中度洩答

**Jaccard 共名詞檢查** (narration vs Q.question 跨 lesson 全 Q):

| Lesson | 洩答點 | 嚴重度 |
|--------|--------|--------|
| L1 q5 | narration "ran along the river bank" → Q "Where did the boys play?" + option "by the water" | 中度 (river/water 同義替換 OK) |
| L1 q7 | emoji-pick 直接問 "How many children?" — 但前面 q2 narration 剛說 "seven children" | **高** (直接 mirror) |
| L2 q9 | narration "She let the small white things fall over their sleeping shoulders" → Q "What did she do?" + option "put shirts on them" | 中度 (fall/put 概念跳一步) |
| L3 q7 | emoji-pick "What did the boys turn into?" — 前面 q2 直接 "Where the boys had stood, six swans now rose" | **高** (直接 mirror) |
| L3 q9 | narration "Six small beds lay smooth and still. No one had slept in them" → Q "What did the girl see?" + option "six empty beds" | 中度 |
| **L4 q9** | narration "No word would leave her lips" → Q "What rule did she have to follow?" + option "stay silent" | **高** (no word=silent 同義) |
| L6 q6 | narration "no word came from her lips" → Q "Why did the bride not speak back?" + option "her promise kept her quiet" | 中度 (paraphrase OK) |
| L7 q5 | narration "She lifted the small white shirts and threw one over each bird" → Q "What did she do with the shirts?" + option "threw one on each swan" | **高** (直接 mirror) |

**整體**:每章都有 1-2 個高度 mirror Q (尤其 emoji-pick q7 統一模式 = 把 Q 內容塞 narration), 但 A2 在這個級別需要 mirror 才不會挫敗。**L7 q5 直接照 narration 抄答案太極端**, 應該改 inference 或 paraphrase。

**修法 (P2)**:L7 q5 改成 "What happened the moment the shirts touched the swans?" → option "feathers fell" (paraphrase 不 mirror)。

### 4. 第一印象 (0-10s) — Lesson 6 ✅

- **0-2s**: tap-pairs UI 出現, 4 對中英閃過, 上方 calico cat 頭像
- **2-5s**: 我看到「偷 / 嬰兒 / 謊言 / 火」這 4 個關鍵字, 大腦立刻拼出「這集很黑」
- **5-10s**: 開始配對, 全是 NGSL 1500 內單字, 我配得順
- **沒有 3+ 元素搶注意力** ✅ (cat 頭像 + 米色泡泡 + 4 對 button 三層, 不打架)
- **中文沒在英文 reveal 前先洩底** ✅ (tap-pairs 中英並列是設計, 不違反 R7)
- **「下班逃逸」感**: tap-pairs 是 ritual, 像翻書前的目錄, 我 OK

### 5. 挫折節點

**Lesson 6 全 Q 估算錯誤率** (我 A2 視角):

| Q | 錯誤率 | 卡點 |
|---|--------|------|
| q1 tap-pairs | <5% | 全 NGSL 1500 |
| q3 listen-tf "good plans" | 20% | "good plans" 反諷 A2 可能 literal 讀 |
| q5 "ate her own child" | 15% | 字面太重 + paraphrase to "harmed" |
| q6 "her promise kept her quiet" | 25% | "promise" NGSL 1500 + 抽象因果 |
| q9 "a trio" | 40% | trio 不認得, 靠中文選項救 |
| q10 gist | 10% | 詩意 list 對 A2 反而清楚 |

- **連續卡點**: q5-q6 兩題都涉及「沉默的承諾」抽象概念, A2 連卡兩題, **挫折節點 = q5→q6 之間**
- **連續 give-away**: q3 (deep night + quiet feet → No) + q7 (silence emoji) 兩題明顯, 但中間有 q5/q6 平衡
- **想退出時間點**: **q5 "ate her own child"** — 不是因為太難, 是因為太重。**A2 看到「吃自己小孩」可能會反應「這 app 不對勁吧」**, 點關掉。**但**:中文 option「傷害自己孩子」+ explanationZh 拉得回來。
- **修法**: q5 sentence 加一個前置 narration「她說了一個很可怕的謊」緩衝, 或在 explanationZh 加一行「這是王后編造的可怕謊言, 不是真的」明示「故事中的謊言」。

### 6. 留存意願 ✅✅

- **L6 結尾**: "Wood was piled high. The fire was built for her. Six shirts lay in her lap, but one had only one sleeve..." → **3 個 cliffhanger 元素疊加** (火堆 + 衣不夠 + 缺一袖子) = **我絕對會回來看 L7**
- **L4 結尾**: "She sewed and sewed. The nights grew long. She did not speak..." → 詩意疊句 + 省略號 = 留有想像空間
- **L7 結尾**: "But the youngest brother turned to her with one wing still on his back..." → **未解的天鵝翅膀 = open hook 給未來章節想像** (canon doc 標為 B6 預言種子)
- **stat screen 沒接住 cliffhanger** ⚠️ — narration 推到 90 度然後 stat screen「你拿 X XP」破情緒, **建議 stat screen 加 1 行小字「下一集:正午... 火堆已搭好」**

### 7. 跨 lesson connective tissue ✅

| 銜接 | 評分 |
|------|------|
| L1 結尾 (椅子空著) → L2 開頭 (新王后來自遙遠寒冷國度) | ✅ 強, 空椅子 = 新人來填 |
| L2 結尾 (這些不是保暖的衣服, 天亮會改變) → L3 開頭 (六隻天鵝飛起來) | ✅✅ 強, "something would change at dawn" → 直接接 transformation |
| L3 結尾 (女孩拾起羽毛) → L4 開頭 (妹妹走進森林) | ✅ 強, 羽毛 = 唯一線索 → 出發找哥哥 |
| L4 結尾 (她縫又縫, 不哭出來) → L5 開頭 (年輕國王騎馬穿森林) | ⚠️ 中度, 從她孤獨縫衣跳到外人介入, 時間跨度大但符合民俗故事節奏 |
| L5 結尾 (婆婆站在每扇門後, 看著, 等著) → L6 開頭 (新娘有了嬰兒) | ✅ 強, "watching, waiting" 直接付諸行動 |
| L6 結尾 (火堆已搭好, 衣缺一袖) → L7 開頭 (火刑那一天到了) | ✅✅✅ 最強, 直接時間切 |

整體 connective tissue 非常強, 7 lessons 像 7 集連續劇。

---

## Ch6 特性檢查 — 三條額外題目

### 詩意 imagery 對 A2 是 OK 還是迷糊?

**雙刃。**

**OK 的 imagery**:
- "white feathers fell softly" — 三個 vocab pair (wing/window/empty) 鋪過, 我能腦補畫面 ✅
- "the moon was high and pale" — moon NGSL 700, high+pale A2 都認得 ✅
- "Each shirt was the color of fresh snow on a winter morning" — fresh+snow+winter NGSL 800-1000, 我能 visualize ✅

**迷糊的 imagery**:
- "her hands grew cold" (L3 q10) — grew + cold 都認得但「grew cold」慣用比喻 (恐懼) A2 直譯=「種冷」不通 ⚠️
- "no word would leave her lips" (L4 q9) — 詩化句構, A2 第一遍可能讀成「沒字會離開她嘴唇」字面理解 ⚠️
- "She sewed and sewed. The nights grew long." (L4 q11) — sewed (vocab 教 sew 沒教過去式) + grew long (時間變長的比喻) **連續兩個 stumble** ⚠️
- "Her needle moved fast, in and out, while the rest of the castle slept" (L2 q5) — "in and out" 對針線動作 A2 可能 visualize 不出來 (我有點懵)

**整體**:詩意句作為 narration 還行 (有中文 explanationZh 拉), 但**作為 Q.sentence (要 A2 推理) 風險高**。L3 q10 / L4 q9 / L7 q9 都靠中文選項救。

**修法 (P1)**:詩意比喻句的 explanationZh **不只翻譯**, 加「為什麼這樣寫」一句。例:「her hands grew cold」 explanationZh: "她的手變得冰冷 — 是『因為害怕』身體的反應, 不是真的氣溫變冷"

### 「ate her own child」謊言句 — A2 反應

我的真實反應:

**T+0s**: 看到句子 → 字面解碼 "ate (吃) + her own (她自己的) + child (孩子)" → 大腦警示「等等」
**T+1s**: 心裡 "What?"
**T+2-3s**: 重讀第二遍, 注意到引號 → 「噢這是 quoted speech, 是有人說的話, 不是 narration 陳述」
**T+3-4s**: 看 Q "What did the king's mother say?" → 啊, **是王后**說的, 不是真的發生
**T+4-5s**: 看 4 options → "harmed her own child" 比較接近 → 選
**T+5-7s**: 答對 ✅ explanationZh "她告訴國王的話 → 傷害自己孩子" → **心情調整完成**

**繼續 mood**: ✅ 我**沒有**關掉 app。**反而**這句 emotion punch 把我抓進故事。**但**:
- 我是有大人理解力的 A2, 看得出 quoted speech = lie
- **如果是更敏感的 user (媽媽 user / 帶小孩的 user) 可能在 T+2s 就關 app**
- **如果晚上太累 mental bandwidth 不夠 (這 app 主打下班逃逸) 可能誤讀為「故事發生了這件事」**

**修法 (P1)**:
- q5 sentence 加情境包裝: "The next morning, the older woman lied to the king. \"She ate her own child,\" she said."
  → "lied" 一字明示這是謊言, 緩衝 emotional impact
- 或 explanationZh 加開頭: "(這是王后編的謊話)" 顯式 frame
- **檔案**:`public/lessons-ch6.json` kt-ch6-l6-q5

### 六年沉默設定能不能 hook 一個睡前 5 分鐘的 user?

**能, 而且能 hook 多晚。**

我的「下班 5 分鐘」 mental model:
- L4 第一次聽到「六年都不行」 → **同感** (我也想過「忍多久才能...」)
- L5 婆婆挑釁 + 她繼續縫 → **共鳴** (職場有過類似「想反駁但忍住」場景)
- L6 三個嬰兒被偷 + 她不能解釋 → **代入感** (被誤會說不清的經驗)
- L7 正午說出真相 → **情緒釋放**

**這個 hook 比 Ch1 (雨夜小貓) 強的地方**:
- Ch1 是「治癒」 (我陪小貓淋雨 → 找到地方睡 → 暖)
- Ch6 是「忍耐+解放」 (六年沉默 → 真相說出口) — **後者對成人 user 共鳴更深**
- **canon doc 自己寫了**: 「下班沉默的人懂」 — 對, 我懂

**5 分鐘能玩多少**: L4 我估 4-5 分鐘 (11 Q, 沒 MP3 全跑 fallback 5s timer 偏快), L6 也 4-5 分鐘。**剛好一節睡前**。

**但**:沒 MP3 = 我可以靜音玩 (捷運/床邊 friendly), 反而是 plus。**前提**:UI 要明示「這章是純閱讀」, 不能讓我以為「我手機壞了」。

**修法 (P0)**:
- Ch6 進章前加一個 splash「🤫 這集沒有語音 — 用閱讀感受故事」雙語
- 或 lesson scene 內 narration 那個 🔊 喇叭 icon 改成 📖 書 icon (Ch6 only) 暗示「閱讀模式」
- **檔案**:`src/scenes/ChapterIntroScene.ts` + `src/scenes/LessonScene.ts`

---

## 第三部分:P0-P2 issue list

### P0 (30 秒內關 app):2 條

**P0-1: 沒 MP3 但 UI 還顯示 🔊 喇叭 icon — 我以為手機壞了 (5 秒空白困惑)**

- **根本原因**: Ch6 是 zero-MP3 章 (canon spec design), 但 LessonScene narration UI 沿用 Ch1-5 模式顯示 speaker button — A2 user expectation 「點喇叭=有聲」, 沒聲 → 認知失調
- **影響**: L1 q2 我點兩次喇叭沒聲, 拉狀態列確認音量, **這 5-8 秒我不是被故事推著走、是被困惑卡住**。捷運上時間敏感, 我可能直接退出。
- **修法**:
  - Option A (推薦): Ch6 進章前 splash「🤫 這集沒有語音 — 用閱讀感受故事 · No audio this time · let your eyes do the listening」雙語
  - Option B: Ch6 內所有 narration 把 🔊 icon 換成 📖 (`src/scenes/LessonScene.ts` _renderNarration 加 chapter === 6 條件分支)
  - Option C: 修 `chapter6 metadata` 加 `silentMode: true` flag → LessonScene 讀 flag 隱藏 speaker button
- **檔案**: `src/scenes/ChapterIntroScene.ts` (splash) + `src/scenes/LessonScene.ts` (icon swap) + `public/lessons-ch6.json` (metadata flag)

**P0-2: L6 q5 "She ate her own child" 字面太重 — A2 / 敏感 user 可能 T+3s 內關 app**

- **根本原因**: quoted speech = lie 這個概念需要英文閱讀理解力 + emotional bandwidth, A2 + 下班疲憊 user 可能字面誤讀
- **影響**: 媽媽 user / 帶小孩 user / 睡前疲憊 user 看到「吃自己小孩」可能直接關 app, **這是 chapter retention killer**
- **修法**:
  - Option A (推薦): sentence 改 "The next morning, the older woman lied to the king. \"She ate her own child,\" she said." — "lied" 一字緩衝
  - Option B: explanationZh 改成 "**(這是王后編的謊話)** 她告訴國王的話 → 傷害自己孩子" — 顯式 frame
  - Option C (最安全): sentence 改成 "She said something terrible about the bride to the king." + Q "What kind of thing did she say?" → option "a cruel lie" (paraphrase 完全不直接呈現「ate her own child」)
- **檔案**: `public/lessons-ch6.json` kt-ch6-l6-q5

### P1 (1 lesson 後不回來):4 條

**P1-1: ADVANCE_NARRATION_MS 5000ms 太短, A2 讀詩意句來不及**

- **根本原因**: B.160 改 5s 是針對「有 audio 時 onEnd 主導 + fallback」, Ch6 zero-audio 全程 fallback → 5s 對 13-17 字詩意句 (L4 q4 / L4 q11) 不夠
- **修法**: Ch6 (silentMode chapter) ADVANCE_NARRATION_MS 5000 → 8000 或 10000; 或 user setting 「自動推進速度」
- **檔案**: `src/scenes/LessonScene.ts` ADVANCE_NARRATION_MS const + silentMode check

**P1-2: 詩意比喻句 explanationZh 只翻譯沒解釋 — A2 不知道為什麼這樣寫**

- **根本原因**: "her hands grew cold" / "no word would leave her lips" / "the nights grew long" 三個慣用比喻, A2 直譯不通
- **修法**: explanationZh 加「為什麼這樣寫」一句。例:"她的手變得冰冷 — 是『因為害怕』身體的反應, 不是氣溫變冷"
- **檔案**: `public/lessons-ch6.json` 跨多 Q (L3 q10 / L4 q9 / L4 q11)

**P1-3: L7 q5 narration 與 Q 答案完全 mirror — 違反 give-away R8**

- **根本原因**: narration "threw one over each bird" → Q correct option "threw one on each swan" 只換 bird/swan 同義字, A2 都不用思考
- **修法**: Q 改 inference, 例 "What happened the moment the shirts touched the swans?" → option "feathers fell" (paraphrase) 或 "they began to change" (inference)
- **檔案**: `public/lessons-ch6.json` kt-ch6-l7-q5

**P1-4: stat screen 沒接住 narration cliffhanger — 情緒斷崖**

- **根本原因**: L6 narration 推到 90 度 (火堆+缺袖) 然後跳「你拿 XP X / accuracy Y / time Z」 — 從故事高潮跌進統計頁
- **修法**: stat screen 上方加 1 行小字「下一集:正午... 火堆已搭好...」/「Tomorrow: noon · the fire is ready · the truth waits」(雙語)
- **檔案**: `src/scenes/LessonScene.ts` `_showLessonStats` method

### P2 (polish):5 條

**P2-1: L1 q7 emoji-pick "How many children" 與 q2 narration "seven children" 直接 mirror (give-away)** — 這是 emoji-pick 統一模式問題, A2 需要這個正向回饋, 但**建議改成 "How many boys?" + 6** 答案 (考新 information 不重複) — `public/lessons-ch6.json` kt-ch6-l1-q7

**P2-2: L3 q7 emoji-pick "What did the boys turn into?" 與 q2 narration "six swans now rose" 直接 mirror** — 同上, 建議改 "What color were the wings?" + 4 options white/black/grey/gold — `public/lessons-ch6.json` kt-ch6-l3-q7

**P2-3: L6 q9 "a trio" NGSL 3000+ — A2 不認得** — 改 "three" 一字, 但要避免和 narration "Once, twice, and a final time" 直接 mirror, 可改 Q "What number of babies disappeared?" + (one/two/three/four) — `public/lessons-ch6.json` kt-ch6-l6-q9

**P2-4: L7 q9 "should have been" + "grew" 過去完成式 + 多義 — A2 雙重卡** — narration 簡化 "Where his left arm was, soft feathers still grew" 砍 should have been — `public/lessons-ch6.json` kt-ch6-l7-q9

**P2-5: tap-pairs q1 4 個 emoji 🔑 + 4 對中英閃過, A2 第一秒「資訊量大」** — 是 Ch1-5 既有模式, 但 Ch6 因為主題重 (偷/嬰兒/謊言/火), 視覺可以更柔。建議 emoji 🔑 改 🌸 (花) 等柔和符號 (對應 Ch6 motif: feather/flower) — `src/ui/TapPairsUI.ts` (跨章影響, 可選)

---

## 第四部分:Ch6 特性總結

| 維度 | 狀態 | 一句話 |
|------|------|--------|
| Grimm KHM 49 無對話詩意 voice | ✅ 守住 | 7 lessons 全 3rd-person past, 只 L6 q5 一句 quoted speech (謊言本身) |
| A2 對詩意 imagery 耐心 | ⚠️ 中度 | 名詞 imagery (feather/snow/moon) OK, 動詞慣用 (grew cold/sewed and sewed) 卡 |
| B5/B6 vow-of-silence 兩難重量 | ✅✅ 強 | L4 + L6 兩個 mirror moral-dilemma beat, 跨章張力穩 |
| "ate her own child" 句衝擊 | ⚠️ 高風險 | A2 / 敏感 user 可能 T+3s 關 app, 需要 framing 緩衝 |
| 沒 MP3 → silent reading mode | ⚠️ 需 UI 明示 | 設計意圖好 (捷運靜音 friendly) 但 UI 沒告訴 user, 變成 bug 觀感 |
| 6 年沉默 hook 力 | ✅✅ 強 | 對成人 user (尤其職場 silent 共鳴者) 比 Ch1 治癒系更深 |
| 睡前 5 分鐘玩 1 節 fit | ✅ 完美 | 11 Q × 5s fallback ≈ 4-5 分鐘剛好一節 |
| Cliffhanger 跨 lesson | ✅✅✅ 最強章 | L2→L3 / L5→L6 / L6→L7 三段都直接時間切, like 連續劇 |
| Stat screen 情緒接續 | ❌ 斷崖 | narration 高潮 → 統計頁 = 情緒掉地, 需小字 tease |
| 給 5 種 vocab pair 鋪路 | ✅ 守住 | 每 lesson 4 對中英 cover NGSL 800-1500 主要 vocab |

---

## 第五部分:Top 3 ship-blockers (我會排這個順序修)

1. **P0-1 silent-mode UI 明示**:1 行 splash + chapter6 metadata flag, ~30 min。**最快阻止 retention 流失。**
2. **P0-2 L6 q5 "ate her own child" 緩衝句**:lesson JSON 一個 sentence 改, ~5 min。**對敏感 user 是 must-have。**
3. **P1-1 ADVANCE_NARRATION_MS Ch6 only 8000ms**:LessonScene 加 silentMode check, ~15 min。**A2 讀詩意句的喘息空間。**

剩 P1-2 ~ P2-5 可以分批進 backlog, 不卡 ship。

---

## 第六部分:第一人稱結語 — 我覺得

**Ch6 是 Pickup 到目前為止最有「文學感」的一章。**

L4 結尾「她縫了又縫。夜變得好長。她不出聲, 也不哭出來……」我看到這句 — 雖然只是中文 explanationZh — 心裡有一下子安靜。**這個情緒是 Ch1-5 沒有過的。**Ch1 雨夜貓我心疼, Ch3 醜小鴨我感動, 但 Ch6 不一樣 — Ch6 是**靜的, 慢的, 痛的**, 像我自己有過幾次「忍住沒說的話」那種感覺。

**A2 學習效果**:從 vocab 角度, 我認得 80-85% 的 narration 單字, 卡的地方靠中文 explanationZh 救得回來。但**詩意比喻 (grew cold / nights grew long / no word would leave her lips) 是隱藏難點**, 不是「不會」是「會但需要 frame」。

**「下班逃逸」適配度**:**比 Ch1 更適合**。Ch1 是溫和治癒, Ch6 是**沉默+解放**的成人共鳴。我下班坐捷運看完 L4「六年都不行」, 比看貓淋雨更會有「對, 我也撐了很久」的感覺。

**最大風險**:不是內容, 是**沒 MP3 + UI 沒明示** + **L6 q5 那句字面太重**。兩個 P0 修了, Ch6 就是 chapter retention 一個 stand-out。

**最大 surprise**:**L7 q11 結尾那隻沒縫完的翅膀**。"the youngest brother turned to her with one wing still on his back..." — Grimm 原典就有的 detail, 留在 lesson outro。**這個 open-ended ending 比 Ch1 結尾留得住人**, 我會記住「最小弟弟還有一隻翅膀」 — 即使 Ch6 章內已經 truth 說出口, 這個翅膀是 unfinished 的 hook, 引我想下一章。

**ship 建議**:**修 P0-1 + P0-2 + P1-1 三條 (大概 1 小時), Ch6 可以直接上**。詩意 imagery 是這章的特色不是 bug, 不要為了 A2 readability 把詩意拿掉 — 那會變成「Ch1 升級版」失去 Ch6 獨特 voice。

---

*Walkthrough end. 5th-agent A2 player POV, 2026-06-04.*
*Lesson focus: L6 detailed timeline + 7-checklist + 3 Ch6-specific questions.*
*Output: ~470 lines, target 300-500. P0×2 / P1×4 / P2×5 = 11 issues.*
