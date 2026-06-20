// v2.0.B.cron 介面文案字典 + useT() hook (per user 中/英切換).
// 用法: const { t } = useT(); t('settings.title') → 依當前語言回字串, 切語言自動 re-render。
// 字典 key 用 dot-namespace。缺 key fallback 回 key 本身 (開發期易抓漏譯)。
// 涵蓋已接 useT 的 surface: 設定 / 導覽 / 個人 / 地圖 / 成就 / 任務 / 圖鑑。
// 其餘 surface (chapters/parent/lesson/...) 之後分批接時再加 key。
import { useEffect, useState } from 'react';
import { getLang, subscribeLang, type UiLang } from '../data/lang';

type Dict = Record<string, string>;

const ZH: Dict = {
  // 設定頁
  'settings.title': '設定 · Settings',
  'settings.back': '返回',
  'settings.night': '夜間模式 🌙',
  'settings.night.sub': '睡前護眼暗色',
  'settings.bgm': '背景音樂 🎵',
  'settings.bgm.sub': '關掉可同時聽你自己的音樂',
  'settings.sfx': '音效 🔔',
  'settings.sfx.sub': '答對 / 答錯 / 點擊音',
  'settings.lang': '語言 Language 🌐',
  'settings.lang.sub': '介面與題目解說的文字語言',
  'settings.difficulty': '難度 🎚️',
  'settings.difficulty.sub': '文章難易程度',
  'settings.comp': '理解題 👂📖',
  'settings.comp.sub': '理解選擇題用「聽」還是「讀」段落',
  'settings.comp.autoHint': '「跟著難度」= 初級用讀 / 中級混合 / 高級用聽',
  'settings.parent': '家長專區',
  'settings.parent.sub': '孩子的學習紀錄',
  // 難度 (跟其他 app 一致命名)
  'diff.easy': '初級',
  'diff.medium': '中級',
  'diff.hard': '高級',
  'diff.default': '預設',
  // 理解題模式
  'comp.auto': '✨ 跟著難度',
  'comp.listen': '👂 用聽的',
  'comp.read': '📖 用讀的',
  // 底部導覽 (aria-label)
  'nav.map': '地圖',
  'nav.tasks': '任務',
  'nav.cards': '圖鑑',
  'nav.alerts': '成就',
  'nav.me': '我的',
  // 個人頁
  'profile.title': '我的',
  'profile.catName': '貓咪名字',
  'profile.save': '儲存',
  'profile.saveCost': '儲存 {cost}🪙',
  'profile.notEnough': '金幣不足 — 改名要 {cost} 🪙,你只有 {bal}',
  'profile.renamed': '已改名 ✓ 重新整理生效',
  'profile.renameRemaining': '更改後重新整理生效 · 免費改名剩 {n} 次',
  'profile.renameUsedUp': '免費改名已用完 · 再改 {cost} 🪙(你有 {bal})',
  'profile.wardrobe': '衣櫥',
  'profile.wardrobe.aria': '開啟衣櫥',
  'profile.wardrobe.current': '目前',
  'profile.outfitDefault': 'Mochi 原樣',
  'profile.stat.streak': '連勝',
  'profile.stat.xp': 'XP',
  'profile.stat.coins': '金幣',
  'profile.stat.crown': '皇冠等級',
  'profile.settings.sub': '音訊 · 夜間模式 · 難度 · 家長專區',
  // 地圖
  'map.coverAria': '第 {ch} 章 {title} · 點看本章金句集錦',
  'map.chestOpened': '寶箱(已開啟)',
  'map.chest': '寶箱(+10 金幣)',
  'map.tonight': 'Mochi 記得了 — 今晚講 {title}',
  'map.tonightSub': '今晚:{title}',
  'map.tonightAria': '今晚的故事:第 {ch} 章',
  'map.story': '故事',
  // 通用
  'common.close': '關閉',
  // 成就頁
  'alerts.title': '成就',
  'ach.1.name': '第一步', 'ach.1.desc': '完成第一個 lesson',
  'ach.2.name': '三日連擊', 'ach.2.desc': '連續 3 天學習',
  'ach.3.name': '七日狂熱', 'ach.3.desc': '連續 7 天學習',
  'ach.4.name': '完美主義', 'ach.4.desc': '滿分完成 1 個 lesson',
  'ach.5.name': '探索者', 'ach.5.desc': '解鎖 Ch2',
  'ach.6.name': '說書人', 'ach.6.desc': '完成 Ch1 全章',
  'ach.7.name': '神射手', 'ach.7.desc': 'XP 達 1000',
  'ach.8.name': '畢業生', 'ach.8.desc': '完成所有章節',
  // 圖鑑頁
  'cards.title': '圖鑑',
  'cards.count': '{u} / {t} 張卡片',
  // 每日任務頁
  'tasks.title': '每日任務',
  'tasks.streakDays': '{n} 天',
  'tasks.streakLabel': '連續學習',
  'tasks.freezeCount': '{n} 個',
  'tasks.freezeLabel': '漏一天 Mochi 自動幫你保住 streak',
  'tasks.goals': '今日目標',
  'tasks.goal.lesson': '完成 1 個 lesson',
  'tasks.goal.streak': '連續學習至少 1 天',
  'tasks.goal.accuracy': '正確率 ≥ 80%',
};

const EN: Dict = {
  'settings.title': 'Settings · 設定',
  'settings.back': 'Back',
  'settings.night': 'Night mode 🌙',
  'settings.night.sub': 'Dark theme, easy on the eyes',
  'settings.bgm': 'Background music 🎵',
  'settings.bgm.sub': 'Turn off to play your own music',
  'settings.sfx': 'Sound effects 🔔',
  'settings.sfx.sub': 'Correct / wrong / tap sounds',
  'settings.lang': 'Language 語言 🌐',
  'settings.lang.sub': 'Language of the interface and answer notes',
  'settings.difficulty': 'Difficulty 🎚️',
  'settings.difficulty.sub': 'How hard the passages are',
  'settings.comp': 'Comprehension 👂📖',
  'settings.comp.sub': 'Listen to or read the passage',
  'settings.comp.autoHint': '"Follow difficulty" = Beginner reads / Intermediate mixes / Advanced listens',
  'settings.parent': 'For Parents',
  'settings.parent.sub': "Your child's progress",
  'diff.easy': 'Beginner',
  'diff.medium': 'Intermediate',
  'diff.hard': 'Advanced',
  'diff.default': 'Default',
  'comp.auto': '✨ Follow difficulty',
  'comp.listen': '👂 Listen',
  'comp.read': '📖 Read',
  'nav.map': 'Map',
  'nav.tasks': 'Tasks',
  'nav.cards': 'Cards',
  'nav.alerts': 'Trophies',
  'nav.me': 'Me',
  'profile.title': 'Me',
  'profile.catName': "Cat's name",
  'profile.save': 'Save',
  'profile.saveCost': 'Save {cost}🪙',
  'profile.notEnough': 'Not enough coins — rename costs {cost} 🪙, you have {bal}',
  'profile.renamed': 'Renamed ✓ refresh to apply',
  'profile.renameRemaining': 'Refresh to apply · {n} free renames left',
  'profile.renameUsedUp': 'Free renames used up · {cost} 🪙 each (you have {bal})',
  'profile.wardrobe': 'Wardrobe',
  'profile.wardrobe.aria': 'Open wardrobe',
  'profile.wardrobe.current': 'Current',
  'profile.outfitDefault': 'Mochi (default)',
  'profile.stat.streak': 'Streak',
  'profile.stat.xp': 'XP',
  'profile.stat.coins': 'Coins',
  'profile.stat.crown': 'Crown Level',
  'profile.settings.sub': 'Audio · Night mode · Difficulty · Parents',
  'map.coverAria': 'Chapter {ch} {title} · view key sentences',
  'map.chestOpened': 'Chest (opened)',
  'map.chest': 'Chest (+10 coins)',
  'map.tonight': 'Mochi remembered — tonight: {title}',
  'map.tonightSub': 'Tonight: {title}',
  'map.tonightAria': "Tonight's story: chapter {ch}",
  'map.story': 'your pick',
  'common.close': 'Close',
  'alerts.title': 'Trophies',
  'ach.1.name': 'First Step', 'ach.1.desc': 'Complete your first lesson',
  'ach.2.name': '3-Day Streak', 'ach.2.desc': 'Study 3 days in a row',
  'ach.3.name': '7-Day Streak', 'ach.3.desc': 'Study 7 days in a row',
  'ach.4.name': 'Perfectionist', 'ach.4.desc': 'Ace a lesson with full marks',
  'ach.5.name': 'Explorer', 'ach.5.desc': 'Unlock Chapter 2',
  'ach.6.name': 'Storyteller', 'ach.6.desc': 'Finish all of Chapter 1',
  'ach.7.name': 'Sharpshooter', 'ach.7.desc': 'Reach 1000 XP',
  'ach.8.name': 'Graduate', 'ach.8.desc': 'Complete every chapter',
  'cards.title': 'Collection',
  'cards.count': '{u} / {t} cards',
  'tasks.title': 'Daily Tasks',
  'tasks.streakDays': '{n} days',
  'tasks.streakLabel': 'Daily streak',
  'tasks.freezeCount': '{n}',
  'tasks.freezeLabel': 'Miss a day and Mochi keeps your streak',
  'tasks.goals': "Today's goals",
  'tasks.goal.lesson': 'Complete 1 lesson',
  'tasks.goal.streak': 'Keep at least a 1-day streak',
  'tasks.goal.accuracy': 'Accuracy ≥ 80%',
};

const DICTS: Record<UiLang, Dict> = { zh: ZH, en: EN };

export function translate(key: string, lang: UiLang): string {
  return DICTS[lang]?.[key] ?? DICTS.zh[key] ?? key;
}

// hook: 回傳 t() + 當前語言, 切語言時自動 re-render 訂閱的元件。
export function useT(): { t: (key: string) => string; lang: UiLang } {
  const [lang, setLangState] = useState<UiLang>(() => getLang());
  useEffect(() => subscribeLang(() => setLangState(getLang())), []);
  return { t: (key: string) => translate(key, lang), lang };
}
