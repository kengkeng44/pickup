"""v1.7.17: rembg + WebP for the new splash cat (PawDoro-style eyes)."""
from pathlib import Path
from rembg import remove
from PIL import Image
import io

src = Path("C:/Users/acer/Desktop/wordwar/public/mascots/splash-cat-raw.png")
webp = Path("C:/Users/acer/Desktop/wordwar/public/mascots/splash-cat.webp")

# rembg removes the orange splash bg so the tear-intro div's own
# orange (#ed5a2e) shows through cleanly. No color-match risk.
input_bytes = src.read_bytes()
output_bytes = remove(input_bytes)

img = Image.open(io.BytesIO(output_bytes))
img.save(webp, "WEBP", quality=88, method=6, lossless=False)
print(f"raw : {src.stat().st_size / 1024:.1f} KB")
print(f"webp: {webp.stat().st_size / 1024:.1f} KB ({webp.stat().st_size * 100 / src.stat().st_size:.0f}%)")
