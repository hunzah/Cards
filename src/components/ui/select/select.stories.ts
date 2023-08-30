import { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'Array<string>',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: ['Select-box', 'Select-box', 'Select-box'],
  },
}

export const Disabled: Story = {
  args: {
    options: ['Select-box', 'Select-box', 'Select-box'],
    isDisabled: true,
  },
}
