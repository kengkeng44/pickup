"""Trim story-kitten.json to Ch1 only. v1.6.0 scope."""
import json
from pathlib import Path

src = Path("C:/Users/acer/Desktop/wordwar/public/story-kitten.json")
data = json.loads(src.read_text(encoding="utf-8"))

ch1 = [q for q in data if q.get("chapter") == 1]
print(f"Total before: {len(data)}, Ch1 kept: {len(ch1)}, dropped: {len(data) - len(ch1)}")

src.write_text(
    json.dumps(ch1, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
print(f"Wrote {src} ({src.stat().st_size} bytes)")
