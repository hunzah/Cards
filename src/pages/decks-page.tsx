import { useState } from 'react'

import s from '../../src/components/ui/table/table.module.scss'

import { Button } from '@/components/ui/button'
import { AddNewPack } from '@/components/ui/modals/add-new-pack/add-new-pack.tsx'
import { DeletePack } from '@/components/ui/modals/delete-pack/delete-pack.tsx'
import { EditPack } from '@/components/ui/modals/edit-pack/edit-pack.tsx'
import { Pagination } from '@/components/ui/pagination/pagination.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useAppDispatch } from '@/hooks.ts'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '@/services/decks/decks.service.ts'
import { setDeckId, setDeckName } from '@/services/decks/decks.slice.ts'

type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sort, setSort] = useState<Sort | null>(null)
  const orderBy = sort !== null ? `${sort.key}-${sort.direction}` : undefined
  const [isAddNewPackModalOpen, setIsAddNewPackModalOpen] = useState<boolean>(false)
  const [isEditPackModalOpen, setIsEditPackModalOpen] = useState<boolean>(false)
  const [isDeletePackModalOpen, setIsDeletePackModalOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const openAddNewPackHandler = () => setIsAddNewPackModalOpen(true)
  const openEditPackHandler = (id: string) => {
    setIsEditPackModalOpen(true)
    dispatch(setDeckId(id))
  }
  const openDeletePackHandler = ({ name, id }: { name: string; id: string }) => {
    setIsDeletePackModalOpen(true)
    dispatch(setDeckId(id))
    dispatch(setDeckName(name))
  }
  const decks = useGetDecksQuery({
    orderBy: orderBy,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })
  const [createDeck, createDeckLoading] = useCreateDeckMutation()
  const isLoading = useGetDecksQuery()
  const [deleteDeck, deleteDeckLoading = { isLoading }] = useDeleteDeckMutation()

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
    <div className={s.root}>
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

      <Button onClick={openAddNewPackHandler}> add new pack</Button>
      {isAddNewPackModalOpen && (
        <div className={s.modalContainer}>
          <div className={s.backdrop}>
            <AddNewPack closeModalCallback={setIsAddNewPackModalOpen} />
          </div>
        </div>
      )}
      {isEditPackModalOpen && (
        <div className={s.modalContainer}>
          <div className={s.backdrop}>
            <EditPack closeModalCallback={setIsEditPackModalOpen} />
          </div>
        </div>
      )}
      {isDeletePackModalOpen && (
        <div className={s.modalContainer}>
          <div className={s.backdrop}>
            <DeletePack closeModalCallback={setIsDeletePackModalOpen} />
          </div>
        </div>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell onClick={() => onclickHandler('name')}>
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
                    <Button onClick={() => openDeletePackHandler({ id: deck.id, name: deck.name })}>
                      delete
                    </Button>
                    <Button onClick={() => openEditPackHandler(deck.id)}>Edit</Button>
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
