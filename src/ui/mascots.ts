/**
 * Mascot SVG library — RUMBO sticker / iconic cartoon style.
 *
 * Visual rules:
 *  - BOLD black outline (#1a1a1a, ~3-4px stroke), confident smooth curves
 *  - PURE FLAT COLORS — no gradients, no filters, no textures
 *  - BIG round head (~45-55% of canvas height)
 *  - Stubby simple body, 1-2 flat fills max
 *  - Round-dot eyes with optional single white highlight
 *  - Confident single-curve mouth
 *  - One signature accent color per character
 *  - Optional sticker-halo (signature color circle behind figure)
 *
 * SVG viewBox: 0 0 100 140 — animation system depends on this.
 * CSS class names (`mascot-body`, `mascot-pupil`, `mascot-eye`,
 * `mascot-eye-right`) are preserved for animation hooks.
 *
 * Animation lives in CSS (see mascot.css) — the SVG itself is static.
 * We just toggle CSS classes on the wrapper to switch idle/happy/sad.
 */

export type MascotAnim = 'idle' | 'happy' | 'sad';

export interface MascotDef {
  id: string;
  svg: string;
}

// ─── Owl (default / free practice) ─────────────────────────────────────────
// Big round cream owl, yellow headband, sage sticker halo.
const owl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <!-- Sticker halo -->
  <circle cx="50" cy="72" r="48" fill="#a8d5a2" opacity="0.7"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (rounded teardrop, cream) -->
    <path d="M50 42 C26 42 18 66 18 88 C18 112 32 128 50 128 C68 128 82 112 82 88 C82 66 74 42 50 42 Z" fill="#fef3c7"/>
    <!-- Belly highlight -->
    <ellipse cx="50" cy="98" rx="20" ry="22" fill="#fcd34d" opacity="0.45" stroke="none"/>
    <!-- Wings -->
    <path d="M22 82 Q14 96 22 112 Q30 110 30 96 Z" fill="#fcd34d"/>
    <path d="M78 82 Q86 96 78 112 Q70 110 70 96 Z" fill="#fcd34d"/>
    <!-- Yellow headband (signature) -->
    <path d="M22 56 Q50 46 78 56 L78 62 Q50 54 22 62 Z" fill="#fcd34d"/>
    <!-- Eye whites -->
    <circle cx="38" cy="76" r="9" fill="#ffffff"/>
    <circle cx="62" cy="76" r="9" fill="#ffffff"/>
    <!-- Pupils -->
    <circle cx="38" cy="76" r="4.5" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="62" cy="76" r="4.5" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <!-- Eye highlights -->
    <circle cx="39.5" cy="74.5" r="1.5" fill="#ffffff" stroke="none"/>
    <circle cx="63.5" cy="74.5" r="1.5" fill="#ffffff" stroke="none"/>
    <!-- Beak -->
    <path d="M50 86 L45 94 L55 94 Z" fill="#f97316"/>
    <!-- Feet -->
    <path d="M40 126 L36 130 M40 126 L40 131 M40 126 L44 130" stroke-width="2.5"/>
    <path d="M60 126 L56 130 M60 126 L60 131 M60 126 L64 130" stroke-width="2.5"/>
  </g>
</svg>`;

// ─── Waiter (restaurant) ───────────────────────────────────────────────────
// White shirt + black apron, red bowtie signature.
const waiter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="72" r="48" fill="#fef3c7" opacity="0.7"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body / shirt (white) -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#ffffff"/>
    <!-- Apron (black) -->
    <path d="M34 86 L66 86 L70 132 L30 132 Z" fill="#1a1a1a"/>
    <!-- Apron tie -->
    <path d="M40 86 Q50 78 60 86" fill="none"/>
    <!-- Head (big round, peach) -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8"/>
    <!-- Hair cap (dark) -->
    <path d="M26 38 Q26 18 50 16 Q74 18 74 38 Q70 28 50 28 Q30 28 26 38 Z" fill="#1a1a1a"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="58" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="43" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="59" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <!-- Smile -->
    <path d="M44 52 Q50 56 56 52" fill="none" stroke-width="2.5"/>
    <!-- Red bowtie (signature) -->
    <path d="M42 68 L42 76 L50 72 L58 76 L58 68 L50 72 Z" fill="#dc2626"/>
    <circle cx="50" cy="72" r="1.8" fill="#1a1a1a" stroke="none"/>
  </g>
</svg>`;

// ─── Flight Attendant (airport) ────────────────────────────────────────────
// Navy uniform, sky-blue sticker halo, amber wings pin.
const flightAttendant = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="72" r="48" fill="#bfdbfe" opacity="0.8"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Uniform body (navy) -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#1e3a8a"/>
    <!-- White lapel V -->
    <path d="M42 70 L50 88 L58 70 Z" fill="#ffffff"/>
    <!-- Wings pin (amber) -->
    <path d="M44 92 L50 90 L56 92 L50 96 Z" fill="#fcd34d"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#f5e6d3"/>
    <!-- Hair bun (dark) -->
    <path d="M26 36 Q28 18 50 16 Q72 18 74 36 Q70 28 50 28 Q30 28 26 36 Z" fill="#3d2817"/>
    <circle cx="74" cy="24" r="6" fill="#3d2817"/>
    <!-- Hat (navy) -->
    <path d="M32 24 Q50 18 68 24 L66 32 L34 32 Z" fill="#1e3a8a"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="58" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="43" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="59" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <!-- Smile -->
    <path d="M44 52 Q50 56 56 52" fill="none" stroke-width="2.5"/>
    <!-- Cheek blush -->
    <circle cx="36" cy="50" r="3" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <circle cx="64" cy="50" r="3" fill="#f4a8a8" opacity="0.7" stroke="none"/>
  </g>
</svg>`;

// ─── Doctor (hospital) ─────────────────────────────────────────────────────
// White coat with green cross signature.
const doctor = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="72" r="48" fill="#d1fae5" opacity="0.7"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Coat (white) -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#ffffff"/>
    <!-- Coat opening -->
    <path d="M50 70 L50 132" fill="none" stroke-width="2.5"/>
    <!-- Green cross badge (signature) -->
    <rect x="62" y="92" width="12" height="12" fill="#10b981"/>
    <path d="M68 94 L68 102 M64 98 L72 98" stroke="#ffffff" stroke-width="2"/>
    <!-- Stethoscope (around neck) -->
    <path d="M38 72 Q34 90 42 100 Q50 106 58 100 Q66 90 62 72" fill="none" stroke-width="2.5"/>
    <circle cx="58" cy="104" r="4" fill="#10b981"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8"/>
    <!-- Hair (dark) -->
    <path d="M26 36 Q28 16 50 14 Q72 16 74 36 Q68 26 50 26 Q32 26 26 36 Z" fill="#1a1a1a"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="58" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="43" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="59" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <!-- Gentle smile -->
    <path d="M44 52 Q50 55 56 52" fill="none" stroke-width="2.5"/>
    <!-- Cheek blush -->
    <circle cx="36" cy="50" r="3" fill="#f4a8a8" opacity="0.6" stroke="none"/>
    <circle cx="64" cy="50" r="3" fill="#f4a8a8" opacity="0.6" stroke="none"/>
  </g>
</svg>`;

// ─── Coworker (office) ─────────────────────────────────────────────────────
// Orange shirt, glasses, laptop. Warm cream halo.
const coworker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="72" r="48" fill="#fed7aa" opacity="0.7"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Shirt (orange) -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#f97316"/>
    <!-- T-shirt collar -->
    <path d="M42 72 Q50 80 58 72" fill="none" stroke-width="2.5"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8"/>
    <!-- Hair side-part -->
    <path d="M26 36 Q30 16 54 16 Q72 18 74 36 Q66 26 50 26 Q34 28 26 36 Z" fill="#3d2817"/>
    <!-- Glasses -->
    <circle cx="40" cy="42" r="6" fill="#ffffff" stroke-width="2.8"/>
    <circle cx="60" cy="42" r="6" fill="#ffffff" stroke-width="2.8"/>
    <path d="M46 42 L54 42" stroke-width="2.5"/>
    <!-- Eyes inside glasses -->
    <circle cx="40" cy="42" r="2" fill="#1a1a1a" class="mascot-pupil mascot-eye" stroke="none"/>
    <circle cx="60" cy="42" r="2" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right" stroke="none"/>
    <!-- Smile -->
    <path d="M44 54 Q50 58 56 54" fill="none" stroke-width="2.5"/>
    <!-- Laptop in front -->
    <rect x="30" y="108" width="40" height="22" rx="2" fill="#1a1a1a"/>
    <rect x="34" y="112" width="32" height="14" fill="#fcd34d"/>
  </g>
</svg>`;

// ─── Receptionist (hotel) ──────────────────────────────────────────────────
// Burgundy jacket, gold sticker halo, service bell.
const receptionist = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="72" r="48" fill="#fde68a" opacity="0.7"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Jacket (burgundy) -->
    <path d="M22 84 Q26 70 50 70 Q74 70 78 84 L80 132 L20 132 Z" fill="#7f1d1d"/>
    <!-- White shirt -->
    <path d="M44 72 L56 72 L54 100 L46 100 Z" fill="#ffffff"/>
    <!-- Gold tie -->
    <path d="M48 74 L52 74 L51 96 L49 96 Z" fill="#fcd34d"/>
    <!-- Head -->
    <circle cx="50" cy="40" r="26" fill="#fde4c8"/>
    <!-- Hair (warm brown, neat) -->
    <path d="M26 36 Q28 16 50 14 Q72 16 74 36 Q66 26 50 26 Q34 26 26 36 Z" fill="#6b4a2a"/>
    <!-- Eyes -->
    <circle cx="42" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="58" cy="42" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="43" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="59" cy="41" r="1" fill="#ffffff" stroke="none"/>
    <!-- Welcoming smile -->
    <path d="M42 52 Q50 58 58 52" fill="none" stroke-width="2.5"/>
    <!-- Cheek blush -->
    <circle cx="36" cy="50" r="3" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <circle cx="64" cy="50" r="3" fill="#f4a8a8" opacity="0.7" stroke="none"/>
    <!-- Service bell on side (gold dome) -->
    <path d="M72 116 Q80 106 88 116 L88 122 L72 122 Z" fill="#fcd34d"/>
    <circle cx="80" cy="106" r="2" fill="#fcd34d"/>
    <rect x="70" y="122" width="20" height="3" fill="#1a1a1a" stroke="none"/>
  </g>
</svg>`;

// ─── Kitten states (story mode chapters) ────────────────────────────────────

// Chapter 1 — Wet, sad, rain-soaked kitten. Blue-grey palette.
const kittenCh1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="50" fill="#cbd5e1" opacity="0.8"/>
  <!-- Raindrops -->
  <g fill="#64748b" stroke="none">
    <ellipse cx="18" cy="22" rx="2" ry="4"/>
    <ellipse cx="82" cy="18" rx="2" ry="4"/>
    <ellipse cx="14" cy="50" rx="1.6" ry="3.4"/>
    <ellipse cx="86" cy="46" rx="1.6" ry="3.4"/>
  </g>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Hunched body (wet blue-grey) -->
    <path d="M30 96 Q26 78 38 72 Q50 68 62 72 Q74 78 70 96 Q74 118 60 124 Q50 126 40 124 Q26 118 30 96 Z" fill="#94a3b8"/>
    <!-- Belly (paler) -->
    <ellipse cx="50" cy="104" rx="14" ry="14" fill="#cbd5e1"/>
    <!-- Head (big round) -->
    <circle cx="50" cy="56" r="26" fill="#94a3b8"/>
    <!-- Droopy ears (folded forward) -->
    <path d="M30 48 Q26 60 34 64 Q38 60 38 50 Z" fill="#94a3b8"/>
    <path d="M70 48 Q74 60 66 64 Q62 60 62 50 Z" fill="#94a3b8"/>
    <!-- Inner ear pink -->
    <path d="M33 52 L35 58" stroke="#f4a8a8" stroke-width="2"/>
    <path d="M67 52 L65 58" stroke="#f4a8a8" stroke-width="2"/>
    <!-- Big sad droopy eyes -->
    <ellipse cx="40" cy="58" rx="5" ry="6" fill="#ffffff"/>
    <ellipse cx="60" cy="58" rx="5" ry="6" fill="#ffffff"/>
    <circle cx="40" cy="60" r="3.5" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="60" cy="60" r="3.5" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="41" cy="58.5" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="61" cy="58.5" r="1" fill="#ffffff" stroke="none"/>
    <!-- Tear -->
    <ellipse cx="36" cy="68" rx="1.5" ry="3" fill="#3b82f6" stroke="none"/>
    <!-- Nose -->
    <path d="M48 70 L52 70 L50 73 Z" fill="#f4a8a8"/>
    <!-- Sad mouth -->
    <path d="M46 78 Q50 76 54 78" fill="none" stroke-width="2.5"/>
  </g>
</svg>`;

// Chapter 2 — Cozy, fed, content. Orange + white, bakery warm halo.
const kittenCh2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="50" fill="#fcd34d" opacity="0.75"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Fluffy round body (orange) -->
    <path d="M26 96 Q22 76 38 68 Q50 64 62 68 Q78 76 74 96 Q78 120 62 126 Q50 128 38 126 Q22 120 26 96 Z" fill="#fb923c"/>
    <!-- White belly -->
    <ellipse cx="50" cy="104" rx="16" ry="16" fill="#ffffff"/>
    <!-- Head (big round) -->
    <circle cx="50" cy="50" r="26" fill="#fb923c"/>
    <!-- Perky ears -->
    <path d="M30 36 L32 22 L42 38 Z" fill="#fb923c"/>
    <path d="M70 36 L68 22 L58 38 Z" fill="#fb923c"/>
    <!-- Inner ear pink -->
    <path d="M34 28 L36 36" stroke="#f4a8a8" stroke-width="2.5"/>
    <path d="M66 28 L64 36" stroke="#f4a8a8" stroke-width="2.5"/>
    <!-- Content half-moon happy eyes -->
    <path d="M38 52 Q42 58 46 52" fill="none" stroke-width="3" class="mascot-eye"/>
    <path d="M54 52 Q58 58 62 52" fill="none" stroke-width="3" class="mascot-eye mascot-eye-right"/>
    <!-- Cheek blush -->
    <circle cx="34" cy="60" r="4" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <circle cx="66" cy="60" r="4" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <!-- Nose -->
    <path d="M47 62 L53 62 L50 66 Z" fill="#f4a8a8"/>
    <!-- Happy smile -->
    <path d="M44 70 Q50 74 56 70" fill="none" stroke-width="2.5"/>
    <!-- Whiskers -->
    <path d="M22 64 L36 66" stroke-width="1.5"/>
    <path d="M22 70 L36 70" stroke-width="1.5"/>
    <path d="M78 64 L64 66" stroke-width="1.5"/>
    <path d="M78 70 L64 70" stroke-width="1.5"/>
    <!-- Curled-up tail -->
    <path d="M72 110 Q86 106 80 92" fill="none" stroke-width="3"/>
    <!-- Bread crumb -->
    <circle cx="38" cy="74" r="1.6" fill="#fcd34d" stroke-width="1"/>
  </g>
</svg>`;

// Chapter 3 — Curious, head tilted, tail up. Bright orange + green park halo.
const kittenCh3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="50" fill="#86efac" opacity="0.75"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (bright orange) -->
    <path d="M30 98 Q26 80 38 72 Q50 66 62 72 Q74 80 70 98 Q74 120 60 126 Q50 128 40 126 Q26 120 30 98 Z" fill="#f97316"/>
    <!-- White belly -->
    <ellipse cx="50" cy="106" rx="14" ry="14" fill="#ffffff"/>
    <!-- Head tilted -->
    <g transform="rotate(10 50 52)">
      <circle cx="50" cy="52" r="26" fill="#f97316"/>
      <!-- Pointy alert ears -->
      <path d="M30 38 L32 22 L42 40 Z" fill="#f97316"/>
      <path d="M70 38 L68 22 L58 40 Z" fill="#f97316"/>
      <path d="M34 28 L36 38" stroke="#f4a8a8" stroke-width="2.5"/>
      <path d="M66 28 L64 38" stroke="#f4a8a8" stroke-width="2.5"/>
      <!-- Big curious wide eyes -->
      <circle cx="40" cy="54" r="6" fill="#ffffff"/>
      <circle cx="60" cy="54" r="6" fill="#ffffff"/>
      <circle cx="40" cy="55" r="4" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
      <circle cx="60" cy="55" r="4" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
      <circle cx="41.5" cy="53.5" r="1.4" fill="#ffffff" stroke="none"/>
      <circle cx="61.5" cy="53.5" r="1.4" fill="#ffffff" stroke="none"/>
      <!-- Cheek blush -->
      <circle cx="32" cy="62" r="3.5" fill="#f4a8a8" opacity="0.75" stroke="none"/>
      <circle cx="68" cy="62" r="3.5" fill="#f4a8a8" opacity="0.75" stroke="none"/>
      <!-- Nose -->
      <path d="M47 64 L53 64 L50 68 Z" fill="#f4a8a8"/>
      <!-- Curious "o" mouth -->
      <circle cx="50" cy="72" r="2" fill="#1a1a1a" stroke="none"/>
    </g>
    <!-- Raised paw -->
    <ellipse cx="70" cy="100" rx="6" ry="8" fill="#f97316"/>
    <!-- Tail up -->
    <path d="M30 110 Q18 100 24 86" fill="none" stroke-width="3"/>
  </g>
</svg>`;

// Chapter 4 — Confident street-smart cat. Deep orange + tabby stripes + scar.
const kittenCh4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="50" fill="#94a3b8" opacity="0.7"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (confident orange) -->
    <path d="M30 100 Q28 80 40 72 Q50 66 60 72 Q72 80 70 100 Q74 122 60 128 Q50 130 40 128 Q26 122 30 100 Z" fill="#ea580c"/>
    <!-- White belly -->
    <ellipse cx="50" cy="108" rx="12" ry="14" fill="#ffffff"/>
    <!-- Tabby stripes on body -->
    <path d="M36 88 Q38 84 36 80" fill="none" stroke="#9a3412" stroke-width="2.5"/>
    <path d="M64 88 Q62 84 64 80" fill="none" stroke="#9a3412" stroke-width="2.5"/>
    <path d="M38 102 Q40 100 38 96" fill="none" stroke="#9a3412" stroke-width="2"/>
    <path d="M62 102 Q60 100 62 96" fill="none" stroke="#9a3412" stroke-width="2"/>
    <!-- Head -->
    <circle cx="50" cy="50" r="26" fill="#ea580c"/>
    <!-- Sharp alert pointy ears -->
    <path d="M28 36 L30 18 L42 38 Z" fill="#ea580c"/>
    <path d="M72 36 L70 18 L58 38 Z" fill="#ea580c"/>
    <path d="M33 24 L36 36" stroke="#f4a8a8" stroke-width="2.5"/>
    <path d="M67 24 L64 36" stroke="#f4a8a8" stroke-width="2.5"/>
    <!-- Forehead M (tabby) -->
    <path d="M44 36 L46 44" stroke="#9a3412" stroke-width="2"/>
    <path d="M50 34 L50 42" stroke="#9a3412" stroke-width="2"/>
    <path d="M56 36 L54 44" stroke="#9a3412" stroke-width="2"/>
    <!-- Confident narrow eyes -->
    <path d="M36 54 Q40 50 46 54 Q42 58 36 54 Z" fill="#1a1a1a" class="mascot-eye"/>
    <path d="M54 54 Q60 50 64 54 Q58 58 54 54 Z" fill="#1a1a1a" class="mascot-eye mascot-eye-right"/>
    <circle cx="41" cy="53" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="59" cy="53" r="1" fill="#ffffff" stroke="none"/>
    <!-- Scar on cheek -->
    <path d="M64 60 L70 64" stroke-width="2"/>
    <!-- Nose -->
    <path d="M47 62 L53 62 L50 66 Z" fill="#f4a8a8"/>
    <!-- Smirk -->
    <path d="M42 72 Q48 74 50 72 Q52 75 58 72" fill="none" stroke-width="2.5"/>
    <!-- Whiskers -->
    <path d="M22 66 L36 68" stroke-width="1.5"/>
    <path d="M78 66 L64 68" stroke-width="1.5"/>
    <!-- Tail held proud high -->
    <path d="M70 110 Q88 92 80 76" fill="none" stroke-width="3.5"/>
  </g>
</svg>`;

// Chapter 5 — Mature home calico. Pink home halo, content closed eyes on pillow.
const kittenCh5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="50" fill="#fbcfe8" opacity="0.8"/>
  <g stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pillow -->
    <path d="M12 118 Q30 110 50 114 Q70 110 88 118 Q88 130 70 132 Q50 134 30 132 Q12 130 12 118 Z" fill="#fde68a"/>
  </g>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Curled body (cream base) -->
    <ellipse cx="50" cy="98" rx="34" ry="20" fill="#fef3c7"/>
    <!-- Calico patches: orange -->
    <path d="M20 96 Q24 80 38 82 Q40 92 32 100 Q24 102 20 96 Z" fill="#fb923c"/>
    <!-- Calico patches: brown -->
    <path d="M68 100 Q80 96 80 108 Q72 114 64 110 Q62 104 68 100 Z" fill="#92400e"/>
    <!-- Curled tail -->
    <path d="M18 100 Q10 88 22 82 Q34 82 34 92" fill="none" stroke-width="3"/>
    <!-- Head on pillow (tilted right) -->
    <circle cx="58" cy="74" r="22" fill="#fef3c7"/>
    <!-- Calico patch on head (orange) -->
    <path d="M40 72 Q40 60 52 60 Q56 64 54 72 Q48 76 40 72 Z" fill="#fb923c"/>
    <!-- Calico patch on head (brown) -->
    <path d="M64 64 Q74 62 76 72 Q72 78 66 76 Q62 70 64 64 Z" fill="#92400e"/>
    <!-- Folded relaxed ears -->
    <path d="M44 60 Q44 50 50 52 Q54 56 52 62 Z" fill="#fb923c"/>
    <path d="M72 60 Q72 50 66 52 Q62 56 64 62 Z" fill="#92400e"/>
    <!-- Sleeping closed eyes -->
    <path d="M48 74 Q52 78 56 74" fill="none" stroke-width="2.8" class="mascot-eye"/>
    <path d="M62 74 Q66 78 70 74" fill="none" stroke-width="2.8" class="mascot-eye mascot-eye-right"/>
    <!-- Cheek blush -->
    <circle cx="46" cy="82" r="3" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <circle cx="72" cy="82" r="3" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <!-- Nose -->
    <path d="M56 84 L62 84 L59 87 Z" fill="#f4a8a8"/>
    <!-- Content smile -->
    <path d="M54 90 Q59 93 64 90" fill="none" stroke-width="2.5"/>
    <!-- Whiskers -->
    <path d="M40 82 L52 84" stroke-width="1.5"/>
    <path d="M66 86 L78 82" stroke-width="1.5"/>
  </g>
  <!-- Sleeping Zs (no stroke for crisp text) -->
  <g fill="#1a1a1a" stroke="none" font-family="system-ui, sans-serif" font-weight="700">
    <text x="80" y="56" font-size="10">z</text>
    <text x="86" y="46" font-size="14">Z</text>
  </g>
</svg>`;

// ─── Story NPCs ──────────────────────────────────────────────────────────────

// Ch1 — Grandma with umbrella. Dusty rose shawl, cream halo.
const npcGrandma = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="84" r="48" fill="#fef3c7" opacity="0.7"/>
  <g stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Umbrella (dusty rose) -->
    <path d="M14 46 Q50 14 86 46 Q70 44 50 46 Q30 44 14 46 Z" fill="#e8a3a3"/>
    <path d="M50 46 L50 16" fill="none" stroke-width="2.5"/>
    <path d="M50 46 L50 78" fill="none" stroke-width="2.5"/>
    <path d="M48 78 Q50 84 56 80" fill="none" stroke-width="2.5"/>
  </g>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body / shawl (dusty rose) -->
    <path d="M26 92 Q36 86 50 86 Q64 86 74 92 L78 132 L22 132 Z" fill="#e8a3a3"/>
    <!-- Cardigan buttons -->
    <circle cx="50" cy="102" r="1.6" fill="#1a1a1a" stroke="none"/>
    <circle cx="50" cy="114" r="1.6" fill="#1a1a1a" stroke="none"/>
    <circle cx="50" cy="126" r="1.6" fill="#1a1a1a" stroke="none"/>
    <!-- Head -->
    <circle cx="50" cy="66" r="22" fill="#fde4c8"/>
    <!-- White bun hair -->
    <path d="M30 56 Q34 46 50 46 Q66 46 70 56 Q60 52 50 54 Q40 52 30 56 Z" fill="#e2e8f0"/>
    <circle cx="50" cy="44" r="6" fill="#e2e8f0"/>
    <!-- Closed gentle eyes -->
    <path d="M40 66 Q42 70 44 66" fill="none" stroke-width="2.5" class="mascot-eye"/>
    <path d="M56 66 Q58 70 60 66" fill="none" stroke-width="2.5" class="mascot-eye mascot-eye-right"/>
    <!-- Cheek blush (strong) -->
    <circle cx="36" cy="72" r="3" fill="#f4a8a8" opacity="0.85" stroke="none"/>
    <circle cx="64" cy="72" r="3" fill="#f4a8a8" opacity="0.85" stroke="none"/>
    <!-- Gentle smile -->
    <path d="M44 78 Q50 82 56 78" fill="none" stroke-width="2.5"/>
    <!-- Cane (warm brown) -->
    <path d="M82 96 Q86 92 88 96 L88 132" fill="none" stroke-width="3" stroke="#1a1a1a"/>
  </g>
</svg>`;

// Ch2 — Baker. Tan apron + chef hat + bread loaf. Bread amber halo.
const npcBaker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="48" fill="#fcd34d" opacity="0.75"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body / shirt -->
    <path d="M22 88 Q26 76 50 76 Q74 76 78 88 L80 132 L20 132 Z" fill="#ffffff"/>
    <!-- Tan apron -->
    <path d="M32 92 L68 92 L70 132 L30 132 Z" fill="#d4a574"/>
    <!-- Apron tie -->
    <path d="M44 92 Q50 86 56 92" fill="none" stroke-width="2.5"/>
    <!-- Head -->
    <circle cx="50" cy="52" r="22" fill="#fde4c8"/>
    <!-- Chef hat (white mushroom) -->
    <ellipse cx="50" cy="28" rx="20" ry="12" fill="#ffffff"/>
    <rect x="34" y="36" width="32" height="8" fill="#ffffff"/>
    <!-- Bushy moustache (dark) -->
    <path d="M38 62 Q44 66 50 64 Q56 66 62 62 Q58 70 50 68 Q42 70 38 62 Z" fill="#1a1a1a"/>
    <!-- Crescent happy eyes -->
    <path d="M40 50 Q44 54 48 50" fill="none" stroke-width="3" class="mascot-eye"/>
    <path d="M52 50 Q56 54 60 50" fill="none" stroke-width="3" class="mascot-eye mascot-eye-right"/>
    <!-- Cheek blush -->
    <circle cx="34" cy="58" r="3" fill="#f4a8a8" opacity="0.75" stroke="none"/>
    <circle cx="66" cy="58" r="3" fill="#f4a8a8" opacity="0.75" stroke="none"/>
    <!-- Bread loaf in hands (golden amber) -->
    <ellipse cx="50" cy="108" rx="16" ry="8" fill="#fcd34d"/>
    <path d="M42 106 L46 110" fill="none" stroke-width="2"/>
    <path d="M50 106 L54 110" fill="none" stroke-width="2"/>
    <path d="M58 106 L62 110" fill="none" stroke-width="2"/>
  </g>
</svg>`;

// Ch3 — Mei-mei (~7yo girl). Pink dress + ponytail. Light pink halo.
const npcMeimei = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="48" fill="#fbcfe8" opacity="0.85"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pink dress -->
    <path d="M28 88 Q36 82 50 82 Q64 82 72 88 L80 132 L20 132 Z" fill="#ec4899"/>
    <!-- Dress collar -->
    <path d="M42 86 Q50 92 58 86" fill="none" stroke-width="2.5"/>
    <!-- Head -->
    <circle cx="50" cy="54" r="22" fill="#fde4c8"/>
    <!-- Hair front bangs (dark brown) -->
    <path d="M30 52 Q34 36 50 36 Q66 36 70 52 Q60 46 50 48 Q40 46 30 52 Z" fill="#3d2817"/>
    <!-- Side ponytail -->
    <path d="M68 54 Q84 56 86 70 Q82 74 76 70 Q70 64 68 58 Z" fill="#3d2817"/>
    <!-- Ponytail tie (yellow) -->
    <circle cx="74" cy="58" r="3" fill="#fcd34d"/>
    <!-- Big shy round eyes -->
    <circle cx="42" cy="54" r="4.5" fill="#ffffff"/>
    <circle cx="58" cy="54" r="4.5" fill="#ffffff"/>
    <circle cx="42" cy="55" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="58" cy="55" r="3" fill="#1a1a1a" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="43" cy="54" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="59" cy="54" r="1" fill="#ffffff" stroke="none"/>
    <!-- Strong cheek blush (shy kid) -->
    <circle cx="36" cy="64" r="3.5" fill="#f4a8a8" opacity="0.9" stroke="none"/>
    <circle cx="64" cy="64" r="3.5" fill="#f4a8a8" opacity="0.9" stroke="none"/>
    <!-- Small shy smile -->
    <path d="M46 70 Q50 72 54 70" fill="none" stroke-width="2.5"/>
    <!-- Treat bag in hands (cream + amber accent) -->
    <rect x="38" y="100" width="24" height="20" rx="2" fill="#fef3c7"/>
    <circle cx="44" cy="110" r="1.5" fill="#fb923c" stroke="none"/>
    <circle cx="50" cy="113" r="1.5" fill="#fb923c" stroke="none"/>
    <circle cx="56" cy="110" r="1.5" fill="#fb923c" stroke="none"/>
  </g>
</svg>`;

// Ch4 — Brutus (one-eyed scruffy stray dog). Brown body + tan belly. Forest green halo.
const npcBrutus = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="50" fill="#4ade80" opacity="0.65"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (brown) -->
    <path d="M22 96 Q18 78 36 70 Q50 66 64 70 Q82 78 78 96 Q82 122 64 128 Q50 130 36 128 Q18 122 22 96 Z" fill="#92400e"/>
    <!-- Tan belly -->
    <ellipse cx="50" cy="106" rx="16" ry="16" fill="#d4a574"/>
    <!-- Head -->
    <circle cx="50" cy="52" r="26" fill="#92400e"/>
    <!-- Floppy droopy ears -->
    <path d="M24 50 Q14 76 30 80 Q34 70 32 54 Z" fill="#6b4a2a"/>
    <path d="M76 50 Q86 76 70 80 Q66 70 68 54 Z" fill="#6b4a2a"/>
    <!-- Snout (tan) -->
    <ellipse cx="50" cy="64" rx="14" ry="12" fill="#d4a574"/>
    <!-- Nose (big black) -->
    <ellipse cx="50" cy="60" rx="4" ry="3" fill="#1a1a1a"/>
    <!-- Mouth -->
    <path d="M44 70 Q50 74 56 70" fill="none" stroke-width="2.5"/>
    <path d="M50 70 L50 74" fill="none" stroke-width="2"/>
    <!-- Good eye -->
    <circle cx="40" cy="48" r="4" fill="#ffffff"/>
    <circle cx="40" cy="49" r="2.5" fill="#1a1a1a" class="mascot-pupil mascot-eye"/>
    <circle cx="41" cy="48" r="0.8" fill="#ffffff" stroke="none"/>
    <!-- Scarred eye X -->
    <path d="M56 44 L64 52" stroke-width="3"/>
    <path d="M64 44 L56 52" stroke-width="3"/>
    <!-- Scar on cheek -->
    <path d="M40 32 L46 38" stroke-width="2"/>
    <!-- Scruffy fur tufts -->
    <path d="M28 86 L24 92 L30 92 Z" fill="#6b4a2a"/>
    <path d="M72 86 L76 92 L70 92 Z" fill="#6b4a2a"/>
    <!-- Tail low alert -->
    <path d="M74 110 Q88 106 86 92" fill="none" stroke-width="3"/>
  </g>
</svg>`;

// Ch5 — Family trio (mei-mei + parents). Cream halo, warm orange unity.
const npcFamily = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <circle cx="50" cy="80" r="50" fill="#fed7aa" opacity="0.7"/>
  <g class="mascot-body" stroke="#1a1a1a" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
    <!-- Dad (left) head -->
    <circle cx="22" cy="64" r="14" fill="#fde4c8"/>
    <!-- Dad hair -->
    <path d="M10 60 Q12 50 22 50 Q32 50 34 60 Q30 56 22 56 Q14 56 10 60 Z" fill="#1a1a1a"/>
    <!-- Dad body (orange shirt) -->
    <path d="M8 84 Q12 78 22 78 Q32 78 36 84 L36 130 L8 130 Z" fill="#fb923c"/>
    <!-- Dad face -->
    <circle cx="18" cy="64" r="1.5" fill="#1a1a1a" class="mascot-eye" stroke="none"/>
    <circle cx="26" cy="64" r="1.5" fill="#1a1a1a" class="mascot-eye mascot-eye-right" stroke="none"/>
    <path d="M18 70 Q22 72 26 70" fill="none" stroke-width="2"/>
    <circle cx="14" cy="68" r="2" fill="#f4a8a8" opacity="0.75" stroke="none"/>
    <circle cx="30" cy="68" r="2" fill="#f4a8a8" opacity="0.75" stroke="none"/>

    <!-- Mom (right) head -->
    <circle cx="78" cy="64" r="14" fill="#fde4c8"/>
    <!-- Mom hair (brown, shoulder-length) -->
    <path d="M64 60 Q66 48 78 48 Q90 50 90 62 Q88 70 84 74 Q82 68 78 68 Q74 68 72 74 Q66 70 64 60 Z" fill="#6b4a2a"/>
    <!-- Mom body (pink blouse) -->
    <path d="M64 84 Q68 78 78 78 Q88 78 92 84 L92 130 L64 130 Z" fill="#ec4899"/>
    <!-- Mom face -->
    <path d="M72 64 Q74 66 76 64" fill="none" stroke-width="2.2" class="mascot-eye"/>
    <path d="M80 64 Q82 66 84 64" fill="none" stroke-width="2.2" class="mascot-eye mascot-eye-right"/>
    <path d="M74 70 Q78 72 82 70" fill="none" stroke-width="2"/>
    <circle cx="70" cy="68" r="2" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <circle cx="86" cy="68" r="2" fill="#f4a8a8" opacity="0.8" stroke="none"/>

    <!-- Mei-mei (center, smaller) -->
    <circle cx="50" cy="80" r="11" fill="#fde4c8"/>
    <!-- Mei-mei hair -->
    <path d="M40 78 Q42 70 50 70 Q58 70 60 78 Q54 74 50 76 Q46 74 40 78 Z" fill="#3d2817"/>
    <!-- Mei-mei ponytail -->
    <circle cx="60" cy="78" r="3" fill="#3d2817"/>
    <!-- Mei-mei dress (pink, matches mom) -->
    <path d="M40 98 Q46 94 50 94 Q54 94 60 98 L60 130 L40 130 Z" fill="#ec4899"/>
    <!-- Mei-mei face -->
    <circle cx="46" cy="80" r="1.2" fill="#1a1a1a" class="mascot-eye" stroke="none"/>
    <circle cx="54" cy="80" r="1.2" fill="#1a1a1a" class="mascot-eye mascot-eye-right" stroke="none"/>
    <path d="M46 84 Q50 86 54 84" fill="none" stroke-width="1.8"/>
    <circle cx="43" cy="83" r="1.5" fill="#f4a8a8" opacity="0.8" stroke="none"/>
    <circle cx="57" cy="83" r="1.5" fill="#f4a8a8" opacity="0.8" stroke="none"/>

    <!-- Heart above them (pink, signature unity) -->
    <path d="M50 44 Q46 38 42 42 Q38 46 42 50 Q46 54 50 58 Q54 54 58 50 Q62 46 58 42 Q54 38 50 44 Z" fill="#ec4899"/>
  </g>
</svg>`;

export const MASCOTS: Record<string, MascotDef> = {
  owl: { id: 'owl', svg: owl },
  waiter: { id: 'waiter', svg: waiter },
  flightAttendant: { id: 'flightAttendant', svg: flightAttendant },
  doctor: { id: 'doctor', svg: doctor },
  coworker: { id: 'coworker', svg: coworker },
  receptionist: { id: 'receptionist', svg: receptionist },
  // story mode — kitten states
  kittenCh1: { id: 'kittenCh1', svg: kittenCh1 },
  kittenCh2: { id: 'kittenCh2', svg: kittenCh2 },
  kittenCh3: { id: 'kittenCh3', svg: kittenCh3 },
  kittenCh4: { id: 'kittenCh4', svg: kittenCh4 },
  kittenCh5: { id: 'kittenCh5', svg: kittenCh5 },
  // story mode — NPCs
  npcGrandma: { id: 'npcGrandma', svg: npcGrandma },
  npcBaker: { id: 'npcBaker', svg: npcBaker },
  npcMeimei: { id: 'npcMeimei', svg: npcMeimei },
  npcBrutus: { id: 'npcBrutus', svg: npcBrutus },
  npcFamily: { id: 'npcFamily', svg: npcFamily },
};

export function getMascotSvg(id: string): string {
  return (MASCOTS[id] ?? MASCOTS.owl).svg;
}
