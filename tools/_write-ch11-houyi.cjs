#!/usr/bin/env node
/**
 * v2.0.B.250+ — Ch11 后羿射日 (Hou Yi Shoots the Suns).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern.
 * Source canon: docs/canon/houyi.md (7-beat arc, 中華民俗 public domain).
 * Cuts: docs/canon/houyi-cuts.md (B6/B3/B4/B5/B6/B2/B6-open).
 *
 * Pairing: Ch11 后羿射日 (Hou Yi POV) <=> Ch10 嫦娥奔月 (Chang'e POV)
 *   = cross-POV 同一段中華神話, 對 8-12 兒童「同事件不同角度」ELT 練習.
 *
 * Public domain compliance:
 *   - Source: Chinese folk myth, oral tradition, public domain
 *   - 自創 A2 句式 — 不引特定 Birrell / Werner / Yang 譯本字句
 *   - Names: Hou Yi (后羿), Chang'e (嫦娥), Jade Emperor (玉皇大帝) — folk
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
 *   R3 A2 vocab only (no scorching/decimated/annihilated/slaughtered)
 *   R4 listen-tf inference (4 strategy rotation: atmosphere/action/time/contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Cultural / violence rules (per docs/canon/houyi.md + lint-cultural + user prompt):
 *   - 'shot down the suns' OK / NEVER 'killed' (太陽不是 living)
 *   - 'gave up' OK / NEVER 'sacrificed' / 'was punished cruelly'
 *   - 'the suns fell' OK / NEVER 'died' / 'burned to death'
 *   - L6 Hou Yi 主動 'gave up his place' (not被罰)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch11.json');

// ─── Helpers (mirror Ch7/Ch8/Ch9 範本) ────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch11', 'houyi'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch11', 'houyi', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch11', 'houyi'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch11', 'houyi', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch11', 'houyi', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch11-1: 10 suns appear (B6 預言種子 — 人們會怎樣?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch11-l1', chapter: 11, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'houyi',
    storyBeat: '10 個太陽出現 — 大地會燒壞嗎?',
    questions: [
      vocabIntro('kt-ch11-l1-q1', [
        ['太陽', 'sun'],
        ['天空', 'sky'],
        ['十', 'ten'],
        ['熱', 'hot'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch11-l1-q2',
        'Long ago in China, the sky had one warm sun.',
        '很久以前在中國,天空只有一個溫暖的太陽。'),
      // Q3 BEAT A deepen
      nar('kt-ch11-l1-q3',
        'The people grew rice. The rivers ran clear.',
        '人們種稻。河水清澈。'),
      // Q4 TF inference (contrast — quiet life implies peace)
      tf('kt-ch11-l1-q4',
        'Children played by the river. Old men sat in the shade.',
        '小孩在河邊玩。老人在樹蔭下坐。',
        'Was life calm and good back then?', 'Y',
        '推理: 玩+乘涼 → 生活平靜 → 答 Yes'),
      // Q5 BEAT B — change
      nar('kt-ch11-l1-q5',
        'One strange morning, ten suns came up at once.',
        '一個奇怪的早上,十個太陽一起升起。'),
      // Q6 listen-mc paraphrase about heat (X3 anti-verbatim:
      // correct option words ≠ sentence words)
      mc('kt-ch11-l1-q6',
        'The grass turned brown. The rivers dried up fast.',
        'What happened to the land?',
        ['everything stayed green', 'it became dry and dead', 'snow began to fall', 'flowers grew tall'],
        ['一切還是綠的', '變得乾又死', '開始下雪', '花長很高'],
        1,
        '推理: 草變褐 + 河乾 → 變得乾又死 (paraphrase)。'),
      // Q7 BEAT C — children cry
      nar('kt-ch11-l1-q7',
        'The children cried in the heat.',
        '孩子們在炎熱中哭泣。'),
      // Q8 listen-mc paraphrase about people suffering
      mc('kt-ch11-l1-q8',
        'No one could go outside in the long bright day.',
        'Why did people stay inside?',
        ['they wanted to sleep', 'the heat was too strong', 'a party was on TV', 'it was raining hard'],
        ['他們想睡覺', '熱度太強', '電視有派對', '下大雨'],
        1,
        '推理: 不能出門 + 強光 → 熱度太強 (paraphrase)。'),
      // Q9 BEAT D — Jade Emperor watches
      nar('kt-ch11-l1-q9',
        'The Jade Emperor in the sky saw the burning land.',
        '天上的玉皇大帝看見燒焦的大地。'),
      // Q10 emoji — how the land looked
      emoji('kt-ch11-l1-q10',
        'How did the land look from the sky?',
        'How did the land look?',
        ['🌳 green and full', '🔥 dry and burning', '❄️ cold and white', '🌊 wet and blue'],
        ['綠又茂盛', '乾又燒著', '冷又白', '濕又藍'],
        1,
        '草褐 + 河乾 + 兒童哭 → 乾又燒著。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch11-l1-q11',
        'The Jade Emperor watched. The land kept burning. Who would help...',
        '玉皇大帝看著。大地繼續燒。誰會來幫忙……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch11-2: The Bow — Jade Emperor calls Hou Yi (B3 資訊缺口)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch11-l2', chapter: 11, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'houyi',
    storyBeat: '玉皇大帝給羿弓 — 他能擔下嗎?',
    questions: [
      vocabIntro('kt-ch11-l2-q1', [
        ['弓', 'bow'],
        ['箭', 'arrow'],
        ['射手', 'archer'],
        ['強', 'strong'],
      ]),
      // Q2 BEAT A — Hou Yi summoned
      nar('kt-ch11-l2-q2',
        'The Jade Emperor called a strong man named Hou Yi.',
        '玉皇大帝召來一個叫后羿的強壯男人。'),
      // Q3 mc paraphrase about Hou Yi (X3: correct option words ≠ sentence words)
      mc('kt-ch11-l2-q3',
        'Hou Yi was the best archer in the whole world.',
        'What was Hou Yi famous for?',
        ['he could cook well', 'shooting with a bow', 'he sang nice songs', 'making good bread'],
        ['他會煮飯', '用弓射箭', '他唱歌好聽', '做好麵包'],
        1,
        '推理: best archer → 用弓射箭 (paraphrase)。'),
      // Q4 BEAT B — bow given
      nar('kt-ch11-l2-q4',
        'The Jade Emperor gave him a big red bow.',
        '玉皇大帝給他一張大紅弓。'),
      // Q5 TF inference (action — heavy gift = serious job)
      tf('kt-ch11-l2-q5',
        'He also gave Hou Yi ten clean white arrows.',
        '他也給后羿十支乾淨的白箭。',
        'Was this a small job?', 'N',
        '推理: 十支白箭 + 大紅弓 → 重要任務 → 答 No'),
      // Q6 BEAT C — orders
      nar('kt-ch11-l2-q6',
        '"Shoot down the nine extra suns," the Emperor said.',
        '「把多的九個太陽射下來,」玉皇大帝說。'),
      // Q7 emoji
      emoji('kt-ch11-l2-q7',
        'How many suns did the Emperor want left?',
        'How many suns should stay?',
        ['🌑 zero', '☀️ one', '☀️☀️ two', '☀️☀️☀️ three'],
        ['零', '一個', '兩個', '三個'],
        1,
        '九射下 → 剩一個。'),
      // Q8 BEAT D — Emperor explains why one stays
      nar('kt-ch11-l2-q8',
        '"Keep only one for the people," he said.',
        '「為了人民,只留下一個,」他說。'),
      // Q9 mc paraphrase about purpose
      mc('kt-ch11-l2-q9',
        'One sun was enough to feed crops and warm hands.',
        'Why keep one sun in the sky?',
        ['so the moon stays awake', 'for food and warm light', 'so birds can sing', 'so stars shine more'],
        ['讓月亮不睡', '為了食物跟溫暖', '讓鳥唱歌', '讓星星更亮'],
        1,
        '推理: feed crops + warm hands → 食物跟溫暖 (paraphrase)。'),
      // Q10 BEAT — Hou Yi accepts (silent, holds bow)
      nar('kt-ch11-l2-q10',
        'Hou Yi held the big red bow tight in his hands.',
        '后羿把大紅弓緊握在手中。'),
      // Q11 HOOK — B3 資訊缺口 (can he bear it?)
      nar('kt-ch11-l2-q11',
        'He looked up at the burning sky. Nine suns. One man...',
        '他抬頭看燒紅的天空。九個太陽。一個人……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch11-3: First shot — walking the dry land (B4 期待加速)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch11-l3', chapter: 11, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'houyi',
    storyBeat: '走遍大地 — 第一個太陽怎麼射?',
    questions: [
      vocabIntro('kt-ch11-l3-q1', [
        ['走', 'walk'],
        ['田', 'field'],
        ['拉', 'pull'],
        ['呼吸', 'breath'],
      ]),
      // Q2 BEAT A
      nar('kt-ch11-l3-q2',
        'Hou Yi walked across the dry brown land.',
        '后羿走過乾褐色的大地。'),
      // Q3 mc paraphrase about what he saw (X2 fix: vary option starts;
      // X3: correct option words ≠ sentence words)
      mc('kt-ch11-l3-q3',
        'He saw burning fields. He saw empty rivers.',
        'What did Hou Yi see on the land?',
        ['rich green crops', 'damage from the heat', 'happy market days', 'children at play'],
        ['豐盛綠田', '熱造成的傷害', '熱鬧市集', '玩耍的孩子'],
        1,
        '推理: 燒焦田 + 空河 → 熱造成的傷害 (paraphrase)。'),
      // Q4 BEAT B — lifts bow
      nar('kt-ch11-l3-q4',
        'He lifted his big red bow up to the sky.',
        '他把大紅弓抬向天空。'),
      // Q5 TF inference (action — slow careful pull = focused)
      tf('kt-ch11-l3-q5',
        'He pulled the string back slow. He did not rush.',
        '他慢慢把弦拉開。他不慌張。',
        'Was Hou Yi careless and quick?', 'N',
        '推理: 慢拉 + 不慌 → 不是粗心快射 → 答 No'),
      // Q6 BEAT C — deep breath
      nar('kt-ch11-l3-q6',
        'He took a deep breath. He held it still.',
        '他深深吸一口氣。他屏住氣。'),
      // Q7 emoji
      emoji('kt-ch11-l3-q7',
        'What kind of moment was this for Hou Yi?',
        'What kind of moment?',
        ['😴 sleepy', '🎯 focused', '😆 funny', '💃 dancing'],
        ['想睡', '專注', '搞笑', '跳舞'],
        1,
        '深呼吸 + 慢拉弦 → 專注。'),
      // Q8 BEAT D — first arrow flies
      nar('kt-ch11-l3-q8',
        'He let one arrow fly into the bright sky.',
        '他放一支箭飛向亮亮的天空。'),
      // Q9 mc paraphrase about result (X3: correct words ≠ sentence)
      mc('kt-ch11-l3-q9',
        'One sun fell down. The air felt a little cooler.',
        'What happened after the first arrow?',
        ['nothing changed at all', 'a sun came down', 'rain started to fall', 'wind blew very hard'],
        ['什麼都沒變', '一個太陽下來了', '開始下雨', '風吹很大'],
        1,
        '推理: sun fell → 太陽下來 (paraphrase)。'),
      // Q10 BEAT — pause
      nar('kt-ch11-l3-q10',
        'Hou Yi looked at the sky. Eight suns more.',
        '后羿看著天空。還有八個太陽。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch11-l3-q11',
        'He lifted the bow again. He took another arrow...',
        '他再次舉起弓。他拿出另一支箭……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch11-4: Nine down — will he leave one? (B5 道德兩難)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch11-l4', chapter: 11, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'houyi',
    storyBeat: '九個太陽射下 — 剩 1 個會留嗎?',
    questions: [
      vocabIntro('kt-ch11-l4-q1', [
        ['第二', 'second'],
        ['很快', 'soon'],
        ['不見', 'gone'],
        ['最後', 'last'],
      ]),
      // Q2 BEAT A
      nar('kt-ch11-l4-q2',
        'Hou Yi shot the second sun. Then the third.',
        '后羿射下第二個太陽。然後第三個。'),
      // Q3 mc paraphrase about rhythm
      mc('kt-ch11-l4-q3',
        'He shot more and more. One after another, they fell.',
        'How did Hou Yi shoot the suns?',
        ['only one time', 'in a steady chain', 'with shut eyes', 'while running fast'],
        ['只射一次', '一個接一個地射', '閉眼', '邊跑邊射'],
        1,
        '推理: 一個接一個射 → steady chain (paraphrase)。'),
      // Q4 BEAT B — getting cooler
      nar('kt-ch11-l4-q4',
        'The air grew cooler with every shot.',
        '每射一次,空氣就涼一些。'),
      // Q5 TF inference (atmosphere — air cooling = world healing)
      tf('kt-ch11-l4-q5',
        'A small green shoot pushed up through the dry earth.',
        '一根小綠芽從乾土中冒出來。',
        'Was the land starting to come back to life?', 'Y',
        '推理: 綠芽冒出 → 大地復活 → 答 Yes'),
      // Q6 BEAT C — soon nine gone
      nar('kt-ch11-l4-q6',
        'Soon nine suns were gone from the sky.',
        '很快,九個太陽都從天上消失了。'),
      // Q7 mc paraphrase about how many left
      mc('kt-ch11-l4-q7',
        'Only one sun was left up there now.',
        'How many suns were in the sky now?',
        ['none at all', 'just one', 'four big ones', 'still ten'],
        ['一個都沒有', '只有一個', '四個大的', '還是十個'],
        1,
        '九個不見 → 只有一個 (paraphrase)。'),
      // Q8 BEAT D — Hou Yi pauses
      nar('kt-ch11-l4-q8',
        'Hou Yi lifted his bow one more time.',
        '后羿又舉起了弓一次。'),
      // Q9 mc paraphrase about decision moment (X2 fix: vary option starts)
      mc('kt-ch11-l4-q9',
        'His arrow pointed up. His finger rested on the string.',
        'What was Hou Yi about to do?',
        ['put the bow away', 'take another shot', 'go back home', 'eat some lunch'],
        ['收起弓', '再射一次', '回家', '吃午餐'],
        1,
        '推理: 箭指上 + 手在弦 → 準備再射 (paraphrase)。'),
      // Q10 emoji — choice moment
      emoji('kt-ch11-l4-q10',
        'What was this moment about?',
        'What was this moment about?',
        ['⏸️ a choice', '🎉 a party', '💤 sleep', '🍰 food'],
        ['一個選擇', '派對', '睡覺', '食物'],
        0,
        '舉弓 + 指向最後太陽 → 選擇射不射。'),
      // Q11 HOOK — B5 道德兩難
      nar('kt-ch11-l4-q11',
        'He looked at the last sun. Would he shoot? Or would he stop...',
        '他看著最後一個太陽。射?還是停……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch11-5: Mercy for the last sun (B6 預言種子 — 王看見嗎?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch11-l5', chapter: 11, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'houyi',
    storyBeat: '留下最後太陽 — 玉皇大帝看見嗎?',
    questions: [
      vocabIntro('kt-ch11-l5-q1', [
        ['放下', 'put down'],
        ['留下', 'stay'],
        ['光', 'light'],
        ['綠', 'green'],
      ]),
      // Q2 BEAT A — does not shoot
      nar('kt-ch11-l5-q2',
        'Hou Yi did not shoot the last sun.',
        '后羿沒有射最後那個太陽。'),
      // Q3 mc paraphrase about why (X3: correct words ≠ sentence)
      mc('kt-ch11-l5-q3',
        'He thought of cold nights with no light at all.',
        'Why did he stop shooting?',
        ['his arm was tired', 'one sun was needed', 'his bow was broken', 'he heard a song'],
        ['手臂累', '需要留一個太陽', '弓壞了', '他聽到歌'],
        1,
        '推理: 想到沒光的冷夜 → 需要留一個 (paraphrase)。'),
      // Q4 BEAT B — put bow down
      nar('kt-ch11-l5-q4',
        'He put the big red bow down on the ground.',
        '他把大紅弓放在地上。'),
      // Q5 TF inference (action — put down = job done)
      tf('kt-ch11-l5-q5',
        'He let the last sun stay up in the sky.',
        '他讓最後的太陽留在天上。',
        'Did Hou Yi want all suns gone?', 'N',
        '推理: 讓最後留下 → 不是要全射光 → 答 No'),
      // Q6 BEAT C — people come out
      nar('kt-ch11-l5-q6',
        'The people came out of their homes again.',
        '人們又從家裡走出來。'),
      // Q7 mc paraphrase about the light (X2 fix: vary option starts)
      mc('kt-ch11-l5-q7',
        'They saw warm light, not burning light.',
        'How did the sun feel now?',
        ['painfully hot', 'kind and warm', 'sharp and bright', 'cold like ice'],
        ['痛苦地熱', '又暖又溫柔', '又銳又亮', '冷如冰'],
        1,
        '推理: warm not burning → 又暖又溫柔 (paraphrase)。'),
      // Q8 BEAT D — land heals
      nar('kt-ch11-l5-q8',
        'The rivers ran again. The grass turned green.',
        '河水又流了。草變綠了。'),
      // Q9 emoji
      emoji('kt-ch11-l5-q9',
        'How did the land look now?',
        'How did the land look?',
        ['🌳 alive and green', '🔥 still burning', '❄️ frozen', '🌑 dark'],
        ['活又綠', '還在燒', '結冰', '黑暗'],
        0,
        '河水流 + 草變綠 → 活又綠。'),
      // Q10 BEAT — children laugh
      nar('kt-ch11-l5-q10',
        'The children laughed by the river again.',
        '孩子們又在河邊笑了。'),
      // Q11 HOOK — B6 預言種子 (does the king see this?)
      nar('kt-ch11-l5-q11',
        'The Jade Emperor in the sky watched it all...',
        '天上的玉皇大帝看著這一切……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch11-6: The king turns cold (B2 情緒翻轉 — 羿怎麼回應?)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch11-l6', chapter: 11, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'houyi',
    storyBeat: '王不再讓羿做神 — 羿會怎麼回應?',
    questions: [
      vocabIntro('kt-ch11-l6-q1', [
        ['開心', 'happy'],
        ['自己的', 'own'],
        ['神', 'god'],
        ['放棄', 'give up'],
      ]),
      // Q2 BEAT A
      nar('kt-ch11-l6-q2',
        'The Jade Emperor was not happy with Hou Yi.',
        '玉皇大帝對后羿不滿意。'),
      // Q3 mc paraphrase about why (X3 anti-verbatim)
      mc('kt-ch11-l6-q3',
        'The nine fallen suns were his own children.',
        'Why was the Jade Emperor upset?',
        ['Hou Yi was too slow', 'the suns were his family', 'people did not thank him', 'the bow was red'],
        ['后羿太慢', '太陽是他的家人', '人們沒謝他', '弓是紅的'],
        1,
        '推理: 自己的孩子 → 太陽是家人 (paraphrase)。'),
      // Q4 BEAT B — Emperor speaks
      nar('kt-ch11-l6-q4',
        '"You cannot be a god any more," the Emperor said.',
        '「你不能再當神了,」玉皇大帝說。'),
      // Q5 TF inference (contrast — saved world but lost status)
      tf('kt-ch11-l6-q5',
        'Hou Yi saved the land. The Emperor still took his place away.',
        '后羿救了大地。玉皇大帝還是收走了他的位置。',
        'Did doing the right thing protect Hou Yi from loss?', 'N',
        '推理: 做對事還是失去身份 → 沒被保護 → 答 No'),
      // Q6 BEAT C — Hou Yi accepts
      nar('kt-ch11-l6-q6',
        'Hou Yi gave up his place in the sky.',
        '后羿放棄了他在天上的位置。'),
      // Q7 mc paraphrase about what he became (X2 fix: vary option starts)
      mc('kt-ch11-l6-q7',
        'He became a normal man on the green earth.',
        'What did Hou Yi become?',
        ['a bigger god', 'just a regular person', 'a flying bird', 'a king of the sea'],
        ['更大的神', '一個普通人', '會飛的鳥', '海王'],
        1,
        '推理: normal man → 普通人 (paraphrase)。'),
      // Q8 BEAT D — Chang'e too
      nar('kt-ch11-l6-q8',
        'His wife Chang\'e became a normal woman too.',
        '他的妻子嫦娥也變成一個普通女人。'),
      // Q9 emoji — Hou Yi's feeling
      emoji('kt-ch11-l6-q9',
        'How might Hou Yi feel about this change?',
        'How might Hou Yi feel?',
        ['😎 proud only', '😐 quiet and calm', '🤣 funny', '😱 afraid forever'],
        ['只是驕傲', '安靜又平靜', '搞笑', '永遠害怕'],
        1,
        '放棄但接受 → 安靜又平靜。'),
      // Q10 BEAT — they go to earth
      nar('kt-ch11-l6-q10',
        'They went to live on the earth together.',
        '他們一起到地上生活。'),
      // Q11 HOOK — B2 情緒翻轉 (saved → demoted)
      nar('kt-ch11-l6-q11',
        'The sky was no longer home. The earth was new...',
        '天空不再是家。大地是新的……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch11-7: Mortal Hou Yi + Chang'e (B6 open — 銜接 Ch10)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch11-l7', chapter: 11, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'houyi',
    storyBeat: '凡人羿與凡人嫦娥 — 接下來是嫦娥的故事',
    questions: [
      vocabIntro('kt-ch11-l7-q1', [
        ['老', 'old'],
        ['自由', 'free'],
        ['牆', 'wall'],
        ['故事', 'story'],
      ]),
      // Q2 BEAT A
      nar('kt-ch11-l7-q2',
        'Hou Yi and Chang\'e walked the green earth as people.',
        '后羿與嫦娥像人一樣走在綠色大地上。'),
      // Q3 mc paraphrase about their life
      mc('kt-ch11-l7-q3',
        'They grew old like all people grow old.',
        'How did Hou Yi and Chang\'e age?',
        ['they stayed young forever', 'in the normal human way', 'very fast in one day', 'they grew younger'],
        ['永遠年輕', '像一般人那樣', '一天就變老', '越變越年輕'],
        1,
        '推理: grow old like all people → 一般人那樣 (paraphrase)。'),
      // Q4 BEAT B — not gods but free
      nar('kt-ch11-l7-q4',
        'They were not gods, but they were free.',
        '他們不是神,但他們是自由的。'),
      // Q5 TF inference (contrast — lost status, gained freedom)
      tf('kt-ch11-l7-q5',
        'No one in the sky told them what to do now.',
        '天上沒人再告訴他們該做什麼。',
        'Did they still take orders from above?', 'N',
        '推理: 沒人再下令 → 不再聽命 → 答 No'),
      // Q6 BEAT C — bow on wall
      nar('kt-ch11-l7-q6',
        'Hou Yi kept his big red bow on the wall.',
        '后羿把大紅弓掛在牆上。'),
      // Q7 mc paraphrase about why kept (X2 fix: vary option starts)
      mc('kt-ch11-l7-q7',
        'He looked at it some nights in the soft lamp light.',
        'Why did Hou Yi keep the bow?',
        ['for selling gold price', 'as a quiet memory', 'cat noise made him', 'daily cleaning fun'],
        ['為了賣金錢', '當作安靜的回憶', '貓吵到他', '每天擦著玩'],
        1,
        '推理: 夜裡看它 → 安靜的回憶 (paraphrase)。'),
      // Q8 BEAT D — sun every morning
      nar('kt-ch11-l7-q8',
        'He looked at the one warm sun every morning.',
        '他每天早上看著那一個溫暖的太陽。'),
      // Q9 emoji
      emoji('kt-ch11-l7-q9',
        'How did Hou Yi feel about the one sun?',
        'How did he feel about the sun?',
        ['😡 angry it was there', '😊 glad he left it', '😴 he ignored it', '😢 sad about it'],
        ['生氣它在那', '高興他留下了', '不理它', '為它難過'],
        1,
        '留下的決定救了大地 → 高興留下了。'),
      // Q10 BEAT — Chang'e mentioned
      nar('kt-ch11-l7-q10',
        'Chang\'e walked beside him through every season.',
        '嫦娥在每個季節都在他身邊。'),
      // Q11 HOOK — B6 open (Chang'e story coming next)
      nar('kt-ch11-l7-q11',
        'What came next was Chang\'e\'s story. The moon was waiting...',
        '接下來,是嫦娥的故事。月亮在等著……'),
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
