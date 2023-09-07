import { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/components/auth/sign-up-form/sign-up-form.tsx'

const meta = {
  title: 'Authentication/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
