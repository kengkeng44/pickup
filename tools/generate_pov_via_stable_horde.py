"""Generate Ch1 POV scene PNGs via Stable Horde (free distributed AI image gen).

Endpoint docs: https://stablehorde.net/api/
- Anonymous use key: 0000000000 (low priority, longer queue)
- Submit async job -> poll /check/{id} -> fetch /status/{id} with image URLs
- Each image takes 1-15 min depending on queue load

Usage:
    python tools/generate_pov_via_stable_horde.py
"""
import base64
import json
import time
import sys
from pathlib import Path
import urllib.request
import urllib.error

API = "https://stablehorde.net/api/v2"
KEY = "0000000000"  # anonymous
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "pov"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Shared style anchor — appended to every prompt for consistency.
STYLE = (
    " painterly studio ghibli style, soft brushwork, warm-cool palette, "
    "amber streetlamp glow against cold blue night, low cat-height POV, "
    "no characters in frame, cinematic horizontal composition, "
    "atmospheric depth of field, slight grain, moody"
)

NEGATIVE = (
    "text, watermark, signature, logo, ui, frame, border, low quality, "
    "blurry low-res, deformed, cat in frame, person in foreground, cropped"
)

PROMPTS = {
    "ch1-q1": (
        "First person cat-eye view down a dark rainy alley at night, wet asphalt "
        "reflecting yellow streetlamp pool of light ahead, cardboard box edge in "
        "lower-left corner, diagonal rain streaks, distant blurred building, lonely cold mood."
        + STYLE
    ),
    "ch1-q2": (
        "First person cat-eye view looking down into a rain puddle, tiny ripples from "
        "raindrops, fragmented reflection of yellow streetlamp light + dark sky, "
        "blurred cardboard edges in corners, cold blue-grey dominant, shivering mood."
        + STYLE
    ),
    "ch1-q3": (
        "First person cat-eye view looking up at a closed shop window in the rain, "
        "warm yellow interior light glowing through wet fogged glass, faint shapes of bread "
        "inside, contrast between warm window and cold rain, longing mood."
        + STYLE
    ),
    "ch1-q4": (
        "First person cat-eye view of large dark silhouette of legs and umbrella approaching "
        "in the rain, ominous oversized perspective from low angle, streetlamp casting long "
        "shadow behind the figure, tense uncertain mood."
        + STYLE
    ),
    "ch1-q5": (
        "First person cat-eye view looking up at gentle elderly woman's face from below, "
        "kind soft eyes meeting the viewer, holding a blue umbrella catching streetlamp glow, "
        "painterly soft focus on her warm face, relief and warmth mood."
        + STYLE
    ),
    "ch1-q6": (
        "First person cat-eye view of the underside of a blue umbrella, raindrops splashing "
        "on its surface above, grandma silhouette holding the handle at top with dim warm face "
        "peeking down, sheltered protected mood, the turning point."
        + STYLE
    ),
}


def http_request(method: str, url: str, body: dict | None = None) -> dict:
    req = urllib.request.Request(url, method=method)
    req.add_header("apikey", KEY)
    req.add_header("Client-Agent", "pickup-pov-gen:1.0:claude-code-session")
    data = None
    if body is not None:
        req.add_header("Content-Type", "application/json")
        data = json.dumps(body).encode("utf-8")
    try:
        with urllib.request.urlopen(req, data=data, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"HTTP {e.code} on {url}: {body_text}") from e


def submit(prompt: str) -> str:
    payload = {
        "prompt": prompt,
        "params": {
            "sampler_name": "k_euler",
            "cfg_scale": 7,
            "steps": 30,
            "width": 1024,
            "height": 768,
            "n": 1,
        },
        "models": ["AlbedoBase XL (SDXL)", "ICBINP - I Can't Believe It's Not Photography", "Deliberate"],
        "nsfw": False,
        "censor_nsfw": True,
        "trusted_workers": False,
    }
    out = http_request("POST", f"{API}/generate/async", payload)
    return out["id"]


def poll_until_done(job_id: str, label: str) -> dict:
    start = time.time()
    while True:
        check = http_request("GET", f"{API}/generate/check/{job_id}")
        elapsed = int(time.time() - start)
        print(
            f"  [{label}] queue={check.get('queue_position', '?')} "
            f"wait={check.get('wait_time', '?')}s done={check.get('done')} "
            f"finished={check.get('finished')}/{check.get('processing', 0) + check.get('finished', 0)} "
            f"elapsed={elapsed}s",
            flush=True,
        )
        if check.get("done"):
            return http_request("GET", f"{API}/generate/status/{job_id}")
        if check.get("faulted"):
            raise RuntimeError(f"{label} job faulted: {check}")
        time.sleep(20)


def save_image(status: dict, out_path: Path) -> None:
    gens = status.get("generations", [])
    if not gens:
        raise RuntimeError(f"no generations returned: {status}")
    img_data = gens[0].get("img")
    if not img_data:
        raise RuntimeError(f"no image field: {gens[0]}")
    if img_data.startswith("http"):
        # URL — fetch it
        with urllib.request.urlopen(img_data, timeout=60) as resp:
            out_path.write_bytes(resp.read())
    else:
        # base64
        out_path.write_bytes(base64.b64decode(img_data))
    print(f"  -> saved {out_path} ({out_path.stat().st_size} bytes)", flush=True)


def main() -> int:
    print(f"Generating {len(PROMPTS)} POV scenes via Stable Horde (anonymous, low-priority queue).")
    print(f"Output directory: {OUT_DIR}")
    print("Each scene typically takes 2-15 min in the free queue.\n", flush=True)

    failures = []
    for key, prompt in PROMPTS.items():
        out_path = OUT_DIR / f"{key}.png"
        if out_path.exists() and out_path.stat().st_size > 1024:
            print(f"[skip] {out_path.name} already exists ({out_path.stat().st_size} bytes)", flush=True)
            continue
        print(f"[submit] {key}", flush=True)
        try:
            job_id = submit(prompt)
            print(f"  job_id={job_id}", flush=True)
            status = poll_until_done(job_id, key)
            save_image(status, out_path)
        except Exception as e:
            print(f"[fail] {key}: {e}", flush=True)
            failures.append((key, str(e)))

    print("\n=== DONE ===")
    if failures:
        print("Failures:")
        for k, err in failures:
            print(f"  {k}: {err}")
        return 1
    print("All 6 scenes generated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
