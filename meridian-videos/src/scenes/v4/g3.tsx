/**
 * VIDEO 4 — Group 3 scenes (product sizzle). Confident, heavily-animated:
 *   FrontDesk — guest recognition card ASSEMBLES on arrival, cursor taps check-in.
 *   Booking   — phone spa-booking flow: tap a slot, tap BOOK, confirmation slides up.
 *   OMFA      — four models snap in with filling depth meters, then a world map of
 *               gold nodes pops across regions while a counter races 590 → 1,000.
 * Light-mode tokens. All motion relative to each scene's own sequence (frame 0).
 */
import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Stage, Snap, Kicker } from "./kit";
import { C, FONT } from "../../theme";
import { Cursor, HighlightRing, TypeText, rmp } from "../../lib/interact";
import { Counter } from "../../lib/motion";

/* ═══════════════════════════════════════════════════════════════════════
   Shared little pieces
   ═══════════════════════════════════════════════════════════════════════ */

/** A pressable button: springs in, dips + ripples at `pressAt`. */
const TapButton: React.FC<{
  x: number; y: number; w: number; h: number; label: string;
  inAt: number; pressAt: number; bg?: string; color?: string; radius?: number;
}> = ({ x, y, w, h, label, inAt, pressAt, bg = C.gold, color = "#fff", radius = 16 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - inAt, fps, config: { damping: 200, stiffness: 170 } });
  const press = frame >= pressAt ? Math.max(0, 1 - Math.abs(frame - pressAt) / 6) : 0;
  const ripple = rmp(frame, pressAt, pressAt + 22);
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h, borderRadius: radius,
      background: bg, opacity: s, transform: `scale(${(0.94 + 0.06 * s) * (1 - press * 0.05)})`,
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
      boxShadow: `0 12px 30px rgba(160,138,79,${0.34 * s})`,
    }}>
      {frame >= pressAt && frame < pressAt + 24 && (
        <div style={{
          position: "absolute", left: "50%", top: "50%", width: w * 1.4 * ripple, height: w * 1.4 * ripple,
          borderRadius: 999, background: "rgba(255,255,255,0.35)", opacity: 0.5 * (1 - ripple),
          transform: "translate(-50%,-50%)",
        }} />
      )}
      <span style={{
        fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, letterSpacing: "0.14em",
        textTransform: "uppercase", color, position: "relative",
      }}>{label}</span>
    </div>
  );
};

/** A pill chip that pops in (spring scale) at `at`. */
const PopChip: React.FC<{
  at: number; children: React.ReactNode; gold?: boolean;
}> = ({ at, children, gold }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 190 } });
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "9px 16px", borderRadius: 999,
      background: gold ? C.gold : "rgba(19,33,60,0.05)",
      border: gold ? "none" : `1px solid ${C.hairline}`,
      color: gold ? "#fff" : C.ink,
      fontFamily: FONT.sans, fontSize: 16, fontWeight: gold ? 800 : 600,
      letterSpacing: gold ? "0.12em" : "0.01em",
      textTransform: gold ? "uppercase" : "none",
      opacity: rmp(frame, at - 3, at + 8),
      transform: `scale(${0.6 + 0.4 * s}) translateY(${(1 - s) * 10}px)`,
      whiteSpace: "nowrap", boxShadow: gold ? "0 8px 22px rgba(160,138,79,0.32)" : "none",
    }}>{children}</span>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   1) FRONT DESK  — paper, 360f — guest recognized on arrival
   ═══════════════════════════════════════════════════════════════════════ */

export const FrontDesk: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card geometry (absolute, full-frame coords so the cursor can target it).
  const CARD = { L: 992, T: 186, W: 792, H: 660 };
  const pad = 48;

  const cardS = spring({ frame: frame - 8, fps, config: { damping: 200, stiffness: 150 } });
  const avatarS = spring({ frame: frame - 26, fps, config: { damping: 13, stiffness: 170 } });

  // Loyalty tier sub-panel + button geometry.
  const tierBox = { x: CARD.L + pad, y: CARD.T + 236, w: CARD.W - pad * 2, h: 98 };
  const btn = { x: CARD.L + pad, y: CARD.T + 466, w: CARD.W - pad * 2, h: 74 };
  const btnCx = btn.x + btn.w / 2;
  const btnCy = btn.y + btn.h / 2;

  const checkedInAt = 236;
  const checkedIn = frame >= checkedInAt;
  const ciS = spring({ frame: frame - checkedInAt, fps, config: { damping: 180, stiffness: 160 } });

  return (
    <Stage bg="#FBF6F0">
      {/* Headline */}
      <div style={{ position: "absolute", left: 110, top: 150, width: 820 }}>
        <Kicker>AT THE FRONT DESK</Kicker>
        <Snap white="RECOGNIZED" gold="ON ARRIVAL." size={84} light />
        <div style={{
          marginTop: 26, maxWidth: 640, fontFamily: FONT.serif, fontStyle: "italic",
          fontSize: 26, color: C.inkSoft, opacity: rmp(frame, 40, 60),
        }}>
          Every guest, known before they reach the desk.
        </div>
      </div>

      {/* Recognition card */}
      <div style={{
        position: "absolute", left: CARD.L, top: CARD.T, width: CARD.W, height: CARD.H,
        borderRadius: 28, background: "#fff",
        boxShadow: "0 30px 80px rgba(19,33,60,0.16)",
        opacity: cardS, transform: `translateY(${(1 - cardS) * 40}px) scale(${0.96 + 0.04 * cardS})`,
        border: `1px solid ${C.hairline}`, overflow: "hidden",
      }}>
        {/* top gold rule */}
        <div style={{ position: "absolute", left: 0, top: 0, height: 4, width: `${cardS * 100}%`, background: C.gold }} />

        {/* Avatar */}
        <div style={{
          position: "absolute", left: pad, top: pad, width: 150, height: 150, borderRadius: 999,
          overflow: "hidden", border: `3px solid ${C.gold}`,
          opacity: rmp(frame, 26, 40), transform: `scale(${0.4 + 0.6 * avatarS})`,
          boxShadow: "0 10px 30px rgba(19,33,60,0.18)",
        }}>
          <Img src={staticFile("assets/images/avatar-vip.png")} style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%",
            transform: "scale(1.18)",
          }} />
        </div>

        {/* Name + arrival + platinum chip */}
        <div style={{ position: "absolute", left: pad + 150 + 30, top: CARD.T > 0 ? pad + 10 : 0 }}>
          <div style={{
            fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.mist, opacity: rmp(frame, 44, 58),
          }}>Arriving now</div>
          <div style={{ height: 48, marginTop: 6, overflow: "hidden" }}>
            <div style={{ fontFamily: FONT.display, fontSize: 46, color: C.ink, lineHeight: 1, transform: `translateY(${(1 - rmp(frame, 46, 66)) * 40}px)` }}>
              <TypeText text="Isabelle Laurent" at={48} cps={22} caret={false} />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <PopChip at={84} gold>◆ MINOR DISCOVERY · PLATINUM</PopChip>
          </div>
        </div>

        {/* Loyalty tier sub-panel (ring pulses here) */}
        <div style={{
          position: "absolute", left: tierBox.x - CARD.L, top: tierBox.y - CARD.T,
          width: tierBox.w, height: tierBox.h, borderRadius: 18,
          background: "rgba(160,138,79,0.06)", border: `1px solid rgba(160,138,79,0.25)`,
          opacity: rmp(frame, 96, 112), display: "flex", alignItems: "center",
          padding: "0 26px", gap: 22,
        }}>
          <div>
            <div style={{ fontFamily: FONT.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold }}>Loyalty tier</div>
            <div style={{ fontFamily: FONT.display, fontSize: 30, color: C.ink, marginTop: 4 }}>Platinum</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <PopChip at={104}>3rd stay</PopChip>
            <PopChip at={118}>Corner suite</PopChip>
            <PopChip at={132}>Still water</PopChip>
          </div>
        </div>

        {/* Begin check-in button OR checked-in state */}
        {!checkedIn && (
          <TapButton x={btn.x - CARD.L} y={btn.y - CARD.T} w={btn.w} h={btn.h}
            label="Begin check-in" inAt={150} pressAt={226} />
        )}
        {checkedIn && (
          <div style={{
            position: "absolute", left: btn.x - CARD.L, top: btn.y - CARD.T, width: btn.w, height: btn.h,
            borderRadius: 16, background: C.success, display: "flex", alignItems: "center", justifyContent: "center",
            gap: 14, opacity: ciS, transform: `translateY(${(1 - ciS) * 22}px)`,
            boxShadow: "0 12px 30px rgba(62,124,89,0.34)",
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24">
              <path d="M5 12 l5 5 l9 -11" fill="none" stroke="#fff" strokeWidth="3.4"
                strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30"
                strokeDashoffset={30 * (1 - Math.min(1, ciS * 1.4))} />
            </svg>
            <span style={{ fontFamily: FONT.sans, fontSize: 21, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>Checked in</span>
          </div>
        )}
      </div>

      {/* Highlight ring pulsing on loyalty tier */}
      {frame >= 150 && frame < 220 && (
        <HighlightRing x={tierBox.x - 6} y={tierBox.y - 6} w={tierBox.w + 12} h={tierBox.h + 12} at={150} label="VIP RECOGNIZED" />
      )}

      {/* Cursor moves to button and taps */}
      {frame < checkedInAt + 8 && (
        <Cursor from={[1720, 980]} to={[btnCx, btnCy]} moveAt={190} tapAt={226} />
      )}
    </Stage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   2) BOOKING — paper, 360f — phone spa-booking flow
   ═══════════════════════════════════════════════════════════════════════ */

export const Booking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone geometry (base, absolute full-frame). Gentle float applied via transform.
  const PW = 400, PH = 812;
  const PX = 1044, PY = 132;
  const bezel = 16;
  const sx = PX + bezel, sw = PW - bezel * 2; // screen left / width
  const spad = 22;
  const float = Math.sin(frame / 20) * 7;

  const phoneS = spring({ frame: frame - 6, fps, config: { damping: 200, stiffness: 140 } });

  // Screen content vertical anchors (relative to screen top = PY+bezel).
  const heroTop = 64, heroH = 208;
  const chipsTop = heroTop + heroH + 152;      // slot chips row
  const chipH = 62;
  const bookTop = chipsTop + chipH + 34;        // BOOK button
  const bookH = 66;

  // Absolute centers for the cursor (ignore small float).
  const leftChipCx = sx + spad + (sw - spad * 2 - 16) / 4;
  const rightChipCx = sx + sw - spad - (sw - spad * 2 - 16) / 4;
  const chipCy = PY + bezel + chipsTop + chipH / 2;
  const bookCx = sx + sw / 2;
  const bookCy = PY + bezel + bookTop + bookH / 2;

  const selectAt = 96;           // left slot selected
  const bookPressAt = 196;       // BOOK pressed
  const toastAt = 204;
  const toastS = spring({ frame: frame - toastAt, fps, config: { damping: 180, stiffness: 150 } });

  const slot = (label: string, sub: string, left: number, selected: boolean) => (
    <div style={{
      position: "absolute", left, top: chipsTop, width: (sw - spad * 2 - 16) / 2, height: chipH,
      borderRadius: 14, display: "flex", flexDirection: "column", justifyContent: "center",
      paddingLeft: 16,
      background: selected ? "rgba(160,138,79,0.12)" : "#fff",
      border: `1.5px solid ${selected ? C.gold : C.hairline}`,
      transition: "none",
    }}>
      <div style={{ fontFamily: FONT.sans, fontSize: 17, fontWeight: 800, color: selected ? C.gold : C.ink }}>{label}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 12, color: C.mist }}>{sub}</div>
      {selected && <div style={{ position: "absolute", right: 12, top: 12, width: 16, height: 16, borderRadius: 999, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="10" height="10" viewBox="0 0 24 24"><path d="M5 12 l5 5 l9 -11" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>}
    </div>
  );

  const leftSelected = frame >= selectAt;

  return (
    <Stage bg="#FBF6F0">
      {/* Headline */}
      <div style={{ position: "absolute", left: 110, top: 190 }}>
        <Kicker>THE GUEST SIDE</Kicker>
        <Snap white="ONE SEAMLESS" gold="MINOR." size={104} light />
        <div style={{
          marginTop: 30, maxWidth: 560, fontFamily: FONT.serif, fontStyle: "italic",
          fontSize: 27, color: C.inkSoft, opacity: rmp(frame, 44, 66),
        }}>
          Discover, book and confirm — inside one app, across every brand.
        </div>
        <div style={{ marginTop: 34, display: "flex", gap: 12, opacity: rmp(frame, 60, 80) }}>
          <PopChip at={62}>Anantara</PopChip>
          <PopChip at={72}>Avani</PopChip>
          <PopChip at={82}>Tivoli</PopChip>
        </div>
      </div>

      {/* Phone */}
      <div style={{
        position: "absolute", left: PX, top: PY, width: PW, height: PH,
        transform: `translateY(${float}px) scale(${0.94 + 0.06 * phoneS})`,
        opacity: phoneS,
      }}>
        {/* Bezel */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 52, background: C.ink,
          boxShadow: "0 40px 90px rgba(19,33,60,0.34)", padding: bezel,
        }}>
          {/* Screen */}
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 40, background: C.paper, overflow: "hidden" }}>
            {/* notch */}
            <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 118, height: 26, borderRadius: 999, background: C.ink, zIndex: 5 }} />

            {/* Header */}
            <div style={{ position: "absolute", top: 26, left: spad, right: spad, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: FONT.display, fontSize: 17, letterSpacing: "0.16em", color: C.ink }}>MINOR HOTELS</span>
              <span style={{ fontFamily: FONT.sans, fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: "0.16em" }}>SPA</span>
            </div>

            {/* Hero image */}
            <div style={{ position: "absolute", top: heroTop, left: spad, right: spad, height: heroH, borderRadius: 20, overflow: "hidden", boxShadow: "0 10px 26px rgba(19,33,60,0.16)" }}>
              <Img src={staticFile("assets/images/property-anantara-ubud.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(19,33,60,0.55))" }} />
              <div style={{ position: "absolute", left: 16, bottom: 12, fontFamily: FONT.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff" }}>Anantara Spa · Ubud</div>
            </div>

            {/* Title + price */}
            <div style={{ position: "absolute", top: heroTop + heroH + 16, left: spad, right: spad }}>
              <div style={{ fontFamily: FONT.display, fontSize: 26, color: C.ink, lineHeight: 1.02 }}>Thai Heritage Massage</div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 800, color: C.gold }}>THB 2,200</span>
                <span style={{ width: 4, height: 4, borderRadius: 999, background: C.mist }} />
                <span style={{ fontFamily: FONT.sans, fontSize: 15, color: C.inkSoft }}>60 minutes</span>
              </div>
            </div>

            {/* Slot label */}
            <div style={{ position: "absolute", top: chipsTop - 26, left: spad, fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mist }}>Choose a time</div>

            {/* Two slots */}
            {slot("Today · 4:00", "with Ploy", sx - PX + spad - bezel, leftSelected)}
            {slot("Tomorrow · 10:30", "with Mai", sx - PX + spad + (sw - spad * 2 - 16) / 2 + 16 - bezel, false)}

            {/* BOOK button */}
            <TapButton x={sx - PX + spad - bezel} y={bookTop} w={sw - spad * 2} h={bookH}
              label="Book experience" inAt={20} pressAt={bookPressAt} radius={16} />

            {/* Confirmation toast */}
            {frame >= toastAt && (
              <div style={{
                position: "absolute", left: spad - bezel + (sx - PX), right: spad, bottom: 26,
                borderRadius: 16, background: C.success, padding: "14px 18px",
                display: "flex", alignItems: "center", gap: 12,
                opacity: toastS, transform: `translateY(${(1 - toastS) * 40}px)`,
                boxShadow: "0 16px 36px rgba(62,124,89,0.4)",
              }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24"><path d="M5 12 l5 5 l9 -11" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={30 * (1 - Math.min(1, toastS * 1.4))} /></svg>
                </div>
                <div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 16, fontWeight: 800, color: "#fff" }}>Booked</div>
                  <div style={{ fontFamily: FONT.sans, fontSize: 12, color: "rgba(255,255,255,0.85)" }}>Confirmation sent</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cursor A → taps the left slot */}
      {frame < 150 && (
        <Cursor from={[1600, 900]} to={[leftChipCx, chipCy]} moveAt={62} tapAt={selectAt} />
      )}
      {/* Cursor B → moves to BOOK and presses */}
      {frame >= 150 && (
        <Cursor from={[leftChipCx, chipCy]} to={[bookCx, bookCy]} moveAt={152} tapAt={bookPressAt} />
      )}
    </Stage>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   3) OMFA — navy, 480f — any model, live in days + world-map growth
   ═══════════════════════════════════════════════════════════════════════ */

const OMFA_MODES = [
  { letter: "O", name: "OWNED", sub: "Full Integration", depth: 4 },
  { letter: "M", name: "MANAGED", sub: "Deep Integration", depth: 3 },
  { letter: "F", name: "FRANCHISE", sub: "Portal First", depth: 2 },
  { letter: "A", name: "AFFILIATE", sub: "Portal Only", depth: 1 },
];

// Impressionistic dot-grid world (38 cols × 15 rows).
const DOT_MAP = [
  "    ###  ##                           ",
  "  ##########         #### #######     ",
  " ############       ################  ",
  "  ##########       ################## ",
  "   #######         ################## ",
  "    ####  #         ########  ######  ",
  "     ##  ####       ########   ####   ",
  "         ######      ######     ##    ",
  "      #########      ######    ##     ",
  "       ########       ####   #####    ",
  "        ######        ###   ### ##    ",
  "         ####         ###    ## #     ",
  "          ###          #        ##    ",
  "          ##                     #    ",
  "           #                          ",
];

// Gold nodes with an ACCELERATING cascade (delays bunch up toward the end).
const GOLD_NODES: Array<{ col: number; row: number; at: number }> = [
  { col: 7, row: 3, at: 214 },
  { col: 21, row: 3, at: 236 },
  { col: 30, row: 4, at: 256 },
  { col: 12, row: 9, at: 272 },
  { col: 23, row: 8, at: 286 },
  { col: 33, row: 11, at: 298 },
  { col: 18, row: 2, at: 308 },
  { col: 27, row: 6, at: 316 },
  { col: 9, row: 6, at: 322 },
  { col: 31, row: 9, at: 327 },
  { col: 25, row: 3, at: 331 },
];

const MapNode: React.FC<{ cx: number; cy: number; at: number }> = ({ cx, cy, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 11, stiffness: 210 } });
  const ring = rmp(frame, at, at + 20);
  const pulse = 0.5 + 0.5 * Math.sin((frame - at) / 7);
  return (
    <g opacity={rmp(frame, at - 2, at + 4)}>
      {frame >= at && frame < at + 24 && (
        <circle cx={cx} cy={cy} r={18 * ring} fill="none" stroke={C.gold} strokeWidth={2} opacity={1 - ring} />
      )}
      <circle cx={cx} cy={cy} r={13} fill={C.gold} opacity={0.16 * s} />
      <circle cx={cx} cy={cy} r={5 + pulse * 1.5} fill={C.goldSoft} opacity={0.5 * s} />
      <circle cx={cx} cy={cy} r={3.6} fill={C.gold} opacity={s} transform={`scale(${0.4 + 0.6 * s})`} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
    </g>
  );
};

const DepthMeter: React.FC<{ depth: number; at: number }> = ({ depth, at }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[0, 1, 2, 3].map((i) => {
        const active = i < depth;
        const fillAt = at + i * 7;
        const p = active ? rmp(frame, fillAt, fillAt + 16) : 0;
        return (
          <div key={i} style={{ width: 40, height: 8, borderRadius: 8, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
            <div style={{ width: `${p * 100}%`, height: "100%", borderRadius: 8, background: C.gold, boxShadow: p > 0 ? `0 0 10px rgba(160,138,79,0.6)` : "none" }} />
          </div>
        );
      })}
    </div>
  );
};

const OmfaColumn: React.FC<{ mode: (typeof OMFA_MODES)[number]; idx: number }> = ({ mode, idx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = 30 + idx * 16;
  const s = spring({ frame: frame - at, fps, config: { damping: 13, stiffness: 180 } });
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start",
      opacity: rmp(frame, at - 3, at + 8), transform: `translateY(${(1 - s) * 44}px) scale(${0.9 + 0.1 * s})`,
      padding: "0 8px",
    }}>
      <div style={{ fontFamily: FONT.display, fontSize: 128, lineHeight: 0.9, color: "#fff" }}>{mode.letter}</div>
      <div style={{ marginTop: 10, fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, letterSpacing: "0.06em", color: "#fff" }}>{mode.name}</div>
      <div style={{ marginTop: 4, marginBottom: 18, fontFamily: FONT.sans, fontSize: 15, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.goldSoft }}>{mode.sub}</div>
      <DepthMeter depth={mode.depth} at={at + 20} />
    </div>
  );
};

export const OMFA: React.FC = () => {
  const frame = useCurrentFrame();

  const spacing = 26;
  const mapW = 38 * spacing;
  const mapH = DOT_MAP.length * spacing;
  const growthIn = rmp(frame, 180, 205);

  return (
    <Stage bg="#13213C">
      {/* Headline */}
      <div style={{ position: "absolute", left: 110, top: 72 }}>
        <Kicker>BUILT TO GROW</Kicker>
        <Snap white="ANY MODEL." gold="LIVE IN DAYS." size={92} />
      </div>

      {/* OMFA columns */}
      <div style={{ position: "absolute", left: 110, right: 110, top: 300, display: "flex", gap: 24 }}>
        {OMFA_MODES.map((m, i) => <OmfaColumn key={m.letter} mode={m} idx={i} />)}
      </div>

      {/* Growth beat: world map (left) + counter panel (right) */}
      <div style={{ position: "absolute", left: 110, top: 604, opacity: growthIn, transform: `translateY(${(1 - growthIn) * 30}px)` }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.goldSoft, marginBottom: 14 }}>The network, expanding</div>
        <svg width={mapW} height={mapH} viewBox={`0 0 ${mapW} ${mapH}`}>
          {DOT_MAP.flatMap((row, y) =>
            row.split("").map((ch, x) => ch === "#" ? (
              <circle key={`${x}-${y}`} cx={x * spacing + spacing / 2} cy={y * spacing + spacing / 2} r={3.4}
                fill="#fff" opacity={0.14 * rmp(frame, 182, 210)} />
            ) : null)
          )}
          {GOLD_NODES.map((n, i) => (
            <MapNode key={i} cx={n.col * spacing + spacing / 2} cy={n.row * spacing + spacing / 2} at={n.at} />
          ))}
        </svg>
      </div>

      {/* Counter panel */}
      <div style={{
        position: "absolute", left: 1230, top: 636, width: 640,
        opacity: rmp(frame, 220, 250), transform: `translateY(${(1 - rmp(frame, 220, 250)) * 24}px)`,
      }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: C.goldSoft }}>Properties</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginTop: 12 }}>
          <span style={{ fontFamily: FONT.display, fontSize: 80, lineHeight: 0.9, color: "rgba(255,255,255,0.45)" }}>590</span>
          <span style={{ fontFamily: FONT.display, fontSize: 46, color: C.goldSoft, marginBottom: 12 }}>→</span>
          <Counter to={1000} from={590} delay={252} durationFrames={90}
            format={(n) => Math.round(n).toLocaleString()}
            style={{ fontFamily: FONT.display, fontSize: 112, lineHeight: 0.82, color: C.gold, textShadow: "0 0 40px rgba(160,138,79,0.4)" }} />
        </div>
        <div style={{ marginTop: 6, fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>By 2029</div>

        <div style={{
          marginTop: 30, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 22px",
          borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(160,138,79,0.32)",
          opacity: rmp(frame, 340, 366),
        }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: C.success, boxShadow: `0 0 12px ${C.success}` }} />
          <span style={{ fontFamily: FONT.sans, fontSize: 18, fontWeight: 700, color: "#fff" }}>Keep your PMS. <span style={{ color: C.goldSoft }}>Live day one.</span></span>
        </div>
      </div>
    </Stage>
  );
};
