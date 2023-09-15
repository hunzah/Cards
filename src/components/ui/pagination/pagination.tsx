import { useState } from 'react'

import s from './pagination.module.scss'

import { PagLogic } from '@/components/ui/pagination/pagLogic.tsx'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

type PropsType = {
  elements: number
  itemsPerPage?: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
}

export const Pagination = (props: PropsType) => {
  const { elements, itemsPerPage, currentPage, setCurrentPage } = props
  const [perPage, setPerPage] = useState(itemsPerPage ? itemsPerPage : 10)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className={s.root}>
      <PagLogic
        elements={elements}
        elementsPerPage={perPage}
        totalElements={elements}
        onChange={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPerPage={setPerPage}
      />
      <Typography variant="body2" className={s.selectContainer}>
        Показать
        <Select
          options={[10, 20, 30, 50, 100]}
          defaultValue={10}
          onChange={setPerPage}
          textStyle="body2"
        />
        на странице
      </Typography>
    </div>
  )
}
