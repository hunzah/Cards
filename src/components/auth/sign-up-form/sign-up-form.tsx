import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { omit } from 'remeda'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address').nonempty('Enter email'),
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
  //onSubmit: (data: FormValuesType) => void
  onSubmit: (data: Omit<FormValuesType, 'passwordConfirmation'>) => void
}
export const SignUpForm = ({ onSubmit }: Props) => {
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
    onSubmit(omit(data, ['passwordConfirmation']))
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'} component={'div'} className={s.title}>
        Sign Up
      </Typography>
      <form onSubmit={handleFormSubmitted} className={s.formContainer}>
        <div className={s.inputsContainer}>
          <div>
            <ControlledTextField
              defaultValue={''}
              errorMessage={errors.email?.message}
              inputIsSearch={false}
              inputType={'text'}
              label={'Email'}
              name={'email'}
              control={control}
              placeholder={'Email'}
              className={s.input}
            />
          </div>
          <div>
            <ControlledTextField
              defaultValue={''}
              errorMessage={errors.password?.message}
              inputIsSearch={false}
              inputType={'password'}
              label={'Password'}
              name={'password'}
              control={control}
              placeholder={'Password'}
              className={s.input}
            />
          </div>
          <ControlledTextField
            defaultValue={''}
            errorMessage={errors.passwordConfirmation?.message}
            inputIsSearch={false}
            inputType={'password'}
            label={'Confirm Password'}
            name={'passwordConfirmation'}
            placeholder={'Confirm Password'}
            control={control}
            className={s.input}
          />
        </div>
        <div className={s.buttonsContainer}>
          <Button type={'submit'} variant={'primary'} className={s.button}>
            Sign Up
          </Button>
          <Typography className={s.text} variant="body2">
            Already have an account?
          </Typography>
          <Button type={'link'} as={Link} variant={'link'} to="/login" className={s.buttonLink}>
            Sign In
          </Button>
        </div>
      </form>
    </Card>
  )
}
