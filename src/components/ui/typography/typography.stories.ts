import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'string',
    },
    component: {
      control: 'string',
    },
    className: {
      control: 'string',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'large',
  },
}
export const H1: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'h3',
  },
}

export const Body1: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'body1',
  },
}

export const Body2: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'body2',
  },
}
export const Subtitle1: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'subtitle1',
  },
}
export const Subtitle2: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'subtitle2',
  },
}

export const Caption: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'caption',
  },
}

export const Overline: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'overline',
  },
}

export const Link1: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'link1',
  },
}

export const Link2: Story = {
  args: {
    children: 'Hello, World!',
    variant: 'link2',
  },
}
