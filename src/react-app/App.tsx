/**
 * Pickup React 18 — primary app shell.
 *
 * v2.0.B.192 (Code Health P1 #5): LessonPage + ChapterIntroPage lazy-split.
 * renderers.tsx (~466 lines, 6 renderers + SFX + TTS + WordHint) bundled
 * into main was ~20-25KB raw. Now loaded on-demand when user taps lesson
 * node. Main bundle parse+exec cost on Snapdragon 430 ~120ms → ~80ms.
 */
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MapPage from './pages/MapPage';
import ChaptersPage from './pages/ChaptersPage';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';
import AlertsPage from './pages/AlertsPage';
import CardsPage from './pages/CardsPage';
import ParentPage from './pages/ParentPage';
import SettingsPage from './pages/SettingsPage';
import BottomNav from './components/BottomNav';
import { audio } from '../audio/AudioManager';
import { startBgm } from '../audio/bgm';
import { preloadHints } from '../ui/WordHint';

const LessonPage = lazy(() => import('./pages/LessonPage'));
const ChapterIntroPage = lazy(() => import('./pages/ChapterIntroPage'));

function LoadingShell() {
  return <div style={{ padding: 40, textAlign: 'center', color: 'var(--t-text-muted)' }}>載入中…</div>;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // v2.0.B.278 PWA cold-start guard: iOS PWA standalone 會 resume last URL
  // (即使 manifest start_url='/' 也常被忽略). User 上次離開時若在 /cards 或 /chapters,
  // 下次打開 PWA 還會在那裡, user 體感「一打開又是圖鑑」. 偵測 cold start + standalone +
  // path 不是 / → force 回 /. 不影響外部 deep link (有 referrer 就 skip).
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as { standalone?: boolean }).standalone === true;
    if (!isStandalone) return;
    if (document.referrer !== '') return; // 從外部連結進來 = 保留 deep link
    if (location.pathname === '/') return;
    // PWA cold open at non-root → 永遠回地圖 (user expectation)
    navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', width: '100%', background: 'var(--t-bg)' }}>
      {/* v2.0.B.276 ARCHITECTURE FIX: 拿掉 `overflowY: 'auto'` + `WebkitOverflowScrolling: 'touch'`.
          舊設計把 main 設成 scroll container, 但所有 React scroll listener / scrollRestoration /
          virtualization library / IntersectionObserver 都 default 對 window. 結果:
          MapPage window scroll listener 永遠不 fire (window.scrollY=0 always) → 虛擬化壞掉 +
          scrollIntoView guard 失效 + 滑一點跳頂 + 一進去畫面亂跳. 改 window scroll 為唯一 truth,
          所有 patch 自動 work, 維護 future-proof.
          paddingBottom: 64 留著 — CSS padding 跟 scroll 無關, BottomNav (fixed bottom:0) 仍需 clearance. */}
      <main style={{ flex: 1, paddingBottom: 64 }}>
        <Suspense fallback={<LoadingShell />}>
          <Routes>
            {/* v2.0.B.266: '/' 還原 MapPage (user: 「參照原版地圖格式昨天前, 不要改變任何東西, 只要加按鈕即可」)
                MapPage 內部加 aggregate mode (無 ?ch param 時聚合 31 章所有 lessons)
                NODE_PATH_V2 cyclic 繼續蜿蜒延長, 視覺完全不變
                /chapters → ChaptersPage 圖鑑 grid (從 nav 進, 非首頁)
                /map?ch=N → MapPage 同元件帶 chapter param = 單章 7-lesson 細節 */}
            <Route path="/" element={<MapPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/chapters" element={<ChaptersPage />} />
            <Route path="/chapter/:chapter/intro" element={<ChapterIntroPage />} />
            <Route path="/lesson/:chapter/:lessonId" element={<LessonPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/parent" element={<ParentPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<ChaptersPage />} />
          </Routes>
        </Suspense>
      </main>
      <BottomNav />
    </div>
  );
}
