#!/usr/bin/env node
/**
 * Scan all 8 chapter JSONs for awkward M1-injected phrases.
 * Output: tools/_awkward_flagged.json with flagged entries.
 */
const fs = require('node:fs');
const path = require('node:path');

const publicDir = path.resolve(__dirname, '..', 'public');
const allFiles = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => path.join(publicDir, `lessons-ch${n}.json`));
const TARGET_TYPES = new Set(['listen-mc', 'listen-emoji', 'listen-comprehension']);

// Awkward signal phrases extracted from M1 SYN dict + heuristics.
// Each entry is a substring (case-insensitive) that almost certainly
// signals an M1-rewritten clunker.
const AWKWARD_SIGNALS = [
  // Color compounds (M1 SYN: red/blue/green etc → x-toned)
  'cocoa-toned', 'cherry-toned', 'sky-toned', 'leaf-toned',
  'snow-toned', 'night-toned', 'flower-toned', 'plum-toned',
  'sunset-toned', 'cloud-toned', 'corn-toned',
  'shiny-yellow', 'shiny-white', 'reddish-brown',

  // "with X" compound prep phrases (dry/heavy/strong etc)
  'without wet', 'with no wet', 'with great width', 'with much weight',
  'with little weight', 'with much force', 'with strong effort',
  'with much gold', 'without coin', 'with no gold', 'with no sound',
  'with much sound', 'with no dirt', 'with dirt on it',

  // Time compounds
  'just-made', 'old and tough', 'dawn time', 'dusk time',
  'dark hours', 'bright hours', 'sun-up time', 'sun-down time',
  'mid-day time', 'middle of night', 'late-day shadow', 'early-day light',
  'small time-span', 'tiny time-span', 'breath of time', 'breaths of time',
  'seven-day span', 'thirty-day span', 'twelve-month span',
  'late-day glow', 'late-day glows',

  // Emotions
  'lit up with joy', 'in fear', 'low in heart', 'low-hearted',
  'head-high', 'high feeling', 'low feeling', 'shaking inside',
  'a bit jittery', 'red-faced', 'mean-hearted', 'self-only',
  'envy-eyed', 'gentle-hearted', 'gently-hearted', 'more gentle-hearted',
  'fear-less', 'true-saying', 'truth-saying', 'in calm-wait',
  'restless-feeling', 'always-by-side', 'old-knowing',
  'more old-knowing', 'caught off guard', 'free of worry',

  // Body parts (M1 SYN: eye/ear/etc → "gazing thing" etc)
  'paw-base', 'paw-bases', 'top of body', 'tops of bodies',
  'gazing thing', 'gazing things', 'hearing thing', 'hearing things',
  'speaking part', 'speaking parts', 'sniffing part', 'sniffing parts',
  'upper limb', 'upper limbs', 'lower limb', 'lower limbs',
  'rear part', 'rear parts', 'flying part', 'flying parts',
  'feeling-organ', 'feeling-place', 'feeling-organs', 'thinking-place',
  'bony head-cap', 'top of arm', 'tops of arms',

  // People
  'small one', 'small ones', 'tiny new one', 'tiny new ones',
  'young lad', 'young lads', 'young lass', 'young lasses',
  'royal lady', 'royal ladies', 'royal son', 'royal sons',
  'royal daughter', 'royal daughters', 'great-deed-doer',
  'great-deed-doers', 'bad one', 'bad ones',
  'wedded man', 'wedded lady', 'side-kin', 'parent-brother',
  'parent-sister', 'second mama', 'unknown one', 'unknown ones',
  'house-near one', 'house-near ones', 'lead one', 'lead ones',
  'helping hand', 'helping hands', 'visiting one', 'visiting ones',
  'townsperson', 'townsfolk',

  // Animals (M1 SYN: cat/dog/etc → "small furry one")
  'small furry one', 'small furry ones', 'small furry creature',
  'tall riding beast', 'tall riding beasts', 'milk beast', 'milk beasts',
  'pink farm one', 'pink farm ones', 'tiny squeaker', 'tiny squeakers',
  'red-tailed one', 'red-tailed ones', 'big furred one', 'big furred ones',
  'long-eared one', 'long-eared ones', 'gray hunter', 'gray hunters',
  'mane-cat', 'mane-cats', 'tree-climber', 'tree-climbers',
  'tail-bird', 'tail-birds', 'tiny worker', 'tiny workers',
  'green leaper', 'green leapers',
  'fast-footed one', 'fast-footed ones', 'slow-footed one', 'slow-footed ones',
  'desert-walker', 'desert-walkers', 'pond-bird', 'pond-birds',
  'young pond-bird', 'young pond-birds', 'long-necked bird', 'long-necked birds',
  'wool beast', 'wool beasts', 'pond fish', 'four-legged pal',
  'mother bird', 'mother birds', 'farm bird', 'farm birds',
  'wild creature', 'wild creatures', 'living being', 'living beings',
  'home animal', 'home animals', 'farm beasts', 'sea creature',
  'flying creature', 'flying creatures', 'finned creature', 'finned creatures',
  'red trickster', 'desert spirit', 'spirit being', 'tiny crawler', 'tiny crawlers',

  // Common objects / places
  'kitchen surface', 'kitchen surfaces', 'sleeping place', 'sleeping places',
  'stone barrier', 'stone barriers', 'ground inside', 'grounds inside',
  'top of the house', 'wall opening', 'wall openings', 'town path', 'town paths',
  'small water spot', 'small water spots', 'land in the sea', 'lands in the sea',
  'sand land', 'sand lands', 'wet ground', 'rock-hole', 'rock-holes',
  'rock hole', 'rock holes', 'wax-stick', 'wax-sticks', 'tiny play-figure', 'tiny play-figures',
  'foot-cover', 'foot-covers', 'circle band', 'circle bands',
  'high peak', 'high peaks', 'small high spot', 'small high spots',
  'tall plant', 'tall plants', 'tall grass', 'tall grasses',
  'mighty tree', 'mighty trees', 'large gathering', 'large gatherings',
  'sky-puff', 'sky-puffs', 'sky-light', 'sky-lights', 'night-light',
  'tiny sky-light', 'tiny sky-lights', 'fire-tongue', 'fire-tongues',
  'small bloom', 'small blooms', 'green ground cover',
  'small light', 'small lights', 'low leafy plant', 'low leafy plants',
  'simple little house', 'simple little houses', 'small cottage', 'small cottages',
  'land-tiller', 'land-tillers', 'beast-tracker', 'beast-trackers',
  'wax-stick', 'streak of color', 'streaks of color',
  'royal dance', 'royal dances', 'small green patch',
  'long flowing gown', 'long flowing gowns', 'long dress', 'long dresses',
  'long blade', 'long blades', 'small food parcel', 'small food parcels',
  'shining stone', 'shining stones', 'shining store', 'shining stores',
  'cow-milk block', 'cow drink', 'shell-ball', 'shell-balls',
  'flesh food', 'baked loaf', 'small white grains',
  'meat tube', 'meat tubes', 'head rest', 'head rests',
  'soft cover', 'soft covers', 'cooking bowl', 'cooking bowls',
  'drink holder', 'drink holders', 'food holder', 'food holders',
  'flat food disk', 'flat food disks', 'eating tool', 'eating tools',
  'pronged eating tool', 'climb steps', 'crossing span', 'crossing spans',
  'water craft', 'water crafts', 'rolling disk', 'rolling disks',
  'striking tool', 'striking tools', 'sharp blade', 'sharp blades',
  'rope mesh', 'thick cord', 'thick cords', 'pointed shaft', 'pointed shafts',
  'curved shooter', 'long pointed stick', 'beast-pulling beam',
  'doorway', 'doorways', 'dark metal', 'pointed shaft',
  'small grain', 'small seed', 'plant beginning', 'plant beginnings',
  'fruit drink', 'fruit drinks', 'cream-paste', 'sweet powder', 'savory dust',
  'fine grit', 'fine dirt powder',

  // Time
  'twelve-month span',

  // Sound / voice
  'sound of speech', 'speech sound', 'speech sounds',
  'speaking sound', 'speaking sounds', 'no sound at all',
  'sound-less', 'sweet rest greeting', 'evening parting words',
  'parting words', 'meeting greeting', 'meeting word', 'meeting words',
  'words of glad debt', 'show glad debt', 'glad debt',
  'in a hushed way',

  // Verbs (M1 SYN over-translated)
  'pushes air hard', 'send out bright rays', 'bring along in the arms',
  'rode the sea', 'rode the water', 'rides the water', 'rode the water', 'riding the water',
  'made cloth from thread', 'pulls his coat tight', 'bends down low',
  'made a loud growl', 'gave a long cry', 'spoke softly close to the ear',
  'made music with the voice', 'turned over and over', 'went up into the sky',
  'goes on foot', 'go on foot', 'went on foot', 'going on foot',
  'go fast on foot', 'going fast on foot', 'went fast on foot',
  'making music', 'make music', 'makes music',
  'keeps eyes on', 'kept eyes on', 'keep eyes on', 'keeping eyes on',
  'go through the air', 'goes through the air', 'going through the air',
  'be on the feet', 'is on the feet', 'was on the feet',
  'works the cloth', 'work the cloth', 'working the cloth',
  'come together with', 'comes together with', 'came together with', 'coming together with',
  'hand over', 'hands over', 'handed over', 'handing over',
  'catch the sound of', 'catches the sound of', 'caught the sound of', 'catching the sound of',
  'wish for', 'wishes for', 'wished for', 'wishing for',
  'be aware of', 'is aware of', 'was aware of', 'being aware of',
  'hold dear', 'holds dear', 'held dear', 'holding dear',
  'cannot stand', 'could not stand',
  'rest the eyes', 'rests the eyes', 'rested the eyes', 'resting the eyes',
  'open the eyes', 'opens the eyes', 'opened the eyes', 'opening the eyes',
  'set off on', 'sets off on', 'setting off on',
  'pass along', 'passes along', 'passed along', 'passing along',
  'head back', 'heads back', 'headed back', 'heading back',
  'go from', 'goes from', 'went from', 'going from',
  'drop in on', 'drops in on', 'dropped in on', 'dropping in on',
  'go on a long road', 'goes on a long road', 'went on a long road',
  'cry out loud', 'cries out loud', 'cried out loud', 'crying out loud',
  'show a glad face', 'shows a glad face', 'showed a glad face', 'showing a glad face',
  'show a low face', 'shows a low face', 'showed a low face', 'showing a low face',
  'snap teeth on', 'snaps teeth on', 'snapped teeth on', 'snapping teeth on',
  'strike with the leg', 'strikes with the leg', 'struck with the leg', 'striking with the leg',
  'grab in the air', 'grabs in the air', 'grabbed in the air', 'grabbing in the air',
  'grab in the hand', 'grabs in the hand', 'grabbed in the hand', 'grabbing in the hand',
  'send through the air', 'sends through the air', 'sent through the air', 'sending through the air',
  'move through water', 'moves through water', 'moved through water', 'moving through water',
  'go through the words of', 'goes through the words of',
  'set down in marks', 'sets down in marks', 'setting down in marks',
  'pick up by mind', 'picks up by mind', 'picked up by mind', 'picking up by mind',
  'pass on knowledge', 'passes on knowledge', 'passed on knowledge', 'passing on knowledge',
  'split with', 'splits with', 'splitting with',
  'pay coin for', 'pays coin for', 'paid coin for', 'paying coin for',
  'hand over for coin', 'hands over for coin',
  'handed over for coin', 'handing over for coin',
  'come upon', 'comes upon', 'came upon', 'coming upon',
  'no longer hold', 'no longer holds', 'no longer held', 'no longer holding',
  'come first in', 'comes first in', 'came first in', 'coming first in',
  'fall short of', 'falls short of', 'fell short of', 'falling short of',
  'have a go at', 'has a go at', 'had a go at', 'having a go at',
  'keep in mind', 'keeps in mind', 'kept in mind', 'keeping in mind',
  'lose from mind', 'loses from mind', 'lost from mind', 'losing from mind',
  'get bigger', 'gets bigger', 'got bigger', 'gotten bigger', 'getting bigger',
  'turn into something new', 'turns into something new', 'turned into something new', 'turning into something new',
  'be of one mind', 'is of one mind', 'was of one mind', 'being of one mind',
  'say no to', 'says no to', 'said no to', 'saying no to',
  'open the mouth from tiredness', 'opens the mouth from tiredness', 'opened the mouth from tiredness',
  'made to feel safe', 'make to feel safe', 'makes to feel safe', 'making to feel safe',
  'agree to', 'agrees to', 'agreed to', 'agreeing to',
  'come to a halt', 'comes to a halt', 'came to a halt', 'coming to a halt',
  'showers with sweet words', 'shower with sweet words', 'showered with sweet words',
  'gave a head-tip', 'give a head-tip', 'gives a head-tip', 'giving a head-tip',
  'made plain to', 'make plain to', 'makes plain to', 'making plain to',
  'go along with', 'goes along with', 'went along with', 'going along with',
  'jog along', 'jogs along', 'jogged along', 'jogging along',
  'grasp the meaning of', 'grasps the meaning of', 'grasped the meaning of',
  'bring on the arm', 'brings on the arm', 'brought on the arm', 'bringing on the arm',
  'made the journey', 'makes the journey', 'making the journey',
  'lifted up high', 'lifting up high', 'lift up', 'lifts up', 'lifting up',
  'in a fine way', 'tucks away', 'tuck away', 'tucked away', 'tucking away',
  'kept out of sight', 'staying out of sight',
  'set the mind', 'sets the mind', 'setting the mind',
  'puffs out', 'puff out', 'puffed out', 'puffing out',
  'tote', 'totes', 'toted', 'toting',

  // Adjectives over-translated
  'just-barely', 'plain-looking', 'fine-looking', 'see-through',
  'work-shy', 'far down', 'with no pal', 'pal-like',
  'cheery', 'gladness', 'in real terms', 'just like',
  'one more', 'a different', 'different ones',
  'with nothing to do', 'firm of will', 'achy', 'achy spots',
  'snug', 'fat-bodied', 'hidden truth', 'hidden truths',
  'mighty', 'mighty force', 'unshaken', 'without wobble',
  'shadow-cool', 'at ease', 'is at ease', 'being at ease',
  'edge of the stream', 'edges of streams', 'pointed',
  'sharp-minded', 'unhurt', 'without harm', 'sweet white flower',
  'drying cloth', 'drying cloths', 'nearer', 'life partner',
  'frozen water', 'thin wood', 'thin woods',
  'gentle cocoa-toned', 'soil ground', 'soil floor', 'soil floors',
  'sun-light', 'breath stuff', 'fire-cloud', 'frozen flow', 'water-mist',

  // Adverbs / connectors
  'truly', 'in real terms',
  'lacking',
  'in toward', 'across the inside of', 'past the top of',
  'past the bottom of', 'beside the line of', 'over the course of',
  'toward the ground', 'toward the sky', 'to the rear', 'ahead',
  'off in the distance', 'on every side', 'within', 'beyond the walls',
  'up over', 'down under', 'this very place', 'that place',
  'a long way off', 'close at hand', 'on the lesser-favored side',
  'on the favored side', 'over much', 'as well',
  'just sufficient', 'just right',

  // Numbers (M1 SYN: one→"a single", two→"a pair", etc)
  'a single time', 'a pair', 'a trio', 'a quartet',
  'a handful of', 'half a dozen', 'a week of', 'twice four',
  'one less than ten', 'a full hand pair',
  'a single', 'two hands of',

  // misc
  'fortune-touched', 'wanting food', 'with much to do',
  'fierce weather', 'fierce weather events',
  'small magic being', 'small magic beings',
  'big winged beast', 'big winged beasts',
  'fearsome being', 'fearsome beings',
  'battle fighter', 'battle fighters',
  'army man', 'army men', 'visiting one', 'visiting ones',
  'maid-of-ashes',
];

let total = 0;
const flagged = [];
const flaggedById = new Map();

for (const file of allFiles) {
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  for (let li = 0; li < data.length; li++) {
    const lesson = data[li];
    for (let qi = 0; qi < (lesson.questions || []).length; qi++) {
      const q = lesson.questions[qi];
      if (TARGET_TYPES.has(q.type) && q.subSkill !== 'vocab' && q.sentence) {
        total++;
        const s = q.sentence.toLowerCase();
        let hit = null;
        for (const sig of AWKWARD_SIGNALS) {
          if (s.includes(sig.toLowerCase())) {
            hit = sig;
            break;
          }
        }
        if (hit) {
          const entry = {
            id: q.id,
            sentence: q.sentence,
            signal: hit,
            file: path.basename(file),
            li,
            qi,
            type: q.type,
            subSkill: q.subSkill,
            correctIdx: q.correctIndex,
            correct: q.options ? q.options[q.correctIndex] : null,
            options: q.options || [],
          };
          flagged.push(entry);
          flaggedById.set(q.id, entry);
        }
      }
    }
  }
}

console.log('Total non-vocab listen-mc/emoji/comp with sentence:', total);
console.log('Flagged:', flagged.length);
console.log('First 5:', JSON.stringify(flagged.slice(0, 5), null, 2));

fs.writeFileSync(
  path.resolve(__dirname, '_awkward_flagged.json'),
  JSON.stringify(flagged, null, 2),
);
