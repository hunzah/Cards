import s from './pagination.module.scss'

import arrowLeft from '@/assets/images/keyboard-arrow-left.svg'
import arrowRight from '@/assets/images/keyboard-arrow-right.svg'
import { usePagination } from '@/components/ui/pagination/usePagination.ts'

type PropsType = {
  elements: any
  totalElements: number
  currentPage: number
  onChange: (page: number) => void
  elementsPerPage: number
  setCurrentPage: (elementsPerPage: any) => void
}

export const PagLogic = (props: PropsType) => {
  const { elementsPerPage, totalElements, onChange, currentPage, setCurrentPage } = props

  const totalPages = Math.ceil(totalElements / elementsPerPage)
  // Функции для кнопок
  const prev = () => {
    setCurrentPage((prev: number) => prev - 1)
  }

  const next = () => {
    setCurrentPage((prev: number) => prev + 1)
  }

  const paginationData = usePagination({ totalPages, currentPage })
  const pageNumbers = paginationData.generatePageNumbers()

  return (
    <div className={s.pagination}>
      <PrevButton callback={prev} disabled={currentPage === 1} />
      <ul className={s.list}>
        {pageNumbers.map((number: number | string) => (
          <li key={number} className={s.li}>
            {typeof number === 'number' ? (
              <a onClick={() => onChange(number)}>{number}</a>
            ) : (
              <span>{number}</span>
            )}
          </li>
        ))}
      </ul>
      <NextButton callback={next} disabled={currentPage === totalPages} />
    </div>
  )
}

type ButtonsPropsType = {
  callback: () => void
  disabled: boolean
}

const PrevButton = ({ callback, disabled }: ButtonsPropsType) => {
  return (
    <button onClick={callback} disabled={disabled} className={s.button}>
      <img src={arrowLeft} alt="Previous" />
    </button>
  )
}

const NextButton = ({ callback, disabled }: ButtonsPropsType) => {
  return (
    <button onClick={callback} disabled={disabled} className={s.button}>
      <img src={arrowRight} alt="Next" />
    </button>
  )
}
