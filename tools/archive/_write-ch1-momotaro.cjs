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
  // Ch1-1 (v6: emotional peak cut + B3 資訊缺口 hook ending)
  // Per docs/research/chapter-ending-hook-design.md C 段
  // 結尾不停在 "setup 完成" (value 已落地), 改停在「河上紅色大東西漂來」的
  // 瞬間 (user 已知是桃但畫面未確認 = inquiry-terminating question)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l1', chapter: 1, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '春日河邊,什麼漂來?',
    questions: [
      // Q1 vocab intro (新單字含 'float' anticipates hook)
      vocabIntro('kt-ch1-l1-q1', [
        ['河', 'river'],
        ['看', 'look'],
        ['漂', 'float'],
        ['東西', 'something'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch1-l1-q2',
        'Long ago, an old man and woman lived in a small village.',
        '很久以前,一對老夫婦住在小村莊。'),
      // Q3 BEAT A 加深 — no kids (low emotion)
      nar('kt-ch1-l1-q3',
        'They were kind, but they had no children.',
        '他們善良,但是沒有孩子。'),
      // Q4 TF inference about the quiet life
      tf('kt-ch1-l1-q4',
        'Their wooden house stayed very quiet, year after year.',
        '他們的木屋年復一年都很安靜。',
        'Did any children live with them?', 'N',
        '推理:安靜的家 → 沒小孩聲 → 答 No'),
      // Q5 BEAT B — daily routine, old man
      nar('kt-ch1-l1-q5',
        'Each day, the old man went up the mountain to gather firewood.',
        '老公公每天上山撿柴。'),
      // Q6 listen-mc paraphrase about daily work
      mc('kt-ch1-l1-q6',
        'He carried home heavy wood for the fire.',
        'What was his daily task?',
        ['fishing', 'cutting wood', 'cooking rice', 'feeding goats'],
        ['釣魚', '砍柴', '煮飯', '養羊'],
        1,
        '帶柴回家 → 砍柴。'),
      // Q7 BEAT C — old woman's routine
      nar('kt-ch1-l1-q7',
        'Each morning, the old woman went to the river to wash clothes.',
        '老婆婆每天早上去河邊洗衣服。'),
      // Q8 listen-mc about her routine
      mc('kt-ch1-l1-q8',
        'She dipped clothes in the cool water beside the rocks.',
        'Why did she sit by the river?',
        ['to fish', 'to swim', 'to wash clothes', 'to rest'],
        ['釣魚', '游泳', '洗衣服', '休息'],
        2,
        '把衣服浸水 → 洗衣服。'),
      // Q9 BEAT D — transition, special day
      nar('kt-ch1-l1-q9',
        'But one spring day, something different happened.',
        '但一個春天,有件不一樣的事發生了。'),
      // Q10 emoji-pick about season (safe, doesn't reveal hook)
      emoji('kt-ch1-l1-q10',
        'What season was it?',
        'What season was it?',
        ['🌸 spring', '☀️ summer', '🍂 autumn', '❄️ winter'],
        ['春天', '夏天', '秋天', '冬天'],
        0,
        '一個春天 = spring。'),
      // Q11 HOOK NARRATION — ends lesson on B3 資訊缺口
      // Inquiry: "那大紅色的東西是什麼?" (user 已預測是桃但未確認)
      nar('kt-ch1-l1-q11',
        'Far in the river, a big red shape was floating slowly toward her...',
        '河上遠處,一個大大紅紅的東西慢慢漂向她……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-2 (v6 emotional peak cut + B4+B3 hook 桃殼裂縫裡有聲音)
  // Per docs/research/chapter-ending-hook-design.md C 段 L2
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l2', chapter: 1, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '桃子裡有什麼聲音?',
    questions: [
      vocabIntro('kt-ch1-l2-q1', [
        ['桃子', 'peach'], ['桌子', 'table'],
        ['切', 'cut'], ['聲音', 'sound'],
      ]),
      nar('kt-ch1-l2-q2',
        'The old woman pulled the heavy peach from the river and carried it home.',
        '老婆婆把那個重重的桃子從河裡拿起來,帶回家。'),
      tf('kt-ch1-l2-q3',
        'She needed both hands to lift the fruit safely.',
        '她要用兩隻手才能把果子安全拿起。',
        'Was the peach a small thing?', 'N',
        '推理:兩手才舉得起 → 不可能是小東西 → 答 No'),
      nar('kt-ch1-l2-q4',
        'She and the old man placed it carefully on the wooden table.',
        '她和老公公小心把它放在木桌上。'),
      mc('kt-ch1-l2-q5',
        'They both stared at the giant fruit in front of them.',
        'How did they feel about the peach?',
        ['bored', 'amazed', 'scared', 'sleepy'],
        ['無聊', '驚奇', '害怕', '想睡'],
        1,
        '盯著看 = 驚奇。'),
      nar('kt-ch1-l2-q6',
        'The old man slowly picked up his sharp kitchen knife.',
        '老公公慢慢拿起他鋒利的菜刀。'),
      emoji('kt-ch1-l2-q7',
        'What did they plan to do with the peach?',
        'What did they plan to do?',
        ['🔪 cut and eat', '🎁 give it away', '🏃 hide it', '🚮 throw it out'],
        ['切來吃', '送人', '藏起來', '丟掉'],
        0,
        '拿刀 → 切開吃。'),
      nar('kt-ch1-l2-q8',
        'But before the blade touched the skin, the peach split by itself.',
        '但刀還沒碰到桃皮,桃子就自己裂開了。'),
      mc('kt-ch1-l2-q9',
        'The fruit cracked apart without any help from the old man.',
        'How did the peach open?',
        ['the old man cut it', 'it split by itself', 'a bird pecked it', 'wind blew it'],
        ['老公公切的', '自己裂開', '鳥啄開', '風吹開'],
        1,
        '自己裂開 → 不是被切的。'),
      gist('kt-ch1-l2-q10',
        'The two pieces of peach lay open on the table, just as the old couple watched.',
        'What is this scene mainly showing?',
        ['the peach opening by itself',
         'the old man preparing dinner',
         'the old woman cleaning the kitchen',
         'spring planting in the garden'],
        ['桃子自己裂開', '老公公做晚餐', '老婆婆掃廚房', '春天種菜'],
        0,
        '主旨 = 桃子自行裂開。'),
      // Q11 HOOK NARRATION (B4 期待加速 + B3 資訊缺口)
      nar('kt-ch1-l2-q11',
        'A soft cry came from inside the peach. They froze in their chairs...',
        '桃子裡傳出輕輕的哭聲。他們在椅子上動也不敢動……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-3 (v6 cut + B5+B2 hook 鬼來之前我要去)
  // Per docs/research/chapter-ending-hook-design.md C 段 L3
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l3', chapter: 1, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '鬼來之前我要去',
    questions: [
      vocabIntro('kt-ch1-l3-q1', [
        ['男孩', 'boy'], ['勇敢', 'brave'],
        ['聽見', 'hear'], ['妖怪', 'demon'],
      ]),
      nar('kt-ch1-l3-q2',
        'Inside the peach was a tiny baby boy, crying softly.',
        '桃子裡是一個小小的男嬰,輕輕地哭。'),
      tf('kt-ch1-l3-q3',
        'The old couple lifted the small baby out with shaking hands.',
        '老夫婦用顫抖的手把小嬰兒抱出來。',
        'Was there really a baby in the peach?', 'Y',
        '推理:雙手顫抖抱出來 → 真的有嬰兒 → 答 Yes'),
      nar('kt-ch1-l3-q4',
        'They named him Momotaro and raised him with great love.',
        '他們給他取名桃太郎,用滿滿的愛養他。'),
      mc('kt-ch1-l3-q5',
        'His name came from the fruit he was born in.',
        'Why was he called Momotaro?',
        ['family tradition', 'he came from a peach', 'mother\'s wish', 'village vote'],
        ['家族傳統', '他從桃子來', '媽媽願望', '村裡投票'],
        1,
        '從桃子來 → 桃男孩。'),
      nar('kt-ch1-l3-q6',
        'Year by year, Momotaro grew tall, strong, and very brave.',
        '一年一年,桃太郎長得又高又壯又勇敢。'),
      mc('kt-ch1-l3-q7',
        'By the time he was ten, he was already taller than most men.',
        'How did Momotaro grow?',
        ['weak and shy', 'fast and strong', 'slow and small', 'sick and tired'],
        ['弱又害羞', '快又強', '慢又小', '生病又累'],
        1,
        '十歲就比大人高 → 快又強。'),
      nar('kt-ch1-l3-q8',
        'One evening, bad news reached their quiet village.',
        '一個晚上,壞消息傳到他們安靜的村莊。'),
      emoji('kt-ch1-l3-q9',
        'What was the bad news?',
        'What was the bad news?',
        ['👹 demons attacking', '🌊 a great flood', '🦠 a sickness', '🔥 a fire'],
        ['妖怪攻擊', '大洪水', '疾病', '火災'],
        0,
        '壞消息 = 妖怪來攻擊。'),
      nar('kt-ch1-l3-q10',
        'Momotaro set down his chopsticks at the dinner table.',
        '桃太郎在飯桌上放下筷子。'),
      // Q11 HOOK (B5 道德兩難 + B2 情緒翻轉)
      nar('kt-ch1-l3-q11',
        '"Before the demons come for us," he said quietly, "I will go to them."',
        '「鬼還沒來找我們之前,」他輕輕地說,「我先去找他們。」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-4 (v6 cut + B4 hook 狗眼睛亮了)
  // Per docs/research/chapter-ending-hook-design.md C 段 L4
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l4', chapter: 1, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '路上遇狗 — 狗會跟嗎?',
    questions: [
      vocabIntro('kt-ch1-l4-q1', [
        ['糰子', 'dumpling'], ['路', 'road'],
        ['狗', 'dog'], ['分享', 'share'],
      ]),
      nar('kt-ch1-l4-q2',
        'His mother packed special millet dumplings for the long trip.',
        '媽媽為這趟長途旅行準備了特別的黍米糰子。'),
      mc('kt-ch1-l4-q3',
        'Each dumpling was tucked inside something soft and fresh from a tree.',
        'How did she pack the dumplings?',
        ['in a paper bag', 'in a green leaf', 'in a metal box', 'loose in pocket'],
        ['紙袋', '綠葉裡', '鐵盒', '口袋散著'],
        1,
        '推理:tree 上 soft 又 fresh → 綠葉。'),
      nar('kt-ch1-l4-q4',
        'Momotaro said goodbye to his parents and stepped onto the road.',
        '桃太郎跟父母道別,踏上路。'),
      tf('kt-ch1-l4-q5',
        'His mother\'s eyes were full of tears as he turned away.',
        '他轉身時,媽媽的眼睛滿是淚水。',
        'Was his mother happy about him leaving?', 'N',
        '推理:眼裡滿是淚 → 難過,不開心 → 答 No'),
      nar('kt-ch1-l4-q6',
        'He had not gone far when something moved on the path ahead.',
        '他走沒多遠,前面的路上有東西在動。'),
      emoji('kt-ch1-l4-q7',
        'What did Momotaro meet on the road?',
        'What did Momotaro meet?',
        ['🐕 a dog', '🐅 a tiger', '🦓 a zebra', '🐘 an elephant'],
        ['一隻狗', '一隻老虎', '一隻斑馬', '一隻大象'],
        0,
        '路上遇到 = 狗。'),
      nar('kt-ch1-l4-q8',
        'The dog looked at Momotaro, then at the small bag he carried.',
        '狗看著桃太郎,又看他帶的小袋子。'),
      mc('kt-ch1-l4-q9',
        'The dog sniffed the air, his nose pointed straight at the bag.',
        'What was the dog interested in?',
        ['the road', 'the dumplings', 'Momotaro\'s clothes', 'a passing bird'],
        ['路', '糰子', '桃太郎的衣服', '飛過的鳥'],
        1,
        '鼻子指向袋子 → 對糰子有興趣。'),
      nar('kt-ch1-l4-q10',
        'Momotaro reached into the bag and pulled out one dumpling.',
        '桃太郎伸手進袋子,拿出一個糰子。'),
      // Q11 HOOK (B4 期待加速)
      nar('kt-ch1-l4-q11',
        'The dog\'s eyes grew bright as he stepped slowly closer...',
        '狗的眼睛亮了起來,慢慢靠近……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-5 (v6 cut + B6+B1 hook 島上太安靜)
  // Per docs/research/chapter-ending-hook-design.md C 段 L5
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l5', chapter: 1, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '渡海起霧 — 島上太安靜',
    questions: [
      vocabIntro('kt-ch1-l5-q1', [
        ['猴子', 'monkey'], ['鳥', 'bird'],
        ['海', 'sea'], ['島', 'island'],
      ]),
      nar('kt-ch1-l5-q2',
        'A monkey jumped down from a tall tree and joined them too.',
        '一隻猴子從高高的樹上跳下來,也加入他們。'),
      mc('kt-ch1-l5-q3',
        'Like the dog before him, the monkey took one dumpling and bowed.',
        'How did the monkey join the team?',
        ['by force', 'by taking a dumpling', 'by following silently', 'by stealing food'],
        ['硬上', '拿一個糰子', '默默跟著', '偷食物'],
        1,
        '拿糰子加入 = by taking a dumpling。'),
      nar('kt-ch1-l5-q4',
        'A bright pheasant flew down from the sky and joined them too.',
        '一隻顏色亮亮的雉雞從天上飛下來,也加入他們。'),
      emoji('kt-ch1-l5-q5',
        'How many friends did Momotaro have now?',
        'How many friends?',
        ['1️⃣', '2️⃣', '3️⃣', '4️⃣'],
        ['一個', '兩個', '三個', '四個'],
        2,
        '狗 + 猴子 + 雉雞 = 三個。'),
      nar('kt-ch1-l5-q6',
        'The four of them crossed the wide sea by boat.',
        '他們四個搭船渡過寬廣的海。'),
      // v2.0.B.235 Track 1: B.234 桶 C lint-readability 抓出 grade 7.19 太難
      // (A2 紅線 grade 4). 拆成 sparse 兩短句, grade 降到 ~3, A2 友善.
      tf('kt-ch1-l5-q7',
        'Salt waves hit the boat. They hit for many hours.',
        '鹹海浪打到船上。打了好幾小時。',
        'Was the sea crossing very short?', 'N',
        '推理:好幾小時 → 不短 → 答 No'),
      nar('kt-ch1-l5-q8',
        'As they neared Demon Island, a thick mist rolled in around the boat.',
        '當他們接近鬼島,濃濃的霧捲到船邊。'),
      mc('kt-ch1-l5-q9',
        'Soon they could barely see each other through the white air.',
        'How was visibility?',
        ['clear and bright', 'very poor', 'sunny', 'sparkling'],
        ['清楚明亮', '非常差', '陽光普照', '閃亮'],
        1,
        '幾乎看不到對方 → 非常差。'),
      // v2.0.B.235 Track 1: B.234 桶 C lint-vocab 抓出 'whispered' B1+ (NGSL > 2000).
      // 改 'said quietly' (A2 NGSL 1000), 語意 100% 保留.
      nar('kt-ch1-l5-q10',
        'The monkey leaned over the boat\'s side and said quietly to Momotaro.',
        '猴子靠到船邊,輕聲對桃太郎說話。'),
      // Q11 HOOK (B6 預言種子 + B1 物理懸念)
      nar('kt-ch1-l5-q11',
        '"It\'s too quiet," he said. "Nothing is moving on the island..." Nobody spoke.',
        '「太安靜了,」他說。「島上什麼都沒在動……」沒人說話。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-6 (v6 cut + B2 hook 鬼王「我等你很久了」)
  // Per docs/research/chapter-ending-hook-design.md C 段 L6
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l6', chapter: 1, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '鬼王在等他 — 怎知名字?',
    questions: [
      vocabIntro('kt-ch1-l6-q1', [
        ['門', 'gate'], ['打', 'fight'],
        ['劍', 'sword'], ['微笑', 'smile'],
      ]),
      nar('kt-ch1-l6-q2',
        'They reached the demon gate. To their surprise, it was wide open.',
        '他們到了鬼門。讓他們意外的是,門大開著。'),
      tf('kt-ch1-l6-q3',
        'No demon guards stood at the doors that morning.',
        '那天早上門邊沒有妖怪守衛。',
        'Were the demons ready at the gate?', 'N',
        '推理:沒守衛 → 沒準備好 → 答 No'),
      nar('kt-ch1-l6-q4',
        'The pheasant flew over the wall, and the monkey climbed up after him.',
        '雉雞飛過牆,猴子跟著爬上去。'),
      mc('kt-ch1-l6-q5',
        'The dog ran in low and fast, biting at any leg that came close.',
        'How did the dog attack?',
        ['from above', 'by running fast and biting', 'by waiting', 'by hiding'],
        ['從上面', '快跑加咬', '等著', '躲起來'],
        1,
        '低低快跑咬 → 快跑加咬。'),
      nar('kt-ch1-l6-q6',
        'Momotaro rushed into the great hall, his sword shining bright.',
        '桃太郎衝進大廳,劍閃閃發亮。'),
      emoji('kt-ch1-l6-q7',
        'What did Momotaro hold in his hand?',
        'What did Momotaro hold?',
        ['⚔️ a sword', '🏹 a bow', '🥢 chopsticks', '✋ bare hands'],
        ['劍', '弓', '筷子', '空手'],
        0,
        '他拿著劍。'),
      nar('kt-ch1-l6-q8',
        'At the far end of the hall, on a tall throne, sat the demon king.',
        '大廳的盡頭,高高的寶座上,坐著鬼王。'),
      mc('kt-ch1-l6-q9',
        'His face did not show fear — only a slow, careful smile.',
        'How did the demon king look?',
        ['afraid and shaking', 'smiling and calm', 'angry and shouting', 'sleepy and bored'],
        ['害怕又發抖', '微笑又平靜', '生氣又大叫', '想睡又無聊'],
        1,
        '不害怕 + 緩緩微笑 → 微笑又平靜。'),
      nar('kt-ch1-l6-q10',
        'He looked straight at Momotaro and spoke very clearly.',
        '他直直看著桃太郎,話講得很清楚。'),
      // Q11 HOOK (B2 情緒翻轉)
      nar('kt-ch1-l6-q11',
        '"Momotaro," he said. "I have been waiting for you a long time."',
        '「桃太郎,」他說。「我等你很久了。」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch1-7 (v6 cut + B6 hook 口袋裡還剩一顆糰子,開放結局)
  // Per docs/research/chapter-ending-hook-design.md C 段 L7
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch1-l7', chapter: 1, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'momotaro',
    storyBeat: '凱旋 — 口袋裡還剩一顆糰子',
    questions: [
      vocabIntro('kt-ch1-l7-q1', [
        ['寶物', 'treasure'], ['金', 'gold'],
        ['村莊', 'village'], ['英雄', 'hero'],
      ]),
      nar('kt-ch1-l7-q2',
        'The fight was long, but the four friends never gave up.',
        '打鬥很久,但四個夥伴從沒放棄。'),
      mc('kt-ch1-l7-q3',
        'Side by side, they pushed the demons back into the corners.',
        'How did Momotaro and friends win?',
        ['alone and lucky', 'together as a team', 'by hiding', 'by running'],
        ['一人靠運氣', '團隊合作', '躲起來', '逃跑'],
        1,
        '並肩 → 團隊合作。'),
      nar('kt-ch1-l7-q4',
        'At last, the demons fell to their knees and asked to be spared.',
        '最後,妖怪跪下來,求饒命。'),
      tf('kt-ch1-l7-q5',
        'Their hands shook as they pointed to a secret room of treasures.',
        '他們的手發抖,指著一間藏寶物的密室。',
        'Did the demons give Momotaro something?', 'Y',
        '推理:指著密室 → 給寶物 → 答 Yes'),
      nar('kt-ch1-l7-q6',
        'They gave Momotaro gold, silver, and bright jewels.',
        '他們給桃太郎金、銀和亮亮的珠寶。'),
      emoji('kt-ch1-l7-q7',
        'What did the demons give?',
        'What did the demons give?',
        ['💰 gold and silver', '🍎 fruits', '📚 books', '🌸 flowers'],
        ['金和銀', '水果', '書', '花'],
        0,
        '金、銀、珠寶。'),
      nar('kt-ch1-l7-q8',
        'He sailed home with his friends and all the treasures.',
        '他帶著朋友和所有寶物乘船回家。'),
      mc('kt-ch1-l7-q9',
        'Every neighbor stepped outside to cheer as the boat arrived.',
        'Who welcomed Momotaro home?',
        ['only his parents', 'only the old man', 'the whole village', 'no one'],
        ['只有父母', '只有老公公', '整個村莊', '沒人'],
        2,
        '每個鄰居出來歡呼 → 整個村莊。'),
      nar('kt-ch1-l7-q10',
        'Tonight, the old couple hold him close, tears of joy in their eyes.',
        '今晚,老夫婦把他抱緊,眼中是喜悅的淚水。'),
      // Q11 HOOK (B6 預言種子 開放結局)
      nar('kt-ch1-l7-q11',
        'But Momotaro looks toward the horizon. In his pocket, one millet dumpling remains...',
        '但桃太郎望向遠方。他的口袋裡,還剩著一顆黍米糰子……'),
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
