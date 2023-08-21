import type { StoryObj } from '@storybook/react'

import { CheckboxDemo } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxDemo,
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    isChecked: true,
  },
}

export const Active: Story = {
  args: {
    isChecked: false,
  },
}
