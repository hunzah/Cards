import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    elements: {
      control: 'number',
    },
    setItemsPerPage: {
      control: '(value: number) => void',
    },
    currentPage: {
      control: 'number',
    },
    setCurrentPage: {
      control: '(value: number) => void',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    elements: 500,
    currentPage: 1,
  },
}
