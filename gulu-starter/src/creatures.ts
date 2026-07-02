// 首發 5 隻咕嚕 (史萊姆基底 + 神話特徵)。emoji = 暫時佔位圖,
// 之後換成 docs 生圖 prompt 產出的 PNG (public/creatures/gulu-*.png)。
export interface Creature {
  id: string;
  zh: string;
  en: string;
  emoji: string;   // 佔位
  color: string;   // 主色 (呼應 spec §4.1)
}

export const CREATURES: Creature[] = [
  { id: 'sprout',  zh: '豆芽咕嚕', en: 'Sprout Gulu',  emoji: '🌱', color: '#7d9a4f' },
  { id: 'kitsune', zh: '狐火咕嚕', en: 'Kitsune Gulu', emoji: '🦊', color: '#e7a44a' },
  { id: 'dragon',  zh: '龍鱗咕嚕', en: 'Dragon Gulu',  emoji: '🐉', color: '#3f9a9a' },
  { id: 'cyclops', zh: '獨眼咕嚕', en: 'Cyclops Gulu', emoji: '👁️', color: '#b0897a' },
  { id: 'quetzal', zh: '羽蛇咕嚕', en: 'Quetzal Gulu', emoji: '🪶', color: '#5a9a6a' },
];

export function creatureById(id: string | null): Creature | null {
  return CREATURES.find((c) => c.id === id) ?? null;
}

// 隨機孵一隻 (POC 用 index; 正式版避免 Math.random 破壞可測性可換 seed)。
export function randomCreatureId(): string {
  return CREATURES[Math.floor(Math.random() * CREATURES.length)].id;
}
