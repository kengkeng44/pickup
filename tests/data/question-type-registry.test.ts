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
] as const;

// ⚠️ Hardcoded mirror of RENDERERS keys in src/react-app/renderers.tsx
// (cannot import a .tsx React module in node-env vitest). Keep in sync.
const RENDERER_TYPES = new Set<string>([
  'narration',
  'listen-tf',
  'listen-tf-zh',
  'listen-mc',
  'listen-comprehension',
  'listen-emoji',
  'read-mc-with-audio',
  'type-what-you-hear',
  'tap-tiles',
  'tap-pairs',
  'emoji-pick',
  'picture-mc',
  'read-and-tap',
  'drag-blank',
  'speak-back',
  'listen-build',
]);

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
