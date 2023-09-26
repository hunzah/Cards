import s from './pagination.module.scss'

import arrowLeft from '@/assets/icons/keyboard-arrow-left.svg'
import arrowRight from '@/assets/icons/keyboard-arrow-right.svg'
import { usePagination } from '@/components/ui/pagination/usePagination.ts'

type PropsType = {
  elements: any
  totalElements: number
  currentPage: number
  onChange: (page: number) => void
  elementsPerPage: number
  setCurrentPage: (currentPage: number) => void
  setPerPage: (value: number) => void
}

export const PagLogic = (props: PropsType) => {
  const { elementsPerPage, totalElements, onChange, currentPage, setCurrentPage } = props

  const totalPages = Math.ceil(totalElements / elementsPerPage)
  // Функции для кнопок
  const prev = () => {
    setCurrentPage(currentPage - 1)
  }

  const next = () => {
    setCurrentPage(currentPage + 1)
  }

  const { pageNumbers } = usePagination({ totalPages, currentPage })

  return (
    <div className={s.pagination}>
      <PrevButton callback={prev} disabled={currentPage === 1} />
      <ul className={s.list}>
        {pageNumbers.map((number: number | string, i: number) => (
          <li key={i} className={s.li}>
            {typeof number === 'number' ? (
              <a
                onClick={() => onChange(number)}
                className={currentPage === number ? s.selected : ''}
              >
                {number}
              </a>
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
