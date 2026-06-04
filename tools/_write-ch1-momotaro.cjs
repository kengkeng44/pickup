#!/usr/bin/env node
/**
 * v2.0.B.208 — Write Ch1 桃太郎 7 lessons / ~48 Q from canonical source.
 *
 * Ground truth: docs/canon/momotaro.md (Japanese classic oral version)
 *
 * Structure per lesson:
 *   - 1-2 narration (set scene)
 *   - 1 emoji-pick (visual hook, optional)
 *   - 1-2 listen-tf (Yes/No, aligned with story — no contradiction)
 *   - 2-3 listen-mc (4 options, comprehension)
 *   - 1 tap-pairs (vocab review, 4 ZH-EN pairs)
 *
 * A2 constraints: ≤10 words/sentence, no B1+ vocab, past tense, narrator POV.
 *
 * Replaces existing 24-lesson Ch1 entirely.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch1.json');

// Helper — narrator narration
function nar(id, en, zh) {
  return {
    type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch1', 'momotaro'],
  };
}
// Helper — listen-tf (Yes/No aligned with story)
function tf(id, en, zh, qEn, ans /* 'Y' or 'N' */, expZh) {
  return {
    type: 'listen-tf', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en,
    questionEn: qEn,
    options: ['Yes', 'No'],
    correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro'],
  };
}
// Helper — listen-mc (4 options)
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return {
    type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh,
    correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro'],
    subSkill: 'detail',
  };
}
// Helper — emoji-pick visual hook
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return {
    type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh,
    correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch1', 'momotaro', 'hook'],
    subSkill: 'vocab',
  };
}
// Helper — tap-pairs vocab (4 ZH-EN pairs)
function pairs(id, list4, beatLabel) {
  return {
    type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Match the Japanese folk-tale words.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `${beatLabel} 重點單字配對`,
    tags: ['story', 'ch1', 'momotaro', 'vocab'],
  };
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
      nar('kt-ch1-l1-q1',
        'Long ago, an old man and woman lived in a village.',
        '很久以前,一對老夫婦住在一個村莊。'),
      nar('kt-ch1-l1-q2',
        'They were kind, but they had no children.',
        '他們很善良,但是沒有孩子。'),
      tf('kt-ch1-l1-q3',
        'The old couple had no children.',
        '老夫婦沒有孩子。',
        'Did they have children?', 'N',
        '答案是 No — 故事說他們沒有孩子。'),
      mc('kt-ch1-l1-q4',
        'Every day, the old man went to the mountain to cut wood.',
        'Where did the old man go each day?',
        ['river', 'mountain', 'town', 'garden'],
        ['河邊', '山上', '鎮上', '花園'],
        1,
        '老公公每天去山上砍柴。'),
      mc('kt-ch1-l1-q5',
        'Every day, the old woman went to the river to wash clothes.',
        'What did the old woman do at the river?',
        ['fished', 'swam', 'washed clothes', 'drank tea'],
        ['釣魚', '游泳', '洗衣服', '喝茶'],
        2,
        '老婆婆每天在河邊洗衣服。'),
      pairs('kt-ch1-l1-q6', [
        ['老人', 'old man'],
        ['山', 'mountain'],
        ['河', 'river'],
        ['衣服', 'clothes'],
      ], 'Beat 1'),
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
      nar('kt-ch1-l2-q1',
        'One spring day, the old woman went to the river as always.',
        '一個春天的日子,老婆婆像往常一樣去河邊。'),
      nar('kt-ch1-l2-q2',
        'She saw something pink and big floating on the water.',
        '她看見一個粉紅又大的東西漂在水上。'),
      emoji('kt-ch1-l2-q3',
        'A pink, round fruit floats toward her.',
        'What did she see in the river?',
        ['🍑 peach', '🐟 fish', '🌸 flower', '🍎 apple'],
        ['桃子', '魚', '花', '蘋果'],
        0,
        '她看到的是一顆巨大的桃子。'),
      tf('kt-ch1-l2-q4',
        'The peach was very small.',
        '那顆桃子很小。',
        'Was the peach small?', 'N',
        '答案 No — 桃子很大,像她的頭一樣。'),
      mc('kt-ch1-l2-q5',
        'The peach was as big as her head.',
        'How big was the peach?',
        ['as small as a coin', 'as big as her head', 'as big as a house', 'as small as a ring'],
        ['像硬幣那麼小', '像她的頭那麼大', '像房子那麼大', '像戒指那麼小'],
        1,
        '桃子有她的頭那麼大。'),
      mc('kt-ch1-l2-q6',
        'She lifted the heavy peach and walked home.',
        'What did she do with the peach?',
        ['ate it on the spot', 'carried it home', 'threw it back', 'gave it to friends'],
        ['當場吃掉', '抱回家', '丟回河裡', '給朋友'],
        1,
        '她把桃子抱回家。'),
      pairs('kt-ch1-l2-q7', [
        ['桃子', 'peach'],
        ['大', 'big'],
        ['漂', 'float'],
        ['回家', 'go home'],
      ], 'Beat 2'),
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
      nar('kt-ch1-l3-q1',
        'The old couple put the peach on the table.',
        '老夫婦把桃子放在桌上。'),
      nar('kt-ch1-l3-q2',
        'The peach split open by itself. Inside was a baby boy.',
        '桃子自己裂開了。裡面有一個男嬰。'),
      tf('kt-ch1-l3-q3',
        'Inside the peach was a baby boy.',
        '桃子裡有個男嬰。',
        'Was there a baby inside the peach?', 'Y',
        '答案 Yes — 桃子裡有個男嬰。'),
      mc('kt-ch1-l3-q4',
        'The old couple were so happy to see the baby.',
        'How did the old couple feel?',
        ['sad', 'angry', 'happy', 'tired'],
        ['難過', '生氣', '開心', '疲累'],
        2,
        '他們看到男嬰非常開心。'),
      mc('kt-ch1-l3-q5',
        'They named the baby Momotaro, which means "peach boy."',
        'What does the name "Momotaro" mean?',
        ['mountain boy', 'river boy', 'peach boy', 'forest boy'],
        ['山男孩', '河男孩', '桃男孩', '森林男孩'],
        2,
        'Momotaro 在日文是「桃男孩」的意思。'),
      pairs('kt-ch1-l3-q6', [
        ['桌子', 'table'],
        ['男嬰', 'baby boy'],
        ['開心', 'happy'],
        ['名字', 'name'],
      ], 'Beat 3'),
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
      nar('kt-ch1-l4-q1',
        'Momotaro grew quickly. He was strong and very kind.',
        '桃太郎長得很快。他很強壯也很善良。'),
      nar('kt-ch1-l4-q2',
        'One day, news came about demons on a far island.',
        '有一天,傳來遠方島上有妖怪的消息。'),
      tf('kt-ch1-l4-q3',
        'Momotaro was strong and kind.',
        '桃太郎強壯又善良。',
        'Was Momotaro kind?', 'Y',
        '答案 Yes — 桃太郎強壯也善良。'),
      mc('kt-ch1-l4-q4',
        'The demons lived on Demon Island and attacked villages.',
        'What did the demons do?',
        ['helped villages', 'attacked villages', 'made gifts', 'slept all day'],
        ['幫助村莊', '攻擊村莊', '做禮物', '睡覺'],
        1,
        '妖怪攻擊村莊。'),
      mc('kt-ch1-l4-q5',
        'Momotaro told his parents he would fight the demons.',
        'What did Momotaro decide to do?',
        ['hide at home', 'fight the demons', 'cook dinner', 'sleep early'],
        ['躲在家', '去打妖怪', '煮晚飯', '早睡'],
        1,
        '桃太郎決定去打妖怪。'),
      pairs('kt-ch1-l4-q6', [
        ['強壯', 'strong'],
        ['善良', 'kind'],
        ['妖怪', 'demon'],
        ['打', 'fight'],
      ], 'Beat 4'),
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
      nar('kt-ch1-l5-q1',
        'The old woman made special millet dumplings for Momotaro.',
        '老婆婆為桃太郎做了特別的黍米糰子。'),
      nar('kt-ch1-l5-q2',
        'On the road, he met a dog, a monkey, and a pheasant.',
        '路上,他遇到一隻狗、一隻猴子、一隻雉雞。'),
      emoji('kt-ch1-l5-q3',
        'Three animal friends joined Momotaro on the road.',
        'Which three animals joined him?',
        ['🐕 🐒 🐦', '🐈 🐄 🐖', '🐟 🐢 🦆', '🐎 🦌 🐇'],
        ['狗 猴 雉', '貓 牛 豬', '魚 龜 鴨', '馬 鹿 兔'],
        0,
        '狗、猴子、雉雞三隻動物加入桃太郎。'),
      tf('kt-ch1-l5-q4',
        'Each animal joined Momotaro after he shared a dumpling.',
        '每隻動物在桃太郎分糰子後就加入了。',
        'Did Momotaro share dumplings?', 'Y',
        '答案 Yes — 桃太郎分糰子給每隻動物。'),
      mc('kt-ch1-l5-q5',
        'The mother packed millet dumplings for the journey.',
        'What did the mother make?',
        ['cake', 'millet dumplings', 'rice balls', 'noodles'],
        ['蛋糕', '黍米糰子', '飯糰', '麵條'],
        1,
        '媽媽包黍米糰子。'),
      mc('kt-ch1-l5-q6',
        'The dog said, "Give me a dumpling and I will fight with you."',
        'What did the dog ask for?',
        ['water', 'a dumpling', 'a song', 'a map'],
        ['水', '糰子', '歌', '地圖'],
        1,
        '狗想要一個糰子。'),
      pairs('kt-ch1-l5-q7', [
        ['糰子', 'dumpling'],
        ['狗', 'dog'],
        ['猴子', 'monkey'],
        ['雉雞', 'pheasant'],
      ], 'Beat 5'),
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
      nar('kt-ch1-l6-q1',
        'They took a boat across the sea to Demon Island.',
        '他們搭船渡海到鬼島。'),
      nar('kt-ch1-l6-q2',
        'The pheasant flew over the gate. The monkey climbed in.',
        '雉雞飛過大門。猴子爬進去。'),
      tf('kt-ch1-l6-q3',
        'They went to Demon Island by boat.',
        '他們搭船到鬼島。',
        'Did they take a boat?', 'Y',
        '答案 Yes — 他們搭船去鬼島。'),
      mc('kt-ch1-l6-q4',
        'The dog bit at the demons\' legs.',
        'What did the dog do?',
        ['ran away', 'bit the demons', 'sang a song', 'hid in a tree'],
        ['逃跑', '咬妖怪', '唱歌', '躲在樹上'],
        1,
        '狗咬妖怪的腿。'),
      mc('kt-ch1-l6-q5',
        'Momotaro fought the demon king with his sword.',
        'How did Momotaro fight?',
        ['with a stick', 'with a sword', 'with his hands', 'with a rope'],
        ['用棍子', '用劍', '用手', '用繩子'],
        1,
        '桃太郎用劍打妖怪王。'),
      mc('kt-ch1-l6-q6',
        'The demons fell to their knees and begged for mercy.',
        'What did the demons do at the end?',
        ['ran away', 'begged for mercy', 'sang a song', 'fell asleep'],
        ['逃跑', '求饒', '唱歌', '睡著'],
        1,
        '妖怪跪下求饒。'),
      pairs('kt-ch1-l6-q7', [
        ['船', 'boat'],
        ['劍', 'sword'],
        ['咬', 'bite'],
        ['求饒', 'beg'],
      ], 'Beat 6'),
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
      nar('kt-ch1-l7-q1',
        'The demons gave Momotaro all their gold, silver, and jewels.',
        '妖怪把所有金、銀、珠寶都給桃太郎。'),
      nar('kt-ch1-l7-q2',
        'Momotaro and his friends sailed home with the treasures.',
        '桃太郎和朋友們帶著寶物坐船回家。'),
      tf('kt-ch1-l7-q3',
        'The demons gave Momotaro treasures.',
        '妖怪把寶物給桃太郎。',
        'Did the demons give treasures?', 'Y',
        '答案 Yes — 妖怪把寶物給桃太郎。'),
      mc('kt-ch1-l7-q4',
        'The whole village came out to welcome them home.',
        'Who came out to welcome them?',
        ['only the parents', 'just the old man', 'the whole village', 'the demons'],
        ['只有父母', '只有老公公', '整個村莊', '妖怪'],
        2,
        '整個村莊都出來歡迎他們。'),
      mc('kt-ch1-l7-q5',
        'The old couple held Momotaro tight and cried with joy.',
        'How did the old couple feel?',
        ['angry and tired', 'sad and alone', 'happy with joy', 'cold and hungry'],
        ['生氣又累', '難過又孤單', '開心又喜悅', '冷又餓'],
        2,
        '老夫婦開心地擁抱桃太郎。'),
      pairs('kt-ch1-l7-q6', [
        ['金', 'gold'],
        ['銀', 'silver'],
        ['村莊', 'village'],
        ['歡迎', 'welcome'],
      ], 'Beat 7'),
    ],
  },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
console.log(`     Beats: Setup, Discovery, Birth, Growth+Mission, Departure, Battle, Victory`);
