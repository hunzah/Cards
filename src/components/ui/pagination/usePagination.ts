type PropsType = {
  totalPages: number
  currentPage: number
}

export const usePagination = (props: PropsType) => {
  const { totalPages, currentPage } = props

  const DOTS = '...'

  const generatePageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 6

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push(DOTS)
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(DOTS)
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(DOTS)
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push(DOTS)
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }
  const pageNumbers = generatePageNumbers()

  return { pageNumbers }
}
