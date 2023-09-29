import deletePackIcon from '@/assets/icons/delete-pack.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import { TableCell, TableRow } from '@/components'
import s from '@/pages/cards-from-deck-page/cards-page.module.scss'
import { Card } from '@/services/decks/types.ts'
import { changerForTime } from '@/utils/func-helper/func-helper.ts'

type Props = {
  card: Card
  isMyDeck: boolean
  openEditCardModal: (id: string, question: string, answer: string) => void
  openDeleteCardModal: (id: string) => void
}

export const CardFromDeck = (props: Props) => {
  const { card, openEditCardModal, isMyDeck, openDeleteCardModal } = props

  return (
    <TableRow className={s.row}>
      <TableCell className={s.cell}>
        {card.questionImg && (
          <div className={s.img}>
            <img src={card.questionImg} alt="questionImg" />
          </div>
        )}
        {<div className={s.textQuesAnsw}>{card.question}</div>}
      </TableCell>
      <TableCell className={s.cell}>
        {card.answerImg && (
          <div className={s.img}>
            <img src={card.answerImg} alt="questionImg" />
          </div>
        )}
        {<div className={s.textQuesAnsw}>{card.answer}</div>}
      </TableCell>
      <TableCell className={s.cell}>{changerForTime(card.updated)}</TableCell>
      <TableCell className={s.cell}>{card.grade}</TableCell>
      <TableCell className={s.cell}>
        <div className={s.creatorWithButton}>
          <button
            onClick={() => openEditCardModal(card.id, card.question, card.answer)}
            className={s.iconBtns}
          >
            <img src={editPackIcon} alt="edit-pack-icon" />
          </button>
          <button
            disabled={!isMyDeck}
            onClick={() => openDeleteCardModal(card.id)}
            className={s.iconBtns}
          >
            <img src={deletePackIcon} alt="delete-pack-icon" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}
