/**
 * v2.0.B.559 (per user 2026-07-04): 經典主線 + 書櫃支線。
 *
 * 主線 = 經典故事, 固定順序、不能選 — 前段全球通用 (Aesop / Grimm / Andersen /
 * Perrault, 無特定文化), 文化較強的 (桃太郎 / 嫦娥 / 西遊記) 排後段。
 * 其餘 shipped 章 = 書櫃支線: 隨主線進度分批「上架」, 玩家在奶奶的書櫃自由選讀。
 *
 * 這裡只有純資料 + 純函式 (unlock 判定用 callback 拿完成度), 不碰 localStorage —
 * 避免與 runStore / MapPage 循環相依。
 */

/** 主線章節 (chapter id), 陣列順序 = 遊玩順序。 */
export const MAINLINE: number[] = [
  0,   // 序章 奶奶撿到 Mochi (app 自己的 frame)
  3,   // 龜兔賽跑 (Aesop, 全球)
  8,   // 三隻小豬
  2,   // 醜小鴨
  13,  // 小紅帽
  9,   // 灰姑娘
  15,  // 國王的新衣
  1,   // 桃太郎 (文化段開始)
  10,  // 嫦娥奔月
  12,  // 牛郎織女
  23,  // 司馬光砸缸
  27,  // 西遊記
];

/**
 * 書櫃分批上架: key = 主線 index — 完成 MAINLINE[key] 那一章, 這批支線就上架。
 * 配對邏輯: 同文化 / 同調性靠近對應的主線章 (例: 過了三隻小豬 → 興夫和孬夫上架)。
 */
export const SHELF_BATCHES: Record<number, number[]> = {
  0: [20],       // 蘿蔔大冒險
  1: [4, 25],    // 駱駝為什麼有駝峰 / 愚公移山
  2: [18],       // 興夫和孬夫
  3: [6, 17],    // 六隻天鵝 / 鶴的報恩
  4: [5, 19],    // Baba Yaga / Sang Kancil 與鱷魚
  5: [7, 14],    // 葉限 / 浦島太郎
  6: [21, 24],   // Anansi 蜘蛛 / 孔融讓梨
  7: [16, 22],   // 一寸法師 / 孟母三遷
  8: [11],       // 后羿射日
  9: [26],       // Archimedes 的尤里卡
  10: [28, 29],  // 三國諸葛亮 / 奧德賽
  11: [30, 31],  // 赫拉克勒斯 / Robin Hood
};

/** 全部支線章 (依上架批次序攤平)。 */
export const SHELF_CHAPTERS: number[] = Object.keys(SHELF_BATCHES)
  .map(Number)
  .sort((a, b) => a - b)
  .flatMap((k) => SHELF_BATCHES[k]);

export function isMainlineChapter(ch: number): boolean {
  return MAINLINE.includes(ch);
}

/** 主線位置 (0-based); 非主線回 -1。 */
export function mainlineIndex(ch: number): number {
  return MAINLINE.indexOf(ch);
}

/** 主線的下一章; 已是最後一章 / 非主線 → null。 */
export function nextMainlineChapter(ch: number): number | null {
  const i = MAINLINE.indexOf(ch);
  if (i < 0 || i >= MAINLINE.length - 1) return null;
  return MAINLINE[i + 1];
}

/** 支線章屬於哪一批 (回主線 index); 非支線回 -1。 */
export function shelfBatchIndex(ch: number): number {
  for (const k of Object.keys(SHELF_BATCHES)) {
    if (SHELF_BATCHES[Number(k)].includes(ch)) return Number(k);
  }
  return -1;
}

/**
 * 章節可玩判定 (主線循序 / 支線看上架批次)。
 * isChapterComplete 由呼叫端提供 (讀 localStorage 完成度)。
 * 不認識的章 (例: 英檢 ch32) 一律 true, 由呼叫端自己 gate。
 */
export function isChapterPlayable(ch: number, isChapterComplete: (c: number) => boolean): boolean {
  const mi = MAINLINE.indexOf(ch);
  if (mi === 0) return true;                                  // 序章永遠開
  if (mi > 0) return isChapterComplete(MAINLINE[mi - 1]);     // 主線: 前一章完成
  const bi = shelfBatchIndex(ch);
  if (bi >= 0) return isChapterComplete(MAINLINE[bi]);        // 支線: 對應批次的主線章完成
  return true;
}
