import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import { SegmentedControl } from "./SegmentedControl.js";

describe("SegmentedControl", () => {
  it("calls onChange with the clicked option value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl
        label="Property"
        value="a"
        options={[
          { value: "a", label: "One" },
          { value: "b", label: "Two" },
        ]}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Two" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });
});
