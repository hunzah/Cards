import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

import s from './cards-page.module.scss'

import backIcon from '@/assets/icons/back-arrow.svg'
import deletePackIcon from '@/assets/icons/delete-pack.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import {
  AddNewCard,
  Button,
  DeleteCard,
  DropDownMenuCard,
  EditCard,
  Loader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Typography,
} from '@/components'
import { useAppSelector } from '@/hooks.ts'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { useGetCardsFromDeckQuery, useGetDeckQuery } from '@/services/decks/decks.service.ts'
import {
  setAnswer,
  setCardId,
  setItemsPerPage,
  setQuestion,
  updateCurrentPage,
} from '@/services/decks/decks.slice.ts'
import { changerForTime } from '@/utils/func-helper/func-helper.ts'

export const CardsFromTheDeck = () => {
  const { deckId } = useParams()
  const { currentPage, itemsPerPage } = useAppSelector(state => state.decks)
  const { data: selectedDeck, status: deckStatus } = useGetDeckQuery({ id: deckId })
  const { data: cardsFromThisDeck, status: cardsStatus } = useGetCardsFromDeckQuery({
    id: deckId,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })
  const { data: me } = useGetMeQuery()
  const currentUrl = useLocation().pathname

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false)

  const dispatch = useDispatch()
  const closeAddCardModal = () => setIsAddModalOpen(false)
  const openAddCardModal = () => setIsAddModalOpen(true)
  const closeDeleteCardModal = () => setIsDeleteModalOpen(false)
  const closeEditCardModal = () => setIsEditModalOpen(false)
  const openDeleteCardModal = (cardId: string) => {
    dispatch(setCardId(cardId))
    setIsDeleteModalOpen(true)
  }
  const openEditCardModal = (cardId: string, question: string, answer: string) => {
    dispatch(setCardId(cardId))
    dispatch(setQuestion(question))
    dispatch(setAnswer(answer))
    setIsEditModalOpen(true)
  }

  // pagination logic
  const setCurrentPageHandler = (value: number) => dispatch(updateCurrentPage(value))
  const setItemsPerPageHandler = (value: number) => dispatch(setItemsPerPage(value))
  // pagination logic

  const isMyDeck = me?.id === selectedDeck?.userId

  if (deckStatus === 'pending' || cardsStatus === 'pending') {
    return <Loader />
  }

  return (
    <div className={s.cardsPage}>
      {isAddModalOpen && (
        <div className={s.modal}>
          <AddNewCard
            closeModalCallback={closeAddCardModal}
            id={deckId ? deckId : ''}
            isOpen={isAddModalOpen}
          />
        </div>
      )}
      {isEditModalOpen && (
        <div className={s.modal}>
          <EditCard closeModalCallback={closeEditCardModal} />
        </div>
      )}
      {isMyDeck && isDeleteModalOpen && (
        <div className={s.modal}>
          <DeleteCard closeModalCallback={closeDeleteCardModal} />
        </div>
      )}

      <Button className={s.backButton} variant={'link'} type={'link'} as={Link} to="/decks">
        <img src={backIcon} alt={'back-icon'}></img>
        Back to Packs List
      </Button>

      <div className={s.deckServices}>
        <div className={s.nameDeck}>
          <Typography component={'div'} variant={'large'}>
            {selectedDeck?.name}
          </Typography>
          {!!cardsFromThisDeck?.items.length && isMyDeck && cardsFromThisDeck && (
            <DropDownMenuCard
              cards={cardsFromThisDeck.items}
              callback={setIsDropDownMenuOpen}
              isOpen={isDropDownMenuOpen}
            />
          )}
        </div>
        <div>
          {!!cardsFromThisDeck?.items.length &&
            (isMyDeck ? (
              <div>
                <Button variant={'primary'} onClick={openAddCardModal}>
                  Add New Cards
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  style={{ textDecoration: 'none', color: 'white' }}
                  variant={'primary'}
                  as={Link}
                  to={`${currentUrl}/learn`}
                >
                  Learn to Pack
                </Button>
              </div>
            ))}
        </div>
      </div>

      {!cardsFromThisDeck?.items.length ? (
        <div className={s.deckEmpty}>
          <Typography className={s.textEmpryDecks} variant={'body1'}>
            <span>
              This pack is empty. {isMyDeck && <span>Click add new card to fill this pack</span>}
            </span>
          </Typography>
          <div className={s.buttonEmpryDecks}>
            {isMyDeck && (
              <Button variant={'primary'} onClick={openAddCardModal}>
                Add New Cards
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
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
              ))}
            </TableBody>
          </Table>

          {cardsFromThisDeck.pagination.totalItems > 10 && (
            <Pagination
              elements={cardsFromThisDeck?.pagination.totalItems ?? 0}
              setCurrentPage={setCurrentPageHandler}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPageHandler}
            />
          )}
        </>
      )}
    </div>
  )
}
