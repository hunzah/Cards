import { Navigate } from 'react-router-dom'

import { SignInForm } from '@/components/auth/sing-in-form'
import { useGetMeQuery, useLoginMutation } from '@/services/auth/auth.service.ts'

export const SingInPage = () => {
  const [login] = useLoginMutation()
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <div>Loading from SingInPages...</div>
  if (me && me?.success !== false) return <Navigate to={'/'} />

  return (
    <div>
      <SignInForm onSubmit={login} />
    </div>
  )
}
