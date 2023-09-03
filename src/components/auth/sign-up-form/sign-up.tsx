import s from './sign-up.module.scss'

import { AuthTemplateCard } from '@/components/auth/auth-template-card'

export const SignUp = () => {
  const handleFormSubmitted = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <AuthTemplateCard
        onSubmit={handleFormSubmitted}
        title="Sign Up"
        emailInput
        passwordInput
        confirmPasswordInput
        buttonName="Sign Up"
        textAfterSubmitButton="Don't have an account?"
        linkButtonAtTheEnd="Sign Up"
        className={s.form}
        titleClassName={s.title}
      />
    </>
  )
}
