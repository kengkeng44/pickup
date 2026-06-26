/**
 * 多帳號 / 進度保留 (v2.0.B.436, per user 「我想要進度保留功能」).
 *
 * 做法 = snapshot/restore 工作集 (不改任何遊戲模組):
 *   全部進度都存在一堆 `pickup.*` localStorage key。切帳號時:
 *     1. 把目前所有「進度型」pickup.* key 快照存進舊帳號的 data。
 *     2. 清掉這些 key。
 *     3. 把目標帳號的 data 寫回這些 key。
 *     4. 設 active = 目標, reload (讓 React 重讀)。
 *   遊戲模組照常讀 pickup.xp.total 等, 完全無感。
 *
 * 「裝置型」偏好 (語言 / 主題 / 音效 / 後端 token) 不隨帳號切換 (留全域)。
 */

const REG_KEY = 'pickup.players';            // { activeId, list:[{id,name,createdAt}] }
const DATA_PREFIX = 'pickup.player.';        // pickup.player.{id}.data = JSON 快照

// 不隨帳號切換的「裝置 / 全域」key (前綴比對)。其餘 pickup.* 都算「進度」。
const GLOBAL_PREFIXES = [
  'pickup.players',
  'pickup.player.',
  'pickup.lang',
  'pickup.theme',
  'pickup.audio.',
  'pickup.backend.',
  'pickup.analytics',
  'pickup.device',
  'pickup.account',
];

export interface PlayerMeta { id: string; name: string; createdAt: number; }
interface Registry { activeId: string; list: PlayerMeta[]; }

function ls(): Storage | null {
  try { return typeof localStorage !== 'undefined' ? localStorage : null; } catch { return null; }
}

function isProgressKey(k: string): boolean {
  if (!k.startsWith('pickup.')) return false;
  return !GLOBAL_PREFIXES.some((p) => k === p || k.startsWith(p));
}

function genId(): string {
  // 不能用 Math.random (環境限制無妨, 但求穩定): 用時間戳 + 計數。
  const s = ls();
  let n = 1;
  try { n = Number(s?.getItem('pickup.players.seq') || '0') + 1; s?.setItem('pickup.players.seq', String(n)); } catch {}
  return 'p' + n;
}

function readRegistry(): Registry | null {
  const s = ls();
  if (!s) return null;
  try {
    const raw = s.getItem(REG_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as Registry;
    if (!r || !Array.isArray(r.list) || !r.activeId) return null;
    return r;
  } catch { return null; }
}

function writeRegistry(r: Registry): void {
  try { ls()?.setItem(REG_KEY, JSON.stringify(r)); } catch {}
}

/**
 * App 啟動時呼叫。沒有 registry → 建立 p1 (沿用現有進度, 命名「玩家 1」)
 * + 預設多開一個空的「玩家 2 (測試)」帳號讓作者驗證進度保留。
 */
export function ensureProfilesInit(): void {
  if (readRegistry()) return;
  const s = ls();
  if (!s) return;
  const p1: PlayerMeta = { id: genId(), name: '玩家 1', createdAt: 0 };
  const p2: PlayerMeta = { id: genId(), name: '玩家 2（測試）', createdAt: 0 };
  // p1 = 現有工作集 (不動 LS, 它就是 p1 的 live data)。p2 = 空帳號。
  try { s.setItem(DATA_PREFIX + p2.id + '.data', '{}'); } catch {}
  writeRegistry({ activeId: p1.id, list: [p1, p2] });
}

export function listPlayers(): PlayerMeta[] {
  return readRegistry()?.list ?? [];
}

export function getActivePlayer(): PlayerMeta | null {
  const r = readRegistry();
  if (!r) return null;
  return r.list.find((p) => p.id === r.activeId) ?? null;
}

/** 蒐集目前所有進度型 key → 物件。 */
function snapshotProgress(): Record<string, string> {
  const s = ls();
  const out: Record<string, string> = {};
  if (!s) return out;
  for (let i = 0; i < s.length; i++) {
    const k = s.key(i);
    if (k && isProgressKey(k)) { const v = s.getItem(k); if (v != null) out[k] = v; }
  }
  return out;
}

function clearProgress(): void {
  const s = ls();
  if (!s) return;
  const kill: string[] = [];
  for (let i = 0; i < s.length; i++) { const k = s.key(i); if (k && isProgressKey(k)) kill.push(k); }
  for (const k of kill) { try { s.removeItem(k); } catch {} }
}

function loadProgress(data: Record<string, string>): void {
  const s = ls();
  if (!s) return;
  for (const [k, v] of Object.entries(data)) { try { s.setItem(k, v); } catch {} }
}

/** 建立新帳號 (空進度)。回傳新 id。不自動切換。 */
export function createPlayer(name: string): string {
  const r = readRegistry() ?? { activeId: '', list: [] };
  const id = genId();
  const meta: PlayerMeta = { id, name: name.trim() || `玩家 ${r.list.length + 1}`, createdAt: 0 };
  try { ls()?.setItem(DATA_PREFIX + id + '.data', '{}'); } catch {}
  r.list.push(meta);
  if (!r.activeId) r.activeId = id;
  writeRegistry(r);
  return id;
}

export function renamePlayer(id: string, name: string): void {
  const r = readRegistry();
  if (!r) return;
  const p = r.list.find((x) => x.id === id);
  if (p) { p.name = name.trim() || p.name; writeRegistry(r); }
}

/**
 * 切換帳號:快照目前進度給舊帳號 → 清空 → 載入新帳號進度 → reload。
 * @returns true 若有實際切換 (呼叫端可據此 reload)。
 */
export function switchPlayer(id: string): boolean {
  const r = readRegistry();
  if (!r || id === r.activeId) return false;
  const s = ls();
  if (!s) return false;
  // 1. 快照舊帳號
  try { s.setItem(DATA_PREFIX + r.activeId + '.data', JSON.stringify(snapshotProgress())); } catch {}
  // 2. 清空工作集
  clearProgress();
  // 3. 載入新帳號
  let data: Record<string, string> = {};
  try { data = JSON.parse(s.getItem(DATA_PREFIX + id + '.data') || '{}'); } catch {}
  loadProgress(data);
  // 4. 設 active
  r.activeId = id;
  writeRegistry(r);
  return true;
}

/** 刪除帳號 (不能刪當前 active)。 */
export function deletePlayer(id: string): void {
  const r = readRegistry();
  if (!r || id === r.activeId || r.list.length <= 1) return;
  r.list = r.list.filter((p) => p.id !== id);
  try { ls()?.removeItem(DATA_PREFIX + id + '.data'); } catch {}
  writeRegistry(r);
}
