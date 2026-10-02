import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";

const typeSteps = [
  ["--text-sm", "Labels, hints, badges, buttons"],
  ["--text-md", "Field values and body"],
  ["--text-lg", "Section titles"],
  ["--text-xl", "Screen title"],
] as const;

const spaces = [1, 2, 3, 4, 5, 6, 7] as const;

const pairs = [
  ["Ink on paper", "--ink", "--paper"],
  ["Ink on card", "--ink", "--card"],
  ["Ink soft on paper", "--ink-soft", "--paper"],
  ["Ink soft on card", "--ink-soft", "--card"],
  ["White on signal", "--card", "--signal"],
  ["Ink on signal wash", "--ink", "--signal-wash"],
  ["Focus on paper", "--focus", "--paper"],
  ["Focus on card", "--focus", "--card"],
  ["Line on card", "--line", "--card"],
] as const;

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function contrast(a: string, b: string): number {
  const lum = (rgb: string) => {
    const parts = rgb.match(/\d+/g);
    if (!parts) return 0;
    const [r, g, bl] = parts.map(Number);
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(bl);
  };
  const hi = Math.max(lum(a), lum(b));
  const lo = Math.min(lum(a), lum(b));
  return (hi + 0.05) / (lo + 0.05);
}

function Tokens() {
  const probe = useRef<HTMLDivElement>(null);
  const [ratios, setRatios] = useState<string[]>([]);

  useEffect(() => {
    const node = probe.current;
    if (!node) return;
    const read = (name: string) => {
      node.style.background = `var(${name})`;
      return getComputedStyle(node).backgroundColor;
    };
    setRatios(pairs.map(([, fg, bg]) => contrast(read(fg), read(bg)).toFixed(2)));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "var(--space-5)",
        fontFamily: "var(--font-sans)",
        color: "var(--ink)",
      }}
    >
      <div ref={probe} hidden />
      <section>
        <h2 style={{ font: "600 var(--text-lg) / 1.15 var(--font-serif)", margin: 0 }}>Type</h2>
        {typeSteps.map(([token, use]) => (
          <p key={token} style={{ fontSize: `var(${token})`, margin: "var(--space-2) 0" }}>
            <code>{token}</code> {use}
          </p>
        ))}
      </section>
      <section>
        <h2 style={{ font: "600 var(--text-lg) / 1.15 var(--font-serif)", margin: 0 }}>Space</h2>
        {spaces.map((step) => (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginTop: "var(--space-2)",
            }}
          >
            <span
              style={{
                width: `var(--space-${step})`,
                height: "var(--space-3)",
                background: "var(--signal)",
              }}
            />
            <code>--space-{step}</code>
          </div>
        ))}
      </section>
      <section>
        <h2 style={{ font: "600 var(--text-lg) / 1.15 var(--font-serif)", margin: 0 }}>Pairs</h2>
        {pairs.map(([label, fg, bg], index) => (
          <div
            key={label}
            style={{
              marginTop: "var(--space-2)",
              padding: "var(--space-3)",
              background: `var(${bg})`,
              color: `var(${fg})`,
              border: "var(--hairline) solid var(--line)",
            }}
          >
            {label} {ratios[index] ?? ""}
          </div>
        ))}
      </section>
    </div>
  );
}

const meta = { component: Tokens } satisfies Meta<typeof Tokens>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Swatches: Story = {};
