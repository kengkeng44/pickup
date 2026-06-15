// Shared HTTP + auth helpers for Pickup API functions.
import type { Ctx, Env } from './types';
import { verifyJwt, type JwtPayload } from './jwt';

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

// Backend is only "live" when DB binding + JWT secret are provisioned.
// Until then every endpoint returns 503 and the frontend stays on localStorage.
export function ensureProvisioned(env: Env): Response | null {
  if (!env.DB || !env.JWT_SECRET) {
    return json({ error: 'backend_not_provisioned' }, 503);
  }
  return null;
}

export async function readBody<T = Record<string, unknown>>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    return {} as T;
  }
}

// Pull + verify the bearer JWT → userId, or null.
export async function auth(ctx: Ctx): Promise<JwtPayload | null> {
  const h = ctx.request.headers.get('authorization') || '';
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m || !ctx.env.JWT_SECRET) return null;
  return verifyJwt(m[1], ctx.env.JWT_SECRET);
}

export function uuid(): string {
  return crypto.randomUUID();
}

export function now(): number {
  return Date.now();
}
