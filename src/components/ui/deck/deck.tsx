import { useNavigate } from 'react-router-dom'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import playPackIcon from '@/assets/icons/play-pack.svg'
import { TableCell, TableRow } from '@/components'
import { useAppDispatch } from '@/hooks.ts'
import s from '@/pages/decks-page/decks-page.module.scss'
import {
  setDeckId,
  setDeckName,
  setDeckPrivacy,
  updateCurrentPage,
} from '@/services/decks/decks.slice.ts'
import { changerForTime } from '@/utils/func-helper/func-helper.ts'

export const Deck = ({ deck, me, setIsEditPackModalOpen, setIsDeletePackModalOpen }: any) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const goToDeck = (id: string, DeckName: string, isPrivate: boolean) => {
    dispatch(setDeckId(id))
    dispatch(setDeckName(DeckName))
    dispatch(setDeckPrivacy(isPrivate))
    dispatch(updateCurrentPage(1))

    return navigate(`/decks/${id}`)
  }

  const openEditPackHandler = (id: string, isPrivate: boolean, name: string) => {
    setIsEditPackModalOpen(true)
    dispatch(setDeckId(id))
    dispatch(setDeckPrivacy(isPrivate))
    dispatch(setDeckName(name))
  }

  const openPlayCardModal = (id: string) => {
    navigate(`/decks/${id}/learn`)
  }

  const openDeletePackHandler = (id: string, name: string) => {
    setIsDeletePackModalOpen(true)
    dispatch(setDeckId(id))
    dispatch(setDeckName(name))
  }

  return (
    <TableRow key={deck.id} className={s.row}>
      <TableCell onClick={() => goToDeck(deck.id, deck.name, deck.isPrivate)}>
        {deck.name}
      </TableCell>
      <TableCell onClick={() => goToDeck(deck.id, deck.name, deck.isPrivate)}>
        {deck.cardsCount}
      </TableCell>
      <TableCell onClick={() => goToDeck(deck.id, deck.name, deck.isPrivate)}>
        {changerForTime(deck.updated)}
      </TableCell>
      <TableCell onClick={() => goToDeck(deck.id, deck.name, deck.isPrivate)}>
        {deck.author.name}
      </TableCell>
      <TableCell>
        <div className={s.creatorWithButton}>
          <button className={s.iconBtns} onClick={() => openPlayCardModal(deck.id)}>
            <img src={playPackIcon} alt="delete-pack-icon" />
          </button>
          <button
            disabled={!(me?.id === deck.author.id)}
            onClick={() => openEditPackHandler(deck.id, deck.isPrivate, deck.name)}
            className={s.iconBtns}
          >
            <img src={editPackIcon} alt="edit-pack-icon" />
          </button>
          <button
            disabled={!(me?.id === deck.author.id)}
            onClick={() => openDeletePackHandler(deck.id, deck.name)}
            className={s.iconBtns}
          >
            <img src={deletePackIcon} alt="delete-pack-icon" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}
