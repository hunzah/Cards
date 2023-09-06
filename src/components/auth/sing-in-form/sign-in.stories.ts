import { Meta, StoryObj } from '@storybook/react'

import { SignInForm } from '@/components/auth/sing-in-form'

const meta = {
  title: 'Authentication/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  argTypes: {
    // onChange: {
    //   control: '(data:any) => void',
    // },
  },
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // onChange: ()=>console.log('myau')
  },
}
