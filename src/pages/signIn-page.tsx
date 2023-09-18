import { Navigate } from 'react-router-dom'

import { SignInForm } from '@/components/auth/sing-in-form'
import { useGetMeQuery, useLoginMutation } from '@/services/auth/auth.service.ts'
import {setMeUserId} from "@/services/auth/auth.slice";
import {useAppDispatch} from "@/hooks";

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <div>isMeLoading</div>
  if (me && me?.success !== false) {

    return <Navigate to={'/'}/>
  }

  return (
    <div>
      <SignInForm onSubmit={login} />
    </div>
  )
}
