# Content QA — 2026-06-01 18:08 UTC

Today's angle: **#12 — explanationZh story-voice vs jargon**
Focus: **Ch5–Ch7** (batch-AI content; first deep explanationZh audit for these chapters)

---

## A. validate-lessons.js result

```
WARN lessons-ch1.json: 31 lint issue(s)
WARN lessons-ch2.json: 52 lint issue(s)
WARN lessons-ch3.json: 85 lint issue(s)
WARN lessons-ch4.json: 83 lint issue(s)
WARN lessons-ch5.json: 63 lint issue(s)
WARN lessons-ch6.json: 59 lint issue(s)
WARN lessons-ch7.json: 44 lint issue(s)
WARN lessons-ch8.json: 65 lint issue(s)
```

All 8 chapters pass schema + mirror lint (0 structural errors). Lint issue counts are X2 option-list-bias + X3 R1-verbatim from previous audit cycle — no new structural regressions.

Total automated lint issues stable at **482 across all chapters** (374 counted last cycle + ~108 from updated guards).

---

## B. Violation table

**Sampling scope**: All 25 lessons Ch5, 25 lessons Ch6, 25 lessons Ch7. Deep scan of all explanationZh fields.

| Ch | Q ID | Type | Snippet (sentence 40 char) | Violation | 修法 | Audio regen? |
|----|------|------|---------------------------|-----------|------|--------------|
| 5 | kt-ch5-l1-q3 | listen-mc | "I leap up on the wall." | **ZH-JARGON-UX打字** — "打字練聽" references game mechanic explicitly; breaks story immersion | Rewrite: "jump = 跳。我每晚從街上縱身一跳,落在奶奶的低牆上。" | no |
| 5 | kt-ch5-l1-q3 | listen-mc | same | **EN-IPA** — "短 u 音,跟 jog/drop/drip 的母音都不一樣。打字練聽。" academic phonology textbook register | Remove IPA, add story context as above | no |
| 5 | kt-ch5-l2-q3 | listen-mc | "Grandma opens a new book page." | **EN-IPA** — "/eɪdʒ/ 結尾,跟 pace /eɪs/、pad /æd/ 不同" — linguistics notation, zero story connection | Rewrite: "page = 頁。奶奶把書翻到從來沒翻過的那一頁,我往前靠了一點。" | no |
| 5 | kt-ch5-l3-q3 | tap-tiles | "I will tell you a story." | **ZH-JARGON-干擾** — "正確順序:I → will → tell → you → a → story。fast / loud 是干擾。" names distractors as test-design term | Rewrite: "奶奶把書抱到膝上,說:我來告訴你一個故事。Mochi 豎起耳朵。" | no |
| 5 | kt-ch5-l4-q2 | listen-mc | "Man = 人類(這裡指全人類,大寫…" | **ZH-JARGON-名詞** — "大寫像專有名詞" grammar register in story context | Rewrite: "Man = 人類。故事剛開始,動物和人類剛建立約定,駱駝還沒加入。" | no |
| 5 | kt-ch5-l4-q3 | tap-tiles | "The Horse had his saddle." | **ZH-JARGON-干擾** — "dog / tail 是干擾" | Rewrite: "saddle = 馬鞍。馬背上綁了鞍,就是準備好工作了 — 駱駝什麼都沒有。" | no |
| 5 | kt-ch5-l5-q3 | listen-mc | "He is very lazy." | **EN-IPA** — "/ˈleɪzi/,結尾是 -zy,別跟 lacy /ˈleɪsi/ 混了。" phonetics exam note | Rewrite: "lazy = 懶的。沙漠裡其他動物都在工作,駱駝就站在那裡,什麼都不做。" | no |
| 5 | kt-ch5-l5-q5 | listen-mc | "He does not want to work." | **ZH-JARGON-衝突點** — "這就是 Kipling 故事的衝突點。" literary-analysis register | Rewrite: "No — 一點都不想。連精靈來問也只是哼一聲,他不知道代價快來了。" | no |
| 5 | kt-ch5-l8-q3 | tap-tiles | "Camel, come and fetch with me." | **ZH-JARGON-干擾** — "now / loud 是干擾" | Rewrite: "fetch = 叼回來。狗向駱駝喊:一起來幫人搬東西!駱駝頭都沒抬。" | no |
| 5 | kt-ch5-l8-q4 | listen-mc | "The Ox carries the load for Man." | **EN-IPA** — "/ˈkæri/ 短 a,跟 marry /ˈmæri/ 拼字像但意思不同,curry 母音 ʌ 也錯。" | Rewrite: "carry = 搬運、扛。牛默默扛著犁,一趟又一趟。" | no |
| 5 | kt-ch5-l10-q1 | listen-mc | "On Wednesday the Ox came to him." | **ZH-JARGON-常考** — "常考發音陷阱" exam-prep language | Rewrite: "Wednesday = 星期三。第三天,牛走到駱駝面前。第一個 d 不發音,像說 'Wenz-day'。" | no |
| 5 | kt-ch5-l12-q3 | listen-mc | "The Camel went from here." | **EN-IPA** — "/ˈkæməl/,結尾 -mel,跟 came /keɪm/、calm /kɑːm/ 母音不同。" | Rewrite: "Camel = 駱駝。牠轉身就走,根本不在乎三隻動物說了什麼。" | no |
| 5 | kt-ch5-l13-q3 | tap-tiles | "The Djinn is a magic person." | **ZH-JARGON-干擾** — "small / loud 是干擾" | Rewrite: "Djinn = 沙漠精靈。這不是普通人,是管沙漠的魔法存在,駱駝第一次見到。" | no |
| 5 | kt-ch5-l14-q4 | listen-mc | "The Camel drinks from a pool." | **EN-IPA** — "/puːl/,跟 pull /pʊl/、pole /poʊl/ 母音都不一樣。" | Rewrite: "pool = 水窪、小水坑。駱駝悠閒地去喝水,其他動物要多做他那份工。" | no |
| 5 | kt-ch5-l18-q3 | listen-mc | "The Camel is not eating." | **EN-IPA** — "/ˈiːtɪŋ/,跟 eight /eɪt/ 母音不同。三天不吃,聽起來就餓。" | Rewrite: "eating = 吃東西。三天不吃,但駱駝身上多了一個大包 — 那就是代價。" | no |
| 5 | kt-ch5-l25-q2 | tap-pairs | "trot/fetch/plough/lazy" | **ZH-JARGON-動詞** — "三個動詞 + 一個形容詞" grammar-classification register | Rewrite: "trot=馬跑、fetch=狗叼、plough=牛犁 — 三隻動物的日常。lazy=懶 — 那是駱駝。" | no |
| 5 | kt-ch5-l25-q9 | tap-tiles | "The hump keeps food for him." | **ZH-JARGON-干擾** — "water / ice 是干擾" | Rewrite: "hump = 駝峰。奶奶說:駝峰就像牠背在身上的便當盒,裡面存著能量。" | no |
| 6 | kt-ch6-l2-q4 | tap-tiles | "Hana sits by Grandma tonight." | **ZH-JARGON-干擾** — "loudly / fast 是多餘的干擾" | Rewrite: "Hana 乖乖趴在奶奶腳邊,今晚她比平常靠得近一點。" | no |
| 6 | kt-ch6-l3-q4 | tap-tiles | "The brave girl wins in the end." | **ZH-JARGON-干擾** — "loud 是干擾字" | Rewrite: "brave girl wins = 勇敢的女孩最後贏了。奶奶第一次提到 Vasilisa,用這句話開場。" | no |
| 6 | kt-ch6-l4-q5 | tap-tiles | "The stepmother gives her hard work." | **ZH-JARGON-干擾** — "soft / easy 是反義干擾" | Rewrite: "hard work = 繁重工作。繼母每天派活,Vasilisa 從不說不行。" | no |
| 6 | kt-ch6-l7-q3 | tap-tiles | "Vasilisa walks into the dark forest." | **ZH-JARGON-干擾** — "soft / fast 是干擾" | Rewrite: "Vasilisa 提著娃娃給的燈,一步一步走進黑森林,腳沒有停。" | no |
| 6 | kt-ch6-l7-q6 | listen-mc | "She had to go because she had…" | **EN-CHOICE** — "she has no choice = 沒得選" English phrase in Chinese explanation | Rewrite: "沒得選 = no choice。家裡沒有火,繼母送她去森林,她知道這可能是個陷阱。" | no |
| 6 | kt-ch6-l8-q5 | tap-tiles | "The forest is deep and quiet." | **ZH-JARGON-干擾** — "loud / bright 是反義干擾" | Rewrite: "deep and quiet = 又深又靜。她走進去,樹越來越密,腳步聲越來越輕。" | no |
| 6 | kt-ch6-l9-q5 | tap-tiles | "Three riders pass on the path." | **ZH-JARGON-干擾** — "loud / slow 是干擾" | Rewrite: "three riders = 三位騎士。一白一紅一黑,三個人先後過去 — 奶奶說他們是白天、黃昏、夜晚。" | no |
| 6 | kt-ch6-l10-q5 | tap-tiles | "The little hut turns to face her." | **ZH-JARGON-干擾** — "loud 是干擾" | Rewrite: "turns to face = 轉過來面對她。雞腳屋慢慢旋轉,像認出了 Vasilisa。" | no |
| 6 | kt-ch6-l12-q5 | tap-tiles | "She must clean the yard tonight." | **ZH-JARGON-干擾** — "later 是時間反義干擾" | Rewrite: "clean the yard = 掃院子。今晚就要做完。Vasilisa 拿起掃帚,娃娃已經在旁邊等了。" | no |
| 6 | kt-ch6-l13-q4 | tap-tiles | "I will sort the good seeds first." | **ZH-JARGON-干擾** — "later 是干擾" | Rewrite: "sort the seeds = 把種子分好。娃娃整理的速度比她快,她只需要看著,心裡默默謝謝媽媽留下的禮物。" | no |
| 6 | kt-ch6-l15-q5 | tap-tiles | "The doll works late at night." | **ZH-JARGON-干擾** — "loud 是反義干擾" | Rewrite: "works late at night = 深夜工作。Vasilisa 一睡著,娃娃就動起來,悄悄把任務做完。" | no |
| 6 | kt-ch6-l16-q5 | tap-tiles | "All the tasks are done at last." | **ZH-JARGON-干擾** — "loud 是干擾" | Rewrite: "at last = 終於完成了。巫婆早上來查,一樣也挑不出來。Vasilisa 低頭沒說話。" | no |
| 6 | kt-ch6-l18-q5 | tap-tiles | "The fire lights her way home." | **ZH-JARGON-干擾** — "lost 是反義干擾" | Rewrite: "lights her way = 照亮回家的路。巫婆給的頭骨火炬,竟然是帶她回去的燈。" | no |
| 6 | kt-ch6-l20-q4 | tap-tiles | "In the end she had nothing again." | **ZH-JARGON-干擾** — "much 是反義干擾" | Rewrite: "nothing again = 又什麼都沒了。她從最小的願望開始,貪到連起點都沒了。" | no |
| 6 | kt-ch6-l23-q9 | tap-tiles | "Brave girls go home in the end." | **ZH-JARGON-干擾** — "fast 是干擾字" | Rewrite: "奶奶的結語:go home in the end = 最後能回家。Hana 聽到這句,搖了搖尾巴。" | no |
| 6 | kt-ch6-l24-q4 | tap-tiles | "I jump down and walk home tonight." | **ZH-JARGON-干擾** — "loud 是干擾字" | Rewrite: "jump down and walk home = 跳下來走回去。今晚聽到勇敢女孩的故事,連我的步伐都輕一點了。" | no |
| 7 | kt-ch7-l2-q4 | tap-tiles | "She opens the old book." | **ZH-JARGON-干擾** — "fast / loud 是干擾" | Rewrite: "奶奶打開那本舊書,封面已經有點泛黃,故事就在裡面。" | no |
| 7 | kt-ch7-l3-q4 | tap-tiles | "She turns the page slowly." | **ZH-JARGON-干擾** — "quickly / down 是干擾" | Rewrite: "slowly = 慢慢地。奶奶翻頁很慢,像捨不得故事太快結束。" | no |
| 7 | kt-ch7-l5-q5 | tap-tiles | "She walked into the wood." | **ZH-JARGON-干擾** — "fast / tree 是干擾" | Rewrite: "walked into the wood = 走進森林。女巫一步一步往藏著六個王子的地方靠近。" | no |
| 7 | kt-ch7-l7-q6 | tap-tiles | "They flew into the gray sky." | **ZH-JARGON-干擾** — "wide / near 是干擾" | Rewrite: "flew into the gray sky = 飛進灰色天空。六隻天鵝消失了 — 妹妹看著,一個字都說不出來。" | no |
| 7 | kt-ch7-l9-q6 | tap-tiles | "She walked until the sun set." | **ZH-JARGON-干擾** — "rose / now 是干擾" | Rewrite: "walked until the sun set = 走到太陽下山。她不知道要走多遠,只是繼續走。" | no |
| 7 | kt-ch7-l11-q5 | tap-tiles | "The swans turned back to boys." | **ZH-JARGON-干擾** — "girls / soon 是干擾" | Rewrite: "turned back to boys = 變回男孩。六隻天鵝一件一件套上白衫,人的形狀回來了。" | no |
| 7 | kt-ch7-l13-q5 | tap-tiles | "She did not speak a word." | **ZH-JARGON-干擾** — "loud / fast 是干擾" | Rewrite: "not a word = 一個字都沒說。她記得承諾,就算被誤解,也只是低頭繼續織。" | no |
| 7 | kt-ch7-l15-q5 | tap-tiles | "She kept her silent promise." | **ZH-JARGON-干擾** — "loud / broke 是干擾" | Rewrite: "keep a promise = 遵守承諾。就算王后逼問,她也只是把手放在那件還沒完成的衫上。" | no |
| 7 | kt-ch7-l17-q5 | tap-tiles | "She did not say a word." | **ZH-JARGON-干擾** — "loud / yes 是干擾" | Rewrite: "not a word = 一個字都沒說。這已經是第十七課 — 沉默是她對哥哥們最重的承諾。" | no |
| 7 | kt-ch7-l20-q4 | tap-tiles | "They wasted every wish." | **ZH-JARGON-干擾** — "won / today 是干擾" | Rewrite: "wasted every wish = 把三個願望都浪費掉了。一根香腸用掉兩個願望,最後一個只夠收尾。" | no |
| 7 | kt-ch7-l22-q4 | tap-tiles | "She married a mouse like her." | **ZH-JARGON-干擾** — "tall / loud 是干擾" | Rewrite: "married a mouse like her = 嫁給和自己一樣的老鼠。老鼠新娘找到真正合適的,不是最帥的。" | no |
| 7 | kt-ch7-l24-q5 | tap-tiles | "I walk home in the quiet night." | **ZH-JARGON-干擾** — "loud 是干擾" | Rewrite: "quiet night = 安靜的夜晚。聽完六隻天鵝的故事,我跳下牆,慢慢走回去。" | no |
| 7 | kt-ch7-l25-q13 | tap-tiles | "She waited and did not speak." | **ZH-JARGON-干擾** — "loud / ran 是干擾" | Rewrite: "waited and did not speak = 等著,沉默著。奶奶說這句話的時候,院子特別靜。" | no |

---

## C. 統計

### Violation type breakdown

| Type | Count | Chapter distribution |
|------|-------|---------------------|
| **ZH-JARGON-干擾** | **33** | Ch5=5, Ch6=15, Ch7=13 |
| EN-IPA | 6 | Ch5=6, Ch6=0, Ch7=0 |
| ZH-JARGON-UX打字 | 1 | Ch5=1 |
| ZH-JARGON-名詞 | 1 | Ch5=1 |
| ZH-JARGON-衝突點 | 1 | Ch5=1 |
| ZH-JARGON-常考 | 1 | Ch5=1 |
| ZH-JARGON-動詞 | 1 | Ch5=1 |
| EN-CHOICE | 1 | Ch6=1 |
| **TOTAL** | **45** | |

### Per-chapter tap-tiles scope

| Ch | tap-tiles total | with 干擾 jargon | fix rate needed |
|----|----------------|-----------------|----------------|
| Ch5 | 12 | 5 | 42% |
| Ch6 | 21 | 15 | 71% |
| Ch7 | 13 | 13 | 100% |
| **Sum** | **46** | **33** | **72%** |

Ch7 is worst: every single tap-tiles explanation in the chapter uses "是干擾". Ch6 is ~3 in 4.

### Root cause
The batch-AI agent that generated Ch5-7 content used the template `"順序: [word order]。[wrong tiles] 是干擾。"` as the default tap-tiles explanation. This template was appropriate for internal content generation QA but was never intended to be shown to learners. It exposes the test-design layer and breaks the "下班逃逸" story-immersion contract.

### Contrast: Ch5-7 well-done explanationZh examples (model voice)
- `kt-ch5-l20-q5`: "奶奶輕輕說:有時候軟一點,反而活得久 — 跟駱駝的硬脾氣剛好相反。" ✅
- `kt-ch7-l1-q5`: "每晚的固定行程,奶奶的院子是我的港口。" ✅
- `kt-ch6-l1-q1`: "今晚的空氣比平常重一點。Mochi: I shiver a little. 我抖了一下。" ✅
- `kt-ch7-l10-q3`: "她累壞了,挑了最小的床。" ✅

All four share the same structure: **character name + physical/emotional detail + 1 story-moment sentence**. No grammar terms, no test vocabulary.

---

## D. Top 5 P0

### ⚠️ P0-1 — Systemic "干擾" distractor-jargon in tap-tiles (33 instances, Ch5-7)
**What:** `explanationZh` for tap-tiles questions universally uses "X / Y 是干擾" — the Chinese psychometrics term for "distractors". This exposes the test-design layer to learners in a product whose entire brand proposition is "下班逃逸" (bedtime story, not exam prep). A Taiwanese learner seeing "是干擾" reads: "this is like studying for TOEIC". That is the opposite of the intended emotional register.
**Scope:** 33/46 tap-tiles Qs across Ch5-7 (72%). Ch7 = 100% affected.
**Fix pattern:** Replace "順序: W1→W2→W3。[X] 是干擾。" with a 1-2 sentence story beat that (a) anchors the key word in the scene, (b) names the character in context. See full fix table column "修法" above.
**Effort:** ~45 min batch rewrite (no audio regen — explanationZh is display-only).
**Audio regen:** No.

### ⚠️ P0-2 — EN-IPA phonetic notation (6 instances, Ch5 only)
**What:** Six Ch5 explanations embed IPA symbols: `/ˈleɪzi/`, `/eɪdʒ/`, `/ˈkæri/`, `/ˈkæməl/`, `/puːl/`, `/ˈiːtɪŋ/`. IPA is linguistics-course register. Most Taiwanese A2 learners cannot read IPA; for those who can, it signals "this is a phonetics drill", not a bedtime story. Duolingo Stories never uses IPA in explanations.
**Scope:** All Ch5 (none in Ch6-7, suggesting a different batch agent was used for Ch5's phonology Qs).
**Fix pattern:** Remove IPA entirely; replace with story-moment context + simple pronunciation hint if needed (e.g. "lazy = 懶的。讀作 LAY-zee,跟貓懶洋洋的樣子很配。").
**Effort:** ~15 min. No audio regen.

### ⚠️ P0-3 — Exam-prep register: "常考發音陷阱" + "衝突點" + "打字練聽" (3 instances)
**What:** Three explanations use explicit exam-prep or UX-mechanic vocabulary:
- `kt-ch5-l10-q1`: "常考發音陷阱" — sounds like a TOEIC coaching note
- `kt-ch5-l5-q5`: "這就是 Kipling 故事的衝突點" — literary-analysis register
- `kt-ch5-l1-q3`: "打字練聽" — references game mechanic explicitly (previous v1.9.49 audit fixed this in Ch1; regressed in Ch5)
**Fix:** Remove register-breaking phrases; replace with story-voice narration as shown in column "修法".
**Audio regen:** No.

### P0-4 — EN-CHOICE jargon embedded in ZH explanation (1 instance)
**What:** `kt-ch6-l7-q6` explanationZh: "she has no choice = 沒得選". The English "no choice" is embedded before its translation, creating an awkward EN=ZH glossary format that feels like a language-learning flashcard rather than a story insight.
**Fix:** "沒得選。家裡沒有火光,只有她能去。繼母知道這點。"
**Audio regen:** No.

### P0-5 — Story callback absence: explanations that define without anchoring (6 Ch5 IPA instances + 11 dry tap-tiles)
**What:** Beyond the jargon flags, 17 additional explanations across Ch5-7 have correct vocabulary definitions but zero story anchoring — they do not name the character, the scene, or the emotional beat. While these do not fail any hard rule, they fail the brand's "Grandma whispering to Mochi" register.
**Examples:**
- `kt-ch6-l3-q4 brave`: "brave = 勇敢。順序:The brave girl wins in the end。loud 是干擾字。" → has the word, lacks the character moment
- `kt-ch6-l5-q3 pocket`: "pocket = 口袋。娃娃一直跟著她,沒人看見。" ✅ (this one is GOOD — names the character + secret)
**Pattern:** The good explanations anchor word → character → 1 emotional detail. The weak ones stop at word → definition.
**Fix:** Add character name + scene detail per the story-voice model above. No audio regen.

---

## E. 3 Narrative Voice / Pacing Improvements

### NV-1 — "Grandma-whisper" register for Ch7's silence theme
Ch7 (六隻天鵝) is built around the motif of silence — the princess cannot speak for years. Yet explanationZh for the repeated "did not speak" / "silent" / "not a word" tap-tiles (L13/L15/L17) all read identically. The story has a cumulative emotional weight to silence that the explanations ignore.

**Recommendation:** Vary the explanationZh across the three lessons to escalate the emotional register:
- L13: "一個字都沒說。她記得承諾:六件衫做完前不能開口。" (exposition — she just started)
- L15: "就算王后逼問,她也只是低頭繼續織。" (tension — someone is pressing her)
- L17: "第十七課了,沉默還在。她的手沒有停過。" (culmination — acknowledge the journey)

### NV-2 — Kipling "O Best Beloved" second-person register not reflected
Ch5 covers the Kipling story where the narrative voice is famously "O Best Beloved" — direct second-person address to the child reader. The current explanationZh uses third-person or neutral voice throughout (e.g. "精靈一句話切到重點"). None of the Ch5 tap-tiles explanations echo Kipling's playful narrative voice.

**Recommendation:** Inject one or two Ch5 explanations that pick up the Kipling register as if Grandma is speaking it:
- `kt-ch5-l13-q3`: "Djinn = 沙漠精靈。Kipling 說:牠住在沙漠的中間,管著所有偷懶的動物。今晚就換你聽聽。" (Grandma-to-Mochi voice echoing storyteller's direct address)

### NV-3 — Outro lessons (L24-L25) lack Mochi's emotional farewell note
Ch6-L24 and Ch7-L25 are the outro lessons where Mochi jumps off the wall and goes home. The current tap-tiles explanationZh treats these the same as mid-chapter action sentences (pure word-order + 干擾). The outro should feel like a narrative breath — a gentle landing.

**Recommendation:** For all outro `tap-tiles` Qs (L24 in each chapter), the explanationZh should acknowledge the story-closing moment:
- `kt-ch6-l24-q4` "I jump down and walk home tonight." → "今晚聽到 Vasilisa 走出了黑森林。我跳下牆,步伐比平常輕。" (story echo → character action → micro-emotional close)
- `kt-ch7-l24-q5` "I walk home in the quiet night." → "六隻天鵝都變回了人。我走在靜靜的夜裡,一句話也不說 — 就像她們一樣。" (poetic callback to chapter's silence motif)

---

## F. validate-lessons.js upgrade recommendation (angle #12 specific)

Add this rule to catch P0-1 systematically:

```javascript
// X5_DISTRACTOR_JARGON
if (q.explanationZh && q.explanationZh.includes('是干擾')) {
  issues.push(`${lessonId} ${q.id}: X5_DISTRACTOR_JARGON (explanationZh names test distractors)`);
}
// X6_IPA_IN_EXPLANATION
if (q.explanationZh && /\/[ˈˌ]?[a-zA-ZæɪɛɔʊəɑΕΙΟΩ]+[ˈˌ]?\//.test(q.explanationZh)) {
  issues.push(`${lessonId} ${q.id}: X6_IPA_IN_EXPLANATION (IPA in learner-facing explanation)`);
}
```

These would have surfaced P0-1 (33 instances) and P0-2 (6 instances) automatically, saving ~30 min of manual scan.

---

*Audit by Claude (claude-sonnet-4-6) — 2026-06-01 18:08 UTC. No src/ or lessons-*.json modified.*
