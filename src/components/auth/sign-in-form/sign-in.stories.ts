import { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/components/auth/sign-in-form'

const meta = {
  title: 'Authentication/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: true,
  },
}
