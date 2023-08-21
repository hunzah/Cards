import type { StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    text: {
      control: 'string',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Unchecked: Story = {
  args: {
    checked: false,
  },
}

export const CheckedWithText: Story = {
  args: {
    checked: true,
    text: 'check-box',
  },
}

export const UncheckedWithText: Story = {
  args: {
    checked: false,
    text: 'check-box',
  },
}
