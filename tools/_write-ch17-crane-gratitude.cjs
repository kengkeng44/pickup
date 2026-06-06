#!/usr/bin/env node
/**
 * v2.0.B.264+ — Ch17 鶴的報恩 (Tsuru no Ongaeshi, Japanese folk public domain).
 *
 * URL pipeline ship via tools/pickup-new-story.cjs B.234 pattern.
 * Source canon: docs/canon/crane-gratitude.md (7-beat arc).
 * Cuts: docs/canon/crane-gratitude-cuts.md (B6/B3/B5/B4/B1/B2/B6-open).
 *
 * Pairing: Ch17 鶴的報恩 (Japanese) <=> Ch1 桃太郎 + Ch14 浦島太郎 + Ch16 (reserved JP slot)
 *   = 4 個日本民間口傳, 公有領域. Ch1 energy+bravery, Ch14 nostalgia, Ch17 trust+curiosity.
 *
 * Public domain compliance:
 *   - Source: Japanese oral folklore (no single author, public domain by tradition).
 *   - A2 自創句式, do NOT quote 木下順二 1949 戲劇版 / 繪本 / 動畫改編.
 *   - 不出現 'wife' / 'husband' / 'marry' — 兒童化規則 (companion / family framing).
 *   - 拔羽毛 用 'pulled her own feathers' (per user explicit example), NOT '撕' / 'tore'.
 *   - 鶴飛走 用 'flew away to the sky', NOT 'died' / 'gave up'.
 *
 * Structure per lesson (11 Q, mirror Ch1/Ch14 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration / listen-tf inference / listen-mc paraphrase
 *   q4  listen-tf inference / narration
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
 *   R3 A2 vocab only (no enchanted/shimmered/glistened/vanished/forbade)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cultural / no-death rules (per docs/canon/crane-gratitude.md + user prompt):
 *   - 鶴 does NOT die. Final image = 'flew away to the sky'.
 *   - 'wife' → 'companion' / family framing.
 *   - 拔羽毛 用 'pulled her own feathers', non-blood.
 *   - 'female crane became a young woman' is A2 OK as oral-folk magic.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch17.json');

// ─── Helpers (mirror Ch14 範本, tag swap to ch17) ─────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch17', 'crane-gratitude'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch17', 'crane-gratitude', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch17', 'crane-gratitude'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch17', 'crane-gratitude', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch17', 'crane-gratitude', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch17-1: Old man saves a crane (B6 預言種子 — 鶴會回來嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch17-l1', chapter: 17, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'crane-gratitude',
    storyBeat: '老爺爺救受傷的鶴 — 鶴會回來嗎?',
    questions: [
      vocabIntro('kt-ch17-l1-q1', [
        ['老人', 'old man'],
        ['雪', 'snow'],
        ['鶴', 'crane'],
        ['陷阱', 'trap'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch17-l1-q2',
        'Long ago, a kind old man lived in the snowy mountains.',
        '很久以前,一個好心的老人住在雪山裡。'),
      // Q3 BEAT A deepen
      nar('kt-ch17-l1-q3',
        'He lived alone in a tiny house by the trees.',
        '他自己一個人住在樹邊的小房子。'),
      // Q4 TF inference (atmosphere — peaceful but lonely)
      tf('kt-ch17-l1-q4',
        'Every morning he walked through the snow to get firewood.',
        '每個早上他走過雪地撿柴。',
        'Did the old man live a hard life?', 'Y',
        '推理: 自己一個人 + 走雪地撿柴 → 辛苦 → 答 Yes'),
      // Q5 BEAT B — hears a cry
      nar('kt-ch17-l1-q5',
        'One cold morning, he heard a soft cry near the trees.',
        '一個冷冷的早上,他聽到樹邊有輕輕的叫聲。'),
      // Q6 listen-mc paraphrase about the crane (X2 fix: vary option starts)
      mc('kt-ch17-l1-q6',
        'A white crane was caught in a hunter\'s trap.',
        'What did the old man find?',
        ['some lost coins', 'a bird stuck in a trap', 'his old village friend', 'fresh winter flowers'],
        ['一些丟掉的錢', '一隻被困住的鳥', '老朋友', '冬天的花'],
        1,
        '推理: 鶴是鳥 + caught in trap → 被困住的鳥 (paraphrase)。'),
      // Q7 BEAT C — examines the crane
      nar('kt-ch17-l1-q7',
        'Its leg was hurt. Its big eyes were very sad.',
        '牠的腿受傷了。牠大大的眼睛很難過。'),
      // Q8 listen-mc paraphrase about what he did
      mc('kt-ch17-l1-q8',
        'He gently opened the trap and let the crane go.',
        'What did the old man do?',
        ['took it home', 'set it free', 'cooked it for dinner', 'gave it to a hunter'],
        ['帶回家', '放牠走', '煮來吃', '給獵人'],
        1,
        '推理: opened trap + let go → 放牠走 (set free)。'),
      // Q9 BEAT D — crane flies up
      nar('kt-ch17-l1-q9',
        'The crane spread its big white wings and flew up.',
        '鶴展開大大的白翅膀,飛了起來。'),
      // Q10 emoji — direction the crane flew
      emoji('kt-ch17-l1-q10',
        'Where did the crane fly?',
        'Where did it go?',
        ['☁️ up into the grey sky', '🌊 down to the sea', '🏠 into the old man\'s house', '🌳 into a tree hole'],
        ['飛上灰灰的天空', '飛到海裡', '飛進老人家裡', '飛進樹洞'],
        0,
        'flew up → up into the sky。'),
      // Q11 HOOK — B6 預言種子 (will the crane come back?)
      nar('kt-ch17-l1-q11',
        'The crane flies up into the grey sky — will it come back?...',
        '鶴飛上灰灰的天空——牠會回來嗎?……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch17-2: A beautiful young woman knocks (B3 資訊缺口 — 她是誰?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch17-l2', chapter: 17, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'crane-gratitude',
    storyBeat: '美麗女孩來敲門 — 她是誰?',
    questions: [
      vocabIntro('kt-ch17-l2-q1', [
        ['晚上', 'evening'],
        ['敲門', 'knock'],
        ['女孩', 'young woman'],
        ['迷路', 'lost'],
      ]),
      // Q2 BEAT A — same evening
      nar('kt-ch17-l2-q2',
        'That same evening, the snow fell harder and harder.',
        '同一天晚上,雪越下越大。'),
      // Q3 mc paraphrase about the house
      mc('kt-ch17-l2-q3',
        'The old man sat alone by his small warm fire.',
        'How was the old man\'s evening?',
        ['noisy and busy', 'quiet and alone', 'cold and hungry', 'full of friends'],
        ['吵又忙', '安靜一個人', '冷又餓', '滿是朋友'],
        1,
        '推理: alone + by fire → quiet and alone。'),
      // Q4 BEAT B — soft knock
      nar('kt-ch17-l2-q4',
        'Suddenly, there was a soft knock at the door.',
        '突然,門口傳來輕輕的敲門聲。'),
      // Q5 TF inference (action — knock at night = surprising)
      tf('kt-ch17-l2-q5',
        'No one ever came to his house in winter nights.',
        '冬天的晚上從來沒有人來他家。',
        'Was the knock a surprise?', 'Y',
        '推理: 沒人來過 + 突然敲門 → 驚訝 → 答 Yes'),
      // Q6 BEAT C — opens the door
      nar('kt-ch17-l2-q6',
        'He opened the door. A young woman stood in the snow.',
        '他打開門。一個女孩站在雪裡。'),
      // Q7 emoji — what did she look like
      emoji('kt-ch17-l2-q7',
        'How did the young woman look?',
        'How did she look?',
        ['🌨️ snow on her hair, kind face', '😡 angry and shouting', '👹 like a scary ghost', '🤡 dressed like a clown'],
        ['頭髮上有雪、善良的臉', '生氣又大叫', '像可怕的鬼', '小丑打扮'],
        0,
        '頭髮有雪 + 善良的臉 = 雪 + kind face。'),
      // Q8 BEAT D — she asks to stay
      nar('kt-ch17-l2-q8',
        '"I am lost," she said. "May I stay tonight?"',
        '「我迷路了,」她說。「我今晚可以住嗎?」'),
      // Q9 mc paraphrase about what the old man did
      mc('kt-ch17-l2-q9',
        'The old man let her in and gave her hot soup.',
        'What did the old man do?',
        ['sent her away', 'welcomed her warmly', 'made her work', 'called the police'],
        ['趕她走', '熱情接待她', '叫她做事', '報警'],
        1,
        '推理: let in + 給湯 → welcomed her warmly (paraphrase)。'),
      // Q10 BEAT — the woman by the fire
      nar('kt-ch17-l2-q10',
        'She sat by the fire. She smiled with a quiet face.',
        '她坐在火邊。她安靜的笑了。'),
      // Q11 HOOK — B3 資訊缺口 (who is she?)
      nar('kt-ch17-l2-q11',
        'She smiles with a quiet face. But who is she really?...',
        '她安靜的笑著。但她到底是誰?……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch17-3: She weaves a precious cloth (B5 道德兩難 — 為什麼她要躲起來織?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch17-l3', chapter: 17, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'crane-gratitude',
    storyBeat: '女孩織出珍貴的布 — 為什麼她要躲起來織?',
    questions: [
      vocabIntro('kt-ch17-l3-q1', [
        ['織', 'weave'],
        ['布', 'cloth'],
        ['房間', 'room'],
        ['答應', 'promise'],
      ]),
      // Q2 BEAT A — she stays
      nar('kt-ch17-l3-q2',
        'The next morning, the young woman did not leave.',
        '第二天早上,女孩沒有離開。'),
      // Q3 mc paraphrase about how she helped (X2 fix: vary option starts)
      mc('kt-ch17-l3-q3',
        'She cooked the meals. She cleaned the house.',
        'How did she help the old man?',
        ['singing songs all day', 'doing daily house work', 'counting his bags of coins', 'cutting wood in the snow'],
        ['唱歌', '做家事', '算錢', '砍柴'],
        1,
        '推理: cooked + cleaned → 做家事 (paraphrase)。'),
      // Q4 BEAT B — she calls him Grandfather
      nar('kt-ch17-l3-q4',
        'She called the old man "Grandfather" with a soft voice.',
        '她用輕輕的聲音叫老人「爺爺」。'),
      // Q5 TF inference (atmosphere — she's becoming family)
      tf('kt-ch17-l3-q5',
        'They lived together like a real family every day.',
        '他們每天就像一家人一樣住在一起。',
        'Did the old man feel alone now?', 'N',
        '推理: 一家人 → 不孤單 → 答 No'),
      // Q6 BEAT C — she wants to weave
      nar('kt-ch17-l3-q6',
        '"Grandfather, I want to weave a cloth for you."',
        '「爺爺,我想為你織一塊布。」'),
      // Q7 emoji — the rule she gives
      emoji('kt-ch17-l3-q7',
        'What rule did she give the old man?',
        'What rule did she give?',
        ['🚪 never look inside the room', '🍚 always eat rice first', '💤 sleep at noon', '🎵 sing every night'],
        ['不要看房間裡面', '先吃飯', '中午睡覺', '每晚唱歌'],
        0,
        'never look → 不要看房間裡面。'),
      // Q8 BEAT D — he promises
      nar('kt-ch17-l3-q8',
        '"I promise. I will not look," said the old man.',
        '「我答應。我不會看,」老人說。'),
      // Q9 mc paraphrase about the loom sound
      mc('kt-ch17-l3-q9',
        'The wooden loom began to click and clack all night.',
        'What sound came from the back room?',
        ['quiet snoring', 'wooden clicking', 'soft singing', 'loud talking'],
        ['輕輕的打呼', '木頭的喀喀聲', '輕輕的唱歌', '大聲說話'],
        1,
        '推理: wooden loom + click clack → wooden clicking。'),
      // Q10 BEAT — old man listens at the door
      nar('kt-ch17-l3-q10',
        'The old man sat by the door. He listened all night.',
        '老人坐在門邊。他聽了整晚。'),
      // Q11 HOOK — B5 道德兩難 (why must she hide?)
      nar('kt-ch17-l3-q11',
        'Why must she hide while she weaves? Why never look?...',
        '為什麼她織布時要躲起來?為什麼不能看?……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch17-4: Merchant praises the cloth (B4 期待加速 — 老爺爺好奇了)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch17-l4', chapter: 17, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'crane-gratitude',
    storyBeat: '商人來看布讚不絕口 — 老爺爺好奇了',
    questions: [
      vocabIntro('kt-ch17-l4-q1', [
        ['三天', 'three days'],
        ['市場', 'market'],
        ['商人', 'merchant'],
        ['黃金', 'gold'],
      ]),
      // Q2 BEAT A — after three days
      nar('kt-ch17-l4-q2',
        'After three days, the young woman came out of the room.',
        '三天後,女孩走出房間。'),
      // Q3 mc paraphrase about the cloth
      mc('kt-ch17-l4-q3',
        'She held a soft white cloth. It shone like fresh snow.',
        'How did the cloth look?',
        ['dirty and torn', 'bright and beautiful', 'dark and heavy', 'small and rough'],
        ['髒又破', '亮又漂亮', '暗又重', '小又粗'],
        1,
        '推理: shone + like snow → bright and beautiful。'),
      // Q4 BEAT B — takes to market
      nar('kt-ch17-l4-q4',
        'The old man took the cloth to the village market.',
        '老人把布拿到村子的市場。'),
      // Q5 TF inference (action — merchant gasps = high value)
      tf('kt-ch17-l4-q5',
        'A merchant saw the cloth and gasped at it.',
        '一個商人看到布,倒抽一口氣。',
        'Did the merchant like the cloth?', 'Y',
        '推理: 倒抽氣 → 驚艷 → 喜歡 → 答 Yes'),
      // Q6 BEAT C — merchant praises
      nar('kt-ch17-l4-q6',
        '"This is the finest cloth I have ever seen!"',
        '「這是我看過最棒的布!」'),
      // Q7 emoji — what did the merchant pay
      emoji('kt-ch17-l4-q7',
        'What did the merchant pay?',
        'What did he pay?',
        ['💰 a big bag of gold', '🥕 some vegetables', '📖 an old book', '🐔 one small chicken'],
        ['一大袋金子', '一些蔬菜', '一本舊書', '一隻小雞'],
        0,
        'big bag of gold = 一大袋金子。'),
      // Q8 BEAT D — old man goes home rich
      nar('kt-ch17-l4-q8',
        'The old man went home with the heavy bag of gold.',
        '老人帶著重重的金子袋回家。'),
      // Q9 mc paraphrase about his heart
      mc('kt-ch17-l4-q9',
        'But his heart kept asking, "Who is she really?"',
        'How did the old man feel inside?',
        ['proud and calm', 'curious and unsure', 'angry and tired', 'sleepy and sad'],
        ['驕傲又冷靜', '好奇又不確定', '生氣又累', '想睡又難過'],
        1,
        '推理: 心一直問問題 → 好奇又不確定。'),
      // Q10 BEAT — the locked door at night
      nar('kt-ch17-l4-q10',
        'At night, the small back door stayed closed and quiet.',
        '晚上,小後門安安靜靜的關著。'),
      // Q11 HOOK — B4 期待加速 (curiosity grows)
      nar('kt-ch17-l4-q11',
        '"How can she weave such magic? Who is she really?..."',
        '「她怎麼會織出這樣的奇蹟?她到底是誰?……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch17-5: The urge to peek grows (B1 物理懸念 — 他會偷看嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch17-l5', chapter: 17, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'crane-gratitude',
    storyBeat: '偷看的衝動越來越強 — 他會偷看嗎?',
    questions: [
      vocabIntro('kt-ch17-l5-q1', [
        ['第二', 'second'],
        ['富有', 'rich'],
        ['好奇心', 'curiosity'],
        ['偷看', 'peek'],
      ]),
      // Q2 BEAT A — second and third cloth
      nar('kt-ch17-l5-q2',
        'The young woman wove a second cloth, then a third.',
        '女孩織了第二塊布,然後第三塊。'),
      // Q3 mc paraphrase about each cloth
      mc('kt-ch17-l5-q3',
        'Each cloth shone brighter than the one before.',
        'How were the new cloths?',
        ['darker each time', 'brighter each time', 'smaller each time', 'rougher each time'],
        ['一次比一次暗', '一次比一次亮', '一次比一次小', '一次比一次粗'],
        1,
        '推理: brighter than before → 一次比一次亮。'),
      // Q4 BEAT B — old man grows rich
      nar('kt-ch17-l5-q4',
        'The old man\'s house was full of bags of gold.',
        '老人的家裡擺滿了一袋袋的金子。'),
      // Q5 TF inference (contrast — rich but uneasy)
      tf('kt-ch17-l5-q5',
        'He had many bags of gold. But his heart felt heavy.',
        '他有很多金子。但他的心覺得沉重。',
        'Was the gold enough to make him happy?', 'N',
        '推理: 金子很多 但心沉重 → 不夠快樂 → 答 No'),
      // Q6 BEAT C — sits by the door
      nar('kt-ch17-l5-q6',
        'Every night, he sat by the door of the back room.',
        '每天晚上,他坐在後面房間的門邊。'),
      // Q7 emoji — what strange sound did he hear
      emoji('kt-ch17-l5-q7',
        'What strange sound did he hear?',
        'What sound did he hear?',
        ['🪶 feathers brushing wood', '🎻 violin music', '👶 a baby crying', '🐕 a dog barking'],
        ['羽毛擦過木頭', '小提琴音樂', '嬰兒在哭', '狗在叫'],
        0,
        'feathers brushing wood = 羽毛擦過木頭。'),
      // Q8 BEAT D — the urge
      nar('kt-ch17-l5-q8',
        'His curiosity grew bigger and bigger every night.',
        '他的好奇心一晚比一晚大。'),
      // Q9 mc paraphrase about the inner voice
      mc('kt-ch17-l5-q9',
        '"Just one peek. She will never know," he thought.',
        'What was the old man telling himself?',
        ['I must keep the promise', 'A small look will be safe', 'I should leave the house', 'She is just an ordinary girl'],
        ['我要守承諾', '看一下不會怎樣', '我該離開家', '她只是普通女孩'],
        1,
        '推理: just one peek + never know → 看一下不會怎樣。'),
      // Q10 BEAT — hand on the door
      nar('kt-ch17-l5-q10',
        'His hand moved slowly toward the door of the room.',
        '他的手慢慢的伸向房間的門。'),
      // Q11 HOOK — B1 物理懸念 (will he peek?)
      nar('kt-ch17-l5-q11',
        '"Just one small peek," he thinks. "She will never know..."',
        '「只看一下下,」他想。「她不會知道……」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch17-6: He sees the crane pulling feathers (B2 情緒翻轉 — 她會留下嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch17-l6', chapter: 17, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'crane-gratitude',
    storyBeat: '看到鶴在拔自己的羽毛織布 — 她會留下嗎?',
    questions: [
      vocabIntro('kt-ch17-l6-q1', [
        ['半夜', 'midnight'],
        ['踮腳', 'tiptoe'],
        ['羽毛', 'feather'],
        ['對到眼', 'eyes meet'],
      ]),
      // Q2 BEAT A — cold midnight
      nar('kt-ch17-l6-q2',
        'One cold midnight, the old man could not wait.',
        '一個寒冷的半夜,老人忍不住了。'),
      // Q3 TF inference (action — tiptoe = quiet sneak)
      tf('kt-ch17-l6-q3',
        'He tiptoed very softly to the door of the small room.',
        '他輕輕的踮著腳走到小房間的門口。',
        'Was the old man being quiet on purpose?', 'Y',
        '推理: 踮腳 + 輕輕 → 故意安靜 → 答 Yes'),
      // Q4 BEAT B — slides the door
      nar('kt-ch17-l6-q4',
        'He slid the door open, just a little bit.',
        '他把門推開,只一點點。'),
      // Q5 mc paraphrase about what he saw (X3 fix: paraphrase, not verbatim)
      mc('kt-ch17-l6-q5',
        'There was no young woman. There was a white crane.',
        'Who was at the loom?',
        ['the young woman', 'a tall white bird', 'an old hunter', 'no one at all'],
        ['女孩', '一隻高高的白色大鳥', '老獵人', '空無一人'],
        1,
        '推理: white crane = white bird → 一隻高高的白色大鳥 (paraphrase)。'),
      // Q6 BEAT C — pulling feathers
      nar('kt-ch17-l6-q6',
        'She was pulling her own feathers, one by one.',
        '她正在一根一根的拔自己的羽毛。'),
      // Q7 emoji — what she did with the feathers
      emoji('kt-ch17-l6-q7',
        'What did the crane do with her feathers?',
        'What did she do with them?',
        ['🧵 wove them into the cloth', '🔥 burned them in fire', '🍲 dropped them in soup', '📦 put them in a box'],
        ['織進布裡', '燒掉', '丟進湯裡', '放進盒子'],
        0,
        'wove them into the cloth = 織進布裡。'),
      // Q8 BEAT D — her body
      nar('kt-ch17-l6-q8',
        'Her body was thin and bare. She looked very tired.',
        '她的身體又瘦又光禿。她看起來很累。'),
      // Q9 mc paraphrase about old man's feeling
      mc('kt-ch17-l6-q9',
        'The old man\'s heart broke. He could not move.',
        'How did the old man feel?',
        ['proud of her', 'shocked and very sad', 'angry and loud', 'sleepy and bored'],
        ['以她為榮', '震驚又很難過', '生氣大叫', '想睡又無聊'],
        1,
        '推理: heart broke + 不能動 → 震驚又很難過。'),
      // Q10 BEAT — the crane turns her head
      nar('kt-ch17-l6-q10',
        'The crane turned her head. Their eyes met in silence.',
        '鶴轉過頭。他們安靜的對到眼。'),
      // Q11 HOOK — B2 情緒翻轉 (will she stay?)
      nar('kt-ch17-l6-q11',
        'Their eyes meet in silence. Will she still stay?...',
        '他們安靜的對到眼。她還會留下嗎?……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch17-7: The crane flies away (B6 open — 學到什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch17-l7', chapter: 17, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'crane-gratitude',
    storyBeat: '鶴飛走的天空 — 學到什麼?',
    questions: [
      vocabIntro('kt-ch17-l7-q1', [
        ['眼淚', 'tear'],
        ['鞠躬', 'bow'],
        ['翅膀', 'wing'],
        ['天空', 'sky'],
      ]),
      // Q2 BEAT A — next morning
      nar('kt-ch17-l7-q2',
        'The next morning, the young woman stood at the door.',
        '第二天早上,女孩站在門口。'),
      // Q3 mc paraphrase about her eyes
      mc('kt-ch17-l7-q3',
        'Tears shone quietly in her soft, dark eyes.',
        'How did the young woman look?',
        ['angry and shouting', 'sad with tears', 'happy and bright', 'bored and tired'],
        ['生氣大叫', '難過流淚', '快樂明亮', '無聊又累'],
        1,
        '推理: tears + soft eyes → 難過流淚。'),
      // Q4 BEAT B — she explains
      nar('kt-ch17-l7-q4',
        '"I was the crane you saved in the snow," she said.',
        '「我就是你在雪裡救的那隻鶴,」她說。'),
      // Q5 TF inference (action — promise broken = must leave)
      tf('kt-ch17-l7-q5',
        '"But now you have seen me. I cannot stay."',
        '「但你已經看到我了。我不能留下。」',
        'Will the young woman stay with him?', 'N',
        '推理: cannot stay → 不能留 → 答 No'),
      // Q6 BEAT C — she bows
      nar('kt-ch17-l7-q6',
        'She bowed deeply. She walked slowly to the door.',
        '她深深的鞠躬。她慢慢的走向門口。'),
      // Q7 emoji — what happened as she stepped outside
      emoji('kt-ch17-l7-q7',
        'What happened when she stepped outside?',
        'What happened outside?',
        ['🕊️ she became a white crane', '🌧️ it started to rain', '🌳 a tree fell down', '🐱 a cat ran by'],
        ['她變成白鶴', '開始下雨', '樹倒下', '貓跑過'],
        0,
        '走出去 → 變成白鶴 (magic transform A2 OK)。'),
      // Q8 BEAT D — wings spread
      nar('kt-ch17-l7-q8',
        'She spread her big white wings in the cold air.',
        '她在冷空氣中展開大大的白翅膀。'),
      // Q9 mc paraphrase about flying away (no death!)
      mc('kt-ch17-l7-q9',
        'She flew up, up, up into the morning sky.',
        'Where did the crane go?',
        ['into the warm house', 'far up into the sky', 'down into the snow', 'into the dark forest'],
        ['進溫暖的家', '飛上高高的天空', '掉到雪裡', '進黑森林'],
        1,
        '推理: flew up + into sky → 飛上高高的天空 (非「死」, flew away)。'),
      // Q10 BEAT — old man holds the cloth
      nar('kt-ch17-l7-q10',
        'The old man held the soft white cloth close to his heart.',
        '老人把柔軟的白布緊緊抱在胸口。'),
      // Q11 HOOK — B6 open (what did he learn?)
      nar('kt-ch17-l7-q11',
        'The sky is empty. But what did we learn from her?...',
        '天空空了。但我們從她身上學到了什麼?……'),
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
