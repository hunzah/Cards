import {useEffect, useState} from 'react'

import s from '../../src/components/ui/table/table.module.scss'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import { Button } from '@/components/ui/button'
import { AddNewPack } from '@/components/ui/modals/add-new-pack/add-new-pack.tsx'
import { DeletePack } from '@/components/ui/modals/delete-pack/delete-pack.tsx'
import { EditPack } from '@/components/ui/modals/edit-pack/edit-pack.tsx'
import { Pagination } from '@/components/ui/pagination/pagination.tsx'
import { Slider } from '@/components/ui/slider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useGetDecksQuery } from '@/services/decks/decks.service.ts'
import {
  setDeckId,
  setDeckName,
  setItemsPerPage,
  updateCurrentPage,
} from '@/services/decks/decks.slice.ts'
import {TabSwitcher} from "@/components/ui/tab-switcher";
import {setMeUserId} from "@/services/auth/auth.slice";

type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const DecksPage = () => {
  const { itemsPerPage, currentPage } = useAppSelector(state => state.decks)
  const sliderValues = useAppSelector(state => state.slider)
  const userId = useAppSelector(state => state.auth.userId)
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState<Sort | null>(null)
  const orderBy = sort !== null ? `${sort.key}-${sort.direction}` : undefined
  const [isAddNewPackModalOpen, setIsAddNewPackModalOpen] = useState<boolean>(false)
  const [isEditPackModalOpen, setIsEditPackModalOpen] = useState<boolean>(false)
  const [isDeletePackModalOpen, setIsDeletePackModalOpen] = useState<boolean>(false)
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
    minCardsCount: sliderValues.minCurrentSliderValue,
    maxCardsCount: sliderValues.maxCurrentSliderValue,
    authorId:userId
  })

  if (decks.isLoading) {
    return <div>Loading....</div>
  }
  console.log(userId)
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

  const setItemsPerPageHandler = (value: number) => dispatch(setItemsPerPage(value))

  const setCurrentPageHandler = (value: number) => dispatch(updateCurrentPage(value))

  if (decks.isLoading) {
    return <div>Decks Fetching....</div>
  }

  return (
    <div className={s.root}>
      <div>
        <Slider decks={decks.data} />
        <TabSwitcher switches={[{ id: 1, switchTitle: "all" },{ id: 2, switchTitle: "my" }]} />
      </div>
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
                    <button onClick={() => openEditPackHandler(deck.id)} className={s.iconBtns}>
                      <img src={editPackIcon} alt="edit-pack-icon" />
                    </button>
                    <button
                      onClick={() => openDeletePackHandler({ id: deck.id, name: deck.name })}
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
      <Pagination
        elements={decks.data?.pagination.totalItems ?? 0}
        setCurrentPage={setCurrentPageHandler}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPageHandler}
      />
    </div>
  )
}
//TODO : надо каждой колонке задать свою ширину. что такое IS! ыыы
