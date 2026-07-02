// 咕嚕成長狀態 (localStorage)。Phase 0: 成長值 + 等級 + 孵化。
// 成長公式 (spec §4 預設): 答對 +10; first-try 答對率 90%+ 該題額外 +30% (見 Practice)。
import { randomCreatureId } from './creatures';

const K_GROWTH = 'gulu.growth';       // 累積成長值
const K_CREATURE = 'gulu.creature';   // 已孵化的怪 id (null = 還是蛋)
export const GROWTH_PER_LEVEL = 100;  // 升 1 級所需 (前期; 之後可做遞增)
export const HATCH_AT = 20;           // 累積成長 >= 此值 → 蛋孵化

function num(k: string): number {
  const v = Number(localStorage.getItem(k));
  return Number.isFinite(v) ? v : 0;
}

export interface PetState {
  growth: number;
  level: number;
  hatched: boolean;
  creatureId: string | null;
}

export function readPet(): PetState {
  const growth = num(K_GROWTH);
  const creatureId = localStorage.getItem(K_CREATURE);
  return {
    growth,
    level: Math.floor(growth / GROWTH_PER_LEVEL) + 1,
    hatched: !!creatureId,
    creatureId,
  };
}

// 加成長值, 回傳新狀態 (含是否剛孵化 / 剛升級, 給 UI 慶祝)。
export function addGrowth(amount: number): { pet: PetState; justHatched: boolean; leveledUp: boolean } {
  const before = readPet();
  const growth = before.growth + Math.max(0, Math.round(amount));
  localStorage.setItem(K_GROWTH, String(growth));

  let justHatched = false;
  if (!before.hatched && growth >= HATCH_AT) {
    localStorage.setItem(K_CREATURE, randomCreatureId());
    justHatched = true;
  }
  const pet = readPet();
  return { pet, justHatched, leveledUp: pet.level > before.level };
}

// 當前等級進度 0..1 (給成長條)。
export function levelProgress(pet: PetState): number {
  return (pet.growth % GROWTH_PER_LEVEL) / GROWTH_PER_LEVEL;
}
