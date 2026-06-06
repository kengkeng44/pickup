#!/usr/bin/env node
/**
 * v2.0.B.250+ — Ch15 國王的新衣 (The Emperor's New Clothes,
 * Andersen 1837 public domain).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern
 * (mirror Ch9 Cinderella ship B.236+).
 * Source canon: docs/canon/emperors-new-clothes.md
 *   (Andersen 1837 7-beat, public domain worldwide).
 * Cuts: docs/canon/emperors-new-clothes-cuts.md
 *   (B6/B3/B5/B4/B6/B2/B6-open).
 *
 * IP 鐵律:
 *   - Source: Hans Christian Andersen, Kejserens nye Klæder (1837).
 *     Author d.1875 (life + 70+). Public domain 1945+, US PD 1923+.
 *   - A2 自創句式, 不引任何特定譯本延伸段落.
 *   - NO modern TV / animation / film adaptation reference.
 *
 * Structure per lesson (11 Q, mirror Ch2/Ch9 範本):
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
 *      'naked' → 'wearing nothing' / 'no clothes on'
 *      'stupid' → 'not smart enough'
 *      'swindlers' → 'two strangers'
 *      'magnificent' → 'fine' / 'lovely'
 *      'procession' → 'parade'
 *   R4 listen-tf inference (atmosphere / action / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 風險: 沒有血腥, 沒有壞人懲罰
 *   - 智取主題: 小孩說真話打破集體謊言
 *   - 同儕壓力 (peer pressure) — 大人因怕被當「不夠聰明」而說謊
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch15.json');

// ─── Helpers (mirror Ch9/Ch2 範本) ────────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch15', 'emperors-new-clothes'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch15', 'emperors-new-clothes', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch15', 'emperors-new-clothes'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch15', 'emperors-new-clothes', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch15', 'emperors-new-clothes', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch15-1: Vain emperor + two strangers arrive (B6 預言種子)
  // Hook: 騙子能成功嗎? 國王會中招?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch15-l1', chapter: 15, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'emperors-new-clothes',
    storyBeat: '國王愛新衣 — 騙子來城裡',
    questions: [
      vocabIntro('kt-ch15-l1-q1', [
        ['國王', 'emperor'],
        ['衣服', 'clothes'],
        ['新的', 'new'],
        ['城市', 'city'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch15-l1-q2',
        'Long ago, there lived an emperor who loved new clothes.',
        '很久以前,有一位國王,他非常喜愛新衣服。'),
      // Q3 mc paraphrase about his obsession (X3: paraphrase, not verbatim)
      mc('kt-ch15-l1-q3',
        'He had a clean coat for every hour of the day.',
        'How many coats did the emperor have?',
        ['just one warm coat', 'a huge number of coats', 'no coats at all', 'two old coats'],
        ['只有一件暖外套', '非常多件外套', '完全沒外套', '兩件舊外套'],
        1,
        '推理: every hour of the day → 非常多件 (paraphrase)。'),
      // Q4 TF inference (action — people complain about his focus)
      tf('kt-ch15-l1-q4',
        'People said he cared more about his coats than his country.',
        '人們說他比較在乎外套,勝過國家。',
        'Was the emperor a careful ruler of his country?', 'N',
        '推理: 在乎外套勝過國家 → 不是用心治國 → 答 No'),
      // Q5 BEAT B — strangers arrive
      nar('kt-ch15-l1-q5',
        'One day, two strangers came to the city.',
        '有一天,兩個陌生人來到城裡。'),
      // Q6 listen-mc paraphrase about strangers
      mc('kt-ch15-l1-q6',
        'They walked straight to the palace gate with big smiles.',
        'Where did the two strangers go first?',
        ['to a small farm', 'to the royal palace', 'into a green forest', 'down to the river'],
        ['小農場', '皇宮', '森林', '河邊'],
        1,
        '推理: palace gate → 皇宮 (paraphrase)。'),
      // Q7 BEAT C — emperor's reaction
      nar('kt-ch15-l1-q7',
        'They told the guard they had something only an emperor could buy.',
        '他們告訴守衛,他們有只有國王才買得起的東西。'),
      // Q8 mc paraphrase about emperor's mood
      mc('kt-ch15-l1-q8',
        'The emperor heard this and sat up tall in his chair.',
        'How did the emperor feel about the strangers?',
        ['very angry at them', 'ready to listen to them', 'fast asleep again', 'too tired to care'],
        ['很生氣', '準備聽他們講', '又睡著', '太累不在乎'],
        1,
        '推理: sat up tall → 準備聽 (paraphrase)。'),
      // Q9 BEAT D — emperor calls them in
      nar('kt-ch15-l1-q9',
        'He asked his men to bring the two strangers in at once.',
        '他叫人立刻把兩個陌生人帶進來。'),
      // Q10 emoji — emperor's feeling
      emoji('kt-ch15-l1-q10',
        'How did the emperor feel about meeting the strangers?',
        'How did the emperor feel?',
        ['😴 sleepy', '🤔 curious', '😡 angry', '😱 scared'],
        ['想睡', '好奇', '生氣', '害怕'],
        1,
        '叫人立刻帶進來 → 好奇想知道。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch15-l1-q11',
        'The two strangers smiled at each other as they walked in...',
        '兩個陌生人邊走邊互相微笑……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch15-2: Tricksters' magic cloth claim (B3 資訊缺口)
  // Hook: 大臣去看會說什麼? 會說真話?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch15-l2', chapter: 15, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'emperors-new-clothes',
    storyBeat: '騙子說只有聰明人看得到 — 設下陷阱',
    questions: [
      vocabIntro('kt-ch15-l2-q1', [
        ['織', 'weave'],
        ['布', 'cloth'],
        ['秘密', 'secret'],
        ['聰明', 'smart'],
      ]),
      // Q2 BEAT A — claim
      nar('kt-ch15-l2-q2',
        'The two strangers said they could weave the finest cloth in the world.',
        '兩個陌生人說,他們可以織出世上最好的布。'),
      // Q3 mc paraphrase about cloth (X2: vary option starts)
      mc('kt-ch15-l2-q3',
        'They held up their empty hands as if showing it.',
        'Did they really have any cloth to show?',
        ['yes, a big piece', 'no, there was nothing', 'one small bit', 'a soft blue scarf'],
        ['有,一大塊', '沒有,什麼都沒有', '一小塊', '一條軟藍圍巾'],
        1,
        '推理: 空手裝作展示 → 其實沒有 → 答 no, nothing。'),
      // Q4 TF inference (atmosphere — quiet, intent strangers)
      tf('kt-ch15-l2-q4',
        'Their eyes moved quickly from face to face in the room.',
        '他們的眼神快速地在房間裡的每張臉上掃過。',
        'Were the strangers watching how people reacted?', 'Y',
        '推理: 眼神掃過每張臉 → 在觀察反應 → 答 Yes'),
      // Q5 BEAT B — secret rule
      nar('kt-ch15-l2-q5',
        '"This cloth has a secret rule," they said with a smile.',
        '「這布有個秘密規則,」他們笑著說。'),
      // Q6 mc paraphrase about rule (the trap)
      mc('kt-ch15-l2-q6',
        '"Only smart and good people can see it."',
        'Who can see the cloth, according to the strangers?',
        ['only kind and clever people', 'only tall grown men', 'only the emperor alone', 'every child in town'],
        ['只有善良又聰明的人', '只有高大男人', '只有國王', '城裡每個小孩'],
        0,
        '推理: smart and good → 善良又聰明 (paraphrase)。'),
      // Q7 BEAT C — the trap part 2
      nar('kt-ch15-l2-q7',
        '"Anyone who is not smart enough will see only empty air."',
        '「不夠聰明的人,只會看到空氣。」'),
      // Q8 mc paraphrase about the trap design
      mc('kt-ch15-l2-q8',
        'No one would want to say that they could see nothing.',
        'Why was this rule clever for the strangers?',
        ['people would pay double price', 'no one would dare say it was empty', 'children loved it most', 'guards would protect them'],
        ['人們會付雙倍價錢', '沒人敢說看不到', '小孩最喜歡', '守衛會保護他們'],
        1,
        '推理: 沒人想被當笨蛋 → 沒人敢說空 (paraphrase, 智取設計)。'),
      // Q9 BEAT D — emperor pays gold
      nar('kt-ch15-l2-q9',
        'The emperor gave them gold and a big room to work in.',
        '國王給了他們金子,還有一間大房間工作。'),
      // Q10 emoji — strangers' real plan
      emoji('kt-ch15-l2-q10',
        'What did the two strangers really plan to do?',
        'What did they really plan?',
        ['🧵 make real cloth', '🎭 trick everyone', '🏃 run away fast', '🍞 sell bread'],
        ['做真的布', '騙所有人', '快跑走', '賣麵包'],
        1,
        '空手 + 假規則 → 騙所有人。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch15-l2-q11',
        'The next morning, the emperor sent his oldest minister to watch...',
        '第二天早上,國王派出最老的大臣去看……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch15-3: Minister visits, sees nothing, lies (B5 道德兩難)
  // Hook: 他敢說沒看到嗎? 該不該說?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch15-l3', chapter: 15, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'emperors-new-clothes',
    storyBeat: '大臣去看 — 他敢說沒看到嗎?',
    questions: [
      vocabIntro('kt-ch15-l3-q1', [
        ['大臣', 'minister'],
        ['織布機', 'loom'],
        ['指', 'point'],
        ['害怕', 'afraid'],
      ]),
      // Q2 BEAT A
      nar('kt-ch15-l3-q2',
        'The old minister walked into the big work room.',
        '老大臣走進大工作室。'),
      // Q3 mc paraphrase about looms
      mc('kt-ch15-l3-q3',
        'The two strangers pointed at empty looms with proud hands.',
        'What did the strangers show the minister?',
        ['a bright blue cloth', 'looms with no cloth on them', 'a basket of bread', 'a long silver sword'],
        ['亮藍色布', '空的織布機', '一籃麵包', '長銀劍'],
        1,
        '推理: empty looms → 空的織布機 (paraphrase)。'),
      // Q4 TF inference (action — opens eyes wide means he is trying hard)
      tf('kt-ch15-l3-q4',
        'The old minister opened his eyes very wide.',
        '老大臣把眼睛睜得很大。',
        'Was the minister trying hard to see something?', 'Y',
        '推理: 眼睛睜得很大 → 很努力想看到 → 答 Yes'),
      // Q5 BEAT B — he sees nothing
      nar('kt-ch15-l3-q5',
        'He saw nothing at all. The looms were empty.',
        '他什麼都沒看到。織布機是空的。'),
      // Q6 mc paraphrase about minister's thought (trap working)
      mc('kt-ch15-l3-q6',
        '"Am I not smart enough?" he thought to himself.',
        'What was the minister afraid people would think?',
        ['being seen as not clever', 'too rich for the job', 'sleepy after lunch', 'a bit too young'],
        ['被當作不夠聰明', '太有錢', '午餐後想睡', '有點太年輕'],
        0,
        '推理: 怕被當「不夠聰明」 → 不夠聰明 (paraphrase 直接套規則)。'),
      // Q7 BEAT C — he lies
      nar('kt-ch15-l3-q7',
        'But he was afraid to say so out loud.',
        '但他不敢說出來。'),
      // Q8 mc paraphrase about lie
      mc('kt-ch15-l3-q8',
        '"Lovely! Truly lovely!" he said with a tight smile.',
        'What did the minister say about the cloth?',
        ['looked broken to him', 'said it was beautiful', 'asked for less of it', 'wanted a new color'],
        ['壞掉了', '說它很美', '說太多', '想換顏色'],
        1,
        '推理: lovely → 美麗 (paraphrase, lie 內容)。'),
      // Q9 BEAT D — he reports back
      nar('kt-ch15-l3-q9',
        'He went back to the emperor and praised the cloth with care.',
        '他回去國王那裡,小心地稱讚那布。'),
      // Q10 emoji — minister's real feeling
      emoji('kt-ch15-l3-q10',
        'How did the old minister really feel inside?',
        'How did he really feel?',
        ['😊 truly proud', '😨 worried about himself', '😴 quite sleepy', '🤣 ready to laugh'],
        ['真心驕傲', '擔心自己', '想睡', '想大笑'],
        1,
        '怕被當不聰明 → 擔心自己 (lie 出於 fear)。'),
      // Q11 HOOK — B5 道德兩難 (will the emperor also lie?)
      nar('kt-ch15-l3-q11',
        'The emperor heard the praise. He wanted to see for himself...',
        '國王聽了讚美。他想親自去看……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch15-4: Emperor sees nothing, lies too (B4 期待加速)
  // Hook: 國王敢說沒看到嗎? 連他也撐不住?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch15-l4', chapter: 15, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'emperors-new-clothes',
    storyBeat: '國王也去看 — 他敢說沒看到嗎?',
    questions: [
      vocabIntro('kt-ch15-l4-q1', [
        ['看見', 'see'],
        ['沒有', 'nothing'],
        ['冷', 'cold'],
        ['軟', 'soft'],
      ]),
      // Q2 BEAT A
      nar('kt-ch15-l4-q2',
        'At last the emperor himself came to see the cloth.',
        '最後,國王親自來看那布。'),
      // Q3 mc paraphrase about strangers' performance
      mc('kt-ch15-l4-q3',
        'The strangers moved their hands fast over the empty looms.',
        'What were the strangers pretending to do?',
        ['cook a meal there', 'work on cloth', 'guard a treasure', 'count the gold'],
        ['煮飯', '織布', '守寶藏', '數金幣'],
        1,
        '推理: hands over looms → 假裝在織布 (paraphrase)。'),
      // Q4 TF inference (action — emperor looks, sees nothing)
      tf('kt-ch15-l4-q4',
        'The emperor looked and looked. The looms stayed empty.',
        '國王看了又看。織布機一直是空的。',
        'Could the emperor see any cloth?', 'N',
        '推理: 看了又看 + 一直空 → 看不見 → 答 No'),
      // Q5 BEAT B — heart turns cold
      nar('kt-ch15-l4-q5',
        'His heart went cold inside his chest.',
        '他胸口裡的心都涼了。'),
      // Q6 mc paraphrase about emperor's fear
      mc('kt-ch15-l4-q6',
        '"Am I not smart enough?" he thought to himself.',
        'What did the emperor secretly fear?',
        ['being seen as not clever', 'falling on the floor', 'losing all his gold', 'catching a small cold'],
        ['被認為不聰明', '跌倒', '失去金子', '感冒'],
        0,
        '推理: 規則說不聰明就看不到 → 怕被當不聰明 (paraphrase)。'),
      // Q7 BEAT C — emperor lies
      nar('kt-ch15-l4-q7',
        'He smiled and turned to his men around him.',
        '他笑著轉向身邊的人。'),
      // Q8 mc paraphrase about lie content
      mc('kt-ch15-l4-q8',
        '"Oh, what fine colors! What soft cloth!" he said.',
        'What did the emperor say about the cloth?',
        ['it looked bad and dirty', 'he loved its nice colors', 'he wanted his money back', 'it was the wrong size'],
        ['看起來糟糕又髒', '他喜歡漂亮顏色', '想退錢', '尺寸不對'],
        1,
        '推理: fine colors → 喜歡顏色 (paraphrase, lie 內容)。'),
      // Q9 BEAT D — everyone agrees
      nar('kt-ch15-l4-q9',
        'All his men nodded fast. They all said it was lovely.',
        '所有的人都快速點頭。他們都說很美。'),
      // Q10 emoji — cascade of lies
      emoji('kt-ch15-l4-q10',
        'What did the men around the emperor do?',
        'What did the men do?',
        ['📢 told the truth', '🙊 also told the same lie', '🏃 ran away fast', '😴 fell asleep'],
        ['說真話', '也跟著說謊', '快跑走', '睡著'],
        1,
        '所有人點頭說美 → 也跟著說謊 (cascade)。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch15-l4-q11',
        'A big parade was planned for the very next day...',
        '隔天就要舉辦盛大遊行……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch15-5: Parade begins, people clap (B6 預言種子)
  // Hook: 人民會說真話嗎? 還是跟著拍手?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch15-l5', chapter: 15, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'emperors-new-clothes',
    storyBeat: '遊行開始 — 人民會說真話嗎?',
    questions: [
      vocabIntro('kt-ch15-l5-q1', [
        ['準備好', 'ready'],
        ['遊行', 'parade'],
        ['踏出', 'step'],
        ['拍手', 'clap'],
      ]),
      // Q2 BEAT A
      nar('kt-ch15-l5-q2',
        'The strangers said the new clothes were ready for the parade.',
        '陌生人說新衣服已經準備好,可以遊行了。'),
      // Q3 mc paraphrase about mime act (X2: vary option starts)
      mc('kt-ch15-l5-q3',
        'They mimed putting the coat on the emperor with care.',
        'What were the strangers really putting on him?',
        ['warm wool coat', 'no actual clothes', 'a thick winter cloak', 'a long red robe'],
        ['暖羊毛外套', '完全沒衣服', '厚冬披風', '長紅袍'],
        1,
        '推理: mimed = 假裝動作 → 完全沒衣服 (paraphrase, 沒實物)。'),
      // Q4 TF inference (contrast — emperor doesn't notice or pretends)
      tf('kt-ch15-l5-q4',
        'The emperor turned in front of the mirror with a stiff smile.',
        '國王在鏡子前轉身,僵硬地微笑。',
        'Did the emperor feel comfortable about this?', 'N',
        '推理: 僵硬的笑 → 不舒服 → 答 No'),
      // Q5 BEAT B — emperor steps out
      nar('kt-ch15-l5-q5',
        'The emperor stepped out wearing nothing at all.',
        '國王踏出去,身上什麼都沒穿。'),
      // Q6 mc paraphrase about the scene (X2 fix)
      mc('kt-ch15-l5-q6',
        'He walked tall under a soft cover held up by four men.',
        'How was the emperor walking in the parade?',
        ['hiding behind a wall', 'showing himself for all to see', 'sitting in a fast horse coach', 'running to the gate'],
        ['躲在牆後', '讓所有人看見自己', '坐快馬車', '跑到大門'],
        1,
        '推理: walked tall + four men cover → 公開展示 → 讓所有人看見 (paraphrase)。'),
      // Q7 BEAT C — people gather
      nar('kt-ch15-l5-q7',
        'All the people of the city came out to watch.',
        '全城的人都出來看。'),
      // Q8 mc paraphrase about crowd
      mc('kt-ch15-l5-q8',
        'They all clapped and called out about the new coat.',
        'What did the crowd do during the parade?',
        ['shouted the truth aloud', 'praised the missing clothes', 'turned around and left', 'sat down on the road'],
        ['大聲喊出真話', '稱讚不存在的衣服', '轉身離開', '坐在路上'],
        1,
        '推理: clapped + called out 稱讚 → 稱讚不存在的衣服 (paraphrase, 跟風)。'),
      // Q9 BEAT D — everyone follows
      nar('kt-ch15-l5-q9',
        'No one wanted to be the first to say something else.',
        '沒有人想第一個說別的話。'),
      // Q10 emoji — peer pressure
      emoji('kt-ch15-l5-q10',
        'Why did the people not speak the truth?',
        'Why did they stay quiet?',
        ['🤐 fear of looking foolish', '🍔 they were eating', '💤 they were sleeping', '🎶 music was too loud'],
        ['怕被當笨蛋', '在吃東西', '在睡覺', '音樂太大聲'],
        0,
        '推理: 沒人想第一個 → 怕被當笨蛋 (peer pressure)。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch15-l5-q11',
        'And at the front of the street, one small child was watching too...',
        '街道前方,有一個小孩也在看……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch15-6: Child speaks truth (B2 情緒翻轉)
  // Hook: 大家會怎樣? 還會繼續假裝嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch15-l6', chapter: 15, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'emperors-new-clothes',
    storyBeat: '小孩說真話 — 大家會怎樣?',
    questions: [
      vocabIntro('kt-ch15-l6-q1', [
        ['小孩', 'child'],
        ['前面', 'front'],
        ['清楚', 'clear'],
        ['安靜', 'quiet'],
      ]),
      // Q2 BEAT A
      nar('kt-ch15-l6-q2',
        'A small child stood at the front of the street.',
        '一個小孩站在街道前方。'),
      // Q3 mc paraphrase about child's view
      mc('kt-ch15-l6-q3',
        'He looked up at the emperor with big honest eyes.',
        'How did the child see the emperor?',
        ['through colored glass', 'just as he really was', 'with closed eyes', 'in a small mirror'],
        ['透過彩色玻璃', '就是他真正的樣子', '閉眼', '小鏡子裡'],
        1,
        '推理: big honest eyes → 看到真實 (paraphrase)。'),
      // Q4 TF inference (contrast — child doesn't know the rule)
      tf('kt-ch15-l6-q4',
        'The child had never heard about the secret rule.',
        '小孩從來沒聽過那個秘密規則。',
        'Did the child feel any pressure to lie?', 'N',
        '推理: 沒聽過規則 → 沒壓力 → 答 No'),
      // Q5 BEAT B — child doesn't understand
      nar('kt-ch15-l6-q5',
        'He did not understand why people were clapping so loud.',
        '他不懂為什麼大家拍手拍得這麼大聲。'),
      // Q6 mc paraphrase about confusion
      mc('kt-ch15-l6-q6',
        'To him, the emperor looked just like any man in a bath.',
        'How did the emperor look to the child?',
        ['like a hero from a story', 'with no clothes on at all', 'taller than a tree', 'as if made of gold'],
        ['像故事裡的英雄', '完全沒穿衣服', '比樹還高', '像金子做的'],
        1,
        '推理: 像剛洗澡的人 → 完全沒穿衣服 (paraphrase)。'),
      // Q7 BEAT C — child speaks
      nar('kt-ch15-l6-q7',
        '"But he has no clothes on!" the child said in a clear voice.',
        '「可是他沒穿衣服!」小孩用清亮的聲音說。'),
      // Q8 mc paraphrase about voice (X2: vary)
      mc('kt-ch15-l6-q8',
        'His small voice cut through the noise of the parade.',
        'How did the child say the truth?',
        ['in a soft whisper', 'loud and easy to hear', 'while crying hard', 'as a slow song'],
        ['輕聲耳語', '大聲又清楚', '一邊大哭', '像慢歌'],
        1,
        '推理: cut through noise → 大聲清楚 (paraphrase)。'),
      // Q9 BEAT D — street goes quiet
      nar('kt-ch15-l6-q9',
        'The street went quiet. No one clapped now.',
        '街道安靜下來。沒有人拍手了。'),
      // Q10 emoji — crowd's new reaction
      emoji('kt-ch15-l6-q10',
        'How did the people feel after the child spoke?',
        'How did they feel?',
        ['🎉 happy', '😶 silent and shocked', '🎵 still singing', '🍎 hungry'],
        ['開心', '安靜又驚訝', '還在唱', '餓'],
        1,
        '街道安靜 → 大家驚訝安靜 (spell broken)。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch15-l6-q11',
        'Then everyone began to whisper. Soon the whisper became a wave...',
        '然後大家開始低聲說話。耳語很快變成一陣浪潮……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch15-7: Emperor walks on (B6 open)
  // Hook: 為什麼他不停下來? 自尊比真相更難放下?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch15-l7', chapter: 15, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'emperors-new-clothes',
    storyBeat: '國王繼續走完遊行 — 學到什麼?',
    questions: [
      vocabIntro('kt-ch15-l7-q1', [
        ['聽', 'hear'],
        ['真相', 'truth'],
        ['頭', 'head'],
        ['走', 'walk'],
      ]),
      // Q2 BEAT A
      nar('kt-ch15-l7-q2',
        'The emperor heard the child. His face turned red.',
        '國王聽見小孩的話。他的臉變紅了。'),
      // Q3 mc paraphrase about emperor's reaction
      mc('kt-ch15-l7-q3',
        'A hot feeling rose from his chest to his cheeks.',
        'How did the emperor feel inside?',
        ['cool and calm', 'ashamed and hot', 'fast asleep', 'as proud as before'],
        ['冷靜', '羞愧又熱', '睡著', '跟以前一樣驕傲'],
        1,
        '推理: hot feeling chest to cheeks → 羞愧又熱 (paraphrase)。'),
      // Q4 TF inference (action — knew the truth)
      tf('kt-ch15-l7-q4',
        'In one quick moment, he understood the whole trick.',
        '一瞬間,他懂了整個騙局。',
        'Did the emperor now know that he had been tricked?', 'Y',
        '推理: 懂了整個騙局 → 知道被騙 → 答 Yes'),
      // Q5 BEAT B — everyone knows
      nar('kt-ch15-l7-q5',
        'He knew the truth now. Everyone around him knew too.',
        '現在他知道真相了。身邊每個人也都知道。'),
      // Q6 mc paraphrase about decision
      mc('kt-ch15-l7-q6',
        'He could have run home and shut the door behind him.',
        'What was one choice the emperor could have made?',
        ['starting the parade over', 'going home to hide', 'calling out the army', 'sitting on the road'],
        ['重新開始遊行', '回家躲起來', '叫軍隊', '坐在路上'],
        1,
        '推理: run home + shut door → 回家躲 (paraphrase)。'),
      // Q7 BEAT C — but he doesn't
      nar('kt-ch15-l7-q7',
        'But he held his head high and did not stop.',
        '但他抬頭挺胸,沒有停下來。'),
      // Q8 mc paraphrase about his choice
      mc('kt-ch15-l7-q8',
        'He kept walking with the slow steps of a king.',
        'What did the emperor choose to do?',
        ['hide right away', 'finish the parade', 'shout at the child', 'fight the strangers'],
        ['馬上躲', '走完遊行', '對小孩吼', '打騙子'],
        1,
        '推理: kept walking → 走完遊行 (paraphrase)。'),
      // Q9 BEAT D — he reaches the gate
      nar('kt-ch15-l7-q9',
        'He walked all the way to the end of the parade.',
        '他一路走到遊行的盡頭。'),
      // Q10 emoji — what's harder
      emoji('kt-ch15-l7-q10',
        'What was harder for the emperor to put down?',
        'What was hardest to put down?',
        ['👑 his pride', '💰 his gold', '🍎 his lunch', '📚 his books'],
        ['他的自尊', '他的金子', '他的午餐', '他的書'],
        0,
        '知道真相還繼續走 → 自尊比真相更難放下。'),
      // Q11 HOOK — B6 open (why didn't he stop?)
      nar('kt-ch15-l7-q11',
        'And the people watched him go, all the way to the palace gate...',
        '人們看著他走,一路走到皇宮大門……'),
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
