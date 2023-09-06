import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'string',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>

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
    label: 'check-box',
  },
}

export const UncheckedWithText: Story = {
  args: {
    checked: false,
    label: 'check-box',
  },
}

export const DisabledAndChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

export const DisabledAndUnchecked: Story = {
  args: {
    checked: false,
    disabled: true,
  },
}

export const DisabledAndCheckedWithText: Story = {
  args: {
    checked: true,
    label: 'check-box',
    disabled: true,
  },
}

export const DisabledAndUncheckedWithText: Story = {
  args: {
    checked: false,
    label: 'check-box',
    disabled: true,
  },
}
