import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Gulu Phase 0 POC — minimal Vite + React。之後比照拾光加 PWA / code-split。
export default defineConfig({
  plugins: [react()],
});
