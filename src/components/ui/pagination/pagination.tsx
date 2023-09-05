import { useState } from 'react'

import s from './pagination.module.scss'

import { PagLogic } from '@/components/ui/pagination/pagLogic.tsx'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

type PropsType = {
  elements: any[]
  elemsOnPerPage?: number
}

export const Pagination = (props: PropsType) => {
  const { elements, elemsOnPerPage } = props
  const [perPage, setPerPage] = useState(elemsOnPerPage ? elemsOnPerPage : 10)
  const [currentPage, setCurrentPage] = useState(1)
  // элементы которые будут отображаться на каждой странице.Необходимо Код расскоментировать и currentElement передавть в компонент который необходимо пагинировать
  // const lastElementIndex = currentPage * perPage
  // const firstElementIndex = lastElementIndex - perPage
  // const currentElement = elements.slice(firstElementIndex, lastElementIndex)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className={s.root}>
      <PagLogic
        elements={elements}
        elementsPerPage={perPage}
        totalElements={elements.length}
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
