import { useEffect, useRef, useState } from 'react'

import s from './drop-down-menu.module.scss'

import myProfIcon from '@/assets/icons/My-profile-icon.svg'
import profDefaultPicture from '@/assets/images/prof-picture.jpg'
import { Button } from '@/components/ui/button'
import { ProfileSettings } from '@/components/ui/modals/profile-settings'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks'
import { useLogOutMutation } from '@/services/auth/auth.service.ts'

type Props = {
  avatar?: string
  open?: boolean
  setOpen: (open: boolean) => void
}
export const DropDownMenu = (props: Props) => {
  const { open, setOpen } = props
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const me = useAppSelector(state => state.auth.me)
  const menuRef = useRef<HTMLDivElement>(null)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const [logOut] = useLogOutMutation()
  // close when its click outside logic
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      setOpen(false)
    }
  }
  const logOutButtonHandler = () => {
    logOut()
    setOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [clickedOutside])
  const toggleMenu = () => {
    setOpen(!open)
  }

  function myProfileSettingOpen() {
    setIsSettingsOpen(true)
    setOpen(false)
  }

  const cutName = me.name.length > 10 ? `${me.name.slice(0, 10)}...` : me.name

  return (
    <div ref={menuRef}>
      {isSettingsOpen && <ProfileSettings closeModal={setIsSettingsOpen} isOpen={isSettingsOpen} />}
      <img
        src={me.avatar ? me.avatar : profDefaultPicture}
        onClick={toggleMenu}
        className={s.avatar}
        alt={'avatar'}
      />
      {open && (
        <div className={s.menuContainer}>
          <ul className={s.itemsContainer}>
            <li className={s.infoContainer}>
              <img
                src={me.avatar ? me.avatar : profDefaultPicture}
                className={s.avatar}
                onClick={toggleMenu}
                alt={'avatar'}
              />
              <div className={s.nameAndEmailContainer}>
                <Typography variant={'subtitle2'}>{cutName}</Typography>
                <Typography className={s.email} variant={'caption'}>
                  {me.email}
                </Typography>
              </div>
            </li>
            <li className={s.rectangle}></li>
            <li>
              <Button
                onClick={myProfileSettingOpen}
                className={s.button}
                variant="secondary"
                img={myProfIcon}
              >
                <Typography variant={'caption'}>My Profile</Typography>
              </Button>
            </li>
            <li className={s.rectangle}></li>
            <li>
              <img src={''} alt={'logOut'} />
              <Button
                as={'a'}
                className={s.button}
                variant="secondary"
                onClick={logOutButtonHandler}
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
