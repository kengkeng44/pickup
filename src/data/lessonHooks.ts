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
};

export function getLessonHook(lessonId: string): LessonHook | null {
  return LESSON_HOOKS[lessonId] ?? null;
}
