import { SignUpForm } from '@/components/auth/sign-up-form'
import { useSingUpMutation } from '@/services/auth/auth.service.ts'

export const SingUpPage = () => {
  const [singUp, { error }] = useSingUpMutation()

  console.log(error)

  return (
    <div>
      <SignUpForm onSubmit={singUp} />
    </div>
  )
}
