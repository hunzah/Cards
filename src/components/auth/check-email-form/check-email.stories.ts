import { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/components/auth/check-email-form/check-email.tsx'

const meta = {
  title: 'Authentication/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
