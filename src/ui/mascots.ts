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
// v0.7 redesign — cleaner Duo-style owl: vivid green, big sparkly eyes,
// white belly, orange triangle beak, tiny feet, soft ground shadow.
const owl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <!-- Soft ground shadow -->
  <ellipse cx="50" cy="128" rx="26" ry="4" fill="#000000" opacity="0.12"/>
  <g class="mascot-body">
    <!-- Tufts (behind body) -->
    <path d="M22 50 Q26 36 34 44 Q30 50 26 54 Z" fill="#43a302"/>
    <path d="M78 50 Q74 36 66 44 Q70 50 74 54 Z" fill="#43a302"/>
    <!-- Body (vivid Duolingo green, rounded teardrop) -->
    <path d="M50 38 C30 38 20 56 20 80 C20 106 32 122 50 122 C68 122 80 106 80 80 C80 56 70 38 50 38 Z"
          fill="#58cc02"/>
    <!-- Belly highlight (white) -->
    <ellipse cx="50" cy="92" rx="22" ry="24" fill="#ffffff"/>
    <!-- Wings -->
    <path d="M22 76 Q14 80 18 100 Q24 104 30 96 Z" fill="#43a302"/>
    <path d="M78 76 Q86 80 82 100 Q76 104 70 96 Z" fill="#43a302"/>
    <!-- Eye whites (big) -->
    <circle cx="39" cy="68" r="13" fill="#ffffff"/>
    <circle cx="61" cy="68" r="13" fill="#ffffff"/>
    <!-- Pupils with sparkle highlights -->
    <circle cx="40" cy="69" r="6" fill="#2a2730" class="mascot-pupil mascot-eye"/>
    <circle cx="60" cy="69" r="6" fill="#2a2730" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="42" cy="66" r="2" fill="#ffffff"/>
    <circle cx="62" cy="66" r="2" fill="#ffffff"/>
    <!-- Beak (orange triangle) -->
    <path d="M50 80 L44 86 L56 86 Z" fill="#ff9600"/>
    <!-- Feet (tiny orange) -->
    <ellipse cx="42" cy="122" rx="5" ry="3" fill="#ff9600"/>
    <ellipse cx="58" cy="122" rx="5" ry="3" fill="#ff9600"/>
  </g>
</svg>`;

// ─── Waiter (restaurant) ───────────────────────────────────────────────────
// v0.7 redesign — cleaner shapes, drawn-on cute face (no emoji),
// soft ground shadow.
const waiter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <ellipse cx="50" cy="128" rx="26" ry="4" fill="#000000" opacity="0.12"/>
  <g class="mascot-body">
    <!-- Apron back / body -->
    <path d="M22 70 Q50 64 78 70 L80 128 L20 128 Z" fill="#3a3a44"/>
    <!-- Apron front (white) -->
    <path d="M32 78 Q50 74 68 78 L68 128 L32 128 Z" fill="#ffffff"/>
    <!-- Bow tie -->
    <path d="M44 70 L40 76 L44 80 L50 76 L56 80 L60 76 L56 70 Z" fill="#e25c4d"/>
    <!-- Head (rounded) -->
    <ellipse cx="50" cy="40" rx="22" ry="24" fill="#fde0c2"/>
    <!-- Hair (smooth swoop) -->
    <path d="M28 32 Q50 18 72 32 Q70 28 66 26 Q50 22 34 26 Q30 28 28 32 Z" fill="#3a2a1a"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="2.4" fill="#2a2730" class="mascot-pupil mascot-eye"/>
    <circle cx="58" cy="42" r="2.4" fill="#2a2730" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <!-- Smile -->
    <path d="M44 50 Q50 54 56 50" fill="none" stroke="#2a2730" stroke-width="1.6" stroke-linecap="round"/>
    <!-- Cheek blush -->
    <circle cx="36" cy="48" r="2.5" fill="#ff9b9b" opacity="0.55"/>
    <circle cx="64" cy="48" r="2.5" fill="#ff9b9b" opacity="0.55"/>
    <!-- Tray -->
    <rect x="74" y="86" width="22" height="4" rx="2" fill="#c08040"/>
    <circle cx="86" cy="82" r="3.5" fill="#fff8e8"/>
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
