import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button.js";

const meta = {
  component: Button,
  args: { children: "Get quote" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
