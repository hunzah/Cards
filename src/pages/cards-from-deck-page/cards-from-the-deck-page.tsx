import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import s from './cards-page.module.scss'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import { Button } from '@/components/ui/button'
import { DropDownMenuCard } from '@/components/ui/drop-down-menu-card/drop-down-menu-card.tsx'
import { AddNewCard } from '@/components/ui/modals/add-new-card/add-new-card.tsx'
import { DeleteCard } from '@/components/ui/modals/delete-card/delete-card.tsx'
import { EditCard } from '@/components/ui/modals/edit-card/edit-card.tsx'
import { Pagination } from '@/components/ui/pagination/pagination.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { useAppSelector } from '@/hooks.ts'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { useGetCardsFromDeckQuery, useGetDeckQuery } from '@/services/decks/decks.service.ts'
import {
  setAnswer,
  setCardId,
  setDeckCards,
  setItemsPerPage,
  setQuestion,
  updateCurrentPage,
} from '@/services/decks/decks.slice.ts'

export const CardsFromTheDeck = () => {
  const { deckId } = useParams()
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)

  const { data: selectedDeck } = useGetDeckQuery({ id: deckId })
  const { data: cardsFromThisDeck } = useGetCardsFromDeckQuery({
    id: deckId,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })
  const { data: me } = useGetMeQuery()

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setDeckCards(cardsFromThisDeck ? cardsFromThisDeck.items : []))
  }, [])

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

  // const isYourDeck = me.

  return (
    <div className={s.cardsPage}>
      {isAddModalOpen && (
        <div className={s.modal}>
          <AddNewCard closeModalCallback={closeAddCardModal} id={deckId ? deckId : ''} />
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

      <div className={s.back}>
        <Button className={s.backButton} variant={'link'} type={'link'} as={Link} to="/decks">
          Back to Packs List
        </Button>
      </div>
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
                  variant={'primary'}
                  onClick={() => {
                    alert('Learn to Pack')
                  }}
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
              <TableRow>
                <TableHeadCell>Question</TableHeadCell>
                <TableHeadCell>Answer</TableHeadCell>
                <TableHeadCell>Last Updated</TableHeadCell>
                <TableHeadCell>Grade</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardsFromThisDeck.items.map(card => (
                <TableRow key={card.id}>
                  <TableCell>{card.question}</TableCell>
                  <TableCell>{card.answer}</TableCell>
                  <TableCell>{card.updated}</TableCell>
                  <TableCell>{card.grade}</TableCell>
                  <TableCell>
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
