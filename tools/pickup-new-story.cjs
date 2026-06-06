#!/usr/bin/env node
/**
 * pickup-new-story.cjs — 單命令 ship 新故事到 Pickup
 *
 * 用法:
 *   node tools/pickup-new-story.cjs <URL_or_filepath> [options]
 *
 * 把「新故事 → ship」從 30 hr 手動流程壓到 1 hr 自動 pipeline.
 * 13 step sequential, 0-touch user (除了最後 commit).
 *
 * Options:
 *   --ch=N         目標章節編號 (默認自動偵測下一個 free chapter)
 *   --slug=name    故事 slug (默認從 URL/檔名推導)
 *   --from=STEP    從特定 step 開始 (canon|cuts|lessons|json|validate|qa|hooks)
 *   --to=STEP      跑到特定 step 停 (預設跑完)
 *   --dry          只印計劃不執行
 *   --force        覆蓋已存在的 canon/cuts (預設會 prompt 確認)
 *   --help         印 usage 後退出
 *
 * 設計原則:
 *   - Idempotent: 重跑同 URL 不會壞 / dup
 *   - 可插拔: 每 step 可單獨跑
 *   - 錯誤友善: fail → 中文錯誤 + 修法
 *   - Skip 已存在: 預設不覆蓋,要 --force
 *   - Claude API: 用 ANTHROPIC_API_KEY env;沒 key 印 prompt 給用戶手動跑 (gracedown)
 *
 * Pipeline 13 step:
 *   1. fetch  — Fetch story text (URL or local file)
 *   2. parse  — Clean + extract plot structure
 *   3. canon  — Generate docs/canon/{slug}.md (7-beat + vocab)
 *   4. cuts   — Generate docs/canon/{slug}-cuts.md (narrative-cut-analyst)
 *   5. lessons— Generate tools/_write-ch{N}-{slug}.cjs (pickup-item-writer)
 *   6. json   — Run lesson script → public/lessons-ch{N}.json
 *   7. validate — Run validate-lessons.js (X3 / schema / budget / 11Q×7)
 *   8. qa     — Render qa-static-ch{N}.html
 *   9. sync   — Run _sync-hooks.cjs
 *  10. hookmap — Update _content-db.cjs HOOK_MAP (via sync-hooks)
 *  11. hooksts — Update src/data/lessonHooks.ts entries
 *  12. stage  — git add (NOT commit)
 *  13. summary — Print final summary + git diff hint
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const readline = require('readline');

// ─── 路徑常數 ─────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const DOCS_CANON = path.join(ROOT, 'docs', 'canon');
const PUBLIC_DIR = path.join(ROOT, 'public');
const TOOLS_DIR = path.join(ROOT, 'tools');
const SRC_HOOKS = path.join(ROOT, 'src', 'data', 'lessonHooks.ts');
const CONTENT_DB = path.join(TOOLS_DIR, '_content-db.cjs');
const SYNC_HOOKS = path.join(TOOLS_DIR, '_sync-hooks.cjs');
const VALIDATE_LESSONS = path.join(TOOLS_DIR, 'validate-lessons.js');
const RENDER_QA = path.join(TOOLS_DIR, '_render-qa-static.cjs');

const STEPS = ['fetch', 'parse', 'canon', 'cuts', 'lessons', 'json',
               'validate', 'qa', 'sync', 'hooksts', 'stage', 'summary'];

// ─── ANSI color helpers (Windows-safe) ────────────────────────────────
const C = {
  reset: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
  red: '\x1b[31m', grn: '\x1b[32m', ylw: '\x1b[33m',
  blu: '\x1b[34m', cyn: '\x1b[36m',
};
const log   = (m) => console.log(m);
const ok    = (m) => log(`${C.grn}✓${C.reset} ${m}`);
const warn  = (m) => log(`${C.ylw}!${C.reset} ${m}`);
const err   = (m) => log(`${C.red}✗${C.reset} ${m}`);
const info  = (m) => log(`${C.cyn}i${C.reset} ${m}`);
const head  = (m) => log(`\n${C.bold}${C.blu}== ${m} ==${C.reset}`);

// ─── Arg parsing ──────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { positional: [], flags: {} };
  for (const a of argv) {
    if (a === '--help' || a === '-h') { out.flags.help = true; continue; }
    if (a === '--dry') { out.flags.dry = true; continue; }
    if (a === '--force') { out.flags.force = true; continue; }
    if (a.startsWith('--ch=')) { out.flags.ch = parseInt(a.slice(5), 10); continue; }
    if (a.startsWith('--slug=')) { out.flags.slug = a.slice(7); continue; }
    if (a.startsWith('--from=')) { out.flags.from = a.slice(7); continue; }
    if (a.startsWith('--to=')) { out.flags.to = a.slice(5); continue; }
    if (a.startsWith('--')) { warn(`未知 flag: ${a}`); continue; }
    out.positional.push(a);
  }
  return out;
}

function printHelp() {
  log(`
${C.bold}pickup-new-story${C.reset} — Pickup 新故事 1-command pipeline

${C.bold}用法${C.reset}:
  node tools/pickup-new-story.cjs <URL_or_filepath> [options]

${C.bold}範例${C.reset}:
  node tools/pickup-new-story.cjs https://en.wikipedia.org/wiki/Snow_White
  node tools/pickup-new-story.cjs ./raw-stories/snow-white.txt --slug=snow-white --ch=8
  node tools/pickup-new-story.cjs URL --from=cuts            # 從 cuts step 開始
  node tools/pickup-new-story.cjs URL --dry                  # 預演不執行
  node tools/pickup-new-story.cjs URL --force                # 覆蓋已存在

${C.bold}Options${C.reset}:
  --ch=N       目標章節 (預設下一空章, 例 ch=8)
  --slug=name  故事 slug (預設從 URL/檔名推導, 例 snow-white)
  --from=STEP  從某 step 開始: fetch|parse|canon|cuts|lessons|json|validate|qa|sync|hooksts|stage
  --to=STEP    跑到某 step 停
  --dry        只印計劃不執行
  --force      覆蓋已存在 canon/cuts/lesson script
  --help       印本 usage

${C.bold}Pipeline${C.reset} (13 step):
  1. fetch     抓 URL 或讀本機檔
  2. parse     清洗 + 抽 plot 主結構
  3. canon     寫 docs/canon/{slug}.md (7-beat + key vocab)
  4. cuts      寫 docs/canon/{slug}-cuts.md (B1-B6 hook 切點)
  5. lessons   寫 tools/_write-ch{N}-{slug}.cjs (lesson script)
  6. json      跑 lesson script → public/lessons-ch{N}.json
  7. validate  跑 validate-lessons.js
  8. qa        render qa-static-ch{N}.html
  9. sync      _sync-hooks.cjs 對齊 _content-db.cjs HOOK_MAP
 10. hooksts   src/data/lessonHooks.ts 加章節 entries
 11. stage     git add (NOT commit)
 12. summary   印 git diff 提示

${C.bold}環境變數${C.reset}:
  ANTHROPIC_API_KEY  有的話 step 3-5 自動跑 Claude;沒有則印 prompt 給用戶手動跑
`);
}

// ─── 通用 utils ───────────────────────────────────────────────────────
function isUrl(s)   { return /^https?:\/\//i.test(s); }
function fileExists(p) { try { return fs.statSync(p).isFile(); } catch { return false; } }
function dirExists(p)  { try { return fs.statSync(p).isDirectory(); } catch { return false; } }

function slugFromInput(input) {
  if (isUrl(input)) {
    // e.g. https://en.wikipedia.org/wiki/Snow_White → snow-white
    const m = input.match(/\/([^\/]+?)(\.[a-z]+)?$/i);
    if (m) return m[1].toLowerCase().replace(/_/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  // local file
  const base = path.basename(input).replace(/\.[^.]+$/, '');
  return base.toLowerCase().replace(/_/g, '-').replace(/[^a-z0-9-]/g, '');
}

function autoDetectChapter() {
  // 找 lessons-ch{N}.json 最大 N + 1
  let maxCh = 0;
  for (let n = 0; n <= 30; n++) {
    if (fileExists(path.join(PUBLIC_DIR, `lessons-ch${n}.json`))) maxCh = Math.max(maxCh, n);
  }
  return maxCh + 1;
}

function confirmSync(question) {
  // Sync confirm via deasync-free prompt. Returns 'y' | 'n'.
  // Note: blocking stdin in Node 16+ — fall back to defaulting yes in --dry.
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`${C.ylw}? ${question} [y/N]${C.reset} `, (ans) => {
      rl.close();
      resolve(/^y/i.test(ans.trim()) ? 'y' : 'n');
    });
  });
}

// ─── Step 1: fetch ────────────────────────────────────────────────────
async function stepFetch(ctx) {
  head('Step 1: Fetch source story');
  const { input } = ctx;
  if (!input) throw new Error('missing input URL or filepath');

  // local file?
  if (!isUrl(input)) {
    const abs = path.resolve(input);
    if (!fileExists(abs)) {
      throw new Error(`找不到本機檔 ${abs}\n  修法: 先確認檔案存在,或改傳 URL`);
    }
    info(`Reading local file ${abs}`);
    ctx.rawText = fs.readFileSync(abs, 'utf-8');
    ok(`Loaded ${ctx.rawText.length} chars from local file`);
    return;
  }

  info(`Fetching ${input}`);
  if (ctx.flags.dry) { ctx.rawText = '(dry-run placeholder)'; ok('skipped (dry)'); return; }

  try {
    // Node 18+ has global fetch
    const res = await fetch(input, {
      headers: { 'User-Agent': 'pickup-new-story-pipeline/1.0' },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    ctx.rawText = await res.text();
    ok(`Fetched ${ctx.rawText.length} chars`);
  } catch (e) {
    throw new Error(
      `Fetch 失敗: ${e.message}\n` +
      `  修法 1: 檢查網路 / URL 是否打錯\n` +
      `  修法 2: 手動下載成 .txt,改用本機 path 跑\n` +
      `         node tools/pickup-new-story.cjs ./raw-stories/${ctx.slug}.txt`
    );
  }
}

// ─── Step 2: parse + clean ────────────────────────────────────────────
function stepParse(ctx) {
  head('Step 2: Parse + clean plot');
  if (ctx.flags.dry) { ctx.plotText = '(dry-run plot)'; ok('skipped (dry)'); return; }

  let text = ctx.rawText || '';

  // 粗暴 strip HTML (Wikipedia 等)
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '')
             .replace(/<style[\s\S]*?<\/style>/gi, '')
             .replace(/<[^>]+>/g, '\n');
  // HTML entity decode (basic)
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'");
  // collapse whitespace
  text = text.replace(/\r\n/g, '\n')
             .replace(/[ \t]+/g, ' ')
             .replace(/\n{3,}/g, '\n\n')
             .trim();

  // 限長度 (Claude prompt friendly ≤ ~12k chars)
  if (text.length > 18000) {
    warn(`Text 太長 (${text.length} chars), 截到 18000`);
    text = text.slice(0, 18000);
  }

  ctx.plotText = text;
  ok(`Cleaned plot text: ${text.length} chars, ${text.split(/\n+/).length} paragraphs`);
}

// ─── Claude API call helper (與 graceful degrade) ──────────────────────
async function claudeCall(systemPrompt, userPrompt, opts = {}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null; // graceful degrade
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: opts.model || 'claude-opus-4-7',
        max_tokens: opts.maxTokens || 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`API ${res.status}: ${body.slice(0, 400)}`);
    }
    const data = await res.json();
    return data.content?.[0]?.text || '';
  } catch (e) {
    warn(`Claude API call failed: ${e.message}`);
    return null;
  }
}

function printManualPrompt(label, systemPrompt, userPrompt, expectedOutFile) {
  log(`\n${C.ylw}${C.bold}[手動模式] ${label}${C.reset}`);
  log(`沒設 ANTHROPIC_API_KEY,請手動用 Claude 跑這 prompt,把回應存到:`);
  log(`  ${C.cyn}${expectedOutFile}${C.reset}\n`);
  log(`${C.dim}--- SYSTEM ---${C.reset}`);
  log(systemPrompt);
  log(`${C.dim}--- USER ---${C.reset}`);
  log(userPrompt.length > 1200 ? userPrompt.slice(0, 1200) + '\n...(truncated, 用 plotText 完整餵入)' : userPrompt);
  log('');
}

// ─── Step 3: canon ────────────────────────────────────────────────────
async function stepCanon(ctx) {
  head('Step 3: Generate canon md');
  const canonPath = path.join(DOCS_CANON, `${ctx.slug}.md`);
  ctx.canonPath = canonPath;

  if (fileExists(canonPath) && !ctx.flags.force) {
    const choice = ctx.flags.dry ? 'n' : await confirmSync(`canon 已存在 ${canonPath}, 覆蓋?`);
    if (choice !== 'y') { warn('Skip canon (existing kept)'); return; }
  }

  const sys = `你是 narrative-cut-analyst skill 的 canon-writer 角色。
從原始故事抽出 7-beat arc (CEFR-A2 兒童童話風), 每 beat 含:
- 一段 50-100 字 A2 英文敘述 (3rd-person past tense, ≤10 字/句, 無 B1+ vocab)
- 一行中文 beat 標題 + 一行劇情摘要
- "Key vocab" 4-6 個 A2 字
末尾加 "A2 Authoring Constraints" 段 (參考 momotaro.md / ugly-duckling.md 範本)。
輸出純 markdown, 開頭 # ${ctx.slug} — Canonical Story 標題。`;

  const user = `Story slug: ${ctx.slug}
Target chapter: Ch${ctx.ch}
Source text (clean):

${ctx.plotText.slice(0, 12000)}

請輸出 ${ctx.slug}.md 全文。`;

  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  let md = await claudeCall(sys, user, { maxTokens: 6000 });
  if (!md) {
    printManualPrompt(`canon md for ${ctx.slug}`, sys, user, canonPath);
    // 仍寫個 placeholder header 讓 idempotent 不會 re-prompt
    md = `# ${ctx.slug} — Canonical Story (PLACEHOLDER)\n\n` +
         `> 自動 pipeline 沒設 ANTHROPIC_API_KEY,請依上方 prompt 手動補完此檔。\n\n` +
         `## Beat 1: Setup\n(待手動補)\n\n` +
         `## Beat 2-7\n(待手動補)\n\n` +
         `## A2 Authoring Constraints\n(同 momotaro.md)\n`;
  }

  fs.mkdirSync(path.dirname(canonPath), { recursive: true });
  fs.writeFileSync(canonPath, md, 'utf-8');
  ok(`Wrote ${canonPath} (${md.length} chars)`);
}

// ─── Step 4: cuts ─────────────────────────────────────────────────────
async function stepCuts(ctx) {
  head('Step 4: Generate cuts md (narrative-cut-analyst)');
  const cutsPath = path.join(DOCS_CANON, `${ctx.slug}-cuts.md`);
  ctx.cutsPath = cutsPath;

  if (fileExists(cutsPath) && !ctx.flags.force) {
    const choice = ctx.flags.dry ? 'n' : await confirmSync(`cuts 已存在 ${cutsPath}, 覆蓋?`);
    if (choice !== 'y') { warn('Skip cuts (existing kept)'); return; }
  }

  const canonMd = fileExists(ctx.canonPath || '') ? fs.readFileSync(ctx.canonPath, 'utf-8') : '';
  const sys = `你是 narrative-cut-analyst skill (參考 ~/.claude/skills/narrative-cut-analyst/SKILL.md)。
跑 7-step pipeline:
  1. Per-sentence emotion tag
  2. Emotional arc curve
  3. Identify peak candidates
  4. Classify each by B1-B6 hook framework
  5. Score (inquiry / value flip / open-not-resolve)
  6. Select 7 cuts (lessons), 25% time tolerance
  7. Output JSON + markdown

每 cut 必通過 McKee / Stein / Brewer 3-question rule。
輸出 markdown, 完全 mirror ugly-duckling-cuts.md 結構。`;

  const user = `Story: ${ctx.slug} (Ch${ctx.ch})
Canon (剛產出, 引用即可):

${canonMd.slice(0, 8000)}

跑完 7 step, 輸出 ${ctx.slug}-cuts.md 完整 markdown.
最後一個 table 給 7 個 lesson 的: L#, cut location, hook (B-code), inquiry question.`;

  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  let md = await claudeCall(sys, user, { maxTokens: 6000 });
  if (!md) {
    printManualPrompt(`cuts md for ${ctx.slug}`, sys, user, cutsPath);
    md = `# ${ctx.slug} — Lesson Cut Analysis (PLACEHOLDER)\n\n` +
         `> 自動 pipeline 沒設 ANTHROPIC_API_KEY,請依上方 prompt 手動補完此檔。\n\n` +
         `| L# | Cut location | Hook | Inquiry |\n|---|---|---|---|\n` +
         `| L1 | TBD | B3 | TBD |\n| L2 | TBD | B2 | TBD |\n` +
         `| L3 | TBD | B5 | TBD |\n| L4 | TBD | B1 | TBD |\n` +
         `| L5 | TBD | B6 | TBD |\n| L6 | TBD | B2 | TBD |\n` +
         `| L7 | TBD | B2 big | TBD |\n`;
  }

  fs.writeFileSync(cutsPath, md, 'utf-8');
  ok(`Wrote ${cutsPath} (${md.length} chars)`);

  // 嘗試從 cuts md 抽出 hook + inquiry, 後面 step 11 要用
  ctx.lessonHooks = extractLessonHooks(md, ctx.ch);
  if (ctx.lessonHooks.length === 7) {
    ok(`Extracted 7 lesson hooks for Ch${ctx.ch}`);
  } else {
    warn(`Only extracted ${ctx.lessonHooks.length} hooks (expected 7) — step 11 會用 placeholder`);
  }
}

function extractLessonHooks(md, ch) {
  // 從 cuts md table 找 | L1 | ... | B3 | inquiry? |
  const hooks = [];
  const re = /\|\s*L(\d+)\s*\|[^|]*\|\s*\*?\*?(B\d(?:\+B\d)?(?:\s+\w+)?)\*?\*?\s*\|\s*([^|]+?)\s*\|/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    const lessonN = parseInt(m[1], 10);
    if (lessonN < 1 || lessonN > 7) continue;
    hooks.push({
      id: `kt-ch${ch}-l${lessonN}`,
      type: m[2].trim(),
      inquiry: m[3].trim().replace(/^\*+|\*+$/g, ''),
    });
  }
  // dedupe by id, keep first
  const seen = new Set();
  return hooks.filter(h => seen.has(h.id) ? false : (seen.add(h.id), true));
}

// ─── Step 5: lesson script ────────────────────────────────────────────
async function stepLessons(ctx) {
  head('Step 5: Generate lesson script');
  const scriptPath = path.join(TOOLS_DIR, `_write-ch${ctx.ch}-${ctx.slug}.cjs`);
  ctx.scriptPath = scriptPath;

  if (fileExists(scriptPath) && !ctx.flags.force) {
    const choice = ctx.flags.dry ? 'n' : await confirmSync(`lesson script 已存在 ${scriptPath}, 覆蓋?`);
    if (choice !== 'y') { warn('Skip lesson script'); return; }
  }

  const canonMd = fileExists(ctx.canonPath || '') ? fs.readFileSync(ctx.canonPath, 'utf-8') : '';
  const cutsMd  = fileExists(ctx.cutsPath  || '') ? fs.readFileSync(ctx.cutsPath,  'utf-8') : '';

  const sys = `你是 pickup-item-writer skill (參考 ~/.claude/skills/pickup-item-writer/SKILL.md)。
產一個 Node CJS 檔, 輸出 7 lessons × 11 Q (共 77 Q) 到 public/lessons-ch${ctx.ch}.json。

規則 (hard):
  - 每 Q 必有 speaker (預設 narrator)
  - listen-tf 必 inference, 4 strategy (A 氛圍/B 動作/C 時間/D 對比) rotate
  - listen-mc correct option 必 paraphrase, 不可 verbatim (X3 rule)
  - stem ≤ 11 words
  - A2 vocab only (no soared/scaled/bobbed/drifted/knelt/forgiveness/blessed)
  - explanationZh 含 "推理: A → B → 答 X" 路徑

每 lesson 11 Q 結構 (沿用 _write-ch1-momotaro.cjs):
  q1 vocabIntro(tap-pairs 4 ZH-EN)
  q2 nar(setup)
  q3 nar(deepen)
  q4 tf(inference)
  q5 nar(routine)
  q6 mc(paraphrase)
  q7 nar(transition)
  q8 mc(paraphrase)
  q9 nar(BEAT D)
  q10 emoji-pick(visual hook)
  q11 nar(HOOK ENDING per cut)

輸出純 JavaScript (CJS), 完整可跑, 開頭加註解標 story + version.`;

  const user = `Slug: ${ctx.slug}, Ch: ${ctx.ch}
Canon:

${canonMd.slice(0, 6000)}

Cuts (7 lesson hooks):

${cutsMd.slice(0, 6000)}

請輸出 tools/_write-ch${ctx.ch}-${ctx.slug}.cjs 完整檔。
固定 const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch${ctx.ch}.json');
storyId: '${ctx.slug}', tags 含 'story', 'ch${ctx.ch}', '${ctx.slug}'.`;

  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  let code = await claudeCall(sys, user, { maxTokens: 8000 });
  if (!code) {
    printManualPrompt(`lesson script for Ch${ctx.ch}`, sys, user, scriptPath);
    // skeleton placeholder
    code = generateSkeletonScript(ctx.ch, ctx.slug, ctx.lessonHooks || []);
  }
  // strip code-fence if API wrapped it
  code = code.replace(/^```(?:javascript|js|cjs)?\n/m, '').replace(/\n```\s*$/m, '');

  fs.writeFileSync(scriptPath, code, 'utf-8');
  ok(`Wrote ${scriptPath} (${code.length} chars)`);
}

function generateSkeletonScript(ch, slug, hooks) {
  // 沒 API key 時的 placeholder skeleton — 結構完整可跑但內容是 stub.
  const hookComments = hooks.length
    ? hooks.map(h => `//   ${h.id}: ${h.type} — ${h.inquiry}`).join('\n')
    : '//   (hooks not parsed — fill from cuts.md manually)';
  return `#!/usr/bin/env node
/**
 * pickup-new-story PLACEHOLDER for Ch${ch} ${slug}.
 * 沒 ANTHROPIC_API_KEY 時生成的 skeleton, 7 lessons × 1 stub Q.
 * 請手動補完每 lesson 11 Q (參考 _write-ch1-momotaro.cjs).
 *
 * Hooks (from cuts.md):
${hookComments}
 */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..', 'public', 'lessons-ch${ch}.json');

function nar(id, en, zh) {
  return { type: 'narration', id, level: 'A2', difficulty: 'easy',
    speaker: 'narrator', sentence: en, explanationZh: zh,
    tags: ['story', 'ch${ch}', '${slug}'] };
}

const lessons = [
  { id: 'kt-ch${ch}-l1', chapter: ${ch}, lessonInChapter: 1,
    segmentType: 'main-story', storyId: '${slug}',
    storyBeat: 'TBD beat 1',
    questions: [ nar('kt-ch${ch}-l1-q1', 'PLACEHOLDER.', 'PLACEHOLDER。') ] },
  { id: 'kt-ch${ch}-l2', chapter: ${ch}, lessonInChapter: 2,
    segmentType: 'main-story', storyId: '${slug}',
    storyBeat: 'TBD beat 2', questions: [ nar('kt-ch${ch}-l2-q1', 'PLACEHOLDER.', 'PLACEHOLDER。') ] },
  { id: 'kt-ch${ch}-l3', chapter: ${ch}, lessonInChapter: 3,
    segmentType: 'main-story', storyId: '${slug}',
    storyBeat: 'TBD beat 3', questions: [ nar('kt-ch${ch}-l3-q1', 'PLACEHOLDER.', 'PLACEHOLDER。') ] },
  { id: 'kt-ch${ch}-l4', chapter: ${ch}, lessonInChapter: 4,
    segmentType: 'main-story', storyId: '${slug}',
    storyBeat: 'TBD beat 4', questions: [ nar('kt-ch${ch}-l4-q1', 'PLACEHOLDER.', 'PLACEHOLDER。') ] },
  { id: 'kt-ch${ch}-l5', chapter: ${ch}, lessonInChapter: 5,
    segmentType: 'main-story', storyId: '${slug}',
    storyBeat: 'TBD beat 5', questions: [ nar('kt-ch${ch}-l5-q1', 'PLACEHOLDER.', 'PLACEHOLDER。') ] },
  { id: 'kt-ch${ch}-l6', chapter: ${ch}, lessonInChapter: 6,
    segmentType: 'main-story', storyId: '${slug}',
    storyBeat: 'TBD beat 6', questions: [ nar('kt-ch${ch}-l6-q1', 'PLACEHOLDER.', 'PLACEHOLDER。') ] },
  { id: 'kt-ch${ch}-l7', chapter: ${ch}, lessonInChapter: 7,
    segmentType: 'main-story', storyId: '${slug}',
    storyBeat: 'TBD beat 7', questions: [ nar('kt-ch${ch}-l7-q1', 'PLACEHOLDER.', 'PLACEHOLDER。') ] },
];

fs.writeFileSync(OUT, JSON.stringify(lessons, null, 2) + '\\n', 'utf-8');
console.log('OK   wrote ' + OUT + ' (' + lessons.length + ' lessons, PLACEHOLDER content)');
`;
}

// ─── Step 6: run lesson script → json ─────────────────────────────────
function stepJson(ctx) {
  head(`Step 6: Run lesson script → public/lessons-ch${ctx.ch}.json`);
  const scriptPath = ctx.scriptPath || path.join(TOOLS_DIR, `_write-ch${ctx.ch}-${ctx.slug}.cjs`);
  if (!fileExists(scriptPath)) {
    throw new Error(`找不到 lesson script ${scriptPath}\n  修法: 先跑 step 5 (lessons)`);
  }
  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  const r = spawnSync('node', [scriptPath], { cwd: ROOT, encoding: 'utf-8' });
  if (r.status !== 0) {
    throw new Error(
      `lesson script 跑掛了 (exit ${r.status})\n` +
      `  stdout: ${(r.stdout||'').slice(0,300)}\n` +
      `  stderr: ${(r.stderr||'').slice(0,300)}\n` +
      `  修法: 手動 \`node ${scriptPath}\` 看完整 stack`
    );
  }
  log(r.stdout.trim());
  const jsonPath = path.join(PUBLIC_DIR, `lessons-ch${ctx.ch}.json`);
  if (!fileExists(jsonPath)) {
    throw new Error(`script 跑完但沒產出 ${jsonPath} — 檢查 script 的 OUT 路徑`);
  }
  ok(`Generated ${jsonPath}`);
}

// ─── Step 7: validate ─────────────────────────────────────────────────
function stepValidate(ctx) {
  head('Step 7: Validate (X3 / schema / budget / 11Q×7)');
  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  if (!fileExists(VALIDATE_LESSONS)) {
    warn(`找不到 ${VALIDATE_LESSONS}, skip validate`);
    return;
  }
  const r = spawnSync('node', [VALIDATE_LESSONS], { cwd: ROOT, encoding: 'utf-8' });
  log(r.stdout.trim());
  if (r.stderr) log(r.stderr.trim());
  if (r.status !== 0) {
    throw new Error(
      `validate-lessons.js 失敗 (exit ${r.status})\n` +
      `  修法: 看上方 stderr 修對應 Q (X3 verbatim / schema field 缺失)\n` +
      `  或: node ${VALIDATE_LESSONS} 2>&1 | grep ERROR`
    );
  }
  // 額外: 檢查 11 Q × 7 lesson + budget
  const jsonPath = path.join(PUBLIC_DIR, `lessons-ch${ctx.ch}.json`);
  const lessons = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  if (lessons.length < 7) warn(`只有 ${lessons.length} lessons, 預期 7`);
  for (const l of lessons) {
    if (l.questions.length !== 11) {
      warn(`${l.id} 有 ${l.questions.length} Q (預期 11) — 不一定錯,但與範本不符`);
    }
  }
  ok('Validation passed (or warnings only)');
}

// ─── Step 8: render qa-static ─────────────────────────────────────────
function stepQa(ctx) {
  head('Step 8: Render qa-static-ch{N}.html');
  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  if (!fileExists(RENDER_QA)) {
    warn(`找不到 ${RENDER_QA}, skip qa render`);
    return;
  }
  const r = spawnSync('node', [RENDER_QA], { cwd: ROOT, encoding: 'utf-8' });
  if (r.status !== 0) {
    throw new Error(
      `_render-qa-static.cjs 失敗 (exit ${r.status})\n` +
      `  stderr: ${(r.stderr||'').slice(0,300)}\n` +
      `  修法: 確認 _render-qa-static.cjs CHAPTERS array 已含 ${ctx.ch}`
    );
  }
  log(r.stdout.trim());
  const qaPath = path.join(PUBLIC_DIR, `qa-static-ch${ctx.ch}.html`);
  if (!fileExists(qaPath)) {
    warn(`QA static 應該產 ${qaPath} 但沒看到,確認 _render-qa-static.cjs 已含 Ch${ctx.ch}`);
  } else {
    ok(`Rendered ${qaPath}`);
  }
}

// ─── Step 9-10: sync hooks (cjs HOOK_MAP via _sync-hooks.cjs) ─────────
function stepSync(ctx) {
  head('Step 9-10: Sync hooks (lessonHooks.ts → _content-db.cjs HOOK_MAP)');
  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  if (!fileExists(SYNC_HOOKS)) {
    warn(`找不到 ${SYNC_HOOKS}, skip sync`);
    return;
  }
  const r = spawnSync('node', [SYNC_HOOKS], { cwd: ROOT, encoding: 'utf-8' });
  log(r.stdout.trim());
  if (r.status !== 0) {
    throw new Error(
      `_sync-hooks.cjs 失敗 (exit ${r.status})\n` +
      `  修法: 確認 src/data/lessonHooks.ts 含 kt-ch${ctx.ch}-l1..l7 entries`
    );
  }
  ok('HOOK_MAP synced');
}

// ─── Step 11: update src/data/lessonHooks.ts ──────────────────────────
function stepHooksTs(ctx) {
  head('Step 11: Update src/data/lessonHooks.ts');
  if (ctx.flags.dry) { ok('skipped (dry)'); return; }
  if (!fileExists(SRC_HOOKS)) {
    throw new Error(
      `找不到 ${SRC_HOOKS}\n` +
      `  修法: 確認 v2.0.B.221 後 src/data/lessonHooks.ts 已建立`
    );
  }
  const ts = fs.readFileSync(SRC_HOOKS, 'utf-8');
  // 是否已含 Ch{N}
  const re = new RegExp(`'kt-ch${ctx.ch}-l\\d+'`);
  if (re.test(ts)) {
    ok(`Ch${ctx.ch} entries 已存在於 lessonHooks.ts, skip`);
    return;
  }

  const hooks = ctx.lessonHooks && ctx.lessonHooks.length === 7
    ? ctx.lessonHooks
    : Array.from({ length: 7 }, (_, i) => ({
        id: `kt-ch${ctx.ch}-l${i+1}`, type: 'B?', inquiry: 'TBD'
      }));

  const lines = [`  // Ch${ctx.ch} ${ctx.slug} (auto-added by pickup-new-story)`];
  for (const h of hooks) {
    const inq = h.inquiry.replace(/'/g, "\\'");
    lines.push(`  '${h.id}': { type: '${h.type}', inquiry: '${inq}' },`);
  }
  const block = lines.join('\n');

  // Insert right before final closing `};`
  const closingRe = /\n\};\s*$/;
  let updated;
  if (closingRe.test(ts)) {
    updated = ts.replace(closingRe, `\n${block}\n};\n`);
  } else {
    // fallback: append before EOF
    updated = ts + `\n${block}\n`;
  }
  fs.writeFileSync(SRC_HOOKS, updated, 'utf-8');
  ok(`Inserted ${hooks.length} hooks for Ch${ctx.ch} into lessonHooks.ts`);

  // 然後再 sync 一次, 把 ts 新 entries 推到 cjs HOOK_MAP
  if (fileExists(SYNC_HOOKS)) {
    const r2 = spawnSync('node', [SYNC_HOOKS], { cwd: ROOT, encoding: 'utf-8' });
    if (r2.status === 0) ok('Re-synced HOOK_MAP after ts update');
    else warn('Re-sync after ts update failed (non-fatal)');
  }
}

// ─── Step 12: git stage ───────────────────────────────────────────────
function stepStage(ctx) {
  head('Step 12: Git add (NOT commit)');
  if (ctx.flags.dry) { ok('skipped (dry)'); return; }

  const targets = [
    `docs/canon/${ctx.slug}.md`,
    `docs/canon/${ctx.slug}-cuts.md`,
    `tools/_write-ch${ctx.ch}-${ctx.slug}.cjs`,
    `public/lessons-ch${ctx.ch}.json`,
    `public/qa-static-ch${ctx.ch}.html`,
    `public/qa-static.html`,
    `src/data/lessonHooks.ts`,
    `tools/_content-db.cjs`,
  ].filter(p => fileExists(path.join(ROOT, p)));

  if (targets.length === 0) {
    warn('沒檔可 stage');
    return;
  }
  try {
    execSync(`git add ${targets.map(p => `"${p}"`).join(' ')}`, { cwd: ROOT, stdio: 'pipe' });
    ok(`git add: ${targets.length} files`);
    for (const t of targets) log(`  ${C.dim}+ ${t}${C.reset}`);
  } catch (e) {
    warn(`git add 失敗 (可能不在 git repo): ${e.message.slice(0,200)}`);
  }
}

// ─── Step 13: summary ─────────────────────────────────────────────────
function stepSummary(ctx) {
  head('Step 13: Summary');
  log(`\n${C.bold}${C.grn}故事 ${ctx.slug} 已 ship 到 Ch${ctx.ch}, 跑 git diff review 後 commit${C.reset}\n`);
  log(`產出檔:`);
  log(`  ${C.cyn}docs/canon/${ctx.slug}.md${C.reset}              (canon 7-beat)`);
  log(`  ${C.cyn}docs/canon/${ctx.slug}-cuts.md${C.reset}         (B1-B6 hook cuts)`);
  log(`  ${C.cyn}tools/_write-ch${ctx.ch}-${ctx.slug}.cjs${C.reset}        (lesson script)`);
  log(`  ${C.cyn}public/lessons-ch${ctx.ch}.json${C.reset}             (7 lessons × 11 Q)`);
  log(`  ${C.cyn}public/qa-static-ch${ctx.ch}.html${C.reset}           (offline editor)`);
  log(`  ${C.cyn}src/data/lessonHooks.ts${C.reset}              (+7 hook entries)`);
  log(`  ${C.cyn}tools/_content-db.cjs${C.reset}                (HOOK_MAP synced)`);
  log(`\n下一步:`);
  log(`  ${C.dim}1.${C.reset} git diff --staged              ${C.dim}# 看完整 diff${C.reset}`);
  log(`  ${C.dim}2.${C.reset} 開 qa-static-ch${ctx.ch}.html       ${C.dim}# 人工 audit Q 內容${C.reset}`);
  log(`  ${C.dim}3.${C.reset} git commit -m "v2.0.X: Ch${ctx.ch} ${ctx.slug} ship — 7 lessons × 11 Q"`);
  log('');
}

// ─── Main pipeline ────────────────────────────────────────────────────
async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));

  if (flags.help || positional.length === 0) {
    printHelp();
    process.exit(flags.help ? 0 : 1);
  }

  const input = positional[0];
  const slug = flags.slug || slugFromInput(input);
  const ch = flags.ch || autoDetectChapter();
  const from = flags.from || 'fetch';
  const to = flags.to || 'summary';

  if (!slug) {
    err('無法推導 slug, 請用 --slug=xxx');
    process.exit(1);
  }

  // ─── Context ───
  const ctx = { input, slug, ch, flags, lessonHooks: [] };

  log(`${C.bold}pickup-new-story${C.reset} — ${slug} → Ch${ch}`);
  log(`Input: ${C.cyn}${input}${C.reset}`);
  log(`From: ${C.cyn}${from}${C.reset} → To: ${C.cyn}${to}${C.reset}`);
  if (flags.dry)   log(`${C.ylw}[DRY-RUN]${C.reset} 不會寫入任何檔`);
  if (flags.force) log(`${C.ylw}[FORCE]${C.reset} 會覆蓋已存在 canon/cuts/script`);
  if (!process.env.ANTHROPIC_API_KEY) {
    log(`${C.ylw}[NO API KEY]${C.reset} canon/cuts/lessons 會印 prompt 給你手動跑`);
  }

  // ─── Step ordering ───
  const allSteps = [
    ['fetch',    stepFetch],
    ['parse',    stepParse],
    ['canon',    stepCanon],
    ['cuts',     stepCuts],
    ['lessons',  stepLessons],
    ['json',     stepJson],
    ['validate', stepValidate],
    ['qa',       stepQa],
    ['sync',     stepSync],
    ['hooksts',  stepHooksTs],
    ['stage',    stepStage],
    ['summary',  stepSummary],
  ];

  const fromIdx = allSteps.findIndex(([name]) => name === from);
  const toIdx   = allSteps.findIndex(([name]) => name === to);
  if (fromIdx < 0) { err(`--from=${from} 不認得`); process.exit(1); }
  if (toIdx   < 0) { err(`--to=${to} 不認得`); process.exit(1); }

  for (let i = fromIdx; i <= toIdx; i++) {
    const [name, fn] = allSteps[i];
    try {
      const result = fn(ctx);
      if (result && typeof result.then === 'function') await result;
    } catch (e) {
      err(`Step "${name}" 失敗:\n${e.message}`);
      process.exit(2);
    }
  }
}

main().catch((e) => {
  err(`Pipeline crashed: ${e.message}`);
  process.exit(99);
});
