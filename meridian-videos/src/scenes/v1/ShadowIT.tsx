/**
 * v1-06 "Shadow IT" — staff working around broken systems: personal WhatsApp
 * bubbles + public-AI chips pile up, with a quiet "ungoverned" warning.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT, SHADOW } from "../../theme";
import { Eyebrow, Headline, G } from "../../lib/chrome";
import { FadeUp, ramp } from "../../lib/motion";
import { MessageCircle, AlertTriangle } from "lucide-react";

const BUBBLES = [
  { t: "Can someone cover 204? 🙏", me: false, d: 10 },
  { t: "Guest in 1102 wants late c/o", me: true, d: 22 },
  { t: "asked ChatGPT to translate the SOP", me: false, d: 34 },
  { t: "WhatsApp group: Front Desk 🏨", me: true, d: 46 },
];

export const ShadowIT: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 90 }}>
      <div style={{ maxWidth: 620 }}>
        <FadeUp delay={4}><Eyebrow>Ungoverned</Eyebrow></FadeUp>
        <FadeUp delay={14} style={{ marginTop: 24 }}>
          <Headline size={72}>STAFF WORK <G>AROUND IT.</G></Headline>
        </FadeUp>
        <FadeUp delay={30} style={{ marginTop: 26 }}>
          <div style={{ fontFamily: FONT.serif, fontStyle: "italic", fontSize: 28, color: C.inkSoft, lineHeight: 1.5 }}>
            Personal WhatsApp. Public AI. Outside anything secure or on-brand.
          </div>
        </FadeUp>
        <FadeUp delay={56} style={{ marginTop: 34 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(180,86,47,0.08)", color: C.alert, borderRadius: 12, padding: "12px 20px", fontFamily: FONT.sans, fontWeight: 600, fontSize: 20 }}>
            <AlertTriangle size={20} /> Guest data leaves the building
          </div>
        </FadeUp>
      </div>

      {/* phone with piling chat bubbles */}
      <div style={{ width: 380, height: 760, borderRadius: 54, background: C.ink, padding: 14, boxShadow: SHADOW.pop }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 42, background: "#ECE9E3", overflow: "hidden", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.inkSoft, fontFamily: FONT.sans, fontWeight: 700, fontSize: 15, paddingBottom: 12, borderBottom: `1px solid ${C.hairline}` }}>
            <MessageCircle size={18} /> Front Desk (unofficial)
          </div>
          {BUBBLES.map((b, i) => {
            const p = ramp(frame, b.d, b.d + 14);
            return (
              <div key={i} style={{ alignSelf: b.me ? "flex-end" : "flex-start", maxWidth: "78%", opacity: p, transform: `translateY(${(1 - p) * 16}px)`, background: b.me ? "#D8EAD3" : C.surface, color: C.ink, borderRadius: 16, padding: "10px 14px", fontFamily: FONT.sans, fontSize: 15, boxShadow: SHADOW.card }}>
                {b.t}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
