#!/usr/bin/env node
/**
 * v2.0.B.280+ — Ch26 Archimedes' Eureka Moment (阿基米德 — 浴缸裡發現的秘密).
 *
 * Pipeline ship via tools/pickup-new-story.cjs URL pipeline pattern
 * (mirror Ch15 Emperor's New Clothes ship B.262+).
 * Source canon: docs/canon/archimedes-eureka.md
 *   (Vitruvius De architectura c. 25 BCE, anecdote about Archimedes
 *    287-212 BCE, public domain worldwide).
 * Cuts: docs/canon/archimedes-eureka-cuts.md
 *   (B6/B3/B5/B4/B1/B2/B6-open).
 *
 * IP 鐵律:
 *   - Source: Vitruvius, De architectura Book IX (c. 25 BCE), anecdote
 *     about Archimedes of Syracuse (287-212 BCE) and King Hiero II.
 *     >2200 years old. Public domain worldwide.
 *   - 'Eureka' (εὕρηκα) historical Greek exclamation — kept literal as
 *     cultural anchor.
 *   - A2 自創句式, 不引任何特定譯本延伸段落.
 *   - NO modern children's book / TV / animation / film adaptation.
 *
 * Structure per lesson (11 Q, mirror Ch15/Ch21/Ch9 範本):
 *   q1  tap-pairs (vocab intro, 4 ZH-EN)
 *   q2  narration (BEAT A setup)
 *   q3  listen-mc paraphrase (X3: paraphrase, not verbatim)
 *   q4  listen-tf inference (atmosphere / action / contrast)
 *   q5  narration (BEAT B)
 *   q6  listen-mc paraphrase
 *   q7  narration (BEAT C)
 *   q8  listen-mc paraphrase
 *   q9  narration (BEAT D)
 *   q10 emoji-pick (feeling / inference)
 *   q11 narration HOOK ENDING (per cuts md)
 *
 * Hard rules (per ~/.claude/skills/pickup-item-writer/SKILL.md):
 *   R1 stem ≤ 11 words
 *   R2 listen-mc correct option paraphrase (no X3 verbatim)
 *   R3 A2 vocab only:
 *      'density' → 'size for the same weight'
 *      'displacement' → 'water that came out' / 'water that rose'
 *      'volume' → 'size'
 *      'mass' → 'weight'
 *      'naked' → 'jumped out of the bath' (history-correct minus detail)
 *      'goldsmith cheated the king' → 'some silver was mixed in'
 *      'Eureka' kept (historic Greek word, cultural anchor)
 *      'Archimedes' / 'Syracuse' kept (proper noun)
 *   R4 listen-tf inference (atmosphere / action / contrast)
 *   R5 explanationZh 含 "推理: A → B → 答 X"
 *   R6 speaker every Q (預設 narrator)
 *
 * Child-friendly tone (per CLAUDE.md '8-12 兒童 + 親子家庭'):
 *   - 0 風險: 沒有血腥, 沒有壞人懲罰 (金匠判決從原典移除)
 *   - 發現主題: 觀察日常 (水溢出) → 想通大道理
 *   - 科學啟蒙: 每個小孩在浴缸裡玩水都是 mini-Archimedes
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch26.json');

// ─── Helpers (mirror Ch15/Ch21 範本) ──────────────────────────────────
function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch26', 'archimedes-eureka'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch26', 'archimedes-eureka', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch26', 'archimedes-eureka'],
    subSkill: 'detail' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch26', 'archimedes-eureka', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch26', 'archimedes-eureka', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch26-1: King worries the crown is not pure gold (B6 預言種子)
  // Hook: 國王懷疑王冠不純金 → 找誰?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch26-l1', chapter: 26, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'archimedes-eureka',
    storyBeat: '國王擔心王冠 — 派人去查真假',
    questions: [
      vocabIntro('kt-ch26-l1-q1', [
        ['國王', 'king'],
        ['王冠', 'crown'],
        ['金子', 'gold'],
        ['純的', 'pure'],
      ]),
      // Q2 BEAT A — setup
      nar('kt-ch26-l1-q2',
        'Long ago in Syracuse, there lived a clever man named Archimedes.',
        '很久以前在 Syracuse 城,住著一位聰明的人,叫 Archimedes。'),
      // Q3 mc paraphrase about the crown (X3: paraphrase, not verbatim)
      mc('kt-ch26-l1-q3',
        'The king had a new crown of bright, shiny gold.',
        'What did the king have?',
        ['an old wooden box', 'a brand new gold crown', 'a small silver coin', 'a long iron sword'],
        ['舊木盒', '全新的金王冠', '小銀幣', '長鐵劍'],
        1,
        '推理: new + bright shiny gold → 全新的金王冠 (paraphrase)。'),
      // Q4 TF inference (atmosphere — the worry)
      tf('kt-ch26-l1-q4',
        'But the king worried that some silver was mixed in with the gold.',
        '但國王擔心金子裡可能摻了銀。',
        'Was the king sure the crown was all gold?', 'N',
        '推理: 擔心摻銀 → 不確定 → 答 No'),
      // Q5 BEAT B — king sends for Archimedes
      nar('kt-ch26-l1-q5',
        'He sent for Archimedes and asked for help.',
        '他派人找來 Archimedes,請他幫忙。'),
      // Q6 mc paraphrase about the request
      mc('kt-ch26-l1-q6',
        '"Find out the truth, but do not break my crown," the king said.',
        'What rule did the king give Archimedes?',
        ['cut the crown in half', 'keep the crown whole', 'sell the crown fast', 'paint the crown red'],
        ['切成兩半', '保持王冠完整', '快點賣掉', '塗成紅色'],
        1,
        '推理: do not break → 保持完整 (paraphrase)。'),
      // Q7 BEAT C — Archimedes accepts
      nar('kt-ch26-l1-q7',
        'Archimedes bowed his head and took the crown in his hands.',
        'Archimedes 低頭鞠躬,把王冠捧在手裡。'),
      // Q8 mc paraphrase about Archimedes' feeling
      mc('kt-ch26-l1-q8',
        'He felt the weight of the puzzle as much as the weight of the gold.',
        'How did Archimedes feel about the task?',
        ['easy and small', 'as a heavy puzzle', 'like a funny joke', 'a bit like a soft song'],
        ['很簡單很小', '是個沉重的謎題', '像個好笑的玩笑', '有點像輕柔的歌'],
        1,
        '推理: weight of the puzzle → 沉重的謎題 (paraphrase)。'),
      // Q9 BEAT D — he walks home thinking
      nar('kt-ch26-l1-q9',
        'He walked home with the crown and a big question in his head.',
        '他帶著王冠走回家,腦中有個大問題。'),
      // Q10 emoji — Archimedes' mood
      emoji('kt-ch26-l1-q10',
        'How did Archimedes feel as he walked home?',
        'How did he feel?',
        ['😴 sleepy', '🤔 deep in thought', '😡 angry', '🎵 ready to sing'],
        ['想睡', '深深在思考', '生氣', '想唱歌'],
        1,
        '帶著大問題回家 → 深深在思考。'),
      // Q11 HOOK — B6 預言種子
      nar('kt-ch26-l1-q11',
        'At home, he set the crown on the table and stared at it for a long time...',
        '回到家,他把王冠放在桌上,盯著它看了很久……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch26-2: Archimedes faces the puzzle (B3 資訊缺口)
  // Hook: 阿基米德接到謎題 → 怎麼測?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch26-l2', chapter: 26, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'archimedes-eureka',
    storyBeat: '面對謎題 — 不能切, 不能熔, 該怎麼測?',
    questions: [
      vocabIntro('kt-ch26-l2-q1', [
        ['謎題', 'puzzle'],
        ['切', 'cut'],
        ['熔', 'melt'],
        ['裡面', 'inside'],
      ]),
      // Q2 BEAT A
      nar('kt-ch26-l2-q2',
        'Archimedes held the crown in his hands and looked at it for a long time.',
        'Archimedes 把王冠捧在手裡,看了很久很久。'),
      // Q3 mc paraphrase about what he could not do
      mc('kt-ch26-l2-q3',
        'He could not cut it open. He could not melt it down.',
        'What two things could Archimedes not do to the crown?',
        ['hide and lose the gold', 'damage the crown in any way', 'wash and dry the metal', 'paint and sell it cheap'],
        ['藏它和弄丟金子', '用任何方式破壞王冠', '洗金屬擦乾', '塗顏色便宜賣'],
        1,
        '推理: cannot cut + cannot melt → 不能破壞王冠 (paraphrase, X3-safe)。'),
      // Q4 TF inference (action — he is thinking very hard)
      tf('kt-ch26-l2-q4',
        'He turned the crown over and over in the soft lamp light.',
        '他在柔和的燈光下,把王冠翻來翻去。',
        'Was Archimedes studying the crown with great care?', 'Y',
        '推理: 翻來翻去 + 柔和燈光下 → 仔細研究 → 答 Yes'),
      // Q5 BEAT B — his question
      nar('kt-ch26-l2-q5',
        '"How can I tell what is inside, without breaking it?" he thought.',
        '「我要怎麼知道裡面是什麼,又不弄壞它?」他想。'),
      // Q6 mc paraphrase about the difficulty
      mc('kt-ch26-l2-q6',
        'No tool he knew could read what hid inside the gold.',
        'Why was the puzzle so hard?',
        ['his tools were too big', 'no tool he had could see inside', 'he had lost his books', 'the king had taken his desk'],
        ['工具太大', '沒有工具能看進去', '他弄丟了書', '國王拿走他的桌子'],
        1,
        '推理: no tool could read what hid inside → 沒有工具能看進去 (paraphrase)。'),
      // Q7 BEAT C — the puzzle stays
      nar('kt-ch26-l2-q7',
        'He sat down on a low stool and thought and thought.',
        '他在矮凳上坐下,想了又想。'),
      // Q8 mc paraphrase about his progress (X3-safe)
      mc('kt-ch26-l2-q8',
        'Hour after hour went by, but no answer came to his mind.',
        'Did Archimedes find an answer quickly?',
        ['yes, in one minute', 'no, time passed with no answer', 'yes, on his first try', 'no, but a friend told him'],
        ['是,一分鐘', '不,時間過去都沒答案', '是,第一次就對', '不,但朋友告訴他'],
        1,
        '推理: hour after hour + no answer → 時間過去都沒答案 (paraphrase)。'),
      // Q9 BEAT D — Archimedes feels stuck
      nar('kt-ch26-l2-q9',
        'The puzzle felt as heavy as the crown itself.',
        '這個謎題感覺跟王冠一樣重。'),
      // Q10 emoji — his state
      emoji('kt-ch26-l2-q10',
        'How did Archimedes feel about the puzzle?',
        'How did he feel?',
        ['😴 ready for bed', '🌀 stuck and confused', '😊 happy and easy', '🍎 hungry'],
        ['想睡覺', '卡住又困惑', '開心又輕鬆', '餓'],
        1,
        '想了又想沒答案 → 卡住又困惑。'),
      // Q11 HOOK — B3 資訊缺口
      nar('kt-ch26-l2-q11',
        'He went home with the puzzle still big and dark inside his head...',
        '他帶著這個又大又黑暗的謎題回家……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch26-3: Days of thinking, then a bath (B5 道德兩難)
  // Hook: 想了好幾天都想不到 → 累了去洗澡
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch26-l3', chapter: 26, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'archimedes-eureka',
    storyBeat: '想了好幾天 — 朋友擔心, 他決定去洗澡',
    questions: [
      vocabIntro('kt-ch26-l3-q1', [
        ['天', 'day'],
        ['桌子', 'desk'],
        ['累', 'tired'],
        ['洗澡', 'bath'],
      ]),
      // Q2 BEAT A
      nar('kt-ch26-l3-q2',
        'For days Archimedes sat at his desk and drew shapes on the floor.',
        '好幾天 Archimedes 坐在桌前,在地上畫圖形。'),
      // Q3 mc paraphrase about his routine
      mc('kt-ch26-l3-q3',
        'He did not eat much. He slept very little.',
        'What was Archimedes like during these days?',
        ['eating a lot of meals', 'eating little and sleeping little', 'going to many parties', 'playing in the garden'],
        ['吃很多餐', '吃得少又睡得少', '去很多派對', '在花園裡玩'],
        1,
        '推理: did not eat much + slept very little → 吃得少又睡得少 (paraphrase)。'),
      // Q4 TF inference (atmosphere — friends are worried)
      tf('kt-ch26-l3-q4',
        'His friends knocked on his door, but he barely heard them.',
        '他的朋友來敲門,但他幾乎沒聽到。',
        'Was Archimedes paying attention to people around him?', 'N',
        '推理: 幾乎沒聽到敲門 → 沒注意身邊 → 答 No'),
      // Q5 BEAT B — friends grew worried
      nar('kt-ch26-l3-q5',
        'His friends grew worried about him.',
        '他的朋友開始擔心他。'),
      // Q6 mc paraphrase about why friends worry
      mc('kt-ch26-l3-q6',
        'They saw his face go thin and his eyes grow dark.',
        'What did his friends notice about Archimedes?',
        ['that he looked taller', 'his face was thin and tired', 'loud singing every night', 'a new red coat on him'],
        ['他變高了', '他臉瘦又疲倦', '每晚大聲唱歌', '他穿了新紅外套'],
        1,
        '推理: face thin + eyes dark → 臉瘦又疲倦 (paraphrase)。'),
      // Q7 BEAT C — he decides to rest
      nar('kt-ch26-l3-q7',
        'At last, Archimedes put down his pen with a tired smile.',
        '最後,Archimedes 帶著疲倦的微笑放下筆。'),
      // Q8 mc paraphrase about his decision
      mc('kt-ch26-l3-q8',
        '"My mind needs a rest. I will take a warm bath," he said.',
        'What did Archimedes decide to do?',
        ['go back to the king', 'soak in hot water to clear his head', 'run a long race', 'sell the crown'],
        ['回去找國王', '泡熱水讓腦袋清醒', '跑長跑', '賣掉王冠'],
        1,
        '推理: mind needs rest + warm bath → 泡熱水讓腦袋清醒 (paraphrase)。'),
      // Q9 BEAT D — he walks toward the bath
      nar('kt-ch26-l3-q9',
        'He left the crown on the table and walked to the bath house.',
        '他把王冠留在桌上,走向澡堂。'),
      // Q10 emoji — what kind of break this is
      emoji('kt-ch26-l3-q10',
        'What kind of break was Archimedes giving himself?',
        'What kind of break?',
        ['👟 a long run', '🛁 a warm bath', '🍔 a big meal', '🎮 a fun game'],
        ['長跑', '熱水澡', '一頓大餐', '玩遊戲'],
        1,
        '說要洗熱水澡 → 熱水澡。'),
      // Q11 HOOK — B5 道德兩難 (giving up the desk for the bath)
      nar('kt-ch26-l3-q11',
        'He thought the puzzle would have to wait. But the bath had a surprise for him...',
        '他以為謎題要等等。但浴缸有個驚喜在等他……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch26-4: Water spills over (B4 期待加速)
  // Hook: 進浴缸水溢出來 → 他突然看到什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch26-l4', chapter: 26, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'archimedes-eureka',
    storyBeat: '進浴缸 — 水溢出來, 他看見了',
    questions: [
      vocabIntro('kt-ch26-l4-q1', [
        ['浴缸', 'tub'],
        ['水', 'water'],
        ['踏進', 'step in'],
        ['溢出', 'spill'],
      ]),
      // Q2 BEAT A
      nar('kt-ch26-l4-q2',
        'The bath was full to the top with warm water.',
        '浴缸裝滿了溫水,水面到缸口。'),
      // Q3 mc paraphrase about how he enters
      mc('kt-ch26-l4-q3',
        'Archimedes stepped in slowly, one foot at a time.',
        'How did Archimedes get into the tub?',
        ['with a fast jump', 'with slow careful steps', 'while still asleep', 'with his shoes on'],
        ['快速跳進', '慢慢小心地走進', '睡著走進', '穿著鞋進'],
        1,
        '推理: slowly, one foot at a time → 慢慢小心 (paraphrase)。'),
      // Q4 TF inference (action — water overflow)
      tf('kt-ch26-l4-q4',
        'As he sat down, water spilled over the edge onto the floor.',
        '他坐下時,水從缸邊溢到地板上。',
        'Did the water level inside the tub stay the same?', 'N',
        '推理: 溢到地板上 → 水位變了 → 答 No'),
      // Q5 BEAT B — he notices
      nar('kt-ch26-l4-q5',
        'He looked at the water on the floor with wide, bright eyes.',
        '他睜大明亮的眼睛,看著地板上的水。'),
      // Q6 mc paraphrase about his reaction
      mc('kt-ch26-l4-q6',
        'Most people would have called for a cloth to wipe it up.',
        'What did most people do when bath water spilled?',
        ['ignore the water', 'ask for a cloth to wipe it', 'pour more water in', 'leave the bath fast'],
        ['不理那些水', '找布擦掉', '倒更多水進去', '快速離開浴缸'],
        1,
        '推理: called for cloth to wipe → 找布擦掉 (paraphrase)。'),
      // Q7 BEAT C — but he stops to think
      nar('kt-ch26-l4-q7',
        'But Archimedes stopped, and his heart started to beat fast.',
        '但 Archimedes 停下來,心跳開始加快。'),
      // Q8 mc paraphrase about what he sees
      mc('kt-ch26-l4-q8',
        'The water on the floor looked just the size of his body in the tub.',
        'What did the spilled water match in size?',
        ['only his hand', 'as much room as he took up', 'just his head', 'the entire bath house'],
        ['只有手', '跟他佔的空間一樣多', '只有頭', '整個澡堂'],
        1,
        '推理: water = size of his body in the tub → 他佔的空間一樣多 (paraphrase)。'),
      // Q9 BEAT D — his mind starts to race
      nar('kt-ch26-l4-q9',
        'His tired eyes lit up. The puzzle in his head began to move.',
        '他疲倦的眼睛亮了起來。腦中的謎題開始有動靜。'),
      // Q10 emoji — his face
      emoji('kt-ch26-l4-q10',
        'How did Archimedes\' face look in that moment?',
        'How did his face look?',
        ['😴 sleepy', '💡 lit up with an idea', '😡 angry', '😢 sad'],
        ['想睡', '靈感亮了起來', '生氣', '難過'],
        1,
        '眼睛亮起來 + 謎題有動靜 → 靈感亮了起來。'),
      // Q11 HOOK — B4 期待加速
      nar('kt-ch26-l4-q11',
        'He sat very still in the water. Then, in one quick breath, the idea came...',
        '他在水中靜止不動。然後,一個快速的吸氣,點子來了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch26-5: Eureka! (B1 物理懸念)
  // Hook: 跳出來大喊 'Eureka!' → 為什麼?
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch26-l5', chapter: 26, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'archimedes-eureka',
    storyBeat: '想通了! 跳出浴缸大喊 Eureka!',
    questions: [
      vocabIntro('kt-ch26-l5-q1', [
        ['點子', 'idea'],
        ['大小', 'size'],
        ['重量', 'weight'],
        ['大喊', 'shout'],
      ]),
      // Q2 BEAT A — he speaks the idea aloud
      nar('kt-ch26-l5-q2',
        '"The water that came out is the same size as my body in the tub!"',
        '「溢出來的水,大小就跟我在浴缸裡的身體一樣!」'),
      // Q3 mc paraphrase about the key idea
      mc('kt-ch26-l5-q3',
        'Now he knew. Gold and silver have different sizes for the same weight.',
        'What was the secret Archimedes found?',
        ['gold and silver have the same size', 'same weight can have different size', 'gold floats but silver sinks', 'silver is always bigger'],
        ['金和銀大小一樣', '相同重量可以有不同大小', '金浮銀沉', '銀總是比較大'],
        1,
        '推理: same weight, different sizes → 相同重量可以有不同大小 (paraphrase)。'),
      // Q4 TF inference (action — he plans)
      tf('kt-ch26-l5-q4',
        'He saw in his mind the crown going into a bowl of water.',
        '他在腦中看見王冠放進一碗水裡。',
        'Was Archimedes already planning a test?', 'Y',
        '推理: 在腦中看見王冠放進水 → 已經在計畫測試 → 答 Yes'),
      // Q5 BEAT B — applies to the crown
      nar('kt-ch26-l5-q5',
        'He could put the crown in water and watch the water rise.',
        '他可以把王冠放進水裡,看水位升高。'),
      // Q6 mc paraphrase about the test
      mc('kt-ch26-l5-q6',
        'If pure gold of the same weight pushed up less water, the crown was not pure.',
        'How could Archimedes tell if the crown was pure?',
        ['use smell', 'watch how the water level moved', 'check its color in the sun', 'listen to its sound when tapped'],
        ['用聞的', '看水位變化', '看陽光下的顏色', '聽敲的聲音'],
        1,
        '推理: how much water rose → 看水位變化 (paraphrase)。'),
      // Q7 BEAT C — burst of joy
      nar('kt-ch26-l5-q7',
        'A huge smile broke across his face.',
        '一個巨大的笑容綻放在他臉上。'),
      // Q8 mc paraphrase about his joy
      mc('kt-ch26-l5-q8',
        'He felt the kind of happy you feel when a long question finally opens.',
        'How did Archimedes feel at this moment?',
        ['quiet and sad', 'as happy as solving a long puzzle', 'sleepy and slow', 'cold and tired'],
        ['安靜難過', '像解開長久謎題一樣開心', '想睡很慢', '冷又累'],
        1,
        '推理: long question finally opens → 像解開長久謎題一樣開心 (paraphrase)。'),
      // Q9 BEAT D — he jumps out and shouts
      nar('kt-ch26-l5-q9',
        'He jumped out of the bath and called out, "Eureka! Eureka!"',
        '他從浴缸裡跳出來,大喊「Eureka! Eureka!」'),
      // Q10 emoji — meaning of 'Eureka'
      emoji('kt-ch26-l5-q10',
        'In old Greek, "Eureka" means what?',
        '"Eureka" 的意思是什麼?',
        ['💤 I am sleepy', '💡 I have found it', '😡 I am angry', '🍎 I want food'],
        ['我想睡', '我找到了!', '我生氣', '我要吃的'],
        1,
        '"Eureka" 是古希臘文「我找到了!」'),
      // Q11 HOOK — B1 物理懸念
      nar('kt-ch26-l5-q11',
        'He ran to find the king, with his big idea ready to share...',
        '他跑去找國王,把大發現準備好要分享……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch26-6: Telling the king + the test (B2 情緒翻轉)
  // Hook: 跑去找國王告訴秘密 → 王冠真假終於揭曉
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch26-l6', chapter: 26, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'archimedes-eureka',
    storyBeat: '把發現告訴國王 — 試驗王冠真假',
    questions: [
      vocabIntro('kt-ch26-l6-q1', [
        ['跑', 'run'],
        ['皇宮', 'palace'],
        ['計畫', 'plan'],
        ['碗', 'bowl'],
      ]),
      // Q2 BEAT A
      nar('kt-ch26-l6-q2',
        'Archimedes ran to the palace with a big smile on his face.',
        'Archimedes 帶著大大的笑容跑到皇宮。'),
      // Q3 mc paraphrase about how he tells the king
      mc('kt-ch26-l6-q3',
        'He told the king his plan in clear, simple words.',
        'How did Archimedes explain his plan?',
        ['in songs and rhymes', 'in plain easy words', 'in a long letter', 'with no words at all'],
        ['用歌曲和押韻', '用簡單清楚的話', '用一封長信', '完全不用話'],
        1,
        '推理: clear simple words → 簡單清楚 (paraphrase)。'),
      // Q4 TF inference (action — king listens carefully)
      tf('kt-ch26-l6-q4',
        'The king leaned forward in his big chair to hear every word.',
        '國王在大椅子上身體前傾,要聽每個字。',
        'Was the king very interested in the plan?', 'Y',
        '推理: 身體前傾聽每個字 → 很感興趣 → 答 Yes'),
      // Q5 BEAT B — they get tools
      nar('kt-ch26-l6-q5',
        'The king brought a wide bowl of water to the room.',
        '國王拿了一個寬寬的水碗來房間。'),
      // Q6 mc paraphrase about the test setup
      mc('kt-ch26-l6-q6',
        'Beside the crown they placed a piece of pure gold of the same weight.',
        'What did they put next to the crown?',
        ['a copper coin', 'pure gold of equal weight', 'a wooden block', 'a glass of milk'],
        ['一個銅幣', '一塊重量相同的純金', '一個木塊', '一杯牛奶'],
        1,
        '推理: pure gold of the same weight → 純金, 重量相同 (paraphrase)。'),
      // Q7 BEAT C — the test
      nar('kt-ch26-l6-q7',
        'They put the crown in the bowl first. They marked the water line.',
        '他們先把王冠放進碗裡,記下水面位置。'),
      // Q8 mc paraphrase about result
      mc('kt-ch26-l6-q8',
        'Then they put in the pure gold. The water rose to a lower mark.',
        'What did the water do for the pure gold?',
        ['ended at the same line', 'stopped lower than before', 'dropped down to zero', 'stayed totally still'],
        ['升到一樣高', '停在比較低的位置', '降到零', '完全不動'],
        1,
        '推理: rose to lower mark → 停在比較低的位置 (paraphrase, X3-safe)。'),
      // Q9 BEAT D — truth revealed
      nar('kt-ch26-l6-q9',
        'The two amounts of water were not the same. The crown was not pure gold.',
        '兩次水量不一樣。王冠不是純金。'),
      // Q10 emoji — king's feeling
      emoji('kt-ch26-l6-q10',
        'How did the king feel about knowing the truth?',
        'How did the king feel?',
        ['😴 sleepy', '🤝 thankful for the answer', '🎵 like singing', '😢 sad'],
        ['想睡', '感謝得到答案', '想唱歌', '難過'],
        1,
        '國王終於知道真相 → 感謝得到答案。'),
      // Q11 HOOK — B2 情緒翻轉
      nar('kt-ch26-l6-q11',
        'The king turned to Archimedes and held out his hand with a soft smile...',
        '國王轉向 Archimedes,溫和微笑著伸出手……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch26-7: A gift to science (B6 open)
  // Hook: 浮力法則改變科學 → 學到觀察
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch26-l7', chapter: 26, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'archimedes-eureka',
    storyBeat: '法則傳到今天 — 每個玩水的小孩都像他',
    questions: [
      vocabIntro('kt-ch26-l7-q1', [
        ['謝謝', 'thank'],
        ['科學', 'science'],
        ['法則', 'law'],
        ['今天', 'today'],
      ]),
      // Q2 BEAT A
      nar('kt-ch26-l7-q2',
        'The king thanked Archimedes for finding the truth.',
        '國王感謝 Archimedes 找到真相。'),
      // Q3 mc paraphrase about what changes
      mc('kt-ch26-l7-q3',
        'The rule from that bath became part of science forever.',
        'What happened to the rule from the bath?',
        ['it was forgotten the next day', 'it is still used by people today', 'only the king kept it safe', 'it was hidden away in secret'],
        ['第二天就忘了', '人們今天還在用', '只有國王安全收著', '被當秘密藏起來'],
        1,
        '推理: became part of science forever → 今天還在用 (paraphrase, X3-safe)。'),
      // Q4 TF inference (atmosphere — still alive today)
      tf('kt-ch26-l7-q4',
        'Boats, ships, and even small toys still use this rule today.',
        '船、大船,還有小玩具,今天還在用這個法則。',
        'Is Archimedes\' rule still used in the world?', 'Y',
        '推理: 還在用 → 今天還在用 → 答 Yes'),
      // Q5 BEAT B — it has a name
      nar('kt-ch26-l7-q5',
        'We still call it Archimedes\' law today.',
        '我們今天還叫它 Archimedes 法則 (浮力法則)。'),
      // Q6 mc paraphrase about the lesson
      mc('kt-ch26-l7-q6',
        'The big idea came from a small thing he saw with care.',
        'Where did the big idea come from?',
        ['a magic spell', 'careful watching of a small thing', 'an old thick book', 'a noon-time dream'],
        ['一個魔法', '仔細觀察一件小事', '一本厚厚的舊書', '一個午後的夢'],
        1,
        '推理: small thing he saw with care → 仔細觀察一件小事 (paraphrase)。'),
      // Q7 BEAT C — the moral for kids
      nar('kt-ch26-l7-q7',
        'And every kid who tries an idea in the bath is a little like him.',
        '每個在浴缸裡試點子的小孩,都有一點像他。'),
      // Q8 mc paraphrase about why this matters
      mc('kt-ch26-l7-q8',
        'A bath, a bowl, a puddle — anywhere can be a tiny science lab.',
        'Where can a small science lesson happen?',
        ['only in big school rooms', 'only in a king\'s palace', 'in small everyday places', 'only at night-time'],
        ['只有在大學校', '只有在國王皇宮', '在日常的小地方', '只有晚上'],
        2,
        '推理: bath, bowl, puddle, anywhere → 日常的小地方 (paraphrase)。'),
      // Q9 BEAT D — closing thought
      nar('kt-ch26-l7-q9',
        'All you need are open eyes and a head full of why.',
        '你需要的,只是張開眼睛,跟一顆充滿「為什麼」的腦袋。'),
      // Q10 emoji — what the story teaches
      emoji('kt-ch26-l7-q10',
        'What is the main lesson from Archimedes?',
        'What does the story teach?',
        ['👀 watch small things closely', '💰 buy more gold', '🏃 run very fast', '🍔 eat a big meal'],
        ['仔細觀察小事', '買更多金子', '跑很快', '吃大餐'],
        0,
        '故事的重點 → 仔細觀察小事就能發現大道理。'),
      // Q11 HOOK — B6 open (kid invitation)
      nar('kt-ch26-l7-q11',
        'What small thing did you notice today? It might be the start of a big idea...',
        '你今天有沒有注意到什麼小事?那可能就是大發現的起點……'),
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
console.log(`     narration: ${narCount}, listen-mc: ${mcCount}, listen-tf: ${tfCount},`);
console.log(`     emoji-pick: ${emojiCount}, tap-pairs: ${vocabCount}`);
