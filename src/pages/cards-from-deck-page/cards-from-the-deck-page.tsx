import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './cards-page.module.scss'

import { Button } from '@/components/ui/button'
import { DropDownMenuCard } from '@/components/ui/drop-down-menu-card/drop-down-menu-card.tsx'
import { AddNewCard } from '@/components/ui/modals/add-new-card/add-new-card.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { useGetCardsFromDeckQuery, useGetDeckQuery } from '@/services/decks/decks.service.ts'

export const CardsFromTheDeck = () => {
  const { deckId } = useParams()

  const { data: selectedDeck } = useGetDeckQuery({ id: deckId })
  const { data: cardsFromThisDeck } = useGetCardsFromDeckQuery({ id: deckId })
  const { data: me } = useGetMeQuery()

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false)
  const closeDropDownMenu = () => setIsDropDownMenuOpen(false)
  const openDropDownMenu = () => setIsDropDownMenuOpen(true)
  const closeAddCardModal = () => setIsAddModalOpen(false)
  const openAddCardModal = () => setIsAddModalOpen(true)
  const closeDeleteCardModal = () => setIsDeleteModalOpen(false)
  const openDeleteCardModal = () => setIsDeleteModalOpen(true)

  const isMyDeck = me?.id === selectedDeck?.userId

  // const isYourDeck = me.

  return (
    <div>
      <div>
        <Button type={'link'} as={Link} to="/decks">
          Back to Packs List
        </Button>
        <Button variant={'primary'} onClick={openAddCardModal}>
          Add New Cards
        </Button>
        <Button variant={'primary'} onClick={openAddCardModal}>
          Add New Cards
        </Button>
      </div>
      {isAddModalOpen && (
        <div className={s.modal}>
          <AddNewCard closeModalCallback={closeAddCardModal} id={deckId ? deckId : ''} />
        </div>
      )}
      {isDeleteModalOpen && (
        <div className={s.modal}>
          <AddNewCard closeModalCallback={closeAddCardModal} id={deckId ? deckId : ''} />
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
          <div>
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
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
