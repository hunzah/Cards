import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CreateNewPasswordForm } from '@/components'
import { useResetPasswordMutation } from '@/services/auth/auth.service.ts'

export type PasswordData = {
  password: string
}
export const NewPasswordPage = () => {
  const { code } = useParams()
  const [resetPassword, { isSuccess, error }] = useResetPasswordMutation({})

  const createNewPasswordHandler = (data: PasswordData) => {
    resetPassword({ token: code, password: data.password })
  }

  if (isSuccess) {
    toast.success('🦄 Completed successfully!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

    return <Navigate to={'/login'} />
  }

  return (
    <div>
      {error && <div>Some error</div>}
      <CreateNewPasswordForm onSubmit={createNewPasswordHandler} />
    </div>
  )
}
