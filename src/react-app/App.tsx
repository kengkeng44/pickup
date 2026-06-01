/**
 * Pickup React 18 — primary app shell. Replaces all 8 Phaser scenes
 * with React Router routes. Phaser still lazy-loaded from LessonRoute
 * as interop bridge until Phase 3 ports renderers natively.
 */
import { Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import TasksPage from './pages/TasksPage';
import AlertsPage from './pages/AlertsPage';
import LessonPage from './pages/LessonPage';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', maxWidth: 480, margin: '0 auto', background: '#fef8ed' }}>
      <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' as const, paddingBottom: 64 }}>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/lesson/:chapter/:lessonId" element={<LessonPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="*" element={<MapPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
