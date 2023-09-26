import { useState } from 'react'

import s from './header.module.scss'

import logo from '@/assets/images/incubator_logo.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/header/drop-down-menu-header/drop-down-menu.tsx'
import { useAppSelector } from '@/hooks'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const me = useAppSelector(state => state.auth.me)
  const [isAuthorized] = useState(true)

  const cutName = me.name.length > 10 ? `${me.name.slice(0, 10)}...` : me.name

  return (
    <div className={s.container}>
      <img src={logo} className={s.logo} alt={'logotype'} />
      {!isAuthorized ? (
        <Button />
      ) : (
        <div className={s.profileContainer}>
          <div className={s.name}>{cutName}</div>
          <DropDownMenu open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  )
}
