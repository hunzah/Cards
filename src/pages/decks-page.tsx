import {useEffect, useState} from 'react'

import {useNavigate} from 'react-router-dom'

import s from '../../src/components/ui/table/table.module.scss'

import deletePackIcon from '@/assets/icons/delete-pack.svg'
import editPackIcon from '@/assets/icons/edit-pack.svg'
import playPackIcon from '@/assets/icons/play-pack.svg'
import {Button} from '@/components/ui/button'
import {AddNewPack} from '@/components/ui/modals/add-new-pack/add-new-pack.tsx'
import {DeletePack} from '@/components/ui/modals/delete-pack/delete-pack.tsx'
import {EditPack} from '@/components/ui/modals/edit-pack/edit-pack.tsx'
import {Pagination} from '@/components/ui/pagination/pagination.tsx'
import {Slider} from '@/components/ui/slider'
import {TabSwitcher} from '@/components/ui/tab-switcher'
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow,} from '@/components/ui/table'
import {TextField} from '@/components/ui/text-field'
import {useAppDispatch, useAppSelector} from '@/hooks.ts'
import {useGetMeQuery} from '@/services/auth/auth.service.ts'
import {useGetDecksQuery} from '@/services/decks/decks.service.ts'
import {
    setDeckId,
    setDeckName,
    setDeckPrivacy,
    setItemsPerPage,
    updateCurrentPage,
} from '@/services/decks/decks.slice.ts'
import {
    changeSliderCurrentValues, initial,
    setMaxCurrentSliderValue,
    setMaxSliderValue,
    setMinCurrentSliderValue
} from "@/components/ui/slider/slider.slice";
import {baseApi} from "@/services/base-api";

type Sort = {
    key: string
    direction: 'asc' | 'desc'
} | null

export const DecksPage = () => {
    const {itemsPerPage, currentPage} = useAppSelector(state => state.decks)
    const sliderValues = useAppSelector(state => state.slider)
    const userId = useAppSelector(state => state.auth.userId)
    const [sortId, setSortId] = useState('')
    const dispatch = useAppDispatch()
    const [sort, setSort] = useState<Sort | null>(null)
    const orderBy = sort !== null ? `${sort.key}-${sort.direction}` : undefined
    const [searchText, setSearchText] = useState('')
    const [isAddNewPackModalOpen, setIsAddNewPackModalOpen] = useState<boolean>(false)
    const [isEditPackModalOpen, setIsEditPackModalOpen] = useState<boolean>(false)
    const [isDeletePackModalOpen, setIsDeletePackModalOpen] = useState<boolean>(false)
    const [isMyPackShow, setIsMyPackShow] = useState<boolean>(false)
    const navigate = useNavigate()

    const openAddNewPackHandler = () => setIsAddNewPackModalOpen(true)
    const openEditPackHandler = (id: string, isPrivate: boolean, name: string) => {
        setIsEditPackModalOpen(true)
        dispatch(setDeckId(id))
        dispatch(setDeckPrivacy(isPrivate))
        dispatch(setDeckName(name))
    }
    const openDeletePackHandler = (id: string, name: string) => {
        setIsDeletePackModalOpen(true)
        dispatch(setDeckId(id))
        dispatch(setDeckName(name))
    }
    let {currentData: decks, isLoading: DecksIsLoading, isSuccess} = useGetDecksQuery({
        orderBy: orderBy,
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        minCardsCount: sliderValues.minCurrentSliderValue,
        maxCardsCount: sliderValues.maxCurrentSliderValue,
        authorId: sortId,
    })

        if(isSuccess && decks){
                dispatch(setMaxSliderValue({max: decks.maxCardsCount}))

        }


    const clearHandler = () => {
        dispatch(changeSliderCurrentValues([sliderValues.minCurrentSliderValue, sliderValues.maxCurrentSliderValue]))
        dispatch(initial())
        dispatch(baseApi.util.resetApiState())


    }


    const {data: me} = useGetMeQuery()

    if (DecksIsLoading) {
        return <div>Loading....</div>
    }

    const onclickHandler = (key: string) => {
        if (sort && sort.key === key) {
            setSort(sort.direction === 'asc' ? {key, direction: 'desc'} : null)
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

    const searchFilterDecks = decks?.items.filter(deck =>
        deck.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
    const filteredDecks = isMyPackShow
        ? decks?.items.filter(deck => me?.id === deck.author.id)
        : searchFilterDecks

    const searchInputHandle = (e: string) => setSearchText(e)
    const tabSwitcherHandle = () => {
        setIsMyPackShow(!isMyPackShow)
        setSearchText('')
    }
    const setItemsPerPageHandler = (value: number) => dispatch(setItemsPerPage(value))

    const setCurrentPageHandler = (value: number) => dispatch(updateCurrentPage(value))

    if (DecksIsLoading) {
        return <div>Decks Fetching....</div>
    }

    const goToDeck = (id: string, DeckName: string, isPrivate: boolean) => {
        dispatch(setDeckId(id))
        dispatch(setDeckName(DeckName))
        dispatch(setDeckPrivacy(isPrivate))

        return navigate(`/decks/${id}`)
    }


    return (
        <div className={s.root}>
            <div><Slider decks={decks} minCurrent={sliderValues.sliderCurrentValues[0]}
                         maxCurrent={sliderValues.sliderCurrentValues[1]}/></div>
            <Button onClick={clearHandler}>clear filter</Button>
            <div>
                <TextField inputIsSearch value={searchText} onChangeValue={searchInputHandle}/>
            </div>
            <div>

                <TabSwitcher
                    sortId={sortId}
                    setSortId={setSortId}
                    switches={[
                        {id: '', switchTitle: 'all'},
                        {id: userId, switchTitle: 'my'},
                    ]}
                />
            </div>
            <Button onClick={openAddNewPackHandler}> add new pack</Button>
            {isAddNewPackModalOpen && (
                <div className={s.modal}>
                    <div className={s.backdrop}>
                        <AddNewPack closeModalCallback={setIsAddNewPackModalOpen}/>
                    </div>
                </div>
            )}
            {isEditPackModalOpen && (
                <div className={s.modal}>
                    <div className={s.backdrop}>
                        <EditPack closeModalCallback={setIsEditPackModalOpen}/>
                    </div>
                </div>
            )}
            {isDeletePackModalOpen && (
                <div className={s.modal}>
                    <div className={s.backdrop}>
                        <DeletePack closeModalCallback={setIsDeletePackModalOpen}/>
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
                    {filteredDecks?.map(deck => {
                        return (
                            <TableRow key={deck.id}>
                                <TableCell onClick={() => goToDeck(deck.id, deck.name, deck.isPrivate)}>
                                    {deck.name}
                                </TableCell>
                                <TableCell>{deck.cardsCount}</TableCell>
                                <TableCell>{deck.updated}</TableCell>
                                <TableCell>{deck.author.name}</TableCell>
                                <TableCell>
                                    <div className={s.creatorWithButton}>
                                        <button className={s.iconBtns}>
                                            <img src={playPackIcon} alt="delete-pack-icon"/>
                                        </button>
                                        <button
                                            onClick={() => openEditPackHandler(deck.id, deck.isPrivate, deck.name)}
                                            className={s.iconBtns}
                                        >
                                            <img src={editPackIcon} alt="edit-pack-icon"/>
                                        </button>
                                        <button
                                            onClick={() => openDeletePackHandler(deck.id, deck.name)}
                                            className={s.iconBtns}
                                        >
                                            <img src={deletePackIcon} alt="delete-pack-icon"/>
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Pagination
                elements={decks?.pagination.totalItems ?? 0}
                setCurrentPage={setCurrentPageHandler}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPageHandler}
            />
        </div>
    )
}
//TODO : надо каждой колонке задать свою ширину. что такое IS! ыыы
