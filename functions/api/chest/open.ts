// POST /api/chest/open — server 權威開寶箱 (idempotent +10 coins).
// body: { chestId }
import type { Ctx } from '../../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../../_lib/http';
import { applyDelta, getEconomy } from '../../_lib/db';

const CHEST_COINS = 10;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);

  const userId = claims.sub;
  const b = await readBody<{ chestId?: string }>(ctx.request);
  const chestId = typeof b.chestId === 'string' ? b.chestId.slice(0, 64) : '';
  if (!chestId) return json({ error: 'bad_request' }, 400);

  const db = ctx.env.DB!;
  const ts = now();
  const existing = await db.prepare('SELECT 1 AS x FROM chests_opened WHERE user_id = ? AND chest_id = ?')
    .bind(userId, chestId).first<{ x: number }>();
  if (existing) {
    const econ = await getEconomy(ctx.env, userId);
    return json({ opened: false, economy: { coins: econ?.coins ?? 0, xp: econ?.xp ?? 0, streak: econ?.streak ?? 0 } });
  }

  await db.prepare('INSERT INTO chests_opened (user_id, chest_id, opened_at) VALUES (?, ?, ?)').bind(userId, chestId, ts).run();
  const econ = await applyDelta(ctx.env, userId, CHEST_COINS, 0, `chest:${chestId}`, ts);
  return json({ opened: true, coinGain: CHEST_COINS, economy: { coins: econ.coins, xp: econ.xp, streak: econ.streak } });
}
