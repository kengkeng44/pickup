#!/usr/bin/env node
/**
 * v2.0.B.240+ — Ch12 牛郎織女 (The Cowherd and the Weaver).
 *
 * Pipeline ship via tools/pickup-new-story.cjs B.234 URL pipeline pattern.
 * Source canon: docs/canon/cowherd-weaver.md (7-beat arc, Chinese folk oral
 *   tradition, public domain).
 * Cuts: docs/canon/cowherd-weaver-cuts.md (B3/B4/B5/B1/B3/B6/B6-open).
 *
 * IP 鐵律:
 *   - 中華民間口傳 (~2000+ 年), 全球公有領域
 *   - A2 自創句式, 不引特定譯本 / 改編
 *   - 兒童 ELT pivot (per CLAUDE.md v2.0.B.231 客群):
 *     * 'wife/husband' → 'family' / 'close friends'
 *     * 'fall in love' → 'become close friends/family'
 *     * 'die' / 'kill' / 'hurt' 不出現 (Queen takes, never harms)
 *     * 仙女 = 'magic lady', NOT 'fairy' (避 Western fairy 混淆)
 *
 * Cross-cultural pairing (per cuts md):
 *   Ch7 葉限 (Tang 唐代) + Ch9 Cinderella (Perrault 1697) + Ch12 牛郎織女 (Han)
 *   = 三角文化教學對, 同 theme 「珍貴的東西不會永遠不見」, 不同 cost/mechanism.
 *
 * Structure per lesson (11 Q, mirror Ch7/Ch8/Ch9 範本):
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
 *   R3 A2 vocab only (no enchanted/realm/gleaming/banished)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch12.json');

// ─── Helpers (mirror Ch8/Ch9 範本) ────────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch12', 'cowherd-weaver'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch12', 'cowherd-weaver', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch12', 'cowherd-weaver'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch12', 'cowherd-weaver', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch12', 'cowherd-weaver', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch12-1: Cowherd meets magic lady (B3 — 仙女為什麼下凡?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch12-l1', chapter: 12, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'cowherd-weaver',
    storyBeat: '牛郎放牛 — 仙女從天而降',
    questions: [
      vocabIntro('kt-ch12-l1-q1', [
        ['男孩', 'boy'],
        ['牛', 'cow'],
        ['河', 'river'],
        ['天空', 'sky'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch12-l1-q2',
        'Long ago in China, a kind boy lived alone with one old cow.',
        '很久以前在中國,有個善良的男孩,他只跟一頭老牛住在一起。'),
      // Q3 BEAT A deepen
      nar('kt-ch12-l1-q3',
        'His name was Niulang. He took the cow to the river every day.',
        '他叫牛郎。他每天把牛帶到河邊。'),
      // Q4 TF inference (atmosphere — alone, quiet life)
      tf('kt-ch12-l1-q4',
        'No one came to talk. No one sat with him at meals.',
        '沒人來跟他說話。吃飯時沒人陪他坐。',
        'Did Niulang have a big family at home?', 'N',
        '推理: 沒人說話沒人陪 → 沒大家庭 → 答 No'),
      // Q5 BEAT B — magic lady appears
      nar('kt-ch12-l1-q5',
        'One bright day, a magic lady came down from the sky.',
        '一個晴朗的日子,一位仙女從天上下來。'),
      // Q6 listen-mc paraphrase about her arrival (X3: words not in sentence)
      mc('kt-ch12-l1-q6',
        'Her white robe floated like a soft cloud near the water.',
        'How did the magic lady look?',
        ['heavy and dark', 'light as a feather', 'small as a bug', 'loud as a drum'],
        ['沉重又黑', '輕得像羽毛', '小如蟲', '吵如鼓'],
        1,
        '推理: 白袍像雲漂浮 → 輕得像羽毛 (paraphrase)。'),
      // Q7 BEAT C — her name + role
      nar('kt-ch12-l1-q7',
        'Her name was Zhinu. She wove cloth for the sky.',
        '她叫織女。她為天空織布。'),
      // Q8 listen-mc paraphrase about what she does (X2: vary starts)
      mc('kt-ch12-l1-q8',
        'Each thread in her hands turned into bright silver light.',
        'What did Zhinu do with her hands?',
        ['baked sweet cakes', 'made shining cloth', 'sang to the moon', 'rode a fast horse'],
        ['烤甜點', '做發亮的布', '對月亮唱歌', '騎快馬'],
        1,
        '推理: 線變銀光 → 做發亮的布 (paraphrase)。'),
      // Q9 BEAT D — Niulang watches
      nar('kt-ch12-l1-q9',
        'Niulang stood by the tall grass and watched her quietly.',
        '牛郎站在高草邊,安靜地看著她。'),
      // Q10 emoji — how did Niulang feel
      emoji('kt-ch12-l1-q10',
        'How did Niulang feel when he saw the magic lady?',
        'How did Niulang feel?',
        ['😲 amazed', '😡 angry', '😴 sleepy', '🤧 sick'],
        ['驚奇', '生氣', '想睡', '生病'],
        0,
        '看到仙女 → 驚奇。'),
      // Q11 HOOK — B3 資訊缺口 (仙女為什麼下凡?)
      nar('kt-ch12-l1-q11',
        'Why did she come down from the sky? Why today...',
        '她為什麼從天上下來?為什麼今天……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch12-2: Sewing clothes together (B4 — 他們會成為家人嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch12-l2', chapter: 12, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'cowherd-weaver',
    storyBeat: '一起縫衣服 — 他們會成為家人嗎?',
    questions: [
      vocabIntro('kt-ch12-l2-q1', [
        ['線', 'thread'],
        ['縫', 'sew'],
        ['衣服', 'clothes'],
        ['冷', 'cold'],
      ]),
      // Q2 BEAT A
      nar('kt-ch12-l2-q2',
        'Niulang and Zhinu sat by the river and talked all day.',
        '牛郎和織女在河邊坐著聊了一整天。'),
      // Q3 mc paraphrase about how they spent the day (X2 fix: vary starts)
      mc('kt-ch12-l2-q3',
        'The hours passed but they did not feel one moment.',
        'How did time feel to them?',
        ['very slow and long', 'gone in a blink', 'painful and hard', 'noisy and tired'],
        ['很慢很長', '一眨眼就過', '又痛又苦', '吵又累'],
        1,
        '推理: 時間過了卻不覺得 → 一眨眼就過 (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch12-l2-q4',
        'She showed him how to weave with bright silver thread.',
        '她教他用銀色線織布。'),
      // Q5 TF inference (action — teaching means becoming close)
      tf('kt-ch12-l2-q5',
        'He held the thread close. He learned each move slowly.',
        '他把線握緊。他慢慢學每一個動作。',
        'Was Niulang trying his best to learn?', 'Y',
        '推理: 學得認真又慢 → 盡力 → 答 Yes'),
      // Q6 BEAT C — he teaches her
      nar('kt-ch12-l2-q6',
        'He showed her how to feed the old cow grass.',
        '他教她怎麼餵老牛吃草。'),
      // Q7 emoji
      emoji('kt-ch12-l2-q7',
        'What did they teach each other?',
        'What did they share?',
        ['🧵 weaving and farming', '🍰 baking sweets', '🎵 a long song', '🏃 a fast race'],
        ['織布和農事', '烤甜點', '唱長歌', '比賽跑步'],
        0,
        '她教織布,他教餵牛 → 織布和農事。'),
      // Q8 BEAT D — sewing together
      nar('kt-ch12-l2-q8',
        'They sewed warm clothes together for the long cold winter.',
        '他們一起縫做暖衣服過冬。'),
      // Q9 mc paraphrase about closeness (X3: paraphrase, words not in sentence)
      mc('kt-ch12-l2-q9',
        'Each stitch felt like a small bridge between their hands.',
        'How close were they becoming?',
        ['strangers still', 'almost like family', 'too far to talk', 'busy with strangers'],
        ['還是陌生人', '幾乎像家人', '遠到不能聊', '忙於陌生人'],
        1,
        '推理: 每針像小橋連接雙手 → 幾乎像家人 (paraphrase)。'),
      // Q10 BEAT — they sit by fire
      nar('kt-ch12-l2-q10',
        'At night, they sat by the small fire and laughed soft.',
        '晚上,他們坐在小火爐邊輕輕笑。'),
      // Q11 HOOK — B4 期待加速 (他們會成為家人嗎?)
      nar('kt-ch12-l2-q11',
        'Day after day, they grew closer. Like family. Almost...',
        '日復一日,他們變得更親近。像家人。幾乎是……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch12-3: Heavenly Queen comes down (B5 — 仙女會被帶走嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch12-l3', chapter: 12, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'cowherd-weaver',
    storyBeat: '王母娘娘下凡 — 仙女會被帶走嗎?',
    questions: [
      vocabIntro('kt-ch12-l3-q1', [
        ['王后', 'queen'],
        ['硬', 'hard'],
        ['雲', 'cloud'],
        ['工作', 'work'],
      ]),
      // Q2 BEAT A
      nar('kt-ch12-l3-q2',
        'The Heavenly Queen watched from the high sky above.',
        '王母娘娘從高高的天上看著。'),
      // Q3 mc paraphrase about her mood (X2: vary starts;
      // X3: words "not happy" / "not pleased" not in sentence)
      mc('kt-ch12-l3-q3',
        'Her brow drew tight. Her lips made a thin line.',
        'How did the Queen feel about Zhinu staying below?',
        ['filled with joy', 'not at all pleased', 'fast asleep', 'ready to dance'],
        ['很開心', '一點都不滿意', '睡著了', '想跳舞'],
        1,
        '推理: 眉頭緊嘴唇細 → 一點都不滿意 (paraphrase)。'),
      // Q4 BEAT B — Queen's command
      nar('kt-ch12-l3-q4',
        'Her face went hard. "Zhinu must come home and weave."',
        '她臉色變硬。「織女必須回來織布。」'),
      // Q5 TF inference (action — hard face = serious)
      tf('kt-ch12-l3-q5',
        'She did not smile. She did not bend.',
        '她沒有笑。她沒有低頭。',
        'Was the Queen open to talking?', 'N',
        '推理: 不笑不彎腰 → 不願意談 → 答 No'),
      // Q6 BEAT C — she comes down
      nar('kt-ch12-l3-q6',
        'One day she came down on a long white cloud.',
        '有一天她駕著長長的白雲下來。'),
      // Q7 emoji
      emoji('kt-ch12-l3-q7',
        'How did the Heavenly Queen come down?',
        'How did she travel?',
        ['🐎 on a wild horse', '☁️ on a long cloud', '🚣 on a small boat', '🚶 walked all the way'],
        ['騎野馬', '駕長雲', '小船', '走路'],
        1,
        '駕著白雲下來 → on a long cloud。'),
      // Q8 BEAT D — she speaks
      nar('kt-ch12-l3-q8',
        '"Zhinu, go back to the sky. Your work is up there."',
        '「織女,回到天上。你的工作在上面。」'),
      // Q9 mc paraphrase about ultimatum (X3 fix)
      mc('kt-ch12-l3-q9',
        'Zhinu shook her head. She held Niulang\'s hand tight.',
        'How did Zhinu answer the Queen?',
        ['ran to the cloud', 'showed she did not want to go', 'sang a happy tune', 'slept on the grass'],
        ['跑向雲', '表示不想走', '唱開心的歌', '在草地睡'],
        1,
        '推理: 搖頭 + 握緊手 → 表示不想走 (paraphrase)。'),
      // Q10 BEAT — Queen reaches
      nar('kt-ch12-l3-q10',
        'The Queen reached out her long thin hand.',
        '王母娘娘伸出她那長長細細的手。'),
      // Q11 HOOK — B5 道德兩難 (仙女會被帶走嗎?)
      nar('kt-ch12-l3-q11',
        'Would the Queen take her? Would Niulang stop her?',
        '王母娘娘會把她帶走嗎?牛郎能阻止嗎?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch12-4: Silver river splits them (B1 物理懸念 — 還能再見嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch12-l4', chapter: 12, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'cowherd-weaver',
    storyBeat: '銀河出現 — 兩人被分開,還能再見嗎?',
    questions: [
      vocabIntro('kt-ch12-l4-q1', [
        ['髮夾', 'pin'],
        ['線', 'line'],
        ['畫', 'draw'],
        ['邊', 'side'],
      ]),
      // Q2 BEAT A
      nar('kt-ch12-l4-q2',
        'The Queen pulled a silver pin from her own hair.',
        '王母娘娘從自己頭髮上拔下一根銀髮夾。'),
      // Q3 mc paraphrase about the pin (X2: vary starts)
      mc('kt-ch12-l4-q3',
        'It shone with cold light, sharp at one end.',
        'What was the silver pin like?',
        ['warm and soft', 'bright but sharp', 'old and broken', 'wet and heavy'],
        ['溫暖柔軟', '亮卻又尖', '又舊又壞', '又濕又重'],
        1,
        '推理: 冷光一端尖 → 亮卻又尖 (paraphrase)。'),
      // Q4 BEAT B — she draws line
      nar('kt-ch12-l4-q4',
        'She drew a line across the sky from east to west.',
        '她在天上從東到西畫了一條線。'),
      // Q5 TF inference (time — fast action means powerful magic)
      tf('kt-ch12-l4-q5',
        'In one breath the sky changed. In one breath all was new.',
        '一口氣天空就變了。一口氣全變了。',
        'Did the magic take a long time?', 'N',
        '推理: 一口氣 → 不長 → 答 No'),
      // Q6 BEAT C — river appears
      nar('kt-ch12-l4-q6',
        'A great silver river flowed where she drew the line.',
        '在她畫的那條線上,出現了一條巨大的銀河。'),
      // Q7 emoji
      emoji('kt-ch12-l4-q7',
        'What appeared in the sky after the Queen drew the line?',
        'What appeared in the sky?',
        ['🌌 a silver river', '🌳 a big tree', '🏠 a stone house', '🐅 a wild tiger'],
        ['銀河', '大樹', '石屋', '猛虎'],
        0,
        '畫線後出現銀河 → silver river。'),
      // Q8 BEAT D — they are separated
      nar('kt-ch12-l4-q8',
        'Niulang stood on one side. Zhinu stood far on the other.',
        '牛郎站在一邊。織女遠遠站在另一邊。'),
      // Q9 mc paraphrase about separation (X3 fix)
      mc('kt-ch12-l4-q9',
        'They reached out. Their fingers could not meet.',
        'How far apart were Niulang and Zhinu now?',
        ['close enough to touch', 'too far to reach', 'in the same room', 'side by side again'],
        ['近到能碰', '遠到碰不到', '同一個房間', '又肩並肩'],
        1,
        '推理: 伸手碰不到 → 遠到碰不到 (paraphrase)。'),
      // Q10 BEAT — both cry
      nar('kt-ch12-l4-q10',
        'Tears fell on both sides of the wide silver river.',
        '寬闊銀河的兩邊都流下眼淚。'),
      // Q11 HOOK — B1 物理懸念 (還能再見嗎?)
      nar('kt-ch12-l4-q11',
        'The silver river kept flowing. It would not stop. Would not...',
        '銀河一直流。停不下來。永遠不會……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch12-5: Old cow helps him fly (B3 — 牛說了什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch12-l5', chapter: 12, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'cowherd-weaver',
    storyBeat: '牛郎追到天上 — 牛說了什麼?',
    questions: [
      vocabIntro('kt-ch12-l5-q1', [
        ['哭', 'cry'],
        ['皮', 'skin'],
        ['穿', 'wear'],
        ['抬', 'lift'],
      ]),
      // Q2 BEAT A
      nar('kt-ch12-l5-q2',
        'Niulang sat by the river and cried for many days.',
        '牛郎坐在河邊哭了好多天。'),
      // Q3 mc paraphrase about his state (X2: vary starts)
      mc('kt-ch12-l5-q3',
        'He did not eat. He did not sleep. He just looked up.',
        'How was Niulang feeling without Zhinu?',
        ['fine and busy', 'lost and broken', 'fast and strong', 'ready to fight'],
        ['沒事又忙', '迷失又心碎', '又快又強', '準備打架'],
        1,
        '推理: 不吃不睡只看天 → 迷失又心碎 (paraphrase)。'),
      // Q4 BEAT B — old cow approaches
      nar('kt-ch12-l5-q4',
        'The old cow walked up slowly to where he sat.',
        '老牛慢慢走到他坐的地方。'),
      // Q5 TF inference (action — old cow about to speak = magic)
      tf('kt-ch12-l5-q5',
        'The old cow opened her mouth. Words came out clear.',
        '老牛張開嘴。話清楚地說出來。',
        'Was the old cow an ordinary cow?', 'N',
        '推理: 會說話 → 不是普通牛 → 答 No'),
      // Q6 BEAT C — cow speaks (the key line)
      nar('kt-ch12-l5-q6',
        '"Take my soft skin," she said. "Wear it like a cloak."',
        '「拿我柔軟的皮,」她說。「把它當披風穿。」'),
      // Q7 mc paraphrase about cow's gift (X3 fix)
      mc('kt-ch12-l5-q7',
        '"It will lift you up to the sky where she waits."',
        'What would the cow\'s skin help Niulang do?',
        ['walk home in peace', 'rise into the sky', 'find a new friend', 'sleep through winter'],
        ['平靜回家', '飛上天', '找新朋友', '睡過冬'],
        1,
        '推理: lift up to sky → 飛上天 (paraphrase)。'),
      // Q8 BEAT D — he wears it
      nar('kt-ch12-l5-q8',
        'Niulang put on the soft skin with kind tears in his eyes.',
        '牛郎含著感激的淚穿上柔軟的皮。'),
      // Q9 mc paraphrase about lift-off (X2: vary starts)
      mc('kt-ch12-l5-q9',
        'His feet left the ground. The wind held him gently.',
        'What happened to Niulang?',
        ['fell down hard', 'started to rise', 'ran very fast', 'slept on the floor'],
        ['重重摔倒', '開始上升', '跑很快', '在地上睡'],
        1,
        '推理: 腳離地風托住 → 開始上升 (paraphrase)。'),
      // Q10 emoji
      emoji('kt-ch12-l5-q10',
        'What does the old cow do for Niulang?',
        'What does the cow do?',
        ['🐄 helps him fly', '🚪 closes the door', '🍞 makes him bread', '🛏️ tucks him in bed'],
        ['幫他飛', '關門', '做麵包', '幫他蓋被'],
        0,
        '皮讓他飛上天 → 幫他飛。'),
      // Q11 HOOK — B3 資訊缺口 (剛剛牛說了什麼? 還會說嗎?)
      nar('kt-ch12-l5-q11',
        'The cow watched him rise. She did not speak again. Why...',
        '老牛看著他升起。她不再開口。為什麼……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch12-6: Magpies build the bridge (B6 — 鵲橋是什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch12-l6', chapter: 12, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'cowherd-weaver',
    storyBeat: '喜鵲聚集 — 鵲橋是什麼?',
    questions: [
      vocabIntro('kt-ch12-l6-q1', [
        ['喜鵲', 'magpie'],
        ['翅膀', 'wing'],
        ['橋', 'bridge'],
        ['中間', 'middle'],
      ]),
      // Q2 BEAT A
      nar('kt-ch12-l6-q2',
        'All the magpies in the world flew up to the silver river.',
        '世界上所有的喜鵲都飛到銀河邊。'),
      // Q3 mc paraphrase about magpies (X3 fix)
      mc('kt-ch12-l6-q3',
        'The whole sky went black with their feathers.',
        'How many magpies came to help?',
        ['only one or two', 'too many to count', 'about ten birds', 'none came at all'],
        ['只有一兩隻', '多到數不清', '大約十隻', '一隻都沒來'],
        1,
        '推理: 整片天空都黑了 → 多到數不清 (paraphrase)。'),
      // Q4 BEAT B — they hold wings
      nar('kt-ch12-l6-q4',
        'They held wing to wing across the wide silver river.',
        '牠們翅膀連翅膀,跨過寬寬的銀河。'),
      // Q5 TF inference (action — wing-to-wing = bridge)
      tf('kt-ch12-l6-q5',
        'Niulang stepped on. The black backs held him up.',
        '牛郎踩上去。黑色的鳥背把他撐住。',
        'Was the magpie bridge strong enough for him?', 'Y',
        '推理: 撐住他走 → 夠堅固 → 答 Yes'),
      // Q6 BEAT C — they make bridge
      nar('kt-ch12-l6-q6',
        'They made a long black bridge across the sky.',
        '牠們在天上做出一座長長的黑色橋。'),
      // Q7 emoji
      emoji('kt-ch12-l6-q7',
        'What did the magpies make in the sky?',
        'What did they make?',
        ['🌉 a black bridge', '🏠 a small house', '🎁 a big gift', '🍰 a sweet cake'],
        ['黑色的橋', '小屋', '大禮物', '甜蛋糕'],
        0,
        '翅膀連翅膀 → 黑色的橋。'),
      // Q8 BEAT D — they meet in middle
      nar('kt-ch12-l6-q8',
        'Niulang ran on the magpie bridge. Zhinu ran toward him.',
        '牛郎在鵲橋上跑。織女向他跑來。'),
      // Q9 mc paraphrase about reunion (X3 fix)
      mc('kt-ch12-l6-q9',
        'They met in the middle of the sky and held each other tight.',
        'Where did Niulang and Zhinu meet again?',
        ['back at the river below', 'high above on the bridge', 'inside an old house', 'far in the deep woods'],
        ['河邊', '橋上的高處', '舊屋裡', '深森林'],
        1,
        '推理: 在天空中間 → 橋上的高處 (paraphrase)。'),
      // Q10 BEAT — they cry happy
      nar('kt-ch12-l6-q10',
        'They both cried, but this time the tears were warm and glad.',
        '兩人都哭了,但這次的眼淚是溫暖又開心的。'),
      // Q11 HOOK — B6 預言種子 (鵲橋是什麼? 還會出現嗎?)
      nar('kt-ch12-l6-q11',
        'The magpie bridge held just for tonight. Just for them. Just...',
        '鵲橋只為今晚撐住。只為他們。只為……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch12-7: Once a year on Qixi (B6 open — 為什麼這天看星星?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch12-l7', chapter: 12, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'cowherd-weaver',
    storyBeat: '七夕一年一見 — 為什麼這天看星星?',
    questions: [
      vocabIntro('kt-ch12-l7-q1', [
        ['年', 'year'],
        ['月', 'moon'],
        ['夜', 'night'],
        ['記得', 'remember'],
      ]),
      // Q2 BEAT A
      nar('kt-ch12-l7-q2',
        'The Queen saw them meet. Her heart became a little soft.',
        '王母娘娘看到他們相見。她的心稍微軟了一點。'),
      // Q3 mc paraphrase about queen softening (X2: vary starts)
      mc('kt-ch12-l7-q3',
        'She thought of her own family far above the clouds.',
        'Why did the Queen become a little soft?',
        ['she was too tired', 'she missed her own kin', 'the cow asked her to', 'the river was warm'],
        ['她太累', '她想念自己的家人', '老牛叫她', '河水很暖'],
        1,
        '推理: 想到自己的家人 → 想念自己的家人 (paraphrase)。'),
      // Q4 BEAT B — she sets the rule
      nar('kt-ch12-l7-q4',
        '"Once each year," she said, "on the seventh night of the seventh moon."',
        '「每年一次,」她說,「在七月的第七個晚上。」'),
      // Q5 TF inference (time — once each year = rare)
      tf('kt-ch12-l7-q5',
        'Every other night, the silver river kept them apart.',
        '其他每個晚上,銀河都把他們分開。',
        'Could they meet many times a year?', 'N',
        '推理: 其他每晚都分開 → 一年只一次 → 答 No'),
      // Q6 BEAT C — magpies will return
      nar('kt-ch12-l7-q6',
        '"The magpies will come. You may meet on the bridge for one night."',
        '「喜鵲會來。你們可以在橋上相見一晚。」'),
      // Q7 emoji
      emoji('kt-ch12-l7-q7',
        'How often can Niulang and Zhinu meet?',
        'How often do they meet?',
        ['🌟 once a year', '🌞 every day', '🌙 every month', '🚫 never again'],
        ['一年一次', '每天', '每月', '再也不見'],
        0,
        '一年一次 → once a year。'),
      // Q8 BEAT D — Qixi anchor
      nar('kt-ch12-l7-q8',
        'And so every Qixi, Chinese families look up at the sky.',
        '所以每年七夕,中華家庭都會抬頭看天。'),
      // Q9 mc paraphrase about Qixi meaning (X3 fix)
      mc('kt-ch12-l7-q9',
        'They tell the story to their children under the bright stars.',
        'What do Chinese families do on Qixi night?',
        ['hide inside the home', 'share the old tale', 'wash all the clothes', 'plant new flowers'],
        ['躲在家裡', '說這個古老故事', '洗所有衣服', '種新花'],
        1,
        '推理: 對孩子講故事 → 說這個古老故事 (paraphrase)。'),
      // Q10 BEAT — kids look at stars
      nar('kt-ch12-l7-q10',
        'Children point at two bright stars across the silver river.',
        '孩子們指著銀河兩端的兩顆亮星。'),
      // Q11 HOOK — B6 open (為什麼這天看星星? user 想念誰?)
      nar('kt-ch12-l7-q11',
        'One star on each side. Waiting. Until next year. Until next Qixi...',
        '兩邊各一顆星。等待。等到明年。等到下一個七夕……'),
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
