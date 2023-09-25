import { useEffect, useRef, useState } from 'react'

import s from './profile.settings.module.scss'

import { Button } from '@/components/ui/button'
import { usePatchMeMutation } from '@/services/auth/auth.service.ts'
import { useAppSelector } from '@/hooks.ts'

type Props = {
  isOpen: boolean
  closeModal: (isOpen: boolean) => void
}
export const ProfileSettings = ({ closeModal }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const { name, email, avatar } = useAppSelector(state => state.auth)
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
      aaaaa
      <Button onClick={closeButtonHandler} />
    </div>
  )
}
