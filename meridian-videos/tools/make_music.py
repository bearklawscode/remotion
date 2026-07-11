#!/usr/bin/env python3
"""Synthesize a soft, warm ambient music bed for Video 3 (very mild — sits under VO).
Writes a WAV; encode to AAC with Remotion's ffmpeg afterwards. Deterministic (no RNG
seed dependence beyond fixed seed) so re-runs are identical."""
import numpy as np, wave, struct, sys

SR = 44100
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 430.0
N = int(SR * DUR)
t = np.arange(N) / SR

# Warm Dmaj voicing, lower partials louder (navy, calm).
partials = [
    (73.42, 0.55),   # D2
    (110.00, 0.42),  # A2
    (146.83, 0.50),  # D3
    (220.00, 0.30),  # A3
    (293.66, 0.24),  # D4
    (369.99, 0.16),  # F#4
    (440.00, 0.08),  # A4 shimmer
]

def voice(freq, amp, lfo_hz, lfo_depth, detune=0.0):
    # slow tremolo per partial for gentle movement
    trem = 1.0 - lfo_depth * (0.5 - 0.5 * np.cos(2 * np.pi * lfo_hz * t))
    return amp * trem * np.sin(2 * np.pi * (freq + detune) * t)

rng = np.random.default_rng(7)
left = np.zeros(N, dtype=np.float64)
right = np.zeros(N, dtype=np.float64)
for i, (f, a) in enumerate(partials):
    lfo = 0.04 + 0.02 * i
    left += voice(f, a, lfo, 0.35, detune=-0.15)
    right += voice(f, a, lfo * 1.07, 0.35, detune=+0.15)

# global slow swell (breathing) ~0.025 Hz
swell = 0.78 + 0.22 * (0.5 - 0.5 * np.cos(2 * np.pi * 0.025 * t))
left *= swell
right *= swell

# gentle one-pole lowpass for warmth (remove any brightness)
def lowpass(x, cutoff=700.0):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y

# vectorized lowpass via lfilter-like cumulative is slow in python loop for 19M samples;
# use a cheap FFT-based soft rolloff instead.
def soft_lowpass_fft(x, cutoff=750.0):
    X = np.fft.rfft(x)
    freqs = np.fft.rfftfreq(len(x), 1 / SR)
    roll = 1.0 / (1.0 + (freqs / cutoff) ** 2)  # -6dB/oct-ish
    return np.fft.irfft(X * roll, n=len(x))

left = soft_lowpass_fft(left)
right = soft_lowpass_fft(right)

# normalize to gentle peak, then fades
stereo = np.stack([left, right], axis=1)
peak = np.max(np.abs(stereo)) or 1.0
stereo = stereo / peak * 0.22  # already quiet; Remotion lowers further

fade = int(SR * 4.0)
env = np.ones(N)
env[:fade] = np.linspace(0, 1, fade)
env[-fade:] = np.linspace(1, 0, fade)
stereo *= env[:, None]

# write 16-bit WAV
data = (np.clip(stereo, -1, 1) * 32767).astype(np.int16)
with wave.open("public/vo3/music-bed.wav", "w") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(data.tobytes())
print(f"wrote public/vo3/music-bed.wav  {DUR:.0f}s")
