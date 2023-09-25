import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'

import s from './profile.settings.module.scss'

import edit from '@/assets/icons/edit-pack.svg'
import profDefaultPicture from '@/assets/images/prof-picture.jpg'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import { useLogOutMutation, usePatchMeMutation } from '@/services/auth/auth.service.ts'

type Props = {
  isOpen: boolean
  closeModal: (isOpen: boolean) => void
}
export const ProfileSettings = ({ closeModal }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const { me } = useAppSelector(state => state.auth)
  const [photo, setPhoto] = useState<string | File>(me.avatar ? me.avatar : profDefaultPicture)
  const [name, setName] = useState<string>(me.name)
  const [email, setEmail] = useState<string>(me.email)
  const [isChangeNameInputOpen, setIsChangeNameInputOpen] = useState<boolean>(false)
  const [patchMe] = usePatchMeMutation()
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleBlurNameChange = () => {
    setIsChangeNameInputOpen(false)
  }

  useEffect(() => {
    patchMe({ name: name, email: email, avatar: me.avatar })
  }, [])
  const [logOut] = useLogOutMutation()
  const logOutButtonHandler = () => {
    logOut()
    closeModal(false)
  }
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = event => {
        const fileContentAsString = event.target?.result

        file && setPhoto(fileContentAsString as string)
      }

      reader.readAsText(file)
    }
  }
  // close when its click outside logic
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      closeModal(false)
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
      <div className={s.avatarContainer}>
        <img src={photo} className={s.avatar} alt="avatar" />
        <label htmlFor="avatarInput" className={s.editLabel}>
          <img src={edit} className={s.editIcon} alt="Edit" />
        </label>
        <input type="file" accept="image/*" id="avatarInput" onChange={handlePhotoChange} />
      </div>
      <div onClick={() => setIsChangeNameInputOpen(true)}>
        {isChangeNameInputOpen ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleBlurNameChange}
            autoFocus
          />
        ) : (
          <>
            <img src={edit} className={s.editIcon} alt="Edit" />
            <Typography variant={'h1'}>{name}</Typography>
          </>
        )}
      </div>
      <Typography className={s.email} variant={'caption'}>
        {email}
      </Typography>
      <Button variant={'secondary'} onClick={logOutButtonHandler}>
        <Typography variant={'subtitle2'}>Log Out</Typography>
      </Button>
    </div>
  )
}
