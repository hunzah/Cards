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
    options: ['Select-box1', 'Select-box2', 'Select-box3'],
  },
}

export const Disabled: Story = {
  args: {
    options: ['Select-box1', 'Select-box2', 'Select-box3'],
    isDisabled: true,
  },
}
