#!/usr/bin/env node
/**
 * v2.0.B.240+ — Ch14 浦島太郎 (Urashima Taro, Japanese folk public domain).
 *
 * URL pipeline ship via tools/pickup-new-story.cjs B.234 pattern.
 * Source canon: docs/canon/urashima.md (7-beat arc).
 * Cuts: docs/canon/urashima-cuts.md (B6/B3/B4/B5/B6/B2/B6-open).
 *
 * Pairing: Ch14 浦島太郎 (Japanese) <=> Ch1 桃太郎 (Japanese)
 *   = 兩個日本民間口傳, 公有領域. Ch1 energy + bravery, Ch14 quiet + bittersweet wisdom.
 *
 * Public domain compliance:
 *   - Source: Japanese oral folklore (no single author, public domain by tradition).
 *   - A2 自創句式, do NOT quote any specific translation (Lafcadio Hearn / Iwaya etc).
 *   - 主角名: 'Urashima Taro' (公有領域)
 *   - 公主名: 'Otohime' (only in L3 first intro; after that = 'the princess')
 *   - 龍宮 = 'sea palace', 龍王 = 'sea king' (A2 friendly compound nouns)
 *
 * Structure per lesson (11 Q, mirror Ch1/Ch8/Ch9 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration / listen-tf inference
 *   q4  listen-tf inference / listen-mc paraphrase
 *   q5  narration (routine)
 *   q6  listen-mc (paraphrased detail) / narration
 *   q7  narration (transition) / emoji-pick
 *   q8  listen-mc (paraphrased detail) / narration
 *   q9  narration (BEAT D)
 *   q10 emoji-pick / narration
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim word-for-word)
 *   R3 A2 vocab only (no enchanted/shimmered/glistened/vanished)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cultural / no-death rules (per docs/canon/urashima.md + user prompt):
 *   - 浦島 does NOT die. He becomes 'a very old man with a long beard'.
 *   - Mother is 'gone' / 'in old stories', never 'dead' / 'died'.
 *   - 老頭 → 'a very old man with a long beard' (per user explicit example)
 *   - 龍宮 = 'sea palace', 龍王 = 'sea king'
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch14.json');

// ─── Helpers (mirror Ch8/Ch9 範本, tag swap to ch14) ─────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch14', 'urashima'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch14', 'urashima', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch14', 'urashima'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch14', 'urashima', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch14', 'urashima', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch14-1: Urashima saves a turtle (B6 預言種子 — 烏龜會謝謝他嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch14-l1', chapter: 14, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'urashima',
    storyBeat: '浦島救烏龜 — 烏龜會謝謝他嗎?',
    questions: [
      vocabIntro('kt-ch14-l1-q1', [
        ['漁夫', 'fisherman'],
        ['沙灘', 'beach'],
        ['烏龜', 'turtle'],
        ['好心', 'kind'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch14-l1-q2',
        'Long ago, a kind young fisherman lived by the sea.',
        '很久以前,一個好心的年輕漁夫住在海邊。'),
      // Q3 BEAT A deepen
      nar('kt-ch14-l1-q3',
        'His name was Urashima Taro.',
        '他的名字叫浦島太郎。'),
      // Q4 TF inference (atmosphere — peaceful village life)
      tf('kt-ch14-l1-q4',
        'Every day he rowed his small boat out to fish.',
        '他每天划他的小船出去捕魚。',
        'Did Urashima do hard work every day?', 'Y',
        '推理: 每天划船捕魚 → 很辛苦 → 答 Yes'),
      // Q5 BEAT B — walks home, sees boys
      nar('kt-ch14-l1-q5',
        'One afternoon, he saw three boys near the rocks.',
        '一個下午,他看見三個男孩在石頭邊。'),
      // Q6 listen-mc paraphrase about the boys (X3 anti-verbatim)
      mc('kt-ch14-l1-q6',
        'They were poking a small turtle with sticks.',
        'What were the boys doing?',
        ['feeding it', 'hurting it', 'washing it', 'singing to it'],
        ['餵牠', '欺負牠', '洗牠', '唱歌給牠聽'],
        1,
        '推理: 用棍子戳 → 欺負 (paraphrase)。'),
      // Q7 BEAT C — Urashima acts
      nar('kt-ch14-l1-q7',
        'Urashima ran to the boys and gave them some coins.',
        '浦島跑到男孩那邊,給他們一些錢幣。'),
      // Q8 listen-mc paraphrase about why (X2 fix: vary option starts)
      mc('kt-ch14-l1-q8',
        'He used his own money to set the turtle free.',
        'Why did he give them coins?',
        ['for food', 'to save the turtle', 'as a game prize', 'just for fun'],
        ['買吃的', '救烏龜', '當遊戲獎', '只是好玩'],
        1,
        '推理: 給錢 → 換烏龜的自由 → 救烏龜。'),
      // Q9 BEAT D — gentle release
      nar('kt-ch14-l1-q9',
        'He took the turtle to the sea, slow and careful.',
        '他帶著烏龜走向海,慢慢的、小心的。'),
      // Q10 emoji — how did he set it down
      emoji('kt-ch14-l1-q10',
        'How did Urashima set the turtle down?',
        'How did he set it down?',
        ['🐢 gently on the sand', '🪨 onto a sharp rock', '🌊 thrown far away', '🔥 by a hot fire'],
        ['輕輕放在沙上', '丟到尖石上', '丟很遠', '丟到火邊'],
        0,
        '慢慢、小心 → 輕輕放在沙上。'),
      // Q11 HOOK — B6 預言種子 (turtle looks at him with quiet eyes)
      nar('kt-ch14-l1-q11',
        'The turtle looks up at him with quiet, dark eyes...',
        '烏龜抬頭看他,眼神安靜又深邃……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch14-2: Turtle returns, dive to sea (B3 資訊缺口 — 海底是什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch14-l2', chapter: 14, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'urashima',
    storyBeat: '烏龜帶他下海 — 海底是什麼?',
    questions: [
      vocabIntro('kt-ch14-l2-q1', [
        ['船', 'boat'],
        ['爬上', 'climb'],
        ['潛', 'dive'],
        ['深', 'deep'],
      ]),
      // Q2 BEAT A — Urashima fishing again
      nar('kt-ch14-l2-q2',
        'A few days later, Urashima sat in his small boat.',
        '幾天後,浦島坐在他的小船上。'),
      // Q3 mc paraphrase about calm sea
      mc('kt-ch14-l2-q3',
        'The sea was very still, with no waves at all.',
        'How was the sea that day?',
        ['rough and loud', 'calm and quiet', 'cold and dark', 'full of ships'],
        ['粗又吵', '平靜', '冷又暗', '滿是船'],
        1,
        '推理: still + no waves → calm and quiet。'),
      // Q4 BEAT B — big turtle appears
      nar('kt-ch14-l2-q4',
        'A big turtle swam up beside the boat.',
        '一隻大烏龜游到船邊。'),
      // Q5 TF inference (action — turtle speaks = magic)
      tf('kt-ch14-l2-q5',
        'It said, "Thank you. I am the one you saved."',
        '牠說:「謝謝你。我就是你救的那隻。」',
        'Was this an ordinary turtle?', 'N',
        '推理: 會說話 → 不是普通烏龜 → 答 No'),
      // Q6 BEAT C — turtle invites him
      nar('kt-ch14-l2-q6',
        '"The sea king wants to meet you," the turtle said.',
        '「海王想見你,」烏龜說。'),
      // Q7 emoji — what does turtle ask him to do
      emoji('kt-ch14-l2-q7',
        'What did the turtle ask Urashima to do?',
        'What did the turtle ask?',
        ['🐢 climb on its back', '🏊 swim alone', '🚣 row home', '😴 take a nap'],
        ['爬到牠背上', '自己游', '划船回家', '睡覺'],
        0,
        '爬上背 = climb on its back。'),
      // Q8 BEAT D — Urashima climbs on
      nar('kt-ch14-l2-q8',
        'Urashima could not believe his ears. But he climbed on.',
        '浦島不敢相信自己的耳朵。但他爬上去了。'),
      // Q9 mc — paraphrase about descent (X3 fix: avoid verbatim "fish and coral")
      mc('kt-ch14-l2-q9',
        'They went down past bright fish and soft coral.',
        'What did they see on the way down?',
        ['snow and ice', 'sea life and reef plants', 'cars and roads', 'birds and clouds'],
        ['雪和冰', '海洋生物和礁石植物', '車和路', '鳥和雲'],
        1,
        '推理: bright fish + soft coral → sea life + reef plants (paraphrase)。'),
      // Q10 BEAT — keep diving
      nar('kt-ch14-l2-q10',
        'Down and down they went, into the blue water.',
        '他們一直往下、往下,進入藍色的水裡。'),
      // Q11 HOOK — B3 資訊缺口 (light grows dim)
      nar('kt-ch14-l2-q11',
        'Down and down they go. The light above grows dim...',
        '他們一直往下、往下。上面的光越來越暗……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch14-3: Sea palace welcome (B4 期待加速 — 他能留下嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch14-l3', chapter: 14, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'urashima',
    storyBeat: '龍宮公主歡迎他 — 他能留下嗎?',
    questions: [
      vocabIntro('kt-ch14-l3-q1', [
        ['宮殿', 'palace'],
        ['公主', 'princess'],
        ['歡迎', 'welcome'],
        ['寶座', 'throne'],
      ]),
      // Q2 BEAT A — sea palace appears
      nar('kt-ch14-l3-q2',
        'At the bottom of the sea stood a great sea palace.',
        '海底有一座大大的海底宮殿。'),
      // Q3 mc paraphrase about how the palace looks
      mc('kt-ch14-l3-q3',
        'The walls shone like pearl and the gates were made of shell.',
        'What was the sea palace like?',
        ['plain and grey', 'bright and beautiful', 'dark and broken', 'tall and cold'],
        ['樸素灰色', '亮亮美美的', '暗又破', '高又冷'],
        1,
        '推理: shone + pearl + shell → bright and beautiful。'),
      // Q4 BEAT B — princess greets him
      nar('kt-ch14-l3-q4',
        'A beautiful princess sat on a throne inside.',
        '裡面有一位美麗的公主坐在寶座上。'),
      // Q5 TF inference (action — princess says thank you = she IS the turtle)
      tf('kt-ch14-l3-q5',
        'She said, "I was that little turtle on the beach."',
        '她說:「我就是沙灘上那隻小烏龜。」',
        'Was the princess a stranger?', 'N',
        '推理: 她就是被救的烏龜 → 不是陌生人 → 答 No'),
      // Q6 BEAT C — princess name (only first mention per canon)
      nar('kt-ch14-l3-q6',
        'Her name was Otohime, princess of the sea.',
        '她叫乙姬,海的公主。'),
      // Q7 emoji — what did she do
      emoji('kt-ch14-l3-q7',
        'How did the princess greet him?',
        'How did she greet him?',
        ['😊 with a soft smile', '😠 with anger', '😢 with tears', '😨 with fear'],
        ['溫柔的微笑', '生氣', '流淚', '害怕'],
        0,
        'soft smile = 溫柔的微笑。'),
      // Q8 BEAT D — she takes his hand
      nar('kt-ch14-l3-q8',
        'She took his hand and walked with him gently.',
        '她牽起他的手,輕輕地跟他走。'),
      // Q9 mc paraphrase about dining hall
      mc('kt-ch14-l3-q9',
        'She led him into a long dining hall full of light.',
        'Where did she lead him?',
        ['a dark cave', 'a long bright room', 'a small boat', 'an empty beach'],
        ['暗洞', '又長又亮的房間', '小船', '空沙灘'],
        1,
        '推理: long + full of light → long bright room。'),
      // Q10 BEAT — invitation
      nar('kt-ch14-l3-q10',
        'Music played softly. The doors closed behind them.',
        '音樂輕輕響起。門在他們身後關上。'),
      // Q11 HOOK — B4 期待加速 (stay one day or forever)
      nar('kt-ch14-l3-q11',
        '"Stay one day," she says. "Or stay forever..."',
        '「住一天,」她說。「或者永遠住下來……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch14-4: Happy days, but homesick (B5 道德兩難 — 真的開心嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch14-l4', chapter: 14, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'urashima',
    storyBeat: '浦島開心住下 — 真的開心嗎?',
    questions: [
      vocabIntro('kt-ch14-l4-q1', [
        ['夢', 'dream'],
        ['跳舞', 'dance'],
        ['媽媽', 'mother'],
        ['想念', 'miss'],
      ]),
      // Q2 BEAT A — happy days
      nar('kt-ch14-l4-q2',
        'Urashima ate sweet fish and rice from a gold cup.',
        '浦島吃甜甜的魚和飯,用金色的杯子喝。'),
      // Q3 mc paraphrase about feast
      mc('kt-ch14-l4-q3',
        'Fish servants danced. Music played all night long.',
        'How were the nights in the palace?',
        ['cold and silent', 'lively and full of music', 'sad and dark', 'short and tired'],
        ['冷又靜', '熱鬧又有音樂', '悲傷又黑', '短又累'],
        1,
        '推理: 跳舞 + 音樂整晚 → 熱鬧又有音樂。'),
      // Q4 BEAT B — days like a dream
      nar('kt-ch14-l4-q4',
        'Days passed like a dream. He laughed and sang.',
        '日子像夢一樣過去。他又笑又唱。'),
      // Q5 TF inference (atmosphere — he doesn't feel cold/hungry = paradise)
      tf('kt-ch14-l4-q5',
        'He did not feel hungry. He did not feel cold.',
        '他不覺得餓。他不覺得冷。',
        'Did he need anything in the palace?', 'N',
        '推理: 不餓不冷 → 什麼都不缺 → 答 No'),
      // Q6 BEAT C — coral garden
      nar('kt-ch14-l4-q6',
        'He walked in the coral garden with the princess.',
        '他跟公主一起在珊瑚花園散步。'),
      // Q7 emoji — what did he see in the garden
      emoji('kt-ch14-l4-q7',
        'What did he see in the garden?',
        'What did he see?',
        ['🪸 coral and bright fish', '🌵 cactus and sand', '❄️ snow and ice', '🏙️ tall buildings'],
        ['珊瑚和亮魚', '仙人掌和沙', '雪和冰', '高樓'],
        0,
        'coral garden = 珊瑚和亮魚。'),
      // Q8 BEAT D — homesick pang (the pivot)
      nar('kt-ch14-l4-q8',
        'But in the quiet hours, he thought of his old mother.',
        '但在安靜的時刻,他想起年老的媽媽。'),
      // Q9 mc paraphrase about the pang
      mc('kt-ch14-l4-q9',
        'He thought of his little house by the sea.',
        'What did Urashima miss?',
        ['the sea palace', 'his old life at home', 'the gold cup', 'the dancing fish'],
        ['海底宮殿', '老家的生活', '金杯子', '跳舞的魚'],
        1,
        '推理: 想起媽媽 + 海邊小屋 → 老家的生活。'),
      // Q10 BEAT — at night
      nar('kt-ch14-l4-q10',
        'Every night, his heart felt warm and a little heavy.',
        '每個晚上,他的心又暖又有一點沉。'),
      // Q11 HOOK — B5 道德兩難 (joy + pang of homesickness)
      nar('kt-ch14-l4-q11',
        'But late at night, he thinks of his old mother by the sea...',
        '但深夜裡,他想念海邊年老的媽媽……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch14-5: Asking to go home, the treasure box (B6 預言種子 — 寶盒裡是什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch14-l5', chapter: 14, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'urashima',
    storyBeat: '想家了要回去 — 公主給他寶盒',
    questions: [
      vocabIntro('kt-ch14-l5-q1', [
        ['回家', 'go home'],
        ['禮物', 'gift'],
        ['紅', 'red'],
        ['答應', 'promise'],
      ]),
      // Q2 BEAT A — Urashima asks to leave
      nar('kt-ch14-l5-q2',
        'One morning, Urashima told the princess he must go home.',
        '一個早上,浦島告訴公主他必須回家。'),
      // Q3 mc paraphrase about reason
      mc('kt-ch14-l5-q3',
        '"My mother is waiting. My village is waiting."',
        'Why did Urashima want to go home?',
        ['he hated the palace', 'his family was waiting', 'the food was bad', 'he was bored'],
        ['討厭宮殿', '家人在等他', '吃的不好', '無聊'],
        1,
        '推理: 媽媽 + 村莊 在等 → 家人在等他。'),
      // Q4 BEAT B — princess looks sad
      nar('kt-ch14-l5-q4',
        'The princess looked very sad but did not say no.',
        '公主看起來很難過,但她沒有說不。'),
      // Q5 TF inference (action — she accepts even though sad)
      tf('kt-ch14-l5-q5',
        'She turned away and quietly wiped one tear.',
        '她轉過身,安靜地擦掉一滴眼淚。',
        'Was the princess happy to see him go?', 'N',
        '推理: 擦眼淚 → 不開心 → 答 No'),
      // Q6 BEAT C — she gives the box
      nar('kt-ch14-l5-q6',
        'She gave him a small red box tied with a gold rope.',
        '她給他一個小小的紅盒子,綁著金色的繩子。'),
      // Q7 emoji — what color is the box
      emoji('kt-ch14-l5-q7',
        'What did the box look like?',
        'What did the box look like?',
        ['📦 small and red', '⬛ big and black', '🪵 made of wood', '🍰 like a cake'],
        ['小小紅紅', '大又黑', '木頭做', '像蛋糕'],
        0,
        'small + red → small and red。'),
      // Q8 BEAT D — the warning
      nar('kt-ch14-l5-q8',
        '"This is called the Tamatebako," she said softly.',
        '「這個叫玉手箱,」她輕聲說。'),
      // Q9 mc paraphrase about her rule (X2 fix: vary starts, X3 fix: paraphrase)
      mc('kt-ch14-l5-q9',
        '"Please, never open it. Promise me. Never."',
        'What did she ask Urashima to promise?',
        ['come back soon', 'share the gift', 'keep the lid shut', 'pass it along'],
        ['快點回來', '分享禮物', '保持蓋子緊閉', '把它送出去'],
        2,
        '推理: never open → keep the lid shut (paraphrase)。'),
      // Q10 BEAT — turtle waits
      nar('kt-ch14-l5-q10',
        'The big turtle was waiting at the palace gate.',
        '大烏龜在宮殿門口等。'),
      // Q11 HOOK — B6 預言種子 (the warning)
      nar('kt-ch14-l5-q11',
        '"Take this Tamatebako," she says. "But never, never open it..."',
        '「拿著這個玉手箱,」她說。「但永遠、永遠不要打開……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch14-6: Back on land, no one knows him (B2 情緒翻轉 — 沒人認得他了)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch14-l6', chapter: 14, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'urashima',
    storyBeat: '回到岸上 — 沒人認得他了',
    questions: [
      vocabIntro('kt-ch14-l6-q1', [
        ['岸', 'shore'],
        ['村莊', 'village'],
        ['陌生', 'strange'],
        ['一百', 'hundred'],
      ]),
      // Q2 BEAT A — back on land
      nar('kt-ch14-l6-q2',
        'The turtle brought Urashima up to the warm sand.',
        '烏龜把浦島帶回到溫暖的沙灘。'),
      // Q3 TF inference (atmosphere — sand is the same)
      tf('kt-ch14-l6-q3',
        'The sun was bright. The sand looked just the same.',
        '陽光很亮。沙看起來跟以前一樣。',
        'Did the beach itself look strange?', 'N',
        '推理: just the same → 沒變 → 答 No'),
      // Q4 BEAT B — walks to village
      nar('kt-ch14-l6-q4',
        'He walked up to his village and stopped.',
        '他走到村莊,然後停下來。'),
      // Q5 mc paraphrase about what was strange
      mc('kt-ch14-l6-q5',
        'The houses were new. The trees were tall and strange.',
        'How was the village now?',
        ['the same as before', 'all new and changed', 'broken and empty', 'covered in snow'],
        ['跟以前一樣', '全新又不一樣', '破又空', '蓋滿雪'],
        1,
        '推理: new + tall + strange → 全新又不一樣。'),
      // Q6 BEAT C — meets an old man
      nar('kt-ch14-l6-q6',
        'He saw an old, old man sitting on a bench.',
        '他看到一個很老很老的人坐在長椅上。'),
      // Q7 emoji — who did he meet
      emoji('kt-ch14-l6-q7',
        'Who did Urashima meet in the village?',
        'Who did he meet?',
        ['👴 an old man', '👶 a small baby', '🧒 a little boy', '👮 a soldier'],
        ['老人', '小嬰兒', '小男孩', '士兵'],
        0,
        '老人 = old man。'),
      // Q8 BEAT D — asking about mother
      nar('kt-ch14-l6-q8',
        '"Where is my mother\'s house?" Urashima asked.',
        '「我媽媽的家在哪?」浦島問。'),
      // Q9 mc paraphrase about the old man's answer (X2 fix: vary starts)
      mc('kt-ch14-l6-q9',
        '"That name is in old stories. A long, long time ago."',
        'What did the old man say about Urashima?',
        ['just left town', 'lives in old stories now', 'works in the palace', 'walks the beach'],
        ['剛離開鎮上', '活在老故事裡', '在宮殿做事', '在沙灘散步'],
        1,
        '推理: in old stories → 活在老故事裡。'),
      // Q10 BEAT — the time gap revealed
      nar('kt-ch14-l6-q10',
        '"He went out to sea and never came back."',
        '「他出海以後就再也沒回來。」'),
      // Q11 HOOK — B2 情緒翻轉 (hundred years ago)
      nar('kt-ch14-l6-q11',
        '"That was a hundred years ago." Nothing — and no one — is the same...',
        '「那是一百年前的事。」一切——還有每一個人——都不一樣了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch14-7: Opens the box, ages (B6 open 開放後鉤 — 時間紅利的代價)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch14-l7', chapter: 14, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'urashima',
    storyBeat: '打開寶盒 → 變老頭 (時間紅利)',
    questions: [
      vocabIntro('kt-ch14-l7-q1', [
        ['解開', 'untie'],
        ['打開', 'open'],
        ['雲', 'cloud'],
        ['鬍子', 'beard'],
      ]),
      // Q2 BEAT A — alone on the sand
      nar('kt-ch14-l7-q2',
        'Urashima sat down on the sand. His hands shook.',
        '浦島坐在沙上。他的手在抖。'),
      // Q3 mc paraphrase about loss
      mc('kt-ch14-l7-q3',
        'His mother was gone. His friends were gone too.',
        'How did Urashima feel now?',
        ['proud and tall', 'alone in the world', 'angry and hot', 'sleepy and full'],
        ['驕傲又高大', '在世界上很孤單', '生氣又熱', '想睡又飽'],
        1,
        '推理: 家人朋友都不在 → 在世界上很孤單。'),
      // Q4 BEAT B — looks at the box
      nar('kt-ch14-l7-q4',
        'He looked at the small red box in his hands.',
        '他看著手裡的小紅盒。'),
      // Q5 TF inference (moral dilemma — promise vs alone)
      tf('kt-ch14-l7-q5',
        'He had promised. But he was all alone now.',
        '他答應過了。但他現在很孤單。',
        'Was it easy to keep the promise?', 'N',
        '推理: 很孤單 → 想找答案 → 不容易 → 答 No'),
      // Q6 BEAT C — opens the box
      nar('kt-ch14-l7-q6',
        'Slowly, he untied the gold rope. He opened the lid.',
        '慢慢的,他解開金繩子。他打開蓋子。'),
      // Q7 emoji — what came out
      emoji('kt-ch14-l7-q7',
        'What came out of the box?',
        'What came out?',
        ['☁️ a soft white cloud', '🪙 a pile of gold', '🐢 a tiny turtle', '🎵 sweet music'],
        ['一團柔軟的白雲', '一堆金子', '小烏龜', '甜甜的音樂'],
        0,
        '白雲 = soft white cloud。'),
      // Q8 BEAT D — cloud rises
      nar('kt-ch14-l7-q8',
        'The cloud rose up around him in the wind.',
        '雲在風裡升起來,圍住他。'),
      // Q9 mc paraphrase about the transformation (no death!) (X2 fix: vary starts)
      mc('kt-ch14-l7-q9',
        'When the wind cleared, he was a very old man with a long beard.',
        'How did Urashima change?',
        ['became a small turtle', 'turned back into a child', 'aged into a very old man', 'changed into a fish'],
        ['變小烏龜', '變回小孩', '變成很老的人', '變魚'],
        2,
        '推理: very old man + long beard → 變成很老的人 (非「死」)。'),
      // Q10 BEAT — final image
      nar('kt-ch14-l7-q10',
        'His hair was white as snow. The hundred years came back.',
        '他的頭髮白得像雪。一百年回到他身上。'),
      // Q11 HOOK — B6 open 開放後鉤 (quiet acceptance + philosophical question)
      nar('kt-ch14-l7-q11',
        'A very old man with a long beard sits quietly on the sand...',
        '一個白鬍子很長的老人安靜地坐在沙上……'),
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
console.log(`     narration: ${narCount}, listen-tf: ${tfCount}, listen-mc: ${mcCount}, emoji-pick: ${emojiCount}, tap-pairs vocab: ${vocabCount}`);
