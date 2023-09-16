import { useState } from 'react'

import s from './edit-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { TextField } from '@/components/ui/text-field'
import { useUpdateDeckMutation } from '@/services/decks/decks.service.ts'

type Props = {
  closeModalCallback: (isEditPackOpen: boolean) => void
  id: string
}
export const EditPack = ({ closeModalCallback, id }: Props) => {
  const [updateDeck] = useUpdateDeckMutation()
  const [value, setValue] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  const inputHandler = (e: string) => setValue(e)

  const checkboxHandler = (e: boolean) => setIsPrivate(e)

  const mainActionCallback = () => {
    updateDeck({ name: value, isPrivate: isPrivate })
    setValue('')
  }

  return (
    <TemplateModal
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
        <Checkbox checked={isPrivate} onChange={checkboxHandler} />
      </div>
    </TemplateModal>
  )
}
