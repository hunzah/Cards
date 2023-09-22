import { Navigate, useParams } from 'react-router-dom'

import { CreateNewPasswordForm } from '@/components/auth/create-new-password-form'
import { useResetPasswordMutation } from '@/services/auth/auth.service.ts'

export type PasswordData = {
  password: string
}
export const NewPasswordPage = () => {
  const { code } = useParams()
  const [resetPassword, { isSuccess, error }] = useResetPasswordMutation({})
  //b2c47eb9-50fa-427c-b53c-15fef4bdc92c

  const createNewPasswordHandler = (data: PasswordData) => {
    resetPassword({ token: code, password: data.password })
  }

  if (isSuccess) return <Navigate to={'/login'} />

  return (
    <div>
      {error && <div>Some error</div>}
      <CreateNewPasswordForm onSubmit={createNewPasswordHandler} />
    </div>
  )
}
