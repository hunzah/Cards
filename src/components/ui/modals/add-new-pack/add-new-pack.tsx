import { useState } from 'react'

import s from './add-new-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { TextField } from '@/components/ui/text-field'

type Props = {
  closeModalCallback: (isAddNewPackOpen: boolean) => void
  createNewPackCallback: (params: { name: string }) => void
}
export const AddNewPack = ({ closeModalCallback, createNewPackCallback }: Props) => {
  const [value, setValue] = useState<string>('')

  const inputHandler = (e: string) => {
    setValue(e)
  }

  return (
    <TemplateModal
      className={s.root}
      title="Add New Pack"
      buttonName="Add New Pack"
      closeModalCallback={closeModalCallback}
      mainActionCallback={createNewPackCallback}
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
        <Checkbox checked={true} onChange={() => {}} label={'Private pack'} />
      </div>
    </TemplateModal>
  )
}
