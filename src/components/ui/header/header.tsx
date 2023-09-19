import { useState } from 'react'

import s from './header.module.scss'

import logo from '@/assets/images/incubator_logo.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/header/drop-down-menu/drop-down-menu.tsx'
import {useAppDispatch} from "@/hooks";
import {useGetMeQuery, useLogOutMutation} from "@/services/auth/auth.service";

type Props = {
  name: string
  open?: boolean
}
export const Header = (props: Props) => {
  const { name, open } = props
  const [isAuthorized] = useState(true)
    const [logout]=useLogOutMutation()
const handler = () => {
    logout()
}
  return (
    <div className={s.container}>
      <img src={logo} className={s.logo} alt={'logotype'} />
      {!isAuthorized ? (
        <Button />
      ) : (
        <div className={s.profileContainer}>
          <div className={s.name}>{name}</div>
          <DropDownMenu name={name} email={'AA@gmail.com'} callback={handler} open={open} />
        </div>
      )}
    </div>
  )
}
