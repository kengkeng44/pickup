/// <reference types="node" />
// 後端 Pages Functions 的反作弊 / 安全回歸測試。
// 用 node:sqlite 跑真的 migrations/0001_init.sql，不 mock SQL —— 洞多半藏在 SQL 時序裡。
import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Ctx, Env, D1Database, D1PreparedStatement } from '../../functions/_lib/types';
import { signJwt } from '../../functions/_lib/jwt';
import { onRequestPost as migrate } from '../../functions/api/migrate';
import { onRequestPost as lessonComplete } from '../../functions/api/lesson/complete';
import { onRequestPost as chestOpen } from '../../functions/api/chest/open';
import { onRequestPost as authLink } from '../../functions/api/auth/link';
import { onRequestPost as authConsume } from '../../functions/api/auth/consume';
import { onRequestPost as iapVerify } from '../../functions/api/iap/verify';

const ROOT = resolve(__dirname, '../..');
const SECRET = 'test-secret';

function fakeD1(): { d1: D1Database; raw: DatabaseSync } {
  const raw = new DatabaseSync(':memory:');
  raw.exec(readFileSync(resolve(ROOT, 'migrations/0001_init.sql'), 'utf8'));
  const stmt = (sql: string, vals: unknown[] = []): D1PreparedStatement => ({
    bind: (...v: unknown[]) => stmt(sql, v),
    first: async <T>() => (raw.prepare(sql).get(...(vals as never[])) as T) ?? null,
    run: async () => {
      const r = raw.prepare(sql).run(...(vals as never[]));
      return { success: true, meta: { changes: Number(r.changes) } };
    },
    all: async <T>() => ({ results: raw.prepare(sql).all(...(vals as never[])) as T[], success: true }),
  });
  return { raw, d1: { prepare: (sql: string) => stmt(sql), batch: async (s) => Promise.all(s.map((x) => x.run())) } };
}

// 模擬 Pages 的 env.ASSETS：直接讀 public/ 底下的靜態檔
const assets = {
  fetch: async (req: Request | string) => {
    const p = resolve(ROOT, 'public', new URL(typeof req === 'string' ? req : req.url).pathname.slice(1));
    return existsSync(p) ? new Response(readFileSync(p)) : new Response('not found', { status: 404 });
  },
};

let env: Env;
let raw: DatabaseSync;
let token: string;
const USER = 'u-1';

function ctx(path: string, body: unknown, headers: Record<string, string> = {}): Ctx {
  const h: Record<string, string> = { 'content-type': 'application/json', ...headers };
  if (token && !('authorization' in headers)) h.authorization = `Bearer ${token}`;
  return {
    request: new Request(`https://pickupwords.pages.dev${path}`, {
      method: 'POST',
      headers: h,
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
    env,
    params: {},
  };
}
const coins = () => (raw.prepare('SELECT coins FROM economy WHERE user_id = ?').get(USER) as { coins: number }).coins;

beforeEach(async () => {
  const db = fakeD1();
  raw = db.raw;
  env = { DB: db.d1, JWT_SECRET: SECRET, ASSETS: assets };
  raw.prepare('INSERT INTO users (id, created_at) VALUES (?, 0)').run(USER);
  raw.prepare('INSERT INTO economy (user_id) VALUES (?)').run(USER);
  token = await signJwt({ sub: USER }, SECRET);
});

describe('/api/migrate', () => {
  it('擋掉灌爆的金幣 / XP（金幣是付費貨幣）', async () => {
    const r = await migrate(ctx('/api/migrate', { coins: 99_999_999, xp: 99_999_999, streak: 99_999 }));
    expect(r.status).toBe(200);
    expect(coins()).toBeLessThanOrEqual(20_000);
  });

  it('只能合併一次，第二次回 409', async () => {
    expect((await migrate(ctx('/api/migrate', { coins: 50 }))).status).toBe(200);
    expect((await migrate(ctx('/api/migrate', { coins: 5000 }))).status).toBe(409);
    expect(coins()).toBe(50);
  });
});

describe('/api/lesson/complete', () => {
  it('不存在的 lessonId 不發獎', async () => {
    const r = await lessonComplete(ctx('/api/lesson/complete', { chapter: 1, lessonId: 'fake-999', correct: 50, total: 50 }));
    expect(r.status).toBe(400);
    expect(coins()).toBe(0);
  });

  it('答對數不能超過該課實際題數', async () => {
    const lesson = (JSON.parse(readFileSync(resolve(ROOT, 'public/lessons-ch1.json'), 'utf8')) as Array<{ id: string; questions: Array<{ type: string }> }>)[0];
    const r = await lessonComplete(ctx('/api/lesson/complete', { chapter: 1, lessonId: lesson.id, correct: 50, total: 50 }));
    const data = await r.json() as { awarded: boolean; coinGain: number };
    expect(data.awarded).toBe(true);
    // 旁白 (narration) 不算題
    expect(data.coinGain).toBe(lesson.questions.filter((q) => q.type !== 'narration').length * 3);
  });

  it('同一課同時送兩次只發一次', async () => {
    const body = { chapter: 1, lessonId: 'kt-ch1-l1', correct: 1, total: 1 };
    const [a, b] = await Promise.all([lessonComplete(ctx('/x', body)), lessonComplete(ctx('/x', body))]);
    expect([a.status, b.status]).toEqual([200, 200]);
    expect(coins()).toBe(3);
  });
});

describe('/api/chest/open', () => {
  it('寶箱 ID 只接受地圖索引數字', async () => {
    expect((await chestOpen(ctx('/api/chest/open', { chestId: 'abc' }))).status).toBe(400);
    expect((await chestOpen(ctx('/api/chest/open', { chestId: '3' }))).status).toBe(200);
    expect(coins()).toBe(10);
  });
});

describe('/api/auth/link', () => {
  it('同一個 email 10 分鐘內第 4 次起回 429（防寄信轟炸）', async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) statuses.push((await authLink(ctx('/api/auth/link', { email: 'a@b.co' }))).status);
    expect(statuses).toEqual([501, 501, 501, 429]);
  });
});

describe('/api/auth/consume', () => {
  it('同一個 magic-link 同時用兩次只成功一次', async () => {
    raw.prepare('INSERT INTO login_tokens (token, email, user_id, expires_at, used) VALUES (?, ?, ?, ?, 0)')
      .run('tok', 'a@b.co', USER, Date.now() + 60_000);
    const [a, b] = await Promise.all([authConsume(ctx('/x', { token: 'tok' })), authConsume(ctx('/x', { token: 'tok' }))]);
    expect([a.status, b.status].sort()).toEqual([200, 401]);
  });
});

describe('/api/iap/verify (Stripe webhook)', () => {
  async function sign(payload: string, t: number): Promise<string> {
    const k = await crypto.subtle.importKey('raw', new TextEncoder().encode('whsec'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(`${t}.${payload}`));
    return `t=${t},v1=${[...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')}`;
  }
  const payload = JSON.stringify({
    type: 'checkout.session.completed',
    data: { object: { id: 'cs_1', metadata: { userId: USER, productId: 'coins_pack_small' } } },
  });

  it('簽章正確且時間新 → 發幣', async () => {
    env.STRIPE_WEBHOOK_SECRET = 'whsec';
    const r = await iapVerify(ctx('/x', payload, { 'stripe-signature': await sign(payload, Math.floor(Date.now() / 1000)), authorization: '' }));
    expect(r.status).toBe(200);
    expect(coins()).toBe(500);
  });

  it('超過 5 分鐘的舊簽章拒收（防重放）', async () => {
    env.STRIPE_WEBHOOK_SECRET = 'whsec';
    const old = Math.floor(Date.now() / 1000) - 3600;
    const r = await iapVerify(ctx('/x', payload, { 'stripe-signature': await sign(payload, old), authorization: '' }));
    expect(r.status).toBe(400);
  });
});
