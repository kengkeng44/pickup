#!/usr/bin/env node
/**
 * v2.0.B.211 — Ch6 六隻天鵝 (Six Swans, Grimm KHM 49).
 *
 * Per docs/canon/six-swans.md + docs/canon/six-swans-cuts.md.
 * Dialogue-free Grimm voice — narration is poetic, imagery-heavy,
 * 3rd-person past tense. Only L6 quotes the lie itself; everything
 * else stays in 3rd-person. The silence of the protagonist is
 * mirrored in the lack of quoted speech.
 *
 * Voice rules:
 *   - Simple A2 imagery (white feathers fell / her hands grew cold)
 *   - Slow rhythm + repetition ("She sewed and sewed.")
 *   - NO archaic / poetic vocab — keep A2 whitelist
 *   - Avoid B1+ words: lamented → cried softly, dwelt → lived,
 *                       vowed → promised, forsaken → left alone
 *
 * Structure per lesson (11 Q, same as Ch1):
 *   1 vocab tap-pairs  (TOP, vocab intro)
 *   2 narration        (set scene, poetic imagery)
 *   1 listen-tf INFER  (Yes/No, inference)
 *   2 listen-mc        (paraphrased detail)
 *   1 emoji-pick       (visual hook)
 *   1 narration        (extend scene)
 *   1 listen-mc        (paraphrased detail)
 *   1 listen-comp gist (main idea) OR listen-comp inference
 *   1 listen-mc        (recap detail)
 *   1 narration        (HOOK ending, B5/B6 dominant — silence dilemma)
 *
 * Hook map (see six-swans-cuts.md):
 *   L1 B6 — mother gone, who fills the place?
 *   L2 B3 — why six shirts?
 *   L3 B1 — where did the boys go?
 *   L4 B5 — six years of silence, can she hold?
 *   L5 B6 — will the king's mother accept her?
 *   L6 B5 — speak to save herself, or keep sewing?
 *   L7 B2 — truth spoken at last + one wing remaining
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch6.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch6', 'six-swans'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch6', 'six-swans', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch6', 'six-swans'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch6', 'six-swans', 'gist'],
    subSkill: 'gist' };
}
function inferLc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch6', 'six-swans'],
    subSkill: 'inference' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch6', 'six-swans', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch6', 'six-swans', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch6-1 — Beat 1 Setup
  // Hook B6: 沒了母親,誰會來填這個位置?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch6-l1', chapter: 6, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'six-swans',
    storyBeat: '七個孩子 — 母親不在了',
    questions: [
      vocabIntro('kt-ch6-l1-q1', [
        ['國王', 'king'],
        ['孩子', 'children'],
        ['城堡', 'castle'],
        ['森林', 'wood'],
      ]),
      // narration (poetic imagery)
      nar('kt-ch6-l1-q2',
        'A king had seven children. Six were boys, and one was a girl.',
        '一個國王有七個孩子。六個男孩,一個女孩。'),
      nar('kt-ch6-l1-q3',
        'They lived in a quiet castle near a wide green wood.',
        '他們住在綠林邊一座安靜的城堡。'),
      // TF — atmosphere inference (R4: A. Atmosphere)
      tf('kt-ch6-l1-q4',
        'The halls of the castle felt cold and still, day after day.',
        '城堡的廳堂一天又一天又冷又靜。',
        'Was the castle full of laughter?', 'N',
        '推理:廳堂冷靜 → 沒有笑聲 → 答 No'),
      // MC — paraphrase boys playing
      mc('kt-ch6-l1-q5',
        'The boys ran along the river bank and threw small stones to splash.',
        'Where did the boys play?',
        ['in the garden', 'by the water', 'in the tower', 'on the road'],
        ['在花園', '河邊', '在塔上', '在路上'],
        1,
        '河岸邊扔石頭 → 河邊。'),
      // MC — paraphrase girl's habit
      mc('kt-ch6-l1-q6',
        'The girl walked alone among the trees and picked soft yellow flowers.',
        'What did the girl like to do?',
        ['ride horses', 'gather flowers', 'sing songs', 'read books'],
        ['騎馬', '採花', '唱歌', '讀書'],
        1,
        '採黃色小花 → 採花。'),
      // emoji — visual hook
      emoji('kt-ch6-l1-q7',
        'How many children did the king have?',
        'How many children?',
        ['5️⃣ five', '6️⃣ six', '7️⃣ seven', '8️⃣ eight'],
        ['五個', '六個', '七個', '八個'],
        2,
        '六個男孩 + 一個女孩 = 七個。'),
      // narration — emotional turn
      nar('kt-ch6-l1-q8',
        'The mother of the children was gone. Her chair stood empty by the window.',
        '孩子們的母親不在了。她的椅子空空地立在窗邊。'),
      // MC — paraphrase king's grief
      mc('kt-ch6-l1-q9',
        'The king walked the long halls at night and could not find sleep.',
        'How did the king feel at night?',
        ['joyful', 'sleepless and sad', 'angry', 'busy'],
        ['開心', '睡不著又難過', '生氣', '忙碌'],
        1,
        '走廊裡睡不著 → 睡不著又難過。'),
      // gist — main idea
      gist('kt-ch6-l1-q10',
        'A quiet castle, six brothers, one sister, and a father who walked alone at night.',
        'What is this scene mainly about?',
        ['family without a mother',
         'learning to ride a horse',
         'planning a royal wedding',
         'going on a forest hunt'],
        ['沒有母親的家庭', '學騎馬', '辦皇室婚禮', '去森林打獵'],
        0,
        '主旨 = 沒有母親的家庭。'),
      // Q11 HOOK (B6 預言種子 — empty seat, who fills it?)
      nar('kt-ch6-l1-q11',
        'The king missed her with all his heart. Beside his chair, one seat stood empty...',
        '國王全心思念她。他椅子旁,有一個位子空著……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch6-2 — Beat 2 New Queen, six white shirts
  // Hook B3: 為什麼是六件?六件白衣是給誰?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch6-l2', chapter: 6, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'six-swans',
    storyBeat: '新王后 — 六件白色小衣',
    questions: [
      vocabIntro('kt-ch6-l2-q1', [
        ['結婚', 'marry'],
        ['遠方', 'far'],
        ['衣服', 'shirt'],
        ['丟', 'throw'],
      ]),
      // narration
      nar('kt-ch6-l2-q2',
        'The king married a new woman who came from a far cold land.',
        '國王娶了一個來自遙遠寒冷國度的女人。'),
      // TF — action implication (R4: B)
      tf('kt-ch6-l2-q3',
        'When she walked past the children, her eyes stayed flat and cold.',
        '她從孩子身邊走過時,眼神平淡又冷。',
        'Did she love the seven children?', 'N',
        '推理:眼神冷淡 → 不愛 → 答 No'),
      // narration — secret work
      nar('kt-ch6-l2-q4',
        'One night, she sat alone by a small lamp and sewed six little shirts.',
        '一個夜裡,她獨自坐在小油燈邊,縫了六件小衣。'),
      // MC — paraphrase
      mc('kt-ch6-l2-q5',
        'Her needle moved fast, in and out, while the rest of the castle slept.',
        'When did the queen do the sewing?',
        ['at noon', 'in the morning', 'while others slept', 'at sunset'],
        ['中午', '早上', '其他人睡覺時', '黃昏'],
        2,
        '城堡其他人都在睡 → 其他人睡覺時。'),
      // MC — paraphrase color
      mc('kt-ch6-l2-q6',
        'Each shirt was the color of fresh snow on a winter morning.',
        'What color were the shirts?',
        ['black', 'red', 'pale like milk', 'gold'],
        ['黑色', '紅色', '像牛奶一樣淡', '金色'],
        2,
        '像新雪 → 像牛奶淡白。'),
      // emoji — visual
      emoji('kt-ch6-l2-q7',
        'How many shirts did the queen make?',
        'How many shirts?',
        ['3️⃣', '4️⃣', '5️⃣', '6️⃣'],
        ['三件', '四件', '五件', '六件'],
        3,
        '六件小衣。'),
      // narration — sneaky moment
      nar('kt-ch6-l2-q8',
        'She slipped into the boys\' room while the moon was high and pale.',
        '月亮高高蒼白時,她悄悄走進男孩們的房間。'),
      // MC — paraphrase action
      mc('kt-ch6-l2-q9',
        'She let the small white things fall over their sleeping shoulders.',
        'What did she do to the boys?',
        ['kissed them', 'put shirts on them', 'woke them up', 'tied them down'],
        ['親他們', '把衣服丟到他們身上', '叫醒他們', '綁住他們'],
        1,
        '白衣落在肩上 → 把衣服丟到他們身上。'),
      // inference comp — why six
      inferLc('kt-ch6-l2-q10',
        'There were six brothers. There were six shirts. She had made them in secret.',
        'Why did she make only six shirts?',
        ['for the six brothers',
         'to keep them warm',
         'for the king',
         'to sell at the market'],
        ['給六個哥哥', '為了保暖', '給國王', '在市場賣'],
        0,
        '推理:六兄弟 + 六件衣 → 給六個哥哥。'),
      // Q11 HOOK (B3 資訊缺口 — 衣服不是普通的衣服)
      nar('kt-ch6-l2-q11',
        'But these were not warm shirts. These were not soft. Something would change at dawn...',
        '但這些不是保暖的衣服,也不柔軟。天亮時會有事改變……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch6-3 — Beat 3 The boys become swans
  // Hook B1: 男孩去哪了?還能變回來嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch6-l3', chapter: 6, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'six-swans',
    storyBeat: '白色翅膀 — 男孩不見了',
    questions: [
      vocabIntro('kt-ch6-l3-q1', [
        ['翅膀', 'wing'],
        ['窗戶', 'window'],
        ['月亮', 'moon'],
        ['空的', 'empty'],
      ]),
      // narration — transformation, poetic
      nar('kt-ch6-l3-q2',
        'Where the boys had stood, six swans now rose into the air.',
        '原本男孩們站著的地方,六隻天鵝飛了起來。'),
      // TF — atmosphere/inference
      tf('kt-ch6-l3-q3',
        'White feathers fell softly across the bedroom floor.',
        '白色羽毛輕輕落在臥房地板上。',
        'Were the boys still in the room?', 'N',
        '推理:剩下羽毛 → 男孩變天鵝飛走了 → 答 No'),
      // narration — image
      nar('kt-ch6-l3-q4',
        'White wings beat the air. The window blew wide open.',
        '白翅膀拍打空氣。窗戶大大地打開。'),
      // MC — paraphrase exit
      mc('kt-ch6-l3-q5',
        'The six swans flew out of the open glass and away from the castle.',
        'How did the swans leave?',
        ['through the door',
         'past the window pane',
         'down the stairs',
         'into the well'],
        ['從門', '從窗戶玻璃', '從樓梯', '到井裡'],
        1,
        '飛出打開的玻璃 → 從窗戶玻璃。'),
      // MC — paraphrase moonlight
      mc('kt-ch6-l3-q6',
        'They lifted into the pale light of the night and were soon gone.',
        'Where did the swans fly into?',
        ['the sunny sky', 'the moonlit sky', 'a dark cave', 'the deep sea'],
        ['晴朗的天空', '月光的天空', '黑暗洞穴', '深海'],
        1,
        '夜裡淡淡的光 → 月光的天空。'),
      // emoji — what they became
      emoji('kt-ch6-l3-q7',
        'What did the boys turn into?',
        'What did the boys turn into?',
        ['🐺 wolves', '🐦 swans', '🦅 eagles', '🐭 mice'],
        ['狼', '天鵝', '老鷹', '老鼠'],
        1,
        '男孩變成 → 天鵝。'),
      // narration — morning, sister
      nar('kt-ch6-l3-q8',
        'In the morning, the little girl pushed open the heavy door.',
        '早晨,小女孩推開沉重的門。'),
      // MC — paraphrase what she finds
      mc('kt-ch6-l3-q9',
        'Six small beds lay smooth and still. No one had slept in them.',
        'What did the girl see in the room?',
        ['her brothers asleep',
         'six empty beds',
         'a pile of toys',
         'her mother\'s chair'],
        ['哥哥們在睡覺', '六張空空的床', '一堆玩具', '媽媽的椅子'],
        1,
        '床平整無人 → 六張空空的床。'),
      // inference comp — what she felt
      inferLc('kt-ch6-l3-q10',
        'Her hands grew cold. The empty beds said one thing — her brothers were gone.',
        'How did the girl feel?',
        ['surprised and afraid',
         'tired and bored',
         'angry and proud',
         'sleepy and warm'],
        ['震驚又害怕', '累又無聊', '生氣又驕傲', '想睡又溫暖'],
        0,
        '推理:手變冷 → 震驚又害怕。'),
      // Q11 HOOK (B1 物理懸念 — boys gone, can they return?)
      nar('kt-ch6-l3-q11',
        'A single white feather lay on the windowsill. She picked it up slowly...',
        '窗台上躺著一根白色羽毛。她慢慢拾起……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch6-4 — Beat 4 The vow of silence
  // Hook B5: 六年不能說話,她能撐下去嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch6-l4', chapter: 6, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'six-swans',
    storyBeat: '沉默六年 — 縫六件衣',
    questions: [
      vocabIntro('kt-ch6-l4-q1', [
        ['找到', 'find'],
        ['小屋', 'hut'],
        ['縫', 'sew'],
        ['年', 'year'],
      ]),
      // narration — finding brothers
      nar('kt-ch6-l4-q2',
        'The sister walked for many days into the deep dark wood.',
        '妹妹走了好多天,進入又深又黑的森林。'),
      // TF — action implication (walking many days → far)
      tf('kt-ch6-l4-q3',
        'Her shoes wore thin and her small bag held only one piece of bread.',
        '她的鞋走得很薄,小袋子裡只剩一塊麵包。',
        'Was her journey short and easy?', 'N',
        '推理:鞋磨薄 + 只剩一塊麵包 → 不短也不輕鬆 → 答 No'),
      // narration — finding hut
      nar('kt-ch6-l4-q4',
        'She found a small wooden hut, half hidden by tall green leaves.',
        '她找到一間小木屋,半藏在高高綠葉後面。'),
      // MC — paraphrase the rule
      mc('kt-ch6-l4-q5',
        'By day they wore feathers and flew. For one short hour each night, they were boys again.',
        'When could the brothers be boys?',
        ['all day long',
         'only at sunrise',
         'briefly after dark',
         'never again'],
        ['整天都是', '只有日出', '天黑後短暫一段', '永遠不行'],
        2,
        '夜裡短短一小時 → 天黑後短暫一段。'),
      // MC — paraphrase the task
      mc('kt-ch6-l4-q6',
        'To set them free, she had to sew six shirts from a sharp white flower.',
        'What did she need to do to save them?',
        ['fight the queen',
         'find six golden rings',
         'make clothes from petals',
         'find a magic stone'],
        ['打敗王后', '找六個金戒指', '用花瓣做衣服', '找魔石'],
        2,
        '用花縫衣 → 用花瓣做衣服。'),
      // emoji — material
      emoji('kt-ch6-l4-q7',
        'What did she sew the shirts from?',
        'What was the shirt material?',
        ['🌸 a flower', '🪨 a stone', '🐑 wool', '🌿 grass'],
        ['花', '石頭', '羊毛', '草'],
        0,
        '尖白花 → 花。'),
      // narration — the cost
      nar('kt-ch6-l4-q8',
        'She could not speak. She could not laugh. Not for six long years.',
        '她不可以說話,不可以笑。六年都不行。'),
      // MC — paraphrase silence
      mc('kt-ch6-l4-q9',
        'No word would leave her lips, not in pain, not in joy, not for help.',
        'What rule did she have to follow?',
        ['eat no food', 'sleep alone', 'stay silent', 'walk barefoot'],
        ['不能吃東西', '一個人睡', '保持安靜', '光腳走路'],
        2,
        '一個字也不出口 → 保持安靜。'),
      // gist — main idea
      gist('kt-ch6-l4-q10',
        'A small flower, a silent girl, and six years that would feel like a long cold winter.',
        'What is this scene mainly showing?',
        ['quiet hard work to save her brothers',
         'happy days in the forest',
         'learning to dance with friends',
         'fighting the angry queen'],
        ['安靜辛苦地救哥哥', '森林裡快樂的日子', '跟朋友學跳舞', '跟王后打架'],
        0,
        '主旨 = 安靜辛苦地救哥哥。'),
      // Q11 HOOK (B5 道德兩難 — can she hold the silence?)
      nar('kt-ch6-l4-q11',
        'She sewed and sewed. The nights grew long. She did not speak. She did not cry out loud...',
        '她縫了又縫。夜變得好長。她不出聲,也不哭出來……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch6-5 — Beat 5 The young king finds her
  // Hook B6: 王子的母親會接受她嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch6-l5', chapter: 6, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'six-swans',
    storyBeat: '王子接走她 — 但她仍縫衣不語',
    questions: [
      vocabIntro('kt-ch6-l5-q1', [
        ['年輕', 'young'],
        ['樹', 'tree'],
        ['新娘', 'bride'],
        ['母親', 'mother'],
      ]),
      // narration
      nar('kt-ch6-l5-q2',
        'A young king rode through the wood on a cool grey morning.',
        '一個年輕的國王在涼涼灰色的早晨騎馬穿過森林。'),
      // TF — atmosphere (she is high in a tree, silent)
      tf('kt-ch6-l5-q3',
        'High in the branches of a wide old tree sat a silent girl with a needle.',
        '一棵大老樹的高高枝頭上,坐著一個拿針的安靜女孩。',
        'Was she easy to find?', 'N',
        '推理:坐在樹上很高 + 安靜 → 不容易找 → 答 No'),
      // narration — taken home
      nar('kt-ch6-l5-q4',
        'He took her down from the tree and brought her back to his castle.',
        '他把她從樹上接下來,帶回他的城堡。'),
      // MC — paraphrase wedding
      mc('kt-ch6-l5-q5',
        'He gave her his ring and made her the lady of his great hall.',
        'What did the young king do for her?',
        ['sent her away',
         'made her his bride',
         'put her in jail',
         'made her cook food'],
        ['送走她', '娶她為妻', '把她關起來', '叫她煮飯'],
        1,
        '給戒指 + 成為大廳的女主人 → 娶她為妻。'),
      // MC — paraphrase she still sews
      mc('kt-ch6-l5-q6',
        'Even in her new soft bed, her hands worked the needle deep into the night.',
        'What did she still do every night?',
        ['cry', 'dance', 'sew', 'read'],
        ['哭', '跳舞', '縫衣', '讀書'],
        2,
        '針還在她手上 → 縫衣。'),
      // emoji — what she carries
      emoji('kt-ch6-l5-q7',
        'What was always in her hands?',
        'What was in her hands?',
        ['🪡 a needle', '🗡️ a knife', '🪞 a mirror', '📖 a book'],
        ['針', '刀', '鏡子', '書'],
        0,
        '針在手中縫衣。'),
      // narration — the king's mother
      nar('kt-ch6-l5-q8',
        'The mother of the young king watched the silent bride with hard eyes.',
        '年輕國王的母親用嚴厲的眼神看著沉默的新娘。'),
      // MC — paraphrase mother's view
      mc('kt-ch6-l5-q9',
        'Each day the older woman whispered cold things about the bride.',
        'How did the king\'s mother feel about the bride?',
        ['warm and loving',
         'cold and unkind',
         'sleepy and bored',
         'amazed and proud'],
        ['熱情有愛', '冷淡又不友善', '想睡又無聊', '驚奇又驕傲'],
        1,
        '低聲說冷冷的話 → 冷淡又不友善。'),
      // inference — why she keeps sewing
      inferLc('kt-ch6-l5-q10',
        'The bride heard every word. But she did not stop. She did not look up. The shirts had to be done.',
        'Why did she keep sewing in silence?',
        ['she liked to make clothes',
         'to save her six brothers',
         'because the king ordered it',
         'to win a prize'],
        ['她喜歡做衣服', '為了救六個哥哥', '因為國王命令', '為了拿獎'],
        1,
        '推理:衣服必須完成 → 為了救六個哥哥。'),
      // Q11 HOOK (B6 — king's mother whispering, six years not yet up)
      nar('kt-ch6-l5-q11',
        'The young king loved her. But his mother stood behind every door, watching, waiting...',
        '年輕國王愛她。但他母親站在每扇門後,看著,等著……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch6-6 — Beat 6 The false charge
  // Hook B5: 她要說話救自己嗎?還是繼續織?
  // (Only place we quote dialogue — the lie itself)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch6-l6', chapter: 6, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'six-swans',
    storyBeat: '謊言三次 — 火堆已搭好',
    questions: [
      vocabIntro('kt-ch6-l6-q1', [
        ['偷', 'steal'],
        ['嬰兒', 'baby'],
        ['謊言', 'lie'],
        ['火', 'fire'],
      ]),
      // narration — baby born
      nar('kt-ch6-l6-q2',
        'The bride had a small baby with soft pink cheeks.',
        '新娘生下一個粉嫩臉頰的小嬰兒。'),
      // TF — action implication (mother takes baby in the night)
      tf('kt-ch6-l6-q3',
        'In the deep of the night, the king\'s mother came into the room with quiet feet.',
        '深夜裡,國王的母親腳步輕輕走進房間。',
        'Did she come with good plans?', 'N',
        '推理:深夜 + 腳步輕 → 偷偷做事 → 不是好事 → 答 No'),
      // narration — baby gone
      nar('kt-ch6-l6-q4',
        'She lifted the baby from the warm bed and carried it far away.',
        '她從溫暖的床抱走嬰兒,帶到很遠的地方。'),
      // MC — paraphrase the lie (the only quoted speech in the chapter)
      mc('kt-ch6-l6-q5',
        '"She ate her own child," the older woman told the king the next morning.',
        'What did the king\'s mother say?',
        ['fell into sickness',
         'loved every baby',
         'harmed her own child',
         'ran far from home'],
        ['生病了', '愛每個嬰兒', '傷害自己孩子', '逃離家'],
        2,
        '她告訴國王的話 → 傷害自己孩子。'),
      // MC — paraphrase silence
      mc('kt-ch6-l6-q6',
        'The bride heard the lie, but no word came from her lips.',
        'Why did the bride not speak back?',
        ['her ears could not hear',
         'her promise kept her quiet',
         'agreeing with the queen',
         'fast asleep in bed'],
        ['耳朵聽不到', '她的承諾讓她安靜', '同意王后', '在床上熟睡'],
        1,
        '針還沒做完 + 不能說 → 承諾讓她安靜。'),
      // emoji — how she answers
      emoji('kt-ch6-l6-q7',
        'How did the bride answer the lie?',
        'How did she answer?',
        ['🗣️ with words', '🤐 with silence', '😡 with shouts', '✍️ with writing'],
        ['用話', '用沉默', '用吼叫', '用寫字'],
        1,
        '不能說 → 用沉默。'),
      // narration — three times
      nar('kt-ch6-l6-q8',
        'A second baby came. The same thing happened. Then a third.',
        '第二個嬰兒來了,同樣的事發生了,然後第三個。'),
      // MC — paraphrase pattern
      mc('kt-ch6-l6-q9',
        'Once, twice, and a final time a small child was born. Each one was gone by morning.',
        'How many babies did the bride lose?',
        ['one', 'two', 'a trio', 'four'],
        ['一個', '兩個', '一組三個', '四個'],
        2,
        'Once + twice + final time → 一組三個。'),
      // gist — main idea (the dilemma)
      gist('kt-ch6-l6-q10',
        'Three lost children, one quiet bride, six unfinished shirts, and a fire in the yard.',
        'What is this scene mainly about?',
        ['happy wedding day',
         'silent woman facing flames',
         'hunting down a thief',
         'royal feast in the hall'],
        ['快樂的婚禮', '面對火焰的沉默女人', '抓小偷', '大廳裡的宴會'],
        1,
        '主旨 = 面對火焰的沉默女人。'),
      // Q11 HOOK (B5 — speak to save self, or keep sewing?)
      nar('kt-ch6-l6-q11',
        'Wood was piled high in the castle yard. The fire was built for her. Six shirts lay in her lap, but one had only one sleeve...',
        '城堡庭院裡柴堆得高高。火堆是為她搭的。六件衣放在她膝上,但有一件只縫好一隻袖子……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch6-7 — Beat 7 The sky turns white, truth told
  // Hook B2 big: 大翻轉 + 開放後鉤(小弟那隻翅膀)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch6-l7', chapter: 6, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'six-swans',
    storyBeat: '正午 — 真相說出口',
    questions: [
      vocabIntro('kt-ch6-l7-q1', [
        ['正午', 'noon'],
        ['下來', 'down'],
        ['天空', 'sky'],
        ['真相', 'truth'],
      ]),
      // narration — the day of the fire
      nar('kt-ch6-l7-q2',
        'The day of the fire came. The sun climbed slowly to the top of the sky.',
        '火刑那一天到了。太陽慢慢爬到天空最高處。'),
      // TF — time accumulation (R4: C — six years end at noon)
      tf('kt-ch6-l7-q3',
        'For six long years she had not spoken one word.',
        '六年漫長歲月,她一個字都沒說。',
        'Were the six years finally over at noon?', 'Y',
        '推理:六年到正午 → 結束了 → 答 Yes'),
      // narration — swans come down (poetic)
      nar('kt-ch6-l7-q4',
        'Just then, six white swans came down from the sky.',
        '就在那時,六隻白天鵝從天上飛下來。'),
      // MC — paraphrase action
      mc('kt-ch6-l7-q5',
        'She lifted the small white shirts and threw one over each bird.',
        'What did she do with the shirts?',
        ['put them in a box',
         'threw one on each swan',
         'gave them to the king',
         'burned them in the fire'],
        ['放進盒子', '丟在每隻天鵝上', '給國王', '燒掉'],
        1,
        '一件丟一隻天鵝 → 丟在每隻天鵝上。'),
      // MC — paraphrase transformation
      mc('kt-ch6-l7-q6',
        'White feathers fell away. Six brothers stood in the yard again.',
        'What happened to the swans?',
        ['flew off into clouds',
         'changed back to boys',
         'sang a sweet song',
         'fell into a deep sleep'],
        ['飛進雲裡', '變回男孩', '唱了首甜美的歌', '陷入沉睡'],
        1,
        '羽毛落 → 變回兄弟 → 變回男孩。'),
      // emoji — what time
      emoji('kt-ch6-l7-q7',
        'When did the six years end?',
        'When did they end?',
        ['🌅 dawn', '🌞 noon', '🌇 sunset', '🌙 midnight'],
        ['黎明', '正午', '日落', '午夜'],
        1,
        '正午結束。'),
      // narration — the youngest's wing
      nar('kt-ch6-l7-q8',
        'But the last shirt was not done. The youngest brother still had one white wing.',
        '但最後一件衣沒縫完。最小的弟弟還剩一隻白翅膀。'),
      // MC — paraphrase the youngest
      mc('kt-ch6-l7-q9',
        'Where his left arm should have been, soft feathers still grew.',
        'What did the youngest brother have left?',
        ['one bird wing',
         'a long fox tail',
         'sharp duck beak',
         'soft new song'],
        ['一隻鳥翅膀', '一條狐狸尾巴', '尖鴨喙', '柔和新歌'],
        0,
        '羽毛仍在手臂位置 → 一隻鳥翅膀。'),
      // inference — why now she can speak
      inferLc('kt-ch6-l7-q10',
        'The six years were over. The shirts were thrown. She opened her mouth, and the truth came out.',
        'Why could she speak now?',
        ['king finally gave permission',
         'her long silence had ended',
         'queen had fled the castle',
         'flames stopped burning'],
        ['國王終於允許', '她漫長的沉默結束了', '王后逃出城堡', '火不再燒'],
        1,
        '推理:六年結束 + 衣已丟 → 她漫長的沉默結束了。'),
      // Q11 HOOK (B2 big turn + B6 open ending on the wing)
      nar('kt-ch6-l7-q11',
        'The fire went cold. The truth was told. But the youngest brother turned to her with one wing still on his back...',
        '火堆冷了。真相說出口了。但最小的弟弟轉頭看她,背上還留著一隻翅膀……'),
    ],
  },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
let tfCount = 0, gistCount = 0, inferCount = 0;
for (const l of lessons) {
  for (const q of l.questions) {
    if (q.type === 'listen-tf') tfCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'gist') gistCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'inference') inferCount++;
  }
}
console.log(`     listen-tf (inference): ${tfCount}, listen-comp gist: ${gistCount}, listen-comp infer: ${inferCount}`);
