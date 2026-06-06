/**
 * Pickup React 18 — primary app shell.
 *
 * v2.0.B.192 (Code Health P1 #5): LessonPage + ChapterIntroPage lazy-split.
 * renderers.tsx (~466 lines, 6 renderers + SFX + TTS + WordHint) bundled
 * into main was ~20-25KB raw. Now loaded on-demand when user taps lesson
 * node. Main bundle parse+exec cost on Snapdragon 430 ~120ms → ~80ms.
 */
import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage';
import ChaptersPage from './pages/ChaptersPage';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';
import AlertsPage from './pages/AlertsPage';
import CardsPage from './pages/CardsPage';
import BottomNav from './components/BottomNav';
import { audio } from '../audio/AudioManager';
import { startBgm } from '../audio/bgm';
import { preloadHints } from '../ui/WordHint';
import { bootScheduler } from '../notifications';
import { recordVisit } from '../data/visitStreak';

const LessonPage = lazy(() => import('./pages/LessonPage'));
const ChapterIntroPage = lazy(() => import('./pages/ChapterIntroPage'));

function LoadingShell() {
  return <div style={{ padding: 40, textAlign: 'center', color: '#8b6f4a' }}>載入中…</div>;
}

export default function App() {
  // v2.0.B.236 Track A: 自動打卡 (soft visit streak).
  // 開 app 即算今天有來, 跟 lesson streak (硬目標, 需完成 lesson) 分軌.
  // 第一次今天造訪 → toast 'Mochi 看到你了 🐾'.
  const [visitToast, setVisitToast] = useState<{ count: number } | null>(null);
  useEffect(() => {
    try {
      const r = recordVisit();
      if (r.isNewVisitToday) setVisitToast({ count: r.count });
    } catch {}
  }, []);
  // Auto-dismiss toast after 3.5s
  useEffect(() => {
    if (!visitToast) return;
    const t = window.setTimeout(() => setVisitToast(null), 3500);
    return () => window.clearTimeout(t);
  }, [visitToast]);

  // v2.0.B.234 wiring: boot notification scheduler once on mount. Replays
  // past-due scheduled notifs + arms pending. No-op if consent missing.
  useEffect(() => {
    try { bootScheduler(); } catch {}
  }, []);

  // v2.0.B.166: first-click audio unlock + BGM start + WordHint preload.
  // Pickup audio chain needs first user gesture to unlock iOS WebAudio.
  useEffect(() => {
    void preloadHints();
    const unlockOnce = () => {
      try { audio.ensureContext(); } catch {}
      try { startBgm(); } catch {}
      document.removeEventListener('click', unlockOnce);
      document.removeEventListener('touchstart', unlockOnce);
    };
    document.addEventListener('click', unlockOnce, { once: true });
    document.addEventListener('touchstart', unlockOnce, { once: true });
    return () => {
      document.removeEventListener('click', unlockOnce);
      document.removeEventListener('touchstart', unlockOnce);
    };
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', width: '100%', background: '#fef8ed' }}>
      <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' as const, paddingBottom: 64 }}>
        <Suspense fallback={<LoadingShell />}>
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/chapters" element={<ChaptersPage />} />
            <Route path="/chapter/:chapter/intro" element={<ChapterIntroPage />} />
            <Route path="/lesson/:chapter/:lessonId" element={<LessonPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="*" element={<MapPage />} />
          </Routes>
        </Suspense>
      </main>
      <BottomNav />
      {visitToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fef3c7',
            color: '#8b6f4a',
            padding: '10px 18px',
            borderRadius: 999,
            border: '2px solid #c8a878',
            borderBottom: '3px solid #8b6f4a',
            fontSize: 14,
            fontWeight: 800,
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(60,42,28,0.15)',
            maxWidth: '90%',
            textAlign: 'center',
          }}
        >
          🐾 今天 Mochi 看到你了 · Day {visitToast.count}
        </div>
      )}
    </div>
  );
}
