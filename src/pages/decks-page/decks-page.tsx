import { useState } from 'react'

import {
  AddNewPack,
  Button,
  DeletePack,
  EditPack,
  Loader,
  Pagination,
  Slider,
  SliderLoader,
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TabSwitcher,
  TextField,
  Typography,
  Deck,
} from '@/components'
import {
  changeSliderCurrentValues,
  initial,
  setMaxSliderValue,
} from '@/components/ui/slider/slider.slice.ts'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import s from '@/pages/decks-page/decks-page.module.scss'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'
import { setMe } from '@/services/auth/auth.slice.ts'
import { baseApi } from '@/services/base-api.ts'
import { useGetDecksQuery } from '@/services/decks/decks.service.ts'
import { setItemsPerPage, setName, updateCurrentPage } from '@/services/decks/decks.slice.ts'
import { GeneralErrorType, handleApiError } from '@/utils/error-helpers/error-helpers.ts'

type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const DecksPage = () => {
  const { itemsPerPage, currentPage } = useAppSelector(state => state.decks)
  const sliderValues = useAppSelector(state => state.slider)
  const userId = useAppSelector(state => state.auth.me.id)
  const searchCardName = useAppSelector(state => state.decks.name)
  const [sortId, setSortId] = useState('')
  const dispatch = useAppDispatch()
  const [sort, setSort] = useState<Sort | null>(null)
  const orderBy = sort !== null ? `${sort.key}-${sort.direction}` : undefined
  const [searchText, setSearchText] = useState('')
  const [isAddNewPackModalOpen, setIsAddNewPackModalOpen] = useState<boolean>(false)
  const [isEditPackModalOpen, setIsEditPackModalOpen] = useState<boolean>(false)
  const [isDeletePackModalOpen, setIsDeletePackModalOpen] = useState<boolean>(false)
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null)

  const openAddNewPackHandler = () => setIsAddNewPackModalOpen(true)
  let {
    currentData: decks,
    isSuccess,
    error,
    status,
  } = useGetDecksQuery({
    orderBy: orderBy,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    minCardsCount: sliderValues.minCurrentSliderValue,
    maxCardsCount: sliderValues.maxCurrentSliderValue,
    authorId: sortId,
    name: searchCardName,
  })

  if (error) {
    const err = error as GeneralErrorType

    handleApiError(err)
  }

  if (isSuccess && decks) {
    dispatch(setMaxSliderValue({ max: decks.maxCardsCount }))
  }

  const clearHandler = () => {
    dispatch(
      changeSliderCurrentValues({
        values: [sliderValues.minCurrentSliderValue, sliderValues.maxCurrentSliderValue],
      })
    )
    dispatch(initial())
    dispatch(updateCurrentPage(1))
    dispatch(setItemsPerPage(10))
    dispatch(baseApi.util.resetApiState())
  }

  const { data: me } = useGetMeQuery()

  if (me) {
    dispatch(setMe({ ...me }))
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

  const searchInputHandle = (e: string) => {
    setSearchText(e)
    if (timerId !== null) {
      clearTimeout(timerId)
    }
    const newTimerId = setTimeout(() => {
      dispatch(setName(e))
    }, 500)

    // Сохраняем новый timerId в состоянии
    setTimerId(newTimerId)
  }

  const setItemsPerPageHandler = (value: number) => dispatch(setItemsPerPage(value))

  const setCurrentPageHandler = (value: number) => dispatch(updateCurrentPage(value))

  if (status === 'pending') {
    return <Loader />
  }

  return (
    <div className={s.decksPage}>
      <div className={s.headerDecks}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button className={s.headerDecksButton} onClick={openAddNewPackHandler}>
          Add New Pack
        </Button>
      </div>
      <div className={s.decksServices}>
        <div>
          <TextField
            className={s.textField}
            placeholder={'Input search'}
            inputIsSearch={true}
            value={searchText}
            onChangeValue={searchInputHandle}
          />
        </div>
        <div>
          <TabSwitcher
            className={s.decksTamSwitcher}
            title={'Show packs cards'}
            sortId={sortId}
            setSortId={setSortId}
            switches={[
              { id: '', switchTitle: 'all' },
              { id: userId, switchTitle: 'my' },
            ]}
          />
        </div>
        <div>{decks ? <Slider decks={decks} /> : <SliderLoader />}</div>

        <Button className={s.buttonClearFilter} variant={'secondary'} onClick={clearHandler}>
          Clear Filter
        </Button>
      </div>

      {isAddNewPackModalOpen && (
        <div className={s.modal}>
          <div className={s.backdrop}>
            <AddNewPack closeModalCallback={setIsAddNewPackModalOpen} />
          </div>
        </div>
      )}
      {isEditPackModalOpen && (
        <div className={s.modal}>
          <div className={s.backdrop}>
            <EditPack closeModalCallback={setIsEditPackModalOpen} />
          </div>
        </div>
      )}
      {isDeletePackModalOpen && (
        <div className={s.modal}>
          <div className={s.backdrop}>
            <DeletePack closeModalCallback={setIsDeletePackModalOpen} />
          </div>
        </div>
      )}
      <Table className={s.decksTable}>
        <TableHead className={s.decksTableHead}>
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
          {decks?.items?.map(deck => {
            return (
              <Deck
                key={deck.id}
                deck={deck}
                me={me}
                setIsEditPackModalOpen={setIsEditPackModalOpen}
                setIsDeletePackModalOpen={setIsDeletePackModalOpen}
              />
            )
          })}
        </TableBody>
      </Table>
      <div className={s.paginationContainer}>
        {decks && decks.pagination.totalPages > 1 && (
          <Pagination
            elements={decks?.pagination.totalItems ?? 0}
            setCurrentPage={setCurrentPageHandler}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPageHandler}
          />
        )}
      </div>
    </div>
  )
}
//TODO : надо каждой колонке задать свою ширину. что такое IS! ыыы
