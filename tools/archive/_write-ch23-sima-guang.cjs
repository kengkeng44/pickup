#!/usr/bin/env node
/**
 * v2.0.B.280+ — Ch23 司馬光砸缸 (Sima Guang Breaks the Jar,
 * Chinese folk legend attached to Sima Guang 1019-1086 CE,
 * recorded 宋史 1345 CE + earlier oral, public domain worldwide).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern
 * (mirror Ch15 國王的新衣 ship B.262+).
 * Source canon: docs/canon/sima-guang.md
 *   (7-beat, 公有領域 >900 年).
 * Cuts: docs/canon/sima-guang-cuts.md
 *   (B6/B3/B5/B4/B1/B2/B6-open).
 *
 * IP 鐵律:
 *   - Source: 司馬光 (1019-1086 CE), 砸缸 anecdote in Song Shi (宋史,
 *     1345 CE Yuan dynasty official history) + earlier 12th-century
 *     oral gentry-class memory. Life + 70 = PD globally since 1156 CE.
 *     Over 900 years in the public domain.
 *   - A2 自創句式, 不引任何特定譯本 / 教科書 / 課文 / 課本 延伸段落.
 *   - NO modern Chinese textbook / 動畫 / 繪本 adaptation reference.
 *
 * Structure per lesson (11 Q, mirror Ch2/Ch9/Ch15 範本):
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
 *      'drown' / 'drowning' → 'could not breathe' / 'going under water'
 *      'died' → never used (friend is saved)
 *      'smashed' → 'broke' / 'cracked'
 *      'vessel' / 'urn' / 'cistern' → 'big water jar'
 *      'genius' → 'smart' / 'clever'
 *      'peers' / 'companions' → 'friends' / 'the other children'
 *   R4 listen-tf inference (atmosphere / action / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 死亡: 朋友被救出, no graphic violence
 *   - 智取主題: 急時用聰明 — 兒童最愛智取題材
 *   - 中華歷史民間 portfolio coverage (跟 Ch7/Ch10/Ch11/Ch12 一組)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch23.json');

// ─── Helpers (mirror Ch15/Ch9/Ch2 範本) ────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch23', 'sima-guang'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch23', 'sima-guang', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch23', 'sima-guang'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch23', 'sima-guang', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch23', 'sima-guang', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch23-1: Children play in garden (B6 預言種子)
  // Hook: 一群小孩在花園玩 — 危險將至?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch23-l1', chapter: 23, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'sima-guang',
    storyBeat: '一群小孩在花園玩 — 一個小司馬光在看',
    questions: [
      vocabIntro('kt-ch23-l1-q1', [
        ['花園', 'garden'],
        ['玩', 'play'],
        ['一群', 'group'],
        ['男孩', 'boy'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch23-l1-q2',
        'Long ago in old China, a group of children played in a big garden.',
        '很久以前的中國,有一群小孩在大花園裡玩。'),
      // Q3 mc paraphrase about weather (X3: paraphrase, not verbatim)
      mc('kt-ch23-l1-q3',
        'The sun was warm. The trees were tall.',
        'What was the day like in the garden?',
        ['cold and rainy', 'warm with tall trees', 'dark and windy', 'snowy and grey'],
        ['冷又下雨', '溫暖有高樹', '又黑又有風', '下雪灰灰的'],
        1,
        '推理: warm sun + tall trees → 溫暖有高樹 (paraphrase)。'),
      // Q4 TF inference (action — happy mood)
      tf('kt-ch23-l1-q4',
        'The children ran and laughed under the warm sun.',
        '小孩們在溫暖的陽光下跑步和大笑。',
        'Were the children having a good time?', 'Y',
        '推理: 跑步 + 大笑 → 開心 → 答 Yes'),
      // Q5 BEAT B — introduce Sima Guang
      nar('kt-ch23-l1-q5',
        'Among them was a small boy named Sima Guang.',
        '其中有一個小男孩,叫做司馬光。'),
      // Q6 listen-mc paraphrase about Sima Guang's personality
      mc('kt-ch23-l1-q6',
        'He was quiet but he watched everything with bright eyes.',
        'What was Sima Guang like as a boy?',
        ['loud and busy', 'quiet but watchful', 'angry at his friends', 'always sleeping'],
        ['吵又忙', '安靜但很留意', '對朋友生氣', '一直睡'],
        1,
        '推理: quiet + watched everything → 安靜但很留意 (paraphrase)。'),
      // Q7 BEAT C — children all over the place
      nar('kt-ch23-l1-q7',
        'Some children ran. Some sat on the grass. Some climbed low trees.',
        '有些小孩在跑。有些坐在草地上。有些爬矮樹。'),
      // Q8 mc paraphrase about scene
      mc('kt-ch23-l1-q8',
        'The garden was big and full of happy noise.',
        'How did the garden feel that day?',
        ['empty and silent', 'big and full of fun', 'small and dark', 'cold and locked up'],
        ['空又靜', '又大又好玩', '小又黑', '冷又被鎖住'],
        1,
        '推理: big + happy noise → 又大又好玩 (paraphrase)。'),
      // Q9 BEAT D — Sima Guang watches
      nar('kt-ch23-l1-q9',
        'Sima Guang stood at the side and looked around at his friends.',
        '司馬光站在旁邊,看著他的朋友們。'),
      // Q10 emoji — Sima Guang's mood
      emoji('kt-ch23-l1-q10',
        'How did Sima Guang look while he watched?',
        'How did he look?',
        ['😴 sleepy', '👀 watchful', '😡 angry', '😱 scared'],
        ['想睡', '很留意', '生氣', '害怕'],
        1,
        '安靜但留意 → 很留意 (paraphrase)。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch23-l1-q11',
        'In one corner of the garden stood something very big...',
        '花園的一個角落,有一樣很大的東西……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch23-2: Big water jar, boy climbs (B3 資訊缺口)
  // Hook: 一個小孩爬大水缸 — 結果如何?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch23-l2', chapter: 23, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'sima-guang',
    storyBeat: '一個小孩爬上大水缸 — 想看裡面',
    questions: [
      vocabIntro('kt-ch23-l2-q1', [
        ['角落', 'corner'],
        ['水缸', 'jar'],
        ['高', 'tall'],
        ['爬', 'climb'],
      ]),
      // Q2 BEAT A — the jar
      nar('kt-ch23-l2-q2',
        'In one corner of the garden stood a very big water jar.',
        '花園的一個角落,有一個很大的水缸。'),
      // Q3 mc paraphrase about jar size (X2: vary option starts)
      mc('kt-ch23-l2-q3',
        'It was taller than the children and full of water to the top.',
        'How big was the water jar?',
        ['smaller than a hand', 'taller than the kids', 'just below the knee', 'as big as a cup'],
        ['比手還小', '比小孩還高', '剛在膝蓋下面', '像杯子一樣大'],
        1,
        '推理: taller than children → 比小孩還高 (paraphrase)。'),
      // Q4 TF inference (action — full to top = heavy water)
      tf('kt-ch23-l2-q4',
        'The water inside reached all the way to the top.',
        '裡面的水滿到頂端。',
        'Was the jar nearly empty?', 'N',
        '推理: 水滿到頂端 → 不是空的 → 答 No'),
      // Q5 BEAT B — curious boy
      nar('kt-ch23-l2-q5',
        'One boy looked up at the jar and wanted to see inside.',
        '一個小孩抬頭看那水缸,想看看裡面。'),
      // Q6 mc paraphrase about boy's curiosity
      mc('kt-ch23-l2-q6',
        'He stretched his neck and could not see the top.',
        'Why did the boy want to climb?',
        ['for a hidden coin', 'curious about the inside', 'just to fall on purpose', 'making a loud sound'],
        ['找藏起來的硬幣', '想看看裡面', '故意跌下去', '弄出大聲音'],
        1,
        '推理: wanted to see inside → 想看看裡面 (paraphrase)。'),
      // Q7 BEAT C — he starts climbing
      nar('kt-ch23-l2-q7',
        'He began to climb the side of the big water jar.',
        '他開始爬上大水缸的側面。'),
      // Q8 mc paraphrase about climbing
      mc('kt-ch23-l2-q8',
        'His small feet found bumps on the side of the jar.',
        'How was the boy going up the jar?',
        ['flying with wings', 'using his small feet', 'lifted by an adult', 'with a tall ladder'],
        ['用翅膀飛', '用他的小腳', '大人抱上去', '用高梯子'],
        1,
        '推理: small feet found bumps → 用他的小腳 (paraphrase)。'),
      // Q9 BEAT D — danger feel
      nar('kt-ch23-l2-q9',
        'The other children watched and stopped their games.',
        '其他小孩看著,停下他們的遊戲。'),
      // Q10 emoji — atmosphere
      emoji('kt-ch23-l2-q10',
        'What did the air feel like in that moment?',
        'How did the moment feel?',
        ['🎉 fun and easy', '😬 risky and tight', '😴 boring', '🍔 hungry'],
        ['好玩又輕鬆', '有風險又緊', '無聊', '餓'],
        1,
        '所有小孩停下遊戲看 → 有風險又緊 (paraphrase)。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch23-l2-q11',
        'The boy reached the very top edge of the big jar...',
        '小孩爬到大水缸的最頂端……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch23-3: Boy falls in, water closes over head (B5 道德兩難)
  // Hook: 小孩掉進水缸 — 大家會怎樣?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch23-l3', chapter: 23, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'sima-guang',
    storyBeat: '小孩掉進水缸 — 大家會怎樣?',
    questions: [
      vocabIntro('kt-ch23-l3-q1', [
        ['頂端', 'top'],
        ['滑', 'slip'],
        ['跌', 'fall'],
        ['水', 'water'],
      ]),
      // Q2 BEAT A — at the top
      nar('kt-ch23-l3-q2',
        'The boy reached the top edge of the jar.',
        '小孩爬到水缸的頂端。'),
      // Q3 mc paraphrase about smile
      mc('kt-ch23-l3-q3',
        'For a moment he sat on the rim and smiled down at his friends.',
        'What did the boy do at the very top?',
        ['shouted for help', 'rested and looked happy', 'climbed back down fast', 'jumped to a tree'],
        ['大喊救命', '坐著很開心', '快爬下去', '跳到樹上'],
        1,
        '推理: sat + smiled down → 坐著很開心 (paraphrase, 不重複 sentence 用字)。'),
      // Q4 TF inference (action — slip = unexpected)
      tf('kt-ch23-l3-q4',
        'Then his foot suddenly slipped without any warning.',
        '然後他的腳突然滑了一下,沒有預警。',
        'Did the boy plan to fall in?', 'N',
        '推理: foot slipped + no warning → 不是計畫好的 → 答 No'),
      // Q5 BEAT B — splash
      nar('kt-ch23-l3-q5',
        'He fell into the water with a loud splash.',
        '他「噗通」一聲掉進水裡。'),
      // Q6 mc paraphrase about danger (drown → could not breathe)
      mc('kt-ch23-l3-q6',
        'The water closed over his head. He could not breathe.',
        'What was happening to the boy in the water?',
        ['swimming for fun', 'going under water', 'floating happily', 'standing on the bottom'],
        ['快樂游泳', '正在下沉', '開心漂浮', '站在水底'],
        1,
        '推理: water closed over head + could not breathe → 正在下沉 (paraphrase, 兒童 friendly framing)。'),
      // Q7 BEAT C — friends shocked
      nar('kt-ch23-l3-q7',
        'The other children stopped playing and stared with wide eyes.',
        '其他小孩停下遊戲,瞪大眼睛看。'),
      // Q8 mc paraphrase about shock
      mc('kt-ch23-l3-q8',
        'No one had ever seen something like this before.',
        'How did the other children look in that moment?',
        ['calm and ready', 'shocked and frozen', 'happy and laughing', 'angry and shouting'],
        ['冷靜又準備好', '震驚又僵住', '開心又大笑', '生氣又大叫'],
        1,
        '推理: stared with wide eyes + never seen → 震驚又僵住 (paraphrase)。'),
      // Q9 BEAT D — cries for help
      nar('kt-ch23-l3-q9',
        '"Help! Help!" they cried, but no grown-up was close by.',
        '「救命!救命!」他們大喊,但附近沒有大人。'),
      // Q10 emoji — feeling
      emoji('kt-ch23-l3-q10',
        'How did the children feel when no adult came?',
        'How did they feel?',
        ['😊 happy', '😰 scared and lost', '😴 sleepy', '🎵 calm'],
        ['開心', '害怕又不知所措', '想睡', '冷靜'],
        1,
        '大喊救命 + 沒大人 → 害怕又不知所措。'),
      // Q11 HOOK — B5 道德兩難
      nar('kt-ch23-l3-q11',
        'Most of the children turned and ran out of the garden...',
        '大部分小孩轉身跑出花園……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch23-4: Others run for adults — time pressure (B4 期待加速)
  // Hook: 其他孩子都跑走找大人 — 來得及嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch23-l4', chapter: 23, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'sima-guang',
    storyBeat: '其他孩子都跑走找大人 — 來得及嗎?',
    questions: [
      vocabIntro('kt-ch23-l4-q1', [
        ['跑', 'run'],
        ['路', 'path'],
        ['大人', 'adult'],
        ['遠', 'far'],
      ]),
      // Q2 BEAT A
      nar('kt-ch23-l4-q2',
        'Most of the children turned and ran out of the garden to find an adult.',
        '大部分的小孩轉身跑出花園去找大人。'),
      // Q3 mc paraphrase about running
      mc('kt-ch23-l4-q3',
        'Their small feet ran fast on the path.',
        'How were the children moving on the path?',
        ['walking very slow', 'running as fast as they could', 'sitting and waiting', 'climbing a low wall'],
        ['走得很慢', '盡力跑得快', '坐著等', '爬矮牆'],
        1,
        '推理: small feet ran fast → 盡力跑得快 (paraphrase)。'),
      // Q4 TF inference (contrast — fast feet but far gate = not enough)
      tf('kt-ch23-l4-q4',
        'They ran fast, but the garden gate was very far away.',
        '他們跑得很快,但花園的門離得很遠。',
        'Would help come back in time?', 'N',
        '推理: 跑得快 但門很遠 → 來不及 → 答 No'),
      // Q5 BEAT B — boy in water
      nar('kt-ch23-l4-q5',
        'Back at the jar, the boy was still under the water.',
        '回到水缸旁,小孩還在水裡。'),
      // Q6 mc paraphrase about urgency
      mc('kt-ch23-l4-q6',
        'Every second, the water held him tighter.',
        'What was happening to the boy now?',
        ['he was getting out by himself', 'time was running out for him', 'he was learning to swim', 'he was making bubbles for fun'],
        ['他自己出來了', '時間快沒了', '他在學游泳', '他開心吐泡泡'],
        1,
        '推理: every second + held tighter → 時間快沒了 (paraphrase, 急迫感)。'),
      // Q7 BEAT C — the path is long
      nar('kt-ch23-l4-q7',
        'The path to the front gate was long and full of corners.',
        '通到大門的路很長,而且有很多轉彎。'),
      // Q8 mc paraphrase about delay
      mc('kt-ch23-l4-q8',
        'Even fast feet would take many minutes to come back.',
        'How long would help take to arrive?',
        ['just one second', 'a long while', 'a whole day', 'never at all'],
        ['一秒', '好一段時間', '一整天', '永遠不會'],
        1,
        '推理: many minutes → 好一段時間 (paraphrase, 不重複 sentence 用字)。'),
      // Q9 BEAT D — silence at the jar
      nar('kt-ch23-l4-q9',
        'The garden grew very quiet around the big jar.',
        '大水缸周圍的花園變得很安靜。'),
      // Q10 emoji — atmosphere
      emoji('kt-ch23-l4-q10',
        'What was the mood near the big jar?',
        'How did it feel?',
        ['🎉 party', '⏳ time running out', '😴 sleepy', '🌧️ rainy'],
        ['派對', '時間快沒了', '想睡', '下雨'],
        1,
        '小孩在水裡 + 大人遠 → 時間快沒了 (urgency)。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch23-l4-q11',
        'But one small boy did not run with the others...',
        '但有一個小男孩沒有跟其他人一起跑……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch23-5: Sima Guang stays, thinks (B1 物理懸念)
  // Hook: 司馬光留下沒跑 — 他想做什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch23-l5', chapter: 23, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'sima-guang',
    storyBeat: '司馬光留下沒跑 — 他想做什麼?',
    questions: [
      vocabIntro('kt-ch23-l5-q1', [
        ['留下', 'stay'],
        ['看', 'look'],
        ['短', 'short'],
        ['想', 'think'],
      ]),
      // Q2 BEAT A
      nar('kt-ch23-l5-q2',
        'One small boy did not run with the others.',
        '有一個小男孩沒有跟其他人一起跑。'),
      // Q3 mc paraphrase about who
      mc('kt-ch23-l5-q3',
        'It was the quiet one with the bright eyes.',
        'Who was the boy who stayed?',
        ['the loud leader', 'Sima Guang the quiet one', 'a grown-up gardener', 'the boy in the water'],
        ['吵的領頭', '安靜的司馬光', '大人園丁', '在水裡的小孩'],
        1,
        '推理: quiet one + bright eyes → 安靜的司馬光 (paraphrase, 連結 L1)。'),
      // Q4 TF inference (action — stayed = different choice)
      tf('kt-ch23-l5-q4',
        'He stood by the jar instead of running away.',
        '他站在水缸旁邊,沒有跑走。',
        'Did Sima Guang make the same choice as the others?', 'N',
        '推理: stayed + 沒跑走 → 跟別人不同 → 答 No'),
      // Q5 BEAT B — looking
      nar('kt-ch23-l5-q5',
        'Sima Guang stayed by the big jar, looking at the water.',
        '司馬光留在大水缸旁,看著水。'),
      // Q6 mc paraphrase about urgency in his mind
      mc('kt-ch23-l5-q6',
        'His friend was going under, and time was very short.',
        'What did Sima Guang know in that moment?',
        ['help would come fast', 'time was running out', 'his friend was safe', 'it was time for lunch'],
        ['幫忙會很快來', '時間快沒了', '朋友很安全', '吃午餐時間'],
        1,
        '推理: friend going under + time very short → 時間快沒了 (paraphrase, urgency)。'),
      // Q7 BEAT C — thinking
      nar('kt-ch23-l5-q7',
        '"An adult will not come fast enough," he thought to himself.',
        '「大人來不及來,」他在心裡想。'),
      // Q8 mc paraphrase about his idea
      mc('kt-ch23-l5-q8',
        'He could not wait. He had to do something now.',
        'What did Sima Guang decide?',
        ['wait for the grown-ups', 'act on his own at once', 'climb up the jar too', 'sit and cry'],
        ['等大人', '自己馬上動手', '也爬上水缸', '坐著哭'],
        1,
        '推理: had to do something now → 自己馬上動手 (paraphrase)。'),
      // Q9 BEAT D — looking around
      nar('kt-ch23-l5-q9',
        'His bright eyes moved fast around the garden.',
        '他明亮的眼睛在花園裡飛快地掃。'),
      // Q10 emoji — what's he doing in his head?
      emoji('kt-ch23-l5-q10',
        'What was Sima Guang doing in his head?',
        'What was he doing?',
        ['😴 dreaming', '💡 thinking of a plan', '😡 getting angry', '🎵 singing'],
        ['做夢', '想辦法', '生氣', '唱歌'],
        1,
        '在心裡想 + 眼睛掃 → 想辦法 (paraphrase, problem-solving)。'),
      // Q11 HOOK — B1 物理懸念
      nar('kt-ch23-l5-q11',
        'His eyes landed on something hard and heavy on the ground...',
        '他的眼睛落在地上一個又硬又重的東西……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch23-6: Picks stone, breaks jar, water pours out (B2 情緒翻轉)
  // Hook: 撿石頭砸破水缸 — 水流出來
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch23-l6', chapter: 23, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'sima-guang',
    storyBeat: '撿石頭砸破水缸 — 水流出來',
    questions: [
      vocabIntro('kt-ch23-l6-q1', [
        ['撿', 'pick'],
        ['石頭', 'stone'],
        ['重', 'heavy'],
        ['破', 'break'],
      ]),
      // Q2 BEAT A
      nar('kt-ch23-l6-q2',
        'Sima Guang looked around the garden for something hard.',
        '司馬光在花園裡找硬硬的東西。'),
      // Q3 mc paraphrase about finding stone
      mc('kt-ch23-l6-q3',
        'He saw a big stone resting in the grass.',
        'What did Sima Guang find?',
        ['one soft pillow', 'a heavy stone in the grass', 'just a small flower', 'only a green leaf'],
        ['軟枕頭', '草地裡的重石頭', '小花', '綠葉'],
        1,
        '推理: big stone resting in grass → 草地裡的重石頭 (paraphrase)。'),
      // Q4 TF inference (action — both hands = heavy)
      tf('kt-ch23-l6-q4',
        'He picked up the stone with both small hands.',
        '他用兩隻小手撿起石頭。',
        'Was the stone light for him?', 'N',
        '推理: both hands needed → 不是輕的 → 答 No'),
      // Q5 BEAT B — strength
      nar('kt-ch23-l6-q5',
        'With all his strength, he threw the stone at the side of the jar.',
        '他用盡全力,把石頭丟向水缸的側面。'),
      // Q6 mc paraphrase about throwing target
      mc('kt-ch23-l6-q6',
        'He did not throw it up at the sky or down at his feet.',
        'Where did Sima Guang aim the stone?',
        ['high up in a tree', 'right at the jar wall', 'down at his own foot', 'over the empty path'],
        ['樹頂', '大水缸的側面', '自己的腳', '空的路'],
        1,
        '推理: at the side of the jar → 大水缸的側面 (paraphrase)。'),
      // Q7 BEAT C — crack
      nar('kt-ch23-l6-q7',
        'The jar cracked, then broke, and water poured out fast onto the ground.',
        '水缸裂開,然後破了,水快速地流到地上。'),
      // Q8 mc paraphrase about jar
      mc('kt-ch23-l6-q8',
        'What was strong stone met thin clay walls.',
        'What happened to the big water jar?',
        ['stayed in one piece', 'broke open and let the water out', 'somehow grew bigger', 'started to float'],
        ['完好沒事', '破開讓水流出來', '變更大', '飛起來'],
        1,
        '推理: jar cracked + broke → 破開讓水流出來 (paraphrase)。'),
      // Q9 BEAT D — water rushing out
      nar('kt-ch23-l6-q9',
        'The water rushed out in a great wave across the garden.',
        '水像大浪一樣沖過花園。'),
      // Q10 emoji — feeling
      emoji('kt-ch23-l6-q10',
        'How did the moment feel as the jar broke?',
        'How did it feel?',
        ['😴 boring', '⚡ huge and quick', '💤 sleepy', '😡 angry'],
        ['無聊', '巨大又快', '想睡', '生氣'],
        1,
        '砸破 + 大浪 → 巨大又快 (impact moment)。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch23-l6-q11',
        'And out with the water came something else...',
        '隨著水一起流出來的,還有別的東西……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch23-7: Friend saved, moral (B6 open)
  // Hook: 救出小孩 — 急時用聰明
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch23-l7', chapter: 23, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'sima-guang',
    storyBeat: '救出小孩 — 急時用聰明',
    questions: [
      vocabIntro('kt-ch23-l7-q1', [
        ['流', 'flow'],
        ['出來', 'come out'],
        ['咳', 'cough'],
        ['活', 'alive'],
      ]),
      // Q2 BEAT A
      nar('kt-ch23-l7-q2',
        'The water flowed out of the broken jar in a great rush.',
        '水從破水缸大量流出來。'),
      // Q3 mc paraphrase about friend coming out
      mc('kt-ch23-l7-q3',
        'His friend came out with the water, coughing but alive.',
        'What happened to the boy who fell in?',
        ['washed out and still living', 'stayed inside the jar', 'flew up to the sky', 'lost forever'],
        ['被沖出來而且還活著', '還留在水缸裡', '飛上天', '永遠消失'],
        0,
        '推理: came out + coughing but alive → 被沖出來而且還活著 (paraphrase)。'),
      // Q4 TF inference (action — alive = saved)
      tf('kt-ch23-l7-q4',
        'The boy started to breathe again on the wet grass.',
        '小孩在濕草地上開始呼吸了。',
        'Did the boy come back okay?', 'Y',
        '推理: 開始呼吸 → 沒事了 → 答 Yes'),
      // Q5 BEAT B — adults arrive late
      nar('kt-ch23-l7-q5',
        'The other children came back with an adult, who saw what had happened.',
        '其他小孩和大人一起回來,大人看到剛剛發生的事。'),
      // Q6 mc paraphrase about timing
      mc('kt-ch23-l7-q6',
        'By then, the danger was already over.',
        'What had Sima Guang done before the adult came?',
        ['nothing at all', 'saved his friend on his own', 'broken his own hand', 'gone home for lunch'],
        ['什麼也沒做', '自己救了朋友', '弄傷自己的手', '回家吃午餐'],
        1,
        '推理: danger already over → 自己救了朋友 (paraphrase)。'),
      // Q7 BEAT C — moral begins
      nar('kt-ch23-l7-q7',
        'People still tell this story today, hundreds of years later.',
        '直到今天,過了幾百年,人們還在說這個故事。'),
      // Q8 mc paraphrase about why we remember
      mc('kt-ch23-l7-q8',
        'A small boy did not wait. He thought and acted in time.',
        'Why do people still tell this story?',
        ['the path was long', 'the sun felt warm', 'a child used smart thinking', 'the splash was loud'],
        ['因為路很長', '因為太陽溫暖', '因為聰明的思考', '因為大水聲'],
        2,
        '推理: thought and acted in time → 聰明的思考 (paraphrase, 主題核心)。'),
      // Q9 BEAT D — final moral
      nar('kt-ch23-l7-q9',
        'In a hard moment, smart thinking can save a life.',
        '在難關之中,聰明的思考可以救命。'),
      // Q10 emoji — what helps in a hurry?
      emoji('kt-ch23-l7-q10',
        'What helps the most when time is short?',
        'What helps most?',
        ['🏃 only fast running', '🧠 a smart head', '😡 anger', '😴 sleeping'],
        ['只靠跑得快', '聰明的腦袋', '生氣', '睡覺'],
        1,
        '思考 + 動手 → 聰明的腦袋 (story 主題)。'),
      // Q11 HOOK — B6 open (next time you face a problem...)
      nar('kt-ch23-l7-q11',
        'Next time something hard happens, what will you do first...',
        '下次遇到難事的時候,你會先做什麼……'),
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
