import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui/text-field'

export type ControlledTextFieldPropsType<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'value' | 'onChange'>
export const ControlledTextField = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...textFieldProps
}: ControlledTextFieldPropsType<T>) => {
  const emailControl = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <TextField
      {...{
        onChangeValue: emailControl.field.onChange,
        value: emailControl.field.value,
        ...textFieldProps,
      }}
    />
  )
}
