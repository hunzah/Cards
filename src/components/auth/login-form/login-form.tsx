import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { TextField } from '../../ui/text-field'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean(),
})

type FormValues = z.input<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  /*const {
          field: { value, onChange },
        } = useController({
          name: 'rememberMe',
          control,
          defaultValue: false,
        })*/

  const emailControl = useController({
    name: 'email',
    control,
    defaultValue: '',
  })

  const passwordControl = useController({
    name: 'password',
    control,
    defaultValue: '',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email')}
        errorMessage={errors.email?.message}
        value={emailControl.field.value}
        onChangeValue={emailControl.field.onChange}
        inputIsSearch={false}
        inputType={'text'}
        label={'email'}
      />
      <TextField
        value={passwordControl.field.value}
        onChangeValue={passwordControl.field.onChange}
        errorMessage={errors.password?.message}
        label={'password'}
        inputIsSearch={false}
        inputType={'password'}
      />
      {/* <Checkbox label={'remember me'} onChange={onChange} checked={value} />*/}
      <ControlledCheckbox label={'remember me'} name={'rememberMe'} control={control} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
