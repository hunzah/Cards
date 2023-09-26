import { Navigate } from 'react-router-dom'

import { SignUpForm } from '@/components/auth/sign-up-form'
import { useSingUpMutation } from '@/services/auth/auth.service.ts'
import { GeneralErrorType, handleApiError } from '@/utils/error-helpers/error-helpers.ts'

export const SingUpPage = () => {
  const [singUp, { data, isLoading, error }] = useSingUpMutation()

  if (isLoading) return <div>Loading</div>
  const doIt = (data: any) => {
    singUp(data)
  }

  if (data?.id) {
    return <Navigate to={'/login'} />
  }

  if (error) {
    const err = error as GeneralErrorType

    handleApiError(err)
  }

  return (
    <div>
      <SignUpForm onSubmit={doIt} />
    </div>
  )
}
