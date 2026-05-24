import { create } from 'zustand';
import {
  loadSentences,
  pickByLevel,
  type ClozeLevel,
  type ClozeQuestion,
} from '../data/sentences';
import {
  loadScenarios,
  questionsForScenario,
  toClozeQuestion,
  type ScenarioId,
  type ScenarioQuestion,
} from '../data/scenarios';

/**
 * runStore — cloze run state.
 *
 * v0.3 adds scenario mode on top of free practice:
 *   - mode === 'free'      → 10 random A2 questions from sentences.json
 *   - mode === 'scenario'  → 10 fixed-order questions from one scenario in
 *                            scenarios.json
 *
 * Same scoring + HP + reveal flow either way. The mode only changes how the
 * pool is built (random shuffle vs. fixed sequence) and what the UI shows
 * around the question (mascot, scenario strip, achievement on EndScene).
 */

export type RunMode = 'free' | 'scenario';

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
  // Content — free practice pool
  questions: ClozeQuestion[] | null;
  // Content — scenario pool (all scenarios, filtered at run-start)
  scenarioQuestions: ScenarioQuestion[] | null;

  pool: ClozeQuestion[]; // remaining queue for the current run
  round: ClozeQuestion | null;

  // Score / lives
  score: number;
  hp: number;
  streak: number;
  bestStreak: number;
  history: HistoryEntry[];

  lastResult: PlayResult | null;
  answered: boolean;

  // Mode + level
  mode: RunMode;
  scenario: ScenarioId | null;
  level: ClozeLevel;

  // Loading
  loading: boolean;
  error: string | null;

  // Actions
  loadSentences: () => Promise<void>;
  loadScenarios: () => Promise<void>;
  setLevel: (level: ClozeLevel) => void;
  setMode: (mode: RunMode) => void;
  setScenario: (scenario: ScenarioId | null) => void;
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
  scenarioQuestions: null,
  pool: [],
  round: null,
  score: 0,
  hp: STARTING_HP,
  streak: 0,
  bestStreak: 0,
  history: [],
  lastResult: null,
  answered: false,
  mode: 'free',
  scenario: null,
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

  loadScenarios: async () => {
    if (get().scenarioQuestions || get().loading) return;
    set({ loading: true, error: null });
    try {
      const v = await loadScenarios();
      set({ scenarioQuestions: v, loading: false });
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

  setMode: (mode: RunMode) => {
    set({ mode });
  },

  setScenario: (scenario: ScenarioId | null) => {
    set({ scenario });
  },

  startRound: () => {
    const { questions, scenarioQuestions, level, pool, mode, scenario } = get();

    let nextPool = pool;
    if (nextPool.length === 0) {
      if (mode === 'scenario' && scenario && scenarioQuestions) {
        // Scenario mode: fixed order, 10 questions.
        nextPool = questionsForScenario(scenarioQuestions, scenario).map(
          toClozeQuestion
        );
      } else if (questions) {
        // Free practice: random shuffle by level.
        nextPool = pickByLevel(questions, level, QUESTIONS_PER_RUN);
      }
    }
    if (nextPool.length === 0) {
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
