// POST /api/migrate — 首次登入把本機進度上推, server 取 max 合併 (不懲罰老玩家).
// body: { coins, xp, streak, catName?, renameCount?, completedLessons:[{chapter,lessonId}], openedChests:[id] }
import type { Ctx } from '../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../_lib/http';
import { getEconomy, getUser, insertedOnce } from '../_lib/db';

interface MigrateBody {
  coins?: number;
  xp?: number;
  streak?: number;
  catName?: string;
  renameCount?: number;
  completedLessons?: Array<{ chapter: number; lessonId: string }>;
  openedChests?: string[];
}

const int = (v: unknown, max = Number.MAX_SAFE_INTEGER) =>
  (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.min(max, Math.floor(v)) : 0);

// 本機值是 client 自報的, 金幣又是付費貨幣 → 設上限, 且每個帳號只能合併一次。
// 上限抓「全部章節玩完」的量級再留餘裕, 正常老玩家不會被砍到。
const MAX_COINS = 20_000;
const MAX_XP = 200_000;
const MAX_STREAK = 3650;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);

  const userId = claims.sub;
  const body = await readBody<MigrateBody>(ctx.request);
  const db = ctx.env.DB!;
  const ts = now();

  const econ = await getEconomy(ctx.env, userId);
  const user = await getUser(ctx.env, userId);
  if (!econ || !user) return json({ error: 'no_user' }, 404);

  // 一次性: 用 ledger 的 'migrate' 列當鎖 (同時送兩次也只有一個進得來)
  const ok = await insertedOnce(
    db.prepare("INSERT INTO ledger (user_id, delta_coins, delta_xp, reason, ts) SELECT ?, 0, 0, 'migrate', ? WHERE NOT EXISTS (SELECT 1 FROM ledger WHERE user_id = ? AND reason = 'migrate')")
      .bind(userId, ts, userId),
  );
  if (!ok) return json({ error: 'already_migrated' }, 409);

  // max-merge economy
  const coins = Math.max(econ.coins, int(body.coins, MAX_COINS));
  const xp = Math.max(econ.xp, int(body.xp, MAX_XP));
  const streak = Math.max(econ.streak, int(body.streak, MAX_STREAK));
  await db.prepare("UPDATE ledger SET delta_coins = ?, delta_xp = ? WHERE user_id = ? AND reason = 'migrate'")
    .bind(coins - econ.coins, xp - econ.xp, userId).run();
  await db.prepare('UPDATE economy SET coins = ?, xp = ?, streak = ?, last_active = ? WHERE user_id = ?')
    .bind(coins, xp, streak, ts, userId).run();

  // rename count: take max; cat name keep server unless still default
  const renameCount = Math.max(user.rename_count, int(body.renameCount));
  const catName = user.cat_name === 'Mochi' && typeof body.catName === 'string' && body.catName.trim()
    ? body.catName.trim().slice(0, 12)
    : user.cat_name;
  await db.prepare('UPDATE users SET rename_count = ?, cat_name = ? WHERE id = ?')
    .bind(renameCount, catName, userId).run();

  // union completed lessons (idempotent insert)
  for (const c of (body.completedLessons ?? []).slice(0, 2000)) {
    if (!c || typeof c.lessonId !== 'string' || c.lessonId.length > 64) continue;
    await db.prepare('INSERT OR IGNORE INTO lesson_completions (user_id, chapter, lesson_id, first_completed_at) VALUES (?, ?, ?, ?)')
      .bind(userId, int(c.chapter), c.lessonId, ts).run();
  }
  // union chests
  for (const id of (body.openedChests ?? []).slice(0, 1000)) {
    if (typeof id !== 'string' || !/^\d{1,3}$/.test(id)) continue;
    await db.prepare('INSERT OR IGNORE INTO chests_opened (user_id, chest_id, opened_at) VALUES (?, ?, ?)')
      .bind(userId, id, ts).run();
  }

  return json({ ok: true, economy: { coins, xp, streak }, catName, renameCount });
}
