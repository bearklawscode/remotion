// Remotion serves public assets via staticFile(); wrap raw /assets paths from the
// ported minor-os components so they resolve during preview AND headless render.
import { staticFile } from "remotion";
export const A = (p?: string): string => (p ? staticFile(p.replace(/^\//, "")) : "");
