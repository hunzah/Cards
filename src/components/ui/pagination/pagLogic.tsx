import s from './pagination.module.scss'

import arrowLeft from '@/assets/images/keyboard-arrow-left.svg'
import arrowRight from '@/assets/images/keyboard-arrow-right.svg'

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

  // Функция для генерации массива страниц для отображения
  const generatePageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 6

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  // Функции для кнопок
  const prev = () => {
    setCurrentPage(prev => prev - 1)
  }

  const next = () => {
    setCurrentPage(prev => prev + 1)
  }

  const pageNumbers = generatePageNumbers()

  return (
    <div className={s.root}>
      <PrevButton callback={prev} disabled={currentPage === 1} />
      <ul className={s.list}>
        {pageNumbers.map((number: number | string) => (
          <li key={number} className={s.li}>
            {typeof number === 'number' ? (
              <a href="#" onClick={() => onChange(number)}>
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
