#!/usr/bin/env node
/**
 * v2.0.C.2 — Add `intro` field (story setup card) to Ch1 lessons L1-L10.
 * User reported B.132 paraphrase rule R1 left some Qs un-answerable
 * without prior context. Intro shown on LessonScene mount before Q1.
 *
 * Also adds `contextHint` (ZH metadata, NOT shown in UI) on Qs whose
 * audio+intro+prompt+options still leave a genuine context gap for QA.
 *
 * Constraint: do NOT touch L11-L24. Write UTF-8 no BOM.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, '..', 'public', 'lessons-ch1.json');

const raw = readFileSync(filePath, 'utf-8');
const data = JSON.parse(raw);

// ============================================================
// Intros — one per lesson, ≤35 EN words, A2 vocab, no emoji,
// no verbatim answer words. Each ADDS new context (DRY).
// ============================================================
const INTROS = {
  'kt-ch1-l1': {
    en: "{catName} is a stray cat with no home. Every night she sneaks into Grandma's quiet yard. Tonight the moon is out, and she jumps up to wait.",
    zh: "{catName} 是一隻沒有家的流浪貓。每天晚上她偷偷溜進奶奶安靜的小院子。今晚月光出來了,她跳上來等。",
  },
  'kt-ch1-l2': {
    en: "Grandma keeps a brown shiba dog named {dogName} in the yard. He waits by the wall after dark for {catName}. They have been friends a long time.",
    zh: "奶奶在院子裡養了一隻棕色的柴犬,叫 {dogName}。每天天黑後他都在牆邊等 {catName}。他們已經是好朋友很久了。",
  },
  'kt-ch1-l3': {
    en: "Grandma sits in her old wooden chair and holds a thick brown book. She tells {catName} and {dogName} one story every night. Tonight is a new one.",
    zh: "奶奶坐在她舊舊的木椅上,手裡拿著一本厚厚的棕色書。她每晚對 {catName} 和 {dogName} 說一個故事。今晚是新的。",
  },
  'kt-ch1-l4': {
    en: "Grandma starts the new story. It happened many years back on a wet stormy night. The streets had no people, only rain and thunder.",
    zh: "奶奶開始說新故事。那是很多年前一個下大雨的夜晚。街上一個人都沒有,只有雨聲和雷聲。",
  },
  'kt-ch1-l5': {
    en: "In the story, a little kitten is out in the cold rain. Her mother went away last week and never came back. She has not eaten for two days.",
    zh: "故事裡,有一隻小小貓在冷雨中。她的媽媽上週離開後就再也沒回來。她已經兩天沒吃東西了。",
  },
  'kt-ch1-l6': {
    en: "The little kitten finds a narrow lane between two stone walls. She rolls her body small to keep warm. The smell of wet stone is around her.",
    zh: "小貓找到兩面石牆之間的窄巷子。她把身體縮成一團保暖。身邊都是濕石頭的味道。",
  },
  'kt-ch1-l7': {
    en: "A big dark figure walks down the lane. The kitten trembles. But the figure turns out to be a kind grey-haired lady in a long coat, holding an umbrella.",
    zh: "一個大大的黑影走進巷子。小貓在發抖。可是那個影子原來是一位頭髮花白、穿長外套、撐著傘的好心阿姨。",
  },
  'kt-ch1-l8': {
    en: "The lady steps right up to the kitten. She holds her wide umbrella over the little wet body. Her own arm gets soaked, but she does not move it.",
    zh: "阿姨走到小貓身邊。她把那把大傘撐在小小濕濕的身體上方。她自己的手臂被雨淋濕了,可是她沒移開。",
  },
  'kt-ch1-l9': {
    en: "Under the umbrella, the lady leans in. She speaks low, slowly, with a soft tone — like cotton. She tells the kitten there is nothing to fear.",
    zh: "在傘下,阿姨靠近一點。她壓低聲音,慢慢地、輕輕地說話 —— 像棉花一樣軟。她對小貓說沒什麼好怕的。",
  },
  'kt-ch1-l10': {
    en: "Still under the umbrella, the lady lowers herself onto her knees on the wet road. She meets the kitten's eyes and asks why she is out alone.",
    zh: "還在傘下,阿姨把膝蓋放在濕地上跪下來。她對著小貓的眼睛,問她為什麼一個人在外面。",
  },
};

// ============================================================
// contextHint flags — ZH 2-3 word notes for QA. Only flag genuine
// gaps where intro+audio+prompt+options STILL aren't enough.
// ============================================================
const CONTEXT_HINTS = {
  // L1 — intro covers stray + Grandma's yard + moon + wall
  // L2 — intro covers Hana=brown shiba + Grandma's + friends
  // L3 — intro covers brown book + wooden chair + new story
  // L4 — q1 "long ago" needs intro: covered ("many years back")
  //      q12 thunder: covered ("thunder")
  // L5 — q3 "two days no food": covered
  //      q9 lost mom: covered
  // L6 — q5 alley/narrow lane: covered
  //      q10 wet stone: covered
  // L7 — q3 "lady not beast": covered
  //      q5 umbrella: covered ("holding an umbrella")
  //      q7 grey hair: covered
  //      q12 long coat: covered
  // L8 — q11 woman's arm wet: covered (intro mentions her arm soaked)
  // L9 — q2 voice like cotton: covered
  //      q11 doesn't shout: inferential from "low" — should be fine
  // L10 — q6 knees on wet road: covered
  //       q10 slow blink trust signal: still cultural — flag
  'kt-ch1-l10-q10': '貓信任訊號',
};

let introsAdded = 0;
let hintsAdded = 0;

for (const lesson of data) {
  // Only touch L1-L10
  if (lesson.chapter !== 1) continue;
  if (lesson.lessonInChapter < 1 || lesson.lessonInChapter > 10) continue;

  const intro = INTROS[lesson.id];
  if (!intro) {
    console.error(`Missing INTRO for ${lesson.id}`);
    process.exit(1);
  }

  // Rebuild lesson preserving key order: id, chapter, lessonInChapter,
  // segmentType, storyId, storyBeat, intro, questions
  const rebuilt = {};
  for (const key of Object.keys(lesson)) {
    if (key === 'questions') {
      // Insert intro just before questions
      rebuilt.intro = intro;
      rebuilt.questions = lesson.questions;
    } else {
      rebuilt[key] = lesson[key];
    }
  }
  // Copy properties back onto original lesson (preserve array reference)
  for (const k of Object.keys(lesson)) delete lesson[k];
  for (const k of Object.keys(rebuilt)) lesson[k] = rebuilt[k];
  introsAdded++;

  // Add contextHints to questions
  for (const q of lesson.questions) {
    const hint = CONTEXT_HINTS[q.id];
    if (hint) {
      // Rebuild question with contextHint right after `sentence`
      const rebuiltQ = {};
      for (const key of Object.keys(q)) {
        rebuiltQ[key] = q[key];
        if (key === 'sentence') {
          rebuiltQ.contextHint = hint;
        }
      }
      for (const k of Object.keys(q)) delete q[k];
      for (const k of Object.keys(rebuiltQ)) q[k] = rebuiltQ[k];
      hintsAdded++;
    }
  }
}

// Serialize with 2-space indent (matches existing file style)
const out = JSON.stringify(data, null, 2) + '\n';

// Write UTF-8 no BOM
writeFileSync(filePath, out, { encoding: 'utf-8' });

console.log(`intros_added: ${introsAdded}`);
console.log(`contextHint_flagged: ${hintsAdded}`);
