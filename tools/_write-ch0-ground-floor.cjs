#!/usr/bin/env node
/**
 * v2.0.B.237 — Ch0 GROUND FLOOR (零基礎/A0/pre-A1) module.
 *
 * 動機: 原 Ch0 是 outer-prologue (A2 等級 Mochi/Hana 設定故事框), 對絕對零基礎
 * (從未學英文 / 字母都不熟 / 一句完整 English 都讀不下來) 的兒童 / 親子 / 銀髮
 * 用戶來說太難。B.237 新增「ground-floor」7 lessons, 把 A2 prologue 移走,
 * 讓 Ch0 成為「零基礎 ok!」的暖身入口。
 *
 * 7 lessons (~ 11 Q each):
 *   L1: ABC 字母         (a/b/c/d/e + emoji)
 *   L2: 1-10 數字
 *   L3: 顏色 8 色
 *   L4: 動物 8 種
 *   L5: 家庭 6 人
 *   L6: 問候 6 句
 *   L7: 簡單句 (I am happy / I see a cat)
 *
 * 題型 mix: listen-emoji / picture-mc / emoji-pick / narration
 * Mochi 旁白 ("零基礎 ok!" / "慢慢來" / 「貓咪相信你」) 兒童 friendly 不打擊。
 *
 * 語料控制:
 *   - 全 A1 (level: 'A1'), explanationZh 短句 (兒童看得懂)
 *   - 雙語 EN + 中文 並列 (a/b/c → A 蘋果 / B 香蕉 / C 貓)
 *   - 禁出現 jargon、negation、inference 題 (純認讀識別)
 *   - subSkill: 'vocab' (除 narration 外)
 *
 * 輸出: public/lessons-ch0.json (覆蓋原 outer-prologue,backup 在
 *        tools/_backup_lessons-ch0-prologue.json)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch0.json');

// ─── Question builders ──────────────────────────────────────────────────────

function nar(id, en, zh, speaker = 'mochi') {
  return {
    type: 'narration',
    id,
    level: 'A1',
    difficulty: 'easy',
    speaker,
    sentence: en,
    explanationZh: zh,
    tags: ['story', 'ch0', 'ground-floor', 'intro'],
  };
}

// listen-emoji: 聽英文字 -> 選 emoji。option 格式 "🐟 fish"
function listenEmoji(id, sentence, opts, correct, expZh) {
  return {
    type: 'listen-emoji',
    id,
    level: 'A1',
    difficulty: 'easy',
    speaker: 'narrator',
    sentence,
    question: 'Pick the picture',
    options: opts,
    correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch0', 'ground-floor', 'vocab'],
    subSkill: 'vocab',
  };
}

// picture-mc: 看 emoji -> 選英文字 (純 vocab 認讀)
function pictureMc(id, imageEmoji, opts, optsZh, correct, expZh, sentence) {
  return {
    type: 'picture-mc',
    id,
    level: 'A1',
    difficulty: 'easy',
    speaker: 'narrator',
    imageEmoji,
    sentence: sentence ?? 'Look at the picture.',
    question: 'Which word matches?',
    options: opts,
    optionsZh: optsZh,
    correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch0', 'ground-floor', 'vocab'],
    subSkill: 'vocab',
  };
}

// emoji-pick: 簡 vocabulary hook, sentence + 4 emoji options
function emojiPick(id, sentence, question, opts, optsZh, correct, expZh) {
  return {
    type: 'emoji-pick',
    id,
    level: 'A1',
    difficulty: 'easy',
    speaker: 'narrator',
    sentence,
    question,
    options: opts,
    optionsZh: optsZh,
    correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch0', 'ground-floor', 'hook'],
    subSkill: 'vocab',
  };
}

// ─── Lesson 1: ABC 字母 ─────────────────────────────────────────────────────
const lesson1 = {
  id: 'kt-ch0-l1',
  chapter: 0,
  lessonInChapter: 1,
  segmentType: 'outer-prologue',
  storyId: 'ground-floor',
  storyBeat: '零基礎 ok! 我們從 ABC 開始',
  questions: [
    nar('kt-ch0-l1-n00',
      'Welcome! Today we learn A, B, C.',
      '歡迎!今天我們學 A、B、C。零基礎也 ok!'),
    nar('kt-ch0-l1-n01',
      "I am Mochi. Don't worry. We go slow.",
      '我是 Mochi。別擔心,我們慢慢來。'),

    // A
    listenEmoji('kt-ch0-l1-q1',
      'A is for apple.',
      ['🍎 apple', '🐝 bee', '🐱 cat', '🐶 dog'],
      0,
      'A 開頭的字 apple = 蘋果 🍎。'),
    pictureMc('kt-ch0-l1-q2',
      '🍎',
      ['apple', 'bee', 'cat', 'dog'],
      ['蘋果', '蜜蜂', '貓', '狗'],
      0,
      '看到 🍎 → apple = 蘋果。第一個字母 A。',
      'A is the first letter.'),

    // B
    listenEmoji('kt-ch0-l1-q3',
      'B is for bee.',
      ['🍎 apple', '🐝 bee', '🐱 cat', '🐶 dog'],
      1,
      'B 開頭的字 bee = 蜜蜂 🐝。'),
    pictureMc('kt-ch0-l1-q4',
      '🐝',
      ['apple', 'bee', 'cat', 'dog'],
      ['蘋果', '蜜蜂', '貓', '狗'],
      1,
      '看到 🐝 → bee = 蜜蜂。第二個字母 B。',
      'B is the second letter.'),

    // C
    listenEmoji('kt-ch0-l1-q5',
      'C is for cat.',
      ['🍎 apple', '🐝 bee', '🐱 cat', '🐶 dog'],
      2,
      'C 開頭的字 cat = 貓 🐱。'),
    pictureMc('kt-ch0-l1-q6',
      '🐱',
      ['apple', 'bee', 'cat', 'dog'],
      ['蘋果', '蜜蜂', '貓', '狗'],
      2,
      '看到 🐱 → cat = 貓。第三個字母 C。Mochi 也是貓喔!',
      'C is the third letter. Mochi is a cat.'),

    // D
    listenEmoji('kt-ch0-l1-q7',
      'D is for dog.',
      ['🍎 apple', '🐝 bee', '🐱 cat', '🐶 dog'],
      3,
      'D 開頭的字 dog = 狗 🐶。Hana 是狗喔!'),

    // E
    listenEmoji('kt-ch0-l1-q8',
      'E is for egg.',
      ['🥚 egg', '🐝 bee', '🐱 cat', '🍎 apple'],
      0,
      'E 開頭的字 egg = 蛋 🥚。'),
    nar('kt-ch0-l1-n9',
      'Great! You learned A B C D E. Brave!',
      '太棒了!你學會了 A B C D E。好厲害!'),
  ],
};

// ─── Lesson 2: 1-10 數字 ────────────────────────────────────────────────────
const lesson2 = {
  id: 'kt-ch0-l2',
  chapter: 0,
  lessonInChapter: 2,
  segmentType: 'outer-prologue',
  storyId: 'ground-floor',
  storyBeat: '數字 1 到 10',
  questions: [
    nar('kt-ch0-l2-n00',
      'Let us count from one to ten.',
      '我們一起從 1 數到 10。'),

    listenEmoji('kt-ch0-l2-q1',
      'One.',
      ['1️⃣ one', '2️⃣ two', '3️⃣ three', '4️⃣ four'],
      0, 'one = 1 一'),
    listenEmoji('kt-ch0-l2-q2',
      'Two.',
      ['1️⃣ one', '2️⃣ two', '3️⃣ three', '4️⃣ four'],
      1, 'two = 2 二'),
    listenEmoji('kt-ch0-l2-q3',
      'Three.',
      ['1️⃣ one', '2️⃣ two', '3️⃣ three', '4️⃣ four'],
      2, 'three = 3 三'),
    listenEmoji('kt-ch0-l2-q4',
      'Four.',
      ['1️⃣ one', '2️⃣ two', '3️⃣ three', '4️⃣ four'],
      3, 'four = 4 四'),
    listenEmoji('kt-ch0-l2-q5',
      'Five.',
      ['5️⃣ five', '6️⃣ six', '7️⃣ seven', '8️⃣ eight'],
      0, 'five = 5 五'),
    listenEmoji('kt-ch0-l2-q6',
      'Six.',
      ['5️⃣ five', '6️⃣ six', '7️⃣ seven', '8️⃣ eight'],
      1, 'six = 6 六'),
    listenEmoji('kt-ch0-l2-q7',
      'Seven.',
      ['5️⃣ five', '6️⃣ six', '7️⃣ seven', '8️⃣ eight'],
      2, 'seven = 7 七'),
    listenEmoji('kt-ch0-l2-q8',
      'Eight.',
      ['5️⃣ five', '6️⃣ six', '7️⃣ seven', '8️⃣ eight'],
      3, 'eight = 8 八'),
    listenEmoji('kt-ch0-l2-q9',
      'Nine.',
      ['9️⃣ nine', '🔟 ten', '1️⃣ one', '2️⃣ two'],
      0, 'nine = 9 九'),
    listenEmoji('kt-ch0-l2-q10',
      'Ten.',
      ['9️⃣ nine', '🔟 ten', '1️⃣ one', '2️⃣ two'],
      1, 'ten = 10 十。你會從 1 數到 10 了!'),
  ],
};

// ─── Lesson 3: 顏色 ─────────────────────────────────────────────────────────
const lesson3 = {
  id: 'kt-ch0-l3',
  chapter: 0,
  lessonInChapter: 3,
  segmentType: 'outer-prologue',
  storyId: 'ground-floor',
  storyBeat: '8 種顏色',
  questions: [
    nar('kt-ch0-l3-n00',
      'Now we learn colors. Eight colors.',
      '現在我們學顏色。一共 8 個。'),

    listenEmoji('kt-ch0-l3-q1', 'Red.',
      ['🔴 red', '🔵 blue', '🟢 green', '🟡 yellow'],
      0, 'red = 紅色 🔴'),
    listenEmoji('kt-ch0-l3-q2', 'Blue.',
      ['🔴 red', '🔵 blue', '🟢 green', '🟡 yellow'],
      1, 'blue = 藍色 🔵'),
    listenEmoji('kt-ch0-l3-q3', 'Green.',
      ['🔴 red', '🔵 blue', '🟢 green', '🟡 yellow'],
      2, 'green = 綠色 🟢'),
    listenEmoji('kt-ch0-l3-q4', 'Yellow.',
      ['🔴 red', '🔵 blue', '🟢 green', '🟡 yellow'],
      3, 'yellow = 黃色 🟡'),
    listenEmoji('kt-ch0-l3-q5', 'Black.',
      ['⚫ black', '⚪ white', '🟠 orange', '🌸 pink'],
      0, 'black = 黑色 ⚫'),
    listenEmoji('kt-ch0-l3-q6', 'White.',
      ['⚫ black', '⚪ white', '🟠 orange', '🌸 pink'],
      1, 'white = 白色 ⚪'),
    listenEmoji('kt-ch0-l3-q7', 'Orange.',
      ['⚫ black', '⚪ white', '🟠 orange', '🌸 pink'],
      2, 'orange = 橘色 🟠'),
    listenEmoji('kt-ch0-l3-q8', 'Pink.',
      ['⚫ black', '⚪ white', '🟠 orange', '🌸 pink'],
      3, 'pink = 粉紅色 🌸'),

    emojiPick('kt-ch0-l3-q9',
      'Apples are red.',
      'What color?',
      ['🔴 red', '🔵 blue', '🟢 green', '🟡 yellow'],
      ['紅', '藍', '綠', '黃'],
      0, '蘋果通常是紅色 red。'),
    nar('kt-ch0-l3-n10',
      'Eight colors! You did it!',
      '八個顏色都學完了!你做到了!'),
  ],
};

// ─── Lesson 4: 動物 ─────────────────────────────────────────────────────────
const lesson4 = {
  id: 'kt-ch0-l4',
  chapter: 0,
  lessonInChapter: 4,
  segmentType: 'outer-prologue',
  storyId: 'ground-floor',
  storyBeat: '8 種動物',
  questions: [
    nar('kt-ch0-l4-n00',
      'I love animals. Look! Eight friends.',
      '我喜歡動物。看!有 8 個朋友。'),

    listenEmoji('kt-ch0-l4-q1', 'Cat.',
      ['🐱 cat', '🐶 dog', '🐦 bird', '🐟 fish'],
      0, 'cat = 貓 🐱 (Mochi 是貓喔!)'),
    listenEmoji('kt-ch0-l4-q2', 'Dog.',
      ['🐱 cat', '🐶 dog', '🐦 bird', '🐟 fish'],
      1, 'dog = 狗 🐶 (Hana 是狗喔!)'),
    listenEmoji('kt-ch0-l4-q3', 'Bird.',
      ['🐱 cat', '🐶 dog', '🐦 bird', '🐟 fish'],
      2, 'bird = 鳥 🐦'),
    listenEmoji('kt-ch0-l4-q4', 'Fish.',
      ['🐱 cat', '🐶 dog', '🐦 bird', '🐟 fish'],
      3, 'fish = 魚 🐟'),
    listenEmoji('kt-ch0-l4-q5', 'Cow.',
      ['🐄 cow', '🐴 horse', '🐑 sheep', '🐷 pig'],
      0, 'cow = 牛 🐄'),
    listenEmoji('kt-ch0-l4-q6', 'Horse.',
      ['🐄 cow', '🐴 horse', '🐑 sheep', '🐷 pig'],
      1, 'horse = 馬 🐴'),
    listenEmoji('kt-ch0-l4-q7', 'Sheep.',
      ['🐄 cow', '🐴 horse', '🐑 sheep', '🐷 pig'],
      2, 'sheep = 羊 🐑'),
    listenEmoji('kt-ch0-l4-q8', 'Pig.',
      ['🐄 cow', '🐴 horse', '🐑 sheep', '🐷 pig'],
      3, 'pig = 豬 🐷'),

    pictureMc('kt-ch0-l4-q9',
      '🐱',
      ['cat', 'dog', 'fish', 'bird'],
      ['貓', '狗', '魚', '鳥'],
      0,
      '🐱 = cat。Mochi 是隻流浪貓 stray cat。',
      'Look at the picture.'),
    nar('kt-ch0-l4-n10',
      'You know eight animals now. Great job!',
      '八個動物都會了!做得很好!'),
  ],
};

// ─── Lesson 5: 家庭 ─────────────────────────────────────────────────────────
const lesson5 = {
  id: 'kt-ch0-l5',
  chapter: 0,
  lessonInChapter: 5,
  segmentType: 'outer-prologue',
  storyId: 'ground-floor',
  storyBeat: '家庭成員 6 人',
  questions: [
    nar('kt-ch0-l5-n00',
      'Family is warm. Let us meet them.',
      '家人很溫暖。一起認識他們。'),

    listenEmoji('kt-ch0-l5-q1', 'Mother.',
      ['👩 mother', '👨 father', '👧 sister', '👦 brother'],
      0, 'mother = 媽媽 👩'),
    listenEmoji('kt-ch0-l5-q2', 'Father.',
      ['👩 mother', '👨 father', '👧 sister', '👦 brother'],
      1, 'father = 爸爸 👨'),
    listenEmoji('kt-ch0-l5-q3', 'Sister.',
      ['👩 mother', '👨 father', '👧 sister', '👦 brother'],
      2, 'sister = 姐妹 👧'),
    listenEmoji('kt-ch0-l5-q4', 'Brother.',
      ['👩 mother', '👨 father', '👧 sister', '👦 brother'],
      3, 'brother = 兄弟 👦'),
    listenEmoji('kt-ch0-l5-q5', 'Grandma.',
      ['👵 grandma', '👴 grandpa', '👩 mother', '👨 father'],
      0, 'grandma = 奶奶 👵 (拾光裡每晚說故事的奶奶!)'),
    listenEmoji('kt-ch0-l5-q6', 'Grandpa.',
      ['👵 grandma', '👴 grandpa', '👩 mother', '👨 father'],
      1, 'grandpa = 爺爺 👴'),

    pictureMc('kt-ch0-l5-q7',
      '👵',
      ['grandma', 'grandpa', 'sister', 'brother'],
      ['奶奶', '爺爺', '姐妹', '兄弟'],
      0,
      'grandma = 奶奶。她每晚說故事給 Mochi 跟 Hana 聽。',
      'Look at her face.'),
    pictureMc('kt-ch0-l5-q8',
      '👨',
      ['mother', 'father', 'grandma', 'grandpa'],
      ['媽媽', '爸爸', '奶奶', '爺爺'],
      1,
      'father = 爸爸。',
      'Look at the picture.'),
    pictureMc('kt-ch0-l5-q9',
      '👩',
      ['mother', 'father', 'sister', 'brother'],
      ['媽媽', '爸爸', '姐妹', '兄弟'],
      0,
      'mother = 媽媽。',
      'Look at the picture.'),
    nar('kt-ch0-l5-n10',
      'Family. You learned six new words. Brave!',
      '家人。六個新字學會了。好棒!'),
  ],
};

// ─── Lesson 6: 問候 ─────────────────────────────────────────────────────────
const lesson6 = {
  id: 'kt-ch0-l6',
  chapter: 0,
  lessonInChapter: 6,
  segmentType: 'outer-prologue',
  storyId: 'ground-floor',
  storyBeat: '日常問候 6 句',
  questions: [
    nar('kt-ch0-l6-n00',
      'Time to say hello. Six small words.',
      '是時候打招呼了。六個小字。'),

    emojiPick('kt-ch0-l6-q1',
      'Hello! Nice to see you.',
      'Pick the friendly emoji',
      ['👋 hello', '👋 bye', '✅ yes', '❌ no'],
      ['你好', '再見', '是', '不是'],
      0, 'hello = 你好 👋 (見面時說)'),
    emojiPick('kt-ch0-l6-q2',
      'Bye! See you later.',
      'Pick the leaving emoji',
      ['👋 hello', '👋 bye', '✅ yes', '❌ no'],
      ['你好', '再見', '是', '不是'],
      1, 'bye = 再見 👋 (離開時說)'),
    emojiPick('kt-ch0-l6-q3',
      'Yes. I agree.',
      'Pick the agree emoji',
      ['👋 hello', '👋 bye', '✅ yes', '❌ no'],
      ['你好', '再見', '是', '不是'],
      2, 'yes = 是 ✅'),
    emojiPick('kt-ch0-l6-q4',
      'No. I do not want it.',
      'Pick the disagree emoji',
      ['👋 hello', '👋 bye', '✅ yes', '❌ no'],
      ['你好', '再見', '是', '不是'],
      3, 'no = 不是 ❌'),
    emojiPick('kt-ch0-l6-q5',
      'Please, may I have some milk?',
      'Pick the polite emoji',
      ['🙏 please', '💛 thank you', '👋 hello', '✅ yes'],
      ['請', '謝謝', '你好', '是'],
      0, 'please = 請 🙏 (有禮貌地問)'),
    emojiPick('kt-ch0-l6-q6',
      'Thank you. You are so kind.',
      'Pick the grateful emoji',
      ['🙏 please', '💛 thank you', '👋 hello', '✅ yes'],
      ['請', '謝謝', '你好', '是'],
      1, 'thank you = 謝謝 💛'),

    listenEmoji('kt-ch0-l6-q7', 'Hello.',
      ['👋 hello', '👋 bye', '🙏 please', '💛 thank you'],
      0, 'hello = 你好。Mochi 對你說 hello!'),
    listenEmoji('kt-ch0-l6-q8', 'Thank you.',
      ['👋 hello', '👋 bye', '🙏 please', '💛 thank you'],
      3, 'thank you = 謝謝。'),
    nar('kt-ch0-l6-n9',
      'Hello, bye, yes, no, please, thank you. Six words!',
      '你好、再見、是、不是、請、謝謝。六個!都學會了!'),
    nar('kt-ch0-l6-n10',
      'You can talk to people now. Brave!',
      '現在你可以跟人打招呼了。好厲害!'),
  ],
};

// ─── Lesson 7: 簡單句子 ────────────────────────────────────────────────────
const lesson7 = {
  id: 'kt-ch0-l7',
  chapter: 0,
  lessonInChapter: 7,
  segmentType: 'outer-prologue',
  storyId: 'ground-floor',
  storyBeat: '第一個完整句子',
  questions: [
    nar('kt-ch0-l7-n00',
      'Last lesson. We make sentences now.',
      '最後一課。我們來造句。'),
    nar('kt-ch0-l7-n01',
      'I am Mochi. I am happy. Try with me.',
      '我是 Mochi。我很開心。跟我一起說!'),

    emojiPick('kt-ch0-l7-q1',
      'I am happy.',
      'How does she feel?',
      ['😀 happy', '😢 sad', '😡 angry', '😴 sleepy'],
      ['開心', '難過', '生氣', '想睡'],
      0, 'I am happy = 我很開心 😀。I am ... 是「我是...」。'),
    emojiPick('kt-ch0-l7-q2',
      'I am sad.',
      'How does she feel?',
      ['😀 happy', '😢 sad', '😡 angry', '😴 sleepy'],
      ['開心', '難過', '生氣', '想睡'],
      1, 'I am sad = 我很難過 😢。'),
    emojiPick('kt-ch0-l7-q3',
      'I am sleepy.',
      'How does she feel?',
      ['😀 happy', '😢 sad', '😡 angry', '😴 sleepy'],
      ['開心', '難過', '生氣', '想睡'],
      3, 'I am sleepy = 我想睡 😴。'),

    emojiPick('kt-ch0-l7-q4',
      'I see a cat.',
      'What do I see?',
      ['🐱 cat', '🐶 dog', '🐦 bird', '🐟 fish'],
      ['貓', '狗', '鳥', '魚'],
      0, 'I see a cat = 我看到一隻貓 🐱。see = 看到。a = 一(隻 / 個)。'),
    emojiPick('kt-ch0-l7-q5',
      'I see a dog.',
      'What do I see?',
      ['🐱 cat', '🐶 dog', '🐦 bird', '🐟 fish'],
      ['貓', '狗', '鳥', '魚'],
      1, 'I see a dog = 我看到一隻狗 🐶。'),
    emojiPick('kt-ch0-l7-q6',
      'I see a bird.',
      'What do I see?',
      ['🐱 cat', '🐶 dog', '🐦 bird', '🐟 fish'],
      ['貓', '狗', '鳥', '魚'],
      2, 'I see a bird = 我看到一隻鳥 🐦。'),
    emojiPick('kt-ch0-l7-q7',
      'I see a red apple.',
      'What color is the apple?',
      ['🔴 red', '🔵 blue', '🟢 green', '🟡 yellow'],
      ['紅', '藍', '綠', '黃'],
      0, 'I see a red apple = 我看到一顆紅蘋果 🔴🍎。red 在 apple 前面。'),

    nar('kt-ch0-l7-n8',
      'You did it! Seven lessons done.',
      '你做到了!七課全部學完。'),
    nar('kt-ch0-l7-n9',
      'Now you are ready for Grandma\'s stories.',
      '現在你準備好聽奶奶的故事了。'),
    nar('kt-ch0-l7-n10',
      'Brave! Mochi believes in you.',
      '好厲害!Mochi 相信你。'),
  ],
};

// ─── Write file ─────────────────────────────────────────────────────────────
const lessons = [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7];

// Sanity: count Qs
let totalQ = 0;
for (const l of lessons) {
  totalQ += l.questions.length;
  if (l.questions.length < 3 || l.questions.length > 20) {
    console.error(`FAIL ${l.id}: ${l.questions.length} questions (must be 3-20)`);
    process.exit(1);
  }
}

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\n', 'utf-8');
console.log(`Wrote ${OUT}`);
console.log(`  ${lessons.length} lessons, ${totalQ} questions total`);
console.log(`  Avg ${(totalQ / lessons.length).toFixed(1)} Q per lesson (target ~11)`);
