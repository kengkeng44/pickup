import { defineConfig } from 'vite';

/**
 * v1.7.10: code-split Phaser into its own chunk so the main app bundle
 * loads quickly + Phaser downloads in parallel. Phaser is ~700KB raw
 * which was the bulk of the original 1.4MB bundle.
 *
 * Note: rolldown-vite requires manualChunks as a FUNCTION not an object.
 */
export default defineConfig({
  build: {
    // v2.0.B.151: disable modulepreload polyfill — vite was injecting
    // <link rel="modulepreload"> for phaser chunk even though main.ts
    // uses dynamic import('./bootGame'), forcing eager fetch. Disabling
    // lets browser fetch phaser only when import() resolves post-'load'.
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/phaser')) return 'phaser';
          if (id.includes('node_modules/zustand')) return 'zustand';
          if (id.includes('node_modules/zod')) return 'zod';
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
