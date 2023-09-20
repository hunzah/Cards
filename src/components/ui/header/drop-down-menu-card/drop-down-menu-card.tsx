import { useState } from 'react'

import s from './drop-down-menu-card.module.scss'

import logOut from '@/assets/icons/log-out.svg'
import myProfIcon from '@/assets/icons/My-profile-icon.svg'
import avatarTest from '@/assets/images/avatar.svg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  avatar?: string
  name?: string
  email?: string
  open?: boolean
  callback: () => void
}
export const DropDownMenuCard = (props: Props) => {
  const { name, email, open, callback } = props
  const [isMenuOpen, setIsMenuOpen] = useState(open ? open : false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div>
      <img src={avatarTest} onClick={toggleMenu} className={s.avatar} alt={'avatar'} />
      {isMenuOpen && (
        <ul className={s.menuContainer}>
          <li className={s.infoContainer}>
            <img src={avatarTest} onClick={toggleMenu} alt={'avatar'} />
            <div className={s.nameAndEmailContainer}>
              <Typography variant={'subtitle2'}>{name}</Typography>
              <Typography className={s.email} variant={'caption'}>
                {email}
              </Typography>
            </div>
          </li>
          <li className={s.rectangle}></li>
          <li>
            <Button as={'a'} className={s.button} variant="secondary" img={myProfIcon}>
              <Typography variant={'caption'}>My Profile</Typography>
            </Button>
          </li>
          <li className={s.rectangle}></li>
          <li>
            <Button
              as={'a'}
              className={s.button}
              onClick={callback}
              variant="secondary"
              img={logOut}
            >
              <Typography variant={'caption'}>Sign Out</Typography>
            </Button>
          </li>
        </ul>
      )}
    </div>
  )
}
