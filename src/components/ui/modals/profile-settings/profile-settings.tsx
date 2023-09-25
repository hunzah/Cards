import { useEffect, useRef, useState } from 'react'

import s from './profile.settings.module.scss'

import profDefaultPicture from '@/assets/images/prof-picture.jpg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import { usePatchMeMutation } from '@/services/auth/auth.service.ts'

type Props = {
  isOpen: boolean
  closeModal: (isOpen: boolean) => void
}
export const ProfileSettings = ({ closeModal }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const { me } = useAppSelector(state => state.auth)
  const [patchMe, { data: patchMeData }] = usePatchMeMutation()
  const closeButtonHandler = () => closeModal(false)

  // close when its click outside logic
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      closeButtonHandler()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [clickedOutside])

  return (
    <div className={s.root} ref={menuRef}>
      <Typography variant={'large'}>Personal information</Typography>
      <img src={me.avatar ? me.avatar : profDefaultPicture} className={s.avatar} alt={'avatar'} />
      <Typography variant={'h1'}>{me.name}</Typography>
      <Typography variant={'body2'}>{me.email}</Typography>
      <Button onClick={closeButtonHandler} />
    </div>
  )
}
