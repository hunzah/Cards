import s from './add-new-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { TextField } from '@/components/ui/text-field'

type Props = {
  closeModalCallback: (isAddNewPackOpen: boolean) => void
}
export const AddNewPack = ({ closeModalCallback }: Props) => {
  return (
    <TemplateModal
      className={s.root}
      title="Add New Pack"
      buttonName="Add New Pack"
      closeModalCallback={closeModalCallback}
    >
      <div className={s.content}>
        <TextField
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
