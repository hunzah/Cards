import { useState } from 'react'

import s from './header.module.scss'

import logo from '@/assets/images/incubator_logo.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/header/drop-down-menu-header/drop-down-menu.tsx'
import { useAppSelector } from '@/hooks'
import { useLogOutMutation } from '@/services/auth/auth.service'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const name = useAppSelector(state => state.auth.name)
  const [isAuthorized] = useState(true)
  const [logout] = useLogOutMutation()

  const handler = () => {
    logout({})
  }

  return (
    <div className={s.container}>
      <img src={logo} className={s.logo} alt={'logotype'} />
      {!isAuthorized ? (
        <Button />
      ) : (
        <div className={s.profileContainer}>
          <div className={s.name}>{name}</div>
          <DropDownMenu name={name} callback={handler} open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  )
}
