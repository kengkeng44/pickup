import { create } from 'zustand';
import {
  loadSentences,
  pickByLevel,
  type ClozeLevel,
  type ClozeQuestion,
} from '../data/sentences';

/**
 * runStore — cloze run state.
 *
 * Game loop (cloze v0):
 *   - Player picks level (gated to A2 for v0).
 *   - Each round = one ClozeQuestion: sentence + 4 options.
 *   - Tap option → answered. Correct adds points, wrong loses HP.
 *   - 10 rounds, or until HP runs out.
 *   - Timer: 15s/round; timeout = wrong + HP loss.
 *
 * Reveal phase: between answer and next round, both PlayScene + ClozeUI need
 * to know which option was tapped, whether it was correct, and surface the
 * explanation. We store this in `lastResult` and clear on startRound().
 */

export interface PlayResult {
  correct: boolean;
  pointsGained: number;
  streak: number;
  selectedIndex: number;
  correctIndex: number;
  explanationZh: string;
}

export interface HistoryEntry {
  question: ClozeQuestion;
  selectedIndex: number | null; // null = timeout
  correct: boolean;
}

export interface RunState {
  // Content
  questions: ClozeQuestion[] | null;
  pool: ClozeQuestion[]; // shuffled remaining queue for current run
  round: ClozeQuestion | null;

  // Score / lives
  score: number;
  hp: number;
  streak: number;
  bestStreak: number;
  history: HistoryEntry[];

  // Reveal state — non-null between tap-answer and next round
  lastResult: PlayResult | null;
  answered: boolean;

  // Level
  level: ClozeLevel;

  // Loading
  loading: boolean;
  error: string | null;

  // Actions
  loadSentences: () => Promise<void>;
  setLevel: (level: ClozeLevel) => void;
  startRound: () => void;
  answer: (selectedIndex: number) => PlayResult;
  timeoutRound: () => PlayResult;
  reset: () => void;
}

const STARTING_HP = 3;
const POINTS_BASE = 10;
const STREAK_BONUS_STEP = 2;
const STREAK_BONUS_CAP = 10;
const QUESTIONS_PER_RUN = 10;

const LS_LEVEL = 'wordwar.level';

function readLevel(): ClozeLevel {
  if (typeof localStorage === 'undefined') return 'A2';
  try {
    const v = localStorage.getItem(LS_LEVEL);
    if (
      v === 'A1' ||
      v === 'A2' ||
      v === 'B1' ||
      v === 'B2' ||
      v === 'C1' ||
      v === 'C2'
    ) {
      return v;
    }
  } catch {
    // ignore
  }
  return 'A2';
}

function writeLevel(level: ClozeLevel): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_LEVEL, level);
  } catch {
    // ignore
  }
}

export const useRunStore = create<RunState>((set, get) => ({
  questions: null,
  pool: [],
  round: null,
  score: 0,
  hp: STARTING_HP,
  streak: 0,
  bestStreak: 0,
  history: [],
  lastResult: null,
  answered: false,
  level: readLevel(),
  loading: false,
  error: null,

  loadSentences: async () => {
    if (get().questions || get().loading) return;
    set({ loading: true, error: null });
    try {
      const v = await loadSentences();
      set({ questions: v, loading: false });
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  },

  setLevel: (level: ClozeLevel) => {
    writeLevel(level);
    set({ level });
  },

  startRound: () => {
    const { questions, level, pool } = get();
    if (!questions) return;
    let nextPool = pool;
    if (nextPool.length === 0) {
      nextPool = pickByLevel(questions, level, QUESTIONS_PER_RUN);
    }
    if (nextPool.length === 0) {
      // No questions at this level — bail out silently; PlayScene will see
      // null round and route to end. (Shouldn't happen for A2 in v0.)
      set({ round: null });
      return;
    }
    const [next, ...rest] = nextPool;
    set({
      round: next,
      pool: rest,
      lastResult: null,
      answered: false,
    });
  },

  answer: (selectedIndex: number): PlayResult => {
    const { round, score, hp, history, streak, bestStreak, answered } = get();
    if (!round || answered) {
      return {
        correct: false,
        pointsGained: 0,
        streak,
        selectedIndex,
        correctIndex: round?.correctIndex ?? 0,
        explanationZh: round?.explanationZh ?? '',
      };
    }
    const correct = selectedIndex === round.correctIndex;
    const newStreak = correct ? streak + 1 : 0;
    const streakBonus = correct
      ? Math.min(STREAK_BONUS_CAP, Math.max(0, streak) * STREAK_BONUS_STEP)
      : 0;
    const pointsGained = correct ? POINTS_BASE + streakBonus : 0;

    const entry: HistoryEntry = {
      question: round,
      selectedIndex,
      correct,
    };
    const result: PlayResult = {
      correct,
      pointsGained,
      streak: newStreak,
      selectedIndex,
      correctIndex: round.correctIndex,
      explanationZh: round.explanationZh,
    };
    set({
      history: [...history, entry],
      score: score + pointsGained,
      hp: correct ? hp : Math.max(0, hp - 1),
      streak: newStreak,
      bestStreak: Math.max(bestStreak, newStreak),
      answered: true,
      lastResult: result,
    });
    return result;
  },

  timeoutRound: (): PlayResult => {
    const { round, hp, history, answered } = get();
    if (!round || answered) {
      return {
        correct: false,
        pointsGained: 0,
        streak: 0,
        selectedIndex: -1,
        correctIndex: round?.correctIndex ?? 0,
        explanationZh: round?.explanationZh ?? '',
      };
    }
    const entry: HistoryEntry = {
      question: round,
      selectedIndex: null,
      correct: false,
    };
    const result: PlayResult = {
      correct: false,
      pointsGained: 0,
      streak: 0,
      selectedIndex: -1,
      correctIndex: round.correctIndex,
      explanationZh: round.explanationZh,
    };
    set({
      history: [...history, entry],
      hp: Math.max(0, hp - 1),
      streak: 0,
      answered: true,
      lastResult: result,
    });
    return result;
  },

  reset: () => {
    set({
      round: null,
      pool: [],
      score: 0,
      hp: STARTING_HP,
      streak: 0,
      bestStreak: 0,
      history: [],
      lastResult: null,
      answered: false,
    });
  },
}));

export const RUN_CONFIG = {
  QUESTIONS_PER_RUN,
  STARTING_HP,
};
