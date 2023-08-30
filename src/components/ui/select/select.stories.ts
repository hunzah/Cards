import { Meta, StoryObj } from '@storybook/react'

import { OptionType, Select } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'Array<OptionType>',
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
    options: [
      { id: 1, option: 'Select-box' },
      { id: 2, option: 'Select-box' },
      { id: 3, option: 'Select-box' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    options: [
      { id: 1, option: 'Select-box' },
      { id: 2, option: 'Select-box' },
      { id: 3, option: 'Select-box' },
    ],
    isDisabled: true,
  },
}
