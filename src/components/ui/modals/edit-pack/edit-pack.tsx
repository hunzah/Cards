import s from './edit-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { TextField } from '@/components/ui/text-field'

type Props = {
  closeModalCallback: (isEditPackOpen: boolean) => void
}
export const EditPack = ({ closeModalCallback }: Props) => {
  return (
    <TemplateModal
      className={s.root}
      title="Edit Pack"
      buttonName="Save Changes"
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
