# Ch2 Walkthrough — 醜小鴨 (2026-06-04)

> 第 5 audit agent (B.225 全新 rewrite 後首次 Ch2 walkthrough).
> A2 程度台灣英文學習者, 成人, 下班通勤捷運手機螢幕, 第一次玩 Pickup Ch2.
> 三軸: 時間軸 (Web Speech rate 估) / Give-away / 第一印象.
>
> ⚠️ Ch2 沒 MP3, 跑 Web Speech 模擬. 時間軸用 rate 0.75 (sentence/options) + 0.85 (question) 估.
> A2 readability: 中文 250 字/分 / 英文 80 字/分.

---

## L1 — 鴨媽媽等待 (大蛋還沒裂)

### 我看到 / 我聽到 / 我覺得

我看到 4 個中英配對:蛋 / 等 / 窩 / 裡面 — 字都認識,但「窩」對應 nest 我要愣一下,因為日常我講「鳥巢」不是「窩」. 4 對拖完大概 8 秒. 然後跳 narration:n1 "In the warm reeds by the pond, mother duck sat on her nest." — 我看見小喇叭 + 米色泡泡, 字一個一個浮現. 我聽到 "reeds" 跟 "pond" 直接糊掉,因為剛才 vocab 沒教 reeds. 我覺得「等等, reeds 是什麼?蘆葦?」愣 1-1.5 秒.

n2 "She had six round eggs to keep safe and warm." — 這句我順. "six round eggs" 我懂. 但 "to keep safe and warm" 結構 (to + V) 對 A2 是邊緣. 我大概懂意思,但說不上來文法.

然後 Q4 listen-tf: "The reeds around her stood very still in the soft sun." → "Was the place busy and loud?" 我看到 Yes / No. 我心想:reeds stood very still + soft sun → 應該是安靜的. 答 No. 對了, 鬆一口氣.

n3 "One sunny morning, five small eggs began to crack open." — OK 順. crack open 我猜出來是「裂開」.

Q6 listen-mc: "Bright yellow babies tumbled out one by one onto the grass." → "What came out of the eggs?" 4 個選項中英並列, 我看到「黃色鴨寶寶 tiny yellow ducklings」, narration 已經講 "Bright yellow babies tumbled out", 答案直接送上門. 我選對, 但**沒有 think effort**.

n4 "But one large egg was bigger than all the others." — 順.

Q8 listen-mc: "That big egg stayed quiet and closed on the soft nest." → "What was different about this egg?" 選項 still closed up 跟 sentence "stayed quiet and closed" 直接 grammar mirror. 又是送分.

n5 "Mother duck sat down again and waited day after day." — 順. "day after day" 句型我學過.

Q10 emoji-pick: "How did mother duck feel?" → 4 emoji 選項. 我看到 😟 worried / 😄 excited / 😴 sleepy / 😡 angry. 一直等大蛋 → 擔心 worried. 自然.

n6 (hook) "Then she felt a small thump from inside the big egg..." — **3 個刪節點**, 我看到「想知道大蛋裡是什麼?」microcopy. 我覺得**想知道下一集**. 鉤子有用.

### 時間軸 (Web Speech rate 0.75/0.85 估)

| t (s) | 看到 | 聽到 | 痛點 |
|-------|------|------|------|
| 0-8 | tap-pairs 4 對 (蛋/等/窩/裡面 ↔ egg/wait/nest/inside) | 安靜 | 「窩」用詞偏老派, A2 學者更熟「鳥巢」|
| 8-13 | Q1 explanationZh 揭曉 | (回顧時不放 TTS) | OK |
| 13-19 | n1 bubble + 🔊 | "In the warm reeds by the pond, mother duck sat on her nest." (13 words × 0.75 ≈ 5.5s + 自動推進 buffer 0.5s) | **reeds NGSL 5000+, vocab list 沒教, 卡 1.5s** |
| 19-25 | n2 bubble | "She had six round eggs to keep safe and warm." (10 words × 0.75 ≈ 4.2s) | "to keep safe and warm" 結構偏 A2/B1 邊緣 |
| 25-32 | Q4 listen-tf sentence + Q | "The reeds around her stood very still in the soft sun." + "Was the place busy and loud?" (10+7 words ≈ 7.2s) | reeds 又出現一次, 仍卡 |
| 32-45 | Q4 思考 + tap Yes/No + reveal | (回應後 PRAISE TTS ~1.5s) | OK (inference 題, 真的要想) |
| 45-50 | n3 bubble | "One sunny morning, five small eggs began to crack open." (11 words ≈ 4.7s) | OK |
| 50-62 | Q6 listen-mc sentence + 4 options bilingual | "Bright yellow babies tumbled out one by one onto the grass." (12 words ≈ 5s) + "What came out of the eggs?" (6 words × 0.85 ≈ 2.4s) | **give-away P0** — narration "yellow babies tumbled out" 直接=答案 |
| 62-70 | Q6 reveal + auto-advance 5s | PRAISE | 太簡單, 失去挑戰 |
| 70-75 | n4 bubble | "But one large egg was bigger than all the others." (11 words ≈ 4.7s) | OK |
| 75-87 | Q8 sentence + question + 4 options | "That big egg stayed quiet and closed on the soft nest." + Q | **give-away P0** — "stayed quiet and closed" = "still closed up" grammar mirror |
| 87-95 | Q8 reveal + advance | | 連續 2 題 give-away, 「咦這也太簡單」 |
| 95-100 | n5 bubble | "Mother duck sat down again and waited day after day." | OK |
| 100-115 | Q10 emoji-pick | "How did mother duck feel?" | OK (情緒題本來就要送一點) |
| 115-122 | n6 hook + microcopy | "Then she felt a small thump from inside the big egg..." | **hook ✓** — 想點下一 lesson |

預估總時間: ~125 秒. A2 budget 300s 內, OK.

### Give-away detection

- **Q6 (kt-ch2-l1-q6) P0**: narration sentence "Bright yellow babies tumbled out one by one" + question "What came out of the eggs?" + 正解 "tiny yellow ducklings". Jaccard 共享 yellow + babies/ducklings + out (≥3). 完全 mirror.
- **Q8 (kt-ch2-l1-q8) P0**: sentence "That big egg stayed quiet and closed" + 正解 "still closed up". Grammar mirror (closed → closed up).
- **連續 give-away**: Q6 + Q8 連兩題送分, 違反挫折節點 R5 (連 ≥ 2 給予感太簡單).

### A2 readability

- **reeds** 出現 2 次 (n1 + Q4 sentence). vocab list 沒收 reeds, NGSL 排名外, A2 學者吃不下. **Q4 inference 因此被 reeds 阻擋**, 不是不會推理, 是看不懂.
- "to keep safe and warm" 不定詞當目的, A2 邊緣文法.

### 第一印象 (0-10s)

開 lesson 前 10 秒看到 tap-pairs grid: 蛋 ↔ egg / 等 ↔ wait / 窩 ↔ nest / 裡面 ↔ inside. **focal point: tap-pairs UI**. 沒有中文先洩底問題 (vocab 教學階段中文是 by design). OK.

### 留存意願

hook microcopy「想知道大蛋裡是什麼?」+ thump 聲音意象 → **B3 資訊缺口 hook 強度 8/10**. 我想點 L2.

### P0 issues

- **kt-ch2-l1-q6**: narration "Bright yellow babies tumbled out" 直接送 "tiny yellow ducklings". 改 sentence: "Five tiny shapes pushed past the broken shells onto the grass." 隱掉 yellow.
- **kt-ch2-l1-q8**: "stayed quiet and closed" 跟 "still closed up" 直接同義. 改 sentence: "The largest one made no sound, soft and round on the nest." 留 quiet/round 暗示, 砍 closed.
- **L1 vocab list 漏教 reeds**: 既然 n1 + Q4 都用, 該收進 tap-pairs (取代 inside, 因為 inside 在 hook 才出現一次).

### P1 polish

- "窩" → 改「鳥巢」, A2 學者更熟.
- Q4 sentence "stood very still in the soft sun" → A2 邊緣, 但 inference 題硬一點 OK, 保留.

---

## L2 — 大蛋裂開 / 灰色鴨寶寶 / 大家盯著看

### 我看到 / 我聽到 / 我覺得

我看到 vocab 4 對:灰 / 大 / 不同 / 盯著看 — grey / large / different / stare. stare 是新字, 但圖示型字 (像 staring eye), 我背得起來.

n1 "At last the great egg began to crack open slowly." — 順. great 我知道, "crack open" L1 學過了, 連起來懂. 我覺得**章節銜接 OK**, 上集 thump 接這集裂開.

n2 "Out came a baby duck — but he was large and grey." — em-dash 中間頓一下, TTS 應該會稍頓. "large and grey" 跟 vocab 對應, 我懂. 看到「灰色」我已經想到「醜小鴨」原型 (台灣讀者都知道這故事), spoiler 自己腦補.

Q4 listen-tf: "The yellow ducklings stopped playing and turned their heads." → "Did the yellow ducklings notice him?" 我看 stopped + turned heads → 注意到了 → Yes. 對. (inference 題, 真要想一下, 不是送分).

n3 "They looked at the new baby for a long, quiet moment." — 順.

Q6 listen-mc: "The new duckling did not look like his brothers and sisters." → "How was the new duckling not the same?" 4 option: smaller / missing feet / a different color / unable to swim. **干擾項都不錯**, 但 narration "did not look like" 加上 "large and grey" + "a different color" — 我看不出明顯 mirror, 但**前面 vocab 已經教了 grey + different**, 答案 a different color 等於兩個 vocab 直接組合. 太順了.

n4 "Mother duck looked at her new son and gave him a name." — 順. 我想「叫什麼名字?」可惜故事沒交代名字, 微微失望.

Q8 listen-mc: "She wanted him to feel welcome in the warm green nest." → "How did mother duck treat him?" 4 option: fear / kindness / anger / silence. sentence "feel welcome" 加 "warm green nest" 暖意, 答 kindness. 沒問題, 但 fear/anger/silence 都明顯不對, **干擾項太弱**, 等於 4 選 1 變 2 選 1 (kindness vs silence).

n5 "But the other ducklings whispered words behind his back." — 順. "behind his back" 我學過但常聽不清, TTS rate 0.75 我聽得到.

Q10 emoji-pick: "How did the other ducklings act toward him?" → 🤝 friendly / 👀 staring / 🎉 happy / 🤗 hugging. **此題 P0 give-away** — vocab 剛教 stare = 盯著看, 且 narration 前一句"whispered words behind his back" 已經明顯負面, 4 個選項只有 staring 跟 vocab 對應. 等於 vocab 直接送答.

n6 (hook) "Nobody made a sound. They just stared at the large grey baby..." — hook microcopy「他是醜?還是只是不一樣?」. **強 hook ✓**. 我想往下.

### 時間軸 (Web Speech rate 估)

| t (s) | 看到 | 聽到 | 痛點 |
|-------|------|------|------|
| 0-8 | tap-pairs (灰/大/不同/盯著看) | 安靜 | OK |
| 8-14 | n1 | "At last the great egg began to crack open slowly." (11 words ≈ 4.7s) | OK |
| 14-20 | n2 | "Out came a baby duck — but he was large and grey." (12 words ≈ 5s) | em-dash TTS 可能不停頓, 句意斷裂 |
| 20-33 | Q4 listen-tf | "The yellow ducklings stopped playing and turned their heads." + "Did the yellow ducklings notice him?" | inference 題 OK |
| 33-39 | n3 | "They looked at the new baby for a long, quiet moment." (12 words ≈ 5s) | OK |
| 39-55 | Q6 listen-mc | sentence + 4 options bilingual | **vocab give-away** (grey+different 已教) |
| 55-60 | n4 | "Mother duck looked at her new son and gave him a name." (12 words ≈ 5s) | OK |
| 60-75 | Q8 listen-mc | | **干擾項弱**, 但非 give-away |
| 75-80 | n5 | "But the other ducklings whispered words behind his back." (10 words ≈ 4.2s) | "behind his back" idiom 可能漏聽 |
| 80-92 | Q10 emoji-pick | "How did the other ducklings act toward him?" | **vocab give-away P0** (stare 剛教) |
| 92-100 | n6 hook | "Nobody made a sound. They just stared at the large grey baby..." | hook ✓ |

預估: ~100s.

### Give-away detection

- **Q10 (kt-ch2-l2-q10) P0**: vocab list 教 stare → 盯著看, Q10 正解 "👀 staring". 識別洩答 (Identity).
- **Q6 (kt-ch2-l2-q6) P1**: vocab 教 grey + different, Q6 正解 "a different color" 是兩 vocab 直接組合. 不算嚴格洩答 (sentence 沒重複 yellow/grey), 但 vocab→Q 路徑太短.
- **Q8 弱干擾項**: fear / anger / silence 對 "feel welcome in the warm green nest" 都明顯不合, 沒 challenge.

### A2 readability

- "behind his back" idiom — A2 學者口語可能沒接觸過. 不算洩答但聽 TTS 可能漏字.
- em-dash "Out came a baby duck — but..." TTS 處理不確定, 句意可能糊在一起.

### 第一印象 (0-10s)

vocab list 教 stare → 盯著看 + grey + large + different. **第 10 秒我已經知道這 lesson 主題會圍繞「看 / 不同」**. 不算 spoiler — 是 vocab teaching 的正當功能. OK.

### 留存意願

「他是醜?還是只是不一樣?」microcopy + "Nobody made a sound" 寂靜緊張感 → **B2 情緒翻轉 hook 強度 8/10**. 想點 L3.

### P0 issues

- **kt-ch2-l2-q10**: vocab 直送 stare. 改 vocab list 替掉 stare (用 hatch / shell / round 之類前段相關字, stare 留到題目自己學), 或改 Q10 emoji options:
  - 改: 🙄 looked away / 👀 staring / 🤝 friendly / 🎉 happy — 增加 looked away 當 stronger 干擾 (從 narration 找根據).
  - 或更直接: vocab list 砍 stare, 改收 sister / brother (跟章節主題更貼).

### P1 polish

- Q8 干擾項弱, fear → "curiosity"? anger → "shame"? 讓 4 option 都帶情緒方向, 不要 3 個明顯不對.
- "Mother duck...gave him a name" 但 narration 從未交代是什麼名. 提案: n4 sentence 改 "She named him by the soft pond where he was born." 暗示無名 OK 但故事感更完整, 或乾脆給名字 (傳統醜小鴨原作就沒名字, 保留也 OK).

---

## L3 — 農場 / 被啄被追 / 媽媽轉頭

### 我看到 / 我聽到 / 我覺得

vocab: 農場 / 母雞 / 啄 / 追 — farmyard / hen / peck / chase. **farmyard 對 A2 偏難** (compound noun, NGSL 排在 farm 後面很多). peck + chase 是行動動詞, 圖像強, 我背得起來.

n1 "Soon the family walked to the farmyard for the first time." — 順.

n2 "There were big hens, loud ducks, and an angry old goose." — **三項列舉**, A2 用 list 文法 OK. "goose" 是新字! vocab list 沒收, 但 angry old 給了情緒線索.

Q4 listen-tf: "All the animals turned their eyes to the large grey baby." → "Did the animals welcome him kindly?" → No. inference 題. **但 turned their eyes 已經暗示負面**, 太明顯了, inference 強度低.

n3 "A red hen ran up and pecked him hard on the wing." — vocab 教過 peck + hen, 直接看懂. wing 是新字 (NGSL 1500+) 但圖像強.

Q6 listen-mc: "Sharp beaks came at him from every side of the yard." → "What did the farmyard animals do?" 4 option: played / **attacked him** / gave food / sang. sentence "Sharp beaks came at him" → attacked. **P0 give-away** — Sharp beaks coming = attack 同義詞, A2 學者直接 map. 加上前一 narration 已經 "pecked him hard". 雙重洩底.

n4 "At first, mother duck stood between him and the hens." — 順.

Q8 listen-mc: "She tried to keep her grey son safe from the others." → "What did mother duck do at first?" 4 option: ran / helped hens / **protected him** / fell asleep. sentence "keep safe" = "protected". **P0 give-away** — grammar mirror.

n5 "But then she heard the other animals laugh out loud." — 順, 但 "laugh out loud" 在 narration 是負面 (嘲笑), 跟英文 LOL 縮寫常用的「好好笑」感衝突, A2 學者可能 mood mismatch.

Q10 emoji-pick: "How did the grey duckling feel now?" → 😭 alone / 😄 happy / 😴 sleepy / 🎉 proud. 邏輯上選 alone, OK. 但 happy/sleepy/proud 對應 "pecked + chased + laughed" 都明顯不對, 4 選 1 = 2 選 1.

n6 (hook) "Then she turned her head, and did not say a word..." — hook microcopy「媽媽會回來保護他嗎?」. **這 hook 力道很強** — 媽媽轉頭是這故事最痛的點. **B2 情緒翻轉 9/10**.

### 時間軸

| t (s) | 看到 | 聽到 | 痛點 |
|-------|------|------|------|
| 0-8 | tap-pairs (農場/母雞/啄/追) | 安靜 | farmyard A2 邊緣 |
| 8-13 | n1 | "Soon the family walked to the farmyard for the first time." (11 words ≈ 4.7s) | OK |
| 13-19 | n2 | "There were big hens, loud ducks, and an angry old goose." (12 words ≈ 5s) | goose 沒教 |
| 19-32 | Q4 | "All the animals turned their eyes to the large grey baby." + Q | inference 弱 |
| 32-38 | n3 | "A red hen ran up and pecked him hard on the wing." (12 words ≈ 5s) | wing 沒教 |
| 38-52 | Q6 | sentence + Q + 4 options | **P0 give-away** |
| 52-57 | n4 | "At first, mother duck stood between him and the hens." (11 words ≈ 4.7s) | OK |
| 57-72 | Q8 | | **P0 give-away** (grammar mirror) |
| 72-77 | n5 | "But then she heard the other animals laugh out loud." (11 words ≈ 4.7s) | LOL idiom 衝突 |
| 77-90 | Q10 emoji | | 弱干擾項 |
| 90-97 | n6 hook | "Then she turned her head, and did not say a word..." (12 words ≈ 5s) | **強 hook ✓** |

預估: ~100s.

### Give-away detection

- **Q6 (kt-ch2-l3-q6) P0**: "Sharp beaks came at him" + "pecked him hard" (n3) → "attacked him". 連續 2 句 narration 都帶 attack 同義. 雙重洩底.
- **Q8 (kt-ch2-l3-q8) P0**: "She tried to keep her grey son safe" → "protected him". keep safe = protect 直譯.
- **L3 連續 give-away (Q6 + Q8 連兩題)** = 違反 R5 挫折節點.
- Q4 inference 強度低 ("turned their eyes" 是 stare 的同義, 已暗示).

### A2 readability

- **farmyard / hen / peck / chase** 是 lesson core, vocab 教過 OK.
- **goose / wing** 沒教但出現. A2 學者吃不下 goose.
- "laugh out loud" 字面 vs idiom 衝突可能讓玩家分神.

### 第一印象

vocab 4 字 = 「農場 + 動物 + 攻擊」三明治. **第 10 秒就猜到這 lesson 是農場霸凌**. 不算 spoiler — vocab teaching 的正當功能.

### 留存意願

「媽媽會回來保護他嗎?」是全 Ch2 最痛的 hook. **B2 大翻轉 9/10**. 強烈想往下.

### P0 issues

- **kt-ch2-l3-q6**: sentence 改 "From every side of the yard, sharp beaks came toward him fast." 留懸念但減 attack 字根. 正解改 "moved against him" (paraphrase) 或保留 "attacked" 但 narration 砍 "pecked him hard" 字眼.
- **kt-ch2-l3-q8**: sentence 改 "She stepped close so the hens could not reach her grey son." 砍 "keep safe" 直譯, 用 stepped close / could not reach 暗示保護. 正解 "protected him" 變需要推理.

### P1 polish

- vocab list 加 goose 或 wing 取代 farmyard (farmyard 雖是 chapter beat 但 A2 邊緣).
- n5 "laugh out loud" → "laughed loudly" (避 LOL idiom 衝突).

---

## L4 — 逃跑 / 野鴨朋友 / 槍聲

### 我看到 / 我聽到 / 我覺得

vocab: 跑 / 野生 / 朋友 / 倒下 — run / wild / friend / fall. **A2 友善**, 4 字都 NGSL 500 內.

n1 "That night, he climbed over the fence and left the farmyard." — 順. fence 沒教但好猜.

n2 "He walked across cold fields all the way to a quiet marsh." — **marsh 是新字** (NGSL 3000+), 我不知道是什麼. 但 "cold fields" 給了氛圍. 我覺得「marsh 算了, 大概是某種濕地之類」. 卡 1 秒.

Q4 listen-tf: "His small feet ached after many hours on the rough ground." → "Was his journey short and easy?" → No. **ached / rough ground** 字偏, A2 學者可能漏聽. 但 inference 邏輯清楚: 痛 + 很多小時 = 不短. 卡聽不卡推理.

n3 "Two wild ducks let him rest beside them in the tall grass." — vocab 教 wild, 直接看懂.

Q6 listen-mc: "One of them shared his food and stayed close all day." → "What did one wild duck become to him?" 4 option: teacher / **friend** / enemy / brother. **P0 give-away** — vocab 剛教 friend = 朋友, narration "shared food + stayed close" 直接 → friend. 識別洩答.

n4 "For one bright day, he did not feel so alone anymore." — 順. "for one bright day" 結構 (時間副詞前置) A2 邊緣.

Q8 listen-mc: "The warm sun made his grey feathers feel almost soft." → "How did he feel that day?" 4 option: scared / tired / **a little better** / angry. **干擾項 OK** — narration n4 + n3 + Q6 都正面, 4 option 中 scared/tired/angry 都負面, better 是合理推論. 但「a little better」是英文很 vague 的表達, 中文「好一點」順, 英文 A2 學者要練習這種 vague.

n5 "But then loud cracks came from the trees by the water." — **cracks 是關鍵 ambiguous 字**! A2 學者第一反應 "crack open" (L1 學過,「裂開」), 不會想到「爆裂聲 / 槍聲」. **故意設計 ambiguity**, 為 Q10 留懸念. 我覺得「咦?樹叢裂開?還是?」.

Q10 emoji-pick: "What was the loud sound?" → 🔫 gunshots / 🌧️ rain / 🐦 birds / 🎵 music. **這題不錯** — narration "loud cracks from the trees" 不是直接給答案, 玩家要從 "loud cracks" + "by the water" + 故事氣氛 (剛剛還很平靜然後突然 But)推 gunshots. **inference 真實**.

n6 (hook) "His friend dropped to the ground. He ran with his heart pounding..." — **動作戲級 hook**, 朋友倒下沒寫死. microcopy「他會被打中?還能逃多遠?」. **B1 物理懸念 9/10**.

### 時間軸

| t (s) | 看到 | 聽到 | 痛點 |
|-------|------|------|------|
| 0-8 | tap-pairs (跑/野生/朋友/倒下) | 安靜 | A2 友善 |
| 8-14 | n1 | "That night, he climbed over the fence and left the farmyard." (12 words ≈ 5s) | OK |
| 14-20 | n2 | "He walked across cold fields all the way to a quiet marsh." (13 words ≈ 5.4s) | **marsh A2 不懂** |
| 20-35 | Q4 listen-tf | sentence + Q | ached/rough 字偏但邏輯 OK |
| 35-41 | n3 | "Two wild ducks let him rest beside them in the tall grass." (13 words ≈ 5.4s) | OK |
| 41-57 | Q6 listen-mc | | **P0 give-away** (vocab→friend) |
| 57-63 | n4 | "For one bright day, he did not feel so alone anymore." (12 words ≈ 5s) | "for one bright day" 結構 |
| 63-78 | Q8 listen-mc | | OK |
| 78-84 | n5 | "But then loud cracks came from the trees by the water." (12 words ≈ 5s) | cracks ambiguous (design intent) |
| 84-95 | Q10 emoji-pick | | **inference 強, 不洩答** |
| 95-103 | n6 hook | "His friend dropped to the ground. He ran with his heart pounding..." (13 words ≈ 5.4s) | **強 hook ✓** |

預估: ~103s.

### Give-away detection

- **Q6 (kt-ch2-l4-q6) P0**: vocab 教 friend = 朋友, Q6 正解 "a friend". Identity 洩答.
- Q10 反而是 Ch2 目前最好的設計 — vocab list 沒收 gunshot, sentence 用 ambiguous "cracks" 模糊化, 4 emoji 提供 visual scaffolding. **保留 / template-ize**.

### A2 readability

- **marsh** (NGSL 3000+) 出現 1 次 n2, vocab 沒教. 可改 "wetland" 仍偏, 或改 "pond" 簡單字.
- **ached / rough** Q4 sentence 字偏, 但 Q 是 inference 不直問字義, OK.
- "feathers" Q8 sentence 也沒教, A2 邊緣.

### 第一印象

vocab list 「跑 / 野生 / 朋友 / 倒下」 — 第 10 秒我已經知道 lesson 是「逃 → 朋友 → 朋友倒下」. **vocab list 直接劇透 lesson arc**. 嚴重 ⚠️ — fall 是故事最痛的轉折之一, vocab 提前教等於 spoiler.

### 留存意願

「他會被打中?還能逃多遠?」+ "heart pounding" 物理感. **B1 物理懸念 9/10**. 想往下.

### P0 issues

- **kt-ch2-l4-q6**: vocab list 教 friend → Q 直問 friend. 解法:
  - A) vocab list 砍 friend, 改 share / rest / quiet (跟 n3 主題接近).
  - B) Q6 正解改 "a kind stranger" 或 "a quiet helper" — 還是 friend 概念但不重複字.
- **kt-ch2-l4 vocab list 包含 "fall"** — fall 在 n6 hook 出現 "His friend dropped to the ground", drop 跟 fall 同義. **fall 等於提前劇透**朋友倒下. 改 vocab list: 拿掉 fall, 加 grass / field / sky 之類氛圍字, 保留 hook impact.

### P1 polish

- **marsh → pond** 或 vocab list 加 marsh.
- n4 "For one bright day" → "For a while" 結構更 A2.

---

## L5 — 小屋 / 貓和母雞嘲笑 / 走入冷夜

### 我看到 / 我聽到 / 我覺得

vocab: 小屋 / 貓 / 冷 / 離開 — cottage / cat / cold / leave. **A2 友善**, cottage 中等 (NGSL 2500) 但故事體裁常見.

n1 "After many days, he found a small cottage in the woods." — 順. woods 沒教但好猜.

n2 "An old woman lived there with her cat and her hen." — 順. hen L3 學過.

Q4 listen-tf: "The cottage door creaked open when he gave it a soft push." → "Was the door locked tight?" → No. **creaked / soft push** 是 inference 線索. 不錯, 真要想.

n3 "The old woman kept him in her warm kitchen for many weeks." — 順.

Q6 listen-mc: "The cat sat on his back and curled his sharp claws in fur." → "How did the cat treat him?" 4 option: cleaned / played gently / **pressed claws on him** / sang. sentence "curled his sharp claws" → "pressed claws on him". **grammar mirror P0** — sharp claws + curled = pressed claws. 直接 paraphrase.

n4 "The hen counted her eggs each day and shook her head." — 順. "shook her head" idiom A2 可能不懂 (是不認同的意思).

Q8 listen-mc: "She told him he was useless because he laid no eggs." → "Why did the hen mock him?" 4 option: noisy / **never gave any eggs** / running / sleeping. sentence "laid no eggs" → "never gave any eggs". **grammar mirror P0** — laid no = never gave any 同義.
另外 **useless 是 A2 邊緣字**, 故事體可以.

n5 "The cat asked him if he could purr by the warm fire." — 順. purr 沒教但圖像強 (貓咕嚕). "asked him if he could" 間接問句 A2 邊緣.

Q10 emoji-pick: "What is outside the cottage door?" → ❄️ cold night / ☀️ warm sun / 🌸 spring garden / 🏖️ beach. **這題 vocab→option give-away** — vocab 教 cold = 冷, 正解 cold night. 加上 narration 沒給戶外場景線索, 玩家完全靠 vocab 推. **P0**.

n6 (hook) "\"What good are you?\" they asked. He pushed open the door and walked into the cold..." — direct speech 第一次出現. microcopy「他要去哪?外面更冷」. **B5 道德兩難 8/10**.

### 時間軸

| t (s) | 看到 | 聽到 | 痛點 |
|-------|------|------|------|
| 0-8 | tap-pairs (小屋/貓/冷/離開) | 安靜 | OK |
| 8-14 | n1 | "After many days, he found a small cottage in the woods." (11 words ≈ 4.7s) | OK |
| 14-20 | n2 | "An old woman lived there with her cat and her hen." (11 words ≈ 4.7s) | OK |
| 20-35 | Q4 | "The cottage door creaked open when he gave it a soft push." | inference OK |
| 35-41 | n3 | "The old woman kept him in her warm kitchen for many weeks." (12 words ≈ 5s) | OK |
| 41-56 | Q6 | sentence + Q + options | **P0 give-away (grammar mirror)** |
| 56-62 | n4 | "The hen counted her eggs each day and shook her head." (12 words ≈ 5s) | "shook head" idiom |
| 62-77 | Q8 | | **P0 give-away (grammar mirror)** |
| 77-83 | n5 | "The cat asked him if he could purr by the warm fire." (13 words ≈ 5.4s) | purr 沒教, indirect Q 邊緣 |
| 83-95 | Q10 emoji | | **P0 give-away (vocab→option)** |
| 95-104 | n6 hook | direct speech + walked into cold | **強 hook ✓** |

預估: ~104s.

### Give-away detection

- **Q6 (kt-ch2-l5-q6) P0**: "curled his sharp claws in fur" = "pressed claws on him". Grammar mirror.
- **Q8 (kt-ch2-l5-q8) P0**: "laid no eggs" = "never gave any eggs". Grammar mirror (laid → gave 同義).
- **Q10 (kt-ch2-l5-q10) P0**: vocab → option direct (cold = cold night). Identity 洩答.
- **連續 give-away Q6+Q8+Q10 = L5 是 give-away 最重災區**. 違反 R5 (3 連送分 = 玩家覺得 lesson 沒挑戰).

### A2 readability

- **useless** (NGSL 2000+ 邊緣) 故事體 OK.
- **purr** 沒教但圖像強, 沒問題.
- **shook her head** idiom 非字面, A2 易誤解.
- "asked him if he could purr" 間接問句, A2 邊緣.

### 第一印象

vocab list 直接拼出 lesson 結局:小屋 → 冷 → 離開. **vocab spoiler 嚴重**. cold 跟 leave 兩字直接告訴玩家「會離開到冷地方」.

### 留存意願

direct speech 「What good are you?」是 L5 最有戲的一句, 把嘲笑明示出來. microcopy「他要去哪?外面更冷」B5 道德兩難 8/10.

### P0 issues

- **kt-ch2-l5-q6**: sentence 改 "The cat sat heavy on his back and dug into his soft feathers." 砍 "sharp claws / curled" 字眼, 改用 "heavy / dug into" 留壓迫感. 正解 "pressed claws on him" 變需要從 dug 推.
- **kt-ch2-l5-q8**: sentence 改 "She told him no one needed a duck who could not lay anything." 砍 "laid no eggs" 直譯, 改 "could not lay anything" + "no one needed". 正解 "never gave any eggs" 變需要從 "could not lay" 推, 但 mirror 仍弱.
- **kt-ch2-l5-q10**: vocab list 砍 cold (改 fire / kitchen / claws). 或 Q10 改成 inference 題 "Why did he walk into the cold?" → kind:可能 better suffer cold than mockery (回到 hook).

### P1 polish

- vocab list 4 字目前是「劇透列表」(cottage→cat→cold→leave 就是 L5 arc). 重排:cottage / hen / claw / cold (留 1 個劇透字).
- n4 "shook her head" → 改 "shook her head no" 或 "frowned at him", 防 idiom 誤解.

---

## L6 — 冬天 / 白鳥南飛 / 困在冰中 / 農夫救起

### 我看到 / 我聽到 / 我覺得

vocab: 冬天 / 冰 / 白色 / 農夫 — winter / ice / white / farmer. **A2 友善** (winter/ice/white 都 NGSL 500 內, farmer 1000).

n1 "In the autumn sky, he saw great white birds flying high." — 順. **autumn 沒教** (NGSL 1500), A2 學者可能愣一下. great white birds 直接看懂.

n2 "Their long necks stretched south as they crossed the clouds." — **necks / stretched / south 三個邊緣字**. A2 學者大概懂 necks (因為前面有 birds), stretched 跟 south 比較難. 我卡 1.5 秒.

Q4 listen-tf: "He watched them until his neck grew sore from looking up." → "Did he look at the white birds for a long time?" → Yes. **sore 沒教** (NGSL 3000+) 但 "watched until neck grew sore looking up" 字面意義給足. 卡聽不卡推理.

n3 "Soon snow fell, and the pond turned into hard, shining glass." — 隱喻冰 = 玻璃. **A2 學者懂這比喻嗎?** 我覺得 OK, 因為 vocab 教 ice 了, 玩家可以 connect snow + glass + ice.

Q6 listen-mc: "His small feet became stuck in the cold, frozen water." → "What happened to him in the pond?" 4 option: flew safely / **got trapped in ice** / found food / met friend. sentence "stuck in the cold, frozen water" → "got trapped in ice". vocab 教 ice. **P0 give-away** — frozen water = ice + stuck = trapped 雙重 mirror.

n4 "A farmer came across the field and broke the ice apart." — vocab 教 farmer. 順.

Q8 listen-mc: "He carried the shaking grey bird back to his small home." → "What did the farmer do?" 4 option: cooked / sold / **took him home** / left. sentence "carried...back to his small home" = "took him home". **grammar mirror P0** — direct paraphrase.

n5 "The farmer's small children came running to see the new bird." — 順.

Q10 emoji-pick: "How did the duckling feel about the loud children?" → 😨 scared / 😄 happy / 😴 sleepy / 😋 hungry. **adjective "loud" 在 question 已經劇透情緒方向** (loud → 應該是 scared/不舒服). 加上 4 option 中 happy/sleepy/hungry 都明顯不合. 弱挑戰.

n6 (hook) "He flapped his wings and ran out into the deep, white snow again..." — microcopy「春天會更好?還是又一次?」. **B6 預言種子 7/10** — 比前面 hook 弱一點, 因為「跑進雪裡」是循環式不是新方向, 玩家感「又跑?」.

### 時間軸

| t (s) | 看到 | 聽到 | 痛點 |
|-------|------|------|------|
| 0-8 | tap-pairs (冬天/冰/白色/農夫) | 安靜 | OK |
| 8-14 | n1 | "In the autumn sky, he saw great white birds flying high." (12 words ≈ 5s) | autumn 沒教 |
| 14-20 | n2 | "Their long necks stretched south as they crossed the clouds." (11 words ≈ 4.7s) | necks/stretched/south 三邊緣字 |
| 20-35 | Q4 | "He watched them until his neck grew sore from looking up." | sore 不懂但 inference OK |
| 35-41 | n3 | "Soon snow fell, and the pond turned into hard, shining glass." (12 words ≈ 5s) | 玻璃比喻 OK |
| 41-56 | Q6 | sentence + Q + 4 options | **P0 give-away (frozen=ice, stuck=trapped)** |
| 56-62 | n4 | "A farmer came across the field and broke the ice apart." (12 words ≈ 5s) | OK |
| 62-77 | Q8 | | **P0 give-away (grammar mirror)** |
| 77-83 | n5 | "The farmer's small children came running to see the new bird." (12 words ≈ 5s) | OK |
| 83-95 | Q10 emoji | "How did the duckling feel about the loud children?" | "loud" 已劇透 |
| 95-104 | n6 hook | | hook 7/10 (循環感) |

預估: ~104s.

### Give-away detection

- **Q6 (kt-ch2-l6-q6) P0**: "stuck in cold, frozen water" → "trapped in ice". 兩 vocab (frozen→ice + stuck→trapped) 直接 paraphrase. Grammar mirror.
- **Q8 (kt-ch2-l6-q8) P0**: "carried...back to his small home" → "took him home". Direct paraphrase. Grammar mirror.
- **連續 give-away Q6+Q8** = 違反 R5.
- Q10 干擾項弱 + question 用 "loud children" 已暗示負面情緒方向.

### A2 readability

- **autumn / necks / stretched / south / sore** 5 個邊緣字塞在 n1-Q4. **L6 是 Ch2 readability 壓力最大的 lesson**.
- "turned into hard, shining glass" 比喻 OK 因為 ice vocab 在.

### 第一印象

vocab list:冬天 / 冰 / 白色 / 農夫. **第 10 秒我看到 farmer 想:「又一個農場?」** — 跟 L3 farmyard 撞概念. 但 narrative arc 是農夫 = 救主 (vs L3 hen = 敵), 等玩到才知道反轉. 開頭可能誤導但 OK.

### 留存意願

「春天會更好?還是又一次?」+ "ran out into the deep, white snow again" — **again** 是關鍵字, 暗示循環. 玩家感「會不會繼續慘?」. B6 預言種子 7/10.

### P0 issues

- **kt-ch2-l6-q6**: sentence 改 "His feet would not move, and the water around him had grown hard." 砍 stuck/frozen 直譯, 改 "would not move" + "grown hard" 留 inference. 正解 "got trapped in ice" 變要組合 (feet won't move + water hard → 被冰困住).
- **kt-ch2-l6-q8**: sentence 改 "He lifted the shaking bird and walked back toward his cottage." 砍 "carried...to his home" → "lifted + walked back toward cottage". 正解 "took him home" 變要 infer.
- **L6 vocab list 加 autumn** (取代 white, 因 white birds 後面才出現也 OK), 解 n1 readability 壓力.

### P1 polish

- Q10 question 改 "How did he feel when the children ran to him?" 砍 "loud" 暗示, 留 children running 中性場景. 正解 scared 變需要從前文 "shaking grey bird + 從未跟人類熟" 推.
- "stretched south" → "flew south" (drop stretched 解 readability).

---

## L7 — 春天 / 倒影 / 天鵝 / 美麗 ✨ CLIMAX

### 我看到 / 我聽到 / 我覺得

vocab: 春天 / 倒影 / 天鵝 / 美麗 — spring / reflection / swan / beautiful. **L7 vocab 是全 Ch2 最劇透的** — 4 個字直接拼出結局. 但這是 climax lesson, 玩家已經知道醜小鴨變天鵝這故事, 不算意外. 反而 vocab 收齊 reveal 關鍵字, 讓 reveal 那刻有滿足感.

n1 "Spring came at last, and the cold ice melted away." — 順. "at last" 結構 A2 邊緣.

n2 "Green leaves opened, and warm sun shone over the pond." — 順. shone 過去式 A2 邊緣.

Q4 listen-tf: "Soft new flowers grew along the edge of the quiet water." → "Is it still cold winter now?" → No. **inference 清楚** — flowers + soft + new = 春天, 不是 winter. 邏輯題 OK.

n3 "He saw the same white birds gliding across the pond." — **gliding** 沒教 (NGSL 3000+). 但 "white birds + pond" 強 callback to L6 那群南飛白鳥, 玩家有 connection 感.

Q6 listen-mc: "He wanted very much to be near them, even if they would chase him." → "How did he feel toward the white birds?" 4 option: afraid only / **pulled to them** / angry / tired. **干擾項不錯** — "wanted very much to be near + even if chase" 是矛盾情緒, "pulled to them" 是正確 paraphrase. afraid only 強排 (因為 even if chase 顯示他願意冒險), angry/tired 不合. **真 inference 題**.

n4 "He lowered his head to the water, ready to give up." — **這句重了** — "ready to give up" 暗示自殺 (canon 原作確實是想淹死自己). A2 學者懂 give up 但可能不懂這層深度. 故事感強.

Q8 listen-mc: "But the still pond showed him a face he did not know." → "What did he see in the water?" 4 option: grey baby / **one bird with a long neck** / fish / shadow. sentence "a face he did not know" → 不是他原本的灰寶寶臉. **inference 題, 不洩答** — narration 沒講「天鵝 / 長脖子」, 4 option 要從 vocab 教的 reflection + swan 推. **此題設計很好**.

n5 "A long white neck and bright wings looked back at him." — **reveal moment**. 玩家看完 Q8 才見此 narration, narration 才證實長脖子 = 天鵝. **節奏 OK**.

Q10 emoji-pick: "What is he now?" → 🦢 swan / 🐥 chick / 🐔 hen / 🦆 duck. **vocab→option 直接 give-away** — 但**這是 climax 該送分的時刻**. 答對 = reveal 高潮. 不算 P0, design intent OK.

n6 (ending hook) "Children by the pond called him the most beautiful of all. He had been a swan all along..." — **chapter end**, microcopy 大概沒 inquiry 因為已 reveal. 但「he had been a swan all along」是經典 reveal 句, 給 closure.

### 時間軸

| t (s) | 看到 | 聽到 | 痛點 |
|-------|------|------|------|
| 0-8 | tap-pairs (春天/倒影/天鵝/美麗) | 安靜 | **reveal spoiler vocab, design intent OK** |
| 8-14 | n1 | "Spring came at last, and the cold ice melted away." (11 words ≈ 4.7s) | "at last" 邊緣 |
| 14-20 | n2 | "Green leaves opened, and warm sun shone over the pond." (11 words ≈ 4.7s) | shone 邊緣 |
| 20-35 | Q4 | sentence + Q | inference OK |
| 35-41 | n3 | "He saw the same white birds gliding across the pond." (11 words ≈ 4.7s) | gliding 邊緣 |
| 41-56 | Q6 | sentence + Q + 4 options | **真 inference, design 好** |
| 56-62 | n4 | "He lowered his head to the water, ready to give up." (12 words ≈ 5s) | "give up" 深度 |
| 62-77 | Q8 | | **inference 不洩答, 好設計** |
| 77-83 | n5 | "A long white neck and bright wings looked back at him." (12 words ≈ 5s) | reveal moment |
| 83-95 | Q10 emoji | "What is he now?" | **climax 送分 OK** |
| 95-103 | n6 ending | "Children by the pond called him the most beautiful of all. He had been a swan all along..." (18 words ≈ 7.5s) | **滿足結尾** |

預估: ~103s.

### Give-away detection

- **Q6 (kt-ch2-l7-q6)**: inference 強, 不洩答. ⭐ template.
- **Q8 (kt-ch2-l7-q8)**: inference 強, 不洩答. ⭐ template.
- **Q10 (kt-ch2-l7-q10)**: vocab → option 但 climax design intent 允許.

### A2 readability

- **gliding / shone / at last** 3 個邊緣字. 故事體 OK 但 readability 壓力中等.

### 第一印象

vocab list 直接 reveal: 春天 / 倒影 / 天鵝 / 美麗. **完全 spoiler**, 但 climax lesson 玩家本來就在等這 reveal. **不視為 P0**.

### 留存意願

Q11 hook ending 是 ch-end 不需 inquiry. "He had been a swan all along" 完整 closure. 但 Ch3 teaser 是否在 ChapterEndScene? **需查 ChapterEndScene 設計** — 如果有 Mochi/Hana 回到奶奶院子 + 奶奶翻書到下個故事的 teaser, 留存意願強 9/10; 沒有就 6/10.

### P0 issues

- 無 P0. L7 是 Ch2 設計最好的 lesson (Q6 + Q8 都 inference 強).

### P1 polish

- "gliding" → "swimming" (A2 友善), 失去詩意但解讀流暢.
- "ready to give up" 可加 explanationZh 多一句解釋這是想結束生命的隱喻, 給有想深入的玩家 layer.

---

## 全章總結

### 連續 give-away 分布

| Lesson | give-away P0 題數 | 連續位置 |
|--------|------------------|---------|
| L1 | 2 (Q6, Q8) | **Q6→Q8 連兩題 (痛點)** |
| L2 | 1 (Q10) | 分散 |
| L3 | 2 (Q6, Q8) | **Q6→Q8 連兩題 (痛點)** |
| L4 | 1 (Q6) | 分散; Q10 是 design template ⭐ |
| L5 | 3 (Q6, Q8, Q10) | **Q6→Q8→Q10 連三題 (最重災)** |
| L6 | 2 (Q6, Q8) | **Q6→Q8 連兩題 (痛點)** |
| L7 | 0 P0 | Q10 design intent ⭐⭐ |

**總計 11 P0 give-away across 7 lessons (~84 Q)**. 比率 13% 偏高, 但比 v1.x Ch1 老版本 (報告手抓 ~30%) 已大幅改善. 主要痛點是 **Q6 + Q8 兩個 listen-mc 在每個 lesson 結構性 grammar mirror** — 不是內容問題, 是**題型 template 設計問題**.

### 留存峰谷 (hook 強度)

| Lesson | Hook 類型 | 強度 | 描述 |
|--------|-----------|------|------|
| L1 | B3 資訊缺口 | 8/10 | "thump from inside the big egg..." |
| L2 | B2 情緒翻轉 | 8/10 | "Nobody made a sound. They just stared..." |
| L3 | B2 大翻轉 | **9/10** ⭐ | 「媽媽轉頭」全章最痛 hook |
| L4 | B1 物理懸念 | **9/10** ⭐ | "His friend dropped. heart pounding..." |
| L5 | B5 道德兩難 | 8/10 | "What good are you? walked into cold" |
| L6 | B6 預言種子 | 7/10 | "again" 循環感稍弱 |
| L7 | (resolved) | climax | "He had been a swan all along" |

**留存峰谷**: L3-L4 是雙高峰 (媽媽轉頭 + 朋友倒下), L6 略低谷 (重複 escape 循環), L7 reveal closure. **下班通勤捷運場景下, 連 4 lesson 玩到 L4 是大概率**, 因為 L1-L4 hook 都 ≥ 8/10.

### Hook coverage vs canon

| Beat | Canon hook | Lesson 實現 | Match? |
|------|-----------|-------------|--------|
| 1 setup | thump inside egg | L1 hook ✓ | ✓ |
| 2 discovery | stare silence | L2 hook ✓ | ✓ |
| 3 rejection | mother turns away | L3 hook ✓ | ✓✓ |
| 4 escape | gunshot + friend falls | L4 hook ✓ | ✓✓ |
| 5 cottage | leaves into cold | L5 hook ✓ | ✓ |
| 6 winter | rescued but flees | L6 hook ✓ | ✓ |
| 7 reveal | swan + most beautiful | L7 ending ✓ | ✓✓ |

**全 7 lesson hook 對齊 canon arc**. narrative-cut-analyst 的 7-cut 計算與實作匹配度高.

### iOS TTS unlock 風險

Ch2 無 MP3, 全跑 Web Speech. **每 lesson 開頭第一個 narration 觸發 autoSpeak race**.

per CLAUDE.md v1.9.48: "iOS TTS race fallback: auto-speak 後 1s 檢測, 如未起動則 reveal sentence + 🔇 Audio unavailable 微文案."

- **風險點**: tap-pairs Q1 沒 sentence speak (因為是 vocab 配對), L1 第一個 narration 才觸發. iOS 第一次 audio 必須使用者手勢觸發 (Safari policy). tap-pairs 完成的 tap 是手勢 → 然後 advance 到 narration → 此時 Web Speech.speak() 是否在手勢 context 內?
- **建議測**: 真機跑 L1 (iOS 17+ Safari), 看 n1 是否 fallback 觸發. 沒看 LessonScene.ts 原始碼無法確認 race.

### A2 readability 壓力區

| Lesson | 邊緣字 (NGSL > 2000) | 影響 |
|--------|---------------------|------|
| L1 | reeds (x2), eggs/to-keep | reeds 沒教是漏 |
| L2 | whispered, behind back idiom | A2 邊緣 |
| L3 | farmyard, goose, wing, peck, chase | core 4 字 OK, goose+wing 漏 |
| L4 | marsh, ached, rough | marsh 沒教 |
| L5 | useless, purr, claws | 故事體可接受 |
| **L6** | autumn, necks, stretched, south, sore, gliding | **readability 高峰** |
| L7 | gliding, shone, at last | climax 可吸收 |

**L6 是 readability 壓力最大 lesson**. n1-Q4 連 5 個邊緣字塞一起, A2 學者可能聽不清但 inference 邏輯仍能推. 不致關 app 但會疲倦.

---

## P0 fixes (要動內容的)

按嚴重度排序:

### 1. L5 連 3 題 give-away (最痛, 影響挑戰感)

**kt-ch2-l5-q6**: sentence 砍 "sharp claws / curled" → 改 "The cat sat heavy on his back and dug into his soft feathers."

**kt-ch2-l5-q8**: sentence 砍 "laid no eggs" → 改 "She told him no one needed a duck who could not lay anything."

**kt-ch2-l5-q10**: vocab list 砍 cold (改 fire / kitchen / claws). 或 Q10 改 inference "Why did he walk into the cold?"

### 2. L1 連 2 題 give-away

**kt-ch2-l1-q6**: sentence "Bright yellow babies tumbled out" → "Five tiny shapes pushed past the broken shells onto the grass."

**kt-ch2-l1-q8**: sentence "That big egg stayed quiet and closed" → "The largest one made no sound, soft and round on the nest."

**L1 vocab list 漏 reeds**: 收進 tap-pairs (替掉 inside).

### 3. L3 連 2 題 give-away

**kt-ch2-l3-q6**: sentence "Sharp beaks came at him" → "From every side of the yard, sharp beaks came toward him fast." (砍 "pecked him hard" 的 n3)

**kt-ch2-l3-q8**: sentence "She tried to keep her grey son safe" → "She stepped close so the hens could not reach her grey son."

### 4. L6 連 2 題 give-away

**kt-ch2-l6-q6**: sentence "stuck in cold, frozen water" → "His feet would not move, and the water around him had grown hard."

**kt-ch2-l6-q8**: sentence "carried...back to his small home" → "He lifted the shaking bird and walked back toward his cottage."

### 5. L2 vocab→option give-away

**kt-ch2-l2-q10**: vocab list 砍 stare (改 hatch / shell / sister). 或 emoji options 改 🙄 looked away / 👀 staring / 🤝 friendly / 🎉 happy (加 looked away 強干擾).

### 6. L4 vocab spoiler

**kt-ch2-l4 vocab list 砍 fall** (因 n6 hook 用 "dropped to the ground" 同義). 改 vocab list:跑 / 野生 / 休息 / 草 — run / wild / rest / grass.

**kt-ch2-l4-q6 fix friend identity 洩答**: vocab list 砍 friend 後, Q6 正解 "a friend" 自然不再 mirror. 或正解改 "a quiet helper".

---

## P1 polish (UX 微調)

1. **L1 "窩" → "鳥巢"** (A2 用語親和).
2. **L4 "marsh" → "pond"** (NGSL 友善) 或 vocab list 加 marsh.
3. **L6 "stretched south" → "flew south"** (砍 stretched).
4. **L6 vocab list 加 autumn** (取代 white, n1 readability 解壓).
5. **L2 em-dash "Out came — but he was large and grey"** 改 period "Out came a baby duck. But he was large and grey." (TTS 斷句更穩).
6. **L3 "laugh out loud" → "laughed loudly"** (避 LOL idiom 衝突).
7. **L5 "shook her head" → "shook her head no"** (idiom 明確化).
8. **L6 Q10 question 砍 "loud"**: "How did he feel when the children ran to him?" 留 inference.
9. **iOS TTS race 真機驗**: L1 tap-pairs → n1 跳轉時 Web Speech.speak() context 確認.
10. **ChapterEndScene 確認 Ch3 teaser** (奶奶翻書到桃太郎或下一個故事), 提升 Ch2→Ch3 跨章留存.

---

## 心得 (A2 player perspective)

我下班坐捷運打開 Pickup, 點 Ch2. 我看到醜小鴨主題, 知道結局, 但好奇怎麼用 A2 英文講出來.

**L1-L4 我幾乎不會停**. hook 強, 故事節奏好, 我會一直滑下去. L1 的 thump 聲音意象、L2 的 "Nobody made a sound" 寂靜、L3 媽媽轉頭那刻、L4 朋友倒下心跳聲 — 這些 hook 都讓我**想知道下一集**.

**但每個 lesson 中段我會有「咦這也太簡單」的瞬間** — 特別是 Q6 + Q8 的 listen-mc, narration 才剛講完一句, Q 就直接問同一件事. 我答對但**沒有 think effort**, 像在通過一個品質檢查表. 這影響不到我會不會繼續玩 (因為 hook 拉著), 但累積下來會覺得「這 app 容易, 但學到了嗎?」.

**L5 是最痛的**. 連 3 題都是 vocab→Q 直接 map, 我感覺 lesson 變成「念 vocab list 然後 click 4 個選項中跟 vocab 同字的那個」. 沒挑戰感. 如果 L5 是試玩第一個 lesson, 我可能會關掉 app — 但因為前面 L1-L4 hook 累積足夠, 我撐到 L5 完.

**L6 最累**. readability 壓力大, autumn / necks / stretched / south / sore 連塞 5 個邊緣字. 我能讀懂但每句要愣 0.5-1 秒, 通勤 5 分鐘狀態下會覺得「腦累, 想換手機看 TikTok」. 雖然故事好但詞彙密度需要降.

**L7 reveal 那一刻很爽**. Q8 真的要 inference (a face he did not know → 從 vocab 推 swan), 答對的瞬間有滿足感. 那種「我真的學會了」的感覺, 比 L1-L6 任何答對都強. **這證明 inference 題型有效**.

**整體 Ch2 hook 設計強**, narrative-cut-analyst 的 7-cut 算 valid. **題型設計需要 template-level fix** — 不是個別題的問題, 是 listen-mc 那個 template (sentence → 直接 question) 結構洩答. **Q4 inference 題型 + Q10 emoji 題型**反而做得好, 應該擴大採用比例.

**最後**: 我會玩到 Ch2 結束 (hook 拉著), 但中間 5 次想「再 1 題就關掉」. 改完 P0 connections 後, 那 5 次會變成 1-2 次. 改完 P1 readability 後, 接近 0 次.

---

*Generated 2026-06-04 by 5th audit agent (Player Walkthrough). Ch2 status: B.225 全新 rewrite + Web Speech (no MP3 yet). 7 lessons, ~84 questions, 11 P0 give-away pending, hook coverage 7/7 ✓.*
