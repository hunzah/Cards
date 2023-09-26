import s from './delete-card.module.scss'

import { TemplateModal } from '@/components/ui/modals/template'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import { useDeleteCardMutation } from '@/services/decks/decks.service.ts'
import { useEffect, useRef, useState } from 'react'

type Props = {
  closeModalCallback: (value: boolean) => void
  name?: string
}
export const DeleteCard = ({ closeModalCallback, name }: Props) => {
  const [deleteDeck, { isLoading }] = useDeleteCardMutation()
  const cardId = useAppSelector(state => state.decks.cardId)
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const mainActionCallback = async () => {
    await deleteDeck({ id: cardId })
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
