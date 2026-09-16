import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge.js";

const meta = {
  component: Badge,
  args: { children: "Buyer form" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
