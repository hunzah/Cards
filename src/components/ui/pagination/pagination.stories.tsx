import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    elements: {
      control: Array<any>,
    },
    elemsOnPerPage: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    elements: 500,
    elemsOnPerPage: 10,
  },
}
