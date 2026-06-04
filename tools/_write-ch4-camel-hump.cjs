#!/usr/bin/env node
/**
 * Ch4 駱駝為什麼有駝峰 — 7 lessons × 11 Q each (77 Q total).
 *
 * Canon: docs/canon/camel-hump.md (Kipling 2nd-person "O Best Beloved" voice)
 * Cuts:  docs/canon/camel-hump-cuts.md (7 cuts heavy B6/B4, L6 = unique B1)
 *
 * Per-lesson 11 Q template (匹配 Ch1 momotaro template):
 *   q1  tap-pairs vocabIntro (4 ZH-EN)
 *   q2  narration  — beat A setup
 *   q3  narration  — beat A 加深 / 觀眾位置
 *   q4  listen-tf inference (A/B/C/D rotate)
 *   q5  narration  — beat B 推進
 *   q6  listen-mc paraphrase
 *   q7  narration  — beat C 加碼
 *   q8  listen-mc paraphrase
 *   q9  narration  — beat D 轉折
 *   q10 emoji-pick OR listen-comp gist (rotate to keep variety)
 *   q11 HOOK narration — inquiry-terminating per cut md
 *
 * Voice rule: Kipling "O Best Beloved" 第二人稱保留 ≥1 narration line per lesson.
 * A2 簡化: 用 "you see, my dear" / "you" 替代難字, 不強迫每句都第二人稱.
 *
 * Hard rules (lint catches):
 *  R1 stem ≤ 11 words
 *  R2 correct option paraphrase, never verbatim (X3 anti-verbatim)
 *  R3 A2 vocab whitelist (no idled/shirked/lectured → use 'did nothing' / 'walked away from work' / 'talked sternly')
 *  R4 listen-tf must inference, not lookup
 *  R5 explanationZh 寫推理路徑
 *  R6 speaker every Q
 *  X3 anti-verbatim: correct option words NOT all in sentence
 *
 * Budget: 5 min/lesson (11 Q × ~27s avg)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch4.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch4', 'camel-hump'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch4', 'camel-hump', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch4', 'camel-hump'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch4', 'camel-hump', 'gist'],
    subSkill: 'gist' };
}
function inferLc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch4', 'camel-hump'],
    subSkill: 'inference' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch4', 'camel-hump', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch4', 'camel-hump', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch4-1 Beat 1 — The Lazy Camel
  // Hook: B3 資訊缺口 — "Humph" 是什麼意思?他在躲什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch4-l1', chapter: 4, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'camel-hump',
    storyBeat: '懶駱駝 — "Humph" 是什麼?',
    questions: [
      vocabIntro('kt-ch4-l1-q1', [
        ['沙漠', 'desert'],
        ['工作', 'work'],
        ['動物', 'animal'],
        ['世界', 'world'],
      ]),
      // Q2 BEAT A — Kipling voice opener (preserves "O Best Beloved" tag)
      nar('kt-ch4-l1-q2',
        'Long ago, my dear, the world was new and shining.',
        '很久以前,親愛的聽眾,世界是嶄新而閃亮的。'),
      // Q3 setup — other animals working
      nar('kt-ch4-l1-q3',
        'All the animals began to learn to help Man.',
        '所有動物都開始學著幫人類做事。'),
      // Q4 TF inference — A: atmosphere (middle of desert = alone)
      tf('kt-ch4-l1-q4',
        'The Camel lived alone in the middle of the wide sand.',
        '駱駝獨自住在寬廣的沙地中間。',
        'Did the Camel live near other animals?', 'N',
        '推理:獨自 + 沙漠中間 → 附近沒別人 → 答 No'),
      // Q5 BEAT B — the lazy camel's habit
      nar('kt-ch4-l1-q5',
        'You see, my dear, the Camel did nothing all day long.',
        '你看,親愛的,駱駝整天什麼也不做。'),
      // Q6 listen-mc paraphrase about his behavior
      mc('kt-ch4-l1-q6',
        'When others asked, the Camel only made a short rude noise.',
        'How did the Camel reply to others?',
        ['by singing a song', 'with a rude sound', 'using a smile', 'in a long story'],
        ['唱一首歌', '用粗魯的聲音', '用微笑', '講一個長故事'],
        1,
        '短而沒禮貌的 noise → 粗魯的聲音。'),
      // Q7 BEAT C — the one word he said
      nar('kt-ch4-l1-q7',
        'He only said one thing: "Humph!" and turned away.',
        '他只說一個字:「Humph!」然後就轉開。'),
      // Q8 listen-mc paraphrase — what humph means
      mc('kt-ch4-l1-q8',
        'It was his lazy way to push the others off.',
        'What did "Humph" mean for the Camel?',
        ['hello', 'come help me', 'go away from me', 'i am hungry'],
        ['你好', '來幫我', '走開不要煩我', '我餓了'],
        2,
        '懶懶推開別人 → 「走開」的意思。'),
      // Q9 BEAT D — transition (animals begin to feel something)
      nar('kt-ch4-l1-q9',
        'The other animals all worked hard from sun-up to sun-down.',
        '其他動物從日出工作到日落。'),
      // Q10 emoji-pick — environment
      emoji('kt-ch4-l1-q10',
        'Where did the Camel live?',
        'Where did the Camel live?',
        ['🏜️ a desert', '🌊 the sea', '🌲 a forest', '🏔️ a snowy hill'],
        ['沙漠', '海邊', '森林', '雪山'],
        0,
        '住在沙地中間 → 沙漠。'),
      // Q11 HOOK NARRATION — B3 資訊缺口 ("Humph" 還沒解 + 為什麼躲)
      nar('kt-ch4-l1-q11',
        'And all he ever said was that one short word: "Humph!"',
        '而他始終就只說這一個短短的字:「Humph!」……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch4-2 Beat 2 — The Three Helpers Visit
  // Hook: B6 預言種子 — 他們要告狀嗎?Man 會怎麼處理?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch4-l2', chapter: 4, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'camel-hump',
    storyBeat: '三個夥伴去找他 — 他們要告狀嗎?',
    questions: [
      vocabIntro('kt-ch4-l2-q1', [
        ['馬', 'horse'],
        ['狗', 'dog'],
        ['牛', 'ox'],
        ['答話', 'answer'],
      ]),
      // Q2 horse arrives — "you" 第二人稱保留
      nar('kt-ch4-l2-q2',
        'Now you see, my dear, the Horse came first to the Camel.',
        '現在你看,親愛的,馬第一個來找駱駝。'),
      // Q3 the request
      nar('kt-ch4-l2-q3',
        'He said, "Come and trot with me like the rest of us."',
        '他說:「跟我一起小跑,像我們其他人一樣。」'),
      // Q4 TF inference — D: contrast (horse asked → camel did what?)
      tf('kt-ch4-l2-q4',
        'The Camel made the same short sound and turned his face away.',
        '駱駝發出同樣的短聲,然後把臉轉開。',
        'Did the Camel agree to help?', 'N',
        '推理:同樣的短聲 + 把臉轉開 → 拒絕 → 答 No'),
      // Q5 BEAT B — dog comes next
      nar('kt-ch4-l2-q5',
        'Then the Dog ran up with a bone in his teeth.',
        '然後狗叼著一根骨頭跑過來。'),
      // Q6 listen-mc — what dog asked
      mc('kt-ch4-l2-q6',
        'The Dog wanted help to bring and pick up things for Man.',
        'What did the Dog ask the Camel to do?',
        ['sleep with him', 'help with carrying jobs', 'eat his bone', 'leave the desert'],
        ['跟他睡', '幫忙搬東西', '吃他骨頭', '離開沙漠'],
        1,
        '帶東西回來 + 撿起來 → 幫忙搬。'),
      // Q7 BEAT C — ox is third
      nar('kt-ch4-l2-q7',
        'Last of all, my dear, the Ox came slowly with his big head.',
        '最後,親愛的,牛慢慢地用他的大頭走來。'),
      // Q8 listen-mc — same answer to all three
      mc('kt-ch4-l2-q8',
        'Each time, the Camel gave them the same short rude reply.',
        'How did the Camel answer the three?',
        ['kindly each time', 'in three different ways', 'the same rude way', 'with a long song'],
        ['每次都親切', '用三種不同方式', '同樣粗魯的方式', '用一首長歌'],
        2,
        '每次都同樣粗魯 → 同樣粗魯的方式。'),
      // Q9 BEAT D — three look at each other (per cut md)
      nar('kt-ch4-l2-q9',
        'The three friends looked at each other for a long moment.',
        '三個朋友互相看了很久。'),
      // Q10 listen-comp gist (替代 emoji this lesson — 變化)
      gist('kt-ch4-l2-q10',
        'Three animals came one by one, and each one walked away with no help.',
        'What is this scene mainly showing?',
        ['three friends all turned away by the Camel',
         'a sleepy Camel in his bed',
         'animals having a big party',
         'the Horse teaching the Camel'],
        ['三個都被駱駝拒絕', '想睡的駱駝在床上', '動物們開大派對', '馬教駱駝'],
        0,
        '主旨 = 三個都被拒絕。'),
      // Q11 HOOK — B6 預言種子 (Man 會處理 — 但怎麼處理?)
      nar('kt-ch4-l2-q11',
        'Then, without a word, the three turned and walked off to find Man...',
        '然後三人一句話也沒說,轉身去找人類……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch4-3 Beat 3 — Man Sets a Rule
  // Hook: B4 期待加速 — 沙塵裡是什麼?是誰來了?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch4-l3', chapter: 4, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'camel-hump',
    storyBeat: 'Man 訂規矩 — 沙塵裡誰來了?',
    questions: [
      vocabIntro('kt-ch4-l3-q1', [
        ['規矩', 'rule'],
        ['累', 'tired'],
        ['生氣', 'angry'],
        ['雲', 'cloud'],
      ]),
      // Q2 BEAT — three reach Man
      nar('kt-ch4-l3-q2',
        'You can guess, my dear, where the three went to tell their story.',
        '你可以猜到,親愛的,三人去找誰說這件事。'),
      // Q3 they speak to Man
      nar('kt-ch4-l3-q3',
        'They told Man that the Camel would not lift a finger.',
        '他們告訴人,駱駝連一根手指都不肯動。'),
      // Q4 TF inference — B: action implication (Man stood up = serious)
      tf('kt-ch4-l3-q4',
        'Man stood up at once and put both hands on his hips.',
        '人馬上站起來,雙手叉腰。',
        'Was Man pleased with the news?', 'N',
        '推理:馬上站起 + 雙手叉腰 → 嚴肅不高興 → 答 No'),
      // Q5 BEAT B — Man's ruling
      nar('kt-ch4-l3-q5',
        'Man said, "Then you three must work double every day."',
        '人說:「那麼你們三個每天要做雙倍的工作。」'),
      // Q6 listen-mc — what "work double" means
      mc('kt-ch4-l3-q6',
        'They had to do their own work and the Camel\'s work too.',
        'What did "work double" mean for them?',
        ['twice as much sleep', 'twice as much food', 'their share plus his share', 'half as much work'],
        ['兩倍睡眠', '兩倍食物', '自己的份加他的份', '一半工作'],
        2,
        '自己工作 + 駱駝工作 → 自己的份加他的份。'),
      // Q7 BEAT C — three become tired (canon line)
      nar('kt-ch4-l3-q7',
        'And so the three grew very tired and very, very angry.',
        '於是三人變得非常累,而且非常非常生氣。'),
      // Q8 listen-mc paraphrase about anger
      mc('kt-ch4-l3-q8',
        'Their backs hurt and they kicked the sand each evening.',
        'How did the three feel after many days?',
        ['fresh and happy', 'sore and upset', 'rich and lucky', 'sleepy and bored'],
        ['有精神又開心', '痠痛又難過', '富有又幸運', '想睡又無聊'],
        1,
        '背痛 + 踢沙 → 痠痛又難過。'),
      // Q9 BEAT D — a thing appears on the horizon
      nar('kt-ch4-l3-q9',
        'One evening, a tall pillar of dust came rolling across the sand.',
        '一個晚上,一根高高的沙柱從沙地上滾過來。'),
      // Q10 emoji-pick about what's coming
      emoji('kt-ch4-l3-q10',
        'What came toward them across the desert?',
        'What came toward them?',
        ['☁️ a cloud of dust', '🌧️ a rain cloud', '🦅 a big eagle', '🚂 a train'],
        ['沙塵雲', '雨雲', '大老鷹', '火車'],
        0,
        '滾來的沙柱 → 沙塵雲。'),
      // Q11 HOOK — B4 期待加速 (是誰?)
      nar('kt-ch4-l3-q11',
        'The dust rolled closer and closer, and inside it something moved...',
        '沙塵越滾越近,裡面有東西在動……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch4-4 Beat 4 — The Djinn Arrives
  // Hook: B5 道德兩難 — Djinn 會幫誰?會罰駱駝嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch4-l4', chapter: 4, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'camel-hump',
    storyBeat: 'Djinn 來了 — 他會幫誰?',
    questions: [
      vocabIntro('kt-ch4-l4-q1', [
        ['精靈', 'djinn'],
        ['故事', 'story'],
        ['問', 'ask'],
        ['幫忙', 'help'],
      ]),
      // Q2 BEAT — Kipling style intro
      nar('kt-ch4-l4-q2',
        'Now, O dear listener, the dust opened and a Djinn stepped out.',
        '親愛的聽眾,沙塵打開,一個精靈走了出來。'),
      // Q3 djinn looks at three
      nar('kt-ch4-l4-q3',
        'He looked at the three tired animals with kind eyes.',
        '他用親切的眼睛看著三個疲累的動物。'),
      // Q4 TF inference — A: atmosphere (kind eyes → willing to help)
      tf('kt-ch4-l4-q4',
        'The Djinn sat down low so he was the same height as the Dog.',
        '精靈坐低下來,跟狗一樣高。',
        'Did the Djinn act in a friendly way?', 'Y',
        '推理:坐低平視狗 → 友善 → 答 Yes'),
      // Q5 BEAT B — they tell him
      nar('kt-ch4-l4-q5',
        'The Horse and Dog and Ox shared every part of their story.',
        '馬、狗、牛把整件事都告訴他。'),
      // Q6 listen-mc — about why they were upset
      mc('kt-ch4-l4-q6',
        'They said one friend would not help and they did all his jobs.',
        'Why were they upset at the Camel?',
        ['eating too much food', 'walking away from work', 'singing too loud', 'stealing from Man'],
        ['吃太多', '逃避工作', '唱太大聲', '偷人東西'],
        1,
        '不幫忙 + 別人做他的工 → 他逃避工作。'),
      // Q7 BEAT C — Djinn ponders
      nar('kt-ch4-l4-q7',
        'The Djinn rubbed his chin and thought for a long while.',
        '精靈搓著下巴,想了很久。'),
      // Q8 listen-mc — what he wanted next
      mc('kt-ch4-l4-q8',
        'He wanted to find out where this lazy friend was hiding.',
        'What did the Djinn want to know?',
        ['the Camel\'s name', 'where the Camel was', 'what Man ate for lunch', 'how old the Dog was'],
        ['駱駝名字', '駱駝在哪裡', '人午餐吃什麼', '狗幾歲'],
        1,
        '想找懶夥伴在躲哪 → 駱駝在哪裡。'),
      // Q9 BEAT D — Djinn asks the key question (canon line)
      nar('kt-ch4-l4-q9',
        '"Where is this Camel?" the Djinn asked in a deep, soft voice.',
        '「這隻駱駝在哪裡?」精靈用低沉柔軟的聲音問。'),
      // Q10 listen-comp gist
      gist('kt-ch4-l4-q10',
        'A new friend has come, has heard the three sad stories, and is ready to act.',
        'What is this scene mainly showing?',
        ['the Djinn meeting the three and getting ready',
         'the Camel learning to dance',
         'Man cooking dinner for the animals',
         'the Horse winning a race'],
        ['精靈見三人並準備行動', '駱駝學跳舞', '人煮晚餐給動物', '馬贏比賽'],
        0,
        '主旨 = 精靈見三人後準備出手。'),
      // Q11 HOOK — B5 道德兩難 (he will help — but how?)
      nar('kt-ch4-l4-q11',
        '"I will go to him myself," the Djinn said, and rose into the air...',
        '「我自己去找他,」精靈說著,飛上了天空……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch4-5 Beat 5 — The Warning
  // Hook: B6 預言種子 — 是什麼魔法?駱駝會變什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch4-l5', chapter: 4, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'camel-hump',
    storyBeat: 'Djinn 警告 — 是什麼魔法?',
    questions: [
      vocabIntro('kt-ch4-l5-q1', [
        ['朋友', 'friend'],
        ['聽見', 'hear'],
        ['坐下', 'sit down'],
        ['魔法', 'magic'],
      ]),
      // Q2 BEAT — Djinn arrives (Kipling voice)
      nar('kt-ch4-l5-q2',
        'You see, my dear, the Djinn flew to the Howling Desert.',
        '你看,親愛的,精靈飛到了 Howling Desert。'),
      // Q3 finds the camel
      nar('kt-ch4-l5-q3',
        'The Camel sat under a thorn tree, doing nothing at all.',
        '駱駝坐在一棵帶刺的樹下,什麼也沒做。'),
      // Q4 TF inference — C: time accumulation (long slow look = serious)
      tf('kt-ch4-l5-q4',
        'The Djinn watched him for many slow, quiet minutes.',
        '精靈靜靜地看了他好幾分鐘。',
        'Did the Djinn act in a rushed way?', 'N',
        '推理:好幾分鐘 + 靜靜 → 不急 → 答 No'),
      // Q5 BEAT B — Djinn speaks
      nar('kt-ch4-l5-q5',
        'The Djinn said, "My friend, I have heard a sad report."',
        '精靈說:「我的朋友,我聽到一個難過的報告。」'),
      // Q6 listen-mc — what the report is about
      mc('kt-ch4-l5-q6',
        'He spoke about a friend who would not lift his share.',
        'What was the report about?',
        ['a fine dinner', 'singing contest', 'one friend skipping his share', 'a new desert'],
        ['一頓晚餐', '唱歌比賽', '一個朋友不做份內事', '新沙漠'],
        2,
        '不抬自己的份 → 一個朋友不做份內事。'),
      // Q7 BEAT C — Camel's stubborn reply
      nar('kt-ch4-l5-q7',
        'The Camel only said his one rude word once more: "Humph!"',
        '駱駝再次只說他那個粗魯的字:「Humph!」'),
      // Q8 listen-mc — Camel's choice
      mc('kt-ch4-l5-q8',
        'He chose to stick with the same lazy reply once again.',
        'How did the Camel choose to act?',
        ['agreed quickly', 'gave the same rude reply', 'ran far away', 'asked for food'],
        ['很快答應', '同樣的粗魯回答', '逃跑', '要食物'],
        1,
        '又是那個粗魯字 → 同樣的粗魯回答。'),
      // Q9 BEAT D — Djinn starts to make magic (canon line)
      nar('kt-ch4-l5-q9',
        'The Djinn sat down and placed his chin upon his hand.',
        '精靈坐下,把下巴擱在手上。'),
      // Q10 emoji-pick — what is coming
      emoji('kt-ch4-l5-q10',
        'What was the Djinn about to do?',
        'What was he about to do?',
        ['✨ make a magic', '🍞 cook some bread', '🛏️ take a nap', '📚 read a book'],
        ['施魔法', '煮麵包', '睡午覺', '讀書'],
        0,
        '坐下 + 下巴在手 → 進入施法姿勢。'),
      // Q11 HOOK — B6 預言種子 (是什麼魔法?)
      nar('kt-ch4-l5-q11',
        'Then, very slowly, the Djinn began to make a great Magic...',
        '然後,很慢很慢地,精靈開始施一個大魔法……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch4-6 Beat 6 — The Hump Appears
  // Hook: B1 物理懸念 — 背要變成什麼?還會停嗎? (唯一 B1)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch4-l6', chapter: 4, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'camel-hump',
    storyBeat: '駝峰出現 — 背還會停嗎?',
    questions: [
      vocabIntro('kt-ch4-l6-q1', [
        ['平的', 'flat'],
        ['背', 'back'],
        ['後面', 'behind'],
        ['駝峰', 'hump'],
      ]),
      // Q2 BEAT — Kipling triplet vibe (puff and puff and puff)
      nar('kt-ch4-l6-q2',
        'Now watch, my dear, what happened next under that hot sun.',
        '現在仔細看,親愛的,在那烈日下發生了什麼。'),
      // Q3 the magic starts
      nar('kt-ch4-l6-q3',
        'The Camel\'s back was flat and smooth, like a wide soft mat.',
        '駱駝的背平平滑滑,像一塊寬寬的軟墊。'),
      // Q4 TF inference — D: contrast (flat = no hump yet)
      tf('kt-ch4-l6-q4',
        'You could place a small cup on his back and it would not slide.',
        '你可以把一個小杯子放在他背上,杯子不會滑。',
        'Did the Camel already have a hump?', 'N',
        '推理:杯子不滑 → 背平的 → 還沒駝峰 → 答 No'),
      // Q5 BEAT B — humph triggers the magic (canon)
      nar('kt-ch4-l6-q5',
        'The Camel said "Humph!" one more time, just to be rude.',
        '駱駝又說了一次「Humph!」,只是為了無禮。'),
      // Q6 listen-mc — what started to happen
      mc('kt-ch4-l6-q6',
        'And as he said that word, his flat back began to push up.',
        'What happened to his back right then?',
        ['fell flatter', 'started to rise', 'turned blue', 'grew fur'],
        ['變更平', '開始隆起', '變藍', '長毛'],
        1,
        '推上去 → 開始隆起。'),
      // Q7 BEAT C — kipling triplet "it puffed and puffed and puffed"
      nar('kt-ch4-l6-q7',
        'It puffed up and puffed up and puffed up some more.',
        '它鼓起來、又鼓起來、又再鼓起來。'),
      // Q8 listen-mc — Camel's view of his back (anti-verbatim: paraphrase)
      mc('kt-ch4-l6-q8',
        'When he turned his head, a great soft shape was rising up behind.',
        'What did the Camel see behind him?',
        ['his tail growing long', 'a new bump on his back', 'one green tree', 'two small birds'],
        ['尾巴變長', '背上一個新隆起', '一棵綠樹', '兩隻小鳥'],
        1,
        '又大又軟的形狀在背後 → 背上新隆起。'),
      // Q9 BEAT D — naming it (preserves canon "lolloping hump")
      nar('kt-ch4-l6-q9',
        'It was, my dear, his very own big hump — and it stayed.',
        '親愛的,那是他自己的大駝峰 — 而且不會消失。'),
      // Q10 emoji-pick — what the camel now has
      emoji('kt-ch4-l6-q10',
        'What did the Camel now have on his back?',
        'What was on his back?',
        ['🐪 a hump', '🎒 a school bag', '🪺 a bird nest', '🌵 a cactus'],
        ['駝峰', '書包', '鳥窩', '仙人掌'],
        0,
        '背上隆起 → 駝峰。'),
      // Q11 HOOK — B1 物理懸念 (還會停嗎? 變多大?)
      nar('kt-ch4-l6-q11',
        'And the great hump rose higher and higher above his back...',
        '巨大的駝峰在他背上越長越高、越長越高……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch4-7 Beat 7 — The Lesson
  // Hook: B2 大翻轉 + 開放後鉤 — (user 自己背的包袱是什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch4-l7', chapter: 4, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'camel-hump',
    storyBeat: '教訓 — 你背上的是什麼?',
    questions: [
      vocabIntro('kt-ch4-l7-q1', [
        ['自己', 'own'],
        ['帶來', 'bring'],
        ['三天', 'three days'],
        ['忘記', 'forget'],
      ]),
      // Q2 BEAT — Djinn speaks
      nar('kt-ch4-l7-q2',
        'Then the Djinn turned, my dear, and spoke clear and slow.',
        '然後精靈轉過身,親愛的,慢慢清楚地說。'),
      // Q3 the lesson line (canon)
      nar('kt-ch4-l7-q3',
        'He said, "That hump is what you brought upon yourself."',
        '他說:「那個駝峰是你自己帶到自己身上的。」'),
      // Q4 TF inference — B: action implication (you brought it = your fault)
      tf('kt-ch4-l7-q4',
        'The Camel hung his head and looked at the sand for a long time.',
        '駱駝低下頭,看著沙地看很久。',
        'Did the Camel feel proud of his new hump?', 'N',
        '推理:低頭看沙看很久 → 不是驕傲,是難過 → 答 No'),
      // Q5 BEAT B — Djinn explains use of hump
      nar('kt-ch4-l7-q5',
        'The Djinn said, "Now you can work three days with no food."',
        '精靈說:「現在你可以三天不吃東西也能工作。」'),
      // Q6 listen-mc — what the hump is for
      mc('kt-ch4-l7-q6',
        'The big shape stored what he needed to live on the road.',
        'What was the hump good for?',
        ['holding water for friends', 'storing what he needs', 'making him run fast', 'keeping him warm at night'],
        ['幫朋友裝水', '儲存所需的東西', '讓他跑快', '讓他晚上暖'],
        1,
        '裝他路上需要的東西 → 儲存所需。'),
      // Q7 BEAT C — Camel joins the group
      nar('kt-ch4-l7-q7',
        'And so, my dear, the Camel went off to find the other three.',
        '於是,親愛的,駱駝去找另外三個夥伴。'),
      // Q8 listen-mc — how he joined
      mc('kt-ch4-l7-q8',
        'From that day, he carried bags across the sand with them.',
        'How did the Camel join the team at last?',
        ['singing songs', 'carrying bags', 'hiding from work', 'giving small gifts'],
        ['唱歌', '搬東西', '躲工作', '送小禮物'],
        1,
        '搬袋子過沙 → 搬東西。'),
      // Q9 BEAT D — final canon line
      nar('kt-ch4-l7-q9',
        'He still has that hump today, my dear, so he will never forget.',
        '他至今還有那個駝峰,親愛的,所以他永遠不會忘。'),
      // Q10 listen-comp inference — moral (not lookup)
      inferLc('kt-ch4-l7-q10',
        'The thing he tried to skip became the thing he carries every day.',
        'What does the hump teach us, my dear?',
        ['skipping work makes life easier',
         'work you skip can come back heavier',
         'all camels are born with humps',
         'magic is the best way to fix things'],
        ['逃避工作會輕鬆', '你逃的工作會變成包袱', '所有駱駝天生有駝峰', '魔法是最好辦法'],
        1,
        '推理:他逃的工作 → 變成背上的駝峰 → 逃 = 包袱。'),
      // Q11 HOOK — B2 大翻轉 + 開放後鉤 (user 自己背的包袱?)
      nar('kt-ch4-l7-q11',
        'And you, my dear — what hump might you be carrying tonight?',
        '而你,親愛的 — 今晚你背上又是什麼樣的駝峰呢?'),
    ],
  },
];

// ────────────────────────────────────────────────────────────────────
// Belt-and-braces: fix the q5 typo in Ch4-4 (id assigned via .replace
// hack earlier — robust check + rebuild)
// ────────────────────────────────────────────────────────────────────
for (const lesson of lessons) {
  lesson.questions.forEach((q, i) => {
    const expected = `${lesson.id}-q${i + 1}`;
    if (q.id !== expected) {
      console.warn(`  fix id: ${q.id} → ${expected}`);
      q.id = expected;
    }
  });
}

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
let tfCount = 0, gistCount = 0, narCount = 0, mcCount = 0, emojiCount = 0, vocabCount = 0, inferLcCount = 0;
for (const l of lessons) {
  for (const q of l.questions) {
    if (q.type === 'listen-tf') tfCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'gist') gistCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'inference') inferLcCount++;
    if (q.type === 'narration') narCount++;
    if (q.type === 'listen-mc') mcCount++;
    if (q.type === 'emoji-pick') emojiCount++;
    if (q.type === 'tap-pairs') vocabCount++;
  }
}
console.log(`     types: tap-pairs ${vocabCount} | narration ${narCount} | listen-tf ${tfCount} | listen-mc ${mcCount} | gist ${gistCount} | infer-lc ${inferLcCount} | emoji ${emojiCount}`);

// B1+ vocab quick scan
const banned = ['soared', 'scaled', 'bobbed', 'drifted', 'knelt', 'forgiveness',
  'blessed', 'majestic', 'idled', 'shirked', 'lectured', 'indignant',
  'exclaimed', 'scornful', 'lolloping'];
const raw = JSON.stringify(lessons).toLowerCase();
const hits = banned.filter(w => raw.includes(w));
if (hits.length) console.warn(`     ⚠  B1+ ban hits: ${hits.join(', ')}`);
else console.log(`     ✓  B1+ vocab clean`);
