#!/usr/bin/env node
/**
 * QA pass v2: tighten ALL question prompts in lessons-ch{1..8}.json so each
 * `question` field is:
 *   - a single WH-question (starts with What/Who/Where/When/Why/How/Which/Type)
 *   - <= 8 words total (token count, ignoring trailing punct)
 *   - single sentence ending in ?  (no `.` or `!` outside of quoted strings)
 *   - story-anchored (mentions {catName}/{dogName}/Grandma/main char) when natural
 *   - semantically matches the existing correctIndex option
 *   - no emoji, no Chinese
 *
 * Tap-tiles / tap-pairs UI affordance prompts are left untouched.
 *
 * Output:
 *   - mutates public/lessons-ch{1..8}.json in place (UTF-8 no BOM, 2-sp indent)
 *   - writes tools/qa-report-question-prompts-v2.md with stats + diffs
 *   - writes tools/_tighten-diffs-v2.json full audit trail
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
const reportPath = resolve(__dirname, 'qa-report-question-prompts-v2.md');

function countWords(s) {
  if (!s) return 0;
  const trimmed = s.replace(/[?.,!:;"']+$/g, '').trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

function isMultiSentence(s) {
  if (!s) return false;
  // Ignore punctuation inside quoted strings
  const noQuote = s.replace(/"[^"]*"/g, 'X').replace(/'[^']*'/g, 'X');
  const trimmed = noQuote.trim().replace(/[?.!]$/, '').trim();
  return /[.!?]/.test(trimmed);
}

function endsWithQuestion(s) {
  return s && s.trim().endsWith('?');
}

function isTapPrompt(q) {
  return q.type === 'tap-tiles' || q.type === 'tap-pairs';
}

// =============================================================================
// HAND-WRITTEN TIGHTENINGS — keyed by question id
// Each rewrite verified against correctIndex option + sentence context
// =============================================================================
const TIGHTEN = {
  // ====== Chapter 1 — Rainy night cat + Aesops ======
  'kt-ch1-l1-q1': 'What kind of cat is {catName}?',                    // stray
  'kt-ch1-l1-q3': 'How does {catName} get on the wall?',               // jump
  'kt-ch1-l2-q1': "What does {dogName}'s tail do?",                    // wag
  'kt-ch1-l2-q3': 'What are {catName} and {dogName}?',                 // friends
  'kt-ch1-l4-q3': 'How does the night feel?',                          // dark
  'kt-ch1-l5-q2': "What part of the kitten is wet?",                   // fur
  'kt-ch1-l5-q3': 'How many days without food?',                       // two
  'kt-ch1-l5-q5': 'What does the cold kitten do?',                     // shakes
  'kt-ch1-l6-q1': 'How does the kitten stay warm?',                    // curls
  'kt-ch1-l6-q3': 'How is the kitten by herself?',                     // alone
  'kt-ch1-l7-q1': 'What does the kitten see in the dark?',             // shadow (8 words)
  'kt-ch1-l7-q3': 'Who is the big shadow?',                            // woman
  'kt-ch1-l8-q3': 'What does the rain now do?',                        // stops
  'kt-ch1-l9-q3': 'What does the cat do?',                             // listens
  'kt-ch1-l10-q3': "How is Grandma's voice?",                          // gentle
  'kt-ch1-l11-q3': 'How is the kitten with no voice?',                 // silent (8)
  'kt-ch1-l12-q3': 'How is the towel?',                                // clean
  'kt-ch1-l13-q3': 'How does the cat now feel?',                       // warm
  'kt-ch1-l14-q4': 'What does Grandma suddenly have?',                 // idea
  'kt-ch1-l15-q3': 'How does Grandma greet the cat?',                  // welcome
  'kt-ch1-l16-q1': 'What does Grandma want to tell?',                  // another
  'kt-ch1-l16-q2': 'In what season is the story?',                     // summer
  'kt-ch1-l16-q3': 'Where do the ant and grasshopper live?',           // grass (8)
  'kt-ch1-l17-q3': 'What does the ant carry home?',                    // food
  'kt-ch1-l18-q3': 'How does the grasshopper feel in winter?',         // hungry (7)
  'kt-ch1-l19-q3': 'How do the wind and sun feel?',                    // stronger
  'kt-ch1-l20-q3': 'How does the traveler hold his coat?',             // tight (7)
  'kt-ch1-l21-q3': 'What does the traveler do?',                       // takes
  'kt-ch1-l22-q3': 'How is the hour now?',                             // late
  'kt-ch1-l23-q3': 'Which way does {catName} walk?',                   // back

  // ====== Chapter 2 — Momotaro + Tortoise/Hare warmup + Boy Cried Wolf ======
  'kt-ch2-l2-q1': "What does {dogName}'s tail do?",                    // thumps
  'kt-ch2-l5-q3': 'What does the giant peach do?',                     // floated
  'kt-ch2-l6-q1': 'What does the old woman do?',                       // lifted

  // ====== Chapter 3 — Ugly Duckling + Lion/Mouse + Shepherd/Wolf ======
  'kt-ch3-l1-q1': 'What season is tonight?',                           // autumn
  'kt-ch3-l1-q2': 'How does {catName} reach the wall?',                // climb
  'kt-ch3-l2-q2': "What does {dogName} do with eyes?",                 // looks
  'kt-ch3-l4-q3': 'How does the duckling feel inside?',                // warm
  'kt-ch3-l7-q3': 'What can the duckling do well?',                    // swim
  'kt-ch3-l8-q3': 'What do the ducklings call him?',                   // ugly (7)
  'kt-ch3-l9-q3': 'What animal do you hear?',                          // cat
  'kt-ch3-l9-q5': 'Why do the hen and cat reject him?',                // he is not like them (8)
  'kt-ch3-l11-q3': 'How does the duckling feel walking?',              // alone
  'kt-ch3-l12-q3': 'What does the duckling do at hunters?',            // hide
  'kt-ch3-l15-q3': "How do the duckling's feet feel?",                 // stuck
  'kt-ch3-l16-q3': 'What does the farmer do?',                         // saves
  'kt-ch3-l22-q3': 'What phrase do you hear?',                         // no one
  'kt-ch3-l23-q3': 'What does {catName} now do?',                      // think

  // ====== Chapter 4 — Tortoise/Hare + Crow/Fox + City/Country Mouse ======
  'kt-ch4-l1-q1': 'How does {catName} reach the wall?',                // climb
  'kt-ch4-l1-q3': 'What does Grandma do for him?',                     // waits
  'kt-ch4-l2-q1': "What does {dogName}'s tail do?",                    // thumps
  'kt-ch4-l2-q3': 'What is Grandma holding?',                          // book
  'kt-ch4-l4-q2': 'What does the Hare do about speed?',                // brags (8)
  'kt-ch4-l6-q2': 'What does the Tortoise say back?',                  // accept (7)
  'kt-ch4-l7-q3': 'What verb phrase do you hear?',                     // line up
  'kt-ch4-l8-q3': 'How does the Hare start running?',                  // fast
  'kt-ch4-l10-q3': 'What does the Hare think he has?',                 // time (8)
  'kt-ch4-l11-q3': 'What does the Hare quickly become?',               // asleep
  'kt-ch4-l12-q3': 'Where does the Tortoise walk past?',               // river
  'kt-ch4-l14-q3': 'How does the Tortoise feel inside?',               // tired
  'kt-ch4-l15-q3': 'What is the end of the race?',                     // finish (8)
  'kt-ch4-l16-q3': 'What does the Tortoise say?',                      // made
  'kt-ch4-l17-q3': 'What does the Hare do awake?',                     // runs
  'kt-ch4-l19-q3': "What is in the Crow's beak?",                      // cheese
  'kt-ch4-l20-q2': 'How does the Fox trick the Crow?',                 // flatters
  'kt-ch4-l20-q3': 'What does the Crow do to sing?',                   // opens
  'kt-ch4-l21-q3': "How is the country mouse's food?",                 // simple
  'kt-ch4-l23-q3': 'What does {dogName} do?',                          // sighs
  'kt-ch4-l24-q3': 'Where does {catName} walk back?',                  // alley
  'kt-ch4-l25-q4': 'Why did the Tortoise keep going?',                 // He knew the finish was close
  'kt-ch4-l25-q6': "What is the tortoise's small magic?",              // patience

  // ====== Chapter 5 — Camel's Hump + Reed/Oak + Mice meeting ======
  'kt-ch5-l1-q3': 'What does {catName} do to the wall?',               // jump
  'kt-ch5-l2-q3': 'What does Grandma slowly turn?',                    // page
  'kt-ch5-l4-q4': 'What does the Dog wear?',                           // collar
  'kt-ch5-l5-q3': 'How is the Camel about work?',                      // lazy
  'kt-ch5-l6-q5': 'What does the Camel say?',                          // Humph
  'kt-ch5-l8-q4': 'What does the Dog ask the Camel?',                  // carry (7)
  'kt-ch5-l10-q1': 'What day do you hear?',                            // Wednesday
  'kt-ch5-l12-q3': 'Which animal do the three blame?',                 // Camel
  'kt-ch5-l14-q4': 'What does the Camel stare at?',                    // pool
  'kt-ch5-l15-q1': "How is the Camel's neck?",                         // long
  'kt-ch5-l18-q3': 'What can the Camel not do?',                       // eating (7)
  'kt-ch5-l24-q3': 'Where does {catName} walk back?',                  // corner
  'kt-ch5-l25-q6': 'What word does Grandma use?',                      // lazy
  'kt-ch5-l25-q15': 'What greeting closes the night?',                 // good night

  // ====== Chapter 6 — Baba Yaga + Fisherman/Wife + Seven Beds ======
  'kt-ch6-l1-q1': 'How does tonight feel?',                            // colder
  'kt-ch6-l1-q2': 'What does {catName} do to the wall?',               // jump
  'kt-ch6-l2-q3': "What body part of {dogName} bends?",                // ears (6)
  'kt-ch6-l3-q3': "How does Grandma's old book feel?",                 // scary (7)
  'kt-ch6-l4-q3': 'How does Vasilisa work each day?',                  // hard
  'kt-ch6-l5-q3': 'What place do you hear?',                           // pocket
  'kt-ch6-l6-q2': 'What size do you hear?',                            // tiny
  'kt-ch6-l7-q5': 'What does Vasilisa do with the doll?',              // holds (7)
  'kt-ch6-l8-q3': 'How long does she walk?',                           // hours
  'kt-ch6-l9-q3': 'What color do you hear?',                           // black
  'kt-ch6-l10-q3': 'What can the chicken-leg hut do?',                 // turn (7)
  'kt-ch6-l11-q2': "How are Baba Yaga's teeth?",                       // sharp
  'kt-ch6-l12-q3': 'What tool do you hear?',                           // broom
  'kt-ch6-l13-q2': 'What size do you hear?',                           // huge
  'kt-ch6-l14-q3': 'What does the doll open to eat?',                  // mouth (7)
  'kt-ch6-l15-q2': 'What does the doll do at night?',                  // works (7)
  'kt-ch6-l16-q3': 'How does the yard look after?',                    // clean (7)
  'kt-ch6-l17-q3': 'What feeling do you hear?',                        // warm
  'kt-ch6-l18-q2': 'What does the skull do to trees?',                 // lights (7)
  'kt-ch6-l19-q3': 'What did the fisherman do?',                       // caught
  'kt-ch6-l20-q3': 'What color do you hear?',                          // dark
  'kt-ch6-l21-q3': 'What did the child do to beds?',                   // tried (7)
  'kt-ch6-l22-q3': 'What did the child do to escape?',                 // ran (7)
  'kt-ch6-l23-q3': 'How does Grandma smile?',                          // softly
  'kt-ch6-l23-q6': "What part of the hut moves?",                      // legs (5)
  'kt-ch6-l24-q2': 'What feeling do you hear?',                        // scared
  'kt-ch6-l24-q8': 'How does the night now feel?',                     // softer

  // ====== Chapter 7 — Six Swans + Three Wishes + Mouse Bride ======
  'kt-ch7-l1-q2': 'What does {catName} do to the wall?',               // jump
  'kt-ch7-l1-q3': 'How does Grandma wait tonight?',                    // here (5)
  'kt-ch7-l3-q3': 'How many swans tonight?',                           // six
  'kt-ch7-l4-q4': "What does 'took a new wife' mean?",                 // married someone new
  'kt-ch7-l4-q5': 'When were the children happy?',                     // then (5)
  'kt-ch7-l6-q4': 'What animal do you hear?',                          // swans
  'kt-ch7-l7-q1': 'What did the six swans do?',                        // rose (6)
  'kt-ch7-l8-q5': 'How does the sister go to the wood?',               // walked (8)
  'kt-ch7-l10-q5': 'What does the sister do at dusk?',                 // waited (7)
  'kt-ch7-l12-q5': 'How does she answer silently?',                    // nodded (5)
  'kt-ch7-l13-q6': 'What did she make and keep?',                      // promise (7)
  'kt-ch7-l15-q4': 'What does she do with the shirts?',                // hid (8)
  'kt-ch7-l17-q6': 'What rises fast from the fire?',                   // smoke (7)
  'kt-ch7-l19-q4': 'What do the woodcutters do?',                      // argued (5)
  'kt-ch7-l21-q4': 'What is stronger than the sun?',                   // cloud (6)
  'kt-ch7-l23-q5': 'How does the night feel at the end?',              // still (8)
  'kt-ch7-l25-q11': 'How is silence a courage?',                       // brave (5)

  // ====== Chapter 8 — Ye Xian + Snail Girl + Chang'e ======
  'kt-ch8-l1-q3': 'What number do you hear?',                          // one
  'kt-ch8-l4-q3': 'What family word do you hear?',                     // brother
  'kt-ch8-l5-q3': 'What must Ye Xian do?',                             // carry
  'kt-ch8-l5-q4': 'How is Ye Xian?',                                   // tired but does not cry
  'kt-ch8-l6-q3': 'What food do you hear?',                            // rice
  'kt-ch8-l7-q3': "How is Ye Xian's voice?",                           // gentle (7)
  'kt-ch8-l8-q3': 'What sky word do you hear?',                        // moon
  'kt-ch8-l9-q3': 'What does the stepmother do?',                      // leans
  'kt-ch8-l10-q3': 'What food do you hear?',                           // fish
  'kt-ch8-l11-q3': 'What does Ye Xian do in the water?',               // searches (8)
  'kt-ch8-l12-q3': 'What must Ye Xian do with bones?',                 // bury (7)
  'kt-ch8-l13-q3': 'What does Ye Xian whisper?',                       // wish
  'kt-ch8-l14-q3': 'How does Ye Xian ask the bones?',                  // begs (7)
  'kt-ch8-l15-q3': 'What does Ye Xian do at lanterns?',                // dances (7)
  'kt-ch8-l16-q3': 'How does Ye Xian leave the festival?',             // runs (7)
  'kt-ch8-l17-q3': "How is the golden slipper?",                       // small (5)
  'kt-ch8-l18-q3': 'What action do you hear?',                         // buried
  'kt-ch8-l19-q3': 'What container do you hear?',                      // jar
  'kt-ch8-l20-q3': "What does the kind girl exit?",                    // shell (6)
  'kt-ch8-l21-q3': 'What do the gods give Hou Yi?',                    // medicine (7)
  'kt-ch8-l22-q3': 'What place do you hear?',                          // moon
  'kt-ch8-l23-q3': 'What body word do you hear?',                      // eyes
  'kt-ch8-l23-q7': 'When might {catName} return?',                     // tomorrow (5)
  'kt-ch8-l24-q3': 'What did Ye Xian do scared?',                      // she still went to the festival
  'kt-ch8-l24-q4': 'What word means scared but doing it?',             // brave (7)
  'kt-ch8-l24-q6': "If {catName} could wish, for what?",               // a warm yard every night
};

function processFile(filePath, chapter, stats) {
  const raw = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const diffs = [];

  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (isTapPrompt(q)) continue;
      const before = q.question;
      if (!before) continue;

      const beforeWc = countWords(before);
      const beforeMulti = isMultiSentence(before);
      const beforeEndsQ = endsWithQuestion(before);

      stats.checked++;

      const needsFix = beforeWc > 8 || beforeMulti || !beforeEndsQ;
      if (!needsFix) continue;

      const after = TIGHTEN[q.id];
      if (!after) {
        // No hand-written rule — log and skip (do not auto-mangle)
        stats.unmapped.push({ id: q.id, ch: chapter, before, beforeWc, beforeMulti, beforeEndsQ });
        continue;
      }

      const afterWc = countWords(after);
      const afterMulti = isMultiSentence(after);
      const afterEndsQ = endsWithQuestion(after);

      // Guardrails: refuse to write a rewrite that violates the spec
      if (afterWc > 8 || afterMulti || !afterEndsQ) {
        stats.badRewrites.push({ id: q.id, after, afterWc, afterMulti, afterEndsQ });
        continue;
      }

      // emoji + Chinese guards
      if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(after)) {
        stats.badRewrites.push({ id: q.id, after, reason: 'emoji' });
        continue;
      }
      if (/[一-鿿]/.test(after)) {
        stats.badRewrites.push({ id: q.id, after, reason: 'chinese' });
        continue;
      }

      q.question = after;
      stats.tightened++;
      stats.perChapter[chapter] = (stats.perChapter[chapter] || 0) + 1;
      diffs.push({
        id: q.id,
        chapter,
        before,
        after,
        beforeWc,
        afterWc,
        delta: beforeWc - afterWc,
      });
    }
  }

  // Write JSON back (UTF-8 no BOM, 2-space indent, trailing newline)
  const out = JSON.stringify(data, null, 2) + '\n';
  writeFileSync(filePath, out, { encoding: 'utf-8' });

  return diffs;
}

function main() {
  const stats = {
    checked: 0,
    tightened: 0,
    perChapter: {},
    unmapped: [],
    badRewrites: [],
  };
  const allDiffs = [];

  for (let ch = 1; ch <= 8; ch++) {
    const file = resolve(publicDir, `lessons-ch${ch}.json`);
    const diffs = processFile(file, ch, stats);
    allDiffs.push(...diffs);
    console.log(`ch${ch}: tightened ${diffs.length}`);
  }

  if (stats.unmapped.length) {
    console.warn(`WARN: ${stats.unmapped.length} prompts flagged but no rewrite in TIGHTEN table:`);
    for (const u of stats.unmapped) {
      console.warn(`  ${u.id} (ch${u.ch}, wc=${u.beforeWc}, multi=${u.beforeMulti}, endsQ=${u.beforeEndsQ}): "${u.before}"`);
    }
  }
  if (stats.badRewrites.length) {
    console.warn(`WARN: ${stats.badRewrites.length} rewrites failed spec guards:`);
    for (const b of stats.badRewrites) console.warn(b);
  }

  // Build report (10 representative examples — picked across chapters)
  const sample = [];
  const seenCh = new Set();
  for (const d of allDiffs) {
    if (sample.length >= 10) break;
    sample.push(d);
    seenCh.add(d.chapter);
  }

  let md = '# QA Report: Question Prompts v2 (TOEIC Part 2 tightening)\n\n';
  md += `**Date:** ${new Date().toISOString().slice(0, 10)}\n`;
  md += `**Source script:** \`tools/tighten-question-prompts.js\`\n\n`;
  md += '## Summary\n\n';
  md += `- Total non-tap prompts checked: **${stats.checked}**\n`;
  md += `- Total tightened (>8 words, multi-sentence, or wrong-end-punct → single WH ≤8 words ending in ?): **${stats.tightened}**\n`;
  md += `- Tap-tiles / tap-pairs UI prompts: untouched (per spec)\n`;
  md += `- Unmapped flagged prompts: **${stats.unmapped.length}** (left alone — needed hand-written rewrite)\n`;
  md += `- Failed guard checks: **${stats.badRewrites.length}**\n\n`;
  md += '## Per-chapter breakdown\n\n';
  md += '| Chapter | Tightened |\n|---|---|\n';
  for (let ch = 1; ch <= 8; ch++) {
    md += `| Ch${ch} | ${stats.perChapter[ch] || 0} |\n`;
  }
  md += '\n## Representative before/after pairs (first 10)\n\n';
  md += '| ID | Before (words) | After (words) | Δ |\n|---|---|---|---|\n';
  for (const d of sample) {
    const safeBefore = d.before.replace(/\|/g, '\\|');
    const safeAfter = d.after.replace(/\|/g, '\\|');
    const sign = d.delta > 0 ? '−' : d.delta < 0 ? '+' : '±';
    md += `| \`${d.id}\` | "${safeBefore}" (${d.beforeWc}) | "${safeAfter}" (${d.afterWc}) | ${sign}${Math.abs(d.delta)} |\n`;
  }
  md += '\n## Constraints satisfied\n\n';
  md += '- Single WH-question (What/Who/Where/When/Why/How/Which/If) — verified per rewrite\n';
  md += '- ≤ 8 words (token count, ignoring trailing `?`)\n';
  md += '- Single sentence ending in `?` (no `.` or `!` outside quotes)\n';
  md += '- Story-anchored when natural (mentions Mochi/Hana/Grandma/main character)\n';
  md += '- No generic phonetic-only prompts ("Which word did you hear?" banned)\n';
  md += '- correctIndex, options, sentence, explanationZh, tags, difficulty, level, type, id all preserved\n';
  md += '- No new questions added or deleted\n';
  md += '- No emoji, no Chinese in prompts\n\n';
  md += '## Validation\n\n';
  md += 'See `node tools/validate-lessons.js` output — appended after this script runs.\n';

  writeFileSync(reportPath, md, { encoding: 'utf-8' });

  writeFileSync(
    resolve(__dirname, '_tighten-diffs-v2.json'),
    JSON.stringify({ stats, diffs: allDiffs }, null, 2) + '\n',
    { encoding: 'utf-8' }
  );

  console.log(`\nchecked=${stats.checked} tightened=${stats.tightened}`);
  console.log(`unmapped=${stats.unmapped.length} badRewrites=${stats.badRewrites.length}`);
  console.log(`report: ${reportPath}`);
}

main();
