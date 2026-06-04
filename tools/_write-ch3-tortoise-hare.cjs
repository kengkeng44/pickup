#!/usr/bin/env node
/**
 * Ch3 — The Tortoise and the Hare (龜兔賽跑)
 *
 * Per docs/canon/tortoise-hare.md + docs/canon/tortoise-hare-cuts.md.
 * 7 lessons × 11 Q, dialogue-heavy voice (lots of "X said" inside narration).
 * Hook cuts per L1-L7 from cuts md (B2/B5 重 = mock→bold pivots inside speech).
 *
 * Same skeleton as _write-ch1-momotaro.cjs (vocab→nar→tf→mc...→hook).
 *
 * A2 vocab guard:
 *   boasted → said loud / mocked → laughed at / dared → asked to fight /
 *   scorned → looked down / trudged → walked slow / victorious → the winner.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch3.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch3', 'tortoise-hare'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch3', 'tortoise-hare', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch3', 'tortoise-hare'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch3', 'tortoise-hare', 'gist'],
    subSkill: 'gist' };
}
function inferLc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch3', 'tortoise-hare'],
    subSkill: 'inference' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch3', 'tortoise-hare', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch3', 'tortoise-hare', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch3-1 — Beat 1 (Setup: Boastful Hare) → cut B2 mock→bold pivot
  // Hook: "I will race you," he says.
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch3-l1', chapter: 3, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'tortoise-hare',
    storyBeat: '兔子愛現,烏龜怎敢挑戰?',
    questions: [
      vocabIntro('kt-ch3-l1-q1', [
        ['快', 'fast'],
        ['慢', 'slow'],
        ['笑', 'laugh'],
        ['田野', 'field'],
      ]),
      nar('kt-ch3-l1-q2',
        'Every day, the hare jumped fast across the open field.',
        '每天,兔子在田野上飛快地跳。'),
      nar('kt-ch3-l1-q3',
        '"Look at me! I am the fastest!" he said loud to the other animals.',
        '「看我!我最快!」他大聲對其他動物說。'),
      tf('kt-ch3-l1-q4',
        'No animal said a word back, and they all looked at the ground.',
        '沒有動物回話,大家都低頭看地。',
        'Did the other animals enjoy his words?', 'N',
        '推理:沒人回話 + 低頭 → 不喜歡聽 → 答 No'),
      nar('kt-ch3-l1-q5',
        'A tortoise walked by, slow and quiet, on the side of the path.',
        '一隻烏龜慢慢走過,安靜走在路邊。'),
      mc('kt-ch3-l1-q6',
        'Step by step, his short legs moved without any sound.',
        'How did the tortoise move?',
        ['fast and loud', 'slow and quiet', 'angry and fast', 'sleepy and still'],
        ['又快又大聲', '又慢又安靜', '又氣又快', '又睏又不動'],
        1,
        '一步一步無聲音 → 又慢又安靜。'),
      nar('kt-ch3-l1-q7',
        '"Hello, slow one," the hare laughed. "Can you even walk?"',
        '「嗨,慢慢仔,」兔子笑著說。「你會走路嗎?」'),
      emoji('kt-ch3-l1-q8',
        'How did the hare treat the tortoise?',
        'How did the hare treat him?',
        ['😂 laughed at him', '🤝 helped him', '🎁 gave a gift', '🤫 stayed silent'],
        ['笑他', '幫他', '送禮物', '保持安靜'],
        0,
        '兔子笑著問 → 笑他。'),
      mc('kt-ch3-l1-q9',
        'The hare bent down close to the tortoise\'s small head, still smiling.',
        'How close was the hare to the tortoise?',
        ['very far', 'very close', 'inside his shell', 'on a tree'],
        ['很遠', '很近', '在殼裡', '樹上'],
        1,
        '彎下身靠近 → 很近。'),
      gist('kt-ch3-l1-q10',
        'The big rabbit teased the small green animal in front of the whole field.',
        'What is happening in this scene?',
        ['a quiet morning walk',
         'the hare laughing at the tortoise',
         'a peaceful animal meeting',
         'a fight between birds'],
        ['安靜的早晨散步', '兔子嘲笑烏龜', '動物和平聚會', '鳥之間打架'],
        1,
        '主旨 = 兔子在大家面前笑烏龜。'),
      // Q11 HOOK (B2 情緒翻轉 — mock 被反挑戰)
      nar('kt-ch3-l1-q11',
        'The tortoise looked up at him. "I will race you," he said, slow and sure...',
        '烏龜抬頭看他。「我來和你比賽,」他緩慢而堅定地說……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch3-2 — Beat 2+3 (Challenge set + start) → cut B3 information gap
  // Hook: hare bolts ahead, tortoise one step
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch3-l2', chapter: 3, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'tortoise-hare',
    storyBeat: '比賽開始 — 差距這麼大,追得上嗎?',
    questions: [
      vocabIntro('kt-ch3-l2-q1', [
        ['比賽', 'race'],
        ['樹', 'tree'],
        ['法官', 'judge'],
        ['看', 'watch'],
      ]),
      nar('kt-ch3-l2-q2',
        'The hare fell over laughing. "You? Race me?" he said again and again.',
        '兔子笑到倒在地上。「你?跟我比賽?」他一直說一直說。'),
      tf('kt-ch3-l2-q3',
        'His ears shook hard from his loud laughing.',
        '他的耳朵因為大笑而劇烈晃動。',
        'Did the hare believe the tortoise could win?', 'N',
        '推理:大笑到耳朵搖 → 完全不相信 → 答 No'),
      nar('kt-ch3-l2-q4',
        '"Yes. Tomorrow, at the big tree," the tortoise said quietly.',
        '「對,明天,大樹那邊,」烏龜安靜地說。'),
      mc('kt-ch3-l2-q5',
        'A clever fox said he would stand at the finish line and call the winner.',
        'What was the fox\'s job?',
        ['to run too', 'to be the judge', 'to time the race', 'to give a prize'],
        ['也跑', '當裁判', '計時', '頒獎'],
        1,
        '站終點線喊贏家 → 當裁判。'),
      nar('kt-ch3-l2-q6',
        'The next morning, all the animals came to the field to watch.',
        '隔天早上,所有動物都來田野看比賽。'),
      emoji('kt-ch3-l2-q7',
        'Who was at the race?',
        'Who was at the race?',
        ['👥 lots of animals', '🐰 only the hare', '🐢 only the tortoise', '🌳 only trees'],
        ['很多動物', '只有兔子', '只有烏龜', '只有樹'],
        0,
        '所有動物都來 → 很多動物。'),
      nar('kt-ch3-l2-q8',
        '"Ready, set, go!" the fox called out in a clear voice.',
        '「預備,開始!」狐狸用清楚的聲音喊。'),
      mc('kt-ch3-l2-q9',
        'In one minute, the brown hare was a small dot ahead on the road.',
        'How fast did the hare go?',
        ['very slow', 'very fast', 'backwards', 'sideways'],
        ['非常慢', '非常快', '倒退', '橫著走'],
        1,
        '一分鐘就變遠處小點 → 非常快。'),
      inferLc('kt-ch3-l2-q10',
        'The tortoise lifted one foot, then put it down. Then the next foot. Then the next.',
        'Why did the tortoise still keep going?',
        ['he gave up already', 'he had a steady plan',
         'he was lost', 'he was sleeping'],
        ['他已經放棄了', '他有穩定的計畫',
         '他迷路了', '他在睡覺'],
        1,
        '推理:一腳一腳穩穩走 → 他有穩定的計畫。'),
      // Q11 HOOK (B3 資訊缺口 — 差距大到看不下去)
      nar('kt-ch3-l2-q11',
        'The hare was already far away. The tortoise had taken only one step...',
        '兔子已經跑遠了。烏龜才走了一步……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch3-3 — Beat 4 (Nap) → cut B5 moral dilemma (hare really sleeping?)
  // Hook: he sits down, eyes close
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch3-l3', chapter: 3, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'tortoise-hare',
    storyBeat: '兔子停下休息 — 他真的要睡?',
    questions: [
      vocabIntro('kt-ch3-l3-q1', [
        ['休息', 'rest'],
        ['太陽', 'sun'],
        ['暖', 'warm'],
        ['睡', 'sleep'],
      ]),
      nar('kt-ch3-l3-q2',
        'The hare looked back. The tortoise was a tiny dot far away on the road.',
        '兔子回頭看。烏龜是路上遠遠一個小小的點。'),
      tf('kt-ch3-l3-q3',
        'He could not even see the tortoise\'s shell from this far ahead.',
        '從這麼遠他連烏龜的殼都看不到。',
        'Was the gap between them small?', 'N',
        '推理:看不到殼 → 距離非常大 → 答 No'),
      nar('kt-ch3-l3-q4',
        '"I have time," the hare said to himself. "I will rest under this tree."',
        '「我有時間,」兔子對自己說。「我要在這棵樹下休息。」'),
      mc('kt-ch3-l3-q5',
        'He thought there was no chance the small animal could ever pass him.',
        'Why did the hare want to rest?',
        ['he was hurt', 'he felt safe and ahead',
         'he heard a sound', 'his friend called him'],
        ['他受傷', '他覺得安全又領先',
         '他聽到聲音', '朋友叫他'],
        1,
        '覺得小動物追不上 → 安全又領先。'),
      nar('kt-ch3-l3-q6',
        'The grass was soft. The sun was warm on his fur.',
        '草很軟。太陽曬在他毛上很溫暖。'),
      emoji('kt-ch3-l3-q7',
        'What was the weather like?',
        'What was the weather like?',
        ['☀️ sunny and warm', '🌧️ rainy', '❄️ cold and snowy', '🌪️ windy storm'],
        ['晴朗溫暖', '下雨', '寒冷下雪', '狂風暴雨'],
        0,
        '太陽曬得暖暖 → 晴朗溫暖。'),
      nar('kt-ch3-l3-q8',
        '"I will wake up in a moment," he said with a long, slow yawn.',
        '「我等一下就起來,」他打了個又長又慢的呵欠說。'),
      mc('kt-ch3-l3-q9',
        'His head dropped down onto his paws, soft and heavy.',
        'What was happening to the hare?',
        ['he was waking up', 'he was falling asleep',
         'he was running again', 'he was eating lunch'],
        ['他在醒來', '他在睡著',
         '他又開始跑', '他在吃午餐'],
        1,
        '頭垂在腳上 + 重 → 在睡著。'),
      gist('kt-ch3-l3-q10',
        'Far ahead of the race, the rabbit chose to take a nap under the shade.',
        'What is this scene mainly about?',
        ['the tortoise running fast',
         'the hare deciding to sleep',
         'the fox calling the winner',
         'the animals going home'],
        ['烏龜跑得快', '兔子決定睡覺',
         '狐狸宣布贏家', '動物回家'],
        1,
        '主旨 = 兔子決定睡覺。'),
      // Q11 HOOK (B5 道德兩難 — 真的睡了?)
      nar('kt-ch3-l3-q11',
        'He sat down on the soft grass. His eyes closed slowly...',
        '他坐在軟軟的草地上。他的眼睛慢慢閉上了……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch3-4 — Beat 5 (Plod past) → cut B6 prophecy seed (gap closing?)
  // Hook: feet move one after the other, slow and sure
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch3-l4', chapter: 3, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'tortoise-hare',
    storyBeat: '烏龜走過 — 兔子要醒了嗎?',
    questions: [
      vocabIntro('kt-ch3-l4-q1', [
        ['走過', 'past'],
        ['停', 'stop'],
        ['腳', 'feet'],
        ['確定', 'sure'],
      ]),
      nar('kt-ch3-l4-q2',
        'The tortoise came up to the tree. He saw the sleeping hare.',
        '烏龜走到樹下。他看到睡著的兔子。'),
      tf('kt-ch3-l4-q3',
        'His shell was hot from the long walk in the bright sun.',
        '走了好久的太陽路,他的殼很熱。',
        'Did the tortoise walk a long way?', 'Y',
        '推理:走到殼變熱 → 走很久很遠 → 答 Yes'),
      nar('kt-ch3-l4-q4',
        '"He is resting," the tortoise said quietly. "I will not stop."',
        '「他在休息,」烏龜小聲說。「我不會停下來。」'),
      mc('kt-ch3-l4-q5',
        'He did not look at the rabbit\'s soft fur or his white teeth.',
        'What did the tortoise do?',
        ['woke the hare up', 'kept his eyes on the road',
         'lay down too', 'ran home'],
        ['叫醒兔子', '眼睛看著路',
         '也躺下', '跑回家'],
        1,
        '不看兔子 → 眼睛看著路。'),
      nar('kt-ch3-l4-q6',
        'One foot moved. Then the other foot. Then the first one again.',
        '一隻腳動。然後另一隻。然後第一隻又動。'),
      emoji('kt-ch3-l4-q7',
        'How did the tortoise keep moving?',
        'How did he keep moving?',
        ['🦶 one foot at a time', '🚀 flying', '⛵ on a boat', '🐎 on a horse'],
        ['一次一隻腳', '飛', '搭船', '騎馬'],
        0,
        '一隻一隻腳交替 → 一次一隻腳。'),
      nar('kt-ch3-l4-q8',
        'Behind him, the field was silent. The hare did not move at all.',
        '他身後,田野很安靜。兔子完全沒動。'),
      mc('kt-ch3-l4-q9',
        'The brown ears stayed flat on the soft grass beside the tree.',
        'Was the hare still asleep?',
        ['no, he woke up', 'yes, deeply asleep',
         'he ran away', 'he started crying'],
        ['不,他醒了', '是,睡得很沉',
         '他跑走了', '他開始哭'],
        1,
        '耳朵平貼草地 → 睡得很沉。'),
      inferLc('kt-ch3-l4-q10',
        'The tortoise did not look back. He kept his eyes on the tree far ahead.',
        'Why did the tortoise not look back?',
        ['he could not turn his head', 'he was scared',
         'he wanted to stay focused', 'he was lost'],
        ['他頭轉不過去', '他害怕',
         '他想保持專心', '他迷路'],
        2,
        '推理:不回頭 + 眼睛看前面樹 → 他想保持專心。'),
      // Q11 HOOK (B6 預言種子 — slow but sure 暗示要追上)
      nar('kt-ch3-l4-q11',
        'His feet moved one after the other, slow and sure. The finish tree grew closer...',
        '他的腳一隻接一隻地動,慢慢但很穩。終點的樹越來越近……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch3-5 — Beat 5 continued (whisper) → cut B5 moral dilemma (wake him?)
  // Hook: "Is the hare still sleeping?"
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch3-l5', chapter: 3, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'tortoise-hare',
    storyBeat: '動物悄悄話 — 沒人叫醒他嗎?',
    questions: [
      vocabIntro('kt-ch3-l5-q1', [
        ['動物', 'animal'],
        ['悄悄話', 'whisper'],
        ['醒', 'wake'],
        ['仍然', 'still'],
      ]),
      nar('kt-ch3-l5-q2',
        'On the side of the field, the watching animals began to move closer.',
        '在田野旁邊,看比賽的動物開始靠近一點。'),
      tf('kt-ch3-l5-q3',
        'A small bird turned its head toward the sleeping rabbit and then away.',
        '一隻小鳥把頭轉向睡著的兔子,然後又轉開。',
        'Were the animals looking at the hare?', 'Y',
        '推理:小鳥把頭轉向他 → 在看他 → 答 Yes'),
      nar('kt-ch3-l5-q4',
        '"Look! The tortoise has passed him!" a small fox whispered.',
        '「看!烏龜超過他了!」一隻小狐狸悄悄說。'),
      mc('kt-ch3-l5-q5',
        'A mouse opened her mouth, then closed it without making a sound.',
        'Why did the mouse close her mouth?',
        ['she was eating', 'she did not want to wake him',
         'she fell asleep too', 'she lost her voice'],
        ['她在吃東西', '她不想叫醒他',
         '她也睡著了', '她沒聲音了'],
        1,
        '推理:張嘴又閉嘴 → 想出聲又忍住 → 不想叫醒兔子。'),
      nar('kt-ch3-l5-q6',
        'No animal called out. No animal moved. The wind was the only sound.',
        '沒有動物喊叫。沒有動物動。只有風的聲音。'),
      emoji('kt-ch3-l5-q7',
        'How was the field?',
        'How was the field?',
        ['🤫 very quiet', '🎉 noisy and fun', '🌧️ rainy', '🔥 on fire'],
        ['非常安靜', '吵又熱鬧', '下雨', '著火'],
        0,
        '沒人喊 + 只有風聲 → 非常安靜。'),
      nar('kt-ch3-l5-q8',
        'The tortoise was now closer to the big tree than to the sleeping hare.',
        '烏龜現在離大樹比離睡著的兔子還近。'),
      mc('kt-ch3-l5-q9',
        'The green back of the slow walker was the closest thing to the finish line.',
        'Who was closer to the finish?',
        ['the brown jumper', 'the small green animal', 'the fox judge', 'no one'],
        ['棕色跳跳客', '綠色小動物', '狐狸裁判', '沒人'],
        1,
        '綠色背 + 走得慢 → 綠色小動物 = 烏龜。'),
      inferLc('kt-ch3-l5-q10',
        'The animals watched the tortoise. None of them turned around to look at the hare.',
        'Why did no one wake the hare?',
        ['they were too far', 'they wanted a fair race',
         'they did not see him', 'they were sleeping too'],
        ['他們太遠', '他們想公平比賽',
         '他們沒看到他', '他們也在睡'],
        1,
        '推理:都不轉頭叫他 → 他們想公平比賽。'),
      // Q11 HOOK (B5 — 該不該叫醒?)
      nar('kt-ch3-l5-q11',
        'Then a young rabbit\'s voice broke the silence. "Is the hare still sleeping?"',
        '然後一隻小兔子的聲音打破安靜。「兔子哥還在睡嗎?」'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch3-6 — Beat 6 (Wake) → cut B2 emotional flip (calm → panic)
  // Hook: tortoise is at the big tree
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch3-l6', chapter: 3, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'tortoise-hare',
    storyBeat: '兔子醒了 — 來得及嗎?',
    questions: [
      vocabIntro('kt-ch3-l6-q1', [
        ['打開', 'open'],
        ['路', 'road'],
        ['飛', 'fly'],
        ['風', 'wind'],
      ]),
      nar('kt-ch3-l6-q2',
        'The hare opened his eyes. The sun was low in the sky.',
        '兔子張開眼睛。太陽已經低低掛在天上。'),
      tf('kt-ch3-l6-q3',
        'Long shadows from the trees stretched across the whole road.',
        '樹的長影子拉得整條路都是。',
        'Did the hare sleep for a short time?', 'N',
        '推理:太陽變低 + 長影子 → 睡很久 → 答 No'),
      nar('kt-ch3-l6-q4',
        'He looked down the road. His mouth fell open.',
        '他看著前面的路。嘴巴張得大大的。'),
      mc('kt-ch3-l6-q5',
        'A tiny green shape was almost touching the big tree at the end.',
        'What did he see?',
        ['the tortoise near the finish',
         'the fox running away',
         'another sleeping rabbit',
         'his lunch on the road'],
        ['烏龜快到終點', '狐狸跑掉',
         '另一隻睡著的兔子', '路上的午餐'],
        0,
        '小綠物快碰到大樹 → 烏龜快到終點。'),
      nar('kt-ch3-l6-q6',
        '"No! No, no, no!" The hare jumped up from the grass.',
        '「不!不不不!」兔子從草地上跳起來。'),
      emoji('kt-ch3-l6-q7',
        'How did the hare feel?',
        'How did the hare feel?',
        ['😱 in a panic', '😴 still sleepy', '😄 very happy', '😐 bored'],
        ['很慌張', '還在想睡', '很開心', '無聊'],
        0,
        '叫出「不!不不不!」+ 跳起來 → 很慌張。'),
      nar('kt-ch3-l6-q8',
        'His legs flew as fast as they had ever moved.',
        '他的腿動得比以前任何時候都快。'),
      mc('kt-ch3-l6-q9',
        'The wind pushed his long ears flat behind his head.',
        'How fast was the hare running now?',
        ['slower than before', 'faster than ever',
         'walking', 'standing still'],
        ['比之前慢', '比以前任何時候都快',
         '在走', '站著不動'],
        1,
        '風把耳朵壓平 → 比以前任何時候都快。'),
      inferLc('kt-ch3-l6-q10',
        'The hare ran very fast, but the big tree was very close to the tortoise, not him.',
        'Could the hare win now?',
        ['yes, easily',
         'no, the tortoise is too close',
         'maybe, if he flies',
         'we cannot tell'],
        ['是,輕鬆贏',
         '不,烏龜太靠近終點了',
         '也許,如果他會飛',
         '看不出來'],
        1,
        '推理:樹靠近烏龜不是兔子 → 不,烏龜太靠近終點。'),
      // Q11 HOOK (B2 情緒翻轉 — 領先 → 來不及)
      nar('kt-ch3-l6-q11',
        'The hare ran with all his strength. But the tortoise was at the big tree...',
        '兔子用盡全力跑。但烏龜已經到了大樹邊……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch3-7 — Beat 7 (Finish) → cut B2 big flip (panic → triumph)
  // Hook: "Slow and steady wins the race." + open after-hook
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch3-l7', chapter: 3, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'tortoise-hare',
    storyBeat: '慢而穩 — 兔子學到了嗎?',
    questions: [
      vocabIntro('kt-ch3-l7-q1', [
        ['最後', 'last'],
        ['碰', 'touch'],
        ['呼吸', 'breath'],
        ['穩', 'steady'],
      ]),
      nar('kt-ch3-l7-q2',
        'The tortoise lifted one short leg for the last time.',
        '烏龜最後一次抬起他短短的腳。'),
      tf('kt-ch3-l7-q3',
        'His foot came down right at the bottom of the big tree.',
        '他的腳剛好踩在大樹的樹根邊。',
        'Did the tortoise reach the finish?', 'Y',
        '推理:腳落在樹根邊 → 到終點 → 答 Yes'),
      nar('kt-ch3-l7-q4',
        'The fox lifted a paw. "The tortoise wins!" he called out.',
        '狐狸舉起一隻腳。「烏龜贏了!」他大聲喊。'),
      mc('kt-ch3-l7-q5',
        'Every animal at the field began to cheer and stamp their feet.',
        'How did the animals feel?',
        ['scared', 'sleepy', 'excited and happy', 'sad'],
        ['害怕', '想睡', '興奮又開心', '難過'],
        2,
        '又喊又跺腳 → 興奮又開心。'),
      nar('kt-ch3-l7-q6',
        'The hare arrived a moment later. He could not even speak.',
        '兔子晚一點才到。他連話都說不出來。'),
      emoji('kt-ch3-l7-q7',
        'Why could the hare not speak?',
        'Why could the hare not speak?',
        ['😮‍💨 out of breath', '🤐 shy', '😡 angry', '🤔 thinking'],
        ['喘到沒氣', '害羞', '生氣', '在想'],
        0,
        '剛拚命跑完 → 喘到沒氣。'),
      nar('kt-ch3-l7-q8',
        'His chest moved up and down very fast. His mouth was open.',
        '他的胸口上下起伏得很快。嘴巴張著。'),
      mc('kt-ch3-l7-q9',
        'The brown rabbit pressed his front paws on the ground and looked at the dirt.',
        'How did the hare feel?',
        ['proud and strong', 'sleepy', 'embarrassed', 'hungry'],
        ['驕傲又強壯', '想睡', '不好意思', '餓'],
        2,
        '低頭看地 + 不說話 → 不好意思。'),
      inferLc('kt-ch3-l7-q10',
        'The tortoise turned his head to the hare and smiled gently.',
        'Why did the tortoise smile gently?',
        ['he was angry',
         'he wanted to share a lesson kindly',
         'he wanted to laugh at him',
         'he was tired'],
        ['他生氣',
         '他想溫和地分享一個道理',
         '他想笑他',
         '他累了'],
        1,
        '推理:溫柔微笑 → 他想溫和地分享一個道理。'),
      // Q11 HOOK (B2 大翻轉 + 開放後鉤 — 兔子學到了嗎?)
      nar('kt-ch3-l7-q11',
        '"Slow and steady wins the race," the tortoise said softly. The hare did not look up...',
        '「慢而穩,就會贏,」烏龜輕輕地說。兔子沒有抬頭……'),
    ],
  },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
const totalQ = lessons.reduce((s, l) => s + l.questions.length, 0);
console.log(`OK   wrote ${OUT}`);
console.log(`     ${lessons.length} lessons / ${totalQ} Q`);
let tfCount = 0, gistCount = 0;
for (const l of lessons) {
  for (const q of l.questions) {
    if (q.type === 'listen-tf') tfCount++;
    if (q.type === 'listen-comprehension' && q.subSkill === 'gist') gistCount++;
  }
}
console.log(`     listen-tf (inference): ${tfCount}, listen-comprehension gist: ${gistCount}`);
