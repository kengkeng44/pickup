import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/**
 * React (src/main.tsx) is the sole entry. v2.0.B.474: legacy Phaser vanilla
 * entry (main.ts / bootGame / scenes) deleted — migration complete, no interop
 * bridge remains.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    // v2.0.B.151: disable modulepreload polyfill (see git history)
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
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
