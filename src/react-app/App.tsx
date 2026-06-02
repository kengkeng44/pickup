/**
 * Pickup React 18 — primary app shell.
 *
 * v2.0.B.192 (Code Health P1 #5): LessonPage + ChapterIntroPage lazy-split.
 * renderers.tsx (~466 lines, 6 renderers + SFX + TTS + WordHint) bundled
 * into main was ~20-25KB raw. Now loaded on-demand when user taps lesson
 * node. Main bundle parse+exec cost on Snapdragon 430 ~120ms → ~80ms.
 */
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage';
import ChaptersPage from './pages/ChaptersPage';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';
import AlertsPage from './pages/AlertsPage';
import BottomNav from './components/BottomNav';
import { audio } from '../audio/AudioManager';
import { startBgm } from '../audio/bgm';
import { preloadHints } from '../ui/WordHint';

const LessonPage = lazy(() => import('./pages/LessonPage'));
const ChapterIntroPage = lazy(() => import('./pages/ChapterIntroPage'));

function LoadingShell() {
  return <div style={{ padding: 40, textAlign: 'center', color: '#8b6f4a' }}>載入中…</div>;
}

export default function App() {
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
            <Route path="*" element={<MapPage />} />
          </Routes>
        </Suspense>
      </main>
      <BottomNav />
    </div>
  );
}
