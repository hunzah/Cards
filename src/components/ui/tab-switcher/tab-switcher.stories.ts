import { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    switches: {
      control: '{ id: number; switchTitle: string; disabled: boolean }[]',
    },
    title: {
      control: 'string',
    },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    switches: [
      { id: '1', switchTitle: 'first' },
      { id: '2', switchTitle: 'second' },
      { id: '3', switchTitle: 'third' },
    ],
    title: 'Pick one',
  },
}
