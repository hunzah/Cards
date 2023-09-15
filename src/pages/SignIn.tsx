import { SignInForm } from '@/components/auth/sing-in-form'
import {useGetMeQuery, useLoginMutation} from "@/services/auth/auth.service";
import {Navigate} from "react-router-dom";

const handleSubmit = (data: any) => {
  console.log(data)
}

export const SignIn = () => {
    const [login]=useLoginMutation()
    const {data:me, isloading:isme} = useGetMeQuery()

    if (isme)  return <div>LOADING</div>
    if (me && me?.success !== false)  return <Navigate to={"/"}/>

  return (
    <div>
      <SignInForm onSubmit={login} />
    </div>
  )
}
