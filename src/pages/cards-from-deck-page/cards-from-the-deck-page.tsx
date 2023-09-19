import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
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
import {
  useCreateCardMutation,
  useGetCardsFromDeckQuery,
  useGetDeckQuery,
} from '@/services/decks/decks.service.ts'

export const CardsFromTheDeck = () => {
  const { deckId } = useParams()

  const { data: selectedDeck } = useGetDeckQuery({ id: deckId })
  const { data: cardsFromThisDeck } = useGetCardsFromDeckQuery({ id: deckId })
  const [createCard] = useCreateCardMutation()
  const { data: me } = useGetMeQuery()

  console.log('cardsFromThisDeck', cardsFromThisDeck)
  console.log('selectedDeck', selectedDeck)
  console.log('me', me)

  const isMyDeck = me?.id === selectedDeck?.userId
  const addNewCard = () => {
    console.log('aaa')
    createCard({ id: deckId })
  }
  // const isYourDeck = me.

  return (
    <div>
      <div>
        <Button type={'link'} as={Link} to="/decks">
          Back to Packs List
        </Button>
        <Button variant={'primary'} onClick={addNewCard}>
          Add New Cards
        </Button>
      </div>
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
          <Button variant={'primary'} onClick={addNewCard}>
            Add New Cards
          </Button>
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
