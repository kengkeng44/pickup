#!/usr/bin/env node
/**
 * v2.0.B.264+ — Ch16 一寸法師 (Issun-bōshi, Japanese folk public domain).
 *
 * URL pipeline ship via tools/pickup-new-story.cjs B.234 pattern.
 * Source canon: docs/canon/issun-boshi.md (7-beat arc).
 * Cuts: docs/canon/issun-boshi-cuts.md (B6/B3/B4/B6/B1/B2/B6-open).
 *
 * Pairing: Ch16 一寸法師 (Japanese) <=> Ch1 桃太郎 (Japanese) <=> Ch14 浦島太郎 (Japanese)
 *   = 三個日本民間口傳, 公有領域. Ch1 energy + bravery, Ch14 quiet + bittersweet wisdom,
 *   Ch16 tiny + brave (size doesn't matter). 日本民間三部曲 complete.
 *
 * Public domain compliance:
 *   - Source: Japanese oral folklore (room-machi 室町時代 origin, 御伽草子 13-16c).
 *   - A2 自創句式, do NOT quote any specific translation / picture-book version.
 *   - 主角名: 'Issun-bōshi' (公有領域, first intro L2 only; after = 'Issun' / 'the tiny boy')
 *   - 公主名: 'the princess' (no given name)
 *   - 鬼 = 'demon' (A2 friendly; NOT 'oni' romanized)
 *
 * Structure per lesson (11 Q, mirror Ch1/Ch8/Ch9/Ch14 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  narration / listen-tf / listen-mc inference
 *   q4  listen-tf inference / listen-mc paraphrase / narration
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
 *   R3 A2 vocab only (no dwarf/vanquished/banished/gallant)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cultural / no-violence rules (per docs/canon/issun-boshi.md + user prompt):
 *   - 'tiny boy' OK / NOT 'dwarf'
 *   - 'big enough now' / 'they became family' / 'start a home' / NOT 'married'
 *   - 鬼 = 'demon' (NOT 'oni', NOT 'devil')
 *   - 不血腥, 鬼 'gave up and ran away' (not killed, not hurt seriously)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch16.json');

// ─── Helpers (mirror Ch14 範本, tag swap to ch16) ─────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch16', 'issun-boshi'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch16', 'issun-boshi', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch16', 'issun-boshi'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch16', 'issun-boshi', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch16', 'issun-boshi', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch16-1: Old couple prays for a child (B6 預言種子 — 會生出什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch16-l1', chapter: 16, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'issun-boshi',
    storyBeat: '老夫婦求子 — 會生出什麼?',
    questions: [
      vocabIntro('kt-ch16-l1-q1', [
        ['老人', 'old man'],
        ['老婦', 'old woman'],
        ['田', 'rice field'],
        ['祈求', 'pray'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch16-l1-q2',
        'Long ago, an old man and old woman lived by a rice field.',
        '很久以前,一個老人和一個老婦住在田邊。'),
      // Q3 BEAT A deepen
      nar('kt-ch16-l1-q3',
        'They had no children. Their house was quiet.',
        '他們沒有小孩。他們的家很安靜。'),
      // Q4 TF inference (atmosphere — quiet + no kids = lonely)
      tf('kt-ch16-l1-q4',
        'Every night they sat by the window and looked out.',
        '每個晚上,他們坐在窗邊往外看。',
        'Did the old couple feel lonely?', 'Y',
        '推理: 沒小孩 + 安靜 + 每晚望著外面 → 孤單 → 答 Yes'),
      // Q5 BEAT B — they pray
      nar('kt-ch16-l1-q5',
        'Every night they prayed for a child.',
        '每個晚上,他們祈求一個小孩。'),
      // Q6 listen-mc paraphrase about their wish (X3 anti-verbatim)
      mc('kt-ch16-l1-q6',
        '"Please, please give us a child," they said softly.',
        'What did the old couple ask for?',
        ['a big house', 'a small child of their own', 'gold coins', 'a fast horse'],
        ['大房子', '一個自己的小孩', '金幣', '快馬'],
        1,
        '推理: 祈求 child → 一個自己的小孩 (paraphrase)。'),
      // Q7 BEAT C — they say even tiny is ok
      nar('kt-ch16-l1-q7',
        '"Even a tiny one will do," they said.',
        '「就算很小的也好,」他們說。'),
      // Q8 listen-mc paraphrase about morning surprise
      mc('kt-ch16-l1-q8',
        'One spring morning, the old woman heard a small cry.',
        'What surprised the old woman?',
        ['a knock at the door', 'a small voice crying', 'birds outside', 'rain on the roof'],
        ['敲門聲', '小小的哭聲', '外面鳥叫', '雨打屋頂'],
        1,
        '推理: heard a small cry → 聽到小小的哭聲 (paraphrase)。'),
      // Q9 BEAT D — the tiny baby
      nar('kt-ch16-l1-q9',
        'There, in her hand, sat a tiny baby.',
        '在她的手心裡,坐著一個小小的寶寶。'),
      // Q10 emoji — how big was the baby
      emoji('kt-ch16-l1-q10',
        'How big was the baby?',
        'How big was the baby?',
        ['👍 only as tall as a thumb', '👶 like a normal baby', '🐘 huge and heavy', '🍼 just a little smaller'],
        ['只有拇指那麼高', '像普通寶寶', '又大又重', '只小一點點'],
        0,
        'tiny baby + in her hand → 拇指那麼高。'),
      // Q11 HOOK — B6 預言種子 (what kind of child will he be?)
      nar('kt-ch16-l1-q11',
        'The old couple smile and cry with joy. What kind of child will he be?',
        '老夫婦又笑又哭,好開心。這小孩會變成怎樣呢?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch16-2: Thumb boy grows clever (B3 資訊缺口 — 他能做什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch16-l2', chapter: 16, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'issun-boshi',
    storyBeat: '拇指大小的男孩 — 他能做什麼?',
    questions: [
      vocabIntro('kt-ch16-l2-q1', [
        ['名字', 'name'],
        ['意思', 'mean'],
        ['聰明', 'clever'],
        ['勇敢', 'brave'],
      ]),
      // Q2 BEAT A — name
      nar('kt-ch16-l2-q2',
        'They named him Issun-bōshi.',
        '他們給他取名叫一寸法師。'),
      // Q3 mc paraphrase about name meaning
      mc('kt-ch16-l2-q3',
        'His name meant "tiny boy" in old words.',
        'What did his name mean?',
        ['big hero', 'small boy', 'kind father', 'old friend'],
        ['大英雄', '小男孩', '好爸爸', '老朋友'],
        1,
        '推理: tiny boy → 小男孩 (A2 paraphrase)。'),
      // Q4 BEAT B — years went by
      nar('kt-ch16-l2-q4',
        'Years went by. He stayed thumb-sized.',
        '很多年過去了。他還是拇指那麼大。'),
      // Q5 TF inference (action — he helps at home = useful)
      tf('kt-ch16-l2-q5',
        'He helped at home. He made his mother laugh.',
        '他幫忙做家事。他逗媽媽笑。',
        'Was Issun useless because he was so small?', 'N',
        '推理: 幫忙 + 逗媽媽笑 → 有用 → 答 No'),
      // Q6 BEAT C — he is clever and brave
      nar('kt-ch16-l2-q6',
        'He was clever and brave, with a big heart.',
        '他很聰明,也很勇敢,有一顆大大的心。'),
      // Q7 emoji — what is Issun like
      emoji('kt-ch16-l2-q7',
        'What was Issun like inside?',
        'What was he like inside?',
        ['💛 brave with a big heart', '😴 sleepy and lazy', '😠 angry and rude', '😢 sad all the time'],
        ['勇敢又有大大的心', '又困又懶', '生氣又沒禮貌', '一直難過'],
        0,
        'clever + brave + big heart → 勇敢又有大大的心。'),
      // Q8 BEAT D — he wants to see Kyoto
      nar('kt-ch16-l2-q8',
        'One day, Issun said, "I want to see Kyoto."',
        '有一天,一寸說:「我想去看京都。」'),
      // Q9 mc — paraphrase about parents' feeling
      mc('kt-ch16-l2-q9',
        'His parents looked at each other and felt a little worried.',
        'How did his parents feel?',
        ['proud only', 'a bit worried', 'angry at him', 'very sleepy'],
        ['只有驕傲', '有一點擔心', '對他生氣', '很想睡'],
        1,
        '推理: looked at each other + worried → 有一點擔心。'),
      // Q10 BEAT — they nod
      nar('kt-ch16-l2-q10',
        'But they nodded slowly. They believed in him.',
        '但他們慢慢點頭。他們相信他。'),
      // Q11 HOOK — B3 資訊缺口 (what can a tiny boy do?)
      nar('kt-ch16-l2-q11',
        'Issun is tiny but clever. What can a tiny boy do out there?',
        '一寸又小又聰明。一個拇指大的男孩在外面能做什麼呢?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch16-3: Rice bowl boat, off to Kyoto (B4 期待加速 — 路上遇誰?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch16-l3', chapter: 16, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'issun-boshi',
    storyBeat: '一寸帶碗船出發 — 路上會遇誰?',
    questions: [
      vocabIntro('kt-ch16-l3-q1', [
        ['縫衣針', 'needle'],
        ['劍', 'sword'],
        ['碗', 'bowl'],
        ['筷子', 'chopstick'],
      ]),
      // Q2 BEAT A — mother gives him needle
      nar('kt-ch16-l3-q2',
        'His mother gave him a sewing needle for a sword.',
        '媽媽給他一根縫衣針當作劍。'),
      // Q3 mc paraphrase about why a needle
      mc('kt-ch16-l3-q3',
        'For a thumb-sized boy, a needle was just the right size.',
        'Why use a needle as his sword?',
        ['too heavy to lift', 'fits a tiny hand', 'made of shiny gold', 'a gift from grandfather'],
        ['太重舉不起', '剛好適合小手', '金子做的', '爺爺給的'],
        1,
        '推理: thumb-sized + just right size → 剛好適合小手。'),
      // Q4 BEAT B — father gives him a rice bowl
      nar('kt-ch16-l3-q4',
        'His father gave him a rice bowl for a boat.',
        '爸爸給他一個飯碗當作船。'),
      // Q5 TF inference (action — rice bowl on water = float)
      tf('kt-ch16-l3-q5',
        'He used a chopstick as an oar. He pushed off.',
        '他用一根筷子當槳。他把碗推離岸邊。',
        'Did Issun set off down the river?', 'Y',
        '推理: pushed off + chopstick oar → 出發 → 答 Yes'),
      // Q6 BEAT C — water carries him far
      nar('kt-ch16-l3-q6',
        'The water carried him far from home.',
        '水把他帶得離家很遠。'),
      // Q7 emoji — what did he wave at
      emoji('kt-ch16-l3-q7',
        'Who did Issun wave goodbye to?',
        'Who did he wave at?',
        ['👨‍🦳👵 his parents on the bank', '🐟 the fish in the river', '☁️ the clouds above', '🏯 a tall castle'],
        ['岸上的爸爸媽媽', '河裡的魚', '上面的雲', '高高的城堡'],
        0,
        'waved goodbye + on the bank → 岸上的爸爸媽媽。'),
      // Q8 BEAT D — sky big, river wide
      nar('kt-ch16-l3-q8',
        'The sky was big. The river was very wide.',
        '天很大。河很寬。'),
      // Q9 mc — paraphrase about how he sat
      mc('kt-ch16-l3-q9',
        'Issun was very small, but he sat up tall and brave.',
        'How did Issun sit in the boat?',
        ['curled up small', 'tall and proud', 'asleep already', 'crying quietly'],
        ['縮成一團', '又挺又驕傲', '已經睡著', '安靜哭'],
        1,
        '推理: sat tall + brave → 又挺又驕傲。'),
      // Q10 BEAT — many days pass
      nar('kt-ch16-l3-q10',
        'Day after day, the bowl floated on.',
        '一天又一天,小碗一直漂著。'),
      // Q11 HOOK — B4 期待加速 (who will he meet?)
      nar('kt-ch16-l3-q11',
        'A tiny boy in a rice bowl, going to the big city. Who will he meet on the way?',
        '一個小男孩坐在飯碗裡,要去大城市。路上他會遇到誰呢?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch16-4: Guard in Kyoto, princess walks out (B6 預言種子 — 前面有什麼?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch16-l4', chapter: 16, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'issun-boshi',
    storyBeat: '京都當侍衛 — 公主出去散步',
    questions: [
      vocabIntro('kt-ch16-l4-q1', [
        ['城市', 'city'],
        ['鞠躬', 'bow'],
        ['公主', 'princess'],
        ['寺廟', 'temple'],
      ]),
      // Q2 BEAT A — he reaches Kyoto
      nar('kt-ch16-l4-q2',
        'After many days, Issun reached the great city.',
        '許多天之後,一寸到了大城市。'),
      // Q3 mc paraphrase about city
      mc('kt-ch16-l4-q3',
        'The houses were tall. The streets were full of people.',
        'How was the city different from home?',
        ['empty and silent', 'big and busy', 'cold and dark', 'small like a farm'],
        ['空又靜', '又大又熱鬧', '冷又暗', '小像農場'],
        1,
        '推理: tall houses + full of people → 又大又熱鬧。'),
      // Q4 BEAT B — bowing to the lord
      nar('kt-ch16-l4-q4',
        'He walked to a lord\'s house and bowed low.',
        '他走到一位大人的家,深深鞠躬。'),
      // Q5 TF inference (action — he asks politely = wants to serve)
      tf('kt-ch16-l4-q5',
        '"Please let me serve you," he said in a clear voice.',
        '「請讓我為您做事,」他用清楚的聲音說。',
        'Did Issun ask to work for the lord?', 'Y',
        '推理: please let me serve → 想做事 → 答 Yes'),
      // Q6 BEAT C — lord laughs and says yes
      nar('kt-ch16-l4-q6',
        'The lord laughed kindly and said yes.',
        '大人笑了笑,說好。'),
      // Q7 emoji — what job did he get
      emoji('kt-ch16-l4-q7',
        'What job did Issun get?',
        'What job did he get?',
        ['👮 guard for the princess', '🍚 cook in the kitchen', '🌱 farmer in the field', '🐎 horse rider'],
        ['公主的侍衛', '廚房的廚師', '田裡的農夫', '騎馬的人'],
        0,
        'serve + lord\'s daughter → 公主的侍衛。'),
      // Q8 BEAT D — princess walks out
      nar('kt-ch16-l4-q8',
        'One bright day, the princess walked out to the temple.',
        '一個晴朗的日子,公主走出去要到寺廟。'),
      // Q9 mc — paraphrase about where Issun stood
      mc('kt-ch16-l4-q9',
        'Issun stood up on the princess and watched the road.',
        'Where did Issun stand?',
        ['inside her sleeve', 'next to her ear', 'in his rice bowl', 'far behind her'],
        ['袖子裡', '耳朵旁邊', '飯碗裡', '遠遠跟在後面'],
        1,
        '推理: stood up + watched the road → 耳朵旁邊 (paraphrase)。'),
      // Q10 BEAT — path leads through wood
      nar('kt-ch16-l4-q10',
        'The path led through a quiet wood.',
        '路穿過一片安靜的樹林。'),
      // Q11 HOOK — B6 預言種子 (quiet wood = foreshadow)
      nar('kt-ch16-l4-q11',
        'The wood is too quiet. Something is hiding in the trees...',
        '樹林安靜得不太對勁。樹後面有東西躲著……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch16-5: Demon appears (B1 物理懸念 — 他能擋住嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch16-l5', chapter: 16, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'issun-boshi',
    storyBeat: '鬼來抓公主 — 他能擋住嗎?',
    questions: [
      vocabIntro('kt-ch16-l5-q1', [
        ['鬼', 'demon'],
        ['角', 'horn'],
        ['尖', 'sharp'],
        ['害怕', 'scared'],
      ]),
      // Q2 BEAT A — demon jumps out
      nar('kt-ch16-l5-q2',
        'Suddenly, a big red demon jumped from the trees.',
        '突然,一個大紅鬼從樹林裡跳出來。'),
      // Q3 mc paraphrase about demon's look
      mc('kt-ch16-l5-q3',
        'He had two horns and sharp teeth.',
        'How did the demon look?',
        ['soft and friendly', 'scary and strong', 'small and silly', 'tired and sad'],
        ['軟又友善', '可怕又強壯', '小又笨', '累又難過'],
        1,
        '推理: horns + sharp teeth → 可怕又強壯。'),
      // Q4 BEAT B — demon wants princess
      nar('kt-ch16-l5-q4',
        '"I will take the princess," the demon laughed.',
        '「我要把公主抓走,」鬼大笑。'),
      // Q5 TF inference (action — princess held still = afraid)
      tf('kt-ch16-l5-q5',
        'The princess held still and could not move.',
        '公主僵在原地,動不了。',
        'Was the princess very scared?', 'Y',
        '推理: held still + could not move → 很害怕 → 答 Yes'),
      // Q6 BEAT C — Issun jumps down
      nar('kt-ch16-l5-q6',
        'Issun jumped down to the ground.',
        '一寸跳到地上。'),
      // Q7 emoji — what did he pull out
      emoji('kt-ch16-l5-q7',
        'What did Issun pull out?',
        'What did he pull out?',
        ['🪡 his needle sword', '🍣 some lunch', '📜 a long letter', '🪙 some coins'],
        ['他的縫衣針劍', '一些午餐', '長長的信', '一些錢幣'],
        0,
        'pulled out his sewing-needle sword → 縫衣針劍。'),
      // Q8 BEAT D — Issun shouts stop
      nar('kt-ch16-l5-q8',
        '"Stop!" he shouted in his small but brave voice.',
        '「住手!」他用小小但勇敢的聲音喊。'),
      // Q9 mc — paraphrase about demon's reaction
      mc('kt-ch16-l5-q9',
        'The demon looked down and laughed even louder.',
        'How did the demon react to Issun?',
        ['ran away fast', 'thought he was no threat', 'gave him a gift', 'cried softly'],
        ['快跑掉', '覺得他不是威脅', '送他禮物', '輕輕哭'],
        1,
        '推理: looked down + laughed louder → 覺得他不是威脅。'),
      // Q10 BEAT — demon picks him up
      nar('kt-ch16-l5-q10',
        'The big demon reached down with one huge hand.',
        '大鬼用一隻大手伸下來。'),
      // Q11 HOOK — B1 物理懸念 (can a thumb boy stop a demon?)
      nar('kt-ch16-l5-q11',
        'A tiny boy stands between the demon and the princess. Can he stop him?',
        '一個拇指大的男孩站在鬼跟公主中間。他擋得住嗎?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch16-6: Inside the demon, demon runs (B2 情緒翻轉 — 鬼會怎樣?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch16-l6', chapter: 16, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'issun-boshi',
    storyBeat: '一寸跳進鬼嘴用針刺 — 鬼會怎樣?',
    questions: [
      vocabIntro('kt-ch16-l6-q1', [
        ['吞', 'swallow'],
        ['黑暗', 'dark'],
        ['刺', 'poke'],
        ['吼叫', 'roar'],
      ]),
      // Q2 BEAT A — demon swallows him
      nar('kt-ch16-l6-q2',
        'The demon picked up Issun and swallowed him whole.',
        '鬼把一寸抓起來,整個吞了下去。'),
      // Q3 mc paraphrase about inside
      mc('kt-ch16-l6-q3',
        'Inside the demon, it was very dark.',
        'What was it like inside the demon?',
        ['bright and warm', 'dark all around', 'cold and snowy', 'full of food'],
        ['亮又暖', '四周都暗', '冷又下雪', '滿是吃的'],
        1,
        '推理: very dark → 四周都暗。'),
      // Q4 BEAT B — Issun is not scared
      nar('kt-ch16-l6-q4',
        'But Issun was not scared. He held up his needle.',
        '可是一寸不害怕。他舉起他的針。'),
      // Q5 TF inference (action — he pokes = fighting back)
      tf('kt-ch16-l6-q5',
        'He poked and poked the demon\'s tummy.',
        '他一直刺、一直刺鬼的肚子。',
        'Did Issun fight back from inside?', 'Y',
        '推理: 一直刺鬼肚子 → 在反擊 → 答 Yes'),
      // Q6 BEAT C — demon roars
      nar('kt-ch16-l6-q6',
        'The demon roared and hopped from foot to foot.',
        '鬼大吼,一隻腳跳到另一隻腳。'),
      // Q7 emoji — what did the demon do
      emoji('kt-ch16-l6-q7',
        'How did the demon feel from inside?',
        'How did the demon feel?',
        ['😣 hurting and yelling', '😴 sleepy and slow', '😊 happy and full', '🤔 thinking calmly'],
        ['痛又大叫', '想睡又慢', '開心又飽', '冷靜思考'],
        0,
        'roar + hop foot to foot → 痛又大叫。'),
      // Q8 BEAT D — princess covers mouth
      nar('kt-ch16-l6-q8',
        'The princess covered her mouth in surprise.',
        '公主嚇得用手摀住嘴。'),
      // Q9 mc — paraphrase about demon spitting Issun out
      mc('kt-ch16-l6-q9',
        'At last, the demon spit Issun out on the ground.',
        'What did the demon finally do?',
        ['ate him for good', 'let him back out', 'turned to stone', 'fell asleep'],
        ['真的吃掉他', '把他放出來', '變成石頭', '睡著'],
        1,
        '推理: spit Issun out → 把他放出來 (paraphrase)。'),
      // Q10 BEAT — demon runs away
      nar('kt-ch16-l6-q10',
        'The demon gave up and ran away into the wood.',
        '鬼放棄了,跑進樹林裡。'),
      // Q11 HOOK — B2 情緒翻轉 (demon dropped something — what?)
      nar('kt-ch16-l6-q11',
        'The demon drops a small wooden mallet behind him. What can it do?',
        '鬼留下一個小小的木槌。這個木槌會做什麼呢?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch16-7: Mallet grows him, becomes family (B6 open 開放後鉤 — 成家那刻)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch16-l7', chapter: 16, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'issun-boshi',
    storyBeat: '打鼓變大人娶公主 — 變大那刻',
    questions: [
      vocabIntro('kt-ch16-l7-q1', [
        ['幸運', 'lucky'],
        ['木槌', 'mallet'],
        ['敲', 'tap'],
        ['長大', 'grow'],
      ]),
      // Q2 BEAT A — princess picks up mallet
      nar('kt-ch16-l7-q2',
        'The princess picked up the small wooden mallet.',
        '公主拿起那個小木槌。'),
      // Q3 mc paraphrase about magic
      mc('kt-ch16-l7-q3',
        '"This is a lucky mallet. It can grant a wish."',
        'What kind of mallet was it?',
        ['just a normal toy', 'a magic wish mallet', 'a heavy work tool', 'a sweet candy stick'],
        ['只是普通玩具', '能實現願望的魔法槌', '很重的工具', '甜甜的糖果棒'],
        1,
        '推理: grant a wish → 能實現願望的魔法槌。'),
      // Q4 BEAT B — she taps for Issun
      nar('kt-ch16-l7-q4',
        'She tapped the mallet once, just for Issun.',
        '她敲了一下槌子,就為一寸。'),
      // Q5 TF inference (action — each tap grows him)
      tf('kt-ch16-l7-q5',
        'With each soft tap, Issun grew taller.',
        '每敲一下,一寸就長高一點。',
        'Did the mallet make Issun bigger?', 'Y',
        '推理: with each tap → grew taller → 變大 → 答 Yes'),
      // Q6 BEAT C — tap tap tap
      nar('kt-ch16-l7-q6',
        'Tap. Tap. Tap.',
        '敲。敲。敲。'),
      // Q7 emoji — what happened to Issun
      emoji('kt-ch16-l7-q7',
        'What happened to Issun?',
        'What happened to him?',
        ['📏 he grew taller and taller', '💤 he fell asleep', '🐦 he turned into a bird', '🪨 he turned to stone'],
        ['他越變越高', '他睡著了', '他變鳥', '他變石頭'],
        0,
        'tap tap tap + grew taller → 越變越高。'),
      // Q8 BEAT D — he stands tall
      nar('kt-ch16-l7-q8',
        'Soon he stood as tall as any young man.',
        '很快,他就跟一般年輕人一樣高。'),
      // Q9 mc — paraphrase about his hands
      mc('kt-ch16-l7-q9',
        'He looked at his own hands and smiled wide.',
        'How did Issun feel about his new size?',
        ['scared of it', 'happy and surprised', 'angry at the princess', 'sleepy from the change'],
        ['害怕', '開心又驚喜', '對公主生氣', '想睡'],
        1,
        '推理: looked at hands + smiled wide → 開心又驚喜。'),
      // Q10 BEAT — they walk back together
      nar('kt-ch16-l7-q10',
        'They walked back to the city, side by side.',
        '他們一起走回城市,肩並肩。'),
      // Q11 HOOK — B6 open 開放後鉤 (becoming family, big enough now — child-friendly framing)
      nar('kt-ch16-l7-q11',
        'Issun and the princess become family. He is big enough now to start a home...',
        '一寸和公主成為一家人。他現在夠大了,可以開始自己的家……'),
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
