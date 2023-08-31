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
    placeholder: 'Input',
    inputIsSearch: false,
  },
}

export const TextFieldStandardError: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: false,
    errorMessage: 'Some error',
  },
}

export const TextFieldLogin: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: false,
    placeholder: 'Input',
    inputName: 'Login',
  },
}

export const TextFieldLoginError: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: false,
    inputName: 'Login',
    errorMessage: 'Some error',
  },
}

export const TextFieldSearch: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: true,
    placeholder: 'Input search',
  },
}

export const KeyDownEnterTextFieldSearch: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: true,
    placeholder: 'Input search',
    onEnter: e => {
      alert(e.key)
    },
  },
}

export const TextFieldSearchError: Story = {
  args: {
    inputType: 'text',
    inputIsSearch: true,
    errorMessage: 'Some error',
    placeholder: 'Input search',
  },
}

export const TextFieldPassword: Story = {
  args: {
    inputType: 'password',
    inputIsSearch: false,
    inputName: 'Password',
  },
}

export const TextFieldPasswordError: Story = {
  args: {
    inputType: 'password',
    inputIsSearch: false,
    inputName: 'Password',
    placeholder: 'Enter password',
    errorMessage: 'Some error',
  },
}
