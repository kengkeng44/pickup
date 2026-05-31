import { defineConfig, devices } from '@playwright/test';

declare const process: { env: Record<string, string | undefined> };

/**
 * Playwright config for Pickup smoke tests.
 * Run: npx playwright test
 */
export default defineConfig({
  testDir: './tests/smoke',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: process.env.PICKUP_URL ?? 'https://pickupwords.pages.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] }, // chromium engine, ready immediately
    },
  ],
});
