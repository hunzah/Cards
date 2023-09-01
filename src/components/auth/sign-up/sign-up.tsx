import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from '@/components/auth/sign-up/sign-up.module.scss'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'
import { Typography } from '@/components/ui/typography'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    passwordConfirmation: z.string().min(3),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        message: 'Passwords do not match',
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

type FormValuesType = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (data: Omit<FormValuesType, 'passwordConfirmation'>) => void
}
export const SignUp = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleFormSubmitted = handleSubmit(data => {
    props.onSubmit(omit(data, ['passwordConfirmation']))
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Sign Up
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
          <ControlledTextField
            defaultValue={''}
            errorMessage={errors.passwordConfirmation?.message}
            inputIsSearch={false}
            inputType={'password'}
            label={'Confirm Password'}
            name={'passwordConfirmation'}
            placeholder={'Confirm Password'}
            control={control}
            className={s.textField}
          />
        </div>
        <Button type={'submit'} variant={'primary'} className={s.button}>
          Submit
        </Button>
        <Typography className={s.text} variant="body2">
          Already have an account?
        </Typography>

        <Button type={'link'} as={'a'} className={s.buttonLink}>
          Sign In
        </Button>
      </form>
    </Card>
  )
}
