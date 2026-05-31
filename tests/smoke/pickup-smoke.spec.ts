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
    // v2.0.B.130: Chromium-headless lacks proprietary MP3 codec, so peace.mp3
    // BGM decode rejects with "Unable to decode audio data". Production
    // Chrome/Safari/Firefox decode fine. Filter at BOTH pageerror + console.
    const isCodecNoise = (s: string) => s.includes('Unable to decode audio data');
    page.on('pageerror', (err) => {
      if (isCodecNoise(err.message)) return;
      errors.push(err.message);
    });
    page.on('console', (msg) => {
      const text = msg.text();
      if (isCodecNoise(text)) return;
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

    // 5b. v2.0.B.133: lesson now opens with intro overlay (前情提要).
    // Tap '開始 · Begin' to enter Q1. If lesson has no intro, this is a no-op.
    const beginBtn = page.locator('button', { hasText: 'Begin' }).first();
    if (await beginBtn.count() > 0) {
      await beginBtn.click();
      await page.waitForTimeout(1500);
    }

    // Dump DOM for debug — see what actually rendered
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('=== BODY HTML AFTER TAP (first 500 chars) ===');
    console.log(bodyHTML.slice(0, 500));
    console.log('=== JS ERRORS ===');
    console.log(errors.join(' | ') || '(none)');

    // 6. v2.0.B.145: L1 now starts with narration entries (Duolingo Stories).
    // Tap '繼續' Continue buttons until we reach a Q with cloze buttons OR
    // 中文 對/錯 2-button Q. Allow up to 8 advance taps.
    let buttons = page.locator('[data-cloze-idx]');
    let btnCount = await buttons.count();
    let advanceCount = 0;
    while (btnCount === 0 && advanceCount < 8) {
      const cont = page.locator('button.pickup-narration-continue').first();
      if (await cont.count() === 0) break;
      await cont.click();
      await page.waitForTimeout(800);
      buttons = page.locator('[data-cloze-idx]');
      btnCount = await buttons.count();
      advanceCount++;
    }
    const tfButtons = await page.locator('button', { hasText: /對|不是這樣/ }).count();
    expect(btnCount === 4 || tfButtons >= 2, `Expected 4 cloze OR 2 TF buttons; got cloze=${btnCount} tf=${tfButtons}`).toBe(true);

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
