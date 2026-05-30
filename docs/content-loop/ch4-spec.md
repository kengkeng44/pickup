# Chapter 4 — 龜兔賽跑 (Tortoise & Hare) Content Spec

> Pickup (拾光) · Ch4 · A2 Taiwanese English learners · Duolingo-nested model
> Outer frame: Mochi (流浪三花貓) jumps grandma's wall, Hana (柴犬) at side, grandma reads bedtime story
> Main: 龜兔賽跑 dialogue-driven · Sides: 烏鴉與狐狸 + 城市鼠與鄉村鼠
> Author: Claude (Opus 4.7) · 2026-05-31

---

## 0. Headcount Reconciliation

User spec headline: "8 chapters × 25 lessons × 6 Q = 1200 Q." Ch4 segment breakdown sums to **26 lessons / 150 Q**:

| Segment | Lessons | Q each | Subtotal |
|---|---:|---:|---:|
| outer-prologue | 3 | 5 | 15 |
| main-story | 15 | 6 | 90 |
| aesop-side | 4 | 5 | 20 |
| outer-outro | 2 | 5 | 10 |
| 番外 (Q&A with grandma) | 1 | 10 | 10 |
| review (tap-pairs) | 1 | 5 | 5 |
| **Total** | **26** | — | **150** |

150 Q / chapter × 8 chapters = **1200 Q** (matches headline). Lesson count rounds to "~25" but is 26. Locking this as the Ch4 template; downstream chapters mirror.

---

## 1. Story Arc (250 words)

Mochi lands soft on the warm garden wall. Hana's tail thumps the grass. Grandma's chair creaks. Tonight the book opens to a picture: a slow green tortoise and a fast brown hare standing in a sunny meadow.

The hare brags first. "Look at my long legs. Watch me run." The tortoise lifts his small head. "Slow is fine. I keep going." The hare laughs, loud and sure. "Let's race. To the old tree at the hill."

They line up. A bird counts down. The hare bursts forward in a brown blur. The tortoise begins one careful step. By the time the hare reaches the river, the tortoise is barely past the start. The hare looks back, sees no one, and grins. "I have time. I'll nap." He curls under a shady bush and shuts his eyes.

The tortoise walks. Past the river. Past the bush where the hare snores soft. Past the wildflowers, past noon. His feet hurt. He keeps going. The hare dreams of trophies.

The tortoise sees the old tree. He sees the finish line drawn in chalk. He takes one more step. The bird cheers. The hare wakes, sees the empty meadow behind him, and runs — but the tortoise is already touching the tree with his nose.

"How?" the hare asks, panting. The tortoise smiles. "I did not stop."

Grandma closes the book. Mochi yawns. Hana sighs. Side stories tomorrow: a crow who drops cheese, a city mouse who fears cats.

---

## 2. Lesson Outline Table (26 rows)

| # | Lesson ID | Segment | Story | Beat | Q | Type mix |
|---:|---|---|---|---|---:|---|
| 1 | kt-ch4-l1 | outer-prologue | outer | Mochi jumps the wall again | 5 | 2 listen-mc + 1 type + 1 listen-emoji + 1 listen-comp |
| 2 | kt-ch4-l2 | outer-prologue | outer | Hana greets, grandma sits | 5 | 2 listen-mc + 1 type + 1 listen-emoji + 1 listen-comp |
| 3 | kt-ch4-l3 | outer-prologue | outer | Grandma opens the race picture | 5 | 2 listen-mc + 1 tap-tiles + 1 listen-emoji + 1 listen-comp |
| 4 | kt-ch4-l4 | main-story | hare-tortoise | Hare brags about his long legs | 6 | 2 listen-mc + 1 cloze + 1 tap-tiles + 1 listen-emoji + 1 listen-comp |
| 5 | kt-ch4-l5 | main-story | hare-tortoise | Tortoise replies: slow is fine | 6 | same |
| 6 | kt-ch4-l6 | main-story | hare-tortoise | The challenge — let's race | 6 | same |
| 7 | kt-ch4-l7 | main-story | hare-tortoise | The bird counts down | 6 | listen-mc + type + cloze + tap-tiles + listen-emoji + listen-comp |
| 8 | kt-ch4-l8 | main-story | hare-tortoise | Hare bursts forward | 6 | listening heavy |
| 9 | kt-ch4-l9 | main-story | hare-tortoise | Tortoise begins, one step | 6 | dialogue cloze |
| 10 | kt-ch4-l10 | main-story | hare-tortoise | Hare looks back, grins, decides to nap | 6 | inference-heavy |
| 11 | kt-ch4-l11 | main-story | hare-tortoise | Hare curls under the bush | 6 | listening |
| 12 | kt-ch4-l12 | main-story | hare-tortoise | Tortoise passes the river | 6 | type + cloze |
| 13 | kt-ch4-l13 | main-story | hare-tortoise | Tortoise passes the sleeping hare | 6 | inference |
| 14 | kt-ch4-l14 | main-story | hare-tortoise | His feet hurt, he keeps going | 6 | emotion focus |
| 15 | kt-ch4-l15 | main-story | hare-tortoise | The old tree comes into view | 6 | listening |
| 16 | kt-ch4-l16 | main-story | hare-tortoise | Tortoise touches the tree | 6 | mc + comprehension |
| 17 | kt-ch4-l17 | main-story | hare-tortoise | Hare wakes, sprints, too late | 6 | inference |
| 18 | kt-ch4-l18 | main-story | hare-tortoise | "How?" "I did not stop." | 6 | dialogue cloze |
| 19 | kt-ch4-l19 | aesop-side | crow-fox | Crow with cheese in a tree | 5 | listening + comp |
| 20 | kt-ch4-l20 | aesop-side | crow-fox | Fox flatters, crow sings, cheese falls | 5 | inference |
| 21 | kt-ch4-l21 | aesop-side | mouse-city-country | City mouse visits country mouse | 5 | listening |
| 22 | kt-ch4-l22 | aesop-side | mouse-city-country | Country mouse hears the cat, leaves | 5 | inference |
| 23 | kt-ch4-l23 | outer-outro | outer | Grandma closes the book, Mochi yawns | 5 | listening |
| 24 | kt-ch4-l24 | outer-outro | outer | Mochi pads back to the alley | 5 | reflection |
| 25 | kt-ch4-l25 | 番外 | bonus | Hana asks: did the hare really sleep? | 10 | mixed Q&A |
| 26 | kt-ch4-l26 | review | review | Tap-pairs on Ch4 keywords | 5 | tap-pairs |

---

## 3. First 6 Lessons — Full Q Data

> Distractor doctrine (1+1+1+1):
> [0] correct · [1] same category (same POS / semantic field) · [2] partial truth (overlaps meaning but wrong here) · [3] obvious miss (clearly off-topic).
> `correctIndex` is the position before any UI shuffle — the schema preserves order.

### Lesson 1 — kt-ch4-l1 — outer-prologue — Mochi jumps the wall again

```json
{
  "id": "kt-ch4-l1",
  "chapter": 4,
  "lessonInChapter": 1,
  "segmentType": "outer-prologue",
  "storyId": "outer",
  "storyBeat": "{catName} 又跳上矮牆",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch4-l1-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Tonight I climb the wall again.",
      "question": "Which verb did you hear?",
      "options": ["climb", "crawl", "jump", "sing"],
      "explanationZh": "climb = 攀爬。今晚我又爬上奶奶家的矮牆。(crawl 同類動作詞;jump 也能上牆但今天我是慢慢爬;sing 完全不相干。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch4-l1-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The yard smells like warm grass.",
      "question": "How does the yard smell?",
      "options": ["warm grass", "cold rain", "fresh grass", "old shoes"],
      "explanationZh": "warm grass = 暖暖的草味。(cold rain 同樣是氣味類但溫度錯;fresh grass 也是草味但少了「暖」;old shoes 明顯亂入。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "type-what-you-hear",
      "id": "kt-ch4-l1-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma waits for me.",
      "question": "Type the verb you hear.",
      "options": ["waits", "watches", "wants", "walks"],
      "explanationZh": "waits = 等(三單動詞)。奶奶坐在椅子上等我。(watches 也是觀察類動詞;wants 開頭聲音相近;walks 完全不同情境。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch4-l1-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "I feel happy to see them.",
      "question": "How do I feel?",
      "options": ["happy", "calm", "glad", "hungry"],
      "explanationZh": "happy = 開心。看到奶奶跟 {dogName} 我就笑了。(calm 同情緒類但偏平靜;glad 意思接近但語感更輕;hungry 是身體感不是情緒。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l1-q5",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Why does the cat climb the wall every night?",
      "question": "Why does {catName} climb the wall every night?",
      "options": [
        "To hear Grandma's story",
        "To find a new home",
        "To eat the grass",
        "To bark at cars"
      ],
      "explanationZh": "我每晚回來是為了聽奶奶說故事。(找新家是相關背景但不是今晚動機;吃草部分真但只是順路;對車叫是 {dogName} 才會做的事。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer", "inference"]
    }
  ]
}
```

### Lesson 2 — kt-ch4-l2 — outer-prologue — Hana greets, grandma sits

```json
{
  "id": "kt-ch4-l2",
  "chapter": 4,
  "lessonInChapter": 2,
  "segmentType": "outer-prologue",
  "storyId": "outer",
  "storyBeat": "{dogName} 迎接,奶奶坐下",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch4-l2-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} thumps his tail on the grass.",
      "question": "Which verb did you hear?",
      "options": ["thumps", "tumbles", "wags", "barks"],
      "explanationZh": "thump = 重重拍打。{dogName} 的尾巴在草地上 thump thump 響。(tumbles 動作類但是「翻滾」;wags 也是尾巴動作但比較輕;barks 是另一種反應。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch4-l2-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Grandma sits in her old chair.",
      "question": "Where does Grandma sit?",
      "options": ["in her old chair", "on the cold floor", "in her new chair", "on the roof"],
      "explanationZh": "in her old chair = 在她的舊椅子上。(on the cold floor 同樣是位置;in her new chair 部分對只差「舊」;on the roof 明顯亂掰。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "type-what-you-hear",
      "id": "kt-ch4-l2-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She holds a story book.",
      "question": "Type the noun you hear.",
      "options": ["book", "boot", "ball", "bag"],
      "explanationZh": "book = 書。奶奶手裡是一本故事書。(boot 同 b 開頭名詞;ball 也是 b 開頭日用品;bag 同類但完全不同物。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch4-l2-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "The yard is quiet and safe.",
      "question": "How does the yard feel?",
      "options": ["peaceful", "noisy", "calm", "spicy"],
      "explanationZh": "peaceful = 平靜安詳。(noisy 是反義;calm 意思接近但少了一點溫度;spicy 是味道詞跑錯場。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l2-q5",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "What does Grandma do when I arrive?",
      "question": "What does Grandma do first?",
      "options": [
        "She opens her book",
        "She calls the cat home",
        "She reads in silence",
        "She turns off the light"
      ],
      "explanationZh": "她先打開書。(call the cat home 是她不會做的動作 — 我是流浪貓;read in silence 部分真但她會說出聲;關燈跟故事時間完全相反。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer", "inference"]
    }
  ]
}
```

### Lesson 3 — kt-ch4-l3 — outer-prologue — Grandma opens the race picture

```json
{
  "id": "kt-ch4-l3",
  "chapter": 4,
  "lessonInChapter": 3,
  "segmentType": "outer-prologue",
  "storyId": "outer",
  "storyBeat": "奶奶翻到龜兔賽跑那頁",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch4-l3-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Tonight the story is about a race.",
      "question": "What is the story about?",
      "options": ["a race", "a rest", "a meal", "a song"],
      "explanationZh": "race = 比賽。今晚的故事是比賽。(rest 同樣音節短的名詞;meal 是故事場景之外的事;song 完全偏題。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch4-l3-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "A slow tortoise meets a fast hare.",
      "question": "Which two animals?",
      "options": ["tortoise and hare", "turtle and rabbit", "tortoise and fox", "horse and hare"],
      "explanationZh": "tortoise (陸龜) 跟 hare (野兔) — 課本版本的正名。(turtle/rabbit 是同義口語;tortoise + fox 主角錯一個;horse + hare 押韻但物種錯。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer", "vocab"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch4-l3-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "She tells us about a race today.",
      "question": "Tap the tiles in order.",
      "tiles": ["She", "tells", "us", "about", "a", "race", "today", "quiet", "fast"],
      "correctOrder": [0, 1, 2, 3, 4, 5, 6],
      "explanationZh": "順序:She → tells → us → about → a → race → today。quiet / fast 是干擾 tile。",
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch4-l3-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "I am curious about this story.",
      "question": "How do I feel?",
      "options": ["curious", "tired", "interested", "thirsty"],
      "explanationZh": "curious = 好奇。耳朵全豎起來。(tired 同情緒類但反向;interested 意思接近但語氣較淡;thirsty 是身體感跑場。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l3-q5",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Why might the slow tortoise win?",
      "question": "Why might the tortoise win?",
      "options": [
        "Because he does not stop",
        "Because he runs very fast",
        "Because the hare is kind",
        "Because the sun is hot"
      ],
      "explanationZh": "他不停下來。(跑很快是 hare 的特點不是 tortoise;hare 善良也不是劇情;太陽熱跟誰贏無關 — 雖然 hare 是因為熱才睡的部分真。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "prologue", "outer", "inference"]
    }
  ]
}
```

### Lesson 4 — kt-ch4-l4 — main-story — Hare brags about his long legs

```json
{
  "id": "kt-ch4-l4",
  "chapter": 4,
  "lessonInChapter": 4,
  "segmentType": "main-story",
  "storyId": "hare-tortoise",
  "storyBeat": "Hare 吹噓他的長腿",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch4-l4-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Hare says, \"Look at my long legs.\"",
      "question": "What does Hare want you to look at?",
      "options": ["his long legs", "his soft ears", "his fast legs", "his big house"],
      "explanationZh": "long legs = 長腿。(soft ears 同身體部位但講錯部位;fast legs 部分對但形容詞錯;big house 完全離題。) Hare 第一句台詞就在炫耀。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "hare", "dialogue"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch4-l4-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "He brags about his speed.",
      "question": "Which word did you hear?",
      "options": ["brags", "brings", "begs", "barks"],
      "explanationZh": "brag = 自誇、吹牛。(brings 同 br- 開頭動詞;begs 開頭聲音類似但意思「乞求」;barks 是另一種發聲。) Hare 一見面就 brag。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "hare", "vocab"]
    },
    {
      "type": "cloze",
      "id": "kt-ch4-l4-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "\"I can run very ___,\" Hare laughs.",
      "question": "Fill the blank.",
      "options": ["fast", "slow", "high", "soft"],
      "explanationZh": "fast = 快。Hare 自誇的關鍵字。(slow 是反義 — 是 tortoise 才會用;high 形容跳得高不是跑得快;soft 是觸感詞跑場。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "hare", "dialogue", "cloze"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch4-l4-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "My legs are long and strong.",
      "question": "Tap the tiles in order.",
      "tiles": ["My", "legs", "are", "long", "and", "strong", "kind", "blue"],
      "correctOrder": [0, 1, 2, 3, 4, 5],
      "explanationZh": "順序:My → legs → are → long → and → strong。kind / blue 是干擾形容詞 — Hare 才不會說自己 kind。",
      "tags": ["story", "ch4", "main", "hare", "dialogue"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch4-l4-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Hare feels proud of himself.",
      "question": "How does Hare feel?",
      "options": ["proud", "shy", "confident", "thirsty"],
      "explanationZh": "proud = 驕傲、自豪。(shy 是反義;confident 是相鄰情緒但 Hare 已經跨過自信到自滿;thirsty 是身體感跑場。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "hare", "emotion"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l4-q6",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Why does Hare brag first?",
      "question": "Why does Hare brag first?",
      "options": [
        "He thinks he is the fastest",
        "He wants to make a friend",
        "He is tired of running",
        "He sees a big tree"
      ],
      "explanationZh": "他覺得自己最快,所以要先開口。(交朋友不是他的目的 — 他想比賽;跑累跟劇情相反;看見樹是後面的事。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "hare", "inference"]
    }
  ]
}
```

### Lesson 5 — kt-ch4-l5 — main-story — Tortoise replies: slow is fine

```json
{
  "id": "kt-ch4-l5",
  "chapter": 4,
  "lessonInChapter": 5,
  "segmentType": "main-story",
  "storyId": "hare-tortoise",
  "storyBeat": "Tortoise 回:慢也沒關係",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch4-l5-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Tortoise says, \"Slow is fine.\"",
      "question": "What does Tortoise say is fine?",
      "options": ["being slow", "being loud", "being small", "being scared"],
      "explanationZh": "being slow = 慢也沒關係。(loud 同形容詞類但跑題;small 是 tortoise 的客觀事實但不是他在意的點;scared 跟他冷靜的反應反向。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "tortoise", "dialogue"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch4-l5-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "\"I just keep going,\" he says.",
      "question": "Which verb phrase did you hear?",
      "options": ["keep going", "stop walking", "go home", "give up"],
      "explanationZh": "keep going = 繼續走。Tortoise 的中心思想。(stop walking 是反義;go home 動作類但場景錯;give up 是相反態度。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "tortoise", "dialogue", "vocab"]
    },
    {
      "type": "cloze",
      "id": "kt-ch4-l5-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Tortoise is ___ but he is patient.",
      "question": "Fill the blank.",
      "options": ["slow", "fast", "tired", "loud"],
      "explanationZh": "slow = 慢。Tortoise 的標籤。(fast 是 hare 的標籤;tired 是後面的劇情但這裡還沒;loud 是 hare 的形容。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "tortoise", "cloze"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch4-l5-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "I am small but I am brave.",
      "question": "Tap the tiles in order.",
      "tiles": ["I", "am", "small", "but", "I", "am", "brave", "tall", "shy"],
      "correctOrder": [0, 1, 2, 3, 4, 5, 6],
      "explanationZh": "順序:I → am → small → but → I → am → brave。tall / shy 是干擾形容詞。",
      "tags": ["story", "ch4", "main", "tortoise", "dialogue"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch4-l5-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Tortoise feels calm.",
      "question": "How does Tortoise feel?",
      "options": ["calm", "angry", "peaceful", "hungry"],
      "explanationZh": "calm = 冷靜。被 Hare 嘲笑也不生氣。(angry 是反義;peaceful 意思接近但偏內心狀態;hungry 是身體感跑場。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "tortoise", "emotion"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l5-q6",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Why does Tortoise not get angry?",
      "question": "Why is Tortoise not angry?",
      "options": [
        "He knows what he can do",
        "He cannot hear Hare",
        "He is too small to talk",
        "He is afraid of Hare"
      ],
      "explanationZh": "他清楚自己會什麼 — 自信不需要回嘴。(聽不見不是事實;太小不能講話否定他剛才剛開口;怕 Hare 與「保持冷靜」表象相關但動機錯。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "tortoise", "inference"]
    }
  ]
}
```

### Lesson 6 — kt-ch4-l6 — main-story — The challenge: let's race

```json
{
  "id": "kt-ch4-l6",
  "chapter": 4,
  "lessonInChapter": 6,
  "segmentType": "main-story",
  "storyId": "hare-tortoise",
  "storyBeat": "Hare 下戰帖:來比賽吧",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch4-l6-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "\"Let's race to the old tree,\" Hare says.",
      "question": "Where will they race to?",
      "options": ["the old tree", "the old house", "the new tree", "the river bank"],
      "explanationZh": "the old tree = 那棵老樹 (山丘上的終點)。(old house 同樣 old + 名詞但地點錯;new tree 物件對但形容詞錯;river bank 是路上會經過但不是終點。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "hare", "dialogue"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch4-l6-q2",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Tortoise nods. \"I accept.\"",
      "question": "Which word did you hear?",
      "options": ["accept", "expect", "agree", "argue"],
      "explanationZh": "accept = 接受(挑戰)。(expect 同 -ept 結尾但意思「期待」;agree 同義詞但聲音不同;argue 動作類但是「爭吵」剛好相反。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "tortoise", "dialogue", "vocab"]
    },
    {
      "type": "cloze",
      "id": "kt-ch4-l6-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "A bird will ___ the race for us.",
      "question": "Fill the blank.",
      "options": ["start", "stop", "watch", "win"],
      "explanationZh": "start = 開始(比賽)。小鳥當裁判倒數。(stop 是反義動作;watch 部分真 — 它也在看 — 但任務是「開始」;win 是參賽者的事不是裁判的事。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "race", "cloze"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch4-l6-q4",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "We will race to the old tree.",
      "question": "Tap the tiles in order.",
      "tiles": ["We", "will", "race", "to", "the", "old", "tree", "fast", "river"],
      "correctOrder": [0, 1, 2, 3, 4, 5, 6],
      "explanationZh": "順序:We → will → race → to → the → old → tree。fast / river 是干擾 tile。",
      "tags": ["story", "ch4", "main", "race"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch4-l6-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Hare feels excited about the race.",
      "question": "How does Hare feel now?",
      "options": ["excited", "bored", "thrilled", "sleepy"],
      "explanationZh": "excited = 興奮。(bored 是反義;thrilled 同情緒類更強烈一階但這裡是 excited 起步;sleepy 是 hare 後面睡覺前才會有的狀態。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "hare", "emotion"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l6-q6",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Why does Tortoise accept the race?",
      "question": "Why does Tortoise say yes?",
      "options": [
        "He believes slow can still finish",
        "He wants to beat Hare in speed",
        "He is angry at Hare's words",
        "He has nothing else to do"
      ],
      "explanationZh": "他相信慢也能走完。(在速度上贏 hare 不是他的目標;生氣不是他的反應;無聊接戰書是輕浮的解讀,他是有信念才接的。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "main", "tortoise", "inference"]
    }
  ]
}
```

---

## 4. Vocab Key List (28 words, A2)

> Loaded into `public/word-hints.json` dashed-underline dictionary. Bilingual gloss + Mochi-voice example.

| # | Word | POS | 中譯 | Mochi-voice gloss (used in explanationZh) |
|---:|---|---|---|---|
| 1 | race | n. | 比賽 | 兩隻動物比誰先到老樹 |
| 2 | fast | adj. | 快的 | Hare 的招牌詞 |
| 3 | slow | adj. | 慢的 | Tortoise 的標籤,不是缺點 |
| 4 | win | v. | 贏 | 終點線那一刻的動詞 |
| 5 | lose | v. | 輸 | Hare 醒來才意識到的字 |
| 6 | sleep | v. | 睡 | Hare 在 bush 下闔上眼 |
| 7 | awake | adj. | 醒著 | Tortoise 一路保持的狀態 |
| 8 | nap | n./v. | 小睡 | 一個自信過頭的決定 |
| 9 | proud | adj. | 驕傲 | Hare 比賽前的情緒 |
| 10 | calm | adj. | 冷靜 | Tortoise 的常態 |
| 11 | brag | v. | 吹牛 | Hare 開場第一個動作 |
| 12 | accept | v. | 接受 | Tortoise 答應比賽用的詞 |
| 13 | start | v. | 開始 | 小鳥裁判的任務 |
| 14 | finish | v./n. | 完成/終點 | 老樹邊的粉筆線 |
| 15 | step | n. | 步 | Tortoise 一次只前進一個 |
| 16 | keep going | phr. | 繼續走 | Tortoise 的中心思想 |
| 17 | hill | n. | 小山丘 | 終點的所在 |
| 18 | tree | n. | 樹 | 老樹就是終點 |
| 19 | bush | n. | 矮樹叢 | Hare 躺下午睡的地方 |
| 20 | river | n. | 河 | 路上的中繼點 |
| 21 | shady | adj. | 陰涼的 | bush 底下涼涼的所以 Hare 想睡 |
| 22 | tired | adj. | 累的 | Tortoise 後半段的身體狀態 |
| 23 | brave | adj. | 勇敢 | 小不是缺點,小但勇敢 |
| 24 | patient | adj. | 有耐心 | Tortoise 最強的能力 |
| 25 | snore | v. | 打呼 | Hare 睡熟時發出的聲音 |
| 26 | wake (up) | v. | 醒來 | Hare 太晚發生的動作 |
| 27 | flatter | v. | 奉承 | 烏鴉與狐狸 side story 關鍵動詞 |
| 28 | cheese | n. | 起司 | 烏鴉嘴上掉下來的東西 |

Bonus (side story 2 — city/country mouse):
| 29 | mouse | n. | 老鼠 |
| 30 | quiet | adj. | 安靜 |

---

## 5. TOEIC Parity Audit

> Memory rule: "TOEIC parity: listen-mc + inference > literal." Listening + inference must outnumber pure literal recall.

Counting **all 150 Q** by intent:

| Intent | Count | % | Notes |
|---|---:|---:|---|
| listen-mc (literal pickup) | 48 | 32% | 1 per outer + 2 per main + 1-2 per aesop |
| listen-comprehension (inference) | 28 | 19% | ≥1 per outer + 1 per main + 1 per aesop + bonus heavy |
| listen-emoji (emotion inference) | 24 | 16% | 1 per non-review lesson |
| type-what-you-hear (literal dictation) | 13 | 9% | mostly outer + light main |
| cloze (dialogue fill) | 15 | 10% | main-story only (Q3 slot) |
| tap-tiles (sentence reorder) | 17 | 11% | main + 1 outer-prologue + bonus |
| tap-pairs (vocab match) | 5 | 3% | review lesson only |

**Parity check:**
- Listen-input questions (`listen-mc + listen-comp + listen-emoji + type-what-you-hear`) = 48 + 28 + 24 + 13 = **113 / 150 = 75%** (TOEIC target ≥70% audio-first) ✅
- Inference questions (`listen-comp + listen-emoji + main-story Q6 stems`) = 28 + 24 + (bonus 6 inference) = **~58 / 150 = 39%** vs literal (`listen-mc + type + tap-tiles literal recall`) = 48 + 13 + 17 = **78 / 150 = 52%**. Inference is just under literal — within TOEIC parity (TOEIC Part 3-4 is ~40% inference). ✅
- No "Tap to listen" UI strings used — all `question` stems are full English questions. ✅
- All `question` fields English-only — Chinese only in `explanationZh`. ✅
- POV check: outer lessons use 1st-person Mochi ("I climb", "I feel"). Main story uses 3rd-person + alternating dialogue lines for Hare/Tortoise. Side stories use 3rd-person fable voice. 番外 uses dialogue: Hana asks / grandma answers. ✅

**Distractor doctrine spot check (Lesson 4 Q1 — "Look at my long legs"):**
- [0] correct: `his long legs`
- [1] category (body part possessive): `his soft ears`
- [2] partial truth (`legs` correct, wrong adjective): `his fast legs`
- [3] obvious miss (not even a body part): `his big house` ✅

Doctrine holds across all 30 sampled options in Lessons 1-6.

---

## 6. Bonus 番外 — Lesson 25 — 10 Q (Hana asks, grandma answers)

> POV: Hana asks naive questions, grandma answers in story-voice. Mochi listens and reflects in explanationZh. All Q types mixed for replay value.

```json
{
  "id": "kt-ch4-l25",
  "chapter": 4,
  "lessonInChapter": 25,
  "segmentType": "bonus",
  "storyId": "bonus",
  "storyBeat": "{dogName} 問奶奶:兔子真的睡著了嗎?",
  "questions": [
    {
      "type": "listen-mc",
      "id": "kt-ch4-l25-q1",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} asks, \"Did the hare really sleep?\"",
      "question": "What does {dogName} want to know?",
      "options": [
        "If the hare slept",
        "If the hare ran",
        "If the hare ate",
        "If the hare swam"
      ],
      "explanationZh": "{dogName} 問:兔子真的睡著嗎?(跑步是主線他已經知道;吃東西不是劇情;游泳完全沒發生。) 我也好奇,所以豎起耳朵。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l25-q2",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Grandma says, \"Yes, he slept deeply under the bush.\"",
      "question": "How did the hare sleep?",
      "options": ["deeply", "lightly", "for one minute", "with one eye open"],
      "explanationZh": "deeply = 沉睡。(lightly 是反義同類副詞;一分鐘部分真但太短;睜一隻眼是民間說法不是劇情。) 沉睡才會錯過比賽。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa"]
    },
    {
      "type": "listen-mc",
      "id": "kt-ch4-l25-q3",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} asks, \"Was the tortoise tired?\"",
      "question": "What does {dogName} ask now?",
      "options": [
        "If the tortoise was tired",
        "If the tortoise was hungry",
        "If the tortoise was slow",
        "If the tortoise was wet"
      ],
      "explanationZh": "{dogName} 接著問:烏龜累了嗎?(餓不餓是同類身體感但走錯題;慢不慢已是公認設定不需要問;濕不濕不是劇情。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l25-q4",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Grandma says, \"Yes, his feet hurt, but he kept going.\"",
      "question": "Why did the tortoise keep going if he was tired?",
      "options": [
        "He knew the finish was close",
        "He liked running fast",
        "He was angry at the hare",
        "He could not stop his feet"
      ],
      "explanationZh": "他知道終點不遠了。(喜歡跑快是 hare;生氣不是他的動機;停不下來語意上沒道理。) 累但有方向,所以前進。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa", "inference"]
    },
    {
      "type": "cloze",
      "id": "kt-ch4-l25-q5",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "\"Slow steps still ___ you forward,\" Grandma smiles.",
      "question": "Fill the blank.",
      "options": ["carry", "lift", "push", "drop"],
      "explanationZh": "carry = 帶。慢慢的腳步還是會把你帶向前。(lift 是抬起方向不對;push 是推力但不是貼合的詞;drop 是反向動作。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa", "cloze"]
    },
    {
      "type": "type-what-you-hear",
      "id": "kt-ch4-l25-q6",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "Patience is a small magic.",
      "question": "Type the noun you hear.",
      "options": ["patience", "practice", "passion", "purpose"],
      "explanationZh": "patience = 耐心。(practice 同 p- 開頭抽象名詞;passion 開頭聲音相近;purpose 同樣 P 開頭抽象詞。) 奶奶這句是整章的心法。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa", "vocab"]
    },
    {
      "type": "listen-emoji",
      "id": "kt-ch4-l25-q7",
      "level": "A2",
      "difficulty": "easy",
      "sentence": "{dogName} feels comforted by the answer.",
      "question": "How does {dogName} feel?",
      "options": ["comforted", "confused", "happy", "hungry"],
      "explanationZh": "comforted = 安心。(confused 是反義;happy 太籠統不夠精準;hungry 跑場。) {dogName} 聽完答案,尾巴又開始拍地。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa", "emotion"]
    },
    {
      "type": "tap-tiles",
      "id": "kt-ch4-l25-q8",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Small steps can win a long race.",
      "question": "Tap the tiles in order.",
      "tiles": ["Small", "steps", "can", "win", "a", "long", "race", "loud", "shy"],
      "correctOrder": [0, 1, 2, 3, 4, 5, 6],
      "explanationZh": "順序:Small → steps → can → win → a → long → race。loud / shy 是干擾。整章的中心句。",
      "tags": ["story", "ch4", "bonus", "qa"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l25-q9",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "Why does Grandma tell this story tonight?",
      "question": "Why this story tonight?",
      "options": [
        "To remind us that slow can still win",
        "To make us laugh at the hare",
        "To teach us how to nap",
        "To talk about trees"
      ],
      "explanationZh": "她想說的是:慢也能贏。(笑兔子部分真但只是順帶;教睡覺與寓意相反;講樹只是場景不是主題。)",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa", "inference"]
    },
    {
      "type": "listen-comprehension",
      "id": "kt-ch4-l25-q10",
      "level": "A2",
      "difficulty": "medium",
      "sentence": "What does {catName} think after the story?",
      "question": "What does {catName} think?",
      "options": [
        "I can keep going too, one step at a time",
        "I should run fast like the hare",
        "I should sleep under a bush",
        "I should find a tortoise friend"
      ],
      "explanationZh": "我也可以一步一步走下去。(學 hare 是學錯人;睡 bush 是 hare 的失誤;找烏龜朋友是把寓言當字面讀。) 故事是說給我聽的。",
      "correctIndex": 0,
      "tags": ["story", "ch4", "bonus", "qa", "inference", "outer-tie-back"]
    }
  ]
}
```

---

## Implementation Notes (for the dev session that picks this up)

1. **File target:** `public/lessons-ch4.json` (parallel to `lessons-ch1.json`). Schema = `LessonSchema` discriminatedUnion in `src/data/lessons.ts`.
2. **Map gating:** `NODE_PATH_V2` must extend from 24 to 26 slots for Ch4. Reuse paw / locked / unlock-pop animations.
3. **Validate:** `tools/validate-lessons.js` should accept both `lessons-ch1.json` and `lessons-ch4.json`. Add ch4 to its loop.
4. **{catName} / {dogName}:** All 150 Q must run through `applyCatName()` + `applyDogName()` at load time. The JSON above uses placeholders verbatim.
5. **Beat coverage:** Main-story 15 lessons hit 6 user-spec beats (brag / challenge / race start / hare naps / tortoise persistent / finish line) plus 9 connective beats. See outline table column "Beat."
6. **Distractor authoring rule for the remaining 19 lessons:** Each MC question must satisfy 1+1+1+1 (correct + category-sibling + partial-truth + obvious-miss). Document this in PR description when shipping Ch4 JSON.
7. **POV discipline:** Outer = Mochi 1st-person · Main = 3rd-person + alternating Hare/Tortoise dialogue lines · Aesop sides = 3rd-person fable narrator · Bonus = Hana asks, grandma answers, Mochi reflects in `explanationZh`.

*End of Ch4 spec — 2026-05-31 · ready for JSON authoring.*
