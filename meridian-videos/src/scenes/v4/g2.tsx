/**
 * VIDEO 4 — product-showcase scenes 5–7 (the confident, heavily-animated core).
 *   Dashboard  — "ONE VIEW. THE WHOLE PROPERTY."  guided tour of the command center
 *   AIAction   — "ONE ASK. DONE EVERYWHERE."       one command fans out across systems
 *   Mobile     — "OPERATIONS, IN YOUR POCKET."     the phone, alive in the hand
 *
 * Mockups are STATIC React components; motion is added entirely via animated
 * interaction overlays (cursor taps + ripples, pulsing highlight rings, incoming
 * notifications, counters, cascading cards, pressing buttons, motivated camera
 * pushes that FOLLOW the interaction). Never a dead hold.
 */
import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { Check, Hourglass, Sparkles, Wrench, BellRing, Send } from "lucide-react";
import { Stage, Snap, Kicker } from "./kit";
import {
  Cursor,
  Notification,
  HighlightRing,
  TypeText,
  Toggle,
  rmp,
  EOUT,
} from "../../lib/interact";
import { Counter } from "../../lib/motion";
import { C, FONT } from "../../theme";
import { A } from "../../screens/asset";
import { MeridianDashboard } from "../../screens/MeridianDashboard";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const kf = (frame: number, xs: number[], ys: number[]) =>
  interpolate(frame, xs, ys, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EOUT });

/* ══════════════════════════════════════════════════════════════════════════
 * A multi-waypoint cursor that glides continuously and taps (ripple) at stops.
 * Coordinates are in the LOCAL space of the nearest positioned ancestor, so it
 * can ride inside a scaled "screen world".
 * ════════════════════════════════════════════════════════════════════════ */
const TourCursor: React.FC<{
  stops: { x: number; y: number; at: number; tap?: boolean }[];
  color?: string;
}> = ({ stops, color = C.ink }) => {
  const frame = useCurrentFrame();
  let x = stops[0].x,
    y = stops[0].y;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i],
      b = stops[i + 1];
    if (frame >= a.at) {
      const t = interpolate(frame, [a.at, b.at], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EOUT,
      });
      x = lerp(a.x, b.x, t);
      y = lerp(a.y, b.y, t);
    }
  }
  return (
    <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${x}px, ${y}px)`, zIndex: 60 }}>
      {stops
        .filter((s) => s.tap)
        .map((s, i) => {
          const r = rmp(frame, s.at, s.at + 22);
          if (frame < s.at || frame > s.at + 24) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 2,
                top: 2,
                width: 60 * r,
                height: 60 * r,
                borderRadius: 999,
                border: `3px solid ${C.gold}`,
                opacity: 1 - r,
                transform: "translate(-50%,-50%)",
              }}
            />
          );
        })}
      {(() => {
        const nearTap = stops.some((s) => s.tap && frame >= s.at && frame < s.at + 6);
        const dip = nearTap ? 0.16 : 0;
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ transform: `scale(${1 - dip})`, filter: "drop-shadow(0 5px 10px rgba(19,33,60,0.4))" }}>
            <path d="M4 2 L20 12 L13 13 L17 21 L14 22 L10 14 L4 18 Z" fill="#fff" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        );
      })()}
    </div>
  );
};

/* A highlight ring that fades in at `at` and out after `dur` (sequential focus). */
const SeqRing: React.FC<{ x: number; y: number; w: number; h: number; at: number; dur?: number; label?: string }> = ({ x, y, w, h, at, dur = 150, label }) => {
  const frame = useCurrentFrame();
  const out = rmp(frame, at + dur, at + dur + 18);
  if (frame < at - 4 || out >= 1) return null;
  return (
    <div style={{ opacity: 1 - out }}>
      <HighlightRing x={x} y={y} w={w} h={h} at={at} label={label} />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
 * SCENE 5 — DASHBOARD · "ONE VIEW. THE WHOLE PROPERTY."
 * ════════════════════════════════════════════════════════════════════════ */
export const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // world placement (dashboard is 1920×1080; scaled + centered, title band on top)
  const K = 0.78;
  const OX = (1920 - 1920 * K) / 2; // 211.2
  const OY = 202;
  const rev = spring({ frame: frame - 24, fps, config: { damping: 200, stiffness: 90 } });

  // dashboard-internal → frame coords (for the motivated camera push)
  const f = (dx: number, dy: number): [number, number] => [OX + dx * K, OY + dy * K];
  const [r1x, r1y] = f(474, 158);
  const [r2x, r2y] = f(1219, 470);
  const [r3x, r3y] = f(1694, 470);

  // compressed, punchy tour (fits a 330f slot)
  const times = [0, 30, 60, 130, 150, 210, 230, 300, 315, 330];
  const cx = kf(frame, times, [960, 960, r1x, r1x, r2x, r2x, r3x, r3x, 960, 960]);
  const cy = kf(frame, times, [540, 540, r1y, r1y, r2y, r2y, r3y, r3y, 540, 540]);
  const pz = kf(frame, times, [1, 1, 1.1, 1.1, 1.11, 1.11, 1.11, 1.11, 1, 1]);

  return (
    <Stage bg={C.ink}>
      {/* title band */}
      <div style={{ position: "absolute", left: 82, top: 40, width: 1200 }}>
        <Kicker delay={0}>The Command Center</Kicker>
        <Snap white="ONE VIEW." gold="THE WHOLE PROPERTY." size={62} delay={6} />
      </div>

      {/* motivated camera push (zooms around the active region) */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${cx}px,${cy}px) scale(${pz}) translate(${-cx}px,${-cy}px)`, transformOrigin: "0 0" }}>
        <div style={{ position: "absolute", left: OX, top: OY, width: 1920, height: 1080, transform: `scale(${K})`, transformOrigin: "top left" }}>
          {/* the mockup (slides up on reveal) */}
          <div style={{ transform: `translateY(${(1 - rev) * 90}px)`, opacity: rev, borderRadius: 22, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.45)" }}>
            <MeridianDashboard />
          </div>

          {/* sequential highlight rings (dashboard-internal coords) */}
          <SeqRing x={276} y={90} w={396} h={132} at={58} dur={72} label="RevPAR +8.2%" />
          <SeqRing x={952} y={244} w={528} h={476} at={140} dur={70} label="Tonight's VIPs" />
          <SeqRing x={1496} y={244} w={392} h={476} at={228} dur={80} label="Live operations" />

          {/* a live counter riding on the hero KPI */}
          {frame >= 62 && frame < 150 && (
            <div style={{ position: "absolute", left: 690, top: 150, opacity: rmp(frame, 62, 78) * (1 - rmp(frame, 136, 150)), display: "flex", alignItems: "center", gap: 10, background: C.gold, color: "#fff", padding: "10px 18px", borderRadius: 999, boxShadow: "0 14px 40px rgba(160,138,79,0.5)", fontFamily: FONT.sans, fontWeight: 800, fontSize: 26 }}>
              RevPAR ▲ <Counter to={8.2} from={0} delay={66} durationFrames={36} decimals={1} suffix="%" />
            </div>
          )}

          {/* guided cursor tour */}
          <TourCursor
            stops={[
              { x: 900, y: 560, at: 24 },
              { x: 470, y: 158, at: 60, tap: true },
              { x: 1180, y: 460, at: 140, tap: true },
              { x: 1690, y: 460, at: 228, tap: true },
              { x: 1690, y: 460, at: 305 },
            ]}
          />
        </div>
      </div>

      {/* incoming toast (frame coords, top-right) */}
      {frame >= 150 && (
        <Notification
          title="New VIP arrival"
          body="Isabelle Laurent · Royal Suite · 14:30"
          at={152}
          x={1476}
          y={52}
          w={392}
          icon={<Sparkles size={20} />}
        />
      )}
    </Stage>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
 * SCENE 6 — AI ACTION · "ONE ASK. DONE EVERYWHERE."
 * Built card-by-card with the interact kit for tight control.
 * ════════════════════════════════════════════════════════════════════════ */

const SourceChip: React.FC<{ label: string; src?: string }> = ({ label, src }) => (
  <span style={{ display: "inline-flex", height: 30, alignItems: "center", gap: 7, borderRadius: 999, border: `1px solid ${C.hairline}`, background: "#fff", padding: "0 12px" }}>
    {src && <img src={A(src)} alt={label} style={{ height: 13, maxWidth: 56, objectFit: "contain" }} />}
    <span style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.inkSoft }}>{label}</span>
  </span>
);

const StatusBadge: React.FC<{ done: boolean; doneAt: number }> = ({ done, doneAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - doneAt, fps, config: { damping: 200, stiffness: 190 } });
  const draw = done ? s : 0;
  return (
    <span style={{ display: "flex", height: 42, width: 42, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: 999, background: done ? `rgba(62,124,89,${0.12 + 0.06 * s})` : "rgba(160,138,79,0.12)", color: done ? C.success : C.gold, transform: `scale(${done ? 0.85 + 0.15 * s : 1})` }}>
      {done ? (
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M5 12 l5 5 l9 -11" fill="none" stroke={C.success} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={30 * (1 - draw)} />
        </svg>
      ) : (
        <Hourglass size={17} strokeWidth={2.5} />
      )}
    </span>
  );
};

const ResultCard: React.FC<{
  at: number;
  doneAt: number;
  title: string;
  detail: string;
  doneDetail?: string;
  chip: { label: string; src?: string };
  children?: React.ReactNode;
}> = ({ at, doneAt, title, detail, doneDetail, chip, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 190, stiffness: 150 } });
  const done = frame >= doneAt;
  return (
    <div style={{ opacity: rmp(frame, at - 4, at + 10), transform: `translateY(${(1 - s) * 46}px) scale(${0.94 + 0.06 * s})`, background: "#fff", borderRadius: 20, boxShadow: done ? "0 10px 34px rgba(62,124,89,0.18)" : "0 10px 34px rgba(19,33,60,0.12)", border: `1px solid ${done ? "rgba(62,124,89,0.28)" : C.hairline}`, padding: 22, display: "flex", gap: 16, alignItems: "flex-start" }}>
      <StatusBadge done={done} doneAt={doneAt} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: C.ink }}>{title}</span>
          <SourceChip {...chip} />
        </div>
        <div style={{ marginTop: 4, fontFamily: FONT.sans, fontSize: 15, fontWeight: 600, color: done && doneDetail ? C.success : C.inkSoft }}>
          {done && doneDetail ? doneDetail : detail}
        </div>
        {children}
      </div>
    </div>
  );
};

export const AIAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const TAP = 300;
  const panelL = 470;
  const panelW = 980;

  // approve button (frame coords) for cursor target
  const btnX = panelL + 78;
  const btnY = 812;

  const press = frame >= TAP && frame < TAP + 8 ? Math.max(0, 1 - Math.abs(frame - TAP) / 8) : 0;
  const sent = frame >= TAP;
  const sentS = spring({ frame: frame - TAP, fps, config: { damping: 200, stiffness: 180 } });

  return (
    <Stage bg={C.ink}>
      <div style={{ position: "absolute", left: 82, top: 40, width: 1300 }}>
        <Kicker delay={0}>Agentic AI</Kicker>
        <Snap white="ONE ASK." gold="DONE EVERYWHERE." size={62} delay={6} />
      </div>

      {/* command bar — the ask, typing out */}
      <div style={{ position: "absolute", left: panelL, top: 196, width: panelW, opacity: rmp(frame, 14, 30) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 999, padding: "16px 22px", boxShadow: "0 16px 44px rgba(0,0,0,0.28)" }}>
          <Sparkles size={22} color={C.gold} style={{ flexShrink: 0 }} />
          <span style={{ fontFamily: FONT.sans, fontSize: 21, fontWeight: 600, color: C.ink }}>
            <TypeText text="Guest in 203 says the AC isn't cooling — handle it." at={22} cps={30} />
          </span>
        </div>
      </div>

      {/* three result cards cascade in */}
      <div style={{ position: "absolute", left: panelL, top: 300, width: panelW, display: "flex", flexDirection: "column", gap: 16 }}>
        <ResultCard at={70} doneAt={120} title="Work order created" detail="#ENG-2214 · High priority · Room 203" chip={{ label: "Jira", src: "/assets/tech-stack/jira.svg" }} />
        <ResultCard at={100} doneAt={160} title="Engineering notified" detail="K. Anand on shift · ETA 8 min" chip={{ label: "Teams", src: "/assets/tech-stack/teams.svg" }} />
        <ResultCard
          at={130}
          doneAt={TAP}
          title="Guest message drafted"
          detail="Awaiting your approval"
          doneDetail="Sent to guest · 21:14"
          chip={{ label: "Guest Messaging" }}
        >
          <blockquote style={{ margin: "14px 0 0", borderLeft: `3px solid rgba(160,138,79,0.55)`, background: C.paper, padding: "12px 18px", borderRadius: "0 12px 12px 0", fontFamily: FONT.serif, fontStyle: "italic", fontSize: 16, lineHeight: 1.5, color: C.inkSoft }}>
            “Our engineer is on the way and will be with you within ten minutes. Please enjoy a drink at the Riverside Lounge, on us, while we make it right.”
          </blockquote>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
            {!sent ? (
              <span style={{ display: "inline-flex", height: 44, alignItems: "center", gap: 8, background: C.gold, color: "#fff", padding: "0 26px", borderRadius: 999, fontFamily: FONT.sans, fontSize: 13, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", transform: `scale(${1 - press * 0.08})`, boxShadow: "0 8px 22px rgba(160,138,79,0.4)" }}>
                Approve &amp; send
              </span>
            ) : (
              <span style={{ display: "inline-flex", height: 44, alignItems: "center", gap: 9, background: "rgba(62,124,89,0.12)", color: C.success, padding: "0 26px", borderRadius: 999, fontFamily: FONT.sans, fontSize: 13, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", opacity: sentS, transform: `scale(${0.9 + 0.1 * sentS})` }}>
                <Send size={15} strokeWidth={2.5} /> Sent
              </span>
            )}
            {!sent && (
              <span style={{ display: "inline-flex", height: 44, alignItems: "center", border: `1px solid ${C.hairline}`, background: "#fff", color: C.inkSoft, padding: "0 24px", borderRadius: 999, fontFamily: FONT.sans, fontSize: 13, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Edit
              </span>
            )}
          </div>
        </ResultCard>
      </div>

      {/* cursor moves to Approve & send, taps */}
      <Cursor from={[panelL + 620, 940]} to={[btnX, btnY]} moveAt={258} tapAt={TAP} />

      {/* closing caption */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, textAlign: "center", opacity: rmp(frame, 330, 350), transform: `translateY(${(1 - rmp(frame, 330, 350)) * 14}px)` }}>
        <span style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, letterSpacing: "0.04em", color: "#fff" }}>
          Three systems. <span style={{ color: C.gold }}>One approval. Zero tabs.</span>
        </span>
      </div>
    </Stage>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
 * SCENE 7 — MOBILE · "OPERATIONS, IN YOUR POCKET."
 * A phone built inline (navy bezel), floating gently, with sequential on-screen
 * actions: a room flips to Inspected, a VIP push slides in, a thumb taps Confirm.
 * ════════════════════════════════════════════════════════════════════════ */

const RoomRow: React.FC<{ room: string; status: string; tone: "done" | "progress" | "due"; flipAt?: number }> = ({ room, status, tone, flipAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flipped = flipAt !== undefined && frame >= flipAt;
  const s = spring({ frame: frame - (flipAt ?? 0), fps, config: { damping: 200, stiffness: 200 } });
  const t = flipped ? "done" : tone;
  const label = flipped ? "Inspected" : status;
  const colors: Record<string, [string, string]> = {
    done: ["rgba(62,124,89,0.12)", C.success],
    progress: ["rgba(150,207,212,0.28)", C.inkSoft],
    due: ["rgba(180,86,47,0.12)", C.alert],
  };
  const [bg, fg] = colors[t];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 18, padding: "14px 16px", boxShadow: "0 6px 18px rgba(19,33,60,0.06)", border: `1px solid ${C.hairline}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ display: "flex", height: 38, width: 38, alignItems: "center", justifyContent: "center", borderRadius: 12, background: "rgba(19,33,60,0.05)", fontFamily: FONT.display, fontSize: 15, color: C.ink }}>{room}</span>
        <span style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 700, color: C.ink }}>Room {room}</span>
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: bg, color: fg, padding: "6px 12px", borderRadius: 999, fontFamily: FONT.sans, fontSize: 12, fontWeight: 800, transform: flipped ? `scale(${0.9 + 0.1 * s})` : undefined }}>
        {label}
        {flipped && (
          <svg width="12" height="12" viewBox="0 0 24 24"><path d="M5 12 l5 5 l9 -11" fill="none" stroke={C.success} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={30 * (1 - s)} /></svg>
        )}
      </span>
    </div>
  );
};

export const Mobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const FLIP = 74;
  const PUSH = 150;
  const TAP = 250;
  const CONFIRM = TAP; // toggle + confirm land on tap

  // phone geometry
  const bezelW = 384;
  const screenW = 356;
  const screenH = 748;
  const phoneL = 470;
  const phoneT = 150;

  const enter = spring({ frame: frame - 24, fps, config: { damping: 200, stiffness: 90 } });
  const floatY = Math.sin(frame / 26) * 9;
  const floatR = Math.sin(frame / 34) * 0.5;

  const confirmed = frame >= CONFIRM;
  const confS = spring({ frame: frame - CONFIRM, fps, config: { damping: 200, stiffness: 180 } });
  const press = frame >= TAP && frame < TAP + 8 ? Math.max(0, 1 - Math.abs(frame - TAP) / 8) : 0;

  // thumb/cursor target = Confirm button center, in phone-screen local coords
  const btnLocalX = 30;
  const btnLocalY = 636;

  return (
    <Stage bg={C.paper}>
      <div style={{ position: "absolute", left: 1060, top: 300, width: 760 }}>
        <Kicker delay={0}>In Every Hand</Kicker>
        <Snap white="OPERATIONS," gold="IN YOUR POCKET." size={78} delay={6} light />
        <div style={{ marginTop: 26, fontFamily: FONT.serif, fontStyle: "italic", fontSize: 26, color: C.inkSoft, opacity: rmp(frame, 40, 60) }}>
          The whole operation — a tap away, wherever the work is.
        </div>
      </div>

      {/* PHONE — floats gently, all on-screen action rides inside */}
      <div style={{ position: "absolute", left: phoneL, top: phoneT, opacity: enter, transform: `translateY(${(1 - enter) * 60 + floatY}px) rotate(${floatR}deg)` }}>
        <div style={{ width: bezelW, background: C.ink, borderRadius: 52, padding: 14, boxShadow: "0 50px 120px rgba(19,33,60,0.4)" }}>
          <div style={{ position: "relative", width: screenW, height: screenH, background: C.paper, borderRadius: 40, overflow: "hidden" }}>
            {/* notch */}
            <div style={{ position: "absolute", left: "50%", top: 12, width: 108, height: 22, transform: "translateX(-50%)", background: C.ink, borderRadius: 999, zIndex: 20 }} />

            {/* header */}
            <div style={{ background: "#fff", padding: "44px 22px 16px", boxShadow: "0 4px 16px rgba(19,33,60,0.05)", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: FONT.display, fontSize: 16, letterSpacing: "0.2em", color: C.ink }}>MERIDIAN</div>
                <div style={{ height: 2, width: 46, background: C.gold, marginTop: 4 }} />
              </div>
              <span style={{ fontFamily: FONT.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.mist }}>Housekeeping · Fl 2</span>
            </div>

            {/* room list */}
            <div style={{ padding: "20px 18px 0" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mist, paddingLeft: 2 }}>Room Status</div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 11 }}>
                <RoomRow room="203" status="In progress" tone="progress" flipAt={FLIP} />
                <RoomRow room="204" status="In progress" tone="progress" />
                <RoomRow room="207" status="Due out" tone="due" />
              </div>
            </div>

            {/* VIP push notification — slides in over the screen */}
            {frame >= PUSH - 4 && (
              <div style={{ position: "absolute", left: 18, right: 18, top: 470, opacity: rmp(frame, PUSH, PUSH + 12), transform: `translateY(${(1 - rmp(frame, PUSH, PUSH + 14)) * -30}px)`, background: "#fff", borderRadius: 24, padding: 18, boxShadow: "0 24px 60px rgba(19,33,60,0.22)", border: `1px solid rgba(160,138,79,0.3)`, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3, background: C.gold }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT.sans, fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold }}>
                    <BellRing size={13} /> Meridian AI
                  </span>
                  <span style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, color: C.mist }}>now</span>
                </div>
                <p style={{ margin: "10px 0 0", fontFamily: FONT.sans, fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: C.ink }}>
                  VIP arriving 25 min early — Suite 12 ready?
                </p>
                {/* Suite-ready toggle flips on confirm */}
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: C.paper, borderRadius: 12, padding: "9px 14px" }}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 700, color: C.inkSoft }}>Suite 12 · Ready</span>
                  <Toggle at={CONFIRM} size={0.85} />
                </div>
                <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                  {!confirmed ? (
                    <span style={{ flex: 1, textAlign: "center", background: C.gold, color: "#fff", padding: "12px 0", borderRadius: 14, fontFamily: FONT.sans, fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", transform: `scale(${1 - press * 0.06})` }}>
                      Confirm ready
                    </span>
                  ) : (
                    <span style={{ flex: 1, textAlign: "center", background: "rgba(62,124,89,0.12)", color: C.success, padding: "12px 0", borderRadius: 14, fontFamily: FONT.sans, fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", opacity: confS, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                      <Check size={15} strokeWidth={3} /> Confirmed
                    </span>
                  )}
                  {!confirmed && (
                    <span style={{ padding: "12px 20px", borderRadius: 14, border: `1px solid ${C.hairline}`, color: C.inkSoft, fontFamily: FONT.sans, fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>View</span>
                  )}
                </div>
              </div>
            )}

            {/* home indicator */}
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", width: 128, height: 5, borderRadius: 999, background: "rgba(19,33,60,0.15)" }} />

            {/* thumb/cursor taps Confirm (screen-local coords, rides with the phone) */}
            {frame >= 210 && <Cursor from={[btnLocalX + 60, btnLocalY + 150]} to={[btnLocalX, btnLocalY]} moveAt={214} tapAt={TAP} color={C.ink} />}
          </div>
        </div>
      </div>

      {/* secondary device (coverage) — a small tablet echoing the same event */}
      <div style={{ position: "absolute", left: 130, top: 470, opacity: rmp(frame, 120, 150) * 0.96, transform: `translateY(${Math.sin(frame / 30 + 1) * 7}px) rotate(-4deg)` }}>
        <div style={{ width: 300, background: C.ink, borderRadius: 26, padding: 12, boxShadow: "0 34px 80px rgba(19,33,60,0.28)" }}>
          <div style={{ width: 276, background: C.paper, borderRadius: 16, overflow: "hidden", padding: 16 }}>
            <div style={{ fontFamily: FONT.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.mist }}>Front Desk · Arrival</div>
            <div style={{ marginTop: 10, fontFamily: FONT.display, fontSize: 20, color: C.ink }}>Suite 12 ready</div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 7, fontFamily: FONT.sans, fontSize: 12, fontWeight: 700, color: C.success }}>
              <span style={{ height: 8, width: 8, borderRadius: 999, background: C.success }} /> Housekeeping confirmed
            </div>
            <div style={{ marginTop: 12, height: 6, borderRadius: 999, background: "rgba(19,33,60,0.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 999, background: C.gold, width: `${rmp(frame, CONFIRM, CONFIRM + 30) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
};
