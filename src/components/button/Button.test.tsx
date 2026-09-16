import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { Button } from "./Button.js";

describe("Button", () => {
  it("renders a button with type button by default", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button", { name: "Save" });
    expect(el).toHaveAttribute("type", "button");
  });
});
