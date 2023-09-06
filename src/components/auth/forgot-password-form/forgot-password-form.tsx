import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Label } from '@/components/ui/label'
import { Typography } from '@/components/ui/typography'

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
})

type FormValuesType = z.infer<typeof signInSchema>

type Props = {
  onSubmit: (data: FormValuesType) => void
}
export const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
    },
  })
  const handleFormSubmitted = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleFormSubmitted} className={s.formContainer}>
        <div className={s.inputsContainer}>
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
          <Label
            className={s.label}
            label={'Enter your email address and we will send you further instructions'}
          />
        </div>

        <div className={s.buttonsContainer}>
          <Button type={'submit'} variant={'primary'} className={s.button}>
            Send Instructions
          </Button>
          <Typography className={s.text} variant="body2">
            Did you remember your password?
          </Typography>
          <Button type={'link'} as={'a'} className={s.buttonLink}>
            Try logging in
          </Button>
        </div>
      </form>
    </Card>
  )
}
