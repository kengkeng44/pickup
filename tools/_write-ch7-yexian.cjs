#!/usr/bin/env node
/**
 * Ch7 葉限 (Yexian) — Tang-dynasty Cinderella prototype.
 * Bilingual zh-en code-switch voice: primary EN narration with selected
 * Hanzi inline highlights (e.g. "Her name was 葉限 (Yexian).").
 *
 * Per docs/canon/yexian.md + docs/canon/yexian-cuts.md:
 *   - 7 lessons × 11 Q
 *   - storyId: 'yexian', segmentType: 'main-story'
 *   - Hanzi ≤ 3 per lesson (cultural anchor, not lexical load)
 *   - Hanzi NEVER inside option text or cloze blank — narration only
 *   - explanationZh keeps Chinese (per existing convention)
 *
 * Structure per lesson (11 Q):
 *   1 vocab tap-pairs   (TOP)
 *   3 narration         (set scene + extend, with inline Hanzi)
 *   1 listen-tf INFER   (atmosphere/action/time/contrast)
 *   2 listen-mc         (paraphrased detail)
 *   1 emoji-pick        (visual hook)
 *   1 listen-comp GIST  (main idea)
 *   1 listen-mc         (recap)
 *   1 HOOK narration    (B-tier cut per yexian-cuts.md)
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch7.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch7', 'yexian'] };
}
function tf(id, en, zh, qEn, ans, expZh) {
  return { type: 'listen-tf', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, questionEn: qEn,
    options: ['Yes', 'No'], correctIndex: ans === 'Y' ? 0 : 1,
    explanationZh: expZh,
    tags: ['story', 'ch7', 'yexian', 'inference'] };
}
function mc(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-mc', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch7', 'yexian'],
    subSkill: 'detail' };
}
function gist(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'listen-comprehension', id, level: 'A2', difficulty: 'medium',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch7', 'yexian', 'gist'],
    subSkill: 'gist' };
}
function emoji(id, en, qEn, opts, optsZh, correct, expZh) {
  return { type: 'emoji-pick', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, question: qEn,
    options: opts, optionsZh: optsZh, correctIndex: correct,
    explanationZh: expZh,
    tags: ['story', 'ch7', 'yexian', 'hook'],
    subSkill: 'vocab' };
}
function vocabIntro(id, list4) {
  const lines = list4.map(([zh, en]) => `🔑 ${en} = ${zh}`).join('\n');
  return { type: 'tap-pairs', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator',
    sentence: 'Here are 4 words you will meet in tonight\'s story.',
    pairs: list4.map(([zh, en]) => ({ left: zh, right: en })),
    explanationZh: `本節新單字 (左中右英):\n${lines}\n背熟這 4 個字,故事就會輕鬆聽懂。`,
    tags: ['story', 'ch7', 'yexian', 'vocab', 'intro'] };
}

const lessons = [
  // ────────────────────────────────────────────────────────────────────
  // Ch7-1 Beat 1: orphan in cave village (B6 預言種子 — 後母會一直這樣?)
  // Hanzi count: 葉限, 後母 (2 — under cap)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch7-l1', chapter: 7, lessonInChapter: 1,
    segmentType: 'main-story', storyId: 'yexian',
    storyBeat: '洞穴村莊的孤女 — 後母會一直這樣?',
    questions: [
      vocabIntro('kt-ch7-l1-q1', [
        ['村', 'village'],
        ['妻', 'wife'],
        ['自己的', 'own'],
        ['辛苦', 'hard'],
      ]),
      // Q2 BEAT A — set scene with named character (S4) + 1 Hanzi
      nar('kt-ch7-l1-q2',
        'Long ago in southern China, a girl named 葉限 (Yexian) lived in a cave village.',
        '很久以前在中國南方,一個叫葉限的女孩住在洞穴村莊。'),
      // Q3 BEAT A — loss
      nar('kt-ch7-l1-q3',
        'Her mother died when she was small. Her father died too.',
        '她小時候媽媽就過世了,爸爸後來也走了。'),
      // Q4 TF inference (D contrast: own daughter vs Yexian)
      tf('kt-ch7-l1-q4',
        'The new wife gave her own daughter soft food and warm clothes.',
        '新妻子給自己的女兒軟軟的食物和溫暖的衣服。',
        'Did the new wife treat Yexian the same way?', 'N',
        '推理:好的東西都給自己女兒 → 對葉限不同 → 答 No'),
      // Q5 BEAT B — daily work
      nar('kt-ch7-l1-q5',
        'Each day, Yexian carried water up the hill and washed dishes by the well.',
        '葉限每天扛水上山,在井邊洗碗。'),
      // Q6 listen-mc paraphrase (not verbatim — "from morning to night")
      mc('kt-ch7-l1-q6',
        'She worked from when the sun rose until the moon came out.',
        'How long did she work each day?',
        ['just a moment', 'from morning to night', 'only at noon', 'only at night'],
        ['只一下子', '從早到晚', '只在中午', '只在晚上'],
        1,
        '太陽起到月亮出 → 一整天。'),
      // Q7 emoji-pick — visual hook on her status
      emoji('kt-ch7-l7-q7-tmp_placeholder',
        'How did she feel about her days?',
        'How did she feel each day?',
        ['😢 alone and tired', '🎉 happy and free', '😴 lazy and bored', '🤩 proud and loud'],
        ['孤單又累', '開心又自由', '懶又無聊', '驕傲又大聲'],
        0,
        '一個人扛水洗碗 → 孤單又累。'),
      // Q8 BEAT C — time accumulation
      nar('kt-ch7-l1-q8',
        'Year after year, no one in the cave village spoke a kind word to her.',
        '一年又一年,洞穴村莊裡沒人對她說一句好話。'),
      // Q9 listen-mc (recap, paraphrase)
      mc('kt-ch7-l1-q9',
        'The new wife only smiled at her own child.',
        'Who got the new wife\'s smiles?',
        ['Yexian', 'her own daughter', 'the neighbours', 'no one'],
        ['葉限', '她自己的女兒', '鄰居', '沒人'],
        1,
        '只對自己的孩子笑 → 自己的女兒。'),
      // Q10 gist
      gist('kt-ch7-l1-q10',
        'Yexian carried buckets, washed pots, and slept on a thin straw mat in the corner.',
        'What is this scene mainly showing?',
        ['Yexian\'s hard daily life',
         'a happy family dinner',
         'a busy market day',
         'a noisy festival night'],
        ['葉限辛苦的日常', '快樂的家庭晚餐', '熱鬧的市集日', '吵鬧的節慶夜'],
        0,
        '主旨 = 葉限辛苦的日常。'),
      // Q11 HOOK NARRATION — B6 預言種子 (inquiry: 後母會一直這樣對她嗎?)
      nar('kt-ch7-l1-q11',
        'And every night, she gave Yexian all the hard work, again and again...',
        '每個晚上,她都把所有辛苦的活推給葉限,一次又一次……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch7-2 Beat 2: red-fin fish friend (B3 資訊缺口 — 魚不只是魚?)
  // Hanzi: 紅鰭 (1)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch7-l2', chapter: 7, lessonInChapter: 2,
    segmentType: 'main-story', storyId: 'yexian',
    storyBeat: '池塘裡的紅鰭魚 — 牠不只是魚?',
    questions: [
      vocabIntro('kt-ch7-l2-q1', [
        ['朋友', 'friend'],
        ['池塘', 'pond'],
        ['鰭', 'fin'],
        ['溫馴', 'tame'],
      ]),
      nar('kt-ch7-l2-q2',
        'Behind the cave village was a small quiet pond.',
        '洞穴村莊後面有一個安靜的小池塘。'),
      // TF inference (A atmosphere: no people → her secret)
      tf('kt-ch7-l2-q3',
        'No one in the village ever walked down to the pond.',
        '村裡沒有人會走到池塘邊。',
        'Could Yexian keep a secret there?', 'Y',
        '推理:沒人去 → 她可以藏祕密 → 答 Yes'),
      // Beat extend + 1 Hanzi
      nar('kt-ch7-l2-q4',
        'In the water lived a fish with bright 紅鰭 (red fins) and golden eyes.',
        '水裡住著一條有紅鰭和金色眼睛的魚。'),
      // listen-mc paraphrase
      mc('kt-ch7-l2-q5',
        'Each morning, Yexian dropped rice crumbs onto the still water.',
        'What did Yexian bring to the pond?',
        ['stones', 'food', 'shoes', 'flowers'],
        ['石頭', '食物', '鞋子', '花'],
        1,
        '撒米屑 = 食物。'),
      nar('kt-ch7-l2-q6',
        'The fish swam up to her hand and let her touch its smooth side.',
        '魚游到她手邊,讓她摸牠光滑的身體。'),
      // emoji-pick about the fish
      emoji('kt-ch7-l2-q7',
        'What kind of fish was it?',
        'What kind of fish was it?',
        ['🐟 small and shy', '🐠 bright and tame', '🦈 sharp and wild', '🐡 round and angry'],
        ['小又害羞', '亮又溫馴', '尖又野', '圓又生氣'],
        1,
        '紅鰭金眼,讓她摸 → 亮又溫馴。'),
      // listen-mc paraphrase
      mc('kt-ch7-l2-q8',
        'Day by day, the fish grew longer than her two arms put together.',
        'How did the fish change?',
        ['became smaller', 'got much larger', 'turned all white', 'died one night'],
        ['變小', '變大', '變白', '死了'],
        1,
        '比她兩手張開還長 → 變大。'),
      // gist
      // v2.0.B.228 P1 (Ch7 walkthrough): old sentence 21 字爆 A2 紅線 (160%).
      // 拆兩個 sparse 短句 (10+11=21 字總量保持 → 但 chunked) 給 A2 喘息.
      gist('kt-ch7-l2-q9',
        'The village was loud and cold. Yexian sat by the pond, and the fish came up to her hand.',
        'What is this scene mainly showing?',
        ['a secret friendship by the water',
         'fishing lessons at noon',
         'a busy market day',
         'a stormy rainy night'],
        ['池邊的祕密友誼', '中午的釣魚課', '熱鬧的市集', '下大雨的夜晚'],
        0,
        '主旨 = 池邊的祕密友誼。'),
      nar('kt-ch7-l2-q10',
        'But the new wife was watching from behind the rocks.',
        '但是後母從石頭後面看著。'),
      // Q11 HOOK NARRATION — B3 資訊缺口 (inquiry: 這條魚不只是魚?)
      nar('kt-ch7-l2-q11',
        'Her eyes did not blink. Something cold and slow turned inside her chest...',
        '她的眼睛沒眨。她胸口裡有什麼又冷又慢的東西在轉……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch7-3 Beat 3: fish killed (B1 物理懸念 — 葉限會知道?她怎麼承受?)
  // Hanzi: 後母 (1)  — note: 後母 is A2-OK substitute for stepmother
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch7-l3', chapter: 7, lessonInChapter: 3,
    segmentType: 'main-story', storyId: 'yexian',
    storyBeat: '池塘空了 — 葉限會發現嗎?',
    questions: [
      vocabIntro('kt-ch7-l3-q1', [
        ['破舊', 'torn'],
        ['衣服', 'dress'],
        ['刀', 'knife'],
        ['空的', 'empty'],
      ]),
      // Beat opens with 後母 reveal
      nar('kt-ch7-l3-q2',
        'One morning, 後母 (the new wife) put on Yexian\'s torn dress.',
        '一個早上,後母穿上葉限那件破舊的衣服。'),
      // TF inference (B action implication)
      tf('kt-ch7-l3-q3',
        'She hid a small bright knife inside her wide sleeve.',
        '她把一把亮亮的小刀藏進寬寬的袖子裡。',
        'Did she want to be kind to the fish?', 'N',
        '推理:藏刀去池邊 → 不是要餵魚 → 答 No'),
      nar('kt-ch7-l3-q4',
        'She walked down to the pond and called softly, like Yexian always did.',
        '她走到池邊,像葉限那樣輕輕呼喚。'),
      // listen-mc paraphrase (the fish was fooled)
      mc('kt-ch7-l3-q5',
        'The fish swam up because the dress smelled the same.',
        'Why did the fish come up?',
        ['anger at the noise', 'thought Yexian was there', 'felt very hungry', 'was too tired'],
        ['對聲音生氣', '以為葉限來了', '肚子很餓', '太累了'],
        1,
        '聞到熟悉的味道 → 以為葉限來了。'),
      nar('kt-ch7-l3-q6',
        'That night, the family ate fish soup. Yexian had no idea.',
        '那天晚上,家裡吃魚湯。葉限完全不知道。'),
      // listen-mc paraphrase
      mc('kt-ch7-l3-q7',
        'No one at the table said where the fish had come from.',
        'What did the family hide from Yexian?',
        ['the dress', 'where the fish came from', 'the new wife\'s name', 'the village name'],
        ['衣服', '魚從哪來', '後母的名字', '村莊的名字'],
        1,
        '沒人說魚的來源 → 隱瞞魚從哪來。'),
      // emoji-pick on Yexian's discovery
      emoji('kt-ch7-l3-q8',
        'The next day, Yexian went to the pond. What did she see?',
        'What did she see at the pond?',
        ['🐟 her fish', '💧 empty water', '🌸 new flowers', '⛵ a boat'],
        ['她的魚', '空空的水', '新的花', '一艘船'],
        1,
        '魚被吃了 → 池水空空的。'),
      nar('kt-ch7-l3-q9',
        'She sat at the edge and called the fish. No bright red moved in the water.',
        '她坐在池邊呼喚那條魚。水裡沒有任何紅色在動。'),
      // gist
      gist('kt-ch7-l3-q10',
        'Yexian sat by the empty pond. Her only friend was gone, and she did not know why.',
        'What is this scene mainly showing?',
        ['Yexian loses her only friend',
         'Yexian wins a contest',
         'the village holds a market',
         'the new wife gets sick'],
        ['葉限失去唯一的朋友', '葉限贏了比賽', '村莊辦市集', '後母生病'],
        0,
        '主旨 = 葉限失去唯一的朋友。'),
      // Q11 HOOK NARRATION — B1 物理懸念
      nar('kt-ch7-l3-q11',
        'Her tears fell into the still water. Then — a sky-colored shadow moved on the other side...',
        '她的淚水落進靜靜的水裡。然後 ——對岸有個天藍色的影子在動……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch7-4 Beat 4: bones + old man (B3 資訊缺口 — 骨頭能給她什麼?)
  // Hanzi: 老人, 魚骨 (2)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch7-l4', chapter: 7, lessonInChapter: 4,
    segmentType: 'main-story', storyId: 'yexian',
    storyBeat: '老人與魚骨 — 骨頭能給她什麼?',
    questions: [
      vocabIntro('kt-ch7-l4-q1', [
        ['長袍', 'robe'],
        ['哭', 'cry'],
        ['骨頭', 'bone'],
        ['挖', 'dig'],
      ]),
      // Beat 4 opens — 老人 inline
      nar('kt-ch7-l4-q2',
        'An 老人 (old man) in a sky-colored robe stepped down beside her.',
        '一個穿著天藍色長袍的老人走到她旁邊。'),
      // TF inference (B action: came from sky)
      tf('kt-ch7-l4-q3',
        'His feet did not touch the wet grass by the pond.',
        '他的腳沒有碰到池邊的濕草。',
        'Was the old man a normal villager?', 'N',
        '推理:腳不沾草 → 不是普通人 → 答 No'),
      nar('kt-ch7-l4-q4',
        '"Do not cry, child," he said in a very soft voice.',
        '「孩子,別哭。」他用很輕的聲音說。'),
      // listen-mc paraphrase
      mc('kt-ch7-l4-q5',
        '"The bones of your fish lie under the heap by the gate."',
        'Where were the fish bones?',
        ['in the pond', 'under a pile by the gate', 'on the roof', 'inside the well'],
        ['在池塘裡', '在門邊的一堆下面', '在屋頂上', '井裡'],
        1,
        '門邊的一堆下面 = 門邊那一堆下。'),
      // 2nd Hanzi: 魚骨
      nar('kt-ch7-l4-q6',
        '"Hide the 魚骨 (fish-bone). Speak to them. They will give you anything."',
        '「把魚骨藏起來。對它們說話。它們會給你任何東西。」'),
      // listen-mc paraphrase
      mc('kt-ch7-l4-q7',
        'The old man said the bones would answer any wish she said out loud.',
        'What could the bones do?',
        ['sing', 'grant her wishes', 'fly away', 'cook food'],
        ['唱歌', '實現她的願望', '飛走', '煮飯'],
        1,
        '會給她任何東西 = 實現願望。'),
      // emoji-pick
      emoji('kt-ch7-l4-q8',
        'What did Yexian do that night?',
        'What did Yexian do that night?',
        ['🚪 ran away', '🪏 dug up the bones', '😴 just slept', '🍚 cooked rice'],
        ['逃走', '把骨頭挖出來', '只是睡', '煮飯'],
        1,
        '她照老人的話 → 挖骨頭。'),
      nar('kt-ch7-l4-q9',
        'She wrapped the bones in clean cloth and slid them under her thin mat.',
        '她用乾淨的布把骨頭包起來,塞到薄薄的草蓆下。'),
      // gist
      gist('kt-ch7-l4-q10',
        'A man from the sky told her where to find the bones, and she hid them close to her body.',
        'What is this scene mainly showing?',
        ['Yexian gets a magic gift',
         'Yexian runs away from home',
         'a family eats dinner',
         'a market opens at dawn'],
        ['葉限得到一個有魔法的禮物', '葉限離家出走', '一家人吃晚餐', '清晨市集開張'],
        0,
        '主旨 = 葉限得到一個有魔法的禮物。'),
      // Q11 HOOK — B3 inquiry: 骨頭能給她什麼?她要問什麼?
      nar('kt-ch7-l4-q11',
        'She lay on her mat and felt the bones warm under her back. What would she ask first?',
        '她躺在草蓆上,感覺背下的骨頭暖暖的。她要先問什麼?'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch7-5 Beat 5: festival night (B2 情緒翻轉 — 她會被認出嗎?)
  // Hanzi: 洞節, 青衣 (2)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch7-l5', chapter: 7, lessonInChapter: 5,
    segmentType: 'main-story', storyId: 'yexian',
    storyBeat: '洞節之夜 — 她會被認出嗎?',
    questions: [
      vocabIntro('kt-ch7-l5-q1', [
        ['節', 'festival'],
        ['燈籠', 'lantern'],
        ['披風', 'cloak'],
        ['鞋', 'shoe'],
      ]),
      // Hanzi 1: 洞節
      nar('kt-ch7-l5-q2',
        'The 洞節 (cave festival) night came. Lanterns lit up every doorway.',
        '洞節之夜到了。每個門口都掛起燈籠。'),
      // TF inference (D contrast: everyone vs Yexian)
      tf('kt-ch7-l5-q3',
        'The new wife and her daughter put on bright clothes and stepped out together.',
        '後母和她女兒穿上鮮亮的衣服,一起出門。',
        'Was Yexian allowed to go with them?', 'N',
        '推理:她們兩個一起出門,沒帶她 → 答 No'),
      nar('kt-ch7-l5-q4',
        'Alone in the cave, Yexian whispered to the bones, "I want to go too."',
        '葉限一個人在洞裡,輕聲對骨頭說:「我也想去。」'),
      // listen-mc paraphrase (what appeared) + 2nd Hanzi: 青衣
      mc('kt-ch7-l5-q5',
        'In a soft flash, a 青衣 (blue cloak) and two small gold shoes lay on the floor.',
        'What appeared on the floor?',
        ['food and water', 'fine clothing and shiny footwear', 'gold coins', 'a sharp sword'],
        ['食物跟水', '漂亮衣物跟亮亮的鞋', '金幣', '一把劍'],
        1,
        '骨頭給了 → 漂亮衣物跟亮亮的鞋 (青衣 + 金鞋)。'),
      nar('kt-ch7-l5-q6',
        'She put them on. The cloak fit her. The shoes felt light as a leaf.',
        '她穿上。披風很合身。鞋輕得像一片葉子。'),
      // listen-mc paraphrase about her transformation
      mc('kt-ch7-l5-q7',
        'When she walked into the lantern light, every face in the village turned to her.',
        'How did the villagers react?',
        ['laughed loudly at her', 'all eyes followed her', 'walked far away', 'fell fast asleep'],
        ['大聲笑她', '所有眼睛都跟著她', '走得遠遠的', '睡著了'],
        1,
        '每張臉都轉向她 → 所有眼睛都跟著她。'),
      // emoji-pick
      emoji('kt-ch7-l5-q8',
        'How did Yexian feel walking through the festival?',
        'How did she feel?',
        ['😬 small and shy', '✨ proud and free', '😡 angry and loud', '😴 sleepy and slow'],
        ['小又害羞', '驕傲又自由', '生氣又大聲', '想睡又慢'],
        1,
        '披風合身鞋很輕村人都看她 → 驕傲又自由。'),
      nar('kt-ch7-l5-q9',
        'She passed shops, music, and stalls of warm sweet food.',
        '她走過店舖、音樂,還有賣熱甜點的攤子。'),
      // gist
      gist('kt-ch7-l5-q10',
        'Yexian, who scrubbed pots that morning, now walked through bright lanterns in a sky-colored cloak.',
        'What is this scene mainly showing?',
        ['Yexian\'s transformation at the festival',
         'a quiet morning by the pond',
         'a fish soup dinner',
         'an old man\'s visit'],
        ['葉限在節慶上的蛻變', '池邊的安靜早晨', '魚湯晚餐', '老人來訪'],
        0,
        '主旨 = 葉限在節慶上的蛻變。'),
      // Q11 HOOK — B2 inquiry: 誰已經盯著她?
      nar('kt-ch7-l5-q11',
        'But from across the square, the new wife\'s daughter slowly lowered her cup of wine...',
        '但廣場對面,後母的女兒慢慢放下手裡的酒杯……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch7-6 Beat 6: shoe lost (B1 物理懸念 — 鞋會落到誰手上?)
  // Hanzi: 金鞋 (1)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch7-l6', chapter: 7, lessonInChapter: 6,
    segmentType: 'main-story', storyId: 'yexian',
    storyBeat: '掉了一隻金鞋 — 鞋會落到誰手上?',
    questions: [
      vocabIntro('kt-ch7-l6-q1', [
        ['指', 'point'],
        ['掉下來', 'fall off'],
        ['路', 'road'],
        ['到達', 'reach'],
      ]),
      nar('kt-ch7-l6-q2',
        'The new wife\'s daughter pointed across the square. "Mother — she looks like Yexian."',
        '後母的女兒指著廣場那邊。「媽——她看起來像葉限。」'),
      // TF inference (B action implication)
      tf('kt-ch7-l6-q3',
        'Yexian heard the words. She turned and slipped fast into the dark street.',
        '葉限聽到那句話。她轉身飛快鑽進暗暗的街裡。',
        'Did Yexian want them to see her face?', 'N',
        '推理:轉身快鑽進暗街 → 不想被看 → 答 No'),
      // Hanzi: 金鞋
      nar('kt-ch7-l6-q4',
        'As she ran, one 金鞋 (gold shoe) fell off her foot onto the road.',
        '她跑的時候,一隻金鞋從腳上掉到路上。'),
      // listen-mc paraphrase (she did not stop)
      mc('kt-ch7-l6-q5',
        'She did not stop to pick it up — the voices behind her were too close.',
        'Why did she leave the shoe?',
        ['it was too heavy', 'people were chasing her', 'she did not want it', 'the road was wet'],
        ['太重了', '有人在追她', '她不想要了', '路很濕'],
        1,
        '後面聲音太近 → 被追,沒空撿。'),
      nar('kt-ch7-l6-q6',
        'She came home with one bare foot and one tired heart.',
        '她回到家,一隻腳沒鞋,心也累了。'),
      // listen-mc paraphrase
      mc('kt-ch7-l6-q7',
        'The shoe lay on the road until a passing man picked it up.',
        'Who found the gold shoe?',
        ['a small child', 'a stranger on the road', 'the new wife', 'a hungry dog'],
        ['一個小孩', '路上的陌生人', '後母', '一隻餓狗'],
        1,
        '路過的男人撿了 → 路上的陌生人。'),
      // emoji-pick
      emoji('kt-ch7-l6-q8',
        'Where did the gold shoe finally reach?',
        'Where did the shoe travel to?',
        ['🏝️ an island king', '🏔️ a mountain monk', '🏠 the same cave village', '🌊 the sea'],
        ['一個海島的國王', '一個山上的和尚', '同一個洞穴村', '大海'],
        0,
        '一路傳到陀汗國王手上 = 海島國王。'),
      nar('kt-ch7-l6-q9',
        'The shoe travelled far across hills and water, hand to hand, until it reached a king.',
        '鞋一手一手,翻山越海,最後到了一個國王手上。'),
      // gist
      gist('kt-ch7-l6-q10',
        'Yexian came home with one shoe missing. Far away, that shoe sat on a king\'s table.',
        'What is this scene mainly showing?',
        ['the shoe finds a powerful owner',
         'Yexian wins a race',
         'the new wife buys new clothes',
         'a quiet day by the pond'],
        ['鞋找到一個有權力的擁有者', '葉限贏了賽跑', '後母買新衣服', '池邊安靜的一天'],
        0,
        '主旨 = 鞋落到有權力的人手上。'),
      // Q11 HOOK — B1 物理懸念 (其實在 Q8 已經破了,改成 B6 預言 — 國王要找誰)
      nar('kt-ch7-l6-q11',
        'The king lifted the shoe to the light. "I will find the foot that fits this," he said quietly...',
        '國王把鞋舉到光下。「我要找到能穿上這隻鞋的腳。」他輕輕地說……'),
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Ch7-7 Beat 7: king finds her (B2 大翻轉 — climax + open hook)
  // Hanzi: 鞋, 飛石 (2)
  // ────────────────────────────────────────────────────────────────────
  {
    id: 'kt-ch7-l7', chapter: 7, lessonInChapter: 7,
    segmentType: 'main-story', storyId: 'yexian',
    storyBeat: '國王找到她 — 鞋滑上腳像水',
    questions: [
      vocabIntro('kt-ch7-l7-q1', [
        ['試', 'try'],
        ['合身', 'fit'],
        ['腳', 'foot'],
        ['石頭', 'stone'],
      ]),
      nar('kt-ch7-l7-q2',
        'The king tried the gold shoe on every woman he could find.',
        '國王把那隻金鞋拿給所有找得到的女子試。'),
      // TF inference (D contrast — nobody fit)
      tf('kt-ch7-l7-q3',
        'Every foot was a little too wide or a little too short.',
        '每隻腳都不是太寬就是太短。',
        'Did any of them fit the shoe?', 'N',
        '推理:不是太寬就是太短 → 沒人合 → 答 No'),
      nar('kt-ch7-l7-q4',
        'At last, the king sailed to the cave village in the south.',
        '最後,國王坐船到南方的洞穴村莊。'),
      // listen-mc paraphrase
      // v2.0.B.228 P1 (Ch7 walkthrough): old option 'quietly with one bare foot'
      // = grammar mirror of sentence opening 'Quiet, with one bare foot'.
      // Paraphrase 改 'she came out without sound' (semantic 同義, surface 不同).
      mc('kt-ch7-l7-q5',
        'Quiet, with one bare foot, Yexian stepped out from behind the new wife.',
        'How did Yexian come out?',
        ['loudly and proud', 'she came out without sound', 'crying for help', 'hidden in a basket'],
        ['大聲又驕傲', '她無聲走出', '哭著求救', '藏在籃子裡'],
        1,
        '推理:Quiet + bare foot → 無聲走出。'),
      // Hanzi: 鞋
      nar('kt-ch7-l7-q6',
        '鞋 (the shoe) slipped onto her foot like clear water.',
        '鞋滑上她的腳,像水一樣自然。'),
      // listen-mc paraphrase
      mc('kt-ch7-l7-q7',
        'The king saw at once that this was the woman from the festival.',
        'How did the king feel?',
        ['surprised and sure', 'bored and tired', 'angry and loud', 'shy and quiet'],
        ['驚訝又確定', '無聊又累', '生氣又大聲', '害羞又安靜'],
        0,
        '一眼就認出 → 驚訝又確定。'),
      // emoji-pick about the rescue
      emoji('kt-ch7-l7-q8',
        'What did the king do for Yexian?',
        'What did the king do?',
        ['🚢 took her home with him', '🍞 gave her bread', '📜 wrote her a letter', '🏃 ran away'],
        ['帶她一起回家', '給她麵包', '寫信給她', '逃走'],
        0,
        '帶她回島上 → 帶她一起回家。'),
      // 2nd Hanzi: 飛石
      nar('kt-ch7-l7-q9',
        'That night, 飛石 (flying stones) fell from the sky and buried the new wife and her daughter.',
        '那天晚上,天上掉下飛石,把後母和她女兒埋了。'),
      // gist (climax)
      gist('kt-ch7-l7-q10',
        'The girl who lost her fish, her mother, and her shoe now sailed away with a kind king.',
        'What is this scene mainly showing?',
        ['Yexian finds a new safe home',
         'a long busy market day',
         'a quiet morning by the pond',
         'a noisy lantern festival'],
        ['葉限找到一個安全的新家', '長長熱鬧的市集日', '池邊安靜的早晨', '吵鬧的燈籠節'],
        0,
        '主旨 = 葉限找到一個安全的新家。'),
      // Q11 HOOK — B2 big reveal + open hook (失去的支持回來了)
      nar('kt-ch7-l7-q11',
        'On the boat, Yexian touched the small cloth in her pocket. The bones were warm again...',
        '在船上,葉限摸了摸口袋裡那塊小布。骨頭又暖了起來……'),
    ],
  },
];

// Fix the one accidentally-shifted ID in L1 (q7 had a tmp_placeholder).
for (const lesson of lessons) {
  lesson.questions.forEach((q, i) => {
    const expected = `${lesson.id}-q${i + 1}`;
    if (q.id !== expected) {
      q.id = expected;
    }
  });
}

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

// Hanzi-per-lesson audit (≤3 per lesson rule, narration only).
const HANZI_RE = /[一-鿿]/;
for (const l of lessons) {
  const narrations = l.questions.filter((q) => q.type === 'narration');
  let hanziLines = 0;
  for (const n of narrations) {
    if (HANZI_RE.test(n.sentence)) hanziLines++;
  }
  console.log(`     ${l.id}: narration lines with Hanzi = ${hanziLines}`);
}
