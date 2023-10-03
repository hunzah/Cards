import { useState } from 'react'

import s from './pagination.module.scss'

import { PagLogic } from '@/components/ui/pagination/pagLogic.tsx'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

type PropsType = {
  elements: number
  itemsPerPage?: number
  setItemsPerPage: (value: number) => void
  currentPage: number
  setCurrentPage: (currentPage: number) => void
}

export const Pagination = (props: PropsType) => {
  const { elements, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage } = props
  const [perPage, setPerPage] = useState(itemsPerPage ? itemsPerPage : 10)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  // const setPerPageHandler = (value: number) => {
  //   setItemsPerPage(value)
  //   setPerPage(value)
  // }

  const selectCallback = (e: string) => {
    setPerPage(Number(e))
    setItemsPerPage(Number(e))
    setCurrentPage(1)
  }

  return (
    <div className={s.root}>
      <PagLogic
        elements={elements}
        elementsPerPage={perPage}
        totalElements={elements}
        onChange={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className={s.selectContainer}>
        <Typography variant="body2">Показать</Typography>
        <Select
          callback={selectCallback}
          options={[10, 20, 30, 50, 100]}
          defaultValue={10}
          textStyle="body2"
        />
        <Typography variant="body2"> на странице</Typography>
      </div>
    </div>
  )
}
