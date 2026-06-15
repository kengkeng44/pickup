// POST /api/iap/verify — 付費收據驗證 → 發金幣 (P4). idempotent via purchases.id.
// 支援 provider: 'apple' (Capacitor IAP) | 'stripe' (web webhook).
// 需金鑰; 未設 → 501 (見 cockpit todo). 真錢只賣金幣包, 改名/解鎖仍花金幣.
import type { Ctx, Env } from '../../_lib/types';
import { json, ensureProvisioned, auth, readBody, now } from '../../_lib/http';
import { applyDelta } from '../../_lib/db';

// productId → 發多少金幣
const COIN_PRODUCTS: Record<string, number> = {
  coins_pack_small: 500,
  coins_pack_medium: 1200,
  coins_pack_large: 3000,
};

async function grant(env: Env, userId: string, txnId: string, provider: string, productId: string, amountCents: number | null, currency: string | null): Promise<Response> {
  const coins = COIN_PRODUCTS[productId];
  if (!coins) return json({ error: 'unknown_product' }, 400);
  const ts = now();
  // idempotent: same provider txn id can't grant twice
  const dup = await env.DB!.prepare('SELECT 1 AS x FROM purchases WHERE id = ?').bind(txnId).first<{ x: number }>();
  if (dup) return json({ ok: true, duplicate: true });
  await env.DB!.prepare('INSERT INTO purchases (id, user_id, provider, product_id, coins_granted, amount_cents, currency, ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(txnId, userId, provider, productId, coins, amountCents, currency, ts).run();
  const econ = await applyDelta(env, userId, coins, 0, `iap:${productId}`, ts);
  return json({ ok: true, coinsGranted: coins, economy: { coins: econ.coins, xp: econ.xp, streak: econ.streak } });
}

// ── Apple: POST verifyReceipt ───────────────────────────────────────
async function verifyApple(ctx: Ctx, userId: string, receipt: string): Promise<Response> {
  if (!ctx.env.APPLE_SHARED_SECRET) return json({ error: 'apple_not_configured' }, 501);
  const body = JSON.stringify({ 'receipt-data': receipt, password: ctx.env.APPLE_SHARED_SECRET, 'exclude-old-transactions': true });
  let r = await fetch('https://buy.itunes.apple.com/verifyReceipt', { method: 'POST', body });
  let data = await r.json() as { status: number; receipt?: { in_app?: Array<{ product_id: string; transaction_id: string }> } };
  if (data.status === 21007) {
    // sandbox receipt → retry sandbox endpoint
    r = await fetch('https://sandbox.itunes.apple.com/verifyReceipt', { method: 'POST', body });
    data = await r.json() as typeof data;
  }
  if (data.status !== 0) return json({ error: 'apple_invalid', status: data.status }, 400);
  const item = data.receipt?.in_app?.[data.receipt.in_app.length - 1];
  if (!item) return json({ error: 'apple_no_item' }, 400);
  return grant(ctx.env, userId, `apple:${item.transaction_id}`, 'apple', item.product_id, null, null);
}

// ── Stripe: webhook (checkout.session.completed) ────────────────────
async function verifyStripeSig(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  try {
    const parts = Object.fromEntries(sigHeader.split(',').map((kv) => kv.split('=')));
    const signedPayload = `${parts.t}.${payload}`;
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
    const hex = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
    return hex === parts.v1;
  } catch { return false; }
}

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const blocked = ensureProvisioned(ctx.env);
  if (blocked) return blocked;

  const ct = ctx.request.headers.get('content-type') || '';
  const stripeSig = ctx.request.headers.get('stripe-signature');

  // Stripe webhook path — raw body + signature, no JWT (server-to-server)
  if (stripeSig) {
    if (!ctx.env.STRIPE_WEBHOOK_SECRET) return json({ error: 'stripe_not_configured' }, 501);
    const raw = await ctx.request.text();
    if (!(await verifyStripeSig(raw, stripeSig, ctx.env.STRIPE_WEBHOOK_SECRET))) return json({ error: 'bad_signature' }, 400);
    const event = JSON.parse(raw) as { type: string; data: { object: { id: string; client_reference_id?: string; metadata?: { userId?: string; productId?: string }; amount_total?: number; currency?: string } } };
    if (event.type !== 'checkout.session.completed') return json({ ok: true, ignored: event.type });
    const s = event.data.object;
    const userId = s.metadata?.userId || s.client_reference_id || '';
    const productId = s.metadata?.productId || '';
    if (!userId || !productId) return json({ error: 'missing_meta' }, 400);
    return grant(ctx.env, userId, `stripe:${s.id}`, 'stripe', productId, s.amount_total ?? null, s.currency ?? null);
  }

  // Apple path — needs JWT (client-initiated)
  const claims = await auth(ctx);
  if (!claims) return json({ error: 'unauthorized' }, 401);
  const b = await readBody<{ provider?: string; receipt?: string }>(ctx.request);
  if (b.provider === 'apple' && typeof b.receipt === 'string') {
    return verifyApple(ctx, claims.sub, b.receipt);
  }
  return json({ error: 'unsupported_provider', ct }, 400);
}
