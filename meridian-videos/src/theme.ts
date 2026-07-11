// Brand tokens — mirror of minor-os docs/02-brand/brand-guide.md (LIGHT MODE).
export const C = {
  paper: "#FBF6F0",
  surface: "#FFFFFF",
  ink: "#13213C",
  inkSoft: "#3D4A66",
  mist: "#A4A2AC",
  cadet: "#96CFD4",
  gold: "#A08A4F",
  goldSoft: "#C8B37E",
  success: "#3E7C59",
  alert: "#B4562F",
  hairline: "rgba(19,33,60,0.10)",
  ring: "rgba(19,33,60,0.06)",
  wash: "rgba(160,138,79,0.08)",
} as const;

export const SHADOW = {
  card: "0 1px 2px rgba(19,33,60,0.04), 0 8px 24px rgba(19,33,60,0.06)",
  cardLg: "0 2px 4px rgba(19,33,60,0.05), 0 16px 44px rgba(19,33,60,0.10)",
  pop: "0 20px 60px rgba(19,33,60,0.16)",
} as const;

// Fonts loaded via @remotion/google-fonts in fonts.ts
export const FONT = {
  display: "Archivo Black, sans-serif", // headlines (condensed, bold)
  sans: "Plus Jakarta Sans, sans-serif", // subheads / nav / CTA
  serif: "Newsreader, serif", // body / editorial
  script: "Caveat, cursive", // emotional keyword
} as const;

export const FPS = 30;
export const W = 1920;
export const H = 1080;
