import type { Meta, StoryObj } from "@storybook/react-vite";

const swatches = [
  ["--ink", "#15202b"],
  ["--mute", "#5c6b7a"],
  ["--paper", "#f2f5f7"],
  ["--card", "#ffffff"],
  ["--line", "#d3dce4"],
  ["--signal", "#c8890a"],
] as const;

function Tokens() {
  return (
    <div style={{ display: "grid", gap: 12, fontFamily: "var(--font-sans)" }}>
      {swatches.map(([name, hex]) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 40,
              height: 40,
              background: `var(${name})`,
              border: "1px solid var(--line)",
            }}
          />
          <code>
            {name} {hex}
          </code>
        </div>
      ))}
    </div>
  );
}

const meta = { component: Tokens } satisfies Meta<typeof Tokens>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Swatches: Story = {};
