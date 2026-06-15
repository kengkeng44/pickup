// POST /api/rename — server 權威改名 (3 次免費, 之後每次 100 coins).
// body: { name }
import type { Ctx } from '../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../_lib/http';
import { getUser, getEconomy, applyDelta } from '../_lib/db';

const FREE_RENAMES = 3;
const RENAME_COST = 100;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);

  const userId = claims.sub;
  const b = await readBody<{ name?: string }>(ctx.request);
  const name = (typeof b.name === 'string' ? b.name : '').trim().slice(0, 12);
  if (!name) return json({ error: 'bad_name' }, 400);

  const user = await getUser(ctx.env, userId);
  const econ = await getEconomy(ctx.env, userId);
  if (!user || !econ) return json({ error: 'no_user' }, 404);
  if (name === user.cat_name) return json({ error: 'unchanged' }, 400);

  const ts = now();
  const willCost = user.rename_count >= FREE_RENAMES;
  if (willCost && econ.coins < RENAME_COST) {
    return json({ error: 'insufficient_coins', cost: RENAME_COST, coins: econ.coins }, 402);
  }

  await ctx.env.DB!.prepare('UPDATE users SET cat_name = ?, rename_count = rename_count + 1 WHERE id = ?')
    .bind(name, userId).run();

  let coins = econ.coins;
  if (willCost) {
    const e = await applyDelta(ctx.env, userId, -RENAME_COST, 0, 'rename', ts);
    coins = e.coins;
  }
  return json({ ok: true, catName: name, renameCount: user.rename_count + 1, charged: willCost ? RENAME_COST : 0, coins });
}
