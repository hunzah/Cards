import { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/ui/header'

const meta = {
  title: 'Authentication/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'string' },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Ivan',
    open: false,
  },
}
export const WithOpenedMenu: Story = {
  args: {
    name: 'Ivan',
    open: true,
  },
}
