/**
 * Pickup React Phase 1 sandbox.
 *
 * 3 demo views (Splash / Map / Lesson) switchable via header tabs.
 * Hardcoded UI showing React migration target style — no Phaser, no
 * vanilla TS scenes. Validates: React + Vite plugin OK, Ghibli palette
 * preserved, audio works via Web Audio API (no MP3 yet, uses sentence
 * cache from main app deploy).
 */
import { useState } from 'react';
import SplashView from './views/SplashView';
import MapView from './views/MapView';
import LessonView from './views/LessonView';

type ViewKey = 'splash' | 'map' | 'lesson';

export default function App() {
  const [view, setView] = useState<ViewKey>('splash');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', maxWidth: 480, margin: '0 auto', position: 'relative' }}>
      <header style={{
        background: '#fff7e8',
        borderBottom: '2px solid #c8a878',
        padding: '10px 14px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ fontSize: 11, color: '#8b6f4a', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
          🟢 PICKUP REACT PHASE 1 — SANDBOX
        </div>
        <nav style={{ display: 'flex', gap: 6 }}>
          {(['splash', 'map', 'lesson'] as ViewKey[]).map(k => (
            <button
              key={k}
              onClick={() => setView(k)}
              style={{
                flex: 1,
                padding: '6px 0',
                background: view === k ? '#e7a44a' : 'transparent',
                color: view === k ? '#fff' : '#8b6f4a',
                border: '2px solid #c8a878',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {k === 'splash' ? '🌅 Splash' : k === 'map' ? '🗺️ Map' : '📖 Lesson'}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {view === 'splash' && <SplashView onStart={() => setView('map')} />}
        {view === 'map' && <MapView onPickLesson={() => setView('lesson')} />}
        {view === 'lesson' && <LessonView onComplete={() => setView('map')} />}
      </main>

      <footer style={{ padding: '8px 14px', borderTop: '1px dashed #c8a878', fontSize: 10, color: '#8b6f4a', textAlign: 'center' }}>
        v2.0.B.163 · React 18 + Vite + Router · <a href="/" style={{ color: '#b07a2a' }}>← Phaser 版</a>
      </footer>
    </div>
  );
}
