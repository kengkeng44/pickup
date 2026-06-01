#!/usr/bin/env node
/**
 * v2.0.B.173 — fix 51 Ch3+Ch4 listen-comprehension sentence-is-question.
 * Convert question-as-sentence → declarative statement form so TTS plays
 * a story line instead of a comprehension prompt.
 * Per docs/audits/2026-06-01T1638-content-qa-cron.md P0-1.
 */
const fs = require('node:fs');
const path = require('node:path');

const REWRITES = {
  // Ch3 (25 entries)
  'kt-ch3-l1-q3':  'I come back every night to hear Grandma\'s story.',
  'kt-ch3-l1-q5':  'I feel calm and happy sitting on the wall.',
  'kt-ch3-l3-q5':  'The story is about a duckling that everyone calls ugly.',
  'kt-ch3-l4-q5':  'The mother duck is sitting on the eggs, waiting for them to hatch.',
  'kt-ch3-l6-q5':  'Mother gazes at me because I look different from her other ducklings.',
  'kt-ch3-l7-q5':  'Mother is surprised to see me swim so well.',
  'kt-ch3-l8-q5':  'My siblings call me ugly because I look different from them.',
  'kt-ch3-l9-q5':  'The hen and the cat reject me because I am not like them.',
  'kt-ch3-l10-q5': 'My mother is the one who tells me to leave the family.',
  'kt-ch3-l11-q6': 'He keeps walking because he has nowhere else to go.',
  'kt-ch3-l13-q4': 'I have to leave again because the cat hates me.',
  'kt-ch3-l13-q6': 'The woman did not want him to leave, but her cat drove him away.',
  'kt-ch3-l14-q5': 'He cannot follow them because he is not able to fly yet.',
  'kt-ch3-l16-q5': 'The farmer helps him because the farmer is kind.',
  'kt-ch3-l17-q5': 'He understands now that he was never really ugly.',
  'kt-ch3-l18-q4': 'He did not have to change first because he was always this beautiful inside.',
  'kt-ch3-l18-q6': 'This story tells me that sometimes others see you wrong.',
  'kt-ch3-l19-q5': 'The lion lets the mouse go because the mouse begs and promises help later.',
  'kt-ch3-l20-q6': 'This story tells me that small ones can help big ones.',
  'kt-ch3-l21-q6': 'The boy lies about the wolf three times.',
  'kt-ch3-l22-q5': 'No one believes him this time because he lied before.',
  'kt-ch3-l22-q6': 'This story tells me that lies break trust.',
  'kt-ch3-l23-q5': 'Tonight\'s story teaches me that maybe people see me wrong.',
  'kt-ch3-l24-q2': 'Hana wants to know if the mother duck was bad for sending him away.',
  'kt-ch3-l25-q4': 'Grandma told the ugly duckling story tonight.',
  // Ch4 (26 entries)
  'kt-ch4-l1-q5':  'The cat climbs the wall every night to hear Grandma\'s story.',
  'kt-ch4-l2-q5':  'When I arrive, Grandma opens her book first.',
  'kt-ch4-l3-q5':  'The slow tortoise might win because he does not stop.',
  'kt-ch4-l4-q6':  'Hare brags first because he thinks he is the fastest.',
  'kt-ch4-l5-q6':  'Tortoise does not get angry because he knows what he can do.',
  'kt-ch4-l6-q6':  'Tortoise accepts the race because he believes slow can still finish.',
  'kt-ch4-l7-q6':  'The bird counts down to start the race fairly.',
  'kt-ch4-l8-q6':  'Hare runs fast at the start because he wants to show off his speed.',
  'kt-ch4-l9-q6':  'Tortoise does not run faster because he knows his pace is his strength.',
  'kt-ch4-l10-q6': 'Hare decides to nap because he thinks he cannot lose.',
  'kt-ch4-l11-q6': 'The shady bush makes him sleepy because shade and quiet feel safe.',
  'kt-ch4-l12-q6': 'Tortoise does not stop at the river because stopping makes finishing harder.',
  'kt-ch4-l13-q6': 'Tortoise does not wake Hare because winning fairly matters more than winning early.',
  'kt-ch4-l14-q6': 'Tortoise keeps going when his feet hurt because finishing is his promise.',
  'kt-ch4-l15-q6': 'Seeing the tree gives him strength because a clear goal makes tired legs move.',
  'kt-ch4-l16-q6': 'Tortoise touches the tree gently because finishing is sacred to him.',
  'kt-ch4-l17-q6': 'Hare is too late because speed cannot fix lost time.',
  'kt-ch4-l18-q6': 'The main lesson is that steady effort beats raw speed.',
  'kt-ch4-l19-q5': 'The crow sits on a high branch because high places feel safe from foxes.',
  'kt-ch4-l20-q5': 'The crow drops the cheese because he opens his beak to sing.',
  'kt-ch4-l21-q5': 'The city mouse might not enjoy country food because he is used to fancier meals.',
  'kt-ch4-l22-q5': 'The lesson of the two mice is that a simple safe life beats a fancy scary one.',
  'kt-ch4-l23-q5': 'Grandma closes the book without more words because the story already says enough.',
  'kt-ch4-l24-q5': 'Mochi takes home from this story the idea that slow is not weak.',
  'kt-ch4-l25-q9': 'Grandma tells this story tonight to remind us that slow can still win.',
  'kt-ch4-l25-q10': 'After the story, Mochi thinks that I can keep going too, one step at a time.',
};

function applyToFile(file) {
  const p = path.resolve(__dirname, '..', 'public', file);
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  let changed = 0;
  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (REWRITES[q.id]) {
        const oldS = q.sentence;
        q.sentence = REWRITES[q.id];
        changed++;
        console.log(`  ${q.id}: "${oldS}" → "${q.sentence}"`);
      }
    }
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`${file}: ${changed} entries rewritten`);
  return changed;
}

const c3 = applyToFile('lessons-ch3.json');
const c4 = applyToFile('lessons-ch4.json');
console.log(`Total: ${c3 + c4} sentences rewritten (expect 51)`);
