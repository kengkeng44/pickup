// D1 data-access helpers for Pickup.
import type { Env } from './types';

export interface UserRow {
  id: string;
  email: string | null;
  created_at: number;
  cat_name: string;
  rename_count: number;
}
export interface EconomyRow {
  user_id: string;
  coins: number;
  xp: number;
  streak: number;
  last_active: number | null;
}

export async function createUser(env: Env, id: string, ts: number): Promise<void> {
  const db = env.DB!;
  await db.prepare('INSERT INTO users (id, created_at) VALUES (?, ?)').bind(id, ts).run();
  await db.prepare('INSERT INTO economy (user_id, coins, xp, streak, last_active) VALUES (?, 0, 0, 0, ?)').bind(id, ts).run();
}

export async function getUser(env: Env, id: string): Promise<UserRow | null> {
  return env.DB!.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<UserRow>();
}

export async function getEconomy(env: Env, id: string): Promise<EconomyRow | null> {
  return env.DB!.prepare('SELECT * FROM economy WHERE user_id = ?').bind(id).first<EconomyRow>();
}

// Apply a coin/xp delta atomically + write an audit ledger row.
export async function applyDelta(
  env: Env,
  userId: string,
  deltaCoins: number,
  deltaXp: number,
  reason: string,
  ts: number,
): Promise<EconomyRow> {
  const db = env.DB!;
  await db
    .prepare('UPDATE economy SET coins = MAX(0, coins + ?), xp = MAX(0, xp + ?), last_active = ? WHERE user_id = ?')
    .bind(deltaCoins, deltaXp, ts, userId)
    .run();
  await db
    .prepare('INSERT INTO ledger (user_id, delta_coins, delta_xp, reason, ts) VALUES (?, ?, ?, ?, ?)')
    .bind(userId, deltaCoins, deltaXp, reason, ts)
    .run();
  return (await getEconomy(env, userId))!;
}

export async function setStreak(env: Env, userId: string, streak: number, ts: number): Promise<void> {
  await env.DB!.prepare('UPDATE economy SET streak = ?, last_active = ? WHERE user_id = ?').bind(streak, ts, userId).run();
}
