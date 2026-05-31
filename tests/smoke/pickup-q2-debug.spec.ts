import { test, expect } from '@playwright/test';

// @ts-expect-error - Node global, tsc doesn't have @types/node
const PROD_URL: string = (typeof process !== 'undefined' && process?.env?.PICKUP_URL) || 'https://pickupwords.pages.dev';

test.describe('Q2 debug', () => {
  test('walk Q1 -> Q2: verify Q2 mounts with 4 fresh buttons + new word-blanks', async ({ page }) => {
    const errors: string[] = [];
    const logs: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      const text = msg.text();
      if (msg.type() === 'error') errors.push(`[ERR] ${text}`);
      if (text.includes('LessonScene') || text.includes('Q')) logs.push(`[LOG] ${text}`);
    });

    await page.goto(`${PROD_URL}/?ch=1`);
    await page.evaluate(() => sessionStorage.setItem('pickup.splash.seen', '1'));
    await page.reload();
    await page.waitForSelector('.pickup-map-node', { timeout: 10_000 });

    // Click first lesson node
    await page.locator('.pickup-map-node').first().click();
    await page.waitForTimeout(4000);

    // Q1: kt-ch1-l1-q1 sentence "I am Mochi. I am a stray cat." options [straw, stay, stray, story], correctIndex 2
    await page.screenshot({ path: 'tests/smoke/screenshots/q2dbg-01-q1.png', fullPage: false });

    // Verify Q1 has 4 buttons
    let buttons = page.locator('[data-cloze-idx]');
    let btnCount = await buttons.count();
    console.log(`Q1 button count: ${btnCount}`);
    expect(btnCount, 'Q1 should have 4 buttons').toBe(4);

    // Tap correct answer (index 2 = stray)
    await buttons.nth(2).click();
    console.log('Tapped Q1 correct (idx 2 = stray)');

    // Wait for reveal panel + auto-advance (B.128 = 3000ms)
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'tests/smoke/screenshots/q2dbg-02-after-q1.png', fullPage: false });

    // Now should be on Q2. Dump current DOM for inspection
    const sentenceHTML = await page.locator('#pickup-hud').innerHTML().catch(() => 'NOT_FOUND');
    console.log('=== HUD HTML after advance (first 1500 chars) ===');
    console.log(sentenceHTML.slice(0, 1500));
    console.log('=== ERRORS ===');
    console.log(errors.join(' | ') || '(none)');
    console.log('=== LOGS ===');
    console.log(logs.join(' | ') || '(none)');

    // Inspect Q2 sentence card content — must have NEW blanks (Q2: "Every night I visit one yard.")
    const sentenceCardHTML = await page.evaluate(() => {
      const el = document.querySelector('#pickup-hud div[style*="font-size: 17px"]')
        ?? document.querySelector('.pickup-listen-speaker')?.parentElement?.parentElement;
      return el ? (el as HTMLElement).outerHTML : 'SENTENCE_CARD_NOT_FOUND';
    });
    console.log('=== Q2 SENTENCE CARD ===');
    console.log(sentenceCardHTML.slice(0, 800));

    // Verify Q2 has 4 fresh buttons
    buttons = page.locator('[data-cloze-idx]');
    btnCount = await buttons.count();
    console.log(`Q2 button count: ${btnCount}`);

    // Check the speaker button still exists on Q2 (not just Q1 leftover)
    const speakerExists = await page.locator('.pickup-listen-speaker').count();
    console.log(`Q2 speaker button count: ${speakerExists}`);

    // Inspect q2/5 progress chip
    const progressChip = await page.locator('text=q2/5').count();
    console.log(`q2/5 chip count: ${progressChip}`);

    // Check button texts (Q2 options: road / yard / house / park)
    const q2Labels: string[] = [];
    for (let i = 0; i < btnCount; i++) {
      const text = await buttons.nth(i).textContent();
      q2Labels.push(text ?? '');
    }
    console.log(`Q2 labels: ${JSON.stringify(q2Labels)}`);

    expect(btnCount, 'Q2 should have 4 buttons').toBe(4);
    expect(errors, `Errors during Q1->Q2: ${errors.join(' | ')}`).toEqual([]);
  });
});
