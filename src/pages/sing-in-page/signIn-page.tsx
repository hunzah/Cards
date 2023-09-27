import { Navigate } from 'react-router-dom'

import { SignInForm } from '@/components'
import { useGetMeQuery, useLoginMutation } from '@/services/auth/auth.service.ts'
import { GeneralErrorType, handleApiError } from '@/utils/error-helpers/error-helpers.ts'

export const SignInPage = () => {
  const [login, { error }] = useLoginMutation()
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <div>isMeLoading</div>
  if (me && me?.success !== false) return <Navigate to={'/decks'} />

  if (error) {
    const err = error as GeneralErrorType

    handleApiError(err)
  }

  return (
    <div>
      <SignInForm onSubmit={login} />
    </div>
  )
}
