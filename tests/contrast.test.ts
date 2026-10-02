import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vite-plus/test";

const css = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "../src/tokens.css"),
  "utf8",
);

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+)`));
  if (!match) throw new Error(`missing --${name}`);
  const value = match[1].trim();
  const alias = value.match(/^var\(--([a-z0-9-]+)\)$/);
  if (alias) return token(alias[1]);
  if (!value.startsWith("#")) throw new Error(`--${name} is not a color`);
  return value.toLowerCase();
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
  it("keeps five steps in each ramp and the semantic aliases", () => {
    for (const prefix of ["primary", "secondary", "neutral"]) {
      const steps = css.match(new RegExp(`--${prefix}-\\d+:`, "g")) ?? [];
      expect(steps, prefix).toHaveLength(5);
    }
    expect(token("primary-900")).toBe("#003e6b");
    expect(token("primary-700")).toBe("#0f609b");
    expect(token("primary-500")).toBe("#2680c2");
    expect(token("primary-300")).toBe("#84c5f4");
    expect(token("primary-100")).toBe("#dceefb");
    expect(token("secondary-900")).toBe("#044e54");
    expect(token("secondary-700")).toBe("#0e7c86");
    expect(token("secondary-500")).toBe("#2cb1bc");
    expect(token("secondary-300")).toBe("#87eaf2");
    expect(token("secondary-100")).toBe("#e0fcff");
    expect(token("neutral-900")).toBe("#102a43");
    expect(token("neutral-700")).toBe("#334e68");
    expect(token("neutral-500")).toBe("#627d98");
    expect(token("neutral-200")).toBe("#d9e2ec");
    expect(token("neutral-50")).toBe("#f0f4f8");
    expect(token("ink")).toBe(token("neutral-900"));
    expect(token("ink-soft")).toBe(token("neutral-700"));
    expect(token("line")).toBe(token("neutral-500"));
    expect(token("paper")).toBe(token("neutral-50"));
    expect(token("card")).toBe("#ffffff");
    expect(token("signal")).toBe(token("primary-700"));
    expect(token("signal-wash")).toBe(token("primary-100"));
    expect(token("focus")).toBe(token("primary-700"));
    expect(css).toContain("Inter");
    expect(css).toContain("Merriweather");
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
