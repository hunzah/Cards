import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    decks: {
      control: 'DecksResponse',
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    decks: {
      items: [
        {
          author: {
            id: 'string',
            name: 'Cameron',
          },
          id: 'string',
          userId: 'string',
          name: 'string',
          isPrivate: false,
          shots: 3,
          cover: null,
          rating: 5,
          created: 'string',
          updated: 'string',
          cardsCount: 53,
        },
      ],
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 35,
        totalItems: 350,
      },
      maxCardsCount: 62,
    },
  },
}
