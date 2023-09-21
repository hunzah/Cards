import { useState } from 'react'

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
    <div>
      <div>
        <Button type={'link'} as={Link} to="/decks">
          Back to Packs List
        </Button>
      </div>
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
      <Typography variant={'h1'}>{selectedDeck?.name}</Typography>
      <div>
        {cardsFromThisDeck?.items.length ? (
          ''
        ) : (
          <Typography variant={'subtitle1'}>
            This pack is empty. {isMyDeck && <span>Click add new card to fill this pack</span>}
          </Typography>
        )}
        {isMyDeck ? (
          <div style={{ marginLeft: '100px' }}>
            <DropDownMenuCard callback={setIsDropDownMenuOpen} isOpen={isDropDownMenuOpen} />
            <Button variant={'primary'} onClick={openAddCardModal}>
              Add New Cards
            </Button>
          </div>
        ) : (
          <Button
            variant={'primary'}
            onClick={() => {
              alert('Learn to Pack')
            }}
          >
            Learn to Pack
          </Button>
        )}
      </div>

      {!cardsFromThisDeck?.items.length ? (
        ''
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Question</TableHeadCell>
              <TableHeadCell>Answer</TableHeadCell>
              <TableHeadCell>Last Updated</TableHeadCell>
              <TableHeadCell>Grade</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardsFromThisDeck?.items?.map(card => {
              return (
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
              )
            })}
          </TableBody>
        </Table>
      )}
      <Pagination
        elements={cardsFromThisDeck?.pagination.totalItems ?? 0}
        setCurrentPage={setCurrentPageHandler}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPageHandler}
      />
    </div>
  )
}
