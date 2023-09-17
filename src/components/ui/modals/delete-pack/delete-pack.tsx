import s from './delete-pack.module.scss'

import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import { useDeleteDeckMutation } from '@/services/decks/decks.service.ts'

type Props = {
  closeModalCallback: (isAddNewPackOpen: boolean) => void
}
export const DeletePack = ({ closeModalCallback }: Props) => {
  const [deleteDeck, { isLoading }] = useDeleteDeckMutation()
  const id = useAppSelector(state => state.decks.DeckId)
  const name = useAppSelector(state => state.decks.DeckName)

  const mainActionCallback = async () => {
    await deleteDeck({ id: id })
    closeModalCallback(false)
  }

  return (
    <TemplateModal
      className={s.root}
      title="Delete Pack"
      buttonName="Delete Pack"
      closeModalCallback={closeModalCallback}
      mainActionCallback={mainActionCallback}
    >
      <div className={s.content}>
        <Typography variant={'body1'} className={s.text}>
          Do you really want to remove{' '}
          <Typography variant={'subtitle1'} component={'span'}>
            {name}?
          </Typography>
        </Typography>
        <Typography variant={'body1'} className={s.text} component={'div'}>
          All cards will be deleted.
        </Typography>
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
