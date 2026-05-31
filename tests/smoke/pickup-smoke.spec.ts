import { test, expect } from '@playwright/test';

/**
 * v2.0.B.114: Pickup smoke tests — verifies critical user paths after deploy.
 *
 * Per memory rule feedback-auto-verify-deploy. Catches bugs that unit
 * tests + dist grep miss (e.g. scene transition glitches, DOM overlap,
 * silent JS errors).
 *
 * Run: npx playwright test tests/smoke
 */

// @ts-expect-error - Node global, tsc doesn't have @types/node
const PROD_URL: string = (typeof process !== 'undefined' && process?.env?.PICKUP_URL) || 'https://pickupwords.pages.dev';

test.describe('Pickup smoke', () => {
  test('Ch1 map renders + first node tap loads LessonScene', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      const text = msg.text();
      if (msg.type() === 'error') errors.push(`[ERR] ${text}`);
      if (text.includes('LessonScene')) errors.push(`[LOG] ${text}`);
    });

    // 1. Open Ch1 map (skip splash via sessionStorage flag from prior visit)
    await page.goto(`${PROD_URL}/?ch=1`);
    // Skip the 2s splash via direct sessionStorage set + reload
    await page.evaluate(() => sessionStorage.setItem('pickup.splash.seen', '1'));
    await page.reload();

    // 2. Wait for map to be visible (any lesson node with paw icon)
    await page.waitForSelector('.pickup-map-node', { timeout: 10_000 });

    // 3. Take map screenshot for visual debug
    await page.screenshot({ path: 'tests/smoke/screenshots/01-ch1-map.png', fullPage: false });

    // 4. Click first unlocked node
    const firstNode = page.locator('.pickup-map-node').first();
    await expect(firstNode).toBeVisible();
    await firstNode.click();

    // 5. Wait for lesson UI longer — async init + JSON fetch + DOM mount
    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'tests/smoke/screenshots/02-after-node-tap.png', fullPage: false });

    // Dump DOM for debug — see what actually rendered
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('=== BODY HTML AFTER TAP (first 500 chars) ===');
    console.log(bodyHTML.slice(0, 500));
    console.log('=== JS ERRORS ===');
    console.log(errors.join(' | ') || '(none)');

    // 6. Verify lesson UI mounted: check for cloze buttons (4 ABCD)
    const buttons = page.locator('[data-cloze-idx]');
    const btnCount = await buttons.count();
    expect(btnCount, 'Expected 4 cloze option buttons (A/B/C/D)').toBe(4);

    // 7. No silent JS errors should occur
    expect(errors, `Page errors: ${errors.join(' | ')}`).toEqual([]);
  });

  test('Ch4 map loads with correct chapter param', async ({ page }) => {
    await page.goto(`${PROD_URL}/?ch=4`);
    await page.evaluate(() => sessionStorage.setItem('pickup.splash.seen', '1'));
    await page.reload();
    await page.waitForSelector('.pickup-map-node', { timeout: 10_000 });
    await page.screenshot({ path: 'tests/smoke/screenshots/03-ch4-map.png', fullPage: false });
    const nodes = await page.locator('.pickup-map-node').count();
    expect(nodes, 'Ch4 should have at least 5 lesson nodes').toBeGreaterThanOrEqual(5);
  });
});
