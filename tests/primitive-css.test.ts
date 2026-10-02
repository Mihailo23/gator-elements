import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vite-plus/test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "src/components/button/Button.module.css",
  "src/components/text-field/TextField.module.css",
  "src/components/badge/Badge.module.css",
  "src/components/segmented-control/SegmentedControl.module.css",
];

describe("primitive css", () => {
  it("uses tokens instead of hex or raw px", () => {
    for (const file of files) {
      const css = readFileSync(join(root, file), "utf8");
      expect(css, file).not.toMatch(/#[0-9a-fA-F]{3,8}/);
      expect(css, file).not.toMatch(/\d+px/);
      expect(css, file).not.toContain("--mute");
    }
    const button = readFileSync(join(root, files[0]), "utf8");
    expect(button).not.toContain("width: 100%");
    expect(button).toContain("var(--focus)");
    expect(button).toContain("var(--signal)");
    const badge = readFileSync(join(root, files[2]), "utf8");
    expect(badge).toContain("var(--signal-wash)");
    expect(badge).toContain("var(--ink)");
    expect(badge).not.toContain("var(--signal)");
  });
});
