import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './auth-template-card.module.scss'

import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Label } from '@/components/ui/label'
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
  title?: string
  emailInput?: boolean
  emailLabel?: string
  passwordInput?: boolean
  passwordLabel?: string
  passwordConfirmationInput?: boolean
  checkbox?: boolean
  buttonName: string
  textAfterSubmitButton: string
  linkButtonAtTheEnd: string
}
export const AuthTemplateCard = (props: Props) => {
  const {
    onSubmit,
    title,
    emailInput,
    emailLabel,
    passwordInput,
    passwordLabel,
    passwordConfirmationInput,
    checkbox,
    buttonName,
    textAfterSubmitButton,
    linkButtonAtTheEnd,
  } = props
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
      <form onSubmit={handleFormSubmitted} className={s.formContainer}>
        {' '}
        <Typography variant={'large'} className={s.title}>
          {title}
        </Typography>
        <div className={s.form}>
          {emailInput && (
            <div className={s.label}>
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
              <Label label={emailLabel && emailLabel} />
            </div>
          )}
          {passwordInput && (
            <div className={s.label}>
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
              <Label label={passwordLabel && passwordLabel} />
              {/*{checkbox && <ControlledCheckbox name="rememberMe" label="Remember me" />}*/}
            </div>
          )}
          {passwordConfirmationInput && (
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
          )}
          {checkbox && <Checkbox onChange={() => console.log()} checked={true} />}
        </div>
        <div className={s.buttonsContainer}>
          <Button type={'submit'} variant={'primary'} className={s.button}>
            {buttonName}
          </Button>
          <Typography className={s.text} variant="body2">
            {textAfterSubmitButton}
          </Typography>
          <Button type={'link'} as={'a'} className={s.buttonLink}>
            {linkButtonAtTheEnd}
          </Button>
        </div>
      </form>
    </Card>
  )
}
