// HS256 JWT via Web Crypto (runs on Cloudflare Workers runtime).

function b64urlEncode(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecode(str: string): Uint8Array {
  const pad = str.length % 4 ? 4 - (str.length % 4) : 0;
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function key(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export interface JwtPayload {
  sub: string; // userId
  exp: number; // epoch seconds
  [k: string]: unknown;
}

export async function signJwt(payload: Omit<JwtPayload, 'exp'> & { exp?: number }, secret: string, ttlSec = 60 * 60 * 24 * 365): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body: JwtPayload = { ...payload, exp: payload.exp ?? Math.floor(Date.now() / 1000) + ttlSec };
  const enc = (o: unknown) => b64urlEncode(new TextEncoder().encode(JSON.stringify(o)));
  const data = `${enc(header)}.${enc(body)}`;
  const sig = await crypto.subtle.sign('HMAC', await key(secret), new TextEncoder().encode(data));
  return `${data}.${b64urlEncode(new Uint8Array(sig))}`;
}

export async function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [h, p, s] = parts;
    const ok = await crypto.subtle.verify(
      'HMAC',
      await key(secret),
      b64urlDecode(s),
      new TextEncoder().encode(`${h}.${p}`),
    );
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(p))) as JwtPayload;
    if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
