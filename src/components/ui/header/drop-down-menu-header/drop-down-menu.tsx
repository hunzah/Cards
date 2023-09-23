import { useEffect, useRef, useState } from 'react'

import s from './drop-down-menu.module.scss'

import logOut from '@/assets/icons/log-out.svg'
import myProfIcon from '@/assets/icons/My-profile-icon.svg'
import avatarTest from '@/assets/images/avatar.svg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks'

type Props = {
  avatar?: string
  name?: string
  open?: boolean
  callback: () => void
  setOpen: (open: boolean) => void
}
export const DropDownMenu = (props: Props) => {
  const { name, open, callback, setOpen } = props
  const email = useAppSelector(state => state.auth.email)
  const menuRef = useRef<HTMLDivElement>(null)

  const [clickedOutside, setClickedOutside] = useState<boolean>(false)

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    if (open && clickedOutside) {
      setClickedOutside(false)
    }
  }, [open, clickedOutside])
  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <div ref={menuRef}>
      <img src={avatarTest} onClick={toggleMenu} className={s.avatar} alt={'avatar'} />
      {open && (
        <div className={s.menuContainer}>
          <ul className={s.itemsContainer}>
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
        </div>
      )}
    </div>
  )
}
