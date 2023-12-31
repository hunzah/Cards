import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

import s from './cards-page.module.scss'

import backIcon from '@/assets/icons/back-arrow.svg'
import {
  AddNewCardWithForm,
  Button,
  DeleteCard,
  DropDownMenuCard,
  EditCardWithForm,
  Loader,
  Pagination,
  Typography,
} from '@/components'
import { useAppSelector } from '@/hooks.ts'
import { CardFromDeck } from '@/pages/cards-from-deck-page/card-from-deck'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { setEditCardModalIsOpen } from '@/services/cards/cards.slice.ts'
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
  const editCardModalIsOpen = useAppSelector(state => state.cards.editCardModalIsOpen)
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
  //const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false)

  const dispatch = useDispatch()
  const closeAddCardModal = () => setIsAddModalOpen(false)
  const openAddCardModal = () => setIsAddModalOpen(true)
  const closeDeleteCardModal = () => setIsDeleteModalOpen(false)
  // const closeEditCardModal = () => setIsEditModalOpen(false)
  const openDeleteCardModal = (cardId: string) => {
    dispatch(setCardId(cardId))
    setIsDeleteModalOpen(true)
  }
  const openEditCardModal = (cardId: string, question: string, answer: string) => {
    dispatch(setCardId(cardId))
    dispatch(setQuestion(question))
    dispatch(setAnswer(answer))
    dispatch(setEditCardModalIsOpen(false))
    //setIsEditModalOpen(true)
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
          <AddNewCardWithForm
            closeModalCallback={closeAddCardModal}
            id={deckId ? deckId : ''}
            isOpen={isAddModalOpen}
          />
        </div>
      )}
      {editCardModalIsOpen && (
        <div className={s.modal}>
          <EditCardWithForm closeModalCallback={() => {}} />
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
          <CardFromDeck
            cardsFromThisDeck={cardsFromThisDeck}
            openEditCardModal={openEditCardModal}
            isMyDeck={isMyDeck}
            openDeleteCardModal={openDeleteCardModal}
          />
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
