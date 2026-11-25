// main.ts — "Worst Fix Ever: Funniest Commit Message"
// Writes a single commit-message line for a fix that made everything worse
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// The gate allows 1-100 characters; this program enforces that itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, a fix whose cure is worse than the disease.
// A memory leak "fixed" by restarting every minute — the server never
// leaks again, because it never stays up long enough to leak. The joke
// lands on its own: the fix works, and that is exactly the problem.
const LINE =
  "fix: stop the memory leak by restarting every minute — uptime is now 59 seconds";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Gate: entry.txt must be UTF-8 text of 1 to 100 characters, not only whitespace.
const length = [...LINE].length;
if (length < 1 || length > 100) {
  throw new Error(`entry is ${length} characters, must be 1-100`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
