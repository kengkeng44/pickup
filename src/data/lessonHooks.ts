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
};

export function getLessonHook(lessonId: string): LessonHook | null {
  return LESSON_HOOKS[lessonId] ?? null;
}
