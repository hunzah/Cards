import { Meta, StoryObj } from '@storybook/react'

import { CheckEmailForm } from '@/components/auth/check-email-form/check-email-form.tsx'

const meta = {
  title: 'Authentication/CheckEmail',
  component: CheckEmailForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckEmailForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
