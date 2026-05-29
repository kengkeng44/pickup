#!/usr/bin/env node
/**
 * generate-mascots.js — Pickup v2.0 post-ship feature
 *
 * Generates character variants via OpenAI gpt-image-1 (transparent PNG).
 * Saves to public/mascots/preview/ — does NOT overwrite existing
 * iso-grandma.webp / iso-shiba.webp etc. User reviews, picks best,
 * Claude moves the chosen file to the real asset path + commits.
 *
 * Cost (2026-05):
 *   - low quality: $0.04/img
 *   - medium quality: $0.11/img (default)
 *   - high quality: $0.19/img
 *   Default 6 PNGs medium ≈ $0.66.
 *
 * Setup:
 *   1. OPENAI_API_KEY in env or .env (or via `infisical run --`)
 *   2. node tools/generate-mascots.js [grandma|shiba|both] [n=3] [quality]
 *
 * Examples:
 *   node tools/generate-mascots.js           # both, 3 variants each, medium
 *   node tools/generate-mascots.js grandma 5 # only grandma, 5 variants
 *   node tools/generate-mascots.js both 2 low # cheap exploration
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

// Load API key (env or .env)
if (!process.env.OPENAI_API_KEY) {
  const envPath = resolve(repoRoot, '.env');
  if (existsSync(envPath)) {
    const envText = readFileSync(envPath, 'utf-8');
    const match = envText.match(/^OPENAI_API_KEY=(.+)$/m);
    if (match) {
      process.env.OPENAI_API_KEY = match[1].trim().replace(/^["']|["']$/g, '');
    }
  }
}
if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Set via .env or `infisical run --`.');
  process.exit(1);
}

// Args
const target = (process.argv[2] || 'both').toLowerCase();
const variantsPerChar = parseInt(process.argv[3] || '3', 10);
const quality = (process.argv[4] || 'medium').toLowerCase();
if (!['low', 'medium', 'high'].includes(quality)) {
  console.error('quality must be low / medium / high');
  process.exit(1);
}

// Pickup brand palette + style — Duolingo character DNA aesthetic
const STYLE_BASE = `CRITICAL STYLE REFERENCE: emulate Duolingo's official character design language. Specifically reference Duolingo characters: Lin (kindly grandmother figure with grey hair bun), Junior (round small kid), Lily (teen), Bea (athletic), Oscar (older man), Eddy (cool guy), Vikram, Lucy. The visual DNA is:
- Bold solid color blocks with clean smooth shape silhouettes
- Big simplified facial features: oval pupils with tiny white highlight dot, simple curved smile line, single eyebrow stroke
- LARGE head 40-50% of body height, SMALL chunky body, short legs, big round hands/paws
- Soft cel-shading: one base color tone + one slightly darker shadow tone per zone (NOT realistic gradient, NOT flat-only)
- Outlines: VERY soft and clean — only at silhouette edges, NOT bold black ink outline (NOT RUMBO style, NOT Sanrio thick lines). Think Duolingo's clean vector aesthetic.
- Friendly, inviting, slightly silly even when serious — never corporate

Studio Ghibli warm palette injected into Duolingo character DNA.

PALETTE LOCK: amber #e7a44a, cream #fef8ed, coffee brown #8b6f4a, olive green #7d9a4f, warm dark text #3c2a1c. Avoid bright Disney saturation. Avoid Duolingo bright green #58cc02.

SHADING: gentle soft cel-shading only. Flat color blocks. NO gradient. NO halo. NO glow. NO blur drop shadow. NO baked floor shadow under character.

CRITICAL — what NOT to include (runtime app draws these):
- NO white tile platform under character
- NO sticker die-cut border around character
- NO drop shadow blob under character
- NO baked ellipse floor beneath
- The character must stand cleanly on transparent background. The Pickup app composites a solid ellipse floor shadow (rgba(60,42,28,0.3), zero blur) at runtime beneath the character — your output must NOT include any pre-baked shadow.

OUTPUT: Square 1024x1024. Pure transparent background. Character occupies center, feet touch lower-middle of canvas (not bottom edge — leave ~15% bottom margin for runtime ellipse). NO text, NO words, NO speech bubbles.`;

const CHARACTERS = {
  grandma: {
    name: 'iso-grandma',
    prompt: `${STYLE_BASE}

Subject: A blocky stylized cute elderly East Asian grandmother sitting on a small low wooden chair, reading from a small open storybook on her lap. Bedtime storytelling pose (NOT umbrella-holding).

CHARACTER STYLE — BLOCKY + KAWAII:
- Body shapes are SIMPLIFIED, BLOCKY, CHUBBY rectangles and ovals — like Lego/Pop Mart vinyl figure style. NOT realistic anatomy.
- 50% head proportion (very large head, very small body)
- Cute exaggerated features:
  - EYES: gently CLOSED into upward crescent smile lines (瞇瞇眼 squinted happy eyes — like Doraemon's mom or a Studio Ghibli granny mid-laugh). NOT big round open dot eyes.
  - WRINKLES: DEEPER and LONGER laugh-line wrinkles radiating from eye corners and around mouth — exaggerated for cuteness, soft brown lines. These are a CHARACTER feature, not realistic detail.
  - Soft curved warm smile mouth, slightly open
  - Round soft glasses sit lightly on nose, lenses slightly tinted cream
- Silver-white hair in low neat bun, simplified blocky shape
- Wearing chunky warm amber knitted cardigan (simplified rectangular body shape) over cream blouse, brown long skirt
- Hands are soft simplified mitten-shapes resting on book
- Chair: small chunky brown wood, simplified rectangles

CAMERA + POSE — FOR MAP LEFT-SIDE PLACEMENT:
- 3/4 view angle, character is turned slightly to the right (body angled ~25-30° to her right, face slightly turned so she looks toward the right side of the canvas) — she will be placed on the LEFT side of the game map, facing right toward the lesson buttons curving on her right
- Slight forward lean as if reading aloud to listeners on her right
- The chair + character form one solid unified silhouette

Inspired by: Doraemon's grandmother / Studio Ghibli grannies (warm, wise, gentle) + Pop Mart blocky vinyl figure simplicity + Duolingo cell-shading. Avoid Western Disney realism. Avoid bold ink outline (RUMBO-style is wrong here).`,
  },
  navhome: {
    name: 'nav-home',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A house icon for bottom nav "home" tab. Simple cottage shape: square body + triangular roof + small door + 1 small window. WARM AMBER #e7a44a body, COFFEE BROWN #8b6f4a roof + accents. Tiny OLIVE GREEN #7d9a4f leaf on side or small bush.

CRITICAL palette: amber/coffee/olive ONLY. NO red, NO bright blue sky.

Composition: house centered, ~75% canvas, slight isometric tilt. No baked shadow. No text.`,
  },
  navtasks: {
    name: 'nav-tasks',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A clipboard with checklist icon for bottom nav "tasks" tab. Simple clipboard outline in COFFEE BROWN #8b6f4a, cream paper inside, 2-3 small check marks in OLIVE GREEN #7d9a4f, small AMBER #e7a44a clip at top.

CRITICAL palette: coffee/cream/olive/amber ONLY. NO bright Disney saturation.

Composition: clipboard centered, ~75% canvas. Subtle base shadow. No text.`,
  },
  navprofile: {
    name: 'nav-profile',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A simplified calico cat face icon (Mochi's portrait) for bottom nav "profile" tab. Just the head — chunky round shape, AMBER + COFFEE BROWN + CREAM tricolor markings, 瞇瞇眼 closed-smile eyes (matches grandma/Hana style), tiny pink nose, faint whiskers.

CRITICAL palette: amber/coffee/cream ONLY. NO bright orange #ff7a3a (use warm amber tone), NO red.

Composition: cat face centered, ~80% canvas (head fills most of icon space), straight angle. Subtle base shadow. No text.`,
  },
  navalerts: {
    name: 'nav-alerts',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A bell icon for bottom nav "alerts" tab. Simple bell shape with curved body + small handle on top + clapper hint at bottom. WARM AMBER #e7a44a bell body, COFFEE BROWN #8b6f4a accents.

CRITICAL palette: amber/coffee ONLY. NO yellow bright #ffd700, NO red notification dot.

Composition: bell centered, ~70% canvas, slight tilt as if ringing. Subtle base shadow. No text.`,
  },
  paw: {
    name: 'icon-paw',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A stylized cat paw print icon — Pickup brand's signature symbol. Classic paw print shape: 1 large central pad + 4 small toe pads above. WARM AMBER #e7a44a fill with COFFEE BROWN #8b6f4a 3D-depth shadow side (subtle). Soft cel-shading.

CRITICAL palette: amber/coffee/cream ONLY. NO orange #ff7a3a, NO red, NO Disney saturation. Previous v1.9.41 paw had bright orange — replace with warm amber tone.

Composition: paw centered, ~70% canvas, slight angle for friendliness. Subtle base shadow. No text.`,
  },
  lock: {
    name: 'icon-lock',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A closed padlock icon (for locked chapter nodes). Body is a chunky rectangle in COFFEE BROWN #8b6f4a with a slightly darker shadow side. Top: small rounded shackle/U-shape in same coffee tone. Small AMBER #e7a44a keyhole in center.

CRITICAL palette: coffee/amber ONLY. NO bright Disney metal, NO grey neutral, NO red.

Composition: padlock centered, ~70% canvas, slight 3D tilt for Duolingo chunkiness. Subtle base shadow. No text.`,
  },
  nodepaw: {
    name: 'node-paw',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A cat paw print icon designed for use INSIDE a circular lesson node button on a learning map. Bold simplified paw shape (1 central pad + 4 toe pads above). Pure WHITE/CREAM #fef8ed fill for high contrast against the node's coffee-brown background. Subtle COFFEE BROWN #8b6f4a outline (very thin, ~2px).

CRITICAL: this is a high-contrast monochrome cream-on-coffee paw print, NOT colorful. Designed to read clearly at small sizes (~40-50px in the app).

Composition: paw centered, ~80% canvas (slightly bigger than icon-paw to fill node circle), straight angle (no tilt). No baked shadow. No text.`,
  },
  scene: {
    name: 'scene-grandma-storytime',
    prompt: `CRITICAL STYLE: Pickup app HERO SCENE illustration. Studio Ghibli warm + Duolingo chibi character DNA. Wide horizontal composition (landscape 1024×1024 OK).

PALETTE: amber #e7a44a, cream #fef8ed, coffee brown #8b6f4a, olive green #7d9a4f, warm dark text #3c2a1c. NO bright Disney, NO neon, NO red/orange clash. Warm twilight glow only.

SCENE: A quiet outdoor yard at gentle evening twilight. Soft cream-amber moonlight ambient.
- LEFT: A kind elderly East Asian grandmother (silver hair low bun, round glasses, soft 瞇瞇眼 closed smile eyes, deep cute wrinkles, blocky chibi like Lego/Pop Mart vinyl, warm amber knitted cardigan + brown skirt) sitting on a small low wooden chair, reading from an open storybook resting on her lap. Slight forward lean as if narrating.
- CENTER-RIGHT, at grandma's feet on grass: A calico chibi cat (Mochi — orange + brown + white tricolor, blocky chibi vinyl style, big oval pupils with tiny white highlight) sitting upright facing grandma, attentive listening.
- BESIDE MOCHI, slightly to the right: A chibi shiba inu (Hana — orange-amber + cream, fluffy curled tail, 瞇瞇眼 squinted happy eyes matching grandma's smile-eye style for cohesion) also sitting upright facing grandma, listening attentively.

Both Mochi and Hana share the SAME blocky cute aesthetic as grandma. Three characters form a unified composition: grandma slightly higher (on chair), the two animals smaller at her feet looking up.

BACKGROUND: VERY simple yard floor (suggested grass + a few simplified plant shapes), soft warm cream-amber gradient sky behind suggesting twilight. NO complex environment, NO foliage detail, NO buildings. Background must be MINIMAL — pure mood + space.

COMPOSITION:
- NO frame, NO border, NO box around scene
- NO sticker outline
- NO baked drop shadow
- Pure transparent background OR pure flat cream #fef8ed background only
- Characters cleanly placed in space, ample padding around them
- Slight ambient soft floor shadow under each character (small ellipse coffee tone, NOT blur)

INSPIRED BY: Studio Ghibli quiet bedtime scenes + Pop Mart vinyl figure simplicity. Avoid Disney saturation. The mood should be cozy, slow, warm — bedtime story atmosphere.

Square 1024×1024. NO text, NO words, NO speech bubbles.`,
  },
  flame: {
    name: 'icon-flame',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A stylized flame / fire icon for a streak counter in a learning app. The flame body is a chunky teardrop shape in WARM AMBER #e7a44a with a slightly lighter cream-amber inner core. Add a deeper COFFEE BROWN #8b6f4a base/edge for depth. Soft cel-shaded — 1 base tone + 1 darker depth tone, NOT realistic gradient. Friendly, cute, NOT aggressive fire.

CRITICAL palette: ONLY amber/coffee/cream/olive accent. ABSOLUTELY NO red, NO bright orange #ff7a3a, NO yellow neon. The v1.9.41 SVG fire used #ff7a3a — replace with warm amber tone family.

Composition: flame centered, ~70% canvas, slight kawaii personality (optional tiny eyes + smile if natural). Subtle solid coffee ellipse base shadow. No text.`,
  },
  lightning: {
    name: 'icon-lightning',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A stylized lightning bolt / energy icon for an energy/XP counter. Classic zigzag bolt shape in WARM AMBER #e7a44a, with a slightly darker COFFEE BROWN #8b6f4a 3D-depth side (chunky 3D Duolingo-style). Soft cel-shading. Friendly.

CRITICAL palette: amber/coffee/cream ONLY. NO yellow neon #ffeb3b, NO bright electric blue. Pickup brand warm.

Composition: bolt centered, slight tilt for energy, ~65% canvas. Subtle base shadow. Optional tiny kawaii face. No text.`,
  },
  star: {
    name: 'icon-star',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A 5-point star icon for achievements. WARM AMBER #e7a44a star body with COFFEE BROWN #8b6f4a 3D depth side (one face brighter, one darker). Chunky thick proportions, slightly rounded points (not sharp). Soft cel-shading 2 tones.

CRITICAL palette: amber/coffee ONLY. NO bright Disney gold #ffd700, NO red shimmer.

Composition: star centered, slight isometric tilt for 3D feel, ~70% canvas. Subtle base ellipse shadow. Optional tiny kawaii smile in center. No text.`,
  },
  trophy: {
    name: 'icon-trophy',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A chunky trophy cup icon. Cup bowl + handles + small base. WARM AMBER #e7a44a cup body with COFFEE BROWN #8b6f4a 3D depth + base, OLIVE GREEN #7d9a4f thin band around cup as accent. Chunky Duolingo-style.

CRITICAL palette: amber/coffee/olive ONLY. NO bright Disney gold, NO red.

Composition: trophy centered, ~70% canvas. Subtle base ellipse shadow. Optional tiny kawaii face on cup. No text.`,
  },
  coin: {
    name: 'coin-gold',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A chunky round coin icon for currency. WARM AMBER #e7a44a coin face, COFFEE BROWN #8b6f4a edge/rim showing 3D depth (Duolingo tilted-coin look). On the face: a simple OLIVE GREEN #7d9a4f paw print (matches Pickup brand — paw is the chapter section symbol).

CRITICAL palette: amber/coffee/olive ONLY. NO bright Disney gold #ffd700, NO red, NO shimmer effect.

Composition: coin centered with slight 3D tilt (top face slightly visible, edge showing on right), ~70% canvas. Subtle base shadow. No text on coin (the paw IS the symbol).`,
  },
  crown: {
    name: 'crown-gold',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A chunky crown icon for level/tier display. Classic crown shape (band + 3-5 points + small dots/circles on points as gem placeholders). WARM AMBER #e7a44a crown body with COFFEE BROWN #8b6f4a 3D depth side. Points have small OLIVE GREEN #7d9a4f circles as "gems" (NOT realistic jewels). Chunky Duolingo style.

CRITICAL palette: amber/coffee/olive ONLY. NO bright Disney gold, NO red rubies, NO purple gems, NO sparkle effect.

Composition: crown centered with slight isometric 3D feel, ~70% canvas. Subtle base ellipse shadow. No text.`,
  },
  speaker: {
    name: 'icon-speaker',
    prompt: `${STYLE_BASE.replace('CRITICAL STYLE REFERENCE: emulate Duolingo\'s official character design language.', 'CRITICAL STYLE: a clean Duolingo-style flat icon (NOT a character).')}

Subject: A stylized speaker / loudspeaker icon, designed for a UI button in a learning app. The speaker body is a chunky cube/trapezoid shape in WARM AMBER #e7a44a, with a slightly darker COFFEE BROWN #8b6f4a 3D-depth side (soft cel-shaded, NO gradient). Three curved sound-wave arcs emit from the right side of the speaker, in OLIVE GREEN #7d9a4f — three increasingly large arcs.

CRITICAL — palette restriction: ONLY use amber/coffee/olive/cream/warm-dark. ABSOLUTELY NO orange (no #ff7a3a, no #ff4500), NO red, NO Disney-bright saturation. The previous v1.9.41 icon had an orange-red 3D-depth side + orange sound waves that clashed with Pickup's warm Ghibli palette — this regen must replace those with olive + coffee.

Composition: speaker occupies roughly 70% of canvas, centered. Sound waves on right side. Subtle base shadow as one solid coffee ellipse beneath (NOT blurry, NOT separate). Soft round cute proportions, very friendly. No text, no words.`,
  },
  shiba: {
    name: 'iso-shiba',
    prompt: `${STYLE_BASE}

Subject: A blocky stylized cute chibi shiba inu dog (柴犬), sitting upright in relaxed listening posture. NO cushion or pillow underneath.

CHARACTER STYLE — BLOCKY + KAWAII (mirror Grandma's aesthetic for visual cohesion):
- Body shapes SIMPLIFIED, BLOCKY, CHUBBY — Lego/Pop Mart vinyl figure simplicity. NOT realistic shiba anatomy.
- 45-50% head proportion (very large head, very small body)
- EYES: gently closed into upturned crescent smile lines (瞇瞇眼 squinted happy eyes) — matches Grandma's eye design for cohesion
- Soft curved warm smile, tip of pink tongue slightly visible
- Round chunky face with classic shiba mask: orange-amber back of head + cream face/cheeks/muzzle
- Body: orange-amber back, cream belly + paws, simplified blocky proportions
- Fluffy curled tail wrapped at LEFT side (relative to dog) — runtime placement on RIGHT side of map curve
- Paws are soft simplified mitten-shapes

CAMERA + POSE — FOR MAP RIGHT-SIDE PLACEMENT:
- 3/4 view angle, character turned slightly to the LEFT (body angled ~25-30° to her left, face slightly turned so the dog looks toward the LEFT side of the canvas) — she will be placed on the RIGHT side of the game map, facing left toward Grandma + the lesson buttons curving on her left
- Sitting upright attentive listening pose, slight forward lean
- Compact unified silhouette

Inspired by: blocky chibi shiba inu plush + Doraemon's pet shapes + Pop Mart vinyl figure simplicity + Studio Ghibli small animals (warm, friendly, calm). Avoid Western Disney realism. Avoid bold ink outline (RUMBO is wrong here).`,
  },
};

const targets = target === 'both' ? ['grandma', 'shiba'] : [target];
const invalidTargets = targets.filter((t) => !CHARACTERS[t]);
if (invalidTargets.length) {
  console.error(`Unknown character(s): ${invalidTargets.join(', ')}. Use grandma | shiba | both.`);
  process.exit(1);
}

const previewDir = resolve(repoRoot, 'public/mascots/preview');
if (!existsSync(previewDir)) {
  mkdirSync(previewDir, { recursive: true });
}

console.log(`Generating ${variantsPerChar} variants × ${targets.length} character(s) at ${quality} quality...`);
console.log(`Output: ${previewDir}`);
console.log(`Estimated cost: $${(targets.length * variantsPerChar * { low: 0.04, medium: 0.11, high: 0.19 }[quality]).toFixed(2)}\n`);

let success = 0;
let failed = 0;

for (const charKey of targets) {
  const char = CHARACTERS[charKey];
  for (let i = 1; i <= variantsPerChar; i++) {
    const filename = `${char.name}-v${i}.png`;
    const filePath = resolve(previewDir, filename);
    if (existsSync(filePath)) {
      console.log(`SKIP ${filename} (exists — delete to regenerate)`);
      continue;
    }
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt: char.prompt,
          n: 1,
          size: '1024x1024',
          quality,
          output_format: 'png',
          background: 'transparent',
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error(`FAIL ${filename}: ${res.status} ${errText.slice(0, 300)}`);
        failed += 1;
        if (res.status === 401 || res.status === 429) {
          console.error('Stopping due to auth/quota.');
          break;
        }
        continue;
      }
      const data = await res.json();
      const b64 = data?.data?.[0]?.b64_json;
      if (!b64) {
        console.error(`FAIL ${filename}: no b64_json in response`);
        failed += 1;
        continue;
      }
      const buf = Buffer.from(b64, 'base64');
      writeFileSync(filePath, buf);
      success += 1;
      console.log(`OK ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`FAIL ${filename}: ${e.message}`);
      failed += 1;
    }
  }
}

console.log(`\nDone. ${success} generated, ${failed} failed.`);
console.log(`Preview at: ${previewDir}`);
console.log(`Next: tell Claude "生完了" — Claude will Read each PNG to display them in chat for you to pick.`);
