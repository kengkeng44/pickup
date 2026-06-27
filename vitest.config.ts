import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// v2.0.B.233: + coverage scaffolding to upgrade vitest ⭐⭐ → ⭐⭐⭐
// 進 CI gate (.github/workflows/ci.yml).
// 注意: 需 `npm i -D @vitest/coverage-v8` 後 thresholds 才生效. 現階段為 scaffold,
// CI 跑 `npx vitest run` (沒 --coverage),local 想看跑 `npm run test:coverage`.
// v2.0.B.480: + react plugin 讓 .test.tsx (React render 測試) 可跑 JSX。
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    // .test.tsx (React render 測試) 在檔頭加 `// @vitest-environment jsdom` 切 DOM 環境。
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    globals: false,
    // Coverage config 預留 — 安裝 @vitest/coverage-v8 後 npm run test:coverage 即啟用
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      include: [
        'src/data/lessons.ts',
        'src/data/lessonHooks.ts',
        'src/store/runStore.ts',
        'tools/*.cjs',
        'tools/*.js',
      ],
      exclude: [
        'tests/**',
        'src/react-app/**',
        'src/scenes/**',
        'src/ui/**',
      ],
    },
  },
});
