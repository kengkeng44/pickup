#!/usr/bin/env node
/**
 * v2.0.B.211 — Ch1 桃太郎 v4: TF 改 inference + 加 listen-comp gist.
 *
 * Per user: '太鬆了 / have/had no children / 換句話說' + 選 C (少 TF 多
 * listen-comp gist).
 *
 * Structure per lesson (12 Q):
 *   1 vocab tap-pairs  (TOP, vocab intro)
 *   2 narration        (set scene)
 *   1 listen-tf INFER  (Yes/No, inference from atmosphere/action/time/contrast)
 *   2 listen-mc        (paraphrased detail comprehension, no X3 verbatim)
 *   1 emoji-pick       (visual hook)
 *   1 listen-comp GIST (main idea, 4 options describing scene)
 *   1 listen-mc        (paraphrased detail)
 *   1 listen-comp INFER (deeper inference)
 *   1 listen-mc        (recap)
 *   1 tap-tiles        (sentence ordering)
 *
 * TF inference 4 strategies (rotate):
 *   A. Atmosphere — sentence describes quiet/empty/lively → infer
 *   B. Action implication — sentence shows action → infer state
 *   C. Time accumulation — "for N years" → infer ongoing
 *   D. Comparison — "neighbors had X but they..." → infer not
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch1.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch1', 'momotaro'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro', 'gist'],
    subSkill: 'gist' };
}
function inferLc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro'],
    subSkill: 'inference' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch1', 'momotaro', 'vocab', 'intro'] };
}
function tapTiles(id, sentence, expZh) {
  const words = sentence.replace(/[.!?]$/, '').split(/\s+/);
  return { type: 'tap-tiles', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: sentence,
    tiles: words,
    correctOrder: words.map((_, i) => i),
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro', 'review'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch1-1 Setup — 老夫婦的安靜村莊
  // TF strategy A (atmosphere). gist: scene = lonely couple no children
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l1', chapter: 1, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '老夫婦的安靜村莊',
    questions: [
      vocabIntro('kt-ch1-l1-q1', [
        ['老人', 'old man'], ['河', 'river'],
        ['山', 'mountain'], ['衣服', 'clothes'],
      ]),
      nar('kt-ch1-l1-q2',
        'Long ago, an old man and woman lived in a village.',
        '很久以前,一對老夫婦住在一個小村莊。'),
      nar('kt-ch1-l1-q3',
        'They were kind, but their wish for a child never came.',
        '他們善良,但想要小孩的願望從沒實現。'),
      // TF A — atmosphere implies no children
      tf('kt-ch1-l1-q4',
        'Their wooden house stayed very quiet, year after year.',
        '他們的木屋年復一年都很安靜。',
        'Did noisy little ones live with them?', 'N',
        '推理:家裡很安靜 → 沒有小孩跑跳吵鬧聲 → 答 No'),
      mc('kt-ch1-l1-q5',
        'Each day, the old man climbed up high to gather firewood.',
        'Where did the old man work?',
        ['by the sea', 'on the mountain', 'in the town', 'in the garden'],
        ['海邊', '山上', '鎮上', '花園'],
        1,
        '他爬到高處 = 山上工作。'),
      mc('kt-ch1-l1-q6',
        'He carried home heavy wood for the fire.',
        'What was his daily task?',
        ['fishing', 'cutting wood', 'cooking rice', 'feeding goats'],
        ['釣魚', '砍柴', '煮飯', '養羊'],
        1,
        '他的日常工作是砍柴。'),
      emoji('kt-ch1-l1-q7',
        'What did the old couple want most?',
        'What did they want most?',
        ['👶 a child', '💰 gold', '🏠 a big house', '📺 a TV'],
        ['一個小孩', '金子', '大房子', '電視'],
        0,
        '他們最想要小孩。'),
      // gist replaces 2nd TF — main idea: lonely without children
      gist('kt-ch1-l1-q8',
        'Old age came, but no laughter of little ones filled the house.',
        'What is this scene mainly about?',
        ['the couple felt lonely without children',
         'the couple loved noisy parties',
         'the couple were rich and happy',
         'the couple moved to a new town'],
        ['夫妻沒孩子的孤單', '夫妻愛吵雜派對', '夫妻有錢又開心', '夫妻搬去新城鎮'],
        0,
        '主旨 = 老夫婦因沒孩子而孤單。'),
      mc('kt-ch1-l1-q9',
        'Each morning she knelt beside the cool water.',
        'Why did she sit by the water?',
        ['to fish', 'to swim', 'to wash clothes', 'to rest'],
        ['釣魚', '游泳', '洗衣服', '休息'],
        2,
        '她去水邊是為了洗衣服。'),
      inferLc('kt-ch1-l1-q10',
        'The couple lived a quiet life with no little ones to call their own.',
        'How was their daily life?',
        ['noisy and busy', 'quiet and lonely', 'rich and easy', 'cold and dark'],
        ['吵又忙', '安靜又孤單', '有錢又輕鬆', '冷又暗'],
        1,
        '推理:沒孩子叫他們爸媽 → 安靜又孤單。'),
      mc('kt-ch1-l1-q11',
        'Their village was small and far from the busy city.',
        'How was their village?',
        ['big and modern', 'small and remote', 'rich and crowded', 'cold and dark'],
        ['大又現代', '小又偏遠', '富又擁擠', '冷又暗'],
        1,
        '村莊小又偏遠。'),
      tapTiles('kt-ch1-l1-q12',
        'An old man and woman lived in a village.',
        '排出句子:老夫婦住在一個村莊。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-2 Discovery — 河邊撿到大桃
  // TF strategy B (action implication). gist: scene = peach floating
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l2', chapter: 1, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '河邊撿到大桃',
    questions: [
      vocabIntro('kt-ch1-l2-q1', [
        ['大', 'big'], ['桃子', 'peach'],
        ['漂', 'float'], ['抱', 'carry'],
      ]),
      nar('kt-ch1-l2-q2',
        'One spring day, the old woman went to the river as always.',
        '一個春天,老婆婆像平常一樣去河邊。'),
      nar('kt-ch1-l2-q3',
        'She saw something pink and round drifting on the water.',
        '她看見一個粉紅又圓的東西漂在水上。'),
      emoji('kt-ch1-l2-q4',
        'A pink fruit larger than a basket bobbed toward her.',
        'What kind of fruit was it?',
        ['🍑 peach', '🐟 fish', '🌸 flower', '🍎 apple'],
        ['桃子', '魚', '花', '蘋果'],
        0,
        '她看到的是一顆巨大的桃子。'),
      // TF B — action implies size (needs two hands)
      tf('kt-ch1-l2-q5',
        'She needed both hands to lift the heavy fruit from the river.',
        '她要用兩隻手才能把那個重東西從河裡撈起。',
        'Was the fruit a small thing?', 'N',
        '推理:要兩手才舉得起 → 不可能是小東西 → 答 No'),
      mc('kt-ch1-l2-q6',
        'The fruit\'s rose color shone bright in the sun.',
        'What color was the fruit?',
        ['blue', 'pink', 'green', 'yellow'],
        ['藍色', '粉紅色', '綠色', '黃色'],
        1,
        'rose color = 粉紅色。'),
      mc('kt-ch1-l2-q7',
        'The shape rolled gently on the surface of the water.',
        'What did the shape do?',
        ['sank to the bottom', 'stayed on top', 'jumped over rocks', 'flew up high'],
        ['沉到底', '停在上面', '跳過石頭', '飛上天'],
        1,
        '在水面 = 停在上面 (漂浮)。'),
      // gist replaces 2nd TF — main idea: pink shape moving on water
      gist('kt-ch1-l2-q8',
        'Pink and round, it bobbed and turned in the slow river.',
        'What is the scene mostly showing?',
        ['a large peach moving down the river',
         'a fisher catching a peach',
         'a child swimming in the river',
         'a flower garden by the water'],
        ['大桃子順流而下', '漁夫抓到桃子', '小孩在河裡游泳', '水邊的花園'],
        0,
        '主旨 = 大桃子在河上漂動。'),
      mc('kt-ch1-l2-q9',
        'She lifted the heavy fruit with both arms.',
        'What did she do next?',
        ['ate it now', 'carried it home', 'threw it back', 'gave it away'],
        ['當場吃', '抱回家', '丟回去', '送人'],
        1,
        '她把桃子抱回家。'),
      inferLc('kt-ch1-l2-q10',
        'The peach was so heavy that she had to rest twice on the way.',
        'Why did she stop on the way?',
        ['she felt sleepy', 'her load was too heavy', 'the road was long', 'she was singing'],
        ['想睡覺', '她抱的太重', '路很長', '在唱歌'],
        1,
        '推理:重到要中途休息 → 因為太重。'),
      mc('kt-ch1-l2-q11',
        'She could not wait to show this surprise to her husband.',
        'Who did she want to show it to?',
        ['a neighbor', 'the old man', 'the river god', 'a passing child'],
        ['鄰居', '老公公', '河神', '路過的小孩'],
        1,
        '她想拿給老公公看。'),
      tapTiles('kt-ch1-l2-q12',
        'The old woman carried the peach home.',
        '排出句子:老婆婆把桃子抱回家。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-3 Birth — 桃子裡的男嬰
  // TF strategy A (atmosphere — soft cry). gist: scene = overwhelming joy
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l3', chapter: 1, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '桃子裡的男嬰',
    questions: [
      vocabIntro('kt-ch1-l3-q1', [
        ['男嬰', 'baby boy'], ['開心', 'happy'],
        ['打開', 'open'], ['名字', 'name'],
      ]),
      nar('kt-ch1-l3-q2',
        'The old couple put the giant fruit on the wooden table.',
        '老夫婦把巨大的桃子放在木桌上。'),
      nar('kt-ch1-l3-q3',
        'The peach split open by itself, and a baby boy appeared.',
        '桃子自己裂開,一個男嬰出現了。'),
      // TF A — atmosphere (soft cry) implies baby
      tf('kt-ch1-l3-q4',
        'A soft cry filled the warm kitchen.',
        '溫暖的廚房裡有輕輕的哭聲。',
        'Was there a baby in the room?', 'Y',
        '推理:聽到嬰兒哭聲 → 房裡有小孩 → 答 Yes'),
      mc('kt-ch1-l3-q5',
        'The fruit cracked open without any help.',
        'How did the peach open?',
        ['the old man cut it', 'it split by itself', 'a bird pecked it', 'the woman bit it'],
        ['老公公切的', '自己裂開', '鳥啄開', '老婆婆咬開'],
        1,
        '桃子自己裂開,沒人幫忙。'),
      emoji('kt-ch1-l3-q6',
        'How did the old couple feel?',
        'How did they feel?',
        ['😊 happy', '😢 sad', '😡 angry', '😴 tired'],
        ['開心', '難過', '生氣', '想睡'],
        0,
        '他們非常開心。'),
      // gist replaces 2nd TF — main idea: overwhelming joy
      gist('kt-ch1-l3-q7',
        'Their tears, their hugs, their bright smiles filled the room.',
        'How did the old couple feel about the baby?',
        ['tired and worried',
         'overwhelming joy',
         'angry and confused',
         'sleepy and bored'],
        ['累又擔心', '滿溢的喜悅', '生氣又困惑', '想睡又無聊'],
        1,
        '主旨 = 他們充滿喜悅。'),
      mc('kt-ch1-l3-q8',
        'They named the boy after the fruit he came from.',
        'Why was he named "peach boy"?',
        ['his mother\'s wish', 'a village tradition', 'he came from a peach', 'a god\'s order'],
        ['媽媽的願望', '村莊習俗', '他從桃子來', '神的命令'],
        2,
        '他從桃子來,所以叫桃男孩。'),
      mc('kt-ch1-l3-q9',
        'In Japanese, "momo" means the fruit and "taro" means boy.',
        'What does "Momotaro" mean?',
        ['mountain boy', 'river boy', 'peach boy', 'forest boy'],
        ['山男孩', '河男孩', '桃男孩', '森林男孩'],
        2,
        '日文 Momo = 桃,Taro = 男孩。'),
      inferLc('kt-ch1-l3-q10',
        'After many lonely years, their wish for a child had come true.',
        'What changed for the couple?',
        ['they got richer', 'they finally had a child', 'they moved away', 'they became sad'],
        ['變有錢', '終於有了小孩', '搬走了', '變難過'],
        1,
        '推理:多年願望實現 → 終於有了小孩。'),
      mc('kt-ch1-l3-q11',
        'For the first time, their home felt like a real family.',
        'What did the couple become?',
        ['rich farmers', 'parents', 'famous people', 'travelers'],
        ['有錢農夫', '爸媽', '名人', '旅人'],
        1,
        '他們終於當了爸媽。'),
      tapTiles('kt-ch1-l3-q12',
        'They named the baby Momotaro.',
        '排出句子:他們為男嬰取名桃太郎。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-4 Growth & Mission — 桃太郎長大,鬼島消息
  // TF strategy C (time accumulation). gist: scene = demon damage
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l4', chapter: 1, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '桃太郎長大,鬼島消息',
    questions: [
      vocabIntro('kt-ch1-l4-q1', [
        ['強壯', 'strong'], ['善良', 'kind'],
        ['打', 'fight'], ['妖怪', 'demon'],
      ]),
      nar('kt-ch1-l4-q2',
        'Momotaro grew taller and stronger every year.',
        '桃太郎一年比一年高也一年比一年壯。'),
      nar('kt-ch1-l4-q3',
        'One day, bad news came from a far island in the east.',
        '有一天,東方遠處的島上傳來壞消息。'),
      // TF C — time accumulation implies strength
      tf('kt-ch1-l4-q4',
        'By his tenth year, he could lift a stone bigger than himself.',
        '到他十歲時,他能舉起比自己還大的石頭。',
        'Did Momotaro grow weak?', 'N',
        '推理:十歲就舉得起比自己大的石頭 → 強壯 → 答 No'),
      mc('kt-ch1-l4-q5',
        'He grew fast and became known as a brave young man.',
        'How was Momotaro as he grew up?',
        ['lazy and rude', 'strong and brave', 'weak and shy', 'sick and small'],
        ['懶又粗魯', '強壯又勇敢', '弱又害羞', '生病又小'],
        1,
        '他長得快又勇敢。'),
      mc('kt-ch1-l4-q6',
        'Cruel monsters attacked towns and stole rice.',
        'What did the monsters do?',
        ['gave gifts', 'hurt towns', 'helped farmers', 'sang songs'],
        ['送禮物', '傷害城鎮', '幫助農夫', '唱歌'],
        1,
        '妖怪攻擊城鎮。'),
      emoji('kt-ch1-l4-q7',
        'How did people feel about the demons?',
        'How did people feel?',
        ['😨 afraid', '😊 happy', '😴 sleepy', '🤔 curious'],
        ['害怕', '開心', '想睡', '好奇'],
        0,
        '大家很害怕。'),
      // gist replaces 2nd TF — main idea: demons left damage
      gist('kt-ch1-l4-q8',
        'Smoke, broken doors, and crying villagers — the demons left ruin behind.',
        'What is this scene mainly showing?',
        ['damage caused by the demons',
         'a happy festival in the village',
         'farmers planting rice fields',
         'children playing at school'],
        ['妖怪造成的破壞', '村莊歡樂節慶', '農夫種稻田', '學校小孩玩耍'],
        0,
        '主旨 = 妖怪造成的破壞。'),
      mc('kt-ch1-l4-q9',
        'He said farewell to his parents and packed a small bag.',
        'What did Momotaro decide to do?',
        ['stay home', 'leave to fight', 'become a farmer', 'sleep all day'],
        ['留家裡', '出發去打', '當農夫', '整天睡'],
        1,
        '他出發去打妖怪。'),
      inferLc('kt-ch1-l4-q10',
        'He chose this hard road to protect those he loved.',
        'Why did he leave home?',
        ['to find gold', 'to keep loved ones safe', 'to see the sea', 'to make friends'],
        ['找金子', '保護家人', '看海', '交朋友'],
        1,
        '推理:為了 those he loved → 保護家人。'),
      mc('kt-ch1-l4-q11',
        'His parents blessed him with tears in their eyes.',
        'How did his parents react?',
        ['they laughed', 'they let him go sadly', 'they hid him', 'they were angry'],
        ['他們笑', '難過地放他走', '把他藏起來', '生氣'],
        1,
        '父母含淚祝福。'),
      tapTiles('kt-ch1-l4-q12',
        'Momotaro will fight the demons.',
        '排出句子:桃太郎要去打妖怪。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-5 Departure & Allies — 黍米糰子與三夥伴
  // TF strategy B (action implication — wrap carefully). gist: animals joining
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l5', chapter: 1, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '黍米糰子與三夥伴',
    questions: [
      vocabIntro('kt-ch1-l5-q1', [
        ['狗', 'dog'], ['猴子', 'monkey'],
        ['糰子', 'dumpling'], ['雉雞', 'pheasant'],
      ]),
      nar('kt-ch1-l5-q2',
        'The old woman packed special millet snacks for his journey.',
        '老婆婆為他的旅程準備了特別的黍米點心。'),
      nar('kt-ch1-l5-q3',
        'On the road, three brave animals came to ask for food.',
        '路上,三隻勇敢的動物來討食物。'),
      emoji('kt-ch1-l5-q4',
        'Three animal friends joined Momotaro.',
        'Which three animals joined him?',
        ['🐕 🐒 🐦', '🐈 🐄 🐖', '🐟 🐢 🦆', '🐎 🦌 🐇'],
        ['狗 猴 雉', '貓 牛 豬', '魚 龜 鴨', '馬 鹿 兔'],
        0,
        '狗、猴子、雉雞加入桃太郎。'),
      // TF B — action implies purpose (long trip preparation)
      tf('kt-ch1-l5-q5',
        'She wrapped each snack carefully in a leaf for the long trip.',
        '她用葉子小心包好每個點心,為了長途旅行。',
        'Were the snacks just for breakfast at home?', 'N',
        '推理:為長途旅行包 → 不是早餐 → 答 No'),
      mc('kt-ch1-l5-q6',
        'The mother packed small round snacks made of grain.',
        'What snack did she make?',
        ['cake', 'millet dumplings', 'rice balls', 'noodles'],
        ['蛋糕', '黍米糰子', '飯糰', '麵條'],
        1,
        '她做了黍米糰子。'),
      mc('kt-ch1-l5-q7',
        'The first animal had four legs and barked loudly.',
        'Which animal came first?',
        ['a cat', 'a dog', 'a fish', 'a snake'],
        ['貓', '狗', '魚', '蛇'],
        1,
        '會吠的四腳動物 = 狗。'),
      // gist replaces 2nd TF — animals joining as team
      gist('kt-ch1-l5-q8',
        'One by one, each animal took a snack and stood beside Momotaro.',
        'What is happening in this scene?',
        ['animals joining Momotaro as friends',
         'animals eating without sharing',
         'animals running away from him',
         'Momotaro hunting wild animals'],
        ['動物加入桃太郎當朋友', '動物吃東西不分享', '動物逃離他', '桃太郎打獵野生動物'],
        0,
        '主旨 = 動物一個個加入桃太郎當夥伴。'),
      mc('kt-ch1-l5-q9',
        'The next friend climbed down from a tall tree.',
        'What kind of animal was the second friend?',
        ['a horse', 'a monkey', 'a fish', 'a bear'],
        ['馬', '猴子', '魚', '熊'],
        1,
        '從樹上下來 = 猴子。'),
      inferLc('kt-ch1-l5-q10',
        'The three animals promised to fight beside him all the way.',
        'Why did the animals join him?',
        ['for the trip', 'to fight with him', 'to go home', 'to find food only'],
        ['只想旅行', '一起打仗', '回家', '只想找食物'],
        1,
        '推理:答應 fight beside him → 一起打仗。'),
      mc('kt-ch1-l5-q11',
        'The last friend flew down from the bright sky.',
        'What kind of animal was the third friend?',
        ['a bee', 'a pheasant', 'a butterfly', 'a fish'],
        ['蜜蜂', '雉雞', '蝴蝶', '魚'],
        1,
        '從天上飛下來 = 雉雞 (一種鳥)。'),
      tapTiles('kt-ch1-l5-q12',
        'A dog and a monkey joined him.',
        '排出句子:狗跟猴子加入他。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-6 Battle — 鬼島大戰
  // TF strategy B (salty waves). gist: each friend fighting their way
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l6', chapter: 1, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '鬼島大戰',
    questions: [
      vocabIntro('kt-ch1-l6-q1', [
        ['船', 'boat'], ['飛', 'fly'],
        ['咬', 'bite'], ['劍', 'sword'],
      ]),
      nar('kt-ch1-l6-q2',
        'They sailed across the dark blue sea to Demon Island.',
        '他們乘船渡過深藍的海到鬼島。'),
      nar('kt-ch1-l6-q3',
        'At the gate, each animal used its own skill to attack.',
        '在大門前,每隻動物用自己的本事攻擊。'),
      // TF B — action implies water crossing
      tf('kt-ch1-l6-q4',
        'Salty waves splashed onto the wooden deck as they crossed.',
        '他們渡海時,鹹海浪打到木船板上。',
        'Did they walk over the land?', 'N',
        '推理:鹹海浪打船板 → 在海上 → 不是走陸路 → 答 No'),
      mc('kt-ch1-l6-q5',
        'One friend soared over the high wall using its wings.',
        'Which friend went over the wall first?',
        ['the dog', 'the monkey', 'the pheasant', 'Momotaro'],
        ['狗', '猴子', '雉雞', '桃太郎'],
        2,
        '用翅膀飛 = 雉雞。'),
      mc('kt-ch1-l6-q6',
        'Another friend scaled the wall with quick hands.',
        'Which animal used its hands?',
        ['the pheasant', 'the monkey', 'the dog', 'a fish'],
        ['雉雞', '猴子', '狗', '魚'],
        1,
        '用手爬 = 猴子。'),
      emoji('kt-ch1-l6-q7',
        'What weapon did Momotaro use?',
        'What did Momotaro use?',
        ['⚔️ a sword', '🏹 a bow', '🥢 chopsticks', '✋ his hands'],
        ['劍', '弓', '筷子', '手'],
        0,
        '他用劍打妖怪王。'),
      // gist replaces 2nd TF — each friend fighting their own way
      gist('kt-ch1-l6-q8',
        'A bird flew, a monkey climbed, and a dog bit — each gave its all.',
        'What is this scene about?',
        ['each friend fighting in its own way',
         'the animals taking turns sleeping',
         'demons hiding from the team',
         'a peaceful trip across the sea'],
        ['每個朋友用自己的方式打仗', '動物輪流睡覺', '妖怪躲避這團隊', '海上平靜旅行'],
        0,
        '主旨 = 每個夥伴用自己的方式攻擊。'),
      mc('kt-ch1-l6-q9',
        'Momotaro raised his bright blade against the demon king.',
        'What weapon did he use?',
        ['a stick', 'a sword', 'a stone', 'a rope'],
        ['棍子', '劍', '石頭', '繩子'],
        1,
        '他用劍打仗。'),
      inferLc('kt-ch1-l6-q10',
        'They fought side by side and soon defeated all the demons.',
        'How did they win?',
        ['by being lucky', 'by helping each other', 'by running away', 'by hiding'],
        ['運氣好', '互相幫忙', '逃跑', '躲起來'],
        1,
        '推理:fought side by side → 互相幫忙。'),
      mc('kt-ch1-l6-q11',
        'The demons knelt down and asked for forgiveness.',
        'What did the demons do at the end?',
        ['ran away', 'begged for mercy', 'sang songs', 'fell asleep'],
        ['逃跑', '求饒', '唱歌', '睡著'],
        1,
        '妖怪跪下求饒。'),
      tapTiles('kt-ch1-l6-q12',
        'The dog and monkey fought the demons.',
        '排出句子:狗跟猴子打了妖怪。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-7 Victory — 凱旋回鄉
  // TF strategy D (contrast — empty hands → full boxes). gist: village welcome
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l7', chapter: 1, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '凱旋回鄉',
    questions: [
      vocabIntro('kt-ch1-l7-q1', [
        ['金', 'gold'], ['銀', 'silver'],
        ['村莊', 'village'], ['歡迎', 'welcome'],
      ]),
      nar('kt-ch1-l7-q2',
        'The demons handed over all their hidden treasures.',
        '妖怪把所有藏起來的寶物都交出來。'),
      nar('kt-ch1-l7-q3',
        'Momotaro and his friends sailed back across the sea.',
        '桃太郎和朋友們乘船渡海回家。'),
      // TF D — contrast: empty going, full returning
      tf('kt-ch1-l7-q4',
        'Empty hands had left home, but full boxes returned with them.',
        '空手出發,但裝滿的箱子跟著回來。',
        'Did Momotaro come home with nothing?', 'N',
        '推理:空手去,滿箱回 → 有寶物 → 答 No'),
      mc('kt-ch1-l7-q5',
        'They crossed the wide ocean once more.',
        'How did they go home?',
        ['by horse', 'by boat', 'on foot', 'by bird'],
        ['騎馬', '坐船', '走路', '坐鳥'],
        1,
        '渡海 = 坐船。'),
      emoji('kt-ch1-l7-q6',
        'What treasures did Momotaro bring back?',
        'What treasures did he bring?',
        ['💰 gold and silver', '📚 books', '🍎 fruits', '🌺 flowers'],
        ['金和銀', '書', '水果', '花'],
        0,
        '他帶回金、銀、珠寶。'),
      // gist replaces 2nd TF — village welcome scene
      gist('kt-ch1-l7-q7',
        'Drums, songs, and tears of joy filled the village square.',
        'What is this scene mainly about?',
        ['a happy welcome for Momotaro',
         'a quiet sad evening',
         'a battle starting again',
         'people leaving the village'],
        ['歡迎桃太郎的慶典', '安靜又難過的夜', '戰鬥又開始', '村人離開村莊'],
        0,
        '主旨 = 村莊熱鬧歡迎桃太郎。'),
      mc('kt-ch1-l7-q8',
        'Every neighbor stepped outside to cheer for him.',
        'Who came out to welcome them?',
        ['only parents', 'only the old man', 'the whole village', 'the demons'],
        ['只有父母', '只有老公公', '整個村莊', '妖怪'],
        2,
        '整個村莊都出來歡迎。'),
      mc('kt-ch1-l7-q9',
        'Tears of joy ran down the old couple\'s cheeks.',
        'How did the old couple feel?',
        ['angry', 'happy and proud', 'sad', 'cold'],
        ['生氣', '又開心又驕傲', '難過', '冷'],
        1,
        '他們又開心又驕傲。'),
      inferLc('kt-ch1-l7-q10',
        'Momotaro chose to share his prize with all his neighbors.',
        'What did Momotaro do with the treasures?',
        ['kept it all', 'shared with village', 'gave back to demons', 'threw in river'],
        ['全部自己留', '分給村莊', '還給妖怪', '丟河裡'],
        1,
        '推理:share with all neighbors → 分給村莊。'),
      mc('kt-ch1-l7-q11',
        'From that day on, the village told stories about him for years.',
        'How did people remember Momotaro?',
        ['as a farmer', 'as a teacher', 'as a brave hero', 'as a quiet king'],
        ['農夫', '老師', '勇敢英雄', '安靜國王'],
        2,
        '大家把他當英雄記住。'),
      tapTiles('kt-ch1-l7-q12',
        'The village said welcome to Momotaro.',
        '排出句子:村莊歡迎桃太郎。'),
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
