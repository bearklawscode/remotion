#!/usr/bin/env python3
"""Generate Matilda VO clips via ElevenLabs with-timestamps (returns per-char
alignment so we can record exact speech duration). Writes mp3s to public/vo4b/
and prints a durations table. Reads lines from a JSON file: [{id,text},...]."""
import os, sys, json, base64, urllib.request

KEY = os.environ["ELEVENLABS_API_KEY"]
VOICE = "XrExE9yKIg1WjnnlVkGX"  # Matilda
MODEL = "eleven_multilingual_v2"
OUT = "public/vo4b"

lines = json.load(open(sys.argv[1]))
os.makedirs(OUT, exist_ok=True)
durs = {}
for ln in lines:
    body = json.dumps({
        "text": ln["text"],
        "model_id": MODEL,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.0, "use_speaker_boost": True},
    }).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps",
        data=body, headers={"xi-api-key": KEY, "Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req) as r:
        data = json.load(r)
    audio = base64.b64decode(data["audio_base64"])
    open(f"{OUT}/{ln['id']}.mp3", "wb").write(audio)
    al = data.get("alignment") or {}
    ends = al.get("character_end_times_seconds") or [0]
    durs[ln["id"]] = round(ends[-1], 3)
    print(f"{ln['id']:8s} {durs[ln['id']]:6.2f}s  {ln['text'][:60]}")
json.dump(durs, open(f"{OUT}/durs_ending.json", "w"), indent=2)
print("TOTAL chars:", sum(len(l["text"]) for l in lines))
