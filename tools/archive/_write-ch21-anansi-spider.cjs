#!/usr/bin/env node
/**
 * v2.0.B.270+ — Ch21 Anansi the Spider (蜘蛛從天神拿回所有故事).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern
 * (mirror Ch15 Emperor's New Clothes ship B.262+).
 * Source canon: docs/canon/anansi-spider.md
 *   (Akan/Ashanti West African oral tradition, public domain worldwide).
 * Cuts: docs/canon/anansi-spider-cuts.md
 *   (B6/B5/B3/B4/B1/B2/B6-open).
 *
 * IP 鐵律:
 *   - Source: West African oral tradition (Akan/Ashanti people of Ghana).
 *     Folk / oral, no fixed author. Public domain worldwide.
 *   - A2 自創句式, 不引 Gerald McDermott 1972 picture book / Disney /
 *     任何特定譯本延伸段落.
 *   - 配 Ch19 Sang Kancil 同 trickster underdog genre (小聰明贏大力量).
 *
 * Structure per lesson (11 Q, mirror Ch15/Ch9/Ch3 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT setup)
 *   q3  listen-mc paraphrase (X3: paraphrase, not verbatim)
 *   q4  listen-tf inference (atmosphere / action / contrast)
 *   q5  narration (BEAT B)
 *   q6  listen-mc paraphrase
 *   q7  narration (BEAT C) / emoji-pick
 *   q8  listen-mc paraphrase / narration
 *   q9  narration (BEAT D) / listen-mc
 *   q10 emoji-pick / narration / listen-comprehension
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim)
 *   R3 A2 vocab only:
 *      'killed' → 'gave up and went home' / 'flew away'
 *      'cunning' → 'smart' / 'clever'
 *      'strangled' → 'tied him up'
 *      'trapped' (verb) → 'caught' / 'held safely'
 *      'python' / 'leopard' / 'hornet' OK at A2 with picture context
 *      'Nyame the Sky God' kept (proper noun anchor)
 *   R4 listen-tf inference (atmosphere / action / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 風險: 沒有血腥, 沒有動物被殺
 *   - 三個動物都 'gave up and went home' / 'caught safely'
 *   - 智取主題: 小蜘蛛用聰明打敗大動物
 *   - 起源神話: 解釋為什麼每個家都聽得到故事
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch21.json');

// ─── Helpers (mirror Ch15/Ch9/Ch3 範本) ───────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch21', 'anansi-spider'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch21', 'anansi-spider', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch21', 'anansi-spider'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch21', 'anansi-spider', 'gist'],
    subSkill: 'gist' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch21', 'anansi-spider', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch21', 'anansi-spider', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch21-1: A world with no stories + Anansi looks up (B6 預言種子)
  // Hook: 蜘蛛能拿回所有故事嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch21-l1', chapter: 21, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'anansi-spider',
    storyBeat: '世界上沒有故事 — 蜘蛛想去拿',
    questions: [
      vocabIntro('kt-ch21-l1-q1', [
        ['故事', 'story'],
        ['夜晚', 'night'],
        ['天空', 'sky'],
        ['蜘蛛', 'spider'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch21-l1-q2',
        'Long ago, there were no stories in the world.',
        '很久以前,世界上沒有故事。'),
      // Q3 mc paraphrase — what it felt like
      mc('kt-ch21-l1-q3',
        'People sat together at night, and no one had a tale to tell.',
        'What was night-time like for the people?',
        ['full of songs', 'very quiet and empty', 'loud and busy', 'full of bright lights'],
        ['充滿歌聲', '很安靜很空', '吵又忙', '燈火通明'],
        1,
        '推理: no tale to tell → 很安靜很空 (paraphrase)。'),
      // Q4 TF inference (contrast — owning means others lack)
      tf('kt-ch21-l1-q4',
        'All the stories belonged to Nyame, the Sky God.',
        '所有的故事都是天神 Nyame 的。',
        'Could people on the ground share any story?', 'N',
        '推理: 故事全屬天神 → 地上人沒得分 → 答 No'),
      // Q5 BEAT B — Anansi notices
      nar('kt-ch21-l1-q5',
        'A small spider named Anansi looked up at the sky.',
        '一隻名叫 Anansi 的小蜘蛛抬頭看著天空。'),
      // Q6 mc paraphrase — Anansi's size
      mc('kt-ch21-l1-q6',
        'Anansi was tiny, but his head was full of plans.',
        'What kind of spider was Anansi?',
        ['big and strong', 'small but with many ideas', 'old and slow', 'angry and loud'],
        ['又大又強壯', '小但點子多', '老又慢', '生氣又大聲'],
        1,
        '推理: tiny + head full of plans → 小但點子多 (paraphrase)。'),
      // Q7 BEAT C — Anansi's idea
      nar('kt-ch21-l1-q7',
        'He wanted everyone on the ground to have a story to share.',
        '他希望地上每個人都有故事可以分享。'),
      // Q8 mc paraphrase — Anansi's plan (X3-safe paraphrase)
      mc('kt-ch21-l1-q8',
        'So he made a long thin thread that went all the way up.',
        'What did Anansi make to reach the sky?',
        ['a wooden ladder', 'a tall silk rope', 'a bright kite', 'a small boat'],
        ['木梯', '高高的絲繩', '亮亮的風箏', '小船'],
        1,
        '推理: long thin thread → 高高的絲繩 (paraphrase, X3-safe)。'),
      // Q9 BEAT D — emperor calls them in
      nar('kt-ch21-l1-q9',
        'The thread shone in the moonlight like a silver road.',
        '那條線在月光下像一條銀色的路。'),
      // Q10 emoji — Anansi's feeling
      emoji('kt-ch21-l1-q10',
        'How did Anansi feel as he started his climb?',
        'How did Anansi feel?',
        ['😴 sleepy', '🔥 brave and ready', '😡 angry', '😱 too scared to move'],
        ['想睡', '勇敢準備好', '生氣', '怕到不能動'],
        1,
        '小蜘蛛主動爬上天 → 勇敢準備好。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch21-l1-q11',
        'Anansi put one foot on the silver thread and began to climb...',
        'Anansi 把一隻腳放上銀線,開始往上爬……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch21-2: Sky God names the price — three animals (B5 道德兩難)
  // Hook: 蜘蛛這麼小, 抓得到嗎? 該答應嗎?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch21-l2', chapter: 21, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'anansi-spider',
    storyBeat: '天神開價 — 抓三個動物',
    questions: [
      vocabIntro('kt-ch21-l2-q1', [
        ['天神', 'sky god'],
        ['買', 'buy'],
        ['價錢', 'price'],
        ['動物', 'animal'],
      ]),
      // Q2 BEAT A
      nar('kt-ch21-l2-q2',
        'Anansi went up the long thread and stood before Nyame.',
        'Anansi 順著長線爬上去,站在 Nyame 面前。'),
      // Q3 mc paraphrase — bow
      mc('kt-ch21-l2-q3',
        'He bent his small head low to greet the Sky God.',
        'How did Anansi greet Nyame?',
        ['with a loud shout', 'with a low bow', 'with a big hug', 'with no word at all'],
        ['大聲叫', '低頭鞠躬', '大擁抱', '完全沒說話'],
        1,
        '推理: bent small head low → 低頭鞠躬 (paraphrase)。'),
      // Q4 TF inference
      tf('kt-ch21-l2-q4',
        'Anansi spoke in a soft, polite voice to the Sky God.',
        'Anansi 用又輕又有禮貌的聲音對天神說。',
        'Did Anansi try to be respectful?', 'Y',
        '推理: soft polite voice → 想表現尊重 → 答 Yes'),
      // Q5 BEAT B — request
      nar('kt-ch21-l2-q5',
        '"I want to buy all your stories," Anansi said.',
        '「我想買下你所有的故事,」Anansi 說。'),
      // Q6 mc paraphrase — Nyame reaction (X3-safe paraphrase)
      mc('kt-ch21-l2-q6',
        'Nyame looked down and laughed at the small spider.',
        'What did Nyame do at first?',
        ['ran away fast', 'made fun of the tiny visitor', 'agreed right away', 'began to cry softly'],
        ['趕快跑走', '取笑這個小訪客', '馬上答應', '開始輕輕地哭'],
        1,
        '推理: looked down + laughed → 取笑這個小訪客 (paraphrase, X3-safe)。'),
      // Q7 BEAT C — the price
      nar('kt-ch21-l2-q7',
        '"The price is high," Nyame said. "Bring me three animals."',
        '「價錢很高,」Nyame 說。「給我帶三個動物來。」'),
      // Q8 mc paraphrase — animals listed
      mc('kt-ch21-l2-q8',
        'The list was a swarm of hornets, a long python, and a leopard.',
        'What was on the list?',
        ['three small birds', 'three strong animals', 'three sweet fruits', 'three quiet fish'],
        ['三隻小鳥', '三個強的動物', '三個甜水果', '三條安靜的魚'],
        1,
        '推理: hornets + python + leopard → 三個強的動物 (paraphrase)。'),
      // Q9 BEAT D — Anansi's reply
      nar('kt-ch21-l2-q9',
        '"I can do this," Anansi said. He did not even blink.',
        '「我可以辦到,」Anansi 說。他連眼睛都沒眨。'),
      // Q10 gist — what scene is about
      gist('kt-ch21-l2-q10',
        'The Sky God set the price, and the spider said yes right away.',
        'What is this scene mainly about?',
        ['a fight in the sky', 'a deal between a god and a spider', 'a song the spider sang', 'a big feast for animals'],
        ['天上打架', '天神和蜘蛛的交易', '蜘蛛唱的歌', '動物的大餐'],
        1,
        '主旨 = 天神和蜘蛛的交易。'),
      // Q11 HOOK — B5 道德兩難
      nar('kt-ch21-l2-q11',
        'Anansi climbed down to the ground and looked at the list in his hand...',
        'Anansi 爬回地上,看著手中的清單……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch21-3: Hornets in the pot (B3 資訊缺口)
  // Hook: 倒水? 他要做什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch21-l3', chapter: 21, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'anansi-spider',
    storyBeat: '抓蜂 — 用一片葉子和一個鍋',
    questions: [
      vocabIntro('kt-ch21-l3-q1', [
        ['蜜蜂 (Hornet)', 'hornet'],
        ['葉子', 'leaf'],
        ['屋頂', 'roof'],
        ['鍋', 'pot'],
      ]),
      // Q2 BEAT A
      nar('kt-ch21-l3-q2',
        'The first animal was a group of hornets in a big tree.',
        '第一個動物是住在大樹上的一群蜂。'),
      // Q3 mc paraphrase — sound
      mc('kt-ch21-l3-q3',
        'The tree was full of a loud, busy buzzing sound.',
        'What did the tree sound like?',
        ['very quiet', 'a noisy, busy hum', 'a soft song', 'a slow river'],
        ['很安靜', '吵又忙的嗡嗡聲', '輕柔的歌', '緩慢的河流'],
        1,
        '推理: loud busy buzzing → 吵又忙的嗡嗡聲 (paraphrase)。'),
      // Q4 TF inference (atmosphere — danger sense)
      tf('kt-ch21-l3-q4',
        'The other animals walked far around the tree, not close to it.',
        '其他動物都繞遠遠地走過,不靠近那棵樹。',
        'Was the hornet tree a safe place for most animals?', 'N',
        '推理: 大家繞遠走 → 不安全 → 答 No'),
      // Q5 BEAT B — Anansi's tool
      nar('kt-ch21-l3-q5',
        'Anansi cut a big leaf and held it over his head like a roof.',
        'Anansi 剪了一大片葉子,舉在頭上像屋頂。'),
      // Q6 mc paraphrase — what the leaf was for
      mc('kt-ch21-l3-q6',
        'Now he had a small green roof on top of his head.',
        'Why was the leaf over his head?',
        ['to look pretty', 'to keep something off his head', 'to feed the hornets', 'to make music'],
        ['好看', '擋住東西', '餵蜂', '製造音樂'],
        1,
        '推理: roof on top → 擋住東西 (paraphrase)。'),
      // Q7 BEAT C — pot of water
      nar('kt-ch21-l3-q7',
        'He filled a pot with water and poured some on the hornet tree.',
        '他裝滿一鍋水,把水倒在蜂的樹上。'),
      // Q8 mc paraphrase — hornets' confusion
      mc('kt-ch21-l3-q8',
        'The hornets thought a sudden rain had come too soon.',
        'What did the hornets think was happening?',
        ['a fire started', 'the rain was here', 'a king arrived', 'a song was playing'],
        ['火燒', '下雨來了', '國王來了', '在放音樂'],
        1,
        '推理: thought rain came → 下雨來了 (paraphrase)。'),
      // Q9 BEAT D — Anansi's call
      nar('kt-ch21-l3-q9',
        '"The rain is coming! Quick, get in my pot!" Anansi called.',
        '「下雨了!快進我的鍋!」Anansi 喊。'),
      // Q10 emoji — what the hornets did
      emoji('kt-ch21-l3-q10',
        'What did the hornets do when they heard him?',
        'What did the hornets do?',
        ['😴 fell asleep', '🏃 ran into the pot', '😡 fought him', '🌊 swam away'],
        ['睡著', '衝進鍋裡', '打他', '游走'],
        1,
        '怕雨 + 聽到喊 → 衝進鍋裡。'),
      // Q11 HOOK — B3 資訊缺口 → 結果
      nar('kt-ch21-l3-q11',
        'Anansi put a lid on the pot. The hornets had given up and gone inside...',
        'Anansi 把蓋子蓋上。蜂全都放棄,進到鍋裡了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch21-4: Python tied to a stick (B4 期待加速)
  // Hook: 大蛇會上當嗎? 智取怎麼贏?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch21-l4', chapter: 21, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'anansi-spider',
    storyBeat: '抓蛇 — 用一根樹枝和一個聰明話',
    questions: [
      vocabIntro('kt-ch21-l4-q1', [
        ['大蛇 (Python)', 'python'],
        ['樹枝', 'stick'],
        ['朋友', 'friend'],
        ['綁', 'tie'],
      ]),
      // Q2 BEAT A
      nar('kt-ch21-l4-q2',
        'The second animal was a long python in the river grass.',
        '第二個動物是河邊草叢裡的一條長蛇。'),
      // Q3 mc paraphrase — python's size
      mc('kt-ch21-l4-q3',
        'His body went on and on, like a green road in the grass.',
        'How was the python\'s body?',
        ['very short', 'very long like a road', 'round like a ball', 'flat like paper'],
        ['很短', '很長像一條路', '圓得像球', '扁得像紙'],
        1,
        '推理: on and on, like a road → 很長像一條路 (paraphrase)。'),
      // Q4 TF inference (atmosphere — pride)
      tf('kt-ch21-l4-q4',
        'The python often showed off his long body to the other animals.',
        '大蛇常向其他動物炫耀他的長身體。',
        'Was the python proud of how long he was?', 'Y',
        '推理: 常炫耀身長 → 很驕傲 → 答 Yes'),
      // Q5 BEAT B — Anansi's tool
      nar('kt-ch21-l4-q5',
        'Anansi found a strong stick and brought it to the python.',
        'Anansi 找了一根結實的樹枝,拿到大蛇面前。'),
      // Q6 mc paraphrase — words
      mc('kt-ch21-l4-q6',
        '"My friend says you are not really that long," Anansi said.',
        'What did Anansi tell the python?',
        ['that he was the king', 'that some friend doubted his length', 'that he could fly', 'that the river was dry'],
        ['他是國王', '有朋友懷疑他的長度', '他會飛', '河乾了'],
        1,
        '推理: friend says not that long → 朋友懷疑長度 (paraphrase)。'),
      // Q7 BEAT C — python's reaction
      nar('kt-ch21-l4-q7',
        'The python lifted his head. His eyes went sharp and bright.',
        '大蛇抬起頭。他的眼睛變得銳利又閃亮。'),
      // Q8 mc paraphrase — python's feeling
      mc('kt-ch21-l4-q8',
        'He wanted to show everyone how very long he really was.',
        'How did the python feel after hearing Anansi?',
        ['shy and quiet', 'set on showing off', 'sleepy and bored', 'sad and slow'],
        ['害羞安靜', '想要炫耀', '想睡無聊', '難過慢'],
        1,
        '推理: wanted to show how long → 想要炫耀 (paraphrase)。'),
      // Q9 BEAT D — python lies down
      nar('kt-ch21-l4-q9',
        'The python lay down by the stick to show his full length.',
        '大蛇躺在樹枝旁,要展現完整的長度。'),
      // Q10 emoji — what Anansi did next
      emoji('kt-ch21-l4-q10',
        'What did Anansi do while the python was lying still?',
        'What did Anansi do next?',
        ['🪢 tied him to the stick', '🏃 ran away', '🎵 sang a song', '🍞 made bread'],
        ['把他綁在樹枝上', '跑走', '唱歌', '做麵包'],
        0,
        '蛇躺好 + Anansi 有樹枝 → 把他綁在樹枝上。'),
      // Q11 HOOK — B4 期待加速 → 結果
      nar('kt-ch21-l4-q11',
        'The python tried to move, but the stick held him safely. Anansi smiled...',
        '大蛇想動,但樹枝把他穩穩固定住。Anansi 笑了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch21-5: Leopard in the hole (B1 物理懸念)
  // Hook: 豹會逃走嗎? 蜘蛛接下來怎麼辦?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch21-l5', chapter: 21, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'anansi-spider',
    storyBeat: '抓豹 — 挖一個洞,等夜晚',
    questions: [
      vocabIntro('kt-ch21-l5-q1', [
        ['豹 (Leopard)', 'leopard'],
        ['挖', 'dig'],
        ['洞', 'hole'],
        ['繩子', 'rope'],
      ]),
      // Q2 BEAT A
      nar('kt-ch21-l5-q2',
        'The third animal was a leopard with sharp, bright eyes.',
        '第三個動物是一隻眼睛銳利明亮的豹。'),
      // Q3 mc paraphrase — leopard danger
      mc('kt-ch21-l5-q3',
        'No animal in the forest dared to walk near his rest tree.',
        'Was the leopard easy to catch?',
        ['yes, very easy', 'no, every animal kept far', 'yes, he loved hugs', 'no, he was too small'],
        ['是,很容易', '不,大家都離很遠', '是,他愛抱抱', '不,他太小'],
        1,
        '推理: no animal dared near → 大家都離很遠 (paraphrase)。'),
      // Q4 TF inference (action — Anansi observes)
      tf('kt-ch21-l5-q4',
        'For two days, Anansi watched which path the leopard used at night.',
        'Anansi 觀察了兩天,看豹晚上走哪條路。',
        'Did Anansi plan his trap with care?', 'Y',
        '推理: 觀察兩天 → 仔細計畫 → 答 Yes'),
      // Q5 BEAT B — digging
      nar('kt-ch21-l5-q5',
        'Anansi dug a deep hole on the path the leopard liked.',
        'Anansi 在豹喜歡走的路上挖了一個深洞。'),
      // Q6 mc paraphrase — cover
      mc('kt-ch21-l5-q6',
        'He covered the hole with leaves so no one could see it.',
        'Why did Anansi put leaves on top?',
        ['to make it pretty', 'to hide the hole from view', 'to feed the leopard', 'to warm his feet'],
        ['好看', '讓人看不到洞', '餵豹', '暖腳'],
        1,
        '推理: cover so no one sees → 讓人看不到 (paraphrase)。'),
      // Q7 BEAT C — night
      nar('kt-ch21-l5-q7',
        'That night the leopard walked the path with quiet, strong feet.',
        '那天晚上,豹用安靜有力的腳走過那條路。'),
      // Q8 mc paraphrase — fall
      mc('kt-ch21-l5-q8',
        'One step on the leaves, and his big body went straight down.',
        'What happened to the leopard?',
        ['he flew up high', 'he dropped into the hole', 'he turned around', 'he sat on a rock'],
        ['他飛上天', '他掉進洞裡', '他轉身', '他坐石頭上'],
        1,
        '推理: body went straight down → 掉進洞裡 (paraphrase)。'),
      // Q9 BEAT D — leopard stuck
      nar('kt-ch21-l5-q9',
        'The leopard tried to climb out, but the walls were too high.',
        '豹想爬出來,但洞壁太高了。'),
      // Q10 listen-comprehension inference — why Anansi acts
      gist('kt-ch21-l5-q10',
        'Anansi looked down at him and held out a long, strong rope.',
        'Why did Anansi bring a rope?',
        ['to play tug-of-war', 'to lift the leopard up safely', 'to tie his shoes', 'to draw a line'],
        ['玩拔河', '把豹安全拉上來', '綁鞋帶', '畫線'],
        1,
        '推理:豹在洞底 + Anansi 拿繩 → 要把豹安全拉上來。'),
      // Q11 HOOK — B1 物理懸念
      nar('kt-ch21-l5-q11',
        '"I will help you up," Anansi said. The leopard looked up at the rope...',
        '「我幫你上來,」Anansi 說。豹抬頭看著繩子……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch21-6: Sky God pays — the box of stories (B2 情緒翻轉)
  // Hook: 天神真的會給嗎? 報酬是什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch21-l6', chapter: 21, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'anansi-spider',
    storyBeat: '蜘蛛全帶回天神 — 天神給故事',
    questions: [
      vocabIntro('kt-ch21-l6-q1', [
        ['帶', 'bring'],
        ['頭', 'head'],
        ['盒子', 'box'],
        ['世界', 'world'],
      ]),
      // Q2 BEAT A
      nar('kt-ch21-l6-q2',
        'Anansi climbed up the thread again, and this time he was not alone.',
        'Anansi 又爬上那條線,這次他不是一個人。'),
      // Q3 mc paraphrase — what he had
      mc('kt-ch21-l6-q3',
        'Behind him came the hornets, the long python, and the spotted leopard.',
        'Who came up with Anansi?',
        ['his mother', 'three birds', 'the three caught animals', 'two old men'],
        ['他媽媽', '三隻鳥', '抓到的三個動物', '兩個老人'],
        2,
        '推理: hornets + python + leopard → 抓到的三個動物 (paraphrase)。'),
      // Q4 TF inference (action — Nyame surprised)
      tf('kt-ch21-l6-q4',
        'Nyame slowly stood up from his big chair to take a closer look.',
        'Nyame 慢慢從大椅子上站起來,要近看。',
        'Was the Sky God surprised by what he saw?', 'Y',
        '推理: 站起來 + 近看 → 驚訝 → 答 Yes'),
      // Q5 BEAT B — Nyame inspects
      nar('kt-ch21-l6-q5',
        'The Sky God looked at the hornets, the python, and the leopard.',
        '天神看著蜂、大蛇,還有豹。'),
      // Q6 mc paraphrase — what surprised him most
      mc('kt-ch21-l6-q6',
        'He could not see any rope on his back or any cut on his skin.',
        'What did Nyame notice about the catch?',
        ['the animals were hurt', 'no animal had been hurt', 'they were all asleep', 'they were all sick'],
        ['動物受傷了', '沒有動物受傷', '他們都睡著了', '都生病了'],
        1,
        '推理: no rope + no cut → 沒有動物受傷 (paraphrase)。'),
      // Q7 BEAT C — Nyame's words
      nar('kt-ch21-l6-q7',
        '"You are small, but your head is big," Nyame said with a smile.',
        '「你很小,但腦袋很大,」Nyame 笑著說。'),
      // Q8 mc paraphrase — meaning of words
      mc('kt-ch21-l6-q8',
        'He meant Anansi had used his clever ideas, not his strong arms.',
        'What did Nyame mean by "your head is big"?',
        ['Anansi had a big hat', 'Anansi was very clever', 'Anansi was very tall', 'Anansi was very loud'],
        ['Anansi 有大帽子', 'Anansi 很聰明', 'Anansi 很高', 'Anansi 很大聲'],
        1,
        '推理: clever ideas not strong arms → 很聰明 (paraphrase)。'),
      // Q9 BEAT D — payment
      nar('kt-ch21-l6-q9',
        'He gave Anansi a wooden box full of all the stories of the world.',
        '他給了 Anansi 一個木盒,裡面裝著全世界所有的故事。'),
      // Q10 emoji — Anansi's feeling
      emoji('kt-ch21-l6-q10',
        'How did Anansi feel when he held the box?',
        'How did Anansi feel?',
        ['😴 sleepy', '🌟 proud and happy', '😡 angry', '😢 sad'],
        ['想睡', '驕傲又開心', '生氣', '難過'],
        1,
        '小蜘蛛拿到全世界的故事 → 驕傲又開心。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch21-l6-q11',
        'Anansi held the box close to his chest and looked down at the world below...',
        'Anansi 把盒子抱在胸前,看著下面的世界……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch21-7: Stories fly to every home (B6 open)
  // Hook: 為什麼每個家都聽得到故事? 你家第一個故事是什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch21-l7', chapter: 21, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'anansi-spider',
    storyBeat: '蜘蛛把故事散到全世界',
    questions: [
      vocabIntro('kt-ch21-l7-q1', [
        ['抱', 'carry'],
        ['打開', 'open'],
        ['蓋子', 'lid'],
        ['飛', 'fly'],
      ]),
      // Q2 BEAT A
      nar('kt-ch21-l7-q2',
        'Anansi carried the heavy box back down to the ground.',
        'Anansi 把重重的盒子帶回地上。'),
      // Q3 mc paraphrase — how heavy
      mc('kt-ch21-l7-q3',
        'Every step down the thread was slow and careful.',
        'How did Anansi move on the way down?',
        ['fast and bouncy', 'slowly with care', 'in big jumps', 'with his eyes shut'],
        ['又快又彈跳', '慢慢小心', '大跳', '閉著眼'],
        1,
        '推理: slow and careful → 慢慢小心 (paraphrase)。'),
      // Q4 TF inference (atmosphere — village waits)
      tf('kt-ch21-l7-q4',
        'In the village, the people came out and made a circle around him.',
        '村裡的人都出來,圍著他站成一圈。',
        'Were the people curious about what was in the box?', 'Y',
        '推理: 圍成一圈 → 很好奇 → 答 Yes'),
      // Q5 BEAT B — opens lid
      nar('kt-ch21-l7-q5',
        'He opened the lid in the middle of the village.',
        '他在村子中央把蓋子打開。'),
      // Q6 mc paraphrase — what happened
      mc('kt-ch21-l7-q6',
        'The stories flew out like birds and went in every direction.',
        'What did the stories look like?',
        ['stones falling down', 'birds flying out', 'a quiet river', 'soft balls of yarn'],
        ['石頭掉下來', '鳥飛出來', '安靜的河', '軟毛線球'],
        1,
        '推理: flew out like birds → 鳥飛出來 (paraphrase)。'),
      // Q7 BEAT C — stories reach
      nar('kt-ch21-l7-q7',
        'They went to every corner of the earth, near and far.',
        '它們飛到地球的每個角落,近的遠的都有。'),
      // Q8 mc paraphrase — outcome for people
      mc('kt-ch21-l7-q8',
        'Now every home, even small ones, had a story by the fire at night.',
        'What changed for the people at night?',
        ['no one slept', 'every home had a story to share', 'they all moved away', 'the fire went out'],
        ['沒人睡', '每家都有故事可分享', '都搬走', '火滅了'],
        1,
        '推理: every home had a story → 每家都有故事可分享 (paraphrase)。'),
      // Q9 BEAT D — origin closer
      nar('kt-ch21-l7-q9',
        'And that is why, even today, there is a tale in every home.',
        '所以,直到今天,每個家裡都有故事。'),
      // Q10 listen-comprehension — moral
      gist('kt-ch21-l7-q10',
        'A small spider with a big head changed the night for everyone.',
        'What is the main lesson of this story?',
        ['only the strong can win',
         'clever thinking can beat brute strength',
         'never trust a spider',
         'stories are only for kings'],
        ['只有強者能贏',
         '聰明可以勝過蠻力',
         '不要相信蜘蛛',
         '故事只給國王'],
        1,
        '主旨 = 小蜘蛛用聰明拿到所有故事 → 聰明可以勝過蠻力。'),
      // Q11 HOOK — B6 open
      nar('kt-ch21-l7-q11',
        'Tonight your story is also one of Anansi\'s. What is the first story you remember?',
        '今晚你聽的故事,也是 Anansi 帶回來的。你記得的第一個故事是什麼?'),
    ],
  },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
let tfCount = 0, gistCount = 0, mcCount = 0, narCount = 0, emojiCount = 0, vocabCount = 0;
for (const l of lessons) {
  for (const q of l.questions) {
    if (q.type === 'listen-tf') tfCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'gist') gistCount++;
    if (q.type === 'listen-mc') mcCount++;
    if (q.type === 'narration') narCount++;
    if (q.type === 'emoji-pick') emojiCount++;
    if (q.type === 'tap-pairs') vocabCount++;
  }
}
console.log(`     narration: ${narCount}, listen-mc: ${mcCount}, listen-tf: ${tfCount},`);
console.log(`     gist: ${gistCount}, emoji-pick: ${emojiCount}, tap-pairs: ${vocabCount}`);
