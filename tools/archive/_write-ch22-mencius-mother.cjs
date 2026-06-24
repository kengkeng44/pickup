#!/usr/bin/env node
/**
 * v2.0.B.262+ — Ch22 孟母三遷 (Mencius's Mother Moves Three Times,
 * 中華歷史 + 民間傳說 public domain).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern
 * (mirror Ch15 Emperor's New Clothes ship B.262+).
 * Source canon: docs/canon/mencius-mother.md
 *   (中華歷史 + 民間傳說 7-beat, public domain worldwide).
 * Cuts: docs/canon/mencius-mother-cuts.md
 *   (B6/B3/B5/B4/B6/B2/B6-open).
 *
 * IP 鐵律:
 *   - Source: 孟子 (Mengzi 372-289 BCE) 歷史人物 + 孟母三遷民間傳說.
 *     最早見漢代《列女傳》(劉向 ~16 BCE), 流傳 >2000 年, 全球公有領域.
 *   - A2 自創句式, 不引任何特定譯本 / 教科書 / 動畫改編.
 *   - NO modern TV / animation / film / 繪本 adaptation reference.
 *
 * Structure per lesson (11 Q, mirror Ch15/Ch9 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration / listen-mc paraphrase
 *   q4  listen-tf inference
 *   q5  narration / listen-mc detail
 *   q6  listen-mc (paraphrased detail)
 *   q7  narration (transition) / emoji-pick
 *   q8  listen-mc (paraphrased detail) / narration
 *   q9  narration (BEAT D) / listen-mc
 *   q10 emoji-pick / narration
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim)
 *   R3 A2 vocab only:
 *      'graveyard' → 'place where people remembered family'
 *      'funeral' → 'long white lines' / 'people walking past'
 *      'philosopher' → 'thinker' (B1+)
 *      'mourner' → 'people who were sad'
 *      'burial' → 'walking past slowly'
 *      'merchant' / 'vendor' → 'seller'
 *      'mother cut the woven cloth' (剪布警示) OK at A2
 *   R4 listen-tf inference (atmosphere / action / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 死亡 explicit (墓地 = 'place of rest' / 'place where people remembered family')
 *   - 教養主題: 環境塑人 + 媽媽用行動教
 *   - 海外華人家長 heritage anchor #1 共鳴 (教育 / 換學區 / 為孩子搬家)
 *   - 媽媽剪布是 symbolic shock (cut cloth, not anyone), 用來教持之以恆
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch22.json');

// ─── Helpers (mirror Ch15/Ch9 範本) ────────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch22', 'mencius-mother'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch22', 'mencius-mother', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch22', 'mencius-mother'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch22', 'mencius-mother', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch22', 'mencius-mother', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch22-1: Mother + small son near place of rest (B6 預言種子)
  // Hook: 孟子小時候住墓地附近 → 他學了什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch22-l1', chapter: 22, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'mencius-mother',
    storyBeat: '媽媽和孟子 — 第一個家在「人們想念家人的地方」旁',
    questions: [
      vocabIntro('kt-ch22-l1-q1', [
        ['媽媽', 'mother'],
        ['兒子', 'son'],
        ['男孩', 'boy'],
        ['家', 'house'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch22-l1-q2',
        'Long ago in China, a mother lived with her small son.',
        '很久以前在中國,有一位媽媽和她的小兒子住在一起。'),
      // Q3 mc paraphrase about boy's name (X3: paraphrase, not verbatim)
      mc('kt-ch22-l1-q3',
        'The boy\'s name was Meng. His father was gone.',
        'Who lived with the boy at home?',
        ['his big brother', 'only his mother', 'his school teacher', 'his old uncle'],
        ['他哥哥', '只有媽媽', '老師', '老叔叔'],
        1,
        '推理: father was gone → 只剩媽媽 (paraphrase)。'),
      // Q4 TF inference (action — mother's hope)
      tf('kt-ch22-l1-q4',
        'The mother wanted Meng to grow up strong and kind.',
        '媽媽希望孟子長大後堅強又善良。',
        'Did the mother care about how her son would grow up?', 'Y',
        '推理: 希望兒子堅強善良 → 在乎成長 → 答 Yes'),
      // Q5 BEAT B — first house
      nar('kt-ch22-l1-q5',
        'Their first house stood near a place of rest.',
        '他們的第一個家就在一個安息之地附近。'),
      // Q6 listen-mc paraphrase about what Meng saw
      mc('kt-ch22-l1-q6',
        'Every day Meng watched people walk past in long white lines.',
        'What did Meng see every day from his home?',
        ['kids playing ball games', 'people walking past slowly', 'farmers in green fields', 'boats on a wide river'],
        ['小孩玩球', '人們慢慢走過', '田裡的農夫', '河上的船'],
        1,
        '推理: long white lines → 慢慢走過 (paraphrase)。'),
      // Q7 BEAT C — what he saw
      nar('kt-ch22-l1-q7',
        'He saw them bow. He saw them cry softly.',
        '他看見他們鞠躬。他看見他們輕輕哭泣。'),
      // Q8 mc paraphrase about emotional atmosphere
      mc('kt-ch22-l1-q8',
        'The people were thinking of family they had loved.',
        'How did the people in the street feel?',
        ['very happy and loud', 'quiet and full of love', 'angry at each other', 'too sleepy to walk'],
        ['很開心又大聲', '安靜又充滿愛', '互相生氣', '太睏走不動'],
        1,
        '推理: cry softly + bow → 安靜又充滿愛 (paraphrase)。'),
      // Q9 BEAT D — boy copies
      nar('kt-ch22-l1-q9',
        'Soon Meng started to copy what he saw outside.',
        '不久後,孟子開始模仿他在外面看到的事。'),
      // Q10 emoji — what Meng learns
      emoji('kt-ch22-l1-q10',
        'Where does Meng learn most of his actions from?',
        'Where does Meng learn from?',
        ['📚 books at home', '👀 what he sees nearby', '🎵 songs from far away', '🐦 birds in the sky'],
        ['家裡的書', '他附近看到的事', '遠方的歌', '天上的鳥'],
        1,
        '看到什麼就學什麼 → 從身邊看到的學 (環境塑人)。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch22-l1-q11',
        'His mother watched him from the window. She began to worry...',
        '媽媽從窗邊看著他。她開始擔心……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch22-2: Burial games at home (B3 資訊缺口)
  // Hook: 媽媽看見他玩埋葬遊戲 → 怎麼辦?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch22-l2', chapter: 22, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'mencius-mother',
    storyBeat: '玩埋葬遊戲 — 媽媽心很重',
    questions: [
      vocabIntro('kt-ch22-l2-q1', [
        ['看', 'watch'],
        ['玩', 'play'],
        ['遊戲', 'game'],
        ['心', 'heart'],
      ]),
      // Q2 BEAT A — play games
      nar('kt-ch22-l2-q2',
        'Meng played the same games at home with sticks.',
        '孟子在家用樹枝玩同樣的遊戲。'),
      // Q3 mc paraphrase about what he played (X2: vary option starts)
      mc('kt-ch22-l2-q3',
        'He set up small piles and walked around them in lines.',
        'What kind of games did Meng play?',
        ['running races outside', 'games copying what he saw', 'card games with friends', 'kite games in the sky'],
        ['外面賽跑', '模仿他看到的遊戲', '跟朋友玩牌', '放風箏'],
        1,
        '推理: 走小堆走線 → 模仿外面看到的 (paraphrase)。'),
      // Q4 TF inference (atmosphere — quiet play, serious mood)
      tf('kt-ch22-l2-q4',
        'Meng walked slowly and did not laugh while he played.',
        '孟子慢慢走,玩的時候不笑。',
        'Was Meng playing in a happy and noisy way?', 'N',
        '推理: 慢慢走 + 不笑 → 不是開心吵鬧 → 答 No'),
      // Q5 BEAT B — mother watches
      nar('kt-ch22-l2-q5',
        'His mother watched from the kitchen door.',
        '媽媽從廚房門口看著。'),
      // Q6 mc paraphrase about mother's heart
      mc('kt-ch22-l2-q6',
        'Her heart felt heavy as she watched her son.',
        'How did the mother feel inside?',
        ['light and happy', 'sad and worried', 'angry and loud', 'sleepy and slow'],
        ['輕鬆開心', '難過又擔心', '生氣又大聲', '想睡又慢'],
        1,
        '推理: heart felt heavy → 難過又擔心 (paraphrase)。'),
      // Q7 BEAT C — her thought
      nar('kt-ch22-l2-q7',
        '"My son is learning what he sees every day."',
        '「我的兒子在學他每天看見的事。」'),
      // Q8 mc paraphrase about mother's plan
      mc('kt-ch22-l2-q8',
        'She knew she had to do something to change things.',
        'What did the mother decide to do?',
        ['stop the boy with shouts', 'change something for her son', 'wait and see for years', 'send him far away'],
        ['用罵的阻止小孩', '為兒子改變些事', '再等很多年看看', '把他送很遠'],
        1,
        '推理: had to change things → 要為兒子改變 (paraphrase)。'),
      // Q9 BEAT D — she looks around the room
      nar('kt-ch22-l2-q9',
        'She looked around the room at all their things.',
        '她環視整個房間,看著他們所有的東西。'),
      // Q10 emoji — what she will do
      emoji('kt-ch22-l2-q10',
        'What will the mother most likely do next?',
        'What will the mother do?',
        ['😴 take a long nap', '📦 pack and move home', '🛒 buy new toys', '✏️ write a long letter'],
        ['長時間睡覺', '收拾搬家', '買新玩具', '寫長信'],
        1,
        '環顧家裡 + 要改變 → 收拾搬家 (B3 線索)。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch22-l2-q11',
        'That night, she made a quiet decision...',
        '那天晚上,她做了一個安靜的決定……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch22-3: Move to the market (B5 道德兩難)
  // Hook: 搬到市場附近 → 孟子又學了什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch22-l3', chapter: 22, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'mencius-mother',
    storyBeat: '搬到市場 — 孟子看人們買賣',
    questions: [
      vocabIntro('kt-ch22-l3-q1', [
        ['地方', 'place'],
        ['打包', 'pack'],
        ['搬', 'move'],
        ['市場', 'market'],
      ]),
      // Q2 BEAT A
      nar('kt-ch22-l3-q2',
        '"This is not the right place for my son to learn."',
        '「這不是適合我兒子學習的地方。」'),
      // Q3 mc paraphrase about packing
      mc('kt-ch22-l3-q3',
        'She packed their things into two big cloth bags.',
        'What did the mother do first?',
        ['bought a new wooden cart', 'put their things into bags', 'sat down to wait', 'called all their friends'],
        ['買新木車', '把東西放進袋子', '坐下等', '叫所有朋友'],
        1,
        '推理: packed into bags → 把東西放進袋子 (paraphrase)。'),
      // Q4 TF inference (action — she chose a busy place)
      tf('kt-ch22-l3-q4',
        'They moved to a small house near a busy market.',
        '他們搬到一個熱鬧市場旁的小房子。',
        'Was the new place full of people and noise?', 'Y',
        '推理: busy market → 人多吵鬧 → 答 Yes'),
      // Q5 BEAT B — what he sees now
      nar('kt-ch22-l3-q5',
        'Meng watched people buy and sell all day long.',
        '孟子整天看人們買東西、賣東西。'),
      // Q6 mc paraphrase about market scene
      mc('kt-ch22-l3-q6',
        'Sellers held up fish, fruit, and bread for the people.',
        'What did the sellers in the market do?',
        ['fixed broken homes', 'showed their things for sale', 'taught small classes', 'sang quiet songs'],
        ['修壞房子', '把東西拿出來賣', '教小班', '唱輕聲歌'],
        1,
        '推理: held up fish/fruit/bread → 把東西拿出來賣 (paraphrase)。'),
      // Q7 BEAT C — Meng learns again
      nar('kt-ch22-l3-q7',
        'Soon Meng began to copy them in their yard.',
        '不久後,孟子開始在他們的院子裡學他們。'),
      // Q8 mc paraphrase about what he copied
      mc('kt-ch22-l3-q8',
        'He held up sticks and called out, just like the sellers.',
        'What was Meng copying from the market?',
        ['the way sellers called out prices', 'how children played at school', 'how birds flew in the sky', 'the songs of old men'],
        ['賣家叫賣的方式', '小孩在學校怎麼玩', '鳥怎麼在天上飛', '老人的歌'],
        0,
        '推理: held up sticks + called out → 學賣家叫賣 (paraphrase)。'),
      // Q9 BEAT D — same problem
      nar('kt-ch22-l3-q9',
        'His mother heard him from inside the house.',
        '媽媽在屋裡聽見他。'),
      // Q10 emoji — the same lesson
      emoji('kt-ch22-l3-q10',
        'What is happening to Meng again?',
        'What is happening?',
        ['📖 he is reading books', '🪞 he learns from what is near', '🌙 he sleeps all day', '🍎 he is hungry'],
        ['他在讀書', '他學身邊看到的', '他整天睡覺', '他餓了'],
        1,
        '又學身邊的事 → 環境再次塑造他 (回響 B6)。'),
      // Q11 HOOK — B5 道德兩難 (move again?)
      nar('kt-ch22-l3-q11',
        'She stopped her weaving. She thought hard...',
        '她停下織布。她認真地想……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch22-4: Calling out prices, mother decides (B4 期待加速)
  // Hook: 媽媽看到他學叫賣 → 該再搬嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch22-l4', chapter: 22, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'mencius-mother',
    storyBeat: '孟子叫賣 — 媽媽決定再搬一次',
    questions: [
      vocabIntro('kt-ch22-l4-q1', [
        ['錢', 'coin'],
        ['喊', 'shout'],
        ['院子', 'yard'],
        ['聽見', 'hear'],
      ]),
      // Q2 BEAT A
      nar('kt-ch22-l4-q2',
        '"Two for one coin! Fresh today!" Meng shouted.',
        '「兩個一塊!今天新鮮!」孟子大喊。'),
      // Q3 mc paraphrase about his shout
      mc('kt-ch22-l4-q3',
        'He waved his small sticks like seller goods.',
        'What was Meng pretending to do?',
        ['cook lunch for friends', 'sell things to people', 'paint a big picture', 'count tall trees'],
        ['幫朋友煮午餐', '賣東西給人', '畫大圖', '數高樹'],
        1,
        '推理: waved sticks like seller goods → 假裝賣東西 (paraphrase)。'),
      // Q4 TF inference (action — mother stops her work)
      tf('kt-ch22-l4-q4',
        'His mother put down her cloth right away.',
        '媽媽馬上放下她的布。',
        'Did the mother stop her work as soon as she heard him?', 'Y',
        '推理: put down right away → 馬上停 → 答 Yes'),
      // Q5 BEAT B — her thought
      nar('kt-ch22-l4-q5',
        '"He learns what he sees. He sees what is near."',
        '「他學他看到的。他看到的,就是身邊的。」'),
      // Q6 mc paraphrase about her insight
      mc('kt-ch22-l4-q6',
        'She understood that the place was teaching him.',
        'What did the mother understand?',
        ['her son was very lazy', 'where you live teaches you', 'shouting was bad luck', 'sticks were dangerous toys'],
        ['兒子很懶', '住的地方在教你', '喊叫不吉利', '樹枝是危險玩具'],
        1,
        '推理: place was teaching → 環境在教 (paraphrase, 主題核心)。'),
      // Q7 BEAT C — second move
      nar('kt-ch22-l4-q7',
        'She knew it was time to move once more.',
        '她知道,是時候再搬一次了。'),
      // Q8 mc paraphrase about how many times
      mc('kt-ch22-l4-q8',
        'This would be the third house they had lived in.',
        'How many houses will the family have lived in?',
        ['only one house', 'two houses total', 'three houses in all', 'four or more'],
        ['只一間', '兩間', '三間', '四間以上'],
        2,
        '推理: third house → 三間 (paraphrase)。'),
      // Q9 BEAT D — she starts packing
      nar('kt-ch22-l4-q9',
        'She started packing again with steady, calm hands.',
        '她又開始打包,手又穩又安靜。'),
      // Q10 emoji — her feeling
      emoji('kt-ch22-l4-q10',
        'How does the mother feel about moving again?',
        'How does she feel?',
        ['😡 angry at her son', '💪 firm and sure', '😢 too tired to try', '😱 scared of change'],
        ['對兒子生氣', '堅定確信', '太累不想試', '怕改變'],
        1,
        '手穩 + 確信時候到了 → 堅定確信 (媽媽的力量)。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch22-l4-q11',
        'But where could they go this time? She had one place in mind...',
        '但這次能搬去哪?她心裡有一個地方……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch22-5: Next to the school (B6 預言種子)
  // Hook: 搬到學校旁 → 孟子開始讀書
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch22-l5', chapter: 22, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'mencius-mother',
    storyBeat: '搬到學校旁 — 孟子開始讀書',
    questions: [
      vocabIntro('kt-ch22-l5-q1', [
        ['第三', 'third'],
        ['學校', 'school'],
        ['早上', 'morning'],
        ['書', 'book'],
      ]),
      // Q2 BEAT A
      nar('kt-ch22-l5-q2',
        'The third house stood right next to a small school.',
        '第三個家就在一所小學校的旁邊。'),
      // Q3 mc paraphrase about location (X2: vary option starts)
      mc('kt-ch22-l5-q3',
        'They could see the school yard from their own door.',
        'How close was the school to their new house?',
        ['far across the river', 'right next to their door', 'on top of a tall hill', 'on a tiny island'],
        ['河對岸很遠', '就在他們門邊', '在高山上', '在小島上'],
        1,
        '推理: right next door + see from door → 就在門邊 (paraphrase)。'),
      // Q4 TF inference (atmosphere — morning sounds)
      tf('kt-ch22-l5-q4',
        'Every morning Meng heard children reading out loud.',
        '每天早上,孟子聽見小孩們大聲朗讀。',
        'Could Meng hear the school from his new home?', 'Y',
        '推理: 每天早上聽見小孩朗讀 → 聽得見 → 答 Yes'),
      // Q5 BEAT B — what teacher says
      nar('kt-ch22-l5-q5',
        'He heard a teacher speak about good and kind ways.',
        '他聽見老師談論善良和正直的方式。'),
      // Q6 mc paraphrase about teacher (X2 vary)
      mc('kt-ch22-l5-q6',
        'The teacher\'s words were calm and full of care.',
        'What was the teacher teaching?',
        ['how to win in fights', 'good ways to live and act', 'how to count coins fast', 'how to catch fish'],
        ['怎麼打架贏', '好的生活和做事方式', '怎麼快速數錢', '怎麼抓魚'],
        1,
        '推理: good and kind ways → 好的生活方式 (paraphrase)。'),
      // Q7 BEAT C — Meng copies again
      nar('kt-ch22-l5-q7',
        'Meng began to copy the words from the school next door.',
        '孟子開始模仿隔壁學校的話。'),
      // Q8 mc paraphrase about what he does now
      mc('kt-ch22-l5-q8',
        'He sat down with a book and read out loud, too.',
        'What did Meng do now that they lived here?',
        ['played games with sticks', 'started reading from a book', 'shouted out prices loudly', 'walked in long lines'],
        ['玩樹枝遊戲', '開始讀書', '大聲叫賣', '走長隊'],
        1,
        '推理: sat with book + read out loud → 開始讀書 (paraphrase)。'),
      // Q9 BEAT D — mother smiles
      nar('kt-ch22-l5-q9',
        'His mother smiled the first wide smile in a long time.',
        '媽媽露出很久以來第一次的大大笑容。'),
      // Q10 emoji — the working theme
      emoji('kt-ch22-l5-q10',
        'What does this house teach Meng?',
        'What does this house teach?',
        ['💰 how to sell', '⚔️ how to fight', '📖 how to learn', '🎵 how to dance'],
        ['怎麼賣東西', '怎麼打架', '怎麼學習', '怎麼跳舞'],
        2,
        '聽朗讀 + 拿書讀 → 怎麼學習 (環境終於對了)。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch22-l5-q11',
        'But one afternoon, Meng came home much earlier than the other children...',
        '但有一天下午,孟子比其他孩子早很多回家……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch22-6: Mother cuts the cloth (B2 情緒翻轉)
  // Hook: 媽媽剪斷織布 → 為什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch22-l6', chapter: 22, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'mencius-mother',
    storyBeat: '媽媽剪斷織布 — 用行動教持之以恆',
    questions: [
      vocabIntro('kt-ch22-l6-q1', [
        ['學習', 'study'],
        ['織布機', 'loom'],
        ['織', 'weave'],
        ['刀', 'knife'],
      ]),
      // Q2 BEAT A
      nar('kt-ch22-l6-q2',
        'One day Meng came home early. He did not want to study.',
        '有一天,孟子提早回家。他不想念書。'),
      // Q3 mc paraphrase about why he came home
      mc('kt-ch22-l6-q3',
        'He had grown tired of his books and his lessons.',
        'Why did Meng come home early?',
        ['the school was on fire', 'he was tired of studying', 'his mother had called him', 'he had won a small prize'],
        ['學校失火', '他厭倦念書', '媽媽叫他', '他贏了小獎'],
        1,
        '推理: grown tired of books → 厭倦念書 (paraphrase)。'),
      // Q4 TF inference (atmosphere — mother is calm but serious)
      tf('kt-ch22-l6-q4',
        'His mother sat at her loom. She did not speak.',
        '媽媽坐在織布機前。她沒有說話。',
        'Was the mother shouting or angry out loud?', 'N',
        '推理: did not speak → 沒大聲 / 沒生氣 → 答 No'),
      // Q5 BEAT B — she takes knife
      nar('kt-ch22-l6-q5',
        'Without a word, she took her knife.',
        '一句話也沒說,她拿起刀。'),
      // Q6 mc paraphrase about what she did
      mc('kt-ch22-l6-q6',
        'She cut the woven cloth in two long pieces.',
        'What did the mother do with her knife?',
        ['ruined her own months of work', 'opened a sealed letter', 'sliced an apple for him', 'pointed it at her son'],
        ['毀掉自己幾個月的工作', '打開信', '切蘋果', '指著兒子'],
        0,
        '推理: cut cloth in two pieces → 毀掉她自己幾個月的工作 (paraphrase)。'),
      // Q7 BEAT C — her lesson
      nar('kt-ch22-l6-q7',
        '"Like this cloth, your study will be broken if you stop."',
        '「就像這塊布,如果你停下來,你的學業也會斷掉。」'),
      // Q8 mc paraphrase about the message
      mc('kt-ch22-l6-q8',
        'Months of weaving were lost in one quick cut.',
        'What was lost when the cloth was cut?',
        ['a small bit of work', 'many months of weaving', 'one quick stitch', 'a soft new shirt'],
        ['一點點工作', '好幾個月的織布', '一針', '一件新軟衣'],
        1,
        '推理: months of weaving → 好幾個月的織布 (paraphrase)。'),
      // Q9 BEAT D — Meng understands
      nar('kt-ch22-l6-q9',
        'Meng stood very still. He understood his mother\'s words.',
        '孟子靜靜站著。他懂了媽媽的話。'),
      // Q10 emoji — mother's teaching style
      emoji('kt-ch22-l6-q10',
        'How did the mother teach her son this time?',
        'How did she teach?',
        ['📢 by shouting loud', '✂️ by showing with action', '📝 by writing a long note', '👋 by sending him away'],
        ['大聲罵', '用行動表演給他看', '寫長信', '把他送走'],
        1,
        '不說話 + 剪布 → 用行動表演 (媽媽的智慧)。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch22-l6-q11',
        'From that day, something changed inside Meng...',
        '從那天起,孟子心裡有什麼變了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch22-7: The great thinker (B6 open)
  // Hook: 孟子成為大思想家 → 媽媽的選擇
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch22-l7', chapter: 22, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'mencius-mother',
    storyBeat: '孟子成為大思想家 — 媽媽的選擇被看見',
    questions: [
      vocabIntro('kt-ch22-l7-q1', [
        ['停', 'stop'],
        ['長大', 'grow'],
        ['偉大', 'great'],
        ['思想家', 'thinker'],
      ]),
      // Q2 BEAT A
      nar('kt-ch22-l7-q2',
        'Meng did not stop again. He read every day.',
        '孟子沒有再停下。他每天都讀書。'),
      // Q3 mc paraphrase about his change
      mc('kt-ch22-l7-q3',
        'For many years, he sat with his books from sunrise to night.',
        'How long did Meng keep on studying?',
        ['only one short week', 'many years in a row', 'a few summer days', 'one winter only'],
        ['只一個禮拜', '連續很多年', '幾天夏天', '只一個冬天'],
        1,
        '推理: many years from sunrise to night → 連續很多年 (paraphrase)。'),
      // Q4 TF inference (action — became great)
      tf('kt-ch22-l7-q4',
        'He grew up and became a great thinker for all of China.',
        '他長大後,成為全中國的偉大思想家。',
        'Did Meng become well known when he grew up?', 'Y',
        '推理: great thinker for all China → 出名 → 答 Yes'),
      // Q5 BEAT B — people tell the story
      nar('kt-ch22-l7-q5',
        'People still tell of his mother who moved three times.',
        '人們至今還在說那個搬了三次家的媽媽。'),
      // Q6 mc paraphrase about her choice
      mc('kt-ch22-l7-q6',
        'She gave up many things so her son could learn well.',
        'What did the mother do for her son?',
        ['gave him lots of toys', 'gave up much for his learning', 'sent him very far away', 'taught him every word'],
        ['給很多玩具', '為他學習放棄很多', '把他送很遠', '每個字教他'],
        1,
        '推理: gave up many things → 為兒子放棄很多 (paraphrase)。'),
      // Q7 BEAT C — what people learned
      nar('kt-ch22-l7-q7',
        'A child learns most from what stands close to home.',
        '孩子學最多的,是身邊最近的事。'),
      // Q8 mc paraphrase about the main lesson
      mc('kt-ch22-l7-q8',
        'What you see every day shapes who you become.',
        'What does this story tell us?',
        ['rich families always win', 'your place around you shapes you', 'old stories are not true', 'mothers should stay quiet'],
        ['有錢家庭總是贏', '你身邊的環境塑造你', '老故事不是真的', '媽媽應該安靜'],
        1,
        '推理: see every day shapes you → 環境塑造你 (主題核心)。'),
      // Q9 BEAT D — homes in mind
      nar('kt-ch22-l7-q9',
        'Many parents today still think about where they live for their children.',
        '今天很多父母還會為了孩子,想著要住在哪。'),
      // Q10 emoji — what's hardest
      emoji('kt-ch22-l7-q10',
        'What was the bravest thing the mother did?',
        'What was her bravest act?',
        ['💪 lifting heavy things', '🏠 changing her own home for him', '🍳 cooking every meal', '🎭 telling many jokes'],
        ['搬重物', '為他改變自己的家', '煮每餐', '說笑話'],
        1,
        '搬家三次 + 剪布 → 為他改變自己的家 (媽媽的勇氣)。'),
      // Q11 HOOK — B6 open (海外華人家長 #1 共鳴)
      nar('kt-ch22-l7-q11',
        'And so people ask: what would you change, for someone you love?...',
        '所以人們會問:為了你愛的人,你會改變什麼?……'),
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
