#!/usr/bin/env node
/**
 * v2.0.B.290+ — Ch24 孔融讓梨 (Kong Rong Shares the Pear,
 * 中華歷史民間, public domain 1800+ years).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern
 * (mirror Ch15 國王的新衣 / Ch21 Anansi B.270+).
 * Source canon: docs/canon/kong-rong.md
 *   (中華歷史民間 7-beat, 孔融 153-208 CE, anecdote >1800 years).
 * Cuts: docs/canon/kong-rong-cuts.md
 *   (B6/B3/B5/B4/B1/B2/B6-open).
 *
 * IP 鐵律:
 *   - Kong Rong (孔融, 153-208 CE) — late Han historical person, descendant
 *     of Confucius. Pear-sharing anecdote first in commentary on Hou Han Shu
 *     (Pei Songzhi 5th-c. citation of 《孔融別傳》). Public domain worldwide
 *     (folk anecdote, no single author, >1800 years).
 *   - A2 自創句式, 不引任何特定譯本 / 蒙學課本 / 兒歌延伸段落.
 *   - NO modern TV / animation / picture book / film adaptation reference.
 *
 * Structure per lesson (11 Q, mirror Ch2 / Ch9 / Ch15 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  listen-mc paraphrase
 *   q4  listen-tf inference
 *   q5  narration / listen-mc detail
 *   q6  listen-mc (paraphrased detail)
 *   q7  narration (transition)
 *   q8  listen-mc (paraphrased detail) / narration
 *   q9  narration (BEAT D)
 *   q10 emoji-pick / narration
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim)
 *   R3 A2 vocab only:
 *      'humble' → 'the small one'
 *      'respectful' → 'kind'
 *      'virtue' → 'good lesson'
 *      'eldest' → 'oldest'
 *      'siblings' → 'older brothers'
 *      'selected' → 'picked'
 *   R4 listen-tf inference (atmosphere / action / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 衝突 / 0 暴力 / 100% 溫馨家庭
 *   - 主題: 分享 / 家庭 / 長幼有序 / 體貼
 *   - 四歲小孩 quiet wisdom — 不是被逼,自己想清楚
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch24.json');

// ─── Helpers (mirror Ch15 / Ch9 / Ch2 範本) ───────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch24', 'kong-rong'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch24', 'kong-rong', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch24', 'kong-rong'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch24', 'kong-rong', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch24', 'kong-rong', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch24-1: Big family + pear plate (B6 預言種子)
  // Hook: 七個兄弟一盤梨 — 怎麼分? 誰會先選?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch24-l1', chapter: 24, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'kong-rong',
    storyBeat: '四歲孔融 + 七兄弟 — 父親拿一盤梨回來',
    questions: [
      vocabIntro('kt-ch24-l1-q1', [
        ['男孩', 'boy'],
        ['年輕的', 'young'],
        ['梨', 'pear'],
        ['盤子', 'plate'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch24-l1-q2',
        'Long ago in China, there lived a boy named Kong Rong.',
        '很久以前,在中國,有一個小男孩,名字叫孔融。'),
      // Q3 mc paraphrase about age + family size
      mc('kt-ch24-l1-q3',
        'He was four years old and the youngest of seven brothers.',
        'How many brothers did Kong Rong have at home?',
        ['only one brother', 'six older brothers', 'no brothers at all', 'three older sisters'],
        ['只有一個兄弟', '六個哥哥', '完全沒兄弟', '三個姊姊'],
        1,
        '推理: youngest of seven → 還有六個哥哥 (paraphrase)。'),
      // Q4 TF inference (atmosphere — quiet warm family evening)
      tf('kt-ch24-l1-q4',
        'The house was warm and the brothers waited at the table.',
        '屋裡很溫暖,兄弟們在桌邊等著。',
        'Was this a calm and warm family moment?', 'Y',
        '推理: 屋裡溫暖 + 兄弟等著 → 平靜溫暖 → 答 Yes'),
      // Q5 BEAT B — father arrives with pears
      nar('kt-ch24-l1-q5',
        'One evening, their father came home with a plate of pears.',
        '一天傍晚,父親帶了一盤梨子回家。'),
      // Q6 listen-mc paraphrase about plate contents
      mc('kt-ch24-l1-q6',
        'The plate had big pears and small pears on it.',
        'What was on the plate?',
        ['pears of different sizes', 'a single small cake', 'only apples and rice', 'fresh bread and milk'],
        ['不同大小的梨子', '一塊小蛋糕', '只有蘋果和飯', '麵包和牛奶'],
        0,
        '推理: big pears and small pears → 不同大小的梨子 (paraphrase)。'),
      // Q7 BEAT C — brothers gather
      nar('kt-ch24-l1-q7',
        'All the brothers came near to look at the plate.',
        '所有兄弟都靠過來看那盤梨子。'),
      // Q8 mc paraphrase about mood
      mc('kt-ch24-l1-q8',
        'Their eyes went straight to the biggest pear of all.',
        'What did the brothers look at first?',
        ['one of the largest pears', 'a window outside', 'their grandfather\'s book', 'an empty rice bowl'],
        ['其中一個最大的梨子', '窗外', '爺爺的書', '空飯碗'],
        0,
        '推理: eyes to biggest → 其中一個最大的梨子 (paraphrase)。'),
      // Q9 BEAT D — quiet anticipation
      nar('kt-ch24-l1-q9',
        'But no one reached out to take a pear yet.',
        '但還沒有人伸手拿梨子。'),
      // Q10 emoji — mood of the room
      emoji('kt-ch24-l1-q10',
        'How did the room feel before anyone picked a pear?',
        'How did the room feel?',
        ['😴 sleepy', '🤔 curious and quiet', '😡 angry', '😱 scared'],
        ['想睡', '好奇又安靜', '生氣', '害怕'],
        1,
        '溫暖家庭 + 等待 → 好奇又安靜 (anticipation)。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch24-l1-q11',
        'Seven boys. One plate of pears. Who would pick first...',
        '七個男孩,一盤梨子。誰會先選呢……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch24-2: Father invites Kong Rong first (B3 資訊缺口)
  // Hook: 大家都看著他 — 他會選哪個?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch24-l2', chapter: 24, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'kong-rong',
    storyBeat: '父親說:「你先選一個」 — 大家看著孔融',
    questions: [
      vocabIntro('kt-ch24-l2-q1', [
        ['桌子', 'table'],
        ['親切', 'kind'],
        ['微笑', 'smile'],
        ['選', 'pick'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch24-l2-q2',
        'The father put the plate down on the family table.',
        '父親把盤子放到家裡的桌上。'),
      // Q3 mc paraphrase about father's gesture
      mc('kt-ch24-l2-q3',
        'He looked at little Kong Rong and gave a kind smile.',
        'How did the father look at Kong Rong?',
        ['with cold eyes', 'in a soft and kind way', 'while looking away', 'with a tired frown'],
        ['冷冷地', '溫柔親切地', '別開視線', '疲倦皺眉'],
        1,
        '推理: kind smile → 溫柔親切 (paraphrase)。'),
      // Q4 TF inference (action — father giving honor to the youngest)
      tf('kt-ch24-l2-q4',
        'The father turned to the smallest child before the others.',
        '父親轉向最小的孩子,在其他人之前。',
        'Did the father want the youngest to choose first?', 'Y',
        '推理: 轉向最小的 + 在其他人之前 → 想讓最小的先選 → 答 Yes'),
      // Q5 BEAT B — father's words
      nar('kt-ch24-l2-q5',
        '"You are the youngest. You may pick first," he said.',
        '「你最小,你可以先選,」他說。'),
      // Q6 mc paraphrase about the offer
      mc('kt-ch24-l2-q6',
        'He told Kong Rong he could choose any pear he liked.',
        'What did the father tell Kong Rong?',
        ['wait until his mother arrived', 'any one of the pears was his choice', 'share with the family dog', 'go back outside and play'],
        ['等媽媽來再說', '哪一顆都可以選', '跟家裡的狗分享', '回外面玩'],
        1,
        '推理: choose any pear → 哪一顆都可以選 (paraphrase)。'),
      // Q7 BEAT C — brothers watch
      nar('kt-ch24-l2-q7',
        'All six brothers turned their heads to watch.',
        '六個哥哥都轉頭看著他。'),
      // Q8 mc paraphrase about brothers' attention
      mc('kt-ch24-l2-q8',
        'Twelve eyes were now on little Kong Rong.',
        'Who was watching Kong Rong now?',
        ['only his mother', 'all his older brothers', 'no one in the room', 'just one brother'],
        ['只有媽媽', '所有哥哥', '沒人', '只有一個哥哥'],
        1,
        '推理: twelve eyes → 六個哥哥 (12 ÷ 2 = 6) → 所有哥哥 (paraphrase)。'),
      // Q9 BEAT D — quiet spotlight
      nar('kt-ch24-l2-q9',
        'No one spoke. The room waited for him to move.',
        '沒有人說話。房間等著他動作。'),
      // Q10 emoji — spotlight feeling
      emoji('kt-ch24-l2-q10',
        'How would a four-year-old feel with all eyes on him?',
        'How would Kong Rong feel?',
        ['🎉 ready to dance', '👀 a bit shy but thinking', '😴 sleepy', '🍔 hungry only'],
        ['想跳舞', '有點害羞但在想', '想睡', '只有餓'],
        1,
        '所有人看著 + 房間等待 → 害羞但在思考 (spotlight)。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch24-l2-q11',
        'Big pears and small pears were waiting on the plate...',
        '盤子上,大梨和小梨都在等著……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch24-3: Big pears vs small pears (B5 道德兩難)
  // Hook: 大的 vs 小的 — 該選哪個?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch24-l3', chapter: 24, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'kong-rong',
    storyBeat: '大梨小梨並排 — 該選哪個?',
    questions: [
      vocabIntro('kt-ch24-l3-q1', [
        ['大的', 'big'],
        ['小的', 'small'],
        ['甜', 'sweet'],
        ['瘦', 'thin'],
      ]),
      // Q2 BEAT A
      nar('kt-ch24-l3-q2',
        'Big pears and small pears sat side by side.',
        '大梨和小梨並排放著。'),
      // Q3 mc paraphrase about biggest pear
      mc('kt-ch24-l3-q3',
        'One pear was the biggest of all. It looked very sweet.',
        'What was special about the biggest pear?',
        ['such a tasty look', 'a tiny black mark', 'green inside', 'a soft fishy smell'],
        ['好吃的樣子', '一個黑色小印', '裡面綠的', '聞起來有點魚味'],
        0,
        '推理: looked very sweet → 好吃的樣子 (paraphrase, 不抄原句)。'),
      // Q4 TF inference (contrast — small pear looks less tasty)
      tf('kt-ch24-l3-q4',
        'One pear was the smallest. It looked a bit thin.',
        '一個梨最小。它看起來有點瘦。',
        'Did the smallest pear look as nice as the biggest?', 'N',
        '推理: 最小的看起來瘦 + 對比最甜的 → 沒那麼好 → 答 No'),
      // Q5 BEAT B — Kong Rong looks
      nar('kt-ch24-l3-q5',
        'Kong Rong looked at the pears for a long moment.',
        '孔融看著梨子,看了好久。'),
      // Q6 mc paraphrase about thinking
      mc('kt-ch24-l3-q6',
        'His small face was quiet but his eyes were full of thought.',
        'What was Kong Rong doing while he looked?',
        ['singing a small song', 'thinking carefully', 'falling asleep', 'eating bread fast'],
        ['唱小歌', '仔細思考', '睡著', '快吃麵包'],
        1,
        '推理: 眼裡充滿思考 → 仔細思考 (paraphrase)。'),
      // Q7 BEAT C — easy choice or hard choice?
      nar('kt-ch24-l3-q7',
        'A four-year-old usually picks the biggest and sweetest.',
        '四歲的小孩通常會選最大最甜的。'),
      // Q8 mc paraphrase about expectation
      mc('kt-ch24-l3-q8',
        'The brothers waited to see Kong Rong grab the big one.',
        'What did the brothers expect to see?',
        ['some quiet sharing first', 'a hand going to the biggest pear', 'a quick walk out of the room', 'a long song at the table'],
        ['先安靜分梨', '手伸向最大的梨', '快速走出房間', '在桌邊唱長歌'],
        1,
        '推理: 哥哥們等著看他拿大的 → 手伸向最大的梨 (paraphrase, 預期)。'),
      // Q9 BEAT D — still thinking
      nar('kt-ch24-l3-q9',
        'But Kong Rong did not move fast like other small kids.',
        '但孔融沒有像其他小孩那樣動得快。'),
      // Q10 emoji — choice tension
      emoji('kt-ch24-l3-q10',
        'What kind of moment was this for Kong Rong?',
        'What kind of moment?',
        ['😅 hard but quiet choice', '🤣 joke time', '😴 nap time', '🎵 music time'],
        ['困難但安靜的選擇', '玩笑時間', '午睡時間', '音樂時間'],
        0,
        '不像別的小孩那樣快 → 困難但安靜的選擇 (moral 兩難)。'),
      // Q11 HOOK — B5 道德兩難
      nar('kt-ch24-l3-q11',
        'Then his small hand began to move toward the plate...',
        '然後,他的小手開始伸向盤子……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch24-4: Kong Rong picks the small one (B4 期待加速)
  // Hook: 為什麼選小的? 父親想聽什麼答案?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch24-l4', chapter: 24, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'kong-rong',
    storyBeat: '孔融伸手選了最小的 — 父親問:「為什麼?」',
    questions: [
      vocabIntro('kt-ch24-l4-q1', [
        ['伸手', 'reach'],
        ['手', 'hand'],
        ['拿', 'take'],
        ['為什麼', 'why'],
      ]),
      // Q2 BEAT A
      nar('kt-ch24-l4-q2',
        'Kong Rong reached out with his small hand.',
        '孔融伸出他的小手。'),
      // Q3 mc paraphrase about what he did NOT do (R2: paraphrase)
      mc('kt-ch24-l4-q3',
        'He did not take the biggest pear.',
        'Did Kong Rong grab the biggest pear?',
        ['yes, the biggest one', 'no, he passed it over', 'he asked his brother to', 'he took two at once'],
        ['有,最大的', '沒有,他跳過了', '請哥哥拿', '一次拿兩個'],
        1,
        '推理: did not take biggest → 沒拿,跳過 (paraphrase)。'),
      // Q4 TF inference (contrast — surprise to family)
      tf('kt-ch24-l4-q4',
        'His brothers raised their eyebrows in soft surprise.',
        '哥哥們輕輕地揚起眉毛,有點驚訝。',
        'Did the brothers expect this choice?', 'N',
        '推理: 揚眉 + 驚訝 → 沒料到 → 答 No'),
      // Q5 BEAT B — picks the small one
      nar('kt-ch24-l4-q5',
        'He picked up the smallest pear from the plate.',
        '他從盤子上拿起最小的梨。'),
      // Q6 mc paraphrase about choice
      mc('kt-ch24-l4-q6',
        'The thin little pear sat lightly in his small hand.',
        'Which pear did Kong Rong end up with?',
        ['the largest and sweetest one', 'one of the smaller ones', 'no fruit at all', 'two soft yellow pears'],
        ['最大最甜的那個', '比較小的其中一個', '完全沒拿', '兩個軟黃梨'],
        1,
        '推理: thin little pear → 比較小的其中一個 (paraphrase, 不抄原句)。'),
      // Q7 BEAT C — father is curious
      nar('kt-ch24-l4-q7',
        'His father leaned forward with gentle eyes.',
        '父親身體微微前傾,眼神溫柔。'),
      // Q8 mc paraphrase about father's question
      mc('kt-ch24-l4-q8',
        '"Why this one, my son?" his father asked softly.',
        'What did the father want to know?',
        ['where the mother was right now', 'his son\'s reason for the small pear', 'why the dog was outside', 'how cold the kitchen was'],
        ['媽媽在哪', '兒子為什麼選小梨', '狗為什麼在外面', '廚房有多冷'],
        1,
        '推理: why this one → 兒子為什麼選小梨 (paraphrase)。'),
      // Q9 BEAT D — quiet wait
      nar('kt-ch24-l4-q9',
        'The room was quiet. Everyone waited for the small boy.',
        '房間很安靜。大家都等著小男孩開口。'),
      // Q10 emoji — anticipation
      emoji('kt-ch24-l4-q10',
        'What did everyone want to hear from Kong Rong?',
        'What did they want to hear?',
        ['🤔 his reason', '🎵 a song', '😴 a yawn', '🍞 a food order'],
        ['他的理由', '一首歌', '一個哈欠', '點餐'],
        0,
        '安靜等小男孩 → 等他的理由 (paraphrase)。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch24-l4-q11',
        'Kong Rong took a small breath and began to speak...',
        '孔融輕輕吸了一口氣,開始說話……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch24-5: "I am the youngest" (B1 情緒)
  // Hook: 父親為什麼笑? 他在想什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch24-l5', chapter: 24, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'kong-rong',
    storyBeat: '孔融說:「我年紀小,應該吃小的」 — 父親微笑',
    questions: [
      vocabIntro('kt-ch24-l5-q1', [
        ['握', 'hold'],
        ['家人', 'family'],
        ['應該', 'should'],
        ['溫暖的', 'warm'],
      ]),
      // Q2 BEAT A
      nar('kt-ch24-l5-q2',
        'Kong Rong held the small pear in his hands.',
        '孔融把小梨握在手裡。'),
      // Q3 mc paraphrase about how he speaks
      mc('kt-ch24-l5-q3',
        'His voice was small but very clear in the room.',
        'How did Kong Rong speak?',
        ['with a very loud shout', 'quietly but easy to hear', 'while still chewing food', 'with no words at all'],
        ['大聲吼', '安靜但聽得清楚', '一邊咬東西', '完全沒說話'],
        1,
        '推理: small but clear → 安靜但聽得清楚 (paraphrase, 不抄原句)。'),
      // Q4 TF inference (action — calm not nervous)
      tf('kt-ch24-l5-q4',
        'His face was calm. He did not look afraid at all.',
        '他的臉很平靜。一點也不害怕。',
        'Was Kong Rong nervous to share his reason?', 'N',
        '推理: 平靜 + 不害怕 → 不緊張 → 答 No'),
      // Q5 BEAT B — first reason
      nar('kt-ch24-l5-q5',
        '"I am the youngest in our family," he said.',
        '「我是家裡最小的,」他說。'),
      // Q6 mc paraphrase about his self-view
      mc('kt-ch24-l5-q6',
        '"I should take the small one, not the big one."',
        'What did Kong Rong say he should take?',
        ['the big and sweet pear', 'the small pear, not the big one', 'two pears for himself', 'no pear today'],
        ['大又甜的梨', '小的,不是大的', '兩個梨自己留', '今天不吃梨'],
        1,
        '推理: small one, not the big → 小的,不是大的 (paraphrase)。'),
      // Q7 BEAT C — father reacts
      nar('kt-ch24-l5-q7',
        'His father smiled a warm smile back at him.',
        '父親回給他一個溫暖的微笑。'),
      // Q8 mc paraphrase about father's heart
      mc('kt-ch24-l5-q8',
        'Something warm moved inside his father\'s chest.',
        'How did the father feel inside?',
        ['cold and angry', 'warm and touched', 'tired and bored', 'hungry and sad'],
        ['又冷又生氣', '溫暖又感動', '疲倦無聊', '又餓又難過'],
        1,
        '推理: warm moved inside chest → 溫暖感動 (paraphrase)。'),
      // Q9 BEAT D — but father wants more
      nar('kt-ch24-l5-q9',
        'But his father wanted to hear one more thing.',
        '但父親還想聽一件事。'),
      // Q10 emoji — father's feeling
      emoji('kt-ch24-l5-q10',
        'How did the father feel about his small son?',
        'How did the father feel?',
        ['🤗 proud and touched', '😡 angry', '😴 sleepy', '😱 scared'],
        ['驕傲又感動', '生氣', '想睡', '害怕'],
        0,
        '溫暖微笑 + 心裡感動 → 驕傲又感動 (paraphrase)。'),
      // Q11 HOOK — B1 情緒
      nar('kt-ch24-l5-q11',
        'The father leaned closer. "And one more question, son..."',
        '父親靠近一點。「再問你一個問題,兒子……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch24-6: "What about your brothers?" (B2 情緒翻轉)
  // Hook: 還有什麼答案? 比剛剛更深嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch24-l6', chapter: 24, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'kong-rong',
    storyBeat: '父親問:「那你哥哥呢?」 — 孔融再答一層',
    questions: [
      vocabIntro('kt-ch24-l6-q1', [
        ['輕柔的', 'soft'],
        ['聲音', 'voice'],
        ['較大的', 'older'],
        ['想', 'think'],
      ]),
      // Q2 BEAT A
      nar('kt-ch24-l6-q2',
        'The father asked again with a soft voice.',
        '父親再次用輕柔的聲音問。'),
      // Q3 mc paraphrase about father's tone
      mc('kt-ch24-l6-q3',
        'His voice was gentle, like he was teaching a lesson.',
        'How did the father ask the next question?',
        ['loud and angry', 'gently, like a teacher', 'with cold eyes', 'while eating bread'],
        ['大聲生氣', '溫柔像老師', '冷眼', '邊吃麵包'],
        1,
        '推理: gentle like teaching → 溫柔像老師 (paraphrase)。'),
      // Q4 TF inference (action — second question is deeper)
      tf('kt-ch24-l6-q4',
        'The father wanted to know if his son had thought even more.',
        '父親想知道兒子有沒有想得更深。',
        'Was the father testing how deep Kong Rong\'s thinking went?', 'Y',
        '推理: 想知道有沒有想更深 → 在測思考深度 → 答 Yes'),
      // Q5 BEAT B — the question
      nar('kt-ch24-l6-q5',
        '"And what about your six older brothers?"',
        '「那你六個哥哥呢?」'),
      // Q6 mc paraphrase about what is being asked
      mc('kt-ch24-l6-q6',
        'The father wanted to know what Kong Rong thought about them.',
        'What did the father ask about now?',
        ['the family dog', 'his older brothers', 'the rice for dinner', 'the broken window'],
        ['家裡的狗', '哥哥們', '晚餐的飯', '壞掉的窗戶'],
        1,
        '推理: about your brothers → 哥哥們 (paraphrase, 不能直接 copy)。'),
      // Q7 BEAT C — Kong Rong thinks
      nar('kt-ch24-l6-q7',
        'Kong Rong thought for a moment and looked up.',
        '孔融想了一下,抬起頭。'),
      // Q8 mc paraphrase about his composure
      mc('kt-ch24-l6-q8',
        'He did not need much time to find the words.',
        'How long did Kong Rong need to think?',
        ['a whole hour', 'not very long', 'until the next day', 'until his mother came'],
        ['一整個小時', '不太久', '到隔天', '到媽媽來'],
        1,
        '推理: 不需要太多時間 → 不太久 (paraphrase)。'),
      // Q9 BEAT D — he answers
      nar('kt-ch24-l6-q9',
        'He gave a simple and clear answer.',
        '他給了一個簡單清楚的答案。'),
      // Q10 emoji — answer quality
      emoji('kt-ch24-l6-q10',
        'What kind of answer was Kong Rong about to give?',
        'What kind of answer?',
        ['💡 simple but wise', '🤣 funny joke', '😴 sleepy mumble', '😡 angry shout'],
        ['簡單但有智慧', '搞笑笑話', '想睡含糊', '生氣大吼'],
        0,
        '簡單清楚 + 父親教學 → 簡單但有智慧 (paraphrase)。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch24-l6-q11',
        'The whole family leaned in to hear what he would say...',
        '全家人靠過來,想聽他要說什麼……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch24-7: "They are bigger" - lesson learned (B6 open)
  // Hook: 你會學到什麼? 你家的小弟弟妹妹呢?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch24-l7', chapter: 24, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'kong-rong',
    storyBeat: '「哥哥比我大,應該吃大的」 — 全家學到一課',
    questions: [
      vocabIntro('kt-ch24-l7-q1', [
        ['更大', 'bigger'],
        ['比', 'than'],
        ['開心的', 'happy'],
        ['學', 'learn'],
      ]),
      // Q2 BEAT A
      nar('kt-ch24-l7-q2',
        '"My brothers are bigger than me," Kong Rong said.',
        '「我哥哥比我大,」孔融說。'),
      // Q3 mc paraphrase about size logic
      mc('kt-ch24-l7-q3',
        'He pointed at himself and then at his older brothers.',
        'What did Kong Rong compare?',
        ['the size of bodies in the family', 'a pair of warm shoes', 'two kinds of school books', 'rice bowls on the shelf'],
        ['家裡人的身材大小', '一雙暖鞋', '兩種學校書', '架上的飯碗'],
        0,
        '推理: 指自己再指哥哥 → 家裡人的身材大小 (paraphrase)。'),
      // Q4 TF inference (action — child's clear logic)
      tf('kt-ch24-l7-q4',
        'His logic was simple. Bigger bodies need bigger pears.',
        '他的道理很簡單。大的身體需要大的梨。',
        'Was Kong Rong\'s reason easy for a child to understand?', 'Y',
        '推理: simple logic + child-friendly → 容易懂 → 答 Yes'),
      // Q5 BEAT B — the moral line
      nar('kt-ch24-l7-q5',
        '"They should take the big pears, not me."',
        '「他們應該拿大的梨,不是我。」'),
      // Q6 mc paraphrase about Kong Rong's full message
      mc('kt-ch24-l7-q6',
        'The small boy gave the big pears to his older brothers.',
        'What was Kong Rong saying in two lines together?',
        ['big ones for the older, small one for me', 'all the pears are mine alone', 'no one should eat any pears', 'pears are only for the parents'],
        ['大的給哥哥,小的給我', '所有梨都是我的', '沒人能吃梨', '梨只給爸媽'],
        0,
        '推理: 兩句合起來 → 大的給哥哥,小的留我 (paraphrase, 完整論點)。'),
      // Q7 BEAT C — father is speechless
      nar('kt-ch24-l7-q7',
        'The father was so happy he could not speak.',
        '父親開心到說不出話。'),
      // Q8 mc paraphrase about father's reaction
      mc('kt-ch24-l7-q8',
        'His eyes were bright. He put a hand on Kong Rong\'s head.',
        'How did the father show his feeling?',
        ['by leaving the table', 'with bright eyes and a soft touch', 'by shouting at the brothers', 'by hiding the pears away'],
        ['離開桌子', '眼睛發亮,輕拍頭', '對哥哥吼', '把梨藏起來'],
        1,
        '推理: bright eyes + hand on head → 眼睛發亮 + 輕拍 (paraphrase)。'),
      // Q9 BEAT D — family lesson
      nar('kt-ch24-l7-q9',
        'That night the family learned a small but big lesson.',
        '那晚,全家學到一個小小但很大的功課。'),
      // Q10 emoji — moral takeaway
      emoji('kt-ch24-l7-q10',
        'What did the family learn that night?',
        'What did they learn?',
        ['🍐 to share with the family', '🏃 to run fast', '🎵 to sing songs', '😴 to sleep early'],
        ['跟家人分享', '跑得快', '唱歌', '早睡'],
        0,
        '孔融讓梨 → 分享 / 體貼家人 (paraphrase, theme)。'),
      // Q11 HOOK — B6 open (你家?)
      nar('kt-ch24-l7-q11',
        'Long after that night, the story was told again and again...',
        '那晚之後很久,這個故事還是一遍又一遍地被傳下去……'),
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
