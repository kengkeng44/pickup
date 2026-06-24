#!/usr/bin/env node
/**
 * v2.0.B.242+ — Ch13 小紅帽 (Little Red Riding Hood, Grimm KHM 26 1812 PD).
 *
 * Pipeline ship via tools/pickup-new-story.cjs B.234 URL pipeline pattern.
 * Source canon: docs/canon/red-riding-hood.md (7-beat arc, Grimm 1812).
 * Cuts: docs/canon/red-riding-hood-cuts.md (B6/B3/B5/B1/B3/B4/B6-open).
 *
 * Theme group: Ch1 桃太郎 + Ch6 Baba Yaga + Ch13 小紅帽 = 兒童安全教育 trio.
 *
 * Public domain compliance:
 *   - Source: Brothers Grimm, Rotkäppchen (KHM 26), Kinder- und Hausmärchen vol.1
 *     (1812 first edition, Berlin: Realschulbuchhandlung). Both Grimms dead >150y.
 *   - NOT used:
 *     * Charles Perrault, Le Petit Chaperon Rouge (1697) — also PD but story
 *       architecture differs (no rescue, wolf wins).
 *     * Disney / "Hoodwinked!" 2005 / Sondheim Into the Woods / Dahl Revolting
 *       Rhymes — any modern picture-book retelling — copyrighted.
 *   - 主角名: 'Little Red Riding Hood' (Grimm English translation, PD ≥1884).
 *   - Side chars: 'grandma', 'mother', 'huntsman', 'wolf' (Grimm-source generic).
 *
 * A2 + 兒童友善 (per task spec):
 *   - 'big bad wolf' OK (Grimm 原典正式名稱, A2 全 word)
 *   - 'ate' → 'kept' / 'took into stomach' (兒童化, Grimm 原版略血腥)
 *   - 'cut open' → 'opened up the wolf and pulled them out'
 *   - 'killed' 不出現, 用 'gave up' / 'never came back'
 *
 * Structure per lesson (11 Q, mirror Ch9/Ch7 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration / listen-mc paraphrase
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
 *   R3 A2 vocab only (no devoured/slumbered/cunning/disguised)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch13.json');

// ─── Helpers (mirror Ch9/Ch7 範本) ────────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch13', 'red-riding-hood'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch13', 'red-riding-hood', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch13', 'red-riding-hood'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch13', 'red-riding-hood', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch13', 'red-riding-hood', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch13-1: Mother's basket + warning (B6 預言種子)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch13-l1', chapter: 13, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'red-riding-hood',
    storyBeat: '媽媽叮嚀去看奶奶 — 路上會發生什麼?',
    questions: [
      vocabIntro('kt-ch13-l1-q1', [
        ['紅色', 'red'],
        ['帽子', 'hood'],
        ['媽媽', 'mother'],
        ['村子', 'village'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch13-l1-q2',
        'Long ago in a village near the woods, a girl lived with her mother.',
        '很久以前在森林旁的村子,有個女孩跟媽媽住在一起。'),
      // Q3 BEAT A deepen
      nar('kt-ch13-l1-q3',
        'Her grandma had made her a red hood from soft cloth.',
        '她奶奶用軟布做了一頂紅帽子給她。'),
      // Q4 listen-mc paraphrase about name (X3 anti-verbatim:
      // correct "wore the red hat every day" 不在 sentence)
      mc('kt-ch13-l1-q4',
        'She wore the red hood all the time. People gave her a name.',
        'Why was she called Little Red Riding Hood?',
        ['her hair was red', 'she wore the red hat every day', 'her cat was red', 'she lived in red house'],
        ['頭髮紅', '每天戴紅帽', '貓是紅的', '住紅房'],
        1,
        '推理: wore red hood all the time → 每天戴紅帽 (paraphrase)。'),
      // Q5 BEAT B
      nar('kt-ch13-l1-q5',
        'One morning, mother called the girl into the kitchen.',
        '一天早上,媽媽叫女孩到廚房來。'),
      // Q6 BEAT B deepen
      nar('kt-ch13-l1-q6',
        '"Grandma is sick. Take her this cake and some wine."',
        '「奶奶生病了。把這個蛋糕跟一些酒帶給她。」'),
      // Q7 listen-mc paraphrase about basket
      mc('kt-ch13-l1-q7',
        'Mother put the cake and the wine into a small basket.',
        'What did mother give the girl?',
        ['gold and coins', 'food for sick grandma', 'a new hood', 'books to read'],
        ['金幣', '給生病奶奶的食物', '新帽子', '書'],
        1,
        '推理: cake + wine in basket → 給生病奶奶的食物 (paraphrase)。'),
      // Q8 BEAT C — warning
      nar('kt-ch13-l1-q8',
        '"Walk straight to grandma. Do not stop on the way."',
        '「直接走到奶奶家。路上不要停。」'),
      // Q9 TF inference (action — mother's strict tone)
      tf('kt-ch13-l1-q9',
        'Mother\'s voice was firm. Her eyes were not smiling.',
        '媽媽的聲音很堅定。眼睛沒有笑。',
        'Was mother joking with the warning?', 'N',
        '推理: 聲音堅定 + 沒笑 → 不是開玩笑 → 答 No'),
      // Q10 emoji — what was in the basket
      emoji('kt-ch13-l1-q10',
        'What color was the girl\'s hood?',
        'What color was her hood?',
        ['🌸 pink', '❤️ red', '🌟 gold', '🌊 blue'],
        ['粉紅', '紅', '金', '藍'],
        1,
        '紅帽子 → red。'),
      // Q11 HOOK — B6 預言種子 (cut per cuts md)
      nar('kt-ch13-l1-q11',
        'The girl took the basket and walked toward the woods...',
        '女孩拿起籃子,朝森林走去……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch13-2: Wolf appears in the woods (B3 資訊缺口)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch13-l2', chapter: 13, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'red-riding-hood',
    storyBeat: '森林裡見大野狼 — 他會做什麼?',
    questions: [
      vocabIntro('kt-ch13-l2-q1', [
        ['路', 'path'],
        ['安全', 'safe'],
        ['樹', 'tree'],
        ['狼', 'wolf'],
      ]),
      // Q2 BEAT A
      nar('kt-ch13-l2-q2',
        'Mother said the path was the only safe way to grandma.',
        '媽媽說那條路是去奶奶家唯一安全的路。'),
      // Q3 listen-mc paraphrase about path rule
      mc('kt-ch13-l2-q3',
        'Mother said, "Stay on the path. Do not go into the trees."',
        'What did mother tell the girl to do?',
        ['run as fast as you can', 'keep to the safe road', 'sing a loud song', 'pick many flowers'],
        ['用力跑', '走安全的路', '大聲唱歌', '採很多花'],
        1,
        '推理: stay on the path → 走安全的路 (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch13-l2-q4',
        'The girl walked into the woods with the basket on her arm.',
        '女孩手挽著籃子走進森林。'),
      // Q5 TF inference (atmosphere — quiet woods = ominous)
      tf('kt-ch13-l2-q5',
        'The woods were quiet. No birds sang. No wind moved.',
        '森林很安靜。沒有鳥叫。沒有風吹。',
        'Did the woods feel friendly today?', 'N',
        '推理: 安靜 + 沒鳥沒風 → 不友善 → 答 No'),
      // Q6 BEAT C — wolf appears
      nar('kt-ch13-l2-q6',
        'A big bad wolf came out from behind a tall tree.',
        '一隻大野狼從一棵高樹後面走出來。'),
      // Q7 emoji
      emoji('kt-ch13-l2-q7',
        'Who came out from behind the tree?',
        'Who came out?',
        ['🐰 a bunny', '🐺 a big bad wolf', '🦊 a fox', '🐻 a bear'],
        ['兔子', '大野狼', '狐狸', '熊'],
        1,
        '從樹後走出來的是大野狼。'),
      // Q8 BEAT D — wolf speaks
      nar('kt-ch13-l2-q8',
        'The wolf had soft eyes and a soft voice.',
        '狼有溫柔的眼神和溫柔的聲音。'),
      // Q9 mc paraphrase about wolf disguise
      mc('kt-ch13-l2-q9',
        'But under his soft fur, his teeth were long and sharp.',
        'What was true about the wolf?',
        ['kind as he looked', 'bad inside but soft outside', 'just a small puppy', 'a friend to the girl'],
        ['像看起來那樣善良', '心裡壞外表軟', '只是小狗', '是女孩的朋友'],
        1,
        '推理: 軟毛下牙又長又尖 → 心裡壞外表軟 (paraphrase)。'),
      // Q10 BEAT — girl does not know
      nar('kt-ch13-l2-q10',
        'The girl had never seen a wolf before. She was not afraid.',
        '女孩從沒見過狼。她不害怕。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch13-l2-q11',
        'The wolf smiled. He had a quick plan in his head...',
        '狼笑了。他腦子裡有個壞主意……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch13-3: Wolf asks the way (B5 道德兩難)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch13-l3', chapter: 13, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'red-riding-hood',
    storyBeat: '大野狼問路 — 她應該說嗎?',
    questions: [
      vocabIntro('kt-ch13-l3-q1', [
        ['早上', 'morning'],
        ['告訴', 'tell'],
        ['家', 'house'],
        ['橡樹', 'oak'],
      ]),
      // Q2 BEAT A
      nar('kt-ch13-l3-q2',
        '"Good morning, little girl," the wolf said in a soft voice.',
        '「早安,小女孩,」狼用溫柔的聲音說。'),
      // Q3 BEAT A deepen
      nar('kt-ch13-l3-q3',
        '"Where are you going so early today?"',
        '「妳這麼早要去哪裡?」'),
      // Q4 listen-mc paraphrase about girl's knowledge (X3 fix)
      mc('kt-ch13-l3-q4',
        'The girl did not know that wolves were bad inside.',
        'Why did the girl trust the wolf?',
        ['he gave her some money', 'she had no fear of him', 'she was very brave', 'mother told her to'],
        ['他給她錢', '她不怕他', '她很勇敢', '媽媽叫她信'],
        1,
        '推理: did not know wolves were bad → 她不怕他 (paraphrase)。'),
      // Q5 BEAT B
      nar('kt-ch13-l3-q5',
        'She told him everything in her small voice.',
        '她用小小的聲音把所有事都告訴他。'),
      // Q6 BEAT B deepen
      nar('kt-ch13-l3-q6',
        '"I am going to grandma\'s house, down the path."',
        '「我要去奶奶家,沿著這條路走。」'),
      // Q7 listen-mc paraphrase about address
      mc('kt-ch13-l3-q7',
        '"Her house is by the three big oaks. She is sick today."',
        'What did the girl tell the wolf?',
        ['only her own name', 'where grandma lived', 'her favorite color', 'the time of day'],
        ['只有她自己的名字', '奶奶住哪', '她最愛的顏色', '時間'],
        1,
        '推理: 三棵橡樹 + 奶奶生病 → 奶奶住哪 (paraphrase)。'),
      // Q8 BEAT C — wolf's plan
      nar('kt-ch13-l3-q8',
        'The wolf nodded. "Pick some flowers for grandma," he said.',
        '狼點點頭。「採些花給奶奶吧,」他說。'),
      // Q9 TF inference (action — wolf wants delay)
      tf('kt-ch13-l3-q9',
        'The wolf wanted the girl to stop and stay in the woods longer.',
        '狼希望女孩停下來,在森林裡待更久。',
        'Was the wolf trying to help the girl?', 'N',
        '推理: 想讓她停下來 → 不是幫忙 → 答 No'),
      // Q10 emoji
      emoji('kt-ch13-l3-q10',
        'Should you tell a stranger where you are going?',
        'Should you tell strangers?',
        ['✅ yes always', '❌ no never', '🤔 only sometimes', '🤷 it does not matter'],
        ['永遠該', '絕對不要', '有時可以', '沒差'],
        1,
        '媽媽說別跟陌生人講話 → 絕對不要。'),
      // Q11 HOOK — B5 道德兩難
      nar('kt-ch13-l3-q11',
        'The girl ran off to pick flowers. The wolf ran the other way...',
        '女孩跑去採花。狼往另一邊跑去……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch13-4: Wolf runs ahead to grandma (B1 物理懸念)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch13-l4', chapter: 13, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'red-riding-hood',
    storyBeat: '大野狼跑去奶奶家 — 奶奶怎麼樣了?',
    questions: [
      vocabIntro('kt-ch13-l4-q1', [
        ['計劃', 'plan'],
        ['花', 'flower'],
        ['跑', 'run'],
        ['門', 'door'],
      ]),
      // Q2 BEAT A
      nar('kt-ch13-l4-q2',
        'The wolf ran fast to grandma\'s house.',
        '狼快速跑向奶奶家。'),
      // Q3 listen-mc paraphrase about wolf's speed (X3 fix)
      mc('kt-ch13-l4-q3',
        'His feet did not stop. The trees flew past.',
        'How did the wolf travel?',
        ['walked very slow', 'moved at top speed', 'flew in the sky', 'rode a small horse'],
        ['走很慢', '用最快速度', '在天上飛', '騎小馬'],
        1,
        '推理: 不停 + 樹飛過 → 最快速度 (paraphrase)。'),
      // Q4 BEAT B — flowers parallel
      nar('kt-ch13-l4-q4',
        'Back in the woods, the girl picked many bright flowers.',
        '在森林裡,女孩採了很多漂亮的花。'),
      // Q5 TF inference (time — slow girl vs fast wolf = wolf arrives first)
      tf('kt-ch13-l4-q5',
        'The wolf moved like the wind. The girl moved like a soft cloud.',
        '狼像風一樣動。女孩像軟雲一樣動。',
        'Would the wolf get there first?', 'Y',
        '推理: 狼像風快 + 女孩像雲慢 → 狼先到 → 答 Yes'),
      // Q6 BEAT C — wolf at door
      nar('kt-ch13-l4-q6',
        'The wolf came to grandma\'s little house at last.',
        '狼終於來到奶奶的小房子。'),
      // Q7 BEAT C continue
      nar('kt-ch13-l4-q7',
        'He knocked on the wooden door. Knock, knock, knock.',
        '他敲木門。咚,咚,咚。'),
      // Q8 listen-mc paraphrase about wolf's trick
      mc('kt-ch13-l4-q8',
        '"Open up. It is me, Little Red Riding Hood."',
        'What did the wolf say at the door?',
        ['that a friend was here', 'pretending to be the girl', 'asking for help out loud', 'selling cake at the door'],
        ['朋友來了', '裝成那個女孩', '大聲求救', '在門口賣蛋糕'],
        1,
        '推理: 他說自己是小紅帽 → 裝成那個女孩 (paraphrase)。'),
      // Q9 BEAT D — grandma weak
      nar('kt-ch13-l4-q9',
        'Poor grandma was in bed. She was too sick to stand up.',
        '可憐的奶奶在床上。她病到站不起來。'),
      // Q10 emoji
      emoji('kt-ch13-l4-q10',
        'How did grandma feel?',
        'How did grandma feel?',
        ['💪 strong and fine', '🤒 sick and weak', '😄 happy and ready', '😡 angry'],
        ['強壯沒事', '生病無力', '開心', '生氣'],
        1,
        '在床上 + 站不起來 → 生病無力。'),
      // Q11 HOOK — B1 物理懸念 (cut per cuts md)
      nar('kt-ch13-l4-q11',
        '"Come in, dear," grandma called from her bed. The door opened...',
        '「進來吧,孩子,」奶奶從床上喊。門打開了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch13-5: Wolf in grandma's bed (B3 資訊缺口)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch13-l5', chapter: 13, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'red-riding-hood',
    storyBeat: '小紅帽到奶奶家 — 床上是奶奶嗎?',
    questions: [
      vocabIntro('kt-ch13-l5-q1', [
        ['帽子', 'cap'],
        ['床', 'bed'],
        ['毯子', 'blanket'],
        ['鼻子', 'nose'],
      ]),
      // Q2 BEAT A (兒童化: kept in stomach, not "ate")
      nar('kt-ch13-l5-q2',
        'The wolf took grandma into his stomach in one big bite.',
        '狼一口把奶奶吞進肚子裡。'),
      // Q3 listen-mc paraphrase about wolf disguise (X3)
      mc('kt-ch13-l5-q3',
        'He put on grandma\'s sleeping cap. He climbed into her bed.',
        'What did the wolf do next?',
        ['ran far away from house', 'dressed up like grandma', 'cooked some food', 'called for the girl'],
        ['跑遠離開', '裝扮成奶奶', '煮食物', '叫女孩'],
        1,
        '推理: 戴帽 + 上床 → 裝扮成奶奶 (paraphrase)。'),
      // Q4 BEAT B
      nar('kt-ch13-l5-q4',
        'He pulled the blanket up to his black wolf nose.',
        '他把毯子拉到他黑黑的狼鼻上。'),
      // Q5 TF inference (action — covered = hiding)
      tf('kt-ch13-l5-q5',
        'Only his eyes and one bit of nose showed above the blanket.',
        '只有眼睛跟一點鼻子露在毯子上面。',
        'Was the wolf trying to hide his face?', 'Y',
        '推理: 只露眼睛跟鼻子 → 在藏臉 → 答 Yes'),
      // Q6 BEAT C — girl arrives
      nar('kt-ch13-l5-q6',
        'Little Red Riding Hood came in with her basket of flowers.',
        '小紅帽帶著一籃花走進來。'),
      // Q7 emoji — room atmosphere
      emoji('kt-ch13-l5-q7',
        'How did grandma\'s room feel?',
        'How did the room feel?',
        ['☀️ bright and warm', '🌑 dark and odd', '🎉 noisy and full', '🌸 sweet and clean'],
        ['明亮溫暖', '暗暗怪怪', '熱鬧', '香乾淨'],
        1,
        '狼在床上裝奶奶 → 暗暗怪怪。'),
      // Q8 BEAT D — something feels wrong
      nar('kt-ch13-l5-q8',
        'The room was dark. Something looked very wrong.',
        '房間很暗。有點不對勁。'),
      // Q9 listen-mc paraphrase about girl's feeling
      mc('kt-ch13-l5-q9',
        'The shape in the bed did not look like her dear grandma.',
        'What did the girl notice?',
        ['the bed was empty', 'grandma looked different', 'the door was open', 'her basket was gone'],
        ['床是空的', '奶奶看起來不一樣', '門開著', '籃子不見'],
        1,
        '推理: shape did not look like grandma → 奶奶看起來不一樣 (paraphrase)。'),
      // Q10 BEAT — the girl steps closer
      nar('kt-ch13-l5-q10',
        'She stepped close to the bed and looked again.',
        '她走近床邊,又看了一次。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch13-l5-q11',
        'Big ears. Big eyes. Big teeth. Was this really grandma...?',
        '大耳朵。大眼睛。大牙齒。這真的是奶奶嗎……?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch13-6: The huntsman comes (B4 期待加速)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch13-l6', chapter: 13, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'red-riding-hood',
    storyBeat: '獵人來救 — 來得及嗎?',
    questions: [
      vocabIntro('kt-ch13-l6-q1', [
        ['耳朵', 'ear'],
        ['牙齒', 'teeth'],
        ['聽', 'hear'],
        ['睡', 'sleep'],
      ]),
      // Q2 BEAT A
      nar('kt-ch13-l6-q2',
        '"Grandma, what big ears you have!" the girl said.',
        '「奶奶,妳的耳朵好大!」女孩說。'),
      // Q3 BEAT A reply
      nar('kt-ch13-l6-q3',
        '"All the better to hear you with, my dear."',
        '「這樣才聽得到妳呀,我的孩子。」'),
      // Q4 listen-mc paraphrase about teeth
      mc('kt-ch13-l6-q4',
        '"Grandma, what big teeth you have!" "All the better to eat you with!"',
        'What did the wolf finally say?',
        ['that he wanted to help', 'about eating the girl', 'about being tired', 'about being her friend'],
        ['他想幫忙', '要吃女孩', '說他很累', '說他是朋友'],
        1,
        '推理: better to eat you with → 要吃女孩 (paraphrase)。'),
      // Q5 BEAT B (兒童化: took into stomach, not "ate")
      nar('kt-ch13-l6-q5',
        'The wolf jumped up. He took the girl into his stomach too.',
        '狼跳起來。他也把女孩吞進肚子裡。'),
      // Q6 BEAT B aftermath
      nar('kt-ch13-l6-q6',
        'Then he was full. He fell back into bed and slept.',
        '然後他飽了。他倒回床上睡著了。'),
      // Q7 TF inference (atmosphere — snoring loud)
      tf('kt-ch13-l6-q7',
        'Soon the whole house shook with loud snoring sounds.',
        '不久整間屋子都被響亮的打呼聲震動。',
        'Was the wolf sleeping deeply?', 'Y',
        '推理: 屋子被打呼震動 → 睡很深 → 答 Yes'),
      // Q8 BEAT C — huntsman appears
      nar('kt-ch13-l6-q8',
        'A kind huntsman walked by the little house.',
        '一個善良的獵人走過小房子旁邊。'),
      // Q9 listen-mc paraphrase about huntsman noticing
      mc('kt-ch13-l6-q9',
        'He heard the snoring. He knew that was no grandma sound.',
        'How did the huntsman know something was wrong?',
        ['a strong smell of smoke', 'the strange noise in air', 'reading a small note', 'seeing bright fire light'],
        ['聞到煙', '聽到怪聲', '看紙條', '看到亮光'],
        1,
        '推理: heard snoring not grandma sound → 聽到怪聲 (paraphrase)。'),
      // Q10 emoji
      emoji('kt-ch13-l6-q10',
        'Who came to help in time?',
        'Who came to help?',
        ['👮 a police officer', '🏹 a kind huntsman', '👨‍🌾 a farmer', '🧙 a wizard'],
        ['警察', '善良的獵人', '農夫', '巫師'],
        1,
        '走過去的是獵人。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch13-l6-q11',
        'The huntsman opened the door. He held his hunting knife ready...',
        '獵人打開門。他握緊獵刀準備好……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch13-7: Open wolf, rescue, lesson (B6 open)
  // 兒童化: 'opened up and pulled them out', 'never came back'
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch13-l7', chapter: 13, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'red-riding-hood',
    storyBeat: '救出奶奶 — 媽媽的話現在懂了',
    questions: [
      vocabIntro('kt-ch13-l7-q1', [
        ['獵人', 'huntsman'],
        ['打開', 'open'],
        ['拉', 'pull'],
        ['聽', 'listen'],
      ]),
      // Q2 BEAT A
      nar('kt-ch13-l7-q2',
        'The huntsman saw the wolf fast asleep in grandma\'s bed.',
        '獵人看見狼在奶奶床上熟睡。'),
      // Q3 listen-mc paraphrase about action (X3)
      mc('kt-ch13-l7-q3',
        'He opened up the wolf with great care.',
        'What did the huntsman do to the wolf?',
        ['gave him some food', 'opened him up carefully', 'sang to him gently', 'told a long story'],
        ['給他食物', '小心打開他', '溫柔唱歌', '說長故事'],
        1,
        '推理: opened up with care → 小心打開他 (paraphrase)。'),
      // Q4 BEAT B (兒童化: pulled them out, not "cut out")
      nar('kt-ch13-l7-q4',
        'He pulled grandma out first. Then he pulled the girl out too.',
        '他先把奶奶拉出來。然後把女孩也拉出來。'),
      // Q5 TF inference (action — both safe)
      tf('kt-ch13-l7-q5',
        'Grandma sat up. The girl held her hand. Both could breathe again.',
        '奶奶坐起來。女孩握住她的手。兩個人又能呼吸了。',
        'Were they both still alive?', 'Y',
        '推理: 坐起來 + 能呼吸 → 還活著 → 答 Yes'),
      // Q6 BEAT C — wolf gave up
      nar('kt-ch13-l7-q6',
        'The big bad wolf gave up. He never came back to those woods.',
        '大野狼放棄了。他再也沒回到那片森林。'),
      // Q7 listen-mc paraphrase about ending
      mc('kt-ch13-l7-q7',
        'The huntsman walked home. Grandma drank some hot tea.',
        'How did the day end for grandma?',
        ['still feeling sick', 'warm and safe again', 'far away from home', 'lost in deep sleep'],
        ['還生病', '溫暖又安全', '離家很遠', '睡很沉'],
        1,
        '推理: hot tea + huntsman home → 溫暖又安全 (paraphrase)。'),
      // Q8 BEAT D — girl's reflection
      nar('kt-ch13-l7-q8',
        'Little Red Riding Hood looked out the window.',
        '小紅帽往窗外看。'),
      // Q9 BEAT D — moral
      nar('kt-ch13-l7-q9',
        '"I will always stay on the path," she said.',
        '「我以後一定走在路上,」她說。'),
      // Q10 emoji
      emoji('kt-ch13-l7-q10',
        'What did the girl learn from the day?',
        'What did she learn?',
        ['🍰 to bake cakes', '👂 to listen to mother', '🏃 to run faster', '🎨 to pick flowers'],
        ['做蛋糕', '聽媽媽的話', '跑更快', '採花'],
        1,
        '結尾教訓:聽媽媽的話。'),
      // Q11 HOOK — B6 open (lesson internalized)
      nar('kt-ch13-l7-q11',
        '"I will always listen to mother." And the red hood stayed bright forever...',
        '「我會永遠聽媽媽的話。」紅帽子永遠鮮紅……'),
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
