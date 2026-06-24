"""Generate isometric Duolingo-style chibi calico cat via Stable Horde.

POC for v1.8 visual direction shift — if quality is acceptable, scale
to NPCs (grandma, baker, Meimei, Brutus).

Prompt locks in:
- Duolingo isometric character system (big head, small body, white tile platform)
- Solid flat colors, NO black outline (or extremely thin)
- Bold simple oval pupil eyes
- Calico pattern: white face, asymmetric orange + black patches
- Soft drop shadow below
- Cream background, no text, no UI
"""
import base64
import json
import time
import sys
from pathlib import Path
import urllib.request
import urllib.error

API = "https://stablehorde.net/api/v2"
KEY = "0000000000"
OUT = Path(__file__).resolve().parent.parent / "public" / "mascots" / "iso-calico-poc.png"
OUT.parent.mkdir(parents=True, exist_ok=True)

PROMPT = (
    "Isometric 2.5D kawaii calico cat sitting on a small white square tile platform with "
    "soft drop shadow below. Duolingo character design system style. "
    "Big round chibi head about 60% of figure, small chubby body, sitting upright in iso view. "
    "Calico three-color pattern: white face with asymmetric orange and dark brown patches. "
    "Triangle pointy ears with pink inside. Tiny pink triangle nose. Small simple curve smile. "
    "Bold black oval pupil eyes (no whites, solid pupil shapes only, no eyelashes). "
    "Solid flat vector colors, NO outline OR thinnest possible outline, clean edges. "
    "Soft pastel cream background #fef8ed. Light coming from upper-left, slight gradient on body for depth. "
    "Square 1:1 composition. NO text, NO ui, NO frame. "
    "Inspired by Duolingo Lin, Lily, and Junior character art. "
    "kawaii chibi vector illustration, flat shading, isometric perspective from above-right."
)

NEGATIVE = (
    "thick outline, harsh black border, sketchy, painterly, photorealistic, "
    "anime eyes with whites, eyelashes, text, watermark, signature, logo, ui, frame, "
    "blurry, low quality, deformed, extra limbs, scary, dark, gothic, multiple cats"
)


def http_request(method: str, url: str, body=None) -> dict:
    req = urllib.request.Request(url, method=method)
    req.add_header("apikey", KEY)
    req.add_header("Client-Agent", "pickup-iso-poc:1.0")
    data = None
    if body is not None:
        req.add_header("Content-Type", "application/json")
        data = json.dumps(body).encode("utf-8")
    try:
        with urllib.request.urlopen(req, data=data, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"HTTP {e.code}: {body_text}") from e


def main() -> int:
    print(f"Submitting isometric calico cat POC...")
    payload = {
        "prompt": PROMPT + "###" + NEGATIVE,
        "params": {
            "sampler_name": "k_dpmpp_2m",
            "cfg_scale": 8,
            "steps": 35,
            "width": 1024,
            "height": 1024,
            "n": 1,
        },
        "models": ["AlbedoBase XL (SDXL)", "ICBINP - I Can't Believe It's Not Photography"],
        "nsfw": False,
        "censor_nsfw": True,
        "trusted_workers": False,
    }
    out = http_request("POST", f"{API}/generate/async", payload)
    job_id = out["id"]
    print(f"job_id={job_id}")

    start = time.time()
    while True:
        check = http_request("GET", f"{API}/generate/check/{job_id}")
        elapsed = int(time.time() - start)
        print(
            f"  queue={check.get('queue_position', '?')} wait={check.get('wait_time', '?')}s "
            f"done={check.get('done')} elapsed={elapsed}s",
            flush=True,
        )
        if check.get("done"):
            break
        if check.get("faulted"):
            raise RuntimeError(f"job faulted: {check}")
        time.sleep(25)

    status = http_request("GET", f"{API}/generate/status/{job_id}")
    gens = status.get("generations", [])
    if not gens:
        raise RuntimeError(f"no generations: {status}")
    img = gens[0].get("img")
    if not img:
        raise RuntimeError(f"no img field: {gens[0]}")
    if img.startswith("http"):
        with urllib.request.urlopen(img, timeout=60) as resp:
            OUT.write_bytes(resp.read())
    else:
        OUT.write_bytes(base64.b64decode(img))
    print(f"OK saved {OUT} ({OUT.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
