// POST /api/auth/consume — 用 magic-link token 換 JWT + 綁 email 到帳號 (P3).
// body: { token }
import type { Ctx } from '../../_lib/types';
import { json, ensureProvisioned, readBody, uuid, now } from '../../_lib/http';
import { createUser } from '../../_lib/db';
import { signJwt } from '../../_lib/jwt';

interface TokenRow { token: string; email: string; user_id: string | null; expires_at: number; used: number }

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;

  const b = await readBody<{ token?: string }>(ctx.request);
  const token = typeof b.token === 'string' ? b.token : '';
  if (!token) return json({ error: 'bad_request' }, 400);

  const db = ctx.env.DB!;
  // 先原子地「搶」這個 token (used 0→1), 搶到的那個請求才繼續; 同一連結點兩次只有一次成功
  const claimed = await db.prepare('UPDATE login_tokens SET used = 1 WHERE token = ? AND used = 0 AND expires_at >= ?')
    .bind(token, now()).run();
  if (!claimed.meta?.changes) return json({ error: 'invalid_or_expired' }, 401);
  const row = (await db.prepare('SELECT * FROM login_tokens WHERE token = ?').bind(token).first<TokenRow>())!;

  // resolve target user: existing email account → reuse; else bind anon; else create.
  const ts = now();
  let userId: string | null = null;
  const byEmail = await db.prepare('SELECT id FROM users WHERE email = ?').bind(row.email).first<{ id: string }>();
  if (byEmail) {
    userId = byEmail.id;
  } else if (row.user_id) {
    // bind email onto the anon account that requested the link
    await db.prepare('UPDATE users SET email = ? WHERE id = ?').bind(row.email, row.user_id).run();
    userId = row.user_id;
  } else {
    userId = uuid();
    await createUser(ctx.env, userId, ts);
    await db.prepare('UPDATE users SET email = ? WHERE id = ?').bind(row.email, userId).run();
  }

  const jwt = await signJwt({ sub: userId }, ctx.env.JWT_SECRET!);
  return json({ token: jwt, userId });
}
