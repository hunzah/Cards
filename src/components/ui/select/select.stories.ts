import { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

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
      { id: 1, option: 'Select-box1' },
      { id: 2, option: 'Select-box2' },
      { id: 3, option: 'Select-box3' },
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
