# Pickup Chapter 2 — 桃太郎 (Momotaro) Content Spec

> Status: draft v0.1 (2026-05-31)
> Schema: Duolingo-nested (v2.0)
> Target: 25 lessons / ~150 Q / A2 level / TOEIC-parity listening
> Source-of-truth refs: `CLAUDE.md` Story Framework; `public/lessons-ch1.json` shape
> POV rule: outer-frame = Mochi 1st-person ("I"); inner-story = Grandma 1st-person narration ("I will tell you about a boy...")
> Doctrine: STRICT 1+1+1+1 distractor (correct / same-category trap / partial-truth trap / obvious-miss)

---

## 1. Story Arc (≤250 words)

Tonight Mochi jumps the low wall and finds Hana already waiting with her tail thumping the floor. Grandma sits with a new book, blue cover this time. "今晚是桃太郎," she says, opening to the first page. Mochi tucks her paws under her chest. Hana puts her chin on Grandma's foot.

The story begins long ago by a wide river. An old woman washes clothes there while her husband cuts grass on the hill. A giant peach floats downstream — round, pink, larger than a head. She carries it home. When the old man cuts it open with a knife, a baby boy is curled inside. They name him Momotaro, "Peach Boy." He grows fast, strong, and brave.

One day Momotaro hears that demons on Onigashima island steal food and gold from the village. He tells his parents he will go. His mother packs millet dumplings (kibi-dango) in a cloth. On the road he meets three animals — a dog, a monkey, a pheasant — and shares his dumplings. Each one joins him. Together they sail to the demon island. The demons are big and rough, but the team is clever. The pheasant pecks from the sky, the monkey climbs the wall, the dog bites the chief's leg, and Momotaro raises his sword. The demons give up. They return the gold and promise to be good.

Momotaro sails home rich. The old couple cries with joy. Grandma closes the book softly. Mochi looks at Hana. Hana looks back. "Were you the dog?" Mochi almost asks. Grandma scratches Hana's ear. "Goodnight, little ones."

**Grandma's voice**: calm, patient, "long ago" cadence. Uses simple past tense, names things twice ("a peach — a big pink peach"), pauses for Mochi to picture each beat.

**Inner→outer transitions**: Lessons 1-3 are Mochi watching Grandma open the book. Lessons 4-18 are Grandma's voice telling the tale (questions use Momotaro's world). Lessons 19-22 are Aesop side-stories Grandma threads in mid-evening ("That reminds me of the tortoise and the hare..."). Lessons 23-24 return to Mochi reacting on the wall. Lesson 25 (番外) is Hana and Mochi asking Grandma direct questions. Lesson 26 is review tap-pairs.

---

## 2. Lesson Outline Table

> Lesson position is held consistent across chapters: lesson N of Ch2 uses the same question-type pattern as lesson N of Ch1. Easier lessons skew toward listen-mc count; harder lessons fold in inference (listen-comprehension) and tap-tiles.

| # | Title | Story Beat | Question Types | Q Count | Difficulty |
|---|-------|------------|----------------|---------|------------|
| 1 | Tonight's Book | Mochi jumps the wall, sees blue book | listen-mc ×3, listen-comprehension ×2 | 5 | easy |
| 2 | Hana Is Already There | Hana waits, tail thumping | listen-mc ×2, tap-tiles ×1, listen-comprehension ×2 | 5 | easy |
| 3 | Grandma Opens the Book | "今晚是桃太郎" | listen-mc ×2, tap-tiles ×1, listen-comprehension ×2 | 5 | easy |
| 4 | Long Ago by a River | Setup: old couple, river, hill | listen-mc ×3, listen-comprehension ×3 | 6 | easy |
| 5 | A Giant Peach Floats | Peach drifts down to the old woman | listen-mc ×3, tap-tiles ×1, listen-comprehension ×2 | 6 | easy |
| 6 | She Carries It Home | Old woman brings the peach back | listen-mc ×2, tap-tiles ×2, listen-comprehension ×2 | 6 | easy |
| 7 | A Boy Inside | Knife, surprise, a baby cries | listen-mc ×3, listen-comprehension ×3 | 6 | easy |
| 8 | They Name Him Momotaro | "Peach Boy" — naming scene | listen-mc ×2, tap-tiles ×1, listen-comprehension ×3 | 6 | easy |
| 9 | He Grows Strong | Years pass, Momotaro is brave | listen-mc ×3, listen-comprehension ×3 | 6 | medium |
| 10 | News of the Demons | Village news, demons steal | listen-mc ×2, tap-tiles ×1, listen-comprehension ×3 | 6 | medium |
| 11 | I Will Go | Momotaro tells his parents | listen-mc ×2, listen-comprehension ×4 | 6 | medium |
| 12 | Millet Dumplings | Mother packs kibi-dango | listen-mc ×3, tap-tiles ×1, listen-comprehension ×2 | 6 | easy |
| 13 | A Dog on the Road | First companion | listen-mc ×3, listen-comprehension ×3 | 6 | easy |
| 14 | A Monkey in the Trees | Second companion | listen-mc ×3, listen-comprehension ×3 | 6 | easy |
| 15 | A Pheasant in the Sky | Third companion | listen-mc ×3, listen-comprehension ×3 | 6 | medium |
| 16 | Across the Sea | They sail to Onigashima | listen-mc ×2, tap-tiles ×2, listen-comprehension ×2 | 6 | medium |
| 17 | The Demon Gate | Approach the iron gate | listen-mc ×2, tap-tiles ×1, listen-comprehension ×3 | 6 | medium |
| 18 | The Demons Give Up | Battle, demons surrender | listen-mc ×2, listen-comprehension ×4 | 6 | hard |
| 19 | Aesop — The Tortoise (1) | Hare and tortoise begin | listen-mc ×2, tap-tiles ×1, listen-comprehension ×2 | 5 | easy |
| 20 | Aesop — The Tortoise (2) | Slow and steady wins | listen-mc ×2, listen-comprehension ×3 | 5 | medium |
| 21 | Aesop — The Wolf Cry (1) | Shepherd boy lies for fun | listen-mc ×2, tap-tiles ×1, listen-comprehension ×2 | 5 | easy |
| 22 | Aesop — The Wolf Cry (2) | Real wolf, no one comes | listen-mc ×2, listen-comprehension ×3 | 5 | medium |
| 23 | Mochi Listens | Mochi reacts on the wall | listen-mc ×2, tap-tiles ×1, listen-comprehension ×2 | 5 | easy |
| 24 | Grandma Closes the Book | Goodnight, see you tomorrow | listen-mc ×2, listen-comprehension ×3 | 5 | easy |
| 25 | 番外 — Hana Asks Grandma | Q&A dialogue (see §6) | listen-mc ×4, listen-comprehension ×6 | 10 | medium |
| 26 | Review | All Ch2 key vocab | tap-pairs ×5 | 5 | easy |

**Q total**: 15 + 90 + 20 + 10 + 10 + 5 = **150 Q across 26 lessons**

> Note: the brief asked for "25 lessons" — including review puts the chapter at 26. If strict 25 is required, fold review into lesson 24 (Grandma Closes the Book) or drop it for an in-map review checkpoint. Recommending the 26-with-review shape because review parity matches Ch1.

---

## 3. First 6 Lessons — Full Question Data

> All `{catName}` and `{dogName}` placeholders are runtime-substituted (defaults: Mochi / Hana).
> Distractor doctrine encoded as comment on each Q: `[C]` correct, `[S]` same-category, `[P]` partial-truth (mentioned in audio but not the answer), `[O]` obvious-miss.

### Lesson 1 — Tonight's Book

```json
{
  "id": "kt-ch2-l1",
  "chapter": 2,
  "lessonInChapter": 1,
  "segmentType": "outer-prologue",
  "storyId": "outer",
  "storyBeat": "{catName} 跳上矮牆,看到新書",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch2-l1-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "I jump on the wall again tonight.",
      "question": "Which word did you hear?",
      "options": ["tonight", "tomorrow", "the wall", "midnight"],
      "correctIndex": 0,
      "explanationZh": "tonight = 今晚。我每天天黑就來奶奶院子。[C tonight / P the wall / S tomorrow / O midnight]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l1-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma has a new book in blue.",
      "question": "What color is the book?",
      "options": ["blue", "red", "old", "open"],
      "correctIndex": 0,
      "explanationZh": "blue = 藍色。今晚奶奶換了一本藍色封面的書。[C blue / S red / P old / O open]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l1-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} is waiting by her chair.",
      "question": "Where is {dogName}?",
      "options": ["by her chair", "on the wall", "near the gate", "inside the house"],
      "correctIndex": 0,
      "explanationZh": "{dogName} 早就在奶奶椅子旁等了。[C by her chair / P on the wall / S near the gate / O inside the house]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l1-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "I see Grandma open a blue book tonight. {dogName} sits by her foot.",
      "question": "What is new tonight?",
      "options": ["the blue book", "the wall", "Grandma's chair", "the moon"],
      "correctIndex": 0,
      "explanationZh": "藍色封面是今晚的新東西,牆和椅子每晚都在。[C the blue book / P the wall / S Grandma's chair / O the moon]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l1-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma opens the book. She is ready to tell a story.",
      "question": "Why does she open the book?",
      "options": ["to tell a story", "to read alone", "to find a photo", "to clean it"],
      "correctIndex": 0,
      "explanationZh": "奶奶打開書是要說故事給我們聽。[C to tell a story / S to read alone / P to find a photo / O to clean it]",
      "tags": ["story", "ch2", "prologue"]
    }
  ]
}
```

### Lesson 2 — Hana Is Already There

```json
{
  "id": "kt-ch2-l2",
  "chapter": 2,
  "lessonInChapter": 2,
  "segmentType": "outer-prologue",
  "storyId": "outer",
  "storyBeat": "{dogName} 尾巴拍地等故事",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch2-l2-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} thumps her tail on the floor.",
      "question": "Which verb did you hear?",
      "options": ["thumps", "jumps", "wags", "stops"],
      "correctIndex": 0,
      "explanationZh": "thump = 拍打發出聲音。{dogName} 太開心,尾巴啪啪打地板。[C thumps / S wags / P jumps / O stops]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l2-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She is ready for the story.",
      "question": "How does she feel?",
      "options": ["ready", "tired", "ready to eat", "afraid"],
      "correctIndex": 0,
      "explanationZh": "ready = 準備好了。耳朵立起來,眼睛盯著書。[C ready / S tired / P ready to eat / O afraid]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch2-l2-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "I sit beside {dogName} on the floor.",
      "question": "Tap the tiles in order.",
      "tiles": ["I", "sit", "beside", "{dogName}", "on", "the", "floor", "wall", "fast"],
      "correctOrder": [0, 1, 2, 3, 4, 5, 6],
      "explanationZh": "我坐在 {dogName} 旁邊的地板上。wall / fast 是干擾。",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l2-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} sees me and her tail starts to move fast.",
      "question": "Why does her tail move?",
      "options": ["she is happy to see me", "she is cold", "she hears a car", "she wants food"],
      "correctIndex": 0,
      "explanationZh": "她看到我就開心,尾巴自己動。[C happy to see me / P wants food / S hears a car / O is cold]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l2-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "We both look at Grandma. She is about to begin.",
      "question": "What are we waiting for?",
      "options": ["the story to begin", "the rain to stop", "dinner time", "the wall to dry"],
      "correctIndex": 0,
      "explanationZh": "我跟 {dogName} 都在等故事開始。[C story to begin / S rain to stop / P dinner / O wall to dry]",
      "tags": ["story", "ch2", "prologue"]
    }
  ]
}
```

### Lesson 3 — Grandma Opens the Book

```json
{
  "id": "kt-ch2-l3",
  "chapter": 2,
  "lessonInChapter": 3,
  "segmentType": "outer-prologue",
  "storyId": "outer",
  "storyBeat": "奶奶說「今晚是桃太郎」",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch2-l3-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma says, \"Tonight is Momotaro.\"",
      "question": "Whose name did you hear?",
      "options": ["Momotaro", "Mochi", "Tomato", "Tomorrow"],
      "correctIndex": 0,
      "explanationZh": "Momotaro = 桃太郎,日本童話裡的桃子男孩。[C Momotaro / S Mochi / P Tomato 音近 / O Tomorrow]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l3-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The story is from a far country.",
      "question": "Where is the story from?",
      "options": ["a far country", "this town", "a small farm", "Grandma's room"],
      "correctIndex": 0,
      "explanationZh": "從很遠的國家來的故事(日本)。[C far country / S this town / P small farm / O Grandma's room]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch2-l3-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She turns to the first page.",
      "question": "Tap the tiles in order.",
      "tiles": ["She", "turns", "to", "the", "first", "page", "last", "open"],
      "correctOrder": [0, 1, 2, 3, 4, 5],
      "explanationZh": "她翻到第一頁。last / open 是干擾。",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l3-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma reads slowly so we can hear every word.",
      "question": "Why does she read slowly?",
      "options": ["so we can hear every word", "she is tired", "the book is heavy", "the light is dim"],
      "correctIndex": 0,
      "explanationZh": "慢慢念是要讓我們聽清楚每個字。[C every word / S is tired / P book heavy / O light dim]",
      "tags": ["story", "ch2", "prologue"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l3-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She says the story is long ago, in a small village.",
      "question": "When does the story happen?",
      "options": ["long ago", "this morning", "next week", "in a dream"],
      "correctIndex": 0,
      "explanationZh": "long ago = 很久以前,故事的開場套語。[C long ago / S this morning / P next week / O in a dream]",
      "tags": ["story", "ch2", "prologue"]
    }
  ]
}
```

### Lesson 4 — Long Ago by a River

```json
{
  "id": "kt-ch2-l4",
  "chapter": 2,
  "lessonInChapter": 4,
  "segmentType": "main-story",
  "storyId": "momotaro",
  "storyBeat": "故事開始:老夫婦住在小村",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch2-l4-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Long ago, an old man and an old woman lived in a small village.",
      "question": "Who lived in the village?",
      "options": ["an old man and an old woman", "a young boy", "a king", "three soldiers"],
      "correctIndex": 0,
      "explanationZh": "故事主角是一對老夫婦。[C old man and old woman / S young boy / P king / O three soldiers]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l4-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The old man went to the hills to cut grass.",
      "question": "Where did he go?",
      "options": ["to the hills", "to the river", "to the market", "to the sea"],
      "correctIndex": 0,
      "explanationZh": "老爺爺上山割草。河是老奶奶去的,別搞混。[C hills / P river 文中也有 / S market / O sea]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l4-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The old woman went to the river to wash clothes.",
      "question": "Why did she go to the river?",
      "options": ["to wash clothes", "to drink water", "to fish", "to swim"],
      "correctIndex": 0,
      "explanationZh": "她去河邊洗衣服。[C wash clothes / S drink water / P fish / O swim]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l4-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "They had no child. They worked hard every day.",
      "question": "What did the couple wish for?",
      "options": ["a child", "more grass", "a new house", "a horse"],
      "correctIndex": 0,
      "explanationZh": "他們沒孩子,心裡其實想要一個。[C a child / S a new house / P more grass / O a horse]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l4-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The river was wide and clear. Birds flew above it.",
      "question": "What kind of river was it?",
      "options": ["wide and clear", "narrow and dark", "frozen", "dry"],
      "correctIndex": 0,
      "explanationZh": "河水又寬又清。[C wide and clear / S narrow and dark / P frozen / O dry]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l4-q6",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "She washed clothes by the water. Then she saw something pink.",
      "question": "What was about to happen?",
      "options": ["she would see something special", "she would fall in", "her clothes would dry", "a fish would jump"],
      "correctIndex": 0,
      "explanationZh": "她看到粉紅色的東西,故事要轉折了。[C see something special / S fish would jump / P clothes dry / O fall in]",
      "tags": ["story", "ch2", "main", "momotaro"]
    }
  ]
}
```

### Lesson 5 — A Giant Peach Floats

```json
{
  "id": "kt-ch2-l5",
  "chapter": 2,
  "lessonInChapter": 5,
  "segmentType": "main-story",
  "storyId": "momotaro",
  "storyBeat": "巨大桃子順流而下",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch2-l5-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "A giant peach was floating down the river.",
      "question": "What was in the river?",
      "options": ["a peach", "a plum", "a paper boat", "a log"],
      "correctIndex": 0,
      "explanationZh": "peach = 桃子。一顆大大的桃子順著河漂下來。[C peach / S plum / P paper boat / O log]",
      "tags": ["story", "ch2", "main", "momotaro", "vocab-peach"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l5-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "It was pink and round and very big.",
      "question": "What color was it?",
      "options": ["pink", "green", "round", "small"],
      "correctIndex": 0,
      "explanationZh": "pink = 粉紅色。round / small 是形容詞但不答顏色。[C pink / S green / P round 也是描述 / O small 反義]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l5-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The peach floated toward her hands.",
      "question": "Which verb did you hear?",
      "options": ["floated", "flew", "rolled", "fell"],
      "correctIndex": 0,
      "explanationZh": "float = 漂浮。桃子在水上漂。[C floated / S flew / P rolled / O fell]",
      "tags": ["story", "ch2", "main", "momotaro", "vocab-float"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch2-l5-q4",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "The peach was bigger than her head.",
      "question": "Tap the tiles in order.",
      "tiles": ["The", "peach", "was", "bigger", "than", "her", "head", "smaller", "hand"],
      "correctOrder": [0, 1, 2, 3, 4, 5, 6],
      "explanationZh": "比她的頭還大。smaller / hand 是干擾。",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l5-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The old woman had never seen a peach so big.",
      "question": "How did she feel about the peach?",
      "options": ["surprised", "bored", "sleepy", "angry"],
      "correctIndex": 0,
      "explanationZh": "從沒看過這麼大的桃子,當然驚訝。[C surprised / S bored / P sleepy / O angry]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l5-q6",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "She thought, \"This peach will be a treat for my husband.\"",
      "question": "Why did she want the peach?",
      "options": ["to share with her husband", "to throw away", "to sell at the market", "to plant a tree"],
      "correctIndex": 0,
      "explanationZh": "她想拿回去跟老爺爺一起吃。[C share with husband / S throw away 反向 / P sell at market / O plant a tree]",
      "tags": ["story", "ch2", "main", "momotaro"]
    }
  ]
}
```

### Lesson 6 — She Carries It Home

```json
{
  "id": "kt-ch2-l6",
  "chapter": 2,
  "lessonInChapter": 6,
  "segmentType": "main-story",
  "storyId": "momotaro",
  "storyBeat": "老奶奶把桃子抱回家",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch2-l6-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She lifted the peach out of the water.",
      "question": "Which verb did you hear?",
      "options": ["lifted", "dropped", "pushed", "lit"],
      "correctIndex": 0,
      "explanationZh": "lift = 抬起來。她把桃子從水裡抱起來。[C lifted / S dropped / P pushed / O lit]",
      "tags": ["story", "ch2", "main", "momotaro", "vocab-lift"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l6-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The peach was heavy in her arms.",
      "question": "How did the peach feel?",
      "options": ["heavy", "light", "wet", "soft"],
      "correctIndex": 0,
      "explanationZh": "heavy = 重的。她抱得有點吃力。[C heavy / S light / P wet 也是事實但題目問重量 / O soft]",
      "tags": ["story", "ch2", "main", "momotaro", "vocab-heavy"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch2-l6-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She walked home with the peach.",
      "question": "Tap the tiles in order.",
      "tiles": ["She", "walked", "home", "with", "the", "peach", "ran", "away"],
      "correctOrder": [0, 1, 2, 3, 4, 5],
      "explanationZh": "她抱著桃子走回家。ran / away 是干擾。",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch2-l6-q4",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "The old man came home for dinner.",
      "question": "Tap the tiles in order.",
      "tiles": ["The", "old", "man", "came", "home", "for", "dinner", "lunch", "young"],
      "correctOrder": [0, 1, 2, 3, 4, 5, 6],
      "explanationZh": "老爺爺回家吃晚餐。lunch / young 是干擾。",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l6-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She put the peach on the kitchen table. She smiled at her husband.",
      "question": "Where did she put the peach?",
      "options": ["on the table", "on the floor", "in the river", "outside the door"],
      "correctIndex": 0,
      "explanationZh": "她把桃子放在桌上,要給老爺爺看。[C on the table / S on the floor / P in the river 來源 / O outside the door]",
      "tags": ["story", "ch2", "main", "momotaro"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l6-q6",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "The old man's eyes grew wide. He had never seen a peach so big.",
      "question": "How did the old man react?",
      "options": ["he was amazed", "he was angry", "he was sleepy", "he was hungry already"],
      "correctIndex": 0,
      "explanationZh": "他瞪大眼睛,驚訝得說不出話。[C amazed / S angry / P hungry / O sleepy]",
      "tags": ["story", "ch2", "main", "momotaro"]
    }
  ]
}
```

---

## 4. Vocab Key List (28 words)

> A2-appropriate. Sorted by first appearance lesson. Bold = will be reinforced in tap-pairs review (lesson 26).

| # | Word | ZH | First appears | Tag |
|---|------|-----|--------------|------|
| 1 | tonight | 今晚 | L1 | outer |
| 2 | **peach** | 桃子 | L5 | momotaro-core |
| 3 | **float** | 漂浮 | L5 | momotaro-core |
| 4 | **lift** | 抬起 | L6 | verb |
| 5 | **heavy** | 重的 | L6 | adj |
| 6 | **village** | 村莊 | L4 | momotaro-core |
| 7 | river | 河 | L4 | place |
| 8 | hill | 山丘 | L4 | place |
| 9 | grass | 草 | L4 | noun |
| 10 | wash | 洗 | L4 | verb |
| 11 | **boy** | 男孩 | L7 | momotaro-core |
| 12 | **knife** | 刀 | L7 | noun |
| 13 | name | 命名 | L8 | verb |
| 14 | grow | 長大 | L9 | verb |
| 15 | **brave** | 勇敢 | L9 | adj |
| 16 | **strong** | 強壯 | L9 | adj |
| 17 | **demon** | 妖怪 | L10 | momotaro-core |
| 18 | steal | 偷 | L10 | verb |
| 19 | **journey** | 旅程 | L11 | noun |
| 20 | **dumpling** | 糰子 | L12 | noun |
| 21 | pack | 打包 | L12 | verb |
| 22 | **dog** | 狗 | L13 | animal |
| 23 | **monkey** | 猴子 | L14 | animal |
| 24 | **pheasant** | 雉雞 | L15 | animal |
| 25 | share | 分享 | L13 | verb |
| 26 | **friend** | 朋友 | L13 | core |
| 27 | sail | 航行 | L16 | verb |
| 28 | gate | 門 | L17 | noun |
| 29 | **fight** | 打鬥 | L18 | verb |
| 30 | **gold** | 金子 | L18 | noun |

Aesop adds (used only in L19-22, not in tap-pairs review): tortoise, hare, race, slow, fast, win, shepherd, wolf, lie, cry.

---

## 5. TOEIC Parity Audit

> Maps each lesson to the closest TOEIC Listening section style. Pickup's listen-mc ≈ Part 2 (Q-response), listen-comprehension ≈ Part 3/4 (conversation/talk inference). tap-tiles ≈ no direct TOEIC equivalent (production cue, structural).

| Lesson | Primary TOEIC parity | Why |
|--------|---------------------|-----|
| 1, 2, 3 | Part 2 (Q-response, picture-like setup) | Short factual Q (which color, where) on a single sentence |
| 4 | Part 3 (short conversation inference) | Couple-setup builds two-character inference |
| 5, 6 | Part 3 (conversation inference) | Two-character action chain, "how did she react" Qs |
| 7, 8 | Part 4 (short talk) | Narrative monologue from grandma, factual + inference mix |
| 9 | Part 4 (talk inference) | "How did Momotaro change over years" — abstract inference |
| 10, 11 | Part 4 (talk + intention) | Why-questions: "why did he say I will go" maps to TOEIC intention Q |
| 12 | Part 2 (Q-response) | Concrete factual: "what did mother pack" |
| 13, 14, 15 | Part 3 (conversation) | Each animal joins via dialogue exchange — natural conversation Q parity |
| 16 | Part 4 (announcement-like) | Travel narrative, "how did they cross the sea" |
| 17 | Part 4 (description) | Setting description Qs match Part 4 picture-like prompts |
| 18 | Part 4 (talk inference) | "Why did the demons surrender" — abstract reasoning, hardest in chapter |
| 19-22 | Part 3/4 (Aesop is moralistic talk) | Short fable narration |
| 23, 24 | Part 2/3 (Mochi reaction) | Mochi's POV Q-response on inner story |
| 25 (番外) | Part 3 (3-speaker conversation) | Hana + Mochi + Grandma — closest to real TOEIC Part 3 (3 speakers) |
| 26 | n/a (vocab review) | Word-meaning pairing, not TOEIC parity |

**Coverage check**:
- Part 1 (picture description): not covered — Pickup has no image-based MC yet; deferred to v2.1 listen-image type
- Part 2 (Q-response): 8 lessons heavily, every listen-mc Q
- Part 3 (conversation): 9 lessons via 2-character story beats
- Part 4 (short talk): 7 lessons via grandma narration + inference Qs

Inference-to-literal ratio: roughly 60% inference (why/how/what kind/how did X feel) vs 40% literal (which word/where/who) — meets brief's "inference > literal" target.

---

## 6. Bonus 番外 Lesson (Lesson 25) — Hana Asks Grandma

> Setting: after the main story ends, Grandma is closing the book. Hana puts a paw on her knee. Mochi tilts her head. Grandma laughs softly and answers. Three speakers across 10 Q.
> Voice: Hana/Mochi speak through Grandma's voicing (children would in real bedtime story). Each Q is one beat of the conversation.

```json
{
  "id": "kt-ch2-l25",
  "chapter": 2,
  "lessonInChapter": 25,
  "segmentType": "bonus",
  "storyId": "outer",
  "storyBeat": "{dogName} 和 {catName} 問奶奶問題",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch2-l25-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} asks, \"Why was the dog in the story?\"",
      "question": "Who is asking the question?",
      "options": ["{dogName}", "{catName}", "Grandma", "the old man"],
      "correctIndex": 0,
      "explanationZh": "{dogName} 先問:故事裡為什麼有狗?[C {dogName} / S {catName} / P Grandma / O old man]",
      "tags": ["story", "ch2", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l25-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma says, \"Because dogs are loyal friends, like you.\"",
      "question": "Why was the dog in the story?",
      "options": ["dogs are loyal friends", "dogs are fast", "dogs can fly", "dogs are big"],
      "correctIndex": 0,
      "explanationZh": "loyal = 忠心。奶奶說因為狗很忠誠,就像 {dogName} 一樣。[C loyal friends / S big / P fast / O can fly]",
      "tags": ["story", "ch2", "bonus", "qa", "vocab-loyal"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l25-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{catName} asks, \"Was the boy real?\"",
      "question": "What does {catName} want to know?",
      "options": ["if the boy was real", "if the peach was sweet", "if the dog was kind", "if it rained"],
      "correctIndex": 0,
      "explanationZh": "{catName} 想知道桃太郎是不是真的人。[C if boy was real / S peach was sweet / P dog was kind / O it rained]",
      "tags": ["story", "ch2", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l25-q4",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Grandma smiles, \"He lives in the story. That makes him real to us.\"",
      "question": "What does Grandma mean?",
      "options": ["the story makes him real to us", "he is a true historical boy", "he is a ghost", "he never existed at all"],
      "correctIndex": 0,
      "explanationZh": "奶奶說,故事裡活著,對聽的人來說他就真實。[C story makes real / S true historical / P never existed / O ghost]",
      "tags": ["story", "ch2", "bonus", "qa", "inference"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l25-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} asks, \"Why did the peach float?\"",
      "question": "What is {dogName}'s next question?",
      "options": ["why did the peach float", "why did the dog bark", "why was it pink", "why was she alone"],
      "correctIndex": 0,
      "explanationZh": "{dogName} 想知道桃子為什麼會漂。[C peach float / S dog bark / P pink / O alone]",
      "tags": ["story", "ch2", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l25-q6",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Grandma says, \"Peaches are full of air inside. Air is lighter than water.\"",
      "question": "Why did the peach float?",
      "options": ["air inside is light", "the river was slow", "magic made it float", "it was empty"],
      "correctIndex": 0,
      "explanationZh": "桃子裡面有空氣,空氣比水輕,所以浮起來。[C air inside / S river slow / P empty / O magic]",
      "tags": ["story", "ch2", "bonus", "qa", "science"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l25-q7",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{catName} asks, \"Were the demons all bad?\"",
      "question": "What does {catName} ask about?",
      "options": ["the demons", "the dog", "the peach", "the boat"],
      "correctIndex": 0,
      "explanationZh": "{catName} 在想:妖怪是不是都壞?[C demons / S dog / P peach / O boat]",
      "tags": ["story", "ch2", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l25-q8",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Grandma says, \"They took things from people. So in the story, yes, they were bad.\"",
      "question": "Why were the demons called bad?",
      "options": ["they stole from people", "they were big", "they had horns", "they lived on an island"],
      "correctIndex": 0,
      "explanationZh": "因為他們偷別人東西,所以是壞的。大小或角不是壞的理由。[C stole from people / S big / P horns / O lived on island]",
      "tags": ["story", "ch2", "bonus", "qa", "inference"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch2-l25-q9",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} asks, \"Will you tell another story tomorrow?\"",
      "question": "What does {dogName} hope for?",
      "options": ["another story tomorrow", "a longer one tonight", "the same story again", "no story this week"],
      "correctIndex": 0,
      "explanationZh": "{dogName} 希望明天還能聽故事。[C another tomorrow / S longer tonight / P same again / O no story]",
      "tags": ["story", "ch2", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch2-l25-q10",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Grandma scratches her ear and says, \"Yes. Come back when the moon is high.\"",
      "question": "When should they come back?",
      "options": ["when the moon is high", "when the sun is up", "in the morning", "after lunch"],
      "correctIndex": 0,
      "explanationZh": "moon is high = 月亮升高(深夜)。奶奶約他們明晚再來。[C moon is high / S sun is up / P morning / O after lunch]",
      "tags": ["story", "ch2", "bonus", "qa"]
    }
  ]
}
```

---

## 7. Open Questions / Risks

1. **TTS pronunciation of "Momotaro" and "Onigashima"** — Web Speech API on iOS may stumble on Japanese names. Mitigation: pre-record those two words or fall back to ASR-stable spelling like "Momo-Taro" if listen tests fail in QA.
2. **"pheasant" is rare** — appears in 1 lesson; if A2 audit flags it, swap to "bird" with side-note. Recommend keeping for cultural fidelity to the original tale.
3. **25-lesson strict count** — current draft is 26 with review. If product wants exactly 25, fold review into Lesson 24 outro. Recommend keeping 26 to match Ch1.
4. **Aesop placement timing** — lessons 19-22 mid-evening interruption ("that reminds me of") may break flow. Alternative: move Aesops to lessons 8-9 transition (after Momotaro's birth, before he grows) to feel more like grandma's tangent.
5. **Difficulty curve** — lessons 18 (battle) is the only "hard" tagged lesson. Consider tagging lesson 11 (intention Q) as hard too to spread difficulty more evenly.

---

## 8. Authoring Notes (for content fillers L7-L26)

Reusable per-position template (based on Ch1 lesson-N type pattern):

- Lesson position 1 of chapter: 3 listen-mc + 2 listen-comprehension (5 Q, easy)
- Lesson position 2, 3: 2 listen-mc + 1 tap-tiles + 2 listen-comprehension (5 Q, easy)
- Lesson position 4-8 (main, early): 3 listen-mc + 3 listen-comprehension OR 2 listen-mc + 1 tap-tiles + 3 listen-comprehension (6 Q)
- Lesson position 9-11 (main, mid, inference-heavy): 2 listen-mc + 4 listen-comprehension (6 Q, medium)
- Lesson position 12-18 (main, late): 3 listen-mc + 3 listen-comprehension (6 Q, easy→hard)
- Lesson position 19-22 (Aesop): 2 listen-mc + 1 tap-tiles + 2 listen-comprehension OR 2 listen-mc + 3 listen-comprehension (5 Q)
- Lesson position 23-24 (outro): same as 2-3
- Lesson position 25 (番外): 4 listen-mc + 6 listen-comprehension (10 Q)
- Lesson position 26 (review): 5 tap-pairs

Distractor authoring shortcut: when writing an MC Q, fill the 4 slots in this order — [C] correct answer; [S] same word-class peer (color→color, place→place, verb→verb); [P] something explicitly said in the sentence/audio but not what the question asks; [O] something topically unrelated.

---

*End of spec. Ready for content-team review or direct lesson JSON generation.*
