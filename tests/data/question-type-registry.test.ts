/**
 * P19 — registry/type completeness guard.
 *
 * Root cause class: v2.0.B.249 "tap-pairs 27 章全炸" — a question `type`
 * string existed in shipped lessons-ch*.json but the runtime didn't handle
 * it. This test walks EVERY public/lessons-ch*.json and asserts every
 * `type` value is (a) a member of the Zod QuestionSchema discriminated
 * union in src/data/lessons.ts and (b) a key of the RENDERERS registry in
 * src/react-app/renderers.tsx.
 *
 * The schema set is introspected from the exported QuestionSchema when
 * possible (ZodEffects -> discriminatedUnion -> optionsMap), with a
 * hardcoded fallback. The renderer set CANNOT be imported here (vitest
 * runs in node env; renderers.tsx pulls in React + audio/window deps),
 * so it is hardcoded — ⚠️ MUST STAY IN SYNC with the RENDERERS map in
 * src/react-app/renderers.tsx. If you add a renderer key, add it here.
 */
import { describe, it, expect } from 'vitest';
import { QuestionSchema } from '../../src/data/lessons';

// Load lesson banks via Vite glob (no node:fs — keeps tsc green under
// types:["vite/client"]).
const LESSON_MODULES = import.meta.glob('../../public/lessons-ch*.json', {
  eager: true,
}) as Record<string, { default: unknown[] }>;

function lessonFiles(): Array<[string, unknown[]]> {
  return Object.entries(LESSON_MODULES)
    .map(([p, m]) => [p.split('/').pop() as string, m.default] as [string, unknown[]])
    .filter(([f]) => /^lessons-ch\d+\.json$/.test(f));
}

// Mirror of the discriminated union in src/data/lessons.ts (QuestionUnion).
// Used as fallback if Zod introspection breaks on a future zod upgrade,
// and cross-checked against the introspected set below.
const SCHEMA_TYPES_HARDCODED = [
  'listen-mc',
  'listen-emoji',
  'listen-comprehension',
  'read-mc-with-audio',
  'type-what-you-hear',
  'tap-tiles',
  'tap-pairs',
  'narration',
  'listen-tf-zh',
  'listen-tf',
  'emoji-pick',
  'picture-mc',
  'read-and-tap',
  'drag-blank',
  'speak-back',
  'listen-build',
  // 2026-08-16: 補上 B.321-B.434 期間新增的 7 種。這份清單原本停在 7/09，
  // 導致 cross-check 一直紅 —— 它只是 introspection 壞掉時的後備，
  // 真正的來源是 QuestionSchema 本身。
  'comprehension',
  'read-comprehension',
  'listen-pairs',
  'phrase-pairs',
  'grammar-mc',
  'scroll-pick',
  'type-translate',
] as const;

// RENDERERS 的 key 從 renderers.tsx 原始碼直接解析。
//
// 原本這裡是一份手抄清單，靠註解要求「MUST STAY IN SYNC」—— 結果它從
// 7/09 起就沒跟上，master 新增 7 個 renderer 後這個測試連紅 3 項，報的
// 卻是「這些題型沒有 renderer」這種會讓人去查錯地方的假警報。
//
// 不能 import .tsx（node-env vitest 會拖進 React/window 相依），但可以用
// Vite 的 ?raw 讀原始碼文字，跟 xp-coins-contract 同一招。
const RENDERERS_SRC = import.meta.glob(
  '../../src/react-app/renderers.tsx',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

function parseRendererTypes(): Set<string> {
  const src = Object.values(RENDERERS_SRC)[0] || '';
  const start = src.indexOf('export const RENDERERS');
  if (start === -1) {
    throw new Error('找不到 export const RENDERERS — renderers.tsx 結構改了，請更新這個 parser');
  }
  // 從 map 的 { 開始做括號配對，取出 map body（值都是識別字，無巢狀物件）
  const open = src.indexOf('{', start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i += 1) {
    if (src[i] === '{') depth += 1;
    else if (src[i] === '}') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) throw new Error('RENDERERS map 的括號沒有配對成功');
  const body = src.slice(open, end);
  // 只抓行首的 'key': ——註解行（//）不會匹配
  const keys = [...body.matchAll(/^\s*'([a-z0-9-]+)'\s*:/gim)].map((m) => m[1]);
  if (keys.length === 0) throw new Error('RENDERERS map 解析出 0 個 key');
  return new Set(keys);
}

const RENDERER_TYPES = parseRendererTypes();

/** Introspect the discriminated union inside QuestionSchema (ZodEffects). */
function introspectSchemaTypes(): Set<string> | null {
  try {
    // QuestionSchema = QuestionUnion.superRefine(...) → ZodEffects wraps
    // the union in _def.schema. ZodDiscriminatedUnion exposes optionsMap
    // (Map<discriminatorValue, ZodObject>).
    const anySchema = QuestionSchema as unknown as { _def?: { schema?: unknown } };
    const inner = anySchema._def?.schema as
      | { optionsMap?: Map<string, unknown>; _def?: { optionsMap?: Map<string, unknown> } }
      | undefined;
    const map = inner?.optionsMap ?? inner?._def?.optionsMap;
    if (map && map.size > 0) return new Set([...map.keys()].map(String));
  } catch {
    // fall through to null → hardcoded fallback
  }
  return null;
}

function collectDataTypes(): Map<string, string[]> {
  // type -> [example locations]
  const seen = new Map<string, string[]>();
  const files = lessonFiles();
  expect(files.length).toBeGreaterThan(0);
  for (const [file, raw] of files) {
    for (const lesson of raw as Array<{ questions?: Array<{ type: string; id: string }> }>) {
      for (const q of lesson.questions ?? []) {
        const list = seen.get(q.type) ?? [];
        if (list.length < 3) list.push(`${file}:${q.id}`);
        seen.set(q.type, list);
      }
    }
  }
  return seen;
}

describe('question type registry completeness (tap-pairs B.249 bug class)', () => {
  it('hardcoded schema type list stays in sync with the Zod discriminated union', () => {
    const introspected = introspectSchemaTypes();
    // If introspection fails on a zod upgrade, this test degrades to a
    // no-op (fallback covers the data assertions below) — but while it
    // works, it pins the hardcoded mirror to the real schema.
    if (introspected) {
      expect([...introspected].sort()).toEqual([...SCHEMA_TYPES_HARDCODED].sort());
    }
  });

  it('every question type in public/lessons-ch*.json is a known Zod schema type', () => {
    const schemaTypes = introspectSchemaTypes() ?? new Set<string>(SCHEMA_TYPES_HARDCODED);
    const dataTypes = collectDataTypes();
    const unknown = [...dataTypes.entries()].filter(([t]) => !schemaTypes.has(t));
    expect(
      unknown,
      `Unknown question type(s) in lesson data (not in QuestionSchema union): ${unknown
        .map(([t, locs]) => `"${t}" @ ${locs.join(', ')}`)
        .join('; ')}`
    ).toEqual([]);
  });

  it('every question type in public/lessons-ch*.json has a RENDERERS entry', () => {
    const dataTypes = collectDataTypes();
    const unrendered = [...dataTypes.entries()].filter(([t]) => !RENDERER_TYPES.has(t));
    expect(
      unrendered,
      `Question type(s) in lesson data with no renderer (would hit FallbackRenderer "未知題型"): ${unrendered
        .map(([t, locs]) => `"${t}" @ ${locs.join(', ')}`)
        .join('; ')}`
    ).toEqual([]);
  });

  it('renderer registry covers every schema type (no schema type without UI)', () => {
    const schemaTypes = introspectSchemaTypes() ?? new Set<string>(SCHEMA_TYPES_HARDCODED);
    const uncovered = [...schemaTypes].filter((t) => !RENDERER_TYPES.has(t));
    expect(uncovered).toEqual([]);
  });
});
