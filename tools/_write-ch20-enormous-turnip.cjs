#!/usr/bin/env node
/**
 * v2.0.B.280+ — Ch20 蘿蔔大冒險 (The Enormous Turnip / Repka,
 * Russian folktale, oral tradition, public domain).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern.
 * Source canon: docs/canon/enormous-turnip.md
 *   (7-beat cumulative arc, light folk voice, child-friendly).
 * Cuts: docs/canon/enormous-turnip-cuts.md
 *   (B6/B3/B5/B4/B1/B2/B6-open).
 *
 * IP 鐵律:
 *   - Russian folk口傳 (Repka / Репка). Recorded by Afanasyev 1863.
 *     Public domain worldwide (life + 70+, recorded > 150 years ago).
 *   - A2 自創句式, 不引特定譯本/繪本.
 *   - Pairs with Ch5 Baba Yaga as 2nd Russian folk entry — same source
 *     culture, opposite tone (Ch5 dark sparse / Ch20 light cumulative).
 *
 * Structure per lesson (11 Q, mirror Ch5/Ch15 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration / listen-mc paraphrase
 *   q4  listen-tf inference
 *   q5  narration / listen-mc detail
 *   q6  emoji-pick (visual hook) or listen-mc
 *   q7  narration (transition)
 *   q8  listen-mc paraphrase
 *   q9  listen-comprehension gist OR inference
 *   q10 narration / listen-mc
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim)
 *   R3 A2 vocab only:
 *      'enormous' → 'very big' / 'bigger than the house'
 *      'yanked' → 'pulled hard'
 *      'persistent' → 'tried again'
 *      'determined' → 'did not stop'
 *   R4 listen-tf inference (atmosphere / scale / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 衝突 / 0 暴力 / 100% 溫馨家庭
 *   - 累積結構 cumulative — 每 lesson 加一個角色
 *   - 重複句型對 A2 兒童最友善 (helps memorization)
 *
 * Cumulative refrain (lesson L3-L7):
 *   "[X] pulled. [Y] pulled. The turnip would not move."
 *   Repetition is the A2 ELT teaching tool.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch20.json');

// ─── Helpers (mirror Ch5/Ch15 範本) ────────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch20', 'enormous-turnip'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch20', 'enormous-turnip', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch20', 'enormous-turnip'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch20', 'enormous-turnip', 'gist'],
    subSkill: 'gist' };
}
function inferLc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch20', 'enormous-turnip'],
    subSkill: 'inference' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch20', 'enormous-turnip', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch20', 'enormous-turnip', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch20-1 — B6 預言種子: 老爺爺種大蘿蔔 → 長得越來越大
  // Hook: 蘿蔔會變多大?拔得起來嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch20-l1', chapter: 20, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'enormous-turnip',
    storyBeat: '老爺爺種大蘿蔔 — 長得越來越大',
    questions: [
      vocabIntro('kt-ch20-l1-q1', [
        ['爺爺', 'grandpa'],
        ['種子', 'seed'],
        ['水', 'water'],
        ['長大', 'grow'],
      ]),
      nar('kt-ch20-l1-q2',
        'Grandpa plants a small turnip seed in his garden.',
        '爺爺在他的園子裡種下一顆小蘿蔔種子。'),
      nar('kt-ch20-l1-q3',
        'Every morning, he gives the seed water.',
        '每天早上,他給種子澆水。'),
      tf('kt-ch20-l1-q4',
        'Grandpa sings to the seed every day. He never forgets.',
        '爺爺每天對種子唱歌。他從來沒忘記。',
        'Does Grandpa care about this turnip?', 'Y',
        '推理:每天唱歌 + 從沒忘記 → 很在意 → 答 Yes'),
      nar('kt-ch20-l1-q5',
        'A green leaf comes up. Then more leaves come up.',
        '一片綠葉冒出來。然後更多葉子冒出來。'),
      mc('kt-ch20-l1-q6',
        'Week by week, the turnip gets larger than the others.',
        'How is the turnip growing?',
        ['staying small', 'getting much bigger', 'turning red', 'falling over'],
        ['還是很小', '越來越大', '變紅色', '倒下去'],
        1,
        '一週又一週,比其他的大 → 越來越大。'),
      nar('kt-ch20-l1-q7',
        'The turnip pushes up the dirt. The top is round and yellow.',
        '蘿蔔把土頂起來。頂上圓圓黃黃的。'),
      emoji('kt-ch20-l1-q8',
        'How big is the turnip now?',
        'How big?',
        ['🥬 small leaf', '🥕 normal size', '🎃 very big', '🌱 just a sprout'],
        ['小葉子', '一般大', '非常大', '剛冒芽'],
        2,
        '比別的都大 → 非常大。'),
      mc('kt-ch20-l1-q9',
        'Grandpa cannot put his arms all the way around the top.',
        'Why is the turnip a problem?',
        ['too small to find', 'too big to hug', 'wrong color', 'too soft'],
        ['太小找不到', '太大抱不住', '顏色不對', '太軟'],
        1,
        '手抱不過去 → 太大了。'),
      gist('kt-ch20-l1-q10',
        'A tiny seed has grown into the biggest turnip in the village.',
        'What is this scene mainly showing?',
        ['a small garden flower',
         'something growing way past normal',
         'a busy market day',
         'a winter snowfall'],
        ['一朵小花', '長到超過一般大小', '熱鬧市集', '冬天下雪'],
        1,
        '主旨 = 小種子長成全村最大蘿蔔。'),
      // Q11 HOOK (B6 預言種子)
      nar('kt-ch20-l1-q11',
        'It is the biggest turnip in the village. Grandpa looks at it. "Time to pull it out..."',
        '這是全村最大的蘿蔔。爺爺看著它。「該把它拔出來了……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch20-2 — B3 資訊缺口: 想拔起來 → 拔不動!
  // Hook: 為什麼拔不動?要怎麼辦?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch20-l2', chapter: 20, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'enormous-turnip',
    storyBeat: '想拔起來 — 拔不動!',
    questions: [
      vocabIntro('kt-ch20-l2-q1', [
        ['拉', 'pull'],
        ['葉子', 'leaves'],
        ['手', 'hands'],
        ['動', 'move'],
      ]),
      nar('kt-ch20-l2-q2',
        'Grandpa walks into the garden. He puts down his hat.',
        '爺爺走進園子。他把帽子放下。'),
      nar('kt-ch20-l2-q3',
        'He holds the green leaves with both hands.',
        '他用兩隻手抓住綠葉子。'),
      tf('kt-ch20-l2-q4',
        'Grandpa pulls hard. He pulls again. His face turns red.',
        '爺爺用力拉。再拉一次。他的臉變紅了。',
        'Is Grandpa using a lot of strength?', 'Y',
        '推理:用力拉 + 臉變紅 → 在出全力 → 答 Yes'),
      mc('kt-ch20-l2-q5',
        'The turnip stays right where it is. Not one bit out of the dirt.',
        'What happens to the turnip?',
        ['pops out fast', 'stays in the ground', 'breaks in half', 'bends sideways'],
        ['一下就出來', '完全沒動', '斷成兩半', '彎下去'],
        1,
        '一點都沒從土裡出來 → 完全沒動。'),
      nar('kt-ch20-l2-q6',
        'Grandpa sits down on the dirt. He looks at his hands.',
        '爺爺坐在土上。他看著自己的手。'),
      emoji('kt-ch20-l2-q7',
        'How does Grandpa feel right now?',
        'How does he feel?',
        ['😴 sleepy', '😅 tired and stuck', '😡 angry', '🥳 happy'],
        ['想睡覺', '又累又卡住', '生氣', '開心'],
        1,
        '拉不動 + 坐下來 → 又累又卡住。'),
      nar('kt-ch20-l2-q8',
        'He pulls one more time. His hands slip off the leaves.',
        '他再拉一次。他的手從葉子上滑開。'),
      mc('kt-ch20-l2-q9',
        'One person\'s hands are too few. The turnip is much too big.',
        'Why can\'t Grandpa pull it out?',
        ['the turnip is too small', 'one person is not enough', 'the dirt is wet', 'the leaves are gone'],
        ['蘿蔔太小', '一個人不夠', '土太濕', '葉子沒了'],
        1,
        '一個人手太少 + 蘿蔔太大 → 一個人不夠。'),
      inferLc('kt-ch20-l2-q10',
        'Grandpa looks back at the house. Someone else lives with him.',
        'What is Grandpa thinking now?',
        ['give up and go in',
         'call someone for help',
         'eat the leaves',
         'plant a new seed'],
        ['放棄回家', '叫人來幫忙', '吃葉子', '種新種子'],
        1,
        '推理:回頭看屋子 + 屋裡還有別人 → 叫人來幫忙。'),
      // Q11 HOOK (B3 資訊缺口)
      nar('kt-ch20-l2-q11',
        'Grandpa stands up. "I cannot do this alone," he says. "I need help..."',
        '爺爺站起來。「我一個人做不到,」他說。「我需要幫忙……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch20-3 — B5 道德兩難: 叫奶奶來幫 → 還是拔不動
  // Hook: 兩個還不夠 — 還要叫誰?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch20-l3', chapter: 20, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'enormous-turnip',
    storyBeat: '叫奶奶來幫 — 還是拔不動',
    questions: [
      vocabIntro('kt-ch20-l3-q1', [
        ['奶奶', 'grandma'],
        ['叫', 'call'],
        ['幫忙', 'help'],
        ['兩個', 'both'],
      ]),
      nar('kt-ch20-l3-q2',
        'Grandpa calls toward the kitchen. "Grandma, come help me!"',
        '爺爺對著廚房叫:「奶奶,來幫我!」'),
      nar('kt-ch20-l3-q3',
        'Grandma comes out, drying her hands on her apron.',
        '奶奶走出來,用圍裙擦著手。'),
      tf('kt-ch20-l3-q4',
        'She walks fast. She does not ask any questions first.',
        '她走得很快。她沒先問什麼。',
        'Does Grandma want to help right away?', 'Y',
        '推理:走得快 + 不問就來 → 馬上想幫 → 答 Yes'),
      mc('kt-ch20-l3-q5',
        'Grandma holds the back of Grandpa\'s coat with her two hands.',
        'Where does Grandma hold on?',
        ['around the turnip top', 'on the man in front of her', 'against the garden fence', 'in her own apron pocket'],
        ['蘿蔔頂', '前面那個人', '園子圍籬', '她自己圍裙口袋'],
        1,
        '兩隻手抓爺爺外套後面 → 抓前面那個人。'),
      nar('kt-ch20-l3-q6',
        'Grandpa pulls the turnip. Grandma pulls Grandpa.',
        '爺爺拉蘿蔔。奶奶拉爺爺。'),
      emoji('kt-ch20-l3-q7',
        'How many people are pulling now?',
        'How many?',
        ['1️⃣ one', '2️⃣ two', '3️⃣ three', '4️⃣ four'],
        ['一個', '兩個', '三個', '四個'],
        1,
        '爺爺 + 奶奶 = 兩個。'),
      nar('kt-ch20-l3-q8',
        'They both pull. They count out loud. One, two, pull!',
        '兩個都拉。一起出聲數。一、二,拉!'),
      mc('kt-ch20-l3-q9',
        'Even with two pulling together, the turnip stays in the dirt.',
        'What happens with two pullers?',
        ['comes out easy', 'still stuck deep', 'breaks the leaves', 'bends sideways'],
        ['一下就出來', '還是卡在土裡', '弄斷葉子', '歪一邊'],
        1,
        '兩個人一起拉 + 還在土裡 → 還是卡著。'),
      gist('kt-ch20-l3-q10',
        'One person tried and could not. Two together tried and still cannot.',
        'What is this scene mainly showing?',
        ['the turnip is gone',
         'help is needed but two is not enough',
         'Grandma is too small',
         'Grandpa is angry now'],
        ['蘿蔔不見了', '需要幫忙 + 兩個不夠', '奶奶太小', '爺爺生氣了'],
        1,
        '主旨 = 兩個還不夠,需要更多人。'),
      // Q11 HOOK (B5 道德兩難)
      nar('kt-ch20-l3-q11',
        'Two is not enough. Grandma looks at Grandpa. "Who else can we ask?"',
        '兩個不夠。奶奶看著爺爺。「我們還能叫誰?」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch20-4 — B4 期待加速: 叫孫女來幫 → 越來越多人
  // Hook: 已經三個人了 — 還要幾個?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch20-l4', chapter: 20, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'enormous-turnip',
    storyBeat: '叫孫女來幫 — 越來越多人',
    questions: [
      vocabIntro('kt-ch20-l4-q1', [
        ['孫女', 'granddaughter'],
        ['跑', 'run'],
        ['圍裙', 'apron'],
        ['一起', 'together'],
      ]),
      nar('kt-ch20-l4-q2',
        'Grandma calls toward the house. "Granddaughter, come help us!"',
        '奶奶對著屋子叫:「孫女,來幫我們!」'),
      nar('kt-ch20-l4-q3',
        'A little girl runs out of the door. She is fast.',
        '一個小女孩從門裡跑出來。她很快。'),
      tf('kt-ch20-l4-q4',
        'She does not even put her shoes on. She runs to the garden.',
        '她連鞋都沒穿。就跑到園子裡。',
        'Is the granddaughter excited to help?', 'Y',
        '推理:鞋都沒穿 → 急著來幫 → 答 Yes'),
      mc('kt-ch20-l4-q5',
        'The little girl grabs the back of Grandma\'s apron with both hands.',
        'What does Granddaughter hold on to?',
        ['the turnip top', 'the lady in front of her', 'the kitchen door', 'her own shoes'],
        ['蘿蔔頂', '前面那位女士', '廚房門', '她自己的鞋'],
        1,
        '抓著奶奶圍裙 → 前面那位女士。'),
      nar('kt-ch20-l4-q6',
        'Grandpa pulls. Grandma pulls. Granddaughter pulls.',
        '爺爺拉。奶奶拉。孫女拉。'),
      emoji('kt-ch20-l4-q7',
        'How many people are pulling now?',
        'How many?',
        ['1️⃣ one', '2️⃣ two', '3️⃣ three', '4️⃣ four'],
        ['一個', '兩個', '三個', '四個'],
        2,
        '爺爺 + 奶奶 + 孫女 = 三個。'),
      nar('kt-ch20-l4-q8',
        'Three of them pull at the same time. They count again.',
        '三個人一起拉。他們又數一次。'),
      mc('kt-ch20-l4-q9',
        'Three pairs of hands. Three sets of feet pushing in the dirt.',
        'What are they all doing together?',
        ['walking away', 'pulling as one team', 'eating dinner', 'looking at the sky'],
        ['走開', '當一隊一起拉', '吃晚餐', '看天空'],
        1,
        '三雙手 + 三雙腳一起 → 當一隊一起拉。'),
      inferLc('kt-ch20-l4-q10',
        'They pull and pull. The turnip will not move.',
        'Why does the turnip still not move?',
        ['the dirt is too soft',
         'three is still not enough',
         'the leaves came off',
         'Grandpa stopped pulling'],
        ['土太軟', '三個還是不夠', '葉子掉了', '爺爺停了'],
        1,
        '推理:三個都用力 + 還沒動 → 三個還是不夠。'),
      // Q11 HOOK (B4 期待加速)
      nar('kt-ch20-l4-q11',
        'Three is not enough either. Granddaughter looks around. "We need more help!"',
        '三個還是不夠。孫女四處看。「我們需要更多人!」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch20-5 — B1 物理懸念: 叫小狗 → 還是不夠
  // Hook: 連狗都來了 — 還不夠?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch20-l5', chapter: 20, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'enormous-turnip',
    storyBeat: '叫小狗 — 還是不夠',
    questions: [
      vocabIntro('kt-ch20-l5-q1', [
        ['狗', 'dog'],
        ['過來', 'over'],
        ['牙齒', 'teeth'],
        ['四個', 'four'],
      ]),
      nar('kt-ch20-l5-q2',
        'Granddaughter calls toward the yard. "Little dog, come help us!"',
        '孫女對著院子叫:「小狗,來幫我們!」'),
      nar('kt-ch20-l5-q3',
        'The little dog runs over. His tail moves fast.',
        '小狗跑過來。他的尾巴搖得很快。'),
      tf('kt-ch20-l5-q4',
        'The dog wags his tail. He looks up at the girl.',
        '狗搖尾巴。他抬頭看女孩。',
        'Is the dog ready to help?', 'Y',
        '推理:搖尾巴 + 抬頭看 → 開心想參加 → 答 Yes'),
      mc('kt-ch20-l5-q5',
        'The dog uses his teeth to hold the back of Granddaughter\'s dress.',
        'How does the dog hold on?',
        ['front paws on the ground', 'mouth bites the dress', 'ears flap in the wind', 'tail wraps around her leg'],
        ['前腳踩在地上', '嘴巴咬住衣服', '耳朵在風裡飄', '尾巴繞她的腳'],
        1,
        '用牙齒咬住孫女衣服 → 嘴巴咬住。'),
      nar('kt-ch20-l5-q6',
        'Grandpa pulls. Grandma pulls. Granddaughter pulls. Dog pulls.',
        '爺爺拉。奶奶拉。孫女拉。狗拉。'),
      emoji('kt-ch20-l5-q7',
        'How many are pulling now?',
        'How many?',
        ['2️⃣ two', '3️⃣ three', '4️⃣ four', '5️⃣ five'],
        ['兩個', '三個', '四個', '五個'],
        2,
        '爺爺 + 奶奶 + 孫女 + 狗 = 四個。'),
      nar('kt-ch20-l5-q8',
        'Four of them pull. They count together. One, two, three, pull!',
        '四個一起拉。他們一起數。一、二、三,拉!'),
      mc('kt-ch20-l5-q9',
        'Even with the dog\'s teeth pulling too, the turnip stays put.',
        'What happens with the dog helping?',
        ['it pops right out', 'it still does not budge', 'the dog runs away', 'the dog barks'],
        ['馬上出來', '還是沒動', '狗跑掉', '狗叫'],
        1,
        '狗也加入 + 蘿蔔不動 → 還是沒動。'),
      gist('kt-ch20-l5-q10',
        'A dog joins the family. Even four pulling, the turnip stays.',
        'What is this scene mainly showing?',
        ['the dog wins a race',
         'more help joins but it is still not enough',
         'the family eats dinner',
         'a dog learns a trick'],
        ['狗贏比賽', '又多了幫手但還是不夠', '全家吃晚餐', '狗學新動作'],
        1,
        '主旨 = 越來越多人,但還是不夠。'),
      // Q11 HOOK (B1 物理懸念)
      nar('kt-ch20-l5-q11',
        'Four is not enough. The dog barks once. "Maybe my friend the cat can come..."',
        '四個還是不夠。狗叫了一聲。「也許我的朋友貓咪可以來……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch20-6 — B2 情緒翻轉: 叫小貓 → 還是不行
  // Hook: 它動了 — 還差什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch20-l6', chapter: 20, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'enormous-turnip',
    storyBeat: '叫小貓 — 還是不行',
    questions: [
      vocabIntro('kt-ch20-l6-q1', [
        ['貓', 'cat'],
        ['走', 'walk'],
        ['尾巴', 'tail'],
        ['足夠', 'enough'],
      ]),
      nar('kt-ch20-l6-q2',
        'The dog calls toward the wall. "Cat, come help us!"',
        '狗對著牆叫:「貓咪,來幫我們!」'),
      nar('kt-ch20-l6-q3',
        'The cat walks over slowly. She takes her time.',
        '貓咪慢慢走過來。她不急。'),
      tf('kt-ch20-l6-q4',
        'The cat does not run. She stops to look at the turnip first.',
        '貓沒跑。她先停下來看蘿蔔。',
        'Does the cat care about being fast?', 'N',
        '推理:慢慢走 + 先看 → 不在意快 → 答 No'),
      mc('kt-ch20-l6-q5',
        'The cat holds the dog\'s tail gently between her front paws.',
        'How does the cat hold on?',
        ['with her teeth on a leaf', 'with paws on the dog\'s tail', 'on Granddaughter\'s shoe', 'around Grandpa\'s leg'],
        ['用牙齒咬葉子', '前腳抱狗的尾巴', '抓孫女的鞋', '抱爺爺的腳'],
        1,
        '前腳抱住狗的尾巴。'),
      nar('kt-ch20-l6-q6',
        'Five of them pull now. Everyone pulls as hard as they can.',
        '五個一起拉。每個都用盡力氣。'),
      emoji('kt-ch20-l6-q7',
        'How many are pulling now?',
        'How many?',
        ['3️⃣ three', '4️⃣ four', '5️⃣ five', '6️⃣ six'],
        ['三個', '四個', '五個', '六個'],
        2,
        '爺爺 + 奶奶 + 孫女 + 狗 + 貓 = 五個。'),
      nar('kt-ch20-l6-q8',
        'They count again. One, two, three, pull!',
        '他們又數一次。一、二、三,拉!'),
      mc('kt-ch20-l6-q9',
        'The turnip moves a tiny bit. The top wobbles in the dirt.',
        'What is different this time?',
        ['the turnip flies up', 'the turnip moves a little', 'the dirt turns to mud', 'a new leaf grows'],
        ['蘿蔔飛起來', '蘿蔔動了一點', '土變泥', '新葉子長出來'],
        1,
        '蘿蔔動了一點點 + 頂搖一下。'),
      inferLc('kt-ch20-l6-q10',
        'But after that tiny move, the turnip stops. It is still stuck.',
        'Why did the turnip move only a little?',
        ['the cat is too small to help',
         'almost enough, but one more is needed',
         'the dirt is too soft',
         'they are pulling the wrong way'],
        ['貓太小幫不到', '快夠了 + 還差一個', '土太軟', '拉錯方向'],
        1,
        '推理:動了 + 又停 → 快夠了 + 還差一個。'),
      // Q11 HOOK (B2 情緒翻轉)
      nar('kt-ch20-l6-q11',
        'It moved! But not enough. The cat looks at her little friend by the wall...',
        '它動了!但還不夠。貓咪看著牆邊的小朋友……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch20-7 — B6 open + 溫馨收: 叫小老鼠 → 終於拔出來!全家分享
  // Hook: 連最小的都重要 — 你家最小的是誰?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch20-l7', chapter: 20, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'enormous-turnip',
    storyBeat: '叫小老鼠 — 終於拔出來!全家分享',
    questions: [
      vocabIntro('kt-ch20-l7-q1', [
        ['老鼠', 'mouse'],
        ['六個', 'six'],
        ['出來', 'out'],
        ['分享', 'share'],
      ]),
      nar('kt-ch20-l7-q2',
        'The cat calls toward the small hole. "Little mouse, come help us!"',
        '貓咪對著小洞叫:「小老鼠,來幫我們!」'),
      nar('kt-ch20-l7-q3',
        'A little mouse runs out. She is the smallest of all.',
        '一隻小老鼠跑出來。她是所有人裡最小的。'),
      tf('kt-ch20-l7-q4',
        'The mouse is tiny. But she does not say she is too small.',
        '老鼠很小。但她沒說自己太小了。',
        'Does the mouse think size matters here?', 'N',
        '推理:小 + 不說自己太小 → 不在意大小 → 答 No'),
      mc('kt-ch20-l7-q5',
        'The little mouse holds on to the cat\'s tail with both paws.',
        'How does the mouse hold on?',
        ['holds the dog by an ear', 'grabs the furry one\'s tail', 'pulls a turnip leaf', 'sits on Grandpa\'s boot'],
        ['抓狗的耳朵', '抓住毛毛那隻的尾巴', '扯蘿蔔葉子', '坐在爺爺靴子上'],
        1,
        '貓的尾巴 → 毛毛那隻的尾巴。'),
      nar('kt-ch20-l7-q6',
        'Six of them pull now. The smallest one is at the end.',
        '六個一起拉。最小的在最後面。'),
      emoji('kt-ch20-l7-q7',
        'How many are pulling at the end?',
        'How many?',
        ['4️⃣ four', '5️⃣ five', '6️⃣ six', '7️⃣ seven'],
        ['四個', '五個', '六個', '七個'],
        2,
        '爺爺 + 奶奶 + 孫女 + 狗 + 貓 + 老鼠 = 六個。'),
      nar('kt-ch20-l7-q8',
        'They count one more time. One, two, three, pull!',
        '他們再數一次。一、二、三,拉!'),
      mc('kt-ch20-l7-q9',
        'Out comes the turnip! Everyone falls over backward in a happy pile.',
        'What happens this time?',
        ['the turnip stays stuck', 'the turnip pops out', 'the rope breaks', 'a storm comes'],
        ['還是卡住', '蘿蔔出來了', '繩子斷了', '暴風雨來了'],
        1,
        '蘿蔔出來了 + 大家開心倒下。'),
      inferLc('kt-ch20-l7-q10',
        'The smallest mouse was the last help. That tiny push was the one.',
        'What does this story teach us?',
        ['only big helpers count',
         'even the smallest helper matters',
         'work alone is fastest',
         'turnips grow only in summer'],
        ['只有大幫手有用', '再小的幫忙都重要', '一個人最快', '蘿蔔只夏天長'],
        1,
        '推理:最小的老鼠 = 最後那一推 → 再小的幫忙都重要。'),
      // Q11 HOOK (B6 open + 溫馨收)
      nar('kt-ch20-l7-q11',
        'The whole family shares a big turnip dinner. Even the mouse gets a seat at the table...',
        '全家一起吃大蘿蔔晚餐。連小老鼠都有位子坐……'),
    ],
  },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
let tfCount = 0, gistCount = 0, inferCount = 0;
for (const l of lessons) {
  for (const q of l.questions) {
    if (q.type === 'listen-tf') tfCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'gist') gistCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'inference') inferCount++;
  }
}
console.log(`     listen-tf (inference): ${tfCount}, listen-comprehension gist: ${gistCount}, inference: ${inferCount}`);
