import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '@/components/auth/create-new-password-form'

const meta = {
  title: 'Authentication/CreateNewPasswordForm',
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
