import { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    switches: {
      control: 'switches: { id: number; switchTitle: string; disabled: boolean }[]',
    },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    switches: [
      { id: 1, switchTitle: 'first', disabled: false },
      { id: 2, switchTitle: 'second', disabled: false },
      { id: 3, switchTitle: 'third', disabled: true },
    ],
  },
}

export const Active: Story = {
  args: {
    switches: [{ id: 1, switchTitle: 'first', disabled: false }],
  },
}

export const Disabled: Story = {
  args: {
    switches: [{ id: 2, switchTitle: 'third', disabled: true }],
  },
}
