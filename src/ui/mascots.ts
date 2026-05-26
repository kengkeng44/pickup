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

// ─── Owl (default / free practice) ─────────────────────────────────────────
// v0.9 redesign — 林明子 (Akiko Hayashi) hand-drawn warm style.
// Pencil-sketch feel via irregular paths + round caps; soft amber/cream
// palette (no Duolingo green); subtle pencil shading lines; slight rotation
// breaks symmetry so it reads "drawn not generated".
const owl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <!-- Pencil-grain noise for soft texture on body fills -->
    <filter id="owl-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.12 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <!-- Soft ground shadow (slightly uneven, warm umber) -->
  <path d="M24 128 Q38 124 50 127 Q64 130 76 127 Q72 132 50 132 Q28 132 24 128 Z"
        fill="#8b6f4a" opacity="0.18"/>
  <g class="mascot-body" transform="rotate(-1.5 50 80)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Tufts (ear feathers — wobbly, asymmetric) -->
    <path d="M24 52 Q27 38 35 46 Q33 52 28 56 Q25 55 24 52 Z" fill="#c9a368"/>
    <path d="M77 51 Q73 36 65 45 Q68 51 73 56 Q76 54 77 51 Z" fill="#c9a368"/>
    <!-- Body (irregular teardrop, soft amber-brown) -->
    <path d="M50 39 C31 40 21 57 21 80 C20 104 33 122 50 122 C68 123 80 105 80 80 C80 57 69 39 50 39 Z"
          fill="#d9b483" filter="url(#owl-paper)"/>
    <!-- Belly (cream, hand-drawn oval, slightly off-center) -->
    <path d="M50 70 C36 71 32 84 33 96 C34 110 42 117 51 117 C61 117 68 109 68 96 C68 83 63 70 50 70 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="1"/>
    <!-- Pencil shading on body sides (thin parallel strokes) -->
    <path d="M26 76 Q24 84 26 92" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M28 72 Q26 82 28 94" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.4"/>
    <path d="M74 76 Q76 84 74 92" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M72 72 Q74 82 72 94" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.4"/>
    <!-- Wings (irregular leaf shapes, warm brown) -->
    <path d="M23 76 Q14 82 19 102 Q26 106 31 96 Q28 86 23 76 Z" fill="#a07d52"/>
    <path d="M77 75 Q86 81 81 102 Q74 107 69 96 Q72 85 77 75 Z" fill="#a07d52"/>
    <!-- Wing feather lines -->
    <path d="M22 84 Q20 92 24 100" fill="none" stroke="#6b4a2a" stroke-width="0.7" opacity="0.6"/>
    <path d="M78 84 Q80 92 76 100" fill="none" stroke="#6b4a2a" stroke-width="0.7" opacity="0.6"/>
    <!-- Eye whites (hand-drawn cream, slightly uneven sizes) -->
    <path d="M39 68 Q32 67 30 73 Q31 80 39 81 Q47 80 48 73 Q47 67 39 68 Z"
          fill="#fef8ed" stroke="#6b4a2a" stroke-width="1.2"/>
    <path d="M61 68 Q54 67 53 73 Q54 80 61 81 Q69 80 70 73 Q68 67 61 68 Z"
          fill="#fef8ed" stroke="#6b4a2a" stroke-width="1.2"/>
    <!-- Pupils (warm dark brown, not black) -->
    <ellipse cx="40" cy="73" rx="3.2" ry="3.6" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <ellipse cx="60" cy="73" rx="3.2" ry="3.6" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <!-- Tiny eye glints (cream not pure white) -->
    <circle cx="41" cy="71.5" r="0.9" fill="#fef8ed"/>
    <circle cx="61" cy="71.5" r="0.9" fill="#fef8ed"/>
    <!-- Beak (amber, slightly curved triangle — hand drawn) -->
    <path d="M50 82 Q46 86 47 89 Q50 90 53 89 Q54 86 50 82 Z"
          fill="#e7a44a" stroke="#a06b1a" stroke-width="1"/>
    <!-- Dusty rose cheek blush (林明子 signature) -->
    <ellipse cx="34" cy="82" rx="3.5" ry="2.2" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="66" cy="82" rx="3.5" ry="2.2" fill="#d99a8a" opacity="0.55"/>
    <!-- Feet (warm amber, slightly uneven) -->
    <path d="M40 121 Q37 123 38 125 Q42 126 45 124 Q44 121 40 121 Z" fill="#c9893a"/>
    <path d="M60 121 Q57 121 56 124 Q59 126 63 125 Q64 123 60 121 Z" fill="#c9893a"/>
  </g>
</svg>`;

// ─── Waiter (restaurant) ───────────────────────────────────────────────────
// v0.9 redesign — 林明子 warm hand-drawn style. Amber apron-vest,
// cream shirt, brass tray. Cheek blush, paper-grain body fill.
const waiter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="waiter-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 128 Q36 124 50 127 Q64 130 78 127 Q72 132 50 132 Q28 132 22 128 Z"
        fill="#8b6f4a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.2 50 80)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Vest / body (irregular trapezoid, warm umber) -->
    <path d="M23 72 Q35 66 50 65 Q66 66 77 72 Q81 92 80 110 Q81 124 78 130 L22 130 Q19 124 20 110 Q19 92 23 72 Z"
          fill="#a07d52" filter="url(#waiter-paper)"/>
    <!-- Apron front (cream, hand-drawn, off-center) -->
    <path d="M34 80 Q50 76 67 80 Q68 100 67 116 Q68 126 66 130 L34 130 Q32 126 33 116 Q32 100 34 80 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="1"/>
    <!-- Apron strap around neck -->
    <path d="M40 80 Q50 72 60 80" fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <!-- Pencil shading on vest sides -->
    <path d="M25 86 Q23 100 26 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M75 86 Q77 100 74 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Bow tie (dusty rose, irregular) -->
    <path d="M44 70 Q40 74 42 78 Q47 76 50 74 Q53 76 58 78 Q60 74 56 70 Q53 73 50 73 Q47 73 44 70 Z"
          fill="#d99a8a" stroke="#a06b1a" stroke-width="1"/>
    <circle cx="50" cy="74" r="1.2" fill="#a06b1a"/>
    <!-- Head (warm cream, irregular oval) -->
    <path d="M50 14 C36 14 28 26 28 38 C28 52 38 62 50 62 C62 62 72 52 72 38 C72 26 64 14 50 14 Z"
          fill="#f6d8b8" filter="url(#waiter-paper)"/>
    <!-- Hair (warm umber swoop, wobbly) -->
    <path d="M30 30 Q38 14 50 14 Q64 14 70 30 Q66 22 50 22 Q34 24 30 30 Z"
          fill="#6b4a2a" stroke="#3d2817" stroke-width="1"/>
    <!-- Eyes (warm dark brown, not black) -->
    <ellipse cx="42" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <ellipse cx="58" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="42.6" cy="39" r="0.7" fill="#fef8ed"/>
    <circle cx="58.6" cy="39" r="0.7" fill="#fef8ed"/>
    <!-- Smile (warm umber) -->
    <path d="M44 50 Q50 54 56 50" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Dusty rose cheek blush -->
    <ellipse cx="36" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="64" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <!-- Tray (brass amber, hand-drawn ellipse) -->
    <path d="M74 86 Q86 84 96 88 Q86 92 74 90 Q70 88 74 86 Z" fill="#e7a44a" stroke="#a06b1a" stroke-width="1"/>
    <!-- Cup on tray (cream) -->
    <path d="M83 80 Q88 79 90 82 Q88 86 83 86 Q81 83 83 80 Z" fill="#f4e1c0" stroke="#a07d52" stroke-width="0.9"/>
    <!-- Steam wisp -->
    <path d="M86 76 Q88 73 86 70" fill="none" stroke="#a07d52" stroke-width="0.7" opacity="0.6"/>
  </g>
</svg>`;

// ─── Flight Attendant (airport) ────────────────────────────────────────────
// v0.9 redesign — warm umber uniform (no navy), cream lapel, dusty-rose scarf,
// amber wings pin. Hand-drawn paths, paper texture, cheek blush.
const flightAttendant = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="flight-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 128 Q36 124 50 127 Q64 130 78 127 Q72 132 50 132 Q28 132 22 128 Z"
        fill="#8b6f4a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.5 50 80)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Uniform body (warm umber, irregular) -->
    <path d="M22 72 Q35 66 50 65 Q66 66 78 72 Q83 92 82 110 Q83 124 80 130 L20 130 Q17 124 18 110 Q17 92 22 72 Z"
          fill="#8b6f4a" filter="url(#flight-paper)"/>
    <!-- Lapel V (cream, hand-drawn) -->
    <path d="M42 72 Q50 88 58 72 Q56 88 50 92 Q44 88 42 72 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="0.9"/>
    <!-- Scarf (dusty rose, knotted, irregular) -->
    <path d="M38 70 Q44 74 50 76 Q56 74 62 70 Q63 76 60 80 Q50 82 40 80 Q37 76 38 70 Z"
          fill="#d99a8a" stroke="#a06b1a" stroke-width="0.9"/>
    <!-- Pencil shading on uniform -->
    <path d="M25 86 Q23 100 26 116" fill="none" stroke="#5a4028" stroke-width="0.6" opacity="0.5"/>
    <path d="M75 86 Q77 100 74 116" fill="none" stroke="#5a4028" stroke-width="0.6" opacity="0.5"/>
    <!-- Head (warm cream, irregular oval) -->
    <path d="M50 14 C36 14 28 26 28 38 C28 52 38 62 50 62 C62 62 72 52 72 38 C72 26 64 14 50 14 Z"
          fill="#f6d8b8" filter="url(#flight-paper)"/>
    <!-- Hair (warm dark umber bun) -->
    <path d="M28 30 Q34 16 50 14 Q66 14 72 30 Q70 22 50 22 Q32 22 28 30 Z" fill="#6b4a2a"/>
    <path d="M68 18 Q76 18 76 24 Q74 28 68 26 Q66 22 68 18 Z" fill="#6b4a2a" stroke="#3d2817" stroke-width="1"/>
    <!-- Hat (amber pillbox, slightly tilted) -->
    <path d="M34 22 Q50 18 66 22 Q66 28 50 28 Q34 28 34 22 Z"
          fill="#e7a44a" stroke="#a06b1a" stroke-width="1"/>
    <!-- Wings pin (amber, hand-drawn) -->
    <path d="M40 88 Q50 90 60 88 L50 94 Z" fill="#e7a44a" stroke="#a06b1a" stroke-width="0.8"/>
    <circle cx="50" cy="90" r="1" fill="#fef8ed"/>
    <!-- Eyes -->
    <ellipse cx="42" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <ellipse cx="58" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="42.6" cy="39" r="0.7" fill="#fef8ed"/>
    <circle cx="58.6" cy="39" r="0.7" fill="#fef8ed"/>
    <!-- Smile -->
    <path d="M44 50 Q50 54 56 50" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Dusty rose cheek blush -->
    <ellipse cx="36" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="64" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
  </g>
</svg>`;

// ─── Doctor (hospital) ─────────────────────────────────────────────────────
// v0.9 redesign — cream coat (not stark white), warm umber stethoscope,
// dusty-rose inner shirt. Hand-drawn paths, paper grain.
const doctor = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="doctor-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 128 Q36 124 50 127 Q64 130 78 127 Q72 132 50 132 Q28 132 22 128 Z"
        fill="#8b6f4a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.3 50 80)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Coat (cream, not pure white) -->
    <path d="M22 72 Q35 66 50 65 Q66 66 78 72 Q83 92 82 110 Q83 124 80 130 L20 130 Q17 124 18 110 Q17 92 22 72 Z"
          fill="#f4e1c0" filter="url(#doctor-paper)"/>
    <!-- Coat collar V (warmer cream) -->
    <path d="M44 72 Q50 92 56 72 Q54 88 50 96 Q46 88 44 72 Z"
          fill="#e8d4ad" stroke="#a07d52" stroke-width="0.9"/>
    <!-- Inner shirt (dusty rose accent) -->
    <path d="M46 76 Q50 78 54 76 Q53 86 50 90 Q47 86 46 76 Z" fill="#d99a8a"/>
    <!-- Pencil shading on coat -->
    <path d="M25 86 Q23 100 26 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M75 86 Q77 100 74 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Pocket (hand-drawn rectangle) -->
    <path d="M60 100 L72 100 L72 114 L60 114 Z" fill="none" stroke="#a07d52" stroke-width="0.8"/>
    <path d="M62 104 L70 104" stroke="#a07d52" stroke-width="0.5" opacity="0.6"/>
    <!-- Stethoscope (warm umber, draped) -->
    <path d="M40 80 Q35 96 41 110 Q47 117 54 112" fill="none" stroke="#6b4a2a" stroke-width="1.6"/>
    <path d="M40 80 Q42 76 44 76" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Stethoscope chest piece (amber disc) -->
    <path d="M54 108 Q60 108 60 113 Q58 117 53 116 Q51 112 54 108 Z"
          fill="#e7a44a" stroke="#a06b1a" stroke-width="1"/>
    <circle cx="56.5" cy="112" r="1.5" fill="#a06b1a"/>
    <!-- Head -->
    <path d="M50 14 C36 14 28 26 28 38 C28 52 38 62 50 62 C62 62 72 52 72 38 C72 26 64 14 50 14 Z"
          fill="#f6d8b8" filter="url(#doctor-paper)"/>
    <!-- Hair (warm dark umber) -->
    <path d="M28 30 Q40 16 50 14 Q60 14 72 30 Q66 22 50 22 Q34 22 28 30 Z" fill="#3d2817"/>
    <!-- Eyes -->
    <ellipse cx="42" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <ellipse cx="58" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="42.6" cy="39" r="0.7" fill="#fef8ed"/>
    <circle cx="58.6" cy="39" r="0.7" fill="#fef8ed"/>
    <!-- Gentle smile -->
    <path d="M44 50 Q50 54 56 50" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Cheek blush -->
    <ellipse cx="36" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="64" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
  </g>
</svg>`;

// ─── Coworker (office) ─────────────────────────────────────────────────────
// v0.9 redesign — warm amber-brown shirt (no indigo), umber glasses,
// cream laptop. Hand-drawn paths, paper grain, cheek blush.
const coworker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="coworker-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="13"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 128 Q36 124 50 127 Q64 130 78 127 Q72 132 50 132 Q28 132 22 128 Z"
        fill="#8b6f4a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.4 50 80)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Shirt (warm amber-brown, hand-drawn) -->
    <path d="M22 72 Q35 66 50 65 Q66 66 78 72 Q83 92 82 110 Q83 124 80 130 L20 130 Q17 124 18 110 Q17 92 22 72 Z"
          fill="#d9b483" filter="url(#coworker-paper)"/>
    <!-- T-shirt collar -->
    <path d="M42 70 Q50 78 58 70" fill="none" stroke="#6b4a2a" stroke-width="1"/>
    <!-- Pencil shading -->
    <path d="M25 86 Q23 100 26 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M75 86 Q77 100 74 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 14 C36 14 28 26 28 38 C28 52 38 62 50 62 C62 62 72 52 72 38 C72 26 64 14 50 14 Z"
          fill="#f6d8b8" filter="url(#coworker-paper)"/>
    <!-- Hair (warm umber, side-parted) -->
    <path d="M28 30 Q40 16 56 18 Q70 22 72 30 Q66 22 50 22 Q36 26 28 30 Z" fill="#6b4a2a"/>
    <!-- Glasses (warm umber frames, hand-drawn) -->
    <path d="M36 40 Q36 36 40 36 Q44 36 44 40 Q44 44 40 44 Q36 44 36 40 Z"
          fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <path d="M56 40 Q56 36 60 36 Q64 36 64 40 Q64 44 60 44 Q56 44 56 40 Z"
          fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <path d="M44 40 Q50 39 56 40" fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <!-- Eyes behind glasses -->
    <circle cx="40" cy="40" r="1.4" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <circle cx="60" cy="40" r="1.4" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <!-- Smile -->
    <path d="M44 50 Q50 54 56 50" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Cheek blush -->
    <ellipse cx="36" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="64" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <!-- Laptop in front (cream + amber, hand-drawn) -->
    <path d="M30 106 Q50 104 70 106 Q72 116 70 124 Q70 128 68 128 L32 128 Q30 128 30 124 Q28 116 30 106 Z"
          fill="#e8d4ad" stroke="#a07d52" stroke-width="1"/>
    <!-- Screen (warm dark) -->
    <path d="M34 110 Q50 109 66 110 Q67 117 66 124 L34 124 Q33 117 34 110 Z"
          fill="#3d2817"/>
    <!-- Tiny amber accent (icon glow on screen) -->
    <circle cx="50" cy="117" r="2" fill="#e7a44a" opacity="0.75"/>
  </g>
</svg>`;

// ─── Receptionist (hotel) ──────────────────────────────────────────────────
// v0.9 redesign — brand amber vest, cream shirt, dusty-rose tie,
// amber service bell. Hand-drawn, paper grain, cheek blush.
const receptionist = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="recep-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="17"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 128 Q36 124 50 127 Q64 130 78 127 Q72 132 50 132 Q28 132 22 128 Z"
        fill="#8b6f4a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.2 50 80)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Vest (brand amber, hand-drawn) -->
    <path d="M22 72 Q35 66 50 65 Q66 66 78 72 Q83 92 82 110 Q83 124 80 130 L20 130 Q17 124 18 110 Q17 92 22 72 Z"
          fill="#e7a44a" filter="url(#recep-paper)"/>
    <!-- Shirt under vest (cream, hand-drawn) -->
    <path d="M42 72 Q50 70 58 72 Q57 100 56 130 L44 130 Q43 100 42 72 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="0.9"/>
    <!-- Lapels (darker umber accent) -->
    <path d="M42 72 L23 72 Q24 80 26 90 Q34 80 42 76 Z" fill="#a07d52"/>
    <path d="M58 72 L77 72 Q76 80 74 90 Q66 80 58 76 Z" fill="#a07d52"/>
    <!-- Tie (dusty rose, hand-drawn) -->
    <path d="M48 72 Q50 71 52 72 L53 96 Q51 108 50 108 Q49 108 47 96 Z"
          fill="#d99a8a" stroke="#a06b1a" stroke-width="0.7"/>
    <!-- Pencil shading on vest -->
    <path d="M25 86 Q23 100 26 116" fill="none" stroke="#a06b1a" stroke-width="0.6" opacity="0.5"/>
    <path d="M75 86 Q77 100 74 116" fill="none" stroke="#a06b1a" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 14 C36 14 28 26 28 38 C28 52 38 62 50 62 C62 62 72 52 72 38 C72 26 64 14 50 14 Z"
          fill="#f6d8b8" filter="url(#recep-paper)"/>
    <!-- Hair (warm umber, neat) -->
    <path d="M28 30 Q40 16 50 14 Q60 14 72 30 Q60 22 50 22 Q40 22 28 30 Z" fill="#6b4a2a"/>
    <!-- Eyes -->
    <ellipse cx="42" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <ellipse cx="58" cy="40" rx="2.2" ry="2.6" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="42.6" cy="39" r="0.7" fill="#fef8ed"/>
    <circle cx="58.6" cy="39" r="0.7" fill="#fef8ed"/>
    <!-- Welcoming smile -->
    <path d="M44 50 Q50 54 56 50" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Cheek blush -->
    <ellipse cx="36" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="64" cy="48" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <!-- Service bell (amber dome, hand-drawn) -->
    <path d="M78 120 Q86 114 94 120 Q94 124 86 124 Q78 124 78 120 Z"
          fill="#e7a44a" stroke="#a06b1a" stroke-width="1"/>
    <path d="M86 114 Q86 109 86 108" fill="none" stroke="#a06b1a" stroke-width="0.9"/>
    <circle cx="86" cy="108" r="1.6" fill="#e7a44a" stroke="#a06b1a" stroke-width="0.8"/>
    <!-- Bell base -->
    <path d="M78 124 L94 124 L94 127 L78 127 Z" fill="#a06b1a"/>
  </g>
</svg>`;

// ─── Kitten states (v0.8 story mode) ────────────────────────────────────────
//
// Warm Ghibli-esque hand-drawn feel: soft cream + earth tones, slightly
// wobbly stroke widths, no harsh outlines. Each state captures the
// emotional arc of one chapter.

// Chapter 1 — 濕毛淒冷: wet matted fur, droopy ears, big sad eyes, raindrops.
// v0.9 — 林明子 warm palette: damp amber-brown over wet umber, no gray.
const kittenCh1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="kit1-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="21"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.12 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <!-- Raindrops (muted blue-gray, less saturated) -->
  <g opacity="0.45">
    <path d="M14 24 q-1 4 0 6 q2 2 3 0 q1 -2 0 -6 z" fill="#8b9aa8"/>
    <path d="M82 18 q-1 4 0 6 q2 2 3 0 q1 -2 0 -6 z" fill="#8b9aa8"/>
    <path d="M22 48 q-1 3 0 5 q2 2 3 0 q1 -2 0 -5 z" fill="#8b9aa8"/>
    <path d="M78 54 q-1 3 0 5 q2 2 3 0 q1 -2 0 -5 z" fill="#8b9aa8"/>
  </g>
  <!-- Damp ground shadow (warm umber, uneven) -->
  <path d="M22 130 Q36 126 50 129 Q64 132 78 129 Q72 134 50 134 Q28 134 22 130 Z"
        fill="#6b4a2a" opacity="0.22"/>
  <g class="mascot-body" transform="rotate(-1.5 50 90)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body: hunched, damp amber-brown -->
    <path d="M30 96 Q26 78 36 70 Q50 64 64 70 Q74 78 70 96 Q72 116 64 124 Q50 128 36 124 Q28 116 30 96 Z"
          fill="#c9a368" filter="url(#kit1-paper)"/>
    <!-- Wet fur darker patches (warm umber) -->
    <path d="M38 88 Q44 84 50 88 Q56 84 62 88 Q60 96 50 96 Q40 96 38 88 Z" fill="#8b6f4a" opacity="0.55"/>
    <!-- Pencil shading -->
    <path d="M28 88 Q26 100 30 112" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M72 88 Q74 100 70 112" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 38 C36 38 28 48 28 58 C28 70 38 78 50 78 C62 78 72 70 72 58 C72 48 64 38 50 38 Z"
          fill="#d9b483" filter="url(#kit1-paper)"/>
    <!-- Droopy ears (folded forward, sad) -->
    <path d="M32 50 Q26 56 32 64 Q36 60 38 54 Z" fill="#c9a368"/>
    <path d="M68 50 Q74 56 68 64 Q64 60 62 54 Z" fill="#c9a368"/>
    <!-- Inner ear (dusty rose) -->
    <path d="M33 54 Q31 58 34 62" fill="none" stroke="#d99a8a" stroke-width="1.4"/>
    <path d="M67 54 Q69 58 66 62" fill="none" stroke="#d99a8a" stroke-width="1.4"/>
    <!-- Wet fur tufts on head -->
    <path d="M42 44 q2 4 0 6" stroke="#6b4a2a" stroke-width="1.2" fill="none"/>
    <path d="M58 44 q-2 4 0 6" stroke="#6b4a2a" stroke-width="1.2" fill="none"/>
    <!-- Big sad eyes (cream not white) -->
    <path d="M42 55 Q36 56 36 61 Q38 66 42 66 Q47 66 47 61 Q47 56 42 55 Z"
          fill="#fef8ed" stroke="#6b4a2a" stroke-width="1.1"/>
    <path d="M58 55 Q53 56 53 61 Q53 66 58 66 Q63 66 64 61 Q64 56 58 55 Z"
          fill="#fef8ed" stroke="#6b4a2a" stroke-width="1.1"/>
    <ellipse cx="42" cy="62" rx="3" ry="3.5" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <ellipse cx="58" cy="62" rx="3" ry="3.5" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="43" cy="60.5" r="0.8" fill="#fef8ed"/>
    <circle cx="59" cy="60.5" r="0.8" fill="#fef8ed"/>
    <!-- Tear -->
    <path d="M40 67 q-1 3 0 4 q1 1 2 0 q1 -1 0 -4 z" fill="#8b9aa8" opacity="0.8"/>
    <!-- Nose + downturned mouth -->
    <path d="M48 68 Q50 70 52 68 Q51 70 50 71 Q49 70 48 68 Z" fill="#d99a8a" stroke="#a06b1a" stroke-width="0.8"/>
    <path d="M46 74 Q50 72 54 74" fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <!-- Tail tucked under -->
    <path d="M36 118 Q24 122 28 110" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Dusty rose cheek blush (faint — too cold to flush much) -->
    <ellipse cx="34" cy="68" rx="2.5" ry="1.6" fill="#d99a8a" opacity="0.4"/>
    <ellipse cx="66" cy="68" rx="2.5" ry="1.6" fill="#d99a8a" opacity="0.4"/>
  </g>
</svg>`;

// Chapter 2 — 圓滾溫飽: fluffy, rounder, contented.
// v0.9 — amber-brown body, cream belly, dusty-rose ears + blush, paper grain.
const kittenCh2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="kit2-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="23"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 130 Q36 126 50 129 Q64 132 78 129 Q72 134 50 134 Q28 134 22 130 Z"
        fill="#6b4a2a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.2 50 90)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Fluffier rounder body, warm amber -->
    <path d="M28 96 Q24 76 38 68 Q50 62 62 68 Q76 76 72 96 Q76 118 64 126 Q50 130 36 126 Q24 118 28 96 Z"
          fill="#d9b483" filter="url(#kit2-paper)"/>
    <!-- Belly (cream, off-center) -->
    <path d="M50 80 Q38 82 36 96 Q38 114 50 118 Q62 114 64 96 Q62 82 50 80 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="0.9"/>
    <!-- Pencil shading on sides -->
    <path d="M28 90 Q26 102 30 114" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M72 90 Q74 102 70 114" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 32 C34 32 26 42 26 56 C26 70 36 78 50 78 C64 78 74 70 74 56 C74 42 66 32 50 32 Z"
          fill="#d9b483" filter="url(#kit2-paper)"/>
    <!-- Ears upright (perked up) -->
    <path d="M30 44 Q32 26 36 28 Q42 36 44 42 Q38 44 30 44 Z" fill="#c9a368"/>
    <path d="M70 44 Q68 26 64 28 Q58 36 56 42 Q62 44 70 44 Z" fill="#c9a368"/>
    <!-- Inner ear dusty rose -->
    <path d="M35 32 L37 40" stroke="#d99a8a" stroke-width="2"/>
    <path d="M65 32 L63 40" stroke="#d99a8a" stroke-width="2"/>
    <!-- Content half-moon eyes -->
    <path d="M38 58 Q42 62 46 58" fill="none" stroke="#3d2817" stroke-width="1.8" class="mascot-eye"/>
    <path d="M54 58 Q58 62 62 58" fill="none" stroke="#3d2817" stroke-width="1.8" class="mascot-eye mascot-eye-right"/>
    <!-- Dusty rose cheek blush -->
    <ellipse cx="34" cy="64" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="66" cy="64" rx="3" ry="2" fill="#d99a8a" opacity="0.55"/>
    <!-- Nose (dusty rose) -->
    <path d="M48 68 Q50 70 52 68 Q51 70 50 71 Q49 70 48 68 Z" fill="#d99a8a" stroke="#a06b1a" stroke-width="0.8"/>
    <!-- Content smile -->
    <path d="M44 74 Q50 78 56 74" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Whiskers -->
    <path d="M28 70 Q34 71 40 72" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
    <path d="M28 74 Q34 74 40 74" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
    <path d="M60 72 Q66 71 72 70" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
    <path d="M60 74 Q66 74 72 74" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
    <!-- Tail curled up gently -->
    <path d="M70 110 Q86 108 80 94" fill="none" stroke="#6b4a2a" stroke-width="1.6"/>
    <!-- Bread crumb on whisker (amber) -->
    <circle cx="38" cy="76" r="1.2" fill="#e7a44a"/>
  </g>
</svg>`;

// Chapter 3 — 好奇玩心: head tilted, curious eyes, paw raised.
// v0.9 — amber-brown body + cream belly, warm dark eyes (no cool blue), paper grain.
const kittenCh3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="kit3-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="29"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 130 Q36 126 50 129 Q64 132 78 129 Q72 134 50 134 Q28 134 22 130 Z"
        fill="#6b4a2a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-4 50 90)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body -->
    <path d="M30 98 Q26 80 38 72 Q50 66 62 72 Q74 80 70 98 Q74 118 62 126 Q50 128 38 126 Q26 118 30 98 Z"
          fill="#d9b483" filter="url(#kit3-paper)"/>
    <!-- Belly -->
    <path d="M50 86 Q38 88 36 100 Q38 116 50 120 Q62 116 64 100 Q62 88 50 86 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="0.9"/>
    <!-- Pencil shading -->
    <path d="M28 90 Q26 102 30 114" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M72 90 Q74 102 70 114" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Raised paw -->
    <path d="M68 92 Q74 92 74 100 Q74 108 68 108 Q62 108 62 100 Q62 92 68 92 Z" fill="#d9b483"/>
    <path d="M68 94 Q71 94 71 97 Q71 100 68 100 Q65 100 65 97 Q65 94 68 94 Z" fill="#f4e1c0"/>
    <!-- Head tilted -->
    <g transform="rotate(8 50 56)">
      <path d="M50 34 C36 34 28 44 28 56 C28 68 38 76 50 76 C62 76 72 68 72 56 C72 44 64 34 50 34 Z"
            fill="#d9b483" filter="url(#kit3-paper)"/>
      <!-- Ears -->
      <path d="M30 44 Q32 28 36 30 Q42 36 44 42 Q38 44 30 44 Z" fill="#c9a368"/>
      <path d="M70 44 Q68 28 64 30 Q58 36 56 42 Q62 44 70 44 Z" fill="#c9a368"/>
      <path d="M35 34 L37 40" stroke="#d99a8a" stroke-width="2"/>
      <path d="M65 34 L63 40" stroke="#d99a8a" stroke-width="2"/>
      <!-- Big round curious eyes (cream not white) -->
      <path d="M42 53 Q36 54 36 59 Q38 64 42 64 Q47 64 47 59 Q47 54 42 53 Z"
            fill="#fef8ed" stroke="#6b4a2a" stroke-width="1.1"/>
      <path d="M58 53 Q53 54 53 59 Q53 64 58 64 Q63 64 64 59 Q64 54 58 53 Z"
            fill="#fef8ed" stroke="#6b4a2a" stroke-width="1.1"/>
      <circle cx="42" cy="58" r="3.4" fill="#3d2817" class="mascot-pupil mascot-eye"/>
      <circle cx="58" cy="58" r="3.4" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
      <circle cx="43" cy="56" r="1.1" fill="#fef8ed"/>
      <circle cx="59" cy="56" r="1.1" fill="#fef8ed"/>
      <!-- Nose -->
      <path d="M48 66 Q50 68 52 66 Q51 68 50 69 Q49 68 48 66 Z" fill="#d99a8a" stroke="#a06b1a" stroke-width="0.8"/>
      <!-- Curious "o" mouth -->
      <path d="M48 73 Q50 71 52 73 Q52 75 50 75 Q48 75 48 73 Z" fill="none" stroke="#6b4a2a" stroke-width="1.1"/>
      <!-- Whiskers -->
      <path d="M28 68 Q34 69 40 70" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
      <path d="M60 70 Q66 69 72 68" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
      <!-- Dusty rose cheek blush -->
      <ellipse cx="34" cy="64" rx="2.8" ry="1.8" fill="#d99a8a" opacity="0.55"/>
      <ellipse cx="66" cy="64" rx="2.8" ry="1.8" fill="#d99a8a" opacity="0.55"/>
    </g>
    <!-- Tail flicked up -->
    <path d="M30 110 Q14 106 22 92" fill="none" stroke="#6b4a2a" stroke-width="1.6"/>
  </g>
</svg>`;

// Chapter 4 — 街頭自信: confident pose, slight smirk, alert ears.
// v0.9 — amber-brown with warm umber tabby stripes, warm-dark confident eyes.
const kittenCh4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="kit4-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="31"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 130 Q36 126 50 129 Q64 132 78 129 Q72 134 50 134 Q28 134 22 130 Z"
        fill="#6b4a2a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.5 50 90)"
     stroke="#6b4a2a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (stronger, upright, amber) -->
    <path d="M32 100 Q28 78 40 70 Q50 64 60 70 Q72 78 68 100 Q72 122 60 128 Q50 130 40 128 Q28 122 32 100 Z"
          fill="#d9b483" filter="url(#kit4-paper)"/>
    <!-- Tabby stripes (warm umber) -->
    <path d="M38 86 Q40 82 38 76" stroke="#8b6f4a" stroke-width="1.6" fill="none"/>
    <path d="M62 86 Q60 82 62 76" stroke="#8b6f4a" stroke-width="1.6" fill="none"/>
    <path d="M42 100 Q44 98 42 94" stroke="#8b6f4a" stroke-width="1.4" fill="none"/>
    <path d="M58 100 Q56 98 58 94" stroke="#8b6f4a" stroke-width="1.4" fill="none"/>
    <!-- Pencil shading -->
    <path d="M30 92 Q28 104 32 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M70 92 Q72 104 68 116" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 34 C36 34 28 44 28 56 C28 68 38 76 50 76 C62 76 72 68 72 56 C72 44 64 34 50 34 Z"
          fill="#d9b483" filter="url(#kit4-paper)"/>
    <!-- Alert pointed ears -->
    <path d="M30 44 Q31 22 33 22 Q42 36 44 42 Q38 44 30 44 Z" fill="#c9a368"/>
    <path d="M70 44 Q69 22 67 22 Q58 36 56 42 Q62 44 70 44 Z" fill="#c9a368"/>
    <path d="M35 30 L37 40" stroke="#d99a8a" stroke-width="2"/>
    <path d="M65 30 L63 40" stroke="#d99a8a" stroke-width="2"/>
    <!-- Tabby stripes on forehead -->
    <path d="M44 38 Q46 42 44 46" stroke="#8b6f4a" stroke-width="1.3" fill="none"/>
    <path d="M56 38 Q54 42 56 46" stroke="#8b6f4a" stroke-width="1.3" fill="none"/>
    <path d="M50 36 L50 42" stroke="#8b6f4a" stroke-width="1.3" fill="none"/>
    <!-- Small scar on cheek -->
    <path d="M64 62 L68 66" stroke="#6b4a2a" stroke-width="1"/>
    <!-- Confident narrow eyes (warm dark) -->
    <path d="M38 58 Q40 56 46 58 Q42 62 38 60 Z" fill="#3d2817" class="mascot-eye"/>
    <path d="M54 58 Q60 56 62 58 Q58 62 54 60 Z" fill="#3d2817" class="mascot-eye mascot-eye-right"/>
    <circle cx="42" cy="58" r="1" fill="#fef8ed"/>
    <circle cx="58" cy="58" r="1" fill="#fef8ed"/>
    <!-- Nose -->
    <path d="M48 68 Q50 70 52 68 Q51 70 50 71 Q49 70 48 68 Z" fill="#d99a8a" stroke="#a06b1a" stroke-width="0.8"/>
    <!-- Smirk -->
    <path d="M44 74 Q50 75 50 73 Q52 76 56 73" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Whiskers -->
    <path d="M26 70 Q33 71 40 72" fill="none" stroke="#6b4a2a" stroke-width="0.8"/>
    <path d="M60 72 Q67 71 74 70" fill="none" stroke="#6b4a2a" stroke-width="0.8"/>
    <!-- Tail held high and proud -->
    <path d="M70 110 Q88 92 78 78" fill="none" stroke="#6b4a2a" stroke-width="1.8"/>
  </g>
</svg>`;

// Chapter 5 — 居家舒適: lounging on pillow, gentle smile, eyes closed.
// v0.9 — amber pillow, warm cream cat, deep blush, paper grain.
const kittenCh5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="kit5-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="37"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <!-- Pillow under (amber, hand-drawn) -->
  <path d="M12 120 Q30 114 50 116 Q70 114 88 120 Q88 128 70 130 Q50 132 30 130 Q12 128 12 120 Z"
        fill="#e7a44a" stroke="#6b4a2a" stroke-width="1.4" filter="url(#kit5-paper)"/>
  <path d="M16 120 Q22 116 32 118" stroke="#a06b1a" stroke-width="0.7" fill="none"/>
  <path d="M68 118 Q78 116 84 120" stroke="#a06b1a" stroke-width="0.7" fill="none"/>
  <g class="mascot-body"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body curled (irregular horizontal oval) -->
    <path d="M50 80 C30 82 16 90 16 100 C16 112 30 120 50 120 C70 120 84 112 84 100 C84 90 70 80 50 80 Z"
          fill="#d9b483" filter="url(#kit5-paper)"/>
    <!-- Belly (cream highlight) -->
    <path d="M50 94 Q26 96 24 106 Q26 118 50 118 Q74 118 76 106 Q74 96 50 94 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="0.8"/>
    <!-- Pencil shading on body -->
    <path d="M22 94 Q20 102 22 110" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M78 94 Q80 102 78 110" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Curled tail wrapping -->
    <path d="M18 102 Q12 92 22 86 Q32 84 34 94" fill="none" stroke="#6b4a2a" stroke-width="1.6"/>
    <!-- Head on pillow (tilted right) -->
    <path d="M60 62 C46 62 40 72 40 82 C40 92 50 98 60 98 C72 98 80 92 80 82 C80 72 72 62 60 62 Z"
          fill="#d9b483" filter="url(#kit5-paper)"/>
    <!-- Ears (folded, relaxed) -->
    <path d="M44 70 Q46 58 50 60 Q54 65 54 68 Q48 70 44 70 Z" fill="#c9a368"/>
    <path d="M76 70 Q74 58 70 60 Q66 65 66 68 Q72 70 76 70 Z" fill="#c9a368"/>
    <path d="M47 62 L48 66" stroke="#d99a8a" stroke-width="1.6"/>
    <path d="M73 62 L72 66" stroke="#d99a8a" stroke-width="1.6"/>
    <!-- Sleeping eyes (closed crescents, warm dark) -->
    <path d="M50 80 Q54 84 58 80" fill="none" stroke="#3d2817" stroke-width="1.8" class="mascot-eye"/>
    <path d="M62 80 Q66 84 70 80" fill="none" stroke="#3d2817" stroke-width="1.8" class="mascot-eye mascot-eye-right"/>
    <!-- Dusty rose cheek blush -->
    <ellipse cx="48" cy="86" rx="3" ry="2" fill="#d99a8a" opacity="0.6"/>
    <ellipse cx="72" cy="86" rx="3" ry="2" fill="#d99a8a" opacity="0.6"/>
    <!-- Nose + content smile -->
    <path d="M58 88 Q60 90 62 88 Q61 90 60 91 Q59 90 58 88 Z" fill="#d99a8a" stroke="#a06b1a" stroke-width="0.8"/>
    <path d="M55 92 Q60 95 65 92" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Whiskers -->
    <path d="M40 86 Q45 87 50 88" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
    <path d="M68 88 Q73 87 78 86" fill="none" stroke="#6b4a2a" stroke-width="0.7"/>
    <!-- Sleeping Z's (warm umber) -->
    <text x="78" y="58" font-size="10" font-family="serif" fill="#6b4a2a" opacity="0.6">z</text>
    <text x="84" y="50" font-size="14" font-family="serif" fill="#6b4a2a" opacity="0.6">Z</text>
  </g>
</svg>`;

// ─── Story NPCs (5, warm hand-drawn Ghibli-esque) ────────────────────────────

// Ch1 — 撐傘阿嬤
// v0.9 — amber umbrella (not blue), warm cardigan, cream-white bun, hand-drawn.
const npcGrandma = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="grandma-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="41"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 130 Q36 126 50 129 Q64 132 78 129 Q72 134 50 134 Q28 134 22 130 Z"
        fill="#6b4a2a" opacity="0.22"/>
  <!-- Umbrella (warm amber, hand-drawn) -->
  <path d="M14 50 Q50 18 86 50 Q70 48 50 50 Q30 48 14 50 Z"
        fill="#e7a44a" stroke="#6b4a2a" stroke-width="1.5" filter="url(#grandma-paper)"/>
  <path d="M50 50 L50 20" stroke="#6b4a2a" stroke-width="1.2"/>
  <path d="M30 50 Q30 38 50 22" fill="none" stroke="#a06b1a" stroke-width="0.6" opacity="0.7"/>
  <path d="M70 50 Q70 38 50 22" fill="none" stroke="#a06b1a" stroke-width="0.6" opacity="0.7"/>
  <path d="M50 50 L50 78" stroke="#6b4a2a" stroke-width="1.6"/>
  <path d="M48 78 Q50 84 54 80" fill="none" stroke="#6b4a2a" stroke-width="1.6" stroke-linecap="round"/>
  <g class="mascot-body" transform="rotate(-1.2 50 100)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (warm amber cardigan, hand-drawn) -->
    <path d="M30 88 Q40 84 50 84 Q60 84 70 88 Q73 100 73 116 Q74 126 73 130 L27 130 Q26 126 27 116 Q27 100 30 88 Z"
          fill="#c9893a" filter="url(#grandma-paper)"/>
    <!-- Cardigan center line + buttons (amber accent) -->
    <path d="M50 88 L50 128" stroke="#6b4a2a" stroke-width="0.8"/>
    <circle cx="50" cy="100" r="1.4" fill="#e7a44a" stroke="#a06b1a" stroke-width="0.6"/>
    <circle cx="50" cy="112" r="1.4" fill="#e7a44a" stroke="#a06b1a" stroke-width="0.6"/>
    <circle cx="50" cy="124" r="1.4" fill="#e7a44a" stroke="#a06b1a" stroke-width="0.6"/>
    <!-- Pencil shading -->
    <path d="M32 96 Q30 110 33 122" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <path d="M68 96 Q70 110 67 122" fill="none" stroke="#8b6f4a" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 50 C39 50 33 58 33 68 C33 78 41 86 50 86 C60 86 67 78 67 68 C67 58 61 50 50 50 Z"
          fill="#f6d8b8" filter="url(#grandma-paper)"/>
    <!-- White bun hair (cream, not pure white) -->
    <path d="M32 52 Q40 44 50 44 Q60 44 68 52 Q66 58 50 60 Q34 58 32 52 Z" fill="#f4e1c0" stroke="#a07d52" stroke-width="1"/>
    <path d="M50 40 Q56 40 56 46 Q54 50 50 50 Q46 50 44 46 Q44 40 50 40 Z" fill="#f4e1c0" stroke="#a07d52" stroke-width="1"/>
    <!-- Cane (amber) -->
    <path d="M82 96 Q86 92 88 96 L88 132" stroke="#a06b1a" stroke-width="2" fill="none"/>
    <!-- Closed gentle smiling eyes -->
    <path d="M42 70 Q44 72 46 70" fill="none" stroke="#3d2817" stroke-width="1.4" class="mascot-eye"/>
    <path d="M54 70 Q56 72 58 70" fill="none" stroke="#3d2817" stroke-width="1.4" class="mascot-eye mascot-eye-right"/>
    <!-- Dusty rose blush -->
    <ellipse cx="40" cy="76" rx="2.5" ry="1.8" fill="#d99a8a" opacity="0.65"/>
    <ellipse cx="60" cy="76" rx="2.5" ry="1.8" fill="#d99a8a" opacity="0.65"/>
    <!-- Gentle smile -->
    <path d="M44 80 Q50 84 56 80" fill="none" stroke="#6b4a2a" stroke-width="1.3"/>
    <!-- Wrinkle hints -->
    <path d="M36 72 q1 2 0 4" stroke="#a07d52" stroke-width="0.6" fill="none"/>
    <path d="M64 72 q-1 2 0 4" stroke="#a07d52" stroke-width="0.6" fill="none"/>
  </g>
</svg>`;

// Ch2 — 麵包店老闆 (cream apron, flour-dusted, round)
// v0.9 — warm amber shirt, cream apron, golden bread loaf.
const npcBaker = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="baker-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="43"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 130 Q36 126 50 129 Q64 132 78 129 Q72 134 50 134 Q28 134 22 130 Z"
        fill="#6b4a2a" opacity="0.22"/>
  <g class="mascot-body" transform="rotate(-1 50 100)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (warm umber shirt) -->
    <path d="M22 86 Q35 80 50 80 Q66 80 78 86 Q83 100 82 116 Q83 126 80 130 L20 130 Q17 126 18 116 Q17 100 22 86 Z"
          fill="#a07d52" filter="url(#baker-paper)"/>
    <!-- Cream apron front -->
    <path d="M32 90 Q50 86 68 90 Q70 104 68 118 Q69 128 66 130 L34 130 Q31 128 32 118 Q30 104 32 90 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="1"/>
    <!-- Apron tie around neck -->
    <path d="M44 86 Q50 80 56 86" fill="none" stroke="#6b4a2a" stroke-width="1.4"/>
    <!-- Flour dust (cream) -->
    <circle cx="42" cy="104" r="1.4" fill="#fef8ed"/>
    <circle cx="58" cy="110" r="1.6" fill="#fef8ed"/>
    <circle cx="50" cy="116" r="1.2" fill="#fef8ed"/>
    <circle cx="46" cy="122" r="1" fill="#fef8ed"/>
    <!-- Pencil shading -->
    <path d="M25 96 Q23 110 26 122" fill="none" stroke="#5a4028" stroke-width="0.6" opacity="0.5"/>
    <path d="M75 96 Q77 110 74 122" fill="none" stroke="#5a4028" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 42 C36 42 30 52 30 62 C30 74 38 82 50 82 C62 82 70 74 70 62 C70 52 64 42 50 42 Z"
          fill="#f6d8b8" filter="url(#baker-paper)"/>
    <!-- Baker hat (cream mushroom, hand-drawn) -->
    <path d="M32 38 Q36 28 50 28 Q64 28 68 38 Q66 44 50 44 Q34 44 32 38 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="1.2"/>
    <path d="M36 40 Q50 38 64 40 Q64 48 50 48 Q36 48 36 40 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="1.1"/>
    <!-- Bushy moustache (warm umber) -->
    <path d="M40 74 Q44 76 50 74 Q56 76 60 74 Q58 80 50 78 Q42 80 40 74 Z" fill="#6b4a2a"/>
    <!-- Warm crescent eyes -->
    <path d="M40 60 Q44 64 48 60" fill="none" stroke="#3d2817" stroke-width="1.8" class="mascot-eye"/>
    <path d="M52 60 Q56 64 60 60" fill="none" stroke="#3d2817" stroke-width="1.8" class="mascot-eye mascot-eye-right"/>
    <!-- Cheek blush -->
    <ellipse cx="36" cy="66" rx="3" ry="2.4" fill="#d99a8a" opacity="0.65"/>
    <ellipse cx="64" cy="66" rx="3" ry="2.4" fill="#d99a8a" opacity="0.65"/>
    <!-- Bread loaf (golden amber) -->
    <path d="M36 100 Q50 96 64 100 Q66 104 64 108 Q50 112 36 108 Q34 104 36 100 Z"
          fill="#e7a44a" stroke="#a06b1a" stroke-width="1.2" filter="url(#baker-paper)"/>
    <path d="M42 100 q2 -3 4 0" stroke="#a06b1a" stroke-width="0.8" fill="none"/>
    <path d="M50 100 q2 -3 4 0" stroke="#a06b1a" stroke-width="0.8" fill="none"/>
  </g>
</svg>`;

// Ch3 — 美美 (Mei-mei, ~7yo, ponytail, holding cat treats)
// v0.9 — dusty-rose dress (not bright pink), warm umber hair, cream treat bag.
const npcMeimei = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="meimei-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="47"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M22 130 Q36 126 50 129 Q64 132 78 129 Q72 134 50 134 Q28 134 22 130 Z"
        fill="#6b4a2a" opacity="0.2"/>
  <g class="mascot-body" transform="rotate(-1.5 50 100)"
     stroke="#6b4a2a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Dusty-rose dress (hand-drawn) -->
    <path d="M30 86 Q40 82 50 82 Q60 82 70 86 Q76 100 77 116 Q78 126 76 130 L24 130 Q22 126 23 116 Q24 100 30 86 Z"
          fill="#d99a8a" filter="url(#meimei-paper)"/>
    <!-- Dress collar -->
    <path d="M40 86 Q50 92 60 86" fill="none" stroke="#a06b1a" stroke-width="1.2"/>
    <!-- Pocket detail -->
    <path d="M42 104 L56 104 L56 114 L42 114 Z" fill="none" stroke="#a06b1a" stroke-width="0.8"/>
    <!-- Pencil shading -->
    <path d="M28 96 Q26 110 29 122" fill="none" stroke="#a06b1a" stroke-width="0.6" opacity="0.5"/>
    <path d="M72 96 Q74 110 71 122" fill="none" stroke="#a06b1a" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 44 C38 44 32 52 32 62 C32 74 40 82 50 82 C60 82 68 74 68 62 C68 52 62 44 50 44 Z"
          fill="#f6d8b8" filter="url(#meimei-paper)"/>
    <!-- Hair front bangs (warm umber) -->
    <path d="M32 56 Q34 42 50 42 Q66 42 68 56 Q60 50 50 52 Q40 50 32 56 Z" fill="#6b4a2a"/>
    <!-- Side ponytail -->
    <path d="M68 60 Q82 62 84 76 Q80 80 76 76 Q72 70 68 64 Z" fill="#6b4a2a"/>
    <!-- Ponytail tie (brand amber) -->
    <path d="M71 62 Q77 62 77 65 Q74 67 71 66 Q70 64 71 62 Z" fill="#e7a44a" stroke="#a06b1a" stroke-width="0.8"/>
    <!-- Big shy eyes (cream not white) -->
    <path d="M42 60 Q39 60 39 64 Q40 68 42 68 Q45 68 45 64 Q45 60 42 60 Z"
          fill="#fef8ed" stroke="#6b4a2a" stroke-width="1"/>
    <path d="M58 60 Q55 60 55 64 Q55 68 58 68 Q61 68 61 64 Q61 60 58 60 Z"
          fill="#fef8ed" stroke="#6b4a2a" stroke-width="1"/>
    <ellipse cx="42" cy="65" rx="2.2" ry="2.8" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <ellipse cx="58" cy="65" rx="2.2" ry="2.8" fill="#3d2817" class="mascot-pupil mascot-eye mascot-eye-right"/>
    <circle cx="43" cy="64" r="0.7" fill="#fef8ed"/>
    <circle cx="59" cy="64" r="0.7" fill="#fef8ed"/>
    <!-- Dusty rose blush (strong — shy kid) -->
    <ellipse cx="36" cy="72" rx="2.4" ry="1.8" fill="#d99a8a" opacity="0.7"/>
    <ellipse cx="64" cy="72" rx="2.4" ry="1.8" fill="#d99a8a" opacity="0.7"/>
    <!-- Shy smile -->
    <path d="M46 78 Q50 80 54 78" fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <!-- Treat bag (cream + amber, hand-drawn) -->
    <path d="M40 98 L60 98 Q62 100 62 112 L38 112 Q38 100 40 98 Z"
          fill="#f4e1c0" stroke="#a07d52" stroke-width="1.2"/>
    <text x="50" y="108" text-anchor="middle" font-size="6" font-family="system-ui" fill="#6b4a2a">treat</text>
    <circle cx="44" cy="106" r="1" fill="#e7a44a"/>
    <circle cx="56" cy="108" r="1" fill="#e7a44a"/>
  </g>
</svg>`;

// Ch4 — 布魯托 (one-eyed stray dog, scruffy, protective)
// v0.9 — warm umber fur, amber snout, hand-drawn scars and tufts.
const npcBrutus = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="brutus-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="53"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.12 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M20 130 Q36 126 50 129 Q64 132 80 129 Q72 134 50 134 Q28 134 20 130 Z"
        fill="#6b4a2a" opacity="0.25"/>
  <g class="mascot-body" transform="rotate(-1.2 50 90)"
     stroke="#6b4a2a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (warm umber, scruffy) -->
    <path d="M22 96 Q18 76 34 70 Q50 64 66 70 Q82 76 78 96 Q82 122 64 128 Q50 130 36 128 Q18 122 22 96 Z"
          fill="#8b6f4a" filter="url(#brutus-paper)"/>
    <!-- Scruffy fur tufts -->
    <path d="M28 90 q-3 4 0 8" stroke="#3d2817" stroke-width="1.4" fill="none"/>
    <path d="M72 88 q3 4 0 8" stroke="#3d2817" stroke-width="1.4" fill="none"/>
    <path d="M40 124 q-1 4 -3 6" stroke="#3d2817" stroke-width="1.2" fill="none"/>
    <path d="M60 124 q1 4 3 6" stroke="#3d2817" stroke-width="1.2" fill="none"/>
    <!-- Pencil shading on body -->
    <path d="M24 88 Q22 104 26 118" fill="none" stroke="#3d2817" stroke-width="0.6" opacity="0.5"/>
    <path d="M76 88 Q78 104 74 118" fill="none" stroke="#3d2817" stroke-width="0.6" opacity="0.5"/>
    <!-- Head -->
    <path d="M50 32 C34 32 26 42 26 56 C26 70 36 80 50 80 C64 80 74 70 74 56 C74 42 66 32 50 32 Z"
          fill="#8b6f4a" filter="url(#brutus-paper)"/>
    <!-- Floppy ears (warm dark umber) -->
    <path d="M26 50 Q18 70 30 78 Q34 70 34 56 Z" fill="#6b4a2a"/>
    <path d="M74 50 Q82 70 70 78 Q66 70 66 56 Z" fill="#6b4a2a"/>
    <!-- Snout (warm amber) -->
    <path d="M50 64 C42 64 36 68 36 74 C36 80 42 84 50 84 C58 84 64 80 64 74 C64 68 58 64 50 64 Z"
          fill="#c9a368"/>
    <!-- Nose (warm dark, not pure black) -->
    <path d="M50 67 Q54 67 54 71 Q52 73 50 73 Q48 73 46 71 Q46 67 50 67 Z" fill="#3d2817"/>
    <!-- Mouth (slight smile) -->
    <path d="M44 80 Q50 84 56 80" fill="none" stroke="#3d2817" stroke-width="1.4"/>
    <!-- One good eye (cream not white) -->
    <path d="M40 53 Q36 53 36 57 Q38 60 40 60 Q44 60 44 57 Q44 53 40 53 Z"
          fill="#fef8ed" stroke="#3d2817" stroke-width="1.1"/>
    <circle cx="40" cy="56" r="2.4" fill="#3d2817" class="mascot-pupil mascot-eye"/>
    <circle cx="41" cy="55" r="0.7" fill="#fef8ed"/>
    <!-- Scarred eye X (warm dark) -->
    <path d="M56 52 L64 60" stroke="#3d2817" stroke-width="1.6"/>
    <path d="M64 52 L56 60" stroke="#3d2817" stroke-width="1.6"/>
    <!-- Scar across nose -->
    <path d="M44 38 L52 44" stroke="#3d2817" stroke-width="1.2"/>
    <!-- Tail (low, alert) -->
    <path d="M74 110 Q88 108 86 96" fill="none" stroke="#3d2817" stroke-width="1.8"/>
    <!-- Tiny dusty rose hint on snout (warmth) -->
    <ellipse cx="40" cy="76" rx="2.4" ry="1.4" fill="#d99a8a" opacity="0.4"/>
    <ellipse cx="60" cy="76" rx="2.4" ry="1.4" fill="#d99a8a" opacity="0.4"/>
  </g>
</svg>`;

// Ch5 — 美美的爸媽 + 美美 (family trio, warm living-room vibe)
// v0.9 — warm amber lamp glow, umber dad shirt, dusty-rose mom blouse,
// paper-grain skin tones, dusty-rose heart between them.
const npcFamily = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" aria-hidden="true">
  <defs>
    <filter id="family-paper" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="59"/>
      <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.1 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <path d="M14 132 Q36 128 50 131 Q66 134 86 131 Q72 136 50 136 Q22 136 14 132 Z"
        fill="#6b4a2a" opacity="0.2"/>
  <!-- Warm amber lamp glow halo -->
  <circle cx="50" cy="70" r="46" fill="#e7a44a" opacity="0.18"/>
  <g class="mascot-body"
     stroke="#6b4a2a" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <!-- Dad (left) -->
    <path d="M24 56 C16 56 13 64 13 68 C13 76 19 80 24 80 C29 80 35 76 35 68 C35 64 32 56 24 56 Z"
          fill="#f6d8b8" filter="url(#family-paper)"/>
    <!-- Dad hair (warm dark umber) -->
    <path d="M14 60 Q16 50 24 50 Q34 50 36 60 Q34 64 24 58 Q16 64 14 60 Z" fill="#3d2817"/>
    <!-- Dad shirt (warm umber, not blue) -->
    <path d="M14 86 Q24 80 34 86 Q36 100 36 116 Q37 128 35 130 L13 130 Q11 128 12 116 Q12 100 14 86 Z"
          fill="#8b6f4a" filter="url(#family-paper)"/>
    <!-- Dad face -->
    <circle cx="20" cy="68" r="1.3" fill="#3d2817" class="mascot-eye"/>
    <circle cx="28" cy="68" r="1.3" fill="#3d2817" class="mascot-eye mascot-eye-right"/>
    <path d="M20 74 Q24 76 28 74" fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <!-- Dad cheek blush -->
    <ellipse cx="17" cy="72" rx="2" ry="1.4" fill="#d99a8a" opacity="0.5"/>
    <ellipse cx="31" cy="72" rx="2" ry="1.4" fill="#d99a8a" opacity="0.5"/>

    <!-- Mom (right) -->
    <path d="M76 56 C68 56 65 64 65 68 C65 76 71 80 76 80 C81 80 87 76 87 68 C87 64 84 56 76 56 Z"
          fill="#f6d8b8" filter="url(#family-paper)"/>
    <!-- Mom hair (warm umber, shoulder-length) -->
    <path d="M66 60 Q70 48 80 50 Q88 54 88 64 Q86 72 84 76 Q82 70 76 72 Q70 70 66 76 Q64 70 66 60 Z" fill="#6b4a2a"/>
    <!-- Mom blouse (dusty rose) -->
    <path d="M64 86 Q76 80 88 86 Q90 100 89 116 Q90 128 88 130 L65 130 Q63 128 63 116 Q63 100 64 86 Z"
          fill="#d99a8a" filter="url(#family-paper)"/>
    <!-- Mom face -->
    <path d="M70 68 Q72 70 74 68" fill="none" stroke="#3d2817" stroke-width="1.4" class="mascot-eye"/>
    <path d="M78 68 Q80 70 82 68" fill="none" stroke="#3d2817" stroke-width="1.4" class="mascot-eye mascot-eye-right"/>
    <path d="M72 74 Q76 76 80 74" fill="none" stroke="#6b4a2a" stroke-width="1.2"/>
    <!-- Mom cheek blush -->
    <ellipse cx="69" cy="72" rx="2" ry="1.4" fill="#d99a8a" opacity="0.55"/>
    <ellipse cx="83" cy="72" rx="2" ry="1.4" fill="#d99a8a" opacity="0.55"/>

    <!-- Mei-mei (center, smaller) -->
    <path d="M50 76 C44 76 41 82 41 86 C41 92 46 96 50 96 C54 96 59 92 59 86 C59 82 56 76 50 76 Z"
          fill="#f6d8b8" filter="url(#family-paper)"/>
    <!-- Mei-mei hair -->
    <path d="M42 80 Q44 70 50 70 Q56 70 58 80 Q54 76 50 78 Q46 76 42 80 Z" fill="#6b4a2a"/>
    <!-- Ponytail (warm umber) -->
    <path d="M58 80 Q63 80 62 86 Q59 88 57 86 Q56 82 58 80 Z" fill="#6b4a2a"/>
    <!-- Mei-mei dress (dusty rose, matches mom) -->
    <path d="M42 102 Q50 98 58 102 Q61 116 61 124 Q62 130 60 130 L40 130 Q38 130 39 124 Q39 116 42 102 Z"
          fill="#d99a8a" stroke="#a06b1a" stroke-width="1"/>
    <!-- Mei-mei face -->
    <circle cx="46" cy="86" r="1.1" fill="#3d2817" class="mascot-eye"/>
    <circle cx="54" cy="86" r="1.1" fill="#3d2817" class="mascot-eye mascot-eye-right"/>
    <path d="M46 90 Q50 92 54 90" fill="none" stroke="#6b4a2a" stroke-width="1"/>
    <!-- Mei-mei blush -->
    <ellipse cx="43" cy="88" rx="1.8" ry="1.2" fill="#d99a8a" opacity="0.65"/>
    <ellipse cx="57" cy="88" rx="1.8" ry="1.2" fill="#d99a8a" opacity="0.65"/>

    <!-- Heart between them (dusty rose) -->
    <path d="M50 56 q-3 -4 -6 -2 q-3 3 0 6 q3 3 6 5 q3 -2 6 -5 q3 -3 0 -6 q-3 -2 -6 2 z"
          fill="#d99a8a" stroke="#a06b1a" stroke-width="0.7"/>
  </g>
</svg>`;

export const MASCOTS: Record<string, MascotDef> = {
  owl: { id: 'owl', svg: owl },
  waiter: { id: 'waiter', svg: waiter },
  flightAttendant: { id: 'flightAttendant', svg: flightAttendant },
  doctor: { id: 'doctor', svg: doctor },
  coworker: { id: 'coworker', svg: coworker },
  receptionist: { id: 'receptionist', svg: receptionist },
  // v0.8 story mode — kitten states
  kittenCh1: { id: 'kittenCh1', svg: kittenCh1 },
  kittenCh2: { id: 'kittenCh2', svg: kittenCh2 },
  kittenCh3: { id: 'kittenCh3', svg: kittenCh3 },
  kittenCh4: { id: 'kittenCh4', svg: kittenCh4 },
  kittenCh5: { id: 'kittenCh5', svg: kittenCh5 },
  // v0.8 story mode — NPCs
  npcGrandma: { id: 'npcGrandma', svg: npcGrandma },
  npcBaker: { id: 'npcBaker', svg: npcBaker },
  npcMeimei: { id: 'npcMeimei', svg: npcMeimei },
  npcBrutus: { id: 'npcBrutus', svg: npcBrutus },
  npcFamily: { id: 'npcFamily', svg: npcFamily },
};

export function getMascotSvg(id: string): string {
  return (MASCOTS[id] ?? MASCOTS.owl).svg;
}
