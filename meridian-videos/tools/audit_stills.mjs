// Bundle ONCE, render many audit stills from that single bundle (fast).
import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import { enableTailwind } from "@remotion/tailwind-v4";
import path from "path";
import fs from "fs";

const root = process.cwd();
const outDir = path.join(root, "out", "audit4");
fs.mkdirSync(outDir, { recursive: true });

// [label, globalFrame] — a revealing frame per scene (post-entrance, pre-exit).
// Override FRAMES via env AUDIT_ONLY="label:frame,label:frame" for targeted re-checks.
let FRAMES = [
  ["01-coldopen", 120],
  ["02-thesis", 380],
  ["03-problem", 690],
  ["04-themove", 900],
  ["05-whatis", 1075],
  ["06-dashboard", 1320],
  ["06b-dashboard-full", 1185],
  ["07-aiaction", 1810],
  ["08-knowledge", 2070],
  ["09-mobile", 2410],
  ["10-frontdesk", 2680],
  ["11-booking", 2910],
  ["12-finance", 3150],
  ["13-loyalty", 3410],
  ["14-montageops", 3760],
  ["15-montagecommercial", 4040],
  ["16-omfa", 4420],
  ["17-connected", 4640],
  ["18-personas", 4930],
  ["19-bigpicture", 5150],
  ["20-close", 5450],
  ["21-endcard", 5720],
];
if (process.env.AUDIT_ONLY) {
  FRAMES = process.env.AUDIT_ONLY.split(",").map((s) => { const [l, f] = s.split(":"); return [l, Number(f)]; });
}

const serveUrl = await bundle({ entryPoint: path.join(root, "src", "index.ts"), webpackOverride: (c) => enableTailwind(c) });
const comp = await selectComposition({ serveUrl, id: "Video4" });
console.log("Video4 durationInFrames =", comp.durationInFrames, `(=${(comp.durationInFrames/30).toFixed(1)}s)`);

for (const [label, frame] of FRAMES) {
  const f = Math.min(frame, comp.durationInFrames - 1);
  const output = path.join(outDir, `${label}.png`);
  await renderStill({ serveUrl, composition: comp, output, frame: f, scale: 0.5, overwrite: true });
  console.log("wrote", label, "@", f);
}
console.log("DONE");
