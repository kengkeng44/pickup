#!/usr/bin/env node
/**
 * One-shot script: rewrite generic question prompts in lessons-ch{1..8}.json
 * to be story-anchored (force comprehension, not phonetic-only).
 *
 * Constraints:
 *  - only mutates `question` field
 *  - keeps options / correctIndex / sentence / explanationZh / tags etc. intact
 *  - keeps A2 vocab, 6-12 words max, no emoji, no Chinese in prompt
 *  - matches answer (rewritten prompt naturally fits the correctIndex option)
 *
 * The rewrites are hand-written per question for story alignment.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

// Mapping: question.id -> new question prompt
const REWRITES = {
  // === Chapter 1 — Rainy Night + Ant/Grasshopper + North Wind/Sun ===
  'kt-ch1-l1-q1': "{catName} has no home. What kind of cat is he?",
  'kt-ch1-l1-q2': "Where does {catName} go every night?",
  'kt-ch1-l1-q3': "Type what {catName} does to get on the wall.",
  'kt-ch1-l2-q1': "Type what {dogName}'s tail does when {catName} arrives.",
  'kt-ch1-l2-q3': "Type the word for what {catName} and {dogName} are to each other.",
  'kt-ch1-l4-q3': "Type the word that describes the night in the story.",
  'kt-ch1-l5-q2': "What part of the kitten's body is soaked by the rain?",
  'kt-ch1-l5-q3': "Type the number of days the kitten has not eaten.",
  'kt-ch1-l5-q5': "What does the kitten do because she is so cold?",
  'kt-ch1-l6-q1': "What does the kitten do with her body to keep warm?",
  'kt-ch1-l6-q3': "Type the word that says she has no one with her.",
  'kt-ch1-l6-q5': "Where is the kitten hiding in the rain?",
  'kt-ch1-l7-q1': "What does the kitten see coming closer in the dark?",
  'kt-ch1-l7-q3': "Type the word for who the big shadow really is.",
  'kt-ch1-l8-q3': "Type the verb that says the rain no longer hits the cat.",
  'kt-ch1-l9-q3': "Type the verb for what the cat does with her ears.",
  'kt-ch1-l10-q3': "Type the adjective that describes Grandma's voice.",
  'kt-ch1-l11-q3': "Type the adjective for a cat who says nothing.",
  'kt-ch1-l12-q3': "Type the word that tells you the towel is not dirty.",
  'kt-ch1-l13-q3': "Type the word for how the cat starts to feel after drying off.",
  'kt-ch1-l14-q4': "Type the word for what Grandma suddenly has in her head.",
  'kt-ch1-l15-q3': "Type the word that says the cat may come whenever she likes.",
  'kt-ch1-l16-q1': "Grandma already told one story. What does she want to tell?",
  'kt-ch1-l16-q2': "In what season does the ant and grasshopper story happen?",
  'kt-ch1-l16-q3': "Type where the ant and grasshopper live.",
  'kt-ch1-l17-q3': "Type what the ant carries back home.",
  'kt-ch1-l18-q3': "Type how the grasshopper feels in winter with no food.",
  'kt-ch1-l19-q3': "Type the word for how the wind and the sun describe themselves.",
  'kt-ch1-l20-q3': "Type how hard the traveler holds his coat in the wind.",
  'kt-ch1-l21-q3': "Type the verb for what the traveler does with his coat in the sun.",
  'kt-ch1-l22-q3': "Type the word that means the hour is no longer early.",
  'kt-ch1-l23-q3': "Type the direction {catName} walks at the end of the night.",

  // === Chapter 2 — Momotaro + Tortoise & Hare warmup + Boy Who Cried Wolf ===
  'kt-ch2-l1-q1': "When does {catName} jump on the wall?",
  'kt-ch2-l2-q1': "{dogName} is excited. What does her tail do on the floor?",
  'kt-ch2-l5-q3': "What does the giant peach do on the water?",
  'kt-ch2-l6-q1': "What does the old woman do with the peach?",
  'kt-ch2-l16-q1': "How does Momotaro's team cross the ocean?",

  // === Chapter 3 — Ugly Duckling + Lion & Mouse + Shepherd & Wolf ===
  'kt-ch3-l1-q1': "What season is it on this autumn night in the yard?",
  'kt-ch3-l1-q2': "How does {catName} get up onto the low wall?",
  'kt-ch3-l2-q2': "Type what {dogName} does with his eyes when {catName} arrives.",
  'kt-ch3-l4-q3': "Type how the duckling feels inside the egg.",
  'kt-ch3-l7-q3': "Type what the duckling can do well in the pond.",
  'kt-ch3-l8-q3': "Type the word the other ducklings call him.",
  'kt-ch3-l11-q3': "Type how the duckling feels walking through the swamp.",
  'kt-ch3-l12-q3': "Type what the duckling does when he hears the hunters.",
  'kt-ch3-l15-q3': "Type the word for how the duckling's feet feel on the frozen lake.",
  'kt-ch3-l16-q3': "Type what the farmer does for the half-frozen duckling.",
  'kt-ch3-l23-q3': "Type what {catName} does about himself after the story.",

  // === Chapter 4 — Tortoise & Hare + Crow & Fox + City Mouse / Country Mouse ===
  'kt-ch4-l1-q1': "Type what {catName} does to get onto the wall tonight.",
  'kt-ch4-l1-q3': "Type what Grandma does as {catName} arrives.",
  'kt-ch4-l2-q1': "What does {dogName}'s tail do on the grass tonight?",
  'kt-ch4-l2-q3': "Type what Grandma is holding tonight.",
  'kt-ch4-l4-q2': "What does the Hare do about his own speed?",
  'kt-ch4-l6-q2': "What does the Tortoise say to the Hare's challenge?",
  'kt-ch4-l8-q3': "Type how the Hare runs at the start of the race.",
  'kt-ch4-l10-q3': "Type the word the Hare thinks he has plenty of.",
  'kt-ch4-l11-q3': "Type the word for what the Hare quickly becomes under the bush.",
  'kt-ch4-l12-q3': "Type the place the Tortoise walks past.",
  'kt-ch4-l14-q3': "Type how the Tortoise feels but keeps going.",
  'kt-ch4-l15-q3': "Type the word for the end of the race.",
  'kt-ch4-l16-q3': "Type the verb the Tortoise says when he reaches the tree.",
  'kt-ch4-l17-q3': "Type what the Hare does when he finally wakes up.",
  'kt-ch4-l19-q3': "Type what the Crow is holding in his beak.",
  'kt-ch4-l20-q2': "How does the Fox trick the Crow with sweet words?",
  'kt-ch4-l20-q3': "Type what the Crow does with his beak to sing.",
  'kt-ch4-l21-q3': "Type the word that describes the country mouse's food.",
  'kt-ch4-l23-q3': "Type what {dogName} does as the story ends.",
  'kt-ch4-l24-q3': "Type the place {catName} walks back to at the end.",
  'kt-ch4-l25-q5': "What do slow steps still do for you?",
  'kt-ch4-l25-q6': "Type the word Grandma calls the tortoise's small magic.",

  // === Chapter 5 — Camel's Hump (Kipling) + Reed and Oak + Mice Meeting ===
  'kt-ch5-l1-q3': "Type what {catName} does up onto the wall.",
  'kt-ch5-l2-q3': "Type what Grandma turns slowly in the book.",
  'kt-ch5-l4-q4': "Type what the Dog wears around his neck.",
  'kt-ch5-l5-q3': "Type the word that says the Camel will not work.",
  'kt-ch5-l8-q4': "Type the verb the Dog asks the Camel to do.",
  'kt-ch5-l12-q3': "Type which animal the three complain about to Man.",
  'kt-ch5-l14-q4': "Type what the Camel stares at on the ground.",
  'kt-ch5-l15-q1': "Type the adjective the Djinn uses for the Camel's neck.",
  'kt-ch5-l18-q3': "Type what the Camel may not do for three days.",
  'kt-ch5-l24-q3': "Type where {catName} walks back to at the end of the night.",

  // === Chapter 6 — Baba Yaga + Fisherman & Wife + Goldilocks/Seven Beds ===
  'kt-ch6-l1-q1': "How does tonight feel to {catName} compared to other nights?",
  'kt-ch6-l1-q2': "Type the verb {catName} does to get up on the wall.",
  'kt-ch6-l2-q3': "Type the body part of {dogName} that bends back when he is scared.",
  'kt-ch6-l3-q3': "Type how Grandma's dark old book feels to {catName}.",
  'kt-ch6-l4-q3': "Type the adverb that says Vasilisa works a lot every day.",
  'kt-ch6-l7-q5': "Type what Vasilisa does with the little doll in her pocket.",
  'kt-ch6-l8-q3': "Type the time word that says she walks a very long time.",
  'kt-ch6-l10-q3': "Type what the chicken-leg hut can do on its legs.",
  'kt-ch6-l11-q2': "Type the adjective that describes Baba Yaga's teeth.",
  'kt-ch6-l14-q3': "Type the body part the doll opens to eat the bread.",
  'kt-ch6-l15-q2': "Type the verb for what the doll does while Vasilisa sleeps.",
  'kt-ch6-l16-q3': "Type how the yard looks after the doll's secret work.",
  'kt-ch6-l18-q2': "Type the verb for what the skull does to every tree in the forest.",
  'kt-ch6-l19-q3': "Type the verb that says the fisherman got the magic fish.",
  'kt-ch6-l21-q3': "Type the verb for what the child does to each of the seven beds.",
  'kt-ch6-l22-q3': "Type the verb for what the child does to escape.",
  'kt-ch6-l23-q3': "Type how Grandma smiles at {catName} and {dogName}.",
  'kt-ch6-l23-q6': "Type the body part of the chicken-leg hut.",
  'kt-ch6-l24-q8': "Type how the night now feels after the scary story is done.",

  // === Chapter 7 — Six Swans + Three Wishes + Mouse Bride ===
  'kt-ch7-l1-q1': "How is the yard tonight when {catName} arrives?",
  'kt-ch7-l1-q2': "Type what {catName} does onto the low wall.",
  'kt-ch7-l1-q3': "Type the word that says Grandma is already on her chair.",
  'kt-ch7-l2-q1': "What does {dogName} do near Grandma's feet?",
  'kt-ch7-l3-q1': "What does Grandma call tonight's story?",
  'kt-ch7-l3-q3': "Type the number of swans in tonight's story.",
  'kt-ch7-l4-q5': "Type the time word for when the king's children were still happy.",
  'kt-ch7-l7-q1': "What do the six swans do into the sky?",
  'kt-ch7-l8-q5': "Type the verb for how the sister leaves toward the wood.",
  'kt-ch7-l10-q5': "Type what the sister does for her brothers at dusk.",
  'kt-ch7-l12-q5': "Type the verb for how she answers the deal silently.",
  'kt-ch7-l13-q6': "Type the noun for what she made and is keeping.",
  'kt-ch7-l15-q4': "Type the verb for what she does with the six shirts.",
  'kt-ch7-l17-q6': "Type the noun that rises fast from the fire.",
  'kt-ch7-l19-q4': "Type the verb for what the woodcutter and his wife do about every wish.",
  'kt-ch7-l21-q4': "Type what the sun says is stronger than him.",
  'kt-ch7-l23-q5': "Type the word for how the night feels at the end of the tale.",
  'kt-ch7-l25-q11': "Type the adjective that says silence can also be a kind of courage.",

  // === Chapter 8 — Ye Xian (Chinese Cinderella) + Snail Maiden + Chang'e ===
  'kt-ch8-l5-q3': "Type the verb Ye Xian must do with water from the well.",
  'kt-ch8-l7-q3': "Type the adjective that describes Ye Xian's voice by the pond.",
  'kt-ch8-l9-q3': "Type what the stepmother does next to the pond, pretending to be Ye Xian.",
  'kt-ch8-l11-q3': "Type the verb for what Ye Xian does in the empty water.",
  'kt-ch8-l12-q3': "Type the verb the old man tells her to do with the fish bones.",
  'kt-ch8-l13-q3': "Type what Ye Xian whispers to the bones.",
  'kt-ch8-l14-q3': "Type the verb for how Ye Xian asks the bones for help.",
  'kt-ch8-l15-q3': "Type the verb for what Ye Xian does under the lanterns.",
  'kt-ch8-l16-q3': "Type the verb for how Ye Xian leaves the festival.",
  'kt-ch8-l17-q3': "Type the adjective that says the golden slipper does not fit other women.",
  'kt-ch8-l20-q3': "Type the part of the snail the kind girl steps out of.",
  'kt-ch8-l21-q3': "Type the noun for what the gods give Hou Yi.",
  'kt-ch8-l23-q7': "Type the time word for when {catName} is not sure he will be back.",
  'kt-ch8-l24-q4': "Type the word that means scared but still doing it.",
};

// --- Run the rewrite ---

const flaggedIds = new Set(Object.keys(REWRITES));
const seenIds = new Set();
const perCh = {};
let totalRewrites = 0;
const diffs = [];

for (let i = 1; i <= 8; i++) {
  const file = resolve(publicDir, `lessons-ch${i}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  let changed = false;
  let chCount = 0;
  for (const lesson of data) {
    for (const q of lesson.questions) {
      if (flaggedIds.has(q.id)) {
        seenIds.add(q.id);
        const oldQ = q.question;
        const newQ = REWRITES[q.id];
        if (oldQ !== newQ) {
          diffs.push({ ch: i, id: q.id, old: oldQ, neu: newQ, sent: q.sentence, ans: q.options[q.correctIndex] });
          q.question = newQ;
          changed = true;
          chCount++;
          totalRewrites++;
        }
      }
    }
  }
  perCh[i] = chCount;
  if (changed) {
    writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`wrote lessons-ch${i}.json (${chCount} rewrites)`);
  }
}

const missing = [...flaggedIds].filter((id) => !seenIds.has(id));
if (missing.length) {
  console.error('MISSING IDs (not found in JSON):', missing);
}

console.log('\n=== Summary ===');
console.log('Total rewrites:', totalRewrites);
console.log('Per chapter:', perCh);

// Dump diff record for the report
writeFileSync(
  resolve(__dirname, '_rewrite-diffs.json'),
  JSON.stringify({ totalRewrites, perCh, diffs }, null, 2),
  'utf8'
);
console.log('Diff record: tools/_rewrite-diffs.json');
