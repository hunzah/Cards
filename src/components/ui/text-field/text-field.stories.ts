import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field.tsx'

const meta = {
  title: 'Components/text-field',
  component: TextField,
  /*argTypes: {
                                inputType: {
                                  options: ['text', 'password'],
                                },
                                inputIsSearch: {
                                  options: [true, false],
                                },
                              },*/
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const TextFieldStandard: Story = {
  args: {
    inputType: 'text',
    inputName: 'Input',
    inputIsSearch: false,
  },
}

export const TextFieldStandardError: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: false,
    errorMessage: 'Error!',
    inputName: 'Error',
  },
}

export const TextFieldLogin: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: false,
    placeholder: 'Enter login',
    inputName: 'Input',
  },
}

export const TextFieldLoginError: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: false,
    inputName: 'Input',
    errorMessage: 'Error!',
  },
}

export const TextFieldSearch: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: true,
    placeholder: 'Enter text',
  },
}

export const TextFieldSearchError: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: true,
    errorMessage: 'Error!',
  },
}

export const TextFieldPassword: Story = {
  args: {
    inputType: 'password',
    inputIsSearch: false,
    inputName: 'Input',
  },
}

export const TextFieldPasswordError: Story = {
  args: {
    inputType: 'password',
    inputIsSearch: false,
    inputName: 'Input',
    placeholder: 'Enter password',
    errorMessage: 'Error!',
  },
}
