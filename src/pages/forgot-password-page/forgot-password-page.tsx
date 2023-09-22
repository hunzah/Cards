import { Navigate } from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { useForgotPasswordMutation } from '@/services/auth/auth.service.ts'
import { ForgetPasswordError } from '@/services/auth/auth.types.ts'

type ArgType = {
  email: string
}
export const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation()

  if (isSuccess) {
    return <Navigate to={'/check-email'} />
  }
  if (isLoading) {
    return <div> Loading...</div>
  }

  let newError

  if (error) {
    const err = error as ForgetPasswordError

    newError = <h1>{err.data.message}</h1>
  }
  const forgotPasswordHandler = (arg: ArgType) => {
    forgotPassword({
      html: `<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/confirm-email/##token##">here</a> to recover your password</p>`,
      email: arg.email,
    })
  }

  return (
    <div>
      {error && <div>{newError}</div>}
      <ForgotPasswordForm onSubmit={forgotPasswordHandler} />
    </div>
  )
}
