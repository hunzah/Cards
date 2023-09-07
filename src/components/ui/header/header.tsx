import { useState } from 'react'

import s from './header.module.scss'

import logo from '@/assets/images/incubator_logo.png'
import { Button } from '@/components/ui/button'
import { DropDownMenu } from '@/components/ui/header/drop-down-menu/drop-down-menu.tsx'

type Props = {
  name: string
}
export const Header = (props: Props) => {
  const { name } = props
  const [isAuthorized] = useState(true)

  return (
    <div className={s.container}>
      <img src={logo} className={s.logo} />
      {!isAuthorized ? (
        <Button />
      ) : (
        <div className={s.profileContainer}>
          <div className={s.name}>{name}</div>
          <DropDownMenu name={name} email={'AA@gmail.com'} />
        </div>
      )}
    </div>
  )
}
