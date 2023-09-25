import { useEffect, useRef, useState } from 'react'

import s from './drop-down-menu.module.scss'

import logOut from '@/assets/icons/log-out.svg'
import myProfIcon from '@/assets/icons/My-profile-icon.svg'
import profDefaultPicture from '@/assets/images/prof-picture.jpg'
import { Button } from '@/components/ui/button'
import { ProfileSettings } from '@/components/ui/modals/profile-settings'
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
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const { email, avatar } = useAppSelector(state => state.auth)
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

  function myProfileSettingOpen() {
    setIsSettingsOpen(true)
    setOpen(false)
  }

  return (
    <div ref={menuRef}>
      {isSettingsOpen && <ProfileSettings closeModal={setIsSettingsOpen} isOpen={isSettingsOpen} />}
      <img
        src={avatar ? avatar : profDefaultPicture}
        onClick={toggleMenu}
        className={s.avatar}
        alt={'avatar'}
      />
      {open && (
        <div className={s.menuContainer}>
          <ul className={s.itemsContainer}>
            <li className={s.infoContainer}>
              <img
                src={avatar ? avatar : profDefaultPicture}
                className={s.avatar}
                onClick={toggleMenu}
                alt={'avatar'}
              />
              <div className={s.nameAndEmailContainer}>
                <Typography variant={'subtitle2'}>{name}</Typography>
                <Typography className={s.email} variant={'caption'}>
                  {email}
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
