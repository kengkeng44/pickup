#!/usr/bin/env node
/**
 * v2.0.B.210 — Ch1 桃太郎 rewrite v3: paraphrased questions, no R1_VERBATIM.
 *
 * Per user: '問題要換句話說 不能答案的單字就在前一句'.
 *
 * Design rule: For listen-mc + listen-comprehension Q,
 *   - Sentence describes the situation (what user hears)
 *   - Question asks a DIFFERENT angle (what/why/how/feeling)
 *   - Correct answer uses CONCEPT or PARAPHRASE not in sentence
 *
 * 3 paraphrase strategies:
 *   1. Form change: "mountain" sentence → "high place" answer
 *   2. Angle change: where → what was he doing
 *   3. Concept change: "river" sentence → "water side" answer
 *
 * Same structure as v2: 7 lessons × 12 Q = 84 Q, vocab tap-pairs TOP.
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
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh, subSkill) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro'],
    subSkill: subSkill || 'detail' };
}
function lc(id, en, qEn, opts, optsZh, correct, expZh) {
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
    sentence: 'Match new vocabulary before the story.',
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
  // Ch1-1 — Setup (老夫婦的安靜村莊)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l1', chapter: 1, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '老夫婦的安靜村莊',
    questions: [
      vocabIntro('kt-ch1-l1-q1', [
        ['老人', 'old man'],
        ['河', 'river'],
        ['山', 'mountain'],
        ['衣服', 'clothes'],
      ]),
      nar('kt-ch1-l1-q2',
        'Long ago, an old man and woman lived in a village.',
        '很久以前,一對老夫婦住在一個小村莊。'),
      nar('kt-ch1-l1-q3',
        'They were kind, but they had no children.',
        '他們很善良,但是沒有孩子。'),
      tf('kt-ch1-l1-q4',
        'The old couple had no children.',
        '老夫婦沒有孩子。',
        'Did they have children?', 'N',
        '答案 No — 故事說他們沒有孩子。'),
      // paraphrase: sentence 用 "climbed up high to gather firewood" 抽象,
      // question 問 "where did he go" — 答 mountain (sentence 沒 mountain 字)
      mc('kt-ch1-l1-q5',
        'Each day, the old man climbed up high to gather firewood.',
        'Where did the old man work?',
        ['by the sea', 'on the mountain', 'in the town', 'in the garden'],
        ['海邊', '山上', '鎮上', '花園'],
        1,
        '他爬到高處 = 山上工作。'),
      // paraphrase: sentence 用 "carried home heavy wood", question 問 task
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
      tf('kt-ch1-l1-q8',
        'The old woman washed clothes at the river.',
        '老婆婆在河邊洗衣服。',
        'Did she wash clothes at the river?', 'Y',
        '答案 Yes — 她在河邊洗衣服。'),
      // paraphrase: sentence "knelt beside the cool water", question 問 task
      mc('kt-ch1-l1-q9',
        'Each morning she knelt beside the cool water.',
        'Why did she sit by the water?',
        ['to fish', 'to swim', 'to wash clothes', 'to rest'],
        ['釣魚', '游泳', '洗衣服', '休息'],
        2,
        '她去水邊是為了洗衣服。'),
      lc('kt-ch1-l1-q10',
        'The couple lived a quiet life with no children of their own.',
        'How was their daily life?',
        ['noisy and busy', 'quiet and lonely', 'rich and easy', 'cold and dark'],
        ['吵又忙', '安靜又孤單', '有錢又輕鬆', '冷又暗'],
        1,
        '他們的生活安靜但孤單。'),
      // paraphrase: sentence "far from the busy city", question 問 village size
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
  // Ch1-2 — Discovery (河邊巨桃)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l2', chapter: 1, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '河邊撿到大桃',
    questions: [
      vocabIntro('kt-ch1-l2-q1', [
        ['大', 'big'],
        ['桃子', 'peach'],
        ['漂', 'float'],
        ['抱', 'carry'],
      ]),
      nar('kt-ch1-l2-q2',
        'One spring day, the old woman went to the river as always.',
        '一個春天,老婆婆像平常一樣去河邊。'),
      nar('kt-ch1-l2-q3',
        'She saw something pink and big drifting on the water.',
        '她看見一個粉紅又大的東西漂在水上。'),
      // paraphrase: sentence "pink fruit larger than a basket", question 問 fruit type
      emoji('kt-ch1-l2-q4',
        'A pink fruit larger than a basket bobbed toward her.',
        'What kind of fruit was it?',
        ['🍑 peach', '🐟 fish', '🌸 flower', '🍎 apple'],
        ['桃子', '魚', '花', '蘋果'],
        0,
        '她看到的是一顆巨大的桃子。'),
      tf('kt-ch1-l2-q5',
        'The peach was very small.',
        '那顆桃子很小。',
        'Was the peach small?', 'N',
        '答案 No — 桃子很大。'),
      // paraphrase: sentence "larger than her head", question 問 size impression
      mc('kt-ch1-l2-q6',
        'The pink fruit was larger than her head.',
        'How would you describe the size?',
        ['as small as a coin', 'as huge as a melon', 'as tall as a tree', 'as thin as a leaf'],
        ['像硬幣那麼小', '像甜瓜那麼大', '像樹那麼高', '像葉那麼薄'],
        1,
        '桃子像甜瓜那麼大。'),
      // paraphrase: sentence "rose color shone bright", question 問 color
      mc('kt-ch1-l2-q7',
        'The fruit\'s rose color shone bright in the sun.',
        'What color was the fruit?',
        ['blue', 'pink', 'green', 'yellow'],
        ['藍色', '粉紅色', '綠色', '黃色'],
        1,
        'rose color = 粉紅色。'),
      tf('kt-ch1-l2-q8',
        'The peach floated on the water.',
        '桃子漂在水上。',
        'Did the peach float?', 'Y',
        '答案 Yes — 桃子漂在水上。'),
      // paraphrase: sentence "lifted with both arms", question 問 what next
      mc('kt-ch1-l2-q9',
        'She lifted the heavy fruit with both arms.',
        'What did she do next?',
        ['ate it now', 'carried it home', 'threw it back', 'gave it away'],
        ['當場吃', '抱回家', '丟回去', '送人'],
        1,
        '她把桃子抱回家。'),
      lc('kt-ch1-l2-q10',
        'The peach was so heavy that she had to rest twice on the way.',
        'Why did she stop on the way?',
        ['she felt sleepy', 'her load was too heavy', 'the road was long', 'she was singing'],
        ['想睡覺', '她抱的太重', '路很長', '在唱歌'],
        1,
        '因為太重所以中途休息。'),
      // paraphrase: sentence "couldn't wait to show", question 問 to whom
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
  // Ch1-3 — Birth (桃子裡的男嬰)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l3', chapter: 1, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '桃子裡的男嬰',
    questions: [
      vocabIntro('kt-ch1-l3-q1', [
        ['男嬰', 'baby boy'],
        ['開心', 'happy'],
        ['打開', 'open'],
        ['名字', 'name'],
      ]),
      nar('kt-ch1-l3-q2',
        'The old couple put the giant fruit on the wooden table.',
        '老夫婦把巨大的桃子放在木桌上。'),
      nar('kt-ch1-l3-q3',
        'The peach split open by itself, and a baby boy appeared.',
        '桃子自己裂開,一個男嬰出現了。'),
      tf('kt-ch1-l3-q4',
        'Inside the peach was a baby boy.',
        '桃子裡有個男嬰。',
        'Was there a baby inside?', 'Y',
        '答案 Yes — 桃子裡有個男嬰。'),
      // paraphrase: sentence "fruit cracked open without help", question 問 how
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
      tf('kt-ch1-l3-q7',
        'The old couple were happy to see the baby.',
        '老夫婦看到男嬰很開心。',
        'Were they happy?', 'Y',
        '答案 Yes — 他們很開心。'),
      // paraphrase: sentence "named after the fruit", question 問 connection
      mc('kt-ch1-l3-q8',
        'They named the boy after the fruit he came from.',
        'Why was he named "peach boy"?',
        ['his mother\'s wish', 'a village tradition', 'he came from a peach', 'a god\'s order'],
        ['媽媽的願望', '村莊習俗', '他從桃子來', '神的命令'],
        2,
        '因為他從桃子來,所以叫桃男孩。'),
      // paraphrase: sentence Japanese culture context, question 問 meaning
      mc('kt-ch1-l3-q9',
        'In Japanese, "momo" means the fruit and "taro" means boy.',
        'What does "Momotaro" mean?',
        ['mountain boy', 'river boy', 'peach boy', 'forest boy'],
        ['山男孩', '河男孩', '桃男孩', '森林男孩'],
        2,
        '日文 Momo = 桃,Taro = 男孩。'),
      lc('kt-ch1-l3-q10',
        'After many lonely years, their wish for a child had come true.',
        'What changed for the couple?',
        ['they got richer', 'they finally had a child', 'they moved away', 'they became sad'],
        ['變有錢', '終於有了小孩', '搬走了', '變難過'],
        1,
        '他們等了很久,終於有了小孩。'),
      // paraphrase: sentence "felt like real family", question 問 role
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
  // Ch1-4 — Growth & Mission (桃太郎長大,鬼島消息)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l4', chapter: 1, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '桃太郎長大,鬼島消息',
    questions: [
      vocabIntro('kt-ch1-l4-q1', [
        ['強壯', 'strong'],
        ['善良', 'kind'],
        ['打', 'fight'],
        ['妖怪', 'demon'],
      ]),
      nar('kt-ch1-l4-q2',
        'Momotaro grew taller and stronger every year.',
        '桃太郎一年比一年高也一年比一年壯。'),
      nar('kt-ch1-l4-q3',
        'One day, bad news came from a far island in the east.',
        '有一天,東方遠處的島上傳來壞消息。'),
      tf('kt-ch1-l4-q4',
        'Momotaro was strong and kind.',
        '桃太郎強壯又善良。',
        'Was Momotaro kind?', 'Y',
        '答案 Yes — 他強壯也善良。'),
      // paraphrase: sentence "grew fast and brave", question 問 nature
      mc('kt-ch1-l4-q5',
        'He grew fast and became known as a brave young man.',
        'How was Momotaro as he grew up?',
        ['lazy and rude', 'strong and brave', 'weak and shy', 'sick and small'],
        ['懶又粗魯', '強壯又勇敢', '弱又害羞', '生病又小'],
        1,
        '他長得快又勇敢。'),
      // paraphrase: sentence "attacked towns", question 問 what bad
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
      tf('kt-ch1-l4-q8',
        'The demons came from Demon Island.',
        '妖怪來自鬼島。',
        'Did the demons come from Demon Island?', 'Y',
        '答案 Yes — 他們來自鬼島。'),
      // paraphrase: sentence "said farewell and packed", question 問 plan
      mc('kt-ch1-l4-q9',
        'He said farewell to his parents and packed a small bag.',
        'What did Momotaro decide to do?',
        ['stay home', 'leave to fight', 'become a farmer', 'sleep all day'],
        ['留家裡', '出發去打', '當農夫', '整天睡'],
        1,
        '他出發去打妖怪。'),
      lc('kt-ch1-l4-q10',
        'He chose this hard road to protect those he loved.',
        'Why did he leave home?',
        ['to find gold', 'to keep loved ones safe', 'to see the sea', 'to make friends'],
        ['找金子', '保護家人', '看海', '交朋友'],
        1,
        '他想保護家人。'),
      // paraphrase: sentence "blessed him with tears", question 問 parent reaction
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
  // Ch1-5 — Departure (黍米糰子 + 三夥伴)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l5', chapter: 1, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '黍米糰子與三夥伴',
    questions: [
      vocabIntro('kt-ch1-l5-q1', [
        ['狗', 'dog'],
        ['猴子', 'monkey'],
        ['糰子', 'dumpling'],
        ['雉雞', 'pheasant'],
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
      tf('kt-ch1-l5-q5',
        'The old woman made millet dumplings for the trip.',
        '老婆婆為旅程做了黍米糰子。',
        'Did she make dumplings?', 'Y',
        '答案 Yes — 她做了糰子。'),
      // paraphrase: sentence "small round snack made of grain", question 問 what food
      mc('kt-ch1-l5-q6',
        'The mother packed small round snacks made of grain.',
        'What snack did she make?',
        ['cake', 'millet dumplings', 'rice balls', 'noodles'],
        ['蛋糕', '黍米糰子', '飯糰', '麵條'],
        1,
        '她做了黍米糰子。'),
      // paraphrase: sentence "first animal had four legs and barked", question 問 which animal
      mc('kt-ch1-l5-q7',
        'The first animal had four legs and barked loudly.',
        'Which animal came first?',
        ['a cat', 'a dog', 'a fish', 'a snake'],
        ['貓', '狗', '魚', '蛇'],
        1,
        '會吠的四腳動物 = 狗。'),
      tf('kt-ch1-l5-q8',
        'Each animal joined Momotaro after he shared a dumpling.',
        '每隻動物在桃太郎分糰子後就加入。',
        'Did he share dumplings?', 'Y',
        '答案 Yes — 他分糰子給每隻動物。'),
      // paraphrase: sentence "climbed down from the tree", question 問 second animal
      mc('kt-ch1-l5-q9',
        'The next friend climbed down from a tall tree.',
        'What kind of animal was the second friend?',
        ['a horse', 'a monkey', 'a fish', 'a bear'],
        ['馬', '猴子', '魚', '熊'],
        1,
        '從樹上下來 = 猴子。'),
      lc('kt-ch1-l5-q10',
        'The three animals promised to fight beside him all the way.',
        'Why did the animals join him?',
        ['for the trip', 'to fight with him', 'to go home', 'to find food only'],
        ['只想旅行', '一起打仗', '回家', '只想找食物'],
        1,
        '動物們答應一起打仗。'),
      // paraphrase: sentence "flew down from the sky", question 問 third animal
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
  // Ch1-6 — Battle (鬼島大戰)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l6', chapter: 1, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '鬼島大戰',
    questions: [
      vocabIntro('kt-ch1-l6-q1', [
        ['船', 'boat'],
        ['飛', 'fly'],
        ['咬', 'bite'],
        ['劍', 'sword'],
      ]),
      nar('kt-ch1-l6-q2',
        'They sailed across the dark blue sea to Demon Island.',
        '他們乘船渡過深藍的海到鬼島。'),
      nar('kt-ch1-l6-q3',
        'At the gate, each animal used its own skill to attack.',
        '在大門前,每隻動物用自己的本事攻擊。'),
      tf('kt-ch1-l6-q4',
        'They went to Demon Island by boat.',
        '他們搭船到鬼島。',
        'Did they take a boat?', 'Y',
        '答案 Yes — 他們搭船。'),
      // paraphrase: sentence "soared over the high wall", question 問 which animal
      mc('kt-ch1-l6-q5',
        'One friend soared over the high wall using its wings.',
        'Which friend went over the wall first?',
        ['the dog', 'the monkey', 'the pheasant', 'Momotaro'],
        ['狗', '猴子', '雉雞', '桃太郎'],
        2,
        '用翅膀飛 = 雉雞。'),
      // paraphrase: sentence "scaled the wall with quick hands", question 問 which animal
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
      tf('kt-ch1-l6-q8',
        'The dog bit at the demons\' legs.',
        '狗咬妖怪的腿。',
        'Did the dog bite?', 'Y',
        '答案 Yes — 狗咬妖怪。'),
      // paraphrase: sentence "raised his blade", question 問 weapon
      mc('kt-ch1-l6-q9',
        'Momotaro raised his bright blade against the demon king.',
        'What weapon did he use?',
        ['a stick', 'a sword', 'a stone', 'a rope'],
        ['棍子', '劍', '石頭', '繩子'],
        1,
        '他用劍打仗。'),
      lc('kt-ch1-l6-q10',
        'They fought side by side and soon defeated all the demons.',
        'How did they win?',
        ['by being lucky', 'by helping each other', 'by running away', 'by hiding'],
        ['運氣好', '互相幫忙', '逃跑', '躲起來'],
        1,
        '互相幫忙打贏的。'),
      // paraphrase: sentence "knelt and asked for mercy", question 問 demon action
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
  // Ch1-7 — Victory (凱旋回鄉)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l7', chapter: 1, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '凱旋回鄉',
    questions: [
      vocabIntro('kt-ch1-l7-q1', [
        ['金', 'gold'],
        ['銀', 'silver'],
        ['村莊', 'village'],
        ['歡迎', 'welcome'],
      ]),
      nar('kt-ch1-l7-q2',
        'The demons handed over all their hidden treasures.',
        '妖怪把所有藏起來的寶物都交出來。'),
      nar('kt-ch1-l7-q3',
        'Momotaro and his friends sailed back across the sea.',
        '桃太郎和朋友們乘船渡海回家。'),
      tf('kt-ch1-l7-q4',
        'The demons gave Momotaro treasures.',
        '妖怪把寶物給桃太郎。',
        'Did the demons give treasures?', 'Y',
        '答案 Yes — 妖怪給了寶物。'),
      // paraphrase: sentence "crossed the wide ocean", question 問 transport
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
      tf('kt-ch1-l7-q7',
        'The whole village came out to welcome Momotaro.',
        '整個村莊都出來歡迎桃太郎。',
        'Did the village welcome him?', 'Y',
        '答案 Yes — 整個村莊歡迎他。'),
      // paraphrase: sentence "every neighbor stepped outside", question 問 who came
      mc('kt-ch1-l7-q8',
        'Every neighbor stepped outside to cheer for him.',
        'Who came out to welcome them?',
        ['only parents', 'only the old man', 'the whole village', 'the demons'],
        ['只有父母', '只有老公公', '整個村莊', '妖怪'],
        2,
        '整個村莊都出來歡迎。'),
      // paraphrase: sentence "tears of joy ran down", question 問 feeling
      mc('kt-ch1-l7-q9',
        'Tears of joy ran down the old couple\'s cheeks.',
        'How did the old couple feel?',
        ['angry', 'happy and proud', 'sad', 'cold'],
        ['生氣', '又開心又驕傲', '難過', '冷'],
        1,
        '他們又開心又驕傲。'),
      lc('kt-ch1-l7-q10',
        'Momotaro chose to share his prize with all his neighbors.',
        'What did Momotaro do with the treasures?',
        ['kept it all', 'shared with village', 'gave back to demons', 'threw in river'],
        ['全部自己留', '分給村莊', '還給妖怪', '丟河裡'],
        1,
        '他分給村莊。'),
      // paraphrase: sentence "village hero", question 問 reputation
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
for (const l of lessons) {
  console.log(`     ${l.id}: ${l.questions.length} Q — ${l.storyBeat}`);
}
