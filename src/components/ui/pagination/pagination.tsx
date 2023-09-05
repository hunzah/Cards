import { useState } from 'react'

import s from './pagination.module.scss'

import arrowLeft from '@/assets/images/keyboard-arrow-left.svg'
import arrowRight from '@/assets/images/keyboard-arrow-right.svg'
import { PagLogic } from '@/components/ui/pagination/pagLogic.tsx'
import { Select } from '@/components/ui/select'

type PropsType = {
  elements: any
  perPage?: number
}

export const Pagination = (props: PropsType) => {
  const { elements } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(5)

  const lastElementIndex = currentPage * perPage
  const firstElementIndex = lastElementIndex - perPage
  const currentElement = elements.slice(firstElementIndex, lastElementIndex)

  const totalPages = Math.ceil(elements.length / perPage)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const next = () => {
    setCurrentPage(prev => prev + 1)
  }
  const prev = () => {
    setCurrentPage(prev => prev - 1)
  }

  let optionsForSelect = [10, 20, 30, 50, 100]

  return (
    <div className={s.root}>
      <Countries countries={currentElement} />
      <PrevButton callback={prev} disabled={currentPage === 1} />
      <PagLogic elementsPerPage={perPage} totalElements={elements.length} onChange={paginate} />
      <NextButton callback={next} disabled={currentPage === totalPages} />
      <Select options={optionsForSelect} />
    </div>
  )
}

type ButtonsPropsType = {
  callback: () => void
  disabled: boolean
}
const PrevButton = ({ callback, disabled }: ButtonsPropsType) => {
  return (
    <button onClick={callback} disabled={disabled}>
      <img src={arrowLeft} alt="Previous" />
    </button>
  )
}

const NextButton = ({ callback, disabled }: ButtonsPropsType) => {
  return (
    <button onClick={callback} disabled={disabled}>
      <img src={arrowRight} alt="Next" />
    </button>
  )
}

const Countries = ({ countries }: any) => {
  return countries.map((country: { name: string }, i: any) => <div key={i}>{country.name}</div>)
}
