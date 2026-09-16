import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TextField } from "./TextField.js";

const meta = {
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Address: Story = {
  args: {
    id: "address",
    label: "Address",
    value: "14 Linden Street, Apt 4B",
    onChange: () => {},
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <TextField {...args} value={value} onChange={setValue} />;
  },
};
