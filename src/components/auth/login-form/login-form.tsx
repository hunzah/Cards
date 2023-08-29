import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean(),
})

type FormValues = z.input<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        defaultValue={''}
        errorMessage={errors.email?.message}
        inputIsSearch={false}
        inputType={'text'}
        label={'email'}
        name={'email'}
        control={control}
      />
      <ControlledTextField
        defaultValue={''}
        errorMessage={errors.password?.message}
        inputIsSearch={false}
        inputType={'password'}
        label={'password'}
        name={'password'}
        control={control}
      />
      <ControlledCheckbox label={'remember me'} name={'rememberMe'} control={control} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
