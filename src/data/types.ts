/**
 * 拾光 (Pickup) — shared primitive domain types (v2.0.B.298, arch-cron 0614 P0).
 *
 * Lives at the bottom of the import graph (imports nothing) so shared vocabulary
 * types don't create circular module dependencies. arch-cron 2026-06-09T1214
 * found `userProfile.ts ↔ storyTags.ts` (Cycle 2, latent TDZ): `AbilityLevel`
 * was owned by userProfile but consumed by storyTags, forcing a back-edge.
 * Moving it here breaks that cycle.
 */

// CEFR-aligned ability tier used by the chapter recommender + level test.
//   'A0'  = pre-A1 / 零基礎 / 沒玩過 → Ch0 ground floor
//   'A1'  = 完了 Ch0, 還沒進 A2 主章
//   'A2'  = 完成 ≥ 2 主章 + 答對率 > 70%
//   'A2+' = 完成 ≥ 5 主章 + 答對率 > 85% (詩意 / dark 章節 ok)
export type AbilityLevel = 'A0' | 'A1' | 'A2' | 'A2+';
