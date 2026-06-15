// GET /api/state — 拉全狀態 (economy + cat name + completed lessons + chests).
import type { Ctx } from '../_lib/types';
import { json, ensureProvisioned, auth } from '../_lib/http';
import { getUser, getEconomy } from '../_lib/db';

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);

  const userId = claims.sub;
  const [user, econ, comps, chests] = await Promise.all([
    getUser(ctx.env, userId),
    getEconomy(ctx.env, userId),
    ctx.env.DB!.prepare('SELECT chapter, lesson_id FROM lesson_completions WHERE user_id = ?').bind(userId).all<{ chapter: number; lesson_id: string }>(),
    ctx.env.DB!.prepare('SELECT chest_id FROM chests_opened WHERE user_id = ?').bind(userId).all<{ chest_id: string }>(),
  ]);
  if (!user) return json({ error: 'no_user' }, 404);

  return json({
    userId,
    catName: user.cat_name,
    renameCount: user.rename_count,
    email: user.email,
    economy: { coins: econ?.coins ?? 0, xp: econ?.xp ?? 0, streak: econ?.streak ?? 0 },
    completedLessons: comps.results.map((r) => ({ chapter: r.chapter, lessonId: r.lesson_id })),
    openedChests: chests.results.map((r) => r.chest_id),
  });
}
