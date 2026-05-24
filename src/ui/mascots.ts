/**
 * Mascot SVG library — 6 NPCs as inline SVG strings.
 *
 * Each NPC is a single circle-head + body silhouette + emoji-face SVG.
 * Style choice: intentionally simple to stay within bundle + time budget.
 * The "personality" comes from the body color + props (apron, scarf,
 * stethoscope, etc.) plus an emoji-style face that makes the figure
 * read at small sizes.
 *
 * Animation lives in CSS (see mascot.css) — the SVG itself is static.
 * We just toggle CSS classes on the wrapper to switch idle/happy/sad.
 *
 * SVG viewBox: 0 0 100 140, drawn so the figure sits centered with
 * head around y=40 and body from y=70 to y=130.
 */

export type MascotAnim = 'idle' | 'happy' | 'sad';

export interface MascotDef {
  id: string;
  svg: string;
}

// ─── Shared building blocks ────────────────────────────────────────────────

function face(emoji: string, cx = 50, cy = 38, fontSize = 22): string {
  return `<text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="${fontSize}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif">${emoji}</text>`;
}

function head(skin = '#fde0c2', stroke = '#2a2730'): string {
  return `<ellipse cx="50" cy="38" rx="22" ry="24" fill="${skin}" stroke="${stroke}" stroke-width="1.5"/>`;
}

// ─── Owl (default / free practice) ─────────────────────────────────────────
// Inspired by language-app owl mascots (rounded body, big eyes).
const owl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <g class="mascot-body">
    <!-- Body -->
    <ellipse cx="50" cy="78" rx="34" ry="38" fill="#7fbf6a" stroke="#2a2730" stroke-width="1.5"/>
    <!-- Belly -->
    <ellipse cx="50" cy="88" rx="22" ry="24" fill="#e8f5d6"/>
    <!-- Eyes -->
    <circle cx="38" cy="68" r="10" fill="#ffffff" stroke="#2a2730" stroke-width="1.2"/>
    <circle cx="62" cy="68" r="10" fill="#ffffff" stroke="#2a2730" stroke-width="1.2"/>
    <circle cx="38" cy="69" r="4" fill="#2a2730" class="mascot-pupil"/>
    <circle cx="62" cy="69" r="4" fill="#2a2730" class="mascot-pupil"/>
    <!-- Beak -->
    <polygon points="50,76 45,82 55,82" fill="#f0a040" stroke="#2a2730" stroke-width="0.8"/>
    <!-- Tufts -->
    <polygon points="26,46 30,38 36,46" fill="#7fbf6a" stroke="#2a2730" stroke-width="1.2"/>
    <polygon points="64,46 70,38 74,46" fill="#7fbf6a" stroke="#2a2730" stroke-width="1.2"/>
    <!-- Wing -->
    <ellipse cx="22" cy="86" rx="8" ry="16" fill="#6aa358" stroke="#2a2730" stroke-width="1.2" class="mascot-wing"/>
    <ellipse cx="78" cy="86" rx="8" ry="16" fill="#6aa358" stroke="#2a2730" stroke-width="1.2" class="mascot-wing-right"/>
  </g>
</svg>`;

// ─── Waiter (restaurant) ───────────────────────────────────────────────────
const waiter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <g class="mascot-body">
    <!-- Apron back / body -->
    <rect x="22" y="68" width="56" height="62" rx="6" fill="#3a3a44" stroke="#2a2730" stroke-width="1.5"/>
    <!-- Apron front (white) -->
    <rect x="30" y="78" width="40" height="50" rx="4" fill="#ffffff" stroke="#2a2730" stroke-width="1.2"/>
    <!-- Bow tie -->
    <polygon points="44,72 56,72 52,76 48,76" fill="#e25c4d"/>
    <!-- Head -->
    ${head('#fde0c2')}
    <!-- Hair -->
    <path d="M30 30 Q50 18 70 30 L68 38 Q50 30 32 38 Z" fill="#3a2a1a"/>
    <!-- Tray (held to the side) -->
    <rect x="76" y="86" width="20" height="4" rx="2" fill="#c08040" stroke="#2a2730" stroke-width="1"/>
    <circle cx="86" cy="82" r="3" fill="#fff8e8" stroke="#2a2730" stroke-width="0.8"/>
    ${face('🙂')}
  </g>
</svg>`;

// ─── Flight Attendant (airport) ────────────────────────────────────────────
const flightAttendant = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <g class="mascot-body">
    <!-- Uniform body (navy) -->
    <path d="M22 72 Q50 64 78 72 L82 130 L18 130 Z" fill="#243a6e" stroke="#2a2730" stroke-width="1.5"/>
    <!-- Lapel V -->
    <polygon points="42,72 58,72 50,90" fill="#ffffff" stroke="#2a2730" stroke-width="0.8"/>
    <!-- Scarf (red) -->
    <path d="M38 70 Q50 76 62 70 L60 78 Q50 82 40 78 Z" fill="#e25c4d" stroke="#2a2730" stroke-width="0.8"/>
    <!-- Head -->
    ${head('#fde0c2')}
    <!-- Hair (bun) -->
    <path d="M28 32 Q50 18 72 32 Q70 24 50 22 Q30 24 28 32 Z" fill="#5a3a20"/>
    <circle cx="72" cy="22" r="5" fill="#5a3a20"/>
    <!-- Hat (small pillbox) -->
    <rect x="36" y="20" width="28" height="6" rx="2" fill="#243a6e" stroke="#2a2730" stroke-width="0.8"/>
    <!-- Wings pin -->
    <polygon points="40,86 50,90 60,86 50,92" fill="#f0c040" stroke="#2a2730" stroke-width="0.6"/>
    ${face('🙂')}
  </g>
</svg>`;

// ─── Doctor (hospital) ─────────────────────────────────────────────────────
const doctor = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <g class="mascot-body">
    <!-- White coat -->
    <path d="M22 72 Q50 64 78 72 L82 130 L18 130 Z" fill="#ffffff" stroke="#2a2730" stroke-width="1.5"/>
    <!-- Coat collar opening -->
    <polygon points="44,72 56,72 50,96" fill="#e8f3f1" stroke="#2a2730" stroke-width="0.8"/>
    <!-- Inner shirt -->
    <polygon points="46,76 54,76 52,90 48,90" fill="#3aa89b"/>
    <!-- Head -->
    ${head('#fde0c2')}
    <!-- Hair -->
    <path d="M28 30 Q50 18 72 30 L70 36 Q50 30 30 36 Z" fill="#2a2010"/>
    <!-- Stethoscope -->
    <path d="M40 80 Q36 96 42 110 Q48 116 54 110" fill="none" stroke="#2a2730" stroke-width="1.6"/>
    <circle cx="56" cy="110" r="3.5" fill="#a8a2b3" stroke="#2a2730" stroke-width="1"/>
    <!-- Pocket -->
    <rect x="60" y="100" width="12" height="14" fill="none" stroke="#a8a2b3" stroke-width="0.8"/>
    ${face('🙂')}
  </g>
</svg>`;

// ─── Coworker (office) ─────────────────────────────────────────────────────
const coworker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <g class="mascot-body">
    <!-- Casual shirt (indigo) -->
    <path d="M22 72 Q50 66 78 72 L82 130 L18 130 Z" fill="#6a6dd3" stroke="#2a2730" stroke-width="1.5"/>
    <!-- T-shirt collar -->
    <path d="M42 70 Q50 76 58 70" fill="none" stroke="#2a2730" stroke-width="1"/>
    <!-- Head -->
    ${head('#fde0c2')}
    <!-- Hair (short, side-parted) -->
    <path d="M28 30 Q40 18 56 22 Q70 26 72 32 L70 38 Q60 28 44 30 Q34 32 30 38 Z" fill="#3a2a1a"/>
    <!-- Glasses -->
    <circle cx="40" cy="40" r="5" fill="none" stroke="#2a2730" stroke-width="1.2"/>
    <circle cx="60" cy="40" r="5" fill="none" stroke="#2a2730" stroke-width="1.2"/>
    <line x1="45" y1="40" x2="55" y2="40" stroke="#2a2730" stroke-width="1.2"/>
    <!-- Laptop in front -->
    <rect x="30" y="106" width="40" height="22" rx="2" fill="#d4d2dc" stroke="#2a2730" stroke-width="1"/>
    <rect x="34" y="110" width="32" height="14" fill="#2a2730"/>
    ${face('🙂', 50, 30, 16)}
  </g>
</svg>`;

// ─── Receptionist (hotel) ──────────────────────────────────────────────────
const receptionist = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <g class="mascot-body">
    <!-- Vest (gold) -->
    <path d="M22 72 Q50 64 78 72 L82 130 L18 130 Z" fill="#cba24a" stroke="#2a2730" stroke-width="1.5"/>
    <!-- White shirt under vest -->
    <polygon points="42,72 58,72 56,130 44,130" fill="#ffffff" stroke="#2a2730" stroke-width="0.8"/>
    <!-- Tie -->
    <polygon points="48,72 52,72 53,96 50,108 47,96" fill="#8a3a2a" stroke="#2a2730" stroke-width="0.6"/>
    <!-- Lapel -->
    <polygon points="42,72 22,72 26,90" fill="#a8852a"/>
    <polygon points="58,72 78,72 74,90" fill="#a8852a"/>
    <!-- Head -->
    ${head('#fde0c2')}
    <!-- Hair (neat) -->
    <path d="M28 30 Q50 18 72 30 L70 38 Q50 26 30 38 Z" fill="#4a2a1a"/>
    <!-- Service bell -->
    <ellipse cx="86" cy="118" rx="8" ry="6" fill="#e0b850" stroke="#2a2730" stroke-width="1"/>
    <circle cx="86" cy="112" r="2" fill="#e0b850" stroke="#2a2730" stroke-width="0.8"/>
    <rect x="80" y="124" width="12" height="3" fill="#a8852a" stroke="#2a2730" stroke-width="0.6"/>
    ${face('🙂')}
  </g>
</svg>`;

export const MASCOTS: Record<string, MascotDef> = {
  owl: { id: 'owl', svg: owl },
  waiter: { id: 'waiter', svg: waiter },
  flightAttendant: { id: 'flightAttendant', svg: flightAttendant },
  doctor: { id: 'doctor', svg: doctor },
  coworker: { id: 'coworker', svg: coworker },
  receptionist: { id: 'receptionist', svg: receptionist },
};

export function getMascotSvg(id: string): string {
  return (MASCOTS[id] ?? MASCOTS.owl).svg;
}
