#!/usr/bin/env node
/**
 * Build-time validation: parse all public/lessons-ch*.json files against
 * the runtime Zod schema. Catches schema-data mismatches before deploy.
 *
 * Root cause prevention: kt-ch1-06 bug (5-element options array vs
 * tuple([4])) shipped in v1.9.50 because no build-time validation
 * existed. Production users hit it 7 commits later.
 *
 * Design note: full Zod validation requires running the TS schema in
 * Node which needs tsx / vite-node. We bypass by doing fast JSON shape
 * checks here (top-level array + parseable JSON); chapter-specific
 * vitest files (Task 10+) do the real Zod validation. Splitting the
 * checks lets `npm run build` stay fast (~20ms node script) and reuse
 * the test framework's existing TS support.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const publicDir = resolve(repoRoot, 'public');

const files = readdirSync(publicDir).filter(
  (f) => /^lessons-ch\d+\.json$/.test(f)
);

if (files.length === 0) {
  console.log('No lessons-ch*.json files found. Skipping validation.');
  process.exit(0);
}

let allOk = true;
for (const file of files) {
  const path = resolve(publicDir, file);
  try {
    const raw = JSON.parse(readFileSync(path, 'utf-8'));
    if (!Array.isArray(raw)) {
      console.error(`FAIL ${file}: top-level must be an array`);
      allOk = false;
      continue;
    }
    // Defer full Zod validation to vitest test file
    // tests/data/lessons-ch{N}-validate.test.ts (added in Task 10)
    console.log(`OK ${file}: ${raw.length} lessons (JSON shape)`);
  } catch (e) {
    console.error(`FAIL ${file}: ${e.message}`);
    allOk = false;
  }
}

if (!allOk) {
  console.error('\nValidation failed. Run `npm test` for full Zod validation details.');
}
process.exit(allOk ? 0 : 1);
