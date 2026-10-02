import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { Button } from "./Button.js";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it("renders a button with type button by default", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button", { name: "Save" });
    expect(el).toHaveAttribute("type", "button");
    expect(el).toBeEnabled();
  });

  it("marks the button disabled", () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });
});
