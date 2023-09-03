import s from './forgot-password.module.scss'

import { AuthTemplateCard } from '@/components/auth/auth-template-card'

export const ForgotPasswordForm = () => {
  const handleFormSubmitted = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <AuthTemplateCard
        onSubmit={handleFormSubmitted}
        title="Sign In"
        emailInput
        passwordInput
        emailLabel="Enter your email address and we will send you further instructions "
        buttonName="Send Instructions"
        textAfterSubmitButton="Did you remember your password?"
        linkButtonAtTheEnd="Try logging in"
        className={s.form}
        titleClassName={s.title}
      />
    </>
  )
}
