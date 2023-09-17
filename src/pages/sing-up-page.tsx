import { Navigate } from 'react-router-dom'

import { SignUpForm } from '@/components/auth/sign-up-form'
import { useSingUpMutation } from '@/services/auth/auth.service.ts'
import { CustomerError } from '@/services/auth/auth.types.ts'

export const SingUpPage = () => {
  const [singUp, { data, isLoading, error }] = useSingUpMutation()

  if (isLoading) return <div>Loading</div>
  const doIt = (data: any) => {
    singUp(data)
  }

  console.log('data', data)
  if (data?.id) {
    return <Navigate to={'/login'} />
  }
  let newError

  if (error) {
    const err = error as CustomerError

    newError = <h1>{err.data.errorMessages[0]}</h1>
  }

  return (
    <div>
      {error && <div>{newError}</div>}
      <SignUpForm onSubmit={doIt} />
    </div>
  )
}
