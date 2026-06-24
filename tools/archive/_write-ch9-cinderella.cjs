#!/usr/bin/env node
/**
 * v2.0.B.236+ — Ch9 灰姑娘 (Cinderella, Perrault 1697 public domain).
 *
 * Pipeline ship via tools/pickup-new-story.cjs B.234 URL pipeline pattern.
 * Source canon: docs/canon/cinderella.md (7-beat arc, Perrault 1697 / Grimm 1812).
 * Cuts: docs/canon/cinderella-cuts.md (B6/B3/B5/B4/B6/B2/B6-open).
 *
 * Pairing: Ch9 Cinderella (French 1697) <=> Ch7 葉限 (Tang Chinese ~860)
 *   = cross-cultural Cinderella教學對, 對 8-12 兒童客群文化 awareness 強.
 *
 * Public domain compliance:
 *   - Source: Charles Perrault, Cendrillon (1697). Author d.1703 (life+70+)
 *   - Cross-source: Brothers Grimm, Aschenputtel (1812). Public domain.
 *   - NO Disney 1950 elements:
 *     * 鞋 = 'fur slipper' (Perrault original pantoufle de vair), NOT glass
 *     * NO Bibbidi-Bobbidi-Boo / "A Dream is a Wish"
 *     * NO Disney character names (Lady Tremaine / Anastasia / Drizella /
 *       Lucifer / Jaq / Gus / Bruno)
 *     * NO Disney 1950 added scenes (mice making dress, cat villain)
 *   - 主角名: 'Cinderella' (Perrault 公有領域 + Disney 沒擁有 name)
 *   - 仙女: 'fairy godmother' (Perrault 公有領域 generic role)
 *
 * Structure per lesson (11 Q, mirror Ch7/Ch8 範本):
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
 *   R3 A2 vocab only (no enchanted/majestic/lavish/whispered)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cross-cultural pairing rules (per cinderella-cuts.md):
 *   - L1 mirrors Ch7-L1 (after stepfamily B6 預言)
 *   - L4 mirrors Ch7-L4 (神秘外力 B4 期待加速)
 *   - L6 mirrors Ch7-L6 (鞋掉了 B2/B1)
 *   - L7 final beat: Perrault 善良內化 (NOT 葉限 天罰結局)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch9.json');

// ─── Helpers (mirror Ch8/Ch7 範本) ────────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch9', 'cinderella'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch9', 'cinderella', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch9', 'cinderella'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch9', 'cinderella', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch9', 'cinderella', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch9-1: Father remarries (B6 預言種子 — 後母會偏心嗎?)
  // Mirror Ch7-L1 (葉限 後母 also B6)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch9-l1', chapter: 9, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'cinderella',
    storyBeat: '父親再婚 — 新家有兩個姊姊',
    questions: [
      vocabIntro('kt-ch9-l1-q1', [
        ['父親', 'father'],
        ['新的', 'new'],
        ['妻子', 'wife'],
        ['女兒', 'daughter'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch9-l1-q2',
        'Long ago in France, a kind girl lived with her father.',
        '很久以前在法國,有個善良的女孩跟父親住在一起。'),
      // Q3 BEAT A deepen
      nar('kt-ch9-l1-q3',
        'Her own mother had died. Her father took a new wife.',
        '她的親生媽媽已經過世。父親娶了新妻子。'),
      // Q4 TF inference (atmosphere — quiet sadness implies loss)
      tf('kt-ch9-l1-q4',
        'At night the girl held her mother\'s soft shawl close.',
        '夜裡女孩把媽媽的軟披肩抱在懷裡。',
        'Did the girl miss her mother?', 'Y',
        '推理: 把媽媽的東西抱在懷裡 → 想念 → 答 Yes'),
      // Q5 BEAT B
      nar('kt-ch9-l1-q5',
        'The new wife had two grown daughters of her own.',
        '新妻子有自己的兩個大女兒。'),
      // Q6 listen-mc paraphrase about sisters (X3 anti-verbatim:
      // correct words "do not work" / "soft skin" 不在 sentence)
      mc('kt-ch9-l1-q6',
        'They wore fine dresses and had soft hands.',
        'What kind of life did the two sisters have?',
        ['they worked very hard', 'an easy and rich life', 'they grew food', 'they lived alone'],
        ['工作很辛苦', '輕鬆又富有的生活', '種田', '一個人住'],
        1,
        '推理: 漂亮衣服 + 手很軟 → 輕鬆又富有的生活 (paraphrase)。'),
      // Q7 BEAT C — first sign of trouble
      nar('kt-ch9-l1-q7',
        'They sat in the sun. They did no work at all.',
        '她們坐在陽光下。完全不做事。'),
      // Q8 listen-mc paraphrase about contrast (X2 fix: vary option starts)
      mc('kt-ch9-l1-q8',
        'The kind girl watched them and stayed quiet.',
        'How did the girl react to the two sisters?',
        ['laughed out loud', 'kept her mouth shut', 'ran away fast', 'pushed them down'],
        ['大聲笑', '閉口不說', '快跑走', '推她們'],
        1,
        '推理: stayed quiet → 閉口不說 (paraphrase)。'),
      // Q9 BEAT D — new wife appears
      nar('kt-ch9-l1-q9',
        'The new wife looked at the girl with cold eyes.',
        '新妻子用冷冷的眼神看著女孩。'),
      // Q10 emoji — how did new wife feel
      emoji('kt-ch9-l1-q10',
        'How did the new wife feel about the girl?',
        'How did the new wife feel?',
        ['💖 warm and kind', '🧊 cold and hard', '😴 sleepy', '🎉 happy'],
        ['溫暖又善良', '又冷又硬', '想睡', '開心'],
        1,
        '冷冷的眼神 = cold and hard。'),
      // Q11 HOOK — B6 預言種子 (mirror Ch7-L1)
      nar('kt-ch9-l1-q11',
        'The new wife\'s cold look stayed in the girl\'s mind...',
        '新妻子那冷冷的眼神留在女孩心裡……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch9-2: The cinder corner / they call her Cinderella (B3 資訊缺口)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch9-l2', chapter: 9, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'cinderella',
    storyBeat: '灰塵堆 — 她哭給誰聽?',
    questions: [
      vocabIntro('kt-ch9-l2-q1', [
        ['掃', 'sweep'],
        ['煮', 'cook'],
        ['火', 'fire'],
        ['灰', 'ash'],
      ]),
      // Q2 BEAT A
      nar('kt-ch9-l2-q2',
        'The new wife was not kind to the girl.',
        '新妻子對女孩不好。'),
      // Q3 mc paraphrase about workload
      mc('kt-ch9-l2-q3',
        'She made the girl sweep, cook, and carry water all day.',
        'What did the new wife make the girl do?',
        ['rest in bed', 'a lot of house work', 'read books', 'play with friends'],
        ['在床上休息', '一堆家事', '看書', '跟朋友玩'],
        1,
        '推理: sweep + cook + carry water → 一堆家事 (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch9-l2-q4',
        'At night, the girl slept by the fire to stay warm.',
        '夜裡,女孩睡在火爐邊保暖。'),
      // Q5 TF inference (action — sleep by fire means no bed)
      tf('kt-ch9-l2-q5',
        'She had no soft bed. She had no warm room.',
        '她沒有軟床。她沒有溫暖的房間。',
        'Was the girl treated well at home?', 'N',
        '推理: 沒床沒房 → 沒被善待 → 答 No'),
      // Q6 BEAT C — ash on clothes
      nar('kt-ch9-l2-q6',
        'Her clothes got grey with ash from the fire.',
        '她的衣服被火灰染成灰色。'),
      // Q7 emoji
      emoji('kt-ch9-l2-q7',
        'What color were the girl\'s clothes?',
        'What color were her clothes?',
        ['🌸 pink', '⚫ grey', '🌟 gold', '🌊 blue'],
        ['粉紅', '灰', '金', '藍'],
        1,
        '被火灰染色 → 灰色。'),
      // Q8 BEAT D — naming
      nar('kt-ch9-l2-q8',
        'The two sisters laughed and called her Cinderella.',
        '兩個姊姊大笑,叫她灰姑娘 (Cinderella)。'),
      // Q9 mc paraphrase about name meaning
      mc('kt-ch9-l2-q9',
        'The word came from the cinders that stained her gown.',
        'Why did they call her Cinderella?',
        ['she liked the name', 'because of the ash on her', 'her father chose it', 'she sang of fire'],
        ['她喜歡', '因為她身上有灰', '父親取的', '她唱火的歌'],
        1,
        '推理: 名字來自身上的灰 → 因為她身上有灰 (paraphrase)。'),
      // Q10 BEAT — alone by fire
      nar('kt-ch9-l2-q10',
        'When the others slept, she sat by the fire and cried.',
        '別人睡著時,她坐在火爐邊哭。'),
      // Q11 HOOK — B3 資訊缺口 (who is listening?)
      nar('kt-ch9-l2-q11',
        'Only the fire heard her. Only the wind heard her. Only the night...',
        '只有火聽見她。只有風聽見她。只有夜……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch9-3: Ball invitation — she cannot go (B5 道德兩難)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch9-l3', chapter: 9, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'cinderella',
    storyBeat: '舞會公告 — 她也可以去嗎?',
    questions: [
      vocabIntro('kt-ch9-l3-q1', [
        ['國王', 'king'],
        ['舞會', 'ball'],
        ['城鎮', 'town'],
        ['幫忙', 'help'],
      ]),
      // Q2 BEAT A
      nar('kt-ch9-l3-q2',
        'The king\'s son was going to have a big ball.',
        '國王的兒子要辦一場大舞會。'),
      // Q3 mc paraphrase about purpose (X2 fix: vary option starts;
      // X3 fix: "look for a wife" 跟 sentence "find a wife" 同義 not verbatim)
      mc('kt-ch9-l3-q3',
        'He wanted to find a wife. Every girl in town was asked.',
        'Why did the prince hold the ball?',
        ['for selling food', 'so he could choose a bride', 'his horses were tired', 'gold needed counting'],
        ['為了賣食物', '為了選出新娘', '他的馬累了', '要數金幣'],
        1,
        '推理: find a wife → choose a bride (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch9-l3-q4',
        'The two sisters bought new gowns. They laughed and danced.',
        '兩個姊姊買了新禮服。她們又笑又跳。'),
      // Q5 TF inference (contrast — sisters dance; what about Cinderella?)
      tf('kt-ch9-l3-q5',
        'They turned in the mirror. They tried each ribbon.',
        '她們在鏡子前轉圈。每條緞帶都試過。',
        'Were the two sisters excited for the ball?', 'Y',
        '推理: 試衣轉圈 → 興奮 → 答 Yes'),
      // Q6 BEAT C — Cinderella helps
      nar('kt-ch9-l3-q6',
        'Cinderella helped them dress for the big night.',
        '灰姑娘幫她們穿衣服準備大日子。'),
      // Q7 mc paraphrase about her work (X2 fix: vary option starts)
      mc('kt-ch9-l3-q7',
        'She tied their hair and washed their shoes for hours.',
        'How did Cinderella help her sisters?',
        ['by shouting at them', 'with many small tasks', 'giving them money', 'singing very loudly'],
        ['對她們大叫', '做很多小事', '給她們錢', '大聲唱歌'],
        1,
        '推理: 綁頭髮 + 洗鞋 → 做很多小事 (paraphrase)。'),
      // Q8 BEAT D — she asks (implied)
      nar('kt-ch9-l3-q8',
        'She looked at the new gowns with quiet eyes.',
        '她用安靜的眼神看著新禮服。'),
      // Q9 mc paraphrase about being excluded
      mc('kt-ch9-l3-q9',
        'But she could not go. She had no gown.',
        'Why could Cinderella not go to the ball?',
        ['she was too sleepy', 'she had nothing nice to wear', 'her father said no', 'it was raining hard'],
        ['太想睡', '沒有好衣服穿', '父親不准', '下大雨'],
        1,
        '推理: had no gown → 沒有好衣服穿 (paraphrase)。'),
      // Q10 emoji
      emoji('kt-ch9-l3-q10',
        'How did Cinderella feel after the sisters left?',
        'How did Cinderella feel?',
        ['😢 sad and alone', '😡 angry and loud', '😴 ready to sleep', '🎉 happy and free'],
        ['難過又孤單', '生氣又大聲', '想睡', '開心又自由'],
        0,
        '別人去舞會她不能去 → 難過又孤單。'),
      // Q11 HOOK — B5 道德兩難 (will anyone help her?)
      nar('kt-ch9-l3-q11',
        'The door shut. The house went quiet. She sat down and cried...',
        '門關上了。房子安靜下來。她坐下來哭……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch9-4: Fairy godmother appears (B4 期待加速)
  // Mirror Ch7-L4 (old man + bones, same B4 magical helper hook)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch9-l4', chapter: 9, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'cinderella',
    storyBeat: '仙女教母出現 — 接下來會發生什麼?',
    questions: [
      vocabIntro('kt-ch9-l4-q1', [
        ['老', 'old'],
        ['披肩', 'cloak'],
        ['帶', 'bring'],
        ['南瓜', 'pumpkin'],
      ]),
      // Q2 BEAT A
      nar('kt-ch9-l4-q2',
        'After the sisters left, Cinderella cried by the fire.',
        '姊姊們走後,灰姑娘在火爐邊哭。'),
      // Q3 mc paraphrase about her state (X3 fix: correct option words 不在 sentence;
      // X2 fix: vary option starts)
      mc('kt-ch9-l4-q3',
        'Her tears fell on the grey floor, soft and slow.',
        'How was Cinderella crying?',
        ['with a loud shout', 'quiet and gentle', 'in a fast burst', 'while singing songs'],
        ['大聲喊', '安靜又溫柔', '一陣快哭', '一邊唱歌'],
        1,
        '推理: soft and slow → quiet and gentle (paraphrase, 不直接 verbatim)。'),
      // Q4 BEAT B — fairy enters
      nar('kt-ch9-l4-q4',
        'A kind old woman in a soft blue cloak stepped from the dark.',
        '一個穿著軟藍披肩的善良老婦人從黑暗中走出來。'),
      // Q5 TF inference (action — appears from dark = magical)
      tf('kt-ch9-l4-q5',
        'No door opened. No window moved.',
        '沒有門打開。沒有窗動。',
        'Did the old woman come in a normal way?', 'N',
        '推理: 沒門沒窗動 → 不是正常進來 → 答 No'),
      // Q6 BEAT C — identity
      nar('kt-ch9-l4-q6',
        '"I am your fairy godmother. Do not cry, child."',
        '「我是你的仙女教母。別哭了,孩子。」'),
      // Q7 emoji
      emoji('kt-ch9-l4-q7',
        'Who is the kind old woman?',
        'Who is the old woman?',
        ['👵 the new wife', '🧚 a fairy godmother', '🐱 a magic cat', '🦊 a fox'],
        ['新妻子', '仙女教母', '魔法貓', '狐狸'],
        1,
        '她自己說「我是仙女教母」。'),
      // Q8 BEAT D — fairy asks for things
      nar('kt-ch9-l4-q8',
        '"Bring me a pumpkin, six mice, and one big rat from the yard."',
        '「從院子裡帶給我一顆南瓜、六隻老鼠和一隻大鼠。」'),
      // Q9 mc paraphrase about request (X3: use synonyms)
      mc('kt-ch9-l4-q9',
        'Her voice was soft, but her eyes shone bright.',
        'What was the fairy godmother\'s manner like?',
        ['loud and rough', 'gentle but strong', 'sleepy and slow', 'angry and quick'],
        ['大聲粗魯', '溫柔但堅定', '想睡又慢', '生氣又快'],
        1,
        '推理: voice soft + eyes bright → 溫柔但堅定 (paraphrase)。'),
      // Q10 BEAT — Cinderella runs to find them
      nar('kt-ch9-l4-q10',
        'Cinderella ran to the yard to find them all.',
        '灰姑娘跑到院子去找這些東西。'),
      // Q11 HOOK — B4 期待加速 (what will the fairy do?)
      nar('kt-ch9-l4-q11',
        'The fairy held her hand over the pumpkin. The air felt warm...',
        '仙女把手放在南瓜上。空氣變暖了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch9-5: Magic + 12 o'clock warning (B6 預言種子)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch9-l5', chapter: 9, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'cinderella',
    storyBeat: '馬車 + 鼠變馬 — 12 點限制是什麼?',
    questions: [
      vocabIntro('kt-ch9-l5-q1', [
        ['碰', 'tap'],
        ['金色', 'gold'],
        ['馬', 'horse'],
        ['結束', 'end'],
      ]),
      // Q2 BEAT A
      nar('kt-ch9-l5-q2',
        'The fairy godmother tapped the pumpkin one time.',
        '仙女教母碰了南瓜一下。'),
      // Q3 mc paraphrase about transformation (X2 fix: vary option starts)
      mc('kt-ch9-l5-q3',
        'It became a big gold coach with shiny wheels.',
        'What did the pumpkin become?',
        ['some small bowls', 'her fine ride to the ball', 'one hot loaf of bread', 'just a soft warm bed'],
        ['小碗', '她去舞會的好坐騎', '一條熱麵包', '一張軟暖床'],
        1,
        '推理: gold coach with wheels → 好坐騎 (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch9-l5-q4',
        'The six mice became six white horses.',
        '六隻老鼠變成六匹白馬。'),
      // Q5 TF inference (action — rat becomes driver)
      tf('kt-ch9-l5-q5',
        'The big rat stood up. He held a long whip in his paws.',
        '大老鼠站起來。爪子裡握著一條長鞭。',
        'Did the rat become a driver?', 'Y',
        '推理: 站立 + 拿鞭 → 馬車駕駛 → 答 Yes'),
      // Q6 BEAT C — Cinderella's dress
      nar('kt-ch9-l5-q6',
        'Cinderella\'s grey rags turned into a long silver gown.',
        '灰姑娘的灰破衣變成一件長銀禮服。'),
      // Q7 emoji
      emoji('kt-ch9-l5-q7',
        'What color was Cinderella\'s new gown?',
        'What color was her new gown?',
        ['⚫ still grey', '⚪ silver', '🌸 pink', '💚 green'],
        ['還是灰', '銀色', '粉紅', '綠'],
        1,
        '長銀禮服 → 銀色。'),
      // Q8 BEAT D — fairy gives warning
      nar('kt-ch9-l5-q8',
        '"Come home by twelve," the fairy said.',
        '「12 點前要回家,」仙女說。'),
      // Q9 mc paraphrase about warning
      mc('kt-ch9-l5-q9',
        '"The magic ends then. Everything goes back the way it was."',
        'What did the fairy warn about twelve o\'clock?',
        ['she will lose her gown', 'the spell will stop', 'the prince will leave', 'the moon will fall'],
        ['她會丟掉禮服', '魔法會停', '王子會離開', '月亮會掉'],
        1,
        '推理: magic ends → 魔法會停 (paraphrase)。'),
      // Q10 BEAT — Cinderella climbs in
      nar('kt-ch9-l5-q10',
        'Cinderella climbed into the gold coach with bright eyes.',
        '灰姑娘眼睛亮晶晶地爬上金馬車。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch9-l5-q11',
        'Twelve. Twelve. Twelve. The number sat in her ear like a small bell...',
        '12。12。12。這個數字像小鈴鐺在她耳邊響著……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch9-6: Ball, clock strikes, slipper falls (B2 情緒翻轉)
  // Mirror Ch7-L6 (gold shoe falls, same B1/B2 hook)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch9-l6', chapter: 9, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'cinderella',
    storyBeat: '12 點鐘響 — 鞋掉了 王子會找她?',
    questions: [
      vocabIntro('kt-ch9-l6-q1', [
        ['跳舞', 'dance'],
        ['鐘', 'clock'],
        ['跑', 'run'],
        ['掉', 'fall'],
      ]),
      // Q2 BEAT A
      nar('kt-ch9-l6-q2',
        'At the ball, the prince could not look away from her.',
        '在舞會上,王子無法移開目光。'),
      // Q3 mc paraphrase about prince (X2 fix: vary option starts)
      mc('kt-ch9-l6-q3',
        'His eyes followed her every step around the room.',
        'How did the prince watch Cinderella?',
        ['barely noticed her at all', 'kept staring at her', 'with shut eyes', 'down at the floor'],
        ['沒注意她', '一直盯著她', '閉眼', '看地板'],
        1,
        '推理: eyes followed every step → 一直盯著她 (paraphrase)。'),
      // Q4 BEAT B — they dance
      nar('kt-ch9-l6-q4',
        'They danced every dance. She forgot the time.',
        '他們每一支舞都跳。她忘了時間。'),
      // Q5 TF inference (time — she forgot the time)
      tf('kt-ch9-l6-q5',
        'The fairy\'s warning slipped out of her mind.',
        '仙女的警告從她腦中溜走了。',
        'Did Cinderella remember about twelve o\'clock?', 'N',
        '推理: 警告從腦中溜走 → 沒記得 → 答 No'),
      // Q6 BEAT C — clock starts
      nar('kt-ch9-l6-q6',
        'The clock began to strike twelve.',
        '時鐘開始敲 12 點。'),
      // Q7 emoji
      emoji('kt-ch9-l6-q7',
        'What time was it when the clock struck?',
        'What time was it?',
        ['🌅 six in the morning', '🕛 twelve at night', '☀️ three in the day', '🌙 nine at night'],
        ['早上 6 點', '半夜 12 點', '下午 3 點', '晚上 9 點'],
        1,
        '半夜 12 點。'),
      // Q8 BEAT D — she runs
      nar('kt-ch9-l6-q8',
        'She ran for the door as fast as she could.',
        '她盡全力往門口跑。'),
      // Q9 mc paraphrase about running
      mc('kt-ch9-l6-q9',
        'Her heart beat hard. Her silver gown flew behind her.',
        'How did Cinderella leave the ball?',
        ['walked slowly out', 'rushed away in a hurry', 'said goodbye to all', 'rode in a coach calmly'],
        ['慢慢走出去', '匆匆衝走', '跟大家道別', '坐車慢慢離開'],
        1,
        '推理: heart beat hard + gown flew behind → 匆匆衝走 (paraphrase)。'),
      // Q10 BEAT — slipper falls
      nar('kt-ch9-l6-q10',
        'One small fur slipper fell off on the stair.',
        '一隻小毛皮鞋掉在樓梯上。'),
      // Q11 HOOK — B2 情緒翻轉 (will prince find her?)
      nar('kt-ch9-l6-q11',
        'The slipper stayed there alone. The night went still...',
        '那隻鞋孤伶伶留在那裡。夜變得很安靜……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch9-7: Slipper fits, kindness wins (B6 open)
  // Mirror Ch7-L7 (shoe slid on like water) but different end (Perrault:
  // 善良內化, 不是 葉限 後母被天罰)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch9-l7', chapter: 9, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'cinderella',
    storyBeat: '鞋滑上腳 — 仙女教母在哪? 善良才是真正的魔法',
    questions: [
      vocabIntro('kt-ch9-l7-q1', [
        ['拿', 'hold'],
        ['看', 'look'],
        ['腳', 'foot'],
        ['手', 'hand'],
      ]),
      // Q2 BEAT A
      nar('kt-ch9-l7-q2',
        'The prince held the slipper. He looked all over the country.',
        '王子拿著那隻鞋。他找遍整個國家。'),
      // Q3 mc paraphrase about search (X2 fix: vary option starts)
      mc('kt-ch9-l7-q3',
        'He stopped at every door, big or small.',
        'How did the prince look for her?',
        ['asked just one friend', 'visited many homes', 'wrote a long letter', 'gave up very fast'],
        ['只問一個朋友', '拜訪很多家', '寫長信', '很快放棄'],
        1,
        '推理: stopped at every door → 拜訪很多家 (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch9-l7-q4',
        'He came to her house. The two sisters tried the slipper.',
        '他來到她家。兩個姊姊試了那隻鞋。'),
      // Q5 TF inference (contrast — too small means they aren't her)
      tf('kt-ch9-l7-q5',
        'They pushed and pulled. Their toes would not fit.',
        '她們又推又拉。腳趾就是擠不進去。',
        'Did the slipper belong to one of the sisters?', 'N',
        '推理: 腳趾擠不進 → 不是她們的 → 答 No'),
      // Q6 BEAT C — Cinderella comes in
      nar('kt-ch9-l7-q6',
        'Cinderella came in quietly. She set her foot in the slipper.',
        '灰姑娘安靜地走進來。她把腳放進鞋裡。'),
      // Q7 mc paraphrase about fit (X2 fix: vary option starts)
      mc('kt-ch9-l7-q7',
        'It slid on like water on a smooth stone.',
        'How did the slipper fit Cinderella?',
        ['way too tight', 'went on perfectly', 'fell off again', 'would not move'],
        ['太緊', '完美合腳', '又掉下來', '動不了'],
        1,
        '推理: slid on like water → 完美合腳 (paraphrase)。'),
      // Q8 BEAT D — prince recognizes her
      nar('kt-ch9-l7-q8',
        'The prince knew her at once. He took her hand.',
        '王子立刻認出她。他握住她的手。'),
      // Q9 emoji
      emoji('kt-ch9-l7-q9',
        'How did Cinderella treat her sisters in the end?',
        'How did Cinderella treat her sisters?',
        ['💖 with kindness', '⚔️ with anger', '🏃 by running away', '🚪 by locking them out'],
        ['溫柔對待', '生氣對待', '跑走', '把她們鎖在外面'],
        0,
        'Perrault 結局: 她善良到原諒姊姊 → with kindness。'),
      // Q10 BEAT D — kindness
      nar('kt-ch9-l7-q10',
        'She was kind, even to her two sisters.',
        '她善良,連對兩個姊姊都是。'),
      // Q11 HOOK — B6 open (where is the fairy? kindness is the real magic)
      nar('kt-ch9-l7-q11',
        'And the fairy godmother? Gone with the wind. The real magic was inside her all along...',
        '那仙女教母呢? 隨風而去了。真正的魔法一直都在她心裡……'),
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
