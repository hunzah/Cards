import { Navigate } from 'react-router-dom'

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { useForgotPasswordMutation } from '@/services/auth/auth.service.ts'
import { ForgetPasswordError } from '@/services/auth/auth.types.ts'

export const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation()

  console.log('error', error)
  console.log('isLoading', isLoading)
  console.log('isSuccess', isSuccess)

  if (isSuccess) {
    return <Navigate to={'/login'} />
  }
  if (isLoading) {
    return <div> Loading...</div>
  }

  let newError

  if (error) {
    const err = error as ForgetPasswordError

    newError = <h1>{err.data.message}</h1>
  }
  const forgotPasswordHandler = (arg: any) => {
    forgotPassword(arg)
  }

  return (
    <div>
      {error && <div>{newError}</div>}
      <ForgotPasswordForm onSubmit={forgotPasswordHandler} />
    </div>
  )
}
