// POST /api/chest/open — server 權威開寶箱 (idempotent +10 coins).
// body: { chestId }
import type { Ctx } from '../../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../../_lib/http';
import { applyDelta, getEconomy, insertedOnce } from '../../_lib/db';

const CHEST_COINS = 10;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);

  const userId = claims.sub;
  const b = await readBody<{ chestId?: string }>(ctx.request);
  // chestId = 地圖上的項目索引 (MapPage 傳 String(i)); 只收數字, 否則可無限換 ID 刷金幣
  const chestId = typeof b.chestId === 'string' && /^\d{1,3}$/.test(b.chestId) ? b.chestId : '';
  if (!chestId) return json({ error: 'bad_request' }, 400);

  const db = ctx.env.DB!;
  const ts = now();
  const first = await insertedOnce(
    db.prepare('INSERT OR IGNORE INTO chests_opened (user_id, chest_id, opened_at) VALUES (?, ?, ?)').bind(userId, chestId, ts),
  );
  if (!first) {
    const econ = await getEconomy(ctx.env, userId);
    return json({ opened: false, economy: { coins: econ?.coins ?? 0, xp: econ?.xp ?? 0, streak: econ?.streak ?? 0 } });
  }

  const econ = await applyDelta(ctx.env, userId, CHEST_COINS, 0, `chest:${chestId}`, ts);
  return json({ opened: true, coinGain: CHEST_COINS, economy: { coins: econ.coins, xp: econ.xp, streak: econ.streak } });
}
