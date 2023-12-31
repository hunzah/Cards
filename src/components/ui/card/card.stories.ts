import type { StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
