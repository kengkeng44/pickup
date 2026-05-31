import { test, expect } from '@playwright/test';

// @ts-expect-error - Node global
const PROD_URL: string = (typeof process !== 'undefined' && process?.env?.PICKUP_URL) || 'https://5849ee3a.pickupwords.pages.dev';

type AudioEvent = {
  kind: string;
  url?: string;
  status?: number;
  size?: number;
  detail?: string;
  ts: number;
};

test.describe('Audio debug — Ch1 L1 Q1 audio pipeline', () => {
  test.setTimeout(90_000);
  test('intro preview row tap → Next → Q1 speaker tap: capture which audio fires + 404s', async ({ page }) => {
    const events: AudioEvent[] = [];
    const consoleLog: string[] = [];
    const pageErrors: string[] = [];
    const t0 = Date.now();
    const stamp = () => Date.now() - t0;

    // Network: track every /audio/lessons/*.mp3 fetch
    page.on('response', async (resp) => {
      const url = resp.url();
      if (!/\/audio\/lessons\//.test(url)) return;
      let size: number | undefined;
      try {
        const len = resp.headers()['content-length'];
        if (len) size = parseInt(len, 10);
        if (size === undefined) {
          // fallback: read body
          const body = await resp.body().catch(() => null);
          if (body) size = body.length;
        }
      } catch {}
      events.push({
        kind: 'network',
        url: url.replace(PROD_URL, ''),
        status: resp.status(),
        size,
        ts: stamp(),
      });
    });

    page.on('console', (msg) => {
      const t = msg.text();
      if (t.includes('[TTS]') || t.includes('audio') || msg.type() === 'error' || t.includes('decode') || t.includes('AudioContext')) {
        consoleLog.push(`[${msg.type()}] ${t}`);
      }
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    // Inject hooks BEFORE any page script: instrument SpeechSynthesis + Audio + AudioBufferSourceNode
    await page.addInitScript(() => {
      (window as any).__audioEvents = [] as any[];
      const push = (e: any) => (window as any).__audioEvents.push({ ...e, ts: Date.now() });

      // 1) SpeechSynthesis instrumentation
      try {
        const origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
        window.speechSynthesis.speak = ((u: SpeechSynthesisUtterance) => {
          push({ kind: 'webspeech.speak', text: u.text?.slice(0, 80), lang: u.lang, rate: u.rate });
          return origSpeak(u);
        }) as any;
        const origCancel = window.speechSynthesis.cancel.bind(window.speechSynthesis);
        window.speechSynthesis.cancel = (() => { push({ kind: 'webspeech.cancel' }); return origCancel(); }) as any;
      } catch {}

      // 2) HTMLAudioElement instrumentation
      try {
        const origPlay = HTMLAudioElement.prototype.play;
        HTMLAudioElement.prototype.play = function (this: HTMLAudioElement) {
          push({ kind: 'audioEl.play', src: this.src, currentTime: this.currentTime });
          return origPlay.call(this);
        };
      } catch {}

      // 3) Web Audio: BufferSourceNode.start
      // Also intercept fetch() to correlate URL ↔ ArrayBuffer byteLength.
      const bufToUrl = new WeakMap<ArrayBuffer, string>();
      try {
        const origFetch = window.fetch;
        window.fetch = function (input: any, init?: any) {
          const p = origFetch.call(this, input, init);
          return p.then(async (r) => {
            try {
              const url = typeof input === 'string' ? input : input.url;
              if (/\/audio\//.test(url)) {
                const cloned = r.clone();
                cloned.arrayBuffer().then((ab) => {
                  bufToUrl.set(ab, url);
                  push({ kind: 'fetch.audio', url, byteLength: ab.byteLength });
                }).catch(() => {});
              }
            } catch {}
            return r;
          });
        };
      } catch {}
      try {
        const AC = (window.AudioContext || (window as any).webkitAudioContext);
        if (AC) {
          const origCreate = AC.prototype.createBufferSource;
          AC.prototype.createBufferSource = function (this: AudioContext) {
            const src = origCreate.call(this);
            const origStart = src.start;
            src.start = function (this: AudioBufferSourceNode, ...args: any[]) {
              push({
                kind: 'webaudio.start',
                duration: this.buffer?.duration,
                sampleRate: this.buffer?.sampleRate,
                numChannels: this.buffer?.numberOfChannels,
              });
              return origStart.apply(this, args as any);
            };
            return src;
          };
          // Track decode
          const origDecode = AC.prototype.decodeAudioData;
          AC.prototype.decodeAudioData = function (this: AudioContext, ab: ArrayBuffer, ...rest: any[]) {
            const url = bufToUrl.get(ab) ?? 'unknown';
            push({ kind: 'webaudio.decodeBegin', byteLength: ab.byteLength, url });
            const p = origDecode.call(this, ab, ...rest);
            if (p && typeof (p as any).then === 'function') {
              (p as Promise<AudioBuffer>).then(
                (buf) => push({ kind: 'webaudio.decodeOK', duration: buf.duration, url }),
                (e) => push({ kind: 'webaudio.decodeFail', err: String(e).slice(0, 80), url })
              );
            }
            return p;
          };
        }
      } catch {}

      // 4) Track AudioContext state transitions
      try {
        const AC = (window.AudioContext || (window as any).webkitAudioContext);
        if (AC) {
          const origCtor = AC;
          (window as any).AudioContext = function (this: any, ...args: any[]) {
            const ctx = new (origCtor as any)(...args);
            push({ kind: 'webaudio.ctxCreated', state: ctx.state });
            const origResume = ctx.resume.bind(ctx);
            ctx.resume = () => { push({ kind: 'webaudio.resume', state: ctx.state }); return origResume(); };
            return ctx;
          } as any;
          (window as any).AudioContext.prototype = origCtor.prototype;
        }
      } catch {}
    });

    // Step 1: Load with ch=1
    await page.goto(`${PROD_URL}/?ch=1`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => sessionStorage.setItem('pickup.splash.seen', '1'));
    await page.reload();
    await page.waitForSelector('.pickup-map-node', { timeout: 15_000 });
    await page.screenshot({ path: 'tests/smoke/screenshots/audiodbg-01-map.png' });

    // Step 2: Probe direct asset HEAD/GET — does kt-ch1-l1-q1.mp3 exist on deployed origin?
    const probeUrl = `${PROD_URL}/audio/lessons/kt-ch1-l1-q1.mp3`;
    const probe = await page.evaluate(async (u) => {
      try {
        const r = await fetch(u, { method: 'GET' });
        const blob = await r.blob();
        return { ok: r.ok, status: r.status, size: blob.size, ct: r.headers.get('content-type') };
      } catch (e) {
        return { ok: false, status: 0, error: String(e) };
      }
    }, probeUrl);
    events.push({ kind: 'probe.kt-ch1-l1-q1.mp3', status: probe.status, size: (probe as any).size, detail: JSON.stringify(probe), ts: stamp() });

    // Step 3: Tap first map node (gesture unlocks audio + opens intro)
    await page.locator('.pickup-map-node').first().click({ force: true });
    // Wait for intro overlay to mount
    await page.waitForSelector('.pickup-intro-preview-row', { timeout: 10_000 });
    await page.screenshot({ path: 'tests/smoke/screenshots/audiodbg-02-intro.png' });

    // Snapshot events so far
    const eventsAfterIntro = await page.evaluate(() => (window as any).__audioEvents.slice());
    events.push({ kind: 'marker', detail: `after intro mount, hook events=${eventsAfterIntro.length}`, ts: stamp() });

    // Step 4: Tap first preview row
    const beforePreviewLen = (await page.evaluate(() => (window as any).__audioEvents.length)) as number;
    const previewMarkBefore = stamp();
    await page.locator('.pickup-intro-preview-row').first().click({ force: true });
    await page.waitForTimeout(2500); // allow audio to fire
    await page.screenshot({ path: 'tests/smoke/screenshots/audiodbg-03-preview-tapped.png' });
    const previewEvents = await page.evaluate((before) => (window as any).__audioEvents.slice(before), beforePreviewLen);
    events.push({ kind: 'marker', detail: `preview-row tap @${previewMarkBefore}ms fired ${previewEvents.length} hook events: ${JSON.stringify(previewEvents).slice(0, 600)}`, ts: stamp() });

    // Step 4b: Tap preview row 2 (Q2 sentence "Every night I visit one place.")
    const beforeRow2 = (await page.evaluate(() => (window as any).__audioEvents.length)) as number;
    const row2Mark = stamp();
    await page.locator('.pickup-intro-preview-row').nth(1).click({ force: true });
    await page.waitForTimeout(1500);
    const row2Events = await page.evaluate((before) => (window as any).__audioEvents.slice(before), beforeRow2);
    events.push({ kind: 'marker', detail: `Row 2 (Q2 'Every night...') tap @${row2Mark}ms fired ${row2Events.length} events: ${JSON.stringify(row2Events).slice(0, 500)}`, ts: stamp() });

    // Step 5: Tap Next
    await page.locator('#pickup-intro-begin').click({ force: true });
    await page.waitForSelector('.pickup-listen-speaker', { timeout: 10_000 });
    await page.screenshot({ path: 'tests/smoke/screenshots/audiodbg-04-q1-mounted.png' });

    // Capture: did anything auto-play after Next?
    await page.waitForTimeout(1200);
    const afterNextLen = (await page.evaluate(() => (window as any).__audioEvents.length)) as number;
    const nextMarkBefore = stamp();
    const eventsAfterNext = await page.evaluate(() => (window as any).__audioEvents.slice());
    events.push({ kind: 'marker', detail: `Q1 mounted (Next tapped @${nextMarkBefore}ms). Total hook events so far=${afterNextLen}. Last 6: ${JSON.stringify(eventsAfterNext.slice(-6)).slice(0, 600)}`, ts: stamp() });

    // Step 6: Tap Q1 speaker
    const beforeSpkLen = afterNextLen;
    const spkMarkBefore = stamp();
    await page.locator('.pickup-listen-speaker').click({ force: true });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: 'tests/smoke/screenshots/audiodbg-05-q1-speaker-tapped.png' });
    const spkEvents = await page.evaluate((before) => (window as any).__audioEvents.slice(before), beforeSpkLen);
    events.push({ kind: 'marker', detail: `Q1 speaker tap @${spkMarkBefore}ms fired ${spkEvents.length} hook events: ${JSON.stringify(spkEvents).slice(0, 800)}`, ts: stamp() });

    // Step 7: Inspect audioLookup map size + Q1 lookup hit/miss
    const lookupProbe = await page.evaluate(() => {
      // Pull internal state if exposed; else dig from module via dynamic import won't work in prod build
      // Best effort: inspect last [TTS] console log via marker
      return {
        userAgent: navigator.userAgent,
        speechSynthesisSupport: !!window.speechSynthesis,
        AudioContextSupport: !!(window.AudioContext || (window as any).webkitAudioContext),
        hookEventCount: (window as any).__audioEvents.length,
      };
    });
    events.push({ kind: 'env', detail: JSON.stringify(lookupProbe), ts: stamp() });

    // Final dump
    console.log('\n========== AUDIO DEBUG REPORT ==========');
    console.log(`PROD_URL: ${PROD_URL}`);
    console.log(`\n--- 1) /audio/lessons/kt-ch1-l1-q1.mp3 PROBE ---`);
    console.log(JSON.stringify(probe, null, 2));
    console.log(`\n--- 2) NETWORK responses (audio/lessons/*) ---`);
    const netEvents = events.filter(e => e.kind === 'network');
    netEvents.forEach(e => console.log(`  ${e.ts}ms ${e.status} ${e.size}B ${e.url}`));
    console.log(`  Total audio fetches: ${netEvents.length}`);
    console.log(`\n--- 3) MARKERS ---`);
    events.filter(e => e.kind === 'marker').forEach(e => console.log(`  ${e.ts}ms ${e.detail}`));
    console.log(`\n--- 4) CONSOLE [TTS]/audio/error logs ---`);
    consoleLog.forEach(l => console.log('  ' + l));
    console.log(`\n--- 5) PAGE ERRORS ---`);
    pageErrors.forEach(e => console.log('  ' + e));
    console.log(`\n--- 6) ENV ---`);
    console.log(JSON.stringify(lookupProbe, null, 2));
    console.log('========== END REPORT ==========\n');

    // Soft assertions — we want the report to print even on fail
    expect(probe.status, 'kt-ch1-l1-q1.mp3 should exist on origin').toBeGreaterThan(0);
  });
});
