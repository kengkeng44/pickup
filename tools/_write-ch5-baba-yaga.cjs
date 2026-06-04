#!/usr/bin/env node
/**
 * v2.0.B.Ch5 — Ch5 Baba Yaga (黑暗民俗 sparse 短句 voice).
 *
 * Per docs/canon/baba-yaga.md + baba-yaga-cuts.md.
 * Sparse, plain, dark — short sentences, no adjective stacks.
 * A2 safe (no blood: "kept her" not "ate her" / "took into woods" not "skinned").
 *
 * Cuts (7 lessons):
 *   L1 B6 — fire goes out, who fetches it?
 *   L2 B3 — Baba Yaga, everyone knows the name
 *   L3 B6 — three riders, night fell
 *   L4 B1 — house on chicken legs, door turns
 *   L5 B2 — "I smell a Russian girl"
 *   L6 B3 — doll comes out: "Help me"
 *   L7 B2 — new woman turns to ash (resolves + open hook)
 *
 * Structure per lesson (11 Q): same as Ch1.
 *   1 vocab tap-pairs
 *   2 narration (set scene)
 *   1 listen-tf INFER (atmosphere/action/time/contrast)
 *   2 listen-mc (paraphrased detail)
 *   1 emoji-pick (visual hook)
 *   1 listen-comp GIST (main idea)
 *   1 listen-mc (paraphrased)
 *   1 listen-comp INFER (deeper why)
 *   1 narration HOOK (cut on inquiry-terminating sentence)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch5.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch5', 'baba-yaga'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch5', 'baba-yaga', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch5', 'baba-yaga'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch5', 'baba-yaga', 'gist'],
    subSkill: 'gist' };
}
function inferLc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch5', 'baba-yaga'],
    subSkill: 'inference' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch5', 'baba-yaga', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch5', 'baba-yaga', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch5-1 — B6 預言種子: 火滅了。誰要去拿火?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch5-l1', chapter: 5, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'baba-yaga',
    storyBeat: '火滅了 — 誰要去拿火?',
    questions: [
      vocabIntro('kt-ch5-l1-q1', [
        ['女孩', 'girl'],
        ['森林', 'forest'],
        ['爸爸', 'father'],
        ['火', 'fire'],
      ]),
      nar('kt-ch5-l1-q2',
        'A girl named Vasilisa lived at the edge of a dark forest.',
        '一個叫 Vasilisa 的女孩住在黑黑的森林邊。'),
      nar('kt-ch5-l1-q3',
        'Her mother was gone. Her father had a new wife.',
        '她的媽媽走了。她爸爸娶了新太太。'),
      tf('kt-ch5-l1-q4',
        'Each day Vasilisa worked from dawn to dark, alone.',
        '每天 Vasilisa 一個人從早做到晚。',
        'Was the new woman kind to her?', 'N',
        '推理:從早做到晚 + 一個人 → 新太太對她不好 → 答 No'),
      nar('kt-ch5-l1-q5',
        'Vasilisa did not cry. She did the work and kept quiet.',
        'Vasilisa 沒有哭。她做完事,安靜不說話。'),
      mc('kt-ch5-l1-q6',
        'She held her tears inside and kept her face still.',
        'How did Vasilisa act?',
        ['crying out loud', 'staying quiet', 'running away', 'singing songs'],
        ['大聲哭', '保持安靜', '跑走', '唱歌'],
        1,
        '把眼淚壓住、臉不動 → 安靜。'),
      nar('kt-ch5-l1-q7',
        'One cold night, the fire in the small house went out.',
        '一個冷冷的夜裡,小屋裡的火滅了。'),
      mc('kt-ch5-l1-q8',
        'Without flames the house would soon turn cold, and supper could not be made.',
        'Why was the fire going out a big problem?',
        ['only the lamp went off', 'cold and hungry', 'music stopped', 'clothes were lost'],
        ['只是燈關了', '又冷又餓', '音樂停了', '衣服丟了'],
        1,
        '沒火 → 冷 + 不能煮飯 → 又冷又餓。'),
      emoji('kt-ch5-l1-q9',
        'What season did this happen in?',
        'What season?',
        ['☀️ summer', '🌸 spring', '❄️ winter', '🍂 autumn'],
        ['夏天', '春天', '冬天', '秋天'],
        2,
        '冷冷的夜 → 冬天。'),
      inferLc('kt-ch5-l1-q10',
        'The new woman looked at Vasilisa and smiled with cold eyes.',
        'What was the new woman thinking?',
        ['feeling sorry for the girl',
         'planning to send Vasilisa for fire',
         'going for fire herself',
         'praying for warmth'],
        ['可憐女孩', '計劃派 Vasilisa 去拿火', '自己去拿火', '禱告求暖'],
        1,
        '推理:冷眼笑 → 不安好心 → 要派女孩去做危險事。'),
      // Q11 HOOK (B6 預言種子)
      nar('kt-ch5-l1-q11',
        '"Go," she said. "Go into the deep woods. Get fire from Baba Yaga."',
        '「去,」她說。「到深林去。跟 Baba Yaga 拿火。」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch5-2 — B3 資訊缺口: Baba Yaga,大家都知道這個名字
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch5-l2', chapter: 5, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'baba-yaga',
    storyBeat: '大家都知道這個名字',
    questions: [
      vocabIntro('kt-ch5-l2-q1', [
        ['名字', 'name'], ['深', 'deep'],
        ['娃娃', 'doll'], ['口袋', 'pocket'],
      ]),
      nar('kt-ch5-l2-q2',
        'Vasilisa stood at the door. The night wind was loud.',
        'Vasilisa 站在門邊。夜風很大聲。'),
      tf('kt-ch5-l2-q3',
        'She did not turn back. She did not ask why.',
        '她沒有回頭。她沒有問為什麼。',
        'Did Vasilisa feel safe about this trip?', 'N',
        '推理:不回頭 + 不問 → 她知道很危險但只能走 → 答 No'),
      nar('kt-ch5-l2-q4',
        'She knew the name Baba Yaga. Every child knew it.',
        '她知道 Baba Yaga 這個名字。每個小孩都知道。'),
      mc('kt-ch5-l2-q5',
        'In the village, mothers only spoke that name as a quiet whisper.',
        'How did people in the village say the name?',
        ['loud and proud', 'softly and afraid', 'with a song', 'in a happy way'],
        ['大聲驕傲', '輕聲又害怕', '用唱的', '快樂地'],
        1,
        '只敢輕聲說 → 怕被聽到。'),
      nar('kt-ch5-l2-q6',
        'Before she left, her mother had given her a small wooden doll.',
        '她離開之前,媽媽給過她一個小木娃娃。'),
      emoji('kt-ch5-l2-q7',
        'What did Vasilisa take with her?',
        'What did she take?',
        ['🧸 a small doll', '🗡️ a sword', '🍞 a loaf of bread', '🔑 a key'],
        ['一個小娃娃', '一把劍', '一個麵包', '一把鑰匙'],
        0,
        '媽媽留下的小木娃娃。'),
      nar('kt-ch5-l2-q8',
        'She put the doll deep in her pocket and stepped into the trees.',
        '她把娃娃放進口袋深處,走進樹林。'),
      mc('kt-ch5-l2-q9',
        'Vasilisa kept one hand on her pocket the whole way.',
        'Why did she keep her hand on the pocket?',
        ['for warmth', 'touching the doll', 'looking for food', 'searching for money'],
        ['取暖', '摸著娃娃', '找食物', '找錢'],
        1,
        '手放口袋 → 摸娃娃,娃娃是她的依靠。'),
      gist('kt-ch5-l2-q10',
        'A small girl walks into the dark forest, all alone, with only a doll.',
        'What is this scene mainly showing?',
        ['a happy daytime walk',
         'one lonely girl heading into danger',
         'children playing in the trees',
         'family travel together'],
        ['白天快樂散步', '一個孤單女孩走進危險', '小孩在樹林玩', '家人一起旅行'],
        1,
        '主旨 = 孤單女孩 + 黑森林 + 只有娃娃。'),
      // Q11 HOOK (B3 資訊缺口)
      nar('kt-ch5-l2-q11',
        'Everyone knew the name Baba Yaga. Nobody who left to find her had come back...',
        '每個人都知道 Baba Yaga 這個名字。沒有人去找她之後回來過……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch5-3 — B6 預言種子: 三個騎士,夜來了
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch5-l3', chapter: 5, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'baba-yaga',
    storyBeat: '三個騎士 — 夜來了',
    questions: [
      vocabIntro('kt-ch5-l3-q1', [
        ['騎士', 'rider'], ['白', 'white'],
        ['紅', 'red'], ['黑', 'black'],
      ]),
      nar('kt-ch5-l3-q2',
        'The path was thin. The trees were tall and black.',
        '小路很細。樹又高又黑。'),
      tf('kt-ch5-l3-q3',
        'For a long time, nothing moved beside her.',
        '很久很久,旁邊都沒有東西在動。',
        'Was the forest full of people?', 'N',
        '推理:很久都沒東西在動 → 沒人 → 答 No'),
      nar('kt-ch5-l3-q4',
        'A white rider on a white horse passed her. Then the day came.',
        '一個白色騎士騎著白馬經過。然後白天來了。'),
      mc('kt-ch5-l3-q5',
        'After the white rider, the sky turned light.',
        'What did the white rider bring?',
        ['rain', 'morning light', 'a song', 'darkness'],
        ['雨', '早晨的光', '一首歌', '黑暗'],
        1,
        '白騎士過去之後天亮 → 帶來早晨。'),
      nar('kt-ch5-l3-q6',
        'A red rider on a red horse passed her. The sun stood high.',
        '一個紅色騎士騎著紅馬經過。太陽高高的。'),
      emoji('kt-ch5-l3-q7',
        'What time did the red rider bring?',
        'What time?',
        ['🌅 morning', '☀️ midday', '🌙 night', '⭐ midnight'],
        ['早上', '中午', '晚上', '半夜'],
        1,
        '太陽高高 → 中午。'),
      nar('kt-ch5-l3-q8',
        'She walked on. She did not stop. She did not eat.',
        '她繼續走。她沒停。她沒吃東西。'),
      mc('kt-ch5-l3-q9',
        'Her legs grew heavy. Her feet hurt. Still she walked.',
        'How did Vasilisa feel?',
        ['fresh and fast', 'tired but pushing on', 'happy and singing', 'asleep on her feet'],
        ['有精神又快', '累但還在走', '快樂又唱歌', '走著就睡了'],
        1,
        '腳重又痛 + 還在走 → 累但堅持。'),
      inferLc('kt-ch5-l3-q10',
        'After the red rider, a black rider on a black horse came up the path.',
        'What did the black rider mean was coming?',
        ['a feast', 'night', 'a wedding', 'spring rain'],
        ['宴會', '夜晚', '婚禮', '春雨'],
        1,
        '推理:白=日 / 紅=正午 → 黑=夜。'),
      // Q11 HOOK (B6 預言種子)
      nar('kt-ch5-l3-q11',
        'The black rider passed her. Night fell on the forest. She was not safe...',
        '黑騎士經過她。夜降臨森林。她不安全了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch5-4 — B1 物理懸念: 雞腳屋,門轉過來
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch5-l4', chapter: 5, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'baba-yaga',
    storyBeat: '雞腳屋 — 門轉過來',
    questions: [
      vocabIntro('kt-ch5-l4-q1', [
        ['圍籬', 'fence'], ['骨頭', 'bone'],
        ['頭骨', 'skull'], ['屋子', 'house'],
      ]),
      nar('kt-ch5-l4-q2',
        'At last she came to a wide open place in the trees.',
        '最後她到了樹林裡一塊大空地。'),
      mc('kt-ch5-l4-q3',
        'In front of her stood a fence, but it was not made of wood.',
        'What was the fence made of?',
        ['stone', 'bones', 'old rope', 'cold metal'],
        ['石頭', '骨頭', '舊繩子', '冷冰冰的金屬'],
        1,
        '不是木頭 → 骨頭(see Q4)。'),
      nar('kt-ch5-l4-q4',
        'On each post sat a skull. The eyes glowed in the dark.',
        '每根柱子上有一個頭骨。眼睛在黑暗裡發亮。'),
      tf('kt-ch5-l4-q5',
        'Light came out of the skulls, soft and yellow.',
        '頭骨裡發出柔柔黃黃的光。',
        'Were the skulls just dead bones?', 'N',
        '推理:會發光 → 不是普通死骨頭 → 答 No'),
      nar('kt-ch5-l4-q6',
        'Inside the fence was a small house.',
        '圍籬裡面有一間小屋子。'),
      emoji('kt-ch5-l4-q7',
        'What was strange about the small house?',
        'What was strange?',
        ['🐔 it stood on chicken legs', '🌳 it grew on a tree', '🪨 it sat on a rock', '🛶 it floated on water'],
        ['用雞腳站著', '長在樹上', '坐在石頭上', '飄在水上'],
        0,
        '雞腳上的屋子。'),
      nar('kt-ch5-l4-q8',
        'The legs turned slowly. The whole house moved.',
        '雞腳慢慢轉。整間屋子在動。'),
      mc('kt-ch5-l4-q9',
        'The door of the house had been facing away from Vasilisa.',
        'Why did the house turn?',
        ['hiding from her', 'showing its door to Vasilisa', 'getting ready to sleep', 'running away'],
        ['躲開她', '把門對著 Vasilisa', '準備睡覺', '逃跑'],
        1,
        '門本來背對她 → 屋子轉 → 門面向她。'),
      gist('kt-ch5-l4-q10',
        'A house with legs turns by itself so its door looks at the girl.',
        'What is this scene mainly showing?',
        ['an ordinary old hut',
         'one house that moves by itself',
         'a tree falling down',
         'building a new home'],
        ['普通老房子', '一間自己會動的屋子', '一棵樹倒下', '蓋新家'],
        1,
        '主旨 = 屋子自己動。'),
      // Q11 HOOK (B1 物理懸念)
      nar('kt-ch5-l4-q11',
        'The door stopped right in front of her. Then it opened by itself...',
        '門剛好停在她面前。然後門自己打開……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch5-5 — B2 情緒翻轉: 「我聞到俄羅斯女孩」
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch5-l5', chapter: 5, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'baba-yaga',
    storyBeat: '巫婆回家 — 「我聞到俄羅斯女孩」',
    questions: [
      vocabIntro('kt-ch5-l5-q1', [
        ['老', 'old'], ['鼻子', 'nose'],
        ['牙齒', 'teeth'], ['聞', 'smell'],
      ]),
      nar('kt-ch5-l5-q2',
        'Vasilisa stepped inside. The house was warm. The fire was high.',
        'Vasilisa 走進去。屋子裡暖暖的。火很大。'),
      tf('kt-ch5-l5-q3',
        'She stood by the wall and did not sit down.',
        '她站在牆邊,沒坐下。',
        'Did she feel at home here?', 'N',
        '推理:不敢坐下 → 不自在 → 答 No'),
      nar('kt-ch5-l5-q4',
        'Outside, something big and round came through the trees.',
        '屋外,一個大大圓圓的東西從樹林過來。'),
      mc('kt-ch5-l5-q5',
        'Baba Yaga sat inside a great stone bowl and pushed it with a long stick.',
        'How did Baba Yaga move?',
        ['walking', 'riding inside a bowl', 'flying like a bird', 'on a horse'],
        ['用走的', '坐在碗裡', '像鳥一樣飛', '騎馬'],
        1,
        '坐石碗 + 用棍子推。'),
      nar('kt-ch5-l5-q6',
        'Her nose was long like a piece of iron. Her teeth were long too.',
        '她的鼻子長得像鐵。牙齒也很長。'),
      emoji('kt-ch5-l5-q7',
        'How did Baba Yaga look?',
        'How did she look?',
        ['👵 a very old woman', '👧 a young girl', '🧚 a kind fairy', '🤴 a young king'],
        ['很老的婦人', '小女孩', '善良仙女', '年輕國王'],
        0,
        '老婦人(很老的巫婆)。'),
      nar('kt-ch5-l5-q8',
        'Baba Yaga stopped at the door. She lifted her nose.',
        'Baba Yaga 在門口停下。她抬起鼻子。'),
      mc('kt-ch5-l5-q9',
        'She turned her head left and right, breathing in the air.',
        'What was Baba Yaga doing at the door?',
        ['looking for her broom', 'smelling the air', 'singing softly', 'kicking the dirt'],
        ['找掃把', '在聞空氣', '輕聲唱歌', '踢泥土'],
        1,
        '抬鼻 + 用力呼吸 → 聞氣味。'),
      inferLc('kt-ch5-l5-q10',
        'Baba Yaga came in and looked straight at Vasilisa.',
        'How did Baba Yaga know a person was inside?',
        ['she saw footprints', 'she smelled a person', 'a bird told her', 'the door called out'],
        ['看到腳印', '聞到人', '小鳥告訴她', '門喊她'],
        1,
        '推理:她在門口聞 → 用鼻子知道有人。'),
      // Q11 HOOK (B2 情緒翻轉)
      nar('kt-ch5-l5-q11',
        '"I smell a Russian girl," she said. "Why are you here?"',
        '「我聞到一個俄羅斯女孩,」她說。「妳為什麼在這?」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch5-6 — B3 資訊缺口: 「幫我」— 娃娃做什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch5-l6', chapter: 5, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'baba-yaga',
    storyBeat: '不可能的事 — 娃娃,幫我',
    questions: [
      vocabIntro('kt-ch5-l6-q1', [
        ['工作', 'work'], ['一堆', 'pile'],
        ['沙', 'sand'], ['睡', 'sleep'],
      ]),
      nar('kt-ch5-l6-q2',
        'Vasilisa said quietly, "Grandmother, I came for fire."',
        'Vasilisa 輕輕說:「奶奶,我來拿火。」'),
      mc('kt-ch5-l6-q3',
        'Baba Yaga laughed loud. "First, do my work. Then we will talk about fire."',
        'What did Baba Yaga want first?',
        ['money', 'work done', 'a story', 'a song'],
        ['錢', '把工作做完', '一個故事', '一首歌'],
        1,
        '先做完工作才談火。'),
      nar('kt-ch5-l6-q4',
        'She pointed to a great pile of rice mixed with black sand.',
        '她指著一堆白米跟黑沙混在一起的東西。'),
      tf('kt-ch5-l6-q5',
        'Sort the rice from the sand before morning, or I will keep you here.',
        '天亮前把米跟沙分開,不然我就把妳留下來。',
        'Was this work easy to finish in one night?', 'N',
        '推理:一堆混米 + 黑沙 + 一晚 → 不可能容易 → 答 No'),
      nar('kt-ch5-l6-q6',
        'Baba Yaga went to bed. The skulls glowed by the wall.',
        'Baba Yaga 去睡了。頭骨在牆邊發光。'),
      emoji('kt-ch5-l6-q7',
        'What gave light in the room?',
        'What gave light?',
        ['💡 a lamp', '🔥 a fireplace', '💀 glowing skulls', '🕯️ small candles'],
        ['電燈', '壁爐', '會發光的頭骨', '小蠟燭'],
        2,
        '頭骨發光。'),
      nar('kt-ch5-l6-q8',
        'Vasilisa sat by the pile. She did not know where to start.',
        'Vasilisa 坐在那堆東西旁邊。她不知道從哪開始。'),
      mc('kt-ch5-l6-q9',
        'Tears almost came up. But she put her hand into her pocket.',
        'What did Vasilisa do when she felt lost?',
        ['ran away', 'reached for the doll', 'shouted for help', 'fell asleep'],
        ['跑掉', '伸手摸娃娃', '大叫求救', '睡著了'],
        1,
        '手伸進口袋 → 摸娃娃。'),
      gist('kt-ch5-l6-q10',
        'A scared girl sits by an impossible job and reaches for her mother\'s small gift.',
        'What is this scene mainly showing?',
        ['one girl finding her only source of help',
         'crying and giving up at last',
         'teaching a lesson to a witch',
         'happy night around the fire'],
        ['一個女孩找到唯一依靠', '哭到放棄', '教巫婆一課', '火邊快樂的夜'],
        0,
        '主旨 = 在絕望中找到媽媽留的依靠。'),
      // Q11 HOOK (B3 資訊缺口)
      nar('kt-ch5-l6-q11',
        'She took the small doll out. "Help me," she whispered. The doll opened its eyes...',
        '她拿出小娃娃。「幫我,」她輕聲說。娃娃睜開了眼睛……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch5-7 — B2 大翻轉 + 收: 新太太化成灰
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch5-l7', chapter: 5, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'baba-yaga',
    storyBeat: '帶光回家 — 新太太化成灰',
    questions: [
      vocabIntro('kt-ch5-l7-q1', [
        ['天亮', 'dawn'], ['驚訝', 'surprised'],
        ['帶', 'carry'], ['灰', 'ash'],
      ]),
      nar('kt-ch5-l7-q2',
        'The doll worked all night. The rice was sorted by dawn.',
        '娃娃做了一整夜。天亮的時候米都分好了。'),
      mc('kt-ch5-l7-q3',
        'When Baba Yaga woke up, she saw the rice in one pile and sand in another.',
        'How did Baba Yaga feel when she saw the work done?',
        ['proud', 'surprised', 'angry', 'bored'],
        ['驕傲', '驚訝', '生氣', '無聊'],
        1,
        '不可能完成 → 完成了 → 驚訝。'),
      nar('kt-ch5-l7-q4',
        'Baba Yaga did not ask how. She gave a long, careful look at the girl.',
        'Baba Yaga 沒問怎麼做到。她長長地、仔細地看著女孩。'),
      tf('kt-ch5-l7-q5',
        'After a long silence, she said, "Take your fire and go."',
        '安靜了很久後,她說:「拿妳的火,走吧。」',
        'Did Baba Yaga let Vasilisa leave?', 'Y',
        '推理:叫她拿火走 → 放她走 → 答 Yes'),
      nar('kt-ch5-l7-q6',
        'She gave Vasilisa a skull with glowing eyes on a stick.',
        '她給 Vasilisa 一個頭骨,眼睛發光,插在棍子上。'),
      emoji('kt-ch5-l7-q7',
        'What did Vasilisa carry home?',
        'What did she carry?',
        ['💀 a glowing skull', '🕯️ a small candle', '🔥 a burning log', '🪨 a hot stone'],
        ['發光的頭骨', '小蠟燭', '燒著的木頭', '熱石頭'],
        0,
        '頭骨光 = 巫婆的火。'),
      nar('kt-ch5-l7-q8',
        'Vasilisa carried the light back through the dark woods.',
        'Vasilisa 帶著光,穿過黑黑的森林回家。'),
      mc('kt-ch5-l7-q9',
        'Back at her house, her father\'s wife opened the door and stared.',
        'Who came out to see the light?',
        ['her father', 'the new woman', 'the village priest', 'a neighbor'],
        ['爸爸', '新太太', '村裡牧師', '鄰居'],
        1,
        '爸爸的太太 = 新太太(繼母)。'),
      nar('kt-ch5-l7-q10',
        'The glowing eyes turned to her. She could not look away.',
        '發光的眼睛轉向她。她移不開目光。'),
      // Q11 HOOK (B2 大翻轉)
      nar('kt-ch5-l7-q11',
        'In a single breath, the new woman turned to ash. Vasilisa held the light close...',
        '一口氣的時間,新太太化成灰。Vasilisa 把光抱緊……'),
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
