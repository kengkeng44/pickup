// POST /api/auth/link — 家長 email 綁定 (P3). 寄 magic-link.
// body: { email }  (Authorization: 帶現有匿名 token → 綁到該帳號)
// 需 RESEND_API_KEY; 未設 → 501 (見 cockpit todo).
import type { Ctx } from '../../_lib/types';
import { json, ensureProvisioned, auth, readBody, uuid, now } from '../../_lib/http';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TTL_MS = 1000 * 60 * 30; // 30 min
// 防寄信轟炸 (每封都是 Resend 額度): 同一 email 10 分鐘最多 3 封
const RATE_WINDOW_MS = 1000 * 60 * 10;
const RATE_MAX = 3;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;

  const b = await readBody<{ email?: string }>(ctx.request);
  const email = (typeof b.email === 'string' ? b.email : '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return json({ error: 'bad_email' }, 400);

  const recent = await ctx.env.DB!.prepare('SELECT COUNT(*) AS n FROM login_tokens WHERE email = ? AND expires_at > ?')
    .bind(email, now() + TTL_MS - RATE_WINDOW_MS).first<{ n: number }>();
  if ((recent?.n ?? 0) >= RATE_MAX) return json({ error: 'rate_limited' }, 429);

  const claims = await auth(ctx); // optional: bind to current anon account
  const token = uuid().replace(/-/g, '') + uuid().replace(/-/g, '');
  const ts = now();
  await ctx.env.DB!.prepare('INSERT INTO login_tokens (token, email, user_id, expires_at, used) VALUES (?, ?, ?, ?, 0)')
    .bind(token, email, claims?.sub ?? null, ts + TTL_MS).run();

  const origin = ctx.env.APP_ORIGIN || new URL(ctx.request.url).origin;
  const link = `${origin}/?login=${token}`;

  if (!ctx.env.RESEND_API_KEY) {
    // not provisioned for email yet — return 501 so client shows "即將推出"
    return json({ error: 'email_not_configured', hint: 'set RESEND_API_KEY' }, 501);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${ctx.env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: 'Pickup 拾光 <noreply@pickupwords.app>',
      to: [email],
      subject: '拾光 Pickup — 登入連結',
      html: `<p>點下面連結登入並同步孩子的學習進度(30 分鐘內有效):</p><p><a href="${encodeURI(link)}">${encodeURI(link)}</a></p>`,
    }),
  });
  if (!res.ok) return json({ error: 'email_send_failed' }, 502);
  return json({ ok: true });
}
