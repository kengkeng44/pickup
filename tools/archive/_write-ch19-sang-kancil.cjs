#!/usr/bin/env node
/**
 * Ch19 — Sang Kancil (鼠鹿 — 小動物用智慧過河)
 *
 * Per docs/canon/sang-kancil.md + docs/canon/sang-kancil-cuts.md.
 * 7 lessons × 11 Q, dialogue-leaning voice (trickster talks to crocs).
 *
 * IP 鐵律:
 *   - Source: Sang Kancil oral folk cycle (Malaysia / Indonesia / Brunei).
 *     Maritime SEA oral tradition, no single named author, PD worldwide.
 *   - A2 自創句式, 不引特定譯本 / 教科書 / 動畫改編.
 *   - Sang Kancil 是 SEA trickster (像 Anansi / Br'er Rabbit / Reynard).
 *
 * Same skeleton as _write-ch3-tortoise-hare.cjs (vocab→nar→tf→mc...→hook).
 *
 * A2 vocab guard:
 *   deceive → trick / cunning → smart / outwit → use his head /
 *   furious → very angry / ravenous → hungry / enraged → angry
 *
 * Child-friendly safe surface:
 *   - 'trick' / 'lie' OK (智取主題就是 trickster tale 的核心)
 *   - 'smart' / 'clever' OK
 *   - crocodile 'opened mouths in anger' 不 'attacked' / 'bit'
 *   - No blood, no chase scene, no death
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch19.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch19', 'sang-kancil'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch19', 'sang-kancil', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch19', 'sang-kancil'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch19', 'sang-kancil', 'gist'],
    subSkill: 'gist' };
}
function inferLc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch19', 'sang-kancil'],
    subSkill: 'inference' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch19', 'sang-kancil', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch19', 'sang-kancil', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch19-1 — Beat 1 (Setup) → B6 預言種子
  // Hook: tall tree full of sweet ripe fruit
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch19-l1', chapter: 19, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'sang-kancil',
    storyBeat: '鼠鹿看見對岸水果 — 怎麼過河?',
    questions: [
      vocabIntro('kt-ch19-l1-q1', [
        ['小', 'small'],
        ['聰明', 'smart'],
        ['河', 'river'],
        ['水果', 'fruit'],
      ]),
      nar('kt-ch19-l1-q2',
        'Sang Kancil was a small mouse deer in the green forest.',
        'Sang Kancil 是綠色森林裡一隻小鼠鹿。'),
      nar('kt-ch19-l1-q3',
        'He was not big. He was not strong. But he was very smart.',
        '他不大。他不強。但他非常聰明。'),
      tf('kt-ch19-l1-q4',
        'Other animals often laughed at his short legs and tiny body.',
        '其他動物常笑他短短的腿和小小的身體。',
        'Did other animals think mouse deer was strong?', 'N',
        '推理:笑他短腿小身體 → 不覺得他強壯 → 答 No'),
      nar('kt-ch19-l1-q5',
        'One morning, he stood by the side of a wide river.',
        '一個早上,他站在一條寬寬的河邊。'),
      mc('kt-ch19-l1-q6',
        'Across the water he saw a tall tree full of sweet ripe fruit.',
        'What did mouse deer see across the river?',
        ['a tree with fruit', 'a friend deer', 'a big rock', 'an empty field'],
        ['有水果的樹', '朋友鹿', '大石頭', '空草地'],
        0,
        '高樹滿滿是熟水果 → 有水果的樹。'),
      nar('kt-ch19-l1-q7',
        '"That fruit looks so good," he said to himself, very softly.',
        '「那水果看起來好棒,」他小聲對自己說。'),
      emoji('kt-ch19-l1-q8',
        'How did mouse deer feel about the fruit?',
        'How did mouse deer feel?',
        ['😋 wanted to eat it', '😴 wanted to sleep', '😢 wanted to cry', '😡 was angry'],
        ['想吃', '想睡', '想哭', '生氣'],
        0,
        '看起來好棒 + 自言自語 → 很想吃。'),
      mc('kt-ch19-l1-q9',
        'But the river was wide. He could not see the bottom of the water.',
        'How wide was the river?',
        ['very small', 'very wide', 'almost dry', 'short and easy'],
        ['很小', '很寬', '幾乎乾了', '又短又容易'],
        1,
        '看不到底 → 很寬。'),
      gist('kt-ch19-l1-q10',
        'The little mouse deer stood by the river. The fruit tree stood far across the water.',
        'What is happening in this scene?',
        ['a mouse deer wants fruit on the other side',
         'a deer is swimming for fun',
         'animals are sleeping by a tree',
         'a hunter walks in the forest'],
        ['鼠鹿想要對岸的水果', '鹿在游泳玩耳',
         '動物在樹下睡覺', '獵人走在森林'],
        0,
        '主旨 = 鼠鹿想要對岸的水果。'),
      // Q11 HOOK (B6 預言種子)
      nar('kt-ch19-l1-q11',
        'Across the water he saw a tall tree full of sweet ripe fruit...',
        '在水的另一邊,他看到一棵高高的樹,上面全是又甜又熟的水果……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch19-2 — Beat 2 (Crocodiles) → B3 資訊缺口
  // Hook: long mouths waited under the river all day
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch19-l2', chapter: 19, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'sang-kancil',
    storyBeat: '河裡有很多鱷魚 — 該怎麼辦?',
    questions: [
      vocabIntro('kt-ch19-l2-q1', [
        ['寬', 'wide'],
        ['游泳', 'swim'],
        ['鱷魚', 'crocodile'],
        ['嘴巴', 'mouth'],
      ]),
      nar('kt-ch19-l2-q2',
        'Sang Kancil wanted to eat that fruit so much.',
        'Sang Kancil 好想好想吃那水果。'),
      tf('kt-ch19-l2-q3',
        'His small belly made a loud sound while he stood there.',
        '他站在那邊的時候,小肚子發出大大的聲音。',
        'Was mouse deer hungry?', 'Y',
        '推理:肚子發出聲音 → 餓了 → 答 Yes'),
      nar('kt-ch19-l2-q4',
        '"But the river is too wide. I cannot swim that far," he said.',
        '「但河太寬了。我游不了那麼遠,」他說。'),
      mc('kt-ch19-l2-q5',
        'His short legs could only swim a few steps before they got tired.',
        'Why could mouse deer not swim across?',
        ['the water was hot', 'his legs were too short',
         'he was sleeping', 'he had no time'],
        ['水很燙', '他的腿太短',
         '他在睡', '他沒時間'],
        1,
        '短腿游幾步就累 → 腿太短。'),
      nar('kt-ch19-l2-q6',
        'Many crocodiles lived in the dark water of the river.',
        '很多鱷魚住在這條河的暗色水裡。'),
      emoji('kt-ch19-l2-q7',
        'What lived in the river?',
        'What lived in the river?',
        ['🐊 lots of crocodiles', '🐠 small fish only', '🦆 ducks', '🐢 turtles'],
        ['很多鱷魚', '只有小魚', '鴨子', '烏龜'],
        0,
        '黑水裡住很多鱷魚 → 很多鱷魚。'),
      nar('kt-ch19-l2-q8',
        'Only their eyes and noses stuck up above the river.',
        '只有他們的眼睛和鼻子露出水面。'),
      mc('kt-ch19-l2-q9',
        'The water was so dark that mouse deer could not count them.',
        'Why could mouse deer not count the crocodiles?',
        ['they ran away fast', 'the water was too dark',
         'he was bad at math', 'they were sleeping'],
        ['他們跑很快', '水太暗',
         '他數學不好', '他們在睡'],
        1,
        '水黑看不到 → 水太暗。'),
      inferLc('kt-ch19-l2-q10',
        'Sang Kancil could not swim and could not see the crocodiles. He sat down on the side.',
        'Why did mouse deer sit down?',
        ['he wanted a nap',
         'he had no easy way across',
         'he saw a friend',
         'his foot hurt'],
        ['他想睡覺',
         '他沒有簡單的辦法過河',
         '他看到朋友',
         '他腳痛'],
        1,
        '推理:不能游 + 看不到鱷魚 → 沒有簡單的辦法 → 坐下想。'),
      // Q11 HOOK (B3 資訊缺口 — 怎麼辦?)
      nar('kt-ch19-l2-q11',
        'Their long mouths waited under the river all day...',
        '他們長長的嘴巴整天在河水下等著……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch19-3 — Beat 3 (Plan) → B5 道德兩難 (該不該說謊?)
  // Hook: "Hello, crocodiles! I have a message from the king!"
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch19-l3', chapter: 19, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'sang-kancil',
    storyBeat: '鼠鹿想到聰明的辦法 — 他會說什麼謊?',
    questions: [
      vocabIntro('kt-ch19-l3-q1', [
        ['想', 'think'],
        ['計畫', 'plan'],
        ['笑容', 'smile'],
        ['國王', 'king'],
      ]),
      nar('kt-ch19-l3-q2',
        'Sang Kancil sat down. He thought hard for a long time.',
        'Sang Kancil 坐下來。他用力想了好久。'),
      tf('kt-ch19-l3-q3',
        'His head moved slowly from one side to the other side, again and again.',
        '他的頭慢慢地左轉右轉,一直轉一直轉。',
        'Was mouse deer thinking hard?', 'Y',
        '推理:頭一直左右轉 → 在用力想 → 答 Yes'),
      nar('kt-ch19-l3-q4',
        'Then a big smile came on his face. He had a plan.',
        '然後他的臉上出現大大的笑容。他想到計畫了。'),
      mc('kt-ch19-l3-q5',
        'His small eyes turned bright. His tail started to move quick.',
        'What did the smile mean?',
        ['he was sleepy', 'he had an idea',
         'he was sad', 'he was hot'],
        ['他想睡', '他想到辦法',
         '他難過', '他很熱'],
        1,
        '眼睛亮 + 尾巴動 → 想到辦法。'),
      nar('kt-ch19-l3-q6',
        '"I cannot swim, but I do not need to swim," he said softly.',
        '「我不會游泳,但我不需要游泳,」他小聲說。'),
      emoji('kt-ch19-l3-q7',
        'How was mouse deer going to cross?',
        'How would he cross the river?',
        ['🧠 with a smart trick', '💪 with strong legs', '🚣 with a boat', '🦅 with wings'],
        ['用聰明的計謀', '用強壯的腿', '搭船', '用翅膀'],
        0,
        '不游泳卻能過 → 用聰明的計謀。'),
      nar('kt-ch19-l3-q8',
        'He walked to the side of the river. He called out loud.',
        '他走到河邊。他大聲喊。'),
      mc('kt-ch19-l3-q9',
        'His small voice rang out over the dark water of the river.',
        'How loud did mouse deer call?',
        ['very soft', 'very loud',
         'no sound', 'in a song'],
        ['很小聲', '很大聲',
         '沒有聲音', '唱歌'],
        1,
        '聲音響徹整條河 → 很大聲。'),
      inferLc('kt-ch19-l3-q10',
        'Mouse deer was about to tell the crocodiles something that was not true.',
        'Why was mouse deer going to lie?',
        ['he liked lying',
         'he needed a way to cross safely',
         'his mother told him to',
         'he was bored'],
        ['他喜歡騙人',
         '他需要安全過河',
         '媽媽叫他',
         '他無聊'],
        1,
        '推理:不能游 + 鱷魚多 → 需要安全過河 → 才說謊。'),
      // Q11 HOOK (B5 — 他會說什麼謊?)
      nar('kt-ch19-l3-q11',
        '"Hello, crocodiles! I have a message from the king!"',
        '「嗨,鱷魚們!我從國王那邊帶了話來!」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch19-4 — Beat 4 (Lie lands) → B4 期待加速 (鱷魚相信嗎?)
  // Hook: "Line up across the river so I can count you all"
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch19-l4', chapter: 19, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'sang-kancil',
    storyBeat: '對鱷魚說「國王要點數量」 — 鱷魚相信嗎?',
    questions: [
      vocabIntro('kt-ch19-l4-q1', [
        ['上來', 'come up'],
        ['數', 'count'],
        ['排隊', 'line up'],
        ['很多', 'many'],
      ]),
      nar('kt-ch19-l4-q2',
        'The crocodiles came up from the water one by one.',
        '鱷魚一隻接一隻從水裡上來。'),
      tf('kt-ch19-l4-q3',
        'Their big eyes turned to look at the little mouse deer on the side.',
        '他們的大眼睛轉過來看河邊的小鼠鹿。',
        'Were the crocodiles paying attention?', 'Y',
        '推理:眼睛都轉過來看 → 在注意 → 答 Yes'),
      nar('kt-ch19-l4-q4',
        '"What does the king want?" the big one asked.',
        '「國王要什麼?」最大的那隻問。'),
      mc('kt-ch19-l4-q5',
        'The big crocodile lifted his head higher than the rest of the group.',
        'Who asked mouse deer the question?',
        ['a small fish', 'the biggest crocodile',
         'a tree', 'another deer'],
        ['小魚', '最大的鱷魚',
         '一棵樹', '另一隻鹿'],
        1,
        '抬頭比其他高 → 最大的鱷魚。'),
      nar('kt-ch19-l4-q6',
        '"The king wants to know how many crocodiles live here," he said.',
        '「國王想知道這裡住了幾隻鱷魚,」他說。'),
      emoji('kt-ch19-l4-q7',
        'Was this true?',
        'Was the king\'s message true?',
        ['🤥 no, it was a lie', '✅ yes, all true', '🤔 only half true', '📜 written on paper'],
        ['不,是說謊', '對,完全真', '只有一半真', '寫在紙上'],
        0,
        '鼠鹿自己想的計謀 → 是說謊。'),
      nar('kt-ch19-l4-q8',
        'The crocodiles looked at each other. None of them knew about a king.',
        '鱷魚們你看我我看你。沒有誰知道有什麼國王。'),
      mc('kt-ch19-l4-q9',
        'But the big one did not want to say he did not know.',
        'Why did the big crocodile stay quiet?',
        ['he was tired',
         'he did not want to look bad',
         'he could not talk',
         'he liked the king'],
        ['他累了',
         '他不想看起來不知道',
         '他不會說話',
         '他喜歡國王'],
        1,
        '不想說「我不知道」 → 不想看起來不知道。'),
      inferLc('kt-ch19-l4-q10',
        'The crocodiles believed the lie because no one wanted to ask hard questions.',
        'Why did the crocodiles believe the lie?',
        ['mouse deer was very tall',
         'no one wanted to look like they did not know',
         'the king was their friend',
         'they all loved counting'],
        ['鼠鹿很高',
         '沒人想看起來不知道',
         '國王是他們朋友',
         '他們都愛數數'],
        1,
        '推理:沒人問難問題 → 沒人想看起來不懂 → 就相信了。'),
      // Q11 HOOK (B4 期待加速 — 排隊在即)
      nar('kt-ch19-l4-q11',
        '"Line up across the river so I can count you all," he said...',
        '「在河上排成一排,讓我數一數你們有幾隻,」他說……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch19-5 — Beat 5 (Jumping across) → B1 物理懸念 (能跳過嗎?)
  // Hook: "One!" "Two!" "Three!" "Four!"
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch19-l5', chapter: 19, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'sang-kancil',
    storyBeat: '鱷魚排隊讓他點 — 他跳過鱷魚背',
    questions: [
      vocabIntro('kt-ch19-l5-q1', [
        ['跳', 'jump'],
        ['下一個', 'next'],
        ['在上面', 'on'],
        ['背', 'back'],
      ]),
      nar('kt-ch19-l5-q2',
        'The crocodiles lined up from this side to the other side.',
        '鱷魚從這邊排到對岸,排成一條線。'),
      tf('kt-ch19-l5-q3',
        'Their long bodies made a flat road across the dark water.',
        '他們長長的身體在黑水上排成一條平平的路。',
        'Did the crocodiles make a kind of bridge?', 'Y',
        '推理:長身體排成平路 → 像一座橋 → 答 Yes'),
      nar('kt-ch19-l5-q4',
        'Sang Kancil jumped on the first crocodile back. "One!"',
        'Sang Kancil 跳上第一隻鱷魚的背。「一!」'),
      mc('kt-ch19-l5-q5',
        'His small feet pressed soft on the wet skin of the long animal.',
        'How did mouse deer move?',
        ['by swimming', 'by jumping on backs',
         'by walking on water', 'by flying'],
        ['游泳', '跳鱷魚背',
         '走在水上', '飛'],
        1,
        '腳踩在鱷魚身上 → 跳鱷魚背。'),
      nar('kt-ch19-l5-q6',
        'He jumped to the next. "Two!" Then "Three!" "Four!"',
        '他跳到下一隻。「二!」然後「三!」「四!」'),
      emoji('kt-ch19-l5-q7',
        'How was mouse deer counting?',
        'How did mouse deer count?',
        ['🔢 out loud at each jump', '🤫 in his head', '📝 on paper', '🎵 in a song'],
        ['每跳一下大聲數', '心裡數', '寫在紙上', '唱歌'],
        0,
        '一邊跳一邊喊 → 每跳一下大聲數。'),
      nar('kt-ch19-l5-q8',
        'The crocodiles felt proud. They thought the king was watching.',
        '鱷魚們覺得很驕傲。他們以為國王在看。'),
      mc('kt-ch19-l5-q9',
        'They kept very still so the small mouse deer could count them well.',
        'Why did the crocodiles stay still?',
        ['they were tired',
         'they wanted to be counted right',
         'mouse deer was heavy',
         'they were asleep'],
        ['他們累了',
         '他們想被好好數',
         '鼠鹿很重',
         '他們睡著了'],
        1,
        '不動讓他好數 → 想被好好數。'),
      inferLc('kt-ch19-l5-q10',
        'Every jump moved mouse deer one step closer to the fruit tree.',
        'What was really happening?',
        ['the king was counting',
         'mouse deer was crossing the river',
         'the crocodiles were getting bigger',
         'a fish was watching'],
        ['國王在數',
         '鼠鹿在過河',
         '鱷魚在變大',
         '魚在看'],
        1,
        '推理:每跳一下靠近樹 → 鼠鹿在過河。'),
      // Q11 HOOK (B1 物理懸念 — 跳到最後一隻?)
      nar('kt-ch19-l5-q11',
        'One by one, he hopped on every long crocodile back...',
        '一隻接一隻,他跳過每一條長長的鱷魚背……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch19-6 — Beat 6 (Reveal) → B2 情緒翻轉 (鱷魚發現被騙)
  // Hook: already eating sweet fruit under the tree
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch19-l6', chapter: 19, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'sang-kancil',
    storyBeat: '到對岸吃水果 — 鱷魚發現被騙',
    questions: [
      vocabIntro('kt-ch19-l6-q1', [
        ['離開', 'off'],
        ['對岸', 'other side'],
        ['生氣', 'anger'],
        ['已經', 'already'],
      ]),
      nar('kt-ch19-l6-q2',
        'Sang Kancil jumped off the last crocodile onto the other side.',
        'Sang Kancil 從最後一隻鱷魚跳下,落到對岸。'),
      tf('kt-ch19-l6-q3',
        'His four feet landed soft on the warm dry land of the other side.',
        '他四隻腳輕輕落在對岸溫暖乾燥的地上。',
        'Did mouse deer reach the other side?', 'Y',
        '推理:落在乾的地 → 到對岸 → 答 Yes'),
      nar('kt-ch19-l6-q4',
        '"Thank you, crocodiles! There is no message from the king!"',
        '「謝謝你們,鱷魚們!根本沒有什麼國王的話!」'),
      mc('kt-ch19-l6-q5',
        'The little mouse deer turned around and called back across the water.',
        'What did mouse deer tell the crocodiles?',
        ['the king said hello',
         'there was no king\'s message',
         'come visit tomorrow',
         'the river is too cold'],
        ['國王說嗨',
         '根本沒有國王的話',
         '明天來玩',
         '河太冷了'],
        1,
        '坦白沒國王訊息 → 根本沒有國王的話。'),
      nar('kt-ch19-l6-q6',
        'The crocodiles opened their mouths in anger. They had no king.',
        '鱷魚們生氣地張開嘴巴。他們根本沒有國王。'),
      emoji('kt-ch19-l6-q7',
        'How did the crocodiles feel now?',
        'How did the crocodiles feel?',
        ['😡 very angry', '😄 very happy', '😴 very sleepy', '😍 in love'],
        ['很生氣', '很開心', '很想睡', '很喜歡'],
        0,
        '張嘴 + 發現被騙 → 很生氣。'),
      nar('kt-ch19-l6-q8',
        'But the river was too wide. They could not chase him.',
        '但河太寬了。他們追不到他。'),
      mc('kt-ch19-l6-q9',
        'Their bodies could go in the water but not up the dry land.',
        'Why could the crocodiles not catch mouse deer?',
        ['they were full',
         'they could not go on dry land',
         'they liked him',
         'they fell asleep'],
        ['他們吃飽了',
         '他們不能上岸',
         '他們喜歡他',
         '他們睡著了'],
        1,
        '只能在水裡 → 不能上乾地。'),
      inferLc('kt-ch19-l6-q10',
        'On the other side of the river, mouse deer found the fruit tree at last.',
        'What did mouse deer do next?',
        ['he ran back home',
         'he ate the fruit he wanted',
         'he said sorry to the crocs',
         'he jumped in the water'],
        ['他跑回家',
         '他吃掉想吃的水果',
         '他跟鱷魚說對不起',
         '他跳進水裡'],
        1,
        '推理:找到樹 + 整個目標就是水果 → 吃掉水果。'),
      // Q11 HOOK (B2 情緒翻轉 — 鱷魚氣 鼠鹿吃)
      nar('kt-ch19-l6-q11',
        'But Sang Kancil was already eating sweet fruit under the tree...',
        '但 Sang Kancil 已經在樹下吃又甜又熟的水果了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch19-7 — Beat 7 (Two lessons) → B6 open (兩面教訓)
  // Hook: "We must not believe every voice from the side of the river"
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch19-l7', chapter: 19, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'sang-kancil',
    storyBeat: '鼠鹿學到什麼? 鱷魚學到什麼?',
    questions: [
      vocabIntro('kt-ch19-l7-q1', [
        ['肚子', 'belly'],
        ['沒問題', 'fine'],
        ['更好', 'better'],
        ['相信', 'believe'],
      ]),
      nar('kt-ch19-l7-q2',
        'Sang Kancil ate the fruit. He patted his small full belly.',
        'Sang Kancil 吃完水果。他拍拍自己飽飽的小肚子。'),
      tf('kt-ch19-l7-q3',
        'His face was bright and his tail moved fast from side to side.',
        '他的臉很亮,尾巴左右搖得很快。',
        'Was mouse deer happy?', 'Y',
        '推理:臉亮 + 尾巴搖 → 很開心 → 答 Yes'),
      nar('kt-ch19-l7-q4',
        '"A small body is fine. A smart head is better," he said.',
        '「小小的身體沒問題。聰明的腦袋更好,」他說。'),
      mc('kt-ch19-l7-q5',
        'His own voice sounded soft and slow, like a teacher in the woods.',
        'What lesson did mouse deer learn?',
        ['big body wins',
         'thinking helps small ones win',
         'fruit is not good',
         'rivers are dangerous'],
        ['身體大才會贏',
         '會想就能讓小的贏',
         '水果不好',
         '河很危險'],
        1,
        '小身體 + 聰明腦袋 → 會想就能贏。'),
      nar('kt-ch19-l7-q6',
        'The crocodiles slowly went back into the dark water.',
        '鱷魚們慢慢沉回黑色的水裡。'),
      emoji('kt-ch19-l7-q7',
        'How did the crocodiles look now?',
        'How did the crocodiles feel?',
        ['😞 quiet and sorry', '🎉 still cheering', '😋 hungry for cake', '😎 cool and proud'],
        ['安靜又不好意思', '還在歡呼', '想吃蛋糕', '酷酷的'],
        0,
        '慢慢沉回水裡 → 安靜又不好意思。'),
      nar('kt-ch19-l7-q8',
        '"Next time we must ask more questions," the big crocodile said.',
        '「下次我們得多問問題,」最大的鱷魚說。'),
      mc('kt-ch19-l7-q9',
        'His low voice came up from the dark water in a slow sad sound.',
        'How did the big crocodile sound?',
        ['happy and loud', 'low and slow',
         'fast and high', 'shouting'],
        ['開心又大聲', '低又慢',
         '又快又高', '在喊叫'],
        1,
        '低低慢慢悲悲的 → 低又慢。'),
      inferLc('kt-ch19-l7-q10',
        'The crocodiles learned to ask "is this true?" before saying yes.',
        'What did the crocodiles learn?',
        ['always trust kings',
         'check if a story is true',
         'eat more fruit',
         'never line up again'],
        ['永遠相信國王',
         '先想想故事是不是真的',
         '吃更多水果',
         '不要再排隊'],
        1,
        '推理:被騙過 + 學會多問 → 先想想故事是不是真的。'),
      // Q11 HOOK (B6 open — 兩面教訓,留給孩子思考)
      nar('kt-ch19-l7-q11',
        '"We must not believe every voice from the side of the river."',
        '「我們不能相信河邊每一個傳來的聲音。」'),
    ],
  },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
let tfCount = 0, gistCount = 0;
for (const l of lessons) {
  for (const q of l.questions) {
    if (q.type === 'listen-tf') tfCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'gist') gistCount++;
  }
}
console.log(`     listen-tf (inference): ${tfCount}, listen-comprehension gist: ${gistCount}`);
