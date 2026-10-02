import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vite-plus/test";

const css = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "../src/tokens.css"),
  "utf8",
);

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`missing --${name}`);
  return match[1].toLowerCase();
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const n = Number.parseInt(hex.slice(1), 16);
    const r = channel((n >> 16) & 255);
    const g = channel((n >> 8) & 255);
    const bl = channel(n & 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const hi = Math.max(lum(a), lum(b));
  const lo = Math.min(lum(a), lum(b));
  return (hi + 0.05) / (lo + 0.05);
}

describe("token contrast", () => {
  it("uses the navy and blue hex values", () => {
    expect(token("ink")).toBe("#1a365d");
    expect(token("ink-soft")).toBe("#3d4f63");
    expect(token("line")).toBe("#6e879f");
    expect(token("paper")).toBe("#f4f7fb");
    expect(token("card")).toBe("#ffffff");
    expect(token("signal")).toBe("#1d4ed8");
    expect(token("signal-wash")).toBe("#dbe7f5");
    expect(token("focus")).toBe("#1d4ed8");
    expect(css).not.toContain("#c8890a");
    expect(css).not.toMatch(/--mute\s*:/);
  });

  it("keeps text pairs at 4.5:1 and non-text pairs at 3:1", () => {
    const text: Array<[string, string]> = [
      ["ink", "paper"],
      ["ink", "card"],
      ["ink-soft", "paper"],
      ["ink-soft", "card"],
      ["card", "signal"],
      ["ink", "signal-wash"],
    ];
    for (const [fg, bg] of text) {
      expect(contrast(token(fg), token(bg))).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(token("focus"), token("paper"))).toBeGreaterThanOrEqual(3);
    expect(contrast(token("focus"), token("card"))).toBeGreaterThanOrEqual(3);
    expect(contrast(token("line"), token("card"))).toBeGreaterThanOrEqual(3);
  });
});
