import { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

const meta = {
  title: 'Authentication/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
