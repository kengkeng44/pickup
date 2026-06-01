import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/**
 * v1.7.10: code-split Phaser into its own chunk so the main app bundle
 * loads quickly + Phaser downloads in parallel.
 *
 * v2.0.B.162: @vitejs/plugin-react added for React 18 migration (Phase 0).
 * Both vanilla TS entry (src/main.ts) + React entry (src/main.tsx) coexist
 * during migration. index.html still points to main.ts until Phase 1 cutover.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    // v2.0.B.151: disable modulepreload polyfill (see git history)
    modulePreload: false,
    rollupOptions: {
      // v2.0.B.164 Phase 2: cutover — index.html now loads main.tsx (React).
      // react.html sandbox deleted. Phaser still lazy-imported on demand
      // from LessonPage (interop bridge until Phase 3 renderers port).
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/phaser')) return 'phaser';
          if (id.includes('node_modules/zustand')) return 'zustand';
          if (id.includes('node_modules/zod')) return 'zod';
          if (id.includes('node_modules/react-router')) return 'react-router';
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react';
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
