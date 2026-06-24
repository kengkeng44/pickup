#!/usr/bin/env node
/**
 * v2.0.B.290+ — Ch25 愚公移山 (Yu Gong Moves the Mountains, 列子《湯問》
 * 春秋戰國 classical Chinese parable, public domain >2000 years).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern
 * (mirror Ch15 Emperor's New Clothes ship B.262+ / Ch21 Anansi B.270+).
 * Source canon: docs/canon/yugong.md
 *   (列子《湯問》7-beat, A2 self-paraphrased).
 * Cuts: docs/canon/yugong-cuts.md
 *   (B6/B3/B5/B4/B1/B2/B6-open).
 *
 * IP 鐵律:
 *   - Source: 列子《湯問》(c. 春秋戰國, Warring States, 5th–4th cent. BCE).
 *     >2000 years old. Public domain worldwide.
 *   - A2 自創句式, 不引特定譯本 / 繪本 / 動畫延伸段落.
 *   - 配 Ch20 蘿蔔大冒險 同 cumulative-family genre (家庭成員一個個加入).
 *
 * Structure per lesson (11 Q, mirror Ch15/Ch21 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  listen-mc paraphrase (X3: paraphrase, not verbatim)
 *   q4  listen-tf inference (atmosphere / action / contrast)
 *   q5  narration (BEAT B)
 *   q6  listen-mc paraphrase
 *   q7  narration (BEAT C)
 *   q8  listen-mc paraphrase
 *   q9  narration (BEAT D)
 *   q10 emoji-pick / narration
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim)
 *   R3 A2 vocab only:
 *      'die' / 'death' → 'after you are gone' / 'will not be here'
 *      'foolish old man' → 'old man called Yu Gong'
 *      'sky gods' / 'heavenly emperor' → 'kind giants from above'
 *      'descendants' → 'sons and grandsons'
 *      'dig up' → 'carry away' / 'take away'
 *      '子子孫孫無窮匱' → 'our family will go on forever and ever'
 *   R4 listen-tf inference (atmosphere / action / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 死亡: 路人說 'after you are gone' 不 'after you die'
 *   - 0 衝突: 鄰居 / 路人只 'laughed and asked' 不嘲弄 / 打架
 *   - 0 暴力: 山被 'carried away' 不 'destroyed'
 *   - 堅持主題: 一筐一筐, 日復一日, 子子孫孫繼續
 *   - 家庭主題: 三代同心 (Yu Gong + sons + grandsons)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch25.json');

// ─── Helpers (mirror Ch15/Ch21 範本) ──────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch25', 'yugong'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch25', 'yugong', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch25', 'yugong'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch25', 'yugong', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch25', 'yugong', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch25-1: Two big mountains block Yu Gong's door (B6 預言種子)
  // Hook: 兩座大山每天擋路 → 他會做什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch25-l1', chapter: 25, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'yugong',
    storyBeat: '愚公門口兩座大山 — 出門很不方便',
    questions: [
      vocabIntro('kt-ch25-l1-q1', [
        ['老人', 'old man'],
        ['家', 'home'],
        ['山', 'mountain'],
        ['路', 'road'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch25-l1-q2',
        'Long ago, there lived an old man called Yu Gong.',
        '很久以前,有一位老人叫做愚公。'),
      // Q3 mc paraphrase about home location
      mc('kt-ch25-l1-q3',
        'His home stood right between two very big mountains.',
        'Where did Yu Gong live?',
        ['by a quiet blue sea', 'with tall walls of rock on each side', 'on a small green island', 'inside a busy town'],
        ['安靜的藍色海邊', '兩邊都有高大岩壁的地方', '一座小綠島上', '熱鬧的城裡'],
        1,
        '推理: between two very big mountains → 兩邊都有高大岩壁 (paraphrase)。'),
      // Q4 TF inference (action — mountains made trips long)
      tf('kt-ch25-l1-q4',
        'The mountains made every trip out of his house very long.',
        '兩座山讓他每次出門都要走很遠。',
        'Was it easy for Yu Gong to leave his home?', 'N',
        '推理: every trip very long → 不容易 → 答 No'),
      // Q5 BEAT B — daily walk
      nar('kt-ch25-l1-q5',
        'Every day Yu Gong had to walk a long way around them.',
        '愚公每天都要繞著山走很長一段路。'),
      // Q6 mc paraphrase about daily route
      mc('kt-ch25-l1-q6',
        'He could not go straight to town. He had to take the long path.',
        'Why did Yu Gong take a long path each day?',
        ['he loved long walks', 'two mountains blocked the short way', 'he was looking for a friend', 'he was afraid of cars'],
        ['他喜歡走遠路', '兩座山擋住短路線', '他在找朋友', '他怕車子'],
        1,
        '推理: could not go straight + had to take long path → 山擋住短路線 (paraphrase)。'),
      // Q7 BEAT C — feeling about it
      nar('kt-ch25-l1-q7',
        'His legs grew tired from the long walk again and again.',
        '一次又一次走遠路,他的腳越來越累。'),
      // Q8 mc paraphrase about state
      mc('kt-ch25-l1-q8',
        'Yu Gong thought about this problem for many, many days.',
        'How did Yu Gong feel about the long walk?',
        ['it made him very happy', 'he wanted to find an answer', 'it slipped his mind right away', 'a new house would be best'],
        ['這讓他很開心', '他想要找出解決辦法', '一下就忘了', '蓋新家最好'],
        1,
        '推理: thought about this for many days → 在想辦法 (paraphrase)。'),
      // Q9 BEAT D — he gets an idea
      nar('kt-ch25-l1-q9',
        'One evening, an idea came to him.',
        '一個傍晚,他想到了一個辦法。'),
      // Q10 emoji — his feeling about the idea
      emoji('kt-ch25-l1-q10',
        'How did Yu Gong feel about his new idea?',
        'How did he feel?',
        ['😴 sleepy', '🤔 ready to try', '😡 angry', '😱 scared'],
        ['想睡', '準備動手', '生氣', '害怕'],
        1,
        '想到辦法 + 一個傍晚 → 準備動手 (paraphrase)。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch25-l1-q11',
        'He stood up tall and walked back to his family...',
        '他站直身子,走回去找家人……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch25-2: Yu Gong shares plan, neighbor laughs (B3 資訊缺口)
  // Hook: 鄰居笑 → 真的可能嗎? 他會怎麼說服家人?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch25-l2', chapter: 25, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'yugong',
    storyBeat: '愚公決定移山 — 鄰居問: 這可能嗎?',
    questions: [
      vocabIntro('kt-ch25-l2-q1', [
        ['家人', 'family'],
        ['搬走', 'move away'],
        ['鄰居', 'neighbor'],
        ['可能', 'possible'],
      ]),
      // Q2 BEAT A — gather family
      nar('kt-ch25-l2-q2',
        'That evening, Yu Gong sat with his family by the door.',
        '那個傍晚,愚公和家人坐在門口。'),
      // Q3 mc paraphrase about who is there
      mc('kt-ch25-l2-q3',
        'His sons and grandsons all came close to hear him.',
        'Who came to hear Yu Gong speak?',
        ['only one young son', 'a kind town doctor', 'the whole big and small family', 'a quiet old neighbor'],
        ['只有一個小兒子', '一位好心鎮上醫生', '全家大大小小', '一位安靜的老鄰居'],
        2,
        '推理: sons and grandsons all came → 全家大大小小 (paraphrase)。'),
      // Q4 TF inference (atmosphere — quiet attentive family)
      tf('kt-ch25-l2-q4',
        'The whole family kept very quiet and looked at him.',
        '全家人都很安靜地看著他。',
        'Was the family ready to listen to Yu Gong?', 'Y',
        '推理: 安靜 + 看著他 → 準備聽 → 答 Yes'),
      // Q5 BEAT B — Yu Gong shares plan
      nar('kt-ch25-l2-q5',
        '"I want to move the mountains away from our home," he said.',
        '「我想把山從我們家門口搬走,」他說。'),
      // Q6 mc paraphrase about plan
      mc('kt-ch25-l2-q6',
        'He wanted to take the two big mountains far from his door.',
        'What was Yu Gong\'s big plan?',
        ['build a tall new house', 'take the mountains far away', 'plant ten small trees', 'walk to a new town'],
        ['蓋一棟高新房子', '把山搬到很遠的地方', '種十棵小樹', '走到新的鎮上'],
        1,
        '推理: take mountains far from door → 把山搬到很遠的地方 (paraphrase)。'),
      // Q7 BEAT C — neighbor overhears
      nar('kt-ch25-l2-q7',
        'A neighbor from next door heard every word.',
        '隔壁的鄰居把每一句話都聽到了。'),
      // Q8 mc paraphrase about neighbor
      mc('kt-ch25-l2-q8',
        'The neighbor laughed and asked, "Is that even possible?"',
        'What did the neighbor think of the plan?',
        ['it sounded very easy', 'it would never really happen', 'a great chance to help out', 'time to buy a new house'],
        ['聽起來很簡單', '永遠不會真的發生', '幫忙的好機會', '該買新房子了'],
        1,
        '推理: laughed + 問可能嗎 → 永遠不會真的發生 (paraphrase)。'),
      // Q9 BEAT D — Yu Gong's gentle answer
      nar('kt-ch25-l2-q9',
        'Yu Gong smiled and said, "Day by day, we can do it."',
        '愚公笑著說:「一天又一天,我們做得到。」'),
      // Q10 emoji — Yu Gong's mood
      emoji('kt-ch25-l2-q10',
        'How did Yu Gong feel when he answered the neighbor?',
        'How did he feel?',
        ['😄 calm and sure', '😢 sad', '😡 angry', '😴 sleepy'],
        ['平靜又確定', '難過', '生氣', '想睡'],
        0,
        '笑著 + 「我們做得到」 → 平靜又確定。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch25-l2-q11',
        'The neighbor walked home shaking his head. But the family stayed up to talk...',
        '鄰居搖搖頭走回家。但家人留下來繼續商量……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch25-3: Sons and grandsons help (B5 道德兩難)
  // Hook: 大家來幫忙 → 該怎麼運? 一筐能搬多少?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch25-l3', chapter: 25, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'yugong',
    storyBeat: '兒子和孫子都來幫 — 該怎麼運?',
    questions: [
      vocabIntro('kt-ch25-l3-q1', [
        ['兒子', 'son'],
        ['孫子', 'grandson'],
        ['籃子', 'basket'],
        ['石頭', 'stone'],
      ]),
      // Q2 BEAT A
      nar('kt-ch25-l3-q2',
        'The next morning, his sons came out with big baskets.',
        '第二天早上,兒子們拿著大籃子出來。'),
      // Q3 mc paraphrase about grandsons
      mc('kt-ch25-l3-q3',
        'His grandsons came too, with smaller baskets in small hands.',
        'Who else came to help that morning?',
        ['only the old neighbor', 'the youngest kids of the family', 'a tall passing stranger', 'three big tall horses'],
        ['只有老鄰居', '家裡最小的孩子們', '高大的陌生人', '三匹高大的馬'],
        1,
        '推理: grandsons + small hands → 家裡最小的孩子們 (paraphrase)。'),
      // Q4 TF inference (atmosphere — family working together)
      tf('kt-ch25-l3-q4',
        'Three sizes of baskets stood by the door in a neat row.',
        '三種大小的籃子整齊地排在門口。',
        'Were three generations working together?', 'Y',
        '推理: 三種大小 → 大人 + 大孩子 + 小孩子 → 三代一起 → 答 Yes'),
      // Q5 BEAT B — they ask how
      nar('kt-ch25-l3-q5',
        'They asked, "How should we carry all this stone?"',
        '他們問:「我們該怎麼運這麼多石頭?」'),
      // Q6 mc paraphrase about Yu Gong's plan
      mc('kt-ch25-l3-q6',
        'Yu Gong said, "Take it to the river, one basket at a time."',
        'Where did Yu Gong want them to take the stone?',
        ['into the dark forest', 'down to the water, bit by bit', 'up onto the roof', 'back into the cave'],
        ['進到暗森林裡', '到水邊,一點一點地搬', '上到屋頂', '回到山洞裡'],
        1,
        '推理: river + one basket at a time → 到水邊一點一點搬 (paraphrase)。'),
      // Q7 BEAT C — they start
      nar('kt-ch25-l3-q7',
        'The whole family picked up the baskets and began to work.',
        '全家人拿起籃子,開始幹活。'),
      // Q8 mc paraphrase about teamwork
      mc('kt-ch25-l3-q8',
        'Each person carried what they could, from the biggest to the smallest.',
        'How did each person help?',
        ['only the strongest worked', 'everyone did their fair share', 'they took turns to sleep', 'they sat down to wait'],
        ['只有最強壯的工作', '每個人各盡其力', '他們輪流去睡', '他們坐下來等'],
        1,
        '推理: each carried what they could → 每個人各盡其力 (paraphrase)。'),
      // Q9 BEAT D — first trip
      nar('kt-ch25-l3-q9',
        'They walked to the river and back. The sun was high in the sky.',
        '他們走到河邊再走回來。太陽已經高高掛著。'),
      // Q10 emoji — family feeling
      emoji('kt-ch25-l3-q10',
        'How did the family feel working together?',
        'How did they feel?',
        ['😊 close as a team', '😴 too sleepy', '😡 angry at each other', '😱 scared of work'],
        ['像團隊一樣親近', '太累想睡', '彼此生氣', '怕工作'],
        0,
        '三代一起 + 各盡其力 → 像團隊一樣親近。'),
      // Q11 HOOK — B5 道德兩難
      nar('kt-ch25-l3-q11',
        'But the mountains still looked just as tall as before...',
        '但山看起來還是跟以前一樣高……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch25-4: Day by day, a man laughs (B4 期待加速)
  // Hook: 路人嘲笑 → 愚公會放棄? 還是繼續?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch25-l4', chapter: 25, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'yugong',
    storyBeat: '一筐土一筐土運走 — 路人笑他',
    questions: [
      vocabIntro('kt-ch25-l4-q1', [
        ['泥土', 'dirt'],
        ['一天', 'day'],
        ['河', 'river'],
        ['笑', 'laugh'],
      ]),
      // Q2 BEAT A
      nar('kt-ch25-l4-q2',
        'Every day they took one basket of stone and dirt away.',
        '每天他們搬走一籃石頭和泥土。'),
      // Q3 mc paraphrase about pace
      mc('kt-ch25-l4-q3',
        'The work was slow, but the family never stopped.',
        'How fast did the work go each day?',
        ['fast and very easy', 'slow but steady', 'finished by lunch', 'done in one week'],
        ['又快又容易', '慢但持續', '中午前就好', '一週就做完'],
        1,
        '推理: slow + never stopped → 慢但持續 (paraphrase)。'),
      // Q4 TF inference (atmosphere — long walk)
      tf('kt-ch25-l4-q4',
        'The walk to the river was very long under the bright sun.',
        '到河邊的路在大太陽下走起來很遠。',
        'Was the daily trip tiring for the family?', 'Y',
        '推理: 很遠 + 大太陽下 → 累 → 答 Yes'),
      // Q5 BEAT B — a man stops
      nar('kt-ch25-l4-q5',
        'A man passing by stopped to watch them.',
        '一個路過的男人停下來看他們。'),
      // Q6 mc paraphrase about his reaction
      mc('kt-ch25-l4-q6',
        'He laughed and said, "You are old. You cannot finish this."',
        'What did the man passing by think?',
        ['lend a hand right away', 'this job was way too big', 'the dirt was worth buying', 'the lost dog must be near'],
        ['馬上想幫忙', '這工作太大了', '泥土值得買', '走失的狗一定在附近'],
        1,
        '推理: laughed + cannot finish → 覺得這工作太大 (paraphrase)。'),
      // Q7 BEAT C — family keeps going
      nar('kt-ch25-l4-q7',
        'Yu Gong heard him but did not stop walking.',
        '愚公聽見他的話,但沒有停下腳步。'),
      // Q8 mc paraphrase about Yu Gong's choice
      mc('kt-ch25-l4-q8',
        'He kept his basket up and kept his eyes on the path.',
        'What did Yu Gong choose to do?',
        ['stop and go home to rest', 'keep walking with his basket', 'shout back at the man', 'sit down and cry'],
        ['停下來回家休息', '帶著籃子繼續走', '對著男人大叫', '坐下來哭'],
        1,
        '推理: kept basket up + eyes on path → 繼續走 (paraphrase)。'),
      // Q9 BEAT D — sons follow lead
      nar('kt-ch25-l4-q9',
        'His sons and grandsons walked right behind him.',
        '兒子們和孫子們就走在他後面。'),
      // Q10 emoji — family's resolve
      emoji('kt-ch25-l4-q10',
        'How did the family answer the man\'s laughing words?',
        'What did the family do?',
        ['🚶 kept walking together', '💤 went home to sleep', '😡 fought with the man', '🎵 sang a happy song'],
        ['一起繼續走', '回家睡覺', '跟男人吵架', '唱起快樂的歌'],
        0,
        '兒子孫子跟在後面繼續走 → 一起繼續走。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch25-l4-q11',
        'But the man had one more question, and this one was harder...',
        '但那個男人還有一個問題,而且更難回答……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch25-5: Hardest question (B1 物理懸念)
  // Hook: 他抬頭看小孩 → 他要怎麼回答?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch25-l5', chapter: 25, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'yugong',
    storyBeat: '路人說: 你死後誰繼續? — 愚公的回答',
    questions: [
      vocabIntro('kt-ch25-l5-q1', [
        ['以後', 'after'],
        ['繼續', 'keep going'],
        ['站直', 'stand up'],
        ['看著', 'look at'],
      ]),
      // Q2 BEAT A
      nar('kt-ch25-l5-q2',
        'The man asked, "After you are gone, who will keep going?"',
        '男人問:「等你以後不在了,誰會繼續做?」'),
      // Q3 mc paraphrase about question
      mc('kt-ch25-l5-q3',
        'The man wanted to know about the days after Yu Gong was old.',
        'What was the man\'s hard question about?',
        ['how much each basket would cost', 'who would carry on much later', 'what color each stone really was', 'which path led into the town'],
        ['每個籃子要花多少錢', '以後誰會繼續做下去', '每顆石頭真正是什麼顏色', '哪條路通往鎮上'],
        1,
        '推理: after Yu Gong is old → 以後誰會繼續 (paraphrase)。'),
      // Q4 TF inference (action — Yu Gong takes time to think)
      tf('kt-ch25-l5-q4',
        'Yu Gong put down his basket and stood up tall.',
        '愚公把籃子放下,站直了身子。',
        'Was Yu Gong ready to give a careful answer?', 'Y',
        '推理: 放下籃子 + 站直 → 準備好好回答 → 答 Yes'),
      // Q5 BEAT B — he looks at children
      nar('kt-ch25-l5-q5',
        'He looked at his sons and his small grandsons.',
        '他看著兒子們和小孫子們。'),
      // Q6 mc paraphrase about who he sees
      mc('kt-ch25-l5-q6',
        'He saw three sizes of his family standing right there.',
        'Who did Yu Gong see when he looked around?',
        ['only his oldest son', 'people from old, young, and youngest', 'a row of stranger faces', 'a line of farm animals'],
        ['只有他大兒子', '老中少都有', '一排陌生臉', '一排農場動物'],
        1,
        '推理: three sizes of family → 老中少 (paraphrase, 三代)。'),
      // Q7 BEAT C — quiet pause
      nar('kt-ch25-l5-q7',
        'The whole field grew quiet. Even the wind seemed to wait.',
        '整片田都安靜下來。連風好像都在等。'),
      // Q8 mc paraphrase about atmosphere
      mc('kt-ch25-l5-q8',
        'Everyone leaned in. No one wanted to miss what came next.',
        'How did the people around feel right then?',
        ['about to walk away', 'all ears for his reply', 'sleepy and yawning', 'hungry for dinner'],
        ['準備走開', '專心聽他的回答', '想睡又打呵欠', '餓著想吃飯'],
        1,
        '推理: leaned in + did not want to miss → 專心聽他的回答 (paraphrase)。'),
      // Q9 BEAT D — he draws breath
      nar('kt-ch25-l5-q9',
        'Yu Gong took a long, soft breath.',
        '愚公深深地、輕輕地吸了一口氣。'),
      // Q10 emoji — atmosphere
      emoji('kt-ch25-l5-q10',
        'What was the field like as Yu Gong got ready to speak?',
        'How was the field?',
        ['🔇 still and waiting', '🎉 full of cheers', '🌧️ loud with rain', '🚗 busy with cars'],
        ['靜靜在等', '充滿歡呼', '吵雜的雨', '車子忙碌'],
        0,
        '安靜 + 連風都在等 → 靜靜在等。'),
      // Q11 HOOK — B1 物理懸念
      nar('kt-ch25-l5-q11',
        'He smiled and gave a quiet, kind answer...',
        '他微笑著,給出一個溫柔安靜的回答……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch25-6: Forever and ever (B2 情緒翻轉)
  // Hook: 子子孫孫無窮匱 → 大家會繼續嗎? 天上有人看嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch25-l6', chapter: 25, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'yugong',
    storyBeat: '我有兒子 兒子有孫子 子子孫孫無窮匱',
    questions: [
      vocabIntro('kt-ch25-l6-q1', [
        ['永遠', 'forever'],
        ['長大', 'grow'],
        ['搬走', 'move away'],
        ['一起', 'together'],
      ]),
      // Q2 BEAT A
      nar('kt-ch25-l6-q2',
        '"I have sons. My sons have sons too."',
        '「我有兒子。我的兒子也會有兒子。」'),
      // Q3 mc paraphrase about chain
      mc('kt-ch25-l6-q3',
        '"My grandsons will have sons too, and on and on."',
        'What did Yu Gong mean about his family?',
        ['only one son in each home', 'family that keeps going on', 'family that moves to new towns', 'family that wants new shoes'],
        ['每家只有一個兒子', '家會一直延續下去', '家會搬到新鎮', '家會想要新鞋'],
        1,
        '推理: sons have sons + on and on → 家會一直延續 (paraphrase)。'),
      // Q4 TF inference (action — assertion of continuity)
      tf('kt-ch25-l6-q4',
        '"Our family will go on forever and ever," he said softly.',
        '「我們的家會一直延續下去,」他輕聲說。',
        'Did Yu Gong believe his family would continue?', 'Y',
        '推理: forever and ever → 一直延續 → 答 Yes'),
      // Q5 BEAT B — the contrast point
      nar('kt-ch25-l6-q5',
        '"But the mountains cannot grow any bigger."',
        '「可是山不會再變大了。」'),
      // Q6 mc paraphrase about contrast
      mc('kt-ch25-l6-q6',
        'The mountains stay the same size, but family keeps growing.',
        'What was the big difference Yu Gong saw?',
        ['family grows, mountains do not', 'mountains grow, family does not', 'both grow at the same time', 'both stay just the same'],
        ['家會長大,山不會', '山會長大,家不會', '兩個都會一起長大', '兩個都不變'],
        0,
        '推理: 山不變 + 家延續 → 家會長大,山不會 (paraphrase)。'),
      // Q7 BEAT C — the conclusion
      nar('kt-ch25-l6-q7',
        '"Day by day, we will move them away."',
        '「一天又一天,我們會把山搬走。」'),
      // Q8 mc paraphrase about confidence
      mc('kt-ch25-l6-q8',
        'He spoke without anger and without any rush at all.',
        'How did Yu Gong sound when he said this?',
        ['shouting and loud', 'calm and sure inside', 'quick and worried', 'sad and tired'],
        ['大聲又吵', '平靜又自信', '又快又擔心', '難過又累'],
        1,
        '推理: 沒有生氣 + 沒有急 → 平靜又自信 (paraphrase)。'),
      // Q9 BEAT D — the laughing man
      nar('kt-ch25-l6-q9',
        'The man passing by had no answer. He walked away in silence.',
        '那個路過的男人答不出話。他默默走開了。'),
      // Q10 emoji — emotional turn
      emoji('kt-ch25-l6-q10',
        'How did the family feel after Yu Gong\'s answer?',
        'How did the family feel?',
        ['💪 lifted and proud', '😢 sad and lost', '😡 angry at him', '😴 wanting to sleep'],
        ['振奮又驕傲', '難過又迷惘', '對他生氣', '想睡'],
        0,
        '子子孫孫永遠的話 → 家人振奮又驕傲。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch25-l6-q11',
        'Far above, kind giants from the sky leaned forward to watch...',
        '在很高很高的天上,溫柔的巨人探身往下看……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch25-7: Kind giants carry mountains (B6 open)
  // Hook: 為什麼天神幫忙? 堅持的人會被看見嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch25-l7', chapter: 25, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'yugong',
    storyBeat: '天神感動派人搬走山 — 學到堅持',
    questions: [
      vocabIntro('kt-ch25-l7-q1', [
        ['天空', 'sky'],
        ['巨人', 'giant'],
        ['看見', 'watch'],
        ['心', 'heart'],
      ]),
      // Q2 BEAT A
      nar('kt-ch25-l7-q2',
        'Far above, kind giants from the sky were watching.',
        '在很高的天上,溫柔的巨人在看著。'),
      // Q3 mc paraphrase about who watched
      mc('kt-ch25-l7-q3',
        'These were not regular people. They were kind giants from above.',
        'Who was watching the family from far above?',
        ['a flock of small birds', 'kind giants from the sky', 'busy children at school', 'the neighbor next door'],
        ['一群小鳥', '天空的溫柔巨人', '學校忙碌的小孩', '隔壁鄰居'],
        1,
        '推理: kind giants from above → 天空的溫柔巨人 (paraphrase)。'),
      // Q4 TF inference (atmosphere — quiet observation)
      tf('kt-ch25-l7-q4',
        'They watched the small family for many quiet days.',
        '他們安靜地看著這個小小的家好幾天。',
        'Did the giants take time to watch before doing anything?', 'Y',
        '推理: 好幾天 + 安靜地看 → 有時間觀察 → 答 Yes'),
      // Q5 BEAT B — what they saw
      nar('kt-ch25-l7-q5',
        'They saw the family work together with strong hearts.',
        '他們看見全家人用堅強的心一起工作。'),
      // Q6 mc paraphrase about what moved them
      mc('kt-ch25-l7-q6',
        'The giants felt warm inside when they saw such teamwork.',
        'What touched the giants\' hearts most?',
        ['the size of the baskets', 'how the family worked together', 'how loud everyone shouted', 'how new the shoes looked'],
        ['籃子的大小', '家人一起工作的樣子', '大家叫得多大聲', '鞋子有多新'],
        1,
        '推理: warm inside + teamwork → 一起工作的樣子 (paraphrase)。'),
      // Q7 BEAT C — they act
      nar('kt-ch25-l7-q7',
        'They came down softly and very, very slowly.',
        '他們輕輕地、慢慢地降到下面。'),
      // Q8 mc paraphrase about action
      mc('kt-ch25-l7-q8',
        'With gentle hands, they lifted the two big peaks far off.',
        'What did the kind giants do for the family?',
        ['gave them new shoes', 'took the high rocks somewhere else', 'taught them new songs', 'brought them more dirt'],
        ['送他們新鞋', '把高高的岩石搬到別的地方', '教他們新歌', '送他們更多泥土'],
        1,
        '推理: lifted two peaks far off → 把高高的岩石搬到別的地方 (paraphrase)。'),
      // Q9 BEAT D — the result
      nar('kt-ch25-l7-q9',
        'From that day, the family had a clear road out to the world.',
        '從那天起,這一家有了一條通往外面世界的開闊大路。'),
      // Q10 emoji — what readers learn
      emoji('kt-ch25-l7-q10',
        'What is the big lesson from Yu Gong\'s family?',
        'What did they learn?',
        ['💪 keep going, day by day', '🛒 buy bigger baskets', '🛌 rest is most important', '🏃 run away fast'],
        ['一天又一天堅持下去', '買更大的籃子', '休息最重要', '快點跑開'],
        0,
        '一筐又一筐 + 子子孫孫繼續 → 堅持的力量。'),
      // Q11 HOOK — B6 open (the lesson)
      nar('kt-ch25-l7-q11',
        'And every child who heard the story walked home holding hands with grown-ups...',
        '每個聽完故事的小孩,都牽著大人的手走回家……'),
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
