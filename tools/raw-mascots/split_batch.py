"""
split_batch.py — v1.9.41 icon batch pipeline.

For each of 3 batch PNGs (1024x1024 with 4 icons in a 2x2 grid):
  1. Cut into 4 quadrants (512x512 each)
  2. rembg U2-Net background removal
  3. Resize to 256x256 (plenty for 24-72px display targets)
  4. WebP encode (quality 85, method 6 = slowest/best compression)
  5. Write to public/mascots/<name>.webp

Mapping is explicit so we can reorder if the AI generated quadrants differently.
"""
import io
import sys
from pathlib import Path
from PIL import Image
from rembg import remove

HERE = Path(__file__).resolve().parent
OUT_DIR = HERE.parent.parent / "public" / "mascots"

BATCHES = [
    ("batch1.png", [("icon-speaker", "TL"), ("icon-flame", "TR"), ("icon-lightning", "BL"), ("icon-lock", "BR")]),
    ("batch2.png", [("flag-en", "TL"), ("crown-gold", "TR"), ("coin-gold", "BL"), ("icon-paw", "BR")]),
    ("batch3.png", [("node-headphones", "TL"), ("node-book", "TR"), ("icon-star", "BL"), ("icon-trophy", "BR")]),
]

def quad_box(W, H, pos):
    half_w, half_h = W // 2, H // 2
    return {
        "TL": (0, 0, half_w, half_h),
        "TR": (half_w, 0, W, half_h),
        "BL": (0, half_h, half_w, H),
        "BR": (half_w, half_h, W, H),
    }[pos]

OUT_DIR.mkdir(parents=True, exist_ok=True)

for batch_file, mapping in BATCHES:
    src_path = HERE / batch_file
    if not src_path.exists():
        print(f"SKIP {batch_file} (missing)", file=sys.stderr)
        continue
    src = Image.open(src_path).convert("RGBA")
    W, H = src.size
    print(f"\n== {batch_file} {W}x{H} ==")
    for name, pos in mapping:
        quad = src.crop(quad_box(W, H, pos))
        buf = io.BytesIO()
        quad.save(buf, format="PNG")
        bg_removed_bytes = remove(buf.getvalue())
        out = Image.open(io.BytesIO(bg_removed_bytes)).convert("RGBA")
        out = out.resize((256, 256), Image.LANCZOS)
        out_path = OUT_DIR / f"{name}.webp"
        out.save(out_path, "WEBP", quality=85, method=6)
        print(f"  {pos} -> {name}.webp  ({out_path.stat().st_size // 1024} KB)")

print("\nDone.")
