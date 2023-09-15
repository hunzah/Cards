import { SignInForm } from '@/components/auth/sing-in-form'
import {useGetMeQuery, useLoginMutation} from "@/services/auth/auth.service";
import {Navigate} from "react-router-dom";

const handleSubmit = (data: any) => {
  console.log(data)
}

export const SignIn = () => {
    const [login]=useLoginMutation()
    const {data} = useGetMeQuery()
    console.log(data)
    if (data?.success !== false)  return <Navigate to={"/"}/>

  return (
    <div>

      <SignInForm onSubmit={login} />
    </div>
  )
}
