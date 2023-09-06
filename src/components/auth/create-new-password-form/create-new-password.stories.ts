import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '@/components/auth/create-new-password-form'

const meta = {
  title: 'Authentication/CreateNewPassword',
  component: CreateNewPassword,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
