/**
 * v2.0.B.163 Phase 1 — React shell preview.
 *
 * Loaded from /react.html (multi-page vite). index.html still loads
 * src/main.ts (Phaser vanilla). Side-by-side preview lets user compare
 * perf and confirm React migration direction before Phase 2 cutover.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './react-app/App';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
