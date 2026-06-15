/**
 * v2.0.B.164 Phase 2 — React shell takes over as primary entry.
 *
 * Cutover from main.ts (Phaser vanilla). Phaser still lazy-loaded from
 * LessonRoute as interop bridge until Phase 3 ports all 8 renderers.
 */
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './react-app/App';
import './ui/theme/tokens.css';
import './style.css';
import { applyTheme } from './data/theme';
import { initBackend } from './data/backend';

// v2.0.B.282: apply persisted theme before first paint (avoids flash).
applyTheme();

// v2.0.B.308: backend sync (P1) — fire-and-forget. No-op until backend is
// provisioned (endpoints 503 → client stays on localStorage, app unaffected).
initBackend();

// v2.0.B.167: StrictMode disabled — caused dev double-mount race in
// audio onEnd + setTimeout fallback (B.166 audit). Production unaffected
// (StrictMode no-op in prod build) but dev-time race made debug hard.
const rootEl = document.getElementById('app');
if (rootEl) {
  createRoot(rootEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
