import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ForgotPasswordForm } from '@/components'
import { useForgotPasswordMutation } from '@/services/auth/auth.service.ts'
import 'react-toastify/dist/ReactToastify.css'
import { GeneralErrorType, handleApiError } from '@/utils/error-helpers/error-helpers.ts'

type ArgType = {
  email: string
}

export const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation()

  if (isSuccess) {
    toast.success('🦄 Completed! Please check your email!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

    return <Navigate to={'/check-email'} />
  }
  if (isLoading) {
    return <div> Loading...</div>
  }

  if (error) {
    const err = error as GeneralErrorType

    handleApiError(err)
  }
  const forgotPasswordHandler = (arg: ArgType) => {
    forgotPassword({
      html: `<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/confirm-email/##token##">here</a> to recover your password</p>`,
      email: arg.email,
    })
  }

  return (
    <div>
      <ForgotPasswordForm onSubmit={forgotPasswordHandler} />
      <div></div>
    </div>
  )
}
