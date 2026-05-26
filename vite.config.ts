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
