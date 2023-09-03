import { AuthTemplateCard } from '@/components/auth/auth-template-card'

export const AuthForm = () => {
  const handleFormSubmitted = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <AuthTemplateCard
        onSubmit={handleFormSubmitted}
        title="Forgot your password?"
        emailInput
        emailLabel="Enter your email address and we will send you further instructions "
        buttonName="Send Instructions"
        textAfterSubmitButton="Did you remember your password?"
        linkButtonAtTheEnd="Try logging in"
      />
    </>
  )
}
