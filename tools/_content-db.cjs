#!/usr/bin/env node
/**
 * v2.0.B.216 — Content database extractor.
 *
 * Reads public/lessons-ch{0..7}.json, outputs:
 *   - docs/content-db.md          full table per Q (chapter / lesson / id /
 *                                 type / question / answer / est_time_s)
 *   - docs/content-db-summary.md  per-chapter aggregates + 25% variance check
 *
 * Per-type estimated time (seconds):
 *   - tap-pairs (vocab intro): 45
 *   - tap-pairs (review):      40
 *   - narration:               30  (auto-advance after TTS)
 *   - listen-tf:               25  (Y/N quick decision)
 *   - listen-mc:               45  (4-option think)
 *   - listen-comprehension:    60  (deeper inference)
 *   - emoji-pick:              30  (visual)
 *   - tap-tiles:               50  (sentence ordering)
 *   - read-mc-with-audio:      45
 *   - listen-emoji:            30
 *   - type-what-you-hear:      75  (typing)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// v2.0.B.217: revised time estimates for 5 min/lesson budget
// Per user '數量要照每個小節只能花五分鐘'
const TIME_S = {
  'tap-pairs': 30,            // 4 pairs × 7s — vocab intro
  'narration': 15,            // ~10s TTS + 2s dwell + advance
  'listen-tf': 20,            // listen + Y/N tap
  'listen-tf-zh': 20,
  'listen-mc': 35,            // listen + read 4 options + tap
  'listen-comprehension': 45, // listen + inference + tap
  'emoji-pick': 25,           // visual quick
  'tap-tiles': 35,            // sentence ordering
  'read-mc-with-audio': 35,
  'listen-emoji': 25,
  'type-what-you-hear': 60,   // typing slowest
};
const LESSON_BUDGET_S = 300;  // 5 min

const CHAPTER_TITLES = {
  0: 'Intro · 認識 Mochi 與奶奶',
  1: '桃太郎',
  2: '醜小鴨',
  3: '龜兔賽跑',
  4: '駱駝為什麼有駝峰',
  5: 'Baba Yaga',
  6: '六隻天鵝',
  7: '葉限',
  8: '三隻小豬',
  9: '灰姑娘',
  10: '嫦娥奔月',
  11: '后羿射日',
  12: '牛郎織女',
  13: '小紅帽',
  14: '浦島太郎',
  15: '國王的新衣',
  16: '一寸法師',
  17: '鶴的報恩',
  18: '興夫和孬夫',
  19: 'Sang Kancil 鼠鹿',
  20: '蘿蔔大冒險',
  21: 'Anansi 蜘蛛',
  22: '孟母三遷',
  23: '司馬光砸缸',
  24: '孔融讓梨',
  25: '愚公移山',
  26: 'Archimedes 阿基米德',
};

// v2.0.B.220: hook type per lesson (per docs/research/chapter-ending-hook-design.md)
// B1 物理懸念 / B2 情緒翻轉 / B3 資訊缺口 / B4 期待加速 / B5 道德兩難 / B6 預言種子
const HOOK_MAP = {
  // Ch1 桃太郎
  'kt-ch1-l1':     { type: 'B3',          inquiry: '那大紅色的是什麼?',  canon: 'momotaro.md#beat-1-setup' },
  'kt-ch1-l2':     { type: 'B4+B3',       inquiry: '桃子裡是什麼?',  canon: 'momotaro.md#beat-2-discovery' },
  'kt-ch1-l3':     { type: 'B5+B2',       inquiry: '父母會讓他走嗎?',  canon: 'momotaro.md#beat-3-birth' },
  'kt-ch1-l4':     { type: 'B4',          inquiry: '狗會跟他?還有誰?',  canon: 'momotaro.md#beat-4-mission' },
  'kt-ch1-l5':     { type: 'B6+B1',       inquiry: '島上為何安靜?是埋伏?',  canon: 'momotaro.md#beat-5-departure' },
  'kt-ch1-l6':     { type: 'B2',          inquiry: '鬼王怎知他名字?',  canon: 'momotaro.md#beat-6-battle' },
  'kt-ch1-l7':     { type: 'B6 open',     inquiry: '口袋還留一顆糰子 — 還有下一段?',  canon: 'momotaro.md#beat-7-victory' },
  // Ch2 醜小鴨
  'kt-ch2-l1':     { type: 'B3',          inquiry: '那大蛋裡是什麼?',  canon: 'ugly-duckling.md#beat-1-setup' },
  'kt-ch2-l2':     { type: 'B2',          inquiry: '他是醜?還是只是不一樣?',  canon: 'ugly-duckling.md#beat-2-discovery' },
  'kt-ch2-l3':     { type: 'B2',          inquiry: '媽媽會回來保護他嗎?',  canon: 'ugly-duckling.md#beat-3-rejection' },
  'kt-ch2-l4':     { type: 'B1',          inquiry: '他會被打中?還能逃多遠?',  canon: 'ugly-duckling.md#beat-4-escape' },
  'kt-ch2-l5':     { type: 'B5',          inquiry: '他要去哪?外面更冷',  canon: 'ugly-duckling.md#beat-5-cottage' },
  'kt-ch2-l6':     { type: 'B6',          inquiry: '春天會更好?還是又一次?',  canon: 'ugly-duckling.md#beat-6-winter' },
  'kt-ch2-l7':     { type: 'B2 big',      inquiry: '原來他不是醜小鴨 — 還有什麼?',  canon: 'ugly-duckling.md#beat-7-reveal' },
  // Ch3 龜兔賽跑
  'kt-ch3-l1':     { type: 'B2',          inquiry: '烏龜怎敢挑戰?他想做什麼?',  canon: 'tortoise-hare.md#beat-1' },
  'kt-ch3-l2':     { type: 'B3',          inquiry: '差距這麼大,烏龜能追嗎?',  canon: 'tortoise-hare.md#beat-2' },
  'kt-ch3-l3':     { type: 'B5',          inquiry: '兔子真的要睡?會醒嗎?',  canon: 'tortoise-hare.md#beat-3' },
  'kt-ch3-l4':     { type: 'B6',          inquiry: '兔子要醒了嗎?烏龜還剩多遠?',  canon: 'tortoise-hare.md#beat-4' },
  'kt-ch3-l5':     { type: 'B5',          inquiry: '沒人叫醒兔子嗎?該不該叫?',  canon: 'tortoise-hare.md#beat-5' },
  'kt-ch3-l6':     { type: 'B2',          inquiry: '兔子來得及嗎?還是輸定了?',  canon: 'tortoise-hare.md#beat-6' },
  'kt-ch3-l7':     { type: 'B2 big',      inquiry: '慢而穩之外 — 兔子學到了嗎?',  canon: 'tortoise-hare.md#beat-7' },
  // Ch4 駱駝為什麼有駝峰
  'kt-ch4-l1':     { type: 'B3',          inquiry: '"Humph" 是什麼意思?他在躲什麼?',  canon: 'camel-hump.md#beat-1' },
  'kt-ch4-l2':     { type: 'B6',          inquiry: '他們要告狀嗎?Man 會怎麼處理?',  canon: 'camel-hump.md#beat-2' },
  'kt-ch4-l3':     { type: 'B4',          inquiry: '沙塵裡是什麼?是誰來了?',  canon: 'camel-hump.md#beat-3' },
  'kt-ch4-l4':     { type: 'B5',          inquiry: 'Djinn 會幫誰?會罰駱駝嗎?',  canon: 'camel-hump.md#beat-4' },
  'kt-ch4-l5':     { type: 'B6',          inquiry: '是什麼魔法?駱駝會變什麼?',  canon: 'camel-hump.md#beat-5' },
  'kt-ch4-l6':     { type: 'B1',          inquiry: '背要變成什麼?還會停嗎?',  canon: 'camel-hump.md#beat-6' },
  'kt-ch4-l7':     { type: 'B2 big',      inquiry: '自己背的包袱 — user 在背什麼?',  canon: 'camel-hump.md#beat-7' },
  // Ch5 Baba Yaga 雞腳屋
  'kt-ch5-l1':     { type: 'B6',          inquiry: '沒火會怎樣?誰要去拿火?',  canon: 'baba-yaga.md#beat-1' },
  'kt-ch5-l2':     { type: 'B3',          inquiry: 'Baba Yaga 是誰?為什麼大家都知道?',  canon: 'baba-yaga.md#beat-2' },
  'kt-ch5-l3':     { type: 'B6',          inquiry: '三個騎士是誰?夜裡會出什麼事?',  canon: 'baba-yaga.md#beat-3' },
  'kt-ch5-l4':     { type: 'B1',          inquiry: '屋子會動?她要走進去嗎?',  canon: 'baba-yaga.md#beat-4' },
  'kt-ch5-l5':     { type: 'B2',          inquiry: '巫婆會吃她?還會放她走?',  canon: 'baba-yaga.md#beat-5' },
  'kt-ch5-l6':     { type: 'B3',          inquiry: '娃娃能做什麼?它會動嗎?',  canon: 'baba-yaga.md#beat-6' },
  'kt-ch5-l7':     { type: 'B2 big',      inquiry: '口袋裡的小東西 — user 自己的是什麼?',  canon: 'baba-yaga.md#beat-7' },
  // Ch6 六隻天鵝
  'kt-ch6-l1':     { type: 'B6',          inquiry: '沒了母親,誰會來填這個位置?',  canon: 'six-swans.md#beat-1' },
  'kt-ch6-l2':     { type: 'B3',          inquiry: '為什麼是六件?六件白衣是給誰?',  canon: 'six-swans.md#beat-2' },
  'kt-ch6-l3':     { type: 'B1',          inquiry: '男孩去哪了?還能變回來嗎?',  canon: 'six-swans.md#beat-3' },
  'kt-ch6-l4':     { type: 'B5',          inquiry: '六年不能說話,她能撐下去嗎?',  canon: 'six-swans.md#beat-4' },
  'kt-ch6-l5':     { type: 'B6',          inquiry: '王子的母親會接受她嗎?六年沒到呢?',  canon: 'six-swans.md#beat-5' },
  'kt-ch6-l6':     { type: 'B5',          inquiry: '她要說話救自己嗎?還是繼續織?',  canon: 'six-swans.md#beat-6' },
  'kt-ch6-l7':     { type: 'B2 big',      inquiry: '說出口的那刻 — 你忍著沒說的是什麼?',  canon: 'six-swans.md#beat-7' },
  // Ch7 葉限 (Tang Cinderella)
  'kt-ch7-l1':     { type: 'B6',          inquiry: '後母會一直這樣對她嗎?',  canon: 'yexian.md#beat-1' },
  'kt-ch7-l2':     { type: 'B3',          inquiry: '這條魚不只是魚?它是誰?',  canon: 'yexian.md#beat-2' },
  'kt-ch7-l3':     { type: 'B1',          inquiry: '葉限會知道嗎?她怎麼承受?',  canon: 'yexian.md#beat-3' },
  'kt-ch7-l4':     { type: 'B3',          inquiry: '骨頭能給她什麼?她要問什麼?',  canon: 'yexian.md#beat-4' },
  'kt-ch7-l5':     { type: 'B2',          inquiry: '她會被認出嗎?誰已經盯著她?',  canon: 'yexian.md#beat-5' },
  'kt-ch7-l6':     { type: 'B1',          inquiry: '鞋掉了會落到誰手上?',  canon: 'yexian.md#beat-6' },
  'kt-ch7-l7':     { type: 'B2 big',      inquiry: '失去的支持回來了 — 你的呢?',  canon: 'yexian.md#beat-7' },
  // Ch8 三隻小豬
  'kt-ch8-l1':     { type: 'B6',          inquiry: '狼真的會來?三個都安全?',  canon: 'three-pigs.md#beat-1-setup' },
  'kt-ch8-l2':     { type: 'B1',          inquiry: '草屋能撐多久?今晚就倒嗎?',  canon: 'three-pigs.md#beat-2-straw-house' },
  'kt-ch8-l3':     { type: 'B4',          inquiry: '是誰來了?是狼嗎?',  canon: 'three-pigs.md#beat-3-wood-house' },
  'kt-ch8-l4':     { type: 'B3',          inquiry: '第一隻會回答?狼接下來做什麼?',  canon: 'three-pigs.md#beat-4-wolf-arrives' },
  'kt-ch8-l5':     { type: 'B2',          inquiry: '木屋能擋住嗎?還是也會倒?',  canon: 'three-pigs.md#beat-5-huff-puff' },
  'kt-ch8-l6':     { type: 'B6',          inquiry: '磚屋能撐?還是狼也吹得倒?',  canon: 'three-pigs.md#beat-6-wood-falls' },
  'kt-ch8-l7':     { type: 'B6 open',     inquiry: '安全了嗎?狼還在森林裡 — 還會回來?',  canon: 'three-pigs.md#beat-7-brick-wins' },
  // Ch9 灰姑娘 (Perrault 1697)
  'kt-ch9-l1':     { type: 'B6',          inquiry: '後母會偏心嗎? 兩個姊姊怎麼對她?',  canon: 'cinderella.md#beat-1-setup' },
  'kt-ch9-l2':     { type: 'B3',          inquiry: '她哭給誰聽? 有人會看見嗎?',  canon: 'cinderella.md#beat-2-cinder-corner' },
  'kt-ch9-l3':     { type: 'B5',          inquiry: '她也可以去嗎? 她該求嗎?',  canon: 'cinderella.md#beat-3-ball-invitation' },
  'kt-ch9-l4':     { type: 'B4',          inquiry: '仙女教母要做什麼? 接下來呢?',  canon: 'cinderella.md#beat-4-fairy-godmother' },
  'kt-ch9-l5':     { type: 'B6',          inquiry: '12 點限制是什麼? 過了會怎樣?',  canon: 'cinderella.md#beat-5-magic-warning' },
  'kt-ch9-l6':     { type: 'B2',          inquiry: '鞋掉了 — 王子會找她嗎?',  canon: 'cinderella.md#beat-6-clock-strikes' },
  'kt-ch9-l7':     { type: 'B6 open',     inquiry: '仙女教母在哪? 善良才是真正的魔法?',  canon: 'cinderella.md#beat-7-slipper-fits' },
  // Ch10 嫦娥奔月
  'kt-ch10-l1':    { type: 'B6',          inquiry: '為什麼她要嫁給英雄? 神會盯著他們嗎?',  canon: 'change.md#beat-1-setup' },
  'kt-ch10-l2':    { type: 'B3',          inquiry: '仙藥是什麼? 為什麼只有一個?',  canon: 'change.md#beat-2-pill' },
  'kt-ch10-l3':    { type: 'B5',          inquiry: '誰會吃? 嫦娥能保得住嗎?',  canon: 'change.md#beat-3-bad-student' },
  'kt-ch10-l4':    { type: 'B4',          inquiry: '她會吞下去嗎? 還是給他?',  canon: 'change.md#beat-4-dilemma' },
  'kt-ch10-l5':    { type: 'B1',          inquiry: '接下來會發生什麼? 她會飛多遠?',  canon: 'change.md#beat-5-swallow' },
  'kt-ch10-l6':    { type: 'B2',          inquiry: '后羿會怎麼樣? 兩人還會再見嗎?',  canon: 'change.md#beat-6-moon' },
  'kt-ch10-l7':    { type: 'B6 open',     inquiry: '為什麼每年中秋想念? 你想念的人是誰?',  canon: 'change.md#beat-7-rabbit-mid-autumn' },
  // Ch11 后羿射日
  'kt-ch11-l1':    { type: 'B6',          inquiry: '10 個太陽出現 → 人們會怎樣?',  canon: 'houyi.md#beat-1-ten-suns' },
  'kt-ch11-l2':    { type: 'B3',          inquiry: '玉皇大帝給羿一張弓 → 他能擔下嗎?',  canon: 'houyi.md#beat-2-bow' },
  'kt-ch11-l3':    { type: 'B4',          inquiry: '羿走遍大地找太陽 → 第一個怎麼射?',  canon: 'houyi.md#beat-3-first-shot' },
  'kt-ch11-l4':    { type: 'B5',          inquiry: '9 個太陽射下 → 剩 1 個會留嗎?',  canon: 'houyi.md#beat-4-nine-down' },
  'kt-ch11-l5':    { type: 'B6',          inquiry: '留下太陽照大地 → 王看見嗎?',  canon: 'houyi.md#beat-5-mercy' },
  'kt-ch11-l6':    { type: 'B2',          inquiry: '王不再讓羿做神 → 羿會怎麼回應?',  canon: 'houyi.md#beat-6-king-cold' },
  'kt-ch11-l7':    { type: 'B6 open',     inquiry: '凡人羿與凡人嫦娥 → 命運如何 (銜接 Ch10)',  canon: 'houyi.md#beat-7-mortal' },
  // Ch12 牛郎織女
  'kt-ch12-l1':    { type: 'B3',          inquiry: '仙女為什麼下凡?',  canon: 'cowherd-weaver.md#beat-1-setup' },
  'kt-ch12-l2':    { type: 'B4',          inquiry: '他們會成為家人嗎?',  canon: 'cowherd-weaver.md#beat-2-sewing' },
  'kt-ch12-l3':    { type: 'B5',          inquiry: '仙女會被帶走嗎?',  canon: 'cowherd-weaver.md#beat-3-queen' },
  'kt-ch12-l4':    { type: 'B1',          inquiry: '還能再見嗎?',  canon: 'cowherd-weaver.md#beat-4-silver-river' },
  'kt-ch12-l5':    { type: 'B3',          inquiry: '牛說了什麼?',  canon: 'cowherd-weaver.md#beat-5-cow-lifts' },
  'kt-ch12-l6':    { type: 'B6',          inquiry: '鵲橋是什麼?',  canon: 'cowherd-weaver.md#beat-6-magpie-bridge' },
  'kt-ch12-l7':    { type: 'B6 open',     inquiry: '為什麼這天看星星?',  canon: 'cowherd-weaver.md#beat-7-qixi' },
  // Ch13 小紅帽 (Grimm 1812)
  'kt-ch13-l1':    { type: 'B6',          inquiry: '媽媽叮嚀去看奶奶 → 路上會發生什麼?',  canon: 'red-riding-hood.md#beat-1-setup' },
  'kt-ch13-l2':    { type: 'B3',          inquiry: '森林裡見大野狼 → 他會做什麼?',  canon: 'red-riding-hood.md#beat-2-wolf-appears' },
  'kt-ch13-l3':    { type: 'B5',          inquiry: '大野狼問路 → 她應該說嗎?',  canon: 'red-riding-hood.md#beat-3-wolf-asks-the-way' },
  'kt-ch13-l4':    { type: 'B1',          inquiry: '大野狼跑去奶奶家 → 奶奶怎麼樣了?',  canon: 'red-riding-hood.md#beat-4-wolf-runs-ahead' },
  'kt-ch13-l5':    { type: 'B3',          inquiry: '小紅帽到奶奶家 → 床上是奶奶嗎?',  canon: 'red-riding-hood.md#beat-5-wolf-in-bed' },
  'kt-ch13-l6':    { type: 'B4',          inquiry: '獵人來救 → 來得及嗎?',  canon: 'red-riding-hood.md#beat-6-huntsman-comes' },
  'kt-ch13-l7':    { type: 'B6 open',     inquiry: '救出奶奶 → 媽媽的話現在懂了',  canon: 'red-riding-hood.md#beat-7-rescue' },
  // Ch14 浦島太郎
  'kt-ch14-l1':    { type: 'B6',          inquiry: '烏龜會謝謝他嗎?',  canon: 'urashima.md#beat-1-setup' },
  'kt-ch14-l2':    { type: 'B3',          inquiry: '海底是什麼?',  canon: 'urashima.md#beat-2-down-to-sea' },
  'kt-ch14-l3':    { type: 'B4',          inquiry: '他能留下嗎?',  canon: 'urashima.md#beat-3-sea-palace' },
  'kt-ch14-l4':    { type: 'B5',          inquiry: '真的開心嗎?',  canon: 'urashima.md#beat-4-happy-days' },
  'kt-ch14-l5':    { type: 'B6',          inquiry: '寶盒裡是什麼?',  canon: 'urashima.md#beat-5-treasure-box' },
  'kt-ch14-l6':    { type: 'B2',          inquiry: '沒人認得他了 — 怎麼辦?',  canon: 'urashima.md#beat-6-back-on-land' },
  'kt-ch14-l7':    { type: 'B6 open',     inquiry: '變老了 — 時間紅利的代價是什麼?',  canon: 'urashima.md#beat-7-open-the-box' },
  // Ch15 國王的新衣 (Andersen 1837)
  'kt-ch15-l1':    { type: 'B6',          inquiry: '騙子能成功嗎? 國王會中招?',  canon: '(no canon ref yet)' },
  'kt-ch15-l2':    { type: 'B3',          inquiry: '大臣去看會說什麼? 會說真話?',  canon: '(no canon ref yet)' },
  'kt-ch15-l3':    { type: 'B5',          inquiry: '他敢說沒看到嗎? 該不該說?',  canon: '(no canon ref yet)' },
  'kt-ch15-l4':    { type: 'B4',          inquiry: '國王敢說沒看到嗎? 連他也撐不住?',  canon: '(no canon ref yet)' },
  'kt-ch15-l5':    { type: 'B6',          inquiry: '人民會說真話嗎? 還是跟著拍手?',  canon: '(no canon ref yet)' },
  'kt-ch15-l6':    { type: 'B2',          inquiry: '大家會怎樣? 還會繼續假裝嗎?',  canon: '(no canon ref yet)' },
  'kt-ch15-l7':    { type: 'B6 open',     inquiry: '為什麼他不停下來? 自尊比真相更難放下?',  canon: '(no canon ref yet)' },
  // Ch16 一寸法師
  'kt-ch16-l1':    { type: 'B6',          inquiry: '老夫婦求子 → 會生出什麼?',  canon: 'issun-boshi.md#beat-1-setup' },
  'kt-ch16-l2':    { type: 'B3',          inquiry: '拇指大小的男孩 → 他能做什麼?',  canon: '(no canon ref yet)' },
  'kt-ch16-l3':    { type: 'B4',          inquiry: '一寸帶碗船出發 → 路上會遇誰?',  canon: '(no canon ref yet)' },
  'kt-ch16-l4':    { type: 'B6',          inquiry: '京都當侍衛 → 公主出去散步',  canon: '(no canon ref yet)' },
  'kt-ch16-l5':    { type: 'B1',          inquiry: '鬼來抓公主 → 他能擋住嗎?',  canon: '(no canon ref yet)' },
  'kt-ch16-l6':    { type: 'B2',          inquiry: '一寸跳進鬼嘴用針刺 → 鬼會怎樣?',  canon: '(no canon ref yet)' },
  'kt-ch16-l7':    { type: 'B6 open',     inquiry: '打鼓變大人 → 成家那刻',  canon: '(no canon ref yet)' },
  // Ch17 鶴的報恩
  'kt-ch17-l1':    { type: 'B6',          inquiry: '鶴會回來嗎?',  canon: 'crane-gratitude.md#beat-1-setup' },
  'kt-ch17-l2':    { type: 'B3',          inquiry: '她是誰?',  canon: 'crane-gratitude.md#beat-2-young-woman' },
  'kt-ch17-l3':    { type: 'B5',          inquiry: '為什麼她要躲起來織?',  canon: 'crane-gratitude.md#beat-3-forbidden-room' },
  'kt-ch17-l4':    { type: 'B4',          inquiry: '老爺爺好奇了',  canon: 'crane-gratitude.md#beat-4-merchant' },
  'kt-ch17-l5':    { type: 'B1',          inquiry: '他會偷看嗎?',  canon: 'crane-gratitude.md#beat-5-urge-to-peek' },
  'kt-ch17-l6':    { type: 'B2',          inquiry: '她會留下嗎?',  canon: 'crane-gratitude.md#beat-6-truth-revealed' },
  'kt-ch17-l7':    { type: 'B6 open',     inquiry: '學到什麼?',  canon: 'crane-gratitude.md#beat-7-flies-away' },
  // Ch18 興夫和孬夫
  'kt-ch18-l1':    { type: 'B6',          inquiry: '興夫一個人怎麼活下去?',  canon: 'heungbu-nolbu.md#beat-1-setup' },
  'kt-ch18-l2':    { type: 'B3',          inquiry: '他怎麼養家?',  canon: 'heungbu-nolbu.md#beat-2-poor-home' },
  'kt-ch18-l3':    { type: 'B5',          inquiry: '興夫會救嗎?',  canon: 'heungbu-nolbu.md#beat-3-bird-falls' },
  'kt-ch18-l4':    { type: 'B4',          inquiry: '給興夫什麼禮物?',  canon: 'heungbu-nolbu.md#beat-4-bird-returns' },
  'kt-ch18-l5':    { type: 'B6',          inquiry: '哥哥孬夫聽到會怎樣?',  canon: 'heungbu-nolbu.md#beat-5-treasures' },
  'kt-ch18-l6':    { type: 'B2',          inquiry: '報應會來嗎?',  canon: 'heungbu-nolbu.md#beat-6-nolbu-copies' },
  'kt-ch18-l7':    { type: 'B6 open',     inquiry: '你會學興夫還是孬夫?',  canon: 'heungbu-nolbu.md#beat-7-shares' },
  // Ch19 Sang Kancil 鼠鹿
  'kt-ch19-l1':    { type: 'B6',          inquiry: '鼠鹿想吃對岸的水果 → 怎麼過河?',  canon: 'sang-kancil.md#beat-1-setup' },
  'kt-ch19-l2':    { type: 'B3',          inquiry: '河裡有很多鱷魚 → 該怎麼辦?',  canon: 'sang-kancil.md#beat-2-crocodiles' },
  'kt-ch19-l3':    { type: 'B5',          inquiry: '鼠鹿想到聰明的辦法 → 他會說什麼謊?',  canon: 'sang-kancil.md#beat-3-plan' },
  'kt-ch19-l4':    { type: 'B4',          inquiry: '對鱷魚說「國王要點鱷魚數量」 → 鱷魚相信嗎?',  canon: 'sang-kancil.md#beat-4-trick' },
  'kt-ch19-l5':    { type: 'B1',          inquiry: '鱷魚排隊讓他點 → 他跳過鱷魚背',  canon: 'sang-kancil.md#beat-5-jumping' },
  'kt-ch19-l6':    { type: 'B2',          inquiry: '到對岸吃水果 → 鱷魚發現被騙',  canon: 'sang-kancil.md#beat-6-reveal' },
  'kt-ch19-l7':    { type: 'B6 open',     inquiry: '鼠鹿學到什麼? 鱷魚學到什麼?',  canon: 'sang-kancil.md#beat-7-lessons' },
  // Ch20 蘿蔔大冒險
  'kt-ch20-l1':    { type: 'B6',          inquiry: '蘿蔔會變多大?拔得起來嗎?',  canon: '(no canon ref yet)' },
  'kt-ch20-l2':    { type: 'B3',          inquiry: '為什麼拔不動?要怎麼辦?',  canon: '(no canon ref yet)' },
  'kt-ch20-l3':    { type: 'B5',          inquiry: '兩個還不夠 — 還要叫誰?',  canon: '(no canon ref yet)' },
  'kt-ch20-l4':    { type: 'B4',          inquiry: '已經三個人了 — 還要幾個?',  canon: '(no canon ref yet)' },
  'kt-ch20-l5':    { type: 'B1',          inquiry: '連狗都來了 — 還不夠?',  canon: '(no canon ref yet)' },
  'kt-ch20-l6':    { type: 'B2',          inquiry: '它動了 — 還差什麼?',  canon: '(no canon ref yet)' },
  'kt-ch20-l7':    { type: 'B6 open',     inquiry: '連最小的都重要 — 你家最小的是誰?',  canon: '(no canon ref yet)' },
  // Ch21 Anansi 蜘蛛
  'kt-ch21-l1':    { type: 'B6',          inquiry: '蜘蛛能拿回所有故事嗎?',  canon: '(no canon ref yet)' },
  'kt-ch21-l2':    { type: 'B5',          inquiry: '蜘蛛這麼小, 抓得到嗎? 該答應嗎?',  canon: '(no canon ref yet)' },
  'kt-ch21-l3':    { type: 'B3',          inquiry: '倒水? 他要做什麼?',  canon: '(no canon ref yet)' },
  'kt-ch21-l4':    { type: 'B4',          inquiry: '大蛇會上當嗎? 智取怎麼贏?',  canon: '(no canon ref yet)' },
  'kt-ch21-l5':    { type: 'B1',          inquiry: '豹會逃走嗎? 蜘蛛接下來怎麼辦?',  canon: '(no canon ref yet)' },
  'kt-ch21-l6':    { type: 'B2',          inquiry: '天神真的會給嗎? 報酬是什麼?',  canon: '(no canon ref yet)' },
  'kt-ch21-l7':    { type: 'B6 open',     inquiry: '為什麼每個家都聽得到故事? 你家第一個故事是什麼?',  canon: '(no canon ref yet)' },
  // Ch22 孟母三遷
  'kt-ch22-l1':    { type: 'B6',          inquiry: '孟子小時候住墓地附近 → 他學了什麼?',  canon: '(no canon ref yet)' },
  'kt-ch22-l2':    { type: 'B3',          inquiry: '媽媽看見他玩埋葬遊戲 → 怎麼辦?',  canon: '(no canon ref yet)' },
  'kt-ch22-l3':    { type: 'B5',          inquiry: '搬到市場附近 → 孟子又學了什麼?',  canon: '(no canon ref yet)' },
  'kt-ch22-l4':    { type: 'B4',          inquiry: '媽媽看到他學叫賣 → 該再搬嗎?',  canon: '(no canon ref yet)' },
  'kt-ch22-l5':    { type: 'B6',          inquiry: '搬到學校旁 → 孟子開始讀書',  canon: '(no canon ref yet)' },
  'kt-ch22-l6':    { type: 'B2',          inquiry: '媽媽剪斷織布 → 為什麼?',  canon: '(no canon ref yet)' },
  'kt-ch22-l7':    { type: 'B6 open',     inquiry: '孟子成為大思想家 → 媽媽的選擇',  canon: '(no canon ref yet)' },
  // Ch23 司馬光砸缸
  'kt-ch23-l1':    { type: 'B6',          inquiry: '一群小孩在花園玩 — 危險將至?',  canon: '(no canon ref yet)' },
  'kt-ch23-l2':    { type: 'B3',          inquiry: '一個小孩爬大水缸 — 結果如何?',  canon: '(no canon ref yet)' },
  'kt-ch23-l3':    { type: 'B5',          inquiry: '小孩掉進水缸 — 大家會怎樣?',  canon: '(no canon ref yet)' },
  'kt-ch23-l4':    { type: 'B4',          inquiry: '其他孩子都跑走找大人 — 來得及嗎?',  canon: '(no canon ref yet)' },
  'kt-ch23-l5':    { type: 'B1',          inquiry: '司馬光留下沒跑 — 他想做什麼?',  canon: '(no canon ref yet)' },
  'kt-ch23-l6':    { type: 'B2',          inquiry: '撿石頭砸破水缸 — 水流出來',  canon: '(no canon ref yet)' },
  'kt-ch23-l7':    { type: 'B6 open',     inquiry: '救出小孩 — 急時用聰明',  canon: '(no canon ref yet)' },
  // Ch24 孔融讓梨
  'kt-ch24-l1':    { type: 'B6',          inquiry: '七個兄弟一盤梨 — 怎麼分? 誰會先選?',  canon: '(no canon ref yet)' },
  'kt-ch24-l2':    { type: 'B3',          inquiry: '大家都看著他 — 他會選哪個?',  canon: '(no canon ref yet)' },
  'kt-ch24-l3':    { type: 'B5',          inquiry: '大的 vs 小的 — 該選哪個?',  canon: '(no canon ref yet)' },
  'kt-ch24-l4':    { type: 'B4',          inquiry: '為什麼選小的? 父親想聽什麼答案?',  canon: '(no canon ref yet)' },
  'kt-ch24-l5':    { type: 'B1',          inquiry: '父親為什麼笑? 他在想什麼?',  canon: '(no canon ref yet)' },
  'kt-ch24-l6':    { type: 'B2',          inquiry: '還有什麼答案? 比剛剛更深嗎?',  canon: '(no canon ref yet)' },
  'kt-ch24-l7':    { type: 'B6 open',     inquiry: '你會學到什麼? 你家的小弟弟妹妹呢?',  canon: '(no canon ref yet)' },
  // Ch25 愚公移山
  'kt-ch25-l1':    { type: 'B6',          inquiry: '兩座大山每天擋路 → 他會做什麼?',  canon: '(no canon ref yet)' },
  'kt-ch25-l2':    { type: 'B3',          inquiry: '鄰居笑 → 真的可能嗎? 他會怎麼說服家人?',  canon: '(no canon ref yet)' },
  'kt-ch25-l3':    { type: 'B5',          inquiry: '大家來幫忙 → 該怎麼運? 一筐能搬多少?',  canon: '(no canon ref yet)' },
  'kt-ch25-l4':    { type: 'B4',          inquiry: '路人嘲笑 → 愚公會放棄? 還是繼續?',  canon: '(no canon ref yet)' },
  'kt-ch25-l5':    { type: 'B1',          inquiry: '他抬頭看小孩 → 他要怎麼回答?',  canon: '(no canon ref yet)' },
  'kt-ch25-l6':    { type: 'B2',          inquiry: '子子孫孫無窮匱 → 大家會繼續嗎? 天上有人看嗎?',  canon: '(no canon ref yet)' },
  'kt-ch25-l7':    { type: 'B6 open',     inquiry: '為什麼天神幫忙? 堅持的人會被看見嗎?',  canon: '(no canon ref yet)' },
  // Ch26 Archimedes Eureka
  'kt-ch26-l1':    { type: 'B6',          inquiry: '國王懷疑王冠不純金 → 找誰?',  canon: '(no canon ref yet)' },
  'kt-ch26-l2':    { type: 'B3',          inquiry: '阿基米德接到謎題 → 怎麼測?',  canon: '(no canon ref yet)' },
  'kt-ch26-l3':    { type: 'B5',          inquiry: '想了好幾天都想不到 → 累了去洗澡',  canon: '(no canon ref yet)' },
  'kt-ch26-l4':    { type: 'B4',          inquiry: '進浴缸水溢出來 → 他突然看到什麼?',  canon: '(no canon ref yet)' },
  'kt-ch26-l5':    { type: 'B1',          inquiry: '跳出來大喊 Eureka! → 為什麼?',  canon: '(no canon ref yet)' },
  'kt-ch26-l6':    { type: 'B2',          inquiry: '跑去找國王告訴秘密 → 王冠真假終於揭曉',  canon: '(no canon ref yet)' },
  'kt-ch26-l7':    { type: 'B6 open',     inquiry: '浮力法則改變科學 → 學到觀察',  canon: '(no canon ref yet)' },
};

function shortText(s, max = 60) {
  if (!s) return '';
  s = s.toString().replace(/\n/g, ' ').trim();
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function getAnswer(q) {
  if (q.type === 'narration') return '(auto-advance)';
  if (q.type === 'tap-pairs') {
    if (q.pairs) return q.pairs.map(p => `${p.left}=${p.right}`).join(' / ');
    return '(pairs)';
  }
  if (q.type === 'tap-tiles') return q.sentence || '(tiles)';
  if (q.type === 'listen-tf' || q.type === 'listen-tf-zh') {
    const idx = q.correctIndex ?? 0;
    return (q.options || ['Yes','No'])[idx];
  }
  if (Array.isArray(q.options)) {
    const idx = q.correctIndex ?? 0;
    const en = q.options[idx];
    const zh = q.optionsZh?.[idx];
    return zh ? `${en} (${zh})` : en;
  }
  return '(?)';
}

const rows = [];
const perChapter = {};

// v2.0.B.217: skip Ch0 per user '不用放到數據庫裡面'
for (let ch = 1; ch <= 26; ch++) {
  const fp = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(fp)) continue;
  const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  const chStats = { lessons: data.length, qCount: 0, timeS: 0, typeCounts: {}, lessonsOverBudget: 0 };
  for (const lesson of data) {
    let lessonTime = 0;
    for (const q of lesson.questions || []) {
      const t = q.type;
      const time = TIME_S[t] || 40;
      const stem = q.question || q.questionEn || q.sentence || '';
      const answer = getAnswer(q);
      rows.push({
        ch,
        lesson: `Ch${ch}-${lesson.lessonInChapter}`,
        qId: q.id,
        type: t,
        speaker: q.speaker || '-',
        stem: shortText(stem, 60),
        answer: shortText(answer, 50),
        timeS: time,
      });
      chStats.qCount++;
      chStats.timeS += time;
      lessonTime += time;
      chStats.typeCounts[t] = (chStats.typeCounts[t] || 0) + 1;
    }
    if (lessonTime > LESSON_BUDGET_S) chStats.lessonsOverBudget++;
  }
  perChapter[ch] = chStats;
}

// ─── Write full DB ────────────────────────────────────────────────────
const dbLines = [
  `# Pickup Content DB — full Q table`,
  '',
  `Auto-generated by \`tools/_content-db.cjs\` from \`public/lessons-ch{0..7}.json\`.`,
  '',
  `**Total**: ${rows.length} Q across ${Object.keys(perChapter).length} chapters.`,
  '',
  `| Ch | Lesson | Q ID | Type | Speaker | Stem / Sentence | Answer | Time (s) |`,
  `|----|--------|------|------|---------|-----------------|--------|----------|`,
];
for (const r of rows) {
  const esc = s => String(s).replace(/\|/g, '\\|');
  dbLines.push(`| ${r.ch} | ${r.lesson} | \`${r.qId}\` | ${r.type} | ${r.speaker} | ${esc(r.stem)} | ${esc(r.answer)} | ${r.timeS} |`);
}
fs.writeFileSync(path.join(ROOT, 'docs', 'content-db.md'), dbLines.join('\n') + '\n', 'utf-8');

// ─── Write summary ────────────────────────────────────────────────────
const totalQ = rows.length;
const totalTime = rows.reduce((s, r) => s + r.timeS, 0);
const avgPerCh = Math.round(totalQ / Object.keys(perChapter).length);
const tolerance = 0.25;
const lowBand = Math.round(avgPerCh * (1 - tolerance));
const highBand = Math.round(avgPerCh * (1 + tolerance));

const sumLines = [
  `# Pickup Content DB — per-chapter summary`,
  '',
  `**Generated**: ${new Date().toISOString()}`,
  '',
  `## Aggregate`,
  '',
  `- **Total Q**: ${totalQ}`,
  `- **Total play time est**: ${Math.round(totalTime / 60)} min`,
  `- **Avg Q per chapter**: ${avgPerCh}`,
  `- **25% tolerance band**: ${lowBand} ≤ Q ≤ ${highBand}`,
  '',
  `## Per chapter (with 25% tolerance check)`,
  '',
  `| Ch | Title | Lessons | Q count | Avg Q/lesson | Avg lesson time (5 min budget) | Variance from avg | Tolerance |`,
  `|----|-------|---------|---------|--------------|--------------------------------|-------------------|-----------|`,
];
for (let ch = 1; ch <= 26; ch++) {
  const s = perChapter[ch];
  if (!s) continue;
  const variance = Math.round((s.qCount - avgPerCh) / avgPerCh * 100);
  const inBand = s.qCount >= lowBand && s.qCount <= highBand;
  const avgLessonTime = Math.round(s.timeS / s.lessons);
  const sign = variance > 0 ? '+' : '';
  const budgetMark = avgLessonTime <= LESSON_BUDGET_S ? '✓' : `⚠️ ${avgLessonTime}s>${LESSON_BUDGET_S}s`;
  sumLines.push(`| ${ch} | ${CHAPTER_TITLES[ch] || ''} | ${s.lessons} | ${s.qCount} | ${(s.qCount / s.lessons).toFixed(1)} | ${avgLessonTime}s/lesson ${budgetMark} | ${sign}${variance}% | ${inBand ? '✓' : '⚠️ OUT'} |`);
}

sumLines.push('');
sumLines.push(`## Per-lesson hook ending (v6, emotional peak cut)`);
sumLines.push('');
sumLines.push(`Per docs/research/chapter-ending-hook-design.md framework B1-B6.`);
sumLines.push(`Hook coverage: Ch1 ✓ applied. Ch2-7 待 narrative-cut-analyst skill 重切.`);
sumLines.push('');
sumLines.push(`| Lesson ID | Story Beat | Hook Type | Inquiry Question | Canon Ref |`);
sumLines.push(`|-----------|------------|-----------|------------------|-----------|`);
for (let ch = 1; ch <= 26; ch++) {
  const fp = path.join(ROOT, 'public', `lessons-ch${ch}.json`);
  if (!fs.existsSync(fp)) continue;
  const data = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  for (const lesson of data) {
    const hook = HOOK_MAP[lesson.id];
    const hookType = hook?.type || '_(no hook yet)_';
    const inquiry = hook?.inquiry || '_-_';
    const canon = hook?.canon ? `[${hook.canon}](../docs/canon/${hook.canon})` : '_-_';
    sumLines.push(`| \`${lesson.id}\` | ${lesson.storyBeat || ''} | ${hookType} | ${inquiry} | ${canon} |`);
  }
}

sumLines.push('');
sumLines.push(`## Q type distribution per chapter`);
sumLines.push('');
const allTypes = new Set();
for (const s of Object.values(perChapter)) for (const t of Object.keys(s.typeCounts)) allTypes.add(t);
const typesArr = [...allTypes].sort();
sumLines.push(`| Ch | ${typesArr.join(' | ')} |`);
sumLines.push(`|----|${typesArr.map(()=>'---').join('|')}|`);
for (let ch = 1; ch <= 26; ch++) {
  const s = perChapter[ch];
  if (!s) continue;
  const cells = typesArr.map(t => s.typeCounts[t] || 0);
  sumLines.push(`| ${ch} | ${cells.join(' | ')} |`);
}

fs.writeFileSync(path.join(ROOT, 'docs', 'content-db-summary.md'), sumLines.join('\n') + '\n', 'utf-8');

console.log(`OK   docs/content-db.md (${rows.length} rows)`);
console.log(`OK   docs/content-db-summary.md`);
console.log(`\n[CURRENT STATE]`);
console.log(`Total Q: ${totalQ}, total time: ${Math.round(totalTime/60)} min`);
console.log(`Avg per chapter: ${avgPerCh}, 25% tolerance band: ${lowBand}-${highBand}`);
console.log(`\nPer chapter (Ch0 excluded, 5 min/lesson budget):`);
for (let ch = 1; ch <= 26; ch++) {
  const s = perChapter[ch];
  if (!s) continue;
  const variance = Math.round((s.qCount - avgPerCh) / avgPerCh * 100);
  const inBand = s.qCount >= lowBand && s.qCount <= highBand;
  const avgT = Math.round(s.timeS / s.lessons);
  const budgetMark = avgT <= LESSON_BUDGET_S ? '✓' : `⚠️ ${avgT}s>300s`;
  console.log(`  Ch${ch} ${CHAPTER_TITLES[ch] || ''}: ${s.qCount} Q (${(s.qCount/s.lessons).toFixed(1)}/lesson, ${avgT}s avg ${budgetMark}), variance ${variance > 0 ? '+' : ''}${variance}% ${inBand ? '✓' : '⚠️ OUT'}`);
}
