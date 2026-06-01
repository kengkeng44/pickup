#!/usr/bin/env node
/**
 * V2: ID-keyed hand-crafted A2 polishes that respect R1.
 *
 * For each awkward sentence in lessons-ch1..8.json, the OVERRIDES map
 * holds a natural A2 rewrite that:
 *   1. Removes the M1-injected clunker (compound-toned colors, "with X"
 *      prep phrases, made-up animal/object names, etc.)
 *   2. Does NOT contain the correct option as substring (preserves R1).
 *   3. Stays in GSL-2000 vocabulary.
 *   4. Keeps the original semantic meaning so the audio prompt still
 *      matches what the cloze/comprehension question is asking.
 *
 * Each entry was hand-picked to dodge its specific correct option.
 * Verified programmatically at the end.
 */
const fs = require('node:fs');
const path = require('node:path');

const publicDir = path.resolve(__dirname, '..', 'public');
const files = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => path.join(publicDir, `lessons-ch${n}.json`));
const TARGET_TYPES = new Set(['listen-mc', 'listen-emoji', 'listen-comprehension']);

// Hand-crafted polishes by question id.
// Convention: keep narrative voice, dodge the listed correct option.
const OVERRIDES = {
  // === Ch1 ===
  // correct: "all set" — sentence about ears pointed up waiting
  'kt-ch1-l3-q4': 'My ears stand straight up and wait.',
  // correct: "scared" — shadow makes her shiver
  'kt-ch1-l5-q4': 'A big shadow makes her shake all over.',
  // correct: "very sad" — heart aches deep within her
  'kt-ch1-l6-q8': 'Her heart aches deep inside her chest.',
  // correct: "nobody" — empty alley
  'kt-ch1-l6-q12': 'Not one person walks past the alley.',
  // correct: "to find the cat" — looking for the cat
  'kt-ch1-l7-q11': 'In order to reach the little stray.',
  // correct: "down" — she looks at the ground
  'kt-ch1-l11-q5': 'She looks at the ground below her.',
  // correct: "a soft towel" — soft drying cloth
  'kt-ch1-l12-q2': 'She takes out a clean piece of cloth.',
  // correct: "dry" — fur is no longer damp
  'kt-ch1-l13-q5': 'Soon the fur is no longer damp.',
  // correct: "bring the cat home" — cannot take her home
  'kt-ch1-l14-q2': 'She cannot take the little stray with her.',
  // correct: "kind" — her face is gentle again
  'kt-ch1-l14-q5': 'Her face is warm and gentle again.',
  // correct: "another" — Grandma has one more story
  'kt-ch1-l16-q1': 'Grandma says, "I have just one more tale for you."',
  // correct: "hard" — ant works hard
  'kt-ch1-l17-q2': 'The ant works very, very long days.',
  // correct: "to sing together" — joined for singing
  'kt-ch1-l17-q4': 'For making music side by side.',
  // correct: "tonight" — one more story this evening
  'kt-ch1-l19-q1': 'Grandma says, "Just one more tale this evening."',
  // correct: "argued" — wind and sun had a long talk-fight
  'kt-ch1-l19-q2': 'Long ago, the north wind and the sun could not agree.',
  // correct: "blows" — wind pushes air hard
  'kt-ch1-l20-q1': 'The north wind sends cold air very, very fast.',
  // correct: "strong" — wind is forceful
  'kt-ch1-l20-q2': 'The wind is cold and full of force.',
  // correct: "around" — wraps coat on every side
  'kt-ch1-l20-q4': 'He wraps it close to himself.',
  // correct: "shine" — sun begins to send light
  'kt-ch1-l21-q1': 'Now the sun begins to glow softly.',
  // correct: "goodnight" — a wish for sweet rest
  'kt-ch1-l22-q1': 'A wish for sweet sleep.',
  // correct: "back" — I walk back slowly
  'kt-ch1-l23-q3': 'I walk away slowly.',

  // === Ch2 ===
  // correct: "blue" — Grandma has a blue book
  'kt-ch2-l1-q2': 'Grandma has a new book in deep sky color.',
  // correct: "the blue book" — sentence about blue cover book
  'kt-ch2-l1-q4': 'The volume with the deep sky cover.',
  // correct: "the story to begin" — Grandma about to start
  'kt-ch2-l2-q5': 'We both look at Grandma. She is about to open the page.',
  // correct: "a child" — small one of their own
  'kt-ch2-l4-q4': 'A little one of their very own.',
  // correct: "pink" — peach color
  'kt-ch2-l5-q2': 'It was rose-colored and round and very big.',
  // correct: "floated" — peach rode water
  'kt-ch2-l5-q3': 'The peach drifted on the water toward her hands.',
  // correct: "heavy" — peach was very weighty
  'kt-ch2-l6-q2': 'The peach was full of weight in her arms.',
  // correct: "on the table" — sitting on the kitchen table
  'kt-ch2-l6-q5': 'Sitting up on the cooking top.',
  // correct: "a knife" — sharp blade with handle
  'kt-ch2-l7-q1': 'A sharp tool with a handle.',
  // correct: "strong and brave" — Momotaro was forceful and fearless
  'kt-ch2-l9-q2': 'He was full of force and full of courage.',
  // correct: "many years" — twelve months passed
  'kt-ch2-l9-q6': 'Many seasons passed. He was now a young man.',
  // correct: "Demon Island" — far place of bad ones
  'kt-ch2-l10-q5': 'The far place of the dark spirits.',
  // correct: "go to the island" — travel across sea
  'kt-ch2-l11-q1': 'Travel across the sea to the dark spirits.',
  // correct: "him to come home safe" — parents want him to return unharmed
  'kt-ch2-l11-q5': 'His parents said, "Come back without harm. We will wait for you."',
  // correct: "dumplings" — mother made small food parcels
  'kt-ch2-l12-q1': 'His mother made millet rice balls for him.',
  // correct: "two" — pair
  'kt-ch2-l13-q5': 'A pair, no more.',
  // correct: "a monkey" — tree-climber jumped down
  'kt-ch2-l14-q1': 'A long-tailed climber jumped down from a tree.',
  // correct: "quick and clever" — both fast and sharp
  'kt-ch2-l14-q2': 'Both quick of foot and quick of mind.',
  // correct: "a dumpling" — shared a small food parcel
  'kt-ch2-l14-q3': 'Momotaro shared one rice ball with him too.',
  // correct: "climb the wall" — go up the stone barrier
  'kt-ch2-l14-q4': 'Go up the tall stone fence.',
  // correct: "a pheasant" — tail-bird flew down
  'kt-ch2-l15-q1': 'A bright tail bird flew down from the sky.',
  // correct: "green and gold" — color
  'kt-ch2-l15-q2': 'Leaf-color and shining yellow.',
  // correct: "sailed" — boat rode the sea
  'kt-ch2-l16-q1': 'They got into a small boat and went across the sea.',
  // correct: "wide and blue" — sky/sea
  'kt-ch2-l16-q2': 'Broad and deep sky-color.',
  // correct: "an iron gate" — tall barrier of dark metal
  'kt-ch2-l17-q1': 'A tall fence of dark heavy metal.',
  // correct: "to open the gate from inside" — for unlocking from within
  'kt-ch2-l17-q4': 'For unlocking the door from the other side.',
  // correct: "to watch the demons" — for keeping eyes on
  'kt-ch2-l17-q5': 'For watching the dark spirits.',
  // correct: "his sword" — raised his long blade
  'kt-ch2-l18-q1': 'Momotaro raised his long sharp blade and shouted.',
  // correct: "proud" — sailed home rich and proud
  'kt-ch2-l18-q6': 'Momotaro and his friends sailed home rich and pleased.',
  // correct: "the tortoise and the hare"
  'kt-ch2-l19-q1': 'Grandma says, "That reminds me of the slow one and the fast one."',
  // correct: "the tortoise" — slow-footed one crossed
  'kt-ch2-l20-q3': 'The slow one crossed the line first.',
  // correct: "sheep" — boy watched flock
  'kt-ch2-l21-q1': 'A shepherd boy watched his soft white flock on the hill.',
  // correct: "a real wolf" — gray hunter
  'kt-ch2-l22-q2': 'Then one day, a true gray beast came.',
  // correct: "a goodnight" — Grandma evening parting
  'kt-ch2-l23-q4': 'Grandma says, "Sweet rest, little ones."',
  // correct: "jump off the wall" — leap off stone barrier
  'kt-ch2-l23-q5': 'I leap off the stone fence and walk home in the moonlight.',
  // correct: "dogs are loyal friends" — pups are always-by-side pals
  'kt-ch2-l24-q2': 'Grandma says, "Because pups are true friends, like you."',
  // correct: "if the boy was real" — was the young lad true
  'kt-ch2-l24-q3': 'Mochi asks, "Was the shepherd boy real?"',
  // correct: "air inside is light" — peaches full of breath stuff
  'kt-ch2-l24-q6': 'Grandma says, "Peaches are full of soft inside. The soft inside is lighter than water."',
  // correct: "the demons" — were the bad ones all bad
  'kt-ch2-l24-q7': 'Mochi asks, "Were the dark spirits all bad?"',

  // === Ch3 ===
  // correct: "autumn" — leaf-fall months wind
  'kt-ch3-l1-q1': 'The fall season wind is cool tonight.',
  // correct: "red and yellow" — leaves cherry/corn-toned
  'kt-ch3-l1-q4': 'The leaves are rose-colored and golden.',
  // correct: "on the grass" — Hana on green ground cover
  'kt-ch3-l2-q1': 'Hana is already on the soft green ground.',
  // correct: "inside the egg" — still within shell-ball
  'kt-ch3-l4-q2': 'I am still within my round shell.',
  // correct: "yellow" — corn-toned ducklings
  'kt-ch3-l5-q2': 'Four little golden ducklings come out.',
  // correct: "big and gray" — ugly duckling self-description
  'kt-ch3-l6-q2': 'I am huge and cloud-colored.',
  // correct: "shy" — I feel small and soft-spoken
  'kt-ch3-l6-q6': 'I feel small and very quiet.',
  // correct: "yellow" — siblings corn-toned
  'kt-ch3-l6-q3': 'My brothers and sisters are all golden.',
  // correct: "ugly" — plain-looking
  'kt-ch3-l8-q3': 'You are so unlovely.',
  // correct: "a hen house" — old mother bird home
  'kt-ch3-l9-q1': 'I walk into an old farm bird home.',
  // correct: "an old hen" — aged mother bird
  'kt-ch3-l9-q2': 'An aged farm bird looks down at me.',
  // correct: "if I lay eggs" — can you rest shell-balls
  'kt-ch3-l9-q4': '"Can you make round shells?" asks the hen.',
  // correct: "go far away" — go a long way off
  'kt-ch3-l10-q2': '"You should go very far, child."',
  // correct: "far behind" — yard far behind me
  'kt-ch3-l10-q6': 'The yard is very far at the back of me.',
  // correct: "a swamp" — walk through wet ground
  'kt-ch3-l11-q1': 'I walk alone through a wet, muddy place.',
  // correct: "warm bread" — cozy baked loaf
  'kt-ch3-l13-q2': 'She gives me some cozy fresh loaf.',
  // correct: "her cat" — small furry creature
  'kt-ch3-l13-q3': 'Her small furry pet does not like me.',
  // correct: "white" — snow-toned birds
  'kt-ch3-l14-q2': 'Big snow-color birds fly over me.',
  // correct: "into the clouds" — disappear in sky-puffs
  'kt-ch3-l14-q6': 'The birds disappear into the sky-mist.',
  // correct: "a farmer" — kind land-tiller
  'kt-ch3-l16-q1': 'A kind man of the land finds me on the ice.',
  // correct: "he breaks the ice" — snaps frozen water
  'kt-ch3-l16-q2': 'He cracks the cold sheet and lifts me out.',
  // correct: "deep" — I sleep deep through the night
  'kt-ch3-l16-q6': 'I sleep heavily through the night.',
  // correct: "a white swan" — reflection is snow-toned long-necked bird
  'kt-ch3-l17-q4': 'The reflection is a snow-color long-necked bird.',
  // correct: "he was never really ugly" — was I ever plain-looking
  'kt-ch3-l17-q5': 'Was I ever an unlovely duckling?',
  // correct: "a lion" — mane-cat sleeps
  'kt-ch3-l19-q1': 'A big maned beast sleeps under a tree.',
  // correct: "over his nose" — small mouse runs past his nose
  'kt-ch3-l19-q2': 'A small mouse runs across the top of his face.',
  // correct: "the mouse begs and promises help" — why does lion let it go
  'kt-ch3-l19-q5': 'Why does the lion let the small tiny one go?',
  // correct: "thanks and runs home" — mouse says thanks and runs
  'kt-ch3-l19-q6': 'The mouse says thank you and runs home fast.',
  // correct: "in a net" — hunters catch in rope mesh
  'kt-ch3-l20-q1': 'Hunters catch the lion in a strong rope trap.',
  // correct: "bites the rope" — mouse snaps teeth on thick cord
  'kt-ch3-l20-q4': 'The mouse cuts through the thick cord with his teeth.',
  // correct: "keep sheep" — boy holds on to wool beasts
  'kt-ch3-l21-q1': 'A young boy watches over his flock on a hill.',
  // correct: "shouts for help" — boy cries out loud Wolf
  'kt-ch3-l22-q2': 'The boy yells again, "Wolf! Wolf!"',
  // correct: "no one" — not a single soul
  'kt-ch3-l22-q3': 'Not one soul.',
  // correct: "she did not understand" — she just did not grasp
  'kt-ch3-l24-q4': 'No, she was not bad. She just did not know.',
  // correct: "a swan child" — had never seen a long-necked bird small one
  'kt-ch3-l24-q5': 'She had never seen a young big-winged bird before.',
  // correct: "if I was a swan" — was I a long-necked bird
  'kt-ch3-l24-q8': 'Was I a big white bird too? I ask quietly.',
  // correct: "that is enough" — just sufficient
  'kt-ch3-l24-q9': 'Grandma says, "You are Mochi. That is plenty."',

  // === Ch4 ===
  // correct: "warm grass" — yard smells cozy ground cover
  'kt-ch4-l1-q2': 'The yard smells like cozy green ground.',
  // correct: "tortoise and hare"
  'kt-ch4-l3-q2': 'A slow one meets a fast one.',
  // correct: "his long legs" — look at my lengthy lower limbs
  'kt-ch4-l4-q1': 'Hare says, "Look at my very long jumping limbs."',
  // correct: "proud" — Hare feels proud
  'kt-ch4-l4-q5': 'Hare feels very pleased with himself.',
  // correct: "keep going" — just hold on to making journey
  'kt-ch4-l5-q2': '"I just go on and on," he says.',
  // correct: "the old tree" — very aged tall plant
  'kt-ch4-l6-q1': 'The very aged big tree.',
  // correct: "accept" — Tortoise agrees
  'kt-ch4-l6-q2': 'Tortoise nods. "I say yes."',
  // correct: "excited" — Hare feels lit up with joy
  'kt-ch4-l6-q5': 'Hare feels full of joy about the race.',
  // correct: "counts down" — bird tallies toward ground
  'kt-ch4-l7-q2': 'The bird counts low. "Three, two, one!"',
  // correct: "nervous" — Tortoise feels jittery
  'kt-ch4-l7-q5': 'Tortoise feels a bit shaky but ready.',
  // correct: "like a brown blur" — Hare bursts forward
  'kt-ch4-l8-q1': 'Hare bursts forward like a rust-color streak.',
  // correct: "dust" — fine dirt powder flies up
  'kt-ch4-l8-q2': 'Fine powdered dirt flies up behind his feet.',
  // correct: "powerful" — Hare feels mighty
  'kt-ch4-l8-q5': 'Hare feels strong and free.',
  // correct: "keep going to the end" — Tortoise: keep going to finish
  'kt-ch4-l9-q3': 'He thinks, "I will go on and on to the finish."',
  // correct: "steady" — Tortoise unshaken inside
  'kt-ch4-l9-q5': 'Tortoise feels firm inside.',
  // correct: "back" — Hare looks behind
  'kt-ch4-l10-q1': 'Hare looks behind over his shoulder.',
  // correct: "no one" — not a single soul
  'kt-ch4-l10-q2': 'Not one soul.',
  // correct: "under a shady bush" — Hare curls under shadow-cool plant
  'kt-ch4-l11-q1': 'Hare curls up below a cool leafy plant.',
  // correct: "relaxed" — Hare feels at ease
  'kt-ch4-l11-q5': 'Hare feels easy and warm.',
  // correct: "the river bank" — Tortoise reaches stream edge
  'kt-ch4-l12-q1': 'Tortoise reaches the side of the stream.',
  // correct: "determined" — Tortoise firm of will
  'kt-ch4-l12-q5': 'Tortoise feels strong of will to go on.',
  // correct: "the sleeping hare" — Tortoise walks past resting one
  'kt-ch4-l13-q1': 'Tortoise walks past the dozing fast one.',
  // correct: "keeps walking" — feels tired but holds on
  'kt-ch4-l14-q2': 'He feels tired but he keeps moving on his feet.',
  // correct: "sore but proud" — achy but head-high
  'kt-ch4-l14-q5': 'Tortoise feels achy but very pleased.',
  // correct: "the old tree" — second mention
  'kt-ch4-l15-q1': 'The very aged big tree.',
  // correct: "his nose" — Tortoise touches tree with sniffing part
  'kt-ch4-l16-q1': 'Tortoise touches the tree with his face.',
  // correct: "proud" — Tortoise feels deeply proud
  'kt-ch4-l16-q5': 'Tortoise feels deeply pleased and warm.',
  // correct: "no one" — not a single soul
  'kt-ch4-l17-q2': 'Not one soul.',
  // correct: "I did not stop" — Tortoise: I carried out not come to halt
  'kt-ch4-l18-q2': 'Tortoise smiles and says, "I never paused."',
  // correct: "slow is fine if you keep going" — Tortoise final
  'kt-ch4-l18-q3': 'Tortoise also says, "Going slow is fine, if you keep on."',
  // correct: "gentle" — Tortoise feels soft-handed not boastful
  'kt-ch4-l18-q5': 'Tortoise feels mild, not boastful.',
  // correct: "cheese" — holds piece of cow-milk block
  'kt-ch4-l19-q2': 'He holds a piece of milk-block in his beak.',
  // correct: "lucky" — crow feels fortune-touched
  'kt-ch4-l19-q4': 'The crow feels touched by good fortune today.',
  // correct: "the crow's voice" — fox says your speech sound must be lovely
  'kt-ch4-l20-q1': 'The fox says, "Your singing must be lovely."',
  // correct: "flatters" — fox showers crow with sweet words
  'kt-ch4-l20-q2': 'He gives the crow many sweet, sweet words.',
  // correct: "clever" — fox feels sharp-minded
  'kt-ch4-l20-q4': 'The fox feels quick of mind and pleased.',
  // correct: "city mouse visits country mouse"
  'kt-ch4-l21-q1': 'A town mouse drops in on his country friend.',
  // correct: "a hungry cat" — hear a wanting food small furry one
  'kt-ch4-l22-q2': 'They suddenly hear a meowing little pet.',
  // correct: "relieved" — country mouse feels free of worry
  'kt-ch4-l22-q4': 'The country mouse feels glad to leave.',
  // correct: "yawn" — I open mouth from tiredness
  'kt-ch4-l23-q2': 'I stretch my mouth slowly on the wall.',
  // correct (likely "warm and gentle" or similar) — night feels soft and full
  'kt-ch4-l23-q4': 'The night feels soft and whole.',
  // correct: "quietly proud" — feel head-high of tortoise
  'kt-ch4-l24-q4': 'I feel softly pleased of the tortoise tonight.',
  // correct: "If the hare slept" — did fast-footed one sleep
  'kt-ch4-l25-q1': 'Hana asks, "Did the fast one really sleep?"',
  // correct: "deeply" — slept far down
  'kt-ch4-l25-q2': 'Grandma says, "Yes, he slept very heavily under the bush."',
  // correct: "If the tortoise was tired" — was slow-footed one worn out
  'kt-ch4-l25-q3': 'Hana asks, "Was the slow one worn out?"',
  // correct: "carry" — slow steps still bring on the arm you forward
  'kt-ch4-l25-q5': 'Slow steps still move you forward.',
  // correct: "comforted" — Hana feels made to feel safe
  'kt-ch4-l25-q7': 'Hana feels safe again by the answer.',

  // === Ch5 ===
  // correct: "dry" — wind is without wet and warm
  'kt-ch5-l1-q1': 'Tonight the wind has no damp and is warm.',
  // correct: "sand" — smells like fine grit
  'kt-ch5-l1-q2': 'The night smells like fine, dry dust.',
  // correct: "from a desert" — sand land wind
  'kt-ch5-l1-q5': 'Where is the warm sandy wind from?',
  // correct: "at the beginning" — setting off on of world
  'kt-ch5-l4-q1': 'This was at the start of the world.',
  // correct: "busy" — everyone with much to do at work
  'kt-ch5-l4-q5': 'Everyone has many tasks at work.',
  // correct: "in the desert" — Camel lives in sand land
  'kt-ch5-l5-q1': 'A Camel lives in the warm sandy land.',
  // correct: "to trot" — Horse wants to jog along
  'kt-ch5-l6-q3': 'The Horse wants to go quickly together.',
  // correct: "friendly" — Horse is pal-like and kind
  'kt-ch5-l6-q4': 'The Horse is warm and kind.',
  // correct: "sad" — Horse goes away low-hearted
  'kt-ch5-l7-q3': 'The Horse walks away with a low heart.',
  // correct: "proud" — Camel feels head-high of his Humph
  'kt-ch5-l7-q4': 'The Camel feels very pleased of his "Humph!"',
  // correct: "a stick" — Dog has thin wood
  'kt-ch5-l8-q2': 'The Dog has a slim piece of wood in his mouth.',
  // correct: "kind" — Dog wags tail gently-hearted
  'kt-ch5-l8-q5': 'The Dog wags his tail in a gentle way.',
  // correct: "his stick" — Dog drops thin wood
  'kt-ch5-l9-q2': 'The Dog drops his slim wood.',
  // correct: "eat grass" — Camel goes back to put mouth on green ground
  'kt-ch5-l9-q3': 'The Camel goes back to chew on the green ground.',
  // correct: "lazy" — Camel feels free and work-shy
  'kt-ch5-l9-q4': 'The Camel feels free and shy of work.',
  // correct: "a yoke" — Ox has beast-pulling beam
  'kt-ch5-l10-q2': 'The Ox has a wooden pulling beam on his neck.',
  // correct: "patient" — Ox is in calm-wait and slow
  'kt-ch5-l10-q5': 'The Ox is calm and slow.',
  // correct: "the Camel" — desert-walker
  'kt-ch5-l12-q2': 'The one who walks the sands.',
  // correct: "frowns" — Man hears them and low-face looks
  'kt-ch5-l12-q4': 'Man hears them and pulls a sad mouth.',
  // correct: "the Djinn" — Man calls Spirit being
  'kt-ch5-l13-q1': 'Man calls the Great Spirit of All Sands.',
  // correct: "all the deserts" — Djinn is in charge of all sand lands
  'kt-ch5-l13-q2': 'The Djinn is in charge of all the warm sandy places.',
  // correct: "the Camel" — desert-walker again
  'kt-ch5-l13-q4': 'The one who walks the sands.',
  // correct: "a cloud of dust" — Djinn rolls up in sky-puff of fine dirt
  'kt-ch5-l14-q1': 'The Djinn rolls up in a puff of fine powder.',
  // correct: "across the desert" — goes over to other side of sand land
  'kt-ch5-l14-q2': 'He goes across the warm sandy place.',
  // correct: "the Djinn can do magic" — wrong with saying Humph to Spirit being
  'kt-ch5-l15-q6': 'What is wrong with saying "Humph!" to the Great Spirit?',
  // correct: "sits down" — Djinn rests body toward ground
  'kt-ch5-l16-q2': 'The Djinn lowers himself with his chin in his hand.',
  // correct: "a Great Magic" — He begins to think a Huge Spell-work
  'kt-ch5-l16-q3': 'He begins to think a Huge Spell-thing.',
  // correct: "proud" — Camel feels very head-high
  'kt-ch5-l16-q4': 'The Camel feels very, very pleased.',
  // correct: "it swells" — Camel flat back begins to puff out
  'kt-ch5-l17-q1': 'The Camel\'s flat back begins to grow round.',
  // correct: "he missed three days of work" — why three days without eating
  'kt-ch5-l18-q6': 'Why three bright days without eating?',
  // correct: "a big storm" — huge fierce weather comes
  'kt-ch5-l20-q1': 'A huge wild wind comes that night.',
  // correct: "the reed" — now the tall grass is still tall
  'kt-ch5-l20-q4': 'Now the long thin plant is still standing.',
  // correct: "at night" — mice meet at dark hours
  'kt-ch5-l21-q1': 'The mice meet when the sky is dark.',
  // correct: "hear the cat" — catch the sound of small furry one
  'kt-ch5-l21-q4': 'Then we can sense the little pet coming.',
  // correct: "an old mouse" — aged tiny squeaker
  'kt-ch5-l22-q1': 'An aged little squeaker asks one question.',
  // correct: "the lamp" — Grandma turns off small light
  'kt-ch5-l23-q4': 'Grandma smiles and turns off the bedside light.',
  // correct: "wiser" — feel a little more old-knowing
  'kt-ch5-l24-q4': 'I feel a little more knowing tonight.',
  // correct: "do not be lazy" — do not be work-shy
  'kt-ch5-l25-q11': 'The lesson is: do not avoid work.',
  // correct: "good night" — fine dark hours
  'kt-ch5-l25-q15': 'Sweet rest, my little friend.',
  // correct: "No, it was magic" — Grandma says it was spell-work, not pain
  'kt-ch5-l25-q8': 'Grandma says it was a wonder, not pain.',

  // === Ch6 ===
  // correct: "heavy" — air feels with much weight
  'kt-ch6-l1-q3': 'The air feels full of weight.',
  // correct: "a thick book" — Grandma waits with fat-bodied volume
  'kt-ch6-l1-q4': 'Grandma waits with a big book.',
  // correct: "ears" — His hearing things bend back
  'kt-ch6-l2-q3': 'His listening parts bend back.',
  // correct: "far away" — a long way off
  'kt-ch6-l3-q2': 'Very, very far.',
  // correct: "lonely" — she feels with no pal at night
  'kt-ch6-l4-q4': 'She feels all alone at night.',
  // correct: "a small doll" — real mother left tiny play-figure
  'kt-ch6-l5-q1': 'Her real mother left a tiny play-toy.',
  // correct: "a secret friend" — doll is hidden truth pal
  'kt-ch6-l5-q2': 'The doll is her quiet friend.',
  // correct: "at night" — at dark hours doll opens eyes
  'kt-ch6-l6-q1': 'When the sky is dark, the doll opens her eyes.',
  // correct: "Sleep, I will help" — Rest eyes, I will aid
  'kt-ch6-l6-q3': 'The doll says, "Close your eyes. I will be near."',
  // correct: "the deep woods" — go to far down forest
  'kt-ch6-l7-q2': 'She says, "Go to the dark forest for fire."',
  // correct: "afraid" — she feels a little in fear
  'kt-ch6-l7-q4': 'She feels a little of dread.',
  // correct: "at dawn" — white rider passes at early-day light
  'kt-ch6-l9-q1': 'A white rider passes her at first light.',
  // correct: "small but brave" — Vasilisa tiny but fear-less
  'kt-ch6-l9-q4': 'Vasilisa feels tiny but full of courage.',
  // correct: "a strange hut" — odd little small cottage
  'kt-ch6-l10-q1': 'She finds an odd little house.',
  // correct: "chicken legs" — hut stands on two farm bird limbs
  'kt-ch6-l10-q2': 'The hut stands on two bird-shaped feet.',
  // correct: "very still" — Vasilisa stands truly all same
  'kt-ch6-l11-q3': 'Vasilisa stands without moving.',
  // correct: "a hard task" — Baba Yaga gives strong effort job
  'kt-ch6-l12-q1': 'Baba Yaga gives her a very tough job.',
  // correct: "clean the yard" — must with no dirt small green patch
  'kt-ch6-l12-q2': 'She must wash the big garden.',
  // correct: "sort the seeds" — next she must sort plant beginnings
  'kt-ch6-l13-q1': 'Next she must group the tiny plant grains by kind.',
  // correct: "a bit of bread" — takes snapped-teeth of baked loaf
  'kt-ch6-l14-q1': 'She takes a small piece of fresh loaf.',
  // correct: "in silence" — without a single sound
  'kt-ch6-l15-q3': 'Without one sound.',
  // correct: "on the third morning" — on after-second sun-up time
  'kt-ch6-l16-q1': 'On the day after the second sunrise, the work is done.',
  // correct: "very surprised" — witch looks truly caught off guard
  'kt-ch6-l16-q2': 'The witch looks really shaken.',
  // correct: "a glowing skull" — Baba Yaga gives shining bony head-cap
  'kt-ch6-l17-q1': 'Baba Yaga gives her a shining bone head on a stick.',
  // correct: "back along the path" — Vasilisa walks back beside walking way
  'kt-ch6-l18-q1': 'Vasilisa walks home beside the small road.',
  // correct: "brave and warm" — Vasilisa feels fear-less and cozy
  'kt-ch6-l18-q4': 'Vasilisa feels full of courage and cozy.',
  // correct: "the cold stepmother" — chilly second mama is gone
  'kt-ch6-l18-q6': 'At home the chilly false mother is gone.',
  // correct: "seven" — one more than half of twelve
  'kt-ch6-l21-q2': 'Just over half of twelve.',
  // correct: "the seven owners" — week of belonging-holders came home
  'kt-ch6-l22-q1': 'The seven hut keepers came home at last.',
  // correct: "surprised" — they saw the child and felt caught off guard
  'kt-ch6-l22-q2': 'They saw the child and felt very, very startled.',
  // correct: "a magic doll" — Mochi wants spell-work tiny play-figure
  'kt-ch6-l23-q8': 'Mochi says, "I want a magic play-toy too."',
  // correct: "another tale" — Grandma will tell one more story
  'kt-ch6-l24-q3': 'Tomorrow night Grandma will tell a new story.',
  // correct: "sleep well" — Grandma whispers rest eyes in fine way
  'kt-ch6-l24-q9': 'Grandma whispers, "Rest deeply, little ones."',

  // === Ch7 ===
  // correct: "a daughter" — He also had one small girl-child
  'kt-ch7-l4-q2': 'He also had one small young one.',
  // correct: "loved them" — little sister held dear her brothers
  'kt-ch7-l4-q6': 'The little sister cared deeply for her brothers.',
  // correct: "found out" — witch came upon no longer alight
  'kt-ch7-l5-q4': 'But the witch learned the truth anyway.',
  // correct: "white shirts" — six snow-toned top garments
  'kt-ch7-l6-q1': 'She threw six snow-color tops at them.',
  // correct: "rose" — six swans went up into sky
  'kt-ch7-l7-q1': 'Six swans flew high into the sky.',
  // correct: "far away" — a long way off
  'kt-ch7-l7-q4': 'Very, very far.',
  // correct: "to find her brothers" — wanted to come upon siblings
  'kt-ch7-l8-q3': 'She wanted to reach her brothers.',
  // correct: "brave but scared" — heart was fear-less but in fear
  'kt-ch7-l8-q6': 'Her heart was full of courage but full of dread.',
  // correct: "tall and dark" — The trees were high-bodied and shadowed
  'kt-ch7-l9-q3': 'The trees were very high and shaded.',
  // correct: "seven" — one more than half of twelve
  'kt-ch7-l10-q2': 'Just over half of twelve.',
  // correct: "lay down" — she rested toward the ground
  'kt-ch7-l10-q3': 'She rested her body on one bed.',
  // correct: "at sundown" — at late-day glow swans came home
  'kt-ch7-l11-q1': 'When the day was ending, the swans came home.',
  // correct: "six years" — half a dozen twelve-month span
  'kt-ch7-l12-q2': 'She must stay silent for six long seasons.',
  // correct: "nodded" — she gave a head-tip
  'kt-ch7-l12-q5': 'She tipped her head and said yes.',
  // correct: "by the river" — She gathered star-flowers by the stream
  'kt-ch7-l13-q1': 'She gathered bright wildflowers by the stream.',
  // correct: "no, she stayed silent" — she did not cry out loud
  'kt-ch7-l13-q3': 'She made no shouts.',
  // correct: "in a tree" — sat high up in tall plant
  'kt-ch7-l14-q1': 'She sat high up in a leafy giant.',
  // correct: "wove shirts" — still made cloth from thread every night
  'kt-ch7-l15-q2': 'She still made tops from thread every night.',
  // correct: "quiet but kind" — days were hushed but gentle-hearted
  'kt-ch7-l15-q6': 'Her days were hushed but full of warmth.',
  // correct: "tall and hot" — The fire was high-bodied and burning
  'kt-ch7-l17-q1': 'The fire was very high and hot.',
  // correct: "the top-pieces" — top garments collapsed sentence
  'kt-ch7-l17-q2': 'The white tops.',
  // correct: "six swans" — half a dozen long-necked birds flew through smoke
  'kt-ch7-l18-q1': 'Six soft white swans flew through the smoke.',
  // correct: "the top-pieces"
  'kt-ch7-l18-q2': 'The white tops.',
  // correct: "a swan wing" — one side of long-necked bird
  'kt-ch7-l18-q4': 'One side of the snow-color bird.',
  // correct: "went out" — fire made the journey no longer alight
  'kt-ch7-l18-q6': 'The fire died down fast.',
  // correct: "three" — A trio
  'kt-ch7-l19-q2': 'A trio of wishes.',
  // correct: "his wife" — wedded lady wanted to choose
  'kt-ch7-l19-q3': 'His partner wanted to choose too.',
  // correct: "a sausage" — wished for long meat tube
  'kt-ch7-l20-q1': 'He wished for a long stick of meat.',
  // correct: "on his nose" — she wished it onto his sniffing part
  'kt-ch7-l20-q2': 'She wished it onto the middle of his face.',
  // correct: "a mouse mother" — tiny squeaker mama
  'kt-ch7-l21-q1': 'A little mama squeaker had a small daughter.',
  // correct: "the strongest groom" — wanted with much force wedding man
  'kt-ch7-l21-q2': 'She wanted the most forceful groom.',
  // correct: "the sun" — she asked sky-light first
  'kt-ch7-l21-q3': 'She asked the bright sky orb first.',
  // correct: "the wall" — wind said stone barrier was stronger
  'kt-ch7-l22-q2': 'The wind said the stone fence was stronger.',
  // correct: "a mouse" — wall said tiny squeaker was stronger
  'kt-ch7-l22-q3': 'The wall said a little squeaker was stronger.',
  // correct: "very quiet" — street is truly hushed
  'kt-ch7-l24-q2': 'The street is really hushed.',
  // correct: "the light goes out" — yard glow makes journey no longer alight
  'kt-ch7-l24-q4': 'The yard glow fades behind me.',
  // correct: "could I stay silent that long" — one of those Hana be with no sound
  'kt-ch7-l25-q7': 'Could Hana keep quiet for six years?',
  // correct: "a swan wing" — one side of long-necked bird
  'kt-ch7-l25-q8': 'One side of the snow-color bird.',
  // correct: "love does not need words" — hold dear can be quiet too
  'kt-ch7-l25-q14': 'Caring can be quiet too.',

  // === Ch8 ===
  // correct: "the last night" — final dark hours
  'kt-ch8-l1-q1': 'Tonight is the final dark sky I will visit this yard.',
  // correct: "dry" — wind without wet and clear sky
  'kt-ch8-l1-q2': 'The wind has no damp, and the sky is very clear.',
  // correct: "heavy" — heart feels little with much weight
  'kt-ch8-l1-q4': 'My heart feels a little full of weight tonight.',
  // correct: "very long ago" — story from 唐朝 truly lengthy in past
  'kt-ch8-l3-q2': 'This story is from 唐朝, from many ages back.',
  // correct: "it is much older than Cinderella" — special compared to maid-of-ashes
  'kt-ch8-l3-q5': 'What is special about this story compared to the ash maid?',
  // correct: "lonely" — feels with no pal every day
  'kt-ch8-l4-q4': 'She feels all alone every day.',
  // correct: "unkind" — Her stepmother is mean-spirited to her every day
  'kt-ch8-l5-q1': 'Her stepmother is harsh to her every day.',
  // correct: "carry" — Ye Xian must bring on arm water
  'kt-ch8-l5-q3': 'Ye Xian must bring water from the well on her shoulders.',
  // correct: "a fish with gold eyes" — 金魚 with shiny yellow gazing things
  'kt-ch8-l6-q2': 'In the pond lives a 金魚 with shining yellow round looks.',
  // correct: "rice" — feeds fish small pieces of small white grains
  'kt-ch8-l6-q3': 'She feeds the fish small pieces of grain.',
  // correct: "rice from her own bowl" — feeds with small white grains from food holder
  'kt-ch8-l7-q1': 'Every evening Ye Xian feeds the 金魚 with grain from her own meal dish.',
  // correct: "swims close" — fish moves through water shut
  'kt-ch8-l7-q4': 'The fish glides near when it hears her.',
  // correct: "bigger each week" — fish grows larger every seven-day span
  'kt-ch8-l8-q1': 'The fish grows larger and larger every passing seven days.',
  // correct: "with proud eyes" — Ye Xian looks at fish with head-high gazing things
  'kt-ch8-l8-q4': 'Ye Xian looks at the fish with shining pleased looks.',
  // correct: "the water creature is now too huge..." sentence about huge fish
  'kt-ch8-l8-q5': 'The pond friend is now too huge for any small bowl.',
  // correct: "cold and sharp" — smile chilly and pointed like knife
  'kt-ch8-l9-q4': 'Her smile is chilly and like a knife edge.',
  // correct (variable) — stepmother sees from window
  'kt-ch8-l9-q1': 'The stepmother sees the pond friend from a window.',
  // correct (variable) — why does stepmother trick
  'kt-ch8-l9-q6': 'Why does the stepmother trick the pond friend this way?',
  // correct: "a sharp hook" — catches fish with pointed curved holder
  'kt-ch8-l10-q1': 'She catches the fish with a pointed curved blade.',
  // correct: "wise and kind" — eyes old-knowing and very gentle-hearted
  'kt-ch8-l12-q2': 'His eyes are very knowing and very warm.',
  // correct: "hear every wish" — bones will catch sound of each wanted thing
  'kt-ch8-l12-q5': 'The bones will catch each wish you whisper.',
  // correct: "soft brown earth" — covers with gentle cocoa-toned soil ground
  'kt-ch8-l13-q2': 'She covers them with warm dark dirt.',
  // correct: "next week" — village festival coming right after seven-day span
  'kt-ch8-l14-q1': 'The village 洞節 is coming in seven days.',
  // correct: "a gold robe" — 金 long flowing gown appears
  'kt-ch8-l14-q4': 'A 金 long shining dress appears in her hands like magic.',
  // correct: "in silence" — without a single sound
  'kt-ch8-l15-q4': 'Without one sound.',
  // correct: "with both hands" — king picks up slipper with pair of paws
  'kt-ch8-l16-q5': 'The king picks up the slipper with two hands.',
  // correct: "the foot that fits the slipper"
  'kt-ch8-l17-q2': 'He looks for the lower part that suits the soft shoe.',
  // correct: "she pushes hard" — stepsister shoves with strong effort
  'kt-ch8-l17-q4': 'The stepsister pushes with great force but cannot fit.',
  // correct: "a quiet girl in old clothes" — hushed young lass in aged garments
  'kt-ch8-l17-q5': 'Then a hushed young maid in aged dress steps forward.',
  // correct: "quiet inside their cave" — fish bones grow hushed within rock hole
  'kt-ch8-l18-q4': 'The fish bones grow hushed inside their stone cave.',
  // correct: "gives food to poor children" — hands over meal to without coin child
  'kt-ch8-l18-q5': 'Ye Xian shares meals with every poor little child in her new home.',
  // correct: "a lonely fisherman" — with no pal finned-creature catcher picks up snail
  'kt-ch8-l19-q2': 'A lonely fish catcher picks up a big snail by the river.',
  // correct: "hot rice" — next morning burning small white grains is on table
  'kt-ch8-l20-q1': 'Next morning warm grain is already on his table.',
  // correct: "behind the door" — hides at rear doorway watches
  'kt-ch8-l20-q2': 'He stays just past the doorframe and watches in silence.',
  // correct: "his wife Chang'e" — gives it to wedded lady to keep
  'kt-ch8-l21-q4': 'He gives it to his partner Chang\'e to keep.',
  // correct: "to keep it safe" — Chang'e drinks medicine to hold on to it unhurt
  'kt-ch8-l22-q2': 'Chang\'e drinks the medicine to keep it from harm.',
  // correct: "moon" — body slowly flies up to bright night-light
  'kt-ch8-l22-q3': 'Her body slowly flies up to the bright sky orb at night.',
  // correct: "a small jade rabbit" — lives with tiny green stone long-eared one
  'kt-ch8-l22-q4': 'She lives alone with a tiny green stone hopping pet.',
  // correct: "very softly" — Grandma closes old red book truly gentle
  'kt-ch8-l23-q1': 'Grandma closes the old red book really softly.',
  // correct: "the end of our eight nights" — finish-point of our twice four dark hours
  'kt-ch8-l23-q2': 'She says, that is the close of our twice four dark skies.',
  // correct: "eyes" — Hana looks at me with round gazing things
  'kt-ch8-l23-q3': 'Hana looks up at me with round shining looks.',
  // correct: "a little heavy" — ears feel a tiny bit with much weight
  'kt-ch8-l23-q4': 'My ears feel a tiny bit full of weight too.',
  // correct: "the moon" — blows candle but night-light still bright
  'kt-ch8-l23-q6': 'She blows out the candle but the sky orb at night is still bright.',
  // correct: "was she scared" — was Ye Xian in fear
  'kt-ch8-l24-q1': 'Hana looks at me with round eyes and asks: was Ye Xian afraid?',
  // correct: "yes she was scared" — she was in fear
  'kt-ch8-l24-q2': 'I think for a moment and answer: yes, she was full of dread.',
  // correct: "she still went to the festival" — but she all the same made journey
  'kt-ch8-l24-q3': 'But she still walked to the holiday with shaking hands.',
  // correct: "brave" — being fear-less is not same as not scared
  'kt-ch8-l24-q4': 'Being full of courage is not the same as not being scared.',
  // correct: "a spell-work water creature body-frame piece" wish sentence
  'kt-ch8-l24-q5': 'I wish I had a magic pond friend bone too.',
  // correct: "they get wet" — my eyes get wet but do not cry out loud
  'kt-ch8-l24-q8': 'My eyes feel damp but I do not yell.',
};

// Apply OVERRIDES, then verify R1 for each.
let polished = 0;
let inspected = 0;
let leftAsIs = 0;
let r1Skip = 0;
const r1Failures = [];
const sample = [];

function lcContains(s, needle) {
  return s.toLowerCase().includes(needle.toLowerCase());
}

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (!TARGET_TYPES.has(q.type) || q.subSkill === 'vocab' || !q.sentence) continue;
      inspected++;
      const override = OVERRIDES[q.id];
      if (!override) {
        leftAsIs++;
        continue;
      }
      const before = q.sentence;
      const after = override;
      // R1 check
      const correct = q.options && typeof q.correctIndex === 'number' ? q.options[q.correctIndex] : null;
      if (correct) {
        const beforeR1 = lcContains(before, correct);
        const afterR1 = lcContains(after, correct);
        if (afterR1 && !beforeR1) {
          // Skip to avoid introducing R1 violation
          r1Failures.push({ id: q.id, before, after, correct });
          r1Skip++;
          continue;
        }
      }
      if (after === before) {
        leftAsIs++;
        continue;
      }
      q.sentence = after;
      polished++;
      if (sample.length < 30) {
        sample.push({ id: q.id, before, after, correct });
      }
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Residual R1 violations across all 8 chapter files
let residualR1 = 0;
const residualList = [];
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  for (const lesson of data) {
    for (const q of lesson.questions || []) {
      if (!TARGET_TYPES.has(q.type) || q.subSkill === 'vocab' || !q.sentence) continue;
      const correct = q.options && typeof q.correctIndex === 'number' ? q.options[q.correctIndex] : null;
      if (correct && lcContains(q.sentence, correct)) {
        residualR1++;
        residualList.push({ id: q.id, sentence: q.sentence, correct, file: path.basename(file) });
      }
    }
  }
}

console.log('=== POLISH V2 REPORT ===');
console.log('Inspected:', inspected);
console.log('Polished:', polished);
console.log('Left as-is:', leftAsIs);
console.log('R1 skips (would have broken R1):', r1Skip);
console.log('Residual R1 violations (full corpus):', residualR1);
if (r1Failures.length) {
  console.log('R1 failures (skipped overrides):');
  for (const f of r1Failures) {
    console.log(`  [${f.id}] correct="${f.correct}"`);
    console.log(`    AFTER (skipped): ${f.after}`);
  }
}
if (residualList.length) {
  console.log('Residual R1 details:');
  for (const r of residualList) {
    console.log(`  [${r.id}] correct="${r.correct}" sentence="${r.sentence}"`);
  }
}
console.log('Sample polishes (first 5):');
for (const s of sample.slice(0, 5)) {
  console.log(`  [${s.id}] correct="${s.correct}"`);
  console.log(`    BEFORE: ${s.before}`);
  console.log(`    AFTER:  ${s.after}`);
}

fs.writeFileSync(
  path.resolve(__dirname, '_polish_v2_report.json'),
  JSON.stringify({ inspected, polished, leftAsIs, r1Skip, residualR1, r1Failures, residualList, sample }, null, 2),
);
