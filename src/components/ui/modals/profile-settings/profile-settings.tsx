import { ChangeEvent, useEffect, useRef, useState } from 'react'

import s from './profile.settings.module.scss'

import edit from '@/assets/icons/edit-pack.svg'
import { Button } from '@/components/ui/button'
import { InputTypeFile } from '@/components/ui/modals/profile-settings/InputTypeFile'
import { Typography } from '@/components/ui/typography'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useLogOutMutation, usePatchMeMutation } from '@/services/auth/auth.service.ts'
import { setMe } from '@/services/auth/auth.slice.ts'
import { PatchMeRequest } from '@/services/auth/auth.types'

type Props = {
  isOpen: boolean
  closeModal: (isOpen: boolean) => void
}
export const ProfileSettings = ({ closeModal }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const { me } = useAppSelector(state => state.auth)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const [name, setName] = useState<string>(me.name)
  const [isChangeNameInputOpen, setIsChangeNameInputOpen] = useState<boolean>(false)
  const [patchMe] = usePatchMeMutation()
  const [logOut] = useLogOutMutation()
  const dispatch = useAppDispatch()
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleBlurNameChange = () => {
    dispatch(setMe({ name: name }))
    patchMe({
      name: name,
      email: me.email,
    })
    setIsChangeNameInputOpen(false)
  }
  const logOutButtonHandler = () => {
    logOut()
    closeModal(false)
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

  const cutName = me.name.length > 10 ? `${me.name.slice(0, 10)}...` : me.name

  const addPhoto = (avatar: any) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('avatar', avatar)
    formData.append('email', me.email)

    patchMe(formData as unknown as PatchMeRequest)
  }

  return (
    <div className={s.root} ref={menuRef}>
      <Typography variant={'large'}>Personal information</Typography>
      <div className={s.avatarContainer}>
        <label htmlFor="avatarInput" className={s.editLabel}>
          <InputTypeFile addPhoto={addPhoto} photo={me.avatar} />
        </label>
      </div>
      <div onClick={() => setIsChangeNameInputOpen(true)}>
        {isChangeNameInputOpen ? (
          <input
            className={s.nameInput}
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleBlurNameChange}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleBlurNameChange()
              }
            }}
            autoFocus
          />
        ) : (
          <div className={s.nameAndEditContainer}>
            <Typography variant={'h1'}>{cutName}</Typography>
            <img src={edit} className={s.editNameIcon} alt="Edit" />
          </div>
        )}
      </div>
      <Typography className={s.email} variant={'caption'}>
        {me.email}
      </Typography>
      <Button variant={'secondary'} onClick={logOutButtonHandler}>
        <Typography variant={'subtitle2'}>Log Out</Typography>
      </Button>
    </div>
  )
}
