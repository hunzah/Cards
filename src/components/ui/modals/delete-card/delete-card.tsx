import s from './delete-card.module.scss'

import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import { useDeleteCardMutation } from '@/services/decks/decks.service.ts'

type Props = {
  closeModalCallback: (value: boolean) => void
  name?: string
}
export const DeleteCard = ({ closeModalCallback, name }: Props) => {
  const [deleteDeck, { isLoading }] = useDeleteCardMutation()
  const cardId = useAppSelector(state => state.decks.cardId)
  const mainActionCallback = async () => {
    await deleteDeck({ id: cardId })
    closeModalCallback(false)
  }

  return (
    <TemplateModal
      className={s.root}
      title="Delete Card"
      buttonName="Delete Card"
      closeModalCallback={closeModalCallback}
      mainActionCallback={mainActionCallback}
    >
      <div className={s.content}>
        <Typography variant={'body1'} className={s.text}>
          Do you really want to remove
          <Typography variant={'subtitle1'} component={'span'}>
            {name}?
          </Typography>
        </Typography>
        <Typography variant={'body1'} className={s.text} component={'div'}>
          Card will be deleted.
        </Typography>
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
