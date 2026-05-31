#!/usr/bin/env node
/**
 * Apply Pickup TOEIC-aligned question design standard v1 to
 * lessons-ch1.json L1-L10 only. Audits + rewrites in-place.
 *
 * Rules enforced:
 *   R1: correct option NOT a substring of sentence (TOP rule, paraphrase)
 *   R2: max(len(option)) / min(len(option)) <= 1.25
 *   R3: per-lesson correctIndex balance ~3 each of {0,1,2,3}
 *   R5: Jaccard between any two Qs' question stems < 0.4
 *   R6: per-12-Q lesson >=3 gist + >=5 detail + >=2 inference + >=2 vocab/function
 *   A3: junk distractor (out-of-domain) replaced with plausible
 *   A6: correct NOT a substring of question
 *
 * Stores rewrites + diff summary + report.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const lessonsPath = resolve(repoRoot, 'public', 'lessons-ch1.json');
const reportPath = resolve(repoRoot, 'tools', 'qa-report-toeic-standard-applied.md');

const raw = readFileSync(lessonsPath, 'utf-8');
const data = JSON.parse(raw);

// Counters
const counters = {
  total: 0,
  R1: 0,
  A6: 0,
  A3: 0,
  R2: 0,
  R5: 0,
  R6_rebalanced: 0,
  R3_rebalanced: 0,
  totalRewrites: 0,
};

// Track diffs for the sample report
const diffSamples = [];
function recordDiff(rule, lessonId, qId, before, after) {
  diffSamples.push({ rule, lessonId, qId, before, after });
}

// Stopwords for Jaccard
const STOP = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'have', 'has', 'had',
  'i', 'you', 'he', 'she', 'we', 'they', 'it', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'her', 'their', 'our',
  'this', 'that', 'these', 'those',
  'and', 'or', 'but', 'for', 'so', 'with', 'in', 'on', 'at', 'to', 'of', 'from',
  'what', 'when', 'where', 'who', 'why', 'how', 'which', 'whose',
  '?', '.', ',',
]);

function tokens(s) {
  return s.toLowerCase().replace(/[^a-z0-9'\s]/g, ' ').split(/\s+/).filter((t) => t && !STOP.has(t));
}

function jaccard(a, b) {
  const sa = new Set(tokens(a));
  const sb = new Set(tokens(b));
  const inter = [...sa].filter((x) => sb.has(x)).length;
  const uni = new Set([...sa, ...sb]).size;
  return uni === 0 ? 0 : inter / uni;
}

// Substring helper (case-insensitive, word-aware enough)
function contains(haystack, needle) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

// ============================================================
// Per-question rewrites: L1-L10 manual specification.
// Each rewrite specifies new sentence/question/options/correctIndex
// /optionsZh/explanationZh/subSkill as needed.
// Indexed by question id.
// ============================================================
const REWRITES = {
  // ---------- L1 ----------
  // R1 violation: q1 sentence "stray cat" / correct "stray"
  'kt-ch1-l1-q1': {
    sentence: 'I am {catName}. I have no home of my own.',
    options: ['straw', 'stay', 'stray', 'story'],
    optionsZh: ['稻草', '留', '流浪的', '故事'],
    correctIndex: 2,
    explanationZh: 'stray = 流浪的(沒有固定家的)。每晚我自己找東西吃。',
    subSkill: 'vocab',
  },
  // R1 violation: q2 sentence "I visit one yard" + correct "yard"
  'kt-ch1-l1-q2': {
    sentence: 'Every night I visit one place.',
    question: 'Where does {catName} go every night?',
    options: ['road', 'yard', 'house', 'park'],
    optionsZh: ['路', '院子', '房子', '公園'],
    correctIndex: 1,
    explanationZh: 'yard = 院子。每晚我去奶奶家的小院子落腳。',
    subSkill: 'detail',
  },
  // R1 violation: q3 sentence "I jump on" + correct "jump"
  'kt-ch1-l1-q3': {
    sentence: 'My paws spring up to the low wall.',
    question: 'How does {catName} get on the wall?',
    options: ['jump', 'walk', 'run', 'sit'],
    optionsZh: ['跳', '走', '跑', '坐'],
    correctIndex: 0,
    explanationZh: 'spring up = 一躍而起,也就是 jump(跳)。輕輕一躍就上了矮牆。',
    subSkill: 'vocab',
  },
  // R1 violation: q4 sentence "low and warm" + correct "warm"
  'kt-ch1-l1-q4': {
    sentence: 'The wall keeps the sun heat after dusk.',
    question: 'How does the wall feel?',
    options: ['cold', 'hard', 'hot', 'warm'],
    optionsZh: ['冷', '硬的', '燙', '溫暖'],
    correctIndex: 3,
    explanationZh: '矮牆白天曬過,黃昏還微溫,坐上去剛剛好。warm = 溫暖。',
    subSkill: 'inference',
  },
  // A6 violation potential: question "Where does cat go" — sentence "Where do I go" — same words.
  // Also Jaccard with q2. Convert to a gist.
  'kt-ch1-l1-q5': {
    sentence: 'Every night I head to one quiet place.',
    question: 'What is the main idea?',
    options: [
      'I go to a shop',
      "I visit Grandma's yard",
      'I sleep on the street',
      'I look for fish',
    ],
    optionsZh: ['我去商店', '我去奶奶的院子', '我睡在街上', '我找魚'],
    correctIndex: 1,
    explanationZh: '每晚我都去奶奶院子,那裡有飯有故事。',
    subSkill: 'gist',
  },
  // A6 + A6/R1: question "Whose yard" + answer "Grandma's" — sentence "belongs to Grandma" contains Grandma's.
  'kt-ch1-l1-q6': {
    sentence: 'The yard is hers, not mine.',
    question: 'Whose yard is it?',
    options: ["Grandma's", 'mine', "the dog's", "nobody's"],
    optionsZh: ['奶奶的', '我的', '狗的', '沒有人的'],
    correctIndex: 0,
    explanationZh: '院子的主人是奶奶,我只是來坐坐。',
    subSkill: 'inference',
  },
  // q7 — keep but mark inference
  'kt-ch1-l1-q7': {
    subSkill: 'inference',
  },
  // q8 — R1: sentence "I feel curious" + correct "curious"
  'kt-ch1-l1-q8': {
    sentence: 'Tonight I want to know what story is coming.',
    question: 'How does {catName} feel?',
    options: ['curious', 'bored', 'angry', 'sleepy'],
    optionsZh: ['好奇', '無聊', '生氣', '想睡'],
    correctIndex: 0,
    explanationZh: 'curious = 好奇。今晚奶奶要說新故事,我特別期待。',
    subSkill: 'vocab',
  },
  // q9 — R1: sentence "moon is bright" + correct "bright"
  'kt-ch1-l1-q9': {
    sentence: 'The moon shines clearly tonight.',
    question: 'How is the moon?',
    options: ['bright', 'broken', 'brown', 'brave'],
    optionsZh: ['明亮', '破', '棕色', '勇敢'],
    correctIndex: 0,
    explanationZh: 'bright = 明亮的。月光照在矮牆上,看得很清楚。',
    subSkill: 'detail',
  },
  // q10 — R1: sentence "quiet street" + correct "quiet"
  'kt-ch1-l1-q10': {
    sentence: 'No car or voice fills the street tonight.',
    question: 'How is the street tonight?',
    options: ['quiet', 'crowded', 'muddy', 'shut'],
    optionsZh: ['安靜', '擁擠', '泥濘', '關上'],
    correctIndex: 0,
    explanationZh: 'quiet = 安靜的。沒人沒車,只有我的腳步。',
    subSkill: 'inference',
  },
  // q11 — R1: sentence "quick and quiet" + correct "quick and quiet"
  'kt-ch1-l1-q11': {
    sentence: 'My paws move fast and make no sound.',
    question: "How are {catName}'s paws?",
    options: ['loud and slow', 'quick and quiet', 'wet and cold', 'stuck and sore'],
    optionsZh: ['大聲又慢', '快又安靜', '濕又冷', '卡又痠'],
    correctIndex: 1,
    explanationZh: 'quick = 快、quiet = 安靜。我走路不發出聲音。',
    subSkill: 'detail',
  },
  // q12 — R1: sentence "I sit" + correct "sit"
  'kt-ch1-l1-q12': {
    sentence: 'I rest my paws on the warm wall.',
    question: 'What does {catName} do on the wall?',
    options: ['sit', 'set', 'sat', 'send'],
    optionsZh: ['坐', '放', '坐過', '送'],
    correctIndex: 0,
    explanationZh: 'sit = 坐。我跳上去後就坐著等故事開始。rest paws = 把腳掌放著休息。',
    subSkill: 'vocab',
  },

  // ---------- L2 ----------
  // q1 — R1: sentence "wags his tail" + correct "wag"
  'kt-ch1-l2-q1': {
    sentence: '{dogName} swings his tail side to side.',
    question: "What does {dogName}'s tail do?",
    options: ['wag', 'run', 'bark', 'jump'],
    optionsZh: ['搖', '跑', '叫', '跳'],
    correctIndex: 0,
    explanationZh: 'wag = 搖(尾巴)。柴犬看到我來都會搖尾巴。',
    subSkill: 'vocab',
  },
  // q2 — R1: sentence "brown dog" + correct "brown"
  'kt-ch1-l2-q2': {
    sentence: "{dogName}'s coat is the color of toast.",
    question: 'What color is {dogName}?',
    options: ['black', 'red', 'white', 'brown'],
    optionsZh: ['黑色', '紅色', '白色', '棕色'],
    correctIndex: 3,
    explanationZh: 'toast 烤土司是棕色,所以 brown = 棕色。柴犬就是這個顏色。',
    subSkill: 'inference',
  },
  // q3 — R1: sentence "We are friends" + correct "friends"
  'kt-ch1-l2-q3': {
    sentence: 'We trust each other.',
    question: 'What are {catName} and {dogName}?',
    options: ['friends', 'family', 'farmers', 'foreign'],
    optionsZh: ['朋友', '家人', '農夫們', '外國的'],
    correctIndex: 0,
    explanationZh: 'friends = 朋友。互相信任就是好朋友。',
    subSkill: 'inference',
  },
  // q4 — R1: sentence "I feel safe" + correct "safe"
  'kt-ch1-l2-q4': {
    sentence: 'With him near me, nothing can hurt me.',
    question: 'How do I feel?',
    options: ['scared', 'safe', 'angry', 'sad'],
    optionsZh: ['嚇過', '安全', '生氣', '難過'],
    correctIndex: 1,
    explanationZh: '跟 {dogName} 一起時感覺安全(safe),不用怕別的動物。',
    subSkill: 'inference',
  },
  // q5 — A6: question == sentence essentially; R1 leak
  'kt-ch1-l2-q5': {
    sentence: 'The old lady on the chair raised him.',
    question: 'Whose dog is {dogName}?',
    options: ['mine', "nobody's", "a stranger's", "Grandma's"],
    optionsZh: ['我的', '沒有人的', '陌生人的', '奶奶的'],
    correctIndex: 3,
    explanationZh: '是奶奶從小養大的,所以是奶奶的狗。我只是來作客的流浪貓。',
    subSkill: 'inference',
  },
  // q6 — R1: sentence "runs to the wall" + correct "to the wall"
  'kt-ch1-l2-q6': {
    sentence: '{dogName} dashes toward where I sit.',
    question: 'Where does {dogName} run?',
    options: ['to the wall', 'to the gate', 'to the door', 'to the road'],
    optionsZh: ['到牆邊', '到大門', '到門口', '到馬路'],
    correctIndex: 0,
    explanationZh: '我坐在矮牆上,他衝向牆邊。dash toward = 衝向。',
    subSkill: 'detail',
  },
  // q7 — R1: sentence "happy to see me" + correct "happy"
  'kt-ch1-l2-q7': {
    sentence: 'His eyes light up when I come.',
    question: 'How does {dogName} feel?',
    options: ['happy', 'hungry', 'tired', 'shy'],
    optionsZh: ['開心', '餓', '累', '害羞'],
    correctIndex: 0,
    explanationZh: 'eyes light up = 眼睛發亮 = happy(開心)。柴犬每晚等我來,看到我就笑。',
    subSkill: 'inference',
  },
  // q8 — R1: sentence "licks my paw" + correct "lick"
  'kt-ch1-l2-q8': {
    sentence: 'He gives my paw a gentle tongue touch.',
    question: 'What does {dogName} do?',
    options: ['lick', 'lock', 'look', 'leak'],
    optionsZh: ['舔', '鎖', '看', '漏'],
    correctIndex: 0,
    explanationZh: 'tongue touch = 用舌頭碰 = lick(舔)。狗狗打招呼的方式。',
    subSkill: 'vocab',
  },
  // q9 — R1: sentence "every night" + correct "every night"
  'kt-ch1-l2-q9': {
    sentence: 'He sits by the wall after dark, again and again.',
    question: 'When does {dogName} wait for {catName}?',
    options: ['only on Sundays', 'every night', 'in the morning', 'after lunch'],
    optionsZh: ['只有星期天', '每晚', '早上', '午餐後'],
    correctIndex: 1,
    explanationZh: 'after dark, again and again = 每晚都等。柴犬天天在院子等我來。',
    subSkill: 'inference',
  },
  // q10 — R1: sentence "ears go up" + correct "go up"
  'kt-ch1-l2-q10': {
    sentence: 'His ears prick up at the sound of my paws.',
    question: "What do {dogName}'s ears do?",
    options: ['go up', 'fall flat', 'shake fast', 'turn red'],
    optionsZh: ['豎起來', '貼平', '快速搖', '變紅'],
    correctIndex: 0,
    explanationZh: 'prick up = 豎起來 = ears go up。他一聽到我就警覺又開心。',
    subSkill: 'detail',
  },
  // q11 — R1: sentence "side by side" + correct "side by side"
  'kt-ch1-l2-q11': {
    sentence: 'We rest with our shoulders almost touching.',
    question: 'How do we sit?',
    options: ['side by side', 'back to back', 'face to face', 'far apart'],
    optionsZh: ['並排坐', '背對背', '面對面', '遠遠分開'],
    correctIndex: 0,
    explanationZh: 'shoulders almost touching = 肩膀靠著 = side by side(並排)。',
    subSkill: 'detail',
  },
  // q12 — keep but mark gist
  'kt-ch1-l2-q12': {
    subSkill: 'gist',
  },

  // ---------- L3 ----------
  // q1 — R1: sentence "opens" + correct "opens"
  'kt-ch1-l3-q1': {
    sentence: 'Grandma lifts the cover of the old book.',
    question: 'What does she do?',
    options: ['closes', 'opens', 'holds', 'drops'],
    optionsZh: ['關上', '打開', '拿著', '掉'],
    correctIndex: 1,
    explanationZh: 'lift the cover = 翻開封面 = opens(打開)。今晚要說新故事。',
    subSkill: 'vocab',
  },
  // q2 — R1: sentence "tells a tale" + correct "tale"
  'kt-ch1-l3-q2': {
    sentence: 'Tonight she shares an old story.',
    question: 'What does she tell?',
    options: ['joke', 'tale', 'song', 'name'],
    optionsZh: ['笑話', '故事', '歌', '名字'],
    correctIndex: 1,
    explanationZh: 'tale = 故事(古字,跟 story 同義,書本裡常見)。',
    subSkill: 'vocab',
  },
  // q3 tap-tiles — leave as-is, mark detail
  'kt-ch1-l3-q3': {
    subSkill: 'detail',
  },
  // q4 — R1: sentence "ready to listen" + correct "ready"
  'kt-ch1-l3-q4': {
    sentence: 'My ears are pointed up and waiting.',
    question: 'How do I feel?',
    options: ['sleepy', 'thinking', 'worried', 'ready'],
    optionsZh: ['想睡', '在想', '擔心', '準備好'],
    correctIndex: 3,
    explanationZh: 'ears up and waiting = 準備好聽。ready = 準備好。',
    subSkill: 'inference',
  },
  // q5 — A6: question matches sentence "What is in her hand?"
  'kt-ch1-l3-q5': {
    sentence: 'Grandma holds something old and brown in her hand.',
    question: "What is in Grandma's hand?",
    options: ['a key', 'a bowl', 'an old book', 'a candle'],
    optionsZh: ['一個鑰匙', '一個碗', '一本舊書', '一個蠟燭'],
    correctIndex: 2,
    explanationZh: '又舊又棕色的東西 = 她那本舊故事書。',
    subSkill: 'inference',
  },
  // q6 — R1: sentence "many pages" + correct "pages"
  'kt-ch1-l3-q6': {
    sentence: 'The book is full of paper sheets.',
    question: 'What does the book have?',
    options: ['pages', 'pegs', 'pads', 'pies'],
    optionsZh: ['頁面', '釘子', '墊', '派'],
    correctIndex: 0,
    explanationZh: 'paper sheets = 紙張 = pages(頁面)。',
    subSkill: 'vocab',
  },
  // q7 — R1: sentence "in her chair" + correct "in her chair"
  'kt-ch1-l3-q7': {
    sentence: 'Grandma rests on her old wooden seat.',
    question: 'Where does Grandma sit?',
    options: ['in her chair', 'on the floor', 'by the gate', 'at the table'],
    optionsZh: ['在椅子上', '在地板上', '在大門邊', '在桌邊'],
    correctIndex: 0,
    explanationZh: 'wooden seat = 木椅 = in her chair。每晚都是同一張木椅。',
    subSkill: 'detail',
  },
  // q8 — R1: sentence "looks calm" + correct "calm"
  'kt-ch1-l3-q8': {
    sentence: 'Her face shows no rush or worry.',
    question: "How does Grandma's face look?",
    options: ['calm', 'shocked', 'tense', 'rushed'],
    optionsZh: ['平靜', '震驚', '緊繃', '匆忙'],
    correctIndex: 0,
    explanationZh: 'no rush or worry = 不急不憂 = calm(平靜)。',
    subSkill: 'inference',
  },
  // q9 — R1: sentence "clears her throat" + correct "her throat"
  'kt-ch1-l3-q9': {
    sentence: 'She gives a tiny cough to start.',
    question: 'What does she clear?',
    options: ['her throat', 'her hair', 'her cup', 'her hand'],
    optionsZh: ['她的喉嚨', '她的頭髮', '她的杯子', '她的手'],
    correctIndex: 0,
    explanationZh: 'tiny cough = 輕咳 = clear her throat(清喉嚨)。說故事前的小動作。',
    subSkill: 'inference',
  },
  // q10 — R1: sentence "old and brown" + correct "old and brown"
  'kt-ch1-l3-q10': {
    sentence: 'The cover has faded and turned dark.',
    question: 'How does the book look?',
    options: ['new and shiny', 'old and brown', 'small and red', 'thin and blue'],
    optionsZh: ['新又亮', '舊又棕', '小又紅', '薄又藍'],
    correctIndex: 1,
    explanationZh: 'faded + dark = 又舊又棕。書皮的顏色磨成了深棕色。',
    subSkill: 'inference',
  },
  // q11 — R1: sentence "turns the first page" + correct "the first"
  'kt-ch1-l3-q11': {
    sentence: 'She begins from page one.',
    question: 'Which page does she turn?',
    options: ['the first', 'the last', 'the lost', 'the worst'],
    optionsZh: ['第一', '最後', '遺失的', '最糟'],
    correctIndex: 0,
    explanationZh: 'page one = 第一頁 = the first page。新故事從這裡開始。',
    subSkill: 'detail',
  },
  // q12 — R1: sentence "feel excited" + correct "excited"
  'kt-ch1-l3-q12': {
    sentence: 'My tail tip trembles in joy for the story.',
    question: 'How does {catName} feel?',
    options: ['excited', 'annoyed', 'lonely', 'hungry'],
    optionsZh: ['興奮', '煩', '孤單', '餓'],
    correctIndex: 0,
    explanationZh: 'tail trembles in joy = 尾巴開心地抖 = excited(興奮)。',
    subSkill: 'inference',
  },

  // ---------- L4 ----------
  // q1 — R1: sentence contains "Long ago" + correct "long ago"
  'kt-ch1-l4-q1': {
    sentence: 'Grandma says, "Many years back, on a wet evening..."',
    question: 'Which phrase did you hear?',
    options: ['long ago', 'tomorrow', 'next year', 'today'],
    optionsZh: ['很久以前', '明天', '明年', '今天'],
    correctIndex: 0,
    explanationZh: 'many years back = long ago(很久以前)。奶奶的故事都從這開始。',
    subSkill: 'vocab',
  },
  // q2 — R1: sentence "falls hard" + correct "hard"
  'kt-ch1-l4-q2': {
    sentence: 'The rain pours down strong all night.',
    question: 'How does the rain fall?',
    options: ['light', 'soft', 'hard', 'warm'],
    optionsZh: ['輕', '柔軟的', '用力地', '溫暖'],
    correctIndex: 2,
    explanationZh: 'pours strong = 大力下 = hard。雨下得很大。',
    subSkill: 'inference',
  },
  // q3 — R1: sentence "dark night" + correct "dark"
  'kt-ch1-l4-q3': {
    sentence: 'No stars or moon are out tonight.',
    question: 'How does the night feel?',
    options: ['dark', 'deep', 'deer', 'done'],
    optionsZh: ['黑暗', '深', '鹿', '做完'],
    correctIndex: 0,
    explanationZh: 'no stars or moon = 沒星沒月 = dark(黑暗)。',
    subSkill: 'inference',
  },
  // q4 — R1: sentence "wind blows cold" + correct "freezing"
  // freezing not in sentence; "cold" in sentence is fine. But "freezing"/"cold" distinction needs care
  // Current: correct "freezing" — not in sentence. Pass R1. Just tag.
  'kt-ch1-l4-q4': {
    subSkill: 'inference',
  },
  // q5 tap-tiles — tag detail
  'kt-ch1-l4-q5': {
    subSkill: 'detail',
  },
  // q6 — R1: sentence "full of clouds" + correct "clouds"
  'kt-ch1-l4-q6': {
    sentence: 'Thick grey shapes cover the whole sky.',
    question: 'What fills the sky?',
    options: ['clouds', 'clowns', 'claws', 'clocks'],
    optionsZh: ['雲', '小丑', '爪子', '時鐘'],
    correctIndex: 0,
    explanationZh: 'thick grey shapes = 雲 (clouds)。整片天都是厚雲,看不見星星。',
    subSkill: 'vocab',
  },
  // q7 — R1: sentence "rain drops hit the road" + correct "rain drops"
  'kt-ch1-l4-q7': {
    sentence: 'Tiny water beads strike the wet road.',
    question: 'What hits the road?',
    options: ['rain drops', 'leaves', 'snow flakes', 'small stones'],
    optionsZh: ['雨滴', '葉子', '雪花', '小石頭'],
    correctIndex: 0,
    explanationZh: 'water beads = 水珠 = rain drops。一顆顆雨打在柏油路上。',
    subSkill: 'detail',
  },
  // q8 — R1: sentence "feels lonely" + correct "lonely"
  'kt-ch1-l4-q8': {
    sentence: 'Not one soul walks the wet road.',
    question: 'How does the night feel?',
    options: ['lonely', 'lively', 'lucky', 'loud'],
    optionsZh: ['孤單', '熱鬧', '幸運', '大聲'],
    correctIndex: 0,
    explanationZh: 'not one soul = 一個人都沒有 = lonely(孤單)。',
    subSkill: 'inference',
  },
  // q9 — R1: sentence "look sad" + correct "sad"
  'kt-ch1-l4-q9': {
    sentence: 'The street lights glow dim and pale.',
    question: 'How do the lights look?',
    options: ['sad', 'bright', 'warm', 'wild'],
    optionsZh: ['悲傷', '明亮', '溫暖', '狂野'],
    correctIndex: 0,
    explanationZh: 'dim and pale = 暗又無力 = sad-looking(像在哭)。',
    subSkill: 'inference',
  },
  // q10 — R1: sentence "many years ago" + correct "many years ago"
  'kt-ch1-l4-q10': {
    sentence: 'This story happened long, long back.',
    question: 'When does the story happen?',
    options: ['this morning', 'many years ago', 'next week', 'right now'],
    optionsZh: ['今天早上', '很多年前', '下週', '現在'],
    correctIndex: 1,
    explanationZh: 'long long back = many years ago(很多年前)。奶奶說的是舊故事。',
    subSkill: 'detail',
  },
  // q11 — R1: sentence "no one walks" + correct "no one"
  'kt-ch1-l4-q11': {
    sentence: 'The street is empty of people.',
    question: 'Who walks on the street?',
    options: ['no one', 'a postman', 'a child', 'two dogs'],
    optionsZh: ['沒有人', '一個郵差', '一個小孩', '兩隻狗'],
    correctIndex: 0,
    explanationZh: 'empty of people = no one。下大雨,人都躲在家裡。',
    subSkill: 'detail',
  },
  // q12 — R1: sentence "thunder rolls" + correct "thunder"
  'kt-ch1-l4-q12': {
    sentence: 'A deep rumble shakes the sky.',
    question: 'What rolls in the sky?',
    options: ['thunder', 'thread', 'throat', 'thumb'],
    optionsZh: ['雷', '線', '喉嚨', '拇指'],
    correctIndex: 0,
    explanationZh: 'deep rumble = 低沉的滾響 = thunder(雷)。雷聲滾過天空,讓夜更可怕。',
    subSkill: 'vocab',
  },

  // ---------- L5 ----------
  // q1 — R1: sentence "small cat is alone" + correct "small"
  'kt-ch1-l5-q1': {
    sentence: 'A little cat sits all by herself in the rain.',
    question: 'Which word describes the cat?',
    options: ['smell', 'tall', 'smart', 'small'],
    optionsZh: ['聞', '高', '聰明', '小'],
    correctIndex: 3,
    explanationZh: 'little = small(小的)。一隻小貓,沒有人陪。',
    subSkill: 'vocab',
  },
  // q2 — R1: sentence "her fur is wet" + correct "fur"
  'kt-ch1-l5-q2': {
    sentence: 'Her coat of hair is soaked through.',
    question: 'What part of the kitten is wet?',
    options: ['fur', 'fire', 'far', 'for'],
    optionsZh: ['毛', '火', '遠', '為了'],
    correctIndex: 0,
    explanationZh: 'coat of hair = 毛 (fur)。雨把她的毛打濕了。',
    subSkill: 'vocab',
  },
  // q3 — R1: sentence "in two days" + correct "two"
  'kt-ch1-l5-q3': {
    sentence: 'No food has come to her for a couple of days.',
    question: 'How many days without food?',
    options: ['two', 'too', 'to', 'tour'],
    optionsZh: ['二', '太', '到', '旅行'],
    correctIndex: 0,
    explanationZh: 'a couple of = 兩個 = two。兩天沒吃了。',
    subSkill: 'detail',
  },
  // q4 — R1: sentence "is scared of" + correct "scared"
  'kt-ch1-l5-q4': {
    sentence: 'A big shadow makes her shiver in fear.',
    question: 'How does she feel?',
    options: ['thinking', 'happy', 'scared', 'sleepy'],
    optionsZh: ['在想', '開心', '嚇過', '想睡'],
    correctIndex: 2,
    explanationZh: 'shiver in fear = 嚇得發抖 = scared(害怕)。',
    subSkill: 'inference',
  },
  // q5 — R1: sentence "shakes from cold" + correct "shakes"
  'kt-ch1-l5-q5': {
    sentence: 'Her body trembles in the chill.',
    question: 'What does the cold kitten do?',
    options: ['bakes', 'takes', 'shakes', 'wakes'],
    optionsZh: ['烤', '拿', '搖', '醒'],
    correctIndex: 2,
    explanationZh: 'tremble = shake(發抖)。太冷了,身體一直抖。',
    subSkill: 'vocab',
  },
  // q6 — R1: sentence "ears are flat" + correct "flat"
  'kt-ch1-l5-q6': {
    sentence: 'Her ears press down against her head.',
    question: 'How are her ears?',
    options: ['flat', 'flip', 'flag', 'fluff'],
    optionsZh: ['貼平', '翻', '旗', '蓬鬆'],
    correctIndex: 0,
    explanationZh: 'press down = 貼下去 = flat(貼平)。貓害怕時耳朵會貼到頭上。',
    subSkill: 'detail',
  },
  // q7 — R1: sentence "hungry and cold" + correct "hungry and cold"
  'kt-ch1-l5-q7': {
    sentence: 'Her belly is empty and her body is icy.',
    question: 'How does she feel?',
    options: ['hungry and cold', 'warm and full', 'calm and proud', 'sleepy and safe'],
    optionsZh: ['餓又冷', '暖又飽', '冷靜又驕傲', '想睡又安全'],
    correctIndex: 0,
    explanationZh: 'belly empty + body icy = 又餓又冷。兩天沒吃飯,雨又把她淋濕。',
    subSkill: 'inference',
  },
  // q8 — R1: sentence "wide and worried" + correct "wide and worried"
  'kt-ch1-l5-q8': {
    sentence: 'Her eyes stretch open and dart around.',
    question: 'How do her eyes look?',
    options: ['wide and worried', 'closed and calm', 'small and proud', 'happy and bright'],
    optionsZh: ['睜大又擔心', '閉上又平靜', '小又驕傲', '開心又明亮'],
    correctIndex: 0,
    explanationZh: 'stretch open = 睜大、dart around = 警覺地看。',
    subSkill: 'inference',
  },
  // q9 — R1: sentence "lost her mother" + correct "she lost her mother"
  'kt-ch1-l5-q9': {
    sentence: 'Her mom went away last week and never came back.',
    question: 'Why is she alone?',
    options: ['she ran away today', 'she lost her mother', 'she dislikes cats', 'she is on a trip'],
    optionsZh: ['她今天逃跑', '她失去了媽媽', '她不喜歡貓', '她在旅行'],
    correctIndex: 1,
    explanationZh: 'mom went away = lost her mother(失去媽媽)。上週開始她就一個人了。',
    subSkill: 'gist',
  },
  // q10 — R1: sentence "no food / has no food" — sentence "her belly is empty"; correct "she has no food" — not in sentence. OK. Just tag.
  'kt-ch1-l5-q10': {
    subSkill: 'inference',
  },
  // q11 — R1: sentence "warm dry place" + correct "warm dry place"
  'kt-ch1-l5-q11': {
    sentence: 'She just wants somewhere cozy and not wet.',
    question: 'What does she want most?',
    options: ['a warm dry place', 'more cold rain', 'a loud song', 'a fast car'],
    optionsZh: ['溫暖乾燥的地方', '更多冷雨', '大聲的歌', '快車'],
    correctIndex: 0,
    explanationZh: 'cozy and not wet = warm dry place(溫暖乾燥)。雨夜裡最簡單的願望。',
    subSkill: 'gist',
  },
  // q12 — R1: sentence "tiny meow" + correct "tiny"
  'kt-ch1-l5-q12': {
    sentence: 'She lets out a very small meow.',
    question: 'What kind of meow?',
    options: ['tiny', 'tinny', 'tidy', 'tipsy'],
    optionsZh: ['微小', '尖細', '整齊', '微醺'],
    correctIndex: 0,
    explanationZh: 'very small = tiny(很小的)。她只能發出細細一聲。',
    subSkill: 'vocab',
  },

  // ---------- L6 ----------
  // q1 — R1: sentence "curls into a ball" + correct "curls"
  'kt-ch1-l6-q1': {
    sentence: 'She rolls her body into a tight shape.',
    question: 'How does the kitten stay warm?',
    options: ['cools', 'curls', 'kills', 'calls'],
    optionsZh: ['涼', '捲曲', '殺', '叫'],
    correctIndex: 1,
    explanationZh: 'roll into a tight shape = curl(蜷縮成一團)。小貓把自己縮起來取暖。',
    subSkill: 'vocab',
  },
  // q2 — R1: sentence "dark corner" + correct "corner"
  'kt-ch1-l6-q2': {
    sentence: 'She tucks herself where two walls meet.',
    question: 'Where does she hide?',
    options: ['window', 'corner', 'kitchen', 'garden'],
    optionsZh: ['窗', '角落', '廚房', '花園'],
    correctIndex: 1,
    explanationZh: 'where two walls meet = 兩面牆相接 = corner(角落)。',
    subSkill: 'inference',
  },
  // q3 — R1: sentence "is alone" + correct "alone"
  'kt-ch1-l6-q3': {
    sentence: 'No one is with her.',
    question: 'How is the kitten by herself?',
    options: ['alone', 'along', 'aloud', 'around'],
    optionsZh: ['獨自', '沿著', '大聲', '周圍'],
    correctIndex: 0,
    explanationZh: 'no one with her = alone(獨自一個)。沒有媽媽,沒有同伴。',
    subSkill: 'vocab',
  },
  // q4 — R1: sentence "a tear runs" + correct "a tear"
  'kt-ch1-l6-q4': {
    sentence: 'A drop of water from her eye slides down.',
    question: 'What is on her face?',
    options: ['a tear', 'anger', 'a smile', 'silence'],
    optionsZh: ['一個眼淚', '憤怒', '一個笑容', '寂靜'],
    correctIndex: 0,
    explanationZh: 'drop of water from eye = tear(眼淚)。一滴淚從臉頰滑下來。',
    subSkill: 'inference',
  },
  // q5 — R1: sentence "alley is" + correct "alley"
  'kt-ch1-l6-q5': {
    sentence: 'The narrow lane is wet and silent.',
    question: 'Where is the kitten hiding in the rain?',
    options: ['river', 'city', 'valley', 'alley'],
    optionsZh: ['河', '城市', '山谷', '巷子'],
    correctIndex: 3,
    explanationZh: 'narrow lane = alley(巷子)。窄窄的小巷,只有雨聲。',
    subSkill: 'vocab',
  },
  // q6 — R1: sentence "tucks her paws under" + correct "her paws"
  'kt-ch1-l6-q6': {
    sentence: 'She folds her small feet beneath her belly.',
    question: 'What does she tuck under?',
    options: ['her paws', 'her toys', 'her food', 'her bed'],
    optionsZh: ['她的腳掌', '她的玩具', '她的食物', '她的床'],
    correctIndex: 0,
    explanationZh: 'small feet = paws(腳掌)。貓蜷縮時的招牌動作。',
    subSkill: 'detail',
  },
  // q7 — R1: sentence "tiny ball" + correct "a ball"
  'kt-ch1-l6-q7': {
    sentence: 'Her body forms a round little shape.',
    question: 'What shape is her body?',
    options: ['a ball', 'a box', 'a bowl', 'a bear'],
    optionsZh: ['一個球', '一個盒子', '一個碗', '一隻熊'],
    correctIndex: 0,
    explanationZh: 'round little shape = a ball(球)。把自己捲成一個小球可以保暖。',
    subSkill: 'inference',
  },
  // q8 — R1: sentence "very sad inside" + correct "very sad"
  'kt-ch1-l6-q8': {
    sentence: 'Her heart aches deep within her.',
    question: 'How does she feel inside?',
    options: ['very sad', 'very glad', 'very brave', 'very silly'],
    optionsZh: ['非常悲傷', '非常開心', '非常勇敢', '非常傻'],
    correctIndex: 0,
    explanationZh: 'heart aches = 心痛 = very sad(非常悲傷)。',
    subSkill: 'inference',
  },
  // q9 — R1: sentence "a kind hand" + correct "a kind hand"
  'kt-ch1-l6-q9': {
    sentence: 'She hopes someone gentle will touch her.',
    question: 'What does she wish for?',
    options: ['a kind hand', 'a loud noise', 'a sharp claw', 'a big rock'],
    optionsZh: ['溫暖的手', '大聲音', '尖爪子', '大石頭'],
    correctIndex: 0,
    explanationZh: 'someone gentle touch = a kind hand(溫暖的手)。',
    subSkill: 'inference',
  },
  // q10 — R1: sentence "smells like wet stone" + correct "wet stone"
  'kt-ch1-l6-q10': {
    sentence: 'A damp rocky smell drifts from the corner.',
    question: 'What does the corner smell like?',
    options: ['wet stone', 'fresh bread', 'warm milk', 'sweet fruit'],
    optionsZh: ['濕石頭', '新鮮麵包', '溫牛奶', '甜水果'],
    correctIndex: 0,
    explanationZh: 'damp rocky = wet stone(濕石頭)。雨打在牆上的味道。',
    subSkill: 'detail',
  },
  // q11 — R1: sentence "closes her eyes and waits" + correct "closes eyes and waits"
  'kt-ch1-l6-q11': {
    sentence: 'She shuts her lids and stays still.',
    question: 'What does she do in the corner?',
    options: ['runs out fast', 'calls for her mother', 'closes eyes and waits', 'climbs up the wall'],
    optionsZh: ['快速跑出去', '叫她媽媽', '閉上眼等', '爬上牆'],
    correctIndex: 2,
    explanationZh: 'shut lids + stay still = closes eyes and waits(閉上眼等)。',
    subSkill: 'detail',
  },
  // q12 — R1: sentence "no one passes" + correct "no one"
  'kt-ch1-l6-q12': {
    sentence: 'Not a single person walks past the alley.',
    question: 'Who passes the alley?',
    options: ['no one', 'a baker', 'a child', 'two friends'],
    optionsZh: ['沒有人', '麵包師', '一個小孩', '兩個朋友'],
    correctIndex: 0,
    explanationZh: 'not a single person = no one。深夜的巷子空蕩蕩。',
    subSkill: 'gist',
  },

  // ---------- L7 ----------
  // q1 — R1: sentence "big shadow" + correct "shadow"
  'kt-ch1-l7-q1': {
    sentence: 'A large dark figure draws nearer.',
    question: 'What does the kitten see in the dark?',
    options: ['sheep', 'show', 'shower', 'shadow'],
    optionsZh: ['羊', '展示', '淋浴', '影子'],
    correctIndex: 3,
    explanationZh: 'large dark figure = shadow(影子)。一個大影子慢慢靠近。',
    subSkill: 'vocab',
  },
  // q2 — R1: sentence "is afraid" + correct "afraid"
  'kt-ch1-l7-q2': {
    sentence: 'The cat trembles, not sure if it is safe.',
    question: 'How does the cat feel?',
    options: ['awake', 'afraid', 'angry', 'amazed'],
    optionsZh: ['醒著', '害怕', '生氣', '驚訝'],
    correctIndex: 1,
    explanationZh: 'tremble + not sure = afraid(害怕)。她不知道影子是好人還是壞人。',
    subSkill: 'inference',
  },
  // q3 — R1: sentence "is a woman" + correct "woman"
  'kt-ch1-l7-q3': {
    sentence: 'It turns out to be a lady, not a beast.',
    question: 'Who is the big shadow?',
    options: ['woman', 'women', 'warm', 'wonder'],
    optionsZh: ['女人', '女人們', '溫暖', '驚奇'],
    correctIndex: 0,
    explanationZh: 'lady = woman(女人)。原來是一位阿姨,不是壞東西。',
    subSkill: 'vocab',
  },
  // q4 — R1: sentence "face is kind" + correct "kind"
  'kt-ch1-l7-q4': {
    sentence: 'Her look is gentle and warm.',
    question: 'How does her face look?',
    options: ['kind', 'scared', 'angry', 'cold'],
    optionsZh: ['善良', '嚇過', '生氣', '冷'],
    correctIndex: 0,
    explanationZh: 'gentle and warm look = kind(親切的)。她的眼神很溫柔。',
    subSkill: 'inference',
  },
  // q5 — R1: sentence "holds an umbrella" + correct "umbrella"
  'kt-ch1-l7-q5': {
    sentence: 'A rain shield rests in her hand.',
    question: 'What is in her hand?',
    options: ['uniform', 'umbrella', 'apple', 'envelope'],
    optionsZh: ['制服', '雨傘', '蘋果', '信封'],
    correctIndex: 1,
    explanationZh: 'rain shield = umbrella(雨傘)。她手上撐著一把傘。',
    subSkill: 'vocab',
  },
  // q6 — R1: sentence "come slowly" + correct "slowly"
  'kt-ch1-l7-q6': {
    sentence: 'Her steps move with a calm pace.',
    question: 'How do the footsteps come?',
    options: ['slowly', 'loudly', 'wildly', 'lazily'],
    optionsZh: ['慢慢地', '大聲地', '狂野地', '懶懶地'],
    correctIndex: 0,
    explanationZh: 'calm pace = slowly(慢慢地)。腳步聲輕,聽得出對方不急。',
    subSkill: 'detail',
  },
  // q7 — R1: sentence "grey and short" + correct "grey"
  'kt-ch1-l7-q7': {
    sentence: 'Her hair has turned the color of stone.',
    question: 'How is her hair?',
    options: ['grey', 'great', 'grim', 'grain'],
    optionsZh: ['灰色', '很棒', '嚴峻', '穀物'],
    correctIndex: 0,
    explanationZh: 'color of stone = grey(灰色)。奶奶的頭髮已經白了大半。',
    subSkill: 'inference',
  },
  // q8 — R1: sentence "moves carefully" + correct "carefully"
  'kt-ch1-l7-q8': {
    sentence: 'She steps with great care toward the cat.',
    question: 'How does she move?',
    options: ['carefully', 'careless', 'carrots', 'carry on'],
    optionsZh: ['小心地', '粗心', '胡蘿蔔', '繼續'],
    correctIndex: 0,
    explanationZh: 'with great care = carefully(小心地)。她不想嚇到躲在牆角的小貓。',
    subSkill: 'detail',
  },
  // q9 — R1: sentence "look soft" + correct "soft"
  'kt-ch1-l7-q9': {
    sentence: 'Her eyes carry a gentle light.',
    question: 'How do her eyes look?',
    options: ['soft', 'sore', 'sour', 'sharp'],
    optionsZh: ['溫和', '痠痛', '酸', '尖銳'],
    correctIndex: 0,
    explanationZh: 'gentle light = soft(溫和)。她看小貓的眼神像看孫子。',
    subSkill: 'inference',
  },
  // q10 — R1: sentence "not a monster" + correct "a kind woman"
  // Sentence does not contain "kind woman". So R1 passes.
  'kt-ch1-l7-q10': {
    subSkill: 'gist',
  },
  // q11 — R1: sentence "to find me" + correct "to find the cat"
  // "to find" appears in sentence but exactly "to find the cat" doesn't. Sentence has "to find me" — "me" not "the cat". Pass R1. Just tag.
  'kt-ch1-l7-q11': {
    subSkill: 'inference',
  },
  // q12 — R1: sentence "long coat" + correct "a long coat"
  'kt-ch1-l7-q12': {
    sentence: 'She is dressed in heavy outer clothing.',
    question: 'What does she wear?',
    options: ['a long coat', 'a short shirt', 'a thin scarf', 'a wide hat'],
    optionsZh: ['長外套', '短襯衫', '薄圍巾', '寬帽子'],
    correctIndex: 0,
    explanationZh: 'heavy outer clothing = long coat(長外套)。雨夜出門她穿得很厚。',
    subSkill: 'detail',
  },

  // ---------- L8 ----------
  // q1 — R1: sentence "opens her umbrella" + correct "opens"
  'kt-ch1-l8-q1': {
    sentence: 'The woman spreads her umbrella wide.',
    question: 'What does she do?',
    options: ['opens', 'drops', 'closes', 'throws'],
    optionsZh: ['打開', '掉', '關上', '丟'],
    correctIndex: 0,
    explanationZh: 'spread wide = open(打開)。她把傘撐開。',
    subSkill: 'vocab',
  },
  // q2 — R1: sentence "holds it over the cat" + correct "over"
  'kt-ch1-l8-q2': {
    sentence: 'She places the umbrella above the kitten.',
    question: 'Where does she hold it?',
    options: ['under', 'inside', 'over', 'behind'],
    optionsZh: ['下面', '裡面', '上面', '後面'],
    correctIndex: 2,
    explanationZh: 'above = over(在上方)。傘擋在小貓頭頂。',
    subSkill: 'detail',
  },
  // q3 — R1: sentence "rain stops" + correct "stops"
  'kt-ch1-l8-q3': {
    sentence: 'The water no longer hits the kitten.',
    question: 'What does the rain now do?',
    options: ['stops', 'steps', 'starts', 'stays'],
    optionsZh: ['停', '踏', '開始', '留'],
    correctIndex: 0,
    explanationZh: 'no longer hits = stops(停)。雨不再打到她身上。',
    subSkill: 'inference',
  },
  // q4 — R1: sentence "looks up" + correct "up"
  'kt-ch1-l8-q4': {
    sentence: 'The cat lifts her face toward her.',
    question: 'Where does the cat look?',
    options: ['away', 'up', 'down', 'back'],
    optionsZh: ['離開', '向上', '向下', '背'],
    correctIndex: 1,
    explanationZh: 'lift face toward = look up(向上看)。小貓抬起頭看著這位阿姨。',
    subSkill: 'detail',
  },
  // q5 — R1: sentence "smiles softly" + correct "softly"
  'kt-ch1-l8-q5': {
    sentence: 'The woman gives a tender quiet smile.',
    question: 'How does she smile?',
    options: ['nervously', 'loudly', 'wickedly', 'softly'],
    optionsZh: ['緊張地', '大聲地', '邪惡地', '輕輕地'],
    correctIndex: 3,
    explanationZh: 'tender quiet = softly(輕輕地)。她對小貓溫柔地笑。',
    subSkill: 'inference',
  },
  // q6 — R1: sentence "wide and big" + correct "wide"
  'kt-ch1-l8-q6': {
    sentence: 'The umbrella spreads broad and large.',
    question: 'How is the umbrella?',
    options: ['wide', 'wild', 'wise', 'weak'],
    optionsZh: ['寬', '狂野', '聰明', '虛弱'],
    correctIndex: 0,
    explanationZh: 'broad = wide(寬的)。傘大得可以蓋住小貓跟自己。',
    subSkill: 'vocab',
  },
  // q7 — R1: sentence "stays dry" + correct "dry"
  'kt-ch1-l8-q7': {
    sentence: 'No more water touches her fur now.',
    question: 'How is the cat now?',
    options: ['dry', 'drop', 'draw', 'deep'],
    optionsZh: ['乾', '掉', '畫', '深'],
    correctIndex: 0,
    explanationZh: 'no water touches = dry(乾的)。有傘擋著,雨打不到她了。',
    subSkill: 'inference',
  },
  // q8 — R1: sentence "feels a little safer" + correct "a little safer"
  'kt-ch1-l8-q8': {
    sentence: 'Her body relaxes just a touch.',
    question: 'How does the cat feel now?',
    options: ['a little safer', 'much more scared', 'still very wet', 'very angry'],
    optionsZh: ['稍安心', '更害怕', '還很濕', '很生氣'],
    correctIndex: 0,
    explanationZh: 'relax a touch = a little safer(稍微安心)。傘下不冷,影子也沒攻擊她。',
    subSkill: 'inference',
  },
  // q9 — R1: sentence "heart beats a bit slower" + correct "a bit slower"
  'kt-ch1-l8-q9': {
    sentence: 'Her pulse calms down step by step.',
    question: 'How does her heart beat?',
    options: ['a bit slower', 'much faster', 'wildly loud', 'totally still'],
    optionsZh: ['稍微慢', '更快', '狂亂大聲', '完全停'],
    correctIndex: 0,
    explanationZh: 'pulse calm down = beat slower(心跳變慢)。她不再像剛才那麼害怕。',
    subSkill: 'inference',
  },
  // q10 — R1: sentence "covers the cat" + correct "covers the cat"
  'kt-ch1-l8-q10': {
    sentence: 'The umbrella shields her from the falling drops.',
    question: 'What does the umbrella do?',
    options: ['covers the cat', 'warms the cat', 'feeds the cat', 'carries the cat'],
    optionsZh: ['為貓擋雨', '為貓加熱', '餵貓', '抱貓'],
    correctIndex: 0,
    explanationZh: 'shield from drops = cover from rain(為貓擋雨)。傘的工作就是這個。',
    subSkill: 'gist',
  },
  // q11 — R1: sentence "Her own arm is in the rain" + correct "the woman's arm"
  // Sentence "her own arm" - "the woman's arm" not literally in sentence. Pass R1. Tag.
  'kt-ch1-l8-q11': {
    subSkill: 'inference',
  },
  // q12 — R1: sentence "rain still falls outside the umbrella" + correct "the rain"
  'kt-ch1-l8-q12': {
    sentence: 'Outside the umbrella, water still pours down.',
    question: 'What is outside the umbrella?',
    options: ['the rain', 'the sun', 'the snow', 'the wind only'],
    optionsZh: ['雨', '太陽', '雪', '只有風'],
    correctIndex: 0,
    explanationZh: 'water pours down = the rain(雨)。雨還在下,傘下才是乾的。',
    subSkill: 'detail',
  },

  // ---------- L9 ----------
  // q1 — R1: sentence quote "Do not be afraid" + correct "Do not be afraid"
  'kt-ch1-l9-q1': {
    sentence: 'The woman whispers a gentle "There is nothing to fear."',
    question: 'What does she say?',
    options: ['Do not move now', 'Do not look back', 'Do not come here', 'Do not be afraid'],
    optionsZh: ['現在不要動', '不要回頭看', '不要過來', '不要害怕'],
    correctIndex: 3,
    explanationZh: 'nothing to fear = Do not be afraid(不要怕)。她想讓小貓安心。',
    subSkill: 'gist',
  },
  // q2 — R1: sentence "voice is soft" + correct "soft"
  'kt-ch1-l9-q2': {
    sentence: 'Her tone sounds like cotton.',
    question: 'How is her voice?',
    options: ['loud', 'sharp', 'fast', 'soft'],
    optionsZh: ['大聲', '尖', '快', '柔軟的'],
    correctIndex: 3,
    explanationZh: 'like cotton = soft(輕柔的)。她的聲音像棉花一樣軟。',
    subSkill: 'inference',
  },
  // q3 — R1: sentence "cat listens" + correct "listens"
  'kt-ch1-l9-q3': {
    sentence: 'The cat keeps her ears open to her.',
    question: 'What does the cat do?',
    options: ['listens', 'lessens', 'lists', 'lifts'],
    optionsZh: ['聽', '減少', '列出', '舉起'],
    correctIndex: 0,
    explanationZh: 'ears open = listens(聽)。小貓豎起耳朵專心聽。',
    subSkill: 'vocab',
  },
  // q4 — R1: sentence "a little warm" + correct "a little warm"
  'kt-ch1-l9-q4': {
    sentence: 'A small heat grows in her chest.',
    question: 'How does she feel now?',
    options: ['a little warm', 'very sleepy', 'colder', 'more scared'],
    optionsZh: ['有點暖', '很想睡', '更冷', '更害怕'],
    correctIndex: 0,
    explanationZh: 'small heat = a little warm(有點暖)。心裡開始一點點不冷了。',
    subSkill: 'inference',
  },
  // q5 — R1: sentence "not afraid anymore" + correct "not afraid anymore"
  'kt-ch1-l9-q5': {
    sentence: 'Her fear has melted away by the end.',
    question: 'How does the cat feel at the end?',
    options: ['angry at the woman', 'still very scared', 'ready to run away', 'not afraid anymore'],
    optionsZh: ['對女人生氣', '還是很害怕', '準備好逃跑', '不再害怕'],
    correctIndex: 3,
    explanationZh: 'fear melted = not afraid anymore(不再害怕)。溫柔的聲音讓她放心。',
    subSkill: 'gist',
  },
  // q6 — R1: sentence "in a low tone" + correct "in a low tone"
  'kt-ch1-l9-q6': {
    sentence: 'She speaks down low and gently.',
    question: 'How does she speak?',
    options: ['in a low tone', 'in a loud yell', 'in a high pitch', 'in a quick chant'],
    optionsZh: ['低聲', '大聲喊', '高音', '快速念'],
    correctIndex: 0,
    explanationZh: 'down low = in a low tone(低聲)。她特意把聲音壓低。',
    subSkill: 'detail',
  },
  // q7 — R1: sentence "slow and kind" + correct "slow and kind"
  'kt-ch1-l9-q7': {
    sentence: 'Each word comes out calm and warm.',
    question: 'How are her words?',
    options: ['slow and kind', 'fast and harsh', 'loud and rough', 'tight and short'],
    optionsZh: ['慢又溫柔', '快又嚴厲', '大聲又粗', '緊又短'],
    correctIndex: 0,
    explanationZh: 'calm and warm = slow and kind(慢又溫柔)。她讓小貓有時間理解。',
    subSkill: 'inference',
  },
  // q8 — R1: sentence quoted "You are safe now" + correct "You are safe now"
  'kt-ch1-l9-q8': {
    sentence: 'She gives the kitten a soft promise of safety.',
    question: 'What does she promise?',
    options: ['You are safe now', 'You must run away', 'You will go home', 'You should be brave'],
    optionsZh: ['你現在安全', '你必須逃跑', '你會回家', '你要勇敢'],
    correctIndex: 0,
    explanationZh: 'promise of safety = You are safe now(你現在安全)。一句話讓小貓肩膀放下來。',
    subSkill: 'gist',
  },
  // q9 — R1: sentence "smile is gentle" + correct "gentle"
  'kt-ch1-l9-q9': {
    sentence: 'Her grin curves up softly at the corners.',
    question: 'How is her smile?',
    options: ['gentle', 'general', 'genius', 'gigantic'],
    optionsZh: ['溫柔', '一般', '天才', '巨大'],
    correctIndex: 0,
    explanationZh: 'softly curves up = gentle smile(溫柔的笑)。眼角彎彎,嘴角微微上揚。',
    subSkill: 'vocab',
  },
  // q10 — R1: sentence "warm voice" + correct "warm"
  'kt-ch1-l9-q10': {
    sentence: 'The cat feels heat in the sound of her words.',
    question: 'How is her voice?',
    options: ['warm', 'warn', 'worn', 'ward'],
    optionsZh: ['溫暖', '警告', '破舊', '病房'],
    correctIndex: 0,
    explanationZh: 'heat in sound = warm voice(溫暖的聲音)。',
    subSkill: 'vocab',
  },
  // q11 — R1: sentence "not raise her voice" + correct "no she stays soft"
  // "stays soft" not in sentence — pass R1. Tag.
  'kt-ch1-l9-q11': {
    subSkill: 'inference',
  },
  // q12 — R1: sentence "voice makes the cat calm" + correct "makes the cat calm"
  'kt-ch1-l9-q12': {
    sentence: 'The sound she gives off settles the kitten.',
    question: 'What does her voice do?',
    options: ['makes the cat calm', 'makes the cat sleep', 'makes the cat run', 'makes the cat sing'],
    optionsZh: ['讓貓平靜', '讓貓睡', '讓貓跑', '讓貓唱'],
    correctIndex: 0,
    explanationZh: 'settles the kitten = makes the cat calm(讓貓平靜)。',
    subSkill: 'gist',
  },

  // ---------- L10 ----------
  // q1 — R1: sentence "squats down slowly" + correct "slowly"
  'kt-ch1-l10-q1': {
    sentence: 'The woman lowers herself with no rush.',
    question: 'How does she go down?',
    options: ['loudly', 'angrily', 'quickly', 'slowly'],
    optionsZh: ['大聲地', '生氣地', '快速地', '慢慢地'],
    correctIndex: 3,
    explanationZh: 'no rush = slowly(慢慢地)。她不想嚇到小貓,蹲下的動作很輕。',
    subSkill: 'inference',
  },
  // q2 — R1: sentence "looks into the cat's eyes" + correct "into the cat's eyes"
  'kt-ch1-l10-q2': {
    sentence: 'She meets her gaze with the kitten.',
    question: 'Where does she look?',
    options: ['into her own bag', 'into the wet road', 'into the dark sky', "into the cat's eyes"],
    optionsZh: ['進她自己的袋子', '走進濕路', '進入黑暗的天空', '看向貓的眼睛'],
    correctIndex: 3,
    explanationZh: "meet gaze = look into the cat's eyes(看向貓的眼睛)。",
    subSkill: 'detail',
  },
  // q3 — R1: sentence "voice is gentle" + correct "gentle"
  'kt-ch1-l10-q3': {
    sentence: 'Her words come out as soft as silk.',
    question: "How is Grandma's voice?",
    options: ['gentle', 'gentile', 'general', 'genuine'],
    optionsZh: ['溫柔', '外邦人', '將軍', '真實'],
    correctIndex: 0,
    explanationZh: 'soft as silk = gentle(溫柔的)。',
    subSkill: 'vocab',
  },
  // q4 — R1: sentence quoted "Why are you out here" + correct "Why are you out here"
  'kt-ch1-l10-q4': {
    sentence: 'She gently asks the kitten her reason for being outside.',
    question: 'What does she ask?',
    options: [
      'Who is taking you home',
      'Why are you out here',
      'Where are you going now',
      'When did you come here',
    ],
    optionsZh: ['誰帶你回家', '你為什麼在外面', '你現在要去哪', '你什麼時候來的'],
    correctIndex: 1,
    explanationZh: 'reason for being outside = Why are you out here(為什麼在外面)。',
    subSkill: 'gist',
  },
  // q5 — R1: sentence "is quiet" + correct "stays quiet"
  'kt-ch1-l10-q5': {
    sentence: 'No sound comes from the kitten in reply.',
    question: 'How does the cat respond?',
    options: ['purrs happily', 'runs away fast', 'answers loudly', 'stays quiet'],
    optionsZh: ['開心地呼嚕', '快速逃走', '大聲回答', '保持安靜'],
    correctIndex: 3,
    explanationZh: 'no sound = stays quiet(保持安靜)。小貓沒出聲,只是看著她。',
    subSkill: 'inference',
  },
  // q6 — R1: sentence "her knees touch" + correct "her knees"
  'kt-ch1-l10-q6': {
    sentence: 'The middle of her legs press on the wet road.',
    question: 'What touches the ground?',
    options: ['her knees', 'her cheeks', 'her wrists', 'her elbows'],
    optionsZh: ['她的膝蓋', '她的臉頰', '她的手腕', '她的手肘'],
    correctIndex: 0,
    explanationZh: 'middle of legs = knees(膝蓋)。她蹲下時膝蓋直接碰到濕地。',
    subSkill: 'detail',
  },
  // q7 — R1: sentence "to look small" + correct "to look small"
  'kt-ch1-l10-q7': {
    sentence: 'She crouches so she will seem less big.',
    question: 'Why does she stay low?',
    options: ['to look small', 'to look tall', 'to look fast', 'to look loud'],
    optionsZh: ['看起來小', '看起來高', '看起來快', '看起來大聲'],
    correctIndex: 0,
    explanationZh: 'seem less big = look small(看起來小)。蹲低不會嚇到牆角的小貓。',
    subSkill: 'inference',
  },
  // q8 — R1: sentence "sounds soft" + correct "soft"
  'kt-ch1-l10-q8': {
    sentence: 'Her words come out feather-light.',
    question: 'How does her question sound?',
    options: ['soft', 'salt', 'sort', 'sand'],
    optionsZh: ['輕柔', '鹽', '種類', '沙'],
    correctIndex: 0,
    explanationZh: 'feather-light = soft(輕柔)。她不想用任何尖銳的字。',
    subSkill: 'vocab',
  },
  // q9 — R1: sentence "full of care" + correct "care"
  'kt-ch1-l10-q9': {
    sentence: 'Her eyes hold a wish to look after her.',
    question: 'What fills her eyes?',
    options: ['care', 'card', 'carp', 'cash'],
    optionsZh: ['關心', '卡片', '鯉魚', '現金'],
    correctIndex: 0,
    explanationZh: 'wish to look after = care(關心)。眼神裡是想照顧人的心情。',
    subSkill: 'vocab',
  },
  // q10 — R1: sentence "blinks at her slowly" + correct "slowly"
  'kt-ch1-l10-q10': {
    sentence: 'The cat closes and opens her eyes with a calm pace.',
    question: 'How does the cat blink?',
    options: ['slowly', 'sadly', 'sourly', 'sharply'],
    optionsZh: ['慢慢地', '悲傷地', '酸地', '尖銳地'],
    correctIndex: 0,
    explanationZh: 'calm pace = slowly(慢慢地)。貓的「我信任你」訊號。',
    subSkill: 'inference',
  },
  // q11 — R1: sentence "not reach to grab her" + correct "she does not grab"
  'kt-ch1-l11-q11_PLACEHOLDER': null,  // intentional; we handle below
  'kt-ch1-l10-q11': {
    sentence: 'She keeps her hands back and does not snatch.',
    question: 'What does she not do?',
    options: ['she does not grab', 'she does not look', 'she does not stay', 'she does not breathe'],
    optionsZh: ['她沒抓', '她沒看', '她沒留', '她沒呼吸'],
    correctIndex: 0,
    explanationZh: 'does not snatch = does not grab(沒有抓)。她讓小貓自己決定要不要靠近。',
    subSkill: 'detail',
  },
  // q12 — R1: sentence "waits for the cat to answer" + correct "the cat to answer"
  'kt-ch1-l10-q12': {
    sentence: 'She gives the kitten time to find words.',
    question: 'What does she wait for?',
    options: ['the cat to answer', 'the rain to stop', 'the bus to come', 'the sun to rise'],
    optionsZh: ['貓回答', '雨停', '公車來', '太陽升'],
    correctIndex: 0,
    explanationZh: 'time to find words = the cat to answer(等貓回答)。她有耐心,願意等。',
    subSkill: 'gist',
  },
};

delete REWRITES['kt-ch1-l11-q11_PLACEHOLDER'];

// ============================================================
// R3 key-position rebalance plan per lesson.
// After REWRITES applied, we'll measure distribution. Pre-plan:
// remap some correctIndex via option-swap to hit ~3 each {0,1,2,3}.
// Done by swap-after-rewrite below.
// ============================================================
// Per-lesson swaps: array of {qId, fromIdx, toIdx}
// We'll compute after applying rewrites.

// ============================================================
// Apply rewrites
// ============================================================
const LESSONS_IN_SCOPE = ['kt-ch1-l1', 'kt-ch1-l2', 'kt-ch1-l3', 'kt-ch1-l4', 'kt-ch1-l5',
  'kt-ch1-l6', 'kt-ch1-l7', 'kt-ch1-l8', 'kt-ch1-l9', 'kt-ch1-l10'];

for (const lesson of data) {
  if (!LESSONS_IN_SCOPE.includes(lesson.id)) continue;
  for (const q of lesson.questions) {
    counters.total++;
    const r = REWRITES[q.id];
    if (!r) continue;

    const before = { sentence: q.sentence, question: q.question, options: q.options?.slice(), correctIndex: q.correctIndex };

    if (r.sentence !== undefined) q.sentence = r.sentence;
    if (r.question !== undefined) q.question = r.question;
    if (r.options !== undefined) q.options = r.options;
    if (r.optionsZh !== undefined) q.optionsZh = r.optionsZh;
    if (r.correctIndex !== undefined) q.correctIndex = r.correctIndex;
    if (r.explanationZh !== undefined) q.explanationZh = r.explanationZh;
    if (r.subSkill !== undefined) q.subSkill = r.subSkill;

    if (r.sentence !== undefined || r.question !== undefined || r.options !== undefined || r.correctIndex !== undefined) {
      counters.totalRewrites++;
      if (r.sentence !== undefined) counters.R1++;
    }
  }
}

// ============================================================
// Lint pass — verify R1 / A6 / R2 / R5 / R3 / R6 after rewrites
// ============================================================
const lintReport = [];

for (const lesson of data) {
  if (!LESSONS_IN_SCOPE.includes(lesson.id)) continue;

  // R6: count subskills
  const subSkillCount = { gist: 0, detail: 0, inference: 0, vocab: 0, function: 0 };
  for (const q of lesson.questions) {
    if (q.subSkill) subSkillCount[q.subSkill] = (subSkillCount[q.subSkill] || 0) + 1;
  }

  // R3: count correctIndex distribution
  const idxCount = [0, 0, 0, 0];
  for (const q of lesson.questions) {
    if (typeof q.correctIndex === 'number') idxCount[q.correctIndex]++;
  }

  // R5: jaccard pairs
  const qWithStems = lesson.questions.filter((q) => q.question);
  const r5violations = [];
  for (let i = 0; i < qWithStems.length; i++) {
    for (let j = i + 1; j < qWithStems.length; j++) {
      const score = jaccard(qWithStems[i].question, qWithStems[j].question);
      if (score >= 0.4) {
        r5violations.push({ a: qWithStems[i].id, b: qWithStems[j].id, score: score.toFixed(2) });
      }
    }
  }

  // R1/A6 check post-rewrite
  const r1leaks = [];
  const a6leaks = [];
  for (const q of lesson.questions) {
    if (q.options && typeof q.correctIndex === 'number') {
      const correct = q.options[q.correctIndex];
      if (correct && contains(q.sentence, correct)) {
        r1leaks.push({ qid: q.id, correct, sentence: q.sentence });
      }
      if (q.question && contains(q.question, correct)) {
        a6leaks.push({ qid: q.id, correct, question: q.question });
      }
    }
  }

  // R2 length parity
  const r2violations = [];
  for (const q of lesson.questions) {
    if (q.options) {
      const lens = q.options.map((o) => o.length);
      const max = Math.max(...lens);
      const min = Math.min(...lens);
      if (min > 0 && max / min > 1.25) {
        r2violations.push({ qid: q.id, max, min, ratio: (max / min).toFixed(2) });
      }
    }
  }

  lintReport.push({
    lessonId: lesson.id,
    subSkillCount,
    idxCount,
    r5violations,
    r1leaks,
    a6leaks,
    r2violations,
  });
}

// ============================================================
// R3 rebalance: per lesson, move correctIndex via option swap
// to land in [3, 4] for each index.
// ============================================================
function rebalanceR3(lesson) {
  const idxCount = [0, 0, 0, 0];
  const qsWithOptions = [];
  for (const q of lesson.questions) {
    if (typeof q.correctIndex === 'number' && q.options) {
      idxCount[q.correctIndex]++;
      qsWithOptions.push(q);
    }
  }
  const total = qsWithOptions.length;
  if (total !== 12) return false; // only for 12-Q lessons

  const target = 3;
  // Need each idx in [3, 4]. Excess goes from over-represented to under-represented.
  let changed = false;
  for (let pass = 0; pass < 6; pass++) {
    let over = -1, under = -1;
    for (let i = 0; i < 4; i++) {
      if (idxCount[i] >= target + 2 && over === -1) over = i;  // 5+
      if (idxCount[i] < target && under === -1) under = i;
    }
    // also consider 4 → balance if under exists
    if (under === -1) {
      for (let i = 0; i < 4; i++) {
        if (idxCount[i] < target) { under = i; break; }
      }
    }
    if (over === -1) {
      for (let i = 0; i < 4; i++) {
        if (idxCount[i] > target + 1) { over = i; break; }
      }
    }
    if (over === -1 || under === -1 || over === under) break;

    // Find a Q in this lesson with correctIndex === over that is safe to swap.
    // Skip tap-tiles / tap-pairs (no options array).
    const candidate = qsWithOptions.find(
      (q) => q.correctIndex === over && q.options && q.options.length === 4
    );
    if (!candidate) break;

    // Swap options[over] and options[under]
    const tmp = candidate.options[over];
    candidate.options[over] = candidate.options[under];
    candidate.options[under] = tmp;
    if (candidate.optionsZh) {
      const tmpZh = candidate.optionsZh[over];
      candidate.optionsZh[over] = candidate.optionsZh[under];
      candidate.optionsZh[under] = tmpZh;
    }
    candidate.correctIndex = under;
    idxCount[over]--;
    idxCount[under]++;
    changed = true;
    // Move it out of qsWithOptions slot tracking by updating? we'll re-enter loop.
  }
  return changed;
}

for (const lesson of data) {
  if (!LESSONS_IN_SCOPE.includes(lesson.id)) continue;
  const ok = rebalanceR3(lesson);
  if (ok) counters.R3_rebalanced++;
}

// Re-lint after R3 rebalance
const finalReport = [];
for (const lesson of data) {
  if (!LESSONS_IN_SCOPE.includes(lesson.id)) continue;

  const subSkillCount = { gist: 0, detail: 0, inference: 0, vocab: 0, function: 0 };
  for (const q of lesson.questions) {
    if (q.subSkill) subSkillCount[q.subSkill] = (subSkillCount[q.subSkill] || 0) + 1;
  }

  const idxCount = [0, 0, 0, 0];
  for (const q of lesson.questions) {
    if (typeof q.correctIndex === 'number') idxCount[q.correctIndex]++;
  }

  const r1leaks = [];
  const a6leaks = [];
  const r2violations = [];
  for (const q of lesson.questions) {
    if (q.options && typeof q.correctIndex === 'number') {
      const correct = q.options[q.correctIndex];
      if (correct && contains(q.sentence, correct)) {
        r1leaks.push({ qid: q.id, correct });
      }
      if (q.question && contains(q.question, correct)) {
        a6leaks.push({ qid: q.id, correct });
      }
      const lens = q.options.map((o) => o.length);
      const max = Math.max(...lens);
      const min = Math.min(...lens);
      if (min > 0 && max / min > 1.25) {
        r2violations.push({ qid: q.id, max, min, ratio: (max / min).toFixed(2) });
      }
    }
  }

  const qWithStems = lesson.questions.filter((q) => q.question);
  const r5violations = [];
  for (let i = 0; i < qWithStems.length; i++) {
    for (let j = i + 1; j < qWithStems.length; j++) {
      const score = jaccard(qWithStems[i].question, qWithStems[j].question);
      if (score >= 0.4) {
        r5violations.push({ a: qWithStems[i].id, b: qWithStems[j].id, score: score.toFixed(2) });
      }
    }
  }

  finalReport.push({
    lessonId: lesson.id,
    subSkillCount,
    idxCount,
    r1leaks,
    a6leaks,
    r2violations,
    r5violations,
  });
}

// Save lessons-ch1.json
const out = JSON.stringify(data, null, 2) + '\n';
writeFileSync(lessonsPath, out, 'utf-8');

// Counter final tally for the report
let totalR1 = 0, totalA6 = 0, totalR2 = 0, totalR5 = 0, totalR6 = 0;
for (const r of finalReport) {
  totalR1 += r.r1leaks.length;
  totalA6 += r.a6leaks.length;
  totalR2 += r.r2violations.length;
  totalR5 += r.r5violations.length;
  // R6: lesson balanced if subSkillCount meets >=3 gist, >=5 detail, >=2 inf, >=2 vocab/function
  const v = (r.subSkillCount.vocab || 0) + (r.subSkillCount.function || 0);
  const ok = r.subSkillCount.gist >= 3 && r.subSkillCount.detail >= 5 && r.subSkillCount.inference >= 2 && v >= 2;
  if (ok) counters.R6_rebalanced++;
}

// Build markdown report
const sampleDiffs = [
  {
    label: 'L1 Q1 — R1 fix: "stray cat" was substring of correct',
    before: 'sentence: "I am {catName}. I am a stray cat." / correct: "stray"',
    after: 'sentence: "I am {catName}. I have no home of my own." / correct: "stray"',
  },
  {
    label: 'L1 Q3 — R1 fix: "jump" was in sentence',
    before: 'sentence: "I jump on the low wall." / correct: "jump"',
    after: 'sentence: "My paws spring up to the low wall." / correct: "jump"',
  },
  {
    label: 'L2 Q1 — R1 fix: "wags" was in sentence',
    before: 'sentence: "{dogName} wags his tail." / correct: "wag"',
    after: 'sentence: "{dogName} swings his tail side to side." / correct: "wag"',
  },
  {
    label: 'L5 Q2 — R1 fix: "fur" was in sentence',
    before: 'sentence: "Her fur is all wet." / correct: "fur"',
    after: 'sentence: "Her coat of hair is soaked through." / correct: "fur"',
  },
  {
    label: 'L7 Q5 — R1 fix: "umbrella" was in sentence',
    before: 'sentence: "She holds an umbrella." / correct: "umbrella"',
    after: 'sentence: "A rain shield rests in her hand." / correct: "umbrella"',
  },
];

const md = `# QA Report — TOEIC Standard v1 Applied to lessons-ch1.json L1-L10

Generated: ${new Date().toISOString()}

## Summary
- Total Qs audited: **${counters.total}** (target 120, 12 per lesson × 10 lessons)
- R1 violations found + fixed: **${counters.R1}** (correct option leaked verbatim in sentence)
- A6 violations: **${counters.A6}** (correct option leaked in question stem)
- A3 violations: **${counters.A3}**
- R2 violations: **${counters.R2}**
- R5 Jaccard pairs rewritten: **${counters.R5}**
- R6 variety rebalanced lessons: **${counters.R6_rebalanced}** / 10
- R3 key-position rebalanced lessons: **${counters.R3_rebalanced}** / 10
- Total questions rewritten: **${counters.totalRewrites}**

## Per-lesson lint report (post-rewrite)

${finalReport.map((r) => `### ${r.lessonId}
- subSkill: gist=${r.subSkillCount.gist} detail=${r.subSkillCount.detail} inference=${r.subSkillCount.inference} vocab=${r.subSkillCount.vocab} function=${r.subSkillCount.function || 0}
- correctIndex distribution: [${r.idxCount.join(', ')}]
- R1 residual leaks: ${r.r1leaks.length === 0 ? '0 ✅' : r.r1leaks.map((x) => x.qid + '("' + x.correct + '")').join(', ')}
- A6 residual leaks: ${r.a6leaks.length === 0 ? '0 ✅' : r.a6leaks.map((x) => x.qid + '("' + x.correct + '")').join(', ')}
- R2 violations: ${r.r2violations.length === 0 ? '0 ✅' : r.r2violations.map((x) => x.qid + '(ratio ' + x.ratio + ')').join(', ')}
- R5 high-jaccard pairs: ${r.r5violations.length === 0 ? '0 ✅' : r.r5violations.map((x) => x.a + '↔' + x.b + '(' + x.score + ')').join(', ')}`).join('\n\n')}

## 5 Representative before/after diffs

${sampleDiffs.map((d) => `### ${d.label}
- **Before:** ${d.before}
- **After:** ${d.after}`).join('\n\n')}

## Schema impact
Added optional \`subSkill: 'gist' | 'detail' | 'inference' | 'vocab' | 'function'\` field to FourOptionShape in src/data/lessons.ts. Backwards-compatible; Zod additive.

## Notes
- Only L1-L10 modified (kt-ch1-l1 through kt-ch1-l10). L11-L24 untouched.
- Story coherence preserved: paraphrases use synonyms (e.g., "stray" → "no home of my own", "fur" → "coat of hair", "umbrella" → "rain shield") consistent with cat POV / grandma evening framing.
- tap-tiles type (kt-ch1-l3-q3, kt-ch1-l4-q5) kept as detail; not subject to R1/R3 (no options array).
`;

writeFileSync(reportPath, md, 'utf-8');

console.log('=== AUDIT COMPLETE ===');
console.log(`Audited: ${counters.total} questions across L1-L10`);
console.log(`Rewrites applied: ${counters.totalRewrites}`);
console.log(`R1 fixes: ${counters.R1}`);
console.log(`R3 lessons rebalanced: ${counters.R3_rebalanced}`);
console.log(`R6 lessons passing variety check: ${counters.R6_rebalanced}/10`);
console.log(`Residual R1 leaks: ${totalR1}`);
console.log(`Residual A6 leaks: ${totalA6}`);
console.log(`Residual R2 violations: ${totalR2}`);
console.log(`Residual R5 jaccard pairs: ${totalR5}`);
console.log(`Wrote: ${lessonsPath}`);
console.log(`Report: ${reportPath}`);
