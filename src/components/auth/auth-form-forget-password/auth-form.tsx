import { AuthTemplateCard } from '@/components/auth/auth-template-card'

export const AuthForm = () => {
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
      />
    </>
  )
}
