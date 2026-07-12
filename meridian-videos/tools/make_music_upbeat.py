#!/usr/bin/env python3
"""Upbeat, professional corporate-uplifting bed at a known BPM so scene cuts can
sync to the grid. 120 BPM (beat=0.5s=15 frames @30fps, bar=2s=60 frames).
Layers: soft kick pulse, warm bass, bright plucked arpeggio, airy pad. numpy only."""
import numpy as np, wave, sys

SR = 44100
BPM = 120.0
BEAT = 60.0 / BPM            # 0.5s
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 195.0
N = int(SR * DUR)
t = np.arange(N) / SR
out = np.zeros(N)

def adsr(length, a=0.005, d=0.08, s=0.0, r=0.05):
    n = int(length * SR); env = np.zeros(n)
    ai, di, ri = int(a*SR), int(d*SR), int(r*SR)
    ai = max(1, ai)
    env[:ai] = np.linspace(0, 1, ai)
    env[ai:ai+di] = np.linspace(1, s if s>0 else 0.35, di)
    if s > 0:
        env[ai+di:n-ri] = s
    if ri > 0:
        env[n-ri:] = np.linspace(env[n-ri-1] if n-ri-1>=0 else 0, 0, ri)
    return env

def add(freq, start, length, amp, wave_t="sine", env=None):
    n = int(length * SR); i0 = int(start * SR)
    if i0 >= N: return
    n = min(n, N - i0)
    tt = np.arange(n) / SR
    if wave_t == "sine": w = np.sin(2*np.pi*freq*tt)
    elif wave_t == "tri": w = 2*np.abs(2*(freq*tt - np.floor(freq*tt+0.5)))-1
    else: w = np.sign(np.sin(2*np.pi*freq*tt))
    e = env if env is not None else adsr(n/SR)
    e = e[:n] if len(e) >= n else np.pad(e, (0, n-len(e)))
    out[i0:i0+n] += amp * w * e

# note frequencies
NT = {"D2":73.42,"A2":110.0,"B2":123.47,"G2":98.0,
      "D3":146.83,"F#3":185.0,"A3":220.0,"B3":246.94,"G3":196.0,"E3":164.81,
      "D4":293.66,"F#4":369.99,"A4":440.0,"B4":493.88,"G4":392.0,"E4":329.63,"C#4":277.18}

# I–V–vi–IV in D major: D, A, Bm, G  (1 bar each = 4 beats)
prog = [
    ("D2", ["D3","F#3","A3","D4"]),
    ("A2", ["A2","C#4","E4","A3"]),
    ("B2", ["B2","D4","F#4","B3"]),
    ("G2", ["G2","B3","D4","G3"]),
]
bar = 4 * BEAT
nbars = int(DUR / bar) + 1
for b in range(nbars):
    root_name, chord = prog[b % 4]
    t0 = b * bar
    # kick on each beat (soft low thump)
    for k in range(4):
        add(55, t0 + k*BEAT, 0.14, 0.5, "sine", adsr(0.14, a=0.002, d=0.12, r=0.02))
    # bass on beats 1 and 3
    for k in (0, 2):
        add(NT[root_name], t0 + k*BEAT, BEAT*0.9, 0.32, "tri", adsr(BEAT*0.9, a=0.01, d=0.1, s=0.5, r=0.08))
    # bright plucked arpeggio on 8th notes (after a short intro)
    if b >= 2:
        for j in range(8):
            note = chord[j % len(chord)]
            f = NT[note] * 2  # up an octave, sparkly
            add(f, t0 + j*(BEAT/2), 0.22, 0.12, "tri", adsr(0.22, a=0.003, d=0.16, r=0.03))

# airy sustained pad chord (root+fifth+octave) very soft, whole track
pad = np.zeros(N)
for f, a in [(146.83,0.5),(220.0,0.35),(293.66,0.28),(369.99,0.16)]:
    trem = 1 - 0.25*(0.5-0.5*np.cos(2*np.pi*0.05*t))
    pad += a * trem * np.sin(2*np.pi*f*t)
# gentle lowpass on pad
X = np.fft.rfft(pad); fr = np.fft.rfftfreq(len(pad),1/SR)
pad = np.fft.irfft(X*(1/(1+(fr/900)**2)), n=len(pad))
out += 0.18 * pad / (np.max(np.abs(pad)) or 1)

# master: normalize, gentle build over first 8s, fades
out = out / (np.max(np.abs(out)) or 1) * 0.9
build = np.clip(t/8.0, 0, 1)*0.5 + 0.5
out *= build
fade = int(SR*3)
env = np.ones(N); env[:fade] = np.linspace(0,1,fade); env[-fade:] = np.linspace(1,0,fade)
out *= env
# stereo widen (tiny delay on R)
d = int(0.008*SR)
R = np.concatenate([np.zeros(d), out[:-d]])
st = np.stack([out, R], axis=1) * 0.5
data = (np.clip(st,-1,1)*32767).astype(np.int16)
w = wave.open("public/vo4/music-upbeat.wav","w"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes()); w.close()
print(f"wrote upbeat music {DUR:.0f}s @ {BPM:.0f}bpm (bar={4*BEAT:.1f}s={int(4*BEAT*30)}f)")
