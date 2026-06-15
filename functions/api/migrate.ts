// POST /api/migrate — 首次登入把本機進度上推, server 取 max 合併 (不懲罰老玩家).
// body: { coins, xp, streak, catName?, renameCount?, completedLessons:[{chapter,lessonId}], openedChests:[id] }
import type { Ctx } from '../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../_lib/http';
import { getEconomy, getUser } from '../_lib/db';

interface MigrateBody {
  coins?: number;
  xp?: number;
  streak?: number;
  catName?: string;
  renameCount?: number;
  completedLessons?: Array<{ chapter: number; lessonId: string }>;
  openedChests?: string[];
}

const int = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);

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

  // max-merge economy
  const coins = Math.max(econ.coins, int(body.coins));
  const xp = Math.max(econ.xp, int(body.xp));
  const streak = Math.max(econ.streak, int(body.streak));
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
    if (!c || typeof c.lessonId !== 'string') continue;
    await db.prepare('INSERT OR IGNORE INTO lesson_completions (user_id, chapter, lesson_id, first_completed_at) VALUES (?, ?, ?, ?)')
      .bind(userId, int(c.chapter), c.lessonId, ts).run();
  }
  // union chests
  for (const id of (body.openedChests ?? []).slice(0, 1000)) {
    if (typeof id !== 'string') continue;
    await db.prepare('INSERT OR IGNORE INTO chests_opened (user_id, chest_id, opened_at) VALUES (?, ?, ?)')
      .bind(userId, id, ts).run();
  }

  return json({ ok: true, economy: { coins, xp, streak }, catName, renameCount });
}
