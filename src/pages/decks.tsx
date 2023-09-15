import { useState } from 'react'

import s from '../../src/components/ui/table/table.module.scss'

import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination/pagination.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks'

type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sort, setSort] = useState<Sort | null>(null)
  const orderBy = sort !== null ? `${sort.key}-${sort.direction}` : undefined // Use undefined when sort is null

  const decks = useGetDecksQuery({
    orderBy: orderBy,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })
  const [createDeck, createDeckLoading] = useCreateDeckMutation()
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

  const deleteDeckHandler = ({ id }: { id: string }) => {
    deleteDeck({ id })
  }
  const updateDeckHandler = ({ id, params }: { id: string; params: any }) => {
    updateDeck({ id: { id }, params: { params } })
  }
  const sortArrow = (orderBy: string) => {
    if (!sort || sort.key !== orderBy) {
      return <span>•</span>
    }
    if (sort.direction === 'asc' && sort.key === orderBy) {
      return <span>↑</span>
    }
    if (sort.direction === 'desc' && sort.key === orderBy) {
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
          {decks.data?.items.map(deck => {
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
      <Pagination
        elements={decks.data?.pagination.totalItems ?? 0}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {/*<Table>*/}
      {/*  <TableHead>*/}
      {/*    <TableRow>*/}
      {/*      <TableHeadCell>Name</TableHeadCell>*/}
      {/*      <TableHeadCell>Cards</TableHeadCell>*/}
      {/*      <TableHeadCell>Updated</TableHeadCell>*/}
      {/*      <TableHeadCell>created by</TableHeadCell>*/}
      {/*    </TableRow>*/}
      {/*  </TableHead>*/}
      {/*  <TableBody>*/}
      {/*    {decks.data?.items.map(deck => {*/}
      {/*      return (*/}
      {/*        <TableRow key={deck.id}>*/}
      {/*          <TableCell>{deck.name}</TableCell>*/}
      {/*          <TableCell>{deck.cardsCount}</TableCell>*/}
      {/*          <TableCell>{deck.updated}</TableCell>*/}
      {/*          <TableCell>{deck.author.name}</TableCell>*/}
      {/*        </TableRow>*/}
      {/*      )*/}
      {/*    })}*/}
      {/*  </TableBody>*/}
      {/*</Table>*/}
    </div>
  )
}
//TODO : надо каждой колонке задать свою ширину. что такое IS! ыыы
