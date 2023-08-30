import type { Meta, StoryObj } from '@storybook/react'



import TabSwitcher from "@/components/ui/tab-switcher/tab-switcher";

const meta = {
  title: 'Components/Tab-Switcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
isActive:{
  control:"boolean"
}
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
}

