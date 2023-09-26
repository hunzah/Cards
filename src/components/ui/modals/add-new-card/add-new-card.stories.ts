import { Meta, StoryObj } from '@storybook/react'

import { AddNewCard } from '@/components/ui/modals/add-new-card/add-new-card.tsx'

const meta = {
  title: 'modals/AddNewCard',
  component: AddNewCard,
  tags: ['autodocs'],
} satisfies Meta<typeof AddNewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: '1',
    isOpen: true,

    closeModalCallback: () => {
      console.log('checked')
    },
  },
}
