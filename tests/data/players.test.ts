import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ensureProfilesInit, listPlayers, getActivePlayer,
  createPlayer, switchPlayer,
} from '../../src/data/players';

function mockLs() {
  const store: Record<string, string> = {};
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  });
  return store;
}

describe('players — progress preservation', () => {
  let store: Record<string, string>;
  beforeEach(() => { store = mockLs(); });

  it('ensureProfilesInit seeds 玩家1 + 玩家2, active = 玩家1', () => {
    store['pickup.xp.total'] = '120'; // existing progress
    ensureProfilesInit();
    const list = listPlayers();
    expect(list.length).toBe(2);
    expect(getActivePlayer()?.name).toBe('玩家 1');
    // existing working set untouched (belongs to player 1 live)
    expect(store['pickup.xp.total']).toBe('120');
  });

  it('switching isolates progress and restores on switch-back', () => {
    store['pickup.xp.total'] = '120';
    store['pickup.coins.total'] = '40';
    ensureProfilesInit();
    const [p1, p2] = listPlayers();

    // switch to empty player 2 → progress cleared
    expect(switchPlayer(p2.id)).toBe(true);
    expect(localStorage.getItem('pickup.xp.total')).toBe(null);
    expect(getActivePlayer()?.id).toBe(p2.id);

    // earn some progress as player 2
    store['pickup.xp.total'] = '5';

    // switch back to player 1 → original progress restored
    expect(switchPlayer(p1.id)).toBe(true);
    expect(localStorage.getItem('pickup.xp.total')).toBe('120');
    expect(localStorage.getItem('pickup.coins.total')).toBe('40');

    // switch to player 2 again → its own progress (5) restored, not 120
    switchPlayer(p2.id);
    expect(localStorage.getItem('pickup.xp.total')).toBe('5');
  });

  it('device prefs (lang/theme/audio) do NOT travel between accounts', () => {
    store['pickup.lang'] = 'ja';
    store['pickup.xp.total'] = '99';
    ensureProfilesInit();
    const [, p2] = listPlayers();
    switchPlayer(p2.id);
    // lang stays global; xp cleared
    expect(localStorage.getItem('pickup.lang')).toBe('ja');
    expect(localStorage.getItem('pickup.xp.total')).toBe(null);
  });

  it('createPlayer adds an empty account', () => {
    ensureProfilesInit();
    const id = createPlayer('小明');
    expect(listPlayers().some((p) => p.id === id && p.name === '小明')).toBe(true);
  });
});
