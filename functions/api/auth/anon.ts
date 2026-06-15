// POST /api/auth/anon — 發匿名裝置帳號 + JWT (零 PII, 兒童零摩擦).
import type { Ctx } from '../../_lib/types';
import { json, ensureProvisioned, uuid, now } from '../../_lib/http';
import { createUser, getEconomy } from '../../_lib/db';
import { signJwt } from '../../_lib/jwt';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;

  const id = uuid();
  const ts = now();
  await createUser(ctx.env, id, ts);
  const token = await signJwt({ sub: id }, ctx.env.JWT_SECRET!);
  const econ = await getEconomy(ctx.env, id);
  return json({
    token,
    userId: id,
    economy: { coins: econ?.coins ?? 0, xp: econ?.xp ?? 0, streak: econ?.streak ?? 0 },
  });
}
