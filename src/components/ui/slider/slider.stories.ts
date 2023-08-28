import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    minSliderValue: {
      control: 'number',
    },
    maxSliderValue: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderDefault: Story = {
  args: {
    minSliderValue: 25,
    maxSliderValue: 75,
  },
}
