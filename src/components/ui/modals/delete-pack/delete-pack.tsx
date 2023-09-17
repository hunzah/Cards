import s from './delete-pack.module.scss'

import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/services/decks/decks.service.ts'

type Props = {
  closeModalCallback: (isAddNewPackOpen: boolean) => void
  createNewPackCallback: (params: { id: string }) => void
}
export const DeletePack = ({ closeModalCallback, id }: Props) => {
  const mainActionCallback = () => {
    useDeleteDeckMutation({ id: id })
  }

  return (
    <TemplateModal
      className={s.root}
      title="Delete Pack"
      buttonName="Delete Pack"
      closeModalCallback={closeModalCallback}
      mainActionCallback={mainActionCallback}
    >
      <Typography variant={'subtitle1'}>
        Do you really want to remove <Typography variant={'body1'}>Pack Name?</Typography>
        All cards will be deleted.
      </Typography>
    </TemplateModal>
  )
}
