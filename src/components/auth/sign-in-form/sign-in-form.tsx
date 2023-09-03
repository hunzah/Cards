import s from './sign-in.module.scss'

import { AuthTemplateCard } from '@/components/auth/auth-template-card'

export const SignIn = () => {
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
        buttonName="Sign In"
        textAfterSubmitButton="Don't have an account?"
        linkButtonAtTheEnd="Sign Up"
        checkbox
        className={s.form}
        titleClassName={s.title}
      />
    </>
  )
}
