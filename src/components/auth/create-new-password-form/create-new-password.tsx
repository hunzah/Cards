import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Label } from '@/components/ui/label'
import { Typography } from '@/components/ui/typography'

const signInSchema = z.object({
  password: z.string().min(3),
})

type FormValuesType = z.infer<typeof signInSchema>

type Props = {
  onSubmit: (data: FormValuesType) => void
}
export const CreateNewPassword = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: '',
    },
  })
  const handleFormSubmitted = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'} className={s.title}>
        Create new password
      </Typography>
      <form onSubmit={handleFormSubmitted} className={s.formContainer}>
        <div className={s.inputsContainer}>
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
          <Label
            className={s.label}
            label={'Create new password and we will send you further instructions to email'}
          />
        </div>
        <Button type={'submit'} variant={'primary'} className={s.button}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
