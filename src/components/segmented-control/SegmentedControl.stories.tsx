import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl.js";

const meta = {
  component: SegmentedControl,
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoOptions: Story = {
  args: {
    label: "Choice",
    value: "a",
    onChange: () => {},
    options: [
      { value: "a", label: "One" },
      { value: "b", label: "Two" },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};
