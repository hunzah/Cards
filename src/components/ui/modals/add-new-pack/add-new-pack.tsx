import { useEffect, useRef, useState } from 'react'

import s from './add-new-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation } from '@/services/decks/decks.service.ts'

type Props = {
  closeModalCallback: (isAddNewPackOpen: boolean) => void
}
export const AddNewPack = ({ closeModalCallback }: Props) => {
  const [createDeck, { isLoading }] = useCreateDeckMutation() // Добавляем isLoading из мутации
  const [value, setValue] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const inputHandler = (e: string) => setValue(e)

  const checkboxHandler = (e: boolean) => setIsPrivate(e)

  const mainActionCallback = async () => {
    await createDeck({ name: value, isPrivate: isPrivate })
    setValue('')
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
      className={s.root}
      title="Add New Pack"
      buttonName="Add New Pack"
      closeModalCallback={closeModalCallback}
      mainActionCallback={mainActionCallback}
      value={value}
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
