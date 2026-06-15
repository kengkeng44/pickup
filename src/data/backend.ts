/**
 * Backend client — v2.0.B.308 (P1 sync layer).
 *
 * 連 Cloudflare Pages Functions (/api/*) + D1. 設計原則:**後端沒接好前,app 照常**。
 * - 端點未 provision → 回 503 → 這裡標記 off → 全程 no-op,沿用 localStorage。
 * - provision 後 (建 D1 + 設 JWT_SECRET + apply migrations + redeploy) 自動啟用:
 *   首次開 app 領匿名 token → migrate 本機進度上推 (server max 合併) → pull 回寫本機 cache。
 *
 * 反作弊 (P2) 的 server 權威 helper 也在此 (serverCompleteLesson / serverOpenChest /
 * serverRename),待 call site 切換時使用 (需 live DB 才能測,故本 ship 先備好不強制接)。
 */

const KEYS = {
  token: 'pickup.backend.token',
  off: 'pickup.backend.off', // session-scoped: 後端不可用就別一直敲
  migrated: 'pickup.backend.migrated',
  coins: 'pickup.coins.total',
  xp: 'pickup.xp.total',
  streak: 'pickup.streak.count',
  catName: 'pickup.catName',
  renameCount: 'pickup.catName.changes',
} as const;

const lessonsKey = (ch: number) => `pickup.chapter.${ch}.lessons.completed`;
const chestKey = (id: string) => `pickup.chest.${id}.opened`;

let liveState: 'unknown' | 'live' | 'off' = 'unknown';

function ls(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}
function getToken(): string | null { return ls()?.getItem(KEYS.token) ?? null; }
function setToken(t: string): void { try { ls()?.setItem(KEYS.token, t); } catch { /* ignore */ } }
function markOff(): void {
  liveState = 'off';
  try { window.sessionStorage.setItem(KEYS.off, '1'); } catch { /* ignore */ }
}

export function isBackendLive(): boolean { return liveState === 'live'; }

async function apiFetch(path: string, init?: RequestInit): Promise<Response | null> {
  if (liveState === 'off') return null;
  const token = getToken();
  const headers: Record<string, string> = { 'content-type': 'application/json', ...(init?.headers as Record<string, string> | undefined) };
  if (token) headers.authorization = `Bearer ${token}`;
  try {
    const res = await fetch(path, { ...init, headers });
    if (res.status === 503) { markOff(); return null; }
    return res;
  } catch {
    return null; // network fail → silent, stay on localStorage
  }
}

// ── reconcile server state → local cache (so existing UI reads reflect server) ──
interface ServerState {
  catName?: string;
  renameCount?: number;
  economy?: { coins?: number; xp?: number; streak?: number };
  completedLessons?: Array<{ chapter: number; lessonId: string }>;
  openedChests?: string[];
}
function writeNum(key: string, v: unknown): void {
  if (typeof v === 'number' && Number.isFinite(v) && v >= 0) {
    try { ls()?.setItem(key, String(Math.floor(v))); } catch { /* ignore */ }
  }
}
function reconcile(state: ServerState): void {
  const store = ls();
  if (!store) return;
  writeNum(KEYS.coins, state.economy?.coins);
  writeNum(KEYS.xp, state.economy?.xp);
  writeNum(KEYS.streak, state.economy?.streak);
  writeNum(KEYS.renameCount, state.renameCount);
  if (typeof state.catName === 'string' && state.catName) {
    try { store.setItem(KEYS.catName, state.catName); } catch { /* ignore */ }
  }
  if (Array.isArray(state.completedLessons)) {
    const byChapter = new Map<number, string[]>();
    for (const c of state.completedLessons) {
      if (!c || typeof c.lessonId !== 'string') continue;
      const arr = byChapter.get(c.chapter) ?? [];
      arr.push(c.lessonId);
      byChapter.set(c.chapter, arr);
    }
    for (const [ch, ids] of byChapter) {
      try { store.setItem(lessonsKey(ch), JSON.stringify([...new Set(ids)])); } catch { /* ignore */ }
    }
  }
  if (Array.isArray(state.openedChests)) {
    for (const id of state.openedChests) {
      if (typeof id === 'string') { try { store.setItem(chestKey(id), '1'); } catch { /* ignore */ } }
    }
  }
}

// ── gather local state → push to server (one-time migration) ──
function gatherLocal(): ServerState {
  const store = ls();
  const num = (k: string) => { const v = Number(store?.getItem(k)); return Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0; };
  const completedLessons: Array<{ chapter: number; lessonId: string }> = [];
  const openedChests: string[] = [];
  if (store) {
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i);
      if (!k) continue;
      const mL = k.match(/^pickup\.chapter\.(\d+)\.lessons\.completed$/);
      if (mL) {
        try {
          const arr = JSON.parse(store.getItem(k) || '[]');
          if (Array.isArray(arr)) for (const id of arr) if (typeof id === 'string') completedLessons.push({ chapter: Number(mL[1]), lessonId: id });
        } catch { /* ignore */ }
        continue;
      }
      const mC = k.match(/^pickup\.chest\.(.+)\.opened$/);
      if (mC && store.getItem(k) === '1') openedChests.push(mC[1]);
    }
  }
  return {
    catName: store?.getItem(KEYS.catName) ?? undefined,
    renameCount: num(KEYS.renameCount),
    economy: { coins: num(KEYS.coins), xp: num(KEYS.xp), streak: num(KEYS.streak) },
    completedLessons,
    openedChests,
  };
}

// ── magic-link consume (P3): URL ?login=token → JWT ──
async function consumeLoginFromUrl(): Promise<void> {
  let token: string | null = null;
  try { token = new URLSearchParams(window.location.search).get('login'); } catch { return; }
  if (!token) return;
  const res = await apiFetch('/api/auth/consume', { method: 'POST', body: JSON.stringify({ token }) });
  if (res && res.ok) {
    const data = await res.json() as { token?: string };
    if (data.token) setToken(data.token);
  }
  // strip ?login from URL regardless
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('login');
    window.history.replaceState({}, '', url.toString());
  } catch { /* ignore */ }
}

/** Boot — fire-and-forget from main.tsx. Never throws; no-op if backend off. */
export async function initBackend(): Promise<void> {
  try {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem(KEYS.off) === '1') { liveState = 'off'; return; }

    await consumeLoginFromUrl();

    // 1) ensure token (anon if none)
    if (!getToken()) {
      const res = await apiFetch('/api/auth/anon', { method: 'POST' });
      if (!res || !res.ok) { markOff(); return; }
      const data = await res.json() as { token?: string };
      if (!data.token) { markOff(); return; }
      setToken(data.token);
    }
    liveState = 'live';

    // 2) one-time migrate local → server (max merge)
    if (ls()?.getItem(KEYS.migrated) !== '1') {
      const res = await apiFetch('/api/migrate', { method: 'POST', body: JSON.stringify(gatherLocal()) });
      if (res && res.ok) { try { ls()?.setItem(KEYS.migrated, '1'); } catch { /* ignore */ } }
    }

    // 3) pull authoritative state → reconcile local cache
    const res = await apiFetch('/api/state');
    if (res && res.ok) reconcile(await res.json() as ServerState);
  } catch {
    markOff();
  }
}

// ── P2 server-authoritative helpers (待 call site 切換; 回 null = 用本機 fallback) ──
export async function serverCompleteLesson(chapter: number, lessonId: string, correct: number, total: number): Promise<{ awarded: boolean; economy: { coins: number; xp: number; streak: number } } | null> {
  const res = await apiFetch('/api/lesson/complete', { method: 'POST', body: JSON.stringify({ chapter, lessonId, correct, total }) });
  if (!res || !res.ok) return null;
  return res.json();
}
export async function serverOpenChest(chestId: string): Promise<{ opened: boolean; economy: { coins: number } } | null> {
  const res = await apiFetch('/api/chest/open', { method: 'POST', body: JSON.stringify({ chestId }) });
  if (!res || !res.ok) return null;
  return res.json();
}
export async function serverRename(name: string): Promise<{ ok?: boolean; error?: string; coins?: number; renameCount?: number } | null> {
  const res = await apiFetch('/api/rename', { method: 'POST', body: JSON.stringify({ name }) });
  if (!res) return null;
  return res.json();
}
