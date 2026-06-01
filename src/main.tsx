/**
 * v2.0.B.164 Phase 2 — React shell takes over as primary entry.
 *
 * Cutover from main.ts (Phaser vanilla). Phaser still lazy-loaded from
 * LessonRoute as interop bridge until Phase 3 ports all 8 renderers.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './react-app/App';
import './style.css';

const rootEl = document.getElementById('app');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
