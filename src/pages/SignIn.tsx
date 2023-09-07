import { SignInForm } from '@/components/auth/sing-in-form'

const handleSubmit = (data: any) => {
  console.log(data)
}

export const SignIn = () => {
  return (
    <div>
      <SignInForm onSubmit={handleSubmit} />
    </div>
  )
}
