import { useState } from 'react'

import s from './add-new-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { TextField } from '@/components/ui/text-field'
import { DecksPostParams } from '@/services/decks/types.ts'

type Props = {
  closeModalCallback: (isAddNewPackOpen: boolean) => void
  createNewPackCallback: (params: DecksPostParams) => void
}
export const AddNewPack = ({ closeModalCallback, createNewPackCallback }: Props) => {
  const [value, setValue] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  const inputHandler = (e: string) => setValue(e)

  const checkboxHandler = (e: boolean) => setIsPrivate(e)

  const mainActionCallback = () => {
    createNewPackCallback({ name: value, isPrivate: isPrivate })
    setValue('')
  }

  return (
    <TemplateModal
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
        <Checkbox checked={isPrivate} onChange={checkboxHandler} />
      </div>
    </TemplateModal>
  )
}
