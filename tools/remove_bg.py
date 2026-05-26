"""Remove PNG background using rembg (U^2-Net). v1.5.1."""
import sys
from pathlib import Path
from rembg import remove
from PIL import Image

src = Path(sys.argv[1])
dst = Path(sys.argv[2])

with src.open("rb") as f:
    input_bytes = f.read()

output_bytes = remove(input_bytes)

with dst.open("wb") as f:
    f.write(output_bytes)

img = Image.open(dst)
w, h = img.size
non_transparent = sum(1 for px in img.getdata() if px[3] > 10)
print(f"OK {w}x{h} | non-transparent px: {non_transparent} / {w*h} ({non_transparent*100//(w*h)}%)")
