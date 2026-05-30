# Ch1 拾光 spec — 雨夜小貓 (A Story in the Yard)

Canonical reference spec. All Ch2-Ch8 agents follow this format.

## Story arc

Mochi(三花流浪貓)每晚跳上奶奶的矮牆。奶奶坐在搖椅上開書、Hana(柴犬)趴腳邊。今晚奶奶說的故事 → meta-anchor:**這個故事是關於 Mochi 她自己**。

外層 framework:Mochi 1st-person 介紹自己、Hana、奶奶的院子。3 lessons 鋪設世界觀。

內層 main story:**奶奶很久前的雨夜**。她遇見一隻濕透的小貓(就是 Mochi 當時)。沒帶回家但開傘擋雨給小貓躲。小貓從此每晚都回來。15 lessons 敘述這段相遇 → 信任 → 慣性。POV 切換奶奶 1st-person("I saw a small cat...")但 Mochi 隔層敘事(她正聽著自己的故事)。

Aesop sides per CLAUDE.md: **螞蟻與蚱蜢**(勤勞 vs 懶散)+ **北風與太陽**(柔勝於強)。2 + 2 lessons.

外層 outro:Mochi 反思故事 → 跳回街上。"Goodnight Grandma. Goodnight Hana. See you tomorrow."

番外 lesson:Hana 醒著問奶奶:「Grandma, why did you open the umbrella that night?」/ Mochi 問:「Could I have died if you didn't help me?」 奶奶解釋(in story-voice + 帶溫度)。短故事章節用這個 lesson 平衡 lesson 數;Ch1 雖然 story 不短也保留番外加深角色關係。

## Lesson outline (25 lessons / 150 Q)

| # | Title | Beat | Types | Q | Difficulty |
|---|-------|------|-------|---|---|
| 1 | I am Mochi | Mochi 介紹自己 (stray cat) | listen-mc + listen-comprehension | 5 | easy |
| 2 | Grandma's yard | 每晚跳上矮牆 | listen-mc + read-mc-with-audio | 5 | easy |
| 3 | My friend Hana | Hana 是奶奶的狗 | listen-comprehension + tap-tiles | 5 | easy |
| 4 | Tonight's story | 奶奶開書、燈光暖 | listen-mc + listen-comprehension | 6 | easy |
| 5 | Long ago | "很久以前" 故事開場 | listen-mc + listen-comprehension | 6 | easy |
| 6 | A rainy night | 雨夜場景 | listen-comprehension + tap-tiles | 6 | easy-medium |
| 7 | I saw a small cat | 奶奶第一次看到貓 | listen-mc + tap-tiles | 6 | medium |
| 8 | She was wet | 小貓濕透了 | listen-comprehension + tap-tiles | 6 | medium |
| 9 | I opened my umbrella | 奶奶開傘擋雨 | listen-mc + listen-comprehension | 6 | medium |
| 10 | She did not run | 小貓沒逃 | listen-comprehension + tap-tiles | 6 | medium |
| 11 | She sat by my feet | 小貓蹲在奶奶腳邊 | listen-mc + listen-comprehension | 6 | medium |
| 12 | The next night | 第二晚 | listen-mc + tap-tiles | 6 | medium |
| 13 | She came back | 小貓回來了 | listen-mc + tap-tiles + listen-comprehension | 6 | medium-hard |
| 14 | I gave her some milk | 奶奶給牛奶 | listen-mc + listen-comprehension | 6 | medium |
| 15 | She purred softly | 貓開始 purr | listen-comprehension + tap-tiles | 6 | medium |
| 16 | Every night since | 從此每晚 | listen-mc + listen-comprehension | 6 | medium-hard |
| 17 | I never named her | 奶奶沒給名字 | listen-comprehension + tap-tiles | 6 | medium-hard |
| 18 | But she is my friend | 但她是朋友 | listen-mc + tap-tiles + listen-comprehension | 6 | medium-hard |
| 19 | The ant and the grasshopper part 1 | Aesop A — 螞蟻準備 | listen-mc + read-mc-with-audio | 5 | easy |
| 20 | The ant and the grasshopper part 2 | Aesop A — 蚱蜢飢餓 | listen-mc + listen-comprehension | 5 | easy |
| 21 | The north wind and the sun part 1 | Aesop B — 風吹強 | listen-mc + listen-comprehension | 5 | easy |
| 22 | The north wind and the sun part 2 | Aesop B — 太陽溫暖 | listen-mc + listen-comprehension | 5 | easy |
| 23 | The story ends | 奶奶合書 | listen-comprehension + read-mc-with-audio | 5 | medium |
| 24 | Hana asks grandma (番外) | Hana: "Why did you open the umbrella?" | listen-comprehension + listen-mc | 10 | easy-medium |
| 25 | Words to remember (review) | 25 tap-pair 配對 Ch1 重要詞 | tap-pairs | 5 | easy |

## First 6 lessons FULL Q data (sample)

### Lesson 1 (outer-prologue 1): "I am Mochi"

```json
[
  {
    "id": "kt-ch1-l1-q1",
    "type": "listen-mc",
    "sentence": "I am {catName}.",
    "question": "What is the cat's name?",
    "options": ["Mochi", "Maru", "Momo", "Mimi"],
    "correctIndex": 0,
    "explanationZh": "Mochi(糰糰)就是我。我是說故事的這隻三花貓。其他三個是音近的混淆選項。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "intro"]
  },
  {
    "id": "kt-ch1-l1-q2",
    "type": "listen-mc",
    "sentence": "I am a ___ cat.",
    "question": "What kind of cat am I?",
    "options": ["stray", "stay", "straw", "story"],
    "correctIndex": 0,
    "explanationZh": "stray = 流浪的(沒有固定主人的)。我是一隻流浪貓。stay/straw/story 都是 st- 開頭的同音陷阱字。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "vocab-stray"]
  },
  {
    "id": "kt-ch1-l1-q3",
    "type": "listen-comprehension",
    "sentence": "I am a stray cat.",
    "question": "Where does Mochi live?",
    "options": ["On the streets", "In a house", "In a tree", "Under the sea"],
    "correctIndex": 0,
    "explanationZh": "stray cat = 流浪貓,所以住在街上(on the streets)。陷阱:in a house(普通家貓,不符 stray)、in a tree(部分對 — 貓有時爬樹)、under the sea(明顯離題)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "inference"]
  },
  {
    "id": "kt-ch1-l1-q4",
    "type": "listen-mc",
    "sentence": "I have no ___.",
    "question": "What does Mochi not have?",
    "options": ["home", "hope", "head", "hand"],
    "correctIndex": 0,
    "explanationZh": "home = 家。我是流浪貓所以沒有家。hope(希望,語意陷阱 — 我並沒有失去希望)、head(頭,我當然有)、hand(手,部分對 — 貓沒有手而是有 paws,但題目問的是 home)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "vocab-home"]
  },
  {
    "id": "kt-ch1-l1-q5",
    "type": "listen-comprehension",
    "sentence": "But I am not alone.",
    "question": "How does Mochi feel?",
    "options": ["Not alone", "Very alone", "Hungry", "Asleep"],
    "correctIndex": 0,
    "explanationZh": "not alone = 不孤單(其實有奶奶跟 Hana 陪伴)。陷阱 very alone 是反義詞同類陷阱、hungry(餓 — 部分對因為流浪貓常餓但題目重點不是)、asleep(明顯離題)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "feeling"]
  }
]
```

### Lesson 2 (outer-prologue 2): "Grandma's yard"

```json
[
  {
    "id": "kt-ch1-l2-q1",
    "type": "listen-mc",
    "sentence": "Every night I visit Grandma's ___.",
    "question": "Where does Mochi go every night?",
    "options": ["yard", "yarn", "year", "yes"],
    "correctIndex": 0,
    "explanationZh": "yard = 院子。我每晚都去奶奶的院子。陷阱都是 y- 開頭聽力區辨字。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "vocab-yard"]
  },
  {
    "id": "kt-ch1-l2-q2",
    "type": "read-mc-with-audio",
    "sentence": "I jump over the wall.",
    "question": "How does Mochi get into the yard?",
    "options": ["She jumps over the wall", "She walks through the door", "She digs under the fence", "She climbs a tree"],
    "correctIndex": 0,
    "explanationZh": "jump over the wall = 跳過矮牆。陷阱:walk through door(部分對 — 奶奶從門進)、dig under fence(同類陷阱 — 動物進入方式)、climb tree(離題)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "action"]
  },
  {
    "id": "kt-ch1-l2-q3",
    "type": "listen-mc",
    "sentence": "Grandma sits in her ___ chair.",
    "question": "What does Grandma sit in?",
    "options": ["rocking", "rolling", "running", "raining"],
    "correctIndex": 0,
    "explanationZh": "rocking chair = 搖搖椅。陷阱都是 r-ing 形容詞讓聽力區辨。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "vocab-rocking"]
  },
  {
    "id": "kt-ch1-l2-q4",
    "type": "read-mc-with-audio",
    "sentence": "She holds a story book.",
    "question": "What does Grandma hold?",
    "options": ["A story book", "A coffee cup", "A flower", "A phone"],
    "correctIndex": 0,
    "explanationZh": "story book = 故事書。奶奶今晚要說故事所以拿著書。陷阱:cup(同類 — 奶奶可能也喝茶 partial truth)、flower(同類室外物)、phone(完全離題,奶奶年紀大不太用手機)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "vocab-book"]
  },
  {
    "id": "kt-ch1-l2-q5",
    "type": "listen-mc",
    "sentence": "The yard is ___ and safe.",
    "question": "How is the yard at night?",
    "options": ["quiet", "queen", "queue", "quack"],
    "correctIndex": 0,
    "explanationZh": "quiet = 安靜的。陷阱 q- 開頭聽力區辨字。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "feeling"]
  }
]
```

### Lesson 3 (outer-prologue 3): "My friend Hana"

```json
[
  {
    "id": "kt-ch1-l3-q1",
    "type": "listen-comprehension",
    "sentence": "Hana is Grandma's brown dog.",
    "question": "Who is Hana?",
    "options": ["Grandma's dog", "Grandma's cat", "Mochi's sister", "Grandma's grandchild"],
    "correctIndex": 0,
    "explanationZh": "Hana(花花)是 Grandma's dog(奶奶養的狗)— 一隻棕色柴犬。我是她的朋友。陷阱 cat(同類動物)、sister(部分對 — 我們是朋友類關係)、grandchild(明顯離題)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "character"]
  },
  {
    "id": "kt-ch1-l3-q2",
    "type": "tap-tiles",
    "sentence": "Hana lies on the floor.",
    "tiles": ["Hana", "lies", "on", "the", "floor", "sky", "wall"],
    "correctOrder": [0, 1, 2, 3, 4],
    "question": "Tap to build the sentence",
    "options": ["Hana", "lies", "on", "the"],
    "correctIndex": 0,
    "explanationZh": "Hana lies on the floor(花花趴在地上)。組句陷阱:sky(離題位置)、wall(部分對 — 我跳上 wall 但 Hana 不會)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "tap-tiles"]
  },
  {
    "id": "kt-ch1-l3-q3",
    "type": "listen-mc",
    "sentence": "She wags her ___.",
    "question": "What does Hana wag?",
    "options": ["tail", "tale", "tell", "tile"],
    "correctIndex": 0,
    "explanationZh": "tail = 尾巴。柴犬的卷尾搖晃。陷阱都是 t- 開頭聽力區辨字。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "vocab-tail"]
  },
  {
    "id": "kt-ch1-l3-q4",
    "type": "tap-tiles",
    "sentence": "We listen to Grandma's story.",
    "tiles": ["We", "listen", "to", "Grandma's", "story", "song", "sister"],
    "correctOrder": [0, 1, 2, 3, 4],
    "question": "Tap to build the sentence",
    "options": ["We", "listen", "to", "Grandma's"],
    "correctIndex": 0,
    "explanationZh": "We listen to Grandma's story(我們聽奶奶說故事)。組句陷阱:song(同類 — 也可聽)、sister(明顯離題)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "tap-tiles"]
  },
  {
    "id": "kt-ch1-l3-q5",
    "type": "listen-comprehension",
    "sentence": "Hana is calm. Hana never barks at me.",
    "question": "How does Hana feel about Mochi?",
    "options": ["Calm and friendly", "Angry and barking", "Hungry and tired", "Sleepy and bored"],
    "correctIndex": 0,
    "explanationZh": "calm and friendly = 平靜友善的。Hana 不會吠我,我們是朋友。陷阱:angry/barking(同類但相反)、hungry(部分 — 但跟 Mochi 關係無關)、sleepy(離題)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "outer", "feeling"]
  }
]
```

### Lesson 4 (main-story 1): "Tonight's story"

```json
[
  {
    "id": "kt-ch1-l4-q1",
    "type": "listen-mc",
    "sentence": "Grandma opens the ___.",
    "question": "What does Grandma open?",
    "options": ["book", "boat", "bell", "bird"],
    "correctIndex": 0,
    "explanationZh": "book = 書。奶奶開故事書。陷阱都是 b- 開頭聽力區辨。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "vocab-book"]
  },
  {
    "id": "kt-ch1-l4-q2",
    "type": "listen-comprehension",
    "sentence": "Tonight's story is about a small cat.",
    "question": "What is tonight's story about?",
    "options": ["A small cat", "A big dog", "An old man", "A new car"],
    "correctIndex": 0,
    "explanationZh": "today's story = a small cat(關於一隻小貓)。陷阱:dog(同類動物 — 故事可能有但不是主角)、old man(部分 — 故事 setting 有可能但不對)、car(明顯離題 — 奶奶不會講車子故事)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "comprehension"]
  },
  {
    "id": "kt-ch1-l4-q3",
    "type": "listen-mc",
    "sentence": "Grandma says, \"Listen carefully.\"",
    "question": "What does Grandma ask us to do?",
    "options": ["Listen carefully", "Run away", "Eat dinner", "Go to sleep"],
    "correctIndex": 0,
    "explanationZh": "listen carefully = 仔細聽。奶奶要我們專注。陷阱:run(離題行動)、eat dinner(部分 — 我們可能等等吃飯)、sleep(部分 — 之後會睡但不是現在)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "imperative"]
  },
  {
    "id": "kt-ch1-l4-q4",
    "type": "listen-comprehension",
    "sentence": "I lean closer to Hana.",
    "question": "What does Mochi do?",
    "options": ["Get closer to Hana", "Run to the wall", "Climb the tree", "Hide under the chair"],
    "correctIndex": 0,
    "explanationZh": "lean closer = 靠近。我靠近 Hana 一起聽。陷阱:run to wall(離題)、climb tree(部分 — 貓常爬樹)、hide(部分 — 害羞貓會躲,但我沒)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "action"]
  },
  {
    "id": "kt-ch1-l4-q5",
    "type": "listen-mc",
    "sentence": "The yard is very ___.",
    "question": "How is the yard now?",
    "options": ["quiet", "noisy", "bright", "wet"],
    "correctIndex": 0,
    "explanationZh": "quiet = 安靜。聽故事前院子很安靜。陷阱:noisy(同類 — 反義)、bright(部分 — 月光下其實還有點亮)、wet(部分 — 今晚沒下雨,陷阱)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "setting"]
  },
  {
    "id": "kt-ch1-l4-q6",
    "type": "listen-comprehension",
    "sentence": "Grandma's voice is soft and warm.",
    "question": "How does Grandma's voice sound?",
    "options": ["Soft and warm", "Loud and sharp", "Tired and sad", "Fast and shaky"],
    "correctIndex": 0,
    "explanationZh": "soft and warm = 溫柔且溫暖。奶奶說故事的聲音特質。陷阱:loud/sharp(同類 — 反義)、tired/sad(同類 — 老人可能但不是這刻)、fast/shaky(同類 — 不符)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "voice"]
  }
]
```

### Lesson 5 (main-story 2): "Long ago"

```json
[
  {
    "id": "kt-ch1-l5-q1",
    "type": "listen-mc",
    "sentence": "Long ago, on a rainy ___.",
    "question": "When did the story happen?",
    "options": ["night", "noon", "morning", "year"],
    "correctIndex": 0,
    "explanationZh": "long ago, on a rainy night(很久以前的雨夜)。陷阱:noon/morning(同類時段)、year(時段單位但太籠統)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "time-setting"]
  },
  {
    "id": "kt-ch1-l5-q2",
    "type": "listen-comprehension",
    "sentence": "Long ago, on a rainy night, I saw a small cat.",
    "question": "What kind of night was it?",
    "options": ["A rainy night", "A snowy night", "A sunny morning", "A foggy afternoon"],
    "correctIndex": 0,
    "explanationZh": "a rainy night = 雨夜。陷阱:snowy/foggy(同類天氣字)、sunny morning(同類但時段也錯,雙重陷阱)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "weather"]
  },
  {
    "id": "kt-ch1-l5-q3",
    "type": "listen-mc",
    "sentence": "It was a ___ ago.",
    "question": "How long ago was the story?",
    "options": ["long time", "short time", "year", "moment"],
    "correctIndex": 0,
    "explanationZh": "a long time ago = 很久以前。陷阱:short time(同類 — 反義)、year(部分 — 但不夠久遠)、moment(剎那 — 反義 + 不合搭配)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "time"]
  },
  {
    "id": "kt-ch1-l5-q4",
    "type": "listen-comprehension",
    "sentence": "The rain was heavy and cold.",
    "question": "How was the rain?",
    "options": ["Heavy and cold", "Light and warm", "Loud and red", "Slow and small"],
    "correctIndex": 0,
    "explanationZh": "heavy and cold = 大且冷。陷阱:light/warm(同類 — 反義)、loud/red(部分 — 雨可以 loud 但 red 不合)、slow/small(同類但不對應)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "weather-detail"]
  },
  {
    "id": "kt-ch1-l5-q5",
    "type": "listen-comprehension",
    "sentence": "I walked through the rain to come home.",
    "question": "Who is the 'I' in this sentence?",
    "options": ["Grandma (the storyteller)", "Mochi (the cat)", "Hana (the dog)", "A friend"],
    "correctIndex": 0,
    "explanationZh": "這裡的 I 是奶奶 — 因為這是奶奶說的故事,故事裡的 I 就是奶奶自己當年的視角。Mochi 是後面出現的小貓。雙層 POV:Mochi 聽奶奶說奶奶的故事。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "main", "pov-shift"]
  },
  {
    "id": "kt-ch1-l5-q6",
    "type": "listen-mc",
    "sentence": "I held my ___ over my head.",
    "question": "What did Grandma hold?",
    "options": ["umbrella", "umbra", "under", "useful"],
    "correctIndex": 0,
    "explanationZh": "umbrella = 傘。奶奶撐傘在雨中走路。陷阱都是 u- 開頭聽力區辨字。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "main", "vocab-umbrella"]
  }
]
```

### Lesson 6 (main-story 3): "A rainy night"

```json
[
  {
    "id": "kt-ch1-l6-q1",
    "type": "listen-comprehension",
    "sentence": "The street was empty.",
    "question": "What was the street like?",
    "options": ["No one was there", "Many people walked", "Many cars passed", "A dog ran past"],
    "correctIndex": 0,
    "explanationZh": "empty = 空的(沒人在街上)。陷阱:many people(同類 — 反義)、many cars(同類 — 街上事物)、a dog(部分 — 動物在街,但雨夜空蕩無動物)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "main", "setting"]
  },
  {
    "id": "kt-ch1-l6-q2",
    "type": "tap-tiles",
    "sentence": "Then I heard a small cry.",
    "tiles": ["Then", "I", "heard", "a", "small", "cry", "song"],
    "correctOrder": [0, 1, 2, 3, 4, 5],
    "question": "Tap to build the sentence",
    "options": ["Then", "I", "heard", "a"],
    "correctIndex": 0,
    "explanationZh": "Then I heard a small cry(然後我聽見一聲小小的叫聲)。組句陷阱:song(同類聲音 — 但場景不對)。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "main", "tap-tiles"]
  },
  {
    "id": "kt-ch1-l6-q3",
    "type": "listen-mc",
    "sentence": "It came from a ___ box.",
    "question": "Where did the cry come from?",
    "options": ["box", "box", "boat", "bone"],
    "correctIndex": 0,
    "explanationZh": "box = 紙箱。叫聲從箱子裡傳來。陷阱:bus(同類 — 街上常見)、boat(同類但離題)、bone(離題 — 骨頭不會 cry)。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "main", "vocab-box"]
  },
  {
    "id": "kt-ch1-l6-q4",
    "type": "listen-comprehension",
    "sentence": "I walked closer to the box.",
    "question": "What did Grandma do?",
    "options": ["She got closer", "She ran away", "She called the police", "She opened her umbrella higher"],
    "correctIndex": 0,
    "explanationZh": "got closer = 靠近。奶奶好奇靠近。陷阱:ran away(同類 — 反義)、called police(部分 — 一些人會但奶奶沒)、opened umbrella higher(部分 — 她正撐傘但這刻動作是靠近)。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "main", "action"]
  },
  {
    "id": "kt-ch1-l6-q5",
    "type": "tap-tiles",
    "sentence": "Inside was a tiny cat.",
    "tiles": ["Inside", "was", "a", "tiny", "cat", "dog", "bird"],
    "correctOrder": [0, 1, 2, 3, 4],
    "question": "Tap to build the sentence",
    "options": ["Inside", "was", "a", "tiny"],
    "correctIndex": 0,
    "explanationZh": "Inside was a tiny cat(裡面是一隻小貓)。組句陷阱:dog/bird(同類動物 — 都可能在箱裡)。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "main", "tap-tiles"]
  },
  {
    "id": "kt-ch1-l6-q6",
    "type": "listen-comprehension",
    "sentence": "The cat was very wet and cold.",
    "question": "How was the cat?",
    "options": ["Wet and cold", "Dry and warm", "Big and angry", "Old and slow"],
    "correctIndex": 0,
    "explanationZh": "wet and cold = 濕且冷。雨夜的小貓在紙箱裡。陷阱:dry/warm(同類 — 反義)、big/angry(同類但不對 — 是 tiny + scared)、old/slow(同類描述但是小貓不老)。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "main", "feeling-physical"]
  }
]
```

## Vocab key (Ch1 introduces 28 new A2 words)

stray, yard, jump, wall, rocking chair, book, friend, dog, brown, tail, listen, story, open, rainy, night, long ago, heavy, cold, umbrella, empty, hear, cry, box, closer, tiny, wet, scared, gave, milk, every, brave

## TOEIC parity audit

| Lesson | TOEIC Part inspiration | Why |
|---|---|---|
| 1-3 | Part 1 (description-style) | Concrete subject in simple sentence |
| 4-6 | Part 3-4 (story comprehension) | Narrative listening + Q |
| 7-12 | Part 2 (short Q-response) | Inference Q about scenarios |
| 13-18 | Part 3-4 (long talk inference) | Multi-fact retrieval |
| 19-22 | Part 5 (sentence cloze) | Vocab cloze fits Aesop short tales |
| 23-24 | Part 3 (conversation) | Dialogue Q&A format |
| 25 | Vocabulary review | Like flashcard drilling (no TOEIC analog) |

## Bonus 番外 lesson 24: "Hana asks Grandma"

10-Q dialogue exchange. Hana 跟 Mochi 問,奶奶回答。Mochi POV reflects (since she's still listening).

```json
[
  {
    "id": "kt-ch1-l24-q1",
    "type": "listen-comprehension",
    "sentence": "Hana asks: \"Grandma, why did you open the umbrella that night?\"",
    "question": "Who is asking the question?",
    "options": ["Hana", "Mochi", "Grandma", "A stranger"],
    "correctIndex": 0,
    "explanationZh": "Hana(花花)在問。她也好奇那個雨夜為什麼奶奶會撐傘給陌生小貓。陷阱都是同類角色。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "bonus", "dialogue"]
  },
  {
    "id": "kt-ch1-l24-q2",
    "type": "listen-mc",
    "sentence": "Grandma smiles. \"Because she was ___.\"",
    "question": "Why did Grandma open her umbrella?",
    "options": ["alone", "asleep", "angry", "awake"],
    "correctIndex": 0,
    "explanationZh": "alone = 獨自一人。奶奶看見小貓孤單。陷阱都是 a- 開頭聽力區辨字。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "bonus", "vocab-alone"]
  },
  {
    "id": "kt-ch1-l24-q3",
    "type": "listen-comprehension",
    "sentence": "\"A small life needs help on a cold night.\"",
    "question": "What does Grandma mean?",
    "options": ["Small lives matter", "Cold is dangerous only for big animals", "Help is only for friends", "Cats can take care of themselves"],
    "correctIndex": 0,
    "explanationZh": "small life needs help = 小生命需要幫助。奶奶的人生哲學。陷阱都是反語意陷阱。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "bonus", "moral"]
  },
  {
    "id": "kt-ch1-l24-q4",
    "type": "listen-comprehension",
    "sentence": "Mochi thinks: \"Could I have died if she did not help?\"",
    "question": "What is Mochi wondering?",
    "options": ["If she might have died", "If she should have run", "If grandma would have eaten her", "If hana would have barked"],
    "correctIndex": 0,
    "explanationZh": "could I have died = 我可能會死掉嗎。Mochi 反思過去的險境。陷阱:run(同類 — 她可能逃走但太冷)、grandma eat her(明顯離題)、hana bark(部分 — 但 Hana 個性溫和不會)。",
    "difficulty": "medium-hard",
    "tags": ["story", "ch1", "bonus", "self-reflection"]
  },
  {
    "id": "kt-ch1-l24-q5",
    "type": "listen-mc",
    "sentence": "Grandma touches my head. \"You're ___ now.\"",
    "question": "What does Grandma say?",
    "options": ["safe", "sad", "sick", "sleepy"],
    "correctIndex": 0,
    "explanationZh": "safe = 安全的。奶奶輕拍我頭說「你現在安全了」。陷阱都是 s- 開頭聽力區辨字。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "bonus", "vocab-safe"]
  },
  {
    "id": "kt-ch1-l24-q6",
    "type": "listen-comprehension",
    "sentence": "Hana wags her tail in agreement.",
    "question": "What does Hana do?",
    "options": ["She agrees by wagging", "She barks loudly", "She runs away", "She falls asleep"],
    "correctIndex": 0,
    "explanationZh": "wags her tail = 搖尾巴(同意/開心的訊號)。陷阱:bark(同類 — 也是狗的聲音但不對)、run away(離題)、asleep(部分 — 她常趴著但這刻醒)。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "bonus", "body-language"]
  },
  {
    "id": "kt-ch1-l24-q7",
    "type": "listen-mc",
    "sentence": "Mochi asks: \"Why did you not bring me home?\"",
    "question": "Who is asking?",
    "options": ["Mochi", "Hana", "Grandma", "The narrator"],
    "correctIndex": 0,
    "explanationZh": "Mochi 終於問出心底問題。陷阱都是同類人物。",
    "difficulty": "easy",
    "tags": ["story", "ch1", "bonus", "self-question"]
  },
  {
    "id": "kt-ch1-l24-q8",
    "type": "listen-comprehension",
    "sentence": "Grandma replies: \"Because freedom is also love.\"",
    "question": "What does Grandma mean?",
    "options": ["Letting you go shows love", "Houses are bad places", "Cats hate humans", "Rain made her sad"],
    "correctIndex": 0,
    "explanationZh": "freedom is also love = 自由也是愛。奶奶尊重 Mochi 是流浪貓的天性,不強留就是另一種愛。陷阱都是誤解奶奶意思的選項。",
    "difficulty": "hard",
    "tags": ["story", "ch1", "bonus", "philosophy"]
  },
  {
    "id": "kt-ch1-l24-q9",
    "type": "listen-mc",
    "sentence": "I purr softly and ___ on her foot.",
    "question": "What does Mochi do at the end?",
    "options": ["rest", "rust", "rush", "row"],
    "correctIndex": 0,
    "explanationZh": "rest = 休息。Mochi 在奶奶腳邊輕輕休息。陷阱都是 r- 開頭聽力區辨字。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "bonus", "vocab-rest"]
  },
  {
    "id": "kt-ch1-l24-q10",
    "type": "listen-comprehension",
    "sentence": "I understand now. I am free, and I am loved.",
    "question": "What does Mochi feel?",
    "options": ["Free and loved", "Lost and lonely", "Hungry and cold", "Bored and tired"],
    "correctIndex": 0,
    "explanationZh": "free and loved = 自由且被愛。Ch1 番外的情感峰值。陷阱都是反義或同類負面詞。",
    "difficulty": "medium",
    "tags": ["story", "ch1", "bonus", "feeling-resolution"]
  }
]
```

## Status

- 8 Q already in `public/story-kitten.json` (legacy Q1-Q8 = lessons 1+5 sample equivalents)
- 142 Q remaining to author for Ch1 v2.0 expansion
- All 25 lessons follow above pattern
- Audio generation deferred per user (will commit JSON first, then user reviews, then audio)
