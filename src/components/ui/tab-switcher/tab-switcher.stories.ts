import type { Meta, StoryObj } from '@storybook/react'



import TabSwitcher from "@/components/ui/tab-switcher/tab-switcher";

const meta = {
  title: 'Components/Tab-Switcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes:
{switches:[{id: "number", switchTitle: "string", disabled: "boolean"}]

  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const TabSwither: Story = {
  args: {
  /*  childen: meta.argTypes.switches[0]*/
  },
}

