import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './sign-in.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'
import { Typography } from '@/components/ui/typography'

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

type FormValuesType = z.infer<typeof signInSchema>

type Props = {
  onSubmit: (data: FormValuesType) => void
}
export const SignInForm = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const handleFormSubmitted = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Sign In
      </Typography>
      <form onSubmit={handleFormSubmitted}>
        <div className={s.form}>
          <ControlledTextField
            defaultValue={''}
            errorMessage={errors.email?.message}
            inputIsSearch={false}
            inputType={'text'}
            label={'Email'}
            name={'email'}
            control={control}
            placeholder={'Email'}
            className={s.textField}
          />
          <ControlledTextField
            defaultValue={''}
            errorMessage={errors.password?.message}
            inputIsSearch={false}
            inputType={'password'}
            label={'Password'}
            name={'password'}
            control={control}
            placeholder={'Password'}
            className={s.textField}
          />
        </div>
        <ControlledCheckbox
          label={'Remember me'}
          name={'rememberMe'}
          control={control}
          className={s.checkbox}
        />
        <div className={s.buttonForgotPasswordContainer}>
          <Button type={'link'} as={'a'} className={s.buttonForgotPassword}>
            Forgot Password?
          </Button>
        </div>

        <div className={s.buttonsContainer}>
          <Button type={'submit'} variant={'primary'} className={s.button}>
            Submit
          </Button>
          <Typography className={s.text} variant="body2">
            Don`t have an account?
          </Typography>
          <Button type={'link'} as={Link} className={s.buttonLink} to="/sing-up" variant={'link'}>
            Sign Up
          </Button>
        </div>
      </form>
    </Card>
  )
}
