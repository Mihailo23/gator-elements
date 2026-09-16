import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import { TextField } from "./TextField.js";

describe("TextField", () => {
  it("calls onChange with the typed string", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TextField id="address" label="Address" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText("Address"), "a");
    expect(onChange).toHaveBeenCalledWith("a");
  });
});
