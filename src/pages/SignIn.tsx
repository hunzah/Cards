import { SignInForm } from '@/components/auth/sing-in-form'
import {useLoginMutation} from "@/services/auth/auth.service";

const handleSubmit = (data: any) => {
  console.log(data)
}

export const SignIn = () => {
    const [login, isLoading]=useLoginMutation()
  return (
    <div>

      <SignInForm onSubmit={login} />
    </div>
  )
}
