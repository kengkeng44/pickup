/**
 * v2.0.B.162 Phase 0 React migration entry — NOT YET ACTIVE.
 *
 * This file is a placeholder. index.html still loads src/main.ts (vanilla
 * Phaser entry). Phase 1 (B.163) will cut over index.html to main.tsx +
 * implement <App /> with React Router.
 *
 * For now: just demonstrates Vite + React build pipeline works.
 *
 * Migration plan: docs/superpowers/plans/2026-06-01-pickup-react-migration.md
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App(): React.ReactElement {
  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <h1>Pickup React (Phase 0)</h1>
      <p>React 18 + Vite plugin ready. Phase 1 will mount real routes here.</p>
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
