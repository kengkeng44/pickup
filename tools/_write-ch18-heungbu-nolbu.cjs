#!/usr/bin/env node
/**
 * v2.0.B.264+ — Ch18 興夫和孬夫 (Heungbu and Nolbu, Korean folk public domain).
 *
 * URL pipeline ship via tools/pickup-new-story.cjs B.234 pattern.
 * Source canon: docs/canon/heungbu-nolbu.md (7-beat arc).
 * Cuts: docs/canon/heungbu-nolbu-cuts.md (B6/B3/B5/B4/B6/B2/B6-open).
 *
 * Pairing: Ch18 興夫和孬夫 (Korean) + Ch1 桃太郎 (Japanese) + Ch14 浦島太郎 (Japanese)
 *   = 東亞民間 folk trio, 公有領域. Ch1 energy + bravery, Ch14 quiet + bittersweet
 *     wisdom, Ch18 moral choice + family.
 *
 * Public domain compliance:
 *   - Source: Korean oral folklore (no single author, public domain by tradition).
 *   - A2 自創句式, do NOT quote any specific translation / 繪本 / 教科書 version.
 *   - 弟名: 'Heungbu' (公有領域)
 *   - 兄名: 'Nolbu' (公有領域)
 *   - 葫蘆 = 'gourd' (A2 OK with picture context)
 *   - 燕子 = 'swallow' or 'small bird' (interchangeable A2 friendly)
 *
 * Structure per lesson (11 Q, mirror Ch14 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration / listen-mc / listen-tf
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
 *   R3 A2 vocab only (no banished / inherited / lamented / wretched / cunning)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cultural / no-death rules (per docs/canon/heungbu-nolbu.md + user prompt):
 *   - parents 'were gone', NOT 'died'.
 *   - 'kicked out' OK / 'banished' 禁.
 *   - Nolbu's punishment = 'all his treasures turned to dust', NOT 'killed'.
 *   - snake 'came near' but Heungbu chases away — no graphic.
 *   - 'broke its leg on purpose' age-safe sufficient — no graphic close-up.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch18.json');

// ─── Helpers (mirror Ch14 範本, tag swap to ch18) ─────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch18', 'heungbu-nolbu'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch18', 'heungbu-nolbu', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch18', 'heungbu-nolbu'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch18', 'heungbu-nolbu', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch18', 'heungbu-nolbu', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch18-1: Two brothers, Heungbu kicked out (B6 預言種子 — 一個人怎活下去?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch18-l1', chapter: 18, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'heungbu-nolbu',
    storyBeat: '兩兄弟父母過世 → 興夫被趕出家門',
    questions: [
      vocabIntro('kt-ch18-l1-q1', [
        ['哥哥', 'older brother'],
        ['弟弟', 'younger brother'],
        ['貪心', 'greedy'],
        ['好心', 'kind'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch18-l1-q2',
        'Long ago, there were two brothers in Korea.',
        '很久以前,在韓國有兩個兄弟。'),
      // Q3 BEAT A deepen
      nar('kt-ch18-l1-q3',
        'The older was Nolbu. The younger was Heungbu.',
        '哥哥叫孬夫。弟弟叫興夫。'),
      // Q4 TF inference (contrast — greedy vs kind)
      tf('kt-ch18-l1-q4',
        'Nolbu was greedy. Heungbu was kind.',
        '孬夫很貪心。興夫很好心。',
        'Were the two brothers very different?', 'Y',
        '推理: 一個貪一個善 → 性格不同 → 答 Yes'),
      // Q5 BEAT B — parents gone (no death word)
      nar('kt-ch18-l1-q5',
        'One day, their parents were gone.',
        '有一天,他們的父母過世了。'),
      // Q6 listen-mc paraphrase about what Nolbu takes (X3 anti-verbatim)
      mc('kt-ch18-l1-q6',
        'Nolbu took the big house, the rice, and the cows.',
        'What did Nolbu take for himself?',
        ['just a small bag', 'everything good', 'only one cow', 'nothing at all'],
        ['只有小袋子', '所有好東西', '只有一頭牛', '什麼也沒拿'],
        1,
        '推理: 房子 + 米 + 牛 → 把好東西全拿走。'),
      // Q7 BEAT C — Nolbu kicks him out
      nar('kt-ch18-l1-q7',
        'Then Nolbu kicked Heungbu out of the family home.',
        '然後孬夫把興夫趕出家門。'),
      // Q8 listen-mc paraphrase about Heungbu's situation (X3 fix: paraphrase not verbatim)
      mc('kt-ch18-l1-q8',
        'Heungbu walked away with only one small bag.',
        'What did Heungbu have when he left?',
        ['a big farm', 'almost nothing', 'a strong horse', 'piles of gold'],
        ['一個大農場', '幾乎什麼都沒有', '一匹強壯的馬', '一堆黃金'],
        1,
        '推理: only one small bag → 幾乎什麼都沒有 (paraphrase)。'),
      // Q9 BEAT D — Heungbu walks
      nar('kt-ch18-l1-q9',
        'The road was long. The sun was hot.',
        '路很長。太陽很熱。'),
      // Q10 emoji — how is Heungbu now
      emoji('kt-ch18-l1-q10',
        'How does Heungbu feel as he walks away?',
        'How does he feel?',
        ['😢 sad and alone', '😄 happy and free', '😡 ready to fight', '😴 sleepy and full'],
        ['難過又孤單', '開心又自由', '想打架', '想睡又飽'],
        0,
        '被趕出家門 + 走遠路 → 難過又孤單。'),
      // Q11 HOOK — B6 預言種子 (one small bag, one long road)
      nar('kt-ch18-l1-q11',
        'Heungbu walks away with only one small bag...',
        '興夫帶著一個小袋子,默默走遠……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch18-2: Poor home, hungry children (B3 資訊缺口 — 他怎麼養家?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch18-l2', chapter: 18, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'heungbu-nolbu',
    storyBeat: '興夫家裡很窮 → 他怎麼養家?',
    questions: [
      vocabIntro('kt-ch18-l2-q1', [
        ['妻子', 'wife'],
        ['小孩', 'children'],
        ['草屋', 'straw house'],
        ['餓', 'hungry'],
      ]),
      // Q2 BEAT A — Heungbu has family
      nar('kt-ch18-l2-q2',
        'Heungbu had a kind wife and many small children.',
        '興夫有一個好心的妻子和很多小孩。'),
      // Q3 mc paraphrase about the tiny house
      mc('kt-ch18-l2-q3',
        'They lived in a tiny straw house with thin walls.',
        'What was their house like?',
        ['big and warm', 'small and weak', 'made of stone', 'high in a tree'],
        ['又大又暖', '又小又脆弱', '石頭做', '在樹上'],
        1,
        '推理: tiny + straw + thin walls → small and weak。'),
      // Q4 BEAT B — rain and wind
      nar('kt-ch18-l2-q4',
        'The rain came in. The wind blew through the wall.',
        '雨會漏進來。風會從牆吹進來。'),
      // Q5 TF inference (contrast — work hard yet poor)
      tf('kt-ch18-l2-q5',
        'Heungbu worked all day, but the rice was never enough.',
        '興夫整天工作,但米總是不夠。',
        'Was hard work enough to feed his family?', 'N',
        '推理: 整天工作但米不夠 → 不夠 → 答 No'),
      // Q6 BEAT C — odd jobs
      nar('kt-ch18-l2-q6',
        'He cut grass. He carried water. He helped neighbours.',
        '他割草。他挑水。他幫鄰居做事。'),
      // Q7 emoji — what kind of jobs
      emoji('kt-ch18-l2-q7',
        'What jobs did Heungbu do?',
        'What jobs did he do?',
        ['💪 small hard jobs', '👑 work for a king', '🏪 sell in a big shop', '🏫 teach at a school'],
        ['辛苦的小工作', '幫國王做事', '在大店裡賣', '學校教書'],
        0,
        '割草 + 挑水 + 幫鄰居 → 辛苦的小工作。'),
      // Q8 BEAT D — children hungry
      nar('kt-ch18-l2-q8',
        'At night, the children were always a little hungry.',
        '到晚上,小孩們總是有點餓。'),
      // Q9 mc paraphrase about Heungbu's feelings
      mc('kt-ch18-l2-q9',
        'Heungbu looked at the empty rice pot and felt sad.',
        'Why did Heungbu feel sad?',
        ['the pot was new', 'there was no rice left', 'the children were laughing', 'his wife was singing'],
        ['鍋子是新的', '米都吃完了', '小孩在笑', '妻子在唱歌'],
        1,
        '推理: empty rice pot → 沒米了 → 難過。'),
      // Q10 BEAT — his wife next to him
      nar('kt-ch18-l2-q10',
        'His wife sat next to him. She held his hand.',
        '他的妻子坐在他旁邊。她握住他的手。'),
      // Q11 HOOK — B3 資訊缺口 (empty pot, what can he do)
      nar('kt-ch18-l2-q11',
        'Heungbu looks at the empty rice pot. What can he do?',
        '興夫看著空空的米鍋。他能怎麼辦?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch18-3: A baby swallow falls (B5 道德兩難 — 興夫會救嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch18-l3', chapter: 18, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'heungbu-nolbu',
    storyBeat: '受傷小燕子掉下來 → 興夫會救嗎?',
    questions: [
      vocabIntro('kt-ch18-l3-q1', [
        ['春天', 'spring'],
        ['燕子', 'swallow'],
        ['鳥巢', 'nest'],
        ['受傷', 'hurt'],
      ]),
      // Q2 BEAT A — spring morning
      nar('kt-ch18-l3-q2',
        'One spring morning, Heungbu sat by his door.',
        '一個春天的早上,興夫坐在門邊。'),
      // Q3 mc paraphrase about the nest (X3 fix: paraphrase)
      mc('kt-ch18-l3-q3',
        'A small swallow had built a nest on the roof.',
        'Where was the swallow\'s nest?',
        ['inside a tall tree', 'high up on the house', 'beside the river', 'under a wooden chair'],
        ['高高的樹裡', '屋子上面', '河邊', '木椅子下'],
        1,
        '推理: on the roof → 屋子上面 (paraphrase)。'),
      // Q4 BEAT B — baby bird falls
      nar('kt-ch18-l3-q4',
        'A baby bird was learning to fly. But it fell.',
        '一隻小鳥在學飛。但牠掉下來了。'),
      // Q5 TF inference (action — hurt leg = needs help)
      tf('kt-ch18-l3-q5',
        'Its little leg was hurt. The bird cried.',
        '牠的小腳受傷了。鳥兒哭了。',
        'Did the bird need help?', 'Y',
        '推理: 腳受傷 + 哭 → 需要幫忙 → 答 Yes'),
      // Q6 BEAT C — snake comes near
      nar('kt-ch18-l3-q6',
        'Then a snake came near the bird, slow and quiet.',
        '然後一條蛇靠近小鳥,慢慢、安靜地。'),
      // Q7 emoji — what was coming
      emoji('kt-ch18-l3-q7',
        'What was coming near the little bird?',
        'What was coming?',
        ['🐍 a hungry snake', '🐶 a friendly dog', '🦋 a soft butterfly', '🐝 a busy bee'],
        ['一條餓蛇', '友善的狗', '蝴蝶', '蜜蜂'],
        0,
        '蛇 = snake。'),
      // Q8 BEAT D — Heungbu jumps up
      nar('kt-ch18-l3-q8',
        'Heungbu jumped up. He chased the snake away.',
        '興夫跳起來。他把蛇趕走。'),
      // Q9 mc — paraphrase about how he picked up the bird
      mc('kt-ch18-l3-q9',
        'He picked up the small bird with very soft hands.',
        'How did Heungbu pick up the bird?',
        ['fast and rough', 'soft and gentle', 'with a stick', 'with a net'],
        ['粗魯地', '輕柔地', '用棍子', '用網子'],
        1,
        '推理: very soft hands → 輕柔地。'),
      // Q10 BEAT — quiet moment
      nar('kt-ch18-l3-q10',
        'The bird was small and warm in his hand.',
        '小鳥又小又溫暖,在他手裡。'),
      // Q11 HOOK — B5 道德兩難 (can he save it)
      nar('kt-ch18-l3-q11',
        'Heungbu jumps up. Can he save the little bird?',
        '興夫跳起來。他能救這隻小鳥嗎?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch18-4: The swallow returns with a seed (B4 期待加速 — 給興夫什麼禮物?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch18-l4', chapter: 18, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'heungbu-nolbu',
    storyBeat: '燕子春天回來 → 給興夫什麼禮物?',
    questions: [
      vocabIntro('kt-ch18-l4-q1', [
        ['包', 'wrap'],
        ['布', 'cloth'],
        ['冬天', 'winter'],
        ['種子', 'seed'],
      ]),
      // Q2 BEAT A — Heungbu wraps the bird
      nar('kt-ch18-l4-q2',
        'Heungbu wrapped the bird\'s leg in soft cloth.',
        '興夫用軟布包住小鳥的腳。'),
      // Q3 mc paraphrase about what he fed it (X3 fix: paraphrase)
      mc('kt-ch18-l4-q3',
        'He fed it small seeds and gave it warm water.',
        'What did Heungbu give the bird?',
        ['big fresh fish', 'simple food and drink', 'milk and bread', 'cake and tea'],
        ['大鮮魚', '簡單的食物和飲水', '牛奶和麵包', '蛋糕和茶'],
        1,
        '推理: small seeds + warm water → 簡單的食物和飲水 (paraphrase)。'),
      // Q4 BEAT B — bird flies away
      nar('kt-ch18-l4-q4',
        'Soon the bird was strong. It flew away for the winter.',
        '不久小鳥變強了。牠飛走過冬天。'),
      // Q5 TF inference (time accumulation — winter passes, spring returns)
      tf('kt-ch18-l4-q5',
        'When spring came again, the swallow came back.',
        '當春天又來時,燕子飛回來了。',
        'Did the bird remember Heungbu?', 'Y',
        '推理: 春天回來 → 牠記得家 → 答 Yes'),
      // Q6 BEAT C — bird drops a seed
      nar('kt-ch18-l4-q6',
        'It dropped one small seed on Heungbu\'s hand.',
        '牠在興夫手上放下一顆小種子。'),
      // Q7 emoji — what kind of seed
      emoji('kt-ch18-l4-q7',
        'What kind of seed did the bird bring?',
        'What kind of seed?',
        ['🌱 a gourd seed', '🌰 a chestnut', '🍎 an apple core', '🌻 a sunflower seed'],
        ['葫蘆種子', '栗子', '蘋果核', '向日葵種子'],
        0,
        'gourd seed = 葫蘆種子。'),
      // Q8 BEAT D — Heungbu plants the seed
      nar('kt-ch18-l4-q8',
        'Heungbu planted the seed near his small house.',
        '興夫把種子種在小屋旁邊。'),
      // Q9 mc paraphrase about the vine (X3 fix: paraphrase + zh)
      mc('kt-ch18-l4-q9',
        'Big green gourds grew on the long vine.',
        'What grew from the seed?',
        ['small red apples', 'huge round fruit', 'tall yellow corn', 'soft pink flowers'],
        ['小紅蘋果', '又大又圓的果實', '高的玉米', '粉紅花'],
        1,
        '推理: big green gourds → 又大又圓的果實 (paraphrase)。'),
      // Q10 BEAT — children point at vine
      nar('kt-ch18-l4-q10',
        'The children pointed at the vine and laughed.',
        '小孩們指著葫蘆藤笑著。'),
      // Q11 HOOK — B4 期待加速 (gourd seed, what will grow)
      nar('kt-ch18-l4-q11',
        'A gourd seed. What will grow from it?',
        '一顆葫蘆種子。會長出什麼來?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch18-5: Gourds become treasures (B6 預言種子 — 哥哥孬夫聽到會怎樣?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch18-l5', chapter: 18, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'heungbu-nolbu',
    storyBeat: '葫蘆種子長出寶物 → 興夫變富',
    questions: [
      vocabIntro('kt-ch18-l5-q1', [
        ['鋸開', 'cut open'],
        ['銀子', 'silver'],
        ['黃金', 'gold'],
        ['衣服', 'clothes'],
      ]),
      // Q2 BEAT A — Heungbu and wife take down a gourd
      nar('kt-ch18-l5-q2',
        'Heungbu and his wife took down the biggest gourd.',
        '興夫和妻子摘下最大的葫蘆。'),
      // Q3 mc paraphrase about cutting open (X2/X3 fix: vary starts + paraphrase)
      mc('kt-ch18-l5-q3',
        'They cut it open with a small saw.',
        'How did they open the gourd?',
        ['by knocking with a hammer', 'using a sharp little blade', 'pulling with bare hands', 'rolling it on a stone'],
        ['用鎚子敲', '用一把小利刃', '用手拉開', '用石頭滾'],
        1,
        '推理: with a small saw → 用一把小利刃 (paraphrase)。'),
      // Q4 BEAT B — first gourd: rice
      nar('kt-ch18-l5-q4',
        'Out came rice. So much rice. Bags and bags of it.',
        '米湧出來。好多好多米。一袋一袋的。'),
      // Q5 TF inference (atmosphere — rich now, not poor)
      tf('kt-ch18-l5-q5',
        'The children clapped. The wife smiled big.',
        '小孩們拍手。妻子大大地笑。',
        'Was the family happy now?', 'Y',
        '推理: 拍手 + 大笑 → 開心 → 答 Yes'),
      // Q6 BEAT C — second gourd: silver and gold
      nar('kt-ch18-l5-q6',
        'They cut open the second gourd. Out came silver and gold.',
        '他們鋸開第二個葫蘆。銀子和黃金湧出來。'),
      // Q7 emoji — what was in the second gourd
      emoji('kt-ch18-l5-q7',
        'What came out of the second gourd?',
        'What came out?',
        ['💰 silver and gold', '🧊 ice and snow', '🌫️ smoke and dust', '🪨 stones and mud'],
        ['銀子和黃金', '冰和雪', '煙和灰', '石頭和泥'],
        0,
        'silver and gold = 銀子和黃金。'),
      // Q8 BEAT D — third gourd: house and clothes
      nar('kt-ch18-l5-q8',
        'They cut open the third gourd. Out came a new house.',
        '他們鋸開第三個葫蘆。一棟新房子湧出來。'),
      // Q9 mc paraphrase about what else came out
      mc('kt-ch18-l5-q9',
        'Warm clothes came out. Toys for the children came out.',
        'What else came from the third gourd?',
        ['only one small coin', 'warm clothes and toys', 'old broken pots', 'just dust and mud'],
        ['一枚小硬幣', '暖衣服和玩具', '舊破鍋', '只有灰和泥'],
        1,
        '推理: warm clothes + toys → 暖衣服和玩具。'),
      // Q10 BEAT — Heungbu thanks the bird
      nar('kt-ch18-l5-q10',
        'Heungbu looked up at the sky. He thanked the swallow.',
        '興夫抬頭看天空。他謝謝燕子。'),
      // Q11 HOOK — B6 預言種子 (Heungbu rich, what will Nolbu do)
      nar('kt-ch18-l5-q11',
        'Heungbu is rich now — but is the story over?',
        '興夫變富有了——但故事結束了嗎?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch18-6: Nolbu copies, hurts a bird (B2 情緒翻轉 — 報應會來嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch18-l6', chapter: 18, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'heungbu-nolbu',
    storyBeat: '哥哥孬夫嫉妒打傷燕子 → 報應',
    questions: [
      vocabIntro('kt-ch18-l6-q1', [
        ['聽說', 'heard'],
        ['生氣', 'angry'],
        ['爬上', 'climbed'],
        ['假裝', 'pretended'],
      ]),
      // Q2 BEAT A — Nolbu hears the news
      nar('kt-ch18-l6-q2',
        'Nolbu heard the news. His brother was rich now.',
        '孬夫聽到消息。他弟弟變富有了。'),
      // Q3 TF inference (contrast — jealous not glad)
      tf('kt-ch18-l6-q3',
        '"Why is my poor brother now rich?" he said with cold eyes.',
        '「為什麼我那個窮弟弟現在變富?」他用冷冷的眼神說。',
        'Was Nolbu glad for his brother?', 'N',
        '推理: 冷眼 + 嫉妒語氣 → 不開心 → 答 No'),
      // Q4 BEAT B — Nolbu asks how
      nar('kt-ch18-l6-q4',
        'He went to Heungbu. He asked about the magic gourds.',
        '他去找興夫。他問神奇葫蘆的事。'),
      // Q5 mc paraphrase about Heungbu's answer (X2 fix: vary option starts)
      mc('kt-ch18-l6-q5',
        'Kind Heungbu told him the whole story, word for word.',
        'How did Heungbu treat his greedy brother?',
        ['shouted in anger', 'answered with kind words', 'stayed completely silent', 'slammed the door shut'],
        ['對他大吼', '用善意回答', '完全不說話', '把門用力關上'],
        1,
        '推理: 把整個故事告訴他 → 用善意回答 (despite greed)。'),
      // Q6 BEAT C — Nolbu runs home and climbs
      nar('kt-ch18-l6-q6',
        'Nolbu ran home. He climbed up to a swallow\'s nest.',
        '孬夫跑回家。他爬到一個燕子的鳥巢。'),
      // Q7 emoji — what is Nolbu about to do
      emoji('kt-ch18-l6-q7',
        'What is Nolbu about to do?',
        'What is he about to do?',
        ['😈 hurt a bird on purpose', '🤗 save a baby bird', '🍞 feed the bird', '🪺 fix the nest'],
        ['故意傷害小鳥', '救小鳥', '餵小鳥', '修鳥巢'],
        0,
        '故意 + 爬上鳥巢 → 要傷害小鳥。'),
      // Q8 BEAT D — Nolbu breaks the bird's leg (age-safe phrasing per user rule)
      nar('kt-ch18-l6-q8',
        'He grabbed a baby bird. He broke its leg on purpose.',
        '他抓起一隻小鳥。他故意弄斷牠的腳。'),
      // Q9 mc paraphrase about the pretending
      mc('kt-ch18-l6-q9',
        'Then he wrapped it in cloth and pretended to help.',
        'Was Nolbu really kind to the bird?',
        ['yes, truly kind', 'no, just pretending', 'yes, like Heungbu', 'no, he ran away'],
        ['真的善良', '只是假裝', '跟興夫一樣', '逃跑了'],
        1,
        '推理: pretended to help → 假裝。'),
      // Q10 BEAT — bird looks up with quiet eyes
      nar('kt-ch18-l6-q10',
        'The bird looked at him. Its eyes were quiet and dark.',
        '小鳥看著他。牠的眼睛安靜又深沉。'),
      // Q11 HOOK — B2 情緒翻轉 (silent stare = warning of payback)
      nar('kt-ch18-l6-q11',
        'The swallow looks at him with silent eyes...',
        '燕子用沉默的眼神看著他……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch18-7: Nolbu ruined, Heungbu shares (B6 open — 你會學興夫還是孬夫?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch18-l7', chapter: 18, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'heungbu-nolbu',
    storyBeat: '興夫分財給哥哥 → 學到什麼?',
    questions: [
      vocabIntro('kt-ch18-l7-q1', [
        ['灰塵', 'dust'],
        ['泥巴', 'mud'],
        ['寶物', 'treasures'],
        ['分享', 'share'],
      ]),
      // Q2 BEAT A — next spring, the bird returns to Nolbu
      nar('kt-ch18-l7-q2',
        'Next spring, the bird came back. It dropped a seed.',
        '隔年春天,小鳥回來了。牠放下一顆種子。'),
      // Q3 mc paraphrase about Nolbu's hope
      mc('kt-ch18-l7-q3',
        'Nolbu planted the seed. Big gourds grew very fast.',
        'What did Nolbu expect from the gourds?',
        ['nothing good', 'rice and gold like Heungbu', 'a snake', 'a new wife'],
        ['沒好東西', '像興夫一樣的米和金子', '蛇', '新妻子'],
        1,
        '推理: 種同樣種子 → 期待跟興夫一樣。'),
      // Q4 BEAT B — Nolbu cuts open
      nar('kt-ch18-l7-q4',
        'Nolbu cut them open one by one with his saw.',
        '孬夫用鋸子一個一個鋸開。'),
      // Q5 TF inference (contrast — opposite outcome)
      tf('kt-ch18-l7-q5',
        'But nothing good came out. Out came dust. Out came mud.',
        '但是沒有好東西出來。灰塵湧出。泥巴湧出。',
        'Was Nolbu lucky like his brother?', 'N',
        '推理: 沒好東西 + 灰塵 + 泥巴 → 沒運氣 → 答 No'),
      // Q6 BEAT C — Nolbu's treasures turn to dust (canonical folk close, no death)
      nar('kt-ch18-l7-q6',
        'All his old treasures turned to dust too.',
        '他以前的寶物也都變成灰塵了。'),
      // Q7 emoji — how is Nolbu now
      emoji('kt-ch18-l7-q7',
        'How is Nolbu now?',
        'How is he now?',
        ['😭 poor and crying', '👑 still rich and proud', '😴 sleeping happily', '🤣 laughing loudly'],
        ['又窮又哭', '還是富有又驕傲', '快樂睡覺', '大聲笑'],
        0,
        '寶物變灰 → 又窮又哭。'),
      // Q8 BEAT D — Nolbu goes to his brother
      nar('kt-ch18-l7-q8',
        'Nolbu went to Heungbu\'s door. He cried very hard.',
        '孬夫走到興夫的門口。他哭得很大聲。'),
      // Q9 mc paraphrase about Heungbu sharing
      mc('kt-ch18-l7-q9',
        'Heungbu opened the door. He shared his food, his house, and his gold.',
        'What did Heungbu do for his brother?',
        ['shut the door', 'shared everything', 'sent him far away', 'laughed at him'],
        ['關門', '分享一切', '把他趕遠', '嘲笑他'],
        1,
        '推理: shared food + house + gold → 分享一切。'),
      // Q10 BEAT — Heungbu says the moral line
      nar('kt-ch18-l7-q10',
        '"We are family," Heungbu said with a soft smile.',
        '「我們是一家人,」興夫溫柔地笑著說。'),
      // Q11 HOOK — B6 open 開放後鉤 (which brother will user be like)
      nar('kt-ch18-l7-q11',
        'What did Nolbu learn at last? Who will you be like?',
        '孬夫最後學到了什麼?你會像哪一個?'),
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
