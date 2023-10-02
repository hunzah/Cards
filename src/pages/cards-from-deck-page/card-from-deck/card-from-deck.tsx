import { useDispatch } from 'react-redux'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/components'
import s from '@/pages/cards-from-deck-page/cards-page.module.scss'
import {
  setAnswerCard,
  setAnswerImgCard,
  setCardIdFromDeck,
  setEditCardModalIsOpen,
  setQuestionCard,
  setQuestionImgCard,
} from '@/services/cards/cards.slice.ts'
import { Card, CardsFromDeckResponse } from '@/services/decks/types.ts'
import { changerForTime } from '@/utils/func-helper/func-helper.ts'

type Props = {
  cardsFromThisDeck: CardsFromDeckResponse
  isMyDeck: boolean
  openEditCardModal: (id: string, question: string, answer: string) => void
  openDeleteCardModal: (id: string) => void
}

export const CardFromDeck = (props: Props) => {
  const { cardsFromThisDeck, isMyDeck, openDeleteCardModal } = props
  const dispatch = useDispatch()

  const openEditCardModalHandler = (card: Card) => {
    dispatch(setEditCardModalIsOpen(true))
    dispatch(setCardIdFromDeck(card.id))
    dispatch(setQuestionCard(card.question))
    dispatch(setAnswerCard(card.answer))
    dispatch(setQuestionImgCard(card.questionImg))
    dispatch(setAnswerImgCard(card.answerImg))
  }

  return (
    <Table className={s.tableCards}>
      <TableHead>
        <TableRow className={s.row}>
          <TableHeadCell className={s.HeadCell}>Question</TableHeadCell>
          <TableHeadCell className={s.HeadCell}>Answer</TableHeadCell>
          <TableHeadCell className={s.HeadCell}>Last Updated</TableHeadCell>
          <TableHeadCell className={s.HeadCell}>Grade</TableHeadCell>
          <TableHeadCell className={s.HeadCell}></TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cardsFromThisDeck.items.map(card => (
          <TableRow key={card.id} className={s.row}>
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
                <button onClick={() => openEditCardModalHandler(card)} className={s.iconBtns}>
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
        ))}
      </TableBody>
    </Table>
  )
}
