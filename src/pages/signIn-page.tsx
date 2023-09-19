import { Navigate } from 'react-router-dom'

import { SignInForm } from '@/components/auth/sing-in-form'
import { useGetMeQuery, useLoginMutation } from '@/services/auth/auth.service.ts'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <div>isMeLoading</div>
  if (me && me?.success !== false) return <Navigate to={'/decks'} />

  return (
    <div>
      <SignInForm onSubmit={login} />
    </div>
  )
}
