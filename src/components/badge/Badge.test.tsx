import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { Badge } from "./Badge.js";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Buyer form</Badge>);
    expect(screen.getByText("Buyer form")).toBeInTheDocument();
  });
});
