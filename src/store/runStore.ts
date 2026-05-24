import { create } from 'zustand';
import type { Vocab } from '../data/vocab';
import { isAntonym, isSynonym, loadVocab, samePOS } from '../data/vocab';
import type { Round } from '../data/roundGenerator';
import { generateRound } from '../data/roundGenerator';

export interface PlayResult {
  correct: boolean;
  reason: string;
  pointsGained: number;
  streak: number;
}

export interface HistoryEntry {
  round: Round;
  played: string | null; // null = timeout / no answer
  correct: boolean;
}

export interface RunState {
  vocab: Vocab | null;
  round: Round | null;
  score: number;
  hp: number;
  streak: number;
  bestStreak: number;
  history: HistoryEntry[];
  loading: boolean;
  error: string | null;
  loadVocab: () => Promise<void>;
  startRound: () => void;
  playCard: (card: string) => PlayResult;
  timeoutRound: () => PlayResult;
  reset: () => void;
}

const STARTING_HP = 3;
const POINTS_BASE = 10;
// Streak bonus: +2 per streak step, capped at +10 (so max 20 per card at streak 5+).
const STREAK_BONUS_STEP = 2;
const STREAK_BONUS_CAP = 10;

export const useRunStore = create<RunState>((set, get) => ({
  vocab: null,
  round: null,
  score: 0,
  hp: STARTING_HP,
  streak: 0,
  bestStreak: 0,
  history: [],
  loading: false,
  error: null,

  loadVocab: async () => {
    if (get().vocab || get().loading) return;
    set({ loading: true, error: null });
    try {
      const v = await loadVocab();
      set({ vocab: v, loading: false });
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  },

  startRound: () => {
    const { vocab } = get();
    if (!vocab) return;
    const round = generateRound(vocab);
    set({ round });
  },

  playCard: (card: string): PlayResult => {
    const { vocab, round, score, hp, history, streak, bestStreak } = get();
    if (!vocab || !round) {
      return { correct: false, reason: 'No active round', pointsGained: 0, streak };
    }

    const matcher =
      round.type === 'syn'
        ? isSynonym
        : round.type === 'ant'
        ? isAntonym
        : samePOS;
    const correct = matcher(card, round.target, vocab);

    const newStreak = correct ? streak + 1 : 0;
    const streakBonus = correct
      ? Math.min(STREAK_BONUS_CAP, Math.max(0, streak) * STREAK_BONUS_STEP)
      : 0;
    const pointsGained = correct ? POINTS_BASE + streakBonus : 0;

    const entry: HistoryEntry = { round, played: card, correct };
    set({
      history: [...history, entry],
      score: score + pointsGained,
      hp: correct ? hp : Math.max(0, hp - 1),
      streak: newStreak,
      bestStreak: Math.max(bestStreak, newStreak),
    });

    return {
      correct,
      reason: correct
        ? `${card} is a valid ${labelFor(round.type)} of ${round.target}`
        : `${card} is not a ${labelFor(round.type)} of ${round.target}`,
      pointsGained,
      streak: newStreak,
    };
  },

  timeoutRound: (): PlayResult => {
    const { round, hp, history, streak } = get();
    if (!round) {
      return { correct: false, reason: 'No active round', pointsGained: 0, streak };
    }
    const entry: HistoryEntry = { round, played: null, correct: false };
    set({
      history: [...history, entry],
      hp: Math.max(0, hp - 1),
      streak: 0,
    });
    return {
      correct: false,
      reason: 'Time ran out',
      pointsGained: 0,
      streak: 0,
    };
  },

  reset: () => {
    set({
      round: null,
      score: 0,
      hp: STARTING_HP,
      streak: 0,
      bestStreak: 0,
      history: [],
    });
  },
}));

function labelFor(type: Round['type']): string {
  switch (type) {
    case 'syn':
      return 'synonym';
    case 'ant':
      return 'antonym';
    case 'pos':
      return 'same-POS match';
  }
}
