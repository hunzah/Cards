import { useEffect, useRef, useState } from 'react'

import s from './edit-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template'
import { TextField } from '@/components/ui/text-field'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useUpdateDeckMutation } from '@/services/decks/decks.service.ts'
import { setDeckName, setDeckPrivacy } from '@/services/decks/decks.slice.ts'

type Props = {
  closeModalCallback: (isEditPackOpen: boolean) => void
}
export const EditPack = ({ closeModalCallback }: Props) => {
  const [updateDeck, { isLoading }] = useUpdateDeckMutation()
  const {
    DeckId: id,
    DeckPrivacy: isPrivate,
    DeckName: value,
  } = useAppSelector(state => state.decks)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const inputHandler = (e: string) => dispatch(setDeckName(e))

  const checkboxHandler = (e: boolean) => dispatch(setDeckPrivacy(e))

  const mainActionCallback = async () => {
    await updateDeck({ id: id, params: { name: value, isPrivate: isPrivate } })
    setDeckName('')
    closeModalCallback(false)
  }
  //logic to close the modal when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
      closeModalCallback(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [clickedOutside])

  return (
    <TemplateModal
      ref={menuRef}
      value={value}
      className={s.root}
      title="Edit Pack"
      buttonName="Save Changes"
      closeModalCallback={closeModalCallback}
      mainActionCallback={mainActionCallback}
    >
      <div className={s.content}>
        <TextField
          value={value}
          onChangeValue={inputHandler}
          inputName="Name Pack"
          inputIsSearch={false}
          inputType={'text'}
          placeholder={'Name'}
          className={s.input}
        />
        <Checkbox checked={isPrivate} onChange={checkboxHandler} label="Private pack" />
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
