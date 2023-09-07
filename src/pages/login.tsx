import { SignInForm } from '@/components/auth/sing-in-form'

export const Login = () => {
  const [login] = useLoginMutation()

  return <SignInForm onSubmit={} />
}
