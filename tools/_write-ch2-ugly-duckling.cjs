#!/usr/bin/env node
/**
 * v2.0.B.211 — Ch2 醜小鴨 v1 (first non-Momotaro story applying full skill stack).
 *
 * Pipeline:
 *   narrative-cut-analyst → docs/canon/ugly-duckling-cuts.md (7 cuts validated 3/3)
 *   pickup-item-writer    → this file (A2 ELT 7 hard rules)
 *
 * Structure per lesson (11 Q):
 *   1 vocabIntro tap-pairs (TOP, vocab intro)
 *   4-5 narration         (set scene + advance plot)
 *   4-5 tests             (mix: 1 listen-tf INFER, 1-2 listen-mc, 1 emoji-pick, optional gist)
 *   1 nar HOOK ending     (Q11, ends on inquiry-terminating question per cuts md)
 *
 * Hook map per cuts md:
 *   L1: B3 資訊缺口 — 那大蛋裡是什麼?
 *   L2: B2 情緒翻轉 — 他是醜? 還是只是不一樣?
 *   L3: B2 情緒翻轉 — 媽媽會回來保護他嗎?
 *   L4: B1 物理懸念 — 他會被打中? 還能逃多遠?
 *   L5: B5 道德兩難 — 他要去哪? 外面更冷
 *   L6: B6 預言種子 — 春天會更好? 還是又一次?
 *   L7: B2 大翻轉   — reveal climax + 開放後鉤
 *
 * Layout per lesson (235s ≤ 300s budget):
 *   Q1 vocab (30) Q2 nar (15) Q3 nar (15) Q4 tf (20) Q5 nar (15) Q6 mc (35)
 *   Q7 nar (15) Q8 mc (35) Q9 nar (15) Q10 emoji (25) Q11 nar HOOK (15)
 *
 * A2 vocab whitelist enforced. B1+ banned (boasted/enchanted/abandoned/gleamed/
 * yearned/majestic/rejected) — see SKILL.md R3 + canon md replacements.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch2.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch2', 'ugly-duckling'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch2', 'ugly-duckling', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch2', 'ugly-duckling'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch2', 'ugly-duckling', 'gist'],
    subSkill: 'gist' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch2', 'ugly-duckling', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch2', 'ugly-duckling', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch2-1 — Setup: mother duck waits / big egg has not cracked yet
  // Hook B3 資訊缺口: 那大蛋裡是什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch2-l1', chapter: 2, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'ugly-duckling',
    storyBeat: '鴨媽媽等待 — 大蛋還沒裂',
    questions: [
      vocabIntro('kt-ch2-l1-q1', [
        ['蛋', 'egg'],
        ['等', 'wait'],
        ['窩', 'nest'],
        ['裡面', 'inside'],
      ]),
      nar('kt-ch2-l1-q2',
        'In the warm reeds by the pond, mother duck sat on her nest.',
        '在池邊溫暖的蘆葦叢裡,鴨媽媽坐在她的窩上。'),
      nar('kt-ch2-l1-q3',
        'She had six round eggs to keep safe and warm.',
        '她有六顆圓圓的蛋要保護和保溫。'),
      tf('kt-ch2-l1-q4',
        'The reeds around her stood very still in the soft sun.',
        '她身邊的蘆葦在柔和的陽光下靜靜地站著。',
        'Was the place busy and loud?', 'N',
        '推理:蘆葦靜靜地站著 → 安靜的地方 → 答 No'),
      nar('kt-ch2-l1-q5',
        'One sunny morning, five small eggs began to crack open.',
        '一個晴朗的早上,五顆小蛋開始裂開。'),
      mc('kt-ch2-l1-q6',
        'Bright yellow babies tumbled out one by one onto the grass.',
        'What came out of the eggs?',
        ['grey chicks', 'tiny yellow ducklings', 'green frogs', 'white kittens'],
        ['灰色雛鳥', '小小黃色鴨寶寶', '綠青蛙', '白小貓'],
        1,
        '黃色 + 翻出來 → 黃色鴨寶寶。'),
      nar('kt-ch2-l1-q7',
        'But one large egg was bigger than all the others.',
        '但有一顆大蛋比其他所有都大。'),
      mc('kt-ch2-l1-q8',
        'That big egg stayed quiet and closed on the soft nest.',
        'What was different about this egg?',
        ['very small', 'already broken', 'still closed up', 'painted with color'],
        ['很小', '已經破了', '還沒打開', '塗了顏色'],
        2,
        '安靜 + 沒裂開 → 還沒打開。'),
      nar('kt-ch2-l1-q9',
        'Mother duck sat down again and waited day after day.',
        '鴨媽媽再次坐下,日復一日地等。'),
      emoji('kt-ch2-l1-q10',
        'How did mother duck feel?',
        'How did she feel?',
        ['😟 worried', '😄 excited', '😴 sleepy', '😡 angry'],
        ['擔心', '興奮', '想睡', '生氣'],
        0,
        '一直等 → 擔心。'),
      // Q11 HOOK B3 — 大蛋裡是什麼?
      nar('kt-ch2-l1-q11',
        'Then she felt a small thump from inside the big egg...',
        '然後她感覺到大蛋裡傳來一個小小的撞擊聲……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch2-2 — Discovery: big egg cracks, grey duckling, others stare
  // Hook B2 情緒翻轉: 他是醜? 還是只是不一樣?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch2-l2', chapter: 2, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'ugly-duckling',
    storyBeat: '大蛋裂開 — 灰色鴨寶寶 — 大家盯著看',
    questions: [
      vocabIntro('kt-ch2-l2-q1', [
        ['灰', 'grey'],
        ['大', 'large'],
        ['不同', 'different'],
        ['盯著看', 'stare'],
      ]),
      nar('kt-ch2-l2-q2',
        'At last the great egg began to crack open slowly.',
        '最後那顆大蛋開始慢慢裂開。'),
      nar('kt-ch2-l2-q3',
        'Out came a baby duck — but he was large and grey.',
        '一隻鴨寶寶出來了 — 但他又大又灰。'),
      tf('kt-ch2-l2-q4',
        'The yellow ducklings stopped playing and turned their heads.',
        '黃色鴨寶寶們停下不玩了,轉過頭去。',
        'Did the yellow ducklings notice him?', 'Y',
        '推理:停下來轉頭 → 注意到他 → 答 Yes'),
      nar('kt-ch2-l2-q5',
        'They looked at the new baby for a long, quiet moment.',
        '他們看著新的寶寶,看了很久,很安靜。'),
      mc('kt-ch2-l2-q6',
        'The new duckling did not look like his brothers and sisters.',
        'How was the new duckling not the same?',
        ['smaller in size', 'missing his feet', 'a different color', 'unable to swim'],
        ['他比較小', '他沒有腳', '他顏色不同', '他不會游泳'],
        2,
        '不像兄弟姐妹 → 顏色不同。'),
      nar('kt-ch2-l2-q7',
        'Mother duck looked at her new son and gave him a name.',
        '鴨媽媽看著她的新兒子,給他取了名字。'),
      mc('kt-ch2-l2-q8',
        'She wanted him to feel welcome in the warm green nest.',
        'How did mother duck treat him?',
        ['fear', 'kindness', 'anger', 'silence'],
        ['害怕', '善意', '生氣', '不說話'],
        1,
        '想讓他感到被歡迎 → 善意。'),
      nar('kt-ch2-l2-q9',
        'But the other ducklings whispered words behind his back.',
        '但其他鴨寶寶在他背後悄悄說話。'),
      emoji('kt-ch2-l2-q10',
        'How did the other ducklings act toward him?',
        'How did they act?',
        ['🤝 friendly', '👀 staring', '🎉 happy', '🤗 hugging'],
        ['友善', '盯著看', '開心', '擁抱'],
        1,
        '在背後悄悄說 + 盯著看 → 盯著看。'),
      // Q11 HOOK B2 — 他是醜? 還是只是不一樣?
      nar('kt-ch2-l2-q11',
        'Nobody made a sound. They just stared at the large grey baby...',
        '沒有人出聲。他們只是盯著那個又大又灰的寶寶……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch2-3 — Rejection: farmyard, pecked, mother turns head away
  // Hook B2 情緒翻轉: 媽媽會回來保護他嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch2-l3', chapter: 2, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'ugly-duckling',
    storyBeat: '農場 — 被啄被追 — 媽媽轉頭',
    questions: [
      vocabIntro('kt-ch2-l3-q1', [
        ['農場', 'farmyard'],
        ['母雞', 'hen'],
        ['啄', 'peck'],
        ['追', 'chase'],
      ]),
      nar('kt-ch2-l3-q2',
        'Soon the family walked to the farmyard for the first time.',
        '不久,這家人第一次走到農場。'),
      nar('kt-ch2-l3-q3',
        'There were big hens, loud ducks, and an angry old goose.',
        '那裡有大母雞、吵鬧的鴨子、還有一隻生氣的老鵝。'),
      tf('kt-ch2-l3-q4',
        'All the animals turned their eyes to the large grey baby.',
        '所有動物都把眼睛轉向那個大大灰灰的寶寶。',
        'Did the animals welcome him kindly?', 'N',
        '推理:所有人都盯著看 → 不是歡迎 → 答 No'),
      nar('kt-ch2-l3-q5',
        'A red hen ran up and pecked him hard on the wing.',
        '一隻紅母雞跑上來,用力啄他的翅膀。'),
      mc('kt-ch2-l3-q6',
        'Sharp beaks came at him from every side of the yard.',
        'What did the farmyard animals do?',
        ['played with him', 'attacked him', 'gave him food', 'sang to him'],
        ['跟他玩', '攻擊他', '給他食物', '對他唱歌'],
        1,
        '從每個方向尖嘴過來 → 攻擊。'),
      nar('kt-ch2-l3-q7',
        'At first, mother duck stood between him and the hens.',
        '一開始,鴨媽媽站在他和母雞之間。'),
      mc('kt-ch2-l3-q8',
        'She tried to keep her grey son safe from the others.',
        'What did mother duck do at first?',
        ['ran away', 'helped the hens', 'protected him', 'fell asleep'],
        ['逃走', '幫母雞', '保護他', '睡著了'],
        2,
        '站在中間 + 想保護 → 保護他。'),
      nar('kt-ch2-l3-q9',
        'But then she heard the other animals laugh out loud.',
        '但接著她聽到其他動物大聲嘲笑。'),
      emoji('kt-ch2-l3-q10',
        'How did the grey duckling feel now?',
        'How did he feel?',
        ['😭 alone', '😄 happy', '😴 sleepy', '🎉 proud'],
        ['孤單', '開心', '想睡', '驕傲'],
        0,
        '被啄 + 被笑 → 孤單。'),
      // Q11 HOOK B2 — 媽媽會回來保護他嗎?
      nar('kt-ch2-l3-q11',
        'Then she turned her head, and did not say a word...',
        '然後她轉過頭,一個字也不說……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch2-4 — Escape: wild ducks, friend, gunshots, friend falls
  // Hook B1 物理懸念: 他會被打中? 還能逃多遠?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch2-l4', chapter: 2, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'ugly-duckling',
    storyBeat: '逃跑 — 野鴨朋友 — 槍聲',
    questions: [
      vocabIntro('kt-ch2-l4-q1', [
        ['跑', 'run'],
        ['野生', 'wild'],
        ['朋友', 'friend'],
        ['倒下', 'fall'],
      ]),
      nar('kt-ch2-l4-q2',
        'That night, he climbed over the fence and left the farmyard.',
        '那晚,他爬過籬笆,離開了農場。'),
      nar('kt-ch2-l4-q3',
        'He walked across cold fields all the way to a quiet marsh.',
        '他走過冰冷的田野,一路到一片安靜的沼澤。'),
      tf('kt-ch2-l4-q4',
        'His small feet ached after many hours on the rough ground.',
        '走了很多小時粗糙的地面後,他的小腳很痛。',
        'Was his journey short and easy?', 'N',
        '推理:腳痛 + 很多小時 → 不短也不簡單 → 答 No'),
      nar('kt-ch2-l4-q5',
        'Two wild ducks let him rest beside them in the tall grass.',
        '兩隻野鴨讓他在高高的草叢旁邊休息。'),
      mc('kt-ch2-l4-q6',
        'One of them shared his food and stayed close all day.',
        'What did one wild duck become to him?',
        ['a teacher', 'a friend', 'an enemy', 'a brother'],
        ['老師', '朋友', '敵人', '哥哥'],
        1,
        '分享食物 + 一直陪 → 朋友。'),
      nar('kt-ch2-l4-q7',
        'For one bright day, he did not feel so alone anymore.',
        '有那麼晴朗的一天,他不再覺得那麼孤單。'),
      mc('kt-ch2-l4-q8',
        'The warm sun made his grey feathers feel almost soft.',
        'How did he feel that day?',
        ['scared', 'tired', 'a little better', 'angry'],
        ['害怕', '累', '好一點', '生氣'],
        2,
        '不再孤單 + 暖陽 → 好一點。'),
      nar('kt-ch2-l4-q9',
        'But then loud cracks came from the trees by the water.',
        '但接著水邊的樹叢裡傳來響亮的爆裂聲。'),
      emoji('kt-ch2-l4-q10',
        'What was the loud sound?',
        'What was the sound?',
        ['🔫 gunshots', '🌧️ rain', '🐦 birds singing', '🎵 music'],
        ['槍聲', '雨', '鳥唱歌', '音樂'],
        0,
        '響亮爆裂聲 + 樹叢 → 槍聲。'),
      // Q11 HOOK B1 — 他會被打中? 還能逃多遠?
      nar('kt-ch2-l4-q11',
        'His friend dropped to the ground. He ran with his heart pounding...',
        '他的朋友倒在地上。他跑啊跑,心臟砰砰跳……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch2-5 — Cottage: cat and hen mock, "what good are you?", he leaves
  // Hook B5 道德兩難: 他要去哪? 外面更冷
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch2-l5', chapter: 2, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'ugly-duckling',
    storyBeat: '小屋 — 貓和母雞嘲笑 — 走入冷夜',
    questions: [
      vocabIntro('kt-ch2-l5-q1', [
        ['小屋', 'cottage'],
        ['貓', 'cat'],
        ['冷', 'cold'],
        ['離開', 'leave'],
      ]),
      nar('kt-ch2-l5-q2',
        'After many days, he found a small cottage in the woods.',
        '過了很多天,他在樹林裡找到一間小屋。'),
      nar('kt-ch2-l5-q3',
        'An old woman lived there with her cat and her hen.',
        '一個老婆婆住在那裡,還有她的貓和母雞。'),
      tf('kt-ch2-l5-q4',
        'The cottage door creaked open when he gave it a soft push.',
        '他輕輕一推,小屋的門就吱呀地打開了。',
        'Was the door locked tight?', 'N',
        '推理:輕推就開 → 沒有鎖緊 → 答 No'),
      nar('kt-ch2-l5-q5',
        'The old woman kept him in her warm kitchen for many weeks.',
        '老婆婆把他留在溫暖的廚房好幾個禮拜。'),
      mc('kt-ch2-l5-q6',
        'The cat sat on his back and curled his sharp claws in fur.',
        'How did the cat treat him?',
        ['cleaned him', 'played gently', 'pressed claws on him', 'sang for him'],
        ['幫他洗澡', '溫柔玩耍', '用爪子壓他', '對他唱歌'],
        2,
        '坐他背上 + 收爪子 → 用爪子壓他。'),
      nar('kt-ch2-l5-q7',
        'The hen counted her eggs each day and shook her head.',
        '母雞每天數她的蛋,搖搖頭。'),
      mc('kt-ch2-l5-q8',
        'She told him he was useless because he laid no eggs.',
        'Why did the hen mock him?',
        ['too noisy', 'never gave any eggs', 'always running away', 'always sleeping'],
        ['他太吵', '他不會生蛋', '他一直跑', '他一直睡'],
        1,
        '不會生蛋 → 她說他沒用。'),
      nar('kt-ch2-l5-q9',
        'The cat asked him if he could purr by the warm fire.',
        '貓問他能不能在暖暖的火邊發出咕嚕聲。'),
      emoji('kt-ch2-l5-q10',
        'What is outside the cottage door?',
        'What is outside?',
        ['❄️ cold night', '☀️ warm sun', '🌸 spring garden', '🏖️ beach'],
        ['冷夜', '暖陽', '春天花園', '海灘'],
        0,
        '冬天前的夜晚 → 冷夜。'),
      // Q11 HOOK B5 — 他要去哪? 外面更冷
      nar('kt-ch2-l5-q11',
        '"What good are you?" they asked. He pushed open the door and walked into the cold...',
        '「你有什麼用?」他們問。他推開門,走進冷夜裡……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch2-6 — Winter: white birds, frozen in ice, farmer rescue, children scare
  // Hook B6 預言種子: 春天會更好? 還是又一次?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch2-l6', chapter: 2, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'ugly-duckling',
    storyBeat: '冬天 — 白鳥南飛 — 困在冰中 — 農夫救起',
    questions: [
      vocabIntro('kt-ch2-l6-q1', [
        ['冬天', 'winter'],
        ['冰', 'ice'],
        ['白色', 'white'],
        ['農夫', 'farmer'],
      ]),
      nar('kt-ch2-l6-q2',
        'In the autumn sky, he saw great white birds flying high.',
        '在秋天的天空中,他看見大大的白鳥飛得很高。'),
      nar('kt-ch2-l6-q3',
        'Their long necks stretched south as they crossed the clouds.',
        '他們長長的脖子伸向南方,越過雲朵。'),
      tf('kt-ch2-l6-q4',
        'He watched them until his neck grew sore from looking up.',
        '他一直看到脖子都因為仰望而痠痛。',
        'Did he look at the white birds for a long time?', 'Y',
        '推理:脖子看到痠 → 看很久 → 答 Yes'),
      nar('kt-ch2-l6-q5',
        'Soon snow fell, and the pond turned into hard, shining glass.',
        '不久雪下了,池塘變成又硬又亮的玻璃。'),
      mc('kt-ch2-l6-q6',
        'His small feet became stuck in the cold, frozen water.',
        'What happened to him in the pond?',
        ['flew away safely', 'got trapped in ice', 'found warm food', 'met a friend'],
        ['他飛走', '他被困在冰裡', '他找到食物', '他遇到朋友'],
        1,
        '腳卡在冷凍水裡 → 被困在冰裡。'),
      nar('kt-ch2-l6-q7',
        'A farmer came across the field and broke the ice apart.',
        '一個農夫走過田野,把冰打破。'),
      mc('kt-ch2-l6-q8',
        'He carried the shaking grey bird back to his small home.',
        'What did the farmer do?',
        ['cooked him', 'sold him', 'took him home', 'left him there'],
        ['煮了他', '賣了他', '帶他回家', '丟下他'],
        2,
        '把他抱回家 → 帶他回家。'),
      nar('kt-ch2-l6-q9',
        'The farmer\'s small children came running to see the new bird.',
        '農夫的小孩跑過來看這隻新的鳥。'),
      emoji('kt-ch2-l6-q10',
        'How did the duckling feel about the loud children?',
        'How did he feel?',
        ['😨 scared', '😄 happy', '😴 sleepy', '😋 hungry'],
        ['害怕', '開心', '想睡', '餓'],
        0,
        '吵的小孩跑來 → 害怕。'),
      // Q11 HOOK B6 — 春天會更好? 還是又一次?
      nar('kt-ch2-l6-q11',
        'He flapped his wings and ran out into the deep, white snow again...',
        '他拍動翅膀,再次跑進又深又白的雪裡……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch2-7 — Reveal: spring, white birds, reflection, he is a swan
  // Hook B2 大翻轉: reveal climax + 開放後鉤
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch2-l7', chapter: 2, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'ugly-duckling',
    storyBeat: '春天 — 倒影 — 天鵝 — 美麗',
    questions: [
      vocabIntro('kt-ch2-l7-q1', [
        ['春天', 'spring'],
        ['倒影', 'reflection'],
        ['天鵝', 'swan'],
        ['美麗', 'beautiful'],
      ]),
      nar('kt-ch2-l7-q2',
        'Spring came at last, and the cold ice melted away.',
        '春天終於來了,冰冷的冰融化了。'),
      nar('kt-ch2-l7-q3',
        'Green leaves opened, and warm sun shone over the pond.',
        '綠葉打開,溫暖的陽光照在池塘上。'),
      tf('kt-ch2-l7-q4',
        'Soft new flowers grew along the edge of the quiet water.',
        '柔軟的新花在安靜水邊長出來。',
        'Is it still cold winter now?', 'N',
        '推理:新花長出 + 暖陽 → 不是冬天了 → 答 No'),
      nar('kt-ch2-l7-q5',
        'He saw the same white birds gliding across the pond.',
        '他看見同樣的白鳥在池塘上滑行。'),
      mc('kt-ch2-l7-q6',
        'He wanted very much to be near them, even if they would chase him.',
        'How did he feel toward the white birds?',
        ['afraid only', 'pulled to them', 'angry at them', 'tired of them'],
        ['只有害怕', '被他們吸引', '對他們生氣', '對他們厭倦'],
        1,
        '非常想接近 → 被他們吸引。'),
      nar('kt-ch2-l7-q7',
        'He lowered his head to the water, ready to give up.',
        '他低下頭往水裡,準備放棄。'),
      mc('kt-ch2-l7-q8',
        'But the still pond showed him a face he did not know.',
        'What did he see in the water?',
        ['only a grey baby', 'one bird with a long neck', 'just a fish', 'just a dark shadow'],
        ['一隻灰色鴨寶寶', '一隻有長脖子的新鳥', '一條魚', '一個黑影'],
        1,
        '不認得的臉 → 長脖子的新鳥 (天鵝)。'),
      nar('kt-ch2-l7-q9',
        'A long white neck and bright wings looked back at him.',
        '一個長長的白脖子和亮亮的翅膀回望著他。'),
      emoji('kt-ch2-l7-q10',
        'What is he now?',
        'What is he?',
        ['🦢 a swan', '🐥 a chick', '🐔 a hen', '🦆 a duck'],
        ['天鵝', '小雞', '母雞', '鴨子'],
        0,
        '長白脖子 + 大翅膀 + 在池塘 → 天鵝。'),
      // Q11 HOOK B2-big — reveal climax + 開放後鉤
      nar('kt-ch2-l7-q11',
        'Children by the pond called him the most beautiful of all. He had been a swan all along...',
        '池邊的小孩說他是最美的一隻。他一直都是天鵝……'),
    ],
  },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
let tfCount = 0, mcCount = 0, narCount = 0, emojiCount = 0, vocabCount = 0;
for (const l of lessons) {
  for (const q of l.questions) {
    if (q.type === 'listen-tf') tfCount++;
    if (q.type === 'listen-mc') mcCount++;
    if (q.type === 'narration') narCount++;
    if (q.type === 'emoji-pick') emojiCount++;
    if (q.type === 'tap-pairs') vocabCount++;
  }
}
console.log(`     tf:${tfCount} mc:${mcCount} nar:${narCount} emoji:${emojiCount} vocab:${vocabCount}`);
