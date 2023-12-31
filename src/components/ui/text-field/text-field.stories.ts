import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field.tsx'

const meta = {
  title: 'Components/text-field',
  component: TextField,
  argTypes: {
    value: {
      options: 'string',
    },
    inputType: {
      options: ['text', 'password'],
    },
    inputIsSearch: {
      options: [true, false],
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const TextFieldStandard: Story = {
  args: {
    value: '',
    inputType: 'text',
    inputName: 'Input',
    inputIsSearch: false,
  },
}

export const TextFieldStandardError: Story = {
  args: {
    value: '',
    inputType: 'text',
    inputIsSearch: false,
    errorMessage: 'Error!',
    inputName: 'Error',
  },
}

export const TextFieldLogin: Story = {
  args: {
    value: '',
    inputType: 'text',
    inputIsSearch: false,
    placeholder: 'Enter login',
    inputName: 'Input',
  },
}

export const TextFieldLoginError: Story = {
  args: {
    value: '',
    inputType: 'text',
    inputIsSearch: false,
    inputName: 'Input',
    errorMessage: 'Error!',
  },
}

export const TextFieldSearch: Story = {
  args: {
    value: '',
    inputType: 'text',
    inputIsSearch: true,
    placeholder: 'Enter text',
  },
}

export const TextFieldSearchError: Story = {
  args: {
    value: '',
    inputType: 'text',
    inputIsSearch: true,
    errorMessage: 'Error!',
  },
}

export const TextFieldPassword: Story = {
  args: {
    value: '',
    inputType: 'password',
    inputIsSearch: false,
    inputName: 'Input',
  },
}

export const TextFieldPasswordError: Story = {
  args: {
    value: '',
    inputType: 'password',
    inputIsSearch: false,
    inputName: 'Input',
    placeholder: 'Enter password',
    errorMessage: 'Error!',
  },
}
