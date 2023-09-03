import { Meta, StoryObj } from '@storybook/react'

import { SignUp } from '@/components/auth/sign-up'

const meta = {
  title: 'Authentication/SignUp',
  component: SignUp,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: true,
  },
}
