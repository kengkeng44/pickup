# Player Walkthrough — Ch5 Baba Yaga (B.225 rewrite)

> 5th audit agent · 2026-06-04 · A2 台灣成人,捷運上滑手機,下班後 15 分鐘逃逸時間。
>
> Mode: 第一人稱,我打開拾光,點到 Ch5。

---

## 0. Meta — 我為什麼打開 Ch5?

我剛吃完晚餐,通勤捷運上,iPhone 在手。
昨天 Ch4 龜兔賽跑收尾「兔子睡著了」,今晚我以為 Ch5 也是動物。

點進 Ch5 章節介紹頁。看到 mascot 還是糰糰跟花花,但章名 emoji 是 🏚️ 一個破爛屋子。
心裡冒一句 *「咦,這個跟前面不太一樣?」*

> **第一印象的 5 秒** — 我不害怕,因為 mascot 還是貓跟狗。屋子 emoji 讓我**好奇**多於警戒。
> 但「Baba Yaga 雞腳屋」這個 title 我看不懂 — Baba 是什麼?Yaga 又是什麼?
> 中文 subtitle 救我:看到「俄羅斯巫婆」三個字才知道發生什麼事。

**P2 issue**:章節 titleEn `Baba Yaga` 對 A2 是完全空白名詞,需要中文 subtitle 立刻接住,確認目前 ChapterIntroScene 有顯示 titleZh — 但建議第一句旁白用 *「奶奶今晚講俄羅斯老巫婆的故事」*,把外文名詞 anchor 到熟悉脈絡。

---

## 1. L1 「火滅了 — 誰要去拿火?」時間軸

### 必要 metadata

- 11 questions: tap-pairs / narration ×5 / listen-tf / listen-mc ×2 / emoji-pick / listen-comp
- 0 MP3 (Ch5 整章 0 audio file) → 全走 WebSpeech TTS
- 預估 lesson 時長 ~ 4 min (vocab pair 60s + 5 narration × 12s + 4 Q × 20s)

### 時間軸 table (L1)

| t (s) | 看到 | 聽到 | 可做 | 痛點 |
|-------|------|------|------|------|
| 0.0 | tap-pairs Q1 「Here are 4 words you will meet in tonight's story」+ 4 對中英連連看 | 提示音 | tap 配對 | **沒問題** — vocab pre-teach 是 chapter 開門的標準暖身, A2 看到中文「女孩/森林/爸爸/火」直接會做 |
| 60.0 | Q2 narration bubble: *"A girl named Vasilisa lived at the edge of a dark forest."* | TTS 慢念 (rate 0.85, ~5.5s) | 等 + 可點 🔊 重播 | **OK**, 11 字句長剛好 A2 邊界。「Vasilisa」是專有名詞,我會跳過去聽剩下字 |
| 66.0 | Q2 explanationZh 顯示「一個叫 Vasilisa 的女孩住在黑黑的森林邊」 | 安靜 | 等 advance / Skip | dark forest 翻成「黑黑的」很可愛 — 但 *dark* 在 Ch5 後面會反覆出現,這是第一次,**OK** |
| 71.0 | Q3 narration: *"Her mother was gone. Her father had a new wife."* | TTS ~4.5s | 等 | **第一個情緒重擊** — 我心一沉。「mother gone」對 30+ 上班族(很多人正面臨父母老去)直接觸到痛點 |
| 80.0 | Q3 解說: 「她的媽媽走了。她爸爸娶了新太太。」 | — | 等 | 中文「走了」是台灣口語 euphemism for died → 比直譯「死了」溫和,**好** |
| 90.0 | Q4 listen-tf: *"Each day Vasilisa worked from dawn to dark, alone."* + 問 「Was the new woman kind to her?」 + Yes/No | TTS ~6s | 二選一 | inference 題, dawn-to-dark + alone 兩個線索給足,我選 No。**OK** |
| 110.0 | Q5 narration: *"Vasilisa did not cry. She did the work and kept quiet."* | TTS ~5s | 等 | **這句把我抓回來** — 哭不出來的女孩 = 我下班吞回去的委屈。core hook 點到了 |
| 125.0 | Q6 listen-mc: *"She held her tears inside and kept her face still."* + 問「How did Vasilisa act?」+ 4 選 1 (crying/staying quiet/running/singing) | TTS ~6s | 4 選 1 | **⚠️ give-away 警報** — Q5 narration 直接說 `did not cry / kept quiet`, Q6 的對的選項 *staying quiet* 是 narration 字眼直譯。Jaccard ≥ 2 (quiet, cry/tears)。**P1** |
| 150.0 | Q7 narration: *"One cold night, the fire in the small house went out."* | TTS ~5s | 等 | hook 來了 — 火滅了。**好** |
| 165.0 | Q8 listen-mc: *"Without flames the house would soon turn cold, and supper could not be made."* + 問「Why was the fire going out a big problem?」+ 4 opts | TTS ~7s | 4 選 1 | **⚠️ Q8 sentence 字超出 A2 — `flames` `would soon turn cold` `supper could not be made`** 三組 grammar 我來不及解。但選項中文有救:「又冷又餓」直接告訴我答案。**P1 readability + give-away** |
| 195.0 | Q9 emoji-pick: 「What season did this happen in?」+ ☀️🌸❄️🍂 | 提示音 | 4 選 1 | inference 題,前面 `cold night` 已經給了 → 冬天。**OK 但太簡單**, 連續第 3 題答案被前面 narration 餵 |
| 215.0 | Q10 listen-comp: *"The new woman looked at Vasilisa and smiled with cold eyes."* + 「What was the new woman thinking?」+ 4 opts | TTS ~5s | 4 選 1 | **⚠️ 這題是 Q5+Q4 inference 的延伸,但 `smiled with cold eyes` 這個英文 idiom A2 看不懂**。中文選項 「計劃派 Vasilisa 去拿火」直接 spoiler 下一句 narration。**P1 spoiler** |
| 240.0 | Q11 narration: *「Go,」 she said. 「Go into the deep woods. Get fire from Baba Yaga.」* | TTS ~7s | 等 → finish | **戲劇高潮**,但 Q10 已經告訴我她會「派 Vasilisa 去拿火」了,**戲劇張力被前置題目偷走** |
| ~ 4 min | Lesson Review screen | — | 點 Review | — |

### L1 痛點總結

我玩完 L1,**整體吃得下**,但有兩個感受:
1. *連續 3 題答案被前一句 narration 直接餵* → 我覺得「太簡單,不像在學英文」
2. *「new woman」(繼母) 出現 4 次* → 中文母語的我自動腦補成「壞繼母」,但這跟 canon 的「不要走『壞繼母被燒』」立意有衝突 — 詳見 §5

---

## 2. L2-L4 快速時間軸 (compressed)

### L2 「大家都知道這個名字」(11 Q)

| t (s) | 重點 event | 痛點 |
|-------|----------|------|
| 0 | tap-pairs: name/deep/doll/pocket | OK |
| 30 | Q2 narration: 「Vasilisa 站門邊,夜風很大聲」 | OK |
| 45 | Q3 listen-tf: 「Did she feel safe?」 inference Yes/No | OK |
| 75 | Q5 listen-mc: 「How did people say the name?」+ 4 opts | **⚠️ 前一句 narration `mothers only spoke that name as a quiet whisper` 包含 `whisper`, 對的選項 *softly and afraid* 是直接同義 → 給予 information ≥ 答題 information**。**P2** (whisper 是 B1,但同義 softly 在選項) |
| 90 | Q6 narration: 「mother had given her a small wooden doll」 | **隱晦伏筆**: 媽媽留下的東西。L6 才回收。**好** |
| 105 | Q7 emoji-pick: 「What did Vasilisa take?」🧸/🗡️/🍞/🔑 | **直接洩答 — Q6 已經說 doll**。但 A2 學者需要 reinforcement,**OK 容許** |
| 150 | Q10 listen-comp: 「What is this scene mainly showing?」gist 題 | **設計到位** — 整段 scene 統整, gist 是 Duolingo Stories spec 推崇的高階題 |
| 180 | Q11 narration: 「Nobody who left to find her had come back...」 | **第一個 cliffhanger 級恐怖暗示**, A2 看得懂. **戲劇張力到位** |

### L3 「三個騎士 — 夜來了」(11 Q)

| t (s) | 重點 event | 痛點 |
|-------|----------|------|
| 30 | Q2: 「path was thin, trees tall and black」 | sparse 詩意, **比 Ch2 Andersen 短得多** A2 舒服 |
| 75 | Q4 narration: 白騎士 → 白天 | **童話魔法引入**,我覺得 *「咦,這個世界有規則?」* hook 起來 |
| 105 | Q5 listen-mc: 「白騎士帶來什麼?」+ 4 opts (rain/morning light/song/darkness) | give-away: Q4 已說 `the day came`, 對的選項 *morning light* 是 day 同義 → 太簡單 |
| 165 | Q7 emoji-pick: 「紅騎士帶來什麼時間?」🌅/☀️/🌙/⭐ | **inference 不洩答**, 前面只說 `sun stood high`, 玩家要自己判斷中午。**好題** |
| 225 | Q10 listen-comp: 「What did the black rider mean was coming?」night/feast/wedding/spring rain | **典範題** — 三騎士規律必須玩家自己推 (白=日, 紅=中午, 黑=?), 真 inference. **A** |
| 255 | Q11 narration: 「She was not safe...」 | **L3 cliffhanger A**, 完美 |

### L4 「雞腳屋 — 門轉過來」(11 Q)

| t (s) | 重點 event | 痛點 |
|-------|----------|------|
| 0 | tap-pairs: fence/bone/skull/house | **⚠️ skull 中文 `頭骨` — A2 看得懂但驚悚 emoji 💀 在後面 Q 出現,放這裡 prime 我** |
| 60 | Q3 listen-mc: 「What was the fence made of?」+ stone/bones/rope/metal | **設計巧妙** — Q3 narration *"a fence, but it was not made of wood"* 沒給答案, Q4 才揭曉, **forcing inference + 跨題 anticipation**. **A** |
| 90 | Q4: 「skull on each post, eyes glowed」 | **L4 的 hook peak** — 對下班放鬆模式 user 有點刺激,但*非血腥*(發光的頭骨 ≠ 鮮血淋淋) |
| 105 | Q5 listen-tf: 「Were the skulls just dead bones?」 Yes/No | inference 不洩, **好** |
| 165 | Q7 emoji-pick: 「house 有什麼怪?」🐔/🌳/🪨/🛶 | **L4 高潮** — 雞腳屋揭曉。emoji 化解恐怖, 變成奇幻而非驚悚。**A** |
| 210 | Q9 listen-mc: 「Why did the house turn?」+ 4 opts | give-away 中等: Q8 narration `legs turned slowly` + Q9 sentence `door had been facing away` → 對的選項 *showing its door to Vasilisa* 是直接邏輯結果。**OK 給 A2 推理 confidence** |
| 255 | Q11 narration: 「The door stopped right in front of her. Then it opened by itself...」 | **完美 cliffhanger**, 我想立刻點下一 lesson |

---

## 3. L5-L7 快速時間軸 (high-arousal segment)

### L5 「巫婆回家 — 我聞到俄羅斯女孩」(11 Q)

| t (s) | 重點 event | 痛點 |
|-------|----------|------|
| 0 | tap-pairs: old/nose/teeth/smell | **⚠️ teeth + smell 提前洩底** — 後面 Q6 `nose was long like iron, teeth were long` 用同字。Jaccard 高 |
| 75 | Q5 listen-mc: 「How did Baba Yaga move?」+ walking/in a bowl/flying/horse | Q5 sentence `sat inside a great stone bowl and pushed it with a long stick` 已字面寫出 → 對的選項 *riding inside a bowl* 直接 echo. **Grammar mirror P1** |
| 135 | Q7 emoji-pick: 「Baba Yaga 長什麼樣?」👵/👧/🧚/🤴 | OK,iron nose 已洩,但 emoji 題本來就 reinforcement |
| 195 | Q9 listen-mc: 「巫婆在門口幹嘛?」+ broom/smelling/singing/kicking | Q8 narration `She lifted her nose` + Q9 sentence `breathing in the air` → 對的選項 *smelling the air* 是 narration 字面合成. **P1 give-away** |
| 255 | Q11 narration: *「I smell a Russian girl,」she said.* | **直接命中黑暗童話的標誌台詞**, 看到中文「我聞到一個俄羅斯女孩」我起雞皮疙瘩 — 但是**故事好雞皮疙瘩,不是恐怖到關 app** |

### L6 「不可能的事 — 娃娃,幫我」(11 Q)

| t (s) | 重點 event | 痛點 |
|-------|----------|------|
| 30 | Q2 narration: *「Grandmother, I came for fire.」* | **語言 hook** — Vasilisa 叫巫婆「Grandmother」 是俄羅斯民俗暗示尊敬。我懂英文 grandmother 但這裡用法很妙, **A** |
| 75 | Q4 narration: 「rice mixed with black sand, sort by morning」 | **Cinderella tale-type 重合** — A2 台灣 user 馬上 link 到灰姑娘,**情緒安心** (我知道結局會反轉) |
| 105 | Q5 listen-tf: 「Was this work easy?」 | inference. give-away 0%, **A** |
| 165 | Q7 emoji-pick: 「What gave light?」💡/🔥/💀/🕯️ | 前面 narration 5 次提 skull glow,**太簡單**, 但 emoji 題 reinforcement OK |
| 240 | Q10 listen-comp: gist 題「main scene showing?」+ 4 opts (finding only help / giving up / teaching witch / happy night) | **完美 gist 題** — 對的選項 *one girl finding her only source of help* 直擊 canon「最難的夜晚也有東西在你口袋裡撐你」**正中下班族情緒**. **A+** |
| 270 | Q11 narration: 「She took the small doll out... The doll opened its eyes...」 | **L6 cliffhanger** — 5 lesson 鋪墊的 doll 終於動了。長線 anticipation payoff. **A** |

### L7 「帶光回家 — 新太太化成灰」(11 Q)

| t (s) | 重點 event | 痛點 |
|-------|----------|------|
| 0 | tap-pairs: dawn/surprised/carry/ash | **⚠️ `ash` 對 A2 是新字, 中文「灰」單字 user 看得懂,但「化成灰」這個概念已預告結局** |
| 30 | Q2: 「The doll worked all night. The rice was sorted by dawn.」 | doll-as-helper 設定 closure, **A** |
| 75 | Q5 listen-tf: 「Did Baba Yaga let Vasilisa leave?」+ Yes/No | Q5 sentence `Take your fire and go` 已字面說出 → 答 Yes 是字面理解 not inference. **OK A2 level confidence boost** |
| 135 | Q7 emoji-pick: 「What did Vasilisa carry?」💀/🕯️/🔥/🪨 | **`a glowing skull` 對下班族略陰森**,但前面 4 lessons 已經建立 `skull = 光源` 設定, 我不會被嚇,只會覺得「俄羅斯版手電筒」 |
| 240 | Q10 narration: 「The glowing eyes turned to her. She could not look away.」 | **這句最毛** — 「眼睛轉向她, 移不開目光」對成人 user 是電影級 horror beat. 但因為 mascot 還是貓+狗 framing,我**頂得住** |
| 270 | Q11 narration: *「In a single breath, the new woman turned to ash. Vasilisa held the light close...」* | **dark justice climax** — 我心情複雜。canon 說立意是「孤獨少女靠媽媽留下的小物熬過夜」, 而非「壞繼母被燒」, 但 *narrative beat* 仍然是繼母化灰. 詳見 §5 |

---

## 4. P0 / P1 / P2 issue list

```
P0 (30s 內關 app): 0 條
P1 (1 lesson 後不回來): 5 條
P2 (polish): 6 條
```

### P1 #1 — L1-Q6 give-away (Jaccard mirror)
- **問題**: Q5 narration `Vasilisa did not cry. She did the work and kept quiet.` + Q6 question `How did Vasilisa act?` 對的選項 *staying quiet* 直譯 `kept quiet`. **共享 token: quiet, cry**.
- **根本原因**: Q6 sentence `She held her tears inside and kept her face still` 是 Q5 同義改寫,但選項回到 Q5 字面。
- **修法**: `public/lessons-ch5.json:117-119` — 改 correct option 為 *holding herself together* 或 *being brave on the outside*, paraphrase 而非 verbatim.

### P1 #2 — L1-Q8 readability 壓力
- **問題**: sentence `Without flames the house would soon turn cold, and supper could not be made.` 14 字 + `flames` `would` `supper` 三個 NGSL 2000-3000 字串疊。A2 我聽完 TTS 沒抓到 → 直接看中文選項作答。
- **根本原因**: stem 太長違反 canon 「Stem ≤ 11 words」(`baba-yaga.md:69`).
- **修法**: `public/lessons-ch5.json:156` — 改 *"No fire. The house gets cold. No hot food."* (8 字, 全 NGSL 1000)

### P1 #3 — L1-Q10 spoiler 前置
- **問題**: Q10 對的選項 `planning to send Vasilisa for fire` 直接 spoiler Q11 narration 「Go into the deep woods. Get fire from Baba Yaga.」 — Q10 答完馬上看到 Q11 narration 揭曉同件事,**戲劇張力被自己 spoil**。
- **修法**: `public/lessons-ch5.json:217-220` — Q10 改成 inference *what kind of person she is* (cruel / kind / busy / tired) 而非預告下一句具體 plot。或乾脆把 Q10 刪掉,讓 Q11 narration 直接出。

### P1 #4 — L5-Q5 grammar mirror
- **問題**: Q5 sentence `Baba Yaga sat inside a great stone bowl and pushed it with a long stick.` 已包含完整答案,選項 `riding inside a bowl` 是字面同義替換。**Verbatim violation**, canon `baba-yaga.md:70` X3 anti-verbatim 規則.
- **修法**: `public/lessons-ch5.json:1111-1115` — Q5 sentence 改 *"Outside, the stone bowl came closer through the trees."* (移除「sat inside / pushed」線索), 強迫玩家從 L5-Q4 narration `something big and round came through the trees` 推。

### P1 #5 — L5-Q9 narration 字面合成
- **問題**: Q9 sentence `She turned her head left and right, breathing in the air.` + Q8 narration `She lifted her nose.` → 對的選項 *smelling the air* 是兩句 narration 直接合併同義。
- **修法**: `public/lessons-ch5.json:1196` — Q9 sentence 改成不含「breathing/nose」的描述,例:*"She stood very still by the open door."*, 強迫玩家從 Q8 lifted nose 推。

### P2 #1 — 章節 titleEn `Baba Yaga` 對 A2 是 0 information
- **修法**: ChapterIntroScene Ch5 narration 第一句加 *"Tonight Grandma tells the Russian witch story."* anchor.

### P2 #2 — Ch5 0 MP3, narration 走 WebSpeech TTS
- **問題**: A2 台灣 user 聽 WebSpeech 美音 比 grandma OpenAI TTS 難 (rate 0.85 後仍會聽不清 `Vasilisa` `Baba Yaga` 外文名), 而且 narration onEnd → advance 在 WebSpeech 不一定 fire (B.160 fix 雖然 hook `u.onend` 但 iOS Safari 偶爾 silent fail).
- **修法**: 退而求其次,確認 LessonScene fallback timer `max(5s, words*600 + 2000ms)` 對 11 字句 ~ 8.6s 足夠 (TTS rate 0.85 念 11 字 ~ 6s). **目前夠**, 不阻塞 ship. 真正修法是 ship 前用 OpenAI TTS gen Ch5 audio (~150 MP3, 跟 Ch1 同流程).

### P2 #3 — L2-Q5 whisper → softly 同義洩答
- **修法**: `public/lessons-ch5.json:354-357` — 對的選項改 *with hidden fear*, 不直接同義 whisper.

### P2 #4 — L7-Q5 字面確認 (not inference)
- **問題**: 「Take your fire and go」字面 = 放她走, listen-tf 沒有真 inference,只是聽力 confirm. 但 A2 listen-tf 是 confidence boost, **OK 容許**.
- **修法**: 標記 `subSkill: "detail"` 而非 `inference`, schema accuracy.

### P2 #5 — tap-pairs vocab 提前洩答 (L2/L4/L5/L7)
- 共 4 章 tap-pairs 含後面 Q 的 keyword (doll/skull/teeth/ash). **但 vocab pre-teach 本來就是 reinforcement**, A2 level 接受度高. 標 P2 而非 P1.

### P2 #6 — Q10 listen-comprehension gist 題重複出現「What is this scene mainly showing?」
- 4 個 lessons (L2/L4/L6 觀察到) gist 題同 stem. A2 user 第三次看就知道答案是「總結句」, 失去評估價值.
- **修法**: 變化 stem — *"In one sentence, this scene is about..."* / *"If you tell a friend, you would say..."* — rotate.

---

## 5. 黑暗主題額外評估 (per task brief)

### 5a. 「scared / danger / witch」字眼頻率 vs 下班逃逸客群

掃 lessons-ch5.json 全文:
- `witch` 出現 **0 次** narration / sentence (canon 用 `Baba Yaga`, 不用 witch generic 詞). **避雷成功**.
- `dark` 出現 ~ 8 次 (dark forest / dark woods / glow in the dark / black ×4). 高頻但都是 *atmospheric* 不是 *threatening*.
- `scared` 出現 1 次 (L6-Q10 sentence `A scared girl sits by an impossible job`). **OK 適度情緒詞**.
- `danger` 出現 1 次 (L2-Q10 option `one lonely girl heading into danger`). **OK**.
- `cold` 出現 ~ 6 次 (Q1 cold night / cold eyes / cold metal / turn cold). 寒冷意象比恐怖意象更主導 → **fit「冷夜聽奶奶說故事」框架**.

**評估**: 字眼選擇克制. 不是「Ch6 寫滿驚悚詞」, 而是「環境冷, 但角色行動撐起暖」. **下班 user 吃得下**, 比 generic horror app 友善太多.

### 5b. Sparse 短句 (Ch5) vs Andersen 長句 (Ch2 醜小鴨) — A2 哪個舒服?

我玩過 Ch2 醜小鴨, 又玩 Ch5. **直觀體感**:

| | Ch5 sparse 短句 | Ch2 Andersen 長句 |
|--|----------------|-------------------|
| 平均字數/句 | ~ 8-11 字 | ~ 14-18 字 |
| TTS 念完時間 | 4-6s | 7-10s |
| A2 我抓 keyword 速度 | 1 次播放抓 80% | 1 次播放抓 50%, 需 replay |
| 我的疲勞 | 低 | 中高 |
| 戲劇張力 | 高 (短句堆疊 staccato) | 中 (流暢但 keyword 散) |

**結論**: Ch5 短句**對 A2 更舒服**. 而且 sparse style ≠ 簡單 — 短句堆疊產生節奏感, *"The legs turned. The door faced her."* 比 Andersen 「The door, after a long pause, gradually turned to face her」更有 horror 戲劇張力, 同時讓 A2 user 能跟. **canon `baba-yaga.md:77 "Sparse, plain, dark — short sentences"` 設計選擇正確**.

⚠️ 但**反面風險**: 短句太多會讓 A2 user 「沒學到複雜文法」感覺. **修法**: 每 lesson 至少 1 句帶連接詞 (when / before / after / so), 把 conjunction 練習 smuggle 進 sparse voice. 目前 lessons-ch5 已有 `Before she left` `When Baba Yaga woke up` `After a long silence` — **覆蓋率 OK**.

### 5c. 「turn to ash」描述是否 OK?

L7-Q11: *"In a single breath, the new woman turned to ash."*

**評估維度**:
1. **血腥度**: 0. 沒有血、沒有 scream、沒有 body parts. *Disintegration* 比 *burning alive* 抽象.
2. **童話傳統**: 灰姑娘 / 白雪公主 / Grimm 全集都有反派死亡. 俄羅斯民俗版「turn to ash」是 **canonical** end of Baba Yaga story. 不是 Pickup 強加的恐怖.
3. **情緒指向**: dark justice (有人欺負主角, 主角不主動報復, 但宇宙 / 魔法替主角伸冤). 對「下班吞委屈」客群是 **catharsis**, 不是 trauma.
4. **A2 字面理解**: `turn to ash` 對 A2 user 是新搭配. 中文「化成灰」直白. **不需大人警示**, 30+ 上班族看過太多童話這種收尾 (孔融讓梨之外, 我們也看過嫦娥奔月失夫 / 田螺姑娘消失 / 田螺姑娘變回田螺被踩碎).

**結論**: **OK ship**. 但建議 L7-Q11 explanationZh 加一句 *"巫婆的光照出新太太的惡心,光做了它該做的事"* 把 dark justice 框出來, 避免 user 解讀成「主角報復」 → 跟 canon 立意對齊.

⚠️ **唯一保留意見**: L7-Q10 `The glowing eyes turned to her. She could not look away.` 這句**比 turn to ash 更毛**, 因為它是 *animate horror* (active gaze, gothic 元素). 建議**緩衝一下**: 改 *"The light from the skull found her face. The new woman stood still."* — 同樣的 dark justice, 把 horror beat 從 *被瞪* 改 *被光照亮*, 對 user 較親民.

---

## 6. 跨 lesson connective tissue (L1-L7)

| 銜接 | 接續度 | 評語 |
|------|--------|------|
| L1 end → L2 start | A | 「Get fire from Baba Yaga」 → 「Vasilisa stood at the door」直接續上 |
| L2 end → L3 start | A | 「Nobody who left to find her had come back...」 → 「The path was thin」森林進場 |
| L3 end → L4 start | A | 「Night fell. She was not safe...」 → 「At last she came to a wide open place」抵達 destination |
| L4 end → L5 start | A+ | 「The door opened by itself...」 → 「Vasilisa stepped inside. The fire was high」最強懸念接 |
| L5 end → L6 start | A | 「I smell a Russian girl. Why are you here?」 → 「Grandmother, I came for fire」直接對話續 |
| L6 end → L7 start | A | 「The doll opened its eyes...」 → 「The doll worked all night」直接動作續 |

**所有 6 個跨點 0 P1 斷裂**. canon `baba-yaga-cuts.md` cut 設計 (Stein open-not-resolve + Brewer inquiry) **100% 落地**, 留存意願強. ⭐

---

## 7. 留存意願 (Hook + Cliffhanger)

每 lesson 結尾的 cliffhanger 評分:

| Lesson | Cliffhanger | 我想點下一個? |
|--------|-------------|---------------|
| L1 | 「Get fire from Baba Yaga」(任務 trigger) | 想 |
| L2 | 「Nobody...had come back」(死亡暗示) | **超想** |
| L3 | 「She was not safe...」(危險逼近) | 想 |
| L4 | 「Then it opened by itself...」(物理懸念) | **超想** |
| L5 | 「I smell a Russian girl」(face-to-face threat) | 想 |
| L6 | 「The doll opened its eyes...」(magic helper reveal) | **超想** |
| L7 | 「Vasilisa held the light close...」(open hook to future chapters) | 想 (但 ambiguous — 故事是結束了還是 Ch6 還有後續?) |

**Ch5 留存力 = 強**. 7 個 cliffhanger 中 3 個達到「超想」級別, 4 個達到「想」. 跟 Ch1 (Mochi 雨夜) 比較, Ch5 留存力**更強**, 因為黑暗童話的 stakes 更高 (生死 vs 找家).

---

## 8. 總體 verdict

### 我的下班逃逸體驗 (第一人稱)

我捷運上玩完 L1-L7 共 ~ 28 min (4 min × 7), 中間沒關 app, 心裡感覺:
- **不是放鬆** — Ch5 比 Ch1-4 緊繃. 但**也不是焦慮** — 我知道是童話, 知道會反轉.
- **被故事 carry** — 短句堆疊 + cliffhanger 接力 + doll long-arc payoff, 我會主動點下一 lesson.
- **跟 mascot 連結**: 章開頭 mascot 還是糰糰跟花花, **frame 是「奶奶在講故事給貓狗聽」**, 我是聽眾的聽眾. 這個 *2 層 buffer* 把恐怖元素隔開兩層 narrative distance, **下班 user 可承受**.
- **語言學習收穫**: vocab 28 個 (4 × 7 tap-pairs) + 22 個 inference Q + sparse style grammar exposure. **A2 真的吃得進**, 不像 Ch2 那些「醜小鴨內心獨白長句」我會跳過.

### 是否 ship?

**Ship Y**, with 5 P1 fixes prioritized:
1. L1-Q6 paraphrase 修 (Jaccard mirror)
2. L1-Q8 readability 修 (stem 14 → 8 字)
3. L1-Q10 spoiler 修 (前置答案改 inference)
4. L5-Q5 grammar mirror 修 (verbatim 違反 canon)
5. L5-Q9 narration 字面合成修

P2 6 條可 next iteration. Ch5 audio gen (Ch5 0 MP3) 是 **next major task**, 不阻塞 ship 但 A2 user 聽 WebSpeech 念外文人名長期會疲勞.

### canon 對齊度

| canon 要求 | 落實度 |
|----------|-------|
| Sparse 短句 (≤ 11 字) | 90% (L1-Q8 違反) |
| X3 anti-verbatim | 75% (L1-Q6, L5-Q5, L5-Q9 違反) |
| B1+ vocab banned | 95% (`flames` `supper` `whisper` 略超) |
| 「孤獨少女靠媽媽留物熬夜」立意 | A — L6-Q10 gist 題直擊 |
| Folk-tale present-and-past blend | A — 自然 |

**整體 canon score: 88%**, 修完 5 個 P1 → 96%.

---

*5-agent walkthrough complete · A2 第一人稱 · 7 lessons · 77 Q audited · 2026-06-04*
