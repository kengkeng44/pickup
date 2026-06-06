/**
 * v2.0.B.221 — Per-lesson hook metadata (emotional peak cut framework).
 *
 * Source-of-truth mirror: tools/_content-db.cjs HOOK_MAP.
 * Theory: docs/research/chapter-ending-hook-design.md.
 * Skill: ~/.claude/skills/narrative-cut-analyst/SKILL.md.
 *
 * Hook framework (B1-B6):
 *   B1 物理懸念 / B2 情緒翻轉 / B3 資訊缺口
 *   B4 期待加速 / B5 道德兩難 / B6 預言種子
 *
 * Used by:
 *   - LessonScene._showLessonStats() — render inquiry microcopy above Continue
 *   - PostHog LESSON_COMPLETE event — hook_type tag for A/B analytics
 */
export interface LessonHook {
  type: string;        // B1-B6 (may be compound like 'B4+B3')
  inquiry: string;     // inquiry-terminating question (zh)
  inquiryEn?: string;  // optional english version (currently zh-only per A2 audience)
}

export const LESSON_HOOKS: Record<string, LessonHook> = {
  // Ch1 桃太郎 (v6 emotional peak cut applied B.220)
  'kt-ch1-l1': { type: 'B3',        inquiry: '那大紅色的是什麼?' },
  'kt-ch1-l2': { type: 'B4+B3',     inquiry: '桃子裡是什麼?' },
  'kt-ch1-l3': { type: 'B5+B2',     inquiry: '父母會讓他走嗎?' },
  'kt-ch1-l4': { type: 'B4',        inquiry: '狗會跟他?還有誰?' },
  'kt-ch1-l5': { type: 'B6+B1',     inquiry: '島上為何安靜?是埋伏?' },
  'kt-ch1-l6': { type: 'B2',        inquiry: '鬼王怎知他名字?' },
  'kt-ch1-l7': { type: 'B6 open',   inquiry: '口袋還留一顆糰子 — 還有下一段?' },
  // Ch2 醜小鴨 (per docs/canon/ugly-duckling-cuts.md, B.222 skill 試跑)
  'kt-ch2-l1': { type: 'B3',        inquiry: '那大蛋裡是什麼?' },
  'kt-ch2-l2': { type: 'B2',        inquiry: '他是醜?還是只是不一樣?' },
  'kt-ch2-l3': { type: 'B2',        inquiry: '媽媽會回來保護他嗎?' },
  'kt-ch2-l4': { type: 'B1',        inquiry: '他會被打中?還能逃多遠?' },
  'kt-ch2-l5': { type: 'B5',        inquiry: '他要去哪?外面更冷' },
  'kt-ch2-l6': { type: 'B6',        inquiry: '春天會更好?還是又一次?' },
  'kt-ch2-l7': { type: 'B2 big',    inquiry: '原來他不是醜小鴨 — 還有什麼?' },
  // Ch3 龜兔賽跑 (per docs/canon/tortoise-hare-cuts.md, agent B.223)
  'kt-ch3-l1': { type: 'B2',        inquiry: '烏龜怎敢挑戰?他想做什麼?' },
  'kt-ch3-l2': { type: 'B3',        inquiry: '差距這麼大,烏龜能追嗎?' },
  'kt-ch3-l3': { type: 'B5',        inquiry: '兔子真的要睡?會醒嗎?' },
  'kt-ch3-l4': { type: 'B6',        inquiry: '兔子要醒了嗎?烏龜還剩多遠?' },
  'kt-ch3-l5': { type: 'B5',        inquiry: '沒人叫醒兔子嗎?該不該叫?' },
  'kt-ch3-l6': { type: 'B2',        inquiry: '兔子來得及嗎?還是輸定了?' },
  'kt-ch3-l7': { type: 'B2 big',    inquiry: '慢而穩之外 — 兔子學到了嗎?' },
  // Ch4 駱駝為什麼有駝峰 (per docs/canon/camel-hump-cuts.md)
  'kt-ch4-l1': { type: 'B3',        inquiry: '"Humph" 是什麼意思?他在躲什麼?' },
  'kt-ch4-l2': { type: 'B6',        inquiry: '他們要告狀嗎?Man 會怎麼處理?' },
  'kt-ch4-l3': { type: 'B4',        inquiry: '沙塵裡是什麼?是誰來了?' },
  'kt-ch4-l4': { type: 'B5',        inquiry: 'Djinn 會幫誰?會罰駱駝嗎?' },
  'kt-ch4-l5': { type: 'B6',        inquiry: '是什麼魔法?駱駝會變什麼?' },
  'kt-ch4-l6': { type: 'B1',        inquiry: '背要變成什麼?還會停嗎?' },
  'kt-ch4-l7': { type: 'B2 big',    inquiry: '自己背的包袱 — user 在背什麼?' },
  // Ch5 Baba Yaga 雞腳屋 (per docs/canon/baba-yaga-cuts.md)
  'kt-ch5-l1': { type: 'B6',        inquiry: '沒火會怎樣?誰要去拿火?' },
  'kt-ch5-l2': { type: 'B3',        inquiry: 'Baba Yaga 是誰?為什麼大家都知道?' },
  'kt-ch5-l3': { type: 'B6',        inquiry: '三個騎士是誰?夜裡會出什麼事?' },
  'kt-ch5-l4': { type: 'B1',        inquiry: '屋子會動?她要走進去嗎?' },
  'kt-ch5-l5': { type: 'B2',        inquiry: '巫婆會吃她?還會放她走?' },
  'kt-ch5-l6': { type: 'B3',        inquiry: '娃娃能做什麼?它會動嗎?' },
  'kt-ch5-l7': { type: 'B2 big',    inquiry: '口袋裡的小東西 — user 自己的是什麼?' },
  // Ch6 六隻天鵝 (per docs/canon/six-swans-cuts.md)
  'kt-ch6-l1': { type: 'B6',        inquiry: '沒了母親,誰會來填這個位置?' },
  'kt-ch6-l2': { type: 'B3',        inquiry: '為什麼是六件?六件白衣是給誰?' },
  'kt-ch6-l3': { type: 'B1',        inquiry: '男孩去哪了?還能變回來嗎?' },
  'kt-ch6-l4': { type: 'B5',        inquiry: '六年不能說話,她能撐下去嗎?' },
  'kt-ch6-l5': { type: 'B6',        inquiry: '王子的母親會接受她嗎?六年沒到呢?' },
  'kt-ch6-l6': { type: 'B5',        inquiry: '她要說話救自己嗎?還是繼續織?' },
  'kt-ch6-l7': { type: 'B2 big',    inquiry: '說出口的那刻 — 你忍著沒說的是什麼?' },
  // Ch7 葉限 (per docs/canon/yexian-cuts.md)
  'kt-ch7-l1': { type: 'B6',        inquiry: '後母會一直這樣對她嗎?' },
  'kt-ch7-l2': { type: 'B3',        inquiry: '這條魚不只是魚?它是誰?' },
  'kt-ch7-l3': { type: 'B1',        inquiry: '葉限會知道嗎?她怎麼承受?' },
  'kt-ch7-l4': { type: 'B3',        inquiry: '骨頭能給她什麼?她要問什麼?' },
  'kt-ch7-l5': { type: 'B2',        inquiry: '她會被認出嗎?誰已經盯著她?' },
  'kt-ch7-l6': { type: 'B1',        inquiry: '鞋掉了會落到誰手上?' },
  'kt-ch7-l7': { type: 'B2 big',    inquiry: '失去的支持回來了 — 你的呢?' },
  // Ch8 三隻小豬 (Three Little Pigs, URL pipeline ship 2026-06-06, B.234+)
  'kt-ch8-l1': { type: 'B6',        inquiry: '狼真的會來?三個都安全?' },
  'kt-ch8-l2': { type: 'B1',        inquiry: '草屋能撐多久?今晚就倒嗎?' },
  'kt-ch8-l3': { type: 'B4',        inquiry: '是誰來了?是狼嗎?' },
  'kt-ch8-l4': { type: 'B3',        inquiry: '第一隻會回答?狼接下來做什麼?' },
  'kt-ch8-l5': { type: 'B2',        inquiry: '木屋能擋住嗎?還是也會倒?' },
  'kt-ch8-l6': { type: 'B6',        inquiry: '磚屋能撐?還是狼也吹得倒?' },
  'kt-ch8-l7': { type: 'B6 open',   inquiry: '安全了嗎?狼還在森林裡 — 還會回來?' },
  // Ch9 灰姑娘 (Cinderella, Perrault 1697 public domain, URL pipeline ship 2026-06-06, B.236+)
  // Cross-cultural pair with Ch7 葉限 (Tang Chinese Cinderella). No Disney 1950 elements.
  'kt-ch9-l1': { type: 'B6',        inquiry: '後母會偏心嗎? 兩個姊姊怎麼對她?' },
  'kt-ch9-l2': { type: 'B3',        inquiry: '她哭給誰聽? 有人會看見嗎?' },
  'kt-ch9-l3': { type: 'B5',        inquiry: '她也可以去嗎? 她該求嗎?' },
  'kt-ch9-l4': { type: 'B4',        inquiry: '仙女教母要做什麼? 接下來呢?' },
  'kt-ch9-l5': { type: 'B6',        inquiry: '12 點限制是什麼? 過了會怎樣?' },
  'kt-ch9-l6': { type: 'B2',        inquiry: '鞋掉了 — 王子會找她嗎?' },
  'kt-ch9-l7': { type: 'B6 open',   inquiry: '仙女教母在哪? 善良才是真正的魔法?' },
  // Ch10 嫦娥奔月 (Chang'e Flies to the Moon, 中華神話 public domain, URL pipeline
  // ship 2026-06-07, B.238+). Cross-cultural pair with Ch9 灰姑娘 (西方 vs 東方
  // female-protagonist mirror — 西方公主等仙女找王子, 東方公主吞藥讓愛人留在地上).
  // 自創 A2 句式, 不引 Disney 2020 *Over the Moon* / 特定教科書譯文.
  'kt-ch10-l1': { type: 'B6',       inquiry: '為什麼她要嫁給英雄? 神會盯著他們嗎?' },
  'kt-ch10-l2': { type: 'B3',       inquiry: '仙藥是什麼? 為什麼只有一個?' },
  'kt-ch10-l3': { type: 'B5',       inquiry: '誰會吃? 嫦娥能保得住嗎?' },
  'kt-ch10-l4': { type: 'B4',       inquiry: '她會吞下去嗎? 還是給他?' },
  'kt-ch10-l5': { type: 'B1',       inquiry: '接下來會發生什麼? 她會飛多遠?' },
  'kt-ch10-l6': { type: 'B2',       inquiry: '后羿會怎麼樣? 兩人還會再見嗎?' },
  'kt-ch10-l7': { type: 'B6 open',  inquiry: '為什麼每年中秋想念? 你想念的人是誰?' },
  // Ch11 后羿射日 (Hou Yi Shoots the Suns, 中華神話 public domain, URL pipeline
  // ship 2026-06-07, B.250+). Cross-POV pair with Ch10 嫦娥奔月 (same myth,
  // female POV). 自創 A2 句式, 不引特定譯本. 'shot down' OK / 'killed' 禁,
  // 'gave up' OK / 'sacrificed' 禁.
  'kt-ch11-l1': { type: 'B6',       inquiry: '10 個太陽出現 → 人們會怎樣?' },
  'kt-ch11-l2': { type: 'B3',       inquiry: '玉皇大帝給羿一張弓 → 他能擔下嗎?' },
  'kt-ch11-l3': { type: 'B4',       inquiry: '羿走遍大地找太陽 → 第一個怎麼射?' },
  'kt-ch11-l4': { type: 'B5',       inquiry: '9 個太陽射下 → 剩 1 個會留嗎?' },
  'kt-ch11-l5': { type: 'B6',       inquiry: '留下太陽照大地 → 王看見嗎?' },
  'kt-ch11-l6': { type: 'B2',       inquiry: '王不再讓羿做神 → 羿會怎麼回應?' },
  'kt-ch11-l7': { type: 'B6 open',  inquiry: '凡人羿與凡人嫦娥 → 命運如何 (銜接 Ch10)' },
  // Ch12 牛郎織女 (Cowherd & Weaver, 中華民間口傳 public domain, URL pipeline
  // ship 2026-06-07, B.240+). 七夕節由來. Tri-cultural reunion theme set
  // with Ch7 葉限 (Tang Cinderella) + Ch9 Cinderella (Perrault 1697).
  // 兒童 ELT pivot: 'family separation + once-a-year reunion' framing,
  // NO romance lexis ('wife/husband' → 'family', 'fall in love' → 'become
  // close', 'fairy' → 'magic lady'). 不引特定譯本/改編.
  'kt-ch12-l1': { type: 'B3',       inquiry: '仙女為什麼下凡?' },
  'kt-ch12-l2': { type: 'B4',       inquiry: '他們會成為家人嗎?' },
  'kt-ch12-l3': { type: 'B5',       inquiry: '仙女會被帶走嗎?' },
  'kt-ch12-l4': { type: 'B1',       inquiry: '還能再見嗎?' },
  'kt-ch12-l5': { type: 'B3',       inquiry: '牛說了什麼?' },
  'kt-ch12-l6': { type: 'B6',       inquiry: '鵲橋是什麼?' },
  'kt-ch12-l7': { type: 'B6 open',  inquiry: '為什麼這天看星星?' },
  // Ch14 浦島太郎 (Urashima Taro, Japanese folk public domain, URL pipeline
  // ship 2026-06-07, B.260+). Japanese folk pair with Ch1 桃太郎 (兩日本民間
  // 口傳, 公有領域). 自創 A2 句式, 不引特定譯本. 'a very old man with a long
  // beard' 取代 'died' (原典是 transformation 不是死亡).
  'kt-ch14-l1': { type: 'B6',       inquiry: '烏龜會謝謝他嗎?' },
  'kt-ch14-l2': { type: 'B3',       inquiry: '海底是什麼?' },
  'kt-ch14-l3': { type: 'B4',       inquiry: '他能留下嗎?' },
  'kt-ch14-l4': { type: 'B5',       inquiry: '真的開心嗎?' },
  'kt-ch14-l5': { type: 'B6',       inquiry: '寶盒裡是什麼?' },
  'kt-ch14-l6': { type: 'B2',       inquiry: '沒人認得他了 — 怎麼辦?' },
  'kt-ch14-l7': { type: 'B6 open',  inquiry: '變老了 — 時間紅利的代價是什麼?' },
  // Ch15 國王的新衣 (The Emperor's New Clothes, Andersen 1837 public domain,
  // URL pipeline ship 2026-06-07, B.262+). 智取主題 (peer pressure + truth),
  // A2 兒童 friendly, 0 風險. 自創 A2 句式, 不引特定譯本.
  // 'naked' → 'wearing nothing', 'stupid' → 'not smart enough'.
  'kt-ch15-l1': { type: 'B6',       inquiry: '騙子能成功嗎? 國王會中招?' },
  'kt-ch15-l2': { type: 'B3',       inquiry: '大臣去看會說什麼? 會說真話?' },
  'kt-ch15-l3': { type: 'B5',       inquiry: '他敢說沒看到嗎? 該不該說?' },
  'kt-ch15-l4': { type: 'B4',       inquiry: '國王敢說沒看到嗎? 連他也撐不住?' },
  'kt-ch15-l5': { type: 'B6',       inquiry: '人民會說真話嗎? 還是跟著拍手?' },
  'kt-ch15-l6': { type: 'B2',       inquiry: '大家會怎樣? 還會繼續假裝嗎?' },
  'kt-ch15-l7': { type: 'B6 open',  inquiry: '為什麼他不停下來? 自尊比真相更難放下?' },
  // Ch13 小紅帽 (Little Red Riding Hood, Grimm KHM 26 1812 first edition, public
  // domain, URL pipeline ship 2026-06-07, B.242+). Theme: 媽媽說別跟陌生人
  // 講話 + huntsman rescue. 3rd 兒童安全教育 trio with Ch1 桃太郎 + Ch6
  // Baba Yaga. NO Perrault 1697 / Disney / Hoodwinked / Sondheim / Dahl
  // elements. A2 兒童化: 'ate' → 'took into stomach'; 'cut open' → 'opened
  // up the wolf and pulled them out'; 'killed' → 'gave up' / 'never came back'.
  'kt-ch13-l1': { type: 'B6',       inquiry: '媽媽叮嚀去看奶奶 → 路上會發生什麼?' },
  'kt-ch13-l2': { type: 'B3',       inquiry: '森林裡見大野狼 → 他會做什麼?' },
  'kt-ch13-l3': { type: 'B5',       inquiry: '大野狼問路 → 她應該說嗎?' },
  'kt-ch13-l4': { type: 'B1',       inquiry: '大野狼跑去奶奶家 → 奶奶怎麼樣了?' },
  'kt-ch13-l5': { type: 'B3',       inquiry: '小紅帽到奶奶家 → 床上是奶奶嗎?' },
  'kt-ch13-l6': { type: 'B4',       inquiry: '獵人來救 → 來得及嗎?' },
  'kt-ch13-l7': { type: 'B6 open',  inquiry: '救出奶奶 → 媽媽的話現在懂了' },
  // Ch16 一寸法師 (Issun-bōshi, Japanese folk public domain, 室町時代 origin,
  // URL pipeline ship 2026-06-07, B.264+). Completes 日本民間三部曲 with
  // Ch1 桃太郎 + Ch14 浦島太郎 (三個都公有領域口傳). 'tiny boy' (not 'dwarf'),
  // 'demon' (not 'oni'), 'gave up and ran away' (not 'killed'), 'big enough
  // now to start a home' / 'they became family' (not 'married' — child-
  // friendly framing). 自創 A2 句式, 不引特定譯本/繪本.
  'kt-ch16-l1': { type: 'B6',       inquiry: '老夫婦求子 → 會生出什麼?' },
  'kt-ch16-l2': { type: 'B3',       inquiry: '拇指大小的男孩 → 他能做什麼?' },
  'kt-ch16-l3': { type: 'B4',       inquiry: '一寸帶碗船出發 → 路上會遇誰?' },
  'kt-ch16-l4': { type: 'B6',       inquiry: '京都當侍衛 → 公主出去散步' },
  'kt-ch16-l5': { type: 'B1',       inquiry: '鬼來抓公主 → 他能擋住嗎?' },
  'kt-ch16-l6': { type: 'B2',       inquiry: '一寸跳進鬼嘴用針刺 → 鬼會怎樣?' },
  'kt-ch16-l7': { type: 'B6 open',  inquiry: '打鼓變大人 → 成家那刻' },
  // Ch17 鶴的報恩 (Tsuru no Ongaeshi, Japanese folk public domain, URL pipeline
  // ship 2026-06-07, B.266+). 4th Japanese folk completing 日本民間四部曲 with
  // Ch1 桃太郎 + Ch14 浦島太郎 + Ch16 一寸法師. Theme: 不能偷看的房間 — 善意
  // 有回報, 但好奇打破信任. 自創 A2 句式, 不引特定譯本/繪本/動畫. 'wife' →
  // companion / family framing, '拔羽毛' → 'pulled her own feathers' (non-
  // blood), 鶴飛走 → 'flew away to the sky' (NOT 'died').
  'kt-ch17-l1': { type: 'B6',       inquiry: '鶴會回來嗎?' },
  'kt-ch17-l2': { type: 'B3',       inquiry: '她是誰?' },
  'kt-ch17-l3': { type: 'B5',       inquiry: '為什麼她要躲起來織?' },
  'kt-ch17-l4': { type: 'B4',       inquiry: '老爺爺好奇了' },
  'kt-ch17-l5': { type: 'B1',       inquiry: '他會偷看嗎?' },
  'kt-ch17-l6': { type: 'B2',       inquiry: '她會留下嗎?' },
  'kt-ch17-l7': { type: 'B6 open',  inquiry: '學到什麼?' },
  // Ch18 興夫和孬夫 (Heungbu and Nolbu, Korean folk public domain, URL pipeline
  // ship 2026-06-07, B.264+). Theme: 善有善報 — 兄弟之間的選擇. 東亞民間 trio
  // with Ch1 桃太郎 + Ch14 浦島太郎. 自創 A2 句式, 不引繪本/特定譯本.
  // 'parents were gone' (not 'died'); 'kicked out' OK; 孬夫報應 = 'all his
  // treasures turned to dust' (典型民間 transformation, no blood).
  'kt-ch18-l1': { type: 'B6',       inquiry: '興夫一個人怎麼活下去?' },
  'kt-ch18-l2': { type: 'B3',       inquiry: '他怎麼養家?' },
  'kt-ch18-l3': { type: 'B5',       inquiry: '興夫會救嗎?' },
  'kt-ch18-l4': { type: 'B4',       inquiry: '給興夫什麼禮物?' },
  'kt-ch18-l5': { type: 'B6',       inquiry: '哥哥孬夫聽到會怎樣?' },
  'kt-ch18-l6': { type: 'B2',       inquiry: '報應會來嗎?' },
  'kt-ch18-l7': { type: 'B6 open',  inquiry: '你會學興夫還是孬夫?' },
  // Ch19 Sang Kancil 鼠鹿 (Maritime SEA oral folk public domain — Malaysia /
  // Indonesia / Brunei, URL pipeline ship 2026-06-07, B.266+). Trickster
  // cycle, kin with Anansi / Br'er Rabbit / Reynard. Theme: small body,
  // smart head. Animal wisdom fable cluster with Ch3 龜兔賽跑 / Ch4 駱駝駝峰.
  // 自創 A2 句式, 不引繪本/教科書/動畫. 'trick' OK (智取主題核心), 'lie' OK,
  // crocodile 'opened mouths in anger' 不 'attacked'.
  'kt-ch19-l1': { type: 'B6',       inquiry: '鼠鹿想吃對岸的水果 → 怎麼過河?' },
  'kt-ch19-l2': { type: 'B3',       inquiry: '河裡有很多鱷魚 → 該怎麼辦?' },
  'kt-ch19-l3': { type: 'B5',       inquiry: '鼠鹿想到聰明的辦法 → 他會說什麼謊?' },
  'kt-ch19-l4': { type: 'B4',       inquiry: '對鱷魚說「國王要點鱷魚數量」 → 鱷魚相信嗎?' },
  'kt-ch19-l5': { type: 'B1',       inquiry: '鱷魚排隊讓他點 → 他跳過鱷魚背' },
  'kt-ch19-l6': { type: 'B2',       inquiry: '到對岸吃水果 → 鱷魚發現被騙' },
  'kt-ch19-l7': { type: 'B6 open',  inquiry: '鼠鹿學到什麼? 鱷魚學到什麼?' },
  // Ch20 蘿蔔大冒險 (The Enormous Turnip / Repka, Russian folk public domain,
  // URL pipeline ship 2026-06-07, B.280+). 配 Ch5 Baba Yaga 作 2 個俄羅斯民間
  // portfolio pair (dark sparse vs light cumulative). Cumulative structure 7
  // 角色加入 — 每 lesson 加一個 puller (爺爺 → 奶奶 → 孫女 → 狗 → 貓 → 老鼠).
  // 0 衝突 / 0 暴力 / 100% 溫馨家庭. 自創 A2 句式, 不引特定譯本/繪本. Refrain
  // '[X] pulled. The turnip would not move.' 對 A2 兒童 memorization 最友善
  // (重複句型是教學工具).
  'kt-ch20-l1': { type: 'B6',       inquiry: '蘿蔔會變多大?拔得起來嗎?' },
  'kt-ch20-l2': { type: 'B3',       inquiry: '為什麼拔不動?要怎麼辦?' },
  'kt-ch20-l3': { type: 'B5',       inquiry: '兩個還不夠 — 還要叫誰?' },
  'kt-ch20-l4': { type: 'B4',       inquiry: '已經三個人了 — 還要幾個?' },
  'kt-ch20-l5': { type: 'B1',       inquiry: '連狗都來了 — 還不夠?' },
  'kt-ch20-l6': { type: 'B2',       inquiry: '它動了 — 還差什麼?' },
  'kt-ch20-l7': { type: 'B6 open',  inquiry: '連最小的都重要 — 你家最小的是誰?' },
  // Ch21 Anansi the Spider (西非民間 Akan/Ashanti 口傳, public domain, URL
  // pipeline ship 2026-06-07, B.270+). Trickster cycle pair with Ch19 Sang
  // Kancil (kin with Br'er Rabbit / Reynard). Theme: 小蜘蛛智取拿回世界
  // 所有故事 + 起源神話 (為什麼每個家都聽得到故事). 自創 A2 句式, 不引
  // Gerald McDermott 1972 picture book / Disney / 任何 modern adaptation.
  // 'gave up and went home' 不 'killed', 'caught safely' 不 'trapped'.
  // 文化分佈 bear band 'Other (Africa)' coverage.
  'kt-ch21-l1': { type: 'B6',       inquiry: '蜘蛛能拿回所有故事嗎?' },
  'kt-ch21-l2': { type: 'B5',       inquiry: '蜘蛛這麼小, 抓得到嗎? 該答應嗎?' },
  'kt-ch21-l3': { type: 'B3',       inquiry: '倒水? 他要做什麼?' },
  'kt-ch21-l4': { type: 'B4',       inquiry: '大蛇會上當嗎? 智取怎麼贏?' },
  'kt-ch21-l5': { type: 'B1',       inquiry: '豹會逃走嗎? 蜘蛛接下來怎麼辦?' },
  'kt-ch21-l6': { type: 'B2',       inquiry: '天神真的會給嗎? 報酬是什麼?' },
  'kt-ch21-l7': { type: 'B6 open',  inquiry: '為什麼每個家都聽得到故事? 你家第一個故事是什麼?' },
  // Ch22 孟母三遷 (Mencius's Mother Moves Three Times, 中華歷史民間 公有領域,
  // URL pipeline ship 2026-06-07, B.272+). 孟子 372-289 BCE 歷史人物 +
  // 民俗 (最早見漢代《列女傳》劉向 ~16 BCE). 海外華人家長 heritage anchor.
  // 主題: 環境塑人 + 媽媽用行動教持之以恆. 0 死亡 explicit.
  'kt-ch22-l1': { type: 'B6',       inquiry: '孟子小時候住墓地附近 → 他學了什麼?' },
  'kt-ch22-l2': { type: 'B3',       inquiry: '媽媽看見他玩埋葬遊戲 → 怎麼辦?' },
  'kt-ch22-l3': { type: 'B5',       inquiry: '搬到市場附近 → 孟子又學了什麼?' },
  'kt-ch22-l4': { type: 'B4',       inquiry: '媽媽看到他學叫賣 → 該再搬嗎?' },
  'kt-ch22-l5': { type: 'B6',       inquiry: '搬到學校旁 → 孟子開始讀書' },
  'kt-ch22-l6': { type: 'B2',       inquiry: '媽媽剪斷織布 → 為什麼?' },
  'kt-ch22-l7': { type: 'B6 open',  inquiry: '孟子成為大思想家 → 媽媽的選擇' },
  // Ch23 司馬光砸缸 (Sima Guang Breaks the Jar, 中華歷史民間 公有領域 >900 年,
  // URL pipeline ship 2026-06-07, B.280+). 司馬光 1019-1086 CE 歷史人物 +
  // 砸缸救人民間傳說 (Song Shi 1345 CE 收錄). 急時用聰明救人.
  'kt-ch23-l1': { type: 'B6',       inquiry: '一群小孩在花園玩 — 危險將至?' },
  'kt-ch23-l2': { type: 'B3',       inquiry: '一個小孩爬大水缸 — 結果如何?' },
  'kt-ch23-l3': { type: 'B5',       inquiry: '小孩掉進水缸 — 大家會怎樣?' },
  'kt-ch23-l4': { type: 'B4',       inquiry: '其他孩子都跑走找大人 — 來得及嗎?' },
  'kt-ch23-l5': { type: 'B1',       inquiry: '司馬光留下沒跑 — 他想做什麼?' },
  'kt-ch23-l6': { type: 'B2',       inquiry: '撿石頭砸破水缸 — 水流出來' },
  'kt-ch23-l7': { type: 'B6 open',  inquiry: '救出小孩 — 急時用聰明' },
  // Ch24 孔融讓梨 (Kong Rong Shares the Pear, 中華歷史民間 公有領域 >1800 年,
  // URL pipeline ship 2026-06-07, B.290+). 孔融 153-208 CE 歷史人物 + 讓梨
  // 民間傳說 (Pei Songzhi 5th-c. citation of《孔融別傳》). 兒童核心情感教育.
  'kt-ch24-l1': { type: 'B6',       inquiry: '七個兄弟一盤梨 — 怎麼分? 誰會先選?' },
  'kt-ch24-l2': { type: 'B3',       inquiry: '大家都看著他 — 他會選哪個?' },
  'kt-ch24-l3': { type: 'B5',       inquiry: '大的 vs 小的 — 該選哪個?' },
  'kt-ch24-l4': { type: 'B4',       inquiry: '為什麼選小的? 父親想聽什麼答案?' },
  'kt-ch24-l5': { type: 'B1',       inquiry: '父親為什麼笑? 他在想什麼?' },
  'kt-ch24-l6': { type: 'B2',       inquiry: '還有什麼答案? 比剛剛更深嗎?' },
  'kt-ch24-l7': { type: 'B6 open',  inquiry: '你會學到什麼? 你家的小弟弟妹妹呢?' },
  // Ch25 愚公移山 (Yu Gong Moves the Mountains, 列子《湯問》春秋戰國 classical
  // Chinese parable 公有領域 >2000 年, URL pipeline ship 2026-06-07, B.290+).
  // 主題: 堅持 / 世代接力 / 信念. 海外華人家長 heritage anchor.
  'kt-ch25-l1': { type: 'B6',       inquiry: '兩座大山每天擋路 → 他會做什麼?' },
  'kt-ch25-l2': { type: 'B3',       inquiry: '鄰居笑 → 真的可能嗎? 他會怎麼說服家人?' },
  'kt-ch25-l3': { type: 'B5',       inquiry: '大家來幫忙 → 該怎麼運? 一筐能搬多少?' },
  'kt-ch25-l4': { type: 'B4',       inquiry: '路人嘲笑 → 愚公會放棄? 還是繼續?' },
  'kt-ch25-l5': { type: 'B1',       inquiry: '他抬頭看小孩 → 他要怎麼回答?' },
  'kt-ch25-l6': { type: 'B2',       inquiry: '子子孫孫無窮匱 → 大家會繼續嗎? 天上有人看嗎?' },
  'kt-ch25-l7': { type: 'B6 open',  inquiry: '為什麼天神幫忙? 堅持的人會被看見嗎?' },
  // Ch26 Archimedes' Eureka Moment (古希臘 Vitruvius c. 25 BCE, anecdote about
  // Archimedes 287-212 BCE, 公有領域 >2200 年). URL pipeline ship 2026-06-07,
  // B.300+. 科學啟蒙 + 觀察的力量 — 兒童最愛的「發現」moment. 配 Ch3 龜兔 +
  // Ch4 駱駝 同 Greek/classical 文化分佈 band. 'Eureka' 保留 (歷史經典詞).
  // 自創 A2 句式, 不引 Vitruvius 任何特定譯本 / 現代繪本 / 動畫.
  'kt-ch26-l1': { type: 'B6',       inquiry: '國王懷疑王冠不純金 → 找誰?' },
  'kt-ch26-l2': { type: 'B3',       inquiry: '阿基米德接到謎題 → 怎麼測?' },
  'kt-ch26-l3': { type: 'B5',       inquiry: '想了好幾天都想不到 → 累了去洗澡' },
  'kt-ch26-l4': { type: 'B4',       inquiry: '進浴缸水溢出來 → 他突然看到什麼?' },
  'kt-ch26-l5': { type: 'B1',       inquiry: '跳出來大喊 Eureka! → 為什麼?' },
  'kt-ch26-l6': { type: 'B2',       inquiry: '跑去找國王告訴秘密 → 王冠真假終於揭曉' },
  'kt-ch26-l7': { type: 'B6 open',  inquiry: '浮力法則改變科學 → 學到觀察' },
};

export function getLessonHook(lessonId: string): LessonHook | null {
  return LESSON_HOOKS[lessonId] ?? null;
}
