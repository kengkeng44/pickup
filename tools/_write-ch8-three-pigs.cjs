#!/usr/bin/env node
/**
 * v2.0.B.234+ — Ch8 三隻小豬 (Three Little Pigs, Joseph Jacobs 1890).
 *
 * Pipeline ship via tools/pickup-new-story.cjs (B.234 URL pipeline 驗證).
 * Source canon: docs/canon/three-pigs.md (7-beat arc).
 * Cuts: docs/canon/three-pigs-cuts.md (B6/B1/B4/B3/B2/B6/B6 hook).
 *
 * Structure per lesson (11 Q, 對齊 _write-ch1-momotaro.cjs):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration (deepen) OR listen-tf (inference)
 *   q4  listen-tf (inference) OR mc (paraphrase)
 *   q5  narration (routine)
 *   q6  listen-mc (paraphrased detail)
 *   q7  narration (transition)
 *   q8  listen-mc (paraphrased detail) OR emoji
 *   q9  narration (BEAT D)
 *   q10 emoji-pick (visual hook) OR mc
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim)
 *   R3 A2 vocab only (no whispered/gleaming/perished/devoured)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cultural / violence rules (per docs/canon/three-pigs.md + lint-cultural):
 *   - Wolf 不吃豬: L7 wolf gives up + runs to woods (per user prompt)
 *   - 'chase / try to catch' OK; never 'ate' / 'killed'
 *   - Three-fold repetition 簡化成 'hair on my chin' (drop 'chinny chin chin' for A2)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch8.json');

// ─── Helpers (copied verbatim from _write-ch1-momotaro.cjs, tag swap) ──
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch8', 'three-pigs'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch8', 'three-pigs', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch8', 'three-pigs'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch8', 'three-pigs', 'gist'],
    subSkill: 'gist' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch8', 'three-pigs', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch8', 'three-pigs', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch8-1: Three brothers leave home (B6 預言種子 hook — 狼真的會來?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch8-l1', chapter: 8, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'three-pigs',
    storyBeat: '三兄弟離家 — 媽媽說:小心狼',
    questions: [
      vocabIntro('kt-ch8-l1-q1', [
        ['豬', 'pig'],
        ['媽媽', 'mother'],
        ['離開', 'leave'],
        ['路', 'road'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch8-l1-q2',
        'Three little pigs grew up in their mother\'s house.',
        '三隻小豬在媽媽家長大。'),
      // Q3 BEAT A deepen
      nar('kt-ch8-l1-q3',
        'One spring day, their mother said it was time to leave.',
        '一個春天,媽媽說該離家了。'),
      // Q4 TF inference (atmosphere — leaving is a big change)
      // grade target ≤ 4: shorten + drop subordinate clause
      tf('kt-ch8-l1-q4',
        'The brothers hugged her tight. They did not let go.',
        '三兄弟把她抱得很緊。他們不肯放手。',
        'Did the pigs feel sad to leave?', 'Y',
        '推理: 抱很緊不放 → 不捨 → 答 Yes'),
      // Q5 BEAT B — routine, walking down road
      nar('kt-ch8-l1-q5',
        'They walked down the road together, side by side.',
        '他們一起走在路上,肩並肩。'),
      // Q6 listen-mc paraphrase about route (X3 fix: option words ≠ sentence words)
      mc('kt-ch8-l1-q6',
        'Each pig would build his own home along this road.',
        'What was the plan for each pig?',
        ['live with mother', 'make a separate house', 'travel forever', 'sleep in trees'],
        ['跟媽媽住', '蓋自己的房子', '一直旅行', '睡樹上'],
        1,
        '推理: own home → separate house (paraphrase)。'),
      // Q7 BEAT C — wolf intro
      nar('kt-ch8-l1-q7',
        'The big bad wolf lived in the woods nearby.',
        '大野狼住在附近的森林。'),
      // Q8 listen-mc paraphrase about wolf (X3 fix: paraphrase, no overlap)
      mc('kt-ch8-l1-q8',
        'He was hungry. He liked to chase small animals near the road.',
        'What did the wolf like to do?',
        ['rest by the lake', 'go after little creatures', 'plant a garden', 'count stars'],
        ['湖邊休息', '追小動物', '種菜', '數星星'],
        1,
        '推理: chase → go after, animals → creatures (paraphrase)。'),
      // Q9 BEAT D — mother's warning
      nar('kt-ch8-l1-q9',
        'Mother said, "Be careful. Build a strong house."',
        '媽媽說:「小心。蓋一間堅固的家。」'),
      // Q10 emoji — what warning
      emoji('kt-ch8-l1-q10',
        'What kind of house did mother ask for?',
        'What kind of house?',
        ['🏰 a strong one', '🍃 a thin one', '🚗 a fast one', '🍰 a sweet one'],
        ['堅固的', '薄薄的', '快的', '甜的'],
        0,
        '堅固的家 = strong one。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch8-l1-q11',
        'Mother\'s words hang in the air: build a strong house...',
        '媽媽的話留在空氣中:蓋一間堅固的家……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch8-2: Straw house (B1 物理懸念 hook — 風吹草搖)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch8-l2', chapter: 8, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'three-pigs',
    storyBeat: '草屋蓋好 — 風吹草搖',
    questions: [
      vocabIntro('kt-ch8-l2-q1', [
        ['草', 'straw'],
        ['快', 'fast'],
        ['風', 'wind'],
        ['牆', 'wall'],
      ]),
      // Q2 BEAT A
      nar('kt-ch8-l2-q2',
        'The first pig met a man with a cart full of straw.',
        '第一隻小豬遇到一個人,推著滿滿一車的稻草。'),
      // Q3 TF inference (action — wanted easy)
      tf('kt-ch8-l2-q3',
        'He chose straw because it was light and easy to lift.',
        '他選稻草,因為輕又好搬。',
        'Did the first pig want a hard job?', 'N',
        '推理: 選輕的好搬 → 不想做難工 → 答 No'),
      // Q4 BEAT B
      nar('kt-ch8-l2-q4',
        'He took the straw and built a house in one hour.',
        '他拿了稻草,一小時就蓋好房子。'),
      // Q5 mc paraphrase about speed (grade ≤ 4 shorten)
      mc('kt-ch8-l2-q5',
        'He was done before lunch time.',
        'How fast did the first pig build?',
        ['very slow', 'very fast', 'a whole day', 'all week'],
        ['很慢', '很快', '一整天', '一整週'],
        1,
        '午餐前就蓋好 → 很快。'),
      // Q6 BEAT C — rest
      nar('kt-ch8-l2-q6',
        'He sat down to rest and ate his lunch.',
        '他坐下休息,吃午餐。'),
      // Q7 emoji
      emoji('kt-ch8-l2-q7',
        'How did the first pig feel after building?',
        'How did he feel?',
        ['😌 happy and lazy', '😢 sad', '😡 angry', '😴 too tired'],
        ['輕鬆又開心', '難過', '生氣', '太累'],
        0,
        '坐下吃飯 → 輕鬆又開心。'),
      // Q8 BEAT D — wind comes
      nar('kt-ch8-l2-q8',
        'The wind began to blow across the field.',
        '風開始吹過田野。'),
      // Q9 mc — paraphrase about house being weak
      mc('kt-ch8-l2-q9',
        'The walls leaned and shook with every soft breeze.',
        'How strong were the straw walls?',
        ['very strong', 'weak and shaky', 'wet and warm', 'hard like rock'],
        ['很堅固', '弱又會搖', '濕又暖', '硬如石'],
        1,
        '輕風就搖 → 弱又會搖。'),
      // Q10 BEAT — pig ignores
      nar('kt-ch8-l2-q10',
        'But the first pig only smiled and ate.',
        '但第一隻小豬只是笑笑,繼續吃。'),
      // Q11 HOOK — B1 物理懸念 (wind blowing straw walls)
      nar('kt-ch8-l2-q11',
        'The straw walls sway again. And again. And again...',
        '稻草牆又搖了。又搖了。又搖了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch8-3: Wood house (B4 期待加速 hook — 遠處腳步聲)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch8-l3', chapter: 8, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'three-pigs',
    storyBeat: '木屋蓋好 — 遠處腳步聲',
    questions: [
      vocabIntro('kt-ch8-l3-q1', [
        ['木枝', 'sticks'],
        ['第二', 'second'],
        ['驕傲', 'proud'],
        ['腳步', 'steps'],
      ]),
      // Q2 BEAT A
      nar('kt-ch8-l3-q2',
        'The second pig met a man with a cart of sticks.',
        '第二隻小豬遇到一個人,推著一車的木枝。'),
      // Q3 mc paraphrase about choice
      mc('kt-ch8-l3-q3',
        'He picked sticks because they felt firmer than straw.',
        'Why did he pick sticks?',
        ['they were cheap', 'they were firmer than straw', 'his brother said so', 'he had no choice'],
        ['很便宜', '比稻草硬', '哥哥叫他', '沒得選'],
        1,
        '比稻草硬 → firmer than straw。'),
      // Q4 BEAT B
      nar('kt-ch8-l3-q4',
        'He built his house in one afternoon.',
        '他一個下午就蓋好他的家。'),
      // Q5 TF inference (time — one afternoon is fast). grade ≤ 4 shorten.
      tf('kt-ch8-l3-q5',
        'He worked all day. He did not stop.',
        '他做了一整天。他沒有停。',
        'Did he take many long breaks?', 'N',
        '推理: 沒停 → 沒長休息 → 答 No'),
      // Q6 BEAT C — felt proud
      nar('kt-ch8-l3-q6',
        'He looked at his new home and felt proud.',
        '他看著新家,覺得驕傲。'),
      // Q7 emoji
      emoji('kt-ch8-l3-q7',
        'What did the second pig feel?',
        'What did he feel?',
        ['😌 proud', '😢 sorry', '😡 mad', '😨 afraid'],
        ['驕傲', '抱歉', '生氣', '害怕'],
        0,
        '看著新家 → 驕傲。'),
      // Q8 BEAT D — sun goes down
      nar('kt-ch8-l3-q8',
        'The sun went down behind the trees.',
        '太陽落到樹後面。'),
      // Q9 mc paraphrase about sound
      mc('kt-ch8-l3-q9',
        'From the dark path came a soft sound, slow and heavy.',
        'What did the second pig hear?',
        ['birds singing', 'soft heavy steps', 'rain falling', 'his brother\'s laugh'],
        ['鳥叫', '輕輕重重的腳步', '下雨', '哥哥笑聲'],
        1,
        '輕輕重重 → 腳步。'),
      // Q10 BEAT — listening
      nar('kt-ch8-l3-q10',
        'The second pig stood still. He listened.',
        '第二隻小豬站著不動。他聽。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch8-l3-q11',
        'Heavy steps. Heavy steps. Coming closer down the path...',
        '重重的腳步。重重的腳步。沿著路越走越近……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch8-4: Wolf knocks at straw house (B3 資訊缺口 hook — 第一隻會怎答?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch8-l4', chapter: 8, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'three-pigs',
    storyBeat: '大野狼敲草屋的門',
    questions: [
      vocabIntro('kt-ch8-l4-q1', [
        ['磚', 'brick'],
        ['泥', 'mud'],
        ['敲門', 'knock'],
        ['呼吸', 'breath'],
      ]),
      // Q2 BEAT A — third pig still working
      nar('kt-ch8-l4-q2',
        'The third pig was still working hard on his house.',
        '第三隻小豬還在認真蓋他的家。'),
      // Q3 mc paraphrase about materials (X3 fix: option words ≠ sentence words)
      mc('kt-ch8-l4-q3',
        'He lifted heavy red blocks and mixed cold wet earth all day.',
        'What did the third pig use?',
        ['straw and grass', 'baked stone and clay', 'paper and tape', 'snow and ice'],
        ['草', '燒過的石頭和黏土', '紙和膠帶', '雪和冰'],
        1,
        '推理: red blocks = 磚 (baked stone), wet earth = 黏土 (clay)。'),
      // Q4 BEAT B — others laugh
      nar('kt-ch8-l4-q4',
        'The other two pigs laughed at him for working so slow.',
        '另外兩隻小豬笑他做得太慢。'),
      // Q5 TF inference (contrast — slow but solid). grade ≤ 4 shorten.
      tf('kt-ch8-l4-q5',
        'His walls were tall. His walls were thick.',
        '他的牆很高。他的牆很厚。',
        'Was his work weak?', 'N',
        '推理: 高又厚 → 紮實 → 答 No'),
      // Q6 BEAT C — night falls
      nar('kt-ch8-l4-q6',
        'That same night, the wolf came to the straw house.',
        '同一個晚上,大野狼來到草屋。'),
      // Q7 emoji
      emoji('kt-ch8-l4-q7',
        'Where did the wolf go first?',
        'Where did the wolf go first?',
        ['🌾 the straw house', '🪵 the wood house', '🧱 the brick house', '🌳 a tall tree'],
        ['草屋', '木屋', '磚屋', '高樹'],
        0,
        '先去草屋。'),
      // Q8 BEAT D — knock
      nar('kt-ch8-l4-q8',
        'He knocked on the wooden door three times.',
        '他敲了木門三下。'),
      // Q9 mc — paraphrase
      mc('kt-ch8-l4-q9',
        'His knocks were loud, and his voice was soft like honey.',
        'How did the wolf knock and speak?',
        ['quiet and angry', 'loud knock, sweet voice', 'silent and shy', 'shouted loudly'],
        ['輕又生氣', '大聲敲,聲音甜', '靜悄悄', '大叫'],
        1,
        '敲很大,話卻甜。'),
      // Q10 BEAT — speaks
      nar('kt-ch8-l4-q10',
        '"Little pig, little pig, let me come in!" he called.',
        '「小豬小豬,讓我進來!」他叫著。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch8-l4-q11',
        'The first pig held his breath. He did not know what to say...',
        '第一隻小豬屏住呼吸。他不知道該說什麼……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch8-5: Straw house falls (B2 情緒翻轉 hook — 木屋擋得住嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch8-l5', chapter: 8, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'three-pigs',
    storyBeat: '草屋倒了 — 木屋擋得住嗎?',
    questions: [
      vocabIntro('kt-ch8-l5-q1', [
        ['下巴', 'chin'],
        ['吹', 'blow'],
        ['倒', 'fall'],
        ['跑', 'run'],
      ]),
      // Q2 BEAT A — pig refuses
      nar('kt-ch8-l5-q2',
        '"Not by the hair on my chin!" the first pig cried.',
        '「我下巴上的毛都不!」第一隻小豬大叫。'),
      // Q3 mc paraphrase about refusal (X3 fix + X2 fix: vary starts, paraphrase)
      mc('kt-ch8-l5-q3',
        'He told the wolf he would never open the door.',
        'What did the first pig say?',
        ['please come inside', 'a strong no', 'come for tea', 'goodbye, friend'],
        ['請進', '堅決說不', '來喝茶', '再見朋友'],
        1,
        '推理: never open → 堅決說不 (strong refusal)。'),
      // Q4 BEAT B — wolf threatens
      nar('kt-ch8-l5-q4',
        'The wolf smiled and his eyes grew bright.',
        '大野狼笑了,眼睛變亮。'),
      // Q5 TF inference (action — smile + bright eyes = bad sign)
      tf('kt-ch8-l5-q5',
        'His paws stretched, and he took a long deep breath.',
        '他的爪子伸開,深深吸一口氣。',
        'Was the wolf about to leave?', 'N',
        '推理: 伸爪深呼吸 → 要動手了 → 答 No'),
      // Q6 BEAT C — huff puff blow
      nar('kt-ch8-l5-q6',
        'He huffed. He puffed. He blew with all his might.',
        '他用力吹氣。他大力吹氣。他用盡全力吹。'),
      // Q7 emoji — what did wolf do
      emoji('kt-ch8-l5-q7',
        'What did the wolf do?',
        'What did the wolf do?',
        ['💨 blew very hard', '🍞 baked bread', '💤 took a nap', '🎵 sang a song'],
        ['用力吹氣', '烤麵包', '小睡', '唱歌'],
        0,
        '用力吹氣 = blew very hard。'),
      // Q8 BEAT D — straw falls
      nar('kt-ch8-l5-q8',
        'The straw house flew apart in just a few seconds.',
        '草屋在幾秒內就被吹散。'),
      // Q9 mc paraphrase about pig running (X2 fix: vary option starts)
      mc('kt-ch8-l5-q9',
        'The first pig dashed away, with his short legs going fast.',
        'How did the first pig escape?',
        ['jumped over a wall', 'ran on quick feet', 'hid below the straw', 'asked the wolf'],
        ['跳過牆', '快腳跑', '躲草下', '問狼'],
        1,
        '推理: dashed away → ran on quick feet (paraphrase)。'),
      // Q10 BEAT — bangs on door
      nar('kt-ch8-l5-q10',
        'He ran to the wood house and banged on the door.',
        '他跑到木屋,猛敲門。'),
      // Q11 HOOK — B2 情緒翻轉 (will wood hold?)
      nar('kt-ch8-l5-q11',
        '"Let me in! Let me in!" he cried. "The wolf is coming!"',
        '「讓我進!讓我進!」他大叫。「大野狼來了!」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch8-6: Wood house falls (B6 預言種子 hook — 磚屋會撐嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch8-l6', chapter: 8, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'three-pigs',
    storyBeat: '木屋倒了 — 磚屋是希望',
    questions: [
      vocabIntro('kt-ch8-l6-q1', [
        ['鎖', 'lock'],
        ['屋頂', 'roof'],
        ['後面', 'back'],
        ['希望', 'hope'],
      ]),
      // Q2 BEAT A
      nar('kt-ch8-l6-q2',
        'The two pigs locked the wood door tight.',
        '兩隻小豬把木門牢牢鎖好。'),
      // Q3 mc paraphrase about wolf coming
      mc('kt-ch8-l6-q3',
        'They saw the wolf step up the path with hungry eyes.',
        'How did the wolf look as he came?',
        ['shy and quiet', 'hungry and ready', 'tired and sleepy', 'happy and singing'],
        ['害羞安靜', '又餓又準備好', '累又想睡', '開心唱歌'],
        1,
        '眼神餓 → hungry and ready。'),
      // Q4 BEAT B — wolf knocks again
      nar('kt-ch8-l6-q4',
        'The wolf knocked even harder this time.',
        '大野狼這次敲得更用力。'),
      // Q5 TF inference (action implication — harder knock = more determined)
      tf('kt-ch8-l6-q5',
        'His knock shook the wood walls and rattled the windows.',
        '他敲到木牆震動,窗戶嘎嘎響。',
        'Were the wood walls fully safe?', 'N',
        '推理: 敲一下牆就震 → 不夠安全 → 答 No'),
      // Q6 BEAT C — pigs reply
      nar('kt-ch8-l6-q6',
        '"Not by the hair on our chins!" they both cried.',
        '「我們下巴上的毛都不!」他們一起大叫。'),
      // Q7 BEAT D — wolf blows
      nar('kt-ch8-l6-q7',
        'The wolf huffed and puffed and blew the wood house in.',
        '大野狼用力吹,木屋就倒了。'),
      // Q8 emoji — what happened
      emoji('kt-ch8-l6-q8',
        'What happened to the wood house?',
        'What happened?',
        ['🪵 the walls fell', '🌈 it changed color', '🔒 it locked itself', '🎈 it floated up'],
        ['牆倒了', '變色', '自己鎖上', '飄起來'],
        0,
        '牆倒了。'),
      // Q9 mc paraphrase about escape
      mc('kt-ch8-l6-q9',
        'Both brothers ran out the back, fast as they could.',
        'How did the pigs leave?',
        ['through the front door', 'out the back, very fast', 'under the floor', 'they did not leave'],
        ['前門出', '從後面快跑', '從地下', '沒離開'],
        1,
        '從後面快跑 = out the back, very fast。'),
      // Q10 BEAT — running to brick
      nar('kt-ch8-l6-q10',
        'They raced to the brick house with their hearts pounding.',
        '他們跑向磚屋,心臟撲通跳。'),
      // Q11 HOOK — B6 預言種子 (brick house = hope)
      nar('kt-ch8-l6-q11',
        'The third pig opened the door just in time. Just in time...',
        '第三隻小豬剛好打開門。剛好趕上……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch8-7: Brick house wins, wolf gives up (B6 open 開放後鉤)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch8-l7', chapter: 8, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'three-pigs',
    storyBeat: '磚屋擋住狼 — 但狼還在外面',
    questions: [
      vocabIntro('kt-ch8-l7-q1', [
        ['爬', 'climb'],
        ['火', 'fire'],
        ['煙', 'smoke'],
        ['安全', 'safe'],
      ]),
      // Q2 BEAT A — wolf arrives at brick
      nar('kt-ch8-l7-q2',
        'The wolf came to the brick house and knocked.',
        '大野狼來到磚屋,敲門。'),
      // Q3 mc paraphrase about pig refusal
      mc('kt-ch8-l7-q3',
        'All three brothers shouted the same answer back at him.',
        'What did the three pigs say?',
        ['nothing at all', 'not by our chin hair', 'come in please', 'we give up'],
        ['什麼也沒說', '下巴毛都不', '請進', '我們放棄'],
        1,
        '三隻一起喊「下巴毛都不」。'),
      // Q4 BEAT B — wolf tries blow
      nar('kt-ch8-l7-q4',
        'The wolf huffed. He puffed. He blew, and blew, and blew.',
        '大野狼用力吹。再吹。又吹。'),
      // Q5 TF inference (contrast — wolf tries but fails)
      tf('kt-ch8-l7-q5',
        'But the brick walls stood still and did not move at all.',
        '但磚牆站著不動。',
        'Did the brick walls fall down?', 'N',
        '推理: 不動 → 沒倒 → 答 No'),
      // Q6 BEAT C — wolf tries climb
      nar('kt-ch8-l7-q6',
        'The wolf tried to climb the roof to get in.',
        '大野狼想爬上屋頂進去。'),
      // Q7 mc paraphrase about fire
      mc('kt-ch8-l7-q7',
        'The third pig built a hot fire inside a big pot.',
        'What did the third pig do?',
        ['ran outside', 'made a hot fire', 'went to sleep', 'opened the door'],
        ['跑出去', '生了一把熱火', '去睡覺', '開門'],
        1,
        '第三隻生火。'),
      // Q8 emoji
      emoji('kt-ch8-l7-q8',
        'What did the wolf see from the roof?',
        'What did the wolf see?',
        ['💨 smoke', '🌸 flowers', '🦋 a butterfly', '🌟 a star'],
        ['煙', '花', '蝴蝶', '星星'],
        0,
        '看到煙。'),
      // Q9 mc paraphrase about wolf giving up
      mc('kt-ch8-l7-q9',
        'The wolf jumped down from the roof and ran fast to the trees.',
        'What did the wolf finally do?',
        ['stayed and ate', 'gave up and ran away', 'broke the brick wall', 'fell asleep'],
        ['留下吃飯', '放棄逃走', '打破磚牆', '睡著'],
        1,
        '跳下屋頂跑走 = 放棄逃走。'),
      // Q10 BEAT D — pigs warm by fire
      nar('kt-ch8-l7-q10',
        'The three brothers sat warm and safe inside the brick house.',
        '三兄弟坐在磚屋裡,暖又安全。'),
      // Q11 HOOK — B6 open (wolf still in woods)
      nar('kt-ch8-l7-q11',
        'But the wolf is still out there, watching from the deep dark woods...',
        '但大野狼還在外面,從深深的黑森林裡看著……'),
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
