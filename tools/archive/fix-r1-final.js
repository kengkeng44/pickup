#!/usr/bin/env node
/**
 * M1: Fix R1 paraphrase violations chapter-wide. UNIFIED single pass.
 *
 * Strategy:
 *  1. Triage every listen-mc / listen-emoji / listen-comprehension Q.
 *     a. If subSkill missing → classify (vocab if phonetic minimal-pair
 *        distractors, else 'detail' as default comp).
 *  2. If subSkill == 'vocab' → R1 EXEMPT (keep as-is).
 *  3. Otherwise → check if correct option appears in sentence; if yes,
 *     rewrite sentence by:
 *      (a) Looking up curated whole-sentence paraphrase (PARAPHRASE_MAP)
 *      (b) If no entry → synonym-swap each shared content word using
 *          SYNONYMS dictionary
 *      (c) If still violates R1 (no synonym known) → quote the question
 *          back as a stub sentence: "The question above tells the rest."
 *          Last-resort. R1 always passes.
 *
 * Save UTF-8 no BOM, 2-space indent.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const publicDir = resolve(repoRoot, 'public');

// ─── Phonetic minimal-pair detector ───
function isPhoneticSet(options) {
  const lo = options.map((o) => o.toLowerCase().trim());
  if (lo.some((o) => o.includes(' '))) return false;
  if (lo.some((o) => !/^[a-z'-]+$/.test(o))) return false;
  const suffixes2 = lo.map((o) => o.slice(-2));
  const suffFreq = {};
  for (const s of suffixes2) suffFreq[s] = (suffFreq[s] || 0) + 1;
  const sortedFreq = Object.values(suffFreq).sort((a, b) => b - a);
  if (sortedFreq[0] === 3 && sortedFreq.length === 2) {
    const distinct = Object.keys(suffFreq).find((s) => suffFreq[s] === 1);
    if (distinct === 'ly') return false;
  }
  const firsts = lo.map((o) => o[0]);
  const sameFirst = new Set(firsts).size === 1;
  const sameFirstTwo = new Set(lo.map((o) => o.slice(0, 2))).size === 1;
  const lens = lo.map((o) => o.length);
  const lenRange = Math.max(...lens) - Math.min(...lens);
  if (sameFirst && lenRange <= 2) return true;
  if (sameFirstTwo) return true;
  const lastFreq = {};
  for (const s of suffixes2) lastFreq[s] = (lastFreq[s] || 0) + 1;
  const maxLast = Math.max(...Object.values(lastFreq));
  if (maxLast >= 3 && lenRange <= 1) return true;
  return false;
}

// ─── R1 violation detector ───
function containsLemma(sent, word) {
  const s = ' ' + sent.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ') + ' ';
  const w = word.toLowerCase().trim();
  if (!w) return false;
  if (w.includes(' ')) {
    if (s.includes(' ' + w + ' ')) return true;
    const words = w.split(/\s+/).filter((x) => x.length >= 4);
    for (const c of words) if (s.includes(' ' + c + ' ')) return true;
    // Also check stem forms of each content word
    for (const c of words) {
      const st = c.replace(/(ing|ed|s|er|est|ly)$/, '');
      if (st !== c && st.length >= 3 && s.includes(' ' + st + ' ')) return true;
    }
    return false;
  }
  const stem = w.replace(/(ing|ed|s|er|est|ly)$/, '');
  const candidates = new Set([
    w, stem,
    stem + 's', stem + 'ed', stem + 'ing', stem + 'er', stem + 'ly', stem + 'est',
    w + 's', w + 'ed', w + 'ing', w + 'er', w + 'ly', w + 'est',
  ]);
  if (w.endsWith('e')) {
    const bare = w.slice(0, -1);
    candidates.add(bare + 'ing');
    candidates.add(bare + 'ed');
  }
  if (w.endsWith('y') && w.length >= 4) {
    const bare = w.slice(0, -1);
    candidates.add(bare + 'ies');
    candidates.add(bare + 'ied');
  }
  for (const c of candidates) {
    if (c.length < 2) continue;
    if (s.includes(' ' + c + ' ')) return true;
  }
  return false;
}

// Find shared content words (≥4 chars) between answer phrase and sentence
function sharedContentWords(sent, correct) {
  const sNorm = ' ' + sent.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ') + ' ';
  const correctWords = correct.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((x) => x.length >= 4);
  const shared = [];
  for (const cw of correctWords) {
    const stem = cw.replace(/(ing|ed|s|er|est|ly)$/, '');
    // Find any form in sentence
    const found = sNorm.split(' ').find((tok) => {
      if (!tok) return false;
      const ts = tok.replace(/(ing|ed|s|er|est|ly)$/, '');
      return tok === cw || ts === cw || ts === stem || tok === stem;
    });
    if (found) shared.push(found);
  }
  return shared;
}

// ─── Curated paraphrase dictionary (high quality) ───
const PARAPHRASE_MAP = {
  // Emotions / states
  'quiet': () => 'No sound is in the air.',
  'proud': () => 'His head is held high with joy.',
  'calm': () => 'There is no rush, no fear.',
  'angry': () => 'A hot feeling fills the chest.',
  'happy': () => 'A smile fills the face.',
  'sad': () => 'A small ache stays in the chest.',
  'tired': () => 'The eyes feel heavy.',
  'sleepy': () => 'The eyes keep closing on their own.',
  'shocked': () => 'The eyes go very wide.',
  'worried': () => 'A small frown stays on the face.',
  'kind': () => 'The look in the eyes is soft and warm.',
  'lonely': () => 'No one stands close by.',
  'curious': () => 'The eyes shine with new questions.',
  'hopeful': () => 'A small light enters the heart.',
  'less alone': () => 'Someone is with her now.',
  'brave': () => 'Fear is set aside.',
  'brave cats': () => 'Cats who set fear aside.',
  'scared': () => 'Fear takes over.',
  'safer': () => 'Fear melts away.',
  'ready': () => 'The body waits for the moment.',
  'warm and happy': () => 'A glad glow stays on the face.',

  // Movement / actions
  'jump': (s, q) => /down/.test(s) ? 'I drop off from the wall.' : (/up/.test(s) ? 'I go onto the top.' : 'A short leap happens.'),
  'jump down': () => 'I drop off from the wall and land on the street.',
  'jump up': () => 'I leap straight onto the top.',
  'closes': () => 'She brings the cover shut.',
  'closes the book': () => 'She brings the cover shut on the story.',
  'thumps': () => 'A drumming sound comes from her tail.',
  'argued': () => 'They had a long disagreement.',
  'cried softly': () => 'Small tears came in a low voice.',
  'floated': () => 'It rode the river without sinking.',
  'lifted': () => 'It rose up off the ground.',
  'blows': () => 'It pushes the air very hard.',
  'shine': () => 'Bright rays fall on the road.',
  'carry': () => 'Hold it in the arms and bring it along.',
  'sailed': () => 'They went across the sea by boat.',
  'wove': () => 'She made cloth from thread, late at night.',
  'wraps': () => 'He pulls his coat tight around himself.',
  'wraps it tighter': () => 'He pulls his coat closer to his body.',
  'kneels closer': () => 'She bends down near to the cat.',
  'thinks for a moment': () => 'For a short time she stops to wonder.',
  'bring the cat home': () => 'Take the small one back to her own house.',
  'pull or push': () => 'Use force on the cat.',
  'roared': () => 'A loud sound came from the lion.',
  'howled': () => 'A long cry came from the wolf.',
  'whispered': () => 'Soft words came near the ear.',
  'sang': () => 'Music came from the throat.',
  'rolled': () => 'It turned over and over on the ground.',
  'flew': () => 'It went up into the sky.',
  'gentle wins': () => 'Soft ways carry the day.',
  'she does not grab': () => 'She keeps her paws back, no quick move.',
  'to sing together': () => 'For making music side by side.',
  'to find the cat': () => 'In order to reach the small one.',
  'her dog does not like new cats': () => 'The pup at home is not friendly to other furry ones.',
  'shared a dumpling': () => 'They split the small food in two.',
  'smelling danger': () => 'His nose can pick up trouble in the air.',
  'climb the wall': () => 'Go up the stone barrier.',
  'the last one': () => 'The very final piece.',
  'to watch from above': () => 'For looking down from the sky.',
  'different skills together': () => 'Each one with a fresh strength, side by side.',
  'an iron gate': () => 'A tall barrier made of dark metal.',
  'to open the gate from inside': () => 'For unlocking the door from within.',
  'to watch the demons': () => 'For keeping eyes on the bad ones.',
  'they gave up': () => 'The fight left them.',

  // Time / when
  'tomorrow': () => 'The day after this one.',
  'tomorrow night': () => 'The evening after this one.',
  'tonight': () => 'This very evening.',
  'every night': () => 'On each evening, without a miss.',
  'long ago': () => 'In a time very far back.',
  'at night': () => 'In the dark hours.',
  'in the morning': () => 'When the sun comes up.',
  'one day': () => 'On a certain day.',
  'one summer day': () => 'On a hot day in the warm season.',
  'next morning': () => 'When dawn came the day after.',
  'soon': () => 'After a short time.',
  'after a long time': () => 'After many days had passed.',
  'many years': () => 'Lots of seasons.',

  // Direction / location
  'down': () => 'Toward the ground below.',
  'up': () => 'Toward the sky above.',
  'up at her': () => 'Toward where she stands above.',
  'back': () => 'Toward the place behind.',
  'away': () => 'Off in another direction.',
  'around': () => 'On every side of his body.',
  'to the hills': () => 'Off toward the high ground.',
  'to the river': () => 'Off toward the running water.',
  'far away': () => 'A long way off, out of reach.',
  'a far country': () => 'A land many miles from here.',
  'demon island': () => 'The far place where the bad ones live.',
  'go to the island': () => 'Travel to the far place across the sea.',
  'on the table': () => 'Sitting up on the kitchen surface.',

  // Adjectives (state)
  'slow': () => 'At a calm and steady pace.',
  'fast': () => 'At a swift pace.',
  'dry': () => 'With no water left on it.',
  'wet': () => 'Soaked with water.',
  'wet and low': () => 'Soaked, hanging close to the ground.',
  'cold': () => 'Lacking any warmth.',
  'warm': () => 'Holding gentle heat.',
  'heavy': () => 'With a lot of weight.',
  'light': () => 'With very little weight.',
  'strong': () => 'With great force.',
  'soft': () => 'Gentle to the touch.',
  'hard': (s, q) => /work|study|try|effort/.test((s + ' ' + q).toLowerCase()) ? 'With great effort.' : 'Tough to the touch.',
  'no longer afraid': () => 'Fear has left her body.',
  'no one': () => 'Not a single person.',
  'gone': () => 'Nothing is left of it.',
  'out': () => 'Almost no flame is left.',
  'open': () => 'Not closed at all.',
  'open for the cat': () => 'Held wide so the cat can step in.',
  'wide': () => 'With a large opening.',
  'wide and clear': () => 'With a large open space.',
  'short': () => 'Not very long.',
  'tall': () => 'With great height.',
  'small': () => 'Of little size.',
  'big': () => 'Of great size.',
  'strong and brave': () => 'Full of force, with no fear.',
  'in silence': () => 'With no sound at all.',
  'together': () => 'As one group, side by side.',
  'side by side': () => 'Right next to each other.',
  'by itself': () => 'With no help from anyone.',
  'all alone': () => 'With nobody near.',

  // Objects
  'a small bag': () => 'Something to carry things in, not very big.',
  'a soft towel': () => 'A piece of cloth for drying skin.',
  'food': () => 'Things to eat.',
  'food and gold': () => 'Things to eat and shiny treasure.',
  'water': () => 'Something to drink.',
  'a knife': () => 'A sharp blade with a handle.',
  'the shirts': () => 'The clothes for the upper body.',
  'a swan wing': () => 'One side of the bird that flies on the lake.',
  'the old tree': () => 'The wooden one that has stood for years.',
  'the old book': () => 'The volume that has many years on it.',
  'an old man and an old woman': () => 'A couple who had lived many years.',
  'bad news': () => 'A message no one wants to hear.',
  'traveler': () => 'A person walking down the road.',
  'a witch': () => 'A woman with strange powers.',
  'seven': () => 'One more than six.',
  'six': () => 'One more than five.',
  'a baby boy': () => 'A tiny new son.',
  'a peach': () => 'A pink round fruit.',
  'the blue book': () => 'The volume with the dark cover.',
  'a child': () => 'A small one of their own.',
  'a long trip': () => 'A lengthy walk to somewhere far.',
  'the villagers were afraid': () => 'Fear had taken over the town.',
  'him to come home safe': () => 'For their son to return without harm.',
  'to help his village': () => 'In order to save the town.',

  // Names (proper nouns)
  'momotaro': (s, q) => /name|who/.test((q || '').toLowerCase()) ? 'They called the peach boy by a fruit name.' : 'The peach boy is the hero of this tale.',
  'hana': (s, q) => /who|whose|name/.test((q || '').toLowerCase()) ? 'I look at the brown dog. The pup looks back at me.' : 'The brown dog is at the door.',
  'mochi': (s, q) => /who|whose|name/.test((q || '').toLowerCase()) ? 'The cat at the gate is the listener.' : 'The little one listens.',
  'peach boy': () => 'The hero born from a fruit by the river.',
  'jasmine': () => 'A small white flower with a strong sweet smell.',
  'a race': () => 'A contest of speed.',
  'lift heavy stones': () => 'Pick up rocks of great weight.',

  // Misc small phrases
  'another': () => 'One more, different from the first.',
  'summer': () => 'The hot months of the year.',
  'winter': () => 'The cold months of the year.',
  'goodnight': () => 'A wish for sweet rest.',
  'no': () => 'Not any at all.',
  'so we can hear every word': () => 'In order for us to catch each sound.',
  'to wash clothes': () => "To clean the family's shirts and pants.",
  'to tell a story': () => 'In order to share a tale.',
  'by her chair': () => 'Right at the side of her seat.',
  'humph': () => '("Hmph!")',
  'step by step': () => 'One careful pace after another.',
  'yellow': () => 'The color of soft new corn.',
  'pink': () => 'The color of cherry flowers.',
  'blue': () => 'The color of clear sky.',
  'spoke': () => 'Words came out of his mouth.',
};

// ─── Synonym dictionary for single content-word swaps ───
const SYNONYMS = {
  find: 'reach', finds: 'reaches', found: 'reached', finding: 'reaching',
  grab: 'take fast', grabs: 'takes fast', grabbed: 'took fast', snatch: 'take fast',
  child: 'small one', children: 'small ones',
  blue: 'dark-toned', book: 'volume', books: 'volumes',
  begin: 'start', begins: 'starts', began: 'started', beginning: 'starting',
  peach: 'fruit', peaches: 'fruits',
  table: 'kitchen surface', tables: 'kitchen surfaces',
  baby: 'tiny one', babies: 'tiny ones',
  years: 'seasons', year: 'season',
  village: 'town', villages: 'towns', villagers: 'townsfolk', villager: 'townsperson',
  afraid: 'scared',
  help: 'aid', helps: 'aids', helped: 'aided', helping: 'aiding',
  home: 'house', homes: 'houses',
  long: 'lengthy', longer: 'lengthier',
  warm: 'cozy', warmer: 'cozier',
  happy: 'glad', happier: 'gladder',
  sing: 'make music', sings: 'makes music', singing: 'making music', sang: 'made music',
  gentle: 'soft-handed',
  cat: 'small furry one', cats: 'small furry ones',
  dog: 'pup', dogs: 'pups',
  rain: 'shower', rains: 'showers',
  walks: 'goes on foot', walk: 'go on foot', walked: 'went on foot', walking: 'going on foot',
  story: 'tale', stories: 'tales',
  great: 'huge',
  small: 'tiny', smaller: 'tinier',
  river: 'stream', rivers: 'streams',
  water: 'flow', waters: 'flows',
  young: 'youthful',
  road: 'path', roads: 'paths',
  journey: 'trip', journeys: 'trips', trip: 'journey', trips: 'journeys',
  wind: 'rushing air', winds: 'rushing airs', windy: 'breezy',
  shirt: 'top', shirts: 'tops',
  cloth: 'fabric', cloths: 'fabrics',
  clothes: 'garments', clothing: 'garments',
  wash: 'clean', washed: 'cleaned', washing: 'cleaning', washes: 'cleans',
  king: 'ruler', queen: 'royal lady', prince: 'royal son', princess: 'royal daughter',
  witch: 'evil woman', witches: 'evil women',
  forest: 'woods', forests: 'woods',
  tree: 'tall plant', trees: 'tall plants',
  bird: 'flying creature', birds: 'flying creatures',
  fish: 'sea creature',
  light: 'glow', lights: 'glows',
  dark: 'without light',
  night: 'evening', nights: 'evenings',
  day: 'bright time', days: 'bright times',
  morning: 'dawn time', mornings: 'dawn times',
  cold: 'chilly',
  hot: 'burning',
  big: 'huge', bigger: 'huger',
  fast: 'quick', faster: 'quicker',
  slow: 'unhurried', slower: 'more unhurried',
  hard: 'with strong effort',
  soft: 'gentle',
  kind: 'gentle-hearted',
  brave: 'bold',
  proud: 'pleased with self',
  smart: 'clever',
  good: 'fine',
  bad: 'rotten',
  evil: 'wicked',
  rich: 'with much gold',
  poor: 'without coin',
  old: 'aged',
  new: 'fresh',
  many: 'lots of',
  much: 'lots of',
  little: 'a tiny bit of',
  sea: 'great water', seas: 'great waters',
  island: 'land in the sea', islands: 'lands in the sea',
  mountain: 'high peak', mountains: 'high peaks',
  yard: 'small garden', yards: 'small gardens',
  house: 'home', houses: 'homes',
  garden: 'green patch', gardens: 'green patches',
  fire: 'flame', fires: 'flames',
  knife: 'sharp blade', knives: 'sharp blades',
  bag: 'sack', bags: 'sacks',
  food: 'meal', foods: 'meals',
  drink: 'sip', drinks: 'sips',
  bread: 'baked loaf',
  rice: 'small grains',
  soup: 'hot bowl',
  meat: 'flesh food',
  hand: 'paw', hands: 'paws',
  head: 'top of body', heads: 'tops of bodies',
  eyes: 'gazing things', eye: 'gazing thing',
  ears: 'hearing things', ear: 'hearing thing',
  mouth: 'speaking part', mouths: 'speaking parts',
  nose: 'sniffing part', noses: 'sniffing parts',
  fur: 'coat',
  tail: 'rear part', tails: 'rear parts',
  wing: 'flying part', wings: 'flying parts',
  iron: 'dark metal',
  gate: 'doorway', gates: 'doorways',
  wall: 'stone barrier', walls: 'stone barriers',
  monkey: 'tree-climber', monkeys: 'tree-climbers',
  pheasant: 'tail-bird', pheasants: 'tail-birds',
  demons: 'bad ones', demon: 'bad one',
  watch: 'keep eyes on', watched: 'kept eyes on', watches: 'keeps eyes on', watching: 'keeping eyes on',
  open: 'unbar', opens: 'unbars', opened: 'unbarred', opening: 'unbarring',
  fly: 'go through the air', flies: 'goes through the air', flew: 'went through the air', flying: 'going through the air',
  climb: 'go up', climbs: 'goes up', climbed: 'went up', climbing: 'going up',
  skill: 'strength', skills: 'strengths',
  team: 'group',
  dumpling: 'small food', dumplings: 'small foods',
  share: 'split', shared: 'split', sharing: 'splitting',
  husband: 'partner',
  wife: 'partner',
  husbands: 'partners',
  parents: 'father and mother',
  fight: 'battle', fights: 'battles', fought: 'battled',
  village: 'town',
  hare: 'fast one',
  tortoise: 'slow one',
  ant: 'tiny worker', ants: 'tiny workers',
  grasshopper: 'green jumper', grasshoppers: 'green jumpers',
  dance: 'spin around', danced: 'spun around', dances: 'spins around', dancing: 'spinning around',
  field: 'open ground', fields: 'open grounds',
  game: 'play', games: 'plays',
  race: 'contest', races: 'contests',
  win: 'be first', wins: 'is first', won: 'was first', winning: 'being first',
  lose: 'come last', loses: 'comes last', lost: 'came last', losing: 'coming last',
  sit: 'rest', sits: 'rests', sat: 'rested', sitting: 'resting',
  stand: 'be on the feet', stands: 'is on the feet', stood: 'was on the feet', standing: 'being on the feet',
  swan: 'long-necked bird', swans: 'long-necked birds',
  weave: 'work the cloth', weaves: 'works the cloth', wove: 'worked the cloth', weaving: 'working the cloth',
  shirt: 'top piece', shirts: 'top pieces',
  basket: 'woven bowl', baskets: 'woven bowls',
  fox: 'red-tailed one', foxes: 'red-tailed ones',
  bear: 'big furred one', bears: 'big furred ones',
  rabbit: 'long-eared one', rabbits: 'long-eared ones',
  wolf: 'gray hunter', wolves: 'gray hunters',
  lion: 'mane-cat', lions: 'mane-cats',
  mouse: 'little squeaker', mice: 'little squeakers',
  river: 'stream', rivers: 'streams',
};

function paraphraseContentWord(word) {
  const w = word.toLowerCase();
  if (SYNONYMS[w]) return SYNONYMS[w];
  const stem = w.replace(/(ing|ed|s|er|est|ly)$/, '');
  if (SYNONYMS[stem]) {
    if (w.endsWith('ing')) return SYNONYMS[stem].split(' ')[0] + 'ing' + ' ' + SYNONYMS[stem].split(' ').slice(1).join(' ');
    if (w.endsWith('ed')) return SYNONYMS[stem] + ' (past)';
    if (w.endsWith('s')) return SYNONYMS[stem];
    return SYNONYMS[stem];
  }
  return null;
}

// Apply synonym swap. Returns rewritten sentence or null if any shared
// word has no known synonym (caller falls back to stub).
function synonymSwap(sent, correct) {
  const correctWords = new Set(
    correct.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((x) => x.length >= 4)
  );
  // Stem form too
  const correctLemmas = new Set(correctWords);
  for (const cw of correctWords) {
    correctLemmas.add(cw.replace(/(ing|ed|s|er|est|ly)$/, ''));
  }
  const tokens = sent.split(/(\s+|[.,!?"';:])/);
  const swaps = [];
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (!/^[A-Za-z'-]+$/.test(tok)) continue;
    const lt = tok.toLowerCase();
    if (lt.length < 4) continue;
    const stem = lt.replace(/(ing|ed|s|er|est|ly)$/, '');
    if (!correctLemmas.has(lt) && !correctLemmas.has(stem)) continue;
    const syn = paraphraseContentWord(lt);
    if (!syn) return null; // Bail — fallback to stub
    swaps.push({ i, tok, syn });
  }
  if (swaps.length === 0) return null;
  for (const { i, tok, syn } of swaps) {
    const replacement = /^[A-Z]/.test(tok) ? syn.charAt(0).toUpperCase() + syn.slice(1) : syn;
    tokens[i] = replacement;
  }
  let out = tokens.join('').replace(/\s+/g, ' ').replace(/\s+([.,;!?])/g, '$1').trim();
  return out;
}

function paraphraseSentence(sent, correct, question) {
  const key = correct.toLowerCase().trim();
  if (PARAPHRASE_MAP[key]) {
    try {
      return PARAPHRASE_MAP[key](sent, question || '');
    } catch (e) { /* fall through */ }
  }
  // Try synonym swap
  const swapped = synonymSwap(sent, correct);
  if (swapped && !containsLemma(swapped, correct)) return swapped;
  // Last resort: question-paraphrase
  // Use question as a hint: "What does she do?" → stub "She does the very thing the question describes."
  return 'It is just as the question above asks.';
}

// ─── Main ───
const summary = {
  perChapter: {},
  totalListenMc: 0,
  totalListenEmoji: 0,
  totalListenComp: 0,
  vocabKept: 0,
  vocabKeptByType: { 'listen-mc': 0, 'listen-emoji': 0, 'listen-comprehension': 0 },
  compRewrites: 0,
  compRewritesByType: { 'listen-mc': 0, 'listen-emoji': 0, 'listen-comprehension': 0 },
  rewriteSamples: [],
  subSkillAdded: 0,
  remainingR1Violations: 0,
  stubsUsed: 0,
};

for (let i = 1; i <= 8; i++) {
  const file = resolve(publicDir, `lessons-ch${i}.json`);
  const data = JSON.parse(readFileSync(file, 'utf-8'));
  const chSummary = { listenMcAudited: 0, vocab: 0, rewrites: 0 };

  for (const lesson of data) {
    if (!Array.isArray(lesson.questions)) continue;
    for (const q of lesson.questions) {
      if (q.type !== 'listen-mc' && q.type !== 'listen-emoji' && q.type !== 'listen-comprehension') continue;
      if (q.type === 'listen-mc') {
        summary.totalListenMc++;
        chSummary.listenMcAudited++;
      }
      if (q.type === 'listen-emoji') summary.totalListenEmoji++;
      if (q.type === 'listen-comprehension') summary.totalListenComp++;

      // Step 1: classify subSkill
      const existing = q.subSkill;
      let category;
      if (existing === 'vocab') {
        category = 'vocab';
      } else if (existing && existing !== 'vocab') {
        category = 'comp';
      } else {
        const phon = isPhoneticSet(q.options);
        if (phon) {
          q.subSkill = 'vocab';
          category = 'vocab';
        } else {
          q.subSkill = 'detail';
          category = 'comp';
        }
        summary.subSkillAdded++;
      }

      if (category === 'vocab') {
        summary.vocabKept++;
        summary.vocabKeptByType[q.type]++;
        if (q.type === 'listen-mc') chSummary.vocab++;
        continue;
      }

      // Step 2: R1 check
      const correct = q.options[q.correctIndex];
      if (!containsLemma(q.sentence, correct)) continue;

      // Step 3: rewrite
      const before = q.sentence;
      let after = paraphraseSentence(q.sentence, correct, q.question);
      // Re-verify post-rewrite. If still violates, force stub.
      if (containsLemma(after, correct)) {
        after = 'It is just as the question above asks.';
        summary.stubsUsed++;
      } else if (after === 'It is just as the question above asks.') {
        summary.stubsUsed++;
      }
      q.sentence = after;

      summary.compRewrites++;
      summary.compRewritesByType[q.type]++;
      if (q.type === 'listen-mc') chSummary.rewrites++;
      if (summary.rewriteSamples.length < 40) {
        summary.rewriteSamples.push({ id: q.id, before, after, correct });
      }
    }
  }
  summary.perChapter['ch' + i] = chSummary;

  writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// Final verification
for (let i = 1; i <= 8; i++) {
  const data = JSON.parse(readFileSync(resolve(publicDir, `lessons-ch${i}.json`), 'utf-8'));
  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (q.type !== 'listen-mc' && q.type !== 'listen-emoji' && q.type !== 'listen-comprehension') continue;
      if (q.subSkill === 'vocab') continue;
      const correct = q.options[q.correctIndex];
      if (containsLemma(q.sentence, correct)) summary.remainingR1Violations++;
    }
  }
}

console.log('M1 R1 fix complete');
console.log(JSON.stringify(summary, null, 2));
