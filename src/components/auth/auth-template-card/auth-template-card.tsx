import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './auth-template-card.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Label } from '@/components/ui/label'
import { Typography } from '@/components/ui/typography'

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    passwordConfirmation: z.string().min(3),
    rememberMe: z.boolean().optional(),
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
  confirmPasswordInput?: boolean
  checkbox?: boolean
  buttonName?: string
  textAfterSubmitButton?: string
  linkButtonAtTheEnd?: string
  className?: string
  titleClassName?: string
}
export const AuthTemplateCard = (props: Props) => {
  const {
    onSubmit,
    title,
    emailInput,
    emailLabel,
    passwordInput,
    passwordLabel,
    confirmPasswordInput,
    checkbox,
    buttonName,
    textAfterSubmitButton,
    linkButtonAtTheEnd,
    className,
    titleClassName,
  } = props

  const classNames = {
    card: clsx(s.card, className && className),
    title: clsx(s.title, titleClassName && titleClassName),
  }

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
      rememberMe: false,
    },
  })

  const handleFormSubmitted = handleSubmit(data => {
    onSubmit(omit(data, ['passwordConfirmation']))
  })

  return (
    <Card className={classNames.card}>
      <form onSubmit={handleFormSubmitted} className={s.formContainer}>
        {' '}
        <>
          <Typography variant={'large'} className={classNames.title}>
            {title}
          </Typography>
          <div className={s.form}>
            {emailInput && (
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
                  className={`${s.textField} ${s.emailInput}`}
                />
                <Label className={s.label} label={emailLabel && emailLabel} />
              </div>
            )}
            {passwordInput && (
              <div className={s.passwordAndCheckboxContainer}>
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
                    className={`${s.textField} ${s.passwordInput}`}
                  />
                  <Label className={s.label} label={passwordLabel && passwordLabel} />
                </div>
                {checkbox && (
                  <div className={s.checkboxAndBtnContainer}>
                    <ControlledCheckbox
                      label={'Remember me'}
                      name={'rememberMe'}
                      control={control}
                      labelClassName={s.checkboxText}
                    />
                    <Button
                      className={s.forgotPasswordBtn}
                      type={'link'}
                      as={'a'}
                      variant={'secondary'}
                    >
                      Forgot password?
                    </Button>
                  </div>
                )}
              </div>
            )}
            {confirmPasswordInput && (
              <ControlledTextField
                defaultValue={''}
                errorMessage={errors.passwordConfirmation?.message}
                inputIsSearch={false}
                inputType={'password'}
                label={'Confirm Password'}
                name={'passwordConfirmation'}
                placeholder={'Confirm Password'}
                control={control}
                className={`${s.textField} ${s.confirmInput}`}
              />
            )}
          </div>
        </>
      </form>
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
    </Card>
  )
}
