import { CreateNewPassword } from '@/components/auth/create-new-password/create-new-password.tsx'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form/forgot-password-form.tsx'
import { SignIn } from '@/components/auth/sign-in-form/sign-in-form.tsx'
import { SignUp } from '@/components/auth/sign-up'

export function App() {
  return (
    <div>
      <ForgotPasswordForm />
      <hr></hr>
      <SignIn />
      <hr></hr>
      <SignUp />
      <hr></hr>
      <CreateNewPassword />
    </div>
  )
}
