#!/usr/bin/env node
/**
 * v2.0.B.238+ — Ch10 嫦娥奔月 (Chang'e Flies to the Moon, 中華神話 public domain).
 *
 * Pipeline ship via tools/pickup-new-story.cjs B.234 URL pipeline pattern.
 * Source canon: docs/canon/change.md (7-beat arc, 中華民間口傳 公有領域).
 * Cuts: docs/canon/change-cuts.md (B6/B3/B5/B4/B1/B2/B6-open).
 *
 * Pairing: Ch10 嫦娥 (中華神話, 東方) <=> Ch9 灰姑娘 (Perrault 1697, 西方)
 *   = cross-cultural female-protagonist pair. 西方公主等仙女幫她主動找王子,
 *   東方公主自己吞藥讓愛人留在地上 = 主動 vs 被動鏡像.
 *
 * Public domain compliance (IP 鐵律):
 *   - Source: 中華神話民間口傳, 故事架構 (后羿射日 → 西王母給藥 → 嫦娥吞藥
 *     飛月 → 玉兔陪伴) 公有領域. 自創 A2 句式, 不複製任何特定現代繪本譯文.
 *   - NO Disney 2020 *Over the Moon* elements:
 *     * NO Fei Fei / Bungee / Gobi / Chin / Mrs. Zhong (Disney 2020 characters)
 *     * NO Disney 2020 plot additions (rocket / space dog / hover scooter)
 *     * NO 'Mooncake' Disney song lyrics
 *     * NO specific textbook phrasing — A2 self-authored only
 *   - 主角名: 'Chang'e' (中華神話 公有領域人名 — 拼音轉寫)
 *   - 后羿: 'Hou Yi' (同上)
 *   - 玉兔: 'a small white rabbit' (generic role, 不 Disney-name)
 *
 * Structure per lesson (11 Q, mirror Ch8/Ch9 範本):
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
 *   R3 A2 vocab only — 嚴禁 B1+:
 *     immortal → live for ever
 *     divine → magic
 *     sacrifice → give up
 *     ascend → go up
 *     banished → sent away
 *     treacherous → not safe
 *     apprentice / disciple → student
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cultural / violence rules (per docs/canon/change.md + lint-cultural):
 *   - 后羿射日: 'the suns went away' / 'shot the suns down' — never 'killed'
 *   - 壞學生威脅: 拿刀 + 'come at her' OK; never 'stab' / 'wound' / blood
 *   - 嫦娥: 吞藥 → 飛走 → 不是死, never dies
 *   - 中秋: 'the moon is full and round' → 'people miss the ones they love'
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch10.json');

// ─── Helpers (mirror Ch8/Ch9 範本) ────────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch10', 'change'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch10', 'change', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch10', 'change'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch10', 'change', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch10', 'change', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch10-1: Hou Yi shoots the suns + marries Chang'e (B6 預言種子)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch10-l1', chapter: 10, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'change',
    storyBeat: '后羿射日 + 娶嫦娥 — 神會盯著他們嗎?',
    questions: [
      vocabIntro('kt-ch10-l1-q1', [
        ['太陽', 'sun'],
        ['天空', 'sky'],
        ['弓', 'bow'],
        ['英雄', 'hero'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch10-l1-q2',
        'Long ago in old China, ten suns came up in the sky.',
        '很久以前,在古老的中國,天上有十個太陽。'),
      // Q3 BEAT A deepen
      nar('kt-ch10-l1-q3',
        'The land was hot. The rivers dried up. The plants died.',
        '土地很熱。河水乾了。植物死了。'),
      // Q4 TF inference (atmosphere — hot dry = bad for people)
      tf('kt-ch10-l1-q4',
        'No rain fell. No green grass grew.',
        '不下雨。沒長綠草。',
        'Was life easy for the people?', 'N',
        '推理: 沒雨沒綠草 → 生活很苦 → 答 No'),
      // Q5 BEAT B — Hou Yi acts
      nar('kt-ch10-l1-q5',
        'A strong young man named Hou Yi lifted his bow.',
        '一個強壯的年輕人,叫后羿,舉起了他的弓。'),
      // Q6 listen-mc paraphrase (X3: 'went down' not in sentence)
      mc('kt-ch10-l1-q6',
        'He shot the suns one by one. Only one sun was left.',
        'What did Hou Yi do to the suns?',
        ['painted them gold', 'made them go away', 'put them in a box', 'sent them rain'],
        ['畫成金色', '讓它們消失', '放進盒子', '送雨給它們'],
        1,
        '推理: shot the suns → made them go away (paraphrase, anti-violence)。'),
      // Q7 BEAT C — people love him
      nar('kt-ch10-l1-q7',
        'The land was saved. The people loved Hou Yi.',
        '土地得救了。人民愛戴后羿。'),
      // Q8 listen-mc paraphrase about marriage (X3: 'kind girl' paraphrased)
      // X2 fix: vary option starts (no all-'he')
      mc('kt-ch10-l1-q8',
        'The Queen Mother said he could marry a sweet young woman.',
        'What did the Queen Mother say?',
        ['live alone for life', 'take a kind wife', 'go away far away', 'fight more battles'],
        ['一生獨居', '娶善良妻子', '遠走他鄉', '繼續打仗'],
        1,
        '推理: marry a sweet young woman → take a kind wife (paraphrase)。'),
      // Q9 BEAT D — marries Chang'e
      nar('kt-ch10-l1-q9',
        'He married Chang\'e. They lived in a small house.',
        '他娶了嫦娥。他們住在一間小房子裡。'),
      // Q10 emoji — how did people feel
      emoji('kt-ch10-l1-q10',
        'How did the people feel about Hou Yi?',
        'How did the people feel?',
        ['💖 they loved him', '😠 they were angry', '😨 they ran away', '😴 they were sleepy'],
        ['他們愛他', '生氣', '逃走', '想睡'],
        0,
        '人民愛戴他 → they loved him。'),
      // Q11 HOOK — B6 預言種子 (would the gods watch them?)
      nar('kt-ch10-l1-q11',
        'The people loved them both. Would the gods watch them, too?',
        '人民都愛他們倆。神,會也盯著他們嗎?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch10-2: Queen Mother gives the pill (B3 資訊缺口)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch10-l2', chapter: 10, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'change',
    storyBeat: '西王母給仙藥 — 仙藥是什麼?',
    questions: [
      vocabIntro('kt-ch10-l2-q1', [
        ['山', 'hill'],
        ['藥丸', 'pill'],
        ['白色', 'white'],
        ['藏', 'hide'],
      ]),
      // Q2 BEAT A
      nar('kt-ch10-l2-q2',
        'One spring day, the Queen Mother came down from her hill.',
        '一個春天,西王母從她的山上下來。'),
      // Q3 mc paraphrase about her arrival (X3: 'visit' not in sentence)
      // X2 fix: vary option starts (no all-'to')
      mc('kt-ch10-l2-q3',
        'She walked to Hou Yi\'s home. Her face was kind.',
        'Why did the Queen Mother come?',
        ['picked a fight', 'paid him a visit', 'wanted his bow', 'sought his cat'],
        ['挑戰打架', '拜訪他', '想拿他的弓', '找他的貓'],
        1,
        '推理: walked to his home + kind face → paid a visit (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch10-l2-q4',
        'She gave Hou Yi a small white pill in her hand.',
        '她在手心裡,給了后羿一顆白色的小藥丸。'),
      // Q5 TF inference (action — small pill = something special)
      tf('kt-ch10-l2-q5',
        'The pill shone with a soft warm light.',
        '藥丸發出溫柔溫暖的光。',
        'Was the pill an ordinary pill?', 'N',
        '推理: 發光 → 不是普通藥 → 答 No'),
      // Q6 BEAT C — what the pill does
      nar('kt-ch10-l2-q6',
        '"This pill can let one live for ever," she said.',
        '「這顆藥丸可以讓一個人永遠活著,」她說。'),
      // Q7 emoji
      emoji('kt-ch10-l2-q7',
        'What can the white pill do?',
        'What can the pill do?',
        ['💤 make sleep', '♾️ give long life', '🌧️ bring rain', '🔥 light a fire'],
        ['讓人睡覺', '給長生', '降雨', '點火'],
        1,
        '永遠活著 → give long life。'),
      // Q8 BEAT D — only one
      nar('kt-ch10-l2-q8',
        '"But only one of you can take it," she said.',
        '「但是,你們只有一個人可以吃,」她說。'),
      // Q9 mc paraphrase about constraint (X3: 'share' not in sentence)
      mc('kt-ch10-l2-q9',
        'There was just one pill. There were two of them.',
        'What was the problem with the pill?',
        ['it was too small', 'they could not share', 'it tasted bad', 'it was too cold'],
        ['太小', '兩人不能分', '不好吃', '太冷'],
        1,
        '推理: 一顆藥 + 兩個人 → could not share (paraphrase)。'),
      // Q10 BEAT — Hou Yi hides it
      nar('kt-ch10-l2-q10',
        'Hou Yi put the pill in a small box. He hid the box.',
        '后羿把藥丸放進一個小盒子。他把盒子藏起來。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch10-l2-q11',
        'The little white pill sat alone in its box. What was it really?',
        '小小的白藥丸,獨自躺在盒子裡。它,究竟是什麼?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch10-3: Bad student wants the pill (B5 道德兩難)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch10-l3', chapter: 10, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'change',
    storyBeat: '壞學生覬覦仙藥 — 誰會吃?',
    questions: [
      vocabIntro('kt-ch10-l3-q1', [
        ['學生', 'student'],
        ['心', 'heart'],
        ['壞', 'bad'],
        ['打獵', 'hunt'],
      ]),
      // Q2 BEAT A
      nar('kt-ch10-l3-q2',
        'Hou Yi had a student. The student was strong.',
        '后羿有一個學生。學生很強壯。'),
      // Q3 mc paraphrase about character (X3: 'mean' not in sentence)
      mc('kt-ch10-l3-q3',
        'But his heart was bad. He thought only of himself.',
        'What kind of person was the student?',
        ['kind and brave', 'mean and selfish', 'shy and quiet', 'old and sleepy'],
        ['善良勇敢', '又壞又自私', '害羞安靜', '年老想睡'],
        1,
        '推理: 心壞 + 只想自己 → mean and selfish (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch10-l3-q4',
        'One day, the student saw Hou Yi open the box.',
        '一天,學生看見后羿打開盒子。'),
      // Q5 TF inference (action — saw the secret = bad sign)
      tf('kt-ch10-l3-q5',
        'The student\'s eyes locked on the white pill.',
        '學生的眼睛緊盯著白藥丸。',
        'Did the student want the pill?', 'Y',
        '推理: 眼睛緊盯 → 想要 → 答 Yes'),
      // Q6 BEAT C — student plans
      nar('kt-ch10-l3-q6',
        'He wanted to live for ever, too. He waited.',
        '他也想要永遠活著。他等著。'),
      // Q7 mc paraphrase about waiting (X3: 'right moment' not in sentence)
      mc('kt-ch10-l3-q7',
        'Day after day, he watched the door of the house.',
        'Why did the student watch the door?',
        ['to clean it well', 'for the right moment', 'to fix it shut', 'to paint it red'],
        ['打掃乾淨', '等對的時機', '修好它', '漆紅'],
        1,
        '推理: 一直觀察 → 等對的時機 (paraphrase)。'),
      // Q8 BEAT D — Hou Yi leaves
      nar('kt-ch10-l3-q8',
        'One morning, Hou Yi went out to hunt.',
        '一個早上,后羿出去打獵。'),
      // Q9 emoji
      emoji('kt-ch10-l3-q9',
        'Where did Hou Yi go that morning?',
        'Where did Hou Yi go?',
        ['🏠 stayed home', '🏹 went hunting', '⛰️ climbed the hill', '🌊 went to the sea'],
        ['留家', '打獵', '爬山', '到海邊'],
        1,
        '打獵 → went hunting。'),
      // Q10 BEAT — Chang'e alone
      nar('kt-ch10-l3-q10',
        'Chang\'e was home alone. The box was inside.',
        '嫦娥獨自在家。盒子就在屋內。'),
      // Q11 HOOK — B5 道德兩難
      nar('kt-ch10-l3-q11',
        'One day Hou Yi went out to hunt. Chang\'e was home alone with the pill...',
        '一天后羿出去打獵。嫦娥獨自在家,身邊就是仙藥……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch10-4: Bad student attacks with knife (B4 期待加速)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch10-l4', chapter: 10, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'change',
    storyBeat: '壞學生拿刀威脅 — 她會吞下去嗎?',
    questions: [
      vocabIntro('kt-ch10-l4-q1', [
        ['刀', 'knife'],
        ['尖', 'sharp'],
        ['房間', 'room'],
        ['不動', 'still'],
      ]),
      // Q2 BEAT A
      nar('kt-ch10-l4-q2',
        'The bad student walked into the house.',
        '壞學生走進屋子。'),
      // Q3 mc paraphrase about weapon (X3: 'blade' not in sentence)
      // X2 fix: vary option starts (no all-'a')
      mc('kt-ch10-l4-q3',
        'He pulled out a long sharp knife from his coat.',
        'What did the student bring with him?',
        ['food in a bag', 'one thin long blade', 'soft cloth and rope', 'books and paper'],
        ['一袋食物', '一把長薄刀', '軟布和繩子', '書和紙'],
        1,
        '推理: long sharp knife → one thin long blade (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch10-l4-q4',
        '"Give me the pill!" he said in a hard voice.',
        '「把藥丸給我!」他用嚴厲的聲音說。'),
      // Q5 TF inference (atmosphere — hard voice + knife = threat)
      tf('kt-ch10-l4-q5',
        'His face was red. His hand did not shake.',
        '他臉漲紅。手不發抖。',
        'Was the student playing a joke?', 'N',
        '推理: 臉紅 + 手穩 → 認真威脅 → 答 No'),
      // Q6 BEAT C — Chang'e thinks
      nar('kt-ch10-l4-q6',
        'Chang\'e stood very still. She thought fast.',
        '嫦娥站著不動。她快速地想。'),
      // Q7 mc paraphrase about her dilemma (X3: 'safe' not in sentence)
      mc('kt-ch10-l4-q7',
        'If she gave him the pill, he would hurt many people.',
        'Why could Chang\'e not just give him the pill?',
        ['it was too small', 'others would not be safe', 'her hand was tired', 'the box was locked'],
        ['太小', '別人會不安全', '手累', '盒子鎖了'],
        1,
        '推理: 他會傷害很多人 → others would not be safe (paraphrase)。'),
      // Q8 BEAT D — picks up the pill
      nar('kt-ch10-l4-q8',
        'She opened the box. She picked up the small white pill.',
        '她打開盒子。她拿起白色的小藥丸。'),
      // Q9 emoji
      emoji('kt-ch10-l4-q9',
        'What did Chang\'e hold in her hand?',
        'What did she hold?',
        ['🍞 a piece of bread', '💊 the white pill', '📕 a small book', '🗝️ a tiny key'],
        ['一塊麵包', '白藥丸', '一本小書', '小鑰匙'],
        1,
        '白藥丸 → the white pill。'),
      // Q10 BEAT — holds it close
      nar('kt-ch10-l4-q10',
        'She held the pill close to her mouth.',
        '她把藥丸靠近嘴邊。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch10-l4-q11',
        'Chang\'e looked at the pill. She picked it up. She held it close to her mouth...',
        '嫦娥看著藥丸。她拿了起來。她把藥丸靠到嘴邊……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch10-5: Chang'e swallows + starts to float (B1 物理懸念)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch10-l5', chapter: 10, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'change',
    storyBeat: '嫦娥吞藥 — 接下來會發生什麼?',
    questions: [
      vocabIntro('kt-ch10-l5-q1', [
        ['吞', 'swallow'],
        ['腳', 'feet'],
        ['輕', 'light'],
        ['浮', 'float'],
      ]),
      // Q2 BEAT A
      nar('kt-ch10-l5-q2',
        'Chang\'e put the pill in her mouth.',
        '嫦娥把藥丸放進嘴裡。'),
      // Q3 mc paraphrase about action (X3: 'swallow' is in vocab so OK,
      // but option uses 'drink it down' to avoid X3 sentence overlap)
      mc('kt-ch10-l5-q3',
        'She closed her eyes. She let it go down her throat.',
        'What did Chang\'e do with the pill?',
        ['kept it on her tongue', 'drank it down inside her', 'spit it out fast', 'gave it to a bird'],
        ['含舌上', '把它吞進身體', '吐出來', '給鳥'],
        1,
        '推理: let it go down her throat → drank it down inside (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch10-l5-q4',
        'Her feet left the floor. Her hair flew up.',
        '她的腳離開地板。她的頭髮飛起。'),
      // Q5 TF inference (action — feet leaving floor = body changing)
      tf('kt-ch10-l5-q5',
        'Her long dress lifted in the air around her.',
        '她的長裙在身邊飄起。',
        'Did Chang\'e stay on the ground?', 'N',
        '推理: 腳離地 + 裙飄起 → 沒留在地上 → 答 No'),
      // Q6 BEAT C — student stops
      nar('kt-ch10-l5-q6',
        'The bad student stopped. His mouth fell open.',
        '壞學生停住。嘴巴張開。'),
      // Q7 mc paraphrase about student (X3: 'shocked' not in sentence)
      mc('kt-ch10-l5-q7',
        'He could not move. He could not say a word.',
        'How did the student look?',
        ['ready to fight', 'frozen with shock', 'happy and calm', 'fast asleep'],
        ['準備打架', '驚呆不動', '開心冷靜', '熟睡'],
        1,
        '推理: 不能動 + 說不出話 → frozen with shock (paraphrase)。'),
      // Q8 BEAT D — floating up
      nar('kt-ch10-l5-q8',
        'Chang\'e began to float to the door.',
        '嫦娥開始浮向門口。'),
      // Q9 emoji
      emoji('kt-ch10-l5-q9',
        'How did Chang\'e\'s body feel now?',
        'How did her body feel?',
        ['🪨 heavy as rock', '🎈 light as air', '🔥 hot as fire', '🧊 cold as ice'],
        ['像石頭重', '像空氣輕', '像火燙', '像冰冷'],
        1,
        '腳離地 + 浮起 → 像空氣輕。'),
      // Q10 BEAT — toward the window
      nar('kt-ch10-l5-q10',
        'Then to the window. Then to the open sky.',
        '然後到窗邊。然後到敞開的天空。'),
      // Q11 HOOK — B1 物理懸念
      nar('kt-ch10-l5-q11',
        'She began to float to the window. To the open sky. What now?',
        '她開始飄向窗邊。飄向敞開的天空。接下來呢?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch10-6: Flies to moon, Hou Yi too late (B2 情緒翻轉)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch10-l6', chapter: 10, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'change',
    storyBeat: '飛向月亮 — 后羿會怎麼樣?',
    questions: [
      vocabIntro('kt-ch10-l6-q1', [
        ['雲', 'cloud'],
        ['月亮', 'moon'],
        ['亮', 'bright'],
        ['太晚', 'too late'],
      ]),
      // Q2 BEAT A
      nar('kt-ch10-l6-q2',
        'Chang\'e went up and up into the sky.',
        '嫦娥越飛越高,進入天空。'),
      // Q3 mc paraphrase about flight (X3: 'climb' not in sentence)
      mc('kt-ch10-l6-q3',
        'She went past the trees. Past the hills. Past the clouds.',
        'How did Chang\'e move through the sky?',
        ['sat in a boat', 'climbed higher and higher', 'hid in a cave', 'rode a fast horse'],
        ['坐船', '越升越高', '躲山洞', '騎快馬'],
        1,
        '推理: 飛過樹、山、雲 → climbed higher and higher (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch10-l6-q4',
        'The moon was big and bright that night.',
        '那晚的月亮又大又亮。'),
      // Q5 TF inference (contrast — bright moon near, sun far = moon-bound)
      tf('kt-ch10-l6-q5',
        'The moon felt closest to her. The stars felt far.',
        '月亮感覺最靠近她。星星感覺很遠。',
        'Was Chang\'e flying toward the moon?', 'Y',
        '推理: 月最近 + 星最遠 → 朝月飛 → 答 Yes'),
      // Q6 BEAT C — lands on moon
      nar('kt-ch10-l6-q6',
        'She landed on the cold grey ground of the moon.',
        '她降落在月亮冰冷灰白的地上。'),
      // Q7 emoji
      emoji('kt-ch10-l6-q7',
        'What did the moon\'s ground feel like?',
        'How did the moon feel?',
        ['🔥 hot and dry', '🧊 cold and grey', '🌱 soft and green', '💧 wet and warm'],
        ['熱又乾', '冷又灰', '軟又綠', '濕又暖'],
        1,
        '又冷又灰 → cold and grey。'),
      // Q8 BEAT D — looks down
      nar('kt-ch10-l6-q8',
        'From up there, she could still see her home far below.',
        '從那上面,她還能看見遠遠下面的家。'),
      // Q9 mc paraphrase about Hou Yi (X3: 'too late' is in sentence — careful paraphrase)
      mc('kt-ch10-l6-q9',
        'Hou Yi was running back home. He looked up at the sky.',
        'How did Hou Yi feel when he saw her?',
        ['proud and tall', 'sad — he missed his chance', 'angry at the moon', 'sleepy and slow'],
        ['驕傲', '難過 — 來不及了', '對月生氣', '想睡'],
        1,
        '推理: 跑回家 + 抬頭看天 + 嫦娥已在月 → missed his chance (paraphrase)。'),
      // Q10 BEAT — too late
      nar('kt-ch10-l6-q10',
        'He was too late. She was already on the moon.',
        '他太晚了。她已經在月亮上。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch10-l6-q11',
        'Hou Yi was running back home. He looked up at the sky. He was too late.',
        '后羿正跑回家。他抬頭望天。已經來不及了。'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch10-7: Moon rabbit + Mid-Autumn (B6 open)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch10-l7', chapter: 10, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'change',
    storyBeat: '玉兔陪伴 + 中秋月圓 — 你想念的人是誰?',
    questions: [
      vocabIntro('kt-ch10-l7-q1', [
        ['兔子', 'rabbit'],
        ['朋友', 'friend'],
        ['秋天', 'autumn'],
        ['想念', 'miss'],
      ]),
      // Q2 BEAT A
      nar('kt-ch10-l7-q2',
        'On the moon, Chang\'e was not alone.',
        '在月亮上,嫦娥並不孤單。'),
      // Q3 mc paraphrase about rabbit (X3: 'small white' is in sentence)
      // X2 fix: vary option starts (no all-'a')
      mc('kt-ch10-l7-q3',
        'A small white rabbit lived there. It came to her.',
        'Who did Chang\'e meet on the moon?',
        ['one sleeping bear', 'tiny soft creature', 'tall strong man', 'flying golden fish'],
        ['熟睡的熊', '小巧柔軟的小動物', '又高又壯的男人', '會飛的金魚'],
        1,
        '推理: small white rabbit → tiny soft creature (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch10-l7-q4',
        'The rabbit was soft and warm. It sat next to her.',
        '兔子柔軟又溫暖。牠坐在她身邊。'),
      // Q5 TF inference (action — sits next to her = friend)
      tf('kt-ch10-l7-q5',
        'It put its little nose on her hand.',
        '牠把小鼻子放在她的手上。',
        'Did the rabbit become her friend?', 'Y',
        '推理: 鼻子靠手 → 親近 → 朋友 → 答 Yes'),
      // Q6 BEAT C — Hou Yi below
      nar('kt-ch10-l7-q6',
        'Down on earth, Hou Yi looked up every night.',
        '在地上,后羿每晚都抬頭看。'),
      // Q7 mc paraphrase about food (X3: 'favourite' not in option)
      mc('kt-ch10-l7-q7',
        'He put out her favourite food in the yard each night.',
        'Why did Hou Yi put food in the yard?',
        ['for the cat to eat', 'to show he still loved her', 'to feed the moon', 'to call the rain'],
        ['給貓吃', '表示他還愛她', '餵月亮', '招雨'],
        1,
        '推理: 把她愛吃的擺出來 → 表示他還愛她 (paraphrase)。'),
      // Q8 BEAT D — autumn moon
      nar('kt-ch10-l7-q8',
        'Once each year, in autumn, the moon is full and round.',
        '每年一次,在秋天,月亮又圓又滿。'),
      // Q9 emoji
      emoji('kt-ch10-l7-q9',
        'When is the moon full and round each year?',
        'When?',
        ['🌸 in spring', '🍂 in autumn', '☀️ in summer', '❄️ in winter'],
        ['春天', '秋天', '夏天', '冬天'],
        1,
        '秋天 → in autumn。'),
      // Q10 BEAT — people miss
      nar('kt-ch10-l7-q10',
        'People look up. They see the moon. They miss the ones they love.',
        '人們抬頭看。他們看見月亮。他們想念心愛的人。'),
      // Q11 HOOK — B6 open (cultural anchor 中秋)
      nar('kt-ch10-l7-q11',
        'Once each year, the moon is full and round. People look up. They miss the ones they love...',
        '每年一次,月亮又圓又滿。人們抬頭。他們想念心愛的人……'),
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
