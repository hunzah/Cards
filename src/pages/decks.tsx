import { useState } from 'react'

import s from '../../src/components/ui/table/table.module.scss'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import {
  useCreateDecksMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks'

type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const Decks = () => {
  const [sort, setSort] = useState<Sort>(null)
  const decks = useGetDecksQuery({
    orderBy: sort === null ? null : `${sort.key}-${sort.direction}`,
  })
  const [createDeck, createDeckLoading = { isLoading }] = useCreateDecksMutation()
  const isLoading = useGetDecksQuery()
  const [deleteDeck, deleteDeckLoading = { isLoading }] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  console.log(decks)
  if (decks.isLoading) {
    return <div>Loading....</div>
  }

  const onclickHandler = (key: string) => {
    if (sort && sort.key === key) {
      setSort(sort.direction === 'asc' ? { key, direction: 'desc' } : null)
    } else {
      setSort({
        key,
        direction: 'asc',
      })
    }
  }

  const deleteDeckHandler = ({ id }) => {
    deleteDeck({ id })
  }
  const updateDeckHandler = ({ id, params }) => {
    updateDeck({ id: { id }, params: { params } })
  }
  const sortArrow = (orderBy: string) => {
    if (!sort || sort.key !== orderBy) {
      return <span>•</span>
      if (sort.key !== orderBy) {
        ;<span>•</span>
      }
    }
    if ((sort.direction === 'asc') & (sort.key === orderBy)) {
      return <span>↑</span>
    }
    if ((sort.direction === 'desc') & (sort.key === orderBy)) {
      return <span>↓</span>
    }
  }

  return (
    <div>
      {deleteDeckLoading.isLoading ? (
        <div style={{ position: 'fixed', left: '250px' }}>DELETING</div>
      ) : (
        ''
      )}
      {createDeckLoading.isLoading ? (
        <div style={{ position: 'fixed', left: '300px' }}>CREATING</div>
      ) : (
        ''
      )}

      <Button onClick={() => createDeck({ name: 'deckname' })}> create deck</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell onClick={() => onclickHandler('name')}>
              {' '}
              {sortArrow('name')} Name
            </TableHeadCell>
            <TableHeadCell onClick={() => onclickHandler('cardsCount')}>
              {sortArrow('cardsCount')} Cards
            </TableHeadCell>
            <TableHeadCell onClick={() => onclickHandler('updated')}>
              {sortArrow('updated')} Updated
            </TableHeadCell>
            <TableHeadCell onClick={() => onclickHandler('created')}>
              {sortArrow('created')} created by
            </TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {decks.data.items.map(deck => {
            return (
              <TableRow key={deck.id}>
                <TableCell>{deck.name}</TableCell>
                <TableCell>{deck.cardsCount}</TableCell>
                <TableCell>{deck.updated}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
                <TableCell>
                  <div className={s.creatorWithButton}>
                    <Button onClick={() => deleteDeckHandler({ id: deck.id })}>delete</Button>
                    <Button
                      onClick={() =>
                        updateDeckHandler({
                          id: deck.id,
                          params: { name: 'NEW1NAME' },
                        })
                      }
                    >
                      edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* <Table>
            <TableHead>
                <TableRow><TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Cards</TableHeadCell>
                    <TableHeadCell>Updated</TableHeadCell>
                    <TableHeadCell>created by</TableHeadCell></TableRow>
            </TableHead>
            <TableBody>{decks.data?.items.map(deck => {
                return (
                    <TableRow key={deck.id}>
                        <TableCell>{deck.name}</TableCell>
                        <TableCell>{deck.cardsCount}</TableCell>
                        <TableCell>{deck.updated}</TableCell>
                        <TableCell>{deck.author.name}</TableCell>
                    </TableRow>)
            })}</TableBody>
        </Table>*/}
    </div>
  )
}
//TODO : надо каждой колонке задать свою ширину. что такое IS! ыыы
